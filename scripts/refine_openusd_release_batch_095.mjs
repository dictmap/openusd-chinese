import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-095";

const refinements = [
  {
    output: "full_site/api/globals_func_c.html",
    title: "File Members - Functions - C",
    notes: [
      "`globals_func_c.html` 是 File Members 函数索引 C 段，当前聚焦 `SdfNamespaceEdit` 工具链中的 `CombineError()`、`CombineResult()` 与 `CombineUnbatched()`；它是 namespace edit 合并语义的入口，而不是 prim composition 教程。",
      "`namespaceEdit.h` 是本页最关键的头文件来源。阅读时应把这些函数和 batched namespace edits、rename/reparent/delete 等层级路径编辑联系起来，而不是和 Pcp composition、variant selection 或 asset resolver 混在一起。",
      "`CombineError()` 更偏向合并失败时的诊断描述，`CombineResult()` 更偏向返回合并后的状态或结果对象，`CombineUnbatched()` 则提示它处理未批处理的 edit 序列；具体参数和错误策略必须继续进入头文件确认。",
      "如果目标是理解 USD 场景中 prim path 如何被编辑，应继续阅读 `SdfBatchNamespaceEdit`、`SdfNamespaceEdit` 和 `SdfPath` 相关页面；如果目标是 composition 强度或 layer stack 求值，应转到 Pcp 页面。",
      "中文层保留函数名、括号和 `namespaceEdit.h` 原样，重点解释三者在 namespace edit 合并流程中的不同位置，避免将 `Combine*` 泛化为普通数组合并函数。"
    ],
    terms: [
      ["namespace edit", "命名空间编辑"],
      ["batched edit", "批处理编辑"],
      ["unbatched edit", "未批处理编辑"],
      ["combine result", "合并结果"],
      ["combine error", "合并错误"],
      ["path edit", "路径编辑"]
    ]
  },
  {
    output: "full_site/api/globals_e.html",
    title: "File Members - E",
    notes: [
      "`globals_e.html` 是 File Members 的 E 段宽索引，当前内容主要横跨 `Ef` 与 `Exec` 执行系统：既有函数，也有容器 typedef、注册宏、callback 类型和 validation error 类型。",
      "`EfGetFirstValidInputValue()`、`EfInputValueBlockVector`、`EfPageCacheCommitRequestVector` 指向 Ef 的输入值选择、输入值块和 page cache commit 请求；这些条目应与 evaluation cache 和 execution value flow 一起理解。",
      "`Exec_ComputationBuilderProviderTypes`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`ExecCallbackFn`、`ExecIrResult`、`ExecValidationErrorType` 属于 OpenExec/ExecUsd 的 computation registration、callback、IR result 和 validation error 语境。",
      "这页和 `globals_func_e.html` 的区别在于：`globals_func_e.html` 只列函数，而本页混合函数、类型、宏和 enum-like 条目；阅读时先按 `Ef`/`Exec` 前缀分流，再跳转到对应 README、设计页或头文件。",
      "中文补强保留 `Ef`、`Exec`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA` 等符号原样，强调它们是执行系统基础设施的一部分，而不是通用 USD authoring API。"
    ],
    terms: [
      ["Ef", "Ef 执行框架"],
      ["Exec", "Exec 执行系统"],
      ["computation registration", "计算注册"],
      ["callback function", "回调函数"],
      ["IR result", "中间表示结果"],
      ["validation error type", "验证错误类型"]
    ]
  },
  {
    output: "full_site/api/globals_func_j.html",
    title: "File Members - Functions - J",
    notes: [
      "`globals_func_j.html` 是 File Members 函数索引 J 段，当前集中在 `Js` JSON 工具函数；它的用途是从函数名跳到 JSON conversion、lookup、parse 和 write 的实现位置。",
      "`JsConvertToContainerType()` 来自 `converter.h`，关注 JSON 值到容器类型的转换；它的 template/类型约束不能从索引页推断，必须进入头文件或调用点确认。",
      "`JsFindValue()` 来自 `utils.h`，适合用于在 JSON-like 数据结构中查找字段或值；它和 parse/write 函数同属 Js 工具域，但职责是查询而不是解析或序列化。",
      "`JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()` 来自 `json.h`，分别覆盖输入流、字符串输入、输出流、字符串输出和值序列化；阅读时可按 input/output 两类分组。",
      "如果目标是 USD layer 或 USDA 解析，应转向 Sdf/Usd 文件格式页面；本页只说明通用 JSON helper，不应把 `Js` 误当成 USD scene description parser。"
    ],
    terms: [
      ["Js JSON helpers", "Js JSON 辅助工具"],
      ["conversion helper", "转换辅助函数"],
      ["JSON lookup", "JSON 查找"],
      ["parse stream", "解析输入流"],
      ["write string", "写入字符串"],
      ["serialization", "序列化"]
    ]
  },
  {
    output: "full_site/api/globals_func_g.html",
    title: "File Members - Functions - G",
    notes: [
      "`globals_func_g.html` 是 File Members 函数索引 G 段，条目非常密集，主要来自 `Gf` 数学/几何基础设施；它比 `globals_g.html` 更聚焦函数，不包含常量和宏的完整宽索引。",
      "`GfAbs()`、`GfClamp()`、`GfDegreesToRadians()`、`GfExp()` 等来自 `math.h`，是标量或基础数学函数；`GfCompDiv()`、`GfCompMult()` 则常见于 vec2/vec3/vec4 头文件，用于 component-wise 操作。",
      "`GfApplyGamma()`、`GfConvertDisplayToLinear()`、`GfConvertLinearToDisplay()` 来自 `gamma.h`，属于颜色/显示空间转换；它们应和 color pipeline 或 imaging 语境一起读，而不是普通几何计算。",
      "`GfCross()`、`GfDot()`、`GfFindClosestPoints()`、`GfGetClosestPoint()` 等条目指向向量代数、射线/线段/平面几何查询和最短距离求解；具体重载由参数类型决定。",
      "中文层保留 `GfVec*`、`GfMatrix*`、`GfQuat*`、`GfDualQuat*` 等英文类型名，重点帮助读者按数学函数、向量分量操作、颜色转换和几何查询四类筛选。"
    ],
    terms: [
      ["Gf math function", "Gf 数学函数"],
      ["component-wise operation", "分量级操作"],
      ["gamma conversion", "gamma 转换"],
      ["display-linear conversion", "显示/线性空间转换"],
      ["closest point query", "最近点查询"],
      ["function overload", "函数重载"]
    ]
  },
  {
    output: "full_site/api/globals_defs.html",
    title: "File Members - Macro Definitions",
    notes: [
      "`globals_defs.html` 是 File Members 的宏定义索引页，聚合跨模块 `#define` 宏；它不是单个模块的 API 设计说明，最重要的阅读方法是按宏前缀和头文件来源分流。",
      "`AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 属于 Ar asset resolution plugin 注册宏；它们与 resolver context、package resolver 和 resolver 类型导出相关。",
      "`ARCH_*` 宏来自 Arch 平台抽象层，常用于 cache line、constructor、debugger trap、error handling、platform/compiler 条件；这些宏影响编译和运行平台行为，不应意译或改写。",
      "`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`TF_*`、`GF_*`、`NDR_*`、`SDF_*`、`USD_*` 等前缀分别指向执行系统、Tf 基础设施、Gf 数学、Ndr/SDR 节点发现、Sdf 数据模型和 USD schema/token 体系。",
      "如果要理解宏展开或条件编译，应继续进入头文件/source 页面；如果只想知道宏所属模块，本页提供第一层定位。中文层只说明宏族作用和风险，不替换宏名。"
    ],
    terms: [
      ["macro definition index", "宏定义索引"],
      ["resolver registration", "解析器注册"],
      ["platform macro", "平台宏"],
      ["conditional compilation", "条件编译"],
      ["macro prefix", "宏前缀"],
      ["header provenance", "头文件来源"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补二次精修说明，重点解释 File Members 函数页、宽索引和宏定义索引的阅读差异，以及模块前缀、头文件来源、函数族归属、宏/运算符语义和跨页跳转顺序。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于与官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}. It explains how to read File Members function pages, broad indexes, and macro-definition indexes, with emphasis on module prefixes, header provenance, function-family ownership, macro/operator semantics, and cross-page navigation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
