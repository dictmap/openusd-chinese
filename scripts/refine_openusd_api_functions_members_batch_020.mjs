import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-members-quality-pass-020";

const refinements = [
  {
    output: "full_site/api/functions_l.html",
    title: "Class Members - L",
    notes: [
      "functions_l.html 是 Class Members 总索引的 L 段，条目横跨 CLI formatter、UsdUI/UsdLux token、Pcp relocation、UsdSkel baking、UsdPhysics joint、Sdf 数据层、Hydra GLSL 和 PlugPlugin。",
      "PcpDependentNamespaceEdits::CompositionFieldEdit、PcpErrorInvalidAuthoredRelocation、PcpErrorInvalidConflictingRelocation、PcpErrorTargetPathBase、PcpLayerRelocatesEditBuilder 与 PcpNamespaceEdits::LayerStackSite 是 composition relocation 和 namespace edit 相关线索。",
      "UsdLuxBoundableLightBase、UsdLuxNonboundableLightBase、UsdGeomLinearUnits、UsdPhysicsDistance/Prismatic/Revolute/SphericalJointDesc 和 UsdPhysicsRigidBodyDesc 指向 lighting、单位和物理关节/刚体描述。",
      "SdfAbstractData、SdfData、SdfLayer、SdfSpec、UsdPrimDefinition::Property、LiteralNode、VdfIndexedWeightsOperand、HdStGLSLProgram 与 HdStDynamicUvTextureImplementation 说明本页还覆盖数据模型、schema definition、表达式字面量、权重操作数和渲染实现入口。"
    ],
    terms: [
      ["relocation", "重定位"],
      ["layer stack site", "图层栈站点"],
      ["joint descriptor", "关节描述结构"],
      ["linear units", "线性单位"],
      ["literal node", "字面量节点"]
    ]
  },
  {
    output: "full_site/api/functions_m.html",
    title: "Class Members - M",
    notes: [
      "functions_m.html 是 Class Members 总索引的 M 段，集中覆盖 formatter、Sdf path/predicate/variable expression、UsdGeom、UsdSchemaRegistry、Pcp map、UsdEditTarget、Hydra render 和 Trace/Vdf 同步。",
      "SdfPathExpression、SdfBooleanExpression、SdfPredicateExpression、SdfPredicateFunctionResult、SdfVariableExpression 与 SdfPathExpressionEval 是路径表达式和谓词求值的核心入口；UsdObjectCollectionExpressionEvaluator 连接到 USD collection 过滤。",
      "UsdGeomImageable、UsdGeomXformable、UsdPrim、UsdPrimCompositionQueryArc、UsdRiStatementsAPI、VtArray 和 UsdSchemaRegistry 属于用户较常遇到的 USD core / geometry / schema API。",
      "PcpMapExpression、PcpMapFunction、PcpArc、PcpDependency、UsdEditTarget、HdChangeTracker、HdEmbreeRenderer、VdfParallelTaskSync、TraceCollector 和 TraceAggregateNode 组成 composition 映射、编辑目标、渲染变化追踪和性能跟踪线索。"
    ],
    terms: [
      ["path expression", "路径表达式"],
      ["predicate result", "谓词结果"],
      ["edit target", "编辑目标"],
      ["map function", "映射函数"],
      ["aggregate node", "聚合节点"]
    ]
  },
  {
    output: "full_site/api/functions_n.html",
    title: "Class Members - N",
    notes: [
      "functions_n.html 是 Class Members 总索引的 N 段，内容明显分成 CLI/config、shader discovery、UsdRender/validation、Hydra scene index 与 PcpError 诊断几组。",
      "App、ConfigItem、Validator、UsdValidationValidatorMetadata、UsdUtilsRegisteredVariantSet 与 UsdRenderSpec::Product 提供命令行配置、验证器元数据、变体集注册和 render product 线索。",
      "HdCachingSceneIndex、HdFlatteningSceneIndex、HdGpGenerativeProceduralFilteringSceneIndex、HdPrefixingSceneIndex、HdRenderIndex、HdRetainedSceneIndex、Hdsi*SceneIndex 与 HdxTaskControllerSceneIndex 是 Hydra scene index pipeline 的主要入口。",
      "PcpErrorArcCycle、PcpErrorArcPermissionDenied、PcpErrorInvalidAssetPath、PcpErrorInvalidAuthoredRelocation 等条目是 composition 错误类型索引；阅读时应把它们归为错误诊断，而不是正常执行流程。"
    ],
    terms: [
      ["scene index pipeline", "场景索引管线"],
      ["render product", "渲染产品"],
      ["registered variant set", "已注册变体集"],
      ["composition error", "组合错误"],
      ["shader discovery", "着色器发现"]
    ]
  },
  {
    output: "full_site/api/functions_o.html",
    title: "Class Members - O",
    notes: [
      "functions_o.html 是 Class Members 总索引的 O 段，条目覆盖 trace visitor、pick hit、Embree context、display style、Pcp/Sdf namespace、Vdf predicate、Ar asset/resolver、Sdf package 和 Hydra schema/handle。",
      "PcpErrorInvalidReferenceOffset、SdfNamespaceEditDetail、PcpNamespaceEdits::CacheSite、SdfPathExpression、SdfPredicateExpression 与 VdfRequiredInputsPredicate 是 composition、namespace edit、表达式和 Vdf 输入约束相关入口。",
      "ArFilesystemAsset、ArPackageResolver、ArResolver、ArResolvedPath、SdfCrateInfo、SdfZipFile、SdfLayer、UsdStage 与 TfAtomicOfstreamWrapper 指向资产解析、package/usdz/crate 存储、layer/stage 和原子写出。",
      "HdPluginRenderDelegateUniqueHandle、HdPluginRendererUniqueHandle、HdRendererPluginHandle、HdSceneIndexPrim、HdSchema、HdVectorSchema、HdxPickHit 和 HdDisplayStyle 则偏 Hydra 渲染插件、scene index prim/schema 和拾取/显示风格。"
    ],
    terms: [
      ["pick hit", "拾取命中"],
      ["display style", "显示样式"],
      ["asset resolver", "资产解析器"],
      ["atomic output", "原子写出"],
      ["render delegate handle", "渲染代理句柄"]
    ]
  },
  {
    output: "full_site/api/functions_p.html",
    title: "Class Members - P",
    notes: [
      "functions_p.html 是 Class Members 总索引的 P 段，条目较多，覆盖 Sdf path table/predicate、CLI config、Sdr shader registry/parser、UsdVol particle field、Vdf executor、UsdShade、Pcp layer stack 和 Hydra render。",
      "SdfPathTable、SdfPredicateParamNamesAndDefaults::Param、SdfPredicateExpression::FnCall、PcpArc、PcpDependentNamespaceEdits::CompositionFieldEdit、PcpMapFunction 与 PcpLayerStackIdentifier 是路径、谓词和 composition layer stack 线索。",
      "SdrRegistry、SdrParserPlugin、UsdShadeShaderDefParserPlugin、UsdShadeMaterial 与 HioGlslfxResourceLayout 组成 shader discovery、shader definition parser 和 material/shader resource layout 相关入口。",
      "UsdVolParticleFieldKernelConstantSurfletAPI、GaussianEllipsoidAPI、GaussianSurfletAPI、ParticleField3DGaussianSplat、PositionAttributeAPI、SphericalHarmonicsAttributeAPI 与 UsdVolTokensType 是 usdVol 粒子场 schema 入口；PcpCache、PcpPrimIndexInputs/Outputs、PcpErrorBase、PcpExpressionVariables、PcpInstanceKey 等条目偏 composition 缓存和诊断。"
    ],
    terms: [
      ["path table", "路径表"],
      ["shader parser", "着色器解析器"],
      ["particle field", "粒子场"],
      ["layer stack", "图层栈"],
      ["instance key", "实例键"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类成员索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class-member index notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
