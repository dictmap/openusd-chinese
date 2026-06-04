import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const releaseOfficialMarkers = [
  "_static/css/theme.css",
  "_static/sphinx-design.min.css",
  "wy-nav-side",
  "wy-nav-content",
  "toctree-wrapper",
  "sd-card",
  "USD Home",
  "intro.html",
  "glossary.html",
  "api/index.html",
  "toolset.html",
  "piper-banner.jpg",
];

const releaseLocalMarkers = [
  "_static/css/theme.css",
  "openusd_release_cn.css",
  "wy-nav-side",
  "wy-nav-content",
  "toctree-wrapper",
  "sd-card",
  "cn-repro-scope",
  "cn-term",
  "en-term",
  "images/USDLogoUnsized.svg",
  "images/piper-banner.jpg",
];

const releaseNavigationGroups = [
  "Learn",
  "User Guides",
  "Reference",
  "Specifications",
];

const apiOfficialMarkers = [
  "<!-- HTML header for doxygen",
  "navtreedata.js",
  "doxygen.css",
  "doxygen-awesome.css",
  "USDLogoDocs.png",
  "searchBox",
  "menudata.js",
  '<div id="nav-tree"',
  "MSearchSelectWindow",
  "USDLogoLrgWithAlpha.png",
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "https://openusd.org/license",
  "Generated on Wed Apr 22 2026",
];

const apiLocalMarkers = [
  "navtreedata.js",
  "doxygen.css",
  "doxygen-awesome.css",
  "openusd_cn.css",
  "USDLogoDocs.png",
  "searchBox",
  "menudata.js",
  '<div id="nav-tree"',
  "MSearchSelectWindow",
  "USDLogoLrgWithAlpha.png",
  "cn-repro-note",
  "cn-api-entry-grid",
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "https://openusd.org/license",
  "Generated on Wed Apr 22 2026",
];

const apiEntryLinks = [
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "https://openusd.org/license",
];

const adjacentPages = [
  {
    page: "intro.html",
    family: "sphinx",
    markers: ["wy-nav-side", "wy-nav-content", "toctree-l1", "openusd_release_cn.css", "cn-repro-scope"],
  },
  {
    page: "apiDocs.html",
    family: "sphinx",
    markers: ["wy-nav-side", "wy-nav-content", "toctree-l1", "openusd_release_cn.css", "cn-repro-scope", "api/index.html"],
  },
  {
    page: "glossary.html",
    family: "sphinx",
    markers: ["wy-nav-side", "wy-nav-content", "toctree-l1", "openusd_release_cn.css", "cn-repro-scope", "cn-glossary-grid"],
  },
  {
    page: "toolset.html",
    family: "sphinx",
    markers: ["wy-nav-side", "wy-nav-content", "toctree-l1", "openusd_release_cn.css", "cn-repro-scope", "cn-tool-grid"],
  },
  {
    page: "_usd__overview_and_purpose.html",
    family: "doxygen",
    markers: ["navtreedata.js", "doxygen.css", '<div id="nav-tree"', "openusd_cn.css", "cn-repro-note"],
  },
  {
    page: "usd_page_front.html",
    family: "doxygen",
    markers: ["navtreedata.js", "doxygen.css", '<div id="nav-tree"', "openusd_cn.css", "cn-repro-note"],
  },
];

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function markerAudit(text, markers) {
  return {
    total: markers.length,
    present: markers.filter((marker) => text.includes(marker)),
    missing: markers.filter((marker) => !text.includes(marker)),
  };
}

async function readProjectFile(...parts) {
  return readFile(path.join(root, ...parts), "utf8");
}

const releaseSource = await readProjectFile("source", "openusd_release_index_source.html");
const releaseLocal = await readProjectFile("site", "release_index.html");
const apiSource = await readProjectFile("source", "openusd_api_index_source.html");
const apiLocal = await readProjectFile("site", "index.html");

const releaseOfficialAudit = markerAudit(releaseSource, releaseOfficialMarkers);
const releaseLocalAudit = markerAudit(releaseLocal, releaseLocalMarkers);
const releaseSourceNav = markerAudit(releaseSource, releaseNavigationGroups);
const releaseLocalNav = markerAudit(releaseLocal, releaseNavigationGroups);
const apiOfficialAudit = markerAudit(apiSource, apiOfficialMarkers);
const apiLocalAudit = markerAudit(apiLocal, apiLocalMarkers);
const apiSourceLinks = markerAudit(apiSource, apiEntryLinks);
const apiLocalLinks = markerAudit(apiLocal, apiEntryLinks);

const adjacentAudits = [];
for (const contract of adjacentPages) {
  const html = await readProjectFile("site", contract.page);
  const audit = markerAudit(html, contract.markers);
  adjacentAudits.push({
    page: contract.page,
    family: contract.family,
    marker_count: audit.total,
    markers_present: audit.present.length,
    missing_markers: audit.missing,
    passed: audit.missing.length === 0,
  });
}

const checks = [
  check("structure:official_release_shell_ready", releaseOfficialAudit.missing.length === 0, {
    missing_markers: releaseOfficialAudit.missing,
  }),
  check("structure:local_release_shell_preserved", releaseLocalAudit.missing.length === 0, {
    missing_markers: releaseLocalAudit.missing,
  }),
  check("structure:release_navigation_groups_preserved", releaseSourceNav.missing.length === 0 && releaseLocalNav.missing.length === 0, {
    source_missing: releaseSourceNav.missing,
    local_missing: releaseLocalNav.missing,
  }),
  check("structure:official_api_shell_ready", apiOfficialAudit.missing.length === 0, {
    missing_markers: apiOfficialAudit.missing,
  }),
  check("structure:local_api_shell_preserved", apiLocalAudit.missing.length === 0, {
    missing_markers: apiLocalAudit.missing,
  }),
  check("structure:api_entry_links_preserved", apiSourceLinks.missing.length === 0 && apiLocalLinks.missing.length === 0, {
    source_missing: apiSourceLinks.missing,
    local_missing: apiLocalLinks.missing,
  }),
  check("structure:adjacent_page_shells_preserved", adjacentAudits.every((entry) => entry.passed), {
    failed_pages: adjacentAudits.filter((entry) => !entry.passed).map((entry) => ({
      page: entry.page,
      missing_markers: entry.missing_markers,
    })),
  }),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Entry structure parity audit for the bounded OpenUSD bilingual reproduction. It compares official source snapshots and local outputs using structural markers only: Sphinx/Doxygen shell, navigation groups, entry links, card regions, and local bilingual layers. It does not store official body text or add pages.",
  official_scope_urls: [
    "https://openusd.org/release/index.html",
    "https://openusd.org/release/api/index.html",
  ],
  marker_sets: {
    release_official: releaseOfficialMarkers,
    release_local: releaseLocalMarkers,
    release_navigation_groups: releaseNavigationGroups,
    api_official: apiOfficialMarkers,
    api_local: apiLocalMarkers,
    api_entry_links: apiEntryLinks,
  },
  audits: {
    release_official: releaseOfficialAudit,
    release_local: releaseLocalAudit,
    release_source_navigation: releaseSourceNav,
    release_local_navigation: releaseLocalNav,
    api_official: apiOfficialAudit,
    api_local: apiLocalAudit,
    api_source_links: apiSourceLinks,
    api_local_links: apiLocalLinks,
    adjacent_pages: adjacentAudits,
  },
  counts: {
    release_official_markers: releaseOfficialAudit.present.length,
    release_local_markers: releaseLocalAudit.present.length,
    release_navigation_groups_source: releaseSourceNav.present.length,
    release_navigation_groups_local: releaseLocalNav.present.length,
    api_official_markers: apiOfficialAudit.present.length,
    api_local_markers: apiLocalAudit.present.length,
    api_entry_links_source: apiSourceLinks.present.length,
    api_entry_links_local: apiLocalLinks.present.length,
    adjacent_pages_checked: adjacentAudits.length,
    adjacent_pages_passed: adjacentAudits.filter((entry) => entry.passed).length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "entry_structure_parity_audit.json"), JSON.stringify(report, null, 2), "utf8");

const adjacentRows = adjacentAudits.map((entry) => {
  return `| ${entry.page} | ${entry.family} | ${entry.markers_present}/${entry.marker_count} | ${entry.passed} |`;
}).join("\n");

const md = `# OpenUSD Entry Structure Parity Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Release official markers: ${report.counts.release_official_markers}/${releaseOfficialMarkers.length}
- Release local markers: ${report.counts.release_local_markers}/${releaseLocalMarkers.length}
- Release navigation groups: ${report.counts.release_navigation_groups_local}/${releaseNavigationGroups.length}
- API official markers: ${report.counts.api_official_markers}/${apiOfficialMarkers.length}
- API local markers: ${report.counts.api_local_markers}/${apiLocalMarkers.length}
- API entry links: ${report.counts.api_entry_links_local}/${apiEntryLinks.length}
- Adjacent pages checked: ${report.counts.adjacent_pages_checked}
- Adjacent pages passed: ${report.counts.adjacent_pages_passed}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

| Adjacent Page | Family | Markers | Passed |
| --- | --- | --- | --- |
${adjacentRows}

Policy:

- Preserve the Sphinx release shell on release-family pages.
- Preserve the Doxygen API shell on API-family pages.
- Keep official entry links and navigation group names available while adding Chinese labels.
- Keep this audit marker-based; do not copy official body text into reports.
`;

await writeFile(path.join(reportDir, "entry_structure_parity_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "entry_structure_parity_audit.json"),
  reportMd: path.join(reportDir, "entry_structure_parity_audit.md"),
}, null, 2));
