import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_release_apiDocs_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "apiDocs.html");

const terms = new Map([
  ["Universal Scene Description", "通用场景描述"],
  ["USD Home", "USD 首页"],
  ["API Documentation", "API 文档"],
  ["USD C++ API Documentation", "USD C++ API 文档"],
  ["USD Variable Expressions", "USD 变量表达式"],
  ["USD Toolset", "USD 工具集"],
  ["Previous", "上一页"],
  ["Next", "下一页"],
  ["Learn", "学习"],
  ["User Guides", "用户指南"],
  ["Reference", "参考"],
  ["Toolset", "工具集"],
  ["Specifications", "规范"],
  ["Proposals", "提案"],
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function htmlPair(en) {
  const zh = terms.get(en);
  if (!zh) return en;
  return `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>`;
}

function titlePair(en) {
  const zh = terms.get(en);
  return zh ? `${zh} / ${en}` : en;
}

function applyTextPairs(html) {
  for (const en of terms.keys()) {
    const pattern = new RegExp(`>(\\s*)${escapeRegex(en)}(\\s*)<`, "g");
    html = html.replace(pattern, (_match, before, after) => `>${before}${htmlPair(en)}${after}<`);
  }

  html = html.replace(/title="([^"]+)"/g, (match, title) => {
    if (!terms.has(title)) return match;
    return `title="${titlePair(title)}"`;
  });

  return html;
}

function injectBridgeNote(html) {
  const marker = `<div itemprop="articleBody">`;
  const note = `${marker}
<div class="cn-repro-scope admonition note">
<p class="admonition-title"><span class="cn-term">API 桥接页</span><span class="en-term">API bridge page</span></p>
<p class="zh">本页是 release 文档到 Doxygen API 文档的桥接入口。按钮链接保留为 <code>api/index.html</code>，并在本地跳转到已复刻的 API 首页。</p>
<p class="en">This page bridges the release documentation to the Doxygen API documentation. The button link remains <code>api/index.html</code> and locally redirects to the reproduced API index.</p>
<p class="zh">阅读 API 文档时，建议先从 Overview and Purpose 理解库的分层：底层是 Sdf、Vt、Tf、Ar 等基础模块，上层的 Usd、UsdGeom、UsdShade、UsdLux 等 schema 模块面向具体场景描述任务。</p>
<p class="en">When reading the API documentation, start with Overview and Purpose to understand the layering: lower modules such as Sdf, Vt, Tf, and Ar provide foundations, while schema modules such as Usd, UsdGeom, UsdShade, and UsdLux target concrete scene-description work.</p>
<p class="zh">本页只承担桥接和导航职责；真正的 Doxygen API 首页在本地 <code>site/index.html</code>，Usd core front page 在 <code>site/usd_page_front.html</code>，二者会保留英文类名、模块名和链接。</p>
<p class="en">This page is only a bridge and navigation page; the reproduced Doxygen API index is <code>site/index.html</code>, and the Usd core front page is <code>site/usd_page_front.html</code>, both retaining English class names, module names, and links.</p>
<p class="zh">如果某个 API 链接已经在 406 页清单内，本地页面会直接打开；如果它是清单外的 OpenUSD 内部 HTML，本地站点会先显示缺口提示，而不是无提示跳回官方英文站。</p>
<p class="en">If an API link is in the 406-page inventory, it opens locally; if it is an out-of-inventory OpenUSD internal HTML page, the local site shows a coverage-gap notice instead of silently leaving for the official English site.</p>
<p class="zh">中文层用于说明阅读路径和术语关系；API 名称、C++ 类名、页面名、文件名和代码片段继续使用官方英文，方便和源码、编译日志以及搜索结果互相对应。</p>
<p class="en">The Chinese layer explains reading paths and terminology; API names, C++ class names, page names, file names, and code fragments remain in official English so they match source code, build logs, and search results.</p>
<p class="zh">建议把这页当作从叙述性文档进入参考文档的门廊：如果你在教程或用户指南中遇到类名，就回到 API 首页按模块查找；如果你在 API 页遇到概念不清楚，再回到 release 文档中的术语、教程和用户指南。</p>
<p class="en">Treat this page as the doorway from narrative documentation into reference documentation: when a tutorial or user guide mentions a class, return to the API index by module; when an API page leaves a concept unclear, return to terms, tutorials, and user guides in the release documentation.</p>
<p class="zh">API 文档通常不会像教程那样按任务讲解，而是按模块、类、函数和文件组织信息。因此本地双语层会优先补阅读顺序和术语对照，帮助你知道先看哪一层、再查哪一个对象。</p>
<p class="en">API documentation is usually organized by modules, classes, functions, and files rather than by task. The local bilingual layer therefore emphasizes reading order and term mapping so you know which layer to read first and which object to inspect next.</p>
<p class="zh">本页中的按钮、侧栏、上一页和下一页链接都保留官方结构；中文只补充导航含义，不改变原有页面关系，这样本地复刻仍能和官方站点一一对应。</p>
<p class="en">Buttons, sidebars, previous links, and next links retain the official structure. Chinese text adds navigation meaning without changing page relationships, keeping this local reproduction aligned one to one with the official site.</p>
<p class="zh">如果你只想快速进入代码参考，直接点击 USD C++ API Documentation；如果你需要先理解模块之间的关系，先从 API 首页的阅读路线进入 Overview and Purpose，再回到具体模块或类页。</p>
<p class="en">If you only need code reference, go directly through USD C++ API Documentation; if you first need module relationships, use the API index reading route to enter Overview and Purpose before returning to specific modules or class pages.</p>
<p class="zh">本地复刻会把这类桥接页作为导航枢纽处理：中文说明告诉你为什么点击，英文标题和链接保持官方原样，便于后续和官方页面、源码符号以及搜索结果对照。</p>
<p class="en">This local reproduction treats bridge pages as navigation hubs: Chinese text explains why a link matters, while English titles and links stay official so they remain comparable with official pages, source symbols, and search results.</p>
</div>`;
  return html.replace(marker, note);
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated adjacent bilingual entry from source/openusd_release_apiDocs_source.html. Source URL: https://openusd.org/release/apiDocs.html -->\n${html}`;
html = html.replace('<html class="writer-html5" lang="en" data-content_root="./">', '<html class="writer-html5" lang="zh-CN" data-content_root="./">');
html = html.replace(
  "<title>API Documentation &mdash; Universal Scene Description 26.05 documentation</title>",
  "<title>API 文档 / API Documentation &mdash; Universal Scene Description 26.05 documentation</title>",
);
html = html.replace(
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />',
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />\n      <link rel="stylesheet" type="text/css" href="openusd_release_cn.css" />',
);
html = html.replace('placeholder="Search docs" aria-label="Search docs"', 'placeholder="搜索文档 / Search docs" aria-label="Search docs"');
html = html.replaceAll("https://openusd.org/images/USDIcon.ico", "images/USDIcon.ico");
html = html.replaceAll("https://openusd.org/images/USDLogoUnsized.svg", "images/USDLogoUnsized.svg");
html = html.replaceAll("https://openusd.org/images/piper-banner.jpg", "images/piper-banner.jpg");
html = html.replaceAll('href="index.html"', 'href="release_index.html"');
html = injectBridgeNote(html);
html = applyTextPairs(html);
html = html.replace(
  "</footer>",
  '<p class="cn-footer-note">中文双语复刻层：API 桥接入口，本地学习用途，官方 API 名称与链接保留。 / Bilingual API bridge layer for local study; official API names and links are preserved.</p>\n</footer>',
);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  output: outputPath,
  translatedTermCount: terms.size,
}, null, 2));
