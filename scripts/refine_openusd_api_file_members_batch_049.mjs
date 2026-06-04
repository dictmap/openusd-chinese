import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-quality-pass-049";

const refinements = [
  {
    output: "full_site/api/globals_t.html",
    title: "File Members : t",
    notes: [
      "`globals_t.html` 是 File Members 的字母 `t` 索引页，当前摘录主要由 `TF_*` 基础设施宏构成，应按 Tf module 的宏入口阅读。",
      "`TF_ADD_ENUM_NAME`、`TF_BITS_FOR_ENUM_VALUES`、`TF_BITS_FOR_VALUES` 与 enum/value 位数和名称注册相关；这些宏服务于类型/枚举元数据，宏名保持原样。",
      "`TF_AXIOM`、`TF_CODING_ERROR`、`TF_DEBUG`、`TF_DEBUG_CODES`、`TF_DEBUG_MSG`、`TF_DEBUG_TIMED_SCOPE` 属于 diagnostics/debug 支撑，常用于错误上报、调试开关和计时范围标记。",
      "`TF_DECLARE_PUBLIC_TOKENS()`、`TF_DECLARE_REF_PTRS`、`TF_DECLARE_WEAK_AND_REF_PTRS` 等条目用于 token 或智能指针声明；它们通常出现在 schema、registry、clips API、shader node 或静态 token 头文件中。",
      "阅读本页时按用途分组比逐行翻译更有效：enum/register test、diagnostic/debug、token declaration、ref pointer declaration、environment symbol 等是主要阅读线索。"
    ],
    terms: [
      ["Tf", "Tf 基础设施"],
      ["diagnostic macro", "诊断宏"],
      ["debug code", "调试代码"],
      ["public tokens", "公开 token 集"],
      ["ref pointer", "引用计数指针"]
    ]
  },
  {
    output: "full_site/api/globals_type.html",
    title: "File Members : Typedefs and Type Aliases",
    notes: [
      "`globals_type.html` 是 File Members 的 typedef/type alias 索引页，用来定位跨模块类型别名；它列出的是类型名称，不是变量或函数调用。",
      "`ArchConstFileMapping`、`ArchCrashHandlerSystemCB`、`ArchStackTraceCallback` 属于 `Arch` 平台层，覆盖文件映射、崩溃处理和堆栈跟踪回调类型。",
      "`EfInputValueBlockVector`、`EfPageCacheCommitRequestVector`、`ExecCallbackFn`、`ExecIrResult` 与 OpenExec/Ef/Exec 相关，用于执行系统的数据块、缓存提交请求、回调和结果类型。",
      "`GfHalf` 来自 `half.h`，是图形基础库的半精度浮点类型；`PcpArcInfoVector`、`PcpSiteTracker`、`PcpVariantFallbackMap` 属于 Pcp composition 数据结构。",
      "`SdfNamespaceEditDetailVector`、`SdfNamespaceEditVector`、`SdfRelocate`、`SdfRelocates` 属于 Sdf namespace editing / relocates 语境，用于描述命名空间编辑和路径迁移规则。"
    ],
    terms: [
      ["typedef", "类型别名"],
      ["type alias", "类型别名"],
      ["callback", "回调"],
      ["half precision", "半精度"],
      ["namespace edit", "命名空间编辑"]
    ]
  },
  {
    output: "full_site/api/globals_u.html",
    title: "File Members : u",
    notes: [
      "`globals_u.html` 是 File Members 的字母 `u` 索引页，当前摘录主要由 `USD_*` token 宏和验证器 token 集构成，应按 USD schema validation/token 入口阅读。",
      "`USD_GEOM_VALIDATION_ERROR_NAME_TOKENS`、`USD_GEOM_VALIDATOR_KEYWORD_TOKENS`、`USD_GEOM_VALIDATOR_NAME_TOKENS` 来自 `validatorTokens.h`，服务于 UsdGeom validation 的错误名称、关键字和 validator 名称 token。",
      "`USD_PHYSICS_*`、`USD_SHADE_*`、`USD_SKEL_*` validation token 宏分别对应 UsdPhysics、UsdShade、UsdSkel 相关 validator；宏名中 schema 域名不可翻译。",
      "`USD_LINEAR_INTERPOLATION_TYPES` 来自 `interpolation.h`，与 USD 的 linear interpolation 类型集合相关；这类宏通常用于集中维护 token/value 列表。",
      "阅读本页时先区分 validation error name tokens、validator keyword tokens、validator name tokens 和 interpolation tokens；中文说明解释用途，宏名、头文件名和 schema 前缀保持原样。"
    ],
    terms: [
      ["validation token", "验证 token"],
      ["validator keyword", "验证器关键字"],
      ["validator name", "验证器名称"],
      ["interpolation", "插值"],
      ["schema domain", "schema 域"]
    ]
  },
  {
    output: "full_site/api/globals_v.html",
    title: "File Members : v",
    notes: [
      "`globals_v.html` 是 File Members 的字母 `v` 索引页，摘录集中在 `Vdf` vectorized dataflow 运行时相关函数、类型和容器别名。",
      "`Vdf_DataManagerVectorAllocate()`、`VdfDataManagerDeallocationMode` 来自 `dataManagerVector.h`，与 Vdf 数据管理向量的分配和释放策略相关。",
      "`VdfConnectionAndMask`、`VdfConnectionVector`、`VdfConnectionSet`、`VdfConnectionConstVector` 等类型表示 Vdf network 中连接与 mask 的集合形态；它们应与 `VdfNode`、`VdfInput`、`VdfOutput` 页面一起阅读。",
      "`VdfEmptyNodeCallback()`、`VdfGetAssociatedSourceOutput()`、`VdfGetMaskedOutputVectorNetwork()` 属于 network utility/helper 入口，用于处理空节点回调、源输出关联和 masked output vector network。",
      "`VdfEstimateSize()`、`VdfByValueOrConstRef`、`Vdf_DefaultInitVector` 等条目覆盖内存估算、template 参数传递策略和默认初始化向量；本页只提供全局索引，不替代具体类/函数文档。"
    ],
    terms: [
      ["Vdf", "Vdf 向量化数据流"],
      ["data manager", "数据管理器"],
      ["connection mask", "连接 mask"],
      ["network utility", "网络工具函数"],
      ["masked output vector", "masked output vector"]
    ]
  },
  {
    output: "full_site/api/globals_vars.html",
    title: "File Members : Variables",
    notes: [
      "`globals_vars.html` 是 File Members 的变量索引页，列出全局变量、token 集、predicate 常量和 sentinel 等条目；它与 `globals_type.html` 和字母索引页用途不同。",
      "`PCP_INVALID_INDEX` 是 Pcp 基础常量；`SdfMapperParametersMap` 属于 Sdf mapper 参数映射；`TfUtf8InvalidCodePoint` 来自 Unicode 工具层，表示无效 UTF-8 code point。",
      "`UsdGeomTokens`、`UsdHydraTokens`、`UsdLuxTokens`、`UsdMediaTokens`、`UsdMtlxTokens`、`UsdPhysicsTokens` 是不同 schema/domain 的 token 集入口，变量名保持原样。",
      "`usdPhysicsSentinelLimit` 来自 physics parser/description 语境，可作为特殊边界或 sentinel 值；需要具体含义时应跳到 `parseDesc.h` 或 UsdPhysics 文档核对。",
      "`UsdPrimAllPrimsPredicate`、`UsdPrimDefaultPredicate`、`UsdPrimHasClassSpecifier`、`UsdPrimHasDefiningSpecifier`、`UsdPrimIsAbstract`、`UsdPrimIsActive` 是 UsdPrim 过滤/查询 predicate 常量，常用于遍历 stage 或筛选 prim。"
    ],
    terms: [
      ["variable index", "变量索引"],
      ["token set", "token 集"],
      ["predicate", "谓词/过滤条件"],
      ["sentinel", "哨兵值"],
      ["code point", "码点"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、索引读法、条目类型区别和术语对照；英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, index-reading guidance, entry-type distinctions, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, function names, variable names, macro names, type names, header names, operator symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
