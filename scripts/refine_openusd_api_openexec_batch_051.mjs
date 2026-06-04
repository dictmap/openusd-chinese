import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-openexec-quality-pass-051";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html",
    title: "Ef: Execution Foundation",
    notes: [
      "`Ef: Execution Foundation` 是 OpenExec 执行基础层入口，位置在 `vdf` 之上；阅读时应先把它理解为对 `Vdf` data flow 的执行节点、执行器接口、缓存和遍历工具的扩展层。",
      "英文摘录明确说 `ef` extends functionality provided by `vdf`，因此本页不是用户场景 schema，也不是 USD authoring API，而是供执行网络构建与求值使用的底层库说明。",
      "`VdfNode` 是本页最关键的跳转对象之一，表示 data flow network 中的节点类型；`VdfExecutorInterface` 则提示本库和执行器抽象、网络求值流程有关。",
      "本页的中文导读保留 `vdf`、`VdfNode`、`VdfExecutorInterface` 原名，因为这些名称本身就是后续 API class 页和模块页的稳定检索键。",
      "阅读顺序建议：先打开 `vdf` 理解 data flow graph，再回到 `ef` 看 execution foundation 如何补充 node 类型、value cache、network traversal 和 utility functions。"
    ],
    terms: [
      ["Execution Foundation", "执行基础层"],
      ["data flow network", "数据流网络"],
      ["VdfNode", "VdfNode"],
      ["VdfExecutorInterface", "VdfExecutorInterface"],
      ["network traversal", "网络遍历"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html",
    title: "Esf: Execution Scene Foundation",
    notes: [
      "`Esf: Execution Scene Foundation` 是执行系统访问 scene description objects 的接口层；英文摘录标注 `not meant for public use`，说明它主要服务 OpenExec 内部实现。",
      "本页核心语义是把执行系统和场景描述对象连接起来，使 execution system 能在构建和求值 execution networks 时读取场景对象。",
      "`esf` 本身不绑定到某一种具体 USD stage；它定义抽象接口和 scene foundation 边界，后续 `EsfUsd` 才把这些接口落到 `UsdStage` 上。",
      "阅读时不要把 `Esf` 当成公开 authoring API；更合适的理解是执行网络编译阶段使用的 scene access adapter contract。",
      "当前页面链接较少，因此中文导读重点补足模块定位、公开性限制、与 `Exec`/`EsfUsd` 的分工，而保留官方英文摘录作为核对依据。"
    ],
    terms: [
      ["Execution Scene Foundation", "执行场景基础层"],
      ["scene description object", "场景描述对象"],
      ["execution network", "执行网络"],
      ["internal use", "内部使用"],
      ["adapter contract", "适配接口契约"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html",
    title: "EsfUsd: Execution Scene Foundation for Usd",
    notes: [
      "`EsfUsd` 是 `Esf` 面向 USD 的实现/适配层；英文摘录说明它 built on top of `esf`，并让 execution system 访问定义在 `UsdStage` 上的 scene objects。",
      "本页同样标注 `not meant for public use`，所以它不是普通用户脚本应优先调用的 API，而是 OpenExec 编译和求值 USD 场景时使用的基础设施。",
      "`UsdStage` 是本页最重要的概念锚点：它说明 `EsfUsd` 把抽象 scene foundation 接口映射到 USD stage 内的 prim、property 和相关 scene objects。",
      "与 `Esf` 的区别是：`Esf` 定义通用 scene access 接口，`EsfUsd` 负责 USD 具体后端；与 `ExecUsd` 的区别是：`EsfUsd` 更偏基础访问层，`ExecUsd` 更偏执行系统和 USD 的集成层。",
      "阅读顺序建议：先看 `Esf` 的接口定位，再看 `EsfUsd` 如何接入 `UsdStage`，最后进入 `ExecUsd` 或 OpenExec tutorials 理解实际 computation 定义和求值。"
    ],
    terms: [
      ["EsfUsd", "面向 USD 的 Esf 适配层"],
      ["UsdStage", "UsdStage"],
      ["scene objects", "场景对象"],
      ["stage-backed access", "基于 stage 的访问"],
      ["execution evaluation", "执行求值"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html",
    title: "Exec: Execution sytem core",
    notes: [
      "`Exec: Execution sytem core` 是 OpenExec 的核心执行系统入口；页面标题沿用官方拼写 `sytem`，中文说明不改动英文页面名。",
      "英文摘录说明 `exec` built on top of `vdf`、`ef`、`esf`，因此它位于 data flow、execution foundation 和 scene foundation 之上，负责把场景对象提供的 computations 编译成 data flow networks。",
      "本页最重要的三个动作是 defining computations、ingesting scenes and compiling data flow networks、evaluating data flow networks；这三步对应从 schema/scene 到执行图再到求值结果的路径。",
      "`Exec` 不是单个函数索引页，而是 execution system core 的模块说明；阅读它时应关注模块边界和依赖链，而具体类型/函数需要继续跳转到相应 class、namespace 或 tutorial 页。",
      "建议把 `Exec` 作为 OpenExec 阅读主入口：向下追踪 `vdf`/`ef`/`esf` 的基础层，向上追踪 `ExecUsd`、`ExecGeom` 和 tutorial 页面中的 USD 场景用法。"
    ],
    terms: [
      ["Execution system core", "执行系统核心"],
      ["defining computations", "定义计算"],
      ["ingesting scenes", "摄取场景"],
      ["compiling data flow networks", "编译数据流网络"],
      ["evaluating", "求值"]
    ]
  },
  {
    output: "full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html",
    title: "ExecGeom: Execution for UsdGeom",
    notes: [
      "`ExecGeom` 是面向 `UsdGeom` schemas 的 execution registration 层；英文摘录说明它 built on top of `execUsd`，因此它依赖 USD 集成层而不是直接连接最底层 `vdf`。",
      "本页核心语义是注册 computations，让执行系统可以基于 `UsdGeom` schema 表达的数据计算结果；这通常和几何属性、prim 数据、schema-defined behavior 的求值有关。",
      "`execUsd` 链接是本页关键上游：先理解 `ExecUsd` 如何让执行系统访问 USD，再看 `ExecGeom` 如何为 `UsdGeom` 相关 schema 提供计算注册。",
      "本页不是 `UsdGeom` schema 的完整教程，也不替代 `UsdGeomMesh`、`UsdGeomXformable` 等类页；它更像 OpenExec 到几何 schema domain 的桥接说明。",
      "阅读时保留 `ExecGeom`、`execUsd`、`UsdGeom`、`schemas`、`computations` 原名，中文层只解释它们在 OpenExec 模块依赖图中的位置和职责。"
    ],
    terms: [
      ["ExecGeom", "UsdGeom 执行集成层"],
      ["UsdGeom schemas", "UsdGeom schema 集合"],
      ["registration", "注册"],
      ["schema domain", "schema 领域"],
      ["computed result", "计算结果"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块定位、依赖关系、阅读顺序和术语对照；英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module positioning, dependency guidance, reading order, and terminology for ${escapeHtml(item.title)} while retaining English module names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, type names, header names, links, and source excerpts for comparison with the official Doxygen page.</p>
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
