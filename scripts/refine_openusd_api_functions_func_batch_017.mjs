import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-func-quality-pass-017";

const refinements = [
  {
    output: "full_site/api/functions_func_t.html",
    title: "Class Members - Functions - T",
    notes: [
      "functions_func_t.html 是 Class Members - Functions 索引的 T 段，条目集中在 Tf 基础设施、Vdf executor、UsdUtils diagnostic delegate 和少量 UsdImaging/Hd 入口；它适合作为调试、执行和 Python 绑定相关函数的跳转页。",
      "VdfDatalessExecutor、VdfDataManagerBasedExecutor、VdfExecutorDataManager、VdfExecutorInterface、VdfParallelExecutorDataManager 与 VdfSpeculationExecutor 指向 Vdf 执行网络的不同 executor/data manager 组合；阅读时要保留 DataManagerType、BaseClass、DerivedClass、EngineType 等 template 参数。",
      "TfDiagnosticBase、TfDiagnosticTransport、TfDiagnosticTrap、TfErrorMark、TfErrorTransport 与 UsdUtilsCoalescingDiagnosticDelegate 属于诊断、错误收集和错误传输线索；它们和 Vdf 执行器常在调试或批量报告问题时一起出现。",
      "TfAnyWeakPtr、TfDelegatedCountPtr、TfDenseHashMap、TfDenseHashSet、TfPyArg、TfPyCall、TfPyLock、TfPyObjWrapper、TfPyOverride 等条目属于 Tf 容器、智能指针和 Python 绑定支撑层；中文导读保留英文 API 名，避免弱指针、锁和 Python 调用包装语义被误读。"
    ],
    terms: [
      ["executor", "执行器"],
      ["data manager", "数据管理器"],
      ["diagnostic transport", "诊断传输"],
      ["weak pointer", "弱指针"],
      ["Python binding", "Python 绑定"]
    ]
  },
  {
    output: "full_site/api/functions_func_u.html",
    title: "Class Members - Functions - U",
    notes: [
      "functions_func_u.html 是 U 段函数成员索引，条目常围绕 update/unload/unregister/use 等语义展开，同时跨越 Glf、UsdShade、Ar、HdSt、Vt、Gf、UsdStage、Vdf 和 Trace。",
      "UsdShadeMaterialBindingAPI、UsdPrim、UsdStage、UsdStageLoadRules、UsdStagePopulationMask、SdfLayer 和 SdfPathTable 是 USD scene/stage 侧的入口；它们适合用于定位 stage population、load rule、material binding 与 layer/path table 相关函数。",
      "VtValue、VtValueRef、VtMutableValueRef 与 GfRange1d/1f/2d/2f/3d/3f、GfRect2i 提供值容器和几何范围类型线索；阅读时不要把 VtValue 译成单一 C++ 类型，它是运行时类型擦除值容器。",
      "HdStRenderPassShader、HdStShaderCode、HdStSimpleLightingShader、HdRenderBuffer、GlfDrawTarget、GlfUniformBlock 与 UsdImagingBasisCurvesAdapter 偏渲染和 imaging；VdfScheduler、VdfNetwork、VdfDataManagerVector 与 TraceCounterAccumulator 则偏执行调度和性能计数。"
    ],
    terms: [
      ["material binding", "材质绑定"],
      ["population mask", "加载人口遮罩"],
      ["value reference", "值引用"],
      ["render pass shader", "渲染 pass 着色器"],
      ["counter accumulator", "计数器累加器"]
    ]
  },
  {
    output: "full_site/api/functions_func_v.html",
    title: "Class Members - Functions - V",
    notes: [
      "functions_func_v.html 是 V 段函数成员索引，当前内容以 validate/validation、value、vector、Vdf 数据访问和 USD 验证入口为主。",
      "UsdValidationContext、UsdValidationValidator、UsdAttributeLimits、UsdAttributeLimits::ValidationResult、CLI App/Validator 共同构成验证相关线索；它们适合从这里进入 schema、attribute limit 或命令行校验逻辑。",
      "UsdSkelTopology、UsdSkelBindingAPI、UsdSkelBlendShape、UsdGeomMesh、UsdGeomSubset、UsdGeomPrimvar、UsdCollectionAPI 和 UsdRiSplineAPI 是用户更可能直接查阅的高层 API；本页只负责定位，具体成员说明仍需进入对应 class 页。",
      "Vdf_BoxedContainer、Vdf_BoxedRanges、Vdf_VectorAccessor、Vdf_VectorImplCompressed、Vdf_VectorImplContiguous、Vdf_VectorSubrangeAccessor、Vdf_WeightSlotArray 和 VdfConnectorMap 等条目偏底层执行/向量存储；中文层保留下划线类名和 template 参数，方便与源码符号对应。"
    ],
    terms: [
      ["validation context", "验证上下文"],
      ["attribute limits", "属性限制"],
      ["blend shape", "混合形状"],
      ["vector accessor", "向量访问器"],
      ["boxed range", "装箱范围"]
    ]
  },
  {
    output: "full_site/api/functions_func_w.html",
    title: "Class Members - Functions - W",
    notes: [
      "functions_func_w.html 是 W 段函数成员索引，关键词集中在 Work task、wait、write、watch、wrap 等语义附近，同时覆盖 Sdf、Vdf、Ef、Ar、Hio、Trace、Hgi 与 JsWriter。",
      "WorkTaskGraph、WorkSingularTask、VdfParallelTaskWaitlist、VdfContext、VdfNetwork::EditMonitor 与 EfPageCacheBasedExecutor / EfPageCacheStorage 指向并行任务、等待队列、执行上下文和缓存执行路径。",
      "ArWritableAsset、ArFilesystemWritableAsset、HioImage、SdfFileFormat、SdfUsdaFileFormat、SdfUsdcFileFormat、SdfUsdFileFormat、SdfUsdzFileFormat、SdfAbstractData 和 SdfSpec 是 write/file-format/data-spec 相关入口；它们帮助区分可写资产、图片写出和 USD layer 格式写出。",
      "SdfPathExpression、SdfPredicateExpression、ExpressionReference、SdfNotice::LayerMutenessChanged、TraceSerialization、TraceEventData、JsWriter 和 HgiShaderSection 分别指向表达式引用、layer muteness 通知、trace 序列化、JSON 写出和 shader section 生成。"
    ],
    terms: [
      ["task graph", "任务图"],
      ["waitlist", "等待队列"],
      ["writable asset", "可写资产"],
      ["layer muteness", "图层静音状态"],
      ["trace serialization", "跟踪序列化"]
    ]
  },
  {
    output: "full_site/api/functions_func_x.html",
    title: "Class Members - Functions - X",
    notes: [
      "functions_func_x.html 是 X 段函数成员索引，当前条目很短，主要围绕 GfVec2/3/4 系列数学向量和 UsdGeomXformable::XformQuery 展开。",
      "GfVec2d、GfVec2f、GfVec2h、GfVec2i 到 GfVec4d、GfVec4f、GfVec4h、GfVec4i 覆盖不同维度和精度的向量类型；后缀 d/f/h/i 分别对应 double、float、half、int 风格的数值表示。",
      "UsdGeomXformable::XformQuery 是变换查询入口，通常用于缓存和读取 xform stack 的组合结果；它和 GfVec 向量类型一起出现时，读者应区分数学容器类型与 scene prim 变换查询 API。",
      "本页因为条目少，中文导读重点是解释 X 段的阅读边界：它不是完整 Gf 数学库教程，也不是 UsdGeom xform 教程；后续完整翻译需要进入向量类和 XformQuery class 页逐项补签名与示例。"
    ],
    terms: [
      ["vector type", "向量类型"],
      ["half precision", "半精度"],
      ["xform stack", "变换栈"],
      ["transform query", "变换查询"],
      ["numeric suffix", "数值后缀"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first function-index usage notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
