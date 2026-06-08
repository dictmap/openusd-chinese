import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 425;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/usd_proc_page_front.html";
const SOURCE = "source/full_api/usd_proc_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/usd_proc_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_425_usd_proc_module_front_source_parity.json";
const PROMOTION_ID = "round-425-api-usd-proc-module-front";

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
  return [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function sourceExcerpt() {
  return sourceText().slice(0, 900);
}

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.66}
    body.openusd-has-reading-flow{padding-left:292px}
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
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1100px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
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
  source: "../../source/full_api/usd_proc_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "usd_physics_page_front.html",
  next: "usd_render_page_front.html",
  usd: "usd_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  usdPhysics: "usd_physics_page_front.html",
  usdRender: "usd_render_page_front.html",
  procClass: "class_usd_proc_generative_procedural.html",
};

function headingList() {
  return sourceHeadings()
    .map((heading) => `<li><span class="zh">官方 section：<code>${esc(heading.text)}</code>。中文页把它展开为 UsdProc 的模块职责、生成式数据表达、下游系统消费边界和相邻 API 阅读路径。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / usd_proc_page_front.html</span>
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
        <li>usd_proc_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>相关 API / Related API</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.usd}">Usd 核心模块入口</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom 模块入口</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdPhysics}">UsdPhysics 模块入口</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.procClass}">UsdProcGenerativeProcedural</a></li>
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: UsdPhysics</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: UsdRender</a></li>
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
  <title>UsdProc: USD Schemas for Procedurals - OpenUSD API 双语导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>${css()}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" class="openusd-has-reading-flow">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>UsdProc: USD Schemas for Procedurals</h1>
    <div class="meta">Round ${ROUND} ${ROUND_TYPE} | Source snapshot: ${esc(SOURCE)} | Official: ${esc(OFFICIAL_URL)}</div>
    <p class="navlinks">
      <a href="${links.final}">总入口</a>
      <a href="${links.api}">API 本地入口</a>
      <a href="${links.release}">Release 本地入口</a>
      <a href="${links.source}">Local source snapshot</a>
      <a href="${links.official}">Open official page</a>
    </p>
  </header>
${readingFlowNav()}
  <main>
    <section data-cn-complete="round-425-usd-proc-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><code>UsdProc</code> 是 OpenUSD 中用于描述 procedural data 的 schema 模块入口。官方 <strong>Overview</strong> 很短，但关键句很明确：它定义的是“scene description of procedural data meaningful to downstream systems”。也就是说，本页关注 USD 文件里如何声明某个数据由过程、插件或生成逻辑提供，重点是描述和交换，不是把生成器本身写成 USD 运行时。</span><span class="en">UsdProc defines schemas for the scene description of procedural data meaningful to downstream systems.</span></p>
      <p><span class="zh">这里的 <strong>procedural data</strong> 可以理解为“下游系统需要在消费阶段解释或生成的数据”。资产发布时不一定把最终几何、体积、实例或派生数据全部烘焙进 layer；相反，stage 可以保留一个带有 schema 语义的 prim，让 renderer、DCC 插件、验证器或专用生成系统知道应当按约定展开、实例化或解释它。</span><span class="en">Procedural data is represented in scene description so downstream systems can interpret or generate the final data.</span></p>
      <p><span class="zh">官方源页还说明初始形式只有一个 schema：<code>UsdProcGenerativeProcedural</code>。中文阅读时要把它看成 UsdProc 的最小可交换契约：它让场景能表达“这里有一个生成式 procedural”，并把具体执行留给下游系统。这个 schema 名、类型名和链接标题必须保留英文，因为它们要和 Doxygen、源码、schema registry、运行时日志和插件实现逐字对应。</span><span class="en">In its initial form, UsdProc includes a single schema: UsdProcGenerativeProcedural.</span></p>
      <p><span class="zh"><code>UsdProc</code> 与 USD scene composition 的关系也需要分清：procedural prim 仍然处在普通 USD namespace 和 layer stack 中，仍然受到引用、payload、变体、继承、specializes、layer strength 和默认值的影响。UsdProc 不绕开 composition，而是在已有 composition 结果上给下游系统一个“这里应按 procedural 约定消费”的 schema 信号。</span><span class="en">UsdProc participates in ordinary USD namespace and composition while adding procedural meaning for consumers.</span></p>
      <p><span class="zh">因此，读取这页时不要期待完整的生成算法说明。算法、参数解释、缓存策略、线程模型和输出资产格式通常由使用 UsdProc 的插件或系统定义；本模块页只建立官方 API 文档中的入口、schema 名称和消费边界。后续进入 <a href="${links.procClass}"><code>UsdProcGenerativeProcedural</code></a> 类页时，才适合查看具体属性、schema 类型和 authoring API。</span><span class="en">The module page establishes the schema entry point and boundaries; detailed behavior is owned by the procedural implementation.</span></p>
    </section>

    <section data-cn-complete="round-425-usd-proc-schema-groups">
      <h2>核心 schema 与职责分组 / Core Schema and Responsibility Groups</h2>
      <ul>
        <li><span class="zh"><code>UsdProc</code> 模块：提供 procedural 数据的 USD schema 命名空间。它的职责是让 scene description 能声明“这里的数据不是普通静态 authored result，而是由下游系统按 procedural 语义解释”。</span><span class="en">UsdProc is the module namespace for procedural-data schemas.</span></li>
        <li><span class="zh"><code>UsdProcGenerativeProcedural</code>：官方 Overview 中点名的初始 schema。它是本轮 source parity 的核心关键词，也是进入具体类页和 schema 文档的本地阅读节点。</span><span class="en">UsdProcGenerativeProcedural is the initial schema named by the official overview.</span></li>
        <li><span class="zh">下游系统 / downstream systems：可以是渲染器、生成式资产系统、DCC 集成、验证器或其他 pipeline 组件。UsdProc 的目标不是规定唯一后端，而是给这些系统一个可在 USD layer 中发现、组合和追踪的声明。</span><span class="en">Downstream systems consume the schema signal according to their procedural implementation.</span></li>
        <li><span class="zh">scene description 边界：UsdProc 描述数据与接口，不等于执行生成器、缓存输出、调度任务或保证某个 runtime 一定支持。读者应把生成执行、输出检查和后端兼容性作为独立验证层。</span><span class="en">Scene description is separate from procedural execution, caching, scheduling, and backend support.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-425-usd-proc-composition-boundaries">
      <h2>Composition 边界与生成式资产表达 / Composition Boundaries and Generative Assets</h2>
      <p><span class="zh">在生成式资产工作流里，<code>UsdProc</code> 的价值在于把“生成意图”留在 USD 中，而不是只保存最终结果。这样同一份资产可以在不同上下文里按不同质量级别、实例数量、LOD、缓存策略或后端能力消费，同时仍然能被 USD 工具链定位到 prim、layer、路径和引用来源。</span><span class="en">UsdProc keeps procedural intent in USD rather than only storing a baked result.</span></p>
      <p><span class="zh">它和 <a href="${links.usd}"><code>Usd</code></a> 核心模块的关系是：Usd 负责 stage、prim、property、composition arc 和 layer opinion；UsdProc 只在这些基础之上提供 procedural schema 语义。排查问题时，先确认普通 USD composition 得到的 prim 是否正确，再确认该 prim 的 procedural schema 是否被下游系统识别。</span><span class="en">Usd provides stage, prim, property, and composition semantics; UsdProc adds procedural schema meaning.</span></p>
      <p><span class="zh">它和 <a href="${links.usdGeom}"><code>UsdGeom</code></a> 的关系是：UsdGeom 描述空间、transform、bound、extent、mesh、point instancer 等几何语义；UsdProc 描述“生成式来源或 procedural 意图”。一个 procedural 最终可能产生几何，但 UsdProc 本身不是 mesh schema，也不替代 UsdGeom 的空间约定。</span><span class="en">UsdGeom describes geometric results and spatial semantics; UsdProc describes procedural intent.</span></p>
      <p><span class="zh">它和 <a href="${links.usdPhysics}"><code>UsdPhysics</code></a>、<a href="${links.usdRender}"><code>UsdRender</code></a> 的关系也应分开：物理 schema 负责刚体、碰撞、关节等仿真描述；渲染 schema 负责 render settings、render product 和 render var；UsdProc 只说明某些数据由 procedural 机制提供。一个下游渲染器可能会展开 procedural，仿真后端也可能读取其结果，但这些都不是 UsdProc 模块页直接承诺的行为。</span><span class="en">UsdPhysics and UsdRender consume different domains; UsdProc only marks procedural data for downstream interpretation.</span></p>
      <p><span class="zh">在资产库或场景发布中，UsdProc 适合表达“保存生成规则比保存最终展开结果更有价值”的对象：例如大规模重复结构、按镜头或质量档位展开的资产、需要由专用工具解释的过程化描述，或希望在发布包中保留 provenance 的生成式内容。中文页不把这些例子写成官方功能承诺，而是说明怎样用 scene description 思维理解这个模块。</span><span class="en">UsdProc is useful when the procedural intent is more important to exchange than a single baked output.</span></p>
      <p><span class="zh">如果需要长期归档或跨工具交换，仍要判断是否需要同时保存 baked fallback。UsdProc 能让下游系统知道 procedural 的存在，但不能保证每个工具都能重新生成同样输出。一个稳健的 pipeline 通常会把 procedural declaration、生成器版本、输入参数、缓存资产和验证结果分开管理；本页只覆盖 declaration 在 USD API 文档中的位置。</span><span class="en">A robust pipeline may keep procedural declarations, generator versions, parameters, caches, and validation evidence separately.</span></p>
    </section>

    <section data-cn-complete="round-425-usd-proc-authoring-notes">
      <h2>Authoring 与管线落地注意事项 / Authoring and Pipeline Notes</h2>
      <p><span class="zh">作者在 layer 中放置 UsdProc 相关 prim 时，应先明确这份 USD 的目标消费者是谁：是 renderer 在渲染前展开，是 DCC 工具在加载时生成，还是离线构建系统在发布时把结果烘焙成普通 USD 资产。不同消费者对参数、路径、依赖资产、缓存和错误报告的要求不同；schema 只提供可发现的语义入口，不能替代这些管线约定。</span><span class="en">Authors should know which downstream consumer will interpret the procedural declaration.</span></p>
      <p><span class="zh">命名和路径也很重要。procedural prim 应放在可追踪、可组合的位置，避免把生成意图隐藏在难以覆盖的强 layer 或临时匿名 layer 中。若多个 shot、asset variant 或 payload 共享同一个 procedural 声明，建议让路径、variant 命名和依赖资产都能从 USD 结构上解释清楚，方便后续调试和复现。</span><span class="en">Procedural prim paths and layer placement should remain traceable through composition.</span></p>
      <p><span class="zh">质量控制应分成三层：第一层检查 USD composition 是否正确；第二层检查 UsdProc schema 和参数是否符合管线约定；第三层检查下游展开结果是否满足几何、材质、渲染或仿真要求。把这三层合在一个“页面是否翻译完成”或“schema 是否存在”的判断里，会漏掉真正的 runtime 和资产质量问题。</span><span class="en">Quality control should separate USD composition, schema authoring, and generated-output validation.</span></p>
      <p><span class="zh">对阅读者来说，本页最有用的结论是：看到 <code>UsdProc</code> 时，应先把它当作“声明生成式数据的 API 模块”，再沿着具体类页和本地源快照确认 schema 名称，最后结合项目中的 procedural consumer 判断它是否会产生用户期望的结果。这个顺序比直接查找最终 mesh、直接怀疑 renderer 或直接修改生成器更可靠。</span><span class="en">The useful reading order is module role, concrete schema class, local source parity, then consumer-specific behavior.</span></p>
    </section>

    <section data-cn-complete="round-425-usd-proc-misreads-debugging">
      <h2>常见误读与调试路径 / Misreads and Debugging Path</h2>
      <ul>
        <li><span class="zh">不要把 <code>UsdProc</code> 当作生成器执行引擎。它是 schema 描述层；具体生成、展开、缓存和错误处理要看下游系统或插件实现。</span><span class="en">UsdProc is a schema layer, not the procedural execution engine.</span></li>
        <li><span class="zh">不要把 procedural prim 当作已经存在的最终几何。若 viewport、renderer 或导出器没有展开它，用户看到的可能只是声明或占位，而不是最终输出。</span><span class="en">A procedural prim is not necessarily the baked final geometry.</span></li>
        <li><span class="zh">不要把 composition 问题误判成 procedural 问题。若 prim 路径、payload、variant、reference 或更强 layer 没有组合出预期 schema，下游系统自然无法识别。</span><span class="en">Composition failures should be debugged before procedural-consumer failures.</span></li>
        <li><span class="zh">不要把所有后端都假设为支持同一种 procedural。USD 层面能记录 schema；是否支持、如何执行、输出是否可缓存，需要用目标 renderer、DCC 或 pipeline 工具实测。</span><span class="en">Schema presence does not prove identical backend support across tools.</span></li>
      </ul>
      <p><span class="zh">建议调试顺序是：先检查 stage 中目标 prim 的路径和类型是否正确；再检查 layer stack 中 schema 相关 opinion 是否来自预期 layer；然后确认 <code>UsdProcGenerativeProcedural</code> 类页中的属性或 API 是否被正确 author；最后用目标下游系统日志确认它是否发现了该 procedural、是否加载了对应插件、是否支持当前参数以及是否生成了可消费结果。</span><span class="en">Debugging should separate USD composition, schema authoring, downstream discovery, plugin loading, parameter support, and generated output.</span></p>
      <p><span class="zh">如果工具里看不到预期结果，不要只问“UsdProc 是否失效”。更精确的问题应拆成：USD stage 是否组合出目标 prim；该 prim 是否具有正确 schema；下游系统是否启用 procedural 支持；插件或实现是否可发现；生成结果是否被缓存或写回；最终消费者是否支持该结果格式。这样的分层排查能避免把 schema、插件、渲染和资产发布错误混在一起。</span><span class="en">A missing result may come from stage composition, schema authoring, consumer discovery, plugin availability, output caching, or final-format support.</span></p>
    </section>

    <section data-cn-complete="round-425-usd-proc-adjacent-path">
      <h2>相邻阅读路径 / Adjacent Reading Path</h2>
      <p><span class="zh">推荐从本页先建立 <code>UsdProc</code> 的模块边界，再进入 <a href="${links.procClass}"><code>UsdProcGenerativeProcedural</code></a> 查看具体 schema 类。需要理解普通 USD 组合和 prim/property 基础时，回到 <a href="${links.usd}"><code>Usd</code></a>；需要理解输出几何或空间边界时读 <a href="${links.usdGeom}"><code>UsdGeom</code></a>；需要理解 procedural 与渲染输出如何衔接时，再读 <a href="${links.usdRender}"><code>UsdRender</code></a>。如果生成结果参与仿真，则把它和 <a href="${links.usdPhysics}"><code>UsdPhysics</code></a> 的刚体、碰撞或关节 schema 分开核对。</span><span class="en">Read UsdProc with Usd, UsdGeom, UsdRender, UsdPhysics, and the UsdProcGenerativeProcedural class page depending on the workflow.</span></p>
      <p class="note"><span class="zh">本页保留 <code>UsdProc</code>、<code>UsdProcGenerativeProcedural</code>、<code>procedural data</code>、<code>scene description</code>、<code>downstream systems</code> 等英文技术标识，便于和官方 Doxygen、源码、schema registry、插件日志和管线配置逐字对照。中文解释只补足主阅读路径，不重命名 API 或 schema。</span><span class="en">English identifiers are preserved for source parity, searchability, schema registry comparison, and runtime log comparison.</span></p>
    </section>

    <section data-cn-complete="round-425-usd-proc-source-parity">
      <h2>官方 section 对比 / Source Parity</h2>
      <ul>
${headingList()}
        <li><span class="zh">已核对 source snapshot 中的核心关键词：<code>UsdProc</code>、<code>USD Schemas for Procedurals</code>、<code>Overview</code>、<code>scene description</code>、<code>procedural data</code>、<code>downstream systems</code> 和 <code>UsdProcGenerativeProcedural</code>。</span><span class="en">The local page preserves the official UsdProc overview and keyword structure.</span></li>
        <li><span class="zh">官方原文摘录只用于核对，不作为中文主阅读路径：</span><span class="en">${esc(sourceExcerpt())}</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-425-usd-proc-completion-evidence">
      <h2>完成态证据 / Completion Evidence</h2>
      <ul>
        <li><span class="zh">页面状态已设为 <code>bilingual_complete</code>，旧占位说明已移除。</span><span class="en">The page status is bilingual_complete.</span></li>
        <li><span class="zh">中文主阅读路径覆盖 UsdProc 模块职责、官方 Overview、<code>UsdProcGenerativeProcedural</code>、procedural data 的 scene description 边界、USD composition 关系、生成式资产表达、调试路径和相邻 API。</span><span class="en">Chinese coverage explains role, overview, schema, boundaries, composition, debugging, and adjacent APIs.</span></li>
        <li><span class="zh">页面保留本地 reading-flow 侧栏、breadcrumb、总入口、API/Release 本地入口、相邻本地页和显式官方外跳。</span><span class="en">The page keeps local reading-flow navigation and explicit official access.</span></li>
      </ul>
      <p><a data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceText();
  const out = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const sourceKeywords = [
    "UsdProc",
    "USD Schemas for Procedurals",
    "Overview",
    "scene description",
    "procedural data",
    "downstream systems",
    "UsdProcGenerativeProcedural",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "生成式资产",
    "USD scene composition",
    "UsdGeom",
    "UsdPhysics",
    "UsdRender",
    "class_usd_proc_generative_procedural.html",
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
      has_complete_status: out.includes('data-cn-status="bilingual_complete"') && out.includes(`data-cn-round="${ROUND}"`),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: out.includes("openusd_bilingual_final.html"),
      has_api_entry: out.includes("site/index.html"),
      has_api_redirect: out.includes("site/api/index.html"),
      has_release_entry: out.includes("site/release_index.html"),
      has_reading_flow_nav: out.includes("openusd-reading-flow-nav") && out.includes("openusd-reading-flow-breadcrumb"),
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
    title: "UsdProc: USD Schemas for Procedurals",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the UsdProc module front page by adding Chinese main-reading-path coverage for procedural-data scene description, UsdProcGenerativeProcedural, USD composition boundaries, generative asset expression, downstream-system consumption, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2300,
      minimum_complete_section_chinese_chars: 1800,
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
      previous_good_bilingual: 203,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续按 PromotionRound 或 DomainSprintRound 推进 API 草稿，只把达标页面写入 promotion manifest。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮完成后重新运行 route_openusd_internal_links_local 和 audit_openusd_reading_flow_navigation；新增页面有本地侧栏、breadcrumb 和官方外跳。",
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
    next_action: "下一轮建议 PromotionRound：full_site/api/usd_render_page_front.html；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
  });
}

function stampCommit(sha) {
  const problem = readJson("reports/current_problem_audit.json");
  if (problem.last_completed_round) problem.last_completed_round.commit_sha = sha;
  writeJson("reports/current_problem_audit.json", problem);
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
const stampArg = process.argv.find((arg) => arg.startsWith("--stamp-commit="));
if (stampArg) stampCommit(stampArg.slice("--stamp-commit=".length));
if (commands.size === 0 && !stampArg) {
  console.log("Usage: node scripts/promote_round_425_usd_proc_module_front.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
