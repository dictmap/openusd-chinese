import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-117";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/Field3DAsset.html",
    title: "Field3DAsset",
    summary:
      "`Field3DAsset` 用于把 `UsdVol` field prim 指向外部 `.f3d` Field3D 体积数据。阅读本页时，应把它理解为文件型体积字段的定位 schema：`filePath` 指向资产文件，`fieldName`、`fieldDataType` 和 `fieldPurpose` 帮助消费端识别具体字段及其用途。",
    notes: [
      "本页的核心不是把 voxel 数据内嵌到 USD 中，而是在 USD 场景里声明一个可被 `Volume` 的 `field:*` relationship 引用的 Field3D 数据来源。",
      "`filePath` 可以带时间采样，因此同一个 field prim 可以随时间切换或更新外部 `.f3d` 文件；中文导读应保留 time-sampled asset path 的含义。",
      "`fieldName` 用来匹配 Field3D 文件内部的字段名，`fieldDataType` 描述字段数据类型，`fieldPurpose` 描述用途；三者共同影响渲染器或工具如何解释该字段。",
      "与 `OpenVDBAsset` 相比，本页面面向 Field3D 文件格式；两者都属于外部体积数据引用，但格式、内部字段定位方式和工具链支持不同。",
      "排查加载问题时，先确认 `filePath` 是否可解析，再确认 `.f3d` 内部字段名、数据类型和用途是否与下游 renderer、shader 或体积绑定一致。",
    ],
    terms: [
      ["Field3DAsset", "Field3D 体积资产 schema"],
      ["Field3D", "Field3D 体积文件格式"],
      ["filePath", "外部文件路径属性"],
      ["fieldName", "文件内部字段名"],
      ["fieldDataType", "字段数据类型"],
      ["fieldPurpose", "字段用途"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html",
    title: "OpenVDBAsset",
    summary:
      "`OpenVDBAsset` 用于把 `UsdVol` field prim 连接到外部 `.vdb` OpenVDB 稀疏体积网格。它通常通过 `filePath` 定位文件，并通过 `fieldName` 或 `fieldIndex` 选择文件中的具体 grid；`fieldDataType` 则帮助消费端理解 grid 的数据类型。",
    notes: [
      "`OpenVDBAsset` 是文件型体积字段 schema，不是 `Volume` 容器本身；`Volume` 仍需要通过 `field:*` relationship 引用该 field prim。",
      "`fieldName` 适合按 grid 名称定位，`fieldIndex` 适合按索引定位；如果两者和实际 `.vdb` 内容不匹配，渲染器可能找不到预期体积字段。",
      "`filePath` 支持资产路径语义，也可能随时间采样；翻译时不要把它简化成静态字符串路径，以免丢失 animated volume sequence 的阅读线索。",
      "OpenVDB 是稀疏体积表示，适合烟雾、云、雾、液体 signed distance field 等数据；本页只声明连接方式，具体网格语义仍由文件内容和字段属性决定。",
      "与 `Field3DAsset` 对照阅读时，重点区分外部文件格式和字段选择机制：`.vdb` 常见 grid name/index，`.f3d` 常见 Field3D field name/purpose。",
    ],
    terms: [
      ["OpenVDBAsset", "OpenVDB 体积资产 schema"],
      ["OpenVDB", "OpenVDB 稀疏体积格式"],
      ["VDB grid", "VDB 网格"],
      ["fieldIndex", "字段索引"],
      ["fieldName", "字段名"],
      ["sparse volume", "稀疏体积"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html",
    title: "VolumeFieldAsset",
    summary:
      "`VolumeFieldAsset` 是面向外部文件型体积字段的抽象基础 schema。它从 `VolumeFieldBase` 继承体积字段身份，并为 `OpenVDBAsset`、`Field3DAsset` 或自定义文件型 field schema 提供共同的资产路径与字段描述边界。",
    notes: [
      "本页应按 base class 读取：它说明 file-backed volume field 的共同接口，而不是指定某一种具体文件格式的完整加载规则。",
      "只设置 `filePath` 并不等于已经定义完整体积语义；具体 schema 仍需要说明如何在文件中选择 field、grid 或数据通道。",
      "`VolumeFieldBase` 负责让 prim 成为合法 field provider，`VolumeFieldAsset` 进一步强调该 field 来自外部资产文件。",
      "典型连接链路是 `Volume` 通过 `field:*` relationship 指向某个 `VolumeFieldAsset` 派生 prim，再由派生 schema 解释具体文件内容。",
      "阅读自定义扩展时，可以把本页作为判断标准：如果 field 数据来自外部文件，并且需要被 `Volume` 引用，通常应沿用这个 schema 家族的边界。",
    ],
    terms: [
      ["VolumeFieldAsset", "文件型体积字段资产基类"],
      ["VolumeFieldBase", "体积字段抽象基类"],
      ["file-backed field", "外部文件驱动字段"],
      ["field provider", "体积字段提供者"],
      ["Volume", "体积容器 schema"],
      ["field:* relationship", "field 命名空间关系"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html",
    title: "ParticleFieldPositionAttributeAPI",
    summary:
      "`ParticleFieldPositionAttributeAPI` 为 `ParticleField` 提供逐粒子的 position data。它是粒子体积表示的基础数据之一：位置数组通常决定粒子或 splat 的中心点集合，并与 opacity、radiance、scale、orientation 和 kernel API 一起构成完整的粒子场解释。",
    notes: [
      "本页关注 per-particle position attribute，而不是 prim 级别的 transform；它描述每个粒子或 splat 在数据空间中的中心位置。",
      "position array 的元素数量通常是其他 per-particle arrays 对齐的基准；opacity、radiance、scale、orientation 等数组应与位置数据保持一致。",
      "坐标语义需要结合 `ParticleField` prim 所在的场景层级和任何上层变换理解；不要把 per-particle position 误读成最终世界空间坐标的唯一来源。",
      "如果与 kernel API 一起阅读，position 给出中心，kernel 给出贡献形状或支撑域，scale/orientation 调整支撑域尺寸和朝向。",
      "排查可视化异常时，先检查 position 数组是否存在、长度是否正确，再检查 opacity/radiance/kernel 是否让这些位置产生可见贡献。",
    ],
    terms: [
      ["ParticleFieldPositionAttributeAPI", "粒子场位置属性 API"],
      ["position data", "位置数据"],
      ["per-particle", "逐粒子"],
      ["splat", "粒子小片或溅射基元"],
      ["kernel", "核或支撑函数"],
      ["array alignment", "数组对齐"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html",
    title: "ParticleFieldOpacityAttributeAPI",
    summary:
      "`ParticleFieldOpacityAttributeAPI` 为 `ParticleField` 提供逐粒子的 opacity data。它描述每个粒子或 splat 对不透明度、密度或可见贡献的控制量，应与 position、kernel、radiance、scale 和 orientation 等粒子属性一起阅读。",
    notes: [
      "opacity data 是 per-particle 属性，不等同于 prim 的 `visibility`，也不等同于材质网络里的整体 transparency 控制。",
      "opacity 数组应与 position 数组对齐；如果某个粒子有位置但没有对应 opacity，消费端需要依赖 schema 默认值或工具约定，结果可能不一致。",
      "与 `ParticleFieldRadianceBaseAPI` 对照时，opacity 更偏向遮蔽、密度或贡献强度，radiance 更偏向发光或颜色能量；中文导读应把两者分开。",
      "kernel API 决定 opacity 如何在空间中分布或衰减；同一 opacity 值在 ellipsoid kernel 和 surflet kernel 下会产生不同空间贡献。",
      "调试不可见粒子时，应同时检查 opacity 值、position 数组、kernel 支撑域、scale/orientation 数据以及 renderer 是否支持该粒子场 schema。",
    ],
    terms: [
      ["ParticleFieldOpacityAttributeAPI", "粒子场不透明度属性 API"],
      ["opacity data", "不透明度数据"],
      ["visibility", "prim 可见性属性"],
      ["radiance", "辐射亮度或发光贡献"],
      ["density", "密度"],
      ["kernel support", "kernel 支撑域"],
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
