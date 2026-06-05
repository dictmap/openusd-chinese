import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-118";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/overview.html",
    title: "usdVol Overview",
    summary:
      "usdVol 概览页是体积、外部体积场和粒子场 schema 的阅读入口。它把 `Volume` 容器、`field:*` relationships、`OpenVDBAsset` / `Field3DAsset` 文件引用，以及 `ParticleField` / 3D Gaussian splats 这些较新的粒子场能力放在同一个领域图中说明。",
    notes: [
      "阅读顺序建议从 `Volume` 开始：先理解它只是可渲染体积容器，再通过 `field:*` relationship 连接到实际 field provider prim。",
      "OpenVDB 和 Field3D 是外部体积文件来源；它们解释稀疏体积数据如何进入 USD 场景，但不替代 `Volume` 的场景层级、变换、材质绑定和 purpose 语义。",
      "`ParticleField` 分支服务于逐粒子数据和 3D Gaussian splats 等空间计算场景，和传统 grid-based volume fields 属于同一 usdVol domain 下的不同表示方式。",
      "概览示例中的 `field:density = </Volume/densityVDB>` 是关键桥梁：relationship 名称会被 renderer 或 shader 解释为具体体积输入名。",
      "如果要扩展 usdVol，应先判断新增数据源是 grid/file-based field、procedural field，还是 per-particle field；不同方向应继承不同 schema 家族。",
    ],
    terms: [
      ["usdVol", "OpenUSD 体积 schema 领域"],
      ["Volume", "可渲染体积容器"],
      ["field:* relationship", "体积字段关系"],
      ["OpenVDBAsset", "OpenVDB 外部体积资产"],
      ["Field3DAsset", "Field3D 外部体积资产"],
      ["ParticleField", "粒子场 schema"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/FieldBase.html",
    title: "FieldBase",
    summary:
      "`FieldBase` 是旧的体积 field 基类入口，官方已经标注为 deprecated，并建议改用 `VolumeFieldBase`。因此本页的中文导读重点是兼容和迁移：维护旧 USD 文件时识别它，新建 schema 时转向现代 `VolumeFieldBase` / `VolumeFieldAsset` 体系。",
    notes: [
      "`FieldBase` 不应作为新资产或新 schema 的首选基础类；它主要帮助读者理解历史文件和旧工具输出。",
      "迁移时要同时检查旧 `FieldBase` 派生 prim 和旧 `FieldAsset` 用法，因为现代结构通常拆成 `VolumeFieldBase` 身份和 `VolumeFieldAsset` 文件型资产边界。",
      "即使本页很短，也要保留 `deprecated` 原文；这是兼容性和 API 生命周期信息，不能被翻译成普通的“较旧”而弱化。",
      "旧 field prim 仍可能被 `Volume` 的 `field:*` relationships 引用；迁移不能只改类名，还要确认 relationship target、字段名和 shader 输入映射。",
      "中文层应把 `FieldBase` 和 `VolumeFieldBase` 的差异说清楚：前者是历史兼容入口，后者是当前体积字段基类。",
    ],
    terms: [
      ["FieldBase", "旧体积字段基类"],
      ["deprecated", "已弃用"],
      ["VolumeFieldBase", "现代体积字段基类"],
      ["FieldAsset", "旧文件型字段资产"],
      ["VolumeFieldAsset", "现代文件型体积字段资产"],
      ["migration", "迁移"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html",
    title: "ParticleField3DGaussianSplat",
    summary:
      "`ParticleField3DGaussianSplat` 是面向原始 3D Gaussian Splats technique 的具体 `ParticleField` 派生 schema。它不是泛泛的点云容器，而是组合 position、scale、orientation、opacity、radiance 和 kernel 等内建 applied schema 来表达 3DGS 所需数据。",
    notes: [
      "本页的关键短语是 original 3D Gaussian Splats technique；翻译时应保留 `3D Gaussian Splats` / `3DGS`，避免改写成普通粒子渲染或点云。",
      "`ParticleField3DGaussianSplat` 继承自 `ParticleField`，但提供更具体的验证和 renderer adoption 路径；实际项目通常应实例化它而不是裸 `ParticleField`。",
      "3DGS 数据需要多组 per-particle arrays 对齐：position 给中心，scale/orientation 给椭球姿态，opacity/radiance 给视觉贡献，kernel 定义空间支撑。",
      "如果某些属性 API 缺失，schema 可能仍能被解析，但 renderer 是否能可靠采用取决于具体验证规则和渲染后端支持。",
      "本页应和 `ParticleFieldPositionAttributeAPI`、`ParticleFieldOpacityAttributeAPI`、kernel API 与 radiance API 一起阅读，才能形成完整数据模型。",
    ],
    terms: [
      ["ParticleField3DGaussianSplat", "3D Gaussian Splat 粒子场 schema"],
      ["3DGS", "三维高斯溅射表示"],
      ["per-particle arrays", "逐粒子数组"],
      ["radiance", "辐射亮度或发光贡献"],
      ["opacity", "不透明度"],
      ["renderer adoption", "渲染器采用支持"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleField.html",
    title: "ParticleField",
    summary:
      "`ParticleField` 是 usdVol 中粒子场表示的 concrete base schema。它可用于原型和自定义扩展，但实际 3DGS 等工作流通常会使用派生类型，例如 `ParticleField3DGaussianSplat`，以获得更清晰的数据约束、验证路径和渲染器采用边界。",
    notes: [
      "`ParticleField` 是 concrete base schema，意味着可以创建该 prim 做原型，但页面也明确提示实践中更推荐实例化具体派生类型。",
      "它继承 `Gprim`、`Boundable`、`Xformable` 和 `Imageable`，所以仍是场景 prim：可以参与变换、定界、可见性、purpose 和渲染流程。",
      "粒子场的关键数据通常来自 applied schema 提供的 per-particle attributes，而不是直接由 `ParticleField` 一个类包办所有属性。",
      "自定义粒子场 schema 应从 `ParticleField` 继承，以便工具链知道这是 usdVol 粒子场家族的一员，而不是普通点集或网格。",
      "阅读时要区分 `ParticleField`、`Volume` 和 `PointInstancer`：三者都可能与大量空间样本有关，但 schema 语义和渲染解释完全不同。",
    ],
    terms: [
      ["ParticleField", "粒子场基础 schema"],
      ["concrete base schema", "可实例化基础 schema"],
      ["Gprim", "几何图元基类"],
      ["Boundable", "可定界 schema"],
      ["applied schema", "可应用 schema"],
      ["PointInstancer", "点实例化器"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/Volume.html",
    title: "Volume",
    summary:
      "`Volume` 是 usdVol 中用于表达 smoke、fire 等体积效果的可渲染容器 prim。它自身负责场景层级、变换、材质绑定、purpose 和可见性等图元能力；真正的体积字段数据则通过 `field:*` relationships 指向 `VolumeFieldBase` 派生 prim。",
    notes: [
      "`Volume` 继承 `Gprim` 和 `Imageable`，因此它不是单纯的数据句柄，而是能参与渲染、变换、材质绑定和可见性控制的场景对象。",
      "体积数据通过 relationship 连接，而不是作为普通属性直接写在 `Volume` 上；这让一个 Volume 可以组织多个命名 field，如 `density`、`extinction` 或自定义输入。",
      "`field:*` relationship 的后缀名通常与 volume shader 的输入名对应，renderer 会据此把具体 field provider 绑定到 shader 参数。",
      "示例中的 `OpenVDBAsset` 子 prim 是一种 field provider；同样的 `Volume` 也可以引用 `Field3DAsset` 或其他 `VolumeFieldBase` 派生 prim。",
      "调试体积不可见时，需要分层检查：`Volume` 可见性和材质绑定、`field:*` target、外部文件路径、field name，以及 renderer 对该 field schema 的支持。",
    ],
    terms: [
      ["Volume", "可渲染体积容器"],
      ["Gprim", "几何图元基类"],
      ["Imageable", "可成像 schema"],
      ["field:extinction", "extinction 体积字段关系"],
      ["volume shader", "体积着色器"],
      ["field provider", "体积字段提供者"],
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
