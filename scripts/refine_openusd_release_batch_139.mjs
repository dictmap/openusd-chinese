import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-139";

const refinements = [
  {
    output: "full_site/api/class_esf_property_interface.html",
    title: "EsfPropertyInterface",
    summary:
      "`EsfPropertyInterface` 是 exec scene adapter 层向 exec network compiler 暴露 property 信息的抽象接口；它接近 `UsdProperty` 的只读视图，但每个 public method 都带有 `EsfJournal*`，用于记录哪些访问条件会影响重新编译。",
    notes: [
      "该类是 abstract class，重点不是持有属性数据，而是把 scene adapter implementation 中的 property 查询统一成 compiler 可消费的接口。",
      "`GetBaseName()` 与 `GetNamespace()` 用于拆分 property 名称语义；中文说明应保留这两个方法名，避免把 namespace 误解成 C++ namespace。",
      "`EsfJournal` 参数是理解该接口的关键：读取 property 时同时写入依赖或 invalidation 条件，后续 scene 变化才能判断 exec network 是否需要重新编译。",
      "关联类型 `EsfPrim`、`EsfAttribute`、`EsfRelationship`、`SdfPath`、`TfToken`、`VtValue` 与 `TfType` 表明该接口横跨路径、schema、值和类型系统。",
      "阅读时应把 `EsfPropertyInterface` 放在 Esf adapter / compiler 边界中理解，不要把它当作普通 USD authoring API 或可写 `UsdProperty` wrapper。",
    ],
    terms: [
      ["属性接口", "property interface"],
      ["只读属性视图", "read-only property view"],
      ["执行网络编译器", "exec network compiler"],
      ["重新编译记录", "recompilation journaling"],
      ["场景适配器实现", "scene adapter implementation"],
      ["属性名称空间", "property namespace"],
    ],
  },
  {
    output: "full_site/api/class_trace_event_data.html",
    title: "TraceEventData",
    summary:
      "`TraceEventData` 是 Trace 子系统用于保存 `TraceEvent` payload 的轻量值容器。它通过多个构造函数接收 bool、int、uint、float、string 等数据，并通过 `TraceEvent::DataType` 描述当前保存的值类型。",
    notes: [
      "构造函数 `[1/6]` 到 `[6/6]` 对应不同 payload 类型；阅读时应先看构造来源，再按 `GetType()` 选择匹配的 getter。",
      "`GetBool()`、`GetInt()`、`GetUInt()`、`GetFloat()` 与 `GetString()` 是类型化读取入口；不要在未知 `DataType` 下随意调用不匹配的 getter。",
      "`GetType()` 是 trace 序列化和展示层的分派依据，调用方通常据此决定如何解释 payload 与如何写入报告。",
      "`WriteJson()` 把事件数据写入 `JsWriter`，因此它影响 profiling/trace report 中的字段可读性和 JSON 表达方式。",
      "该类只保存事件附带的数据，不代表事件时间、线程、调用栈或范围本身；这些上下文应到 `TraceEvent` 或 Trace collector 相关页面继续查。",
    ],
    terms: [
      ["事件数据", "TraceEventData"],
      ["事件载荷", "event payload"],
      ["事件数据类型", "TraceEvent::DataType"],
      ["类型化读取", "typed getter"],
      ["JSON 写出", "WriteJson()"],
      ["跟踪报告", "trace report"],
    ],
  },
  {
    output: "full_site/api/class_ef___lofted_output_set.html",
    title: "Ef_LoftedOutputSet",
    summary:
      "`Ef_LoftedOutputSet` 代表 `EfPageCacheBasedExecutor` 跟踪 lofted outputs 的内部集合。这里的 lofted output 指 evaluation 期间其值来自 page cache 的 `VdfOutput`，因此该类主要服务于执行缓存、依赖收集和输出失效管理。",
    notes: [
      "`Add()` 与 `Remove()` 维护单个 output 的集合成员关系；调用方需要同时关注 `VdfOutput` 和相关 `VdfMask`，因为 output 的有效范围可能是 mask 化的。",
      "`CollectLoftedDependencies()` 是依赖分析入口，用于从 lofted outputs 反推 page cache sourced values 对当前 evaluation 的影响。",
      "`RemoveAllOutputsForNode()` 按 `VdfNode` 清理相关输出，适合节点失效、网络重建或 executor 缓存刷新时使用。",
      "`Resize()`、`Clear()` 与 `GetSize()` 说明该类维护的是可调整的内部集合，而不是永久稳定的 scene-level 数据结构。",
      "本页属于 Ef/Vdf execution implementation 细节；中文导读应保留 `lofted output`、`page cache`、`EfPageCacheBasedExecutor`、`VdfOutput` 与 `VdfMask` 原词，避免误译成 USD 层级输出。",
    ],
    terms: [
      ["抬升输出", "lofted output"],
      ["页面缓存", "page cache"],
      ["缓存型执行器", "EfPageCacheBasedExecutor"],
      ["输出遮罩", "VdfMask"],
      ["依赖收集", "dependency collection"],
      ["节点输出清理", "RemoveAllOutputsForNode()"],
    ],
  },
  {
    output: "full_site/api/class_tf_py_lock.html",
    title: "TfPyLock",
    summary:
      "`TfPyLock` 是 Tf Python 绑定层用于管理 Python Global Interpreter Lock 和 Python thread state 的便利类。它把 C++ 线程进入 Python API、暂时允许其他 Python 线程运行、再恢复锁状态的步骤集中到一个明确的状态机里。",
    notes: [
      "`Acquire()` 与 `Release()` 是最直接的 GIL 获取/释放操作；调用顺序必须符合页面的 `State Valid Transitions`，否则容易破坏 Python thread state。",
      "`BeginAllowThreads()` 与 `EndAllowThreads()` 对应 Python C API 中释放 GIL 让其他线程运行、随后重新获取 GIL 的模式，适合包裹长时间 C++ 工作。",
      "构造函数和析构函数承担 RAII 生命周期边界；阅读时要把对象作用域、异常路径和锁状态恢复放在一起检查。",
      "`TfPyEnsureGILUnlockedObj` 作为 friend/related symbol 提醒该类用于 Python/C++ 边界的锁协议，不是普通业务 mutex。",
      "该类解决的是 Python API thread-safety 问题；它不保护 USD stage、SdfLayer 或 Hydra 数据结构本身，不能替代这些对象自己的并发约束。",
    ],
    terms: [
      ["Python 全局解释器锁", "Python Global Interpreter Lock"],
      ["线程状态", "Python thread state"],
      ["获取锁", "Acquire()"],
      ["释放锁", "Release()"],
      ["允许其他线程", "BeginAllowThreads()"],
      ["状态合法转换", "State Valid Transitions"],
    ],
  },
  {
    output: "full_site/api/class_vdf_test_utils_1_1_node.html",
    title: "VdfTestUtils::Node",
    summary:
      "`VdfTestUtils::Node` 是测试工具中包裹 `VdfNode` 的 helper wrapper，用于在单元测试或调试构造中更方便地声明输入、输出、连接和测试值。它不引入新的生产级 Vdf node 类型，而是围绕底层 `VdfNode` 提供测试 DSL。",
    notes: [
      "`GetVdfNode()` 和 `operator VdfNode *()` 让测试代码可以回到底层 `VdfNode` API；这说明 wrapper 与真实 node 生命周期仍然绑定。",
      "`Output()` 与 `GetOutput()` 用于在测试中声明或取得 named output，通常要结合 `TfToken`、`VdfOutput` 与 `VdfMask` 理解。",
      "`In()`、`operator>>()` 和 `_NodeOutput` 支撑 VdfTestUtils 的链式连接写法，让测试网络可以用较短代码表达 node/output 关系。",
      "`SetValue()` 用于给测试节点注入值，重点是方便验证 evaluation 数据流，而不是替代真实 computation callback。",
      "`Network` friend 表明该 wrapper 与 `VdfTestUtils` 测试网络构造器紧耦合；生产代码阅读时应回到 `VdfNode`、`VdfNetwork` 和执行器页面。",
    ],
    terms: [
      ["测试节点包装器", "VdfTestUtils::Node"],
      ["底层节点", "VdfNode"],
      ["链式连接", "operator>>()"],
      ["测试输出", "_NodeOutput"],
      ["测试网络", "Network"],
      ["注入测试值", "SetValue()"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
