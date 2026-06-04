import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const officialEntries = [
  {
    key: "release",
    url: "https://openusd.org/release/index.html",
    sourceSnapshot: "source/openusd_release_index_source.html",
    localOutput: "site/release_index.html",
    liveMarkers: [
      "USD Home",
      "Universal Scene Description 26.05 documentation",
      "Introduction to USD",
      "Terms and Concepts",
      "API Documentation",
      "Toolset",
      "api/index.html",
      "piper-banner.jpg",
    ],
    localMarkers: [
      "cn-repro-scope",
      "openusd_release_cn.css",
      "intro.html",
      "glossary.html",
      "apiDocs.html",
      "toolset.html",
      "api/index.html",
    ],
  },
  {
    key: "api",
    url: "https://openusd.org/release/api/index.html",
    sourceSnapshot: "source/openusd_api_index_source.html",
    localOutput: "site/index.html",
    liveMarkers: [
      "Universal Scene Description (USD)",
      "Generated on Wed Apr 22 2026",
      "USD is a system for authoring, composing, and reading hierarchically organized scene description",
      "_usd__overview_and_purpose.html",
      "usd_page_front.html",
      "USDLogoLrgWithAlpha.png",
      "https://openusd.org/license",
    ],
    localMarkers: [
      "cn-repro-note",
      "cn-api-entry-map",
      "_usd__overview_and_purpose.html",
      "usd_page_front.html",
      "https://openusd.org/license",
    ],
  },
];

const localRedirect = {
  key: "api_redirect",
  localOutput: "site/api/index.html",
  markers: ['http-equiv="refresh"', "../index.html"],
};

function countPresent(html, markers) {
  return markers.filter((marker) => html.includes(marker)).length;
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function extractTitle(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    return null;
  }
  return titleMatch[1].replace(/\s+/g, " ").trim();
}

async function readProjectFile(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function fetchOfficialEntry(entry) {
  const startedAt = Date.now();
  const response = await fetch(entry.url, {
    headers: {
      "user-agent": "openusd-api-cn-repro-freshness-audit/1.0",
      accept: "text/html,application/xhtml+xml",
    },
  });
  const html = await response.text();
  return {
    key: entry.key,
    url: entry.url,
    status: response.status,
    ok: response.ok,
    elapsed_ms: Date.now() - startedAt,
    title: extractTitle(html),
    marker_count: countPresent(html, entry.liveMarkers),
    marker_total: entry.liveMarkers.length,
    missing_markers: entry.liveMarkers.filter((marker) => !html.includes(marker)),
    html,
  };
}

const liveEntries = [];
for (const entry of officialEntries) {
  liveEntries.push(await fetchOfficialEntry(entry));
}

const auditedEntries = [];
for (const entry of officialEntries) {
  const live = liveEntries.find((item) => item.key === entry.key);
  const sourceHtml = await readProjectFile(entry.sourceSnapshot);
  const localHtml = await readProjectFile(entry.localOutput);
  const sourceMarkerCount = countPresent(sourceHtml, entry.liveMarkers);
  const localLiveMarkerCount = countPresent(localHtml, entry.liveMarkers);
  const localBilingualMarkerCount = countPresent(localHtml, entry.localMarkers);

  auditedEntries.push({
    key: entry.key,
    official_url: entry.url,
    source_snapshot: entry.sourceSnapshot,
    local_output: entry.localOutput,
    live: {
      status: live.status,
      ok: live.ok,
      elapsed_ms: live.elapsed_ms,
      title: live.title,
      marker_count: live.marker_count,
      marker_total: live.marker_total,
      missing_markers: live.missing_markers,
    },
    source_snapshot_marker_count: sourceMarkerCount,
    source_snapshot_marker_total: entry.liveMarkers.length,
    source_snapshot_missing_markers: entry.liveMarkers.filter((marker) => !sourceHtml.includes(marker)),
    local_live_marker_count: localLiveMarkerCount,
    local_live_marker_total: entry.liveMarkers.length,
    local_live_missing_markers: entry.liveMarkers.filter((marker) => !localHtml.includes(marker)),
    local_bilingual_marker_count: localBilingualMarkerCount,
    local_bilingual_marker_total: entry.localMarkers.length,
    local_bilingual_missing_markers: entry.localMarkers.filter((marker) => !localHtml.includes(marker)),
  });
}

const redirectHtml = await readProjectFile(localRedirect.localOutput);
const redirectMarkerCount = countPresent(redirectHtml, localRedirect.markers);

const checks = [
  ...auditedEntries.map((entry) => check(`official:${entry.key}:live_status_200`, entry.live.status === 200, {
    url: entry.official_url,
    status: entry.live.status,
    title: entry.live.title,
  })),
  ...auditedEntries.map((entry) => check(`official:${entry.key}:live_markers_present`, entry.live.missing_markers.length === 0, {
    marker_count: entry.live.marker_count,
    marker_total: entry.live.marker_total,
    missing_markers: entry.live.missing_markers,
  })),
  ...auditedEntries.map((entry) => check(`official:${entry.key}:source_snapshot_matches_live_markers`, entry.source_snapshot_missing_markers.length === 0, {
    source_snapshot: entry.source_snapshot,
    marker_count: entry.source_snapshot_marker_count,
    marker_total: entry.source_snapshot_marker_total,
    missing_markers: entry.source_snapshot_missing_markers,
  })),
  ...auditedEntries.map((entry) => check(`official:${entry.key}:local_output_keeps_live_markers`, entry.local_live_missing_markers.length === 0, {
    local_output: entry.local_output,
    marker_count: entry.local_live_marker_count,
    marker_total: entry.local_live_marker_total,
    missing_markers: entry.local_live_missing_markers,
  })),
  ...auditedEntries.map((entry) => check(`official:${entry.key}:local_output_keeps_bilingual_markers`, entry.local_bilingual_missing_markers.length === 0, {
    local_output: entry.local_output,
    marker_count: entry.local_bilingual_marker_count,
    marker_total: entry.local_bilingual_marker_total,
    missing_markers: entry.local_bilingual_missing_markers,
  })),
  check("official:api_redirect:local_target_ready", redirectMarkerCount === localRedirect.markers.length, {
    local_output: localRedirect.localOutput,
    marker_count: redirectMarkerCount,
    marker_total: localRedirect.markers.length,
  }),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const releaseEntry = auditedEntries.find((entry) => entry.key === "release");
const apiEntry = auditedEntries.find((entry) => entry.key === "api");

const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Live freshness audit for the two user-requested official entry URLs only. The report records status, titles, marker booleans, and local/source alignment counts; it does not mirror full pages or store official body text.",
  official_urls: officialEntries.map((entry) => entry.url),
  entries: auditedEntries,
  redirect: {
    local_output: localRedirect.localOutput,
    marker_count: redirectMarkerCount,
    marker_total: localRedirect.markers.length,
    missing_markers: localRedirect.markers.filter((marker) => !redirectHtml.includes(marker)),
  },
  counts: {
    official_urls: officialEntries.length,
    live_pages_ok: auditedEntries.filter((entry) => entry.live.status === 200).length,
    source_snapshots_checked: auditedEntries.filter((entry) => entry.source_snapshot_marker_total > 0).length,
    local_outputs_checked: auditedEntries.length + 1,
    release_live_markers_present: releaseEntry?.live.marker_count ?? 0,
    api_live_markers_present: apiEntry?.live.marker_count ?? 0,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "official_entry_freshness_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Official Entry Freshness Audit

Generated: ${report.generated_at}

Scope:

- \`https://openusd.org/release/index.html\`
- \`https://openusd.org/release/api/index.html\`

Result:

- Passed: ${report.passed}
- Official URLs checked: ${report.counts.official_urls}
- Live pages OK: ${report.counts.live_pages_ok}
- Source snapshots checked: ${report.counts.source_snapshots_checked}
- Local outputs checked: ${report.counts.local_outputs_checked}
- Release live markers present: ${report.counts.release_live_markers_present}
- API live markers present: ${report.counts.api_live_markers_present}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

Live titles:

- Release: ${releaseEntry?.live.title ?? "unavailable"}
- API: ${apiEntry?.live.title ?? "unavailable"}

Policy:

- Fetch only the two official entry URLs requested by the user.
- Store only status, titles, marker counts, and missing-marker lists.
- Compare live entry markers with existing source snapshots and local bilingual outputs.
- Preserve API names, page names, and links exactly while keeping Chinese-first local guidance.
- Do not widen this audit into a full-site mirror or body-text diff.
`;

await writeFile(path.join(reportDir, "official_entry_freshness_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "official_entry_freshness_audit.json"),
  reportMd: path.join(reportDir, "official_entry_freshness_audit.md"),
}, null, 2));
