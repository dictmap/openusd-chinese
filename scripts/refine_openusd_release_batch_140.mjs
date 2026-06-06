import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-140";

const refinements = [
  {
    output: "full_site/api/class_sdf_prim_spec.html",
    title: "SdfPrimSpec",
    summary:
      "`SdfPrimSpec` 表示 `SdfLayer` 中的 prim description；它由 layer namespace 内的 `SdfPath` 标识，并通过 name children、properties、variant selections、payloads、references、inherits、specializes 等字段描述一个 prim 在单层中的 authored opinions。",
    notes: [
      "`SdfPrimSpec` 是 layer-level spec，不是 composed `UsdPrim`；它记录的是某个 layer 中直接 authored 的 prim 信息，composition 后的结果需要到 `UsdPrim` / `UsdStage` 层理解。",
      "`New()` 与 `SdfCreatePrimInLayer()` 用于创建 root-level 或嵌套 prim specs；阅读创建 API 时应同时关注 containing `SdfLayer`、parent `SdfPrimSpec` 和路径层级。",
      "`NameChildrenView`、`PropertySpecView`、`AttributeSpecView` 与 `RelationshipSpecView` 把 child prims 和 properties 作为 view 暴露，适合遍历，不等同于直接复制底层存储。",
      "`ApplyNameChildrenOrder()` 与 `ApplyPropertyOrder()` 处理 authored ordering metadata；这影响列表展示和 namespace 顺序，而不是改变属性或子 prim 的语义内容。",
      "`ClearActive()`、`ClearInstanceable()`、`ClearPayloadList()`、`ClearReferenceList()`、`BlockVariantSelection()` 等接口操作的是具体 opinion 或 list op，使用时要区分 clear、block 和 authored fallback。",
    ],
    terms: [
      ["prim 描述", "prim description"],
      ["层级内路径", "SdfPath"],
      ["单层意见", "layer opinion"],
      ["子 prim 视图", "NameChildrenView"],
      ["属性规格视图", "PropertySpecView"],
      ["顺序元数据", "ordering metadata"],
    ],
  },
  {
    output: "full_site/api/class_hd_st_render_pass_state.html",
    title: "HdStRenderPassState",
    summary:
      "`HdStRenderPassState` 保存 Hydra Storm render passes 之间共享的一组 rendering parameters。这些参数以 GL states、uniforms 或 shaders 表达，并在 `Prepare()`、`Bind()` 与 graphics pipeline hash 计算中影响一次 render pass 的具体执行状态。",
    notes: [
      "`GetWorldToViewMatrix()`、`GetProjectionMatrix()`、`GetCullMatrix()` 与 `ComputeViewport()` 说明该类承载 camera/framing/viewport 相关状态，渲染调试时应先核对这些矩阵。",
      "`SetLightingShader()`、`GetLightingShader()`、`SetRenderPassShader()` 与 `GetRenderPassShader()` 管理 shader 绑定，不应与 scene delegate 的材质解析职责混淆。",
      "`GetClipPlanes()` 与 `SetCameraFramingState()` 影响裁剪和 framing；它们通常与 `HdCamera`、AOV resolve 和最终 viewport 输出一起分析。",
      "`GetGraphicsPipelineHash()` 服务于 graphics pipeline state caching；任何影响 pipeline 的状态变更都可能导致不同 hash 和 pipeline 重建。",
      "`SetResolveAovMultiSample()` 表示 MSAA/AOV resolve 控制路径；阅读时应把它与 render pass output、multi-sample attachment 和 Hgi backend capabilities 联系起来。",
    ],
    terms: [
      ["渲染通道状态", "render pass state"],
      ["GL 状态", "GL states"],
      ["统一变量", "uniforms"],
      ["视口计算", "ComputeViewport()"],
      ["图形管线哈希", "graphics pipeline hash"],
      ["多重采样解析", "multi-sample resolve"],
    ],
  },
  {
    output: "full_site/api/class_usd_shade_output.html",
    title: "UsdShadeOutput",
    summary:
      "`UsdShadeOutput` 封装 shader 或 node-graph output；它本质上是一个 connectable attribute，用来表示带类型、由外部计算的输出值。该类围绕 source connections、Sdr metadata 与底层 `UsdAttribute` 提供 shading graph 输出端 API。",
    notes: [
      "`ConnectToSource()` 的多个 overload 支持连接到 `UsdShadeInput`、`UsdShadeOutput`、`UsdShadeConnectableAPI` 或 source path；阅读时应核对 source type 与 edit target。",
      "`CanConnect()` 用于在建立连接前检查 compatibility，尤其要关注 output/input 类型、connectable schema 和 source prim 的可见性。",
      "`ClearSource()`、`ClearSources()` 与 `DisconnectSource()` 都会影响连接关系，但语义不同：clear 通常清除 authored opinion，disconnect 更偏写入断开连接的编辑。",
      "`GetAttr()` 暴露底层 `UsdAttribute`，因此 metadata、time samples、value resolution 等通用属性行为仍按 `UsdAttribute` 规则解释。",
      "`ClearSdrMetadata()` 与 `ClearSdrMetadataByKey()` 处理 shader registry metadata；不要把 Sdr metadata 与 USD authored output value 或 connection source 混为一谈。",
    ],
    terms: [
      ["着色输出", "UsdShadeOutput"],
      ["可连接属性", "connectable attribute"],
      ["源连接", "source connection"],
      ["连接兼容性", "CanConnect()"],
      ["底层属性", "UsdAttribute"],
      ["Sdr 元数据", "Sdr metadata"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_primvars_a_p_i.html",
    title: "UsdGeomPrimvarsAPI",
    summary:
      "`UsdGeomPrimvarsAPI` 用于在几何 primitive 上创建、查询和继承 geometric primitive variables。Primvars 以 `UsdGeomPrimvar` 表示，可沿 primitive topology 插值、覆盖 shader inputs，并可沿 namespace 继承。",
    notes: [
      "`CreatePrimvar()`、`CreateIndexedPrimvar()` 与 `CreateNonIndexedPrimvar()` 的差别在于是否创建 indexed primvar，以及是否同时 author indices；创建路径比查询路径更直接。",
      "页面的 `Which Method to Use to Retrieve Primvars` 是阅读重点：GUI 列表、authoring 查询、继承查询和单个 primvar 查找应使用不同方法。",
      "`FindPrimvarsWithInheritance()`、`FindPrimvarWithInheritance()` 与 `FindIncrementallyInheritablePrimvars()` 涉及 namespace inheritance；不要只看当前 prim 的 authored properties。",
      "`GetAuthoredPrimvars()` 与 `GetPrimvars()` 的差异在于 authored-only 与更广义可见 primvars 的范围；工具 UI 和导出器常需要明确选择。",
      "`CanContainPropertyName()` 用于判断 property name 是否属于 `primvars:` namespace 规则；中文说明应保留 `primvars:` token 字面量，便于对应 USD 文件文本。",
    ],
    terms: [
      ["几何 primvars API", "UsdGeomPrimvarsAPI"],
      ["几何原始变量", "geometric primitive variables"],
      ["索引 primvar", "indexed primvar"],
      ["非索引 primvar", "non-indexed primvar"],
      ["命名空间继承", "namespace inheritance"],
      ["primvars 命名空间", "primvars:"],
    ],
  },
  {
    output: "full_site/api/class_hd_task.html",
    title: "HdTask",
    summary:
      "`HdTask` 表示 Hydra render 期间要执行的一个 unit of work。开发者可以继承它来准备资源、执行 3D/2D render passes、运行 compositing/color correction，或协调应用与其他 renderer 的集成。",
    notes: [
      "`Sync()` 从 `HdSceneDelegate` / `HdRenderIndex` 同步 task parameters 与 dirty state，是任务进入执行前的状态更新阶段。",
      "`Prepare()` 用于在执行前准备资源或 task context；一些 task 会在此阶段填充共享数据，而不是直接渲染。",
      "`Execute()` 是实际工作入口，可以发起 render pass、后处理或应用集成逻辑；具体行为由 subclass 决定。",
      "`IsConverged()` 表示 task 是否达到稳定结果，progressive render 或依赖异步资源的 task 常用它向外报告完成状态。",
      "`GetInitialDirtyBitsMask()`、`GetRenderTags()` 与 `_GetTaskContextData()` 说明 task 参与 Hydra dirty tracking、render tag 过滤和 task context 共享数据协议。",
    ],
    terms: [
      ["Hydra 任务", "HdTask"],
      ["工作单元", "unit of work"],
      ["同步阶段", "Sync()"],
      ["准备阶段", "Prepare()"],
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
