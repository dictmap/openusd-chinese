import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-167";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
    title: "Vdf: Vectorized Data Flow",
    summary:
      "`md_pxr_exec_vdf__r_e_a_d_m_e.html` 是 `Vdf` Vectorized Data Flow 的 README 型入口页，适合先理解 OpenExec 如何把依赖关系、数据流、输入输出和 evaluation request 组织成可执行图。阅读时应把 `Vdf` 视为执行图基础设施，而不是 USD scene description 或 Hydra render delegate。",
    notes: [
      "`Vdf` 的核心边界是 data-flow network：节点、输入、输出、依赖和求值请求共同描述值如何被计算与传播；它不直接定义 USD layer、prim 或 composition arc。",
      "遇到 graph、node、input、output、dependency、request 等词时，应先判断它们属于执行图结构、运行时求值状态，还是上层 `Exec` / `ExecUsd` 映射进来的场景数据。",
      "`Vdf` 文档常与 `Ef`、`Esf`、`Exec`、`ExecUsd` 串读：`Ef` 提供 foundation，`Esf` 抽象 scene data，`Exec` 组织 computation，`Vdf` 承担图级执行和数据流表达。",
      "调试 computed value 时，常见排查路径是 input availability、output ownership、dirty propagation、dependency invalidation、evaluation order 和缓存命中，而不是只看某个计算函数本身。",
      "中文导读保留 `Vdf`、`VdfNode`、`VdfContext`、`VdfReadWriteAccessor`、`data-flow network` 等英文标识，方便与源码、日志、测试名和 Doxygen 索引直接对应。",
    ],
    terms: [
      ["向量化数据流", "Vectorized Data Flow"],
      ["数据流网络", "data-flow network"],
      ["求值请求", "evaluation request"],
      ["脏值传播", "dirty propagation"],
      ["依赖失效", "dependency invalidation"],
      ["求值顺序", "evaluation order"],
    ],
  },
  {
    output: "full_site/api/class_vdf_read_write_accessor.html",
    title: "VdfReadWriteAccessor< T >",
    summary:
      "`class_vdf_read_write_accessor.html` 面向 `VdfReadWriteAccessor< T >` 模板类。它通常用于围绕 Vdf 输出数据进行类型化读写访问；阅读时要区分 accessor 对值存储的访问责任、拥有输出的节点责任，以及上层 computation 对数据语义的解释责任。",
    notes: [
      "`VdfReadWriteAccessor< T >` 的重点是访问路径和类型边界：模板参数 `T` 表示访问值的静态类型线索，但不等价于改变 graph 中输出的业务语义。",
      "看到 read/write、accessor、buffer、output data 等术语时，应先确认当前讨论的是临时求值数据、缓存数据，还是 authored scene data 映射后的 computed value。",
      "此类适合和 `VdfContext`、`VdfNode`、具体 output 类一起看：`VdfContext` 提供求值上下文，`VdfNode` 组织图结构，accessor 负责读取或写入某个值视图。",
      "如果运行时出现类型不匹配或空值，应优先检查 output registration、requested type、evaluation lifetime、dirty state 与 accessor 使用范围，而不是只改调用点。",
      "中文补强不翻译 `VdfReadWriteAccessor< T >`、`T`、method name、template parameter 和类型名，避免破坏 Doxygen 索引与源码中的精确名称。",
    ],
    terms: [
      ["读写访问器", "read-write accessor"],
      ["类型化访问", "typed access"],
      ["输出数据", "output data"],
      ["访问范围", "access scope"],
      ["求值生命周期", "evaluation lifetime"],
      ["类型不匹配", "type mismatch"],
    ],
  },
  {
    output: "full_site/api/class_vdf_grapher_options.html",
    title: "VdfGrapherOptions",
    summary:
      "`class_vdf_grapher_options.html` 说明 `VdfGrapherOptions` 这类 graph visualization / graph dumping 配置对象。它的价值在于控制如何观察和导出 Vdf 图，而不是参与实际 computation 的求值结果。",
    notes: [
      "`VdfGrapherOptions` 应按调试和可视化配置阅读：它帮助选择显示哪些 node、input、output、dependency 或 annotation，不负责创建或执行图本身。",
      "如果图导出结果过大、缺少边或难以定位节点，应检查 grapher option、filter condition、naming policy 和 graph traversal 范围，而不是先怀疑 computation 逻辑。",
      "此页适合和 `VdfNode`、`VdfContext` 以及 Vdf README 串读：README 建立图概念，`VdfNode` 解释节点结构，`VdfGrapherOptions` 解释如何把图呈现出来。",
      "阅读 generated graph 时，要把 visualization artifact 与 runtime state 分开：导出的节点和边是诊断视图，不能直接替代 evaluation trace 或 profiling 证据。",
      "中文层保留 `VdfGrapherOptions`、`graph visualization`、`graph dumping`、`node`、`input`、`output` 等英文术语，便于用户回到工具输出和源码选项。",
    ],
    terms: [
      ["图可视化", "graph visualization"],
      ["图导出", "graph dumping"],
      ["节点过滤", "node filtering"],
      ["遍历范围", "traversal scope"],
      ["命名策略", "naming policy"],
      ["诊断视图", "diagnostic view"],
    ],
  },
  {
    output: "full_site/api/class_vdf_context.html",
    title: "VdfContext",
    summary:
      "`class_vdf_context.html` 面向 `VdfContext`，也就是 Vdf evaluation 过程中传递求值状态、请求信息和执行相关上下文的对象。阅读时要把 context 当作 runtime evaluation context，而不是 USD stage metadata 或全局配置表。",
    notes: [
      "`VdfContext` 的核心问题是一次求值如何携带必要状态：哪些输入被请求、哪些输出处于当前 evaluation scope，以及计算函数能读取哪些上下文信息。",
      "当 computed value 结果依赖时间、请求路径、调度批次或缓存状态时，应优先检查 context 是否按预期传入和使用，而不是把差异归因于 authored USD 数据。",
      "`VdfContext` 与 `VdfReadWriteAccessor< T >` 的关系可理解为：context 管理求值环境和请求边界，accessor 提供对具体输出数据的类型化读写入口。",
      "排查 context 相关问题时，常见线索包括 request propagation、evaluation stack、available outputs、invalidated dependencies 与 thread-local 或 task-local 状态。",
      "中文补强保留 `VdfContext`、`evaluation context`、`request propagation`、`available outputs` 等英文名，确保读者能直接对应 API 列表和调用栈。",
    ],
    terms: [
      ["求值上下文", "evaluation context"],
      ["请求传播", "request propagation"],
      ["求值范围", "evaluation scope"],
      ["可用输出", "available outputs"],
      ["求值栈", "evaluation stack"],
      ["任务局部状态", "task-local state"],
    ],
  },
  {
    output: "full_site/api/class_vdf_node.html",
    title: "VdfNode",
    summary:
      "`class_vdf_node.html` 是 `VdfNode` 抽象类参考页，适合从节点责任、输入输出注册、依赖边和图调度角度理解 Vdf 网络。它描述 execution graph 的结构单元，而不是 USD prim、Hydra prim 或 schema class。",
    notes: [
      "`VdfNode` 是 data-flow network 的基础结构单元：节点把 input、output、dependency 和 computation boundary 组织在一起，供 Vdf evaluation 按图关系调度。",
      "阅读类成员时，应把 node identity、input connector、output connector、dependency edge、compute callback 和 debugging hooks 分开看，避免把图结构与业务值语义混在一起。",
      "如果某个输出没有被计算或图边缺失，应检查 node registration、input/output wiring、dependency declaration、dirty marking 与 evaluation request 是否一致。",
      "`VdfNode` 与上层 OpenExec 的关系是承载而非替代：`Exec` 可能把 schema computation 映射到 Vdf node，但 node 本身仍是执行图机制的一部分。",
      "中文导读保留 `VdfNode`、`input connector`、`output connector`、`dependency edge`、`compute callback` 等英文标识，保证与 Doxygen 成员名和源码注释一致。",
    ],
    terms: [
      ["节点身份", "node identity"],
      ["输入连接器", "input connector"],
      ["输出连接器", "output connector"],
      ["依赖边", "dependency edge"],
      ["计算回调", "compute callback"],
      ["脏标记", "dirty marking"],
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
      <h2>中文二次导读补强 / Chinese Second-Pass Reading Notes</h2>
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

function insertSection(html, section, output) {
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    return html.replace(existing, section);
  }

  const pageStructure = html.match(/    <section>\s*<h2>[\s\S]*?Page Structure<\/h2>/);
  if (pageStructure?.index !== undefined) {
    return `${html.slice(0, pageStructure.index)}${section}${html.slice(pageStructure.index)}`;
  }

  const afterScopeBeforeRefinement =
    /(\s*<main>\s*<section>[\s\S]*?<\/section>\s*)(<section data-cn-refinement=)/;
  if (afterScopeBeforeRefinement.test(html)) {
    return html.replace(afterScopeBeforeRefinement, `$1${section}    $2`);
  }

  const main = /(\s*<main>\s*)/;
  if (main.test(html)) {
    return html.replace(main, `$1${section}`);
  }

  throw new Error(`Cannot find insertion point: ${output}`);
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  const html = fs.readFileSync(filePath, "utf8");
  fs.writeFileSync(filePath, insertSection(html, section, item.output), "utf8");
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
