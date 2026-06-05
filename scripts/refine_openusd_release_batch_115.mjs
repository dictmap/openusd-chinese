import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-115";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html",
    title: "NodeGraphNodeAPI",
    summary:
      "`NodeGraphNodeAPI` 是 `usdUI` 中给 node graph 节点补充编辑器布局 metadata 的 applied API schema。本轮补强重点放在 `ui:nodegraph:node:*` 属性族的阅读边界：它们描述图编辑器中的节点位置、颜色、层叠和文档提示，不改变 `UsdShade` 或 MaterialX 节点的真实连接与求值。",
    notes: [
      "`ui:nodegraph:node:pos` 记录节点在图形编辑器中的二维布局坐标，便于 DCC tool 复现作者整理过的 node graph 视图；它不是 prim 的 `xformOp`，也不会移动 stage 中的几何体。",
      "`ui:nodegraph:node:displayColor` 是节点 UI 颜色提示，适合用来区分纹理、混合、输出等视觉分组；渲染结果仍由 shader prim、inputs、outputs 和 connections 决定。",
      "`ui:nodegraph:node:stackingOrder` 表达图界面中的相对深度或覆盖顺序，常和 `Backdrop` 一起阅读；它不等价于 composition strength、layer strength 或 namespace 排序。",
      "如果页面同时出现 `SceneGraphPrimAPI`、`Backdrop` 和 `NodeGraphNodeAPI`，可以按职责拆开：scene graph 显示名和分组、背景矩形分区、单个节点的布局 metadata。",
      "中文层应保留 `NodeGraphNodeAPI`、`node graph`、`ui:nodegraph:node:pos`、`displayColor`、`stackingOrder` 等字面量，方便用户在 schema 文件、USDA 示例和工具脚本中直接检索。",
    ],
    terms: [
      ["NodeGraphNodeAPI", "节点图节点 UI metadata API"],
      ["ui:nodegraph:node:pos", "节点图中的节点位置属性"],
      ["ui:nodegraph:node:displayColor", "节点图中的节点显示颜色"],
      ["ui:nodegraph:node:stackingOrder", "节点图中的节点层叠顺序"],
      ["Backdrop", "节点图背景分组 schema"],
      ["UsdShade", "USD 着色网络模块"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html",
    title: "ParticleFieldSphericalHarmonicsAttributeAPI",
    summary:
      "`ParticleFieldSphericalHarmonicsAttributeAPI` 描述 `ParticleField` 的 spherical harmonics radiance 属性数据。本轮补强重点是把 radiance base、degree、coefficient array 和每粒子数据布局分开说明，避免把球谐系数误读成普通颜色数组或单个体素属性。",
    notes: [
      "`ParticleFieldRadianceBaseAPI` 先建立 radiance definition 的存在性契约；`ParticleFieldSphericalHarmonicsAttributeAPI` 再说明以 spherical harmonics 形式存储 radiance 的具体属性。",
      "`degree` 控制球谐展开阶数，决定每个粒子需要多少 coefficient；翻译和导读时应保留 `degree` 字面量，不要把它写成普通数组长度。",
      "coefficients 通常按粒子和球谐项组织，阅读时要区分 per-particle 数据布局与整张 `ParticleField` 的 particle count；位置数量仍由 position schema 决定。",
      "该 API 适合表示随方向变化的 radiance，而不是只记录单一 RGB 值。若页面提到 spherical harmonics，中文说明应强调方向性辐射度近似。",
      "和 kernel API 对照阅读时，kernel 决定粒子影响的空间 basis function，spherical harmonics radiance 决定该粒子在方向域中的辐射度表达，两者互补而非替代。",
    ],
    terms: [
      ["ParticleFieldSphericalHarmonicsAttributeAPI", "粒子场球谐辐射度属性 API"],
      ["ParticleFieldRadianceBaseAPI", "粒子场辐射度基础 API"],
      ["spherical harmonics", "球谐函数"],
      ["degree", "球谐展开阶数"],
      ["coefficients", "球谐系数数组"],
      ["per-particle", "逐粒子"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html",
    title: "ParticleFieldPositionBaseAPI",
    summary:
      "`ParticleFieldPositionBaseAPI` 是 `ParticleField` position data 的基础 applied schema。它的核心阅读点是：positions 数量定义粒子数量，其他 orientation、scale、radiance、kernel 等特征数据需要与这个粒子数量保持一致。",
    notes: [
      "没有 position data 时，`ParticleField` 可被视为没有可枚举粒子；因此 position schema 是很多 particle-field characteristics schema 的基础入口。",
      "positions 描述粒子中心或锚点位置，但不描述粒子形状。形状和空间影响范围需要结合 `ParticleFieldKernelBaseAPI` 或具体 kernel API 阅读。",
      "当页面讨论 validation 时，应理解为多个 per-particle arrays 需要和 positions 数量对齐；这类规则属于 schema 数据一致性，不是渲染器采样算法本身。",
      "`ParticleFieldPositionBaseAPI` 是 base applied schema，具体 position attribute API 可能扩展数据存储细节；中文导读应保留 base/API 的层级关系。",
      "和 `OpenVDBAsset`、`Field3DAsset` 这类体积资产入口相比，`ParticleFieldPositionBaseAPI` 面向离散粒子场，不是直接引用栅格体积文件。",
    ],
    terms: [
      ["ParticleFieldPositionBaseAPI", "粒子场位置基础 API"],
      ["position data", "位置数据"],
      ["positions", "位置数组"],
      ["ParticleField", "粒子场"],
      ["characteristics schemas", "粒子场特征 schema"],
      ["validation", "数据一致性验证"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html",
    title: "ParticleFieldKernelBaseAPI",
    summary:
      "`ParticleFieldKernelBaseAPI` 是粒子场 kernel data 的基础 applied schema。本轮补强强调 kernel 的职责边界：它定义每个粒子的空间 basis function 入口，具体 kernel 形状和 falloff 由 Gaussian、surflet 或其他派生 API 表达。",
    notes: [
      "`ParticleFieldKernelBaseAPI` 不直接规定某个具体公式，而是为 particle field 声明 kernel data 存在这一层可验证契约。",
      "具体页面如 `ParticleFieldKernelGaussianEllipsoidAPI`、`ParticleFieldKernelGaussianSurfletAPI`、`ParticleFieldKernelConstantSurfletAPI` 才说明 ellipsoid、surflet 或 constant surflet 的实际形状语义。",
      "kernel data 决定粒子对空间的影响方式，position data 决定粒子在哪里；两者通常要一起阅读，不能只凭 kernel 推断粒子数量。",
      "如果 radiance 或 opacity API 同时存在，kernel 只是空间权重或支持域的一部分，颜色、透明度、方向性 radiance 仍由各自 attribute API 管理。",
      "中文补强应保留 `kernel`、`basis function`、`falloff`、`surflet` 等英文术语，避免把它们笼统翻成“滤波器”而丢失体积粒子语义。",
    ],
    terms: [
      ["ParticleFieldKernelBaseAPI", "粒子场 kernel 基础 API"],
      ["kernel data", "粒子 kernel 数据"],
      ["basis function", "基函数"],
      ["falloff", "衰减函数或衰减方式"],
      ["surflet", "表面小片 kernel"],
      ["Gaussian ellipsoid", "高斯椭球 kernel"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html",
    title: "ParticleFieldRadianceBaseAPI",
    summary:
      "`ParticleFieldRadianceBaseAPI` 定义粒子场 radiance definition data 的基础 applied schema。它不直接规定某一种 radiance 编码，而是为后续 spherical harmonics、常量辐射度或其他 radiance attribute API 提供共同入口。",
    notes: [
      "该页面的关键词是 radiance definition，而不是具体颜色模型。中文导读应说明它建立“粒子场有辐射度定义”这一层 schema 契约。",
      "若后续页面使用 `ParticleFieldSphericalHarmonicsAttributeAPI`，应先确认 radiance base 的语义，再解释 spherical harmonics degree 和 coefficients。",
      "radiance 描述辐射度或发光相关数据，opacity、scale、orientation、position 等属性由其他 API 负责；这些 per-particle 数据通常需要在粒子数量上对齐。",
      "它和 `VolumeLightAPI` 不同：`VolumeLightAPI` 面向体积对象作为光源的 applied API，`ParticleFieldRadianceBaseAPI` 面向粒子场中每粒子的 radiance 数据契约。",
      "本地复刻应保留 `radiance`、`ParticleFieldRadianceBaseAPI`、`ParticleFieldSphericalHarmonicsAttributeAPI` 等英文名，避免影响用户按 schema 名称交叉检索。",
    ],
    terms: [
      ["ParticleFieldRadianceBaseAPI", "粒子场辐射度基础 API"],
      ["radiance definition data", "辐射度定义数据"],
      ["radiance", "辐射度"],
      ["opacity", "不透明度"],
      ["VolumeLightAPI", "体积光应用 API"],
      ["spherical harmonics radiance", "球谐辐射度表示"],
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
