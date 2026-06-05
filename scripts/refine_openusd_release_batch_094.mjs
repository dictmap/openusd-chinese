import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-094";

const refinements = [
  {
    output: "full_site/api/globals_func_e.html",
    title: "File Members - Functions - E",
    notes: [
      "`globals_func_e.html` 是 File Members 函数索引 E 段，本地摘录中核心条目是 `EfGetFirstValidInputValue()`，来源为 `firstValidInputValue.h`；它是一个非常短的函数索引页，不应被误读为 Ef 模块教程。",
      "`Ef` 通常位于 execution framework 语境中，和 Vdf/Exec 的计算网络、输入值、输出值和 evaluation cache 有联系；`EfGetFirstValidInputValue()` 从命名看用于在候选输入中选出第一个有效输入值，具体类型仍要进入头文件核对。",
      "本页的阅读重点是从函数名跳到 header，再从 header 跳到调用方或相关 class；如果要理解执行系统整体，应继续阅读 `md_pxr_exec_ef__r_e_a_d_m_e.html`、`page__execution__system__design.html` 或 Vdf/Ef class 页面。",
      "它和 `globals_e.html` 的区别在于：本页只列文件级函数，而宽索引页会混合类型、宏、变量、typedef 和 enum；中文导读保留函数名和头文件名，避免把短索引扩写成不存在的官方正文。",
      "对翻译使用者来说，这页的价值在于快速判断 `EfGetFirstValidInputValue()` 属于 execution input selection 工具，而不是 USD layer loading、asset resolution 或普通容器算法。"
    ],
    terms: [
      ["Ef execution framework", "Ef 执行框架"],
      ["input value", "输入值"],
      ["valid input", "有效输入"],
      ["function-only index", "纯函数索引"],
      ["header jump", "跳转到头文件"],
      ["evaluation cache", "求值缓存"]
    ]
  },
  {
    output: "full_site/api/globals_func_o.html",
    title: "File Members - Functions - O",
    notes: [
      "`globals_func_o.html` 是 File Members 函数索引 O 段，当前主要收集 C++ `operator` overload 条目；这些符号本身就是 API 名称，中文层只解释语义，不翻译 `operator+()`、`operator==()`、`operator>>()` 等名字。",
      "`operator+()` 可能来自 `indexedWeightsOperand.h`，与 UsdSkel indexed weights operand 的组合或加法语义有关；`operator==()` 则可能散落在 `VtDictionary`、`SdfAssetPath`、`SdfLayerOffset`、`UsdPayload`、`UsdReference`、`UsdTimeCode` 等类型上。",
      "`operator>>()`、`operator<<()` 或类似流运算符通常与文本解析、调试输出、序列化或测试输出有关，必须进入目标 header/class 页面确认输入输出格式，不能只根据符号猜测行为。",
      "O 段函数索引横跨 Vt、Gf、Sdf、Usd、UsdUtils 和 Work/Tf 辅助类型；阅读时应先看条目的所属 header，再判断它是数学运算、比较、流输出、hash/异或还是容器辅助。",
      "本页特别适合排查“某个类型为什么能用运算符比较或输出”的问题；如果目标是概念学习，应继续回到具体 class 页面，而不是停留在符号列表。"
    ],
    terms: [
      ["operator overload", "运算符重载"],
      ["stream operator", "流运算符"],
      ["equality operator", "相等运算符"],
      ["indexed weights", "索引权重"],
      ["header ownership", "头文件归属"],
      ["symbol semantics", "符号语义"]
    ]
  },
  {
    output: "full_site/api/globals_func_l.html",
    title: "File Members - Functions - L",
    notes: [
      "`globals_func_l.html` 是 File Members 函数索引 L 段，当前核心条目是 `LoadUsdPhysicsFromRange()`，来源为 `parseUtils.h`；这是一个与 UsdPhysics 解析辅助相关的短索引页。",
      "`LoadUsdPhysicsFromRange()` 从名称看关注从一段输入范围中加载或解析 UsdPhysics 信息，属于 physics parse utilities，而不是通用 `UsdStage::Open()`、layer loading 或文件系统读取 API。",
      "本页和 `UsdPhysics` token、parse utilities、范围解析和测试数据输入更相关；如果要理解物理 schema 本身，应继续阅读 `usd_physics_page_front.html`、相关 class 页面或 release/user guide 中的物理 schema 文档。",
      "短函数页的正确阅读路径是：先确认函数所在 header，再查函数签名、参数类型、范围输入约定和错误处理；如果 Doxygen 摘录不足，应进入 source/header 页面或调用点，而不是臆测语义。",
      "中文层保留 `LoadUsdPhysicsFromRange()`、`parseUtils.h`、`UsdPhysics` 等英文符号，说明它在物理解析工具链中的定位，避免将 `Load` 泛化为所有 USD 加载流程。"
    ],
    terms: [
      ["UsdPhysics", "UsdPhysics"],
      ["parse utilities", "解析辅助工具"],
      ["range input", "范围输入"],
      ["schema loading", "schema 解析加载"],
      ["short function page", "短函数页"],
      ["error handling", "错误处理"]
    ]
  },
  {
    output: "full_site/api/globals.html",
    title: "File Members - Root Index",
    notes: [
      "`globals.html` 是 Doxygen File Members 根索引页，用来进入全局宏、函数、typedef、变量、enum 和字母分组；它不是某个 OpenUSD 模块的概念正文，而是全站文件级符号导航入口。",
      "当前摘录从 A 段开始，包含 `AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 等 Asset Resolution 注册宏，以及 `ARCH_*` 平台/基础设施宏；读者应按前缀识别模块。",
      "`AR_*` 属于 Ar asset resolution plugin/ resolver 注册语境，`ARCH_*` 属于 Arch platform abstraction，`TF_*` 属于 Tf 基础设施，`GF_*` 属于 Gf 数学；宽索引页的关键是按前缀分流，而不是按中文顺序阅读。",
      "如果查函数，跳到 `globals_func*.html`；如果查变量，跳到 `globals_vars*.html`；如果查类型或 enum，跳到 `globals_type.html` 或 `globals_enum.html`；根索引只提供第一层入口。",
      "中文补强的重点是保护导航语义：保留宏名、类型名和头文件名，说明前缀和模块边界，避免把 Doxygen 自动生成的符号列表误当成官方教程段落。"
    ],
    terms: [
      ["File Members root", "File Members 根索引"],
      ["global symbol", "全局符号"],
      ["macro prefix", "宏前缀"],
      ["Asset Resolution macro", "资产解析宏"],
      ["platform abstraction", "平台抽象"],
      ["Doxygen navigation", "Doxygen 导航"]
    ]
  },
  {
    output: "full_site/api/globals_t.html",
    title: "File Members - T",
    notes: [
      "`globals_t.html` 是 File Members 的 T 段宽索引，当前摘录大量来自 `Tf` 基础设施宏和 helper header；它和 `globals_func_t.html` 不同，包含宏、类型、变量和函数等多种条目。",
      "`TF_ADD_ENUM_NAME`、`TF_BITS_FOR_ENUM_VALUES`、`TF_DEBUG`、`TF_DECLARE_WEAK_PTRS`、`TF_DEFINE_PUBLIC_TOKENS`、`TF_REGISTRY_FUNCTION` 等宏服务于 enum metadata、debug code、weak pointer、static tokens 和 registry 机制，宏名必须保留原样。",
      "T 段还可能包含 `Trace`、`TfToken`、`TfType`、`TfNotice`、`TfPy`、`TfSpan`、`TfHash`、`TfString`、`TfUnicode` 等基础设施入口，覆盖 tracing、token、运行时类型、通知、Python bridge、span/hash/string/unicode 工具。",
      "阅读这页时先看 header：`enum.h`、`diagnostic.h`、`debug.h`、`staticTokens.h`、`registryManager.h`、`pyUtils.h`、`stringUtils.h` 等来源比字母顺序更能说明符号用途。",
      "如果要理解某个宏的编译期效果，应进入 header/source 页面查看条件编译和 template 展开；如果只是查函数签名，应转到 `globals_func_t.html` 或具体 class/namespace 页面。"
    ],
    terms: [
      ["Tf infrastructure", "Tf 基础设施"],
      ["static tokens", "静态 token"],
      ["registry macro", "注册宏"],
      ["debug code", "调试代码"],
      ["weak pointer macro", "弱指针宏"],
      ["Python bridge", "Python 桥接"]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(([en, zh]) => `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`)
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文精修导读 / Chinese Reading Notes</h2>
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补二次精修说明，重点解释 File Members 根索引、宽索引、函数索引和短函数页的阅读差异，以及模块前缀、头文件来源、函数族归属、宏/运算符语义和跨页跳转顺序。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于与官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}. It explains how to read File Members root indexes, broad letter indexes, function indexes, and short function pages, with emphasis on module prefixes, header provenance, function-family ownership, macro/operator semantics, and cross-page navigation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  let html = fs.readFileSync(filePath, "utf8");
  const section = buildSection(item);
  const existing = new RegExp(`    <section data-cn-refinement="${MARKER}">[\\s\\S]*?    <\\/section>\\r?\\n?`);

  if (existing.test(html)) {
    html = html.replace(existing, `${section}\n`);
  } else {
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$&`);
  }

  fs.writeFileSync(filePath, html, "utf8");
  return { output: item.output, notes: item.notes.length, terms: item.terms.length };
}

const results = refinements.map(refreshPage);

console.log(JSON.stringify({
  passed: true,
  marker: MARKER,
  pages_refined: results.length,
  results
}, null, 2));
