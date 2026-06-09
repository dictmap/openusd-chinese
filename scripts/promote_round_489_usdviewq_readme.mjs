import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 489;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_489_usdviewq_readme_source_parity.json";
const PROMOTION_ID = "round-489-api-usdviewq-readme";
const PREVIOUS_GOOD_BILINGUAL = 247;
const PROMOTION_COMMIT_PLACEHOLDER = "round-489-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Development Practices For usdview",
  "Modifying GUI",
  "Please do not hand edit .ui files",
  "qt's xml format is fragile",
  "tools are inconsistent across platforms",
  "bad constructs",
  "qdesigner5",
  ".ui documents",
  "allergic to gui tools",
  "load the file in qdesigner5",
  "ensure it loads without error",
  "save the file back out",
  "next developer using qdesigner5",
  "unrelated diffs",
  "Testing",
  "pxr/usdImaging/bin/testusdview",
  "add new ones whenever possible",
  "blackBoxTesting.md",
  "features that cannot be tested by testusdview",
  "usdview",
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

function pageHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Development Practices For usdview | OpenUSD API 中文导读</title>
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
    <h1>Development Practices For usdview</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-489-usdviewq-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页是 <code>usdview</code> / <code>usdviewq</code> 的贡献者开发实践说明，不是普通用户的 usdview 操作手册。官方正文很短，但它定义了两个硬约束：修改 GUI 时不要直接手写 <code>.ui</code> 文件；修改或新增行为时必须运行 <code>pxr/usdImaging/bin/testusdview</code>，并在功能无法由 <code>testusdview</code> 覆盖时补充 <code>blackBoxTesting.md</code>。中文阅读应先把它放在 usdview 的开发流程里理解：UI 文件、Qt 设计器、跨平台可读性、测试覆盖和 review diff 稳定性比单个 API 名称更重要。</span><span class="en">Development Practices For usdview.</span></p>
      <p><span class="zh">本页的中文主线可以按一次真实代码评审来读：如果改动触碰 usdview 的界面文件，首要问题不是功能是否看起来可用，而是 Qt 生成的点 ui 文件是否仍能被 qdesigner5 正常加载、保存并由下一个开发者继续维护；如果改动触碰 usdview 的交互行为，首要问题也不是人工点选是否通过，而是 pxr/usdImaging/bin/testusdview 是否覆盖了可自动化的回归路径，无法自动化表达的功能是否补充到 blackBoxTesting.md。这样阅读时能明确区分文件格式安全、viewer 行为正确性、自动化测试覆盖和黑盒验证记录四类责任，也能让审查者快速判断证据是否完整，并减少返工成本。</span><span class="en">The Chinese main path frames the page as a contributor review checklist.</span></p>
      <p><span class="zh">这页的核心边界是 contributor workflow。它不解释如何加载 stage、如何操作 viewport，也不描述 Hydra 或 imaging delegate 的渲染行为；它只约束 usdview UI 层和测试层的提交实践。若读者正在修改 viewer state、菜单、面板、selection 显示、plugin hook 或 Qt widget，这页告诉你改动如何保持可审查、可被下一个开发者用 <code>qdesigner5</code> 打开，并能通过自动化测试或黑盒测试文档留证。</span><span class="en">The page focuses on development practices rather than end-user behavior.</span></p>
    </section>

    <section data-cn-complete="round-489-usdviewq-source-order">
      <h2>官方 section 顺序 / Source Section Order</h2>
      <ol>
        <li><span class="zh">标题 <code>Development Practices For usdview</code> 表明页面对象是 usdview 开发规范。这里的 <code>usdviewq</code> 可理解为 usdview 的 Qt/UI 实现上下文，适合贡献者在改 GUI 或测试时查阅。</span><span class="en">Development Practices For usdview.</span></li>
        <li><span class="zh"><code>Modifying GUI</code> 是第一段实际规则。官方加粗提醒：<code>Please do not hand edit .ui files</code>，原因是 <code>qt's xml format is fragile</code>，并且 Qt 工具在不同平台上对 <code>bad constructs</code> 的容忍度不一致。</span><span class="en">Please do not hand edit .ui files, as qt's xml format is fragile.</span></li>
        <li><span class="zh">同一段给出推荐路径：优先使用 <code>qdesigner5</code> 修改 <code>.ui documents</code>。如果贡献者不想用 GUI 工具，至少在手工编辑后，提交前也要用 <code>qdesigner5</code> 加载文件、确认无错误、再保存回写并提交该输出。</span><span class="en">Instead prefer qdesigner5 to make edits to the .ui documents.</span></li>
        <li><span class="zh"><code>Testing</code> 是第二段实际规则。官方要求运行 <code>pxr/usdImaging/bin/testusdview</code> 中的 tests，并在可能时新增测试。无法由 <code>testusdview</code> 覆盖的 feature，应查看并补充 <code>blackBoxTesting.md</code>。</span><span class="en">Please run the tests in pxr/usdImaging/bin/testusdview, and add new ones whenever possible.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-489-usdviewq-gui-practice">
      <h2>Modifying GUI：<code>.ui</code> 文件和 <code>qdesigner5</code></h2>
      <p><span class="zh">官方对 <code>.ui</code> files 的态度非常明确：不要手写。<code>.ui</code> 本质上是 Qt 的 XML 格式，看似可读，但格式脆弱，而且不同平台的 Qt 工具链对坏结构、属性顺序、未知节点或不规范 XML 的容忍度可能不同。一个本地能打开的手改文件，可能让另一个平台上的开发者或 CI 工具产生无关 diff 或加载错误。</span><span class="en">qt's xml format is fragile and its tools are inconsistent across platforms on tolerance to bad constructs.</span></p>
      <p><span class="zh">推荐流程是用 <code>qdesigner5</code> 修改 <code>.ui documents</code>。这不是单纯偏好 GUI 工具，而是为了让 Qt 自己重新序列化 XML，减少无关格式差异，并保证下一个开发者也能用 <code>qdesigner5</code> 继续编辑。对于 usdview 这种跨平台开发工具，review 中最怕的是 UI 逻辑还没变，文件格式却出现大段噪声 diff。</span><span class="en">Prefer qdesigner5 to make edits to the .ui documents.</span></p>
      <p><span class="zh">如果确实手动编辑了 <code>.ui</code> 文件，最低验收动作是：在提交前把文件加载到 <code>qdesigner5</code>，确认它 loads without error，然后 save the file back out，并把保存后的文件提交。这样下一个 developer using <code>qdesigner5</code> 不会面对 unrelated diffs，也不会因为你的手工 XML 结构被工具改写而难以审查真实 GUI 改动。</span><span class="en">After making hand edits, prior to checking them in, load the file in qdesigner5, ensure it loads without error, and then save the file back out.</span></p>
    </section>

    <section data-cn-complete="round-489-usdviewq-testing-practice">
      <h2>Testing：<code>testusdview</code> 和 <code>blackBoxTesting.md</code></h2>
      <p><span class="zh">测试段的主线是 <code>pxr/usdImaging/bin/testusdview</code>。修改 usdview UI、交互状态、菜单、面板显示或 viewer behavior 后，应先运行该目录下的 tests；如果功能可以自动化验证，应在可能时新增测试，而不是只做人工点选。这样做可以把 UI 行为变化纳入可重复的回归检查。</span><span class="en">Please run the tests in pxr/usdImaging/bin/testusdview, and add new ones whenever possible.</span></p>
      <p><span class="zh"><code>blackBoxTesting.md</code> 是无法直接由 <code>testusdview</code> 覆盖的功能的补充记录入口。它适合记录需要外部行为观察、复杂 GUI 路径、交互式验证或人工判断的 feature。官方要求在添加这类 features 时补充该文档，目的是让后续维护者知道哪些行为仍依赖黑盒验证，而不是误以为 <code>testusdview</code> 已经覆盖全部路径。</span><span class="en">See blackBoxTesting.md, and please add to it when adding features that cannot be tested by testusdview.</span></p>
      <p><span class="zh">调试失败时，先按范围分层：若 <code>.ui</code> 无法打开或出现大规模格式 diff，回到 <code>qdesigner5</code> 验证；若 UI 能打开但行为错误，运行 <code>testusdview</code> 定位可自动化的 regression；若问题来自用户视角的交互路径但测试无法表达，补充 <code>blackBoxTesting.md</code> 并链接到相应测试或手工步骤。这样可避免把 GUI 格式、交互行为和测试覆盖混成一个模糊问题。</span><span class="en">Testing responsibility is split between testusdview and blackBoxTesting.md.</span></p>
      <p><span class="zh">在 CI 或 pull request review 中，建议把这两个 section 当成 checklist：凡是触碰 <code>.ui</code> 的改动，都要确认是否经过 <code>qdesigner5</code> 重新保存；凡是触碰 usdview 行为的改动，都要说明 <code>testusdview</code> 覆盖情况或 <code>blackBoxTesting.md</code> 补充情况。这样 review 者可以快速区分“界面文件格式安全”“自动化测试已覆盖”和“仍需黑盒路径记录”三类证据。</span><span class="en">Review should separate UI file safety, automated test coverage, and black-box coverage notes.</span></p>
      <p><span class="zh">对首次进入该页的贡献者，本地阅读顺序应当先看 <code>Modifying GUI</code>，确认自己是否真的需要改动 Qt 生成的 <code>.ui</code> 文件；再看 <code>Testing</code>，确认改动是否能落到自动化测试；最后才进入黑盒测试说明。这个顺序能避免一个常见误读：把本页理解成“可以手工改 XML，只要最后跑测试即可”。官方实际强调的是提交前的文件格式责任和后续开发者可维护性，测试只是另一条并行证据，不会替代 <code>qdesigner5</code> 的加载保存检查。</span><span class="en">Contributor reading order should preserve the GUI-editing rule before testing evidence.</span></p>
    </section>

    <section data-cn-complete="round-489-usdviewq-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><code>Modifying GUI</code> 段的中文要点是：<code>.ui</code> 文件不是普通 XML 文档，手工编辑会带来跨平台工具容忍度问题，因此优先用 <code>qdesigner5</code>。这条规则的目的不是限制贡献者，而是保护后续开发者的编辑体验和 code review 的 diff 质量。</span><span class="en">Please do not hand edit .ui files.</span></p>
      <p><span class="zh">同段的兜底要求是：即使你很排斥 GUI tools，手工编辑后也必须用 <code>qdesigner5</code> 加载、确认无错误、保存回写、再提交。这里的关键不是“打开看一眼”，而是让 Qt 工具重新写出它能接受的 <code>.ui</code> 文件，避免 unrelated diffs 传递给下一个开发者。</span><span class="en">If you are allergic to gui tools, then at least load the file in qdesigner5.</span></p>
      <p><span class="zh"><code>Testing</code> 段的中文要点是：usdview 改动要先跑 <code>pxr/usdImaging/bin/testusdview</code>，并尽量新增自动化 tests。无法被 <code>testusdview</code> 覆盖的 feature 不应沉默，而应写入 <code>blackBoxTesting.md</code>，让维护者明确知道哪些行为需要黑盒或手工验证。</span><span class="en">Run tests in pxr/usdImaging/bin/testusdview and add new ones whenever possible.</span></p>
    </section>

    <section data-cn-complete="round-489-usdviewq-boundaries">
      <h2>边界、误读点与相邻阅读 / Boundaries and Neighbor Paths</h2>
      <ul>
        <li><span class="zh">不要把本页当成 usdview 使用教程。它面向贡献者，关注 <code>.ui</code>、<code>qdesigner5</code>、测试目录和黑盒测试文档。</span><span class="en">This page is a development practice note.</span></li>
        <li><span class="zh">不要把 <code>testusdview</code> 视为唯一测试入口。官方明确给出 <code>blackBoxTesting.md</code> 作为无法由 <code>testusdview</code> 覆盖的 feature 的记录路径。</span><span class="en">Some features cannot be tested by testusdview.</span></li>
        <li><span class="zh">不要提交手工编辑后的 <code>.ui</code> 原始结果。至少要让 <code>qdesigner5</code> 加载并保存回写，否则下一个开发者可能在无关格式差异中审查你的真实 UI 改动。</span><span class="en">The next developer using qdesigner5 should not contend with unrelated diffs.</span></li>
        <li><span class="zh">相邻阅读应优先连接到 <a href="md_pxr_usd_imaging_usdviewq_black_box_testing.html">Usdview Black Box Testing</a>、<a href="usd_geom_page_front.html">UsdGeom</a>、<a href="class_usd_imaging_delegate.html">UsdImagingDelegate</a> 或本地 API 入口，而不是跳到无关 Doxygen 索引页。</span><span class="en">Neighbor reading should stay near usdview testing and imaging context.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-489-usdviewq-click-path">
      <h2>本地点击路径 / Local Click Path</h2>
      <p><span class="zh">推荐点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> Development Practices For usdview -> <a href="md_pxr_usd_imaging_usdviewq_black_box_testing.html">Usdview Black Box Testing</a>。这符合官方正文的阅读顺序：先了解修改 GUI 的提交规则，再进入测试策略和无法自动化覆盖的黑盒验证说明。</span><span class="en">Local click path follows usdview development practice into black-box testing.</span></p>
      <p><span class="zh">如果读者从 usdview 代码修改场景进入，下一步应先检查 <code>.ui</code> 文件是否经过 <code>qdesigner5</code>，再运行 <code>testusdview</code>，最后决定是否补充 <code>blackBoxTesting.md</code>。本页保留显式 <a href="${OFFICIAL_URL}">Open official page</a> 外跳，但主路径使用本地 reading-flow。</span><span class="en">Open official page remains the explicit external jump.</span></p>
    </section>

    <section data-cn-complete="round-489-usdviewq-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">已保留官方关键标识：<code>Development Practices For usdview</code>、<code>Modifying GUI</code>、<code>.ui files</code>、<code>qt's xml format is fragile</code>、<code>bad constructs</code>、<code>qdesigner5</code>、<code>Testing</code>、<code>pxr/usdImaging/bin/testusdview</code>、<code>blackBoxTesting.md</code>。</span><span class="en">Official identifiers and section terms are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读继续保留总入口、API 入口、breadcrumb、side navigation、related links、prev/next 和 click-path 审计所需结构。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-489-usdviewq-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：为什么不手工编辑 <code>.ui</code> 文件；为什么推荐 <code>qdesigner5</code>；手工编辑后的最低提交前检查是什么；什么时候运行 <code>pxr/usdImaging/bin/testusdview</code>；为什么新增功能应尽量新增 tests；哪些 feature 需要补充 <code>blackBoxTesting.md</code>；以及这页为什么是 usdview contributor workflow，而不是 usdview 用户手册。</span><span class="en">A review-ready reader can explain GUI editing and testing practice for usdview.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="md_pxr_usd_imaging_usdviewq_black_box_testing.html">相邻：Usdview Black Box Testing</a></p>
      <p><a href="usd_geom_page_front.html">相邻：UsdGeom</a></p>
      <p><a href="class_usd_imaging_delegate.html">相邻：UsdImagingDelegate</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity(html) {
  const sourceText = stripHtml(read(SOURCE));
  const outputText = stripHtml(html);
  const sourceLower = sourceText.toLowerCase();
  const outputLower = outputText.toLowerCase();
  const missingSource = expectedKeywords.filter((keyword) => !sourceLower.includes(keyword.toLowerCase()));
  const missingOutput = expectedKeywords.filter((keyword) => !outputLower.includes(keyword.toLowerCase()));
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source: SOURCE,
    official: OFFICIAL_URL,
    expected_keywords: expectedKeywords,
    missing_source_keywords: missingSource,
    missing_output_keywords: missingOutput,
    output_checks: {
      bilingual_complete: html.includes('data-cn-status="bilingual_complete"') && html.includes("bilingual_complete"),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐|草稿页/.test(html),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL) && html.includes("Open official page"),
      has_code_path: [
        "qdesigner5",
        ".ui files",
        "pxr/usdImaging/bin/testusdview",
        "blackBoxTesting.md",
        "md_pxr_usd_imaging_usdviewq_black_box_testing.html",
      ].every((keyword) => html.includes(keyword)),
      zh_chars: zhCharCount(outputText),
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
    report.output_checks.zh_blocks >= 24;
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
    title: "Development Practices For usdview",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the usdview development practices page by adding Chinese main-reading-path coverage for .ui editing boundaries, qdesigner5 workflow, cross-platform Qt XML fragility, testusdview requirements, blackBoxTesting.md coverage, contributor workflow, local click path, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 usdviewq source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        id: "P1-usdviewq-source-parity",
        severity: "P1",
        summary: "Development Practices For usdview 页面必须按官方 Modifying GUI 和 Testing 两个 section 覆盖 .ui/qdesigner5/testusdview/blackBoxTesting.md 边界，不能只保留摘要。",
        evidence: "本轮覆盖 .ui files、qt XML fragility、cross-platform bad constructs、qdesigner5 修改和保存回写流程、pxr/usdImaging/bin/testusdview、blackBoxTesting.md 和无法由 testusdview 覆盖的 feature 记录路径。",
        required_action: "后续 usdview/testing/imaging 相关页面继续按 source snapshot 做中文主阅读路径、调试路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 API entry -> Development Practices For usdview -> Usdview Black Box Testing 的点击路径，并重跑 reading-flow 与 click-path 审计。",
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
    next_action: "下一轮建议 PromotionRound：基于 live reports 选择一个仍为 bilingual_draft 且有 source snapshot 的 API 高价值页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_489_usdviewq_readme.mjs";
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
  console.log("Usage: node scripts/promote_round_489_usdviewq_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
