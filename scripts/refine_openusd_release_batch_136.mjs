import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-136";

const refinements = [
  {
    output: "full_site/api/class_hdx_pick_from_render_buffer_task.html",
    title: "HdxPickFromRenderBufferTask",
    summary:
      "`HdxPickFromRenderBufferTask` 是 Hdx 中针对已有 ID buffers 执行 picking queries 的任务。它把 `HdxPickTaskContextParams` 提供的 pick frustum 重映射到生成 ID buffer 时的 camera frustum，然后只在被 pick frustum 覆盖的 buffer 子集上查询，适合复用已有 render buffer 做交互拾取。",
    notes: [
      "`TaskParams` 通常对应 `HdxPickFromRenderBufferTaskParams`，用于描述任务执行所需的 pick 参数、buffer 输入和结果输出约定；不要把它和普通 render task 参数混用。",
      "`Prepare()`、`_Sync()` 与 `Execute()` 分别落在 Hydra task 生命周期的准备、同步和执行阶段；读取本页时要把它放进 `HdEngine::Execute()` 调度链理解。",
      "该任务依赖已有 ID buffers，因此核心成本在 frustum remap 和局部 query，而不是重新绘制整场景；这也是它区别于常规 pick render path 的地方。",
      "`IsConverged()` 反映任务结果是否收敛；在交互 picking 中它通常服务于 UI 决策，而不是表示 scene delegate 中所有 prim 都已完全同步。",
      "`HdSceneDelegate`、`HdRenderIndex`、`Hgi` 和 `HdDriver` 表明任务横跨 scene data、render index 与 GPU execution context；中文说明应保留这些层次边界。",
    ],
    terms: [
      ["从渲染缓冲拾取", "pick from render buffer"],
      ["ID 缓冲", "ID buffers"],
      ["拾取视锥重映射", "pick frustum remap"],
      ["任务参数", "TaskParams"],
      ["Hydra 任务执行", "HdEngine::Execute()"],
      ["拾取查询结果", "picking query result"],
    ],
  },
  {
    output: "full_site/api/class_pcp_arc.html",
    title: "PcpArc",
    summary:
      "`PcpArc` 是 prim index 中连接两个 `PcpNodeRef` 的 composition arc。它由 source node 持有，并指向 index 中的 parent node 作为 target；因此它描述 Pcp composition graph 的节点关系，而不是 USD namespace 中的几何层级边。",
    notes: [
      "`type` 保存 `PcpArcType`，用于区分 reference、payload、inherit、specialize、variant 等组合来源；理解 arc 语义必须先看 arc type。",
      "`parent`、`origin` 和 `siblingNumAtOrigin` 帮助定位 arc 在组合图中的目标、起源和兄弟顺序；这些字段服务于 composition ordering 和错误诊断。",
      "`mapToParent` 是 `PcpMapExpression`，描述 source node namespace 如何映射到 parent node；路径映射错误常会影响 property 和 prim opinion 的最终落点。",
      "`namespaceDepth` 记录 namespace 映射相关深度信息；它不是 stage 中 prim path 的字符串长度，而是 Pcp 内部组合计算的一部分。",
      "阅读 `PcpArc` 时应和 `PcpPropertyIndex`、`PcpNodeRef`、`PcpPrimIndex` 一起看：arc 描述边，node 描述站点，index 汇总组合结构。",
    ],
    terms: [
      ["组合图边", "composition arc"],
      ["组合边类型", "PcpArcType"],
      ["源节点", "source node"],
      ["父节点 / 目标节点", "parent node / target"],
      ["路径映射表达式", "PcpMapExpression"],
      ["命名空间深度", "namespaceDepth"],
    ],
  },
  {
    output: "full_site/api/class_hd_task.html",
    title: "HdTask",
    summary:
      "`HdTask` 是 Hydra render 期间执行的 abstract unit of work，可被派生类用于准备资源、运行 3D render passes、执行 compositing/color correction 等 2D passes，或协调应用与 renderer 集成。它是 `HdEngine::Execute()` 调度的任务节点，而不是 scene prim。",
    notes: [
      "`Sync()`、`Prepare()` 与 `Execute()` 是 task 生命周期的主线：同步 scene delegate 数据、准备执行资源、再运行具体任务逻辑。",
      "`GetInitialDirtyBitsMask()` 定义 task 初始需要同步的 dirty bits；派生任务若设置过宽会增加同步成本，设置过窄则可能漏掉必要数据。",
      "`_GetTaskParams()`、`_GetTaskContextData()` 和 `_HasTaskContextData()` 用于访问 task context 中的参数和共享数据；这解释了多个 Hdx task 如何通过 context 协作。",
      "`GetRenderTags()` 帮助 task 选择或过滤参与渲染的 render tags；它与 USD purpose 或 collection 过滤相关，但不是同一个 API 层。",
      "`IsConverged()` 提供任务级收敛状态；交互 viewport 可据此判断是否继续调度，而不是把它当作最终图像质量保证。",
    ],
    terms: [
      ["Hydra 任务", "HdTask"],
      ["工作单元", "unit of work"],
      ["同步阶段", "Sync()"],
      ["准备阶段", "Prepare()"],
      ["执行阶段", "Execute()"],
      ["任务上下文数据", "task context data"],
    ],
  },
  {
    output: "full_site/api/class_hd_st_dispatch_buffer.html",
    title: "HdStDispatchBuffer",
    summary:
      "`HdStDispatchBuffer` 是 Storm/HdSt 后端中的 GPU dispatch buffer，底层是 unsigned integers 的 VBO，用于承载 `MultiDrawIndirect` 或 `DispatchComputeIndirect` 等 indirect dispatch 所需的命令数据。它服务于 GPU 间接绘制/计算调度，不是普通 primvar buffer。",
    notes: [
      "`AddBufferResourceView()` 会在同一 uint array 上创建不同的 `BufferResourceView`；这些 view 可按 interleaved offset 暴露给 shader 或 resource binder。",
      "`GetCommandNumUints()` 和 `GetCount()` 分别描述每条命令占用的 uint 数量和命令条目数，是理解 indirect command layout 的关键。",
      "`Reallocate()` 与 `CopyData()` 管理 buffer 容量和数据上传；它们影响 GPU resource 生命周期，而不是 scene delegate 的 authored data。",
      "`GetEntireResource()`、`GetResource()`、`GetResources()` 和 `GetBufferArrayRange()` 体现该类同时面向单个 resource view 和整体 buffer array 访问。",
      "`GarbageCollect()` 与 `DebugDump()` 分别服务于资源回收和诊断；在 Storm 调试中应结合 `HdStResourceRegistry` 和 `HdResourceBinder` 一起看。",
    ],
    terms: [
      ["Storm 调度缓冲", "HdStDispatchBuffer"],
      ["无符号整数 VBO", "unsigned integer VBO"],
      ["间接绘制命令", "MultiDrawIndirect"],
      ["间接计算调度", "DispatchComputeIndirect"],
      ["缓冲资源视图", "BufferResourceView"],
      ["命令布局", "command layout"],
    ],
  },
  {
    output: "full_site/api/class_pcp_error_unresolved_prim_path.html",
    title: "PcpErrorUnresolvedPrimPath",
    summary:
      "`PcpErrorUnresolvedPrimPath` 是 Pcp composition / asset resolution 期间的错误对象，用来报告 asset paths 不能同时 resolved 和 loaded 的 unresolved prim path 情况。它继承自 `PcpErrorBase`，应作为组合诊断信息读取，而不是普通异常类型。",
    notes: [
      "`New()` 是构造该错误对象的静态入口；`ToString()` 提供面向日志或诊断 UI 的字符串化说明，但结构化排查仍应读取字段。",
      "`site` 指向发生错误的 `PcpSite`，`unresolvedPath` 保留未解析 prim path；两者合起来给出错误位置和失败目标。",
      "`sourceLayer` 与 `targetLayer` 帮助判断 asset path 是在哪个 layer 到哪个 layer 的组合关系中失败，适合排查 layer stack 和 resolver context。",
      "`arcType` 记录触发问题的 `PcpArcType`；reference、payload、inherit 或其它 arc 类型会影响用户应检查的 authored opinion。",
      "resolved 和 loaded 是两个阶段：路径解析成功不等于资源已可加载；本错误强调两者不能同时满足，通常需要同时检查 asset resolver、文件可达性和 layer 内容。",
    ],
    terms: [
      ["未解析 prim 路径错误", "PcpErrorUnresolvedPrimPath"],
      ["错误位置", "PcpSite"],
      ["未解析路径", "unresolvedPath"],
      ["源图层", "sourceLayer"],
      ["目标图层", "targetLayer"],
      ["组合边类型", "arcType"],
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`);
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
