import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-109";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdMedia/overview.html",
    title: "usdMedia overview",
    summary:
      "`usdMedia` overview 说明 USD 如何把 audio、thumbnails 和其他媒体信息关联到资产和场景。它的重点不是几何或材质，而是 `AssetPreviewsAPI` 的缩略图元数据、`SpatialAudio` 的声音播放意图，以及这些媒体资源如何通过 asset path 和 timeCode 与 USD stage 对齐。",
    notes: [
      "`usdMedia` 应先按领域入口阅读：它补充 asset browser、DCC 工具和播放端需要的媒体语义，不直接修改 mesh、material 或 lighting schema。",
      "`AssetPreviewsAPI` 通过 `assetInfo.previews.thumbnails` 把 default thumbnail、high resolution thumbnail 等图像挂到资产上；这些路径用于浏览和展示，不等同于渲染输出产品。",
      "`SpatialAudio` 把 `filePath`、`auralMode`、`startTime`、`endTime`、`playbackMode`、`mediaOffset` 等属性放进 stage 时间线，表达声音何时以及如何播放。",
      "概览示例同时出现 `AssetPreviewsAPI` 和 `SpatialAudio`，适合展示媒体 schema 如何服务资产浏览和场景播放两个方向；翻译时不要把两者合并成一个“媒体文件属性”。",
      "`@defaultThumbnail.jpg@`、`@mySpeech.mp3@` 等 asset path 字面量必须保留，路径解析、打包和可用性由资产解析器或播放端处理。",
    ],
    terms: [
      ["usdMedia", "USD 媒体 schema 领域"],
      ["AssetPreviewsAPI", "资产预览 API schema"],
      ["SpatialAudio", "空间音频 schema"],
      ["assetInfo.previews.thumbnails", "资产预览缩略图元数据字典"],
      ["filePath", "媒体资源路径属性"],
      ["timeCode", "USD 时间码"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html",
    title: "Media (usdMedia)",
    summary:
      "`usdMedia_toc.html` 是 `usdMedia` 领域的目录页，聚合 Overview、Working With Media、`AssetPreviewsAPI`、`SpatialAudio`、SpatialAudio and Layer Offsets 以及 `auralMode`、`endTime` 等属性入口。本页主要价值是导航与术语定位。",
    notes: [
      "目录页应帮助读者选择阅读路径：需要缩略图或资产浏览器集成时看 `AssetPreviewsAPI`；需要场景声音和时间线播放时看 `SpatialAudio`。",
      "`Working With Media` 提供从概念到示例的过渡，适合在属性页之前阅读；它能避免读者只看单个 property 而错过资产预览与音频播放的使用场景。",
      "`SpatialAudio and Layer Offsets` 提醒音频时序可能受到 layer offset 或 stage 时间映射影响；这类主题不应只在 `SpatialAudio` 属性表中孤立理解。",
      "目录中的 `Properties`、`auralMode`、`endTime` 等入口是查属性定义的快速路径，中文层只解释导航用途，不翻译或改写属性名。",
      "本地链接继续保持站内跳转；`Overview`、`AssetPreviewsAPI`、`SpatialAudio` 等页面名保留英文，方便跨页搜索和与官方文档对齐。",
    ],
    terms: [
      ["usdMedia_toc.html", "usdMedia 目录页"],
      ["Working With Media", "媒体使用指南入口"],
      ["SpatialAudio and Layer Offsets", "空间音频与层偏移主题"],
      ["auralMode", "听觉模式属性"],
      ["endTime", "结束时间属性"],
      ["Properties", "属性索引入口"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html",
    title: "AssetPreviewsAPI",
    summary:
      "`AssetPreviewsAPI` 为 USD 资产提供 thumbnail previews。它通过 `prepend apiSchemas = [\"AssetPreviewsAPI\"]` 和 `assetInfo.previews.thumbnails` 字典把 `defaultImage` 等 preview render 图像关联到资产，常用于 DCC asset browser 或系统资产浏览器。",
    notes: [
      "`AssetPreviewsAPI` 是资产元数据和用户界面之间的桥梁。它描述哪些图片可作为 preview thumbnails，不描述如何生成这些图片。",
      "示例中的 `default`、`highResolution`、`wireFrame` 是不同预览版本的字典 key，`defaultImage = @defaultThumbnail.jpg@` 等 asset path 是浏览器可读取的图像入口。",
      "`prepend apiSchemas = [\"AssetPreviewsAPI\"]` 表示这是 applied API；它附着在资产根 prim 上提供预览元数据，而不是创建一个新的可渲染图元。",
      "preview render thumbnails 可以来自发布流程、离线渲染或缓存系统；如果图片缺失，USD 资产仍可加载，只是浏览器无法显示对应预览。",
      "维护本页时要保留 `assetInfo`、`previews`、`thumbnails`、`defaultImage` 和 `@...@` asset path 语法，避免破坏实际资产文件示例。",
    ],
    terms: [
      ["AssetPreviewsAPI", "资产预览 API schema"],
      ["thumbnail previews", "缩略图预览"],
      ["assetInfo", "资产信息元数据字典"],
      ["previews.thumbnails", "预览缩略图字典"],
      ["defaultImage", "默认预览图路径"],
      ["applied API", "应用型 API schema"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/usdRender_toc.html",
    title: "Render (usdRender)",
    summary:
      "`usdRender_toc.html` 是 usdRender schema 领域目录页，用来组织 Overview、Best Practices、`RenderSettings`、`RenderProduct`、`RenderVar`、`RenderPass` 等入口。阅读本页的目标是先建立渲染配置对象的职责分工，再跳到具体 schema 属性页。",
    notes: [
      "`RenderSettings` 通常聚合相机、分辨率、输出 products 等作业级配置；`RenderProduct` 表示输出 artifact；`RenderVar` 表示 AOV 或输出变量；`RenderPass` 表示一次 pass 的渲染器和场景选择。",
      "`Best Practices` 和 `Understand Which Schemas to Use` 是目录中最适合先读的概念页，可帮助决定应该 author settings、products、vars 还是 passes。",
      "`Group UsdRender Prims`、`Provide a Default RenderSettings`、`Designate a Render Camera` 说明 usdRender 还关心 prim 组织、默认渲染入口和相机选择。",
      "如果目标是找 AOV、LPE 或 sourceName，应跳 `RenderVar`；如果目标是输出文件或 buffer，应跳 `RenderProduct`；如果目标是多 pass 或可见集合，应跳 `RenderPass`。",
      "本页是导航页，不应写成属性规范页；中文补强应突出阅读顺序、跨页关系和本地链接入口。",
    ],
    terms: [
      ["usdRender", "USD 渲染 schema 领域"],
      ["RenderSettings", "渲染设置 schema"],
      ["RenderProduct", "渲染输出产品 schema"],
      ["RenderVar", "渲染变量 schema"],
      ["RenderPass", "渲染 pass schema"],
      ["Best Practices", "最佳实践入口"],
    ],
  },
  {
    output: "full_site/release/wp_render_settings.html",
    title: "Render Settings in USD Proposal",
    summary:
      "`wp_render_settings.html` 是 Render Settings in USD 的设计提案页，解释为什么需要在 USD 中表达 `RenderSettings`、`RenderProduct` 和 `RenderVar`。它提出的是渲染配置模型和 schema 设计边界，不是完整的 VFX render farm、合成或最终帧作业系统。",
    notes: [
      "提案把 `RenderSettings`、`RenderProduct`、`RenderVar` 拆成三类 prim：settings 管作业级配置，product 管输出 artifact，var 管输出变量或 AOV。",
      "`RenderSettingsBase` 中的 `camera`、`resolution`、`pixelAspectRatio` 等属性说明基础设置可以被 `RenderSettings` 或 `RenderProduct` 共享或继承。",
      "文档明确 render settings 不等同于完整 VFX final frame 描述；调度、farm、复杂合成和镜头级发布仍可能由外部系统负责。",
      "代码摘录里的 class schema、relationship 和 uniform attribute 是设计依据，中文说明应保留 `RenderSettingsBase`、`camera`、`UsdGeomCamera`、`resolution` 等字面量。",
      "本页适合和当前 `usdRender` schema 页面互相对照：提案解释设计动机，schema 页面解释已经落地的属性和使用方式。",
    ],
    terms: [
      ["Render Settings in USD", "USD 渲染设置提案"],
      ["RenderSettings", "渲染设置 prim"],
      ["RenderProduct", "渲染输出产品 prim"],
      ["RenderVar", "渲染变量 prim"],
      ["RenderSettingsBase", "渲染设置基础 schema"],
      ["pixelAspectRatio", "像素宽高比属性"],
    ],
  },
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, function names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>|    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
  results,
}, null, 2));
