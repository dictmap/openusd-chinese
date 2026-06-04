import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-related-quality-pass-021";

const refinements = [
  {
    output: "full_site/api/functions_q.html",
    title: "Class Members - Q",
    notes: [
      "functions_q.html 是 Class Members 总索引的 Q 段，当前条目很少，主要包含 UsdVolTokensType、SdfAbstractData、SdfLayer 和 CLI ConfigBase。",
      "UsdVolTokensType 是 usdVol schema token 入口；SdfAbstractData 与 SdfLayer 属于 scene description 数据层和 layer 查询/访问路径。",
      "ConfigBase 属于 pxr_CLI::CLI 命名空间下的配置基础类型，和 Sdf 数据层不是同一模块；中文层把它单独标出，避免混淆。",
      "由于本页条目短，当前精修只说明模块边界和索引用途；逐项成员说明仍需要进入对应类页面核对签名、返回值和适用场景。"
    ],
    terms: [
      ["query entry", "查询入口"],
      ["volume tokens", "体积 token"],
      ["abstract data", "抽象数据层"],
      ["layer query", "图层查询"],
      ["CLI config", "命令行配置"]
    ]
  },
  {
    output: "full_site/api/functions_r.html",
    title: "Class Members - R",
    notes: [
      "functions_r.html 是 Class Members 总索引的 R 段，覆盖 physics shape desc、HdExtComputation、Sdf/Ar/Hio 文件读取、Vdf vector accessor、Hydra buffer range 和 TraceSerialization。",
      "UsdPhysicsCapsule/Cone/Cylinder/SphereShapeDesc、UsdPhysicsSpherePoint 与 UsdGeom/UsdVol/UsdRender token 条目说明本页包含 schema token 和物理 shape 数据结构入口。",
      "SdfChildrenView、SdfListProxy、TfSpan、VtArray、ArAsset、ArFilesystemAsset、ArInMemoryAsset、SdfFileFormat、SdfUsda/Usdc/Usd/UsdzFileFormat 与 HioImage 是容器视图、资产读取和文件格式相关线索。",
      "VdfVector::ReadAccessor、ReadWriteAccessor、VdfInputSpecs、HdBufferArrayRange、HdSt*BufferRange、HdStDispatchBuffer 和 ArchMallocHook 偏执行数据访问、Hydra buffer 管理和内存诊断。"
    ],
    terms: [
      ["read accessor", "读取访问器"],
      ["read-write accessor", "读写访问器"],
      ["shape descriptor", "形状描述结构"],
      ["file format", "文件格式"],
      ["buffer range", "缓冲区范围"]
    ]
  },
  {
    output: "full_site/api/functions_rela_g.html",
    title: "Class Members - Related Functions - G",
    notes: [
      "functions_rela_g.html 是 related functions 索引的 G 段，定位的是与类相关的非成员函数或友元函数，而不是普通成员函数。",
      "本页条目集中在 GfLine2d、GfLine、GfLineSeg2d、GfLineSeg、GfRay 与 GfQuaternion，说明 G 段 related functions 主要围绕基础几何线段、射线和四元数工具函数。",
      "这些 Gf 类型常见于几何计算、相交测试、射线投射、旋转表示和数学辅助函数；进入具体类页后应重点确认 related function 的参数顺序、返回类型和数值约定。",
      "中文导读保留 Gf* 类型名，避免把 line、line segment、ray、quaternion 翻成无法搜索的自然语言；当前页面仍是索引入口，不是完整数学库教程。"
    ],
    terms: [
      ["related function", "相关函数"],
      ["friend function", "友元函数"],
      ["line segment", "线段"],
      ["ray", "射线"],
      ["quaternion", "四元数"]
    ]
  },
  {
    output: "full_site/api/functions_rela_h.html",
    title: "Class Members - Related Functions - H",
    notes: [
      "functions_rela_h.html 是 related functions 索引的 H 段，条目比 G 段更广，覆盖 ArResolverContext、GfBBox3d、GfDualQuat、GfMatrix、GfQuat、GfRange、GfRotation、GfVec、PcpInstanceKey、SdfHandle、TfPyObjWrapper 与 UsdStageLoadRules。",
      "GfDualQuatd/f/h、GfQuatd/f/h、GfMatrix2/3/4d/f、GfRange1/2/3d/f 和 GfVec2/3/4d/f/h/i 是本页主体，用于定位数学类型的外部 helper、比较、hash、stream 或互操作函数。",
      "ArResolverContext、PcpInstanceKey、SdfHandle、SdfUnregisteredValue、TfPyObjWrapper、UsdStageCache::Id 和 UsdStageLoadRules 说明 H 段 related functions 还涉及资产解析上下文、composition 实例键、handle、Python 包装和 stage 加载规则。",
      "阅读本页时应先区分数学类型 related function 和 USD/Tf/Sdf/Pcp 基础设施 related function；中文层给出分组，方便读者进入对应 class 页继续核对。"
    ],
    terms: [
      ["dual quaternion", "双四元数"],
      ["bounding box", "包围盒"],
      ["range type", "范围类型"],
      ["resolver context", "解析上下文"],
      ["load rules", "加载规则"]
    ]
  },
  {
    output: "full_site/api/functions_rela_o.html",
    title: "Class Members - Related Functions - O",
    notes: [
      "functions_rela_o.html 是 related functions 索引的 O 段，覆盖 GfRect2i、SdfHandle、SdfListProxy、SdrVersion、TfEnum/TfToken、UsdGeom、UsdShade、UsdSkel、UsdStageCache、UsdTimeCode、VtArrayEdit/VtValue 和大量 Gf 数学类型。",
      "UsdGeomPrimvar、UsdGeomXformOp、UsdObject、UsdPrimSiblingRange、UsdPrimSubtreeRange、UsdShadeInput、UsdShadeOutput、UsdSkelAnimQuery、UsdSkelSkeletonQuery 与 UsdTimeCode 是 USD 用户常见对象和查询类型。",
      "TfEnum、TfToken、SdrVersion、SdfHandle、SdfListProxy、VtArrayEdit、VtValue 则偏基础设施、token、版本、handle/list proxy 和值容器；相关函数通常用于比较、输出、hash、转换或辅助构造。",
      "本页还列出 GfDualQuat、GfMatrix、GfQuat、GfRange、GfRotation、GfSize2 等数学类型，说明 O 段 related functions 跨越 USD schema 对象和 Gf 数学库两条主线。"
    ],
    terms: [
      ["prim range", "Prim 范围"],
      ["shade input", "着色输入"],
      ["shade output", "着色输出"],
      ["value container", "值容器"],
      ["helper overload", "辅助重载"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
