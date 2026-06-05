import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-075";

const refinements = [
  {
    output: "full_site/release/wp_usdaudio.html",
    title: "UsdAudio Proposal",
    notes: [
      "`UsdAudio Proposal` 是已实现的历史 proposal；当前 API 入口应优先看 `UsdMediaSpatialAudio`，本页主要用于理解 schema 设计动机。",
      "proposal 的范围是为 USD 场景中的音频元素提供 interchange schema，支持 timed-start playback、空间位置/方向以及 ambient sound。",
      "音频数据不直接嵌入 USD，而是通过 `assetPath`/`filePath` 指向外部文件或流；这保持了 scene description 与媒体 payload 的边界。",
      "`startTime`、`mediaOffset`、`level` 和 `timeCodesPerSecond` 用来把音频播放与 USD 时间轴对齐，但该 schema 不覆盖复杂音频编辑、trigger 或交互式环境逻辑。",
      "阅读示例时应把 `SpatialAudio` prim 当作带位置的声音源：位置/方向来自可变换 prim 语义，音频播放参数来自 UsdMedia/UsdAudio 属性。"
    ],
    terms: [
      ["UsdAudio Proposal", "UsdAudio 历史提案"],
      ["UsdMediaSpatialAudio", "当前空间音频 schema 入口"],
      ["timed-start playback", "定时开始播放"],
      ["assetPath / filePath", "外部音频资产路径"],
      ["ambient sound", "环境声"],
      ["mediaOffset", "媒体内部起始偏移"]
    ]
  },
  {
    output: "full_site/release/wp_usdshade.html",
    title: "UsdShade Material Assignment",
    notes: [
      "`UsdShade Material Assignment` 是已实现的历史 proposal；当前用法应优先核对 `UsdShade overview`，本页保留材质绑定设计背景。",
      "文档核心问题是 material binding 的解析：直接绑定会被 descendant 更强绑定覆盖，但 renderer 还需要找到自己能消费的 material output。",
      "proposal 引入或讨论 collection-based assignment、binding strength、material purpose 与 material resolve，用来处理大规模场景中的材质分配和覆盖。",
      "示例中的 `PreviewMaterial` 与 `Skin` 展示不同 renderer-specific outputs；`material:binding` relationship 说明 prim 如何指向材质。",
      "阅读时不要把该页等同于完整 shading 网络教程；它主要解释材质 assignment/resolution 规则，shader 结构仍需回到 UsdShade API 和 schema 页面。"
    ],
    terms: [
      ["UsdShade Material Assignment", "UsdShade 材质分配"],
      ["material:binding", "材质绑定关系"],
      ["collection-based assignment", "基于集合的材质分配"],
      ["binding strength", "绑定强度"],
      ["material purpose", "材质用途"],
      ["material resolve", "材质解析"]
    ]
  },
  {
    output: "full_site/release/wp.html",
    title: "Proposals",
    notes: [
      "`Proposals` 是 release 文档中的 proposal 目录页；官方说明新的 proposal 不再追加到这里，应转到 `OpenUSD-proposals`。",
      "本页的价值是导航而不是正文翻译：它把旧 proposal 入口集中列出，并让本地复刻可以继续跳转到已覆盖的本地页面。",
      "列表中的主题覆盖 UsdLux、Asset Resolution (Ar) 2.0、Asset Previews、Coordinate Systems、Connectable Nodes、Render Settings、Rigid Body Physics、Schema Versioning、Stage Variable Expressions、UsdAudio 和 UsdShade 等。",
      "清单内链接应优先路由到本地 HTML；清单外或迁移到 proposals 仓库的链接保留 placeholder 或官方跳转状态。",
      "阅读时应把该页当成 historical proposal index：它说明规范演化路径，不代表每个条目都是当前最新 API 使用指南。"
    ],
    terms: [
      ["Proposals", "提案汇总"],
      ["OpenUSD-proposals", "新提案发布与评审位置"],
      ["historical proposal index", "历史提案索引"],
      ["Asset Resolution (Ar) 2.0", "资产解析 Ar 2.0"],
      ["Render Settings", "渲染设置提案"],
      ["Schema Versioning", "schema 版本化提案"]
    ]
  },
  {
    output: "full_site/api/copy_utils_8h.html",
    title: "copyUtils.h File",
    notes: [
      "`copyUtils.h` 是 Sdf 层级中用于 spec copying 的 API 索引页；它不是源码页，但列出了高级 spec copy 相关类型和函数入口。",
      "`SdfCopySpec()` 是核心函数入口，用于在 layer/path 之间复制 spec；页面有两个 overload，应结合参数签名和 `SdfLayer`、`SdfPath` 一起阅读。",
      "`SdfShouldCopyChildrenFn` 与 `SdfShouldCopyValueFn` 是回调类型，用来决定 children 或 field/value 是否应在复制过程中保留。",
      "`SdfCopySpecsValueEdit`、`TfToken` 和 `VtValue` 相关链接说明高级复制 API 可对字段值进行筛选、编辑或替换，而不是简单逐字节复制。",
      "阅读本页时保留 `SdfCopySpec`、`SdfSpecType`、`SdfPath` 等英文 API 名称，因为这些名称直接对应 C++/Python API 和 Doxygen 索引。"
    ],
    terms: [
      ["copyUtils.h", "Sdf spec 复制工具头文件"],
      ["SdfCopySpec()", "复制 spec 的函数入口"],
      ["SdfShouldCopyChildrenFn", "children 复制判定回调"],
      ["SdfShouldCopyValueFn", "value/field 复制判定回调"],
      ["SdfCopySpecsValueEdit", "复制过程中的值编辑对象"],
      ["Advanced Spec Copying API", "高级 spec 复制 API"]
    ]
  },
  {
    output: "full_site/api/journal_8h.html",
    title: "journal.h File",
    notes: [
      "`journal.h` 是 OpenExec/ESF 相关的 API File 页面，当前本地页列出的主要类是 `EsfJournal`。",
      "官方摘录说明 `EsfJournal` stores a collection of edit reasons associated with scene objects；也就是说它记录场景对象相关的 edit reasons 集合。",
      "该页链接了 `edit_reason_8h.html`、`dense_hash_map_8h.html`、`TfToken`、`SdfPath` 等依赖，表明 journal 数据会和路径、token、哈希容器及 ESF API 边界一起使用。",
      "阅读时应把它作为 Exec scene interface 的辅助诊断/记录结构，而不是通用 USD Layer edit log 或用户层面的撤销栈。",
      "本页目前可读信息很短；中文精修层只解释索引项和依赖含义，不伪造 `EsfJournal` 的未摘录成员函数细节。"
    ],
    terms: [
      ["journal.h", "ESF journal 头文件"],
      ["EsfJournal", "ESF 编辑原因记录集合"],
      ["edit reasons", "编辑原因"],
      ["scene objects", "场景对象"],
      ["Exec scene interface", "Exec 场景接口"],
      ["diagnostic / record structure", "诊断/记录结构"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的页面定位、关键机制、阅读边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first page positioning, key mechanisms, reading boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
