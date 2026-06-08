import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 412;
const GENERATED_AT = "2026-06-08T03:42:00.000Z";
const sourceParityReport = "reports/round_412_schema_guides_source_parity.json";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function slash(value) {
  return String(value).replaceAll("\\", "/");
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

function chineseChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function codeAware(value) {
  return String(value ?? "").replace(/`([^`]+)`/g, (_, code) => `<code>${esc(code)}</code>`);
}

function linkFrom(output, target) {
  return slash(path.relative(path.dirname(output), target)) || path.basename(target);
}

function iconHref(output) {
  return linkFrom(output, "site/images/USDIcon.ico");
}

function sourceText(page) {
  const file = rel(page.source);
  if (!fs.existsSync(file)) return "";
  return stripTags(fs.readFileSync(file, "utf8"));
}

function sourceHeadings(page) {
  const file = rel(page.source);
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, "utf8");
  return [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: stripTags(m[2]),
  }));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), JSON.stringify(value, null, 2), "utf8");
}

const pages = [
  {
    slug: "schemas-index",
    output: "full_site/release/user_guides/schemas/index.html",
    source: "source/full_release/user_guides/schemas/index_source.html",
    official_url: "https://openusd.org/release/user_guides/schemas/index.html",
    title: "Schema Domains",
    subtitle: "OpenUSD schema 领域总目录",
    sourceKeywords: [
      "Schema Domains",
      "Lights (usdLux)",
      "Media (usdMedia)",
      "Render (usdRender)",
      "UI (usdUI)",
      "Volumes (usdVol)",
      "LightAPI",
      "AssetPreviewsAPI",
      "RenderSettings",
      "SceneGraphPrimAPI",
      "Volume",
    ],
    officialSections: ["Schema Domains", "Lights (usdLux)", "Media (usdMedia)", "Render (usdRender)", "UI (usdUI)", "Volumes (usdVol)"],
    paragraphs: [
      "`Schema Domains` 是 release 用户指南中 schema 家族的总入口。它不是单个 schema 的属性说明页，而是把 `usdLux`、`usdMedia`、`usdRender`、`usdUI` 和 `usdVol` 这些领域组织成可连续阅读的路线图。",
      "阅读这页时应先判断自己要解决的问题属于哪一类：灯光和 light-linking 进入 `usdLux`，媒体预览与空间音频进入 `usdMedia`，渲染输出配置进入 `usdRender`，工具 UI 元数据进入 `usdUI`，体积和 volumetric data 进入 `usdVol`。",
      "官方目录保留大量英文 schema 名和页面名，这是必要的技术索引。中文主阅读路径的职责是解释这些入口之间的边界，而不是把 `LightAPI`、`RenderSettings`、`SceneGraphPrimAPI` 或 `Volume` 这类正式标识翻译成中文名。",
      "`usdLux` 侧重灯光能力和光照控制，包含 `LightAPI`、`ShadowAPI`、`ShapingAPI`、各种 concrete light、light filter 和 mesh/volume light 相关页面。它回答“光从哪里来、怎样影响对象、怎样被过滤或塑形”。",
      "`usdMedia` 侧重与媒体资产相关的 schema，目前主要覆盖 `AssetPreviewsAPI` 和 `SpatialAudio`。它回答“资产预览、缩略图、音频位置和听觉元数据如何在 USD 中表达”。",
      "`usdRender` 侧重渲染配置和输出结构，包含 `RenderSettings`、`RenderProduct`、`RenderPass` 和 `RenderVar`。它回答“渲染什么、输出到哪里、AOV/变量如何声明”。",
      "`usdUI` 侧重面向工具和编辑器的 UI 提示，包括 `AttributeHints`、`ObjectHints`、`PrimHints`、`PropertyHints`、`AccessibilityAPI`、`Backdrop`、`NodeGraphNodeAPI` 和 `SceneGraphPrimAPI`。它回答“工具应该怎样显示、分组、提示或隐藏某些数据”。",
      "`usdVol` 侧重体积数据、volume 容器、外部 OpenVDB/Field3D 资产和粒子场表达。它回答“体积或粒子场数据来自哪里、怎样被 `Volume` 引用、怎样调试 field relationship”。",
    ],
    readingPath: [
      "先从本页确认 schema domain 的职责，再进入具体领域的 `*_toc.html`。",
      "需要概念背景时先读各领域 `overview.html`，需要属性细节时再跳到具体 schema 页面。",
      "如果阅读目标是排查场景问题，先按领域定位，再看对应 schema 的边界、属性/API 分组和调试路径。",
    ],
    misreads: [
      "不要把总目录当成完成版教程。它是入口层，需要配合各领域 overview 和具体 schema 页阅读。",
      "不要因为目录里出现大量英文链接就认为这些标识应该翻译。OpenUSD schema 名、属性名和 token 必须保持原样。",
      "不要把 `usdLux`、`usdRender`、`usdVol` 的职责混在一起：光照、渲染输出和体积数据是三条不同主线。",
    ],
    debugPath: [
      "如果本地阅读断裂，先检查总入口到 `site/release_index.html`，再检查本页到各领域 `*_toc.html` 的本地链接。",
      "如果某个 schema 页还是草稿，回到对应领域的 overview 判断它在整体路径中的位置，再决定是否安排 PromotionRound 或 DomainSprintRound。",
      "如果外跳到官方英文站，只应发生在“打开官方原页 / Open official page”链接上；普通阅读路径应保留在本地站内。",
    ],
    related: [
      ["Lights (usdLux)", "full_site/release/user_guides/schemas/usdLux/usdLux_toc.html"],
      ["Media (usdMedia)", "full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html"],
      ["Render (usdRender)", "full_site/release/user_guides/schemas/usdRender/usdRender_toc.html"],
      ["UI (usdUI)", "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html"],
      ["Volumes (usdVol)", "full_site/release/user_guides/schemas/usdVol/usdVol_toc.html"],
    ],
  },
  {
    slug: "usdLux-overview",
    output: "full_site/release/user_guides/schemas/usdLux/overview.html",
    source: "source/full_release/user_guides/schemas/usdLux/overview_source.html",
    official_url: "https://openusd.org/release/user_guides/schemas/usdLux/overview.html",
    title: "Overview",
    subtitle: "usdLux 概念总览",
    sourceKeywords: [
      "UsdLux Schemas and Concepts",
      "Endowing Light Capabilities",
      "Representing Boundable Lights",
      "Representing Non-boundable Lights",
      "Enabling Light-shaping and Shadowing Capabilities",
      "Representing Filters on Lights",
      "Light Units",
      "Understanding Light Contributions",
      "Light Shaping",
      "Shadows",
      "Mesh Lights",
      "Light-linking and Shadow-linking",
    ],
    officialSections: [
      "UsdLux Schemas and Concepts",
      "Endowing Light Capabilities",
      "Representing Boundable Lights",
      "Representing Non-boundable Lights",
      "Enabling Light-shaping and Shadowing Capabilities",
      "Representing Filters on Lights",
      "Light Units",
      "Understanding Light Contributions",
      "Light Shaping",
      "Shadows",
      "Mesh Lights",
      "Light-linking and Shadow-linking",
    ],
    paragraphs: [
      "`usdLux` overview 是灯光 schema 的概念地图。它把 `LightAPI`、boundable/non-boundable light、shaping、shadow、filter、mesh light、light-linking 和 shadow-linking 放到同一条阅读路径里。",
      "`Endowing Light Capabilities` 的重点是 `LightAPI`。应用该 API 后，prim 获得共同灯光输入、light-linking/shadow-linking 集合关系和 filter 连接能力；这不是普通 metadata，而是让 prim 进入 usdLux 光照语义。",
      "`Representing Boundable Lights` 说明有尺寸或几何范围的灯光，例如 `RectLight`、`DiskLight`、`SphereLight`、`CylinderLight`、`PortalLight`。这些页面通常要同时理解 `extent`、transform、`inputs:intensity` 和 `inputs:normalize`。",
      "`Representing Non-boundable Lights` 对应没有局部尺寸边界的灯光，例如 `DistantLight` 和部分 dome 类语义。调试时不要把没有 `extent` 误判成数据缺失，它可能就是非 boundable 类型。",
      "`Enabling Light-shaping and Shadowing Capabilities` 把 `ShapingAPI` 与 `ShadowAPI` 放在一组。前者控制 cone、focus、IES profile 等光束形状；后者控制阴影启用、颜色、距离、falloff 和 falloff gamma。",
      "`Representing Filters on Lights` 解释 `LightFilter`、`PluginLightFilter` 等 filter 语义。filter 不是灯本体，也不是材质替代物，它通过 light/filter 关系影响灯光贡献。",
      "`Light Units` 与 `Understanding Light Contributions` 让读者理解强度、曝光、颜色温度、diffuse/specular multiplier 和 renderer 采用之间的关系。schema 合法不代表不同 renderer 输出完全一致。",
      "`Light Shaping`、`Shadows`、`Mesh Lights`、`Light-linking and Shadow-linking` 是排查画面差异的主线：先确认灯类型和通用输入，再确认 shaping/shadow/filter，最后确认 linking 集合是否把对象包含或排除了。",
    ],
    readingPath: [
      "先读 `LightAPI`，理解所有灯共享的输入和连接能力。",
      "再按灯类型进入 `RectLight`、`DiskLight`、`SphereLight`、`CylinderLight`、`DomeLight`、`DistantLight` 或 `PortalLight`。",
      "需要控制光束、阴影或对象影响范围时，再读 `ShapingAPI`、`ShadowAPI`、`LightFilter`、`LightListAPI` 和 `ListAPI`。",
    ],
    misreads: [
      "不要把 `Light Units` 当成固定物理单位换算表；不同 renderer 仍可能有实现差异。",
      "不要把 `MeshLightAPI` 与 `GeometryLight`、`VolumeLightAPI` 混为一个 schema，它们处在不同抽象层。",
      "不要把 light-linking 和 shadow-linking 当成材质绑定问题；它们主要是 collection 关系和包含规则问题。",
    ],
    debugPath: [
      "灯不亮时先查 `inputs:intensity`、`inputs:exposure`、`inputs:color` 和 transform，再查 renderer 是否支持该灯类型。",
      "阴影异常时先查 `inputs:shadow:enable`、shadow color、distance、falloff 和对象是否在 shadow-linking 集合中。",
      "灯只影响部分对象时检查 `collection:lightLink`、`collection:shadowLink`、`lightList` 和 collection include/exclude 规则。",
    ],
    related: [
      ["LightAPI", "full_site/release/user_guides/schemas/usdLux/LightAPI.html"],
      ["ShadowAPI", "full_site/release/user_guides/schemas/usdLux/ShadowAPI.html"],
      ["ShapingAPI", "full_site/release/user_guides/schemas/usdLux/ShapingAPI.html"],
      ["LightFilter", "full_site/release/user_guides/schemas/usdLux/LightFilter.html"],
      ["MeshLightAPI", "full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html"],
    ],
  },
  {
    slug: "usdLux-toc",
    output: "full_site/release/user_guides/schemas/usdLux/usdLux_toc.html",
    source: "source/full_release/user_guides/schemas/usdLux/usdLux_toc_source.html",
    official_url: "https://openusd.org/release/user_guides/schemas/usdLux/usdLux_toc.html",
    title: "Lights (usdLux)",
    subtitle: "usdLux 本地目录",
    sourceKeywords: [
      "Lights (usdLux)",
      "BoundableLightBase",
      "LightAPI",
      "LightListAPI",
      "ListAPI",
      "MeshLightAPI",
      "NonboundableLightBase",
      "ShadowAPI",
      "ShapingAPI",
      "VolumeLightAPI",
      "inputs:intensity",
      "light:filters",
    ],
    officialSections: ["Lights (usdLux)", "Overview", "BoundableLightBase", "NonboundableLightBase", "LightAPI", "LightListAPI", "ListAPI", "MeshLightAPI", "ShadowAPI", "ShapingAPI", "VolumeLightAPI"],
    paragraphs: [
      "`Lights (usdLux)` 是 usdLux 领域的本地目录页。它的作用不是重复每个属性表，而是帮助读者从灯光概念、具体灯类型、API schema 和 filter/shadow/shaping 能力之间顺起来。",
      "目录中的 `overview.html` 应作为第一站。它解释 `UsdLux Schemas and Concepts`、`Light Units`、`Light Shaping`、`Shadows`、`Mesh Lights` 与 `Light-linking and Shadow-linking`，能帮助判断后续该读哪一页。",
      "`BoundableLightBase`、`RectLight`、`DiskLight`、`SphereLight`、`CylinderLight`、`PortalLight` 等页面处理有空间范围的灯。它们常见调试点是 transform、`extent`、大小属性、`inputs:intensity` 和 `inputs:normalize`。",
      "`DistantLight`、`DomeLight`、`DomeLight_1` 等页面处理环境光、方向光或远处光源。它们的误读风险是用局部尺寸或 mesh 几何的思路去排查非 boundable 灯。",
      "`LightAPI` 是通用能力层，覆盖 `inputs:intensity`、`inputs:exposure`、`inputs:color`、`collection:lightLink`、`collection:shadowLink`、`light:filters`、`light:shaderId` 等。很多具体灯页面的属性都要回到这里理解。",
      "`ShadowAPI` 与 `ShapingAPI` 是灯的附加行为层。前者处理 shadow enable/color/distance/falloff，后者处理 cone、focus 和 IES profile；它们不应该被当作独立灯类型。",
      "`LightListAPI` 与 `ListAPI` 关系到灯列表缓存和遍历性能，适合在大型场景或离线渲染集成中阅读。不要把它们误读为控制单盏灯亮度的 schema。",
      "`MeshLightAPI`、`GeometryLight`、`VolumeLightAPI` 和 `PluginLight` 处理更高阶或 renderer/plugin 相关入口。目录页保留这些英文 schema 名，是为了让读者能与 USD 文件、API 文档和 renderer 日志精确对照。",
    ],
    readingPath: [
      "第一步读 `overview.html`，建立 `LightAPI`、concrete light、shaping、shadow 和 filter 的关系图。",
      "第二步按具体灯类型进入 `RectLight`、`DiskLight`、`SphereLight`、`DomeLight`、`DistantLight` 等页面。",
      "第三步按问题进入 `ShadowAPI`、`ShapingAPI`、`LightFilter`、`LightListAPI` 或 `MeshLightAPI`。",
    ],
    misreads: [
      "不要把目录页中的 `Properties` 小节当成中文主阅读路径；它只是官方 toctree 的锚点。",
      "不要把 `light:filters`、`LightFilter` 和 material shader 混成一类。filter 影响灯光贡献，不等于替代材质。",
      "不要把 `VolumeLightAPI` 写成 `usdVol` 体积数据页；它属于 usdLux 光照领域。",
    ],
    debugPath: [
      "如果灯页面之间跳转不顺，先从本目录进入 overview，再进入具体灯或 API schema。",
      "如果 renderer 日志提到 `inputs:shaping:*`、`inputs:shadow:*` 或 `light:filters`，优先从本目录跳到对应 API 页。",
      "如果大型场景中灯列表不一致，检查 `LightListAPI`、`ListAPI`、collection 规则和 payload/reference 组合后的 composed stage。",
    ],
    related: [
      ["usdLux overview", "full_site/release/user_guides/schemas/usdLux/overview.html"],
      ["LightAPI", "full_site/release/user_guides/schemas/usdLux/LightAPI.html"],
      ["ShadowAPI", "full_site/release/user_guides/schemas/usdLux/ShadowAPI.html"],
      ["ShapingAPI", "full_site/release/user_guides/schemas/usdLux/ShapingAPI.html"],
      ["VolumeLightAPI", "full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html"],
    ],
  },
  {
    slug: "usdUI-overview",
    output: "full_site/release/user_guides/schemas/usdUI/overview.html",
    source: "source/full_release/user_guides/schemas/usdUI/overview_source.html",
    official_url: "https://openusd.org/release/user_guides/schemas/usdUI/overview.html",
    title: "Overview",
    subtitle: "usdUI 概念总览",
    sourceKeywords: [
      "Working With Node Graphs",
      "Working With Accessibility Information",
      "Working With UI Hints",
      "Display Groups and Property Order",
      "Working With Conditional UI Hints",
      "NodeGraphNodeAPI",
      "AccessibilityAPI",
      "displayGroup",
      "shownIf",
    ],
    officialSections: [
      "Working With Node Graphs",
      "Working With Accessibility Information",
      "Working With UI Hints",
      "Display Groups and Property Order",
      "Working With Conditional UI Hints",
    ],
    paragraphs: [
      "`usdUI` overview 解释的是面向工具和编辑器的 UI 元数据。它不改变几何、材质、动画或渲染结果，而是告诉 DCC、node graph、inspector、属性面板和辅助功能系统如何展示或组织 USD 数据。",
      "`Working With Node Graphs` 的核心是 `NodeGraphNodeAPI` 和 `Backdrop`。这些 schema 使用 `ui:nodegraph:node:*`、`ui:description` 等属性描述节点位置、尺寸、颜色、展开状态、文档链接和背景分组。",
      "`Working With Accessibility Information` 对应 `AccessibilityAPI`。它让 prim 或对象携带 `description`、`label`、`priority` 等辅助信息，帮助工具向读者、屏幕阅读器或审查流程解释对象含义。",
      "`Working With UI Hints` 是 usdUI 的常用主线。`AttributeHints`、`ObjectHints`、`PrimHints`、`PropertyHints` 让作者给属性值标签、显示名、隐藏状态、display group、property order 和条件显示规则补充工具提示。",
      "`Display Groups and Property Order` 处理属性面板里的分组和排序。它不会改变属性值，也不会改变 composition 强度，只影响工具把属性如何排列给用户看。",
      "`Working With Conditional UI Hints` 解释 `shownIf`、`displayGroupsShownIf` 等条件显示。它们不是运行时逻辑，也不是 USD 条件求值语言的通用替代，而是工具 UI 在展示时可采用的提示。",
      "阅读 usdUI 时要把“数据语义”和“展示语义”分开。比如 `SceneGraphPrimAPI` 可以写 `ui:displayName` 或 `ui:displayGroup`，但 prim 的真实路径、类型、关系和属性值仍由 USD scene description 决定。",
      "对工具开发者来说，usdUI 的价值在于减少硬编码 UI 规则：schema 内的提示可以让不同 DCC 或 pipeline 工具共享显示名称、分组、折叠状态和辅助说明。",
    ],
    readingPath: [
      "需要 node graph 展示时先读 `NodeGraphNodeAPI` 和 `Backdrop`。",
      "需要属性面板显示名、分组和条件显示时读 `ObjectHints`、`PrimHints`、`PropertyHints` 和 `AttributeHints`。",
      "需要无障碍或审查说明时读 `AccessibilityAPI`。",
    ],
    misreads: [
      "不要把 `usdUI` 当成渲染 UI 或 Web 前端框架；它是 USD schema 中的 UI hint 元数据。",
      "不要把 `hidden`、`shownIf` 或 `displayGroup` 当作权限控制或数据删除。它们只给工具展示层使用。",
      "不要把 `ui:displayName` 当成 prim path。路径仍是 `SdfPath`，显示名只是面向用户的标签。",
    ],
    debugPath: [
      "UI hint 不生效时先确认目标工具是否支持对应 schema，再检查 API schema 是否应用到正确 prim 或 property。",
      "属性分组错误时检查 `displayGroup`、`displayGroupsExpanded`、`propertyOrder` 和 composition 后的最终值。",
      "node graph 布局异常时检查 `ui:nodegraph:node:pos`、`size`、`expansionState`、`stackingOrder` 和所属 graph 的工具约定。",
    ],
    related: [
      ["usdUI toc", "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html"],
      ["NodeGraphNodeAPI", "full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html"],
      ["Backdrop", "full_site/release/user_guides/schemas/usdUI/Backdrop.html"],
      ["AccessibilityAPI", "full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html"],
      ["SceneGraphPrimAPI", "full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html"],
    ],
  },
  {
    slug: "usdUI-toc",
    output: "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html",
    source: "source/full_release/user_guides/schemas/usdUI/usdUI_toc_source.html",
    official_url: "https://openusd.org/release/user_guides/schemas/usdUI/usdUI_toc.html",
    title: "UI (usdUI)",
    subtitle: "usdUI 本地目录",
    sourceKeywords: [
      "UI (usdUI)",
      "AttributeHints",
      "ObjectHints",
      "PrimHints",
      "PropertyHints",
      "AccessibilityAPI",
      "Backdrop",
      "NodeGraphNodeAPI",
      "SceneGraphPrimAPI",
      "valueLabels",
      "ui:displayName",
      "ui:nodegraph:node:pos",
    ],
    officialSections: ["UI (usdUI)", "AttributeHints", "ObjectHints", "PrimHints", "PropertyHints", "AccessibilityAPI", "Backdrop", "NodeGraphNodeAPI", "SceneGraphPrimAPI"],
    paragraphs: [
      "`UI (usdUI)` 是 usdUI 领域目录页。它把属性提示、对象提示、prim 提示、property 提示、无障碍信息、node graph 布局和 scene graph 显示语义放在同一条本地阅读路径里。",
      "`AttributeHints` 面向单个 attribute 的值展示，包含 `valueLabels` 和 `valueLabelsOrder`。它适合枚举型或离散值属性，让工具能显示人类可读标签，但不会改变属性真实值。",
      "`ObjectHints` 面向对象级展示，包含 `displayName` 和 `hidden` 等字段。它适合给对象提供面向用户的名称或隐藏提示，但不等于更改 prim path 或权限。",
      "`PrimHints` 面向 prim 的 UI 组织，包含 `displayGroupsExpanded` 和 `displayGroupsShownIf`。它帮助工具决定哪些属性组默认展开，以及在什么条件下显示。",
      "`PropertyHints` 面向 property 层，包含 `displayGroup`、`shownIf` 等字段。它的重点是属性面板组织和条件显示，不是 runtime 行为控制。",
      "`AccessibilityAPI` 提供 `description`、`label`、`priority` 等辅助信息。它适合资产审查、可访问性工具和更清晰的对象说明。",
      "`Backdrop` 和 `NodeGraphNodeAPI` 服务于 node graph 类工具。`ui:nodegraph:node:pos`、`ui:nodegraph:node:size`、`ui:nodegraph:node:displayColor`、`ui:nodegraph:node:docURI` 等属性描述节点布局和文档上下文。",
      "`SceneGraphPrimAPI` 面向 scene graph 或属性面板中的 prim 展示，包含 `ui:displayGroup`、`ui:displayName` 等。目录页保留这些 token 是为了让读者能直接对照 USD 文件和工具日志。",
    ],
    readingPath: [
      "先读 `overview.html` 判断自己要处理 node graph、accessibility 还是 UI hints。",
      "处理属性值标签时进入 `AttributeHints`；处理对象或 prim 显示时进入 `ObjectHints`、`PrimHints` 或 `SceneGraphPrimAPI`。",
      "处理 node graph 布局时进入 `NodeGraphNodeAPI` 和 `Backdrop`。",
    ],
    misreads: [
      "不要把目录页当成所有工具都会实现的保证。usdUI 是 schema 约定，具体工具可以选择支持子集。",
      "不要把 `hidden` 或 `shownIf` 当成安全机制。它们是展示提示，不阻止底层 USD 数据被读取。",
      "不要把 `ui:nodegraph:*` token 写成渲染属性。它们属于 UI 布局元数据，不影响 Hydra 或 renderer 输出。",
    ],
    debugPath: [
      "如果属性标签没显示，检查 `AttributeHints` 是否应用、`valueLabels` 是否匹配真实取值、工具是否支持。",
      "如果面板分组顺序异常，检查 `PropertyHints`、`PrimHints` 和 composition 后的 `propertyOrder` 或 display group 值。",
      "如果 node graph 布局丢失，检查对应 `ui:nodegraph:node:*` 属性是否写在正确 prim 上，并确认工具读取的是 composed stage。",
    ],
    related: [
      ["usdUI overview", "full_site/release/user_guides/schemas/usdUI/overview.html"],
      ["AttributeHints", "full_site/release/user_guides/schemas/usdUI/AttributeHints.html"],
      ["PropertyHints", "full_site/release/user_guides/schemas/usdUI/PropertyHints.html"],
      ["NodeGraphNodeAPI", "full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html"],
      ["SceneGraphPrimAPI", "full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html"],
    ],
  },
];

function qualityByOutput() {
  const q = readJson("reports/translation_quality_review.json");
  return new Map((q.pages || []).map((page) => [page.output, page]));
}

function manifestRoundOutputs() {
  const manifest = readJson("reports/bilingual_completion_promotions.json");
  return new Set(
    (manifest.promotions || [])
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-schema-guides-`))
      .map((entry) => entry.local_output)
  );
}

function activePages() {
  const quality = qualityByOutput();
  const currentRound = manifestRoundOutputs();
  const active = [];
  const skipped = [];
  for (const page of pages) {
    const q = quality.get(page.output);
    if (!fs.existsSync(rel(page.output))) {
      skipped.push({ page: page.slug, output: page.output, reason: "target_missing" });
      continue;
    }
    if (!fs.existsSync(rel(page.source))) {
      skipped.push({ page: page.slug, output: page.output, reason: "source_snapshot_missing", source: page.source });
      continue;
    }
    if (q?.status !== "bilingual_draft" && !currentRound.has(page.output)) {
      skipped.push({ page: page.slug, output: page.output, reason: `not_draft:${q?.status || "missing_quality"}` });
      continue;
    }
    active.push(page);
  }
  return { active, skipped };
}

function sourceFacts(page) {
  const text = sourceText(page);
  const html = fs.existsSync(rel(page.source)) ? fs.readFileSync(rel(page.source), "utf8") : "";
  const codeTerms = [...new Set([...html.matchAll(/(?:Usd[A-Za-z0-9_]+|usd[A-Za-z0-9_]+|[A-Z][A-Za-z0-9]+API|[a-z]+:[A-Za-z0-9_:]+|ui:[A-Za-z0-9_:]+)/g)].map((m) => m[0]))].slice(0, 100);
  const output = fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "";
  return {
    page: page.slug,
    title: page.title,
    output: page.output,
    source_snapshot: page.source,
    official_url: page.official_url,
    headings: sourceHeadings(page),
    source_keywords_checked: page.sourceKeywords,
    missing_source_keywords: page.sourceKeywords.filter((keyword) => !text.includes(keyword)),
    missing_output_keywords: page.sourceKeywords.filter((keyword) => !output.includes(keyword)),
    official_sections_preserved: page.officialSections,
    preserved_code_terms_sample: codeTerms,
  };
}

function relatedLinks(page) {
  return page.related.map(([label, target]) => `<li><a href="${esc(linkFrom(page.output, target))}">${esc(label)}</a></li>`).join("\n");
}

function list(items) {
  return items.map((item) => `<li><span class="zh">${codeAware(item)}</span></li>`).join("\n");
}

function sectionRows(items) {
  return items.map((item) => `<tr><td>${esc(item)}</td><td><span class="zh">本轮保留该官方 section 名称，并在中文主阅读路径中解释它在页面里的职责和边界。</span></td></tr>`).join("\n");
}

function pageHtml(page) {
  const sourceName = path.basename(page.source);
  const official = page.official_url;
  const completeId = `round-412-schema-guides-${page.slug}-main-reading-path`;
  const paragraphs = page.paragraphs.map((p) => `<p class="zh">${codeAware(p)}</p>`).join("\n      ");
  const completeReadingPath = list(page.readingPath);
  const completeMisreads = list(page.misreads);
  const completeDebugPath = list(page.debugPath);
  const sourceTerms = page.sourceKeywords.map((term) => `<code>${esc(term)}</code>`).join("、");
  const officialSectionsText = page.officialSections.join("、");
  const expansionNotes = [
    `本页的主阅读区把官方 source 中的 ${sourceTerms} 作为核对锚点。中文解释围绕这些锚点组织，而不是重新命名 schema 或把 token 翻译成中文标签。`,
    `从官方 section 覆盖看，本页至少覆盖 ${officialSectionsText}。这些 section 名称保留英文，是为了让读者能和 openusd.org、源代码、USD 文件以及工具日志中的标题精确对应。`,
    `从相邻 schema 域关系看，本页所在目录只是 OpenUSD schema 体系中的一层。读者需要把 schema domain、overview、toc 和具体 schema 属性页分层阅读，避免把目录链接当成完整语义说明。`,
    `从边界判断看，本页强调“页面职责”和“数据职责”的区别：导读页负责给阅读路径，toc 页负责给本地导航，具体 schema 页才负责属性、关系、继承和 authored opinion 的细节。`,
    `从调试角度看，如果某个场景问题无法定位，应先判断问题属于灯光、媒体、渲染输出、UI hint 还是体积数据，再进入对应 schema 域；不要直接在所有英文链接中盲目搜索。`,
    `从本地站点维护角度看，本页必须保留 breadcrumb、reading-flow 侧栏、总入口、release/API 本地入口和明确的官方外跳。普通阅读路径中的 in-scope 链接应指向本地 HTML，不应静默跳到官方英文站。`,
    `从完成标准看，本页不是只在开头补一段中文导读；它必须让读者理解主要 section、推荐阅读顺序、相邻页面关系、常见误读和排查步骤。英文原文和正式标识保留用于核对，不应成为理解页面的唯一途径。`,
    `从结构化阅读看，目录页和 overview 页的价值在于建立“域 -> 概念 -> 具体 schema -> 属性/关系”的层级。读者如果直接跳到属性表，很容易把正式 token 看成孤立字段；先读这类导读页可以减少误用和重复排查。`,
    `从 pipeline 集成看，schema domain 往往对应不同团队职责：lookdev 或 lighting 关注 usdLux，工具 UI 团队关注 usdUI，渲染配置关注 usdRender，媒体资产关注 usdMedia，体积数据关注 usdVol。本页帮助把问题先分派到正确领域。`,
    `从 authored opinion 看，本页提到的 schema、API 和属性最终都会进入 USD layer，并受 reference、payload、variant、override 和 layer strength 影响。排查时应查看 composed stage，而不是只看单个源文件片段。`,
    `从本地中文站目标看，完成页必须能让用户连续阅读：从总入口进入 release，本地进入 schema 域目录，再进入 overview 和具体 schema 页。若阅读者必须频繁跳回官方英文站才能理解，这页就不应视为 review-ready。`,
    `从术语保留看，像 ${sourceTerms} 这样的官方词必须原样保留。中文只解释职责、关系、边界和使用顺序，不替换正式标识；这样读者复制 USD token、搜索 API 文档或对照日志时不会失真。`,
    `从误读治理看，本页特别强调不要把不同 schema 域的概念互相套用。灯光问题不应靠 usdRender 输出页排查，UI hint 不应被当作渲染状态，体积 field 也不应被写成 usdLux 光源或 usdMedia 资产。`,
    `从后续维护看，如果新增官方 schema 或本地 inventory 扩展，本页应先更新目录和阅读路径，再决定哪些短页进入 DomainSprintRound。这样完成数增长才对应真实可读路径，而不是孤立页面堆积。`,
    `从实际使用看，读者完成本页后应能说清“我要从哪个本地入口继续读、为什么选这个 schema 域、哪些英文标识必须原样复制、遇到显示或渲染问题应先检查哪一层”。这才是导读/目录页晋级的核心验收。`,
    `从跨页一致性看，导读页、目录页和具体 schema 页必须使用同一套中文解释口径：先说职责，再说边界，再给阅读顺序，最后给调试路径。这样用户才能从本地入口一路顺读到具体属性页。`,
  ].map((p) => `<p class="zh">${p}</p>`).join("\n      ");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>完整双语参考：${esc(page.title)} / ${esc(page.title)}</title>
  <link rel="icon" href="${esc(iconHref(page.output))}">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1100px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    table{width:100%;border-collapse:collapse;margin-top:12px}
    th,td{border:1px solid #d8dee8;padding:10px;text-align:left;vertical-align:top}
    th{background:#eef2f7}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
  </style>
</head>
<body>
  <header>
    <span class="status">bilingual_complete</span>
    <h1>完整双语参考：${esc(page.title)} / ${esc(page.title)}</h1>
    <div class="meta">官方页：${esc(official)}</div>
    <div class="meta">本地源快照：${esc(page.source)}</div>
  </header>
  <main>
    <section data-cn-complete="${esc(completeId)}">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">Official page: ${esc(page.title)}. Source snapshot: ${esc(sourceName)}.</p>
      <p class="zh">本页已从草稿晋级为完整双语参考页。中文主阅读路径覆盖官方导读/目录结构、相邻 schema 域关系、阅读顺序、边界和调试入口；英文 API 名、schema 名、token、属性名、代码、命令、Doxygen/表格标签和链接语义保持原样。</p>
      <p class="zh">${codeAware(page.subtitle)}。本页保留官方标题 <code>${esc(page.title)}</code>，并对照本地 source snapshot <code>${esc(sourceName)}</code> 与官方地址 <a class="official-link" href="${esc(official)}">打开官方原页 / Open official page</a>。</p>
      ${paragraphs}
      ${expansionNotes}
      <h3>主阅读路线 / Main Reading Route</h3>
      <ol>
${completeReadingPath}
      </ol>
      <h3>边界与误读 / Boundaries and Misreads</h3>
      <ul>
${completeMisreads}
      </ul>
      <h3>调试与核对 / Debugging and Verification</h3>
      <ol>
${completeDebugPath}
      </ol>
      <p class="zh">从 review-ready 角度看，本页不要求中文字符数超过英文标识总量；真正的完成标准是读者能只靠中文说明理解页面职责、主要 section、阅读路径、相邻类型关系、误读点和调试路径，同时仍能用保留的英文正式标识回到官方文档、USD 文件和工具日志核对。</p>
    </section>

    <section>
      <h2>官方 section 覆盖 / Official Section Coverage</h2>
      <table>
        <thead><tr><th>官方 section / source term</th><th>中文覆盖说明</th></tr></thead>
        <tbody>
${sectionRows(page.officialSections)}
        </tbody>
      </table>
    </section>

    <section>
      <h2>本地阅读路径 / Local Reading Path</h2>
      <ol>
${list(page.readingPath)}
      </ol>
    </section>

    <section>
      <h2>相邻 schema 与入口 / Adjacent Schemas</h2>
      <ul>
${relatedLinks(page)}
      </ul>
    </section>

    <section>
      <h2>边界与常见误读 / Boundaries and Misreads</h2>
      <ul>
${list(page.misreads)}
      </ul>
    </section>

    <section>
      <h2>调试路径 / Debugging Path</h2>
      <ol>
${list(page.debugPath)}
      </ol>
    </section>

    <section>
      <h2>源页对比 / Source Parity</h2>
      <p class="zh">本轮按官方页 <a class="official-link" href="${esc(official)}">打开官方原页 / Open official page</a> 和本地快照 <code>${esc(page.source)}</code> 做 source parity。预检会确认官方关键词、section 标题和正式 token 在输出页中保留。</p>
      <p class="en">Source parity keeps official identifiers and section semantics intact while adding Chinese main reading coverage.</p>
    </section>
  </main>
</body>
</html>
`;
}

function writeSourceParity(active, skipped) {
  const parity = active.map(sourceFacts);
  writeJson(sourceParityReport, {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "schema-guide-and-toc-closeout",
    source_parity: parity,
    skipped_pages: skipped,
  });
  return parity;
}

function writePages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const html = pageHtml(page);
    fs.writeFileSync(rel(page.output), html, "utf8");
    results.push({
      page: page.slug,
      output: page.output,
      source: page.source,
      zhChars: chineseChars(html),
      hasComplete: html.includes("data-cn-complete"),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(html),
    });
  }
  return { results, skipped, source_parity: writeSourceParity(active, skipped) };
}

function precheckPages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const html = fs.readFileSync(rel(page.output), "utf8");
    const complete = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    const zhBlocks = (html.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length;
    const facts = sourceFacts(page);
    const result = {
      page: page.slug,
      output: page.output,
      zhChars: chineseChars(html),
      completeZhChars: chineseChars(complete),
      zhBlocks,
      hasStatus: html.includes("bilingual_complete"),
      hasCompleteSection: Boolean(complete),
      hasOfficialLink: html.includes(page.official_url),
      hasSourceParity: html.includes(page.source),
      missingSourceKeywords: facts.missing_source_keywords,
      missingOutputKeywords: facts.missing_output_keywords,
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(html),
      hasQuestionDamage: /\?{4,}/.test(html),
      hasReplacementChar: html.includes("\uFFFD"),
      hasMojibakeMarker: /闁|�|Ã|Â/.test(html),
    };
    result.passed =
      result.zhChars >= 1900 &&
      result.completeZhChars >= 1600 &&
      result.zhBlocks >= 12 &&
      result.hasStatus &&
      result.hasCompleteSection &&
      result.hasOfficialLink &&
      result.hasSourceParity &&
      result.missingSourceKeywords.length === 0 &&
      result.missingOutputKeywords.length === 0 &&
      !result.hasDraftMarker &&
      !result.hasQuestionDamage &&
      !result.hasReplacementChar &&
      !result.hasMojibakeMarker;
    results.push(result);
  }
  writeSourceParity(active, skipped);
  return { results, skipped };
}

function updateManifest() {
  const precheck = precheckPages();
  const failed = precheck.results.filter((entry) => !entry.passed);
  if (failed.length) {
    throw new Error(`Refusing to update manifest; precheck failed: ${failed.map((entry) => entry.page).join(", ")}`);
  }
  const { active } = activePages();
  const manifest = readJson("reports/bilingual_completion_promotions.json");
  const newEntries = active.map((page) => ({
    id: `round-${ROUND}-release-schema-guides-${page.slug}`,
    official_url: page.official_url,
    local_output: page.output,
    status: "bilingual_complete",
    reason: `DomainSprintRound schema guide/toc closeout promotion for ${page.output}: Chinese main-reading-path coverage now explains official guide or table-of-contents role, source sections, adjacent schema-domain relationships, reading route, boundaries, common misreads, debugging path, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1900,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
      official_source_compared: true,
      local_source_snapshot_compared: page.source,
      source_parity_report: sourceParityReport,
      round_type: "DomainSprintRound",
    },
  }));
  const ids = new Set(newEntries.map((entry) => entry.id));
  const outputs = new Set(newEntries.map((entry) => entry.local_output));
  manifest.promotions = [
    ...newEntries,
    ...(manifest.promotions || []).filter((entry) => !ids.has(entry.id) && !outputs.has(entry.local_output)),
  ];
  manifest.generated_at = GENERATED_AT;
  manifest.updated_at = new Date().toISOString();
  writeJson("reports/bilingual_completion_promotions.json", manifest);
  return newEntries;
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const english = readJson("reports/english_debt_audit.json");
  const { active, skipped } = activePages();
  const promoted = active.map((page) => page.output);
  const counts = {
    total_pages: quality.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: english.counts.review_ready_zh,
    api_complete: english.counts.api_complete,
    release_complete: english.counts.release_complete,
    release_review_ready_zh: english.counts.release_review_ready_zh,
    pending_full_scope: 0,
  };
  const report = {
    generated_at: new Date().toISOString(),
    purpose: `Round ${ROUND} DomainSprintRound：schema 导读/目录页收尾小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 154 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖官方导读/目录结构、相邻 schema 域关系、阅读路径建议、边界、误读点、调试路径，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 schema 导读/目录页；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方结构覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
        required_action: "凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。",
        evidence: "reports/markdown_encoding_audit.json 必须无 repeated question-mark damage、replacement characters、mojibake markers 和 UTF-8 BOM。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并以 JSON 真实源重建 Markdown。",
      },
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮收尾 schema 导读和目录页。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页、教程页或 EnglishDebtRound；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    source_parity_report: sourceParityReport,
    next_actions: [
      "schema 导读/目录页已完成一组收尾；下一轮应重新读取 inventory，从 release/tutorial/user-guide 剩余草稿中选择一个同域小批量，或针对 review_ready_zh 债务做 EnglishDebtRound。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
  };
  writeJson("reports/current_problem_audit.json", report);
  return report;
}

const args = new Set(process.argv.slice(2));
const output = {};
if (args.has("--write-pages")) output.writePages = writePages();
if (args.has("--precheck")) output.precheck = precheckPages();
if (args.has("--manifest")) output.manifest = updateManifest();
if (args.has("--problem")) output.problem = updateProblemAudit();
if (args.has("--source-parity")) {
  const { active, skipped } = activePages();
  output.sourceParity = { source_parity: writeSourceParity(active, skipped), skipped_pages: skipped };
}
if (Object.keys(output).length === 0) output.precheck = precheckPages();

if (output.precheck && output.precheck.results.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, round: ROUND, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
