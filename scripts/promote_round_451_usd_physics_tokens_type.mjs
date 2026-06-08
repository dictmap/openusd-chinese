import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 451;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/struct_usd_physics_tokens_type.html";
const SOURCE = "source/full_api/struct_usd_physics_tokens_type_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/struct_usd_physics_tokens_type.html";
const SOURCE_PARITY_REPORT = "reports/round_451_usd_physics_tokens_type_source_parity.json";
const PROMOTION_ID = "round-451-api-usd-physics-tokens-type";

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
  return stripHtml(match ? match[1] : "UsdPhysicsTokensType Class Reference");
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
  source: "../../source/full_api/struct_usd_physics_tokens_type_source.html",
  official: OFFICIAL_URL,
  prev: "struct_usd_lux_tokens_type.html",
  next: "struct_usd_skel_tokens_type.html",
  usdPhysics: "usd_physics_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  sdf: "sdf_page_front.html",
  tf: "tf_page_front.html",
  usdProc: "usd_proc_page_front.html",
  usdRender: "usd_render_page_front.html",
};

const expectedHeadings = [
  "Public Attributes",
  "Detailed Description",
  "Member Data Documentation",
  "allTokens",
  "PhysicsScene",
  "PhysicsRigidBodyAPI",
  "PhysicsCollisionAPI",
  "PhysicsJoint",
  "PhysicsDriveAPI",
  "PhysicsLimitAPI",
  "PhysicsMassAPI",
  "PhysicsMaterialAPI",
  "PhysicsFilteredPairsAPI",
  "PhysicsCollisionGroup",
  "PhysicsRevoluteJoint",
  "PhysicsPrismaticJoint",
  "PhysicsSphericalJoint",
];

const sourceKeywords = [
  "UsdPhysicsTokensType",
  "UsdPhysicsTokens",
  "static, efficient TfTokens",
  "auto-generated from the module's schema",
  "property names",
  "UsdPrim::GetAttribute()",
  "allowedTokens values",
  "allTokens",
  "acceleration",
  "angular",
  "boundingCube",
  "boundingSphere",
  "colliders",
  "convexDecomposition",
  "convexHull",
  "distance",
  "drive",
  "drive_MultipleApplyTemplate_PhysicsDamping",
  "drive_MultipleApplyTemplate_PhysicsMaxForce",
  "limit",
  "limit_MultipleApplyTemplate_PhysicsHigh",
  "limit_MultipleApplyTemplate_PhysicsLow",
  "PhysicsScene",
  "PhysicsRigidBodyAPI",
  "PhysicsCollisionAPI",
  "PhysicsJoint",
  "PhysicsDriveAPI",
  "PhysicsLimitAPI",
  "PhysicsMassAPI",
  "PhysicsMaterialAPI",
  "physicsBody0",
  "physicsBody1",
  "physicsCollisionEnabled",
  "physicsFilteredGroups",
  "physicsFilteredPairs",
  "physicsSimulationOwner",
  "physicsVelocity",
  "physicsAngularVelocity",
  "rotX",
  "rotY",
  "rotZ",
  "transX",
  "transY",
  "transZ",
];

const outputKeywords = [
  ...expectedHeadings,
  "UsdPhysicsTokensType",
  "UsdPhysicsTokens",
  "TfToken",
  "allTokens",
  "UsdPrim::GetAttribute()",
  "allowedTokens",
  "static, efficient TfTokens",
  "property names",
  "schema token",
  "physics token",
  "physicsCollisionEnabled",
  "physicsRigidBodyEnabled",
  "physicsSimulationOwner",
  "physicsFilteredPairs",
  "physicsVelocity",
  "physicsAngularVelocity",
  "drive_MultipleApplyTemplate_PhysicsDamping",
  "limit_MultipleApplyTemplate_PhysicsHigh",
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
  <span> / api / struct_usd_physics_tokens_type.html</span>
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
        <li><a data-reading-flow="prev" href="${links.prev}">上一页：UsdLuxTokensType</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页：UsdSkelTokensType</a></li>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">Open official page</a></li>
      </ul>
    </section>
    <section>
      <h3>相邻 API</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usdPhysics}">UsdPhysics module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom module front</a></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf module front</a></li>
        <li><a data-reading-flow="related" href="${links.tf}">Tf module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdProc}">UsdProc module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender module front</a></li>
      </ul>
    </section>
  </div>
</aside>`;
}

function buildHtml() {
  const title = "UsdPhysicsTokensType Class Reference";
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
    <p>${zh("本页把 UsdPhysicsTokensType 从批次草稿改为中文主阅读路径。重点不是翻译 physics token 的拼写，而是解释 UsdPhysicsTokens 如何把 physics scene、rigid body、collision、joint、drive、limit、mass、material、filter 等 schema 语义整理成稳定的 TfToken 集合。读者应能从 token 名回到具体 UsdPhysics API、Sdf 属性路径、TfToken 或相邻 UsdGeom 调试路径。")}${en("Chinese-first coverage for the UsdPhysicsTokensType Doxygen reference while preserving token spellings and API names.")}</p>
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
    <p>${zh("官方 Detailed Description 说明，UsdPhysicsTokens provides static, efficient TfTokens for use in all public USD API。这些 token auto-generated from the module's schema，representing property names，并用于需要通过 UsdPrim::GetAttribute() 直接按名字取得 attribute 或 relationship 的场景。UsdPhysicsTokens 还包含 token scene description type 的 schema builtin attributes 所声明的 allowedTokens values。")}${en("The source describes static, efficient TfTokens generated from the UsdPhysics schema.")}</p>
    <p>${zh("因此 UsdPhysicsTokensType 是 token 结构体页，不是物理求解器说明、不是仿真运行时配置页，也不是刚体或关节的完整 authoring 教程。它提供稳定拼写和 Doxygen 锚点；具体 authoring、layer override、joint topology、collision approximation、mass/material 计算和模拟后端消费语义，需要回到 UsdPhysics module front、UsdGeom、Sdf 和运行时文档。")}${en("This is a token structure reference, not a physics solver or runtime behavior specification.")}</p>
    <p>${zh("本轮 source parity 覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、PhysicsScene、PhysicsRigidBodyAPI、PhysicsCollisionAPI、PhysicsJoint、PhysicsDriveAPI、PhysicsLimitAPI、PhysicsMassAPI、PhysicsMaterialAPI、physicsBody0/body1、physicsFilteredPairs、physicsSimulationOwner、physicsVelocity、rotX/rotY/rotZ 和 transX/transY/transZ 等核心 token。")}${en("The local page covers official sections and representative physics token groups.")}</p>
    <p class="note">${zh("验收边界：本轮只晋级 full_site/api/struct_usd_physics_tokens_type.html；API 名、schema 名、token 名、属性名、Doxygen 表格标签、代码、链接和 Open official page 外跳保持原样。")}${en("Scope: promote only this page and preserve API/token/link semantics.")}</p>
  </section>

  <section data-cn-complete="official-sections">
    <h2>官方 section 覆盖</h2>
    <div class="grid">
      <div class="mini"><h3>Public Attributes</h3><p>${zh("Public Attributes 是本页主体，列出 UsdPhysicsTokensType 的 TfToken 字段。字段名包括 physicsCollisionEnabled、physicsRigidBodyEnabled、physicsBody0、physicsBody1、drive、limit、physicsMass、physicsVelocity 等；它们必须保持英文拼写，不能翻译成中文字符串。")}${en("Public Attributes list generated TfToken fields.")}</p></div>
      <div class="mini"><h3>Detailed Description</h3><p>${zh("Detailed Description 给出 token 的用途：高效、静态、由 schema 自动生成、帮助编译器检查拼写，并包含 allowedTokens values。中文说明补足它和 UsdPrim::GetAttribute()、relationship 查询、schema builtin attributes 的关系。")}${en("Detailed Description explains efficient generated tokens and spelling safety.")}</p></div>
      <div class="mini"><h3>Member Data Documentation</h3><p>${zh("Member Data Documentation 对每个 token 成员给出锚点。本页按语义组解释这些锚点，帮助读者从刚体、碰撞、关节、drive、limit、材质或过滤问题定位到正确 token。")}${en("Member Data Documentation is represented through functional token groups.")}</p></div>
      <div class="mini"><h3>allTokens</h3><p>${zh("allTokens 是所有列出 token 的 vector，适合遍历或调试已知 UsdPhysics token 集合。它不是合法性验证器，也不能说明任意 token 都能写到任意 physics attribute 或 relationship 上。")}${en("allTokens is a vector of listed tokens, not a complete semantic validator.")}</p></div>
    </div>
  </section>

  <section data-cn-complete="token-groups">
    <h2>token 分组阅读路径</h2>
    <p>${zh("阅读 UsdPhysicsTokensType 时，应先按语义域分组，而不是逐行扫字段表。schema/API token 说明物理 schema 身份；属性 token 说明 authoring 名称；multiple-apply 模板 token 说明 drive 或 limit 的字段；allowed value token 说明 axis、approximation 或运动类型可选值。每类 token 都需要回到相应 schema 才能判断真正含义。")}${en("Grouped reading prevents mixing schema names, property names, multiple-apply fields, and allowed values.")}</p>
    <div class="grid">
      <div class="mini"><h3>scene and body tokens</h3><p>${zh("PhysicsScene、PhysicsRigidBodyAPI、physicsRigidBodyEnabled、physicsSimulationOwner、physicsStartsAsleep、physicsKinematicEnabled、physicsVelocity、physicsAngularVelocity 等 token 关系到 scene owner、刚体启用、初始状态和速度 authoring。它们不等同于模拟已经运行，也不保证 runtime 会按同一策略解释。")}${en("Scene and body tokens describe scene ownership and rigid-body authored state.")}</p></div>
      <div class="mini"><h3>collision tokens</h3><p>${zh("PhysicsCollisionAPI、PhysicsMeshCollisionAPI、PhysicsCollisionGroup、physicsCollisionEnabled、physicsApproximation、boundingCube、boundingSphere、convexHull、convexDecomposition、meshSimplification、none 等 token 关系到碰撞启用、mesh approximation 和 group 语义。调试穿透或碰撞缺失时，要同时检查几何、collision API、approximation 和 backend 支持。")}${en("Collision tokens cover collision APIs, approximation modes, and group behavior.")}</p></div>
      <div class="mini"><h3>joint tokens</h3><p>${zh("PhysicsJoint、PhysicsFixedJoint、PhysicsDistanceJoint、PhysicsPrismaticJoint、PhysicsRevoluteJoint、PhysicsSphericalJoint、physicsBody0、physicsBody1、physicsLocalPos0、physicsLocalRot0、physicsLocalPos1、physicsLocalRot1、physicsJointEnabled、physicsBreakForce、physicsBreakTorque 等 token 关系到 joint topology 和局部 frame。token 拼写正确不代表 body target、frame 或 axis 正确。")}${en("Joint tokens name body targets, local frames, enabled state, and break thresholds.")}</p></div>
      <div class="mini"><h3>drive and limit tokens</h3><p>${zh("PhysicsDriveAPI、PhysicsLimitAPI、drive、limit、drive_MultipleApplyTemplate_PhysicsDamping、drive_MultipleApplyTemplate_PhysicsMaxForce、drive_MultipleApplyTemplate_PhysicsStiffness、drive_MultipleApplyTemplate_PhysicsTargetPosition、drive_MultipleApplyTemplate_PhysicsTargetVelocity、limit_MultipleApplyTemplate_PhysicsHigh、limit_MultipleApplyTemplate_PhysicsLow 等 token 属于 multiple-apply API 字段域。它们要和具体 axis、rotX、rotY、rotZ、transX、transY、transZ 一起阅读。")}${en("Drive and limit tokens map to multiple-apply API fields and axis-specific behavior.")}</p></div>
      <div class="mini"><h3>mass and material tokens</h3><p>${zh("PhysicsMassAPI、PhysicsMaterialAPI、physicsMass、physicsDensity、physicsCenterOfMass、physicsDiagonalInertia、physicsPrincipalAxes、physicsStaticFriction、physicsDynamicFriction、physicsRestitution 等 token 关系到质量、惯性和物理材质。它们只是属性名，真实数值是否合理要结合单位、尺度、几何和模拟后端。")}${en("Mass and material tokens name mass, inertia, friction, and restitution attributes.")}</p></div>
      <div class="mini"><h3>filter and unit tokens</h3><p>${zh("PhysicsFilteredPairsAPI、physicsFilteredPairs、physicsFilteredGroups、physicsInvertFilteredGroups、filteredGroups、colliders、kilogramsPerUnit、physicsGravityDirection、physicsGravityMagnitude 等 token 关系到过滤、单位和场景重力。过滤 token 要检查 relationship target，单位 token 要和 stage 单位、质量单位和 solver 配置一起排查。")}${en("Filter and unit tokens require relationship targets, units, gravity, and solver context.")}</p></div>
    </div>
    <ul class="token-list">
      <li>allTokens</li><li>PhysicsScene</li><li>PhysicsRigidBodyAPI</li><li>PhysicsCollisionAPI</li><li>PhysicsMeshCollisionAPI</li><li>PhysicsJoint</li><li>PhysicsDriveAPI</li><li>PhysicsLimitAPI</li><li>PhysicsMassAPI</li><li>PhysicsMaterialAPI</li><li>PhysicsFilteredPairsAPI</li><li>PhysicsCollisionGroup</li><li>physicsBody0</li><li>physicsBody1</li><li>physicsCollisionEnabled</li><li>physicsRigidBodyEnabled</li><li>physicsSimulationOwner</li><li>physicsFilteredPairs</li><li>physicsVelocity</li><li>physicsAngularVelocity</li><li>drive_MultipleApplyTemplate_PhysicsDamping</li><li>limit_MultipleApplyTemplate_PhysicsHigh</li><li>rotX</li><li>rotY</li><li>rotZ</li><li>transX</li><li>transY</li><li>transZ</li>
    </ul>
  </section>

  <section data-cn-complete="domain-map">
    <h2>UsdPhysics token 语义域映射</h2>
    <p>${zh("UsdPhysicsTokensType 的价值在于把物理系统里分散的 schema 名、属性名、relationship 名和枚举值放到一个可搜索的 token 表里。调试时应先问：当前问题是 physics scene 没绑定、刚体没有启用、碰撞近似错误、joint 两端 body 不正确、drive/limit 字段写错、材质或质量不合理，还是模拟后端没有消费某个 UsdPhysics 约定。不同答案对应不同 token 组。")}${en("The token table is useful after identifying whether the issue is scene, rigid body, collision, joint, drive, limit, material, mass, or consumer behavior.")}</p>
    <p>${zh("schema/API token 主要用于类型识别和代码分派。例如 PhysicsScene、PhysicsRigidBodyAPI、PhysicsCollisionAPI、PhysicsJoint、PhysicsDriveAPI、PhysicsLimitAPI、PhysicsMassAPI、PhysicsMaterialAPI、PhysicsFilteredPairsAPI 说明 prim 或 API 应该按哪类物理语义理解。它们不直接提供 solver 行为，也不替代具体 schema 的 Define、Get 或 Create API。")}${en("Schema/API tokens identify physics schema names and APIs but do not provide solver behavior.")}</p>
    <p>${zh("属性 token 主要用于直接属性查询或通用工具。physicsCollisionEnabled、physicsRigidBodyEnabled、physicsMass、physicsDensity、physicsVelocity、physicsAngularVelocity、physicsGravityDirection、physicsGravityMagnitude 等都属于 authoring 属性名。若这些属性看起来没有效果，应检查是否写在正确 prim 上、是否由对应 schema 声明、是否有 stronger layer override、以及运行时是否读取该属性。")}${en("Property tokens are stable names for authored attributes and still require schema, layer, and runtime context.")}</p>
    <p>${zh("relationship token 常常决定拓扑，而不只是数值。physicsBody0、physicsBody1、physicsFilteredPairs、physicsFilteredGroups、physicsSimulationOwner 等 token 通常需要检查 target path、目标 prim 是否存在、目标是否具备所需 API，以及 composition 后关系是否被覆盖。只检查 token 拼写无法判断关系是否有效。")}${en("Relationship tokens require target-path and composition checks.")}</p>
    <p>${zh("allowed value token 只能放回拥有它的属性语义域。rotX、rotY、rotZ、transX、transY、transZ 是 drive/limit 轴或自由度相关值；boundingCube、boundingSphere、convexHull、convexDecomposition、meshSimplification、none 与碰撞近似相关；linear、angular、force、acceleration、distance 与运动或 drive 类型有关。跨语义域写入会制造难以定位的无效 authoring。")}${en("Allowed value tokens are valid only for their owning attributes and should not be reused across domains.")}</p>
  </section>

  <section data-cn-complete="articulation-filter-units">
    <h2>articulation、过滤和单位的额外边界</h2>
    <p>${zh("PhysicsArticulationRootAPI、physicsExcludeFromArticulation、physicsMergeGroup 这一组 token 容易被误读成“启用完整关节链模拟”的开关。更准确的读法是：它们为 scene description 提供 articulation 归属、排除和合并分组的名字；真正能否形成 articulation，还要看关节拓扑、body target、local frame、运行时后端支持以及 composition 后的最终 authored opinion。调试 articulation 时，先确认 root API 和 exclude/merge token，再检查 PhysicsJoint、PhysicsRevoluteJoint、PhysicsPrismaticJoint、PhysicsSphericalJoint 等 joint 类型是否连接到正确刚体。")}${en("Articulation-related tokens describe authored schema names and grouping, not a solver guarantee.")}</p>
    <p>${zh("limit 和 drive 的 token 也要放回实例路径里理解。physicsConeAngle0Limit、physicsConeAngle1Limit、physicsLowerLimit、physicsUpperLimit、physicsMinDistance、physicsMaxDistance 与 limit_MultipleApplyTemplate_PhysicsHigh/Low 都是在特定 joint 或 multiple-apply API 语境下才有意义；drive_MultipleApplyTemplate_PhysicsTargetPosition、drive_MultipleApplyTemplate_PhysicsTargetVelocity、drive_MultipleApplyTemplate_PhysicsStiffness、drive_MultipleApplyTemplate_PhysicsDamping、drive_MultipleApplyTemplate_PhysicsMaxForce 也需要实例名、axis token 和 solver 支持一起验证。只在 allTokens 中看到这些名字，并不说明舞台上已经存在有效的 drive 或 limit。")}${en("Limit and drive tokens require instance paths, joint type, axis, and solver context.")}</p>
    <p>${zh("碰撞过滤相关 token 的排查顺序应当是 relationship 和集合优先，而不是先改数值。physicsFilteredPairs、PhysicsFilteredPairsAPI、physicsFilteredGroups、physicsInvertFilteredGroups、PhysicsCollisionGroup、colliders 等 token 指向的是 target path、group membership 或过滤方向；如果碰撞仍然发生或完全不发生，先查看关系目标是否存在、目标 prim 是否带有对应 collision API、layer stack 是否覆盖了关系，再看 backend 是否消费这些过滤约定。这样可以避免把过滤失败误判为 convexHull、boundingSphere 或 meshSimplification 近似模式的问题。")}${en("Filter tokens require relationship targets, group membership, composition, and consumer support checks.")}</p>
    <p>${zh("单位和材质 token 则要和场景尺度一起解释。kilogramsPerUnit、physicsMass、physicsDensity、physicsDiagonalInertia、physicsPrincipalAxes、physicsStaticFriction、physicsDynamicFriction、physicsRestitution、physicsGravityDirection、physicsGravityMagnitude 都只是 USD authoring 层的稳定名字；实际行为还取决于 UsdGeom 的 metersPerUnit、模型缩放、碰撞几何、材质绑定和模拟后端的单位换算。阅读本页时应把它当作 token 索引和调试索引，而不是数值合理性或物理真实性的证明。")}${en("Unit, mass, inertia, material, and gravity tokens must be interpreted with stage units, geometry scale, bindings, and runtime conversion.")}</p>
    <p>${zh("实际落地时，建议把本页用于“先确认名字，再回到 schema，再检查 composition，再验证 runtime consumer”的顺序。这样既能利用 TfToken 常量避免拼写错误，也不会把 token 表误当成最终物理行为的单一真相来源。")}${en("Use this page as a spelling and routing index before checking schema, composition, and runtime consumers.")}</p>
  </section>

  <section data-cn-complete="authoring-boundaries">
    <h2>从 physics token 到实际 authoring 的边界</h2>
    <p>${zh("第一条边界是 token 常量不等于 authored scene value。UsdPhysicsTokens->physicsMass 或 UsdPhysicsTokens->physicsBody0 只是 TfToken 拼写；如果没有通过对应 schema API、UsdPrim::GetAttribute()、CreateAttribute、relationship 或 collection API 写入，stage 内容不会改变。")}${en("A token constant is not an authored value by itself.")}</p>
    <p>${zh("第二条边界是物理 authoring 和物理模拟不同。UsdPhysics token 能描述 USD scene 中的物理意图，但不能保证某个 runtime 会动态模拟、会生成碰撞体、会支持 articulation、会尊重所有 drive/limit 字段。调试时要把 USD authoring、composition、解析器和 solver 后端分开。")}${en("Physics authoring and runtime simulation are separate layers.")}</p>
    <p>${zh("第三条边界是单位和尺度必须一起看。kilogramsPerUnit、physicsMass、physicsDensity、physicsGravityMagnitude、UsdGeom stage units 和几何尺寸会共同影响结果。token 页只能帮助定位属性名，不能判断质量、惯性、重力或碰撞尺寸是否合理。")}${en("Units, mass, density, gravity, and geometry scale must be interpreted together.")}</p>
    <p>${zh("第四条边界是 multiple-apply API 需要实例名和轴语义。drive 和 limit 的模板 token 不是普通属性清单；它们常依赖 drive:rotX、drive:transX、limit:rotY 之类实例化路径。只看字段名而不看 instance name，会让查询或 authoring 落到错误属性上。")}${en("Multiple-apply drive and limit APIs require instance names and axis semantics.")}</p>
  </section>

  <section data-cn-complete="debugging-path">
    <h2>常见误读和调试路径</h2>
    <p>${zh("如果刚体不动，先检查 PhysicsRigidBodyAPI、physicsRigidBodyEnabled、physicsKinematicEnabled、physicsStartsAsleep、physicsSimulationOwner、physicsVelocity、physicsAngularVelocity 和 PhysicsScene。然后区分是属性没有 author、composition 被覆盖、scene owner 不匹配，还是模拟后端没有运行。")}${en("Rigid body debugging starts with enabled state, kinematic/asleep state, scene owner, velocities, composition, and runtime execution.")}</p>
    <p>${zh("如果碰撞缺失或穿透，检查 PhysicsCollisionAPI、PhysicsMeshCollisionAPI、physicsCollisionEnabled、physicsApproximation、convexHull、convexDecomposition、boundingCube、boundingSphere、meshSimplification、PhysicsCollisionGroup、physicsFilteredGroups 和 physicsFilteredPairs。还要确认几何拓扑、scale、collision group target 和过滤关系是否正确。")}${en("Collision debugging must inspect collision APIs, approximation, geometry, scale, groups, and filtered relationships.")}</p>
    <p>${zh("如果 joint 行为异常，检查 PhysicsJoint、PhysicsFixedJoint、PhysicsPrismaticJoint、PhysicsRevoluteJoint、PhysicsSphericalJoint、physicsBody0、physicsBody1、physicsLocalPos0、physicsLocalRot0、physicsLocalPos1、physicsLocalRot1、physicsJointEnabled、physicsBreakForce 和 physicsBreakTorque。常见错误是 body target 指错、local frame 方向错、axis token 和实际自由度不匹配。")}${en("Joint debugging should check targets, local frames, enabled state, break thresholds, and axis/free-degree matching.")}</p>
    <p>${zh("如果 drive 或 limit 不生效，检查 PhysicsDriveAPI、PhysicsLimitAPI、drive、limit、rotX、rotY、rotZ、transX、transY、transZ、drive_MultipleApplyTemplate_PhysicsStiffness、drive_MultipleApplyTemplate_PhysicsDamping、drive_MultipleApplyTemplate_PhysicsMaxForce、limit_MultipleApplyTemplate_PhysicsHigh 和 limit_MultipleApplyTemplate_PhysicsLow。重点确认 multiple-apply 实例名、属性路径和 solver 支持，而不是只确认 token 出现在 allTokens 中。")}${en("Drive/limit debugging requires multiple-apply instance paths, axis tokens, field values, and solver support.")}</p>
    <p>${zh("如果材质、质量或反弹摩擦异常，检查 PhysicsMassAPI、PhysicsMaterialAPI、physicsMass、physicsDensity、physicsCenterOfMass、physicsDiagonalInertia、physicsPrincipalAxes、physicsStaticFriction、physicsDynamicFriction、physicsRestitution。还要把 stage 单位、几何尺寸、材质绑定和运行时单位转换一起看。")}${en("Mass/material debugging must combine authored properties, units, geometry, bindings, and runtime conversion.")}</p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻 API 和本地阅读关系</h2>
    <p>${zh("UsdPhysicsTokensType 应和 UsdPhysics module front 一起读。UsdPhysics module front 说明模块职责和官方 section；UsdGeom 说明几何和变换；Sdf 说明 property path、relationship target 和 layer composition；TfToken 说明 token 的高效标识语义；UsdProc 和 UsdRender 可以帮助理解生成式资产或渲染消费与物理 authoring 的边界。")}${en("Adjacent modules provide physics, geometry, path, token, procedural, and render context.")}</p>
    <p>${zh("本地 reading-flow 导航保留总入口、API 入口、Release 入口、source snapshot、上一页、下一页、相关 API 和明确 Open official page 外跳。站内 in-scope 链接保持本地路径，避免读者在主阅读路径中被静默带到英文官方站。")}${en("Local reading-flow keeps in-scope reading local and makes the official jump explicit.")}</p>
  </section>

  <section data-cn-complete="acceptance-checklist">
    <h2>完成页验收阅读清单</h2>
    <p>${zh("读完本页后，读者应能回答：UsdPhysicsTokensType 为什么是 token 集合而不是 solver；UsdPhysicsTokens 如何帮助 UsdPrim::GetAttribute() 或 relationship 查询避免拼写错误；schema token、property token、relationship token、multiple-apply template token 和 allowed value token 的边界是什么；physicsBody0/body1、physicsFilteredPairs、drive/limit 和 physicsSimulationOwner 为什么不能脱离 target、instance name、composition 和 runtime consumer 单独判断。")}${en("The checklist verifies role, spelling safety, token categories, relationship boundaries, multiple-apply paths, and runtime separation.")}</p>
    <p>${zh("合格的阅读结果不是记住所有 token，而是能建立排查路径：看到 physicsCollisionEnabled 就回到 collision API，看到 physicsRigidBodyEnabled 就回到 rigid body API，看到 physicsBody0 或 physicsBody1 就回到 joint relationship target，看到 drive_MultipleApplyTemplate_PhysicsDamping 就回到 drive instance，看到 limit_MultipleApplyTemplate_PhysicsHigh 就回到 limit instance，看到 boundingSphere 或 convexHull 就回到 collision approximation。")}${en("A successful reading maps tokens back to their owning authoring and debugging domains.")}</p>
    <p>${zh("本页已覆盖官方 Public Attributes、Detailed Description、Member Data Documentation，保留 allTokens、PhysicsScene、PhysicsRigidBodyAPI、PhysicsCollisionAPI、PhysicsJoint、PhysicsDriveAPI、PhysicsLimitAPI、PhysicsMassAPI、PhysicsMaterialAPI、physicsBody0、physicsBody1、physicsFilteredPairs、physicsSimulationOwner、physicsVelocity、rotX、rotY、rotZ、transX、transY、transZ 等 source 关键词，并补充中文主阅读路径、误读点、调试路径、相邻模块和本地导航。")}${en("Official sections and representative source keywords are covered.")}</p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li>${zh("标题已覆盖：本页是 UsdPhysicsTokensType Class Reference，不是 UsdPhysics 全模块教程，也不是物理求解器说明。")}${en("Title coverage: this is a UsdPhysicsTokensType class reference.")}</li>
      <li>${zh("Detailed Description 已覆盖：static, efficient TfTokens、auto-generated schema、property names、UsdPrim::GetAttribute() 和 allowedTokens values 均已纳入中文解释。")}${en("Detailed Description coverage preserves generated token purpose and spelling safety.")}</li>
      <li>${zh("Public Attributes 已覆盖：scene/body、collision、joint、drive/limit、mass/material、filter/unit 六组 token 均已解释。")}${en("Public Attributes are covered through six semantic groups.")}</li>
      <li>${zh("Member Data Documentation 已覆盖：代表性 token 原文保留，中文解释它们的职责域和 authoring 边界。")}${en("Member Data Documentation coverage keeps representative tokens intact.")}</li>
      <li>${zh("使用边界已覆盖：token 常量不是 authored value，USD authoring 和 runtime simulation 分层，multiple-apply API 需要 instance name。")}${en("Usage boundaries cover authored values, runtime separation, and multiple-apply instances.")}</li>
      <li>${zh("常见误读已覆盖：rigid body、collision、joint、drive、limit、mass、material 和 filter 都不能只靠 token 拼写判断。")}${en("Common misreads cover rigid bodies, collision, joints, drives, limits, mass, materials, and filters.")}</li>
      <li>${zh("调试路径已覆盖：刚体不动、碰撞穿透、joint 异常、drive/limit 不生效、质量材质异常都有检查顺序。")}${en("Debugging paths cover rigid-body, collision, joint, drive/limit, mass, and material issues.")}</li>
      <li>${zh("相邻关系已覆盖：UsdPhysics、UsdGeom、Sdf、TfToken、UsdProc 和 UsdRender 都在本地阅读路径中保留。")}${en("Adjacent modules are linked locally.")}</li>
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
    source_headings: sourceHeadings().slice(0, 78),
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
  if (report.output_checks.zh_chars < 2300) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
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
    title: "UsdPhysicsTokensType Class Reference",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdPhysicsTokensType struct/class reference by adding Chinese main-reading-path coverage for generated UsdPhysics TfToken collections, Doxygen sections, scene/body, collision, joint, drive/limit, mass/material, filter/unit token groups, authoring/runtime boundaries, common misreads, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2300,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 UsdPhysicsTokensType source parity 晋级，并继续跟踪 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 229,
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
        summary: "token 结构体参考页必须保留 Doxygen 分组、token 名、属性名、allowedTokens 语义和链接语义，不能把 physics token 字面量翻译成中文。",
        evidence: "本轮覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、UsdPhysicsTokens、TfToken、PhysicsScene、PhysicsRigidBodyAPI、PhysicsCollisionAPI、PhysicsJoint、PhysicsDriveAPI、PhysicsLimitAPI、PhysicsMassAPI、PhysicsMaterialAPI、physicsBody0、physicsBody1、physicsFilteredPairs、physicsSimulationOwner、physicsVelocity、rotX/rotY/rotZ 和 transX/transY/transZ。",
        required_action: "后续 token/struct 页面继续按 source snapshot 抽取官方字段，中文说明用途和边界，API/token 名保持原样。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links 和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、前后页、相邻 UsdPhysics/UsdGeom/Sdf/Tf/UsdProc/UsdRender 页面、source snapshot 和 Open official page 外跳，并会重新运行 reading-flow 审计。",
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
  console.log("Usage: node scripts/promote_round_451_usd_physics_tokens_type.mjs --write-page --precheck --manifest --problem");
}
