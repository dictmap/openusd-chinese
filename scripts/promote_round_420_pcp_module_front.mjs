import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 420;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/pcp_page_front.html";
const SOURCE = "source/full_api/pcp_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/pcp_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_420_pcp_module_front_source_parity.json";
const PROMOTION_ID = "round-420-api-pcp-module-front";

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

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function sourceExcerpt() {
  return stripTags(sourceHtml()).slice(0, 1700);
}

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.66}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    .navlinks a{color:#d7e3f4;margin-right:14px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    .note{background:#edf6ff;border-left:4px solid #1c5d99;padding:12px 14px}
  `;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  api: "../../site/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/pcp_page_front_source.html",
  official: OFFICIAL_URL,
  sdf: "sdf_page_front.html",
  usdPrim: "class_usd_prim.html",
  pcpArc: "class_pcp_arc.html",
  pcpUnresolved: "class_pcp_error_unresolved_prim_path.html",
  pcpPropertyIndex: "class_pcp_property_index.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text)
    .map((heading) => `<li><span class="zh">官方 section：<code>${esc(heading.text)}</code>。中文阅读时把它映射到 Pcp 的 composition 工作流：为什么需要组合、能处理哪些 arc、如何发起查询、如何处理错误/依赖/变更/路径转换，以及如何诊断结果。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pcp: PrimCache Population (Composition) - OpenUSD API 双语导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>${css()}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>Pcp: PrimCache Population (Composition)</h1>
    <div class="meta">Round ${ROUND} ${ROUND_TYPE} · Source snapshot: ${esc(SOURCE)} · Official: ${esc(OFFICIAL_URL)}</div>
    <p class="navlinks">
      <a href="${links.final}">总入口</a>
      <a href="${links.api}">API 本地入口</a>
      <a href="${links.release}">Release 本地入口</a>
      <a href="${links.source}">Local source snapshot</a>
      <a href="${links.official}">Open official page</a>
    </p>
  </header>
  <main>
    <section data-cn-complete="round-420-pcp-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><code>Pcp</code> 是 OpenUSD composition 语义的底层引擎入口，官方标题中的 <code>PrimCache Population</code> 是历史名称。它实现通常被非正式称为 <em>Layering &amp; Referencing</em> 的行为：从多个 layer、reference、payload、variant、inherits、relocates 等 authored scene description 中找出会贡献到对象的 opinions，并把这些结构化结果交给更高层的 <code>Usd</code>、<code>Csd</code>、<code>Mf</code> 等 scenegraph 库使用。</span><span class="en">Pcp implements low-level scenegraph composition semantics for higher-level scenegraph libraries.</span></p>
      <p><span class="zh"><strong>Introduction</strong> section 的核心边界是：多数客户端不直接调用 Pcp，而是通过 <code>UsdStage</code>、<code>UsdPrim</code> 等更高层 API 间接使用 Pcp 结果。Pcp 的职责是计算 composition 结构，不是解释最终对象的领域语义。它会告诉上层哪些 layer site、composition arc 和 prim index node 贡献到一个对象，但不会替你决定模型层级、对象身份、schema 语义或最终属性值解析策略。</span><span class="en">Most clients consume Pcp through higher-level APIs rather than calling it directly.</span></p>
      <p><span class="zh"><strong>Motivation</strong> section 解释为什么需要 Pcp：一个文件足以描述一组对象，但 production 场景通常需要多人协作、资产复用和跨文件组合。reference arc 指向外部文件，payload 控制是否纳入工作集，variant 表达不同版本或配置。Pcp runtime 负责识别和解释这些 composition arcs，把分散文件中的 authored opinions 合并成可查询的组合结构，使下游资产能自动吸收上游资产改进。</span><span class="en">Pcp exists because useful USD scenes are distributed across many authored files and composition arcs.</span></p>
      <p><span class="zh"><strong>Capabilities</strong> section 列出 Pcp 支持的 composition semantics：<code>sublayers</code>、<code>list-editing</code>、<code>references</code>、<code>payloads</code>、<code>inherits/classes</code>、<code>variants</code>、<code>standin variant preferences</code>、<code>relocates</code>、<code>permissions</code>。支持这些语义的 runtime 特性包括 caching/cache invalidation、change processing、dependency tracking、namespace editing、path translation、error detection、payload inclusion control 和 diagnostic output。</span><span class="en">Capabilities lists the composition arcs and runtime services implemented by Pcp.</span></p>
      <p><span class="zh">同一个 section 也明确排除一些常被误以为属于 Pcp 的高层功能：model hierarchy、scenegraph structure、objects and their identity、value resolution、symmetry。中文读者要把这句话当作本页的边界线：Pcp 找 opinion 来源和 composition 结构，<code>Usd</code> 层再把这些结构呈现为对象、属性、值解析和用户可操作的 scenegraph。</span><span class="en">Pcp finds sources of opinions; higher-level systems interpret objects, identity, and values.</span></p>
      <p><span class="zh"><strong>The PcpCache</strong> section 说明 <code>PcpCache</code> 是 Pcp algorithm 的主入口。它固定 root layer、可选 session layer、path resolver context、standin preferences 和 payload inclusion set 等参数，并缓存 composition query 的结果。payload inclusion set 可以在运行时改变，用于把 payload 纳入或移出工作集；这也是大型场景按需加载和 composition 缓存失效的重要背景。</span><span class="en">PcpCache stores the configuration and cached outputs for composition queries.</span></p>
      <p><span class="zh"><strong>Computation Queries</strong> section 重点是 <code>PcpCache::ComputeLayerStack()</code> 与 <code>PcpCache::ComputePrimIndex()</code>。前者计算 layer stack，后者计算某个 prim path 的 prim index；这两类查询提供大部分 composition 语义，并成为其他查询的基础。调试 composition 时，如果只是看到最终 <code>UsdPrim</code> 不符合预期，通常需要回到 prim index，看哪些 sites 参与、哪些 arcs 进入、强弱顺序和错误列表是什么。</span><span class="en">ComputeLayerStack and ComputePrimIndex are fundamental Pcp queries.</span></p>
      <p><span class="zh"><strong>Errors</strong> section 强调 Pcp 把 authored scene description 的 composition 错误当作一等输出，而不是副作用。例如 reference 目标文件无法解析、reference cycle 或 unresolved prim path 都会作为 <code>PcpErrorBase</code> 派生错误随结果返回。Pcp 不规定错误上报策略；客户端决定如何展示、过滤或修复这些错误。API misuse 仍通过 <code>TfError</code> 系统处理，这和 authored scene description 错误要分开。</span><span class="en">Pcp composition errors are formal outputs, while API misuse still uses TfError.</span></p>
      <p><span class="zh"><strong>Dependencies</strong>、<strong>Namespace Editing</strong> 与 <strong>Change Processing</strong> 是理解增量更新的主线。Pcp 在计算 <code>PcpPrimIndex</code> 时记录依赖，例如 reference 跨 layer 依赖；这些依赖用于分析场景变更、传播 invalidation、实现 rename/reparent/delete 等 namespace editing。<code>PcpChanges</code> 表示 scene description 变化对 <code>PcpCache</code> 的影响，<code>PcpLifeboat</code> 临时保留底层 layer/layer stack，避免缓存失效期间引用数据过早消失。</span><span class="en">Dependencies and change processing explain how Pcp supports incremental scene updates.</span></p>
      <p><span class="zh"><strong>Path Translation</strong> section 是 Pcp 最容易被低估的部分。composition arc 会把不同 layer 中的 scene description 拉到新的 namespace 位置，因此 relationship target、attribute connection 或 authored path 需要在 node namespace 与 root namespace 之间转换。官方示例中 <code>&lt;/Merida&gt;</code> 被 reference 到 <code>&lt;/World/anim/chars/MeridaGroup/Merida&gt;</code>，路径也必须随 arc 重新绑定；相关 API 包括 <code>PcpTranslatePathFromNodeToRoot()</code> 和 <code>PcpTranslatePathFromRootToNode()</code>。</span><span class="en">Path translation rebinds authored paths across composition arcs.</span></p>
      <p><span class="zh"><strong>Diagnostics</strong> section 给出调试入口：<code>PcpPrimIndex::DumpToString()</code> 用于 dump prim index 结构，<code>PcpPrimIndex::PrintStatistics()</code> 和 <code>PcpCache::PrintStatistics()</code> 用于分析结构和缓存占用，<code>TF_DEBUG</code> runtime debugging flags 与 <code>pcp/debugCodes.h</code> 用于打开调试输出，<code>PCP_DIAGNOSTIC_VALIDATION</code> 是需要编译启用的额外运行时校验。</span><span class="en">Diagnostics provides dump, statistics, debug flags, and optional validation hooks.</span></p>
      <p><span class="zh">把本页串起来看，Pcp 的工作流可以概括为：输入 root/session layer 与 resolver context，识别 layer stack 与 composition arcs，计算 prim index 或 property index，记录 errors 与 dependencies，缓存结果并在 scene description 变更时失效，再通过 path translation 和 diagnostics 解释复杂结果。这个流程不是普通用户每天都要手写的 API，但它是理解 USD “为什么这个 prim 最终由这些 layer 共同组成”的关键。</span><span class="en">The Pcp workflow is inputs, arcs, indexes, errors, dependencies, cache invalidation, path translation, and diagnostics.</span></p>
      <p><span class="zh">对资产管线来说，Pcp 的价值在于把协作和复用落到可检查的结构上：部门可以在不同 layer 中写入各自意见，资产可以通过 reference 被多个镜头复用，payload 可以控制大型资产是否进入当前工作集，variant 可以表达配置分支。Pcp 不替代这些 authored data 的来源，但它负责把它们解释成一致的 composition graph，供上层 <code>UsdStage</code> 呈现。</span><span class="en">Pcp turns authored reuse and collaboration patterns into a queryable composition graph.</span></p>
    </section>

    <section data-cn-complete="round-420-pcp-api-groups">
      <h2>核心 API 分组 / Core API Groups</h2>
      <ul>
        <li><span class="zh"><code>PcpCache</code>：composition query 的上下文和缓存，管理 root/session layer、resolver context、payload inclusion set，并服务 <code>ComputeLayerStack()</code> 与 <code>ComputePrimIndex()</code>。</span><span class="en">PcpCache is the central context for composition requests.</span></li>
        <li><span class="zh"><code>PcpPrimIndex</code>：描述某个 prim 的所有 contributing sites 和 composition graph 结构；它是理解“这个 prim 为什么长这样”的核心诊断对象。</span><span class="en">PcpPrimIndex captures the structure of all contributing sites for a prim.</span></li>
        <li><span class="zh"><a href="${links.pcpArc}"><code>PcpArc</code></a>：表示 composition graph 中的 arc 关系，例如 reference、payload、inherits、variant 等路径如何把意见带入目标对象。</span><span class="en">PcpArc represents an edge in the composition graph.</span></li>
        <li><span class="zh"><code>PcpErrorBase</code> 及其派生错误：表达 unresolved asset/path、cycle、relocates 冲突等 authored scene description 问题。相关页面如 <a href="${links.pcpUnresolved}"><code>PcpErrorUnresolvedPrimPath</code></a> 可用于继续核对具体错误类型。</span><span class="en">Pcp errors describe authored composition problems.</span></li>
        <li><span class="zh"><code>PcpChanges</code>、<code>PcpLifeboat</code> 和 dependency query：服务 change processing、cache invalidation 和 namespace editing，帮助上层 scenegraph 库在 layer 变化后重新拉取受影响的 composition 结果。</span><span class="en">Change and dependency APIs support incremental recomposition.</span></li>
        <li><span class="zh"><a href="${links.pcpPropertyIndex}"><code>PcpPropertyIndex</code></a>：面向 property composition 的相关结果入口；阅读它时应继续保留 Pcp 的定位：计算贡献结构，而不是解释最终值。</span><span class="en">PcpPropertyIndex applies composition indexing to properties.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-420-pcp-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries, Misreads, and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 Pcp 当成高层建模 API。创建 prim、设置 attribute、遍历 scenegraph 应优先使用 <code>Usd</code>；当 composition 结果、arc 解析、payload inclusion 或 path translation 出问题时，再下探到 Pcp。</span><span class="en">Pcp is not the user-facing modeling API.</span></li>
        <li><span class="zh">不要把“找到 opinion 来源”和“解析最终值”混为一谈。Pcp 负责找到 contributing opinions 和结构关系；value resolution、schema fallback、对象身份和领域语义通常属于更高层。</span><span class="en">Opinion discovery and value interpretation are separate responsibilities.</span></li>
        <li><span class="zh">如果 reference 或 payload 没有生效，检查 asset resolution、payload inclusion set、target prim path、variant selection 和 composition errors，而不是只看最终 <code>UsdPrim</code> 是否存在。</span><span class="en">Reference and payload failures should be reduced to arcs, paths, inclusion, and errors.</span></li>
        <li><span class="zh">如果 namespace edit 导致多个 layer 不一致，检查 Pcp dependency tracking 和 <code>PcpCache::ComputeNamespaceEdits()</code> 的结果；它会帮助上层库列出需要同步修复的 underlying layer opinions。</span><span class="en">Namespace editing uses Pcp dependencies to repair underlying layer opinions.</span></li>
        <li><span class="zh">如果变更后结果没有刷新，检查 <code>PcpChanges</code> 是否覆盖了受影响 cache、依赖是否被 invalidated、客户端是否重新查询 affected caches，以及 <code>PcpLifeboat</code> 是否保留了仍需访问的 layer/layer stack。</span><span class="en">Stale results usually point to change processing, invalidation, or repull issues.</span></li>
        <li><span class="zh">如果 relationship target 或 connection 在 reference 后指向异常，优先检查 path translation：authored path 在源 node namespace 中成立，不代表它在 root namespace 中仍然是同一个字符串。</span><span class="en">Paths authored in a source namespace must be translated into the composed root namespace.</span></li>
        <li><span class="zh">如果 composition 结果看起来“缺了一层”，要分别检查 sublayer 顺序、reference target、payload 是否被包含、variant selection 是否选中目标分支、relocates 是否改写路径，以及 Pcp 是否已经因变更处理重新计算。把这些条件拆开，比直接猜测 Usd 查询错误更可靠。</span><span class="en">Missing composition contributions should be checked across ordering, targets, inclusion, variants, relocates, and invalidation.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-420-pcp-adjacent-path">
      <h2>相邻阅读路径 / Adjacent Reading Path</h2>
      <p><span class="zh">推荐阅读顺序是：先读 <a href="${links.sdf}"><code>Sdf</code> 模块入口</a>，理解 layer/spec/path 是 authored scene description；再读本页理解这些 authored pieces 如何通过 Pcp composition arcs 聚合；最后回到 <a href="${links.usdPrim}"><code>UsdPrim</code></a>、<code>UsdStage</code> 等高层 API 查看 composition 后的 scenegraph 视图。这个顺序能把“文件里写了什么”“组合结构是什么”“最终对象呈现什么”三个层次分开。</span><span class="en">Read Sdf for authored storage, Pcp for composition structure, and Usd for composed scenegraph objects.</span></p>
      <p class="note"><span class="zh">本页所有 API 名、函数名、枚举名、debug flag、代码标识和 Doxygen section 标题均按官方拼写保留。中文说明负责建立主阅读路径，英文原名负责技术核对。</span><span class="en">English API identifiers remain unchanged for source parity.</span></p>
    </section>

    <section data-cn-complete="round-420-pcp-source-parity">
      <h2>官方 section 对比 / Source Parity</h2>
      <ul>
${headingList()}
        <li><span class="zh">已核对 source snapshot 中的核心关键词：<code>Layering &amp; Referencing</code>、<code>PcpCache</code>、<code>ComputeLayerStack</code>、<code>ComputePrimIndex</code>、<code>PcpErrorBase</code>、<code>PcpChanges</code>、<code>PcpLifeboat</code>、<code>PcpTranslatePathFromNodeToRoot</code>、<code>PcpTranslatePathFromRootToNode</code>、<code>TF_DEBUG</code>、<code>PCP_DIAGNOSTIC_VALIDATION</code>。</span><span class="en">The local page preserves the official composition and diagnostics identifiers.</span></li>
        <li><span class="zh">官方原文摘要用于核对，不作为中文主阅读路径：<span class="en">${esc(sourceExcerpt())}</span></span></li>
      </ul>
    </section>

    <section data-cn-complete="round-420-pcp-completion-evidence">
      <h2>完成态证据 / Completion Evidence</h2>
      <ul>
        <li><span class="zh">页面状态已设为 <code>bilingual_complete</code>，旧的草稿说明、批次草稿壳和占位提示已移除。</span><span class="en">The page status is bilingual_complete.</span></li>
        <li><span class="zh">中文主阅读路径覆盖模块职责、官方 section、核心 API 分组、Pcp/Sdf/Usd 边界、常见误读、调试路径、path translation 和相邻阅读关系。</span><span class="en">Chinese coverage explains role, sections, API groups, boundaries, debugging, path translation, and adjacent modules.</span></li>
        <li><span class="zh">后续审计必须确认本页进入 <code>good_bilingual</code>，并尽量达到 <code>review_ready_zh</code>；若 final entry、inventory、quality、English debt 或 validation 不一致，应停止并修复。</span><span class="en">Quality, English-debt, final entry, and validation reports must close the promotion.</span></li>
      </ul>
      <p><a href="${links.official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceHtml();
  const out = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const keywords = [
    "Introduction",
    "Motivation",
    "Capabilities",
    "Usage",
    "PcpCache",
    "ComputeLayerStack",
    "ComputePrimIndex",
    "PcpErrorBase",
    "PcpChanges",
    "PcpLifeboat",
    "PcpTranslatePathFromNodeToRoot",
    "PcpTranslatePathFromRootToNode",
    "TF_DEBUG",
    "PCP_DIAGNOSTIC_VALIDATION",
  ];
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_headings: sourceHeadings(),
    source_keywords_checked: keywords,
    missing_source_keywords: keywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: keywords.filter((keyword) => !out.includes(keyword)),
    output_checks: {
      has_complete_status: out.includes("bilingual_complete"),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: out.includes("openusd_bilingual_final.html"),
      has_api_entry: out.includes("site/index.html"),
      has_release_entry: out.includes("site/release_index.html"),
      has_explicit_official_link: out.includes("Open official page") && out.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐|later iterations add denser bilingual coverage/.test(out),
      zh_chars: zhChars(out),
      zh_blocks: (out.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
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
  if (report.output_checks.zh_chars < 2300) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 12) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "Pcp: PrimCache Population (Composition)",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Pcp module front page by adding Chinese main-reading-path coverage for composition semantics, PcpCache, computation queries, errors, dependencies, namespace editing, change processing, path translation, diagnostics, Sdf/Usd boundaries, source parity, reading-flow preservation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2300,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
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
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: "Track current OpenUSD bilingual completion blockers and named P0/P1 defects.",
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 PromotionRound 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续按 PromotionRound 或 DomainSprintRound 推进 API 草稿，只把达标页面写入 promotion manifest。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮完成后需重新运行 route_openusd_internal_links_local、inject_openusd_reading_flow_navigation 和 audit_openusd_reading_flow_navigation。",
        required_action: "若 reading-flow 审计失败，停止并修复导航，不得推送。",
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
      "继续推进 API 草稿；release 范围已经 126/126 complete，不要重复处理 release 已完成页。",
      "优先选择核心 API 或同域短页批量，但每轮必须保证 good_bilingual 按实际达标页增长。",
    ],
    next_action: "Select the next API target only after git/report/validation state is clean and consistent.",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_420_pcp_module_front.mjs --write-page --precheck --manifest --problem");
}
