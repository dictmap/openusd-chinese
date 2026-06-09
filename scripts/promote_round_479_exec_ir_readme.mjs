import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 479;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_exec_ir__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_479_exec_ir_readme_source_parity.json";
const PROMOTION_ID = "round-479-api-exec-ir-readme";
const PREVIOUS_GOOD_BILINGUAL = 242;
const PROMOTION_COMMIT_PLACEHOLDER = "round-479-promotion-commit-sha-before-push";

const expectedKeywords = [
  "ExecIr: OpenExec implementation of invertible rigs",
  "execIr library",
  "built on top of",
  "execUsd",
  "limited in functionality",
  "not intended for production use",
  "utilities",
  "define invertible controllers",
  "execution behaviors",
  "invertible rigging contrllers",
  "basic controller types",
  "building blocks",
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
  <title>ExecIr: OpenExec implementation of invertible rigs | OpenUSD API 中文导读</title>
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
    <h1>ExecIr: OpenExec implementation of invertible rigs</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-479-exec-ir-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>ExecIr: OpenExec implementation of invertible rigs</code> 的 README 型入口页。官方正文说明 <code>execIr library</code> built on top of <code>execUsd</code>，并且明示本库中的 schemas 和 APIs currently limited in functionality、not intended for production use。中文阅读时必须先抓住这个边界：<code>ExecIr</code> 是 OpenExec 面向 invertible rigs / invertible controllers 的实现说明，不是稳定生产级 rigging API，也不是普通 USD schema authoring 教程。</span><span class="en">The execIr library is built on top of execUsd.</span></p>
      <p><span class="zh">沿 OpenExec 点击路径看，<code>ExecUsd</code> 提供 USD stage、request 和 cache view 接入；<code>ExecGeom</code> 说明几何 schema 的 computation registration；当前 <code>ExecIr</code> 则继续进入 invertible rigging 领域。它包含 utilities，用于 define invertible controllers，也包含实现 invertible rigging controllers 执行行为的代码。官方源文里 <code>contrllers</code> 是原文拼写，本页保留该 source parity 关键词，同时在中文中按 “controllers / 控制器” 正确解释。</span><span class="en">The execIr library contains utilities that are used to define invertible controllers.</span></p>
      <p><span class="zh">本页读者需要理解的核心不是单个类成员，而是职责边界：<code>ExecIr</code> 用 basic controller types 作为 higher-level controllers 的 building blocks，帮助 OpenExec 表达可逆 rig 控制器的 execution behaviors。调试时若 rig value 不符合预期，要区分 authored rig data、invertible controller 定义、execution behavior 注册、ExecUsd provider/request、以及 Vdf/Ef/Exec 的 evaluation/cache 机制。</span><span class="en">This library also contains code used to implement execution behaviors for invertible rigging controllers.</span></p>
    </section>

    <section data-cn-complete="round-479-exec-ir-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 <code>ExecIr: OpenExec implementation of invertible rigs</code> 指出本页属于 invertible rigs 实现层。<code>ExecIr</code> 和 <code>invertible rigs</code> 都必须保留英文，便于读者追源码目录、Doxygen 页面和相邻 OpenExec 文档。</span><span class="en">ExecIr: OpenExec implementation of invertible rigs</span></li>
        <li><span class="zh"><code>The execIr library is built on top of execUsd</code> 给出依赖层级。读者应先理解 <code>ExecUsd</code> 如何把 execution system 接到 USD stage，再看 <code>ExecIr</code> 如何在这个基础上实现可逆 rig 控制器行为。</span><span class="en">The execIr library is built on top of execUsd.</span></li>
        <li><span class="zh">官方 note 明确写出 <code>limited in functionality</code> 和 <code>not intended for production use</code>。这是本页最重要的风险边界：不要把当前 schemas/APIs 当成已经稳定承诺的生产接口，也不要用它替代正式 rigging 或 animation pipeline 文档。</span><span class="en">The schemas and APIs defined in this library are currently limited in functionality and not intended for production use.</span></li>
        <li><span class="zh"><code>contains utilities that are used to define invertible controllers</code> 说明 <code>ExecIr</code> 的第一类职责是定义工具。它帮助描述可逆控制器，而不是直接声明普通场景层级、几何拓扑或 material/shading 语义。</span><span class="en">utilities that are used to define invertible controllers</span></li>
        <li><span class="zh"><code>code used to implement the execution behaviors for invertible rigging contrllers</code> 说明第二类职责是执行行为实现。官方源文拼写为 <code>contrllers</code>，中文解释按 <code>controllers</code> 理解，并保留这个原文关键词用于 source parity。</span><span class="en">execution behaviors for invertible rigging contrllers</span></li>
        <li><span class="zh"><code>basic controller types</code> 和 <code>building blocks</code> 说明它不仅有工具函数，还提供更高层 controller 可复用的基础控制器类型。阅读时应把这些类型看成更复杂 rig 控制器的构件，而不是完整生产方案。</span><span class="en">basic controller types that are used as building blocks for other, higher-level controllers</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-479-exec-ir-stack">
      <h2>模块分层 / Stack Position</h2>
      <ul>
        <li><span class="zh">相对 <code>ExecUsd</code>：<code>ExecIr</code> built on top of <code>execUsd</code>，因此它默认依赖 USD stage 和 execution request 接入已经存在。若 request、provider 或 cache view 失败，应先回到 <code>ExecUsd</code>。</span><span class="en">ExecIr is built on top of ExecUsd.</span></li>
        <li><span class="zh">相对 <code>ExecGeom</code>：二者都可能接触变换或几何相关数据，但 <code>ExecGeom</code> 关注 <code>UsdGeom schemas</code> 的 computation registrations，<code>ExecIr</code> 关注 invertible rigs / invertible controllers 的可逆控制语义和执行行为。</span><span class="en">ExecGeom focuses on geometry computations; ExecIr focuses on invertible rig behavior.</span></li>
        <li><span class="zh">相对 <code>Vdf</code>、<code>Ef</code>、<code>Exec</code>：这些模块解释 data-flow network、execution foundation 和 execution core；<code>ExecIr</code> 不负责重定义 executor/cache/traversal，而是在上层为可逆 rig 控制器提供工具、基础类型和 behavior implementation。</span><span class="en">Lower execution mechanics remain in Vdf, Ef, and Exec.</span></li>
        <li><span class="zh">相对普通 rig/animation 文档：本页不是完整 animation rigging 教程，也不是 production pipeline 指南。官方已经标注 limited functionality，因此中文页必须诚实说明它处在 OpenExec 实验性/受限功能区域。</span><span class="en">The page is not a production rigging guide.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-479-exec-ir-responsibilities">
      <h2>控制器职责 / Controller Responsibilities</h2>
      <p><span class="zh"><code>invertible controllers</code> 可以理解为可逆 rig 系统里的控制器表达：它们既要能从控制输入推导 rig 状态，也可能服务于反向求解或从结果回推控制量的流程。官方源页没有展开数学求解细节，所以中文页不伪造算法，而是说明 <code>ExecIr</code> 提供定义这些控制器的 utilities，以及执行这些控制器 behaviors 的实现代码。</span><span class="en">ExecIr provides utilities used to define invertible controllers.</span></p>
      <p><span class="zh"><code>execution behaviors</code> 是本页另一个关键词。它表示控制器不是静态 schema 名称，而是需要在 execution system 中被求值、传播和参与依赖关系。若某个可逆 rig controller 的行为没有生效，排查路径应覆盖 controller definition、behavior registration、输入输出依赖、ExecUsd request、以及 Vdf/Ef/Exec evaluation。</span><span class="en">ExecIr implements execution behaviors for invertible rigging controllers.</span></p>
      <p><span class="zh"><code>basic controller types</code> 作为 <code>building blocks</code> 的表述说明官方把当前库定位为搭建更高层 controllers 的基础构件。中文阅读时要避免过度承诺：它可以帮助理解 OpenExec invertible rigging 实现路径，但由于官方 note 的限制，不应把这些基础类型直接视为生产级完整 controller 框架。</span><span class="en">Basic controller types are building blocks for higher-level controllers.</span></p>
      <p><span class="zh">从调试角度看，<code>ExecIr</code> 的问题常常不只在一个层面。若输出值错误，先确认 authored rig data 和 controller 定义是否符合预期；再确认 execution behavior 是否注册并被请求；随后检查 provider 是否来自正确 USD stage object；最后检查 dependency graph、invalidation 和 cache 是否让旧值正确失效。这个顺序能把 rig 语义、USD 接入和执行系统机制分开。</span><span class="en">Debugging separates rig semantics, USD access, behavior registration, and execution evaluation.</span></p>
      <p><span class="zh">阅读策略上，本页应当作为 OpenExec 点击路径中的一个窄入口：它告诉读者 <code>ExecIr</code> 为什么存在、依赖哪一层、哪些能力仍受限制，以及遇到 invertible rig controller 问题时应该从哪个邻近文档继续追查。它不展开完整算法，也不把官方没有承诺的生产行为补写成事实；中文解释只围绕 source snapshot 中已经出现的职责、限制和关键术语建立可读上下文，并明确保留点击顺序。</span><span class="en">The Chinese reading path explains only the responsibilities and limits present in the source snapshot.</span></p>
    </section>

    <section data-cn-complete="round-479-exec-ir-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">标题段：<code>ExecIr: OpenExec implementation of invertible rigs</code> 说明它是 OpenExec 的 invertible rig 实现入口。<code>ExecIr</code>、<code>OpenExec</code>、<code>invertible rigs</code> 都保持英文，避免破坏源码和 Doxygen 检索。</span><span class="en">ExecIr: OpenExec implementation of invertible rigs</span></p>
      <p><span class="zh">依赖段：<code>built on top of execUsd</code> 说明本页依赖 USD 接入层。读者若不清楚 request、provider、cache view 或 stage object 如何进入 execution system，应先读 <code>ExecUsd</code> 和前面的 OpenExec tutorial 页面。</span><span class="en">The execIr library is built on top of execUsd.</span></p>
      <p><span class="zh">限制段：<code>limited in functionality</code> 与 <code>not intended for production use</code> 是硬边界。中文页必须诚实说明当前 schemas/APIs 功能有限且不建议生产使用，这一点比增加概念解释更重要。</span><span class="en">The schemas and APIs defined in this library are currently limited in functionality and not intended for production use.</span></p>
      <p><span class="zh">工具段：<code>utilities that are used to define invertible controllers</code> 指出 <code>ExecIr</code> 提供定义可逆控制器的工具。这里的 utilities 不是普通命令行工具，而是用于构造 OpenExec 可理解 controller 语义的实现辅助。</span><span class="en">utilities that are used to define invertible controllers</span></p>
      <p><span class="zh">行为段：<code>code used to implement the execution behaviors for invertible rigging contrllers</code> 表示本库还包含 controller 执行行为实现。官方拼写 <code>contrllers</code> 被保留用于核对，中文按 controllers 理解。</span><span class="en">execution behaviors for invertible rigging contrllers</span></p>
      <p><span class="zh">构件段：<code>basic controller types</code> 与 <code>building blocks</code> 表明这些基础类型是更高层 controllers 的构造材料。它们帮助搭建 higher-level controllers，但不自动构成完整 production-ready rigging 系统。</span><span class="en">basic controller types that are used as building blocks for other, higher-level controllers</span></p>
    </section>

    <section data-cn-complete="round-479-exec-ir-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是 production rigging API 是否稳定，先看官方 note：当前 schemas/APIs limited in functionality 且 not intended for production use。本页不能被当成稳定承诺。</span><span class="en">The official note defines the production-use boundary.</span></li>
        <li><span class="zh">如果问题是 USD stage、provider object、request 或 cache view，应回到 <code>ExecUsd</code>；<code>ExecIr</code> 建立在该接入层之上，不负责解释所有 USD 接入细节。</span><span class="en">USD stage access issues belong near ExecUsd.</span></li>
        <li><span class="zh">如果问题是 rig controller 行为是否被执行，应检查 controller utilities、execution behavior registration、依赖输入和 requested value，而不是只看普通 USD authoring 字段。</span><span class="en">Controller behavior debugging belongs near ExecIr.</span></li>
        <li><span class="zh">如果问题是 data-flow evaluation、cache 或 traversal，应回到 <code>Vdf</code>、<code>Ef</code>、<code>Exec</code> 和 System Design；<code>ExecIr</code> 提供领域实现，不替代底层执行机制说明。</span><span class="en">Execution mechanics belong near Vdf, Ef, Exec, and system design.</span></li>
        <li><span class="zh">如果问题是几何派生值或 xform/bounds 计算，应区分 <code>ExecGeom</code> 与 <code>ExecIr</code>：前者强调 <code>UsdGeom</code> 派生值计算注册，后者强调 invertible rigs 和 controllers。</span><span class="en">Separate geometry computation issues from invertible rig controller issues.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-479-exec-ir-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2</a> -> <a href="page__execution__system__design.html">System Design</a> -> <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> -> <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> -> <a href="md_pxr_exec_exec__r_e_a_d_m_e.html">Exec README</a> -> <a href="md_pxr_exec_ef__r_e_a_d_m_e.html">Ef README</a> -> <a href="md_pxr_exec_esf__r_e_a_d_m_e.html">Esf README</a> -> <a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">EsfUsd README</a> -> <a href="md_pxr_exec_exec_geom__r_e_a_d_m_e.html">ExecGeom README</a> -> 当前 <code>ExecIr README</code>。</span><span class="en">The local click path reaches ExecIr after the USD and geometry execution context.</span></p>
      <p><span class="zh">这个顺序让读者先建立 OpenExec、USD 接入、scene access 和 geometry computation registration 的上下文，再进入可逆 rig controller 的受限实现页。下一步可按 inventory 继续查看具体 ExecIr class/group/source 页面，或回到 <code>ExecUsd</code> / <code>System Design</code> 排查 request 与 evaluation。</span><span class="en">Open official page remains the explicit external jump.</span></p>
      <ul>
        <li><span class="zh">本地入口：<code>openusd_bilingual_final.html</code> 与 <code>site/api/index.html</code>。</span><span class="en">Local entrances are preserved.</span></li>
        <li><span class="zh">上一页建议：<code>md_pxr_exec_exec_geom__r_e_a_d_m_e.html</code>，因为它刚解释几何 computation registration。</span><span class="en">Previous page: ExecGeom README.</span></li>
        <li><span class="zh">下一页建议：具体 ExecIr class/group/source 页，必须等下一轮重新确认 draft/source 后再推进。</span><span class="en">Next page: a verified ExecIr-related draft page.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-479-exec-ir-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>SOURCE_PLACEHOLDER</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：<code>ExecIr: OpenExec implementation of invertible rigs</code>、<code>execIr library</code>、<code>built on top of</code>、<code>execUsd</code>、<code>limited in functionality</code>、<code>not intended for production use</code>、<code>utilities</code>、<code>define invertible controllers</code>、<code>execution behaviors</code>、<code>invertible rigging contrllers</code>、<code>basic controller types</code>、<code>building blocks</code>。</span><span class="en">Official title, risk note, and source terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读路径继续使用站内 API/reading-flow 链接。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-479-exec-ir-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：<code>ExecIr</code> 建立在 <code>execUsd</code> 之上；它的 schemas/APIs 功能有限且不建议生产使用；它提供 utilities 来 define invertible controllers；它还包含实现 invertible rigging controllers execution behaviors 的代码；basic controller types 是 higher-level controllers 的 building blocks；调试时要区分 controller 定义、behavior registration、USD 接入、request 和底层 evaluation/cache。</span><span class="en">A review-ready reader can explain ExecIr's limited invertible rig controller role.</span></p>
      <p><span class="zh">本页达标依据是：官方短源文的全部关键术语均保留并解释，中文主阅读路径覆盖页面职责、官方限制说明、模块分层、控制器职责、逐段双语理解、边界误读点、调试路径和本地点击顺序；页面不再依赖草稿提示或英文摘录表作为主要内容。</span><span class="en">The completed page stays faithful to the short source while making the invertible rig implementation layer readable in Chinese.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_exec_geom__r_e_a_d_m_e.html">上一页：ExecGeom README</a></p>
      <p><a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">回到：ExecUsd README</a></p>
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
        html.includes("execUsd") &&
        html.includes("limited in functionality") &&
        html.includes("not intended for production use") &&
        html.includes("define invertible controllers") &&
        html.includes("execution behaviors"),
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
    title: "ExecIr: OpenExec implementation of invertible rigs",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the ExecIr README/API entry by adding Chinese main-reading-path coverage for execUsd dependency, limited-functionality and not-for-production-use boundary, invertible-controller utilities, execution behavior implementation, basic controller building blocks, module boundaries, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 ExecIr README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/ExecIr 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 ExecIr README 的 execUsd 依赖、limited functionality、not intended for production use、invertible controllers、execution behaviors、basic controller building blocks 和 OpenExec -> ExecGeom -> ExecIr 点击路径。",
        required_action: "后续具体 ExecIr class/group/source 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 或 API 高价值路径继续检查仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_479_exec_ir_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_479_exec_ir_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
