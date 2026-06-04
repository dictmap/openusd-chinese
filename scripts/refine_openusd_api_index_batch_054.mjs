import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-054";

const refinements = [
  {
    output: "full_site/api/modules.html",
    title: "Modules",
    notes: [
      "`modules.html` 是 Doxygen 生成的 API modules 总入口，用于按功能组进入 Arch、Gf、Tf 等模块分组，而不是某个单独类或函数的正文说明。",
      "当前摘录从 `Bits`、`Multithreading`、`Math`、`Strings`、`System Functions`、`Memory Management`、`Diagnostics`、`Symbol Visibility` 等 Arch 基础组开始，再进入 Gf/Tf 等模块。",
      "阅读时应把 module 名称保留原样，把中文理解放在用途层：例如 `Bits` 对应机器位布局相关函数，`Linear Algebra` 对应 Gf 线性代数，`Diagnostic Facilities` 对应 Tf 诊断机制。",
      "本页链接数量多，适合做导航页：先根据模块前缀 `Arch`、`Gf`、`Tf` 判断层级，再进入具体 group 页查看函数、宏、类和详细说明。",
      "本地复刻中清单内 group 链接应跳本地页面；清单外内部链接走 `site/uncovered_openusd_page.html`，只有 `Open official page` 保持外跳。"
    ],
    terms: [
      ["Modules", "模块索引"],
      ["group", "功能分组"],
      ["Arch", "平台/系统基础层"],
      ["Gf", "Graphics Foundations"],
      ["Tf", "基础工具层"]
    ]
  },
  {
    output: "full_site/api/namespacemembers_func.html",
    title: "Namespace Members: Functions",
    notes: [
      "`namespacemembers_func.html` 是 documented namespace functions 的索引页，条目按函数名列出，并链接到所属 namespace 或相关 group。",
      "当前摘录包含 `ShaderMetadataHelpers` 中的 `ComputeShownIfFromMetadata()`、`CreateStringFromStringVec()`、`GetRoleFromMetadata()`、`ParseSdfValue()` 等 shader metadata helper 函数。",
      "`CreateSpeculationExecutor()` 来自 `VdfTestUtils`，说明该索引也包含测试辅助 namespace 中的函数；`operator<<()` 条目关联 `pxr_CLI::CLI::enums` 和 `std`。",
      "阅读本页时不要把函数名翻译掉；正确方式是保留 `FunctionName()`，用中文说明它属于哪个 namespace、可能服务于 metadata parsing、test utility 或 debugging output。",
      "如果要找某个 namespace 的完整上下文，应从函数条目跳到 `ShaderMetadataHelpers`、`VdfTestUtils`、`pxr_CLI::CLI::enums` 或 `std` 对应页面。"
    ],
    terms: [
      ["namespace function", "命名空间函数"],
      ["ShaderMetadataHelpers", "ShaderMetadataHelpers"],
      ["VdfTestUtils", "VdfTestUtils"],
      ["operator<<()", "operator<<()"],
      ["metadata parsing", "元数据解析"]
    ]
  },
  {
    output: "full_site/api/namespacemembers_type.html",
    title: "Namespace Members: Typedefs",
    notes: [
      "`namespacemembers_type.html` 是 namespace typedefs 的索引页，当前摘录较短，主要列出 `pxr_tsl` namespace 下的 typedef 条目。",
      "`robin_pg_map` 和 `robin_pg_set` 是本页的核心条目，均链接到 `pxr_tsl`；它们与 robin hood hashing/open-addressing 容器实现相关。",
      "此类页面的阅读重点不是自然语言段落，而是 typedef 名称、所属 namespace 和后续跳转；中文导读只解释 typedef 在 API 查找中的作用。",
      "保留 `robin_pg_map`、`robin_pg_set`、`pxr_tsl` 原样，避免将 typedef 名称翻译成中文造成检索失败。",
      "需要容器行为细节时，应继续进入 `pxr_tsl` namespace 或 `robin_map`、`robin_set` class 页面查看 template 参数和实现说明。"
    ],
    terms: [
      ["typedef", "类型别名"],
      ["pxr_tsl", "pxr_tsl"],
      ["robin_pg_map", "robin_pg_map"],
      ["robin_pg_set", "robin_pg_set"],
      ["robin hood hashing", "robin hood hashing"]
    ]
  },
  {
    output: "full_site/api/namespacemembers.html",
    title: "Namespace Members",
    notes: [
      "`namespacemembers.html` 是 namespace members 总索引，混合列出 functions、typedefs 和 operator 条目，并给出它们所属的 namespace。",
      "当前摘录同时包含 `ShaderMetadataHelpers` 函数、`VdfTestUtils::CreateSpeculationExecutor()`、`pxr_tsl` 的 `robin_pg_map`/`robin_pg_set`、以及 `operator<<()` 条目。",
      "阅读时先按条目类型分流：带 `()` 的一般是函数，`operator<<()` 是运算符重载，`robin_pg_map`/`robin_pg_set` 是 typedef；再根据右侧 namespace 链接进入上下文。",
      "本页常用于“知道成员名但不知道所属 namespace”的反向检索，因此所有 member 名称和 namespace 名称必须保留英文原样。",
      "与 `namespacemembers_func.html` 和 `namespacemembers_type.html` 的区别是：本页是总览，后两页按 function/typedef 进一步过滤。"
    ],
    terms: [
      ["Namespace Members", "命名空间成员"],
      ["member index", "成员索引"],
      ["function", "函数"],
      ["operator overload", "运算符重载"],
      ["typedef", "类型别名"]
    ]
  },
  {
    output: "full_site/api/namespaces.html",
    title: "Namespace List",
    notes: [
      "`namespaces.html` 是 documented namespaces 的列表页，适合从 namespace 维度进入 API，而不是从 class、file 或 module 维度进入。",
      "当前摘录列出 `pxr_tsl`、`ShaderMetadataHelpers`、`std`、`VdfTestUtils` 等 namespace，并在 `VdfTestUtils` 下列出 CallbackNode、ExecutionStats、Network、Node、OutputAccessor 等测试辅助类。",
      "`pxr_tsl` 描述 MIT License 和 robin_map/robin_set；`ShaderMetadataHelpers` 说明 shader metadata parsing utilities；`VdfTestUtils` 说明用于 unit tests 中创建 Vdf network 的 helper classes。",
      "阅读本页时应先定位 namespace，再追踪其下 class/function：例如从 `VdfTestUtils` 进入 `Network`、`Node`、`VdfNode`、`VdfContext` 等页面理解测试网络搭建。",
      "保留 `pxr_tsl`、`ShaderMetadataHelpers`、`VdfTestUtils`、`std` 和所有 class 名称原样，中文只解释 namespace 在库中的用途和阅读路径。"
    ],
    terms: [
      ["Namespace List", "命名空间列表"],
      ["pxr_tsl", "pxr_tsl"],
      ["ShaderMetadataHelpers", "ShaderMetadataHelpers"],
      ["VdfTestUtils", "VdfTestUtils"],
      ["unit tests", "单元测试"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用途、条目类型、阅读路径和术语对照；英文 namespace、function、typedef、module、class、operator、macro、enum、type、header、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index purpose, entry-type guidance, reading paths, and terminology for ${escapeHtml(item.title)} while retaining English namespace, function, typedef, module, class, operator, macro, enum, type, header, links, and source excerpts for comparison with the official Doxygen page.</p>
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
