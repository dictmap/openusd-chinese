import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const outputPath = path.join(root, "openusd_bilingual_final.html");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function categoryLabel(category) {
  if (category === "primary") return "主入口 / Primary";
  if (category === "active_adjacent") return "相邻入口 / Adjacent";
  return "本地跳转 / Local redirect";
}

function pageDescription(page) {
  const descriptions = {
    "release_index.html": "OpenUSD release 文档入口，保留 Sphinx 结构、官方链接和中英双语入口标签。",
    "index.html": "OpenUSD API 首页，保留 Doxygen 结构、API 名称和三条 API 阅读路线。",
    "_usd__overview_and_purpose.html": "API 概念入口，中文优先解释 Overview and Purpose 并保留英文原文。",
    "apiDocs.html": "release 文档到 Doxygen API 首页的桥接页，保留官方按钮和本地跳转。",
    "glossary.html": "术语与概念页，包含核心术语速览和 92 条定义级中文说明。",
    "intro.html": "Introduction to USD 相邻入口页，保留官方英文正文并补中文导读。",
    "toolset.html": "USD Toolset 命令行工具页，补充工具速览、选项导读和工作流场景。",
    "usd_page_front.html": "Usd core API front page，保留 API Manual 层级和关键类链接。",
    "api/index.html": "本地跳转页，用于让 release 页中的 api/index.html 指向本地 API 首页。",
  };
  return descriptions[page.local_output] ?? "当前范围内的 OpenUSD 中英双语本地页面。";
}

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw.replace(/^\uFEFF/, ""));
}

const previewIndex = await readJson(path.join(reportDir, "local_preview_index.json"));
const validationReport = await readJson(path.join(reportDir, "validation_report.json"));
const allPagesInventory = await readJson(path.join(reportDir, "all_pages_inventory.json"));
const pages = previewIndex.pages ?? [];
const officialPages = allPagesInventory.pages ?? [];
const completedOfficialPages = officialPages.filter((page) => page.status === "bilingual_complete");
const draftOfficialPages = officialPages.filter((page) => page.status === "bilingual_draft");
const pendingOfficialPages = officialPages.filter((page) => page.status === "pending_full_scope");

const pageCards = pages.map((page) => `
        <article class="page-card" data-category="${escapeHtml(page.category)}">
          <div class="page-card__meta">${escapeHtml(categoryLabel(page.category))}</div>
          <h3>${escapeHtml(page.zh_title)}</h3>
          <p class="page-card__english">${escapeHtml(page.en_title)}</p>
          <p>${escapeHtml(pageDescription(page))}</p>
          <div class="page-card__actions">
            <a href="${escapeHtml(page.local_path)}">打开 HTML</a>
            <a href="${escapeHtml(page.preview_url)}">本地预览</a>
            <a href="${escapeHtml(page.official_url)}">官方原页</a>
          </div>
        </article>`).join("\n");

const primaryRows = pages.map((page) => `
          <tr>
            <td>${escapeHtml(categoryLabel(page.category))}</td>
            <td>${escapeHtml(page.zh_title)}<span>${escapeHtml(page.en_title)}</span></td>
            <td><a href="${escapeHtml(page.local_path)}">${escapeHtml(page.local_path)}</a></td>
            <td><a href="${escapeHtml(page.official_url)}">${escapeHtml(page.official_url)}</a></td>
          </tr>`).join("\n");

const allPageRows = officialPages.map((page) => {
  const localCell = page.local_exists
    ? `<a href="${escapeHtml(page.local_output)}">${escapeHtml(page.local_output)}</a>`
    : `<span>${escapeHtml(page.local_output)}</span>`;
  const title = page.title || page.official_url;
  return `
          <tr data-status="${escapeHtml(page.status)}">
            <td>${escapeHtml(page.area)}</td>
            <td>${escapeHtml(page.status)}</td>
            <td>${escapeHtml(title)}</td>
            <td>${localCell}</td>
            <td><a href="${escapeHtml(page.official_url)}">${escapeHtml(page.official_url)}</a></td>
          </tr>`;
}).join("\n");

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenUSD 中英双语复刻最终入口 / Final HTML Entry</title>
  <meta name="description" content="OpenUSD release/API 所有页面中英双语复刻最终 HTML 入口，中文为主并保留英文原文。">
  <link rel="icon" href="site/images/USDIcon.ico">
  <style>
    :root {
      color-scheme: light;
      --ink: #17202a;
      --muted: #5d6875;
      --line: #d8dee8;
      --paper: #ffffff;
      --soft: #f4f7fb;
      --blue: #1c5d99;
      --green: #2a6f57;
      --gold: #8a6416;
      --shadow: 0 16px 40px rgba(22, 34, 51, 0.12);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
      color: var(--ink);
      background: var(--soft);
      line-height: 1.6;
    }

    a {
      color: var(--blue);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .hero {
      min-height: 310px;
      color: #fff;
      background:
        linear-gradient(90deg, rgba(10, 22, 35, 0.84), rgba(10, 22, 35, 0.46)),
        url("site/images/piper-banner.jpg") center / cover no-repeat;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    }

    .hero__inner,
    main {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }

    .brand img {
      width: 132px;
      max-width: 38vw;
      height: auto;
      filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.36));
    }

    .brand span {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.78);
      border-left: 1px solid rgba(255, 255, 255, 0.32);
      padding-left: 16px;
    }

    h1 {
      margin: 0;
      max-width: 860px;
      font-size: 44px;
      line-height: 1.12;
      font-weight: 700;
      letter-spacing: 0;
    }

    .hero p {
      margin: 18px 0 0;
      max-width: 820px;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
    }

    main {
      padding: 30px 0 48px;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .metric {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 10px 24px rgba(22, 34, 51, 0.06);
      min-height: 104px;
    }

    .metric strong {
      display: block;
      font-size: 28px;
      line-height: 1.2;
    }

    .metric span {
      color: var(--muted);
      font-size: 13px;
    }

    .section {
      margin-top: 28px;
    }

    .section h2 {
      margin: 0 0 12px;
      font-size: 24px;
      letter-spacing: 0;
    }

    .note {
      margin: 0 0 16px;
      color: var(--muted);
    }

    .page-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .page-card {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
      min-height: 260px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow);
    }

    .page-card__meta {
      width: fit-content;
      color: #fff;
      background: var(--green);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 12px;
      margin-bottom: 12px;
    }

    .page-card[data-category="primary"] .page-card__meta {
      background: var(--blue);
    }

    .page-card[data-category="local_redirect"] .page-card__meta {
      background: var(--gold);
    }

    .page-card h3 {
      margin: 0;
      font-size: 20px;
      line-height: 1.3;
    }

    .page-card__english {
      margin: 4px 0 10px;
      color: var(--muted);
      font-size: 14px;
    }

    .page-card p:not(.page-card__english) {
      margin: 0 0 16px;
      color: #374151;
      font-size: 14px;
    }

    .page-card__actions {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      margin-top: auto;
    }

    .page-card__actions a {
      display: block;
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 8px 10px;
      background: #f9fbfd;
      font-size: 14px;
      overflow-wrap: anywhere;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--paper);
      box-shadow: 0 10px 24px rgba(22, 34, 51, 0.06);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 880px;
    }

    th,
    td {
      text-align: left;
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      vertical-align: top;
      font-size: 14px;
    }

    th {
      background: #edf3f9;
      color: #243447;
      font-weight: 700;
    }

    td span {
      display: block;
      color: var(--muted);
      font-size: 12px;
    }

    footer {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto 40px;
      color: var(--muted);
      font-size: 13px;
    }

    @media (max-width: 900px) {
      .status-grid,
      .page-grid {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 32px;
      }

      .hero {
        min-height: 360px;
      }
    }
  </style>
</head>
<body>
  <header class="hero" id="final-html-entry" data-final-output="html" data-scope-mode="all" data-page-count="${escapeHtml(allPagesInventory.counts?.total_pages ?? officialPages.length)}">
    <div class="hero__inner">
      <div class="brand">
        <img src="site/images/USDLogoUnsized.svg" alt="OpenUSD">
        <span>中文为主 / English retained</span>
      </div>
      <h1>OpenUSD 中英双语复刻最终入口</h1>
      <p>这是当前交付的 HTML 总入口：范围覆盖 release 文档与 release/api API 文档下发现的 406 个 HTML 页面。当前只有 8 页达到完整双语标准，其余本地页面仍是可检查草稿，不是完整翻译；API 名称、页面名和官方链接保持原样。</p>
    </div>
  </header>

  <main>
    <section class="status-grid" aria-label="当前状态">
      <div class="metric">
        <strong>${escapeHtml(allPagesInventory.counts?.total_pages ?? officialPages.length)}</strong>
        <span>全量页面 / All pages</span>
      </div>
      <div class="metric">
        <strong>${escapeHtml(completedOfficialPages.length)}</strong>
        <span>已完成双语 / Complete</span>
      </div>
      <div class="metric">
        <strong>${escapeHtml(draftOfficialPages.length)}</strong>
        <span>未完整翻译草稿 / Incomplete drafts</span>
      </div>
      <div class="metric">
        <strong>${escapeHtml(pendingOfficialPages.length)}</strong>
        <span>未生成页面 / Not generated</span>
      </div>
    </section>

    <section class="section">
      <h2>页面入口 / Page Entries</h2>
      <p class="note">这里显示主要入口卡片；它们不代表 406 页全部完成。全量官方页面清单在下一节，<code>bilingual_draft</code> 表示可本地打开但仍未完整翻译。</p>
      <div class="page-grid">
${pageCards}
      </div>
    </section>

    <section class="section">
      <h2>已完成本地入口 / Completed Local Entries</h2>
      <p class="note">这些页面已经有本地 HTML；<code>api/index.html</code> 是本地跳转页，不计入官方页面完成数。</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>类型 / Type</th>
              <th>页面 / Page</th>
              <th>本地 HTML / Local HTML</th>
              <th>官方原页 / Official URL</th>
            </tr>
          </thead>
          <tbody>
${primaryRows}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <h2>所有页面清单 / All Pages Inventory</h2>
      <p class="note">范围为官方 release toctree 与 API Doxygen navtree/menu 中发现的全部 HTML 页面。本表中的 <code>bilingual_complete</code> 才计入完整双语；<code>bilingual_draft</code> 只是可检查草稿。</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>区域 / Area</th>
              <th>状态 / Status</th>
              <th>标题 / Title</th>
              <th>本地计划 / Local plan</th>
              <th>官方原页 / Official URL</th>
            </tr>
          </thead>
          <tbody>
${allPageRows}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <footer>
    Generated from <code>reports/all_pages_inventory.json</code> and <code>reports/local_preview_index.json</code> at ${escapeHtml(new Date().toISOString())}. All pages: ${escapeHtml(allPagesInventory.counts?.total_pages ?? officialPages.length)}. Final validation: ${escapeHtml(validationReport.required_check_count ?? 0)} checks with ${escapeHtml(validationReport.failed_check_count ?? 0)} failed.
  </footer>
</body>
</html>
`;

await mkdir(root, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  passed: true,
  output: outputPath,
  completedLocalEntries: pages.length,
  allOfficialPages: officialPages.length,
  draftOfficialPages: draftOfficialPages.length,
  pendingOfficialPages: pendingOfficialPages.length,
  validationChecks: validationReport.required_check_count,
  failedChecks: validationReport.failed_check_count,
}, null, 2));
