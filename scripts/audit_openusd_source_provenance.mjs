import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const expectedTitles = {
  "source/openusd_release_index_source.html": "USD Home",
  "source/openusd_api_index_source.html": "Universal Scene Description (USD)",
  "source/openusd_release_intro_source.html": "Introduction to USD",
  "source/openusd_release_apiDocs_source.html": "API Documentation",
  "source/openusd_release_glossary_source.html": "USD Terms and Concepts",
  "source/openusd_release_toolset_source.html": "USD Toolset",
  "source/openusd_api_overview_and_purpose_source.html": "Overview and Purpose",
  "source/openusd_api_usd_page_front_source.html": "Usd : Universal Scene Description",
};

const outputMarkers = {
  "site/release_index.html": ["cn-repro-scope", "USD Home"],
  "site/index.html": ["cn-repro-note", "Universal Scene Description (USD)"],
  "site/intro.html": ["cn-repro-scope", "Introduction to USD"],
  "site/apiDocs.html": ["cn-repro-scope", "API Documentation"],
  "site/glossary.html": ["cn-repro-scope", "USD Terms and Concepts"],
  "site/toolset.html": ["cn-repro-scope", "USD Toolset"],
  "site/_usd__overview_and_purpose.html": ["cn-repro-note", "Overview and Purpose"],
  "site/usd_page_front.html": ["cn-repro-note", "Usd : Universal Scene Description"],
};

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function hasAll(html, markers) {
  return markers.every((marker) => html.includes(marker));
}

function sourceKindFor(url) {
  return url.includes("/api/") ? "doxygen" : "sphinx";
}

const scopeManifest = JSON.parse(await readFile(path.join(reportDir, "scope_manifest.json"), "utf8"));
const entries = [
  ...(scopeManifest.primary_scope ?? []),
  ...(scopeManifest.active_adjacent_scope ?? []),
];

const entryResults = [];
const checks = [];

for (const entry of entries) {
  const expectedTitle = expectedTitles[entry.source_snapshot] ?? null;
  const sourceExists = await exists(entry.source_snapshot);
  const outputExists = await exists(entry.local_output);
  const generatorExists = entry.generator === "manual_bilingual_doxygen_entry" || await exists(entry.generator);
  const sourceHtml = sourceExists ? await readFile(path.join(root, entry.source_snapshot), "utf8") : "";
  const outputHtml = outputExists ? await readFile(path.join(root, entry.local_output), "utf8") : "";
  const sourceKind = sourceKindFor(entry.official_url);
  const sourceKindOk = sourceKind === "doxygen" ? sourceHtml.includes("Doxygen") : sourceHtml.includes("sphinx") || sourceHtml.includes("Sphinx");
  const outputKindOk = sourceKind === "doxygen"
    ? hasAll(outputHtml, ['id="top"', 'id="side-nav"', 'id="doc-content"'])
    : hasAll(outputHtml, ["wy-nav-side", "wy-nav-content", "rst-content"]);
  const outputMarkerOk = hasAll(outputHtml, outputMarkers[entry.local_output] ?? []);
  const titleOk = expectedTitle ? sourceHtml.includes(expectedTitle) && outputHtml.includes(expectedTitle) : false;

  const result = {
    official_url: entry.official_url,
    source_snapshot: entry.source_snapshot,
    local_output: entry.local_output,
    generator: entry.generator,
    source_kind: sourceKind,
    expected_title: expectedTitle,
    source_exists: sourceExists,
    output_exists: outputExists,
    generator_exists: generatorExists,
    source_kind_ok: sourceKindOk,
    output_kind_ok: outputKindOk,
    title_ok: titleOk,
    output_marker_ok: outputMarkerOk,
    passed: sourceExists && outputExists && generatorExists && sourceKindOk && outputKindOk && titleOk && outputMarkerOk,
  };
  entryResults.push(result);
}

checks.push(check("provenance:all_manifest_entries_have_sources_outputs_generators", entryResults.every((entry) => entry.source_exists && entry.output_exists && entry.generator_exists), {
  failed_entries: entryResults.filter((entry) => !(entry.source_exists && entry.output_exists && entry.generator_exists)),
}));
checks.push(check("provenance:source_and_output_kinds_match", entryResults.every((entry) => entry.source_kind_ok && entry.output_kind_ok), {
  failed_entries: entryResults.filter((entry) => !(entry.source_kind_ok && entry.output_kind_ok)),
}));
checks.push(check("provenance:titles_and_markers_preserved", entryResults.every((entry) => entry.title_ok && entry.output_marker_ok), {
  failed_entries: entryResults.filter((entry) => !(entry.title_ok && entry.output_marker_ok)),
}));

const localRedirect = await readFile(path.join(root, "site/api/index.html"), "utf8");
checks.push(check("provenance:api_redirect_is_local_helper", localRedirect.includes('http-equiv="refresh"') && localRedirect.includes("../index.html") && localRedirect.includes("The local bilingual Usd API reproduction")));
checks.push(check("provenance:manifest_scope_counts_stable", (scopeManifest.primary_scope ?? []).length === 2 && (scopeManifest.active_adjacent_scope ?? []).length === 6));

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Source provenance audit for the bounded OpenUSD bilingual reproduction. It ties each local page to its official URL, source snapshot, generator, and expected title/layout markers.",
  entries: entryResults,
  counts: {
    entries: entryResults.length,
    primary_scope_entries: (scopeManifest.primary_scope ?? []).length,
    active_adjacent_scope_entries: (scopeManifest.active_adjacent_scope ?? []).length,
    sphinx_entries: entryResults.filter((entry) => entry.source_kind === "sphinx").length,
    doxygen_entries: entryResults.filter((entry) => entry.source_kind === "doxygen").length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "source_provenance_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Source Provenance Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Manifest entries audited: ${report.counts.entries}
- Sphinx entries: ${report.counts.sphinx_entries}
- Doxygen entries: ${report.counts.doxygen_entries}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Policy:

- Each local page must have an official URL, source snapshot, local output, and generator recorded in \`scope_manifest.json\`.
- Sphinx/Doxygen layout markers must match the kind of official source page.
- Titles and local bilingual markers must remain aligned with their source snapshot.
- \`site/api/index.html\` remains a local redirect helper for the release page API link.
`;

await writeFile(path.join(reportDir, "source_provenance_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "source_provenance_audit.json"),
  reportMd: path.join(reportDir, "source_provenance_audit.md"),
}, null, 2));
