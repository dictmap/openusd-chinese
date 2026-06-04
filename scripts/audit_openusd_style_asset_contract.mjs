import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");

const doxygenAssets = [
  "tabs.css",
  "jquery.js",
  "dynsections.js",
  "navtree.css",
  "resize.js",
  "navtreedata.js",
  "navtree.js",
  "search/search.css",
  "search/searchdata.js",
  "search/search.js",
  "doxygen.css",
  "doxygen-awesome.css",
  "usd_style.css",
  "menudata.js",
  "menu.js",
  "USDLogoDocs.png",
  "USDLogoLrgWithAlpha.png",
  "doxygen.svg",
  "images/USDIcon.ico",
];

const sphinxAssets = [
  "_static/pygments.css",
  "_static/sphinx-design.min.css",
  "_static/css/theme.css",
  "_static/css/pxr_custom.css",
  "_static/jquery.js",
  "_static/_sphinx_javascript_frameworks_compat.js",
  "_static/documentation_options.js",
  "_static/doctools.js",
  "_static/sphinx_highlight.js",
  "_static/design-tabs.js",
  "_static/js/versions.js",
  "_static/js/theme.js",
  "_static/css/fonts/fontawesome-webfont.woff2",
  "_static/css/fonts/lato-normal.woff2",
  "_static/css/fonts/lato-bold.woff2",
  "_static/css/fonts/Roboto-Slab-Regular.woff2",
  "_static/css/fonts/Roboto-Slab-Bold.woff2",
];

const releaseAssets = [
  "images/USDLogoUnsized.svg",
  "images/USDLogo24.svg",
  "images/USDIcon.ico",
  "images/piper-banner.jpg",
  "_images/glossary_radiusSpline.png",
  "_images/glossary_usdviewValidation.png",
  "openusd_release_cn.css",
  "openusd_cn.css",
];

const releaseCssSelectors = [
  ".cn-repro-scope",
  ".bilingual-brief",
  ".cn-glossary-summary",
  ".cn-definition-brief",
  ".cn-toolset-summary",
  ".cn-tool-scenarios",
  ".cn-tool-options",
];

const apiCssSelectors = [
  ".bilingual-block",
  ".cn-term",
  ".en-term",
  ".cn-api-entry-map",
  ".cn-api-entry-card",
  ".cn-repro-note",
  ".key-class-line",
];

const pageAssetMarkers = [
  { page: "release_index.html", markers: ["openusd_release_cn.css", "_static/css/theme.css", "images/USDLogoUnsized.svg", "images/piper-banner.jpg"] },
  { page: "glossary.html", markers: ["openusd_release_cn.css", "_images/glossary_radiusSpline.png", "_images/glossary_usdviewValidation.png"] },
  { page: "toolset.html", markers: ["openusd_release_cn.css", "cn-tool-scenarios", "cn-tool-options"] },
  { page: "index.html", markers: ["openusd_cn.css", "doxygen.css", "doxygen-awesome.css", "USDLogoDocs.png", "USDLogoLrgWithAlpha.png"] },
  { page: "_usd__overview_and_purpose.html", markers: ["openusd_cn.css", "doxygen.css", "search/search.css"] },
  { page: "usd_page_front.html", markers: ["openusd_cn.css", "doxygen.css", "search/search.css"] },
];

async function fileInfo(relativePath) {
  const fullPath = path.join(siteDir, relativePath);
  try {
    await access(fullPath);
    const info = await stat(fullPath);
    return { path: relativePath, exists: true, size: info.size, passed: info.size > 0 };
  } catch {
    return { path: relativePath, exists: false, size: 0, passed: false };
  }
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function missingMarkers(html, markers) {
  return markers.filter((marker) => !html.includes(marker));
}

const doxygenAssetResults = [];
for (const asset of doxygenAssets) doxygenAssetResults.push(await fileInfo(asset));

const sphinxAssetResults = [];
for (const asset of sphinxAssets) sphinxAssetResults.push(await fileInfo(asset));

const releaseAssetResults = [];
for (const asset of releaseAssets) releaseAssetResults.push(await fileInfo(asset));

const releaseCss = await readFile(path.join(siteDir, "openusd_release_cn.css"), "utf8");
const apiCss = await readFile(path.join(siteDir, "openusd_cn.css"), "utf8");
const releaseSelectorResults = releaseCssSelectors.map((selector) => ({ selector, present: releaseCss.includes(selector), passed: releaseCss.includes(selector) }));
const apiSelectorResults = apiCssSelectors.map((selector) => ({ selector, present: apiCss.includes(selector), passed: apiCss.includes(selector) }));

const pageMarkerResults = [];
for (const spec of pageAssetMarkers) {
  const html = await readFile(path.join(siteDir, spec.page), "utf8");
  pageMarkerResults.push({
    page: spec.page,
    missing_markers: missingMarkers(html, spec.markers),
    passed: missingMarkers(html, spec.markers).length === 0,
  });
}

const generatedPages = [
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
let aggregateHtml = "";
for (const page of generatedPages) aggregateHtml += await readFile(path.join(siteDir, page), "utf8");

const checks = [
  check("assets:doxygen_core_assets_present", doxygenAssetResults.every((asset) => asset.passed), {
    missing_assets: doxygenAssetResults.filter((asset) => !asset.passed),
  }),
  check("assets:sphinx_core_assets_present", sphinxAssetResults.every((asset) => asset.passed), {
    missing_assets: sphinxAssetResults.filter((asset) => !asset.passed),
  }),
  check("assets:release_and_local_bilingual_assets_present", releaseAssetResults.every((asset) => asset.passed), {
    missing_assets: releaseAssetResults.filter((asset) => !asset.passed),
  }),
  check("styles:release_bilingual_selectors_present", releaseSelectorResults.every((entry) => entry.passed), {
    missing_selectors: releaseSelectorResults.filter((entry) => !entry.passed),
  }),
  check("styles:api_bilingual_selectors_present", apiSelectorResults.every((entry) => entry.passed), {
    missing_selectors: apiSelectorResults.filter((entry) => !entry.passed),
  }),
  check("styles:page_asset_markers_present", pageMarkerResults.every((entry) => entry.passed), {
    failed_pages: pageMarkerResults.filter((entry) => !entry.passed),
  }),
  check("assets:no_remote_openusd_image_refs", !/https:\/\/openusd\.org\/images/.test(aggregateHtml + releaseCss + apiCss)),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Style and asset contract audit for the bounded OpenUSD bilingual reproduction. It checks Sphinx/Doxygen core assets, local bilingual CSS selectors, page asset references, and absence of remote OpenUSD image references.",
  doxygen_assets: doxygenAssetResults,
  sphinx_assets: sphinxAssetResults,
  release_assets: releaseAssetResults,
  release_css_selectors: releaseSelectorResults,
  api_css_selectors: apiSelectorResults,
  page_asset_markers: pageMarkerResults,
  counts: {
    doxygen_assets: doxygenAssetResults.length,
    sphinx_assets: sphinxAssetResults.length,
    release_assets: releaseAssetResults.length,
    release_css_selectors: releaseSelectorResults.length,
    api_css_selectors: apiSelectorResults.length,
    pages_checked: pageMarkerResults.length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "style_asset_contract_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Style And Asset Contract Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Doxygen core assets: ${report.counts.doxygen_assets}
- Sphinx core assets: ${report.counts.sphinx_assets}
- Release/local bilingual assets: ${report.counts.release_assets}
- Release CSS selectors: ${report.counts.release_css_selectors}
- API CSS selectors: ${report.counts.api_css_selectors}
- Pages checked for asset markers: ${report.counts.pages_checked}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Policy:

- Keep Doxygen and Sphinx base styles/scripts local and present.
- Keep OpenUSD logos, banner, glossary images, and fonts local.
- Keep the Chinese bilingual CSS layer explicit and inspectable.
- Generated pages must not depend on remote OpenUSD image URLs.
`;

await writeFile(path.join(reportDir, "style_asset_contract_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "style_asset_contract_audit.json"),
  reportMd: path.join(reportDir, "style_asset_contract_audit.md"),
}, null, 2));
