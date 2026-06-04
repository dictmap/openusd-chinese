import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-vars-quality-pass-026";

const refinements = [
  {
    output: "full_site/api/functions_vars_m.html",
    title: "Class Members - Variables - M",
    notes: [
      "functions_vars_m.html 是变量索引 M 段，覆盖 PcpDependency/PcpArc、VdfScheduleInput、Hydra display/repr/AOV、UsdRenderSpec、UsdPhysics shape/joint/collision group、SdfLayerHints 和多组 schema token。",
      "PcpDependency、PcpArc、PcpCulledDependency 与 PcpErrorInvalidAuthoredRelocation 是 composition 依赖、arc 和 relocation 诊断相关入口；它们应与 render/physics token 分开阅读。",
      "HdGeomSubset、HdDisplayStyle、HdReprSelector、HdAovDescriptor、HdRenderBufferDescriptor 和 SdrShaderNodeDiscoveryResult 指向 Hydra 表示、AOV、render buffer 与 shader discovery。",
      "UsdPhysicsShapeDesc、UsdPhysicsDistanceJointDesc、UsdPhysicsMeshShapeDesc、UsdPhysicsCollisionGroupDesc 与 UsdSkelBakeSkinningParms 说明本页也跨越 physics shape/joint、collision group 和 skel bake skinning。"
    ],
    terms: [
      ["composition arc", "组合弧"],
      ["layer hints", "层提示"],
      ["repr selector", "表示选择器"],
      ["sparse output traverser", "稀疏输出遍历器"],
      ["UTF-8 code point", "UTF-8 码点"]
    ]
  },
  {
    output: "full_site/api/functions_vars_n.html",
    title: "Class Members - Variables - N",
    notes: [
      "functions_vars_n.html 是变量索引 N 段，覆盖 TfMallocTag call tree/call stack、Hydra primvar 与 named texture handle、Sdr discovery、UsdUtils variant set、validation metadata、Pcp changes 和多 domain token。",
      "TfMallocTag::CallTree::PathNode 与 TfMallocTag::CallStackInfo 是内存标记和调用栈诊断入口；HdPrimvarDescriptor、HdStShaderCode::NamedTextureHandle 与 HdxPickHit 属于 Hydra/Storm/picking 语境。",
      "UsdUtilsRegisteredVariantSet、UsdValidationValidatorMetadata、Validator、SdrShaderNodeDiscoveryResult 和 UsdSkelImagingSkelGuideData 分别指向 variant set 注册、验证器元数据、shader 发现和 skel guide 成像数据。",
      "PcpLayerStackChanges、PcpDependentNamespaceEdits::CompositionFieldEdit、PcpNamespaceEdits::CacheSite、SdfNamespaceEdit 与 VdfScheduleNode 说明本页还包含 composition change、namespace edit 和 Vdf 调度状态。"
    ],
    terms: [
      ["call tree path node", "调用树路径节点"],
      ["call stack info", "调用栈信息"],
      ["registered variant set", "已注册变体集"],
      ["named texture handle", "命名纹理句柄"],
      ["skel guide data", "骨骼引导数据"]
    ]
  },
  {
    output: "full_site/api/functions_vars_o.html",
    title: "Class Members - Variables - O",
    notes: [
      "functions_vars_o.html 是变量索引 O 段，条目集中在 TfRefPtrTracker trace、HdxPickHit、HdEmbree instance context、Pcp reference/relocation errors、schema tokens 和 Exec value override。",
      "TfRefPtrTracker::Trace 是 Tf 引用指针追踪入口；HdxPickHit、HdEmbreeInstanceContext、HdDisplayStyle 与 UsdImagingCreateSceneIndicesInfo 偏 Hydra/imaging/picking。",
      "PcpErrorInvalidReferenceOffset、PcpErrorTargetPathBase、PcpErrorInvalidAuthoredRelocation、PcpErrorInvalidConflictingRelocation、PcpErrorInvalidSameTargetRelocations::RelocationSource 构成本页的 Pcp error/relocation 主线。",
      "ExecUsdValueOverride 与 ExecValueOverride 是执行系统中的值覆盖入口；它们和 schema token 条目混列，中文层将其单独标出以免被误读为 token 常量。"
    ],
    terms: [
      ["reference pointer trace", "引用指针追踪"],
      ["instance context", "实例上下文"],
      ["reference offset", "引用偏移"],
      ["relocation source", "重定位来源"],
      ["value override", "值覆盖"]
    ]
  },
  {
    output: "full_site/api/functions_vars_p.html",
    title: "Class Members - Variables - P",
    notes: [
      "functions_vars_p.html 是变量索引 P 段，覆盖 PcpArc、CLI config、Pcp composition edits/layer stack/prim index outputs、CameraUtilFraming、render product、validation metadata、Hydra scene index、physics object/rigid body 和 UsdSkel imaging data。",
      "PcpDependentNamespaceEdits::CompositionFieldEdit、PcpLayerStackIdentifier、PcpLayerStackChanges、PcpPrimIndexOutputs、PcpErrorInvalidPrimPath、PcpErrorArcPermissionDenied、PcpErrorPrimPermissionDenied 是 Pcp/composition 诊断与输出主线。",
      "HdMergingSceneIndex::InputScene、HdEmbreePrototypeContext、HdxPrimOriginInfo、HdEmbreeRTCBufferAllocator 与 HdDisplayStyle 指向 Hydra scene index、Embree prototype、prim origin 和 RTC buffer allocator。",
      "UsdSkelImagingBlendShapeData、UsdSkelImagingSkelData、UsdSkelImagingSkelGuideData、UsdPhysicsRigidBodyDesc、UsdPhysicsObjectDesc、UsdGeomImageable::PurposeInfo 和多组 token 构成 skel/physics/geom/render 变量群。",
      "阅读本页时建议先把 composition 错误与层栈输出放在一组，再把 Hydra 场景索引和拾取来源放在一组，最后查看骨骼成像、物理对象、几何用途和渲染产品变量；这样可以避免把同一字母下的不同模块误认为同一套字段。"
    ],
    terms: [
      ["prim index outputs", "Prim 索引输出"],
      ["layer stack identifier", "层栈标识符"],
      ["prototype context", "原型上下文"],
      ["prim origin info", "Prim 来源信息"],
      ["permission denied", "权限拒绝"]
    ]
  },
  {
    output: "full_site/api/functions_vars_q.html",
    title: "Class Members - Variables - Q",
    notes: [
      "functions_vars_q.html 是变量索引 Q 段，当前只有 UsdVolTokensType 一个主要条目，属于 usdVol schema token 常量入口。",
      "由于本页条目很短，中文层重点说明它是变量字母索引的一页，不是 usdVol 的完整使用说明；具体 token 含义仍需进入 UsdVolTokensType 或相关 schema 页面核对。",
      "UsdVolTokensType 原名必须保留，因为它是 Doxygen class 页面、搜索入口和代码符号的稳定标识。",
      "后续如果官方页面新增 Q 段变量，应继续按 domain token、schema 描述结构、render/physics/Pcp 等模块归类，而不是把新增条目合并成笼统说明。"
    ],
    terms: [
      ["volume token", "体积 token"],
      ["schema token constant", "schema token 常量"],
      ["letter index", "字母索引"],
      ["Doxygen symbol", "Doxygen 符号"],
      ["domain grouping", "领域分组"]
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
