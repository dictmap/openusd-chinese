import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-073";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html",
    title: "ParticleFieldOrientationAttributeAPI",
    notes: [
      "`ParticleFieldOrientationAttributeAPI` 定义 ParticleField orientation data 的 applied schema，用于给每个粒子或 splat 提供朝向数据。",
      "`orientations` 与 `orientationsh` 分别提供 float 和 half 类型，便于在精度和数据 footprint 之间取舍；消费者如果两者都存在，应优先使用 float version。",
      "orientation 数组长度应与 position data 的长度一致；position data 来自任意 `ParticleFieldPositionBaseAPI` 派生 schema，因此位置数据是对齐其他逐粒子属性的基准。",
      "如果 orientation 数组太长，会按 position 定义的粒子数量 truncate；如果太短，则该数据会被 ignored，避免不完整数组被误解释为有效粒子朝向。",
      "阅读本页时应和 `ParticleFieldPositionAttributeAPI`、`ParticleFieldScaleAttributeAPI` 和 `ParticleField3DGaussianSplat` 一起核对，以理解每个 splat 的空间姿态。"
    ],
    terms: [
      ["ParticleFieldOrientationAttributeAPI", "粒子场朝向属性 API"],
      ["orientation data", "朝向数据"],
      ["orientations", "float 朝向数组"],
      ["orientationsh", "half 朝向数组"],
      ["ParticleFieldPositionBaseAPI", "粒子场位置基础 API"],
      ["truncated / ignored", "截断 / 忽略"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html",
    title: "ParticleFieldPositionAttributeAPI",
    notes: [
      "`ParticleFieldPositionAttributeAPI` 定义 ParticleField position data 的 applied schema，是粒子场中最基础的逐粒子数据入口。",
      "`positions` 与 `positionsh` 分别提供 float 和 half 类型；数据消费者应优先使用 float version，因为位置通常决定粒子数量、空间定位和后续属性对齐。",
      "官方摘录说明被使用的 positions attribute 大小定义 ParticleField 中的粒子数量；如果 positions 未 authored 或解析为空数组，则该 ParticleField 没有 particles。",
      "其他逐粒子属性，例如 orientation、scale、opacity、radiance，通常都需要与 positions 数量对齐；位置数组可视为所有 particle attributes 的主索引。",
      "本页适合作为 particle field 数据模型的起点：先确认 position data，再解释其他 AttributeAPI 的数组长度、截断和忽略规则。"
    ],
    terms: [
      ["ParticleFieldPositionAttributeAPI", "粒子场位置属性 API"],
      ["position data", "位置数据"],
      ["positions", "float 位置数组"],
      ["positionsh", "half 位置数组"],
      ["number of particles", "粒子数量"],
      ["unauthored", "未创作/未写入"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html",
    title: "ParticleFieldScaleAttributeAPI",
    notes: [
      "`ParticleFieldScaleAttributeAPI` 定义 ParticleField scale factor data，用于控制每个粒子或 splat 的线性缩放。",
      "官方说明 scale values 是 linear scales，和 OpenUSD 其他位置的 scale 语义一致；它不是 Gaussian splats PLY 文件中有时出现的 log-format transformed data。",
      "`scales` 与 `scalesh` 分别提供 float 和 half 类型；消费者如果两者都可用，应优先使用 float version，以减少精度损失。",
      "scale 数据通常与 position/orientation/kernel 一起决定 splat 在空间中的大小和形状；对于 Gaussian splats，它关系到椭球或 surflet 的空间支持域。",
      "中文层保留 `linear scales`、`log-format`、`PLY files`、`scales` 和 `scalesh` 等原文术语，避免把数据编码格式误解为普通单位换算。"
    ],
    terms: [
      ["ParticleFieldScaleAttributeAPI", "粒子场缩放属性 API"],
      ["scale factor data", "缩放因子数据"],
      ["scales", "float 缩放数组"],
      ["scalesh", "half 缩放数组"],
      ["linear scales", "线性缩放"],
      ["log-format", "对数格式"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html",
    title: "ParticleFieldSphericalHarmonicsAttributeAPI",
    notes: [
      "`ParticleFieldSphericalHarmonicsAttributeAPI` 定义 ParticleField 的 spherical harmonics radiance 数据，包括 degree 和 coefficients。",
      "`radiance:sphericalHarmonicsDegree` 在整个 ParticleField 中保持常量，不随粒子变化；这意味着所有粒子使用同一阶数解释系数数组。",
      "`radiance:sphericalHarmonicsCoefficients` 与 `radiance:sphericalHarmonicsCoefficientsh` 分别提供 float 和 half 系数，消费者应优先使用 float version。",
      "该 schema 适用于需要方向相关辐射度表达的粒子场，例如 3D Gaussian splats 中的 view-dependent color/radiance；它和普通 opacity、scale 数据属于不同数据维度。",
      "阅读时应同时核对 `ParticleFieldRadianceBaseAPI`，确认 radiance definition 存在，再解释 spherical harmonics degree/coefficient 的数组布局。"
    ],
    terms: [
      ["ParticleFieldSphericalHarmonicsAttributeAPI", "粒子场球谐属性 API"],
      ["spherical harmonics", "球谐"],
      ["radiance", "辐射度"],
      ["radiance:sphericalHarmonicsDegree", "球谐阶数属性"],
      ["radiance:sphericalHarmonicsCoefficients", "float 球谐系数"],
      ["view-dependent color", "视角相关颜色"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/Volume.html",
    title: "Volume",
    notes: [
      "`Volume` 是可渲染体积容器，用于表达 smoke、fire 等 volume effect；它继承 `Gprim` 和 `Imageable`，因此可以变换、渲染、绑定材质并参与 purpose/visibility 控制。",
      "体积数据不直接写在 `Volume` 上，而是通过 `field:*` relationships 指向 `VolumeFieldBase` 派生 prim；关系名如 `field:extinction` 或 `field:density` 会映射到 volume shader 的同名输入。",
      "示例中的 `OpenVDBAsset` prim 通过 `filePath` 指向 `/vdbdata/smoke_plume.101.vdb`，再用 `fieldName = \"density\"` 指定文件内部 grid/field。",
      "`Volume` 页面应和 `usdVol overview`、`OpenVDBAsset`、`Field3DAsset`、`VolumeFieldAsset`、`VolumeFieldBase` 一起读，以区分容器 prim、外部文件资产和具体体积字段。",
      "已有早期中文导读说明了基本用途；本轮补强重点是 `field:*` relationship、shader 输入映射和外部体积数据路径，不改变原 USDA 片段。"
    ],
    terms: [
      ["Volume", "可渲染体积 prim"],
      ["volume effect", "体积效果"],
      ["field:* relationship", "体积字段关系"],
      ["VolumeFieldBase", "体积场基础 schema"],
      ["field:extinction", "消光字段关系"],
      ["volume shader", "体积着色器"]
    ]
  }
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
      <h2>中文精修导读 / Chinese Reading Notes</h2>
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、数据范围/类型阅读路径、schema 边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, data range and type reading paths, schema boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
  results
}, null, 2));
