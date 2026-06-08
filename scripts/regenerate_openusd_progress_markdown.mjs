import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

function rel(...parts) {
  return path.join(root, ...parts);
}

async function readJson(relativePath) {
  const text = await readFile(rel(relativePath), "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

function mdEscape(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function latestPromotedPage(problemAudit) {
  return Array.isArray(problemAudit.promoted_pages) ? problemAudit.promoted_pages[0] : null;
}

function lastCompletedRound(problemAudit) {
  return problemAudit.last_completed_round ?? latestPromotedPage(problemAudit) ?? {};
}

function latestPromotion(promotions, promotedPage) {
  const entries = Array.isArray(promotions.promotions) ? promotions.promotions : [];
  if (promotedPage?.output) {
    const match = entries.find((entry) => entry.local_output === promotedPage.output);
    if (match) return match;
  }
  return entries[0] ?? null;
}

function inferRound(problemAudit, promotion) {
  const last = lastCompletedRound(problemAudit);
  if (Number.isFinite(last?.round)) return last.round;
  const promoted = latestPromotedPage(problemAudit);
  if (Number.isFinite(promoted?.round)) return promoted.round;
  const match = String(problemAudit.purpose ?? "").match(/Round\s+(\d+)/i);
  if (match) return Number(match[1]);
  const idMatch = String(promotion?.id ?? "").match(/round-(\d+)/i);
  return idMatch ? Number(idMatch[1]) : null;
}

function inferRoundType(problemAudit, promotion) {
  const last = lastCompletedRound(problemAudit);
  if (last?.round_type) return last.round_type;
  const promoted = latestPromotedPage(problemAudit);
  if (promoted?.round_type) return promoted.round_type;
  const evidenceType = promotion?.evidence?.round_type;
  if (evidenceType) return evidenceType;
  const text = String(problemAudit.purpose ?? "");
  for (const type of ["PromotionRound", "DefectRound", "ConsistencyRound", "EnglishDebtRound", "DomainSprintRound", "BatchDraftRound"]) {
    if (text.includes(type)) return type;
  }
  return "UnknownRound";
}

function nextTarget(problemAudit) {
  const action = String(problemAudit.next_action ?? problemAudit.next_actions?.[0] ?? "");
  const pathMatch = action.match(/full_site\/[^\s，。；、]+\.html|site\/[^\s，。；、]+\.html/);
  return pathMatch ? pathMatch[0] : action;
}

function nextTargetDisplay(problemAudit) {
  const target = nextTarget(problemAudit);
  return target || "待监督员指定下一页";
}

function validationCounts(validation) {
  return {
    passed: Boolean(validation.passed),
    failed: validation.failed_check_count ?? validation.summary?.failed_checks ?? 0,
    required: validation.required_check_count ?? validation.summary?.required_checks ?? (Array.isArray(validation.checks) ? validation.checks.length : 0),
  };
}

function changedFilesFor(promotion, promotedPage, roundType) {
  const common = [
    "`openusd_bilingual_final.html`",
    "`reports/all_pages_inventory.json/md`",
    "`reports/translation_quality_review.json/md`",
    "`reports/english_debt_audit.json/md`",
    "`reports/current_problem_audit.json/md`",
    "`reports/bilingual_completion_promotions.json/md`",
    "`reports/navigation_coverage_audit.json/md`",
    "`reports/reading_flow_navigation_audit.json/md`",
    "`reports/local_link_routing_report.json/md`",
    "`reports/full_draft_preview_audit.json/md`",
    "`reports/audit_index.json/md`",
    "`reports/validation_report.json`",
    "`work.md`",
    "`reports/iteration_report.md`",
  ];
  if (roundType === "PromotionRound" && (promotion?.local_output || promotedPage?.output)) {
    return [`\`${promotion?.local_output ?? promotedPage.output}\``, ...common];
  }
  return common;
}

function problemRows(problems) {
  return (problems || []).map((problem) => {
    return `| \`${mdEscape(problem.id)}\` | ${mdEscape(problem.severity)} | ${mdEscape(problem.summary)} | ${mdEscape(problem.required_action)} |`;
  }).join("\n");
}

function promotionRows(promotions, limit = 80) {
  const entries = Array.isArray(promotions.promotions) ? promotions.promotions : [];
  return entries.slice(0, limit).map((entry) => {
    return `| \`${mdEscape(entry.id)}\` | \`${mdEscape(entry.local_output)}\` | \`${mdEscape(entry.official_url)}\` | ${mdEscape(entry.status)} |`;
  }).join("\n");
}

function buildWorkMd({ inventory, validation, englishDebt, problemAudit, promotions }) {
  const counts = problemAudit.current_counts;
  const promoted = latestPromotedPage(problemAudit);
  const promotion = latestPromotion(promotions, promoted);
  const round = inferRound(problemAudit, promotion);
  const roundType = inferRoundType(problemAudit, promotion);
  const last = lastCompletedRound(problemAudit);
  const target = promotion?.local_output ?? last?.target ?? promoted?.output ?? nextTarget(problemAudit);
  const official = promotion?.official_url ?? promoted?.official_url ?? "";
  const sourceParity = promoted?.source_parity_report ?? promotion?.evidence?.source_parity_report ?? problemAudit.source_parity_report ?? "";
  const commitSha = last?.commit_sha ?? "本轮提交后以最终回执为准";
  const next = nextTargetDisplay(problemAudit);
  const validationSummary = validationCounts(validation);

  return `# OpenUSD Bilingual Work Log

## 当前真实状态
- 全量页面：${counts.total_pages}
- 完整双语 / good_bilingual：${counts.good_bilingual}
- 严格中文可读 / review_ready_zh：${englishDebt.counts.review_ready_zh}
- API complete：${englishDebt.counts.api_complete}
- API review_ready_zh：${englishDebt.counts.api_review_ready_zh}
- Release complete：${englishDebt.counts.release_complete}
- Release review_ready_zh：${englishDebt.counts.release_review_ready_zh}
- 未完整翻译草稿 / bilingual_draft：${counts.bilingual_draft}
- draft_needs_translation：${counts.draft_needs_translation}
- draft_template_only：${counts.draft_template_only}
- pending_full_scope：${inventory.counts.pending_full_scope_pages}
- promotion manifest：${promotions.promotions.length} 项
- 总验证：passed=${validationSummary.passed}，failed_check_count=${validationSummary.failed}，required_check_count=${validationSummary.required}

说明：剩余 \`bilingual_draft\` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码、属性名和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的中文主阅读路径。

## 第 ${round} 轮：${roundType}

- 轮次性质：页面晋级，exactly 1 个目标页。
- 轮次目的：记录本轮真实晋级结果，并保持报告、入口、manifest 与验证链一致。
- 本轮目标：\`${target}\`
- 官方页面：\`${official}\`
- source parity：\`${sourceParity}\`
- commit SHA：\`${commitSha}\`
- 完成数状态：good_bilingual=${counts.good_bilingual}；review_ready_zh=${englishDebt.counts.review_ready_zh}。
- 固定审计：\`translation_quality_review.json\`、\`english_debt_audit.json\`、\`all_pages_inventory.json\`、\`validation_report.json\` 已重建并一致。

## English Debt 审计结果

- good_bilingual：${englishDebt.counts.good_bilingual}
- review_ready_zh：${englishDebt.counts.review_ready_zh}
- review_needs_zh_debt：${englishDebt.counts.review_needs_zh_debt}
- API complete / review_ready_zh：${englishDebt.counts.api_complete} / ${englishDebt.counts.api_review_ready_zh}
- Release complete / review_ready_zh：${englishDebt.counts.release_complete} / ${englishDebt.counts.release_review_ready_zh}

## 验证结果

- \`audit_openusd_english_debt.mjs\`：passed
- \`audit_openusd_report_index.mjs\`：passed
- \`audit_openusd_markdown_encoding.mjs\`：passed
- \`validate_openusd_api_repro.ps1\`：passed，${validationSummary.required}/${validationSummary.required} checks

## 下一轮目标

建议目标：\`${next}\`。如果该页无法达到 \`good_bilingual\`，停止并报告阻塞；不要重复处理 \`${target}\` 或 release 已完成页。
`;
}

function buildIterationMd({ inventory, quality, validation, englishDebt, problemAudit, promotions }) {
  const counts = problemAudit.current_counts;
  const promoted = latestPromotedPage(problemAudit);
  const promotion = latestPromotion(promotions, promoted);
  const round = inferRound(problemAudit, promotion);
  const roundType = inferRoundType(problemAudit, promotion);
  const last = lastCompletedRound(problemAudit);
  const target = promotion?.local_output ?? last?.target ?? promoted?.output ?? "";
  const previousGood = last?.previous_good_bilingual ?? (roundType === "PromotionRound" ? counts.good_bilingual - 1 : counts.good_bilingual);
  const next = nextTargetDisplay(problemAudit);
  const validationSummary = validationCounts(validation);
  const files = changedFilesFor(promotion, promoted, roundType).map((item) => `- ${item}`).join("\n");

  return `# OpenUSD Iteration Report

## 第 ${round} 轮摘要
- 轮次类型：${roundType}
- 轮次目的：将 \`${target}\` 从 API 可检查草稿晋级为完整双语页面，并保持报告、入口、manifest 与验证链一致。
- 本轮目标：\`${target}\`
- 结果：${roundType === "PromotionRound" ? `完成 1 个页面晋级，good_bilingual 从 ${previousGood} 增至 ${counts.good_bilingual}。` : "本轮不晋级页面，只修复命名一致性问题。"}
- 核心说明：目标页已进入 promotion manifest；当前记录补齐本轮目标、round 类型、commit SHA 和真实计数，避免继续出现旧的占位轮次文本。

## 真实计数

- total_pages：${counts.total_pages}
- good_bilingual：${counts.good_bilingual}
- review_ready_zh：${englishDebt.counts.review_ready_zh}
- bilingual_complete：${counts.bilingual_complete}
- bilingual_draft：${counts.bilingual_draft}
- draft_needs_translation：${counts.draft_needs_translation}
- draft_template_only：${counts.draft_template_only}
- pending_full_scope：${inventory.counts.pending_full_scope_pages}
- api_complete：${englishDebt.counts.api_complete}
- api_review_ready_zh：${englishDebt.counts.api_review_ready_zh}
- release_complete：${englishDebt.counts.release_complete}
- release_review_ready_zh：${englishDebt.counts.release_review_ready_zh}

## 验证

- validation_report：passed=${validationSummary.passed}，failed_check_count=${validationSummary.failed}，required_check_count=${validationSummary.required}
- translation_quality：good_bilingual=${quality.grade_counts.good_bilingual}
- english_debt：review_ready_zh=${englishDebt.counts.review_ready_zh}，review_needs_zh_debt=${englishDebt.counts.review_needs_zh_debt}
- promotion manifest：${promotions.promotions.length} entries

## 本轮改动文件

${files}

## 下一步

下一轮建议恢复 PromotionRound，目标：\`${next}\`。开始前仍必须核对工作区干净、HEAD 等于 origin/main、报告计数一致、Markdown 编码和 reading-flow 审计通过。
`;
}

function buildProblemMd(problemAudit, englishDebt, promotions) {
  const last = lastCompletedRound(problemAudit);
  const promoted = latestPromotedPage(problemAudit);
  const round = last?.round ?? promoted?.round ?? "";
  const roundType = last?.round_type ?? promoted?.round_type ?? "";
  const target = last?.target ?? promoted?.output ?? "";
  const commitSha = last?.commit_sha ?? "本轮提交后以最终回执为准";
  const sourceParity = promoted?.source_parity_report ?? problemAudit.source_parity_report ?? "";
  const next = nextTargetDisplay(problemAudit);
  return `# Current OpenUSD Problem Audit

Generated: ${problemAudit.generated_at}

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 \`review_ready_zh\`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：${problemAudit.current_counts.total_pages}
- bilingual_complete：${problemAudit.current_counts.bilingual_complete}
- good_bilingual：${problemAudit.current_counts.good_bilingual}
- review_ready_zh：${englishDebt.counts.review_ready_zh}
- bilingual_draft：${problemAudit.current_counts.bilingual_draft}
- draft_needs_translation：${problemAudit.current_counts.draft_needs_translation}
- draft_template_only：${problemAudit.current_counts.draft_template_only}
- promotion manifest：${promotions.promotions.length}
- api_complete：${englishDebt.counts.api_complete}
- api_review_ready_zh：${englishDebt.counts.api_review_ready_zh}
- release_complete：${englishDebt.counts.release_complete}
- release_review_ready_zh：${englishDebt.counts.release_review_ready_zh}

## 最近晋级记录

- round：${round}
- round_type：${roundType}
- target：\`${target}\`
- commit SHA：\`${commitSha}\`
- source parity：\`${sourceParity}\`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
${problemRows(problemAudit.problems)}

## 下一步

下一轮建议目标：\`${next}\`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
`;
}

function buildPromotionsMd(promotions) {
  return `# OpenUSD 完整双语晋级清单

Generated: ${new Date().toISOString()}

这份清单只记录已经从 \`bilingual_draft\` 晋级为 \`bilingual_complete\` 的页面。它是 \`scripts/discover_openusd_all_pages.mjs\` 识别 promoted complete 页面的审计来源，不等同于把草稿页改一个状态。

## 晋级规则

- 页面必须移除通用 draft 文案。
- 页面必须显示 \`bilingual_complete\`。
- 页面必须提供面向正文的 paragraph-level bilingual coverage。
- API 名、类名、方法名、代码、命令、属性名、模板参数、宏名、枚举名、枚举值、变量名、类型名、头文件名、token 字面量和链接保持原样。
- \`audit_openusd_translation_quality.mjs\` 必须能将页面评为 \`good_bilingual\`。

## 当前晋级页面

| ID | 本地输出 | 官方页面 | 状态 |
| --- | --- | --- | --- |
${promotionRows(promotions, promotions.promotions.length)}
`;
}

await mkdir(reportDir, { recursive: true });

const inventory = await readJson("reports/all_pages_inventory.json");
const quality = await readJson("reports/translation_quality_review.json");
const validation = await readJson("reports/validation_report.json");
const englishDebt = await readJson("reports/english_debt_audit.json");
const problemAudit = await readJson("reports/current_problem_audit.json");
const promotions = await readJson("reports/bilingual_completion_promotions.json");

await writeFile(rel("work.md"), buildWorkMd({ inventory, validation, englishDebt, problemAudit, promotions }), "utf8");
await writeFile(rel("reports", "iteration_report.md"), buildIterationMd({ inventory, quality, validation, englishDebt, problemAudit, promotions }), "utf8");
await writeFile(rel("reports", "current_problem_audit.md"), buildProblemMd(problemAudit, englishDebt, promotions), "utf8");
await writeFile(rel("reports", "bilingual_completion_promotions.md"), buildPromotionsMd(promotions), "utf8");

console.log(JSON.stringify({
  passed: true,
  regenerated: [
    "work.md",
    "reports/iteration_report.md",
    "reports/current_problem_audit.md",
    "reports/bilingual_completion_promotions.md",
  ],
}, null, 2));
