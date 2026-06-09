import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 483;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/usd_semantics_overview.html";
const SOURCE = "source/full_api/usd_semantics_overview_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/usd_semantics_overview.html";
const SOURCE_PARITY_REPORT = "reports/round_483_usd_semantics_overview_source_parity.json";
const PROMOTION_ID = "round-483-api-usd-semantics-overview";
const PREVIOUS_GOOD_BILINGUAL = 244;
const PROMOTION_COMMIT_PLACEHOLDER = "c2e2c6314c451bcec14b2601fbe388e429f6e44d";

const expectedKeywords = [
  "UsdSemantics : Semantic Labeling of Scenes",
  "While prims have a unique name and hierarchical identifier",
  "SemanticsLabelsAPI:category",
  "token[] semantics:labels:category",
  "Inheritance and Comparison to Primvars",
  "direct and inherited labels",
  "Taxonomy and Comparison to Model Hierarchy",
  "Only a single kind value may be specified at each prim.",
  "Multiple taxonomies may be specified",
  "There is no implied hierarchy in the order of the labels.",
  "Time Varying Considerations",
  "Intervals and State Transitions",
  "Filtering and Selection by Label",
  "Relationship to Other Domains",
  "UsdGeom",
  "GeomSubset",
  "UsdShade",
  "Material",
  "Nested Materials",
  "Shaders and Node Graphs",
  "UsdRender (To be proposed and implemented)",
  "metadata",
  "matte channels",
  "extras/usd/examples/usdSemanticsExamples/bookshelf.usda",
];

function rel(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, "");
}

function write(file, content) {
  fs.writeFileSync(rel(file), content, "utf8");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function writeJson(file, data) {
  write(file, `${JSON.stringify(data, null, 2)}\n`);
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeEntities(value) {
  return String(value)
    .replace(/&zwj;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripHtml(value) {
  return decodeEntities(
    String(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  return (String(value).match(new RegExp(`class="${klass}"`, "g")) || []).length;
}

function normalizeZhSpans(html) {
  return html.replace(/<span class="zh">([\s\S]*?)<\/span>/g, (full, inner) => {
    const normalized = inner
      .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
      .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, "$1")
      .replace(/<strong>([\s\S]*?)<\/strong>/g, "$1");
    return `<span class="zh">${normalized}</span>`;
  });
}

function pageHtml() {
  return normalizeZhSpans(`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>UsdSemantics : Semantic Labeling of Scenes | OpenUSD API 中文导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.68}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1080px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    code,pre{font-family:"Cascadia Mono","Consolas",monospace}
    pre{white-space:pre-wrap;background:#0f1720;color:#e8eef7;border-radius:6px;padding:14px;overflow:auto}
    .status{display:inline-block;background:#1f7a54;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${esc(SOURCE)}">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>UsdSemantics : Semantic Labeling of Scenes</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-483-usd-semantics-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页说明 <code>UsdSemantics : Semantic Labeling of Scenes</code>。官方开头指出，虽然 prim 有唯一名称和层级标识，但有时需要用一组 labels 来推理 scene graph。这个页面的核心不是给 prim 改名，也不是替代 <code>kind</code> 或 <code>primvars</code>，而是说明如何用 <code>SemanticsLabelsAPI:category</code> 这类 multiple-apply API 和 <code>token[] semantics:labels:category</code> 这类属性，把一个 prim、GeomSubset、Material 或状态标记为可被下游选择、过滤、分割和渲染输出消费的语义标签。</span><span class="en">While prims have a unique name and hierarchical identifier, it is sometimes useful to reason about the scene graph using a set of labels.</span></p>
      <p><span class="zh">中文阅读要抓住三个边界：第一，semantic labels 有类似 primvars 的继承语义，但子层级不是严格覆盖父层级，而是可以 accumulated；第二，它和 model hierarchy 的 <code>kind</code> 不同，<code>kind</code> 每个 prim 只能一个值，而 semantic labels 可以有多个 taxonomy instance、每个 instance 也可以有多个 token；第三，labels 可以 time varying，因此查询 explicit time sample 和查询 interval 会得到不同集合。</span><span class="en">Semantic labels have hierarchical inheritance semantics similar to primvars.</span></p>
      <p><span class="zh">读者还需要理解跨域关系：最常见目标是 <code>Gprim</code>、祖先 <code>Scope</code> 和 <code>Xform</code>；<code>GeomSubset</code> 也可以作为有效标签目标；<code>Material</code> 可以被标记，但 <code>usdSemantics</code> 与 <code>UsdGeom</code>、<code>UsdShade</code> 是分离域，不会自动跨 relationship boundary 把 Material 的 <code>metal</code> 或 <code>corroded</code> 标签变成 Gprim 自身的 scene graph 标签。渲染输出阶段可以合并 labels，但 authoring 阶段必须保持这个边界。</span><span class="en">Relationship to Other Domains covers UsdGeom, UsdShade, and UsdRender.</span></p>
    </section>

    <section data-cn-complete="round-483-usd-semantics-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">开头示例把 <code>OfficeBookshelf</code> 应用 <code>SemanticsLabelsAPI:category</code>，并写入 <code>token[] semantics:labels:category = ["furniture", "bookcase", "bookshelf"]</code>。这说明 label 是 token array，可同时描述多个类别。</span><span class="en">apiSchemas = ["SemanticsLabelsAPI:category"] and token[] semantics:labels:category.</span></li>
        <li><span class="zh"><code>Inheritance and Comparison to Primvars</code> 解释 direct labels 与 inherited labels。<code>/OfficeBookshelf/TopShelf/Screw</code> 既有 direct labels <code>screw</code>、<code>hardware</code>，也继承 <code>furniture</code>、<code>bookcase</code>、<code>shelf</code>。</span><span class="en">The labels create two tiers of semantics: direct and inherited labels.</span></li>
        <li><span class="zh"><code>Taxonomy and Comparison to Model Hierarchy</code> 强调 <code>kind</code> 只能单值，而 labels 可以多 taxonomy、多值。源文还说明没有类似 kind 的 taxonomy registry，所需层级可编码进 token list，例如 <code>["sedan", "car", "vehicle", "machine"]</code>，且 All labels are weighted equally。</span><span class="en">Only a single kind value may be specified at each prim; multiple taxonomies may be specified.</span></li>
        <li><span class="zh"><code>Time Varying Considerations</code> 说明 labels 可描述 actions 或 states 并随时间变化。<code>/Dog</code> 示例中 <code>semantics:labels:state.timeSamples</code> 在 0、100、200 分别为 <code>walking</code>、<code>running</code>、<code>jumping</code>；区间 <code>[50, 150]</code> 会合并为 <code>["walking", "running"]</code>。</span><span class="en">Labels may be queried at explicit time samples or over an interval.</span></li>
        <li><span class="zh"><code>Filtering and Selection by Label</code> 给出组合查询例子：选择属于 car prim 的 wheel prim，可以用 direct label <code>wheel</code> 和 parent 的 inherited label <code>car</code> 组合过滤。</span><span class="en">Queries can be combined for selection or filtering by label.</span></li>
        <li><span class="zh"><code>Relationship to Other Domains</code> 覆盖 <code>UsdGeom</code>、<code>GeomSubset</code>、<code>UsdShade</code>、<code>Nested Materials</code>、<code>Shaders and Node Graphs</code> 和 <code>UsdRender (To be proposed and implemented)</code>。这些 section 决定标签是否能被下游 segmentation、metadata 或 matte channels 使用。</span><span class="en">UsdRender may carry semantics into outputs as metadata or matte channels.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-483-usd-semantics-code-model">
      <h2>示例与数据模型 / Examples and Data Model</h2>
      <h3>基础 category 标签</h3>
      <p><span class="zh">最小示例是给 <code>OfficeBookshelf</code> 应用 <code>SemanticsLabelsAPI:category</code>，再 author <code>token[] semantics:labels:category</code>。这里的 <code>category</code> 是 taxonomy instance 名，<code>furniture</code>、<code>bookcase</code>、<code>bookshelf</code> 是同一 instance 下的多个标签值。</span><span class="en">Multiple labels may be specified per instance.</span></p>
      <pre>def Xform "OfficeBookshelf" (apiSchemas = ["SemanticsLabelsAPI:category"])
{
    token[] semantics:labels:category = ["furniture", "bookcase", "bookshelf"]
}</pre>
      <h3>多个 taxonomy instance</h3>
      <p><span class="zh">与 <code>kind = "component"</code> 的单值模型不同，同一个 prim 可以同时应用 <code>SemanticsLabelsAPI:category</code> 和 <code>SemanticsLabelsAPI:style</code>，也可以分别写入 <code>semantics:labels:category</code> 与 <code>semantics:labels:style</code>。这让 taxonomy 不必被一个全局 registry 固定，但也意味着下游消费者必须约定如何解释这些 token。</span><span class="en">There is also no registry of taxonomies akin to kind in model hierarchy.</span></p>
      <pre>def Xform "OfficeBookshelf" (
    kind = "component"
    apiSchemas = ["SemanticsLabelsAPI:category",
                  "SemanticsLabelsAPI:style"]
)
{
    token[] semantics:labels:category = ["furniture", "bookcase"]
    token[] semantics:labels:style = ["chic", "modern"]
}</pre>
      <h3>timeSamples 状态标签</h3>
      <p><span class="zh">状态标签可以 time varying。<code>Dog</code> 示例中，如果在 shutter window 或任意 interval 上查询，返回值会把区间内显式 authored 的 time samples 与 start resolved value 合并。若状态切换发生在区间内，对象可能同时得到互相冲突的 labels，例如 <code>on</code> 与 <code>off</code>。下游工具必须决定接受多状态，还是只查询 explicit time samples。</span><span class="en">Intervals and State Transitions may yield conflicting labels.</span></p>
      <pre>def Xform "Dog" (apiSchemas = ["SemanticsLabelsAPI:state"])
{
    token[] semantics:labels:state.timeSamples = {
        0 : ["walking"],
        100 : ["running"]
        200 : ["jumping"]
    }
}</pre>
    </section>

    <section data-cn-complete="round-483-usd-semantics-inheritance-taxonomy">
      <h2>继承、taxonomy 与查询 / Inheritance, Taxonomy, and Queries</h2>
      <p><span class="zh">与 primvars 的相似点是标签可以沿层级继承；差异是 descendant 不一定覆盖 parent，labels may be accumulated。因此 <code>/OfficeBookshelf/TopShelf</code> 会继承 <code>furniture</code>、<code>bookcase</code> 并增加 direct label <code>shelf</code>，<code>/OfficeBookshelf/TopShelf/Screw</code> 又会继承上层标签并增加 <code>screw</code>、<code>hardware</code>。</span><span class="en">Direct and inherited labels form two tiers of semantics.</span></p>
      <p><span class="zh">taxonomy 层级不是由 token 顺序隐含出来的。源页明确说 <code>All labels are weighted equally</code>，且 <code>There is no implied hierarchy in the order of the labels.</code>。如果下游需要 sedan -> car -> vehicle -> machine 这种层级，它应把层级显式嵌入 token list，并在消费端定义解释规则，而不是依赖 array 顺序自动推断优先级。</span><span class="en">All labels are weighted equally; there is no implied hierarchy in the order of the labels.</span></p>
      <p><span class="zh">过滤和选择通常要组合 direct label 与 inherited label。源页的 wheel/car 例子展示了一个常见模式：先找 direct label 为 <code>wheel</code> 的 prim，再要求其 parent 或祖先具有 inherited label <code>car</code>。这种查询方式适合选择、标注、数据集导出和 segmentation 前处理。</span><span class="en">Select all wheel prims that are part of a car prim.</span></p>
    </section>

    <section data-cn-complete="round-483-usd-semantics-domain-boundaries">
      <h2>相邻域边界 / Domain Boundaries</h2>
      <ul>
        <li><span class="zh"><code>UsdGeom</code>：semantic labels 最常见目标是 <code>Gprim</code> 及祖先 <code>Scope</code>、<code>Xform</code>。<code>GeomSubset</code> 也应被视为有效目标，例如 <code>/Human/Face/LeftEar</code> 和 <code>/Human/Face/RightEar</code> 可加 <code>["ear"]</code> 标签。</span><span class="en">Consumers of labels should consider GeomSubsets as valid targets.</span></li>
        <li><span class="zh"><code>UsdShade</code>：<code>Material</code> 也可以被 semantically labeled，例如 <code>RustyMetal</code> 同时有 <code>metal</code> 与 <code>corroded</code>。但 <code>usdSemantics</code> 与 <code>UsdGeom</code>、<code>UsdShade</code> 是 separate domain，不会自动跨 material binding 把材质标签变成 Gprim 的 scene graph 标签。</span><span class="en">There are no queries which tries to resolve semantics across relationship boundaries.</span></li>
        <li><span class="zh"><code>Nested Materials</code>：源页提醒，<code>/Car/Materials/Metal</code> 因层级继承会得到 <code>car</code>、<code>vehicle</code>。这有助于理解 hierarchical labels apply to the entire hierarchy，但也可能让嵌套材质继承到 asset interface prim 的 labels，下游要明确是否接受这种继承。</span><span class="en">Material prims nested under asset interface prims inherit labels.</span></li>
        <li><span class="zh"><code>Shaders and Node Graphs</code>：shader nodes 和 node graphs 可以用于 general tagging，但源页没有规定它们如何 feed into render products，因为它们通常不像 <code>UsdGeomSubset</code> 那样产生 discrete segmentations。</span><span class="en">Shaders and node graphs generally do not yield discrete segmentations.</span></li>
        <li><span class="zh"><code>UsdRender</code>：官方标注为 <code>To be proposed and implemented</code>。语义标签常用于下游 renderer output labeling 和 segmentation，未来可能作为 additional metadata 或 matte channels 输出。本页不能把尚未实现的 proposal 写成现有稳定功能。</span><span class="en">Semantics may make their way into outputs as either additional metadata or as matte channels.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-483-usd-semantics-authoring-consumer-guidance">
      <h2>建模与消费建议 / Authoring and Consumer Guidance</h2>
      <p><span class="zh">在建模阶段，建议把 taxonomy instance 名称设计成稳定的业务维度，例如 <code>category</code>、<code>state</code>、<code>style</code> 或项目内部约定的其它实例名。实例名会出现在 <code>SemanticsLabelsAPI:&lt;instance&gt;</code> 和 <code>semantics:labels:&lt;instance&gt;</code> 中，因此它不是普通显示文本，而是会进入查询、导出、数据集生成和渲染输出流程的接口约定。若团队 later 改名，旧资产中的 authored 属性不会自动迁移，消费者也可能查不到预期标签。</span><span class="en">Instance names are part of the authored API and attribute namespace.</span></p>
      <p><span class="zh">在 authoring 层面，直接标签适合表达当前 prim 自己的语义，例如 <code>wheel</code>、<code>screw</code>、<code>hardware</code>；继承标签适合表达资产或层级上下文，例如 <code>car</code>、<code>vehicle</code>、<code>furniture</code>。如果一个下游工具只看 direct labels，它会漏掉祖先语义；如果它总是合并 inherited labels，又可能把查询范围放得太宽。因此页面调试时应同时检查 authored 属性、祖先链、查询模式和 interval/time sample 参数，而不是只检查单个 prim 上是否有 token。</span><span class="en">Consumers should distinguish authored labels from inherited labels.</span></p>
      <p><span class="zh">在 taxonomy 设计上，官方页没有提供全局 registry，也不从 token 顺序推断层级，所以项目团队需要自己决定 token 是否采用从具体到抽象的顺序。若使用 <code>["sedan", "car", "vehicle", "machine"]</code> 这种列表，列表顺序只是团队约定；OpenUSD 不会自动把 <code>sedan</code> 视为比 <code>vehicle</code> 更具体，也不会帮你做 ontology 推理。需要层级推理时，应在消费端显式实现映射表或规则，并把该规则写入工具文档。</span><span class="en">OpenUSD does not infer taxonomy hierarchy from token order.</span></p>
      <p><span class="zh">在动画或状态标注中，<code>Time Varying Considerations</code> 与 <code>Intervals and State Transitions</code> 是最容易误读的部分。查询单个 frame 时，通常希望得到该时刻 resolved 的 label；查询 shutter interval 或一段时间范围时，返回集合可能包含多个状态。对于 segmentation、训练数据导出或动作识别任务，这种多状态集合需要被显式处理：可以保留多个标签、拆分区间、选择优先级，或退回到 explicit time sample 查询，但不能假设 interval 查询天然只有一个状态。</span><span class="en">Interval queries may return multiple labels and must be handled explicitly.</span></p>
      <p><span class="zh">在几何和材质边界上，<code>GeomSubset</code> 允许给同一个 mesh 的局部区域加标签，适合描述面、耳朵、轮胎区域或其它 segment；<code>Material</code> 标签则适合描述材质身份和属性，例如 <code>metal</code>、<code>corroded</code>。两者可以被同一个渲染或数据集工具一起消费，但它们的 authoring 位置不同。若数据集要求“表面材质标签”和“物体部件标签”同时存在，应分别查询材质 binding、GeomSubset 和 scene graph labels，再在工具端合并，而不是期待 <code>usdSemantics</code> 自动跨域解析。</span><span class="en">Geometry, subset, and material labels remain separate authoring domains.</span></p>
      <p><span class="zh">在渲染输出层面，官方页把 <code>UsdRender</code> 标为将来提议和实现的方向，说明 semantic labels 可能作为 <code>metadata</code> 或 <code>matte channels</code> 进入输出。这里的关键边界是“可能被渲染消费”不等于“当前 schema 已定义完整输出协议”。本地中文页保留这个谨慎口径，避免把尚未实现的提议写成稳定功能；实际项目需要检查所用 renderer、Hydra delegate 或数据集导出器是否已经支持这些 labels。</span><span class="en">UsdRender integration is described as proposed and should not be overstated.</span></p>
      <p><span class="zh">验证本页理解时，可以从官方示例 <code>extras/usd/examples/usdSemanticsExamples/bookshelf.usda</code> 开始，先确认 layer 中实际 authored 的 <code>apiSchemas</code> 和 <code>semantics:labels</code> 属性，再用自己的查询工具分别打印 direct labels、inherited labels、time sample 结果和 interval 结果。若这些结果与预期不一致，问题通常出在层级继承、taxonomy instance 名称、时间查询方式或消费端是否跨域合并，而不是标签 token 本身被 OpenUSD 自动改写。</span><span class="en">The example layer is a practical checkpoint for authored labels and consumer queries.</span></p>
    </section>

    <section data-cn-complete="round-483-usd-semantics-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">开头段说明标签的用途：当 prim 的唯一名称和层级路径不足以表达类别、状态、材质或选择意图时，可通过 semantic labels 建立额外的推理集合。</span><span class="en">While prims have a unique name and hierarchical identifier, it is sometimes useful to reason about the scene graph using a set of labels.</span></p>
      <p><span class="zh">继承段说明 direct 与 inherited 两层语义，且 labels 可以 accumulated。这个机制决定标签查询不能只看当前 prim 的 authored 属性，也要计算祖先标签。</span><span class="en">The labels create two tiers of semantics: direct and inherited labels.</span></p>
      <p><span class="zh">taxonomy 段说明 semantic labels 比 <code>kind</code> 更宽松：可多 instance、多值、无 registry、无顺序优先级。下游消费者需要约定 token list 的解释方式。</span><span class="en">There is no registry of taxonomies akin to kind in model hierarchy.</span></p>
      <p><span class="zh">time varying 段说明状态标签可随时间变化，interval 查询会合并区间内显式 time samples 和 start resolved value，状态转换可能产生冲突 labels。</span><span class="en">Queries over a range [Start, Stop] will merge time samples in the range with the resolved value for Start.</span></p>
      <p><span class="zh">过滤段说明 label queries 可以组合，典型例子是 direct label <code>wheel</code> 与 inherited label <code>car</code> 共同筛选。</span><span class="en">For workflows involving selection or filtering by label, queries can be combined.</span></p>
      <p><span class="zh">相邻域段说明 <code>Gprim</code>、<code>GeomSubset</code>、<code>Material</code>、shader nodes、node graphs 和 render product 的消费边界，避免把 material 标签误当成 geometry 标签。</span><span class="en">Relationship to Other Domains includes UsdGeom, UsdShade, and UsdRender.</span></p>
      <p><span class="zh">示例段指向 <code>extras/usd/examples/usdSemanticsExamples/bookshelf.usda</code>。它是本地阅读后的验证入口，可用于检查 labels 如何实际写入 layer。</span><span class="en">See extras/usd/examples/usdSemanticsExamples/bookshelf.usda for an example layer.</span></p>
    </section>

    <section data-cn-complete="round-483-usd-semantics-debugging">
      <h2>误读点与调试路径 / Misreads and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 semantic labels 当成 <code>kind</code>。<code>kind</code> 是 model hierarchy 的单值分类，semantic labels 可以多 taxonomy、多值，且不存在 kind 那样的 registry。</span><span class="en">Only a single kind value may be specified at each prim.</span></li>
        <li><span class="zh">不要把 label array 顺序当成层级或权重。源页明确说所有 labels 等权，顺序没有 implied hierarchy。</span><span class="en">There is no implied hierarchy in the order of the labels.</span></li>
        <li><span class="zh">不要默认 descendant 覆盖 parent。与 primvars 类似但不相同，labels 可以累计；如果过滤结果太宽，先检查 inherited labels 是否被纳入。</span><span class="en">Labels may be accumulated instead of strictly overridden.</span></li>
        <li><span class="zh">不要把 material 标签自动传播为 geometry 标签。authoring 阶段 <code>Gprim</code> 和 <code>Material</code> 的 scene graph 语义不同；渲染输出合并 labels 是另一个阶段。</span><span class="en">Materials should not be used for general labeling of geometry.</span></li>
        <li><span class="zh">如果 time interval 查询得到冲突状态，先缩小到 explicit time samples，再决定下游是否能 negotiate multiple states over an interval。</span><span class="en">Downstream consumers should negotiate multiple states over an interval or query explicit time samples.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-483-usd-semantics-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="usd_semantics_overview.html">UsdSemantics overview</a> -> <a href="usd_geom_page_front.html">UsdGeom</a> / <a href="usd_shade_page_front.html">UsdShade</a> / <a href="usd_render_page_front.html">UsdRender</a>。这个顺序让读者先理解 semantic labels 的核心语义，再进入几何、材质和渲染输出消费边界。</span><span class="en">Local click path keeps semantic labeling before domain-specific consumers.</span></p>
      <p><span class="zh">如果用户从渲染或数据集任务进入，建议反向阅读：先看 <code>UsdRender</code> 的 metadata/matte channels 边界，再回到本页确认 labels 如何继承、如何随时间变化、如何和 <code>GeomSubset</code> 或 <code>Material</code> 交互。本页保留显式官方外跳，但主路径使用本地 API/reading-flow 链接。</span><span class="en">Open official page remains the explicit external jump.</span></p>
    </section>

    <section data-cn-complete="round-483-usd-semantics-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>SOURCE_PLACEHOLDER</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：<code>UsdSemantics : Semantic Labeling of Scenes</code>、<code>SemanticsLabelsAPI:category</code>、<code>token[] semantics:labels:category</code>、<code>Inheritance and Comparison to Primvars</code>、<code>Taxonomy and Comparison to Model Hierarchy</code>、<code>Time Varying Considerations</code>、<code>Filtering and Selection by Label</code>、<code>Relationship to Other Domains</code>、<code>UsdGeom</code>、<code>GeomSubset</code>、<code>UsdShade</code>、<code>Material</code>、<code>UsdRender (To be proposed and implemented)</code>、<code>metadata</code>、<code>matte channels</code>。</span><span class="en">Official sections, code snippets, and domain names are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读继续保留总入口、API 入口、breadcrumb、side navigation 和 reading-flow。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-483-usd-semantics-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：<code>UsdSemantics</code> 用 labels 推理 scene graph；labels 有 direct/inherited 两层；taxonomy 不等同于 <code>kind</code>；labels 可以 time varying；selection/filtering 可以组合 direct 与 inherited labels；<code>Gprim</code>、<code>GeomSubset</code>、<code>Material</code>、shader/node graph 和 render product 的标签消费边界不同。</span><span class="en">A review-ready reader can explain semantic labels across inheritance, taxonomy, time, filtering, and domain boundaries.</span></p>
      <p><span class="zh">本页达标依据是：官方主要 section、核心代码片段、示例路径、相邻域边界、误读点、调试路径和本地点击顺序均已覆盖；API 名、schema 名、token、属性名、路径、数组值和链接语义保持原样。</span><span class="en">The completed page preserves schemas, tokens, examples, and link semantics.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="usd_geom_page_front.html">相邻：UsdGeom</a></p>
      <p><a href="usd_shade_page_front.html">相邻：UsdShade</a></p>
      <p><a href="usd_render_page_front.html">相邻：UsdRender</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`.replace("SOURCE_PLACEHOLDER", esc(SOURCE)));
}

function sourceParity(html) {
  const src = stripHtml(read(SOURCE));
  const outputText = stripHtml(html);
  const srcLower = src.toLowerCase();
  const outputLower = outputText.toLowerCase();
  const missingSourceKeywords = expectedKeywords.filter((keyword) => !srcLower.includes(keyword.toLowerCase()));
  const missingOutputKeywords = expectedKeywords.filter((keyword) => !outputLower.includes(keyword.toLowerCase()));
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source: SOURCE,
    official: OFFICIAL_URL,
    expected_keywords: expectedKeywords,
    missing_source_keywords: missingSourceKeywords,
    missing_output_keywords: missingOutputKeywords,
    output_checks: {
      bilingual_complete: html.includes('data-cn-status="bilingual_complete"') && html.includes("bilingual_complete"),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐/.test(html),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL),
      has_code_path:
        html.includes("SemanticsLabelsAPI:category") &&
        html.includes("token[] semantics:labels:category") &&
        html.includes("semantics:labels:state.timeSamples") &&
        html.includes("GeomSubset") &&
        html.includes("matte channels"),
      zh_chars: zhCharCount(html),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
  };
}

function checkReport(report) {
  report.passed =
    report.missing_source_keywords.length === 0 &&
    report.missing_output_keywords.length === 0 &&
    report.output_checks.bilingual_complete &&
    report.output_checks.no_draft_marker &&
    report.output_checks.has_main_reading_path &&
    report.output_checks.has_official_link &&
    report.output_checks.has_code_path &&
    report.output_checks.zh_chars >= 2400 &&
    report.output_checks.zh_blocks >= 28;
  return report;
}

function writePage() {
  const html = pageHtml();
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) throw new Error(`Source parity failed: ${JSON.stringify(report, null, 2)}`);
  write(TARGET, html);
  console.log(JSON.stringify(report, null, 2));
}

function precheck() {
  const html = read(TARGET);
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) throw new Error(`Precheck failed: ${JSON.stringify(report, null, 2)}`);
  console.log(JSON.stringify(report, null, 2));
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
  };
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "UsdSemantics : Semantic Labeling of Scenes",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdSemantics overview by adding Chinese main-reading-path coverage for semantic labels, direct/inherited labels, taxonomy and kind boundaries, time-varying intervals, filtering by label, UsdGeom/GeomSubset/UsdShade/UsdRender relationships, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2400,
      minimum_chinese_blocks: 28,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
      preserves: expectedKeywords,
    },
  });
  writeJson("reports/bilingual_completion_promotions.json", doc);
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const inventory = readJson("reports/all_pages_inventory.json");
  const counts = {
    total_pages: inventory.counts.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: debt.counts.review_ready_zh,
    api_complete: debt.counts.api_complete,
    api_review_ready_zh: debt.counts.api_review_ready_zh,
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 UsdSemantics source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: PROMOTION_COMMIT_PLACEHOLDER,
      previous_good_bilingual: PREVIOUS_GOOD_BILINGUAL,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 可检查草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-semantic-labeling-source-parity",
        severity: "P1",
        summary: "UsdSemantics 页面必须按官方 section 覆盖 labels、继承、taxonomy、time samples、filtering 和相邻域边界，不能压缩成一句标签简介。",
        evidence: "本轮覆盖 direct/inherited labels、kind 与 taxonomy 差异、time varying intervals、UsdGeom/GeomSubset/UsdShade/UsdRender 边界、metadata/matte channels 和 bookshelf.usda 示例。",
        required_action: "后续与语义、渲染输出或数据集标签相关页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 UsdSemantics -> UsdGeom/UsdShade/UsdRender 点击路径，并重跑 reading-flow 与 click-path 审计。",
        required_action: "若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无 repeated question mark damage、replacement character 和 UTF-8 BOM。",
        required_action: "若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。",
      },
    ],
    promoted_pages: [
      {
        round: ROUND,
        round_type: ROUND_TYPE,
        output: TARGET,
        official_url: OFFICIAL_URL,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
      },
    ],
    not_promoted_pages: [],
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "release 范围已 126/126 complete，不要重复处理 release 已完成页。",
      "下一轮重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的 API/class/struct 或高价值文档页；开始前必须确认 git/report/validation/markdown/reading-flow/click-path 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：基于 live reports 选择一个仍为 bilingual_draft 且有 source snapshot 的 API 高价值页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_483_usd_semantics_overview.mjs";
  const current = read(script);
  if (current.includes(PROMOTION_COMMIT_PLACEHOLDER)) {
    write(script, current.replaceAll(PROMOTION_COMMIT_PLACEHOLDER, sha));
  }
  const problem = readJson("reports/current_problem_audit.json");
  if (problem.last_completed_round) problem.last_completed_round.commit_sha = sha;
  writeJson("reports/current_problem_audit.json", problem);
}

const args = process.argv.slice(2);
const commands = new Set(args);
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
const stampArg = args.find((arg) => arg.startsWith("--stamp-commit="));
if (stampArg) stampCommit(stampArg.slice("--stamp-commit=".length));
if (commands.size === 0 && !stampArg) {
  console.log("Usage: node scripts/promote_round_483_usd_semantics_overview.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
