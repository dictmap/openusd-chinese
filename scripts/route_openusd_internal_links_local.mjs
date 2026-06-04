import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const placeholderPath = path.join(root, "site", "uncovered_openusd_page.html");

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(filePath) {
  return JSON.parse(stripBom(await readFile(filePath, "utf8")));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
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

function normalizeOfficialUrl(value) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  return url.toString();
}

function isOpenUsdReleaseHtml(url) {
  return url.origin === "https://openusd.org"
    && url.pathname.startsWith("/release/")
    && url.pathname.endsWith(".html");
}

function toPosix(value) {
  return value.replaceAll(path.sep, "/");
}

function relFromRoot(filePath) {
  return toPosix(path.relative(root, filePath));
}

function relativeHref(fromLocalOutput, toLocalOutput) {
  const fromDir = path.posix.dirname(fromLocalOutput);
  const relative = path.posix.relative(fromDir, toLocalOutput);
  return relative || path.posix.basename(toLocalOutput);
}

function addRouteData(attrs, route, officialHref) {
  let next = attrs;
  if (!/\sdata-local-route=/.test(next)) {
    next += ` data-local-route="${route}"`;
  }
  if (officialHref && !/\sdata-official-href=/.test(next)) {
    next += ` data-official-href="${escapeHtml(officialHref)}"`;
  }
  return next;
}

function explicitOfficialAnchor(innerHtml) {
  const text = cleanText(innerHtml);
  return /官方原页|Open official page|Official URL|Official source/i.test(text);
}

async function walkHtmlFiles(dir) {
  const results = [];
  async function walk(current) {
    let entries = [];
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        results.push(full);
      }
    }
  }
  await walk(dir);
  return results;
}

async function exists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

async function localHrefExists(currentLocalOutput, rawHref) {
  if (!rawHref || rawHref.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(rawHref) || rawHref.startsWith("//")) {
    return false;
  }
  const pathname = rawHref.split("#", 1)[0].split("?", 1)[0];
  if (!pathname.endsWith(".html")) return false;
  const currentDir = path.posix.dirname(currentLocalOutput);
  const targetLocal = path.posix.normalize(path.posix.join(currentDir, pathname));
  if (targetLocal.startsWith("../") || path.posix.isAbsolute(targetLocal)) return false;
  return exists(path.join(root, targetLocal));
}

function placeholderHref(currentLocalOutput, officialUrl, label) {
  const route = relativeHref(currentLocalOutput, "site/uncovered_openusd_page.html");
  const params = new URLSearchParams();
  params.set("official", officialUrl);
  if (label) params.set("title", label.slice(0, 180));
  return `${route}?${params.toString()}`;
}

function resolveTargetOfficial(rawHref, currentOfficialUrl) {
  if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:") || rawHref.startsWith("mailto:")) {
    return null;
  }
  let parsed;
  try {
    parsed = new URL(rawHref, currentOfficialUrl || "https://openusd.org/release/");
  } catch {
    return null;
  }
  if (!isOpenUsdReleaseHtml(parsed)) return null;
  const hash = parsed.hash;
  parsed.hash = "";
  parsed.search = "";
  return { official: parsed.toString(), hash };
}

async function rewriteHtml({ html, currentLocalOutput, currentOfficialUrl, officialToLocal, localExisting }) {
  const pageStats = {
    anchors_seen: 0,
    area_seen: 0,
    mapped_links: 0,
    uncovered_links: 0,
    explicit_official_links: 0,
    unchanged_links: 0,
  };

  const rewriteOne = async (tagStart, rawHref, innerHtml = "") => {
    const existingRoute = tagStart.match(/\sdata-local-route\s*=\s*["'](mapped|uncovered)["']/i)?.[1];
    if (existingRoute === "mapped") {
      pageStats.mapped_links += 1;
      pageStats.unchanged_links += 1;
      return null;
    }
    if (existingRoute === "uncovered") {
      pageStats.uncovered_links += 1;
      pageStats.unchanged_links += 1;
      return null;
    }
    if (innerHtml && explicitOfficialAnchor(innerHtml)) {
      pageStats.explicit_official_links += 1;
      return null;
    }
    if (await localHrefExists(currentLocalOutput, rawHref)) {
      pageStats.unchanged_links += 1;
      return null;
    }
    const resolved = resolveTargetOfficial(rawHref, currentOfficialUrl);
    if (!resolved) {
      pageStats.unchanged_links += 1;
      return null;
    }
    const officialWithHash = `${resolved.official}${resolved.hash}`;
    const targetLocal = officialToLocal.get(resolved.official);
    let nextHref;
    let route;
    if (targetLocal && localExisting.has(targetLocal)) {
      nextHref = `${relativeHref(currentLocalOutput, targetLocal)}${resolved.hash}`;
      route = "mapped";
      pageStats.mapped_links += 1;
    } else {
      nextHref = placeholderHref(currentLocalOutput, officialWithHash, cleanText(innerHtml));
      route = "uncovered";
      pageStats.uncovered_links += 1;
    }
    const quote = tagStart.includes(`href='${rawHref}'`) ? "'" : '"';
    const rewrittenStart = tagStart
      .replace(/\bhref\s*=\s*["'][^"']*["']/i, `href=${quote}${escapeHtml(nextHref)}${quote}`);
    return addRouteData(rewrittenStart, route, officialWithHash);
  };

  let rewrittenAnchors = "";
  let lastIndex = 0;
  const anchorPattern = /<a\b([^>]*?\s)href\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(anchorPattern)) {
    rewrittenAnchors += html.slice(lastIndex, match.index);
    lastIndex = match.index + match[0].length;
    const [, before, quote, rawHref, after, innerHtml] = match;
    pageStats.anchors_seen += 1;
    const tagStart = `<a${before}href=${quote}${rawHref}${quote}${after}`;
    const nextStart = await rewriteOne(tagStart, rawHref, innerHtml);
    rewrittenAnchors += nextStart ? `${nextStart}>${innerHtml}</a>` : match[0];
  }
  rewrittenAnchors += html.slice(lastIndex);

  let rewrittenAreas = "";
  lastIndex = 0;
  const areaPattern = /<area\b([^>]*?\s)href\s*=\s*(["'])([^"']+)\2([^>]*?)>/gi;
  for (const match of rewrittenAnchors.matchAll(areaPattern)) {
    rewrittenAreas += rewrittenAnchors.slice(lastIndex, match.index);
    lastIndex = match.index + match[0].length;
    const [, before, quote, rawHref, after] = match;
    pageStats.area_seen += 1;
    const tagStart = `<area${before}href=${quote}${rawHref}${quote}${after}`;
    const label = cleanText(tagStart.match(/\btitle\s*=\s*["']([^"']*)["']/i)?.[1] ?? tagStart.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] ?? "");
    const nextStart = await rewriteOne(tagStart, rawHref, label);
    rewrittenAreas += nextStart ? `${nextStart}>` : match[0];
  }
  rewrittenAreas += rewrittenAnchors.slice(lastIndex);

  return { html: rewrittenAreas, pageStats };
}

async function writePlaceholder() {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>未覆盖 OpenUSD 页面 / Uncovered OpenUSD Page</title>
  <link rel="icon" href="images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.65}
    main{max-width:900px;margin:0 auto;padding:42px 20px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:22px}
    h1{margin:0 0 12px;font-size:30px;letter-spacing:0}
    a{color:#1c5d99;overflow-wrap:anywhere}
    code{background:#eef2f7;border:1px solid #d8dee8;border-radius:4px;padding:2px 5px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#8a6416;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body>
  <main>
    <section>
      <span class="status">not_in_current_local_scope</span>
      <h1>未覆盖 OpenUSD 页面 / Uncovered OpenUSD Page</h1>
      <p>这个链接指向 OpenUSD release/API 内部 HTML，但当前 406 页本地清单里还没有对应的双语 HTML。因此我没有直接跳到官方英文站，而是在这里标出缺口。</p>
      <p>This internal OpenUSD HTML target is not present in the current 406-page local inventory, so this local placeholder marks the gap instead of silently jumping to the official English site.</p>
      <p><strong>目标 / Target:</strong> <code id="target"></code></p>
      <p><a id="official" href="#">打开官方原页 / Open official page</a></p>
      <p><a href="../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
    </section>
  </main>
  <script>
    const params = new URLSearchParams(location.search);
    const official = params.get("official") || "";
    const title = params.get("title") || official;
    document.title = (title ? title + " - " : "") + "未覆盖 OpenUSD 页面";
    document.getElementById("target").textContent = official || "Unknown target";
    const link = document.getElementById("official");
    if (official) {
      link.href = official;
    } else {
      link.removeAttribute("href");
    }
  </script>
</body>
</html>
`;
  await writeFile(placeholderPath, html, "utf8");
}

const inventory = await readJson(path.join(reportDir, "all_pages_inventory.json"));
const officialToLocal = new Map();
const localToOfficial = new Map();
for (const page of inventory.pages ?? []) {
  officialToLocal.set(normalizeOfficialUrl(page.official_url), page.local_output);
  localToOfficial.set(page.local_output, normalizeOfficialUrl(page.official_url));
}

const htmlFiles = [
  ...(await walkHtmlFiles(path.join(root, "site"))),
  ...(await walkHtmlFiles(path.join(root, "full_site"))),
  path.join(root, "openusd_bilingual_final.html"),
];

const localExisting = new Set();
for (const localOutput of new Set(officialToLocal.values())) {
  if (await exists(path.join(root, localOutput))) {
    localExisting.add(localOutput);
  }
}

await writePlaceholder();
localExisting.add("site/uncovered_openusd_page.html");

const pageReports = [];
const totals = {
  files_checked: 0,
  files_changed: 0,
  anchors_seen: 0,
  area_seen: 0,
  mapped_links: 0,
  uncovered_links: 0,
  explicit_official_links: 0,
  unchanged_links: 0,
  inventory_pages: inventory.pages?.length ?? 0,
  local_inventory_outputs_existing: localExisting.size - 1,
};

for (const filePath of htmlFiles) {
  const currentLocalOutput = relFromRoot(filePath);
  const currentOfficialUrl = localToOfficial.get(currentLocalOutput);
  const before = await readFile(filePath, "utf8");
  const { html: after, pageStats } = await rewriteHtml({
    html: before,
    currentLocalOutput,
    currentOfficialUrl,
    officialToLocal,
    localExisting,
  });
  if (after !== before) {
    await writeFile(filePath, after, "utf8");
    totals.files_changed += 1;
  }
  totals.files_checked += 1;
  for (const key of ["anchors_seen", "area_seen", "mapped_links", "uncovered_links", "explicit_official_links", "unchanged_links"]) {
    totals[key] += pageStats[key];
  }
  if (pageStats.mapped_links || pageStats.uncovered_links || pageStats.explicit_official_links) {
    pageReports.push({
      local_output: currentLocalOutput,
      official_url: currentOfficialUrl ?? null,
      ...pageStats,
    });
  }
}

const report = {
  generated_at: new Date().toISOString(),
  passed: totals.mapped_links > 0,
  policy: {
    mapped: "Internal OpenUSD release/API HTML links that exist in the 406-page local inventory are rewritten to relative local HTML paths.",
    uncovered: "Internal OpenUSD release/API HTML links not present in the current inventory route to a local placeholder page instead of silently opening the official English site.",
    explicit_official: "Links explicitly labelled official/original are intentionally preserved as official outbound links.",
  },
  counts: totals,
  pages: pageReports,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "local_link_routing_report.json"), JSON.stringify(report, null, 2), "utf8");

const topPages = pageReports
  .filter((page) => page.mapped_links || page.uncovered_links)
  .sort((a, b) => (b.mapped_links + b.uncovered_links) - (a.mapped_links + a.uncovered_links))
  .slice(0, 40)
  .map((page) => `| ${page.local_output} | ${page.mapped_links} | ${page.uncovered_links} | ${page.explicit_official_links} |`)
  .join("\n");

await writeFile(path.join(reportDir, "local_link_routing_report.md"), `# OpenUSD Local Link Routing Report

Generated: ${report.generated_at}

## Counts

- Files checked: ${totals.files_checked}
- Files changed: ${totals.files_changed}
- Links routed to existing local pages: ${totals.mapped_links}
- Links routed to local uncovered placeholder: ${totals.uncovered_links}
- Explicit official/original links preserved: ${totals.explicit_official_links}
- Inventory pages: ${totals.inventory_pages}
- Existing local inventory outputs: ${totals.local_inventory_outputs_existing}

## Policy

- Known in-scope OpenUSD release/API HTML links now point to local HTML files.
- Unknown internal OpenUSD release/API HTML links now point to \`site/uncovered_openusd_page.html\`, which marks the coverage gap and provides an explicit official-page button.
- Links explicitly labelled official/original remain outbound by design.

## Top Routed Pages

| Local output | Mapped local links | Uncovered placeholder links | Explicit official links |
|---|---:|---:|---:|
${topPages}
`, "utf8");

console.log(JSON.stringify({
  passed: report.passed,
  report: "reports/local_link_routing_report.json",
  counts: totals,
}, null, 2));
