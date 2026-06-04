import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const sourceDir = path.join(root, "source", "full_api");
const outputDir = path.join(root, "full_site", "api");
const batchSize = Number.parseInt(process.env.OPENUSD_BATCH_SIZE ?? "5", 10);
const refreshDrafts = process.env.OPENUSD_REFRESH_DRAFTS === "1";

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
    .replace(/\uf0c1/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, " - ")
    .replace(/&ndash;/g, " - ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&zwj;/g, "")
    .replace(/&#160;/g, " ")
    .replace(/&#9658;/g, " ")
    .replace(/\[!note\]/gi, "Note:")
    .replace(/&zwnj;/g, "")
    .replace(/&#(\d+);/g, (_, code) => {
      const value = Number.parseInt(code, 10);
      return Number.isFinite(value) ? String.fromCodePoint(value) : " ";
    })
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();
}

function fileNameFromUrl(url) {
  return path.basename(new URL(url).pathname);
}

function sourceFileName(url) {
  return fileNameFromUrl(url).replace(/\.html$/, "_source.html");
}

function extractTitle(html, fallbackTitle, officialUrl) {
  const candidates = [
    html.match(/<div[^>]*class=["'][^"']*\btitle\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1],
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1],
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1],
    fallbackTitle,
    fileNameFromUrl(officialUrl),
  ].map(cleanText).filter(Boolean);

  const title = candidates[0] ?? fileNameFromUrl(officialUrl);
  const cleanedTitle = title
    .replace(/\s*-\s*Universal Scene Description.*$/i, "")
    .replace(/\s*Reference\s*$/i, "")
    .trim() || fileNameFromUrl(officialUrl);
  const cleanFallback = cleanText(fallbackTitle);
  if (
    cleanFallback
    && cleanFallback !== cleanedTitle
    && /^Universal Scene Description: Namespace Members$/i.test(cleanedTitle)
  ) {
    return cleanFallback;
  }
  return cleanedTitle;
}

function extractHeadings(html) {
  const entries = [];
  for (const match of html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    entries.push({ level: Number(match[1]), text: cleanText(match[2]) });
  }
  for (const match of html.matchAll(/<div[^>]*class=["'][^"']*\btitle\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)) {
    entries.unshift({ level: 1, text: cleanText(match[1]) });
  }
  const seen = new Set();
  return entries
    .filter((entry) => entry.text && !seen.has(entry.text) && seen.add(entry.text))
    .slice(0, 28);
}

function extractInternalLinks(html, officialUrl) {
  const links = [];
  const seen = new Set();
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const rawHref = match[1];
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:") || rawHref.startsWith("mailto:")) continue;
    let url;
    try {
      url = new URL(rawHref, officialUrl);
    } catch {
      continue;
    }
    if (url.origin !== "https://openusd.org" || !url.pathname.startsWith("/release/") || !url.pathname.endsWith(".html")) continue;
    url.hash = "";
    url.search = "";
    const key = url.toString();
    const text = cleanText(match[2]);
    if (!text || /^\d+$/.test(text) || /^More\.{2,}$/i.test(text) || /^Go to the source code of this file\.?$/i.test(text)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({
      text,
      url: key,
    });
  }
  for (const match of html.matchAll(/<area\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
    const rawHref = match[1];
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:") || rawHref.startsWith("mailto:")) continue;
    let url;
    try {
      url = new URL(rawHref, officialUrl);
    } catch {
      continue;
    }
    if (url.origin !== "https://openusd.org" || !url.pathname.startsWith("/release/") || !url.pathname.endsWith(".html")) continue;
    url.hash = "";
    url.search = "";
    const key = url.toString();
    if (seen.has(key)) continue;
    const tag = match[0];
    const label = cleanText(
      tag.match(/\btitle\s*=\s*["']([^"']*)["']/i)?.[1]
      ?? tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1]
      ?? path.basename(url.pathname),
    );
    seen.add(key);
    links.push({
      text: label || path.basename(url.pathname),
      url: key,
    });
  }
  return links.slice(0, 40);
}

function compactExcerpt(text, maxLength = 520) {
  let cleaned = cleanText(text);
  cleaned = cleaned
    .replace(/^Go to the (?:graphical|textual) class hierarchy\s+/i, "")
    .replace(/^Go to the source code of this file\.?\s*/i, "")
    .replace(/\s*More\.{2,}\s*$/i, "")
    .trim();
  if (!cleaned || cleaned.includes("Copyright") || cleaned.includes("Generated on Wed")) return "";
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 3)}...` : cleaned;
}

function isNavigationOnlyExcerpt(text) {
  const cleaned = cleanText(text).replace(/[.:：]+$/g, "").trim();
  if (!cleaned) return true;
  if (/^the code used in this tutorial is available in\s+\S+\/?$/i.test(cleaned)) return true;
  if (/^Definition at line \d+ of file .+$/i.test(cleaned)) return true;
  return /^(?:go to the (?:graphical|textual) class hierarchy|go to the source code of this file|include dependency graph for .+|this graph shows which files directly or indirectly include this file|collaboration diagram for .+)$/i.test(cleaned);
}

function comparableExcerptKey(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/^the code used in this tutorial is available in\s+\S+\s+overview\s+/i, "")
    .replace(/^overview\s+/i, "")
    .replace(/\.{3}$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pushUniqueExcerpt(target, seen, value, maxLength = 520) {
  const excerpt = compactExcerpt(value, maxLength);
  if (isNavigationOnlyExcerpt(excerpt)) return;
  if (excerpt.length < 28) return;
  const key = comparableExcerptKey(excerpt);
  if (seen.has(key)) return;
  for (const existing of seen) {
    if (existing.includes(key) || key.includes(existing)) return;
    const keyProbe = key.slice(0, 180);
    const existingProbe = existing.slice(0, 180);
    if (keyProbe.length >= 80 && existing.includes(keyProbe)) return;
    if (existingProbe.length >= 80 && key.includes(existingProbe)) return;
  }
  seen.add(key);
  target.push(excerpt);
}

function shortEnglishExcerpt(html) {
  const excerpts = [];
  const seen = new Set();

  const hierarchyEntries = [];
  const hierarchySeen = new Set();
  for (const match of html.matchAll(/<tr[^>]*id=["']row_[^"']*["'][^>]*>[\s\S]*?<td[^>]*class=["'][^"']*\bentry\b[^"']*["'][^>]*>([\s\S]*?)<\/td>\s*<td[^>]*class=["'][^"']*\bdesc\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi)) {
    const name = cleanText(match[1]).replace(/^(?:[A-Z]\s+)+/, "").trim();
    const description = cleanText(match[2]).replace(/\s*More\.\.\.$/i, "").trim();
    if (!name || name.length < 2 || name.length > 180) continue;
    const entry = description ? `${name}: ${description}` : name;
    const key = entry.toLowerCase();
    if (hierarchySeen.has(key)) continue;
    hierarchySeen.add(key);
    hierarchyEntries.push(entry);
    if (hierarchyEntries.length >= 10) break;
  }
  if (hierarchyEntries.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Hierarchy entries include: ${hierarchyEntries.join("; ")}.`, 760);
  }

  const graphicalEntries = [];
  const graphicalSeen = new Set();
  for (const match of html.matchAll(/<area\b[^>]*\bhref\s*=\s*["']([^"']+\.html(?:#[^"']*)?)["'][^>]*>/gi)) {
    const href = match[1];
    if (!/(?:^|\/)(?:class|struct)[^/]*\.html/i.test(href)) continue;
    const tag = match[0];
    const title = cleanText(tag.match(/\btitle\s*=\s*["']([^"']*)["']/i)?.[1] ?? "");
    if (!title || title.length < 8 || title.length > 220 || isNavigationOnlyExcerpt(title)) continue;
    const key = title.toLowerCase();
    if (graphicalSeen.has(key)) continue;
    graphicalSeen.add(key);
    graphicalEntries.push(title);
    if (graphicalEntries.length >= 10) break;
  }
  if (graphicalEntries.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Graphical hierarchy entries include: ${graphicalEntries.join("; ")}.`, 760);
  }

  for (const match of html.matchAll(/<div[^>]*class=["'][^"']*\btextblock\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)) {
    pushUniqueExcerpt(excerpts, seen, match[1]);
    if (excerpts.length >= 2) return excerpts;
  }

  const memberEntries = [];
  const memberSeen = new Set();
  for (const match of html.matchAll(/<tr[^>]*class=["'][^"']*\bmemitem[^"']*["'][^>]*>[\s\S]*?<td[^>]*class=["'][^"']*\bmemItemRight\b[^"']*["'][^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/tr>\s*<tr[^>]*class=["'][^"']*\bmemdesc[^"']*["'][^>]*>[\s\S]*?<td[^>]*class=["'][^"']*\bmdescRight\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi)) {
    const name = cleanText(match[1]).replace(/\s+/g, " ");
    const description = cleanText(match[2]).replace(/\s*More\.\.\.$/i, "").trim();
    if (!name || name.length < 2 || name.length > 180) continue;
    const entry = description ? `${name}: ${description}` : name;
    const key = entry.toLowerCase();
    if (memberSeen.has(key)) continue;
    memberSeen.add(key);
    memberEntries.push(entry);
    if (memberEntries.length >= 10) break;
  }
  if (memberEntries.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Member entries include: ${memberEntries.join("; ")}.`, 760);
  }

  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = cleanText(match[1]);
    if (isNavigationOnlyExcerpt(paragraph)) continue;
    pushUniqueExcerpt(excerpts, seen, paragraph);
    if (excerpts.length >= 2) return excerpts;
  }

  const descriptions = [...html.matchAll(/<td[^>]*class=["'][^"']*\bdesc\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi)]
    .map((match) => compactExcerpt(match[1], 160))
    .map((text) => text.replace(/\s*More\.{2,}$/i, "").trim())
    .filter((text) => text.length > 24 && !/^\d+$/.test(text) && !isNavigationOnlyExcerpt(text))
    .slice(0, 8);
  if (descriptions.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Index entries include: ${descriptions.join("; ")}.`, 620);
  }

  const contentsBlock = html.match(/<div[^>]*class=["'][^"']*\bcontents\b[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<!--\s*contents\s*-->/i)?.[1] ?? "";
  const contentsListItems = [];
  const contentsSeen = new Set();
  for (const match of contentsBlock.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const text = cleanText(match[1]).replace(/\s*More\.{2,}$/i, "").trim();
    if (!text || text.length < 3 || text.length > 160) continue;
    if (/^More\.{2,}$/i.test(text)) continue;
    if (/^(generated on|copyright|terms of use)$/i.test(text)) continue;
    const key = text.toLowerCase();
    if (contentsSeen.has(key)) continue;
    contentsSeen.add(key);
    contentsListItems.push(text);
    if (contentsListItems.length >= 16) break;
  }
  if (contentsListItems.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Index entries include: ${contentsListItems.join("; ")}.`, 620);
  }

  const directoryFiles = [];
  const directorySeen = new Set();
  for (const match of html.matchAll(/<td[^>]*>\s*file[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*?<b[^>]*>([\s\S]*?)<\/b>/gi)) {
    const text = cleanText(match[1]);
    if (!text || text.length < 3 || text.length > 120) continue;
    const key = text.toLowerCase();
    if (directorySeen.has(key)) continue;
    directorySeen.add(key);
    directoryFiles.push(text);
    if (directoryFiles.length >= 16) break;
  }
  if (directoryFiles.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Directory entries include files: ${directoryFiles.join("; ")}.`, 620);
  }

  const indexLinks = [];
  const indexSeen = new Set();
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+\.html(?:#[^"']*)?)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = match[1];
    const text = cleanText(match[2]);
    if (!text || text.length < 2 || text.length > 120) continue;
    if (/^\d+$/.test(text)) continue;
    if (/^More\.{2,}$/i.test(text)) continue;
    if (!/(?:^|\/)(?:class|struct|namespace|group|annotated|functions|files|pages)[^/]*\.html/i.test(href)) continue;
    if (/^(list|classes|namespaces|files|pages|modules|all|next|previous)$/i.test(text)) continue;
    const key = text.toLowerCase();
    if (indexSeen.has(key)) continue;
    indexSeen.add(key);
    indexLinks.push(text);
    if (indexLinks.length >= 16) break;
  }
  if (indexLinks.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Index entries include: ${indexLinks.join("; ")}.`, 620);
  }

  const sourceLines = [...html.matchAll(/<div[^>]*class=["'][^"']*\bline\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)]
    .map((match) => cleanText(match[1]).replace(/^\d+\s*/, "").trim())
    .filter((text) => text.length > 10 && !/^[-/*{}\s]+$/.test(text))
    .filter((text) => !/copyright|redistribution|all rights reserved|license|permission/i.test(text))
    .slice(0, 10);
  if (sourceLines.length > 0) {
    pushUniqueExcerpt(excerpts, seen, `Source excerpt: ${sourceLines.join(" ")}`, 620);
  }

  return excerpts.slice(0, 2);
}

function apiPageKind(fileName) {
  if (fileName.endsWith("_source.html")) return "source";
  if (fileName.startsWith("dir_")) return "directory";
  if (fileName.startsWith("class_")) return "class";
  if (fileName.startsWith("struct_")) return "struct";
  if (fileName.startsWith("namespace")) return "namespace";
  if (fileName === "annotated.html") return "index";
  if (fileName.endsWith("_page_front.html")) return "module";
  return "api";
}

function titleCn(title, officialUrl) {
  const fileName = fileNameFromUrl(officialUrl);
  const known = new Map([
    ["Developer Guides", "开发者指南"],
    ["Classes", "类索引"],
    ["Class List", "类列表"],
    ["Ar: Asset Resolution", "Ar：资产解析"],
    ["Arch: Architecture Dependent", "Arch：架构相关"],
    ["USD's purpose and overall architecture", "USD 的用途与整体架构"],
    ["UsdSkel Overview", "UsdSkel 概览"],
  ]);
  if (known.has(title)) return known.get(title);
  const kind = apiPageKind(fileName);
  if (kind === "source") return `源码页面草稿：${title}`;
  if (kind === "class") return `类参考草稿：${title}`;
  if (kind === "struct") return `结构体参考草稿：${title}`;
  if (kind === "namespace") return `命名空间参考草稿：${title}`;
  if (kind === "module") return `API 模块草稿：${title}`;
  if (kind === "index") return `API 索引草稿：${title}`;
  return `API 页面草稿：${title}`;
}

function buildPage({ officialUrl, title, headings, links, excerpts }) {
  const cnTitle = titleCn(title, officialUrl);
  const headingRows = headings.length > 0
    ? headings.map((heading) => `<li><span class="zh">${escapeHtml(`第 ${heading.level} 级结构：${heading.text}`)}</span><span class="en">${escapeHtml(heading.text)}</span></li>`).join("\n")
    : `<li><span class="zh">本页暂未提取到清晰的标题层级。</span><span class="en">No clear heading hierarchy was extracted for this page.</span></li>`;
  const linkRows = links.length > 0
    ? links.map((link) => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.text)}</a></li>`).join("\n")
    : `<li>No same-site document links extracted.</li>`;
  const excerptRows = excerpts.length > 0
    ? excerpts.map((text) => `<p class="en">${escapeHtml(text)}</p>`).join("\n")
    : `<p class="en">No concise paragraph excerpt extracted.</p>`;

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(cnTitle)} / ${escapeHtml(title)}</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.65}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1080px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    code{font-family:"Cascadia Mono","Consolas",monospace}
    .status{display:inline-block;background:#8a6416;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body>
  <header>
    <span class="status">bilingual_draft</span>
    <h1>${escapeHtml(cnTitle)} / ${escapeHtml(title)}</h1>
    <div class="meta">${escapeHtml(officialUrl)}</div>
  </header>
  <main>
    <section>
      <h2>范围说明 / Scope Note</h2>
      <p class="zh">这是 OpenUSD API 全量队列中的批次草稿页。页面以中文说明为主，保留英文 API 名称、页面名、链接和有限英文原文摘录；后续迭代会继续补齐更细的中英对照。</p>
      <p class="en">This is a batch draft page in the full OpenUSD API queue. It keeps original API names, page names, links, and limited English source excerpts while later iterations add denser bilingual coverage.</p>
    </section>
    <section>
      <h2>页面结构 / Page Structure</h2>
      <ul>
${headingRows}
      </ul>
    </section>
    <section>
      <h2>原文摘录 / English Source Excerpts</h2>
${excerptRows}
    </section>
    <section>
      <h2>本页链接 / Page Links</h2>
      <ul>
${linkRows}
      </ul>
    </section>
    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="${escapeHtml(officialUrl)}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

const inventory = await readJson(path.join(reportDir, "all_pages_inventory.json"));
const batch = inventory.pages
  .filter((page) => page.area === "api" && page.status === (refreshDrafts ? "bilingual_draft" : "pending_full_scope"))
  .slice(0, batchSize);

await mkdir(sourceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });

const pages = [];
for (const page of batch) {
  const response = await fetch(page.official_url);
  const html = await response.text();
  const title = extractTitle(html, page.title, page.official_url);
  const sourceName = sourceFileName(page.official_url);
  const outputName = fileNameFromUrl(page.official_url);
  const sourcePath = path.join(sourceDir, sourceName);
  const outputPath = path.join(outputDir, outputName);
  await writeFile(sourcePath, html, "utf8");

  const headings = extractHeadings(html);
  const links = extractInternalLinks(html, page.official_url);
  const excerpts = shortEnglishExcerpt(html);
  const generated = buildPage({ officialUrl: page.official_url, title, headings, links, excerpts });
  await writeFile(outputPath, generated, "utf8");

  pages.push({
    official_url: page.official_url,
    title,
    source_snapshot: path.relative(root, sourcePath).replaceAll(path.sep, "/"),
    local_output: path.relative(root, outputPath).replaceAll(path.sep, "/"),
    status: "bilingual_draft",
    http_status: response.status,
    heading_count: headings.length,
    link_count: links.length,
    excerpt_count: excerpts.length,
  });
}

const report = {
  generated_at: new Date().toISOString(),
  batch_size: batch.length,
  status: "bilingual_draft",
  mode: refreshDrafts ? "refresh_existing_drafts" : "generate_pending_batch",
  note: "First-pass full-scope API pages. These are checkable bilingual draft HTML pages, not final paragraph-complete translations.",
  pages,
  passed: pages.length === batch.length && pages.every((page) => page.http_status >= 200 && page.http_status < 400),
};

await writeFile(path.join(reportDir, "api_full_batch_report.json"), JSON.stringify(report, null, 2), "utf8");
const mdRows = pages.map((page) => `| ${page.status} | ${page.title} | ${page.local_output} | ${page.official_url} |`).join("\n");
await writeFile(path.join(reportDir, "api_full_batch_report.md"), `# OpenUSD API Full-Scope Batch

Generated: ${report.generated_at}

- Status: ${report.status}
- Mode: ${report.mode}
- Batch size: ${report.batch_size}
- Passed: ${report.passed}

| Status | Title | Local output | Official URL |
| --- | --- | --- | --- |
${mdRows}
`, "utf8");

if (!report.passed) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  batchSize: pages.length,
  reportJson: path.join(reportDir, "api_full_batch_report.json"),
  reportMd: path.join(reportDir, "api_full_batch_report.md"),
}, null, 2));
