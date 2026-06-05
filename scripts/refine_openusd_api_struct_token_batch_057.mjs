import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-struct-token-quality-pass-057";

const refinements = [
  {
    output: "full_site/api/sparse_vectorized_input_traverser_8h.html",
    title: "sparseVectorizedInputTraverser.h File",
    notes: [
      "`sparseVectorizedInputTraverser.h File` 是 Vdf 执行网络相关 header 页，核心条目是 `VdfSparseVectorizedInputTraverser`。",
      "`VdfSparseVectorizedInputTraverser` 用于在 `VdfNetwork` 中做 output-to-input 方向的 sparse traversal，并以 vectorized 方式处理依赖输入；它不是普通容器遍历器。",
      "本页链接到 `connection_8h.html`、`masked_output_vector_8h.html`、`sparse_output_traverser_8h.html`、`exec_2vdf_2input_8h.html`、`mask_8h.html`、`masked_output_8h.html`、`exec_2vdf_2node_8h.html`、`exec_2vdf_2output_8h.html` 等 Vdf 基础结构。",
      "阅读顺序建议先看 `VdfSparseVectorizedInputTraverser` 类页，再回到 `VdfNetwork` 的 node/input/output/mask 概念；源码链接适合查模板实现和遍历状态，而不是先读。",
      "本地复刻中保留 source code、header include、directory 与 class 链接；清单内页面走本地路由，清单外 source/目录页按占位策略处理，官方原页链接仍单独保留。"
    ],
    terms: [
      ["VdfSparseVectorizedInputTraverser", "Vdf 稀疏向量化输入遍历器"],
      ["sparse traversal", "稀疏遍历"],
      ["output-to-input direction", "从输出到输入的方向"],
      ["VdfNetwork", "Vdf 执行网络"],
      ["masked output", "带掩码的输出"]
    ]
  },
  {
    output: "full_site/api/struct_hgi_sampler_desc.html",
    title: "HgiSamplerDesc Struct",
    notes: [
      "`HgiSamplerDesc Struct` 描述创建 GPU sampler 所需的属性，是 Hgi 图形接口里 texture sampling 配置的轻量数据结构。",
      "`magFilter`、`minFilter`、`mipFilter` 分别控制放大、缩小以及 mipmap 层级之间的过滤；它们决定采样区域与 texel/pixel 尺寸不一致时如何合并像素。",
      "`addressModeU`、`addressModeV`、`addressModeW` 是纹理坐标 U/V/W 方向的 wrapping modes；`borderColor` 用于 clamp 到边界外时的颜色。",
      "`enableCompare` 和 `compareFunction` 与 comparison sampler 相关，常见于 shadow map 或深度比较采样；`debugName` 可作为 GPU 调试标签。",
      "阅读时应把本页作为 sampler descriptor 查表页：先看 Detailed Description，再按 Member Data Documentation 查各字段，不要把它和 texture resource 本身混在一起。"
    ],
    terms: [
      ["HgiSamplerDesc", "Hgi 采样器描述"],
      ["GPU sampler", "GPU 采样器"],
      ["magFilter", "放大过滤"],
      ["minFilter", "缩小过滤"],
      ["addressMode", "纹理寻址模式"]
    ]
  },
  {
    output: "full_site/api/struct_usd_geom_tokens_type.html",
    title: "UsdGeomTokensType Class",
    notes: [
      "`UsdGeomTokensType Class` 是 `UsdGeomTokens` 的 Doxygen 结构体页，集中列出 USD Geometry schema 自动生成的 static `TfToken`。",
      "这些 token 来自模块 schema，既表示 property names，也包含 token 类型 schema builtin attributes 的 allowedTokens values；典型用途是用 `UsdPrim::GetAttribute()` 按名称高效取属性。",
      "本页条目非常多，应按几何领域分组阅读：点/速度相关如 `accelerations`、`angularVelocities`；mesh/curve 相关如 `basis`、`bezier`、`bilinear`、`catmullClark`、`catmullRom`；schema 类型如 `BasisCurves`、`Boundable`、`Camera`、`Capsule`、`Cone`。",
      "`allTokens` 汇总所有 token，便于注册、枚举或验证；具体 token 字面量必须保持英文原样，因为它们直接对应 USD scene description 中的属性名或允许值。",
      "阅读时先确认 token 属于属性名、allowed token 值还是 schema 类型名，再跳转到 `UsdGeomMesh`、`UsdGeomPrimvar`、`UsdGeomImageable`、`UsdGeomXformable` 等具体类页核对上下文。"
    ],
    terms: [
      ["UsdGeomTokens", "UsdGeom token 集合"],
      ["TfToken", "高效字符串 token"],
      ["allowedTokens", "允许 token 值"],
      ["property names", "属性名"],
      ["allTokens", "全部 token 列表"]
    ]
  },
  {
    output: "full_site/api/struct_usd_lux_tokens_type.html",
    title: "UsdLuxTokensType Class",
    notes: [
      "`UsdLuxTokensType Class` 是 `UsdLuxTokens` 的 token 集合页，覆盖 USD Lighting schema 中的光源类型、光链接、滤镜、输入属性和 allowed token 值。",
      "常见 schema/type token 包括 `CylinderLight`、`DiskLight`、`DistantLight`、`DomeLight`、`GeometryLight`、`RectLight`、`SphereLight`、`PluginLight`、`PluginLightFilter`。",
      "光链接相关 token 包括 `collection:lightLink:includeRoot`、`collection:shadowLink:includeRoot`、`collection:filterLink:includeRoot`，用于理解 light linking、shadow linking 和 filter linking 的 collection 行为。",
      "输入属性 token 多以 `inputs` 开头，例如 `inputsAngle`、`inputsColor`、`inputsColorTemperature`；这些 token 对应 `UsdLuxLightAPI`、`UsdLuxShapingAPI`、各类光源 schema 的 authored attributes。",
      "阅读时要保留 token 字面量原样，尤其是带冒号的 collection token 和带 schema 语义的 `consumeAndContinue`、`consumeAndHalt`、`automatic`、`independent` 等 allowed values。"
    ],
    terms: [
      ["UsdLuxTokens", "UsdLux token 集合"],
      ["light linking", "灯光链接"],
      ["shadow linking", "阴影链接"],
      ["LightAPI", "灯光 API"],
      ["inputsColor", "灯光颜色输入 token"]
    ]
  },
  {
    output: "full_site/api/struct_usd_physics_tokens_type.html",
    title: "UsdPhysicsTokensType Class",
    notes: [
      "`UsdPhysicsTokensType Class` 是 `UsdPhysicsTokens` 的 token 集合页，覆盖物理 schema 的属性名、API 多重应用模板名、碰撞近似、关节类型和单位相关 token。",
      "页面中的 `acceleration`、`angular`、`force`、`linear`、`kilogramsPerUnit` 等 token 与物理量或单位有关；`none`、`boundingCube`、`boundingSphere`、`convexHull`、`convexDecomposition`、`meshSimplification` 常用于碰撞近似或选项值。",
      "`drive_MultipleApplyTemplate_PhysicsDamping`、`drive_MultipleApplyTemplate_PhysicsStiffness`、`drive_MultipleApplyTemplate_PhysicsTargetPosition` 等条目来自 multiple-apply API 模板，用于 `UsdPhysicsDriveAPI` 这类可重复应用的 schema。",
      "关节和刚体相关链接包括 `UsdPhysicsRevoluteJoint`、`UsdPhysicsPrismaticJoint`、`UsdPhysicsSphericalJoint`、`UsdPhysicsJoint`、`UsdPhysicsRigidBodyAPI`、`UsdPhysicsArticulationRootAPI`、`UsdPhysicsMassAPI`。",
      "阅读时把 token 分为三类：直接属性名、allowed token 值、multiple-apply template 派生名；不要翻译 token 本身，否则会破坏 USD scene description 与 API 查找。"
    ],
    terms: [
      ["UsdPhysicsTokens", "UsdPhysics token 集合"],
      ["multiple-apply API", "多重应用 API"],
      ["collision approximation", "碰撞近似"],
      ["rigid body", "刚体"],
      ["articulation root", "关节系统根"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的页面定位、字段或 token 集合阅读方式、常见使用边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first page positioning, field or token reading guidance, common usage boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
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
