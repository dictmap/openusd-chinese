import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 473;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_esf__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_esf__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_473_esf_readme_source_parity.json";
const PROMOTION_ID = "round-473-api-esf-readme";
const PREVIOUS_GOOD_BILINGUAL = 239;
const PROMOTION_COMMIT_PLACEHOLDER = "round-473-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Esf: Execution Scene Foundation",
  "not meant for public use",
  "esf library",
  "interfaces",
  "execution system",
  "access scene description objects",
  "build and evaluate execution networks",
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

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&zwj;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
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
  <title>Esf: Execution Scene Foundation | OpenUSD API 中文导读</title>
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
    <h1>Esf: Execution Scene Foundation</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-473-esf-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 Esf: Execution Scene Foundation 的 README 型入口页。官方正文很短，但它给 OpenExec 点击路径补上一个关键层次：Esf 是 execution system 访问 scene description objects 的接口层，用来支持构建和求值 execution networks。它不是普通用户 author USD 的公开 API，也不是 schema 教程；官方 note 明确写着 not meant for public use，所以中文页必须诚实说明它主要服务执行系统内部实现和相邻适配层。</span><span class="en">This library is not meant for public use.</span></p>
      <p><span class="zh">沿本地 OpenExec 阅读顺序看，Vdf 先解释 data-flow network 的底层词汇，Exec 解释 execution system core 如何定义 computations、摄取 scene 并编译/求值 network，Ef 解释 execution foundation 的 node、executor、cache 和 traversal 支撑；当前 Esf 则把焦点移到 scene description objects。它提供 interfaces，让执行系统在 build 和 evaluate execution networks 时能读取场景对象，而不把执行核心硬绑到某一种具体 scene representation。</span><span class="en">The esf library provides interfaces that allow the execution system to access scene description objects in order to build and evaluate execution networks.</span></p>
      <p><span class="zh">读者可以把 Esf 理解为 scene access adapter contract 的抽象基础层。上层 computation 需要依赖 scene object、property、relationship 或 value；下层可能来自 USD stage、prim、property 或其他场景描述系统。Esf 的作用是定义这些对象如何被 execution system 以统一接口访问。真正把这些接口落到 USD 数据模型上的页面通常是 EsfUsd，而请求值、注册 computation 和客户端 API 则在 ExecUsd 或 tutorial 页面里展开。</span><span class="en">Esf is the scene-description-facing foundation layer for OpenExec internals.</span></p>
    </section>

    <section data-cn-complete="round-473-esf-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 Esf: Execution Scene Foundation：说明本页属于 execution scene foundation，而不是 Ef execution foundation，也不是 ExecUsd 的用户请求 API。标题中的 Esf 必须保留原样，因为它是模块名和 Doxygen 检索入口。</span><span class="en">Esf: Execution Scene Foundation</span></li>
        <li><span class="zh">note not meant for public use：这是本页最重要的边界句。中文主阅读必须告诉读者，本页适合理解 OpenExec 内部抽象，不适合作为日常 USD authoring、asset pipeline 或 schema 使用手册。</span><span class="en">This library is not meant for public use.</span></li>
        <li><span class="zh">正文中的 esf library provides interfaces：Esf 的关键词是 interfaces。它不承诺提供某个高层工具命令，而是提供 execution system 与 scene description objects 之间的接口契约。</span><span class="en">The esf library provides interfaces.</span></li>
        <li><span class="zh">allow the execution system to access scene description objects：这句话说明调用方向。执行系统为了构建和求值 network，需要读取 scene description objects；Esf 负责把这种访问抽象出来。</span><span class="en">allow the execution system to access scene description objects</span></li>
        <li><span class="zh">build and evaluate execution networks：这说明 Esf 的场景访问发生在 network 编译和 evaluation 流程中。它不是静态文档索引页，而是执行网络形成和运行时所需的基础接口说明。</span><span class="en">build and evaluate execution networks</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-473-esf-stack">
      <h2>栈中位置 / Stack Position</h2>
      <ul>
        <li><span class="zh">相对 Vdf：Vdf 关注 data-flow network 的结构、node、input/output 和 executor 低层语义；Esf 不重新定义这些网络语义，而是让执行系统能从 scene description objects 中取到构建和求值网络所需的信息。</span><span class="en">Vdf is the data-flow foundation; Esf is the scene access foundation.</span></li>
        <li><span class="zh">相对 Ef：Ef 关注 execution foundation，如 VdfNode types、VdfExecutorInterface、cache 和 traversal；Esf 关注 scene object 如何被访问。二者都在 OpenExec 内部栈中，但一个偏 execution mechanics，一个偏 scene abstraction。</span><span class="en">Ef supports execution mechanics; Esf supports scene abstraction.</span></li>
        <li><span class="zh">相对 Exec：Exec README 说明 execution system core 如何定义 computations、摄取 scenes、编译 data flow networks 并 evaluate；Esf 是 Exec 能够摄取 scene information 的接口基础之一。</span><span class="en">Exec uses scene-facing interfaces while organizing the computation system.</span></li>
        <li><span class="zh">相对 EsfUsd：Esf 是抽象接口层，EsfUsd 通常负责把这些接口映射到 USD 的 UsdStage、prim、property 和 relationship。调试时要先分清是抽象接口问题，还是 USD 绑定/适配问题。</span><span class="en">EsfUsd is the USD binding for the Esf-style scene abstraction.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-473-esf-interface-role">
      <h2>接口职责 / Interface Responsibilities</h2>
      <p><span class="zh">interfaces 是本页的核心词。对 OpenExec 来说，computed value 往往依赖场景中的对象、属性、关系、命名空间或值。execution system 不应在每个 computation 中直接了解所有具体数据模型细节；它需要一组稳定接口，以统一方式访问 scene description objects。Esf 就是在这个位置提供基础抽象，让后续编译 execution networks 时能够发现依赖、读取输入、建立 network 节点，并在 evaluation 阶段根据场景变化重新请求或失效相关值。</span><span class="en">Esf provides interfaces for accessing scene description objects.</span></p>
      <p><span class="zh">这也解释了为什么官方强调 not meant for public use。普通 USD 作者更常接触 UsdStage、UsdPrim、UsdAttribute、schema API、ExecUsdRequest 或 tutorial 中的 client API；Esf 则是在这些用户可见 API 背后帮助执行系统理解 scene objects 的内部契约。若把它误当成公开 authoring API，就容易在错误层面查找问题。</span><span class="en">This is an internal foundation layer, not the public client API.</span></p>
      <p><span class="zh">当执行网络需要构建时，系统要知道哪些 scene description objects 参与 computation，哪些 property 或 relationship 构成输入，哪些场景变化会导致 cached results 失效。Esf 的接口层让这些问题可以在抽象层描述；具体数据源如何实现这些接口，则交给 EsfUsd 或其他适配层。这个分工能避免 OpenExec core 直接依赖某个单一 scene storage 细节。</span><span class="en">The interfaces support building and evaluating execution networks from scene data.</span></p>
      <p><span class="zh">从调试角度看，Esf 的价值还在于把 scene access 的失败范围收窄。如果 execution network 构建不完整，先确认执行系统是否通过 Esf 风格接口看到了正确的 scene object；如果求值时输入缺失，再确认 property 或 relationship 是否能被抽象接口解析；如果场景变化后结果没有刷新，再把 scene access、dependency 表达和 cache invalidation 分层检查。这样可以避免把所有问题都混到 computation callback 或 Vdf executor 里。</span><span class="en">Esf helps isolate scene access failures from callback and executor failures.</span></p>
    </section>

    <section data-cn-complete="round-473-esf-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">标题段：Esf: Execution Scene Foundation 中的 Scene Foundation 是关键信号。它不是 rendering、physics 或 USD composition 模块，而是 OpenExec 访问 scene description objects 的基础接口层。</span><span class="en">Esf: Execution Scene Foundation</span></p>
      <p><span class="zh">note 段：not meant for public use 必须保留。中文页将其解释为内部层边界：可以读它来理解执行系统架构，但不要把它当成日常调用入口，也不要在业务代码里优先依赖内部接口。</span><span class="en">This library is not meant for public use.</span></p>
      <p><span class="zh">正文第一部分：The esf library provides interfaces 说明 Esf 的输出是接口，而不是 end-user workflow。接口的价值在于把 execution system 与 scene description data 解耦。</span><span class="en">The esf library provides interfaces.</span></p>
      <p><span class="zh">正文第二部分：allow the execution system to access scene description objects 说明接口的使用者是 execution system，访问对象是 scene description objects。这里的 scene description objects 可以理解为被执行网络读取的抽象场景对象，而不是某个页面新增的公开 schema 类型。</span><span class="en">allow the execution system to access scene description objects</span></p>
      <p><span class="zh">正文第三部分：in order to build and evaluate execution networks 把 Esf 放回 OpenExec 主流程。构建阶段需要发现和连接依赖；求值阶段需要读取输入、响应 invalidation 并返回 computed results。Esf 不是单独执行 computation，而是让 network 的构建和 evaluation 能够看到场景数据。</span><span class="en">in order to build and evaluate execution networks</span></p>
      <p><span class="zh">链接语义：本页没有丰富的同站链接，因此本地中文页通过 reading-flow 导航把它放在 OpenExec 系列真实点击路径中。显式官方外跳只保留 Open official page，正文阅读优先使用本地 API 入口、OpenExec overview、Vdf、Exec、Ef 和后续 EsfUsd/ExecGeom 页面。</span><span class="en">The local page keeps the official jump explicit and keeps the reading path local.</span></p>
    </section>

    <section data-cn-complete="round-473-esf-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是 network node、executor、value cache 或 traversal cache，先看 Vdf 和 Ef；Esf 只解释 execution system 如何通过抽象接口接触 scene description objects。</span><span class="en">Network mechanics belong near Vdf and Ef.</span></li>
        <li><span class="zh">如果问题是 USD stage、prim、property 或 relationship 如何映射到抽象 scene object，优先看 EsfUsd 或 ExecUsd，因为它们更靠近 USD 数据模型和用户请求 API。</span><span class="en">USD binding issues belong near EsfUsd and ExecUsd.</span></li>
        <li><span class="zh">如果 computation 注册失败、callback 没有被调用或 request 没返回值，先沿 Tutorial 2、System Design、ExecUsd request/cache view 路径检查；不要直接把所有失败归因于 Esf。</span><span class="en">Computation registration and client request issues live above Esf.</span></li>
        <li><span class="zh">如果 scene change 后旧值没有失效，要区分是 scene object lookup 错误、dependency 没被正确表达、invalidation 没传播，还是 evaluation cache 复用错误。Esf 只覆盖 scene access interface 这一段线索。</span><span class="en">Invalidation debugging must separate scene access from cache reuse.</span></li>
        <li><span class="zh">如果目标是普通 USD 文档写作、资产组织或 schema authoring，应回到 Usd、Sdf、Pcp、release user guides；Esf 不是这些任务的入口。</span><span class="en">Usd authoring and composition are separate documentation paths.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-473-esf-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：总入口 -> API 本地入口 -> OpenExec Overview -> Tutorial 1 -> Tutorial 2 -> System Design -> ExecUsd README -> Vdf README -> Exec README -> Ef README -> 当前 Esf README。这个顺序先让读者理解用户可见请求、computation 定义、系统设计、data-flow/execution foundation，再进入 scene foundation 接口层。</span><span class="en">The local click path reaches Esf after the OpenExec overview, tutorials, design, Vdf, Exec, and Ef pages.</span></p>
      <p><span class="zh">下一步通常是 EsfUsd README，因为它把抽象 scene foundation 映射到 USD；也可以转到 ExecGeom README 理解几何相关 execution 扩展。Open official page 是显式外跳，不能混入 prev/next/related 作为普通本地阅读路径。</span><span class="en">The next local reading step is usually EsfUsd README or adjacent OpenExec implementation pages.</span></p>
      <ul>
        <li><span class="zh">本地入口：openusd_bilingual_final.html 与 site/api/index.html。</span><span class="en">Local entrances are preserved.</span></li>
        <li><span class="zh">上一页建议：md_pxr_exec_ef__r_e_a_d_m_e.html，因为它解释 execution foundation。</span><span class="en">Previous page: Ef README.</span></li>
        <li><span class="zh">下一页建议：md_pxr_exec_esf_usd__r_e_a_d_m_e.html，因为它更靠近 USD scene binding。</span><span class="en">Next page: EsfUsd README.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-473-esf-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：${esc(SOURCE)}。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：Esf: Execution Scene Foundation、not meant for public use、esf library、interfaces、execution system、access scene description objects、build and evaluate execution networks。</span><span class="en">Official terms and boundaries are preserved.</span></li>
        <li><span class="zh">显式官方外跳：Open official page。其他阅读路径优先指向本地页面，避免用户点击顺序被官方 URL 文本泄漏打断。</span><span class="en">The official external jump is explicit.</span></li>
      </ul>
      <p><a href="${OFFICIAL_URL}">Open official page</a></p>
    </section>

    <section data-cn-complete="round-473-esf-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：Esf 是 OpenExec 内部 scene foundation 接口层；官方明确它 not meant for public use；它让 execution system 能访问 scene description objects；它服务于 build and evaluate execution networks；它与 Ef 的 execution mechanics、Vdf 的 data-flow foundation、Exec 的 execution core、EsfUsd 的 USD binding 各有分工。</span><span class="en">A review-ready reader can explain Esf's internal scene-access role and its neighbors.</span></p>
      <p><span class="zh">本页达到完成状态的依据是：官方短正文的所有关键术语均保留并解释，中文主阅读路径覆盖页面职责、官方 note、接口边界、相邻 OpenExec 层次、常见误读、调试路径和本地点击顺序；页面不再依赖草稿导读或英文摘录表作为主要内容。</span><span class="en">The completed page makes the short source readable without inventing APIs outside the source scope.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_ef__r_e_a_d_m_e.html">上一页：Ef README</a></p>
      <p><a href="md_pxr_exec_esf_usd__r_e_a_d_m_e.html">下一步：EsfUsd README</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
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
        html.includes("not meant for public use") &&
        html.includes("access scene description objects") &&
        html.includes("build and evaluate execution networks") &&
        html.includes("EsfUsd"),
      zh_chars: zhCharCount(html),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
  };
}

function checkReport(report) {
  const checks = report.output_checks;
  const passed =
    report.missing_source_keywords.length === 0 &&
    report.missing_output_keywords.length === 0 &&
    checks.bilingual_complete &&
    checks.no_draft_marker &&
    checks.has_main_reading_path &&
    checks.has_official_link &&
    checks.has_code_path &&
    checks.zh_chars >= 1800 &&
    checks.zh_blocks >= 22;
  return { ...report, passed };
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
    title: "Esf: Execution Scene Foundation",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Esf README/API entry page by adding Chinese main-reading-path coverage for the internal-use note, execution-system interfaces, scene description object access, execution network build/evaluate semantics, Esf/Ef/Vdf/Exec/EsfUsd boundaries, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Esf README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/Ef/Esf 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 Esf README 的 internal-use note、execution system interfaces、scene description object access、build/evaluate execution networks，并保留 Overview -> Tutorial -> System Design -> ExecUsd -> Vdf -> Exec -> Ef -> Esf 的本地点击路径。",
        required_action: "后续 EsfUsd/ExecGeom 等页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 EsfUsd/ExecGeom 等仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_473_esf_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_473_esf_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
