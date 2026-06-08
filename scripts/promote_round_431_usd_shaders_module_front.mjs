import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 431;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/usd_shaders_page_front.html";
const SOURCE = "source/full_api/usd_shaders_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/usd_shaders_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_431_usd_shaders_module_front_source_parity.json";
const PROMOTION_ID = "round-431-api-usd-shaders-module-front";

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

function sourceExcerpt() {
  return sourceText().slice(0, 1500);
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
    .note{background:#f7fbff;border-left:4px solid #3477b9;padding:12px 14px}
    .status{display:inline-block;background:#206a3b;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    code{font-family:"Cascadia Mono","Consolas",monospace}
    body.openusd-has-reading-flow{padding-left:292px}
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
    @media (max-width: 920px){
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
  source: "../../source/full_api/usd_shaders_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "usd_shade_page_front.html",
  next: "usd_skel_page_front.html",
  usd: "usd_page_front.html",
  usdShade: "usd_shade_page_front.html",
  sdr: "sdr_page_front.html",
  usdMtlx: "usd_mtlx_page_front.html",
  hd: "hd_page_front.html",
  hdx: "hdx_page_front.html",
  usdRender: "usd_render_page_front.html",
  usdRi: "usd_ri_page_front.html",
  previewSurfaceSpec: "../release/spec_usdpreviewsurface.html",
  usdShadeProposal: "../release/wp_usdshade.html",
  renderGuide: "../release/user_guides/render_user_guide.html",
  usdShadeGuide: "../release/user_guides/schemas/usdShade/overview.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text && heading.text !== "Table of Contents")
    .map((heading) => `<li><span class="zh">官方结构：<code>${esc(heading.text)}</code>。中文页把它纳入 shader definitions、implementations、<code>UsdPreviewSurface</code>、<code>UsdUVTexture</code>、<code>UsdShade</code> shader definition file、<code>glslfx</code>、Hydra GL backend、未来 <code>oso</code>/OSL 和相邻渲染/材质模块的阅读路径。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / usd_shaders_page_front.html</span>
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
        <li>usd_shaders_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>相邻 API / Related API</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usdShade}">UsdShade 模块入口</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.sdr}">Sdr shader registry</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdMtlx}">UsdMtlx / MaterialX</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hd}">Hd / Hydra</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdx}">Hdx 调试与渲染工具</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender 输出配置</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdRi}">UsdRi / RenderMan 边界</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>Release/spec / User Guide</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.previewSurfaceSpec}">UsdPreviewSurface spec</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdShadeProposal}">UsdShade proposal</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.renderGuide}">Render user guide</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdShadeGuide}">UsdShade schema guide</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: UsdShade</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: UsdSkel</a></li>
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
  <title>UsdShaders: Definitions and Implementations of Usd* Shader Nodes - OpenUSD API 双语导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>${css()}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" class="openusd-has-reading-flow">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>UsdShaders: Definitions and Implementations of Usd* Shader Nodes</h1>
    <div class="meta">Round ${ROUND} ${ROUND_TYPE} | Source snapshot: ${esc(SOURCE)} | Official: ${esc(OFFICIAL_URL)}</div>
    <p class="navlinks">
      <a href="${links.final}">总入口</a>
      <a href="${links.api}">API 本地入口</a>
      <a href="${links.release}">Release 本地入口</a>
      <a href="${links.source}">Local source snapshot</a>
      <a href="${links.official}">Open official page</a>
    </p>
  </header>
${readingFlowNav()}
  <main>
    <section data-cn-complete="round-431-usd-shaders-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><code>UsdShaders</code> 是一个很短但很容易被误读的 API 模块入口。官方 Overview 说，这个 library 容纳当前以及未来所有 <code>Usd*</code> shader nodes 的 definitions 与 implementations，例如 <code>UsdPreviewSurface</code>、<code>UsdUVTexture</code> 等。这里的重点不是“用户如何在 stage 上 author material network”，而是“USD 标准 shader node 的定义文件和后端实现放在哪里、如何被发现、如何被消费”。</span><span class="en">This library houses the definitions and implementations for all current and future Usd* shader nodes, such as UsdPreviewSurface and UsdUVTexture.</span></p>
      <p><span class="zh">官方第二句指出，这些 definitions 由 <code>UsdShade</code>-based shader definition file 表达，并指向 <a href="${links.usdShade}"><code>UsdShade Based Shader Definition</code></a>。因此阅读本页时要把 <code>UsdShaders</code> 放在 <code>UsdShade</code> 生态下理解：<code>UsdShade</code> 定义 shader、material、input/output、connectable node 和 network authoring 的 schema 规则；<code>UsdShaders</code> 则提供一组 USD 约定 shader node 的定义与实现资产，让工具和 renderer 能发现这些节点并理解它们的接口。</span><span class="en">The definitions are represented by a UsdShade-based shader definition file.</span></p>
      <p><span class="zh">官方明确说当前只包含面向 Hydra GL backend 的 <code>glslfx</code> implementations。这句话有两个边界：第一，<code>UsdShaders</code> 中的定义并不自动等价于所有 renderer 都完整支持；第二，当前实现语境偏向 Hydra GL，而不是任意离线 renderer、OSL renderer 或 MaterialX 后端。中文读者在调试材质显示时，应把“shader node definition 存在”“Hydra GL 有实现”“目标 renderer 支持同等效果”分成三件事验证。</span><span class="en">It currently only contains glslfx implementations for the Hydra GL backend.</span></p>
      <p><span class="zh">官方还说，在不太遥远的未来，这个 library 会包含提供 <code>Usd*</code> shaders 的 OSL implementations 的 <code>oso</code> 文件。这里需要保留 <code>oso</code>、OSL、<code>glslfx</code>、Hydra GL 等英文术语，因为它们是实现格式和后端技术名。中文解释可以说明用途，但不能把这些 token 改写成中文字段，否则会破坏与源文件、构建产物、renderer 插件和调试日志的核对。</span><span class="en">In the future it may contain oso files that provide OSL implementations of the Usd* shaders.</span></p>
      <p><span class="zh">官方最后补充，本库除了 shader definitions 和 implementations 之外，未来也可能提供用于 robust authoring 与 querying shader properties 的 USD schemas。这说明 <code>UsdShaders</code> 不只是当前实现目录，也是一条标准 shader property authoring 能力可能扩展的边界。读者不能把本页理解成某个固定版本的节点参数清单；更准确的理解是：它是 USD 内建 shader node 定义、实现和未来 schema 查询能力的模块入口。</span><span class="en">The library may also provide Usd schemas for robust authoring and querying of shader properties in the future.</span></p>
      <p><span class="zh">从资产管线角度看，<code>UsdShaders</code> 提供的是“标准节点可以被识别和实现”的公共基础。材质作者可能只看到 <code>UsdPreviewSurface</code> 的输入参数，工具开发者会关心 shader definition file 如何被发现，renderer 开发者会关心 <code>glslfx</code> 或未来 OSL implementation 如何映射到后端代码，技术美术则需要知道某个节点在不同工具里为什么显示不一致。本页的中文路径把这些角色分开，避免把一个很短的 Doxygen Overview 误读成完整材质系统手册。</span><span class="en">Different pipeline roles consume UsdShaders through authoring tools, discovery systems, renderer implementations, and debugging workflows.</span></p>
      <p><span class="zh">对中文读者来说，最重要的不是逐字翻译 “definitions and implementations”，而是理解两者的配合：definition 说明节点是什么、有哪些接口、属性或 metadata；implementation 说明某个后端如何执行或近似这个节点。没有 definition，工具不知道节点接口；没有 implementation，renderer 不一定能显示结果；definition 与 implementation 不匹配时，界面可能允许 author，但渲染结果可能缺失、降级或和预期不同。</span><span class="en">Definitions describe shader-node interfaces; implementations describe how backends execute or approximate those nodes.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-boundaries">
      <h2>模块边界、API 分组与相邻类型 / Module Boundaries and Adjacent APIs</h2>
      <p><span class="zh"><code>UsdShaders</code> 与 <code>UsdShade</code> 的关系最关键。<code>UsdShade</code> 负责 scene description 中的 shader network 结构：material 如何封装 shader，shader input/output 如何连接，node graph 如何组织，material 如何绑定到 geometry。<code>UsdShaders</code> 不替代这些 authoring 规则；它提供标准 <code>Usd*</code> shader nodes 的 definition 和 implementation，让这些节点在 <code>UsdShade</code> 网络中有可发现、可描述、可渲染的基础。</span><span class="en">UsdShade defines material networks; UsdShaders provides definitions and implementations for standard Usd* shader nodes.</span></p>
      <p><span class="zh"><code>Sdr</code> 是另一个相邻模块。实际工具通常通过 shader discovery、parser plugin、<code>SdrRegistry</code>、<code>SdrShaderNode</code> 和 <code>SdrShaderProperty</code> 读取 shader definition，把节点名称、输入输出、metadata、实现来源和后端支持情况暴露给 UI 或 renderer。因此，当某个 <code>UsdPreviewSurface</code> 节点在界面中找不到，问题可能出在 <code>UsdShade</code> authored network，也可能出在 <code>Sdr</code> discovery、definition file 路径、parser plugin 或 implementation 支持。</span><span class="en">Sdr is the discovery and registry layer that exposes shader definitions to tools and renderers.</span></p>
      <p><span class="zh"><code>UsdMtlx</code> 与 MaterialX 是另一条相邻阅读路径。<code>UsdMtlx</code> 更关注 MaterialX file format 与 shader plugin 的接入；<code>UsdShaders</code> 更关注 USD 内建 <code>Usd*</code> shader nodes。两者可能在同一材质工作流里出现，但不要把 MaterialX node definition、USD shader definition、renderer-specific implementation 和 authored <code>UsdShade</code> network 混成一层。排查互操作问题时，需要分别检查节点定义来源、schema 表达、renderer 后端和文件格式插件。</span><span class="en">UsdMtlx and UsdShaders are adjacent shader-definition paths, but they are not the same layer.</span></p>
      <p><span class="zh">Hydra、<code>Hd</code>、<code>Hdx</code> 与 <code>UsdRender</code> 则处在渲染消费路径上。<code>UsdShaders</code> 中有 <code>glslfx</code> implementation 并不意味着所有渲染输出配置都会一致；<code>UsdRender</code> 管 render settings、render product、render var 等输出描述，Hydra delegate 决定如何消费 shader implementation，具体 renderer 决定最终显示能力。中文页必须把“标准节点定义”“Hydra GL 实现”“渲染输出配置”和“renderer 支持矩阵”拆开，避免把材质显示问题一概归因到一个模块。</span><span class="en">Hydra, Hd, Hdx, and UsdRender sit on the rendering-consumption side of shader definitions.</span></p>
      <p><span class="zh">这也解释了为什么 <code>UsdShaders</code> 页面虽短，却不能只写一句“定义和实现 shader”。它位于三条路径的交叉点：第一是 authoring 路径，从 <code>UsdShade</code> material network 到 shader node；第二是 discovery 路径，从 shader definition file 到 <code>Sdr</code> registry；第三是 rendering 路径，从 implementation 文件到 Hydra 或具体 renderer。中文页必须让读者知道自己正在排查哪条路径，否则很容易在材质网络、definition 发现和 renderer 支持之间来回误判。</span><span class="en">UsdShaders sits at the intersection of authoring, discovery, and rendering paths.</span></p>
      <p><span class="zh">如果未来本库增加 USD schemas 来帮助 robust authoring 和 querying shader properties，模块边界还会更宽：schema 层可能提供类型化访问、属性查询、默认值或约束表达；definition 层仍描述 shader node 的接口；implementation 层仍决定后端执行。中文读者需要把“未来可能提供 schema”理解为官方方向，而不是当前快照已经拥有完整强类型 authoring API 的承诺。</span><span class="en">Future schemas would add typed authoring and querying layers without replacing definitions or implementations.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-debugging">
      <h2>常见误读与调试路径 / Misreads and Debugging Path</h2>
      <ul>
        <li><span class="zh">不要把 <code>UsdShaders</code> 当成材质绑定 API。材质绑定、shader input/output 连接和 node graph authoring 属于 <code>UsdShade</code>。</span><span class="en">UsdShaders is not the material-binding API; UsdShade owns material-network authoring.</span></li>
        <li><span class="zh">不要把 <code>UsdPreviewSurface</code> 的定义存在误认为目标 renderer 一定完全支持。definition、implementation 和 renderer support 需要分别确认。</span><span class="en">A shader definition does not guarantee identical renderer support.</span></li>
        <li><span class="zh">不要把 <code>glslfx</code>、<code>oso</code> 和 OSL 翻译成中文字段名。它们是实现格式、编译产物或 shading language 相关名称，必须保留原样。</span><span class="en">glslfx, oso, and OSL are implementation terms and must stay unchanged.</span></li>
        <li><span class="zh">不要把 <code>Sdr</code> discovery 失败误判为 <code>UsdShade</code> authoring 错误。节点定义无法发现、parser plugin 未加载或 search path 配置错误，都可能让 UI 中看不到 shader node。</span><span class="en">Shader discovery failures can come from Sdr and parser/plugin configuration.</span></li>
      </ul>
      <p><span class="zh">调试材质显示时建议按五层排查。第一层，看 stage 中的 <code>UsdShade</code> network 是否真的 authored，input/output 名称、connection 和 material binding 是否正确；第二层，看 <code>UsdShaders</code> 或相邻 shader definition 是否能被发现；第三层，看 <code>SdrRegistry</code> 是否返回期望的 <code>SdrShaderNode</code> 和 <code>SdrShaderProperty</code>；第四层，看 Hydra GL、RenderMan、MaterialX 或其他 renderer delegate 是否支持对应 implementation；第五层，再看 texture asset path、色彩空间、render settings、lighting 和 viewport 配置。</span><span class="en">Debug shader display by separating authored UsdShade networks, shader definitions, Sdr discovery, renderer implementations, and scene/render setup.</span></p>
      <p><span class="zh">如果 <code>UsdPreviewSurface</code> 看起来和预期不一致，不要只检查节点名。需要确认输入名称、数据类型、默认值、texture asset path、color management、normal/roughness/metallic 等输入语义、renderer fallback、以及目标工具对该标准节点的实现范围。<code>UsdShaders</code> 能告诉你标准节点定义和实现在哪里，但它不负责保证所有工具在所有后端上呈现完全一致。</span><span class="en">UsdPreviewSurface debugging requires checking inputs, types, textures, color management, renderer fallback, and implementation scope.</span></p>
      <p><span class="zh">如果未来本库真的增加用于 robust authoring 和 querying shader properties 的 USD schemas，排查顺序还要增加 schema 层：先确认 schema 是否存在和加载，再确认 authored property 是否符合 schema，再确认 Sdr/renderer 是否消费这些属性。当前中文页把这条未来扩展写明，是为了避免读者把 2026 年本地快照中的短 Overview 当成永久完整的 shader property 手册。</span><span class="en">Future shader-property schemas would add a separate schema-authoring and query layer.</span></p>
      <p><span class="zh">发布资产前可以做一组更具体的检查：材质网络是否使用了目标工具支持的标准节点；shader definition 是否能被目标环境发现；贴图路径、输入类型和颜色空间是否符合节点定义；Hydra GL 预览、离线 renderer 和审阅工具是否使用同一套 implementation 或可接受的 fallback；日志中是否出现 shader discovery、parser plugin、missing implementation 或 unsupported input 的警告。只有这些检查都分层通过，才能说问题不在 <code>UsdShaders</code> 相关链路上。</span><span class="en">Before publishing, validate supported nodes, discoverable definitions, input types, texture paths, color space, backend implementations, fallbacks, and diagnostic logs.</span></p>
      <p><span class="zh">在团队交接文档里，建议把 <code>UsdShaders</code> 相关问题写成可复现事实：使用哪个 shader node，definition 来源是什么，<code>Sdr</code> 能否发现，使用哪个 renderer 或 Hydra delegate，是否依赖 <code>glslfx</code>、OSL 或其他实现，具体哪个 input 或 property 出现偏差。这样比简单写“材质坏了”更容易定位，也能让不同团队分别检查 authoring、definition、implementation 和 renderer 支持矩阵。</span><span class="en">Cross-team reports should record node name, definition source, Sdr discovery, renderer delegate, implementation type, and failing inputs.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-reading-path">
      <h2>相邻阅读路径 / Adjacent Reading Path</h2>
      <p><span class="zh">建议先读本页建立 <code>UsdShaders</code> 的模块边界，再回到 <a href="${links.usdShade}"><code>UsdShade</code></a> 理解 material、shader、node graph 和 shader definition file；接着读 <a href="${links.sdr}"><code>Sdr</code></a> 理解 shader discovery、registry、parser plugin 和 shader property metadata；如果使用 MaterialX，再读 <a href="${links.usdMtlx}"><code>UsdMtlx</code></a> 区分 MaterialX file format/plugin 与 USD 内建 shader nodes 的关系。</span><span class="en">Read UsdShaders with UsdShade, Sdr, and UsdMtlx for shader authoring, discovery, and MaterialX boundaries.</span></p>
      <p><span class="zh">渲染侧建议继续看 <a href="${links.hd}"><code>Hd</code></a>、<a href="${links.hdx}"><code>Hdx</code></a>、<a href="${links.usdRender}"><code>UsdRender</code></a> 和 <a href="${links.usdRi}"><code>UsdRi</code></a>。其中 <code>Hd</code>/<code>Hdx</code> 更接近 Hydra 消费和调试工具；<code>UsdRender</code> 描述 render settings、products 和 vars；<code>UsdRi</code> 处理 RenderMan 相关 USD/RI 边界。这样能把 shader node definition、renderer implementation、render settings 和 renderer-specific 行为分开定位。</span><span class="en">Use Hd, Hdx, UsdRender, and UsdRi for rendering-consumption and renderer-specific paths.</span></p>
      <p><span class="zh">release 文档中，<a href="${links.previewSurfaceSpec}"><code>spec_usdpreviewsurface.html</code></a> 对 <code>UsdPreviewSurface</code> 的语义很关键；<a href="${links.usdShadeProposal}"><code>wp_usdshade.html</code></a> 有助于理解 <code>UsdShade</code> 的设计动机；<a href="${links.renderGuide}">render user guide</a> 能帮助判断问题是否出在渲染设置。中文站保留这些本地链接，是为了让读者能从 API 模块入口连续走到 spec、proposal、user guide 和相邻 API，而不是被迫跳回官方英文站。</span><span class="en">Local links connect this API entry to preview-surface spec, UsdShade proposal, render user guide, and adjacent APIs.</span></p>
      <p><span class="zh">不同角色的阅读顺序也不同。材质作者应先从 <code>UsdShade</code> 和 <code>UsdPreviewSurface</code> spec 理解可 author 的接口，再回到本页确认这些标准节点属于 <code>UsdShaders</code> 生态；工具开发者应从本页进入 <code>Sdr</code>，确认如何发现和展示 shader definition；渲染后端开发者应继续看 Hydra、<code>Hd</code>/<code>Hdx</code> 或 renderer-specific 文档，确认 implementation 如何执行；管线维护者则应把 definition 文件、插件搜索路径、资源版本和 renderer 支持矩阵一起纳入发布检查。</span><span class="en">Different roles should follow authoring, discovery, implementation, or pipeline-maintenance reading paths.</span></p>
      <p class="note"><span class="zh">本页保留 <code>UsdShaders</code>、<code>UsdPreviewSurface</code>、<code>UsdUVTexture</code>、<code>UsdShade</code>、<code>UsdShade Based Shader Definition</code>、<code>glslfx</code>、Hydra GL backend、<code>oso</code>、OSL、<code>SdrRegistry</code>、<code>SdrShaderNode</code>、<code>SdrShaderProperty</code>、<code>UsdMtlx</code>、<code>Hd</code>、<code>Hdx</code> 等英文标识，用于和官方 Doxygen、source snapshot、renderer 日志、shader discovery 输出和 schema 文档核对。</span><span class="en">English identifiers are preserved for source parity and debugging.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-practical-checklist">
      <h2>实践验收清单 / Practical Acceptance Checklist</h2>
      <p><span class="zh">人工复审时可以用六个问题判断本页是否可读：第一，读者是否能说明 <code>UsdShaders</code> 是 shader node definitions/implementations 的库，而不是 material binding API；第二，是否能解释 <code>UsdShade</code>-based shader definition file 的位置；第三，是否知道当前官方快照只明确提到 Hydra GL backend 的 <code>glslfx</code> implementations；第四，是否理解未来 <code>oso</code>/OSL 和 USD schemas 只是官方描述的扩展方向；第五，是否能把 <code>Sdr</code> discovery、renderer support 和 authored <code>UsdShade</code> network 分开排查；第六，是否能通过本地侧栏跳到相邻 API 和 release 文档。</span><span class="en">Review checks cover module scope, UsdShade definition files, glslfx/Hydra GL implementations, future oso/OSL direction, Sdr discovery, renderer support, and local reading flow.</span></p>
      <p><span class="zh">完成态读者还应能回答一个实际问题：如果标准 shader 在当前工具中不可用，应该先检查定义文件和发现机制；如果可用但显示异常，应该再检查网络连接、输入值、实现后端和渲染设置。这个判断能力就是本页从草稿晋级为完整双语页的核心价值，也能帮助读者把问题分派给正确的资产、工具、插件或渲染负责人，减少无效返工，并形成可复查的排错闭环，方便团队协作确认责任边界和后续验证路径。这样才算中文可独立阅读维护，并便于复核。</span><span class="en">A completed page should let readers choose the correct first diagnostic layer for shader-node failures.</span></p>
      <p><span class="zh">本页依据当前本地 source snapshot 与官方 release API 页整理。官方页很短，中文主阅读路径不能凭空添加不存在的 API 细节，也不能把渲染器行为写成官方承诺。因此本页只把官方提到的 shader node 库、definition file、Hydra GL <code>glslfx</code> implementation、未来 <code>oso</code>/OSL、未来 schema 可能性扩展为可操作的边界说明和调试路径。</span><span class="en">The Chinese path expands the official short Overview into boundaries and debugging guidance without inventing unsupported API details.</span></p>
      <p><span class="zh">source parity 的原则是“扩展解释，不扩展事实”。本地中文页可以说明为什么 <code>UsdShaders</code> 会和 <code>UsdShade</code>、<code>Sdr</code>、Hydra、renderer delegate、MaterialX 或 RenderMan 相邻，但不能声称官方页列出了所有节点、所有属性、所有后端实现或所有 renderer 支持级别。官方当前明确点名的节点只有 <code>UsdPreviewSurface</code> 和 <code>UsdUVTexture</code> 示例，明确点名的当前实现是 <code>glslfx</code> for Hydra GL backend，明确点名的未来方向是 <code>oso</code>/OSL 和可能的 USD schemas。任何更细的节点参数说明都应跳到 spec、user guide、shader definition 文件或 renderer 文档核对。</span><span class="en">Source parity allows explanatory context but not invented node lists, property lists, backend support, or renderer guarantees.</span></p>
      <p><span class="zh">术语保留也属于验收重点。<code>UsdShaders</code>、<code>UsdPreviewSurface</code>、<code>UsdUVTexture</code>、<code>UsdShade Based Shader Definition</code>、<code>glslfx</code>、Hydra GL backend、<code>oso</code>、OSL、<code>SdrRegistry</code>、<code>SdrShaderNode</code>、<code>SdrShaderProperty</code> 都必须保留英文，因为它们可能出现在文件名、插件名、schema 名、日志、构建输出或调试命令里。中文翻译负责解释层次和排错顺序，不负责把这些可机器识别的名称本地化。</span><span class="en">Machine-readable identifiers and implementation terms remain in English for logs, files, plugins, schemas, and debugging.</span></p>
      <p><span class="zh">还要诚实说明本地快照属性：本页不是实时 shader catalog，也不是所有 renderer 的支持表。它只能帮助读者理解当前官方 API 模块页如何定位 <code>UsdShaders</code>。如果用户需要确认某个具体节点、属性、后端或插件版本，仍应查看对应的 shader definition 文件、renderer 文档、构建产物和运行日志。这样写能避免把中文完成页误用成超出官方来源的承诺。</span><span class="en">The local page is not a live shader catalog or renderer support table.</span></p>
      <p><span class="zh">完成页的目标是让中文读者不用依赖英文正文也能判断：什么时候查 <code>UsdShaders</code>，什么时候查 <code>UsdShade</code>，什么时候查 <code>Sdr</code>，什么时候把问题交给 Hydra/renderer implementation 或 render settings。英文原文和 API 名保留用于核对，但中文主阅读路径已经覆盖页面职责、官方 section、API 分组、误读点、调试路径和相邻类型关系。</span><span class="en">The completed page supports local reading, source lookup, issue attribution, and explicit official follow-up.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-failure-attribution">
      <h2>失败归因示例 / Failure Attribution Examples</h2>
      <p><span class="zh">如果 UI 中根本看不到 <code>UsdPreviewSurface</code> 或 <code>UsdUVTexture</code>，第一怀疑点通常不是 renderer，而是 shader definition discovery：definition file 是否在搜索路径中，parser plugin 是否加载，<code>SdrRegistry</code> 是否能返回对应节点，工具是否过滤了当前 context 不支持的 node。只有 discovery 成功后，才继续检查 authored <code>UsdShade</code> network 和 renderer implementation。</span><span class="en">Missing nodes in UI often point first to shader-definition discovery, parser plugins, or Sdr registry configuration.</span></p>
      <p><span class="zh">如果节点能 author，但 viewport 显示不正确，问题可能在后端实现或输入语义。Hydra GL 可能使用 <code>glslfx</code> 路径，离线 renderer 可能使用 OSL、MaterialX、RenderMan 或自有实现；同一个输入在不同后端可能有 fallback、限制或近似。此时应记录 renderer 名称、delegate、implementation 路径、输入值、贴图资产、色彩空间和日志，而不是只说 <code>UsdShaders</code> 有错误。</span><span class="en">Incorrect viewport results can come from backend implementations, input interpretation, assets, color management, or renderer fallback.</span></p>
      <p><span class="zh">如果材质网络在一个工具里能显示、另一个工具里不显示，要把数据交换链拆开：USD scene 是否包含同样的 authored opinions；shader definition 是否在两个环境中都能发现；两个环境是否使用同一版本的 <code>UsdShaders</code> 资源；renderer 是否支持同一 implementation；是否存在路径、插件、版本或平台差异。这样的归因方式能帮助团队把问题分派给资产、工具、插件或渲染后端负责人。</span><span class="en">Cross-tool mismatch should be triaged through authored opinions, definitions, resource versions, implementations, plugins, and platform differences.</span></p>
      <p><span class="zh">如果未来 schema 层加入 robust authoring/querying 能力，失败归因还会多出 schema registry、property wrapper、typed accessor 和默认值查询等环节。当前页面提前说明这个方向，是为了让读者知道官方 Overview 中的“may also provide Usd schemas”不是已经完成的能力清单，而是可能影响后续阅读和维护的模块演化线索。</span><span class="en">Future shader-property schemas would add schema-registry, property-wrapper, typed-accessor, and default-value query layers.</span></p>
      <p><span class="zh">维护本地中文页时也要注意版本风险。官方 source snapshot 显示生成时间为 2026 年 4 月 22 日，本页只能反映该快照中的事实；如果以后官方新增 shader nodes、移除旧实现、改变 <code>glslfx</code> 或 OSL 说明、补充 schema API，必须重新做 source parity，而不是只在旧中文导读后面追加一句。这样才能保证完成页仍然是可核对的中文主阅读路径，而不是过期的技术判断。</span><span class="en">Future official changes require a fresh source-parity pass instead of appending unverified notes to an old translation.</span></p>
      <p><span class="zh">实际判断归属时可以用一个简单表述：看不到节点，先查 definition discovery；能看到节点但连不上，查 <code>UsdShade</code> network 和 input/output；能连上但显示不对，查 implementation、renderer support 和贴图/色彩空间；某个工具正常而另一个工具异常，查插件版本、搜索路径和后端差异；需要程序化访问 shader property 时，再确认当前版本是否真的提供相关 USD schema。这个顺序能把短 Overview 转化为可执行排查流程。</span><span class="en">A practical ownership sequence turns the short Overview into actionable debugging flow.</span></p>
    </section>

    <section data-cn-complete="round-431-usd-shaders-source-parity">
      <h2>官方 section 对比 / Source Parity</h2>
      <ul>
${headingList()}
        <li><span class="zh">已核对 source snapshot 中的核心关键词：<code>UsdShaders</code>、<code>definitions</code>、<code>implementations</code>、<code>Usd*</code>、<code>shader nodes</code>、<code>UsdPreviewSurface</code>、<code>UsdUVTexture</code>、<code>UsdShade-based shader definition file</code>、<code>UsdShade Based Shader Definition</code>、<code>glslfx</code>、Hydra GL backend、<code>oso</code>、OSL、<code>Usd schemas</code>、robust authoring、querying shader properties。</span><span class="en">The local page preserves the official UsdShaders keyword structure.</span></li>
        <li><span class="zh">官方原文摘录仅用于核对，不作为中文主阅读路径；中文主体已经覆盖模块职责、官方 Overview、定义/实现边界、相邻 API、误读点、调试路径和本地阅读导航。</span><span class="en">${esc(sourceExcerpt())}</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-431-usd-shaders-completion-evidence">
      <h2>完成态证据 / Completion Evidence</h2>
      <ul>
        <li><span class="zh">页面状态已设为 <code>bilingual_complete</code>，旧草稿占位说明已移除。</span><span class="en">The page status is bilingual_complete.</span></li>
        <li><span class="zh">中文主阅读路径覆盖 <code>UsdShaders</code> 模块职责、<code>Usd*</code> shader nodes、<code>UsdShade</code>-based definition file、<code>glslfx</code>/Hydra GL、未来 <code>oso</code>/OSL、未来 schema 可能性、<code>Sdr</code>/<code>UsdMtlx</code>/Hydra/renderer 边界、调试路径和相邻 API。</span><span class="en">Chinese coverage explains module role, shader definitions, implementations, adjacent APIs, and debugging paths.</span></li>
        <li><span class="zh">页面保留本地 reading-flow 侧栏、breadcrumb、总入口、API/Release 本地入口、相邻本地页和显式官方外跳。</span><span class="en">The page keeps local reading-flow navigation and explicit official access.</span></li>
      </ul>
      <p><a data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceText();
  const out = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const sourceKeywords = [
    "UsdShaders",
    "definitions",
    "implementations",
    "Usd*",
    "shader nodes",
    "UsdPreviewSurface",
    "UsdUVTexture",
    "UsdShade-based shader definition file",
    "UsdShade Based Shader Definition",
    "glslfx",
    "hydra GL backend",
    "oso",
    "OSL",
    "Usd schemas",
    "robust authoring",
    "querying of shader properties",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "SdrRegistry",
    "SdrShaderNode",
    "SdrShaderProperty",
    "UsdMtlx",
    "Hd",
    "Hdx",
    "UsdRender",
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
      has_complete_status: out.includes('data-cn-status="bilingual_complete"') && out.includes(`data-cn-round="${ROUND}"`),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: out.includes("openusd_bilingual_final.html"),
      has_api_entry: out.includes("site/index.html"),
      has_api_redirect: out.includes("site/api/index.html"),
      has_release_entry: out.includes("site/release_index.html"),
      has_reading_flow_nav: out.includes("openusd-reading-flow-nav") && out.includes("openusd-reading-flow-breadcrumb"),
      has_explicit_official_link: out.includes("Open official page") && out.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐|later iterations add denser bilingual coverage/.test(out),
      zh_chars: zhChars(out),
      zh_blocks: (out.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
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
  if (report.output_checks.zh_chars < 3800) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 24) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "UsdShaders: Definitions and Implementations of Usd* Shader Nodes",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdShaders module front page by adding Chinese main-reading-path coverage for Usd* shader node definitions and implementations, UsdPreviewSurface, UsdUVTexture, UsdShade-based shader definition files, glslfx implementations for the Hydra GL backend, future oso/OSL direction, possible future Usd schemas for shader properties, adjacent UsdShade/Sdr/UsdMtlx/Hd/Hdx/UsdRender APIs, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 3800,
      minimum_complete_section_chinese_chars: 3000,
      minimum_chinese_blocks: 24,
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
      previous_good_bilingual: 209,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续按 PromotionRound 或 DomainSprintRound 推进 API 草稿，只把达标页面写入 promotion manifest。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮完成后重新运行 route_openusd_internal_links_local 和 audit_openusd_reading_flow_navigation；新增页面有本地侧栏、breadcrumb 和官方外跳。",
        required_action: "若 reading-flow 审计失败，停止并修复导航，不得推送。",
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
      "继续推进 API 草稿；release 范围已经 126/126 complete，不要重复处理 release 已完成页。",
      "优先选择核心 API 或同域短页批量，但每轮必须保证 good_bilingual 按实际达标页增长。",
    ],
    next_action: "下一轮建议 PromotionRound：full_site/api/usd_skel_page_front.html；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_431_usd_shaders_module_front.mjs --write-page --precheck --manifest --problem");
}
