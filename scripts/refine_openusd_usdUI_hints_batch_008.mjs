import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdUI-hints-quality-pass-008";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/ObjectHints.html",
    title: "ObjectHints",
    notes: [
      "ObjectHints 为可在 UI 中展示的所有 USD objects 提供通用提示信息，覆盖 prim 和 property 两类对象。",
      "它描述的是用户界面层面的 displayName、hidden 等信息，不改变对象的 scene composition、属性值或渲染语义。",
      "官方示例中 Placeholder prim 在 DCC UI 中显示为 ModelA Placeholder，isAnnotated attribute 显示名为 Model is annotated，并默认隐藏。",
      "阅读时应把 ObjectHints 看成跨对象的基础 UI 元数据层；PrimHints、PropertyHints、AttributeHints 会在更具体层级继续补充。"
    ],
    terms: [
      ["ObjectHints", "对象提示 schema"],
      ["USD objects", "USD 对象"],
      ["displayName", "界面显示名"],
      ["hidden", "界面隐藏状态"],
      ["DCC tool UI", "数字内容创作工具界面"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/PrimHints.html",
    title: "PrimHints",
    notes: [
      "PrimHints 为 UI 中展示的 prims 提供 prim-level hints，重点包括 display groups 如何显示、何时显示以及初始展开状态。",
      "官方示例把多个属性放入 Controller 和 Widget Settings 两个 display groups，并提示 DCC 工具初始展开 Controller、折叠 Widget Settings。",
      "条件表达式 widgetReadOnlyMode == 0 用来决定 Widget Settings 是否显示；该表达式和属性名应保持英文原样。",
      "PrimHints 可与 ObjectHints 配合：ObjectHints 处理 prim 的显示名和隐藏状态，PrimHints 处理 prim 内部属性组的 UI 展示方式。"
    ],
    terms: [
      ["PrimHints", "prim 提示 schema"],
      ["display groups", "显示分组"],
      ["initially display", "初始显示状态"],
      ["expanded", "展开状态"],
      ["conditional UI hints", "条件界面提示"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/PropertyHints.html",
    title: "PropertyHints",
    notes: [
      "PropertyHints 为 UI 中展示的 properties 提供 property-level hints，常见用途是指定某个 property 属于哪个 display group。",
      "它还可以通过 expression 条件控制某个 property 是否在 UI 中显示；这让工具能够根据上下文隐藏或显示高级设置。",
      "properties 仍可访问 ObjectHints 来创作 property 的 display name 和 hidden 状态；PropertyHints 主要补充属性级分组和条件显示。",
      "官方摘录说明该页示例不演示 prim-level display group hints；如需理解分组自身的展开和显示策略，应对照 PrimHints 页面。"
    ],
    terms: [
      ["PropertyHints", "属性提示 schema"],
      ["property-level hints", "属性级提示"],
      ["display group", "显示分组"],
      ["conditional expression", "条件表达式"],
      ["shown in a UI", "在界面中显示"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html",
    title: "SceneGraphPrimAPI",
    notes: [
      "SceneGraphPrimAPI 提供向 node graph 添加描述性信息的方式，面向的是场景图或节点图中的可读说明层。",
      "该 API 的重点不是改变 prim 的几何、材质或渲染行为，而是为编辑器和用户界面提供额外说明，帮助用户理解节点用途。",
      "由于当前摘录较短，后续段落级翻译需要回到官方页面补齐具体属性、适用对象和与 NodeGraphNodeAPI 的关系。",
      "阅读时可先把它放在 usdUI 的整体体系中理解：ObjectHints/PrimHints/PropertyHints 处理显示提示，SceneGraphPrimAPI 补充场景图描述。"
    ],
    terms: [
      ["SceneGraphPrimAPI", "场景图 prim API schema"],
      ["descriptive information", "描述性信息"],
      ["node graph", "节点图"],
      ["scene graph", "场景图"],
      ["editor metadata", "编辑器元数据"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html",
    title: "UI (usdUI)",
    notes: [
      "本页是 usdUI schema 领域目录入口，主要把 node graph、accessibility information、UI hints、display groups 和 conditional UI hints 组织成阅读路线。",
      "建议先读 Overview 和 Working With UI Hints，理解 UI 元数据如何和 USD 对象分离，再进入 ObjectHints、PrimHints、PropertyHints、AttributeHints 等具体 schema。",
      "Working With Accessibility Information 对应 AccessibilityAPI；Working With Node Graphs 对应 Backdrop、NodeGraphNodeAPI 和 SceneGraphPrimAPI。",
      "目录链接继续保持本地跳转；schema 名称不翻译为替代名，因为它们同时是页面名、API 名称和搜索关键字。"
    ],
    terms: [
      ["usdUI", "USD UI schema 领域"],
      ["UI Hints", "界面提示"],
      ["Display Groups", "显示分组"],
      ["Conditional UI Hints", "条件界面提示"],
      ["Accessibility Information", "无障碍信息"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令、属性名和原文摘录继续保留，便于和官方 usdUI schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, property names, and source excerpts for comparison with the official usdUI schema documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
