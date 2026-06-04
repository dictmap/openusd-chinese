import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-quality-pass-030";

const refinements = [
  {
    output: "full_site/api/executor_invalidation_data_8h.html",
    title: "executorInvalidationData.h File Reference",
    notes: [
      "executorInvalidationData_8h.html 是 `executorInvalidationData.h` 的文件引用页，当前草稿只保留 include dependency graph 和被包含关系说明；本轮中文层补充它在 Exec/Vdf 执行失效数据中的定位。",
      "页面链接中的 `pxr`、`exec`、`vdf`、`executorInvalidationData.h` 说明该文件位于 OpenUSD 的执行系统相关层级；它不是用户指南，而是 Doxygen 生成的 C++ 头文件入口。",
      "`Include dependency graph for executorInvalidationData.h` 表示该页展示该头文件直接或间接依赖哪些文件；这类图用于追踪编译依赖，不等同于运行时数据流图。",
      "`This graph shows which files directly or indirectly include this file` 说明反向 include 关系：哪些文件会包含该头文件；阅读时可用它判断改动该头文件可能影响的编译范围。",
      "本页保留 `Go to the source code of this file` 英文链接和文件名，不翻译代码标识符；中文只说明如何阅读文件引用页、依赖图和 include 关系。"
    ],
    terms: [
      ["file reference", "文件引用页"],
      ["include dependency graph", "include 依赖图"],
      ["directly or indirectly include", "直接或间接包含"],
      ["executor invalidation data", "执行器失效数据"],
      ["source code link", "源码链接"]
    ]
  },
  {
    output: "full_site/api/glf_page_front.html",
    title: "Glf: Utility classes for OpenGL",
    notes: [
      "glf_page_front.html 是 Glf 模块入口，官方英文摘要是 `Utility classes for OpenGL output.`；中文层将其定位为 OpenUSD API 中围绕 OpenGL 输出的实用类集合。",
      "Glf 通常出现在渲染、预览、OpenGL 资源管理、draw target 或调试输出等上下文中；它与 Hydra/Storm 渲染后端有关，但不是 UsdGeom 或 UsdShade 的 schema 页面。",
      "本页是模块 front page，不是单个 class 的完整说明；用户应把它当作进入 Glf 相关类、OpenGL helper 和输出工具的目录入口。",
      "由于页面英文原文较短，本轮不扩写官方正文，只补充中文阅读方式：先确认 Glf 模块边界，再从本地链接进入具体类页或清单外缺口页。",
      "API 名称 `Glf`、`OpenGL` 和所有类名保持英文原样，以便与官方 Doxygen、源码 include 路径和本地链接路由保持一致。"
    ],
    terms: [
      ["OpenGL output", "OpenGL 输出"],
      ["utility classes", "实用类"],
      ["module front page", "模块入口页"],
      ["draw target", "绘制目标"],
      ["rendering helper", "渲染辅助工具"]
    ]
  },
  {
    output: "full_site/api/globals_c.html",
    title: "File Members - C",
    notes: [
      "globals_c.html 是 Doxygen 的 File Members 字母索引 C 段，列出所有以 C 开头的已记录文件级成员；当前条目包括 `CombineError()`、`CombineResult()`、`CombineUnbatched()` 和 `CustomUsdPhysicsTokens`。",
      "`CombineError()`、`CombineResult()`、`CombineUnbatched()` 都来自 `namespaceEdit.h`，它们与命名空间编辑结果合并、错误聚合或未批处理组合有关，应按 Sdf namespace editing 语境阅读。",
      "`CustomUsdPhysicsTokens` 来自 `parseUtils.h`，属于 UsdPhysics 解析工具中的自定义 token 入口；它与 namespaceEdit.h 的 Combine* 函数不是同一模块。",
      "File Members 总索引会混合函数、变量、typedef、宏和常量；中文层只给出模块归类和阅读顺序，不把这些条目误标为完整函数文档。",
      "本页链接目前指向 `namespaceEdit.h` 和 `parseUtils.h` 的本地/缺口路由；如果目标不在 406 清单内，会进入 `site/uncovered_openusd_page.html`，避免无提示跳到官方英文站。"
    ],
    terms: [
      ["file member", "文件级成员"],
      ["namespace edit", "命名空间编辑"],
      ["combine result", "合并结果"],
      ["physics token", "物理 token"],
      ["parse utility", "解析工具"]
    ]
  },
  {
    output: "full_site/api/globals_e.html",
    title: "File Members - E",
    notes: [
      "globals_e.html 是 File Members 字母索引 E 段，当前条目集中在 Ef 与 Exec 两个执行系统相关命名空间，包括 `EfGetFirstValidInputValue()`、`EfInputValueBlockVector`、`EfPageCacheCommitRequestVector`、`Exec_ComputationBuilderProviderTypes`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`ExecCallbackFn`、`ExecIrResult` 和 `ExecValidationErrorType`。",
      "`EfGetFirstValidInputValue()` 来自 `firstValidInputValue.h`，用于 Ef 执行逻辑中查找第一个有效输入值；`EfInputValueBlockVector` 与 `EfPageCacheCommitRequestVector` 则偏向输入值块和 page cache commit 请求容器。",
      "`Exec_ComputationBuilderProviderTypes`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA` 与 `registerSchema.h`、`computationBuilders.h` 相关，说明本页也覆盖 schema 计算注册和 computation builder provider 类型。",
      "`ExecCallbackFn`、`ExecIrResult`、`ExecValidationErrorType` 来自 Exec 类型与验证错误相关头文件；它们是执行系统回调、IR 结果和验证错误分类入口。",
      "本页不是 Exec/Ef 设计文档，只是 file-level members 的 E 段索引；中文层按 Ef 输入/cache、Exec 注册、Exec 类型/验证三组帮助定位。"
    ],
    terms: [
      ["first valid input value", "第一个有效输入值"],
      ["page cache commit request", "页缓存提交请求"],
      ["computation builder", "计算构建器"],
      ["schema computation registration", "schema 计算注册"],
      ["validation error type", "验证错误类型"]
    ]
  },
  {
    output: "full_site/api/globals_func_c.html",
    title: "File Members - Functions - C",
    notes: [
      "globals_func_c.html 是 File Members 中函数子索引的 C 段，只列出函数类条目；当前条目为 `CombineError()`、`CombineResult()`、`CombineUnbatched()`，全部来自 `namespaceEdit.h`。",
      "它和 `globals_c.html` 的区别是范围更窄：`globals_c.html` 可能混合函数、变量和常量，而 `globals_func_c.html` 聚焦 file-level functions。",
      "`CombineError()` 可理解为合并 namespace edit 过程中的错误信息入口；`CombineResult()` 关注合并结果；`CombineUnbatched()` 关注未批处理编辑的组合逻辑。",
      "这些函数属于命名空间编辑工具链，不应和 prim composition、layer stack 或 schema token 常量混读；具体参数和返回值仍需进入 `namespaceEdit.h` 或源页面查看。",
      "中文层保留函数名、括号和头文件名，帮助用户从本地索引页追溯到官方 Doxygen/源码语义，同时维持中英双语并列。"
    ],
    terms: [
      ["function sub-index", "函数子索引"],
      ["CombineError()", "CombineError()"],
      ["CombineResult()", "CombineResult()"],
      ["CombineUnbatched()", "CombineUnbatched()"],
      ["namespaceEdit.h", "namespaceEdit.h"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 API 索引用法、模块边界和术语对照；英文页面名、API 符号、函数名、头文件名、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first API index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, function names, header names, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
