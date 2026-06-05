import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-usd-schema-quality-pass-061";

const refinements = [
  {
    output: "full_site/api/usd_shade_page_front.html",
    title: "UsdShade: USD Shading Schema",
    notes: [
      "`UsdShade: USD Shading Schema` 是 USD 中创建、封装和绑定 materials 与 shading networks 的核心入口；它描述网络结构和材质绑定语义，而不是实现某个渲染器的 shader 执行。",
      "阅读主线应从 `UsdShadeNodeGraph`、`UsdShadeMaterial`、`UsdShadeShader` 三类对象开始：node graph 组织可复用网络，material 封装对几何可绑定的材质接口，shader 表示具体 shading 节点。",
      "`UsdShadeConnectableAPI`、`UsdShadeInput`、`UsdShadeOutput` 和 `UsdAttribute` connections 是连接机制的核心；需要特别区分 input value、valid shader connection、interface connection 与 connection resolution utilities。",
      "`Encapsulation and Sharing` 解释 containers 与 primitive shading nodes 的分层：外层 material 或 node graph 可以暴露参数，内部 shader 网络可以被封装和共享，连接规则决定哪些对象能彼此连接。",
      "后半部分连接 `SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty`、`UsdShadeShaderDefParserPlugin` 与 `UsdShadeMaterialBindingAPI`，用于理解 shader definition discovery、UsdShade-based shader definition 和 geometry material binding 的关系。"
    ],
    terms: [
      ["UsdShade", "USD 着色 schema"],
      ["UsdShadeMaterial", "材质封装对象"],
      ["UsdShadeNodeGraph", "着色节点图"],
      ["UsdShadeShader", "着色节点"],
      ["UsdShadeConnectableAPI", "可连接 API"],
      ["Material Binding", "材质绑定"]
    ]
  },
  {
    output: "full_site/api/usd_shaders_page_front.html",
    title: "UsdShaders: Definitions and Implementations of Usd* Shader Nodes",
    notes: [
      "`UsdShaders` 存放当前和未来 `Usd*` shader nodes 的 definitions 与 implementations，例如 `UsdPreviewSurface`、`UsdUVTexture` 等；它更像 shader 节点定义库，而不是材质绑定或网络 authoring 入口。",
      "官方说明指出这些 definitions 由 UsdShade-based shader definition file 表达，因此阅读本页时应回到 `UsdShade Based Shader Definition` 理解 shader interface、metadata 和 implementation discovery。",
      "当前实现侧重点是面向 Hydra GL backend 的 `glslfx` implementations；页面也提到未来可能包含提供 OSL implementations 的 `oso` 文件。`glslfx`、`oso`、`OSL` 和 shader node 名称应保持英文原样。",
      "`UsdShaders` 与 `UsdShade` 的边界是：前者提供可被发现和使用的标准 shader definitions/implementations，后者提供将 shader 组织成网络、封装成 material 并绑定到 geometry 的 schema 与连接规则。",
      "未来本库也可能提供用于 robust authoring 和 querying shader properties 的 USD schemas；因此本页适合作为标准 `Usd*` shader 节点生态的索引，而不是单个 shader 参数手册。"
    ],
    terms: [
      ["UsdShaders", "Usd* 着色节点定义库"],
      ["UsdPreviewSurface", "USD 预览表面 shader"],
      ["UsdUVTexture", "USD UV 纹理 shader"],
      ["glslfx", "Hydra GL 后端实现格式"],
      ["OSL", "Open Shading Language"],
      ["shader definition", "着色器定义"]
    ]
  },
  {
    output: "full_site/api/usd_skel_page_front.html",
    title: "UsdSkel: USD Skeleton Schema and API",
    notes: [
      "`UsdSkel: USD Skeleton Schema and API` 为 DCC 工具之间交换 skeletally skinned meshes 和 joint animations 提供基础 schema 与 API；它面向骨骼蒙皮和动画数据互换，不是完整角色 rig 系统。",
      "入口页的 `API Manual` 应按路线阅读：先看 `UsdSkel Introduction` 的 Overview、Motivation、Terminology、Transform Spaces 和 Linear Blend Skinning，再进入 schema intro 与 API introduction。",
      "核心概念包括 `SkelRoot`、`Skeleton`、`SkelAnimation`、skeleton binding、joint influences、geom bind transform、joint paths/names、joint hierarchy 和 skeleton bindings；这些名称保留英文以便和类页、属性名、token 对齐。",
      "示例章节 `Skinning an Arm` 说明如何定义 skeleton、animation、binding 和 influences；API 章节则面向查询 skeleton structure、animation samples 和 joint hierarchy。",
      "阅读时要把 skeletal animation、blend shapes、joint transform spaces、skinning weights 与普通 `UsdGeom` 变换分开；`UsdSkel` 关注可交换的数据表达和查询 API，而不是 DCC 内部控制器、IK 或最终求值器实现。"
    ],
    terms: [
      ["UsdSkel", "USD 骨骼 schema"],
      ["SkelRoot", "骨骼系统根"],
      ["Skeleton", "骨架"],
      ["SkelAnimation", "骨骼动画"],
      ["Joint Influences", "关节影响"],
      ["Linear Blend Skinning", "线性混合蒙皮"]
    ]
  },
  {
    output: "full_site/api/usd_u_i_page_front.html",
    title: "UsdUI: USD UI Schemas",
    notes: [
      "`UsdUI: USD UI Schemas` 用于把 client graphical user interface tools 需要的展示信息编码到 USD prims 上，帮助 UI 组织和呈现 prim、property 或 graph nodes。",
      "本模块信息不指导 3D rendering，也不改变 stage 中数据的渲染结果；它描述的是 `UsdStage` 图结构中的节点在工具 UI 中如何可视化、布局、提示和辅助访问。",
      "`UsdUINodeGraphNodeAPI` 负责记录参与 interconnected graph 的 prim 的布局信息；`UsdUIObjectHints`、`UsdUIPrimHints`、`UsdUIPropertyHints`、`UsdUIAttributeHints` 则分别面向 `UsdObject`、`UsdPrim`、`UsdProperty` 和 `UsdAttribute` 提供 UI hints。",
      "`Accessibility Information` 涉及 assistive UI 可用的辅助信息；`UI Hints` 则用于建议 prims 和 properties 应如何在 UI 中展示，例如分组、标签、排序或工具可读提示。",
      "阅读时应将 UsdUI 与 `UsdGeom`、`UsdShade` 等内容 schema 分开：UsdUI 是元信息和工具提示层，服务编辑器、节点图、属性面板和辅助界面，不承担几何、材质或渲染行为。"
    ],
    terms: [
      ["UsdUI", "USD UI schema"],
      ["UsdUINodeGraphNodeAPI", "节点图布局 API"],
      ["UI Hints", "界面提示"],
      ["Accessibility Information", "无障碍辅助信息"],
      ["UsdObject", "USD 对象"],
      ["UsdProperty", "USD 属性"]
    ]
  },
  {
    output: "full_site/api/usd_utils_page_front.html",
    title: "UsdUtils: USD Utilities",
    notes: [
      "`UsdUtils: USD Utilities` 汇集用于 managing、inspecting、editing 和 creating USD assets 的工具类与函数；它是资产处理和管线辅助工具箱，而不是单一 schema 模块。",
      "Overview 中的高层分组包括 authoring、diagnostic delegates、stitching/value clips、dependency analysis and asset packaging、introspection、pipeline 和 stage cache；阅读时应按任务类型跳转，而不是顺序逐项翻译。",
      "资产打包和依赖分析相关链接包括 `UsdUtilsDependencyInfo`、references、payloads、sublayers、`UsdUtilsCreateNewUsdzPackage`、`SdfFileFormat::IsPackage`、`ArIsPackageRelativePath` 等，用于识别、复制或重写资产路径。",
      "`User Processing Functions` 说明 localization routines 可通过自定义 processing function 在 dependency traversal 发现 asset paths 时介入；常见操作包括修改 AssetPaths、处理 dependencies 或移除不需要的 asset paths。",
      "`UsdUtilsStageCache` 与 `UsdStageCache` 用于 stage 缓存和复用；diagnostic delegate 相关工具可聚合警告/状态或在 non-fatal USD error/warning 时中止操作，适合批处理资产管线中的质量门禁。"
    ],
    terms: [
      ["UsdUtils", "USD 工具模块"],
      ["Dependency Analysis", "依赖分析"],
      ["Asset Packaging", "资产打包"],
      ["Localization", "本地化/依赖复制"],
      ["User Processing Function", "用户处理函数"],
      ["StageCache", "Stage 缓存"]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(([en, zh]) => `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`)
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文精修导读 / Chinese Reading Notes</h2>
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块用途、schema/API 边界、阅读路径和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module purpose, schema/API boundaries, reading paths, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  let html = fs.readFileSync(filePath, "utf8");
  const section = buildSection(item);
  const existing = new RegExp(`    <section data-cn-refinement="${MARKER}">[\\s\\S]*?    <\\/section>\\r?\\n?`);

  if (existing.test(html)) {
    html = html.replace(existing, `${section}\n`);
  } else {
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$&`);
  }

  fs.writeFileSync(filePath, html, "utf8");
  return { output: item.output, notes: item.notes.length, terms: item.terms.length };
}

const results = refinements.map(refreshPage);

console.log(JSON.stringify({
  passed: true,
  marker: MARKER,
  pages_refined: results.length,
  results
}, null, 2));
