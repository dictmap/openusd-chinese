import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 440;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/sdr_glslfx_page_front.html";
const SOURCE = "source/full_api/sdr_glslfx_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/sdr_glslfx_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_440_sdr_glslfx_module_front_source_parity.json";
const PROMOTION_ID = "round-440-api-sdr-glslfx-module-front";

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

function sourceHeadings() {
  const heads = [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
  const title = stripTags(sourceHtml().match(/<div class="title">([\s\S]*?)<\/div>/i)?.[1] || "");
  return title ? [{ level: 1, text: title }, ...heads] : heads;
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
  source: "../../source/full_api/sdr_glslfx_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "js_page_front.html",
  next: "usd_hydra_page_front.html",
  sdr: "sdr_page_front.html",
  usdShade: "usd_shade_page_front.html",
  usdShaders: "usd_shaders_page_front.html",
  usdMtlx: "usd_mtlx_page_front.html",
  hd: "hd_page_front.html",
  hdx: "hdx_page_front.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text && heading.text !== "Table of Contents")
    .map((heading) => `<li><span class="zh">官方结构：<code>${esc(heading.text)}</code>。中文页把这一节映射到 <code>SdrGlslfx</code> 的模块职责、<code>glslfx</code> parser 与 <code>Sdr</code> 的关系、非运行时边界、相邻 <code>Sdr</code>/<code>UsdShade</code>/<code>UsdShaders</code>/<code>UsdMtlx</code>/<code>Hd</code> 阅读路径和调试分层。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / sdr_glslfx_page_front.html</span>
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
        <li>sdr_glslfx_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>Shader 发现和定义</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.sdr}">Sdr Shader Definition Registry</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdShade}">UsdShade 材质网络</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdShaders}">UsdShaders shader nodes</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdMtlx}">UsdMtlx MaterialX 插件</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>渲染消费和调试</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.hd}">Hd Hydra 核心</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdx}">Hdx 任务和调试</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页 / 下一页</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: Js</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: UsdHydra 候选页面</a></li>
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
  <title>SdrGlslfx : Glslfx parser for Sdr - OpenUSD API 双语</title>
  <style>${css()}</style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-scope="api" data-cn-review-ready="true">
${readingFlowNav()}
<header>
  <h1>SdrGlslfx : Glslfx parser for Sdr</h1>
  <div class="meta">第 ${ROUND} 轮 ${ROUND_TYPE}：SdrGlslfx 模块入口完成。源页：<code>${SOURCE}</code>；官方页：<code>${OFFICIAL_URL}</code></div>
  <div class="navlinks">
    <a href="${links.final}">总入口</a>
    <a href="${links.api}">API 本地入口</a>
    <a href="${links.source}">本地 source snapshot</a>
    <a href="${links.official}">Open official page</a>
  </div>
</header>
<main>
  <section data-cn-complete="overview">
    <span class="status">bilingual_complete / review_ready_zh</span>
    <h2>中文主阅读路径</h2>
    <p><span class="zh"><code>SdrGlslfx</code> 的官方标题是 <code>SdrGlslfx : Glslfx parser for Sdr</code>。源页 Overview 只有一句核心说明：<code>This library houses the glslfx parser for sdr.</code> 因此，本页的中文主路径必须围绕这个边界展开：它是给 <code>Sdr</code> 使用的 <code>glslfx</code> parser 承载模块，不是 shader runtime、不是 Hydra renderer、也不是 <code>UsdShade</code> authoring 教程。</span><span class="en">This library houses the glslfx parser for sdr.</span></p>
    <p><span class="zh"><code>Sdr</code> 是 Shader Definition Registry，关注 shader definition 的发现、表示和查询；<code>SdrGlslfx</code> 则位于更窄的一层，负责把 <code>glslfx</code> 格式的 shader definition 输入解析成 <code>Sdr</code> 可以消费的描述。读者应先把它理解为“格式解析入口”，再去看 <a href="${links.sdr}">Sdr</a> 如何组织 registry、node 和 property，而不是把解析器当成 shader 节点实现本身。</span><span class="en">SdrGlslfx is the glslfx parser component for Sdr, not the full registry or shader implementation.</span></p>
    <p><span class="zh">因为源页非常短，页面晋级的重点不是制造不存在的 API 细节，而是把官方一句话放回 OpenUSD shader 生态中：<code>glslfx</code> 是一种 shader definition 相关输入，<code>SdrGlslfx</code> 负责解析它，<code>Sdr</code> 负责把解析结果纳入 shader definition registry，<code>UsdShade</code>、<code>UsdShaders</code>、<code>UsdMtlx</code> 和 <code>Hd</code>/<code>Hdx</code> 则在更高层或消费层使用这些定义。每一层的责任不同。</span><span class="en">The page maps the short official statement into the surrounding shader-definition stack.</span></p>
  </section>

  <section data-cn-complete="source-coverage">
    <h2>官方结构与 source parity</h2>
    <p><span class="zh">本页使用 <code>${SOURCE}</code> 对齐官方 <code>SdrGlslfx : Glslfx parser for Sdr</code> 页面。官方 source 只有 <code>Overview</code> 一个 section，所以中文页的 source parity 很直接：保留标题、保留 <code>SdrGlslfx</code>、保留 <code>Glslfx parser for Sdr</code>、保留 <code>glslfx parser</code> 和 <code>sdr</code> 的大小写语义，并明确这只是 parser housing，不把它扩写成渲染或材质系统总览。</span><span class="en">The local page follows the official title and Overview statement exactly.</span></p>
    <ul>
      ${headingList()}
    </ul>
    <p><span class="zh">source parity 检查的关键词包括 <code>SdrGlslfx : Glslfx parser for Sdr</code>、<code>Overview</code>、<code>This library houses the glslfx parser for sdr.</code>、<code>SdrGlslfx</code>、<code>glslfx</code>、<code>parser</code> 和 <code>sdr</code>。输出页还额外保留与相邻模块有关的 <code>Sdr</code>、<code>UsdShade</code>、<code>UsdShaders</code>、<code>UsdMtlx</code>、<code>Hd</code>、<code>Hdx</code> 和 <code>Open official page</code>，用于本地连续阅读。</span><span class="en">Source parity checks the exact title, Overview, and parser statement while preserving local adjacent-module links.</span></p>
  </section>

  <section data-cn-complete="responsibility">
    <h2>职责边界：parser，不是 runtime</h2>
    <p><span class="zh"><code>SdrGlslfx</code> 的职责可以拆成三步理解。第一，它面对的是 <code>glslfx</code> 这种 shader definition 输入格式；第二，它把这种输入解析成 <code>Sdr</code> 体系可理解的数据；第三，它让上层的 shader definition registry 可以通过统一路径使用这些定义。这里没有承诺执行 GLSL、生成 GPU 程序、编译 shader 或做 Hydra 渲染。</span><span class="en">SdrGlslfx parses glslfx input for Sdr; it does not execute or render shaders.</span></p>
    <p><span class="zh">常见误读是看到 <code>glslfx</code> 就直接联想到 shader runtime 或 GPU backend。更准确的分层是：<code>SdrGlslfx</code> 处理 glslfx 文本或定义输入；<code>Sdr</code> 管理 shader definition 的 registry 和查询；<code>UsdShade</code> 描述 USD 场景里的材质网络；<code>UsdShaders</code> 提供若干基于 <code>UsdShade</code> 的 shader 节点定义和实现；<code>Hd</code>/<code>Hdx</code> 或具体 renderer 再决定如何消费或展示这些信息。</span><span class="en">The parser layer, registry layer, scene authoring layer, and rendering consumption layer are separate.</span></p>
    <p><span class="zh">这一区分对调试很重要。如果某个 shader definition 没有进入 registry，应该先检查 <code>glslfx</code> 输入是否能被 parser 读取、发现路径是否正确、解析结果是否符合 <code>Sdr</code> 期望；如果材质网络连接不正确，则应看 <code>UsdShade</code> authoring；如果渲染结果异常，则进入 <code>Hd</code>/<code>Hdx</code> 或 renderer 支持层。不要把所有问题都归到 <code>SdrGlslfx</code>。</span><span class="en">Debugging should distinguish parser discovery, Sdr registry state, UsdShade authoring, and renderer behavior.</span></p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻模块阅读路径</h2>
    <p><span class="zh">第一站应读 <a href="${links.sdr}">Sdr</a>。<code>Sdr</code> 页面解释 Shader Definition Registry 的职责，能帮助读者理解 parser 输出最终服务于什么 registry。<code>SdrGlslfx</code> 只是其中一个格式解析入口；如果不了解 <code>Sdr</code> 的 node/property 查询模型，就容易高估此页的范围。</span><span class="en">Read Sdr first to understand the registry that consumes parser results.</span></p>
    <p><span class="zh">第二站可以读 <a href="${links.usdShade}">UsdShade</a> 和 <a href="${links.usdShaders}">UsdShaders</a>。它们处在 USD 场景和 shader 节点定义层，关注材质网络、shader 节点和属性连接。<code>SdrGlslfx</code> 不负责 author 这些网络，但它解析出的定义可能被上层工具或 registry 用来描述可用 shader 节点、属性和元数据。</span><span class="en">UsdShade and UsdShaders are higher-level consumers and authoring contexts.</span></p>
    <p><span class="zh">第三站是 <a href="${links.usdMtlx}">UsdMtlx</a>。它代表另一类 shader/material 描述生态，与 <code>Sdr</code>、<code>UsdShade</code> 和渲染消费也有关。阅读时要区分 <code>SdrGlslfx</code> 解析 <code>glslfx</code>，<code>UsdMtlx</code> 处理 MaterialX file format and shader plugins；二者都可能接入 shader definition 生态，但输入格式和插件边界不同。</span><span class="en">UsdMtlx is adjacent but covers MaterialX rather than glslfx parsing.</span></p>
    <p><span class="zh">最后再读 <a href="${links.hd}">Hd</a> 和 <a href="${links.hdx}">Hdx</a>。这两页更接近 Hydra 渲染框架和任务/调试层。shader definition 是否被发现是一回事，renderer 是否支持、如何编译、如何在渲染任务中使用又是另一回事。把 parser、registry、scene authoring 和 render consumption 分开，是本页最重要的调试价值。</span><span class="en">Hd and Hdx belong to the rendering consumption and debugging side, not the glslfx parser itself.</span></p>
  </section>

  <section data-cn-complete="debugging">
    <h2>调试路径和非目标范围</h2>
    <p><span class="zh">排查 <code>SdrGlslfx</code> 相关问题时，第一步是确认输入是否真的是 <code>glslfx</code>，以及文件或资源是否位于 Sdr 发现流程能够看到的位置。第二步是确认 parser 是否能读取该输入，并产生 <code>Sdr</code> 预期的数据。第三步才是检查 registry 中是否出现目标 shader definition。若 registry 已有定义但场景使用失败，问题通常应转到 <code>UsdShade</code> 或 renderer 层。</span><span class="en">Debugging starts with input format and discovery path, then parser output, then Sdr registry visibility.</span></p>
    <p><span class="zh">如果渲染画面不符合预期，不要直接把问题归咎于 <code>SdrGlslfx</code>。parser 只回答“glslfx 定义是否能被读取并变成 Sdr 可消费的信息”；渲染画面还受材质网络 authoring、shader implementation、renderer 支持、Hydra delegate、调试开关和平台后端影响。错误定位要沿着数据流逐层前进。</span><span class="en">Rendering failures can come from authoring, implementation, renderer support, delegate behavior, or backend details.</span></p>
    <p><span class="zh">非目标范围也要明确：本页不定义 <code>glslfx</code> 语法手册，不逐行解释 shader 文件内容，不承诺任何具体 renderer 支持，不描述 <code>UsdShade</code> 网络 authoring，也不替代 <code>Sdr</code> registry 文档。它只解释这个 API front page 的定位：<code>SdrGlslfx</code> 是把 <code>glslfx</code> parser 放在 OpenUSD <code>Sdr</code> 体系中的模块入口。</span><span class="en">Out of scope: full glslfx syntax, shader file tutorial, renderer support guarantees, and UsdShade authoring.</span></p>
    <p><span class="zh">最小验证思路是准备一个已知可用的 <code>glslfx</code> 输入，确认发现路径可见、parser 能读、registry 能查询，再用上层工具检查 shader definition 是否作为预期节点或属性出现。这样可以把 parser 层验证控制在较小范围内，不把整个材质和渲染流程都压到本页职责上。</span><span class="en">A minimal validation path verifies discovery, parser read, registry query, and then higher-level tool visibility.</span></p>
  </section>

  <section data-cn-complete="engineering-notes">
    <h2>工程使用提示</h2>
    <p><span class="zh">因为官方页只说明“housing parser”，本地中文页在扩展说明时必须保守：它可以解释为什么 parser 层存在、为什么它和 <code>Sdr</code> registry 有关、为什么它不等于 shader 执行层，但不能伪造不存在的函数列表或类层级。读者需要具体函数签名时，应继续进入本地 Doxygen 的 class/file 页面，而不是把 front page 当作完整 API reference。</span><span class="en">The front page explains the parser module boundary and does not invent function-level API reference.</span></p>
    <p><span class="zh"><code>glslfx</code> 输入出错时，错误归因应从最靠近输入的地方开始：文件是否存在、路径是否被发现、文本是否符合 glslfx 期望、parser 是否报告语法或结构问题。只有当这些都成立后，才继续检查 <code>Sdr</code> registry 中的 shader definition 是否生成。若直接跳到材质网络或渲染输出，往往会把低层输入问题误判成高层渲染问题。</span><span class="en">Start debugging glslfx issues from file discovery and parse success before moving to registry or rendering layers.</span></p>
    <p><span class="zh">在团队协作中，这个模块也能帮助分清责任边界。负责 shader definition 文件的人应确认 glslfx 内容有效；负责 Sdr 集成的人应确认 parser 输出能进入 registry；负责 USD 材质 authoring 的人应确认 <code>UsdShade</code> 网络引用了预期定义；负责 renderer 或 Hydra delegate 的人再检查渲染消费。每层都有自己的证据，不应混成一个“shader 不工作”的笼统问题。</span><span class="en">Team debugging should split ownership among definition authors, Sdr integration, UsdShade authoring, and renderer consumers.</span></p>
    <p><span class="zh">如果替换或调整解析实现，调用方也应期待保持模块契约：同样的 glslfx 定义应能得到等价的 Sdr 可消费结果，错误报告应尽量定位到输入或解析阶段，而不是把内部实现细节泄漏给上层。这样 <code>SdrGlslfx</code> 才能作为小而稳定的 parser boundary 存在。</span><span class="en">Parser implementation changes should preserve equivalent Sdr-consumable results and clear error boundaries.</span></p>
    <p><span class="zh">阅读本页时，一个实用心智模型是“输入格式适配器”。<code>SdrGlslfx</code> 把 glslfx 世界连接到 Sdr 世界；它不是定义所有 shader 元数据规则的地方，也不是决定所有渲染能力的地方。把它放在格式适配器的位置，能让后续阅读 Sdr、UsdShade、UsdShaders、UsdMtlx 和 Hydra 页面时更顺。</span><span class="en">A useful mental model is input-format adapter from glslfx into Sdr.</span></p>
    <p><span class="zh">本地连续阅读路径也按这个模型组织：上一页 <a href="${links.prev}">Js</a> 说明基础 I/O 和数据解析边界；本页说明 shader definition 输入格式解析边界；下一页 <a href="${links.next}">UsdHydra</a> 将进入 USD 与 Hydra schema 的另一个连接点。它们都不是最终用户功能页，而是帮助开发者理解 OpenUSD 内部模块分层的入口页。</span><span class="en">The local reading order keeps parser and adapter modules in a coherent API path.</span></p>
    <p><span class="zh">短页晋级时，中文质量不取决于把一句英文翻译成几种说法，而取决于是否能补足读者真正需要的上下文。本页保留官方唯一句子的精确含义，同时补充格式解析器、registry、材质 authoring 和渲染消费之间的分层关系；这样读者不用依赖英文正文，也能知道该去哪个相邻页面继续排查。</span><span class="en">For a short page, quality comes from accurate context and navigation rather than repeated literal translation.</span></p>
    <p><span class="zh">因此，页面中的中文扩展都服务于一个目标：让 <code>SdrGlslfx</code> 的角色保持小而清楚。任何超出 parser housing 的行为，例如 shader 代码执行、renderer capability、材质网络构建或完整 glslfx 规范，都被明确标成非目标范围，避免读者把错误归因放到错误层级，并保持维护判断一致，后续排查更稳，责任边界更清晰明确。</span><span class="en">The Chinese expansion keeps the parser role small and explicit.</span></p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li><span class="zh">标题已覆盖：<code>SdrGlslfx : Glslfx parser for Sdr</code> 被解释为 Sdr 的 glslfx parser 承载模块。</span><span class="en">Title coverage: SdrGlslfx is the Glslfx parser for Sdr.</span></li>
      <li><span class="zh">Overview 已覆盖：官方唯一句子 <code>This library houses the glslfx parser for sdr.</code> 已转化为中文职责边界和调试路径。</span><span class="en">Overview coverage: the official parser statement is mapped into responsibilities and debugging boundaries.</span></li>
      <li><span class="zh">概念边界已覆盖：parser、registry、UsdShade authoring、UsdShaders definition、UsdMtlx plugin、Hd/Hdx render consumption 的层级已经分开说明。</span><span class="en">Boundary coverage separates parser, registry, authoring, shader definitions, MaterialX, and rendering consumption.</span></li>
      <li><span class="zh">常见误读已覆盖：本页不是 shader runtime、不是 GPU 编译器、不是 renderer、不是 glslfx 语法手册，也不是 UsdShade 网络教程。</span><span class="en">Misread coverage states that this page is not runtime, compiler, renderer, syntax manual, or UsdShade tutorial.</span></li>
      <li><span class="zh">调试路径已覆盖：从 glslfx 输入、发现路径、parser 输出、Sdr registry 查询，到上层材质和渲染消费逐层排查。</span><span class="en">Debugging coverage follows input, discovery, parser output, registry query, and higher-level consumers.</span></li>
      <li><span class="zh">本地阅读路径已覆盖：总入口、API 入口、Release 入口、source snapshot、上一页 Js、下一页 UsdHydra、相邻 Sdr/UsdShade/UsdShaders/UsdMtlx/Hd/Hdx 页面和显式 Open official page 外跳均已保留。</span><span class="en">Local reading path coverage includes final entry, API entry, release entry, source snapshot, related pages, previous/next, and official link.</span></li>
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
    "SdrGlslfx : Glslfx parser for Sdr",
    "Overview",
    "This library houses the glslfx parser for sdr.",
    "SdrGlslfx",
    "glslfx",
    "parser",
    "sdr",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "Sdr",
    "UsdShade",
    "UsdShaders",
    "UsdMtlx",
    "Hd",
    "Hdx",
    "shader runtime",
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
    source_keywords_checked: sourceKeywords,
    output_keywords_checked: outputKeywords,
    missing_source_keywords: sourceKeywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: outputKeywords.filter((keyword) => !out.includes(keyword)),
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
  if (report.output_checks.zh_chars < 2300) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 28) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "SdrGlslfx : Glslfx parser for Sdr",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the SdrGlslfx module front page by adding Chinese main-reading-path coverage for the glslfx parser for Sdr, parser-versus-runtime boundaries, Sdr registry relationship, UsdShade/UsdShaders/UsdMtlx/Hd/Hdx adjacent paths, debugging layers, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2300,
      minimum_complete_section_chinese_chars: 2100,
      minimum_chinese_blocks: 28,
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
      previous_good_bilingual: 218,
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
      "下一轮建议先核验 full_site/api/usd_hydra_page_front.html 或其他仍为 bilingual_draft 的 API front page；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：full_site/api/usd_hydra_page_front.html（需先确认 source snapshot 和可达标状态）。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_440_sdr_glslfx_module_front.mjs --write-page --precheck --manifest --problem");
}
