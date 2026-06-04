import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

async function readProjectFile(...parts) {
  return readFile(path.join(root, ...parts), "utf8");
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function labelNearHref(html, href, zh, en) {
  const hrefPatterns = [`href="${href}"`, `href='${href}'`];
  for (const pattern of hrefPatterns) {
    let index = html.indexOf(pattern);
    while (index >= 0) {
      const window = html.slice(Math.max(0, index - 320), Math.min(html.length, index + 900));
      if (window.includes(zh) && window.includes(en)) {
        return true;
      }
      index = html.indexOf(pattern, index + pattern.length);
    }
  }
  return false;
}

function hasAll(html, markers) {
  return markers.every((marker) => html.includes(marker));
}

const releaseHtml = await readProjectFile("site", "release_index.html");
const apiHtml = await readProjectFile("site", "index.html");
const apiDocsHtml = await readProjectFile("site", "apiDocs.html");
const apiRedirectHtml = await readProjectFile("site", "api", "index.html");

const adjacentPages = [
  {
    page: "intro.html",
    zh: "USD 介绍",
    en: "Introduction to USD",
    html: await readProjectFile("site", "intro.html"),
  },
  {
    page: "apiDocs.html",
    zh: "API 文档",
    en: "API Documentation",
    html: apiDocsHtml,
  },
  {
    page: "glossary.html",
    zh: "USD 术语和概念",
    en: "USD Terms and Concepts",
    html: await readProjectFile("site", "glossary.html"),
  },
  {
    page: "toolset.html",
    zh: "USD 工具集",
    en: "USD Toolset",
    html: await readProjectFile("site", "toolset.html"),
  },
  {
    page: "_usd__overview_and_purpose.html",
    zh: "概述与目的",
    en: "Overview and Purpose",
    html: await readProjectFile("site", "_usd__overview_and_purpose.html"),
  },
  {
    page: "usd_page_front.html",
    zh: "Usd：通用场景描述核心",
    en: "Usd : Universal Scene Description (Core)",
    html: await readProjectFile("site", "usd_page_front.html"),
  },
];

const releaseEntryLinks = [
  { href: "intro.html", zh: "USD 介绍", en: "Introduction to USD", role: "active adjacent" },
  { href: "glossary.html", zh: "术语与概念", en: "Terms and Concepts", role: "active adjacent" },
  { href: "apiDocs.html", zh: "API 文档", en: "API Documentation", role: "active adjacent bridge" },
  { href: "toolset.html", zh: "工具集", en: "Toolset", role: "active adjacent" },
  { href: "api/index.html", zh: "API 文档", en: "API Documentation", role: "local API redirect" },
  { href: "tut_usd_tutorials.html", zh: "教程", en: "Tutorials", role: "preserved release entry" },
  { href: "spec.html", zh: "规范", en: "Specifications", role: "preserved out-of-scope entry" },
  { href: "usdfaq.html", zh: "常见问题", en: "FAQ", role: "preserved release entry" },
];

const releaseGroups = [
  { zh: "学习", en: "Learn" },
  { zh: "用户指南", en: "User Guides" },
  { zh: "参考", en: "Reference" },
  { zh: "规范", en: "Specifications" },
];

const apiEntryCards = [
  {
    href: "_usd__overview_and_purpose.html",
    zh: "目标与总体架构",
    en: "Overview and Purpose",
  },
  {
    href: "usd_page_front.html",
    zh: "Usd 核心 API",
    en: "Usd API",
  },
  {
    href: "https://openusd.org/license",
    zh: "许可证",
    en: "TOST license",
  },
];

const releaseEntryResults = releaseEntryLinks.map((entry) => ({
  ...entry,
  present: labelNearHref(releaseHtml, entry.href, entry.zh, entry.en),
}));

const releaseGroupResults = releaseGroups.map((entry) => ({
  ...entry,
  present: hasAll(releaseHtml, [entry.zh, entry.en]),
}));

const apiEntryResults = apiEntryCards.map((entry) => ({
  ...entry,
  present: labelNearHref(apiHtml, entry.href, entry.zh, entry.en),
}));

const adjacentTitleResults = adjacentPages.map((entry) => ({
  page: entry.page,
  zh: entry.zh,
  en: entry.en,
  title_pair_present: hasAll(entry.html, [entry.zh, entry.en]),
}));

const bridgeResult = {
  page: "apiDocs.html",
  href: "api/index.html",
  zh: "USD C++ API 文档",
  en: "USD C++ API Documentation",
  present: labelNearHref(apiDocsHtml, "api/index.html", "USD C++ API 文档", "USD C++ API Documentation"),
};

const redirectResult = {
  page: "api/index.html",
  href: "../index.html",
  zh: "本地双语复刻页",
  en: "local bilingual Usd API reproduction",
  present: labelNearHref(apiRedirectHtml, "../index.html", "本地双语复刻页", "local bilingual Usd API reproduction"),
};

const checks = [
  check("entry_labels:release_key_links_bilingual", releaseEntryResults.every((entry) => entry.present), {
    failed_links: releaseEntryResults.filter((entry) => !entry.present),
  }),
  check("entry_labels:release_navigation_groups_bilingual", releaseGroupResults.every((entry) => entry.present), {
    failed_groups: releaseGroupResults.filter((entry) => !entry.present),
  }),
  check("entry_labels:api_entry_cards_bilingual", apiEntryResults.every((entry) => entry.present), {
    failed_cards: apiEntryResults.filter((entry) => !entry.present),
  }),
  check("entry_labels:api_bridge_and_redirect_bilingual", bridgeResult.present && redirectResult.present, {
    bridge: bridgeResult,
    redirect: redirectResult,
  }),
  check("entry_labels:adjacent_page_titles_bilingual", adjacentTitleResults.every((entry) => entry.title_pair_present), {
    failed_pages: adjacentTitleResults.filter((entry) => !entry.title_pair_present),
  }),
  check("entry_labels:preserves_english_original_names", hasAll(releaseHtml + apiHtml + apiDocsHtml, [
    "Introduction to USD",
    "Terms and Concepts",
    "API Documentation",
    "Toolset",
    "Overview and Purpose",
    "Usd API",
    "TOST license",
    "USD C++ API Documentation",
  ])),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Entry label contract audit for the existing OpenUSD bilingual reproduction. It checks that key release/API entry links keep both Chinese labels and original English page/API names while preserving href targets; it does not add pages or copy additional official body text.",
  release_entry_links: releaseEntryResults,
  release_navigation_groups: releaseGroupResults,
  api_entry_cards: apiEntryResults,
  api_bridge: bridgeResult,
  api_redirect: redirectResult,
  adjacent_titles: adjacentTitleResults,
  counts: {
    release_entry_links: releaseEntryResults.length,
    release_entry_links_bilingual: releaseEntryResults.filter((entry) => entry.present).length,
    release_navigation_groups: releaseGroupResults.length,
    release_navigation_groups_bilingual: releaseGroupResults.filter((entry) => entry.present).length,
    api_entry_cards: apiEntryResults.length,
    api_entry_cards_bilingual: apiEntryResults.filter((entry) => entry.present).length,
    bridge_and_redirect_links: 2,
    bridge_and_redirect_links_bilingual: [bridgeResult, redirectResult].filter((entry) => entry.present).length,
    adjacent_title_pairs: adjacentTitleResults.length,
    adjacent_title_pairs_bilingual: adjacentTitleResults.filter((entry) => entry.title_pair_present).length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "entry_label_contract_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Entry Label Contract Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Release entry links bilingual: ${report.counts.release_entry_links_bilingual}/${report.counts.release_entry_links}
- Release navigation groups bilingual: ${report.counts.release_navigation_groups_bilingual}/${report.counts.release_navigation_groups}
- API entry cards bilingual: ${report.counts.api_entry_cards_bilingual}/${report.counts.api_entry_cards}
- Bridge and redirect links bilingual: ${report.counts.bridge_and_redirect_links_bilingual}/${report.counts.bridge_and_redirect_links}
- Adjacent title pairs bilingual: ${report.counts.adjacent_title_pairs_bilingual}/${report.counts.adjacent_title_pairs}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Policy:

- Preserve href targets, API names, page names, and official English labels.
- Add or keep Chinese labels alongside English originals for the bounded entry links.
- Keep out-of-scope documentation links as official relative links until their pages are explicitly added.
- Do not widen this audit into a full-site mirror or official body-text translation pass.
`;

await writeFile(path.join(reportDir, "entry_label_contract_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "entry_label_contract_audit.json"),
  reportMd: path.join(reportDir, "entry_label_contract_audit.md"),
}, null, 2));
