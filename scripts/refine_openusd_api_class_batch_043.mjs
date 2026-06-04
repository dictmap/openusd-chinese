import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-043";

const refinements = [
  {
    output: "full_site/api/class_tf_dense_hash_map.html",
    title: "TfDenseHashMap< Key, Data, HashFn, EqualKey, Threshold > Class Template Reference",
    notes: [
      "`TfDenseHashMap< Key, Data, HashFn, EqualKey, Threshold >` 是空间效率优先的 map 容器，在 map 较小时用 vector 作为 storage，并尽量模拟 `TfHashMap` API。",
      "英文摘录说明它适合小规模映射：当元素数量低于 `Threshold` 时，vector 布局可减少 hash table 的额外开销；超过阈值后仍需要保持类似 hash map 的查找/插入语义。",
      "`key_type`、`mapped_type`、`value_type`、`iterator`、`const_iterator` 和 `insert_result` 是阅读模板接口的基础类型；这些名称应保持英文原样。",
      "`begin()`、`end()`、`find()`、`insert()`、`erase()`、`count()`、`empty()`、`size()` 和 `clear()` 对应标准容器的常见读写路径，方便替换或包装已有 `TfHashMap` 使用点。",
      "阅读本页时重点看 template 参数：`HashFn` 与 `EqualKey` 控制 key 比较/散列，`Threshold` 控制小规模 vector storage 的切换边界。"
    ],
    terms: [
      ["TfDenseHashMap", "TfDenseHashMap"],
      ["Threshold", "Threshold"],
      ["vector storage", "vector 存储"],
      ["HashFn", "HashFn"],
      ["EqualKey", "EqualKey"]
    ]
  },
  {
    output: "full_site/api/class_tf_py_lock.html",
    title: "TfPyLock Class Reference",
    notes: [
      "`TfPyLock` 是访问 Python Global Interpreter Lock 的便利类，用于在 C++ 线程和 Python API 交互时集中管理 GIL 与 Python thread state。",
      "英文摘录强调 Python API 本身不是 thread-safe；当代码从 Python execution context 外访问 Python API 时，需要显式处理多线程与 GIL 状态。",
      "`Acquire()` 与 `Release()` 是获取/释放 GIL 的核心操作；`BeginAllowThreads()` 与 `EndAllowThreads()` 对应允许其他 Python 线程运行的状态切换。",
      "`State Valid Transitions` 区块是本页的关键：它说明哪些锁状态转换是合法的，阅读时应把构造函数、析构函数和方法调用顺序一起核对。",
      "`TfPyEnsureGILUnlockedObj` 作为 friends/related function 提示该类还服务于 RAII 风格的 Python 锁管理；不要把它当作普通业务锁或 USD scene graph 锁。"
    ],
    terms: [
      ["Python GIL", "Python 全局解释器锁"],
      ["thread state", "线程状态"],
      ["Acquire", "Acquire"],
      ["Release", "Release"],
      ["RAII", "RAII"]
    ]
  },
  {
    output: "full_site/api/class_tf_token.html",
    title: "TfToken Class Reference",
    notes: [
      "`TfToken` 是已注册字符串的 handle，用于对已知字符串做常数时间比较、赋值和 hashing，是 USD 中大量 tokenized names 的基础类型。",
      "英文摘录说明 `TfToken` 适合 bounded number of strings 作为固定符号使用；一旦字符串被发现后通常不再修改，避免反复按字符比较和计算 hash。",
      "`GetString()`、`GetText()`、`data()`、`size()`、`IsEmpty()` 是读取 token 内容的基础入口；`Hash()`、`HashSet` 与 `Find()` 则面向查找和集合使用。",
      "多个构造函数和 `_ImmortalTag` 暗示 token 生命周期与 interned string 注册表相关；阅读时应区分 token handle、底层 string 和普通 `std::string`。",
      "在 OpenUSD 文档中，属性名、schema 字段、metadata key、primvar 名等经常以 `TfToken` 暴露；本页是理解 token 性能语义和 API 约定的入口。"
    ],
    terms: [
      ["TfToken", "TfToken"],
      ["registered string", "已注册字符串"],
      ["constant time", "常数时间"],
      ["HashSet", "HashSet"],
      ["interned string", "驻留字符串"]
    ]
  },
  {
    output: "full_site/api/class_trace_event_data.html",
    title: "TraceEventData Class Reference",
    notes: [
      "`TraceEventData` 保存可写入 `TraceEvent` 的数据，是 Trace 子系统记录事件 payload 时使用的轻量值容器。",
      "英文摘录说明该类 holds data that can be stored in TraceEvents；构造函数重载较多，表示它可接收 bool、int、uint、float、string 等多种数据类型。",
      "`GetBool()`、`GetInt()`、`GetUInt()`、`GetFloat()`、`GetString()` 和 `GetType()` 是读取 payload 值和类型的主要接口。",
      "`WriteJson()` 用于把事件数据序列化到 `JsWriter`，因此它直接关系到 trace report 或 profiling 输出中的可读字段。",
      "阅读本页时应把 `TraceEventData` 与 `TraceEvent::DataType` 一起看：前者保存值，后者描述值类型，调用方需要按类型读取对应 getter。"
    ],
    terms: [
      ["TraceEventData", "TraceEventData"],
      ["TraceEvent", "TraceEvent"],
      ["payload", "载荷"],
      ["DataType", "DataType"],
      ["WriteJson", "WriteJson"]
    ]
  },
  {
    output: "full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html",
    title: "UsdSkelImagingDataSourceSkeletonPrim Class Reference",
    notes: [
      "`UsdSkelImagingDataSourceSkeletonPrim` 是 UsdSkel `Skeleton` 的 prim data source，用于把 skeleton prim 暴露给 Hydra/UsdImaging 的 data source 体系。",
      "英文摘录说明它是 `A prim data source for UsdSkel's Skeleton`；这意味着它关注成像数据源表达，而不是直接编辑 skeleton schema。",
      "`GetNames()` 是本页公开方法中的重点，用于返回该 data source 可提供的 token names，通常与 `TfTokenVector` 和 `TfToken` 一起使用。",
      "继承关系中出现 `UsdImagingDataSourceGprim`、`UsdImagingDataSourcePrim`、`HdContainerDataSource` 等类型，提示它位于 USD prim 到 Hydra data source 的适配层。",
      "阅读本页时应把 `UsdPrim`、`SdfPath`、`HdDataSourceLocator`、`UsdImagingDataSourceStageGlobals` 等相关类型看作上下文依赖，而不是 skeleton animation 求解 API。"
    ],
    terms: [
      ["UsdSkel", "UsdSkel"],
      ["Skeleton", "Skeleton"],
      ["prim data source", "prim 数据源"],
      ["Hydra", "Hydra"],
      ["GetNames", "GetNames"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、关键类型/方法分组和术语对照；英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, key type/method groups, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, math symbols, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
