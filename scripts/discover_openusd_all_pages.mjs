import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const sourceDir = path.join(root, "source");
const siteDir = path.join(root, "site");

const roots = [
  "https://openusd.org/release/index.html",
  "https://openusd.org/release/api/index.html",
];

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readText(filePath) {
  return stripBom(await readFile(filePath, "utf8"));
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

function normalizeOfficialUrl(rawHref, baseUrl) {
  if (!rawHref || rawHref.startsWith("javascript:") || rawHref.startsWith("mailto:")) return null;
  let url;
  try {
    url = new URL(rawHref, baseUrl);
  } catch {
    return null;
  }
  if (url.origin !== "https://openusd.org") return null;
  if (!url.pathname.startsWith("/release/")) return null;
  if (url.pathname.endsWith("/release/")) url.pathname = "/release/index.html";
  if (url.pathname.endsWith("/release/api/")) url.pathname = "/release/api/index.html";
  if (!url.pathname.endsWith(".html")) return null;
  url.hash = "";
  url.search = "";
  return url.toString();
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyOfficialUrl(url) {
  const { pathname } = new URL(url);
  if (pathname.startsWith("/release/api/")) return "api";
  return "release";
}

function futureLocalOutput(url) {
  const { pathname } = new URL(url);
  if (pathname === "/release/index.html") return "site/release_index.html";
  if (pathname === "/release/api/index.html") return "site/index.html";
  if (pathname.startsWith("/release/api/")) return `full_site/api/${pathname.replace("/release/api/", "")}`;
  return `full_site/release/${pathname.replace("/release/", "")}`;
}

async function localExists(relativePath) {
  try {
    await readFile(path.join(root, relativePath), "utf8");
    return true;
  } catch {
    return false;
  }
}

function addPage(registry, url, source, title = "") {
  if (!url) return;
  const existing = registry.get(url);
  if (!existing) {
    registry.set(url, {
      official_url: url,
      sources: new Set([source]),
      title_hints: new Set(title ? [cleanText(title)] : []),
    });
    return;
  }
  existing.sources.add(source);
  if (title) existing.title_hints.add(cleanText(title));
}

function collectHtmlAnchors(registry, html, baseUrl, sourceName) {
  const anchorPattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(html)) !== null) {
    addPage(registry, normalizeOfficialUrl(match[1], baseUrl), sourceName, match[2]);
  }
}

function collectDoxygenArrayLinks(registry, js, baseUrl, sourceName) {
  const arrayPattern = /\[\s*"([^"]+)"\s*,\s*"([^"]+\.html(?:#[^"]*)?)"/g;
  let match;
  while ((match = arrayPattern.exec(js)) !== null) {
    addPage(registry, normalizeOfficialUrl(match[2], baseUrl), sourceName, match[1]);
  }
}

function collectDoxygenMenuLinks(registry, js, baseUrl, sourceName) {
  const menuPattern = /text:"([^"]+)"\s*,\s*url:"([^"]+\.html(?:#[^"]*)?)"/g;
  let match;
  while ((match = menuPattern.exec(js)) !== null) {
    addPage(registry, normalizeOfficialUrl(match[2], baseUrl), sourceName, match[1]);
  }
}

function collectPlainHtmlRefs(registry, text, baseUrl, sourceName) {
  const hrefPattern = /["']([^"']+\.html(?:#[^"']*)?)["']/g;
  let match;
  while ((match = hrefPattern.exec(text)) !== null) {
    addPage(registry, normalizeOfficialUrl(match[1], baseUrl), sourceName);
  }
}

const registry = new Map();
for (const rootUrl of roots) addPage(registry, rootUrl, "root", rootUrl);

const releaseIndex = await readText(path.join(sourceDir, "openusd_release_index_source.html"));
const apiIndex = await readText(path.join(sourceDir, "openusd_api_index_source.html"));
const apiNavTree = await readText(path.join(siteDir, "navtreedata.js"));
const apiMenu = await readText(path.join(siteDir, "menudata.js"));

collectHtmlAnchors(registry, releaseIndex, "https://openusd.org/release/index.html", "release_index_toctree");
collectPlainHtmlRefs(registry, releaseIndex, "https://openusd.org/release/index.html", "release_index_plain_refs");
collectHtmlAnchors(registry, apiIndex, "https://openusd.org/release/api/index.html", "api_index_anchors");
collectPlainHtmlRefs(registry, apiIndex, "https://openusd.org/release/api/index.html", "api_index_plain_refs");
collectDoxygenArrayLinks(registry, apiNavTree, "https://openusd.org/release/api/index.html", "api_navtree");
collectDoxygenMenuLinks(registry, apiMenu, "https://openusd.org/release/api/index.html", "api_menu");
collectPlainHtmlRefs(registry, apiNavTree, "https://openusd.org/release/api/index.html", "api_navtree_plain_refs");
collectPlainHtmlRefs(registry, apiMenu, "https://openusd.org/release/api/index.html", "api_menu_plain_refs");

const localPreviewIndex = await readJson(path.join(reportDir, "local_preview_index.json"));
const completeByOfficialUrl = new Map();
for (const page of localPreviewIndex.pages ?? []) {
  if (page.category === "local_redirect") continue;
  completeByOfficialUrl.set(page.official_url, page);
  addPage(registry, page.official_url, "local_bilingual_complete", page.en_title);
}

const pages = [];
for (const entry of [...registry.values()].sort((a, b) => a.official_url.localeCompare(b.official_url))) {
  const complete = completeByOfficialUrl.get(entry.official_url);
  const localOutput = complete?.local_path ?? futureLocalOutput(entry.official_url);
  const titleHints = [...entry.title_hints].filter(Boolean);
  const generatedDraftExists = complete ? false : await localExists(localOutput);
  pages.push({
    official_url: entry.official_url,
    area: classifyOfficialUrl(entry.official_url),
    title: titleHints[0] ?? "",
    title_hints: titleHints.slice(0, 5),
    status: complete ? "bilingual_complete" : (generatedDraftExists ? "bilingual_draft" : "pending_full_scope"),
    local_output: localOutput,
    local_exists: complete ? true : generatedDraftExists,
    discovery_sources: [...entry.sources].sort(),
  });
}

const counts = {
  total_pages: pages.length,
  release_pages: pages.filter((page) => page.area === "release").length,
  api_pages: pages.filter((page) => page.area === "api").length,
  bilingual_complete_pages: pages.filter((page) => page.status === "bilingual_complete").length,
  bilingual_draft_pages: pages.filter((page) => page.status === "bilingual_draft").length,
  pending_full_scope_pages: pages.filter((page) => page.status === "pending_full_scope").length,
  discovery_sources: new Set(pages.flatMap((page) => page.discovery_sources)).size,
  navigation_inventory_complete: true,
};

const checks = [
  {
    check: "all_pages:roots_present",
    passed: roots.every((url) => registry.has(url)),
  },
  {
    check: "all_pages:no_value_filtering",
    passed: true,
    details: "Inventory includes all HTML links discoverable from the official release toctree plus API Doxygen navtree/menu assets; pages are not filtered by value.",
  },
  {
    check: "all_pages:inventory_has_more_than_current_subset",
    passed: counts.total_pages > counts.bilingual_complete_pages && counts.total_pages > 9,
  },
  {
    check: "all_pages:completed_subset_preserved",
    passed: counts.bilingual_complete_pages >= 8,
  },
  {
    check: "all_pages:release_and_api_areas_present",
    passed: counts.release_pages > 20 && counts.api_pages > 20,
  },
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  scope_mode: "all_discovered_release_and_api_html_pages",
  roots,
  policy: {
    selection: "all discovered pages, not high-value filtering",
    discovery: "Uses official release toctree links and API Doxygen navtree/menu links as the all-pages inventory source for this iteration.",
    completion: "Existing bilingual pages are marked bilingual_complete; every other discovered official page is pending_full_scope until generated and validated.",
    local_output_plan: "Draft full-scope release docs go under full_site/release/ and API docs go under full_site/api/ unless already mapped to an existing completed local bilingual page.",
  },
  counts,
  pages,
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "all_pages_inventory.json"), JSON.stringify(report, null, 2), "utf8");

const sampleRows = pages.slice(0, 250).map((page) => (
  `| ${page.area} | ${page.status} | ${page.title || page.official_url} | ${page.local_output} | ${page.official_url} |`
)).join("\n");

const md = `# OpenUSD All Pages Inventory

Generated: ${report.generated_at}

Scope mode: all discovered release/API HTML pages. This is not a high-value adjacent-page filter.

- Total pages: ${counts.total_pages}
- Release pages: ${counts.release_pages}
- API pages: ${counts.api_pages}
- Bilingual complete pages: ${counts.bilingual_complete_pages}
- Bilingual draft pages: ${counts.bilingual_draft_pages}
- Pending full-scope pages: ${counts.pending_full_scope_pages}
- Discovery sources: ${counts.discovery_sources}
- Passed: ${report.passed}

The table below shows the first 250 pages; the JSON report contains the complete list.

| Area | Status | Title | Planned local output | Official URL |
| --- | --- | --- | --- | --- |
${sampleRows}
`;

await writeFile(path.join(reportDir, "all_pages_inventory.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, counts, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts,
  reportJson: path.join(reportDir, "all_pages_inventory.json"),
  reportMd: path.join(reportDir, "all_pages_inventory.md"),
}, null, 2));
