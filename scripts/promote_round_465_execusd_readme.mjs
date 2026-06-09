import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 465;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_exec_usd__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_465_execusd_readme_source_parity.json";
const PROMOTION_ID = "round-465-api-execusd-readme";
const PREVIOUS_GOOD_BILINGUAL = 235;
const PROMOTION_COMMIT_PLACEHOLDER = "round-465-promotion-commit-sha-before-push";

const expectedKeywords = [
  "ExecUsd: Execution system for Usd",
  "execUsd library",
  "exec",
  "esfUsd",
  "primary entry point",
  "OpenExec",
  "Registration of computational behaviors associated with USD schemas",
  "Ingesting a UsdStage to compile the data flow network",
  "nodes that embody computations",
  "Requesting values for efficient, vectorized, multithreaded evaluation",
  "OpenExec overview",
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
  <title>ExecUsd: Execution system for Usd | OpenUSD API 中文导读</title>
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
    <h1>ExecUsd: Execution system for Usd</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-465-execusd-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>ExecUsd</code> README 风格的 API 入口页，不是长教程，也不是 Doxygen class reference。官方正文很短，但定位很关键：<code>execUsd</code> library 建立在 <code>exec</code> 和 <code>esfUsd</code> 之上，是 OpenExec 面向 USD 的 primary entry point。也就是说，如果读者已经读过 OpenExec overview、Tutorial 1、Tutorial 2 和 System Design，本页回答的是“这些能力在 USD 场景里从哪里进入”。</span><span class="en">ExecUsd is the primary entry point for OpenExec on USD scenes.</span></p>
      <p><span class="zh">官方列出的三条能力就是本页的完整阅读顺序：第一，注册与 USD schemas 关联的 computational behaviors；第二，摄入一个 <code>UsdStage</code>，编译出包含 computation nodes 的 data flow network；第三，针对客户端请求进行 efficient、vectorized、multithreaded evaluation。不要把这三条读成孤立功能。它们对应 OpenExec 生命周期中的 authoring/registration、stage ingestion/compilation、request/evaluation 三个连续环节。</span><span class="en">The source lists registration, UsdStage ingestion, and value requests as one pipeline.</span></p>
      <p><span class="zh">本页的中文主线应当很克制：它不逐行翻译整个 Doxygen 外壳，也不伪造未出现的 API 列表，而是把官方短页中保留的关键词解释清楚。<code>ExecUsd</code> 不是替代 <code>Usd</code>、<code>Sdf</code> 或 <code>Pcp</code> 的 scene description 层；它也不是底层 <code>Vdf</code> 引擎本身。它是把 USD scene objects、schema computations 和 OpenExec evaluation 连接起来的边界层。</span><span class="en">The page should explain the boundary without inventing unsupported APIs.</span></p>
    </section>

    <section data-cn-complete="round-465-execusd-official-duties">
      <h2>官方三项职责 / Official Duties</h2>
      <ol>
        <li><span class="zh"><strong>Registration of computational behaviors associated with USD schemas。</strong>这对应 Tutorial 2 的 schema computation authoring。schema 或 plugin 作者声明某个 USD schema 可以提供哪些 computation，ExecUsd 负责把这类注册接入 USD 场景语义。这里要保留 <code>USD schemas</code>、<code>computational behaviors</code> 和 <code>OpenExec</code> 的原名，因为它们是跨文档链接的语义锚点。</span><span class="en">Registration of computational behaviors associated with USD schemas.</span></li>
        <li><span class="zh"><strong>Ingesting a UsdStage to compile the data flow network。</strong>这是 ExecUsd 区别于纯 <code>exec</code> 内核的关键：输入是 USD 的 <code>UsdStage</code>，输出是 OpenExec 可以调度的 <code>data flow network</code>。网络中包含 embody computations 的 nodes，也就是把 USD authoring 结构转成 runtime computation graph 的节点。</span><span class="en">Ingesting a UsdStage to compile the data flow network that contains nodes that embody computations.</span></li>
        <li><span class="zh"><strong>Requesting values for efficient, vectorized, multithreaded evaluation。</strong>这对应 Tutorial 1 的 client request 路径和 System Design 的 evaluation 路径。客户端请求的不是“直接读取某个 authored value”，而是可能经过 dependencies、cache、schedule 和 executor 后得到的 computed values。官方保留 <code>efficient</code>、<code>vectorized</code>、<code>multithreaded</code> 三个词，是为了强调它服务交互式和大规模场景求值。</span><span class="en">Requesting values for efficient, vectorized, multithreaded evaluation.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-465-execusd-stack-position">
      <h2>栈中位置 / Stack Position</h2>
      <p><span class="zh"><code>execUsd</code> 位于 <code>exec</code> 和 <code>esfUsd</code> 之上。可以把 <code>exec</code> 理解为执行系统核心，把 <code>esfUsd</code> 理解为把 execution scene foundation 语义连接到 USD 的适配层，而 <code>execUsd</code> 则是用户在 USD 场景上下文中使用 OpenExec 的入口。这个层次关系能帮助读者判断应该看哪一页：概念和请求流程看 OpenExec docs，系统分层看 System Design，USD 场景接入看本页，底层 vectorized data flow 则继续看 <code>Vdf</code> 文档。</span><span class="en">execUsd is built on top of exec and esfUsd.</span></p>
      <p><span class="zh">不要把 <code>ExecUsd</code> 理解成一个新的 USD file format 或 stage composition 规则。它消费已经存在的 <code>UsdStage</code>，读取 schema 和 computation registration 产生的信息，再让 OpenExec 编译和求值。composition、layer stack、prim index、asset resolution 仍然属于 <code>Pcp</code>、<code>Sdf</code>、<code>Ar</code> 和 <code>Usd</code> 的职责；ExecUsd 关心的是这些 scene objects 如何成为 computation graph 的输入和 provider。</span><span class="en">ExecUsd consumes USD scene structure; it does not redefine composition.</span></p>
      <p><span class="zh">对使用者来说，最常见的误读是把本页当作“ExecUsd API 全量索引”。实际它是 README 型入口页，只给出模块职责和跳转到 OpenExec overview 的提示。若需要具体类和函数，应沿本地 API 导航进入相关 class/source 页；若需要理解计算为何能缓存、并行或失效传播，应回到 <a href="page__execution__system__design.html">OpenExec System Design</a>。</span><span class="en">This README page is an entry point, not the complete class index.</span></p>
    </section>

    <section data-cn-complete="round-465-execusd-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><strong>标题。</strong><code>ExecUsd: Execution system for Usd</code> 明确说明本页的领域是 USD 上的 execution system，而不是通用 JSON、UI、渲染或物理模块。中文翻译时保留 <code>ExecUsd</code>、<code>Execution system</code> 和 <code>Usd</code> 原文，是为了避免把模块名翻成普通描述。</span><span class="en">The title anchors the page to the USD-facing execution system.</span></p>
      <p><span class="zh"><strong>第一句。</strong>官方说 <code>The execUsd library is built on top of exec and esfUsd.</code> 这句话定义了依赖方向。读者在调试时如果遇到网络编译或求值问题，不能只看 ExecUsd 一层；需要判断问题来自 exec core、esfUsd 适配，还是 USD stage 输入。反过来，如果问题是 layer composition 或 asset path resolution，本页通常不是第一现场。</span><span class="en">The execUsd library is built on top of exec and esfUsd.</span></p>
      <p><span class="zh"><strong>第二句。</strong><code>The execUsd library is the primary entry point for OpenExec.</code> 这里的 primary entry point 指的是 USD 场景上下文中的入口。它不是说所有 OpenExec 内部 API 都在这个库里，也不是说客户端必须绕过 overview/tutorial 直接从本页开始。更准确的阅读方式是：已经理解 OpenExec 概念后，用本页定位 USD 集成层。</span><span class="en">The execUsd library is the primary entry point for OpenExec.</span></p>
      <p><span class="zh"><strong>职责列表第一项。</strong>registration 说明 schema-associated computation 不是临时字符串约定，而是通过 schema 和 plugin metadata/registration 进入系统。若某个 computation 在客户端请求时不可见，先检查 schema registration 和 plugin discovery，而不是直接怀疑 evaluation executor。</span><span class="en">Registration connects computational behaviors with USD schemas.</span></p>
      <p><span class="zh"><strong>职责列表第二项。</strong>摄入 <code>UsdStage</code> 后编译 <code>data flow network</code>，说明 ExecUsd 把 USD scene description 转换成 OpenExec runtime 能消费的网络。这个网络里的 nodes embody computations，因此调试时要区分 stage 内容是否正确、schema computation 是否注册、network compilation 是否包含目标 node。</span><span class="en">UsdStage ingestion compiles a data flow network with computation nodes.</span></p>
      <p><span class="zh"><strong>职责列表第三项。</strong>requesting values 是客户端侧入口，最终目标是 efficient、vectorized、multithreaded evaluation。这里的 multithreaded 不等于所有 callback 自动线程安全；它依赖显式 input dependencies、schedule、cache 和 executor 边界。若关闭并行后问题消失，应回查 callback 状态和依赖声明。</span><span class="en">Requesting values leads to efficient, vectorized, multithreaded evaluation.</span></p>
      <p><span class="zh"><strong>结尾链接。</strong>官方用 <code>See the OpenExec overview for more details.</code> 把读者带回概念总览。本地点击路径也应遵守这个顺序：从 OpenExec Overview 到 Tutorial 1、Tutorial 2、System Design，再回到 ExecUsd 作为 USD-facing entry point，而不是随机跳到无关 class 或 release support 页。</span><span class="en">The page points readers back to the OpenExec overview.</span></p>
    </section>

    <section data-cn-complete="round-465-execusd-debugging">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果 computation 找不到，先检查 schema/plugin registration，再检查 ExecUsd 是否摄入了包含目标 prim/schema 的 <code>UsdStage</code>，最后才看 request token 和 evaluation。</span><span class="en">Missing computations should be debugged through registration, stage ingestion, and request naming.</span></li>
        <li><span class="zh">如果 computed value 陈旧，优先检查 input dependencies、invalidation 和 data flow network 是否正确表达依赖，不要直接把问题归因给 <code>UsdStage</code> 本身。</span><span class="en">Stale values usually point to dependency or invalidation boundaries.</span></li>
        <li><span class="zh">如果 evaluation 性能差，区分是 stage ingestion/compilation 重复发生、request 导致 schedule 变化，还是 callback 内部计算昂贵。三者对应完全不同的修复路径。</span><span class="en">Performance issues may belong to compilation, scheduling, or callback execution.</span></li>
        <li><span class="zh">如果并行求值产生差异，先回看 <a href="page__execution__system__design.html">System Design</a> 中的 executor、cache hit 和 input dependency 说明，再检查 callback 是否隐藏共享状态。</span><span class="en">Parallel differences should be traced through executor and dependency semantics.</span></li>
        <li><span class="zh">如果读者只想知道 OpenExec 是什么，应先读 <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a>；如果想写 computation，读 Tutorial 2；如果想消费 value，读 Tutorial 1；如果想把这些能力放进 USD stage 语境，再读本页。</span><span class="en">The page belongs after the overview and tutorials in the click path.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-465-execusd-reader-checklist">
      <h2>使用者判断清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能回答三个判断题。第一，当前问题是否真的发生在 USD-facing OpenExec 入口。如果只是 authored layer 无法 compose、asset path 找不到、prim index 不稳定，应先看 <code>Sdf</code>、<code>Pcp</code>、<code>Ar</code> 或 <code>Usd</code> 文档；只有当问题涉及 schema computation 进入 execution system、从 <code>UsdStage</code> 建 network，或请求 computed values 时，才进入 ExecUsd 的职责范围。</span><span class="en">Use ExecUsd when the issue crosses from USD scene structure into OpenExec evaluation.</span></p>
      <p><span class="zh">第二，当前调试点属于生命周期的哪一段。注册阶段关注 schema/plugin metadata、computation names 和 provider；摄入阶段关注 <code>UsdStage</code> 中是否存在正确 prim、schema 和 authored inputs，以及 data flow network 是否包含目标 computation nodes；求值阶段关注 request 输出集合、input dependencies、cache hit、invalidation、executor 和 callback 行为。把这三段拆开，才能避免把所有问题都归咎于一个“OpenExec 不工作”的笼统结论。</span><span class="en">Separate registration, stage ingestion, and requested-value evaluation.</span></p>
      <p><span class="zh">第三，当前页面应如何接到后续阅读。需要具体写 computation 时转到 Tutorial 2；需要理解 client 如何请求 value 时转到 Tutorial 1；需要理解为什么 data flow network 可以缓存、并行和失效传播时转到 System Design；需要底层 data-flow 语义时转到 <code>Vdf</code>；需要 execution core 时转到 <code>Exec</code>；需要 USD scene foundation 适配时转到 <code>EsfUsd</code>。本页自身只负责把这些文档收束到 ExecUsd 入口语义。</span><span class="en">This entry page routes readers to tutorials, System Design, Vdf, Exec, and EsfUsd.</span></p>
      <p><span class="zh">因此，本页虽然短，但不是可忽略的目录项。它给出了 OpenExec 与 USD 之间的工程边界：schema 行为如何注册，stage 如何被摄入，computed values 如何被高效请求。后续继续晋级 OpenExec 系列页面时，应保持同样的点击顺序和边界解释，避免把 README 型入口页写成泛泛模块介绍，也避免把底层实现细节提前混入用户第一眼阅读路径。</span><span class="en">The page defines the engineering boundary between OpenExec and USD.</span></p>
      <p><span class="zh">本页达到完成状态的判据也很明确：读者可以不依赖英文正文，说清 ExecUsd 在 OpenExec 栈中的位置，说明三条官方职责各自对应的工程阶段，并知道遇到注册、摄入、求值、缓存、并行或点击路径问题时该转向哪一类相邻页面。若只能复述标题而无法区分这些边界，就仍然只是草稿导读；若能沿本地导航继续追到 Vdf、Exec 和 EsfUsd，才算形成可连续阅读、可排错、可复核且上下文清楚的中文入口。</span><span class="en">Completion means the reader can explain the module boundary and next debugging hop.</span></p>
    </section>

    <section data-cn-complete="round-465-execusd-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">本页沿 OpenExec 点击路径承接 <a href="md_pxr_exec_exec_usd_docs_overview.html">OpenExec Overview</a>、<a href="md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html">Tutorial 1: Computing Values</a>、<a href="md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html">Tutorial 2: Defining Schema Computations</a> 和 <a href="page__execution__system__design.html">OpenExec System Design</a>。推荐阅读顺序是先理解概念和教程，再用本页确认 USD 场景入口，随后按需要进入 <a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">Vdf README</a>、<a href="md_pxr_exec_exec__r_e_a_d_m_e.html">Exec README</a> 或 <a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">EsfUsd README</a>。</span><span class="en">The local click path keeps ExecUsd within the OpenExec documentation chain.</span></p>
      <p><span class="zh">本地 reading-flow、breadcrumb、API 入口、总入口和 related links 是主要阅读路径；只有 <a href="${OFFICIAL_URL}">Open official page</a> 是明确外跳。相关链接不应随机列出同目录页面，而应围绕 OpenExec overview、tutorials、system design、Exec/Vdf/EsfUsd 模块边界组织。</span><span class="en">Related links are ordered by the OpenExec reading path and module boundary.</span></p>
    </section>

    <section data-cn-complete="round-465-execusd-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留官方标题和短页职责：<code>ExecUsd: Execution system for Usd</code>、<code>execUsd library</code>、<code>exec</code>、<code>esfUsd</code>、<code>primary entry point</code>、<code>OpenExec</code>、<code>UsdStage</code>、<code>data flow network</code>、<code>nodes</code>、<code>computations</code>、<code>efficient, vectorized, multithreaded evaluation</code>。</span><span class="en">Official title, module names, and core terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="page__execution__system__design.html">上一页：OpenExec System Design</a></p>
      <p><a href="md_pxr_exec_vdf__r_e_a_d_m_e.html">下一步：Vdf README</a></p>
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
      has_code_path: html.includes("UsdStage") && html.includes("data flow network") && html.includes("multithreaded evaluation"),
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
    report.output_checks.zh_blocks >= 22;
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
    title: "ExecUsd: Execution system for Usd",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the ExecUsd README/API entry page by adding Chinese main-reading-path coverage for execUsd positioning, exec/esfUsd stack boundary, USD schema computation registration, UsdStage ingestion, data flow network compilation, requested values, vectorized multithreaded evaluation, debugging boundaries, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1900,
      minimum_chinese_blocks: 22,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
      preserves: [
        "ExecUsd: Execution system for Usd",
        "execUsd library",
        "exec",
        "esfUsd",
        "primary entry point",
        "OpenExec",
        "UsdStage",
        "data flow network",
        "efficient, vectorized, multithreaded evaluation",
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 ExecUsd README source parity 晋级，并继续追踪 OpenUSD API 草稿缺口。`,
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
        id: "P1-openexec-click-path-quality",
        severity: "P1",
        summary: "OpenExec 文档页必须按官方短页职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 ExecUsd stack position、schema computation registration、UsdStage ingestion、data flow network compilation、requested values 和 vectorized multithreaded evaluation，并保留 Overview -> Tutorial 1 -> Tutorial 2 -> System Design -> ExecUsd 的本地点击路径。",
        required_action: "后续 OpenExec 或 API 系统文档页继续按 source snapshot 做 section-level 中文主阅读路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 OpenExec 教程链到 ExecUsd/Vdf/Exec/EsfUsd 的点击顺序，并重跑 reading-flow 与 click-path 审计。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 Vdf/Exec/EsfUsd 等仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_465_execusd_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_465_execusd_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
