import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-129";

const refinements = [
  {
    output: "full_site/api/class_sdf_layer.html",
    title: "SdfLayer",
    summary:
      "`SdfLayer` 是 Sdf 层级的 scene description container，承载 authored specs、metadata、subLayer 路径、root prims 和文件 I/O 状态。它比 `UsdStage` 更底层：`UsdStage` 看到的是 composition 后的结果，而 `SdfLayer` 关注某一个 layer 文件或匿名 layer 中实际写下来的数据。",
    notes: [
      "`Primary API` 通常覆盖创建、打开、查找、保存和匿名 layer 管理；阅读这些函数时要区分 identifier、realPath、resolved path 和 display name。",
      "`Traversal` 与 `Prims` 关注 layer 内 specs 的枚举和 root prim 管理；这些 API 常与 `SdfPath`、`SdfPrimSpec`、`SdfPropertySpec` 和 `SdfChildrenView` 一起出现。",
      "`File I/O` 部分涉及 `Export()`、`Save()`、`Reload()`、`ImportFromString()` 等持久化入口；如果 layer 来自 package 或 custom resolver，还要回到 `ArAsset` / `ArResolver` 语境核对。",
      "`Metadata` 与 `Muting` 分别对应 layer 级元数据和静音层策略；muted layer 会影响 composition 可见性，但不等于删除 layer 文件或 authored opinions。",
      "调试 USD 内容时应分别记录 layer identifier、root layer、session layer 和 subLayer stack，避免把某个 `SdfLayer` 中的 authored opinion 误认为 stage 上的最终 resolved value。",
    ],
    terms: [
      ["SdfLayer", "Sdf layer 对象"],
      ["authored specs", "已写入 spec"],
      ["layer identifier", "layer 标识符"],
      ["subLayer stack", "子层栈"],
      ["muted layer", "静音层"],
      ["resolved value", "解析后的最终值"],
    ],
  },
  {
    output: "full_site/api/class_sdf_path.html",
    title: "SdfPath",
    summary:
      "`SdfPath` 是 OpenUSD 中最核心的路径值类型之一，用来标识 layer 或 composed scenegraph 中的 prim、property、relationship target、variant selection 和 relational attribute。它是值对象，不直接代表对象本身。",
    notes: [
      "`Path Syntax` 是阅读本页的关键：absolute prim path、relative path、property path、target path、mapper path 和 variant selection 在字符串形式上都有约束。",
      "`SdfPath` 常作为 `SdfLayer` 内部查找的 storage key，也作为 `UsdPrim`、`UsdProperty`、`PcpNode` 等高层 API 的标识；同一个路径在不同 layer 或 stage context 下语义可能不同。",
      "`A Note on Thread-Safety` 应保留英文语义核对；路径值通常可安全共享，但不要把路径缓存、path table 或外部对象生命周期混为一谈。",
      "组合或拼接路径时要谨慎使用 parent/child、AppendProperty、AppendVariantSelection、MakeRelativePath 等方法，避免生成 syntactically valid 但语义错误的路径。",
      "调试 relationship target 或 reference/payload path 时，应明确路径是 authored relative path、anchored asset path 还是 resolved prim path；这三类问题经常被混用。",
    ],
    terms: [
      ["SdfPath", "Sdf 路径"],
      ["absolute prim path", "绝对 prim 路径"],
      ["property path", "属性路径"],
      ["variant selection", "变体选择"],
      ["storage key", "存储键"],
      ["path syntax", "路径语法"],
    ],
  },
  {
    output: "full_site/api/class_sdf_prim_spec.html",
    title: "SdfPrimSpec",
    summary:
      "`SdfPrimSpec` 表示某个 `SdfLayer` 中 authored prim 的底层描述，包括 specifier、typeName、metadata、attributes、relationships、nameChildren 和 propertyChildren。它是 composition 输入，不是 `UsdPrim` 的运行时视图。",
    notes: [
      "`New()` 可以在 layer 根级或另一个 `SdfPrimSpec` 下创建 prim spec；用它写入 hierarchy 时要同时确认 name、specifier、typeName 和 parent spec。",
      "`SdfCreatePrimInLayer()` 是常见 helper，可自动补齐中间 prim specs；适合 authoring 脚本，但仍需要检查生成的 specifier 和 metadata 是否符合预期。",
      "`AttributeSpecView`、`RelationshipSpecView`、`NameChildrenView` 与 `PropertySpecView` 暴露的是 authored child specs；它们和 stage 上最终看到的 composed children 不是同一层概念。",
      "处理 references、inherits、specializes、variantSets、payloads 或 permissions 时，应把 `SdfPrimSpec` 当作存储 opinions 的容器，而不是 composition solver。",
      "排查数据差异时建议同时打印 `SdfPrimSpec::GetPath()`、所在 `SdfLayer` identifier 和最终 `UsdPrim` path，明确问题发生在 authoring、composition 还是 stage view 层。",
    ],
    terms: [
      ["SdfPrimSpec", "Sdf prim spec"],
      ["specifier", "specifier 类型"],
      ["typeName", "类型名"],
      ["nameChildren", "命名子 prim"],
      ["propertyChildren", "属性子项"],
      ["authored opinion", "已写入 opinion"],
    ],
  },
  {
    output: "full_site/api/class_hd_scene_delegate.html",
    title: "HdSceneDelegate",
    summary:
      "`HdSceneDelegate` 是传统 Hydra 架构中连接 client scene graph 与 `HdRenderIndex` 的数据适配器。它让 Hydra 通过统一查询接口获取 topology、transform、extent、primvars、materials、instancing、render buffer 和 time samples 等数据。",
    notes: [
      "`HdSceneDelegate` 的职责是提供数据，不是执行最终渲染；实际渲染由 render delegate、render pass、task 和底层 graphics / renderer backend 共同完成。",
      "`GetMeshTopology()`、`GetBasisCurvesTopology()`、`GetTransform()`、`GetPrimvarDescriptors()`、`Get()` 等接口通常由具体 delegate 按 prim path 回答数据查询。",
      "`HdChangeTracker`、dirty bits 和 sync 语义决定 Hydra 何时重新拉取数据；如果画面没有更新，应检查 dirty 标记是否正确传播。",
      "`UsdImagingDelegate`、`HdSceneIndexAdapterSceneDelegate`、`HdUnitTestDelegate` 与 `HdxFreeCameraSceneDelegate` 代表不同来源的 scene delegate；不要把 USD imaging、scene index adapter、测试 delegate 和相机 delegate 混为一类。",
      "新代码若使用 Hydra 2.0 scene index pipeline，需要理解 `HdSceneDelegate` 与 `HdSceneIndex` / data source 路径的关系：前者是传统适配器，后者是新的数据流表达。",
    ],
    terms: [
      ["HdSceneDelegate", "Hydra 场景委托"],
      ["client scene graph", "客户端场景图"],
      ["HdRenderIndex", "Hydra 渲染索引"],
      ["dirty bits", "脏标记位"],
      ["primvar descriptors", "primvar 描述符"],
      ["scene index pipeline", "场景索引管线"],
    ],
  },
  {
    output: "full_site/api/class_hd_render_buffer.html",
    title: "HdRenderBuffer",
    summary:
      "`HdRenderBuffer` 是 Hydra 中抽象的 render buffer bprim，代表渲染器可以写入或映射读取的数据资源，例如 AOV、color buffer、depth buffer 或辅助输出。它连接 scene delegate、render pass、task 和 renderer backend 的缓冲管理。",
    notes: [
      "作为 indexed prim 时，`HdRenderBuffer` 的属性通常由 `HdSceneDelegate` 提供；out-of-band 创建时，则可能由调用方直接传入 allocation parameters。",
      "`Renderbuffer API` 通常围绕 allocation、format、dimensions、multi-sample、converged state、map/unmap 和 resolve 等职责展开；阅读时应区分分配与数据访问。",
      "`DirtyBits` 表示 render buffer 哪些方面需要重新同步；如果尺寸、格式或多重采样设置变化但渲染结果未更新，应检查 dirty bit 是否正确设置。",
      "`Map()` / `Unmap()` 语义涉及 CPU 侧访问 buffer data；具体线程安全、同步和生命周期规则由实现类和 renderer backend 决定。",
      "在渲染调试中，`HdRenderBuffer` 常与 `HdRenderPass`、`HdRenderPassState`、`HdAovDescriptor`、`HdRenderBufferDescriptor` 和 `HdTask` 一起出现，应按数据写入链路阅读。",
    ],
    terms: [
      ["HdRenderBuffer", "Hydra 渲染缓冲"],
      ["render buffer bprim", "渲染缓冲 bprim"],
      ["allocation parameters", "分配参数"],
      ["DirtyBits", "脏标记位"],
      ["Map/Unmap", "映射/取消映射"],
      ["AOV", "任意输出变量"],
    ],
  },
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
  results,
}, null, 2));
