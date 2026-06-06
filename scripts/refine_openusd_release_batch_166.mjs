import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-166";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html",
    title: "ExecIr: OpenExec implementation of invertible rigs",
    summary:
      "`md_pxr_exec_exec_ir__r_e_a_d_m_e.html` 是 `ExecIr` 的 README 型入口页，说明 OpenExec 如何服务 invertible rigs 相关实现。阅读时应把 rig computation、dependency graph、computed rig value 与普通 USD schema authoring 分开。",
    notes: [
      "`ExecIr` 关注 invertible rigs 的执行实现，核心是如何在执行图中表达可反向或可求解的 rig 计算，而不是定义普通场景层级或几何拓扑。",
      "如果页面提到 rig input、output 或 solve flow，应先判断这些数据是 authored USD data、computed value，还是执行系统内部的 intermediate state。",
      "调试 rig 计算时常见入口是 dependency registration、evaluation request、input invalidation 和 value propagation；这些术语应和 `Exec` core 页面一起阅读。",
      "`ExecIr` 与 `ExecGeom` 可能都接触几何或变换数据，但前者强调 rig/inversion 语义，后者强调 `UsdGeom` 派生值计算。",
      "中文补强保留 `invertible rig`、`computed rig value`、`solve`、`dependency graph` 等英文术语，方便和源码、日志、测试名称直接对应。",
    ],
    terms: [
      ["可逆绑定", "invertible rig"],
      ["绑定计算", "rig computation"],
      ["绑定计算值", "computed rig value"],
      ["求解流程", "solve flow"],
      ["中间状态", "intermediate state"],
      ["值传播", "value propagation"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html",
    title: "Ef: Execution Foundation",
    summary:
      "`md_pxr_exec_ef__r_e_a_d_m_e.html` 是 `Ef` Execution Foundation 的 README 型入口页，面向执行基础设施、对象模型、依赖表达和可复用 foundation 层。它是 OpenExec 的基础层说明，不是具体 USD schema 或 Hydra 渲染 API。",
    notes: [
      "`Ef` 更偏 foundation：提供执行相关的基础抽象、对象关系和共享机制；具体 USD 接入要继续看 `ExecUsd` 或 `EsfUsd`。",
      "阅读时要把 `Ef` 与 `Exec` 分层理解：`Ef` 提供底层基础设施，`Exec` 组织面向 computation 的执行语义。",
      "如果某个接口看起来很通用，应先确认它是 foundation utility、scene abstraction，还是具体 computation API，避免在上层页面中误用。",
      "`Ef` 相关概念常和 lifecycle、identity、dependency、registration 及 object ownership 相邻出现，中文层只补足阅读路径，不改写 API 名称。",
      "本页适合作为 OpenExec 低层模块索引；遇到 scene object 抽象时跳到 `Esf`，遇到 USD 绑定时跳到 `EsfUsd` 或 `ExecUsd`。",
    ],
    terms: [
      ["执行基础", "execution foundation"],
      ["基础抽象", "foundation abstraction"],
      ["对象标识", "object identity"],
      ["生命周期", "lifecycle"],
      ["对象所有权", "object ownership"],
      ["共享机制", "shared mechanism"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html",
    title: "Esf: Execution Scene Foundation",
    summary:
      "`md_pxr_exec_esf__r_e_a_d_m_e.html` 是 `Esf` Execution Scene Foundation 的入口页，用于理解执行系统如何通过抽象 scene object、property、relationship 和 value 访问场景数据。它是 scene abstraction 层，不是 USD composition 规则本身。",
    notes: [
      "`Esf` 把场景访问抽象成执行系统可消费的接口，使 `Exec` 不必直接依赖某个具体 scene representation。",
      "阅读本页时要区分 scene foundation 和 USD 实现：`Esf` 描述抽象接口，`EsfUsd` 才说明这些接口如何映射到 USD stage、prim、property。",
      "如果 computed value 无法读到输入，应检查 scene object identity、property lookup、relationship traversal 和 value availability，而不是只看 computation 代码。",
      "`Esf` 的价值在于稳定边界：上层 computation 面向抽象场景对象，下层适配器负责把真实数据模型转换成这些抽象对象。",
      "本页适合与 `Ef`、`Exec`、`EsfUsd` 串读，形成 foundation、execution、scene abstraction 和 USD binding 的层次图。",
    ],
    terms: [
      ["执行场景基础", "execution scene foundation"],
      ["场景抽象", "scene abstraction"],
      ["场景对象标识", "scene object identity"],
      ["属性查找", "property lookup"],
      ["关系遍历", "relationship traversal"],
      ["值可用性", "value availability"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html",
    title: "EsfUsd: Execution Scene Foundation for Usd",
    summary:
      "`md_pxr_exec_esf_usd__r_e_a_d_m_e.html` 是 `EsfUsd` 的入口页，说明 `Esf` 抽象如何映射到 USD stage、prim、property、relationship 和 value。它是 scene foundation 的 USD adapter，不是 `UsdStage` 或 `SdfLayer` 的完整参考。",
    notes: [
      "`EsfUsd` 的重点是把 USD 数据模型转换为执行系统可理解的 `Esf` scene objects；这层映射决定 computation 能看到哪些 scene inputs。",
      "阅读时要同时跟踪 USD path、prim/property identity、time context 和 layer-composed value，避免把 adapter 行为误解成新的 composition 规则。",
      "当执行结果与 USD 场景不一致时，排查顺序通常是 `SdfPath`、property lookup、time sample、value resolution、adapter cache 和 invalidation。",
      "`EsfUsd` 与 `ExecUsd` 相邻但不完全相同：前者偏 scene foundation adapter，后者偏 execution system 与 USD 的集成入口。",
      "中文层保留 `EsfUsd`、`UsdStage`、`UsdPrim`、`SdfPath`、`value resolution` 等名称，确保读者能直接回到 API 页面和源码。",
    ],
    terms: [
      ["USD 场景适配器", "USD scene adapter"],
      ["USD 路径", "USD path"],
      ["prim 标识", "prim identity"],
      ["属性标识", "property identity"],
      ["合成后的值", "layer-composed value"],
      ["适配器缓存", "adapter cache"],
    ],
  },
  {
    output: "full_site/api/page_ts_regression.html",
    title: "Regressive Splines in USD",
    summary:
      "`page_ts_regression.html` 说明 USD 中 regressive splines 的语义、动机和测试关注点。它与 Ts / USD Anim 的时间样条、knot、interpolation、extrapolation 和 value resolution 相关，不是普通 time sample authoring 的替代教程。",
    notes: [
      "Regressive spline 相关内容应按动画曲线数学语义阅读：关注 spline segment、knot ordering、regression behavior 和 evaluation result。",
      "如果曲线求值异常，应检查 authored spline data、time domain、knot value、interpolation mode、extrapolation policy 和 consuming API 的支持状态。",
      "本页与 `page_ts_status.html` 不同：status 页说明项目状态，本页更偏某类 spline 行为和回归测试语义。",
      "中文补强不改写数学符号、曲线术语或代码标识符；`Ts`、`spline`、`knot`、`regression`、`interpolation` 等词保留英文原样。",
      "适合和 `time_and_animated_values.html`、`page_ts_status.html`、相关 Ts class/API 页面串读，用来判断曲线数据迁移和测试风险。",
    ],
    terms: [
      ["回归样条", "regressive spline"],
      ["样条段", "spline segment"],
      ["节点顺序", "knot ordering"],
      ["时间域", "time domain"],
      ["求值结果", "evaluation result"],
      ["回归测试语义", "regression test semantics"],
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

  const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
  if (pageStructure.test(html)) {
    return html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
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
