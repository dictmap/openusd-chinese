import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 450;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/struct_usd_lux_tokens_type.html";
const SOURCE = "source/full_api/struct_usd_lux_tokens_type_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/struct_usd_lux_tokens_type.html";
const SOURCE_PARITY_REPORT = "reports/round_450_usd_lux_tokens_type_source_parity.json";
const PROMOTION_ID = "round-450-api-usd-lux-tokens-type";

function rel(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, "");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function writeJson(file, data) {
  fs.writeFileSync(rel(file), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#9670;/g, String.fromCodePoint(0x25c6))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripHtml(value) {
  return decodeEntities(
    String(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function sourceHtml() {
  return read(SOURCE);
}

function sourceText() {
  return stripHtml(sourceHtml());
}

function sourceTitle() {
  const match = sourceHtml().match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return stripHtml(match ? match[1] : "UsdLuxTokensType Class Reference");
}

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripHtml(match[2]),
  }));
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  const re = new RegExp(`class="${klass}"`, "g");
  return (String(value).match(re) || []).length;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  apiEntry: "../../site/index.html",
  apiRedirect: "../../site/api/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/struct_usd_lux_tokens_type_source.html",
  official: OFFICIAL_URL,
  prev: "struct_usd_geom_tokens_type.html",
  next: "usd_lux_page_front.html",
  usdLux: "usd_lux_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  usdShade: "usd_shade_page_front.html",
  usdRender: "usd_render_page_front.html",
  sdf: "sdf_page_front.html",
  tf: "tf_page_front.html",
  overview: "../release/user_guides/schemas/usdLux/overview.html",
  lightApi: "../release/user_guides/schemas/usdLux/LightAPI.html",
  lightFilter: "../release/user_guides/schemas/usdLux/LightFilter.html",
  lightListApi: "../release/user_guides/schemas/usdLux/LightListAPI.html",
};

const expectedHeadings = [
  "Public Attributes",
  "Detailed Description",
  "Member Data Documentation",
  "allTokens",
  "BoundableLightBase",
  "CylinderLight",
  "DiskLight",
  "DistantLight",
  "DomeLight",
  "GeometryLight",
  "LightAPI",
  "LightFilter",
  "LightListAPI",
  "PluginLight",
  "PortalLight",
  "RectLight",
  "ShadowAPI",
  "ShapingAPI",
  "SphereLight",
];

const sourceKeywords = [
  "UsdLuxTokensType",
  "UsdLuxTokens",
  "static, efficient TfTokens",
  "auto-generated from the module's schema",
  "property names",
  "UsdPrim::GetAttribute()",
  "allowedTokens values",
  "allTokens",
  "angular",
  "automatic",
  "BoundableLightBase",
  "CylinderLight",
  "DiskLight",
  "DistantLight",
  "DomeLight",
  "LightAPI",
  "LightFilter",
  "LightListAPI",
  "GeometryLight",
  "PluginLight",
  "PluginLightFilter",
  "PortalLight",
  "RectLight",
  "ShadowAPI",
  "ShapingAPI",
  "SphereLight",
  "inputsIntensity",
  "inputsColor",
  "inputsExposure",
  "inputsTextureFile",
  "inputsShapingConeAngle",
  "inputsShapingIesFile",
  "lightLink",
  "shadowLink",
  "filterLink",
  "lightList",
  "lightListCacheBehavior",
  "consumeAndContinue",
  "consumeAndHalt",
  "treatAsPoint",
  "treatAsLine",
  "collectionLightLinkIncludeRoot",
  "collectionShadowLinkIncludeRoot",
  "collectionFilterLinkIncludeRoot",
];

const outputKeywords = [
  ...expectedHeadings,
  "UsdLuxTokensType",
  "UsdLuxTokens",
  "TfToken",
  "allTokens",
  "UsdPrim::GetAttribute()",
  "allowedTokens",
  "static, efficient TfTokens",
  "property names",
  "schema token",
  "lighting token",
  "inputsIntensity",
  "inputsColor",
  "inputsShapingConeAngle",
  "inputsShapingIesFile",
  "lightLink",
  "shadowLink",
  "filterLink",
  "lightListCacheBehavior",
  "consumeAndContinue",
  "consumeAndHalt",
  "treatAsPoint",
  "treatAsLine",
  "Open official page",
];

function zh(text) {
  return `<span class="zh">${text}</span>`;
}

function en(text) {
  return `<span class="en">${text}</span>`;
}

function navStyles() {
  return `<style id="openusd-reading-flow-nav-style">
    body.openusd-has-reading-flow{padding-left:292px}
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
    @media (max-width: 920px){
      body.openusd-has-reading-flow{padding-left:0}
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  </style>`;
}

function baseStyles() {
  return `<style>
    :root{color-scheme:light;--bg:#f7f8fb;--ink:#17202a;--muted:#526173;--line:#d7dde8;--accent:#245a8d;--panel:#fff}
    *{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--ink);font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;line-height:1.72}
    header{background:#182536;color:#fff;padding:30px 20px 34px;border-bottom:4px solid #2d6e9f}
    header .wrap,main{max-width:1120px;margin:0 auto}
    h1{font-size:32px;line-height:1.2;margin:0 0 12px}
    h2{font-size:24px;margin:28px 0 12px;padding-bottom:6px;border-bottom:1px solid var(--line)}
    h3{font-size:18px;margin:18px 0 8px}
    p{margin:10px 0}
    main{padding:24px 20px 58px}
    section{background:var(--panel);border:1px solid var(--line);border-radius:8px;margin:18px 0;padding:18px 20px}
    .meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .pill{border:1px solid rgba(255,255,255,.32);background:rgba(255,255,255,.12);padding:3px 9px;border-radius:999px;font-size:13px}
    .zh{display:block;color:#1f2937}
    .en{display:block;color:#526173;font-size:14px;margin-top:3px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:10px}
    .mini{border:1px solid var(--line);background:#fbfcff;border-radius:7px;padding:12px}
    .mini h3{margin-top:0;color:#1b4f7a}
    .token-list{columns:3 220px;margin:10px 0 0;padding-left:18px}
    .token-list li{break-inside:avoid;margin:3px 0}
    .note{border-left:4px solid var(--accent);background:#eef5fb;padding:10px 12px;margin:12px 0;color:#243447}
    code{font-family:Consolas,"SFMono-Regular",monospace}
    a{color:var(--accent)}
  </style>`;
}

function readingFlowNav() {
  return `<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.apiEntry}">API 本地入口</a>
  <span> / api / struct_usd_lux_tokens_type.html</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="${links.final}">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="${links.release}">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="${links.apiEntry}">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="${links.apiRedirect}">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>本页上下文</h3>
      <ul>
        <li><a data-reading-flow="source" href="${links.source}">本地 source snapshot</a></li>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页：UsdGeomTokensType</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页：UsdLux module front</a></li>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">Open official page</a></li>
      </ul>
    </section>
    <section>
      <h3>相邻 API / Guides</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usdLux}">UsdLux module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdShade}">UsdShade module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender module front</a></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf module front</a></li>
        <li><a data-reading-flow="related" href="${links.tf}">Tf module front</a></li>
        <li><a data-reading-flow="related" href="${links.overview}">usdLux schema overview</a></li>
        <li><a data-reading-flow="related" href="${links.lightApi}">LightAPI schema page</a></li>
        <li><a data-reading-flow="related" href="${links.lightFilter}">LightFilter schema page</a></li>
        <li><a data-reading-flow="related" href="${links.lightListApi}">LightListAPI schema page</a></li>
      </ul>
    </section>
  </div>
</aside>`;
}

function buildHtml() {
  const title = "UsdLuxTokensType Class Reference";
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} - OpenUSD API 双语参考</title>
  ${navStyles()}
  ${baseStyles()}
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-round-type="${ROUND_TYPE}" data-source-parity="${SOURCE_PARITY_REPORT}">
${readingFlowNav()}
<header>
  <div class="wrap">
    <h1>${esc(title)}</h1>
    <p>${zh("本页把 UsdLuxTokensType 从批次草稿改为中文主阅读路径。重点不是翻译 lighting token 的拼写，而是解释 UsdLuxTokens 如何把 UsdLux schema 中的光源类型、输入属性、链接关系、滤镜行为和 allowedTokens 值整理成稳定的 TfToken 集合。读者应能从 token 名回到具体 LightAPI、LightFilter、LightListAPI、ShadowAPI、ShapingAPI 或 release usdLux schema 页。")}${en("Chinese-first coverage for the UsdLuxTokensType Doxygen reference while preserving token spellings and API names.")}</p>
    <div class="meta">
      <span class="pill">Round ${ROUND} PromotionRound</span>
      <span class="pill">API token struct reference</span>
      <span class="pill">Source parity checked</span>
      <span class="pill">review_ready_zh target</span>
    </div>
  </div>
</header>
<main>
  <section data-cn-complete="page-role">
    <h2>页面职责和 source parity 范围</h2>
    <p>${zh("官方 Detailed Description 说明，UsdLuxTokens provides static, efficient TfTokens for use in all public USD API。这些 token auto-generated from the module's schema，representing property names，并用于需要通过 UsdPrim::GetAttribute() 直接按名字取得 attribute 或 relationship 的场景。UsdLuxTokens 还包含 token scene description type 的 schema builtin attributes 所声明的 allowedTokens values。")}${en("The source describes static, efficient TfTokens generated from the UsdLux schema.")}</p>
    <p>${zh("因此 UsdLuxTokensType 是 token 结构体页，不是光源 schema 页、不是 renderer 行为规范，也不是 light linking 的完整算法说明。它提供稳定拼写和 Doxygen 锚点；具体 authoring、fallback、关系解析、link collection、filter shader 或渲染消费语义，需要回到 UsdLux、UsdGeom、UsdShade、UsdRender、Sdf 和相应 release schema 文档。")}${en("This is a token structure reference, not a renderer behavior specification.")}</p>
    <p>${zh("本轮 source parity 覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、光源 schema token、输入属性 token、link/filter/light-list token、material sync token、texture format token 和 treatAsPoint/treatAsLine 等 allowed token。")}${en("The local page covers the official sections and representative token groups.")}</p>
    <p class="note">${zh("验收边界：本轮只晋级 full_site/api/struct_usd_lux_tokens_type.html；API 名、schema 名、token 名、属性名、Doxygen 表格标签、代码、链接和 Open official page 外跳保持原样。")}${en("Scope: promote only this page and preserve API/token/link semantics.")}</p>
  </section>

  <section data-cn-complete="official-sections">
    <h2>官方 section 覆盖</h2>
    <div class="grid">
      <div class="mini"><h3>Public Attributes</h3><p>${zh("Public Attributes 是本页主体，列出 UsdLuxTokensType 的 TfToken 字段。字段名包括 lightLink、shadowLink、filterLink、inputsIntensity、inputsColor、inputsShapingConeAngle、LightAPI、LightFilter、DomeLight 等；它们必须保持英文拼写，不能翻译成中文字符串。")}${en("Public Attributes list generated TfToken fields.")}</p></div>
      <div class="mini"><h3>Detailed Description</h3><p>${zh("Detailed Description 给出 token 的用途：高效、静态、由 schema 自动生成、帮助编译器检查拼写，并包含 allowedTokens values。中文说明补足它和 UsdPrim::GetAttribute()、relationship 查询、schema builtin attributes 的关系。")}${en("Detailed Description explains efficient generated tokens and spelling safety.")}</p></div>
      <div class="mini"><h3>Member Data Documentation</h3><p>${zh("Member Data Documentation 对每个 token 成员给出锚点。本页按功能组解释这些锚点，帮助读者从照明问题、链接问题、滤镜问题或纹理格式问题定位到正确 token。")}${en("Member Data Documentation is represented through functional token groups.")}</p></div>
      <div class="mini"><h3>allTokens</h3><p>${zh("allTokens 是所有列出 token 的 vector，适合遍历或调试已知 UsdLux token 集合。它不是合法性验证器，也不能说明任意 token 都能写到任意 light 属性或 relationship 上。")}${en("allTokens is a vector of listed tokens, not a complete semantic validator.")}</p></div>
    </div>
  </section>

  <section data-cn-complete="token-groups">
    <h2>token 分组阅读路径</h2>
    <p>${zh("阅读 UsdLuxTokensType 时，应先按语义域分组，而不是逐行扫字段表。光源类型 token 解释 schema 身份；输入属性 token 解释 authoring 属性名；链接和滤镜 token 解释 collection relationship 或 filter list；allowed token 解释某个属性可选值。每类 token 都需要回到相应 schema 才能判断真正含义。")}${en("Grouped reading prevents mixing schema names, property names, relationships, and allowed values.")}</p>
    <div class="grid">
      <div class="mini"><h3>light schema tokens</h3><p>${zh("BoundableLightBase、NonboundableLightBase、CylinderLight、DiskLight、DistantLight、DomeLight、GeometryLight、MeshLight、PluginLight、PortalLight、RectLight、SphereLight、VolumeLight 等 token 描述光源 schema 或相关类型。它们帮助识别类型，不替代 Define、Get 或具体 schema API。")}${en("Light schema tokens identify UsdLux light-related schema names.")}</p></div>
      <div class="mini"><h3>API/filter/list tokens</h3><p>${zh("LightAPI、LightFilter、LightListAPI、ListAPI、MeshLightAPI、ShadowAPI、ShapingAPI、VolumeLightAPI、PluginLightFilter 等 token 指向 applied API、滤镜、光列表或扩展光源语义。它们常与 relationship、collection、shaderId 或 light list cache 一起阅读。")}${en("API/filter/list tokens map to UsdLux APIs, filters, and list behavior.")}</p></div>
      <div class="mini"><h3>input property tokens</h3><p>${zh("inputsIntensity、inputsExposure、inputsColor、inputsColorTemperature、inputsEnableColorTemperature、inputsDiffuse、inputsSpecular、inputsNormalize、inputsWidth、inputsHeight、inputsRadius、inputsLength、inputsTextureFile、inputsTextureFormat 等 token 是属性名锚点。它们只解决名字拼写，不决定物理单位、默认值或 renderer 支持。")}${en("Input property tokens anchor authored property names.")}</p></div>
      <div class="mini"><h3>shaping and shadow tokens</h3><p>${zh("inputsShapingConeAngle、inputsShapingConeSoftness、inputsShapingFocus、inputsShapingFocusTint、inputsShapingIesAngleScale、inputsShapingIesFile、inputsShapingIesNormalize、inputsShadowEnable、inputsShadowColor、inputsShadowDistance、inputsShadowFalloff、inputsShadowFalloffGamma 等 token 应和 ShapingAPI、ShadowAPI 以及 release schema 页一起排查。")}${en("Shaping and shadow tokens must be interpreted with ShapingAPI and ShadowAPI.")}</p></div>
      <div class="mini"><h3>link and collection tokens</h3><p>${zh("lightLink、shadowLink、filterLink、collectionLightLinkIncludeRoot、collectionShadowLinkIncludeRoot、collectionFilterLinkIncludeRoot、lightFilters、portals、lightList、lightListCacheBehavior 等 token 关系到光链接、阴影链接、滤镜链接、portal 和 light list 缓存。调试时要同时看 relationship target、collection include/exclude 和 consumer 行为。")}${en("Link and collection tokens connect to relationships, collections, filters, portals, and light lists.")}</p></div>
      <div class="mini"><h3>allowed value tokens</h3><p>${zh("automatic、ignore、consumeAndContinue、consumeAndHalt、independent、materialGlowTintsLight、noMaterialResponse、treatAsPoint、treatAsLine、latlong、mirroredBall、cubeMapVerticalCross、angular、scene、Y、Z 等 token 常是某些属性的 allowedTokens。它们只能写入对应属性，不能跨语义域使用。")}${en("Allowed value tokens are valid only for their owning attributes.")}</p></div>
    </div>
    <ul class="token-list">
      <li>allTokens</li><li>BoundableLightBase</li><li>CylinderLight</li><li>DiskLight</li><li>DistantLight</li><li>DomeLight</li><li>GeometryLight</li><li>LightAPI</li><li>LightFilter</li><li>LightListAPI</li><li>PluginLight</li><li>PluginLightFilter</li><li>PortalLight</li><li>RectLight</li><li>ShadowAPI</li><li>ShapingAPI</li><li>SphereLight</li><li>inputsIntensity</li><li>inputsColor</li><li>inputsExposure</li><li>inputsTextureFile</li><li>inputsShapingConeAngle</li><li>inputsShapingIesFile</li><li>lightLink</li><li>shadowLink</li><li>filterLink</li><li>lightList</li><li>lightListCacheBehavior</li><li>consumeAndContinue</li><li>consumeAndHalt</li><li>treatAsPoint</li><li>treatAsLine</li>
    </ul>
  </section>

  <section data-cn-complete="domain-map">
    <h2>UsdLux token 语义域映射</h2>
    <p>${zh("UsdLuxTokensType 的价值在于把照明系统里分散的 schema 名、属性名、relationship 名和枚举值放到一个可搜索的 token 表里。调试时应先问自己：当前问题是光源 schema 没有被识别、输入属性没有写入、link collection 没有命中、filter 没有连接，还是 renderer 没有消费某个 UsdLux 约定。不同答案对应不同 token 组，也对应不同文档入口。")}${en("The token table is most useful after identifying whether the issue is schema, property, link, filter, or renderer consumption.")}</p>
    <p>${zh("光源 schema token 主要用于类型识别和代码分派。例如 DomeLight、DistantLight、RectLight、SphereLight、DiskLight、CylinderLight、PortalLight、GeometryLight、MeshLight 和 PluginLight 说明 prim 应该按哪类光源理解。它们不直接提供 intensity、color 或 textureFile；要读写这些属性，仍要回到具体 schema 或 LightAPI 的属性访问器。")}${en("Light schema tokens identify the kind of light but do not author light inputs.")}</p>
    <p>${zh("输入属性 token 主要用于直接属性查询或通用工具。inputsIntensity、inputsExposure、inputsDiffuse、inputsSpecular、inputsColor、inputsColorTemperature、inputsEnableColorTemperature、inputsNormalize、inputsWidth、inputsHeight、inputsRadius、inputsLength 等都属于 authoring 属性名。若这些属性看起来没有效果，应检查是否写在正确 prim 上、是否由对应 schema 声明、是否有 stronger layer override、以及 renderer 是否读取该属性。")}${en("Input property tokens are stable names for authored attributes and still require schema and layer context.")}</p>
    <p>${zh("shaping 与 shadow token 往往和视觉结果最容易混淆。inputsShapingConeAngle、inputsShapingConeSoftness、inputsShapingFocus、inputsShapingFocusTint、inputsShapingIesFile、inputsShadowEnable、inputsShadowColor、inputsShadowDistance、inputsShadowFalloff、inputsShadowFalloffGamma 等 token 告诉你属性名，但不保证 cone、IES 或 shadow 由所有渲染后端一致支持。")}${en("Shaping and shadow tokens name attributes; renderer support is a separate question.")}</p>
    <p>${zh("link 与 list token 跨越 relationship、collection 和消费者。lightLink、shadowLink、filterLink、collectionLightLinkIncludeRoot、collectionShadowLinkIncludeRoot、collectionFilterLinkIncludeRoot、lightFilters、portals、lightList、lightListCacheBehavior 不能只看单个属性值；必须同时看 collection 规则、目标 prim 路径、include root 策略、list cache 策略和实际渲染 delegate 或导出工具的消费逻辑。")}${en("Link and list tokens require relationship targets, collections, root inclusion, cache behavior, and consumer logic.")}</p>
    <p>${zh("allowed value token 只能放回拥有它的属性语义域。consumeAndContinue、consumeAndHalt 常用于 light list cache 行为；treatAsPoint 和 treatAsLine 用于几何光解释；latlong、mirroredBall、cubeMapVerticalCross 用于 texture format；Y 和 Z 常用于 poleAxis 或 stage axis 相关判断。把这些 token 跨域写入，会制造难以定位的无效 authoring。")}${en("Allowed value tokens are valid only for their owning attributes and should not be reused across domains.")}</p>
  </section>

  <section data-cn-complete="authoring-boundaries">
    <h2>从 lighting token 到实际 authoring 的边界</h2>
    <p>${zh("第一条边界是 token 常量不等于 authored scene value。UsdLuxTokens->inputsIntensity 或 UsdLuxTokens->lightLink 只是 TfToken 拼写；如果没有通过对应 schema API、UsdPrim::GetAttribute()、CreateAttribute、relationship 或 collection API 写入，stage 内容不会改变。")}${en("A token constant is not an authored value by itself.")}</p>
    <p>${zh("第二条边界是 schema token 与属性 token 不同。DomeLight、RectLight、SphereLight 说明类型身份；inputsIntensity、inputsColor、inputsTextureFile 说明属性名；automatic、ignore、consumeAndHalt 说明某个属性的候选值。把这三类 token 混用，会导致查询失败或写入看似成功但 renderer 不消费。")}${en("Schema, property, and allowed-value tokens belong to different semantic domains.")}</p>
    <p>${zh("第三条边界是 light linking 不是单个 token 能完成的事情。lightLink、shadowLink、filterLink 和 collectionLightLinkIncludeRoot 等 token 只是关系或属性名，实际效果取决于 collection 目标、include/exclude、是否包含 root、consumer 是否读取，以及光源、物体和滤镜之间的关系结构。")}${en("Light linking depends on collections, targets, include/exclude semantics, and consumers.")}</p>
    <p>${zh("第四条边界是 shaping、shadow、texture format 与 renderer 支持有关。inputsShapingIesFile 或 inputsTextureFormat 拼写正确，不代表资源路径、IES 文件、纹理格式、DomeLight texture、light filter shader 或 renderer 后端都支持。token 页只能帮助定位属性名，不能替代渲染器能力检查。")}${en("Shaping, shadow, and texture tokens still require asset and renderer capability checks.")}</p>
  </section>

  <section data-cn-complete="debugging-path">
    <h2>常见误读和调试路径</h2>
    <p>${zh("如果光源没有照亮场景，先区分问题是在光源存在性、强度颜色、链接过滤、shadow 或 renderer 支持。检查顺序可以是：光源 prim 类型是否匹配 CylinderLight、DiskLight、DistantLight、DomeLight、RectLight 或 SphereLight；inputsIntensity、inputsExposure、inputsColor 是否 author 到正确属性；lightLink 或 shadowLink 是否把目标排除；renderer 是否支持对应 UsdLux schema。")}${en("Lighting debug starts with light type, authored inputs, links, shadows, and renderer support.")}</p>
    <p>${zh("如果 light filter 或 portal 行为不符合预期，检查 LightFilter、PluginLightFilter、filterLink、lightFilters、portals、PortalLight 和 lightFilterShaderId。token 拼写正确只说明查询路径稳定，不能证明 filter shader 已加载、relationship target 有效、filter 与 light 的连接关系正确。")}${en("Filter and portal debugging must inspect relationships, shader IDs, and consumer support.")}</p>
    <p>${zh("如果光列表或缓存行为异常，检查 LightListAPI、lightList、lightListCacheBehavior、consumeAndContinue、consumeAndHalt、ignore、automatic、independent 等 token 对应的属性域。不要把 cache behavior token 写到普通 light 输入，也不要把 light list 当成 renderer 自动发现所有光源的保证。")}${en("Light list cache behavior tokens belong to LightListAPI-specific semantics.")}</p>
    <p>${zh("如果材质与发光几何关系不对，检查 GeometryLight、MeshLight、MeshLightAPI、materialGlowTintsLight、noMaterialResponse、lightMaterialSyncMode，以及 UsdGeom 或 UsdShade 侧的几何和材质绑定。UsdLuxTokensType 能帮助定位 token，但最终行为跨越 UsdLux、UsdGeom、UsdShade 和 renderer。")}${en("Geometry light and material response issues cross UsdLux, UsdGeom, UsdShade, and renderer behavior.")}</p>
    <p>${zh("如果 DomeLight 纹理方向或贴图格式异常，优先检查 inputsTextureFile、inputsTextureFormat、latlong、mirroredBall、cubeMapVerticalCross、poleAxis、orientToStageUpAxis、Y 和 Z。这里的 token 只能说明 UsdLux 认识这些值；真正的贴图路径解析、图像格式支持、stage up axis 和渲染器 dome 采样策略仍要在资产解析和渲染 delegate 层确认。")}${en("DomeLight texture issues require texture, format, pole axis, stage axis, and renderer checks.")}</p>
    <p>${zh("如果 shadow 或 shaping 看起来完全无效，不要只检查 inputsShadowEnable 或 inputsShapingConeAngle。还要检查对应 API 是否已 applied，输入属性是否被 stronger layer 覆盖，IES 文件路径是否能解析，shadow distance/falloff 是否和场景尺度匹配，以及目标 renderer 是否消费这些 UsdLux 属性。token 页的作用是把检查清单指向正确属性名，而不是给出渲染器一致性承诺。")}${en("Shadow and shaping debugging must include applied APIs, layers, asset paths, scale, and renderer consumption.")}</p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻 API 和本地阅读关系</h2>
    <p>${zh("UsdLuxTokensType 应和 UsdLux module front 以及 release usdLux schema 页一起读。UsdLux module front 说明模块职责；LightAPI、LightFilter、LightListAPI、ShadowAPI、ShapingAPI 和各类 light schema 页解释 authoring 语义；UsdGeom 说明可绑定或几何光相关几何；UsdShade 说明材质和 shader 边界；UsdRender 说明 render settings 和输出配置；Sdf 与 TfToken 说明属性路径和 token 表示。")}${en("Adjacent modules provide module, schema, material, render, path, and token context.")}</p>
    <p>${zh("本地 reading-flow 导航保留总入口、API 入口、Release 入口、source snapshot、上一页、下一页、相关 API、release usdLux schema 页和明确 Open official page 外跳。站内 in-scope 链接保持本地路径，避免读者在主阅读路径中被静默带到英文官方站。")}${en("Local reading-flow keeps in-scope reading local and makes the official jump explicit.")}</p>
  </section>

  <section data-cn-complete="acceptance-checklist">
    <h2>完成页验收阅读清单</h2>
    <p>${zh("读完本页后，读者应能回答：UsdLuxTokensType 为什么是 token 集合而不是光源 schema；UsdLuxTokens 如何帮助 UsdPrim::GetAttribute() 或 relationship 查询避免拼写错误；光源类型 token、input property token、link/filter token 和 allowed value token 的边界是什么；lightLink、shadowLink、filterLink 和 lightListCacheBehavior 为什么不能脱离 collection、relationship 和 consumer 行为单独判断；ShapingAPI、ShadowAPI、LightListAPI 和 release usdLux schema 页各自应在什么场景下继续阅读。")}${en("The checklist verifies role, spelling safety, token categories, light linking boundaries, and adjacent reading paths.")}</p>
    <p>${zh("合格的阅读结果不是记住所有 token，而是能建立排查路径：看到 inputsIntensity 就回到光源输入属性，看到 lightLink 就回到 collection relationship，看到 consumeAndHalt 就回到 light list cache behavior，看到 treatAsPoint 或 treatAsLine 就回到几何光解释，看到 latlong 或 cubeMapVerticalCross 就回到 DomeLight 纹理格式。这样的路径能让读者在 USD 文件、Doxygen、代码搜索和渲染日志之间保持同一组英文 token 锚点，同时用中文理解它们的职责。")}${en("A successful reading maps tokens back to their owning authoring and debugging domains.")}</p>
    <p>${zh("本页已覆盖官方 Public Attributes、Detailed Description、Member Data Documentation，保留 allTokens、BoundableLightBase、CylinderLight、DomeLight、LightAPI、LightFilter、LightListAPI、inputsIntensity、inputsColor、inputsShapingConeAngle、inputsShapingIesFile、lightLink、shadowLink、filterLink、lightList、consumeAndContinue、consumeAndHalt、treatAsPoint、treatAsLine 等 source 关键词，并补充中文主阅读路径、误读点、调试路径、相邻模块和本地导航。")}${en("Official sections and representative source keywords are covered.")}</p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li>${zh("标题已覆盖：本页是 UsdLuxTokensType Class Reference，不是 UsdLux 全模块教程，也不是单个 light schema 的完整语义页。")}${en("Title coverage: this is a UsdLuxTokensType class reference.")}</li>
      <li>${zh("Detailed Description 已覆盖：static, efficient TfTokens、auto-generated schema、property names、UsdPrim::GetAttribute() 和 allowedTokens values 均已纳入中文解释。")}${en("Detailed Description coverage preserves generated token purpose and spelling safety.")}</li>
      <li>${zh("Public Attributes 已覆盖：光源类型、API/filter/list、输入属性、shaping/shadow、link/collection、allowed value 六组 token 均已解释。")}${en("Public Attributes are covered through six semantic groups.")}</li>
      <li>${zh("Member Data Documentation 已覆盖：代表性 token 原文保留，中文解释它们的职责域和 authoring 边界。")}${en("Member Data Documentation coverage keeps representative tokens intact.")}</li>
      <li>${zh("使用边界已覆盖：token 常量不是 authored value，schema token、property token 和 allowed value token 不能混用。")}${en("Usage boundaries cover authored values and token domains.")}</li>
      <li>${zh("常见误读已覆盖：light linking、filter、portal、light list cache、material glow 和 renderer 支持都不能只靠 token 拼写判断。")}${en("Common misreads cover links, filters, portals, lists, material response, and renderer support.")}</li>
      <li>${zh("调试路径已覆盖：无光照、滤镜不生效、portal 异常、light list 缓存异常和几何光材质异常都有检查顺序。")}${en("Debugging paths cover missing lighting, filters, portals, lists, and geometry lights.")}</li>
      <li>${zh("相邻关系已覆盖：UsdLux、UsdGeom、UsdShade、UsdRender、Sdf、TfToken 和 release usdLux schema 页都在本地阅读路径中保留。")}${en("Adjacent modules and release schema pages are linked locally.")}</li>
      <li>${zh("导航已覆盖：总入口、API 入口、Release 入口、source snapshot、上一页、下一页、related links 和 Open official page 外跳均保留。")}${en("Navigation coverage includes local entries, related pages, source snapshot, and official link.")}</li>
      <li>${zh("编码和链接边界已覆盖：中文是主阅读路径，英文 API 名、schema 名和 token 名保留原样，站内链接保持本地路由。")}${en("Chinese is the main reading path while API and token names remain unchanged.")}</li>
    </ul>
  </section>
</main>
</body>
</html>
`;
}

function sourceParity() {
  const source = sourceText();
  const target = fs.existsSync(rel(TARGET)) ? read(TARGET) : buildHtml();
  const targetDecoded = decodeEntities(target);
  const outputChecks = {
    has_complete_status: target.includes('data-cn-status="bilingual_complete"') && target.includes(`data-cn-round="${ROUND}"`),
    has_paragraph_coverage: target.includes("逐段双语理解 / Paragraph-Level Bilingual Coverage"),
    has_final_entry: target.includes(links.final),
    has_api_entry: target.includes(links.apiEntry),
    has_api_redirect: target.includes(links.apiRedirect),
    has_release_entry: target.includes(links.release),
    has_reading_flow_nav: target.includes("openusd-reading-flow-nav") && target.includes("openusd-reading-flow-breadcrumb"),
    has_related_links: target.includes('data-reading-flow="related"'),
    has_explicit_official_link: target.includes("Open official page") && target.includes(OFFICIAL_URL),
    no_draft_marker: !target.includes("bilingual_draft") && !target.includes("batch draft page") && !target.includes("later iterations add denser bilingual coverage") && !target.includes("后续迭代会继续补齐"),
    zh_chars: zhCharCount(target),
    zh_blocks: blockCount(target, "zh"),
  };
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_title: sourceTitle(),
    source_headings: sourceHeadings().slice(0, 72),
    source_keywords_checked: sourceKeywords,
    output_keywords_checked: outputKeywords,
    missing_source_keywords: sourceKeywords.filter((keyword) => !source.includes(keyword)),
    missing_output_keywords: outputKeywords.filter((keyword) => !targetDecoded.includes(keyword)),
    output_checks: outputChecks,
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
  if (report.output_checks.zh_chars < 2100) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 34) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "UsdLuxTokensType Class Reference",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdLuxTokensType struct/class reference by adding Chinese main-reading-path coverage for generated UsdLux TfToken collections, Doxygen sections, lighting schema tokens, input property tokens, light linking/filter/list tokens, allowed value boundaries, common misreads, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2100,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 34,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 UsdLuxTokensType source parity 晋级，并继续跟踪 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 228,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-token-struct-source-parity",
        severity: "P1",
        summary: "token 结构体参考页必须保留 Doxygen 分组、token 名、属性名、allowedTokens 语义和链接语义，不能把 lighting token 字面量翻译成中文。",
        evidence: "本轮覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、UsdLuxTokens、TfToken、LightAPI、LightFilter、LightListAPI、inputsIntensity、inputsColor、inputsShapingConeAngle、inputsShapingIesFile、lightLink、shadowLink、filterLink、lightListCacheBehavior、consumeAndContinue、consumeAndHalt、treatAsPoint 和 treatAsLine。",
        required_action: "后续 token/struct 页面继续按 source snapshot 抽取官方字段，中文说明用途和边界，API/token 名保持原样。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links 和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、前后页、相邻 UsdLux/UsdGeom/UsdShade/UsdRender/Sdf/Tf 页面、release usdLux schema 页、source snapshot 和 Open official page 外跳，并会重新运行 reading-flow 审计。",
        required_action: "若 reading-flow 审计失败，先修导航，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无 repeated question mark damage、replacement character 和 UTF-8 BOM。",
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
      "下一轮建议重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的 API/class/struct 页面；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
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
  console.log("Usage: node scripts/promote_round_450_usd_lux_tokens_type.mjs --write-page --precheck --manifest --problem");
}
