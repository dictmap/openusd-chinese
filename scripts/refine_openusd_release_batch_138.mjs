import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-138";

const refinements = [
  {
    output: "full_site/api/class_vdf_read_write_accessor.html",
    title: "VdfReadWriteAccessor<T>",
    summary:
      "`VdfReadWriteAccessor< T >` 是 Vdf output data 的 non-owning random-access accessor，用于在执行/计算上下文中按索引读取或写入输出元素。它围绕 `VdfVector` / output storage 工作，模板参数 `T` 表示元素类型；不要把它当成长期持有数据的 owning container。",
    notes: [
      "`operator[]()` 提供 const 与 non-const 两种访问形式，是最直接的元素读写入口；调用前应使用 `GetSize()` 或 `IsEmpty()` 确认访问范围。",
      "`GetSize()` 反映当前 accessor 暴露的元素数量，适合和 `VdfMask`、`VdfIterator` 或输出 request 语义一起理解。",
      "`IsEmpty()` 是快速判空入口；空 accessor 可能表示输出没有数据，也可能表示当前 request 没有覆盖相应元素。",
      "相关类型 `VdfContext`、`VdfOutput`、`VdfReadWriteIterator` 和 `VdfExecutorInterface` 说明它处在 Vdf 执行数据流中，而不是普通 STL 容器层。",
      "中文说明应保留 `T`、`operator[]()` 和 `VdfVector` 等名称，方便读者把 Doxygen 成员和模板实例化代码对应起来。",
    ],
    terms: [
      ["读写访问器", "VdfReadWriteAccessor<T>"],
      ["随机访问", "random access"],
      ["输出数据", "output data"],
      ["元素数量", "GetSize()"],
      ["空访问器", "IsEmpty()"],
      ["非拥有视图", "non-owning accessor"],
    ],
  },
  {
    output: "full_site/api/class_vdf_grapher_options.html",
    title: "VdfGrapherOptions",
    summary:
      "`VdfGrapherOptions` 是配置 `VdfGrapher` 输出的选项对象，用于控制 Vdf network 图的节点选择、样式、颜色、mask 显示、分页尺寸和噪声过滤。它只影响 graph visualization/debug output，不改变实际 Vdf graph 或 evaluation behavior。",
    notes: [
      "`AddNodeToGraph()` 与 `GetNodesToGraph()` 控制显式包含哪些 node；`DebugNameFilter()` 则可按 debug name 过滤，适合缩小大型 network 可视化范围。",
      "`NodeFilterCallback` 与 `NodeStyleCallback` 允许外部代码自定义节点是否显示和如何显示；这类 callback 影响输出图，不参与执行调度。",
      "`GetDrawMasks()`、`GetDrawAffectsMasks()` 和 `GetDrawColorizedConnectionsOnly()` 用于控制 dependency mask、affects mask 和连接着色信息的可视化密度。",
      "`GetColor()`、`GetAnnotation()` 和 `GetDisplayStyle()` 负责节点视觉样式和注释文本；这些设置通常服务于调试报告或 graph dump。",
      "`GetPageWidth()`、`GetPageHeight()`、`GetPrintSingleOutputs()` 与 `GetOmitUnconnectedSpecs()` 面向导出版面和冗余信息控制，适合生成可读的调试图。",
    ],
    terms: [
      ["图输出选项", "VdfGrapherOptions"],
      ["节点过滤回调", "NodeFilterCallback"],
      ["节点样式回调", "NodeStyleCallback"],
      ["显示样式", "DisplayStyle"],
      ["mask 可视化", "mask visualization"],
      ["图形转储", "graph dump"],
    ],
  },
  {
    output: "full_site/api/class_vdf_context.html",
    title: "VdfContext",
    summary:
      "`VdfContext` 是传入 Vdf computation callbacks 的 parameter bundle，也是 computation 访问输入、设置输出和报告诊断的主要 API。它代表一次执行回调的上下文，不是持久化数据容器。",
    notes: [
      "`GetInputValue()`、`GetInputValuePtr()` 和 `HasInputValue()` 是读取输入的主路径；输入名称通常与 `TfToken`、`VdfInput` 或 node spec 相关。",
      "`IsOutputRequested()` 帮助 computation 避免计算未被 request 的输出；这对 expensive node 或多输出节点很重要。",
      "`SetOutput()` 的多个 overload 支持把值写回当前 output；`SetEmptyOutput()` 则显式表示输出为空，和未设置输出不同。",
      "`SetOutputToReferenceInput()` 适合把输出绑定到参考输入，减少复制并表达 pass-through 语义；使用时要确认引用输入生命周期和类型匹配。",
      "`CodingError()`、`Warn()` 与 `GetNodeDebugName()` 提供诊断上下文；复杂 Vdf graph 排错时应把这些信息与 node debug name 一起记录。",
    ],
    terms: [
      ["计算上下文", "VdfContext"],
      ["计算回调", "computation callback"],
      ["输入值读取", "GetInputValue()"],
      ["请求的输出", "IsOutputRequested()"],
      ["设置输出", "SetOutput()"],
      ["诊断警告", "Warn()"],
    ],
  },
  {
    output: "full_site/api/class_sdf_children_view.html",
    title: "SdfChildrenView<_ChildPolicy, _Predicate, _Adapter>",
    summary:
      "`SdfChildrenView< _ChildPolicy, _Predicate, _Adapter >` 是 Sdf 的 template children view，用统一的 STL-style container interface 暴露 spec children。`_ChildPolicy` 决定底层 children 读取策略，`_Predicate` 负责过滤，`_Adapter` 负责把底层对象适配成调用者看到的 value。",
    notes: [
      "`ChildPolicy`、`KeyPolicy`、`Predicate`、`Adapter` 和 `_Traits` 是理解该模板的关键 typedef；它们把不同 spec children 统一成同一套 view 接口。",
      "`const_iterator`、`const_reverse_iterator`、`begin()`、`end()`、`rbegin()`、`rend()` 等接口使该 view 可按标准容器方式遍历。",
      "`key_type`、`value_type`、`size_type` 和 `difference_type` 帮助调用方写出泛型算法；这些类型名称应保留英文，便于和 C++ template 对照。",
      "`SdfChildrenView` 常出现在 `SdfLayer`、`SdfPrimSpec`、property specs 的 children 访问路径中；它是视图层，不直接 author 或删除 child spec。",
      "阅读时要区分 view/filter/adapt 三层：view 暴露遍历，predicate 决定可见性，adapter 决定返回值形态。",
    ],
    terms: [
      ["Sdf 子对象视图", "SdfChildrenView"],
      ["子对象策略", "ChildPolicy"],
      ["过滤谓词", "Predicate"],
      ["返回值适配器", "Adapter"],
      ["常量迭代器", "const_iterator"],
      ["STL 风格容器接口", "STL-style container interface"],
    ],
  },
  {
    output: "full_site/api/class_tf_dense_hash_map.html",
    title: "TfDenseHashMap<Key, Data, HashFn, EqualKey, Threshold>",
    summary:
      "`TfDenseHashMap< Key, Data, HashFn, EqualKey, Threshold >` 是面向小规模映射优化的 Tf map 容器：元素数量较小时使用 vector storage 降低 hash table 开销，同时尽量保持类似 `TfHashMap` / STL map 的常见 API。",
    notes: [
      "`Threshold` 是理解该容器的关键模板参数：它决定何时从小型 vector-oriented representation 过渡到更接近 hash map 的行为边界。",
      "`HashFn` 与 `EqualKey` 分别控制 key hashing 和 key equality；自定义 key 类型时必须保证二者语义一致，否则查找和插入会出错。",
      "`key_type`、`mapped_type`、`value_type`、`iterator`、`const_iterator` 和 `insert_result` 让该类能被泛型容器代码消费。",
      "`find()`、`insert()`、`erase()`、`count()`、`begin()`、`end()`、`size()`、`empty()` 和 `clear()` 构成常见读写路径，适合替换小型 map 热点。",
      "该类优化空间和小集合性能，不表示所有情况下都比标准 hash map 更快；使用时应结合数据规模、更新频率和迭代需求判断。",
    ],
    terms: [
      ["紧凑哈希映射", "TfDenseHashMap"],
      ["小规模映射", "small map"],
      ["向量存储", "vector storage"],
      ["阈值", "Threshold"],
      ["键散列函数", "HashFn"],
      ["键相等比较", "EqualKey"],
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
    html = html.replace(pageStructure, `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`);
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
