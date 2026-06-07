import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const INVENTORY_PATH = path.join(REPORT_DIR, "all_pages_inventory.json");
const QUALITY_PATH = path.join(REPORT_DIR, "translation_quality_review.json");
const JSON_OUT = path.join(REPORT_DIR, "english_debt_audit.json");
const MD_OUT = path.join(REPORT_DIR, "english_debt_audit.md");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

function htmlDecode(text) {
  return String(text ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(html) {
  return htmlDecode(
    String(html ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<code[\s\S]*?<\/code>/gi, " ")
      .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function basename(output) {
  return path.basename(String(output ?? ""));
}

function extractClassText(html, className) {
  const re = new RegExp(`<[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "gi");
  const values = [];
  let match;
  while ((match = re.exec(html))) {
    const text = stripTags(match[1]);
    if (text) values.push(text);
  }
  return values;
}

function extractCompleteSections(html) {
  const values = [];
  const re = /<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = re.exec(html))) {
    const text = stripTags(match[1]);
    if (text) values.push(text);
  }
  return values;
}

function count(re, text) {
  return (String(text ?? "").match(re) || []).length;
}

function pageScope(page) {
  const output = page.output || page.local_output || page.local_path || "";
  const url = page.url || page.official_url || "";
  if (output.startsWith("full_site/api/") || output.startsWith("site/api/") || url.includes("/release/api/")) return "api";
  return "release";
}

function pageType(page) {
  const output = page.output || page.local_output || page.local_path || "";
  const name = basename(output);
  if (name.endsWith("_page_front.html")) return "module_front";
  if (/^(class|struct)_/.test(name)) return "class_or_struct";
  if (/^(tut_|tutorial|user_|wp_|spec)/.test(name) || pageScope(page) === "release") return "release_or_tutorial";
  if (/^(functions|globals|namespaces|annotated|hierarchy|files)/.test(name)) return "index";
  return "general";
}

function readinessThreshold(type) {
  if (type === "module_front") return 1200;
  if (type === "release_or_tutorial") return 1600;
  if (type === "class_or_struct") return 900;
  if (type === "index") return 700;
  return 1200;
}

function minimumCoverageSignals(type) {
  if (type === "release_or_tutorial") return 4;
  if (type === "module_front") return 4;
  if (type === "class_or_struct") return 3;
  if (type === "index") return 2;
  return 3;
}

function minimumZhBlocks(type) {
  if (type === "release_or_tutorial") return 10;
  if (type === "module_front") return 8;
  if (type === "class_or_struct") return 8;
  if (type === "index") return 5;
  return 7;
}

function detectCoverageSignals(text, type) {
  const signals = [];
  const checks = [
    ["role_or_purpose", /职责|用途|用于|解决|表示|定义|提供|负责|入口|模块|语义|含义|purpose|overview/i],
    ["api_or_schema_groups", /API|schema|类|方法|函数|属性|关系|成员|接口|分组|类型|主要|class|method|attribute|relationship/i],
    ["boundary_or_adjacent_types", /边界|区别|不是|不要|相邻|关系|配合|依赖|分层|与.*的|vs\.?|versus/i],
    ["workflow_or_usage", /使用|创建|读取|写入|绑定|查询|遍历|导入|导出|解析|运行|步骤|示例|workflow|authoring/i],
    ["misread_or_debugging", /误读|注意|常见|调试|排查|失败|风险|路径|检查|定位|debug|diagnostic/i],
    ["section_or_reading_path", /阅读路径|主要 section|段落|章节|官方结构|主阅读|教程步骤|section|paragraph/i],
  ];
  for (const [name, re] of checks) {
    if (re.test(text)) signals.push(name);
  }
  if (type === "release_or_tutorial" && /步骤|教程|示例|命令|运行|打开|保存|结果|stage|layer|composition/i.test(text)) {
    signals.push("tutorial_step_path");
  }
  return [...new Set(signals)];
}

function ratioDiagnostic(enZhRatio) {
  if (enZhRatio >= 6) return "very_high";
  if (enZhRatio >= 4) return "high";
  if (enZhRatio >= 2) return "medium";
  return "normal";
}

function englishDebtLevel(enZhRatio, zhCompleteChars, threshold, status, sectionCoverageReady) {
  if (status !== "bilingual_complete") return "draft";
  if (zhCompleteChars < threshold) return "zh_main_path_too_thin";
  if (!sectionCoverageReady) return "section_coverage_risk";
  if (enZhRatio >= 4) return "english_ratio_diagnostic_high";
  if (enZhRatio >= 2) return "english_ratio_diagnostic_medium";
  return "main_reading_path_ready";
}

const inventory = readJson(INVENTORY_PATH);
const quality = readJson(QUALITY_PATH);
const qualityByOutput = new Map((quality.pages || []).map((page) => [page.output, page]));
const pages = Array.isArray(inventory.pages) ? inventory.pages : inventory;

const reviews = pages.map((page, index) => {
  const output = page.output || page.local_output || page.local_path || "";
  const filePath = path.join(ROOT, output);
  const exists = Boolean(output && fs.existsSync(filePath));
  const html = exists ? fs.readFileSync(filePath, "utf8") : "";
  const zhTexts = extractClassText(html, "zh");
  const enTexts = extractClassText(html, "en");
  const completeSections = extractCompleteSections(html);
  const completeBasis = completeSections.length > 0 ? completeSections.join("\n") : zhTexts.join("\n");
  const bodyText = stripTags(html);
  const type = pageType(page);
  const threshold = readinessThreshold(type);
  const status = page.status || page.coverage_status || page.local_status || "unknown";
  const qualityPage = qualityByOutput.get(output) || {};
  const zhChars = count(/[\u4e00-\u9fff]/g, zhTexts.join("\n"));
  const completeZhChars = count(/[\u4e00-\u9fff]/g, completeBasis);
  const enLetters = count(/[A-Za-z]/g, enTexts.join("\n"));
  const bodyEnLetters = count(/[A-Za-z]/g, bodyText);
  const enZhRatio = Number((enLetters / Math.max(zhChars, 1)).toFixed(2));
  const coverageSignals = detectCoverageSignals(completeBasis, type);
  const minSignals = minimumCoverageSignals(type);
  const minBlocks = minimumZhBlocks(type);
  const sectionCoverageReady = coverageSignals.length >= minSignals && zhTexts.length >= minBlocks;
  const mainReadingPathReady = completeZhChars >= threshold && sectionCoverageReady;
  const ratioRisk = ratioDiagnostic(enZhRatio);
  const debtLevel = englishDebtLevel(enZhRatio, completeZhChars, threshold, status, sectionCoverageReady);
  const reviewReadyZh =
    status === "bilingual_complete" &&
    qualityPage.grade === "good_bilingual" &&
    mainReadingPathReady;

  return {
    index: index + 1,
    output,
    title: page.title || qualityPage.title || "",
    official_url: page.url || page.official_url || "",
    scope: pageScope(page),
    type,
    status,
    grade: qualityPage.grade || "not_in_quality_report",
    exists,
    zh_chars: zhChars,
    complete_section_zh_chars: completeZhChars,
    zh_blocks: zhTexts.length,
    en_letters: enLetters,
    body_en_letters: bodyEnLetters,
    english_to_zh_ratio: enZhRatio,
    ratio_diagnostic: ratioRisk,
    review_ready_threshold: threshold,
    minimum_zh_blocks: minBlocks,
    minimum_coverage_signals: minSignals,
    coverage_signal_count: coverageSignals.length,
    coverage_signals: coverageSignals,
    section_coverage_ready: sectionCoverageReady,
    main_reading_path_ready: mainReadingPathReady,
    review_ready_zh: reviewReadyZh,
    english_debt_level: debtLevel,
  };
});

const countWhere = (fn) => reviews.filter(fn).length;
const counts = {
  total_pages: reviews.length,
  api_pages: countWhere((page) => page.scope === "api"),
  release_pages: countWhere((page) => page.scope === "release"),
  good_bilingual: countWhere((page) => page.grade === "good_bilingual"),
  review_ready_zh: countWhere((page) => page.review_ready_zh),
  review_needs_zh_debt: countWhere((page) => page.status === "bilingual_complete" && !page.review_ready_zh),
  api_complete: countWhere((page) => page.scope === "api" && page.status === "bilingual_complete"),
  api_review_ready_zh: countWhere((page) => page.scope === "api" && page.review_ready_zh),
  release_complete: countWhere((page) => page.scope === "release" && page.status === "bilingual_complete"),
  release_review_ready_zh: countWhere((page) => page.scope === "release" && page.review_ready_zh),
  ratio_diagnostic_high_or_very_high: countWhere((page) => page.status === "bilingual_complete" && ["high", "very_high"].includes(page.ratio_diagnostic)),
  bilingual_draft: countWhere((page) => page.status === "bilingual_draft"),
  draft_needs_translation: quality.grade_counts?.draft_needs_translation ?? null,
  draft_template_only: quality.grade_counts?.draft_template_only ?? null,
};

const completeDebtQueue = reviews
  .filter((page) => page.status === "bilingual_complete" && !page.review_ready_zh)
  .sort((a, b) =>
    (a.coverage_signal_count - b.coverage_signal_count) ||
    (a.complete_section_zh_chars - b.complete_section_zh_chars) ||
    (b.english_to_zh_ratio - a.english_to_zh_ratio) ||
    (a.index - b.index)
  )
  .slice(0, 20);

const draftEnglishDominantQueue = reviews
  .filter((page) => page.status === "bilingual_draft")
  .sort((a, b) =>
    (b.english_to_zh_ratio - a.english_to_zh_ratio) ||
    (a.zh_chars - b.zh_chars) ||
    (a.index - b.index)
  )
  .slice(0, 20);

const releasePriorityQueue = reviews
  .filter((page) => page.scope === "release" && page.status !== "bilingual_complete")
  .sort((a, b) =>
    (a.grade === "draft_template_only" ? 0 : 1) - (b.grade === "draft_template_only" ? 0 : 1) ||
    (b.english_to_zh_ratio - a.english_to_zh_ratio) ||
    (a.index - b.index)
  )
  .slice(0, 20);

const report = {
  passed: true,
  generated_at: new Date().toISOString(),
  purpose: "Track retained-English debt and stricter Chinese review readiness without changing the existing good_bilingual gate.",
  counts,
  thresholds: {
    module_front: readinessThreshold("module_front"),
    release_or_tutorial: readinessThreshold("release_or_tutorial"),
    class_or_struct: readinessThreshold("class_or_struct"),
    index: readinessThreshold("index"),
    general: readinessThreshold("general"),
    english_to_zh_ratio_diagnostic_high: 4,
    english_to_zh_ratio_diagnostic_very_high: 6,
  },
  review_ready_policy: {
    english_to_zh_ratio_is_blocker: false,
    completion_denial_basis: "Chinese main reading path: enough complete-section Chinese plus coverage signals for role, API/schema groups, boundaries, workflow, debugging, or tutorial steps.",
  },
  complete_debt_queue: completeDebtQueue,
  draft_english_dominant_queue: draftEnglishDominantQueue,
  release_priority_queue: releasePriorityQueue,
  pages: reviews,
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

function mdEscape(text) {
  return String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function rows(items) {
  return items.map((page) =>
    `| ${page.index} | \`${mdEscape(page.output)}\` | ${mdEscape(page.scope)} | ${mdEscape(page.type)} | ${page.complete_section_zh_chars} | ${page.coverage_signal_count}/${page.minimum_coverage_signals} | ${page.english_to_zh_ratio} | ${mdEscape(page.ratio_diagnostic)} | ${mdEscape(page.english_debt_level)} |`
  ).join("\n");
}

const md = `# OpenUSD English Debt Audit

Generated: ${report.generated_at}

Purpose:

- Report retained-English pressure as a diagnostic signal and a stricter \`review_ready_zh\` count.
- This audit does not replace \`good_bilingual\`; it exposes pages that are complete by the current gate but still need a stronger Chinese main reading path.
- English/Chinese ratio is not a failure gate. It only helps rank suspicious pages because API names, Doxygen lists, code, links, tokens, and official titles intentionally remain English.
- API names, class names, method names, tokens, code, links, and official English titles are intentionally preserved.

## Counts

- Total pages: ${counts.total_pages}
- good_bilingual: ${counts.good_bilingual}
- review_ready_zh: ${counts.review_ready_zh}
- review_needs_zh_debt: ${counts.review_needs_zh_debt}
- API complete: ${counts.api_complete}
- API review_ready_zh: ${counts.api_review_ready_zh}
- Release complete: ${counts.release_complete}
- Release review_ready_zh: ${counts.release_review_ready_zh}
- Complete pages with high/very high ratio diagnostic: ${counts.ratio_diagnostic_high_or_very_high}
- bilingual_draft: ${counts.bilingual_draft}
- draft_needs_translation: ${counts.draft_needs_translation}
- draft_template_only: ${counts.draft_template_only}

## Complete Pages Still Carrying English Debt

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
${rows(completeDebtQueue)}

## Draft Pages Most Dominated By English

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
${rows(draftEnglishDominantQueue)}

## Release Pages To Pull Forward

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
${rows(releasePriorityQueue)}

Policy:

- Future status reports should include both \`good_bilingual\` and \`review_ready_zh\`.
- English/Chinese ratio is a diagnostic sorter only, not a completion failure gate.
- A module front page should not be considered review-ready just because it passes the current 500-character quality floor.
- After several API-focused PromotionRounds, the automation should select a release/tutorial/user guide page unless a named P0/P1 defect blocks the run.
`;

fs.writeFileSync(MD_OUT, md, "utf8");

console.log(JSON.stringify({
  passed: true,
  counts,
  reportJson: JSON_OUT,
  reportMd: MD_OUT,
}, null, 2));
