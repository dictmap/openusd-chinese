import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-084";

const refinements = [
  {
    output: "full_site/api/functions_func_w.html",
    title: "Class Members - Functions - W",
    notes: [
      "`functions_func_w.html` 是 W 段函数成员索引，读者应先把 `Work*`、`Wait*`、`Write*`、`Wrap*` 等动词按职责分组，而不是把整页理解成单一模块文档。",
      "`WorkTaskGraph`、`WorkSingularTask`、`VdfParallelTaskWaitlist`、`VdfContext`、`VdfNetwork::EditMonitor`、`EfDependencyCache` 和 `EfPageCacheBasedExecutor<EngineType, DataManagerType>` 形成任务调度、并行等待、执行上下文、计算图监控与缓存执行的主线。",
      "`SdfPathExpression`、`SdfPredicateExpression`、`SdfPathExpression::ExpressionReference` 和 `SdfNotice::LayerMutenessChanged` 属于 Sdf expression 与 layer notice 语境；它们常用于理解路径过滤、谓词匹配和 layer muteness 变化。",
      "`ArFilesystemWritableAsset`、`ArWritableAsset`、`HioImage`、`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat`、`SdfUsdFileFormat` 与 `SdfUsdzFileFormat` 指向资产或 layer 写出能力，适合和 asset resolver、file format 插件一起阅读。",
      "`TraceSerialization`、`TraceEventData`、`JsWriter`、`HgiShaderSection`、`TfScriptModuleLoader`、`UsdStage`、`GlfDrawTarget` 和 `VtArrayEditBuilder<ELEM>` 是跨模块工具条目；中文层只做定位说明，具体参数与返回值仍应回到目标 class 页核对。"
    ],
    terms: [
      ["function member index", "函数成员索引"],
      ["task waitlist", "任务等待队列"],
      ["path expression", "路径表达式"],
      ["layer muteness", "图层静音状态"],
      ["writable asset", "可写资产"],
      ["trace serialization", "跟踪序列化"]
    ]
  },
  {
    output: "full_site/api/functions_f.html",
    title: "Class Members - F",
    notes: [
      "`functions_f.html` 是 Class Members 的 F 段索引，条目混合 token table、field definition、file format、filter、schema registry、shader discovery、Hydra/Storm/RenderMan 适配器和 physics descriptor。",
      "`UsdGeomTokensType`、`UsdHydraTokensType`、`UsdTokensType`、`UsdShadeTokensType`、`UsdVolTokensType`、`UsdRenderTokensType`、`UsdMediaTokensType`、`UsdLuxTokensType` 与 `UsdPhysicsTokensType` 都是生成 schema token 集合，token 字面量必须保持原样。",
      "`SdfSchemaBase::FieldDefinition`、`SdfSchemaBase::_SpecDefiner`、`UsdSchemaRegistry::SchemaInfo` 和 `PcpDependentNamespaceEdits::CompositionFieldEdit` 更接近 schema/metadata/composition field 语境，可用于追踪 USD 文件中字段如何被定义、编辑与解释。",
      "`SdfFileFormat`、`SdfLayer`、`SdfUsdcFileFormat`、`SdfUsdFileFormat`、`SdfUsdzFileFormat`、`PcpPrimIndexInputs` 说明 F 段也覆盖 layer 格式与 prim index 输入，阅读时应与 Sdr/Hgi/Hd 条目分开。",
      "`SdrShaderNodeDiscoveryResult`、`_SdrFilesystemDiscoveryPlugin`、`HgiBlitCmds`、`HgiGLBlitCmds`、`HdBprim`、`HdEmbreeMesh`、`HdPrmanLight` 和 `HdPrmanLightFilter` 指向 shader discovery、GPU blit、Hydra bprim 与 renderer adapter，属于渲染/插件线索。"
    ],
    terms: [
      ["field definition", "字段定义"],
      ["file format", "文件格式"],
      ["composition field edit", "组合字段编辑"],
      ["shader discovery", "shader 发现"],
      ["blit commands", "blit 命令"],
      ["renderer adapter", "渲染器适配器"]
    ]
  },
  {
    output: "full_site/api/functions_k.html",
    title: "Class Members - K",
    notes: [
      "`functions_k.html` 是较短的 K 段成员索引，但它横跨 Sdf children view、通知系统、validation metadata、UsdPhysics token、Hio GLSLFX resource layout、predicate expression 和 schema/model API。",
      "`SdfChildrenView<_ChildPolicy, _Predicate, _Adapter>` 是按策略、谓词与适配器遍历子项的视图类型；它的 template 参数含义比普通容器更重要，应保留英文名称并跳转 class 页查看。",
      "`SdfNotice::LayerInfoDidChange` 与 `TfNotice` 共同提示通知机制主线：前者是 Sdf layer info 变化通知，后者是 Tf notice 基类，涉及监听注册、发送与生命周期管理。",
      "`UsdValidationValidatorMetadata`、`UsdPhysicsTokensType`、`UsdPhysicsRigidBodyDesc`、`UsdModelAPI` 和 `UsdSchemaRegistry::SchemaInfo` 分别指向验证器元数据、物理 token/刚体描述、model API 与 schema registry。",
      "`HioGlslfxResourceLayout`、`SdfPredicateExpression::FnCall` 和 `UsdGeomTokensType` 是本页的渲染资源布局、谓词函数调用与几何 token 线索；K 段条目少，但模块跨度并不小。"
    ],
    terms: [
      ["children view", "子项视图"],
      ["notice base class", "通知基类"],
      ["validator metadata", "验证器元数据"],
      ["resource layout", "资源布局"],
      ["predicate function call", "谓词函数调用"],
      ["model API", "模型 API"]
    ]
  },
  {
    output: "full_site/api/functions_rela_h.html",
    title: "Class Members - Related Functions - H",
    notes: [
      "`functions_rela_h.html` 是 related functions 的 H 段索引，主体是 `Gf` 数学类型的 helper/hash/stream/比较等外部函数，同时夹带 Ar、Pcp、Sdf、Tf 和 UsdStage 的基础设施入口。",
      "`GfBBox3d`、`GfDualQuatd/f/h`、`GfMatrix2/3/4d/f`、`GfQuatd/f/h`、`GfQuaternion`、`GfRange1/2/3d/f`、`GfRotation` 与 `GfVec2/3/4d/f/h/i` 应作为数学类型 related functions 组阅读。",
      "`ArResolverContext` 提示资产解析上下文相关 helper；`PcpInstanceKey` 则属于 composition 实例化键，二者都不属于 Gf 数学类型，索引中只是因为函数名同在 H 段而并列。",
      "`SdfHandle<T>`、`SdfUnregisteredValue`、`TfPyObjWrapper`、`UsdStageCache::Id` 和 `UsdStageLoadRules` 分别涉及句柄、未注册值、Python 对象包装、stage cache id 与 stage 加载规则。",
      "使用本页时建议先筛出目标类型，再进入对应 class 文档确认 related function 的签名、重载和语义；中文层不翻译 `GfVec4f`、`UsdStageLoadRules` 等类型名，避免破坏检索。"
    ],
    terms: [
      ["related functions", "相关函数"],
      ["helper function", "辅助函数"],
      ["dual quaternion", "双四元数"],
      ["resolver context", "解析上下文"],
      ["stage load rules", "stage 加载规则"],
      ["Python object wrapper", "Python 对象包装器"]
    ]
  },
  {
    output: "full_site/api/functions_w.html",
    title: "Class Members - W",
    notes: [
      "`functions_w.html` 是 Class Members 的 W 段总索引，和 `functions_func_w.html` 相比，它同时收录变量、类型、token 和函数成员，因此模块混合度更高。",
      "`WorkTaskGraph`、`WorkSingularTask`、`VdfParallelTaskWaitlist`、`Vdf_WeightSlot`、`VdfContext`、`VdfNetwork::EditMonitor`、`EfDependencyCache`、`EfLeafNodeCache` 和 `EfPageCacheStorage` 是 Work/Vdf/Ef 执行与缓存相关条目的核心组。",
      "`SdfPathExpression`、`SdfPredicateExpression`、`SdfPathExpression::ExpressionReference`、`PcpDependentNamespaceEdits`、`SdfNotice::LayerMutenessChanged` 与 `TfRefPtrTracker` 指向 path expression、composition edit、layer muteness notice 和引用指针跟踪。",
      "`GfVec4d/f/h/i` 是 Gf 四维向量类型；`UsdShadeTokensType`、`UsdSkelTokensType`、`UsdGeomTokensType`、`UsdHydraTokensType`、`UsdSkelImagingWeightAndSubShapeIndex` 是 schema token 或 skeleton imaging 数据线索。",
      "`ArFilesystemWritableAsset`、`ArWritableAsset`、`ArResolver`、`HioImage`、`TraceSerialization`、`TraceEventData`、`JsWriter`、`GlfDrawTarget`、`SdfFileFormat` 和 `TfScriptModuleLoader` 则覆盖资产写入、解析、图片、trace、JSON writer、OpenGL draw target、文件格式与脚本模块加载。"
    ],
    terms: [
      ["class member index", "类成员索引"],
      ["weighted slot", "权重槽位"],
      ["dependent namespace edit", "依赖命名空间编辑"],
      ["reference pointer tracker", "引用指针跟踪器"],
      ["skeleton imaging", "骨骼成像"],
      ["draw target", "绘制目标"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引页二次精修说明，重点解释 Doxygen 字母桶的阅读方式、跨模块条目的归类边界，以及何时应跳转到目标 class、schema、header 或 group 文档。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index page. It explains how to read Doxygen letter buckets, how to group cross-module entries, and when to jump to target class, schema, header, or group documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
