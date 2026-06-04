import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-mixed-quality-pass-050";

const refinements = [
  {
    output: "full_site/api/globals_w.html",
    title: "File Members : w",
    notes: [
      "`globals_w.html` 是 File Members 的字母 `w` 索引页，当前摘录集中在 `Work` 并行/并发工具函数，适合作为 Work 库函数定位入口。",
      "`WorkGetConcurrencyLimit()`、`WorkGetConcurrencyLimitSetting()`、`WorkGetPhysicalConcurrencyLimit()` 和 `WorkHasConcurrency()` 用于查询并发限制、配置来源、物理并发能力和是否启用并发。",
      "`WorkParallelForEach()`、`WorkParallelForN()`、`WorkParallelForTBBRange()`、`WorkParallelReduceN()`、`WorkParallelSort()` 是常用并行循环、reduce 和 sort helper；函数名保持原样。",
      "`WorkRunDetachedTask()` 与 detached task 相关；`WorkMoveDestroyAsync()` 处理异步 move/destroy 语义；`WorkSerialForN()` 提供串行循环路径，便于与并行版本对照。",
      "阅读本页时应把 `threadLimits.h`、`loops.h`、`reduce.h`、`sort.h`、`detachedTask.h` 和 `withScopedParallelism.h` 作为后续跳转来源，中文说明只解释索引用途，不改函数名或头文件名。"
    ],
    terms: [
      ["Work", "Work 并行工具库"],
      ["concurrency limit", "并发限制"],
      ["parallel loop", "并行循环"],
      ["detached task", "分离任务"],
      ["scoped parallelism", "作用域并行控制"]
    ]
  },
  {
    output: "full_site/api/globals.html",
    title: "File Members : root index",
    notes: [
      "`globals.html` 是 Doxygen File Members 的根索引页，用于进入全局函数、宏、类型、变量和字母分组；它不是某个单独 API 模块的正文说明。",
      "当前摘录从字母 `a` 条目开始，包含 `AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 等 Asset Resolution 注册宏。",
      "`ARCH_AXIOM`、`ARCH_CACHE_LINE_SIZE`、`ARCH_CONSTRUCTOR`、`ARCH_DEBUGGER_TRAP`、`ARCH_ERROR`、`ARCH_NOINLINE`、`ARCH_PRINTF_FUNCTION` 等条目来自 `arch` 基础层，用于平台、调试、对齐、属性和诊断支持。",
      "页面链接指向 `defineResolverContext.h`、`definePackageResolver.h`、`error.h`、`align.h`、`attributes.h`、`threads.h`、`fileSystem.h`、`resolver.h` 等头文件，应优先通过这些链接进入具体声明。",
      "阅读本页时不要把索引条目翻译成普通段落；正确做法是保留标识符原样，并在中文导读中解释如何按前缀 `AR_`、`ARCH_`、`TF_`、`USD_` 等分组检索。"
    ],
    terms: [
      ["File Members", "文件级成员"],
      ["root index", "根索引"],
      ["macro", "宏"],
      ["header file", "头文件"],
      ["asset resolution", "资产解析"]
    ]
  },
  {
    output: "full_site/api/inherits.html",
    title: "Graphical Class Hierarchy",
    notes: [
      "`inherits.html` 是 Doxygen 生成的图形化 class hierarchy 辅助页，与 `hierarchy.html` 的 textual class hierarchy 互为入口；它用于从继承关系图进入类页面。",
      "英文摘录列出大量 graphical hierarchy 条目，例如 `Vdf_DefaultInitAllocator`、`CLI::App`、`ArAsset`、`ArFilesystemAsset`、`ArInMemoryAsset`、`ArOpenVDBAsset`、`ArResolvedPath`、`ArResolver`、`ArchIntervalTimer` 等。",
      "本页更适合做继承浏览，而不是线性阅读：先通过图形条目定位基类/派生类，再跳到具体 class 页面看构造函数、方法、成员和继承说明。",
      "`Go to the textual class hierarchy` 链接应跳转到本地 `hierarchy.html`；本地链接策略需要继续保证 406 清单内页面走本地，清单外 OpenUSD 页面走 uncovered placeholder。",
      "精修时保留所有类名和短英文描述原样，中文只补充读法：例如 asset 相关类可按 `ArAsset` -> filesystem/in-memory/OpenVDB 实现理解，resolver 相关类可按 context/cache/scope 分组。"
    ],
    terms: [
      ["graphical class hierarchy", "图形化类继承层级"],
      ["textual class hierarchy", "文本类继承层级"],
      ["base class", "基类"],
      ["derived class", "派生类"],
      ["asset resolver", "资产解析器"]
    ]
  },
  {
    output: "full_site/api/js_page_front.html",
    title: "Js: JSON I/O",
    notes: [
      "`Js: JSON I/O` 是 USD 基础库中的 JSON 输入/输出模块入口，提供从 C++ 解析和写出 JSON 数据的方法，不是 JavaScript 运行时说明。",
      "英文 Overview 说明该库可在 arbitrary recursive container structures 与 JSON standard 描述的 value abstraction 之间转换，并隐藏 parsing/serialization 具体实现细节。",
      "顶层入口位于 `js/json.h`；具体函数可与 `globals_j.html` 中的 `JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()` 对照阅读。",
      "该库强调符合本仓库 coding standards，给 C++ 开发者提供一致接口；如果在 Python 中处理 JSON，应使用 Python 标准库 `json` 模块，因为本库不提供 Python bindings。",
      "阅读本页时把它放在基础设施层：它服务于配置、metadata 或工具数据的 JSON 表示，而不直接表达 USD scene graph、composition 或 schema 行为。"
    ],
    terms: [
      ["JSON I/O", "JSON 输入/输出"],
      ["recursive container", "递归容器"],
      ["parsing", "解析"],
      ["serialization", "序列化"],
      ["Python bindings", "Python 绑定"]
    ]
  },
  {
    output: "full_site/api/kind_page_front.html",
    title: "Kind: Extensible Categorization",
    notes: [
      "`Kind` 模块提供运行时可扩展 taxonomy，称为 `kinds`；`kind` 本质上是 `TfToken` 符号，但可通过 `KindRegistry` 组织成相关或细化概念的层级。",
      "`KindRegistry::GetBaseKind()` 和 `KindRegistry::IsA()` 用来查询 base kind 和层级关系，使客户端可以判断某个 scenegraph object 是否属于某类 kind。",
      "Kind 常用于给 scenegraph objects 分类，尤其是给 model root 标记所代表的 model 类型；这是一种 scenegraph taxonomy，而不是几何类型、schema 类型或渲染分类。",
      "页面结构包含 `The Core Kind Hierarchy` 与 `Extending the KindRegistry`，说明它既有内置层级，也可通过插件或注册机制扩展；相关链接包括 `TfToken`、`KindRegistry`、`PlugRegistry`。",
      "阅读本页时保留 `kind`、`KindRegistry`、`TfToken`、`PlugRegistry` 原样；中文说明重点解释 taxonomy、classification、model root 和 registry extension 的语义边界。"
    ],
    terms: [
      ["Kind", "Kind 分类"],
      ["taxonomy", "分类体系"],
      ["TfToken", "TfToken"],
      ["KindRegistry", "KindRegistry"],
      ["model root", "模型根节点"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、索引读法、模块边界和术语对照；英文页面名、API 名称、类名、函数名、变量名、宏名、类型名、头文件名、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, index-reading guidance, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, function names, variable names, macro names, type names, header names, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
