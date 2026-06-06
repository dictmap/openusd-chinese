import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-143";

const refinements = [
  {
    output: "full_site/api/class_usd_imaging_adapter_registry.html",
    title: "UsdImagingAdapterRegistry",
    summary:
      "`UsdImagingAdapterRegistry` 是 USD Imaging 侧的 adapter factory registry，用来根据 prim type 或 API schema 构造对应的 imaging adapter。它登记的是 factories 而不是 adapter instances；实际 adapter 通常还需要结合 per-stage data、render index 和 delegate 生命周期管理。",
    notes: [
      "`GetInstance()` 暗示该 registry 以 singleton 方式使用，调用者通常先查询是否存在 adapter，再通过构造函数族创建具体对象。",
      "`ConstructAdapter()` 面向 prim adapter，`ConstructAPISchemaAdapter()` 面向 applied API schema adapter；两者都属于工厂入口，不应误解为长期缓存的 adapter 实例。",
      "`GetAdapterKeys()` 与 `GetAPISchemaAdapterKeys()` 适合用于调试当前注册表覆盖了哪些 prim type 或 API schema type，也可帮助定位 plugin discovery 是否生效。",
      "`HasAdapter()` 与 `HasAPISchemaAdapter()` 是轻量能力查询；在 fallback 路径中应先查询，再决定是否走默认 adapter 或忽略某类 schema。",
      "`AreExternalPluginsEnabled()` 与外部插件发现有关；当自定义 imaging adapter 未被使用时，要同时检查 plugin metadata、加载路径和该开关状态。",
    ],
    terms: [
      ["成像适配器注册表", "UsdImagingAdapterRegistry"],
      ["Prim 适配器", "PrimAdapter"],
      ["API schema 适配器", "APISchemaAdapter"],
      ["适配器工厂", "adapter factory"],
      ["外部插件发现", "external plugin discovery"],
      ["单例注册表", "singleton registry"],
    ],
  },
  {
    output: "full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html",
    title: "UsdSkelImagingDataSourceSkeletonPrim",
    summary:
      "`UsdSkelImagingDataSourceSkeletonPrim` 是 UsdSkel `Skeleton` prim 的 Hydra data source wrapper。它把 skeleton prim 暴露为 `HdContainerDataSource` 风格的结构，使 scene index / Hydra 查询路径可以按名称获取骨架相关数据。",
    notes: [
      "`GetNames()` 返回该 container 下可查询的数据名；调试缺失骨架数据时，先看名称集合是否包含预期 locator，再看具体 `Get()` 结果。",
      "`Get()` 根据 `TfToken` 名称返回对应 `HdDataSourceBase`，它是按需查询入口，不等同于一次性展开所有 skeleton 数据。",
      "该类属于 data source 层，而不是 skinning solver；它负责把 USD skeleton prim 信息组织给 Hydra，并不直接执行关节矩阵求解或 mesh deformation。",
      "构造参数中的 `UsdPrim`、`SdfPath` 与 `UsdImagingDataSourceStageGlobals` 共同确定数据来自哪个 stage、哪个 prim 以及当前成像上下文。",
      "阅读时应把 `UsdImagingDataSourcePrim`、`HdContainerDataSource` 与 `HdDataSourceLocatorSet` 一起理解：前者包装 USD prim，后两者定义 Hydra 数据访问和失效定位语义。",
    ],
    terms: [
      ["骨架 prim 数据源", "skeleton prim data source"],
      ["Hydra 容器数据源", "HdContainerDataSource"],
      ["数据源名称集合", "GetNames()"],
      ["按名查询数据源", "Get()"],
      ["场景索引定位器", "HdDataSourceLocator"],
      ["舞台全局上下文", "UsdImagingDataSourceStageGlobals"],
    ],
  },
  {
    output: "full_site/api/class_usd_imaging_nurbs_patch_adapter.html",
    title: "UsdImagingNurbsPatchAdapter",
    summary:
      "`UsdImagingNurbsPatchAdapter` 为 `UsdGeomNurbsPatch` 提供 USD Imaging delegate support。它负责把 NURBS patch 的 points、topology、subprim data、variability 和 invalidation 传递给 Hydra，而不是把 NURBS 曲面转换成最终渲染网格的唯一实现点。",
    notes: [
      "`GetPoints()` 与 `GetTopology()` 是几何数据查询的核心入口，分别对应控制点数据和 `UsdGeomNurbsPatch` 拓扑描述。",
      "`Populate()` 将 USD prim 引入 render index / cache 流程；如果 prim 没有进入成像结果，应同时检查 `IsSupported()`、路径和可见性过滤。",
      "`TrackVariability()` 记录哪些属性会随时间变化，`ProcessPropertyChange()` 决定属性变更触发的 dirty bits 或重新同步范围。",
      "`GetImagingSubprims()`、`GetImagingSubprimType()` 与 `GetImagingSubprimData()` 说明该 adapter 支持通过 imaging subprim 机制暴露更细粒度的数据。",
      "`InvalidateImagingSubprim()` 用于数据源式失效传播；它应与 `HdDataSourceLocatorSet` 一起理解，而不是只看传统 dirty bit 语义。",
    ],
    terms: [
      ["NURBS patch 适配器", "UsdImagingNurbsPatchAdapter"],
      ["控制点", "points"],
      ["拓扑", "topology"],
      ["成像子 prim", "imaging subprim"],
      ["可变性跟踪", "TrackVariability()"],
      ["属性变更处理", "ProcessPropertyChange()"],
    ],
  },
  {
    output: "full_site/api/class_hgi_g_l_graphics_cmds.html",
    title: "HgiGLGraphicsCmds",
    summary:
      "`HgiGLGraphicsCmds` 是 `HgiGraphicsCmds` 的 OpenGL backend implementation。它把跨后端 Hgi graphics command abstraction 映射到 OpenGL 的 pipeline binding、resource binding、vertex buffer binding、draw call、debug marker 和 memory barrier 操作。",
    notes: [
      "`BindPipeline()`、`BindResources()` 与 `BindVertexBuffers()` 建立 draw call 前的 GL 状态；排查渲染异常时应先确认 pipeline、descriptor/resource 和 vertex layout 是否匹配。",
      "`Draw()`、`DrawIndexed()`、`DrawIndirect()` 与 `DrawIndexedIndirect()` 覆盖普通与 indirect draw 路径；indirect 版本还依赖 command buffer / draw buffer 数据布局。",
      "`SetViewport()` 与 `SetScissor()` 是光栅化区域控制入口，常见问题包括 viewport 与 framebuffer 尺寸不一致、scissor 裁剪掉结果。",
      "`InsertMemoryBarrier()` 处理 GL memory visibility；当同一帧内先写 buffer/texture 再读时，缺失 barrier 可能导致后续 draw 看到旧数据。",
      "`PushDebugGroup()`、`PopDebugGroup()` 与 `InsertDebugMarker()` 主要服务 GPU 调试和 frame capture；`_Submit()` 则把记录好的 commands 提交到后端执行。",
    ],
    terms: [
      ["OpenGL 图形命令", "HgiGLGraphicsCmds"],
      ["管线绑定", "BindPipeline()"],
      ["资源绑定", "BindResources()"],
      ["顶点缓冲绑定", "BindVertexBuffers()"],
      ["间接绘制", "indirect draw"],
      ["内存屏障", "memory barrier"],
    ],
  },
  {
    output: "full_site/api/class_hdx_pick_from_render_buffer_task.html",
    title: "HdxPickFromRenderBufferTask",
    summary:
      "`HdxPickFromRenderBufferTask` 用于对已有 ID buffers 执行 picking query。它会把 `HdxPickTaskContextParams` 提供的 pick frustum 重映射到生成 ID buffers 时使用的 camera frustum，再只查询 pick frustum 覆盖的 buffer 子区域。",
    notes: [
      "该 task 依赖预先生成的 ID buffers；如果没有有效 render buffer 或 buffer 内容不是 pick IDs，`Execute()` 无法产出有意义的 picking 结果。",
      "`_Sync()` 读取 scene delegate / task params 中的变化并更新内部状态，`Prepare()` 处理执行前资源准备，`Execute()` 真正运行查询。",
      "`TaskParams` 通常包含 pick 需要的 render buffer、frustum、resolution 或相关上下文信息；需要与生成 ID buffer 的相机和 viewport 保持一致。",
      "`IsConverged()` 对交互式 picking 很重要：它告诉上层任务图该 picking task 是否还需要继续迭代或等待上游渲染完成。",
      "该类的关键边界是重用已有 ID buffers，而不是重新绘制 selection pass；因此调试时要分清 ID buffer 生成问题、frustum remap 问题和 query 结果解析问题。",
    ],
    terms: [
      ["从渲染缓冲拾取", "pick from render buffer"],
      ["ID 缓冲", "ID buffers"],
      ["拾取视锥", "pick frustum"],
      ["任务参数", "TaskParams"],
      ["执行阶段", "Execute()"],
      ["收敛状态", "IsConverged()"],
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
      <h2>中文三次补强导读 / Chinese Third-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This third-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
