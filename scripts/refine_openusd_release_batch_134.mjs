import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-134";

const refinements = [
  {
    output: "full_site/api/class_usd_validation_error.html",
    title: "UsdValidationError",
    summary:
      "`UsdValidationError` 是 validation task 返回的结构化错误实体，并且总是和产生它的 `UsdValidationValidator` 语境相关。阅读本页时应先区分 identifier、name、type、sites、message 与 fixer 列表，而不是只把它看成一段错误字符串。",
    notes: [
      "`GetIdentifier()`、`GetName()`、`GetType()`、`GetSites()` 和 `GetMessage()` 覆盖了错误报告的核心维度：稳定标识、短名称、严重级别、发生位置和面向用户的说明。",
      "`UsdValidationErrorType` 描述错误严重性或状态；`UsdValidationErrorSites` 描述 prim、property、layer 或其它定位信息，两者合起来才足以支持 UI 高亮和批处理过滤。",
      "`GetFixers()`、`GetFixerByName()`、`GetFixersByErrorName()` 与 `GetFixersByKeywords()` 用于从错误反查可执行修复器；中文说明应保留 fixer 名称和 error name，便于和 registry 对齐。",
      "`GetErrorAsString()` 适合日志和调试输出，但结构化消费端更应读取 sites、type、identifier 和 data；否则会丢失可排序、可过滤和可定位的信息。",
      "`HasNoError()` 表示空错误或无错误状态；它不是把所有 severity 降级为 warning，也不代表 validator 没有运行。比较运算符主要服务于错误集合去重和排序。",
    ],
    terms: [
      ["验证错误实体", "UsdValidationError"],
      ["验证器", "UsdValidationValidator"],
      ["错误严重性", "UsdValidationErrorType"],
      ["错误定位集合", "UsdValidationErrorSites"],
      ["修复器", "fixer"],
      ["结构化错误报告", "structured validation error"],
    ],
  },
  {
    output: "full_site/api/class_usd_imaging_delegate.html",
    title: "UsdImagingDelegate",
    summary:
      "`UsdImagingDelegate` 是 Hydra (`Hd`) core 与 USD scene graph 之间的主要翻译层。它把 `UsdPrim`、time-varying data、purpose display flags、topology、material、camera 和 instancing 信息转成 Hydra render index 可以同步和查询的数据。",
    notes: [
      "`ApplyPendingUpdates()` 是把 USD 侧变更刷新到 Hydra 侧的重要入口；它通常和 dirty bits、notice、population、resync 与 render index 同步过程一起理解。",
      "`ConvertCachePathToIndexPath()` 和 `ConvertIndexPathToCachePath()` 说明 delegate 内部维护 cache path 与 Hydra index path 的映射；调试 picking、instancing 或 adapter 路径时尤其重要。",
      "`GetDisplayGuides()`、`GetDisplayProxy()`、`GetDisplayRender()`、`GetCullStyle()` 和 `GetDisplayStyle()` 体现了 USD purpose、visibility 与渲染显示策略在 imaging 层的落点。",
      "`GetBasisCurvesTopology()`、`GetCameraParamValue()`、`GetCoordSysBindings()`、`GetCategories()` 等查询函数是 scene delegate 数据访问面，不等同于直接读取原始 `UsdPrim` 字段。",
      "`RigidXformOverridesMap`、`SubdivTags`、refine level 与 material resource 等概念表示 delegate 会做一定缓存、覆盖和转换；它本身不是最终 renderer，也不是 render delegate。",
    ],
    terms: [
      ["USD 到 Hydra 翻译层", "UsdImagingDelegate"],
      ["Hydra 场景代理", "HdSceneDelegate"],
      ["渲染索引", "HdRenderIndex"],
      ["缓存路径", "cache path"],
      ["索引路径", "index path"],
      ["待同步更新", "pending updates"],
    ],
  },
  {
    output: "full_site/api/class_sdr_shader_property.html",
    title: "SdrShaderProperty",
    summary:
      "`SdrShaderProperty` 表示 `SdrShaderNode` 上的一个输入或输出 property。它至少包含 name 和 type，并可以携带 default value、label、help、options、page、hints、shownIf 与 metadata，供 shader discovery、UI 和连接检查共同使用。",
    notes: [
      "`GetName()`、`GetType()`、`GetDefaultValue()` 和 `GetDefaultValueAsSdfType()` 是读取 shader property 基本语义的入口；Sdf 类型转换对 USD attribute authoring 很关键。",
      "`GetOptions()`、`GetHints()`、`GetPage()`、`GetShownIf()`、`GetLabel()` 和 `GetHelp()` 面向用户界面和节点编辑器，通常来自 shader definition 或 discovery metadata。",
      "`CanConnectTo()` 用于判断两个 `SdrShaderProperty` 是否可连接；实际图连接还要结合 node graph、source type、render context 和 renderer 支持能力。",
      "`GetMetadata()` 返回旧式 `SdrTokenMap`，页面说明该路径已被 `SdrShaderPropertyMetadata` 取代；新代码应优先使用 metadata object 语义。",
      "`GetImplementationName()` 与 `GetInfoString()` 适合把 UI 名称、实现侧名称和诊断信息分开处理，避免把展示 label 当成稳定 API 标识。",
    ],
    terms: [
      ["着色器属性", "SdrShaderProperty"],
      ["着色器节点", "SdrShaderNode"],
      ["默认值", "default value"],
      ["Sdf 类型", "Sdf type"],
      ["连接兼容性", "connection compatibility"],
      ["属性元数据", "SdrShaderPropertyMetadata"],
    ],
  },
  {
    output: "full_site/api/class_vt_value_ref.html",
    title: "VtValueRef",
    summary:
      "`VtValueRef` 是非拥有的 type-erased value view，用来在不复制、不分配堆内存、不增加引用计数的情况下读取普通 typed value 或 `VtValue`。它最适合作为函数参数或短生命周期局部变量，不应跨越被引用对象的生命周期。",
    notes: [
      "普通 typed value 和 `VtValue` 可以隐式转换为 `VtValueRef`；这让 API 能接受统一的 value reference，同时避免把所有调用点都包装成 owning `VtValue`。",
      "`Get<T>()`、`GetTypeid()`、`GetTypeName()`、`GetType()` 和 `GetKnownValueTypeIndex()` 提供运行时类型检查和诊断信息；调用 typed get 之前仍应确认类型匹配。",
      "`GetArraySize()` 与 `GetElementTypeid()` 帮助处理数组值；它们描述被引用值的形状，不表示 `VtValueRef` 自己拥有数组存储。",
      "`CanHash()`、`GetHash()`、`CanComposeOver()` 和 `CanTransform()` 表示值是否支持散列、组合或变换等通用操作；这些能力取决于底层类型。",
      "`_Get()`、`_GetMutable()` 和 `_TypeIs()` 是实现侧支撑接口；阅读时重点放在非拥有生命周期约束，避免把 `VtValueRef` 保存到长期容器或异步任务中。",
    ],
    terms: [
      ["非拥有值视图", "non-owning value view"],
      ["类型擦除", "type-erased"],
      ["值引用", "value reference"],
      ["生命周期约束", "lifetime constraint"],
      ["类型标识", "typeid"],
      ["可散列值", "hashable value"],
    ],
  },
  {
    output: "full_site/api/class_vdf_node.html",
    title: "VdfNode",
    summary:
      "`VdfNode` 是 `VdfNetwork` 中所有节点的抽象基类，负责输入/输出规格、连接依赖、dependency mask、调度相关查询和节点身份管理。它属于 Vdf 数据流求值基础设施，不是 USD stage 上的 prim 或 schema。",
    notes: [
      "`_InitializeInputAndOutputSpecs()`、`_AppendInputs()`、`_AppendOutputs()` 和 `_ReplaceInputSpecs()` 说明节点的 input/output specs 是执行图结构的一部分，通常由派生类和网络构建过程维护。",
      "`_ComputeInputDependencyMask()`、`_ComputeOutputDependencyMask()` 与复数版本负责把 request 和连接关系转成依赖掩码；这是调度、缓存失效和局部求值的核心。",
      "`_ComputeInputDependencyRequest()` 与 `_DidAddInputConnection()` 体现节点会响应连接变化并更新依赖请求；阅读时要结合 `VdfConnection`、`VdfOutput` 和网络拓扑理解。",
      "`_SetId()`、`_GetMemoryUsage()` 和 `_IsDerivedEqual()` 面向网络内部标识、内存统计和等价判断；这些不是常规用户层 USD authoring API。",
      "`_AcquireInputAndOutputSpecsPointer()`、`_ReleaseInputAndOutputSpecsPointer()` 和 `_ClearInputAndOutputSpecsPointer()` 表示规格数据有显式生命周期管理，派生实现需要保持图结构一致性。",
    ],
    terms: [
      ["Vdf 抽象节点", "VdfNode"],
      ["数据流网络", "VdfNetwork"],
      ["输入输出规格", "input/output specs"],
      ["依赖掩码", "dependency mask"],
      ["依赖请求", "dependency request"],
      ["连接回调", "connection hook"],
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
