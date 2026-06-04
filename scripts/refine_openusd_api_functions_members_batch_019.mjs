import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-members-quality-pass-019";

const refinements = [
  {
    output: "full_site/api/functions_g.html",
    title: "Class Members - G",
    notes: [
      "functions_g.html 是 Class Members 总索引的 G 段，不只包含函数成员，还可能链接到 token 结构、类、资源注册表和矩阵类型；阅读时应先按模块分组。",
      "HdBufferArray、HdInstanceRegistry、HdResourceRegistry、HdStBufferArrayRegistry、HdStDispatchBuffer 和 HdSt*Buffer 条目指向 Hydra/HdSt 的 GPU buffer、instance 和资源管理路径。",
      "Hgi、HgiGL、HgiGLDevice、HgiBlitCmds、HgiGLBlitCmds 与 HdStResourceRegistry 偏底层图形接口；这些入口通常用于理解 Hydra 后端如何提交 blit、device 和 resource 操作。",
      "UsdMediaTokensType、UsdProcTokensType、UsdLuxTokensType、UsdGeomTokensType、ArResolverContext、Ef_PageCache、Exec_CacheView、GfMatrix2/3/4d/f 等条目覆盖 schema token、资产解析上下文、执行缓存和数学矩阵。"
    ],
    terms: [
      ["Class Members index", "类成员索引"],
      ["resource registry", "资源注册表"],
      ["buffer array", "缓冲数组"],
      ["graphics interface", "图形接口"],
      ["matrix type", "矩阵类型"]
    ]
  },
  {
    output: "full_site/api/functions_h.html",
    title: "Class Members - H",
    notes: [
      "functions_h.html 是 H 段类成员索引，条目横跨 usdVol token、UsdPhysics shape desc、Sdf 数据层、Tf 诊断、Pcp composition、Usd 对象和 UsdSkel 查询。",
      "UsdPhysicsCubeShapeDesc、CapsuleShapeDesc、ConeShapeDesc、CylinderShapeDesc 等条目是物理 shape 描述入口；它们和 UsdVolTokensType、UsdGeomBBoxCache、UsdSkelSkeletonQuery 不属于同一模块。",
      "SdfAbstractData、SdfChildrenView、SdfData、SdfPrimSpec、SdfAttributeSpec 与 PcpCache / PcpPrimIndex 组成 scene description 数据层和 composition 索引线索。",
      "UsdPrim、UsdObject、UsdAttribute、UsdProperty、UsdRelationship、UsdAttributeQuery、UsdResolveInfo、UsdVariantSet 和 UsdGeomPrimvar 是用户常见 API；HdRenderParam、HdStRenderParam、HgiShaderSection 和 VdfExecutorInterface 则偏渲染与执行。"
    ],
    terms: [
      ["shape descriptor", "形状描述结构"],
      ["diagnostic manager", "诊断管理器"],
      ["prim index", "Prim 索引"],
      ["attribute query", "属性查询"],
      ["variant set", "变体集"]
    ]
  },
  {
    output: "full_site/api/functions_i.html",
    title: "Class Members - I",
    notes: [
      "functions_i.html 是 I 段类成员索引，常见语义包括 id/index/include/insert/instance 等；本页实际覆盖 schema token、stage cache、Pcp map、CLI option、UsdGeom/UsdRender、Hydra buffer 和 Sdf namespace edit。",
      "UsdStageCache::Id、UsdSchemaRegistry::SchemaInfo、SdrShaderNodeDiscoveryResult、UsdRenderTokensType、UsdHydraTokensType、UsdGeomTokensType、UsdLuxTokensType 等条目适合从类型元数据和 token/schema 方向阅读。",
      "PcpMapExpression、PcpMapFunction、PcpPrimIndexInputs、PcpDependency、UsdStagePopulationMask、UsdCollectionAPI、UsdPrimRange 和 SdfNamespaceEdit 指向 composition、population mask、集合与命名空间编辑。",
      "HdBufferArray、HdBufferArrayRange、HdSt*BufferRange、HdPrimvarDescriptor、HdPerfLog、HdStRenderParam 与 HioImage 则偏 Hydra buffer、primvar 描述、性能日志和图像 IO；中文导读保留英文符号，方便定位实际类页。"
    ],
    terms: [
      ["stage cache id", "Stage 缓存 ID"],
      ["schema info", "Schema 信息"],
      ["population mask", "加载人口遮罩"],
      ["namespace edit", "命名空间编辑"],
      ["primvar descriptor", "Primvar 描述符"]
    ]
  },
  {
    output: "full_site/api/functions_j.html",
    title: "Class Members - J",
    notes: [
      "functions_j.html 是 J 段类成员索引，当前条目很少，主要集中在 HdEmbreeConfig、CLI OptionBase、SdfPath、UsdPhysics joint desc、UsdSkel token/query 和 JSON 辅助类型。",
      "UsdPhysicsD6JointDesc、UsdPhysicsJointDesc 和 UsdPhysicsCustomTokens 指向 physics joint 相关结构或 token 解析，阅读时应和 rigid body、shape desc 页面分开。",
      "UsdSkelTokensType 与 UsdSkelAnimQuery 属于骨骼动画和 skel 查询入口；SdfPath 仍是路径语义基础类型，CLI OptionBase 属于命令行参数框架。",
      "JsValue 与 JsWriter 是 JSON 值和写出辅助类型；本页短索引的价值在于快速定位这些少量 J 段入口，而不是展开成完整模块教程。"
    ],
    terms: [
      ["joint descriptor", "关节描述结构"],
      ["skeleton query", "骨骼查询"],
      ["JSON value", "JSON 值"],
      ["JSON writer", "JSON 写出器"],
      ["path object", "路径对象"]
    ]
  },
  {
    output: "full_site/api/functions_k.html",
    title: "Class Members - K",
    notes: [
      "functions_k.html 是 K 段类成员索引，条目较少，集中在 SdfChildrenView、SdfNotice::LayerInfoDidChange、TfNotice、UsdValidation metadata、UsdPhysics token、HioGlslfxResourceLayout、SdfPredicateExpression::FnCall 和 schema/model API。",
      "SdfChildrenView 与 SdfNotice::LayerInfoDidChange 是 Sdf 数据访问和 layer info 通知入口；TfNotice 是更通用的通知机制基础类，阅读时应注意通知类型和监听生命周期。",
      "UsdValidationValidatorMetadata、UsdPhysicsTokensType、UsdPhysicsRigidBodyDesc 与 UsdModelAPI 说明本页还横跨验证框架、physics token/rigid body 描述和 model API。",
      "HioGlslfxResourceLayout、SdfPredicateExpression::FnCall、UsdSchemaRegistry::SchemaInfo、UsdGeomTokensType 则提供 shader resource layout、谓词表达式函数调用、schema 信息和几何 token 的跳转线索。"
    ],
    terms: [
      ["children view", "子项视图"],
      ["layer info notice", "图层信息通知"],
      ["validator metadata", "验证器元数据"],
      ["resource layout", "资源布局"],
      ["predicate function call", "谓词函数调用"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类成员索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class-member index notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
