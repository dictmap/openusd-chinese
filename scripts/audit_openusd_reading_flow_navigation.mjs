import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(relativePath) {
  return JSON.parse(stripBom(await readFile(path.join(root, relativePath), "utf8")));
}

async function exists(relativePath) {
  try {
    await access(path.join(root, ...relativePath.split("/")));
    return true;
  } catch {
    return false;
  }
}

function escapeMd(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function relativeTarget(currentLocalOutput, href) {
  if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return null;
  const pathname = href.split("#", 1)[0].split("?", 1)[0];
  const currentDir = path.posix.dirname(currentLocalOutput);
  const normalized = path.posix.normalize(path.posix.join(currentDir, pathname));
  if (normalized.startsWith("../") || path.posix.isAbsolute(normalized)) return null;
  return normalized;
}

function anchors(html) {
  const results = [];
  const pattern = /<a\b([^>]*?)\bhref\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const attrs = `${match[1]} ${match[4]}`;
    const inner = match[5].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    results.push({ attrs, href: match[3], text: inner, raw: match[0] });
  }
  return results;
}

function hasDataFlow(html, flow) {
  return new RegExp(`data-reading-flow=["']${flow}["']`, "i").test(html);
}

function anchorsForFlow(list, flow) {
  return list.filter((entry) => new RegExp(`data-reading-flow=["']${flow}["']`, "i").test(entry.raw));
}

function officialLeaks(list) {
  return list.filter((entry) => {
    if (!/^https:\/\/openusd\.org\/release\//i.test(entry.href)) return false;
    if (/data-reading-flow=["']official["']/i.test(entry.raw)) return false;
    if (/打开官方原页|Open official page|Official URL|Official source/i.test(entry.text)) return false;
    return true;
  });
}

function checkLocalFlow(page, list, flow, expected) {
  const candidates = anchorsForFlow(list, flow);
  return candidates.some((entry) => relativeTarget(page.local_output, entry.href) === expected);
}

function hasExistingTarget(page, list, flow) {
  const candidates = anchorsForFlow(list, flow);
  return candidates.some((entry) => {
    const target = relativeTarget(page.local_output, entry.href);
    return target && target.endsWith(".html");
  });
}

const inventory = await readJson("reports/all_pages_inventory.json");
const completeFullSite = inventory.pages.filter((page) =>
  page.status === "bilingual_complete"
  && page.local_output?.startsWith("full_site/")
  && page.local_exists !== false
);

const pageResults = [];
for (const page of completeFullSite) {
  const html = await readFile(path.join(root, ...page.local_output.split("/")), "utf8");
  const list = anchors(html);
  const leaks = officialLeaks(list);
  const result = {
    local_output: page.local_output,
    area: page.area,
    title: page.title,
    side_nav: html.includes("openusd-reading-flow-nav"),
    breadcrumb: html.includes("openusd-reading-flow-breadcrumb") && hasDataFlow(html, "breadcrumb"),
    final_entry: checkLocalFlow(page, list, "final", "openusd_bilingual_final.html"),
    release_entry: checkLocalFlow(page, list, "release-entry", "site/release_index.html"),
    api_entry: checkLocalFlow(page, list, "api-entry", "site/index.html"),
    api_redirect: checkLocalFlow(page, list, "api-redirect", "site/api/index.html"),
    related_links: anchorsForFlow(list, "related").length,
    has_prev_or_next: hasExistingTarget(page, list, "prev") || hasExistingTarget(page, list, "next"),
    official_link: anchorsForFlow(list, "official").some((entry) => /^https:\/\/openusd\.org\/release\//i.test(entry.href) && /打开官方原页|Open official page/i.test(entry.text)),
    official_leak_count: leaks.length,
    leaked_hrefs: leaks.map((entry) => entry.href).slice(0, 5),
  };
  result.passed = result.side_nav
    && result.breadcrumb
    && result.final_entry
    && result.release_entry
    && result.api_entry
    && (page.area !== "api" || result.api_redirect)
    && result.related_links >= 1
    && result.has_prev_or_next
    && result.official_link
    && result.official_leak_count === 0;
  pageResults.push(result);
}

const samplePaths = [
  {
    id: "final_to_release_index",
    passed: (await readFile(path.join(root, "openusd_bilingual_final.html"), "utf8")).includes("site/release_index.html"),
  },
  {
    id: "release_index_to_light_api",
    passed: (await readFile(path.join(root, "site", "release_index.html"), "utf8")).includes("../full_site/release/user_guides/schemas/usdLux/LightAPI.html")
      || (await readFile(path.join(root, "site", "release_index.html"), "utf8")).includes("full_site/release/user_guides/schemas/usdLux/LightAPI.html"),
  },
];

const lightApiHtml = await readFile(path.join(root, "full_site", "release", "user_guides", "schemas", "usdLux", "LightAPI.html"), "utf8");
samplePaths.push({
  id: "light_api_to_usdLux_neighbors",
  passed: ["LightFilter.html", "PortalLight.html", "RectLight.html"].every((needle) => lightApiHtml.includes(needle)),
});

for (const localOutput of [
  "full_site/release/user_guides/schemas/usdLux/RectLight.html",
  "full_site/release/user_guides/schemas/usdLux/PortalLight.html",
  "full_site/release/user_guides/schemas/usdLux/LightAPI.html",
  "full_site/api/class_gf_ray.html",
]) {
  const result = pageResults.find((entry) => entry.local_output === localOutput);
  samplePaths.push({
    id: `sample_page:${localOutput}`,
    passed: Boolean(result?.passed),
    details: result,
  });
}

samplePaths.push({
  id: "local_targets_exist",
  passed: await exists("openusd_bilingual_final.html")
    && await exists("site/release_index.html")
    && await exists("site/index.html")
    && await exists("site/api/index.html")
    && await exists("full_site/release/user_guides/schemas/usdLux/LightAPI.html")
    && await exists("full_site/release/user_guides/schemas/usdLux/LightFilter.html")
    && await exists("full_site/release/user_guides/schemas/usdLux/PortalLight.html")
    && await exists("full_site/release/user_guides/schemas/usdLux/RectLight.html")
    && await exists("full_site/api/class_gf_ray.html"),
});

const failedPages = pageResults.filter((entry) => !entry.passed);
const failedSamples = samplePaths.filter((entry) => !entry.passed);
const officialLeakCount = pageResults.reduce((sum, entry) => sum + entry.official_leak_count, 0);
const counts = {
  completed_full_site_pages: completeFullSite.length,
  pages_with_side_nav: pageResults.filter((entry) => entry.side_nav).length,
  pages_with_breadcrumb: pageResults.filter((entry) => entry.breadcrumb).length,
  pages_with_final_entry: pageResults.filter((entry) => entry.final_entry).length,
  release_pages_checked: pageResults.filter((entry) => entry.area === "release").length,
  release_pages_with_release_entry: pageResults.filter((entry) => entry.area === "release" && entry.release_entry).length,
  api_pages_checked: pageResults.filter((entry) => entry.area === "api").length,
  api_pages_with_api_entry: pageResults.filter((entry) => entry.area === "api" && entry.api_entry && entry.api_redirect).length,
  pages_with_related_links: pageResults.filter((entry) => entry.related_links >= 1).length,
  pages_with_prev_or_next: pageResults.filter((entry) => entry.has_prev_or_next).length,
  pages_with_official_link: pageResults.filter((entry) => entry.official_link).length,
  official_leak_count: officialLeakCount,
  sample_paths: samplePaths.length,
  sample_paths_passed: samplePaths.filter((entry) => entry.passed).length,
  failed_pages: failedPages.length,
  failed_samples: failedSamples.length,
  checks: 9,
  failed_checks: 0,
};

const checks = [
  { check: "reading_flow:completed_pages_have_side_nav", passed: counts.pages_with_side_nav === counts.completed_full_site_pages },
  { check: "reading_flow:completed_pages_have_breadcrumb", passed: counts.pages_with_breadcrumb === counts.completed_full_site_pages },
  { check: "reading_flow:completed_pages_link_final_entry", passed: counts.pages_with_final_entry === counts.completed_full_site_pages },
  { check: "reading_flow:release_pages_link_release_entry", passed: counts.release_pages_with_release_entry === counts.release_pages_checked },
  { check: "reading_flow:api_pages_link_api_entries", passed: counts.api_pages_with_api_entry === counts.api_pages_checked },
  { check: "reading_flow:completed_pages_have_related_links", passed: counts.pages_with_related_links === counts.completed_full_site_pages },
  { check: "reading_flow:completed_pages_have_prev_or_next", passed: counts.pages_with_prev_or_next === counts.completed_full_site_pages },
  { check: "reading_flow:official_links_are_explicit_only", passed: counts.official_leak_count === 0 },
  { check: "reading_flow:required_user_path_samples_pass", passed: counts.failed_samples === 0 },
];
counts.failed_checks = checks.filter((entry) => !entry.passed).length;

const report = {
  generated_at: new Date().toISOString(),
  root,
  purpose: "Audit real local reading flow for completed full_site OpenUSD pages. This catches pages that have entry assets but lack left-side reading navigation, breadcrumb, local release/API entrances, related local pages, or explicit-only official links.",
  counts,
  checks,
  failed_checks: checks.filter((entry) => !entry.passed),
  failed_pages: failedPages.slice(0, 80),
  sample_paths: samplePaths,
  passed: counts.failed_checks === 0 && counts.failed_pages === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "reading_flow_navigation_audit.json"), JSON.stringify(report, null, 2), "utf8");

const failedRows = failedPages.slice(0, 30).map((entry) =>
  `| \`${escapeMd(entry.local_output)}\` | ${entry.area} | side=${entry.side_nav} | breadcrumb=${entry.breadcrumb} | related=${entry.related_links} | leaks=${entry.official_leak_count} |`
).join("\n");

await writeFile(path.join(reportDir, "reading_flow_navigation_audit.md"), `# OpenUSD Reading Flow Navigation Audit

Generated: ${report.generated_at}

- Passed: ${report.passed}
- Completed full_site pages checked: ${counts.completed_full_site_pages}
- Pages with side navigation: ${counts.pages_with_side_nav}
- Pages with breadcrumb: ${counts.pages_with_breadcrumb}
- Release pages with release entry: ${counts.release_pages_with_release_entry}/${counts.release_pages_checked}
- API pages with API entry: ${counts.api_pages_with_api_entry}/${counts.api_pages_checked}
- Pages with related links: ${counts.pages_with_related_links}
- Pages with previous/next: ${counts.pages_with_prev_or_next}
- Official leak count: ${counts.official_leak_count}
- Sample paths passed: ${counts.sample_paths_passed}/${counts.sample_paths}
- Failed checks: ${counts.failed_checks}
- Failed pages: ${counts.failed_pages}

## Failed Page Samples

| Page | Area | Side Nav | Breadcrumb | Related | Official Leaks |
| --- | --- | --- | --- | --- | --- |
${failedRows || "| none | none | none | none | none | none |"}

Policy: release/API entry shells are not enough; completed full_site pages must expose a local reading path that lets readers continue through the local Chinese site without silently jumping to the official English site.
`, "utf8");

if (!report.passed) {
  console.error(JSON.stringify({ passed: false, failed_checks: report.failed_checks, failed_pages: failedPages.slice(0, 10), failed_samples: failedSamples }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts,
  reportJson: path.join(reportDir, "reading_flow_navigation_audit.json"),
  reportMd: path.join(reportDir, "reading_flow_navigation_audit.md"),
}, null, 2));
