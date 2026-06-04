import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-vars-quality-pass-024";

const refinements = [
  {
    output: "full_site/api/functions_vars_c.html",
    title: "Class Members - Variables - C",
    notes: [
      "functions_vars_c.html 是变量索引 C 段，条目覆盖 Pcp namespace edit cache site、TfMallocTag call tree、多个 schema token table、Hydra/AOV 配置、physics desc 和 Pcp error。",
      "UsdGeom/UsdRender/UsdVol/UsdRi/UsdHydra/UsdSkel/UsdUI/UsdLux/UsdPhysics/UsdMtlx/UsdShade TokensType 说明本页大量变量是 schema token 常量，应保留原 API 名称并按 domain 归类。",
      "HdAovDescriptor、HdRenderPassAovBinding、HdCommandDescriptor、HdMeshReprDesc、HdEmbreeConfig 和 UsdRenderSpec::Product 偏渲染、AOV、Hydra command 和 render product 配置。",
      "PcpErrorInconsistentPropertyType、PcpErrorInconsistentAttributeType、PcpErrorInconsistentAttributeVariability、PcpErrorInvalidConflictingRelocation、PcpErrorVariableExpressionError 与 PcpPrimIndexOutputs 是 composition 诊断和 prim index 输出入口。"
    ],
    terms: [
      ["cache site", "缓存位置"],
      ["call tree", "调用树"],
      ["AOV descriptor", "AOV 描述符"],
      ["composition diagnostic", "组合诊断"],
      ["weight slot", "权重槽"]
    ]
  },
  {
    output: "full_site/api/functions_vars_d.html",
    title: "Class Members - Variables - D",
    notes: [
      "functions_vars_d.html 是变量索引 D 段，覆盖 UsdPhysicsJointDrive、RenderVar、CameraUtil/GfCamera、HdStVolume、thread mutex、Pcp error/change、render buffer、shader discovery 和 validation metadata。",
      "UsdRenderSpec::RenderVar、UsdRenderTokensType、HdRenderBufferDescriptor、HdDisplayStyle、HdMeshReprDesc 和 SdrShaderNodeDiscoveryResult 指向渲染变量、buffer 描述、显示样式和 shader discovery 相关变量。",
      "TfSpinMutex、TfSpinRWMutex 是 Tf 低层同步原语；PcpLayerStackChanges、PcpCacheChanges、PcpDependentNamespaceEdits 与 PcpErrorInconsistent* 则偏 composition 变更和错误状态。",
      "UsdSkelBakeSkinningParms、UsdPhysicsRigidBodyMaterialDesc、UsdValidationValidatorMetadata、HdxPickHit、HgiMipInfo 等条目说明本页跨越 skel baking、physics material、validation、pick hit 和 GPU mip 信息。"
    ],
    terms: [
      ["render var", "渲染变量"],
      ["spin mutex", "自旋互斥锁"],
      ["cache changes", "缓存变更"],
      ["pick hit", "拾取命中"],
      ["validator metadata", "验证器元数据"]
    ]
  },
  {
    output: "full_site/api/functions_vars_e.html",
    title: "Class Members - Variables - E",
    notes: [
      "functions_vars_e.html 是变量索引 E 段，条目较少但集中在 UsdGeom token、Sdf namespace edit detail、physics joint/limit、Hydra mesh repr、VtArray edit builder 和 Pcp error/layer stack。",
      "SdfNamespaceEditDetail、PcpDependentNamespaceEdits、PcpLayerStackIdentifier 与 UsdFlattenResolveAssetPathContext 属于 namespace edit、composition layer stack 和资产路径 flatten 语境。",
      "UsdPhysicsJointDrive、UsdPhysicsJointLimit、UsdPhysicsJointDesc 与 UsdRenderTokensType、UsdMediaTokensType、UsdTokensType 混列；中文层按 physics、render/media token 和 USD core token 分开阅读。",
      "VtArrayEditBuilder<ELEM> 与 PcpPrimIndexOutputs、PcpErrorBase、PcpErrorVariableExpressionError 说明本页也包含数组编辑构造器、prim index 输出和变量表达式错误入口。"
    ],
    terms: [
      ["namespace edit detail", "命名空间编辑细节"],
      ["joint limit", "关节限制"],
      ["array edit builder", "数组编辑构造器"],
      ["asset path context", "资产路径上下文"],
      ["layer stack identifier", "层栈标识符"]
    ]
  },
  {
    output: "full_site/api/functions_vars_f.html",
    title: "Class Members - Variables - F",
    notes: [
      "functions_vars_f.html 是变量索引 F 段，覆盖 UsdImaging data source mapping、schema registry、Pcp composition field edit、physics articulation/rigid body/shape/collision group、Hydra display/AOV/render buffer 和 validator。",
      "UsdImagingDataSourceMapped::AttributeMapping 与 RelationshipMapping 是 imaging data source 到属性/关系映射的入口；UsdSchemaRegistry::SchemaInfo 用于 schema registry 元数据。",
      "UsdPhysicsArticulationDesc、UsdPhysicsRigidBodyDesc、UsdPhysicsShapeDesc、UsdPhysicsCollisionGroupDesc、UsdPhysicsJointDrive 与 UsdPhysicsTokensType 构成本页 physics 变量主线。",
      "PcpDependentNamespaceEdits::CompositionFieldEdit、PcpCulledDependency、SdrShaderNodeDiscoveryResult、HdDisplayStyle、HdMeshReprDesc、HdAovDescriptor 和 HdRenderBufferDescriptor 分别指向 composition edit、shader discovery 与 Hydra render state。"
    ],
    terms: [
      ["attribute mapping", "属性映射"],
      ["relationship mapping", "关系映射"],
      ["composition field edit", "组合字段编辑"],
      ["articulation descriptor", "关节系统描述结构"],
      ["collision group descriptor", "碰撞组描述结构"]
    ]
  },
  {
    output: "full_site/api/functions_vars_g.html",
    title: "Class Members - Variables - G",
    notes: [
      "functions_vars_g.html 是变量索引 G 段，当前条目很短，主要包含 UsdMedia/UsdProc/UsdLux/UsdGeom token、HdMeshReprDesc、UsdImagingGLEngine::Parameters、UsdPhysicsSceneDesc、App 和 OptionBase<CRTP>。",
      "UsdMediaTokensType、UsdProcTokensType、UsdLuxTokensType、UsdGeomTokensType 是 schema token 常量入口；这些名称要保留英文原名，便于与 token 表和 class 页面互相跳转。",
      "UsdPhysicsSceneDesc 指向物理场景描述结构；HdMeshReprDesc 和 UsdImagingGLEngine::Parameters 指向 Hydra/imaging 表示与 GL engine 参数。",
      "App 与 OptionBase<CRTP> 表明变量索引也可能包含 CLI/app 框架条目；本页中文层只做分类提示，具体变量含义仍需进入对应 API 页面核对。"
    ],
    terms: [
      ["physics scene descriptor", "物理场景描述结构"],
      ["mesh repr", "网格表示"],
      ["GL engine parameters", "GL 引擎参数"],
      ["schema token", "schema token"],
      ["CRTP option base", "CRTP 选项基类"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的变量索引用法、模块边界和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first variable-index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
