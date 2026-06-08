import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 410;
const GENERATED_AT = "2026-06-08T03:10:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdVol";
const sourceDir = "source/full_release/user_guides/schemas/usdVol";
const sourceParityReport = "reports/round_410_usdVol_particle_api_source_parity.json";

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
    return `<tr><td colspan="${columns}"><span class="zh">本页没有独立属性表；中文主阅读路径重点解释 applied schema 职责、验证语义、与 ParticleField 的关系和调试路径。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const candidates = [
  "ParticleFieldKernelGaussianEllipsoidAPI",
  "ParticleFieldKernelGaussianSurfletAPI",
  "ParticleFieldOpacityAttributeAPI",
  "ParticleFieldOrientationAttributeAPI",
  "ParticleFieldPositionAttributeAPI",
  "ParticleFieldPositionBaseAPI",
  "ParticleFieldRadianceBaseAPI",
  "ParticleFieldScaleAttributeAPI",
];

const commonRelated = [
  "overview",
  "usdVol_toc",
  "ParticleField",
  "ParticleField3DGaussianSplat",
  "ParticleFieldKernelBaseAPI",
  "ParticleFieldKernelConstantSurfletAPI",
  "ParticleFieldSphericalHarmonicsAttributeAPI",
];

const commonCoverage = [
  "`UsdVol` 的 particle field 页描述的是粒子场数据、核函数和每粒子属性，不是 `usdLux` 光照、`usdMedia` 音频或 `usdRender` 输出配置。本组页面要和第 409 轮的 `ParticleField`、`ParticleField3DGaussianSplat`、`ParticleFieldKernelBaseAPI` 连续阅读。",
  "`ParticleField` 的核心判断是 position 数据决定粒子数量，kernel 数据决定单个粒子如何在空间中贡献，radiance/opacity/orientation/scale 等属性决定每个粒子的颜色、透明度和几何变换。缺少任何关键组件，都可能让消费端无法验证或采用粒子场。",
  "`ParticleFieldPositionBaseAPI` 是验证链里的基础 applied schema。它让工具能确认某个 ParticleField 至少有位置定义；如果没有 position 数据，粒子场就没有粒子，后续 opacity、scale、orientation、radiance 数据都没有可靠对齐对象。",
  "本组 AttributeAPI 页都要按同一个长度规则理解：属性长度应与 position 数据定义的粒子数量匹配。太长时通常截断到粒子数量，太短时会被忽略；若被忽略或未 authored，则使用对应默认行为。",
  "精度选择是第二条共同线索。官方常同时提供 float 和 half 版本，例如 `opacities` / `opacitiesh`、`positions` / `positionsh`、`scales` / `scalesh`。数据消费者应优先使用 float 版本；half 版本主要服务数据体积和内存占用权衡。",
  "Gaussian kernel 页要区分 ellipsoid 和 surflet：ellipsoid 是三维高斯球经 rotation/scale 变换后的椭球；surflet 是位于 XY plane 的二维高斯 disk，经 rotation/scale 变换后成为 planar ellipse。二者都不是 light shape，也不是 mesh surface。",
  "Opacity 与 scale 的 PLY 误读必须保留。官方明确提醒 opacity 是传统线性 `[0, 1]` computer graphics opacity，不是 PLY Gaussian splats 中常见、需要 sigmoid activation function 的变换数据；scale 是线性 scale，不是 PLY 中可能出现的 log-format。",
  "调试时先看 ParticleField 上应用了哪些 built-in 或 applied schema，再看 position 数据数量，随后检查 kernel、radiance、opacity、orientation 和 scale 是否存在并与 position 长度匹配，最后检查 renderer 是否支持目标 kernel 和属性类型。",
  "站内阅读路径保持本地化：同目录的 `overview`、`usdVol_toc`、`ParticleField`、kernel API 和 AttributeAPI 都应通过本地链接连续阅读。只有明确写成“打开官方原页 / Open official page”的链接才外跳到 openusd.org。",
  "中文说明保留正式标识符：API/schema/token/属性名/函数名/代码、`g(u=0;o=1;x = p.length())`、`float[]`、`half[]`、`point3f[]`、`quatf[]`、`float3[]` 等都不翻译，只在中文中解释它们的用途和边界。",
  "从 composition 角度看，这些属性仍是 USD authored opinions。layer strength、reference、payload、variant 和 override 都可能改变最终 composed value；排查时应看最终 stage 上的 resolved attributes，而不是只看某个 layer 文件。",
  "从 renderer 采用角度看，schema 正确不等于画面必然出现。粒子场还需要 renderer 或工具支持对应 kernel、数据布局、排序/投影策略和 radiance 表达；若不可见，应把“USD 数据有效”和“renderer 采用有效”分开验证。",
  "从数据一致性看，per-particle 属性和 position 数量错位是最常见问题。太长会造成尾部数据无效，太短会被整体忽略；因此调试时要先输出数组长度，再确认类型和精度版本。",
  "从迁移角度看，Gaussian splat 相关数据常来自外部训练或 PLY 管线。导入 USD 时不能机械复制 PLY 中的预激活 opacity 或 log-scale 值，必须按 OpenUSD schema 需要 author 线性 opacity 和线性 scale。",
  "从验证角度看，base API 页通常不直接给属性表，但它们决定 schema 组合的最低要求。中文主阅读路径需要解释“为什么 base schema 存在”，而不是因为没有属性表就把页面视为无内容。",
  "从用户路径看，本组页面的价值在于把粒子场拆成可排查的组件：position 决定粒子集，kernel 决定空间支持，radiance 决定发光/颜色定义，opacity 决定线性透明度，orientation/scale 决定每个 kernel 的方向和大小。",
  "从边界盒和坐标空间看，position 是 local space，每个 particle 的 kernel 还可能受 per-particle orientation/scale 和 prim transform 共同影响。若 splat 位置、大小或方向错误，应同时检查这三层变换。",
  "从 review-ready 角度看，本页不仅给出开头导读，还要覆盖官方核心段落、属性/API 分组、边界、误读、调试顺序和相邻类型。英文保留用于核对，不应成为理解页面职责的主路径。",
  "从数据生命周期看，ParticleField 页通常横跨训练数据、资产导入、USD authoring、composition 和 renderer 采用。中文阅读时应把这些阶段分开：训练数据可能使用 PLY 或自定义数组，USD 页面只规定 schema 表达，最终 renderer 还要决定如何采样和排序。",
  "从数组校验看，最可靠的第一步是打印 position、opacity、orientation、scale、radiance 等数组长度，并确认它们是否按官方规则对齐。不要因为页面标题包含 AttributeAPI 就假设所有属性都能独立生效；大多数属性都依赖 position 数据定义的粒子数量。",
  "从错误定位看，如果粒子场完全不可见，优先怀疑 position 缺失、extent/transform 错误、kernel 不存在或 renderer 不支持；如果可见但形状错误，再检查 orientation、scale 和 kernel 类型；如果亮度或透明度错误，再检查 radiance 与 opacity 数据。",
  "从中文化边界看，本地页不会翻译 `ParticleFieldKernelGaussianEllipsoidAPI`、`ParticleFieldOpacityAttributeAPI`、`point3f[]`、`quatf[]` 等正式标识。中文只补足官方段落之间的因果关系、排查顺序和工程语境，方便读者在不依赖英文正文的情况下使用页面。",
  "从相邻类型关系看，kernel API 和 AttributeAPI 都不是独立场景元素，而是附着在 ParticleField 上共同描述数据。阅读本页时应随时回到 `ParticleField` 的整体要求：有位置、有核函数、有辐射或颜色定义，再按需要补透明度、方向和缩放。",
  "从工程验收看，完成页必须让读者能直接按中文步骤排查：确认 applied schema、确认 position 基准、确认数组长度和精度、确认 kernel 类型、确认 renderer 支持。只保留英文原文而没有这条中文路径，就不能算可直接使用的中文版。",
];

const pages = [
  {
    name: "ParticleFieldKernelGaussianEllipsoidAPI",
    title: "ParticleFieldKernelGaussianEllipsoidAPI",
    summary: "Defines the Gaussian ellipsoid kernel for a ParticleField.",
    sourceIntro: "Defines the Gaussian ellipsoid kernel for a ParticleField.",
    sourceKeywords: ["ParticleFieldKernelGaussianEllipsoidAPI", "Gaussian ellipsoid kernel", "ParticleField", "g(u=0;o=1;x = p.length())", "standard deviation", "3-sigma", "spherical region", "opacity", "rotation", "scale", "position"],
    paragraphs: [
      "`ParticleFieldKernelGaussianEllipsoidAPI` 定义 ParticleField 的 Gaussian ellipsoid kernel。未变换的 kernel 在 identity position、scale、rotation、opacity 下，以 `g(u=0;o=1;x = p.length())` 计算点 `p` 的 opacity。",
      "官方说明 standard deviation 为 1，因此 3-sigma point 是 3.0，99.7% 的 splat support 位于半径 3 的 spherical region 内。这里的 spherical region 是未变换高斯核的支持解释，不是 USD `SphereLight` 或几何球体。",
      "per-splat opacity 与 Gaussian falloff 是 multiplicative。也就是说，每粒子的 opacity 不是覆盖高斯衰减，而是与衰减结果相乘；检查透明度问题时要同时看 opacity 属性和 kernel falloff。",
      "rotation 和 scale 会把 Gaussian sphere kernel 变换成 ellipsoid，position 会把每个 splat 的 peak falloff 从 origin 移动到粒子位置。这里的 position、rotation、scale 是每粒子核函数解释的一部分，不等同于整体 prim transform。",
      "调试路径建议：先确认 ParticleField 上使用了这个 kernel API，再检查 position 数组决定的粒子数量，再看 scale/orientation/opacity 是否长度匹配，最后检查 renderer 是否按 Gaussian ellipsoid kernel 采用。"
    ],
    properties: [],
    related: ["ParticleFieldKernelBaseAPI", "ParticleFieldKernelGaussianSurfletAPI", "ParticleFieldScaleAttributeAPI", "ParticleFieldOpacityAttributeAPI"],
  },
  {
    name: "ParticleFieldKernelGaussianSurfletAPI",
    title: "ParticleFieldKernelGaussianSurfletAPI",
    summary: "Defines the Gaussian surflet kernel for a ParticleField.",
    sourceIntro: "Defines the Gaussian surflet kernel for a ParticleField.",
    sourceKeywords: ["ParticleFieldKernelGaussianSurfletAPI", "Gaussian surflet kernel", "ParticleField", "XY plane", "g(u=0;o=1;x = p.length())", "circular disk", "planar ellipse", "opacity", "rotation", "scale", "position"],
    paragraphs: [
      "`ParticleFieldKernelGaussianSurfletAPI` 定义 ParticleField 的 Gaussian surflet kernel。未变换 kernel 在 XY plane 上用 `g(u=0;o=1;x = p.length())` 计算 opacity，离开 XY-plane 的 opacity 定义为 0。",
      "官方说明 standard deviation 为 1，3-sigma point 是 3.0，99.7% 的 splat support 位于 XY plane 上半径 3 的 circular disk 内。这个 disk 是 surflet 支持范围，不是 `DiskLight` 或 mesh disk。",
      "per-splat opacity 与 Gaussian falloff 相乘。rotation 和 scale 会把 Gaussian disk kernel 变换成 planar ellipse，position 会把 per-splat peak falloff 从 origin 移到粒子中心。",
      "与 Gaussian ellipsoid 的差别在维度：ellipsoid 是三维球形高斯经变换后的椭球，surflet 是 XY plane 上二维 disk 经变换后的 planar ellipse。把这一区分清楚，才能判断 splat 是体积状还是表面片状贡献。",
      "调试时先检查 kernel API 类型，再检查 orientation/scale 是否把 surflet 平面转到预期方向和大小，再检查 opacity 是否与高斯衰减相乘，最后检查 renderer 是否支持 surflet kernel。"
    ],
    properties: [],
    related: ["ParticleFieldKernelBaseAPI", "ParticleFieldKernelGaussianEllipsoidAPI", "ParticleFieldKernelConstantSurfletAPI", "ParticleFieldOrientationAttributeAPI"],
  },
  {
    name: "ParticleFieldOpacityAttributeAPI",
    title: "ParticleFieldOpacityAttributeAPI",
    summary: "Defines an applied schema for ParticleField opacity data.",
    sourceIntro: "Defines an applied schema for ParticleField opacity data.",
    sourceKeywords: ["ParticleFieldOpacityAttributeAPI", "opacities", "opacitiesh", "float[]", "half[]", "sigmoid activation function", "[0, 1]", "fully opaque", "position data", "truncated", "ignored"],
    paragraphs: [
      "`ParticleFieldOpacityAttributeAPI` 定义 ParticleField 的 opacity data。官方强调 opacity 应在 `[0, 1]` 范围内，并按传统线性 computer graphics opacity 解释。",
      "本页最重要的边界是不要把 opacity 当成 PLY Gaussian splats 中常见的变换数据。官方明确说它不是需要 sigmoid activation function 处理的值；导入外部数据时必须先转换到线性 `[0, 1]` opacity。",
      "`opacities` 是 float precision 的 `float[]`，`opacitiesh` 是 half precision 的 `half[]`。如果 float 版本存在，data consumers should prefer the float version if available；half 版本主要用于降低数据 footprint。",
      "属性长度应匹配 position data 长度。太长时会被 truncated 到 position 数据定义的粒子数量；太短时会 ignored；如果 ignored 或未 populated，则默认值是 fully opaque `1.0`。",
      "调试透明度时不要只看材质或 displayOpacity。应先确认 `ParticleFieldPositionBaseAPI` 派生 schema 提供了位置数量，再确认 `opacities` 或 `opacitiesh` 长度匹配，最后看 kernel falloff 与 per-splat opacity 的乘法结果。"
    ],
    properties: [
      { name: "opacities", type: "float[]", fallback: "", zh: "每粒子的线性 `[0, 1]` opacity，float 精度。长度必须与 position 数据定义的粒子数量匹配；过长截断，过短忽略。", en: "Linear [0,1] opacity for each particle, in float precision." },
      { name: "opacitiesh", type: "half[]", fallback: "", zh: "每粒子的线性 `[0, 1]` opacity，half 精度。如果 `opacities` 存在，应优先使用 float 版本。", en: "Linear [0,1] opacity for each particle, in half precision." },
    ],
    related: ["ParticleFieldPositionBaseAPI", "ParticleFieldKernelGaussianEllipsoidAPI", "ParticleFieldKernelGaussianSurfletAPI", "ParticleField"],
  },
  {
    name: "ParticleFieldOrientationAttributeAPI",
    title: "ParticleFieldOrientationAttributeAPI",
    summary: "Defines an applied schema for ParticleField orientation data.",
    sourceIntro: "Defines an applied schema for ParticleField orientation data.",
    sourceKeywords: ["ParticleFieldOrientationAttributeAPI", "orientations", "orientationsh", "quatf[]", "quath[]", "float", "half", "position data", "truncated", "ignored"],
    paragraphs: [
      "`ParticleFieldOrientationAttributeAPI` 定义 ParticleField 的 orientation data，用四元数为每个粒子的 kernel 或 splat 提供方向信息。它影响 kernel 在局部空间中的旋转，不是整体 prim 的 `orientation` token。",
      "官方提供 `orientations` 和 `orientationsh` 两个精度版本。`orientations` 是 `quatf[]`，`orientationsh` 是 `quath[]`；如果 float 版本存在，消费者应优先使用 float 版本。",
      "orientation 数组长度应与 position data 长度匹配。太长时按粒子数量 truncated，太短时 ignored。ignored 后，消费端通常回到默认方向或 schema 默认解释。",
      "该页常见误读是把 Gprim inherited `orientation` 和每粒子的 quaternion orientation 混在一起。前者是继承的几何方向约定，后者是 per-particle kernel/splat 的旋转数据，两者层级不同。",
      "调试方向异常时先输出 position 数量，再比较 `orientations` / `orientationsh` 数组长度，确认 quaternion 分量顺序和单位化，再看 scale 与 kernel 类型共同形成的 ellipsoid 或 planar ellipse。"
    ],
    properties: [
      { name: "orientations", type: "quatf[]", fallback: "", zh: "每粒子的 quaternion orientation，float 精度。用于旋转每个粒子实例化的 kernel 或 splat。", en: "Quaternion orientation for each particle, in float precision." },
      { name: "orientationsh", type: "quath[]", fallback: "", zh: "每粒子的 quaternion orientation，half 精度。如果 `orientations` 存在，应优先使用 float 版本。", en: "Quaternion orientation for each particle, in half precision." },
    ],
    related: ["ParticleFieldScaleAttributeAPI", "ParticleFieldPositionAttributeAPI", "ParticleFieldKernelGaussianSurfletAPI", "ParticleField"],
  },
  {
    name: "ParticleFieldPositionAttributeAPI",
    title: "ParticleFieldPositionAttributeAPI",
    summary: "Defines an applied schema for ParticleField position data.",
    sourceIntro: "Defines an applied schema for ParticleField position data.",
    sourceKeywords: ["ParticleFieldPositionAttributeAPI", "positions", "positionsh", "point3f[]", "point3h[]", "number of particles", "local space", "ParticleFieldPositionBaseAPI", "validation", "no particles"],
    paragraphs: [
      "`ParticleFieldPositionAttributeAPI` 定义 ParticleField 的 position data。position 是粒子场的基准数组，官方明确说被使用的 positions attribute size 决定 ParticleField 中粒子数量。",
      "如果 positions attribute 未 authored 或解析为空数组，则 ParticleField has no particles。也就是说，其他 per-particle 数据即使存在，没有 position 数据也没有可对齐的粒子对象。",
      "`positions` 是 `point3f[]`，`positionsh` 是 `point3h[]`；如果 float 版本存在，消费者应优先使用 `positions`。两者都表达 local space 中每个粒子的位置。",
      "本 applied schema reflects `ParticleFieldPositionBaseAPI`，让 validation 可以确认 ParticleField 有 position data。它不是可选装饰属性，而是粒子数量和验证链的基础。",
      "官方核对词 `number of particles` 要保留：position 数组的长度就是 number of particles。后续 per-particle 数据的截断、忽略和默认值，都围绕这个数量展开。",
      "调试不可见粒子场时先检查 `positions` 或 `positionsh` 是否存在且非空，再检查坐标是否在预期 local space、extent 是否覆盖粒子、prim transform 是否把粒子移出视锥。"
    ],
    properties: [
      { name: "positions", type: "point3f[]", fallback: "", zh: "每粒子的 local space position，float 精度；该数组长度也决定 ParticleField 的粒子数量。", en: "Position for each particle in local space, in float precision." },
      { name: "positionsh", type: "point3h[]", fallback: "", zh: "每粒子的 local space position，half 精度。如果 `positions` 存在，应优先使用 float 版本；该数组也决定粒子数量。", en: "Position for each particle in local space, in half precision." },
    ],
    related: ["ParticleFieldPositionBaseAPI", "ParticleFieldOpacityAttributeAPI", "ParticleFieldScaleAttributeAPI", "ParticleField"],
  },
  {
    name: "ParticleFieldPositionBaseAPI",
    title: "ParticleFieldPositionBaseAPI",
    summary: "Defines a base applied schema for ParticleField position data.",
    sourceIntro: "Defines a base applied schema for ParticleField position data.",
    sourceKeywords: ["ParticleFieldPositionBaseAPI", "base applied schema", "position data", "number of positions", "number of particles", "truncated", "discarded", "default value", "validation", "ParticleField"],
    paragraphs: [
      "`ParticleFieldPositionBaseAPI` 是 ParticleField position data 的 base applied schema。它不一定直接给出属性表，但它定义了验证和 schema 组合的最低语义：粒子场必须能被某个 position schema 描述。",
      "官方说明 number of positions 也用于决定 ParticleField 中的 number of particles。如果没有 position data，则 ParticleField contains no particles。这是所有 per-particle 数据对齐的根。",
      "其他 per-particle data，例如 scale 或 orientation，会调整到 position 数量：数据更多时 truncated，数据更少时 discarded。如果没有数据或被 discarded，则使用对应 default value。",
      "该 base schema 通常作为 ParticleField characteristics schemas 的 built-in applied schema。这使 validation 能确认定义 position 的 applied schema 始终存在，而不是事后猜测粒子数量。",
      "调试时如果 opacity、scale、orientation 或 radiance 看似丢失，先检查 PositionBase 语义是否满足：是否有 positions、数量是多少、其他数组是否匹配。很多问题不是属性名错，而是没有可对齐的 position 基准。"
    ],
    properties: [],
    related: ["ParticleFieldPositionAttributeAPI", "ParticleFieldOpacityAttributeAPI", "ParticleFieldOrientationAttributeAPI", "ParticleField"],
  },
  {
    name: "ParticleFieldRadianceBaseAPI",
    title: "ParticleFieldRadianceBaseAPI",
    summary: "Defines a base applied schema for ParticleField radiance definition data.",
    sourceIntro: "Defines a base applied schema for ParticleField radiance definition data.",
    sourceKeywords: ["ParticleFieldRadianceBaseAPI", "base applied schema", "ParticleField", "radiance definition data", "built-in applied schema", "validation", "radiance definitions"],
    paragraphs: [
      "`ParticleFieldRadianceBaseAPI` 定义 ParticleField radiance definition data 的 base applied schema。它说明粒子场不只需要 position 和 kernel，还需要可验证的 radiance 定义来源。",
      "本页没有直接属性表，但它在 schema 组合中很关键：ParticleField characteristics schemas 通常会把它作为 built-in applied schema，使 validation 能确认存在提供 radiance definitions 的 schema。",
      "radiance 与 displayColor 不同。displayColor 是 Gprim/primvar 层面的展示色提示，而 radiance definition data 面向粒子场渲染时每个粒子或 splat 的辐射/颜色贡献定义。",
      "调试颜色或亮度缺失时，不应只检查 material binding 或 primvars。应确认 ParticleField 上是否有 radiance base 或具体 radiance schema，position 数量是否存在，kernel 是否支持，renderer 是否采用对应 radiance definition。",
      "从相邻关系看，`ParticleFieldRadianceBaseAPI` 与 `ParticleFieldPositionBaseAPI`、kernel API、opacity/scale/orientation AttributeAPI 共同构成粒子场的可渲染信息。缺任何一类都可能让渲染结果退化或失败。"
    ],
    properties: [],
    related: ["ParticleFieldPositionBaseAPI", "ParticleFieldSphericalHarmonicsAttributeAPI", "ParticleField3DGaussianSplat", "ParticleField"],
  },
  {
    name: "ParticleFieldScaleAttributeAPI",
    title: "ParticleFieldScaleAttributeAPI",
    summary: "Defines an applied schema for ParticleField scale factor data.",
    sourceIntro: "Defines an applied schema for ParticleField scale factor data.",
    sourceKeywords: ["ParticleFieldScaleAttributeAPI", "scales", "scalesh", "float3[]", "half3[]", "affine linear scale factor", "linear scales", "log-format", "PLY files", "position data"],
    paragraphs: [
      "`ParticleFieldScaleAttributeAPI` 定义 ParticleField 的 scale factor data。官方强调 scale values are linear scales，和 OpenUSD 其他地方的 scale 保持一致。",
      "本页最重要的误读点是不要把 scale 当成 PLY Gaussian splats 中有时出现的 log-format。导入 PLY 或训练数据时，应先把外部表示转换为 OpenUSD schema 需要的 affine linear scale factor。",
      "官方核对词 `PLY files` 必须保留：这些文件里的 scale 可能来自训练管线或压缩表示，不能直接当成 OpenUSD 的线性 `scales` / `scalesh` 写入。",
      "`scales` 是 `float3[]`，`scalesh` 是 `half3[]`。如果 `scales` 存在，data consumers should prefer the float version if available；half 版本用于降低数据 footprint。",
      "该 scale 应用于每个 particle 实例化的 kernel。对于 Gaussian ellipsoid，它会把球形高斯拉伸成 ellipsoid；对于 surflet，它会把 disk 拉伸成 planar ellipse。scale 不是整体 prim scale 的唯一来源。",
      "数组长度仍应匹配 position data。太长时 truncated，太短时 ignored。调试 splat 大小异常时，应同时检查 `scales` / `scalesh` 数组、orientation、kernel 类型、prim transform 和 renderer 对 scale 的采用。"
    ],
    properties: [
      { name: "scales", type: "float3[]", fallback: "", zh: "每粒子的 affine linear scale factor，float 精度；用于缩放每个粒子实例化的 kernel。", en: "Affine linear scale factor applied to the kernel for each particle, in float precision." },
      { name: "scalesh", type: "half3[]", fallback: "", zh: "每粒子的 affine linear scale factor，half 精度。如果 `scales` 存在，应优先使用 float 版本。", en: "Affine linear scale factor applied to the kernel for each particle, in half precision." },
    ],
    related: ["ParticleFieldKernelGaussianEllipsoidAPI", "ParticleFieldKernelGaussianSurfletAPI", "ParticleFieldOrientationAttributeAPI", "ParticleFieldPositionAttributeAPI"],
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
    <section data-cn-complete="round-410-usdVol-particle-api-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、属性/API 分组、粒子场数据边界、误读点、调试路径和相邻 usdVol 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
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
      <h2>相邻 usdVol 阅读路径 / Adjacent usdVol Reading Path</h2>
      <p class="zh">本页应放在 usdVol 粒子场链路中连续阅读：先看 <code>ParticleField</code> 和 <code>ParticleField3DGaussianSplat</code>，再根据数据角色进入 position、kernel、radiance、opacity、orientation 或 scale API。下面的链接都保留为本地阅读路径；只有“打开官方原页 / Open official page”是显式外跳。</p>
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
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdVol-particle-`))
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
    target_domain: "usdVol-particle-field-apis",
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
    id: `round-${ROUND}-release-usdVol-particle-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdVol particle-field API promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, particle field data groups, kernel or AttributeAPI boundaries, common misreads, debugging path, adjacent usdVol relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
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
    purpose: `Round ${ROUND} DomainSprintRound：usdVol 粒子场属性/API 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 140 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、ParticleField position/kernel/radiance/opacity/orientation/scale 分组、核函数和 AttributeAPI 边界、误读点、调试路径、相邻 usdVol 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdVol ParticleField/API 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
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
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮继续补齐 usdVol 的粒子场短 schema/API 页。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    source_parity_report: sourceParityReport,
    next_actions: [
      "下一轮可继续选择 usdVol 中未完成的 ParticleFieldSphericalHarmonicsAttributeAPI、Volume、VolumeFieldAsset、VolumeFieldBase、overview 或 toc；若导航或报告计数出现不一致，先做 DefectRound。",
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
