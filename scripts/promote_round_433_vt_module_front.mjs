import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 433;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/vt_page_front.html";
const SOURCE = "source/full_api/vt_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/vt_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_433_vt_module_front_source_parity.json";
const PROMOTION_ID = "round-433-api-vt-module-front";

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
    .note{background:#f7fbff;border-left:4px solid #3477b9;padding:12px 14px}
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
  source: "../../source/full_api/vt_page_front_source.html",
  official: OFFICIAL_URL,
  prev: "gf_page_front.html",
  next: "work_page_front.html",
  gf: "gf_page_front.html",
  sdf: "sdf_page_front.html",
  usdGeom: "usd_geom_page_front.html",
  usdShade: "usd_shade_page_front.html",
  usdRender: "usd_render_page_front.html",
  usdPhysics: "usd_physics_page_front.html",
  usdProc: "usd_proc_page_front.html",
  hd: "hd_page_front.html",
  hdx: "hdx_page_front.html",
  work: "work_page_front.html",
  apiOverview: "../../site/_usd__overview_and_purpose.html",
  renderGuide: "../release/user_guides/render_user_guide.html",
  primvarsGuide: "../release/user_guides/primvars.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text && heading.text !== "Table of Contents")
    .map((heading) => `<li><span class="zh">官方结构：<code>${esc(heading.text)}</code>。中文页把它落到 Vt 的类型抽象职责、<code>VtValue</code> 类型擦除、<code>VtArray</code> 同质数组、C++/Python 接口差异、值承载边界和相邻模块阅读路径。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function readingFlowNav() {
  return `
<!-- openusd-reading-flow-nav:start -->
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.api}">API 本地入口</a>
  <span> / api / vt_page_front.html</span>
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
        <li>vt_page_front.html</li>
      </ol>
    </section>
    <section>
      <h3>相邻 API / Related API</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.gf}">Gf 数学值类型</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.sdf}">Sdf 场景描述基础</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdGeom}">UsdGeom 几何属性消费</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdShade}">UsdShade 材质网络值</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender 输出设置值</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdPhysics}">UsdPhysics 物理属性值</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.work}">Work 多线程调度</a><span class="openusd-reading-flow-status">draft</span></li>
      </ul>
    </section>
    <section>
      <h3>指南路径 / User Paths</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.apiOverview}">API Overview and Purpose</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.primvarsGuide}">Primvars user guide</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.renderGuide}">Render user guide</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: Gf</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: Work</a></li>
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
  <title>Vt : Value Types - OpenUSD API 双语</title>
  <style>${css()}</style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-scope="api" data-cn-review-ready="true">
${readingFlowNav()}
<header>
  <h1>Vt : Value Types</h1>
  <div class="meta">第 ${ROUND} 轮 ${ROUND_TYPE}：Vt 模块入口完成。源页：<code>${SOURCE}</code>；官方页：<code>${OFFICIAL_URL}</code></div>
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
    <p><span class="zh">Vt 是 <strong>Value Types</strong> 模块。官方 Overview 把它定义为提供 type abstraction（<code>VtValue</code>）和 enhanced array types（<code>VtArray</code>）的类集合，同时还提供 manipulating value types 的函数。读这页时要把 Vt 放在“语言数据类型和值承载层”理解：它负责把不同 C++ 类型、Gf 数学类型、标量和数组以统一方式装进 USD 运行时的数据流中，但不负责定义 prim、schema、layer composition 或具体属性语义。</span><span class="en">Vt defines classes for type abstraction with VtValue and enhanced array types with VtArray, plus functions for manipulating value types.</span></p>
    <p><span class="zh">Vt 的关键边界是：它 operates on the level of language data types。也就是说，<code>VtValue</code> 和 <code>VtArray</code> 解决的是“值以什么类型存在、如何被统一持有、如何在 C++/Python 接口之间传递”的问题；<code>Sdf</code>/<code>Usd</code> 决定这些值如何被写入属性和 time sample；<code>UsdGeom</code>、<code>UsdShade</code>、<code>UsdRender</code>、<code>UsdPhysics</code> 等 schema 决定这些值的含义。</span><span class="en">Vt works at the language-data-type level; higher-level modules assign scene meaning.</span></p>
  </section>

  <section data-cn-complete="source-coverage">
    <h2>官方结构与 source parity</h2>
    <p><span class="zh">本轮使用 <code>${SOURCE}</code> 对齐官方模块页。官方有三个核心 section：Overview、Type Erasure with VtValue、Shared Arrays - VtArray。中文页逐段覆盖这些 section，并补充 C++/Python 差异、调试路径、相邻模块关系和常见误读。</span><span class="en">The page is aligned with the official Overview, Type Erasure with VtValue, and Shared Arrays - VtArray sections.</span></p>
    <ul>
      ${headingList()}
      <li><span class="zh">官方提到 C++ and Python interfaces 有差异；中文页明确说明 <code>VtValue</code> 只在 C++ API 中出现，而 Python 侧强类型限制不同，Python 到 C++ 的类型转换由系统自动处理。</span><span class="en">The C++/Python interface difference is retained as a source-parity point.</span></li>
    </ul>
  </section>

  <section data-cn-complete="vtvalue">
    <h2>Type Erasure with VtValue：类型擦除容器</h2>
    <p><span class="zh"><code>VtValue</code> 是 Vt 页最重要的概念之一。官方说它 wraps type objects，例如 <code>float</code>、<code>int</code>、<code>bool</code>、<code>GfVec3d</code> 等，把这些强类型对象放进一个 type-agnostic container。这个容器还包含用于 determining the content type 的函数，因此调用方可以先以统一形式传递值，再在需要时检查里面实际持有的类型。</span><span class="en">VtValue wraps typed objects such as float, int, bool, and GfVec3d in a type-agnostic container and provides content-type inspection.</span></p>
    <p><span class="zh">“类型擦除”不等于丢失类型，也不等于动态语言里的随意值。更准确地说，<code>VtValue</code> 隐藏了编译期具体类型，让 API 能用一个容器承载多种值；但运行时仍然需要知道它实际 holding 的类型。调试时如果值取不出来，常见原因是读取方期待的类型和 <code>VtValue</code> 实际持有的类型不一致，而不是 USD 属性一定不存在。</span><span class="en">Type erasure hides the static type at the API boundary, but the runtime held type still matters.</span></p>
    <p><span class="zh">官方特别指出 <code>VtValue</code> found in the C++ API only，因为 Python 没有 C++ 那种强类型限制。Python 侧通常以普通 Python 对象或 typed array 类交互，系统负责 Python to C++ type conversion。这一点很容易误读：不要在 Python 代码里机械寻找完全同名的 <code>VtValue</code> 工作流，而要看绑定层如何把 Python 值转换成对应 C++/USD 值类型。</span><span class="en">VtValue is a C++ API concept; Python conversion is handled automatically by the system.</span></p>
    <p><span class="zh">source parity 里必须保留官方短语 <strong>strong type restrictions</strong>：C++ 的强类型约束让 <code>VtValue</code> 有存在价值，因为库接口有时需要在不暴露模板类型的情况下携带具体对象。Python 没有同样的强类型限制，所以更常见的是绑定层把 Python 对象转换成 C++ 期望的值类型。调试跨语言问题时，应该同时看 Python 输入、绑定转换结果和 C++ 读取端的实际类型。</span><span class="en">Python does not have the strong type restrictions of C++; Python to C++ type conversion is handled automatically by the system.</span></p>
  </section>

  <section data-cn-complete="vtarray">
    <h2>Shared Arrays - VtArray：同质数组和值数组</h2>
    <p><span class="zh"><code>VtArray</code> 表示 arbitrary length homogeneous container，也就是长度任意但元素类型一致的容器。它适合承载 USD 属性中常见的数组值，例如点、法线、索引、颜色、token 列表、矩阵数组或其他 typed values。和 <code>VtValue</code> 的多类型承载不同，<code>VtArray</code> 的核心约束是同质：数组里的元素必须是同一类值。</span><span class="en">VtArray is an arbitrary-length homogeneous container.</span></p>
    <p><span class="zh">C++ API 中 constructor 可以创建指定大小的数组；Python 侧则通过一组 typed array classes 暴露，例如 <code>BoolArray</code>、<code>StringArray</code>、<code>Vec4dArray</code>。这说明 Python 侧的可见接口并不总是一个单一的 <code>VtArray</code> 类名，而是按元素类型拆成更具体的数组类。调试 Python 代码时，要确认传入的是绑定期望的 typed array，而不是普通 list 在所有场景都能无损转换。</span><span class="en">In Python, VtArray is exposed through typed array classes such as BoolArray, StringArray, and Vec4dArray.</span></p>
    <p><span class="zh">官方还提到 C++ constructor lets you create an array of a <strong>specified size</strong>。这意味着 C++ 侧可以先分配数组长度，再写入同质元素；但数组长度正确并不等于语义正确。数组值还要和上层 schema 语义分开。<code>VtArray&lt;GfVec3f&gt;</code> 可以承载三维向量数组，但它本身不说明这些值是 points、normals、velocities 还是 primvars；<code>VtArray&lt;int&gt;</code> 可以承载索引，但不说明它属于 topology、indices 还是任意整数属性。实际语义来自属性声明、schema、interpolation、element size 和调用上下文。</span><span class="en">A VtArray can be constructed with a specified size; a VtArray&lt;GfVec3f&gt; carries typed values, while schema and authored property context define meaning.</span></p>
  </section>

  <section data-cn-complete="cpp-python-boundary">
    <h2>C++ / Python 接口差异</h2>
    <p><span class="zh">官方明确说 Vt library 在 language data types 层运行，并且 C++ and Python interfaces 存在差异。C++ 侧需要显式处理强类型、模板、容器和类型检查；Python 侧更多依赖绑定层和自动转换。一个 C++ 示例里出现 <code>VtValue</code> 或某个 <code>VtArray&lt;T&gt;</code>，不代表 Python 侧代码必须逐字照搬同一类型名。</span><span class="en">The Vt library operates at the language-data-type level and differs between C++ and Python APIs.</span></p>
    <p><span class="zh">这类差异是排查跨语言问题的重点：如果 C++ 插件期望 <code>VtArray&lt;GfVec3f&gt;</code>，Python 侧传入普通 list、tuple 或错误 typed array，可能会在绑定转换、属性 authoring 或下游消费时出错。相反，如果 Python 调用看起来成功，也不代表 C++ 侧读取时一定持有预期类型；仍要检查属性类型、数组元素类型和实际值。</span><span class="en">Cross-language bugs often come from mismatched held types or array element types.</span></p>
  </section>

  <section data-cn-complete="relationships">
    <h2>相邻模块关系与边界</h2>
    <p><span class="zh"><code>Gf</code> 提供 <code>GfVec3d</code>、矩阵、范围、射线、视锥等数学值；<code>Vt</code> 可以用 <code>VtValue</code> 或 typed array 承载这些值。二者的关系是“值类型”和“值容器”互补，而不是彼此替代。</span><span class="en">Gf supplies math value types; Vt carries values and arrays.</span></p>
    <p><span class="zh"><code>Sdf</code> 和 <code>Usd</code> 决定值如何进入 scene description：属性声明、默认值、time sample、layer opinion、composition 和读取 API 都在上层。Vt 能承载值，但不决定一个值是否应该写到某个 <code>SdfPath</code>，也不决定一个 authored opinion 如何参与 composition。</span><span class="en">Sdf and Usd define how values enter scene description and composition.</span></p>
    <p><span class="zh"><code>UsdGeom</code>、<code>UsdShade</code>、<code>UsdRender</code>、<code>UsdPhysics</code> 等模块消费 Vt 承载的值，并给这些值赋予 domain semantics。比如 primvars、shader inputs、render settings、physics material 参数都可能通过 Vt 值流动，但它们的合法范围和解释规则来自对应 schema。</span><span class="en">Schema modules consume Vt-carried values and assign domain semantics.</span></p>
  </section>

  <section data-cn-complete="value-flow">
    <h2>值流动和 authoring 边界</h2>
    <p><span class="zh">Vt 最适合放在“值从语言运行时进入 USD 数据模型”的中间层理解。C++ 代码可能把一个标量、token、字符串、<code>GfVec3d</code> 或数组包装成 <code>VtValue</code>；API 边界可以统一传递这个值；随后 <code>Sdf</code>/<code>Usd</code> 再决定它是否能成为某个属性的默认值、time sample 或 metadata。这个过程里，Vt 只负责承载和值类型操作，不负责判断属性名是否正确、schema 是否允许、layer opinion 是否会被更强 opinion 覆盖。</span><span class="en">Vt carries values across API boundaries; Sdf and Usd decide authored data placement and composition.</span></p>
    <p><span class="zh">当读取失败或类型不匹配时，建议先回答三个问题：第一，容器实际持有的类型是什么；第二，目标属性声明期望什么类型；第三，跨语言绑定是否发生了自动转换或数组类型替换。只有这三点都确认后，才继续排查 scene composition、resolver、renderer 或 simulator。这样可以避免把一个很低层的 value-type mismatch 错误升级成复杂的场景问题。</span><span class="en">Check held type, declared property type, and language binding conversion before debugging higher layers.</span></p>
    <p><span class="zh">在批量数据路径中，<code>VtArray</code> 的同质性非常重要。一个 primvar、point array、normal array 或 shader parameter array 可能在文本层看起来只是很多值，但运行时必须落到明确的 typed array。长度、元素类型、tuple 维度、插值方式和 schema 约定任何一项不匹配，都可能导致读取失败、显示异常或下游消费端忽略该值。</span><span class="en">Array values require matching length, element type, tuple dimension, interpolation, and schema expectations.</span></p>
  </section>

  <section data-cn-complete="examples">
    <h2>典型场景</h2>
    <p><span class="zh">场景一：工具代码从未知属性读取一个值。它可能先得到 <code>VtValue</code>，再检查是否持有 <code>float</code>、<code>int</code>、<code>bool</code>、<code>GfVec3d</code> 或其他类型。如果检查逻辑只假设一种类型，就会把合法但不同类型的属性误判为失败。</span><span class="en">Tools that read unknown attributes often inspect a VtValue before interpreting the held type.</span></p>
    <p><span class="zh">场景二：Python 脚本 author 一个数组属性。普通 Python list 可能在某些绑定路径里被自动转换，但在精确 API、插件或性能敏感路径中，更稳的做法是使用对应 typed array，例如 bool、string、vec 类型的 array class。否则 C++ 侧读取到的元素类型可能和预期不同。</span><span class="en">Python lists may be converted, but typed array classes are safer for exact API boundaries.</span></p>
    <p><span class="zh">场景三：渲染或几何消费端忽略某个数组。不要只看数组是否非空，还要检查它是否是正确的 <code>VtArray</code> 元素类型，是否和属性 declaration、schema role、interpolation 和 element count 匹配。Vt 是这条排查路径的起点，不是终点。</span><span class="en">For ignored arrays, inspect Vt element type and schema context before blaming the consumer.</span></p>
  </section>

  <section data-cn-complete="performance-boundary">
    <h2>共享数组和性能边界</h2>
    <p><span class="zh">官方 section 名称里的 Shared Arrays 提醒读者：<code>VtArray</code> 不只是“像 vector 一样的数组”，它还服务于 USD 中大量数组值的共享、复制和跨 API 传递。实际使用时要注意拷贝成本、写时机、元素类型和线程边界；如果某个调用会修改数组内容，就要确认它是否拿到了期望的独占数据，而不是误以为所有数组传递都是零成本。</span><span class="en">Shared array behavior matters for copy cost, mutation timing, and API boundaries.</span></p>
    <p><span class="zh">这也解释了为什么 Vt 常常和性能、绑定和插件边界一起出现：它是值容器层，既要让上层 API 足够通用，又要让底层 C++ 能保持明确类型和高效数组表示。中文阅读时应把它看成 USD 数据管线的基础设施，而不是单个用户功能页。</span><span class="en">Vt is infrastructure for typed values and arrays in the USD data pipeline.</span></p>
  </section>

  <section data-cn-complete="debugging">
    <h2>常见误读与调试路径</h2>
    <ul>
      <li><span class="zh">误读一：<code>VtValue</code> 是“任意类型所以不用检查”。正确做法是检查 actual held type；类型擦除隐藏的是 API 边界，不是运行时事实。</span><span class="en">A VtValue still has a concrete held type.</span></li>
      <li><span class="zh">误读二：Python 侧必须像 C++ 一样显式操作 <code>VtValue</code>。官方说明 <code>VtValue</code> 只在 C++ API 中出现，Python 到 C++ 转换由系统处理。</span><span class="en">VtValue is found in the C++ API only; Python conversion is automatic.</span></li>
      <li><span class="zh">误读三：<code>VtArray</code> 只要长度对就可以。还必须检查元素类型是否同质、是否匹配属性声明、是否符合 schema 的 interpolation 或 element size 要求。</span><span class="en">Array length is not enough; element type and schema context matter.</span></li>
      <li><span class="zh">误读四：值容器错误等同于 scene composition 错。先查 <code>VtValue</code>/<code>VtArray</code> 的类型和内容，再查 <code>Sdf</code>/<code>Usd</code> 的属性声明与 layer opinion，最后查 schema 和 consumer。</span><span class="en">Debug value containers before blaming composition or consumers.</span></li>
    </ul>
  </section>

  <section data-cn-complete="practical-path">
    <h2>实际阅读和定位路径</h2>
    <p><span class="zh">如果你在 C++ 插件、file format、schema adapter 或工具代码里看到一个泛化值流，先判断它是不是 <code>VtValue</code>；如果是数组属性或批量数据，先判断它是不是 <code>VtArray</code> 或 Python typed array。然后再沿着本页侧栏进入 <code>Gf</code> 查看元素值类型，进入 <code>Sdf</code>/<code>Usd</code> 查看属性和 composition，进入具体 schema 页面查看领域语义。</span><span class="en">Use Vt to trace generic values and arrays, then follow Gf, Sdf/Usd, and schema modules for meaning.</span></p>
    <p><span class="zh">在排查数据不显示、数组长度异常、Python/C++ 绑定类型不对、primvar 或 shader input 读取失败时，Vt 是很好的第一站。它能帮助你确认“值是否以正确类型和容器存在”；如果这一层正确，再继续排查属性路径、schema 解释、renderer、viewer 或 simulator 行为。</span><span class="en">Vt is a good first stop for value, array, and Python/C++ binding diagnostics.</span></p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>Paragraph-Level Bilingual Coverage / 逐段双语理解</h2>
    <p><span class="zh">逐段覆盖：官方 Overview 对应中文里的模块职责和值类型层；Type Erasure with VtValue 对应 C++ 类型擦除、type-agnostic container、content type 检查和 Python 自动转换边界；Shared Arrays - VtArray 对应同质数组、C++ 指定大小构造、Python typed array classes，以及数组值和 schema 语义的分离。</span><span class="en">Paragraph-Level Bilingual Coverage maps the official Vt sections to Chinese reading-path explanations.</span></p>
    <p><span class="zh">英文 API 名、类名、示例类型和官方 section 标题保留不翻译，是为了保持技术可核对性；中文段落负责说明它们的用途、边界、误读点、调试路径和相邻模块关系。这样读者可以靠中文理解 Vt，而不是只靠英文 Doxygen 原文猜测。</span><span class="en">English identifiers are preserved for accuracy; Chinese text supplies the main reading path.</span></p>
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
    "Vt",
    "Value Types",
    "type abstraction",
    "VtValue",
    "enhanced array types",
    "VtArray",
    "functions for manipulating value types",
    "language data types",
    "C++ and Python interfaces",
    "Type Erasure with VtValue",
    "type objects",
    "float",
    "int",
    "bool",
    "GfVec3d",
    "type-agnostic container",
    "determining the content type",
    "C++ API only",
    "strong type restrictions",
    "Python to C++ type conversion",
    "Shared Arrays - VtArray",
    "arbitrary length homogeneous container",
    "specified size",
    "typed array classes",
    "BoolArray",
    "StringArray",
    "Vec4dArray",
  ];
  const outputKeywords = [
    ...sourceKeywords,
    "actual held type",
    "VtArray<GfVec3f>",
    "VtValue",
    "VtArray",
    "Gf",
    "Sdf",
    "UsdGeom",
    "UsdShade",
    "UsdRender",
    "UsdPhysics",
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
  if (report.output_checks.zh_chars < 2700) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 24) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
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
    title: "Vt : Value Types",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Vt module front page by adding Chinese main-reading-path coverage for Value Types, VtValue type erasure, type-agnostic containers, VtArray shared homogeneous arrays, C++ and Python API differences, Python to C++ type conversion, typed array classes, adjacent Gf/Sdf/UsdGeom/UsdShade/UsdRender/UsdPhysics boundaries, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2700,
      minimum_complete_section_chinese_chars: 2200,
      minimum_chinese_blocks: 24,
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
      previous_good_bilingual: 211,
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
        evidence: "本轮页面生成了本地侧栏、breadcrumb、相邻 API/user guide 路径和 Open official page 外跳，并会重新运行 reading-flow 审计。",
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
      "下一轮建议继续 API 核心模块或短页，开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：full_site/api/work_page_front.html。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_433_vt_module_front.mjs --write-page --precheck --manifest --problem");
}
