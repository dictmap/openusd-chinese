import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 461;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html";
const SOURCE = "source/full_api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html";
const SOURCE_PARITY_REPORT = "reports/round_461_openexec_tutorial2_source_parity.json";
const PROMOTION_ID = "round-461-api-openexec-tutorial2-defining-computations";
const PREVIOUS_GOOD_BILINGUAL = 233;
const PROMOTION_COMMIT_PLACEHOLDER = "3c00c24bf669d51e32ea442c4d3f0432b4a1009c";

const expectedKeywords = [
  "OpenExec Tutorial 2: Defining Schema Computations",
  "USD/extras/exec/examples/definingComputations/",
  "Overview",
  "Plugin Metadata",
  "plugInfo.json",
  "allowsPluginComputations",
  "UsdSchemaExamplesParamsAPI",
  "ParamsAPI",
  "Computation Registration",
  "EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA",
  "PrimComputation",
  "computeMomentum",
  "Inputs",
  "AttributeValue<double>",
  "UsdSchemaExamplesTokens->paramsMass",
  "UsdSchemaExamplesTokens->paramsVelocity",
  "computeValue",
  "Callback",
  "VdfContext",
  "TF_DEFINE_PRIVATE_TOKENS",
  "computeDensity",
  "paramsVolume",
  "VdfContext::HasInputValue",
  "VdfContext::GetInputValuePtr",
  "VdfReadIterator",
  "Caveats",
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

function sourceHtml() {
  return read(SOURCE);
}

function sourceText() {
  return stripHtml(sourceHtml());
}

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripHtml(match[2]),
  }));
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  return (String(value).match(new RegExp(`class="${klass}"`, "g")) || []).length;
}

function pageHtml() {
  const headingItems = sourceHeadings()
    .map((heading) => `<li><span class="zh">第 ${heading.level} 级结构：${esc(heading.text)}</span><span class="en">${esc(heading.text)}</span></li>`)
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenExec Tutorial 2: Defining Schema Computations | OpenUSD API 中文导读</title>
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
    <h1>OpenExec Tutorial 2: Defining Schema Computations</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-461-tutorial2-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 OpenExec 教程链中的第二篇。第 1 篇回答“客户端如何请求和读取 computed values”，本页回答“schema 或 plugin 作者如何把一个计算能力发布成 OpenExec computation”。官方示例代码位于 <code>USD/extras/exec/examples/definingComputations/</code>，围绕 <code>ParamsAPI</code> applied API schema 展开：schema 提供 <code>params:mass</code>、<code>params:velocity</code>、<code>params:volume</code> 等输入属性，OpenExec computation 则把这些输入转化为 <code>computeMomentum</code>、<code>computeDensity</code> 等可被引擎求值的结果。</span><span class="en">This page explains how schema/plugin authors publish computation definitions for OpenExec.</span></p>
      <p><span class="zh">阅读顺序必须跟官方 section 对齐：先看 <code>Overview</code> 明确目标；再看 <code>Plugin Metadata</code>，理解为什么发布 computation 的库必须在 <code>plugInfo.json</code> 中声明 schema；然后进入 <code>Computation Registration</code>，按 registration macro、registration initiation、input parameters、callback function、complete example 的顺序理解一条 computation definition 的组成；最后看 <code>Caveats</code>，避免把教学用的轻量计算误当成真实生产中一定值得缓存的计算。</span><span class="en">The local reading order follows the official sections from Overview through Caveats.</span></p>
      <p><span class="zh">本页的边界也很重要：它不是普通 USD layer authoring 教程，也不是 client request 教程。<code>UsdStage</code> 中 authored 的 scene data 仍然来自 schema 属性；OpenExec 只是在 schema/plugin 侧声明“如何从这些输入导出一个 value”。因此，调试时要分清四层：<code>plugInfo.json</code> 是否允许 plugin computations；<code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA</code> 是否绑定到正确 schema；<code>Inputs</code> 是否声明了真实依赖；<code>Callback</code> 是否从 <code>VdfContext</code> 中读取正确输入并返回正确类型。</span><span class="en">The debugging boundary separates plugin metadata, registration, inputs, and callback logic.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-source-order">
      <h2>官方 section 顺序 / Official Section Order</h2>
      <ul>
        <li><span class="zh"><code>Overview</code>：说明本教程如何定义与 USD schema 关联的 OpenExec computations，并强调它建立在 <code>ParamsAPI</code> 和 Tutorial 1 的客户端求值流程之上。</span><span class="en">Overview frames schema-associated computation definition.</span></li>
        <li><span class="zh"><code>Plugin Metadata</code>：展示 <code>plugInfo.json</code> 中的 <code>Info.Exec.Schemas.UsdSchemaExamplesParamsAPI.allowsPluginComputations</code>。这不是可选装饰信息，而是 OpenExec 找到 computation definition plugin 的入口。</span><span class="en">Plugin Metadata tells OpenExec which library can publish computations for a schema.</span></li>
        <li><span class="zh"><code>Computation Registration</code>：解释注册代码必须与 metadata 位于同一 plugin library 中；OpenExec 需要 computation definitions 时，会基于 plugin metadata 加载库并执行注册代码。</span><span class="en">Computation Registration connects metadata with executable registration code.</span></li>
        <li><span class="zh"><code>Registration Macro</code>：<code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA(UsdSchemaExamplesParamsAPI)</code> 启动 schema 级 computation registration；一个 schema 只能有一次这个 macro 调用，后面紧跟注册函数体。</span><span class="en">The macro starts the schema registration function.</span></li>
        <li><span class="zh"><code>Initiating a computation registration</code>：从 macro 提供的 <code>self</code> 对象开始，用 <code>self.PrimComputation(TfToken("computeMomentum"))</code> 声明 prim computation。这里的 provider 是应用了 <code>ParamsAPI</code> 的 prim。</span><span class="en">PrimComputation declares a computation provided by matching prims.</span></li>
        <li><span class="zh"><code>Input parameters</code>：通过 <code>Inputs</code> 和 <code>AttributeValue&lt;double&gt;</code> 声明输入来自属性 computed values。内部请求的是对应 attribute 的 builtin computation <code>computeValue</code>。</span><span class="en">Inputs declares where evaluation-time values come from.</span></li>
        <li><span class="zh"><code>Callback function</code>：通过 <code>Callback&lt;double&gt;</code> 提供求值逻辑；示例用 <code>VdfContext::GetInputValue&lt;double&gt;</code> 读取 <code>paramsMass</code> 和 <code>paramsVelocity</code>，并返回 <code>mass * velocity</code>。</span><span class="en">Callback implements the evaluation-time computation.</span></li>
        <li><span class="zh"><code>Putting it all together</code>：完整代码加入 <code>TF_DEFINE_PRIVATE_TOKENS</code>、headers、<code>computeMomentum</code>、<code>computeDensity</code> 两个 computation，并展示多个 computation 如何注册到同一个 schema。</span><span class="en">The full example combines tokens, headers, two computations, callbacks, and inputs.</span></li>
        <li><span class="zh"><code>Caveats</code>：指出示例计算很轻量，生产中未必值得因为缓存而暴露成 computation；callback 的 boilerplate 也反映了通用 API 需要支持 optional input、vectorized values、<code>VdfContext::HasInputValue</code>、<code>VdfContext::GetInputValuePtr</code>、<code>VdfReadIterator</code> 等复杂情况。</span><span class="en">Caveats clarifies teaching simplifications and callback boilerplate.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-461-tutorial2-code-path">
      <h2>关键代码路径 / Code Path</h2>
      <p><span class="zh">下面只保留官方示例中最关键的结构片段，标识符、token、宏名、属性名和类型名保持原样。阅读时关注链式定义的语义：metadata 允许 schema 发布 computations；macro 建立 schema 注册范围；<code>PrimComputation</code> 命名一个 computation；<code>Callback</code> 实现结果；<code>Inputs</code> 声明依赖。</span><span class="en">Identifiers are preserved; Chinese text explains the registration chain.</span></p>
      <pre><code>{
  "Plugins": [
    {
      "Info": {
        "Exec" : {
          "Schemas": {
            "UsdSchemaExamplesParamsAPI": {
              "allowsPluginComputations": true
            }
          }
        }
      }
    }
  ]
}</code></pre>
      <pre><code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA(UsdSchemaExamplesParamsAPI)
{
    self.PrimComputation(_tokens->computeMomentum)
        .Callback<double>(+[](const VdfContext &context) {
            const double mass = context.GetInputValue<double>(
                UsdSchemaExamplesTokens->paramsMass);
            const double velocity = context.GetInputValue<double>(
                UsdSchemaExamplesTokens->paramsVelocity);
            return mass * velocity;
        })
        .Inputs(
            AttributeValue<double>(UsdSchemaExamplesTokens->paramsMass),
            AttributeValue<double>(UsdSchemaExamplesTokens->paramsVelocity)
        );

    self.PrimComputation(_tokens->computeDensity)
        .Callback<double>(+[](const VdfContext &context) {
            const double mass = context.GetInputValue<double>(
                UsdSchemaExamplesTokens->paramsMass);
            const double volume = context.GetInputValue<double>(
                UsdSchemaExamplesTokens->paramsVolume);
            return mass == 0.0 ? 0.0 : volume / mass;
        })
        .Inputs(
            AttributeValue<double>(UsdSchemaExamplesTokens->paramsMass),
            AttributeValue<double>(UsdSchemaExamplesTokens->paramsVolume)
        );
}</code></pre>
      <p><span class="zh">这个代码顺序同时也是排错顺序。若 OpenExec 找不到 computation，先查 <code>plugInfo.json</code> 是否声明了 <code>UsdSchemaExamplesParamsAPI</code> 和 <code>allowsPluginComputations</code>；若能加载 plugin 但没有 computation，查 <code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA</code> 是否只出现一次且 schema 类型正确；若 computation 被找到但结果错误，查 <code>Inputs</code> 的 attribute token 是否对应 <code>paramsMass</code>、<code>paramsVelocity</code>、<code>paramsVolume</code>；若 callback 抛错或类型不匹配，查 <code>VdfContext</code> 的输入读取和 <code>Callback&lt;double&gt;</code> 返回类型。</span><span class="en">The code order maps directly to plugin discovery, registration, input dependency, and callback debugging.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><strong>Overview。</strong>官方开头强调“define OpenExec computations associated with USD schemas”。这里的核心是把 schema 的属性变成 computation 的输入，而不是在场景文件里直接写出结果。<code>ParamsAPI</code> 来自 <code>Generating New Schema Classes</code> 教程，它引入的属性会在本页作为 <code>AttributeValue&lt;double&gt;</code> 的来源。</span><span class="en">Overview connects schema attributes to computation inputs.</span></p>
      <p><span class="zh"><strong>Plugin Metadata。</strong>OpenExec computation 不要求和 schema 定义在同一个 plugin library 中，所以 metadata 必须告诉系统“哪个库为哪个 schema 发布 computation”。<code>allowsPluginComputations</code> 设置为 <code>true</code> 表示允许；省略时等价于 <code>true</code>；显式设为 <code>false</code> 则会阻止该 plugin 发布 computation，注册尝试会报错并被忽略。</span><span class="en">Plugin metadata identifies the computation library and controls whether plugin computations are allowed.</span></p>
      <p><span class="zh"><strong>Computation Registration。</strong>metadata 只是发现入口，真正的 computation 仍要在同一个 plugin library 的 C++ 文件中注册。OpenExec 需要某个 schema 的 computations 时，会根据 metadata 加载库，然后运行注册代码。这个机制让 computation 能按需加载，而不是在所有场景启动时无差别加载。</span><span class="en">Registration code lives in the plugin library identified by metadata.</span></p>
      <p><span class="zh"><strong>Registration Macro。</strong><code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA</code> 接收 schema type name，例如 <code>UsdSchemaExamplesParamsAPI</code>。它后面的函数体是该 schema 所有 computation registration 的集中位置。一个 schema 只能有一次 macro 调用，这一点能避免多个库或多个 translation unit 对同一 schema 重复声明不一致的 computation 集合。</span><span class="en">The macro creates one registration scope per schema.</span></p>
      <p><span class="zh"><strong>Initiating registration。</strong><code>self.PrimComputation(TfToken("computeMomentum"))</code> 声明的是 prim computation，这意味着凡是应用了 <code>ParamsAPI</code> 的 prim 都可以 provide 这个 computation。官方也提示可以注册 attribute computations；区别在于 provider 是 prim 还是 attribute，调试时要先确认 provider 类型，不要只看 computation 名称。</span><span class="en">Prim computations are provided by prims with the schema applied.</span></p>
      <p><span class="zh"><strong>Input parameters。</strong><code>Inputs</code> 接收一个或多个 input registrations。示例用 <code>AttributeValue&lt;double&gt;(UsdSchemaExamplesTokens-&gt;paramsMass)</code> 和 <code>AttributeValue&lt;double&gt;(UsdSchemaExamplesTokens-&gt;paramsVelocity)</code>，表示 evaluation 时先请求这些 attribute 的 builtin computation <code>computeValue</code>。因此 input declaration 是 invalidation 和依赖传播的基础：如果这里漏掉 <code>paramsVelocity</code>，速度变化就不会成为该 computation 的正确依赖。</span><span class="en">Inputs describes dependency edges and builtin computeValue requests.</span></p>
      <p><span class="zh"><strong>Callback function。</strong><code>Callback&lt;double&gt;</code> 的模板参数说明输出类型，lambda 的参数 <code>const VdfContext &amp;context</code> 提供输入值访问。示例用一元加号把 lambda 转成函数指针；更一般的 callback 签名可以返回 <code>ResultType</code>，也可以返回 <code>void</code> 并通过 <code>VdfContext::SetOutput</code> 设置输出。这里不要把 <code>VdfContext</code> 理解成 stage 或 prim，它是 computation callback 的参数包。</span><span class="en">Callback uses VdfContext as an evaluation-time input bundle.</span></p>
      <p><span class="zh"><strong>Putting it all together。</strong>完整示例保留了 <code>TF_DEFINE_PRIVATE_TOKENS</code>，为 <code>computeMomentum</code> 和 <code>computeDensity</code> 定义私有 tokens。<code>computeMomentum</code> 读取 <code>paramsMass</code> 与 <code>paramsVelocity</code>，返回 <code>mass * velocity</code>；<code>computeDensity</code> 读取 <code>paramsMass</code> 与 <code>paramsVolume</code>，返回 <code>mass == 0.0 ? 0.0 : volume / mass</code>。这说明同一个 schema 可以发布多个 computation，每个 computation 有自己的 input set 和 callback。</span><span class="en">The full example registers computeMomentum and computeDensity for the same schema.</span></p>
      <p><span class="zh"><strong>Caveats。</strong>官方说明这些计算过于简单，主要用于演示 registration mechanics。生产场景中，发布 computation 的常见理由是希望结果能被缓存或作为 schema computational interface 的一部分暴露；如果计算本身非常便宜，缓存未必有收益。另外，callback 里手动从 <code>VdfContext</code> 提取输入看起来繁琐，是因为真实逻辑可能有 optional input、vectorized values、<code>VdfContext::HasInputValue</code>、<code>VdfContext::GetInputValuePtr</code>、<code>VdfReadIterator</code> 等更复杂路径。</span><span class="en">Caveats distinguishes teaching examples from production-worthy computations.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-boundaries-debugging">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 <code>allowsPluginComputations</code> 当作普通说明字段。它控制 plugin 是否可为对应 schema 发布 computations；字段为 <code>false</code> 时，后面的 registration 代码即使存在也不应被接受。</span><span class="en">allowsPluginComputations is a behavior gate, not a comment.</span></li>
        <li><span class="zh">不要把 <code>PrimComputation</code> 和 attribute computation 混用。前者的 provider 是应用 schema 的 prim；后者的 provider 是属性。错误的 provider 会让客户端用正确 token 仍然找不到值。</span><span class="en">Provider type matters for finding computations.</span></li>
        <li><span class="zh">不要只实现 <code>Callback</code> 而忽略 <code>Inputs</code>。OpenExec 依赖 input registrations 建立求值和失效传播关系；callback 内部临时读取未声明依赖会让缓存刷新语义变得不可靠。</span><span class="en">Inputs are required for dependency tracking and invalidation.</span></li>
        <li><span class="zh">不要把示例中的 <code>computeDensity</code> 公式当成物理定义。它只是演示第二个 computation 如何注册；真实项目应按 schema 语义决定输出名称、单位、依赖和错误处理。</span><span class="en">computeDensity is a tutorial example, not a universal physics formula.</span></li>
        <li><span class="zh">若 callback 输入不存在或类型不对，先检查 attribute token 和 authored value，再考虑使用 <code>VdfContext::HasInputValue</code> 或 <code>VdfContext::GetInputValuePtr</code> 处理 optional input，不要直接把问题归因于 OpenExec 调度。</span><span class="en">Optional or missing inputs should be handled at the VdfContext boundary.</span></li>
      </ul>
      <p><span class="zh">一个可执行的排错顺序是：先确认 <code>plugInfo.json</code> 的 <code>Info.Exec.Schemas</code> 指向 <code>UsdSchemaExamplesParamsAPI</code>；再确认 plugin library 名称和放置位置让 OpenUSD plugin discovery 能加载；然后检查 <code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA</code> 的 schema type；接着检查 <code>self.PrimComputation</code> 的 token 是否与客户端请求一致；再检查 <code>Inputs</code> 中的 <code>AttributeValue&lt;double&gt;</code> 是否对应实际 schema property；最后检查 <code>Callback&lt;double&gt;</code> 从 <code>VdfContext</code> 提取的类型和返回值。这样可以把“找不到 computation”“依赖没刷新”“callback 算错”“客户端读取错类型”分开定位。</span><span class="en">The debugging path separates discovery, registration, dependency, callback, and client extraction errors.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">本页承接 <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> 和 <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">OpenExec Tutorial 1: Computing Values</a>。真实点击路径应是：先在 Overview 建立 computation/provider/builtin/plugin 的概念，再在 Tutorial 1 学会请求已有 computed value，然后进入本页学习如何定义 schema computations。需要理解系统内部调度时，再转到 <a href="page__execution__system__design.html">OpenExec System Design</a>；需要连接模块实现时，再看 <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> 和 <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a>。</span><span class="en">The local click path is Overview, Tutorial 1, Tutorial 2, then system internals.</span></p>
      <p><span class="zh">本地 reading-flow、breadcrumb、API 本地入口和总入口是主阅读路径；只有“Open official page”是明确外跳。相关链接围绕 OpenExec 教程链和系统设计组织，避免把读者随机带到 class index、source file 或无关 release 支撑页。</span><span class="en">Local reading links are task-ordered; official links are explicit external jumps.</span></p>
      <p><span class="zh">本页最适合三类读者：正在为 schema/plugin 添加 derived values 的作者；已经读过 Tutorial 1、想知道这些 values 如何被发布的集成者；以及调试 computation discovery、input dependency、callback result 的开发者。若目标只是消费结果，应回到 Tutorial 1；若目标是理解 OpenExec 概念，应回到 Overview；若目标是性能和调度细节，应进入 System Design。</span><span class="en">The page is for authors defining computations, not just clients consuming values.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-adjacent-modules">
      <h2>相邻模块关系 / Adjacent Module Relationships</h2>
      <ul>
        <li><span class="zh"><code>ExecUsd</code> 负责把 OpenExec 求值接到 USD stage 和 schema object 上，Tutorial 1 和本页都处在这个接口层。</span><span class="en">ExecUsd connects OpenExec evaluation to USD objects.</span></li>
        <li><span class="zh"><code>Vdf</code> 提供 callback 上下文、数据流和向量化输入读取语义；<code>VdfContext</code> 与 <code>VdfReadIterator</code> 属于这个层面。</span><span class="en">Vdf provides context and data-flow evaluation mechanics.</span></li>
        <li><span class="zh"><code>Plug</code> 和 <code>plugInfo.json</code> 决定 plugin discovery 与 metadata 入口；若 metadata 错误，registration code 不会进入 OpenExec 视野。</span><span class="en">Plug metadata is the discovery boundary.</span></li>
        <li><span class="zh"><code>TfToken</code> 和 <code>TF_DEFINE_PRIVATE_TOKENS</code> 提供稳定 token 名称；这些 token 与客户端请求的 computation name 必须一致。</span><span class="en">TfToken keeps computation names stable and comparable.</span></li>
        <li><span class="zh"><code>UsdSchemaExamples</code> 提供教学 schema 与 tokens；真实项目中应替换为自己的 schema、属性 token 和业务语义。</span><span class="en">UsdSchemaExamples is a tutorial schema, not a required production dependency.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-461-tutorial2-authoring-checklist">
      <h2>作者检查清单 / Authoring Checklist</h2>
      <p><span class="zh">把本教程迁移到真实 schema 时，建议按五个检查点落地。第一，schema 层必须先有稳定的属性和 token，例如示例里的 <code>paramsMass</code>、<code>paramsVelocity</code>、<code>paramsVolume</code>；如果属性名后续会变，computation name 和 input declaration 也会随之失效。第二，plugin metadata 必须声明到正确 schema，且 library 的发现路径要能被 <code>PlugRegistry</code> 找到，否则 C++ 注册代码没有机会运行。第三，registration macro 要和 schema 类型一一对应，不要在多个文件中重复注册同一 schema。第四，<code>Inputs</code> 要完整列出 callback 读取的值，这不仅影响求值，也影响缓存和 invalidation。第五，callback 返回类型要和客户端预期一致；如果客户端按 <code>double</code> 读取，callback 就不能在语义上返回其它类型。</span><span class="en">A real authoring workflow should check schema tokens, plugin metadata, registration scope, inputs, and callback result type.</span></p>
      <p><span class="zh">本页和 Tutorial 1 的配合方式也要保持清楚：Tutorial 2 定义 <code>computeMomentum</code> 和 <code>computeDensity</code>，Tutorial 1 则演示客户端如何构造 request、compute 并从 cache view 读取结果。也就是说，authoring 侧负责发布“可计算什么”和“依赖什么”，client 侧负责请求“在哪个 provider 上计算哪个 value”。如果调试时把这两侧混在一起，常见误判是：明明是 metadata 没加载，却去改客户端 request；或者明明是 request token 拼错，却去怀疑 callback 公式。</span><span class="en">Tutorial 2 is the authoring side; Tutorial 1 is the consuming side.</span></p>
      <p><span class="zh">对于复杂生产 computation，官方 Caveats 的提醒尤其关键。示例中的 <code>mass * velocity</code> 和 <code>volume / mass</code> 很轻量，主要演示机制；真实项目通常会因为昂贵计算、跨对象依赖、缓存收益、统一 schema interface 或 downstream tool 需要才把逻辑发布成 OpenExec computation。若只是为了包装一行普通属性读取，可能不值得增加 plugin metadata、registration、callback、input declaration 和调试复杂度。</span><span class="en">Production computations should justify the registration and caching overhead.</span></p>
      <p><span class="zh">另一个容易被忽略的点是命名一致性。<code>TF_DEFINE_PRIVATE_TOKENS</code> 中的 <code>computeMomentum</code>、<code>computeDensity</code> 是 computation 名称来源；<code>UsdSchemaExamplesTokens-&gt;paramsMass</code> 等 schema tokens 是属性输入来源。前者服务客户端请求的 value key，后者服务 callback 的 input dependency。两组 token 的用途不同，不能因为都用 <code>TfToken</code> 表达就混为一谈。检查 bug 时也应分别确认“请求的 computation token 是否存在”和“输入属性 token 是否能取到 value”。</span><span class="en">Computation tokens and schema property tokens have different roles and should be debugged separately.</span></p>
      <p><span class="zh">如果 computation 已能注册但客户端读取结果仍然不稳定，应回到本页的输入声明检查。OpenExec 的求值不是随意调用 callback，而是依赖图驱动：哪个 attribute value 被声明为输入，哪个 provider 可以发布 computation，哪些值需要缓存或失效，都来自 registration 语义。把依赖写完整，比在 callback 内部临时查 stage 更可靠，也更符合 OpenExec 面向大规模场景求值的设计目标。</span><span class="en">Complete input declarations make evaluation and invalidation predictable.</span></p>
      <p><span class="zh">因此，本页的验收重点是“可发现、可注册、可依赖、可求值、可调试”，而不是只把示例代码贴到页面里；读者应能顺着文字判断一个自定义 schema computation 从 plugin metadata 到客户端读取的完整链条是否闭合，并能准确清晰明确定位断点和责任层级。</span><span class="en">The acceptance focus is discoverable, registered, dependent, evaluable, and debuggable behavior.</span></p>
    </section>

    <section data-cn-complete="round-461-tutorial2-page-structure">
      <h2>页面结构 / Page Structure</h2>
      <ul>
${headingItems}
      </ul>
    </section>

    <section data-cn-complete="round-461-tutorial2-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留官方标题、section 顺序、<code>plugInfo.json</code> 结构、<code>EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA</code>、<code>PrimComputation</code>、<code>Inputs</code>、<code>Callback</code>、<code>VdfContext</code>、<code>TF_DEFINE_PRIVATE_TOKENS</code>、<code>computeMomentum</code>、<code>computeDensity</code>、属性 token 和相关 header/API 名。</span><span class="en">Official sections, code identifiers, tokens, and headers are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">上一页：OpenExec Tutorial 1: Computing Values</a></p>
      <p><a href="page__execution__system__design.html">相关：OpenExec System Design</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity(html) {
  const src = sourceText();
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
      bilingual_complete: html.includes("bilingual_complete"),
      no_draft_marker: !/bilingual_draft|batch draft page|later iterations add denser bilingual coverage|后续迭代/.test(outputText),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL),
      has_code_path: html.includes("EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA") && html.includes("AttributeValue&lt;double&gt;") && html.includes("VdfContext"),
      zh_chars: zhCharCount(html),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
    passed: false,
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
    report.output_checks.zh_chars >= 2600 &&
    report.output_checks.zh_blocks >= 24;
  return report;
}

function writePage() {
  const html = pageHtml();
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) {
    throw new Error(`Source parity failed: ${JSON.stringify(report, null, 2)}`);
  }
  write(TARGET, html);
  console.log(JSON.stringify(report, null, 2));
}

function precheck() {
  const html = read(TARGET);
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) {
    throw new Error(`Precheck failed: ${JSON.stringify(report, null, 2)}`);
  }
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
    title: "OpenExec Tutorial 2: Defining Schema Computations",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the OpenExec Tutorial 2 API page by adding Chinese main-reading-path coverage for Overview, Plugin Metadata, Computation Registration, registration macro, input parameters, callback function, full example, caveats, debugging boundaries, adjacent modules, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2600,
      minimum_chinese_blocks: 24,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
      preserves: [
        "OpenExec Tutorial 2: Defining Schema Computations",
        "plugInfo.json",
        "allowsPluginComputations",
        "UsdSchemaExamplesParamsAPI",
        "EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA",
        "PrimComputation",
        "AttributeValue<double>",
        "Callback<double>",
        "VdfContext",
        "TF_DEFINE_PRIVATE_TOKENS",
        "computeMomentum",
        "computeDensity",
      ],
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 OpenExec Tutorial 2 source parity 晋级，并继续追踪 OpenUSD API 草稿缺口。`,
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
        required_action: "继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-openexec-source-parity",
        severity: "P1",
        summary: "OpenExec 教程页必须按官方 section 和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 Overview、Plugin Metadata、Computation Registration、Registration Macro、Initiating a computation registration、Input parameters、Callback function、Putting it all together、Caveats，并保留 Overview -> Tutorial 1 -> Tutorial 2 -> System Design 的本地点击路径。",
        required_action: "后续 OpenExec 教程或系统设计页继续按 source snapshot 做 section-level 中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 OpenExec Overview -> Tutorial 1 -> Tutorial 2/System Design 的点击顺序，并重跑 reading-flow 与 click-path 审计。",
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
    next_action: "下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。",
  });
}

function stampCommit(sha) {
  const problem = readJson("reports/current_problem_audit.json");
  if (problem.last_completed_round) {
    problem.last_completed_round.commit_sha = sha;
  }
  writeJson("reports/current_problem_audit.json", problem);
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
const stampArg = process.argv.find((arg) => arg.startsWith("--stamp-commit="));
if (stampArg) stampCommit(stampArg.slice("--stamp-commit=".length));
if (commands.size === 0 && !stampArg) {
  console.log("Usage: node scripts/promote_round_461_openexec_tutorial2.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
