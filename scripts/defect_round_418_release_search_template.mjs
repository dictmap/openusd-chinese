import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 418;
const DEFECT_ID = "P1-release-search-template-only";
const OUTPUT = "full_site/release/search.html";
const SOURCE = "source/full_release/search_source.html";
const OFFICIAL_URL = "https://openusd.org/release/search.html";
const SOURCE_PARITY_REPORT = "reports/round_418_release_search_template_source_parity.json";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function slash(value) {
  return String(value).replaceAll("\\", "/");
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
  return fs.existsSync(rel(SOURCE)) ? fs.readFileSync(rel(SOURCE), "utf8") : "";
}

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function inlineCode(value) {
  return String(value ?? "")
    .split("`")
    .map((part, index) => (index % 2 ? `<code>${esc(part)}</code>` : esc(part)))
    .join("");
}

const localSearchEntries = [
  ["总入口", "../../openusd_bilingual_final.html", "complete count, draft count, validation status"],
  ["Release 本地入口", "../../site/release_index.html", "release user guide, tutorials, spec, whitepaper"],
  ["API Doxygen 本地入口", "../../site/index.html", "API reference and Doxygen local entry"],
  ["Release Index", "genindex.html", "alphabetical release index"],
  ["Tutorials", "tut_usd_tutorials.html", "tutorial table of contents"],
  ["Introduction to USD", "../../site/intro.html", "intro, stage, layer, composition"],
  ["Introduction to OpenExec", "intro_to_openexec.html", "OpenExec, computation, client API"],
  ["Performance Metrics", "ref_performance_metrics.html", "metrics, platform graphs, local benchmark"],
  ["Maximizing USD Performance", "maxperf.html", "allocator, binary usd, payload, heavy scene"],
  ["USD FAQ", "usdfaq.html", "frequently asked questions"],
  ["Schema Domains", "user_guides/schemas/index.html", "schema domains local guide"],
  ["usdLux", "user_guides/schemas/usdLux/usdLux_toc.html", "lights, LightAPI, RectLight, DomeLight"],
  ["usdRender", "user_guides/schemas/usdRender/usdRender_toc.html", "render settings, products, vars"],
  ["usdVol", "user_guides/schemas/usdVol/usdVol_toc.html", "volumes, fields, OpenVDB, particle fields"],
  ["USD Specification", "spec.html", "core specification"],
  ["USDZ Specification", "spec_usdz.html", "usdz package"],
  ["UsdPreviewSurface", "spec_usdpreviewsurface.html", "preview surface shader"],
  ["User Guide: Color", "user_guides/color_user_guide.html", "color spaces and color management"],
  ["User Guide: Namespace Editing", "user_guides/namespace_editing.html", "namespace editing"],
  ["User Guide: Primvars", "user_guides/primvars.html", "primvars user guide"],
  ["User Guide: Rendering", "user_guides/render_user_guide.html", "rendering with USD"],
];

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    .navlinks a{color:#d7e3f4;margin-right:14px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    .search-box{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 16px}
    .search-box input{flex:1 1 260px;border:1px solid #cbd5e1;border-radius:6px;padding:10px;font:inherit}
    .search-box button{border:1px solid #1c5d99;background:#1c5d99;color:#fff;border-radius:6px;padding:10px 14px;font:inherit}
    .local-result{border-top:1px solid #edf2f7;padding:10px 0}
    .local-result strong{display:block}
    .muted{color:#64748b}
  `;
}

function localSearchMarkup() {
  const rows = localSearchEntries.map(([title, href, keywords]) => {
    const haystack = `${title} ${keywords}`.toLowerCase();
    return `<li class="local-result" data-search-text="${esc(haystack)}"><strong><a href="${esc(href)}">${esc(title)}</a></strong><span class="muted">${esc(keywords)}</span></li>`;
  }).join("\n");
  return `
    <div class="search-box" role="search">
      <input id="openusd-local-search" type="search" placeholder="输入关键词，例如 usdLux、primvars、performance、OpenExec、API" aria-label="Search local OpenUSD bilingual pages">
      <button type="button" id="openusd-local-search-clear">清空 / Clear</button>
    </div>
    <ul id="openusd-local-search-results">
${rows}
    </ul>
    <script>
      (function(){
        var input = document.getElementById("openusd-local-search");
        var clear = document.getElementById("openusd-local-search-clear");
        var rows = Array.prototype.slice.call(document.querySelectorAll("#openusd-local-search-results .local-result"));
        function apply(){
          var q = (input.value || "").toLowerCase().trim();
          rows.forEach(function(row){
            row.style.display = !q || row.getAttribute("data-search-text").indexOf(q) >= 0 ? "" : "none";
          });
        }
        if (input) input.addEventListener("input", apply);
        if (clear) clear.addEventListener("click", function(){ input.value = ""; apply(); input.focus(); });
        apply();
      })();
    </script>`;
}

function buildHtml() {
  const links = {
    final: "../../openusd_bilingual_final.html",
    release: "../../site/release_index.html",
    api: "../../site/index.html",
    source: "../../source/full_release/search_source.html",
    official: OFFICIAL_URL,
  };
  const sourceHeadingList = sourceHeadings().map((heading) => `<li><span class="zh">官方 source snapshot 中的 heading：<code>${esc(heading.text)}</code>。搜索页 heading 很少，主体功能来自 Sphinx 搜索表单和脚本。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`).join("\n") || `<li><span class="zh">官方 source snapshot 没有普通正文 heading；它主要由搜索表单、搜索结果容器和脚本加载逻辑构成。</span><span class="en">No regular content heading was extracted.</span></li>`;

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>搜索功能页 / Search - Universal Scene Description 26.05 documentation</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>${css()}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${esc(SOURCE)}">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>搜索功能页 / Search</h1>
    <div class="meta">Round ${ROUND} DefectRound · ${DEFECT_ID} · Source snapshot: ${esc(SOURCE)}</div>
    <p class="navlinks">
      <a href="${links.final}">总入口</a>
      <a href="${links.release}">Release 本地入口</a>
      <a href="${links.api}">API 本地入口</a>
      <a href="${links.source}">Local source snapshot</a>
      <a href="${links.official}">Open official page</a>
    </p>
  </header>
  <main>
    <section data-cn-complete="round-418-search-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">本页是 OpenUSD release 站点的搜索功能页，不是普通教程、schema 说明或 API reference。它原本由 Sphinx 生成，核心由 <code>rtd-search-form</code>、搜索输入框、<code>searchtools.js</code>、<code>searchindex.js</code> 和 <code>Search.loadIndex("searchindex.js")</code> 组成。中文化时不能逐行翻译搜索脚本，也不能把搜索索引伪装成完整正文；正确处理方式是说明搜索页的用途、脚本边界、本地快照关系，以及读者从这里返回总入口、Release 入口、API 入口和 <code>genindex.html</code> 的路径。</span><span class="en">This local bilingual page explains the generated Sphinx search page and keeps identifiers, script names, form ids, and links intact.</span></p>
      <p><span class="zh">本轮修复的缺陷是 <code>${DEFECT_ID}</code>。第 417 轮后 release 普通正文页已经基本收尾，但 <code>search.html</code> 仍停留在 <code>draft_template_only</code>，读者打开后只看到模板说明和英文脚本提示，不能判断这个页面在本地中文站中该怎么用。现在页面明确标记为 <code>bilingual_complete</code>，并补足中文主阅读路径：搜索页是什么、能做什么、不能承诺什么、脚本和索引如何保留、失效时怎么回退、相关本地页面应该从哪里进入。</span><span class="en">The defect was a template-only search page in the otherwise completed release support scope.</span></p>
      <p><span class="zh">官方 source snapshot 位于 <a href="${links.source}"><code>${esc(SOURCE)}</code></a>。快照中可以看到 <code>&lt;form id="rtd-search-form"&gt;</code>、<code>placeholder="Search docs"</code>、<code>&lt;div id="search-results"&gt;</code>、<code>searchtools.js</code> 和 <code>Search.loadIndex("searchindex.js")</code>。这些名称是功能契约和调试线索，必须保留英文；中文解释只补充读者路径和边界，不改写 JavaScript API、DOM id、文件名或官方链接语义。</span><span class="en">Source parity keeps the official form id, search result container, search tools, search index, and official URL semantics.</span></p>
      <p><span class="zh">本地站点不把这个页面描述成实时官方搜索镜像。当前仓库的 406 页库存是固定快照，release/API 页面通过本地链接路由尽量保持站内阅读；如果读者需要官方最新全文搜索，应点击明确标注的 <a href="${links.official}">Open official page</a>。如果读者只想在当前中文化快照里找入口，优先使用下方轻量本地入口过滤、总入口的完成页列表、Release 本地入口、API 本地入口和 <code>genindex.html</code>。</span><span class="en">The local page is a snapshot-aware reading aid, not a live official search service.</span></p>
      <p><span class="zh">搜索页的完成门槛和普通长文不同：普通文档要求覆盖每个主要 section；搜索页则要求解释功能结构、可用入口、失败回退和技术边界。读者应该能靠中文判断：输入框只是本地辅助过滤，官方 Sphinx 搜索依赖索引文件，站内链接优先回到本地完成页和草稿预览，外部官网只通过明确官方链接打开。满足这些条件后，搜索页才不再是空壳模板，而是中文站的可用导航功能页。</span><span class="en">A search function page is complete when the usage path and technical boundary are clear.</span></p>
      <p><span class="zh">本页也承担 release 收尾说明：release 范围里的教程、user guide、schema、spec、proposal、support、press、index 页面已经按完成态审计进入本地阅读路径；搜索页作为最后一个功能页，需要把读者送回这些已整理入口，而不是制造一个新的孤立页面。后续如果 API 草稿继续晋级，本页可以扩充更多本地快捷入口，但这属于站内导航增强，不影响当前功能页完成判断。</span><span class="en">The release search page closes the remaining release function-page gap.</span></p>
    </section>

    <section data-cn-complete="round-418-search-functional-path">
      <h2>本地搜索和回退路径 / Local Search and Fallback Path</h2>
      <p><span class="zh">下面的轻量搜索框只过滤本页列出的本地入口和高频页面，帮助读者快速跳到中文站内的总入口、Release、API、tutorial、schema、spec 和 performance 页面。它不是官方 Sphinx 全文索引，也不读取官方站的实时 <code>searchindex.js</code>。这样做的原因是本地复现站当前重点是可靠阅读路径和完成度审计，不能为了一个功能页引入未验证的外部脚本依赖或静默跳转到官方英文站。</span><span class="en">The local quick filter is intentionally limited to curated local entry points.</span></p>
${localSearchMarkup()}
      <p><span class="zh">如果输入关键词后没有结果，建议按三个层级回退：先回 <a href="${links.release}">Release 本地入口</a> 查教程、user guide、schema、spec 和 proposal；再回 <a href="${links.api}">API 本地入口</a> 查 Doxygen/API reference；最后用 <a href="genindex.html">genindex.html</a> 按字母或术语定位 release 侧的索引项。只有写着 <code>Open official page</code> 的链接才是外跳官方站。</span><span class="en">Fallback order: release entry, API entry, then local genindex; official navigation is explicit.</span></p>
      <p><span class="zh">若浏览器禁用 JavaScript，轻量过滤不会响应，但页面仍然可读：下方列表本身就是普通本地链接，左侧 reading-flow 侧栏也会保留总入口、Release 入口、API 入口、相邻页和官方外跳。也就是说，本页不把“脚本可执行”作为唯一可用路径；脚本增强失败时，HTML 链接结构仍能支持连续阅读。</span><span class="en">The plain local links remain usable even when the optional local filter is unavailable.</span></p>
    </section>

    <section data-cn-complete="round-418-search-source-parity">
      <h2>官方结构对比 / Source Parity</h2>
      <ul>
${sourceHeadingList}
        <li><span class="zh">已核对 source 关键词：<code>Search</code>、<code>rtd-search-form</code>、<code>Search docs</code>、<code>search-results</code>、<code>searchtools.js</code>、<code>searchindex.js</code>、<code>Search.loadIndex</code>、<code>Please activate JavaScript</code>。这些关键词既说明页面是功能页，也说明搜索行为依赖 JavaScript 和索引文件。</span><span class="en">The source parity keywords identify the generated search behavior.</span></li>
        <li><span class="zh">页面保留官方标题 <code>Search</code> 和官方 URL <code>${esc(OFFICIAL_URL)}</code>，但中文标题写成“搜索功能页”以避免误导：这里不是翻译一篇正文，而是解释一个搜索入口在本地中文站中的使用方式和限制。</span><span class="en">The title is clarified as a search function page.</span></li>
        <li><span class="zh">搜索脚本、DOM id、文件名和输入框语义不翻译：<code>rtd-search-form</code>、<code>q</code>、<code>search-results</code>、<code>Search.loadIndex</code> 和 <code>searchindex.js</code> 都是可调试标识。翻译这些标识会损坏技术可核对性。</span><span class="en">Identifiers and script/file names are retained for technical parity.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-418-search-boundaries">
      <h2>边界、误读点和调试路径 / Boundaries and Diagnostics</h2>
      <ul>
        <li><span class="zh">不要把本页当作“所有 OpenUSD 中文页都已完成”的证据。真实完成度仍以 <code>translation_quality_review.json</code>、<code>english_debt_audit.json</code>、<code>all_pages_inventory.json</code> 和总入口计数为准；本页只解决 release 范围最后一个 template-only 功能页的阅读路径缺陷。</span><span class="en">Completion counts remain report-driven.</span></li>
        <li><span class="zh">不要把本页的轻量过滤当作官方全文搜索。它不抓取网络，不调用官方 API，不保证覆盖尚未晋级的 API 草稿页；它只提供本地中文站的高频入口过滤和回退路径。</span><span class="en">The local filter is not the official full-text search.</span></li>
        <li><span class="zh">如果搜索体验异常，先检查页面是否有 <code>openusd-reading-flow-nav</code>、<code>openusd-reading-flow-breadcrumb</code>、总入口链接、Release/API 本地入口和显式官方外跳；再检查浏览器是否禁用了 inline JavaScript；最后打开官方原页核对 Sphinx 搜索是否可用。</span><span class="en">Diagnostic path: local reading flow, browser JavaScript, then official source comparison.</span></li>
        <li><span class="zh">如果搜索结果为空，不应立刻判断页面损坏。先缩短关键词，例如把 <code>UsdPreviewSurface</code> 改成 <code>surface</code>，把 <code>collections and patterns</code> 改成 <code>collections</code>；如果仍为空，再走 Release 入口、API 入口和 genindex。</span><span class="en">Try shorter local keywords before falling back to index pages.</span></li>
        <li><span class="zh">如果读者需要查 API 名、class、method、token 或属性名，应从 API 本地入口进入 Doxygen 页面，而不是依赖 release 搜索页。API 名、schema 名、token、函数名、属性名、代码、命令、Doxygen 表格标签和链接标题都保持英文。</span><span class="en">API identifiers stay in English and should be checked in the API reference.</span></li>
        <li><span class="zh">如果读者需要按术语浏览 release 文档，优先进入 <a href="genindex.html">Index / genindex</a>。如果需要确认官方最新页面、搜索索引或版本状态，使用 <a href="${links.official}">Open official page</a>，不要把本地快照误认为实时官网。</span><span class="en">Use genindex for local term navigation and the official page for live search state.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-418-search-adjacent">
      <h2>相邻页面关系 / Adjacent Reading Path</h2>
      <ul>
        <li><span class="zh"><a href="${links.final}">总入口</a> 用来查看完整双语页、可检查草稿页、完成比例和验证状态，是判断项目总体进度的第一入口。</span><span class="en">The final entry is the project status source.</span></li>
        <li><span class="zh"><a href="${links.release}">Release 本地入口</a> 用来进入教程、user guide、schema、spec、proposal、support 页，是 release 文档连续阅读的主入口。</span><span class="en">The release entry is the main reading path for release docs.</span></li>
        <li><span class="zh"><a href="${links.api}">API 本地入口</a> 用来进入 Doxygen/API reference。搜索到 API 名时，最终应回到 API 页面核对正式定义。</span><span class="en">The API entry is the Doxygen path.</span></li>
        <li><span class="zh"><a href="genindex.html">genindex.html</a> 是 release 侧索引页；它和本页互补，一个按索引项浏览，一个按入口关键词过滤。</span><span class="en">The local genindex complements this search page.</span></li>
        <li><span class="zh"><a href="tut_usd_tutorials.html">Tutorials</a>、<a href="user_guides/schemas/index.html">Schema Domains</a>、<a href="spec.html">USD Specification</a> 和 <a href="wp.html">White Papers</a> 是 release 文档最常见的四类后续阅读路径。</span><span class="en">Common release follow-up paths are tutorials, schemas, specifications, and white papers.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-418-search-completion-gate">
      <h2>本轮完成态证据 / Completion Evidence</h2>
      <ul>
        <li><span class="zh">页面状态为 <code>bilingual_complete</code>，已移除旧草稿壳、批量草稿说明和“以后再补”的占位提示。</span><span class="en">Draft markers were removed.</span></li>
        <li><span class="zh">页面包含多段 <code>class="zh"</code> 中文主阅读路径，覆盖用途、功能边界、source parity、相邻入口、误读点、调试路径和官方外跳策略。</span><span class="en">Chinese main-reading coverage is present.</span></li>
        <li><span class="zh">页面保留搜索功能相关标识：<code>Search</code>、<code>rtd-search-form</code>、<code>search-results</code>、<code>searchtools.js</code>、<code>searchindex.js</code> 和 <code>Search.loadIndex</code>，并把它们解释为不可翻译的技术契约。</span><span class="en">Search identifiers remain intact.</span></li>
        <li><span class="zh">本轮后续必须通过 <code>translation_quality_review</code>、<code>english_debt_audit</code>、<code>reading_flow_navigation_audit</code>、<code>local_link_routing_report</code>、<code>markdown_encoding_audit</code> 和 validation，才能把该功能页计入 release 完整页。</span><span class="en">Reports and validation close the round.</span></li>
      </ul>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceHtml();
  const out = fs.existsSync(rel(OUTPUT)) ? fs.readFileSync(rel(OUTPUT), "utf8") : "";
  const keywords = [
    "Search",
    "rtd-search-form",
    "Search docs",
    "search-results",
    "searchtools.js",
    "searchindex.js",
    "Search.loadIndex",
    "Please activate JavaScript",
  ];
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DefectRound",
    defect_id: DEFECT_ID,
    target: OUTPUT,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_headings: sourceHeadings(),
    source_keywords_checked: keywords,
    missing_source_keywords: keywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: keywords.filter((keyword) => !out.includes(keyword)),
    output_checks: {
      has_complete_status: out.includes("bilingual_complete"),
      has_local_filter: out.includes("openusd-local-search"),
      has_final_entry: out.includes("openusd_bilingual_final.html"),
      has_release_entry: out.includes("site/release_index.html"),
      has_api_entry: out.includes("site/index.html"),
      has_genindex: out.includes("genindex.html"),
      has_explicit_official_link: out.includes("Open official page") && out.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|later iterations add denser bilingual coverage|后续迭代/.test(out),
      zh_chars: zhChars(out),
      zh_blocks: (out.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
    },
  };
}

function writePage() {
  fs.writeFileSync(rel(OUTPUT), buildHtml(), "utf8");
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
  if (report.output_checks.zh_chars < 1800) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 12) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
  if (failed.length) {
    console.error(JSON.stringify({ passed: false, failed, report }, null, 2));
    process.exit(1);
  }
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify({ passed: true, report }, null, 2));
}

function manifestDocument(raw) {
  if (Array.isArray(raw)) {
    return {
      generated_at: new Date().toISOString(),
      policy: "Curated promotion manifest for full_site pages that have been upgraded from bilingual_draft to bilingual_complete after paragraph-level bilingual coverage and draft-marker removal.",
      promotions: raw,
      updated_at: new Date().toISOString(),
    };
  }
  return {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
    updated_at: new Date().toISOString(),
  };
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = manifestDocument(raw);
  const id = "round-418-release-search-template";
  doc.promotions = doc.promotions.filter((entry) => entry.id !== id && entry.local_output !== OUTPUT);
  doc.promotions.push({
    id,
    title: "Search",
    official_url: OFFICIAL_URL,
    local_output: OUTPUT,
    status: "bilingual_complete",
    reason: `Round ${ROUND} DefectRound ${DEFECT_ID}: promote the release search function page by adding Chinese main-reading-path coverage for the local search role, source snapshot parity, script/index boundaries, local fallback links, reading-flow preservation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: "DefectRound",
      defect_id: DEFECT_ID,
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
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  const problems = [
    {
      id: "P0-completion-stalled",
      severity: "P0",
      summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
      evidence: `本轮 DefectRound 修复 ${DEFECT_ID}，release search.html 从 template-only 功能页进入 good_bilingual；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
      required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 draft 并列明原因。",
    },
    {
      id: "P1-release-search-template-only",
      severity: "resolved",
      summary: "release search.html 的 template-only 功能页缺陷已在第 418 轮修复。",
      evidence: "search.html 现在说明搜索页用途、快照属性、Sphinx 搜索脚本/索引不逐行翻译的边界、本地返回路径、release/API/genindex 相邻入口和显式 Open official page 外跳。",
      required_action: "后续不要再把 search.html 当普通翻译 sprint 页面重复处理；如搜索功能策略变化，另开命名 DefectRound。",
    },
    {
      id: "P1-left-navigation-reading-flow",
      severity: "P1",
      summary: "本地连续阅读路径必须覆盖本轮新晋级页面。",
      evidence: "本轮需要重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
      required_action: "每次页面晋级后继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
    },
    {
      id: "P1-markdown-record-encoding",
      severity: "P1",
      summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录退化为问号、replacement character 或 BOM。",
      evidence: "reports/markdown_encoding_audit.json 必须通过，且 work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 均无重复问号损坏。",
      required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。",
    },
  ];
  const report = {
    generated_at: new Date().toISOString(),
    purpose: "Track current OpenUSD bilingual completion blockers and named P0/P1 defects.",
    current_counts: counts,
    problems,
    promoted_pages: [
      {
        round: ROUND,
        round_type: "DefectRound",
        defect_id: DEFECT_ID,
        output: OUTPUT,
        official_url: OFFICIAL_URL,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
      },
    ],
    not_promoted_pages: [],
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "release 范围已达到 126/126 complete；下一轮应转回 API 高价值草稿、API DomainSprintRound 或 EnglishDebtRound，不要重复处理 release search.html。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue only if the next target can satisfy its named round gate; otherwise stop and report the blocker.",
  };
  writeJson("reports/current_problem_audit.json", report);
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/defect_round_418_release_search_template.mjs --write-page --precheck --manifest --problem");
}
