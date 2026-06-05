import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-097";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html",
    title: "ParticleFieldKernelGaussianSurfletAPI",
    summary:
      "`ParticleFieldKernelGaussianSurfletAPI` 定义 `ParticleField` 的 Gaussian surflet kernel。它不是三维体积椭球，而是在 XY plane 上给出带 Gaussian falloff 的平面 splat: 离开 XY plane 的 opacity 为 0，未变换状态下 3-sigma point 位于半径 3.0 的圆盘边界附近。",
    notes: [
      "阅读时先抓住两个限定: `surflet` 表示表面型贡献，`Gaussian` 表示从中心向外平滑衰减。它适合描述软边界的平面 splat，而不是完整体积核。",
      "官方原文里的 `g(u=0;o=1;x = p.length())` 保留了计算语义: 在 XY plane 上根据点 `p` 到中心的距离计算 falloff，离开平面后直接为 0。",
      "`orientation` 和 `scale` 会把默认圆盘变成平面椭圆，`position` 移动 peak falloff 的中心，per-splat opacity 再与 Gaussian falloff 相乘；这些属性应和 position、orientation、scale、opacity 系列 API 一起读。",
      "和 `ParticleFieldKernelGaussianEllipsoidAPI` 对比时，关键差别是平面 surflet 与体积 ellipsoid；和 `ParticleFieldKernelConstantSurfletAPI` 对比时，关键差别是平滑 Gaussian falloff 与硬边界 step-function falloff。",
      "实现或调试 Gaussian splat 渲染时，本页的术语应保持英文原样: `XY plane`、`Gaussian falloff`、`3-sigma point`、`splat support`、`per-splat opacity`，以免和渲染器或论文中的同名概念错位。"
    ],
    terms: [
      ["Gaussian surflet kernel", "高斯表面元核"],
      ["XY plane", "XY 平面"],
      ["off-plane opacity", "离开平面后的不透明度"],
      ["3-sigma point", "三倍标准差位置"],
      ["splat support", "splat 支撑范围"],
      ["planar ellipse", "平面椭圆"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html",
    title: "ParticleFieldKernelConstantSurfletAPI",
    summary:
      "`ParticleFieldKernelConstantSurfletAPI` 定义 `ParticleField` 的 constant surflet kernel。未变换时，它在 XY plane 的单位圆盘内给出固定 opacity 1.0，圆盘外为 0.0，是一个硬边界的平面 splat 支撑模型。",
    notes: [
      "本页的 `constant` 不表示所有粒子属性都固定，而是 kernel 的 falloff 采用 step-function: 圆盘内为 1.0，圆盘外为 0.0。",
      "未变换状态的支撑范围是 XY plane 上半径 1 的 bounded circular disk；`rotation` 和 `scale` 会把该圆盘变成平面椭圆，`position` 则移动 splat center。",
      "per-splat opacity 仍然是乘法因子，它会和 step-function falloff 相乘；因此 opacity 数据 API 和 kernel API 分工不同，不能把 kernel 误读成所有透明度数据来源。",
      "和 `GaussianSurfletAPI` 相比，本页更适合理解硬边界或掩码式 surflet；和 `GaussianEllipsoidAPI` 相比，本页仍然是平面贡献，不是三维椭球贡献。",
      "如果目标是复核视觉差异，优先比较 `radius 1 disk`、`step-function falloff`、`planar ellipse` 与 `Gaussian falloff` 这些词，而不是只看页面标题中的 `ParticleFieldKernel`。"
    ],
    terms: [
      ["constant surflet kernel", "常量表面元核"],
      ["step-function falloff", "阶跃式衰减"],
      ["bounded circular disk", "有界圆盘"],
      ["splat center", "splat 中心"],
      ["identity position, scale, rotation, opacity", "未变换的默认 position/scale/rotation/opacity"],
      ["hard support boundary", "硬支撑边界"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html",
    title: "ParticleFieldPositionBaseAPI",
    summary:
      "`ParticleFieldPositionBaseAPI` 是粒子位置数据的 base applied schema。它的核心语义是: positions 数量决定 `ParticleField` 的粒子数量；没有 position data 时，`ParticleField` 被视为没有粒子。",
    notes: [
      "本页应优先读作粒子计数和对齐规则，而不是普通 transform 说明。`position data` 是 per-particle 数据的基准轴，其他 per-particle data 会按 positions 数量截断、丢弃或回退默认值。",
      "如果 scale、orientation、opacity、radiance 等数组比 positions 多，多出的数据会被截断；如果比 positions 少，则该类 per-particle data 被丢弃并使用默认值。这是验证和调试粒子场时最容易忽略的行为。",
      "`ParticleFieldPositionBaseAPI` 通常作为 characteristics schemas 的 built-in applied schema 出现，目的是让 validation 能确认定义 position 的 applied schema 总是存在。",
      "位置数组决定粒子存在性，但 kernel API 决定每个粒子的空间 basis function；因此 `PositionBaseAPI` 和 `ParticleFieldKernelBaseAPI` 是互补关系，不应互相替代。",
      "中文导读保留 `position data`、`ParticleField`、`per-particle data`、`built-in applied schema` 和 `validation` 等英文术语，便于和 schema 属性表及验证报错文本逐项对应。"
    ],
    terms: [
      ["position data", "位置数据"],
      ["per-particle data", "逐粒子数据"],
      ["particle count", "粒子数量"],
      ["truncated", "被截断"],
      ["discarded", "被丢弃"],
      ["built-in applied schema", "内建应用 schema"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderVar.html",
    title: "RenderVar",
    summary:
      "`RenderVar` 描述渲染器产生的一种数据量或 channel，也常称为 AOV。它可以表示 color、alpha、depth、normal、LPE、ID 或 renderer-specific 输出，并通过 `RenderProduct` 和 `RenderSettings` 进入最终渲染输出配置。",
    notes: [
      "`RenderVar` prim 的名字会驱动渲染输出里的变量名，例如名为 `alpha` 的 RenderVar 通常表示输出 alpha channel；但 USD 尚未强制统一的 RenderVar 名称和格式，因此 renderer-specific RenderVars 是预期行为。",
      "`sourceName` 描述数据来源名称，例如 shader 输出 `Ci`、alpha `a`、renderer 输出或 LPE 字符串；`sourceType` 用来说明来源类别，例如 `lpe`；`dataType` 则帮助声明输出数据类型。",
      "示例中的 `directDiffuse` 使用 `C<RD>[<L.>O]` 这类 light path expression。中文层必须保留 LPE 字符串原样，因为任意空格、大小写或符号变化都可能改变渲染器解释。",
      "`RenderVar` 本身不是图像文件，也不是 `RenderProduct`。它定义要计算的变量；`RenderProduct` 定义输出产品；`RenderSettings` 聚合相机、分辨率、产品和相关渲染配置。",
      "复查 usdRender 页面时，建议按 `RenderSettingsBase`、`RenderSettings`、`RenderProduct`、`RenderVar` 的关系阅读: 前者组织渲染作业，`RenderVar` 负责具体输出变量的语义。"
    ],
    terms: [
      ["RenderVar", "渲染输出变量"],
      ["AOV", "任意输出变量"],
      ["sourceName", "来源名称"],
      ["sourceType", "来源类型"],
      ["dataType", "数据类型"],
      ["light path expression", "光线路径表达式"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html",
    title: "ParticleFieldKernelBaseAPI",
    summary:
      "`ParticleFieldKernelBaseAPI` 是粒子场 kernel data 的 base applied schema。它定义每个粒子的 spatial basis function 是否存在这一层契约，具体形状则由 Gaussian ellipsoid、Gaussian surflet、constant surflet 等派生 kernel API 说明。",
    notes: [
      "`ParticleFieldKernelBaseAPI` 的重点不是给出某个具体 falloff 公式，而是建立 validation 契约: `ParticleField` 的 characteristics schemas 通常内建一个定义 kernel data 的 applied schema。",
      "`kernel` 决定粒子对空间的贡献函数，`position` 决定贡献中心，`scale` 和 `orientation` 变换贡献形状，`opacity`、`radiance` 和 spherical harmonics 系列 API 提供渲染相关逐粒子数据。",
      "当页面链接到具体 kernel 页面时，应按 base-to-specialized 的顺序理解: 先确认 kernel data 必须存在，再进入 `ParticleFieldKernelGaussianEllipsoidAPI`、`ParticleFieldKernelGaussianSurfletAPI` 或 `ParticleFieldKernelConstantSurfletAPI` 比较形状和 falloff。",
      "如果验证失败提示缺少 kernel schema，本页比具体 kernel 公式更重要；如果视觉结果不对，通常需要再检查具体 kernel 页面、position 数组、scale/orientation 数据和 opacity 数据是否匹配。",
      "中文层保留 `spatial basis function`、`applied schema`、`characteristics schemas`、`ParticleField kernel` 等英文术语，避免把 kernel 误译成一般图像滤波器或卷积核。"
    ],
    terms: [
      ["ParticleField kernel", "粒子场核"],
      ["kernel data", "核数据"],
      ["spatial basis function", "空间基函数"],
      ["base applied schema", "基础应用 schema"],
      ["characteristics schemas", "特征 schema"],
      ["validation contract", "验证契约"]
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
  results
}, null, 2));
