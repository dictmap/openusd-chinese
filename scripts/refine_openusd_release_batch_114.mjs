import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-114";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/ObjectHints.html",
    title: "ObjectHints",
    summary:
      "`ObjectHints` 是 usdUI 中最通用的 UI metadata 层，可附加在 prim 或 property 等 USD objects 上。它主要提供 `displayName`、`hidden` 等界面提示，帮助 DCC tool 或编辑器以更可读的方式展示对象，而不改变 composition 或属性真实值。",
    notes: [
      "`uiHints` 是 metadata 字典，示例中的 `displayName = \"ModelA placeholder\"` 只影响界面显示名称，不会重命名 prim，也不会改变 namespace path。",
      "`hidden = 1` 表示默认在 UI 中隐藏该对象或属性；它不是 USD 可见性 `visibility`，也不会影响 Hydra 或渲染器是否绘制几何。",
      "`ObjectHints` 适用于 broader USD object 层级，`PrimHints`、`PropertyHints`、`AttributeHints` 则进一步细化 prim、property 和 attribute 的界面组织。",
      "示例中 `Placeholder` prim 和 `isAnnotated` attribute 都带有 `uiHints`，说明同一机制可以服务 prim 和 property 两类对象。",
      "维护中文层时要把 UI metadata 和 scene data 分开：前者服务作者界面和交互体验，后者决定 stage composition、schema 属性和渲染行为。",
    ],
    terms: [
      ["ObjectHints", "通用 USD object UI 提示 schema"],
      ["uiHints", "UI metadata 字典"],
      ["displayName", "界面显示名"],
      ["hidden", "界面隐藏提示"],
      ["USD objects", "USD 对象"],
      ["namespace path", "命名空间路径"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/PrimHints.html",
    title: "PrimHints",
    summary:
      "`PrimHints` 面向 prim 内部属性组的 UI 展示。它可以描述 display groups 的展开状态、显示条件和属性归类方式，使 DCC tool 在展示一个 prim 时更符合作者意图。",
    notes: [
      "`displayGroupsExpanded` 控制 display group 初始是否展开，例如示例里 `Controller` 展开、`Widget Settings` 折叠。这是 UI 初始状态，不改变属性值。",
      "`displayGroupsShownIf` 使用条件表达式决定某个 group 是否显示，例如 `widgetReadOnlyMode == 0`。表达式中的属性名和比较值必须保留原样。",
      "属性自身通过 `displayGroup` 指定所属组；`PrimHints` 则描述这些组在 prim UI 中如何呈现，两者需要一起读。",
      "如果只需要改 prim 名称或隐藏整个 prim，应看 `ObjectHints`；如果需要控制某个属性是否显示或属于哪个组，应看 `PropertyHints` 和 `PrimHints`。",
      "本页的中文补强应突出 UI layout 语义，避免把 display group 误解成 USD namespace scope 或 composition group。",
    ],
    terms: [
      ["PrimHints", "prim 级 UI 提示 schema"],
      ["displayGroupsExpanded", "显示组初始展开状态"],
      ["displayGroupsShownIf", "显示组条件显示表达式"],
      ["displayGroup", "属性所属显示组"],
      ["widgetReadOnlyMode", "示例条件属性名"],
      ["UI layout", "界面布局"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/PropertyHints.html",
    title: "PropertyHints",
    summary:
      "`PropertyHints` 面向 property 的 UI metadata，常用于声明某个 attribute 或 relationship 的 `displayGroup`、`shownIf`、`displayName` 和 `hidden`。它影响工具界面中的展示方式，不改变 property 的值、关系目标或连接语义。",
    notes: [
      "`displayGroup` 把 property 放入某个 UI 分组；空字符串可表示没有特定分组。该字段是界面组织提示，不是 USD namespace 或 class 继承结构。",
      "`shownIf = \"showProperties == 1\"` 表示根据条件显示 property。条件表达式中的 `showProperties` 是实际属性名，不能翻译或改写。",
      "PropertyHints 可以同时作用于 attribute 和 relationship；示例中的 `exampleAttribute` 和 `exampleRelationship` 都带有 `uiHints`。",
      "`hidden` 与 `shownIf` 都是 UI 层提示。前者更像默认隐藏标记，后者表达条件可见性；二者都不等价于删除 property。",
      "阅读本页时建议和 `PrimHints` 对照：PropertyHints 给单个 property 添加提示，PrimHints 管理 prim 内 display groups 的整体显示策略。",
    ],
    terms: [
      ["PropertyHints", "property 级 UI 提示 schema"],
      ["property", "attribute 或 relationship"],
      ["shownIf", "条件显示表达式"],
      ["exampleAttribute", "示例 attribute"],
      ["exampleRelationship", "示例 relationship"],
      ["displayGroup", "界面显示分组"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html",
    title: "SceneGraphPrimAPI",
    summary:
      "`SceneGraphPrimAPI` 是 usdUI 中为场景图或节点图 prim 添加描述性 UI 信息的 applied API schema。它可提供 `ui:displayGroup`、`ui:displayName` 等 metadata，帮助编辑器组织节点说明，不改变 shader 连接、material 网络或渲染语义。",
    notes: [
      "示例中 `prepend apiSchemas = [ \"SceneGraphPrimAPI\" ]` 表示把该 applied API 附加到 Shader prim；它不是创建新的 shader 类型。",
      "`ui:displayGroup = \"MyMaterial Nodes\"` 用于把节点归类到用户界面分组；这和 `UsdShade` graph 的实际连接关系是两层概念。",
      "`ui:displayName = \"Preview Surface Node\"` 是编辑器可显示名称，和 prim 名称 `PreviewSurface` 不同；不要把 display name 当作 namespace rename。",
      "该页面适合和 `NodeGraphNodeAPI`、`Backdrop` 一起读：一个提供 scene graph 描述，一个提供节点位置/样式，一个提供视觉分组背景。",
      "中文层应明确 SceneGraphPrimAPI 是 editor metadata，不应把它误写成材质执行语义或 Hydra 渲染控制。",
    ],
    terms: [
      ["SceneGraphPrimAPI", "场景图 prim UI metadata API"],
      ["applied API schema", "应用型 API schema"],
      ["ui:displayGroup", "UI 显示分组属性"],
      ["ui:displayName", "UI 显示名称属性"],
      ["Shader prim", "着色器 prim"],
      ["editor metadata", "编辑器元数据"],
    ],
  },
  {
    output: "full_site/release/wp_stage_variables.html",
    title: "Stage Variable Expressions",
    summary:
      "`wp_stage_variables.html` 当前是 `Stage Variable Expressions` proposal 的迁移提示页。它说明相关 proposal 已迁移到 `OpenUSD-proposals`，本地复刻应保留这个状态，不应伪造旧 release 页面中不存在的完整正文。",
    notes: [
      "本页和 `user_guides/variable_expressions.html` 的职责不同：用户指南解释功能如何使用，本页只是 proposal 迁移入口和历史指针。",
      "`OpenUSD-proposals` 是继续查完整 proposal 的来源；如果后续补齐详细内容，应明确来自迁移后的 proposal 页面，而不是当前 release 页正文。",
      "Stage variables 讨论的是 stage 级配置、表达式变量和资产路径/变体选择等可配置机制的设计动机；但当前页只保留迁移说明。",
      "中文说明应避免把 migration notice 扩写成规范结论。可读价值在于告诉读者该 406 清单页已覆盖，但完整设计文本需要跳转到 proposal。",
      "保留 `Stage Variable Expressions`、`OpenUSD-proposals`、`proposal` 等英文术语，方便读者用官方标题搜索和交叉引用。",
    ],
    terms: [
      ["Stage Variable Expressions", "Stage 变量表达式 proposal"],
      ["OpenUSD-proposals", "OpenUSD proposals 仓库或页面"],
      ["migration notice", "迁移提示"],
      ["proposal", "设计提案"],
      ["stage variables", "stage 级变量"],
      ["variable expressions", "变量表达式"],
    ],
  },
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, function names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>|    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
  results,
}, null, 2));
