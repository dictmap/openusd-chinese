import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-038";

const refinements = [
  {
    output: "full_site/api/class_pcp_property_index.html",
    title: "PcpPropertyIndex Class Reference",
    notes: [
      "`PcpPropertyIndex` 是针对某个 property 的 composition index，用来汇总所有会给该 property 贡献 opinions 的 scene description sites。",
      "英文摘录强调它遵循 composition semantics；因此阅读时应把它放在 Pcp 组合语义下理解，而不是把它当作单个 `SdfPropertySpec` 的简单列表。",
      "核心成员包括 `GetPropertyRange()`、`GetNumLocalSpecs()`、`GetLocalErrors()`、`IsEmpty()` 和 `Swap()`，分别对应遍历贡献节点、统计本地 specs、查看局部错误、判断空索引和交换索引内容。",
      "`PcpPropertyIterator` 是 friend，说明 property index 主要通过 iterator/range 访问贡献 opinions；后续完整翻译应继续补充 iterator 的顺序和错误传播语义。",
      "本页应与上一轮已精修的 `PcpArc` 一起阅读：`PcpArc` 描述组合图中的边，`PcpPropertyIndex` 则面向某个 property 汇总组合后的 opinion 来源。"
    ],
    terms: [
      ["property index", "property 组合索引"],
      ["opinion", "意见 / authored opinion"],
      ["scene description site", "场景描述站点"],
      ["composition semantics", "组合语义"],
      ["local errors", "局部错误"]
    ]
  },
  {
    output: "full_site/api/class_sdf_children_view.html",
    title: "SdfChildrenView< _ChildPolicy, _Predicate, _Adapter > Class Template Reference",
    notes: [
      "`SdfChildrenView` 是一个 template view，用于以统一的容器视图形式访问某个对象的 children。",
      "模板参数 `_ChildPolicy` 决定底层 child 类型和读取策略，`_Predicate` 负责过滤，`_Adapter` 负责把底层值适配成调用者要看到的值；这些参数名应保持英文原样。",
      "页面结构列出 `Public Types`、`Public Member Functions`、`Protected Member Functions`，说明它既提供 STL 风格遍历接口，也保留策略类/适配器扩展点。",
      "在 `SdfLayer`、`SdfPrimSpec` 等页面中看到的 `RootPrimsView`、children view 或 spec 子对象访问，通常都可以回到这类 view 模型理解。",
      "本轮中文层重点补充 template 参数角色和使用场景；后续完整翻译应继续补 iterator 类型、begin/end、size、empty 和 predicate 行为。"
    ],
    terms: [
      ["children view", "子对象视图"],
      ["ChildPolicy", "子对象策略"],
      ["Predicate", "过滤谓词"],
      ["Adapter", "适配器"],
      ["STL-style traversal", "STL 风格遍历"]
    ]
  },
  {
    output: "full_site/api/class_sdf_layer.html",
    title: "SdfLayer Class Reference",
    notes: [
      "`SdfLayer` 是 USD/Sdf 的 scene description container，可与其他 layers 组合成 component assets，并进一步组成更大的 aggregates。",
      "英文摘录说明 layer 内容遵循 `SdfData` data model；layer 可以是 ephemeral，也可以是通过 `ArAsset` 与 `ArResolver` 访问和序列化的 asset。",
      "页面结构中的 `Primary API`、`Traversal`、`Prims`、`File I/O`、`Identification`、`Metadata`、`Muting` 对应了 layer 的主要职责：创建/打开、遍历 specs、管理 root prims、读写文件、标识层、读写元数据和静音层。",
      "`SdfLayer` 是很多 API 的中心对象：`SdfPath` 用于寻址 layer 内对象，`SdfPrimSpec` 表示 layer 中的 prim 描述，`SdfChildrenView` 常用于暴露 root prims 或 child specs。",
      "阅读本页时要区分 layer 的 authored scene description 与 `UsdStage` 的组合结果；`SdfLayer` 更接近底层数据容器和序列化接口。"
    ],
    terms: [
      ["scene description container", "场景描述容器"],
      ["ephemeral layer", "临时 layer"],
      ["File I/O", "文件读写"],
      ["Muting", "静音 / 屏蔽 layer"],
      ["SdfData data model", "SdfData 数据模型"]
    ]
  },
  {
    output: "full_site/api/class_sdf_path.html",
    title: "SdfPath Class Reference",
    notes: [
      "`SdfPath` 是用于定位 layers 或 scenegraphs 中对象的路径值，也是 Sdf、Pcp 和 Usd API 中最常见的标识类型之一。",
      "英文摘录列出三种常见用途：作为 `SdfLayer` 内访问值的 storage key、作为 scenegraph object 的 namespace identity，以及通过 relative paths 引用其他 scenegraph objects。",
      "路径可以是 relative 或 absolute；例如 relationship target 如果是 relative path，它相对于包含该 relationship 的 prim object 解析。",
      "页面结构中的大量 member functions 通常围绕路径解析、拼接、父子关系、属性路径、variant selection、relational attribute 和 namespace 判断展开。",
      "本轮中文层保留 `SdfPath`、prim path、property path、absolute path、relative path 等术语；后续完整翻译应逐步补方法级别说明和路径语法示例。"
    ],
    terms: [
      ["storage key", "存储键"],
      ["namespace identity", "命名空间身份"],
      ["absolute path", "绝对路径"],
      ["relative path", "相对路径"],
      ["relationship target", "关系目标"]
    ]
  },
  {
    output: "full_site/api/class_sdf_prim_spec.html",
    title: "SdfPrimSpec Class Reference",
    notes: [
      "`SdfPrimSpec` 表示 `SdfLayer` 中的 prim description；每个 `SdfPrimSpec` 都定义在某个 layer 内，并通过它在该 layer namespace hierarchy 中的 `SdfPath` 标识。",
      "英文摘录说明 `SdfPrimSpec` 可通过 `New()` 创建：既可以作为 layer 的 root-level prim，也可以作为其他 `SdfPrimSpec` 的 child 来扩展 hierarchy。",
      "`SdfCreatePrimInLayer()` 可用于快速创建 primSpecs hierarchy；这类 helper 适合 authoring 脚本中批量补齐中间 prim 路径。",
      "页面结构包含 `Public Types`、member functions 和相关 links，阅读重点通常是 specifier/typeName、attributes、relationships、metadata、nameChildren、propertyChildren 等 authored 数据。",
      "要把 `SdfPrimSpec` 与运行时 `UsdPrim` 区分开：前者是某个 layer 中的底层 authored spec，后者是 stage composition 后面向用户的 prim 视图。"
    ],
    terms: [
      ["prim description", "prim 描述"],
      ["root-level prim", "根层级 prim"],
      ["namespace hierarchy", "命名空间层级"],
      ["authored spec", "已编写 spec"],
      ["UsdPrim", "UsdPrim"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、相关 API 关系和术语对照；英文页面名、类名、方法名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, related API context, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
