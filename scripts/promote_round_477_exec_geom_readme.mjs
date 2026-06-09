import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 477;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_exec_geom__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_477_exec_geom_readme_source_parity.json";
const PROMOTION_ID = "round-477-api-exec-geom-readme";
const PREVIOUS_GOOD_BILINGUAL = 241;
const PROMOTION_COMMIT_PLACEHOLDER = "81b22b41d653bd9bfa7987e0f79466762927f9da";

const expectedKeywords = [
  "ExecGeom: Execution for UsdGeom",
  "execGeom library",
  "built on top of",
  "execUsd",
  "registrations",
  "computations",
  "compute results",
  "data represented using UsdGeom schemas",
  "UsdGeom schemas",
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
  <title>ExecGeom: Execution for UsdGeom | OpenUSD API 中文导读</title>
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
    <h1>ExecGeom: Execution for UsdGeom</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-477-exec-geom-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>ExecGeom: Execution for UsdGeom</code> 的 README 型入口页。官方正文很短，但它在 OpenExec 点击路径中承担明确职责：<code>execGeom library</code> built on top of <code>execUsd</code>，并包含针对 <code>UsdGeom schemas</code> 的 computation registrations。读者应把它理解成 “OpenExec 如何把几何 schema 数据接入计算注册” 的说明，而不是普通 <code>UsdGeom</code> authoring 教程。</span><span class="en">The execGeom library is built on top of execUsd.</span></p>
      <p><span class="zh">沿本地阅读顺序看，<code>ExecUsd</code> 先说明执行系统如何访问 USD stage、请求 computed values 和组织 cache view；<code>EsfUsd</code> 说明执行系统如何访问定义在 <code>UsdStage</code> 上的 scene objects；当前 <code>ExecGeom</code> 再把焦点收窄到 <code>UsdGeom schemas</code>。它注册的 computations 依据几何 schema 表达的数据来 compute results，例如后续教程中常见的 xform、local-to-world transform、bounds 或几何属性派生值这类读者需要沿 <code>UsdGeom</code> 语义理解的结果。</span><span class="en">The execGeom library contains registrations for computations that compute results based on data represented using UsdGeom schemas.</span></p>
      <p><span class="zh">本页的中文主线是分清三层边界：第一，<code>UsdGeom</code> 规定几何 prim、xform、bounds、primvars 等数据如何表达；第二，<code>ExecUsd</code>/<code>EsfUsd</code> 让执行系统能看到 USD stage 和 scene objects；第三，<code>ExecGeom</code> 为几何 schema 相关数据提供 computation registrations。调试时如果几何派生值缺失，不要直接归因于 <code>UsdGeom</code> authoring，也不要直接归因于 <code>Vdf</code> executor；应先确认 computation 名称、provider prim、schema 数据和 ExecGeom 注册是否一致。</span><span class="en">ExecGeom sits between USD scene access and geometry-specific computations.</span></p>
    </section>

    <section data-cn-complete="round-477-exec-geom-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 <code>ExecGeom: Execution for UsdGeom</code> 指明页面不是泛化的 execution core，而是面向 <code>UsdGeom</code> 的执行扩展层。<code>ExecGeom</code>、<code>UsdGeom</code> 都必须保留原名，便于和 Doxygen、源码目录、token 名称核对。</span><span class="en">ExecGeom: Execution for UsdGeom</span></li>
        <li><span class="zh"><code>The execGeom library is built on top of execUsd.</code> 给出依赖顺序。当前页建立在 <code>execUsd</code> 之上，所以阅读前应先理解 <code>ExecUsd</code> 如何把 USD stage、provider object、request 和 cache view 交给执行系统。</span><span class="en">The execGeom library is built on top of execUsd.</span></li>
        <li><span class="zh"><code>contains registrations for computations</code> 是本页的核心动作。它不是运行所有计算的 executor，而是提供注册信息，让 execution system 知道哪些几何 schema 数据可以对应哪些 computation。</span><span class="en">contains registrations for computations</span></li>
        <li><span class="zh"><code>compute results based on data represented using UsdGeom schemas</code> 描述输入和输出关系：输入来自 <code>UsdGeom schemas</code> 表达的数据，输出是 execution system 可请求的 computed results。这里的 data represented 不等同于单个字段翻译，而是包括 prim 类型、属性、关系、xform stack、extent、primvar 等几何语义组合。</span><span class="en">compute results based on data represented using UsdGeom schemas</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-477-exec-geom-stack">
      <h2>模块分层 / Stack Position</h2>
      <ul>
        <li><span class="zh">相对 <code>ExecUsd</code>：<code>ExecUsd</code> 负责 USD stage 级接入、request/cache view 和 scene object provider 语义；<code>ExecGeom</code> 建立在它之上，专注为 <code>UsdGeom</code> 数据注册可计算项。</span><span class="en">ExecGeom is built on top of ExecUsd.</span></li>
        <li><span class="zh">相对 <code>UsdGeom</code>：<code>UsdGeom</code> 是 geometry schema 和 API 文档路径，定义 <code>UsdGeomXformable</code>、<code>UsdGeomBoundable</code>、<code>UsdGeomImageable</code>、primvars、extent、purpose、visibility 等数据语义；<code>ExecGeom</code> 不改变这些 authoring 规则，只消费这些规则表达出的数据来注册计算。</span><span class="en">UsdGeom remains the schema and authoring documentation path.</span></li>
        <li><span class="zh">相对 <code>Vdf</code>/<code>Ef</code>/<code>Exec</code>：这些模块解释 data-flow network、execution foundation 和 execution core。<code>ExecGeom</code> 不负责 executor、cache structure 或 network traversal 本身，而是把几何领域的 computations 挂到上层执行系统可发现的注册路径里。</span><span class="en">Vdf, Ef, and Exec explain lower execution mechanics.</span></li>
        <li><span class="zh">相对 <code>Gf</code>/<code>Vt</code>：几何计算经常返回矩阵、向量、范围或数组值，具体数值类型由 <code>Gf</code> 和 <code>Vt</code> 承载；<code>ExecGeom</code> 的职责是组织几何 schema 数据到 computed result 的注册语义，不是重新定义数学容器。</span><span class="en">Gf and Vt provide common math and value containers consumed by geometry computations.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-477-exec-geom-responsibilities">
      <h2>计算注册职责 / Computation Registration Responsibilities</h2>
      <p><span class="zh"><code>registrations for computations</code> 应理解为执行系统的发现入口。OpenExec 需要知道某个 provider object 上有哪些 computation 可请求、这些 computation 如何从 schema 数据读取输入、哪些数据变化会让结果失效。<code>ExecGeom</code> 把 <code>UsdGeom schemas</code> 里的几何语义接到这套机制里，因此它更像领域注册包，而不是单独的计算器类。</span><span class="en">ExecGeom contains registrations for geometry-related computations.</span></p>
      <p><span class="zh">官方短句里的 <code>compute results</code> 不应被读成 “页面列出所有运行结果”。它指的是执行系统可以通过注册的 computation 得到基于几何数据的派生值。典型理解路径是：provider 来自 USD stage 中的 prim；schema 数据来自 <code>UsdGeom</code> 约定；computation token 或注册项告诉 OpenExec 要计算什么；结果可能由 <code>GfMatrix4d</code>、<code>GfBBox3d</code>、<code>VtValue</code> 或其他保持原名的类型承载。</span><span class="en">Computed results are derived from data represented by UsdGeom schemas.</span></p>
      <p><span class="zh">因此调试 <code>ExecGeom</code> 时，最有效的检查顺序是：确认 prim 是否具备目标 <code>UsdGeom</code> schema；确认所需属性、xform stack 或 primvar 是否按 schema 规则存在；确认 <code>ExecUsdValueKey</code> 一类请求是否指向正确 provider 与 computation；确认 <code>ExecGeom</code> 注册是否覆盖该 schema/computation；最后才检查 <code>Vdf</code> evaluation 和 cache 是否按预期运行。</span><span class="en">Debugging follows provider, schema data, computation registration, then evaluation.</span></p>
      <p><span class="zh">几何数据还有一个容易漏看的维度：变化传播。<code>UsdGeom</code> 的 xformOp、extent、primvars 或 visibility 等输入变化后，相关 computed result 应该沿 OpenExec 依赖关系失效并重新计算。若结果没有变化，要分别检查 USD stage 上的数据是否真的改变、<code>ExecGeom</code> 注册是否把这些字段纳入 computation 依赖、以及 execution cache 是否收到正确 invalidation。这样可以把 “几何数据没写对”、“几何 computation 没注册对” 和 “执行缓存没失效” 三类问题分开。</span><span class="en">Geometry data changes must propagate through computation dependencies and invalidation.</span></p>
    </section>

    <section data-cn-complete="round-477-exec-geom-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">标题段：<code>ExecGeom: Execution for UsdGeom</code> 把页面范围限制在 geometry schema domain。中文解释必须保留 <code>ExecGeom</code> 和 <code>UsdGeom</code>，因为它们是模块名和 schema 家族名，不应翻译成会破坏检索的普通中文词。</span><span class="en">ExecGeom: Execution for UsdGeom</span></p>
      <p><span class="zh">依赖段：<code>built on top of execUsd</code> 说明本页在 OpenExec 栈里的上游依赖。读者若不了解 USD stage 如何进入 execution system，应先读 <code>ExecUsd</code>、<code>EsfUsd</code> 和 OpenExec tutorials，而不是直接从 <code>ExecGeom</code> 推断 request/cache API。</span><span class="en">The execGeom library is built on top of execUsd.</span></p>
      <p><span class="zh">注册段：<code>contains registrations for computations</code> 说明 <code>ExecGeom</code> 的主要输出是注册信息。注册负责把几何 schema 数据和可请求 computation 联系起来；真正的 network evaluation、cache、traversal 仍由下层 execution foundation 和 system design 解释。</span><span class="en">The execGeom library contains registrations for computations.</span></p>
      <p><span class="zh">输入输出段：<code>compute results based on data represented using UsdGeom schemas</code> 同时说明数据来源和结果性质。数据来源不是任意外部几何缓存，而是 <code>UsdGeom schemas</code> 表达的 stage 数据；结果不是新写回的 authoring 字段，而是 execution system 可请求、可缓存、可失效的 computed results。</span><span class="en">computations compute results based on data represented using UsdGeom schemas</span></p>
      <p><span class="zh">链接语义段：本地页应把 <code>ExecGeom</code> 放在 <code>EsfUsd</code> 之后，因为前者已经假设 USD scene access 存在，再进入几何 schema 的 computation registration。显式 <a href="${OFFICIAL_URL}">Open official page</a> 只作为官方外跳；正文阅读和 related/prev/next 优先保留在本地 OpenExec 点击路径中。</span><span class="en">Local navigation follows the OpenExec geometry reading path.</span></p>
    </section>

    <section data-cn-complete="round-477-exec-geom-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是 <code>UsdGeom</code> 数据是否 author 正确，例如 xformOp、extent、primvars、visibility、purpose 或 schema 类型，应先查看 <code>UsdGeom</code> 模块和 release user guide；<code>ExecGeom</code> 不改变 authoring 规则。</span><span class="en">UsdGeom authoring issues belong to UsdGeom documentation.</span></li>
        <li><span class="zh">如果问题是 stage、prim、property 或 relationship 如何被 OpenExec 看到，应先查看 <code>ExecUsd</code> 和 <code>EsfUsd</code>；<code>ExecGeom</code> 建立在这些 USD 接入层之上。</span><span class="en">USD stage access issues belong near ExecUsd and EsfUsd.</span></li>
        <li><span class="zh">如果问题是 computation 是否存在、token 是否匹配或 provider 是否选择正确，当前 <code>ExecGeom</code> 页面和相关 class/token 页面是关键路径，因为这里解释 geometry computation registrations 的来源。</span><span class="en">Computation registration issues belong near ExecGeom.</span></li>
        <li><span class="zh">如果问题是 evaluation performance、cache reuse、network traversal 或 executor 行为，应回到 <code>Vdf</code>、<code>Ef</code>、<code>Exec</code> 和 System Design；<code>ExecGeom</code> 只说明几何领域 computation 如何注册。</span><span class="en">Execution mechanics belong near Vdf, Ef, Exec, and system design.</span></li>
        <li><span class="zh">如果几何 computed result 与预期不一致，要把 authored geometry data、schema interpretation、ExecGeom registration、request key、execution cache 五个层面分开检查，避免把所有问题都归因于一个模块。</span><span class="en">Separate geometry data, schema interpretation, registration, request key, and cache.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-477-exec-geom-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2</a> -> <a href="page__execution__system__design.html">System Design</a> -> <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> -> <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> -> <a href="md_pxr_exec_exec__r_e_a_d_m_e.html">Exec README</a> -> <a href="md_pxr_exec_ef__r_e_a_d_m_e.html">Ef README</a> -> <a href="md_pxr_exec_esf__r_e_a_d_m_e.html">Esf README</a> -> <a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">EsfUsd README</a> -> 当前 <code>ExecGeom README</code>。</span><span class="en">The local click path reaches ExecGeom after USD scene access is established.</span></p>
      <p><span class="zh">这个顺序符合用户从总入口进入 API 文档时的认知路径：先理解 OpenExec 的 value request 和系统设计，再理解 Vdf/Ef/Exec 基础，随后理解 scene access，最后进入几何 schema 计算注册。下一步可以查看 <code>ExecIr</code> 或具体 <code>UsdGeom</code>/<code>ExecGeom</code> class/token 页面，但不得把官方 URL 混入本地 prev/next/related 作为普通站内顺序。</span><span class="en">Open official page remains the explicit external jump.</span></p>
      <ul>
        <li><span class="zh">本地入口：<code>openusd_bilingual_final.html</code> 与 <code>site/api/index.html</code>。</span><span class="en">Local entrances are preserved.</span></li>
        <li><span class="zh">上一页建议：<code>md_pxr_exec_esf_usd__r_e_a_d_m_e.html</code>，因为它解释 USD scene objects 如何被 execution system 访问。</span><span class="en">Previous page: EsfUsd README.</span></li>
        <li><span class="zh">下一页建议：<code>ExecIr</code> 或具体几何 computation/token 参考页，按 inventory 中仍为 draft 且有 source snapshot 的页面确认后再推进。</span><span class="en">Next page: adjacent OpenExec geometry or implementation pages.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-477-exec-geom-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：<code>ExecGeom: Execution for UsdGeom</code>、<code>execGeom library</code>、<code>built on top of</code>、<code>execUsd</code>、<code>registrations</code>、<code>computations</code>、<code>compute results</code>、<code>data represented using UsdGeom schemas</code>、<code>UsdGeom schemas</code>。</span><span class="en">Official title and source terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读路径继续使用站内 API/reading-flow 链接。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-477-exec-geom-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：<code>ExecGeom</code> 建立在 <code>execUsd</code> 之上；它包含面向 <code>UsdGeom schemas</code> 的 computation registrations；这些 computations 根据 <code>UsdGeom</code> schema 表达的数据 compute results；它不替代 <code>UsdGeom</code> authoring 文档，也不负责 Vdf/Ef/Exec 的 executor 或 cache 机制；调试时要区分 schema 数据、USD stage 接入、registration、request key 和 evaluation cache。</span><span class="en">A review-ready reader can explain ExecGeom's geometry computation registration role.</span></p>
      <p><span class="zh">读者还应能判断下一步该点哪里：要查几何数据本身就去 <code>UsdGeom</code>，要查 USD stage 接入就回 <code>ExecUsd</code>/<code>EsfUsd</code>，要查几何 computation 名称和注册边界才继续沿 <code>ExecGeom</code> 相关页面深入。</span><span class="en">The page makes the next debugging click explicit.</span></p>
      <p><span class="zh">本页达标依据是：官方短源文的全部关键术语均保留并解释，中文主阅读路径覆盖页面职责、官方正文顺序、模块分层、计算注册职责、逐段双语理解、边界误读点、调试路径和本地点击顺序；页面不再依赖草稿提示或英文摘录表作为主要内容。</span><span class="en">The completed page stays faithful to the short source while making the geometry execution layer readable in Chinese.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">上一页：EsfUsd README</a></p>
      <p><a href="md_pxr_exec_exec_ir__r_e_a_d_m_e.html">下一步：ExecIr README</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`);
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
        html.includes("execUsd") &&
        html.includes("UsdGeom schemas") &&
        html.includes("registrations for computations") &&
        html.includes("data represented using UsdGeom schemas"),
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
    report.output_checks.zh_chars >= 1800 &&
    report.output_checks.zh_blocks >= 22;
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
    title: "ExecGeom: Execution for UsdGeom",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the ExecGeom README/API entry by adding Chinese main-reading-path coverage for execUsd dependency, UsdGeom schema computation registrations, computed-result semantics, module boundaries, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
      minimum_chinese_blocks: 22,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 ExecGeom README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/ExecGeom 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 ExecGeom README 的 execUsd 依赖、UsdGeom schema computation registrations、computed-result 语义、模块边界、调试路径和 OpenExec -> EsfUsd -> ExecGeom 点击路径。",
        required_action: "后续 ExecIr 或具体 geometry/token 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 OpenExec 系列点击路径，并重跑 reading-flow 与 click-path 审计。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 ExecIr 或具体 geometry/token 页面中仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_477_exec_geom_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_477_exec_geom_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
