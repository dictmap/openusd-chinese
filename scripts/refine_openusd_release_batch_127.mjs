import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-127";

const refinements = [
  {
    output: "full_site/api/functions_func_t.html",
    title: "Class Members - Functions - T",
    summary:
      "`functions_func_t.html` 是 Class Members - Functions 的 `T` 字母段索引，适合从成员函数名反查 `Tf`、`Vdf`、`UsdUtils`、`UsdImaging`、`Hd` 等模块中的具体类成员。它不是连续教程页，而是把 `T` 开头的函数、构造函数或 helper 条目聚合成跳转入口。",
    notes: [
      "`VtValue`、`OptionBase<CRTP>`、`UsdUtilsCoalescingDiagnosticDelegate`、`VdfDatalessExecutor` 与 `VdfDataManagerBasedExecutor` 同页出现，是 Doxygen 字母索引结果；阅读时应先按模块前缀区分 value container、CLI option、diagnostic delegate 和 Vdf executor。",
      "`VdfExecutorDataManager<DerivedClass>`、`VdfParallelExecutorDataManager<DerivedClass>` 与 `VdfSpeculationExecutor<EngineType, DataManagerType>` 需要保留 template 参数原样；中文只说明执行网络和 data manager 边界，不改写类型签名。",
      "`TfDiagnosticBase`、`TfDiagnosticTransport`、`TfDiagnosticTrap`、`TfErrorMark`、`TfErrorTransport` 与 `TfBaseException` 指向 Tf 诊断基础设施；这些条目常用于追踪错误标记、错误传输和调试 trap 的生命周期。",
      "`UsdviewqHydraObserver`、`HdChangeTracker`、`UsdImagingGLEngine` 等条目把 usdview、Hydra change tracking 与 imaging engine 串到同一索引页；实际行为仍要回到各自 class/member 页面确认。",
      "本页适合做“我只记得函数或构造入口以 T 开头”的反查页；若要判断参数约束、线程安全、异常语义或渲染执行顺序，应继续进入目标成员页面。",
    ],
    terms: [
      ["Class Members - Functions - T", "类成员函数 T 段"],
      ["diagnostic delegate", "诊断委托"],
      ["executor data manager", "执行器数据管理器"],
      ["template parameter", "模板参数"],
      ["change tracker", "变更跟踪器"],
      ["member page", "成员详情页"],
    ],
  },
  {
    output: "full_site/api/deprecated.html",
    title: "Deprecated List",
    summary:
      "`deprecated.html` 汇总已弃用的类型、成员和函数，是迁移旧 OpenUSD 代码时的风险清单。它只告诉读者哪些 API 不应继续新增依赖；替代方案、兼容性范围和迁移细节仍要进入对应 API 条目核对。",
    notes: [
      "`ArAssetInfo::repoPath`、`ArResolver::_IsRepositoryPath()` 与 `ArResolver::IsRepositoryPath()` 属于旧 asset resolver 语境；迁移时要同时核对当前 `ArResolver`、resolved path 和 repository path 概念是否已被新版接口替代。",
      "`CustomUsdPhysicsTokens` 已提示改用 `UsdPhysicsCustomTokens`；中文说明必须保留两个 token struct 名称，避免把历史兼容别名误译成新 schema。",
      "`GfRange*::ExtendBy`、`GfVec*`、`GfRect2i::Intersect` 等几何数学条目代表不同类型族的弃用入口；不能仅按函数名批量替换，要确认维度、标量类型和返回值语义。",
      "`Hd*Schema::BuildRetained Builder` 一类条目来自 Hydra data source/schema 迁移语境；应结合具体 `Hd` schema 页面判断 retained builder 的替代构造路径。",
      "本页可作为升级 checklist，但不是自动迁移脚本；处理旧代码时应记录 OpenUSD 版本、替代 API、编译结果和运行期行为差异。",
    ],
    terms: [
      ["Deprecated List", "弃用 API 清单"],
      ["replacement API", "替代 API"],
      ["backward compatibility", "向后兼容"],
      ["asset resolver", "资产解析器"],
      ["retained builder", "保留式构建器"],
      ["migration checklist", "迁移检查清单"],
    ],
  },
  {
    output: "full_site/api/hd_embree_page_front.html",
    title: "HdEmbree",
    summary:
      "`HdEmbree` 是基于 Intel Embree 的 Hydra renderer plugin 页面，展示从 render delegate、render pass、mesh/instancer 到 Embree scene ownership 的最小渲染插件结构。阅读重点是 Hydra 插件链路和 Embree 资源生命周期，而不是把它当成通用生产渲染器手册。",
    notes: [
      "`HdEmbreeRendererPlugin`、`HdEmbreeRenderDelegate`、`HdEmbreeRenderPass` 与 `HdEmbreeRenderer` 分别落在插件发现、Hydra delegate、task 执行和 Embree 渲染实现层；中文导读只描述层次，不更改类名。",
      "`Sync`、`Commit Resources` 与 `Executing tasks` 对应 Hydra 数据同步、资源提交和 task 执行阶段；应和 `HdSceneDelegate`、`HdRenderIndex`、`HdxRenderTask`、`HdCamera`、`HdRenderBuffer` 一起读。",
      "`Embree Scene Ownership` 说明 Embree scene、geometry 和 renderer 内部对象的归属边界；如果调试生命周期问题，应关注创建、提交和销毁的时序，而不是只看 Doxygen 类列表。",
      "`Configuration` 与 `Unit Test` 体现该模块的示例性质：它既是 renderer plugin API 的 living documentation，也用于测试 Embree-based Hydra delegate 的基础路径。",
      "涉及 `rtc` 前缀或 raytracing core API 时，应保留 Embree 官方术语原样，并把它与 OpenUSD/Hydra 类型层清晰区分。",
    ],
    terms: [
      ["HdEmbree", "HdEmbree 模块"],
      ["renderer plugin", "渲染器插件"],
      ["render delegate", "渲染委托"],
      ["Embree scene ownership", "Embree 场景所有权"],
      ["raytracing kernels", "光线追踪内核"],
      ["Hydra task execution", "Hydra 任务执行"],
    ],
  },
  {
    output: "full_site/api/globals_vars.html",
    title: "File Members - Variables",
    summary:
      "`globals_vars.html` 是 File Members 的变量索引页，聚合全局变量、token 集、predicate 常量、sentinel 和底层工具常量。它的价值是按变量名快速跳转到声明文件或目标文档，而不是解释每个变量的完整运行期语义。",
    notes: [
      "`PCP_INVALID_INDEX`、`SdfMapperParametersMap` 与 `TfUtf8InvalidCodePoint` 来自不同基础层：composition 索引、Sdf mapper 参数映射和 UTF-8 工具层；同页出现不代表同一模块。",
      "`UsdGeomTokens`、`UsdHydraTokens`、`UsdLuxTokens`、`UsdMediaTokens`、`UsdMtlxTokens`、`UsdPhysicsTokens` 是 schema/domain token 集入口；变量名和 token 字面量必须保留英文原样。",
      "`usdPhysicsSentinelLimit` 应结合 physics parser 或 `parseDesc.h` 语境阅读；sentinel 表示边界或特殊值，不能简单翻成普通最大值。",
      "`UsdPrimAllPrimsPredicate`、`UsdPrimDefaultPredicate`、`UsdPrimHasClassSpecifier`、`UsdPrimIsActive` 等 predicate 常量与 prim flag/filtering 相关，适合用来理解遍历、过滤和 specifier 判定。",
      "本页和 `globals_type.html`、`globals_func.html`、字母分段页用途不同；中文层只帮助区分变量类别，具体声明、头文件和类型应通过链接进入目标页核对。",
    ],
    terms: [
      ["File Members - Variables", "文件成员变量索引"],
      ["token set", "token 集"],
      ["predicate constant", "谓词常量"],
      ["sentinel", "哨兵值"],
      ["prim flags", "prim 标志"],
      ["declaration file", "声明文件"],
    ],
  },
  {
    output: "full_site/api/classes.html",
    title: "Class Index",
    summary:
      "`classes.html` 是 Doxygen 生成的全局 Class Index，用于从类型名快速跳到具体 class、struct 或 nested type 文档。它跨越 `Ar`、`Arch`、`Hd`、`Sdf`、`Tf`、`Usd`、`Vdf`、`Vt` 等模块，阅读时应先按前缀和 namespace 识别领域。",
    notes: [
      "`ArAsset`、`ArAssetInfo`、`ArDefaultResolver`、`ArResolver`、`ArResolverContext` 与 `ArWritableAsset` 属于 asset resolution 体系；它们在类索引中相邻，是命名前缀排序结果。",
      "`ArchIntervalTimer`、`ArchMallocHook` 与其他 `Arch*` 类型偏平台、内存和计时工具层；不要把它们误读成 USD scene schema。",
      "`HdSceneIndexObserver::AddedPrimEntry`、`HdSt`、`HdRenderIndex` 相关类型属于 Hydra / imaging 路径；查渲染问题时可从这里跳转到具体类页面。",
      "`VdfMask::ArbitraryLessThan`、`WorkTaskGraph::BaseTask`、`TfType::Bases` 等嵌套类型在索引中会带作用域前缀；中文说明保留完整限定名，便于搜索和编译报错对照。",
      "Class Index 适合定位类型，不适合连续阅读；真正的构造函数、成员变量、继承关系和线程约束应在目标 class documentation 中确认。",
    ],
    terms: [
      ["Class Index", "类索引"],
      ["nested type", "嵌套类型"],
      ["namespace prefix", "命名空间前缀"],
      ["asset resolution", "资产解析"],
      ["Hydra imaging", "Hydra 成像"],
      ["class documentation", "类文档"],
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
