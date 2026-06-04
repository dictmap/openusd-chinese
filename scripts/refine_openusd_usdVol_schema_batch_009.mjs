import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdVol-schema-quality-pass-009";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/Field3DAsset.html",
    title: "Field3DAsset",
    notes: [
      "Field3DAsset 表示引用 Field3D volume field 的 USD Field schema，用于把外部 .f3d 文件中的体积场接入 USD 场景。",
      "官方摘录中的 density field 是典型体积通道示例；阅读时应保留 Field3D、density、.f3d 等英文标识，便于和外部文件及工具链对应。",
      "它的职责是描述外部体积数据资源的位置和字段选择，而不是直接把体素数据复制进当前 USD 文档。",
      "后续段落级翻译应继续补齐 fieldName、filePath、fieldIndex 等属性如何定位外部 Field3D 数据。"
    ],
    terms: [
      ["Field3DAsset", "Field3D 体积场资产"],
      ["Field3D volume field", "Field3D 体积场"],
      ["density field", "密度场"],
      [".f3d file", ".f3d 文件"],
      ["external volume data", "外部体积数据"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html",
    title: "OpenVDBAsset",
    notes: [
      "OpenVDBAsset 表示引用 OpenVDB volume grid 的 USD Field schema，用于把 .vdb 文件中的稀疏体积网格作为场景数据消费。",
      "官方示例同样引用 single density field；中文说明应把 OpenVDB grid、density field、.vdb 文件路径与 USD Field 概念分开讲清。",
      "它适合烟、雾、云、体积密度等数据工作流，USD 负责引用和组合，实际体积采样由下游渲染器或工具完成。",
      "后续精修应补齐 OpenVDBAsset 与 Field3DAsset 的差异：二者都是外部体积场入口，但底层文件格式和生态工具不同。"
    ],
    terms: [
      ["OpenVDBAsset", "OpenVDB 体积网格资产"],
      ["OpenVDB volume grid", "OpenVDB 体积网格"],
      [".vdb file", ".vdb 文件"],
      ["sparse volume", "稀疏体积"],
      ["density field", "密度场"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html",
    title: "ParticleFieldKernelBaseAPI",
    notes: [
      "ParticleFieldKernelBaseAPI 定义 ParticleField kernel data 的基础 applied schema，用于约束每个粒子的 spatial basis function。",
      "ParticleField kernel 决定每个粒子如何在空间中贡献场值；具体 kernel schema 通常会把该 base schema 作为 built-in applied schema。",
      "该 base schema 的重要作用是验证：任何定义 kernel data 的 applied schema 都应在 ParticleField 上存在，避免粒子场缺少空间基函数定义。",
      "后续段落级翻译应继续解释 kernel、splat、opacity、scale、rotation、position 等属性如何共同决定粒子场贡献。"
    ],
    terms: [
      ["ParticleFieldKernelBaseAPI", "粒子场 kernel 基础 API schema"],
      ["ParticleField", "粒子场"],
      ["spatial basis function", "空间基函数"],
      ["built-in applied schema", "内建应用 schema"],
      ["validation", "验证约束"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html",
    title: "ParticleFieldKernelConstantSurfletAPI",
    notes: [
      "ConstantSurflet kernel 在未变换状态下定义 XY 平面上的有界圆盘支持域：当 p.length <= 1 时 opacity 为 1.0，否则为 0.0。",
      "该 kernel 的 splat support 是半径 1 的圆盘；per-splat opacity 会与 step-function falloff 相乘，形成硬边界的局部贡献。",
      "rotation 和 scale 会把圆盘 kernel 变换为平面椭圆，position 则把 splat center 从原点移动到粒子位置。",
      "阅读时应保留 p.length、opacity、splat、rotation、scale、position 等英文属性和数学符号，中文层解释几何意义。"
    ],
    terms: [
      ["constant surflet kernel", "常量 surflet 核"],
      ["splat support", "splat 支持域"],
      ["bounded circular disk", "有界圆盘"],
      ["step-function falloff", "阶跃衰减"],
      ["planar ellipse", "平面椭圆"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html",
    title: "ParticleFieldKernelGaussianEllipsoidAPI",
    notes: [
      "GaussianEllipsoid kernel 用高斯椭球定义 ParticleField 的粒子贡献；未变换状态下根据 p.length() 计算高斯 opacity。",
      "官方说明 standard deviation 为 1，因此 3-sigma 点在 3.0，约 99.7% 的 splat support 位于半径 3 的球形区域内。",
      "per-splat opacity 会与 Gaussian falloff 相乘；rotation 和 scale 把高斯球 kernel 变成椭球，position 移动每个 splat 的峰值位置。",
      "该页适合理解软边界粒子场：与 ConstantSurflet 的硬边界不同，Gaussian falloff 会产生平滑衰减。"
    ],
    terms: [
      ["Gaussian ellipsoid kernel", "高斯椭球核"],
      ["standard deviation", "标准差"],
      ["3-sigma point", "三倍标准差点"],
      ["Gaussian falloff", "高斯衰减"],
      ["ellipsoid", "椭球"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令、属性名、数学符号和原文摘录继续保留，便于和官方 usdVol schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, property names, math notation, and source excerpts for comparison with the official usdVol schema documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
