import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-113";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/Backdrop.html",
    title: "Backdrop",
    summary:
      "`Backdrop` 是 usdUI 中用于 node graph 可视化组织的 schema。它把一组相关节点放在可见的背景矩形中，帮助作者理解材质网络、程序节点或 UI graph 的逻辑分区；它不改变 shader、material、连接或计算结果。",
    notes: [
      "`Backdrop` 的核心语义是 visual grouping。它通常表现为 colored rectangle，用于把多个 graph node 放到同一个视觉区域，而不是创建新的执行节点。",
      "示例中 `NodeGraphNodeAPI` 仍然控制单个节点的 `ui:nodegraph:node:pos`、颜色或排序等 UI 元数据；`Backdrop` 则描述节点组的背景和区域。",
      "在复杂 `UsdShade` 或 MaterialX 网络中，Backdrop 可以表达“这些节点属于同一功能块”，例如颜色处理、纹理采样、混合或输出阶段。",
      "中文说明应保留 `Backdrop`、`NodeGraphNodeAPI`、`node graph`、`colored rectangle` 等术语，因为这些名称会出现在 schema、UI 和工具脚本中。",
      "Backdrop 属于 authoring UI hint，不是渲染指令。即使渲染器忽略它，材质网络的语义仍由 shader prim、inputs、outputs 和 connections 决定。",
    ],
    terms: [
      ["Backdrop", "节点图背景分组 schema"],
      ["node graph", "节点图"],
      ["visual grouping", "视觉分组"],
      ["colored rectangle", "彩色背景矩形"],
      ["NodeGraphNodeAPI", "节点图单节点 UI 元数据 API"],
      ["ui:nodegraph:node:pos", "节点图中的节点位置属性"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/AttributeHints.html",
    title: "AttributeHints",
    summary:
      "`AttributeHints` 为 UI 中展示的 attribute 提供属性级提示，重点包括 displayName、hidden、valueLabels 和 valueLabelsOrder。它帮助工具把原始属性值映射成更适合用户阅读的标签和排序，不改变属性真实取值。",
    notes: [
      "`valueLabels` 把属性可能的原始值映射到 UI label，例如把 priority 的数字值映射为 `very low`、`med`、`high` 等展示文本。",
      "`valueLabelsOrder` 指定这些 label 在 UI 中的展示顺序。它影响界面排序，不意味着 USD 属性本身按这个数组存储。",
      "`displayName` 和 `hidden` 可以来自 ObjectHints，也可以在属性 metadata 中提供；阅读时应区分 prim 级 UI hint 和 attribute 级 UI hint。",
      "示例中的 `int priority = 1` 仍是实际属性值；UI hint 只是解释如何在用户界面中呈现它。翻译时不要把数字值改写成中文枚举。",
      "`AttributeHints` 适合和 `ObjectHints`、`PropertyHints` 一起读：一个处理属性值展示，一个处理对象级提示，一个处理 property 级更广泛的 UI metadata。",
    ],
    terms: [
      ["AttributeHints", "属性级 UI 提示 schema"],
      ["displayName", "界面显示名称"],
      ["hidden", "是否在界面隐藏"],
      ["valueLabels", "属性值到显示标签的映射"],
      ["valueLabelsOrder", "显示标签排序"],
      ["uiHints", "UI 提示 metadata 字典"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/index.html",
    title: "Schema Domains",
    summary:
      "`Schema Domains` 是 release user guides 中的 schema 领域索引页。它把 `usdLux`、`usdMedia`、`usdRender`、`usdUI`、`usdVol` 等领域入口和具体 schema 页面串起来，适合用作从概念域跳到属性页的导航地图。",
    notes: [
      "本页不应被当作单个 schema 的规范正文。它的主要价值是帮助读者按领域选择入口：灯光看 `usdLux`，媒体看 `usdMedia`，渲染看 `usdRender`，UI 元数据看 `usdUI`。",
      "列表中的 schema 名称同时是类名、页面名和本地链接目标，应保留英文原文，例如 `BoundableLightBase`、`AssetPreviewsAPI`、`RenderSettings`、`AccessibilityAPI`。",
      "阅读顺序建议是先进入领域 `Overview` 或 `_toc` 页面，再跳到具体 schema 页面查看继承、属性、关系和示例。",
      "本页也能作为链接完整性检查的入口：如果某个 schema 链接不在 406 清单内，应该按本地链接策略跳到 `site/uncovered_openusd_page.html`，而不是新建不存在页面。",
      "中文补强应强调导航和归类，不应在索引页批量重写所有 schema 说明；更具体的语义应放在各 schema 页面中逐轮补强。",
    ],
    terms: [
      ["Schema Domains", "schema 领域索引"],
      ["usdLux", "灯光 schema 领域"],
      ["usdMedia", "媒体 schema 领域"],
      ["usdRender", "渲染 schema 领域"],
      ["usdUI", "UI 元数据 schema 领域"],
      ["usdVol", "体积和粒子场 schema 领域"],
    ],
  },
  {
    output: "full_site/release/user_guides/variable_expressions.html",
    title: "USD Variable Expressions",
    summary:
      "`Variable Expressions` 是 USD 中运行时求值的字符串表达机制，可由 layer metadata 里的 `expressionVariables` 驱动 asset path、reference、payload、metadata、variant selection 等值。它适合表达可配置资产路径和选择项，而不是替代普通属性创作。",
    notes: [
      "`expressionVariables` 定义在 layer metadata 中，常见值类型包括 string、bool、int64、数组和 `None`。这些变量会在表达式求值时参与替换。",
      "USDA 示例中的反引号表达式必须保留原样，例如 `@`\"${ASSET_PATH}/extraAssets.usda\"`@` 和 ```${VARIANT_CHOICE}``` 这类语法决定解析行为。",
      "变量表达式可用于 references、payloads、asset-valued attributes、metadata 和 variant selections；但并非所有属性值都适合变量化，读者应确认目标字段支持表达式。",
      "`ASSET_PATH` 与 `VARIANT_CHOICE` 分别展示路径和变体选择的动态化。一个影响 asset resolution，一个影响 composition 中选择哪个 variant。",
      "变量表达式会增加运行时配置能力，也会增加调试成本。发布资产时应记录默认变量、可选值和求值上下文，避免在不同工具中得到不一致结果。",
    ],
    terms: [
      ["expressionVariables", "表达式变量 metadata"],
      ["variable expression", "变量表达式"],
      ["asset-valued attributes", "asset 类型属性"],
      ["variant selection", "变体选择"],
      ["ASSET_PATH", "示例资产路径变量"],
      ["VARIANT_CHOICE", "示例变体选择变量"],
    ],
  },
  {
    output: "full_site/release/user_guides/time_and_animated_values.html",
    title: "Time and Animated Values",
    summary:
      "`Time and Animated Values` 说明 USD 如何通过 `TimeCode` 和 `timeSamples` 表达动画值。`TimeCode` 是无单位 double 时间坐标，实际播放和帧率解释需要结合 `timeCodesPerSecond`、`framesPerSecond`、layer offset 和 clips 等元数据。",
    notes: [
      "`timeSamples` 是属性在多个时间坐标上的取值表，例如 `1 : 0`、`25 : 10`、`99 : 5`。这些数字是时间键，不是数组下标。",
      "`TimeCode` 不直接等同于 FPS 或 SMPTE。相同的 time sample 键在不同 `timeCodesPerSecond` 设置下可对应不同实际秒数。",
      "`startTimeCode` 和 `endTimeCode` 描述 stage 或 layer 的播放范围；它们不会自动创建动画，只定义时间线边界或默认查看范围。",
      "composition 中可能出现 automatic 或 explicit timeCode remapping。通过 reference、sublayer 或 clips 引入动画时，时间可以被 offset 或 scale。",
      "维护中文层时应保留 `TimeCode`、`timeSamples`、`timeCodesPerSecond`、`framesPerSecond`、`LayerOffset` 等术语，避免把时间偏移误解成几何空间位移。",
    ],
    terms: [
      ["TimeCode", "USD 无单位时间坐标"],
      ["timeSamples", "属性时间采样值表"],
      ["timeCodesPerSecond", "每秒时间码数 metadata"],
      ["framesPerSecond", "每秒帧数 metadata"],
      ["startTimeCode", "开始时间码"],
      ["endTimeCode", "结束时间码"],
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
