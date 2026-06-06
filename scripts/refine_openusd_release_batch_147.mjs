import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-147";

const refinements = [
  {
    output: "full_site/api/class_sdf_usdz_file_format.html",
    title: "SdfUsdzFileFormat",
    summary:
      "`SdfUsdzFileFormat` 是用于 `.usdz` package 的 `SdfFileFormat` 实现，负责让 `SdfLayer` 以包形式读取和写出 USD 内容。阅读本页时要把普通文本 layer、package root layer、resolver 能否定位 asset，以及 `.usdz` 写出限制分开看。",
    notes: [
      "`CanRead()` 用来判断给定文件是否可由该格式处理；它回答的是格式识别和可读性问题，不等同于已经成功打开了所有包内 asset。",
      "`Read()` 和 `_ReadDetached()` 面向 layer 数据载入，通常会和 `GetPackageRootLayerPath()`、resolver identifier 以及 package 内根层路径一起排查。",
      "`WriteToFile()`、`WriteToStream()` 与 `WriteToString()` 都是写出入口，但 `.usdz` package 的归档结构、只读约束和外部依赖限制会影响可写能力。",
      "`ReadFromString()` 适合测试或内存中的 layer 内容，不代表真实 `.usdz` 包中材质、贴图或子层资源已经按打包规则存在。",
      "`IsPackage()` 明确该 file format 属于 package；调试时应同时检查 layer identifier、resolved path、package-relative path 和 `SdfLayer` 的 dirty/write 状态。",
    ],
    terms: [
      ["包格式", "package file format"],
      ["`.usdz` 包", ".usdz package"],
      ["包根层路径", "package root layer path"],
      ["格式可读性", "CanRead()"],
      ["写出到文件", "WriteToFile()"],
      ["从字符串读取", "ReadFromString()"],
    ],
  },
  {
    output: "full_site/api/class_vdf_context.html",
    title: "VdfContext",
    summary:
      "`VdfContext` 是传给 Vdf computation callback 的执行期参数包。它不是持久化 graph state，而是 callback 在一次 evaluation 中读取输入、判断请求输出、设置输出值以及发出诊断的唯一上下文入口。",
    notes: [
      "`GetInputValue()` 与 `GetInputValuePtr()` 用来访问当前 computation 的输入值；调用前通常需要理解输入是否已被 schedule 请求和是否真的存在值。",
      "`HasInputValue()` 区分输入端口存在和输入值可用这两件事，可避免把缺值、空值和未连接输入混为一谈。",
      "`IsOutputRequested()` 帮助 callback 判断某个 output 是否需要计算；它服务于按需 evaluation，不应被当成永久性的 node 输出状态。",
      "`SetOutput()`、`SetEmptyOutput()` 和 `SetOutputToReferenceInput()` 是写回计算结果的主要路径，适合分别表达普通输出、空输出和引用输入转发。",
      "`Warn()`、`CodingError()` 与 `GetNodeDebugName()` 面向诊断；复杂网络调试时应保留 node 名称、输入端口和请求输出信息。",
    ],
    terms: [
      ["计算回调上下文", "computation callback context"],
      ["输入值访问", "input value access"],
      ["请求输出", "requested output"],
      ["空输出", "empty output"],
      ["引用输入", "reference input"],
      ["节点调试名", "node debug name"],
    ],
  },
  {
    output: "full_site/api/class_vdf_node.html",
    title: "VdfNode",
    summary:
      "`VdfNode` 是 `VdfNetwork` 中所有 node 的抽象基类，描述输入、输出、依赖掩码、调度请求和网络归属等拓扑信息。它定义 graph 上的计算节点形状，而不是直接承载每次 evaluation 的数值数据。",
    notes: [
      "`GetInput()`、`GetOutput()`、输入列表和输出列表用于检查 node 暴露的端口；端口命名通常使用 `TfToken`，应保持原样阅读。",
      "dependency mask 与 required input/output request 相关函数用于说明某个输出依赖哪些输入，是 schedule 和增量计算分析的关键。",
      "`VdfContext` 在执行 callback 时提供数值访问，而 `VdfNode` 本身更偏向 network topology、端口规格和连接关系。",
      "`GetNetwork()`、node id 和 ownership 相关接口帮助定位 node 属于哪个 `VdfNetwork`；跨网络移动或复用 node 时要格外小心。",
      "抽象类页面中的 `_AppendInputs()`、`_AppendOutputs()`、`_InitializeInputAndOutputSpecs()` 等 protected/private 钩子主要面向派生类实现者，而不是普通调用者。",
    ],
    terms: [
      ["抽象节点基类", "abstract node base class"],
      ["Vdf 网络", "VdfNetwork"],
      ["输入端口", "input port"],
      ["输出端口", "output port"],
      ["依赖掩码", "dependency mask"],
      ["调度请求", "schedule request"],
    ],
  },
  {
    output: "full_site/api/class_usd_lux_shaping_a_p_i.html",
    title: "UsdLuxShapingAPI",
    summary:
      "`UsdLuxShapingAPI` 是用于控制 light emission shaping 的 applied API schema。它把 cone、focus、IES 文件和归一化等控制写成 USD 属性；实际光照外观仍取决于灯光类型、renderer 支持和 authored values。",
    notes: [
      "`Apply()` / `CanApply()` 处理 API schema 是否能应用到目标 prim；这一步是 schema authoring，不等同于 renderer 已经实现所有 shaping 效果。",
      "`CreateShapingConeAngleAttr()` 和 `CreateShapingConeSoftnessAttr()` 描述锥形发光范围与边缘过渡，常用于聚光灯式控制。",
      "`CreateShapingFocusAttr()` 与 `CreateShapingFocusTintAttr()` 控制发光聚焦和色调变化，适合和 `intensity`、`exposure`、`color` 一起调试。",
      "`CreateShapingIesFileAttr()`、`CreateShapingIesAngleScaleAttr()` 和 `CreateShapingIesNormalizeAttr()` 关联 IES profile 文件、角度缩放和归一化策略。",
      "`CreateInput()`、`CreateOutput()` 与 `ConnectableAPI()` 表明该 API 也参与 connectable schema 语义；连接关系和数值属性需要分别检查。",
    ],
    terms: [
      ["光形控制 API", "UsdLuxShapingAPI"],
      ["应用式 API schema", "applied API schema"],
      ["锥角", "shaping cone angle"],
      ["锥边缘柔化", "shaping cone softness"],
      ["聚焦", "shaping focus"],
      ["IES 文件", "IES file"],
    ],
  },
  {
    output: "full_site/api/class_usd_lux_disk_light.html",
    title: "UsdLuxDiskLight",
    summary:
      "`UsdLuxDiskLight` 是表示圆盘面积光的 concrete typed schema。默认语义是圆盘位于 XY plane、沿 -Z 方向单侧发光；页面中的 `radius`、boundable light base 和 `UsdLuxLightAPI` 属性共同决定可见几何边界与渲染采样。",
    notes: [
      "`Define()` 用于在 stage 上定义 `UsdLuxDiskLight` prim，`Get()` 用于从已有 prim 取得 schema 视图；二者不要和属性创建混淆。",
      "`CreateRadiusAttr()` / `GetRadiusAttr()` 管理圆盘半径；半径影响发光面积和 bounds，但最终采样能量还要结合 renderer 对 area light 的实现。",
      "作为 `UsdLuxBoundableLightBase` 派生类型，它同时继承 boundable、xformable 和 light API 相关行为，调试时应检查 transform、extent 和 light 参数。",
      "`UsdLuxLightAPI` 侧的 `intensity`、`exposure`、`color`、`normalize` 等属性会影响能量解释；`DiskLight` 页面只列出本 schema 的新增属性。",
      "如果同时应用 `UsdLuxShapingAPI`，应区分圆盘几何、发光方向、shaping 属性和 renderer 对 shaping 的支持范围。",
    ],
    terms: [
      ["圆盘面积光", "disk area light"],
      ["具体 typed schema", "concrete typed schema"],
      ["半径属性", "radius attribute"],
      ["单侧发光", "one-sided emission"],
      ["可绑定光基类", "UsdLuxBoundableLightBase"],
      ["光照 API", "UsdLuxLightAPI"],
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
