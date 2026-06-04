import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-vars-quality-pass-027";

const refinements = [
  {
    output: "full_site/api/functions_vars_r.html",
    title: "Class Members - Variables - R",
    notes: [
      "functions_vars_r.html 是变量索引 R 段，条目横跨 schema tokens、UsdPhysics shape/material/articulation 描述、Hydra/Embree 渲染上下文、Pcp 错误诊断、ArAssetInfo 与 Sdr shader discovery。",
      "UsdVolTokensType、UsdGeomTokensType、UsdRenderTokensType、UsdLuxTokensType、UsdRiTokensType、UsdHydraTokensType、UsdSkelTokensType 与 UsdPhysicsTokensType 都是 token 常量入口；阅读时应先按 schema domain 分组，而不是逐字母串读。",
      "UsdPhysicsCapsuleShapeDesc、UsdPhysicsConeShapeDesc、UsdPhysicsCylinderShapeDesc、UsdPhysicsSphereShapeDesc、UsdPhysicsJointDesc、UsdPhysicsRigidBodyDesc、UsdPhysicsRigidBodyMaterialDesc 与 UsdPhysicsArticulationDesc 构成 physics 描述结构主线。",
      "HdEmbreeConfig、HdEmbreeInstanceContext、HdEmbreePrototypeContext、HdDisplayStyle、HdRenderPassAovBinding、UsdImagingGLEngine::Parameters 与 UsdRenderSpec::Product 属于 Hydra、Embree、AOV 和 render product 相关入口。",
      "PcpErrorArcToProhibitedChild、PcpErrorBase、PcpLayerStackIdentifier、SdfNamespaceEditDetail、TfUtf8CodePoint、ArAssetInfo、SdrShaderNodeDiscoveryResult 与 OptionBase<CRTP> 是跨模块工具与诊断项，中文层将它们单独标出以免和 token 表混淆。"
    ],
    terms: [
      ["schema token table", "schema token 表"],
      ["physics descriptor", "物理描述结构"],
      ["render pass AOV binding", "渲染 pass AOV 绑定"],
      ["asset info", "资产信息"],
      ["prohibited child arc", "禁止子节点组合弧"]
    ]
  },
  {
    output: "full_site/api/functions_vars_s.html",
    title: "Class Members - Variables - S",
    notes: [
      "functions_vars_s.html 是变量索引 S 段，当前最密集的是 UsdGeom schema class 群，同时还包含 SdfNamespaceEdit、UsdSkelBakeSkinningParms、UsdPhysicsRigidBodyDesc、HdMergingSceneIndex::InputScene 和若干 API schema。",
      "UsdGeomBasisCurves、UsdGeomBoundable、UsdGeomCamera、UsdGeomCapsule、UsdGeomCone、UsdGeomCube、UsdGeomCurves、UsdGeomCylinder、UsdGeomGprim、UsdGeomMesh、UsdGeomPointBased、UsdGeomPointInstancer、UsdGeomPoints、UsdGeomScope 与 UsdGeomSphere 等名称必须保持原样，因为它们就是可点击的 Doxygen/API 符号。",
      "这一页不是逐个讲解所有 UsdGeom 类的正文，而是把 S 字母下的 class member variables 收到一个索引入口；中文导读的作用是帮助读者先识别 geometry schema、API schema、scene index、physics/skel 几类上下文。",
      "UsdAPISchemaBase、UsdClipsAPI、UsdCollectionAPI、UsdColorSpaceAPI、UsdColorSpaceDefinitionAPI、UsdGeomModelAPI、UsdGeomMotionAPI 与 UsdGeomPrimvarsAPI 属于 API schema 或辅助 schema；它们和具体几何 prim schema 的角色不同。",
      "SdfNamespaceEdit 表示命名空间编辑动作，HdMergingSceneIndex::InputScene 指向 Hydra scene index 合并输入，UsdSkelBakeSkinningParms 与 UsdPhysicsRigidBodyDesc 则分别属于骨骼烘焙和刚体描述；这些跨域条目应按模块边界阅读。"
    ],
    terms: [
      ["geometry schema", "几何 schema"],
      ["API schema", "API schema"],
      ["scene index input", "scene index 输入"],
      ["namespace edit", "命名空间编辑"],
      ["bake skinning parameters", "蒙皮烘焙参数"]
    ]
  },
  {
    output: "full_site/api/functions_vars_t.html",
    title: "Class Members - Variables - T",
    notes: [
      "functions_vars_t.html 是变量索引 T 段，重点集中在 Pcp error/relocation 诊断、UsdPhysics joint/object 描述、UsdSkel imaging、Hydra subset/texture handle、schema info 和 connection source info。",
      "PcpErrorUnresolvedPrimPath、PcpErrorInvalidAuthoredRelocation、PcpErrorInvalidConflictingRelocation、PcpErrorInvalidReferenceOffset、PcpErrorInvalidSameTargetRelocations、PcpErrorTargetPathBase 与 PcpErrorArcToProhibitedChild 应作为 composition 错误族阅读。",
      "UsdPhysicsJointDrive、UsdPhysicsObjectDesc、UsdPhysicsCapsule1ShapeDesc、UsdPhysicsCylinder1ShapeDesc 与 HdEmbreeConfig 属于物理/渲染实现上下文；它们和 Pcp 错误条目没有同一语义层级。",
      "TfRefPtrTracker::Trace、HdGeomSubset、HdStShaderCode::NamedTextureHandle、PcpArc、PcpNamespaceEdits::LayerStackSite 与 UsdSchemaRegistry::SchemaInfo 是追踪、几何子集、纹理句柄、composition arc、层栈站点和 schema 注册信息入口。",
      "UsdTokensType、UsdRenderSpec::Product、UsdShadeConnectionSourceInfo、UsdSkelImagingSkelData 以及 domain token 表在本页混排；中文层保留英文符号并说明它们只是索引项，具体含义要进入目标 class 页面继续核对。"
    ],
    terms: [
      ["unresolved prim path", "未解析 Prim 路径"],
      ["relocation diagnostic", "重定位诊断"],
      ["joint drive", "关节驱动"],
      ["named texture handle", "命名纹理句柄"],
      ["connection source info", "连接源信息"]
    ]
  },
  {
    output: "full_site/api/functions_vars_u.html",
    title: "Class Members - Variables - U",
    notes: [
      "functions_vars_u.html 是变量索引 U 段，条目数量不多，但覆盖 SdfZipFile::FileInfo、GfRange、Pcp dependency/error、UsdSkelBakeSkinningParms、Sdr discovery、imaging property mapping、Hydra mesh repr 和 Embree 配置。",
      "SdfZipFile::FileInfo 用于 zip/package 文件里的条目信息；GfRange2d、GfRange2f、GfRange3d、GfRange3f 表示几何数学范围对象，保留英文 class 名可以避免和普通中文“范围”混淆。",
      "PcpCulledDependency 与 PcpErrorUnresolvedPrimPath 属于 composition 依赖裁剪和 prim path 错误诊断；它们应和 shader discovery 或 Hydra mesh repr 条目分开理解。",
      "UsdImagingDataSourceMapped::PropertyMappingBase、HdMeshReprDesc、HdEmbreeConfig 与 UsdHydraTokensType 指向 imaging/Hydra 渲染管线里的属性映射、网格表示描述、Embree 配置和 token 常量。",
      "UsdSkelBakeSkinningParms 与 SdrShaderNodeDiscoveryResult 是本页中最容易被忽略的跨域条目，前者服务 skel bake skinning，后者服务 shader node discovery，二者都不是普通变量说明。"
    ],
    terms: [
      ["zip file info", "zip 文件条目信息"],
      ["math range", "数学范围"],
      ["culled dependency", "被裁剪依赖"],
      ["property mapping", "属性映射"],
      ["mesh representation descriptor", "网格表示描述"]
    ]
  },
  {
    output: "full_site/api/functions_vars_v.html",
    title: "Class Members - Variables - V",
    notes: [
      "functions_vars_v.html 是变量索引 V 段，页面较短，但仍混合了 App、ConfigBase、ExecUsdValueOverride、ExecValueOverride、UsdMtlxUsdTypeInfo、ArAssetInfo、SdrShaderNodeDiscoveryResult、UsdSchemaRegistry::SchemaInfo 和多组 schema token。",
      "ExecUsdValueOverride 与 ExecValueOverride 是执行系统中的 value override 入口；它们应该与 App/ConfigBase 这类命令行或配置基类条目区分开。",
      "UsdMtlxUsdTypeInfo 表示 MaterialX 与 USD 类型映射相关信息，SdrShaderNodeDiscoveryResult 负责 shader node discovery 结果，UsdSchemaRegistry::SchemaInfo 则指向 schema 注册表元数据。",
      "UsdRiTokensType、UsdGeomTokensType、UsdVolTokensType、UsdShadeTokensType 与 UsdLuxTokensType 是 domain token 表，不翻译 API 名称；中文只解释它们分别属于 RenderMan、geometry、volume、shading 和 lighting 领域。",
      "由于本页英文原文和符号密度高，中文导读特意按执行系统、类型映射、资产信息、shader discovery、schema registry、domain tokens 分组，避免用户误以为 V 段只有一个笼统变量列表。"
    ],
    terms: [
      ["value override", "值覆盖"],
      ["MaterialX USD type info", "MaterialX/USD 类型信息"],
      ["schema registry info", "schema 注册表信息"],
      ["shader node discovery", "shader 节点发现"],
      ["domain token table", "领域 token 表"]
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
