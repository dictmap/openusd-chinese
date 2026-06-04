import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-related-quality-pass-022";

const refinements = [
  {
    output: "full_site/api/functions_rela_s.html",
    title: "Class Members - Related Functions - S",
    notes: [
      "functions_rela_s.html 是 related functions 索引的 S 段，当前条目集中在 Sdf predicate/path expression、JsValue、Vdf 容器、VtArray/VtValue 等基础设施类型。",
      "SdfPredicateLibrary<DomainType>、SdfPredicateProgram<DomainType> 和 SdfPathExpressionEval<DomainType> 属于 Sdf 查询、路径表达式求值和 predicate program 相关入口；阅读时应保留模板参数 DomainType。",
      "JsValue、VtArray<ELEM>、VtValue、VtValueRef 偏值容器与类型擦除；VdfConnectorMap<Connector>、VdfMask、VdfNodeSet 偏执行图、连接器集合、mask 与 node set。",
      "本页不是 Sdf/Vdf/Vt 的完整教程；中文层主要帮助读者判断 related function 属于 predicate expression、值容器还是 Vdf 执行图，再进入对应 class 页面核对签名和语义。"
    ],
    terms: [
      ["predicate program", "谓词程序"],
      ["path expression", "路径表达式"],
      ["value container", "值容器"],
      ["connector map", "连接器映射"],
      ["node set", "节点集合"]
    ]
  },
  {
    output: "full_site/api/functions_rela_t.html",
    title: "Class Members - Related Functions - T",
    notes: [
      "functions_rela_t.html 是 related functions 索引的 T 段，条目数量较少，但跨越 Tf 引用计数、Ef 时间/向量键、Pcp 实例键、SdfSpec、TfToken 和 Python 方法结果包装。",
      "TfRefPtr<T> 与 TfRefBase 通常对应引用指针、引用基类、比较、输出或辅助构造类 related function；模板参数 T 应保持原样，方便与 C++ API 对照。",
      "Ef_VectorKey、EfTime 更偏执行/时间采样语境；PcpInstanceKey 用于 composition 实例键，SdfSpec 用于 scene description spec 基础对象，TfToken 用于 token 化字符串。",
      "TfPyMethodResult 表示 Python binding 返回值相关类型；如果读者在绑定层定位问题，应把本页当作跳转索引，而不是把所有 Python 行为都归在 TfToken 或 TfRefPtr 下。"
    ],
    terms: [
      ["reference pointer", "引用指针"],
      ["reference base", "引用基类"],
      ["instance key", "实例键"],
      ["spec object", "规格对象"],
      ["Python method result", "Python 方法结果"]
    ]
  },
  {
    output: "full_site/api/functions_rela.html",
    title: "Class Members - Related Functions",
    notes: [
      "functions_rela.html 是 related functions 总入口当前可见的 B 段索引，主要指向 UsdShadeMaterialBindingAPI 的相关函数。",
      "UsdShadeMaterialBindingAPI 是材质绑定相关 API；在 OpenUSD 中常用于把 material、collection binding、binding relationship 等语义连接到 gprim 或 prim 层级。",
      "本页当前条目很少，中文层重点说明它是 related function 分类页，而不是 UsdShadeMaterialBindingAPI 的完整使用指南；完整行为仍要进入具体类页面和相邻 UsdShade 文档核对。",
      "阅读时应保留 UsdShadeMaterialBindingAPI 原名，因为它既是 API schema 名称，也是搜索、链接和 Doxygen class 页面定位的稳定标识。"
    ],
    terms: [
      ["material binding", "材质绑定"],
      ["API schema", "API schema"],
      ["binding relationship", "绑定关系"],
      ["collection binding", "集合绑定"],
      ["related function index", "相关函数索引"]
    ]
  },
  {
    output: "full_site/api/functions_s.html",
    title: "Class Members - S",
    notes: [
      "functions_s.html 是 Class Members 总索引的 S 段，覆盖时间码、namespace edit、Hydra/Embree sampler、scene delegate、SdfLayer/Sdf file format、UsdStage、UsdSkel、GfVec 和 schema token 等多个模块。",
      "UsdTimeCode、UsdStage、SdfLayer、SdfNamespaceEdit、SdfFileFormat/SdfUsdaFileFormat/SdfUsdcFileFormat/SdfUsdFileFormat 说明本页包含 USD core 与 Sdf 数据层的高频成员入口。",
      "HdEmbree*Sampler、HdSceneDelegate、HdSceneIndexAdapterSceneDelegate、UsdImaging*Adapter、UsdImagingGLEngine 等条目偏 Hydra/Imaging/Embree 渲染和场景委托流程。",
      "GfVec2/3/4 d/f/h/i 与 UsdPhysicsRigidBodyDesc、UsdGeomTokensType、UsdSkelTokensType 混在同一字母段；中文导读按模块分组，避免把数学向量、物理描述和 schema token 混读。"
    ],
    terms: [
      ["scene delegate", "场景委托"],
      ["sampler", "采样器"],
      ["namespace edit", "命名空间编辑"],
      ["file format", "文件格式"],
      ["schema token", "schema token"]
    ]
  },
  {
    output: "full_site/api/functions_t.html",
    title: "Class Members - T",
    notes: [
      "functions_t.html 是 Class Members 总索引的 T 段，条目很密，跨越 VtValue、CLI OptionBase、diagnostic delegate、Vdf executor、UsdVol/UsdGeom token、Pcp error、UsdPhysicsJointDrive、Hydra/Work/Tf 基础设施等。",
      "VdfDatalessExecutor、VdfDataManagerBasedExecutor、VdfExecutorDataManager、VdfExecutorInterface、VdfParallelExecutorDataManager、VdfSpeculationExecutor 和 VdfExecutorBufferData 构成本页的 Vdf 执行器主线。",
      "PcpErrorUnresolvedPrimPath、PcpErrorInvalidAuthoredRelocation、PcpErrorInvalidConflictingRelocation、PcpErrorInvalidReferenceOffset、PcpErrorInvalidSameTargetRelocations、PcpErrorTargetPathBase、PcpErrorArcToProhibitedChild 是 composition error 相关入口。",
      "TfAnyWeakPtr、TfAtomicOfstreamWrapper、TfBaseException、TfBigRWMutex、TfBits、TfCompressedBits、TfRefPtr<T>、TfDenseHashMap 等偏 Tf 基础库；阅读本页时要先按 Vdf/Pcp/Tf/Hydra/UsdPhysics 分组，再进入具体条目。"
    ],
    terms: [
      ["executor", "执行器"],
      ["diagnostic delegate", "诊断委托"],
      ["composition error", "组合错误"],
      ["weak pointer", "弱指针"],
      ["joint drive", "关节驱动"]
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
