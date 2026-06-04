import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const sourceDir = path.join(root, "source");
const reportDir = path.join(root, "reports");

const expectedHtmlPages = [
  "_usd__overview_and_purpose.html",
  "api/index.html",
  "apiDocs.html",
  "glossary.html",
  "index.html",
  "intro.html",
  "release_index.html",
  "toolset.html",
  "uncovered_openusd_page.html",
  "usd_page_front.html",
];

const expectedSourceSnapshots = [
  "openusd_api_index_source.html",
  "openusd_api_overview_and_purpose_source.html",
  "openusd_api_usd_page_front_source.html",
  "openusd_release_apiDocs_source.html",
  "openusd_release_glossary_source.html",
  "openusd_release_index_source.html",
  "openusd_release_intro_source.html",
  "openusd_release_toolset_source.html",
];

const requiredReports = [
  "audit_index.json",
  "all_pages_inventory.json",
  "all_pages_inventory.md",
  "api_full_batch_report.json",
  "api_full_batch_report.md",
  "chinese_first_order_contract_audit.json",
  "entry_label_contract_audit.json",
  "entry_structure_parity_audit.json",
  "full_draft_preview_audit.json",
  "http_preview_audit.json",
  "link_audit.json",
  "local_link_routing_report.json",
  "local_link_routing_report.md",
  "local_preview_index.json",
  "local_preview_index.md",
  "navigation_coverage_audit.json",
  "official_entry_freshness_audit.json",
  "page_metadata_contract_audit.json",
  "primary_entry_coverage.json",
  "release_full_batch_report.json",
  "release_full_batch_report.md",
  "responsive_layout_contract_audit.json",
  "scope_manifest.json",
  "source_provenance_audit.json",
  "style_asset_contract_audit.json",
  "term_consistency_audit.json",
  "validation_report.json",
];

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath, base));
    } else {
      files.push(path.relative(base, fullPath).replaceAll(path.sep, "/"));
    }
  }
  return files;
}

function sorted(value) {
  return [...value].sort((a, b) => a.localeCompare(b));
}

function difference(actual, expected) {
  const expectedSet = new Set(expected);
  return actual.filter((item) => !expectedSet.has(item));
}

function missing(actual, expected) {
  const actualSet = new Set(actual);
  return expected.filter((item) => !actualSet.has(item));
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

const siteFiles = await walk(siteDir);
const sourceFiles = await readdir(sourceDir);
const reportFiles = await readdir(reportDir);

const htmlPages = sorted(siteFiles.filter((file) => file.endsWith(".html")));
const sourceSnapshots = sorted(sourceFiles.filter((file) => file.endsWith(".html")));
const unexpectedHtmlPages = difference(htmlPages, expectedHtmlPages);
const missingHtmlPages = missing(htmlPages, expectedHtmlPages);
const unexpectedSourceSnapshots = difference(sourceSnapshots, expectedSourceSnapshots);
const missingSourceSnapshots = missing(sourceSnapshots, expectedSourceSnapshots);
const missingReports = missing(reportFiles, requiredReports);

const scopeManifest = JSON.parse(await readFile(path.join(reportDir, "scope_manifest.json"), "utf8"));
const activeAdjacentScope = scopeManifest.active_adjacent_scope ?? [];
const primaryScope = scopeManifest.primary_scope ?? [];

const checks = [
  check("scope:html_pages_match_whitelist", unexpectedHtmlPages.length === 0 && missingHtmlPages.length === 0, {
    html_pages: htmlPages,
    unexpected_html_pages: unexpectedHtmlPages,
    missing_html_pages: missingHtmlPages,
  }),
  check("scope:source_snapshots_match_whitelist", unexpectedSourceSnapshots.length === 0 && missingSourceSnapshots.length === 0, {
    source_snapshots: sourceSnapshots,
    unexpected_source_snapshots: unexpectedSourceSnapshots,
    missing_source_snapshots: missingSourceSnapshots,
  }),
  check("scope:primary_scope_has_two_entries", primaryScope.length === 2),
  check("scope:active_adjacent_scope_limited", activeAdjacentScope.length === 6 && (scopeManifest.adjacent_entry_priority ?? []).length === 0),
  check("scope:required_reports_exist", missingReports.length === 0, { required_reports: requiredReports, missing_reports: missingReports }),
  check(
    "scope:internal_link_routing_policy_documented",
    scopeManifest.link_policy?.known_internal_release_api_html_links === "rewrite_to_local_inventory_output"
      && scopeManifest.link_policy?.internal_release_api_html_links_not_in_inventory === "route_to_site_uncovered_openusd_page_placeholder"
      && scopeManifest.link_policy?.explicit_official_links === "preserve_official_url",
  ),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "This audit verifies the completed site/ bilingual subset, source-snapshot subset, manifest entries, and required report set while the full OpenUSD release/API queue is tracked separately under full_site/ and reports/all_pages_inventory.json.",
  expected_html_pages: expectedHtmlPages,
  actual_html_pages: htmlPages,
  expected_source_snapshots: expectedSourceSnapshots,
  actual_source_snapshots: sourceSnapshots,
  required_reports: requiredReports,
  counts: {
    html_pages: htmlPages.length,
    source_snapshots: sourceSnapshots.length,
    primary_scope_entries: primaryScope.length,
    active_adjacent_scope_entries: activeAdjacentScope.length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "scope_boundary_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Scope Boundary Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Local HTML pages: ${report.counts.html_pages}
- Source snapshots: ${report.counts.source_snapshots}
- Primary scope entries: ${report.counts.primary_scope_entries}
- Active adjacent scope entries: ${report.counts.active_adjacent_scope_entries}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Policy:

- The completed \`site/\` bilingual subset remains the two primary entries, six completed adjacent entries, and one local redirect.
- Full-scope draft pages are tracked separately under \`full_site/release/\` and \`full_site/api/\`.
- Source snapshots for completed pages stay in the curated root source set; draft source snapshots stay under \`source/full_release/\` and \`source/full_api/\`.
- This audit is a completed-subset and report-set guard; full queue coverage is measured by \`reports/all_pages_inventory.json\`.
`;

await writeFile(path.join(reportDir, "scope_boundary_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "scope_boundary_audit.json"),
  reportMd: path.join(reportDir, "scope_boundary_audit.md"),
}, null, 2));
