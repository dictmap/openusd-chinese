import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-152";

const refinements = [
  {
    output: "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
    title: "Vdf: Vectorized Data Flow",
    summary:
      "`md_pxr_exec_vdf__r_e_a_d_m_e.html` 是 Vdf README 式入口页，不是单个 class 的 API 参考。阅读时应把它当作 OpenExec 底层 dataflow graph 的背景页：先理解 `VdfNetwork`、`VdfNode`、`VdfConnection` 和 value flow，再进入具体 class 页面查看方法、端口和 schedule 细节。",
    notes: [
      "`Vdf` 的核心职责是描述和调度 vectorized computation dependencies；它不直接表达 USD composition、layer stack 或 scene graph opinion strength。",
      "当页面提到 node outputs 到 node inputs 的连接时，中文读法应关注数据依赖方向，而不是把它理解成文件引用、payload 或 namespace 路径关系。",
      "`Ef`、`Exec`、`ExecUsd` 等上层执行系统会依赖 Vdf 概念；因此本页适合放在 OpenExec 阅读链的前段，用来解释为什么后续会出现 executor、buffer、mask 和 schedule 等术语。",
      "如果要确认线程安全、缓存生命周期或 evaluation request 的精确规则，不能只靠 README 摘要，应继续跳到 `VdfExecutor*`、`VdfContext`、`VdfNode` 和 `VdfNetwork` 等 class 页。",
      "本地复刻保留官方英文摘录和拼写；中文补强只说明概念边界，不更改 `Vdf`、`VdfNetwork`、`VdfNode`、`VdfConnection` 等原始 API 名称。",
    ],
    terms: [
      ["向量化数据流图", "vectorized dataflow graph"],
      ["计算依赖", "computation dependency"],
      ["节点输出", "node output"],
      ["节点输入", "node input"],
      ["执行调度", "execution scheduling"],
      ["上层执行系统", "higher-level execution system"],
    ],
  },
  {
    output: "full_site/api/functions_type.html",
    title: "Class Members - Typedefs",
    summary:
      "`functions_type.html` 是 class members 的 typedef 字母索引页，用于快速定位类型别名，而不是解释这些类型的完整行为。它把执行器、容器、range、iterator、schema 和 path table 等不同来源的 typedef 混排在一起，读者应先根据目标符号前缀判断所属模块。",
    notes: [
      "`VdfPullBasedExecutorEngine`、`VdfParallelExecutorEngine` 和 `VdfExecutorDataManager` 等条目指向 Vdf execution internals；这些 typedef 通常服务于 executor implementation，而不是普通 USD scene authoring API。",
      "`SdfPathTable< MappedType >`、`SdfListOp< T >`、`SdfBatchNamespaceEdit` 等条目属于 scene description 和 namespace/list editing 语境，应与 `UsdPrimRange`、`UsdPrimSubtreeRange` 这类遍历范围区分。",
      "`TfDenseHashMap`、`TfDenseHashSet`、`TfCompressedBits`、`VtArray< ELEM >` 和 `VtArrayEdit< ELEM >` 是基础容器或值类型设施；关注点通常是存储、比较、hash、bitset 或 array edit 语义。",
      "typedef 索引页只显示别名入口和链接，不保证展示 template 参数约束、ownership、iterator invalidation 或线程安全；这些信息需要进入目标 class 或 header 说明。",
      "中文层保留 `MappedType`、`DataManagerType`、`DerivedClass`、`ELEM` 等 template 参数原样，避免破坏搜索和与 C++ 声明的对应关系。",
    ],
    terms: [
      ["类型别名索引", "typedef index"],
      ["模板参数", "template parameter"],
      ["执行器内部结构", "executor internals"],
      ["路径表", "path table"],
      ["列表编辑", "list editing"],
      ["迭代器失效", "iterator invalidation"],
    ],
  },
  {
    output: "full_site/api/modules.html",
    title: "Modules",
    summary:
      "`modules.html` 是 Doxygen module/group 总导航页，用于从功能分组进入 OpenUSD API。它不同于 namespace 列表、class 列表或 file list；同一模块下可能混合函数、宏、类、枚举和文档页面，因此适合先做体系定位，再进入具体符号页。",
    notes: [
      "`Arch` 相关组通常覆盖平台、系统、内存、线程、symbol visibility 和 diagnostic 基础设施；这些组更多服务于底层库可移植性和运行时支持。",
      "`Gf` 相关组覆盖 Linear Algebra、Basic Geometry、Color、Gamma Mapping 和 debugging output；它们是数学与几何基础，不等同于 `UsdGeom` schema。",
      "`Tf` 相关组覆盖 notification、error posting、diagnostics、initialization、malloc tag、runtime typing 和 STL utilities；这些是通用基础设施层。",
      "module/group 名称是阅读路线，不是 C++ 命名空间边界；遇到同名或相近概念时，应继续进入目标页面查看实际 namespace、header 和 declaration。",
      "本地链接策略仍然适用：406 清单内的 group 或 module 页面跳本地复刻，清单外内部页跳 `site/uncovered_openusd_page.html`，只有明确 official entry 保留外链。",
    ],
    terms: [
      ["模块总导航", "module navigation"],
      ["Doxygen 功能组", "Doxygen group"],
      ["命名空间边界", "namespace boundary"],
      ["底层基础设施", "low-level infrastructure"],
      ["数学与几何基础", "math and geometry foundations"],
      ["本地复刻链接", "local reproduction link"],
    ],
  },
  {
    output: "full_site/api/globals_eval.html",
    title: "File Members - Enumerator Values",
    summary:
      "`globals_eval.html` 是 File Members 的 enumerator value 索引页，关注枚举里的具体取值，而不是 enum 类型声明本身。它适合反查 `UsdInterpolationTypeHeld`、`UsdLoadWithDescendants`、`UsdResolveInfoSourceFallback` 这类值来自哪个 header 或语义域。",
    notes: [
      "`UsdInterpolationTypeHeld` 与 `UsdInterpolationTypeLinear` 属于时间采样插值语义；它们描述 sampled value 如何在时间之间被解释，而不是动画曲线编辑工具。",
      "`UsdListPositionBackOfAppendList`、`UsdListPositionFrontOfPrependList` 等值属于 list editing position policy，用来说明条目插入 prepend/append list 的相对位置。",
      "`UsdLoadWithDescendants` 与 `UsdLoadWithoutDescendants` 属于 payload/load 控制语境，用来判断 load 操作是否递归影响 descendant prim。",
      "`UsdResolveInfoSourceDefault`、`Fallback`、`Spline`、`TimeSamples` 和 `Value` 等值是属性值解析来源诊断线索，适合排查最终取值来自 authored value、fallback 还是 time samples。",
      "枚举值索引页按文件成员聚合，不能替代 enum 定义页；如果需要判断默认值、组合规则或 API 参数类型，应继续打开对应 header、enum 或函数页面。",
    ],
    terms: [
      ["枚举值索引", "enumerator value index"],
      ["时间采样插值", "time-sample interpolation"],
      ["列表编辑位置", "list-editing position"],
      ["按需加载策略", "load policy"],
      ["属性解析来源", "resolve info source"],
      ["枚举类型声明", "enum declaration"],
    ],
  },
  {
    output: "full_site/api/functions_func_y.html",
    title: "Class Members - Functions - Y",
    summary:
      "`functions_func_y.html` 是 class member functions 的 Y 段索引，当前主要用于定位 `GfVec2*`、`GfVec3*`、`GfVec4*` 的 y 分量访问，以及少量 Vdf executor buffer 相关条目。它是极短索引页，价值在于快速跳转，而不是替代 Gf 向量或 Vdf buffer 的完整说明。",
    notes: [
      "`GfVec2d`、`GfVec2f`、`GfVec2h`、`GfVec2i` 到 `GfVec4*` 的 y 相关函数通常表示第二坐标分量；维度和数值后缀仍需保留英文原样。",
      "Y 段与上一轮处理的 X/Z 段应合并阅读：`x()`、`y()`、`z()` 的存在取决于向量维度，二维向量没有 z，三维/四维向量才会进入 Z 段。",
      "`VdfExecutorBufferData` 出现在同页是字母索引混排结果；它属于 execution buffer 语境，不应和 `GfVec*` 的几何坐标分量混为一类。",
      "若要确认 `y()` 返回值是值、引用还是 const 访问器，应进入具体 `GfVec*` class 页查看 C++ declaration 和 overload。",
      "本页中文补强强调索引边界：保留 `GfVec*`、`VdfExecutorBufferData`、函数名和链接原样，只提供读者该跳往哪个具体 API 页的判断依据。",
    ],
    terms: [
      ["Y 段函数索引", "Y function index"],
      ["第二坐标分量", "second coordinate component"],
      ["向量维度", "vector dimension"],
      ["数值后缀", "numeric suffix"],
      ["执行缓冲数据", "executor buffer data"],
      ["const 访问器", "const accessor"],
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
