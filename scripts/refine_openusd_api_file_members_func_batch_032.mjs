import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-func-quality-pass-032";

const refinements = [
  {
    output: "full_site/api/globals_func_o.html",
    title: "File Members - Functions - O",
    notes: [
      "globals_func_o.html 是 File Members 函数子索引 O 段，本地 406 页范围里没有 q/r 段文件，因此本轮按实际存在的 O/P/S/T/U 五页推进。",
      "本页主要收集 operator overload 条目，包括 `operator+()`、`operator==()`、`operator>>()` 和 `operator^()`；这些符号应作为 C++ 运算符函数名保留，不翻译成普通中文词。",
      "`operator+()` 链到 `indexedWeightsOperand.h`，适合从索引进入 UsdSkel indexed weights operand 的合并或加法语义核对；实际参数、返回值和异常行为需查看头文件页面。",
      "`operator==()` 链到 `dictionary.h`，`operator>>()` 链到 `timeCodeRange.h`，说明本页混合容器比较、时间码范围流读取，以及 Gf vector 运算等不同模块入口。",
      "`operator^()` 链到 `vec3d.h`、`vec3f.h`、`vec3h.h`，在 Gf 三维向量上下文里通常对应叉积式运算；中文导读只说明导航和模块边界，不替代具体 overload 文档。"
    ],
    terms: [
      ["operator overload", "运算符重载"],
      ["function sub-index", "函数子索引"],
      ["indexed weights operand", "索引权重操作数"],
      ["stream extraction operator", "流提取运算符"],
      ["vector operation", "向量运算"]
    ]
  },
  {
    output: "full_site/api/globals_func_p.html",
    title: "File Members - Functions - P",
    notes: [
      "globals_func_p.html 是 File Members 函数子索引 P 段，核心集中在 Pcp composition site 相关工具函数，来源主要是 `composeSite.h`。",
      "`PcpComposeSiteChildNames()`、`PcpComposeSitePrimSites()`、`PcpComposeSiteReferences()`、`PcpComposeSitePayloads()` 等函数用于从 Pcp 组合站点读取或推导子名称、prim site、references、payloads 等组合信息。",
      "`PcpComposeSiteHasPrimSpecs()`、`PcpComposeSiteHasSpecs()`、`PcpComposeSiteHasSymmetry()`、`PcpComposeSiteHasValueClips()` 属于布尔检查类入口，可先按 has/compose 两类区分阅读。",
      "`PcpComposeSiteVariantSelection()` 与 `PcpComposeSiteVariantSelections()` 指向 variant selection 语义；读者应保留 Pcp、variant、payload、reference 等术语英文原样，避免和普通场景层级概念混淆。",
      "本页还链接 `layerStackIdentifier.h`、`types.h`、`pathTranslation.h`，提示 Pcp composition site 与 layer stack、路径翻译和基础类型共同工作；本轮补中文导航，不改动函数列表和链接。"
    ],
    terms: [
      ["Pcp composition site", "Pcp 组合站点"],
      ["prim specs", "prim 规格"],
      ["payloads", "payloads"],
      ["variant selection", "variant 选择"],
      ["path translation", "路径翻译"]
    ]
  },
  {
    output: "full_site/api/globals_func_s.html",
    title: "File Members - Functions - S",
    notes: [
      "globals_func_s.html 是 File Members 函数子索引 S 段，条目主要覆盖 Sdf 工具函数，并少量包含 StageLoadRules 与 filesystem discovery helpers。",
      "`SdfAnchorAssetPaths()`、`SdfComputeAssetPathRelativeToLayer()` 与 asset path/layer 解析相关；阅读时应把资产路径锚定、相对路径计算和 layer 语境放在一起理解。",
      "`SdfCopySpec()`、`SdfCreatePrimAttributeInLayer()`、`SdfCreatePrimInLayer()`、`SdfCreateRelationshipInLayer()`、`SdfCreateVariantInLayer()` 指向在 layer 中复制或创建 spec 的工具入口。",
      "`SdfGetRoleNameForValueTypeName()`、`SdfGetTypeForValueTypeName()`、`SdfGetNameForUnit()` 等函数属于 value type、role、unit 查询和转换语境，适合与 `types.h` 对照阅读。",
      "本页的中文层按 asset path、spec 创建、类型/单位查询和辅助工具分组说明，保留 Sdf 函数名、头文件名与英文摘录，避免破坏 API 检索。"
    ],
    terms: [
      ["asset path anchoring", "资产路径锚定"],
      ["layer-relative path", "相对 layer 的路径"],
      ["copy spec", "复制 spec"],
      ["value type name", "值类型名称"],
      ["unit conversion", "单位转换"]
    ]
  },
  {
    output: "full_site/api/globals_func_t.html",
    title: "File Members - Functions - T",
    notes: [
      "globals_func_t.html 是 File Members 函数子索引 T 段，密集覆盖 Tf 基础设施函数、宏和 Python 互操作辅助入口。",
      "`TF_DEBUG_CODES()` 与 `TF_DECLARE_PUBLIC_TOKENS()` 是宏类入口，分别关联 debug codes 和 public tokens 声明；这些宏名必须保持英文和大小写原样。",
      "`TfAbs()`、`TfAbsPath()`、`TfArraySize()`、`TfDoubleToString()`、`TfEscapeString()` 等是基础工具函数，涉及数学、路径、数组和字符串处理。",
      "`TfDlopen()`、`TfDlclose()`、`TfDeleteFile()`、`TfFindLongestAccessiblePrefix()` 等条目指向动态库、文件和路径工具；`TfDynamic_cast()`、`TfCastToMostDerivedType()` 则属于 C++ 类型转换语境。",
      "页面还包含 `TfGetEnvSetting()`、diagnostic、hash、unicode、span、tryInvoke、pyUtils、pyInterpreter、pyInvoke、errorMark 等入口，说明本页是 Tf support library 的宽入口索引，而不是单一主题教程。"
    ],
    terms: [
      ["debug codes", "调试代码"],
      ["public tokens", "公开 tokens"],
      ["dynamic library", "动态库"],
      ["type casting", "类型转换"],
      ["Python interop", "Python 互操作"]
    ]
  },
  {
    output: "full_site/api/globals_func_u.html",
    title: "File Members - Functions - U",
    notes: [
      "globals_func_u.html 是 File Members 函数子索引 U 段，集中在 Usd、UsdGeom、UsdShade、UsdUtils、UsdPhysics 和相关工具函数入口。",
      "`UsdAppUtilsGetCameraAtPath()`、collection membership query、`UsdFlattenLayerStack()`、asset path resolve 等函数适合从应用工具、集合成员关系和 layer stack flatten 三条线阅读。",
      "`UsdGeomGetFallbackUpAxis()`、`UsdGeomGetStageMetersPerUnit()`、`UsdGeomGetStageUpAxis()` 等 metrics 相关函数用于 stage 坐标系和单位查询；这些应与 `metrics.h` 中的 upAxis/metersPerUnit 语义核对。",
      "本页还链接 point instancer、extent、collection predicate、UsdLux blackbody、UsdPhysics parseUtils、UsdShade connectable behavior、UsdUtils authoring/dependencies/introspection/usdzPackage 等工具域。",
      "中文导读按 Usd 应用工具、UsdGeom metrics、UsdShade/UsdLux/UsdPhysics 和 UsdUtils 工具域整理；保留所有 Usd* 函数名、头文件名、属性名和原英文摘录。"
    ],
    terms: [
      ["camera at path", "路径处的相机"],
      ["collection membership query", "集合成员关系查询"],
      ["flatten layer stack", "扁平化 layer stack"],
      ["stage metrics", "stage 度量"],
      ["USDZ package", "USDZ 包"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块边界和术语对照；英文页面名、API 符号、函数名、头文件名、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first function-index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, function names, header names, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
  skipped_missing_from_scope: [
    "full_site/api/globals_func_q.html",
    "full_site/api/globals_func_r.html"
  ],
  results
}, null, 2));
