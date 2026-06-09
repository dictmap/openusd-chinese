import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 475;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_exec_esf_usd__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_475_esf_usd_readme_source_parity.json";
const PROMOTION_ID = "round-475-api-esf-usd-readme";
const PREVIOUS_GOOD_BILINGUAL = 240;
const PROMOTION_COMMIT_PLACEHOLDER = "round-475-promotion-commit-sha-before-push";

const expectedKeywords = [
  "EsfUsd: Execution Scene Foundation for Usd",
  "not meant for public use",
  "esfUsd library",
  "built on top of",
  "esf",
  "interfaces",
  "execution system",
  "access scene objects defined on a UsdStage",
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
  <title>EsfUsd: Execution Scene Foundation for Usd | OpenUSD API 中文导读</title>
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
    <h1>EsfUsd: Execution Scene Foundation for Usd</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-475-esf-usd-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 EsfUsd: Execution Scene Foundation for Usd 的 README 型入口页。它紧跟 Esf 阅读路径，但比 Esf 更靠近 USD 数据模型：官方正文说明 esfUsd library built on top of esf，并提供 interfaces，让 execution system 能访问定义在 UsdStage 上的 scene objects，用于 build and evaluate execution networks。它仍然不是公开用户 API，官方 note 明确写着 not meant for public use。</span><span class="en">This library is not meant for public use.</span></p>
      <p><span class="zh">如果把 OpenExec 栈按点击顺序展开，Esf 是抽象 scene foundation，EsfUsd 则是 USD 绑定层。Esf 只说明执行系统需要一组 scene object access interfaces；EsfUsd 进一步说明这些接口如何面向 UsdStage 上定义的 scene objects。读者不应把它理解成新的 UsdStage authoring 手册，而应把它理解为 OpenExec 内部如何把 USD scene description 接入执行网络的适配层。</span><span class="en">The esfUsd library is built on top of esf.</span></p>
      <p><span class="zh">本地中文页的重点是把短源文中的层次关系讲清楚：上游 Esf 规定抽象接口；当前 EsfUsd 把这些接口落到 USD；下游 ExecUsd 和 tutorial 页面展示用户如何请求 computed values。调试时若 network 可以构建但拿不到 USD 场景输入，要检查 UsdStage、prim、property、relationship 与 EsfUsd scene object adapter 的映射，而不是直接归因于 computation callback 或 Vdf executor。</span><span class="en">EsfUsd lets the execution system access scene objects defined on a UsdStage.</span></p>
    </section>

    <section data-cn-complete="round-475-esf-usd-source-order">
      <h2>官方正文顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 EsfUsd: Execution Scene Foundation for Usd：说明本页是 Esf 的 USD 版本或 USD 绑定层。EsfUsd、UsdStage、execution system 都必须保留英文原名，便于与 Doxygen 和源码目录核对。</span><span class="en">EsfUsd: Execution Scene Foundation for Usd</span></li>
        <li><span class="zh">note not meant for public use：这条边界与 Esf 一致，但在本页更重要，因为页面靠近 UsdStage，容易被误读成普通 USD API。中文主路径必须明确它服务 OpenExec 内部实现。</span><span class="en">This library is not meant for public use.</span></li>
        <li><span class="zh">The esfUsd library is built on top of esf：这句话给出依赖顺序。EsfUsd 不是替代 Esf，而是在 Esf 抽象接口之上增加 USD scene binding。</span><span class="en">The esfUsd library is built on top of esf.</span></li>
        <li><span class="zh">provides interfaces that allow the execution system：核心仍是 interfaces，使用者仍是 execution system；不同点在于访问对象从抽象 scene description objects 收窄到 UsdStage 上定义的 scene objects。</span><span class="en">The esfUsd library provides interfaces that allow the execution system.</span></li>
        <li><span class="zh">access scene objects defined on a UsdStage：这是本页独有关键词。它说明 EsfUsd 负责把 USD stage 上的场景对象暴露给执行系统，而不是负责 layer composition 规则或 authoring 行为本身。</span><span class="en">access scene objects defined on a UsdStage</span></li>
        <li><span class="zh">build and evaluate execution networks：访问 USD scene objects 的目的仍然是构建和求值执行网络；因此本页应与 System Design、ExecUsd、Vdf、Exec、Ef、Esf 串读。</span><span class="en">build and evaluate execution networks</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-475-esf-usd-stack">
      <h2>栈中位置 / Stack Position</h2>
      <ul>
        <li><span class="zh">相对 Esf：Esf 定义 scene foundation 抽象，EsfUsd 建立在 Esf 之上，把抽象 scene object access 连接到 USD 的 UsdStage。遇到抽象接口概念问题先看 Esf，遇到 USD stage 绑定问题再看 EsfUsd。</span><span class="en">EsfUsd is built on top of Esf.</span></li>
        <li><span class="zh">相对 ExecUsd：EsfUsd 更像内部适配层，ExecUsd 更靠近 OpenExec 面向 USD 客户端的 request、cache view 和 system API。用户请求值时通常读 ExecUsd；排查 USD scene objects 如何被执行系统看到时读 EsfUsd。</span><span class="en">ExecUsd is closer to the client-facing USD execution API.</span></li>
        <li><span class="zh">相对 Vdf、Exec 和 Ef：Vdf 解释 data-flow network，Exec 解释 execution core，Ef 解释 execution foundation；EsfUsd 则解释执行核心如何触达 UsdStage 上的 scene objects。它不是 network executor，也不是 computation registration 层。</span><span class="en">EsfUsd is the USD scene-access binding, not the network executor.</span></li>
        <li><span class="zh">相对 Usd、Sdf 和 Pcp：这些模块解释 scene description、layer stack、composition 和 authoring；EsfUsd 依赖这些概念的结果，但它的职责是为 OpenExec 暴露 stage 上的 scene objects，而不是重新定义 USD composition。</span><span class="en">Usd, Sdf, and Pcp remain the composition and authoring documentation path.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-475-esf-usd-interface-role">
      <h2>接口职责 / Interface Responsibilities</h2>
      <p><span class="zh">EsfUsd 的 interfaces 解决的是一个具体问题：execution system 在编译和求值 execution networks 时，需要读取来自 UsdStage 的 scene objects。它不应该让每个 computation callback 自己直接穿透所有 USD 细节，也不应该让执行核心直接依赖单个 stage 实现细节。EsfUsd 在 Esf 抽象基础上提供 USD 适配接口，让执行系统能以稳定方式获取 stage 上的对象、属性、关系和值。</span><span class="en">EsfUsd provides USD-specific scene access interfaces.</span></p>
      <p><span class="zh">这里的 scene objects defined on a UsdStage 可以按调试粒度理解：对象身份来自 stage 和 prim 路径，输入可能来自 attribute、relationship、metadata 或 schema 约定，变化通知会影响 execution network 的依赖和 invalidation。EsfUsd 不是直接告诉用户如何 author 这些字段，而是把已经由 USD 数据模型表达出的场景对象变成 execution system 可消费的接口。</span><span class="en">Scene objects are defined on a UsdStage and consumed by the execution system.</span></p>
      <p><span class="zh">因此当 computed value 缺输入时，应沿三个层面排查：第一，UsdStage 中是否真的存在目标 prim、property 或 relationship；第二，EsfUsd 是否把这些 stage objects 暴露成了执行系统期望的 scene objects；第三，Exec/Vdf/Ef 层是否正确构建网络并求值。把这三个层面分开，能避免把 USD 数据缺失、适配层遗漏和执行网络错误混为一谈。</span><span class="en">Debugging separates USD data presence, EsfUsd adaptation, and execution network evaluation.</span></p>
      <p><span class="zh">官方正文虽然短，但 built on top of esf 这句话很关键：EsfUsd 没有跳过抽象层直接绑定到 execution core，而是在 Esf 的接口契约上加 USD 实现。这个设计让 OpenExec 可以保持 scene foundation 与具体数据模型之间的分层边界，也让未来其他 scene source 有机会通过类似适配方式进入执行系统。</span><span class="en">The built-on-top relationship preserves the abstraction boundary.</span></p>
      <p><span class="zh">在实际排障时还要关注生命周期和一致性。UsdStage 上的 scene objects 可能来自多个 layer、variant、reference 或 payload 的组合结果；EsfUsd 面向的是组合后的 stage 视图，而不是单个 layer 的原始文本。如果用户认为某个输入已经写入 USD 但 OpenExec 没有看到，应先确认 stage composition 后的对象是否存在，再确认 EsfUsd 适配层是否能把它映射到执行系统可识别的 scene object，最后才检查 execution network 是否正确建立依赖。</span><span class="en">EsfUsd sees the composed UsdStage view used by the execution system.</span></p>
    </section>

    <section data-cn-complete="round-475-esf-usd-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">标题段：EsfUsd: Execution Scene Foundation for Usd 中的 for Usd 是本页与 Esf 的核心区别。它说明本页讨论的是 USD 绑定，而不是通用 scene foundation 抽象。</span><span class="en">EsfUsd: Execution Scene Foundation for Usd</span></p>
      <p><span class="zh">note 段：not meant for public use 说明页面是内部层说明。即使它提到 UsdStage，也不能把它当作普通用户直接调用或 authoring 的 API 文档。</span><span class="en">This library is not meant for public use.</span></p>
      <p><span class="zh">依赖段：The esfUsd library is built on top of esf 说明 EsfUsd 继承 Esf 的抽象接口语义，并在其上提供 USD-specific access。阅读时应先理解 Esf，再读本页。</span><span class="en">The esfUsd library is built on top of esf.</span></p>
      <p><span class="zh">接口段：The esfUsd library provides interfaces 继续强调接口层定位。它提供的是 execution system 与 USD stage object 之间的访问契约，不是 end-user command 或 schema authoring recipe。</span><span class="en">The esfUsd library provides interfaces.</span></p>
      <p><span class="zh">访问对象段：access scene objects defined on a UsdStage 是本页最具体的 source parity 关键词。中文解释必须保留 UsdStage，因为它指向 USD stage 上已经定义好的 scene objects，而不是任意外部数据源。</span><span class="en">access scene objects defined on a UsdStage</span></p>
      <p><span class="zh">目的段：in order to build and evaluate execution networks 把 EsfUsd 放回 OpenExec 主流程。它帮助构建网络时发现依赖，也帮助求值网络时读取来自 USD stage 的输入。</span><span class="en">in order to build and evaluate execution networks</span></p>
    </section>

    <section data-cn-complete="round-475-esf-usd-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">如果问题是抽象 scene interface 的概念边界，先回到 Esf；如果问题是 UsdStage 上对象如何被 execution system 看到，再读 EsfUsd。</span><span class="en">Use Esf for abstraction and EsfUsd for USD binding.</span></li>
        <li><span class="zh">如果问题是 computation 没有注册、request 没有发出或 cache view 没返回值，先看 Tutorial 2、System Design 和 ExecUsd；不要把客户端 API 问题直接归因于 EsfUsd。</span><span class="en">Client request and computation registration issues belong above EsfUsd.</span></li>
        <li><span class="zh">如果问题是 prim path、attribute、relationship 或 composition 结果不符合预期，先看 Usd、Sdf、Pcp 和相关 schema 文档；EsfUsd 只消费 stage 上已经形成的 scene objects。</span><span class="en">Composition and authoring issues belong to Usd, Sdf, and Pcp.</span></li>
        <li><span class="zh">如果问题是 network evaluation 性能、cache reuse 或 executor 行为，先看 Vdf、Ef 和 Exec；EsfUsd 主要负责 USD scene access，不负责 data-flow executor 策略本身。</span><span class="en">Evaluation mechanics belong near Vdf, Ef, and Exec.</span></li>
        <li><span class="zh">如果 scene change 后 computed value 没失效，要分清是 USD notice/scene object mapping 没到达 EsfUsd，还是后续 dependency/invalidation 网络没表达正确。</span><span class="en">Invalidation debugging separates USD adaptation from execution dependency propagation.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-475-esf-usd-click-path">
      <h2>本地点击顺序 / Local Click Path</h2>
      <p><span class="zh">推荐本地点击顺序：总入口 -> API 本地入口 -> OpenExec Overview -> Tutorial 1 -> Tutorial 2 -> System Design -> ExecUsd README -> Vdf README -> Exec README -> Ef README -> Esf README -> 当前 EsfUsd README。这样读者先理解执行系统和抽象 scene foundation，再进入 USD stage 绑定层。</span><span class="en">The local click path reaches EsfUsd after Esf.</span></p>
      <p><span class="zh">本页下一步通常是 ExecGeom README 或其他 OpenExec 实现相关页面，因为它们继续展示具体 USD/geometry 语义如何进入执行系统。Open official page 是显式外跳，不能混入本地 prev/next/related 作为普通点击顺序。</span><span class="en">The next local step can continue into ExecGeom or adjacent OpenExec implementation pages.</span></p>
      <ul>
        <li><span class="zh">本地入口：openusd_bilingual_final.html 与 site/api/index.html。</span><span class="en">Local entrances are preserved.</span></li>
        <li><span class="zh">上一页建议：md_pxr_exec_esf__r_e_a_d_m_e.html，因为它解释抽象 scene foundation。</span><span class="en">Previous page: Esf README.</span></li>
        <li><span class="zh">下一页建议：md_pxr_exec_exec_geom__r_e_a_d_m_e.html 或其他 OpenExec USD/geometry 相邻实现页。</span><span class="en">Next page: ExecGeom README or adjacent implementation pages.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-475-esf-usd-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对 source snapshot：${esc(SOURCE)}。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：EsfUsd: Execution Scene Foundation for Usd、not meant for public use、esfUsd library、built on top of、esf、interfaces、execution system、access scene objects defined on a UsdStage、build and evaluate execution networks。</span><span class="en">Official terms and boundaries are preserved.</span></li>
        <li><span class="zh">显式官方外跳：Open official page。其他阅读路径优先指向本地页面，避免用户点击顺序被官方 URL 文本泄漏打断。</span><span class="en">The official external jump is explicit.</span></li>
      </ul>
      <p><a href="${OFFICIAL_URL}">Open official page</a></p>
    </section>

    <section data-cn-complete="round-475-esf-usd-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：EsfUsd 建立在 Esf 之上；它不是公开用户 API；它提供接口让 execution system 访问定义在 UsdStage 上的 scene objects；它服务于 build and evaluate execution networks；它与 Esf 抽象接口、ExecUsd 客户端请求、Vdf/Ef 执行基础和 Usd/Sdf/Pcp composition 文档各有分工。</span><span class="en">A review-ready reader can explain EsfUsd's USD scene binding role and its neighbors.</span></p>
      <p><span class="zh">本页达到完成状态的依据是：官方短正文的所有关键术语均保留并解释，中文主阅读路径覆盖页面职责、官方 note、Esf 依赖、UsdStage 绑定、接口边界、相邻 OpenExec 层次、常见误读、调试路径和本地点击顺序；页面不再依赖草稿导读或英文摘录表作为主要内容。</span><span class="en">The completed page makes the short source readable without inventing APIs outside the source scope.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_exec_esf__r_e_a_d_m_e.html">上一页：Esf README</a></p>
      <p><a href="md_pxr_exec_exec_geom__r_e_a_d_m_e.html">下一步：ExecGeom README</a></p>
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
        html.includes("UsdStage") &&
        html.includes("built on top of esf") &&
        html.includes("access scene objects defined on a UsdStage") &&
        html.includes("build and evaluate execution networks"),
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
    title: "EsfUsd: Execution Scene Foundation for Usd",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the EsfUsd README/API entry page by adding Chinese main-reading-path coverage for the internal-use note, Esf dependency, USD stage scene-object interfaces, execution-network build/evaluate semantics, Esf/EsfUsd/ExecUsd/Vdf/Ef boundaries, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 EsfUsd README source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        summary: "OpenExec/Esf/EsfUsd 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。",
        evidence: "本轮覆盖 EsfUsd README 的 internal-use note、built on top of esf、UsdStage scene objects、build/evaluate execution networks，并保留 Overview -> Tutorial -> System Design -> ExecUsd -> Vdf -> Exec -> Ef -> Esf -> EsfUsd 的本地点击路径。",
        required_action: "后续 ExecGeom/ExecIr 等页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。",
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
    next_action: "下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 ExecGeom/ExecIr 等仍为 bilingual_draft 且有 source snapshot 的页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_475_esf_usd_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_475_esf_usd_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
