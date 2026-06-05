import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-083";

const refinements = [
  {
    output: "full_site/api/functions_func_c.html",
    title: "Class Members - Functions - C",
    notes: [
      "这是函数成员索引的 C 字母页，常见语义包括 create、compute、compose、connect、copy、clear、contains；它用于函数定位，不等同于 C 字母模块教程。",
      "`PcpPrimIndexInputs`、`SdfPathPattern`、`SdfLayer` 与 `UsdCollectionAPI` 指向 composition、路径模式、layer 和 collection 相关函数，应按 scene description 与 collection filtering 线索阅读。",
      "`TraceEventList`、`TraceAggregateNode`、`VdfTypeDispatchTable<Fn>` 和 `CallbackNodeType` 属于性能追踪、类型分发或执行回调支撑；它们和 schema API 条目只是共享 C 段。",
      "`CameraUtilFraming`、`CameraUtilScreenWindowParameters` 面向相机取景和 screen window 参数；`HdBasisCurvesTopology` 则偏 Hydra 几何拓扑。",
      "本页列出大量 applied API schema 的 create/compute 类函数入口，例如 `UsdColorSpaceAPI`、`UsdGeomMotionAPI`、`UsdLuxLightAPI`、`UsdPhysicsRigidBodyAPI`；阅读时应跳转到具体 API schema 页面确认适用 prim 和属性。"
    ],
    terms: [
      ["function index", "函数索引"],
      ["prim index inputs", "prim index 输入"],
      ["path pattern", "路径模式"],
      ["type dispatch table", "类型分发表"],
      ["camera framing", "相机取景"],
      ["applied API schema", "可应用 API schema"]
    ]
  },
  {
    output: "full_site/api/functions_vars_h.html",
    title: "Class Members - Variables - H",
    notes: [
      "H 段成员变量页较短，但仍跨越 UsdVol token、UsdPhysics shape descriptors、Hydra texture handle、composition filter 和 imaging property mapping。",
      "`UsdPhysicsCubeShapeDesc`、`UsdPhysicsCapsule1ShapeDesc`、`UsdPhysicsCapsuleShapeDesc`、`UsdPhysicsConeShapeDesc`、`UsdPhysicsCylinder1ShapeDesc` 和 `UsdPhysicsCylinderShapeDesc` 是物理 shape descriptor 变量入口。",
      "`HdStShaderCode::NamedTextureHandle` 是 Storm shader code 的命名纹理句柄线索，适合回到 Hydra/Storm shader 相关类页核对字段含义。",
      "`UsdPrimCompositionQuery::Filter` 与 `TsRegressionPreventer::SetResult` 分别指向 composition query 过滤和 spline regression 结果，不属于 UsdPhysics 或 token table。",
      "`UsdImagingDataSourceMapped::PropertyMappingBase` 与 `UsdGeomTokensType`、`UsdUITokensType`、`UsdHydraTokensType` 显示本页也包含 imaging property mapping 和多个 schema token 集合。"
    ],
    terms: [
      ["member variables", "成员变量"],
      ["shape descriptor", "形状描述结构"],
      ["named texture handle", "具名纹理句柄"],
      ["composition query filter", "组合查询过滤器"],
      ["property mapping", "属性映射"],
      ["token table", "token 表"]
    ]
  },
  {
    output: "full_site/api/functions_func_h.html",
    title: "Class Members - Functions - H",
    notes: [
      "这是 H 段函数成员索引，函数名常围绕 `Has*`、`Handle*`、`Hold*`、`Hash*` 展开；本页需要按 Sdf/Pcp/Usd/Hydra/Shade/Skel 分区阅读。",
      "`SdfAbstractData`、`SdfChildrenView`、`SdfData`、`SdfPrimSpec`、`SdfAttributeSpec`、`SdfLayer` 是 scene description 数据结构和 layer 访问线索。",
      "`PcpCache`、`PcpPrimIndex` 和 `UsdNotice::ObjectsChanged` 应归入 composition cache、prim index 和对象变更通知；它们常用于理解变化传播和索引重建。",
      "`UsdPrim`、`UsdObject`、`UsdAttribute`、`UsdProperty`、`UsdRelationship`、`UsdStage`、`UsdVariantSet`、`UsdResolveInfo` 与 `UsdAttributeQuery` 是用户常见的 USD object model 查询入口。",
      "`UsdShadeConnectableAPI`、`UsdShadeInput`、`UsdShadeOutput`、`UsdSkelSkeletonQuery`、`UsdSkelSkinningQuery`、`HdRenderParam`、`HgiShaderSection` 和 `VdfExecutorInterface` 表明 H 段还跨越 shading、skinning、render param 和 execution support。"
    ],
    terms: [
      ["scene description data", "场景描述数据"],
      ["composition cache", "组合缓存"],
      ["object change notice", "对象变更通知"],
      ["object model", "对象模型"],
      ["connectable API", "可连接 API"],
      ["skinning query", "蒙皮查询"]
    ]
  },
  {
    output: "full_site/api/functions_vars_r.html",
    title: "Class Members - Variables - R",
    notes: [
      "R 段成员变量页横跨 token tables、UsdPhysics descriptors、Hydra/Embree render context、Pcp diagnostics、Ar asset metadata 和 Sdr shader discovery。",
      "`UsdVolTokensType`、`UsdGeomTokensType`、`UsdRenderTokensType`、`UsdLuxTokensType`、`UsdRiTokensType`、`UsdHydraTokensType`、`UsdSkelTokensType` 与 `UsdPhysicsTokensType` 应先按 schema domain 分组。",
      "`UsdPhysicsCapsuleShapeDesc`、`UsdPhysicsConeShapeDesc`、`UsdPhysicsCylinderShapeDesc`、`UsdPhysicsSphereShapeDesc`、`UsdPhysicsJointDesc`、`UsdPhysicsRigidBodyDesc`、`UsdPhysicsRigidBodyMaterialDesc` 与 `UsdPhysicsArticulationDesc` 构成 physics descriptor 主线。",
      "`HdEmbreeConfig`、`HdEmbreeInstanceContext`、`HdEmbreePrototypeContext`、`HdDisplayStyle`、`HdRenderPassAovBinding`、`UsdImagingGLEngine::Parameters` 与 `UsdRenderSpec::Product` 属于 Hydra/Embree/AOV/render product。",
      "`PcpErrorArcToProhibitedChild`、`PcpErrorBase`、`PcpLayerStackIdentifier`、`SdfNamespaceEditDetail`、`TfUtf8CodePoint`、`ArAssetInfo`、`SdrShaderNodeDiscoveryResult` 与 `OptionBase<CRTP>` 是跨模块诊断和工具条目，中文层单独标出以避免和 token 表混淆。"
    ],
    terms: [
      ["schema token table", "schema token 表"],
      ["physics descriptor", "物理描述结构"],
      ["AOV binding", "AOV 绑定"],
      ["render product", "渲染产品"],
      ["asset metadata", "资产元数据"],
      ["prohibited child arc", "禁止子节点组合弧"]
    ]
  },
  {
    output: "full_site/api/functions.html",
    title: "Class Members",
    notes: [
      "`functions.html` 是 Class Members 总索引入口，本页当前对应符号/下划线分组；它不是完整 API 目录的替代品，而是进入具体字母页和类成员条目的根节点。",
      "`VdfExtensibleNode`、`VdfNode`、`VdfConnectorSpecs<T>`、`VdfExecutionStats`、`VdfScheduler`、`VdfDatalessExecutor`、`VdfExecutorInterface`、`VdfDataManagerBasedExecutor` 构成 Vdf computation graph 与 execution system 主线。",
      "`HdStDispatchBuffer`、`HdStTextureObject`、`HdStInterleavedMemoryManager::_StripedInterleavedBuffer`、`HdStVBOMemoryManager::_StripedBufferArray`、`HdBufferSource`、`HdVtBufferSource` 与 `HdStExtComp*` 属于 Hydra/Storm buffer、VBO、texture 和 ext computation。",
      "`HdGpSceneIndexPlugin`、`HdPrman_*SceneIndexPlugin`、`HdSceneIndexPlugin`、`HdSceneIndexPluginRegistry`、`HdsiDebuggingSceneIndexPlugin` 是 scene index plugin 与 registry 相关入口。",
      "`TraceCounterAccumulator`、`TraceReporterBase`、`TfEnum`、`ArResolver`、`UsdShadeConnectableAPIBehavior`、`SdfUsdaFileFormat`、`ExecSystem`、`EfMaskedSubExecutor`、`HfPluginRegistry` 与 `GfColor` 说明总索引跨越 trace、Tf、Ar、UsdShade、Sdf、Exec/Ef、plugin registry 和 Gf 基础类型。"
    ],
    terms: [
      ["member index root", "成员索引总入口"],
      ["computation graph", "计算图"],
      ["execution system", "执行系统"],
      ["VBO memory", "VBO 内存"],
      ["scene index plugin", "scene index 插件"],
      ["plugin registry", "插件注册表"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引页二次精修说明，重点解释 Doxygen 字母桶的阅读方式、跨模块条目的归类边界，以及何时应跳转到目标 class 或 schema 文档。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index page. It explains how to read Doxygen letter buckets, how to group cross-module entries, and when to jump to the target class or schema documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
