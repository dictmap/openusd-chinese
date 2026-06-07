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
  if (type === "module_front") return 1500;
  if (type === "release_or_tutorial") return 1600;
  if (type === "class_or_struct") return 900;
  if (type === "index") return 700;
  return 1200;
}

function englishDebtLevel(enZhRatio, zhCompleteChars, threshold, status) {
  if (status !== "bilingual_complete") return "draft";
  if (zhCompleteChars < threshold) return "zh_below_threshold";
  if (enZhRatio >= 4) return "english_dominant";
  if (enZhRatio >= 2) return "english_heavy";
  return "balanced";
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
  const debtLevel = englishDebtLevel(enZhRatio, completeZhChars, threshold, status);
  const reviewReadyZh =
    status === "bilingual_complete" &&
    qualityPage.grade === "good_bilingual" &&
    completeZhChars >= threshold &&
    enZhRatio < 4;

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
    review_ready_threshold: threshold,
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
  bilingual_draft: countWhere((page) => page.status === "bilingual_draft"),
  draft_needs_translation: quality.grade_counts?.draft_needs_translation ?? null,
  draft_template_only: quality.grade_counts?.draft_template_only ?? null,
};

const completeDebtQueue = reviews
  .filter((page) => page.status === "bilingual_complete" && !page.review_ready_zh)
  .sort((a, b) =>
    (b.english_to_zh_ratio - a.english_to_zh_ratio) ||
    (a.complete_section_zh_chars - b.complete_section_zh_chars) ||
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
    english_to_zh_ratio_blocker: 4,
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
    `| ${page.index} | \`${mdEscape(page.output)}\` | ${mdEscape(page.scope)} | ${mdEscape(page.type)} | ${page.complete_section_zh_chars} | ${page.english_to_zh_ratio} | ${mdEscape(page.english_debt_level)} |`
  ).join("\n");
}

const md = `# OpenUSD English Debt Audit

Generated: ${report.generated_at}

Purpose:

- Report retained-English pressure and a stricter \`review_ready_zh\` count.
- This audit does not replace \`good_bilingual\`; it exposes pages that are complete by the current gate but still need a stronger Chinese reading layer.
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
- bilingual_draft: ${counts.bilingual_draft}
- draft_needs_translation: ${counts.draft_needs_translation}
- draft_template_only: ${counts.draft_template_only}

## Complete Pages Still Carrying English Debt

| # | Page | Scope | Type | Complete Zh Chars | En/Zh Ratio | Debt |
| --- | --- | --- | --- | ---: | ---: | --- |
${rows(completeDebtQueue)}

## Draft Pages Most Dominated By English

| # | Page | Scope | Type | Complete Zh Chars | En/Zh Ratio | Debt |
| --- | --- | --- | --- | ---: | ---: | --- |
${rows(draftEnglishDominantQueue)}

## Release Pages To Pull Forward

| # | Page | Scope | Type | Complete Zh Chars | En/Zh Ratio | Debt |
| --- | --- | --- | --- | ---: | ---: | --- |
${rows(releasePriorityQueue)}

Policy:

- Future status reports should include both \`good_bilingual\` and \`review_ready_zh\`.
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
