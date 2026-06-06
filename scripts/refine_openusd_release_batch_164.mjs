import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-164";

const refinements = [
  {
    output: "full_site/api/page__execution__system__design.html",
    title: "OpenExec System Design",
    summary:
      "`page__execution__system__design.html` 是 OpenExec execution system 的设计说明页，重点解释 computation graph、value resolution、invalidation、cache 边界以及 schema computation 如何接入 USD 场景数据。它适合用来理解架构分层，不应当当作单个 API 调用清单或 runtime scheduling 手册。",
    notes: [
      "阅读时先区分 `Exec`、`ExecUsd`、`Esf` 与 `Vdf` 的职责：`Exec` 组织执行系统，`ExecUsd` 面向 USD 集成，`Esf` 抽象 scene foundation，`Vdf` 承载数据流图与求值机制。",
      "Computation graph 描述 computed values 之间的依赖关系；如果结果不符合预期，应追踪输入 scene data、value key、dependency edge 与 invalidation，而不是只查看最终输出值。",
      "Invalidation 与 cache 是本页的核心语义之一：场景意见、属性值或依赖节点变化后，哪些 computed values 需要重新求值，通常由 dependency tracking 决定。",
      "Schema computation 的定义边界要和普通 scene authoring 分开；前者描述如何计算派生值，后者在 layer/spec/prim/attribute 中写入持久化意见。",
      "本页适合和 OpenExec overview、tutorial1、tutorial2 串读：先理解系统设计，再看如何请求 computed value，最后看如何定义 schema computations。",
    ],
    terms: [
      ["执行系统", "execution system"],
      ["计算图", "computation graph"],
      ["值解析", "value resolution"],
      ["失效传播", "invalidation"],
      ["执行场景基础", "execution scene foundation"],
      ["schema 计算", "schema computation"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_overview.html",
    title: "OpenExec Overview",
    summary:
      "`md_pxr_exec_exec_usd_docs_overview.html` 是 OpenExec 文档入口，说明 computed values 为什么需要独立执行模型，以及它如何与 USD stage、schema、scene adapter 和 dependency tracking 协同。它是学习路径的导览页，不是完整 API reference。",
    notes: [
      "OpenExec 的关注点是从 USD 场景输入推导 computed values；它扩展读取与求值流程，但不替代 USD composition、layer authoring 或 schema 定义本身。",
      "`ExecUsd` 把 USD 场景接入执行系统，`Exec` 提供求值框架，`Esf` 抽象场景访问，`Vdf` 提供图求值基础；这些层次在阅读概览时需要分开记。",
      "概览页中的 workflow 通常从 stage/prim/attribute 输入开始，经由 computation registration 与 dependency tracking，再由 evaluation request 取得结果。",
      "如果目标是上手操作，应先读本页，再进入 `tutorial1_computing_values` 和 `tutorial2_defining_computations`；如果目标是调试内部图，再回到 system design 页面。",
      "中文补强保留 `computed value`、`evaluation`、`dependency tracking`、`scene adapter` 等英文术语，便于和源码、类名及日志关键词直接对应。",
    ],
    terms: [
      ["OpenExec 概览", "OpenExec overview"],
      ["计算值", "computed value"],
      ["执行模型", "execution model"],
      ["依赖追踪", "dependency tracking"],
      ["场景适配器", "scene adapter"],
      ["求值工作流", "evaluation workflow"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
    title: "OpenExec Tutorial 1: Computing Values",
    summary:
      "`md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html` 展示如何从 USD 场景请求并计算 computed values。阅读重点是 value request、evaluation context、dependency invalidation 与 authored attributes 的关系，而不是把示例代码改写成新的 API 名称。",
    notes: [
      "教程从 stage/prim 等场景输入出发；需要区分 authored attribute value 和由 OpenExec 计算得到的 computed value，两者的生命周期和来源不同。",
      "Value request 是理解示例的主线：请求什么值、在哪个 scene object 上请求、依赖哪些输入，以及结果何时需要重新计算，都是调试时的关键问题。",
      "示例中的 C++ 标识符、schema 名称、token 字面量和方法名必须保持英文原样；中文层只补充语义解释，不替换可编译代码。",
      "如果计算结果陈旧或为空，优先检查依赖输入、registration/discovery、evaluation context 和 invalidation 是否正确，而不是只怀疑最终输出对象。",
      "本教程适合回答“如何消费 computed values”；若要知道如何定义新的 computation，应继续阅读 tutorial2。",
    ],
    terms: [
      ["计算值教程", "computing values tutorial"],
      ["值请求", "value request"],
      ["计算属性", "computed attribute"],
      ["求值上下文", "evaluation context"],
      ["依赖失效", "dependency invalidation"],
      ["教程工作流", "tutorial workflow"],
    ],
  },
  {
    output: "full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
    title: "OpenExec Tutorial 2: Defining Schema Computations",
    summary:
      "`md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html` 说明如何为 schema 定义 computations，使系统能够从 USD 场景输入计算派生结果。它面向 schema/plugin 层的 computation authoring，不是普通 USD layer authoring 教程。",
    notes: [
      "本页的核心是 computation definition：定义输入依赖、输出 value、provider/registration 以及 schema integration，而不是在 stage 上直接写入普通 attribute opinions。",
      "Computation provider 与 scene data 要分清；provider 描述如何计算，USD 场景提供被读取的 prim、attribute、metadata 或关系输入。",
      "Input dependency 的声明决定 invalidation 能否准确传播；如果依赖漏报，computed value 可能无法在场景变化后及时刷新。",
      "Registration/discovery 是教程中容易忽略的环节：定义了 computation 以后，还需要让执行系统能够找到并绑定到对应 schema 或 scene object。",
      "建议先读 tutorial1 理解如何消费 computed values，再读本页理解如何定义它们；两页共同形成 OpenExec 的最小实践路径。",
    ],
    terms: [
      ["schema 计算", "schema computation"],
      ["计算定义", "computation definition"],
      ["输入依赖", "input dependency"],
      ["输出值", "output value"],
      ["provider 注册", "provider registration"],
      ["schema 集成", "schema integration"],
    ],
  },
  {
    output: "full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html",
    title: "Validation",
    summary:
      "`md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html` 是 USD Validation 框架说明页，介绍 validators、validator suites、validation context、validation errors 与 registry 如何组合成管线检查能力。它报告问题，不自动修复场景数据，也不等同于 schema 定义。",
    notes: [
      "`UsdValidationContext` 负责组织一次验证运行，`UsdValidationValidator` 表示具体规则，`UsdValidationError` 承载诊断结果，`UsdValidationRegistry` 负责发现和管理可用 validators。",
      "Validators 可以用于 pipeline gate、资产发布前检查或调试阶段诊断；它们应描述约束和错误位置，但不应悄悄修改 layer、prim 或 attribute。",
      "Validation rule 与 schema definition 要分开：schema 描述可 author 的数据模型，validation 描述某个项目、工具或流程希望满足的附加约束。",
      "运行方式可能来自 API、命令行工具或上层集成；阅读本页时应关注 validator selection、suite grouping、error severity 和 reporting format。",
      "中文层保留 `UsdValidationContext`、`UsdValidationValidator`、`UsdValidationError`、`UsdValidationRegistry` 等 API 名称，便于读者直接跳转到对应 class 页面。",
    ],
    terms: [
      ["验证框架", "validation framework"],
      ["验证器", "validator"],
      ["验证上下文", "validation context"],
      ["验证错误", "validation error"],
      ["验证器注册表", "validator registry"],
      ["管线闸门", "pipeline gate"],
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
