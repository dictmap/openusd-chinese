import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-135";

const refinements = [
  {
    output: "full_site/api/class_usd_lux_disk_light.html",
    title: "UsdLuxDiskLight",
    summary:
      "`UsdLuxDiskLight` 是描述圆盘单面发光的 typed light schema：圆盘中心位于 XY plane，并沿 -Z axis 发光。阅读本页时应把 `radius` 当作圆盘几何半径，把强度、颜色、曝光、归一化和 shaping 等通用灯光控制留给继承的 `UsdLuxBoundableLightBase`、`UsdLuxLightAPI` 或相关 API schema 对照。",
    notes: [
      "`CreateRadiusAttr()` 与 `GetRadiusAttr()` 是本类最直接的 authored attribute 入口；它们描述发光 disk 的半径，不是调节 illumination intensity 的属性。",
      "`Define()` 会在指定 `UsdStage` / `SdfPath` 上创建或取得可定义的 typed prim；`Get()` 只是把已有 prim/path 包装为 `UsdLuxDiskLight`，不会隐式补齐缺失属性。",
      "英文摘录强调 one-sided emission，因此 disk 的 local orientation 会影响光照方向；在 DCC 或 renderer 中排查黑面问题时，要同时检查 transform 与 -Z 发光约定。",
      "`GetSchemaAttributeNames()` 有助于把本 schema 自有属性和继承属性分开；中文说明要保留 `radius` token，避免和 renderer-specific UI label 混淆。",
      "`schemaKind`、`_GetSchemaKind()` 和 `UsdSchemaRegistry` 说明它是 registry 管理的 typed schema；不要把它理解成运行时 light object 或 renderer 插件。",
    ],
    terms: [
      ["圆盘灯光 schema", "UsdLuxDiskLight"],
      ["单面发光", "one-sided emission"],
      ["圆盘半径", "radius"],
      ["局部 -Z 方向", "-Z axis"],
      ["typed prim 定义", "Define()"],
      ["schema 属性清单", "GetSchemaAttributeNames()"],
    ],
  },
  {
    output: "full_site/api/class_usd_lux_shaping_a_p_i.html",
    title: "UsdLuxShapingAPI",
    summary:
      "`UsdLuxShapingAPI` 是应用到 light prim 上的 API schema，用来表达 cone、focus 与 IES profile 等发光塑形控制。它补充灯光分布和边缘行为，不定义灯光几何本身；具体发光形状仍由 `UsdLuxDiskLight`、`UsdLuxSphereLight`、`UsdLuxRectLight` 等 typed schema 决定。",
    notes: [
      "`Apply()` 与 `CanApply()` 表示该 schema 通过 applied API 方式挂到 prim 上；阅读时要检查目标 prim 是否支持该 API，而不是只看是否存在同名属性。",
      "`CreateShapingConeAngleAttr()`、`CreateShapingConeSoftnessAttr()`、`CreateShapingFocusAttr()` 和 `CreateShapingFocusTintAttr()` 对应锥形分布、边缘柔化、聚焦强度和聚焦色调。",
      "`shaping:ies:file`、`shaping:ies:angleScale` 与 `shaping:ies:normalize` 用于 IES 配光文件工作流；它们影响光分布解释，不等同于替换 light color 或 exposure。",
      "`ConnectableAPI()`、`CreateInput()` 和 `CreateOutput()` 暗示该 API 继承 connectable 语义；节点图连接需要保留 source name、typeName 与 render context 的区别。",
      "`GetSchemaAttributeNames()` 可帮助生成工具列出 shaping 相关 token；在双语页面中应原样保留 `shaping:cone:*` 与 `shaping:ies:*`，便于直接对照 USD 文件。",
    ],
    terms: [
      ["灯光塑形 API", "UsdLuxShapingAPI"],
      ["锥形角度", "shaping:cone:angle"],
      ["锥形柔化", "shaping:cone:softness"],
      ["聚焦染色", "shaping:focusTint"],
      ["IES 配光文件", "shaping:ies:file"],
      ["applied API schema", "applied API schema"],
    ],
  },
  {
    output: "full_site/api/class_usd_proc_generative_procedural.html",
    title: "UsdProcGenerativeProcedural",
    summary:
      "`UsdProcGenerativeProcedural` 是抽象 typed schema，用来在 scene description 中声明一个 generative procedural 的系统归属和输入接口。它定义的是 USD 侧 contract：通过 `proceduralSystem` 和 `primvars:` namespace 传递配置，不负责执行、展开或缓存生成结果。",
    notes: [
      "`proceduralSystem` 标识哪个 procedural runtime 或系统应解释该定义；`CreateProceduralSystemAttr()` 和 `GetProceduralSystemAttr()` 是本类最关键的属性访问入口。",
      "英文摘录说明 procedural inputs 可由 `primvars:` namespace 下的 properties 或 relationships 表达；这让输入既可以是数值参数，也可以是指向 scene data 的关系。",
      "`Define()` / `Get()` 仍然遵循 typed schema 的常规用法：创建或获取 schema wrapper，但不会加载具体 generator，也不会触发 procedural evaluation。",
      "本类应和 renderer、Hydra task 或生成插件分开理解；consumer 可以选择识别 `proceduralSystem` 并执行生成，也可以只把它当作普通 scene description 数据。",
      "`GetSchemaAttributeNames()`、`schemaKind` 与 `UsdSchemaRegistry` 说明 schema 属性来自注册定义；后续翻译应继续保留 `proceduralSystem` token 和 `primvars:` 前缀。",
    ],
    terms: [
      ["生成式程序化 schema", "UsdProcGenerativeProcedural"],
      ["程序化系统", "proceduralSystem"],
      ["输入参数命名空间", "primvars:"],
      ["场景描述契约", "scene description contract"],
      ["程序化运行时", "procedural runtime"],
      ["抽象 typed schema", "abstract typed schema"],
    ],
  },
  {
    output: "full_site/api/class_hgi_g_l_graphics_cmds.html",
    title: "HgiGLGraphicsCmds",
    summary:
      "`HgiGLGraphicsCmds` 是 `HgiGraphicsCmds` 的 OpenGL backend implementation，用来记录并提交 graphics command encoder 中的 draw、bind、viewport/scissor、constant values、memory barrier 和 debug group 操作。它位于 HgiGL 后端层，不是 Hydra scene delegate 或 USD schema。",
    notes: [
      "`BindPipeline()`、`BindResources()` 与 `BindVertexBuffers()` 负责把 GL pipeline、resource bindings 和 vertex buffer 状态装入当前 command stream；调用顺序会影响后续 `Draw()`。",
      "`Draw()`、`DrawIndexed()`、`DrawIndirect()` 与 `DrawIndexedIndirect()` 对应不同 draw submission 形态；中文说明应保留 indexed / indirect 术语，便于区分 GPU 驱动路径。",
      "`SetViewport()` 和 `SetScissor()` 是 rasterization state 的核心入口；它们描述 framebuffer 中的渲染区域，不是 USD camera aperture 或 Hydra task framing。",
      "`InsertMemoryBarrier()`、`InsertFunctionOp()`、`PushDebugGroup()`、`PopDebugGroup()` 与 `InsertDebugMarker()` 面向 GPU 同步和调试标记，通常服务于 backend diagnostics。",
      "`_Submit()` 表示命令最终提交到 GL 后端；`HgiGL` 作为 friend 说明生命周期由后端对象协调，而不是由应用层直接随意复用 command 对象。",
    ],
    terms: [
      ["OpenGL 图形命令", "HgiGLGraphicsCmds"],
      ["图形管线绑定", "BindPipeline()"],
      ["资源绑定", "BindResources()"],
      ["索引绘制", "DrawIndexed()"],
      ["间接绘制", "DrawIndirect()"],
      ["内存屏障", "InsertMemoryBarrier()"],
    ],
  },
  {
    output: "full_site/api/class_pcp_property_index.html",
    title: "PcpPropertyIndex",
    summary:
      "`PcpPropertyIndex` 是某个 property 的 composition index，用来列出所有按 composition semantics 对该 property 贡献 opinions 的 scene description sites。它描述组合来源和局部错误，不等同于最终 resolved value，也不只是单个 `SdfPropertySpec` 的容器。",
    notes: [
      "`GetPropertyRange()` 是遍历 property opinion 来源的主要入口；通常会配合 `PcpPropertyIterator` 理解强弱顺序、节点来源和组合图路径。",
      "`GetNumLocalSpecs()` 只统计 local specs 数量，适合判断当前 layer stack 内部贡献；它不代表整个 composition graph 中全部远端 arc 的数量。",
      "`GetLocalErrors()` 暴露局部组合错误；这些错误应与 prim index、layer stack 和 property path 一起诊断，不能只看最终值是否存在。",
      "`IsEmpty()` 表示没有可用 property index 内容；空索引可能来自 property 不存在、没有 contributing sites 或组合失败后的过滤结果，需要结合调用上下文判断。",
      "`Swap()` 支持高效交换索引内容；它是容器级操作，不改变 USD 文件中的 authored opinions，也不会重新计算 composition。",
    ],
    terms: [
      ["属性组合索引", "PcpPropertyIndex"],
      ["属性意见来源", "property opinions"],
      ["场景描述站点", "scene description sites"],
      ["局部 specs", "local specs"],
      ["局部组合错误", "local composition errors"],
      ["属性迭代器", "PcpPropertyIterator"],
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
