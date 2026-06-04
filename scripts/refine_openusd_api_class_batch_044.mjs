import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-044";

const refinements = [
  {
    output: "full_site/api/class_vdf_grapher_options.html",
    title: "VdfGrapherOptions Class Reference",
    notes: [
      "`VdfGrapherOptions` 用来配置 `VdfGrapher` 的输出方式，是 Vdf network 可视化/调试时控制图形内容、样式和过滤规则的选项对象。",
      "英文摘录说明它 configures aspects of `VdfGrapher` output；页面结构中的 `DisplayStyle`、`NodeFilterCallback`、`NodeStyleCallback` 与 `NodeLimitVector` 是读懂本页的关键。",
      "`AddNodeToGraph()`、`GetNodesToGraph()` 和 `DebugNameFilter()` 控制哪些 node 会被绘制；这些方法面向图裁剪，不改变 Vdf graph 本身。",
      "`GetColor()`、`GetAnnotation()`、`GetDisplayStyle()`、`GetDrawMasks()`、`GetDrawAffectsMasks()` 和 `GetDrawColorizedConnectionsOnly()` 控制输出图的可读性和调试信息密度。",
      "`GetPageWidth()`、`GetPageHeight()`、`GetPrintSingleOutputs()`、`GetOmitUnconnectedSpecs()` 等设置偏向导出布局和噪声控制；阅读时应把它看作 graph rendering options。"
    ],
    terms: [
      ["VdfGrapher", "VdfGrapher"],
      ["DisplayStyle", "DisplayStyle"],
      ["NodeFilterCallback", "节点过滤回调"],
      ["NodeStyleCallback", "节点样式回调"],
      ["graph output", "图输出"]
    ]
  },
  {
    output: "full_site/api/class_vdf_node.html",
    title: "VdfNode Class Reference",
    notes: [
      "`VdfNode` 是 `VdfNetwork` 中所有 node 的 abstract base class，承担输入/输出 spec、连接依赖和执行调度相关的基础职责。",
      "英文摘录将它定义为 all nodes in a `VdfNetwork` 的基类；因此页面中的 protected 方法多是派生类和网络内部用来维护 graph 结构的钩子。",
      "`_AppendInputs()`、`_AppendOutputs()`、`_InitializeInputAndOutputSpecs()`、`_ReplaceInputSpecs()` 管理 node 的输入/输出规格与连接点定义。",
      "`_ComputeInputDependencyMask()`、`_ComputeOutputDependencyMask()` 和相关 plural variants 用于计算输入输出依赖 mask，是 Vdf 调度与增量求值的重要基础。",
      "`_DidAddInputConnection()`、`_GetMemoryUsage()`、`_IsDerivedEqual()`、`_SetId()` 等方法说明 `VdfNode` 同时参与连接变更通知、调试/统计和 identity 管理。"
    ],
    terms: [
      ["VdfNode", "VdfNode"],
      ["VdfNetwork", "VdfNetwork"],
      ["input specs", "输入规格"],
      ["output specs", "输出规格"],
      ["dependency mask", "依赖 mask"]
    ]
  },
  {
    output: "full_site/api/class_vdf_read_write_accessor.html",
    title: "VdfReadWriteAccessor< T > Class Template Reference",
    notes: [
      "`VdfReadWriteAccessor< T >` 为 output data 提供 random access，可在 Vdf 计算/执行上下文中按索引读写输出数据。",
      "英文摘录说明它 allows for random access to output data；这意味着它不是容器所有者，而是对 `VdfVector` 或 output storage 的访问器。",
      "`operator[]()` 是最直接的数据访问入口，同时提供 const/non-const 形式；`GetSize()` 和 `IsEmpty()` 用于在读写前确认访问范围。",
      "页面列出的 `VdfContext`、`VdfIterator`、`VdfReadWriteIterator`、`VdfMask`、`VdfOutput` 等相关类型说明该类服务于 Vdf output 数据流。",
      "阅读本页时应注意 template 参数 `T` 表示元素类型；访问器本身不应该被理解为长期持有输出数据的 owning container。"
    ],
    terms: [
      ["VdfReadWriteAccessor", "VdfReadWriteAccessor"],
      ["random access", "随机访问"],
      ["output data", "输出数据"],
      ["operator[]", "operator[]"],
      ["VdfVector", "VdfVector"]
    ]
  },
  {
    output: "full_site/api/class_vdf_test_utils_1_1_node.html",
    title: "VdfTestUtils::Node Class Reference",
    notes: [
      "`VdfTestUtils::Node` 是 test utilities 中围绕 `VdfNode` 的 wrapper，主要用于测试中更方便地构建、连接和检查 Vdf node。",
      "英文摘录说明它 is a wrapper around a `VdfNode`；因此它的语义偏测试辅助，不是生产路径中新的 Vdf node 基类。",
      "`GetVdfNode()` 和 `operator VdfNode *()` 提供到底层 `VdfNode` 的访问；这让测试代码可以在 wrapper 与底层 node API 之间切换。",
      "`GetOutput()`、`Output()`、`SetValue()` 和 `operator>>()` 用于测试中声明输出、设置值或表达 node/output 连接关系。",
      "`Network` 和 `_NodeOutput` 作为 friends/related symbols 说明该 wrapper 与 `VdfTestUtils` 的测试网络构造 DSL 绑定较紧。"
    ],
    terms: [
      ["VdfTestUtils::Node", "VdfTestUtils::Node"],
      ["wrapper", "包装器"],
      ["test utilities", "测试工具"],
      ["VdfNode", "VdfNode"],
      ["Network", "Network"]
    ]
  },
  {
    output: "full_site/api/class_vt_value_ref.html",
    title: "VtValueRef Class Reference",
    notes: [
      "`VtValueRef` 是 non-owning、type-erased 的 value view，可与 `VtValue` 互操作，适合作为函数参数或自动变量短期传递任意类型值。",
      "英文摘录强调它不能超过被引用值的生命周期；由于不 owning，它通常不分配 heap，也不增加引用计数，因而比复制 `VtValue` 更轻量。",
      "普通 typed values 与 `VtValue` 都可隐式转换为 `VtValueRef`，这让接收任意类型对象的函数可以统一入口，同时保持较低成本。",
      "`GetType()`、`GetTypeid()`、`GetTypeName()`、`GetElementTypeid()`、`GetKnownValueTypeIndex()` 帮助调用方识别被引用值的类型和数组元素类型。",
      "`CanHash()`、`GetHash()`、`CanComposeOver()`、`CanTransform()`、`GetArraySize()` 与 value composition/变换/hash 能力相关；阅读时应把生命周期约束放在首位。"
    ],
    terms: [
      ["VtValueRef", "VtValueRef"],
      ["non-owning", "非拥有"],
      ["type-erased", "类型擦除"],
      ["VtValue", "VtValue"],
      ["lifetime", "生命周期"]
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
