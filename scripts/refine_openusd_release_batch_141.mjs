import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-141";

const refinements = [
  {
    output: "full_site/api/class_usd_schema_registry.html",
    title: "UsdSchemaRegistry",
    summary:
      "`UsdSchemaRegistry` 是 USD schema type information 和 prim definitions 的 singleton registry；它为注册的 Usd `IsA` schema 与 applied API schema 提供类型信息、schema family/version 查询、prim definition 构建以及 generated schema fallback 数据访问。",
    notes: [
      "该 registry 的数据来自每个 schema-defining module 中由 `schema.usda` 经 `usdGenSchema` 处理生成的 `generatedSchema.usda`；阅读时应把 C++ 类型、schema.usda 定义和生成的 prim definition 联系起来。",
      "`FindConcretePrimDefinition()`、`FindAbstractPrimDefinition()` 与 `FindAppliedAPIPrimDefinition()` 分别服务 concrete typed schema、abstract schema 和 applied API schema，不要混用三者的语义。",
      "`BuildComposedPrimDefinition()` 负责把 primary schema 与 applied API schemas 组合成一个 prim definition，可用于理解最终属性、metadata 和 fallback 如何汇总。",
      "`VersionPolicy`、`FindSchemaInfo()` 和 `FindSchemaInfosInFamily()` 用于 schema family/version 解析；读取版本化 schema 时应保留 exact type name 与 family name 的区别。",
      "`GetAPISchemaCanOnlyApplyToTypeNames()`、`GetAPISchemaTypeName()` 和 `CollectAddtionalAutoApplyAPISchemasFromPlugins()` 与 API schema 的可应用范围、type name 映射和插件 auto-apply 规则相关。",
    ],
    terms: [
      ["模式注册表", "schema registry"],
      ["主对象定义", "prim definition"],
      ["生成模式文件", "generatedSchema.usda"],
      ["具体模式", "concrete schema"],
      ["应用型 API 模式", "applied API schema"],
      ["版本策略", "VersionPolicy"],
    ],
  },
  {
    output: "full_site/api/class_pcp_arc.html",
    title: "PcpArc",
    summary:
      "`PcpArc` 表示 prim index 中连接两个 nodes 的 composition arc。该 arc 由 source node 拥有，并指向 index 中的 parent/target node，用来描述 reference、inherit、specialize、variant 等 composition relationship 在 prim index graph 中的边。",
    notes: [
      "`type` 保存 `PcpArcType`，用于区分 arc 的 composition 语义；调试 prim index 时应先看 arc type，再看 path mapping 和 source/target node。",
      "`parent` 指向目标 parent node，`origin` 记录 arc 的 origin 信息，二者帮助解释一条边是由哪一个 composition site 产生并连接到哪里。",
      "`mapToParent` 是 `PcpMapExpression`，描述 source namespace 到 parent namespace 的路径映射；它是理解 payload/reference 路径重定位的关键字段。",
      "`namespaceDepth` 与 `siblingNumAtOrigin` 支持 namespace 层级和 sibling ordering 分析，常用于稳定遍历或诊断 composition graph。",
      "该类是低层组合图数据结构，不是 USD layer 中的 authored arc 本身；中文导读应保留 `prim index`、`PcpNodeRef`、`PcpMapExpression` 和 `PcpArcType` 原名。",
    ],
    terms: [
      ["组合弧", "PcpArc"],
      ["主对象索引", "prim index"],
      ["源节点", "source node"],
      ["父节点", "parent node"],
      ["路径映射表达式", "PcpMapExpression"],
      ["组合弧类型", "PcpArcType"],
    ],
  },
  {
    output: "full_site/api/class_hd_st_dispatch_buffer.html",
    title: "HdStDispatchBuffer",
    summary:
      "`HdStDispatchBuffer` 是 Storm backend 中用于 indirect dispatch 的 unsigned integer VBO。它把简单 `uint` array 组织成可供 `MultiDrawIndirect` 或 `DispatchComputeIndirect` 消费的 GPU-side command/data buffer，并通过 `BufferResourceView` 提供多种 shader binding view。",
    notes: [
      "`AddBufferResourceView()` 在同一 uint array 上定义额外 resource view；这些 view 会被 `HdBufferArray` 聚合，并由 `HdResourceBinder` 按 binding method 和 interleaved offset 绑定。",
      "`CopyData()`、`Reallocate()` 与 `GarbageCollect()` 体现该 buffer 的 GPU resource 生命周期管理，调试时要区分数据复制、容量重分配和废弃资源清理。",
      "`GetCommandNumUints()` 与 `GetCount()` 用于解释 indirect command layout 和当前命令数量；错误的 uint stride 或 count 会直接导致 dispatch/draw 参数错位。",
      "`GetResource()`、`GetResources()` 与 `GetEntireResource()` 暴露不同粒度的 `HdStBufferResource` 视图，适合排查 shader 读到的数据范围。",
      "该类服务 Storm 内部渲染后端，不是 USD 场景层 buffer；中文说明应保留 VBO、indirect dispatch、MultiDrawIndirect、DispatchComputeIndirect 等英文术语。",
    ],
    terms: [
      ["调度缓冲", "dispatch buffer"],
      ["无符号整数 VBO", "unsigned integer VBO"],
      ["间接调度", "indirect dispatch"],
      ["缓冲资源视图", "BufferResourceView"],
      ["命令整数数量", "GetCommandNumUints()"],
      ["资源绑定器", "HdResourceBinder"],
    ],
  },
  {
    output: "full_site/api/class_hd_render_buffer.html",
    title: "HdRenderBuffer",
    summary:
      "`HdRenderBuffer` 是 Hydra 中可被 render pass 写入的数据资源句柄，常用于 draw target 的 2D image、AOV 或 auxiliary rendering output。它既可以作为 indexed prim 通过 scene delegate 获取属性，也可以 out-of-band 创建并直接提供 allocation parameters。",
    notes: [
      "`Allocate()` 根据尺寸、format、multiSampled 等参数分配底层资源；`GetWidth()`、`GetHeight()`、`GetDepth()` 与 `GetFormat()` 用于验证实际 allocation 结果。",
      "`Map()`、`Unmap()` 与 `IsMapped()` 提供 CPU 读写 buffer data 的访问协议；使用时必须成对管理映射状态，避免读写未同步资源。",
      "`Resolve()` 与 `IsMultiSampled()` 处理 multi-sample render buffer 的解析路径，常与 MSAA AOV 输出和后处理 task 一起分析。",
      "`Sync()`、`GetInitialDirtyBitsMask()` 与 `DirtyBits` 说明 render buffer 仍参与 Hydra dirty tracking；作为 indexed bprim 时需要与 `HdSceneDelegate` 通信。",
      "`IsConverged()` 表示 render buffer 相关结果是否稳定，progressive renderer 或异步写入路径需要用它向 task/render loop 报告完成状态。",
    ],
    terms: [
      ["渲染缓冲", "render buffer"],
      ["可渲染资源", "renderable data resource"],
      ["辅助渲染输出", "auxiliary rendering output"],
      ["缓冲映射", "Map()"],
      ["多重采样", "multi-sampled"],
      ["收敛状态", "IsConverged()"],
    ],
  },
  {
    output: "full_site/api/class_hd_scene_delegate.html",
    title: "HdSceneDelegate",
    summary:
      "`HdSceneDelegate` 是 Hydra render index 与 client scene graph 之间的数据交换 adapter。它通过大量 `Get*` 方法按需提供 topology、primvars、instancing、camera、material、display style、categories、coordSys bindings 和 ext computation 信息。",
    notes: [
      "`Get()` 是通用 value 查询入口，返回 `VtValue`；具体语义由 key/token 和 prim path 决定，调用方通常需要知道请求的数据源约定。",
      "`GetBasisCurvesTopology()`、`GetIndexedPrimvar()`、`GetExtent()` 与相关 topology/primvar 方法把客户端几何数据翻译给 Hydra，用于 render index 同步。",
      "`GetInstancerId()`、`GetInstancerPrototypes()`、`GetInstanceIndices()` 与 instance category 方法负责 instancing 数据交换，调试实例化时要同时核对 prototype 与 indices。",
      "`GetCameraParamValue()`、`GetDisplayStyle()`、`GetCullStyle()`、`GetDoubleSided()` 等方法提供渲染状态或可视化属性，不应与 renderer backend 的 GPU state 混淆。",
      "`GetExtComputation*()` 系列说明 scene delegate 也承担 ext computation 输入、输出、kernel 和 primvar descriptor 的传递职责，是计算数据进入 Hydra 的一条路径。",
    ],
    terms: [
      ["场景代理", "HdSceneDelegate"],
      ["客户端场景图", "client scene graph"],
      ["渲染索引", "HdRenderIndex"],
      ["拓扑查询", "topology query"],
      ["实例化数据", "instancing data"],
      ["外部计算", "ext computation"],
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
