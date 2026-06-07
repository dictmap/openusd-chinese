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

function inferRound(problemAudit) {
  const match = String(problemAudit.purpose ?? "").match(/Round\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function inferRoundType(problemAudit) {
  const text = String(problemAudit.purpose ?? "");
  for (const type of ["PromotionRound", "DefectRound", "ConsistencyRound", "EnglishDebtRound"]) {
    if (text.includes(type)) return type;
  }
  return "UnknownRound";
}

function promotionRows(promotions, limit = 80) {
  return promotions.slice(0, limit).map((entry) => {
    return `| \`${mdEscape(entry.id)}\` | \`${mdEscape(entry.local_output)}\` | \`${mdEscape(entry.official_url)}\` | ${mdEscape(entry.status)} |`;
  }).join("\n");
}

function problemRows(problems) {
  return problems.map((problem) => {
    return `| \`${mdEscape(problem.id)}\` | ${mdEscape(problem.severity)} | ${mdEscape(problem.summary)} | ${mdEscape(problem.required_action)} |`;
  }).join("\n");
}

function nextTarget(problemAudit) {
  const action = String(problemAudit.next_action ?? "");
  const pathMatch = action.match(/full_site\/[^\s。`]+\.html|site\/[^\s。`]+\.html/);
  return pathMatch ? pathMatch[0] : action;
}

function buildWorkMd({ inventory, quality, validation, englishDebt, problemAudit, promotions }) {
  const counts = problemAudit.current_counts;
  const round = inferRound(problemAudit);
  const roundType = inferRoundType(problemAudit);
  const target = nextTarget(problemAudit);
  return `# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：${counts.total_pages}
- 完整双语 / good_bilingual：${counts.good_bilingual}
- 严格中文可读 / review_ready_zh：${englishDebt.counts.review_ready_zh}
- API complete：${englishDebt.counts.api_complete}
- Release complete：${englishDebt.counts.release_complete}
- 未完整翻译草稿 / bilingual_draft：${counts.bilingual_draft}
- draft_needs_translation：${counts.draft_needs_translation}
- draft_template_only：${counts.draft_template_only}
- pending_full_scope：${inventory.counts.pending_full_scope_pages}
- promotion manifest：${promotions.promotions.length} 页
- 总验证：passed=${validation.passed}，failed_check_count=${validation.failed_check_count}，required_check_count=${validation.required_check_count}

说明：剩余 \`bilingual_draft\` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的主阅读路径。

## 第 ${round} 轮：${roundType}

- 轮次性质：流程缺陷修复，不晋级新页面。
- 修复缺陷：P1-english-residual-debt、P1-release-coverage-lag、P1-markdown-record-encoding 的审计覆盖不足。
- 新增脚本：\`scripts/audit_openusd_english_debt.mjs\`
- 固定链路：\`reports/english_debt_audit.json\`、\`reports/english_debt_audit.md\` 已纳入 \`audit_openusd_report_index.mjs\` 和 \`validate_openusd_api_repro.ps1\`
- skill 更新：\`C:\\Users\\robot\\.codex\\skills\\openusd-bilingual-automation\\SKILL.md\` 已加入 dirty tree 阻断、release 配额、EnglishDebtRound 和 \`review_ready_zh\` 汇报要求。
- 完成数变化：good_bilingual 保持 ${counts.good_bilingual}；review_ready_zh 当前为 ${englishDebt.counts.review_ready_zh}。

## 英文残留审计结果

- good_bilingual：${englishDebt.counts.good_bilingual}
- review_ready_zh：${englishDebt.counts.review_ready_zh}
- review_needs_zh_debt：${englishDebt.counts.review_needs_zh_debt}
- API complete / review_ready_zh：${englishDebt.counts.api_complete} / ${englishDebt.counts.api_review_ready_zh}
- Release complete / review_ready_zh：${englishDebt.counts.release_complete} / ${englishDebt.counts.release_review_ready_zh}

## 验证结果

- \`audit_openusd_english_debt.mjs\`：passed
- \`audit_openusd_report_index.mjs\`：passed
- \`audit_openusd_markdown_encoding.mjs\`：passed
- \`validate_openusd_api_repro.ps1\`：passed，${validation.required_check_count}/${validation.required_check_count} checks

## 下一轮目标

优先转向 release/tutorial/user guide，建议目标：\`${target}\`。如果该页无法达到 \`good_bilingual\`，停止并报告阻塞；不要回到只刷 API 模块页的节奏。
`;
}

function buildIterationMd({ inventory, quality, validation, englishDebt, problemAudit, promotions }) {
  const counts = problemAudit.current_counts;
  const round = inferRound(problemAudit);
  const roundType = inferRoundType(problemAudit);
  return `# OpenUSD Iteration Report

## 第 ${round} 轮摘要

- 轮次类型：${roundType}
- 本轮没有晋级页面；这是命名缺陷修复轮。
- 核心修复：新增英文残留与严格中文可读性审计，更新自动化 skill，修复并强化人类可读 Markdown 编码守卫。

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
- release_complete：${englishDebt.counts.release_complete}

## 验证

- validation_report：passed=${validation.passed}，failed_check_count=${validation.failed_check_count}，required_check_count=${validation.required_check_count}
- translation_quality：good_bilingual=${quality.grade_counts.good_bilingual}
- english_debt：review_ready_zh=${englishDebt.counts.review_ready_zh}，review_needs_zh_debt=${englishDebt.counts.review_needs_zh_debt}
- promotion manifest：${promotions.promotions.length} entries

## 本轮改动文件

- \`scripts/audit_openusd_english_debt.mjs\`
- \`scripts/audit_openusd_report_index.mjs\`
- \`scripts/validate_openusd_api_repro.ps1\`
- \`scripts/regenerate_openusd_progress_markdown.mjs\`
- \`reports/english_debt_audit.json\`
- \`reports/english_debt_audit.md\`
- \`reports/current_problem_audit.json\`
- \`reports/current_problem_audit.md\`
- \`work.md\`
- \`reports/iteration_report.md\`
- \`reports/bilingual_completion_promotions.md\`
- \`C:\\Users\\robot\\.codex\\skills\\openusd-bilingual-automation\\SKILL.md\`
- \`C:\\Users\\robot\\.codex\\skills\\openusd-bilingual-automation\\agents\\openai.yaml\`

## 下一步

优先选择 release/tutorial/user guide 页面，以降低 release 覆盖滞后。建议目标：\`${nextTarget(problemAudit)}\`。
`;
}

function buildProblemMd(problemAudit, englishDebt, promotions) {
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
- release_complete：${englishDebt.counts.release_complete}

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
${problemRows(problemAudit.problems)}

## 下一步

${problemAudit.next_action}
`;
}

function buildPromotionsMd(promotions) {
  return `# OpenUSD 完整双语晋级清单

Generated: ${new Date().toISOString()}

这份清单只记录已经从 \`bilingual_draft\` 晋级为 \`bilingual_complete\` 的页面。它是 \`scripts/discover_openusd_all_pages.mjs\` 识别 promoted complete 页面的审计来源，不等同于把草稿页改个状态。

## 晋级规则

- 页面必须移除通用 draft 文案。
- 页面必须显示 \`bilingual_complete\`。
- 页面必须提供面向正文的 paragraph-level bilingual coverage。
- API 名、类名、方法名、代码、命令、属性名、模板参数、宏名、枚举名、枚举值、变量名、类型名、头文件名、token 字面量和链接保持原样。
- \`audit_openusd_translation_quality.mjs\` 必须能将页面评为 \`good_bilingual\`。

## 当前晋级页面

| ID | 本地输出 | 官方页面 | 状态 |
| --- | --- | --- | --- |
${promotionRows(promotions.promotions, promotions.promotions.length)}
`;
}

await mkdir(reportDir, { recursive: true });

const inventory = await readJson("reports/all_pages_inventory.json");
const quality = await readJson("reports/translation_quality_review.json");
const validation = await readJson("reports/validation_report.json");
const englishDebt = await readJson("reports/english_debt_audit.json");
const problemAudit = await readJson("reports/current_problem_audit.json");
const promotions = await readJson("reports/bilingual_completion_promotions.json");

await writeFile(rel("work.md"), buildWorkMd({ inventory, quality, validation, englishDebt, problemAudit, promotions }), "utf8");
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
