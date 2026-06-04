import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-index-quality-pass-018";

const refinements = [
  {
    output: "full_site/api/functions_func_y.html",
    title: "Class Members - Functions - Y",
    notes: [
      "functions_func_y.html 是 functions_func 系列尾部的 Y 段函数成员索引，当前条目很短，主要集中在 GfVec2/GfVec3/GfVec4 的 y 分量访问与 VdfExecutorBufferData。",
      "GfVec2d、GfVec2f、GfVec2h、GfVec2i 到 GfVec4d、GfVec4f、GfVec4h、GfVec4i 覆盖不同维度和不同数值精度的向量类型；这里的 Y 段通常用于定位 y() 或相关坐标分量函数。",
      "VdfExecutorBufferData 是 Vdf 执行器内部 buffer data 线索，和 GfVec 数学向量并不是同一层 API；本页中文导读把它单独标出，避免读者把执行缓冲和几何坐标分量混在一起。",
      "本页只是字母索引，不是完整 Gf 数学库说明；后续完整翻译需要进入具体 GfVec class 页确认构造、分量访问、算术操作和类型转换语义。"
    ],
    terms: [
      ["Y component", "Y 分量"],
      ["vector coordinate", "向量坐标"],
      ["numeric precision", "数值精度"],
      ["executor buffer", "执行器缓冲"],
      ["component accessor", "分量访问器"]
    ]
  },
  {
    output: "full_site/api/functions_func_z.html",
    title: "Class Members - Functions - Z",
    notes: [
      "functions_func_z.html 是 functions_func 系列尾部的 Z 段函数成员索引，当前只覆盖 GfVec3/GfVec4 系列向量类型，适合用于定位 z 分量相关函数。",
      "GfVec3d、GfVec3f、GfVec3h、GfVec3i 和 GfVec4d、GfVec4f、GfVec4h、GfVec4i 的后缀 d/f/h/i 分别表示不同底层数值表示；中文层保留英文类型名，便于和 API 签名一一对应。",
      "因为 GfVec2 没有 z 分量，本页从 GfVec3 开始是合理的；读者如果需要 x/y/z/w 的完整分量行为，应结合 X、Y、Z 段和 GfVec class 页一起读。",
      "本页不是向量运算教程，当前精修只补索引阅读边界和术语；具体的 z() 返回值、const 行为、引用语义或类型转换仍需要进入对应类页面核对。"
    ],
    terms: [
      ["Z component", "Z 分量"],
      ["3D vector", "三维向量"],
      ["4D vector", "四维向量"],
      ["type suffix", "类型后缀"],
      ["coordinate accessor", "坐标访问器"]
    ]
  },
  {
    output: "full_site/api/functions_enum.html",
    title: "Class Members - Enumerations",
    notes: [
      "functions_enum.html 是 Class Members - Enumerations 的总索引页，列出类成员枚举所在的类型，而不是列出普通函数；阅读时应把它和 functions_func 函数成员索引区分开。",
      "本页条目跨越 VdfPullBasedExecutorEngine、VdfInputSpec、UsdPrimCompositionQuery、SdfBooleanExpression、VdfSparseInputTraverser、PxOsdMeshTopologyValidation、TfCompressedBits、TraceEvent 等类型，说明枚举常用于执行模式、组合查询、表达式、拓扑校验和 tracing 分类。",
      "UsdLuxLightListAPI、UsdLuxListAPI、UsdShadeConnectableAPIBehavior、UsdSkelBakeSkinningParms、UsdGeomPointInstancer、UsdGeomXformCommonAPI 和 UsdGeomXformOp 是用户更可能直接遇到的 schema/geometry 枚举入口；具体枚举值含义仍要进入对应 class 页。",
      "HdExtComputation、HdStDrawTarget、HdSelection、HdSceneIndexPluginRegistry、HdCollectionExpressionEvaluator、UsdImagingPrimAdapter 等条目偏 Hydra/imaging；中文导读保留英文类名，帮助读者按渲染、composition、Sdf、Vdf 和 UsdGeom 线索分组。"
    ],
    terms: [
      ["enumeration", "枚举"],
      ["enum member", "枚举成员"],
      ["composition query", "组合查询"],
      ["topology validation", "拓扑校验"],
      ["imaging adapter", "成像适配器"]
    ]
  },
  {
    output: "full_site/api/functions_eval.html",
    title: "Class Members - Enumerator",
    notes: [
      "functions_eval.html 是 Class Members - Enumerator 的枚举值索引页，定位的是具体 enumerator，而不是枚举类型本身；它通常要和 functions_enum.html 配合阅读。",
      "TfType、UsdStageLoadRules、UsdGeomPointInstancer、SdfPredicateExpression::FnCall、TfMallocTag::CallTree、VdfSparseInputTraverser 和 VdfSparseVectorizedInputTraverser 指向类型系统、stage 加载规则、实例化、谓词表达式、内存追踪和稀疏输入遍历相关枚举值。",
      "UsdLuxLightListAPI、UsdLuxListAPI、HdExtComputation、PcpNamespaceEdits、SdfNamespaceEditDetail、UsdStage、UsdSkelBakeSkinningParms 与 UsdGeomXformOp 说明本页枚举值横跨 lighting、namespace edit、stage、skel baking 和 transform op。",
      "本页当前中文层重点说明 enumerator 与 enumeration 的区别；后续完整翻译时应补每个枚举值的英文原名、所属 enum、取值语义、默认值影响和常见使用场景。"
    ],
    terms: [
      ["enumerator", "枚举值"],
      ["enumeration type", "枚举类型"],
      ["load rules", "加载规则"],
      ["namespace edit detail", "命名空间编辑细节"],
      ["transform op", "变换操作"]
    ]
  },
  {
    output: "full_site/api/functions_func.html",
    title: "Class Members - Functions",
    notes: [
      "functions_func.html 是 Class Members - Functions 的总索引页，链接到具体函数成员所在类和各字母分段页；它的作用是入口导航，而不是替代每个函数成员的完整 API 说明。",
      "本页摘录包含 TraceCounterAccumulator、VdfExtensibleNode、VdfNode、VdfConnectorSpecs、TfEnum、VdfExecutionStats、VdfScheduler、ExecSystem、EfPageCacheBasedExecutor、VdfDatalessExecutor 和 VdfExecutorInterface，说明函数成员总索引大量覆盖执行网络和 tracing/performance 相关 API。",
      "HdStDispatchBuffer、HdSt*Buffer、HdStTextureObject、HdGpSceneIndexPlugin、HdPrman_*SceneIndexPlugin、HdSceneIndexPlugin、HdsiDebuggingSceneIndexPlugin、HdSceneIndexPluginRegistry、HdResourceRegistry 等条目偏 Hydra render/index/plugin 体系。",
      "ArResolver、UsdShadeConnectableAPIBehavior、SdfUsdaFileFormat、HfPluginRegistry、HdStExtCompCpuComputation 与 TraceReporterBase 则作为资产解析、shader behavior、文件格式、插件注册和 trace reporter 的交叉入口；中文导读帮助读者先按模块筛选，再进入具体 class 页。"
    ],
    terms: [
      ["function member", "函数成员"],
      ["index hub", "索引枢纽"],
      ["scene index plugin", "场景索引插件"],
      ["execution network", "执行网络"],
      ["trace reporter", "跟踪报告器"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index usage notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
