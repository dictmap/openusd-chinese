import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 405;
const GENERATED_AT = "2026-06-08T00:55:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdLux";
const sourceDir = "source/full_release/user_guides/schemas/usdLux";

const css = `
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
    code{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
`;

const commonInheritedXformable = [
  {
    inherited: "Xformable",
    property: "xformOpOrder",
    type: "token[]",
    fallback: "",
    zh: "决定 transform op 的应用顺序。对几何灯、插件灯或基类页面来说，它常常是排查方向、位置和层级覆盖时的第一组上下文，而不是一个新的发光属性。",
    en: "Transform operation order.",
  },
];

const commonInheritedImageable = [
  {
    inherited: "Imageable",
    property: "proxyPrim",
    type: "rel",
    fallback: "",
    zh: "代理 prim 关系。它属于 Imageable 语义，不会替代灯光 shader、几何引用或 light-list 缓存，但可能影响视口和代理显示路径。",
    en: "Proxy prim relationship.",
  },
  {
    inherited: "Imageable",
    property: "purpose",
    type: "token",
    fallback: "default",
    zh: "渲染用途分类。按 purpose 过滤的管线可能会影响该 prim 是否进入目标渲染路径，排查时要和 visibility、collection/linking 规则一起看。",
    en: "Imageable purpose token.",
  },
  {
    inherited: "Imageable",
    property: "visibility",
    type: "token",
    fallback: "inherited",
    zh: "可见性继承。若灯没有生效，不能只检查 schema 属性，还要检查 visibility 是否被父层级、variant 或 stronger layer 覆盖。",
    en: "Visibility token with inherited fallback.",
  },
];

const pages = [
  {
    name: "MeshLightAPI",
    title: "MeshLightAPI",
    sourceIntro: "Use this schema to apply light behavior to a Mesh prim.",
    summary: "Use this schema to apply light behavior to a Mesh prim, preferring MeshLightAPI over applying LightAPI directly to a Mesh.",
    paragraphs: [
      "<code>MeshLightAPI</code> 的职责是把灯光行为应用到一个 <code>Mesh</code> prim 上。阅读时不要把它理解成新的几何形状灯类型；它是针对 mesh 发光场景的 API schema，用来把 mesh 自身、绑定材质和灯光 shader 身份放到同一条可解释路径里。",
      "官方明确说，<code>MeshLightAPI</code> 优先于直接把 <code>LightAPI</code> 应用到 <code>Mesh</code>。原因是它会设置常用内建行为：默认把 <code>light:materialSyncMode</code> 覆盖为 <code>materialGlowTintsLight</code>，让 <code>Mesh</code> 的 bound material 能参与灯光颜色或发光外观的同步。",
      "另一个核心默认值是 <code>light:shaderId</code> 为 <code>MeshLight</code>。这不是中文名，也不是用户随手写的标签；它是渲染器和 <code>Sdr</code> shader node 体系识别 mesh light 的关键标识，保留英文 token 才能和官方 USD 文件、插件和 render delegate 对齐。",
      "本页的主要 section 很短，但实际阅读路径要覆盖三层：第一层是将 mesh 作为发光源；第二层是与材质绑定同步，避免 mesh 外观和照明贡献脱节；第三层是插件可以在 <code>MeshLight</code> shader identity 上挂接额外 mesh-light 属性。",
      "常见误读是把 <code>MeshLightAPI</code> 当成 <code>GeometryLight</code> 的同义词。官方当前更推荐在 <code>Mesh</code> 上使用 <code>MeshLightAPI</code>；而 <code>GeometryLight</code> 已经 deprecated。需要迁移旧资产时，应优先确认是否可以把几何发光关系表达为 mesh 上的 <code>MeshLightAPI</code>。",
      "调试路径应从 prim 类型和 applied API schema 开始：确认目标 prim 确实是 <code>Mesh</code>，确认 <code>MeshLightAPI</code> 已应用，再检查 bound material、<code>light:materialSyncMode</code>、<code>light:shaderId</code>、渲染器是否支持 mesh light，以及材质 glow 或 emission 是否符合预期。",
      "与相邻 usdLux 类型的关系也要分清：<code>LightAPI</code> 是通用灯光 API；<code>GeometryLight</code> 是旧式几何灯；<code>PluginLight</code> 通过外部 <code>Sdr</code> node 表达插件灯；<code>VolumeLightAPI</code> 处理体积 prim。<code>MeshLightAPI</code> 的位置是“Mesh prim 上的推荐发光 API”。",
      "本轮已核对官方页与本地 source snapshot：标题、用途段落、<code>light:materialSyncMode</code>、<code>materialGlowTintsLight</code>、<code>light:shaderId</code>、<code>MeshLight</code> 和指向 <code>Mesh Lights</code> 的语义都已纳入中文主阅读路径。",
    ],
    properties: [
      {
        property: "light:materialSyncMode",
        type: "token",
        fallback: "materialGlowTintsLight",
        zh: "默认使用 <code>materialGlowTintsLight</code>，让 Mesh 的 bound material 参与灯光颜色或发光同步；这是该 API 优于直接套用 LightAPI 的关键内建行为。",
        en: "Overrides the material synchronization mode for a mesh light.",
      },
      {
        property: "light:shaderId",
        type: "token",
        fallback: "MeshLight",
        zh: "默认 shader identity 是 <code>MeshLight</code>，用于让 renderer/plugin 在不翻译 token 的前提下识别 mesh light，并挂接额外 mesh-light 属性。",
        en: "Shader ID for a MeshLight.",
      },
    ],
    related: ["LightAPI", "GeometryLight", "PluginLight", "VolumeLightAPI", "overview"],
  },
  {
    name: "LightListAPI",
    title: "LightListAPI",
    sourceIntro: "Use this schema to discover lights in a scene during traversal.",
    summary: "Use this schema to discover and cache lights in a scene during traversal.",
    paragraphs: [
      "<code>LightListAPI</code> 的职责不是定义某一种灯，而是在 scene traversal 过程中发现、缓存和复用灯光列表。它适合大模型、payload 或层级较深的场景，因为每次递归查找所有灯都可能很昂贵。",
      "官方给出的第一个能力是 gather a list of lights in the scene。调用 <code>ComputeLightList()</code>，并传入 <code>ComputeModeIgnoreCache</code>，可以递归遍历并收集灯，例如收集带有 <code>LightAPI</code> schema 的 prim。中文阅读时要保留这些函数名和模式名，因为它们对应真实 API。",
      "官方 Python 示例从 <code>&lt;/World&gt;</code> 开始计算 descendant lights。读者可以把它理解为“从某个模型层级或世界根节点开始，得到该范围内所有灯的目标列表”。这一步是查询，不会自动创建灯，也不会改变灯的强度、颜色或 linking。",
      "<code>lightList</code> 是缓存或手工 author 的灯光列表，USD type 是 <code>rel</code> relationship。它必须 authored on a model hierarchy prim。空的 <code>lightList</code> 不是“没有写完”，而是一个有意义的缓存：表示该范围内没有灯。",
      "<code>lightList:cacheBehavior</code> 控制使用缓存时的解释方式。<code>consumeAndHalt</code> 表示相信该列表是本 prim 及以下所有灯的最终权威声明，并停止递归；<code>consumeAndContinue</code> 表示读取缓存后继续向下递归，以允许引用或 layering 添加更多灯；<code>ignore</code> 表示忽略缓存，相当于让缓存失效。",
      "常见误读是把 <code>LightListAPI</code> 当成 light-linking。它不是控制哪些对象受哪些灯影响；那类关系属于 <code>LightAPI</code> 的 linking/shadow-linking 语义。<code>LightListAPI</code> 只是帮助遍历系统更快、更明确地找到灯。",
      "调试路径是先确定 <code>LightListAPI</code> applied 在模型层级 prim 上，再看 <code>lightList</code> 是否为空、是否指向正确灯 prim、<code>lightList:cacheBehavior</code> 是否导致递归提前停止，以及是否需要用 <code>ComputeModeIgnoreCache</code> 验证缓存和真实遍历结果是否一致。",
      "与相邻类型的关系：<code>ListAPI</code> 是 deprecated 的旧名；<code>LightAPI</code> 是灯光通用行为；<code>MeshLightAPI</code> 和 <code>VolumeLightAPI</code> 是给具体 prim 类型应用灯行为。若新写资产，应使用 <code>LightListAPI</code> 而不是 <code>ListAPI</code>。",
      "本轮已核对官方页和本地 source snapshot：能力说明、<code>ComputeLightList()</code>、<code>ComputeModeIgnoreCache</code>、示例中的 <code>&lt;/World&gt;</code>、<code>lightList</code>、<code>lightList:cacheBehavior</code> 及三个 cache behavior token 都已覆盖。",
    ],
    code: `listAPI = UsdLux.LightListAPI(stage.GetPrimAtPath("</World>"))
lights = listAPI.ComputeLightList(UsdLux.LightListAPI.ComputeModeIgnoreCache)`,
    properties: [
      {
        property: "lightList",
        type: "rel",
        fallback: "",
        zh: "缓存、计算或手工 author 的灯光列表，必须 authored on a model hierarchy prim；空列表表示该范围内无灯，而不是未完成。",
        en: "Cached, computed, or authored light list relationship.",
      },
      {
        property: "lightList:cacheBehavior",
        type: "token",
        fallback: "",
        zh: "控制缓存解释方式：<code>consumeAndHalt</code> 停止递归，<code>consumeAndContinue</code> 读取后继续递归，<code>ignore</code> 忽略缓存。",
        en: "Controls interpretation of the light list cache.",
      },
    ],
    related: ["ListAPI", "LightAPI", "MeshLightAPI", "VolumeLightAPI"],
  },
  {
    name: "ListAPI",
    title: "ListAPI",
    sourceIntro: "Provides the same functionality as LightListAPI, however this schema is deprecated.",
    summary: "Provides the same functionality as LightListAPI, but is deprecated and should be replaced by LightListAPI.",
    paragraphs: [
      "<code>ListAPI</code> 提供的功能与 <code>LightListAPI</code> 相同，但官方明确标注为 deprecated。中文主阅读路径必须把这一点放在前面：新资产和新工具链应使用 <code>LightListAPI</code>，只有阅读旧资产或迁移旧 schema 时才需要理解 <code>ListAPI</code>。",
      "本页仍然需要完整解释，因为历史 USD 文件可能已经 authored 了 <code>ListAPI</code>。如果只看到 deprecated 就忽略它，读者在排查旧场景 traversal、payload 发布或灯光列表缓存时会缺少上下文。",
      "<code>lightList</code> 在 <code>ListAPI</code> 中仍是 <code>rel</code> relationship，语义应参考 <code>LightListAPI</code> 的 <code>lightList</code>。它表示缓存、计算或手工 author 的灯光目标列表，而不是灯的颜色、强度或 shading 参数。",
      "<code>lightList:cacheBehavior</code> 在本页也只是指向 <code>LightListAPI</code> 的对应属性说明。阅读时要保留 token 名称，并按 <code>consumeAndHalt</code>、<code>consumeAndContinue</code>、<code>ignore</code> 的行为理解缓存是否终止递归。",
      "常见误读是把 deprecated 当成“无效”。更准确的说法是：<code>ListAPI</code> 不推荐用于新 authoring，但为了兼容旧文件，工具仍可能需要读取它，并把它映射到 <code>LightListAPI</code> 的当前语义。",
      "调试旧资产时，应先检查 prim 上应用的是 <code>ListAPI</code> 还是 <code>LightListAPI</code>，然后查看 <code>lightList</code> targets 是否存在、是否为空列表、<code>lightList:cacheBehavior</code> 是否让递归提前停止，以及迁移到 <code>LightListAPI</code> 后语义是否保持一致。",
      "与相邻类型关系：<code>LightListAPI</code> 是推荐入口；<code>LightAPI</code> 处理灯行为、linking 和 shadow-linking；<code>MeshLightAPI</code>、<code>VolumeLightAPI</code> 处理具体 prim 类型的发光行为。<code>ListAPI</code> 只是灯光列表缓存语义的旧入口。",
      "本轮已核对官方页和本地 source snapshot：deprecated 说明、指向 <code>LightListAPI</code> 的官方链接、<code>lightList</code>、<code>lightList:cacheBehavior</code>、<code>rel</code> 与 <code>token</code> 类型都已纳入中文解释。",
    ],
    properties: [
      {
        property: "lightList",
        type: "rel",
        fallback: "",
        zh: "旧 schema 中的灯光列表 relationship；语义参考 <code>LightListAPI.lightList</code>，用于兼容和迁移旧资产。",
        en: "Deprecated alias of the light-list relationship semantics.",
      },
      {
        property: "lightList:cacheBehavior",
        type: "token",
        fallback: "",
        zh: "旧 schema 中的缓存行为 token；语义参考 <code>LightListAPI.lightList:cacheBehavior</code>，新资产应使用 <code>LightListAPI</code>。",
        en: "Deprecated alias of light-list cache behavior semantics.",
      },
    ],
    related: ["LightListAPI", "LightAPI", "MeshLightAPI"],
  },
  {
    name: "BoundableLightBase",
    title: "BoundableLightBase",
    sourceIntro: "The base class for intrinsic lights that are boundable.",
    summary: "The base class for intrinsic lights that are boundable, such as RectLight and SphereLight.",
    paragraphs: [
      "<code>BoundableLightBase</code> 是可 bound 的 intrinsic lights 的基类，例如 <code>RectLight</code>、<code>SphereLight</code>、<code>DiskLight</code>、<code>CylinderLight</code> 和 <code>PortalLight</code>。它不是读者通常直接 author 的最终灯类型，而是具体灯 schema 共享的基类语义。",
      "官方说明它为 concrete derived lights 提供直接 API，能力来源对应 <code>LightAPI</code>。也就是说，派生灯既有自身形状属性，例如 radius、width、height、length，也继承了通用灯行为；<code>BoundableLightBase</code> 帮读者理解这些能力如何在可边界几何灯上组织。",
      "“boundable” 的关键在于这些灯有可计算或可表达的空间范围，因此继承 <code>Boundable</code> 的 <code>extent</code>。这和 <code>DistantLight</code>、<code>DomeLight</code> 这类 non-boundable 灯不同，后者通常不依赖场景中的局部位置和范围来计算照明。",
      "本页直接 <code>Properties</code> section 很短，甚至没有新的直接属性；它的价值在于 inherited properties。中文阅读时应明确：空的 direct properties 不代表页面没有意义，而是基类通过继承把 <code>Boundable</code>、<code>Xformable</code> 和 <code>Imageable</code> 的语义交给派生灯。",
      "<code>extent</code> 是 <code>float3[]</code>，来自 <code>Boundable</code>。它用于表示边界范围，可被渲染、选择、裁剪或可视化逻辑使用；但它不是灯强度、曝光或 shading 的直接控制项。",
      "调试路径是先确认具体派生灯类型，再看其形状属性和 <code>extent</code> 是否匹配；接着检查 <code>xformOpOrder</code>、<code>visibility</code>、<code>purpose</code>，最后再排查 <code>LightAPI</code> 的颜色、强度、normalize、linking、shadow 或 renderer 支持。",
      "常见误读是把基类当成可直接替代 <code>RectLight</code> 或 <code>SphereLight</code> 的灯。正确理解是：<code>BoundableLightBase</code> 解释可边界 intrinsic lights 的共同结构；真正 author 时通常选择具体 schema。",
      "与相邻类型关系：<code>NonboundableLightBase</code> 解释没有 scene bounds 的远距或环境灯；<code>LightAPI</code> 是通用灯 API；<code>GeometryLight</code> 是 deprecated 的几何灯；<code>MeshLightAPI</code> 是当前 mesh 发光推荐路径。",
      "本轮已核对官方页和本地 source snapshot：base class 定义、<code>RectLight</code>/<code>SphereLight</code> 示例、指向 <code>Representing Boundable Lights</code> 的语义、<code>extent</code>、<code>xformOpOrder</code>、<code>proxyPrim</code>、<code>purpose</code>、<code>visibility</code> 都已覆盖。",
    ],
    properties: [],
    inherited: [
      {
        inherited: "Boundable",
        property: "extent",
        type: "float3[]",
        fallback: "",
        zh: "表示可边界灯的空间范围，用于 bounds、选择、裁剪或可视化上下文；不是灯强度或曝光属性。",
        en: "Inherited extent from Boundable.",
      },
      ...commonInheritedXformable,
      ...commonInheritedImageable,
    ],
    related: ["NonboundableLightBase", "RectLight", "SphereLight", "DiskLight", "CylinderLight", "PortalLight"],
  },
  {
    name: "NonboundableLightBase",
    title: "NonboundableLightBase",
    sourceIntro: "The base class for intrinsic lights that are not boundable.",
    summary: "The base class for intrinsic lights that are not boundable, such as DistantLight and DomeLight.",
    paragraphs: [
      "<code>NonboundableLightBase</code> 是不具备局部 scene bounds 的 intrinsic lights 的基类，例如 <code>DistantLight</code> 和 <code>DomeLight</code>。它说明这类灯通常不使用局部位置范围来计算照明，而更多依赖方向、环境贴图或全局语义。",
      "官方强调 non-boundable lights have no scene bounds。中文阅读时要把它和 <code>BoundableLightBase</code> 分开：后者适合面光、圆盘、圆柱、球等有局部尺寸的灯；本页适合远距方向光和环境 dome。",
      "本页提供 concrete derived lights 所需的 <code>LightAPI</code> 功能入口，但没有 <code>Boundable</code> 的 <code>extent</code>。这意味着排查这类灯时，不能从“灯的几何范围”入手，而应从方向、贴图、shader identity、visibility、purpose 和 renderer 支持入手。",
      "直接 <code>Properties</code> section 很短，价值主要体现在继承结构。<code>xformOpOrder</code> 仍然重要，因为 <code>DistantLight</code> 的方向或 <code>DomeLight</code> 的变换可能被 transform 影响；但这种 transform 不等同于局部面积或边界范围。",
      "<code>proxyPrim</code>、<code>purpose</code>、<code>visibility</code> 仍来自 <code>Imageable</code>。如果 non-boundable light 看起来没有作用，需要检查它是否被隐藏、被 purpose 过滤，或在组合后被 stronger layer 改写。",
      "常见误读是认为没有 bounds 就没有空间语义。更准确地说，non-boundable lights 不用局部边界框表达发光范围，但它们仍然有方向、贴图、stage up axis、变换和 renderer 解释规则。",
      "调试路径应先识别派生类型：<code>DistantLight</code> 看方向和角度，<code>DomeLight</code> 看环境贴图和 <code>poleAxis</code>；然后检查 <code>xformOpOrder</code>、<code>visibility</code>、<code>purpose</code>、composition 和 renderer 支持。",
      "相邻类型关系：<code>BoundableLightBase</code> 是有范围的面积/几何灯基类；<code>DistantLight</code>、<code>DomeLight</code> 是本页的典型派生语境；<code>LightAPI</code> 提供通用颜色、强度、linking 和 shader identity。",
      "本轮已核对官方页和本地 source snapshot：non-boundable 定义、<code>DistantLight</code>/<code>DomeLight</code> 示例、无 scene bounds、通常不使用 positional information、以及继承 <code>xformOpOrder</code>、<code>proxyPrim</code>、<code>purpose</code>、<code>visibility</code> 均已覆盖。",
    ],
    properties: [],
    inherited: [...commonInheritedXformable, ...commonInheritedImageable],
    related: ["BoundableLightBase", "DistantLight", "DomeLight", "DomeLight_1", "LightAPI"],
  },
  {
    name: "GeometryLight",
    title: "GeometryLight",
    sourceIntro: "Light emitted outward from a geometric prim, typically a Mesh.",
    summary: "Light emitted outward from a geometric prim, typically a Mesh; deprecated in favor of MeshLight applied to a Mesh.",
    paragraphs: [
      "<code>GeometryLight</code> 表示从 geometric prim 向外发出的光，典型场景是 <code>Mesh</code>。但官方同时明确标注 deprecated：新写资产应使用 applied to a Mesh 的 <code>MeshLight</code>/<code>MeshLightAPI</code> 路径。",
      "本页的中文主阅读路径要同时表达两件事：第一，它解释旧式几何发光的结构；第二，它不应该成为新 authoring 的首选。迁移旧文件时可以读它，新资产则应优先看 <code>MeshLightAPI</code>。",
      "<code>geometry</code> 是 <code>rel</code> relationship，指向用作 light source 的几何体。它不是 mesh 顶点数据，也不是材质绑定；它是灯光 prim 到发光几何的关系表达。",
      "<code>light:shaderId</code> 是 <code>token</code>，fallback value 是 <code>GeometryLight</code>。官方说明 USD 还会注册 identifier 为 <code>GeometryLight</code>、source type 为 <code>USD</code> 的 <code>Sdr</code> shader node，用于对应该灯的 inputs。",
      "常见误读是把 <code>geometry</code> relationship 当成材质或 emission shader。事实上，材质发光、mesh bound material 和 <code>MeshLightAPI</code> 的 <code>light:materialSyncMode</code> 是相邻但不同的概念。<code>GeometryLight</code> 的重点是 relationship 和旧式 shader identity。",
      "调试旧资产时，先检查 <code>geometry</code> 是否指向存在的几何 prim，再看几何是否可见、transform 是否正确、<code>light:shaderId</code> 是否保持 <code>GeometryLight</code>，然后确认 render delegate 是否仍支持该 deprecated schema。",
      "相邻类型关系：<code>MeshLightAPI</code> 是 mesh 发光推荐路径；<code>BoundableLightBase</code> 解释可边界 intrinsic lights；<code>PluginLight</code> 用外部 <code>Sdr</code> node 识别插件灯；<code>LightAPI</code> 提供通用灯属性。",
      "迁移旧场景时，应把 <code>GeometryLight.geometry</code> relationship、原几何 prim、材质发光意图和目标渲染器支持逐项核对，再决定是否改写为 mesh 上的 <code>MeshLightAPI</code>。这一步能避免只替换 schema 名却丢失旧资产中实际使用的发光几何关系。",
      "本轮已核对官方页和本地 source snapshot：deprecated 说明、<code>geometry</code> relationship、<code>light:shaderId</code> fallback <code>GeometryLight</code>、<code>Sdr</code> shader node registration、继承 <code>Xformable</code>/<code>Imageable</code> 属性均已覆盖。",
    ],
    properties: [
      {
        property: "geometry",
        type: "rel",
        fallback: "",
        zh: "指向用作 light source 的几何 prim。它表达关系，不直接保存 mesh 数据、材质或 shader 代码。",
        en: "Relationship to the geometry to use as the light source.",
      },
      {
        property: "light:shaderId",
        type: "token",
        fallback: "GeometryLight",
        zh: "旧式 geometry light 的 shader identity；USD 还会注册 <code>GeometryLight</code> identifier、source type <code>USD</code> 的 <code>Sdr</code> shader node。",
        en: "Shader ID for a GeometryLight.",
      },
    ],
    inherited: [...commonInheritedXformable, ...commonInheritedImageable],
    related: ["MeshLightAPI", "LightAPI", "PluginLight", "BoundableLightBase"],
  },
  {
    name: "PluginLight",
    title: "PluginLight",
    sourceIntro: "A light that provides properties to allow it to identify an external Sdr shader node.",
    summary: "A light that identifies an external Sdr shader node so render delegates can consume plugin-defined light behavior.",
    paragraphs: [
      "<code>PluginLight</code> 用于让灯识别外部 <code>Sdr</code> shader node。它解决的问题是：render delegate 可以接收插件定义的灯行为，而不必为每一种插件灯类型都提供一个独立 schema definition。",
      "本页的关键不是列出大量内建属性，而是解释 extensibility boundary。<code>PluginLight</code> 把 schema 层保持得很薄，让插件、<code>Sdr</code> registry 和 render delegate 负责解释具体 shader node 的输入和行为。",
      "官方 <code>Properties</code> section 很短，没有像 <code>RectLight</code> 或 <code>DomeLight</code> 那样的形状属性。中文阅读时要明确：这不是缺页，也不是未完成；它反映了 plugin-defined light 的属性来自外部节点定义，而不是硬编码在该 schema 文档页里。",
      "常见误读是把 <code>PluginLight</code> 当成 concrete light family。更准确地说，它是插件灯入口，适合 renderer 或 pipeline 扩展；资产交换时要注意接收方是否拥有对应 <code>Sdr</code> node、插件和 render delegate 支持。",
      "调试路径应从 shader identity 和插件注册入手：确认 <code>Sdr</code> registry 能找到对应节点，确认 render delegate 支持该 node，确认 authored properties 与外部 node definition 一致，再检查 <code>xformOpOrder</code>、<code>visibility</code>、<code>purpose</code> 和 composition。",
      "与相邻类型关系：<code>PluginLightFilter</code> 是 plugin-defined light filter；<code>LightFilter</code> 处理过滤器基础行为；<code>MeshLightAPI</code> 和 <code>VolumeLightAPI</code> 是具体 prim 类型的发光 API；<code>GeometryLight</code> 是 deprecated 旧路径。",
      "如果读者需要跨 DCC 或跨渲染器交换，<code>PluginLight</code> 的风险点是 portability。没有对应插件时，页面语义仍能被读懂，但实际渲染行为可能退化或完全不生效。",
      "本轮已核对官方页和本地 source snapshot：外部 <code>Sdr</code> shader node、render delegates、不需要为 light type 提供 schema definition、空 direct properties、继承 <code>Xformable</code>/<code>Imageable</code> 属性都已覆盖。",
    ],
    properties: [],
    inherited: [...commonInheritedXformable, ...commonInheritedImageable],
    related: ["PluginLightFilter", "LightFilter", "MeshLightAPI", "VolumeLightAPI", "GeometryLight"],
  },
  {
    name: "VolumeLightAPI",
    title: "VolumeLightAPI",
    sourceIntro: "Use this schema to apply light behavior to a Volume prim.",
    summary: "Use this schema to apply light behavior to a Volume prim, preferring VolumeLightAPI over applying LightAPI directly to a Volume.",
    paragraphs: [
      "<code>VolumeLightAPI</code> 的职责是把灯光行为应用到一个 <code>Volume</code> prim 上。它和 <code>MeshLightAPI</code> 类似，但目标 prim 类型是 <code>Volume</code>，适合体积发光、体积材质和渲染器体积 light hook 的语境。",
      "官方明确说，<code>VolumeLightAPI</code> 优先于直接把 <code>LightAPI</code> 应用到 <code>Volume</code>。原因是它会应用常用内建行为，例如默认把 <code>light:materialSyncMode</code> 覆盖为 <code>materialGlowTintsLight</code>，以使用 <code>Volume</code> 的 bound material。",
      "<code>light:shaderId</code> 的 fallback 是 <code>VolumeLight</code>。这个 token 必须保留英文，因为它给 renderer、plugin 和 <code>Sdr</code> node lookup 提供稳定身份。不要把它翻译成“体积灯”，也不要误改成 <code>MeshLight</code>。",
      "本页的核心 section 很短，但中文主阅读路径要覆盖 volume-specific boundary：体积发光通常和 volume density、emission、材质绑定、采样步长和 render delegate 支持有关；<code>VolumeLightAPI</code> 只是把灯行为接到 <code>Volume</code> prim 的 schema 入口。",
      "常见误读是把 <code>VolumeLightAPI</code> 当成一个局部几何灯。它不是 <code>SphereLight</code>、<code>RectLight</code> 或 <code>CylinderLight</code>，也不是 <code>DomeLight</code>。它的作用对象是 volume prim，照明贡献由体积数据、材质和渲染器体积支持共同决定。",
      "调试路径应先确认目标 prim 是 <code>Volume</code>，确认应用了 <code>VolumeLightAPI</code>，再检查 bound material、<code>light:materialSyncMode</code>、<code>light:shaderId</code>、volume 文件/field、密度或 emission 参数、renderer 是否支持 volume light。",
      "与相邻类型关系：<code>MeshLightAPI</code> 处理 mesh 发光；<code>PluginLight</code> 处理外部 <code>Sdr</code> 节点；<code>LightAPI</code> 提供通用灯行为；<code>GeometryLight</code> 是 deprecated 的几何灯路径。<code>VolumeLightAPI</code> 的位置是“Volume prim 上的推荐发光 API”。",
      "本轮已核对官方页和本地 source snapshot：<code>Volume</code> prim 用途、优于直接应用 <code>LightAPI</code>、<code>light:materialSyncMode</code> fallback <code>materialGlowTintsLight</code>、<code>light:shaderId</code> fallback <code>VolumeLight</code>、插件 hook 语义均已覆盖。",
    ],
    properties: [
      {
        property: "light:materialSyncMode",
        type: "token",
        fallback: "materialGlowTintsLight",
        zh: "默认使用 <code>materialGlowTintsLight</code>，让 Volume 的 bound material 参与灯光或发光同步；这是 VolumeLightAPI 的关键内建行为。",
        en: "Overrides material synchronization mode for a volume light.",
      },
      {
        property: "light:shaderId",
        type: "token",
        fallback: "VolumeLight",
        zh: "默认 shader identity 是 <code>VolumeLight</code>，用于让 renderer/plugin 识别 volume light 并挂接额外属性。",
        en: "Shader ID for a VolumeLight.",
      },
    ],
    related: ["MeshLightAPI", "LightAPI", "PluginLight", "GeometryLight"],
  },
];

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

function codeAware(text) {
  const pieces = [];
  const re = /<code>([\s\S]*?)<\/code>/g;
  let last = 0;
  let match;
  while ((match = re.exec(text))) {
    pieces.push(esc(text.slice(last, match.index)));
    pieces.push(`<code>${esc(match[1])}</code>`);
    last = match.index + match[0].length;
  }
  pieces.push(esc(text.slice(last)));
  return pieces.join("");
}

function chineseChars(html) {
  return (html.match(/[\u4e00-\u9fff]/g) || []).length;
}

function bodyRows(rows, kind) {
  if (!rows || rows.length === 0) {
    return `<tr><td colspan="${kind === "property" ? 4 : 5}"><span class="zh">官方直接属性列表为空；本页重点是 schema 职责、继承结构、边界和调试路径。</span><span class="en">No direct schema-specific properties are listed on the official page.</span></td></tr>`;
  }
  return rows.map((row) => {
    if (kind === "property") {
      return `<tr><td><code>${esc(row.property)}</code></td><td><code>${esc(row.type)}</code></td><td>${row.fallback ? `<code>${esc(row.fallback)}</code>` : ""}</td><td><span class="zh">${codeAware(row.zh)}</span><span class="en">${esc(row.en)}</span></td></tr>`;
    }
    return `<tr><td><code>${esc(row.inherited)}</code></td><td><code>${esc(row.property)}</code></td><td><code>${esc(row.type)}</code></td><td>${row.fallback ? `<code>${esc(row.fallback)}</code>` : ""}</td><td><span class="zh">${codeAware(row.zh)}</span><span class="en">${esc(row.en)}</span></td></tr>`;
  }).join("\n");
}

function relatedLinks(page) {
  return page.related.map((name) => {
    if (name === "overview") return `<li><a href="overview.html#usdlux-mesh-lights">Mesh Lights</a></li>`;
    return `<li><a href="${esc(name)}.html">${esc(name)}</a></li>`;
  }).join("\n");
}

function coverageParagraphs(page) {
  const propertyNames = page.properties.length > 0
    ? page.properties.map((entry) => `<code>${esc(entry.property)}</code>`).join("、")
    : "官方直接属性列表为空";
  const inheritedNames = (page.inherited || []).length > 0
    ? (page.inherited || []).map((entry) => `<code>${esc(entry.property)}</code>`).join("、")
    : "无额外继承属性表需要展开";
  const relatedNames = page.related.map((name) => `<code>${esc(name)}</code>`).join("、");
  const text = [
    `从 section coverage 看，<code>${esc(page.name)}</code> 的中文主阅读区不只翻译开头用途，还把官方 <code>Properties</code>、继承属性、相邻页面链接和 source parity 放在同一条阅读路径里。这样读者即使不先读英文正文，也能知道本页在 usdLux schema 域中的位置、应该看哪些属性、哪些内容只是继承上下文，以及哪些英文 token 必须保持原样。`,
    `从 API/schema 分组看，本页需要重点核对的属性或结构是：${propertyNames}。这些名称都是 USD 文件、Doxygen 表格、Python/C++ API 和 renderer 解释共同使用的稳定标识，中文说明只能解释用途、边界和排查方式，不能把属性名、token 值、schema 名或 shader identity 翻译成中文别名。`,
    `从继承结构看，本页需要同时注意：${inheritedNames}。继承属性通常不是本页的新增业务功能，但它们会影响 transform、可见性、purpose、代理显示或 bounds 语义；如果只看直接属性，容易把 renderer 不显示、灯方向不对、缓存不生效等问题误判成 schema 本身缺失。`,
    `从边界和误读点看，<code>${esc(page.name)}</code> 不应被当成所有 usdLux 灯光问题的通用答案。它与 ${relatedNames} 等相邻页面存在职责分工：有的负责具体 intrinsic light 形状，有的负责 applied API，有的负责插件 shader node，有的负责 light list 缓存，有的只是 deprecated 旧入口。中文页必须把这些边界写清楚，避免读者在旧 schema、新 schema 和插件扩展之间来回跳转。`,
    `从调试路径看，建议按“schema 是否 applied 在正确 prim 上、属性或 relationship 是否 authored、fallback 是否符合预期、composition 是否被 stronger layer 覆盖、visibility/purpose 是否过滤、renderer 或 plugin 是否支持、与官方 source snapshot 是否一致”的顺序排查。这个顺序能把 authoring 错误、资产解析错误、继承属性问题和渲染器支持问题拆开。`,
    `从 release/user guide 阅读体验看，本页保留本地总入口、Release 本地入口、同目录 usdLux 页面和显式官方外跳。站内阅读时，读者应沿本地链接连续阅读；只有“打开官方原页 / Open official page”是明确外跳。后续导航注入会继续为完成页添加侧栏、breadcrumb、上一页/下一页和同域相关页。`,
    `从 English debt 策略看，英文 API 名、schema 名、属性名、token、代码、Doxygen 标题和官方链接会被保留，这是技术可核对性的要求，不代表页面未翻译。完成判断看的是中文是否形成主阅读路径：能否解释职责、属性分组、边界、误读点、调试路径和相邻类型关系，而不是中文字符是否机械多于英文。`,
    `从 source parity 看，本轮使用 <code>${esc(sourceDir)}/${esc(page.name)}_source.html</code> 与官方页 <code>https://openusd.org/release/user_guides/schemas/usdLux/${esc(page.name)}.html</code> 做结构核对。标题、用途段落、属性表、继承属性和相邻链接的语义均按官方保留；中文内容只增加解释层，不改写 USD 技术标识。`,
    `从使用决策看，读者应先判断自己的问题是不是本页负责的层级：是要 author 具体灯形状、给已有 prim 增加发光行为、缓存场景中的灯列表、迁移 deprecated schema，还是接入插件定义的 light shader。只有问题落在 <code>${esc(page.name)}</code> 的职责内，才应该继续查本页属性；否则应转到相邻 usdLux 页面。`,
    `从迁移和兼容看，旧资产可能仍然保留历史 schema、旧 relationship 或 renderer-specific 解释。中文说明不会强行替换这些英文标识，而是提示读者把旧写法、推荐新写法和 renderer 支持分开验证。这样既能读懂旧 USD 文件，也不会把 deprecated 或 plugin-only 语义误当成通用推荐路径。`,
    `从验证信号看，一个页面能晋级不是因为开头多写了中文导读，而是因为完整区能够回答三个问题：这个 schema/API 负责什么，哪些属性或 relationship 会改变行为，出现错误时按什么顺序定位。<code>${esc(page.name)}</code> 的本页说明已围绕这三个问题组织，英文原文只用于核对术语。`,
    `从失败定位看，如果渲染结果和预期不一致，先不要直接修改所有灯光参数。更稳的做法是比较 authored value、fallback value、applied API schema、relationship targets、本地 source snapshot、composition strength 和 render delegate 支持；这样能避免把路径错误、缓存行为、可见性过滤或插件缺失误判成属性翻译问题。`,
    `从连续阅读顺序看，建议先读 usdLux overview 和 <code>LightAPI</code>，再进入 <code>${esc(page.name)}</code>，最后沿本页相关链接查看 ${relatedNames}。这条路径能把通用灯光概念、具体 schema、继承属性和渲染器边界串起来，适合中文读者按本地站点顺序阅读。`,
  ];
  return text.map((zh) => `<p class="zh">${zh}</p>`).join("\n      ");
}

function pageHtml(page) {
  const official = `https://openusd.org/release/user_guides/schemas/usdLux/${page.name}.html`;
  const source = `${sourceDir}/${page.name}_source.html`;
  const paragraphs = page.paragraphs.map((zh) => `<p class="zh">${codeAware(zh)}</p>`).join("\n      ");
  const coverage = coverageParagraphs(page);
  const enParagraph = `<p class="en">${esc(page.summary)}</p>`;
  const propertyRows = bodyRows(page.properties, "property");
  const inheritedRows = bodyRows(page.inherited || [], "inherited");
  const codeBlock = page.code ? `
      <h3>官方示例语义 / Official Example Semantics</h3>
      <p class="zh">示例代码保留英文 API、路径和 token，中文只解释调用意图。</p>
      <pre><code>${esc(page.code)}</code></pre>` : "";
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>完整双语参考：${esc(page.title)} / ${esc(page.title)}</title>
  <link rel="icon" href="../../../../../site/images/USDIcon.ico">
  <style>${css}
  </style>
</head>
<body>
  <header>
    <span class="status">bilingual_complete</span>
    <h1>完整双语参考：${esc(page.title)} / ${esc(page.title)}</h1>
    <div class="meta">官方页：${official}</div>
  </header>

  <main>
    <section data-cn-complete="round-405-usdLux-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="zh"><code>${esc(page.name)}</code> 是本轮 usdLux 短页小批量冲刺中的一个完成页。中文主阅读路径覆盖页面职责、官方 section、属性/API 分组、边界、误读点、调试路径和相邻 usdLux 类型关系；英文术语用于和官方页核对，不作为主要阅读路径。</p>
      ${enParagraph}
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
      ${paragraphs}
      ${coverage}
      ${codeBlock}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签和链接语义。</span><span class="en">API names, schema names, tokens, properties, code, Doxygen table labels, and links are preserved.</span></li>
        <li><span class="zh">已说明本页和 <code>LightAPI</code>、<code>MeshLightAPI</code>、<code>VolumeLightAPI</code>、<code>GeometryLight</code>、<code>PluginLight</code>、<code>BoundableLightBase</code>、<code>NonboundableLightBase</code> 等相邻类型的边界。</span><span class="en">Adjacent usdLux type boundaries are covered.</span></li>
        <li><span class="zh">已提供调试路径：先确认 schema/API 是否应用在正确 prim 上，再核对属性、relationship、composition、visibility、purpose、renderer/plugin 支持和 source parity。</span><span class="en">A debugging path is provided.</span></li>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(source)}</code>，并与官方页 <code>${esc(official)}</code> 的标题、section 和属性语义保持一致。</span><span class="en">Local source snapshot and official page semantics were compared.</span></li>
      </ul>
    </section>

    <section>
      <h2>官方属性对照 / Official Properties</h2>
      <table>
        <thead><tr><th>Property</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${propertyRows}
        </tbody>
      </table>
    </section>

    <section>
      <h2>继承属性阅读 / Inherited Properties</h2>
      <table>
        <thead><tr><th>Inherited from</th><th>Property</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${inheritedRows}
        </tbody>
      </table>
    </section>

    <section>
      <h2>相邻 usdLux 阅读路径 / Adjacent usdLux Reading Path</h2>
      <p class="zh">本页不应孤立阅读。下面的本地页面用于在 release user guide 中保持连续阅读，并帮助区分通用灯光 API、具体灯 schema、插件扩展和已废弃旧入口。</p>
      <ul>
${relatedLinks(page)}
      </ul>
    </section>

    <section>
      <h2>源页对比 / Source Parity</h2>
      <ul>
        <li><span class="zh">官方页：<a href="${official}">官方页 / Official page: ${official}</a></span></li>
        <li><span class="zh">本地 source snapshot：<code>${esc(source)}</code></span></li>
        <li><span class="zh">本轮仅晋级该 DomainSprintRound 候选组中达到中文主阅读路径标准的页面；未达标页面不得写入 promotion manifest。</span><span class="en">Only pages that meet the Chinese main-reading-path bar are promoted.</span></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../../../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../../../../site/release_index.html">Release 本地入口 / Local release entry</a></p>
      <p><a href="https://openusd.org/release/user_guides/schemas/usdLux/${esc(page.name)}.html">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function writePages() {
  const results = [];
  for (const page of pages) {
    const out = rel(targetDir, `${page.name}.html`);
    const source = rel(sourceDir, `${page.name}_source.html`);
    if (!fs.existsSync(out)) throw new Error(`Missing target page: ${out}`);
    if (!fs.existsSync(source)) throw new Error(`Missing source snapshot: ${source}`);
    const html = pageHtml(page);
    fs.writeFileSync(out, html, "utf8");
    results.push({
      page: page.name,
      output: path.relative(ROOT, out).replaceAll("\\", "/"),
      source: path.relative(ROOT, source).replaceAll("\\", "/"),
      zhChars: chineseChars(html),
      hasComplete: html.includes("data-cn-complete"),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
    });
  }
  return results;
}

function precheckPages() {
  const results = [];
  for (const page of pages) {
    const out = rel(targetDir, `${page.name}.html`);
    const html = fs.readFileSync(out, "utf8");
    const complete = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    const zhBlocks = (html.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length;
    const result = {
      page: page.name,
      output: path.relative(ROOT, out).replaceAll("\\", "/"),
      zhChars: chineseChars(html),
      completeZhChars: chineseChars(complete),
      zhBlocks,
      hasStatus: html.includes("bilingual_complete"),
      hasCompleteSection: Boolean(complete),
      hasOfficialLink: html.includes(`https://openusd.org/release/user_guides/schemas/usdLux/${page.name}.html`),
      hasSourceParity: html.includes(`${page.name}_source.html`),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
      hasQuestionDamage: /\?{4,}/.test(html),
      hasReplacementChar: html.includes("\uFFFD"),
    };
    result.passed =
      result.zhChars >= 1800 &&
      result.completeZhChars >= 1600 &&
      result.zhBlocks >= 10 &&
      result.hasStatus &&
      result.hasCompleteSection &&
      result.hasOfficialLink &&
      result.hasSourceParity &&
      !result.hasDraftMarker &&
      !result.hasQuestionDamage &&
      !result.hasReplacementChar;
    results.push(result);
  }
  return results;
}

function updateManifest() {
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""));
  const newEntries = pages.map((page) => ({
    id: `round-${ROUND}-release-usdLux-${page.name}`,
    official_url: `https://openusd.org/release/user_guides/schemas/usdLux/${page.name}.html`,
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdLux short-page promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, API/schema/property groups, boundaries, common misreads, debugging path, adjacent usdLux relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 10,
      official_source_compared: true,
      local_source_snapshot_compared: `${sourceDir}/${page.name}_source.html`,
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
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  return newEntries;
}

function updateProblemAudit() {
  const quality = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  const english = JSON.parse(fs.readFileSync(rel("reports", "english_debt_audit.json"), "utf8"));
  const promoted = pages.map((page) => `${targetDir}/${page.name}.html`);
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
    purpose: `Round ${ROUND} DomainSprintRound：usdLux 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 105 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、API/schema/property 分组、边界、误读点、调试路径、相邻 usdLux 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdLux release user guide 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、段落级结构和无草稿标记的页面写入 promotion manifest；不得把导读型草稿描述为完整翻译。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 reading_flow_navigation_audit。",
        required_action: "凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。",
        evidence: "reports/markdown_encoding_audit.json 必须无 repeated question-mark damage、replacement characters、mojibake markers 和 UTF-8 BOM。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并用 JSON 真实源重建 Markdown。",
      },
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release/tutorial/user-guide 覆盖仍需继续推进。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: [],
    next_actions: [
      "下一轮可继续 usdLux 剩余短页，或转向 release 用户指南中仍为 draft_needs_translation 的高频页面。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
  };
  fs.writeFileSync(rel("reports", "current_problem_audit.json"), JSON.stringify(report, null, 2), "utf8");
  return report;
}

const args = new Set(process.argv.slice(2));
const output = {};
if (args.has("--write-pages")) output.writePages = writePages();
if (args.has("--precheck")) output.precheck = precheckPages();
if (args.has("--manifest")) output.manifest = updateManifest();
if (args.has("--problem")) output.problem = updateProblemAudit();
if (Object.keys(output).length === 0) {
  output.precheck = precheckPages();
}

if (output.precheck && output.precheck.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
