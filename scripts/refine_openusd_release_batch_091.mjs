import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-091";

const refinements = [
  {
    output: "full_site/api/functions_func_s.html",
    title: "Class Members - Functions - S",
    notes: [
      "`functions_func_s.html` 是 S 段函数成员索引，常见语义包括 save、sample、schedule、set、spline、scoped lock 和 scene delegate；当前页面横跨 time/sample、Embree sampler、UsdImaging adapter、Sdf layer/file format、Vdf scheduler 和 Trace collector。",
      "`UsdTimeCode`、`TsSpline`、`UsdStage`、`SdfLayer`、`SdfZipFileWriter`、`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat` 与 `SdfUsdFileFormat` 可作为时间值、样条曲线、stage/layer 保存和文件格式相关函数的定位入口。",
      "`HdEmbreeBufferSampler`、`HdEmbreeConstantSampler`、`HdEmbreePrimvarSampler`、`HdEmbreeSubdivVertexSampler`、`HdEmbreeTriangleFaceVaryingSampler`、`HdEmbreeTriangleVertexSampler` 和 `HdEmbreeUniformSampler` 属于 Embree 渲染后端采样器族。",
      "`HdSceneDelegate`、`HdSceneIndexAdapterSceneDelegate`、`UsdImagingDelegate`、`UsdImagingPrimAdapter`、`UsdImagingInstanceAdapter` 和 `UsdImagingPointInstancerAdapter` 表明 S 段也包含 Hydra scene delegate 与 USD imaging adapter 的切换点。",
      "`TfBigRWMutex::ScopedLock`、`TfSpinMutex::ScopedLock`、`TfSpinRWMutex::ScopedLock` 是 RAII scoped lock 线索；`SdfAllowed`、`SdfAssetPath`、`SdfBatchNamespaceEdit`、`SdfNamespaceEdit`、`SdfPathExpression`、`HdRenderIndex`、`VdfScheduler` 和 `TraceCollector` 则分别落在 Sdf validation/path、Hydra render index、Vdf scheduling 和 tracing。"
    ],
    terms: [
      ["Embree sampler", "Embree 采样器"],
      ["scene delegate", "scene delegate"],
      ["imaging adapter", "imaging 适配器"],
      ["scoped lock", "作用域锁"],
      ["file format save path", "文件格式保存路径"],
      ["scheduler", "调度器"]
    ]
  },
  {
    output: "full_site/api/namespacemembers_type.html",
    title: "Namespace Members - Typedefs",
    notes: [
      "`namespacemembers_type.html` 是 namespace typedefs 索引页，当前条目很短，主要列出 `pxr_tsl` namespace 下的 typedef；它的作用是帮助从类型别名跳回 namespace 或容器实现。",
      "`robin_pg_map` 和 `robin_pg_set` 是本页核心条目，均链接到 `pxr_tsl`；名称中的 `robin` 指向 robin hood hashing/open-addressing 容器实现，`pg` 不能随意翻译或展开。",
      "typedef 索引和 class 索引不同：这里展示的是别名名称与所属 namespace，而不是完整模板类声明；如果要查 template 参数、allocator、hash policy 或 growth policy，应继续进入 `pxr_tsl`、`robin_map` 或 `robin_set` 页面。",
      "中文层保留 `robin_pg_map`、`robin_pg_set`、`pxr_tsl` 原样，是为了保持代码搜索、Doxygen 跳转和 GitHub 搜索一致；只在旁边说明“类型别名”和容器用途。",
      "这类短索引页不需要强行扩展成概念教程；后续可把它作为 Tf/container 基础设施的一环，与 `TfDenseHashMap`、`TfDenseHashSet`、`VtDictionary` 等容器页一起阅读。"
    ],
    terms: [
      ["typedef index", "类型别名索引"],
      ["robin hood hashing", "robin hood hashing"],
      ["open addressing", "开放寻址"],
      ["container alias", "容器别名"],
      ["namespace typedef", "命名空间类型别名"],
      ["template policy", "模板策略"]
    ]
  },
  {
    output: "full_site/api/functions_b.html",
    title: "Class Members - B",
    notes: [
      "`functions_b.html` 是 Class Members 总索引 B 段，条目集中在 begin/buffer/block/bind 等语义附近；当前内容覆盖 Sdf/Tf/Vt 容器视图、Vdf data manager、Ef page cache、Hydra data source、USD prim range 和 Tf diagnostics。",
      "`SdfChildrenView<_ChildPolicy, _Predicate, _Adapter>`、`SdfListProxy<_TypePolicy>`、`SdfPathTable<MappedType>`、`SdfZipFile`、`TfSmallVector<T, N>`、`TfSpan<T>`、`VtArray<ELEM>`、`VtDictionary` 和 `TfIterator<T, Reverse>` 共同构成基础容器/视图/迭代器线索。",
      "`VdfDataManagerHashTable`、`VdfDataManagerVector<DeallocationMode>`、`VdfExecutorDataManager<DerivedClass>`、`VdfParallelDataManagerVector`、`VdfParallelExecutorDataManager`、`VdfParallelExecutorEngine` 和 `VdfParallelSpeculationExecutorEngine` 属于 Vdf 执行数据管理和并行求值主线。",
      "`Ef_PageCache`、`EfInputValueBlock`、`Vdf_WeightSlotArray`、`VdfConnectorMap<Connector>`、`VdfConnectorSpecs<T>`、`VdfIteratorRange<Iterator>`、`VdfMask` 与 `VdfNodeSet` 应和 execution/evaluation graph 一起阅读，而非普通 STL 容器。",
      "`UsdUITokensType`、`UsdGeomTokensType`、`TsSpline`、`GlfGLQueryObject`、`HdDataSourceLocatorSet`、`PxOsdMeshTopologyValidation`、`TfErrorMark`、`UsdPrimRange`、`UsdPrimSiblingRange`、`UsdPrimSubtreeRange`、`UsdUtilsTimeCodeRange` 和 `TfPyLock` 展示 B 段还覆盖 UI/Geom token、spline、GL query、Hydra locator、topology validation、diagnostics 和 prim traversal。"
    ],
    terms: [
      ["class member bucket", "类成员字母桶"],
      ["container view", "容器视图"],
      ["parallel evaluation", "并行求值"],
      ["connector specs", "连接器规格"],
      ["prim traversal", "prim 遍历"],
      ["diagnostic marker", "诊断标记"]
    ]
  },
  {
    output: "full_site/api/functions_func_b.html",
    title: "Class Members - Functions - B",
    notes: [
      "`functions_func_b.html` 是 B 段函数成员索引，和 `functions_b.html` 相比更偏具体函数入口；本页仍以容器、缓存、buffer、绑定和渲染状态为主要线索。",
      "`SdfChildrenView`、`SdfListProxy`、`TfSmallVector`、`TfSpan`、`VtArray`、`TfIterator`、`TfDenseHashMap`、`TfDenseHashSet`、`VtDictionary` 与 `TfPyLock` 是基础容器、视图、hash 和 Python lock 支撑，不应与 Hydra buffer 概念混读。",
      "`Ef_PageCache`、`EfInputValueBlock`、`Vdf_WeightSlotArray`、`VdfConnectorMap`、`VdfConnectorSpecs`、`VdfIteratorRange`、`VdfMask` 与 `VdfNodeSet` 属于 execution/evaluation graph，适合从这里跳转到 Vdf/Ef 相关 class 页面核对函数签名。",
      "`GlfGLQueryObject`、`GlfDrawTarget`、`GlfUniformBlock`、`HdDataSourceLocatorSet`、`HdStRenderPassState` 和 `PxOsdMeshTopologyValidation` 指向 GL/Hydra/Storm 渲染支撑、data source locator 与 topology validation。",
      "`ArPackageResolver`、`ArResolver`、`TfNotice::Probe`、`TraceCollector`、`UsdShadeCoordSysAPI` 和 `UsdShadeMaterialBindingAPI` 说明 B 段还包含 asset resolver、notice/tracing 和 UsdShade binding/coordSys 入口；这些条目需要按模块跳转而不是逐项翻译。"
    ],
    terms: [
      ["function-member bucket", "函数成员字母桶"],
      ["page cache", "页面缓存"],
      ["buffer source", "buffer 来源"],
      ["render pass state", "渲染 pass 状态"],
      ["package resolver", "包解析器"],
      ["material binding API", "材质绑定 API"]
    ]
  },
  {
    output: "full_site/api/functions_func.html",
    title: "Class Members - Functions",
    notes: [
      "`functions_func.html` 是 Class Members - Functions 总索引页，用来进入具体字母分段和目标 class；它不是某个模块的概念页，不能用单一主题概括所有条目。",
      "`TraceCounterAccumulator`、`TraceReporterBase`、`VdfExtensibleNode`、`VdfNode`、`VdfConnectorSpecs<T>`、`VdfExecutionStats`、`VdfScheduler`、`ExecSystem`、`EfMaskedSubExecutor`、`EfPageCacheBasedExecutor`、`VdfDatalessExecutor` 和 `VdfExecutorInterface` 说明总索引大量覆盖 execution network、tracing 和 performance 统计。",
      "`HdStDispatchBuffer`、`HdStInterleavedMemoryManager::_StripedInterleavedBuffer`、`HdStVBOMemoryManager::_StripedBufferArray`、`HdStTextureObject`、`HdBufferSource`、`HdVtBufferSource` 和 `HdStExtComp*BufferSource` 属于 Hydra/Storm buffer、texture 和 ext computation support。",
      "`HdGpSceneIndexPlugin`、`HdPrman_*SceneIndexPlugin`、`HdSceneIndexPlugin`、`HdsiDebuggingSceneIndexPlugin`、`HdSceneIndexPluginRegistry`、`HfPluginRegistry` 和 `HdResourceRegistry` 表示本页也是 scene index/plugin registry 和 resource registry 的入口。",
      "`ArResolver`、`UsdShadeConnectableAPIBehavior`、`SdfUsdaFileFormat`、`TfEnum`、`HfPluginRegistry` 等条目展示资产解析、UsdShade connectable behavior、文件格式和基础枚举支持；中文导读的作用是帮助读者先按模块筛选，再跳到 class 页面。"
    ],
    terms: [
      ["function index root", "函数索引根页"],
      ["execution network", "执行网络"],
      ["trace reporter", "Trace 报告器"],
      ["scene index plugin", "scene index 插件"],
      ["resource registry", "资源注册表"],
      ["connectable API behavior", "可连接 API 行为"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引、namespace typedefs 或函数成员总入口页面的二次精修说明，重点解释 Doxygen 字母桶、函数/类型别名索引、模块归属、容器与执行系统条目的边界，以及何时应跳转到目标 class、namespace、header、group、模块入口或用户指南。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index, namespace typedefs page, or function-member root page. It explains how to read Doxygen letter buckets, function/type-alias indexes, module ownership, container and execution-system boundaries, and when to jump to target class, namespace, header, group, module-front, or user-guide documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
