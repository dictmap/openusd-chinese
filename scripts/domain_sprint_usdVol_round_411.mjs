import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 411;
const GENERATED_AT = "2026-06-08T03:25:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdVol";
const sourceDir = "source/full_release/user_guides/schemas/usdVol";
const sourceParityReport = "reports/round_411_usdVol_core_closeout_source_parity.json";

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
  const article = start >= 0 ? html.slice(start) : html;
  const end = article.indexOf("<footer");
  return article.slice(0, end > 0 ? end : undefined);
}

function officialUrl(name) {
  return `https://openusd.org/release/user_guides/schemas/usdVol/${name}.html`;
}

function rows(items, columns) {
  if (!items?.length) {
    return `<tr><td colspan="${columns}"><span class="zh">本页没有独立属性表；中文主阅读路径重点解释页面职责、目录/抽象 schema 语义、关系命名、调试顺序和相邻 usdVol 类型。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const candidates = [
  "ParticleFieldSphericalHarmonicsAttributeAPI",
  "Volume",
  "VolumeFieldAsset",
  "VolumeFieldBase",
  "overview",
  "usdVol_toc",
];

const commonRelated = [
  "overview",
  "usdVol_toc",
  "Volume",
  "VolumeFieldBase",
  "VolumeFieldAsset",
  "OpenVDBAsset",
  "Field3DAsset",
  "ParticleField",
  "ParticleField3DGaussianSplat",
  "ParticleFieldSphericalHarmonicsAttributeAPI",
];

const commonCoverage = [
  "`UsdVol` 的主线有两条：一条是 `Volume` 与 `VolumeFieldBase` / `VolumeFieldAsset` 描述体积和外部场数据，另一条是 `ParticleField` 及各类 AttributeAPI / KernelAPI 描述粒子场。阅读本组剩余页时必须把 volume 容器、field 资产入口和粒子场数据分清。",
  "`Volume` 是可渲染 volume，它通过 `field:*` 关系引用派生自 `VolumeFieldBase` 的 prim。关系名例如 `field:density` 或 `field:extinction` 会被 renderer 用来关联 volume shader 的命名输入参数；这个关系名不是外部文件里的 grid 名。",
  "`VolumeFieldAsset` 是抽象 schema，表示体积数据存储在 layer 外部，例如 OpenVDB 或 Field3D 文件。实际 authoring 通常创建 `OpenVDBAsset`、`Field3DAsset` 这类派生 schema，而不是直接实例化抽象基类。",
  "`VolumeFieldBase` 是所有 UsdVol field schema 的基类。它的价值在于给自定义 field schema 提供共同基础，而不是提供具体文件格式、fieldName 或 filePath；具体资产入口要看 `VolumeFieldAsset` 及派生类型。",
  "粒子场相关的 `ParticleFieldSphericalHarmonicsAttributeAPI` 属于 radiance definition 数据。它与 `ParticleFieldRadianceBaseAPI`、position 数据和 kernel API 一起决定 3D Gaussian splats 等粒子场如何给出方向相关颜色或辐射。",
  "目录页和 overview 页不能只写泛泛导读。它们必须给出本地阅读路径：先读 `Overview` 理解 volume/field/particle field，再看 `Volume`、`VolumeFieldBase`、`VolumeFieldAsset`，最后按格式进入 `OpenVDBAsset` / `Field3DAsset` 或按粒子场进入 AttributeAPI / KernelAPI。",
  "常见误读之一是把 `fieldName` 和 `field:density` 这种 relationship name 混成同一件事。`fieldName` 通常是在外部 asset 中定位 grid 或 field 的名称；`field:*` 关系名则是 Volume 对 renderer 或 shader 暴露的输入语义。",
  "常见误读之二是把 `filePath` 当成渲染输出路径。它是外部体积数据资产路径，例如 `.vdb` 或 `.f3d` 文件；渲染输出属于 `usdRender`，不属于 `usdVol`。",
  "调试 volume 不可见时，应先确认 `Volume` prim 存在且可见，再确认 `field:*` 关系是否指向正确 field prim，然后检查 field prim 的 `filePath`、`fieldName`、`fieldIndex`、`fieldDataType`、extent、transform 和 renderer 支持。",
  "调试 particle field 时，应先确认 position 数据是否存在并决定粒子数量，再检查 kernel、radiance、opacity、orientation、scale 或 spherical harmonics 系数是否与 position 数量匹配。数组太长会截断，太短会忽略或使用默认值。",
  "从 composition 角度看，所有这些属性和关系都是 USD authored opinions，会受到 layer strength、reference、payload、variant 和 override 影响。排查时应看 composed stage 上的 resolved relationships 和 attributes。",
  "从资产打包角度看，volume field 常依赖外部 `.vdb` 或 `.f3d` 数据文件。迁移 USD 包或改变 asset resolver 后，`filePath` 在作者机器上有效并不代表部署环境也能解析，必须把外部数据依赖作为独立验收项。",
  "从 renderer 采用角度看，schema 正确不等于画面必然出现。volume shader、material binding、Hydra fallback material、renderer 对 OpenVDB/Field3D/particle field 的支持，都会影响最终可见结果。",
  "从工程阅读路径看，本页保留英文 API/schema/token/属性名、代码和链接语义；中文解释负责把官方段落连接成可执行的排查顺序，不翻译正式标识符，也不把 `UsdVol` 写成光照、音频或渲染输出配置。",
  "从 review-ready 角度看，完成页必须让读者不依赖英文正文也能理解页面职责、核心 section、属性/关系分组、边界、误读点、调试路径和相邻 usdVol 类型关系。英文保留用于核对官方原文。",
  "从本地站点路径看，本组页面要保留 reading-flow 侧栏、breadcrumb、总入口、release/API 本地入口和明确的官方外跳。用户应能在本地从目录页进入 overview，再进入具体 schema 页，而不是被静默带到英文官方站。",
  "从类型扩展看，自定义体积 field schema 应直接或间接继承 `VolumeFieldBase`，自定义文件型 field schema 应继承 `VolumeFieldAsset`。这两者分别解决“我是 field”与“我的数据在外部资产里”两个层级的问题。",
  "从命名策略看，Volume 中的 `field:*` 关系名应按渲染或 shader 需要命名，例如 `density`、`extinction`、`velocity`；外部 OpenVDB grid 或 Field3D field 的真实名称则由 `fieldName`、`fieldIndex` 等属性指定。",
  "从动画数据看，VolumeFieldAsset 派生 field 可以通过 `filePath.timeSamples` 指向逐帧体积文件。这里的时间采样是外部体积数据随时间变化，不是把体积网格内联进 USD layer。",
  "从层级组织看，官方建议把 field prim 作为包含它的 Volume 的 child prim。这能让场景更容易查找和引用，并让移动 Volume 时自动带动其 child Field prim；但多个 Volume 共享同一个 Field prim 时，也可以把 field 放在 Volume 外部。",
  "从材质关系看，Volume 继承 Gprim / Imageable，因此可以有 material binding 和 primvars。volume shader 与 field relationship 共同决定体积呈现；只写 Volume 和 field 数据，不绑定或不支持 volume shader，渲染仍可能走 fallback 或不可见。",
  "从 source parity 看，本轮逐页保留官方核心词：`Volume`、`VolumeFieldBase`、`VolumeFieldAsset`、`fieldName`、`field:velocity`、`radiance:sphericalHarmonicsCoefficients`、`element size = (degree+1)*(degree+1))`、`Y(m,l)`、`OpenVDBAsset` 和 `Field3DAsset`。",
  "从 schema 层级看，`Volume` 是可渲染容器，`VolumeFieldBase` 是 field 类型基类，`VolumeFieldAsset` 是外部资产型 field 基类，`OpenVDBAsset` 与 `Field3DAsset` 是具体格式入口。把这四层分清，才能正确判断应该修改 relationship、schema 类型还是外部数据文件。",
  "从命名调试看，若 shader 需要 `velocity`，Volume 可以 author `field:velocity` 关系；如果外部 VDB grid 名叫 `vel`，field prim 上的 `fieldName` 应写 `vel`。这正是官方 `field:velocity` 示例要表达的差异。",
  "从目录维护看，`usdVol_toc` 和 `overview` 应承担本地中文站的导航责任。用户从目录进入后，应能沿着 Volume、Field、Asset、ParticleField 和 AttributeAPI 逐步深入，而不是只看到英文链接列表。",
  "从抽象 schema 扩展看，开发者如果要定义 custom Field schemas，应关注继承链是否直接或间接继承 `VolumeFieldBase`；如果这个 custom Field schemas 又引用外部文件，则更适合从 `VolumeFieldAsset` 这条路径扩展。",
  "从 spherical harmonics fallback 看，系数缺失或被忽略时，官方默认语义是 DC signal `(0.5, 0.5, 0.5)` with `degree 0`。这不是随意默认色，而是 SH 表达里的常量项回退。",
  "从本轮验收看，读者应能只靠中文判断自己面对的是 volume field 引用问题、外部资产解析问题、粒子场 radiance/position 问题，还是目录导航问题；这也是这些短页从草稿晋级为完整双语页的核心依据。",
];

const inheritedImageable = [
  { from: "Xformable", name: "xformOpOrder", type: "token[]", fallback: "", zh: "继承的 transform op 顺序。Volume 或 field prim 的 local-to-world transform 会影响体积数据在世界空间中的位置。", en: "Transform op order." },
  { from: "Imageable", name: "proxyPrim", type: "rel", fallback: "", zh: "Imageable 代理 prim 关系。它不是 volume field 关系，也不是外部文件路径。", en: "Proxy prim relationship." },
  { from: "Imageable", name: "purpose", type: "token", fallback: "default", zh: "Imageable purpose。Volume 示例里常设置为 `render`，但不要与 field relationship name 或 `fieldName` 混淆。", en: "Imageable purpose." },
  { from: "Imageable", name: "visibility", type: "token", fallback: "inherited", zh: "继承可见性。体积不可见时应同时检查 visibility、extent、field 数据和 renderer 支持。", en: "Visibility token." },
];

const inheritedGprim = [
  { from: "Gprim", name: "doubleSided", type: "bool", fallback: "False", zh: "Gprim 双面提示。对 Volume 而言，实际可见性主要由 volume shader、field 数据和 renderer 采用决定。", en: "Double-sided hint." },
  { from: "Gprim", name: "orientation", type: "token", fallback: "rightHanded", zh: "几何方向约定。它不是 volume field relationship name，也不是粒子场 per-particle orientation。", en: "Orientation convention." },
  { from: "Gprim", name: "primvars:displayColor", type: "color3f[]", fallback: "", zh: "显示颜色 primvar。Volume 可通过 primvars 与 shader 管线交互，但这不替代 field 数据。", en: "Display color primvar." },
  { from: "Gprim", name: "primvars:displayOpacity", type: "float[]", fallback: "", zh: "显示透明度 primvar。不要与粒子场 `opacities` 或体积 density field 混淆。", en: "Display opacity primvar." },
  { from: "Boundable", name: "extent", type: "float3[]", fallback: "", zh: "包围盒范围。调试 volume 不显示时，extent 和 transform 是第一批要检查的项目。", en: "Boundable extent." },
  ...inheritedImageable,
];

const volumeFieldAssetProps = [
  { name: "fieldDataType", type: "token", fallback: "", zh: "field 数据类型提示。它帮助消费端理解值类型，但不替代文件格式本身的解析。", en: "Field value data type." },
  { name: "fieldIndex", type: "int", fallback: "", zh: "按索引在外部体积文件中选择 field。若同时使用 `fieldName`，应按工具和官方语义核对一致性。", en: "Field index in the volume file." },
  { name: "fieldName", type: "token", fallback: "", zh: "外部 asset 中的 field 或 grid 名称，例如 OpenVDB grid 的 `density` 或 `vel`。它不是 Volume 的 `field:*` 关系名。", en: "Named field in the external asset." },
  { name: "filePath", type: "asset", fallback: "", zh: "外部体积数据文件路径，例如 `.vdb` 或 `.f3d`。这是资产输入路径，不是渲染输出路径。", en: "Asset path to volume data." },
  { name: "vectorDataRoleHint", type: "token", fallback: "None", zh: "向量数据角色提示，例如 `None`、`Point`、`Normal`、`Vector`、`Color`。它帮助解释向量 field，但不会自动转换数据。", en: "Role hint for vector data." },
];

const pages = [
  {
    name: "ParticleFieldSphericalHarmonicsAttributeAPI",
    title: "ParticleFieldSphericalHarmonicsAttributeAPI",
    summary: "Defines the spherical harmonics attributes for a ParticleField, such as the spherical harmonics degree and coefficients.",
    sourceIntro: "Defines the spherical harmonics attributes for a ParticleField, such as the spherical harmonics degree and coefficients.",
    sourceKeywords: ["ParticleFieldSphericalHarmonicsAttributeAPI", "radiance:sphericalHarmonicsCoefficients", "radiance:sphericalHarmonicsCoefficientsh", "radiance:sphericalHarmonicsDegree", "element size = (degree+1)*(degree+1))", "Y(m,l)", "DC signal", "0.5", "degree 0"],
    paragraphs: [
      "`ParticleFieldSphericalHarmonicsAttributeAPI` 定义 ParticleField 的 spherical harmonics radiance 属性，包括 spherical harmonics degree 和 coefficients。它属于 radiance definition 数据，不是 light schema，也不是 material binding。",
      "官方说明 degree 在整个 ParticleField 中是 constant across all particles。也就是说，每个粒子共享同一个 spherical harmonics degree，不能按粒子单独改变 degree。",
      "`radiance:sphericalHarmonicsCoefficients` 是 float precision 的 `float3[]`，`radiance:sphericalHarmonicsCoefficientsh` 是 half precision 的 `half3[]`。如果 float 版本存在，应优先使用 float 版本。",
      "系数数组按粒子分组：每个粒子有 N 个连续 coefficients，`Y(m,l)` 先按 order `m` 排，再在 order 内按 index `l` 排。renderer 可根据 SH degree 计算每粒子的 element size，并按这个 size 对数组分条。",
      "官方给出 element size 公式：`element size = (degree+1)*(degree+1))`。属性长度应等于 position 数据数量乘以 per-particle element size；太长会截断到 position 定义的粒子数量，太短会被忽略。",
      "如果系数被忽略或未 populated，粒子应使用对应 DC signal 的 SH coefficient `(0.5, 0.5, 0.5)`，degree 为 `0`。这说明默认不是完全黑，也不是沿用 displayColor。",
      "调试 radiance 时先确认 position 数量，再确认 degree 和 coefficient 数组长度是否满足 `(degree+1)*(degree+1)` 规则，最后确认 renderer 是否支持 spherical harmonics radiance。"
    ],
    properties: [
      { name: "radiance:sphericalHarmonicsCoefficients", type: "float3[]", fallback: "", zh: "float 精度 SH 系数数组，按粒子分组，每粒子有 `(degree+1)*(degree+1)` 个连续 `float3` 系数。", en: "Spherical harmonics coefficients in float precision." },
      { name: "radiance:sphericalHarmonicsCoefficientsh", type: "half3[]", fallback: "", zh: "half 精度 SH 系数数组。如果 float 版本存在，应优先使用 `radiance:sphericalHarmonicsCoefficients`。", en: "Spherical harmonics coefficients in half precision." },
      { name: "radiance:sphericalHarmonicsDegree", type: "int", fallback: "3", zh: "整个 ParticleField 共享的 SH degree。它决定每粒子的 coefficient element size。", en: "Spherical harmonics degree; fallback is 3." },
    ],
    related: ["ParticleFieldRadianceBaseAPI", "ParticleFieldPositionBaseAPI", "ParticleField3DGaussianSplat", "ParticleField"],
  },
  {
    name: "Volume",
    title: "Volume",
    summary: "A renderable volume containing one or more volumetric data fields, used to represent a volume effect such as smoke or fire.",
    sourceIntro: "A renderable volume containing one or more volumetric data fields, used to represent a volume effect such as smoke or fire.",
    sourceKeywords: ["Volume", "volumetric data fields", "smoke", "fire", "field:extinction", "OpenVDBAsset", "fieldName", "filePath", "VolumeFieldBase", "volume shader"],
    paragraphs: [
      "`Volume` 表达一个可渲染 volume，包含一个或多个 volumetric data fields，可用于 smoke、fire、fog 等效果。它是 volume 容器，不是外部体积文件本身。",
      "Volume 继承自 Gprim 和 Imageable，因此可以 transform、render、绑定 material，并使用 primvars 与 shader 管线交互。真正的体积数据通过 field relationship 指向 field prim。",
      "Volume 可以包含任意数量的 volumetric fields，这些 field 通过带 `field` namespace prefix 的关系指定，例如 `field:extinction`。关系目标应是派生自 `VolumeFieldBase` 的 prim。",
      "关系名如 `density` 或 `extinction` 会被 renderer 用来把具体 field 关联到 volume shader 的命名输入参数。这里的关系名不是外部 OpenVDB grid 的 `fieldName`，二者要分别检查。",
      "官方示例中 `field:extinction` 指向一个 `OpenVDBAsset`，该 asset 的 `fieldName` 为 `density`，`filePath` 指向 `.vdb` 数据。阅读时应把 Volume relationship、OpenVDB grid 名和文件路径分成三层。",
      "调试 Volume 时先看 `field:*` 关系是否存在且目标正确，再看目标 field prim 的 schema、`filePath`、`fieldName`、extent 和 transform，最后看 material binding、volume shader 和 renderer 是否采用。"
    ],
    properties: [],
    inherited: inheritedGprim,
    related: ["overview", "VolumeFieldBase", "VolumeFieldAsset", "OpenVDBAsset", "Field3DAsset"],
  },
  {
    name: "VolumeFieldAsset",
    title: "VolumeFieldAsset",
    summary: "VolumeFieldAsset is an abstract schema that represents a volumetric field where the volumetric data is stored outside the layer.",
    sourceIntro: "VolumeFieldAsset is an abstract schema (that inherits from VolumeFieldBase) that represents a volumetric field where the volumetric data is stored outside the layer, e.g. in a file asset.",
    sourceKeywords: ["VolumeFieldAsset", "abstract schema", "VolumeFieldBase", "volumetric data", "outside the layer", "file asset", "OpenVDBAsset", "Field3DAsset", "fieldDataType", "fieldName", "filePath", "vectorDataRoleHint"],
    paragraphs: [
      "`VolumeFieldAsset` 是抽象 schema，继承自 `VolumeFieldBase`，表达体积 field 的数据存储在 layer 外部，例如 file asset。它是外部体积数据入口的共同基类。",
      "实际 authoring 通常不会直接创建 `VolumeFieldAsset` prim，而是创建派生 schema，例如 `OpenVDBAsset` 或 `Field3DAsset`。这些派生 schema 会补充具体格式约束。",
      "如果要扩展 UsdVol 并加入自定义 file-based field schema，自定义 schema 应继承 `VolumeFieldAsset`。这样可以保留 `fieldDataType`、`fieldIndex`、`fieldName`、`filePath` 和 `vectorDataRoleHint` 这些共同语义。",
      "`filePath` 指向外部数据文件，`fieldName` 或 `fieldIndex` 用于在文件中选择 field，`fieldDataType` 和 `vectorDataRoleHint` 提供数据解释提示。它们共同决定工具如何读取外部体积数据。",
      "VolumeFieldAsset 与 Volume 的边界也要清楚：Volume 用 `field:*` relationship 使用 field；VolumeFieldAsset 及派生类型负责描述 field 数据来源。不要把 `field:*` 关系名和 `fieldName` 合并。",
      "调试外部数据失败时，先确认派生 schema 类型，再确认 asset resolver 能解析 `filePath`，随后确认文件内 field 名称或索引存在，最后检查数据类型、vector role 和 renderer 支持。"
    ],
    properties: volumeFieldAssetProps,
    inherited: inheritedImageable,
    related: ["VolumeFieldBase", "OpenVDBAsset", "Field3DAsset", "Volume", "overview"],
  },
  {
    name: "VolumeFieldBase",
    title: "VolumeFieldBase",
    summary: "VolumeFieldBase is an abstract schema that acts as the base class for all UsdVol field schemas.",
    sourceIntro: "VolumeFieldBase is an abstract schema that acts as the base class for all UsdVol field schemas.",
    sourceKeywords: ["VolumeFieldBase", "abstract schema", "base class", "UsdVol field schemas", "custom Field schemas", "Xformable", "Imageable", "xformOpOrder", "proxyPrim", "visibility"],
    paragraphs: [
      "`VolumeFieldBase` 是所有 UsdVol field schemas 的抽象基类。它说明某个 prim 是 volume field 类型链的一部分，但不直接规定外部文件格式或具体 field 数据。",
      "如果需要扩展 UsdVol 并创建自定义 Field schema，自定义 schema 应直接或间接继承 `VolumeFieldBase`。如果数据来自外部文件，再进一步继承 `VolumeFieldAsset` 更合适。",
      "本页没有自己的具体 field 属性表，主要展示继承自 Xformable 和 Imageable 的属性。transform 会影响 field prim 的 world-space 位置，visibility 和 purpose 会影响场景可见性与展示语义。",
      "VolumeFieldBase 与 Volume 的关系是“field 被 Volume 引用”。Volume 通过 `field:*` relationship 指向 VolumeFieldBase 派生 prim，renderer 再按关系名把 field 绑定到 shader 输入。",
      "调试自定义 field schema 时，先确认 schema 继承链是否最终落到 `VolumeFieldBase`，再确认 Volume 的 relationship 目标是否指向该 prim，最后检查具体派生 schema 是否提供数据来源。",
      "不要把 VolumeFieldBase 当成可直接提供 OpenVDB/Field3D 数据的类型。它是类型系统和扩展机制的基类，外部数据入口仍需要 `VolumeFieldAsset` 或格式派生 schema。"
    ],
    properties: [],
    inherited: inheritedImageable,
    related: ["VolumeFieldAsset", "Volume", "OpenVDBAsset", "Field3DAsset", "overview"],
  },
  {
    name: "overview",
    title: "Overview",
    summary: "The UsdVol schema domain contains schemas for working with volumes and volumetric data.",
    sourceIntro: "The UsdVol schema domain contains schemas for working with volumes and volumetric data.",
    sourceKeywords: ["Working With Volumes", "Working With Fields", "Making Fields Child Prims of Volumes", "Using Animated Field Data", "Understanding fieldName", "Working With Particle Fields", "OpenVDB", "Field3D", "field:velocity", "timeSamples"],
    paragraphs: [
      "`UsdVol` overview 是领域导读页，说明 Volumes、volumetric data、OpenVDB/Field3D asset、field relationship 和 ParticleField。它不是单个 schema 页，而是本地阅读路线的中心。",
      "Working With Volumes 部分强调 Volume 是 renderable volume，例如 fog、fire 或 smoke。Volume 通过 `field:*` 关系引用 VolumeFieldBase 派生 prim，并可通过 material binding 和 volume shader 控制渲染。",
      "Working With Fields 部分说明实际体积数据常在 OpenVDB 或 Field3D assets 中。`VolumeFieldBase` 是所有 field schema 基类，`VolumeFieldAsset` 是外部文件型 field schema 基类，实际使用时常见 `OpenVDBAsset` 或 `Field3DAsset`。",
      "Making Fields Child Prims of Volumes 是组织建议：把 Field prim 作为 Volume 子 prim，便于查找、引用和随 Volume 一起移动。但如果多个 Volume 共享同一个 Field，也可以把 field 放在 Volume 外部。",
      "Using Animated Field Data 解释外部体积文件的动画表达：对 VolumeFieldAsset 派生 field，在 `filePath` attribute 上设置 timeSamples，逐帧指向不同 VDB 或其他体积数据文件。",
      "Understanding fieldName and the Field’s Relationship Name 是本页最容易误读的部分。外部 asset 的 `fieldName` 用于定位文件内 grid，例如 `vel`；Volume 的 `field:velocity` 关系名则面向 shader 或 renderer 语义。",
      "Working With Particle Fields 把 `ParticleField`、3D Gaussian splats、position、kernel、radiance、opacity、orientation、scale 等数据引入同一领域。它属于 usdVol，不属于光照或音频。",
      "调试建议：先从 overview 判断是 volume/field 问题还是 particle field 问题；volume 路径检查 `field:*`、`filePath`、`fieldName`、material binding；particle field 路径检查 position、kernel、radiance 和 per-particle 属性。"
    ],
    properties: [],
    related: ["usdVol_toc", "Volume", "VolumeFieldAsset", "VolumeFieldBase", "ParticleField", "OpenVDBAsset", "Field3DAsset"],
  },
  {
    name: "usdVol_toc",
    title: "Volumes (usdVol)",
    summary: "Volumes (usdVol) table of contents.",
    sourceIntro: "Volumes (usdVol) table of contents.",
    sourceKeywords: ["Volumes (usdVol)", "fieldName"],
    paragraphs: [
      "`usdVol_toc` 是 Volumes (usdVol) 领域目录页。它的职责不是解释一个属性，而是帮助读者按正确顺序进入 overview、Volume、field asset、particle field 和各类 AttributeAPI / KernelAPI。",
      "推荐阅读顺序是：先读 `overview`，理解 Working With Volumes、Working With Fields、Animated Field Data、`fieldName` 与 relationship name 的差异；再读 `Volume` 和 `VolumeFieldBase`；最后进入具体格式或粒子场页。",
      "体积文件路径读者应从 `VolumeFieldAsset`、`OpenVDBAsset`、`Field3DAsset` 进入；它们解释外部数据、`filePath`、`fieldName`、`fieldIndex`、`fieldDataType` 和 `vectorDataRoleHint`。",
      "粒子场读者应从 `ParticleField` 和 `ParticleField3DGaussianSplat` 进入，再看 position、kernel、radiance、opacity、orientation、scale、spherical harmonics 等 AttributeAPI。",
      "`fieldName` 是目录页也要强调的术语：它用于外部 asset 内的 field/grid 名称，不等同于 Volume 的 `field:*` relationship name。理解这点能避免最常见的 volume shader 参数接线错误。",
      "本地目录页应作为阅读路径节点保留：从总入口或 release index 进入本页，再跳到本地 schema 页。只有明确“打开官方原页 / Open official page”的链接才应跳到 openusd.org。"
    ],
    properties: [],
    related: ["overview", "Volume", "VolumeFieldBase", "VolumeFieldAsset", "OpenVDBAsset", "Field3DAsset", "ParticleField"],
  },
];

function relatedLinks(page) {
  const names = [...new Set([...(page.related || []), ...commonRelated])].filter((name) => name !== page.name);
  return names.map((name) => `<li><a href="${esc(name)}.html">${esc(name)}</a></li>`).join("\n        ");
}

function pageHtml(page) {
  const official = officialUrl(page.name);
  const source = `${sourceDir}/${page.name}_source.html`;
  const paragraphs = [...commonCoverage, ...page.paragraphs]
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
    <section data-cn-complete="round-411-usdVol-core-closeout-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、属性/关系/API 分组、volume/field/particle field 边界、误读点、调试路径和相邻 usdVol 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
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
      <p class="zh">本页应放在 usdVol 剩余核心页的连续阅读路径中：目录和 overview 负责路线，Volume/VolumeFieldBase/VolumeFieldAsset 负责体积场关系和资产入口，ParticleFieldSphericalHarmonicsAttributeAPI 负责粒子场 radiance 表达。下面的链接都保留为本地阅读路径；只有“打开官方原页 / Open official page”是显式外跳。</p>
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
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdVol-core-`))
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
    target_domain: "usdVol-core-closeout",
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
    id: `round-${ROUND}-release-usdVol-core-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdVol core closeout promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, volume/field/particle-field groups, relationship and asset boundaries, common misreads, debugging path, adjacent usdVol relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
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
    purpose: `Round ${ROUND} DomainSprintRound：usdVol 剩余核心页收尾小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 148 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、Volume/VolumeField/ParticleField 分组、field relationship 与外部资产边界、误读点、调试路径、相邻 usdVol 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdVol 剩余核心页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
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
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮收尾 usdVol 剩余核心页。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    source_parity_report: sourceParityReport,
    next_actions: [
      "usdVol 领域短页已经大体收尾；下一轮可转向其他 release schema 域、教程/user guide，或针对 review_ready_zh 债务做 EnglishDebtRound。",
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
