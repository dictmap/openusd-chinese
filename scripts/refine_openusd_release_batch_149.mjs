import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-members-index-quality-pass-149";

const refinements = [
  {
    output: "full_site/api/functions_func_d.html",
    title: "Class Members - Functions - D",
    summary:
      "`functions_func_d.html` 是 Class Members 函数索引的 D 段，当前条目主要是 `GfMatrix*`、`GfVec*` 和少量 container / Hydra buffer 相关成员。它适合按首字母快速定位函数成员，但具体数学语义仍要进入目标 class 页面确认。",
    notes: [
      "`GfMatrix2d`、`GfMatrix3f`、`GfMatrix4d` 等名称中的数字表示维度，`d` / `f` 表示 double / float 精度；中文说明不改变这些可搜索类型名。",
      "`GfVec2*`、`GfVec3*`、`GfVec4*` 条目和矩阵条目常用于 transform、extent、normal、point、color 或 numeric tuple 的 API 查找。",
      "如果条目跳到 `TfSmallVector`、`TfSpan`、`VtArray` 等容器类型，应把它视为成员函数索引命中，不一定属于 Gf 数学模块本身。",
      "Hydra / HdSt buffer 相关链接说明 D 段还包含渲染缓冲或 staging buffer 成员；阅读时要按目标类所属模块分组。",
      "本页没有函数签名细节；需要 overload、constness、返回值或模板参数时，应继续打开具体 class 页面和对应成员锚点。",
    ],
    terms: [
      ["函数成员索引", "function member index"],
      ["矩阵成员", "matrix member"],
      ["向量成员", "vector member"],
      ["维度后缀", "dimension suffix"],
      ["精度后缀", "precision suffix"],
      ["容器命中", "container hit"],
    ],
  },
  {
    output: "full_site/api/functions_func_k.html",
    title: "Class Members - Functions - K",
    summary:
      "`functions_func_k.html` 是 Class Members 函数索引的 K 段，页面很短，但仍连接到 `SdfChildrenView` 和 `SdfNotice::LayerInfoDidChange`。它的价值在于快速发现 K 开头成员背后的 Sdf children view 与 notice 机制。",
    notes: [
      "`SdfChildrenView` 是 view-style API，常用于遍历 layer / spec 下的 children；阅读时要关注 owner 生命周期、predicate 和 adapter，而不是把它当成拥有数据的容器。",
      "`SdfNotice::LayerInfoDidChange` 属于 notice / observer 体系，提示 layer info 或 metadata 变化；它更偏事件通知，不是普通属性读取函数。",
      "K 段条目少并不代表对应 API 不重要；短索引页常用于补齐字母导航，仍应保留本地链接和官方原页入口。",
      "若从这里进入 notice 页面，应继续检查通知触发条件、监听者注册和回调线程边界。",
      "若从这里进入 children view 页面，应继续检查 `begin()` / `end()`、`size()`、predicate filtering 和 adapter 转换语义。",
    ],
    terms: [
      ["K 段函数索引", "K function index"],
      ["子项视图", "children view"],
      ["通知体系", "notice system"],
      ["观察者", "observer"],
      ["谓词过滤", "predicate filtering"],
      ["适配器转换", "adapter conversion"],
    ],
  },
  {
    output: "full_site/api/functions_vars_u.html",
    title: "Class Members - Variables - U",
    summary:
      "`functions_vars_u.html` 是 Class Members 变量索引的 U 段，条目混合了 token tables、package file info、Gf ranges、Pcp composition diagnostics、UsdSkel bake 参数、Sdr discovery 和 Hydra imaging 配置。阅读时应按模块拆组，而不是把它们当成同一类变量。",
    notes: [
      "`UsdGeomTokensType`、`UsdUITokensType`、`UsdVolTokensType`、`UsdShadeTokensType` 等是 schema domain token 表，通常用于属性名、schema token 和 renderer / imaging 协议常量。",
      "`SdfZipFile::FileInfo` 指向 package / zip 条目信息，应和 `.usdz`、package asset、file offset、size 或 compression 相关概念一起阅读。",
      "`GfRange2d`、`GfRange3f` 等变量条目强调 math range 类型在索引中的出现位置；它们不是普通中文“范围”变量。",
      "`PcpCulledDependency` 与 `PcpErrorUnresolvedPrimPath` 属于 composition dependency 和 error diagnostics，和 imaging/Hydra 条目应分开理解。",
      "`UsdSkelBakeSkinningParms`、`SdrShaderNodeDiscoveryResult`、`HdMeshReprDesc`、`HdEmbreeConfig` 分别指向 skel bake、shader discovery、mesh repr 和 Embree backend 配置。",
    ],
    terms: [
      ["变量成员索引", "variable member index"],
      ["领域 token 表", "domain token table"],
      ["包文件信息", "package file info"],
      ["数学范围类型", "math range type"],
      ["组合诊断", "composition diagnostics"],
      ["后端配置", "backend configuration"],
    ],
  },
  {
    output: "full_site/api/functions_vars_v.html",
    title: "Class Members - Variables - V",
    summary:
      "`functions_vars_v.html` 是 Class Members 变量索引的 V 段，条目覆盖 value override、MaterialX / USD type info、asset info、shader discovery result、schema registry info 以及多组 domain tokens。它更像跨模块变量导航页，而不是单一主题页面。",
    notes: [
      "`ExecUsdValueOverride` 与 `ExecValueOverride` 关联执行系统中的 value override，阅读时应和普通配置项或 token 常量区分。",
      "`UsdMtlxUsdTypeInfo` 是 MaterialX 与 USD 类型映射线索，可继续跳到 `UsdMtlx` 模块入口或 UsdShade / Sdr 相关页面。",
      "`ArAssetInfo` 属于 asset resolver 信息结构，和 `resolvedPath`、asset identifier、version 或 repository metadata 相关。",
      "`SdrShaderNodeDiscoveryResult` 反映 shader discovery 阶段得到的节点元数据；它不是 shader network 本身。",
      "`UsdSchemaRegistry::SchemaInfo` 与 schema 注册表元数据有关，多组 `Usd*TokensType` 则应按 Ri、Geom、Vol、Shade、Lux 等 domain 分别阅读。",
    ],
    terms: [
      ["V 段变量索引", "V variable index"],
      ["值覆盖", "value override"],
      ["类型映射信息", "type mapping info"],
      ["资产信息", "asset info"],
      ["发现结果", "discovery result"],
      ["schema 注册表信息", "schema registry info"],
    ],
  },
  {
    output: "full_site/api/functions_func_o.html",
    title: "Class Members - Functions - O",
    summary:
      "`functions_func_o.html` 是 Class Members 函数索引的 O 段，横跨 tracing visitor、asset resolver、Sdf layer/package、Hydra renderer plugin、Hio image 和 command validator 等条目。它是跨模块函数导航页，需要按目标类所属系统来读。",
    notes: [
      "`TraceCollection::Visitor` 和 `VdfRequiredInputsPredicate` 分别指向 tracing visitor 和 Vdf dependency predicate，属于调试/执行图分析线索。",
      "`ArFilesystemAsset`、`ArPackageResolver`、`ArResolver`、`ArResolvedPath` 应归入 asset resolution / package resolution 体系，常用于定位文件、包内资源和 resolved path。",
      "`SdfCrateInfo`、`SdfZipFile`、`SdfZipFileWriter`、`SdfLayer` 与 layer 存储、crate、zip/usdz package 和写出路径相关。",
      "`HdPluginRenderDelegateUniqueHandle`、`HdPluginRendererUniqueHandle`、`HdRendererPluginHandle`、`HdSceneIndexPrim` 说明 O 段也覆盖 Hydra plugin 和 scene index 对象。",
      "`HioImage` 与 CLI validator 条目说明本页还混入 image IO 和工具命令校验入口；中文导读只做分组，具体签名仍以目标页面为准。",
    ],
    terms: [
      ["O 段函数索引", "O function index"],
      ["追踪访问器", "tracing visitor"],
      ["资产解析", "asset resolution"],
      ["包解析", "package resolution"],
      ["渲染插件句柄", "renderer plugin handle"],
      ["图像 IO", "image IO"],
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
      <h2>中文二次索引补强 / Chinese Index-Focused Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This index-focused refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
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
