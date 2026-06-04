import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-guide-quality-pass-003";

const refinements = [
  {
    output: "full_site/release/tut_variants_example_in_katana.html",
    title: "Variants Example in Katana",
    notes: [
      "这是一篇历史教程，阅读时应把它作为 USD variant 切换在 Katana 管线中暴露给用户的设计样例，而不是当前版本的安装说明。",
      "官方页明确说明 Katana USD plugin 已在 USD 20.05 之后从发行包移除，后续应参考 Foundry-supported plugin；本地复刻保留该背景，避免误导用户按旧插件路径部署。",
      "页面价值在于展示 modeling variants 如何成为 DCC 应用中的可选项：USD 侧保留变体集，Katana 侧通过插件 UI 或节点逻辑选择目标 variant。",
      "后续若继续精修，应重点补齐 variant set、variant selection、Katana node graph 和资产发布流程之间的对应关系，而不是扩写已经过时的插件安装细节。"
    ],
    terms: [
      ["variant switching", "变体切换"],
      ["Katana USD plugin", "Katana USD 插件"],
      ["Foundry-supported plugin", "Foundry 维护插件"],
      ["modeling variants", "建模变体"],
      ["historical tutorial", "历史教程"]
    ]
  },
  {
    output: "full_site/release/user_guides/collections_and_patterns.html",
    title: "Collections and Patterns",
    notes: [
      "Collections 用来描述场景中一组异质对象，可以直接包含 prim、property，也可以包含其他 collection；它是后续 light-linking、material binding 等批量关系表达的基础。",
      "本页最重要的区分是 relationship-mode 与 expression-mode：前者用显式关系目标维护包含和排除集合，后者用 pattern expression 按路径或模式计算成员。",
      "一个 collection 不应同时混用两种模式，collection 的 expansion rule、include/exclude 关系和 membershipExpression 需要按当前模式理解，否则容易得到和预期不一致的成员结果。",
      "阅读代码片段时保留 CollectionAPI、relCollection、expCollection 等名称不翻译；中文层只说明它们在集合声明、成员计算和下游消费中的角色。"
    ],
    terms: [
      ["CollectionAPI", "集合 API schema"],
      ["relationship-mode", "关系模式"],
      ["expression-mode", "表达式模式"],
      ["membershipExpression", "成员表达式"],
      ["light-linking", "灯光链接"]
    ]
  },
  {
    output: "full_site/release/user_guides/namespace_editing.html",
    title: "Namespace Editing",
    notes: [
      "Namespace editing 指在 stage 上删除、移动、重命名或重设父级一个 composed prim/property；它处理的是组合后的命名空间路径，不只是单个 layer 里的文本替换。",
      "和直接编辑 SdfLayer 或 UsdStage 的局部操作不同，本页讨论的 namespace edit 需要考虑 LayerStack、EditTarget、path fixups 以及跨层组合后路径是否仍然一致。",
      "relocates composition arc 是非破坏性重定位的重要机制：当资产引用来自外部或需要保持原文件稳定时，可以通过重定位表达新的命名空间布局。",
      "阅读时应把 delete、move、rename、reparenting 看成一组有组合语义的编辑操作；中文说明只解释行为边界，API 名称和路径示例保持原样。"
    ],
    terms: [
      ["namespace edit", "命名空间编辑"],
      ["LayerStack", "层栈"],
      ["EditTarget", "编辑目标"],
      ["relocates", "重定位组合弧"],
      ["reparenting", "重设父级"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/index.html",
    title: "Schema Domains",
    notes: [
      "本页是 schema domains 的索引页，不是长篇概念正文；它的主要用途是把读者引导到 usdLux、usdMedia、usdRender、usdUI、usdVol 等领域入口。",
      "页面中的 schema 名称应保持英文原名，因为它们同时是模块名、API 页面名和本地链接目标；中文层只补充每个领域的大致职责。",
      "建议按领域入口阅读：先进入 toc 或 Overview 页面理解该 domain 的整体设计，再跳到具体 schema 页面查看属性、继承关系和代码生成信息。",
      "后续精修可继续给各 domain 首页补充中文导读，但不要在这个索引页批量改写所有 schema 类名，否则会降低搜索和对照官方文档的可用性。"
    ],
    terms: [
      ["schema domain", "schema 领域"],
      ["usdLux", "灯光 schema 领域"],
      ["usdMedia", "媒体 schema 领域"],
      ["usdRender", "渲染 schema 领域"],
      ["usdUI", "UI 元数据 schema 领域"]
    ]
  },
  {
    output: "full_site/release/plugins_alembic.html",
    title: "Alembic USD Plugin",
    notes: [
      "Alembic USD Plugin 页面说明 usdAbc 文件格式插件如何让 USD 工具读取和处理 Alembic 数据；它适合用作 Alembic 互操作入口，而不是 USD 核心概念入门页。",
      "官方页强调该插件默认不构建，必须在 CMake 中启用 PXR_BUILD_ALEMBIC_PLUGIN；因此本地中文层保留构建开关和版本限制，避免用户误以为发行包必然带有 Alembic 支持。",
      "usdAbc 展示的是 custom file format plugin 模式：USD 通过插件接口把外部格式映射进统一的 stage/layer 访问体验，后续工具仍可使用熟悉的 USD 命令链处理数据。",
      "Known Limitations 和 Advanced Build Configuration 相关链接应与正文一起阅读；API 名称、CMake 选项、文件扩展名 .usda/.usdc 继续保持原样。"
    ],
    terms: [
      ["Alembic USD Plugin", "Alembic USD 插件"],
      ["PXR_BUILD_ALEMBIC_PLUGIN", "Alembic 插件构建开关"],
      ["usdAbc", "Alembic 文件格式插件"],
      ["custom file format plugin", "自定义文件格式插件"],
      ["Advanced Build Configuration", "高级构建配置"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的阅读路径、关键概念说明和术语对照；英文页面名、链接、代码、命令和原文摘录继续保留，便于和官方文档逐项核对。</p>
      <p class="en">This section adds Chinese-first reading guidance for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, and source excerpts for comparison with the official documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
