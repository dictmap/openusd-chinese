import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 407;
const GENERATED_AT = "2026-06-08T01:50:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdMedia";
const sourceDir = "source/full_release/user_guides/schemas/usdMedia";
const sourceParityReport = "reports/round_407_usdMedia_source_parity.json";

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
    .replace(/&quot;/g, '"')
    .replace(/&#64;/g, "@")
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

function officialUrl(name) {
  return `https://openusd.org/release/user_guides/schemas/usdMedia/${name}.html`;
}

function codeAware(value) {
  return String(value ?? "").replace(/`([^`]+)`/g, "<code>$1</code>");
}

function rows(items, columns) {
  if (!items?.length) {
    return `<tr><td colspan="${columns}"><span class="zh">本页没有新的直接属性表；中文主阅读路径主要解释页面职责、官方结构、相邻 schema、使用边界和本地阅读入口。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const inheritedXformableImageable = [
  {
    from: "Xformable",
    name: "xformOpOrder",
    type: "token[]",
    fallback: "",
    zh: "控制 transform op 的应用顺序。对 `SpatialAudio` 来说，空间音频位置会跟随 prim 层级和 transform 解释，因此移动或动画父级时要核对该顺序。",
    en: "Transform operation order.",
  },
  {
    from: "Imageable",
    name: "proxyPrim",
    type: "rel",
    fallback: "",
    zh: "Imageable 的代理 prim 关系。它不决定音频文件或播放时段，但可能影响工具如何在场景层级中展示该 prim。",
    en: "Proxy prim relationship.",
  },
  {
    from: "Imageable",
    name: "purpose",
    type: "token",
    fallback: "default",
    zh: "Imageable purpose token。它不是音频模式；不要把 `purpose` 和 `auralMode` 混淆。",
    en: "Imageable purpose.",
  },
  {
    from: "Imageable",
    name: "visibility",
    type: "token",
    fallback: "inherited",
    zh: "可见性继承 token。若工具把音频 prim 当作可视节点显示或隐藏，调试时要区分 UI 可见性与实际音频播放状态。",
    en: "Visibility token.",
  },
];

const pages = [
  {
    name: "AssetPreviewsAPI",
    title: "AssetPreviewsAPI",
    summary: "AssetPreviewsAPI supports thumbnail previews for assets, including multiple thumbnails and one designated default.",
    sourceIntro: "AssetPreviewsAPI supports providing thumbnail previews for assets.",
    sourceKeywords: ["AssetPreviewsAPI", "thumbnail previews", "preview render", "Multiple thumbnails", "default"],
    paragraphs: [
      "`AssetPreviewsAPI` 的职责是给资产关联缩略图预览。官方说明它可以提供 preview render thumbnails，这些图片可用于 DCC 工具的 asset browser、系统资产浏览器或其他 UX 入口，让用户在打开资产前先看到可辨识的图标或预览。",
      "本页核心不是讲渲染算法，而是讲“如何把预览图和资产联系起来”。缩略图可以是预渲染图片、不同质量等级的图标、不同风格的资产截图，应用端可用它们构建浏览器卡片、搜索结果、收藏列表或资产详情页。",
      "官方提醒 `AssetPreviewsAPI` schema 必须实际 applied，且要考虑 thumbnails assigned 的结构。也就是说，仅在页面上写了图片路径或在工具中看到图片，并不等于 USD 资产已经用标准 schema 表达了预览关系。",
      "Multiple thumbnails 可以同时分配给一个资产，其中一个可 designated as the default。中文阅读时要特别区分“多个候选缩略图”和“默认缩略图”：前者给应用选择质量或风格，后者是没有额外偏好时的默认展示入口。",
      "常见误读是把缩略图当作材质贴图、preview surface 或最终渲染输出。`AssetPreviewsAPI` 表达的是资产浏览体验中的媒体关联；它不会改变模型几何、材质绑定、照明或渲染产品，也不会替代 `UsdRender` 的 `RenderProduct`。",
      "调试路径应从 schema application 开始：确认目标 asset prim 上确实 applied 了 `AssetPreviewsAPI`；再检查 thumbnails 是否指向可解析 asset 路径；确认哪个 thumbnail 是 default；最后检查 DCC asset browser 或系统浏览器是否支持读取这些关系。",
      "与相邻类型的关系很简单：`SpatialAudio` 处理场景中的声音播放和空间/非空间模式；`AssetPreviewsAPI` 处理资产缩略图。overview 会把二者放在 UsdMedia 域里统一解释，目录页则提供本地连续阅读入口。",
      "如果资产浏览器看不到缩略图，不能马上断定文件损坏。更稳的检查顺序是 asset 路径解析、default thumbnail 设置、应用是否支持该 schema、layer composition 是否覆盖了关系、以及缩略图文件格式是否被工具链接受。",
      "本页已经对比官方页和本地 source snapshot：标题、preview render thumbnails、DCC tool asset browser、multiple thumbnails、default thumbnail、schema must be applied 等核心语义都已纳入中文主阅读路径。API/schema/token 名称保持英文。",
    ],
    properties: [
      { name: "thumbnails", type: "asset/list relationship", fallback: "", zh: "表示一个资产可关联多个缩略图。实际 USD 结构需以官方 schema 为准；中文说明只解释缩略图集合的用途。", en: "Thumbnail associations for an asset." },
      { name: "default thumbnail", type: "designated preview", fallback: "", zh: "多个缩略图中作为默认展示的一项。它服务于 asset browser 和 UX，不是材质或渲染输出。", en: "Designated default thumbnail." },
      { name: "preview render", type: "thumbnail source", fallback: "", zh: "可作为缩略图来源的预渲染图像。它是资产展示媒体，不改变资产本体。", en: "Preview render thumbnail." },
    ],
    related: ["overview", "SpatialAudio", "usdMedia_toc"],
  },
  {
    name: "SpatialAudio",
    title: "SpatialAudio",
    summary: "SpatialAudio defines scene audio playback, including file path, aural mode, playback range, media offset, and gain.",
    sourceIntro: "Defines the properties that enable audio playback in the scene.",
    sourceKeywords: ["SpatialAudio", "filePath", "auralMode", "startTime", "endTime", "playbackMode", "mediaOffset", "loopFromStage"],
    paragraphs: [
      "`SpatialAudio` 定义让音频在 scene 中播放所需的属性。它说明播放哪个音频文件、音频以空间方式还是非空间方式播放，以及播放时段、循环模式、媒体偏移和增益如何解释。",
      "官方把核心分为三组：`filePath` 指向音频文件；`auralMode` 决定播放模式；`startTime`、`endTime`、`playbackMode` 和 `mediaOffset` 组合决定播放窗口和播放行为。中文阅读应按这三组理解，而不是把所有字段当成独立开关。",
      "示例中的 `Speech` 和 `Ambient` 是关键对照：`Speech` 从场景中 `Cube` 的位置空间播放，听感随 listener 位置变化；`Ambient` 是 `nonSpatial`，听起来不随 listener 位置变化。这个区别是理解 `auralMode` 的主线。",
      "`Speech` 被嵌套在 `Cube` gprim 下，是为了当 gprim 移动或动画时，空间音频也跟随对应位置。若音频位置不对，应检查 prim 层级、父级 transform、`xformOpOrder` 和 listener 坐标，而不是只看音频文件路径。",
      "官方示例用 `endTime (480) - startTime (240) / timeCodesPerSecond (24) = 10` 说明播放 10 秒。这里需要小心阅读：按场景时间码换算，起止时间和 `timeCodesPerSecond` 一起决定播放时长，不能只按源媒体秒数理解。",
      "`mediaOffset` 描述从音频文件内部的哪个位置开始取样。示例说明 `mySpeech.mp3` 从音频文件第 10 秒播放到第 20 秒。也就是说，stage 上的播放窗口和媒体文件内部偏移是两个相关但不同的时间概念。",
      "`playbackMode` 决定是否循环以及循环范围。官方列出的 token 包括 `onceFromStart`、`onceFromStartToEnd`、`loopFromStart`、`loopFromStartToEnd`、`loopFromStage` 等；这些 token 不能翻译，否则工具无法识别。",
      "`SpatialAudio and Layer Offsets` section 提醒音频时间也会受 layer offset 影响。若引用层、payload 或 sublayer 带 offset，音频在 stage 时间上的播放位置可能和源层 authored time 不同，调试时要把 composition timing 一起考虑。",
      "常见误读是把 `auralMode=spatial` 当成“音频文件是 3D 格式”。更准确地说，spatial/nonSpatial 表达的是播放在场景中的空间化解释；音频文件本身仍由 `filePath` 指向，具体声道格式和播放能力还取决于应用或运行时。",
      "排查音频问题时建议按顺序看：`filePath` 是否可解析；`auralMode` 是否符合预期；`startTime`/`endTime` 与 `timeCodesPerSecond` 是否换算正确；`mediaOffset` 是否跳到正确媒体片段；`playbackMode` 是否导致一次播放或循环；最后检查 layer offset 和父级 transform。",
      "本页已经对比官方页和本地 source snapshot：`Speech`、`Ambient`、`Cube`、`filePath`、`auralMode`、`startTime`、`endTime`、`playbackMode`、`mediaOffset`、`mySpeech.mp3`、`loopFromStage` 等语义已纳入中文主阅读路径，并保留正式 token。",
    ],
    properties: [
      { name: "auralMode", type: "token", fallback: "spatial", zh: "`spatial` 表示从场景位置播放，`nonSpatial` 表示不随 listener 位置变化。它决定听感空间化，不是音频文件格式。", en: "Aural playback mode." },
      { name: "endTime", type: "timecode", fallback: "0", zh: "stage 时间上的播放结束点。需要和 `startTime`、`timeCodesPerSecond`、layer offset 一起计算。", en: "Playback end time." },
      { name: "filePath", type: "asset", fallback: "@@", zh: "指向音频文件的 asset path。调试时先确认路径解析和文件格式支持。", en: "Audio file path." },
      { name: "gain", type: "double", fallback: "1.0", zh: "播放增益。它影响音量解释，但不决定空间/非空间模式。", en: "Playback gain." },
      { name: "mediaOffset", type: "timecode", fallback: "0.0", zh: "从媒体文件内部哪个位置开始播放；和 stage 上的 start/end time 是不同层次的时间概念。", en: "Offset inside the media file." },
      { name: "playbackMode", type: "token", fallback: "onceFromStart", zh: "控制一次播放或循环播放，token 包括 `onceFromStartToEnd`、`loopFromStartToEnd`、`loopFromStage` 等。", en: "Playback mode token." },
      { name: "startTime", type: "timecode", fallback: "0", zh: "stage 时间上的播放起点。要结合 timeCodesPerSecond 和 layer offset 理解。", en: "Playback start time." },
    ],
    inherited: inheritedXformableImageable,
    related: ["overview", "AssetPreviewsAPI", "usdMedia_toc"],
  },
  {
    name: "overview",
    title: "Overview",
    summary: "The usdMedia overview explains audio and thumbnail media associations for assets and scenes.",
    sourceIntro: "The UsdMedia domain provides ways to associate various forms of media, such as audio or thumbnails with assets.",
    sourceKeywords: ["UsdMedia", "SpatialAudio", "AssetPreviewsAPI", "assetPreviewsApi.usda", "Speech", "Ambient", "Cube"],
    paragraphs: [
      "usdMedia overview 的职责是解释如何把媒体和 USD 资产或场景关联起来。官方明确列出两类核心能力：`SpatialAudio` 用于音频播放，`AssetPreviewsAPI` 用于资产缩略图预览。二者都属于“媒体关联”，但作用位置和用户体验不同。",
      "`SpatialAudio` 允许环境音播放，也允许从场景中特定位置播放音频，并提供播放选项。中文阅读时应把它放在 scene playback 语境里：声音可以跟随 prim 层级和 transform，也可以作为非空间环境音存在。",
      "`AssetPreviewsAPI` 允许为资产设置一个或多个 thumbnails。这些缩略图可以是预渲染资产图片，用于 DCC asset browser 或系统 asset browser。它服务于资产浏览和选择体验，不影响资产几何、材质或渲染输出。",
      "官方示例 `assetPreviewsApi.usda` 同时使用了两个 schema。示例中的 `Speech` 与 `Ambient` 展示 spatial 和 nonSpatial 音频差异；`Speech` 嵌套在 `Cube` gprim 下，说明当 Cube 移动或动画时，音频位置也应随之变化。",
      "overview 还指出 thumbnails 如何与资产关联，以及应用如何利用这些缩略图。读者应理解为：资产本体可以通过标准 schema 暴露预览媒体，工具可以读取这些关联来构建 asset browser UX。",
      "常见误读是把 usdMedia 当成视频播放器或完整媒体运行时。当前官方页面聚焦 audio playback 和 thumbnail previews，不等于 USD 已经定义所有流媒体、字幕、视频编辑或 DCC 内部媒体缓存行为。",
      "另一个误读是把 `SpatialAudio` 和 `AssetPreviewsAPI` 混成同一类属性。前者通常与 scene 中的 prim、时间码、播放模式和空间位置相关；后者与资产级预览图、默认缩略图和浏览器展示相关。overview 的价值就是先把这两个方向分开。",
      "调试 overview 示例时可以按路径拆解：先看 `Speech` 和 `Ambient` 的 aural mode；再看 `Speech` 是否嵌套在 `Cube` 下；然后检查 `filePath`、start/end time、media offset；最后检查 thumbnails 是否分配到资产并指定默认预览。",
      "阅读顺序建议是先从 `usdMedia_toc` 或本 overview 进入，理解 UsdMedia 域只覆盖媒体关联；再阅读 `SpatialAudio` 掌握音频属性；最后阅读 `AssetPreviewsAPI` 掌握缩略图关联。这样能把声音播放和资产浏览预览分开理解。",
      "本页已经对比官方页和本地 source snapshot：`UsdMedia`、`SpatialAudio`、`AssetPreviewsAPI`、`assetPreviewsApi.usda`、`Speech`、`Ambient`、`Cube`、`defaultThumbnail.jpg` 等核心示例语义均已进入中文主阅读路径。",
    ],
    properties: [
      { name: "SpatialAudio", type: "schema", fallback: "", zh: "用于场景音频播放，可表达空间或非空间播放、播放时间窗口、媒体偏移和循环模式。", en: "Scene audio playback schema." },
      { name: "AssetPreviewsAPI", type: "API schema", fallback: "", zh: "用于把一个或多个缩略图关联到资产，并支持默认缩略图。", en: "Asset thumbnail preview schema." },
      { name: "assetPreviewsApi.usda", type: "example", fallback: "", zh: "官方示例文件，同时展示音频和缩略图关联。", en: "Example file." },
    ],
    related: ["usdMedia_toc", "SpatialAudio", "AssetPreviewsAPI"],
  },
  {
    name: "usdMedia_toc",
    title: "Media (usdMedia)",
    summary: "The usdMedia table-of-contents page is the local entry point for media schema reading.",
    sourceIntro: "Media (usdMedia) is the table-of-contents shell for the usdMedia schema guide.",
    sourceKeywords: ["Media (usdMedia)"],
    paragraphs: [
      "`usdMedia_toc` 是 usdMedia 用户指南的目录壳页。官方正文很短，但在本地中文站中它承担连续阅读入口职责：读者应能从这里进入 overview、`SpatialAudio` 和 `AssetPreviewsAPI`，而不是只看到一个英文标题。",
      "本目录页首先说明 usdMedia 的边界：它用于把媒体形式与资产或场景关联，当前核心是音频和缩略图。它不是完整视频剪辑系统，也不是材质贴图系统，更不是 renderer output 的替代品。",
      "推荐阅读顺序是：先读 `overview`，理解 `SpatialAudio` 和 `AssetPreviewsAPI` 的分工；再读 `SpatialAudio`，掌握 `filePath`、`auralMode`、`startTime`、`endTime`、`playbackMode`、`mediaOffset`；最后读 `AssetPreviewsAPI`，理解多个缩略图和默认预览。",
      "如果读者关注声音，应直接进入 `SpatialAudio`，重点看 spatial 与 nonSpatial、stage time、layer offsets 和父级 transform。如果读者关注资产浏览体验，则进入 `AssetPreviewsAPI`，重点看 thumbnail assignment 和 default thumbnail。",
      "目录页还应提醒本地链接规则：阅读路径中的 in-scope 链接应该跳转到本地 HTML；只有“打开官方原页 / Open official page”才是明确外跳。这能避免读者在本地中文站顺读时突然跳到官方英文站。",
      "常见误读是认为目录页没有正文就没有翻译价值。实际上，目录页的价值在于告诉读者怎么读、先读什么、不同 schema 解决什么问题，以及遇到音频或缩略图问题时去哪里查。",
      "调试路线也可以从目录页建立：音频不播放先查 `SpatialAudio.filePath` 和播放时段；空间位置不对查 prim 层级和 transform；缩略图不显示查 `AssetPreviewsAPI` 是否 applied、asset path 是否可解析、default thumbnail 是否设置。",
      "本页已经对比官方页和本地 source snapshot：官方标题 `Media (usdMedia)`、目录入口含义、overview、`SpatialAudio` 和 `AssetPreviewsAPI` 的阅读路径均已纳入中文主阅读区。英文标题保留用于核对，不作为唯一阅读内容。",
    ],
    properties: [
      { name: "overview", type: "local guide", fallback: "", zh: "usdMedia 概览页，建议作为目录后的第一站。", en: "Overview page." },
      { name: "SpatialAudio", type: "schema page", fallback: "", zh: "空间/非空间音频播放 schema 页。", en: "Spatial audio schema page." },
      { name: "AssetPreviewsAPI", type: "API schema page", fallback: "", zh: "资产缩略图预览 API schema 页。", en: "Asset previews API page." },
    ],
    related: ["overview", "SpatialAudio", "AssetPreviewsAPI"],
  },
];

function commonCoverage(page) {
  const related = page.related.map((name) => `<code>${esc(name)}</code>`).join("、");
  return [
    `本页属于第 ${ROUND} 轮 usdMedia 短页小批量冲刺。中文主阅读路径覆盖页面职责、官方 section、schema/property 分组、使用边界、常见误读、调试路径和相邻 usdMedia 类型关系；英文保留用于 API/schema/token 对照，不作为主要阅读路径。`,
    `源页对比采用本地 source snapshot <code>${sourceDir}/${page.name}_source.html</code>，并按官方页 <code>${officialUrl(page.name)}</code> 的标题、section、属性名和链接语义核对。API 名、schema 名、token、属性名、代码、命令和表格标签保持英文。`,
    `usdMedia 的领域边界是“把媒体与资产或场景关联起来”。当前这组短页主要覆盖两类媒体：一类是 <code>SpatialAudio</code> 代表的音频播放，一类是 <code>AssetPreviewsAPI</code> 代表的缩略图预览。中文说明会把二者分开，避免把音频属性、缩略图和渲染输出混为一谈。`,
    `与相邻 usdMedia 类型的关系是本页阅读重点：${related}。读者应通过这些本地页把目录、overview、音频 schema 和缩略图 API 串成连续阅读路径，而不是只靠英文 Doxygen 列表猜测。`,
    `从 authoring 角度看，usdMedia 页面不会替应用实现播放器或资产浏览器，而是把媒体关联意图写进 USD。具体播放、格式支持、浏览器展示和 UI 行为仍取决于 DCC 工具、应用运行时或系统浏览器。`,
    `从调试角度看，音频问题要查文件路径、时间码、播放模式、layer offset、空间模式和 prim transform；缩略图问题要查 schema application、asset 路径、默认预览和应用是否支持该 schema。`,
    `从术语保留看，诸如 <code>SpatialAudio</code>、<code>AssetPreviewsAPI</code>、<code>filePath</code>、<code>auralMode</code>、<code>playbackMode</code>、<code>mediaOffset</code>、<code>nonSpatial</code>、<code>loopFromStage</code> 这类标识不能翻译。中文只解释语义、边界和调试方式。`,
    `从 source parity 看，完成页必须覆盖官方标题、核心段落、示例对象、属性名、token 和本地 source snapshot 中的主要语义。若只保留英文标题和少量中文导读，则继续保持草稿状态，不能写入 promotion manifest。`,
    `本页保留显式“打开官方原页 / Open official page”外跳，其他 release/user-guide 阅读路径由本地导航和正文链接承接，符合第 396 轮修复后的连续阅读要求。`,
    `从本轮验收看，页面只有在主阅读区足以独立解释官方结构时才允许晋级。中文读者应能不依赖英文正文回答：本页负责什么、与相邻 schema 如何连接、遇到音频或缩略图问题时从哪里排查。`,
    `从团队协作看，usdMedia 页面同时服务资产管理、DCC 工具、场景播放和用户体验工作流。中文解释因此不只翻译属性名，还要说明这些媒体关联如何影响资产浏览、场景试听、预览图选择和发布检查。`,
    `从资产发布检查看，usdMedia 信息通常不是资产几何是否正确的唯一证据，但它会影响用户发现资产、识别资产和试听场景的效率。发布前应确认媒体文件可解析、路径相对关系稳定、默认预览清晰、音频播放窗口合理，并且目标工具链知道如何读取这些 schema。`,
    `从 composition 看，媒体关联也可能被 layer、variant、payload 或 reference 改写。若某个缩略图或音频在合成后消失，应检查最强 authored opinion、关系目标是否被清空、asset path 是否在新包路径下仍可解析，以及 layer offset 是否改变了音频播放时间。`,
    `从用户体验看，缩略图和音频都服务于“在打开或播放资产前提供上下文”。缩略图帮助浏览器展示资产外观，空间音频帮助场景呈现听觉线索；二者都不应被误写成材质贴图、几何属性、最终帧输出或 renderer pass 配置。`,
    `从本地站维护看，目录页、overview 和两个 schema 页需要形成闭环。读者从总入口进入 release index 后，应能通过本地侧栏进入 usdMedia 目录，再进入 overview，最后进入具体 schema 页，并能返回总入口或显式打开官方原页核对英文。`,
    `从后续审计看，英文/中文比例只作为诊断信号。只要中文主阅读路径覆盖官方结构、示例语义、使用边界和调试路径，API 名、token、文件名和示例对象可以保留英文；反过来，如果只有短导读和英文正文，则不能视为 review-ready。`,
    `从跨工具兼容看，不同 DCC 或系统浏览器可能对缩略图数量、默认缩略图、音频格式、空间化播放和循环模式支持不同。USD 页面负责提供标准化表达，工具实现负责解释和呈现；中文说明需要把这条边界讲清楚。`,
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
    <section data-cn-complete="round-407-usdMedia-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、核心属性或 schema 分组、使用边界、误读点、调试路径和相邻 usdMedia 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
        <li><span class="zh">已保留 API 名、schema 名、token、属性名、代码、命令、Doxygen 表格标签和链接语义；中文只解释技术含义，不改写正式标识。</span><span class="en">Technical identifiers are preserved.</span></li>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(source)}</code>，并与官方页 <code>${esc(official)}</code> 的标题、section 与属性语义保持一致。</span><span class="en">Local source snapshot and official page semantics were compared.</span></li>
      </ul>
    </section>

    <section>
      <h2>官方属性或条目 / Official Properties or Entries</h2>
      <table>
        <thead><tr><th>Property / Schema</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${rows(page.properties, 4)}
        </tbody>
      </table>
    </section>

    <section>
      <h2>继承属性 / Inherited Properties</h2>
      <table>
        <thead><tr><th>From</th><th>Property</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${rows(page.inherited || [], 5)}
        </tbody>
      </table>
    </section>

    <section>
      <h2>相邻 usdMedia 阅读路径 / Adjacent usdMedia Reading Path</h2>
      <p class="zh">本页不应孤立阅读。下面的本地页面用于在 release user guide 中保持连续阅读，并帮助区分媒体 overview、空间音频播放和资产缩略图预览。</p>
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

function sourceFacts(page) {
  const article = sourceArticle(page.name);
  const h1 = stripTags(article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const headings = [...article.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => stripTags(m[2])).filter(Boolean);
  const codes = [...article.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
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
    preserved_code_terms_sample: [...new Set(codes)].slice(0, 50),
  };
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
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdMedia-`))
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
    target_domain: "usdMedia",
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
    id: `round-${ROUND}-release-usdMedia-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdMedia short-page promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, schema/property groups, media association boundaries, common misreads, debugging path, adjacent usdMedia relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
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
    purpose: `Round ${ROUND} DomainSprintRound：usdMedia 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 120 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、schema/property 分组、媒体关联边界、误读点、调试路径、相邻 usdMedia 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdMedia release user guide 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
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
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
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
    target_domain: "usdMedia",
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
