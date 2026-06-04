import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-type-vars-quality-pass-023";

const refinements = [
  {
    output: "full_site/api/functions_type.html",
    title: "Class Members - Typedefs",
    notes: [
      "functions_type.html 是 Class Members 的 typedef 总索引，按字母段汇总类型别名、容器别名、iterator/range 别名和执行器相关 typedef。",
      "VdfPullBasedExecutorEngine、VdfSimpleExecutor、VdfParallelExecutorEngine、VdfParallelSpeculationExecutorEngine、VdfExecutorDataManager 等条目偏 Vdf 执行框架；模板参数 DataManagerType、DerivedClass 应保持原样。",
      "SdfSchemaBase、SdfPathTable<MappedType>、SdfListOp<T>、SdfBatchNamespaceEdit、UsdShadeMaterialBindingAPI、UsdPrimSiblingRange 和 UsdPrimSubtreeRange 属于 Sdf/Usd schema、路径表、list op 和 range 语境。",
      "TfCompressedBits、TfDenseHashMap、TfDenseHashSet、VtArray<ELEM>、VtArrayEdit<ELEM> 是基础容器与位集；阅读本页时应先判断 typedef 属于执行器、scene description、容器还是遍历范围。"
    ],
    terms: [
      ["typedef", "类型别名"],
      ["executor engine", "执行器引擎"],
      ["iterator range", "迭代器范围"],
      ["hash map", "哈希映射"],
      ["list op", "列表操作"]
    ]
  },
  {
    output: "full_site/api/functions_u.html",
    title: "Class Members - U",
    notes: [
      "functions_u.html 是 Class Members 总索引的 U 段，覆盖 UsdGeom/UsdUI/UsdVol token、SdfBooleanExpression、namespace edit detail、GlfDrawTarget、UsdShadeMaterialBindingAPI、ArResolver、Hydra shader、time sample array 和 VtValue。",
      "UsdStage、UsdPrim、UsdStagePopulationMask、UsdStageLoadRules、UsdShadeMaterialBindingAPI 和 UsdShadeTokensType 说明本页包含常见 USD stage/prim/material 查询入口。",
      "HdIndexedTimeSampleArray<TYPE, CAPACITY>、HdTimeSampleArray<TYPE, CAPACITY>、HdDataSourceLocatorSet、HdRenderBuffer、HdStRenderPassShader、HdStShaderCode 和 HdStSimpleLightingShader 偏 Hydra 数据源、渲染缓冲和 shader 支撑。",
      "GfRange1/2/3 d/f、GfRect2i、VtValue/VtValueRef/VtMutableValueRef 与 VdfNetwork/VdfExecutorInterface/PcpErrorUnresolvedPrimPath 混在同一字母段；中文层按数学值、值容器、composition 和执行网络分组。"
    ],
    terms: [
      ["time sample array", "时间采样数组"],
      ["render buffer", "渲染缓冲"],
      ["population mask", "填充掩码"],
      ["mutable value ref", "可变值引用"],
      ["namespace edit detail", "命名空间编辑细节"]
    ]
  },
  {
    output: "full_site/api/functions_v.html",
    title: "Class Members - V",
    notes: [
      "functions_v.html 是 Class Members 总索引的 V 段，条目跨越 HdStGLSLProgram、PxOsdMeshTopology、SdfBooleanExpression、Usd validation、UsdGeom/UsdSkel/UsdRi、PcpMapExpression、Vdf iterator 和 Exec value override。",
      "UsdValidationContext、UsdValidationValidator、ValidationResult 和 Validator 是验证框架主线；UsdAttributeLimits、UsdCollectionAPI、UsdGeomSubset、UsdGeomMesh、UsdSkelTopology、UsdSkelBindingAPI、UsdSkelBlendShape 用于 schema 与几何/骨骼相关入口。",
      "VdfIteratorRange<Iterator>、VdfMaskedIterator、VdfReadIterator<T>、VdfReadWriteIterator<T>、VdfWeightedIterator、Vdf_BoxedContainer<T> 和 Vdf_BoxedRanges 偏 Vdf 遍历、读写视图和 boxed range。",
      "ExecUsdValueOverride、ExecValueOverride、EsfAttributeQueryInterface、UsdAttributeQuery、UsdGeomPrimvar、PcpPrimIndexInputs 与 UsdResolveInfo 说明本页也涉及执行覆盖、属性查询、primvar 和 composition 输入。"
    ],
    terms: [
      ["validation context", "验证上下文"],
      ["validator", "验证器"],
      ["value override", "值覆盖"],
      ["masked iterator", "掩码迭代器"],
      ["prim index inputs", "Prim 索引输入"]
    ]
  },
  {
    output: "full_site/api/functions_vars_a.html",
    title: "Class Members - Variables - A",
    notes: [
      "functions_vars_a.html 是变量索引的 A 段，覆盖 UsdPhysicsJointDrive、UsdPhysicsTokensType、UsdGeom/UsdUI/UsdRender/UsdShade/UsdLux/UsdMedia/UsdMtlx/UsdProc/UsdRi/UsdSkel/UsdVol token、validator、scene index 输入和 imaging 参数。",
      "大量 *TokensType 条目说明本页常用于查找 schema token 常量或 token table 变量；中文层保留 UsdGeomTokensType 等原名，避免破坏搜索和 API 对照。",
      "HdAovDescriptor、HdRenderPassAovBinding、UsdRenderSpec::Product、HdCommandArgDescriptor、HdMergingSceneIndex::InputScene 和 UsdImagingCreateSceneIndicesInfo 偏 Hydra/render/imaging 配置与 AOV 绑定。",
      "PcpPrimIndexOutputs、PcpCulledDependency、PcpErrorArcPermissionDenied、PcpErrorArcToProhibitedChild、UsdNamespaceEditor::EditOptions 和 UsdPrimCompositionQuery::Filter 说明变量索引也包含 composition 与 namespace edit 相关状态。"
    ],
    terms: [
      ["variable index", "变量索引"],
      ["token table", "token 表"],
      ["AOV binding", "AOV 绑定"],
      ["input scene", "输入场景"],
      ["edit options", "编辑选项"]
    ]
  },
  {
    output: "full_site/api/functions_vars_b.html",
    title: "Class Members - Variables - B",
    notes: [
      "functions_vars_b.html 是变量索引的 B 段，当前条目集中在 UsdUI/UsdGeom/UsdShade/UsdSkel/UsdHydra/UsdVol/UsdLux/UsdPhysics/UsdRi token、UsdSkel imaging data、HdMeshReprDesc、SdrShaderNodeDiscoveryResult 和物理 shape desc。",
      "UsdSkelBakeSkinningParms、UsdSkelImagingSkelData、UsdSkelImagingBlendShapeData、UsdSkelImagingSkelGuideData 和 UsdSkelTokensType 说明本页与骨骼烘焙、成像数据和 blend shape 变量关系密切。",
      "UsdPhysicsJointDesc、UsdPhysicsCapsule1ShapeDesc、UsdPhysicsCylinder1ShapeDesc、UsdPhysicsTokensType 是物理 schema 描述结构相关入口；它们应与 token 常量和 shape desc 区分阅读。",
      "HdMeshReprDesc、HgiMipInfo、SdrShaderNodeDiscoveryResult 偏 Hydra 表示、GPU image mip 信息和 shader discovery；中文层只说明变量归属，具体字段仍需进入类页面逐项核对。"
    ],
    terms: [
      ["blend shape data", "混合形状数据"],
      ["skin baking", "蒙皮烘焙"],
      ["shape descriptor", "形状描述结构"],
      ["shader discovery", "shader 发现"],
      ["mip info", "MIP 信息"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、模块边界和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
