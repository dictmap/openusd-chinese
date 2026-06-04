import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");
const scopeManifestPath = path.join(reportDir, "scope_manifest.json");
const previewBaseUrl = "http://127.0.0.1:8067/";

function sitePath(relativePath) {
  return path.join(siteDir, relativePath.replaceAll("/", path.sep));
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listHtmlPages(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listHtmlPages(fullPath, base));
    } else if (entry.name.endsWith(".html")) {
      files.push(path.relative(base, fullPath).replaceAll(path.sep, "/"));
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

async function probePreviewServer() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(new URL("index.html", previewBaseUrl), { signal: controller.signal });
    const body = await response.text();
    return {
      checked: true,
      ok: response.ok && body.includes("cn-api-route-guide"),
      status: response.status,
      checked_url: `${previewBaseUrl}index.html`,
      marker: "cn-api-route-guide",
    };
  } catch (error) {
    return {
      checked: true,
      ok: false,
      checked_url: `${previewBaseUrl}index.html`,
      error: error?.name === "AbortError" ? "timeout" : String(error?.message ?? error),
      note: "Preview links are still valid once the local static server is running.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

const scopeManifest = JSON.parse(await readFile(scopeManifestPath, "utf8"));
const primaryEntries = (scopeManifest.primary_scope ?? []).map((entry) => ({
  category: "primary",
  official_url: entry.official_url,
  local_output: entry.local_output.replace(/^site\//, ""),
  status: entry.status,
}));

const adjacentEntries = (scopeManifest.active_adjacent_scope ?? []).map((entry) => ({
  category: "active_adjacent",
  official_url: entry.official_url,
  local_output: entry.local_output.replace(/^site\//, ""),
  status: entry.status,
}));

const redirectEntries = [
  {
    category: "local_redirect",
    official_url: "https://openusd.org/release/api/index.html",
    local_output: "api/index.html",
    status: "local_redirect_for_release_api_link",
  },
];

const titleMap = {
  "release_index.html": ["Release 文档首页", "USD Home"],
  "index.html": ["API 首页", "Universal Scene Description (USD)"],
  "api/index.html": ["API 本地跳转页", "Local API redirect"],
  "intro.html": ["USD 入门", "Introduction to USD"],
  "apiDocs.html": ["API 文档桥接页", "API Documentation"],
  "glossary.html": ["术语与概念", "USD Terms and Concepts"],
  "toolset.html": ["命令行工具集", "USD Toolset"],
  "_usd__overview_and_purpose.html": ["API 概览与目的", "Overview and Purpose"],
  "usd_page_front.html": ["Usd 核心 API 首页", "Usd : Universal Scene Description"],
};

const pages = [...primaryEntries, ...adjacentEntries, ...redirectEntries]
  .map((entry) => {
    const [zhTitle, enTitle] = titleMap[entry.local_output] ?? [entry.local_output, entry.local_output];
    return {
      ...entry,
      zh_title: zhTitle,
      en_title: enTitle,
      local_path: `site/${entry.local_output}`,
      preview_url: new URL(entry.local_output, previewBaseUrl).toString(),
    };
  })
  .sort((a, b) => {
    const order = { primary: 0, active_adjacent: 1, local_redirect: 2 };
    return (order[a.category] ?? 9) - (order[b.category] ?? 9) || a.local_output.localeCompare(b.local_output);
  });

const htmlPages = await listHtmlPages(siteDir);
const pagesWithExistence = await Promise.all(pages.map(async (page) => ({
  ...page,
  exists: await exists(sitePath(page.local_output)),
})));
const previewProbe = await probePreviewServer();

const counts = {
  pages: pagesWithExistence.length,
  primary_pages: pagesWithExistence.filter((page) => page.category === "primary").length,
  active_adjacent_pages: pagesWithExistence.filter((page) => page.category === "active_adjacent").length,
  local_redirect_pages: pagesWithExistence.filter((page) => page.category === "local_redirect").length,
  existing_pages: pagesWithExistence.filter((page) => page.exists).length,
  site_html_pages: htmlPages.length,
  preview_urls: new Set(pagesWithExistence.map((page) => page.preview_url)).size,
};

const checks = [
  {
    check: "preview_index:all_listed_pages_exist",
    passed: counts.pages === counts.existing_pages,
  },
  {
    check: "preview_index:current_scope_page_counts_ready",
    passed: counts.pages === 9 && counts.primary_pages === 2 && counts.active_adjacent_pages === 6 && counts.local_redirect_pages === 1,
  },
  {
    check: "preview_index:bounded_to_site_html_outputs",
    passed: counts.site_html_pages === 9 && counts.site_html_pages === counts.pages,
  },
  {
    check: "preview_index:preview_urls_unique",
    passed: counts.preview_urls === counts.pages,
  },
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  scope_note: "Chinese-first local preview index for the current bounded OpenUSD bilingual reproduction. It lists the primary release/API pages, active adjacent pages, and the local redirect without mirroring the full official site.",
  preview_base_url: previewBaseUrl,
  preview_server_probe: previewProbe,
  pages: pagesWithExistence,
  site_html_pages: htmlPages.map((page) => `site/${page}`),
  counts,
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "local_preview_index.json"), JSON.stringify(report, null, 2), "utf8");

const rows = pagesWithExistence.map((page) => (
  `| ${page.category} | ${page.zh_title} | ${page.en_title} | [${page.local_output}](${page.preview_url}) | ${page.official_url} | ${page.exists} |`
)).join("\n");

const md = `# OpenUSD Local Preview Index

Generated: ${report.generated_at}

本报告只列出当前有界范围内的本地页面，便于检查 release/API 主入口、相邻入口和本地跳转页；范围外官方链接继续保留原链接，不在这里展开成整站镜像。

- Preview base URL: ${previewBaseUrl}
- Preview server probe: ${previewProbe.ok ? "ok" : "not confirmed"} (${previewProbe.checked_url})
- Listed pages: ${counts.pages}
- Existing pages: ${counts.existing_pages}
- Site HTML pages: ${counts.site_html_pages}
- Passed: ${report.passed}

| Category | 中文入口 | English entry | Local preview link | Official URL | Exists |
| --- | --- | --- | --- | --- | --- |
${rows}
`;

await writeFile(path.join(reportDir, "local_preview_index.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts,
  previewBaseUrl,
  previewServerOk: previewProbe.ok,
  reportJson: path.join(reportDir, "local_preview_index.json"),
  reportMd: path.join(reportDir, "local_preview_index.md"),
}, null, 2));
