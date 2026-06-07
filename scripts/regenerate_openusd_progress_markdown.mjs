import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const roundId = 340;
const nextTarget = "full_site/api/class_usd_geom_primvars_a_p_i.html";

function relativePath(...parts) {
  return path.join(root, ...parts);
}

async function readJson(relative) {
  const text = await readFile(relativePath(relative), "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

function hasBom(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
}

function countMatches(text, regex) {
  return (text.match(regex) ?? []).length;
}

function row(value) {
  return value === undefined || value === null ? "" : String(value);
}

function promotionRows(promotions, limit = 12) {
  return promotions.slice(0, limit).map((entry) => {
    const name = entry.local_output?.split("/").pop()?.replace(/\.html$/, "") ?? entry.id;
    return `| \`${entry.id}\` | \`${name}\` | \`${entry.local_output}\` |`;
  }).join("\n");
}

function buildCurrentProblemAuditJson({ inventory, quality, validation, promotions }) {
  const counts = inventory.counts;
  const gradeCounts = quality.grade_counts ?? {};
  return {
    generated_at: new Date().toISOString().slice(0, 10),
    purpose: `Track current completion blockers after user feedback. Round ${roundId} is a ConsistencyRound that fixes corrupted Markdown progress records without changing completion counts.`,
    current_counts: {
      total_pages: counts.total_pages,
      bilingual_complete: counts.bilingual_complete_pages,
      bilingual_draft: counts.bilingual_draft_pages,
      good_bilingual: gradeCounts.good_bilingual ?? counts.bilingual_complete_pages,
      draft_needs_translation: gradeCounts.draft_needs_translation ?? null,
      draft_template_only: gradeCounts.draft_template_only ?? null,
    },
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `The main completion number was structurally stalled at 8; the promotion path now raises it to ${gradeCounts.good_bilingual ?? counts.bilingual_complete_pages}, but the remaining ${counts.bilingual_draft_pages} draft pages still need real upgrades.`,
        evidence: `reports/bilingual_completion_promotions.json records ${promotions.promotions.length} promoted pages; discover_openusd_all_pages.mjs counts manifest-promoted pages as bilingual_complete, and audit_openusd_translation_quality.mjs reports good_bilingual=${gradeCounts.good_bilingual ?? counts.bilingual_complete_pages}.`,
        required_action: "Continue using the promotion manifest only for pages with paragraph-level bilingual coverage and draft-marker removal; do not mark guide-only drafts as complete.",
      },
      {
        id: "P0-final-entry-misleading",
        severity: "P0",
        summary: "The final entry previously misled users by showing pending=0 while most pages were incomplete drafts.",
        evidence: `openusd_bilingual_final.html now states ${counts.bilingual_complete_pages} complete pages and labels the remaining ${counts.bilingual_draft_pages} pages as Incomplete drafts.`,
        required_action: "Keep final-entry counts dynamic and keep bilingual_draft clearly described as incomplete translation.",
      },
      {
        id: "P0-automation-wrong-objective",
        severity: "P0",
        summary: "The old heartbeat automation optimized for repeated 5-page refinement and GitHub sync rather than real completion progress.",
        evidence: "The openusd heartbeat uses PromotionRound/DefectRound/ConsistencyRound and requires good_bilingual growth or named P0/P1 fixes before push.",
        required_action: "Keep the automation prompt aligned with current counts and the promotion mechanism; do not let it regress to count-neutral round-churn.",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Human-facing progress Markdown had been damaged by Windows encoding handoffs and contained many repeated question marks.",
        evidence: "Round 340 regenerated work.md, reports/iteration_report.md, and reports/current_problem_audit.md from JSON truth sources and added reports/markdown_encoding_audit.json to the fixed audit chain.",
        required_action: "Keep audit_openusd_markdown_encoding.mjs in the validation chain; if it fails, stop promotion and regenerate the Markdown before continuing.",
      },
      {
        id: "P1-link-placeholders",
        severity: "P1",
        summary: "Many clicks still route to the local uncovered placeholder because the 406-page inventory does not contain every official Doxygen target.",
        evidence: "local_link_routing_report records uncovered links; this is intentional by policy but still a user-visible browsing gap.",
        required_action: "Prioritize high-click navigation and TOC links for local anchors or inventory expansion; do not present placeholder routing as a finished reading experience.",
      },
      {
        id: "P1-draft-content-thin",
        severity: "P1",
        summary: "Most draft pages contain Chinese guidance and term notes, not paragraph-level bilingual translation.",
        evidence: `${gradeCounts.draft_needs_translation ?? "many"} pages remain draft_needs_translation; ${gradeCounts.draft_template_only ?? "some"} pages remain draft_template_only.`,
        required_action: "For selected high-value pages, replace or supplement guide-only blocks with dense paragraph-level bilingual coverage and then promote status only if the page passes the stricter rule.",
      },
      {
        id: "P2-validation-json-bom",
        severity: "P2",
        summary: "validation_report.json previously used UTF-8 BOM, which broke standard Node JSON.parse.",
        evidence: `validate_openusd_api_repro.ps1 now writes UTF-8 without BOM; the latest validation report passed=${validation.passed} with failed_check_count=${validation.failed_check_count}.`,
        required_action: "Keep validation_report.json BOM-free in every future validation run.",
      },
    ],
    next_actions: [
      "Continue promoting high-value draft pages only after paragraph-level bilingual coverage.",
      "Use reports/bilingual_completion_promotions.json as the auditable promotion source.",
      "Keep discover_openusd_all_pages.mjs anchored to the stable 406 local HTML files, not rewritten local navtree links.",
      `Resume PromotionRound with exactly one high-value page after this consistency fix. Suggested target: ${nextTarget}.`,
    ],
    next_action: `Continue PromotionRound with exactly one high-value page. Suggested target: ${nextTarget}. Stop if it cannot reach good_bilingual.`,
  };
}

function buildProblemMarkdown(problemJson, { promotions }) {
  const rows = problemJson.problems.map((problem) => {
    return `| ${problem.id} | ${problem.severity} | ${problem.summary} |`;
  }).join("\n");
  return `# Current OpenUSD Problem Audit

Generated: ${problemJson.generated_at}

本报告是当前自动化的真实问题清单。第 ${roundId} 轮是 ConsistencyRound：修复进度 Markdown 的问号化编码问题，不晋级页面，也不声称完成数增长。

## 当前计数

- 全量页面：${problemJson.current_counts.total_pages}
- 完整双语 / good_bilingual：${problemJson.current_counts.good_bilingual}
- 未完整翻译草稿 / bilingual_draft：${problemJson.current_counts.bilingual_draft}
- draft_needs_translation：${problemJson.current_counts.draft_needs_translation}
- draft_template_only：${problemJson.current_counts.draft_template_only}
- promotion manifest：${promotions.promotions.length} 页

## 问题清单

| ID | Severity | Summary |
| --- | --- | --- |
${rows}

## 第 ${roundId} 轮处理结果

- 轮次类型：ConsistencyRound
- 修复对象：\`work.md\`、\`reports/iteration_report.md\`、\`reports/current_problem_audit.md\`
- 新增防线：\`scripts/audit_openusd_markdown_encoding.mjs\`、\`reports/markdown_encoding_audit.json\`
- 完成数变化：good_bilingual 保持 ${problemJson.current_counts.good_bilingual}，没有进行页面晋级
- 下一轮目标：\`${nextTarget}\`
`;
}

function buildProgressMarkdown(title, problemJson, { validation, inventory, quality, promotions }) {
  const counts = problemJson.current_counts;
  const gradeCounts = quality.grade_counts ?? {};
  const promotedRows = promotionRows(promotions.promotions);
  return `# ${title}

## 当前真实状态

- 全量页面：${counts.total_pages}
- 完整双语 / good_bilingual：${counts.good_bilingual}
- 未完整翻译草稿 / bilingual_draft：${counts.bilingual_draft}
- draft_needs_translation：${counts.draft_needs_translation}
- draft_template_only：${counts.draft_template_only}
- pending_full_scope：${inventory.counts.pending_full_scope_pages}
- promotion manifest：${promotions.promotions.length} 页
- 总验证：passed=${validation.passed}，failed_check_count=${validation.failed_check_count}

说明：旧的追加式中文记录曾出现大量连续问号，这些内容已经无法可靠恢复。本文件已在第 ${roundId} 轮从 JSON 真值源重新生成，历史细节以 Git 历史和 \`reports/bilingual_completion_promotions.json\` 为准。

## 第 ${roundId} 轮：ConsistencyRound

本轮不做页面晋级，目标是修复用户指出的人类可读记录损坏问题，并把该问题纳入固定审计链。

- 修复：重新生成 \`work.md\`、\`reports/iteration_report.md\`、\`reports/current_problem_audit.md\`
- 新增脚本：\`scripts/regenerate_openusd_progress_markdown.mjs\`
- 新增审计：\`scripts/audit_openusd_markdown_encoding.mjs\`
- 新增报告：\`reports/markdown_encoding_audit.json\`、\`reports/markdown_encoding_audit.md\`
- 完成数变化：good_bilingual ${counts.good_bilingual} -> ${counts.good_bilingual}
- 命名缺陷：P1-markdown-record-encoding

## 最近晋级记录

| Promotion ID | Page | Local Output |
| --- | --- | --- |
${promotedRows}

## 质量计数

- good_bilingual：${gradeCounts.good_bilingual}
- partial_bilingual：${gradeCounts.partial_bilingual ?? ""}
- draft_needs_translation：${gradeCounts.draft_needs_translation}
- draft_template_only：${gradeCounts.draft_template_only}

## 下一步

恢复 PromotionRound，但每轮仍只能晋级 1 个页面。建议下一页：\`${nextTarget}\`。如果它不能达到 \`good_bilingual\`，自动化必须停止并报告阻塞。
`;
}

async function auditGeneratedMarkdown() {
  const checkFiles = [
    "work.md",
    "reports/iteration_report.md",
    "reports/current_problem_audit.md",
    "reports/bilingual_completion_promotions.md",
  ];
  const files = [];
  for (const relative of checkFiles) {
    const buffer = await readFile(relativePath(relative));
    const text = buffer.toString("utf8");
    const questionRuns = countMatches(text, /\?{3,}/g);
    const replacementChars = countMatches(text, /\uFFFD/g);
    const bom = hasBom(buffer);
    files.push({
      relative_path: relative,
      size_bytes: buffer.length,
      has_bom: bom,
      question_runs: questionRuns,
      replacement_chars: replacementChars,
      passed: !bom && questionRuns === 0 && replacementChars === 0,
    });
  }
  const failedFiles = files.filter((file) => !file.passed);
  const report = {
    generated_at: new Date().toISOString(),
    purpose: "Check human-facing OpenUSD progress Markdown for UTF-8 without BOM and for previous Windows encoding damage such as repeated question marks.",
    files_checked: files.length,
    question_runs: files.reduce((sum, file) => sum + file.question_runs, 0),
    replacement_chars: files.reduce((sum, file) => sum + file.replacement_chars, 0),
    bom_files: files.filter((file) => file.has_bom).length,
    files,
    failed_files: failedFiles,
    passed: failedFiles.length === 0,
  };
  await writeFile(relativePath("reports/markdown_encoding_audit.json"), JSON.stringify(report, null, 2), "utf8");
  const rows = files.map((file) => {
    return `| \`${file.relative_path}\` | ${file.passed} | ${file.has_bom} | ${file.question_runs} | ${file.replacement_chars} | ${file.size_bytes} |`;
  }).join("\n");
  const md = `# Markdown Encoding Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Files checked: ${report.files_checked}
- Repeated question-mark runs: ${report.question_runs}
- Unicode replacement characters: ${report.replacement_chars}
- BOM files: ${report.bom_files}

| File | Passed | Has BOM | Question Runs | Replacement Chars | Size |
| --- | --- | --- | --- | --- | --- |
${rows}

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
`;
  await writeFile(relativePath("reports/markdown_encoding_audit.md"), md, "utf8");
  return report;
}

await mkdir(reportDir, { recursive: true });

const inventory = await readJson("reports/all_pages_inventory.json");
const quality = await readJson("reports/translation_quality_review.json");
const validation = await readJson("reports/validation_report.json");
const promotions = await readJson("reports/bilingual_completion_promotions.json");
const problemJson = buildCurrentProblemAuditJson({ inventory, quality, validation, promotions });

await writeFile(relativePath("reports/current_problem_audit.json"), JSON.stringify(problemJson, null, 2), "utf8");
await writeFile(relativePath("reports/current_problem_audit.md"), buildProblemMarkdown(problemJson, { promotions }), "utf8");
await writeFile(relativePath("work.md"), buildProgressMarkdown("OpenUSD Bilingual Work Log", problemJson, { validation, inventory, quality, promotions }), "utf8");
await writeFile(relativePath("reports/iteration_report.md"), buildProgressMarkdown("OpenUSD Iteration Report", problemJson, { validation, inventory, quality, promotions }), "utf8");

const audit = await auditGeneratedMarkdown();
if (!audit.passed) {
  console.error(JSON.stringify({ passed: false, audit }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  round: roundId,
  good_bilingual: problemJson.current_counts.good_bilingual,
  draft_pages: problemJson.current_counts.bilingual_draft,
  next_target: nextTarget,
  markdown_encoding_audit: {
    files_checked: audit.files_checked,
    question_runs: audit.question_runs,
    replacement_chars: audit.replacement_chars,
    bom_files: audit.bom_files,
  },
}, null, 2));
