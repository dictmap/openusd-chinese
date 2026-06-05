import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-082";

const refinements = [
  {
    output: "full_site/api/functions_rela_o.html",
    title: "Class Members - Related Functions - O",
    notes: [
      "这是 related functions 的 O 字母页，列出的不是类内部成员，而是与类型相关的非成员函数、运算符重载、hash、输出、比较或辅助构造函数。",
      "`UsdGeomPrimvar`、`UsdGeomXformOp`、`UsdObject`、`UsdPrimSiblingRange`、`UsdPrimSubtreeRange`、`UsdShadeInput`、`UsdShadeOutput`、`UsdSkelAnimQuery` 和 `UsdSkelSkeletonQuery` 是 USD 对象与查询类型相关的高价值入口。",
      "`TfEnum`、`TfToken`、`SdrVersion`、`SdfHandle<T>`、`SdfListProxy<_TypePolicy>`、`VtArrayEdit<ELEM>` 与 `VtValue` 属于基础设施、handle/list proxy 和值容器；相关函数常用于流输出、比较和容器辅助操作。",
      "`GfDualQuat*`、`GfMatrix*`、`GfQuat*`、`GfRange*`、`GfRotation`、`GfSize2` 等数学类型占据较大比例，说明本页也可作为 Gf 数学类型运算符和 helper overload 的入口。",
      "阅读时先确认条目是 related function 而非 member function，再按 USD schema object、Tf/Sdf/Vt infrastructure、Gf math 三条线索跳转，避免把函数归属误判到某个 class 内。"
    ],
    terms: [
      ["related functions", "相关函数"],
      ["operator overload", "运算符重载"],
      ["prim range", "prim 范围"],
      ["shade input", "着色输入"],
      ["value container", "值容器"],
      ["Gf math type", "Gf 数学类型"]
    ]
  },
  {
    output: "full_site/api/functions_i.html",
    title: "Class Members - I",
    notes: [
      "I 段类成员常围绕 id、index、insert、include、instance、input 等词展开；本页实际跨越 stage cache、schema metadata、Pcp mapping、Hydra buffer、Sdf layer 和 validation。",
      "`UsdStageCache::Id`、`UsdSchemaRegistry::SchemaInfo`、`SdrShaderNodeDiscoveryResult`、`UsdRenderTokensType`、`UsdHydraTokensType`、`UsdGeomTokensType` 和 `UsdLuxTokensType` 是 metadata/token/schema discovery 线索。",
      "`PcpMapExpression`、`PcpMapFunction`、`PcpPrimIndexInputs`、`PcpDependency`、`UsdStagePopulationMask`、`UsdCollectionAPI`、`UsdPrimRange` 和 `SdfNamespaceEdit` 应归入 composition、population mask、collection 和 namespace edit。",
      "`HdBufferArray`、`HdBufferArrayRange`、`HdSt*BufferRange`、`HdPrimvarDescriptor`、`HdPerfLog`、`HdStRenderParam` 与 `HioImage` 偏 Hydra buffer、render param、primvar 和 image IO。",
      "本页不是 I 字母 API 的教程；中文导读只帮助用户把混在一起的 schema、composition、Hydra、Sdf/Usd object 和 validation 条目拆开，再通过链接进入具体类页。"
    ],
    terms: [
      ["stage cache id", "Stage 缓存 ID"],
      ["schema info", "schema 信息"],
      ["population mask", "填充掩码"],
      ["prim index inputs", "prim index 输入"],
      ["buffer array", "缓冲数组"],
      ["image IO", "图像 IO"]
    ]
  },
  {
    output: "full_site/api/functions_n.html",
    title: "Class Members - N",
    notes: [
      "N 段类成员页常出现 name、node、new、next、num、namespace 等词；本页最重要的阅读边界是 Hydra scene index pipeline 与 Pcp error diagnostics。",
      "`HdCachingSceneIndex`、`HdFlatteningSceneIndex`、`HdGpGenerativeProceduralFilteringSceneIndex`、`HdPrefixingSceneIndex`、`HdRenderIndex`、`HdRetainedSceneIndex` 和 `HdxTaskControllerSceneIndex` 是 Hydra scene index 管线入口。",
      "`PcpErrorArcCycle`、`PcpErrorArcPermissionDenied`、`PcpErrorInvalidAssetPath`、`PcpErrorInvalidAuthoredRelocation` 等条目属于 composition 错误类型，阅读时应按诊断对象分类，不应理解为普通控制流。",
      "`App`、`ConfigItem`、`Validator`、`UsdValidationValidatorMetadata`、`UsdUtilsRegisteredVariantSet`、`UsdRenderSpec::Product` 和 `SdrShaderNodeDiscoveryResult` 指向 CLI/config、validation、variant set、render product 和 shader discovery。",
      "`TfMallocTag::CallTree::PathNode`、`HdPrimvarDescriptor`、`HdStShaderCode::NamedTextureHandle`、`GlfDrawTarget` 与 `GlfUniformBlock` 表明本页还包含内存诊断、Hydra primvar/texture handle 和 GL 支撑条目。"
    ],
    terms: [
      ["scene index pipeline", "scene index 管线"],
      ["composition error", "组合错误"],
      ["render product", "渲染产品"],
      ["shader discovery", "shader 发现"],
      ["named texture handle", "具名纹理句柄"],
      ["uniform block", "uniform block"]
    ]
  },
  {
    output: "full_site/api/functions_vars_k.html",
    title: "Class Members - Variables - K",
    notes: [
      "K 段成员变量页很短，短页仍需要保留清晰边界：当前条目只覆盖 validation metadata、schema registry、UsdPhysics rigid body/tokens 和 UsdGeom tokens。",
      "`UsdValidationValidatorMetadata` 是 validation system 的元数据入口，通常用于理解 validator 名称、适用范围、错误分类或注册信息。",
      "`UsdSchemaRegistry::SchemaInfo` 是 schema registry 的结构信息入口，和 generated schema、plugin schema、schema type metadata 相关。",
      "`UsdPhysicsRigidBodyDesc` 与 `UsdPhysicsTokensType` 属于物理 domain；其中一个是 rigid body 描述结构，一个是 token 常量集合，不应混读。",
      "`UsdGeomTokensType` 属于几何 schema token 集合；本页适合做 K 字母变量定位，完整语义仍需跳转到 validation、schema registry、UsdPhysics 或 UsdGeom 的目标页面。"
    ],
    terms: [
      ["validator metadata", "验证器元数据"],
      ["schema registry", "schema 注册表"],
      ["schema info", "schema 信息"],
      ["rigid body descriptor", "刚体描述结构"],
      ["physics tokens", "物理 token"],
      ["geometry tokens", "几何 token"]
    ]
  },
  {
    output: "full_site/api/functions_vars_b.html",
    title: "Class Members - Variables - B",
    notes: [
      "B 段成员变量页以 `UsdSkel*`、`UsdPhysics*` 和多 domain `TokensType` 为主，适合按骨骼/物理/schema token/Hydra shader discovery 四类阅读。",
      "`UsdSkelBakeSkinningParms`、`UsdSkelImagingSkelData`、`UsdSkelImagingBlendShapeData`、`UsdSkelImagingSkelGuideData` 与 `UsdSkelTokensType` 指向 skeleton baking、skel imaging、blend shape 和 guide data。",
      "`UsdPhysicsJointDesc`、`UsdPhysicsCapsule1ShapeDesc`、`UsdPhysicsCylinder1ShapeDesc`、`UsdPhysicsTokensType` 是 physics joint 和 shape descriptor 线索，需要和 `UsdPhysics` schema 页面联读。",
      "`HdMeshReprDesc`、`HgiMipInfo`、`SdrShaderNodeDiscoveryResult` 分别对应 Hydra mesh representation、GPU image mip 信息和 shader node discovery。",
      "`UsdUITokensType`、`UsdGeomTokensType`、`UsdShadeTokensType`、`UsdHydraTokensType`、`UsdVolTokensType`、`UsdLuxTokensType`、`UsdRiTokensType` 等 token table 变量必须保持英文符号，中文只说明所属 domain。"
    ],
    terms: [
      ["skin baking", "蒙皮烘焙"],
      ["blend shape data", "混合形状数据"],
      ["skel guide data", "骨骼引导数据"],
      ["shape descriptor", "形状描述结构"],
      ["mesh representation", "网格表示"],
      ["mip info", "MIP 信息"]
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
