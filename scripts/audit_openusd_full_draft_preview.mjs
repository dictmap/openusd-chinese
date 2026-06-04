import { createReadStream } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".eot", "application/vnd.ms-fontobject"],
]);

const assetExtensions = new Set([".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".woff", ".woff2", ".ttf", ".eot"]);

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(relativePath) {
  return JSON.parse(stripBom(await readFile(path.join(root, relativePath), "utf8")));
}

function isExternal(value) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");
}

function stripFragmentAndQuery(value) {
  return value.split("#")[0].split("?")[0];
}

function safeResolveFromUrl(requestUrl) {
  const url = new URL(requestUrl, "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/openusd_bilingual_final.html";
  const resolved = path.resolve(root, `.${pathname}`);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    const resolved = safeResolveFromUrl(req.url ?? "/");
    if (!resolved) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }

    try {
      const info = await stat(resolved);
      if (!info.isFile()) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      const ext = path.extname(resolved).toLowerCase();
      res.writeHead(200, { "content-type": contentTypes.get(ext) || "application/octet-stream" });
      createReadStream(resolved).pipe(res);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

function collectLocalAssets(html, pageUrl) {
  const refs = [];
  const regex = /<(?:link|script|img)[^>]+(?:href|src)=["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(regex)) {
    const value = match[1];
    if (!value || value.startsWith("#") || isExternal(value)) continue;
    const clean = stripFragmentAndQuery(value);
    const ext = path.extname(clean).toLowerCase();
    if (!assetExtensions.has(ext)) continue;
    refs.push(new URL(value, pageUrl).href);
  }
  return [...new Set(refs)];
}

async function fetchText(url) {
  const response = await fetch(url);
  return {
    ok: response.ok,
    status: response.status,
    content_type: response.headers.get("content-type") || "",
    text: await response.text(),
  };
}

function pageLinkMarker(localOutput) {
  return `href="${localOutput}"`;
}

const inventory = await readJson("reports/all_pages_inventory.json");
const draftPages = (inventory.pages ?? []).filter((page) => page.status === "bilingual_draft");

const { server, port } = await startServer();
const baseUrl = `http://127.0.0.1:${port}/`;

let finalHtml;
const pageResults = [];
try {
  finalHtml = (await fetchText(new URL("openusd_bilingual_final.html", baseUrl).href)).text;

  for (const page of draftPages) {
    const pageUrl = new URL(page.local_output, baseUrl).href;
    const fetched = await fetchText(pageUrl);
    const assets = collectLocalAssets(fetched.text, pageUrl);
    const assetResults = [];
    for (const assetUrl of assets) {
      const response = await fetch(assetUrl);
      assetResults.push({
        url: assetUrl.replace(baseUrl, ""),
        status: response.status,
        ok: response.ok,
        content_type: response.headers.get("content-type") || "",
      });
    }

    const markerChecks = [
      { marker: "lang=zh-CN", passed: fetched.text.includes('lang="zh-CN"') },
      { marker: "bilingual_draft", passed: fetched.text.includes("bilingual_draft") },
      { marker: "zh_layer", passed: fetched.text.includes('class="zh"') },
      { marker: "en_layer", passed: fetched.text.includes('class="en"') },
      { marker: "official_url", passed: fetched.text.includes(page.official_url) },
      { marker: "back_to_final_html", passed: fetched.text.includes("openusd_bilingual_final.html") },
      { marker: "no_sphinx_anchor_glyph", passed: !fetched.text.includes("\uf0c1") },
    ];
    const missingMarkers = markerChecks.filter((entry) => !entry.passed).map((entry) => entry.marker);
    const failedAssets = assetResults.filter((asset) => !asset.ok);
    const finalEntryLinked = finalHtml.includes(pageLinkMarker(page.local_output));

    pageResults.push({
      official_url: page.official_url,
      local_output: page.local_output,
      http_url: pageUrl,
      status: fetched.status,
      html_length: fetched.text.length,
      final_entry_linked: finalEntryLinked,
      missing_markers: missingMarkers,
      local_asset_count: assetResults.length,
      failed_local_assets: failedAssets,
      passed: fetched.ok && fetched.text.length > 1000 && finalEntryLinked && missingMarkers.length === 0 && failedAssets.length === 0,
    });
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

const failedPages = pageResults.filter((page) => !page.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  transient_base_url: baseUrl,
  scope_mode: inventory.scope_mode,
  pages: pageResults,
  counts: {
    draft_pages: draftPages.length,
    pages_checked: pageResults.length,
    passed_pages: pageResults.length - failedPages.length,
    failed_pages: failedPages.length,
    final_entry_links: pageResults.filter((page) => page.final_entry_linked).length,
    local_assets_checked: pageResults.reduce((sum, page) => sum + page.local_asset_count, 0),
    failed_local_assets: pageResults.reduce((sum, page) => sum + page.failed_local_assets.length, 0),
  },
  passed: failedPages.length === 0 && draftPages.length === (inventory.counts?.bilingual_draft_pages ?? -1),
  note: "Draft preview audit serves the project root over a transient HTTP server and checks every bilingual_draft page discovered in the all-pages inventory.",
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "full_draft_preview_audit.json"), JSON.stringify(report, null, 2), "utf8");

const rows = pageResults.map((page) => `| ${page.passed} | ${page.local_output} | ${page.status} | ${page.final_entry_linked} | ${page.missing_markers.length} | ${page.failed_local_assets.length} |`).join("\n");
const md = `# OpenUSD Full Draft Preview Audit

Generated: ${report.generated_at}

Transient base URL: \`${baseUrl}\`

Result:

- Passed: ${report.passed}
- Draft pages: ${report.counts.draft_pages}
- Pages checked: ${report.counts.pages_checked}
- Passed pages: ${report.counts.passed_pages}
- Failed pages: ${report.counts.failed_pages}
- Final HTML links: ${report.counts.final_entry_links}
- Local assets checked: ${report.counts.local_assets_checked}
- Failed local assets: ${report.counts.failed_local_assets}

| Passed | Local output | HTTP status | Linked from final HTML | Missing markers | Failed assets |
| --- | --- | --- | --- | --- | --- |
${rows}

Policy:

- Every \`bilingual_draft\` page listed in \`reports/all_pages_inventory.json\` must be reachable over local HTTP.
- Every draft page must keep Chinese and English layers, the official URL, draft status, and a route back to \`openusd_bilingual_final.html\`.
- The final HTML entry must link to every draft page.
`;

await writeFile(path.join(reportDir, "full_draft_preview_audit.md"), md, "utf8");

if (!report.passed) {
  console.error(JSON.stringify({ passed: false, failedPages }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "full_draft_preview_audit.json"),
  reportMd: path.join(reportDir, "full_draft_preview_audit.md"),
}, null, 2));
