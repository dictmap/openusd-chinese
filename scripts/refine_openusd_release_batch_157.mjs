import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-157";

const refinements = [
  {
    output: "full_site/api/sdf_page_front.html",
    title: "Sdf: Scene Description Foundations",
    summary:
      "`sdf_page_front.html` 是 `Sdf` 模块入口，面向 USD scene description 的低层表示：layer、path、prim spec、property spec、file format plugin、metadata、time sample 与基础值类型。它解释 authored scene description 的存储与编辑边界，而不是 composition 后的 stage 视图。",
    notes: [
      "`SdfLayer` 是文件/层级单位，承载 authored opinions；`SdfPrimSpec`、`SdfPropertySpec`、`SdfAttributeSpec`、`SdfRelationshipSpec` 是 layer 内具体 scene description spec。",
      "`SdfPath` 是定位 prim、property、variant selection 等对象的核心路径类型；阅读 Sdf 页面时应优先把 path、layer、spec 三者关系理清。",
      "`Sdf` 和 `Usd` 的边界很重要：`SdfLayer` 与 spec 操作原始 authored data，`UsdStage` 与 `UsdPrim` 提供 composition 后的 scenegraph API。",
      "File Format Plugins 与 Variable Expressions 是本页的扩展阅读重点，分别对应自定义层文件格式和 layer/asset 中变量表达式的解析机制。",
      "本页同时链接 `TfToken`、`VtArray`、`VtDictionary` 与大量 `Gf` 数学类型，说明 Sdf 值系统依赖基础库，但不会替代这些库的完整 API 文档。",
    ],
    terms: [
      ["场景描述基础层", "scene description foundation layer"],
      ["已写入意见", "authored opinion"],
      ["prim 规格", "prim spec"],
      ["属性规格", "property spec"],
      ["路径对象", "path object"],
      ["文件格式插件", "file format plugin"],
    ],
  },
  {
    output: "full_site/api/pcp_page_front.html",
    title: "Pcp: PrimCache Population (Composition)",
    summary:
      "`pcp_page_front.html` 是 `Pcp` composition engine 的入口，负责把 layer、reference、payload、variant、inherits、specializes 等 scene description 关系计算成可供上层 `Usd` 使用的 composition 结果。多数用户通过 `UsdStage` 间接消费 Pcp 结果，而不是直接调用 Pcp。",
    notes: [
      "`PcpCache` 是组合缓存入口，用来保存和复用 prim/property composition 计算结果；它是理解本模块 Usage 小节的核心。",
      "`PcpPrimIndex` 表示某个 prim 的 composition 索引，记录组成该 prim 的 node、arc、layer stack 和强弱关系；它不是 scenegraph prim 对象本身。",
      "`PcpErrorBase` 与 `TfError` 共同用于 composition 诊断，帮助定位 unresolved prim path、invalid asset path、conflicting relocation 等问题。",
      "`PcpChanges`、`PcpLifeboat` 和 Change Processing 小节说明在 layer 或 namespace 变化时如何处理缓存、依赖和对象生命周期。",
      "`PcpTranslatePathFromNodeToRoot()` 这类 path translation API 体现 Pcp 的底层职责：在 composition graph 的 node 与 root namespace 之间转换路径。",
    ],
    terms: [
      ["组合引擎", "composition engine"],
      ["组合缓存", "composition cache"],
      ["prim 组合索引", "prim composition index"],
      ["组合弧", "composition arc"],
      ["命名空间编辑", "namespace editing"],
      ["路径转换", "path translation"],
    ],
  },
  {
    output: "full_site/api/sdr_page_front.html",
    title: "Sdr: Shader Definition Registry",
    summary:
      "`sdr_page_front.html` 是 `Sdr` 着色器定义注册表入口，用于发现、延迟解析并查询 shader definitions。它抽象不同 shading system 的实现差异，让 pipeline 可以通过 `identifier` 与 `shadingSystem` 找到 shader node、property 和 metadata。",
    notes: [
      "`SdrRegistry` 是发现与查询入口，负责根据 discovery plugin 和 parser plugin 找到 shader definitions，并按需解析。",
      "`SdrShaderNode` 表示一个 shader definition，通常包含 identifier、name、source type、family、metadata 和输入/输出集合。",
      "`SdrShaderProperty` 描述 shader input、output 或 property 的类型、默认值、元数据、连接能力等信息，是材质 UI 和 pipeline 查询的重要对象。",
      "`Sdr` 与 `UsdShade` 的职责不同：`Sdr` 管 shader definition registry，`UsdShade` 管 USD scene 中 material、shader prim 和连接网络的 authored 表达。",
      "MaterialX、renderer-specific discovery 或自定义 shading system 可通过 Sdr 的可扩展框架接入；本页不定义具体 renderer 的 shader 执行语义。",
    ],
    terms: [
      ["着色器定义注册表", "shader definition registry"],
      ["延迟解析", "lazy parsing"],
      ["发现插件", "discovery plugin"],
      ["解析插件", "parser plugin"],
      ["着色系统", "shading system"],
      ["着色器属性", "shader property"],
    ],
  },
  {
    output: "full_site/api/functions_func_q.html",
    title: "Class Members - Functions - Q",
    summary:
      "`functions_func_q.html` 是 Class Members 函数索引的 Q 段，目前条目很少，主要指向 `SdfAbstractData`、`SdfLayer` 和 `pxr_CLI::CLI::ConfigBase`。本页价值在于快速定位 query 类函数入口，并提醒读者按所属模块继续查签名和语义。",
    notes: [
      "`SdfAbstractData` 的 Q 段函数通常围绕抽象 scene description data 查询；应进入 class 页确认 query 函数读取的是 spec、field、time sample 还是 metadata。",
      "`SdfLayer` 的 Q 段函数更接近 layer 内容查询或状态查询；需要结合 layer identifier、real path、dirty state、subLayer 等概念阅读。",
      "`ConfigBase` 属于 `pxr_CLI::CLI` 命名空间，是命令行配置类型，不属于 Sdf 数据模型；同页出现只是字母索引混排结果。",
      "Q 段函数名称可能以 `Query` 或语义上具备 query 行为出现，但具体线程安全、错误返回和缓存行为不能从索引页推断。",
      "本页和 `functions_q.html`、`functions_vars_q.html` 需要区分：当前页是 member functions，其他页面可能是所有 class members 或 variables 的 Q 段入口。",
    ],
    terms: [
      ["Q 段函数索引", "Q-section function index"],
      ["查询函数", "query function"],
      ["抽象数据接口", "abstract data interface"],
      ["图层状态查询", "layer state query"],
      ["命令行配置基类", "CLI configuration base"],
      ["索引混排", "alphabetical index mixing"],
    ],
  },
  {
    output: "full_site/api/vt_page_front.html",
    title: "Vt: Value Types",
    summary:
      "`vt_page_front.html` 是 `Vt` value types 库入口，核心是 `VtValue` 与 `VtArray`。它工作在语言数据类型层，连接 C++ 强类型值、Python typed array、USD attribute value、metadata 和泛型 API，不是 scene schema 或 composition 模块。",
    notes: [
      "`VtValue` 是 type-erased container，可包装 `float`、`int`、`bool`、`GfVec3d` 等具体类型，并在运行时查询或取回实际值。",
      "`VtArray` 是 homogeneous container，适合存储同一元素类型的数组；USD array-valued attributes 和 Python typed array classes 经常依赖它。",
      "C++ 与 Python interface 在构造方式、类型名和数组表现上可能不同；阅读本页时要把 value concept 与语言绑定差异分开。",
      "`VtDictionary`、`VtArray` 与 `VtValue` 常与 `Sdf` metadata、USD attribute default value、time sample 和 generic API 一起出现。",
      "`Vt` 和 `Gf` 的关系是值容器与数学类型的关系：`GfVec3d` 等是具体值类型，`VtValue` / `VtArray` 可承载或组织这些值。",
    ],
    terms: [
      ["值类型库", "value types library"],
      ["类型擦除容器", "type-erased container"],
      ["同质数组", "homogeneous array"],
      ["强类型值", "strongly typed value"],
      ["泛型值 API", "generic value API"],
      ["语言绑定差异", "language binding difference"],
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
      <h2>中文二次索引补强 / Chinese Second-Pass Index Notes</h2>
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
