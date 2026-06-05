import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-086";

const refinements = [
  {
    output: "full_site/api/functions_c.html",
    title: "Class Members - C",
    notes: [
      "`functions_c.html` 是 Class Members 的 C 段总索引，条目同时包含 composition、cache、curve topology、camera utility、collection/color API、schema token table 和 applied API schema；它适合做符号定位，不适合作为单一主题教程阅读。",
      "`PcpPrimIndexInputs`、`PcpNamespaceEdits::CacheSite`、`PcpNamespaceEdits`、`Ef_PageCache`、`ExecIrControllerBuilder` 和 `VdfTypeDispatchTable<Fn>` 构成 composition/cache/execution 相关线索，可用于追踪 prim index、namespace edits、page cache 和执行类型分发。",
      "`TraceEventList`、`TraceAggregateNode`、`TfMallocTag::CallTree` 与 `CallbackNodeType` 指向性能追踪、内存标记或测试回调；这些条目和 Usd schema API 只是在 C 段索引并列，语义上应分组阅读。",
      "`HdBasisCurvesTopology`、`HdEmbreeConfig`、`UsdRenderSpec::Product`、`CameraUtilFraming` 和 `CameraUtilScreenWindowParameters` 偏 Hydra/render/camera utility；阅读时要和 Sdf/Pcp composition 条目分开。",
      "`SdfPathPattern`、`SdfLayer`、`UsdCollectionAPI`、`UsdColorSpaceAPI`、`UsdGeomMotionAPI`、`UsdLuxLightAPI`、`UsdPhysicsArticulationRootAPI` 等 applied API schema 条目需要跳转到对应 class 页面确认适用 prim、属性、relationship 和 schema 版本边界。"
    ],
    terms: [
      ["class member index", "类成员索引"],
      ["prim index inputs", "prim index 输入"],
      ["namespace edits", "命名空间编辑"],
      ["page cache", "页缓存"],
      ["curve topology", "曲线拓扑"],
      ["applied API schema", "可应用 API schema"]
    ]
  },
  {
    output: "full_site/api/globals_func_v.html",
    title: "File Members - Functions - V",
    notes: [
      "`globals_func_v.html` 是 File Members 函数索引的 V 段，和 Class Members 不同，它列出的是头文件级函数或 group 函数入口；阅读时应特别保留函数名和头文件名。",
      "`Vdf_DataManagerVectorAllocate()` 来自 `dataManagerVector.h`，`Vdf_IsPoolOutput()` 来自 `poolChainIndex.h`，`VdfEstimateSize()` 来自 `estimateSize.h`；这些条目偏 Vdf data manager、pool output 和尺寸估算工具。",
      "`VdfEmptyNodeCallback()`、`VdfGetAssociatedSourceOutput()`、`VdfIsSpeculating()`、`VdfIsTopologicalSourceNode()` 与 `VdfTraverseTopologicalSourceNodes()` 都来自 `networkUtil.h`，应按 Vdf network traversal/source node/speculation 语境理解。",
      "`VdfGetMaskedOutputVectorNetwork()` 与 `VdfSortAndUniqueMaskedOutputVector()` 来自 `maskedOutputVector.h`，用于 masked output vector 网络提取、排序和去重；它们常服务于执行网络局部分析。",
      "`VdfIsParallelEvaluationEnabled()`、`VdfScheduleTaskIsInvalid()`、`VtDictionaryGet()`、`base/vt/types.h` 与 `vt/hash.h` 提示本页还混合 Vdf schedule、parallel evaluation 和 Vt dictionary/hash 工具。"
    ],
    terms: [
      ["file member function", "文件级函数成员"],
      ["data manager vector", "数据管理器向量"],
      ["pool output", "池输出"],
      ["source output", "源输出"],
      ["parallel evaluation", "并行求值"],
      ["dictionary lookup", "字典查询"]
    ]
  },
  {
    output: "full_site/api/functions_vars_j.html",
    title: "Class Members - Variables - J",
    notes: [
      "`functions_vars_j.html` 是 J 段变量索引，条目很少，但跨越 Hydra Embree 配置、UsdPhysics joint descriptor、UsdSkel token 和 physics custom token 解析。",
      "`UsdPhysicsD6JointDesc` 与 `UsdPhysicsJointDesc` 是本页核心，指向 joint descriptor 数据结构；`D6 joint` 名称应保留英文，因为它表达多自由度关节类型，不适合替换成泛化中文名。",
      "`UsdPhysicsCustomTokens` 来自 `parse_utils.h`，用于物理自定义 token 的解析或映射语境；它应和 joint descriptor 一起核对，而不是和 UsdSkel token 混在一起。",
      "`UsdSkelTokensType` 是 skeleton schema token table，和物理 joint descriptor 属于不同 schema domain；如果读者在查 skel 字段，应跳到 token type 页面确认 token 字面量。",
      "`HdEmbreeConfig` 是 Hydra Embree 配置入口，常涉及 ray tracing backend 的配置项；它在 J 段只是变量名索引结果，不表示 Embree 配置属于 UsdPhysics。"
    ],
    terms: [
      ["variable member index", "变量成员索引"],
      ["D6 joint", "D6 关节"],
      ["joint descriptor", "关节描述结构"],
      ["custom tokens", "自定义 token"],
      ["skeleton tokens", "骨骼 token"],
      ["Embree config", "Embree 配置"]
    ]
  },
  {
    output: "full_site/api/functions_d.html",
    title: "Class Members - D",
    notes: [
      "`functions_d.html` 是 Class Members 的 D 段总索引，当前条目明显分成 Gf math、Tf/Vt runtime containers、Vdf executor data manager、Sdf zip/file info、Usd imaging/render 和 Trace 几组。",
      "`GfMatrix2/3/4d/f` 与 `GfVec2/3/4d/f/h/i` 是 Gf 数学类型主线；后缀 `d`、`f`、`h`、`i` 表示数值精度或存储类型，英文类型名必须保持原样。",
      "`TfSmallVector<T, N>`、`TfSpan<T>`、`TfToken`、`TfRefPtr<T>`、`VtArray<ELEM>` 与 `Vdf_BoxedContainer<T>` 属于基础容器、token、引用计数和类型封装线索，适合按 runtime support 阅读。",
      "`Vdf_ExecutorDataManagerTraits<VdfDataManagerHashTable>`、`Vdf_ExecutorDataVector`、`Vdf_ParallelExecutorDataManagerTraits<VdfParallelDataManagerVector>`、`Vdf_ParallelExecutorDataVector`、`VdfDataManagerVector<DeallocationMode>` 和 `VdfSimpleExecutor` 是 execution data manager 主线。",
      "`UsdPhysicsJointDrive`、`SdfZipFile::FileInfo`、`UsdImagingDataSourceMapped`、`TraceEvent`、`UsdRenderSpec::RenderVar` 和 `UsdRenderTokensType` 分别提示 physics drive、zip file metadata、imaging data source、trace event 和 render var/token 语境。"
    ],
    terms: [
      ["matrix type", "矩阵类型"],
      ["vector type", "向量类型"],
      ["runtime container", "运行时容器"],
      ["executor data manager", "执行器数据管理器"],
      ["joint drive", "关节驱动"],
      ["render variable", "渲染变量"]
    ]
  },
  {
    output: "full_site/api/hio_page_front.html",
    title: "Hio: Hydra Resource I/O",
    notes: [
      "`hio_page_front.html` 是 `Hio: Hydra Resource I/O` 模块入口，不是普通索引字母页；它帮助读者理解 Hydra 如何读取 shader container、image/texture 和 field texture resource。",
      "`HioGlslfx` 负责解释 Pixar 的 `glslfx` GPU shader container format，重点是 shader snippets composition 和可用于 code generation 的 metadata；它更接近 shader/resource layer，而不是 UsdShade authoring schema。",
      "`HioImage` 是 plugin-based image/texture-reading abstraction，`hdStorm` 的 image I/O 会使用它；`HioStb_Image` 和 `HioOIIO_Image` 是不同后端实现路径，涉及 build/deployment 选择。",
      "`HioFieldTextureData` 面向 volume/field texture data，适合和 UsdVol、field asset、renderer texture upload 流程一起阅读，而不是和普通 2D image I/O 混淆。",
      "`Working With Image File Formats` 是用户指南入口，可帮助理解图像格式插件、OpenImageIO、stb 支持范围和部署问题；本页中文层把 Hio 定位为 Hydra renderer 的资源读取层，不负责 scene graph、composition 或 render task 调度。"
    ],
    terms: [
      ["Hydra Resource I/O", "Hydra 资源输入输出"],
      ["shader container", "shader 容器"],
      ["glslfx", "glslfx"],
      ["image I/O backend", "图像 I/O 后端"],
      ["field texture data", "场纹理数据"],
      ["resource loading layer", "资源加载层"]
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
