import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-func-quality-pass-016";

const refinements = [
  {
    output: "full_site/api/functions_func_o.html",
    title: "Class Members - Functions - O",
    notes: [
      "functions_func_o.html 是 Doxygen Class Members - Functions 索引的 O 段，用于从函数成员首字母快速进入相关类页面；本页仍是索引入口，不等同于每个函数签名的完整翻译。",
      "本页条目横跨 TraceCollection::Visitor、VdfRequiredInputsPredicate、ArFilesystemAsset、SdfCrateInfo、SdfZipFile、TfAtomicOfstreamWrapper、UsdStage、SdfLayer、ArPackageResolver、ArResolver、HioImage 和 CLI Validator 等类型，说明 O 段同时覆盖 tracing、asset resolution、layer/package、image IO 与命令行校验相关入口。",
      "ArFilesystemAsset、ArPackageResolver、ArResolver 与 ArResolvedPath 应作为资产解析和包解析相关线索阅读；SdfCrateInfo、SdfZipFile、SdfZipFileWriter 则更接近 layer 存储格式、crate/usdz 容器和文件写出路径。",
      "HdPluginRenderDelegateUniqueHandle、HdPluginRendererUniqueHandle、HdRendererPluginHandle 与 HdSceneIndexPrim 等条目偏向 Hydra 渲染插件或 scene index 结构；中文层保留英文类名，避免把 handle、resolver、crate、visitor 这类 API 概念误译成普通叙述词。"
    ],
    terms: [
      ["asset resolver", "资产解析器"],
      ["package resolver", "包解析器"],
      ["crate info", "crate 存储信息"],
      ["renderer plugin handle", "渲染器插件句柄"],
      ["visitor", "访问器"]
    ]
  },
  {
    output: "full_site/api/functions_func_p.html",
    title: "Class Members - Functions - P",
    notes: [
      "functions_func_p.html 是 P 段函数成员索引，条目数量较多，适合按模块分组阅读，而不是从上到下逐个机械翻译。",
      "SdfPathTable、SdfPredicateParamNamesAndDefaults::Param、SdfPredicateProgram、SdfPathExpression 相关条目指向 path table、predicate 与表达式求值；它们通常服务于路径集合匹配、参数化谓词和 scene description 查询。",
      "SdrRegistry、SdrParserPlugin、UsdShadeShaderDefParserPlugin 与 HioGlslfxResourceLayout 组成 shader discovery / shader definition 解析线索；阅读时应把 parser、registry、resource layout 与具体 shader node 定义区分开。",
      "UsdVolParticleFieldKernel*、UsdVolParticleField3DGaussianSplat、UsdVolParticleFieldPositionAttributeAPI 与 UsdVolParticleFieldSphericalHarmonicsAttributeAPI 指向 usdVol 粒子场和核函数 schema；PcpCache、PcpPrimIndex、PcpMapExpression、PcpMapFunction 等条目则转入 composition 缓存、prim index 与路径映射诊断。"
    ],
    terms: [
      ["predicate parameter", "谓词参数"],
      ["shader registry", "着色器注册表"],
      ["parser plugin", "解析插件"],
      ["particle field kernel", "粒子场核函数"],
      ["prim index", "Prim 索引"]
    ]
  },
  {
    output: "full_site/api/functions_func_q.html",
    title: "Class Members - Functions - Q",
    notes: [
      "functions_func_q.html 是 Q 段函数成员索引，当前只包含很少的入口，因此中文精修重点是说明这些入口的定位，而不是扩写成大段无根据的教程。",
      "SdfAbstractData 和 SdfLayer 共同指向 scene description 数据访问与 layer 内容查询；如果需要确认具体 query 函数语义，应继续进入对应类页面核对签名、返回值和线程约束。",
      "ConfigBase 属于 pxr_CLI::CLI 命名空间下的命令行配置类型，和 Sdf 数据层不是同一个模块；本页把它保留为独立 CLI 配置入口，避免误认为它是 USD layer 数据结构的一部分。",
      "由于本页条目很短，后续完整翻译时应优先补齐每个 Q 段函数成员的英文签名、参数、返回值和适用场景；当前中文层仅提供索引阅读方向和模块边界提示。"
    ],
    terms: [
      ["query function", "查询函数"],
      ["abstract data", "抽象数据层"],
      ["layer access", "图层访问"],
      ["CLI config", "命令行配置"],
      ["module boundary", "模块边界"]
    ]
  },
  {
    output: "full_site/api/functions_func_r.html",
    title: "Class Members - Functions - R",
    notes: [
      "functions_func_r.html 是 R 段函数成员索引，条目集中在 read/range/resource/register/record 等语义附近，同时跨越 Ar、Hio、Sdf、Trace、Vdf、Hd/HdSt 与 UsdAppUtils。",
      "ArAsset、ArFilesystemAsset、ArInMemoryAsset 与 HioImage 可作为资源读取入口；SdfFileFormat、SdfUsdaFileFormat、SdfUsdcFileFormat、SdfUsdFileFormat、SdfUsdzFileFormat 则指向 USD 文件格式读取和识别路径。",
      "SdfChildrenView、SdfListProxy、TfSpan、VtArray、VdfConnectorMap 和 VdfVector::ReadAccessor / ReadWriteAccessor 是容器视图、连接器映射和数据访问器相关线索；阅读这些条目时要保留 template 参数，不要把它们翻成固定具体类型。",
      "HdBufferArrayRange、HdSt*BufferRange、HdStCommandBuffer、HdStTextureHandle、HdUnitTestDelegate 与 TraceCollector / TraceCounterHolder 说明本页还覆盖 Hydra GPU buffer 管理、测试 delegate、命令缓冲和 tracing 记录入口。"
    ],
    terms: [
      ["read accessor", "读取访问器"],
      ["file format", "文件格式"],
      ["buffer range", "缓冲区范围"],
      ["command buffer", "命令缓冲"],
      ["trace collector", "跟踪采集器"]
    ]
  },
  {
    output: "full_site/api/functions_func_s.html",
    title: "Class Members - Functions - S",
    notes: [
      "functions_func_s.html 是 S 段函数成员索引，覆盖 save/sample/schedule/scoped lock 等多类入口；它对渲染采样、时间值、stage/layer 保存、调度和锁语义都有索引价值。",
      "UsdTimeCode、TsSpline、UsdStage、SdfLayer、SdfZipFileWriter 与 SdfFileFormat 系列条目可作为时间、样条、stage/layer 存储和文件格式相关函数的定位入口。",
      "HdEmbreeBufferSampler、HdEmbreePrimvarSampler、HdEmbreeTriangleVertexSampler、HdEmbreeUniformSampler 等条目属于 Embree 渲染后端采样器；HdSceneDelegate、UsdImagingDelegate、UsdImagingPrimAdapter、UsdImagingPointInstancerAdapter 则偏向 Hydra / UsdImaging 场景代理与适配器。",
      "TfBigRWMutex::ScopedLock、TfSpinMutex::ScopedLock、TfSpinRWMutex::ScopedLock 是 scoped lock 语义，阅读时应关注锁生命周期和 RAII 用法；SdfAllowed、SdfAssetPath、SdfBatchNamespaceEdit、SdfNamespaceEdit、SdfPathExpression 等条目则转入 Sdf 校验、资产路径、namespace edit 与表达式匹配。"
    ],
    terms: [
      ["time code", "时间码"],
      ["sampler", "采样器"],
      ["scene delegate", "场景代理"],
      ["scoped lock", "作用域锁"],
      ["namespace edit", "命名空间编辑"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块辨识和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
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
