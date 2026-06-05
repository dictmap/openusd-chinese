import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-100";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html",
    title: "NodeGraphNodeAPI",
    summary:
      "`NodeGraphNodeAPI` 是 `usdUI` 中面向 node graph 编辑器的 applied API schema。它记录节点在图编辑界面中的位置、颜色、层叠顺序、文档链接和展开状态等 UI 元数据，不改变 shader 节点本身的计算语义、连接关系或材质输出。",
    notes: [
      "本页应先按“图编辑器布局元数据”来读：`ui:nodegraph:node:pos` 描述节点在画布中的位置，`ui:nodegraph:node:displayColor` 描述节点显示颜色，`ui:nodegraph:node:stackingOrder` 描述相对深度或层叠强度，这些都服务于工具界面的可读性。",
      "示例中的 `PreviewSurface` 和 `Color` shader 节点保留了 `info:id`、`outputs:mtlx:surface`、`inputs:diffuseColor` 等 shader 语义；`NodeGraphNodeAPI` 只给这些节点补充 UI 布局提示，不应被理解成新的 shading network 连接规则。",
      "`ui:nodegraph:node:docURI` 可让工具把节点关联到说明文档或外部帮助资源，`ui:nodegraph:node:expansionState` 则表达节点在界面中是否展开；它们是编辑器体验数据，通常不会影响 renderer 的取样结果。",
      "排查材质图、节点图或 node editor 显示异常时，可以先检查这些 `ui:nodegraph:node:*` 属性是否在目标 prim 上按预期写入，再检查 shader 输入输出和 `connect` 关系，避免把布局问题误判为 shader 语义错误。",
      "翻译本页时必须保留 `NodeGraphNodeAPI`、`PreviewSurface`、`Color`、`ui:nodegraph:node:pos`、`ui:nodegraph:node:displayColor`、`ui:nodegraph:node:stackingOrder` 等字面量，因为它们既是 schema 属性名，也是 DCC 工具和脚本检索的关键字。"
    ],
    terms: [
      ["NodeGraphNodeAPI", "节点图 UI 元数据 API"],
      ["node graph", "节点图"],
      ["ui:nodegraph:node:pos", "节点图位置属性"],
      ["ui:nodegraph:node:displayColor", "节点图显示颜色属性"],
      ["ui:nodegraph:node:stackingOrder", "节点图层叠顺序属性"],
      ["ui:nodegraph:node:expansionState", "节点展开状态属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html",
    title: "OpenVDBAsset",
    summary:
      "`OpenVDBAsset` 是 `usdVol` 中用于引用外部 OpenVDB volume grid 的 `Field` schema。它通过 `.vdb` 资产路径、grid 名称、field index、field data type 和 time samples 把稀疏体数据接入 USD 场景，而不是把外部体素数据直接嵌入当前 USDA 文本。",
    notes: [
      "本页的核心句是 `A Field representing an OpenVDB volume grid`：`OpenVDBAsset` 表示一个来自 OpenVDB 文件的 volume grid，适合承载 density、temperature 等外部稀疏体数据入口。",
      "示例中的 `fieldDataType = \"float\"` 描述 grid 数据类型，`fieldName = \"density\"` 选择 `.vdb` 文件中的命名 grid，`fieldIndex` 给出索引入口；这些字面量要和外部 `.vdb` 文件内容对应。",
      "`filePath` 是 asset 路径，并且示例把它放入 `timeSamples` 中，说明不同时间码可以指向不同 VDB 文件或同一序列中的不同样本；这对体积动画、缓存序列和延迟加载很关键。",
      "和 `Field3DAsset` 类似，`OpenVDBAsset` 负责把 USD 场景与外部体积文件连接起来；差异在于这里的外部格式是 OpenVDB，页面中的 OpenVDB website 链接是格式/库背景资料，不属于 406 页本地清单。",
      "调试 `OpenVDBAsset` 时建议先确认 asset path、grid name、grid index、数据类型和时间样本是否能被下游工具解析，再判断 USD schema 层是否有问题；很多失败来自外部资源缺失或 grid 名不匹配。"
    ],
    terms: [
      ["OpenVDBAsset", "OpenVDB 体积场资产"],
      ["OpenVDB volume grid", "OpenVDB 体积网格"],
      [".vdb file", ".vdb 文件"],
      ["fieldDataType", "字段数据类型"],
      ["fieldIndex", "字段索引"],
      ["fieldName", "字段名"]
    ]
  },
  {
    output: "full_site/release/tut_inspect_and_author_props.html",
    title: "Inspecting and Authoring Properties",
    summary:
      "`Inspecting and Authoring Properties` 是 `Hello World` 之后的入门教程，用来演示如何打开 stage、取得 prim、检查属性并写入新的 authored opinions。阅读重点是从 `Usd.Stage.Open` 到 `GetPrimAtPath`，再到 attribute/relationship 的读取与写入路径。",
    notes: [
      "教程起点是 `extras/usd/tutorials/authoringProperties/HelloWorld.usda` 和 `authorProperties.py`；它假设读者已经创建过 `/hello` 与 `/hello/world`，因此本页不重新解释最基础的 stage 结构。",
      "示例代码 `stage = Usd.Stage.Open('HelloWorld.usda')`、`GetPrimAtPath('/hello')` 和 `GetPrimAtPath('/hello/world')` 展示了典型的 stage -> prim 访问链路；路径字面量必须保持原样。",
      "本页讨论的 property 包括 attribute 和 relationship。attribute 可以有类型、默认值、time samples 和 authored value；relationship 则表达到其他对象的目标关系，不应把两者都笼统翻成“字段”。",
      "当教程使用 `GetAttribute`、`Get`、`Set` 或 `Vt` 数组类型处理几何数据时，重点是理解“读取当前合成结果”和“在当前 EditTarget 写入新 opinion”的区别；这也是 USD 调试里最常见的分层误区。",
      "继续翻译本页时，应保留 `Usd`、`Vt`、`Stage.Open`、`GetPrimAtPath`、`HelloWorld.usda`、`/hello/world` 等 API 与路径字面量，让读者能直接对照 Python 脚本运行。"
    ],
    terms: [
      ["Inspecting and Authoring Properties", "检查与创作属性"],
      ["Usd.Stage.Open", "打开 USD stage 的 API"],
      ["GetPrimAtPath", "按路径取得 prim"],
      ["attribute", "属性"],
      ["relationship", "关系"],
      ["authored opinion", "已创作意见"]
    ]
  },
  {
    output: "full_site/api/functions_vars_q.html",
    title: "Class Members - Variables - q",
    summary:
      "`functions_vars_q.html` 是 Doxygen 的 Class Members - Variables 字母索引页，本页只覆盖变量名以 q 开头的条目。当前页面内容很短，主要价值是帮助读者从 `q` 字母段定位到对应类或 token 结构，而不是提供完整的 `usdVol` 或 token schema 指南。",
    notes: [
      "本页的 `- q -` 区块属于全局 class member variable 索引。它的职责是把变量条目汇总到一个字母导航入口，真正的语义说明通常需要点击到对应 class 或 struct 页面继续阅读。",
      "当前可见条目关联到 `UsdVolTokensType`，说明该索引段与 `usdVol` token 结构有关；token 名称和结构名应保持英文原样，因为它们常被 C++、Python 绑定和 schema 文档共同引用。",
      "由于本页条目数量少，中文精修不应伪造不存在的变量列表，也不应把它扩展成完整 `UsdVolTokensType` 文档；最稳妥的做法是解释索引用途、导航路径和保留字面量的原因。",
      "阅读这类 Doxygen 索引页时，建议先确认当前字母段、条目所属类名和链接目标，再进入具体 class/struct 页面查看属性用途、默认值和相关 schema 背景。",
      "后续如果上游文档在 `q` 字母段新增更多变量，本页仍应按索引页逻辑维护：变量名不翻译，中文只补充定位、阅读顺序和上下文解释。"
    ],
    terms: [
      ["Class Members - Variables", "类成员变量索引"],
      ["q", "q 字母段"],
      ["UsdVolTokensType", "UsdVol token 类型结构"],
      ["token", "token 字面量"],
      ["Doxygen index", "Doxygen 索引"],
      ["member variable", "成员变量"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html",
    title: "SceneGraphPrimAPI",
    summary:
      "`SceneGraphPrimAPI` 是 `usdUI` 中给 prim 或 shader 节点添加 scene graph 描述信息的 applied API schema。它通过 `apiSchemas`、`ui:displayGroup`、`ui:displayName` 等 UI hints 帮助工具组织和命名节点，不改变几何、材质连接或渲染语义。",
    notes: [
      "示例中 `prepend apiSchemas = [ \"SceneGraphPrimAPI\" ]` 表示把该 API schema 应用到对应 prim 上；这是一种 schema 应用声明，不是普通字符串标签，也不应翻译或改写。",
      "`ui:displayGroup = \"MyMaterial Nodes\"` 用来告诉界面这些 prim 或 shader 节点可归入同一显示分组，`ui:displayName = \"Preview Surface Node\"` 则提供面向用户的显示名称；两者都是 UI 层提示。",
      "本页和 `NodeGraphNodeAPI` 可以配套阅读：`SceneGraphPrimAPI` 偏向 scene graph 中的描述性分组与命名，`NodeGraphNodeAPI` 偏向 node graph 画布里的位置、颜色、层叠顺序和展开状态。",
      "这些 `ui:*` 属性有助于 DCC 工具、节点编辑器和检查面板提供更清晰的显示，但它们不会自动创建 shader connection，也不会改变 `outputs:mtlx:surface` 或材质绑定关系。",
      "排查界面显示名、分组或节点可读性问题时，应检查 `SceneGraphPrimAPI` 是否已在目标 prim 的 `apiSchemas` 中出现，并确认 `ui:displayGroup`、`ui:displayName` 是否写在预期对象上。"
    ],
    terms: [
      ["SceneGraphPrimAPI", "场景图 prim UI 描述 API"],
      ["apiSchemas", "已应用 schema 列表"],
      ["ui:displayGroup", "UI 显示分组属性"],
      ["ui:displayName", "UI 显示名称属性"],
      ["scene graph", "场景图"],
      ["applied API schema", "应用型 API schema"]
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>|    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
