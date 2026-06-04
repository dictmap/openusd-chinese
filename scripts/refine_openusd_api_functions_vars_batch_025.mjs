import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-vars-quality-pass-025";

const refinements = [
  {
    output: "full_site/api/functions_vars_h.html",
    title: "Class Members - Variables - H",
    notes: [
      "functions_vars_h.html 是变量索引 H 段，条目较短，集中在 UsdVol token、UsdPhysics shape desc、HdStShaderCode texture handle、composition query filter 和 imaging property mapping。",
      "UsdPhysicsCubeShapeDesc、UsdPhysicsCapsule1ShapeDesc、UsdPhysicsCapsuleShapeDesc、UsdPhysicsConeShapeDesc、UsdPhysicsCylinder1ShapeDesc、UsdPhysicsCylinderShapeDesc 是物理形状描述结构相关变量入口。",
      "HdStShaderCode::NamedTextureHandle 指向 Hydra Storm shader code 的命名纹理句柄；UsdImagingDataSourceMapped::PropertyMappingBase 指向 imaging data source 属性映射基类。",
      "UsdPrimCompositionQuery::Filter 与 TsRegressionPreventer::SetResult 说明本页还包含 composition query 过滤和 spline regression 检查结果；中文层只做变量归属提示，字段语义仍需进入对应类页核对。"
    ],
    terms: [
      ["shape descriptor", "形状描述结构"],
      ["texture handle", "纹理句柄"],
      ["composition query filter", "组合查询过滤器"],
      ["property mapping", "属性映射"],
      ["set result", "集合结果"]
    ]
  },
  {
    output: "full_site/api/functions_vars_i.html",
    title: "Class Members - Variables - I",
    notes: [
      "functions_vars_i.html 是变量索引 I 段，条目较密，覆盖 Hydra geom subset/primvar、Sdr shader discovery、schema registry、render spec、namespace edit、Pcp dependency、instancer context 和 Vdf schedule/data vector。",
      "UsdImagingInstancerContext、HdEmbreeInstanceContext、HdxInstancerContext、HdxPrimOriginInfo、HdxPickHit、HdGeomSubset 与 HdPrimvarDescriptor 说明本页有 imaging、instancing、pick hit 和 primvar 相关变量。",
      "VdfScheduleInput、VdfScheduleNode、Vdf_ExecutorDataVector、Vdf_ParallelExecutorDataVector、Ef_LeafNodeIndexer 偏 Vdf/Ef 执行调度和数据向量；SdfListProxy 与 PcpNamespaceEdits 偏 Sdf/Pcp 容器与 namespace edit。",
      "UsdPhysicsCollisionGroupDesc、UsdPhysicsObjectDesc、UsdPhysicsCustomTokens、UsdValidationValidatorMetadata 和多组 schema TokensType 混列；阅读时应先按 rendering/imaging、Vdf、Pcp/Sdf、physics/validation 分组。"
    ],
    terms: [
      ["instancer context", "实例化器上下文"],
      ["primvar descriptor", "primvar 描述符"],
      ["schedule input", "调度输入"],
      ["dependency", "依赖"],
      ["object descriptor", "对象描述结构"]
    ]
  },
  {
    output: "full_site/api/functions_vars_j.html",
    title: "Class Members - Variables - J",
    notes: [
      "functions_vars_j.html 是变量索引 J 段，当前只有少量条目，主要是 HdEmbreeConfig、UsdPhysicsD6JointDesc、UsdPhysicsJointDesc、UsdSkelTokensType 和 UsdPhysicsCustomTokens。",
      "UsdPhysicsD6JointDesc 与 UsdPhysicsJointDesc 是本页的核心线索，指向 physics joint 描述结构；D6 joint 通常用于多自由度关节描述，名称应保持英文原名便于检索。",
      "HdEmbreeConfig 属于 Embree/Hydra 配置入口；UsdSkelTokensType 与 UsdPhysicsCustomTokens 分别指向骨骼 schema token 和物理自定义 token。",
      "由于本页条目短，中文层重点说明模块边界和阅读顺序；完整变量含义仍需要进入 joint desc、token type 或 HdEmbreeConfig 类页面逐项核对。"
    ],
    terms: [
      ["D6 joint", "D6 关节"],
      ["joint descriptor", "关节描述结构"],
      ["Embree config", "Embree 配置"],
      ["custom tokens", "自定义 token"],
      ["skel tokens", "骨骼 token"]
    ]
  },
  {
    output: "full_site/api/functions_vars_k.html",
    title: "Class Members - Variables - K",
    notes: [
      "functions_vars_k.html 是变量索引 K 段，当前条目很短，包含 UsdValidationValidatorMetadata、UsdPhysicsTokensType、UsdSchemaRegistry::SchemaInfo、UsdPhysicsRigidBodyDesc 和 UsdGeomTokensType。",
      "UsdValidationValidatorMetadata 指向验证器元数据；UsdSchemaRegistry::SchemaInfo 指向 schema 注册信息，两者都属于 API 元信息或注册体系。",
      "UsdPhysicsRigidBodyDesc 与 UsdPhysicsTokensType 属于物理刚体描述和物理 token；UsdGeomTokensType 则属于几何 schema token。",
      "本页不应被误读为完整 K 字母教程；中文导读只说明短页中的 validation、schema registry、physics 和 geometry token 四个方向。"
    ],
    terms: [
      ["validator metadata", "验证器元数据"],
      ["schema info", "schema 信息"],
      ["rigid body descriptor", "刚体描述结构"],
      ["physics token", "物理 token"],
      ["geometry token", "几何 token"]
    ]
  },
  {
    output: "full_site/api/functions_vars_l.html",
    title: "Class Members - Variables - L",
    notes: [
      "functions_vars_l.html 是变量索引 L 段，覆盖 Pcp relocation/layer stack、UsdSkel bake skinning、linear units、physics joint desc、Exec provider resolution、schema token 和 render/media token。",
      "PcpErrorInvalidAuthoredRelocation、PcpErrorInvalidConflictingRelocation、PcpErrorInvalidSameTargetRelocations::RelocationSource、PcpErrorTargetPathBase、PcpCacheChanges、PcpCulledDependency、PcpNamespaceEdits::LayerStackSite 是本页 composition/relocation 主线。",
      "UsdPhysicsDistanceJointDesc、UsdPhysicsPrismaticJointDesc、UsdPhysicsRevoluteJointDesc、UsdPhysicsSphericalJointDesc、UsdPhysicsRigidBodyDesc、UsdPhysicsShapeDesc、UsdPhysicsJointDesc 与 UsdPhysicsTokensType 构成 physics joint/shape 变量群。",
      "UsdGeomLinearUnits、UsdSkelBakeSkinningParms、ExecProviderResolution、HdMeshReprDesc、FormatterBase 以及 UsdUI/UsdLux/UsdGeom/UsdVol/UsdHydra/UsdRi/UsdMedia/UsdRender tokens 说明本页跨越单位、骨骼烘焙、执行解析、Hydra 和多 domain token。"
    ],
    terms: [
      ["relocation source", "重定位来源"],
      ["layer stack site", "层栈位置"],
      ["linear units", "线性单位"],
      ["provider resolution", "提供者解析"],
      ["prismatic joint", "棱柱关节"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的变量索引用法、模块边界和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first variable-index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
