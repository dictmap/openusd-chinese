import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-120";

const refinements = [
  {
    output: "full_site/release/user_guides/primvars.html",
    title: "Primvars",
    summary:
      "`Primvars` 说明 USD 中 primvar 作为可在几何表面或体积上插值的特殊 attribute，如何把 texture coordinates、displayColor、材质覆盖和其他 surface/volume-varying signals 传给 shader 或下游工具。",
    notes: [
      "本页的关键不是普通 attribute，而是带有 interpolation 语义的 primvar；同一个数值数组在 `constant`、`uniform`、`varying`、`vertex`、`faceVarying` 下会有不同解释。",
      "`primvars:displayColor` 示例用于可视化插值模式，不应被误解为 primvars 只能表示颜色；texture coordinates、mask、custom data 都可能通过 primvar 传递。",
      "阅读 Mesh 示例时要同时看 `faceVertexCounts`、`faceVertexIndices` 和 primvar 数组长度；插值模式决定数组元素如何映射到 mesh 拓扑。",
      "primvar 会影响材质和渲染结果，因此它不是注释型 metadata；资产作者、材质作者和 renderer 都需要约定一致的名称、类型和 interpolation。",
      "调试 primvar 时建议分层检查：命名空间是否为 `primvars:*`、类型是否匹配、interpolation 是否正确、数组长度是否与拓扑一致、shader 是否读取同名输入。",
    ],
    terms: [
      ["primvar", "可插值图元变量"],
      ["interpolation", "插值模式"],
      ["faceVarying", "面顶点级插值"],
      ["displayColor", "显示颜色"],
      ["texture coordinates", "纹理坐标"],
      ["surface-varying signal", "随表面变化的信号"],
    ],
  },
  {
    output: "full_site/release/user_guides/render_user_guide.html",
    title: "Rendering with USD",
    summary:
      "`Rendering with USD` 汇总 USD 为可复现渲染提供的约定和规则。它覆盖 viewport 预览与 final frame 渲染之间的差异，并把 stage、资产、坐标系、材质、光照、可见性、purpose、render settings 和 renderer 支持边界放在同一条检查线上。",
    notes: [
      "本页适合在配置生产渲染前通读，因为很多问题不是单个 shader 错误，而是 stage 组织、坐标系、材质绑定或 render settings 缺失导致。",
      "interactive renders 通常可依赖较多默认值，final frame renders 则更需要显式的 render configuration、outputs、passes 和色彩空间设置。",
      "阅读本页时应把 `UsdRender` schema、`UsdShade` 材质、`UsdLux` 灯光、`UsdGeom` 几何和 `UsdVol` 体积联系起来，而不是只看一个模块。",
      "可复现渲染需要资产作者和 renderer 对同一批 schema 约定有一致理解；文档中的 token、属性名和 schema 名称必须保留英文原样。",
      "排查渲染差异时，先确认 renderer 是否支持相关 OpenUSD schema，再检查 authored opinions、fallback defaults 和 renderer-specific 配置。",
    ],
    terms: [
      ["Rendering with USD", "USD 渲染用户指南"],
      ["interactive renders", "交互式渲染"],
      ["final frame renders", "最终帧渲染"],
      ["render configuration", "渲染配置"],
      ["renderer-specific", "渲染器特定"],
      ["reproducible render", "可复现渲染"],
    ],
  },
  {
    output: "full_site/release/user_guides/color_user_guide.html",
    title: "Color User's Guide",
    summary:
      "`Color User's Guide` 解释 OpenUSD 如何记录和传递 color space information。它面向内容作者、工具配置者和 renderer 开发者，重点是 canonical interoperable color spaces、自定义颜色空间、`renderingColorSpace`、MaterialX 和 OCIO 等系统之间的边界。",
    notes: [
      "颜色值本身和 color space metadata 要分开理解：同样的 RGB 数值在不同色彩空间下含义不同，渲染结果也可能不同。",
      "`canonical interoperable color spaces` 是为了跨工具一致解释颜色；自定义颜色空间需要工具链和 renderer 明确支持，不能只写一个名称就假设全部兼容。",
      "`renderingColorSpace` 与 `UsdRender` schema 相关，通常影响渲染输出或渲染上下文的颜色解释；翻译时应保留属性名原文。",
      "MaterialX 和 OCIO 是外部生态中的重要上下文；本地复刻保留外部链接，但读者应把它们看作颜色管理系统背景，而不是 406 页清单内本地页面。",
      "调试颜色不一致时，应检查 authored color space、材质网络、texture 色彩空间、OCIO 配置、renderer 默认值和最终输出色彩空间。",
    ],
    terms: [
      ["color space", "颜色空间"],
      ["canonical interoperable color spaces", "规范互操作颜色空间"],
      ["custom color spaces", "自定义颜色空间"],
      ["renderingColorSpace", "渲染颜色空间属性"],
      ["MaterialX", "MaterialX 材质标准"],
      ["OCIO", "OpenColorIO"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/overview.html",
    title: "usdRender Overview",
    summary:
      "`usdRender` overview 是最终质量渲染配置 schema 的入口页。它说明如何用 `RenderSettings`、`RenderProduct`、`RenderVar` 和 `RenderPass` 等对象，把渲染分解、输出文件、分辨率、色彩空间和 renderer 可执行配置标准化写入 USD 场景。",
    notes: [
      "`usdRender` 的目标不是替代 renderer，而是用标准 schema 描述 renderer 可以尽力应用的渲染配置。",
      "viewport 预览可能只需要少量默认值，但 film/final quality 渲染通常需要明确 `products`、`orderedVars`、`renderSource`、resolution 和 color space。",
      "`RenderSettings` 通常组织一次渲染任务，`RenderProduct` 描述输出目标，`RenderVar` 描述 AOV/变量输出，`RenderPass` 描述 pass 层级和可见性配置。",
      "概览页中的示例 `Scope \"Render\"` 是推荐组织方式之一；中文导读应解释结构意图，但不要改写 USDA 片段。",
      "实际渲染是否完全遵循配置取决于 renderer 支持范围；因此文档中的 standardized way 和 best ability 两个边界都很重要。",
    ],
    terms: [
      ["usdRender", "USD 渲染配置 schema 领域"],
      ["RenderSettings", "渲染设置"],
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染变量或 AOV"],
      ["RenderPass", "渲染 pass"],
      ["renderingColorSpace", "渲染颜色空间"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/overview.html",
    title: "usdUI Overview",
    summary:
      "`usdUI` overview 说明面向 DCC 工具、节点图和资产浏览器的 UI metadata schema。它帮助工具表达 node position、display color、labels、groups 和 Backdrop 等界面线索，但不改变 scene composition、shader 求值或最终渲染结果。",
    notes: [
      "`usdUI` 应被理解为工具协作层：它让复杂 node graph 更易读、更易编辑，但核心数据语义仍由 `UsdShade`、`UsdRender`、`UsdLux` 等领域定义。",
      "`NodeGraphNodeAPI` 关注节点图布局和显示状态，`SceneGraphPrimAPI` 关注场景图中的标签和分组，`Backdrop` 用于视觉组织节点。",
      "示例中的 `ui:nodegraph:node:*` 属性是 UI metadata，不是 shader 输入；它们影响编辑器呈现，不应被 renderer 当作材质计算参数。",
      "工具可以忽略或部分支持 usdUI metadata，因此资产不能依赖这些 UI hints 来表达必需的渲染或 composition 语义。",
      "调试 UI 显示异常时，应检查 applied API、metadata 属性名、命名空间、工具版本和是否支持对应 usdUI schema。",
    ],
    terms: [
      ["usdUI", "USD UI metadata schema 领域"],
      ["NodeGraphNodeAPI", "节点图节点 UI API"],
      ["SceneGraphPrimAPI", "场景图 prim UI API"],
      ["Backdrop", "节点图背景框"],
      ["ui:nodegraph:node:*", "节点图 UI metadata 命名空间"],
      ["DCC Tools", "数字内容创作工具"],
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
