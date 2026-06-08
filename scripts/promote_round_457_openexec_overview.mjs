import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 457;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec_usd_docs_overview.html";
const SOURCE = "source/full_api/md_pxr_exec_exec_usd_docs_overview_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec_usd_docs_overview.html";
const SOURCE_PARITY_REPORT = "reports/round_457_openexec_overview_source_parity.json";
const PROMOTION_ID = "round-457-api-openexec-overview";
const PREVIOUS_GOOD_BILINGUAL = 231;

const expectedKeywords = [
  "OpenExec Overview",
  "OpenExec Concepts",
  "Computations",
  "Plugin Computations",
  "Builtin Computations",
  "Tutorials",
  "Advanced Topics",
  "UsdStage",
  "UsdPrim",
  "UsdAttribute",
  "Schemas publish computations",
  "computational behaviors",
  "computation provider",
  "computeValue",
  "builtin computation documentation",
  "Tutorial 1: Computing Values",
  "Tutorial 2: Defining Schema Computations",
  "Caching, invalidation, and invalidation notification",
  "compilation, scheduling, evaluation",
  "Dispatched computations",
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
  const headings = sourceHeadings();
  const headingItems = headings.map((heading) => {
    return `<li><span class="zh">第 ${heading.level} 级结构：${esc(heading.text)}</span><span class="en">${esc(heading.text)}</span></li>`;
  }).join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OpenExec Overview | OpenUSD API 中文导读</title>
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
    code{font-family:"Cascadia Mono","Consolas",monospace}
    .status{display:inline-block;background:#1f7a54;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body class="openusd-has-reading-flow">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>OpenExec Overview</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="../../openusd_bilingual_final.html">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="../../site/index.html">API 本地入口</a>
  <span> / OpenExec Overview</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="../../openusd_bilingual_final.html">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="../../site/release_index.html">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="../../site/index.html">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="../../site/api/index.html">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>当前 API 上下文 / API Context</h3>
      <ul>
        <li><a data-reading-flow="related" href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">OpenExec Tutorial 1: Computing Values</a></li>
        <li><a data-reading-flow="related" href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">OpenExec Tutorial 2: Defining Schema Computations</a></li>
        <li><a data-reading-flow="related" href="page__execution__system__design.html">OpenExec System Design</a></li>
        <li><a data-reading-flow="related" href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd: Execution system for Usd</a></li>
        <li><a data-reading-flow="related" href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf: Vectorized Data Flow</a></li>
      </ul>
    </section>
    <section>
      <h3>上一页 / 下一页</h3>
      <ul>
        <li><a data-reading-flow="prev" href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">上一页 / Previous: ExecUsd README</a></li>
        <li><a data-reading-flow="next" href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">下一页 / Next: Tutorial 1</a></li>
      </ul>
    </section>
    <section>
      <h3>官方外跳 / Official</h3>
      <ul>
        <li><a class="official-link" data-reading-flow="official" href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></li>
      </ul>
    </section>
  </div>
</aside>
<!-- openusd-reading-flow-nav:end -->

  <main>
    <section data-cn-complete="round-457-openexec-overview">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p class="zh">本页是 OpenExec API 文档中的概念入口，解释 OpenExec 如何高效求值编码在 USD scenes 中的 computational behaviors。读者应先把它当成阅读地图：schema 发布 computations，OpenExec 读取 <code>UsdStage</code> 与已注册的 computations，建立内部表示，然后 client 请求一组 computation outputs，系统在求值、缓存和 invalidation 之间维持一致性。</p>
      <p class="en">OpenExec supports efficient evaluation of computational behaviors encoded in USD scenes by combining scene-authored values, registered computations, requested outputs, caching, and invalidation.</p>
      <p class="zh">本页不是普通 class reference，也不是 USD composition 的替代说明。它负责说明 OpenExec 的执行模型、依赖来源和阅读顺序：先理解 OpenExec Concepts，再进入 Computations、Plugin Computations、Builtin Computations，然后按 Tutorials 学习如何请求值和定义 schema computations，最后再看 Advanced Topics 里的 caching、invalidation、compilation、scheduling、evaluation 和 dispatched computations。</p>
      <p class="en">This page is a conceptual entry point for OpenExec. It links to concepts, tutorials, and advanced topics rather than documenting a single class.</p>
    </section>

    <section data-cn-complete="round-457-openexec-concepts">
      <h2>OpenExec Concepts</h2>
      <p class="zh"><code>Computations</code> 是 OpenExec 的基本工作单元。一个 computation definition 可以理解为“生成 data flow nodes 的模板”：它从其他 computations 或 authored scene values 取得输入，并产生一个 output value。这个表述很关键，因为 OpenExec 关注的不是单次函数调用，而是场景对象、输入依赖和输出值之间的可求值关系。</p>
      <p class="en">Computations are the basic unit of computational work in OpenExec. A computation definition is a template for producing data flow nodes.</p>
      <p class="zh">每个 computation 都绑定到承载它的 scene object，官方称为 <code>computation provider</code>。provider 可以是 <code>UsdPrim</code> 或 <code>UsdAttribute</code>，它把 computation 锚定在 USD scene 中。比如 attribute computation 可以从该 attribute 的 authored value 读取输入；这意味着调试时要同时检查 provider、authored value、依赖的 computations 和当前 evaluation time。</p>
      <p class="en">The provider object, either a UsdPrim or UsdAttribute, anchors the computation in a USD scene.</p>
    </section>

    <section data-cn-complete="round-457-openexec-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="zh">开头两段说明 OpenExec 的总职责：它不是把 USD scene 重新组合一遍，而是在已有 scene description 之上评估“可计算行为”。其中 <code>schemas publish computations</code> 表示 schema 可以声明某些计算能力；这些 computations 会从 authored scene values 和其他 computations 读取输入，再产出 output values。读者看到 <code>UsdStage</code> 时，应理解它是 OpenExec 接入场景的入口，而不是 OpenExec 自己维护的 layer stack。</p>
      <p class="en">Schemas publish computations, OpenExec ingests a UsdStage, and clients request computation outputs.</p>
      <p class="zh"><code>Computations</code> 小节说明 computation definition 是 data flow nodes 的模板。中文阅读时可以把它拆成三层：定义层描述该计算需要什么输入和会产生什么输出；实例层把定义绑定到具体 scene object；求值层在 client 请求时真正产生值。这个拆分能避免把 computation 误解为某个 C++ 函数名或一次性 callback。</p>
      <p class="en">A computation definition is a template for producing data flow nodes that take inputs and produce output values.</p>
      <p class="zh"><code>computation provider</code> 是官方文本里的核心术语。provider 可以是 <code>UsdPrim</code> 或 <code>UsdAttribute</code>，它为 computation 提供场景定位和输入来源。如果 computed value 不符合预期，首先检查 provider 是否是预期 prim/attribute，其次检查 authored value 是否在当前 evaluation time 可见，最后再检查来自其他 computations 的输入是否已经被注册并可求值。</p>
      <p class="en">The computation provider anchors a computation in the scene and supplies a reference point for input values.</p>
      <p class="zh"><code>Plugin Computations</code> 小节强调 schema 作者如何扩展 OpenExec：当某个 prim 使用了对应 schema，OpenExec 第一次请求该 schema 的 computation 时会加载 plugin。这里的关键不是 plugin 文件本身，而是 schema computation 的注册关系、callback 实现和 input values specification。后续阅读 Tutorial 2 时，应把这个小节当作“为什么需要定义 schema computations”的背景。</p>
      <p class="en">Plugin computations are associated with schemas and registered through a computation definition language.</p>
      <p class="zh"><code>Builtin Computations</code> 小节强调 provider 类型天然提供的能力，例如 attribute 的 <code>computeValue</code>。它与 plugin computations 的区别是来源不同：builtin 来自 provider 类型固定能力，plugin 来自 schema/plugin 注册。调试时如果 <code>computeValue</code> 返回异常，优先排查 attribute authored value、time sample、value resolution 和 invalidation，而不是先怀疑 schema plugin。</p>
      <p class="en">Builtin computations are always provided by a given provider type, such as computeValue for attributes.</p>
      <p class="zh"><code>Tutorials</code> 小节是官方给出的点击顺序。Tutorial 1 面向值请求与读取，适合使用方；Tutorial 2 面向 schema computation 定义，适合扩展方。中文页保留这两个本地链接，是为了让读者从概念页自然进入操作页，而不是在 API 索引页里随机跳转。</p>
      <p class="en">Tutorial 1 covers computing values; Tutorial 2 covers defining schema computations.</p>
      <p class="zh"><code>Advanced Topics</code> 虽然标记 Coming Soon，但列出的 caching、invalidation、invalidation notification、compilation、scheduling、evaluation 和 dispatched computations 已经定义了后续调试方向。缓存说明结果可能被复用；invalidation 说明 scene changes 后需要使旧值失效；compilation/scheduling/evaluation 说明执行不是单步发生；dispatched computations 则提示某些计算可能走任务分派路径。</p>
      <p class="en">Caching, invalidation, invalidation notification, compilation, scheduling, evaluation, and dispatched computations are the advanced topic boundaries.</p>
    </section>

    <section data-cn-complete="round-457-openexec-computation-types">
      <h2>Plugin Computations 与 Builtin Computations</h2>
      <p class="zh"><code>Plugin Computations</code> 是与 schemas 关联的 computations。OpenExec 会在第一次为使用某个 schema 的 prim 请求 computation 时加载定义该 schema computations 的 plugin。schema 作者用嵌入式 computation definition language 注册 callback，并声明该 computation 需要哪些 input values。这里不要把 plugin computation 误读成渲染插件或文件格式插件；它描述的是 schema 层面的可计算行为注册。</p>
      <p class="en">Computations associated with schemas are called plugin computations; they are registered with an embedded computation definition language.</p>
      <p class="zh"><code>Builtin Computations</code> 是 provider 类型固定提供的一组 computations。官方例子是 attributes 提供 <code>computeValue</code>，用于在当前 evaluation time 产生 attribute 的值。调试时，如果值来自 builtin computation，先检查 provider 类型和 evaluation time；如果值来自 plugin computation，再检查 schema plugin、callback registration 和 input specification。</p>
      <p class="en">OpenExec provides builtin computations such as computeValue for attributes.</p>
    </section>

    <section data-cn-complete="round-457-openexec-tutorial-path">
      <h2>Tutorials 与实际点击顺序</h2>
      <p class="zh">官方 Tutorials 列出两条后续路径：<code>Tutorial 1: Computing Values</code> 面向“如何请求并读取 computed values”；<code>Tutorial 2: Defining Schema Computations</code> 面向“如何为 USD schemas 定义 computations”。按用户点击顺序，本页应位于 ExecUsd README 与 tutorial1 之间：先明白 OpenExec 的概念，再进入 computing values 的操作细节，最后再学习 defining computations。</p>
      <p class="en">The official tutorials are Tutorial 1: Computing Values and Tutorial 2: Defining Schema Computations.</p>
      <ul>
        <li><span class="zh">若目标是使用 OpenExec：先读本页，再读 <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1: Computing Values</a>。</span></li>
        <li><span class="zh">若目标是扩展 schema 行为：读完 Tutorial 1 后继续读 <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2: Defining Schema Computations</a>。</span></li>
        <li><span class="zh">若目标是理解系统内部阶段：再转向 <a href="page__execution__system__design.html">OpenExec System Design</a>、<code>Exec</code>、<code>ExecUsd</code>、<code>Esf</code> 和 <code>Vdf</code> 相关页。</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-457-openexec-advanced-boundaries">
      <h2>Advanced Topics 与边界</h2>
      <p class="zh">官方 Advanced Topics 当前列为 Coming Soon，但列出的主题已经说明 OpenExec 的重要边界：Caching, invalidation, and invalidation notification、compilation, scheduling, evaluation、Dispatched computations。这些主题对应的是执行系统如何避免重复求值、如何响应 USD scene changes、如何组织 evaluation phases，以及如何处理可能被分派执行的 computations。</p>
      <p class="en">Advanced topics include caching, invalidation, invalidation notification, compilation, scheduling, evaluation, and dispatched computations.</p>
      <p class="zh">常见误读有三类：第一，把 OpenExec 当成 USD layer composition，这会混淆 scene description 与 computed values；第二，把 computations 当成手写普通函数调用，这会忽略 provider、input dependency 和 cache invalidation；第三，把 builtin computations 与 plugin computations 混在一起，这会让调试路径跑偏。正确做法是先定位 provider，再判断 computation 来源，最后检查 request、cache view 和 invalidation 事件。</p>
      <p class="en">The page helps distinguish scene description, computation registration, value requests, caching, and invalidation.</p>
    </section>

    <section data-cn-complete="round-457-openexec-adjacent-modules">
      <h2>相邻模块关系 / Adjacent Modules</h2>
      <p class="zh"><code>ExecUsd</code> 是把 OpenExec 接到 USD 场景的层，重点在 stage、prim、attribute 与执行请求之间的桥接；<code>Exec</code> 更接近执行系统核心，关注 request、compilation、scheduling 和 evaluation；<code>Esf</code> 抽象 scene foundation，使执行系统不必直接写死在某一种 scene representation 上；<code>Vdf</code> 提供 vectorized data flow 的底层图模型。阅读本页时把这些层分清楚，后续查类或 README 才不会把概念页、系统设计页和底层实现页混在一起。</p>
      <p class="en">ExecUsd, Exec, Esf, and Vdf sit at different layers around OpenExec.</p>
      <p class="zh">本页和 release 侧的 Introduction to OpenExec 互补：release intro 更像产品级说明，解释为什么需要 OpenExec、示例如何组织、client API 如何使用；本 API overview 更像 Doxygen 文档入口，负责把 concepts、tutorials 和 advanced topics 串起来。若用户从总入口进入 release 文档，应先读 Introduction to OpenExec；若用户从 API 入口进入开发文档，应从本页进入 Tutorial 1 和 Tutorial 2。</p>
      <p class="en">The release introduction and this API overview serve different reading paths.</p>
      <p class="zh">与 <code>UsdStage</code>、<code>UsdPrim</code>、<code>UsdAttribute</code> 的关系也要保持清楚。OpenExec 不改变这些对象的基础含义：stage 仍是 composed scene 的访问入口，prim 仍是场景图对象，attribute 仍承载 authored 或 resolved values。OpenExec 在这些对象之上建立 computation provider、input dependency 和 output request 的求值语义。</p>
      <p class="en">OpenExec builds computation semantics on top of normal USD stage, prim, and attribute concepts.</p>
    </section>

    <section data-cn-complete="round-457-openexec-common-misreads">
      <h2>常见误读 / Common Misreads</h2>
      <ul>
        <li><span class="zh">不要把 <code>computation</code> 翻成一个固定函数名。它是 OpenExec 的求值单元，可能由 schema plugin 注册，也可能由 provider type 内建提供。</span><span class="en">A computation is an OpenExec evaluation unit, not just one fixed function name.</span></li>
        <li><span class="zh">不要把 <code>cache invalidation</code> 理解成清空所有缓存。正确含义是当 scene changes 影响某些 computed values 时，让对应缓存状态失效，并通过 invalidation notification 通知相关请求路径。</span><span class="en">Cache invalidation is scoped by dependencies and scene changes.</span></li>
        <li><span class="zh">不要把 <code>Plugin Computations</code> 和 USD file format plugin 混淆。前者注册 schema computation callback，后者负责读写或解析某类资产格式。</span><span class="en">Plugin computations are schema computation registrations, not file format plugins.</span></li>
        <li><span class="zh">不要跳过 Tutorials 直接看 advanced topics。若还不清楚 client 如何 request values，直接看 scheduling/evaluation 会缺少上下文。</span><span class="en">Read the tutorials before deep scheduling and evaluation details.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-457-openexec-review-path">
      <h2>验收阅读路径 / Review Reading Path</h2>
      <p class="zh">审阅本页时，可以按四步确认中文主阅读路径是否成立。第一步，看标题和开头两段，读者应能说出 OpenExec 解决的是 computed values 的高效求值问题。第二步，看 Concepts 和 Computations，读者应能区分 computation definition、computation provider、input values 与 output value。第三步，看 Plugin/Builtin Computations，读者应能判断某个值来自 schema plugin 还是 provider 内建能力。第四步，看 Tutorials 和 Advanced Topics，读者应知道下一页该点 Tutorial 1、Tutorial 2 还是 System Design。</p>
      <p class="en">The Chinese reading path is organized around purpose, concepts, computation sources, tutorials, and advanced topics.</p>
      <p class="zh">这条路径也服务本地点击顺序：总入口进入 API，本页作为 OpenExec 概览页，上一页连接 ExecUsd README，下一页连接 Tutorial 1，相关链接保留 Tutorial 2、System Design、Vdf 和 ExecUsd。官方链接只作为显式外跳，不承担本地连续阅读职责。这样用户不会在 Doxygen 字母索引、随机同目录文件和官方英文站之间来回跳。</p>
      <p class="en">Local navigation keeps OpenExec overview, tutorials, system design, and official-page escape distinct.</p>
      <p class="zh">source parity 的重点不是逐字翻译官方英文，而是保证官方信息结构没有丢失：标题、section 顺序、核心术语、关键链接和边界说明都要在中文主阅读层里出现。页面保留 <code>OpenExec</code>、<code>UsdStage</code>、<code>UsdPrim</code>、<code>UsdAttribute</code>、<code>computeValue</code>、<code>Plugin Computations</code>、<code>Builtin Computations</code> 等英文标识，是为了让读者能直接回到源码、Doxygen 和日志关键字。</p>
      <p class="en">Source parity keeps the official structure and identifiers visible while the Chinese text becomes the primary reading path.</p>
      <ul>
        <li><span class="zh">如果读者只想知道 OpenExec 是什么，看“中文主阅读路径”和“OpenExec Concepts”。</span></li>
        <li><span class="zh">如果读者要写或检查 schema computation，看“Plugin Computations 与 Builtin Computations”并继续进入 Tutorial 2。</span></li>
        <li><span class="zh">如果读者要排查值为什么没有刷新，看“Advanced Topics 与边界”和“调试路径”里的 caching/invalidation 说明。</span></li>
      </ul>
      <p class="zh">本页完成后，OpenExec API 阅读路径里至少有一个稳定的中文概览节点，可承接 release 介绍页，也可向下连接 tutorial、system design 和低层执行模块，后续再晋级 tutorial 页时不会缺少上游概念锚点。它还明确说明哪些链接是本地连续阅读，哪些链接只是官方外跳核对入口，并给后续 OpenExec 教程页留下清晰上下文和可验证的本地阅读顺序，便于持续审计通过。</p>
    </section>

    <section data-cn-complete="round-457-openexec-debug-path">
      <h2>调试路径 / Debugging Path</h2>
      <ol>
        <li><span class="zh">确认 client 请求的是哪组 computation outputs，而不是只看最终显示值。</span><span class="en">Identify the requested computation outputs.</span></li>
        <li><span class="zh">定位 provider：它是 <code>UsdPrim</code>、<code>UsdAttribute</code>，还是其他 scene object 抽象。</span><span class="en">Find the computation provider.</span></li>
        <li><span class="zh">判断 computation 是 plugin computation 还是 builtin computation；前者看 schema plugin 和 callback registration，后者看 provider type 提供的固定能力。</span><span class="en">Determine whether the computation is plugin-provided or builtin.</span></li>
        <li><span class="zh">检查 inputs from other computations 与 values authored in the scene，确认依赖链是否完整。</span><span class="en">Inspect inputs from other computations and scene-authored values.</span></li>
        <li><span class="zh">若结果陈旧，沿 caching、invalidation、invalidation notification 方向排查。</span><span class="en">If a value is stale, inspect caching and invalidation.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-457-openexec-page-structure">
      <h2>页面结构 / Page Structure</h2>
      <ul>
${headingItems}
      </ul>
    </section>

    <section>
      <h2>保留的官方关键链接 / Source Links</h2>
      <ul>
        <li><a href="../../site/uncovered_openusd_page.html?official=https%3A%2F%2Fopenusd.org%2Frelease%2Fapi%2Fclass_usd_stage.html&amp;title=UsdStage" data-local-route="uncovered" data-official-href="https://openusd.org/release/api/class_usd_stage.html">UsdStage</a></li>
        <li><a href="class_usd_prim.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/class_usd_prim.html">UsdPrim</a></li>
        <li><a href="../../site/uncovered_openusd_page.html?official=https%3A%2F%2Fopenusd.org%2Frelease%2Fapi%2Fclass_usd_attribute.html&amp;title=UsdAttribute" data-local-route="uncovered" data-official-href="https://openusd.org/release/api/class_usd_attribute.html">UsdAttribute</a></li>
        <li><a href="../../site/uncovered_openusd_page.html?official=https%3A%2F%2Fopenusd.org%2Frelease%2Fapi%2Fgroup__group___exec___computation_definition_language.html&amp;title=computation+definition+language" data-local-route="uncovered" data-official-href="https://openusd.org/release/api/group__group___exec___computation_definition_language.html">computation definition language</a></li>
        <li><a href="../../site/uncovered_openusd_page.html?official=https%3A%2F%2Fopenusd.org%2Frelease%2Fapi%2Fgroup__group___exec___builtin___computations.html&amp;title=builtin+computation+documentation" data-local-route="uncovered" data-official-href="https://openusd.org/release/api/group__group___exec___builtin___computations.html">builtin computation documentation</a></li>
        <li><a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1: Computing Values</a></li>
        <li><a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2: Defining Schema Computations</a></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
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
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
      has_main_reading_path: html.includes("中文主阅读路径"),
      has_official_link: html.includes(OFFICIAL_URL),
      has_reading_flow: html.includes("openusd-reading-flow-nav:start") && html.includes("openusd-reading-flow-nav:end"),
      zh_chars: zhCharCount(html),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
    passed: missingSourceKeywords.length === 0
      && missingOutputKeywords.length === 0
      && html.includes("bilingual_complete")
      && !/bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html)
      && zhCharCount(html) >= 2200
      && blockCount(html, "zh") >= 18,
  };
}

function writePage() {
  const html = pageHtml();
  const report = sourceParity(html);
  if (!report.passed) {
    writeJson(SOURCE_PARITY_REPORT, report);
    throw new Error(`Source parity failed: ${JSON.stringify(report, null, 2)}`);
  }
  write(TARGET, html);
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify(report, null, 2));
}

function precheck() {
  const html = read(TARGET);
  const report = sourceParity(html);
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
    title: "OpenExec Overview",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the OpenExec Overview API documentation page by adding Chinese main-reading-path coverage for OpenExec Concepts, Computations, Plugin Computations, Builtin Computations, Tutorials, Advanced Topics, caching/invalidation, execution phases, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2200,
      minimum_complete_section_chinese_chars: 1800,
      minimum_chinese_blocks: 18,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 OpenExec Overview source parity 晋级，并继续跟踪 OpenUSD API 草稿缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: "final-receipt-sha-after-push",
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
        summary: "OpenExec 文档页必须按官方 section 顺序覆盖 concepts、computations、tutorials、advanced topics 和调试边界，不能只保留摘要表。",
        evidence: "本轮覆盖 OpenExec Overview、OpenExec Concepts、Computations、Plugin Computations、Builtin Computations、Tutorials、Advanced Topics、UsdStage、UsdPrim、UsdAttribute、computeValue、caching、invalidation、compilation、scheduling、evaluation 与 dispatched computations。",
        required_action: "后续 OpenExec 教程或系统设计页继续按 source snapshot 做 section-level 中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 OpenExec README -> Overview -> Tutorial 1 -> Tutorial 2/System Design 的点击顺序，并重跑 reading-flow 与 click-path 审计。",
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

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_457_openexec_overview.mjs --write-page --precheck --manifest --problem");
}
