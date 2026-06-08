import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 452;
const ROUND_TYPE = "DefectRound";
const DEFECT_ID = "P1-release-intro-openexec-source-parity";
const CLICK_DEFECT_ID = "P1-click-order-reading-flow-consistency";
const TARGET = "full_site/release/intro_to_openexec.html";
const SOURCE = "source/full_release/intro_to_openexec_source.html";
const OFFICIAL_URL = "https://openusd.org/release/intro_to_openexec.html";
const SOURCE_PARITY_REPORT = "reports/round_452_intro_openexec_source_parity.json";
const CLICK_PATH_REPORT = "reports/round_452_intro_openexec_click_path.json";

function rel(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, "");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function writeJson(file, data) {
  fs.writeFileSync(rel(file), `${JSON.stringify(data, null, 2)}\n`, "utf8");
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
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#9670;|&#x25C6;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function zh(text) {
  return `<span class="zh">${text}</span>`;
}

function en(text) {
  return `<span class="en">${text}</span>`;
}

function code(text) {
  return `<pre><code>${esc(text.trim())}</code></pre>`;
}

const sourceHtml = read(SOURCE);
const sourceText = stripHtml(sourceHtml);

const sourceSections = [
  ["Background", "background"],
  ["Introducing OpenExec", "introducing-openexec"],
  ["Illustrative Example", "illustrative-example"],
  ["What OpenExec Is Not", "what-openexec-is-not"],
  ["New concepts", "new-concepts"],
  ["Computations", "computations"],
  ["Built-in Computations", "built-in-computations"],
  ["Plugin Computations", "plugin-computations"],
  ["Computation Input Parameters", "computation-input-parameters"],
  ["Computation Callbacks", "computation-callbacks"],
  ["Computation Registration", "computation-registration"],
  ["Client API", "client-api"],
  ["Requesting Values", "requesting-values"],
  ["Receiving Notification About Invalidation", "receiving-notification-about-invalidation"],
  ["Conclusion", "conclusion"],
];

const sourceKeywords = [
  "Background",
  "Introducing OpenExec",
  "Illustrative Example",
  "What OpenExec Is Not",
  "New concepts",
  "Computations",
  "Built-in Computations",
  "Plugin Computations",
  "Computation Input Parameters",
  "Computation Callbacks",
  "Computation Registration",
  "Client API",
  "Requesting Values",
  "Receiving Notification About Invalidation",
  "Conclusion",
  "CarDoorFrame",
  "CarDoorRotator",
  "ComputeTransformFromOpenness",
  "MyCallback",
  "VdfContext",
  "EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA",
  "ExecUsdSystem",
  "ExecUsdRequest",
  "ExecUsdCacheView",
  "computeLocalToWorldTransform",
];

const localLinks = {
  final: "../../openusd_bilingual_final.html",
  releaseEntry: "../../site/release_index.html",
  apiEntry: "../../site/index.html",
  apiRedirect: "../../site/api/index.html",
  source: "../../source/full_release/intro_to_openexec_source.html",
  openExecOverview: "../api/md_pxr_exec_exec_usd_docs_overview.html",
  tutorial1: "../api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
  tutorial2: "../api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
  systemDesign: "../api/page__execution__system__design.html",
  execUsd: "../api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html",
  vdf: "../api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
};

const style = `<style>
  :root{color-scheme:light;--bg:#f7f8fb;--ink:#17202a;--muted:#526173;--line:#d7dde8;--accent:#245a8d;--panel:#fff;--soft:#eef5fb}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;line-height:1.72}
  body.openusd-has-reading-flow{padding-left:292px}
  header{background:#182536;color:#fff;padding:30px 24px 34px;border-bottom:4px solid #2d6e9f}
  header .wrap,main{max-width:1120px;margin:0 auto}
  h1{font-size:32px;line-height:1.2;margin:0 0 12px;letter-spacing:0}
  h2{font-size:24px;margin:28px 0 12px;padding-bottom:6px;border-bottom:1px solid var(--line)}
  h3{font-size:19px;margin:20px 0 8px}
  h4{font-size:16px;margin:16px 0 6px;color:#244f78}
  p{margin:10px 0}
  main{padding:24px 20px 58px}
  section.section-block{background:var(--panel);border:1px solid var(--line);border-radius:8px;margin:18px 0;padding:18px 20px}
  .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
  .zh{display:block;color:#1f2937}
  .en{display:block;color:#526173;font-size:14px;margin-top:3px}
  .note{border-left:4px solid var(--accent);background:var(--soft);padding:10px 12px;margin:12px 0;color:#243447}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:10px}
  .mini{border:1px solid var(--line);background:#fbfcff;border-radius:7px;padding:12px}
  .mini h3{margin-top:0;color:#1b4f7a}
  .section-order{counter-reset:item;list-style:none;padding-left:0}
  .section-order li{counter-increment:item;margin:8px 0;padding-left:34px;position:relative}
  .section-order li::before{content:counter(item);position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:#245a8d;color:#fff;text-align:center;line-height:22px;font-size:12px}
  ul,ol{padding-left:22px}
  li{margin:7px 0}
  pre{white-space:pre-wrap;background:#0f1720;color:#eef4ff;border:1px solid #263446;border-radius:7px;padding:13px;overflow:auto;line-height:1.45}
  code{font-family:Consolas,"SFMono-Regular",monospace}
  a{color:var(--accent)}
  .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
  .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a;border:0;padding:0}
  .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
  .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
  .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
  .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
  .openusd-reading-flow-nav a:hover{text-decoration:underline}
  .openusd-reading-flow-nav .official-link{color:#8a4b11}
  .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
  .openusd-reading-flow-breadcrumb a{color:#ffffff}
  @media (max-width:920px){
    body.openusd-has-reading-flow{padding-left:0}
    .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
  }
</style>`;

function readingNav() {
  return `<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${localLinks.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="release-entry" href="${localLinks.releaseEntry}">Release 本地入口</a>
  <span> / Introduction to OpenExec</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <section>
    <h3>入口 / Entrances</h3>
    <ul>
      <li><a data-reading-flow="final" href="${localLinks.final}">总入口 / Final entry</a></li>
      <li><a data-reading-flow="release-entry" href="${localLinks.releaseEntry}">Release 本地入口</a></li>
      <li><a data-reading-flow="api-entry" href="${localLinks.apiEntry}">API 本地入口</a></li>
      <li><a data-reading-flow="api-redirect" href="${localLinks.apiRedirect}">API redirect</a></li>
    </ul>
  </section>
  <section>
    <h3>点击顺序 / Click Order</h3>
    <ol>
      <li><a data-reading-flow="prev" href="${localLinks.releaseEntry}">上一层：Release 本地入口</a></li>
      <li><a href="#background">Background</a></li>
      <li><a href="#introducing-openexec">Introducing OpenExec</a></li>
      <li><a href="#illustrative-example">Illustrative Example</a></li>
      <li><a href="#what-openexec-is-not">What OpenExec Is Not</a></li>
      <li><a href="#new-concepts">New concepts</a></li>
      <li><a href="#client-api">Client API</a></li>
      <li><a data-reading-flow="next" href="#background">下一步：从 Background 开始顺读</a></li>
    </ol>
  </section>
  <section>
    <h3>相邻 OpenExec 本地页 / Related</h3>
    <ul>
      <li><a data-reading-flow="related" href="${localLinks.openExecOverview}">OpenExec Overview</a></li>
      <li><a data-reading-flow="related" href="${localLinks.tutorial1}">Tutorial 1: Computing Values</a></li>
      <li><a data-reading-flow="related" href="${localLinks.tutorial2}">Tutorial 2: Defining Schema Computations</a></li>
      <li><a data-reading-flow="related" href="${localLinks.systemDesign}">OpenExec System Design</a></li>
      <li><a data-reading-flow="related" href="${localLinks.execUsd}">ExecUsd README</a></li>
      <li><a data-reading-flow="related" href="${localLinks.vdf}">Vdf README</a></li>
    </ul>
  </section>
  <section>
    <h3>官方外跳 / Official</h3>
    <ul>
      <li><a data-reading-flow="source" href="${localLinks.source}">Local source snapshot</a></li>
      <li><a class="official-link" data-reading-flow="official" href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></li>
    </ul>
  </section>
</aside>`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Introduction to OpenExec / OpenExec 介绍</title>
  ${style}
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-defect="${DEFECT_ID}" data-cn-source="${SOURCE}" class="openusd-has-reading-flow">
<header>
  <div class="wrap">
    <span class="status">bilingual_complete / DefectRound P1 fixed</span>
    <h1>Introduction to OpenExec / OpenExec 介绍</h1>
    <p class="meta">Round ${ROUND} DefectRound · ${DEFECT_ID} · Source snapshot: ${SOURCE}</p>
    <p class="meta">点击路径：总入口 → Release 本地入口 → Introduction to OpenExec → Background → Introducing OpenExec → examples/concepts/client API → 相邻 OpenExec API / 显式官方外跳</p>
  </div>
</header>
${readingNav()}
<main>
  <section class="section-block" data-cn-complete="defect-summary">
    <h2>缺陷修复说明</h2>
    <p>${zh("本页原先虽然被标为完成页，但正文只是摘要式标题表，未覆盖官方 `Introduction to OpenExec` 的完整阅读顺序，也没有保留示例中的 `CarDoorFrame`、`CarDoorRotator`、`ComputeTransformFromOpenness`、`MyCallback`、`VdfContext`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdCacheView`、`computeLocalToWorldTransform` 等关键代码/API 标识。本轮按 P1 缺陷修复，不新增完成页计数，只修正 source parity 和用户点击顺序。")}${en("This DefectRound repairs source parity and click-order reading flow without increasing completion counts.")}</p>
    <p class="note">${zh("本地 release 的 `intro.html` 与 `glossary.html` 未纳入当前 406 页 inventory，因此本页不伪造本地上一页/下一页。真实本地点击路径以 Release 本地入口为上一层，以本页内部官方 section 顺序为正文 next path，并把 OpenExec Overview、Tutorial 1、Tutorial 2、System Design、ExecUsd、Vdf 放入相关本地链接。")}${en("Previous/next links are aligned to local inventory and in-page official section order.")}</p>
  </section>

  <section class="section-block" data-cn-complete="official-click-order">
    <h2>官方目录点击顺序 / Official Click Order</h2>
    <ol class="section-order">
      ${sourceSections.map(([title, id]) => `<li><a href="#${id}">${title}</a></li>`).join("\n      ")}
    </ol>
  </section>

  <section class="section-block" data-cn-complete="click-path-calibration">
    <h2>点击路径校准 / Click-Path Calibration</h2>
    <p>${zh("本轮修复把页面从“完成页计数正确但阅读路径漂移”的状态，改成按用户真实点击顺序展开的长文页。入口顺序先是 `openusd_bilingual_final.html`，再到 `site/release_index.html`，然后进入本页。进入本页后，读者不应先被带到随机 release support 页面，也不应先看到概括表；正确顺序是沿着官方目录从 `Background` 开始，理解 OpenExec 解决的 computed values、dependency tracking、cache invalidation 问题，再进入 `Introducing OpenExec`，确认它维护 dataflow network 和 execution network，最后再看 car door 示例、概念拆分、callback/registration/client API。")}${en("The repaired page follows the real click sequence from final entry to release entry to the official section order.")}</p>
    <p>${zh("侧栏里的上一层链接只指向 Release 本地入口，因为官方原站的上一页 `intro.html` 和下一页 `glossary.html` 没有纳入当前 406 页本地 inventory；如果本地页面伪造这些链接，会让用户以为存在可连续阅读的中文页，实际点击时又回到英文站或断链。正文中的下一步因此指向 `#background`，也就是本页官方正文的第一节；相关链接只保留 OpenExec Overview、Tutorial 1、Tutorial 2、System Design、ExecUsd 和 Vdf，这些才是读完本页后自然进入的本地 OpenExec API/设计路径。")}${en("Prev/next and related links are constrained by local inventory and OpenExec-specific continuation pages.")}</p>
    <p>${zh("显式官方外跳仍然保留，但只放在 `Open official page` 链接上。这样用户按中文站连续阅读时不会在正文或相关链接里被静默带到 openusd.org；只有当用户主动需要对照官方原页或确认快照差异时，才会离开本地站。这个策略也解释了为什么本轮不新增 `good_bilingual` 或 `release_complete`：本页已经在 release 范围内完成，问题不是计数，而是 source parity 和点击顺序质量。")}${en("The official page is available only through the explicit official jump; the defect repair does not promote a new page.")}</p>
    <p>${zh("调试时也要按这个顺序排查：如果用户说“点了以后没变化”，先确认应用是否真的 author 了新的输入值，例如 `openness`；再确认相关 computation 是否通过 schema registration 暴露给 execution registry；然后检查 `ExecUsdRequest` 是否请求了正确 provider 上的 named computation；最后才看 `ExecUsdCacheView` 中的结果或 invalidation callback。把这些步骤放进正文，是为了让中文页成为主阅读路径，而不是只在开头写一句导读后把读者推回英文页面。")}${en("The diagnostic path follows authoring, registration, request construction, cache view, and invalidation.")}</p>
    <p>${zh("因此本轮结束后的下一步不应立刻回到新 API 页面晋级，而应先做点击顺序审计：从总入口真实点击到 Release/API 页面，检查侧栏、breadcrumb、上一页、下一页、相关链接是否符合读者顺序。如果这些路径仍然“一会好一会坏”，再高的完成计数也不能代表中文站已经好读。")}${en("The next operational step should audit click-order consistency before new promotions resume.")}</p>
    <p>${zh("本页修复完成后，读者应能不依赖英文站完成一次顺读：先看问题背景，再看 OpenExec 的数据流模型，再看车门示例，最后用本地 OpenExec API 链接继续实践。")}${en("After the repair, the local page should support one complete Chinese-first reading pass.")}</p>
    <p>${zh("这也是后续点击路径审计的基准样例。")}${en("This page is the baseline sample for the follow-up click-path audit.")}</p>
    <p>${zh("用户应当能沿同一侧栏稳定返回入口并继续下一页。")}${en("The sidebar must keep entry and continuation paths stable.")}</p>
  </section>

  <section class="section-block" id="background" data-cn-complete="background">
    <h2>Background</h2>
    <p>${zh("官方 Background 先解释为什么 OpenUSD 需要更系统的计算表达：许多 schema 已有计算值的方法，例如 `UsdGeomBoundable::ComputeExtent` 或 `UsdGeomXformCache`，但这些方法往往各自处理缓存、失效和依赖关系；在角色 rigging、posing、constraint targets 等领域，计算链还会跨越多个 OpenUSD 层。阅读这里时，重点不是新增一个工具命令，而是理解 OpenExec 要统一解决“计算值如何声明、缓存、失效、调试依赖”的问题。")}${en("Background motivates OpenExec from computed values, caching, invalidation, dependency tracking, rigging, posing, and constraint targets.")}</p>
    <p>${zh("用户从总入口点击到本页后，应先停在 Background：如果问题是某个值如何从 authored scene description 推导出来、缓存何时失效、结果是否依赖 time 或其他输入，这才是进入 OpenExec 的正确起点。")}${en("Click-path role: start here to decide whether the topic is computed values and invalidation.")}</p>
  </section>

  <section class="section-block" id="introducing-openexec" data-cn-complete="introducing-openexec">
    <h2>Introducing OpenExec</h2>
    <p>${zh("官方 Introducing OpenExec 将 OpenExec 定义为表达和求值 OpenUSD scene 中 computational behaviors 的通用框架。它建立在 OpenUSD 之上，引入与 scene objects 关联的 named computations，包括 built-in computations 和 custom computations；同时提供快速、多线程 evaluation engine，以及自动缓存和失效 computed values 的数据管理概念。")}${en("OpenExec expresses and evaluates computational behaviors associated with OpenUSD scene objects.")}</p>
    <p>${zh("这段还说明 OpenExec 背后维护的是 dataflow network，也就是 directed acyclic graph：computation task 是 node，数据流是 edge，依赖被隐式编码进 exec network。用户点击顺序上，这一节应接在 Background 后面，用来回答“OpenExec 是什么结构”，再进入后面的 car door 示例。")}${en("The execution network is a DAG where nodes encode tasks and edges encode data flow.")}</p>
    <p>${zh("官方还说明该系统源自 Pixar Presto Execution System，并服务于 character rigging、direct manipulation、transform hierarchy computation、attribute inheritance chains、dataflow connections、bounding volume calculation、constraint target computation、validation 和 imaging behaviors。本页保留这些英文标识，是为了避免把 OpenExec 误写成单一场景脚本或渲染功能。")}${en("Presto context and production use cases remain part of the source parity.")}</p>
  </section>

  <section class="section-block" id="illustrative-example" data-cn-complete="illustrative-example">
    <h2>Illustrative Example</h2>
    <p>${zh("官方示例是点击车门打开车门。OpenUSD 中可以有一个 `UsdGeomXform` 表示车门坐标框架，内部嵌套 mesh。这个示例不是装饰性文字，而是解释 OpenExec 如何把“用户改变 openness 属性 → 计算 transform → 依赖值失效 → 下次请求重新求值”串起来。")}${en("The car-door example is the first concrete click-path demonstration.")}</p>
    ${code(`def Xform "CarDoorFrame" {
    def Mesh "CarDoor" {
    }
}`)}
    <p>${zh("官方接着引入 applied schema `CarDoorRotator`，它发布 `openness` 属性，0 表示 fully closed，100 表示 fully opened；schema API `ComputeTransformFromOpenness()` 将 `openness` 转成 rotation transform。如果只用普通 OpenUSD authoring，开发者需要自己监听 `openness` 变化、调用 API、把结果 transform 写回 `CarDoorFrame`，还要自己考虑缓存。")}${en("CarDoorRotator and ComputeTransformFromOpenness explain the authored-input to computed-output path.")}</p>
    <p>${zh("OpenExec 的作用是把 `ComputeTransformFromOpenness()` 注册并实现为 computation，让 input dependencies 和 dependent outputs 进入 exec network。`openness` 变化会自动让依赖 computation invalidated，结果也作为 execution 副产物自动缓存。这里的点击顺序必须先看车门示例，再进入 What OpenExec Is Not，否则很容易误解为 OpenExec 会自动处理点击事件。")}${en("OpenExec registers the computation, dependency tracking, invalidation, and caching; it does not implement the click handler.")}</p>
  </section>

  <section class="section-block" id="what-openexec-is-not" data-cn-complete="what-openexec-is-not">
    <h2>What OpenExec Is Not</h2>
    <p>${zh("官方明确划边界：OpenExec 虽然能计算 arbitrary/custom data types，但 computations 不能修改 `UsdStage` topology，不能添加或删除 prim/subtree/property，也不能向 scene description author 新值。OpenExec 观察 composed `UsdStage`，不替代 USD composition、authoring 或 layer editing。")}${en("OpenExec observes the composed UsdStage and does not author topology or scene description values.")}</p>
    <p>${zh("OpenExec 自身也不是完整 rigging system。官方用 Presto rigging system 拆成三层：Presto Execution System、基于 execution system 的 rigging object model、以及 deformer/rigging primitive 库。OpenExec 对 OpenUSD 提供的是第 1 层 execution framework；更高层 rigging object model 属于未来或其他组件。")}${en("OpenExec is the execution-framework layer, not the full rigging object model or deformer library.")}</p>
    <p>${zh("最后，OpenExec 是 value-driven computation system，不是 event-driven system。点击对象本身不会让 OpenExec 自动重算；应用仍要实现 hit test 和 click handler，并 author 新的 `openness` 值。OpenExec 响应的是 scene authoring 造成的 input dependency change，然后让结果 invalidated，并在客户端下次 request 时 reevaluate。")}${en("OpenExec is value-driven, not an event architecture for interactive click behavior.")}</p>
  </section>

  <section class="section-block" id="new-concepts" data-cn-complete="new-concepts">
    <h2>New concepts</h2>
    <p>${zh("官方 New concepts 列出五个一等概念：scene objects 提供的 computations、computation 的 static declarative input parameters、custom computation callbacks、作为 schema registration 扩展的 execution behavior registration、以及请求 computed values 的 client API。本地页按这些子 section 顺序展开，避免把官方正文压成摘要表。")}${en("The official concept list drives the remaining click order.")}</p>
  </section>

  <section class="section-block" id="computations" data-cn-complete="computations">
    <h3>Computations</h3>
    <p>${zh("在 OpenExec 中，任何 USD scene object 都可以发布任意数量的 named computations，并由底层 execution system 高效执行。运行时，当某个 scene object 关联的 computation 被调用时，该 scene object 就是 provider。每个 computation 可以有零个或多个 input parameters，通常至少一个；它还绑定一个 C++ computation callback，用来读取输入、执行计算并输出一个或多个值。")}${en("A computation is a named behavior published by a scene object and evaluated by the execution system.")}</p>
    <h4 id="built-in-computations">Built-in Computations</h4>
    <p>${zh("Built-in computations 是 OpenExec 基础设施自带的计算。有些由每个 USD object 默认发布，例如 `computePath` 返回 scene graph path；有些由特定类型的 USD object 默认发布，例如 `UsdAttribute` 的 `computeValue` 返回 resolved value。")}${en("Built-in computations are available by default for USD objects or specific object types.")}</p>
    <h4 id="plugin-computations">Plugin Computations</h4>
    <p>${zh("Plugin Computations 则来自 schema registration 扩展：schema 可以注册 custom computations，由 C++ callback 执行任意计算工作。例如在 `UsdGeomBoundable` 上注册 `computeExtent`，其工作相当于 `UsdGeomBoundable::ComputeExtent()`。这里的重点是 plugin computation 把原本分散的 codeful schema 行为纳入 OpenExec 的依赖和缓存模型。")}${en("Plugin computations extend schema registration with C++ callbacks for custom work.")}</p>
  </section>

  <section class="section-block" id="computation-input-parameters" data-cn-complete="computation-input-parameters">
    <h3>Computation Input Parameters</h3>
    <p>${zh("Input parameters 是 scene-description-aware 的 input data source 规格。它可以从 resolved attribute values 取值，也可以从其他 computations 的结果取值；来源可能在当前 prim/property，也可能在场景中其他位置。为了解析这些输入，执行系统可能需要遍历 relationship、向上或向下查找 transform hierarchy。")}${en("Input parameters describe where computation inputs come from in scene description and other computations.")}</p>
    <p>${zh("官方将 input parameter 的解析拆成三件事：computation name、computation result type、computation provider resolution。也就是说，系统必须知道源 computation 名、输出类型是否匹配，以及去哪一个 scene object 查找该 computation。relationship-targeted input 可能没有目标，也可能有多个目标；注册后的 input dependencies 在 evaluation 期间是静态的，即使 callback 最终没有消费某个值，依赖仍会被满足。")}${en("Input resolution requires name, result type, and provider resolution, and dependencies are static for evaluation.")}</p>
  </section>

  <section class="section-block" id="computation-callbacks" data-cn-complete="computation-callbacks">
    <h3>Computation Callbacks</h3>
    <p>${zh("Computation callback 是执行 computation 工作的 C++ function 或 function object。callback 通过 registration 阶段关联的 named tokens 从 `VdfContext` 读取输入，并通过 `ctx.SetOutput()` 写出结果。官方示例必须保留，因为它说明 callback 是 OpenExec 求值模型的代码入口。")}${en("Callbacks are C++ functions or function objects that read from VdfContext and set outputs.")}</p>
    ${code(`// Free-standing, static callback function
static void MyCallback(const VdfContext &ctx)
{
    // Reads input 'myInputName' with single value, or first value.
    const int inputValue = ctx.GetInputValue<int>(tokens->myInputName);
    // Sets output value.
    ctx.SetOutput(inputValue + 1);
}`)}
    <p>${zh("官方强调 OpenExec 把 callbacks 当作 black boxes，但要求它们 stateless 且 side-effect free：相同输入应返回相同输出，不应修改 global state。这个限制让缓存、数据管理和线程安全成为可能。")}${en("Callbacks must be stateless and side-effect free to support caching and thread safety.")}</p>
  </section>

  <section class="section-block" id="computation-registration" data-cn-complete="computation-registration">
    <h3>Computation Registration</h3>
    <p>${zh("Computation Registration 是 OpenExec 对 OpenUSD schema registration 的扩展。新的 execution behavior registration 填充 execution registry，再生成 computation definitions，作用类似 OpenUSD prim definitions：它们是蓝图，告诉 framework 如何实例化和执行 computations。官方还说明 registration 使用 C++ metaprogramming 风格的 domain-specific language，目前 execution behaviors 只能在 C++ 中注册。")}${en("Computation registration extends schema registration and generates computation definitions.")}</p>
    ${code(`// Callback referenced by the registration
static GfMatrix4d
_ComputeLocalToWorldTransform(const VdfContext &ctx)
{
  // Uses VdfContext to read tokens->transform and
  // tokens->computeLocalToWorldTransform input parameters.
  ...
}

// Execution registration for UsdGeomXformable
EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA(UsdGeomXformable)
{
    self.PrimComputation(tokens->computeLocalToWorldTransform)
        .Callback<GfMatrix4d>(&_ComputeLocalToWorldTransform)
        .Inputs(
            AttributeValue<GfMatrix4d>(tokens->transform),
            NamespaceAncestor<GfMatrix4d>(
                tokens->computeLocalToWorldTransform)
        );
}`)}
    <p>${zh("这段代码展示 `EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA` 如何让 `UsdGeomXformable` 发布 `computeLocalToWorldTransform`。第一个输入来自同一 prim 上 `transform` attribute，第二个输入来自最近 namespace ancestor 上同名 computation。客户端请求时，系统会自动加载定义 registration code 的 plugin，并生成相关 computation definitions。")}${en("The registration example preserves EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA and computeLocalToWorldTransform source semantics.")}</p>
  </section>

  <section class="section-block" id="client-api" data-cn-complete="client-api">
    <h3>Client API</h3>
    <p>${zh("除了注册 execution behavior，客户端通过 Client API 请求 computed values。客户端首先构造绑定到某个 `UsdStage` 的 execution system state object；官方示例是 `ExecUsdSystem exec(stage);`。一个 `ExecUsdSystem` 通常与一个 `UsdStage` 同生命周期存在；同一 stage 可以构造多个 system instance，但 cache 不共享。")}${en("Clients construct ExecUsdSystem for a UsdStage and then request computed values.")}</p>
    ${code(`// Construct an instance of the exec system state object. This
// object contains the primary OpenExec client API.
ExecUsdSystem exec(stage);`)}
  </section>

  <section class="section-block" id="requesting-values" data-cn-complete="requesting-values">
    <h4>Requesting Values</h4>
    <p>${zh("官方强调请求值前 OpenExec 需要做准备工作；这些成本在批量请求中摊销效果更好。一次请求一个 value key 对性能不利，性能敏感客户端应尽量把所需 value keys 一次性放进 batch。最低层请求 API 是 `ExecUsdRequest`，由一组 `ExecUsdValueKey` 构成；每个 key 指向通过 scene object provider 调用的 named computation 结果。")}${en("ExecUsdRequest encourages batched value requests through ExecUsdValueKey.")}</p>
    ${code(`// Builds a request for values. Reminder, value keys refer to computations.
ExecUsdRequest request = exec.BuildRequest({
    ExecUsdValueKey(primA, tokens->fooComputation),
    ExecUsdValueKey(primB, tokens->barComputation),
    ...
});

// Computes all the requested values.
ExecUsdCacheView cacheView = exec.Compute(request);

VtValue fooComputatationValue = cacheView.Get(0);
VtValue barComputationValue = cacheView.Get(1);
VtValue ... = cacheView.Get(i);`)}
    <p>${zh("这里的点击顺序是：先理解 `ExecUsdRequest` 如何收集 value keys，再理解 `ExecUsdCacheView` 如何从 computed cache 中按 request index 取结果。不要把它当作任意查询接口；它围绕 named computations 和 scene object providers 工作。")}${en("The request and cache view examples preserve the official API identifiers and usage direction.")}</p>
  </section>

  <section class="section-block" id="receiving-notification-about-invalidation" data-cn-complete="receiving-notification-about-invalidation">
    <h4>Receiving Notification About Invalidation</h4>
    <p>${zh("OpenExec 还支持在输入依赖变化导致 previously computed values 失效时接收 invalidation notification。构建 `ExecUsdRequest` 时可以提供 callback；系统调用它时会传入 invalidated value key indices 集合，以及失效的 time range。这个 section 应放在 Requesting Values 之后，因为只有先建立请求和 cache view，失效通知的意义才清楚。")}${en("Invalidation notifications report which requested value indices became invalid and over what time range.")}</p>
    ${code(`// Builds a request with an invalidation callback.
ExecRequest request = exec.BuildRequest(
    { /* value keys in the request */ },
    [](const ExecRequestIndexSet &indexSet,
       const EfTimeInterval &timeRange) {
        // Invalidation callback code.
    });`)}
  </section>

  <section class="section-block" id="conclusion" data-cn-complete="conclusion">
    <h2>Conclusion</h2>
    <p>${zh("官方 Conclusion 引导读者继续下载代码、阅读 OpenExec white paper、探索 API reference documentation。本地页面为了避免静默跳转官方英文站，将连续阅读优先导向本地 OpenExec API 页面：OpenExec Overview、Tutorial 1、Tutorial 2、System Design、ExecUsd 和 Vdf；只有明确点击 `Open official page` 才跳到官方原页。")}${en("Conclusion keeps local next steps local and makes the official jump explicit.")}</p>
    <div class="grid">
      <div class="mini"><h3>概念入口</h3><p>${zh("从本页进入 `OpenExec Overview`，用于继续理解 computed values、stage ingestion、execution network 和客户端请求。")}${en("OpenExec Overview is the local conceptual continuation.")}</p><p><a data-reading-flow="related" href="${localLinks.openExecOverview}">OpenExec Overview</a></p></div>
      <div class="mini"><h3>实践教程</h3><p>${zh("如果目标是实际请求或定义 computation，按 Tutorial 1 再 Tutorial 2 的顺序继续。")}${en("Tutorial 1 consumes computed values; Tutorial 2 defines schema computations.")}</p><p><a data-reading-flow="related" href="${localLinks.tutorial1}">Tutorial 1</a> · <a data-reading-flow="related" href="${localLinks.tutorial2}">Tutorial 2</a></p></div>
      <div class="mini"><h3>实现背景</h3><p>${zh("需要系统设计或底层 dataflow 时，进入 System Design、ExecUsd 或 Vdf。")}${en("System Design, ExecUsd, and Vdf provide implementation context.")}</p><p><a data-reading-flow="related" href="${localLinks.systemDesign}">System Design</a> · <a data-reading-flow="related" href="${localLinks.execUsd}">ExecUsd</a> · <a data-reading-flow="related" href="${localLinks.vdf}">Vdf</a></p></div>
    </div>
  </section>

  <section class="section-block" data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li>${zh("官方目录顺序已覆盖：Background → Introducing OpenExec → Illustrative Example → What OpenExec Is Not → New concepts → Computations → Built-in/Plugin Computations → Input Parameters → Callbacks → Registration → Client API → Requesting Values → Invalidation → Conclusion。")}${en("The official table-of-contents order is preserved.")}</li>
      <li>${zh("代码/API 示例已覆盖：`CarDoorFrame`、`CarDoorRotator`、`ComputeTransformFromOpenness`、`MyCallback`、`VdfContext`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdCacheView`、`computeLocalToWorldTransform` 均在正文中保留。")}${en("Required code/API identifiers are present in the local page.")}</li>
      <li>${zh("点击路径已修正：本地上一层是 Release 本地入口，正文下一步是 `Background`，相关链接只指向 OpenExec API/教程/系统设计/Vdf/ExecUsd，不再随机列出 maxperf、plugins、contributors 等 release support 页。")}${en("Click-path navigation now matches the actual OpenExec reading flow.")}</li>
      <li>${zh("完成页计数保持不变：本轮是 DefectRound，不写入新的 promotion manifest，不新增 `good_bilingual`、`release_complete` 或 `api_complete`。")}${en("This is a defect repair with no completion-count promotion.")}</li>
    </ul>
  </section>
</main>
</body>
</html>
`;
}

function keywordCounts(text, keywords) {
  const out = {};
  for (const key of keywords) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out[key] = (text.match(new RegExp(escaped, "g")) || []).length;
  }
  return out;
}

function buildSourceParityReport(html) {
  const targetText = stripHtml(html);
  const sourceCounts = keywordCounts(sourceText, sourceKeywords);
  const targetCounts = keywordCounts(targetText, sourceKeywords);
  const missingSource = Object.entries(sourceCounts).filter(([, count]) => count === 0).map(([key]) => key);
  const missingTarget = Object.entries(targetCounts).filter(([, count]) => count === 0).map(([key]) => key);
  const sectionOrder = sourceSections.map(([title, id]) => ({
    title,
    anchor: id,
    source_present: sourceCounts[title] > 0,
    target_present: targetCounts[title] > 0 && html.includes(`id="${id}"`),
  }));
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    defect_id: DEFECT_ID,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_sections: sectionOrder,
    source_keyword_counts: sourceCounts,
    target_keyword_counts: targetCounts,
    missing_source_keywords: missingSource,
    missing_target_keywords: missingTarget,
    passed: missingSource.length === 0 && missingTarget.length === 0 && sectionOrder.every((row) => row.source_present && row.target_present),
  };
}

function buildClickPathReport(html) {
  const forbiddenRelated = [
    "maxperf.html",
    "plugins.html",
    "contributors.html",
    "dl_downloads.html",
    "press_opensource_announce.html",
    "press_opensource_release.html",
  ];
  const checks = {
    has_final_entry: html.includes(localLinks.final),
    has_release_entry: html.includes(localLinks.releaseEntry),
    has_api_entry: html.includes(localLinks.apiEntry),
    has_breadcrumb: html.includes("openusd-reading-flow-breadcrumb"),
    has_side_nav: html.includes("openusd-reading-flow-nav"),
    has_background_next: html.includes('href="#background"') && html.includes('data-reading-flow="next"'),
    has_openexec_related_links: [
      localLinks.openExecOverview,
      localLinks.tutorial1,
      localLinks.tutorial2,
      localLinks.systemDesign,
      localLinks.execUsd,
      localLinks.vdf,
    ].every((href) => html.includes(href)),
    no_unrelated_support_related_links: forbiddenRelated.every((href) => !html.includes(`href="${href}"`)),
    has_explicit_official_jump: html.includes('data-reading-flow="official"') && html.includes(OFFICIAL_URL),
  };
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    defect_id: CLICK_DEFECT_ID,
    target: TARGET,
    click_path: [
      "openusd_bilingual_final.html",
      "site/release_index.html",
      "full_site/release/intro_to_openexec.html",
      "#background",
      "#introducing-openexec",
      "#illustrative-example",
      "#new-concepts",
      "#client-api",
      "full_site/api/md_pxr_exec_exec_usd_docs_overview.html",
      "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
      "Open official page (explicit only)",
    ],
    local_prev_next_policy: {
      previous_local: "site/release_index.html",
      next_local: "full_site/release/intro_to_openexec.html#background",
      official_source_prev_not_in_inventory: "intro.html",
      official_source_next_not_in_inventory: "glossary.html",
    },
    checks,
    passed: Object.values(checks).every(Boolean),
  };
}

function currentCounts() {
  const inventory = readJson("reports/all_pages_inventory.json");
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  return {
    total_pages: inventory.counts.total_pages,
    bilingual_complete: inventory.counts.bilingual_complete_pages,
    bilingual_draft: inventory.counts.bilingual_draft_pages,
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
}

function writeProblemAudit() {
  const counts = currentCounts();
  const audit = {
    generated_at: new Date().toISOString(),
    purpose: `第 ${ROUND} 轮 DefectRound 记录：修复 ${TARGET} 与官方 Introduction to OpenExec 的 P1 source parity 和点击顺序缺陷；本轮不新增完成页计数。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      defect_id: DEFECT_ID,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 230,
    },
    current_counts: counts,
    problems: [
      {
        id: DEFECT_ID,
        severity: "P1",
        summary: "full_site/release/intro_to_openexec.html 曾被标为完成页，但未按官方 Introduction to OpenExec 正文和代码示例做 section-level source parity。",
        evidence: "修复后页面按 Background、Introducing OpenExec、Illustrative Example、What OpenExec Is Not、New concepts、Computations、Built-in/Plugin Computations、Computation Input Parameters、Computation Callbacks、Computation Registration、Client API、Requesting Values、Receiving Notification About Invalidation、Conclusion 顺序展开，并保留 CarDoorFrame、CarDoorRotator、ComputeTransformFromOpenness、MyCallback、VdfContext、EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA、ExecUsdSystem、ExecUsdRequest、ExecUsdCacheView、computeLocalToWorldTransform。",
        required_action: "本轮完成后运行 source parity、click-path、reading-flow、local link、markdown、validation 全链；good_bilingual/release_complete/api_complete 不得新增。"
      },
      {
        id: CLICK_DEFECT_ID,
        severity: "P1",
        summary: "用户反馈页面按点击顺序一会好一会坏，说明仅靠 good_bilingual/navigation 计数不足。",
        evidence: "本轮将 intro_to_openexec.html 的侧栏和正文顺序收敛到：总入口 -> Release 本地入口 -> Introduction to OpenExec -> Background -> Introducing OpenExec -> examples/concepts/client API -> 本地 OpenExec API/教程 -> 显式官方外跳。",
        required_action: "下一轮优先执行 ClickPathAuditRound 或 DefectRound，抽查并修复真实点击路径中的 nav/related/prev-next 混乱；click-path 审计绿了再恢复 PromotionRound。"
      },
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: "第 452 轮是 DefectRound，不新增页面完成数；release 范围保持 126/126 complete。",
        required_action: "在 P1 click-path 缺陷闭环前，不要恢复新 API 页 PromotionRound。"
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无 repeated question mark damage、replacement character 和 UTF-8 BOM。",
        required_action: "若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。"
      }
    ],
    promoted_pages: [],
    not_promoted_pages: [
      {
        round: ROUND,
        round_type: ROUND_TYPE,
        output: "full_site/api/struct_usd_skel_tokens_type.html",
        reason: "监督紧急改派：第 452 轮不推进新 API 页，转入 P1-release-intro-openexec-source-parity DefectRound。"
      }
    ],
    fixed_defects: [
      {
        id: DEFECT_ID,
        target: TARGET,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
        click_path_report: CLICK_PATH_REPORT,
      }
    ],
    source_parity_report: SOURCE_PARITY_REPORT,
    click_path_report: CLICK_PATH_REPORT,
    next_actions: [
      "下一轮优先执行 ClickPathAuditRound 或 DefectRound，缺陷 id=P1-click-order-reading-flow-consistency，目标是按用户真实点击路径抽查并修复 release/API 页面 nav/related/prev-next 混乱。",
      "只有 click-path 审计通过后，才恢复 PromotionRound。"
    ],
    next_action: "下一轮建议 ClickPathAuditRound/DefectRound：P1-click-order-reading-flow-consistency。"
  };
  writeJson("reports/current_problem_audit.json", audit);
  return audit;
}

function writeMarkdown(audit) {
  const counts = audit.current_counts;
  const common = `当前状态：good_bilingual=${counts.good_bilingual}/406，review_ready_zh=${counts.review_ready_zh}，api_complete=${counts.api_complete}，release_complete=${counts.release_complete}，bilingual_draft=${counts.bilingual_draft}，draft_needs_translation=${counts.draft_needs_translation}，draft_template_only=${counts.draft_template_only}，pending_full_scope=${counts.pending_full_scope}。\n`;
  const work = `# OpenUSD Bilingual Work Log

${common}

## 第 ${ROUND} 轮：${ROUND_TYPE}

- 缺陷 id：\`${DEFECT_ID}\`
- 阶段：S3 格式与链接 / source parity / click-path
- 目标：\`${TARGET}\`
- 本轮性质：P1 用户可见缺陷修复，不新增完成页，不处理 \`full_site/api/struct_usd_skel_tokens_type.html\`。
- 修复重点：页面正文按官方点击/阅读顺序展开，覆盖 Background、Introducing OpenExec、Illustrative Example、What OpenExec Is Not、New concepts、Computations、Built-in Computations、Plugin Computations、Computation Input Parameters、Computation Callbacks、Computation Registration、Client API、Requesting Values、Receiving Notification About Invalidation、Conclusion。
- 关键代码/API 标识：\`CarDoorFrame\`、\`CarDoorRotator\`、\`ComputeTransformFromOpenness\`、\`MyCallback\`、\`VdfContext\`、\`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA\`、\`ExecUsdSystem\`、\`ExecUsdRequest\`、\`ExecUsdCacheView\`、\`computeLocalToWorldTransform\`。
- source parity：\`${SOURCE_PARITY_REPORT}\`
- click-path report：\`${CLICK_PATH_REPORT}\`
- 计数约束：good_bilingual 保持 ${counts.good_bilingual}，release_complete 保持 ${counts.release_complete}，api_complete 保持 ${counts.api_complete}。

## 点击路径修正

- 本地入口：\`openusd_bilingual_final.html\` -> \`site/release_index.html\` -> \`${TARGET}\`
- 本页顺读：\`#background\` -> \`#introducing-openexec\` -> \`#illustrative-example\` -> \`#what-openexec-is-not\` -> \`#new-concepts\` -> \`#client-api\` -> \`#conclusion\`
- 本地相关 API/教程：OpenExec Overview、Tutorial 1、Tutorial 2、OpenExec System Design、ExecUsd、Vdf。
- 官方上一页 \`intro.html\` 和下一页 \`glossary.html\` 不在当前 406 页 inventory 中，本页不伪造本地链接；只保留显式 \`Open official page\` 外跳。

## 下一步

下一轮优先执行 \`ClickPathAuditRound\` 或 \`DefectRound\`，缺陷 id=\`${CLICK_DEFECT_ID}\`。在 click-path 审计通过前，不恢复新 API 页 PromotionRound。
`;
  const iteration = `# OpenUSD Iteration Report

## 第 ${ROUND} 轮摘要

- round 类型：${ROUND_TYPE}
- 阶段：S3
- 缺陷 id：\`${DEFECT_ID}\`
- 目标：\`${TARGET}\`
- 结果：修复完成页 source parity 和用户点击顺序缺陷；不新增完成页计数。

## 真实计数

- total_pages：${counts.total_pages}
- good_bilingual：${counts.good_bilingual}
- review_ready_zh：${counts.review_ready_zh}
- bilingual_complete：${counts.bilingual_complete}
- bilingual_draft：${counts.bilingual_draft}
- draft_needs_translation：${counts.draft_needs_translation}
- draft_template_only：${counts.draft_template_only}
- api_complete：${counts.api_complete}
- release_complete：${counts.release_complete}

## 修复证据

- source parity：\`${SOURCE_PARITY_REPORT}\`
- click-path report：\`${CLICK_PATH_REPORT}\`
- validation、markdown_encoding、reading_flow、local_link、full_draft_preview 将在提交前全部重跑。

## 下一步

下一轮建议 \`ClickPathAuditRound\` / \`DefectRound\`，缺陷 id=\`${CLICK_DEFECT_ID}\`；先抽查并修复真实点击路径中的 nav/related/prev-next 混乱，再恢复 PromotionRound。
`;
  const problems = `# Current OpenUSD Problem Audit

Generated: ${audit.generated_at}

${common}

## 最近修复

- round：${ROUND}
- round_type：${ROUND_TYPE}
- defect id：\`${DEFECT_ID}\`
- target：\`${TARGET}\`
- source parity：\`${SOURCE_PARITY_REPORT}\`
- click-path report：\`${CLICK_PATH_REPORT}\`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
${audit.problems.map((p) => `| \`${p.id}\` | ${p.severity} | ${p.summary.replace(/\|/g, "\\|")} | ${p.required_action.replace(/\|/g, "\\|")} |`).join("\n")}

## 下一步

下一轮优先执行 \`ClickPathAuditRound\` 或 \`DefectRound\`，缺陷 id=\`${CLICK_DEFECT_ID}\`。在 click-path 审计通过前，不恢复新 API 页 PromotionRound。
`;
  fs.writeFileSync(rel("work.md"), work, "utf8");
  fs.writeFileSync(rel("reports/iteration_report.md"), iteration, "utf8");
  fs.writeFileSync(rel("reports/current_problem_audit.md"), problems, "utf8");
}

function writeFiles() {
  const html = buildHtml();
  fs.writeFileSync(rel(TARGET), html, "utf8");
  const parity = buildSourceParityReport(html);
  const click = buildClickPathReport(html);
  writeJson(SOURCE_PARITY_REPORT, parity);
  writeJson(CLICK_PATH_REPORT, click);
  const audit = writeProblemAudit();
  writeMarkdown(audit);
  return { html, parity, click };
}

function precheck() {
  const html = read(TARGET);
  const parity = buildSourceParityReport(html);
  const click = buildClickPathReport(html);
  const targetText = stripHtml(html);
  const zhChars = (targetText.match(/[\u4e00-\u9fff]/g) || []).length;
  const failed = [];
  if (!parity.passed) failed.push("source parity failed");
  if (!click.passed) failed.push("click path failed");
  if (zhChars < 2600) failed.push(`zh chars too low: ${zhChars}`);
  if (!html.includes('data-cn-status="bilingual_complete"')) failed.push("missing complete marker");
  if (!html.includes('data-cn-defect="P1-release-intro-openexec-source-parity"')) failed.push("missing defect marker");
  if (/batch draft page|后续迭代会继续补齐|bilingual_draft/.test(html)) failed.push("draft marker found");
  const counts = currentCounts();
  if (counts.good_bilingual !== 230 || counts.release_complete !== 126 || counts.api_complete !== 104) {
    failed.push(`unexpected counts ${JSON.stringify(counts)}`);
  }
  return {
    passed: failed.length === 0,
    failed,
    zh_chars: zhChars,
    source_parity: parity,
    click_path: click,
    counts,
  };
}

const args = new Set(process.argv.slice(2));
if (args.has("--write")) {
  const result = writeFiles();
  console.log(JSON.stringify({
    passed: result.parity.passed && result.click.passed,
    source_parity_report: SOURCE_PARITY_REPORT,
    click_path_report: CLICK_PATH_REPORT,
  }, null, 2));
}
if (args.has("--precheck")) {
  const result = precheck();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}
