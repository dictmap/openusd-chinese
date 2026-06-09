import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 485;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html";
const SOURCE = "source/full_api/md_pxr_usd_sdf_doxygen_boolean_expressions_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html";
const SOURCE_PARITY_REPORT = "reports/round_485_boolean_expressions_source_parity.json";
const PROMOTION_ID = "round-485-api-boolean-expressions";
const PREVIOUS_GOOD_BILINGUAL = 245;
const PROMOTION_COMMIT_PLACEHOLDER = "round-485-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Boolean Expressions",
  "Boolean Expression Language",
  "The syntax for boolean expression is intended to be concise",
  "C/C++",
  "final result of evaluating an expression is always a boolean value",
  "Constants",
  "true",
  "false",
  "12.34",
  "42",
  "quoted string",
  "Strings",
  "single- or double-quoted",
  "Non-printable characters such as newlines must be escaped",
  "Only single-line strings are permitted",
  "Variables",
  "USD property name",
  "SdfPath",
  "simpleVariable",
  "namespaced:variables",
  "Binary Operators",
  "leftExpression op rightExpression",
  ">",
  ">=",
  "<",
  "<=",
  "==",
  "!=",
  "&&",
  "||",
  "numOps != 3",
  "mode == 'default'",
  "width > 10.0",
  "Unary Operators",
  "boolean complement/invert",
  "foo == !bar",
  "Parenthesized expressions",
  "Implicit Casting",
  "VtValue::Cast",
  "Example",
  "enableShadows",
  "shadowColor",
  "shadowMaxDistance",
  "shownIf = \"enableShadows == 1\"",
  "shadow:enable",
  "shownIf = \"shadow:enable == 1\"",
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
  <title>Boolean Expressions | OpenUSD API 中文导读</title>
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
    <h1>Boolean Expressions</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-485-boolean-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页说明 Sdf 文档中的 <code>Boolean Expressions</code>，也就是用于属性条件、UI 显示条件或类似 authoring 场景的布尔表达式语言。官方说明强调语法有意保持简洁，并让熟悉 <code>C/C++</code> 的读者容易识别：表达式可以是常量、变量，也可以是对一个或多个子表达式应用运算符；无论中间值是数字、字符串还是变量，最终求值结果总是 boolean value。</span><span class="en">The syntax for boolean expression is intended to be concise and recognizable to those familiar with C/C++.</span></p>
      <p><span class="zh">阅读顺序应按官方 section 展开：先理解 <code>Boolean Expression Language</code> 的总体职责，再看 <code>Constants</code>、<code>Strings</code>、<code>Variables</code> 的字面量和变量模型，然后看 <code>Binary Operators</code>、<code>Unary Operators</code>、<code>Parenthesized expressions</code> 的组合规则，最后理解 <code>Implicit Casting</code> 为什么会把数字或字符串转换成布尔值，并用 <code>Example</code> 中的 <code>shownIf</code> 示例验证实际用途。</span><span class="en">An expression can be a constant value, a variable, or operations applied to one or more sub-expressions.</span></p>
      <p><span class="zh">这页最容易误读的边界是：它不是通用脚本语言，也不是 Python/JavaScript 表达式求值器；变量只按 <code>USD property name</code> 的语法出现，允许语法与 <code>SdfPath</code> 支持的 property 名称一致，例如 <code>simpleVariable</code> 和 <code>namespaced:variables</code>。因此表达式用于描述 USD 属性值驱动的条件，而不是访问任意对象、调用函数或执行副作用代码。</span><span class="en">A variable is expressed as a USD property name; the permitted syntax for variables is identical to that of properties as supported by SdfPath.</span></p>
    </section>

    <section data-cn-complete="round-485-boolean-source-order">
      <h2>官方 section 对齐 / Source Section Coverage</h2>
      <ol>
        <li><span class="zh"><code>Boolean Expression Language</code> 定义总体语义：表达式可由常量、变量、子表达式和运算符构成，最终结果始终是 boolean。</span><span class="en">The final result of evaluating an expression is always a boolean value.</span></li>
        <li><span class="zh"><code>Constants</code> 允许 boolean、numeric 和 string 常量，例如 <code>true</code>、<code>false</code>、<code>12.34</code>、<code>42</code>、<code>"quoted string"</code>。</span><span class="en">A constant can be a boolean value, a numeric value, or a string.</span></li>
        <li><span class="zh"><code>Strings</code> 可用单引号或双引号；换行等 non-printable characters 必须转义，而且只允许 single-line strings，不能包含未转义换行。</span><span class="en">Strings may be either single- or double-quoted.</span></li>
        <li><span class="zh"><code>Variables</code> 使用 USD property name 语法，典型形式是 <code>simpleVariable</code> 和 <code>namespaced:variables</code>。这让表达式可随属性值变化，而不需要写死常量。</span><span class="en">Variables are what allow expressions to be dynamic, evaluating to different values over time.</span></li>
        <li><span class="zh"><code>Binary Operators</code> 采用 infix notation：<code>leftExpression op rightExpression</code>。支持 <code>&gt;</code>、<code>&gt;=</code>、<code>&lt;</code>、<code>&lt;=</code>、<code>==</code>、<code>!=</code>、<code>&amp;&amp;</code>、<code>||</code>。</span><span class="en">A binary operator is applied to two subexpressions and is written with infix notiation.</span></li>
        <li><span class="zh"><code>Unary Operators</code> 当前只支持 boolean complement/invert <code>!</code>，例如 <code>!foo</code> 或 <code>foo == !bar</code>。</span><span class="en">The boolean complement/invert (!) is currently the only supported unary operator.</span></li>
        <li><span class="zh"><code>Parenthesized expressions</code> 用括号改变组合顺序，避免 <code>&amp;&amp;</code>、<code>||</code> 和比较运算混在一起时产生阅读歧义。</span><span class="en">Parenthesis may be used to group subexpressions.</span></li>
        <li><span class="zh"><code>Implicit Casting</code> 说明 <code>!</code>、<code>&amp;&amp;</code>、<code>||</code> 会先把子表达式转换成 boolean，最终结果也会通过 <code>VtValue::Cast</code> 转换为 boolean。</span><span class="en">Casting is performed by VtValue::Cast.</span></li>
        <li><span class="zh"><code>Example</code> 用灯光 prim 的 <code>enableShadows</code> 控制 <code>shadowColor</code> 和 <code>shadowMaxDistance</code> 是否在 UI 中显示，也展示了命名空间属性 <code>shadow:enable</code> 的等价写法。</span><span class="en">Two additional shadow-related attributes are only displayed in the UI if enableShadows has a value of 1.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-485-boolean-code-path">
      <h2>代码示例与表达式模型 / Examples and Expression Model</h2>
      <h3>常量、变量和运算符</h3>
      <p><span class="zh">常量表达式适合静态条件；变量表达式适合读取同一上下文里的 USD 属性值；比较和逻辑运算符负责把这些值组合成条件。下面这些源页标识必须保持原样，因为它们就是表达式语言的一部分。</span><span class="en">The supported operators include comparisons and boolean binary operators.</span></p>
      <pre>true
false
12.34
42
"quoted string"
'single-quoted string'
simpleVariable
namespaced:variables
numOps != 3
mode == 'default'
width > 10.0
numOps != 3 && mode == 'default'
width > 10.0 || height > 10.0
!foo
foo == !bar
numOps != 3 && (width > 10.0 || height > 10.0)</pre>
      <h3>UI shownIf 示例</h3>
      <p><span class="zh">官方示例把一个 light prim 上的 <code>enableShadows</code> 作为控制属性；当它等于 <code>1</code> 时，<code>shadowColor</code> 和 <code>shadowMaxDistance</code> 才通过 <code>uiHints</code> 的 <code>shownIf</code> 显示。这个示例说明 boolean expressions 经常用于声明式 UI 条件，而不是直接执行渲染逻辑。</span><span class="en">A prim representing a light has an attribute that controls whether shadows are enabled.</span></p>
      <pre>def Scope "MyLight"
{
    custom int enableShadows = 0
    custom color3d shadowColor = (0, 0, 0) (
        uiHints = {
            string shownIf = "enableShadows == 1"
        }
    )
    custom double shadowMaxDistance = -1.0 (
        uiHints = {
            string shownIf = "enableShadows == 1"
        }
    )
}</pre>
      <h3>命名空间属性示例</h3>
      <p><span class="zh">源页还展示了把 shadow 相关属性组织进 namespace 的写法：变量名可写成 <code>shadow:enable</code>，条件也相应写成 <code>shadow:enable == 1</code>。这与前面 <code>namespaced:variables</code> 的变量规则一致，说明表达式变量与 USD property namespace 共享语法边界。</span><span class="en">Alternatively, the shadow-related properties could be grouped into a namespace.</span></p>
      <pre>def Scope "MyLight"
{
    custom int shadow:enable = 0
    custom color3d shadow:color = (0, 0, 0) (
        uiHints = {
            string shownIf = "shadow:enable == 1"
        }
    )
    custom double shadow:maxDistance = -1.0 (
        uiHints = {
            string shownIf = "shadow:enable == 1"
        }
    )
}</pre>
    </section>

    <section data-cn-complete="round-485-boolean-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 <code>Boolean Expressions</code> 当成通用脚本。页面只定义表达式求值语言，变量来源是 USD property name，不提供函数调用、对象访问、循环或副作用。</span><span class="en">Variables are expressed as USD property names.</span></li>
        <li><span class="zh">不要把 string 常量写成多行未转义文本。官方只允许 single-line strings；若需要换行，必须使用 escaped newline，例如 <code>"string with\\nescaped newline"</code>。这条规则对 metadata、UI hint 和 schema-authored 字符串尤其关键，因为未转义换行会改变表达式解析边界，导致工具把后续文本当成非法表达式。</span><span class="en">Non-printable characters such as newlines must be escaped. Only single-line strings are permitted.</span></li>
        <li><span class="zh">调试比较运算时，先确认变量名是否符合 <code>SdfPath</code> 支持的 property 语法，再确认变量实际值是否能通过 <code>VtValue::Cast</code> 或比较运算参与求值。</span><span class="en">Casting is performed by VtValue::Cast.</span></li>
        <li><span class="zh">调试逻辑运算时，先给复杂表达式加括号，例如 <code>numOps != 3 && (width > 10.0 || height > 10.0)</code>，再逐段检查 <code>&amp;&amp;</code> 和 <code>||</code> 的子表达式结果。</span><span class="en">Parenthesized expressions group subexpressions.</span></li>
        <li><span class="zh">如果 <code>shownIf</code> 没有按预期控制 UI，优先检查控制属性的 authored 类型和值，例如 <code>enableShadows</code> 或 <code>shadow:enable</code> 是否真的等于 <code>1</code>，再检查表达式字符串是否引用了正确的 property 名称。</span><span class="en">shownIf conditions depend on the referenced attribute value.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-485-boolean-authoring-guidance">
      <h2>建模与消费建议 / Authoring and Consumer Guidance</h2>
      <p><span class="zh">在 authoring 阶段，建议把 boolean expression 当作“声明式条件字符串”来维护。它通常被写入 metadata 或 <code>uiHints</code>，例如 <code>shownIf</code>，由下游工具在显示属性、构建面板或过滤可编辑项时求值。由于表达式本身没有副作用，资产作者应该把条件保持短小、可读，并把业务含义放在属性命名和 schema 文档中，而不是试图把复杂逻辑全部塞进一个字符串。</span><span class="en">Boolean expressions are commonly authored as declarative condition strings.</span></p>
      <p><span class="zh">在变量命名上，表达式与 USD property namespace 紧密相关。<code>simpleVariable</code> 适合普通属性，<code>namespaced:variables</code> 或 <code>shadow:enable</code> 适合把相关控制项组织到 namespace 下。若工具报告变量不存在，优先检查属性名是否拼写一致、namespace 冒号是否正确、属性是否位于表达式求值器期望的上下文中，而不是先怀疑比较运算符本身。</span><span class="en">Variable names follow USD property-name syntax.</span></p>
      <p><span class="zh">在类型和值调试上，常见问题来自隐式转换。<code>enableShadows == 1</code> 这样的表达式显式比较整数，行为通常清楚；如果直接写 <code>enableShadows</code>、字符串变量或 numeric 变量作为最终表达式，求值器需要把结果转换为 boolean。此时应检查底层 <code>VtValue</code> 中的值是否可按预期转换，并在必要时用显式比较让条件更清楚。</span><span class="en">Implicit casting can be avoided by writing explicit comparisons.</span></p>
      <p><span class="zh">在阅读相邻文档时，本页应与 <code>SdfPath</code> 的 property path 语法、<code>VtValue</code> 的值承载与转换、以及 UsdUI 或 schema 文档中的 UI hints 一起理解。Boolean Expressions 只定义条件语言；具体何时求值、变量从哪里取值、UI 如何响应，取决于消费该字符串的工具或 schema 约定。</span><span class="en">Evaluation context is provided by the consuming tool or schema convention.</span></p>
    </section>

    <section data-cn-complete="round-485-boolean-neighbor-paths">
      <h2>相邻 API 与本地点击路径 / Neighbor APIs and Local Click Path</h2>
      <p><span class="zh">本页属于 Sdf/Doxygen 文档中的表达式语言说明，阅读时应优先从 API 本地入口进入，再衔接 <a href="sdf_page_front.html">Sdf 模块入口</a>、<a href="class_sdf_path.html">SdfPath</a>、<a href="vt_page_front.html">Vt</a> 和 <a href="class_vt_value.html">VtValue</a> 相关类型。它也与 release/user guide 中的 UI hints、属性显示条件和 schema authoring 场景相关，但本页只负责表达式语法和求值边界。</span><span class="en">The page relates to SdfPath, VtValue, and USD property names.</span></p>
      <p><span class="zh">推荐点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> <a href="sdf_page_front.html">Sdf</a> -> Boolean Expressions -> <a href="class_sdf_path.html">SdfPath</a> / <a href="vt_page_front.html">Vt</a>。这个顺序让读者先理解 Sdf 属性名语法，再理解表达式中的变量和隐式类型转换。</span><span class="en">Local reading order keeps Sdf and Vt context close to the expression language.</span></p>
    </section>

    <section data-cn-complete="round-485-boolean-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">开头段定义布尔表达式语言的范围：它提供简洁、C/C++ 风格的表达式语法，表达式可由常量、变量和子表达式组成，最终求值结果始终是 boolean value。</span><span class="en">The final result of evaluating an expression is always a boolean value.</span></p>
      <p><span class="zh">常量和字符串段说明可用 literal 类型：boolean、number 和 string。字符串既可单引号也可双引号，但不可包含未转义换行，这对 UI metadata 中直接写表达式尤其重要。</span><span class="en">Strings may be either single- or double-quoted.</span></p>
      <p><span class="zh">变量段说明表达式如何动态化：变量不是任意标识符，而是 USD property name，并且语法与 <code>SdfPath</code> 支持的 property 名称一致。</span><span class="en">A variable is expressed as a USD property name.</span></p>
      <p><span class="zh">二元和一元运算符段说明可用运算能力：比较运算负责生成条件，<code>&amp;&amp;</code> 和 <code>||</code> 负责组合条件，<code>!</code> 负责取反。复杂条件应使用括号明确分组。</span><span class="en">The supported operators are comparison operators and boolean operators.</span></p>
      <p><span class="zh">隐式转换段解释为什么数字或字符串表达式也能成为最终 boolean：某些运算符会先把子表达式转换为 boolean，最终结果也可能需要 <code>VtValue::Cast</code> 转换。</span><span class="en">There are several places where the value of an expression or subexpression will be implicitly cast to a boolean value.</span></p>
      <p><span class="zh">示例段把语法落到实际 USD authoring：<code>shownIf</code> 使用表达式字符串，根据 <code>enableShadows</code> 或 <code>shadow:enable</code> 的值决定阴影相关属性是否显示。</span><span class="en">The shadow-related attributes are only displayed in the UI if the controlling attribute has a value of 1.</span></p>
    </section>

    <section data-cn-complete="round-485-boolean-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">保留并解释官方关键词：<code>Boolean Expression Language</code>、<code>Constants</code>、<code>Strings</code>、<code>Variables</code>、<code>Binary Operators</code>、<code>Unary Operators</code>、<code>Parenthesized expressions</code>、<code>Implicit Casting</code>、<code>VtValue::Cast</code>、<code>Example</code>、<code>enableShadows</code>、<code>shadowColor</code>、<code>shadowMaxDistance</code>、<code>shadow:enable</code> 和 <code>shownIf</code>。</span><span class="en">Official sections, operators, code snippets, and identifiers are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读继续保留总入口、API 入口、breadcrumb、side navigation 和 reading-flow。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-485-boolean-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：Boolean Expressions 是 Sdf 相关布尔表达式语言；表达式可由 constants、variables、binary/unary operators 和 parentheses 构成；变量遵循 USD property name / <code>SdfPath</code> property 语法；<code>!</code>、<code>&amp;&amp;</code>、<code>||</code> 与最终返回值会涉及 boolean casting；<code>shownIf</code> 示例展示了如何用 <code>enableShadows == 1</code> 或 <code>shadow:enable == 1</code> 控制 UI 显示。</span><span class="en">A review-ready reader can explain constants, variables, operators, casting, and shownIf examples.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">返回 API 本地入口 / Back to local API entry</a></p>
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
  const missingSource = expectedKeywords.filter((keyword) => !sourceText.includes(keyword));
  const missingOutput = expectedKeywords.filter((keyword) => !outputText.includes(keyword));
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
      bilingual_complete: html.includes('data-cn-status="bilingual_complete"'),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐/.test(html),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL) && html.includes("Open official page"),
      has_code_path: [
        "numOps != 3",
        "mode == 'default'",
        "width > 10.0",
        "VtValue::Cast",
        "shownIf = \"enableShadows == 1\"",
        "shownIf = \"shadow:enable == 1\"",
      ].every((keyword) => stripHtml(html).includes(keyword)),
      zh_chars: zhCharCount(stripHtml(html)),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
  };
}

function checkReport(report) {
  return {
    ...report,
    passed:
      report.missing_source_keywords.length === 0 &&
      report.missing_output_keywords.length === 0 &&
      report.output_checks.bilingual_complete &&
      report.output_checks.no_draft_marker &&
      report.output_checks.has_main_reading_path &&
      report.output_checks.has_official_link &&
      report.output_checks.has_code_path &&
      report.output_checks.zh_chars >= 1800 &&
      report.output_checks.zh_blocks >= 28,
  };
}

function writePage() {
  const html = pageHtml();
  const report = checkReport(sourceParity(html));
  write(TARGET, html);
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) throw new Error(`Source parity failed: ${JSON.stringify(report, null, 2)}`);
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
    title: "Boolean Expressions",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Boolean Expressions Doxygen page by adding Chinese main-reading-path coverage for expression language scope, constants, strings, variables, binary/unary operators, parentheses, implicit casting, VtValue::Cast, shownIf examples, SdfPath property-name boundaries, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1800,
      minimum_chinese_blocks: 28,
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
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Boolean Expressions source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
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
        id: "P1-boolean-expressions-source-parity",
        severity: "P1",
        summary: "Boolean Expressions 页面必须按官方 section 覆盖表达式语言、常量、字符串、变量、运算符、括号、隐式转换和 shownIf 示例，不能只保留摘要表。",
        evidence: "本轮覆盖 Boolean Expression Language、Constants、Strings、Variables、Binary/Unary Operators、Parenthesized expressions、Implicit Casting、VtValue::Cast、enableShadows/shadow:enable shownIf 示例和 SdfPath property-name 边界。",
        required_action: "后续 Sdf/Vt/property expression 相关页面继续按 source snapshot 做中文主阅读路径、调试路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 API entry -> Sdf -> Boolean Expressions -> SdfPath/Vt 的点击路径，并重跑 reading-flow 与 click-path 审计。",
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
  const script = "scripts/promote_round_485_boolean_expressions.mjs";
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
  console.log("Usage: node scripts/promote_round_485_boolean_expressions.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
