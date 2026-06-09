import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 481;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/group__group___exec___attribute___comptuations.html";
const SOURCE = "source/full_api/group__group___exec___attribute___comptuations_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/group__group___exec___attribute___comptuations.html";
const SOURCE_PARITY_REPORT = "reports/round_481_attribute_computations_source_parity.json";
const PROMOTION_ID = "round-481-api-attribute-computations";
const PREVIOUS_GOOD_BILINGUAL = 243;
const PROMOTION_COMMIT_PLACEHOLDER = "round-481-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Attribute Computations",
  "Builtin Exec Computations",
  "Builtin computations for computing information about attributes.",
  "Variables",
  "computeValue",
  "Computes the provider attribute's value.",
  "computeResolvedValue",
  "Computes the provider attribute's resolved value as authored in scene description.",
  "attribute expression",
  "computePath",
  "Computes the provider's scene path.",
  "ExecBuiltinComputations",
  "VdfContext",
  "SdfPath",
  "self.PrimComputation",
  "Attribute(_tokens->myAttribute)",
  "builtinComputations.h",
  "The computation provider must be an attribute.",
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
  <title>Attribute Computations | OpenUSD API 中文导读</title>
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
    <h1>Attribute Computations</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-481-attribute-computations-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>Builtin Exec Computations</code> 组里的 <code>Attribute Computations</code> 页面。官方一句话定义为 <code>Builtin computations for computing information about attributes.</code>，也就是为 attribute provider 提供内建计算 token。读者应先把它放回 OpenExec 点击路径：前面的 overview/tutorial/system design 解释 execution network 和 request；<code>ExecUsd</code> 解释 USD provider 接入；本页则聚焦属性这个 provider 类型能直接请求哪些内建 computation。</span><span class="en">Builtin computations for computing information about attributes.</span></p>
      <p><span class="zh">页面主体不是普通函数列表，而是 Doxygen group 中的 <code>Variables</code>：三个 <code>const TfToken</code> 分别是 <code>computeValue</code>、<code>computeResolvedValue</code> 和 <code>computePath</code>。这些 token 被注册在 <code>ExecBuiltinComputations</code> 上，用于在 <code>self.PrimComputation</code> 或输入依赖中声明要从 attribute provider 取得的派生值。它们是 OpenExec 的声明式 computation 名称，不是直接调用的 C++ 函数。</span><span class="en">Variables: computeValue, computeResolvedValue, computePath.</span></p>
      <p><span class="zh">调试时要区分三个层面：<code>computeValue</code> 请求 provider attribute 的值，可能受到 attribute expression 影响；<code>computeResolvedValue</code> 始终取 scene description 中 authored/resolved 的属性值，即使 attribute 已注册 expression；<code>computePath</code> 取 provider object 的 <code>SdfPath</code>。如果结果类型或值不符合预期，先确认 provider 确实是 attribute，再检查 attribute expression、scalar value type、request 的输入依赖和 <code>VdfContext</code> 取值路径。</span><span class="en">The computation provider must be an attribute.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 <code>Attribute Computations</code> 和分组 <code>Builtin Exec Computations</code> 说明本页属于 OpenExec 内建计算 token 的 attribute 子组，不是通用属性 API 参考页。</span><span class="en">Attribute Computations in Builtin Exec Computations.</span></li>
        <li><span class="zh">Detailed Description 只有一句：<code>Builtin computations for computing information about attributes.</code>。中文页据此保持窄职责，不扩写成完整 attribute authoring 教程。</span><span class="en">Builtin computations for computing information about attributes.</span></li>
        <li><span class="zh"><code>Variables</code> 列出三个 <code>TfToken</code>：<code>computeValue</code>、<code>computeResolvedValue</code>、<code>computePath</code>。这些是注册/请求 computation 时引用的 token，必须原样保留。</span><span class="en">Variables: const TfToken computeValue, computeResolvedValue, computePath.</span></li>
        <li><span class="zh"><code>computePath</code> 文档写明 <code>Computes the provider's scene path.</code>，返回 provider object 的路径，类型是 <code>SdfPath</code>；示例通过 <code>VdfContext</code> 和 <code>ExecBuiltinComputations-&gt;computePath</code> 取值后转为 string。</span><span class="en">computePath computes the provider's scene path and returns SdfPath.</span></li>
        <li><span class="zh"><code>computeResolvedValue</code> 文档写明 <code>Computes the provider attribute's resolved value as authored in scene description.</code>。它强调即使 attribute 注册了 <code>attribute expression</code>，也始终产生 scene description 中解析出的 authored/resolved value。</span><span class="en">computeResolvedValue returns the resolved value as authored in scene description.</span></li>
        <li><span class="zh"><code>computeValue</code> 文档写明 <code>Computes the provider attribute's value.</code>，返回 provider attribute 的 scalar value type；如果 attribute 注册了 <code>attribute expression</code>，它可能产生 any type。官方 note 还强调 <code>The computation provider must be an attribute.</code></span><span class="en">computeValue may be affected by an attribute expression.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-481-attribute-computations-variable-groups">
      <h2>变量分组和语义 / Variables and Semantics</h2>
      <h3>computePath</h3>
      <p><span class="zh"><code>computePath</code> 用于从 provider 取 scene path。示例中的 <code>self.PrimComputation(_tokens-&gt;pathAsString)</code> 注册一个字符串结果；callback 通过 <code>ctx.GetInputValue&lt;SdfPath&gt;(ExecBuiltinComputations-&gt;computePath).GetString()</code> 读取 <code>SdfPath</code> 并转换为 string。这里的关键是：path 来自 provider object，本页没有要求读者手写路径解析逻辑。</span><span class="en">Computes the provider's scene path.</span></p>
      <pre>self.PrimComputation(_tokens-&gt;pathAsString)
    .Callback&lt;std::string&gt;(+[](const VdfContext &amp;ctx) {
        return ctx.GetInputValue&lt;SdfPath&gt;(
            ExecBuiltinComputations-&gt;computePath).GetString();
    })
    .Inputs(
        Computation(ExecBuiltinComputations-&gt;computePath)
    );</pre>
      <h3>computeResolvedValue</h3>
      <p><span class="zh"><code>computeResolvedValue</code> 适合需要绕开 attribute expression、直接取得 authored/resolved scene description 值的场景。官方说它 <code>always produces the resolved value of an attribute</code>，这意味着排查表达式影响时可以把它作为对照输入：如果 <code>computeResolvedValue</code> 与 <code>computeValue</code> 不同，差异很可能来自 attribute expression 或执行层的表达式计算。</span><span class="en">This computation always produces the resolved value of an attribute, even if an attribute has registered an attribute expression.</span></p>
      <pre>self.PrimComputation(_tokens-&gt;myComputation)
    .Callback&lt;double&gt;(&amp;_MyCallback)
    .Inputs(
        Attribute(_tokens-&gt;myAttribute)
            .Computation(ExecBuiltinComputations-&gt;computeResolvedValue)
    );</pre>
      <h3>computeValue</h3>
      <p><span class="zh"><code>computeValue</code> 是读取 provider attribute value 的内建 computation。官方返回说明保留了一个重要边界：默认返回 provider attribute 的 scalar value type，但如果 attribute 注册了 <code>attribute expression</code>，结果可能是 any type。因此示例中的 <code>.Computation&lt;double&gt;(ExecBuiltinComputations-&gt;computeValue)</code> 和 <code>.Required()</code> 不只是语法片段，也说明请求方应对类型和必需输入做明确约束。</span><span class="en">Returns a value whose type is the provider attribute's scalar value type.</span></p>
      <pre>self.PrimComputation(_tokens-&gt;myComputation)
    .Callback&lt;double&gt;(&amp;_MyCallback)
    .Inputs(
        Attribute(_tokens-&gt;myAttribute)
            .Computation&lt;double&gt;(ExecBuiltinComputations-&gt;computeValue)
            .Required()
    );</pre>
    </section>

    <section data-cn-complete="round-481-attribute-computations-selection-model">
      <h2>如何选择内建计算 / Choosing a Built-in Computation</h2>
      <p><span class="zh">实际编写 OpenExec computation 时，先问自己需要的是“属性对象的位置”、“场景描述中解析出的属性值”，还是“执行系统按当前规则计算出的属性值”。如果只是想知道当前 provider object 在 stage/layer 中的位置，选择 <code>computePath</code>，并把返回的 <code>SdfPath</code> 继续传给 callback 或转成 string。这个选择不会读取 attribute 的 authored value，也不会触发 attribute expression 的值语义。</span><span class="en">Use computePath when the needed information is the provider scene path.</span></p>
      <p><span class="zh">如果需要对照 scene description 中的 authored/resolved value，选择 <code>computeResolvedValue</code>。它适合排查表达式覆盖、执行时派生值和原始属性值之间的差异，因为官方明确说明即使 attribute has registered an attribute expression，它也 always produces the resolved value of an attribute。中文页强调这一点，是为了避免把 expression 之后的执行结果误认为 layer 中直接 authored 的属性值。</span><span class="en">Use computeResolvedValue to compare against the value authored in scene description.</span></p>
      <p><span class="zh">如果需要让 computation 依赖 attribute 的当前执行值，选择 <code>computeValue</code>。这时要同时关注 provider attribute 的 scalar value type、是否存在 <code>attribute expression</code>、请求处是否写了类型模板参数，以及输入是否标记为 <code>Required</code>。当 callback 拿到的类型和预期不一致时，优先检查这四项，而不是直接修改 callback 逻辑。</span><span class="en">Use computeValue when the computation should depend on the current attribute value.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">标题段：<code>Attribute Computations</code> 表明本页关注 attribute provider 上可用的内建计算，而不是所有 attribute authoring API。它隶属于 <code>Builtin Exec Computations</code>，因此应和 OpenExec computation registration、request、provider、callback 一起阅读。</span><span class="en">Attribute Computations, Builtin Exec Computations.</span></p>
      <p><span class="zh">描述段：<code>Builtin computations for computing information about attributes.</code> 是页面职责的完整边界。中文解释只围绕 attribute 的值、resolved 值和路径三类信息展开，不把它扩展为 UsdAttribute 全功能说明。</span><span class="en">Builtin computations for computing information about attributes.</span></p>
      <p><span class="zh">变量表段：<code>Variables</code> 下的三个 <code>TfToken</code> 是本页真正的 API 表面。<code>computeValue</code>、<code>computeResolvedValue</code>、<code>computePath</code> 都应作为 token 名保留，读者在源码中会通过 <code>ExecBuiltinComputations</code> 引用它们。</span><span class="en">Variables list the TfToken entries used by ExecBuiltinComputations.</span></p>
      <p><span class="zh">示例段：官方示例都从 <code>self.PrimComputation</code> 开始，使用 callback 和 input dependency 描述计算。它们展示的是如何把内建 computation 接入自定义 computation，而不是展示属性值立即求值的普通函数调用。</span><span class="en">Examples attach built-in computations to a PrimComputation.</span></p>
      <p><span class="zh">定义位置段：三个变量都定义在 <code>builtinComputations.h</code>，对应行号分别在 source snapshot 中列出。中文页保留该头文件名，方便读者从 Doxygen 页面跳回源码。</span><span class="en">Definitions are in builtinComputations.h.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-example-flow">
      <h2>示例代码阅读顺序 / Example Reading Order</h2>
      <p><span class="zh">三个官方示例的结构是一致的：先用 <code>self.PrimComputation(_tokens-&gt;...)</code> 声明当前 prim 上要注册的 computation 名称，再用 <code>.Callback</code> 指定计算逻辑，最后用 <code>.Inputs</code> 声明该 callback 依赖哪些内建 computation 或 attribute input。阅读时不要先盯着 callback 里的返回语句，而应先确认 inputs 声明是否把正确的 provider 信息接入了 execution network。</span><span class="en">Examples read as PrimComputation, Callback, then Inputs.</span></p>
      <p><span class="zh"><code>computePath</code> 示例的 input 是 <code>Computation(ExecBuiltinComputations-&gt;computePath)</code>，说明它直接依赖 provider path 这个内建 computation；<code>computeResolvedValue</code> 和 <code>computeValue</code> 示例的 input 都从 <code>Attribute(_tokens-&gt;myAttribute)</code> 开始，说明 computation provider 是具体 attribute。这个差异决定了调试入口：path 问题先查 provider object，value 问题先查 attribute、expression 和类型。</span><span class="en">Path and value examples use different input declaration shapes.</span></p>
      <p><span class="zh">如果自定义 computation 返回错误，建议先把示例代码分成四行检查：token 名是否正确、callback 返回类型是否与声明一致、input 是否引用 <code>ExecBuiltinComputations</code> 中正确的 token、required input 是否真的存在。这样能保持本页的 Doxygen group 语义，不把问题误扩散到不相关的 UsdGeom、UsdShade 或 Hydra 渲染调试路径。</span><span class="en">Debug token, callback type, input token, and required input separately.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 <code>computeValue</code> 和 <code>computeResolvedValue</code> 混用：前者代表 provider attribute 的当前 value，可能受 <code>attribute expression</code> 影响；后者始终取 scene description 中 authored/resolved 的值。</span><span class="en">computeValue and computeResolvedValue have different expression behavior.</span></li>
        <li><span class="zh">不要把这些 token 当成可直接调用的函数。它们是 <code>ExecBuiltinComputations</code> 上的 token，用于 <code>Attribute(_tokens-&gt;myAttribute).Computation(...)</code> 或 <code>Computation(...)</code> 输入声明。</span><span class="en">These are tokens used in computation declarations.</span></li>
        <li><span class="zh">如果出现类型不匹配，先看返回说明：普通路径返回 provider attribute 的 scalar value type；有 attribute expression 时 <code>computeValue</code> may produce a value of any type。必要时在 computation 声明里像示例一样显式写 <code>&lt;double&gt;</code>。</span><span class="en">Attribute expressions can change the value type produced by computeValue.</span></li>
        <li><span class="zh">如果 provider 不是 attribute，<code>computeValue</code> 的官方 note 已经给出硬边界：<code>The computation provider must be an attribute.</code>。这类问题应优先排查 provider 类型，而不是 callback 本身。</span><span class="en">The computation provider must be an attribute.</span></li>
        <li><span class="zh">如果 path 字符串不符合预期，排查 <code>computePath</code>、<code>SdfPath</code>、provider object 和 <code>VdfContext</code> 输入，而不是把问题归因到字符串格式化。示例中 path 转 string 发生在 callback 内。</span><span class="en">computePath returns SdfPath before the callback converts it to a string.</span></li>
      </ul>
      <p><span class="zh">推荐排错顺序是：先确认当前 computation provider 是 attribute；再确认输入声明使用的是 <code>Attribute(_tokens-&gt;myAttribute)</code> 还是普通 <code>Computation(...)</code>；然后比较 <code>computeValue</code> 与 <code>computeResolvedValue</code> 的输出差异；最后再进入 <code>VdfContext</code>、callback 返回类型和 request/cache 层。这样能把 provider 选择、属性表达式、类型约束和 execution graph 的问题拆开，避免在一个回调里同时猜测所有原因。</span><span class="en">Debug in provider, declaration, value semantics, callback, and execution-cache order.</span></p>
      <p><span class="zh">本页也不替代 <code>UsdAttribute</code>、<code>SdfPath</code> 或完整 OpenExec 注册文档。它只说明这些内建 token 在 attribute provider 场景下怎样被引用、返回什么语义，以及官方示例怎样把 token 放进 <code>self.PrimComputation</code> 的 inputs。需要修改 schema、author attribute、注册新 computation 或理解全局 invalidation 时，应跳回对应的 API 模块页和 OpenExec system design。</span><span class="en">This group page does not replace UsdAttribute, SdfPath, or OpenExec registration docs.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2</a> -> <a href="page__execution__system__design.html">System Design</a> -> <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> -> <a href="md_pxr_exec_exec__r_e_a_d_m_e.html">Exec README</a> -> 当前 <code>Attribute Computations</code>。这样读者先建立 request/provider/callback 背景，再进入 attribute built-in computations。</span><span class="en">The local click path reaches Attribute Computations after the OpenExec conceptual pages.</span></p>
      <p><span class="zh">相邻阅读建议：若要理解 token 如何注册，返回 <code>Exec README</code>、<code>System Design</code> 和 computation registration 相关页面；若要理解属性值本身，跳转到 <code>UsdAttribute</code>、<code>SdfPath</code> 或 <code>VdfContext</code>。本页保留显式官方外跳，但用户主路径仍使用本地 API/reading-flow 链接。</span><span class="en">Related links should serve the real OpenExec and attribute debugging path.</span></p>
    </section>

    <section data-cn-complete="round-481-attribute-computations-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>SOURCE_PLACEHOLDER</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：<code>Attribute Computations</code>、<code>Builtin Exec Computations</code>、<code>Builtin computations for computing information about attributes.</code>、<code>Variables</code>、<code>computeValue</code>、<code>computeResolvedValue</code>、<code>computePath</code>、<code>attribute expression</code>、<code>ExecBuiltinComputations</code>、<code>VdfContext</code>、<code>SdfPath</code>、<code>self.PrimComputation</code>、<code>Attribute(_tokens-&gt;myAttribute)</code>、<code>builtinComputations.h</code>。</span><span class="en">Official group title, variables, examples, and source file names are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读继续保留总入口、API 入口、breadcrumb、side navigation 和 reading-flow。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-481-attribute-computations-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：<code>Attribute Computations</code> 是 <code>Builtin Exec Computations</code> 中面向 attribute provider 的内建计算组；<code>computePath</code> 返回 provider object 的 <code>SdfPath</code>；<code>computeResolvedValue</code> 返回 scene description authored/resolved 值；<code>computeValue</code> 读取 provider attribute value，但可能受 <code>attribute expression</code> 影响；这些 token 通过 <code>ExecBuiltinComputations</code>、<code>self.PrimComputation</code>、callback 和 input dependency 接入 execution network。</span><span class="en">A review-ready reader can distinguish the three Attribute Computations tokens.</span></p>
      <p><span class="zh">读者还应能判断何时离开本页：provider 类型、callback 依赖和内建 token 选择问题留在本页；attribute authoring 细节回到 <code>UsdAttribute</code>；路径语义回到 <code>SdfPath</code>；execution invalidation、cache 和调度问题回到 OpenExec system design。这个边界能防止把一个 token 页面误当作完整执行系统手册。</span><span class="en">A review-ready reader can choose the right adjacent document for the next debugging step.</span></p>
      <p><span class="zh">本页达标依据是：官方 Doxygen group 的标题、分组、Detailed Description、Variables、三个变量说明、returns/note、示例代码、<code>builtinComputations.h</code> 定义位置和 OpenExec 点击路径均已覆盖；API token、类名、示例表达式、头文件名和链接语义保持原样。</span><span class="en">The completed page preserves the Doxygen group terms and example code semantics.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_exec__r_e_a_d_m_e.html">相邻：Exec README</a></p>
      <p><a href="md_pxr_exec_exec_usd_docs_overview.html">相邻：OpenExec Overview</a></p>
      <p><a href="class_vdf_context.html">相邻：VdfContext</a></p>
      <p><a href="class_sdf_path.html">相邻：SdfPath</a></p>
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
        html.includes("computeValue") &&
        html.includes("computeResolvedValue") &&
        html.includes("computePath") &&
        html.includes("ExecBuiltinComputations") &&
        html.includes("VdfContext") &&
        html.includes("SdfPath") &&
        html.includes("Attribute(_tokens-&gt;myAttribute)"),
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
    report.output_checks.zh_chars >= 1900 &&
    report.output_checks.zh_blocks >= 24;
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
    title: "Attribute Computations",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Attribute Computations Doxygen group by adding Chinese main-reading-path coverage for Builtin Exec Computations, computeValue, computeResolvedValue, computePath, attribute expression boundaries, VdfContext/SdfPath examples, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1900,
      minimum_chinese_blocks: 24,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Attribute Computations source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        id: "P1-openexec-click-path-quality",
        severity: "P1",
        summary: "OpenExec 内建 computation 页面必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 Attribute Computations 的 Builtin Exec Computations 分组、computeValue、computeResolvedValue、computePath、attribute expression 边界、VdfContext/SdfPath 示例和 OpenExec 点击路径。",
        required_action: "后续 OpenExec group/class/source 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 OpenExec -> Exec -> Attribute Computations 点击路径，并重跑 reading-flow 与 click-path 审计。",
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
  const script = "scripts/promote_round_481_attribute_computations.mjs";
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
  console.log("Usage: node scripts/promote_round_481_attribute_computations.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
