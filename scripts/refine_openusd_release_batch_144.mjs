import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-144";

const refinements = [
  {
    output: "full_site/api/class_sdf_layer.html",
    title: "SdfLayer",
    summary:
      "`SdfLayer` 是 Sdf 层级的 scene description container，内容遵循 `SdfData` data model，并可通过 `ArAsset` / `ArResolver` 访问、序列化和解析。阅读本页时要把 layer 看成 composition 的基础存储单元，而不是已经完成合成的 `UsdStage` 视图。",
    notes: [
      "一个 layer 可以是 anonymous / ephemeral，也可以是磁盘或资产系统中的持久文件；因此 `identifier`、resolved path、file format arguments 与 asset resolver 语义要分开理解。",
      "`RootPrimsView` 与 `ApplyRootPrimOrder()` 关注 layer 内 root prim specs 的顺序和视图；它们处理的是当前 layer 的 authored specs，不等同于 stage 组合后的 prim 顺序。",
      "`Apply()`、`CanApply()` 与 namespace edit / change list 相关，适合用于批量编辑前的合法性检查和应用；失败时通常需要查看 edit detail，而不是只看布尔返回值。",
      "`Clear()` 会清空 layer 内容，`AddToMutedLayers()` 则影响全局 muted layer 机制；这两类操作都会影响 composition 结果，使用前应明确作用域和后续重载策略。",
      "`SdfLayer` 的 API 面向低层 scene description 存储、遍历和序列化；如果需要看到 composed opinions、population mask 或 load rules，通常应转到 `UsdStage` 层理解。",
    ],
    terms: [
      ["层", "SdfLayer"],
      ["场景描述容器", "scene description container"],
      ["层标识符", "identifier"],
      ["解析路径", "resolved path"],
      ["根 prim 视图", "RootPrimsView"],
      ["命名空间编辑", "namespace edit"],
    ],
  },
  {
    output: "full_site/api/class_usd_prim.html",
    title: "UsdPrim",
    summary:
      "`UsdPrim` 是 `UsdStage` 上唯一持久的 scenegraph object，也是 USD 场景描述中 prim 的主要 API 入口。它聚合 attributes、relationships、variant sets、references、payloads、inherits、specializes、metadata 和 applied API schemas 等多种 scene description。",
    notes: [
      "`UsdPrim` 是轻量 handle：`IsValid()`、`GetStage()`、`GetPath()` 与 `GetPrimIndex()` 帮助确认 handle 是否仍对应 stage 中的有效对象和 composition 结果。",
      "`GetAttribute()` / `CreateAttribute()` 与 `GetRelationship()` / `CreateRelationship()` 处理 property 级对象；若只需要枚举，可结合 property predicate、property order 和 traversal helper 使用。",
      "`GetVariantSets()`、`GetReferences()`、`GetPayloads()`、`GetInherits()` 与 `GetSpecializes()` 分别对应不同 composition arcs，调试强弱意见时不要把它们混为普通 metadata。",
      "`ApplyAPI()`、`AddAppliedSchema()`、`HasAPI()` 与 schema registry 相关；它们影响 prim 上声明的 schema behavior，但不会自动保证所有相关 attributes 都已 author。",
      "`IsActive()`、`IsLoaded()`、`IsDefined()`、`IsAbstract()`、model kind 和 type name 是不同维度的状态；遍历或过滤 prim 时应按实际任务选择谓词。",
    ],
    terms: [
      ["Prim 句柄", "UsdPrim"],
      ["舞台", "UsdStage"],
      ["组合弧", "composition arc"],
      ["变体集", "variant sets"],
      ["引用", "references"],
      ["应用型 API schema", "applied API schema"],
    ],
  },
  {
    output: "full_site/api/class_sdf_path.html",
    title: "SdfPath",
    summary:
      "`SdfPath` 是定位 layer 或 scenegraph 对象的路径值，可作为 `SdfLayer` 中的存储 key、scenegraph namespace identity，也可用于 relationship target 等引用。它区分 absolute path、relative path、prim path、property path、target path 和 variant selection path。",
    notes: [
      "`AbsoluteRootPath()` 表示绝对根路径；相对路径通常相对于包含它的 prim 或 property 解释，不能直接当成 stage 绝对路径使用。",
      "`AppendChild()`、`AppendProperty()`、`AppendTarget()`、`AppendVariantSelection()` 等方法会构造特定语法的 path element，比手写字符串更不容易破坏 USD path grammar。",
      "`ContainsPropertyElements()`、`ContainsTargetPath()` 与 `ContainsPrimVariantSelection()` 可用于判断路径是否包含 property、relationship target 或 variant selection 语义。",
      "`AppendElementString()` / `AppendElementToken()` 适合低层工具，但调用者必须理解 path element syntax；普通代码优先使用更具体的 append helper。",
      "本页的 thread-safety 提示应与 `SdfPath` 的值对象语义一起理解：路径对象适合被广泛共享，但路径构造和全局路径表行为仍应遵循文档约束。",
    ],
    terms: [
      ["路径值", "SdfPath"],
      ["绝对路径", "absolute path"],
      ["相对路径", "relative path"],
      ["属性路径", "property path"],
      ["目标路径", "target path"],
      ["变体选择", "variant selection"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_mesh.html",
    title: "UsdGeomMesh",
    summary:
      "`UsdGeomMesh` 表示带可选 subdivision properties 和特征的 point-based primitive。它使用 `points`、`faceVertexCounts` 与 `faceVertexIndices` 描述面片连接关系，并通过 subdivision scheme、creases、corners、holes 和 interpolation 相关属性控制细分与显示语义。",
    notes: [
      "`faceVertexCounts` 给出每个 face 的 face-vertex 数量，`faceVertexIndices` 则引用 `points` 数组；两者长度和索引范围不一致会直接破坏 mesh topology。",
      "英文摘录强调避免混用 vertex 与 point：USD mesh 以 points 为几何点数组，face-vertices 是面中引用 points 的索引位置。",
      "`CreateSubdivisionSchemeAttr()`、`CreateInterpolateBoundaryAttr()`、`CreateFaceVaryingLinearInterpolationAttr()` 与 `CreateTriangleSubdivisionRuleAttr()` 共同影响 subdivision surface 解释。",
      "`CreateCreaseIndicesAttr()`、`CreateCreaseLengthsAttr()`、`CreateCreaseSharpnessesAttr()` 以及 corner/hole 相关属性用于表达 creases、corners 和 holes 等细分特征。",
      "`Define()` 和 `Get()` 是 schema wrapper 的常用入口：前者在 stage 上 author typed prim，后者只获取已有 prim 的 typed schema view。",
    ],
    terms: [
      ["网格", "UsdGeomMesh"],
      ["点数组", "points"],
      ["面顶点计数", "faceVertexCounts"],
      ["面顶点索引", "faceVertexIndices"],
      ["细分方案", "subdivisionScheme"],
      ["锐边/折痕", "creases"],
    ],
  },
  {
    output: "full_site/api/class_usd_stage_cache.html",
    title: "UsdStageCache",
    summary:
      "`UsdStageCache` 是强并发安全的 `UsdStageRefPtr` collection，用于在多个 clients 和 threads 之间共享 stage。典型用法是通过 `UsdStageCacheContext` 绑定 cache，再调用 `UsdStage::Open()` 查找或发布 stage。",
    notes: [
      "`UsdStageCache` 的强线程安全只覆盖构造和析构之外的操作；对象生命周期本身仍需要由调用方清晰管理。",
      "`Find()`、`FindOneMatching()` 与 `FindAllMatching()` 按 cache key / matching criteria 查询 stage；如果有多个匹配项，应明确选择单个还是全部。",
      "`Contains()`、`Insert()`、`Erase()`、`EraseAll()` 和 `Clear()` 管理 cache 内容，适合配合测试、长生命周期工具或多场景应用的资源回收策略。",
      "`GetAllStages()` 适合诊断 cache 当前持有的 stages，但不应在性能敏感路径中当作常规查找机制。",
      "`UsdStageCache` 不改变 stage composition 本身；它只是共享和复用 `UsdStage` 实例，stage 的 root layer、session layer、resolver context 和 load state 仍决定具体内容。",
    ],
    terms: [
      ["舞台缓存", "UsdStageCache"],
      ["舞台强引用", "UsdStageRefPtr"],
      ["缓存上下文", "UsdStageCacheContext"],
      ["强线程安全", "strongly thread safe"],
      ["匹配查询", "FindOneMatching()"],
      ["全部舞台", "GetAllStages()"],
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
      <h2>中文三次补强导读 / Chinese Third-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This third-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
