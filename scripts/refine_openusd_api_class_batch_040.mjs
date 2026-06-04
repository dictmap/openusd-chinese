import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-040";

const refinements = [
  {
    output: "full_site/api/class_usd_imaging_delegate.html",
    title: "UsdImagingDelegate Class Reference",
    notes: [
      "`UsdImagingDelegate` 是 Hydra `Hd` core 与 USD scene graph 之间的主要 translation layer，负责把 USD 场景数据转换成 Hydra 可消费的数据访问接口。",
      "页面结构中的 `RigidXformOverridesMap`、`SubdivTags`、`ApplyPendingUpdates()`、path conversion 和各类 `Get*()` 方法说明它同时管理缓存路径、变换覆盖、细分标签、显示目的和几何/材质查询。",
      "`ConvertCachePathToIndexPath()` 与 `ConvertIndexPathToCachePath()` 用来在 imaging cache path 与 render index path 之间映射；这是理解 USD prim 路径和 Hydra prim 路径差异的关键入口。",
      "`GetBasisCurvesTopology()`、`GetCameraParamValue()`、`GetCoordSysBindings()`、`GetDisplayStyle()` 等方法体现 delegate 会把不同 schema 的数据统一暴露给 Hydra。",
      "阅读本页时应把它放在 `UsdImagingAdapterRegistry` 之后理解：registry 负责构造 adapter，delegate 则在 stage/render index 之间汇总和分发数据。"
    ],
    terms: [
      ["translation layer", "转换层"],
      ["Hydra core", "Hydra 核心"],
      ["scene graph", "场景图"],
      ["cache path", "缓存路径"],
      ["render index path", "render index 路径"]
    ]
  },
  {
    output: "full_site/api/class_usd_imaging_nurbs_patch_adapter.html",
    title: "UsdImagingNurbsPatchAdapter Class Reference",
    notes: [
      "`UsdImagingNurbsPatchAdapter` 为 `UsdGeomNurbsPatch` 提供 delegate support，是 USD Imaging 体系中面向 NURBS patch schema 的 prim adapter。",
      "页面结构中的 `Data access` 分组和 `GetPoints()`、`GetTopology()` 表明该 adapter 重点把 NURBS patch 的点数据和拓扑数据暴露给 imaging/Hydra。",
      "`GetImagingSubprims()`、`GetImagingSubprimType()`、`GetImagingSubprimData()` 用于把一个 USD prim 拆成 imaging 层可理解的 subprim 数据。",
      "`Populate()`、`TrackVariability()`、`ProcessPropertyChange()`、`InvalidateImagingSubprim()` 分别对应初始填充、可变性追踪、属性变更处理和 subprim 缓存失效。",
      "本页适合与 `UsdImagingDelegate` 一起读：delegate 负责总的数据交换，adapter 负责具体 schema 类型如何转成 imaging 数据。"
    ],
    terms: [
      ["NURBS patch", "NURBS patch"],
      ["prim adapter", "prim adapter"],
      ["subprim", "imaging 子 prim"],
      ["topology", "拓扑"],
      ["variability", "可变性"]
    ]
  },
  {
    output: "full_site/api/class_usd_lux_disk_light.html",
    title: "UsdLuxDiskLight Class Reference",
    notes: [
      "`UsdLuxDiskLight` 表示从圆盘一侧发光的 light schema；英文摘录说明 disk 位于 XY plane 中心，并沿 -Z axis 发光。",
      "该类的关键自有属性是 `radius`，页面中的 `CreateRadiusAttr()` 和 `GetRadiusAttr()` 用于编写或读取圆盘半径。",
      "`Define()` 与 `Get()` 是 typed schema 常见入口：前者在 stage 上定义 prim，后者从已有 prim/path 获取 schema 包装对象。",
      "`GetSchemaAttributeNames()` 可用于列出该 schema 的属性名；`schemaKind` 则记录它在 schema registry 中的 schema 类型信息。",
      "阅读本页时应区分 `DiskLight` 的形状/发光方向与 `LightAPI` 继承来的强度、曝光、颜色等通用灯光属性；后者通常在父类或 API schema 页面中说明。"
    ],
    terms: [
      ["disk light", "圆盘光"],
      ["XY plane", "XY 平面"],
      ["-Z axis", "-Z 轴"],
      ["radius", "半径"],
      ["typed schema", "typed schema"]
    ]
  },
  {
    output: "full_site/api/class_usd_lux_shaping_a_p_i.html",
    title: "UsdLuxShapingAPI Class Reference",
    notes: [
      "`UsdLuxShapingAPI` 是用于控制 light emission shaping 的 API schema，可应用到支持塑形控制的灯光 prim 上。",
      "页面中的 `Apply()`、`CanApply()` 说明它是一个可应用 API schema；`ConnectableAPI()`、`CreateInput()`、`CreateOutput()` 表明它也参与可连接节点/输入输出语义。",
      "核心塑形属性包括 `shaping:cone:angle`、`shaping:cone:softness`、`shaping:focus`、`shaping:focusTint`，用于控制锥角、边缘柔和度、聚焦和聚焦染色。",
      "IES 相关属性包括 `shaping:ies:file`、`shaping:ies:angleScale`、`shaping:ies:normalize`，用于通过 IES 配光文件影响灯光分布。",
      "本页应与 `UsdLuxDiskLight`、`UsdLuxSphereLight` 等具体 light schema 区分：具体 light 定义发光几何或基础属性，`UsdLuxShapingAPI` 叠加可选的发光塑形控制。"
    ],
    terms: [
      ["shaping API", "塑形 API"],
      ["cone angle", "锥角"],
      ["cone softness", "锥形边缘柔和度"],
      ["focus", "聚焦"],
      ["IES file", "IES 配光文件"]
    ]
  },
  {
    output: "full_site/api/class_usd_physics_joint.html",
    title: "UsdPhysicsJoint Class Reference",
    notes: [
      "`UsdPhysicsJoint` 用于约束 rigid bodies 的运动，可以连接两个 rigid bodies，也可以连接一个 rigid body 与 world。",
      "英文摘录说明默认 joint primitive 定义的是 D6 joint，三个 linear 和三个 angular degrees of freedom 默认都是 free。",
      "`CreateBody0Rel()` 与 `CreateBody1Rel()` 指定 joint 连接的两个 body；如果只有一个 body，另一端可理解为 world 参照。",
      "`CreateLocalPos0Attr()`、`CreateLocalRot0Attr()`、`CreateLocalPos1Attr()`、`CreateLocalRot1Attr()` 描述 joint frame 在两个 body 局部空间中的位置和旋转。",
      "`CreateBreakForceAttr()`、`CreateBreakTorqueAttr()`、`CreateCollisionEnabledAttr()`、`CreateJointEnabledAttr()` 和 `CreateExcludeFromArticulationAttr()` 分别控制断裂阈值、碰撞启用、joint 启用和 articulation 参与方式；默认行为会禁用 jointed bodies 之间的 collision。"
    ],
    terms: [
      ["joint", "关节"],
      ["rigid body", "刚体"],
      ["D6 joint", "D6 关节"],
      ["degrees of freedom", "自由度"],
      ["articulation", "关节链 / articulation"]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(([en, zh]) => `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`)
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文精修导读 / Chinese Reading Notes</h2>
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、关键属性/方法分组和术语对照；英文页面名、类名、方法名、属性名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, key attribute/method groups, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  let html = fs.readFileSync(filePath, "utf8");
  const section = buildSection(item);
  const existing = new RegExp(`    <section data-cn-refinement="${MARKER}">[\\s\\S]*?    <\\/section>\\r?\\n?`);

  if (existing.test(html)) {
    html = html.replace(existing, `${section}\n`);
  } else {
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$&`);
  }

  fs.writeFileSync(filePath, html, "utf8");
  return { output: item.output, notes: item.notes.length, terms: item.terms.length };
}

const results = refinements.map(refreshPage);

console.log(JSON.stringify({
  passed: true,
  marker: MARKER,
  pages_refined: results.length,
  results
}, null, 2));
