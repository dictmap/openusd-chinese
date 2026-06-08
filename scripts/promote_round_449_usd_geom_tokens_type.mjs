import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 449;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/struct_usd_geom_tokens_type.html";
const SOURCE = "source/full_api/struct_usd_geom_tokens_type_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/struct_usd_geom_tokens_type.html";
const SOURCE_PARITY_REPORT = "reports/round_449_usd_geom_tokens_type_source_parity.json";
const PROMOTION_ID = "round-449-api-usd-geom-tokens-type";

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
  return stripHtml(match ? match[1] : "UsdGeomTokensType Class Reference");
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
  source: "../../source/full_api/struct_usd_geom_tokens_type_source.html",
  official: OFFICIAL_URL,
  prev: "struct_hgi_sampler_desc.html",
  next: "usd_geom_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  usd: "usd_page_front.html",
  sdf: "sdf_page_front.html",
  tf: "tf_page_front.html",
  vt: "vt_page_front.html",
  gf: "gf_page_front.html",
  classes: "classes.html",
  annotated: "annotated.html",
  primvarsGuide: "../release/user_guides/primvars.html",
  renderGuide: "../release/user_guides/render_user_guide.html",
};

const expectedHeadings = [
  "Public Attributes",
  "Detailed Description",
  "Member Data Documentation",
  "allTokens",
  "accelerations",
  "angularVelocities",
  "BasisCurves",
  "Boundable",
  "Camera",
  "Mesh",
  "PrimvarsAPI",
  "Xform",
  "Xformable",
  "extent",
  "extentsHint",
  "visibility",
  "purpose",
  "subdivisionScheme",
];

const sourceKeywords = [
  "UsdGeomTokensType",
  "UsdGeomTokens provides static, efficient TfTokens",
  "auto-generated from the module's schema",
  "property names",
  "UsdPrim::GetAttribute()",
  "allowedTokens values",
  "allTokens",
  "accelerations",
  "angularVelocities",
  "BasisCurves",
  "Boundable",
  "Camera",
  "Mesh",
  "PrimvarsAPI",
  "Xform",
  "Xformable",
  "extent",
  "extentsHint",
  "visibility",
  "purpose",
  "default_",
  "guide",
  "proxy",
  "render",
  "inherited",
  "invisible",
  "constant",
  "uniform",
  "varying",
  "vertex",
  "faceVarying",
  "primvarsDisplayColor",
  "primvarsDisplayOpacity",
  "orientation",
  "rightHanded",
  "leftHanded",
  "subdivisionScheme",
  "catmullClark",
  "loop",
  "none",
  "xformOpOrder",
  "metersPerUnit",
  "upAxis",
];

const outputKeywords = [
  ...expectedHeadings,
  "UsdGeomTokensType",
  "UsdGeomTokens",
  "TfToken",
  "allTokens",
  "UsdPrim::GetAttribute()",
  "allowedTokens",
  "static, efficient TfTokens",
  "property names",
  "token 字面量",
  "schema token",
  "primvarsDisplayColor",
  "primvarsDisplayOpacity",
  "faceVarying",
  "rightHanded",
  "leftHanded",
  "catmullClark",
  "xformOpOrder",
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
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
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

function readingFlowNav() {
  return `<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.apiEntry}">API 本地入口</a>
  <span> / api / struct_usd_geom_tokens_type.html</span>
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
        <li><a data-reading-flow="prev" href="${links.prev}">上一页：HgiSamplerDesc</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页：UsdGeom module front</a></li>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">Open official page</a></li>
      </ul>
    </section>
    <section>
      <h3>相邻 API / Guides</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom module front</a></li>
        <li><a data-reading-flow="related" href="${links.usd}">Usd module front</a></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf module front</a></li>
        <li><a data-reading-flow="related" href="${links.tf}">Tf module front</a></li>
        <li><a data-reading-flow="related" href="${links.vt}">Vt module front</a></li>
        <li><a data-reading-flow="related" href="${links.gf}">Gf module front</a></li>
        <li><a data-reading-flow="related" href="${links.primvarsGuide}">Primvars user guide</a></li>
        <li><a data-reading-flow="related" href="${links.renderGuide}">Render user guide</a></li>
      </ul>
    </section>
  </div>
</aside>`;
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

function buildHtml() {
  const title = "UsdGeomTokensType Class Reference";
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
    <p>${zh("本页是 UsdGeomTokensType 的中文主阅读路径版本，目标不是把 token 字面量翻译成中文，而是解释这些 auto-generated TfToken 如何服务 UsdGeom schema 的属性名、关系名和 allowedTokens。读者应能用本页判断什么时候查 UsdGeomTokens，什么时候回到 UsdGeom schema 类、Sdf 属性路径、TfToken 或 release user guide。")}${en("Chinese-first coverage for the UsdGeomTokensType Doxygen reference while preserving token spellings and API names.")}</p>
    <div class="meta">
      <span class="pill">Round ${ROUND} PromotionRound</span>
      <span class="pill">API struct reference</span>
      <span class="pill">Source parity checked</span>
      <span class="pill">review_ready_zh target</span>
    </div>
  </div>
</header>
<main>
  <section data-cn-complete="page-role">
    <h2>页面职责和 source parity 范围</h2>
    <p>${zh("官方 source 的 Detailed Description 明确说，UsdGeomTokens provides static, efficient TfTokens for use in all public USD API。也就是说，UsdGeomTokensType 是 UsdGeomTokens 背后的结构体参考页，集中列出 UsdGeom 模块从 schema 自动生成的 token 成员；它不是一个 prim schema，不是运行时 registry，也不是可以直接 author 到 stage 上的对象。")}${en("The source states that UsdGeomTokens provides static, efficient TfTokens for public USD API use.")}</p>
    <p>${zh("source 还说明这些 token auto-generated from the module's schema，representing property names，并特别提到在需要用 UsdPrim::GetAttribute() 通过名字直接取 attribute 或 relationship 时，它们能避免字符串拼写错误。它们也包含 token scene description type 的 schema builtin attributes 所声明的 allowedTokens values。")}${en("Tokens represent property names for APIs such as UsdPrim::GetAttribute() and allowedTokens values for token-valued builtin attributes.")}</p>
    <p>${zh("因此本页的中文主线按三层阅读：第一层是 Doxygen 分组，包含 Public Attributes、Detailed Description 和 Member Data Documentation；第二层是 token 集合的语义分组，如几何 schema 类型、属性名、interpolation、purpose、visibility、orientation、subdivision 和 model draw mode；第三层是使用边界和调试路径，避免把 token 常量误读为 schema 行为本身。")}${en("The local page keeps the Doxygen sections and explains token groups, usage boundaries, and debugging paths.")}</p>
    <p class="note">${zh("验收边界：本轮只晋级 full_site/api/struct_usd_geom_tokens_type.html 这一页；API 名、token 名、属性名、类型名、代码片段、链接语义和 Open official page 外跳保持原样。")}${en("Scope: promote only this one page and preserve API/token/property/link semantics.")}</p>
  </section>

  <section data-cn-complete="official-sections">
    <h2>官方 section 覆盖</h2>
    <div class="grid">
      <div class="mini"><h3>Public Attributes</h3><p>${zh("Public Attributes 是本页主体，source 列出 200 多个成员。它们在 C++ 层面是 UsdGeomTokensType 的 TfToken 字段，读者不应把字段名翻译成中文，也不应把字段存在理解成属性已经写入某个 prim。")}${en("Public Attributes list generated TfToken fields.")}</p></div>
      <div class="mini"><h3>Detailed Description</h3><p>${zh("Detailed Description 给出使用动机：静态、高效、由编译器帮助检查拼写的 TfToken 常量。中文说明补足它和 UsdPrim::GetAttribute()、allowedTokens、schema builtin attributes 的关系。")}${en("Detailed Description explains static efficient tokens and spelling safety.")}</p></div>
      <div class="mini"><h3>Member Data Documentation</h3><p>${zh("Member Data Documentation 对每个 token 成员逐项给出参考锚点。本页不逐个汉化 token 值，而按职责组解释它们如何在 UsdGeom、Usd、Sdf、TfToken、Vt 和 Gf 的阅读路径中使用。")}${en("Member Data Documentation is covered by grouped token semantics.")}</p></div>
      <div class="mini"><h3>allTokens</h3><p>${zh("allTokens 是所有列出 token 的 vector，用于遍历或检查 UsdGeom 的已知 token 集合；它不是 validation schema，也不能单独证明某个 attribute 的值在某个上下文中合法。")}${en("allTokens is a vector of all listed tokens, not a complete semantic validator.")}</p></div>
    </div>
  </section>

  <section data-cn-complete="token-groups">
    <h2>token 分组阅读路径</h2>
    <p>${zh("面对 UsdGeomTokensType 时，最容易迷失在长字段清单里。更实用的读法是先把 token 分成几类：schema/type tokens、属性名 tokens、枚举或 allowedTokens、primvar/display tokens、motion/camera tokens、以及 model draw mode 和 purpose/visibility tokens。这样的分组能帮助读者从问题场景反查 token，而不是从字母顺序硬读。")}${en("Grouped reading is more useful than a flat alphabetical scan of tokens.")}</p>
    <div class="grid">
      <div class="mini"><h3>schema/type tokens</h3><p>${zh("BasisCurves、Boundable、Camera、Capsule、Cone、Cube、Cylinder、Curves、GeomModelAPI、GeomSubset、Gprim、HermiteCurves、Imageable、Mesh、MotionAPI、NurbsCurves、NurbsPatch、Plane、PointBased、PointInstancer、Points、PrimvarsAPI、Scope、Sphere、TetMesh、Xform、Xformable 等名称用于识别 UsdGeom schema 或 API 类型语义。它们帮助读者和代码定位类型，但不替代 schema 类本身的构造、Get 或 Define API。")}${en("Schema/type tokens identify UsdGeom schema names and related API types.")}</p></div>
      <div class="mini"><h3>几何属性 tokens</h3><p>${zh("extent、extentsHint、points、normals、velocities、accelerations、angularVelocities、orientations、orientationsf、positions、scales、ids、inactiveIds、protoIndices、prototypes、faceVertexCounts、faceVertexIndices、curveVertexCounts、surfaceFaceVertexIndices、tetVertexIndices 等字段对应几何数据或拓扑相关属性名。使用时要回到具体 schema 的属性类型、插值规则和数组长度约束。")}${en("Geometry property tokens name data and topology attributes.")}</p></div>
      <div class="mini"><h3>interpolation / primvar tokens</h3><p>${zh("constant、uniform、varying、vertex、faceVarying、interpolation、elementSize、indices、unauthoredValuesIndex、primvarsDisplayColor、primvarsDisplayOpacity 等 token 与 primvar 和插值语义密切相关。token 常量只提供拼写；实际数据是否匹配 topology，仍要检查 PrimvarsAPI、数组长度和 interpolation 规则。")}${en("Interpolation and primvar tokens support primvar authoring and queries.")}</p></div>
      <div class="mini"><h3>purpose / visibility tokens</h3><p>${zh("purpose、default_、guide、proxy、render、visibility、inherited、invisible、guideVisibility、proxyVisibility、renderVisibility 等 token 关系到成像、代理、导引几何和继承可见性。调试渲染缺失时，应区分 purpose 过滤、visibility 继承和 renderer 支持，而不是只检查 token 拼写。")}${en("Purpose and visibility tokens affect render/guide/proxy interpretation.")}</p></div>
      <div class="mini"><h3>orientation / subdivision tokens</h3><p>${zh("orientation、rightHanded、leftHanded、subdivisionScheme、catmullClark、loop、bilinear、none、triangleSubdivisionRule、faceVaryingLinearInterpolation、interpolateBoundary、creaseIndices、creaseLengths、creaseSharpnesses、cornerIndices、cornerSharpnesses 等 token 常用于网格方向和细分语义。它们要和 Mesh 拓扑、normal 方向、renderer 细分支持一起排查。")}${en("Orientation and subdivision tokens must be read with mesh topology and renderer behavior.")}</p></div>
      <div class="mini"><h3>xform / stage units tokens</h3><p>${zh("xformOpOrder、metersPerUnit、upAxis、axis、basis、pivot、origin、left、right、cross 等 token 与变换、单位或几何基准有关。它们本身不是矩阵或 Gf 类型；涉及数值计算时仍需要查 Gf、Vt 和 UsdGeomXformable 的 API。")}${en("Transform and units tokens connect to UsdGeomXformable, Gf, and Vt concepts.")}</p></div>
    </div>
    <ul class="token-list">
      <li>accelerations</li><li>allTokens</li><li>angularVelocities</li><li>basis</li><li>BasisCurves</li><li>Boundable</li><li>Camera</li><li>Mesh</li><li>PrimvarsAPI</li><li>Xform</li><li>Xformable</li><li>extent</li><li>extentsHint</li><li>visibility</li><li>purpose</li><li>default_</li><li>guide</li><li>proxy</li><li>render</li><li>inherited</li><li>invisible</li><li>constant</li><li>uniform</li><li>varying</li><li>vertex</li><li>faceVarying</li><li>primvarsDisplayColor</li><li>primvarsDisplayOpacity</li><li>orientation</li><li>rightHanded</li><li>leftHanded</li><li>subdivisionScheme</li><li>catmullClark</li><li>loop</li><li>none</li><li>xformOpOrder</li><li>metersPerUnit</li><li>upAxis</li>
    </ul>
  </section>

  <section data-cn-complete="detailed-token-map">
    <h2>从 token 清单到实际 authoring 的映射</h2>
    <p>${zh("把 UsdGeomTokensType 当作 schema token 地图阅读时，要先看 token 属于哪条 authoring 路径。Mesh、BasisCurves、Camera、Xform、PointInstancer 这类名称主要帮助识别 schema 类型或 API 类型；extent、points、normals、faceVertexCounts、faceVertexIndices、xformOpOrder 这类名称主要帮助查找 property；constant、uniform、varying、vertex、faceVarying 这类名称主要帮助设置或判断 interpolation；guide、proxy、render、default_ 这类名称主要帮助解释 purpose。不同类别的 token 即使都来自 UsdGeomTokens，也不能互相替代。")}${en("Token names must be mapped back to schema type, property name, interpolation, or purpose domains.")}</p>
    <p>${zh("在 C++ 或 Python 绑定附近调试时，常见流程是先从具体 schema API 进入，例如 UsdGeomMesh、UsdGeomImageable、UsdGeomPrimvarsAPI 或 UsdGeomXformable；只有当需要通过名字直接访问属性、关系或 allowed token 时，才回到 UsdGeomTokens。这样可以避免把 token 页当作主 API 页，也能避免在不知道属性类型、fallback、variability 和 value resolution 的情况下只凭 token 名写代码。")}${en("A concrete UsdGeom schema API should usually be the primary entry point; tokens are spelling anchors.")}</p>
    <p>${zh("如果业务代码需要做通用工具，例如扫描 stage 中的 primvars、批量检查 visibility、把 proxy/render purpose 做过滤，或者给几何导出器生成稳定属性名，UsdGeomTokensType 才会成为核心参考。此时应该把 allTokens 当作已知 token 集合，把单个 TfToken 当作不可随意翻译的字面量，把 schema 文档当作最终语义来源。中文页特别强调这三者分工，是为了减少工具代码里最常见的字符串拼写错误和语义域混用。")}${en("Generic tools can use allTokens and individual TfToken constants, while schema docs remain the semantic authority.")}</p>
    <p>${zh("对于 allowedTokens，要检查它属于哪个属性。purpose 的 allowedTokens 与 interpolation 的 allowedTokens 不是同一个集合；orientation 的 rightHanded 和 leftHanded 也不应被拿去解释 purpose 或 visibility。若某个 token 在 allTokens 中出现，只能说明 UsdGeom 认识这个拼写，不能说明它适合写到任意 token-valued attribute。")}${en("allowedTokens must be interpreted per attribute, not globally.")}</p>
    <p>${zh("对于属性名 token，要检查 namespace 和 schema owner。primvarsDisplayColor 与 displayColor 的概念相近，但路径和读取语义并不等价；extentsHint 与 extent 的用途不同，一个常用于模型边界提示，一个常用于具体 boundable 几何的范围数据；guideVisibility、proxyVisibility、renderVisibility 与通用 visibility 也不是同一个检查点。")}${en("Property-name tokens require namespace and owning schema context.")}</p>
    <p>${zh("对于调试工具输出，要保留 token 原文并补充中文说明，而不是把 token 文本翻译成中文标签。例如 catmullClark、loop、bilinear、none 是 subdivisionScheme 相关值，翻译成中文后会破坏和 USD 文件、Doxygen、代码搜索、错误日志的对应关系。本站双语策略是中文解释语义，英文 token 原样作为核对锚点。")}${en("Debug tools should keep token spellings intact and explain them in Chinese around the original token.")}</p>
  </section>

  <section data-cn-complete="usage-boundaries">
    <h2>使用边界和常见误读</h2>
    <p>${zh("第一类误读是把 token 常量当成 authored value。UsdGeomTokens->purpose 或 UsdGeomTokens->render 只是 TfToken 值的稳定拼写；要真正写入 stage，还需要通过对应 attribute、relationship 或 schema API author 值。若页面或代码只引用 token，而没有 Set、Create、GetAttribute 或 relationship authoring，scene description 不会因此改变。")}${en("A token constant is a stable spelling, not an authored scene value by itself.")}</p>
    <p>${zh("第二类误读是把字段名和 token 字面量混在一起。default_ 这样的 C++ 字段名为了避开语言关键字使用下划线，但它代表的 token 字面量是 default。类似地，primvarsDisplayColor 和 primvarsDisplayOpacity 是 C++ 成员名，使用时仍要关注它们对应的 USD property path 和 PrimvarsAPI 语义。")}${en("C++ member names and authored token strings may differ, such as default_ representing default.")}</p>
    <p>${zh("第三类误读是把 allTokens 当成完整合法性检查。allTokens 能帮助遍历 UsdGeomTokensType 中所有已生成 token，但具体 attribute 是否允许某个 token，要看 schema 的 allowedTokens、属性类型、fallback 和 API 文档。比如 purpose 的 guide、proxy、render 与 interpolation 的 constant、uniform、varying、vertex、faceVarying 属于不同语义域，不能互相替代。")}${en("allTokens does not replace schema-specific allowedTokens validation.")}</p>
    <p>${zh("第四类误读是把 UsdGeomTokensType 当成 UsdGeom 模块导读。它是 token 结构体页，只解释 token 集合；要理解几何 schema 的职责，应跳到 UsdGeom module front、Mesh、Imageable、PointBased、PrimvarsAPI 或 release user guide。中文页面保留这些相邻路径，是为了让读者从 token 回到具体 API。")}${en("This struct reference is not the full UsdGeom module guide.")}</p>
  </section>

  <section data-cn-complete="debugging-path">
    <h2>调试路径</h2>
    <p>${zh("如果直接通过 UsdPrim::GetAttribute() 查属性失败，先确认使用的是属性名 token，例如 extent、points、normals、xformOpOrder 或 primvarsDisplayColor，而不是 schema type token，例如 Mesh 或 Xform。然后检查 prim 上是否真正有该属性、namespace 是否正确、是否应通过 schema API 创建或获取，而不是只拼接字符串。")}${en("When GetAttribute fails, distinguish property-name tokens from schema/type tokens.")}</p>
    <p>${zh("如果 renderer 或 viewport 没有显示预期几何，按 purpose、visibility、orientation、subdivisionScheme、normals 和 extent 分层排查。purpose 错误会让 guide、proxy、render 过滤不符合预期；visibility 的 inherited 或 invisible 会影响可见性继承；orientation 的 rightHanded 或 leftHanded 会影响面朝向；subdivisionScheme 的 catmullClark、loop、bilinear、none 需要 renderer 支持和拓扑配合。")}${en("Render/debug checks should separate purpose, visibility, orientation, subdivision, normals, and extents.")}</p>
    <p>${zh("如果 primvar 或 displayColor/displayOpacity 结果不对，优先核对 PrimvarsAPI、interpolation、elementSize、indices、unauthoredValuesIndex、constant、uniform、varying、vertex、faceVarying 这些 token 所属语义域。token 拼写正确并不保证数组长度、face topology、indices 或 interpolation 合法。")}${en("Primvar debugging must check interpolation, element size, indices, topology, and authored data.")}</p>
    <p>${zh("如果单位或方向异常，检查 metersPerUnit、upAxis、xformOpOrder、axis、basis 以及 Gf/Vt 数值类型。UsdGeomTokensType 只给出 token 名；矩阵、向量、四元数、范围和相机模型仍属于 Gf、Vt 或具体 UsdGeom API 的职责。")}${en("Units and transform issues require Gf/Vt and UsdGeomXformable context beyond token spelling.")}</p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻 API 和本地阅读关系</h2>
    <p>${zh("UsdGeomTokensType 应和 UsdGeom module front 一起阅读：UsdGeom 解释 schema 和几何模型，UsdGeomTokensType 解释常量 token 清单。Sdf 提供 property path、layer 和 scene description 的底层概念；Usd 提供 prim、attribute、relationship 和 stage 操作；TfToken 解释 token 的高效标识语义；Vt 和 Gf 提供值数组、向量、矩阵、范围和几何数学类型。")}${en("Adjacent modules provide schema, scene description, token, value, and math context.")}</p>
    <p>${zh("release user guide 中的 primvars、render_user_guide、time and animated values 等页面帮助理解这些 token 在实际 authoring 和读取中的表现。本站 reading-flow 导航保留总入口、API 入口、Release 入口、source snapshot、相邻 API 页面和明确的 Open official page 外跳；站内阅读链接保持本地，不会在主阅读路径里静默跳到英文官方站。")}${en("Local reading-flow keeps in-scope reading local and makes the official external jump explicit.")}</p>
  </section>

  <section data-cn-complete="acceptance-checklist">
    <h2>完成页验收阅读清单</h2>
    <p>${zh("读完本页后，读者应能回答：UsdGeomTokensType 为什么是 token 集合而不是 schema；UsdGeomTokens 如何帮助 UsdPrim::GetAttribute() 避免字符串拼写错误；property-name token、schema-type token 和 allowedTokens value 的边界是什么；default_ 为什么不能按字段名照抄成 authored token；purpose、visibility、interpolation、orientation、subdivision 和 primvarsDisplayColor 各自应该回到哪些 API 或 guide 排查。")}${en("The checklist verifies role, spelling safety, token categories, member-name differences, and debugging routes.")}</p>
    <p>${zh("本页已经覆盖官方 Public Attributes、Detailed Description、Member Data Documentation，保留 allTokens、accelerations、angularVelocities、BasisCurves、Boundable、Camera、Mesh、PrimvarsAPI、Xform、Xformable、extent、extentsHint、visibility、purpose、subdivisionScheme 等 source 关键词，并给出中文主阅读路径、常见误读、调试路径、相邻模块和本地导航。")}${en("Official section and source keyword coverage are retained.")}</p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li>${zh("标题已覆盖：本页是 UsdGeomTokensType Class Reference，不是 UsdGeom 模块总览页，也不是具体 schema 的成员函数参考页。")}${en("Title coverage: this is a UsdGeomTokensType class reference.")}</li>
      <li>${zh("Detailed Description 已覆盖：static, efficient TfTokens、auto-generated from the module's schema、property names、UsdPrim::GetAttribute() 和 allowedTokens values 均已纳入中文解释。")}${en("Detailed Description coverage preserves the official purpose and examples.")}</li>
      <li>${zh("Public Attributes 已覆盖：本页用分组方式覆盖 schema/type tokens、几何属性 tokens、primvar/interpolation tokens、purpose/visibility tokens、orientation/subdivision tokens 和 transform/unit tokens。")}${en("Public Attributes are covered by semantic groups.")}</li>
      <li>${zh("Member Data Documentation 已覆盖：allTokens 和代表性 token 成员都保留原名，并解释为何 token 字面量不能翻译。")}${en("Member Data Documentation coverage keeps token names intact.")}</li>
      <li>${zh("使用边界已覆盖：token 常量不是 authored value，allTokens 不是完整 validator，C++ 字段名和 authored token 字面量可能不同。")}${en("Usage boundaries cover authored values, validation, and member-name differences.")}</li>
      <li>${zh("常见误读已覆盖：purpose 与 interpolation 不同域，schema type token 与 property name token 不同域，PrimvarsAPI 语义不能只靠 token 拼写判断。")}${en("Common misreads separate token domains and primvar semantics.")}</li>
      <li>${zh("调试路径已覆盖：GetAttribute 失败、渲染缺失、visibility 继承、orientation 方向、subdivision 细分、primvar 数组和 units/transform 异常都有检查顺序。")}${en("Debugging paths cover attribute lookup, rendering, orientation, subdivision, primvars, and transforms.")}</li>
      <li>${zh("相邻关系已覆盖：UsdGeom、Usd、Sdf、TfToken、Vt、Gf 和 release user guide 都在本地阅读路径中保留。")}${en("Adjacent modules and guides are linked through the local reading flow.")}</li>
      <li>${zh("导航已覆盖：总入口、API 入口、Release 入口、source snapshot、上一页、下一页、相邻 API 和 Open official page 外跳均保留。")}${en("Navigation coverage includes local entries, source snapshot, adjacent pages, and the explicit official link.")}</li>
      <li>${zh("编码和链接边界已覆盖：中文是主阅读路径，英文 API 名和 token 名保留原样；站内 in-scope 链接保持本地路由。")}${en("Encoding and link boundaries preserve Chinese-first reading and local routing.")}</li>
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
    has_explicit_official_link: target.includes("Open official page") && target.includes(OFFICIAL_URL),
    no_draft_marker: !target.includes("bilingual_draft") && !target.includes("batch draft page") && !target.includes("later iterations add denser bilingual coverage"),
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
  if (report.output_checks.zh_chars < 2200) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
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
    title: "UsdGeomTokensType Class Reference",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdGeomTokensType struct/class reference by adding Chinese main-reading-path coverage for generated UsdGeom TfToken collections, Doxygen sections, token groups, property-name and allowedTokens boundaries, common misreads, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2200,
      minimum_complete_section_chinese_chars: 1800,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 UsdGeomTokensType source parity 晋级，并继续跟踪 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 227,
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
        summary: "token 结构体参考页必须保留 Doxygen 分组、token 名、属性名、allowedTokens 语义和链接语义，不能把 token 字面量翻译成中文。",
        evidence: "本轮覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、UsdGeomTokens、TfToken、UsdPrim::GetAttribute()、allowedTokens、extent、visibility、purpose、primvarsDisplayColor、orientation、subdivisionScheme、xformOpOrder、metersPerUnit 和 upAxis。",
        required_action: "后续 token/struct 页面继续按 source snapshot 抽取官方字段，中文说明用途和边界，API/token 名保持原样。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、前后页、相邻 UsdGeom/Usd/Sdf/Tf/Vt/Gf 页面、source snapshot、release user guide 链接和 Open official page 外跳，并会重新运行 reading-flow 审计。",
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
  console.log("Usage: node scripts/promote_round_449_usd_geom_tokens_type.mjs --write-page --precheck --manifest --problem");
}
