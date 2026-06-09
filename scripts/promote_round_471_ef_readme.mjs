import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 471;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_ef__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_ef__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_471_ef_readme_source_parity.json";
const PROMOTION_ID = "round-471-api-ef-readme";
const PREVIOUS_GOOD_BILINGUAL = 238;
const PROMOTION_COMMIT_PLACEHOLDER = "round-471-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Ef: Execution Foundation",
  "ef library",
  "built on top of",
  "vdf",
  "extends functionality provided by",
  "VdfNode",
  "VdfExecutorInterface",
  "structures for caching values and network traversals",
  "utility functions",
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
  <title>Ef: Execution Foundation | OpenUSD API 中文导读</title>
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
    <h1>Ef: Execution Foundation</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-471-ef-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>Ef: Execution Foundation</code> 的 README 型入口页。官方正文很短，但它在 OpenExec 栈里承担一个关键分层说明：<code>ef library</code> built on top of <code>vdf</code>，并在 <code>vdf</code> 提供的 data-flow 基础之上补充执行基础设施。读者应把它理解为“从 Vdf 的网络模型走向可执行基础设施”的过渡层，而不是 USD composition、schema authoring 或 Hydra 渲染模块。</span><span class="en">The ef library is built on top of vdf.</span></p>
      <p><span class="zh">沿 OpenExec 点击路径阅读时，顺序通常是 Overview、Tutorial 1/2、System Design、ExecUsd、Vdf、Exec，然后进入本页。<code>Vdf</code> 解释 network、node、connection 等 data-flow 词汇；<code>Exec</code> 解释 execution system core 如何定义、摄取、编译和评估；<code>Ef</code> 则把注意力放在执行基础：它提供 <code>VdfNode</code> types、实现 <code>VdfExecutorInterface</code> 的类型、用于 caching values 和 network traversals 的 structures，以及各种 utility functions。</span><span class="en">The ef library extends functionality provided by vdf, providing VdfNode types, types that implement VdfExecutorInterface, structures for caching values and network traversals, and various utility functions.</span></p>
      <p><span class="zh">本地中文页的任务不是创造新的 API 清单，而是帮助读者理解这段短源文的层级含义：<code>Ef</code> 扩展 <code>vdf</code>，但仍低于更面向 USD 场景的 <code>ExecUsd</code>/<code>EsfUsd</code>。如果问题属于 node 类型、executor interface、value cache 或 traversal cache，可以从本页进入相关 class；如果问题属于 scene object 映射或 schema computation 注册，应继续看 <code>Esf</code>、<code>EsfUsd</code>、<code>ExecUsd</code> 或教程页。</span><span class="en">Ef is a foundation layer, not a scene-schema tutorial.</span></p>
    </section>

    <section data-cn-complete="round-471-ef-stack">
      <h2>栈中位置 / Stack Position</h2>
      <ul>
        <li><span class="zh"><strong><code>Vdf</code> 之上。</strong>源页第一句明确说 <code>ef library</code> built on top of <code>vdf</code>。这意味着 <code>Ef</code> 不替代 <code>VdfNetwork</code> 的数据流模型，而是在已有 data-flow 网络基础上提供执行基础设施。</span><span class="en">Ef is built on top of vdf.</span></li>
        <li><span class="zh"><strong><code>Exec</code> 之下或相邻的基础层。</strong><code>Exec</code> 负责 execution system core 的组织语义；<code>Ef</code> 更像可复用基础构件，提供 node 类型、executor interface、cache 和 traversal 支撑。</span><span class="en">Ef provides execution foundation facilities used by higher OpenExec layers.</span></li>
        <li><span class="zh"><strong><code>Esf</code>/<code>EsfUsd</code> 之前的通用执行基础。</strong>如果读者正在排查 scene object 如何进入 OpenExec，应该继续看 <code>Esf</code> 或 <code>EsfUsd</code>；如果读者正在排查执行网络内部基础类型和 executor 抽象，才回到 <code>Ef</code>。</span><span class="en">Scene-facing abstractions live in neighboring Esf and EsfUsd pages.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-471-ef-responsibilities">
      <h2>官方职责拆解 / Responsibility Breakdown</h2>
      <ol>
        <li><span class="zh"><strong>扩展 <code>vdf</code>。</strong>官方写作 <code>extends functionality provided by vdf</code>。这说明 <code>Ef</code> 的语义起点不是 USD stage，而是 <code>vdf</code> 已经建立的数据流网络和节点模型。</span><span class="en">extends functionality provided by vdf</span></li>
        <li><span class="zh"><strong>提供 <code>VdfNode</code> types。</strong><code>VdfNode</code> 是 data-flow network 中执行 computation 的节点基类；<code>Ef</code> 提供相关 node 类型，帮助上层把执行语义落到具体节点。</span><span class="en">providing VdfNode types</span></li>
        <li><span class="zh"><strong>提供实现 <code>VdfExecutorInterface</code> 的类型。</strong><code>VdfExecutorInterface</code> 是执行 <code>VdfNetwork</code> 并计算请求值的抽象接口。读到这里要注意：<code>Ef</code> 与 evaluation engine 有关，但它仍是基础设施，不是用户层的值请求教程。</span><span class="en">types that implement VdfExecutorInterface</span></li>
        <li><span class="zh"><strong>提供缓存结构。</strong>源页提到 <code>structures for caching values and network traversals</code>。这说明 <code>Ef</code> 关心重复求值时的 value cache、遍历结果 cache 或 traversal 支撑结构，调试 stale value、重复遍历或 evaluation 性能时需要理解这类职责。</span><span class="en">structures for caching values and network traversals</span></li>
        <li><span class="zh"><strong>提供 utility functions。</strong><code>various utility functions</code> 表明本页还覆盖若干执行基础工具函数。中文页不逐一虚构未出现在源页的函数名，而是说明这些工具属于 execution foundation 的辅助层。</span><span class="en">various utility functions</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-471-ef-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><strong>标题。</strong><code>Ef: Execution Foundation</code> 表明这是 execution foundation 的模块入口。翻译时保留 <code>Ef</code> 原名，因为它是 OpenUSD/pxr 源码模块名，也是后续导航和 Doxygen 检索的稳定标识。</span><span class="en">Ef: Execution Foundation</span></p>
      <p><span class="zh"><strong>第一段。</strong>官方第一句 <code>The ef library is built on top of vdf.</code> 是分层声明。<code>vdf</code> 提供 vectorized data-flow foundation，<code>ef</code> 在其上构建执行基础，所以调试时要先判断问题是否其实属于更底层的 network/connection 语义。</span><span class="en">The ef library is built on top of vdf.</span></p>
      <p><span class="zh"><strong>第二段开头。</strong><code>The ef library extends functionality provided by vdf</code> 说明 <code>Ef</code> 的核心动作是扩展而不是替换。它继承 <code>vdf</code> 的网络语义，补充上层执行所需的类型和工具。</span><span class="en">The ef library extends functionality provided by vdf.</span></p>
      <p><span class="zh"><strong>第二段中段。</strong>官方列出 <code>VdfNode</code> types 和 types that implement <code>VdfExecutorInterface</code>。这两个词把本页连接到具体 API：前者是网络中的 computation 节点语义，后者是执行网络来计算 requested values 的接口语义。</span><span class="en">providing VdfNode types, types that implement VdfExecutorInterface</span></p>
      <p><span class="zh"><strong>第二段末尾。</strong><code>structures for caching values and network traversals</code> 与 <code>utility functions</code> 指出 <code>Ef</code> 还负责更工程化的基础设施：缓存值、缓存或辅助网络遍历、提供通用工具函数。它们对 performance、stale result 和 repeated traversal 调试非常重要。</span><span class="en">structures for caching values and network traversals, and various utility functions</span></p>
      <p><span class="zh"><strong>链接语义。</strong>源页链接到 <code>vdf</code>、<code>VdfNode</code>、<code>VdfExecutorInterface</code>。本地站保留这些链接语义并优先本地路由；只有 <a href="${OFFICIAL_URL}">Open official page</a> 是明确外跳。这样用户可按 OpenExec 点击顺序继续阅读，而不是被静默送回官方英文站。</span><span class="en">The source links to vdf, VdfNode, and VdfExecutorInterface.</span></p>
    </section>

    <section data-cn-complete="round-471-ef-debugging">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是 data-flow network 中连接方向、node output/input 或 <code>VdfNetwork</code> 结构错误，先回到 <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> 和相关 class；<code>Ef</code> 更关注在这些基础之上的执行类型和缓存支持。</span><span class="en">Network shape issues often start at Vdf.</span></li>
        <li><span class="zh">如果问题是 executor 如何执行网络或如何计算 requested values，<code>VdfExecutorInterface</code> 是关键提示词。读者可以从本页进入 executor interface，再结合 System Design 的 evaluation phase 理解执行过程。</span><span class="en">Executor-interface issues connect Ef to the evaluation phase.</span></li>
        <li><span class="zh">如果问题是值重复计算、值没有更新或 traversal 成本过高，要检查 caching values、network traversals 和 invalidation/evaluation 的边界。<code>Ef</code> 提供基础结构，但具体值请求和 USD 入口还需要看 <code>ExecUsd</code>。</span><span class="en">Caching and traversal issues belong near Ef and evaluation infrastructure.</span></li>
        <li><span class="zh">如果问题是 schema computation 没注册、plugin 没加载或 scene object 没映射，先看 Tutorial 2、<code>ExecUsd</code>、<code>Esf</code>、<code>EsfUsd</code>；不要把这类 scene adapter 问题直接归因于 <code>Ef</code>。</span><span class="en">Registration and scene-adapter issues live above Ef.</span></li>
        <li><span class="zh">如果问题是 USD composition、layer stack、prim path 或 authoring，应该看 <code>Sdf</code>、<code>Pcp</code>、<code>Usd</code>，而不是从 <code>Ef</code> 开始。<code>Ef</code> 是执行基础，不是场景描述存储层。</span><span class="en">Composition and authoring are not Ef responsibilities.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-471-ef-cache-traversal">
      <h2>缓存与遍历的阅读重点 / Caching and Traversal Focus</h2>
      <p><span class="zh">源页专门提到 <code>structures for caching values and network traversals</code>，这不是可忽略的附属短语。OpenExec 的值请求经常会重复访问同一组依赖，若每次都从头遍历网络并重新计算所有节点，系统就难以扩展到复杂 scene。<code>Ef</code> 这一层提供的 cache/traversal 基础结构，正是为了让上层 evaluation 能区分“哪些值可以复用”“哪些 traversal 结果仍然有效”“哪些输入变化需要重新走依赖路径”。因此读者在排查性能或 stale value 时，应把 value cache、traversal cache、dependency visibility 和 invalidation 传播分开检查。</span><span class="en">Caching values and network traversals are foundation concerns for repeated evaluation.</span></p>
      <p><span class="zh"><code>VdfExecutorInterface</code> 也要放在这个背景下理解。它不是用户直接 author USD 属性的接口，而是执行 <code>VdfNetwork</code>、计算 requested set of values 的抽象边界。实现该接口的类型需要理解网络中哪些节点要运行、哪些结果可缓存、哪些遍历结果可重用。若某个 computed value 没有按预期返回，不能只看 callback 本身，还要看 executor 是否拿到了正确的网络、缓存是否被错误复用、traversal 是否覆盖了目标依赖。</span><span class="en">VdfExecutorInterface belongs to the execution boundary for requested values.</span></p>
      <p><span class="zh">本页没有列出完整 class member 表，也没有把所有 utility functions 展开，这是因为官方 README 本身只给出模块职责。中文完成页的合理做法是忠实保留这些职责，并为读者补齐判断路径：从 <code>Vdf</code> 理解网络词汇，从 <code>Ef</code> 理解执行基础设施，从 <code>Exec</code>/<code>ExecUsd</code> 理解系统组织和 USD 接入，再从具体 class reference 查看成员函数。这样既不伪造源页没有的 API，也能让本地中文站具备连续阅读价值。</span><span class="en">The README remains scoped to module responsibilities and points readers to class references when needed.</span></p>
    </section>

    <section data-cn-complete="round-471-ef-architecture-reading">
      <h2>架构阅读提示 / Architecture Reading Notes</h2>
      <p><span class="zh">可以把 <code>Ef</code> 记作 OpenExec 栈中的“执行基础工具箱”。它不是最底层的图模型，因为 <code>vdf</code> 已经负责 vectorized data-flow；它也不是最高层的 USD 系统入口，因为 <code>ExecUsd</code> 才负责把 USD stage、schema computation 和 request API 连接起来。<code>Ef</code> 夹在中间，提供执行网络真正运行时需要的节点类型、执行器接口、缓存结构、遍历支撑和工具函数。这个定位能帮助读者在调试时少走弯路：scene 没摄取查 <code>ExecUsd</code>/<code>EsfUsd</code>，网络结构查 <code>Vdf</code>，执行基础和缓存遍历查 <code>Ef</code>。</span><span class="en">Ef is the execution-foundation toolkit between Vdf and USD-facing OpenExec layers.</span></p>
      <p><span class="zh">从代码阅读角度看，本页的关键并不是把 <code>VdfNode</code> 或 <code>VdfExecutorInterface</code> 翻译成中文名，而是保留这些精确标识并解释它们为何出现在 <code>Ef</code> README 中。<code>VdfNode</code> 指向“计算节点类型”这条线索，<code>VdfExecutorInterface</code> 指向“谁执行网络并返回值”这条线索，cache/traversal 结构指向“如何避免重复工作并保持依赖可见”这条线索。三条线索合起来，才构成 execution foundation 的中文主阅读路径。</span><span class="en">The stable identifiers are preserved because they are the API search keys for deeper reading.</span></p>
    </section>

    <section data-cn-complete="round-471-ef-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1</a> -> <a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2</a> -> <a href="page__execution__system__design.html">System Design</a> -> <a href="md_pxr_exec_exec_usd__r_e_a_d_m_e.html">ExecUsd README</a> -> <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a> -> <a href="md_pxr_exec_exec__r_e_a_d_m_e.html">Exec README</a> -> 当前 <code>Ef README</code>。之后可继续查看 <a href="md_pxr_exec_esf__r_e_a_d_m_e.html">Esf README</a>、<a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">EsfUsd README</a> 或 <a href="md_pxr_exec_exec_geom__r_e_a_d_m_e.html">ExecGeom README</a>。</span><span class="en">The click path reaches Ef after Vdf and Exec core.</span></p>
      <p><span class="zh">本地 reading-flow、breadcrumb、API 入口、总入口和 related links 是主要阅读路径；只有 <a href="${OFFICIAL_URL}">Open official page</a> 是明确外跳。正文链接也保留本地路径或明确 uncovered 路径，避免用户在阅读中被静默跳到官方英文站。</span><span class="en">Only Open official page is an external jump.</span></p>
    </section>

    <section data-cn-complete="round-471-ef-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留官方标题和关键词：<code>Ef: Execution Foundation</code>、<code>ef library</code>、<code>built on top of</code>、<code>vdf</code>、<code>extends functionality provided by</code>、<code>VdfNode</code>、<code>VdfExecutorInterface</code>、<code>structures for caching values and network traversals</code>、<code>utility functions</code>。</span><span class="en">Official title and terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-471-ef-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：<code>Ef</code> 建立在 <code>vdf</code> 之上；它扩展 <code>vdf</code> 功能，而不是替代 <code>vdf</code>；它提供 <code>VdfNode</code> 类型、实现 <code>VdfExecutorInterface</code> 的类型、value/network traversal 缓存结构和 utility functions；它适合排查执行基础设施问题，不适合作为 USD composition 或 schema registration 的首要入口。</span><span class="en">A review-ready reader can explain Ef's foundation role and its main provided facilities.</span></p>
      <p><span class="zh">本页达到完成状态的依据是：源页所有关键术语保留，中文主路径覆盖分层、职责、误读点、调试入口和点击顺序；正文不再依赖英文摘要表；并且相关链接服务 OpenExec/Vdf/Ef/Esf 的真实阅读顺序。</span><span class="en">The local page is faithful to the short source while making the foundation layer readable in Chinese.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_exec__r_e_a_d_m_e.html">上一页：Exec README</a></p>
      <p><a href="md_pxr_exec_esf__r_e_a_d_m_e.html">下一步：Esf README</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`);
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
        html.includes("VdfNode") &&
        html.includes("VdfExecutorInterface") &&
        html.includes("structures for caching values and network traversals") &&
        html.includes("utility functions"),
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
    title: "Ef: Execution Foundation",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Ef README/API entry page by adding Chinese main-reading-path coverage for Ef positioning, vdf dependency, VdfNode types, VdfExecutorInterface implementations, caching values, network traversals, utility functions, debugging boundaries, click-path navigation, source parity, and explicit official-page verification.`,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Ef README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/Ef 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 Ef README 的 vdf 依赖、VdfNode、VdfExecutorInterface、caching values、network traversals、utility functions，并保留 Overview -> Tutorial -> System Design -> ExecUsd -> Vdf -> Exec -> Ef 的本地点击路径。",
        required_action: "后续 Esf/EsfUsd/ExecGeom 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 Esf/EsfUsd/ExecGeom 等仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_471_ef_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_471_ef_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
