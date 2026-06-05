import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-085";

const refinements = [
  {
    output: "full_site/api/functions_func_u.html",
    title: "Class Members - Functions - U",
    notes: [
      "`functions_func_u.html` 是 U 段函数成员索引，函数名通常围绕 update、unload、unregister、use、upload 等动词展开；阅读时应先判断条目属于 USD stage、Hydra/Storm、Vt/Gf 值类型、Vdf 执行还是 Trace/Tf 工具。",
      "`UsdPrim`、`UsdStage`、`UsdStageLoadRules`、`UsdStagePopulationMask`、`UsdShadeMaterialBindingAPI`、`SdfLayer` 与 `SdfPathTable<MappedType>` 是 scene/stage 侧的主线，可用于追踪 stage 加载规则、population mask、材质绑定、layer 和 path table 相关函数。",
      "`HdStRenderPassShader`、`HdStShaderCode`、`HdStSimpleLightingShader`、`HdIndexedTimeSampleArray<TYPE, CAPACITY>`、`HdTimeSampleArray<TYPE, CAPACITY>`、`HdRenderBuffer`、`GlfDrawTarget` 和 `GlfUniformBlock` 指向 Hydra/Storm 渲染、time sample 与 OpenGL/GLF 支撑。",
      "`VtValue`、`VtValueRef`、`VtMutableValueRef`、`GfRange1/2/3d/f` 和 `GfRect2i` 是值容器与几何范围类型；这些条目的函数往往涉及类型擦除、引用写入或范围更新，不应按普通 POD 成员理解。",
      "`VdfNetwork`、`VdfExecutorInterface`、`Vdf_ExecutorDataVector`、`Vdf_ParallelExecutorDataVector`、`VdfDataManagerVector<DeallocationMode>`、`VdfScheduler`、`TraceCounterAccumulator`、`TfRegistryManager` 和 `TfSafeOutputFile` 是执行、注册、计数和安全写文件线索。"
    ],
    terms: [
      ["function member index", "函数成员索引"],
      ["population mask", "人口遮罩"],
      ["time sample array", "时间采样数组"],
      ["value reference", "值引用"],
      ["executor data vector", "执行器数据向量"],
      ["safe output file", "安全输出文件"]
    ]
  },
  {
    output: "full_site/api/functions_vars_g.html",
    title: "Class Members - Variables - G",
    notes: [
      "`functions_vars_g.html` 是很短的 G 段变量索引，但它仍跨越 schema token、Hydra mesh representation、GL imaging 参数、physics scene descriptor 和 CLI option 基类。",
      "`UsdMediaTokensType`、`UsdProcTokensType`、`UsdLuxTokensType` 与 `UsdGeomTokensType` 都是 token table 入口；中文层只解释用途，不翻译 token 字面量，也不改写 struct 名称。",
      "`HdMeshReprDesc` 通常用于描述 Hydra mesh representation 的绘制模式或 repr 配置；它和 `UsdImagingGLEngine::Parameters` 都偏向 imaging/rendering 配置，而不是 authored USD schema 字段。",
      "`UsdPhysicsSceneDesc` 指向物理 scene descriptor，可和 rigid body、joint、shape descriptor 页面一起阅读，判断变量是否代表物理场景级配置或模拟约束。",
      "`App` 与 `OptionBase<CRTP>` 属于 CLI/app 辅助框架条目；它们出现在变量索引中只是因为成员名落在 G 段，读者应跳转到对应 class 页面核对变量含义。"
    ],
    terms: [
      ["variable member index", "变量成员索引"],
      ["schema token table", "schema token 表"],
      ["mesh representation", "网格表示"],
      ["GL engine parameters", "GL 引擎参数"],
      ["physics scene descriptor", "物理场景描述结构"],
      ["CRTP option base", "CRTP 选项基类"]
    ]
  },
  {
    output: "full_site/api/functions_g.html",
    title: "Class Members - G",
    notes: [
      "`functions_g.html` 是 Class Members 总索引的 G 段，混合类成员、token 结构、资源注册表、GPU buffer、Hgi 图形接口、Exec cache、Gf matrix 和 Hd data source 条目。",
      "`HdBufferArray`、`HdInstanceRegistry<VALUE>`、`HdResourceRegistry`、`HdStBufferArrayRegistry`、`HdStDispatchBuffer`、`HdStInterleavedMemoryManager::_StripedInterleavedBuffer`、`HdStVBOMemoryManager::_StripedBufferArray` 和 `HdStVBOSimpleMemoryManager::_SimpleBufferArray` 构成 Hydra/Storm buffer 与资源管理主线。",
      "`Hgi`、`HgiGL`、`HgiGLDevice`、`HgiBlitCmds`、`HgiGLBlitCmds`、`HdStResourceRegistry` 与 `HdPluginRenderDelegateUniqueHandle` 指向底层图形接口、GL device、blit 命令和 render delegate 句柄。",
      "`UsdMediaTokensType`、`UsdProcTokensType`、`UsdLuxTokensType`、`UsdGeomTokensType`、`UsdClipsAPI` 和 `HdMeshReprDesc` 是 schema token、value clips 和 mesh repr 线索，应与 GPU/Hgi 条目分组阅读。",
      "`ArResolverContext`、`Ef_PageCache`、`Exec_CacheView`、`ExecUsdCacheView`、`GfMatrix2/3/4d/f`、`HdContainerDataSource`、`HdLazyContainerDataSource`、`HdMapContainerDataSource` 与 `HdOverlayContainerDataSource` 显示 G 段还横跨资产解析、OpenExec cache、数学矩阵和 Hydra data source。"
    ],
    terms: [
      ["class member index", "类成员索引"],
      ["resource registry", "资源注册表"],
      ["VBO buffer array", "VBO 缓冲数组"],
      ["graphics interface", "图形接口"],
      ["cache view", "缓存视图"],
      ["container data source", "容器数据源"]
    ]
  },
  {
    output: "full_site/api/functions_func_m.html",
    title: "Class Members - Functions - M",
    notes: [
      "`functions_func_m.html` 是 M 段函数成员索引，条目常围绕 make、match、map、merge、move、mark 等语义展开；本页覆盖 formatter、Sdf expression、UsdGeom、composition map、edit target、Hydra render tracking、Trace、Vdf 和 Tf 工具。",
      "`SdfPathExpression`、`SdfPath`、`SdfBooleanExpression`、`SdfPredicateExpression`、`SdfPredicateFunctionResult`、`SdfVariableExpression`、`SdfPathExpressionEval<DomainType>` 与 `UsdObjectCollectionExpressionEvaluator` 属于 path/predicate/collection expression 求值主线。",
      "`UsdGeomImageable`、`UsdGeomXformable`、`UsdSchemaRegistry`、`UsdPrimCompositionQueryArc`、`UsdPrim`、`UsdRiStatementsAPI`、`UsdEditTarget` 和 `PlugPlugin` 是 USD authoring、schema、composition arc、RenderMan statements 与插件相关入口。",
      "`PcpMapExpression`、`PcpMapFunction` 和 `UsdEditTarget` 共同提示路径映射与编辑目标语境；读者应在 composition/path mapping 文档中确认 map 函数的方向和参数含义。",
      "`HdRenderBuffer`、`HdStRenderParam`、`HdChangeTracker`、`HdEmbreeRenderer`、`HdCollectionExpressionEvaluator`、`VdfParallelTaskSync`、`TraceCollector`、`TraceAggregateNode`、`TfPatternMatcher`、`GfRotation`、`VdfIndexedWeightsOperand` 和 `TfSmallVector<T, N>` 是渲染、执行、trace、模式匹配与容器工具线索。"
    ],
    terms: [
      ["path expression", "路径表达式"],
      ["predicate function result", "谓词函数结果"],
      ["composition query arc", "组合查询弧"],
      ["map function", "映射函数"],
      ["change tracker", "变更追踪器"],
      ["parallel task sync", "并行任务同步"]
    ]
  },
  {
    output: "full_site/api/functions_rela_s.html",
    title: "Class Members - Related Functions - S",
    notes: [
      "`functions_rela_s.html` 是 related functions 的 S 段索引，当前条目数量少但模块边界清晰，集中在 Sdf predicate/path expression、JsValue、Vdf connector/mask/node set 和 Vt 值容器。",
      "`SdfPredicateLibrary<DomainType>`、`SdfPredicateProgram<DomainType>` 与 `SdfPathExpressionEval<DomainType>` 属于 Sdf predicate program 和 path expression evaluation 主线；`DomainType` 是理解重载和适用域的关键 template 参数。",
      "`JsValue` 是 JSON-like 值容器线索，常和配置、解析或序列化相关工具一起出现；它不是 USD scene description 的 authored value 本身。",
      "`VdfConnectorMap<Connector>`、`VdfMask` 和 `VdfNodeSet` 指向 Vdf execution graph 的 connector 集合、mask 和 node set；这些 related functions 往往服务于图遍历、集合操作或调试输出。",
      "`VtArray<ELEM>`、`VtValue` 与 `VtValueRef` 是 Vt 值容器/类型擦除主线；使用本页时应先按 Sdf、Vdf、Vt、Js 四组分类，再跳转目标 class 页面核对函数签名。"
    ],
    terms: [
      ["related function index", "相关函数索引"],
      ["predicate library", "谓词库"],
      ["path expression evaluation", "路径表达式求值"],
      ["JSON-like value", "类 JSON 值"],
      ["connector map", "连接器映射"],
      ["type-erased value", "类型擦除值"]
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
