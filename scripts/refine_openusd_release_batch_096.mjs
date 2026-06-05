import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-096";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html",
    title: "VolumeFieldAsset",
    notes: [
      "`VolumeFieldAsset` 是 `VolumeFieldBase` 的抽象子类，用来描述外部文件资产中的体积场数据；它本身通常不是最终具体文件格式，而是 `OpenVDBAsset`、`Field3DAsset` 或自定义文件型体积场 schema 的共同基类。",
      "`filePath` 指向外部体积文件，`fieldName` 指向文件内部字段名，`fieldIndex` 用于同名字段消歧，`fieldDataType` 描述字段数据类型，`vectorDataRoleHint` 为向量字段提供角色提示；这些属性应一起看。",
      "页面中的 “Understanding fieldName and the Field’s Relationship Name” 是关键上下文：`fieldName` 描述外部文件内部字段，`field:*` relationship 描述 `Volume` prim 与 field prim 的连接，两者不是同一个概念。",
      "阅读 `VolumeFieldAsset` 时应从 `Volume` -> `field:*` relationship -> `VolumeFieldBase` -> `VolumeFieldAsset` -> 具体文件格式 schema 的路径前进，避免直接把 `filePath` 当作 Volume 的唯一数据入口。",
      "中文层保留 `filePath`、`fieldName`、`fieldIndex`、`fieldDataType`、`vectorDataRoleHint`、`OpenVDBAsset` 和 `Field3DAsset` 原样，方便与官方 schema 属性表、USDA 和代码 API 对照。"
    ],
    terms: [
      ["VolumeFieldAsset", "体积场资产 schema"],
      ["external volumetric data", "外部体积数据"],
      ["fieldName", "文件内字段名"],
      ["field:* relationship", "field:* 关系"],
      ["fieldIndex", "字段索引"],
      ["vectorDataRoleHint", "向量数据角色提示"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/usdVol_toc.html",
    title: "Volumes (usdVol)",
    notes: [
      "`usdVol_toc.html` 是 `usdVol` schema 领域目录页，适合先建立阅读路线：先看 Overview，再看 Working With Volumes/Fields，最后进入 `Volume`、`FieldBase`、`VolumeFieldAsset`、`OpenVDBAsset` 和粒子场相关页面。",
      "`Volume` 表示可放进场景层级中的体积 prim；`Field`/`FieldBase` 表示体积数据字段；`VolumeFieldAsset`、`OpenVDBAsset`、`Field3DAsset` 处理外部文件型体积数据；三者职责不能混读。",
      "ParticleField 系列页面覆盖 point-based 或 splat-based 体积表达：位置、kernel、opacity、orientation、radiance、scale、spherical harmonics 等 API 分别描述逐粒子数据、核函数和渲染相关属性。",
      "目录页里的 schema 名称同时是页面名、API 名和检索关键词，应保留英文；中文导读的作用是说明哪些页面是概览、哪些页面是具体 schema、哪些页面是属性 API。",
      "如果目标是实现体积资产，推荐阅读顺序是 `overview` -> `Volume` -> `FieldBase` -> 文件型 field schema 或 `ParticleField` schema；如果目标是排查属性，应直接进入目标 schema 属性表。"
    ],
    terms: [
      ["usdVol", "USD 体积 schema 领域"],
      ["Volume", "体积 prim"],
      ["FieldBase", "场基类"],
      ["external field asset", "外部场资产"],
      ["ParticleField", "粒子场"],
      ["schema table of contents", "schema 目录页"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html",
    title: "UI (usdUI)",
    notes: [
      "`usdUI_toc.html` 是 `usdUI` schema 领域目录页，核心作用是把 UI hints、display groups、node graph UI、accessibility information 和 property/prim/object hints 组织成入口列表。",
      "`ObjectHints`、`PrimHints`、`PropertyHints`、`AttributeHints` 分别服务于不同粒度的 UI metadata；读者应先判断提示挂在对象、prim、property 还是 attribute 上，再进入对应页面。",
      "`AccessibilityAPI` 关注无障碍信息，`Backdrop`、`NodeGraphNodeAPI`、`SceneGraphPrimAPI` 关注节点图和场景图 UI 辅助；这些 schema 不改变核心 scene composition，只为工具和用户界面提供 metadata。",
      "usdUI 文档适合和具体 DCC 或编辑器工具一起理解：它让工具知道如何分组、显示、隐藏、标注或组织属性，而不是定义几何、材质、渲染或物理行为。",
      "中文层保留 `usdUI`、`ObjectHints`、`PropertyHints`、`AccessibilityAPI`、`Backdrop` 等英文 schema 名称，避免破坏 API 搜索和页面跳转。"
    ],
    terms: [
      ["usdUI", "USD UI schema 领域"],
      ["UI hints", "界面提示"],
      ["display groups", "显示分组"],
      ["accessibility information", "无障碍信息"],
      ["node graph UI", "节点图界面"],
      ["metadata schema", "元数据 schema"]
    ]
  },
  {
    output: "full_site/api/namespaces.html",
    title: "Namespace List",
    notes: [
      "`namespaces.html` 是 Doxygen namespace 维度的入口页，适合从 `pxr_tsl`、`ShaderMetadataHelpers`、`VdfTestUtils`、`std` 等 namespace 进入函数、typedef 和测试辅助类；它不是 class list 或 module front page。",
      "`pxr_tsl` 指向 robin_map/robin_set 相关容器实现，`ShaderMetadataHelpers` 指向 shader metadata parsing utilities，`VdfTestUtils` 指向构造 Vdf test network 的 helper classes；这些 namespace 的用途差异很大。",
      "在 `VdfTestUtils` 下看到 `CallbackNode`、`ExecutionStats`、`Network`、`Node`、`OutputAccessor` 等条目时，应理解它们是测试/辅助上下文中的 Vdf 网络对象，而不是生产 API 的主入口。",
      "如果用户按 namespace 查 API，本页很有价值；如果用户按类名查 API，应去 `annotated.html` 或 class 页面；如果按文件查符号，应去 `files.html` 或 File Members 索引。",
      "中文导读保留 namespace 和 class 名称原样，重点补充 namespace 列表的导航用途、与 class/file/module 索引的区别，以及测试辅助 namespace 的边界。"
    ],
    terms: [
      ["namespace list", "命名空间列表"],
      ["documented namespace", "已记录命名空间"],
      ["test utilities", "测试辅助工具"],
      ["shader metadata", "shader 元数据"],
      ["container namespace", "容器命名空间"],
      ["namespace navigation", "按命名空间导航"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html",
    title: "ParticleFieldKernelGaussianEllipsoidAPI",
    notes: [
      "`ParticleFieldKernelGaussianEllipsoidAPI` 是 `ParticleField` 的 kernel API，用高斯椭球描述每个粒子的贡献范围；它适合表示软边界、平滑衰减的 splat，而不是硬边界 surflet。",
      "未经过 scale/rotation 变换时，kernel 根据相对位置长度计算 Gaussian opacity；官方说明 standard deviation 为 1，因此 3-sigma point 在半径 3.0 附近，约 99.7% 的 support 位于该范围内。",
      "`orientation` 和 `scale` 会把默认高斯球变成椭球，`position` 移动每个 splat 的峰值位置，per-splat opacity 再与 Gaussian falloff 相乘；这些属性应和 ParticleField 的逐粒子数据 API 一起阅读。",
      "它和 `ParticleFieldKernelGaussianSurfletAPI` 的差异在于体积/表面贡献模型不同；和 `ParticleFieldKernelConstantSurfletAPI` 的差异在于是否使用 Gaussian falloff 与平滑衰减。",
      "中文层保留 `Gaussian ellipsoid kernel`、`standard deviation`、`3-sigma point`、`Gaussian falloff`、`splat support` 等英文术语，便于和渲染、点云、Gaussian splats 相关资料对照。"
    ],
    terms: [
      ["Gaussian ellipsoid kernel", "高斯椭球核"],
      ["standard deviation", "标准差"],
      ["3-sigma point", "三倍标准差点"],
      ["Gaussian falloff", "高斯衰减"],
      ["splat support", "splat 支撑范围"],
      ["soft boundary", "软边界"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补二次精修说明，重点解释 release schema 目录页、具体 schema 属性页、Doxygen namespace 列表和 ParticleField kernel API 的阅读路线、模块边界、属性语义、跨页跳转顺序和术语对照。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于与官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}. It explains reading paths, module boundaries, property semantics, cross-page navigation, and terminology for release schema table-of-contents pages, concrete schema property pages, Doxygen namespace lists, and ParticleField kernel APIs while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
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
