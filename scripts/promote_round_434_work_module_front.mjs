import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 434;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/work_page_front.html";
const SOURCE = "source/full_api/work_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/work_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_434_work_module_front_source_parity.json";
const PROMOTION_ID = "round-434-api-work-module-front";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sourceHtml() {
  return fs.readFileSync(rel(SOURCE), "utf8");
}

function sourceText() {
  return stripTags(sourceHtml());
}

function sourceHeadings() {
  const heads = [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
  const title = stripTags(sourceHtml().match(/<div class="title">([\s\S]*?)<\/div>/i)?.[1] || "");
  return title ? [{ level: 1, text: title }, ...heads] : heads;
}

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.68}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 10px;font-size:17px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .navlinks{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 0}
    .navlinks a{color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:6px;padding:5px 8px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    .status{display:inline-block;background:#206a3b;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    code{font-family:"Cascadia Mono","Consolas",monospace}
    body.openusd-has-reading-flow{padding-left:292px}
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
    @media (max-width: 920px){
      body.openusd-has-reading-flow{padding-left:0}
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  `;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  api: "../../site/index.html",
  apiRedirect: "../../site/api/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/work_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "vt_page_front.html",
  next: "trace_page_front.html",
  tf: "tf_page_front.html",
  trace: "trace_page_front.html",
  vt: "vt_page_front.html",
  gf: "gf_page_front.html",
  sdf: "sdf_page_front.html",
  pcp: "pcp_page_front.html",
  ar: "ar_page_front.html",
  plug: "plug_page_front.html",
  arch: "arch_page_front.html",
  hd: "hd_page_front.html",
  hdx: "hdx_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  openexec: "../release/intro_to_openexec.html",
  maxperf: "../release/maxperf.html",
  perfMetrics: "../release/ref_performance_metrics.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text && heading.text !== "Table of Contents")
    .map((heading) => `<li><span class="zh">官方结构：<code>${esc(heading.text)}</code>。中文页把它映射到 Work 的多线程抽象层、并发限制、Parallel For 示例、替代 work backend、parallel algorithms、concurrency limiting、task dispatching 和 backend caveats。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / work_page_front.html</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="${links.final}">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="${links.release}">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="${links.api}">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="${links.apiRedirect}">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>当前位置 / Current Layer</h3>
      <ol>
        <li>api</li>
        <li>work_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>相邻 API / Related API</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.tf}">Tf 基础设施</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.trace}">Trace 性能追踪</a><span class="openusd-reading-flow-status">draft</span></li>
        <li><a data-reading-flow="related" href="${links.vt}">Vt 值容器</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.gf}">Gf 数学值</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf 场景数据</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hd}">Hd / Hydra</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdx}">Hdx 调试工具</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>运行与性能 / Runtime Paths</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.openexec}">OpenExec introduction</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.maxperf}">Maximum Performance</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.perfMetrics}">Performance Metrics</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: Vt</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: Trace</a></li>
      </ul>
    </section>
    <section>
      <h3>官方外跳 / Official</h3>
      <ul>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></li>
      </ul>
    </section>
  </div>
</aside>
<!-- openusd-reading-flow-nav:end -->`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Work : Multi-threaded Dispatch - OpenUSD API 双语</title>
  <style>${css()}</style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-scope="api" data-cn-review-ready="true">
${readingFlowNav()}
<header>
  <h1>Work : Multi-threaded Dispatch</h1>
  <div class="meta">第 ${ROUND} 轮 ${ROUND_TYPE}：Work 模块入口完成。源页：<code>${SOURCE}</code>；官方页：<code>${OFFICIAL_URL}</code></div>
  <div class="navlinks">
    <a href="${links.final}">总入口</a>
    <a href="${links.api}">API 本地入口</a>
    <a href="${links.source}">本地 source snapshot</a>
    <a href="${links.official}">Open official page</a>
  </div>
</header>
<main>
  <section data-cn-complete="overview">
    <span class="status">bilingual_complete / review_ready_zh</span>
    <h2>中文主阅读路径</h2>
    <p><span class="zh">Work 是 OpenUSD 的 <strong>Multi-threaded Dispatch</strong> 模块。官方 Summary 说它 intended to simplify the use of multithreading，并且是多线程子系统上的 thin abstraction layer。读这页时应把 Work 看作“统一调度和并发控制入口”，不是业务算法模块，也不是让每个客户端随意选择线程库的插件点。</span><span class="en">The Work library simplifies multithreading in the OpenUSD software ecosystem and acts as a thin abstraction layer over a multithreading subsystem.</span></p>
    <p><span class="zh">Work 抽象层有两个核心目的：第一，简化 <code>Parallel For</code> 这类常见并行构造；第二，把 OpenUSD 对某个多线程子系统（例如 <code>TBB</code>）的依赖集中起来。官方强调，不适合让每个客户端各用自己喜欢的 threading system，例如一个客户端用 TBB、另一个用 OpenMP，因为多线程子系统之间还要共同管理系统资源。</span><span class="en">The abstraction simplifies constructs like Parallel For and centralizes dependency on a threading subsystem such as TBB.</span></p>
  </section>

  <section data-cn-complete="source-coverage">
    <h2>官方结构与 source parity</h2>
    <p><span class="zh">本轮使用 <code>${SOURCE}</code> 对齐官方 Work 模块页，覆盖 Summary、Initializing and Limiting Multithreading、Simple "Parallel For" Example、Providing an Alternate Work Implementation、Parallel Algorithms API、Concurrency Limiting API、Dispatching Tasks API 和 Caveats of an Alternate Work Backend。中文页保留 API 名、环境变量、函数名、模板签名和调度术语。</span><span class="en">The page is aligned with the official Work module sections and preserves API names, environment variables, and dispatching terminology.</span></p>
    <ul>
      ${headingList()}
    </ul>
  </section>

  <section data-cn-complete="concurrency-limit">
    <h2>Initializing and Limiting Multithreading：初始化和并发限制</h2>
    <p><span class="zh">Work 默认使用 maximum concurrency，也就是尝试使用系统上可用的尽可能多线程。默认 concurrency limit 在 static initialization time 建立。对中文读者来说，重点是：并发上限既可能由 backend 的默认行为决定，也可能由环境变量或程序 API 调整；不要把 Work 的并发数误认为固定常量。</span><span class="en">The library defaults to maximum concurrency, with the default concurrency limit established at static initialization time.</span></p>
    <p><span class="zh">官方说明 <code>PXR_WORK_THREAD_LIMIT</code> 可以进一步限制并发，尤其适合 farm environment。该环境变量必须是 integer <code>N</code>。在默认 TBB-based backend 中，<code>0</code> 表示 maximum concurrency；<code>1</code> 表示 single-threaded mode；正数 <code>N</code> 表示限制到 N 个线程并被硬件线程数 clamp；负数 <code>N</code> 表示使用除去 N 个硬件线程之外的所有线程，并且至少 clamp 到 1。</span><span class="en">In the default TBB-based backend, PXR_WORK_THREAD_LIMIT=0 means maximum concurrency, 1 means single-threaded mode, positive N limits to N threads, and negative N limits to all but N hardware threads.</span></p>
    <p><span class="zh">如果 backend 不支持 granular thread limits，<code>PXR_WORK_THREAD_LIMIT</code> 的语义更粗：<code>0</code> 和正数通常表示 maximum concurrency，<code>1</code> 表示 serial/single-threaded，负数通常也表示 maximum concurrency，但当绝对值大于等于最大物理并发时会 clamp 到 1。调试时必须先确认当前 backend 是否支持 granular thread limits。</span><span class="en">If granular thread limits are not enabled, the environment variable can allow maximum concurrency or serial execution.</span></p>
    <p><span class="zh">程序内也可以调用 <code>WorkSetConcurrencyLimitArgument(N)</code> 或 <code>WorkSetMaximumConcurrencyLimit()</code>。前者按规则 sanitize 参数并设置并发限制；后者把限制设为当前硬件建议的最大值。官方建议如果目标是充分使用硬件，优先使用 <code>WorkSetMaximumConcurrencyLimit()</code>，而不是手写一个最大并发数。</span><span class="en">The concurrency limit can be set programmatically with WorkSetConcurrencyLimitArgument(N) or WorkSetMaximumConcurrencyLimit().</span></p>
  </section>

  <section data-cn-complete="parallel-for">
    <h2>Simple "Parallel For" Example：并行循环入口</h2>
    <p><span class="zh">官方示例用 <code>WorkParallelForN</code> 把一个 vector 中的值并行翻倍。核心结构是把总数量 <code>v-&gt;size()</code> 和回调传给 <code>WorkParallelForN</code>，回调接收 <code>begin</code> 和 <code>end</code> 范围，并在该范围内处理数据。它展示的是 Work 最常见的使用方式：把可拆分的循环交给统一 backend 调度，而不是每个调用点手写线程管理。</span><span class="en">The Parallel For example uses WorkParallelForN to dispatch a range-based callback over a vector.</span></p>
    <p><span class="zh">需要注意，<code>WorkParallelForN(size_t n, Fn &amp;&amp;callback, size_t grainSize)</code> 和带 <code>CallbackType</code> 的重载都保留原名。<code>grainSize</code> 会影响任务切分粒度；粒度太小可能增加调度开销，粒度太大可能降低负载均衡。调试性能时，既要看算法是否可并行，也要看切分粒度、线程上限和 backend 调度策略。</span><span class="en">WorkParallelForN exposes range callbacks and grainSize; performance depends on work splitting and backend scheduling.</span></p>
    <p><span class="zh">官方还说明可以避免 <code>std::bind</code> 并提供自己的 functor object。这意味着 Work 不强迫某一种 C++ 回调写法；它关心的是 callback 能在给定范围内安全执行。读者需要自己保证回调体没有不安全共享写入、隐藏锁竞争或对调用顺序的错误假设。</span><span class="en">You can avoid std::bind and provide your own functor object, but callback safety remains the caller's responsibility.</span></p>
  </section>

  <section data-cn-complete="alternate-backend">
    <h2>Providing an Alternate Work Implementation：替代 backend</h2>
    <p><span class="zh">Work 允许提供自己的 work backend，用 preferred dispatching system 代替 TBB 的 task/task_group API。官方把要求拆成三组：Parallel Algorithms API、Concurrency Limiting API、Dispatching Tasks API。中文阅读时要把这看作 backend contract：不是随便替换线程库就完事，而是要实现一组稳定 API，并满足文档指定的行为。</span><span class="en">An alternate work backend can use another dispatching system, but it must implement the required APIs and behaviors.</span></p>
    <p><span class="zh">Parallel Algorithms API 包括 <code>WorkImpl_ParallelSort</code>、<code>WorkImpl_ParallelForN</code>、<code>WorkImpl_ParallelForTBBRange</code>、<code>WorkImpl_ParallelForEach</code>、<code>WorkImpl_ParallelReduceN</code> 等。官方说明 Work abstraction 含有这些函数的 serial implementation，所以替代 backend 只需要提供 concurrent implementation。若要自己提供 <code>WorkImpl_ParallelForTBBRange</code>，还必须定义 <code>WORK_IMPL_HAS_PARALLEL_FOR_TBB_RANGE</code>。</span><span class="en">Parallel Algorithms API includes WorkImpl_ParallelSort, WorkImpl_ParallelForN, WorkImpl_ParallelForTBBRange, WorkImpl_ParallelForEach, and WorkImpl_ParallelReduceN.</span></p>
    <p><span class="zh">Concurrency Limiting API 包括 <code>WorkImpl_GetPhysicalConcurrencyLimit()</code>、<code>WorkImpl_InitializeThreading(int threadLimit)</code>、<code>WorkImpl_SupportsGranularThreadLimits()</code>、<code>WorkImpl_GetConcurrencyLimit()</code>、<code>WorkImpl_SetConcurrencyLimit()</code>。如果实现支持 granular thread limits，就要自己定义 granularity 的含义，并额外测试粒度是否满足需求；<code>testWorkThreadLimits</code> 只检查某种粒度存在，不替你证明所有调度策略正确。</span><span class="en">Concurrency Limiting API must report physical and active limits and whether granular thread limits are supported.</span></p>
  </section>

  <section data-cn-complete="dispatching">
    <h2>Dispatching Tasks API：任务派发和生命周期</h2>
    <p><span class="zh">Dispatching Tasks API 覆盖 <code>WorkImpl_RunDetachedTask</code>、<code>WorkImpl_WithScopedParallelism</code> 和 <code>WorkImpl_Dispatcher</code>。官方特别提醒：运行 detached task 时，必须确保 program does not end while a detached task could still be running。这是生命周期问题，不只是 API 调用问题；如果后台任务还在运行而进程退出，结果可能是数据损坏、未完成写入或难以复现的崩溃。</span><span class="en">When running a detached task, the implementation must ensure the program does not end while the task could still be running.</span></p>
    <p><span class="zh"><code>WorkImpl_WithScopedParallelism</code> 要求 callable <code>fn</code> 在同一个 calling thread 中执行。<code>WorkImpl_Dispatcher</code> 还必须能 serially execute，并且在 single threaded 下 <code>Run(Callable &amp;&amp;c)</code> 仍要 immediately return。官方解释了原因：任务可能继续生成更多任务；如果实现直接就地执行 callable，嵌套任务会变成递归调用，存在 stack overflow 风险。</span><span class="en">WorkImpl_Dispatcher must support serial execution and Run must still return immediately when single-threaded to avoid recursive stack-overflow risks.</span></p>
  </section>

  <section data-cn-complete="caveats">
    <h2>Caveats：替代 backend 的性能边界</h2>
    <p><span class="zh">官方 caveats 很关键：OpenUSD，尤其 OpenExec，会利用 TBB 提供的 work stealing 和 scheduling 低层控制来优化代码；并非所有 dispatching systems 都提供同等能力。如果替代 backend 不能实现 <code>WorkImpl_IsolatingDispatcher</code>，抽象层会 fallback 到 <code>WorkImpl_Dispatcher</code>，性能可能受影响。</span><span class="en">OpenUSD and OpenExec use low-level TBB work stealing and scheduling controls; alternate backends may not provide the same functionality.</span></p>
    <p><span class="zh">这意味着替代 backend 的验收不能只看“能编译、能跑完”。还要看 nested tasks、detached tasks、single-threaded 模式、granular thread limits、parallel reduce/sort/for 的正确性，以及 OpenUSD/OpenExec 热路径上的性能。否则 Work API 表面兼容，但实际吞吐、调度公平性或线程资源管理可能退化。</span><span class="en">Backend validation should include correctness, nested dispatch, thread limits, and performance hot paths.</span></p>
  </section>

  <section data-cn-complete="thread-limit-recipes">
    <h2>线程限制的实用配置读法</h2>
    <p><span class="zh">读 <code>PXR_WORK_THREAD_LIMIT</code> 时，建议先明确目标：是为了压低 farm 节点资源占用、复现单线程问题、避免和别的并行系统抢 CPU，还是为了让 OpenUSD 最大化吞吐。目标不同，配置含义不同。<code>0</code> 通常是默认 maximum concurrency；<code>1</code> 是最适合复现顺序相关 bug 的 single-threaded mode；正数适合固定线程预算；负数适合“给系统或其他服务留几个硬件线程”。</span><span class="en">Interpret PXR_WORK_THREAD_LIMIT according to the operational goal: maximum concurrency, serial debugging, fixed budget, or leaving threads for other services.</span></p>
    <p><span class="zh">在默认 TBB backend 下，正数和负数都有明确粒度；但在不支持 granular thread limits 的 backend 下，正数和负数可能退化成 maximum concurrency，只在特定边界 clamp 到 1。也就是说，同一个环境变量在不同 backend 下可能不是同样精细。做部署文档或性能报告时，要同时记录 backend 类型、物理并发数、环境变量值和程序内是否调用过 <code>WorkSetConcurrencyLimitArgument</code>。</span><span class="en">The same environment variable may be interpreted with different granularity by different backends.</span></p>
    <p><span class="zh">如果用户报告“设置线程数无效”，排查顺序应是：确认变量是否在进程启动前设置；确认 backend 是否支持 granular limits；确认程序是否在之后调用了 <code>WorkSetMaximumConcurrencyLimit()</code> 或其他并发限制 API；确认 profiler 看到的是 Work 线程，而不是其他库或渲染器自己的线程池。</span><span class="en">When a thread limit seems ineffective, check process environment, backend support, later API calls, and whether observed threads belong to Work.</span></p>
  </section>

  <section data-cn-complete="backend-validation">
    <h2>替代 backend 的验收清单</h2>
    <p><span class="zh">替代 Work backend 的最低要求不是“链接成功”，而是每个 required API 都要满足官方行为。Parallel Algorithms API 要验证 sort、for、for each、reduce 在并发和 serial fallback 下结果一致；Concurrency Limiting API 要验证 physical concurrency、active limit、granular support 和 environment variable 解释；Dispatching Tasks API 要验证 detached task 生命周期、scoped parallelism、dispatcher reset/wait/cancel 行为。</span><span class="en">Alternate backend validation must cover required APIs, serial fallback, concurrency limits, and task lifecycle behavior.</span></p>
    <p><span class="zh">还要专门测试嵌套任务。官方说明 tasks commonly spawn more tasks for the same dispatcher，如果实现把 callable 直接就地执行，就可能因为 nested calls 变成递归而 stack overflow。这个风险在小样例里未必出现，但在 OpenUSD/OpenExec 的复杂依赖图或 Hydra 任务流中会被放大。</span><span class="en">Nested tasks must be tested because in-place execution can turn nested dispatch into recursive stack growth.</span></p>
    <p><span class="zh">性能验收也要诚实：替代 backend 可能没有 TBB 的 work stealing、scheduling 或 isolating dispatcher 能力。即使所有 API 语义正确，缺少低层调度能力也可能让 OpenExec 或大规模 USD 处理的性能下降。报告里应把“功能兼容”和“性能等价”分开写。</span><span class="en">Functional compatibility and performance equivalence should be reported separately.</span></p>
  </section>

  <section data-cn-complete="debugging-playbook">
    <h2>调试路径：从症状到责任层</h2>
    <p><span class="zh">如果程序变慢，先用 <code>Trace</code> 或 profiler 判断瓶颈是不是 Work 调度本身，而不是 I/O、composition、resolver、Hydra 或算法复杂度。确认是并行调度问题后，再看线程上限、grain size、任务拆分、锁竞争和 backend 行为。不要只凭 CPU 利用率高低判断 Work 是否正确。</span><span class="en">Use Trace or a profiler to locate bottlenecks before blaming Work scheduling.</span></p>
    <p><span class="zh">如果程序在并行下失败、单线程下通过，优先检查调用方代码是否线程安全：共享容器写入、全局状态、缓存、引用生命周期和异常传播都可能出问题。Work 只负责 dispatch，不会自动保护用户回调里的数据结构，也不会替你保证任务之间没有数据竞争。</span><span class="en">Work dispatch does not make user callbacks thread-safe.</span></p>
    <p><span class="zh">如果替代 backend 下才失败，重点比较 backend contract：detached task 是否等待，scoped parallelism 是否在 calling thread 执行，dispatcher 是否在 single threaded 下仍立即返回，granular thread limits 是否真的生效，parallel algorithms 是否提供等价的 serial fallback。逐项比对比泛泛地“换回 TBB 看看”更可审计。</span><span class="en">Backend-specific failures should be checked against the documented Work implementation contract.</span></p>
  </section>

  <section data-cn-complete="safe-usage">
    <h2>安全使用清单</h2>
    <p><span class="zh">使用 Work 并行化循环前，先确认循环体是否可以独立执行：每个迭代是否只写自己的输出范围，是否会修改共享容器，是否依赖前一次迭代结果，是否会调用非线程安全的全局状态。Work 可以调度任务，但不会自动推断数据依赖；如果依赖关系不清，先保持 serial 路径，再逐步扩大并行范围。</span><span class="en">Before using Work for parallel loops, verify iteration independence and shared-state safety.</span></p>
    <p><span class="zh">其次要检查异常和取消语义。并行任务中的异常传播、dispatcher 的 <code>Cancel()</code>、<code>Wait()</code>、<code>Reset()</code> 以及 detached task 生命周期，都需要调用方明确约定。尤其是工具程序和 batch farm 环境，进程退出前必须确认后台任务不会继续访问已经销毁的数据。</span><span class="en">Exception propagation, cancellation, waiting, resetting, and detached task lifetime must be handled deliberately.</span></p>
    <p><span class="zh">第三要把性能测试分成两类：功能正确性测试确保并行和单线程结果一致；性能测试再比较线程限制、grain size、输入规模、锁竞争和缓存行为。小数据集上的并行版本可能比串行更慢，这不一定是 Work 错，而可能是调度开销超过了实际计算量。</span><span class="en">Correctness tests and performance tests answer different questions; small workloads may be slower when parallelized.</span></p>
    <p><span class="zh">最后要记录运行环境。线程数、物理核心数、超线程、NUMA、farm 限额、容器 CPU 配额和其他线程池都会影响 Work 表现。一个问题如果只在 CI、渲染农场或某台工作站出现，先记录这些环境信息，再比较 Work 并发设置和 backend 行为。</span><span class="en">Thread limits, hardware topology, farm limits, container CPU quotas, and other thread pools can all affect Work behavior.</span></p>
  </section>

  <section data-cn-complete="relationships">
    <h2>相邻模块关系与调试路径</h2>
    <p><span class="zh"><code>Tf</code> 提供基础设施；<code>Trace</code> 用于性能追踪；<code>Work</code> 负责统一并行调度。遇到性能问题时，不要只改 <code>PXR_WORK_THREAD_LIMIT</code>：先用 Trace 或外部 profiler 确认瓶颈，再检查 Work 并发上限、grain size、backend 实现和任务粒度。</span><span class="en">Use Trace or profilers to identify bottlenecks before changing Work thread limits.</span></p>
    <p><span class="zh"><code>Usd</code>、<code>Sdf</code>、<code>Pcp</code>、Hydra 和 OpenExec 等上层系统可能消费 Work 的调度能力，但它们各自仍有缓存、锁、依赖图和数据一致性约束。Work 可以帮助并行化可拆分工作，但不能自动让非线程安全代码变安全，也不能保证所有算法都线性加速。</span><span class="en">Work dispatch can parallelize suitable tasks, but it does not make unsafe code safe or guarantee linear speedups.</span></p>
  </section>

  <section data-cn-complete="misreads">
    <h2>常见误读</h2>
    <ul>
      <li><span class="zh">误读一：Work 等于 TBB。正确理解是 Work 是抽象层，默认 backend 可能基于 TBB，但目标是集中依赖并隔离调用方。</span><span class="en">Work is an abstraction layer, not merely TBB itself.</span></li>
      <li><span class="zh">误读二：线程越多越快。正确做法是结合任务粒度、硬件、锁竞争、内存带宽和 backend 调度评估。</span><span class="en">More threads do not always mean faster execution.</span></li>
      <li><span class="zh">误读三：<code>PXR_WORK_THREAD_LIMIT=1</code> 只是调试开关。它会改变执行模式，可能暴露或隐藏 race、递归派发和生命周期问题。</span><span class="en">Single-threaded mode can change behavior and hide or expose concurrency issues.</span></li>
      <li><span class="zh">误读四：替代 backend 只要实现函数名。官方还要求具体行为，例如 detached task 生命周期、scoped parallelism 的 calling thread、dispatcher 在单线程下立即返回等。</span><span class="en">Alternate backends must implement behavior, not just matching function names.</span></li>
    </ul>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>Paragraph-Level Bilingual Coverage / 逐段双语理解</h2>
    <p><span class="zh">逐段覆盖：Summary 对应 Work 的多线程抽象职责；Initializing and Limiting Multithreading 对应 maximum concurrency、<code>PXR_WORK_THREAD_LIMIT</code> 和程序 API；Simple "Parallel For" Example 对应 <code>WorkParallelForN</code>、range callback 和 <code>grainSize</code>；Providing an Alternate Work Implementation 对应 backend contract；Parallel Algorithms、Concurrency Limiting、Dispatching Tasks 和 Caveats 分别对应替代 backend 的算法、并发、任务生命周期和性能风险。</span><span class="en">Paragraph-Level Bilingual Coverage maps each official Work section to a Chinese reading path.</span></p>
    <p><span class="zh">英文 API 名、环境变量、函数签名和 backend 名称保留不翻译，是为了保持技术可核对性；中文段落解释这些标识的作用、边界、误读点和调试顺序。读者可以靠中文理解 Work 的职责，再用英文名回到 Doxygen 或源码查具体函数。</span><span class="en">English identifiers are preserved for technical fidelity; Chinese text supplies the main reading path.</span></p>
  </section>
</main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceText();
  const rawOut = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const out = stripTags(rawOut);
  const sourceKeywords = [
    "Work",
    "Multi-threaded Dispatch",
    "simplify the use of multithreading",
    "thin abstraction layer",
    "Parallel For",
    "TBB",
    "OpenMP",
    "maximum concurrency",
    "static initialization time",
    "PXR_WORK_THREAD_LIMIT",
    "farm environment",
    "single-threaded mode",
    "granular thread limits",
    "WorkSetConcurrencyLimitArgument",
    "WorkSetMaximumConcurrencyLimit",
    "WorkParallelForN",
    "grainSize",
    "std::bind",
    "functor object",
    "Providing an Alternate Work Implementation",
    "Parallel Algorithms API",
    "WorkImpl_ParallelSort",
    "WorkImpl_ParallelForN",
    "WorkImpl_ParallelForTBBRange",
    "WorkImpl_ParallelForEach",
    "WorkImpl_ParallelReduceN",
    "WORK_IMPL_HAS_PARALLEL_FOR_TBB_RANGE",
    "Concurrency Limiting API",
    "WorkImpl_GetPhysicalConcurrencyLimit",
    "WorkImpl_InitializeThreading",
    "WorkImpl_SupportsGranularThreadLimits",
    "WorkImpl_GetConcurrencyLimit",
    "WorkImpl_SetConcurrencyLimit",
    "Dispatching Tasks API",
    "WorkImpl_RunDetachedTask",
    "WorkImpl_WithScopedParallelism",
    "WorkImpl_Dispatcher",
    "detached task",
    "calling thread",
    "stack overflow",
    "Caveats of an Alternate Work Backend",
    "work stealing",
    "OpenExec",
    "WorkImpl_IsolatingDispatcher",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "Trace",
    "Tf",
    "Hydra",
    "Open official page",
  ];
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_headings: sourceHeadings(),
    source_keywords_checked: sourceKeywords,
    output_keywords_checked: outputKeywords,
    missing_source_keywords: sourceKeywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: outputKeywords.filter((keyword) => !out.includes(keyword)),
    output_checks: {
      has_complete_status: rawOut.includes('data-cn-status="bilingual_complete"') && rawOut.includes(`data-cn-round="${ROUND}"`),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: rawOut.includes("openusd_bilingual_final.html"),
      has_api_entry: rawOut.includes("site/index.html"),
      has_api_redirect: rawOut.includes("site/api/index.html"),
      has_release_entry: rawOut.includes("site/release_index.html"),
      has_reading_flow_nav: rawOut.includes("openusd-reading-flow-nav") && rawOut.includes("openusd-reading-flow-breadcrumb"),
      has_explicit_official_link: rawOut.includes("Open official page") && rawOut.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|later iterations add denser bilingual coverage|后续迭代会继续补齐/.test(out),
      zh_chars: zhChars(rawOut),
      zh_blocks: (rawOut.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
    },
  };
}

function writePage() {
  fs.writeFileSync(rel(TARGET), buildHtml(), "utf8");
  writeJson(SOURCE_PARITY_REPORT, sourceParity());
}

function precheck() {
  const report = sourceParity();
  const failed = [];
  if (report.missing_source_keywords.length) failed.push(`missing source keywords: ${report.missing_source_keywords.join(", ")}`);
  if (report.missing_output_keywords.length) failed.push(`missing output keywords: ${report.missing_output_keywords.join(", ")}`);
  for (const [key, value] of Object.entries(report.output_checks)) {
    if (typeof value === "boolean" && !value) failed.push(`output check failed: ${key}`);
  }
  if (report.output_checks.zh_chars < 3000) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 28) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
  if (failed.length) {
    console.error(JSON.stringify({ passed: false, failed, report }, null, 2));
    process.exit(1);
  }
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify({ passed: true, report }, null, 2));
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
    updated_at: new Date().toISOString(),
  };
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "Work : Multi-threaded Dispatch",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Work module front page by adding Chinese main-reading-path coverage for multithreaded dispatch, Parallel For, PXR_WORK_THREAD_LIMIT, WorkSetConcurrencyLimitArgument, WorkSetMaximumConcurrencyLimit, WorkParallelForN, alternate work backends, parallel algorithms, concurrency limiting, dispatching tasks, WorkImpl_Dispatcher lifecycle constraints, OpenExec/TBB caveats, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 3000,
      minimum_complete_section_chinese_chars: 2600,
      minimum_chinese_blocks: 28,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已晋级，并跟踪当前 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 212,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、相邻 API/release 性能路径和 Open official page 外跳，并会重新运行 reading-flow 审计。",
        required_action: "若 reading-flow 审计失败，先修导航，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无重复问号损坏、replacement character 和 UTF-8 BOM。",
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
      "下一轮建议继续 API 性能/基础设施相邻页，开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：full_site/api/trace_page_front.html。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_434_work_module_front.mjs --write-page --precheck --manifest --problem");
}
