import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");

const pageFiles = [
  "release_index.html",
  "intro.html",
  "apiDocs.html",
  "glossary.html",
  "toolset.html",
  "index.html",
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "api/index.html",
];

const termPairs = [
  { page: "release_index.html", zh: "通用场景描述", en: "Universal Scene Description" },
  { page: "release_index.html", zh: "USD 首页", en: "USD Home" },
  { page: "release_index.html", zh: "USD 介绍", en: "Introduction to USD" },
  { page: "release_index.html", zh: "术语与概念", en: "Terms and Concepts" },
  { page: "release_index.html", zh: "API 文档", en: "API Documentation" },
  { page: "release_index.html", zh: "工具集", en: "Toolset" },
  { page: "index.html", zh: "通用场景描述 (USD)", en: "Universal Scene Description (USD)" },
  { page: "index.html", zh: "目标与总体架构", en: "Overview and Purpose" },
  { page: "index.html", zh: "Usd 核心 API", en: "Usd API" },
  { page: "index.html", zh: "许可证", en: "TOST license" },
  { page: "glossary.html", zh: "核心术语速览", en: "Core Term Quick Map" },
  { page: "toolset.html", zh: "工作流场景导读", en: "Workflow Scenario Guide" },
  { page: "_usd__overview_and_purpose.html", zh: "概述与目的", en: "Overview and Purpose" },
  { page: "usd_page_front.html", zh: "关键类", en: "Key Classes" },
];

const preservedNames = [
  { page: "usd_page_front.html", name: "UsdStage" },
  { page: "usd_page_front.html", name: "UsdPrim" },
  { page: "usd_page_front.html", name: "UsdTimeCode" },
  { page: "_usd__overview_and_purpose.html", name: "SdfLayer" },
  { page: "_usd__overview_and_purpose.html", name: "VtArray" },
  { page: "glossary.html", name: "VariantSet" },
  { page: "glossary.html", name: "Primvar" },
  { page: "toolset.html", name: "usdchecker" },
  { page: "toolset.html", name: "usdzip" },
  { page: "toolset.html", name: "usdstitchclips" },
  { page: "toolset.html", name: "usdGenSchema" },
  { page: "toolset.html", name: "usdInitSchema" },
  { page: "toolset.html", name: "usdmeasureperformance" },
];

const forbiddenTranslations = [
  { page: "usd_page_front.html", value: "Usd舞台" },
  { page: "usd_page_front.html", value: "Usd基元" },
  { page: "usd_page_front.html", value: "Usd时间码" },
  { page: "toolset.html", value: "美元检查器" },
  { page: "toolset.html", value: "美元压缩" },
  { page: "toolset.html", value: "美元生成模式" },
  { page: "glossary.html", value: "变体集合" },
];

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

const pages = {};
for (const page of pageFiles) {
  pages[page] = await readFile(path.join(siteDir, page), "utf8");
}

const termPairResults = termPairs.map((pair) => {
  const html = pages[pair.page] ?? "";
  return {
    ...pair,
    zh_present: html.includes(pair.zh),
    en_present: html.includes(pair.en),
    passed: html.includes(pair.zh) && html.includes(pair.en),
  };
});

const preservedNameResults = preservedNames.map((entry) => {
  const html = pages[entry.page] ?? "";
  return {
    ...entry,
    present: html.includes(entry.name),
    passed: html.includes(entry.name),
  };
});

const forbiddenTranslationResults = forbiddenTranslations.map((entry) => {
  const html = pages[entry.page] ?? "";
  return {
    ...entry,
    present: html.includes(entry.value),
    passed: !html.includes(entry.value),
  };
});

const aggregateHtml = Object.values(pages).join("\n");
const classCounts = {
  cn_term: count(aggregateHtml, /class="cn-term"/g),
  en_term: count(aggregateHtml, /class="en-term"/g),
  zh_blocks: count(aggregateHtml, /class="zh"/g),
  en_blocks: count(aggregateHtml, /class="en"/g),
  cn_definition_briefs: count(aggregateHtml, /cn-definition-brief/g),
  cn_tool_options: count(aggregateHtml, /cn-tool-options/g),
  cn_tool_deep_notes: count(aggregateHtml, /cn-tool-deep-note/g),
};

const checks = [
  check("terms:critical_pairs_present", termPairResults.every((entry) => entry.passed), {
    failed_pairs: termPairResults.filter((entry) => !entry.passed),
  }),
  check("terms:preserved_names_present", preservedNameResults.every((entry) => entry.passed), {
    missing_names: preservedNameResults.filter((entry) => !entry.passed),
  }),
  check("terms:forbidden_translations_absent", forbiddenTranslationResults.every((entry) => entry.passed), {
    forbidden_hits: forbiddenTranslationResults.filter((entry) => !entry.passed),
  }),
  check("terms:bilingual_marker_volume_ok", classCounts.cn_term >= 700 && classCounts.en_term >= 650 && classCounts.zh_blocks >= 120 && classCounts.en_blocks >= 120, classCounts),
  check("terms:glossary_and_tool_guides_present", classCounts.cn_definition_briefs >= 92 && classCounts.cn_tool_options >= 19, classCounts),
  check("terms:toolset_deep_option_notes_present", classCounts.cn_tool_deep_notes >= 6, classCounts),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Terminology consistency audit for the current bounded OpenUSD bilingual pages. It checks critical Chinese/English pairs and verifies that API, class, schema, and tool names remain in their official English form.",
  pages: pageFiles,
  term_pairs: termPairResults,
  preserved_names: preservedNameResults,
  forbidden_translations: forbiddenTranslationResults,
  counts: {
    pages: pageFiles.length,
    term_pairs: termPairResults.length,
    preserved_names: preservedNameResults.length,
    forbidden_translations: forbiddenTranslationResults.length,
    checks: checks.length,
    failed_checks: failedChecks.length,
    ...classCounts,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "term_consistency_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Term Consistency Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Pages audited: ${report.counts.pages}
- Critical bilingual term pairs: ${report.counts.term_pairs}
- Preserved API/class/tool names: ${report.counts.preserved_names}
- Forbidden translation checks: ${report.counts.forbidden_translations}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Marker counts:

- \`cn-term\`: ${report.counts.cn_term}
- \`en-term\`: ${report.counts.en_term}
- \`zh\` blocks: ${report.counts.zh_blocks}
- \`en\` blocks: ${report.counts.en_blocks}
- Glossary definition briefs: ${report.counts.cn_definition_briefs}
- Tool option guides: ${report.counts.cn_tool_options}
- Tool deep option notes: ${report.counts.cn_tool_deep_notes}

Policy:

- Chinese labels are added beside English originals.
- API names, class names, schema names, command names, and page names stay in English.
- This audit checks the bounded local pages only and does not crawl or mirror the full official site.
`;

await writeFile(path.join(reportDir, "term_consistency_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "term_consistency_audit.json"),
  reportMd: path.join(reportDir, "term_consistency_audit.md"),
}, null, 2));
