import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const pages = [
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

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function firstNonNegative(...indexes) {
  return indexes.filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;
}

async function readSitePage(relativePath) {
  return readFile(path.join(root, "site", relativePath), "utf8");
}

const pageAudits = [];
for (const page of pages) {
  const html = await readSitePage(page);
  const cnTermCount = countMatches(html, /class="cn-term"/g);
  const enTermCount = countMatches(html, /class="en-term"/g);
  const orderedCnEnTermPairs = countMatches(html, /class="cn-term"[\s\S]{0,500}?class="en-term"/g);
  const zhBlockCount = countMatches(html, /class="zh"/g);
  const enBlockCount = countMatches(html, /class="en"/g);
  const orderedZhEnPairs = countMatches(html, /class="zh"[\s\S]{0,1000}?class="en"/g);
  const redirectChineseFirst = page === "api/index.html"
    ? html.indexOf("本地双语复刻页") >= 0 && html.indexOf("The local bilingual Usd API reproduction") > html.indexOf("本地双语复刻页")
    : false;

  const firstChinese = firstNonNegative(
    html.indexOf('class="cn-term"'),
    html.indexOf('class="zh"'),
    page === "api/index.html" ? html.indexOf("本地双语复刻页") : -1,
  );
  const firstEnglish = firstNonNegative(
    html.indexOf('class="en-term"'),
    html.indexOf('class="en"'),
    page === "api/index.html" ? html.indexOf("The local bilingual Usd API reproduction") : -1,
  );

  const termOrderOk = cnTermCount === enTermCount && orderedCnEnTermPairs === cnTermCount;
  const blockOrderOk = zhBlockCount === enBlockCount && orderedZhEnPairs === zhBlockCount;
  const hasLayer = cnTermCount > 0 || zhBlockCount > 0 || redirectChineseFirst;
  const firstOrderOk = firstChinese >= 0 && firstEnglish >= 0 && firstChinese < firstEnglish;
  const pageOrderOk = hasLayer && termOrderOk && blockOrderOk && (firstOrderOk || redirectChineseFirst);

  pageAudits.push({
    page,
    cn_term_count: cnTermCount,
    en_term_count: enTermCount,
    ordered_cn_en_term_pairs: orderedCnEnTermPairs,
    zh_block_count: zhBlockCount,
    en_block_count: enBlockCount,
    ordered_zh_en_pairs: orderedZhEnPairs,
    redirect_chinese_first: redirectChineseFirst,
    first_chinese_index: firstChinese,
    first_english_index: firstEnglish,
    term_order_ok: termOrderOk,
    block_order_ok: blockOrderOk,
    page_order_ok: pageOrderOk,
  });
}

const totals = pageAudits.reduce((acc, page) => {
  acc.cn_term_count += page.cn_term_count;
  acc.en_term_count += page.en_term_count;
  acc.ordered_cn_en_term_pairs += page.ordered_cn_en_term_pairs;
  acc.zh_block_count += page.zh_block_count;
  acc.en_block_count += page.en_block_count;
  acc.ordered_zh_en_pairs += page.ordered_zh_en_pairs;
  acc.redirect_chinese_first_pages += page.redirect_chinese_first ? 1 : 0;
  acc.pages_with_chinese_first_layer += page.page_order_ok ? 1 : 0;
  return acc;
}, {
  cn_term_count: 0,
  en_term_count: 0,
  ordered_cn_en_term_pairs: 0,
  zh_block_count: 0,
  en_block_count: 0,
  ordered_zh_en_pairs: 0,
  redirect_chinese_first_pages: 0,
  pages_with_chinese_first_layer: 0,
});

const checks = [
  check("chinese_first:all_pages_have_chinese_first_layer", pageAudits.every((page) => page.page_order_ok), {
    failed_pages: pageAudits.filter((page) => !page.page_order_ok).map((page) => page.page),
  }),
  check("chinese_first:cn_en_term_counts_match", totals.cn_term_count === totals.en_term_count, {
    cn_term_count: totals.cn_term_count,
    en_term_count: totals.en_term_count,
  }),
  check("chinese_first:cn_en_term_order_ready", totals.ordered_cn_en_term_pairs === totals.cn_term_count && totals.cn_term_count >= 850, {
    ordered_pairs: totals.ordered_cn_en_term_pairs,
    cn_term_count: totals.cn_term_count,
  }),
  check("chinese_first:zh_en_block_counts_match", totals.zh_block_count === totals.en_block_count, {
    zh_block_count: totals.zh_block_count,
    en_block_count: totals.en_block_count,
  }),
  check("chinese_first:zh_en_block_order_ready", totals.ordered_zh_en_pairs === totals.zh_block_count && totals.zh_block_count >= 300, {
    ordered_pairs: totals.ordered_zh_en_pairs,
    zh_block_count: totals.zh_block_count,
  }),
  check("chinese_first:api_redirect_chinese_first_ready", totals.redirect_chinese_first_pages === 1),
  check("chinese_first:bounded_page_count_ready", pageAudits.length === 9),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Chinese-first order contract audit for the bounded OpenUSD bilingual reproduction. It checks that paired Chinese labels or blocks precede the corresponding retained English original, without adding pages or storing official body text.",
  official_scope_urls: [
    "https://openusd.org/release/index.html",
    "https://openusd.org/release/api/index.html",
  ],
  pages: pageAudits,
  counts: {
    pages_checked: pageAudits.length,
    cn_term_count: totals.cn_term_count,
    en_term_count: totals.en_term_count,
    ordered_cn_en_term_pairs: totals.ordered_cn_en_term_pairs,
    zh_block_count: totals.zh_block_count,
    en_block_count: totals.en_block_count,
    ordered_zh_en_pairs: totals.ordered_zh_en_pairs,
    redirect_chinese_first_pages: totals.redirect_chinese_first_pages,
    pages_with_chinese_first_layer: totals.pages_with_chinese_first_layer,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "chinese_first_order_contract_audit.json"), JSON.stringify(report, null, 2), "utf8");

const rows = pageAudits.map((page) => {
  return `| ${page.page} | ${page.cn_term_count}/${page.en_term_count} | ${page.zh_block_count}/${page.en_block_count} | ${page.page_order_ok} |`;
}).join("\n");

const md = `# OpenUSD Chinese-First Order Contract Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Pages checked: ${report.counts.pages_checked}
- cn/en term pairs: ${report.counts.ordered_cn_en_term_pairs}/${report.counts.cn_term_count}
- zh/en block pairs: ${report.counts.ordered_zh_en_pairs}/${report.counts.zh_block_count}
- Redirect Chinese-first pages: ${report.counts.redirect_chinese_first_pages}
- Pages with Chinese-first layer: ${report.counts.pages_with_chinese_first_layer}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

| Page | cn/en Terms | zh/en Blocks | Chinese First |
| --- | --- | --- | --- |
${rows}

Policy:

- Chinese labels and explanations must appear before the retained English original.
- API names, page names, class names, command names, CLI flags, and links remain unchanged.
- The local API redirect also presents the Chinese redirect sentence before the English sentence.
- This is an order-contract audit, not a full translation diff.
`;

await writeFile(path.join(reportDir, "chinese_first_order_contract_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "chinese_first_order_contract_audit.json"),
  reportMd: path.join(reportDir, "chinese_first_order_contract_audit.md"),
}, null, 2));
