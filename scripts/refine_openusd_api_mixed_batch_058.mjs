import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-mixed-quality-pass-058";

const refinements = [
  {
    output: "full_site/api/struct_usd_skel_tokens_type.html",
    title: "UsdSkelTokensType Class",
    notes: [
      "`UsdSkelTokensType Class` 是 `UsdSkelTokens` 的 token 集合页，集中列出 USD Skeleton schema 自动生成的 static `TfToken`。",
      "这些 token 既包括属性名，也包括 token 类型 schema builtin attributes 的 allowedTokens values；典型用途是通过 `UsdPrim::GetAttribute()` 或 schema API 以编译期可检查的名称访问属性。",
      "阅读时可按角色分组：骨架拓扑相关如 `joints`、`jointNames`、`bindTransforms`、`restTransforms`；动画数据相关如 `rotations`、`scales`、`translations`；blend shape 相关如 `BlendShape`、`blendShapes`、`blendShapeWeights`、`skelBlendShapeTargets`。",
      "`classicLinear` 和 `dualQuaternion` 是 skinning method 的 allowed token 值；`primvarsSkelJointIndices`、`primvarsSkelJointWeights`、`primvarsSkelGeomBindTransform` 等 token 对应几何绑定 primvars。",
      "相关跳转包括 `UsdSkelSkeleton`、`UsdSkelBlendShape`、`UsdSkelAnimation`、`UsdSkelBindingAPI`、`UsdSkelRoot` 和 `UsdSkelInbetweenShape`；token 字面量必须保留英文原样。"
    ],
    terms: [
      ["UsdSkelTokens", "UsdSkel token 集合"],
      ["bindTransforms", "绑定变换 token"],
      ["restTransforms", "静止姿态变换 token"],
      ["dualQuaternion", "双四元数蒙皮 token"],
      ["primvarsSkelJointWeights", "骨骼权重 primvar token"]
    ]
  },
  {
    output: "full_site/api/tf_page_front.html",
    title: "Tf: Tools Foundations",
    notes: [
      "`Tf: Tools Foundations` 是 OpenUSD C/C++ 基础工具层入口，覆盖内存管理、运行时类型、路径、诊断、调试输出、字符串、容器、对象创建、数学、性能、文件和系统扩展等通用能力。",
      "Memory Management 相关入口包括 `TfRefPtr`、`TfWeakPtr`、`TfRefBase`、`TfWeakBase`、`TfMallocTag`；这些类型支撑 USD 大量对象生命周期和内存标记逻辑。",
      "Runtime Typing 相关入口包括 `TfType`、`TfEnum`、`TfTypeInfoMap`；它们和 Plug 插件系统、schema 类型注册、运行时类型查询密切相关。",
      "Diagnostic Utilities 包含 `TF_AXIOM()`、`TF_VERIFY()`、`TF_FATAL_ERROR()`、`PXR_TF_THROW()`、`TF_CODING_ERROR()`、`TF_RUNTIME_ERROR()`、`TF_WARN()`、`TF_STATUS()`；这些宏名和错误语义应保持英文原样。",
      "阅读路径建议先从功能分组看需要的工具，再跳到 `The TfNotice Notification System`、`The TfError Error Posting System`、`Guide To Diagnostic Facilities`、`The TfRegistryManager Registry Initialization System` 和 `The TfMallocTag Memory Tagging System` 等专题页。"
    ],
    terms: [
      ["Tf", "Tools Foundations"],
      ["Runtime Typing", "运行时类型系统"],
      ["Diagnostic Utilities", "诊断工具"],
      ["TfNotice", "通知系统"],
      ["TfMallocTag", "内存标记系统"]
    ]
  },
  {
    output: "full_site/api/trace_page_front.html",
    title: "Trace: Performance tracking",
    notes: [
      "`Trace: Performance tracking` 是 OpenUSD 的性能跟踪模块入口，用于 counting、timing、measuring 和 recording events。",
      "`TraceCollector` 负责记录 `TraceEvent` 对象，`TraceReporter` 负责基于 `TraceCollector` 收集到的事件生成 reports；这三者是本页最核心的类链接。",
      "Instrumentation 通过在代码里添加 `TRACE` macros 完成，示例需要包含 `pxr/base/trace/trace.h`；Python tracing 也被支持。",
      "Recording and Reporting 与 Performance Overhead 小节用于判断何时开启 tracing、如何收集报告、以及 instrumentation 对性能的影响边界。",
      "阅读时先看 Overview 和 Instrumentation，再跳到 `Trace Details`；如果只想定位 API，优先查 `TraceCollector`、`TraceEvent`、`TraceReporter` 和 `trace_8h.html`。"
    ],
    terms: [
      ["Trace", "性能跟踪"],
      ["TraceCollector", "跟踪事件收集器"],
      ["TraceEvent", "跟踪事件"],
      ["TraceReporter", "跟踪报告器"],
      ["instrumentation", "埋点/插桩"]
    ]
  },
  {
    output: "full_site/api/usd_2usd_2object_8h.html",
    title: "object.h File",
    notes: [
      "`object.h File` 是 USD scenegraph object 基础类型的 header 参考页，核心类是 `UsdObject`。",
      "`UsdObject` 是 `UsdPrim`、`UsdProperty`、`UsdAttribute`、`UsdRelationship` 等 scenegraph object 的公共基类，提供共同 API 和对象类型查询基础。",
      "`UsdObjType` 枚举包含 `UsdTypeObject`、`UsdTypePrim`、`UsdTypeProperty`、`UsdTypeAttribute`、`UsdTypeRelationship`、`Usd_NumObjTypes`，用于表示 USD object 的类型层级。",
      "`UsdIsSubtype()` 判断 `subType` 是否等于或派生自 `baseType`，`UsdIsConvertible()` 判断对象类型是否可转换，`UsdIsConcrete()` 判断是否为具体对象类型，即 Prim、Attribute 或 Relationship。",
      "本页 include 链接很多，涉及 `UsdStage`、`prim_data_8h.html`、`SdfPath`、`TfToken`、schema registry、value type 和 stage load rules；阅读时先抓 object type 语义，再按需要看源码。"
    ],
    terms: [
      ["UsdObject", "USD 对象基类"],
      ["UsdObjType", "USD 对象类型枚举"],
      ["UsdIsSubtype", "类型子类判断"],
      ["UsdIsConvertible", "类型可转换判断"],
      ["UsdIsConcrete", "具体对象类型判断"]
    ]
  },
  {
    output: "full_site/api/usd_app_utils_page_front.html",
    title: "UsdAppUtils: USD Application Utilities",
    notes: [
      "`UsdAppUtils: USD Application Utilities` 提供面向 USD 应用程序的通用工具，尤其是查看或录制 USD stage 图像的应用。",
      "该模块提供一组可复用 command-line argument helpers，用于让不同工具的参数保持一致：`cameraArgs` 指定 camera，`colorArgs` 控制 Hydra 生成图像时的 color correction，`complexityArgs` 控制渲染复杂度。",
      "该页还涉及面向 USD stage 图像输出的应用常见功能，例如帧范围、输出文件命名、摄像机选择、颜色处理、Hydra 渲染参数和截图/序列化输出流程。",
      "`Frame Format Strings` 小节说明随时间变化的帧格式字符串：字符串里包含 frame placeholder，运行时会替换为实际帧号，生成完整格式化帧字符串。",
      "阅读时把 `UsdAppUtils` 视为应用层 helper 模块，而不是 scenegraph 核心 API；它的价值在于统一 USD 工具、预览器、截图器或录制器的参数和输出格式行为。"
    ],
    terms: [
      ["UsdAppUtils", "USD 应用工具"],
      ["cameraArgs", "摄像机参数 helper"],
      ["colorArgs", "颜色校正参数 helper"],
      ["complexityArgs", "复杂度参数 helper"],
      ["Frame Format Strings", "帧格式字符串"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的页面定位、阅读路径、概念边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first page positioning, reading paths, concept boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
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
