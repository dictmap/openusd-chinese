import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-quality-pass-048";

const refinements = [
  {
    output: "full_site/api/globals_j.html",
    title: "File Members : j",
    notes: [
      "`globals_j.html` 是 File Members 的字母 `j` 索引页，当前摘录集中在 `Js` JSON I/O 工具函数；它不是 `Js` 模块首页，而是从函数名跳转到具体声明的轻量索引。",
      "本页列出的 `JsConvertToContainerType()`、`JsFindValue()`、`JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()` 都保持英文函数名原样。",
      "`JsParseStream()` 和 `JsParseString()` 对应 JSON 输入解析入口，分别面向 stream 和 string；`JsWriteToStream()` 与 `JsWriteToString()` 对应 JSON 输出序列化入口。",
      "`JsFindValue()` 用于在 JSON-like container 中查找值；`JsConvertToContainerType()` 用于把解析结果或 value 转换到目标 container 语义，具体行为应继续跳到 `converter.h` 与 `utils.h` 页面核对。",
      "阅读本页时先把 `Js` 前缀理解为 USD 基础库里的 JSON I/O helper，而不是 JavaScript；需要模块级概览时应跳到 `js_page_front.html`。"
    ],
    terms: [
      ["File Members", "文件级成员索引"],
      ["JSON I/O", "JSON 输入/输出"],
      ["parse", "解析"],
      ["serialize", "序列化"],
      ["container type", "容器类型"]
    ]
  },
  {
    output: "full_site/api/globals_l.html",
    title: "File Members : l",
    notes: [
      "`globals_l.html` 是 File Members 的字母 `l` 索引页，目前核心条目是 `LoadUsdPhysicsFromRange()`，来源头文件为 `parseUtils.h`。",
      "`LoadUsdPhysicsFromRange()` 从命名上看是 UsdPhysics 解析/加载辅助函数，用于从一个 range 中读取或装载 UsdPhysics 相关定义；函数名和头文件名均保持原样。",
      "本页内容很短，因此中文导读的价值在于明确它是字母索引，不应误判为完整 UsdPhysics 指南；具体参数、range 类型和返回语义要进入函数文档或 `parseUtils.h` 页面核对。",
      "`Load` 前缀通常表示从外部表示、文本范围或解析结果中构建运行时数据；在 physics 语境下要特别关注单位、schema 类型和错误处理是否由调用方负责。",
      "后续若继续精修本页，可补充 `UsdPhysics` 概览、`parseUtils.h` 的上下文和调用示例，但本轮只补索引级中文说明，不伪装为完整函数翻译。"
    ],
    terms: [
      ["LoadUsdPhysicsFromRange", "LoadUsdPhysicsFromRange"],
      ["UsdPhysics", "UsdPhysics"],
      ["parseUtils.h", "parseUtils.h"],
      ["range", "范围/区间"],
      ["loader helper", "加载辅助函数"]
    ]
  },
  {
    output: "full_site/api/globals_o.html",
    title: "File Members : o / operators",
    notes: [
      "`globals_o.html` 是 File Members 的字母 `o` 索引页，主要列出 C++ operator overload 条目；这类页面用于定位运算符声明，不适合翻译运算符符号本身。",
      "摘录中的 `operator+()` 来自 `indexedWeightsOperand.h`，应理解为某种 indexed weights operand 的加法/组合操作入口，具体语义需要跳转到该头文件或类页面确认。",
      "`operator==()` 来自 `dictionary.h`，通常用于 dictionary 类型的相等比较；中文说明应解释比较用途，但保留 `operator==()` 写法。",
      "`operator>>()` 来自 `timeCodeRange.h`，通常表示输入流解析或反序列化；`operator^()` 来自 `vec3d.h`、`vec3f.h`、`vec3h.h`，在 Gf vector 语境中通常与三维向量运算相关。",
      "阅读 operator 索引时应同时看来源头文件、参数类型和返回类型，因为相同符号在不同类型上语义不同；本页只提供全局定位入口。"
    ],
    terms: [
      ["operator overload", "运算符重载"],
      ["operator+()", "operator+()"],
      ["operator==()", "operator==()"],
      ["operator>>()", "operator>>()"],
      ["operator^()", "operator^()"]
    ]
  },
  {
    output: "full_site/api/globals_p.html",
    title: "File Members : p",
    notes: [
      "`globals_p.html` 是 File Members 的字母 `p` 索引页，当前摘录主要由 `Pcp` composition 相关条目构成，应按 Pcp 组合系统入口阅读。",
      "`PCP_INVALID_INDEX`、`PcpArcInfoVector`、`PcpArcType` 来自 `types.h` 或 `composeSite.h`，用于 composition arc、索引值和 arc 信息集合等基础类型/常量。",
      "`PcpComposeSiteChildNames()`、`PcpComposeSiteHasPrimSpecs()`、`PcpComposeSiteHasSpecs()`、`PcpComposeSiteHasSymmetry()`、`PcpComposeSiteHasValueClips()` 等函数检查某个 compose site 上是否存在 child、spec、symmetry 或 value clips 信息。",
      "`PcpComposeSiteInherits()`、`PcpComposeSitePayloads()`、`PcpComposeSiteReferences()`、`PcpComposeSiteSpecializes()`、`PcpComposeSiteVariantSelections()` 等条目对应 USD composition arcs 的不同来源，函数名应保持英文原样。",
      "阅读本页时把 `PcpComposeSite*` 视为一组 composition 查询 helper：它们帮助分析某个 site 的 inherits、payloads、references、specializes、variant selections、permissions 和 prim sites，而不是直接编辑 scene description。"
    ],
    terms: [
      ["Pcp", "Pcp 组合系统"],
      ["compose site", "组合站点"],
      ["composition arc", "组合弧"],
      ["payloads", "payloads"],
      ["variant selections", "变体选择"]
    ]
  },
  {
    output: "full_site/api/globals_s.html",
    title: "File Members : s",
    notes: [
      "`globals_s.html` 是 File Members 的字母 `s` 索引页，当前摘录主要由 `SDF_*` 宏和 `Sdf*` 函数/类型构成，应按 Sdf scene description 层入口阅读。",
      "`SDF_DEFINE_ABSTRACT_FILE_FORMAT`、`SDF_DEFINE_FILE_FORMAT`、`SDF_FILE_FORMAT_FACTORY_ACCESS` 属于 Sdf file format 注册/工厂访问相关宏；宏名、大小写和下划线保持原样。",
      "`SdfAnchorAssetPaths()`、`SdfComputeAssetPathRelativeToLayer()` 与 asset path 和 layer 相对路径相关；它们常用于把资产路径锚定到 layer 或计算相对资产路径。",
      "`SdfComposeTimeSampleMaps()`、`SdfConvertToValidMetadataDictionary()`、`SdfConvertUnit()`、`SdfCopySpec()` 分别涉及 time samples composition、metadata dictionary 清理、单位转换和 spec 拷贝。",
      "`SdfCreatePrimAttributeInLayer()`、`SdfCreatePrimInLayer()`、`SdfCreateRelationshipInLayer()`、`SdfCreateVariantInLayer()` 是在 layer 中创建 attribute、prim、relationship 和 variant spec 的 authoring helper；它们应与 `SdfLayer`、`SdfPrimSpec`、`SdfAttributeSpec` 等页面一起阅读。"
    ],
    terms: [
      ["Sdf", "Sdf 场景描述层"],
      ["file format", "文件格式"],
      ["asset path", "资产路径"],
      ["layer", "layer"],
      ["spec", "spec 规格对象"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、字母索引读法、常见条目分类和术语对照；英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, alphabet-index reading guidance, common entry grouping, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, function names, variable names, macro names, type names, header names, operator symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
