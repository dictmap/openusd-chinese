import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-pages-quality-pass-055";

const refinements = [
  {
    output: "full_site/api/page__execution__system__design.html",
    title: "OpenExec System Design",
    notes: [
      "`OpenExec System Design` 是 OpenExec 设计说明页，解释一个通用 computation engine 如何从 authored scene description 和 registered definitions 编译 execution network。",
      "页面结构按 Object Model、Computations、Phases of Execution、Engine Architecture 展开；其中执行阶段分为 Compilation、Scheduling、Evaluation。",
      "官方摘录说明 OpenExec 用于 rigging、animation、layout、crowds、shading、lighting 和部分 simulation workflows；生产中已有 computations 包括 posed point positions、object visibility、bounding boxes。",
      "Engine Architecture 部分的 Network、Schedulers、Data Managers、Executors 是理解系统实现的四个关键入口；`EfLeafNode` 链接提示底层节点实现细节。",
      "阅读顺序建议：先看 guiding principles 和 Phases of Execution，再追踪 built-in computations、Plugin computations 和 `EfLeafNode`，避免把该页当作普通 API 函数索引。"
    ],
    terms: [
      ["execution network", "执行网络"],
      ["compilation", "编译"],
      ["scheduling", "调度"],
      ["evaluation", "求值"],
      ["Data Managers", "数据管理器"]
    ]
  },
  {
    output: "full_site/api/page_ts_regression.html",
    title: "Regressive Splines in USD",
    notes: [
      "`Regressive Splines in USD` 解释 Bezier splines 在时间维度可能回退的问题：参数曲线是 `{ x = f(t), y = f(t) }`，不一定满足 `y = f(x)`。",
      "当曲线在 time dimension 上 non-monotonic 时，同一时间可能对应多个值，这类 regressive segments 对 governs values over time 的系统不可接受。",
      "页面结构覆盖 When Regression Arises、Interactive Anti-Regression Demo、Anti-Regression Strategies、Center and Fringe Behavior、API 和 Load-Time Policies。",
      "API 部分的 `TsRegressionPreventer`、`TsSpline`、`TsAntiRegressionAuthoringSelector` 是本页关键跳转，用于理解防回退上下文、当前/默认 authoring mode、override、contain mode 和 interactive modes。",
      "阅读时保留 `regressive segments`、`anti-regression`、`authoring mode` 等术语原样，并把中文理解放在时间单调性和样条编辑策略上。"
    ],
    terms: [
      ["regressive segment", "回退段"],
      ["Bezier spline", "Bezier 样条"],
      ["non-monotonic", "非单调"],
      ["anti-regression", "防回退"],
      ["authoring mode", "创作模式"]
    ]
  },
  {
    output: "full_site/api/page_ts_status.html",
    title: "USD Anim Project Status",
    notes: [
      "`USD Anim Project Status` 是 Ts / USD Anim 的项目状态说明，开头明确标注 `IN DEVELOPMENT`，尚不适合 general use。",
      "Mostly Complete 部分列出接近最终的内容：Spline / KnotMap / Knot API、USD serialization formats (`usda`, `usdc`)、Bezier evaluation、Anti-regression，但仍可能变化。",
      "Still to Come 部分分为 UNIMPLEMENTED API、ADDITIONAL FEATURES、USD INTEGRATION、TESTS AND DOCUMENTATION；这是一份路线图而不是稳定 API 参考。",
      "未实现或后续内容包括 Hermite Evaluation、Evaluation Variations、Spline Editing、Looping、Queries、Automatic Tangents、Reduction、Attribute Value Resolution、usdview、Scalar xformOps。",
      "阅读时要把已完成能力和计划能力分开；尤其 `UsdAttribute::Get()` 相关 Attribute Value Resolution 表示未来 USD 集成仍在推进中。"
    ],
    terms: [
      ["IN DEVELOPMENT", "开发中"],
      ["Mostly Complete", "基本完成"],
      ["Still to Come", "待完成"],
      ["Hermite Evaluation", "Hermite 求值"],
      ["Attribute Value Resolution", "属性值解析"]
    ]
  },
  {
    output: "full_site/api/page_ts_ts_test.html",
    title: "The TsTest Framework",
    notes: [
      "`The TsTest Framework` 描述 TsTest 测试框架，用于 validate、graph 和 compare spline evaluations；它既测试 Ts 本身，也可通过其他 backends 与外部引擎对比。",
      "TsTest lives inside the Ts library；所有以 `tsTest`、`wrapTsTest` 或 `TsTest` 为前缀的文件都属于该框架。",
      "Framework 类别包含 base implementation、data structures、generic evaluation interface 和 graphical output；`tsTest_Evaluator` 提供通用求值接口。",
      "摘录中的 `tsTest_SampleTimes`、`tsTest_Types`、`TsTest_Grapher`、`tsTest_CompareBaseline` 分别服务采样时间、求值接口数据类型、图像输出和 baseline 对比。",
      "`TsTest_Grapher` 依赖 Python `matplotlib`；阅读时应区分 C++/wrapper 数据结构、Python graph helper 和测试 baseline helper。"
    ],
    terms: [
      ["TsTest", "TsTest"],
      ["spline evaluation", "样条求值"],
      ["backend", "后端"],
      ["baseline", "基线"],
      ["matplotlib", "matplotlib"]
    ]
  },
  {
    output: "full_site/api/pages.html",
    title: "Related Pages",
    notes: [
      "`pages.html` 是 Doxygen Related Pages 导航页，汇总 Overview、Developer Guides、module front pages、专题指南和相关文档，不是单个 API 的正文。",
      "当前摘录包含 Overview and Purpose、Developer Guides、Coding Guidelines、Testing Guidelines、Hydra 指南、MaterialX、Arch/Gf/Js/Plug/Tf/Trace/Ts/Vt/Work/Ar/Kind/Pcp/Sdf/Sdr/Usd 等入口。",
      "阅读时应把它当作目录：先按主题域选择入口，例如基础库看 Arch/Gf/Tf，资产解析看 Ar，composition 看 Pcp，scene description 看 Sdf，shader registry 看 Sdr，核心 scenegraph 看 Usd。",
      "本地复刻中这些链接多数应路由到 406 清单内的本地页面；如果某些官方相关页不在清单内，则进入 uncovered placeholder，只有 `Open official page` 外跳。",
      "本页的中文导读重点是帮助用户选择路径，而不是翻译全部相关页标题；英文标题必须保留，便于与官方 Doxygen 和最终入口索引对应。"
    ],
    terms: [
      ["Related Pages", "相关页面"],
      ["Developer Guides", "开发者指南"],
      ["module front page", "模块入口页"],
      ["scenegraph", "场景图"],
      ["local routing", "本地路由"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、结构读法、概念边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, structure-reading guidance, concept boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, type names, header names, links, and source excerpts for comparison with the official Doxygen page.</p>
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
