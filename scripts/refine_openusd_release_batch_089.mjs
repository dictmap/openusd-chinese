import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-089";

const refinements = [
  {
    output: "full_site/api/functions_e.html",
    title: "Class Members - E",
    notes: [
      "`functions_e.html` 是 Class Members 总索引的 E 段，当前条目把 time code、namespace edits、execution/evaluation cache、容器和 prim range 混在同一个 Doxygen 字母桶中；阅读时应先按模块拆分，再进入目标 class 页核对签名。",
      "`UsdTimeCode` 与 `UsdUtilsTimeCodeRange` 属于时间采样、动画值和帧范围工具；`EfTime`、`EfTimeInputNode`、`EfTimeInterval` 则属于 execution/evaluation framework 中的时间输入和时间区间对象，二者都和 time 有关但不在同一 API 层级。",
      "`SdfNamespaceEditDetail`、`SdfCopySpecsValueEdit` 和 `PcpNamespaceEdits` 共同指向 namespace edit/copy/edit-result 线索；它们用于理解路径重命名、移动、复制 spec 或 Pcp 层级编辑的底层结果，不等同于用户层面的简单 prim rename 命令。",
      "`Ef_OutputValueCache`、`EfDependencyCache`、`EfLeafNodeCache`、`EfMaskedSubExecutor`、`EfPageCacheExecutor<EngineType, DataManagerType>`、`EfPageCacheSubExecutor<EngineType, DataManagerType>` 和 `VdfIsolatedSubnetwork` 应放在执行缓存、page cache 和 subnetwork evaluation 中阅读。",
      "`VtArray<ELEM>`、`TfSmallVector<T, N>`、`TfDenseHashMap`、`TfDenseHashSet`、`TfSpan<T>`、`TfUtf8CodePointView`、`UsdPrimRange`、`UsdPrimSiblingRange`、`UsdPrimSubtreeRange` 与 `UsdNotice::ObjectsChanged::PathRange` 是基础容器和范围遍历线索；索引页只帮助定位，不替代容器语义说明。"
    ],
    terms: [
      ["letter bucket", "字母桶"],
      ["namespace edit detail", "命名空间编辑细节"],
      ["execution cache", "执行缓存"],
      ["page cache executor", "页面缓存执行器"],
      ["prim range traversal", "prim 范围遍历"],
      ["time code range", "时间码范围"]
    ]
  },
  {
    output: "full_site/api/functions_rela.html",
    title: "Class Members - Related Functions",
    notes: [
      "`functions_rela.html` 是 Class Members - Related Functions 的总入口，当前可见条目很少，主要指向 `UsdShadeMaterialBindingAPI`；这类 related function 页强调非成员函数或友元式辅助入口和所属 class 的关系。",
      "`UsdShadeMaterialBindingAPI` 是 material binding API schema 名称，也是 Doxygen class 页和搜索入口的稳定标识；中文导读保留原名，避免把它翻译成普通“材质绑定接口”而丢失 schema/API 身份。",
      "材质绑定相关条目通常要和 `material:binding` relationship、collection-based binding、binding strength、material purpose 和 ancestor/descendant resolution 一起理解；索引页只告诉读者相关函数挂在哪个 API 上。",
      "Related Functions 和 Class Members - Functions 不同：前者可能列出与类强相关但不是普通成员方法的函数；阅读时应进入 `UsdShadeMaterialBindingAPI` 页面核对函数位置、参数和使用限制。",
      "本页当前链接少，因此二次精修重点是页面类型辨识和跳转策略；后续如果官方 Doxygen 增加更多 related function 分段，也应继续按 schema domain 和 namespace 分组，而不是把所有条目合并解释。"
    ],
    terms: [
      ["related functions", "相关函数"],
      ["material binding API", "材质绑定 API"],
      ["API schema identity", "API schema 身份"],
      ["collection-based binding", "基于集合的绑定"],
      ["binding strength", "绑定强度"],
      ["jump target", "跳转目标"]
    ]
  },
  {
    output: "full_site/api/namespacemembers_func.html",
    title: "Namespace Members - Functions",
    notes: [
      "`namespacemembers_func.html` 是 Namespace Members: Functions 索引页，条目按函数名列出并链接到所属 namespace 或 group；它服务于跨 namespace 查找函数，而不是 class member lookup。",
      "`ShaderMetadataHelpers` 中的 `ComputeShownIfFromMetadata()`、`CreateStringFromStringVec()`、`GetRoleFromMetadata()` 和 `ParseSdfValue()` 应归入 shader metadata parsing/formatting 线索，常用于读取 shader definition 或 metadata 中的辅助字段。",
      "`VdfTestUtils` 的 `CreateSpeculationExecutor()` 表明 namespace function 索引也包含测试工具函数；它对理解 Vdf executor 测试有用，但不应被误读为用户层稳定运行时 API。",
      "`operator<<()` 链到 `pxr_CLI::CLI::enums` 和 `std`/debugging output group，说明该页也承载 stream output/operator overload 一类函数；函数名和 namespace 必须保留英文，中文只解释用途。",
      "阅读本页时建议三步走：先看函数名和 namespace，再判断它属于 shader metadata、Vdf test utility、CLI enum output 或 Tf debugging group，最后进入 namespace/group 页核对签名、include 和可见性。"
    ],
    terms: [
      ["namespace function index", "命名空间函数索引"],
      ["shader metadata helper", "shader 元数据辅助函数"],
      ["test utility function", "测试工具函数"],
      ["operator overload", "运算符重载"],
      ["debugging output group", "调试输出分组"],
      ["namespace ownership", "命名空间归属"]
    ]
  },
  {
    output: "full_site/api/functions_func_a.html",
    title: "Class Members - Functions - A",
    notes: [
      "`functions_func_a.html` 是 A 段函数成员索引，条目数量多且跨度大，常见语义包括 acquire、add、append、apply、assign、activate 和 access；本页应按 Sdf/Tf/Trace/Vdf/Hd/Usd/Work 等模块分层阅读。",
      "`TfBigRWMutex::ScopedLock`、`TfPyLock`、`TfSpinMutex`、`TfSpinMutex::ScopedLock`、`TfSpinRWMutex` 与 `TfSpinRWMutex::ScopedLock` 属于线程同步和作用域锁线索；这些类型的用法必须进入目标类页面确认锁粒度和生命周期。",
      "`TraceCollection::Visitor`、`TraceEventTree`、`TraceEventNode`、`TraceAggregateTree` 和 `TraceReporter` 组成 tracing/visitor/reporting 主线；`VdfIndexedWeightsOperand`、`Ef_LoftedOutputSet`、`EsfJournal` 和 Vdf test `Network` 则偏 execution/evaluation 框架。",
      "`SdfPath`、`SdfBatchNamespaceEdit`、`SdfVariableExpression::FunctionBuilder`、`PcpPrimIndex` 和 `UsdStagePopulationMask` 共同指向 scene description、namespace edit、variable expression、composition index 与 stage population control。",
      "`HgiGLDevice`、`GlfDrawTarget`、`HdStRenderPassShader`、`HdStShaderCode`、`HdStDispatchBuffer`、`HdPerfLog`、`HdUnitTestDelegate`、`HdChangeTracker` 和 `HdStResourceRegistry` 应放在 Hydra/Storm/rendering support 中阅读；`UsdGeomPointInstancer` 与 `UsdAttribute` 则回到 USD schema/object model。"
    ],
    terms: [
      ["scoped lock", "作用域锁"],
      ["trace visitor", "Trace 访问器"],
      ["namespace edit batch", "命名空间批量编辑"],
      ["population mask", "填充掩码"],
      ["render pass shader", "渲染 pass shader"],
      ["change tracker", "变更跟踪器"]
    ]
  },
  {
    output: "full_site/api/functions_func_i.html",
    title: "Class Members - Functions - I",
    notes: [
      "`functions_func_i.html` 是 I 段函数成员索引，常见语义包括 id、insert、initialize、include、is 和 iterator；本页条目覆盖 stage cache、Pcp map、Sdf layer/file format、Usd collection、validation、Hydra buffer range、memory diagnostics 和 Exec/Vdf。",
      "`UsdStageCache::Id`、`UsdStagePopulationMask`、`UsdCollectionAPI`、`UsdPrimRange` 和 `UsdValidationTimeRange` 说明 I 段包含 stage/cache identity、集合、遍历范围和验证时间范围；这些条目应和用户指南中的 stage loading/validation 概念分开核对。",
      "`PcpMapExpression`、`PcpMapFunction`、`PcpPrimIndexInputs` 与 `SdfLayer::DetachedLayerRules` 属于 composition/path mapping/layer loading 线索；它们解释路径映射、prim index 输入和 detached layer 规则，不是普通文件路径工具。",
      "`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat`、`SdfUsdFileFormat`、`SdfUsdzFileFormat` 和 `SdfLayer` 指向 layer/file format 实现；阅读时要保留格式名英文，确认 ASCII、Crate、package 等语义。",
      "`HdBufferArray`、`HdBufferArrayRange`、`HdStInterleavedMemoryManager::_StripedInterleavedBufferRange`、`HdStVBOMemoryManager::_StripedBufferArrayRange`、`HdxOitBufferAccessor`、`GlfContextCaps`、`HdDataSourceLocatorSet`、`ArchMallocHook`、`TfMallocTag`、`VdfSchedule` 和 `VdfExecutorInterface` 展示本页还跨到渲染 buffer、OpenGL/Hydra capabilities、内存诊断和执行调度。"
    ],
    terms: [
      ["stage cache id", "stage cache 标识"],
      ["map expression", "映射表达式"],
      ["detached layer rules", "分离 layer 规则"],
      ["file format implementation", "文件格式实现"],
      ["buffer array range", "buffer array 范围"],
      ["memory diagnostics", "内存诊断"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引、命名空间函数索引或 related functions 页面二次精修说明，重点解释 Doxygen 字母桶、函数成员索引、namespace ownership、related function 边界和跨模块条目的归类方式，以及何时应跳转到目标 class、schema、namespace、header、group 或用户指南。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index, namespace-function index, or related-functions page. It explains how to read Doxygen letter buckets, function-member indexes, namespace ownership, related-function boundaries, and cross-module entry groupings, and when to jump to target class, schema, namespace, header, group, or user-guide documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
