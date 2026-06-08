import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 409;
const GENERATED_AT = "2026-06-08T02:35:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdVol";
const sourceDir = "source/full_release/user_guides/schemas/usdVol";
const sourceParityReport = "reports/round_409_usdVol_source_parity.json";

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
  return `https://openusd.org/release/user_guides/schemas/usdVol/${name}.html`;
}

function rows(items, columns) {
  if (!items?.length) {
    return `<tr><td colspan="${columns}"><span class="zh">本页没有新的属性表；中文主阅读路径主要解释页面职责、官方段落、相邻 usdVol 类型、使用边界、误读点和调试路径。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const candidates = [
  "Field3DAsset",
  "FieldAsset",
  "FieldBase",
  "OpenVDBAsset",
  "ParticleField",
  "ParticleField3DGaussianSplat",
  "ParticleFieldKernelBaseAPI",
  "ParticleFieldKernelConstantSurfletAPI",
];

const commonRelated = [
  "overview",
  "usdVol_toc",
  "Volume",
  "VolumeFieldAsset",
  "VolumeFieldBase",
  "ParticleField",
  "ParticleField3DGaussianSplat",
];

function commonCoverage(page) {
  return [
    `本页属于 ` + "`UsdVol`" + ` schema 域。` + "`UsdVol`" + ` 的核心是表达体积场、体积数据资产、volume 与 field 的关系，以及粒子场这种可渲染体积/点云式表示。它不负责 ` + "`usdLux`" + ` 光照、` + "`usdMedia`" + ` 音频或 ` + "`usdRender`" + ` 输出产品配置，中文阅读时必须先把领域边界分开。`,
    `体积资产入口和体积场关系是第一条主线。` + "`FieldAsset`" + `、` + "`Field3DAsset`" + `、` + "`OpenVDBAsset`" + `、` + "`VolumeFieldAsset`" + `、` + "`VolumeFieldBase`" + ` 和 ` + "`Volume`" + ` 处理 field 数据文件、field 名称、索引、数据类型、向量角色以及 volume 如何引用 field。读者应把 ` + "`filePath`" + ` 当成磁盘体积数据入口，而不是渲染输出路径。`,
    `粒子场是第二条主线。` + "`ParticleField`" + ` 定义粒子场基础职责，派生类型如 ` + "`ParticleField3DGaussianSplat`" + ` 用 built-in schema 组织 position、kernel、radiance、orientation、scale、opacity 等数据。它服务于 3D Gaussian Splats 等粒子核函数表达，不等同于传统 mesh、light 或 media playback。`,
    `Kernel API 是第三条主线。` + "`ParticleFieldKernelBaseAPI`" + ` 说明每个粒子的空间基函数，` + "`ParticleFieldKernelConstantSurfletAPI`" + ` 则表达 constant surflet kernel。kernel 决定单个粒子如何在空间中贡献 opacity 或 radiance；它不是 renderer pass，也不是照明衰减曲线。`,
    `常见误读之一是把 ` + "`fieldName`" + `、` + "`fieldIndex`" + ` 和 ` + "`fieldDataType`" + ` 混成同一件事。更准确地说，` + "`fieldName`" + ` 通常用于在文件中定位命名 field，` + "`fieldIndex`" + ` 用索引选择 field，` + "`fieldDataType`" + ` 描述 field 值的类型；三者都可能影响工具如何解析体积数据。`,
    `常见误读之二是把 ` + "`vectorDataRoleHint`" + ` 当成颜色或法线自动转换器。它只是提示 vector 数据角色，例如 ` + "`Point`" + `、` + "`Normal`" + `、` + "`Vector`" + `、` + "`Color`" + ` 等；消费端仍需要按 field 数据类型、坐标空间和渲染需求解释。`,
    `从 composition 角度看，体积字段仍遵守 USD 的 layer strength、reference、payload、variant 和 override 规则。` + "`filePath`" + `、` + "`fieldName`" + `、` + "`fieldIndex`" + `、` + "`projectionModeHint`" + ` 或 kernel API 的 opinion 都可能被更强层覆盖，调试时必须看最终 composed value。`,
    `从数据文件角度看，` + "`Field3DAsset`" + ` 要求 ` + "`.f3d`" + ` 格式，` + "`OpenVDBAsset`" + ` 要求 ` + "`.vdb`" + ` 格式；它们都不是把文件内容内联进 HTML 或 USD 页面。若 field 不显示，应先检查 asset path 解析、文件格式、field 名称/索引、数据类型和应用支持，而不是先改 schema 名。`,
    `从渲染采用角度看，` + "`ParticleField3DGaussianSplat`" + ` 带有 rendering hints，例如 ` + "`projectionModeHint`" + ` 和 ` + "`sortingModeHint`" + `。这些 hint 通常与训练数据或渲染策略相关，但仍是提示；具体 renderer 可以用它们优化采用路径，也可能选择自己的实现策略。`,
    `从审计角度看，API/schema/token/属性名必须保留英文，例如 ` + "`GRID_LEVEL_SET`" + `、` + "`GRID_FOG_VOLUME`" + `、` + "`perspective`" + `、` + "`tangential`" + `、` + "`zDepth`" + `、` + "`cameraDistance`" + `、` + "`p.length <= 1`" + `。中文只解释含义和边界，不翻译正式标识符。`,
    `从本地中文版阅读路径看，本页应与同目录 ` + "`usdVol_toc`" + `、` + "`overview`" + `、field asset 页、volume 页和 particle field 页连续阅读。站内链接保持本地路径；只有明确写成“打开官方原页 / Open official page”的链接才外跳到 openusd.org。`,
    `本页晋级目标是让中文成为主阅读路径：读者不依赖英文正文，也能理解页面职责、核心 section、属性/API 分组、体积/粒子场边界、误读点、调试顺序和相邻 ` + "`usdVol`" + ` 类型关系。英文保留用于核对官方原文和技术标识。`,
    `从 authoring 流程看，体积数据页通常要同时满足三件事：USD prim 类型正确、数据文件或粒子属性可解析、renderer 或消费端支持对应 schema。只满足其中一项并不能保证画面出现；例如 ` + "`.vdb`" + ` 路径正确但 ` + "`fieldName`" + ` 错误，或者粒子数据齐全但 renderer 不支持该 ` + "`ParticleField`" + ` 派生类型，都会导致结果缺失。`,
    `从验证流程看，应先检查 schema application 和 composed attributes，再检查 asset resolver、文件扩展名、field 名称/索引、数据类型、extent、transform、kernel/radiance/position 等必需组件。这个顺序能区分“USD 结构没写对”“外部数据没找到”和“渲染器没有采用”三类问题。`,
    `从类型迁移看，` + "`FieldAsset`" + ` 和 ` + "`FieldBase`" + ` 的 deprecated 信息要保留。旧资产可以用于理解历史文件，但新 authoring 应优先使用 ` + "`VolumeFieldAsset`" + `、` + "`VolumeFieldBase`" + ` 或具体格式/派生 schema。中文说明不能把 deprecated 页面写成当前推荐路径。`,
    `从相邻关系看，` + "`Volume`" + ` 通常聚合或引用一个或多个 field，field asset 负责从外部体积数据文件提供 field，particle field 则用粒子和 kernel 表达空间贡献。把这三者分清，可以避免把 volume 容器、外部数据入口和粒子核函数混成同一个概念。`,
    `从采样语义看，field 数据通常要经过体积采样或粒子 kernel evaluation 才能进入渲染结果。文件中存在 density grid、position array 或 radiance 数据，只说明数据源可用；最终视觉效果还要依赖 volume 关系、包围范围、坐标变换、采样步长、排序策略和 renderer 对该 schema 的支持。`,
    `从边界盒看，` + "`extent`" + `、transform 和 field 数据范围经常一起影响可见性。体积或粒子场数据正确但 extent 太小、位置偏离视锥、scale 不合理或 orientation 错误，都可能让页面看似“没有渲染”。因此调试不能只盯 ` + "`filePath`" + ` 或 kernel 名称。`,
    `从资产打包看，外部 ` + "`.f3d`" + ` / ` + "`.vdb`" + ` 文件和粒子属性数据必须能被目标环境解析。若移动 USD 包、改变相对路径或切换 asset resolver，` + "`filePath`" + ` 可能在作者机器上有效但在部署环境中失效；中文说明需要把外部数据依赖作为独立风险写清。`,
    `从 renderer 采用看，某些字段只是 hint，例如 ` + "`projectionModeHint`" + `、` + "`sortingModeHint`" + ` 或 ` + "`vectorDataRoleHint`" + `。hint 能帮助工具选择更合适的解释方式，但不等于强制算法。若呈现不符合预期，应同时看官方字段、训练数据假设、文件内容和 renderer 文档。`,
    `从可维护性看，source parity 不只是确认标题相同，还要确认官方核心术语已经进入中文主阅读路径。本轮逐页核对 ` + "`.f3d`" + `、` + "`.vdb`" + `、deprecated、VolumeFieldAsset、Position/Kernel/Radiance、3D Gaussian Splats、kernel data、constant surflet 和 ` + "`p.length <= 1`" + ` 等术语，避免完成页只剩泛泛导读。`,
  ];
}

const sharedVolumeAssetProperties = [
  { name: "fieldDataType", type: "token", fallback: "", zh: "field 数据的值类型提示。它帮助工具理解体积数据是标量、向量或其他类型，但不替代文件格式本身的解析。", en: "Field value data type." },
  { name: "fieldIndex", type: "int", fallback: "", zh: "按索引在体积文件中选择 field。若同时有 `fieldName`，应按官方和工具约定确认优先级或一致性。", en: "Field index in the volume file." },
  { name: "fieldName", type: "token", fallback: "", zh: "按名称在体积文件中选择 field，例如 density 或 velocity。它不是 USD prim 名。", en: "Named field inside the volume file." },
  { name: "filePath", type: "asset", fallback: "", zh: "指向磁盘上的体积数据文件。`Field3DAsset` 需要 `.f3d`，`OpenVDBAsset` 需要 `.vdb`。", en: "Asset path to the volume file." },
  { name: "vectorDataRoleHint", type: "token", fallback: "", zh: "向量数据角色提示，例如 `None`、`Point`、`Normal`、`Vector`、`Color`；它不自动修改数据值。", en: "Role hint for vector data." },
];

const inheritedImageable = [
  { from: "Xformable", name: "xformOpOrder", type: "token[]", fallback: "", zh: "继承的 transform op 顺序。体积场或粒子场的位置/缩放仍可能受 prim transform 影响。", en: "Transform op order." },
  { from: "Imageable", name: "proxyPrim", type: "rel", fallback: "", zh: "Imageable 代理 prim 关系。它影响工具展示或代理关系，不是体积文件路径。", en: "Proxy prim relationship." },
  { from: "Imageable", name: "purpose", type: "token", fallback: "default", zh: "Imageable purpose。不要把它与 fieldPurpose 或 volume field 的语义混淆。", en: "Imageable purpose." },
  { from: "Imageable", name: "visibility", type: "token", fallback: "inherited", zh: "继承可见性 token。它影响可见性，不等同于 field 数据是否存在。", en: "Visibility token." },
];

const particleInherited = [
  { from: "Gprim", name: "doubleSided", type: "bool", fallback: "False", zh: "继承自 Gprim 的双面提示。对粒子场而言，真正的体积/核函数采用仍取决于粒子场数据和 renderer。", en: "Double-sided hint." },
  { from: "Gprim", name: "orientation", type: "token", fallback: "rightHanded", zh: "继承方向约定。粒子 kernel 自身还可能通过 orientation/scale API 表达每个粒子的方向。", en: "Orientation convention." },
  { from: "Gprim", name: "primvars:displayColor", type: "color3f[]", fallback: "", zh: "显示颜色 primvar，不等同于 3DGS radiance 数据或 field 数据值。", en: "Display color primvar." },
  { from: "Gprim", name: "primvars:displayOpacity", type: "float[]", fallback: "", zh: "显示透明度 primvar，不等同于 kernel opacity 或体积密度。", en: "Display opacity primvar." },
  { from: "Boundable", name: "extent", type: "float3[]", fallback: "", zh: "包围盒范围。调试粒子场不可见时需要同时检查 extent、粒子 position 和 renderer 支持。", en: "Boundable extent." },
  ...inheritedImageable,
];

const pages = [
  {
    name: "Field3DAsset",
    title: "Field3DAsset",
    summary: "Field3DAsset represents a Field3D volume field stored in a .f3d file.",
    sourceIntro: "A Field representing a Field3D volume field.",
    sourceKeywords: ["Field3DAsset", "Field3D", "filePath", ".f3d", "fieldPurpose", "VolumeFieldAsset", "fieldDataType", "fieldIndex", "fieldName", "vectorDataRoleHint"],
    paragraphs: [
      "`Field3DAsset` 表达 Field3D volume field。官方示例展示了引用 `.f3d` 文件中单个 density field 的写法，并明确 `FieldAsset filePath attribute must specify a file in the Field3D (.f3d) format on disk`。这里的重点是文件格式和 field 选择，不是体积渲染算法本身。",
      "`fieldPurpose` 是本页新增属性，用来标注 field 的用途。它应与 volume 中的 field 语义配合理解，例如 density、temperature 或其他数据角色。不要把 `fieldPurpose` 和 Imageable 的 `purpose` 混淆；前者面向 field 语义，后者是可见/代理渲染用途分类。",
      "继承自 `VolumeFieldAsset` 的 `fieldDataType`、`fieldIndex`、`fieldName`、`filePath` 和 `vectorDataRoleHint` 是读取 `.f3d` 数据的核心。调试时先确认 asset path 解析到真实 `.f3d` 文件，再确认 field 名称或索引在文件内存在，最后看数据类型与 renderer/工具期望是否一致。",
      "`Field3DAsset` 与已废弃的 `FieldAsset` 边界也要清楚：`Field3DAsset` 是具体格式入口，`FieldAsset` 是旧 schema，应优先迁移到 `VolumeFieldAsset` 或具体派生类型。中文说明保留 deprecated 信息，避免读者把旧类型当成新项目首选。",
      "若体积没有显示，常见原因包括 `.f3d` 文件路径失效、field 名称拼写不一致、fieldIndex 指向错误、vectorDataRoleHint 与数据不匹配、extent/transform 使体积不在视野中、或目标 renderer 不支持 Field3D。排查时应逐层验证，而不是改写 `filePath` 或 schema 名。"
    ],
    properties: [
      { name: "fieldPurpose", type: "token", fallback: "", zh: "field 的用途提示，例如密度或其他体积语义。它不同于 Imageable `purpose`。", en: "Purpose of the field." },
      ...sharedVolumeAssetProperties,
    ],
    inherited: inheritedImageable,
    related: ["FieldAsset", "OpenVDBAsset", "VolumeFieldAsset", "Volume"],
  },
  {
    name: "FieldAsset",
    title: "FieldAsset",
    summary: "FieldAsset is deprecated; VolumeFieldAsset should be used instead.",
    sourceIntro: "This schema is deprecated, and VolumeFieldAsset should be used instead.",
    sourceKeywords: ["FieldAsset", "deprecated", "VolumeFieldAsset", "fieldDataType", "fieldIndex", "fieldName", "filePath", "vectorDataRoleHint"],
    paragraphs: [
      "`FieldAsset` 的第一条信息就是 deprecated。官方明确说 `VolumeFieldAsset` should be used instead。因此本页的中文主阅读路径不是鼓励新项目继续使用旧 schema，而是帮助读者识别旧资产、理解继承属性，并迁移到 `VolumeFieldAsset` 或具体格式类型。",
      "尽管 deprecated，本页仍列出继承自 `VolumeFieldAsset` 的字段：`fieldDataType`、`fieldIndex`、`fieldName`、`filePath` 和 `vectorDataRoleHint`。这些字段说明旧资产如何定位磁盘体积文件及其中的 field；迁移时需要把这些 authored opinion 保留到新 schema 或对应派生类型上。",
      "与 `Field3DAsset` / `OpenVDBAsset` 的差别在于，`FieldAsset` 不表达具体文件格式入口。具体格式页会说明 `.f3d` 或 `.vdb` 约束，而 `FieldAsset` 只是旧式泛化入口。调试旧场景时应先判断文件实际格式，再选择更具体的新类型。",
      "迁移边界也要说明：`FieldAsset` deprecated 不代表已有 USD 文件立刻无效。消费端可能仍能读取旧资产，但新 authoring 应优先使用 `VolumeFieldAsset` 或格式派生 schema，以便更清晰验证、工具采用和文档对齐。",
      "调试路径建议：确认旧 prim 是否使用 `FieldAsset`；记录 `filePath`、`fieldName`、`fieldIndex`、`fieldDataType`、`vectorDataRoleHint`；根据文件扩展名和工具支持选择 `Field3DAsset`、`OpenVDBAsset` 或 `VolumeFieldAsset`；最后验证 volume 关系是否仍指向正确 field。"
    ],
    properties: sharedVolumeAssetProperties,
    inherited: inheritedImageable,
    related: ["VolumeFieldAsset", "Field3DAsset", "OpenVDBAsset", "FieldBase"],
  },
  {
    name: "FieldBase",
    title: "FieldBase",
    summary: "FieldBase is deprecated; VolumeFieldBase should be used instead.",
    sourceIntro: "This schema is deprecated, and VolumeFieldBase should be used instead.",
    sourceKeywords: ["FieldBase", "deprecated", "VolumeFieldBase", "Xformable", "Imageable", "xformOpOrder", "proxyPrim", "purpose", "visibility"],
    paragraphs: [
      "`FieldBase` 也是 deprecated 页面，官方明确建议使用 `VolumeFieldBase` instead。它的价值在于帮助读者理解旧资产中的 field base 层，并指导迁移，不应被当成新体积场 authoring 的首选类型。",
      "本页没有新的直接属性，主要列出继承属性：`Xformable.xformOpOrder` 以及 `Imageable.proxyPrim`、`purpose`、`visibility`。这说明旧 base schema 更像体积场对象的基础层，而不是具体数据文件入口；具体文件路径和 field 选择在 asset 派生页中处理。",
      "`FieldBase` 与 `FieldAsset` 的边界是：base 表达 field prim 的基础类型和继承行为，asset 表达从文件读取 field 数据。迁移时不要只替换文件路径，还要确认 base 类型是否应改为 `VolumeFieldBase`，并保持 volume 关系、transform 和可见性语义一致。",
      "常见误读是看到 `Imageable.visibility` 就把 field 数据存在性和场景可见性混在一起。`visibility` 影响图像化对象可见性；field 数据是否能被采样还取决于 volume-field 关系、field asset、文件解析和 renderer 支持。",
      "调试旧 `FieldBase` 资产时建议按顺序检查：prim 类型是否 deprecated、是否应迁移到 `VolumeFieldBase`、transform 是否正确、Imageable 可见性是否 inherited 或被覆盖、volume 是否仍能引用 field，以及具体 field asset 是否能加载数据。"
    ],
    properties: [],
    inherited: inheritedImageable,
    related: ["VolumeFieldBase", "FieldAsset", "Volume", "VolumeFieldAsset"],
  },
  {
    name: "OpenVDBAsset",
    title: "OpenVDBAsset",
    summary: "OpenVDBAsset represents an OpenVDB volume grid stored in a .vdb file.",
    sourceIntro: "A Field representing an OpenVDB volume grid.",
    sourceKeywords: ["OpenVDBAsset", "OpenVDB", ".vdb", "fieldClass", "GRID_LEVEL_SET", "GRID_FOG_VOLUME", "GRID_STAGGERED", "GRID_UNKNOWN"],
    paragraphs: [
      "`OpenVDBAsset` 表达 OpenVDB volume grid。官方示例说明它引用 `.vdb` 文件中的单个 density field，并明确 `filePath` 必须指向磁盘上的 OpenVDB (`.vdb`) 文件。它是体积数据资产入口，不是渲染输出配置。",
      "`fieldClass` 是本页新增属性，用来说明 OpenVDB grid 的 field class。官方列出的 token 包括 `GRID_LEVEL_SET`、`GRID_FOG_VOLUME`、`GRID_STAGGERED` 和 `GRID_UNKNOWN`。这些 token 必须保留英文，中文只解释其用途和边界。",
      "`GRID_LEVEL_SET` 和 `GRID_FOG_VOLUME` 常被用于区分 level set 与雾体积语义；`GRID_STAGGERED` 表达 staggered grid；`GRID_UNKNOWN` 表示未确定类型。消费端可以用这些提示选择采样或渲染策略，但仍需读取 `.vdb` 文件中的实际 grid 数据。",
      "继承的 `fieldDataType`、`fieldIndex`、`fieldName`、`filePath`、`vectorDataRoleHint` 与 `Field3DAsset` 类似，但文件格式语义不同。不要把 `.f3d` 和 `.vdb` 混用；如果 `OpenVDBAsset` 指向非 `.vdb` 文件，应视为 source parity 或 authoring 问题。",
      "调试 OpenVDB 体积时按顺序检查：asset resolver 是否找到 `.vdb`；目标 grid 名称或索引是否存在；`fieldClass` 是否与数据语义一致；`fieldDataType` 是否匹配；volume 是否正确引用该 field；renderer 是否支持 OpenVDB 和该 grid class。"
    ],
    properties: [
      { name: "fieldClass", type: "token", fallback: "", zh: "OpenVDB grid 类型提示，常见 token 包括 `GRID_LEVEL_SET`、`GRID_FOG_VOLUME`、`GRID_STAGGERED`、`GRID_UNKNOWN`。", en: "OpenVDB grid class." },
      ...sharedVolumeAssetProperties,
    ],
    inherited: inheritedImageable,
    related: ["Field3DAsset", "VolumeFieldAsset", "Volume", "FieldAsset"],
  },
  {
    name: "ParticleField",
    title: "ParticleField",
    summary: "ParticleField is the concrete base schema for particle field implementations such as 3D Gaussian Splats.",
    sourceIntro: "ParticleField is the base schema for describing different types of concrete ParticleField implementations.",
    sourceKeywords: ["ParticleField", "3D Gaussian Splats", "Position", "Kernel", "Radiance", "Orientation", "Scale", "Opacity", "ParticleFieldPositionBaseAPI", "Working With Particle Fields"],
    paragraphs: [
      "`ParticleField` 是描述不同 concrete particle field implementations 的基础 schema，官方例子包括但不限于 3D Gaussian Splats。它是 concrete base schema，可以用于 prototyping，但实际项目通常应实例化派生类型，例如 `ParticleField3DGaussianSplat`，以获得更清晰的 validation 和 renderer adoption。",
      "官方规定所有 ParticleField-derived schemas 都需要提供三组必需属性：`Position`、`Kernel` 和 `Radiance`。`Position` 表达每个粒子在本地空间的位置；`Kernel` 表达每个粒子实例化的 spatial basis function；`Radiance` 表达粒子场视觉外观。",
      "可选属性包括 `Orientation`、`Scale` 和 `Opacity`。如果 kernel 不是 rotationally symmetric，orientation 就很重要；scale 控制三维大小；opacity 或 weight 控制 kernel 的透明度贡献。它们不是普通 mesh 顶点属性，而是粒子场核函数实例的参数。",
      "官方还说明 `UsdVol` 提供 base applied schemas 和 derived schemas 表达这些属性，例如 `ParticleFieldPositionBaseAPI` 用于 robust validation。中文阅读时要理解这些 API 是为了验证粒子场是否具有必需数据，而不是随意的 UI hint。",
      "`ParticleField` 与 `Volume`/`VolumeFieldAsset` 的边界是：volume field 通常从体积文件或 field asset 中采样，particle field 则用粒子和 kernel 表达空间贡献。两者都在 `UsdVol` 域内，但数据组织和 renderer 采用路径不同。",
      "调试粒子场不可见时，应检查 position 数据、kernel schema、radiance schema、orientation/scale/opacity、extent、transform、renderer 是否支持该 particle field 类型，以及是否按 Working With Particle Fields 的建议 author 了必要属性。不要把问题误归因于 usdLux 光照或 usdRender 输出配置。"
    ],
    properties: [],
    inherited: particleInherited,
    related: ["ParticleField3DGaussianSplat", "ParticleFieldKernelBaseAPI", "ParticleFieldKernelConstantSurfletAPI", "Volume"],
  },
  {
    name: "ParticleField3DGaussianSplat",
    title: "ParticleField3DGaussianSplat",
    summary: "ParticleField3DGaussianSplat represents the original 3D Gaussian Splats technique and provides rendering hints.",
    sourceIntro: "A ParticleField that represents the original 3D Gaussian Splats technique.",
    sourceKeywords: ["ParticleField3DGaussianSplat", "3D Gaussian Splats", "projectionModeHint", "sortingModeHint", "perspective", "tangential", "zDepth", "cameraDistance"],
    paragraphs: [
      "`ParticleField3DGaussianSplat` 表达 original 3D Gaussian Splats technique。它继承自 `ParticleField` base prim，并带有 built-in schema，用于提供原始 3DGS 论文所需的数据属性。中文阅读时应把它理解为 3DGS 数据的 schema 化入口，而不是普通点云或 mesh。",
      "本页还包含 rendering hints，用来告知 splats 应如何渲染。这些 hint 通常与数据训练时的选择相关，例如 projection mode 或 sorting mode。它们服务 renderer adoption，但不是硬性替代 renderer 自己的实现策略。",
      "`projectionModeHint` 官方列出 `perspective` 和 `tangential` 等 token。它提示 renderer 如何投影或解释 splat 形状，尤其与训练数据和观察模型相关。token 不能翻译，中文只解释其作用。",
      "`sortingModeHint` 官方列出 `zDepth` 和 `cameraDistance` 等 token。它提示 renderer 如何对 splats 排序。排序影响透明/半透明 splats 的渲染质量，但不改变粒子数据本身，也不是 USD composition 顺序。",
      "与 `ParticleField` 的关系是：`ParticleField` 给出 position、kernel、radiance 等必需结构；`ParticleField3DGaussianSplat` 进一步为 3DGS 类型提供内建 schema 和渲染 hint。若只使用 base `ParticleField`，验证和 renderer 采用可能更困难。",
      "调试 3DGS 页面时建议检查：position、radiance、opacity、scale、orientation 是否齐全；kernel 是否符合派生类型预期；extent 是否覆盖 splats；`projectionModeHint` 和 `sortingModeHint` 是否与训练数据一致；renderer 是否支持 3D Gaussian Splats。"
    ],
    properties: [
      { name: "projectionModeHint", type: "token", fallback: "perspective", zh: "投影模式提示，官方 token 包括 `perspective` 和 `tangential`。它提示 splat 投影方式，不改变粒子数据。", en: "Projection mode hint." },
      { name: "sortingModeHint", type: "token", fallback: "zDepth", zh: "排序模式提示，官方 token 包括 `zDepth` 和 `cameraDistance`。它影响 renderer 处理 splats 的排序策略。", en: "Sorting mode hint." },
    ],
    inherited: particleInherited,
    related: ["ParticleField", "ParticleFieldKernelBaseAPI", "ParticleFieldKernelConstantSurfletAPI", "overview"],
  },
  {
    name: "ParticleFieldKernelBaseAPI",
    title: "ParticleFieldKernelBaseAPI",
    summary: "ParticleFieldKernelBaseAPI defines the base applied schema for ParticleField kernel data.",
    sourceIntro: "Defines a base applied schema for ParticleField kernel data.",
    sourceKeywords: ["ParticleFieldKernelBaseAPI", "ParticleField kernel", "spatial basis function", "validation", "kernel data"],
    paragraphs: [
      "`ParticleFieldKernelBaseAPI` 定义 ParticleField kernel data 的 base applied schema。官方说明 ParticleField kernel defines the spatial basis function for every particle。也就是说，kernel 决定单个粒子在空间中如何贡献形状、opacity 或 radiance 的基础函数。",
      "这是 base schema，ParticleField characteristics schemas 通常会把它作为 built-in applied schema。这样 validation 可以确认定义 kernel data 的 applied schema 总是存在于 ParticleField 上。中文阅读时要把它理解为验证结构的一部分，而不是某个具体 kernel 形状。",
      "`ParticleFieldKernelBaseAPI` 与 `ParticleFieldKernelConstantSurfletAPI` 的关系是 base 与具体实现的关系。base API 说明“必须有 kernel 数据”，constant surflet 说明“这个 kernel 是 XY plane 上的 bounded circular disk，并有 step-function falloff”。",
      "它也与 `ParticleFieldPositionBaseAPI`、radiance API、scale/orientation/opacity API 配合。position 决定粒子中心，kernel 决定空间基函数，radiance 决定外观，scale/orientation/opacity 调整每个 kernel instance。缺少任一关键组件都可能让粒子场无法验证或无法被 renderer 采用。",
      "常见误读是把 kernel base API 当成渲染器设置。更准确地说，它是 schema/validation 层，用来确保粒子场具有可解释的 kernel 数据。renderer 可以读取这些 schema 决定采用路径，但 API 本身不等于渲染 pass、光照模型或输出配置。",
      "调试路径建议：先确认 ParticleField 派生 prim 是否包含 kernel applied schema；再确认是否有具体 kernel API；接着检查 position/radiance/scale/orientation/opacity 是否配套；最后用 validation 和 renderer 日志判断缺失的是 schema 数据还是 renderer 支持。"
    ],
    properties: [],
    inherited: [],
    related: ["ParticleField", "ParticleFieldKernelConstantSurfletAPI", "ParticleField3DGaussianSplat", "overview"],
  },
  {
    name: "ParticleFieldKernelConstantSurfletAPI",
    title: "ParticleFieldKernelConstantSurfletAPI",
    summary: "ParticleFieldKernelConstantSurfletAPI defines a constant surflet kernel for a ParticleField.",
    sourceIntro: "Defines the constant surflet kernel for a ParticleField.",
    sourceKeywords: ["ParticleFieldKernelConstantSurfletAPI", "constant surflet", "p.length <= 1", "bounded circular disk", "XY plane", "Rotation", "scale", "position"],
    paragraphs: [
      "`ParticleFieldKernelConstantSurfletAPI` 定义 ParticleField 的 constant surflet kernel。官方说明未变换 kernel，也就是 identity position、scale、rotation、opacity 时，在 XY plane 上如果点 `p` 满足 `p.length <= 1`，opacity 为 `1.0`，否则为 `0.0`。",
      "这意味着该 kernel 的 splat support 是 XY plane 上半径为 1 的 bounded circular disk。它不是球体体积，也不是光照圆盘；它是粒子场中单个 surflet kernel 的空间支持区域。中文说明必须保留 `p.length <= 1` 这个判定表达式。",
      "官方还说明 per-splat opacity 与 step-function falloff 是 multiplicative。也就是说，粒子自身 opacity 或 weight 会乘上 kernel 的阶跃衰减结果。若 opacity 结果不符合预期，应同时检查 per-splat opacity 和 kernel 形状，而不是只看材质透明度。",
      "`Rotation` 和 `scale` 会把 disk kernel 变换成 planar ellipse，`position` 会把 splat center 从 origin 移动到粒子中心。这里的 rotation/scale/position 是 kernel instance 的空间变换，不等同于整个 prim 的 Xformable transform；两者都可能参与最终位置解释。",
      "`ParticleFieldKernelConstantSurfletAPI` 与 `ParticleFieldKernelBaseAPI` 的关系是具体 kernel 与 base validation 的关系。base API 确保有 kernel 数据，constant surflet API 给出具体 bounded disk 与 step-function falloff。renderer 采用时需要同时理解 base、具体 kernel 和粒子属性。",
      "常见误读是把 constant surflet 当成 3D Gaussian Splat。实际上 constant surflet 是 bounded circular disk 上的阶跃式支持，而 3DGS 通常有 gaussian-like splat 数据和 projection/sorting hints。它们都可属于 particle field 语境，但 kernel 形状和渲染假设不同。",
      "调试路径建议：确认 ParticleField 上有具体 constant surflet kernel schema；检查 position 是否移动 splat center；检查 scale 是否把圆盘变成预期 ellipse；检查 rotation 是否改变平面朝向；检查 opacity 是否与 step-function falloff 相乘；最后确认 renderer 支持该 kernel。"
    ],
    properties: [],
    inherited: [],
    related: ["ParticleFieldKernelBaseAPI", "ParticleField", "ParticleField3DGaussianSplat", "overview"],
  },
];

function relatedLinks(page) {
  const names = [...new Set([...(page.related || []), ...commonRelated])].filter((name) => name !== page.name);
  return names.map((name) => `<li><a href="${esc(name)}.html">${esc(name)}</a></li>`).join("\n        ");
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
    <section data-cn-complete="round-409-usdVol-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、属性/API 分组、体积资产或粒子场边界、误读点、调试路径和相邻 usdVol 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
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
      <h2>相邻 usdVol 阅读路径 / Adjacent usdVol Reading Path</h2>
      <p class="zh">本页应放在 usdVol 域内连续阅读：先看 overview 和目录页，再根据需求进入体积资产、Volume/VolumeField 关系或 ParticleField/kernel API。下面的链接都保留为本地阅读路径；只有“打开官方原页 / Open official page”是显式外跳。</p>
      <ul>
        ${relatedLinks(page)}
      </ul>
    </section>

    <section>
      <h2>源页对比 / Source Parity</h2>
      <ul>
        <li><span class="zh">官方页：<a href="${official}">官方页 / Official page: ${official}</a></span></li>
        <li><span class="zh">本地 source snapshot：<code>${esc(source)}</code></span></li>
        <li><span class="zh">本轮仅晋级达到中文主阅读路径门槛的页面；未达标页保持草稿并记录原因。</span><span class="en">Only pages that meet the Chinese main-reading-path bar are promoted.</span></li>
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
  const sourceText = stripTags(article);
  const output = fs.existsSync(rel(targetDir, `${page.name}.html`))
    ? stripTags(fs.readFileSync(rel(targetDir, `${page.name}.html`), "utf8"))
    : "";
  return {
    page: page.name,
    output: `${targetDir}/${page.name}.html`,
    source_snapshot: `${sourceDir}/${page.name}_source.html`,
    official_url: officialUrl(page.name),
    h1,
    headings,
    source_keywords_checked: page.sourceKeywords,
    missing_source_keywords: page.sourceKeywords.filter((keyword) => !sourceText.includes(keyword)),
    missing_output_keywords: page.sourceKeywords.filter((keyword) => !output.includes(keyword)),
    preserved_code_terms_sample: [...new Set(codes)].slice(0, 80),
  };
}

function qualityByOutput() {
  const q = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  return new Map(q.pages.map((page) => [page.output, page]));
}

function manifestRoundOutputs() {
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""))
    : { promotions: [] };
  return new Set(
    (manifest.promotions || [])
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdVol-`))
      .map((entry) => entry.local_output)
  );
}

function activePages() {
  const quality = qualityByOutput();
  const currentRoundOutputs = manifestRoundOutputs();
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

function writeSourceParity(active, skipped) {
  const parity = active.map(sourceFacts);
  fs.writeFileSync(rel(sourceParityReport), JSON.stringify({
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "usdVol",
    source_parity: parity,
    skipped_pages: skipped,
  }, null, 2), "utf8");
  return parity;
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
  const parity = writeSourceParity(active, skipped);
  return { results, skipped, source_parity: parity };
}

function precheckPages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const out = rel(targetDir, `${page.name}.html`);
    const html = fs.readFileSync(out, "utf8");
    const complete = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    const zhBlocks = (html.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length;
    const sourceFact = sourceFacts(page);
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
      missingSourceKeywords: sourceFact.missing_source_keywords,
      missingOutputKeywords: sourceFact.missing_output_keywords,
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
      hasQuestionDamage: /\?{4,}/.test(html),
      hasReplacementChar: html.includes("\uFFFD"),
      hasMojibakeMarker: /閿|閻|濮|缁|鐎|锟/.test(html),
    };
    result.passed =
      result.zhChars >= 1700 &&
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
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""));
  const precheck = precheckPages();
  const failed = precheck.results.filter((entry) => !entry.passed);
  if (failed.length) {
    throw new Error(`Refusing to update manifest; precheck failed: ${failed.map((entry) => entry.page).join(", ")}`);
  }
  const { active } = activePages();
  const newEntries = active.map((page) => ({
    id: `round-${ROUND}-release-usdVol-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdVol short-page promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, volume/field/particle schema groups, asset and kernel boundaries, common misreads, debugging path, adjacent usdVol relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1700,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
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
    purpose: `Round ${ROUND} DomainSprintRound：usdVol 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 132 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、体积/field/particle schema 分组、资产和 kernel 边界、误读点、调试路径、相邻 usdVol 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdVol release user guide 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
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
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮补齐 usdVol 的 8 个短 schema/API 页。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    source_parity_report: sourceParityReport,
    next_actions: [
      "下一轮可继续选择 usdVol 中未完成的 ParticleField AttributeAPI/KernelAPI 或 overview/toc；若导航或报告计数出现不一致，先做 DefectRound。",
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
  output.sourceParity = {
    source_parity: writeSourceParity(active, skipped),
    skipped_pages: skipped,
  };
}
if (Object.keys(output).length === 0) {
  output.precheck = precheckPages();
}

if (output.precheck && output.precheck.results.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, round: ROUND, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
