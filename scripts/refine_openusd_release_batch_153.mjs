import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-153";

const refinements = [
  {
    output: "full_site/api/js_page_front.html",
    title: "Js: JSON I/O",
    summary:
      "`js_page_front.html` 是 `Js` 模块入口，说明 OpenUSD C++ 基础库如何解析和写出 JSON。它不是 JavaScript runtime 文档，也不是 USD scene graph schema；本页的作用是把 `js/json.h`、解析函数、写出函数和 JSON value/container 抽象放到同一阅读路径里。",
    notes: [
      "`JsParseStream()` 与 `JsParseString()` 是输入侧入口，分别对应 stream 和 string；调试读取失败时应继续查看 `json.h`、错误返回约定和调用方如何处理 parse diagnostics。",
      "`JsWriteToStream()`、`JsWriteToString()` 和 `JsWriteValue()` 是输出侧入口，关注 serialization 结果、pretty printing 或 writer 语义时应跳到具体函数声明。",
      "`JsValue`、container conversion 和 recursive container structures 说明此模块更偏基础数据交换层，常服务于工具、metadata、配置或测试数据，而不直接 author USD prim。",
      "如果在 Python 里处理 JSON，应使用 Python 标准库 `json`；本模块的页面明确面向 C++，不要把它误认为跨语言 binding 入口。",
      "本地中文层保留 `Js`、`JsParseStream()`、`JsWriteToString()`、`json.h` 等名称原样，方便和 `globals_j.html` 的文件级函数索引互相跳转。",
    ],
    terms: [
      ["C++ JSON I/O", "C++ JSON I/O"],
      ["输入解析", "input parsing"],
      ["输出序列化", "output serialization"],
      ["递归容器结构", "recursive container structure"],
      ["数据交换层", "data interchange layer"],
      ["跨页函数索引", "cross-page function index"],
    ],
  },
  {
    output: "full_site/api/kind_page_front.html",
    title: "Kind: Extensible Categorization",
    summary:
      "`kind_page_front.html` 是 `Kind` 模块入口，解释 OpenUSD 如何用可扩展 taxonomy 给 scenegraph object 分类。它的重点不是几何形状、schema 类型或渲染类型，而是通过 `TfToken` 和 `KindRegistry` 管理 `kind` 层级，并支持客户端判断 model root 的语义类别。",
    notes: [
      "`kind` 是 `TfToken` 符号，但不是任意字符串标签；它通过 `KindRegistry` 形成可查询的层级，因此可用 `IsA()` 判断是否属于某个 base kind。",
      "`KindRegistry::GetBaseKind()` 适合查找直接或基础分类；阅读时应区分 registry relationship 和 prim inheritance、schema inheritance、composition arc。",
      "`model root` 是 Kind 使用的重要场景：asset 或场景层级可通过 kind 表示 component、group、assembly 等建模组织语义。",
      "`Extending the KindRegistry` 说明可通过插件或注册机制扩展分类体系；扩展 kind 前应考虑命名冲突、层级关系和下游工具兼容性。",
      "中文导读保留 `kind`、`KindRegistry`、`TfToken`、`PlugRegistry` 原样，避免把 taxonomy 翻译成会破坏搜索的本地化 API 名称。",
    ],
    terms: [
      ["可扩展分类体系", "extensible taxonomy"],
      ["语义类别", "semantic category"],
      ["基础 kind", "base kind"],
      ["模型根节点", "model root"],
      ["注册表查询", "registry query"],
      ["插件扩展", "plugin extension"],
    ],
  },
  {
    output: "full_site/api/usd_hydra_page_front.html",
    title: "UsdHydra: USD Hydra Schemas",
    summary:
      "`usd_hydra_page_front.html` 是 `UsdHydra` 模块入口，目前更像一个窄范围 schema/API 说明页。它主要围绕 `UsdHydraGenerativeProceduralAPI` 展开，并解释旧 Hydra shading network schema 已删除后的迁移边界。",
    notes: [
      "`UsdHydraGenerativeProceduralAPI` 是 applied API schema，用来扩展 `UsdProcGenerativeProcedural` prim，使其描述 `HdGpGenerativeProcedural` 插件相关信息。",
      "本页不应被当作完整 Hydra renderer 或 `Hd` framework 指南；需要渲染索引、render pass、scene delegate 或 data source 语义时，应跳到 `hd_page_front.html`、`hdx_page_front.html` 或相关 class 页。",
      "旧 shading network schema 被移除的提示很关键：shader authoring 的新路径应优先看 shader registry、`Sdr` 和 `UsdShade`，不要依赖过期 UsdHydra shading schema。",
      "页面提到保留 token 列表用于 transition，这些 token 是迁移辅助线索，不等同于推荐的新 schema authoring surface。",
      "中文层强调 schema/API 边界：保留 `UsdHydra`、`UsdProcGenerativeProcedural`、`HdGpGenerativeProcedural` 原名，避免把 procedural、schema 和 Hydra plugin 层混为一类。",
    ],
    terms: [
      ["USD Hydra schema", "USD Hydra schema"],
      ["生成式 procedural", "generative procedural"],
      ["applied API schema", "applied API schema"],
      ["过渡 token", "transition token"],
      ["已删除的 shading schema", "removed shading schema"],
      ["shader registry 迁移", "shader registry migration"],
    ],
  },
  {
    output: "full_site/api/globals_enum.html",
    title: "File Members - Enumeration Types",
    summary:
      "`globals_enum.html` 是 File Members 的 enum 类型索引页，用于查找枚举类型声明，而不是枚举值。它和 `globals_eval.html` 互补：本页定位 `UsdLoadPolicy`、`PcpArcType`、`SdfSpecifier` 等 enum 类型，具体取值则需要进入 enum 定义或 enumerator value 索引。",
    notes: [
      "`ArchMemoryProtection` 偏平台/虚拟内存语义，和 `Arch` 系统基础层相关；不要把它和 USD scene authoring 语义混在一起。",
      "`PcpArcType` 属于 composition graph 语义，用来描述 reference、payload、inherit、variant 等 arc 类别；它应结合 Pcp composition 文档阅读。",
      "`SdfAuthoringError`、`SdfPermission`、`SdfSpecifier`、`SdfSpecType`、`SdfVariability` 都属于 scene description 层，常与 layer、spec、namespace 和 authored data 相关。",
      "`TfDiagnosticType` 属于诊断设施，`SdrVersionFilter` 属于 shader registry，`UsdInterpolationType`、`UsdListPosition`、`UsdLoadPolicy`、`UsdResolveInfoSource` 属于 USD 值解析、list editing 和 loading 语义。",
      "enum 类型索引只说明“有哪些类型”，不说明所有枚举值、默认值或 API 参数上下文；需要继续跳到 header、enum definition 或函数签名核对。",
    ],
    terms: [
      ["枚举类型索引", "enum type index"],
      ["枚举值索引", "enumerator value index"],
      ["组合弧类型", "composition arc type"],
      ["场景描述层", "scene description layer"],
      ["诊断类型", "diagnostic type"],
      ["值解析来源", "value resolution source"],
    ],
  },
  {
    output: "full_site/api/globals_j.html",
    title: "File Members - j",
    summary:
      "`globals_j.html` 是 File Members 的 `j` 字母索引页，当前集中收录 `Js` JSON I/O 的文件级函数。它适合从函数名快速跳到 `converter.h`、`utils.h` 或 `json.h`，但模块背景仍应回到 `js_page_front.html` 阅读。",
    notes: [
      "`JsParseStream()` 和 `JsParseString()` 是解析入口；前者适合 stream source，后者适合已经在内存中的 JSON string。",
      "`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()` 是写出入口；它们的差异应从目标输出形式、返回值和 writer 行为判断。",
      "`JsFindValue()` 更像在 JSON-like container 中查找指定 value 的工具函数；实际 container 类型和缺失值处理要看 `utils.h`。",
      "`JsConvertToContainerType()` 涉及 conversion helper，不能只从索引页推断所有类型转换规则，应继续进入 `converter.h` 查看声明和约束。",
      "本页的 `j` 是字母分组，不是模块页；中文说明保留所有 `Js*` 函数名原样，帮助用户在 File Members 与 Js module 入口之间双向查找。",
    ],
    terms: [
      ["j 字母索引", "j alphabet index"],
      ["文件级函数", "file-level function"],
      ["stream source", "stream source"],
      ["JSON string", "JSON string"],
      ["conversion helper", "conversion helper"],
      ["双向查找", "two-way lookup"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次入口补强 / Chinese Second-Pass Entry Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
