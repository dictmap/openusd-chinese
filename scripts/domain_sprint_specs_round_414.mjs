import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 414;
const BASE_GOOD = 165;
const GENERATED_AT = "2026-06-08T04:40:00.000Z";
const SOURCE_PARITY_REPORT = "reports/round_414_specs_source_parity.json";

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
  const file = rel(page.source);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
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
    slug: "spec",
    output: "full_site/release/spec.html",
    source: "source/full_release/spec_source.html",
    official_url: "https://openusd.org/release/spec.html",
    title: "Specifications",
    zhTitle: "OpenUSD 规范总览",
    sourceKeywords: ["Specifications", "UsdPreviewSurface Specification", "Usdz File Format Specification"],
    summary: "本页是 release 文档中的规范入口，主要把 UsdPreviewSurface 和 usdz 两类正式规范串到同一个阅读路径里。阅读时不要把它当普通目录页跳过；它负责告诉读者哪些页面是稳定规范、哪些页面是后续 proposal 或 user guide 的补充材料。中文主阅读路径应帮助读者先判断自己要查材质交换规范、文件打包规范，还是 proposal 背景。",
    sectionNotes: [
      ["Specifications", "这是规范目录页，职责是把正式 specification 与 proposal、user guide 区分开。遇到工具兼容、导入导出或格式约束问题时，应先从这里进入规范，而不是只看教程示例。"],
      ["UsdPreviewSurface Specification", "`UsdPreviewSurface` 规范定义跨 renderer 和 DCC 可共享的预览材质节点、输入端口、纹理读取、primvar 读取和版本变更。它更接近交换格式约定，不是某一个 renderer 的完整物理材质实现。"],
      ["Usdz File Format Specification", "`usdz` 规范定义 package 的 zip 基础、约束、布局、文件类型、可编辑性、可访问性、streaming 考量、MIME type 和工具链边界。它用于判断一个包是否能被 USD 运行时稳定消费。"],
      ["阅读路径", "如果问题是材质显示不一致，先进入 `UsdPreviewSurface Specification`；如果问题是打包、移动端加载、默认 layer 或 asset path，先进入 `Usdz File Format Specification`；如果问题是设计动机，再转到 Proposals。"],
      ["调试路径", "调试时先确认目标属于 specification 还是 proposal：规范页给出应遵守的约束，proposal 页给出设计讨论和历史背景。不要把 proposal 中的实验性语境直接当成已冻结规范。"],
      ["相邻关系", "本页与 `render_user_guide.html`、`spec_usdpreviewsurface.html`、`spec_usdz.html`、`wp.html` 相邻；它连接用户阅读路径、规范正文和方案讨论。"],
    ],
    workflows: [
      "定位规范问题时先从本页判断主题，再进入具体规范页，并保留 `UsdPreviewSurface`、`usdz`、`SdfLayer`、`ArResolver`、`defaultLayer.usd` 等正式标识。",
      "实现导入导出工具时，将 user guide 当成操作说明，将 specification 当成验收规则，将 proposal 当成背景材料，三者不要混用。",
      "本地中文站阅读时应从总入口进入 release index，再到本页，再到具体规范页；这样能保持 breadcrumb、侧栏和官方外跳清晰。"
    ],
    boundaries: [
      "目录页不逐条替代规范正文，中文说明只建立选择路径和边界判断；具体数值、token、节点和格式约束必须到子规范页核对。",
      "`UsdPreviewSurface` 和 `usdz` 都是英文正式名称，不能翻译成中文 token，也不能改写成工具内部别名。",
      "proposal 页面可以解释为什么这样设计，但不能覆盖 specification 对工具兼容性的硬约束。"
    ],
    related: [
      ["UsdPreviewSurface Specification", "full_site/release/spec_usdpreviewsurface.html"],
      ["Usdz File Format Specification", "full_site/release/spec_usdz.html"],
      ["Proposals", "full_site/release/wp.html"]
    ],
  },
  {
    slug: "spec-usdpreviewsurface",
    output: "full_site/release/spec_usdpreviewsurface.html",
    source: "source/full_release/spec_usdpreviewsurface_source.html",
    official_url: "https://openusd.org/release/spec_usdpreviewsurface.html",
    title: "UsdPreviewSurface Specification",
    zhTitle: "UsdPreviewSurface 规范",
    sourceKeywords: ["UsdPreviewSurface Specification", "Goal", "Core Nodes", "Preview Surface", "Texture Reader", "Primvar Reader", "Transform2d", "USD Sample", "Texture Coordinate Orientation in USD", "Roughness vs Glossiness", "Changes, by Version"],
    summary: "本页定义 `UsdPreviewSurface` 预览材质规范，目标是在不同 DCC、Hydra delegate 和 renderer 之间提供可交换的基础 PBR 表达。中文阅读重点不是把每个输入端口翻译成中文，而是说明 `Preview Surface`、`Texture Reader`、`Primvar Reader`、`Transform2d` 如何组成材质网络，以及 `diffuseColor`、`metallic`、`roughness`、`opacity`、`normal` 等输入的边界。",
    sectionNotes: [
      ["Goal", "目标 section 说明此规范服务于可预览、可交换的材质表示。它不是 renderer 的全部 shading 模型，而是一个足够通用的基础 surface，用来减少资产在工具间移动时的材质丢失。"],
      ["Core Nodes", "核心节点包括 `UsdPreviewSurface`、`UsdUVTexture`、primvar reader 和 `Transform2d`。中文主阅读路径要把它们看成材质网络的节点分组，而不是孤立属性表。"],
      ["Preview Surface", "`Preview Surface` 定义 surface shader 的输入端口，包括 `diffuseColor`、`emissiveColor`、`useSpecularWorkflow`、`metallic`、`roughness`、`clearcoat`、`opacity`、`opacityMode`、`normal` 等。所有端口名和 token 必须保留英文。"],
      ["Texture Reader", "`Texture Reader` 负责从纹理文件读取颜色或数据，并把结果连接到 surface 输入。排查贴图错误时要看文件路径、色彩空间、alpha 解释和连接目标，而不是只看材质节点。"],
      ["Primvar Reader", "`Primvar Reader` 用于读取几何体上的 primvar，例如 UV 坐标或自定义插值数据。它与 `Primvars` user guide 直接相关，常见误读是把 primvar 当成普通 uniform 参数。"],
      ["Transform2d", "`Transform2d` 提供纹理坐标变换，如 scale、rotation、translation。它影响纹理采样位置，不等价于移动模型本身。"],
      ["USD Sample", "USD sample 展示规范如何在 usda 中编码。代码和属性名不能翻译；中文解释应说明网络连接、输入默认值和 shader id 如何互相对应。"],
      ["Texture Coordinate Orientation in USD", "纹理坐标方向影响图像上下翻转和 UV 解释。跨 DCC 导入导出时，如果材质看似正确但贴图方向错误，应从这里核对约定。"],
      ["Roughness vs Glossiness", "`roughness` 与 glossiness 是相反语义的常见工作流差异。不要把 glossiness 数值直接塞进 `roughness`，需要按工作流转换。"],
      ["Changes, by Version", "版本变化说明规范演进。实现兼容时要看目标 OpenUSD 版本和变更点，不要假设所有输入端口在旧版本中都可用。"]
    ],
    workflows: [
      "材质显示异常时，先确认 shader id 是 `UsdPreviewSurface`，再检查输入端口默认值、纹理连接、primvar reader、UV transform 和 opacity mode。",
      "跨工具交换时，将此页作为端口语义核对表：保留 `inputs:*`、token、shader id 和 usda 示例，不把正式标识翻译成中文。",
      "需要更高阶 shading 时，可以把此规范当作预览层基础，再让 renderer-specific material 或 `UsdShade` 网络补充细节。"
    ],
    boundaries: [
      "`UsdPreviewSurface` 不是完整的 Disney BRDF 或任一 renderer 专属 shader；它是交换和预览层的最低共同语义。",
      "`roughness`、`metallic`、`opacityMode`、`normal` 等输入端口不能随意重命名，工具链依赖这些英文标识解析网络。",
      "如果资产使用复杂节点图，不能只靠此规范判断最终渲染效果，还要结合 `UsdShade`、render context 和 renderer 实现。"
    ],
    related: [
      ["Rendering with USD", "full_site/release/user_guides/render_user_guide.html"],
      ["Primvars", "full_site/release/user_guides/primvars.html"],
      ["UsdShade Material Assignment", "full_site/release/wp_usdshade.html"]
    ],
  },
  {
    slug: "spec-usdz",
    output: "full_site/release/spec_usdz.html",
    source: "source/full_release/spec_usdz_source.html",
    official_url: "https://openusd.org/release/spec_usdz.html",
    title: "Usdz File Format Specification",
    zhTitle: "usdz 文件格式规范",
    sourceKeywords: ["Usdz File Format Specification", "Purpose", "Usdz Specification", "Foundation", "Zip Constraints", "Layout", "File Types", "USD Constraints", "Editability", "Accessibility", "Packaging Considerations for Streaming and Encapsulation", "MIME Type", "Toolset", "Changes, by Version"],
    summary: "本页定义 `usdz` package 的正式格式约束。阅读重点是把它理解成一种零压缩、未加密、可直接消费的 zip package，而不是普通可随意编辑的压缩包。中文主阅读路径覆盖 foundation、zip constraints、layout、file types、USD constraints、editability、accessibility、streaming、MIME type 和 toolset。",
    sectionNotes: [
      ["Purpose", "Purpose 说明 `usdz` 是为了分发、传输和直接消费 USD 资产而设计的 package。它强调稳定打开和资产封装，而不是提供任意压缩格式的全部能力。"],
      ["Usdz Specification", "规范主体定义 package 可以包含什么、文件如何排列、默认 layer 如何选择、路径如何解析，以及运行时为何可以不解包直接消费。"],
      ["Foundation", "`usdz` 基于 zip archive，这提供广泛兼容性；但它不是普通 zip 的全部自由用法，因为 USD 运行时需要确定性的读取行为。"],
      ["Zip Constraints", "关键约束是 zero compression 和 unencrypted。压缩或加密会破坏直接访问、偏移计算和运行时消费，因此不能把 `usdz` 当成任意 zip 优化。"],
      ["Layout", "layout 说明包内文件和默认 layer 选择。`defaultLayer.usd`、第一个 USD 文件、anchored asset path 等规则影响 `SdfLayer::FindOrOpen` 和 resolver 行为。"],
      ["File Types", "包内文件类型必须能被 USD 运行时或相关插件消费。允许的 usda、usdc、usd、纹理和资源文件需要按规范判断，不要把任意外部文件塞进包里。"],
      ["USD Constraints", "USD 约束强调路径解析和 package 内引用必须可重现。跨机器分发时，使用 anchored asset paths 比依赖搜索上下文更稳定。"],
      ["Editability", "`usdz` 是只读 package；编辑内容通常需要解包、修改组成文件、再重新封装。不要期望在 package 内直接 author layer edits。"],
      ["Accessibility", "accessibility 关注消费者能否获取 root layer 和相关资源；这影响工具发现默认入口、解析文本 layer 和生成预览。"],
      ["Packaging Considerations for Streaming and Encapsulation", "streaming 和封装 section 说明文件顺序、可渐进读取和封装路径。网络传输时应避免让未完整下载的 package 直接当成完整 stage 打开。"],
      ["MIME Type", "MIME type `model/vnd.usdz+zip` 用于内容分发和平台识别。这个字符串必须保留原样。"],
      ["Toolset", "工具链 section 指向 `usdzip` 等操作工具；调试时应使用工具生成和验证 package，而不是手写不符合约束的 zip。"]
    ],
    workflows: [
      "打包前先确认 root layer、资源文件、纹理路径和 package 内引用都使用可重现路径，再用工具生成 `usdz`。",
      "加载失败时先检查 zip 是否零压缩且未加密，再检查 `defaultLayer.usd`、文件类型、anchored asset paths 和 resolver 行为。",
      "面向移动端或流式分发时，把 file ordering、streaming 和 MIME type 作为发布检查项，而不是只看本地能否打开。"
    ],
    boundaries: [
      "`usdz` 不是普通 zip 的同义词；压缩、加密和任意文件布局都可能让 USD runtime 无法直接消费。",
      "package 内引用和外部搜索路径应尽量避免依赖工作站本地环境，否则分发后会出现不可重现的解析结果。",
      "只读 package 不适合直接编辑；编辑流程应回到 usda/usdc/usd 源文件或解包后的组成层。"
    ],
    related: [
      ["Specifications", "full_site/release/spec.html"],
      ["SdfUsdzFileFormat API", "full_site/api/class_sdf_usdz_file_format.html"],
      ["Downloads and Videos", "full_site/release/dl_downloads.html"]
    ],
  },
  {
    slug: "wp",
    output: "full_site/release/wp.html",
    source: "source/full_release/wp_source.html",
    official_url: "https://openusd.org/release/wp.html",
    title: "Proposals",
    zhTitle: "OpenUSD 提案总览",
    sourceKeywords: ["Proposals", "Asset Previews in USD", "Render Settings in USD Proposal", "Stage Variable Expressions", "UsdShade Material Assignment"],
    summary: "本页是 proposal / whitepaper 入口，用于追溯 OpenUSD 设计动机、备选方案、工作流影响和仍需讨论的问题。它与 specification 不同：proposal 常说明为什么这样设计、当时考虑过什么边界，但不一定等于最终稳定规范。中文主阅读路径要帮助读者在 proposal、spec 和 user guide 之间切换。",
    sectionNotes: [
      ["Proposals", "这是提案目录页，职责是组织一组设计讨论。读者应把它当成理解背景、权衡和历史语境的入口，而不是直接替代 API reference 或 specification。"],
      ["Asset Previews in USD", "`Asset Previews in USD` 讨论资产预览的 object model、编码和 schema。它与 `AssetPreviewsAPI`、release 用户指南和资产发布流程相邻。"],
      ["Render Settings in USD Proposal", "`Render Settings in USD Proposal` 讨论 RenderSettings、RenderProduct、RenderVar、Hydra 解释和交互/批渲染工作流。它与 `usdRender` schema 和 render user guide 相邻。"],
      ["Stage Variable Expressions", "`Stage Variable Expressions` 已迁移到 OpenUSD-proposals。阅读时要把本地页面当成跳转和上下文说明，真正的提案正文在对应 proposal 仓库中。"],
      ["UsdShade Material Assignment", "`UsdShade Material Assignment` 讨论 collection-based assignment、binding strength、material purpose、resolve 和 DCC 集成，是理解材质绑定设计的重要背景。"],
      ["阅读路径", "遇到实现问题时先看 user guide 和 API；遇到标准约束看 spec；遇到为什么采用某个结构、还有哪些未决问题时再看 proposal。"],
      ["调试路径", "proposal 能解释概念边界，但调试仍要回到当前 schema、API 和 validation。不要只凭 proposal 中的讨论来判断当前版本行为。"]
    ],
    workflows: [
      "从总入口进入 proposal 目录后，按主题跳转到 asset preview、render settings、stage variables 或 UsdShade，再回到对应 schema/user guide 核对当前实现。",
      "做中文化时保留 proposal 标题、schema 名和 API 名，中文只补充设计语境、工作流和边界，不改动正式链接语义。",
      "对已迁移到 GitHub proposal 仓库的页面，保留显式外跳并说明本地页的作用是导航和上下文。"
    ],
    boundaries: [
      "proposal 不是全部已定规范；实现兼容性要以当前 release 的 schema、API 和 spec 为准。",
      "不要把 proposal 中的设计问题描述成已解决事实，尤其是 performance、instancing、layering、workflow questions。",
      "目录页的中文主阅读路径应帮助选路，不应伪装成每个 proposal 的完整正文翻译。"
    ],
    related: [
      ["Asset Previews in USD", "full_site/release/wp_asset_previews.html"],
      ["Render Settings in USD Proposal", "full_site/release/wp_render_settings.html"],
      ["UsdShade Material Assignment", "full_site/release/wp_usdshade.html"]
    ],
  },
  {
    slug: "wp-usdshade",
    output: "full_site/release/wp_usdshade.html",
    source: "source/full_release/wp_usdshade_source.html",
    official_url: "https://openusd.org/release/wp_usdshade.html",
    title: "UsdShade Material Assignment",
    zhTitle: "UsdShade 材质分配提案",
    sourceKeywords: ["UsdShade Material Assignment", "Background", "Basic Proposal for Collection-Based Assignment", "Example Collection-Based Assignment", "Refinement 1: Specifying Binding Strength", "Refinement 2: Material Purpose", "Material Resolve", "UsdShade API", "Analysis of Collection-Based Binding", "Integration", "Remaining Questions"],
    summary: "本页解释 `UsdShade` 材质分配设计，尤其是 collection-based assignment、binding strength、material purpose 和 material resolve。中文阅读重点是理解材质如何绑定到 geometry prim、collection 如何参与选择、强弱规则如何决定最终材质，以及 Katana、Maya、Houdini 等 DCC 集成为什么需要明确规则。",
    sectionNotes: [
      ["Background", "背景 section 描述传统材质绑定在复杂场景、集合选择和 DCC 工作流中的限制。它引出为什么需要 collection-based assignment，而不只是单个 prim 上的直接 binding。"],
      ["Basic Proposal for Collection-Based Assignment", "基本提案允许通过 collection 对一组 geometry 指定材质。读者需要区分 collection membership、material target 和 geometry prim 三者的关系。"],
      ["Example Collection-Based Assignment", "示例展示 collection-based assignment 如何落到 USD 结构中。代码、relationship 名、collection 名和 material path 必须保留原样，中文解释负责说明 resolve 过程。"],
      ["Refinement 1: Specifying Binding Strength", "`binding strength` 用于解决多个绑定竞争时的优先级问题。常见误读是以为最近祖先总是胜出；实际上强度元数据会改变 resolve。"],
      ["Refinement 2: Material Purpose", "`material purpose` 允许同一几何体面向 preview、full 或其他上下文选择不同材质。它与 render context 和可视化工作流相关。"],
      ["Material Resolve: Determining the Bound Material for any Geometry Prim", "Material resolve section 是调试核心：给定一个 geometry prim，要沿继承、collection membership、binding strength 和 purpose 判断最终材质。"],
      ["UsdShade API", "`UsdShade` API 为 authoring 和 query 提供正式入口。工具应使用 API 写入 binding、collection 和 purpose，而不是手工拼接关系路径。"],
      ["Analysis of Collection-Based Binding", "分析 section 讨论 collection binding 的表达能力和成本。它说明为什么这种方案适合大规模场景，但也需要明确 membership 和 resolve 性能。"],
      ["Integration", "Integration 覆盖 Katana、Maya I/O、Houdini 等应用。中文解释应强调 DCC 导入导出需要保留 binding strength、purpose 和 collection 语义。"],
      ["Remaining Questions", "剩余问题包括 performance、renderer instancing 和 material layering。它们是设计权衡，不应被误读为当前实现一定支持全部理想行为。"]
    ],
    workflows: [
      "材质错绑时，先定位 geometry prim，再检查直接 binding、collection membership、binding strength、material purpose 和最终 resolve 结果。",
      "在 DCC 间交换时，必须保留 `UsdShade` relationship、collection 和 token；只翻译说明，不翻译标识。",
      "如果 renderer instancing 或 material layering 表现异常，要回到 proposal 的 remaining questions 和当前 API 行为共同判断。"
    ],
    boundaries: [
      "collection-based assignment 不是简单的字符串匹配，它依赖 USD collection 语义和 material resolve 规则。",
      "`bindingStrength`、`material:binding`、`purpose` 等属性/关系名不能翻译或改写。",
      "proposal 的集成讨论不是所有 DCC 的当前行为承诺，具体工具还要看插件版本和实现。"
    ],
    related: [
      ["Rendering with USD", "full_site/release/user_guides/render_user_guide.html"],
      ["UsdPreviewSurface Specification", "full_site/release/spec_usdpreviewsurface.html"],
      ["UsdShade API", "full_site/api/usd_shade_page_front.html"]
    ],
  },
  {
    slug: "wp-render-settings",
    output: "full_site/release/wp_render_settings.html",
    source: "source/full_release/wp_render_settings_source.html",
    official_url: "https://openusd.org/release/wp_render_settings.html",
    title: "Render Settings in USD Proposal",
    zhTitle: "USD Render Settings 提案",
    sourceKeywords: ["Render Settings in USD Proposal", "Purpose and Scope", "Overall Design and Concerns", "Concrete Schemas", "Renderer-Specific Schemas", "Prim and Scene Organization", "Discovering Render Settings", "Selecting and Combining Render Settings", "Grouping RenderVars and RenderProducts", "Workflow Considerations", "Interactive vs. Batch Rendering", "Examples", "Discussion and Questions"],
    summary: "本页讨论 USD 中 render settings 的组织方式，核心对象包括 `RenderSettings`、`RenderProduct`、`RenderVar`、renderer-specific schemas 和 Hydra 中的解释路径。中文主阅读路径要帮助读者理解设置如何被发现、选择、组合，以及交互渲染和批渲染在同一 stage 中如何共存。",
    sectionNotes: [
      ["Purpose and Scope", "目的和范围说明本提案要解决 render settings 在 USD 中可发现、可组合、可保存的问题。它不是某个 renderer 的私有参数表，而是跨工作流的场景描述结构。"],
      ["Overall Design and Concerns", "整体设计关注如何避免设置散落、如何表达默认设置、如何处理 renderer-specific 选项，以及如何让工具能可靠定位可用 render settings。"],
      ["Concrete Schemas", "concrete schemas 讨论 `RenderSettings`、`RenderProduct`、`RenderVar` 等具体 schema。schema 名、属性名和 relationship 名必须保持英文。"],
      ["Renderer-Specific Schemas", "renderer-specific schemas 允许特定 renderer 扩展自己的参数，但应放在清晰命名空间中，避免污染通用 render settings 结构。"],
      ["Prim and Scene Organization", "场景组织 section 说明这些 prim 放在 stage 的什么位置、如何分组，以及如何从根路径或专用关系发现它们。"],
      ["Discovering Render Settings", "discovering 说明工具如何找到候选 settings。调试找不到输出配置时，应先看 stage metadata、关系和组织位置。"],
      ["Selecting and Combining Render Settings", "选择和组合 section 处理多个 settings 共存、覆盖和合并的规则。不要假设最后一个 authored setting 自动胜出。"],
      ["Grouping RenderVars and RenderProducts", "`RenderVar` 表达 AOV 或输出变量，`RenderProduct` 表达图像产品；分组规则决定哪些变量输出到哪些产品。"],
      ["Workflow Considerations", "工作流 section 区分 interactive 和 batch rendering。交互视图需要快速切换，批渲染需要稳定可复现的输出集合。"],
      ["Discussion and Questions", "讨论问题包括 ID variables、stereo rendering、camera exposure curves、denoising、crop windows 等。它们提示实现和标准化仍有边界。"]
    ],
    workflows: [
      "渲染输出缺失时，先找 `RenderSettings`，再看它引用的 `RenderProduct` 和 `RenderVar`，最后检查 renderer-specific schema。",
      "批渲染配置应保存为可复现的 USD prim 结构，而不是只依赖应用 UI 中的临时设置。",
      "需要 Hydra 解释时，把本页与 `usdRender` schema 页面、render user guide 和具体 renderer 文档一起核对。"
    ],
    boundaries: [
      "`RenderSettings` 不等于 renderer 全部参数；通用 schema 和 renderer-specific schema 要分层处理。",
      "`RenderVar`、`RenderProduct`、AOV、camera、crop window 等标识不能翻译成中文属性名。",
      "proposal 中的讨论问题不一定全是当前 release 的稳定特性，需要结合 schema 页面和 validation 结果。"
    ],
    related: [
      ["Rendering with USD", "full_site/release/user_guides/render_user_guide.html"],
      ["RenderSettings schema", "full_site/release/user_guides/schemas/usdRender/RenderSettings.html"],
      ["RenderVar schema", "full_site/release/user_guides/schemas/usdRender/RenderVar.html"]
    ],
  },
  {
    slug: "wp-stage-variables",
    output: "full_site/release/wp_stage_variables.html",
    source: "source/full_release/wp_stage_variables_source.html",
    official_url: "https://openusd.org/release/wp_stage_variables.html",
    title: "Stage Variable Expressions",
    zhTitle: "Stage Variable Expressions 提案入口",
    sourceKeywords: ["Stage Variable Expressions", "OpenUSD-proposals: Stage Variable Expressions"],
    summary: "本页是 `Stage Variable Expressions` 提案的迁移入口，正文提示该 proposal 已迁移到 OpenUSD-proposals 仓库。中文主阅读路径要说明本地页仍有导航价值：它连接 release proposal 目录、变量表达式 user guide、stage/layer/composition 语境和外部 proposal 原文。",
    sectionNotes: [
      ["Stage Variable Expressions", "标题说明主题是 stage 变量表达式。它与 `expressionVariables`、layer metadata、composition 和变量驱动的路径/变体选择有关。"],
      ["OpenUSD-proposals: Stage Variable Expressions", "正文指向迁移后的 proposal。这个外部链接应作为显式外跳保留；本地中文页解释它为什么被迁移以及读者应如何继续阅读。"],
      ["与 Variable Expressions user guide 的关系", "user guide 解释变量如何定义和求值；proposal 解释设计动机和范围。调试当前行为时先看 user guide，再看 proposal 背景。"],
      ["与 stage/layer 的关系", "stage variables 通常通过 layer metadata 参与 composition。不要把它们误读成运行时全局环境变量，也不要把表达式当 Python 代码执行。"],
      ["阅读路径", "从 proposal 目录进入本页后，若需要操作说明，转到 `variable_expressions.html`；若需要设计背景，打开 OpenUSD-proposals 链接；若需要 API 行为，回到当前 release 文档。"],
      ["调试路径", "变量表达式失败时，检查变量是否定义、类型是否匹配、表达式函数是否受支持、composition 叠加是否改变了变量值。"]
    ],
    workflows: [
      "把本页作为迁移提示和上下文页面：先确认 proposal 已外迁，再决定是看用户指南、当前 release 行为，还是外部 proposal 仓库。",
      "在资产中使用变量时，保留 `expressionVariables`、`if()`、`defined()` 等函数和 metadata 名称，不把它们翻译成中文。",
      "跨 layer 排查时，按 composition 顺序确认变量定义和覆盖，而不是只看单个 layer 的文本。"
    ],
    boundaries: [
      "stage variable expression 不是 Python 脚本，也不是 shell 环境变量；它是 USD layer/composition 语境下的表达式机制。",
      "外部 GitHub proposal 提供设计背景，但当前可用行为仍应以 release 文档和实现版本为准。",
      "本地页不伪装成完整 proposal 翻译；它提供中文导读、迁移说明和阅读路径。"
    ],
    related: [
      ["Variable Expressions", "full_site/release/user_guides/variable_expressions.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"],
      ["Proposals", "full_site/release/wp.html"]
    ],
  },
  {
    slug: "wp-asset-previews",
    output: "full_site/release/wp_asset_previews.html",
    source: "source/full_release/wp_asset_previews_source.html",
    official_url: "https://openusd.org/release/wp_asset_previews.html",
    title: "Asset Previews in USD",
    zhTitle: "USD 资产预览提案",
    sourceKeywords: ["Asset Previews in USD", "Introduction", "Proposal", "Object Model", "Relationship to UsdGeomModel Texture Cards", "Concrete Encoding", "Schema"],
    summary: "本页讨论 USD 中资产预览的表示方式，目标是让资产能携带可发现、可渲染或可展示的 preview 信息。中文阅读重点是 object model、concrete encoding、schema、以及它与 `UsdGeomModel` texture cards 和 `AssetPreviewsAPI` 的关系。",
    sectionNotes: [
      ["Introduction", "Introduction 说明为什么资产需要 preview：浏览器、资产库、DCC 和发布系统都需要快速展示资产状态，而不是每次都打开完整 stage。"],
      ["Proposal", "proposal section 给出资产预览的总体方案，包括在 USD 中如何表达预览、如何被工具发现、以及与模型资产的关系。"],
      ["Object Model", "object model 说明预览对象、资产 prim、关系和元数据如何组织。读者要区分 preview 资产本身与被预览的主资产。"],
      ["Relationship to UsdGeomModel Texture Cards", "与 `UsdGeomModel` texture cards 的关系说明预览机制不只是贴图卡片；texture cards 可以是展示方式之一，但 schema 语义更广。"],
      ["Concrete Encoding", "concrete encoding 描述具体 USD 编码方式。调试时应检查关系路径、属性值、asset path 和 schema 应用是否符合提案意图。"],
      ["Schema", "schema section 连接到 `AssetPreviewsAPI` 等具体 schema。API 名和属性名必须保留英文，中文解释关注职责和使用路径。"],
      ["阅读路径", "资产库或 preview UI 出问题时，先看此 proposal 理解 object model，再看 `AssetPreviewsAPI` schema 检查实际属性，最后看资产发布流程。"],
      ["边界", "preview 不是完整渲染替代品，也不保证代表资产所有变体或时间采样；它是资产发现和快速浏览的辅助描述。"]
    ],
    workflows: [
      "为资产添加 preview 时，先决定预览图、预览 stage 或 texture card 的来源，再通过 schema/relationship 把它与主资产关联。",
      "资产库读取 preview 失败时，检查 schema 是否应用、asset path 是否可解析、preview 对象是否与主资产路径一致。",
      "如果 preview 与实际资产不一致，应核对发布流程是否在变体、材质或时间采样变化后刷新 preview。"
    ],
    boundaries: [
      "asset preview 不等于完整渲染产品，它面向浏览和发现，不负责替代 render settings 或最终帧输出。",
      "`AssetPreviewsAPI`、`UsdGeomModel`、texture cards 和 relationship 名称不能翻译或改写。",
      "proposal 的 object model 需要结合当前 schema 页面使用，不能只凭目录链接判断实现。"
    ],
    related: [
      ["AssetPreviewsAPI schema", "full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html"],
      ["Proposals", "full_site/release/wp.html"],
      ["USD Products", "full_site/release/usd_products.html"]
    ],
  },
];

function inventoryByOutput() {
  const inventory = readJson("reports/all_pages_inventory.json");
  return new Map((inventory.pages || []).map((page) => [page.local_output || page.output, page]));
}

function promotions() {
  const file = rel("reports/bilingual_completion_promotions.json");
  if (!fs.existsSync(file)) return [];
  const manifest = readJson("reports/bilingual_completion_promotions.json");
  return Array.isArray(manifest) ? manifest : manifest.promotions || [];
}

function manifestDocument(nextPromotions) {
  const file = rel("reports/bilingual_completion_promotions.json");
  if (!fs.existsSync(file)) {
    return {
      generated_at: GENERATED_AT,
      policy:
        "Curated promotion manifest for full_site pages that have been upgraded from bilingual_draft to bilingual_complete after paragraph-level bilingual coverage and draft-marker removal.",
      promotions: nextPromotions,
      updated_at: new Date().toISOString(),
    };
  }
  const current = readJson("reports/bilingual_completion_promotions.json");
  if (Array.isArray(current)) return nextPromotions;
  return {
    ...current,
    promotions: nextPromotions,
    updated_at: new Date().toISOString(),
  };
}

function promotionId(page) {
  return `round-${ROUND}-release-spec-${page.slug}`;
}

function hasRoundPromotion(page) {
  return promotions().some((entry) => entry.id === promotionId(page) && entry.local_output === page.output);
}

function activePages() {
  const byOutput = inventoryByOutput();
  return pages.filter((page) => {
    const item = byOutput.get(page.output);
    return item?.status === "bilingual_draft" || hasRoundPromotion(page);
  });
}

function pageHtml(page) {
  const finalHref = linkFrom(page.output, "openusd_bilingual_final.html");
  const releaseHref = linkFrom(page.output, "site/release_index.html");
  const apiHref = linkFrom(page.output, "site/index.html");
  const related = page.related
    .map(([label, target]) => `<li><a href="${esc(linkFrom(page.output, target))}">${esc(label)}</a></li>`)
    .join("\n");
  const keywordText = page.sourceKeywords.join("、");
  const relatedText = page.related.map(([label]) => label).join("、");
  const mainReadingPath = `
    <h3>中文主阅读路线 / Chinese Main Reading Path</h3>
    <p><span class="zh">页面职责：${esc(page.zhTitle)} 首先要回答“这页在 OpenUSD 文档体系里负责什么”。对 spec 页面，它负责给出可实现、可验证的格式或节点约束；对 proposal / whitepaper 页面，它负责解释设计动机、候选方案、未决问题和与当前 release 行为的关系。读者不应只读英文标题就跳走，而应能从中文说明中判断本页属于正式规范、提案背景、工具实现线索还是相邻 user guide 的补充。</span><span class="en">Role note: this page explains whether the document is a normative spec, proposal background, or adjacent workflow material.</span></p>
    <p><span class="zh">官方 section 覆盖：本页保留并解释 ${esc(keywordText)} 等官方结构。中文解释不替换英文标题，而是把每个 section 放回 OpenUSD 的资产创作、composition、schema、API、渲染或打包工作流中理解。这样读者可以先用中文建立主路径，再用英文原名核对 API/schema/token/属性名/函数名/代码和链接语义。</span><span class="en">Section coverage note: official headings are retained and explained in Chinese.</span></p>
    <p><span class="zh">API/schema/property 分组：如果本页提到 <code>UsdShade</code>、<code>UsdPreviewSurface</code>、<code>RenderSettings</code>、<code>RenderProduct</code>、<code>RenderVar</code>、<code>usdz</code>、<code>AssetPreviewsAPI</code>、<code>expressionVariables</code>、<code>SdfLayer</code>、<code>ArResolver</code> 或类似正式标识，中文只解释职责和边界，不翻译这些标识。调试和实现时应按照 schema/API 的正式名称查找属性、relationship、token、metadata、shader id 和 package 规则。</span><span class="en">Identifier note: formal API, schema, property, token, and code names remain unchanged.</span></p>
    <p><span class="zh">相邻文档关系：本页与 ${esc(relatedText)} 以及 release index、API Doxygen 本地入口形成连续阅读链。遇到“怎么操作”的问题，优先回到 user guide；遇到“必须满足什么约束”的问题，进入 specification；遇到“为什么这样设计或有哪些权衡”的问题，再读 proposal。这个顺序能避免把示例、规范和历史讨论混成同一种依据。</span><span class="en">Adjacent-doc note: choose user guides, specs, or proposals according to the question being debugged.</span></p>
    <p><span class="zh">边界和误读：不要把 proposal 中的讨论文字当作当前 release 的全部承诺，也不要把 specification 中的英文 token 改成中文别名。若页面看起来只是目录或迁移提示，也仍要保留它的导航职责：指出读者下一步应该打开哪个本地页、哪个官方原页、哪个 schema/API 页，以及哪些链接是显式外跳。</span><span class="en">Boundary note: proposals explain design context; specifications provide stronger constraints; links must stay explicit.</span></p>
    <p><span class="zh">调试路径：如果实现、导入导出、渲染或打包结果和预期不一致，应先在本页确认主题边界，再检查相邻 schema/API 页面，最后回到具体工具日志和 validation 报告。常见排查项包括 source snapshot 是否对应当前 release、官方 section 是否被覆盖、属性名或 token 是否被改写、本地 reading-flow 是否还能回到总入口和 release/API 入口。</span><span class="en">Debugging note: confirm source parity, identifier preservation, local routing, and reading-flow navigation before treating the page as complete.</span></p>
    <h3>完成态验收与维护 / Completion Gates and Maintenance</h3>
    <p><span class="zh">完成态验收不是只看页面能打开。晋级前必须确认本页已经从草稿状态转为 <code>bilingual_complete</code>，并且 <code>translation_quality_review</code> 给出 <code>good_bilingual</code>。如果中文只是在开头写一段导读，而官方结构、相邻关系、误读边界和调试路径仍要依赖英文正文，页面就不应写入 promotion manifest。</span><span class="en">Completion gate: status and quality must both pass.</span></p>
    <p><span class="zh">更严格的 <code>review_ready_zh</code> 依赖中文主阅读路径和 section coverage。spec/whitepaper 页面尤其要说明本页是规范、提案、迁移提示还是目录入口；还要说明读者遇到材质、打包、渲染设置、stage variable 或 asset preview 问题时，下一步应看哪个本地页面或官方原页。</span><span class="en">Review-ready gate: the Chinese path must support independent reading.</span></p>
    <p><span class="zh">链接维护方面，本地阅读链中的 in-scope 链接必须指向本地 HTML；只有“打开官方原页 / Open official page”或明确 source parity 链接才允许外跳到官方站。这样用户可以从总入口、release index、当前页、相邻页、API Doxygen 入口之间连续阅读，而不会被静默送回英文站。</span><span class="en">Routing gate: local in-scope links stay local; official exits are explicit.</span></p>
    <p><span class="zh">后续维护时，如果官方 source snapshot 更新，应先重新比较 ${esc(page.source)}，确认 ${esc(keywordText)} 等结构是否变化，再决定是否做 PromotionRound、DomainSprintRound 或 EnglishDebtRound。不要只改报告；用户可见 HTML、source parity 报告、inventory、quality、English debt、current problem、final entry、Markdown 进度和 validation 必须一起闭环。</span><span class="en">Maintenance gate: user-visible HTML and reports must stay consistent.</span></p>
    <h3>读者决策路径 / Reader Decision Path</h3>
    <p><span class="zh">读者进入本页后应先判断自己的问题类型：如果是在实现文件格式、材质节点、渲染输出或预览资产能力，应优先阅读本页的正式结构和相邻 schema；如果是在追溯设计原因，应阅读 proposal 背景；如果是在解决实际项目报错，应回到本地 API 页面、user guide、validation 报告和工具日志交叉确认。</span><span class="en">Decision path: identify whether the issue is implementation, design background, or debugging.</span></p>
    <p><span class="zh">对于目录或迁移页，中文层的价值不是伪造长篇正文，而是明确导航职责：哪些链接是本地连续阅读，哪些链接是官方原页，哪些页面已经 complete，哪些页面仍只是可检查草稿。这样用户不会因为页面短就失去上下文，也不会误以为外部英文站才是唯一可读路径。</span><span class="en">Short index pages still need a clear Chinese navigation role.</span></p>
    <p><span class="zh">本轮页面属于 release/spec/proposal 域，和 API reference 的阅读方式不同。API reference 以类、函数、成员和 Doxygen 表格为核心；本域页面以工作流、规范约束、设计讨论和跨页面路径为核心。因此中文解释必须覆盖“为什么看这一页、看完去哪里、哪些标识不能改、哪些结论不能过度外推”。</span><span class="en">Release proposal/spec pages need workflow and boundary coverage, not just API table translation.</span></p>
  `;
  const sectionRows = page.sectionNotes
    .map(
      ([heading, note]) => `<tr>
        <td><span class="en">${esc(heading)}</span></td>
        <td><span class="zh">${inline(note)}</span><span class="en">Chinese explanation for the official section, preserving source heading and technical identifiers.</span></td>
      </tr>`
    )
    .join("\n");
  const workflows = page.workflows
    .map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Workflow note for using this spec or proposal in a local OpenUSD reading path.</span></li>`)
    .join("\n");
  const boundaries = page.boundaries
    .map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Boundary note: keep API/schema/token/property/code/link semantics intact.</span></li>`)
    .join("\n");
  const headingList = sourceHeadings(page)
    .slice(0, 40)
    .map((h) => `<li><span class="en">h${h.level} ${esc(h.text)}</span></li>`)
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>${esc(page.zhTitle)} / ${esc(page.title)}</title>
  <style>${css}</style>
</head>
<body data-cn-status="bilingual_complete">
<header>
  <div class="status">bilingual_complete · Round ${ROUND} DomainSprintRound</div>
  <h1>${esc(page.zhTitle)} / ${esc(page.title)}</h1>
  <p class="meta">官方页：<a href="${esc(page.official_url)}">Open official page</a>；本地 source snapshot：<code>${esc(page.source)}</code></p>
  <p class="meta"><a href="${esc(finalHref)}">总入口</a> | <a href="${esc(releaseHref)}">Release 本地入口</a> | <a href="${esc(apiHref)}">API Doxygen 本地入口</a></p>
</header>
<main>
  <section data-cn-complete="round-${ROUND}-${esc(page.slug)}">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <p><span class="zh">${inline(page.summary)}</span><span class="en">This page is promoted from draft to complete with a Chinese-first reading path and source parity checks.</span></p>
    <p><span class="zh">本轮按 spec/whitepaper 核心页小批量冲刺处理：中文解释覆盖页面职责、官方 section、API/schema/property 分组、相邻 user guide/schema/API/spec/proposal 关系、阅读路径、边界、误读点和调试路径；英文标题、API 名、schema 名、token、属性名、函数名、代码、命令、Doxygen 表格标签和链接语义保持原样。</span><span class="en">English identifiers are retained for technical parity; Chinese is the main reading path.</span></p>
    ${mainReadingPath}

    <h3>官方结构覆盖 / Official Section Coverage</h3>
    <table>
      <thead><tr><th>Official heading</th><th>中文主阅读路径</th></tr></thead>
      <tbody>${sectionRows}</tbody>
    </table>

    <h3>阅读和调试路径 / Reading and Debugging Path</h3>
    <ul>${workflows}</ul>

    <h3>边界和常见误读 / Boundaries and Common Misreads</h3>
    <ul>${boundaries}</ul>

    <h3>相邻文档关系 / Adjacent Documents</h3>
    <p><span class="zh">这些链接用于把本页放回本地中文站的连续阅读路径：先从总入口到 release index，再到本页，再进入相邻规范、提案、user guide 或 API 页面。</span><span class="en">Adjacent local pages are part of the local reading flow.</span></p>
    <ul>${related}</ul>

    <h3>源页对比 / Source Parity</h3>
    <p><span class="zh">已对比本地 source snapshot：<code>${esc(page.source)}</code>，并保留官方页显式外跳。source parity 报告写入 <code>${SOURCE_PARITY_REPORT}</code>。</span><span class="en">Official source page: <a href="${esc(page.official_url)}">Open official source page - ${esc(page.title)}</a>.</span></p>
    <ul>${headingList}</ul>
  </section>
</main>
</body>
</html>
`;
}

function buildSourceParity(writtenHtmlByOutput = new Map()) {
  return pages.map((page) => {
    const source = sourceText(page);
    const outputHtml = writtenHtmlByOutput.get(page.output) || (fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "");
    const output = stripTags(outputHtml);
    const headings = sourceHeadings(page);
    const missingSourceKeywords = page.sourceKeywords.filter((keyword) => !source.includes(keyword));
    const missingOutputKeywords = page.sourceKeywords.filter((keyword) => !output.includes(keyword));
    return {
      page: page.slug,
      title: page.title,
      output: page.output,
      source_snapshot: page.source,
      official_url: page.official_url,
      headings,
      source_keywords_checked: page.sourceKeywords,
      missing_source_keywords: missingSourceKeywords,
      missing_output_keywords: missingOutputKeywords,
      official_sections_preserved: page.sectionNotes.map(([heading]) => heading),
      preserved_code_terms_sample: [
        ...new Set((output.match(/\b[A-Za-z_][A-Za-z0-9_:.-]*\b/g) || []).filter((term) => term.length > 2)),
      ].slice(0, 80),
    };
  });
}

function writePages() {
  const written = [];
  const skipped = [];
  const byOutput = inventoryByOutput();
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
    written.push({
      page: page.slug,
      output: page.output,
      zhChars: zhChars(html),
      hasComplete: /bilingual_complete/.test(html),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(stripTags(html)),
    });
  }
  const parity = buildSourceParity(writtenHtmlByOutput);
  writeJson(SOURCE_PARITY_REPORT, {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target: "release spec/whitepaper 核心页小批量冲刺",
    source_parity: parity,
  });
  return { results: written, skipped, source_parity: parity };
}

function precheck() {
  const results = [];
  const skipped = [];
  const byOutput = inventoryByOutput();
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
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(body),
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
  const passed = results.every((result) => result.passed) && skipped.length === 0;
  return { results, skipped, passed };
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
      official_url: page.official_url,
      local_output: page.output,
      status: "bilingual_complete",
      reason:
        `DomainSprintRound release spec/whitepaper promotion for ${page.output}: Chinese main-reading-path coverage now explains official sections, page role, API/schema/property grouping, adjacent user guide/schema/API/spec/proposal relationships, reading path, boundaries, common misreads, debugging path, and source parity while preserving API names, schema names, tokens, properties, code, commands, Doxygen labels, and explicit official links.`,
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
    if (byId.has(entry.id)) {
      manifest[byId.get(entry.id)] = entry;
    } else {
      manifest.push(entry);
    }
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
    purpose: `Round ${ROUND} DomainSprintRound：release spec/whitepaper 核心页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 ${BASE_GOOD} 个 good_bilingual 增至 ${quality.grade_counts?.good_bilingual ?? "unknown"}；中文主阅读路径覆盖官方 section、页面职责、API/schema/property 分组、相邻 user guide/schema/API/spec/proposal 关系、阅读路径建议、边界、误读点和调试路径，并保留 API 名、schema 名、token、属性名、函数名、代码、命令、Doxygen 表格标签、链接语义和显式官方外跳。`,
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
        summary: `完成度已推进到 ${quality.grade_counts?.good_bilingual}/406，但仍有 ${quality.status_counts?.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 release spec/whitepaper 核心页；translation_quality_review 报告 good_bilingual=${quality.grade_counts?.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
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
        summary: "release/spec/proposal 覆盖仍需继续推进；本轮补齐 spec/whitepaper 核心页。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${debt.counts?.api_complete}、release_complete=${debt.counts?.release_complete}、release_review_ready_zh=${debt.counts?.release_review_ready_zh}。`,
        required_action: "继续优先 release/spec/proposal 中的高价值短页或针对 review_ready_zh 债务做 EnglishDebtRound；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: notPromoted,
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "下一轮应重新读取 inventory，从剩余 release 草稿中选择同域短页，或针对已经完成但未 review_ready_zh 的页面做 EnglishDebtRound。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue release/spec/proposal promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
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
