import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-162";

const refinements = [
  {
    output: "full_site/api/usddraco_page_front.html",
    title: "UsdDraco: Draco File Format Plugin",
    summary:
      "`usddraco_page_front.html` 是 `UsdDraco` Draco file format plugin 的模块入口，主要解释 USD 如何通过插件处理 Draco 压缩几何数据。它应被理解为文件格式/压缩资产桥接层，不是 `UsdGeomMesh` 拓扑语义本身，也不是 Draco 编码规范全文。",
    notes: [
      "`UsdDraco` 的核心价值在于把 Draco encoded geometry 接入 USD file format / asset pipeline；具体 mesh primitive、primvars、normals 和 topology 仍应回到 `UsdGeom` 页面确认。",
      "Draco 通常用于压缩传输或存储，USD 侧需要关注解码后数据如何映射到 prim、属性、时间采样和 asset path，而不是只看压缩率。",
      "调试时先确认 `Plug` 是否发现 file format plugin，再确认 `Ar` 解析路径、文件扩展名、解码库可用性和目标 stage 是否能打开对应 layer。",
      "如果下游 renderer 或 DCC 显示异常，问题可能来自 Draco decode、USD attribute mapping、primvar interpolation 或 consumer 支持范围，需要分层排查。",
      "中文补强只说明 `UsdDraco` 在 USD 管线中的位置；`Draco`、`file format plugin`、`UsdGeomMesh`、`primvars`、`topology` 等术语保持原样。",
    ],
    terms: [
      ["Draco 文件格式插件", "Draco file format plugin"],
      ["压缩几何", "compressed geometry"],
      ["解码边界", "decode boundary"],
      ["属性映射", "attribute mapping"],
      ["几何拓扑", "geometry topology"],
      ["资产管线桥接", "asset pipeline bridge"],
    ],
  },
  {
    output: "full_site/api/work_page_front.html",
    title: "Work: Multi-threaded Dispatch",
    summary:
      "`work_page_front.html` 是 `Work` 多线程调度模块入口，围绕任务分发、并行循环、线程池、依赖执行和取消/等待语义提供底层工具。它不是 USD scene composition 模块，而是多个上层系统可复用的并行执行基础设施。",
    notes: [
      "`Work` 适合从 concurrency utility 角度阅读：先理解 dispatch、parallelFor、thread limit、task grouping，再看具体上层模块如何调用它。",
      "如果问题涉及 `Pcp` composition、Hydra imaging 或 asset processing 的性能，应先确认瓶颈是否真的在 `Work` 调度层，而不是 I/O、锁竞争或算法复杂度。",
      "多线程工具的 API 名称通常保留英文原样，尤其是 `WorkDispatcher`、`WorkParallelForN`、`WorkWithScopedParallelism` 等入口，避免翻译导致检索困难。",
      "调试并行问题时需要区分 deterministic API contract 和 runtime scheduling behavior；任务执行顺序、线程数量和异常传播可能受运行环境影响。",
      "本页中文层补充阅读顺序和风险边界：它说明如何进入并行工具文档，不把所有 USD 性能问题都归因于 `Work`。",
    ],
    terms: [
      ["多线程调度", "multi-threaded dispatch"],
      ["并行循环", "parallel loop"],
      ["线程池", "thread pool"],
      ["任务分发器", "task dispatcher"],
      ["调度行为", "scheduling behavior"],
      ["性能瓶颈", "performance bottleneck"],
    ],
  },
  {
    output: "full_site/api/usd_app_utils_page_front.html",
    title: "UsdAppUtils: USD Application Utilities",
    summary:
      "`usd_app_utils_page_front.html` 是 `UsdAppUtils` 应用层工具模块入口，常服务 usdview、命令行工具、预览渲染、frame range、camera selection 和 renderer 参数组装等应用场景。它比核心 `UsdUtils` 更贴近应用程序入口和用户交互流程。",
    notes: [
      "`UsdAppUtils` 应按 application utility 阅读：它帮助应用选择 camera、解析 frame range、准备 render settings 或组织常见 CLI/app 参数。",
      "如果任务是资产依赖、打包或 layer 处理，通常先看 `UsdUtils`；如果任务是 app 级预览、命令行驱动或 viewer workflow，再看 `UsdAppUtils`。",
      "本模块常与 `UsdStage`、`UsdGeomCamera`、`UsdRenderSettings`、Hydra renderer plugin 和命令行参数相邻出现，但它本身不是新的 scene schema。",
      "调试应用工具时，先确认输入 stage、camera path、time code、renderer plugin 和输出参数，再进入对应底层模块排查。",
      "中文复刻保留 `UsdAppUtils`、camera、frame range、renderer plugin、CLI、usdview 等英文关键词，方便用户直接检索官方 API 和工具源码。",
    ],
    terms: [
      ["应用层工具", "application utilities"],
      ["相机选择", "camera selection"],
      ["帧范围", "frame range"],
      ["预览渲染", "preview rendering"],
      ["命令行工作流", "CLI workflow"],
      ["应用入口", "application entry point"],
    ],
  },
  {
    output: "full_site/api/hd_embree_page_front.html",
    title: "HdEmbree: Embree-based Hydra Renderer Plugin",
    summary:
      "`hd_embree_page_front.html` 是 `HdEmbree` 模块入口，描述基于 Intel Embree 的 Hydra renderer plugin。它适合用来理解 Hydra render delegate / renderer plugin 边界，不应被当作 USD schema、scene index 或通用 ray tracing 教程。",
    notes: [
      "`HdEmbree` 位于 Hydra 渲染后端层，消费 `Hd` / Hydra 提供的 scene data，并把几何等数据交给 Embree 相关路径处理。",
      "如果目标是 scene data 如何进入 Hydra，应先读 `HdSceneDelegate`、`HdSceneIndex`、`HdRenderIndex`；如果目标是具体 CPU ray tracing 后端，再进入 `HdEmbree`。",
      "Embree 侧关注 acceleration structures、ray traversal 和 CPU rendering 支持；USD 侧关注 adapter、render delegate、rprim/sprim/bprim 消费边界。",
      "调试显示问题时，先确认 USD scene、Hydra data source、render delegate selection、renderer plugin loading 和 Embree runtime 是否分别正常。",
      "本页中文层强调 `HdEmbree`、`Hd`、`Hdx`、`HdSt/HdStorm` 的分层关系，避免把 renderer plugin 行为误读为 authored scene description。",
    ],
    terms: [
      ["Hydra 渲染插件", "Hydra renderer plugin"],
      ["Render delegate", "render delegate"],
      ["CPU 光线追踪", "CPU ray tracing"],
      ["Embree 后端", "Embree backend"],
      ["场景数据消费", "scene data consumption"],
      ["渲染后端边界", "renderer backend boundary"],
    ],
  },
  {
    output: "full_site/api/trace_page_front.html",
    title: "Trace: Performance Tracking",
    summary:
      "`trace_page_front.html` 是 `Trace` 性能跟踪模块入口，提供 event tracing、counter、collector、reporting 和性能诊断相关工具。它用于观察和分析执行过程，不改变 USD stage、layer、schema 或 renderer 的业务语义。",
    notes: [
      "`Trace` 应按 instrumentation / profiling infrastructure 阅读：先理解如何记录事件，再看如何收集、聚合和输出报告。",
      "如果性能问题来自 composition、asset I/O、Hydra rendering 或插件加载，`Trace` 可以帮助定位时间分布，但不等同于这些模块的修复机制。",
      "常见读取路径是从 `TraceCollector`、`TraceEvent`、`TraceReporter`、counter 和 scope API 进入，再按报告反查具体调用栈或 subsystem。",
      "调试时要区分 instrumentation overhead 与真实 workload；启用 tracing 本身可能改变运行时间，需要谨慎解释数字。",
      "中文补强保留 `Trace`、event、collector、counter、reporter、scope、profiling 等英文关键词，便于和源码宏、日志和报告字段对照。",
    ],
    terms: [
      ["性能跟踪", "performance tracking"],
      ["事件追踪", "event tracing"],
      ["采集器", "collector"],
      ["计数器", "counter"],
      ["报告器", "reporter"],
      ["插桩开销", "instrumentation overhead"],
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
