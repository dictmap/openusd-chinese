import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-142";

const refinements = [
  {
    output: "full_site/api/class_usd_attribute_limits.html",
    title: "UsdAttributeLimits",
    summary:
      "`UsdAttributeLimits` 用于读取和 author `UsdAttribute` 上 `limits` dictionary metadata 的某个 sub-dictionary。它把 minimum、maximum、soft limits、hard limits 等范围信息组织在 `UsdLimitsKeys->Minimum` 与 `UsdLimitsKeys->Maximum` 等 key 下。",
    notes: [
      "`GetMinimum()`、`GetMaximum()`、`GetMinimumOr()` 与 `GetMaximumOr()` 用于读取范围值；带 `Or` 的版本可在没有 authored value 时提供 fallback。",
      "`HasAuthoredMinimum()`、`HasAuthoredMaximum()` 与 `HasAuthored()` 用于判断是否存在 authored opinion，适合区分默认 fallback 与实际写入的限制。",
      "`ClearMinimum()`、`ClearMaximum()` 与 `Clear()` 负责清除对应 metadata opinion；使用时应确认清除的是 soft/hard sub-dictionary 中哪一层限制。",
      "`GetSubDictKey()` 表示当前对象操作的是 `limits` dictionary 里的哪一个 sub-dictionary，例如 soft limits 或 hard limits 的约定键。",
      "`IsValid()` 与 `GetAttribute()` 帮助调用方确认 wrapper 是否绑定到有效 `UsdAttribute`；不要把 limits metadata 当成运行时数值 clamp 或物理约束求解器。",
    ],
    terms: [
      ["属性限制", "attribute limits"],
      ["限制字典元数据", "limits dictionary metadata"],
      ["子字典", "sub-dictionary"],
      ["最小值", "Minimum"],
      ["最大值", "Maximum"],
      ["已写入意见", "authored opinion"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_basis_curves.html",
    title: "UsdGeomBasisCurves",
    summary:
      "`UsdGeomBasisCurves` 是 batched curve representation，类似 RIB 的 Basis/Curves 表达，常用于 hair、grass 等密集曲线集合。它通过 `curveVertexCounts`、basis、type、segment indexing 和 interpolation 规则描述多条曲线的数据布局。",
    notes: [
      "`curveVertexCounts` 的长度隐式决定 prim 中有多少条 curves，每个元素给出对应 curve 的 vertex 数量；这直接影响 segment count 和数据尺寸计算。",
      "`basis` attribute 对 cubic curves 有意义，配合 matrix 和 vstep 插值顶点；对 linear `BasisCurves` 通常不使用 basis。",
      "`ComputeSegmentCounts()`、`ComputeUniformDataSize()`、`ComputeVaryingDataSize()` 与 `ComputeVertexDataSize()` 是理解 primvar interpolation 数据大小的关键 helper。",
      "页面的 `Segment Indexing`、`Cubic Vertex Interpolation`、`Linear Vertex Interpolation` 和 `Primvar Interpolation` 小节应一起阅读，避免把 curve vertex、segment 和 primvar sample 混淆。",
      "`Tubes and Ribbons` 说明曲线渲染形态；它影响渲染解释和宽度/法线相关数据，而不是改变 USD 中 curve topology 的基本定义。",
    ],
    terms: [
      ["基函数曲线", "BasisCurves"],
      ["批量曲线表示", "batched curve representation"],
      ["曲线顶点计数", "curveVertexCounts"],
      ["线段索引", "segment indexing"],
      ["曲线基函数", "basis"],
      ["primvar 插值", "primvar interpolation"],
    ],
  },
  {
    output: "full_site/api/class_usd_imaging_delegate.html",
    title: "UsdImagingDelegate",
    summary:
      "`UsdImagingDelegate` 是 Hydra core 与 USD scene graph 之间的 primary translation layer。它把 `UsdPrim`、topology、primvars、materials、instancing、visibility、display purpose 和 time-varying data 翻译成 Hydra render index 可同步的数据。",
    notes: [
      "`ApplyPendingUpdates()` 将 USD 侧检测到的变更推入 Hydra 数据结构，适合与 change processing、dirty bits 和 render index 同步流程一起理解。",
      "`ConvertCachePathToIndexPath()` 与 `ConvertIndexPathToCachePath()` 说明 delegate 同时维护 USD/cache 路径和 Hydra index 路径之间的映射。",
      "`GetBasisCurvesTopology()`、`GetMeshTopology()` 类拓扑查询与 `GetIndexedPrimvar()`、primvar descriptors 一起构成几何数据输入路径。",
      "`GetDisplayGuides()`、`GetDisplayProxy()`、`GetDisplayRender()` 与 `GetPurpose()` 相关接口用于 USD purpose/display filtering，不等同于 renderer backend 的 draw state。",
      "`GetCurrentTimeSamplingInterval()` 与 `UsdTimeCode` 相关查询体现该 delegate 需要处理 animated values 和 time sampling；调试闪烁或延迟更新时要核对时间上下文。",
    ],
    terms: [
      ["USD 成像代理", "UsdImagingDelegate"],
      ["翻译层", "translation layer"],
      ["Hydra 核心", "Hydra core"],
      ["渲染索引", "HdRenderIndex"],
      ["路径映射", "path conversion"],
      ["用途过滤", "purpose filtering"],
    ],
  },
  {
    output: "full_site/api/class_usd_physics_joint.html",
    title: "UsdPhysicsJoint",
    summary:
      "`UsdPhysicsJoint` 表示约束 rigid bodies 运动的物理关节。它可以连接两个 rigid bodies，也可以连接一个 rigid body 与 world；默认 joint primitive 定义 D6 joint，三个 linear 和三个 angular degrees of freedom 初始均为 free。",
    notes: [
      "`CreateBody0Rel()` 与 `CreateBody1Rel()` author 两端 rigid body relationship；如果一端为空或指向 world，需要明确物理后端如何解释。",
      "`CreateLocalPos0Attr()`、`CreateLocalPos1Attr()`、`CreateLocalRot0Attr()` 与 `CreateLocalRot1Attr()` 定义 joint frame 在两端 body 局部空间中的位置和旋转。",
      "`CreateBreakForceAttr()` 与 `CreateBreakTorqueAttr()` 表示关节可断裂阈值；它们是 authoring metadata/attributes，具体求解行为由物理运行时解释。",
      "`CreateCollisionEnabledAttr()` 控制 jointed bodies 之间是否允许碰撞；英文摘录提示默认行为是禁用相连物体之间的 collision。",
      "`CreateExcludeFromArticulationAttr()` 和 `CreateJointEnabledAttr()` 分别影响 articulation 参与和关节启用状态，应与 physics schema、rigid body API 和模拟后端规则一起核对。",
    ],
    terms: [
      ["物理关节", "UsdPhysicsJoint"],
      ["刚体", "rigid body"],
      ["D6 关节", "D6 joint"],
      ["局部关节坐标系", "local joint frame"],
      ["断裂力", "break force"],
      ["碰撞启用", "collision enabled"],
    ],
  },
  {
    output: "full_site/api/class_sdr_shader_property.html",
    title: "SdrShaderProperty",
    summary:
      "`SdrShaderProperty` 表示 `SdrShaderNode` 中的一个 property，可以是 input 或 output。它必须有 name 和 type，也可以附带 default value、metadata、hints、options、label、help、page、shown-if 规则以及 connection compatibility 信息。",
    notes: [
      "`GetType()` 与 `GetTypeAsSdfType()` 分别提供 shader registry 侧类型和 USD/Sdf 值类型视角；类型转换时要关注 `SdrSdfTypeIndicator`。",
      "`GetDefaultValue()` 与 `GetDefaultValueAsSdfType()` 用于读取默认值，后者更适合需要与 USD authored value 对齐的工具链。",
      "`GetMetadata()`、`GetMetadataObject()` 与 `SdrShaderPropertyMetadata` 承载 renderer/shader UI 或实现相关信息；旧的 `SdrTokenMap` metadata 已被标记为 deprecated。",
      "`CanConnectTo()` 用于判断另一个 `SdrShaderProperty` 是否可连接，通常要同时考虑 input/output 方向、type compatibility 和 shader node 约定。",
      "`GetHints()`、`GetOptions()`、`GetShownIf()`、`GetPage()` 与 `GetLabel()` 面向 UI/authoring 体验，帮助工具构建 shader 参数面板，而不是直接执行 shading computation。",
    ],
    terms: [
      ["着色器属性", "SdrShaderProperty"],
      ["着色器节点", "SdrShaderNode"],
      ["默认值", "default value"],
      ["Sdr 元数据", "SdrShaderPropertyMetadata"],
      ["连接兼容性", "CanConnectTo()"],
      ["显示条件", "shown-if"],
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
