import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-041";

const refinements = [
  {
    output: "full_site/api/class_usd_prim.html",
    title: "UsdPrim Class Reference",
    notes: [
      "`UsdPrim` 是 `UsdStage` 上唯一持久的 scenegraph object，也是 USD composition 中 Prim 概念在运行时 API 层的主要载体。",
      "英文摘录说明 `UsdPrim` 是其他 scene description 类型的 principal container，可访问和创建 `UsdVariantSets`、`UsdReferences`、`UsdInherits`、properties、metadata、payloads 等内容。",
      "页面结构中的 `Lifetime Management`、`SiblingIterator`、`SubtreeIterator`、`Instancing` 说明它既承担对象生命周期/有效性判断，也承担层级遍历和实例化相关查询。",
      "`ApplyAPI()`、`AddAppliedSchema()` 代表在 prim 上应用 API schema；`ApplyPropertyOrder()` 则影响 property 顺序，这些方法会改变 authored scene description。",
      "阅读本页时应把 `UsdPrim` 与上一轮已处理的 `SdfPrimSpec` 区分开：`SdfPrimSpec` 是 layer 中的底层 spec，`UsdPrim` 是 stage composition 后供客户端访问的 prim 视图。"
    ],
    terms: [
      ["UsdPrim", "UsdPrim"],
      ["scenegraph object", "场景图对象"],
      ["variant sets", "变体集合"],
      ["API schema", "API schema"],
      ["instancing", "实例化"]
    ]
  },
  {
    output: "full_site/api/class_usd_proc_generative_procedural.html",
    title: "UsdProcGenerativeProcedural Class Reference",
    notes: [
      "`UsdProcGenerativeProcedural` 表示 abstract generative procedural prim，用于在 USD 中描述程序化生成内容的定义和输入参数。",
      "英文摘录说明输入参数通过 `primvars:` namespace 下的 properties 或 relationships 传递；该 prim 本身不执行 procedural，也不直接参与 procedural execution。",
      "`proceduralSystem` 属性说明该 procedural definition 对哪个系统有意义；它可以由 authored value 提供，也可以由 API schema fallback 提供。",
      "页面中的 `CreateProceduralSystemAttr()` 和 `GetProceduralSystemAttr()` 是本类最关键的自有属性访问入口；`Define()`、`Get()` 则是 typed schema 常见构造/获取接口。",
      "阅读本页时应区分“描述 procedural 输入和系统归属”的 schema 与真正执行生成逻辑的 runtime/plugin；本类主要是 scene description contract。"
    ],
    terms: [
      ["generative procedural", "生成式 procedural"],
      ["proceduralSystem", "proceduralSystem"],
      ["primvars namespace", "primvars 命名空间"],
      ["fallback", "fallback 默认值"],
      ["scene description contract", "场景描述契约"]
    ]
  },
  {
    output: "full_site/api/class_usd_schema_registry.html",
    title: "UsdSchemaRegistry Class Reference",
    notes: [
      "`UsdSchemaRegistry` 是 singleton registry，用于访问已注册 USD `IsA` schema 和 applied API schema 的 schema type information 与 prim definitions。",
      "英文摘录说明 registry 还保存 generated schemas 中的数据，这些数据来自每个 schema-defining module 处理 `schema.usda` 后生成的 `generatedSchema.usda`。",
      "`SchemaInfo` 描述一个已注册 schema 的信息；`VersionPolicy`、`FindSchemaInfo()`、`FindSchemaInfosInFamily()` 用于处理 schema 家族、版本和查询。",
      "`FindConcretePrimDefinition()`、`FindAbstractPrimDefinition()`、`FindAppliedAPIPrimDefinition()` 和 `BuildComposedPrimDefinition()` 是从 schema 定义构建 prim definition 的主要入口。",
      "`GetAPISchemaCanOnlyApplyToTypeNames()` 与 auto-apply API schema 相关；阅读本页时应把它看作 USD schema 系统的元数据和定义查询中心。"
    ],
    terms: [
      ["schema registry", "schema 注册表"],
      ["IsA schema", "IsA schema"],
      ["applied API schema", "已应用 API schema"],
      ["prim definition", "prim 定义"],
      ["generatedSchema.usda", "generatedSchema.usda"]
    ]
  },
  {
    output: "full_site/api/class_usd_shade_output.html",
    title: "UsdShadeOutput Class Reference",
    notes: [
      "`UsdShadeOutput` 封装 shader 或 node-graph output，是一种 connectable attribute，表示带类型的外部计算值。",
      "页面结构将方法分为 `Connections API` 和 `UsdAttribute API`：前者管理输出连接，后者暴露底层 `UsdAttribute` 的访问能力。",
      "`CanConnect()`、`ConnectToSource()`、`DisconnectSource()`、`ClearSource()`、`ClearSources()` 是连接管理的核心入口，用于连接到 shader/node graph 的输出源或清理连接。",
      "`SourceInfoVector` 和 `ConnectionModification` 体现本类需要保存 source 信息并控制连接修改方式；`GetAttr()` 可取得底层 attribute。",
      "`ClearSdrMetadata()`、`ClearSdrMetadataByKey()` 表明 output 可携带 Sdr metadata；阅读本页时应结合 `UsdShadeInput`、`UsdShadeConnectableAPI` 和材质网络理解。"
    ],
    terms: [
      ["output", "输出"],
      ["connectable attribute", "可连接属性"],
      ["node graph", "节点图"],
      ["source", "源"],
      ["Sdr metadata", "Sdr metadata"]
    ]
  },
  {
    output: "full_site/api/class_usd_stage_cache.html",
    title: "UsdStageCache Class Reference",
    notes: [
      "`UsdStageCache` 是强并发安全的 `UsdStageRefPtr` 集合，用于在多个 clients 和 threads 之间共享 `UsdStage`。",
      "英文摘录说明除构造和析构外，所有操作都可以并发执行；典型用法是绑定 `UsdStageCacheContext` 后通过 `UsdStage::Open()` 查找或发布 stage。",
      "`Find()`、`FindOneMatching()`、`FindAllMatching()` 用于按条件查找缓存内 stage；`Contains()`、`GetAllStages()` 用于检查和枚举缓存内容。",
      "`Erase()`、`EraseAll()`、`Clear()` 控制移除缓存项；这些操作会影响后续客户端是否复用已有 stage，需注意并发和生命周期语义。",
      "阅读本页时应把 `UsdStageCache` 看作 stage 共享和复用机制，而不是 layer cache；它缓存的是已打开的 stage 对象及其引用指针。"
    ],
    terms: [
      ["stage cache", "stage 缓存"],
      ["UsdStageRefPtr", "UsdStageRefPtr"],
      ["concurrency safe", "并发安全"],
      ["UsdStageCacheContext", "UsdStageCacheContext"],
      ["stage reuse", "stage 复用"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、关键属性/方法分组和术语对照；英文页面名、类名、方法名、属性名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, key attribute/method groups, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
