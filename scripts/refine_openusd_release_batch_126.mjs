import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-126";

const refinements = [
  {
    output: "full_site/api/namespacemembers.html",
    title: "Namespace Members",
    summary:
      "`Namespace Members` 是 Doxygen namespace 成员总索引页，适合在只知道 free function、operator、typedef 或 helper 名称时反查所属 namespace。它不是某个模块的教程页，而是把 `ShaderMetadataHelpers`、`VdfTestUtils`、`pxr_tsl`、`pxr_CLI` 和 `std` 等不同 namespace 的成员放在同一个交叉引用入口中。",
    notes: [
      "阅读本页时先判断条目类型：带 `()` 的通常是函数或 operator，`operator<<()` 是运算符重载，`robin_pg_map` / `robin_pg_set` 这类条目是 typedef 或 using alias。",
      "`ShaderMetadataHelpers` 条目通常服务 shader metadata 解析和发现流程，应和 `Sdr`、`Ndr`、shader node discovery 文档一起看，而不是单独解释成普通字符串工具。",
      "`VdfTestUtils::CreateSpeculationExecutor()` 属于 Vdf 测试和执行图工具链；它出现在 namespace 总索引中，是因为成员按 namespace 归类，而不是因为它和 shader metadata 同域。",
      "`pxr_tsl` 中的 robin hash map/set 类型反映底层容器选择；中文导读只说明用途和阅读路径，类型名、namespace 名和 template 参数必须保留英文原样。",
      "本页和 `namespacemembers_func.html`、`namespacemembers_type.html` 的关系是总览与过滤页关系：若只查函数可进入 function 过滤页，若只查 typedef 可进入 type 过滤页。",
    ],
    terms: [
      ["Namespace Members", "命名空间成员总索引"],
      ["free function", "非成员函数"],
      ["operator overload", "运算符重载"],
      ["typedef", "类型别名"],
      ["ShaderMetadataHelpers", "shader metadata helper 命名空间"],
      ["VdfTestUtils", "Vdf 测试工具命名空间"],
    ],
  },
  {
    output: "full_site/api/globals_s.html",
    title: "File Members - S",
    summary:
      "`globals_s.html` 是 File Members 的 `s` 字母段索引，主要聚合 `SDF_*` 宏、`Sdf*` free functions、Sdf 类型和若干 scene description helper。它的价值是定位头文件和符号入口，而不是替代 `SdfLayer`、`SdfPath`、`SdfPrimSpec` 等具体 API 页面。",
    notes: [
      "`SDF_DEFINE_ABSTRACT_FILE_FORMAT`、`SDF_DEFINE_FILE_FORMAT`、`SDF_FILE_FORMAT_FACTORY_ACCESS` 等宏应按 file format plugin 注册和工厂访问机制理解，宏名必须保持英文原样。",
      "`SdfAnchorAssetPaths()` 与 `SdfComputeAssetPathRelativeToLayer()` 关注 asset path 和 layer 的相对定位；阅读时应同时检查参数中的 layer、anchor path 和 authored path。",
      "`SdfComposeTimeSampleMaps()` 指向 time samples 的组合逻辑，适合和 layer stack、value resolution 语境一起阅读，而不是把它看成普通 map merge 工具。",
      "`SdfCreatePrimInLayer()`、`SdfCreatePrimAttributeInLayer()`、`SdfCreateRelationshipInLayer()` 和 `SdfCreateVariantInLayer()` 是 layer authoring helper，最终结果仍要落到 Sdf spec 对象。",
      "本页条目跨越宏、函数和类型；中文说明只帮助分类和导航，具体签名、默认参数、错误语义仍应跳转到对应头文件或目标 API 页面核对。",
    ],
    terms: [
      ["File Members - S", "File Members 的 S 字母段"],
      ["SDF_* macro", "Sdf 宏"],
      ["file format plugin", "文件格式插件"],
      ["asset path", "资产路径"],
      ["time samples", "时间采样"],
      ["authoring helper", "写入辅助函数"],
    ],
  },
  {
    output: "full_site/api/globals_func.html",
    title: "File Members - Functions",
    summary:
      "`globals_func.html` 是文件级函数总索引，按字母段汇总 OpenUSD 的 free functions、C API 风格 helper 和跨模块工具函数。页面开头常见 `Arch*` 和 `Ar*` 条目，分别指向平台基础设施与 asset resolution；它们不是 class member method，也不属于单一模块教程。",
    notes: [
      "`ArchAbort()`、`ArchDebuggerAttach()`、`ArchDebuggerTrap()` 和 `ArchDebuggerWait()` 属于 `debugger.h` / platform utility 范畴，适合排查调试器、崩溃和 trap 行为。",
      "`ArchAbsPath()`、`ArchCloseAllFiles()`、`ArchCommitVirtualMemoryRange()`、`ArchAlignedAlloc()` 等条目跨文件系统、daemon、virtual memory 和内存对齐工具，不能按 USD schema API 解读。",
      "`ArchBitPatternToDouble()`、`ArchBitPatternToFloat()`、`ArchCountTrailingZeros()` 等函数属于低层位模式和数学工具；需要签名时应跳转到对应头文件页面。",
      "`Ar*` 函数和 resolver context 相关条目应按 asset resolution 入口阅读，和 `ArResolver`、`ArResolverContext`、package utilities 以及 Python resolver context 对照。",
      "作为总索引页，本页的正确用法是从函数名定位到具体头文件或模块页；中文导读不改写函数名，也不把底层 utility 误标为用户指南内容。",
    ],
    terms: [
      ["File Members - Functions", "文件级函数总索引"],
      ["free functions", "文件级非成员函数"],
      ["Arch utilities", "Arch 平台工具"],
      ["debugger utilities", "调试器工具"],
      ["virtual memory", "虚拟内存"],
      ["resolver context", "解析器上下文"],
    ],
  },
  {
    output: "full_site/api/functions_vars_w.html",
    title: "Class Members - Variables - W",
    summary:
      "`functions_vars_w.html` 是 class member variables 的 `w` 字母段索引。当前条目横跨 Pcp namespace edit、UsdShade/UsdGeom/UsdHydra token 表、UsdSkel imaging 权重和 Vdf 权重槽；这些条目同页出现只是因为变量名落在 W 段，不代表它们属于同一个运行时系统。",
    notes: [
      "`PcpDependentNamespaceEdits` 相关变量应按 composition dependency 和 namespace edit 语境阅读，通常用于理解重命名、移动或删除 prim/property 时的依赖影响。",
      "`UsdShadeTokensType`、`UsdGeomTokensType`、`UsdHydraTokensType` 是各 schema/domain 的 token 常量集合；token 字面量和成员变量名必须保留英文。",
      "`UsdSkelImagingWeightAndSubShapeIndex` 和 `UsdSkelTokensType` 指向 skeleton imaging、blend weight、sub-shape index 和骨架 schema token 的读法。",
      "`Vdf_WeightSlot` 属于 Vdf execution / dataflow 语义，和 USD schema token 表不同；阅读时应跳转到 Vdf 相关类页核对其计算图角色。",
      "本页适合用作“变量名以 w 开头”的反向查找入口；若要理解数据所有权、生命周期或类型定义，需要进入目标 class documentation。",
    ],
    terms: [
      ["Class Members - Variables - W", "类成员变量 W 段"],
      ["namespace edit dependency", "命名空间编辑依赖"],
      ["TokensType", "token 常量类型表"],
      ["skeleton imaging", "骨骼成像"],
      ["weight slot", "权重槽"],
      ["class documentation", "类文档页"],
    ],
  },
  {
    output: "full_site/api/functions_func_n.html",
    title: "Class Members - Functions - N",
    summary:
      "`functions_func_n.html` 是 class member functions 的 `n` 字母段索引，当前摘录集中出现 CLI app / validator、UsdGeomPrimvar、Hydra scene index、Hdsi 节点、PcpError 诊断和若干 render support 类型。它的重点是按函数或构造入口导航，而不是解释完整的 Hydra 或 Pcp 流程。",
    notes: [
      "`HdCachingSceneIndex`、`HdFlatteningSceneIndex`、`HdPrefixingSceneIndex`、`HdRenderIndex`、`HdRetainedSceneIndex` 等条目应按 Hydra scene index pipeline 的节点和索引对象阅读。",
      "`Hdsi*` 条目通常属于 Hydra scene index utility 或 filtering scene index；它们和 Pcp composition error 同页出现，是 Doxygen 字母索引的结果。",
      "`PcpErrorArcCycle`、`PcpErrorInvalidAssetPath`、`PcpErrorInvalidReferenceOffset`、`PcpErrorInvalidSublayerPath` 等条目是 composition 诊断入口，应进入具体 error class 查看触发条件。",
      "`UsdGeomPrimvar` 相关 N 段函数常与 primvar 名称、插值或命名约定有关；中文说明保留 `primvars:`、interpolation 和 elementSize 等英文 token。",
      "本页可作为定位 `N` 段函数/构造函数的导航页；若要判断 API 行为、参数约束或异常情况，应继续进入具体 class/member 页面。",
    ],
    terms: [
      ["Class Members - Functions - N", "类成员函数 N 段"],
      ["scene index pipeline", "场景索引管线"],
      ["Hdsi", "Hydra scene index 工具前缀"],
      ["PcpError", "Pcp 组合错误"],
      ["primvar", "primvar 原始变量"],
      ["constructor entry", "构造函数条目"],
    ],
  },
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
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
  results,
}, null, 2));
