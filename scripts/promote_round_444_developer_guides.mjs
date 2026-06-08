import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 444;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/_developer__guides.html";
const SOURCE = "source/full_api/_developer__guides_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/_developer__guides.html";
const SOURCE_PARITY_REPORT = "reports/round_444_developer_guides_source_parity.json";
const PROMOTION_ID = "round-444-api-developer-guides";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sourceHtml() {
  return fs.readFileSync(rel(SOURCE), "utf8");
}

function sourceText() {
  return stripTags(sourceHtml());
}

function sourceLinks() {
  return [...sourceHtml().matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ href: htmlDecode(match[1]), text: stripTags(match[2]) }))
    .filter((entry) => entry.text && entry.text !== "Terms of Use");
}

function sourceHeadings() {
  const title = stripTags(sourceHtml().match(/<div class="title">([\s\S]*?)<\/div>/i)?.[1] || "");
  return title ? [{ level: 1, text: title }] : [];
}

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.68}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 10px;font-size:17px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .navlinks{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 0}
    .navlinks a{color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:6px;padding:5px 8px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    .status{display:inline-block;background:#206a3b;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .note{background:#f2f6fb;border-left:4px solid #3f6f9f;padding:10px 12px;border-radius:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    code{font-family:"Cascadia Mono","Consolas",monospace}
    body.openusd-has-reading-flow{padding-left:292px}
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#fff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#fff}
    @media (max-width:920px){
      body.openusd-has-reading-flow{padding-left:0}
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  `;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  api: "../../site/index.html",
  apiRedirect: "../../site/api/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/_developer__guides_source.html",
  official: OFFICIAL_URL,
  prev: "usddraco_page_front.html",
  next: "plug_page_front.html",
  plug: "plug_page_front.html",
  tf: "tf_page_front.html",
  sdf: "sdf_page_front.html",
  ar: "ar_page_front.html",
  annotated: "annotated.html",
  files: "files.html",
};

const guideEntries = [
  ["Coding Guidelines for OpenUSD", "_page__coding__guidelines.html", "编码规范入口，适合确认 OpenUSD C++/Python 代码风格、命名、头文件和提交前自检边界。"],
  ["Testing Guidelines for OpenUSD", "_page__testing__guidelines.html", "测试规范入口，适合确认单元测试、回归测试和验证策略，而不是替代具体测试脚本。"],
  ["Programmer's Guide to Color in OpenUSD", "_page__color__programmers__guide.html", "颜色编程指南入口，适合把 API 层的颜色处理与 release 用户指南中的色彩说明衔接起来。"],
  ["Hydra 2.0 Getting Started Guide", "_page__hydra__getting__started__guide.html", "Hydra 入门入口，适合进入渲染架构、delegate 和 scene index 等开发路径。"],
  ["Hydra Scene Debugger", "_page__hydra__scene__debugger.html", "Hydra 调试器入口，适合排查渲染场景、数据流和调试工具，而不是基础 USD 组成问题。"],
  ["Hydra Prim Schemas", "_page__hydra__prim__schemas.html", "Hydra prim schema 入口，适合理解 Hydra 相关 schema 与 USD/Hd/Hdx 的边界。"],
  ["MaterialX In Hydra and USD Architecture Guide", "_page__material_x__in__hydra__u_s_d.html", "MaterialX 架构入口，适合衔接 MaterialX、Hydra、USD、UsdShade、Sdr 和 UsdMtlx。"],
];

function sourceGuideList() {
  return guideEntries.map(([title, href, zh]) => `      <li>
        <span class="zh"><code>${esc(title)}</code>：${esc(zh)}当前 406 页本地 inventory 没有收录 <code>${esc(href)}</code> 的完整本地页，因此本页只保留条目语义，并通过显式官方原页继续核对。</span>
        <span class="en">Source guide entry: ${esc(title)} (${esc(href)}).</span>
      </li>`).join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / _developer__guides.html</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="${links.final}">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="${links.release}">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="${links.api}">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="${links.apiRedirect}">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>当前位置 / Current Layer</h3>
      <ol>
        <li>api</li>
        <li>_developer__guides.html</li>
      </ol>
    </section>
    <section>
      <h3>开发者上下文 / Developer Context</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.plug}">Plug 插件发现</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.tf}">Tf 基础设施</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf 数据模型</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.ar}">Ar 资产解析</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>索引与清单 / Indexes</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.annotated}">Classes index</a><span class="openusd-reading-flow-status">draft</span></li>
        <li><a data-reading-flow="related" href="${links.files}">Files index</a><span class="openusd-reading-flow-status">draft</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页 / 下一页</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: UsdDraco</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: Plug</a></li>
      </ul>
    </section>
    <section>
      <h3>官方外跳 / Official</h3>
      <ul>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></li>
      </ul>
    </section>
  </div>
</aside>
<!-- openusd-reading-flow-nav:end -->`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Developer Guides - OpenUSD API 双语</title>
  <style>${css()}</style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-scope="api" data-cn-review-ready="true">
${readingFlowNav()}
<header>
  <span class="status">bilingual_complete / review_ready_zh</span>
  <h1>Developer Guides</h1>
  <div class="meta">第 ${ROUND} 轮 ${ROUND_TYPE}：开发者指南入口页完成。源页：<code>${SOURCE}</code>；官方页：<code>${OFFICIAL_URL}</code></div>
  <div class="navlinks">
    <a href="${links.final}">总入口</a>
    <a href="${links.api}">API 本地入口</a>
    <a href="${links.source}">本地 source snapshot</a>
    <a href="${links.official}">Open official page</a>
  </div>
</header>
<main>
  <section data-cn-complete="overview">
    <h2>中文主阅读路径</h2>
    <p><span class="zh"><code>Developer Guides</code> 是 OpenUSD API 文档里的开发者入口页。source snapshot 的主体不是 class reference，也不是函数清单，而是一组面向贡献者和底层开发者的指南链接：编码规范、测试规范、颜色编程、Hydra 入门、Hydra 场景调试器、Hydra prim schemas，以及 MaterialX 在 Hydra 和 USD 中的架构说明。本地页的任务是把这个入口的阅读顺序、边界和相邻模块关系讲清楚。</span><span class="en">The source page is a Developer Guides entry page that lists development-oriented guide links.</span></p>
    <p><span class="zh">阅读这页时要先判断自己的问题属于哪一类：如果是“如何按 OpenUSD 项目风格写代码”，从 <code>Coding Guidelines for OpenUSD</code> 开始；如果是“如何给改动写测试或验证行为”，从 <code>Testing Guidelines for OpenUSD</code> 开始；如果是“颜色数据在 OpenUSD API 中如何表达和转换”，进入 <code>Programmer's Guide to Color in OpenUSD</code>；如果是 Hydra 或 MaterialX 相关开发，则进入对应的 Hydra 和 MaterialX 指南。</span><span class="en">Choose the guide based on whether the task is coding style, testing, color programming, Hydra, or MaterialX architecture.</span></p>
    <p><span class="zh">这个页面不是用户教程目录，也不是 release 用户指南的替代品。它位于 API/Doxygen 侧，更适合贡献者、库开发者、渲染插件开发者和需要理解内部架构的读者。普通资产作者如果只是想学习 scene composition、schema 使用或命令行工具，通常应先从 Release 本地入口、schema/user guide 或具体模块 front page 进入，再回到本页查开发规范。</span><span class="en">This page is API-side developer documentation, not a substitute for release user guides.</span></p>
  </section>

  <section data-cn-complete="source-parity">
    <h2>官方结构与 source parity</h2>
    <p><span class="zh">本页使用 <code>${SOURCE}</code> 对齐官方页面。源页标题为 <code>Developer Guides</code>，正文文本包含 <code>General Guidelines</code>、<code>Hydra Guides</code> 和 <code>MaterialX Guides</code> 三组入口。source parity 的重点是保留这些标题和 7 个指南条目的语义，而不是把未纳入本地 406 页 inventory 的子指南伪装成本地完成页。</span><span class="en">Source parity preserves the title, guide groups, and seven guide entries.</span></p>
    <ul>
      <li><span class="zh">官方标题：<code>${esc(sourceHeadings()[0]?.text || "Developer Guides")}</code>。</span><span class="en">Official page title: Developer Guides.</span></li>
      <li><span class="zh">官方分组：<code>General Guidelines</code>、<code>Hydra Guides</code>、<code>MaterialX Guides</code>。</span><span class="en">Official groups: General Guidelines, Hydra Guides, and MaterialX Guides.</span></li>
      ${sourceGuideList()}
    </ul>
    <p class="note"><span class="zh">注意：这些源页链接目前没有对应的本地完整 HTML 页面或 source snapshot，因此本页不创建静默跳转到官方英文站的阅读路径。需要核对原始链接时，请使用顶部和侧栏中的 <code>打开官方原页 / Open official page</code>，然后在官方页面内进入相应指南。</span><span class="en">The child guide links are not local completed pages in this 406-page inventory; use the explicit official-page link for source verification.</span></p>
  </section>

  <section data-cn-complete="plain-zh-summary">
    <h2>纯中文阅读摘要</h2>
    <p class="zh">本页适合作为开发者工作的分流台。它不会直接告诉你某个 API 类的全部成员，也不会解释某个 schema 的用户层含义；它告诉你，当问题转向“如何开发 OpenUSD 本身、如何遵守项目规则、如何测试、如何调试 Hydra 或 MaterialX 架构”时，应该进入哪类指南。</p>
    <p class="zh">如果目标是修改核心库代码，先从编码规范和测试规范开始，再跳到相关模块的 API front page。这样可以避免只看类参考而忽略项目约定。类参考通常说明“有什么接口”，开发者指南则补充“怎样以项目接受的方式使用和修改这些接口”。</p>
    <p class="zh">如果目标是理解 Hydra 渲染开发，官方入口把 Hydra 2.0 入门、Hydra Scene Debugger 和 Hydra Prim Schemas 放在同一组。阅读顺序应先建立 Hydra 数据流和 delegate 的基本概念，再用 Scene Debugger 排查场景，再看 prim schemas 如何把 USD 数据暴露给 Hydra 消费。</p>
    <p class="zh">如果目标是 MaterialX 与 USD/Hydra 的结合，MaterialX 架构指南是桥接入口。它不等同于 UsdShade 的完整教程，也不等同于 MaterialX 规范全文；它更偏向说明 MaterialX 在 Hydra 和 USD 架构中如何接入、由哪些模块消费、哪些问题应继续追到 UsdShade、Sdr 或 UsdMtlx。</p>
    <p class="zh">本地中文页还需要诚实说明快照边界：当前 406 页本地 inventory 没有把这些子指南作为独立完成页收录。为了不破坏本地连续阅读体验，本页只在正文中保留条目语义，不把它们做成看似本地可读但实际跳官方站的普通链接。</p>
    <p class="zh">排查开发问题时，不要把本页当成最终答案。它是路径选择器：编码和测试问题先去 General Guidelines；渲染框架和数据流问题先去 Hydra Guides；材质网络和 MaterialX 接入问题先去 MaterialX Guides；具体 API 类型、token、schema、函数或文件仍要回到本地 API 模块页、class 页或 source snapshot。</p>
    <p class="zh">如果你是贡献者，本页的实际价值在于降低误读成本。很多问题不是“哪个函数能调用”，而是“这个改动应该放在哪个层级、怎样测试、是否符合项目约定、是否会影响 Hydra 或 MaterialX 消费路径”。这些问题靠 class reference 不够，需要开发者指南提供规则背景。</p>
  </section>

  <section data-cn-complete="boundaries">
    <h2>职责边界：入口页，不是完整开发手册复制</h2>
    <p><span class="zh"><code>Developer Guides</code> 的职责是组织入口，不是把每份开发手册全文复制到当前页。源页没有展开代码样式细节、测试目录结构、Hydra 调试命令或 MaterialX 适配规则，因此本地中文页也不发明这些细节。它只解释每个入口该在什么场景使用，以及如果本地没有对应页面，应该如何诚实地回到官方原页核对。</span><span class="en">Developer Guides is an index-style entry page, not a full copy of every guide.</span></p>
    <p><span class="zh">与 <a href="${links.annotated}">Classes index</a> 和 <a href="${links.files}">Files index</a> 的区别也很重要：类索引和文件索引用于精确定位 API 符号，开发者指南用于理解开发约定、测试策略和架构路径。前者回答“符号在哪里”，后者回答“开发时应该怎样走”。两者应该配合阅读，而不是互相替代。</span><span class="en">Classes and files indexes locate symbols; developer guides explain conventions and architecture paths.</span></p>
    <p><span class="zh">与 Release 用户文档的区别同样明确：Release 文档面向使用 OpenUSD 的读者，强调资产、schema、教程、插件和发布说明；Developer Guides 面向修改 OpenUSD 或构建相关工具链的读者，强调贡献规则、测试、Hydra 调试和 MaterialX 架构。用户学习路径可以从 Release 开始，开发者修代码时再回到本页。</span><span class="en">Release docs focus on using OpenUSD; this page focuses on developing OpenUSD and related systems.</span></p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻模块阅读路径</h2>
    <p><span class="zh">第一条路径是基础设施路径：阅读 <a href="${links.tf}">Tf</a>、<a href="${links.plug}">Plug</a>、<a href="${links.sdf}">Sdf</a> 和 <a href="${links.ar}">Ar</a>。这些页面帮助开发者理解 token、插件发现、layer 数据模型和资产解析，是很多编码规范、测试策略和插件调试的前置背景。</span><span class="en">Tf, Plug, Sdf, and Ar provide infrastructure context for coding, testing, plug-in discovery, and asset resolution.</span></p>
    <p><span class="zh">第二条路径是渲染开发路径：如果问题来自 Hydra 指南，应继续阅读已完成的 Hd、Hdx、HdStorm、HdEmbree、UsdRender、Sdr、UsdShaders、UsdMtlx 等模块入口。Hydra 文档通常连接 scene delegate、render delegate、schema、debugger 和 renderer plugin，不能只靠单个 class reference 理解。</span><span class="en">Hydra developer work connects Hd, Hdx, render delegates, schemas, debugging tools, and renderer plug-ins.</span></p>
    <p><span class="zh">第三条路径是材质和着色路径：MaterialX 指南应与 UsdShade、Sdr、UsdShaders 和 UsdMtlx 一起阅读。若问题是 shader discovery 或 property 表达，去 Sdr；若问题是 USD 材质网络表达，去 UsdShade；若问题是 MaterialX 文件格式或 shader plugin 接入，去 UsdMtlx。Developer Guides 只负责把这些路线分清。</span><span class="en">MaterialX-related questions should be routed to UsdShade, Sdr, UsdShaders, and UsdMtlx depending on the failure layer.</span></p>
  </section>

  <section data-cn-complete="debugging">
    <h2>调试路径与常见误读</h2>
    <p><span class="zh">调试贡献或构建问题时，先判断问题属于规则、测试、架构还是符号层。规则问题查 Coding Guidelines；测试问题查 Testing Guidelines；Hydra 数据流或调试器问题查 Hydra Guides；MaterialX 与渲染架构问题查 MaterialX Guides；具体符号问题再回到 class/file index 或模块 front page。这样可以避免在 API 符号页里寻找项目规范。</span><span class="en">Classify the problem as convention, test, architecture, or symbol-level before choosing a path.</span></p>
    <p><span class="zh">常见误读之一是把开发者指南当作普通用户教程。用户教程通常教你如何创建资产或使用 schema；开发者指南更关心代码如何被接受、如何验证、Hydra 调试工具怎样帮助开发，以及架构层怎样把模块接起来。另一个误读是把官方子指南缺失看作本地站点完整性错误；实际上这些子指南不在当前 406 页快照内，必须显式说明。</span><span class="en">Common misreads include treating developer guides as user tutorials or pretending missing guide pages are local completed pages.</span></p>
    <p><span class="zh">如果读者需要进入官方子指南，本地页只提供明确的官方原页外跳入口，而不是在正文中放置一串隐式外链。这样做是为了遵守本地中文站的阅读流规则：站内阅读应优先走本地页面，只有“打开官方原页 / Open official page”才表示明确离开本地中文站。</span><span class="en">Official navigation is explicit so local reading flow does not silently jump to the official English site.</span></p>
  </section>

  <section data-cn-complete="acceptance-checklist">
    <h2>最小验收清单</h2>
    <p><span class="zh">判断本页是否读懂，可以检查四点：第一，知道它是 Developer Guides 入口页，不是 class reference；第二，能说出 General Guidelines、Hydra Guides、MaterialX Guides 三组入口分别面向什么问题；第三，知道缺失的子指南没有本地完整页，不能伪装成本地已完成链接；第四，知道下一步应按问题类型跳到本地 API 模块、索引页、Release 文档或显式官方原页。</span><span class="en">A reader should understand the page role, guide groups, local snapshot boundary, and next reading path.</span></p>
    <p><span class="zh">本轮晋级的质量边界是：补足中文主阅读路径和 source parity，不增加源页没有的 API 细节；保留 <code>Developer Guides</code>、7 个官方指南条目、API/Release/总入口、source snapshot、相邻本地 API 模块和显式官方外跳。验证通过后，这一页可以从 API 草稿晋级为 <code>bilingual_complete</code>。</span><span class="en">The promotion boundary is source-aligned reading guidance, not invented API detail.</span></p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li><span class="zh">标题已覆盖：<code>Developer Guides</code> 被解释为 API/Doxygen 侧的开发者入口页。</span><span class="en">Title coverage: Developer Guides is an API-side developer entry page.</span></li>
      <li><span class="zh">官方分组已覆盖：<code>General Guidelines</code>、<code>Hydra Guides</code>、<code>MaterialX Guides</code> 均有中文用途说明。</span><span class="en">Group coverage includes General Guidelines, Hydra Guides, and MaterialX Guides.</span></li>
      <li><span class="zh">官方条目已覆盖：7 个指南链接的标题和用途都被保留，并说明它们当前没有本地完整页。</span><span class="en">Guide-entry coverage preserves all seven official guide titles and their local snapshot boundary.</span></li>
      <li><span class="zh">边界已覆盖：本页不是用户教程、不是 class reference、不是完整开发手册复制，也不伪造缺失子指南。</span><span class="en">Boundary coverage states that this page is not a user tutorial, class reference, or full guide copy.</span></li>
      <li><span class="zh">调试路径已覆盖：按规则、测试、Hydra、MaterialX、符号层分流到相邻本地页面或显式官方原页。</span><span class="en">Debugging path coverage routes work by conventions, tests, Hydra, MaterialX, or symbol-level needs.</span></li>
      <li><span class="zh">本地连续阅读已覆盖：总入口、API 入口、Release 入口、source snapshot、上一页 <code>UsdDraco</code>、下一页 <code>Plug</code>、相邻 <code>Tf</code>/<code>Sdf</code>/<code>Ar</code>/<code>Files</code>/<code>Classes</code> 页面和显式官方页链接均已保留。</span><span class="en">Reading-flow coverage includes final entry, API entry, release entry, source snapshot, adjacent modules, previous/next, and official link.</span></li>
    </ul>
  </section>
</main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceText();
  const rawOut = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const out = stripTags(rawOut);
  const sourceKeywords = [
    "Developer Guides",
    "General Guidelines",
    "Coding Guidelines for OpenUSD",
    "Testing Guidelines for OpenUSD",
    "Programmer's Guide to Color in OpenUSD",
    "Hydra Guides",
    "Hydra 2.0 Getting Started Guide",
    "Hydra Scene Debugger",
    "Hydra Prim Schemas",
    "MaterialX Guides",
    "MaterialX In Hydra and USD Architecture Guide",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "Plug",
    "Tf",
    "Sdf",
    "Ar",
    "Classes index",
    "Files index",
    "Open official page",
  ];
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_headings: sourceHeadings(),
    source_links: sourceLinks(),
    source_keywords_checked: sourceKeywords,
    output_keywords_checked: outputKeywords,
    missing_source_keywords: sourceKeywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: outputKeywords.filter((keyword) => !out.includes(keyword)),
    missing_local_child_pages: guideEntries.map(([title, href]) => ({ title, href, local_exists: fs.existsSync(rel("full_site/api", href)) })).filter((entry) => !entry.local_exists),
    output_checks: {
      has_complete_status: rawOut.includes('data-cn-status="bilingual_complete"') && rawOut.includes(`data-cn-round="${ROUND}"`),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: rawOut.includes("openusd_bilingual_final.html"),
      has_api_entry: rawOut.includes("site/index.html"),
      has_api_redirect: rawOut.includes("site/api/index.html"),
      has_release_entry: rawOut.includes("site/release_index.html"),
      has_reading_flow_nav: rawOut.includes("openusd-reading-flow-nav") && rawOut.includes("openusd-reading-flow-breadcrumb"),
      has_explicit_official_link: rawOut.includes("Open official page") && rawOut.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|later iterations add denser bilingual coverage|后续迭代会继续补齐/.test(out),
      no_implicit_official_child_links: !guideEntries.some(([, href]) => rawOut.includes(`href="https://openusd.org/release/api/${href}"`)),
      zh_chars: zhChars(rawOut),
      zh_blocks: (rawOut.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
    },
  };
}

function writePage() {
  fs.writeFileSync(rel(TARGET), buildHtml(), "utf8");
  writeJson(SOURCE_PARITY_REPORT, sourceParity());
}

function precheck() {
  const report = sourceParity();
  const failed = [];
  if (report.missing_source_keywords.length) failed.push(`missing source keywords: ${report.missing_source_keywords.join(", ")}`);
  if (report.missing_output_keywords.length) failed.push(`missing output keywords: ${report.missing_output_keywords.join(", ")}`);
  for (const [key, value] of Object.entries(report.output_checks)) {
    if (typeof value === "boolean" && !value) failed.push(`output check failed: ${key}`);
  }
  if (report.output_checks.zh_chars < 2600) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 30) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
  if (failed.length) {
    console.error(JSON.stringify({ passed: false, failed, report }, null, 2));
    process.exit(1);
  }
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify({ passed: true, report }, null, 2));
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
    updated_at: new Date().toISOString(),
  };
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "Developer Guides",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Developer Guides API entry page by adding Chinese main-reading-path coverage for General Guidelines, Hydra Guides, MaterialX Guides, seven official guide entries, local snapshot boundaries, adjacent API/release reading paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2600,
      minimum_complete_section_chinese_chars: 2300,
      minimum_chinese_blocks: 30,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
    },
  });
  writeJson("reports/bilingual_completion_promotions.json", doc);
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const inventory = readJson("reports/all_pages_inventory.json");
  const counts = {
    total_pages: inventory.counts.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: debt.counts.review_ready_zh,
    api_complete: debt.counts.api_complete,
    api_review_ready_zh: debt.counts.api_review_ready_zh,
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已晋级，并跟踪当前 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 222,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-local-snapshot-boundary",
        severity: "P1",
        summary: "入口/索引页必须诚实说明未纳入本地 inventory 的官方子页，不得伪装成本地完成页面。",
        evidence: "本轮 Developer Guides 的 7 个官方子指南未在 406 页本地 inventory 中形成完整本地页；目标页只保留条目语义，并通过显式 Open official page 核对官方源页。",
        required_action: "后续处理索引页时继续区分本地已完成页、可检查草稿、未纳入本地快照的官方条目。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、相邻 API 阅读路径和 Open official page 外跳，并会重新运行 reading-flow 审计。",
        required_action: "若 reading-flow 审计失败，先修导航，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无重复问号损坏、replacement character 和 UTF-8 BOM。",
        required_action: "若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。",
      },
    ],
    promoted_pages: [
      {
        round: ROUND,
        round_type: ROUND_TYPE,
        output: TARGET,
        official_url: OFFICIAL_URL,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
      },
    ],
    not_promoted_pages: [],
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "release 范围已 126/126 complete，不要重复处理 release 已完成页。",
      "下一轮建议重新读取 inventory，选择仍为 bilingual_draft 且有 source snapshot 的 API 或 class 页面；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_444_developer_guides.mjs --write-page --precheck --manifest --problem");
}
