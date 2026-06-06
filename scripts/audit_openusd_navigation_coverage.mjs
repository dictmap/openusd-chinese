import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const sourceDir = path.join(root, "source");
const reportDir = path.join(root, "reports");

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

function blocks(html, pattern) {
  return html.match(pattern) || [];
}

function hasAll(html, values) {
  return values.every((value) => html.includes(value));
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

async function readSite(file) {
  return readFile(path.join(siteDir, file), "utf8");
}

async function existsInSite(file) {
  try {
    await access(path.join(siteDir, file));
    return true;
  } catch {
    return false;
  }
}

const releaseSource = await readFile(path.join(sourceDir, "openusd_release_index_source.html"), "utf8");
const apiSource = await readFile(path.join(sourceDir, "openusd_api_index_source.html"), "utf8");
const releaseHtml = await readSite("release_index.html");
const apiHtml = await readSite("index.html");
const apiRedirectHtml = await readSite("api/index.html");

const releaseNavGroups = [
  { zh: "学习", en: "Learn" },
  { zh: "用户指南", en: "User Guides" },
  { zh: "参考", en: "Reference" },
  { zh: "规范", en: "Specifications" },
];

const releaseAdjacentLinks = [
  "intro.html",
  "glossary.html",
  "apiDocs.html",
  "toolset.html",
  "api/index.html",
];

const releasePreservedOutOfScopeLinks = [
  "spec.html",
  "tutorials.html",
  "user_guides/variable_expressions.html",
];

const apiNavigationAssets = [
  "menudata.js",
  "menu.js",
  "navtreedata.js",
  "navtree.js",
  "search/search.js",
  "search/searchdata.js",
];

const apiNavigationRuntimeAssets = [
  "navtreeindex0.js",
  "openusd_local_navtree.js",
];

const apiEntryLinks = [
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "https://openusd.org/license",
];

const releaseGroupResults = releaseNavGroups.map((entry) => ({
  ...entry,
  zh_present: releaseHtml.includes(entry.zh),
  en_present: releaseHtml.includes(entry.en),
  passed: releaseHtml.includes(entry.zh) && releaseHtml.includes(entry.en),
}));

const releaseAdjacentLinkResults = releaseAdjacentLinks.map((href) => ({
  href,
  present: releaseHtml.includes(href),
  passed: releaseHtml.includes(href),
}));

const preservedOutOfScopeResults = releasePreservedOutOfScopeLinks.map((href) => ({
  href,
  present: releaseHtml.includes(href),
  passed: releaseHtml.includes(href),
}));

const apiNavigationAssetResults = apiNavigationAssets.map((asset) => ({
  asset,
  present: apiHtml.includes(asset),
  passed: apiHtml.includes(asset),
}));

const apiNavigationRuntimeAssetResults = await Promise.all(apiNavigationRuntimeAssets.map(async (asset) => ({
  asset,
  present: await existsInSite(asset),
  passed: await existsInSite(asset),
})));

const apiEntryLinkResults = apiEntryLinks.map((href) => ({
  href,
  present: apiHtml.includes(href),
  passed: apiHtml.includes(href),
}));

const apiRouteStepBlocks = blocks(apiHtml, /<div class="cn-api-route-step">[\s\S]*?<\/div>/g);
const apiRouteStepLinkResults = apiEntryLinks.map((href) => ({
  href,
  present_in_route_step: apiRouteStepBlocks.some((block) => block.includes(`href="${href}"`)),
  passed: apiRouteStepBlocks.some((block) => block.includes(`href="${href}"`)),
}));

const counts = {
  release_toctree_links: count(releaseHtml, /class="toctree-l/g),
  release_card_links: count(releaseHtml, /sd-card-text/g),
  release_adjacent_links_present: releaseAdjacentLinkResults.filter((entry) => entry.passed).length,
  api_navigation_assets_present: apiNavigationAssetResults.filter((entry) => entry.passed).length,
  api_navigation_runtime_assets_present: apiNavigationRuntimeAssetResults.filter((entry) => entry.passed).length,
  api_entry_links_present: apiEntryLinkResults.filter((entry) => entry.passed).length,
  api_entry_cards: count(apiHtml, /class="cn-api-entry-card"/g),
  api_route_steps: apiRouteStepBlocks.length,
  api_route_step_links_present: apiRouteStepLinkResults.filter((entry) => entry.passed).length,
};

const checks = [
  check("navigation:release_source_has_core_groups", hasAll(releaseSource, ["Learn", "User Guides", "Reference", "Specifications"])),
  check("navigation:release_groups_are_bilingual", releaseGroupResults.every((entry) => entry.passed), {
    failed_groups: releaseGroupResults.filter((entry) => !entry.passed),
  }),
  check("navigation:release_adjacent_links_present", releaseAdjacentLinkResults.every((entry) => entry.passed), {
    failed_links: releaseAdjacentLinkResults.filter((entry) => !entry.passed),
  }),
  check("navigation:release_out_of_scope_links_preserved", preservedOutOfScopeResults.every((entry) => entry.passed), {
    missing_preserved_links: preservedOutOfScopeResults.filter((entry) => !entry.passed),
  }),
  check("navigation:api_source_has_adjacent_links", hasAll(apiSource, ["_usd__overview_and_purpose.html", "usd_page_front.html"])),
  check("navigation:api_doxygen_navigation_shell_present", hasAll(apiHtml, ['id="main-nav"', 'id="side-nav"', "initNavTree('index.html','')", "searchBox"]) && apiNavigationAssetResults.every((entry) => entry.passed), {
    missing_assets: apiNavigationAssetResults.filter((entry) => !entry.passed),
  }),
  check("navigation:api_doxygen_runtime_assets_present", apiNavigationRuntimeAssetResults.every((entry) => entry.passed) && apiHtml.includes("openusd_local_navtree.js"), {
    missing_assets: apiNavigationRuntimeAssetResults.filter((entry) => !entry.passed),
    local_navtree_script_referenced: apiHtml.includes("openusd_local_navtree.js"),
  }),
  check("navigation:api_entry_links_present", apiEntryLinkResults.every((entry) => entry.passed) && counts.api_entry_cards >= 3, {
    failed_links: apiEntryLinkResults.filter((entry) => !entry.passed),
    api_entry_cards: counts.api_entry_cards,
  }),
  check("navigation:api_route_guide_links_present", apiRouteStepLinkResults.every((entry) => entry.passed) && counts.api_route_steps >= 3, {
    failed_links: apiRouteStepLinkResults.filter((entry) => !entry.passed),
    api_route_steps: counts.api_route_steps,
  }),
  check("navigation:api_redirect_points_to_local_index", apiRedirectHtml.includes('http-equiv="refresh"') && apiRedirectHtml.includes("../index.html")),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Navigation coverage audit for the current bounded OpenUSD bilingual reproduction. It checks that the release/API entry navigation shell, in-scope adjacent links, and intentionally preserved out-of-scope links remain intact.",
  release_navigation_groups: releaseGroupResults,
  release_adjacent_links: releaseAdjacentLinkResults,
  release_preserved_out_of_scope_links: preservedOutOfScopeResults,
  api_navigation_assets: apiNavigationAssetResults,
  api_entry_links: apiEntryLinkResults,
  api_route_step_links: apiRouteStepLinkResults,
  counts: {
    checks: checks.length,
    failed_checks: failedChecks.length,
    ...counts,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "navigation_coverage_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Navigation Coverage Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}
- Release adjacent links present: ${report.counts.release_adjacent_links_present}
- API navigation assets present: ${report.counts.api_navigation_assets_present}
- API entry links present: ${report.counts.api_entry_links_present}
- API entry cards: ${report.counts.api_entry_cards}
- API route steps: ${report.counts.api_route_steps}
- API route step links present: ${report.counts.api_route_step_links_present}

Policy:

- In-scope adjacent links are local and must remain reachable.
- Out-of-scope documentation links stay as official relative links until explicitly added.
- Doxygen and Sphinx navigation shells remain structurally intact.
- This audit does not add pages and does not crawl the full site.
`;

await writeFile(path.join(reportDir, "navigation_coverage_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "navigation_coverage_audit.json"),
  reportMd: path.join(reportDir, "navigation_coverage_audit.md"),
}, null, 2));
