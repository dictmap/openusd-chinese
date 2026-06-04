import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-func-quality-pass-014";

const refinements = [
  {
    output: "full_site/api/functions_func_e.html",
    title: "Class Members - Functions - E",
    notes: [
      "functions_func_e.html 是 Doxygen 函数成员索引的 E 段，适合按函数名前缀反查与执行、结束、枚举、擦除、评估或缓存相关的成员入口。",
      "本页摘录横跨 UsdTimeCode、Ef_OutputValueCache、EfDependencyCache、EfInputValueBlock、EfTime、TraceEventList、ArResolvedPath、SdfChildrenView、SdfListProxy、TfSpan、VtArray 与 UsdPrimRange 等条目。",
      "Ef* 条目通常属于执行框架和 page-cache 评估路径；Sdf/Tf/Vt 条目更偏向容器、视图和数组访问；UsdPrimRange 与 UsdUtilsTimeCodeRange 则用于遍历或时间范围相关定位。",
      "中文导读只解释本索引页的查找方式和模块分布，不改写 API 符号、模板参数或英文类名；具体函数签名、参数语义和线程约束仍应进入对应 class 页面核对。"
    ],
    terms: [
      ["execution framework", "执行框架"],
      ["output value cache", "输出值缓存"],
      ["time range", "时间范围"],
      ["prim range", "prim 遍历范围"],
      ["container view", "容器视图"]
    ]
  },
  {
    output: "full_site/api/functions_func_f.html",
    title: "Class Members - Functions - F",
    notes: [
      "functions_func_f.html 收录 F 段函数成员索引，条目分布在 Gf 数学类型、TfType、SdfSchemaBase、PcpPrimIndexInputs、Hgi 命令对象、Vdf 执行注册表以及 Hydra prim 类型周边。",
      "GfMatrix4d/GfMatrix4f 条目用于定位矩阵操作；SdfSchemaBase::FieldDefinition 与 _SpecDefiner 偏 schema 字段定义；PcpPrimIndexInputs 仍与 composition 输入有关。",
      "HgiBlitCmds、HgiGLBlitCmds 和 Hd/HdSt/HdPrman 条目多用于渲染后端、render delegate、render buffer、mesh、points、volume、light、material 等 Hydra 运行时对象。",
      "阅读时建议先按模块前缀分组：Gf 查数学，Sdf/Pcp 查数据与组合，Hgi/Hd 查渲染，Vt/Tf 查容器和类型系统；不要把索引页当作完整函数文档。"
    ],
    terms: [
      ["math type", "数学类型"],
      ["schema field", "schema 字段"],
      ["render delegate", "渲染代理"],
      ["render buffer", "渲染缓冲"],
      ["execution registry", "执行注册表"]
    ]
  },
  {
    output: "full_site/api/functions_func_g.html",
    title: "Class Members - Functions - G",
    notes: [
      "functions_func_g.html 是 G 段函数索引，常见前缀会落在 get/generate/getter 类成员，因此本页大量出现 Hydra 资源、Hgi 设备、数据源、缓存视图与矩阵类型相关入口。",
      "HdBufferArray、HdInstanceRegistry、HdResourceRegistry、HdStBufferArrayRegistry、HdStResourceRegistry 与 HdStVBOMemoryManager 条目指向 Hydra GPU/CPU 资源管理和 buffer array 生命周期。",
      "Hgi、HgiGL、HgiGLDevice、HgiBlitCmds 等条目用于定位图形接口和 OpenGL 后端；Exec_CacheView、ExecUsdCacheView、Ef_PageCache 则指向执行/缓存读取路径。",
      "UsdClipsAPI、ArResolverContext、GfMatrix*、HdSceneDelegate、HdPluginRenderDelegateUniqueHandle 等条目说明本页不是单一模块文档，而是跨 asset resolution、composition、Hydra 与数学基础类型的函数入口总表。"
    ],
    terms: [
      ["resource registry", "资源注册表"],
      ["buffer array", "缓冲数组"],
      ["graphics interface", "图形接口"],
      ["cache view", "缓存视图"],
      ["scene delegate", "场景代理"]
    ]
  },
  {
    output: "full_site/api/functions_func_h.html",
    title: "Class Members - Functions - H",
    notes: [
      "functions_func_h.html 收录 H 段函数成员索引，条目集中在 has/hold/handle 等语义附近，也包含诊断、Sdf 数据结构、Pcp 缓存、Usd 对象与 Hydra render param。",
      "SdfAbstractData、SdfData、SdfPrimSpec、SdfAttributeSpec 与 SdfLayer 相关入口用于定位 scene description 数据层；PcpCache 与 PcpPrimIndex 指向 composition 缓存和 prim index。",
      "UsdPrim、UsdObject、UsdAttribute、UsdProperty、UsdRelationship、UsdVariantSet、UsdResolveInfo 与 UsdAttributeQuery 是用户更常直接阅读的 USD core API 入口。",
      "UsdShadeConnectableAPI、UsdShadeInput、UsdShadeOutput、UsdSkelSkeletonQuery、UsdSkelSkinningQuery 等条目跨 shading 和 skeleton query；中文说明保留这些 API 名称不翻译，便于直接搜索。"
    ],
    terms: [
      ["scene description data", "场景描述数据"],
      ["composition cache", "组合缓存"],
      ["diagnostic manager", "诊断管理器"],
      ["resolve info", "解析信息"],
      ["connectable API", "可连接 API"]
    ]
  },
  {
    output: "full_site/api/functions_func_i.html",
    title: "Class Members - Functions - I",
    notes: [
      "functions_func_i.html 是 I 段函数成员索引，条目常与 identifier、insert、is、iterator、initialize、included 等语义相关，适合在只记得函数名前缀时快速跳到 class 页面。",
      "UsdStageCache::Id、PcpMapExpression、PcpMapFunction、UsdCollectionAPI、UsdStagePopulationMask、UsdValidationTimeRange 等条目主要服务于 stage/cache、路径映射、集合、加载范围和验证时间范围。",
      "SdfFileFormat、SdfUsdaFileFormat、SdfUsdcFileFormat、SdfUsdFileFormat、SdfUsdzFileFormat 说明本页也覆盖文件格式识别与实现入口；ArchMallocHook、TfMallocTag 偏内存标记和诊断。",
      "HdBufferArrayRange、HdSt*BufferArrayRange、HdDataSourceLocatorSet、ExecAttributeComputationBuilder、VdfSchedule 等条目用于 Hydra 和执行系统定位；具体生命周期、所有权和模板参数仍以目标页面为准。"
    ],
    terms: [
      ["stage cache id", "stage 缓存标识"],
      ["map function", "映射函数"],
      ["population mask", "加载掩码"],
      ["file format", "文件格式"],
      ["memory tag", "内存标记"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块辨识和术语对照；英文页面名、API 符号、模板参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first function-index usage notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
