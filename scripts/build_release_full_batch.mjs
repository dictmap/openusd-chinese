import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");
const sourceDir = path.join(root, "source", "full_release");
const outputDir = path.join(root, "full_site", "release");
const batchSize = Number.parseInt(process.env.OPENUSD_BATCH_SIZE ?? "5", 10);
const refreshDrafts = process.env.OPENUSD_REFRESH_DRAFTS === "1";

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(filePath) {
  return JSON.parse(stripBom(await readFile(filePath, "utf8")));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\uf0c1/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, " - ")
    .replace(/&ndash;/g, " - ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function fileNameFromUrl(url) {
  return path.basename(new URL(url).pathname);
}

function releaseRelativePathFromUrl(url) {
  const { pathname } = new URL(url);
  return pathname.replace(/^\/release\//, "");
}

function sourceFileName(url) {
  return releaseRelativePathFromUrl(url).replace(/\.html$/, "_source.html");
}

function hrefToRoot(localOutputRelative) {
  const dir = path.posix.dirname(localOutputRelative);
  return path.posix.relative(dir, ".") || ".";
}

function extractTitle(html) {
  return cleanText(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
}

function extractArticleHtml(html) {
  return html.match(/<div[^>]+itemprop="articleBody"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i)?.[1]
    ?? html.match(/<div[^>]+class="rst-content"[^>]*>([\s\S]*?)<\/div>/i)?.[1]
    ?? html;
}

function extractHeadings(html) {
  const main = extractArticleHtml(html);
  const matches = [...main.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  return matches.map((match) => ({
    level: Number(match[1]),
    text: cleanText(match[2]).replace("", "").trim(),
  })).filter((entry) => entry.text).slice(0, 24);
}

function extractInternalLinks(html, officialUrl) {
  const main = extractArticleHtml(html);
  const links = [];
  const seen = new Set();
  for (const match of main.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const rawHref = match[1];
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:") || rawHref.startsWith("mailto:")) continue;
    let url;
    try {
      url = new URL(rawHref, officialUrl);
    } catch {
      continue;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") continue;
    if (url.origin === "https://openusd.org" && (!url.pathname.startsWith("/release/") || !url.pathname.endsWith(".html"))) continue;
    url.hash = "";
    url.search = "";
    const key = url.toString();
    const text = cleanText(match[2]) || key;
    if (!text || /^\d+$/.test(text)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({
      text,
      url: key,
    });
  }
  return links.slice(0, 36);
}

function shortEnglishExcerpt(html) {
  const main = extractArticleHtml(html);
  const paragraphs = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => cleanText(match[1]))
    .filter((text) => text.length > 40 && !text.includes("Copyright"))
    .slice(0, 3);
  if (paragraphs.length > 0) return paragraphs;

  const indexEntries = [...main.matchAll(/<a\b[^>]*\bhref\s*=\s*["'][^"']+["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => cleanText(match[1]))
    .filter((text) => text && !/^(Previous|Next|Link to this heading)$/i.test(text))
    .slice(0, 8);
  return indexEntries.length > 0 ? [`Index entries include: ${indexEntries.join("; ")}.`] : [];
}

function extractCodeSnippets(html) {
  const main = extractArticleHtml(html);
  const seen = new Set();
  return [...main.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi)]
    .map((match) => cleanText(match[1]))
    .map((text) => text.length > 520 ? `${text.slice(0, 517)}...` : text)
    .filter((text) => text.length > 16 && !/^[-\w]+$/.test(text))
    .filter((text) => {
      const key = text.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function normalizeTitle(title) {
  return String(title ?? "")
    .replace(/\uf0c1/g, "")
    .replace(/\s*\s*$/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCn(title) {
  const normalized = normalizeTitle(title);
  const known = new Map([
    ["Contributing", "贡献指南"],
    ["Contributing to USD", "贡献指南"],
    ["Contributors", "贡献者"],
    ["USD Contributors (Historical)", "历史贡献者"],
    ["Downloads and Videos", "下载和视频"],
    ["Index", "索引"],
    ["Introduction to OpenExec", "OpenExec 介绍"],
    ["Maximizing USD Performance", "最大化 USD 性能"],
    ["Alembic USD Plugin", "Alembic USD 插件"],
    ["RenderMan USD Imaging Plugin", "RenderMan USD Imaging 插件"],
    ["USD Third-Party Plugins", "USD 第三方插件"],
    ["Open Source Announcement", "开源公告"],
    ["Open Source Release", "开源发布"],
    ["Performance Considerations", "性能注意事项"],
    ["Performance Metrics", "性能指标"],
    ["Release Schedule", "发布时间表"],
    ["Search - Universal Scene Description 26.05 documentation", "搜索"],
    ["UsdPreviewSurface Specification", "UsdPreviewSurface 规范"],
    ["Volume", "体积 Volume"],
    ["VolumeFieldAsset", "体积场资产 VolumeFieldAsset"],
    ["VolumeFieldBase", "体积场基础类 VolumeFieldBase"],
    ["Time and Animated Values", "时间与动画值"],
    ["USD Variable Expressions", "USD 变量表达式"],
    ["Asset Resolution (Ar) 2.0", "Asset Resolution (Ar) 2.0 资产解析"],
    ["Asset Previews in USD", "USD 中的资产预览"],
    ["Generalizing Connectable Nodes Beyond UsdShade", "将 Connectable Nodes 泛化到 UsdShade 之外"],
    ["Coordinate Systems in USD Proposal", "USD 坐标系提案"],
    ["Render Settings in USD Proposal", "USD 渲染设置提案"],
    ["Rigid Body Physics in USD Proposal", "USD 刚体物理提案"],
    ["Schema Versioning in USD", "USD Schema 版本化"],
    ["Stage Variable Expressions", "Stage 变量表达式"],
    ["UsdAudio Proposal", "UsdAudio 提案"],
    ["Adapting UsdLux to Accommodate Geometry Lights", "适配几何灯光的 UsdLux"],
    ["Adapting UsdLux to the Needs of Renderers", "面向渲染器需求的 UsdLux"],
    ["UsdShade Material Assignment", "UsdShade 材质分配"],
    ["Proposals", "提案汇总"],
  ]);
  return known.get(normalized) ?? `页面草稿：${normalized || title}`;
}

function readingNotesCn(title) {
  const normalized = normalizeTitle(title);
  const notes = new Map([
    ["Volume", [
      "该页定义 UsdVol 的 Volume schema，用于表示烟、火等可渲染体积效果。",
      "Volume 继承 Gprim、Boundable、Xformable 和 Imageable，因此仍具备变换、渲染、材质绑定、purpose 等常规图元能力。",
      "体积数据通过 field:* relationships 连接到 VolumeFieldBase 派生 prim；关系名会被渲染器映射到体积 shader 的命名输入。",
      "官方示例使用 OpenVDBAsset 作为密度场资产，保留 USDA 片段以便核对 field:extinction、filePath 和 fieldName 的写法。",
    ]],
    ["VolumeFieldAsset", [
      "VolumeFieldAsset 是抽象 schema，表示存储在 layer 外部文件资产中的体积场数据。",
      "它是 OpenVDBAsset、Field3DAsset 等文件型体积场 schema 的基类；自定义文件型体积场 schema 时应从它继承。",
      "关键属性包括 filePath、fieldName、fieldIndex、fieldDataType 和 vectorDataRoleHint，用来描述字段位置、类型和选择方式。",
      "fieldIndex 用于同名字段消歧；例如一个 OpenVDB 文件中存在多个 density grid 时，可用索引指定具体字段。",
    ]],
    ["VolumeFieldBase", [
      "VolumeFieldBase 是抽象 schema，是所有 UsdVol field schema 的基础类。",
      "它本身不限定具体文件格式或存储位置，而是为 Volume 通过 relationships 连接字段 prim 提供共同类型基础。",
      "扩展 UsdVol 自定义 field schema 时，应直接或间接继承 VolumeFieldBase。",
      "页面同时列出从 Xformable 和 Imageable 继承的常用属性，例如 xformOpOrder、purpose、visibility 和 proxyPrim。",
    ]],
    ["Time and Animated Values", [
      "该页解释 USD 中 TimeCode 与 TimeSamples 的建模方式：动画值不是单一静态值，而是按时间坐标变化。",
      "TimeCode 在 USD 中是无单位 double 值，不等同于 FPS 或 SMPTE；实际播放时间通过 timeCodesPerSecond、framesPerSecond 等元数据映射。",
      "页面覆盖 layer 的 start/end time、TimeCode 范围、clips，以及 composition 过程中的自动和显式 timeCode remapping。",
      "本地页保留 timeSamples、timecode typed attribute 和 metadata 的 USDA 示例，方便检查动画属性与时间码值类型语法。",
    ]],
    ["USD Variable Expressions", [
      "变量表达式是运行时求值的特殊字符串，可用 layer metadata 中的 expressionVariables 动态驱动场景值。",
      "它可用于 asset paths、sublayer、reference、payload、asset-valued attributes、metadata 和 variant selection 等位置。",
      "表达式变量支持 string、bool、int64、数组和 None 等类型，并可在 usda 字符串或资产路径中用反引号表达式引用。",
      "官方示例展示 ASSET_PATH 与 VARIANT_CHOICE 如何同时驱动 reference 路径和 variant 选择，本地页保留代码摘录用于核对语法。",
    ]],
    ["Asset Resolution (Ar) 2.0", [
      "该 proposal 是 Ar 2.0 资产解析重构的历史设计文档；页面声明已实现并可能过时，最新材料应以 Ar overview 为准。",
      "核心目标是让 USD 的 ArResolver 更适合非传统文件系统和资产管理系统，减少 repository/search path 等 Pixar 早期实现遗留概念。",
      "文档提出以 non-virtual interface 模式重做 ArResolver，并将公开 API 标记为 const，以强调并发调用和线程安全语义。",
      "本地页保留 Identifier、Resolve、AssetInfo、asset writing、resolver context string 等任务入口，便于追踪 Ar 2.0 的设计动机。",
    ]],
    ["Asset Previews in USD", [
      "该 proposal 讨论如何在 USD 中编码预生成的轻量预览资产，用于大量资产目录的快速浏览和缩略图显示。",
      "文档选择把 preview 关联到 prim 而不是 layer；stage 级默认预览可通过 defaultPrim 上的 preview 获取。",
      "提案把 thumbnail 等 preview 信息放在 assetInfo 字典中，以保持向后/向前兼容，并支持旧版 USD 应用通过通用 API 读取。",
      "本地页保留 assetInfo/previews/thumbnails/defaultImage 的 usda 示例，也保留它与 UsdGeomModel texture cards 的差异说明。",
    ]],
    ["Generalizing Connectable Nodes Beyond UsdShade", [
      "该 proposal 是将 UsdShade 的 connectable node 概念推广到非材质 shading 域的历史设计文档，页面声明已实现并指向 UsdShade overview。",
      "背景是 shader-like computation 不只用于材质，也可用于几何变形、灯光、相机、像素过滤等渲染域。",
      "提案把节点定义能力拆成 UsdShadeNodeDefAPI，把连接规则保留在 UsdShadeConnectableAPI，并允许 schema 插件注册 connectability callbacks。",
      "重点设计是让 UsdLux、UsdRi 等 schema 能拥有 node definition 和连接网络能力，同时尽量不破坏现有 UsdShadeShader、NodeGraph、Material 数据和客户端。",
    ]],
    ["Coordinate Systems in USD Proposal", [
      "该 proposal 讨论 USD 中渲染/着色坐标系的通用编码方式，页面声明已实现并指向 UsdShadeCoordSysAPI。",
      "核心需求是 shader 通过短名称访问坐标系，而不是通过跨层级 relationship 直接指向几何 prim。",
      "文档主张坐标系按 namespace subtree 作用域继承和覆盖，避免全局唯一长路径名称，同时适合资产引用和实例化。",
      "本地页保留 CoordSysAPI、coordSys:* relationship、projection painting、procedural texture 稳定空间和 usda 示例，便于核对绑定语义。",
    ]],
    ["Render Settings in USD Proposal", [
      "该 proposal 说明如何在 USD 中编码渲染设置，使一个 scene configuration 能包含调用渲染所需的 camera、outputs 和 renderer configuration。",
      "文档把 UsdRender 设计拆成 RenderSettings、RenderVar、RenderProduct 三类 prim：分别描述全局配置、渲染变量和输出 artifact。",
      "它明确 render settings 不等于 VFX final frame 的完整作业/合成描述，但为后续 rendering from USD 工作提供基础。",
      "本地页保留 RenderSettingsBase、camera、resolution、pixelAspectRatio、RenderVar 和 RenderProduct 等 schema 示例与设计入口。",
    ]],
    ["Rigid Body Physics in USD Proposal", [
      "该 proposal 是 USD 刚体物理 schema 的历史设计文档，页面声明已实现并指向 UsdPhysics overview。",
      "核心范围是 rigid body simulation：用刚体、约束、碰撞表示、物理材质和全局仿真参数描述实时或离线物理行为。",
      "设计倾向于把 Physics API schemas 附加到已有 USD prim 上，避免为了物理行为大量膨胀 scene 中的对象数量。",
      "本地页保留 PhysicsScene、Rigid Bodies、Collision Shapes、Joints、mass properties、units 和 gravity 等入口与 usda schema 片段。",
    ]],
    ["Schema Versioning in USD", [
      "该 proposal 讨论 USD schema 版本化的挑战，尤其是 composition、API schema 叠加和性能可扩展性对版本查询的影响。",
      "文档提出 per-schema versioning，使用版本化 schema 名称与 C++ schema class/codegen 策略来表达不同版本家族。",
      "重点问题包括 built-in API schemas、auto-apply API schemas、multiple-apply API schemas 和 API schema version conflicts。",
      "本地页保留 apiSchemas 中带版本后缀的示例，以及 schema inheritance、UsdPrim schema API 和代码生成选择的阅读入口。",
    ]],
    ["Stage Variable Expressions", [
      "该页面是迁移提示页，说明 Stage Variable Expressions proposal 已迁移到 OpenUSD-proposals。",
      "当前本地页保留该迁移状态和官方链接，不把它伪装成完整正文已复刻。",
      "与前一轮的 USD Variable Expressions 用户指南不同，本页是 proposal 迁移入口，主要作用是把全量清单中的官方页面状态补齐。",
      "后续如需要高保真内容，应从迁移后的 OpenUSD-proposals 原文继续扩展，而不是在此页制造不存在的旧正文。",
    ]],
    ["UsdAudio Proposal", [
      "该 proposal 是 USD 音频 schema 的历史设计文档，页面声明已实现并指向 UsdMediaSpatialAudio。",
      "目标是为 USD 场景中的音频元素提供 interchange schema，支持定时播放、空间位置/方向和 ambient sound。",
      "设计要求音频数据通过 assetPath 指向外部文件或流，schema 不直接嵌入音频数据，也不试图成为音频编辑工具格式。",
      "本地页保留 SpatialAudio、filePath、auralMode、playbackMode、startTime、mediaOffset、level 和 timeCodesPerSecond 示例入口。",
    ]],
    ["Adapting UsdLux to Accommodate Geometry Lights", [
      "该 proposal 讨论如何调整 UsdLux 以支持 geometry/mesh lights，页面声明已实现并指向 UsdLux overview。",
      "背景是不同渲染器对 mesh light 的理解不同：有的把 mesh 作为 light shape，有的通过材质 emission/glow 识别发光几何。",
      "文档比较 dual-prim geometry light 和 single-prim geometry light 的问题，并提出通过 LightAPI 调整 object model。",
      "本地页保留 LightAPI、GeometryLight deprecation、convenience base classes、light:shaderId、material emission 同步等关键设计入口。",
    ]],
    ["Adapting UsdLux to the Needs of Renderers", [
      "该 proposal 讨论如何让 UsdLux 更好适配高质量渲染器，页面声明已实现并指向 UsdLux overview。",
      "核心问题是许多渲染器把 lights、light filters、integrators 等表达为 shader-like networks，而纯 schema light 需要大量硬编码转换。",
      "文档提出让 UsdLux lights/light filters 具备 Connectable 能力，并用 Sdr definitions 让 Hydra/render delegates 数据驱动地解释 light networks。",
      "本地页保留 Sdr、UsdSchemaRegistry、UsdLuxPluginLight、UsdLuxPluginLightFilter、PortalLight 和 HdPrman/render delegate 变更入口。",
    ]],
    ["UsdShade Material Assignment", [
      "该 proposal 是 UsdShade 材质绑定与解析的历史设计文档，页面声明已实现并指向 UsdShade overview。",
      "背景是 direct material binding 会被 descendant 更强绑定覆盖，但真正对渲染器有意义的是对应 renderer 能消费的 material output。",
      "文档讨论 collection-based assignment、binding strength、material purpose 和 material resolve 等机制。",
      "本地页保留 PreviewMaterial、Skin、material:binding、renderer-specific outputs 和 collection-based binding 的 usda 示例入口。",
    ]],
    ["Proposals", [
      "该页是 release 文档中的 proposal 汇总入口，并声明新的 proposal 不再添加到此处，应转到 OpenUSD-proposals。",
      "本地页保留官方 proposal 列表入口，用来把 release 全量发现清单中的最后目录页补齐。",
      "列表覆盖 UsdLux、Ar 2.0、Asset Previews、Coordinate Systems、Connectable Nodes、Render Settings、Rigid Body Physics、Schema Versioning、Stage Variable Expressions 和 UsdShade Material Assignment 等页面。",
      "此页不伪造长正文；重点是保留官方链接、页面名和迁移说明，便于从最终入口跳转到对应本地 draft 或官方原页。",
    ]],
  ]);
  return notes.get(normalized) ?? [
    "本页属于 OpenUSD release 文档的全量待覆盖范围；当前先保留结构、链接和关键英文摘录。",
    "中文导读优先标出页面主题、相关 schema/API 名称和阅读入口，后续迭代再补更细的段落级对照。",
  ];
}

function buildPage({ officialUrl, title, headings, links, excerpts, codeSnippets, localOutputRelative }) {
  const cnTitle = titleCn(title);
  const rootHref = hrefToRoot(localOutputRelative);
  const cnNotes = readingNotesCn(title);
  const headingRows = headings.length > 0
    ? headings.map((heading) => `<li><span class="zh">第 ${heading.level} 级标题：${escapeHtml(heading.text)}</span><span class="en">${escapeHtml(heading.text)}</span></li>`).join("\n")
    : `<li><span class="zh">本页未提取到二级标题。</span><span class="en">No section headings were extracted for this page.</span></li>`;
  const noteRows = cnNotes.map((note) => `<li><span class="zh">${escapeHtml(note)}</span></li>`).join("\n");
  const linkRows = links.length > 0
    ? links.map((link) => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.text)}</a></li>`).join("\n")
    : `<li>No same-site document links extracted.</li>`;
  const excerptRows = excerpts.length > 0
    ? excerpts.map((text) => `<p class="en">${escapeHtml(text)}</p>`).join("\n")
    : `<p class="en">No concise paragraph excerpt extracted.</p>`;
  const codeSection = codeSnippets.length > 0
    ? `<section>
      <h2>代码与命令摘录 / Code and Command Excerpts</h2>
${codeSnippets.map((text) => `<pre><code>${escapeHtml(text)}</code></pre>`).join("\n")}
    </section>`
    : "";

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(cnTitle)} / ${escapeHtml(title)}</title>
  <link rel="icon" href="${escapeHtml(rootHref)}/site/images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.65}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1080px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    pre{background:#111827;color:#e6edf3;border-radius:6px;padding:14px;overflow:auto;font-size:13px;line-height:1.5}
    code{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    .status{display:inline-block;background:#8a6416;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body>
  <header>
    <span class="status">bilingual_draft</span>
    <h1>${escapeHtml(cnTitle)} / ${escapeHtml(title)}</h1>
    <div class="meta">${escapeHtml(officialUrl)}</div>
  </header>
  <main>
    <section>
      <h2>范围说明 / Scope Note</h2>
      <p class="zh">这是全量 OpenUSD 复刻队列中的批次草稿页。中文为主，保留英文页面名、链接和关键原文摘录；后续迭代会继续补齐更细的段落级中英对照。</p>
      <p class="en">This is a batch draft page in the all-pages OpenUSD reproduction queue. It keeps the original English page name, links, and concise source excerpts while later iterations add denser paragraph-level bilingual coverage.</p>
    </section>
    <section>
      <h2>中文导读 / Chinese Reading Notes</h2>
      <ul>
${noteRows}
      </ul>
    </section>
    <section>
      <h2>页面结构 / Page Structure</h2>
      <ul>
${headingRows}
      </ul>
    </section>
    <section>
      <h2>原文摘录 / English Source Excerpts</h2>
${excerptRows}
    </section>
${codeSection}
    <section>
      <h2>本页链接 / Page Links</h2>
      <ul>
${linkRows}
      </ul>
    </section>
    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="${escapeHtml(rootHref)}/openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="${escapeHtml(officialUrl)}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

const inventory = await readJson(path.join(reportDir, "all_pages_inventory.json"));
const batch = inventory.pages
  .filter((page) => page.area === "release" && page.status === (refreshDrafts ? "bilingual_draft" : "pending_full_scope"))
  .slice(0, batchSize);

await mkdir(sourceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });

const pages = [];
for (const page of batch) {
  const response = await fetch(page.official_url);
  const html = await response.text();
  const title = extractTitle(html) || page.title || fileNameFromUrl(page.official_url);
  const sourceName = sourceFileName(page.official_url);
  const outputName = releaseRelativePathFromUrl(page.official_url);
  const sourcePath = path.join(sourceDir, sourceName);
  const outputPath = path.join(outputDir, outputName);
  const localOutputRelative = path.relative(root, outputPath).replaceAll(path.sep, "/");
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(sourcePath, html, "utf8");

  const headings = extractHeadings(html);
  const links = extractInternalLinks(html, page.official_url);
  const excerpts = shortEnglishExcerpt(html);
  const codeSnippets = extractCodeSnippets(html);
  const generated = buildPage({
    officialUrl: page.official_url,
    title,
    headings,
    links,
    excerpts,
    codeSnippets,
    localOutputRelative,
  });
  await writeFile(outputPath, generated, "utf8");
  pages.push({
    official_url: page.official_url,
    title,
    source_snapshot: path.relative(root, sourcePath).replaceAll(path.sep, "/"),
    local_output: localOutputRelative,
    status: "bilingual_draft",
    http_status: response.status,
    heading_count: headings.length,
    link_count: links.length,
    excerpt_count: excerpts.length,
    code_snippet_count: codeSnippets.length,
    chinese_note_count: readingNotesCn(title).length,
  });
}

const report = {
  generated_at: new Date().toISOString(),
  batch_size: batch.length,
  status: "bilingual_draft",
  mode: refreshDrafts ? "refresh_existing_drafts" : "generate_pending_batch",
  note: "First-pass full-scope release pages. These are checkable bilingual draft HTML pages, not final paragraph-complete translations.",
  pages,
  passed: pages.length === batch.length && pages.every((page) => page.http_status >= 200 && page.http_status < 400),
};

await writeFile(path.join(reportDir, "release_full_batch_report.json"), JSON.stringify(report, null, 2), "utf8");
const mdRows = pages.map((page) => `| ${page.status} | ${page.title} | ${page.chinese_note_count} | ${page.local_output} | ${page.official_url} |`).join("\n");
await writeFile(path.join(reportDir, "release_full_batch_report.md"), `# OpenUSD Release Full-Scope Batch

Generated: ${report.generated_at}

- Status: ${report.status}
- Batch size: ${report.batch_size}
- Passed: ${report.passed}

| Status | Title | Chinese notes | Local output | Official URL |
| --- | --- | ---: | --- | --- |
${mdRows}
`, "utf8");

if (!report.passed) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  batchSize: pages.length,
  reportJson: path.join(reportDir, "release_full_batch_report.json"),
  reportMd: path.join(reportDir, "release_full_batch_report.md"),
}, null, 2));
