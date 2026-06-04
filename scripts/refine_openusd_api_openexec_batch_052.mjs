import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-openexec-quality-pass-052";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html",
    title: "ExecIr: OpenExec implementation of invertible rigs",
    notes: [
      "`ExecIr` 是 OpenExec 面向 invertible rigs / invertible controllers 的实现层，英文摘录说明它 built on top of `execUsd`，因此应先理解 `ExecUsd` 如何把 execution system 接到 USD。",
      "官方摘录明确提示该库目前 `limited in functionality` 且 `not intended for production use`；中文阅读时不要把它当成稳定的生产级 rigging API，而应视作实验性/内部实现说明。",
      "`ExecIr` 包含用于定义 invertible controllers 的 utilities，也包含执行 invertible rigging controllers 行为的代码；其中 basic controller types 是更高层 controllers 的 building blocks。",
      "本页只抽取了 README 层面的模块说明，具体 schema、controller 类型、注册宏和执行行为仍需要在后续 class/group/source 页面继续追踪。",
      "阅读顺序建议：先看 `ExecUsd` 主入口，再看 OpenExec overview 的 computations 概念，最后回到 `ExecIr` 理解它如何把可逆 rig 控制器映射成执行系统可求值的行为。"
    ],
    terms: [
      ["invertible rigs", "可逆绑定"],
      ["invertible controllers", "可逆控制器"],
      ["building blocks", "基础构件"],
      ["production use", "生产使用"],
      ["execution behavior", "执行行为"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html",
    title: "ExecUsd: Execution system for Usd",
    notes: [
      "`ExecUsd` 是 OpenExec 的主要入口，英文摘录说明它 built on top of `exec` and `esfUsd`，负责把 OpenExec core 与 USD 场景对象连接起来。",
      "本页列出的三项能力是阅读主线：注册与 USD schemas 关联的 computational behaviors、摄取 `UsdStage` 并编译 data flow network、请求 values 以进行高效 vectorized / multithreaded evaluation。",
      "`UsdStage` 是本页的关键输入对象；OpenExec 会从 stage 中实例化 computations，并在内部 data flow network 中创建表示这些 computations 的 nodes。",
      "本页链接到 `OpenExec overview`，它是概念和教程入口；如果只想知道怎么请求计算值，应继续看 Tutorial 1，如果要定义 schema computations，应继续看 Tutorial 2。",
      "保留 `ExecUsd`、`ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdValueKey` 等后续 API 名称原样；中文导读只说明它们在请求、准备和读取计算结果流程中的位置。"
    ],
    terms: [
      ["ExecUsd", "USD 执行系统入口"],
      ["computational behavior", "计算行为"],
      ["UsdStage ingestion", "UsdStage 摄取"],
      ["vectorized evaluation", "向量化求值"],
      ["multithreaded evaluation", "多线程求值"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_overview.html",
    title: "OpenExec Overview",
    notes: [
      "`OpenExec Overview` 解释 OpenExec 如何对编码在 USD scenes 中的 computational behaviors 做高效求值，是阅读教程和 API group 前应先看的概念页。",
      "核心流程是：schemas publish computations；OpenExec ingests a `UsdStage` and registered computations；系统生成内部 representation；client requests computation outputs；最终计算并返回结果。",
      "本页把 `Computations` 分成 plugin computations 与 builtin computations，并链接到 computation definition language 和 builtin computation documentation；这些链接决定后续应看 group 页面还是教程页面。",
      "本页还给出 Tutorials 与 Advanced Topics 的结构；Tutorial 1 关注 computed values 的请求与读取，Tutorial 2 关注如何为 USD schemas 定义 computations。",
      "阅读时要区分 authored scene values、inputs from other computations、computed outputs 三类数据来源；OpenExec 的价值在于把这些依赖组织成可高效求值的 internal computation graph。"
    ],
    terms: [
      ["computational behavior", "计算行为"],
      ["schemas publish computations", "schema 发布计算"],
      ["computed outputs", "计算输出"],
      ["builtin computations", "内置计算"],
      ["plugin computations", "插件计算"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
    title: "OpenExec Tutorial 1: Computing Values",
    notes: [
      "Tutorial 1 演示如何使用 OpenExec APIs 请求并计算 values；示例代码位于 `USD/extras/exec/examples/computingValues/`，正文流程比单个 API 索引更重要。",
      "示例使用 `UsdGeomXformable` prims 提供的 `computeLocalToWorldTransform` computations，结果是把 Xform local-space 点转换到 world-space 的 `GfMatrix4d` 4x4 matrix。",
      "页面结构给出实际调用顺序：Create a `UsdStage`、Create an `ExecUsdSystem`、Build an `ExecUsdRequest`、Prepare the request、Compute values、Extract computed values、Putting it all together。",
      "本教程展示的是 lowest-level API，面向 imaging system 等性能敏感客户端；官方摘录说明未来会有 convenience APIs，因此当前阅读重点是性能路径和对象职责，而不是简化封装。",
      "关键类型需要原样保留并串起来理解：`ExecUsdSystem` 表示系统入口，`ExecUsdRequest` 表示请求集合，`ExecUsdValueKey` 标识请求值，`ExecUsdCacheView` 用于读取求值缓存，`VtValue` 承载结果。"
    ],
    terms: [
      ["Computing Values", "计算值"],
      ["computeLocalToWorldTransform", "计算局部到世界变换"],
      ["ExecUsdSystem", "ExecUsdSystem"],
      ["ExecUsdRequest", "ExecUsdRequest"],
      ["ExecUsdCacheView", "ExecUsdCacheView"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
    title: "OpenExec Tutorial 2: Defining Schema Computations",
    notes: [
      "Tutorial 2 演示如何为 USD schemas 定义 OpenExec computations，让 schema 能发布可由 OpenExec engine 求值的 computational behaviors；示例代码位于 `USD/extras/exec/examples/definingComputations/`。",
      "本教程建立在 Tutorial 1 之上：Tutorial 1 展示 client 如何 request computed results，Tutorial 2 则展示 plugin/schema 作者如何注册和实现这些 computations。",
      "页面结构的主线是 Plugin Metadata、Computation Registration、Registration macro、Input parameters、Callback function、Putting it all together 和 Caveats。",
      "`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA` 是本页关键注册宏；它把 schema 类型和 computation registration 联系起来，后续还会涉及 Computation Registrations、Input Registrations、builtin computation 和 `VdfContext`。",
      "阅读时保留 `ParamsAPI`、`TfToken`、`VdfContext`、`VdfReadIterator` 和所有 header/source 链接原样；中文导读重点说明这些对象分别参与 schema metadata、输入读取、callback 执行和计算结果发布。"
    ],
    terms: [
      ["Defining Schema Computations", "定义 schema 计算"],
      ["Computation Registration", "计算注册"],
      ["Input Registrations", "输入注册"],
      ["VdfContext", "VdfContext"],
      ["callback function", "回调函数"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块定位、流程说明、阅读顺序和术语对照；英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module positioning, workflow guidance, reading order, and terminology for ${escapeHtml(item.title)} while retaining English module names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, type names, header names, links, and source excerpts for comparison with the official Doxygen page.</p>
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
