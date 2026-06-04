import { createReadStream } from "node:fs";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");

const pageSpecs = [
  {
    page: "release_index.html",
    kind: "sphinx",
    required: ["wy-nav-side", "wy-nav-content", "rst-content", "cn-repro-scope"],
  },
  {
    page: "intro.html",
    kind: "sphinx",
    required: ["wy-nav-side", "wy-nav-content", "rst-content", "cn-repro-scope"],
  },
  {
    page: "apiDocs.html",
    kind: "sphinx",
    required: ["wy-nav-side", "wy-nav-content", "rst-content", "cn-repro-scope"],
  },
  {
    page: "glossary.html",
    kind: "sphinx",
    required: ["wy-nav-side", "wy-nav-content", "rst-content", "cn-repro-scope", "cn-definition-brief"],
  },
  {
    page: "toolset.html",
    kind: "sphinx",
    required: ["wy-nav-side", "wy-nav-content", "rst-content", "cn-tool-options", "cn-tool-scenarios"],
  },
  {
    page: "index.html",
    kind: "doxygen",
    required: ['id="top"', 'id="side-nav"', 'id="doc-content"', "searchBox", "openusd_cn.css", "cn-repro-note", "cn-api-entry-map", "cn-api-route-guide"],
  },
  {
    page: "_usd__overview_and_purpose.html",
    kind: "doxygen",
    required: ['id="top"', 'id="side-nav"', 'id="doc-content"', "searchBox", "bilingual-block"],
  },
  {
    page: "usd_page_front.html",
    kind: "doxygen",
    required: ['id="top"', 'id="side-nav"', 'id="doc-content"', "searchBox", "key-class-line"],
  },
  {
    page: "api/index.html",
    kind: "redirect",
    required: ['http-equiv="refresh"', "../index.html"],
  },
];

const assetExtensions = new Set([
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".ico",
  ".gif",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
]);

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
  [".gif", "image/gif"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".eot", "application/vnd.ms-fontobject"],
]);

function isExternal(value) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");
}

function stripFragmentAndQuery(value) {
  return value.split("#")[0].split("?")[0];
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function safeResolveFromUrl(requestUrl) {
  const url = new URL(requestUrl, "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/release_index.html";
  const resolved = path.resolve(siteDir, `.${pathname}`);
  if (!resolved.startsWith(siteDir)) return null;
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
    contentType: response.headers.get("content-type") || "",
    text: await response.text(),
  };
}

async function auditPage(baseUrl, spec) {
  const pageUrl = new URL(spec.page, baseUrl).href;
  const fetched = await fetchText(pageUrl);
  const requiredMissing = spec.required.filter((marker) => !fetched.text.includes(marker));
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

  const failedAssets = assetResults.filter((asset) => !asset.ok);
  return {
    page: spec.page,
    kind: spec.kind,
    url: pageUrl,
    status: fetched.status,
    content_type: fetched.contentType,
    html_length: fetched.text.length,
    required_marker_count: spec.required.length,
    missing_required_markers: requiredMissing,
    local_asset_count: assetResults.length,
    failed_local_assets: failedAssets,
    passed: fetched.ok && fetched.text.length > 300 && requiredMissing.length === 0 && failedAssets.length === 0,
  };
}

const { server, port } = await startServer();
const baseUrl = `http://127.0.0.1:${port}/`;

let pageResults;
try {
  pageResults = [];
  for (const spec of pageSpecs) {
    pageResults.push(await auditPage(baseUrl, spec));
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

const failedPages = pageResults.filter((page) => !page.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  site_dir: siteDir,
  transient_base_url: baseUrl,
  pages: pageResults,
  counts: {
    pages: pageResults.length,
    passed_pages: pageResults.length - failedPages.length,
    failed_pages: failedPages.length,
    local_assets_checked: pageResults.reduce((sum, page) => sum + page.local_asset_count, 0),
    failed_local_assets: pageResults.reduce((sum, page) => sum + page.failed_local_assets.length, 0),
  },
  passed: failedPages.length === 0,
  note: "HTTP preview audit starts a transient local static server and checks page availability, core Sphinx/Doxygen markers, and local CSS/JS/image/font asset responses.",
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "http_preview_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD HTTP Preview Audit

Generated: ${report.generated_at}

Transient base URL: \`${baseUrl}\`

Status:

- Passed: ${report.passed}
- Pages checked: ${report.counts.pages}
- Passed pages: ${report.counts.passed_pages}
- Failed pages: ${report.counts.failed_pages}
- Local assets checked over HTTP: ${report.counts.local_assets_checked}
- Failed local assets over HTTP: ${report.counts.failed_local_assets}

Pages:

${pageResults.map((page) => `- \`${page.page}\`: ${page.passed ? "passed" : "failed"}; status ${page.status}; assets ${page.local_asset_count}; missing markers ${page.missing_required_markers.length}`).join("\n")}

Policy:

- Pages in the current bilingual scope must be reachable through a local HTTP server.
- Sphinx pages must keep their navigation/content layout markers.
- Doxygen pages must keep their top/sidebar/content/search layout markers.
- Local CSS, JavaScript, image, and font assets referenced by these pages must return HTTP 200.
`;

await writeFile(path.join(reportDir, "http_preview_audit.md"), md, "utf8");

if (!report.passed) {
  console.error(JSON.stringify({ passed: false, failedPages }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  pages: report.counts.pages,
  localAssetsChecked: report.counts.local_assets_checked,
  reportJson: path.join(reportDir, "http_preview_audit.json"),
  reportMd: path.join(reportDir, "http_preview_audit.md"),
}, null, 2));
