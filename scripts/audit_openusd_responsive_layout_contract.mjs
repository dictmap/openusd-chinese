import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const releasePages = [
  "release_index.html",
  "intro.html",
  "apiDocs.html",
  "glossary.html",
  "toolset.html",
];

const apiPages = [
  "index.html",
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
];

const redirectPages = [
  "api/index.html",
];

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

async function readProjectFile(...parts) {
  return readFile(path.join(root, ...parts), "utf8");
}

function hasAll(text, markers) {
  return markers.every((marker) => text.includes(marker));
}

function count(text, pattern) {
  return (text.match(pattern) || []).length;
}

const releaseCss = await readProjectFile("site", "openusd_release_cn.css");
const apiCss = await readProjectFile("site", "openusd_cn.css");
const apiIndexHtml = await readProjectFile("site", "index.html");
const releaseIndexHtml = await readProjectFile("site", "release_index.html");

const pageAudits = [];
for (const page of releasePages) {
  const html = await readProjectFile("site", page);
  pageAudits.push({
    page,
    group: "release",
    has_viewport: /<meta\s+name="viewport"/i.test(html),
    has_expected_css: html.includes("openusd_release_cn.css"),
    responsive_markers: {
      scope_or_layer: html.includes("cn-repro-scope"),
      local_bilingual_terms: html.includes('class="cn-term"') && html.includes('class="en-term"'),
    },
  });
}

for (const page of apiPages) {
  const html = await readProjectFile("site", page);
  pageAudits.push({
    page,
    group: "api",
    has_viewport: /<meta\s+name="viewport"/i.test(html),
    has_expected_css: html.includes("openusd_cn.css"),
    responsive_markers: {
      scope_or_layer: html.includes("cn-repro-note") || html.includes('class="zh"'),
      local_bilingual_terms: html.includes('class="zh"') && html.includes('class="en"'),
    },
  });
}

for (const page of redirectPages) {
  const html = await readProjectFile("site", page);
  pageAudits.push({
    page,
    group: "redirect",
    has_viewport: /<meta\s+name="viewport"/i.test(html),
    has_expected_css: true,
    responsive_markers: {
      scope_or_layer: html.includes("../index.html"),
      local_bilingual_terms: html.includes("本地双语复刻页") && html.includes("local bilingual Usd API reproduction"),
    },
  });
}

const releaseCssMarkers = [
  "@media (max-width: 640px)",
  ".cn-glossary-grid",
  ".cn-tool-grid",
  "grid-template-columns: 1fr",
  "overflow-wrap: break-word",
  ".cn-tool-options code",
];

const apiCssMarkers = [
  "@media (max-width: 700px)",
  ".cn-api-entry-grid",
  ".cn-api-route-list",
  ".cn-api-route-step",
  "grid-template-columns: 1fr",
  "overflow-wrap: break-word",
  ".textblock img",
  "max-width: 100%",
];

const apiRouteGuideCounts = {
  route_guides: count(apiIndexHtml, /class="cn-api-route-guide"/g),
  route_steps: count(apiIndexHtml, /class="cn-api-route-step"/g),
};

const apiRouteGuideMobileContract =
  /@media\s*\(max-width:\s*700px\)[\s\S]*\.cn-api-route-list\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(apiCss);

const checks = [
  check("responsive:all_pages_have_viewport", pageAudits.every((page) => page.has_viewport), {
    missing_viewport: pageAudits.filter((page) => !page.has_viewport).map((page) => page.page),
  }),
  check("responsive:release_pages_link_local_css", pageAudits.filter((page) => page.group === "release").every((page) => page.has_expected_css), {
    release_pages: releasePages,
  }),
  check("responsive:api_pages_link_local_css", pageAudits.filter((page) => page.group === "api").every((page) => page.has_expected_css), {
    api_pages: apiPages,
  }),
  check("responsive:release_css_has_mobile_contract", hasAll(releaseCss, releaseCssMarkers), {
    required_markers: releaseCssMarkers,
    missing_markers: releaseCssMarkers.filter((marker) => !releaseCss.includes(marker)),
  }),
  check("responsive:api_css_has_mobile_contract", hasAll(apiCss, apiCssMarkers), {
    required_markers: apiCssMarkers,
    missing_markers: apiCssMarkers.filter((marker) => !apiCss.includes(marker)),
  }),
  check("responsive:primary_entry_grids_present", apiIndexHtml.includes("cn-api-entry-grid") && releaseIndexHtml.includes("usd-index-card-header-color"), {
    api_grid: "cn-api-entry-grid",
    release_cards: "usd-index-card-header-color",
  }),
  check("responsive:api_route_guide_mobile_contract", apiRouteGuideCounts.route_guides >= 1 && apiRouteGuideCounts.route_steps >= 3 && apiRouteGuideMobileContract, {
    ...apiRouteGuideCounts,
    mobile_contract: apiRouteGuideMobileContract,
  }),
  check("responsive:adjacent_grids_present", (await readProjectFile("site", "glossary.html")).includes("cn-glossary-grid") && (await readProjectFile("site", "toolset.html")).includes("cn-tool-grid"), {
    glossary_grid: "cn-glossary-grid",
    toolset_grid: "cn-tool-grid",
  }),
  check("responsive:bilingual_markers_still_present", pageAudits.every((page) => page.responsive_markers.scope_or_layer && page.responsive_markers.local_bilingual_terms), {
    pages_without_markers: pageAudits.filter((page) => !(page.responsive_markers.scope_or_layer && page.responsive_markers.local_bilingual_terms)).map((page) => page.page),
  }),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Responsive layout contract audit for the existing bilingual OpenUSD entry pages. It checks viewport metadata, local bilingual CSS attachment, mobile grid fallback, and long-text wrapping markers without adding pages or mirroring more official content.",
  pages: pageAudits,
  counts: {
    pages_checked: pageAudits.length,
    pages_with_viewport: pageAudits.filter((page) => page.has_viewport).length,
    release_css_pages: pageAudits.filter((page) => page.group === "release" && page.has_expected_css).length,
    api_css_pages: pageAudits.filter((page) => page.group === "api" && page.has_expected_css).length,
    api_route_guide_steps: apiRouteGuideCounts.route_steps,
    responsive_css_files: [releaseCss, apiCss].filter((css) => css.includes("@media") && css.includes("overflow-wrap: break-word")).length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  css_contracts: {
    release_css_markers: releaseCssMarkers,
    api_css_markers: apiCssMarkers,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "responsive_layout_contract_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Responsive Layout Contract Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Pages checked: ${report.counts.pages_checked}
- Pages with viewport: ${report.counts.pages_with_viewport}
- Release pages with local CSS: ${report.counts.release_css_pages}
- API pages with local CSS: ${report.counts.api_css_pages}
- API route guide steps: ${report.counts.api_route_guide_steps}
- Responsive CSS files: ${report.counts.responsive_css_files}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Policy:

- Keep the current bounded page set: release/API primary entries, approved adjacent entries, and the local API redirect.
- Require viewport metadata so the Sphinx and Doxygen shells can scale on narrow screens.
- Keep local bilingual CSS attached to the release and API page families.
- Require mobile grid fallback and long-text wrapping for Chinese/English paired labels, API entry cards, glossary cards, and toolset guides.
- This is a layout-contract audit, not a screenshot or full-site crawl.
`;

await writeFile(path.join(reportDir, "responsive_layout_contract_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "responsive_layout_contract_audit.json"),
  reportMd: path.join(reportDir, "responsive_layout_contract_audit.md"),
}, null, 2));
