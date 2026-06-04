import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const INVENTORY_PATH = path.join(REPORT_DIR, "all_pages_inventory.json");
const JSON_OUT = path.join(REPORT_DIR, "translation_quality_review.json");
const MD_OUT = path.join(REPORT_DIR, "translation_quality_review.md");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function htmlDecode(text) {
  return text
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
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
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

function countMatches(text, re) {
  return (text.match(re) || []).length;
}

function extractTitle(html) {
  const doxygenTitle = html.match(/<div[^>]*class=["'][^"']*\btitle\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  if (doxygenTitle) return stripTags(doxygenTitle[1]);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) return stripTags(title[1]);
  return "";
}

function extractAnchors(html) {
  const anchors = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const hrefMatch = attrs.match(/\bhref=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    anchors.push({
      href: htmlDecode(hrefMatch[1]),
      text: stripTags(match[2]),
    });
  }
  return anchors;
}

function isExplicitOfficial(text) {
  return /官方|原页|official|source/i.test(text || "");
}

function reviewPage(page, index) {
  const output = page.output || page.local_output || page.local_path;
  const filePath = path.join(ROOT, output || "");
  const exists = Boolean(output && fs.existsSync(filePath));
  const status = page.status || page.coverage_status || page.local_status || "unknown";

  if (!exists) {
    return {
      index,
      title: page.title || "",
      output,
      status,
      exists,
      grade: "missing_output",
      zhBlockCount: 0,
      enBlockCount: 0,
      zhChars: 0,
      enLetters: 0,
      bodyChineseChars: 0,
      badEncodingCount: 0,
      unexpectedOfficialLinks: 0,
      genericDraft: false,
      note: "Local HTML output is missing.",
    };
  }

  const html = fs.readFileSync(filePath, "utf8");
  const title = extractTitle(html) || page.title || "";
  const bodyText = stripTags(html);
  const zhTexts = extractClassText(html, "zh");
  const enTexts = extractClassText(html, "en");
  const zhJoined = zhTexts.join("\n");
  const enJoined = enTexts.join("\n");
  const badEncodingCount = countMatches(bodyText, /(?:锛|鐨|姒|瀵|绗|乣|鈥|脙|脗|芒|�)/g);
  const anchors = extractAnchors(html);
  const unexpectedOfficial = anchors.filter(
    (a) => /^https:\/\/openusd\.org\/release\//.test(a.href) && !isExplicitOfficial(a.text)
  );
  const genericDraft =
    /batch draft page|later iterations add denser bilingual coverage|批次草稿页|后续迭代会继续补齐/.test(bodyText);
  const zhChars = countMatches(zhJoined, /[\u4e00-\u9fff]/g);
  const enLetters = countMatches(enJoined, /[A-Za-z]/g);
  const bodyChineseChars = countMatches(bodyText, /[\u4e00-\u9fff]/g);
  const zhBlockCount = zhTexts.length;
  const enBlockCount = enTexts.length;

  let grade = "needs_manual_review";
  let note = "Needs a human pass.";
  if (badEncodingCount > 0) {
    grade = "encoding_risk";
    note = "Rendered/body text includes mojibake-like markers.";
  } else if (unexpectedOfficial.length > 0) {
    grade = "link_risk";
    note = "Contains non-explicit OpenUSD official links.";
  } else if (status === "bilingual_complete" && !genericDraft && zhChars >= 500 && zhBlockCount >= 8) {
    grade = "good_bilingual";
    note = "Chinese and English are paired densely enough for a reference page.";
  } else if (genericDraft && zhChars < 180) {
    grade = "draft_template_only";
    note = "Mostly a draft shell: Chinese is limited to the shared scope note and structure labels.";
  } else if (genericDraft) {
    grade = "draft_needs_translation";
    note = "Has Chinese guidance, but still relies mainly on English excerpts.";
  } else if (zhChars < 300) {
    grade = "thin_chinese";
    note = "Chinese layer is too thin for a bilingual reading page.";
  } else {
    grade = "partial_bilingual";
    note = "Usable but should still be checked paragraph by paragraph.";
  }

  return {
    index,
    title,
    output,
    official_url: page.url || page.official_url || "",
    status,
    exists,
    grade,
    zhBlockCount,
    enBlockCount,
    zhChars,
    enLetters,
    bodyChineseChars,
    badEncodingCount,
    unexpectedOfficialLinks: unexpectedOfficial.length,
    genericDraft,
    note,
    sampleZh: zhTexts.slice(0, 3),
    sampleEn: enTexts.slice(0, 2),
  };
}

function gradeRank(grade) {
  return {
    encoding_risk: 0,
    link_risk: 1,
    missing_output: 2,
    draft_template_only: 3,
    thin_chinese: 4,
    draft_needs_translation: 5,
    partial_bilingual: 6,
    good_bilingual: 7,
  }[grade] ?? 99;
}

function mdEscape(text) {
  return String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

const inventory = readJson(INVENTORY_PATH);
const pages = Array.isArray(inventory.pages) ? inventory.pages : inventory;
const reviews = pages.map((page, index) => reviewPage(page, index + 1));
const counts = reviews.reduce((acc, page) => {
  acc[page.grade] = (acc[page.grade] || 0) + 1;
  return acc;
}, {});
const statusCounts = reviews.reduce((acc, page) => {
  acc[page.status] = (acc[page.status] || 0) + 1;
  return acc;
}, {});
const focusOutputs = new Set([
  "site/_usd__overview_and_purpose.html",
  ...reviews.filter((p) => p.status === "bilingual_draft").slice(0, 5).map((p) => p.output),
]);
const focusBatch = reviews.filter((p) => focusOutputs.has(p.output));
const priorityQueue = [...reviews]
  .filter((p) => p.status === "bilingual_draft")
  .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade) || a.zhChars - b.zhChars || a.index - b.index)
  .slice(0, 30);

const report = {
  passed: true,
  generated_at: new Date().toISOString(),
  total_pages: reviews.length,
  status_counts: statusCounts,
  grade_counts: counts,
  focus_batch: focusBatch,
  priority_queue: priorityQueue,
  pages: reviews,
};

fs.writeFileSync(JSON_OUT, JSON.stringify(report, null, 2), "utf8");

const lines = [];
lines.push("# OpenUSD Translation Quality Review");
lines.push("");
lines.push(`Generated: ${report.generated_at}`);
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- Total pages: ${report.total_pages}`);
for (const [status, count] of Object.entries(statusCounts)) lines.push(`- ${status}: ${count}`);
lines.push("");
lines.push("## Grade Counts");
lines.push("");
for (const [grade, count] of Object.entries(counts).sort((a, b) => gradeRank(a[0]) - gradeRank(b[0]))) {
  lines.push(`- ${grade}: ${count}`);
}
lines.push("");
lines.push("## Current Focus Batch");
lines.push("");
lines.push("| # | Grade | Status | Chinese chars | zh/en blocks | Output | Note |");
lines.push("| --- | --- | --- | ---: | ---: | --- | --- |");
for (const page of focusBatch) {
  lines.push(
    `| ${page.index} | ${page.grade} | ${page.status} | ${page.zhChars} | ${page.zhBlockCount}/${page.enBlockCount} | \`${mdEscape(page.output)}\` | ${mdEscape(page.note)} |`
  );
}
lines.push("");
lines.push("## Next Priority Queue");
lines.push("");
lines.push("| # | Grade | Chinese chars | Output | Title |");
lines.push("| --- | --- | ---: | --- | --- |");
for (const page of priorityQueue) {
  lines.push(`| ${page.index} | ${page.grade} | ${page.zhChars} | \`${mdEscape(page.output)}\` | ${mdEscape(page.title)} |`);
}
lines.push("");
lines.push("## All Pages");
lines.push("");
lines.push("| # | Grade | Status | Chinese chars | zh/en blocks | Bad encoding | Unexpected official links | Output |");
lines.push("| --- | --- | --- | ---: | ---: | ---: | ---: | --- |");
for (const page of reviews) {
  lines.push(
    `| ${page.index} | ${page.grade} | ${page.status} | ${page.zhChars} | ${page.zhBlockCount}/${page.enBlockCount} | ${page.badEncodingCount} | ${page.unexpectedOfficialLinks} | \`${mdEscape(page.output)}\` |`
  );
}
lines.push("");
fs.writeFileSync(MD_OUT, `${lines.join("\n")}\n`, "utf8");

console.log(JSON.stringify({
  passed: true,
  json: path.relative(ROOT, JSON_OUT),
  markdown: path.relative(ROOT, MD_OUT),
  total_pages: report.total_pages,
  status_counts: statusCounts,
  grade_counts: counts,
}, null, 2));
