import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-080";

const refinements = [
  {
    output: "full_site/api/functions_u.html",
    title: "Class Members - U",
    notes: [
      "这是 Class Members 的 U 字母桶，条目常以 `Usd*`、`Update*`、`Union*` 或 `Un*` 开头；它的核心价值是符号定位，而不是按模块组织的教程。",
      "`UsdStage`、`UsdPrim`、`UsdStagePopulationMask`、`UsdStageLoadRules` 和 `UsdShadeMaterialBindingAPI` 是用户经常跳转的高价值入口，适合沿 stage/prim/material 关系回到目标 class 页面阅读。",
      "`HdIndexedTimeSampleArray<TYPE, CAPACITY>`、`HdTimeSampleArray<TYPE, CAPACITY>`、`HdDataSourceLocatorSet`、`HdRenderBuffer` 与 `HdStRenderPassShader` 指向 Hydra 数据源、时间采样和渲染缓冲线索；template 参数必须按英文保留。",
      "`VtValue`、`VtValueRef`、`VtMutableValueRef`、`GfRange*` 和 `GfRect2i` 属于值容器与数学类型；它们和 `PcpErrorUnresolvedPrimPath`、`VdfNetwork` 只是在 U 段相邻，不代表同一语义层。",
      "本页阅读策略是先用 U 段定位 API 名，再根据前缀区分 Usd scenegraph、Hydra rendering、Vt/Gf value math、Pcp composition 或 Vdf execution，最后跳转到具体类页核对签名和说明。"
    ],
    terms: [
      ["Class Members", "类成员索引"],
      ["population mask", "填充掩码"],
      ["time sample array", "时间采样数组"],
      ["render pass shader", "渲染 pass shader"],
      ["mutable value ref", "可变值引用"],
      ["unresolved prim path", "未解析 prim 路径"]
    ]
  },
  {
    output: "full_site/api/functions_vars_a.html",
    title: "Class Members - Variables - A",
    notes: [
      "这是成员变量索引的 A 字母页，变量来自 schema token、Hydra 描述符、composition 状态、imaging 参数和 validation 结果，不能按页面顺序推断模块关系。",
      "大量 `Usd*TokensType` 条目是 schema token table 的入口，例如 `UsdGeomTokensType`、`UsdRenderTokensType`、`UsdLuxTokensType`、`UsdSkelTokensType` 和 `UsdVolTokensType`；这些英文名称应保持原样。",
      "`HdAovDescriptor`、`HdRenderPassAovBinding`、`HdCommandArgDescriptor`、`HdMergingSceneIndex::InputScene` 与 `UsdImagingCreateSceneIndicesInfo` 适合归入 Hydra/render/imaging 配置线索。",
      "`PcpPrimIndexOutputs`、`PcpCulledDependency`、`PcpErrorArcPermissionDenied`、`PcpErrorArcToProhibitedChild` 与 `UsdNamespaceEditor::EditOptions` 指向 composition arc、namespace edit 和错误诊断状态。",
      "本页适合查“某个变量是否以 A 开头”，深入语义时应跳到变量所属 class；中文导读只提供 domain 分组和误读提醒，不替代 Doxygen 的成员类型与注释。"
    ],
    terms: [
      ["member variables", "成员变量"],
      ["token table", "token 表"],
      ["AOV binding", "AOV 绑定"],
      ["scene index input", "scene index 输入"],
      ["composition arc", "组合 arc"],
      ["edit options", "编辑选项"]
    ]
  },
  {
    output: "full_site/api/functions_h.html",
    title: "Class Members - H",
    notes: [
      "H 段类成员索引混合了 `Has*`、`Hash*`、`Handle*`、`Hd*`、`Hgi*` 等常见前缀；要结合所属 class 判断它是查询函数、句柄、诊断结构还是渲染对象。",
      "`UsdPhysicsCubeShapeDesc`、`UsdPhysicsCapsuleShapeDesc`、`UsdPhysicsConeShapeDesc`、`UsdPhysicsCylinderShapeDesc` 是 physics shape descriptor 线索，应和 UsdPhysics schema 页面一起阅读。",
      "`SdfAbstractData`、`SdfChildrenView`、`SdfData`、`SdfPrimSpec`、`SdfAttributeSpec` 与 `PcpCache`、`PcpPrimIndex` 组成 scene description 数据层和 composition 缓存线索。",
      "`UsdPrim`、`UsdObject`、`UsdAttribute`、`UsdProperty`、`UsdRelationship`、`UsdAttributeQuery`、`UsdResolveInfo`、`UsdVariantSet` 是用户常见的 USD 查询入口，适合沿对象模型阅读。",
      "`HdRenderParam`、`HdStRenderParam`、`HgiShaderSection`、`HdStShaderCode::NamedTextureHandle` 和 `VdfExecutorInterface` 属于渲染与执行支撑；这些条目与 Sdf/Usd 对象 API 在本页只是按字母聚合。"
    ],
    terms: [
      ["shape descriptor", "形状描述结构"],
      ["children view", "子对象视图"],
      ["prim index", "prim 索引"],
      ["attribute query", "属性查询"],
      ["render param", "渲染参数"],
      ["named texture handle", "具名纹理句柄"]
    ]
  },
  {
    output: "full_site/api/functions_r.html",
    title: "Class Members - R",
    notes: [
      "R 段类成员通常围绕 read、range、render、resolve、relocation、relationship 等词展开；同一个首字母下同时包含文件读取、渲染缓冲、物理 shape 和执行数据访问。",
      "`ArAsset`、`ArFilesystemAsset`、`ArInMemoryAsset`、`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat`、`SdfUsdFileFormat`、`SdfUsdzFileFormat` 与 `HioImage` 是资产读取和文件格式入口。",
      "`VdfVector::ReadAccessor`、`ReadWriteAccessor`、`VdfInputSpecs` 需要按执行数据访问语义阅读；不要把 accessor 条目误解成通用容器教程。",
      "`HdBufferArrayRange`、`HdSt*BufferRange`、`HdStDispatchBuffer`、`HdExtComputationContext` 与 `HdEmbreeConfig` 属于 Hydra buffer、计算和后端配置线索。",
      "`UsdPhysicsCapsuleShapeDesc`、`UsdPhysicsConeShapeDesc`、`UsdPhysicsCylinderShapeDesc`、`UsdPhysicsSphereShapeDesc` 说明本页也包含物理 shape descriptor；阅读时应回到 UsdPhysics 类页确认字段含义。"
    ],
    terms: [
      ["read accessor", "读取访问器"],
      ["read-write accessor", "读写访问器"],
      ["file format", "文件格式"],
      ["asset read", "资产读取"],
      ["buffer range", "缓冲区范围"],
      ["ext computation", "外部计算"]
    ]
  },
  {
    output: "full_site/api/functions_l.html",
    title: "Class Members - L",
    notes: [
      "L 段类成员索引集中出现 layer、light、linear、list、literal、load 和 relocation 相关条目；它跨越 Pcp/Sdf 数据模型、UsdLux、UsdPhysics、Vdf 和 Hydra。",
      "`PcpDependentNamespaceEdits::CompositionFieldEdit`、`PcpErrorInvalidAuthoredRelocation`、`PcpErrorInvalidConflictingRelocation`、`PcpLayerRelocatesEditBuilder` 与 `PcpNamespaceEdits::LayerStackSite` 应归入 relocation 与 namespace edit 诊断线索。",
      "`UsdLuxBoundableLightBase`、`UsdLuxNonboundableLightBase`、`UsdLuxTokensType` 和 `UsdGeomLinearUnits` 指向灯光 schema 与单位 token；这些符号应保持英文以便和 schema 页面互查。",
      "`UsdPhysicsDistanceJointDesc`、`UsdPhysicsPrismaticJointDesc`、`UsdPhysicsRevoluteJointDesc`、`UsdPhysicsSphericalJointDesc`、`UsdPhysicsRigidBodyDesc` 是物理 joint/rigid body 描述结构入口。",
      "`SdfLayer`、`SdfSpec`、`UsdPrimDefinition::Property`、`LiteralNode`、`VdfIndexedWeightsOperand`、`HdStGLSLProgram` 和 `PlugPlugin` 显示本页还覆盖数据层、schema definition、表达式、权重操作数、GLSL 程序和插件元数据。"
    ],
    terms: [
      ["relocation", "重定位"],
      ["layer stack site", "图层栈站点"],
      ["light schema", "灯光 schema"],
      ["linear units", "线性单位"],
      ["joint descriptor", "关节描述结构"],
      ["GLSL program", "GLSL 程序"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引页二次精修说明，重点解释 Doxygen 字母桶的阅读方式、跨模块条目的归类边界，以及何时应跳转到目标 class 或 schema 文档。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index page. It explains how to read Doxygen letter buckets, how to group cross-module entries, and when to jump to the target class or schema documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
