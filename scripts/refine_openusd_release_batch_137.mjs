import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-137";

const refinements = [
  {
    output: "full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html",
    title: "UsdSkelImagingDataSourceSkeletonPrim",
    summary:
      "`UsdSkelImagingDataSourceSkeletonPrim` 是 UsdSkel `Skeleton` prim 的 imaging data source，把 skeleton prim 暴露给 Hydra/UsdImaging 的 data source 体系。它关注的是 skeleton prim 如何被成像层查询和同步，不是 `UsdSkelSkeleton` schema authoring 或骨骼动画求解器。",
    notes: [
      "`Get()` 返回指定 name 对应的 `HdDataSourceBaseHandle`，用于从 container data source 中取出某个字段；调用方需要使用 `TfToken` 名称而不是直接访问 USD attribute。",
      "`GetNames()` 返回该 prim data source 可提供的 token names，适合调试 Hydra scene index 或定位 skeleton data source 中有哪些字段可读。",
      "继承链中的 `UsdImagingDataSourceGprim`、`UsdImagingDataSourcePrim` 和 `HdContainerDataSource` 说明它在 USD prim 和 Hydra data source 之间做适配。",
      "`UsdImagingDataSourceStageGlobals`、`SdfPath`、`UsdPrim` 与 `HdDataSourceLocator` 是构造和定位 data source 的上下文依赖，不表示该类负责 stage traversal。",
      "阅读本页时应把 skeleton topology、joint order 和 animation evaluation 留给 UsdSkel 相关 schema/compute API；本类只说明 imaging 数据暴露边界。",
    ],
    terms: [
      ["骨架 prim 数据源", "Skeleton prim data source"],
      ["Hydra 容器数据源", "HdContainerDataSource"],
      ["数据源名称列表", "GetNames()"],
      ["数据源字段读取", "Get()"],
      ["成像层适配", "imaging data source adaptation"],
      ["stage 全局上下文", "UsdImagingDataSourceStageGlobals"],
    ],
  },
  {
    output: "full_site/api/class_usd_imaging_adapter_registry.html",
    title: "UsdImagingAdapterRegistry",
    summary:
      "`UsdImagingAdapterRegistry` 是 USD Imaging 的 PrimAdapter 和 API schema adapter 工厂注册表。它保存 adapter factories，并按 schema/type 构造 adapter instances，使 `UsdImagingDelegate` 能把不同 USD prim 或 API schema 映射为 Hydra 可消费的数据。",
    notes: [
      "`GetInstance()` 体现该 registry 采用 singleton 模式；`TfSingleton< UsdImagingAdapterRegistry >` 是 friend，说明实例生命周期由 Tf singleton 基础设施管理。",
      "`ConstructAdapter()` 按 prim type 构造 prim adapter；`ConstructAPISchemaAdapter()` 与 `ConstructKeylessAPISchemaAdapters()` 则面向 applied API schema 或无 key API schema。",
      "`GetAdapterKeys()` 和 `GetAPISchemaAdapterKeys()` 用于列举注册项；`HasAdapter()` 与 `HasAPISchemaAdapter()` 用于在构造前判断某类 adapter 是否可用。",
      "`AreExternalPluginsEnabled()` 反映外部 adapter plug-ins 是否参与 discovery；排查 schema 没有显示时，要同时检查插件加载和 adapter key。",
      "本类不直接渲染 prim，也不持有 per-stage adapter state；实际 adapter instances 通常随 stage/delegate 侧数据管理。",
    ],
    terms: [
      ["适配器注册表", "UsdImagingAdapterRegistry"],
      ["prim adapter 工厂", "PrimAdapter factory"],
      ["API schema adapter", "API schema adapter"],
      ["adapter key", "adapter key"],
      ["外部插件", "external plugins"],
      ["singleton 注册表", "TfSingleton"],
    ],
  },
  {
    output: "full_site/api/class_usd_imaging_nurbs_patch_adapter.html",
    title: "UsdImagingNurbsPatchAdapter",
    summary:
      "`UsdImagingNurbsPatchAdapter` 为 `UsdGeomNurbsPatch` 提供 USD Imaging delegate support，负责把 NURBS patch 的点、拓扑、subprim 数据和可变性信息转给 imaging/Hydra。它是具体 schema 类型的 prim adapter，不是 NURBS 曲面求值库。",
    notes: [
      "`GetPoints()` 和 `GetTopology()` 位于 Data access 语境下，是把 NURBS patch 几何数据暴露给成像层的核心入口。",
      "`GetImagingSubprims()`、`GetImagingSubprimType()` 和 `GetImagingSubprimData()` 描述一个 USD prim 在 imaging 层可拆出的 subprim 列表、类型和数据。",
      "`Populate()` 负责将 prim 初次注册到 render index / delegate 相关结构；`IsSupported()` 则可用于判断该 adapter 是否能处理给定 prim。",
      "`TrackVariability()` 与 `ProcessPropertyChange()` 帮助 delegate 判断属性是否随时间变化以及 property change 需要触发什么 dirty state。",
      "`InvalidateImagingSubprim()` 用于 data source 或 subprim 缓存失效；阅读时应和 `UsdImagingDelegate` 的整体同步流程一起看。",
    ],
    terms: [
      ["NURBS patch 适配器", "UsdImagingNurbsPatchAdapter"],
      ["NURBS patch schema", "UsdGeomNurbsPatch"],
      ["imaging 子 prim", "imaging subprim"],
      ["点数据", "GetPoints()"],
      ["拓扑数据", "GetTopology()"],
      ["属性变更处理", "ProcessPropertyChange()"],
    ],
  },
  {
    output: "full_site/api/class_sdf_usdz_file_format.html",
    title: "SdfUsdzFileFormat",
    summary:
      "`SdfUsdzFileFormat` 是 Sdf 层的 `.usdz` package file format 插件，负责把 USDZ package 作为 layer/file format 读取和写出。它属于 `SdfFileFormat` / `SdfLayer` 的底层 I/O 机制，不是 `UsdStage` API，也不负责解析场景组合语义。",
    notes: [
      "`CanRead()`、`Read()` 与 `_ReadDetached()` 处理读取路径；其中 detached 读取适合理解 package 内容与外部文件系统解耦的情况。",
      "`ReadFromString()`、`WriteToString()`、`WriteToStream()` 和 `WriteToFile()` 覆盖字符串、流和文件目标，说明该 file format 仍遵循通用 Sdf file format 接口。",
      "`GetPackageRootLayerPath()` 用于定位 USDZ package 内的 root layer，是区别普通 `.usd` / `.usda` / `.usdc` 文件的重要入口。",
      "`IsPackage()` 返回 package 语义判断；工具链可据此决定是否需要 package-aware asset resolution 或 root layer 展开逻辑。",
      "`SDF_FILE_FORMAT_FACTORY_ACCESS` 与 `InitData()` 表明该类经由 Sdf 插件工厂和初始化数据参与注册，用户通常不会手工 new 这个类型。",
    ],
    terms: [
      ["USDZ 文件格式", "SdfUsdzFileFormat"],
      ["package file format", "package file format"],
      ["包内根 layer", "package root layer"],
      ["Sdf 文件格式插件", "SdfFileFormat plugin"],
      ["离线读取", "_ReadDetached()"],
      ["文件格式参数", "FileFormatArguments"],
    ],
  },
  {
    output: "full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html",
    title: "UsdVolParticleFieldSphericalHarmonicsAttributeAPI",
    summary:
      "`UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 是应用到 `ParticleField` 上的 API schema，用 spherical harmonics coefficients 描述每粒子的 radiance。它规定 SH degree 在整个 `ParticleField` 内保持常量，并提供 float 与 half 系数属性以适配不同精度的消费端。",
    notes: [
      "`Apply()` 与 `CanApply()` 表示这是 applied API schema；使用前应确认目标 prim 是否适合承载 particle field spherical harmonics radiance 属性。",
      "`CreateRadianceSphericalHarmonicsDegreeAttr()` / `GetRadianceSphericalHarmonicsDegreeAttr()` 管理 SH degree，degree 决定每粒子的 coefficient 数量。",
      "`CreateRadianceSphericalHarmonicsCoefficientsAttr()` 与 getter 处理 float coefficients；页面说明数据消费者在可用时应优先使用 float 版本。",
      "`CreateRadianceSphericalHarmonicsCoefficientshAttr()` 与 getter 处理 half coefficients；half 版本可节省存储，但可能影响 radiance 精度。",
      "数组长度应与 particle count 和每粒子 coefficient 数一致；阅读时要和 position、opacity、orientation 等 particle attribute API 一起核对数据布局。",
    ],
    terms: [
      ["粒子场球谐属性 API", "UsdVolParticleFieldSphericalHarmonicsAttributeAPI"],
      ["球谐阶数", "spherical harmonics degree"],
      ["辐射亮度系数", "radiance coefficients"],
      ["float 系数", "float coefficients"],
      ["half 系数", "half coefficients"],
      ["每粒子数据布局", "per-particle data layout"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`);
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
