import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdUI-schema-quality-pass-007";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdRender/usdRender_toc.html",
    title: "Render (usdRender)",
    notes: [
      "本页是 usdRender schema 领域目录入口，主要把 Overview、Best Practices、RenderPass、RenderProduct、RenderSettings、RenderVar 等页面组织成阅读路线。",
      "建议先读 Best Practices 和 Understand Which Schemas to Use，明确 RenderSettings、RenderProduct、RenderVar 的分工，再进入各 schema 属性页。",
      "目录中 Group UsdRender Prims、Provide a Default RenderSettings、Designate a Render Camera 等条目说明 usdRender 关注的不只是输出文件，还包括渲染 prim 的组织方式和默认渲染入口。",
      "本页链接继续保持本地跳转；RenderPass、RenderProduct、RenderSettings、RenderVar 名称不翻译，因为它们同时是 schema 名称、页面名和搜索关键字。"
    ],
    terms: [
      ["usdRender", "USD 渲染 schema 领域"],
      ["RenderSettings", "渲染设置 schema"],
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染变量"],
      ["Render Camera", "渲染相机"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html",
    title: "AccessibilityAPI",
    notes: [
      "AccessibilityAPI 描述 prim 上可暴露给运行时 accessibility frameworks 的无障碍信息，面向语音控制、屏幕阅读器等 assistive tooling。",
      "官方摘录将无障碍信息定义为 label、description、priority 的标准三元组；阅读时应保留这些属性名，中文层解释它们在 UI/运行时中的语义。",
      "label 通常是简短名称，description 提供更详细说明，priority 可用于排序或提示辅助工具优先呈现哪些信息。",
      "该 schema 属于 usdUI 领域，目标不是改变几何或渲染，而是在资产和运行时 UI 之间传递可访问性元数据。"
    ],
    terms: [
      ["AccessibilityAPI", "无障碍信息 API schema"],
      ["accessibility frameworks", "无障碍框架"],
      ["assistive tooling", "辅助工具"],
      ["screen readers", "屏幕阅读器"],
      ["label/description/priority", "标签/描述/优先级三元组"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/AttributeHints.html",
    title: "AttributeHints",
    notes: [
      "AttributeHints 为 UI 中展示的 attributes 提供提示信息，重点是属性级别的显示标签、可选值标签和在界面中的显示顺序。",
      "官方示例中 priority attribute 把 3 个值映射到标签，并指定这些标签在 UI 中的 ordering；这类信息帮助工具用更友好的方式展示原始属性值。",
      "AttributeHints 可以和 ObjectHints、PropertyHints 一起使用：前者偏属性值级提示，后两者提供对象和属性层面的更广泛 UI 元数据。",
      "属性名、枚举值和 UI token 不应翻译；中文说明只解释它们如何影响界面展示，而不改动 USD 数据中的 token。"
    ],
    terms: [
      ["AttributeHints", "属性提示 schema"],
      ["UI hints", "界面提示信息"],
      ["attribute-level hints", "属性级提示"],
      ["ordering", "显示顺序"],
      ["possible values", "可选属性值"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/Backdrop.html",
    title: "Backdrop",
    notes: [
      "Backdrop 是节点图中用于表示节点分组的视觉提示，通常表现为彩色矩形，让用户更容易看出哪些节点属于同一逻辑区域。",
      "它主要服务于 node graph 的可读性和布局组织，不改变节点本身的 shader、material 或计算语义。",
      "在复杂材质网络或可视化编程界面中，Backdrop 可以帮助作者把相关节点聚合、命名和区分层次。",
      "后续段落级翻译应补充 Backdrop 与 NodeGraphNodeAPI 的关系：一个描述分组背景，一个描述单个节点的位置、颜色和堆叠顺序。"
    ],
    terms: [
      ["Backdrop", "节点图背景分组"],
      ["node graph", "节点图"],
      ["node groupings", "节点分组"],
      ["colored rectangle", "彩色矩形"],
      ["visual indication", "视觉提示"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html",
    title: "NodeGraphNodeAPI",
    notes: [
      "NodeGraphNodeAPI 存储 node graph 中节点的 UI 布局信息，常见属性包括位置、显示颜色、z-index 或相对深度强度。",
      "官方摘录列出的 ui:nodegraph:node:pos、ui:nodegraph:node:displayColor、ui:nodegraph:node:stackingOrder 都应保持英文原样，因为它们是实际属性名。",
      "该 API 常用于 shader node graph，例如 Preview Surface 与 Color 节点；它让 DCC 或节点编辑器能够复原节点位置和显示样式。",
      "阅读时应把它和实际 shading 语义区分开：节点图 UI 信息帮助编辑器排版，不等同于改变 shader output 或连接关系。"
    ],
    terms: [
      ["NodeGraphNodeAPI", "节点图节点 API schema"],
      ["ui:nodegraph:node:pos", "节点位置属性"],
      ["ui:nodegraph:node:displayColor", "节点显示颜色属性"],
      ["ui:nodegraph:node:stackingOrder", "节点堆叠顺序属性"],
      ["z-index", "相对深度顺序"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令、属性名和原文摘录继续保留，便于和官方 usdRender/usdUI schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, property names, and source excerpts for comparison with the official usdRender/usdUI schema documentation.</p>
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
