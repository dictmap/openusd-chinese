import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-docs-quality-pass-053";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
    title: "Vdf: Vectorized Data Flow",
    notes: [
      "`Vdf: Vectorized Data Flow` 是 OpenExec 体系最底层的数据流基础之一，负责构建和求值 vectorized dataflow networks。",
      "核心对象是 `VdfNetwork`、`VdfNode` 和 `VdfConnection`：network 承载图，node 执行计算，connection 表示数据从 node outputs 流向 node inputs。",
      "本页应先作为 `ef`、`exec`、`execUsd` 的依赖背景阅读；如果不了解 Vdf graph，后续 execution foundation 和 computation evaluation 会比较难定位。",
      "官方摘录里的 `netorks` 拼写保留原样；中文导读只解释语义，不改写官方英文页面名和原始 API 名称。",
      "阅读顺序建议：先看 Key Concepts，再进入 `VdfNetwork`、`VdfNode`、`VdfConnection` class 页，最后回到 OpenExec overview 理解更高层 computation 如何落到 Vdf 图。"
    ],
    terms: [
      ["Vectorized Data Flow", "向量化数据流"],
      ["VdfNetwork", "VdfNetwork"],
      ["VdfNode", "VdfNode"],
      ["VdfConnection", "VdfConnection"],
      ["node outputs to node inputs", "从节点输出到节点输入"]
    ]
  },
  {
    output: "full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html",
    title: "Development Practices For usdview",
    notes: [
      "`Development Practices For usdview` 是 usdview 开发实践说明，当前摘录集中在 GUI 修改和测试要求，不是普通用户使用 usdview 的教程。",
      "GUI 部分最重要的规则是不要手工编辑 `.ui` files；因为 Qt XML format fragile，且不同平台工具对坏结构的容忍度不一致，应优先使用 `qdesigner5`。",
      "如果确实手工改了 `.ui` 文件，提交前至少要用 `qdesigner5` 加载、确认无错误、再保存导出的文件，避免后续开发者遇到无关格式差异。",
      "Testing 部分要求运行 `pxr/usdImaging/bin/testusdview` 中的测试，并在可能时新增测试；无法用 `testusdview` 覆盖的 feature 应补充到 black box testing 文档。",
      "本页适合贡献者阅读：它约束的是修改 usdview UI 与测试资产/行为的流程，中文导读保留 `qdesigner5`、`.ui`、`testusdview` 和 `blackBoxTesting.md` 原样。"
    ],
    terms: [
      ["usdview", "usdview"],
      [".ui files", ".ui 文件"],
      ["qdesigner5", "qdesigner5"],
      ["testusdview", "testusdview"],
      ["black box testing", "黑盒测试"]
    ]
  },
  {
    output: "full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html",
    title: "Usdview Black Box Testing",
    notes: [
      "`Usdview Black Box Testing` 记录那些不适合或不容易加入 `testusdview` 自动化 harness 的 usdview 行为测试场景。",
      "页面开头说明：当修复或部署某个 feature，却不适合新增 `testusdview` testcase 时，应把测试补充到这里，形成可追踪的手工/黑盒测试规范。",
      "当前摘录重点是 viewport prim vising/invising：在 viewport 中选择或多选 prims/models，再用 Make Invisible、Make Visible、Vis Only、Remove Session Visibility 等 hotkeys 检查行为。",
      "页面还包含 Vis and Draw Mode Columns Do Not Affect Selection、Prim View Framing 等测试主题；这些标题说明测试关注 UI 交互状态是否影响选择和 framed view 行为。",
      "阅读本页时应把 Goal 与 Method 分开：Goal 描述需要保证的行为，Method 描述如何操作 usdview 复现；中文层只补测试意图，不改变 hotkey/action 名称。"
    ],
    terms: [
      ["testusdview", "testusdview"],
      ["viewport", "视口"],
      ["Make Invisible", "Make Invisible"],
      ["Session Visibility", "会话可见性"],
      ["Prim View Framing", "Prim 视图取景"]
    ]
  },
  {
    output: "full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html",
    title: "Boolean Expressions",
    notes: [
      "`Boolean Expressions` 描述 Sdf 相关布尔表达式语言，语法有意接近 C/C++，表达式最终求值结果总是 boolean value。",
      "表达式可以是 constant value、variable，或对一个/多个 sub-expressions 施加操作；页面结构按 Constants、Variables、Binary Operators、Unary Operators、Parenthesized expressions 展开。",
      "常量可以是 boolean、numeric 或 string；字符串可用单引号或双引号，non-printable characters 需要 escape，且只允许 single-line strings。",
      "Implicit Casting 部分提示表达式求值可能涉及类型转换；官方链接到 `VtValue::Cast`，说明实际实现与 `VtValue` 的类型转换能力有关。",
      "本页和 USD property name 链接相关，阅读时保留变量名、运算符、字符串字面量和 `VtValue::Cast` 原样，中文导读只解释语法类别和求值边界。"
    ],
    terms: [
      ["Boolean Expression Language", "布尔表达式语言"],
      ["constant value", "常量值"],
      ["variable", "变量"],
      ["binary operator", "二元运算符"],
      ["implicit casting", "隐式转换"]
    ]
  },
  {
    output: "full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html",
    title: "Validation",
    notes: [
      "`Validation` 页面描述 OpenUSD Validation framework，用于验证 assets 是否满足 core rules、schema rules 和 client-provided plugin rules，从而提升 USD workflows 之间的稳健性与可互换性。",
      "`UsdValidationValidator` 表示单个 validation test，运行后可产生零个或多个 named validation errors；`UsdValidationValidatorMetadata` 则描述 validator 的 metadata。",
      "页面结构覆盖 Running Validator Tests、Creating Custom Validators、Plugin Validators、Explicit Validators、Choosing a Registration Path、Adding Fixers 以及 Python validators。",
      "C++ 路径涉及 `UsdValidationContext`、`UsdValidationRegistry`、`UsdValidationError`、`UsdValidationFixer`、`TF_REGISTRY_FUNCTION` 等；Python 路径涉及 plugin directory、`plugInfo.json`、`__init__.py` 和 task function signatures。",
      "阅读时建议先区分 validator、validator suite、validation error、fixer 四类对象，再根据 Layer/Stage/Prim validator 选择 task function 和 registration path。"
    ],
    terms: [
      ["Validation framework", "验证框架"],
      ["UsdValidationValidator", "UsdValidationValidator"],
      ["validator suite", "验证器套件"],
      ["validation error", "验证错误"],
      ["fixer", "修复器"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、流程/概念边界、阅读顺序和术语对照；英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, workflow and concept boundaries, reading order, and terminology for ${escapeHtml(item.title)} while retaining English module names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, type names, header names, links, and source excerpts for comparison with the official Doxygen page.</p>
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
