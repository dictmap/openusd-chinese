import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-148";

const refinements = [
  {
    output: "full_site/api/gf_page_front.html",
    title: "Gf : Graphics Foundations",
    summary:
      "`Gf : Graphics Foundations` 是 OpenUSD 图形数学基础模块入口，适合作为查找 vector、matrix、quaternion、range、ray、bbox、plane、rotation 与数值 helper 的总索引。阅读本页时应先按 Linear Algebra、Basic Mathematical Operations、Basic Geometry 和 Debugging output 四类建立 mental map。",
    notes: [
      "Linear Algebra 相关条目通常服务于 `UsdGeom`、Hydra 和 renderer 代码中的坐标、变换、范围和方向计算；API 名称中的 `Gf*` 类型应保持原样。",
      "Basic Mathematical Operations 覆盖 clamp、lerp、比较、数值区间和浮点辅助函数，适合在追查几何计算误差或单位转换时作为入口。",
      "Basic Geometry 包含 ray、plane、frustum、bbox、rotation、dual quaternion 等工具；这些类型经常和 transform stack、extent 以及 intersection testing 共同出现。",
      "本页不是某个 class 的完整文档，而是模块导航页；若需要构造函数、operator 或精确数学语义，应继续跳到对应 `GfMatrix*`、`GfVec*`、`GfRange*` 等 class 页面。",
      "调试输出相关条目帮助把数学对象格式化为可读文本；它们适合日志和诊断，不应被误读为序列化或 scene description schema。",
    ],
    terms: [
      ["图形数学基础", "Graphics Foundations"],
      ["线性代数", "Linear Algebra"],
      ["基础数学操作", "Basic Mathematical Operations"],
      ["基础几何", "Basic Geometry"],
      ["包围盒", "bounding box"],
      ["调试输出", "debugging output"],
    ],
  },
  {
    output: "full_site/api/usd_mtlx_page_front.html",
    title: "UsdMtlx",
    summary:
      "`UsdMtlx` 模块入口说明 MaterialX file format、shader discovery、shader parsing plugins 以及 MaterialX concepts 到 USD / UsdShade / Sdr 概念的映射。它是定位 MaterialX 文件如何进入 USD shading ecosystem 的阅读起点。",
    notes: [
      "Concept Mappings 小节应和 `UsdShadeInput`、`UsdShadeOutput`、`UsdShadeShader`、`UsdShadeNodeGraph`、`UsdShadeMaterial` 以及 `SdrShaderNode` 页面交叉阅读。",
      "`input`、`output`、`node`、`nodedef`、`nodegraph`、`implementation` 等 MaterialX 术语不要翻译成新的 API 名称；中文只解释它们在 USD 侧对应什么对象。",
      "file format plugin 负责让 MaterialX 文档作为 asset 或 layer 参与读取；shader discovery / parsing plugin 则服务于 Sdr registry 和 shader node 元数据。",
      "几何绑定相关概念如 `geom`、`collection` 和 `material` 会触及 `UsdCollectionAPI` 与 `UsdShadeMaterialBindingAPI`，需要区分材质网络定义和绑定关系。",
      "调试 MaterialX 导入问题时，通常要同时检查文件路径解析、node definition、implementation 选择、token 名称和 UsdShade connectable 属性。",
    ],
    terms: [
      ["MaterialX 文件格式", "MaterialX file format"],
      ["着色器发现", "shader discovery"],
      ["着色器解析插件", "shader parsing plugin"],
      ["概念映射", "Concept Mappings"],
      ["节点定义", "nodedef"],
      ["材质绑定", "material binding"],
    ],
  },
  {
    output: "full_site/api/files.html",
    title: "File List",
    summary:
      "`File List` 是官方 Doxygen 生成的 documented files 总索引，用于从头文件、实现文件或源码浏览页反向定位模块 API。它适合查找某个 symbol 所在文件，但不应替代 class、namespace 或 module 页面中的语义说明。",
    notes: [
      "文件名如 `align.h`、`daemon.h`、`debugger.h`、`demangle.h`、`error.h` 和 `visibility.h` 保持英文原样；中文导读只说明它们大致覆盖的基础设施主题。",
      "大量 `_source.html` 链接是源码浏览页，当前迭代中优先级低于用户直接阅读的 class、module、guide 和 index 页面。",
      "当只知道头文件路径而不知道类名时，本页是有用入口；当需要方法签名、继承关系和详细描述时，应继续跳转到具体 API 页面。",
      "File List 的 brief descriptions 往往很短，适合快速判断文件职责，但不保证涵盖所有 public symbols 或 template 细节。",
      "本地链接策略会把 406 清单内页面指向本地复刻页，清单外 OpenUSD 页面指向 uncovered 占位页；官方原页链接仍保留在导航区域。",
    ],
    terms: [
      ["文件总索引", "File List"],
      ["已记录文件", "documented files"],
      ["简短描述", "brief descriptions"],
      ["源码浏览页", "source page"],
      ["头文件路径", "header path"],
      ["模块入口", "module entry"],
    ],
  },
  {
    output: "full_site/api/globals_v.html",
    title: "File Members : v",
    summary:
      "`globals_v.html` 是 File Members 的字母 `v` 索引页，当前内容主要围绕 `Vdf` vectorized dataflow 的全局函数、类型别名和 utility。它适合从全局 symbol 反查 Vdf 数据流网络相关头文件。",
    notes: [
      "`Vdf_DataManagerVectorAllocate()` 和 `VdfDataManagerDeallocationMode` 与 data manager vector 的内存分配、释放策略相关，应和具体 data manager 页面或头文件一起读。",
      "`VdfConnectionAndMask`、`VdfConnectionVector`、`VdfConnectionSet` 等类型说明连接集合和 mask 的容器形态，可和 `VdfNode`、`VdfInput`、`VdfOutput` 对照。",
      "`VdfEmptyNodeCallback()`、`VdfGetAssociatedSourceOutput()`、`VdfGetMaskedOutputVectorNetwork()` 属于 helper / utility，常用于网络分析或默认行为处理。",
      "`VdfEstimateSize()` 面向内存估算，`VdfByValueOrConstRef` 面向 template 参数传递策略，二者都属于底层实现阅读线索。",
      "File Members 页只按字母列出 symbol；不要从索引页推断调用顺序、生命周期或线程安全性，具体语义仍需进入相关函数、class 或头文件页面。",
    ],
    terms: [
      ["文件成员", "File Members"],
      ["Vdf 向量化数据流", "Vdf vectorized dataflow"],
      ["连接集合", "connection collection"],
      ["掩码", "mask"],
      ["内存估算", "memory estimation"],
      ["工具函数", "utility function"],
    ],
  },
  {
    output: "full_site/api/globals_w.html",
    title: "File Members : w",
    summary:
      "`globals_w.html` 是 File Members 的字母 `w` 索引页，摘录集中在 `Work` 并行和并发工具函数。它是定位 OpenUSD Work 库并行循环、reduce、sort、detached task 和 concurrency limit API 的入口。",
    notes: [
      "`WorkGetConcurrencyLimit()`、`WorkGetPhysicalConcurrencyLimit()` 与 `WorkHasConcurrency()` 用于查询并发能力和限制，不负责实际启动任务。",
      "`WorkParallelForEach()`、`WorkParallelForN()`、`WorkParallelForTBBRange()` 适合定位并行循环 helper；边界、grain size 和捕获变量安全性需要在调用点检查。",
      "`WorkParallelReduceN()` 与 `WorkParallelSort()` 是 reduce 和 sort 方向的入口，适合与串行实现对照性能和结果稳定性。",
      "`WorkRunDetachedTask()`、`WorkMoveDestroyAsync()` 和 scoped parallelism 相关头文件提示异步任务生命周期，需要谨慎处理对象所有权和同步。",
      "本页按字母 `w` 汇总全局函数，不是 Work 库教程；要理解线程模型、TBB 依赖和异常传播，应继续阅读对应头文件或 developer guide。",
    ],
    terms: [
      ["Work 并行工具库", "Work parallel utilities"],
      ["并发限制", "concurrency limit"],
      ["并行循环", "parallel loop"],
      ["并行归约", "parallel reduce"],
      ["分离任务", "detached task"],
      ["作用域并行控制", "scoped parallelism"],
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
      <h2>中文二次索引补强 / Chinese Index-Focused Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This index-focused refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
