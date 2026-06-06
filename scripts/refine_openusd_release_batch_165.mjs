import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-165";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html",
    title: "Exec: Execution system core",
    summary:
      "`md_pxr_exec_exec__r_e_a_d_m_e.html` 是 `Exec` execution system core 的 README 型入口页，适合用来理解执行核心、computed value 求值、dependency graph 与 scheduling 边界。它说明执行系统核心职责，但不替代 `ExecUsd`、`Esf`、`Vdf` 或具体 schema computation 页面。",
    notes: [
      "`Exec` 是核心执行层，重点组织 computation、value request、dependency tracking 与 evaluation；它不直接负责 USD composition，也不直接 author layer/spec 数据。",
      "阅读本页时要把 execution system core 与 scene adapter 分开：核心只关心可求值对象和依赖图，具体场景对象如何读取通常交给 `ExecUsd` 或 `Esf` 相关层。",
      "如果某个 computed value 没有更新，排查路径通常是 computation registration、input dependency、invalidation propagation、cache reuse 和 evaluation context。",
      "`Exec` 与 `Vdf` 的关系要谨慎理解：`Vdf` 提供数据流图基础设施，`Exec` 使用这些机制构建面向场景计算的执行语义。",
      "本页适合作为 OpenExec 系列的核心索引；遇到 USD 绑定细节时跳到 `ExecUsd`，遇到几何计算细节时跳到 `ExecGeom`，遇到基础执行设计时回看 system design。",
    ],
    terms: [
      ["执行核心", "execution system core"],
      ["计算注册", "computation registration"],
      ["求值请求", "evaluation request"],
      ["依赖图", "dependency graph"],
      ["缓存复用", "cache reuse"],
      ["失效传播", "invalidation propagation"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html",
    title: "ExecGeom: Execution for UsdGeom",
    summary:
      "`md_pxr_exec_exec_geom__r_e_a_d_m_e.html` 是 `ExecGeom` 的入口页，说明 OpenExec 如何面向 `UsdGeom` 几何 schema 组织计算。阅读重点是几何输入、computed geometry values、xform/primvar/bounds 等数据依赖，而不是把它当成普通 `UsdGeom` authoring 教程。",
    notes: [
      "`ExecGeom` 位于 execution system 与 `UsdGeom` 之间，关注如何从几何 schema 数据计算派生值；它不改变 `UsdGeomMesh`、`UsdGeomXformable` 或 primvar 的 authoring 规则。",
      "几何计算常见输入包括 xform ops、points、normals、extent、primvars、purpose 和 visibility；中文层只解释依赖边界，不改写属性名或 token 字面量。",
      "Bounds、transforms 或 geometry-derived values 出错时，应同时检查 authored `UsdGeom` 数据、time sample、dependency invalidation 与执行图缓存。",
      "`ExecGeom` 与 `Gf`、`Vt` 也经常相邻出现：`Gf` 承载数学类型，`Vt` 承载数组和值容器，`ExecGeom` 组织对这些数据的计算消费。",
      "本页适合和 `UsdGeom` 模块入口、OpenExec overview、tutorial1 结合阅读，帮助区分“几何 schema 数据是什么”和“如何基于它计算值”。",
    ],
    terms: [
      ["几何执行", "geometry execution"],
      ["几何计算值", "computed geometry value"],
      ["变换依赖", "transform dependency"],
      ["primvar 输入", "primvar input"],
      ["边界计算", "bounds computation"],
      ["几何 schema", "geometry schema"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html",
    title: "ExecUsd: Execution system for Usd",
    summary:
      "`md_pxr_exec_exec_usd__r_e_a_d_m_e.html` 是 `ExecUsd` 的 README 型入口页，说明 execution system 如何接入 USD stage、prim、attribute、schema 与 scene data。它是 OpenExec 与 USD 数据模型之间的桥接层，不是 USD composition 或 layer authoring 的替代说明。",
    notes: [
      "`ExecUsd` 负责把 USD scene objects 暴露给执行系统，使 computation 可以读取 stage/prim/property/schema 相关输入；它依赖 USD 数据，但不重新定义 USD composition 规则。",
      "读取本页时要分清 authored scene description 和 computed result：前者来自 layer/spec/opinion，后者由执行系统依据依赖关系求值。",
      "Schema computation 与 `ExecUsd` 的交互通常涉及 schema discovery、provider binding、value key、input dependency 和 invalidation；这些术语应保留英文以便对照源码。",
      "当 computed value 与 stage 当前状态不一致时，先检查 scene adapter、property path、time context、dependency tracking 和 cache invalidation，而不是只看最终 API 返回值。",
      "`ExecUsd` 应和 `Exec` core、`EsfUsd`、OpenExec tutorials 串读；这样可以看清 USD 场景访问、抽象接口和执行核心之间的分工。",
    ],
    terms: [
      ["USD 执行桥接", "USD execution bridge"],
      ["场景对象", "scene object"],
      ["属性路径", "property path"],
      ["schema 发现", "schema discovery"],
      ["provider 绑定", "provider binding"],
      ["时间上下文", "time context"],
    ],
  },
  {
    output: "full_site/api/group__group__hd__collection_predicates.html",
    title: "Hydra Collection Predicate API",
    summary:
      "`group__group__hd__collection_predicates.html` 是 Hydra Collection Predicate API 的 group 页面，集中说明用于筛选、匹配或组合 collection 条件的 predicate 工具。它面向 Hydra scene index / collection 处理语义，不是普通 USD collection authoring 页面。",
    notes: [
      "Collection predicate 用于表达“哪些对象进入某个 Hydra collection 或处理集合”的判断逻辑；它通常服务于渲染、过滤、选择或 scene index 查询路径。",
      "阅读时要区分 USD collection authoring 和 Hydra consumption：USD 侧描述集合关系，Hydra 侧可能将其转成 predicate、filter 或 render task 可消费的结构。",
      "Predicate 相关 API 常常强调组合、短路、匹配路径和性能成本；如果过滤结果不对，应检查 collection membership、path expression、scene index 输入和 predicate 组合顺序。",
      "本页的 group 成员多为小型工具函数或类型，中文补强只说明用途和排查方向，函数名、template 参数、谓词语义和链接保持原样。",
      "它适合和 `HdSceneIndex`、`HdCollectionExpressionEvaluator`、`Hdx` task 页面一起阅读，以理解 Hydra 如何把场景子集送入渲染或选择流程。",
    ],
    terms: [
      ["集合谓词", "collection predicate"],
      ["集合成员关系", "collection membership"],
      ["路径表达式", "path expression"],
      ["场景索引过滤", "scene index filtering"],
      ["谓词组合", "predicate composition"],
      ["渲染子集", "render subset"],
    ],
  },
  {
    output: "full_site/api/page_ts_status.html",
    title: "USD Anim Project Status",
    summary:
      "`page_ts_status.html` 是 USD Anim / Ts 相关 project status 页面，适合快速了解时间样条、动画曲线、插值语义和项目状态边界。它是状态说明和导航页，不应当当作完整动画 authoring 教程或最终兼容性承诺。",
    notes: [
      "本页中的 status 语句要按项目阶段理解：它说明某些 Ts / USD Anim 能力的设计、实现或集成状态，不等同于所有 DCC、renderer 或 pipeline 都已完整支持。",
      "Ts 相关语义通常涉及 spline、knot、interpolation、extrapolation、time sample 与 value resolution；这些术语需要和 `time_and_animated_values` 用户指南分开对照。",
      "如果动画值表现异常，应检查 authored time samples、spline data、value type、interpolation mode、layer strength 和 consuming application 的支持情况。",
      "中文层保留 `Ts`、`UsdAnim`、`spline`、`knot`、`interpolation` 等术语，避免把项目状态页误解为可直接复制的 production recipe。",
      "本页适合和 `page_ts_regression.html`、`time_and_animated_values.html` 以及相关 class/API 页面串读，用于判断测试状态、功能范围和迁移风险。",
    ],
    terms: [
      ["项目状态", "project status"],
      ["时间样条", "time spline"],
      ["动画曲线", "animation curve"],
      ["插值模式", "interpolation mode"],
      ["外推语义", "extrapolation semantics"],
      ["功能范围", "feature scope"],
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
