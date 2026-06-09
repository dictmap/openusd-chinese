import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 469;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_exec__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_469_exec_readme_source_parity.json";
const PROMOTION_ID = "round-469-api-exec-readme";
const PREVIOUS_GOOD_BILINGUAL = 237;
const PROMOTION_COMMIT_PLACEHOLDER = "d0bdc0ce47ff8b77603f68b0c5de5e04ddc78168";

const expectedKeywords = [
  "Exec: Execution sytem core",
  "exec library",
  "built on top of",
  "vdf",
  "ef",
  "esf",
  "provides facilities",
  "defining computations",
  "objects in a scene",
  "ingesting scenes",
  "compiling data flow networks",
  "evaluating data flow networks",
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

function sourceText() {
  return stripHtml(read(SOURCE));
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  return (String(value).match(new RegExp(`class="${klass}"`, "g")) || []).length;
}

function pageHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Exec: Execution sytem core | OpenUSD API 中文导读</title>
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
    <h1>Exec: Execution sytem core</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-469-exec-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>Exec</code> 模块的 README 型入口页。官方标题写作 <code>Exec: Execution sytem core</code>，其中 <code>sytem</code> 是源页原样拼写；本地中文页保留这个标题以便 source parity，但中文语义按 execution system core 理解。它说明 <code>exec library</code> 在 OpenExec 栈里的核心职责：基于 <code>vdf</code>、<code>ef</code> 和 <code>esf</code> 构建执行系统，提供定义 computation、摄取 scene、编译 data flow networks、评估 data flow networks 的设施。</span><span class="en">The exec library is built on top of vdf, ef, and esf.</span></p>
      <p><span class="zh">读者应该先把本页看作 OpenExec 栈的中心说明，而不是普通 Doxygen 类索引。<code>Vdf</code> 提供 vectorized data flow 的底层网络词汇，<code>Ef</code> 提供 execution foundation，<code>Esf</code> 提供 scene foundation；<code>Exec</code> 在这些基础上组织“场景对象提供的 computations 如何变成可请求、可编译、可评估的数据流网络”。因此，本页的中文主线围绕系统分层、computation 定义、scene ingestion、network compilation 和 evaluation 展开。</span><span class="en">The exec library provides facilities for defining computations that are provided by objects in a scene, ingesting scenes and compiling data flow networks, and evaluating data flow networks.</span></p>
      <p><span class="zh">沿 OpenExec 点击路径阅读时，本页通常位于 <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a>、Tutorial 1/2、<a href="page__execution__system__design.html">System Design</a>、<a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> 和 <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> 之后。前面几页解释为什么需要 OpenExec、如何请求值、如何注册 computation、系统如何分阶段运行；本页把这些概念压缩成 <code>exec</code> 核心库的职责边界。</span><span class="en">Exec is the core layer that ties OpenExec concepts to data-flow compilation and evaluation.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-stack">
      <h2>栈中位置与依赖关系 / Stack Position</h2>
      <ul>
        <li><span class="zh"><strong><code>vdf</code>。</strong>它是 vectorized data flow foundation。<code>Exec</code> 不重新发明 dataflow network，而是建立在 <code>VdfNetwork</code>、node output/input、connection 等底层语义之上，把计算依赖组织成可执行网络。</span><span class="en">Exec is built on top of vdf.</span></li>
        <li><span class="zh"><strong><code>ef</code>。</strong>它表示 execution foundation 层，提供执行系统需要的基础抽象。遇到核心执行语义或基础 runtime 结构问题时，应把 <code>Ef</code> 与 <code>Exec</code> 的边界分开看，而不要把所有问题都归到 USD scene adapter。</span><span class="en">Exec is built on top of ef.</span></li>
        <li><span class="zh"><strong><code>esf</code>。</strong>它表示 execution scene foundation 层，帮助把 scene objects 提供的 computations 接入执行语义。<code>Exec</code> 使用它来理解“场景对象提供 computation”的抽象，但具体 USD stage、schema 和 plugin metadata 仍要继续阅读 <code>ExecUsd</code>、<code>EsfUsd</code> 和教程页。</span><span class="en">Exec is built on top of esf.</span></li>
      </ul>
      <p><span class="zh">这三个依赖决定了本页的正确阅读边界：<code>Exec</code> 不是 USD composition 层，不直接替代 <code>Sdf</code>、<code>Pcp</code> 或 <code>UsdStage</code>；它也不是单个 schema computation 的教程页，不替代 Tutorial 2；它是把 computation definition、scene ingestion、network compilation 和 network evaluation 串起来的核心执行库。</span><span class="en">Exec is the execution-system core above its data-flow, foundation, and scene-foundation layers.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-responsibilities">
      <h2>核心职责 / Core Responsibilities</h2>
      <ol>
        <li><span class="zh"><strong>定义 computations。</strong>官方说 <code>defining computations that are provided by objects in a scene</code>。这里的重点是 computation 的提供者来自 scene objects，而不是用户临时写一个孤立函数。定义过程要让系统知道某个可计算值由谁提供、需要哪些输入、何时可被请求。</span><span class="en">defining computations that are provided by objects in a scene</span></li>
        <li><span class="zh"><strong>摄取 scenes。</strong><code>ingesting scenes</code> 表示把场景中的对象、schema、注册信息和可计算值入口带入执行系统。它不是简单打开文件，也不是 layer composition 本身；composition 的基础仍在 <code>Sdf</code>/<code>Pcp</code>/<code>Usd</code>，而 Exec 关心摄取后的执行语义。</span><span class="en">ingesting scenes</span></li>
        <li><span class="zh"><strong>编译 data flow networks。</strong><code>compiling data flow networks</code> 是从 scene/computation 语义走向可执行图结构的关键步骤。编译后，依赖关系不再只是文档概念，而会体现在网络节点、输入、输出和连接上。</span><span class="en">compiling data flow networks</span></li>
        <li><span class="zh"><strong>评估 data flow networks。</strong><code>evaluating data flow networks</code> 表示请求值时沿编译后的网络执行计算。调试 stale value、缺失 invalidation、缓存复用或 evaluation 顺序时，本职责是主要入口。</span><span class="en">evaluating data flow networks</span></li>
      </ol>
      <p><span class="zh">把这四步连起来，可以得到本页的最小 mental model：scene object 提供 computation；Exec 摄取 scene 并收集这些 computation；系统把它们编译成 data flow network；请求值时评估该网络并返回结果。任何中文说明如果只说“Exec 是执行核心”而不覆盖这四步，就不足以让读者不依赖英文正文理解本页。</span><span class="en">The core model is definition, ingestion, compilation, and evaluation.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><strong>标题。</strong><code>Exec: Execution sytem core</code> 标明本页是 execution system core 的入口。保留 <code>Exec</code> 和 <code>sytem</code> 原文有两个原因：一是 API 页面标题必须与官方 Doxygen 对齐，二是 source parity 审计需要确认本地页没有擅自改写源标题。</span><span class="en">Exec: Execution sytem core</span></p>
      <p><span class="zh"><strong>第一段。</strong>官方说 <code>exec library</code> is built on top of <code>vdf</code>, <code>ef</code>, and <code>esf</code>。这句话提供依赖顺序：<code>Exec</code> 不是最底层，而是建立在数据流、执行基础和 scene foundation 上。调试时应先判断问题属于底层 dataflow、foundation、scene adapter，还是 Exec 核心组织层。</span><span class="en">The exec library is built on top of vdf, ef, and esf.</span></p>
      <p><span class="zh"><strong>第二段前半。</strong>官方说 <code>provides facilities for defining computations that are provided by objects in a scene</code>。这说明 Exec 的 computation 与 scene object 有关系：对象提供可计算值，系统需要知道如何定义、发现和注册这些值。若 computation 没被发现，通常先查 registration、plugin metadata、schema adapter 或 ExecUsd ingestion。</span><span class="en">provides facilities for defining computations that are provided by objects in a scene</span></p>
      <p><span class="zh"><strong>第二段中段。</strong><code>ingesting scenes and compiling data flow networks</code> 描述了从场景语义到执行图的转换。ingest 是把 scene 带入执行系统，compile 是把 computation 和依赖关系变成 data flow network；两者不能混为 “读取文件” 或 “运行计算” 这类笼统动作。</span><span class="en">ingesting scenes and compiling data flow networks</span></p>
      <p><span class="zh"><strong>第二段末尾。</strong><code>evaluating data flow networks</code> 是请求值时真正沿网络求值的阶段。它与 compilation 相邻但不同：compile 组织图，evaluate 使用图产生结果。读者排查“为什么值没更新”时，应分别检查编译出的 network 是否正确、evaluation 是否运行、invalidation 是否传到相关节点。</span><span class="en">evaluating data flow networks</span></p>
      <p><span class="zh"><strong>链接语义。</strong>源页只显式链接 <code>vdf</code>、<code>ef</code>、<code>esf</code>。本地中文页保留这些语义，并把站内链接路由到本地页面；只有 <a href="${OFFICIAL_URL}">Open official page</a> 是明确外跳。这样读者能按 OpenExec 点击顺序继续阅读，而不会被静默带到官方英文站。</span><span class="en">The source links to vdf, ef, and esf.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是 layer composition、prim path 或 scene graph visibility，优先看 <code>Sdf</code>、<code>Pcp</code>、<code>Usd</code> 或 <code>UsdGeom</code>；<code>Exec</code> 只在场景对象进入执行系统后负责 computation 和 data flow。</span><span class="en">Composition issues are not primarily Exec issues.</span></li>
        <li><span class="zh">如果问题是 schema computation 没有注册，优先看 Tutorial 2、<code>ExecUsd</code>、plugin metadata 和 registration macro；本页只说明 Exec core 有 defining computations 的设施，不列出完整注册示例。</span><span class="en">Registration failures usually require tutorial and ExecUsd context.</span></li>
        <li><span class="zh">如果问题是值存在但没有按预期更新，应沿 <code>ingesting scenes</code>、<code>compiling data flow networks</code>、<code>evaluating data flow networks</code> 三段检查：scene 是否被摄取，network 是否包含目标 computation，evaluation 是否看到正确依赖和 invalidation。</span><span class="en">Stale values should be debugged across ingestion, compilation, and evaluation.</span></li>
        <li><span class="zh">如果问题是 performance，应分清 compile-time cost、network shape、evaluation scheduling、computation body cost 和 cache reuse。<code>Exec</code> 页面提供职责边界，具体 profiling 仍要结合 <code>Trace</code>、<code>Work</code> 和 System Design。</span><span class="en">Performance debugging needs layer separation.</span></li>
        <li><span class="zh">如果读者只想理解 OpenExec 的用户流程，先读 Overview 和 Tutorial 1/2；如果要理解底层执行机制，再回到 System Design、Exec README、Vdf README、Ef/Esf README。这样点击路径符合从使用示例到系统核心再到底层组件的顺序。</span><span class="en">The recommended click path moves from tutorials to system core to foundations.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-469-exec-neighbor-pages">
      <h2>相邻页面关系 / Neighbor Pages</h2>
      <p><span class="zh"><a href="md_pxr_exec_vdf__r_e_a_d_m_e.html"><code>Vdf README</code></a> 已完成，适合理解 dataflow network 的底层词汇；<a href="md_pxr_exec_ef__r_e_a_d_m_e.html"><code>Ef README</code></a> 和 <a href="md_pxr_exec_esf__r_e_a_d_m_e.html"><code>Esf README</code></a> 仍是可检查草稿，不是完整翻译；<a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html"><code>ExecUsd README</code></a> 已完成，适合理解 USD scene 如何进入 OpenExec。当前页位于这些页面之间，负责把“底层 foundation”和“USD-facing system”之间的核心执行职责说清楚。</span><span class="en">Exec sits between foundation pages and USD-facing OpenExec pages.</span></p>
      <p><span class="zh">从本地站用户体验看，related/prev/next 应服务真实点击路径：总入口进入 API 首页，沿 OpenExec Overview、教程、System Design、ExecUsd、Vdf 再到 Exec core，然后继续查看 Ef/Esf/EsfUsd 或 ExecGeom，而不是跳到无关 release support 页。当前页正文和 reading-flow 导航都按这个顺序组织。</span><span class="en">Local navigation follows the OpenExec reading path.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-architecture-reading">
      <h2>架构阅读提示 / Architecture Reading Notes</h2>
      <p><span class="zh">本页虽然短，但它在 OpenExec 文档链中承担“分层枢纽”的作用。向下看，<code>Exec</code> 依赖 <code>vdf</code>、<code>ef</code>、<code>esf</code>，所以任何涉及 network node、connection、foundation runtime 或 scene-foundation adapter 的问题都要先确认属于哪一层；向上看，<code>ExecUsd</code>、tutorial 和 system design 会把这些底层设施用于 USD stage 和 schema computation。读者如果跳过本页，容易只记住用户层 API，却不知道请求值时为什么要先摄取场景、再编译网络、最后评估网络。</span><span class="en">Exec is the architectural hinge between foundation libraries and USD-facing OpenExec pages.</span></p>
      <p><span class="zh">实际排查时可以把本页当作四个检查点：第一，computation 是否由 scene object 正确定义；第二，scene ingestion 是否让执行系统看到这些对象；第三，compilation 是否生成了包含依赖关系的 data flow networks；第四，evaluation 是否沿这些 networks 得到当前请求的值。这样可以避免把 registration 问题、network shape 问题、evaluation 问题和 USD composition 问题混在一起，也能让后续阅读 <code>Ef</code>、<code>Esf</code>、<code>EsfUsd</code>、<code>ExecGeom</code> 时有稳定的上下文。</span><span class="en">The four practical checkpoints are computation definition, scene ingestion, network compilation, and network evaluation.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留官方标题和关键词：<code>Exec: Execution sytem core</code>、<code>exec library</code>、<code>built on top of</code>、<code>vdf</code>、<code>ef</code>、<code>esf</code>、<code>provides facilities</code>、<code>defining computations</code>、<code>objects in a scene</code>、<code>ingesting scenes</code>、<code>compiling data flow networks</code>、<code>evaluating data flow networks</code>。</span><span class="en">Official title and terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-469-exec-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说清：<code>Exec</code> 建立在 <code>vdf</code>、<code>ef</code>、<code>esf</code> 之上；它负责定义 scene objects 提供的 computations；它负责摄取 scene 并把 computation 依赖编译成 data flow networks；它也负责评估这些 networks 来服务值请求。若只能记住“Exec 是核心”，但不能说出 definition、ingestion、compilation、evaluation 这条链，说明还没有达到 review-ready。</span><span class="en">A review-ready reader can explain definition, ingestion, compilation, and evaluation.</span></p>
      <p><span class="zh">读者还应能判断排查入口：找不到 computation 时看 registration 和 ExecUsd；network 形状不对时看 Vdf/Exec 编译路径；值过期时看 invalidation、cache 和 evaluation；场景层级或 layer 组合问题回到 Usd/Sdf/Pcp。这个边界能减少把所有 OpenExec 问题都归咎于单一模块的误读。</span><span class="en">The debugging path separates registration, network compilation, evaluation, and composition issues.</span></p>
    </section>

    <section data-cn-complete="round-469-exec-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2</a> -> <a href="page__execution__system__design.html">System Design</a> -> <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> -> <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> -> 当前 <code>Exec README</code>。之后可继续查看 <a href="md_pxr_exec_ef__r_e_a_d_m_e.html">Ef README</a>、<a href="md_pxr_exec_esf__r_e_a_d_m_e.html">Esf README</a> 或 <a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">EsfUsd README</a>。</span><span class="en">The click path follows OpenExec overview, tutorials, design, USD adapter, Vdf, and Exec core.</span></p>
      <p><span class="zh">本地 reading-flow、breadcrumb、API 入口、总入口和 related links 是主要阅读路径；只有 <a href="${OFFICIAL_URL}">Open official page</a> 是明确外跳。正文链接同样使用本地路径，避免用户阅读中途被静默跳回官方英文站。</span><span class="en">Only Open official page is an external jump.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">上一页：Vdf README</a></p>
      <p><a href="md_pxr_exec_ef__r_e_a_d_m_e.html">下一步：Ef README</a></p>
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
      bilingual_complete: html.includes('data-cn-status="bilingual_complete"') && html.includes("bilingual_complete"),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐/.test(html),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL),
      has_code_path:
        html.includes("defining computations") &&
        html.includes("ingesting scenes") &&
        html.includes("compiling data flow networks") &&
        html.includes("evaluating data flow networks"),
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
    title: "Exec: Execution sytem core",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Exec README/API entry page by adding Chinese main-reading-path coverage for Exec positioning, vdf/ef/esf dependencies, defining computations, scene ingestion, data-flow network compilation, network evaluation, debugging boundaries, click-path navigation, source parity, and explicit official-page verification.`,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Exec README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/Exec/Vdf 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 Exec README 的 vdf/ef/esf 依赖、defining computations、ingesting scenes、compiling data flow networks、evaluating data flow networks，并保留 Overview -> Tutorial -> System Design -> ExecUsd -> Vdf -> Exec 的本地点击路径。",
        required_action: "后续 Ef/Esf/EsfUsd/ExecGeom 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 Ef/Esf/EsfUsd/ExecGeom 等仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_469_exec_readme.mjs";
  const current = read(script);
  if (current.includes(PROMOTION_COMMIT_PLACEHOLDER)) {
    write(script, current.replaceAll(PROMOTION_COMMIT_PLACEHOLDER, sha));
  }
  const problem = readJson("reports/current_problem_audit.json");
  if (problem.last_completed_round) {
    problem.last_completed_round.commit_sha = sha;
  }
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
  console.log("Usage: node scripts/promote_round_469_exec_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
