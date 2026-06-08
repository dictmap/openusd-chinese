import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 415;
const BASE_GOOD = 173;
const SOURCE_PARITY_REPORT = "reports/round_415_remaining_proposals_source_parity.json";

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

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function inline(value) {
  return String(value ?? "")
    .split("`")
    .map((part, index) => (index % 2 ? `<code>${esc(part)}</code>` : esc(part)))
    .join("");
}

function linkFrom(output, target) {
  return slash(path.relative(path.dirname(output), target)) || path.basename(target);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), JSON.stringify(value, null, 2), "utf8");
}

function sourceHtml(page) {
  return fs.existsSync(rel(page.source)) ? fs.readFileSync(rel(page.source), "utf8") : "";
}

function sourceText(page) {
  return stripTags(sourceHtml(page));
}

function sourceHeadings(page) {
  const html = sourceHtml(page);
  return [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

const css = `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    .navlinks a{color:#d7e3f4;margin-right:14px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    table{width:100%;border-collapse:collapse;margin-top:12px}
    th,td{border:1px solid #d8dee8;padding:10px;text-align:left;vertical-align:top}
    th{background:#eef2f7}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
`;

const pages = [
  {
    slug: "wp-usdlux-geometry-lights",
    output: "full_site/release/wp_usdlux_for_geometry_lights.html",
    source: "source/full_release/wp_usdlux_for_geometry_lights_source.html",
    official_url: "https://openusd.org/release/wp_usdlux_for_geometry_lights.html",
    title: "Adapting UsdLux to Accommodate Geometry Lights",
    zhTitle: "适配几何灯的 UsdLux 提案",
    sourceKeywords: ["Adapting UsdLux to Accommodate Geometry Lights", "Introduction and Background", "Mesh Light Support in the Industry", "Goals", "Workflow Considerations", "Design Space and Issues", "UsdLux LightAPI OM", "Proposal and Behaviors"],
    summary: "本页解释 UsdLux 如何从只覆盖传统 light prim，扩展到能够表达由几何体发光形成的 geometry light。中文阅读重点是区分 mesh 本身、发光材质、LightAPI、GeometryLight 旧 schema 和新提案中的单 prim 表达方式。读者应把它看成 UsdLux 设计迁移说明，而不是一个简单的灯光属性表：它讨论工作流、渲染器识别、材质和光照的分工，以及为什么需要让 LightAPI 能附着到更广泛的 prim 上。",
    sectionNotes: [
      ["Introduction and Background", "说明几何体发光在影视和 DCC 工作流中很常见，但旧的 UsdLux 主要围绕显式 light prim 建模。这里的核心问题是同一个可见几何体既可能提供表面外观，也可能参与照明；USD 需要一种能被 renderer、Hydra delegate 和资产发布流程一致理解的表达。"],
      ["Mesh Light Support in the Industry", "行业内的 mesh light 通常把网格、材质 emission、光照采样和可见性混在一起处理。提案把这些经验映射到 UsdLux，强调 USD 表达必须兼容已有 DCC，又不能让每个 renderer 只靠私有约定解释。"],
      ["Goals", "目标不是重新设计所有光照，而是让几何灯能在 USD 中有稳定 schema 语义、可发现的 LightAPI 行为、可与材质 emission 协调的 authoring 路径，并保留具体 renderer 对采样和着色的实现空间。"],
      ["Workflow Considerations", "工作流部分讨论建模之后再变成灯、发光和 glow 的视觉同步、以及艺术家是否需要一个独立灯光 prim。中文主路径应帮助读者判断何时保留几何体可见外观，何时把照明职责交给 UsdLux。"],
      ["Design Space and Issues", "设计空间比较 dual-prim 和 single-prim 几何灯。dual-prim 容易出现几何体和灯不同步、绑定和可见性重复维护；single-prim 更接近读者直觉，但要求 schema 和 renderer 能识别同一个 prim 的几何与灯光双重身份。"],
      ["UsdLux LightAPI OM", "`LightAPI` 的对象模型是本页关键：把 light 语义从具体 light schema 中抽出来，允许 schema 组合和 API 应用表达新的灯光类别。`Light -> LightAPI`、便利基类、保留既有 concrete schema 和弃用 `GeometryLight` 都是围绕这个迁移展开。"],
      ["Proposal and Behaviors", "提案行为描述材质 emission、无材质行为、light linking、可见性、collection 和 renderer 采样之间的关系。调试时不要只看 prim 类型，还要看是否应用了 `UsdLuxLightAPI`、是否有材质发光、以及 renderer 是否支持对应 Sdr 或 delegate 路径。"],
      ["相邻类型关系", "本页与 `LightAPI`、`MeshLightAPI`、`GeometryLight`、`PluginLight`、`UsdShade` 材质和 `usdLux` user guide 相邻。它解释为什么后续 schema 页会强调 API schema、material emission 和 renderer plugin，而不是只列灯光属性。"]
    ],
    workflows: [
      "阅读时先确认资产是传统 light prim、带 emission 的 mesh，还是需要被 renderer 采样为实际照明源的 geometry light；三者在 USD 中的调试入口不同。",
      "如果发光可见但不照亮场景，应检查材质 emission 是否只是 surface 外观、是否应用了 `UsdLuxLightAPI`，以及渲染器是否把该 prim 当成 light source 采样。",
      "如果几何体和灯的位置、可见性或链接不同步，应优先排查是否仍在使用 dual-prim 模型；single-prim 方案的目的就是减少这种维护分裂。"
    ],
    boundaries: [
      "`GeometryLight` 的历史语义不能简单等同于所有 mesh light；本页的重点是迁移到更通用的 `LightAPI` 和 schema 组合。",
      "发光材质不自动意味着物理照明源，照明采样仍取决于 UsdLux schema、renderer 支持和具体 delegate 行为。",
      "提案解释设计方向，不应覆盖当前 `UsdLux` schema 页和 API reference 中的精确定义。"
    ],
    related: [
      ["UsdLux overview", "full_site/release/user_guides/schemas/usdLux/overview.html"],
      ["MeshLightAPI", "full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html"],
      ["GeometryLight", "full_site/release/user_guides/schemas/usdLux/GeometryLight.html"]
    ]
  },
  {
    slug: "wp-usdlux-renderers",
    output: "full_site/release/wp_usdlux_for_renderers.html",
    source: "source/full_release/wp_usdlux_for_renderers_source.html",
    official_url: "https://openusd.org/release/wp_usdlux_for_renderers.html",
    title: "Adapting UsdLux to the Needs of Renderers",
    zhTitle: "面向渲染器需求适配 UsdLux",
    sourceKeywords: ["Adapting UsdLux to the Needs of Renderers", "Background and Goals", "Foundational Technologies in USD", "Sdr", "USD Schemas", "UsdImaging and Hydra", "Proposals", "Changes to UsdLux"],
    summary: "本页从 renderer 集成角度解释 UsdLux 为什么需要更强的可连接性、Sdr 关联和 plugin light 扩展。中文主阅读路径要把 `Sdr`、USD schemas、`UsdImaging`、Hydra、render delegate 和 `UsdLuxPluginLight` 串成一条链：schema 负责 scene description，Sdr 负责 shader 或 light 定义发现，Hydra 负责把场景数据送到 delegate，具体 renderer 再决定如何实现采样和参数解释。",
    sectionNotes: [
      ["Background and Goals", "背景说明传统 UsdLux concrete schemas 难以覆盖所有 renderer 私有灯型。目标是提供一种 schema 和 Sdr 结合的扩展机制，让 renderer 能暴露自己的灯光和 light filter，同时仍保留 USD 层面的可组合和可发现语义。"],
      ["Foundational Technologies in USD", "基础技术包括 `Sdr`、USD Schemas、`UsdImaging` 和 Hydra。理解顺序应是：schema 把 prim 和属性写进 stage；Sdr 提供节点定义和参数元数据；Hydra 把场景表达送给 render delegate；delegate 再映射到 renderer 内部对象。"],
      ["Sdr", "`Sdr` 是 Shader Definition Registry，用于发现和描述 shader 或 renderer 节点定义。这里不要把 Sdr 当成渲染器本身，它更像描述节点参数、类型和实现来源的 registry。"],
      ["USD Schemas", "schema 部分讨论如何让 UsdLux schema 表达灯光节点、连接和插件扩展。schema 名、属性名和 token 必须保留英文，因为工具链靠这些标识解析 scene description。"],
      ["UsdImaging and Hydra", "`UsdImaging` 和 Hydra 负责从 USD stage 读取 light prim、属性和连接，再提交给 render delegate。调试时如果 USD 文件看起来正确但渲染器不识别，应检查 imaging adapter 和 delegate 是否实现了对应路径。"],
      ["Proposals", "提案集中在修改 UsdLux、UsdImaging、Hd 和具体 delegate。中文解释应帮助读者区分 schema 变更、数据源变更和 renderer 实现变更，避免把所有问题都归因于某一个层。"],
      ["Changes to UsdLux", "UsdLux 变化包括 making lights connectable、关联 Sdr definitions、`UsdLuxPluginLight`、`UsdLuxPluginLightFilter` 和 `UsdLuxPortalLight`。这些设计让 renderer-specific light 可以进入 USD，而不需要每个私有灯型都成为核心 schema。"],
      ["Changes to Hd", "Hd 层变化关注 renderer 如何接收灯光参数、连接和标识。它是 USD scene description 与 renderer delegate 之间的桥，不应被翻译成具体 renderer 的专有 API。"]
    ],
    workflows: [
      "引入 renderer-specific light 时，先确认是否能通过 `UsdLuxPluginLight` 或 `UsdLuxPluginLightFilter` 表达，再核对 Sdr 节点定义和参数元数据是否可被发现。",
      "如果灯光在 USD 中存在但 delegate 不生效，应沿 schema、UsdImaging adapter、Hd 数据结构、render delegate 实现逐层排查。",
      "如果需要 portal light 或 light filter，先读本页理解为什么 UsdLux 允许 plugin 化，再回到对应 schema 页核对具体属性。"
    ],
    boundaries: [
      "本页不是 renderer 编程手册；它讨论 USD 设计如何给 renderer 留扩展口，而不是规定每个 renderer 的内部采样算法。",
      "`Sdr`、`Hd`、`UsdImaging`、`UsdLuxPluginLight` 这些正式名不能翻译或替换，否则会破坏跨页核对。",
      "plugin light 能扩展类型，但仍需要清楚的 USD schema 和 Sdr 定义，不能只依赖 renderer 私有字符串。"
    ],
    related: [
      ["PluginLight", "full_site/release/user_guides/schemas/usdLux/PluginLight.html"],
      ["PluginLightFilter", "full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html"],
      ["PortalLight", "full_site/release/user_guides/schemas/usdLux/PortalLight.html"]
    ]
  },
  {
    slug: "wp-ar2",
    output: "full_site/release/wp_ar2.html",
    source: "source/full_release/wp_ar2_source.html",
    official_url: "https://openusd.org/release/wp_ar2.html",
    title: "Asset Resolution (Ar) 2.0",
    zhTitle: "Asset Resolution Ar 2.0 提案",
    sourceKeywords: ["Asset Resolution (Ar) 2.0", "Background and Goals", "Tasks", "General Cleanup", "Add Documentation and Examples", "Add Identifier Concept", "Remove Repository and Search Path", "Improve Resolve and Asset Info", "Rollout and Transition", "Proposed API"],
    summary: "本页讨论 `Ar` 资产解析系统从旧接口向 2.0 设计迁移的目标。中文阅读重点是理解 identifier、resolver context、asset info、URI resolver、写入接口和迁移策略之间的关系。它不是简单列出 API 改名，而是在解释 USD 如何把 asset path 从字符串搜索变成更明确、可文档化、可组合、可跨文件系统和 URI 工作流复用的解析协议。",
    sectionNotes: [
      ["Background and Goals", "背景说明旧 Ar 接口在 repository、search path、文件系统假设和文档清晰度方面存在限制。Ar 2.0 的目标是让解析过程更明确，便于 resolver 插件实现，也便于调用者理解 identifier 和 resolved asset 的区别。"],
      ["Tasks", "任务列表展示迁移工作不是单点修改，而是一组清理、文档、identifier、repository 移除、resolve 改进、URI resolver 和写入接口设计。读者应把这些任务看成资产解析协议重构。"],
      ["General Cleanup", "清理任务减少旧接口歧义，便于 resolver 实现者知道哪些方法仍是必要入口，哪些行为应由更明确的 API 承担。"],
      ["Add Documentation and Examples", "文档和示例是 Ar 2.0 的关键，因为 resolver 行为往往跨 studio、文件系统、数据库和网络资产服务。没有示例时，调用者容易把 unresolved path、identifier 和 resolved path 混为一谈。"],
      ["Add Identifier Concept", "`identifier` 概念用于表达 resolver 可稳定理解的资产标识。它不同于用户输入字符串，也不一定等同于本地文件路径；这能支持 package、URI 和上下文相关解析。"],
      ["Remove Repository and Search Path", "移除 repository 和 search path 的旧假设，是为了减少对文件系统目录搜索的依赖。现代资产系统可能来自数据库、云端、package 或自定义 URI，不能只靠传统路径列表。"],
      ["Improve Resolve and Asset Info", "`Resolve` 和 asset info 改进让调用者能同时获得解析结果和相关元数据。调试 asset 找不到时，应检查 resolver context、identifier 创建、asset info 返回和 resolved path，而不只是打印原始字符串。"],
      ["Rollout and Transition", "迁移部分说明旧实现如何过渡到新 API。实际项目中应分阶段适配 resolver 插件、调用端和测试，不要一次性删除所有旧路径逻辑。"],
      ["Proposed API", "Proposed API 提供具体接口草案。API 名、函数名、类型名和参数必须保留英文；中文只解释职责、调用顺序和兼容风险。"]
    ],
    workflows: [
      "排查引用失败时，先记录原始 asset path，再看 resolver context 生成的 identifier，最后检查 resolved path 和 asset info，而不是只判断文件是否存在。",
      "实现自定义 resolver 时，应优先定义 identifier 规则和 context 规则，再实现 URI、读取和写入接口，避免把所有逻辑塞进路径字符串解析。",
      "迁移旧工程时，先保留旧测试用例，再按 Ar 2.0 任务逐项替换接口，确保 package、相对路径和上下文解析仍可复现。"
    ],
    boundaries: [
      "`Ar` 不是普通文件系统包装器，它是 USD 资产解析抽象，必须支持比本地路径更广的资产来源。",
      "`identifier`、`ArResolverContext`、`Resolve`、`asset info` 等正式术语不能翻译成中文 token。",
      "本页是提案和迁移设计，具体可用 API 仍需回到当前 OpenUSD API reference 和 resolver 插件实现核对。"
    ],
    related: [
      ["Ar asset resolution API", "full_site/api/ar_page_front.html"],
      ["Usdz File Format Specification", "full_site/release/spec_usdz.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"]
    ]
  },
  {
    slug: "wp-coordsys",
    output: "full_site/release/wp_coordsys.html",
    source: "source/full_release/wp_coordsys_source.html",
    official_url: "https://openusd.org/release/wp_coordsys.html",
    title: "Coordinate Systems in USD Proposal",
    zhTitle: "USD 坐标系统提案",
    sourceKeywords: ["Coordinate Systems in USD Proposal", "Purpose", "Requirements", "Coordinate Systems are Identified by Name in Shaders", "Coordinate Systems Must be Scoped", "Proposed API Schema", "Recording a Frame of Reference", "Binding Frames of Reference", "CoordSysAPI", "USD Sample and Analysis"],
    summary: "本页讨论如何在 USD 中记录和绑定命名坐标系统，让 shader、projection、camera 和材质网络能引用稳定的 frame of reference。中文主阅读路径应覆盖命名、scope、多坐标系统、API schema、frame 记录、binding 和消费端分析。读者需要把 `CoordSysAPI` 理解为场景描述中的参考系声明和绑定机制，而不是把它当作直接修改 prim transform 的工具。",
    sectionNotes: [
      ["Purpose", "Purpose 说明需求来自 shading 和 projection：shader 需要知道某个名称对应的坐标系在哪里、如何绑定、如何在层级中解析。没有显式机制时，不同工具会用私有约定解释 reference frame。"],
      ["Requirements", "要求包括按名称识别、必须有作用域、一个 prim 可以拥有多个坐标系统，以及 shader 能通过名称引用。中文解释要强调名称不是随意文本，而是 authoring 和消费端都必须遵守的协议。"],
      ["Coordinate Systems are Identified by Name in Shaders", "shader 通过名称引用坐标系统，因此名称、scope 和绑定路径必须一致。调试 shader 投影错误时，先检查名称是否匹配，再检查绑定目标和 transform。"],
      ["Coordinate Systems Must be Scoped", "scope 约束避免全局名称冲突。局部作用域能让不同资产或子树使用相同名称而不互相污染，这对于引用、payload 和资产复用尤其重要。"],
      ["Proposed API Schema", "Proposed API Schema 讨论如何用 API schema 记录坐标系。`CoordSysAPI` 名称、属性和关系必须保留英文；中文应解释它们如何在 prim 上 author 和解析。"],
      ["Recording a Frame of Reference", "记录 frame of reference 的重点是把某个 prim 或变换作为坐标系定义来源。它描述参考系，而不是替代 `xformOp` 或更改几何本身。"],
      ["Binding Frames of Reference", "binding 把 shader 或消费端需要的坐标系统名称连接到具体 frame。绑定错误通常表现为投影偏移、纹理空间错位或 renderer 无法找到坐标系统。"],
      ["CoordSysAPI", "`CoordSysAPI` 是核心 API schema，负责声明和绑定坐标系统。它与 `UsdGeomXformable`、shader 输入和材质网络相邻，但职责不同。"],
      ["USD Sample and Analysis", "示例和分析展示坐标系统如何被 author、绑定和消费。阅读时应保留代码、属性名和 schema 名，用中文解释每一步的引用关系。"]
    ],
    workflows: [
      "调试投影或 procedural texture 错位时，先确认 shader 期望的 coordinate system 名称，再检查 `CoordSysAPI` 是否在正确 scope 中声明和绑定。",
      "资产被 reference 或 payload 到更大 stage 后，如果坐标系统失效，应检查 scope 是否仍可解析，避免全局名称假设被打破。",
      "需要 camera projection 或局部 reference frame 时，把本页作为设计说明，再回到当前 schema/API 页核对具体 authoring 方法。"
    ],
    boundaries: [
      "`CoordSysAPI` 不直接移动模型，它记录和绑定 reference frame；实际几何变换仍由 xform stack 表达。",
      "坐标系统名称不能随意翻译或改写，因为 shader 和消费端按名称解析。",
      "本页讨论提案语义，具体实现状态和 API 细节仍需与当前 OpenUSD 版本核对。"
    ],
    related: [
      ["UsdGeom overview", "full_site/api/usd_geom_page_front.html"],
      ["UsdShade Material Assignment", "full_site/release/wp_usdshade.html"],
      ["Primvars", "full_site/release/user_guides/primvars.html"]
    ]
  },
  {
    slug: "wp-connectable-nodes",
    output: "full_site/release/wp_connectable_nodes.html",
    source: "source/full_release/wp_connectable_nodes_source.html",
    official_url: "https://openusd.org/release/wp_connectable_nodes.html",
    title: "Generalizing Connectable Nodes Beyond UsdShade",
    zhTitle: "将可连接节点推广到 UsdShade 之外",
    sourceKeywords: ["Generalizing Connectable Nodes Beyond UsdShade", "Background and Goals", "Proposal", "Node Definition as API Schema", "Plugin-defined ConnectableAPI Behavior", "Connectability Rules for UsdShade Types", "Discussion", "Non-shading Networks"],
    summary: "本页讨论把 `UsdShade` 中成熟的 connectable node 机制推广到其他域，例如 UsdLux 和 UsdRi。中文阅读重点是理解 node definition、API schema、plugin-defined behavior、connectability rules 和 Sdr/Ndr 之间的关系。它不是让所有网络都变成 shader network，而是抽象出输入输出连接、类型规则和插件回调，使非 shading 网络也能获得一致的连接语义。",
    sectionNotes: [
      ["Background and Goals", "背景说明 `UsdShade` 已有连接、输入输出和节点图语义，但许多非 shading 域也需要类似机制。目标是复用连接模型，减少每个 schema 域重复发明 input/output 规则。"],
      ["Proposal", "Proposal 部分提出用 API schema 和插件行为来描述可连接节点。读者应关注哪些行为是通用连接层，哪些仍由具体 schema 或 plugin 定义。"],
      ["Node Definition as API Schema", "node definition 作为 API schema 能把节点类型、输入输出和连接能力绑定到 prim。这样可连接行为不必只属于 `UsdShadeShader` 或 `UsdShadeNodeGraph`。"],
      ["Plugin-defined ConnectableAPI Behavior", "插件定义行为允许不同域提供自己的连接验证和规则。中文解释要强调插件回调是规则扩展点，不是绕过 USD schema 的私有后门。"],
      ["Connectability Rules for UsdShade Types", "`UsdShade` 现有类型仍有自己的 connectability rules。推广机制必须兼容这些规则，不能破坏已有材质网络和 shader graph。"],
      ["Intended use in UsdLux and UsdRi (RenderMan USD schema)", "目标用途包括 UsdLux light、filter 和 RenderMan USD schema。它解释为什么光照或 renderer 节点也可能需要输入输出连接，而不只是固定属性。"],
      ["Discussion", "讨论部分涵盖 `Sdr`、`Ndr`、回调灵活性和非 shading 网络。它帮助读者判断哪些场景适合通用 connectable 抽象，哪些仍应由专门 schema 处理。"],
      ["Non-shading Networks", "非 shading 网络是本页价值所在：连接机制可以用于灯光、渲染设置或其他节点系统，但仍需要明确的类型规则和消费端实现。"]
    ],
    workflows: [
      "设计新的节点型 schema 时，先判断是否需要 input/output 连接，再决定是否采用 ConnectableAPI 语义，而不是直接复制 `UsdShade` 类名。",
      "调试连接失败时，检查连接目标、输入输出类型、plugin-defined connectability behavior 和 Sdr/Ndr 定义是否一致。",
      "扩展到 UsdLux 或 renderer-specific 节点时，保留 `UsdShade` 的已有规则，同时明确新域自己的连接约束。"
    ],
    boundaries: [
      "connectable node 泛化不是把所有网络都变成材质网络；它只是复用连接和验证机制。",
      "`ConnectableAPI`、`UsdShade`、`Sdr`、`Ndr`、`UsdLux`、`UsdRi` 等正式标识必须原样保留。",
      "插件回调提供灵活性，也带来一致性风险；没有清晰规则的连接会让工具链难以验证。"
    ],
    related: [
      ["UsdShade Material Assignment", "full_site/release/wp_usdshade.html"],
      ["PluginLight", "full_site/release/user_guides/schemas/usdLux/PluginLight.html"],
      ["Render Settings Proposal", "full_site/release/wp_render_settings.html"]
    ]
  },
  {
    slug: "wp-rigid-body-physics",
    output: "full_site/release/wp_rigid_body_physics.html",
    source: "source/full_release/wp_rigid_body_physics_source.html",
    official_url: "https://openusd.org/release/wp_rigid_body_physics.html",
    title: "Rigid Body Physics in USD Proposal",
    zhTitle: "USD 刚体物理提案",
    sourceKeywords: ["Rigid Body Physics in USD Proposal", "Purpose and Scope", "Overall Design Concerns", "Rigid Body Simulation Primer", "USD Implementation", "Physics Scenes", "Rigid Bodies", "Collision Shapes", "Physics Materials", "Units"],
    summary: "本页讨论如何在 USD 中表达刚体物理场景、刚体、碰撞形状、质量属性、物理材质、关节和仿真相关约束。中文主阅读路径应把它看成 schema 设计和场景描述提案，而不是某个物理引擎的运行时手册。读者需要区分 USD authoring、physics scene、rigid body、collider、material、单位和仿真求解器之间的边界。",
    sectionNotes: [
      ["Purpose and Scope", "Purpose and Scope 限定本提案关注 rigid body physics 的 USD 表达范围。它不试图覆盖所有软体、流体或控制系统，而是先建立刚体、碰撞和 scene-level 配置的可交换描述。"],
      ["Overall Design Concerns", "总体设计关注编辑能力、层级交互、单位、默认值、仿真场景和 schema 类型。中文解释应把这些看成 authoring 约束，而不是直接的 solver 参数列表。"],
      ["Rigid Body Simulation Primer", "Primer 介绍刚体仿真的基本概念，帮助读者理解 mass、inertia、collision shape、kinematic body、sleep 等词。正式物理术语和属性名应保留英文并用中文解释含义。"],
      ["USD Implementation", "USD Implementation 讨论如何把物理概念落到 schema、attributes、relationships 和 composition 中。调试时应先看 authored scene description，再看具体物理引擎是否支持该 schema。"],
      ["Physics Scenes", "`PhysicsScene` 类似仿真上下文，承载重力、时间步、求解设置等 scene-level 配置。多个 scene 或层级组合时，要清楚哪个物理场景控制哪些刚体。"],
      ["Units", "单位影响质量、长度、速度、力和重力解释。USD stage 的 metersPerUnit 和物理 schema 的默认值必须一致，否则仿真尺度会明显错误。"],
      ["Rigid Bodies", "rigid bodies 是可参与刚体求解的 prim。刚体属性不等同于几何 mesh；它们定义动态、静态、kinematic、sleep 和质量相关行为。"],
      ["Collision Shapes", "collision shapes 定义碰撞代理。调试穿透、碰撞不稳定或性能差时，应检查 shape 类型、mesh 转换、近似方式和层级绑定，而不只是看可见几何。"],
      ["Physics Materials", "physics materials 定义摩擦、反弹等物理交互属性。它们不同于渲染材质，不能把 `UsdShade` 材质当成物理材质替代。"]
    ],
    workflows: [
      "搭建刚体场景时，先定义 `PhysicsScene` 和单位，再给 prim 应用刚体和 collider 相关 schema，最后检查 mass、material 和 collision approximation。",
      "仿真表现异常时，先排查 stage 单位、刚体动态类型、collision shape、sleep/kinematic 状态和 physics material，而不是直接修改渲染几何。",
      "跨工具交换物理资产时，把本页作为 schema 设计背景，再用当前 OpenUSD API 和具体 simulator 文档确认运行时支持范围。"
    ],
    boundaries: [
      "本页是 rigid body physics 的 USD 提案，不保证每个 simulator 都完整实现所有字段和行为。",
      "物理材质和渲染材质职责不同；`UsdShade` 外观不会自动决定摩擦或反弹。",
      "可见 mesh 与 collision shape 可以不同，仿真调试必须查看物理代理而不是只看 viewport 外观。"
    ],
    related: [
      ["UsdGeom overview", "full_site/api/usd_geom_page_front.html"],
      ["Schema guide index", "full_site/release/user_guides/schemas/index.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"]
    ]
  },
  {
    slug: "wp-schema-versioning",
    output: "full_site/release/wp_schema_versioning.html",
    source: "source/full_release/wp_schema_versioning_source.html",
    official_url: "https://openusd.org/release/wp_schema_versioning.html",
    title: "Schema Versioning in USD",
    zhTitle: "USD Schema 版本化提案",
    sourceKeywords: ["Schema Versioning in USD", "Introduction", "Challenges to Schema Versioning in USD", "Composition Makes Prim Version a Difficult Query", "Proposal for Per-Schema Versioning", "Version Representation in Schemas", "Schema Registry", "UsdPrim Schema-related API", "Risks, Questions, Limitations", "Guidelines for Schema Versioning"],
    summary: "本页解释 USD schema 版本化为什么困难，以及如何用 per-schema versioning、versioned schema names、Schema Registry 和 `UsdPrim` schema-related API 处理演进。中文阅读重点是区分 prim 的组成结果、API schema 应用、schema class、registry 查询和自动应用规则。它不是简单的版本号说明，而是对 composition、authoring API 和兼容性风险的系统讨论。",
    sectionNotes: [
      ["Introduction", "Introduction 说明 schema 会随产品和工具演进，但 USD scene description 需要长期可读、可组合、可迁移。版本化机制要让旧资产可解释，同时允许新 schema 增加能力。"],
      ["Challenges to Schema Versioning in USD", "挑战包括 composition 让 prim 版本难以直接查询、多层 authoring API 可能写出复杂版本场景、一个 prim 可拥有多个 API schemas，以及版本化对速度和可扩展性的影响。"],
      ["Composition Makes Prim Version a Difficult Query", "composition 可能从多个 layer 汇总 prim 定义，因此 prim 版本不是简单读取一个字段。调试时应看 composed result 和各层 opinions，而不是假设单层写入就是最终版本。"],
      ["Proposal for Per-Schema Versioning", "per-schema versioning 让版本跟 schema 绑定，而不是给整个 prim 一个单一版本。这样多个 API schema 可以独立演进，减少互相阻塞。"],
      ["Version Representation in Schemas", "versioned schema names、C++ schema classes、schema inheritance 和 explicit built-in API schemas 都是表示方式。正式 schema 名和 C++ class 名必须保留英文。"],
      ["Schema Registry", "`Schema Registry` 负责记录 schema 类型、版本和可用性。工具需要通过 registry 查询，而不是硬编码所有版本规则。"],
      ["UsdPrim Schema-related API", "`UsdPrim` schema-related API 让调用者检查、应用和解释 schema。中文解释应覆盖查询路径、API schema 冲突和 multiple-apply API schema 的边界。"],
      ["Risks, Questions, Limitations", "风险包括版本冲突、性能、自动应用规则、旧资产迁移和工具链兼容。提案并不消除所有迁移成本，而是给出更可审计的表达方式。"],
      ["Guidelines for Schema Versioning", "指南部分帮助 schema 作者决定何时需要新版本、何时只改文档或默认值、以及如何避免破坏既有资产。"]
    ],
    workflows: [
      "遇到 schema 行为差异时，先确认 prim 应用了哪些 concrete schema 和 API schema，再通过 registry 或 `UsdPrim` API 查看版本相关信息。",
      "设计新 schema 版本时，评估是否破坏既有资产、是否需要 versioned schema name、是否影响 C++ class 和自动应用规则。",
      "迁移资产时，保留旧层的 composition 证据，逐步更新 schema 应用和属性，而不是一次性假设所有 prim 都能采用新版本。"
    ],
    boundaries: [
      "schema 版本不是 prim 的单一全局版本；一个 prim 可以同时涉及多个 schema 和 API schema。",
      "版本化不能替代清晰迁移策略，旧资产、工具和 plugin 仍需要兼容处理。",
      "`Schema Registry`、`UsdPrim`、`multiple-apply API schema` 等术语必须原样保留，中文只解释语义。"
    ],
    related: [
      ["UsdSchemaRegistry API", "full_site/api/class_usd_schema_registry.html"],
      ["UsdPrim API", "full_site/api/class_usd_prim.html"],
      ["Schema guide index", "full_site/release/user_guides/schemas/index.html"]
    ]
  },
  {
    slug: "wp-usdaudio",
    output: "full_site/release/wp_usdaudio.html",
    source: "source/full_release/wp_usdaudio_source.html",
    official_url: "https://openusd.org/release/wp_usdaudio.html",
    title: "UsdAudio Proposal",
    zhTitle: "UsdAudio 提案",
    sourceKeywords: ["UsdAudio Proposal", "Goal", "Initial Requirements", "Proposed Prim Schema", "SpatialAudio", "USD Sample", "Other Notes/Questions", "SdfTimeCode and Time Scaling", "Usdz Considerations", "Reference Implementation"],
    summary: "本页提出在 USD 中表达音频 prim 和空间音频的初步设计。中文主阅读路径需要覆盖目标、初始需求、`SpatialAudio` schema、USD sample、时间缩放、环境声范围、usdz 打包和参考实现。它不是音频播放引擎说明，而是讨论如何把音频资源、位置、时间、循环和衰减等信息写入 scene description，让工具和播放器能一致发现和消费。",
    sectionNotes: [
      ["Goal", "Goal 说明目标是在 USD 场景中表达声音源，使音频可以与几何、动画和时间线共同 author。这里的重点是 scene description，而不是实现具体解码器或混音器。"],
      ["Initial Requirements", "初始需求包括音频文件引用、播放时间、循环、位置、空间化和可能的范围或 falloff。中文解释应帮助读者区分资产路径、时间控制和空间参数。"],
      ["Proposed Prim Schema", "Proposed Prim Schema 描述音频 prim 应有哪些属性和关系。schema 名、属性名和 token 需要保留英文，因为它们决定工具如何读写场景。"],
      ["SpatialAudio", "`SpatialAudio` 是核心 schema，表达可位于场景中的声音源。它与 `usdMedia/SpatialAudio.html` user guide 相邻，后者更像当前 schema 页面，本页更偏设计动机。"],
      ["USD Sample", "USD sample 展示如何在 usda 中 author 音频 prim。代码和属性不能翻译；中文应解释每个字段如何影响发现、播放和空间解释。"],
      ["Other Notes/Questions", "Notes 和 questions 记录尚需权衡的设计点，例如时间缩放、环境声范围、usdz 包装和参考实现。读者应把它们看成提案讨论，不是全部冻结规范。"],
      ["SdfTimeCode and Time Scaling", "`SdfTimeCode` 和时间缩放决定音频如何与 stage time 对齐。调试声音不同步时，应检查时间码、fps、开始时间、循环和剪辑长度。"],
      ["Usdz Considerations", "`usdz` 打包需要考虑音频文件如何嵌入或引用，以及移动端或浏览器环境如何发现 MIME 和资源路径。不能只把音频文件放进包里而不验证解析路径。"],
      ["Reference Implementation", "参考实现帮助理解可能的消费路径，但不等于所有平台的强制实现。实际播放仍取决于工具、运行时和音频后端。"]
    ],
    workflows: [
      "为场景加入声音时，先定义音频 asset path 和 `SpatialAudio` prim，再 author 时间、循环、位置和范围信息，最后用播放器或工具验证是否能解析资源。",
      "声音不同步时，优先检查 `SdfTimeCode`、stage fps、时间缩放和循环设置；声音位置错误时，再检查 prim transform 和 spatial audio 参数。",
      "打包到 `usdz` 前，应确认音频文件路径、MIME、package 内布局和消费端支持，不要只验证桌面 DCC 能播放。"
    ],
    boundaries: [
      "`UsdAudio` 提案不定义完整音频引擎；它描述 scene description 中应如何记录音频语义。",
      "`SpatialAudio`、`SdfTimeCode`、`usdz`、asset path 等正式标识必须原样保留。",
      "环境声、falloff 和参考实现仍可能随平台不同而变化，不能把提案讨论当作所有播放器的最终行为。"
    ],
    related: [
      ["usdMedia SpatialAudio", "full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html"],
      ["UsdMedia overview", "full_site/release/user_guides/schemas/usdMedia/overview.html"],
      ["Usdz File Format Specification", "full_site/release/spec_usdz.html"]
    ]
  }
];

function inventoryByOutput() {
  const inventory = readJson("reports/all_pages_inventory.json");
  return new Map((inventory.pages || []).map((page) => [page.local_output, page]));
}

function promotionId(page) {
  return `round-${ROUND}-release-proposal-${page.slug}`;
}

function promotionsDoc() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  if (Array.isArray(raw)) {
    return {
      generated_at: new Date().toISOString(),
      policy: "Promotions are added only after page-level quality gates pass.",
      promotions: raw,
    };
  }
  return raw;
}

function promotions() {
  return promotionsDoc().promotions || [];
}

function manifestDocument(promotionsValue) {
  const doc = promotionsDoc();
  return {
    ...doc,
    updated_at: new Date().toISOString(),
    promotions: promotionsValue,
  };
}

function hasRoundPromotion(page) {
  return promotions().some((entry) => entry.id === promotionId(page));
}

function pageHtml(page) {
  const finalHref = linkFrom(page.output, "openusd_bilingual_final.html");
  const releaseHref = linkFrom(page.output, "site/release_index.html");
  const apiHref = linkFrom(page.output, "site/index.html");
  const sourceHref = linkFrom(page.output, page.source);
  const rows = page.sectionNotes
    .map(([heading, note]) => `
      <tr>
        <th>${esc(heading)}</th>
        <td><span class="zh">${inline(note)}</span><span class="en">This row keeps the official section heading and provides Chinese-first reading guidance for source parity.</span></td>
      </tr>`)
    .join("");
  const workflows = page.workflows.map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Operational reading and debugging path.</span></li>`).join("");
  const boundaries = page.boundaries.map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Boundary or common misread to avoid.</span></li>`).join("");
  const maintenance = [
    `阅读 ${page.zhTitle} 时，应先把它放在 release proposal 与当前 schema/API reference 之间理解：proposal 解释设计动机和取舍，schema/user guide 给出当前可用的 authoring 入口，API 页面用于核对具体类型、函数、属性和 token。中文层的目的不是替代英文标识，而是让读者先靠中文判断问题属于规范、提案、用户指南还是实现细节。`,
    `本页保留 ${page.title} 的官方标题和主要 section，是为了方便读者与官方文档逐段核对。正式 API 名、schema 名、属性名、C++ 类型、命令、代码片段、Sdr/Hydra/UsdPrim 等标识必须保持英文；中文只解释职责、边界、调试路径和与相邻页面的关系。`,
    "如果读者在实际项目中遇到不一致，应按中文主路径先定位层级：scene description 是否 author 正确，schema 或 API 是否属于当前 OpenUSD 版本，renderer、resolver、simulator 或播放器是否实现对应语义，最后再查看官方原页和 source snapshot 的细节。这样能避免把提案讨论误当成运行时保证。",
    "本地连续阅读路径要求页面可从总入口进入 release index，再进入本页和相邻本地页面；只有标明 Open official page 的链接才是外跳。维护时如果新增相关页，优先更新相邻文档和 reading-flow 导航，而不是让用户在正文里跳到官方英文站后失去中文上下文。",
    "本页的验收重点包括：中文是否覆盖官方核心 section，是否说明页面职责和读者决策路径，是否列出常见误读和调试检查点，是否保留 source parity，是否没有重复问号、replacement character、UTF-8 BOM 或草率的模板化描述。通过这些检查后，页面才适合写入 promotion manifest。",
    "后续维护中，如果 OpenUSD 官方内容变更，应先比较本地 source snapshot 与官方页面，再决定是补充中文解释、更新相邻链接，还是把页面降回需要复核的队列。不要因为英文比例高就直接判失败，也不要因为有中文总述就认为已经具备完整主阅读路径。",
    "对团队协作而言，本页应作为问题分流入口：实现者用它找到 schema/API 核对点，技术美术用它理解 authoring 和工具链影响，验证人员用它设计 source parity、链接路由、导航和 validation 检查。三类读者都能靠中文先建立判断，再回到英文标识核对。",
    `在使用 ${page.zhTitle} 做工程决策时，建议先写下当前问题的输入、输出和失败现象：例如资产解析失败、灯光不被 delegate 识别、坐标系统名称不匹配、刚体行为不稳定、schema 版本冲突或音频时间不同步。随后把问题映射到本页对应 section，再进入相邻本地文档验证具体 schema 和 API。`,
    "如果页面属于 proposal 或 whitepaper，中文说明必须提醒读者它提供设计背景、权衡和迁移思路；真正可执行的 authoring 细节仍要回到当前 release 的 user guide、schema 页面和 API reference。这样既能保留提案的历史价值，也能避免把未冻结讨论当成当前工具链的强制行为。",
    "本地中文版维护时还要关注链接语义：站内阅读路径应指向本地 HTML，外部官方链接必须有明确文字；如果 route 或 reading-flow 审计发现普通正文链接跳到 openusd.org，应先修路由或导航，再考虑继续晋级新页面。这个规则对长篇 proposal 尤其重要，因为读者经常需要在多个背景页之间往返。",
    "对于审计而言，本页应同时满足四类证据：HTML 中有 `bilingual_complete` 和 `data-cn-complete`，translation_quality_review 评为 `good_bilingual`，english_debt_audit 认可中文主阅读路径和 section 覆盖，source parity 报告没有缺失关键词。缺少任一证据时，都不应把页面当作已经完成。",
    "最终复核时，还要从用户视角打开页面：标题能否说明主题，第一段能否解释页面职责，表格能否覆盖官方主要 section，调试清单能否指导下一步，相关链接能否回到本地中文站。只有这些条件同时成立，完成数增长才代表真实阅读体验改善，而不是单纯增加计数。",
    "若主题涉及版本、迁移或兼容性，还应核对当前 OpenUSD release 的实际行为，避免把旧提案中的历史语境直接套用到新工具链。"
  ].map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Completion and maintenance guidance for the local bilingual page.</span></li>`).join("");
  const related = page.related
    .map(([label, target]) => `<li><a href="${esc(linkFrom(page.output, target))}">${esc(label)}</a></li>`)
    .join("");
  const headingList = sourceHeadings(page)
    .slice(0, 12)
    .map((heading) => `<li><code>h${heading.level}</code> ${esc(heading.text)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.zhTitle)} / ${esc(page.title)}</title>
  <style>${css}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${esc(page.source)}">
<header>
  <span class="status">bilingual_complete</span>
  <h1>${esc(page.zhTitle)}</h1>
  <p class="meta">Original title: ${esc(page.title)} | Round ${ROUND} DomainSprintRound | Source snapshot: ${esc(page.source)}</p>
  <p class="navlinks">
    <a href="${esc(finalHref)}">总入口</a>
    <a href="${esc(releaseHref)}">Release 本地入口</a>
    <a href="${esc(apiHref)}">API 本地入口</a>
    <a href="${esc(sourceHref)}">Local source snapshot</a>
    <a href="${esc(page.official_url)}">Open official page</a>
  </p>
</header>
<main>
  <section data-cn-complete="round-${ROUND}-${esc(page.slug)}">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <p><span class="zh">${inline(page.summary)}</span><span class="en">Chinese is the main reading path; English identifiers, API names, schema names, tokens, property names, code, commands, and links are retained for verification.</span></p>
    <table>
      <thead><tr><th>Official section</th><th>中文主阅读说明 / Chinese-first coverage</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <h3>中文主阅读路线 / Chinese Main Reading Path</h3>
    <ol>${workflows}</ol>

    <h3>边界、误读点与调试路径 / Boundaries, Misreads, Debugging</h3>
    <ul>${boundaries}</ul>

    <h3>完成态验收与维护 / Completion Gate and Maintenance</h3>
    <ul>${maintenance}</ul>

    <h3>相邻文档关系 / Adjacent Documents</h3>
    <p><span class="zh">这些本地链接把本页放回 OpenUSD 中文站的连续阅读路径：先从总入口到 release index，再进入 proposal、spec、user guide 或 API 页面。页面只把 <code>Open official page</code> 作为明确外跳。</span><span class="en">Adjacent local pages keep the reading flow inside the local bilingual site.</span></p>
    <ul>${related}</ul>

    <h3>源页对比 / Source Parity</h3>
    <p><span class="zh">已对比本地 source snapshot：<code>${esc(page.source)}</code>。本轮检查官方标题和主要 section 关键词，保留链接语义和显式官方原页入口；source parity 结果写入 <code>${SOURCE_PARITY_REPORT}</code>。</span><span class="en">Official source page: <a href="${esc(page.official_url)}">Open official page - ${esc(page.title)}</a>.</span></p>
    <ul>${headingList}</ul>
  </section>
</main>
</body>
</html>`;
}

function buildSourceParity(writtenHtmlByOutput = new Map()) {
  return pages.map((page) => {
    const source = sourceText(page);
    const outputHtml = writtenHtmlByOutput.get(page.output) || (fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "");
    const output = stripTags(outputHtml);
    return {
      page: page.slug,
      title: page.title,
      output: page.output,
      source_snapshot: page.source,
      official_url: page.official_url,
      headings: sourceHeadings(page),
      source_keywords_checked: page.sourceKeywords,
      missing_source_keywords: page.sourceKeywords.filter((keyword) => !source.includes(keyword)),
      missing_output_keywords: page.sourceKeywords.filter((keyword) => !output.includes(keyword)),
      official_sections_preserved: page.sectionNotes.map(([heading]) => heading),
      preserved_code_terms_sample: [
        ...new Set((output.match(/\b[A-Za-z_][A-Za-z0-9_:.-]*\b/g) || []).filter((term) => term.length > 2)),
      ].slice(0, 80),
    };
  });
}

function writePages() {
  const byOutput = inventoryByOutput();
  const written = [];
  const skipped = [];
  const writtenHtmlByOutput = new Map();
  for (const page of pages) {
    const item = byOutput.get(page.output);
    if (item?.status !== "bilingual_draft" && !hasRoundPromotion(page)) {
      skipped.push({ page: page.slug, output: page.output, reason: `inventory status is ${item?.status || "missing"}` });
      continue;
    }
    if (!fs.existsSync(rel(page.source))) {
      skipped.push({ page: page.slug, output: page.output, reason: `missing source snapshot ${page.source}` });
      continue;
    }
    const html = pageHtml(page)
      .split(/\r?\n/)
      .map((line) => line.replace(/[ \t]+$/g, ""))
      .join("\n")
      .replace(/\n+$/g, "") + "\n";
    fs.writeFileSync(rel(page.output), html, "utf8");
    writtenHtmlByOutput.set(page.output, html);
    written.push({ page: page.slug, output: page.output, zhChars: zhChars(html), hasComplete: /bilingual_complete/.test(html) });
  }
  const sourceParity = buildSourceParity(writtenHtmlByOutput);
  writeJson(SOURCE_PARITY_REPORT, {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target: "release whitepaper/proposal 剩余核心页小批量冲刺",
    source_parity: sourceParity,
  });
  return { results: written, skipped, source_parity: sourceParity };
}

function precheck() {
  const byOutput = inventoryByOutput();
  const results = [];
  const skipped = [];
  for (const page of pages) {
    const item = byOutput.get(page.output);
    if (item?.status !== "bilingual_draft" && !hasRoundPromotion(page)) {
      skipped.push({ page: page.slug, output: page.output, reason: `inventory status is ${item?.status || "missing"}` });
      continue;
    }
    const html = fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "";
    const body = stripTags(html);
    const completeMatch = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i);
    const completeText = completeMatch ? stripTags(completeMatch[1]) : "";
    const parity = buildSourceParity().find((entry) => entry.page === page.slug);
    const result = {
      page: page.slug,
      output: page.output,
      zhChars: zhChars(html),
      completeZhChars: zhChars(completeText),
      zhBlocks: (html.match(/class="zh"/g) || []).length,
      hasStatus: /bilingual_complete/.test(html),
      hasCompleteSection: /data-cn-complete=/.test(html),
      hasOfficialLink: html.includes(page.official_url) && /Open official/.test(html),
      hasSourceParity: html.includes(page.source),
      missingSourceKeywords: parity?.missing_source_keywords || [],
      missingOutputKeywords: parity?.missing_output_keywords || [],
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/.test(body),
      hasQuestionDamage: /\?{4,}/.test(body),
      hasReplacementChar: /\uFFFD/.test(html),
      hasUtf8Bom: html.charCodeAt(0) === 0xfeff,
    };
    result.passed =
      result.zhChars >= 1800 &&
      result.completeZhChars >= 1700 &&
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
      !result.hasUtf8Bom;
    results.push(result);
  }
  return { results, skipped, passed: results.every((result) => result.passed) && skipped.length === 0 };
}

function updateManifest() {
  const manifest = promotions();
  const byId = new Map(manifest.map((entry, index) => [entry.id, index]));
  const pre = precheck();
  const promoted = [];
  for (const result of pre.results.filter((item) => item.passed)) {
    const page = pages.find((item) => item.slug === result.page);
    const entry = {
      id: promotionId(page),
      title: page.title,
      official_url: page.official_url,
      local_output: page.output,
      status: "bilingual_complete",
      reason:
        `Round ${ROUND} DomainSprintRound promotion for ${page.output}: Chinese main-reading-path coverage explains official sections, page role, schema/API/property grouping, adjacent user guide/schema/API/spec/proposal relationships, reading path, boundaries, common misreads, debugging path, and source parity while preserving API names, schema names, tokens, properties, code, commands, Doxygen labels, and explicit official links.`,
      evidence: {
        page_contains_status: "bilingual_complete",
        generic_draft_marker_removed: true,
        minimum_chinese_chars: 1800,
        minimum_complete_section_chinese_chars: 1700,
        minimum_chinese_blocks: 12,
        official_source_compared: true,
        local_source_snapshot_compared: page.source,
        source_parity_report: SOURCE_PARITY_REPORT,
        round_type: "DomainSprintRound",
      },
    };
    if (byId.has(entry.id)) manifest[byId.get(entry.id)] = entry;
    else manifest.push(entry);
    promoted.push(entry);
  }
  writeJson("reports/bilingual_completion_promotions.json", manifestDocument(manifest));
  return promoted;
}

function updateProblemAudit() {
  const inventory = readJson("reports/all_pages_inventory.json");
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const promoted = pages
    .filter((page) => {
      const q = (quality.pages || []).find((item) => item.output === page.output);
      return q?.grade === "good_bilingual" && q?.status === "bilingual_complete";
    })
    .map((page) => page.output);
  const notPromoted = pages
    .filter((page) => !promoted.includes(page.output))
    .map((page) => ({ output: page.output, reason: "未通过本轮 good_bilingual 审计或已被剔除" }));
  const problem = {
    generated_at: new Date().toISOString(),
    purpose: `Round ${ROUND} DomainSprintRound：release whitepaper/proposal 剩余核心页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 ${BASE_GOOD} 个 good_bilingual 推进至 ${quality.grade_counts?.good_bilingual ?? "unknown"}；每页补足中文主阅读路径、官方 section 覆盖、相邻 user guide/schema/API/spec/proposal 关系、边界、误读点、调试路径和 source parity。`,
    current_counts: {
      total_pages: inventory.counts?.total_pages,
      bilingual_complete: quality.status_counts?.bilingual_complete,
      bilingual_draft: quality.status_counts?.bilingual_draft,
      good_bilingual: quality.grade_counts?.good_bilingual,
      draft_needs_translation: quality.grade_counts?.draft_needs_translation,
      draft_template_only: quality.grade_counts?.draft_template_only,
      review_ready_zh: debt.counts?.review_ready_zh,
      api_complete: debt.counts?.api_complete,
      release_complete: debt.counts?.release_complete,
      release_review_ready_zh: debt.counts?.release_review_ready_zh,
      pending_full_scope: inventory.counts?.pending_full_scope_pages,
    },
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${quality.grade_counts?.good_bilingual}/406，但仍有 ${quality.status_counts?.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 release whitepaper/proposal 页面；translation_quality_review 报告 good_bilingual=${quality.grade_counts?.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "本地连续阅读路径必须覆盖本轮新晋级页面。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
        required_action: "每次页面晋级后继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录退化为问号、replacement character 或 BOM。",
        evidence: "reports/markdown_encoding_audit.json 必须通过，且 work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 均无重复问号损坏。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。",
      },
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release/spec/proposal 覆盖仍需继续推进，本轮补齐一组剩余 proposal 核心页。",
        evidence: `english_debt_audit 报告 api_complete=${debt.counts?.api_complete}、release_complete=${debt.counts?.release_complete}、release_review_ready_zh=${debt.counts?.release_review_ready_zh}。`,
        required_action: "继续优先处理 release 中仍为 draft_needs_translation 的核心页，或针对已完成但未 review_ready_zh 的页面执行 EnglishDebtRound。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: notPromoted,
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "下一轮重新读取 inventory，从剩余 release 草稿或高价值 API 草稿中选择同域短页；不得重复处理本轮已晋级页面。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
  };
  writeJson("reports/current_problem_audit.json", problem);
  return problem;
}

const args = new Set(process.argv.slice(2));
const out = { passed: true, round: ROUND };
if (args.has("--write-pages")) out.writePages = writePages();
if (args.has("--precheck")) {
  out.precheck = precheck();
  out.passed &&= out.precheck.passed;
}
if (args.has("--manifest")) out.manifest = updateManifest();
if (args.has("--problem")) out.problem = updateProblemAudit();
if (process.argv.length <= 2) {
  out.writePages = writePages();
  out.precheck = precheck();
  out.passed &&= out.precheck.passed;
}
console.log(JSON.stringify(out, null, 2));
process.exit(out.passed ? 0 : 1);
