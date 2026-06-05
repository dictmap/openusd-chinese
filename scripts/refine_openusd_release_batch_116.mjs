import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-116";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html",
    title: "ParticleFieldKernelConstantSurfletAPI",
    summary:
      "`ParticleFieldKernelConstantSurfletAPI` 描述 `ParticleField` 的 constant surflet kernel。它适合表达硬边界的平面 splat：未变换时在局部 XY plane 的单位圆盘内贡献固定值，圆盘外不贡献；具体位置、朝向和缩放仍要结合 position、orientation、scale 等 attribute API 阅读。",
    notes: [
      "constant surflet 的重点是 surface-like support：它更像附着在局部平面上的圆盘支撑域，而不是填满三维体积的 ellipsoid kernel。",
      "页面中关于单位圆盘、XY plane、opacity 1.0 和 0.0 的描述应保留数值与英文术语，避免把硬边界写成平滑衰减。",
      "如果同时使用 `ParticleFieldOrientationAttributeAPI` 和 `ParticleFieldScaleAttributeAPI`，它们会改变 surflet 在世界空间中的朝向和尺寸；kernel 页面本身不单独定义这些 per-particle transform 数据。",
      "`ParticleFieldKernelGaussianSurfletAPI` 与本页同属 surflet 家族，但使用 Gaussian falloff；本页的 constant 语义强调支撑域内部固定贡献。",
      "和 `ParticleFieldKernelGaussianEllipsoidAPI` 对照时，constant surflet 是平面小片，Gaussian ellipsoid 是三维椭球体支撑；中文导读要把 surface support 与 volume support 分开。",
    ],
    terms: [
      ["ParticleFieldKernelConstantSurfletAPI", "粒子场 constant surflet kernel API"],
      ["constant surflet", "常量表面小片 kernel"],
      ["unit disk", "单位圆盘"],
      ["XY plane", "XY 平面"],
      ["opacity", "不透明度或贡献值"],
      ["support domain", "支撑域"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html",
    title: "ParticleFieldKernelGaussianEllipsoidAPI",
    summary:
      "`ParticleFieldKernelGaussianEllipsoidAPI` 使用 Gaussian ellipsoid 描述粒子对三维空间的平滑贡献范围。本轮补强强调它与 surflet kernel 的差异：ellipsoid 表示体积型、可各向异性缩放的支撑域，falloff 是平滑的 Gaussian 近似。",
    notes: [
      "Gaussian ellipsoid kernel 通常需要和 position、orientation、scale 数据一起解释：position 给中心，orientation 给局部坐标系，scale 给椭球轴向尺寸。",
      "该 API 不直接描述 radiance、opacity 或颜色；它只说明粒子影响空间的 basis function，辐射度和不透明度由对应 attribute API 表达。",
      "与 `ParticleFieldKernelGaussianSurfletAPI` 相比，ellipsoid 是 volumetric support；surflet 更偏向局部表面片。两者都可使用 Gaussian falloff，但几何支撑维度不同。",
      "与 `ParticleFieldKernelConstantSurfletAPI` 相比，本页不是硬边界常量贡献，而是平滑衰减的体积核；翻译时应保留 `Gaussian` 和 `ellipsoid` 字面量。",
      "如果页面只有简短英文摘录，中文补强应提供阅读路线，而不是替官方定义发明新的公式；具体数值和数组布局仍以官方 schema 为准。",
    ],
    terms: [
      ["ParticleFieldKernelGaussianEllipsoidAPI", "粒子场高斯椭球 kernel API"],
      ["Gaussian ellipsoid", "高斯椭球"],
      ["volumetric support", "体积型支撑域"],
      ["anisotropic scale", "各向异性缩放"],
      ["basis function", "基函数"],
      ["Gaussian falloff", "高斯衰减"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html",
    title: "VolumeFieldBase",
    summary:
      "`VolumeFieldBase` 是所有 `UsdVol` field schema 的抽象基础类。它的作用是给 field provider prim 建立共同类型边界，使 `Volume` 可以通过 `field:*` relationships 连接到具体体积字段，而不是直接把本页理解成 OpenVDB 或 Field3D 文件格式。",
    notes: [
      "`VolumeFieldBase` 本身是 abstract schema；具体可用字段通常由 `OpenVDBAsset`、`Field3DAsset` 或自定义 field schema 提供。",
      "`Volume` 和 `VolumeFieldBase` 是两个层级：前者表示体积容器，后者及其派生 prim 表示可被关系引用的字段数据来源。",
      "自定义 UsdVol field schema 应直接或间接继承 `VolumeFieldBase`，这样工具链、schema 检查和 shader 输入才能识别它是合法 field provider。",
      "`field:*` relationships 是连接 `Volume` 与 field prim 的关键；中文导读应保留该命名形式，避免改成普通属性或路径说明。",
      "阅读本页时应把类型边界、关系连接和具体文件资产分开：base class 负责 schema 归类，asset schema 负责外部体积数据定位。",
    ],
    terms: [
      ["VolumeFieldBase", "体积字段抽象基础类"],
      ["UsdVol", "OpenUSD 体积 schema 模块"],
      ["Volume", "体积容器 schema"],
      ["field:* relationships", "field 命名空间关系"],
      ["OpenVDBAsset", "OpenVDB 体积资产 schema"],
      ["field provider", "体积字段提供者"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html",
    title: "ParticleFieldOrientationAttributeAPI",
    summary:
      "`ParticleFieldOrientationAttributeAPI` 为 `ParticleField` 提供逐粒子的 orientation data。它常用于 splat 或各向异性 kernel，让每个粒子的局部坐标系可以独立旋转；粒子数量、中心位置和尺寸仍分别由 position 与 scale 数据约束。",
    notes: [
      "orientation data 描述粒子或 splat 的朝向，不等价于 prim 级别的 `xformOp`；前者是 per-particle attribute，后者是场景层级变换。",
      "该 API 应与 `ParticleFieldPositionAttributeAPI`、`ParticleFieldScaleAttributeAPI` 和 kernel API 一起阅读，才能完整解释每个粒子的空间姿态。",
      "对于 Gaussian ellipsoid 或 surflet，orientation 会影响局部轴向如何映射到世界空间；若没有 orientation，通常只能按默认局部方向解释。",
      "orientation array 的元素数量应与 positions 等 per-particle arrays 对齐；这是数据一致性问题，不是渲染器随意插值的规则。",
      "中文层应保留 `orientation`、`ParticleFieldOrientationAttributeAPI`、`splat`、`per-particle` 等术语，方便和 schema 名称及工具属性匹配。",
    ],
    terms: [
      ["ParticleFieldOrientationAttributeAPI", "粒子场朝向属性 API"],
      ["orientation data", "朝向数据"],
      ["per-particle", "逐粒子"],
      ["splat", "粒子小片或溅射基元"],
      ["local frame", "局部坐标系"],
      ["xformOp", "prim 级变换操作"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html",
    title: "ParticleFieldScaleAttributeAPI",
    summary:
      "`ParticleFieldScaleAttributeAPI` 为 `ParticleField` 提供逐粒子的 scale factor data。它通常与 position、orientation 和 kernel API 一起决定每个粒子或 splat 的实际空间尺寸，而不是替代 prim 的整体 transform。",
    notes: [
      "scale data 是 per-particle attribute；它描述每个粒子本身的缩放，而不是把整个 `ParticleField` prim 作为一个对象统一缩放。",
      "对于 Gaussian ellipsoid，scale 往往决定各轴半径或支撑域大小；对于 surflet，scale 会影响局部圆盘或表面小片在世界空间中的尺寸。",
      "scale 数组应与 positions 数量对齐，否则不同粒子的尺寸数据无法可靠关联；这类检查属于 schema 数据一致性。",
      "scale 只改变 kernel 支撑域或 splat 尺寸，不定义 radiance、opacity 或颜色；这些视觉量由 radiance/opacity attribute API 管理。",
      "中文导读应区分 `scale factor data` 与 `xformOp:scale`：前者是粒子场特征数据，后者是 prim 变换栈中的变换操作。",
    ],
    terms: [
      ["ParticleFieldScaleAttributeAPI", "粒子场缩放属性 API"],
      ["scale factor data", "缩放因子数据"],
      ["kernel support", "kernel 支撑范围"],
      ["ParticleField", "粒子场"],
      ["xformOp:scale", "prim 级缩放变换"],
      ["opacity", "不透明度"],
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
