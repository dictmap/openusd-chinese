import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-tutorial-quality-pass-001";

const refinements = [
  {
    output: "full_site/release/spec.html",
    title: "Specifications",
    notes: [
      "本页是 OpenUSD 规范入口，不是单个 API 类页。阅读时应把它当作标准和格式说明的索引，用来进入 USD Core、UsdPreviewSurface、usdz 等规范页面。",
      "USD Core Specification 适合查 scene description、Layer、composition、value resolution 等核心行为；它回答的是格式和语义边界，而不是某个语言绑定的使用示例。",
      "UsdPreviewSurface Specification 面向跨渲染器的预览材质表达；如果你在材质、shader、纹理输入或 DCC 互换中遇到不一致，应回到这个规范确认字段含义。",
      "Usdz File Format Specification 说明打包格式的结构和限制；它通常用于资产分发、移动端预览、交换包检查和管线发布环节。"
    ],
    terms: [
      ["Specifications", "规范"],
      ["USD Core Specification", "USD 核心规范"],
      ["UsdPreviewSurface", "USD 预览表面材质"],
      ["usdz", "USD 打包文件格式"],
      ["value resolution", "值解析"]
    ]
  },
  {
    output: "full_site/release/tut_authoring_variants.html",
    title: "Authoring Variants",
    notes: [
      "本教程讲的是如何在已有 HelloWorld layer 上创作 variant set。重点不是创建一个新 Stage，而是给同一个 prim 提供可切换的变体表达。",
      "VariantSet 可以把模型、材质、LOD、造型或配置差异组织在同一个资产内部，下游通过 variant selection 选择需要的版本，而不用复制整份资产。",
      "阅读 Python 示例时，保留 VariantSets、VariantSet、variant selection 等英文 API 名称；中文层只解释它们在资产组合和非破坏性编辑中的作用。",
      "这个教程适合和 Referencing Layers、Inspecting and Authoring Properties 一起读：先理解属性创作，再理解引用和变体如何参与 composition。"
    ],
    terms: [
      ["variant set", "变体集"],
      ["variant selection", "变体选择"],
      ["HelloWorld layer", "HelloWorld 层"],
      ["composition", "组合"],
      ["non-destructive editing", "非破坏性编辑"]
    ]
  },
  {
    output: "full_site/release/tut_helloworld_redux.html",
    title: "Hello World Redux - Using Generic Prims",
    notes: [
      "本教程回到 Hello World 示例，但重点转向 Generic Prims。它说明可以通过类型名字符串创作 prim，而不是只依赖某个具体 schema 的强类型包装。",
      "Xform 和 Sphere 在 usda 中表现为 def 后面的类型名；教程通过硬编码 typename 展示 USD scene description 与 API 创作之间的对应关系。",
      "Generic Prim 的价值在于让工具可以处理未知或扩展 schema：即使客户端没有专门的高级封装，也能创建、遍历或保留对应 prim。",
      "阅读时要区分 typed schema API 与 generic authoring API：前者更方便、更安全，后者更通用，常用于工具、转换器和兼容性处理。"
    ],
    terms: [
      ["Generic Prims", "通用 Prim"],
      ["typename", "类型名"],
      ["Xform", "变换 Prim 类型"],
      ["Sphere", "球体 Prim 类型"],
      ["typed schema", "带类型 schema"]
    ]
  },
  {
    output: "full_site/release/tut_referencing_layers.html",
    title: "Referencing Layers",
    notes: [
      "本教程演示把前面教程创建的 Stage 引用到新的 Stage 中。核心概念是 reference composition arc：当前 prim 可以把另一个 layer 或 prim 的内容组合进来。",
      "引用不是复制文件内容，而是在 composition 阶段把外部场景描述组合成最终结果。这让资产可以复用、分层发布，并允许上层在不修改源资产的情况下覆盖意见。",
      "HelloWorld.usda 和 referencingLayers 示例代码用于展示最小工作流：打开或创建 layer，建立引用，再检查组合后的 Stage 是否包含目标 prim。",
      "后续阅读 payload、sublayer、variant 和 inherits 时，都应把 reference 当作 composition arc 家族中的一员来理解。"
    ],
    terms: [
      ["reference", "引用"],
      ["composition arc", "组合弧"],
      ["layer", "层"],
      ["Stage", "舞台"],
      ["override", "覆盖意见"]
    ]
  },
  {
    output: "full_site/release/tut_traversing_stage.html",
    title: "Traversing a Stage",
    notes: [
      "本教程讲如何遍历 UsdStage 上组合后的 prim。它是实现成像客户端、USD 导入器、检查工具和批处理转换器时最常见的访问模式之一。",
      "遍历看到的是 composition 之后的 composed prims，而不是单个 layer 的原始文本。也就是说，reference、sublayer、variant 等组合结果都会影响遍历视图。",
      "教程会使用 Referencing Layers 产生的 layer，因此阅读顺序应先理解引用，再看遍历；这样更容易理解为什么 Stage 中会出现来自外部 layer 的 prim。",
      "实际写工具时，遍历通常要结合 prim path、type name、active/loaded 状态和 schema 判断；不要只把它理解成简单的树形打印。"
    ],
    terms: [
      ["Traverse", "遍历"],
      ["UsdStage", "USD 舞台"],
      ["composed prims", "组合后的 prim"],
      ["prim path", "Prim 路径"],
      ["schema", "模式"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的阅读路径和术语说明；英文页面名、链接、代码和原文摘录继续保留，用于和官方文档一一对应。</p>
      <p class="en">This section adds Chinese-first reading guidance for ${escapeHtml(item.title)} while retaining the English page name, links, code, and source excerpts for one-to-one comparison with the official documentation.</p>
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
    html = html.replace(/(    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>)/, `${section}\n$1`);
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
