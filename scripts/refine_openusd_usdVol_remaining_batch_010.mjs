import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdVol-remaining-quality-pass-010";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html",
    title: "ParticleFieldKernelGaussianSurfletAPI",
    notes: [
      "GaussianSurflet kernel 在 XY 平面上定义 ParticleField 的高斯 surflet 贡献，离开 XY 平面的 opacity 定义为 0。",
      "未变换状态下，它使用 g(u=0;o=1;x=p.length()) 计算平面内 opacity；standard deviation 为 1，因此 3-sigma 点为 3.0。",
      "约 99.7% 的 splat support 位于 XY 平面半径 3 的圆盘内；per-splat opacity 会与 Gaussian falloff 相乘，形成平滑衰减。",
      "rotation 和 scale 会把 Gaussian disk kernel 变换成平面椭圆，position 则移动每个 splat 的峰值位置；数学符号和属性名保持英文原样。"
    ],
    terms: [
      ["Gaussian surflet kernel", "高斯 surflet 核"],
      ["XY plane", "XY 平面"],
      ["off-plane opacity", "离平面不透明度"],
      ["splat support", "splat 支持域"],
      ["Gaussian disk kernel", "高斯圆盘核"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html",
    title: "ParticleFieldPositionBaseAPI",
    notes: [
      "ParticleFieldPositionBaseAPI 定义 ParticleField position data 的基础 applied schema，positions 数量同时决定 ParticleField 中的 particle 数量。",
      "如果没有 position data，则 ParticleField 不包含粒子；这说明位置数据是粒子场存在性的基础，不只是一个可选属性。",
      "其他 per-particle data 会被调整到与 positions 数量一致：数据过多会 truncate，数据少于 positions 会 discard，并回退到默认值。",
      "该 base schema 也承担 validation 角色，确保定义 position 的 applied schema 总是在 ParticleField 上存在。"
    ],
    terms: [
      ["position data", "粒子位置数据"],
      ["number of particles", "粒子数量"],
      ["per-particle data", "逐粒子数据"],
      ["truncated", "截断"],
      ["default value", "默认值"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html",
    title: "ParticleFieldRadianceBaseAPI",
    notes: [
      "ParticleFieldRadianceBaseAPI 定义 ParticleField radiance definition data 的基础 applied schema，用来保证粒子场有明确的辐射度定义入口。",
      "它通常作为 ParticleField characteristics schemas 的 built-in applied schema 出现，表示具体特征 schema 需要携带 radiance 定义。",
      "官方摘录强调 validation：提供 radiance definitions 的 applied schema 必须存在，避免粒子场缺少辐射度相关数据约束。",
      "后续段落级翻译应继续补齐 radiance 与颜色、亮度、球谐或其他粒子属性之间的关系；本轮保留 radiance 等英文术语便于对照。"
    ],
    terms: [
      ["radiance definition data", "辐射度定义数据"],
      ["ParticleField characteristics schemas", "粒子场特征 schema"],
      ["built-in applied schema", "内建应用 schema"],
      ["radiance definitions", "辐射度定义"],
      ["validation", "验证约束"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/usdVol_toc.html",
    title: "Volumes (usdVol)",
    notes: [
      "本页是 usdVol schema 领域目录入口，覆盖 Volumes、Fields、Animated Field Data、Particle Fields 以及 Field3D/OpenVDB 等外部体积资源入口。",
      "建议先读 Overview、Working With Volumes 和 Working With Fields，再进入 Field3DAsset、OpenVDBAsset、Volume、VolumeFieldAsset 等具体 schema。",
      "Understanding fieldName and the Field’s Relationship Name 是理解 fieldName、field:* relationship 和 Volume 之间连接方式的关键入口。",
      "ParticleField 相关页面解释粒子场位置、kernel、opacity、orientation、radiance、scale、spherical harmonics 等逐粒子数据；目录中的 schema 名称保持英文原样。"
    ],
    terms: [
      ["usdVol", "USD 体积 schema 领域"],
      ["Volume", "体积 prim"],
      ["Field", "体积场"],
      ["fieldName", "字段名"],
      ["Particle Fields", "粒子场"]
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
