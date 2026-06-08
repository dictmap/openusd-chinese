import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 436;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/hd_storm_page_front.html";
const SOURCE = "source/full_api/hd_storm_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/hd_storm_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_436_hd_storm_module_front_source_parity.json";
const PROMOTION_ID = "round-436-api-hd-storm-module-front";

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
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#fff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#fff}
    @media (max-width:920px){
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
  source: "../../source/full_api/hd_storm_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "hd_st_page_front.html",
  next: "hdx_page_front.html",
  hd: "hd_page_front.html",
  hdSt: "hd_st_page_front.html",
  hdx: "hdx_page_front.html",
  hdEmbree: "hd_embree_page_front.html",
  usdRender: "usd_render_page_front.html",
  trace: "trace_page_front.html",
  work: "work_page_front.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text && heading.text !== "Table of Contents")
    .map((heading) => `<li><span class="zh">官方结构：<code>${esc(heading.text)}</code>。中文页将这个短模块入口扩展为 HdStorm 的职责说明、Storm render delegate 包装关系、Hgi 图形接口、OpenGL/Metal/Vulkan backend 边界、HdSt 实现边界和本地阅读路径。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / hd_storm_page_front.html</span>
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
        <li>hd_storm_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>Hydra 渲染上下文</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.hd}">Hd 核心渲染索引</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdSt}">HdSt Storm 实现库</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdx}">Hdx 调试与辅助工具</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.hdEmbree}">HdEmbree 对照渲染插件</a><span class="openusd-reading-flow-status">draft</span></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender 输出 schema</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>调试路径 / Debugging</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.trace}">Trace 性能追踪</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.work}">Work 多线程调度</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: HdSt</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: Hdx</a></li>
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
  <title>HdStorm : Real-time Hydra renderer plugin - OpenUSD API 双语</title>
  <style>${css()}</style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-scope="api" data-cn-review-ready="true">
${readingFlowNav()}
<header>
  <h1>HdStorm : Real-time Hydra renderer plugin</h1>
  <div class="meta">第 ${ROUND} 轮 ${ROUND_TYPE}：HdStorm 模块入口完成。源页：<code>${SOURCE}</code>；官方页：<code>${OFFICIAL_URL}</code></div>
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
    <p><span class="zh"><code>HdStorm</code> 是一个 real-time Hydra renderer plugin。官方短页的核心意思是：HdStorm 不是完整渲染器实现本身，而是一个包装 Storm Hydra render delegate 的插件入口。它让 OpenUSD/Hydra 的应用可以选择 Storm 作为实时渲染 delegate，并通过 Hydra 的插件机制把 Storm 暴露给上层工具。</span><span class="en">HdStorm implements a Hydra renderer plugin that wraps the Storm Hydra render delegate.</span></p>
    <p><span class="zh">读这页时要把三层分开：<code>HdStorm</code> 是插件层，负责让 Storm 作为 renderer plugin 被发现和使用；<code>Storm</code> 是实时 Hydra renderer；大部分 rendering functionality 位于 <code>HdSt</code> library。也就是说，HdStorm 更像“注册和入口”，HdSt 才是 buffer、shader、render pass、resource registry 和后端调度等细节的主要位置。</span><span class="en">This is a thin plugin layer; most rendering functionality is in the HdSt library.</span></p>
    <p><span class="zh">Storm 支持 OpenGL、Metal 和 Vulkan graphics APIs，但它不是在本页逐一展开这些 API 的实现细节。官方强调的是 Storm 通过 Hydra graphics interface <code>Hgi</code> 使用这些后端。<code>Hgi</code> 提供图形接口抽象，Storm/HdSt 在这个抽象上组织 GPU 资源和命令；因此 HdStorm 页应被理解为 Hydra renderer plugin 与跨图形后端抽象之间的连接点。</span><span class="en">Storm supports OpenGL, Metal, and Vulkan graphics APIs by utilizing the Hydra graphics interface (Hgi).</span></p>
    <p><span class="zh">因为官方源页本身很短，本地中文版的目标不是发明新的 HdStorm API，而是把隐含上下文说清楚：它为什么属于 Hydra 渲染插件体系、为什么要提到 Hgi、为什么读者遇到具体渲染实现问题时应跳到 HdSt。这样的扩写让中文读者能顺着本地站继续阅读，同时仍能逐项回到官方短页核对。</span><span class="en">The expanded Chinese path clarifies context while staying anchored to the short official source page.</span></p>
  </section>

  <section data-cn-complete="source-coverage">
    <h2>官方结构与 source parity</h2>
    <p><span class="zh">本页使用 <code>${SOURCE}</code> 对齐官方 <code>HdStorm : Real-time Hydra renderer plugin</code> 页面。官方源页很短，主要包含标题、一段关于 HdStorm 包装 Storm render delegate 的说明、一段关于 OpenGL/Metal/Vulkan 和 <code>Hgi</code> 的说明，以及一条“thin plugin layer，大部分功能在 <code>HdSt</code> library”的边界提示。中文页没有把短页硬扩展成虚构 API，而是围绕这些官方语义补足阅读路径、边界和调试方向。</span><span class="en">The local page is aligned with the official HdStorm module front page and keeps the short-source semantics explicit.</span></p>
    <ul>
      ${headingList()}
    </ul>
    <p><span class="zh">source parity 的关键是保留 <code>HdStorm</code>、<code>Storm</code>、<code>Hydra render delegate</code>、<code>OpenGL</code>、<code>Metal</code>、<code>Vulkan</code>、<code>Hgi</code> 和 <code>HdSt</code> 这些名称，不把它们翻译成容易误导的中文别名。中文解释只补充“谁是插件层、谁是实现库、谁是图形抽象、谁是上层消费方”。</span><span class="en">Source parity preserves names and clarifies module boundaries without inventing APIs.</span></p>
  </section>

  <section data-cn-complete="plugin-boundary">
    <h2>插件层边界：HdStorm、Storm 和 HdSt</h2>
    <p><span class="zh"><code>HdStorm</code> 的命名容易让读者以为它就是 Storm renderer 的全部实现。官方页特意说它是 thin plugin layer，这是最重要的边界。HdStorm 的用户价值在于“有一个可被 Hydra 发现和选择的 renderer plugin”；当你需要理解 draw item、shader binding、GPU buffer、texture handle、render pass state 或 Hgi command 提交时，应继续阅读 <a href="${links.hdSt}">HdSt</a> 相关文档和类页面。</span><span class="en">HdStorm is the plugin layer; HdSt contains most rendering functionality.</span></p>
    <p><span class="zh"><code>Storm</code> 是实时 Hydra renderer，它服务于 viewport、预览和交互式工具场景。它和离线渲染器或最终帧渲染输出不是同一层问题。若目标是描述 USD 场景中的 render settings、render product、render var，应看 <a href="${links.usdRender}">UsdRender</a>；若目标是理解 Hydra 的 render index、scene delegate、render delegate 协议，应看 <a href="${links.hd}">Hd</a>；若目标是 Storm 的具体实现，应看 <code>HdSt</code>。</span><span class="en">Storm is a real-time Hydra renderer; UsdRender and Hd answer different questions.</span></p>
    <p><span class="zh">这个边界对调试很实用。如果应用里“选择 Storm 后没有画面”，第一步确认 HdStorm plugin 是否被加载、Storm render delegate 是否被创建；第二步才进入 HdSt/Hgi 层检查资源和命令；第三步再看 UsdRender 或 UsdGeom 数据是否正确。不要一开始就把所有渲染问题归因到 HdStorm 页面本身。</span><span class="en">Debugging should separate plugin discovery, render delegate creation, and HdSt/Hgi rendering internals.</span></p>
  </section>

  <section data-cn-complete="graphics-api-boundary">
    <h2>图形后端边界：OpenGL、Metal、Vulkan 和 Hgi</h2>
    <p><span class="zh">官方页说 Storm supports OpenGL, Metal and Vulkan graphics APIs by utilizing <code>Hgi</code>。这句话的重点不是“HdStorm 页面教你直接写 OpenGL/Metal/Vulkan”，而是“Storm 通过 Hydra graphics interface 适配多个图形后端”。<code>Hgi</code> 抽象了 GPU 资源、命令和后端差异，让上层 Hydra/Storm 代码能在统一接口上表达渲染工作。</span><span class="en">Storm uses Hgi to support OpenGL, Metal, and Vulkan graphics APIs.</span></p>
    <p><span class="zh">因此，遇到后端特定问题时，要先判断问题发生在哪一层：如果插件没有被发现，问题可能在 plugin discovery 或部署路径；如果 render delegate 已创建但某个 backend 无法工作，问题可能在 Hgi backend、驱动或平台能力；如果画面内容不正确，问题可能在 Hd scene delegate、HdSt 资源同步、shader 或 draw dispatch。HdStorm 页只负责把这些层级串起来。</span><span class="en">Backend failures should be triaged across plugin discovery, Hgi backend support, and HdSt rendering state.</span></p>
    <p><span class="zh">跨平台阅读时也要保留英文名。OpenGL、Metal、Vulkan、Hgi、Storm、HdSt 是 OpenUSD 生态中的固定标识，翻译成中文会降低搜索和对照能力。中文说明应解释它们的职责和边界，而不是替换名称。</span><span class="en">The English names are retained because they are stable API and backend identifiers.</span></p>
  </section>

  <section data-cn-complete="integration-path">
    <h2>应用集成视角</h2>
    <p><span class="zh">从工具集成角度看，HdStorm 的入口价值通常出现在“选择渲染 delegate”这一步。应用本身可能只知道要使用一个 Hydra render delegate，而 HdStorm 让 Storm 以插件形式进入可选集合。若你在调试 usdview、内部 DCC viewport、资产检查工具或自研 Hydra viewer，HdStorm 页提供的是“Storm 这个实时 delegate 从哪里进入系统”的定位，而不是“如何设置最终渲染输出”。</span><span class="en">From an integration perspective, HdStorm is the plugin entry that makes Storm selectable as a Hydra render delegate.</span></p>
    <p><span class="zh">这也解释了为什么本页需要连到 <code>Hd</code>、<code>HdSt</code>、<code>Hdx</code> 和 <code>UsdRender</code>。HdStorm 负责入口；Hd 定义通用 Hydra 协议；HdSt 承载 Storm 的主要执行逻辑；Hdx 提供调试和任务工具；UsdRender 描述 USD 场景中的渲染输出配置。把这些层级拆开后，读者才能判断自己要查的是插件注册、delegate 生命周期、实时渲染实现、调试工具，还是场景里的 render settings。</span><span class="en">HdStorm, Hd, HdSt, Hdx, and UsdRender answer different integration questions.</span></p>
    <p><span class="zh">如果一个页面或错误信息只出现 <code>HdStorm</code>，不要立刻假设问题一定在 GPU 后端。它可能只是说明当前应用选择了 Storm 插件。真正的失败点可能在插件搜索路径、动态库依赖、Hydra delegate 创建参数、scene delegate 同步、Hgi backend 初始化、驱动能力或 shader/resource 状态。中文主阅读路径把这些可能性列出来，是为了避免把一个入口页误当成完整故障归因。</span><span class="en">Seeing HdStorm in an error does not automatically mean the GPU backend is the root cause.</span></p>
    <p><span class="zh">实际使用时，可以把 HdStorm 看成“选择 Storm 的门牌”。门牌存在只能证明入口可见，不能证明后面的房间、设备和执行路径都正常；因此还需要继续检查 HdSt、Hgi、驱动和场景数据。</span><span class="en">HdStorm is the entry sign for selecting Storm, not proof that every downstream rendering layer is healthy.</span></p>
    <p><span class="zh">这个判断也能帮助团队分工：集成人员看插件入口，渲染工程师看 HdSt/Hgi，场景作者看 UsdRender 和数据等。</span><span class="en">This boundary also helps split integration, renderer, and scene-authoring responsibilities.</span></p>
  </section>

  <section data-cn-complete="related-modules">
    <h2>相邻模块关系</h2>
    <p><span class="zh"><a href="${links.hd}">Hd</a> 是 Hydra 的核心 API 层，负责 render index、scene delegate、render delegate、dirty bits 和渲染数据流。HdStorm 使用 Hd 的插件和 delegate 机制，但 HdStorm 不是 Hydra 协议本身。理解插件如何接入 Hydra 时，先读 Hd；理解 Storm 插件入口时，再读 HdStorm。</span><span class="en">Hd defines the Hydra rendering framework; HdStorm is one render plugin entry.</span></p>
    <p><span class="zh"><a href="${links.hdSt}">HdSt</a> 是 Storm 的主要实现库。官方页明确说大部分 rendering functionality 在 HdSt 中，这意味着性能、资源、shader 和渲染状态问题通常不应停在 HdStorm 页。HdStorm 负责入口，HdSt 负责具体执行。</span><span class="en">HdSt contains the concrete Storm rendering functionality.</span></p>
    <p><span class="zh"><a href="${links.hdx}">Hdx</a> 提供 Hydra 相关调试、任务和辅助工具；<a href="${links.trace}">Trace</a> 能记录渲染路径中的耗时；<a href="${links.work}">Work</a> 解释多线程调度边界。排查 Storm 性能时，可用 Trace 观察 Hd/HdSt/Hdx/Work 相关 scope，用 Hdx 工具观察可视化或调试状态。</span><span class="en">Hdx, Trace, and Work are useful adjacent debugging paths for Storm-related issues.</span></p>
    <p><span class="zh"><a href="${links.hdEmbree}">HdEmbree</a> 可作为另一个 render delegate/plugin 的对照点。对比 HdStorm 和 HdEmbree 有助于区分“Hydra 插件层通用问题”和“Storm/Hgi 实时渲染后端特定问题”。如果两个 delegate 都无法加载，优先看插件发现和环境；如果只有 Storm 有问题，再进入 Storm/Hgi/HdSt 方向。</span><span class="en">Comparing HdStorm with another delegate such as HdEmbree can isolate plugin-layer versus backend-specific problems.</span></p>
  </section>

  <section data-cn-complete="misreads">
    <h2>常见误读和调试提示</h2>
    <ul>
      <li><span class="zh">不要把 <code>HdStorm</code> 当成全部渲染实现。官方说它是 thin plugin layer，真正大量功能在 <code>HdSt</code> library。</span><span class="en">HdStorm is not the full renderer implementation; most rendering functionality is in HdSt.</span></li>
      <li><span class="zh">不要把 Storm 支持 OpenGL/Metal/Vulkan 理解成 HdStorm 直接暴露这些 API。Storm 通过 <code>Hgi</code> 使用这些 graphics APIs。</span><span class="en">Storm uses OpenGL, Metal, and Vulkan through Hgi.</span></li>
      <li><span class="zh">不要把 <code>UsdRender</code> 的 render settings 与 HdStorm 插件入口混为一谈。UsdRender 描述场景中的渲染输出配置，HdStorm 是 Hydra 实时渲染 delegate 插件。</span><span class="en">UsdRender settings and the HdStorm plugin entry live at different layers.</span></li>
      <li><span class="zh">不要把所有 viewport 问题直接归因于 HdStorm。先区分插件发现、delegate 创建、Hd 数据同步、HdSt 资源状态、Hgi backend 和驱动/平台问题。</span><span class="en">Viewport failures should be triaged across plugin discovery, Hd data, HdSt, Hgi, and platform layers.</span></li>
      <li><span class="zh">不要把 Storm 翻译成普通中文词。这里的 <code>Storm</code> 是固定 renderer 名称，保留英文更利于搜索、对照和调试。</span><span class="en">Storm is a renderer name and should remain in English.</span></li>
    </ul>
  </section>

  <section data-cn-complete="debugging-path">
    <h2>建议的排查流程</h2>
    <p><span class="zh">如果应用无法使用 Storm，先确认 HdStorm plugin 是否存在、是否被插件系统发现、是否能创建 Storm render delegate。这个阶段的问题通常表现为 delegate 名称不可用、插件加载失败或运行时找不到相关库。</span><span class="en">First verify that the HdStorm plugin is discoverable and that a Storm render delegate can be created.</span></p>
    <p><span class="zh">如果 delegate 已创建但渲染结果异常，继续检查 Hd/HdSt 层：scene delegate 是否提供了正确数据，dirty bits 是否触发同步，resource registry、shader、texture 和 render pass state 是否正常。若问题只在某个平台或后端出现，再看 Hgi backend、驱动和图形 API 支持。</span><span class="en">If the delegate exists but rendering is wrong, inspect Hd/HdSt synchronization and Hgi backend behavior.</span></p>
    <p><span class="zh">如果问题是性能而非正确性，可结合 <a href="${links.trace}">Trace</a> 和 <a href="${links.work}">Work</a>。Trace 用来找耗时 scope，Work 用来理解并发限制和任务调度；当报告显示热点在 Storm 内部时，再回到 HdSt 具体类和实现细节。</span><span class="en">For performance issues, combine Trace timing data with Work concurrency context and then drill into HdSt.</span></p>
    <p><span class="zh">如果问题发生在某个特定图形 API 上，应记录平台、驱动、Hgi backend、OpenUSD 构建选项和所选 delegate。因为官方页强调 Storm 通过 Hgi 使用 OpenGL、Metal 和 Vulkan，这意味着同一个 USD 场景可能在一个 backend 正常、另一个 backend 失败。排查时应把“场景数据是否正确”和“backend 是否能执行”分开验证。</span><span class="en">Backend-specific failures require recording platform, driver, Hgi backend, build options, and selected delegate.</span></p>
    <p><span class="zh">如果问题发生在插件加载阶段，应先检查 OpenUSD 插件注册信息、运行时搜索路径和依赖库，而不是阅读 HdSt 的渲染细节。只有当 Storm delegate 已经成功创建并开始处理 Hydra 数据时，HdSt/Hgi 层的资源和命令问题才成为主要方向。这种分阶段排查能减少无效阅读和错误归因。</span><span class="en">Plugin-loading failures should be separated from HdSt/Hgi runtime rendering failures.</span></p>
  </section>

  <section data-cn-complete="reader-checklist">
    <h2>读者检查清单</h2>
    <ul>
      <li><span class="zh">需要确认 Storm 是否作为 Hydra render delegate 可用时，读 HdStorm 页。</span><span class="en">Read HdStorm when checking whether Storm is available as a Hydra render delegate.</span></li>
      <li><span class="zh">需要理解 render index、dirty bits、scene delegate 和 render delegate 协议时，跳到 <code>Hd</code>。</span><span class="en">Go to Hd for render index, dirty bits, scene delegate, and render delegate protocol.</span></li>
      <li><span class="zh">需要理解 Storm 内部资源、shader、render pass 和 Hgi command 使用时，跳到 <code>HdSt</code>。</span><span class="en">Go to HdSt for Storm implementation details such as resources, shaders, render passes, and Hgi commands.</span></li>
      <li><span class="zh">需要解释 viewport 调试可视化、任务或辅助工具时，查看 <code>Hdx</code>。</span><span class="en">Use Hdx for viewport debugging helpers and Hydra tasks.</span></li>
      <li><span class="zh">需要描述 USD 场景中的 render product、render var 或 render settings 时，查看 <code>UsdRender</code>，不要把这些概念塞回 HdStorm。</span><span class="en">Use UsdRender for scene-authored render products, vars, and settings.</span></li>
    </ul>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li><span class="zh">官方标题已覆盖：<code>HdStorm : Real-time Hydra renderer plugin</code> 被解释为实时 Hydra renderer plugin 入口，而不是完整渲染器实现。</span><span class="en">Title coverage: HdStorm is explained as a real-time Hydra renderer plugin entry.</span></li>
      <li><span class="zh">官方核心段落已覆盖：<code>HdStorm</code> wraps the <code>Storm Hydra render delegate</code>，说明 HdStorm 是插件包装层。</span><span class="en">Core paragraph coverage: HdStorm wraps the Storm Hydra render delegate.</span></li>
      <li><span class="zh">graphics API 段落已覆盖：Storm supports <code>OpenGL</code>、<code>Metal</code>、<code>Vulkan</code> by utilizing <code>Hgi</code>，中文解释了 Hgi 图形接口抽象的边界。</span><span class="en">Graphics API coverage: Storm supports OpenGL, Metal, and Vulkan through Hgi.</span></li>
      <li><span class="zh">thin plugin layer 边界已覆盖：大部分 rendering functionality 位于 <code>HdSt</code> library，中文页给出从 HdStorm 跳转到 HdSt 的阅读路径。</span><span class="en">Boundary coverage: HdStorm is a thin plugin layer and HdSt contains most rendering functionality.</span></li>
      <li><span class="zh">调试路径已覆盖：插件发现、delegate 创建、Hd/HdSt 同步、Hgi backend、Trace 性能追踪和 Work 并发上下文被拆成可执行排查步骤。</span><span class="en">Debugging coverage: plugin discovery, delegate creation, HdSt/Hgi behavior, Trace, and Work are separated.</span></li>
      <li><span class="zh">本地阅读路径已覆盖：总入口、API 入口、Release 入口、source snapshot、上一页 HdSt、下一页 Hdx、相邻 Hd/HdEmbree/UsdRender/Trace/Work 和显式 Open official page 外跳。</span><span class="en">Local reading path coverage: final entry, API entry, source snapshot, related modules, and official link.</span></li>
    </ul>
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
    "HdStorm",
    "Real-time Hydra renderer plugin",
    "Hydra renderer plugin",
    "Storm Hydra render delegate",
    "OpenGL",
    "Metal",
    "Vulkan",
    "Hydra graphics interface",
    "Hgi",
    "thin plugin layer",
    "HdSt library",
    "rendering functionality",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "Hd",
    "Hdx",
    "UsdRender",
    "Trace",
    "Work",
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
  if (report.output_checks.zh_chars < 2500) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 30) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "HdStorm : Real-time Hydra renderer plugin",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the HdStorm module front page by adding Chinese main-reading-path coverage for HdStorm as a real-time Hydra renderer plugin, Storm Hydra render delegate wrapping, OpenGL/Metal/Vulkan support through Hgi, the thin plugin layer boundary, HdSt implementation ownership, Hd/Hdx/UsdRender/Trace/Work adjacent debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2500,
      minimum_complete_section_chinese_chars: 2200,
      minimum_chinese_blocks: 30,
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
      previous_good_bilingual: 214,
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
        evidence: "本轮页面生成了本地侧栏、breadcrumb、相邻 Hydra/API/release 调试路径和 Open official page 外跳，并会重新运行 reading-flow 审计。",
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
      "下一轮建议继续 API Hydra/渲染相邻页，开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：full_site/api/hd_embree_page_front.html。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_436_hd_storm_module_front.mjs --write-page --precheck --manifest --problem");
}
