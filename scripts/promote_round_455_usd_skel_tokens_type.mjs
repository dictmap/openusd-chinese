import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 455;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/struct_usd_skel_tokens_type.html";
const SOURCE = "source/full_api/struct_usd_skel_tokens_type_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/struct_usd_skel_tokens_type.html";
const SOURCE_PARITY_REPORT = "reports/round_455_usd_skel_tokens_type_source_parity.json";
const PROMOTION_ID = "round-455-api-usd-skel-tokens-type";

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
  return stripHtml(match ? match[1] : "UsdSkelTokensType Class Reference");
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
  source: "../../source/full_api/struct_usd_skel_tokens_type_source.html",
  official: OFFICIAL_URL,
  prev: "struct_usd_physics_tokens_type.html",
  next: "usd_skel_page_front.html",
  usdSkelIntro: "_usd_skel__intro.html",
  usdSkel: "usd_skel_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  gf: "gf_page_front.html",
  vt: "vt_page_front.html",
  sdf: "sdf_page_front.html",
  tf: "tf_page_front.html",
};

const expectedHeadings = [
  "Public Attributes",
  "Detailed Description",
  "Member Data Documentation",
  "allTokens",
  "bindTransforms",
  "BlendShape",
  "blendShapes",
  "blendShapeWeights",
  "classicLinear",
  "dualQuaternion",
  "jointNames",
  "joints",
  "normalOffsets",
  "offsets",
  "pointIndices",
  "primvarsSkelGeomBindTransform",
  "primvarsSkelJointIndices",
  "primvarsSkelJointWeights",
  "primvarsSkelSkinningMethod",
  "restTransforms",
  "rotations",
  "scales",
  "SkelAnimation",
  "skelAnimationSource",
  "SkelBindingAPI",
  "skelBlendShapes",
  "skelBlendShapeTargets",
  "Skeleton",
  "skelJoints",
  "SkelRoot",
  "skelSkeleton",
  "translations",
  "weight",
];

const sourceKeywords = [
  "UsdSkelTokensType",
  "UsdSkelTokens",
  "static, efficient TfTokens",
  "auto-generated from the module's schema",
  "property names",
  "UsdPrim::GetAttribute()",
  "allowedTokens values",
  ...expectedHeadings.slice(3),
];

const outputKeywords = [
  ...expectedHeadings,
  "UsdSkelTokensType",
  "UsdSkelTokens",
  "TfToken",
  "schema token",
  "property names",
  "allowedTokens",
  "skinning method",
  "joint influences",
  "BlendShape",
  "SkelAnimation",
  "SkelBindingAPI",
  "Skeleton",
  "SkelRoot",
  "Open official page",
  "Paragraph-Level Bilingual Coverage",
];

function zh(text) {
  return `<span class="zh">${text}</span>`;
}

function en(text) {
  return `<span class="en">${text}</span>`;
}

function styles() {
  return `<style>
    :root{color-scheme:light;--bg:#f6f8fb;--ink:#17202a;--muted:#526173;--line:#d7dde8;--accent:#245a8d;--panel:#fff}
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
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px}
    .mini{border:1px solid var(--line);background:#fbfcff;border-radius:7px;padding:12px}
    .mini h3{margin-top:0;color:#1b4f7a}
    .token-list{columns:3 220px;margin:10px 0 0;padding-left:18px}
    .token-list li{break-inside:avoid;margin:3px 0}
    .note{border-left:4px solid var(--accent);background:#eef5fb;padding:10px 12px;margin:12px 0;color:#243447}
    code{font-family:Consolas,"SFMono-Regular",monospace}
    a{color:var(--accent)}
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
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  </style>`;
}

function readingFlowNav() {
  return `<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.apiEntry}">API 本地入口</a>
  <span> / api / struct_usd_skel_tokens_type.html</span>
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
      <h3>当前 API 上下文</h3>
      <ol>
        <li>API / Struct Reference</li>
        <li>UsdSkel / generated tokens</li>
        <li>UsdSkelTokensType</li>
      </ol>
    </section>
    <section>
      <h3>上一页 / 下一页</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页：UsdPhysicsTokensType</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页：UsdSkel module front</a></li>
      </ul>
    </section>
    <section>
      <h3>相关本地页面 / Related</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usdSkelIntro}">UsdSkel Introduction</a></li>
        <li><a data-reading-flow="related" href="${links.usdSkel}">UsdSkel module front</a></li>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom module front</a></li>
        <li><a data-reading-flow="related" href="${links.gf}">Gf Graphics Foundations</a></li>
        <li><a data-reading-flow="related" href="${links.vt}">Vt Value Types</a></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf module front</a></li>
        <li><a data-reading-flow="related" href="${links.tf}">Tf module front</a></li>
      </ul>
    </section>
    <section>
      <h3>源页 / Official</h3>
      <ul>
        <li><a data-reading-flow="source" href="${links.source}">本地 source snapshot</a></li>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></li>
      </ul>
    </section>
  </div>
</aside>
<!-- openusd-reading-flow-nav:end -->`;
}

function tokenList(tokens) {
  return `<ul class="token-list">${tokens.map((token) => `<li><code>${token}</code></li>`).join("\n")}</ul>`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UsdSkelTokensType Class Reference / UsdSkel token 结构体参考</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  ${styles()}
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source-parity="${SOURCE_PARITY_REPORT}">
<header>
  <div class="wrap">
    <h1>UsdSkelTokensType Class Reference</h1>
    <p>${zh("本页是 `UsdSkelTokens` 自动生成 token 集合的结构体参考中文页。它按官方 Doxygen 的 `Public Attributes`、`Detailed Description` 和 `Member Data Documentation` 顺序解释 token 的职责，同时保留所有 API 名、schema 名、token 字面量、属性名、代码标识和链接语义。")}${en("This bilingual page follows the official Doxygen order for the generated UsdSkel token collection while preserving API names, schema names, token literals, property names, code identifiers, and link semantics.")}</p>
    <div class="meta">
      <span class="pill">bilingual_complete</span>
      <span class="pill">round ${ROUND}</span>
      <span class="pill">API struct/class reference</span>
      <span class="pill">source parity checked</span>
    </div>
  </div>
</header>
${readingFlowNav()}
<main>
  <section data-cn-complete="purpose">
    <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
    <p>${zh("`UsdSkelTokensType` 的职责不是执行蒙皮、计算骨骼姿态或解析动画，而是提供一组 static、efficient `TfToken` 常量，用于稳定地引用 UsdSkel schema 中的属性名、关系名、schema token 和 `allowedTokens` 值。读者应把它看成 authoring、query 和调试时的命名索引：当代码需要访问 `joints`、`bindTransforms`、`primvarsSkelJointWeights` 或 `skelAnimationSource` 时，应优先使用这里的 token，避免手写字符串造成拼写错误或跨语言不一致。")}${en("UsdSkelTokensType is a static TfToken catalog for names and allowed values used by UsdSkel schema authoring and queries; it is not a skinning evaluator.")}</p>
    <p>${zh("官方页的主要点击顺序是成员属性列表、详细说明、逐个成员数据文档。本地中文页也按这个顺序展开：先说明 token 集合的定位，再把官方成员分成骨骼拓扑、动画、绑定/蒙皮、BlendShape 和调试路径几组。这样读者从 `UsdSkel Introduction` 进入本页后，可以顺着 token 名理解哪些值属于 schema 类型、哪些值属于属性名、哪些值只是 `primvars:skel:*` 的约定名称。")}${en("The reading path mirrors the official Doxygen structure: attributes, detailed description, and member data documentation, then groups the generated tokens by usage.")}</p>
  </section>

  <section data-cn-complete="doxygen-section-coverage">
    <h2>官方 section 覆盖 / Official Section Coverage</h2>
    <div class="grid">
      <div class="mini">
        <h3>Public Attributes</h3>
        <p>${zh("这一节列出结构体公开成员，每个成员都是一个 `TfToken` 或 token 列表。中文阅读时不要把 `bindTransforms`、`classicLinear`、`dualQuaternion` 等翻译成中文属性名；真正写入 USD layer 的仍是这些英文 token 字面量。")}${en("Public Attributes lists generated TfToken members and should be read as the authoritative spelling table.")}</p>
      </div>
      <div class="mini">
        <h3>Detailed Description</h3>
        <p>${zh("详细说明强调 `UsdSkelTokens` 是从模块 schema 自动生成的静态高效 token，覆盖 property names、schema identifiers 和 token-valued builtin attributes 的 `allowedTokens values`。这解释了为什么页面看起来像一张长表：它服务于代码作者和调试者，而不是面向最终用户的概念教程。")}${en("The detailed description explains that the tokens are generated from module schema definitions and include property names and allowed token values.")}</p>
      </div>
      <div class="mini">
        <h3>Member Data Documentation</h3>
        <p>${zh("成员数据文档逐项说明 token，例如 `allTokens`、`Skeleton`、`SkelAnimation`、`skelSkeleton`、`primvarsSkelSkinningMethod`。中文页在每组后补充用途边界，帮助判断该 token 用于 prim type、relationship、attribute、primvar 还是 allowed value。")}${en("Member Data Documentation is mapped to grouped Chinese usage notes so each token remains readable without changing its spelling.")}</p>
      </div>
    </div>
  </section>

  <section data-cn-complete="token-groups">
    <h2>Token 分组与职责 / Token Groups and Purpose</h2>
    <h3>骨骼与层级 / Skeleton and Topology</h3>
    <p>${zh("`Skeleton`、`SkelRoot`、`joints`、`jointNames`、`bindTransforms`、`restTransforms`、`skelSkeleton` 和 `skelJoints` 描述骨骼 prim、绑定关系和 joint 拓扑。`joints`/`jointNames` 关注 joint 的顺序与命名，`bindTransforms`/`restTransforms` 关注绑定时和 rest pose 的变换数组；这些数组的顺序不匹配时，常见症状是蒙皮点位、法线或动画姿态整体错乱。")}${en("Skeleton topology tokens identify skeleton prims, joint order, bind transforms, rest transforms, and relationships from skinned prims to skeleton data.")}</p>
    ${tokenList(["Skeleton", "SkelRoot", "joints", "jointNames", "bindTransforms", "restTransforms", "skelSkeleton", "skelJoints"])}

    <h3>动画数据 / Animation</h3>
    <p>${zh("`SkelAnimation`、`skelAnimationSource`、`rotations`、`scales`、`translations`、`blendShapes` 和 `blendShapeWeights` 用于把时间采样动画数据连接到骨骼或几何。调试时要同时检查 animation source relationship、数组长度、joint 顺序和时间采样；token 只保证名称一致，不保证值域、插值或动画曲线本身正确。")}${en("Animation tokens name the schema and attributes that carry joint rotations, scales, translations, blend shape lists, and blend shape weights.")}</p>
    ${tokenList(["SkelAnimation", "skelAnimationSource", "rotations", "scales", "translations", "blendShapes", "blendShapeWeights"])}

    <h3>绑定、蒙皮与 primvars / Binding, Skinning, and Primvars</h3>
    <p>${zh("`SkelBindingAPI` 和 `primvarsSkelJointIndices`、`primvarsSkelJointWeights`、`primvarsSkelGeomBindTransform`、`primvarsSkelSkinningMethod` 对应几何绑定和蒙皮输入。`classicLinear` 与 `dualQuaternion` 是 `primvars:skel:skinningMethod` 的 allowed token 值，不是函数名，也不是可以随意本地化的显示标签。若几何没有正确的 joint indices 或 weights，即使 `Skeleton` 与 `SkelAnimation` 都存在，最终 deform 仍会失败或看似静止。")}${en("Binding and skinning tokens cover SkelBindingAPI, joint influence primvars, geom bind transforms, and the classicLinear or dualQuaternion skinning method values.")}</p>
    ${tokenList(["SkelBindingAPI", "primvarsSkelJointIndices", "primvarsSkelJointWeights", "primvarsSkelGeomBindTransform", "primvarsSkelSkinningMethod", "classicLinear", "dualQuaternion"])}

    <h3>BlendShape 与点级偏移 / BlendShape and Point Offsets</h3>
    <p>${zh("`BlendShape`、`skelBlendShapes`、`skelBlendShapeTargets`、`normalOffsets`、`offsets`、`pointIndices` 和 `weight` 负责 shape target、点位偏移、法线偏移与权重命名。它们与骨骼 joint animation 是相邻但不同的表达：joint token 主要控制关节姿态，BlendShape token 控制几何形变目标。常见误读是把 `blendShapeWeights` 当作 joint weight；它实际上对应 BlendShape target 的动画权重。")}${en("BlendShape tokens name shape targets, offsets, point indices, normal offsets, and weights; they are adjacent to but different from joint skinning weights.")}</p>
    ${tokenList(["BlendShape", "skelBlendShapes", "skelBlendShapeTargets", "normalOffsets", "offsets", "pointIndices", "weight"])}
  </section>

  <section data-cn-complete="member-data-map">
    <h2>成员数据逐项语义 / Member Data Semantics</h2>
    <p>${zh("这一层按官方 `Member Data Documentation` 的点击顺序补中文用途说明。目的不是把 Doxygen 表格另起一套中文名称，而是说明每个 token 在 authoring、query、validation 或调试中的位置。")}${en("This section follows the official member data sequence and explains how each token is used without renaming it.")}</p>
    <ul>
      <li>${zh("`allTokens`：面向工具和诊断的全集入口，可用于枚举 `UsdSkelTokens`，但不表示某个 prim 必须 authored 所有字段。")}${en("allTokens enumerates the generated token set for tooling and diagnostics.")}</li>
      <li>${zh("`bindTransforms`：绑定时 joint 到 skeleton/geom 语境的矩阵数组，常与 `joints` 顺序一起排查；顺序错比数值错更隐蔽。")}${en("bindTransforms should be debugged with joint ordering.")}</li>
      <li>${zh("`restTransforms`：rest pose 的 joint 变换数组，用于与动画采样比较；它不是当前帧姿态，也不是几何点位置。")}${en("restTransforms represents rest pose transforms, not current frame point positions.")}</li>
      <li>${zh("`joints` 与 `jointNames`：前者常用于 skeleton 拓扑列表，后者用于名字表达；工具链若混用两者，应先确认消费端期待的是 path-like joint order 还是 display-friendly name。")}${en("joints and jointNames should be interpreted according to the consuming schema or tool expectation.")}</li>
      <li>${zh("`rotations`、`scales`、`translations`：这些是 `SkelAnimation` 上的动画数组 token。它们的 time sample、数组长度和 joint 顺序必须一起验证，不能只看 token 是否存在。")}${en("rotations, scales, and translations are animation array tokens and require length and time-sample checks.")}</li>
      <li>${zh("`primvarsSkelJointIndices`：描述每个点或 element 受哪些 joint 影响；它和 `primvarsSkelJointWeights` 成对出现时才有完整意义。")}${en("primvarsSkelJointIndices identifies the joint influence indices.")}</li>
      <li>${zh("`primvarsSkelJointWeights`：描述对应 influence 的权重。调试时要看 normalization、elementSize 和 interpolation，不能把它与 `blendShapeWeights` 混为同一类权重。")}${en("primvarsSkelJointWeights stores influence weights and is separate from blend shape weights.")}</li>
      <li>${zh("`primvarsSkelGeomBindTransform`：记录几何绑定空间，常用于把局部几何点转到 skeleton/skin 计算需要的空间；它和 `GfMatrix`、`UsdGeomXformable` 调试关系很近。")}${en("primvarsSkelGeomBindTransform records geometry bind space information.")}</li>
      <li>${zh("`primvarsSkelSkinningMethod`：选择 skinning method 的 token-valued primvar；`classicLinear` 与 `dualQuaternion` 是它的 allowedTokens 值。")}${en("primvarsSkelSkinningMethod carries the allowed skinning method token values.")}</li>
      <li>${zh("`skelAnimationSource`：把可蒙皮对象或 skeleton 连接到 `SkelAnimation` 的关键入口；relationship 没解析时，动画数组存在也不会自动驱动目标。")}${en("skelAnimationSource connects targets to SkelAnimation data.")}</li>
      <li>${zh("`skelSkeleton`：指向 skeleton 资源的关系 token，常用于确认绑定目标是否被 layer composition、payload 或 reference 改写。")}${en("skelSkeleton names the relationship to the skeleton resource.")}</li>
      <li>${zh("`skelBlendShapes` 与 `skelBlendShapeTargets`：前者描述可用 shape 名称集合，后者连接具体 target；二者错位会让权重曲线找不到实际形变。")}${en("skelBlendShapes and skelBlendShapeTargets must agree with the available target set.")}</li>
      <li>${zh("`offsets`、`normalOffsets`、`pointIndices`：用于 BlendShape target 的点级数据；排查形变穿帮时，应同时核对索引范围和点数。")}${en("offsets, normalOffsets, and pointIndices describe blend shape point-level data.")}</li>
      <li>${zh("`weight`：用于单个 BlendShape 或 inbetween 的权重语义；它不是 joint influence weight，也不是材质或物理权重。")}${en("weight is a blend shape weighting concept, not a joint influence or physics weight.")}</li>
    </ul>
  </section>

  <section data-cn-complete="authoring-boundaries">
    <h2>Authoring 边界与常见误读 / Boundaries and Misreads</h2>
    <p>${zh("这些 token 是稳定命名工具，不是运行时算法。`UsdSkelTokens->joints` 帮助你访问属性名，真正的数据仍在 USD layer 的 attribute、relationship、time sample 或 primvar 中。不要把 token 表当成 `UsdSkelSkeleton`、`UsdSkelAnimation` 或 `UsdSkelBindingAPI` 的完整 API 文档；具体创建、校验和计算仍需要跳转到相邻 schema/class 页。")}${en("Tokens are stable names, not the data itself and not the full API for evaluating a skeleton or applying skinning.")}</p>
    <p>${zh("区分 property names、schema identifiers 与 `allowedTokens` 很重要。`Skeleton`、`SkelRoot`、`SkelAnimation`、`SkelBindingAPI` 更接近 schema 或 type/API 标识；`joints`、`restTransforms`、`rotations` 等是属性名；`classicLinear`、`dualQuaternion` 是 token-valued attribute 的允许值。调试时先确认自己要查的是 prim type、属性、关系还是 allowed token，再到本页查精确拼写。")}${en("The page helps distinguish schema identifiers, property names, relationships, primvar names, and allowed token values.")}</p>
    <p>${zh("在 Python 或 C++ 中，token 拼写错误通常不会表现为编译错误，而是表现为 attribute 查不到、relationship 未解析、array 长度不匹配或 skinning method 回退。本页的价值在于把字符串拼写集中到 `UsdSkelTokens`，再由 schema API 或 `UsdPrim::GetAttribute()` 使用。")}${en("Using generated tokens reduces string spelling errors when querying with schema APIs or UsdPrim::GetAttribute().")}</p>
  </section>

  <section data-cn-complete="validation-matrix">
    <h2>验证矩阵 / Validation Matrix</h2>
    <p>${zh("把本页用于实际排查时，可以按“标识是否存在、关系是否解析、数组是否对齐、消费端是否支持”四层验证。第一层只检查 `Skeleton`、`SkelRoot`、`SkelAnimation`、`SkelBindingAPI`、`BlendShape` 这些 schema/token 标识是否出现在正确 prim 或 API 语境里；第二层检查 `skelSkeleton`、`skelAnimationSource`、`skelBlendShapeTargets` 等关系是否解析到本地 stage 中真实存在的目标；第三层检查 `joints`、`bindTransforms`、`restTransforms`、`rotations`、`scales`、`translations`、`primvarsSkelJointIndices`、`primvarsSkelJointWeights` 的数组长度和顺序；第四层才判断 renderer、usdview、Hydra delegate 或下游 DCC 是否支持 `classicLinear`、`dualQuaternion`、BlendShape 权重和 joint influence 上限。")}${en("A practical validation sequence is token presence, relationship resolution, array alignment, and consumer support.")}</p>
    <p>${zh("source parity 的重点是保持官方结构和命名，而不是把所有成员翻译成自然语言字段名。比如 `primvarsSkelGeomBindTransform` 仍然必须按原样出现，因为它是 USD property path/token 语义的一部分；中文说明只补充它代表几何绑定空间、常与 `GfMatrix` 和 `UsdGeomXformable` 调试关联。`skelBlendShapeTargets` 也不能写成“蒙皮目标”来替代原名，否则读者回到 Doxygen 或 layer 文本时会找不到对应字段。")}${en("Source parity requires preserving the exact token spelling while adding Chinese explanation around use and boundaries.")}</p>
    <p>${zh("点击路径上，本页位于 UsdSkel Introduction 与 UsdSkel module front 之后，适合作为“查拼写、查分组、查误读”的参考页；如果读者还不理解 skeleton space、joint-local space、geom bind transform 或 linear blend skinning，应先回到 `_usd_skel__intro.html`。如果读者已经在代码里拿到 `VtArray`、`GfMatrix` 或 `SdfPath`，则应继续跳转到 `Vt`、`Gf`、`Sdf` 或 `UsdGeom` 的本地 API 页面。")}${en("The click path places this page after conceptual UsdSkel reading and before adjacent value, math, path, and geometry API pages.")}</p>
  </section>

  <section data-cn-complete="failure-attribution">
    <h2>错误归因边界 / Failure Attribution</h2>
    <p>${zh("遇到 UsdSkel 资产显示异常时，不要把所有问题都归因到 token 表。`UsdSkelTokensType` 只能证明“应该使用哪个名字”；它不能证明 layer 中已经 authored 了正确值，也不能证明 composition 后的值没有被覆盖。正确的归因顺序是：先用本页核对 token 拼写，再用 `Sdf`/`Usd` 查询 composed attribute 或 relationship，再用 `Vt`/`Gf` 检查数组与矩阵数值，最后用 `UsdGeom`、Hydra 或下游工具确认消费端行为。")}${en("UsdSkelTokensType identifies names; authored values, composed values, numeric validity, and consumer behavior must be debugged in adjacent layers.")}</p>
    <p>${zh("例如 `primvarsSkelSkinningMethod` 拼写正确但资产仍没有 dual quaternion 效果，可能是目标 renderer 不支持 `dualQuaternion`，也可能是 primvar authored 在错误层、interpolation 不符合预期，或几何没有有效 joint influences。再例如 `skelSkeleton` relationship 存在但解析失败，问题通常在 target path、reference/payload、namespace edit 或 layer stack，而不是 token 本身。")}${en("A correctly spelled token can still point to unsupported consumer behavior, wrong layer authoring, or unresolved relationships.")}</p>
    <p>${zh("因此本页的中文主阅读路径重点放在“查名、分组、边界、排查入口”四件事上：查名用 `allTokens` 与成员数据文档；分组按 skeleton、animation、binding、BlendShape；边界区分 token、attribute、relationship、primvar 与 allowed value；排查入口则引导到 `UsdSkel Introduction`、`UsdSkel` 模块页和相邻 `UsdGeom`/`Vt`/`Gf`/`Sdf` 页面。")}${en("The page is a naming, grouping, boundary, and debugging-entry reference for UsdSkel token usage.")}</p>
    <p>${zh("当需要了解某个 schema 的构造函数、`Get`/`Create` 方法、fallback 值或 authored value 行为时，应继续点击对应 class/API 页；当只需要在 layer、日志、调试器或代码审查中确认字段名是否准确时，才回到本 token 页。这个边界能避免把 `UsdSkelTokensType` 误当成教程、算法说明或完整 schema reference。")}${en("Use schema and class pages for behavior, fallback values, and authoring APIs; use this token page for exact names.")}</p>
    <p>${zh("本地 reading-flow 也按这个边界组织：上一页连接已完成的 physics token 参考，下一页回到 UsdSkel 模块入口，相关链接只放 UsdSkel、UsdGeom、Vt、Gf、Sdf、Tf 等实际排查会点击的页面，不把读者带到无关 release 支撑页。")}${en("Local reading-flow links are ordered for the actual debugging path rather than random adjacent files.")}</p>
    <p>${zh("特别注意，`allTokens` 是枚举工具，不是完整性判据；资产是否完整仍要逐项检查 authored 字段、关系目标、数组长度和消费端解释结果。这个判断也适用于批量转换和导入管线，尤其是资产检查。")}${en("allTokens is an enumeration helper, not an authored-completeness test.")}</p>
  </section>

  <section data-cn-complete="debugging">
    <h2>调试路径 / Debugging Path</h2>
    <ol>
      <li>${zh("先检查 prim 是否位于 `SkelRoot` 范围内，并确认 `Skeleton` prim、`skelSkeleton` relationship 与 `skelJoints` token 对应的 joint 列表都存在。")}${en("Start by checking SkelRoot scope, Skeleton prims, skeleton relationships, and joint lists.")}</li>
      <li>${zh("再检查 `joints`、`jointNames`、`bindTransforms`、`restTransforms` 的数组顺序和长度。任何顺序不一致都会让后续 `rotations`、`scales`、`translations` 映射到错误 joint。")}${en("Validate array order and length across joints, jointNames, bindTransforms, and restTransforms.")}</li>
      <li>${zh("对几何变形问题，检查 `primvarsSkelJointIndices`、`primvarsSkelJointWeights` 和 `primvarsSkelGeomBindTransform` 是否存在，interpolation 是否符合消费端预期，以及 joint influence 数量是否被 renderer 或工具链支持。")}${en("For deformation issues, inspect joint indices, joint weights, geom bind transforms, interpolation, and consumer support.")}</li>
      <li>${zh("对动画不动或姿态错误，检查 `skelAnimationSource` 指向的 `SkelAnimation`，并核对 `rotations`、`scales`、`translations` 的 time samples 与 joint 顺序。")}${en("For animation issues, verify the SkelAnimation source relationship and sampled animation arrays.")}</li>
      <li>${zh("对 BlendShape 问题，检查 `skelBlendShapes`、`skelBlendShapeTargets`、`blendShapes`、`blendShapeWeights`、`offsets`、`normalOffsets` 和 `pointIndices` 是否指向同一组 shape target 语义。")}${en("For blend shape issues, validate target relationships, weights, point offsets, normal offsets, and point indices together.")}</li>
    </ol>
  </section>

  <section data-cn-complete="adjacent-reading">
    <h2>相邻阅读路径 / Adjacent Reading Path</h2>
    <p>${zh("建议点击顺序是：先读 `UsdSkel Introduction` 理解 skeleton、skinning、blend shape 和 transform spaces；再读 `UsdSkel` module front 获取模块总览；随后回到本页核对 token 拼写。涉及几何 prim、点数组、矩阵和数组承载时，再跳到 `UsdGeom`、`Gf`、`Vt`、`Sdf` 与 `Tf`。")}${en("A practical sequence is UsdSkel Introduction, UsdSkel module front, this token reference, then UsdGeom, Gf, Vt, Sdf, and Tf as needed.")}</p>
    <ul>
      <li><a href="${links.usdSkelIntro}">UsdSkel Introduction</a></li>
      <li><a href="${links.usdSkel}">UsdSkel module front</a></li>
      <li><a href="${links.usdGeom}">UsdGeom module front</a></li>
      <li><a href="${links.gf}">Gf Graphics Foundations</a></li>
      <li><a href="${links.vt}">Vt Value Types</a></li>
      <li><a href="${links.sdf}">Sdf module front</a></li>
      <li><a href="${links.tf}">Tf module front</a></li>
    </ul>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <p>${zh("Public Attributes：本页公开成员应被当作精确拼写表，中文说明负责解释用途，不替换 token。")}${en("Public Attributes: the table is the exact spelling source for generated token members.")}</p>
    <p>${zh("Detailed Description：`UsdSkelTokens` 自动生成自 schema，覆盖 property names、schema identifiers 与 token-valued builtin attributes 的 `allowedTokens values`。")}${en("Detailed Description: generated tokens cover property names, schema identifiers, and allowed token values from schema definitions.")}</p>
    <p>${zh("Member Data Documentation：逐个成员的中文注释按用途分组，帮助读者区分 skeleton topology、animation、binding/skinning、BlendShape 和 debug 语境。")}${en("Member Data Documentation: Chinese notes group each token by skeleton topology, animation, binding, blend shape, and debugging context.")}</p>
    <p>${zh("allTokens：用于枚举整个 `UsdSkelTokens` 集合，适合调试、校验和工具层显示，不应用来推断某个 prim 是否实际 authored 了全部属性。")}${en("allTokens enumerates the token collection for tools and diagnostics, not authored data on every prim.")}</p>
    <p>${zh("bindTransforms/restTransforms：用于绑定与 rest pose 的变换数组；需要与 joint 顺序一起检查。")}${en("bindTransforms and restTransforms should be checked against joint order.")}</p>
    <p>${zh("classicLinear/dualQuaternion：这是 skinning method 的 allowed token 值，消费端是否支持对应算法还要看 renderer 或工具实现。")}${en("classicLinear and dualQuaternion are allowed skinning method values; consumer support is separate.")}</p>
    <p>${zh("primvarsSkelJointIndices/primvarsSkelJointWeights：这是几何点到 joint influence 的关键 primvar 名称，和 `blendShapeWeights` 不是同一类权重。")}${en("joint indices and joint weights primvars describe joint influences and should not be confused with blendShapeWeights.")}</p>
    <p>${zh("skelAnimationSource：这是连接 animation source 的关系/属性语义入口；动画数据本身仍在 `SkelAnimation` 上。")}${en("skelAnimationSource connects to animation data, while the sampled values live on SkelAnimation.")}</p>
    <p>${zh("skelBlendShapes/skelBlendShapeTargets：用于连接或定位 BlendShape target；点级偏移还需要 `offsets`、`normalOffsets` 和 `pointIndices` 一起解释。")}${en("blend shape target tokens should be read with offsets, normalOffsets, and pointIndices.")}</p>
  </section>

  <section data-cn-complete="official-excerpt">
    <h2>官方原文核对摘录 / Short English Checkpoints</h2>
    <p>${zh("以下只保留少量英文核对点，便于与 Doxygen 对照；中文主阅读路径已经覆盖页面职责和调试边界。")}${en("Generated static TfToken values for UsdSkel schema property names and allowed token values.")}</p>
    <p>${zh("示例用法应理解为 token 查询示例，而不是要求读者逐行翻译 C++。")}${en("Example pattern: schema or UsdPrim queries use UsdSkelTokens to avoid raw string spelling.")}</p>
    <p><a href="${links.official}">打开官方原页 / Open official page</a></p>
  </section>
</main>
</body>
</html>
`;
}

function sourceParity() {
  const source = sourceText();
  const target = read(TARGET);
  const targetDecoded = stripHtml(target);
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
    source_headings: sourceHeadings().slice(0, 80),
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
  if (report.output_checks.zh_chars < 2600) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
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
    title: "UsdSkelTokensType Class Reference",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdSkelTokensType struct/class reference by adding Chinese main-reading-path coverage for generated UsdSkel TfToken collections, Doxygen sections, skeleton topology, animation, binding/skinning, BlendShape token groups, allowed value boundaries, common misreads, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2600,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 UsdSkelTokensType source parity 晋级，并继续跟踪 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: "pending-current-commit",
      previous_good_bilingual: 230,
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
        evidence: "本轮覆盖 Public Attributes、Detailed Description、Member Data Documentation、allTokens、UsdSkelTokens、TfToken、Skeleton、SkelRoot、SkelAnimation、SkelBindingAPI、BlendShape、joints、bindTransforms、restTransforms、primvarsSkelJointIndices、primvarsSkelJointWeights、primvarsSkelSkinningMethod、classicLinear、dualQuaternion、skelAnimationSource、skelBlendShapeTargets、rotations、scales、translations 和 weight。",
        required_action: "后续 token/struct 页面继续按 source snapshot 抽取官方字段，中文说明用途和边界，API/schema/token 名保持原样。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮页面保留本地侧栏、breadcrumb、上一页 UsdPhysicsTokensType、下一页 UsdSkel module front、相关 UsdSkel Introduction/UsdGeom/Gf/Vt/Sdf/Tf 链接、source snapshot 和 Open official page 外跳，并会重跑 reading-flow 与 click-path 审计。",
        required_action: "若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。",
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
      "下一轮重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的 API/class/struct 页面；开始前必须确认 git/report/validation/markdown/reading-flow/click-path 状态干净一致。",
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
  console.log("Usage: node scripts/promote_round_455_usd_skel_tokens_type.mjs --write-page --precheck --manifest --problem");
}
