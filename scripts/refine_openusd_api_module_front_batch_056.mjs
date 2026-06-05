import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-module-front-quality-pass-056";

const refinements = [
  {
    output: "full_site/api/pcp_page_front.html",
    title: "Pcp: PrimCache Population (Composition)",
    notes: [
      "`Pcp: PrimCache Population (Composition)` 是 USD composition 语义的底层服务入口，负责实现通常被称为 Layering & Referencing 的 scenegraph composition 行为。",
      "本页强调 Pcp 为 `Usd`、`Csd`、`Mf` 等更高层 scenegraph 库提供低层 composition 结果；多数客户端通常通过 `Usd` 使用这些结果，而不是直接调用 Pcp。",
      "页面结构按 Introduction、Motivation、Capabilities、Usage 展开；Usage 下的 `The PcpCache`、`Computation Queries`、`Errors`、`Dependencies`、`Namespace Editing`、`Change Processing`、`Path Translation` 和 `Diagnostics` 是阅读主线。",
      "`PcpCache` 是本模块的核心缓存入口，`PcpPrimIndex` 表示 composition 后的 prim index，`PcpChanges` 和 `PcpLifeboat` 说明变更处理与对象生命周期，`TfError` / `PcpErrorBase` 用于诊断 composition 问题。",
      "阅读时要把 Pcp 看作 composition engine：它解释 layer、reference、payload、variant、inherits、specializes 等 scene description 关系，并把结果交给更高层 USD scenegraph 对象使用。"
    ],
    terms: [
      ["Pcp", "PrimCache Population"],
      ["composition", "组合"],
      ["Layering & Referencing", "分层与引用"],
      ["PcpCache", "Pcp 组合缓存"],
      ["PcpPrimIndex", "Pcp prim 索引"]
    ]
  },
  {
    output: "full_site/api/plug_page_front.html",
    title: "Plug: Plugin Framework",
    notes: [
      "`Plug: Plugin Framework` 是 OpenUSD 的插件发现、注册、元数据读取和加载框架入口，服务于运行时按需扩展模块。",
      "`PlugPlugin` 定义 plug-in modules 的接口，`PlugRegistry` 负责自动或手动发现与注册插件；客户端也可以在运行时调用 `PlugRegistry::RegisterPlugins`。",
      "当新插件注册后，`PlugRegistry` 会发送 `PlugNotice::DidRegisterPlugins` notice；这既发生在 Plug 首次使用时，也可发生在后续手动注册插件时。",
      "本页的 Metadata 部分说明 Plug 可以查找插件中定义的 `TfType`、反查提供这些类型的插件、读取插件及其类型相关 metadata，并在需要时加载插件。",
      "阅读时应把 Plug 与 `TfType` 类型系统联系起来：Plug 负责找到插件和插件元数据，`TfType` 负责让插件提供的类型进入 USD 的运行时类型查询体系。"
    ],
    terms: [
      ["Plug", "插件框架"],
      ["PlugPlugin", "插件模块接口"],
      ["PlugRegistry", "插件注册表"],
      ["PlugNotice::DidRegisterPlugins", "插件注册通知"],
      ["TfType", "运行时类型信息"]
    ]
  },
  {
    output: "full_site/api/sdf_page_front.html",
    title: "Sdf: Scene Description Foundations",
    notes: [
      "`Sdf: Scene Description Foundations` 是 USD scene description 的基础层，负责 layer、path、prim spec、property spec、文件格式和基础值类型等低层抽象。",
      "官方摘录说明 Sdf 提供把 scene description 序列化到参考文本格式或插件定义格式的基础设施，并提供 `SdfPath`、`SdfLayer`、`SdfPrimSpec` 等用于交互的 primitive abstractions。",
      "Overview、Layering and Referencing、Layers and Opinions、Prim Spec、Plugin Metadata、File Format Plugins、Variable Expressions 是本页的主要结构；其中 `SdfLayer` 是文件/层级单位，`SdfPrimSpec` 是 layer 内的 prim 描述单位。",
      "Sdf 与 Usd 的边界要分清：`SdfLayer` / `SdfPrimSpec` 操作 authored scene description，`UsdStage` / `UsdPrim` 则在更高层提供 composition 后的 scenegraph 视图。",
      "本页链接较多，包含 `SdfPropertySpec`、`SdfAttributeSpec`、`SdfRelationshipSpec`、`SdfAssetPath`、`SdfTimeCode`、`TfToken` 和大量 `Gf` 数学类型；阅读时先抓住 layer/spec/path，再查具体值类型。"
    ],
    terms: [
      ["Sdf", "Scene Description Foundations"],
      ["SdfLayer", "场景描述层"],
      ["SdfPrimSpec", "prim 规格"],
      ["opinion", "意见/ authored 意见"],
      ["file format plugin", "文件格式插件"]
    ]
  },
  {
    output: "full_site/api/sdr_glslfx_page_front.html",
    title: "SdrGlslfx: Glslfx parser for Sdr",
    notes: [
      "`SdrGlslfx: Glslfx parser for Sdr` 是一个很窄的模块入口，官方摘录只说明该库承载面向 `Sdr` 的 `glslfx` parser。",
      "阅读本页时不要把它当作完整 Shader Definition Registry 文档；它更像是 `Sdr` 生态中的格式解析支撑层，用来把 glslfx 描述解析成 `Sdr` 可消费的信息。",
      "因为当前页面没有同站 API 文档链接，本地复刻中只保留模块定位、官方原文摘录和官方原页入口；后续若扩展范围，应优先对照 `sdr_page_front.html` 与 `SdrRegistry` 相关页面。",
      "`glslfx` 通常可理解为描述 GLSL shader 片段、参数和元数据的文件/格式入口；`SdrGlslfx` 的价值在于让这些定义接入统一的 shader discovery 与 shader property 查询流程。",
      "阅读路径建议：先看 `Sdr: Shader Definition Registry` 的 Background 与 Usage，再回到本页理解 `glslfx parser` 在 Sdr 插件链中的位置。"
    ],
    terms: [
      ["SdrGlslfx", "Sdr 的 glslfx 解析模块"],
      ["glslfx parser", "glslfx 解析器"],
      ["Sdr", "Shader Definition Registry"],
      ["shader definition", "着色器定义"],
      ["parser", "解析器"]
    ]
  },
  {
    output: "full_site/api/sdr_page_front.html",
    title: "Sdr: Shader Definition Registry",
    notes: [
      "`Sdr: Shader Definition Registry` 提供可扩展框架，用于发现、延迟解析并查询 shader 信息；它把不同 shading system 的差异隐藏在统一 registry 接口后。",
      "Background 说明 shader 是接收 input 并产生 output 的程序，可由不同语言和运行时实现；复杂 pipeline 不希望直接耦合每个 shading system 的内部表示。",
      "Sdr 的核心思想是 pipeline 只需保留 `identifier` 和 `shadingSystem` 两项数据，就能通过 registry 找到 shader node、属性、输入输出、元数据和解析结果。",
      "`SdrRegistry` 是发现与查询入口，`SdrShaderNode` 表示具体 shader definition，`SdrShaderProperty` 表示 shader 的输入、输出或属性描述；这三者是本页后续跳转的主线。",
      "阅读时应把 Sdr 与 UsdShade / MaterialX / renderer-specific shader discovery 分开理解：Sdr 管 shader definition registry，UsdShade 管 USD 场景里的材质网络表达。"
    ],
    terms: [
      ["Sdr", "Shader Definition Registry"],
      ["SdrRegistry", "着色器定义注册表"],
      ["SdrShaderNode", "着色器节点定义"],
      ["SdrShaderProperty", "着色器属性定义"],
      ["shadingSystem", "着色系统"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块定位、阅读路径、概念边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、变量名、类型名、头文件名、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module positioning, reading paths, concept boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, variable names, type names, header names, links, and source excerpts for comparison with the official Doxygen page.</p>
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
