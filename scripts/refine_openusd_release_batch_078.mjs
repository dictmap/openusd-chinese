import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-078";

const refinements = [
  {
    output: "full_site/api/functions_vars_l.html",
    title: "Class Members - Variables - L",
    notes: [
      "这是 Doxygen `Class Members - Variables` 的 L 字母段，适合按变量名首字母查找 member variables，不应当按模块教程或完整类说明来阅读。",
      "本页最有价值的线索是 Pcp relocation 和 layer stack 相关变量，例如 `PcpErrorInvalidAuthoredRelocation`、`PcpErrorInvalidConflictingRelocation` 与 `LayerStackSite`。",
      "`UsdPhysics*JointDesc`、`UsdPhysicsRigidBodyDesc` 和 `UsdPhysicsShapeDesc` 条目属于物理描述结构；它们出现在同一字母页，只是因为变量名或字段名落在 L 段。",
      "多组 `Usd*TokensType` 条目表示 schema token 常量，阅读时应保留英文 token/API 名称，并按 domain 回到对应 schema 页面核对含义。",
      "如果需要具体签名、字段类型或注释，应从本页链接进入目标类页面；本页本身只承担 cross-reference index 的导航作用。"
    ],
    terms: [
      ["Class Members - Variables", "类成员变量索引"],
      ["letter bucket", "按首字母分组"],
      ["Pcp relocation", "Pcp 重定位"],
      ["LayerStackSite", "层栈位置"],
      ["TokensType", "schema token 类型表"],
      ["cross-reference index", "交叉引用索引"]
    ]
  },
  {
    output: "full_site/api/functions_p.html",
    title: "Class Members - P",
    notes: [
      "`functions_p.html` 是全部 documented class members 的 P 字母段，混合包含类型、函数、构造相关条目和数据成员，不限于 variables。",
      "Sdf/Pcp 相关条目如 `SdfPathTable`、`SdfPredicateExpression::FnCall`、`PcpArc`、`PcpMapFunction` 和 `PcpLayerStackIdentifier` 指向路径、谓词和 composition 主题。",
      "Sdr/UsdShade 条目如 `SdrRegistry`、`SdrParserPlugin`、`UsdShadeShaderDefParserPlugin`、`UsdShadeMaterial` 适合作为 shader discovery 与 material definition 的查找入口。",
      "UsdVol 粒子场条目集中出现，说明 P 段也是 `ParticleField*` schema 的快速入口；不要把这些条目理解为同一模块的单篇教程。",
      "阅读顺序建议是先按成员名定位，再跳到具体 class documentation；本页保留英文符号名是为了和官方 Doxygen URL、搜索结果和 C++ API 一致。"
    ],
    terms: [
      ["Class Members", "类成员总索引"],
      ["P bucket", "P 字母段"],
      ["SdfPathTable", "Sdf 路径表"],
      ["PcpArc", "Pcp 组合弧"],
      ["SdrRegistry", "Sdr 注册表"],
      ["ParticleField", "粒子场 schema 家族"]
    ]
  },
  {
    output: "full_site/api/functions_vars_m.html",
    title: "Class Members - Variables - M",
    notes: [
      "这是 member variables 的 M 字母段，变量所属模块跨度很大，包括 Pcp composition、Hydra 表示、UsdPhysics 描述结构和多 domain tokens。",
      "`PcpDependency`、`PcpArc`、`PcpCulledDependency` 与 relocation error 条目应归入 composition/namespace 编辑诊断线索。",
      "`HdGeomSubset`、`HdDisplayStyle`、`HdReprSelector`、`HdAovDescriptor` 和 `HdRenderBufferDescriptor` 指向 Hydra render index、表示选择和 AOV/render buffer 状态。",
      "`UsdPhysicsShapeDesc`、`UsdPhysicsDistanceJointDesc`、`UsdPhysicsMeshShapeDesc`、`UsdPhysicsCollisionGroupDesc` 属于物理 shape/joint/collision group 描述结构。",
      "本页适合做“我记得成员名以 m 开头”的检索入口；若要理解行为语义，应跳转到对应 class 或 schema 页面，而不是在索引页推断完整 API。"
    ],
    terms: [
      ["member variables", "成员变量"],
      ["composition diagnostics", "组合诊断"],
      ["Hydra repr", "Hydra 表示"],
      ["AOV descriptor", "AOV 描述符"],
      ["collision group", "碰撞组"],
      ["render buffer", "渲染缓冲"]
    ]
  },
  {
    output: "full_site/api/functions_vars_c.html",
    title: "Class Members - Variables - C",
    notes: [
      "`functions_vars_c.html` 是 C 字母段变量索引，最容易混在一起的是 token constants、composition diagnostics、Hydra/AOV 设置和内存诊断结构。",
      "`PcpNamespaceEdits::CacheSite`、`LayerStackSite` 与多个 `PcpError*` 条目说明 C 段包含 namespace edits、relocation 和 prim index 输出诊断。",
      "`TfMallocTag::CallTree` 及其 `PathNode` 属于 Tf 内存标记/调用树诊断，与 UsdGeom 或 UsdRender token 常量不是同一语义层。",
      "`HdAovDescriptor`、`HdRenderPassAovBinding`、`HdCommandDescriptor`、`HdMeshReprDesc` 和 `HdEmbreeConfig` 应按 Hydra/rendering 配置线索阅读。",
      "多组 `Usd*TokensType` 只表示各 schema 域的 token 常量聚合；翻译时保留原 token 名，中文只解释域和用途，避免改写 API 字面量。"
    ],
    terms: [
      ["CacheSite", "缓存位置"],
      ["TfMallocTag::CallTree", "Tf 内存标签调用树"],
      ["PcpError", "Pcp 组合错误"],
      ["HdAovDescriptor", "Hydra AOV 描述符"],
      ["TokensType", "token 常量集合"],
      ["API literal", "API 字面量"]
    ]
  },
  {
    output: "full_site/api/functions_vars_f.html",
    title: "Class Members - Variables - F",
    notes: [
      "这是 F 字母段成员变量索引，重点横跨 UsdImaging data source mapping、schema registry、Pcp composition edit、physics descriptors 和 Hydra render state。",
      "`UsdImagingDataSourceMapped::AttributeMapping` 与 `RelationshipMapping` 说明本页包含成像数据源到 USD attribute/relationship 的映射线索。",
      "`UsdSchemaRegistry::SchemaInfo` 指向 schema registry metadata，适合跳转理解 schema 名称、类型、插件注册和 generated schema 信息。",
      "`UsdPhysicsArticulationDesc`、`RigidBodyDesc`、`ShapeDesc`、`CollisionGroupDesc` 和 `JointDrive` 需要按 physics descriptor 家族一起阅读。",
      "`SdrShaderNodeDiscoveryResult`、`HdDisplayStyle`、`HdMeshReprDesc`、`HdAovDescriptor`、`HdRenderBufferDescriptor` 则属于 shader discovery 与 Hydra 渲染状态入口。"
    ],
    terms: [
      ["AttributeMapping", "属性映射"],
      ["RelationshipMapping", "关系映射"],
      ["SchemaInfo", "schema 注册信息"],
      ["CompositionFieldEdit", "组合字段编辑"],
      ["ArticulationDesc", "关节系统描述"],
      ["ShaderNodeDiscoveryResult", "着色节点发现结果"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充 API 索引页二次精修说明，重点解释 Doxygen 字母索引的阅读方法、跨模块条目归类和跳转边界；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index page, focusing on how to read Doxygen letter buckets, how to group cross-module entries, and when to jump to the target class documentation while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
