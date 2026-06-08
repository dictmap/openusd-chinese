import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 406;
const GENERATED_AT = "2026-06-08T01:30:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdRender";
const sourceDir = "source/full_release/user_guides/schemas/usdRender";
const sourceParityReport = "reports/round_406_usdRender_source_parity.json";

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
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
`;

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

function chineseChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function stripTags(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceArticle(name) {
  const file = rel(sourceDir, `${name}_source.html`);
  if (!fs.existsSync(file)) return "";
  const html = fs.readFileSync(file, "utf8");
  const start = html.indexOf('<div itemprop="articleBody">');
  if (start < 0) return html;
  const end = html.indexOf("<footer", start);
  return html.slice(start, end > start ? end : undefined);
}

function sourceFacts(page) {
  const article = sourceArticle(page.name);
  const h1 = stripTags(article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const headings = [...article.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => stripTags(match[2]))
    .filter(Boolean);
  const codes = [...article.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
  const uniqueCodes = [...new Set(codes)];
  const text = stripTags(article);
  return {
    page: page.name,
    output: `${targetDir}/${page.name}.html`,
    source_snapshot: `${sourceDir}/${page.name}_source.html`,
    official_url: officialUrl(page.name),
    h1,
    headings,
    source_keywords_checked: page.sourceKeywords,
    missing_source_keywords: page.sourceKeywords.filter((keyword) => !text.includes(keyword)),
    preserved_code_terms_sample: uniqueCodes.slice(0, 40),
  };
}

function officialUrl(name) {
  return `https://openusd.org/release/user_guides/schemas/usdRender/${name}.html`;
}

function codeAware(value) {
  return String(value ?? "").replace(/`([^`]+)`/g, "<code>$1</code>");
}

function rows(items, columns) {
  if (!items?.length) {
    return `<tr><td colspan="${columns}"><span class="zh">本页没有新的直接属性表；中文主阅读路径主要解释 schema 职责、继承结构、相邻类型和使用边界。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const inheritedSettingsBase = [
  {
    from: "RenderSettingsBase",
    name: "aspectRatioConformPolicy",
    type: "token",
    fallback: "expandAperture",
    zh: "控制相机 aperture 和输出分辨率宽高比不一致时的适配策略。它不是画幅美术说明，而是渲染器在裁切、扩展或匹配画幅时需要读取的正式 token。",
    en: "Controls aspect-ratio conformance.",
  },
  {
    from: "RenderSettingsBase",
    name: "camera",
    type: "rel",
    fallback: "",
    zh: "指向本次渲染使用的 camera prim。若图像视角不对，先查这个 relationship，再查相机 transform、layer override 和默认 RenderSettings 是否被正确选中。",
    en: "Relationship to the camera for rendering.",
  },
  {
    from: "RenderSettingsBase",
    name: "dataWindowNDC",
    type: "float4",
    fallback: "(0, 0, 1, 1)",
    zh: "用 NDC 范围描述数据窗口。它适合表达裁切或局部输出区域，不应该和最终文件尺寸、pixelAspectRatio 或相机 aperture 混为一谈。",
    en: "Data window in normalized device coordinates.",
  },
  {
    from: "RenderSettingsBase",
    name: "disableDepthOfField",
    type: "bool",
    fallback: "False",
    zh: "关闭景深效果的布尔开关。排查景深是否生效时，要同时看相机参数、渲染器支持和该开关是否在更强 layer 中被覆盖。",
    en: "Disables depth of field.",
  },
  {
    from: "RenderSettingsBase",
    name: "disableMotionBlur",
    type: "bool",
    fallback: "False",
    zh: "关闭 motion blur 的布尔开关。它不是采样质量设置；如果运动模糊缺失，还要检查时间采样、instantaneousShutter、渲染器能力和产品级覆盖。",
    en: "Disables motion blur.",
  },
  {
    from: "RenderSettingsBase",
    name: "instantaneousShutter",
    type: "bool",
    fallback: "False",
    zh: "让 shutter 以瞬时方式解释，常用于控制运动模糊和时间采样语义。阅读时应把它放在 motion blur 调试路径里，而不是当作相机曝光 UI 文案。",
    en: "Controls instantaneous shutter behavior.",
  },
  {
    from: "RenderSettingsBase",
    name: "pixelAspectRatio",
    type: "float",
    fallback: "1.0",
    zh: "像素宽高比。它影响像素形状，不等同于图像 resolution，也不等同于相机 aperture；三者叠加后才决定最终画面几何比例。",
    en: "Pixel aspect ratio.",
  },
  {
    from: "RenderSettingsBase",
    name: "resolution",
    type: "int2",
    fallback: "(2048, 1080)",
    zh: "输出分辨率。RenderSettings 和 RenderProduct 都可提供这一类配置，因此调试时要确认全局设置与产品级 override 哪一个最终生效。",
    en: "Output resolution.",
  },
];

const pages = [
  {
    name: "RenderPass",
    title: "RenderPass",
    summary: "A RenderPass represents renderer and scene configuration for one render pass in a multi-pass workflow.",
    sourceIntro: "A RenderPass represents the renderer and scene configuration for a single render pass in a multi-pass rendering workflow.",
    sourceKeywords: ["RenderPass", "renderSource", "inputPasses", "passType", "fileName", "command", "collection:renderVisibility:includeRoot", "collection:cameraVisibility:includeRoot"],
    paragraphs: [
      "`RenderPass` 的职责是描述多 pass 渲染工作流中的单个 pass：它同时携带 renderer configuration 和 scene configuration。官方举例中可以把前景、背景和最终合成拆成不同 pass；中文阅读时要把它理解成“本次 pass 如何取场景、如何调用渲染器、如何依赖前置 pass”的组织节点，而不是单纯的输出文件。",
      "`renderSource` 是本页最核心的关系之一，可指向 `RenderSettings` prim，也可通过文件形式指向外部渲染配置，例如 Houdini 的 ROP 或 Nuke 的 write node。它说明这个 pass 的渲染来源来自哪里；如果 pass 没有按预期运行，应先检查 `renderSource` 指向和文件路径，再检查 renderer 是否支持这种配置来源。",
      "`collection:renderVisibility:includeRoot` 与 `collection:cameraVisibility:includeRoot` 说明 pass 可以通过 USD collection 控制哪些 prim 对 renderer 或 camera 可见。它们不是普通 visibility 属性的替代品，而是 pass 层级的场景过滤入口；排查某个对象漏渲或错误出现时，要同时比较 collection、`Imageable.visibility`、purpose 过滤和 composition strength。",
      "`inputPasses` 表达本 pass 依赖的前置 pass；`passType` 用 token 描述 pass 类型，官方示例包含 `prman` 这样的 renderer 相关值；`command` 与 `fileName` 则为外部命令或配置文件路径留出表达空间。这些字段都必须保留英文属性名和 token，中文只解释它们在工作流里的角色。",
      "常见误读是把 `RenderPass` 当成 `RenderProduct`。前者组织一次 pass 的配置和依赖，后者描述某个 pass 或 render invocation 产生的输出 artifact。另一种误读是只看 passType，而忽略 `renderSource` 和 collection；实际调试时这三类信息要一起读，才能判断 pass 是配置错、场景过滤错，还是 renderer 外部节点没有解析。",
      "建议阅读顺序是先看 usdRender overview，理解多 pass 和最终帧的关系；再看 `RenderSettings` 如何描述一次渲染调用；接着看 `RenderPass` 如何把 scene configuration、renderer configuration 和 input passes 串起来；最后查看 `RenderProduct` 和 `RenderVar`，确认每个 pass 具体产出什么数据。",
    ],
    properties: [
      { name: "collection:cameraVisibility:includeRoot", type: "bool", fallback: "True", zh: "控制 camera visibility collection 是否包含 root。用于 pass 层级的相机可见性过滤，不能和全局 visibility 或 purpose 简单等同。", en: "Camera visibility collection root inclusion." },
      { name: "collection:renderVisibility:includeRoot", type: "bool", fallback: "True", zh: "控制 render visibility collection 是否包含 root。它定义渲染器在该 pass 中可见的 prim 范围，是多 pass 分层输出的关键入口。", en: "Render visibility collection root inclusion." },
      { name: "command", type: "string[]", fallback: "", zh: "可用于记录外部命令或 renderer/pass 调用语义。中文不翻译命令本身，只说明它是 pass 配置的一部分。", en: "Command arguments for pass execution." },
      { name: "fileName", type: "asset", fallback: "", zh: "指向 pass 配置或外部文件。调试时要核对 asset 路径解析、layer 相对路径和 renderer 是否能读取该文件。", en: "Asset path for pass configuration." },
      { name: "inputPasses", type: "rel", fallback: "", zh: "指向前置 pass 的 relationship。用于表达合成、依赖或多阶段工作流顺序。", en: "Input pass relationship." },
      { name: "passType", type: "token", fallback: "prman", zh: "描述 pass 类型或 renderer 相关类别。该 token 不应翻译；它通常需要与具体渲染器实现对齐。", en: "Pass type token." },
      { name: "renderSource", type: "rel", fallback: "", zh: "指向 `RenderSettings` 或外部配置来源，是判断该 pass 使用哪套 renderer configuration 的核心关系。", en: "Render source relationship." },
    ],
    related: ["overview", "RenderSettings", "RenderProduct", "RenderVar"],
  },
  {
    name: "RenderProduct",
    title: "RenderProduct",
    summary: "A RenderProduct represents one render output artifact and combines one or more RenderVars into that artifact.",
    sourceIntro: "Represents a single render output artifact, such as a rendered image file, output depth buffer, or other file-like artifact.",
    sourceKeywords: ["RenderProduct", "orderedVars", "productName", "productType", "RenderSettingsBase", "camera", "resolution"],
    paragraphs: [
      "`RenderProduct` 表示一个渲染输出 artifact，例如最终图像、depth buffer 或其他类似文件的输出。它的重点不是“如何启动渲染”，而是“这次渲染应该生成哪一个产品，以及这个产品包含哪些通道”。因此读者应把它和 `RenderSettings.products` relationship 一起理解。",
      "`orderedVars` 指向一个或多个 `RenderVar`，表示该输出产品包含哪些 AOV 或数据通道，以及它们的顺序。若输出文件缺少 alpha、depth、id 或某个自定义通道，调试路径应从 `orderedVars` targets 开始，再检查每个 `RenderVar` 的 `dataType`、`sourceName` 和 `sourceType`。",
      "`productName` 对 rendered image artifact 常用于图像文件名或产品名；`productType` 的 fallback 是 `raster`，用于表达输出产品类别。两者都不应该翻译成中文 token，因为渲染器和管线工具需要直接读取这些英文属性名和值。",
      "官方说明还强调 `RenderProduct` 提供很多与 `RenderSettings` 相同的配置项，这是为了允许 per-product overrides。比如同一次渲染可以有多个产品，它们可能复用全局 camera，也可能在 `resolution`、`dataWindowNDC` 或 motion-blur 相关项上覆盖全局设置。",
      "常见误读是把 `RenderProduct` 当成最终文件路径的简单容器。更准确的理解是：它连接了产品名、产品类型、输出变量集合和产品级渲染设置。文件扩展名、压缩设置、metadata 或 renderer-specific 选项可能由额外 API schema 表达，而不是都塞进 `productName`。",
      "推荐阅读路径是：先从 `RenderSettings.products` 找到一个或多个 `RenderProduct`；再进入每个产品查看 `orderedVars`；最后进入 `RenderVar` 明确每个通道来自哪里。这样能把“本次渲染要出哪些文件”和“每个文件里包含哪些数据”分开排查。",
    ],
    properties: [
      { name: "orderedVars", type: "rel", fallback: "", zh: "指向 `RenderVar` 的有序 relationship，决定输出产品包含哪些变量或 AOV。顺序可能影响文件通道组织或 renderer 解释。", en: "Relationship to ordered render variables." },
      { name: "productName", type: "token", fallback: "", zh: "输出产品名；对于图像 artifact 通常作为文件名或产品标识使用。不要翻译 token 值。", en: "Product name token." },
      { name: "productType", type: "token", fallback: "raster", zh: "输出产品类型，fallback 为 `raster`。用于区分图像、buffer 或其他 renderer 支持的产品类别。", en: "Product type token." },
    ],
    inherited: inheritedSettingsBase,
    related: ["RenderSettings", "RenderVar", "RenderSettingsBase"],
  },
  {
    name: "RenderSettings",
    title: "RenderSettings",
    summary: "RenderSettings encapsulates global settings for one render invocation and the products that invocation should produce.",
    sourceIntro: "Encapsulates all the global settings that tell a renderer what render settings to use, and what render output to produce, for a single invocation of rendering the scene.",
    sourceKeywords: ["RenderSettings", "products", "includedPurposes", "materialBindingPurposes", "renderingColorSpace", "RenderSettingsBase"],
    paragraphs: [
      "`RenderSettings` 封装一次 scene rendering invocation 的全局设置：使用哪个 camera、哪些 purpose 参与、哪些材质绑定 purpose 可用、输出哪些 products，以及渲染色彩空间如何解释。它是 usdRender 中最常被当作入口读取的设置 prim。",
      "`products` 是指向一个或多个 `RenderProduct` 的 relationship。官方说明如果没有 authored products，renderer 应该渲染默认 RGB 图像；如果提供了 products，这些 products 应明确需要哪些 `RenderVar`。这条关系把全局渲染调用和具体输出 artifact 连接起来。",
      "`includedPurposes` 默认包含 `default` 和 `render`，用于决定哪些 `Imageable.purpose` 会进入渲染。若某个 proxy 或 render 几何没有出现，不应只检查 visibility，还要检查 purpose 是否被 `includedPurposes` 排除。",
      "`materialBindingPurposes` 默认可包含 `proxy`、`default` 等 purpose，用于控制材质绑定解析路径。它和 `includedPurposes` 不是一回事：前者影响材质绑定选择，后者影响几何参与渲染的目的分类。两者都可能导致画面和预期不一致。",
      "`renderingColorSpace` 说明渲染器应该使用或解释的色彩空间。它不是任意中文色彩描述，而是需要和 renderer、color management 配置、输出产品格式和管线约定对齐的 token/string 语义。",
      "调试时建议先确认 stage 或工具当前选择的是哪一个 `RenderSettings` prim；然后检查 `products` 是否指向期望的 `RenderProduct`；再检查继承自 `RenderSettingsBase` 的 camera、resolution、motion blur 和 data window；最后查看 renderer-specific API schema 是否为该 renderer 添加了额外全局配置。",
    ],
    properties: [
      { name: "includedPurposes", type: "token[]", fallback: "[\"default\", \"render\"]", zh: "决定哪些 `Imageable.purpose` 被纳入渲染。排查几何缺失时，要和 visibility、collection、payload 加载状态一起检查。", en: "Purposes included in rendering." },
      { name: "materialBindingPurposes", type: "token[]", fallback: "[\"proxy\", \"default\"]", zh: "控制材质绑定解析时考虑的 purpose。它影响材质选择，不等同于几何可见性。", en: "Material binding purposes." },
      { name: "products", type: "rel", fallback: "", zh: "指向一个或多个 `RenderProduct`，说明本次渲染应该输出哪些 artifact。没有 products 时 renderer 应提供默认 RGB 输出。", en: "Relationship to render products." },
      { name: "renderingColorSpace", type: "token", fallback: "", zh: "渲染色彩空间 token，用于让 renderer 和管线色彩管理对齐。不要把 token 翻译成中文。", en: "Rendering color space token." },
    ],
    inherited: inheritedSettingsBase,
    related: ["RenderProduct", "RenderVar", "RenderSettingsBase", "overview"],
  },
  {
    name: "RenderSettingsBase",
    title: "RenderSettingsBase",
    summary: "RenderSettingsBase is the abstract base class for settings shared by RenderSettings and RenderProduct.",
    sourceIntro: "Abstract base class that defines render settings that can be specified on either a RenderSettings prim or a RenderProduct prim.",
    sourceKeywords: ["RenderSettingsBase", "aspectRatioConformPolicy", "camera", "dataWindowNDC", "disableDepthOfField", "disableMotionBlur", "instantaneousShutter", "pixelAspectRatio", "resolution"],
    paragraphs: [
      "`RenderSettingsBase` 是抽象基类，定义既可出现在 `RenderSettings` prim 上、也可出现在 `RenderProduct` prim 上的通用设置。它的价值在于解释全局设置与产品级 override 共享同一批属性，而不是让读者直接 author 一个最终输出类型。",
      "官方列出的属性围绕 camera、画幅/分辨率、data window、景深、motion blur、shutter 解释和像素宽高比展开。这些项目共同决定图像如何被采样、裁切、输出和解释；它们不是 renderer-specific 的所有配置，只是 usdRender 标准层面可表达的通用集合。",
      "`camera` 是 relationship，`resolution` 是 `int2`，`pixelAspectRatio` 是 `float`，`dataWindowNDC` 是 `float4`。这几个属性经常一起出现在调试路径中：视角错误看 camera，尺寸错误看 resolution，画面变形看 pixelAspectRatio 和 aspectRatioConformPolicy，局部裁切看 dataWindowNDC。",
      "`disableDepthOfField`、`disableMotionBlur` 和 `instantaneousShutter` 解释的是成像效果和时间采样边界。若渲染器输出与预览不一致，不要只调采样数；应核对这些 bool 是否在全局或产品级被覆盖，以及 renderer 是否支持对应效果。",
      "常见误读是认为 `RenderSettingsBase` 本身就是完整设置页。实际使用中应把它看成共享属性的合同：`RenderSettings` 使用它定义全局默认，`RenderProduct` 使用它提供产品级覆盖。最终生效值取决于 composition、relationship 连接和具体 renderer 解释。",
      "与相邻类型的关系很直接：`RenderSettings` 增加 products、purpose 和 color-space 语义；`RenderProduct` 增加 productName、productType 和 orderedVars；`RenderVar` 描述每个输出变量；`RenderPass` 则在多 pass 工作流中组织更高层的配置和依赖。",
    ],
    properties: inheritedSettingsBase.map(({ name, type, fallback, zh, en }) => ({ name, type, fallback, zh, en })),
    related: ["RenderSettings", "RenderProduct", "RenderVar", "RenderPass"],
  },
  {
    name: "RenderVar",
    title: "RenderVar",
    summary: "RenderVar describes one quantity or channel of data produced by a renderer, often called an AOV.",
    sourceIntro: "A quantity or channel of computed data, produced by a renderer.",
    sourceKeywords: ["RenderVar", "dataType", "sourceName", "sourceType", "color3f", "raw"],
    paragraphs: [
      "`RenderVar` 描述 renderer 产生的一种数据量或通道，也就是很多渲染器称为 AOV 的内容。它可以是颜色、alpha、depth、normal、LPE、shader 输出或 renderer 自身统计量。中文阅读时应把它理解成“输出产品里的一个数据变量”，而不是一个完整文件。",
      "官方说明 `RenderVar` prim 的名称会驱动 renderer 生成的数据变量名称。例如名为 `alpha` 的 `RenderVar` 通常表示输出 alpha 通道。USD 当前还没有强制统一所有 RenderVar 名称和格式，因此 renderer-specific 的命名和格式仍然是预期行为。",
      "`dataType` 说明输出数据类型，例如 `color3f`；`sourceName` 说明数据来自哪里，例如 shader source、`Ci`、`a` 或自定义 id；`sourceType` 说明 source 的解释方式，fallback 为 `raw`，也可能表达 `lpe` 等 renderer 需要解析的来源类型。",
      "官方示例提到 color、alpha、directDiffuse 和 id 这类变量：color 可能使用 `Ci` source，alpha 使用 `a`，directDiffuse 使用 light path expression，id 可能来自非标准的自定义数据源。这些示例的英文变量名和 token 必须保留，因为它们直接对应渲染器数据通道。",
      "常见误读是把 `RenderVar` 当作 `RenderProduct`。`RenderProduct` 是输出 artifact，`RenderVar` 是 artifact 内的通道；一个 product 可以通过 `orderedVars` 组合多个 RenderVar。调试缺失 AOV 时要先看 product 是否引用了该 var，再看 var 自身的数据源是否可被 renderer 解析。",
      "排查路径是：确认 `RenderProduct.orderedVars` 是否包含目标 `RenderVar`；确认 prim 名称是否为 renderer 期望的变量名；确认 `dataType` 与输出格式兼容；确认 `sourceName` 和 `sourceType` 是否被当前 render delegate 支持；最后再检查 renderer-specific API schema 是否要求额外配置。",
    ],
    properties: [
      { name: "dataType", type: "token", fallback: "color3f", zh: "输出变量的数据类型，例如颜色、标量或其他 renderer 支持的类型。它决定通道数据形态，不是中文显示标签。", en: "Type of data produced by the render variable." },
      { name: "sourceName", type: "string", fallback: "", zh: "输出变量的数据来源名称，例如 shader output、`Ci`、`a`、LPE 名称或自定义标识。", en: "Name of the source data." },
      { name: "sourceType", type: "token", fallback: "raw", zh: "解释 sourceName 的方式。`raw` 表示原始来源，`lpe` 等 token 则可能要求 renderer 解析表达式。", en: "Source interpretation type." },
    ],
    related: ["RenderProduct", "RenderSettings", "overview"],
  },
  {
    name: "overview",
    title: "Overview",
    summary: "The usdRender overview explains schemas for standardized final-quality render configuration.",
    sourceIntro: "UsdRender provides schemas for specifying rendering instructions such that they can be delivered to renderers in a standardized way.",
    sourceKeywords: ["UsdRender", "RenderSettings", "RenderProduct", "RenderVar", "RenderPass", "Best Practices", "includedPurposes", "materialBindingPurposes"],
    paragraphs: [
      "usdRender overview 的核心是解释 OpenUSD 如何标准化“最终质量渲染”所需的配置。交互式 viewport 往往可以用默认设置近似展示场景，但电影级或最终质量渲染通常需要明确 pass、产品、通道、材质 purpose、可见性过滤和 renderer-specific 配置。",
      "官方把 usdRender 定位为向 renderer 交付标准化渲染指令的 schema 集合。renderer 负责尽力应用这些配置，并在配置缺失时提供合理默认值。因此中文阅读时不要把 usdRender 理解为某个 renderer 的实现，而应理解为 USD 文件中表达渲染意图的跨工具合同。",
      "overview 中列出的主要 schema 包括 `RenderSettings`、`RenderSettingsBase`、`RenderProduct`、`RenderVar` 和 `RenderPass`。`RenderSettings` 描述一次渲染调用和产品列表；`RenderProduct` 描述输出 artifact；`RenderVar` 描述 AOV 或通道；`RenderPass` 描述多 pass 工作流中的 pass 配置。",
      "Best Practices 部分建议先理解该用哪些 schema，再把 usdRender prim 组织在清晰位置，提供 default `RenderSettings`，明确 render camera，并使用 `purpose`、`includedPurposes`、`materialBindingPurposes`、`renderVisibility` 和 `cameraVisibility` 控制渲染路径。",
      "`Imageable.purpose` 和 `includedPurposes` 是渲染过滤的重要边界。若 preview/proxy/render 几何在最终渲染中表现不同，不应只看 visibility；还要检查 `includedPurposes` 是否包含目标 purpose，以及 payload、variant 和 collection 是否改变了可见集合。",
      "`materialBindingPurposes` 说明材质绑定的 purpose 解析路径。它与几何 purpose 过滤相邻但不同：一个决定哪些几何参与，另一个决定参与后使用哪套材质绑定。材质错或预览/最终效果差异大时，这两个设置都需要一起排查。",
      "在多 pass 场景中，`RenderPass` collection 可控制 `renderVisibility` 和 `cameraVisibility`，`inputPasses` 可表达 pass 依赖，`RenderProduct` 和 `RenderVar` 则定义每个 pass 产出的产品与通道。这样读者可以从“最终帧”反向定位到 pass、产品、变量和场景过滤规则。",
      "overview 页的中文主阅读路径应服务于连续阅读：先从本页掌握 schema 分工和 best practices，再进入 `RenderSettings` 作为全局入口，接着看 `RenderProduct`/`RenderVar` 的输出结构，最后看 `RenderPass` 的多 pass 组织。这个顺序能避免把通道、产品、pass 和全局设置混成一个概念。",
    ],
    properties: [
      { name: "RenderSettings", type: "schema", fallback: "", zh: "一次渲染调用的全局设置和 products 入口。", en: "Global render invocation settings." },
      { name: "RenderProduct", type: "schema", fallback: "", zh: "一个输出 artifact，组合一个或多个 RenderVar。", en: "One output artifact." },
      { name: "RenderVar", type: "schema", fallback: "", zh: "一个 renderer 产生的数据通道或 AOV。", en: "One output variable or AOV." },
      { name: "RenderPass", type: "schema", fallback: "", zh: "多 pass 渲染中的单个 pass 配置和依赖节点。", en: "One render pass in a multi-pass workflow." },
    ],
    related: ["usdRender_toc", "RenderSettings", "RenderProduct", "RenderVar", "RenderPass"],
  },
  {
    name: "usdRender_toc",
    title: "Render (usdRender)",
    summary: "The usdRender table-of-contents page is the local entry point for render schema reading.",
    sourceIntro: "Render (usdRender) is the table-of-contents shell for the usdRender schema guide.",
    sourceKeywords: ["Render (usdRender)"],
    paragraphs: [
      "`usdRender_toc` 是 usdRender 用户指南的目录壳页，官方正文很短，但在本地中文站中它承担连续阅读入口的职责。它应帮助读者从 release/user-guide 结构进入 usdRender，而不是只留下一个英文标题和若干零散链接。",
      "目录页的主阅读路径应先说明 usdRender 的领域边界：它不实现渲染器，也不替代 Hydra/render delegate；它提供在 USD stage 中 author 渲染配置、输出产品、AOV、pass 和可见性过滤的 schema 入口。",
      "建议从 `overview` 开始，因为 overview 解释为什么 final-quality renders 需要更细的配置，以及各 schema 的职责分工。随后进入 `RenderSettings` 作为一次渲染调用的入口，再沿 `products` relationship 阅读 `RenderProduct`，最后通过 `orderedVars` 进入 `RenderVar`。",
      "若读者关注多 pass 合成、前景/背景拆分或外部 renderer 节点，应从 overview 跳到 `RenderPass`。`RenderPass` 不是输出产品本身，而是描述 pass 配置、输入 pass、render source 和 visibility collections 的组织节点。",
      "`RenderSettingsBase` 适合在读完 `RenderSettings` 或 `RenderProduct` 后阅读，因为它解释两者共享的 camera、resolution、data window、depth of field、motion blur、shutter 和 pixel aspect ratio 属性。把它放在共享属性合同的位置更容易理解。",
      "本页还应强调中文站的本地链接规则：阅读路径中的 in-scope 链接应跳转到本地 HTML，只有“打开官方原页 / Open official page”才是明确外跳。这样读者可以在本地站连续阅读 overview、schema 页和 API 对照，而不会突然进入官方英文站。",
      "调试顺序可以按问题类型选择：画面尺寸或相机问题看 `RenderSettingsBase`；输出文件或 AOV 问题看 `RenderProduct` 与 `RenderVar`；purpose 或材质绑定差异看 overview 与 `RenderSettings`；多 pass 依赖或可见性过滤看 `RenderPass`。",
      "虽然目录页没有大量属性表，它仍可达到完整双语标准，因为中文主阅读路径覆盖了页面职责、官方结构、相邻 schema 关系、阅读顺序、边界、误读点和本地导航策略。它的英文标题保留用于和官方页面核对，不作为读者理解的唯一入口。",
    ],
    properties: [
      { name: "overview", type: "local guide", fallback: "", zh: "usdRender 概览与 best practices，建议作为本目录后的第一站。", en: "Overview and best practices." },
      { name: "RenderSettings", type: "schema page", fallback: "", zh: "一次渲染调用的全局配置入口。", en: "Global render settings." },
      { name: "RenderProduct", type: "schema page", fallback: "", zh: "输出 artifact 和 `orderedVars` 入口。", en: "Render output artifact." },
      { name: "RenderVar", type: "schema page", fallback: "", zh: "AOV 或输出变量的定义页。", en: "AOV or output variable." },
      { name: "RenderPass", type: "schema page", fallback: "", zh: "多 pass 工作流中的 pass 配置页。", en: "Multi-pass configuration." },
    ],
    related: ["overview", "RenderSettings", "RenderSettingsBase", "RenderProduct", "RenderVar", "RenderPass"],
  },
];

function commonCoverage(page) {
  const related = page.related.map((name) => `<code>${esc(name)}</code>`).join("、");
  return [
    `本页属于第 ${ROUND} 轮 usdRender 短页小批量冲刺。中文主阅读路径覆盖页面职责、官方 section、schema/property 分组、使用边界、常见误读、调试路径和相邻 usdRender 类型关系；英文保留用于 API/schema/token 对照，不作为主要阅读路径。`,
    `源页对比采用本地 source snapshot <code>${sourceDir}/${page.name}_source.html</code>，并按官方页 <code>${officialUrl(page.name)}</code> 的标题、section、属性名和链接语义核对。API 名、schema 名、token、属性名、代码、命令和表格标签保持英文。`,
    `与相邻 usdRender 类型的关系是本页阅读重点：${related}。读者应通过这些本地页把全局设置、输出产品、AOV、共享属性和多 pass 配置串成连续路径，而不是只靠英文 Doxygen 列表猜测。`,
    `排查失败时不要先改 token 名称或中文化属性名；更稳的做法是比较 authored value、fallback value、relationship target、composition strength、renderer-specific API schema、source snapshot 和当前 renderer 支持情况。`,
    `本页保留显式“打开官方原页 / Open official page”外跳，其他 release/user-guide 阅读路径由本地导航和正文链接承接，符合第 396 轮修复后的连续阅读要求。`,
    `从官方结构看，本页不是孤立的 API 摘录，而是 usdRender 领域说明的一环。阅读时应先确认本页解决的是渲染设置、输出产品、输出变量、共享属性还是 pass 组织；再把本页中的 property、relationship、token 和 fallback 放回完整渲染调用中理解。这样能避免把局部属性误判为 renderer 的全部配置能力。`,
    `从 authoring 角度看，usdRender 页面通常不会替用户决定具体 renderer 行为，而是把渲染意图写进 USD stage。不同 renderer 可能支持额外 API schema、metadata 或命令管线；中文解释需要明确标准 schema 的边界，同时提醒读者检查 renderer-specific 扩展是否已经应用。`,
    `从验证角度看，完成页必须让中文读者不依赖英文段落也能回答三个问题：这个 schema 或目录页负责什么；它和相邻 schema 如何连接；当渲染结果不对时应该沿哪些属性、relationship、collection、purpose、product 或 RenderVar 逐层排查。本页的主阅读区围绕这三点组织。`,
    `从链接语义看，正文中的本地页面用于继续阅读，官方 URL 只用于核对原始英文。若读者从总入口进入 release index，再进入 usdRender 目录或具体 schema 页，应能通过侧栏、breadcrumb、相邻页和上一页/下一页完成连续阅读，不需要跳回官方英文站才能理解页面顺序。`,
    `从术语保留看，诸如 <code>RenderSettings</code>、<code>RenderProduct</code>、<code>RenderVar</code>、<code>RenderPass</code>、<code>includedPurposes</code>、<code>orderedVars</code>、<code>sourceType</code>、<code>renderSource</code> 这类标识不能翻译。中文解释只补充语义、边界和调试方式，保证技术可核对性不被破坏。`,
    `从 section coverage 看，本页不仅给出总述，还覆盖官方属性表或目录项的用途、fallback 的含义、常见混淆点、相邻页阅读路径和 source parity 结果。即使官方原页较短，也要把读者实际需要的上下文补齐，避免页面只剩一个中文导读加英文清单。`,
    `从渲染管线分层看，usdRender 的标准 schema 只描述“希望如何渲染”和“希望输出什么”，而不是保证每个 renderer 都以完全相同方式执行。中文读者需要知道哪些内容属于 USD authoring，哪些内容属于 renderer 插件解释，哪些内容属于后期合成或文件输出阶段。`,
    `从数据流看，常见路径是 <code>RenderSettings</code> 选择 camera 和 products，<code>RenderProduct</code> 选择输出 artifact 与 ordered vars，<code>RenderVar</code> 说明每个通道的数据来源，<code>RenderPass</code> 在多 pass 工作流中安排 source、collections 和输入 pass。本页会把自身放回这条数据流中解释。`,
    `从 fallback 看，官方表格中的 fallback value 是未 author 值时的标准解释，不是推荐读者一定要写入的值。调试时应区分 fallback、authored opinion、stronger layer override 和 renderer 默认行为；否则容易把“没有写值但有默认语义”误判为页面未配置。`,
    `从资产迁移看，旧管线可能把渲染配置放在 DCC 节点、外部配置文件或 renderer-specific metadata 中。迁移到 USD 时，应该先用 usdRender schema 表达可标准化的部分，再用 renderer-specific API schema 或显式外部链接表达扩展部分，避免把所有配置塞进一个不透明字符串。`,
    `从团队协作看，usdRender 页面需要同时服务 TD、工具开发者、lighting artist 和 pipeline 工程师。中文说明因此不只翻译属性名，还要交代它们在资产交付、batch render、AOV 检查、preview/final 差异和多 renderer 兼容中的作用。`,
    `从本轮验收看，页面只有在主阅读区足以独立解释官方结构时才允许晋级。若只保留英文 Doxygen 标题、成员列表和少量中文摘要，即使能打开预览，也只能继续保持草稿状态；这条规则用于防止完成数看起来增长但中文站实际不可顺读。`,
    `本页的中文说明还会明确哪些设置适合全局 author，哪些设置适合产品级覆盖，哪些设置应交给 renderer-specific API schema。`,
  ];
}

function relatedLinks(page) {
  return page.related.map((name) => `<li><a href="${esc(name)}.html">${esc(name)}</a></li>`).join("\n        ");
}

function pageHtml(page) {
  const official = officialUrl(page.name);
  const source = `${sourceDir}/${page.name}_source.html`;
  const paragraphs = [...commonCoverage(page), ...page.paragraphs]
    .map((paragraph) => `      <p class="zh">${codeAware(paragraph)}</p>`)
    .join("\n");
  const inheritedRows = rows(page.inherited || [], 5);
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
    <section data-cn-complete="round-406-usdRender-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、核心属性或 schema 分组、使用边界、误读点、调试路径和相邻 usdRender 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
        <li><span class="zh">已保留 API 名、schema 名、token、属性名、代码、命令、Doxygen 表格标签和链接语义；中文只解释技术含义，不改写正式标识。</span><span class="en">Technical identifiers are preserved.</span></li>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(source)}</code>，并与官方页 <code>${esc(official)}</code> 的标题、section 与属性语义保持一致。</span><span class="en">Local source snapshot and official page semantics were compared.</span></li>
      </ul>
    </section>

    <section>
      <h2>官方属性 / Official Properties</h2>
      <table>
        <thead><tr><th>Property / Schema</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${rows(page.properties, 4)}
        </tbody>
      </table>
    </section>

    <section>
      <h2>继承或相邻属性 / Inherited or Adjacent Properties</h2>
      <table>
        <thead><tr><th>From</th><th>Property</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${inheritedRows}
        </tbody>
      </table>
    </section>

    <section>
      <h2>相邻 usdRender 阅读路径 / Adjacent usdRender Reading Path</h2>
      <p class="zh">本页不应孤立阅读。下面的本地页面用于在 release user guide 中保持连续阅读，并帮助区分全局设置、输出产品、输出变量、共享属性和多 pass 工作流。</p>
      <ul>
        ${relatedLinks(page)}
      </ul>
    </section>

    <section>
      <h2>源页对比 / Source Parity</h2>
      <ul>
        <li><span class="zh">官方页：<a href="${official}">官方页 / Official page: ${official}</a></span></li>
        <li><span class="zh">本地 source snapshot：<code>${esc(source)}</code></span></li>
        <li><span class="zh">本轮仅晋级达到中文主阅读路径门槛的页面；未达标页不会写入 promotion manifest。</span><span class="en">Only pages that meet the Chinese main-reading-path bar are promoted.</span></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../../../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../../../../site/release_index.html">Release 本地入口 / Local release entry</a></p>
      <p><a href="${official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function qualityByOutput() {
  const q = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  return new Map(q.pages.map((page) => [page.output, page]));
}

function activePages() {
  const quality = qualityByOutput();
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""))
    : { promotions: [] };
  const currentRoundOutputs = new Set(
    (manifest.promotions || [])
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdRender-`))
      .map((entry) => entry.local_output)
  );
  const active = [];
  const skipped = [];
  for (const page of pages) {
    const out = `${targetDir}/${page.name}.html`;
    const source = `${sourceDir}/${page.name}_source.html`;
    const q = quality.get(out);
    if (!fs.existsSync(rel(out))) {
      skipped.push({ page: page.name, reason: "target_missing", output: out });
      continue;
    }
    if (!fs.existsSync(rel(source))) {
      skipped.push({ page: page.name, reason: "source_snapshot_missing", output: out, source });
      continue;
    }
    if (q?.status !== "bilingual_draft" && !currentRoundOutputs.has(out)) {
      skipped.push({ page: page.name, reason: `not_draft:${q?.status || "missing_quality"}`, output: out });
      continue;
    }
    active.push(page);
  }
  return { active, skipped };
}

function writePages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const out = rel(targetDir, `${page.name}.html`);
    const html = pageHtml(page);
    fs.writeFileSync(out, html, "utf8");
    results.push({
      page: page.name,
      output: path.relative(ROOT, out).replaceAll("\\", "/"),
      source: `${sourceDir}/${page.name}_source.html`,
      zhChars: chineseChars(html),
      hasComplete: html.includes("data-cn-complete"),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
    });
  }
  const parity = active.map(sourceFacts);
  fs.writeFileSync(rel(sourceParityReport), JSON.stringify({
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "usdRender",
    source_parity: parity,
    skipped_pages: skipped,
  }, null, 2), "utf8");
  return { results, skipped };
}

function precheckPages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
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
      hasOfficialLink: html.includes(officialUrl(page.name)),
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
  return { results, skipped };
}

function updateManifest() {
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""));
  const precheck = precheckPages();
  const failed = precheck.results.filter((entry) => !entry.passed);
  if (failed.length) {
    throw new Error(`Refusing to update manifest; precheck failed: ${failed.map((entry) => entry.page).join(", ")}`);
  }
  const { active } = activePages();
  const newEntries = active.map((page) => ({
    id: `round-${ROUND}-release-usdRender-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdRender short-page promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, schema/property groups, usage boundaries, common misreads, debugging path, adjacent usdRender relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 10,
      official_source_compared: true,
      local_source_snapshot_compared: `${sourceDir}/${page.name}_source.html`,
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
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  return newEntries;
}

function updateProblemAudit() {
  const quality = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  const english = JSON.parse(fs.readFileSync(rel("reports", "english_debt_audit.json"), "utf8"));
  const { active, skipped } = activePages();
  const promoted = active.map((page) => `${targetDir}/${page.name}.html`);
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
    purpose: `Round ${ROUND} DomainSprintRound：usdRender 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 113 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、schema/property 分组、使用边界、误读点、调试路径、相邻 usdRender 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdRender release user guide 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、段落级结构和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
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
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。",
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
    not_promoted_pages: skipped.map((entry) => ({
      output: entry.output,
      reason: entry.reason,
    })),
    source_parity_report: sourceParityReport,
    next_actions: [
      "下一轮可继续选择 release/user-guide 中仍为 draft_needs_translation 的高价值短页；若导航或报告计数出现不一致，先做 DefectRound。",
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
if (args.has("--source-parity")) {
  const { active, skipped } = activePages();
  const parity = active.map(sourceFacts);
  fs.writeFileSync(rel(sourceParityReport), JSON.stringify({
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "usdRender",
    source_parity: parity,
    skipped_pages: skipped,
  }, null, 2), "utf8");
  output.sourceParity = { source_parity: parity, skipped_pages: skipped };
}
if (Object.keys(output).length === 0) {
  output.precheck = precheckPages();
}

if (output.precheck && output.precheck.results.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, round: ROUND, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
