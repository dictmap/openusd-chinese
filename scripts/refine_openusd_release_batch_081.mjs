import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-081";

const refinements = [
  {
    output: "full_site/api/functions_m.html",
    title: "Class Members - M",
    notes: [
      "M 段类成员把 `Make*`、`Map*`、`Match*`、`Merge*`、`Move*` 等命名聚在一起；阅读时应先识别所属模块，再跳转到具体 class 页面确认函数签名。",
      "`SdfPathExpression`、`SdfBooleanExpression`、`SdfPredicateExpression`、`SdfVariableExpression` 和 `SdfPathExpressionEval<DomainType>` 是路径表达式、谓词表达式和变量表达式求值线索，适合和 collection filtering 一起阅读。",
      "`UsdGeomImageable`、`UsdGeomXformable`、`UsdPrim`、`UsdPrimCompositionQueryArc`、`UsdSchemaRegistry` 与 `UsdEditTarget` 是用户常见 USD core/geometry/schema/editing 入口。",
      "`PcpMapExpression`、`PcpMapFunction`、`PcpArc` 和 `PcpDependency` 指向 composition path mapping；这些条目和 `HdChangeTracker`、`HdEmbreeRenderer`、`VdfParallelTaskSync`、`TraceCollector` 只是同属 M 字母桶。",
      "本页的中文说明重点帮助用户区分 expression evaluation、composition mapping、USD scenegraph、Hydra render tracking、Trace/Vdf performance 几类线索，避免把索引页当作连续说明文。"
    ],
    terms: [
      ["path expression", "路径表达式"],
      ["predicate expression", "谓词表达式"],
      ["edit target", "编辑目标"],
      ["map function", "映射函数"],
      ["change tracker", "变化追踪器"],
      ["parallel task sync", "并行任务同步"]
    ]
  },
  {
    output: "full_site/api/functions_vars_o.html",
    title: "Class Members - Variables - O",
    notes: [
      "O 段成员变量页把 `offset`、`origin`、`output`、`override`、`owner` 等变量名聚合在一起；它是变量定位入口，不是按领域组织的 API 章节。",
      "`TfRefPtrTracker::Trace`、`HdxPickHit`、`HdEmbreeInstanceContext`、`HdDisplayStyle` 和 `UsdImagingCreateSceneIndicesInfo` 适合归入 Tf diagnostics、Hydra picking、Embree context 与 imaging setup。",
      "`PcpErrorInvalidReferenceOffset`、`PcpErrorTargetPathBase`、`PcpErrorInvalidAuthoredRelocation`、`PcpErrorInvalidConflictingRelocation` 与 `PcpErrorInvalidSameTargetRelocations::RelocationSource` 是 reference offset 与 relocation 诊断主线。",
      "`ExecUsdValueOverride` 与 `ExecValueOverride` 说明本页包含 OpenExec/Exec value override 入口；它们不应和 `UsdSkelTokensType`、`UsdMediaTokensType`、`UsdVolTokensType` 等 token table 变量混读。",
      "阅读策略是先按变量名定位，再用所属 class 区分 tracing、picking、Pcp error、schema tokens 和 Exec override，最后跳到目标 class 页面查看变量类型。"
    ],
    terms: [
      ["reference pointer trace", "引用指针追踪"],
      ["pick hit", "拾取命中"],
      ["instance context", "实例上下文"],
      ["reference offset", "引用偏移"],
      ["relocation source", "重定位来源"],
      ["value override", "值覆盖"]
    ]
  },
  {
    output: "full_site/api/functions_s.html",
    title: "Class Members - S",
    notes: [
      "S 段类成员数量多且跨域明显，常见前缀包括 `Set*`、`Save*`、`Sample*`、`Scene*`、`Schema*`、`Stage*`；应把它当成导航页而不是单一主题页。",
      "`UsdTimeCode`、`UsdStage`、`SdfLayer`、`SdfNamespaceEdit`、`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat` 与 `SdfUsdFileFormat` 是 USD core 和 Sdf 数据层的高频入口。",
      "`HdEmbree*Sampler`、`HdSceneDelegate`、`HdSceneIndexAdapterSceneDelegate`、`UsdImagingDelegate`、`UsdImagingInstanceAdapter`、`UsdImagingPointInstancerAdapter` 与 `UsdImagingPrimAdapter` 构成 Hydra/Imaging/Embree 渲染和场景委托线索。",
      "`GfVec2*`、`GfVec3*`、`GfVec4*` 是数学向量类型；`UsdPhysicsRigidBodyDesc`、`UsdGeomTokensType`、`UsdSkelTokensType` 则属于物理描述与 schema token，不应因为同在 S 段而混为一类。",
      "本页可作为 stage/layer/file format、scene delegate、sampler、math vectors、schema token 的快速跳转集合；深入解释仍应回到每个 class 的官方文档。"
    ],
    terms: [
      ["scene delegate", "场景委托"],
      ["scene index", "scene index"],
      ["sampler", "采样器"],
      ["file format", "文件格式"],
      ["time code", "时间码"],
      ["schema token", "schema token"]
    ]
  },
  {
    output: "full_site/api/functions_vars_n.html",
    title: "Class Members - Variables - N",
    notes: [
      "N 段成员变量页主要聚合 name、node、network、num、new 等变量名，实际跨越 Tf 内存诊断、Hydra primvar、shader discovery、validation、Pcp changes 和 Vdf scheduling。",
      "`TfMallocTag::CallTree::PathNode` 与 `TfMallocTag::CallStackInfo` 是内存标记、调用树和调用栈诊断入口；这些条目适合和性能/内存定位一起阅读。",
      "`HdPrimvarDescriptor`、`HdStShaderCode::NamedTextureHandle`、`HdxPickHit` 与 `UsdSkelImagingSkelGuideData` 属于 Hydra/Storm/picking/skel imaging 语境。",
      "`UsdUtilsRegisteredVariantSet`、`UsdValidationValidatorMetadata`、`Validator` 与 `SdrShaderNodeDiscoveryResult` 指向 variant set 注册、验证器元数据和 shader node discovery。",
      "`PcpLayerStackChanges`、`PcpDependentNamespaceEdits::CompositionFieldEdit`、`PcpNamespaceEdits::CacheSite`、`SdfNamespaceEdit` 与 `VdfScheduleNode` 表明本页也包含 composition change、namespace edit 和执行调度状态。"
    ],
    terms: [
      ["call tree path node", "调用树路径节点"],
      ["call stack info", "调用栈信息"],
      ["primvar descriptor", "primvar 描述符"],
      ["named texture handle", "具名纹理句柄"],
      ["registered variant set", "已注册变体集"],
      ["layer stack changes", "图层栈变更"]
    ]
  },
  {
    output: "full_site/api/functions_vars_e.html",
    title: "Class Members - Variables - E",
    notes: [
      "E 段成员变量页条目较少，但覆盖 namespace edit、physics joint、Hydra mesh repr、Vt array edit、Pcp errors 和资产路径 flatten 等多个实际入口。",
      "`SdfNamespaceEditDetail`、`PcpDependentNamespaceEdits`、`PcpLayerStackIdentifier` 与 `UsdFlattenResolveAssetPathContext` 应按 namespace/composition/layer stack/asset path 线索阅读。",
      "`UsdPhysicsJointDrive`、`UsdPhysicsJointLimit`、`UsdPhysicsJointDesc` 是物理 joint 描述入口；它们和 `UsdRenderTokensType`、`UsdMediaTokensType`、`UsdTokensType` 只是共享 E 字母变量段。",
      "`HdMeshReprDesc`、`UsdImagingGLEngine::Parameters`、`SdfZipFile::FileInfo` 与 `VtArrayEditBuilder<ELEM>` 分别指向 Hydra mesh representation、imaging 参数、zip 文件信息和数组编辑构造器。",
      "`PcpPrimIndexOutputs`、`PcpErrorBase`、`PcpErrorVariableExpressionError` 是 prim index 输出和变量表达式错误诊断线索，适合跳转到 Pcp error class 页面核对字段。"
    ],
    terms: [
      ["namespace edit detail", "命名空间编辑细节"],
      ["joint limit", "关节限制"],
      ["mesh repr", "网格表示"],
      ["array edit builder", "数组编辑构造器"],
      ["asset path context", "资产路径上下文"],
      ["variable expression error", "变量表达式错误"]
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
