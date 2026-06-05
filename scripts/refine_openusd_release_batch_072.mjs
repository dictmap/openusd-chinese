import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-072";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/FieldBase.html",
    title: "FieldBase",
    notes: [
      "`FieldBase` 已 deprecated，官方建议改用 `VolumeFieldBase`；因此本页首先是迁移提示，而不是新项目应优先采用的体积场 schema。",
      "它仍继承 `Xformable` 与 `Imageable`，所以页面会列出 `xformOpOrder`、`proxyPrim`、`purpose`、`visibility` 等通用属性；这些属性描述场景中 prim 的变换与可见性，不是体积场数据本身。",
      "阅读时应把 `FieldBase` 和上一轮的 `FieldAsset` 区分开：`FieldBase` 是旧的 field 基类入口，`FieldAsset` 是旧的外部体积场资产入口；两者都应迁移到 `VolumeFieldBase`/`VolumeFieldAsset` 体系。",
      "本页没有复杂示例，关键价值是告诉维护者旧 schema 的兼容边界；后续段落级翻译应链接到 `VolumeFieldBase` 解释现代用法。",
      "中文层保留 `deprecated`、`VolumeFieldBase`、`Xformable`、`Imageable` 和属性名原文，便于与官方 API 和现有 USD 文件逐项核对。"
    ],
    terms: [
      ["FieldBase", "旧体积场基础 schema"],
      ["deprecated", "已弃用"],
      ["VolumeFieldBase", "现代体积场基础 schema"],
      ["Xformable", "可变换 prim 基类"],
      ["Imageable", "可显示 prim 基类"],
      ["visibility", "可见性属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/overview.html",
    title: "usdVol Overview",
    notes: [
      "`usdVol` 领域用于描述 volumes 和 volumetric data，常见效果包括 smoke、fire、稀疏体积场、随时间变化的体积数据以及 particle fields。",
      "概览页说明 `Volume` 通过 `field:*` relationships 引用离散体积 field；示例中的 `field:density = </Volume/densityVDB>` 把 Volume 的 density 语义连接到 `OpenVDBAsset` prim。",
      "`OpenVDBAsset` 和 `Field3DAsset` 是外部体积资源入口，`filePath` 指向具体文件，`fieldName` 指向文件内部 grid/field；这些路径和字段名应保持英文原样。",
      "`ParticleField` 系列用于空间计算和 lightfield/3D Gaussian splats 等技术；它和传统 OpenVDB/Field3D 体积资源不同，核心数据通常是逐粒子的属性数组。",
      "本页是 usdVol 阅读路线入口，应先理解 `Volume`、`Field`、`OpenVDBAsset`、`VolumeFieldAsset`、`ParticleField` 的分工，再进入具体属性页面。"
    ],
    terms: [
      ["usdVol", "USD 体积 schema 领域"],
      ["Volume", "体积 prim"],
      ["volumetric data", "体积数据"],
      ["field:* relationship", "体积字段关系"],
      ["OpenVDBAsset", "OpenVDB 体积资源 schema"],
      ["3D Gaussian splats", "三维高斯 splat"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleField.html",
    title: "ParticleField",
    notes: [
      "`ParticleField` 是描述 concrete ParticleField implementations 的基础 schema，例如 `ParticleField3DGaussianSplat`；如果要扩展自定义粒子场 schema，应从它继承。",
      "它是 concrete base schema，可以直接创建用于原型验证，但实际生产通常实例化派生类型，因为派生类型会提供更明确的 validation 和 renderer-adoption 路径。",
      "页面列出的 `Gprim`、`Boundable`、`Xformable`、`Imageable` 继承属性说明 ParticleField 仍是可渲染、可定界、可变换的场景 prim，而不只是裸数组数据。",
      "粒子数量、位置、opacity、orientation、scale、radiance 和 spherical harmonics 等通常由 applied API schema 补充；本页只定义粒子场的基础容器语义。",
      "阅读时应把 `ParticleField` 放在 usdVol 的 particle fields 分支中理解，并和 `Working With Particle Fields`、`ParticleField3DGaussianSplat` 及各个 AttributeAPI 页面一起核对。"
    ],
    terms: [
      ["ParticleField", "粒子场基础 schema"],
      ["concrete base schema", "可实例化基础 schema"],
      ["derived types", "派生类型"],
      ["renderer-adoption", "渲染器采用路径"],
      ["Gprim", "几何 prim 基类"],
      ["extent", "包围范围属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html",
    title: "ParticleField3DGaussianSplat",
    notes: [
      "`ParticleField3DGaussianSplat` 表示 original 3D Gaussian Splats technique 对应的粒子场类型，它继承 `ParticleField` 并组合一组 built-in schema 来描述 3DGS 所需数据。",
      "本页的核心是把训练得到的 splat 数据映射到 USD schema：位置、opacity、orientation、scale、radiance 或 spherical harmonics 等数据通常由相关 applied API 提供。",
      "`projectionModeHint` 和 `sortingModeHint` 属于 rendering hints，通常反映训练或渲染时采用的选择；它们提示渲染器如何投影和排序 splats，但最终支持程度取决于 consumer/renderer。",
      "继承属性中的 `extent`、`xformOpOrder`、`purpose` 和 `visibility` 仍然影响该粒子场在 USD 场景中的空间范围、变换和可见性。",
      "中文层保留 `3D Gaussian Splats`、`projectionModeHint`、`sortingModeHint`、`built-in schema` 等英文名，避免把论文术语或 token 名称翻译后失去可检索性。"
    ],
    terms: [
      ["ParticleField3DGaussianSplat", "三维高斯 splat 粒子场 schema"],
      ["3D Gaussian Splats", "三维高斯 splat 技术"],
      ["built-in schema", "内建 schema"],
      ["projectionModeHint", "投影模式提示"],
      ["sortingModeHint", "排序模式提示"],
      ["rendering hints", "渲染提示"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html",
    title: "ParticleFieldOpacityAttributeAPI",
    notes: [
      "`ParticleFieldOpacityAttributeAPI` 定义 ParticleField opacity data 的 applied schema，用于给每个粒子或 splat 提供不透明度数据。",
      "官方摘录强调 opacity 应在 `[0, 1]` 范围内，并按传统 linear computer graphics opacity 解释；它不是某些 Gaussian splats PLY 文件中需要 sigmoid activation function 处理的 transformed data。",
      "`opacities` 与 `opacitiesh` 分别提供 float 和 half 类型，便于在精度和数据 footprint 之间取舍；消费者如果两者都存在，应优先使用 float version。",
      "该页面适合和 `ParticleField3DGaussianSplat`、kernel 页面、orientation/scale/radiance/spherical harmonics AttributeAPI 一起读，形成完整的逐粒子数据模型。",
      "中文层保持 `opacities`、`opacitiesh`、`sigmoid activation function`、`float`、`half` 等术语原样，以免误改属性名或数据处理含义。"
    ],
    terms: [
      ["ParticleFieldOpacityAttributeAPI", "粒子场不透明度属性 API"],
      ["opacity data", "不透明度数据"],
      ["opacities", "float 不透明度数组"],
      ["opacitiesh", "half 不透明度数组"],
      ["linear computer graphics opacity", "线性计算机图形不透明度"],
      ["sigmoid activation function", "sigmoid 激活函数"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、属性/数学阅读路径、迁移或渲染边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, property and math reading paths, migration or rendering boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
