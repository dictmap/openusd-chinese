import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { repairUsdPageFrontObjectModelLinks } from "./repair_usd_page_front_object_model_links.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_api_usd_page_front_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "usd_page_front.html");

const terms = new Map([
  ["API Manual", "API 手册"],
  ["Key Classes", "关键类"],
  ["Object Model and How the Classes Work Together", "对象模型以及类如何协同工作"],
  ["SdfLayer: Shared Data Files", "SdfLayer：共享数据文件"],
  ["UsdStage: Composed View of an SdfLayer", "UsdStage：SdfLayer 的组合视图"],
  ["UsdPrim: Nestable Namespace Containers", "UsdPrim：可嵌套命名空间容器"],
  ["UsdProperty: Common Interface for Attributes and Relationships", "UsdProperty：Attributes 与 Relationships 的通用接口"],
  ["UsdAttribute: Typed, Sampled, Data", "UsdAttribute：有类型、可采样的数据"],
  ["UsdRelationship: Targetting Namespace Objects", "UsdRelationship：指向命名空间对象"],
  ["General Metadata in USD", "USD 中的通用 Metadata"],
  ["Composition Operator Interfaces: UsdReferences, UsdInherits, UsdVariantSets", "Composition Operator 接口：UsdReferences、UsdInherits、UsdVariantSets"],
  ["Basic Datatypes for Scene Description Provided by Sdf", "Sdf 提供的场景描述基础数据类型"],
  ["Attribute value types", "Attribute 值类型"],
  ["Basic data types", "基础数据类型"],
  ["Roles", "角色"],
  ["Array data types", "数组数据类型"],
  ["Dictionary-valued Metadata", "字典值 Metadata"],
  ["Unicode in USD", "USD 中的 Unicode"],
  ["Overview", "概览"],
  ["UTF-8 Encoding", "UTF-8 编码"],
  ["Language Support", "语言支持"],
  ["Identifiers", "标识符"],
  ["Operation Quick Reference", "操作快速参考"],
  ["Encoding Quick Reference", "编码快速参考"],
  ["Important Properties of Scene Description", "场景描述的重要属性"],
  ["Names, Namespace Ordering, and Property Namespaces", "名称、命名空间排序与 Property 命名空间"],
  ["TimeSamples, Defaults, and Value Resolution", "TimeSamples、Defaults 与值解析"],
  ["Defs, Overs, Classes, and Prim Types", "Defs、Overs、Classes 与 Prim 类型"],
  ["Model Hierarchy: Meaning and Purpose", "Model 层级：含义与目的"],
  ["How \"active\" Affects Prims on a UsdStage", "\"active\" 如何影响 UsdStage 上的 Prims"],
  ["Text, Binary, and Plugin Filetypes", "文本、二进制与插件文件类型"],
  ["Resolving Asset References", "解析资产引用"],
  ["Advanced Scenegraph Scalability Features", "高级 Scenegraph 可扩展性特性"],
  ["Dynamic File Formats", "动态文件格式"],
  ["Scenegraph Instancing", "Scenegraph 实例化"],
  ["Sequencable, Re-timable Animated \"Value Clips\"", "可排序、可重定时的动画 \"Value Clips\""],
  ["Authoring and Editing Scene Description", "创作与编辑场景描述"],
  ["Specifying Where Edits Should Go", "指定编辑应写入的位置"],
  ["Client Safety and Response to Edits", "客户端安全性与对编辑的响应"],
  ["Common Idioms and Examples", "常见用法与示例"],
  ["Traversing a Stage", "遍历 Stage"],
  ["Working With Schema Classes", "使用 Schema 类"],
  ["Bool Return Values and Safe Operator Bool", "Bool 返回值与安全 operator bool"],
  ["Error Reporting Policy and Control", "错误报告策略与控制"],
  ["Best Practices and Common Questions", "最佳实践与常见问题"],
  ["Object Parameters as Const-Ref", "对象参数作为 Const-Ref"],
  ["Reading Data Efficiently", "高效读取数据"],
  ["Payloads: Impact of Using and Not Using", "Payloads：使用与不使用的影响"],
  ["Threading Model and Performance Considerations", "线程模型与性能考虑"],
  ["Thread-safety Guarantee", "线程安全保证"],
  ["Creating New Schema Classes with usdGenSchema", "用 usdGenSchema 创建新的 Schema 类"],
  ["IsA Vs. API Schemas", "IsA 与 API Schemas"],
  ["Impact on Interchange of Creating and Extending Schemas", "创建和扩展 Schemas 对交换的影响"],
]);

const classSummaries = [
  [
    /(<a class="el" href="class_usd_stage\.html"[^>]*>UsdStage<\/a>) owns the scenegraph and provides access to a composition\./,
    "$1",
    "拥有 scenegraph，并提供对 composition 的访问。",
    "owns the scenegraph and provides access to a composition.",
  ],
  [
    /(<a class="el" href="class_usd_prim\.html"[^>]*>UsdPrim<\/a>) is the hierarchically nestable unit of scene description\./,
    "$1",
    "是场景描述中可按层级嵌套的单元。",
    "is the hierarchically nestable unit of scene description.",
  ],
  [
    /(<a class="el" href="class_usd_attribute\.html"[^>]*>UsdAttribute<\/a>) records time-varying data on prims\./,
    "$1",
    "记录 prims 上随时间变化的数据。",
    "records time-varying data on prims.",
  ],
  [
    /(<a class="el" href="class_usd_relationship\.html"[^>]*>UsdRelationship<\/a>) records links to other prims and properties\./,
    "$1",
    "记录指向其他 prims 与 properties 的链接。",
    "records links to other prims and properties.",
  ],
  [
    /(<a class="el" href="class_usd_edit_target\.html"[^>]*>UsdEditTarget<\/a>) allows editing of any layer\/variation contained in a stage\./,
    "$1",
    "允许编辑 stage 中包含的任意 layer 或 variation。",
    "allows editing of any layer/variation contained in a stage.",
  ],
  [
    /(<a class="el" href="class_usd_notice\.html"[^>]*>UsdNotice<\/a>) contains notifications that Usd issues when a stage's contents change\./,
    "$1",
    "包含 stage 内容变化时 Usd 发出的通知。",
    "contains notifications that Usd issues when a stage's contents change.",
  ],
  [
    /(<a class="el" href="class_usd_schema_base\.html"[^>]*>UsdSchemaBase<\/a>) is the base class for generated schema classes\./,
    "$1",
    "是生成的 schema classes 的基类。",
    "is the base class for generated schema classes.",
  ],
  [
    /(<a class="el" href="class_usd_time_code\.html"[^>]*>UsdTimeCode<\/a>) is an ordinate that can be floating-point or an unvarying 'default'\./,
    "$1",
    "表示一个 ordinate，可为浮点时间值，也可为不随时间变化的 'default'。",
    "is an ordinate that can be floating-point or an unvarying 'default'.",
  ],
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termPair(en) {
  const zh = terms.get(en);
  return zh ? `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>` : en;
}

function bilingualBlock(zh, enHtml) {
  return `<div class="bilingual-block"><p class="zh">${zh}</p><p class="en">${enHtml}</p></div>`;
}

function replaceRequired(html, from, to) {
  if (!html.includes(from)) {
    throw new Error(`Expected source fragment not found: ${from.slice(0, 120)}`);
  }
  return html.replace(from, to);
}

function applyTermPairs(html) {
  for (const [en] of terms) {
    html = html.replace(new RegExp(`>(\\s*)${escapeRegex(en)}(\\s*)<\\/a>`, "g"), (_match, before, after) => `>${before}${termPair(en)}${after}</a>`);
  }
  html = html.replace("<td><b>API Manual</b>  <br  />", `<td><b>${termPair("API Manual")}</b>  <br  />`);
  html = html.replace('<p class="starttd"><b>Key Classes</b> </p>', `<p class="starttd"><b>${termPair("Key Classes")}</b> </p>`);
  html = html.replace("Usd_InternalMultiThreading  </li>", `<span class="cn-term">Usd 内部多线程</span><span class="en-term">Usd_InternalMultiThreading</span>  </li>`);
  return html;
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated API front-page bilingual entry from source/openusd_api_usd_page_front_source.html. Source URL: https://openusd.org/release/api/usd_page_front.html -->\n${html}`;
html = html.replace("<html xmlns=\"http://www.w3.org/1999/xhtml\">", "<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"zh-CN\">");
html = html.replace("<title>Universal Scene Description: Usd : Universal Scene Description (Core)</title>", "<title>Universal Scene Description: Usd 核心 / Usd : Universal Scene Description (Core)</title>");
html = html.replace('<link rel="shortcut icon" href="https://openusd.org/images/USDIcon.ico"/>', '<link rel="shortcut icon" href="images/USDIcon.ico"/>');
html = html.replace('<link href="usd_style.css" rel="stylesheet" type="text/css"/>', '<link href="usd_style.css" rel="stylesheet" type="text/css"/>\n<link href="openusd_cn.css" rel="stylesheet" type="text/css"/>');
html = replaceRequired(
  html,
  '<div class="headertitle"><div class="title">Usd : Universal Scene Description (Core) </div></div>',
  '<div class="headertitle"><div class="title"><span class="zh">Usd：通用场景描述核心</span><span class="en">Usd : Universal Scene Description (Core)</span></div></div>',
);
html = replaceRequired(
  html,
  '<div class="textblock"><p><a class="anchor" id="md_pxr_usd_usd_docs_front"></a></p>',
  `<div class="textblock"><p><a class="anchor" id="md_pxr_usd_usd_docs_front"></a></p>
<div class="cn-repro-note">
<p class="zh">本页是 API 首页直达的 Usd core front page。当前保留官方 Doxygen 布局、目录层级、类名和链接目标，并为模块说明、手册目录和关键类摘要添加中文标签。</p>
<p class="en">This page is the Usd core front page linked directly from the API home page. It preserves the official Doxygen layout, manual hierarchy, class names, and link targets while adding Chinese labels for the module summary, manual contents, and key-class summaries.</p>
<p class="zh">Usd 模块是客户端最常接触的核心层：UsdStage 提供组合后的场景视图，UsdPrim 表示层级命名空间中的对象，UsdAttribute 与 UsdRelationship 分别承载有类型数据和对象引用关系。</p>
<p class="en">The Usd module is the core layer most often used by clients: UsdStage presents the composed scene view, UsdPrim represents objects in the namespace hierarchy, and UsdAttribute and UsdRelationship carry typed data and object-reference relationships.</p>
<p class="zh">阅读本页时，先看 Core API Manual 的对象模型，再看 SdfLayer、UsdStage、UsdPrim、UsdProperty、UsdAttribute、UsdRelationship 的协作方式；这些概念决定了后续 schema 页面和 authoring API 的使用方式。</p>
<p class="en">When reading this page, start with the object model in the Core API Manual, then follow how SdfLayer, UsdStage, UsdPrim, UsdProperty, UsdAttribute, and UsdRelationship work together; these concepts shape later schema pages and authoring APIs.</p>
<p class="zh">Composition Operator Interfaces 部分说明 references、inherits、variant sets 等组合入口；它们是把多个 Layer、资产和变体合成为最终 Stage 的关键。</p>
<p class="en">The Composition Operator Interfaces section introduces references, inherits, variant sets, and related composition entry points; they are central to combining layers, assets, and variants into the final Stage.</p>
<p class="zh">本地双语层不会翻译 UsdStage、UsdPrim、SdfLayer 等类名，也不会改动 Doxygen 锚点；这样你可以直接把页面内容对应到 C++/Python API 和官方搜索结果。</p>
<p class="en">The local bilingual layer does not translate class names such as UsdStage, UsdPrim, or SdfLayer, and it does not change Doxygen anchors, so the page remains directly aligned with C++/Python APIs and official search results.</p>
<p class="zh">Key Classes 表格是后续查阅的索引：遇到场景整体问题先看 UsdStage，遇到对象层级和类型先看 UsdPrim，遇到数据读写先看 UsdAttribute，遇到目标关系先看 UsdRelationship。</p>
<p class="en">The Key Classes table is the lookup index for later work: use UsdStage for whole-scene questions, UsdPrim for hierarchy and type questions, UsdAttribute for data authoring and reading, and UsdRelationship for target relationships.</p>
<p class="zh">如果你正在写工具或调试管线，本页应和 Overview and Purpose 一起读：前者说明 API 对象如何协作，后者说明整个库和 schema 体系为什么这样分层。</p>
<p class="en">If you are writing tools or debugging a pipeline, read this page together with Overview and Purpose: this page explains how API objects cooperate, while Overview and Purpose explains why the library and schema system are layered this way.</p>
<p class="zh">本页的中文补强重点是阅读路径而不是替换 API 手册：后续进入具体类页时，仍应以英文函数签名、类型名、命名空间和 Doxygen 锚点作为查证依据。</p>
<p class="en">The Chinese refinement on this page focuses on reading paths rather than replacing the API manual: when entering specific class pages later, English function signatures, type names, namespaces, and Doxygen anchors remain the evidence to check against.</p>
</div>`,
);
html = replaceRequired(
  html,
  '<p><b>Usd</b> is the core client-facing module for authoring, composing, and reading Universal Scene Description. USD is designed to encode scalable, hierarchically organized, static and time-sampled data, for the primary purpose of interchanging and augmenting the data between cooperating Digital Content Creation applications.</p>',
  bilingualBlock(
    '<b>Usd</b> 是面向客户端的核心模块，用于创作、组合和读取 Universal Scene Description。USD 设计用于编码可扩展、层级组织、静态以及 time-sampled 数据，主要目的，是在协作的 Digital Content Creation 应用之间交换并增强数据。',
    '<b>Usd</b> is the core client-facing module for authoring, composing, and reading Universal Scene Description. USD is designed to encode scalable, hierarchically organized, static and time-sampled data, for the primary purpose of interchanging and augmenting the data between cooperating Digital Content Creation applications.',
  ),
);
html = replaceRequired(
  html,
  '<h1><a class="anchor" id="Usd_ManualDesc"></a>\nCore API Manual</h1>',
  '<h1><a class="anchor" id="Usd_ManualDesc"></a><span class="zh">核心 API 手册</span><span class="en">Core API Manual</span></h1>',
);
html = replaceRequired(
  html,
  '<p>This manual contains the API documentation for the core Usd module, prefaced with an introduction to the key concepts behind the API, and including a guide to making effective use of the API. In this manual we do not deeply explore the composition semantics that underly Usd scenegraphs - that is the domain of the (forthcoming) <em>Universal Scene Description Composition Compendium</em>. We will discuss some aspects of the composition operators, primarily as they affect authoring workflows and/or scalability and/or import/export.</p>',
  bilingualBlock(
    '本手册包含 core Usd 模块的 API 文档，开头介绍 API 背后的关键概念，并包含如何有效使用 API 的指南。本手册不会深入展开支撑 Usd scenegraphs 的 composition semantics，那属于计划中的 <em>Universal Scene Description Composition Compendium</em> 范围；这里只讨论 composition operators 中会影响创作流程、可扩展性以及导入/导出的部分。',
    'This manual contains the API documentation for the core Usd module, prefaced with an introduction to the key concepts behind the API, and including a guide to making effective use of the API. In this manual we do not deeply explore the composition semantics that underly Usd scenegraphs - that is the domain of the (forthcoming) <em>Universal Scene Description Composition Compendium</em>. We will discuss some aspects of the composition operators, primarily as they affect authoring workflows and/or scalability and/or import/export.',
  ),
);

html = applyTermPairs(html);

for (const [pattern, linkReplacement, zh, en] of classSummaries) {
  html = html.replace(pattern, (_match, link) => `<span class="key-class-line">${link.replace("$1", linkReplacement)} <span class="zh-inline">${zh}</span><span class="en-inline">${en}</span></span>`);
}

html = html.replace(
  '<li class="footer">&copy; Copyright 2026, Pixar Animation Studios. | <a href="https://disneytermsofuse.com/">Terms of Use</a> | Generated on Wed Apr 22 2026 16:02:16 by <a href="https://www.doxygen.org/index.html"><img class="footer" src="doxygen.svg" width="104" height="31" alt="doxygen"/></a> 1.9.6 </li>',
  '<li class="footer">&copy; Copyright 2026, Pixar Animation Studios. | <span class="cn-footer-note">中文双语复刻层：Usd API front page，本地学习用途，官方英文正文与链接保留。 / Bilingual Usd API front-page layer for local study; official English body and links are preserved.</span> | <a href="https://disneytermsofuse.com/">Terms of Use</a> | Generated on Wed Apr 22 2026 16:02:16 by <a href="https://www.doxygen.org/index.html"><img class="footer" src="doxygen.svg" width="104" height="31" alt="doxygen"/></a> 1.9.6 </li>',
);

html = repairUsdPageFrontObjectModelLinks(html);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  output: outputPath,
  translatedTerms: terms.size,
  keyClassSummaries: classSummaries.length,
}, null, 2));
