import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourceDir = path.join(root, "source");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function hasAll(html, markers) {
  return markers.every((marker) => html.includes(marker));
}

async function readProjectFile(...parts) {
  return readFile(path.join(root, ...parts), "utf8");
}

const releaseSource = await readFile(path.join(sourceDir, "openusd_release_index_source.html"), "utf8");
const apiSource = await readFile(path.join(sourceDir, "openusd_api_index_source.html"), "utf8");
const releaseHtml = await readProjectFile("site", "release_index.html");
const apiHtml = await readProjectFile("site", "index.html");
const apiRedirectHtml = await readProjectFile("site", "api", "index.html");

const releaseCounts = {
  cn_term: count(releaseHtml, /class="cn-term"/g),
  en_term: count(releaseHtml, /class="en-term"/g),
  zh_blocks: count(releaseHtml, /class="zh"/g),
  en_blocks: count(releaseHtml, /class="en"/g),
};

const apiCounts = {
  bilingual_blocks: count(apiHtml, /class="bilingual-block/g),
  api_entry_cards: count(apiHtml, /class="cn-api-entry-card"/g),
  api_route_steps: count(apiHtml, /class="cn-api-route-step"/g),
  scope_notes: count(apiHtml, /class="cn-repro-note"/g),
  zh_blocks: count(apiHtml, /class="zh"/g),
  en_blocks: count(apiHtml, /class="en"/g),
  cn_term: count(apiHtml, /class="cn-term"/g),
  en_term: count(apiHtml, /class="en-term"/g),
};

const releaseCriticalLinks = ["intro.html", "apiDocs.html", "glossary.html", "toolset.html", "api/index.html"];
const releaseCriticalTerms = ["Introduction to USD", "API Documentation", "Terms and Concepts", "Toolset"];
const apiCriticalLinks = ["_usd__overview_and_purpose.html", "usd_page_front.html", "https://openusd.org/license"];

const releaseChecks = [
  check("release:source_is_official_entry_snapshot", releaseSource.includes("USD Home") && hasAll(releaseSource, releaseCriticalTerms)),
  check("release:keeps_sphinx_layout_markers", hasAll(releaseHtml, ["wy-nav-side", "wy-nav-content", "rst-content", "cn-repro-scope"])),
  check("release:keeps_primary_entry_terms", hasAll(releaseHtml, releaseCriticalTerms)),
  check("release:keeps_critical_local_links", hasAll(releaseHtml, releaseCriticalLinks), { required_links: releaseCriticalLinks }),
  check("release:has_balanced_bilingual_terms", releaseCounts.cn_term >= 300 && releaseCounts.cn_term === releaseCounts.en_term, releaseCounts),
  check("release:uses_local_primary_images", hasAll(releaseHtml, ["images/USDLogoUnsized.svg", "images/piper-banner.jpg", "images/USDIcon.ico"])),
  check("release:has_no_remote_openusd_image_refs", !/https:\/\/openusd\.org\/images/.test(releaseHtml)),
];

const apiChecks = [
  check("api:source_is_official_entry_snapshot", apiSource.includes("Universal Scene Description (USD)") && apiSource.includes("Generated on Wed Apr 22 2026")),
  check("api:keeps_doxygen_layout_markers", hasAll(apiHtml, ['id="top"', 'id="side-nav"', 'id="doc-content"', "searchBox"])),
  check("api:keeps_primary_title_and_english_name", apiHtml.includes("Universal Scene Description (USD)") && apiHtml.includes("通用场景描述 (USD)")),
  check("api:has_scope_note", apiCounts.scope_notes >= 1 && apiHtml.includes("https://openusd.org/release/api/index.html") && apiHtml.includes("API names, page names, and links are preserved"), apiCounts),
  check("api:has_bilingual_intro_blocks", apiCounts.bilingual_blocks >= 4 && apiCounts.zh_blocks >= 4 && apiCounts.en_blocks >= 4, apiCounts),
  check("api:has_entry_map_cards", apiHtml.includes("cn-api-entry-map") && apiCounts.api_entry_cards >= 3 && apiCounts.cn_term >= 3 && apiCounts.en_term >= 3, apiCounts),
  check("api:has_route_guide", apiHtml.includes("cn-api-route-guide") && apiCounts.api_route_steps >= 3 && apiHtml.includes("API Route Guide") && hasAll(apiHtml, apiCriticalLinks), apiCounts),
  check("api:keeps_critical_links", hasAll(apiHtml, apiCriticalLinks), { required_links: apiCriticalLinks }),
  check("api:uses_local_primary_images", hasAll(apiHtml, ["USDLogoDocs.png", "USDLogoLrgWithAlpha.png", "images/USDIcon.ico"])),
  check("api:has_no_remote_openusd_image_refs", !/https:\/\/openusd\.org\/images/.test(apiHtml)),
];

const redirectChecks = [
  check("api_redirect:keeps_local_relative_target", apiRedirectHtml.includes('http-equiv="refresh"') && apiRedirectHtml.includes("../index.html")),
  check("api_redirect:keeps_bilingual_explanation", apiRedirectHtml.includes("The local bilingual Usd API reproduction") && apiRedirectHtml.includes("lang=\"zh-CN\"")),
];

const pages = [
  {
    page: "release_index.html",
    official_url: "https://openusd.org/release/index.html",
    source_snapshot: "source/openusd_release_index_source.html",
    local_output: "site/release_index.html",
    counts: releaseCounts,
    checks: releaseChecks,
  },
  {
    page: "index.html",
    official_url: "https://openusd.org/release/api/index.html",
    source_snapshot: "source/openusd_api_index_source.html",
    local_output: "site/index.html",
    counts: apiCounts,
    checks: apiChecks,
  },
  {
    page: "api/index.html",
    official_url: "local redirect for release page api/index.html link",
    source_snapshot: null,
    local_output: "site/api/index.html",
    counts: {},
    checks: redirectChecks,
  },
];

const allChecks = pages.flatMap((page) => page.checks.map((entry) => ({ page: page.page, ...entry })));
const failedChecks = allChecks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Primary entry coverage audit for the two user-requested official entry pages and the local API redirect. This checks structure, bilingual markers, critical links, local images, and source snapshot anchors without expanding to a full-site mirror.",
  pages,
  counts: {
    pages: pages.length,
    checks: allChecks.length,
    failed_checks: failedChecks.length,
    release_cn_terms: releaseCounts.cn_term,
    release_en_terms: releaseCounts.en_term,
    api_bilingual_blocks: apiCounts.bilingual_blocks,
    api_entry_cards: apiCounts.api_entry_cards,
    api_route_steps: apiCounts.api_route_steps,
    api_scope_notes: apiCounts.scope_notes,
  },
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "primary_entry_coverage.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Primary Entry Coverage Audit

Generated: ${report.generated_at}

Scope:

- \`https://openusd.org/release/index.html\` -> \`site/release_index.html\`
- \`https://openusd.org/release/api/index.html\` -> \`site/index.html\`
- Release page local API redirect -> \`site/api/index.html\`

Result:

- Passed: ${report.passed}
- Pages audited: ${report.counts.pages}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}
- Release bilingual term pairs: ${releaseCounts.cn_term}/${releaseCounts.en_term}
- API bilingual blocks: ${apiCounts.bilingual_blocks}
- API entry cards: ${apiCounts.api_entry_cards}
- API route guide steps: ${apiCounts.api_route_steps}
- API scope notes: ${apiCounts.scope_notes}

Coverage policy:

- Keep Sphinx and Doxygen structural markers on the two primary entry pages.
- Keep page names, API names, command names, and official links unchanged.
- Add Chinese labels or summaries alongside the English originals.
- Keep primary images local and avoid remote OpenUSD image references in generated output.
- Do not widen this audit into an unbounded full-site mirror.
`;

await writeFile(path.join(reportDir, "primary_entry_coverage.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "primary_entry_coverage.json"),
  reportMd: path.join(reportDir, "primary_entry_coverage.md"),
}, null, 2));
