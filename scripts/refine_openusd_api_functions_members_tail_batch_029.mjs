import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-members-tail-quality-pass-029";

const refinements = [
  {
    output: "full_site/api/functions_w.html",
    title: "Class Members - W",
    notes: [
      "functions_w.html 是 Class Members 索引 W 段，条目覆盖 WorkTaskGraph、WorkSingularTask、VdfParallelTaskWaitlist、VdfContext、Vdf_WeightSlot、VdfNetwork::EditMonitor、Ef executor/cache、Sdf path/predicate expressions、PcpDependentNamespaceEdits、TfRefPtrTracker、GfVec4 系列、UsdShade/UsdSkel/UsdGeom/UsdHydra tokens、Ar writable asset、HioImage、TraceSerialization、JsWriter、UsdStage 等。",
      "WorkTaskGraph、WorkSingularTask 和 VdfParallelTaskWaitlist 属于任务调度/并行执行语境；EfDependencyCache、EfLeafNodeCache、EfPageCacheBasedExecutor 与 VdfNetwork::EditMonitor 则偏执行引擎、缓存和计算图监控。",
      "SdfPathExpression、SdfPredicateExpression、SdfPathExpression::ExpressionReference、PcpDependentNamespaceEdits 与 SdfNotice::LayerMutenessChanged 属于 Sdf/Pcp composition 与路径表达式主线，应和 Hydra、Ar、Gf 数学类分开阅读。",
      "GfVec4d、GfVec4f、GfVec4h、GfVec4i 是 Gf 四维向量类型；UsdShadeTokensType、UsdSkelTokensType、UsdGeomTokensType、UsdHydraTokensType 与 UsdSkelImagingWeightAndSubShapeIndex 是 schema token 或 skel imaging 条目。",
      "ArFilesystemWritableAsset、ArWritableAsset、HioImage、TraceSerialization、TraceEventData、GlfDrawTarget、SdfFileFormat、ArResolver、VtArrayEditBuilder<ELEM> 与 TfScriptModuleLoader 显示 W 段还混合资产写入、图像、trace、OpenGL draw target、文件格式和脚本模块加载入口。"
    ],
    terms: [
      ["task graph", "任务图"],
      ["path expression", "路径表达式"],
      ["layer muteness notice", "层静音通知"],
      ["writable asset", "可写资产"],
      ["execution cache", "执行缓存"]
    ]
  },
  {
    output: "full_site/api/functions_x.html",
    title: "Class Members - X",
    notes: [
      "functions_x.html 是 Class Members 索引 X 段，主要包含 UsdGeomTokensType、UsdPhysicsTokensType、GfVec2/3/4 的 d/f/h/i 类型，以及 UsdGeomXformable::XformQuery。",
      "GfVec2d、GfVec2f、GfVec2h、GfVec2i、GfVec3d、GfVec3f、GfVec3h、GfVec3i、GfVec4d、GfVec4f、GfVec4h、GfVec4i 都是 Gf 向量类型，后缀 d/f/h/i 分别提示 double、float、half、int 等精度或存储类型。",
      "UsdGeomTokensType 与 UsdPhysicsTokensType 中的 X 条目通常与 x 轴、坐标、几何或物理参数命名有关；这里保留 token class 原名，避免破坏代码检索。",
      "UsdGeomXformable::XformQuery 是读取或查询 xform 栈相关信息的入口；它和 GfVec 数学类型在同一字母索引中出现，但语义上属于 USD 几何变换查询。",
      "本页是短索引页，中文层补充的是定位方式和模块归属；具体成员签名、返回值和约束仍需进入对应 class 页面查看。"
    ],
    terms: [
      ["vector type", "向量类型"],
      ["half precision", "半精度"],
      ["xform query", "变换查询"],
      ["geometry token", "几何 token"],
      ["physics token", "物理 token"]
    ]
  },
  {
    output: "full_site/api/functions_y.html",
    title: "Class Members - Y",
    notes: [
      "functions_y.html 是 Class Members 索引 Y 段，覆盖 UsdGeomTokensType、UsdLuxTokensType、UsdPhysicsTokensType、GfVec2/3/4 系列和 VdfExecutorBufferData。",
      "GfVec2d/f/h/i、GfVec3d/f/h/i、GfVec4d/f/h/i 是数学向量族，在 Y 段通常对应 y 分量或与 y 轴相关的成员入口；具体字段名应以目标 class 页面为准。",
      "UsdGeomTokensType、UsdLuxTokensType 与 UsdPhysicsTokensType 代表 geometry、lighting、physics 三个 domain 的 token 常量表；中文说明只解释模块边界，不翻译 API 标识符。",
      "VdfExecutorBufferData 是 Vdf 执行缓冲数据入口，和 Gf 向量或 USD token 表不是同类概念；本页把它单独标出，方便用户识别执行系统相关条目。",
      "阅读本页时建议先按 Gf 数学类型、USD domain token、Vdf 执行数据三组筛选，再进入链接页核对成员签名和英文原文。"
    ],
    terms: [
      ["Y component", "Y 分量"],
      ["lighting token", "灯光 token"],
      ["executor buffer data", "执行器缓冲数据"],
      ["domain token table", "领域 token 表"],
      ["class member index", "类成员索引"]
    ]
  },
  {
    output: "full_site/api/functions_z.html",
    title: "Class Members - Z",
    notes: [
      "functions_z.html 是 Class Members 索引 Z 段，包含 UsdGeomTokensType、UsdLuxTokensType、UsdPhysicsTokensType、GfVec3/4 系列和 UsdVolTokensType。",
      "GfVec3d、GfVec3f、GfVec3h、GfVec3i、GfVec4d、GfVec4f、GfVec4h、GfVec4i 是三维/四维向量类型；在 Z 段通常用于定位 z 分量或与 z 轴相关的成员。",
      "UsdGeomTokensType、UsdLuxTokensType、UsdPhysicsTokensType 与 UsdVolTokensType 分别归属 geometry、lighting、physics、volume；同一字母下混排并不表示这些模块共享同一语义。",
      "短索引页最容易被误判为“没有正文”，因此中文层明确说明它的职能是导航到 class/member 页面，而不是替代 Gf、UsdLux、UsdPhysics 或 UsdVol 的专题文档。",
      "链接策略继续保持本地优先：406 清单内目标跳本地 HTML，清单外 OpenUSD 内部目标进入本地缺口提示页，只有显式官方原页链接保留外跳。"
    ],
    terms: [
      ["Z component", "Z 分量"],
      ["volume token", "体积 token"],
      ["three-dimensional vector", "三维向量"],
      ["four-dimensional vector", "四维向量"],
      ["local placeholder", "本地缺口页"]
    ]
  },
  {
    output: "full_site/api/functions.html",
    title: "Class Members",
    notes: [
      "functions.html 是 Class Members 总索引入口，当前页面对应符号/下划线分组，条目包括 TraceCounterAccumulator、VdfExtensibleNode、VdfNode、VdfConnectorSpecs<T>、TfEnum、HdStDispatchBuffer、HdSt buffer/memory manager 内部类、VdfExecutionStats、HdStTextureObject、多个 Hd*SceneIndexPlugin、VdfScheduler、ArResolver、UsdShadeConnectableAPIBehavior、SdfUsdaFileFormat、ExecSystem、HdBufferSource、HdStExtComp*、TraceReporterBase、Ef executor、Vdf executor interface、HdSceneIndexPluginRegistry、HfPluginRegistry 和 GfColor。",
      "VdfExtensibleNode、VdfNode、VdfConnectorSpecs<T>、VdfExecutionStats、VdfScheduler、VdfDatalessExecutor、VdfExecutorInterface、VdfDataManagerBasedExecutor 等属于 Vdf 计算图/执行系统主线。",
      "HdStDispatchBuffer、HdStTextureObject、HdStInterleavedMemoryManager::_StripedInterleavedBuffer、HdStVBOMemoryManager::_StripedBufferArray、HdStVBOSimpleMemoryManager::_SimpleBufferArray、HdBufferSource、HdVtBufferSource 与 HdStExtComp* 属于 Hydra/Storm buffer、VBO、texture 和 ext computation 相关入口。",
      "HdGpSceneIndexPlugin、HdPrman_DependencySceneIndexPlugin、HdPrman_MatFiltSceneIndexPlugin、HdPrman_PortalLightResolvingSceneIndexPlugin、HdSceneIndexPlugin、HdSceneIndexPluginRegistry 与 HdsiDebuggingSceneIndexPlugin 是 scene index plugin 和 registry 相关条目。",
      "TraceCounterAccumulator、TraceReporterBase、TfEnum、ArResolver、UsdShadeConnectableAPIBehavior、SdfUsdaFileFormat、ExecSystem、EfMaskedSubExecutor、EfPageCacheBasedExecutor、HfPluginRegistry 与 GfColor 显示总索引页跨越 trace、Tf、Ar、UsdShade、Sdf、Exec/Ef、plugin registry 和 Gf 基础类型；中文层只做导航解释，不把它标为逐项完整翻译。"
    ],
    terms: [
      ["member index root", "成员索引总入口"],
      ["Vdf execution system", "Vdf 执行系统"],
      ["Hydra buffer management", "Hydra 缓冲管理"],
      ["scene index plugin", "scene index 插件"],
      ["connector specs", "连接器规格"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类成员索引用法、模块边界和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class-member index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
