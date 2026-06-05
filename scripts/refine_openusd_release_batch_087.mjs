import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-087";

const refinements = [
  {
    output: "full_site/api/functions_j.html",
    title: "Class Members - J",
    notes: [
      "`functions_j.html` 是 J 段 Class Members 索引，条目短但跨度明确：Hydra Embree 配置、CLI option base、Sdf path、UsdPhysics joint、UsdSkel 查询与 JSON 值/写出工具并列出现。",
      "`UsdPhysicsD6JointDesc`、`UsdPhysicsJointDesc` 与 `UsdPhysicsCustomTokens` 应归入 physics joint 语境；`D6Joint` 表达多自由度关节类型，名称应保持英文，避免和普通 joint descriptor 混淆。",
      "`UsdSkelTokensType` 与 `UsdSkelAnimQuery` 是骨骼 schema token 和 animation query 入口；它们与 UsdPhysics joint descriptor 处在不同 schema domain，索引页只是按 J 段合并展示。",
      "`SdfPath` 是 scene description 路径基础类型，`OptionBase<CRTP>` 属于命令行配置框架，`HdEmbreeConfig` 属于 Hydra Embree render delegate 配置；三者需要分别跳到 class 页阅读。",
      "`JsValue` 与 `JsWriter` 是 JSON 值和写出辅助类型，适合按配置/序列化工具理解；本页的中文层重点是给短索引页补模块边界，而不是展开所有函数签名。"
    ],
    terms: [
      ["short member index", "短成员索引"],
      ["D6 joint descriptor", "D6 关节描述结构"],
      ["skeleton animation query", "骨骼动画查询"],
      ["path object", "路径对象"],
      ["CRTP option base", "CRTP 选项基类"],
      ["JSON writer", "JSON 写出器"]
    ]
  },
  {
    output: "full_site/api/globals_func_u.html",
    title: "File Members - Functions - U",
    notes: [
      "`globals_func_u.html` 是 File Members 函数索引 U 段，条目以 `Usd*` 函数为主，覆盖 `UsdAppUtils`、collection membership、flatten、metrics、UsdGeom、UsdLux、UsdPhysics、UsdRender、UsdShade、UsdSkel 和 UsdUtils 工具域。",
      "`UsdAppUtilsGetCameraAtPath()` 来自 `camera.h`，适合按应用层 camera lookup 阅读；collection membership 相关函数来自 `collectionMembershipQuery.h`，用于从 collection membership query 或 rule map 计算 included objects/paths/path expression。",
      "`UsdFlattenLayerStack()`、`UsdFlattenLayerStackResolveAssetPath()` 和 `UsdFlattenLayerStackResolveAssetPathAdvanced()` 来自 `flattenUtils.h`，属于 layer stack flatten 与 asset path resolve 工具，不等同于 stage composition 本身。",
      "`UsdGeomGetFallbackUpAxis()`、`UsdGeomGetStageMetersPerUnit()`、`UsdGeomGetStageUpAxis()` 和 point instancer / extent 相关头文件一起指向几何度量、坐标系、extent 和 instancer 工具，应与 `metrics.h` 的 upAxis/metersPerUnit 语义核对。",
      "`blackbody.h`、`parseUtils.h`、`usd_render/spec.h`、`rmanUtilities.h`、`connectableAPIBehavior.h`、UsdSkel 多个 `utils.h` group、`authoring.h`、`dependencies.h`、`introspection.h`、`usdzPackage.h`、`stitchClips.h`、`localizeAsset.h` 与 `stitch.h` 显示本页还覆盖渲染、物理、shading、skinning、authoring、packaging 和 asset localization 工具链。"
    ],
    terms: [
      ["file member index", "文件成员索引"],
      ["collection membership", "集合成员关系"],
      ["flatten layer stack", "扁平化 layer stack"],
      ["stage metrics", "stage 度量"],
      ["connectable behavior", "可连接行为"],
      ["asset localization", "资产本地化"]
    ]
  },
  {
    output: "full_site/api/functions_func_p.html",
    title: "Class Members - Functions - P",
    notes: [
      "`functions_func_p.html` 是 P 段函数成员索引，函数名常围绕 parse、populate、prepare、process、push、print 等语义展开；本页条目多，必须按 Sdf/Sdr/UsdVol/Pcp/Hd/Vdf 等模块分组阅读。",
      "`SdfPathTable<MappedType>`、`SdfPredicateParamNamesAndDefaults::Param`、`SdfPredicateProgram`、`SdfPathExpression` 相关条目属于 path table、predicate 参数和表达式求值主线，可用于定位路径集合匹配与参数化谓词。",
      "`SdrRegistry`、`HioGlslfxResourceLayout`、`SdrParserPlugin`、`UsdShadeShaderDefParserPlugin` 和 `UsdSchemaRegistry` 指向 shader discovery、parser plugin、resource layout 与 schema registry，阅读时应区分 parser、registry 和 shader definition。",
      "`UsdVolParticleFieldKernelConstantSurfletAPI`、`UsdVolParticleFieldKernelGaussianEllipsoidAPI`、`UsdVolParticleFieldKernelGaussianSurfletAPI`、`UsdVolParticleField3DGaussianSplat`、`UsdVolParticleFieldPositionAttributeAPI` 与 `UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 是 usdVol particle field / kernel schema 线索。",
      "`PcpCache`、`PcpDynamicFileFormatDependencyData`、`PcpErrorBase`、`PcpExpressionVariables`、`PcpInstanceKey`、`PcpLayerRelocatesEditBuilder`、`PcpLayerStackIdentifier`、`PcpMapExpression`、`PcpMapFunction`、`PcpPrimIndex` 和 `PcpPropertyIndex` 构成 composition/cache/path mapping/error diagnostic 主线；`HdEmbreeRenderDelegate`、`HdRenderThread`、`UsdImagingGLEngine`、`HgiGLGarbageCollector` 则偏 Hydra/rendering support。"
    ],
    terms: [
      ["predicate parameter", "谓词参数"],
      ["parser plugin", "解析插件"],
      ["particle field kernel", "粒子场核函数"],
      ["dynamic file format dependency", "动态文件格式依赖"],
      ["layer relocates edit", "layer relocates 编辑"],
      ["render delegate", "渲染委托"]
    ]
  },
  {
    output: "full_site/api/functions_func_r.html",
    title: "Class Members - Functions - R",
    notes: [
      "`functions_func_r.html` 是 R 段函数成员索引，常见语义包括 read、range、register、remove、record、reset、resolve；本页实际横跨 Ar/Hio/Sdf 资源读取、Vdf 数据访问、Hd/HdSt buffer、Trace 和 UsdAppUtils。",
      "`ArAsset`、`ArFilesystemAsset`、`ArInMemoryAsset`、`HioGlslfxConfig` 与 `HioImage` 是资源读取和 image/shader container 支撑入口；`SdfFileFormat`、`SdfUsdaFileFormat`、`SdfUsdcFileFormat`、`SdfUsdFileFormat` 和 `SdfUsdzFileFormat` 指向 USD layer/file format 读取路径。",
      "`SdfChildrenView<_ChildPolicy, _Predicate, _Adapter>`、`SdfListProxy<_TypePolicy>`、`TfSpan<T>`、`VtArray<ELEM>`、`VdfConnectorMap<Connector>` 与 `VdfInputSpecs` 是容器视图、list proxy、span、数组和 connector/input specs 线索。",
      "`VdfVector::ReadAccessor<TYPE>` 与 `VdfVector::ReadWriteAccessor<TYPE>` 需要保留 template 参数；它们用于 Vdf vector 数据读取/读写访问，不应翻译成单个固定 C++ 类型。",
      "`HdBufferArrayRange`、`HdStInterleavedMemoryManager::_StripedInterleavedBufferRange`、`HdStVBOMemoryManager::_StripedBufferArrayRange`、`HdStCommandBuffer`、`HdStTextureHandle`、`TraceSerialization`、`TraceCounterHolder`、`TraceCollector` 和 `UsdAppUtilsFrameRecorder` 显示本页还涉及 GPU buffer range、command buffer、texture handle、trace serialization 和 frame recording。"
    ],
    terms: [
      ["resource read path", "资源读取路径"],
      ["file format reader", "文件格式读取器"],
      ["list proxy", "列表代理"],
      ["read-write accessor", "读写访问器"],
      ["buffer range", "缓冲区范围"],
      ["frame recorder", "帧记录器"]
    ]
  },
  {
    output: "full_site/api/hd_st_page_front.html",
    title: "HdSt: Rendering functionality for HdStorm",
    notes: [
      "`hd_st_page_front.html` 是 `HdSt` 模块 front page，核心定位是 `HdStorm` render delegate 的 rendering implementation layer；它不是 `Hd` framework 的总览，也不是 `Hdx` task/controller 层。",
      "官方摘录强调 `HdSt` 会从 Hydra `renderIndex` 拉取来自一个或多个 scenegraph inputs 的数据，并创建一个或多个 command buffers 来聚合并共享 GPU resources，例如 primvar data。",
      "`primvar data`、GPU buffers、command buffers、render pass state、texture handles、dispatch buffers 和 cached playback 是阅读 `HdSt` 类页面时的关键词；它们解释 Storm 如何把 scene data 变成可提交给 Hgi/graphics backend 的资源。",
      "`HdSt` 既要处理 dynamically changing scenes，也要优化 cached playback；因此读者遇到 dirty bits、buffer invalidation、resource registry 或 draw item 更新时，应把它们放在动态同步和缓存复用之间理解。",
      "本地复刻页暂未抽取同站 class 链接，但后续阅读可围绕 `HdStRenderPassState`、`HdStDispatchBuffer`、`HdStBufferArrayRegistry`、`HdStCommandBuffer`、`HdStTextureHandle`、`HdStShaderCode` 等 Storm 实现类展开。"
    ],
    terms: [
      ["Storm implementation layer", "Storm 实现层"],
      ["renderIndex data pull", "renderIndex 数据拉取"],
      ["command buffer aggregation", "命令缓冲聚合"],
      ["GPU resource sharing", "GPU 资源共享"],
      ["cached playback", "缓存播放"],
      ["dirty bits", "脏位标记"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引或模块入口页二次精修说明，重点解释 Doxygen 字母桶、File Members 与模块 front page 的阅读方式、跨模块条目的归类边界，以及何时应跳转到目标 class、schema、header、group 或用户指南。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index or module-front page. It explains how to read Doxygen letter buckets, File Members, and module front pages, how to group cross-module entries, and when to jump to target class, schema, header, group, or user-guide documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
