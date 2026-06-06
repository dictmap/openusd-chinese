import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-154";

const refinements = [
  {
    output: "full_site/api/functions_~.html",
    title: "Class Members - Symbols and Destructor-like Entries",
    summary:
      "`functions_~.html` 是 Class Members 的符号段索引，收录以下划线、波浪号或实现细节前缀开头的成员。它不是连续阅读的 API 章节，而是用于从特殊符号、析构函数、嵌套类型或内部 helper 反向跳到所属 class。",
    notes: [
      "`_SdrFilesystemDiscoveryPlugin`、`_StripedBufferArray`、`_StripedInterleavedBuffer` 等下划线条目通常表示内部实现或私有辅助结构；阅读时应优先确认所属 class 和 header。",
      "`ArResolverScopedCache`、`ArResolverContextBinder`、`ArFilesystemAsset`、`ArInMemoryAsset` 等条目属于 asset resolution 语境，和 Hydra buffer 或 Vdf cache 条目不是同一层 API。",
      "`HdStVBOMemoryManager`、`HdStInterleavedMemoryManager`、`HdBufferArrayRange` 等条目偏 Storm/Hydra GPU buffer 管理；应结合渲染后端和资源生命周期阅读。",
      "`Ef_OutputValueCache`、`Ef_PageCache`、`EfDependencyCache`、`Vdf*` 相关条目属于 OpenExec/Vdf execution cache 语境；不要从本页推断 scene composition 规则。",
      "符号段索引保留双冒号、下划线、template 参数和析构符号原样；中文层只说明如何分辨模块边界和下一步应进入哪个 class 页。",
    ],
    terms: [
      ["符号段索引", "symbol-section index"],
      ["析构函数条目", "destructor entry"],
      ["内部 helper", "internal helper"],
      ["嵌套类型", "nested type"],
      ["资源生命周期", "resource lifetime"],
      ["反向跳转", "reverse lookup"],
    ],
  },
  {
    output: "full_site/api/globals_c.html",
    title: "File Members - C",
    summary:
      "`globals_c.html` 是 File Members 的 C 段索引，当前集中在 `Combine*` namespace editing helper 和 `CustomUsdPhysicsTokens`。它的价值是按文件级符号首字母定位声明，不应被当作 namespace editing 或 USD physics 的完整教程。",
    notes: [
      "`CombineError()`、`CombineResult()` 和 `CombineUnbatched()` 都来自 `namespaceEdit.h`，应放在 `SdfNamespaceEdit`、批量编辑结果和错误聚合语境下阅读。",
      "`Combine*` 名称相近但可能处理不同阶段：错误合并、结果合并、未批处理编辑组合；具体参数和返回值需要进入 header 或函数页核对。",
      "`CustomUsdPhysicsTokens` 来自 `parseUtils.h`，属于 UsdPhysics 解析工具或 token 定制线索，和 `namespaceEdit.h` 的 Combine 系列不是同一模块。",
      "File Members 字母页混合函数、变量、常量、typedef 和宏；因此本页中文层先说明“条目类型”和“来源 header”，再引导到具体目标页。",
      "本地链接若指向清单外 header 页面，会按策略进入 `site/uncovered_openusd_page.html`；这不是丢失，而是当前 406 页边界的显式提示。",
    ],
    terms: [
      ["C 段文件成员", "C file-member section"],
      ["错误聚合", "error aggregation"],
      ["结果合并", "result combination"],
      ["未批处理编辑", "unbatched edit"],
      ["来源 header", "source header"],
      ["清单边界", "inventory boundary"],
    ],
  },
  {
    output: "full_site/api/globals_type.html",
    title: "File Members - Typedefs and Type Aliases",
    summary:
      "`globals_type.html` 是 File Members 的 typedef/type alias 索引页，横跨 `Arch`、`Ef`、`Exec`、`Gf`、`Pcp`、`Sdf`、`Tf`、`Usd`、`Vdf` 等模块。它列出文件级类型别名入口，不解释每个别名的完整 ownership、callback、container 或 template 约束。",
    notes: [
      "`ArchConstFileMapping`、`ArchCrashHandlerSystemCB`、`ArchStackTraceCallback` 偏平台、文件映射、崩溃处理和 stack trace callback，应与 USD scene API 分开阅读。",
      "`ExecCallbackFn`、`ExecIrResult`、`EfInputValueBlockVector`、`EfPageCacheCommitRequestVector` 指向 OpenExec/Ef execution data structures 和 callback 语境。",
      "`PcpArcInfoVector`、`PcpSiteTracker`、`PcpVariantFallbackMap` 属于 composition 数据结构；应和 Pcp arc、site、variant fallback 语义一起看。",
      "`SdfNamespaceEditVector`、`SdfNamespaceEditDetailVector`、`SdfRelocate`、`SdfRelocates` 属于 namespace editing 和 path relocation；不能只从 typedef 名称推断编辑顺序或冲突处理。",
      "`Tf*`、`Vt*`、`Vdf*` 类型别名通常服务基础设施、值容器或执行系统；遇到 template alias 时应保留参数原样，继续进入对应 header 查看声明。",
    ],
    terms: [
      ["文件级类型别名", "file-level typedef"],
      ["回调类型", "callback type"],
      ["组合数据结构", "composition data structure"],
      ["路径迁移", "path relocation"],
      ["执行数据结构", "execution data structure"],
      ["模板别名", "template alias"],
    ],
  },
  {
    output: "full_site/api/trace_page_front.html",
    title: "Trace: Performance tracking",
    summary:
      "`trace_page_front.html` 是 Trace 性能跟踪模块入口，用于理解如何在 OpenUSD 代码中插桩、收集 `TraceEvent`，再由 `TraceReporter` 输出报告。它关注 performance tracking，不是一般 logging、diagnostics 或 profiling UI 的完整替代。",
    notes: [
      "`TraceCollector` 负责收集事件，`TraceEvent` 表示事件记录，`TraceReporter` 负责生成报告；这三者是调试性能热点时的核心阅读路径。",
      "`TRACE` macros 和 `pxr/base/trace/trace.h` 是 C++ instrumentation 入口；使用前需要考虑事件粒度、调用频率和性能开销。",
      "页面提到 Python tracing，但这不代表所有 C++ trace API 都有同等 Python surface；具体可用性应查看绑定或示例。",
      "`Recording and Reporting` 与 `Performance Overhead` 小节说明 trace 开启方式和开销边界；生产环境中应避免无边界地扩大 instrumentation 范围。",
      "Trace 与 `TfDiagnostic`、日志或错误上报不同：Trace 更关注 timing、counting、measuring 和 event recording，用于性能分析链路。",
    ],
    terms: [
      ["性能跟踪", "performance tracking"],
      ["插桩宏", "instrumentation macro"],
      ["事件收集器", "event collector"],
      ["跟踪报告", "trace report"],
      ["性能开销", "performance overhead"],
      ["事件粒度", "event granularity"],
    ],
  },
  {
    output: "full_site/api/functions_vars_x.html",
    title: "Class Members - Variables - X",
    summary:
      "`functions_vars_x.html` 是 Class Members 变量索引的 X 段，当前只包含 `UsdGeomTokensType` 和 `UsdPhysicsTokensType` 相关入口。它是短索引页，用来定位 X 字母 token 或变量，而不是解释完整的几何坐标系或物理驱动行为。",
    notes: [
      "`UsdGeomTokensType` 中的 X 相关条目通常与 geometry schema、axis、xform、primvar 或属性 token 命名有关；实际含义要进入 token type 页面核对。",
      "`UsdPhysicsTokensType` 中的 X 相关条目可能对应 physics axis、drive、limit 或 constraint 相关 token；本页不说明仿真行为或 solver 语义。",
      "X 段变量索引和 `functions_x.html`、`functions_func_x.html` 不同：前者偏变量/token，后两者偏 class member 或 function accessor。",
      "遇到 `x` / `X` token 时，应先区分它是坐标分量、schema attribute token、枚举值还是物理约束命名，避免按单一“X 轴”解释所有条目。",
      "中文补强保留 `UsdGeomTokensType`、`UsdPhysicsTokensType` 原样，帮助用户与源码、Doxygen 搜索和官方英文页面保持可比对。",
    ],
    terms: [
      ["变量索引 X 段", "X variable index"],
      ["schema attribute token", "schema attribute token"],
      ["坐标分量", "coordinate component"],
      ["物理约束命名", "physics constraint naming"],
      ["token type 页面", "token type page"],
      ["函数访问器索引", "function accessor index"],
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
