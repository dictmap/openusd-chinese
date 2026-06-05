import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-092";

const refinements = [
  {
    output: "full_site/api/hdx_page_front.html",
    title: "Hdx : Hydra extensions",
    notes: [
      "`hdx_page_front.html` 是 `Hdx` 模块入口页，重点不是定义 Hydra 的核心抽象，而是在 `Hd` 之上收集常用 task、selection、picking、color correction、present task 和交互式 viewport 支撑代码；阅读时应先把它看作 Hydra 应用层扩展包。",
      "`HdxTaskController`、`HdxRenderTask`、`HdxSelectionTask`、`HdxPickTask`、`HdxColorCorrectionTask`、`HdxPresentTask` 等类型通常服务于 usdview、工具视口或调试视口，把渲染索引、相机、AOV、选择高亮和最终显示组织成可调度任务。",
      "如果目标是理解 scene data 如何进入 Hydra，应先读 `Hd`、`HdSceneDelegate`、`HdSceneIndex` 和 adapter；如果目标是实现一个工具窗口或扩展已有 viewport，则从 `Hdx` 的 task/controller 入口开始更直接。",
      "本页中的英文摘录往往很短，中文补充的作用是帮助读者判断 `Hdx` 与 `HdSt`、`Hgi`、`UsdImaging` 的边界：`Hdx` 偏 workflow/task glue，`HdSt` 偏 Storm render delegate，`Hgi` 偏图形 API 抽象，`UsdImaging` 偏 USD 到 Hydra 的适配。",
      "保留 `Hdx`、`Hd`、`HdSt`、`Hgi`、`UsdImaging` 等英文 API 名称，便于继续在 Doxygen、源码和 GitHub 中检索；中文只解释模块职责、典型入口和跨模块跳转顺序。"
    ],
    terms: [
      ["Hydra extensions", "Hydra 扩展层"],
      ["task controller", "任务控制器"],
      ["selection task", "选择任务"],
      ["pick task", "拾取任务"],
      ["present task", "显示提交任务"],
      ["viewport workflow", "视口工作流"]
    ]
  },
  {
    output: "full_site/api/hd_page_front.html",
    title: "Hd : The Hydra Framework",
    notes: [
      "`hd_page_front.html` 是 Hydra Framework 的核心入口页，说明 `Hd` 如何在 scene graph 与 renderer 之间建立通信层；它比 `Hdx` 更底层，读者应优先关注 render index、scene delegate、scene index、task、buffer source 和 data source 等基础概念。",
      "`HdRenderIndex`、`HdSceneDelegate`、`HdTask`、`HdRprim`、`HdSprim`、`HdBprim`、`HdBufferSource`、`HdDataSource` 与 `HdSceneIndexBase` 是本页后续跳转时最常见的锚点，分别对应索引、场景查询、任务、可渲染对象、状态对象、缓冲数据和 scene index 流。",
      "Hydra 的价值在于把 multiple scene graphs 和 multiple renderers 解耦：USD 不是唯一数据源，Storm/Embree/RenderMan 等 renderer 也不是唯一后端；`Hd` 提供的是中间协议和数据同步框架。",
      "阅读 `Hd` 时要区分旧式 scene delegate 流和较新的 scene index 流；前者围绕 delegate pull model，后者更强调可组合的过滤、变换和增量通知。中文导读不替换官方英文接口说明，只补充导航顺序。",
      "如果正在查具体渲染行为，通常从本页跳到 `HdSt` 或具体 render delegate；如果正在查 USD 数据如何进入 Hydra，则继续读 `UsdImaging`、adapter registry 和 scene index plugin。"
    ],
    terms: [
      ["Hydra Framework", "Hydra 框架"],
      ["render index", "渲染索引"],
      ["scene delegate", "场景代理"],
      ["scene index", "场景索引"],
      ["buffer source", "缓冲数据源"],
      ["data source", "数据源"]
    ]
  },
  {
    output: "full_site/api/globals_func_p.html",
    title: "File Members - Functions - P",
    notes: [
      "`globals_func_p.html` 是 File Members 函数索引 P 段，当前条目集中在 `Pcp` composition site、path、permission、payload 或 plugin 相关辅助函数；它更适合当作按函数名定位头文件的入口，而不是概念教程。",
      "与 Class Members 索引不同，File Members 记录的是文件级函数、宏或非成员工具函数；遇到 `Pcp` 前缀时，应优先关联 composition、layer stack、prim index、property index 和 namespace/path mapping。",
      "`Pcp` 系列函数常与 `SdfPath`、`SdfLayer`、`PcpNodeRef`、`PcpPrimIndex`、`PcpPropertyIndex`、`PcpCache` 一起出现，读者应把它们放在 composition engine 的上下文中理解，而不是把 P 段当作普通字符串函数列表。",
      "如果条目来源指向 `composeSite.h`、`mapFunction.h`、`pathTranslation.h` 或类似 header，应继续打开对应头文件/类页核对函数签名、参数语义和错误处理；索引页本身只提供导航线索。",
      "中文层保持 `Pcp`、`SdfPath`、`PcpPrimIndex`、`PcpNodeRef` 等符号原样，避免破坏代码搜索；说明重点放在函数族、模块边界、典型跳转路径和阅读风险。"
    ],
    terms: [
      ["file member function", "文件级函数"],
      ["composition site", "组合站点"],
      ["prim index", "prim 索引"],
      ["property index", "属性索引"],
      ["path translation", "路径转换"],
      ["layer stack", "层栈"]
    ]
  },
  {
    output: "full_site/api/functions_a.html",
    title: "Class Members - A",
    notes: [
      "`functions_a.html` 是 Class Members A 段索引页，收集以 A 开头或落在 A 区段的成员、类型别名和方法；它的主要用途是从字母索引跳回目标 class，而不是直接学习某一个模块。",
      "本页常见条目会跨越 `Ar` asset resolution、`Sdf` layer/path、`Usd` attribute/stage、`Hd` adapter 或 `Tf` 基础设施；读者应先观察每个条目右侧的所属类名，再决定是否进入类页、头文件页或模块入口。",
      "以 `Add`、`Apply`、`Append`、`Attribute`、`Array`、`Adapter` 等动词或名词开头的成员可能语义差异很大：`ApplyAPI` 属于 schema/API schema 语境，`AddConnection` 属于属性/关系或 shading graph 语境，`Append` 可能只是容器操作。",
      "中文导读的目标是让读者先按模块筛选 A 段条目：资产解析看 `Ar`，场景描述看 `Usd`/`Sdf`，渲染和 imaging 看 `Hd`/`UsdImaging`，基础设施看 `Tf`/`Vt`；再进入具体英文 API 说明核对签名。",
      "所有 API 名称、模板参数和链接继续保留英文；本页不要把索引条目逐项意译成中文，否则会降低 Doxygen 搜索、源码搜索和 IDE 跳转的一致性。"
    ],
    terms: [
      ["class member index", "类成员索引"],
      ["API schema", "API schema"],
      ["asset resolution", "资产解析"],
      ["attribute API", "属性 API"],
      ["adapter entry", "适配器入口"],
      ["module filtering", "按模块筛选"]
    ]
  },
  {
    output: "full_site/api/globals_func_t.html",
    title: "File Members - Functions - T",
    notes: [
      "`globals_func_t.html` 是 File Members 函数索引 T 段，条目密集覆盖 `Tf` 基础设施、type traits、token、threading、test helpers、trace 或 Python 互操作入口；它适合用来定位全局工具函数和宏定义来源。",
      "`Tf` 前缀通常表示基础设施层，包括类型系统、诊断、静态数据、token、notice、hash、thread/local storage 和 Python 绑定支撑；阅读 T 段时应优先查看 header name，避免把所有 `Tf` 条目误归为同一概念。",
      "`Trace`、`TfToken`、`TfType`、`TfNotice`、`TfRegistryManager`、`TfPy*` 等条目分别指向性能跟踪、不可变 token、运行时类型系统、通知机制、注册器和 Python bridge；索引页只负责把这些入口聚合在一起。",
      "如果条目是宏或模板 helper，应继续进入对应 source/header 页面确认平台条件、编译期分支和 template 参数；如果条目是函数，应进入 Doxygen 函数锚点核对返回值、错误约定和线程要求。",
      "中文补强保留 `Tf`、`Trace`、`TfToken`、`TfType`、`TfNotice`、`TfPy` 等英文符号，只解释它们在 OpenUSD 基础设施层中的大致角色和跳转策略。"
    ],
    terms: [
      ["File Members - T", "文件成员 T 段"],
      ["type traits", "类型萃取"],
      ["token utility", "token 工具"],
      ["threading helper", "线程辅助工具"],
      ["Python bridge", "Python 桥接"],
      ["trace utility", "Trace 工具"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引、模块入口或 File Members 函数页的二次精修说明，重点解释 Doxygen 字母桶、模块边界、函数族归属、跨页跳转顺序和术语对照。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于与官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}. It explains how to read Doxygen letter buckets, module boundaries, function-family ownership, cross-page navigation, and terminology while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
