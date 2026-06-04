import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-func-quality-pass-015";

const refinements = [
  {
    output: "full_site/api/functions_func_j.html",
    title: "Class Members - Functions - J",
    notes: [
      "functions_func_j.html 是 Doxygen 函数成员索引的 J 段，条目数量很少，主要用于快速跳到少量以 j 开头的成员函数或相关类页面。",
      "本页摘录包含 CLI OptionBase、SdfPath、UsdSkelAnimQuery、JsValue 与 JsWriter；它横跨命令行选项、路径处理、骨骼动画查询和 JSON 写入/值表示。",
      "JsValue 与 JsWriter 属于 OpenUSD 内部 JSON 辅助类型；UsdSkelAnimQuery 指向骨骼动画采样查询；SdfPath 是 USD 路径语义的基础类型。",
      "因为本页索引很短，中文层重点说明每个模块的入口意义，而不是机械扩写少量链接文字；具体 join/JSON/查询函数语义仍需进入对应 class 页面确认。"
    ],
    terms: [
      ["JSON writer", "JSON 写入器"],
      ["animation query", "动画查询"],
      ["path type", "路径类型"],
      ["command-line option", "命令行选项"],
      ["function index", "函数索引"]
    ]
  },
  {
    output: "full_site/api/functions_func_k.html",
    title: "Class Members - Functions - K",
    notes: [
      "functions_func_k.html 是 K 段函数成员索引，当前清单内只有少量条目，主要落在 SdfChildrenView 和 SdfNotice::LayerInfoDidChange 附近。",
      "SdfChildrenView 用于以视图方式访问 Sdf 层级对象的子项，常见于需要遍历或过滤 scene description 子结构的 API 使用场景。",
      "SdfNotice::LayerInfoDidChange 是通知类型，表示 layer metadata 或 layer info 变化；读者应把它归入通知/观察者机制，而不是普通数据容器。",
      "本页不是完整的 Sdf 教程，只提供 K 段索引定位；下一步应通过本地链接进入 SdfChildrenView 或 notice 页面查看实际成员函数、生命周期和回调语义。"
    ],
    terms: [
      ["children view", "子项视图"],
      ["layer info", "层信息"],
      ["notice", "通知"],
      ["observer mechanism", "观察者机制"],
      ["metadata change", "元数据变化"]
    ]
  },
  {
    output: "full_site/api/functions_func_l.html",
    title: "Class Members - Functions - L",
    notes: [
      "functions_func_l.html 收录 L 段函数成员索引，条目跨度明显更大，包含 CLI formatter、TfSpan、VdfIndexedWeightsOperand、UsdLux light base、Sdf 数据层、PlugPlugin、UsdStage 和 Trace/Vdf 执行统计。",
      "UsdLuxBoundableLightBase 与 UsdLuxNonboundableLightBase 用于区分有几何边界的灯光和无边界灯光；HdStGLSLProgram、HdRenderThread、HdStDynamicUvTextureImplementation 则偏 Hydra 渲染执行路径。",
      "SdfAbstractData、SdfData、SdfLayer、SdfSpec 和 UsdPrimDefinition 帮助定位 scene description 数据模型和 schema 定义；PlugPlugin 与 TfScriptModuleLoader 指向插件和脚本模块加载。",
      "TraceReporter、VdfExecutionStats、VdfEvaluationState、VdfExecutorErrorLogger、VdfLRUCache 等条目用于调试执行网络、缓存和性能统计；中文说明保留英文类名以便搜索。"
    ],
    terms: [
      ["boundable light", "有边界灯光"],
      ["nonboundable light", "无边界灯光"],
      ["plugin loader", "插件加载器"],
      ["execution stats", "执行统计"],
      ["LRU cache", "最近最少使用缓存"]
    ]
  },
  {
    output: "full_site/api/functions_func_m.html",
    title: "Class Members - Functions - M",
    notes: [
      "functions_func_m.html 是 M 段函数成员索引，覆盖 formatter、Sdf expression、UsdGeom、UsdSchemaRegistry、UsdPrimCompositionQueryArc、UsdEditTarget、HdChangeTracker、Trace 与 Vdf 并行同步等入口。",
      "SdfPathExpression、SdfBooleanExpression、SdfPredicateExpression、SdfVariableExpression 和 SdfPathExpressionEval 属于表达式和谓词求值路径，适合从这里进入条件匹配、路径集合和变量表达式相关 API。",
      "UsdGeomImageable、UsdGeomXformable、UsdSchemaRegistry、UsdPrim、UsdRiStatementsAPI 与 VtArray 是用户常见工作流会直接遇到的 API；HdRenderBuffer、HdEmbreeRenderer、HdCollectionExpressionEvaluator 更偏渲染和 Hydra 侧实现。",
      "PcpMapExpression、PcpMapFunction 与 UsdEditTarget 关联 composition 路径映射和编辑目标；ArchMallocHook、TraceCollector、TraceAggregateNode、TfPatternMatcher 用于内存、追踪和模式匹配诊断。"
    ],
    terms: [
      ["path expression", "路径表达式"],
      ["predicate expression", "谓词表达式"],
      ["edit target", "编辑目标"],
      ["change tracker", "变更追踪器"],
      ["parallel task sync", "并行任务同步"]
    ]
  },
  {
    output: "full_site/api/functions_func_n.html",
    title: "Class Members - Functions - N",
    notes: [
      "functions_func_n.html 收录 N 段函数成员索引，前半部分包含 CLI App/Validator、UsdGeomPrimvar、HdBufferArray、Ef_PageCache、GlfDrawTarget/UniformBlock 和大量 Hydra scene index 类型。",
      "HdCachingSceneIndex、HdFlatteningSceneIndex、HdPrefixingSceneIndex、HdRenderIndex、HdRetainedSceneIndex 与 Hdsi* 条目说明本页可用于定位 Hydra scene index pipeline 中的节点、缓存、前缀处理和通知批处理。",
      "PcpErrorArcCycle、PcpErrorInvalidAssetPath、PcpErrorInvalidReferenceOffset、PcpErrorInvalidSublayerPath 等大量 PcpError 条目用于 composition 错误诊断；阅读时应把它们归入错误类型索引，而不是正常执行流程。",
      "本页中文导读突出两条主线：Hydra scene index 与 Pcp composition error。API 名称、错误类名和链接保持原样，便于读者从本地索引进入具体错误解释或渲染管线对象页面。"
    ],
    terms: [
      ["scene index", "场景索引"],
      ["render index", "渲染索引"],
      ["composition error", "组合错误"],
      ["arc cycle", "弧循环"],
      ["notice batching", "通知批处理"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块辨识和术语对照；英文页面名、API 符号、模板参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
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
