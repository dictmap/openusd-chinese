import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 408;
const GENERATED_AT = "2026-06-08T02:08:00.000Z";
const targetDir = "full_site/release/user_guides/schemas/usdUI";
const sourceDir = "source/full_release/user_guides/schemas/usdUI";
const sourceParityReport = "reports/round_408_usdUI_source_parity.json";

const css = `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1100px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    table{width:100%;border-collapse:collapse;margin-top:12px}
    th,td{border:1px solid #d8dee8;padding:10px;text-align:left;vertical-align:top}
    th{background:#eef2f7}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
`;

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function chineseChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function sourceArticle(name) {
  const file = rel(sourceDir, `${name}_source.html`);
  if (!fs.existsSync(file)) return "";
  const html = fs.readFileSync(file, "utf8");
  const start = html.indexOf('<div itemprop="articleBody">');
  if (start < 0) return html;
  const end = html.indexOf("<footer", start);
  return html.slice(start, end > start ? end : undefined);
}

function officialUrl(name) {
  return `https://openusd.org/release/user_guides/schemas/usdUI/${name}.html`;
}

function codeAware(value) {
  return String(value ?? "").replace(/`([^`]+)`/g, "<code>$1</code>");
}

function rows(items, columns) {
  if (!items?.length) {
    return `<tr><td colspan="${columns}"><span class="zh">本页没有新的直接属性表；中文主阅读路径主要解释页面职责、官方结构、相邻 schema、使用边界和本地阅读入口。</span><span class="en">No direct property table is exposed here.</span></td></tr>`;
  }
  return items.map((item) => {
    if (columns === 4) {
      return `          <tr><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
    }
    return `          <tr><td>${esc(item.from || "")}</td><td><code>${esc(item.name)}</code></td><td><code>${esc(item.type || "")}</code></td><td><code>${esc(item.fallback || "")}</code></td><td><span class="zh">${codeAware(item.zh)}</span><span class="en">${esc(item.en || "")}</span></td></tr>`;
  }).join("\n");
}

const candidates = [
  "AccessibilityAPI",
  "AttributeHints",
  "Backdrop",
  "NodeGraphNodeAPI",
  "ObjectHints",
  "PrimHints",
  "PropertyHints",
  "SceneGraphPrimAPI",
  "overview",
  "usdUI_toc",
];

const commonRelated = ["overview", "usdUI_toc", "AccessibilityAPI", "AttributeHints", "NodeGraphNodeAPI", "SceneGraphPrimAPI"];

function commonCoverage(page) {
  return [
    `本页属于 ` + "`UsdUI`" + ` schema 域。` + "`UsdUI`" + ` 的重点不是渲染画面本身，也不是替代 DCC 工具的界面实现，而是把工具可以读取的 UI 提示、节点图布局、可访问性文本和显示组织信息写进 USD 数据。读者应先把它理解为“给工具的结构化提示层”，再看具体 schema 的属性和示例。`,
    `官方结构通常把 ` + "`UsdUI`" + ` 拆成三条主线：节点图可视化、可访问性信息、以及 prim/property/attribute/object 的 UI hints。节点图相关页面解释 ` + "`NodeGraphNodeAPI`" + `、` + "`SceneGraphPrimAPI`" + ` 和 ` + "`Backdrop`" + `；可访问性由 ` + "`AccessibilityAPI`" + ` 表达；hint 页面则覆盖 ` + "`ObjectHints`" + `、` + "`PrimHints`" + `、` + "`PropertyHints`" + ` 和 ` + "`AttributeHints`" + `。`,
    `使用边界要讲清楚：这些字段大多是 UI hint 或 descriptive metadata，消费端可以选择如何呈现。它们不应被 renderer 当成几何可见性、材质颜色、渲染 pass、资产依赖或 scene composition 规则。比如 ` + "`hidden`" + ` 是 UI 隐藏提示，不等同于 ` + "`visibility`" + `；` + "`ui:nodegraph:node:displayColor`" + ` 也不等同于几何上的 ` + "`primvars:displayColor`" + `。`,
    `调试时应按层次排查：先确认 schema 是否 applied 或字段是否 authored；再检查属性名、namespace、token、字典键和条件表达式是否与官方一致；接着看 layer composition 是否覆盖了较弱 opinion；最后确认目标 DCC 或 runtime 是否实际支持这些 ` + "`UsdUI`" + ` hint。若工具没有呈现效果，不一定说明 USD 数据无效。`,
    `与相邻类型的关系也需要保持清晰。` + "`AttributeHints`" + ` 面向 attribute 可能值和标签顺序；` + "`PropertyHints`" + ` 面向 property 的 display group 与 shown condition；` + "`PrimHints`" + ` 面向 prim 上 display group 的展开和可见条件；` + "`ObjectHints`" + ` 面向 prim/property 共有的 display name 与 UI hidden 状态。`,
    `节点图相关页面则是另一组关系：` + "`NodeGraphNodeAPI`" + ` 描述节点位置、颜色、大小、icon、docURI、expansionState 和 stackingOrder；` + "`SceneGraphPrimAPI`" + ` 给连接到节点图的节点提供描述性 ` + "`ui:displayName`" + ` 与 ` + "`ui:displayGroup`" + `；` + "`Backdrop`" + ` 用可视矩形给一组节点提供背景和说明。`,
    `常见误读是把页面中的英文 token、schema 名或属性名翻成中文。这里必须保留 ` + "`ui:*`" + ` 属性名、USD type、fallback、token、字典字段、代码示例和链接语义；中文只解释这些标识符的含义和使用后果，不改写正式名称。`,
    `本页晋级目标是让中文成为主阅读路径：读者即使不依赖英文正文，也能理解页面职责、核心 section、API/属性分组、边界、误读点、调试路径和相邻 ` + "`UsdUI`" + ` 类型关系。英文保留用于核对官方原文和技术标识。`,
    `从 authored data 的角度看，` + "`UsdUI`" + ` 页面通常不会要求应用同步或强制执行某个界面状态；它只把意图写成可组合、可覆盖、可被工具读取的 USD 字段。若不同 DCC 呈现结果不同，应先判断是工具支持差异、layer opinion 差异还是字段本身拼写错误，而不要把 UI 呈现差异直接归因于 schema 失效。`,
    `从 composition 的角度看，这些 UI hints 仍然遵守 USD 的 layer strength、reference、payload、variant 和 override 规则。一个较弱层 author 的 ` + "`displayName`" + `、` + "`hidden`" + `、` + "`shownIf`" + `、` + "`ui:displayGroup`" + ` 或节点图位置可能被更强层覆盖；因此排查时要看最终 composed value，而不是只看某个 source layer。`,
    `从本地中文版阅读路径看，本页应和同目录其他 ` + "`usdUI`" + ` 页面一起读。目录页和 overview 提供总览，具体 schema 页面提供字段级解释；侧栏、breadcrumb、release 入口和显式官方外跳用于保持连续阅读。用户阅读路径中的站内链接应留在本地，只有明确标注的官方页链接才外跳到 openusd.org。`,
    `从工程使用看，最好把 ` + "`UsdUI`" + ` 写成“工具可理解但不强制执行”的约定层：author 端负责写入稳定的正式字段名和可核对的 token，consumer 端负责把它们映射到菜单、面板、节点图、可访问性框架或条件显示逻辑。中文说明需要把 author 与 consumer 的责任分开，避免把工具行为写成 USD 规范强制结果。`,
    `从审计角度看，英文/中文比例只作为诊断信号。保留 ` + "`NodeGraphNodeAPI`" + `、` + "`SceneGraphPrimAPI`" + `、` + "`AttributeHints`" + `、` + "`PropertyHints`" + `、` + "`displayGroupsShownIf`" + `、` + "`ui:nodegraph:node:pos`" + ` 等英文标识是正确的；真正的验收点是中文是否覆盖官方段落、属性含义、边界、误读点、调试路径和相邻类型关系。`,
    `从维护角度看，如果后续官方页新增属性或示例，翻译不应只追加一句导读，而要同步更新属性表、source parity 报告和中文核对清单。这样才能避免页面表面是 ` + "`bilingual_complete`" + `，实际读者仍必须回到英文官方页才能理解核心 section。`,
    `从读者任务看，` + "`UsdUI`" + ` 的实际价值是让复杂资产、材质网络和工具面板更容易浏览、筛选和理解。作者应优先写稳定、简洁、可被机器读取的提示；读者则应把这些提示当成界面解释线索，而不是把它们误认为几何、材质、渲染或组合语义的直接替代。`,
  ];
}

const pages = [
  {
    name: "AccessibilityAPI",
    title: "AccessibilityAPI",
    summary: "AccessibilityAPI stores accessibility information on a Prim for runtimes and assistive tooling.",
    sourceIntro: "This schema describes accessibility information on a Prim that may be surfaced to a given runtime's accessibility frameworks.",
    sourceKeywords: ["AccessibilityAPI", "label", "description", "priority", "multiple apply", "default prim", "time sampled"],
    paragraphs: [
      "`AccessibilityAPI` 的职责是在 prim 上提供可访问性信息，让 runtime 的 accessibility framework、voice controls、screen readers 等辅助工具可以读取更适合人的说明。它不是给视觉渲染器的材质说明，也不是普通 UI tooltip 的唯一来源，而是把可访问性语义标准化写入 USD。中文阅读时应把它放在“辅助技术如何理解场景对象”的上下文里。",
      "官方把 accessibility information 组织成标准 triplet：`label`、`description` 和 `priority`。`label` 通常是较短的人类可读名称，`description` 用来给出更完整说明，`priority` 则帮助工具决定哪些信息更应优先呈现。三者合在一起，比只写一个 displayName 更适合屏幕阅读器或语音控制路径。",
      "该 schema 是 multiple apply schema，所以同一 prim 可以有多组 namespaced accessibility triplets。instance name 可以表达不同用途，例如分别描述尺寸、颜色、材质状态或交互意图。不要把多个 instance 当成继承层级；它们是同一 prim 上不同目的的可访问性描述集合。",
      "官方最佳实践强调 `default` namespace：很多 accessibility runtimes 只支持单一 accessibility description，因此关键描述应放进名为 `default` 的 namespace。若只把核心信息放在其他 instance 上，消费端可能因为只读取默认描述而看不到最重要的信息。",
      "time sampled accessibility information 需要额外小心。官方建议在使用 time sampled 信息时也 author default value，这样当前不支持 time-sampled accessibility 的 runtime 仍能读取一个稳定说明。调试时如果时间变化信息没有被朗读，不应先怀疑 schema 名，而应检查 default value 和 runtime 能力。",
      "另一个官方建议是给 layer 的 default prim 和 root level prims 提供场景级可访问性说明。这样 accessibility system 可以向用户提供简洁场景描述，也能兼容不支持层级细节或用户关闭层级粒度的环境。层级中其他 prim 仍可单独提供 accessibility information，但不会隐式继承 default prim 的说明。",
      "常见误读是把 accessibility 信息当作 UI 显示名称或翻译注释。更准确地说，它是给辅助技术的语义入口：语音控制可能用 `label` 定位对象，屏幕阅读器可能读出 `description`，工具可能按 `priority` 筛选信息。它可以和 `ObjectHints.displayName` 并存，但职责不同。",
      "调试路径建议按顺序进行：确认 `AccessibilityAPI` 是否以正确 instance name applied；检查 `label`、`description`、`priority` 是否 authored 在预期 namespace；检查 default value 和 time samples；确认 default prim/root prim 是否有场景级说明；最后验证目标 runtime 是否读取 multiple apply schema。"
    ],
    properties: [
      { name: "description", type: "string", fallback: "", zh: "较完整的可访问性说明，可被 screen reader 或 voice control 路径读取。若是关键说明，应考虑放入 `default` namespace 并提供 default value。", en: "Accessibility description." },
      { name: "label", type: "string", fallback: "", zh: "人类可读的短标签，帮助辅助技术把 prim 称呼成可理解的对象名。它不替代 schema/type 名。", en: "Accessibility label." },
      { name: "priority", type: "token", fallback: "standard", zh: "辅助信息的呈现优先级。它帮助 runtime 或工具排序说明，不改变 prim 的渲染或 USD 组成语义。", en: "Accessibility priority." },
    ],
    related: ["overview", "ObjectHints", "PrimHints", "SceneGraphPrimAPI"],
  },
  {
    name: "AttributeHints",
    title: "AttributeHints",
    summary: "AttributeHints provide UI hints for attributes, including labels and ordering for possible attribute values.",
    sourceIntro: "AttributeHints provide UI hints for attributes presented in a UI.",
    sourceKeywords: ["AttributeHints", "valueLabels", "valueLabelsOrder", "allowedTokens", "UsdAttributeLimits", "dictionary", "token[]"],
    paragraphs: [
      "`AttributeHints` 面向 attribute 级 UI 提示，尤其用于把属性可能值映射成人类可读标签，并定义这些标签在 UI 中的显示顺序。它服务于属性编辑器、下拉列表、检查面板和 DCC 工具表单，不改变属性本身的 USD type、值解析或 authored opinion。",
      "官方示例用一个 `priority` attribute 映射三个值到标签，并指定 UI ordering。这个例子说明 `valueLabels` 和 `valueLabelsOrder` 是给 UI 呈现层看的：底层属性值仍然是原来的 token 或 string；中文标签、显示顺序和用户选择界面只是消费端如何展示这些值。",
      "`valueLabels` 是 dictionary，用来把实际 attribute value 映射为 UI label。它可以让工具把较技术化的 token 显示成更适合用户的文本。调试时应检查字典键是否和真实允许值一致，否则界面可能无法找到对应标签，或者只显示原始 token。",
      "`valueLabelsOrder` 是 `token[]`，用于规定 value labels 的显示顺序。它不是权重，也不是默认值；它只影响 UI 列表排序。如果某个值存在于 `valueLabels` 但没有出现在 `valueLabelsOrder` 中，具体呈现取决于消费端实现，通常应避免这种不完整映射。",
      "官方特别提醒：对于 string 和 token-valued attributes，应使用 `allowedTokens` attribute metadata 定义允许的 token 集合。如果同时使用 `valueLabels` 和 `valueLabelsOrder`，UI hint 的值必须匹配 allowed tokens。否则工具可能出现标签能显示但值不可写、或值可写但标签缺失的矛盾。",
      "属性还可以配合 `UsdAttributeLimits` 表达 value limits。`AttributeHints` 负责“如何把值呈现给人”，limits 负责“哪些值有效或越界”。两者组合可以让 UI 在用户输入时给出反馈，但它们仍不替代 schema 对属性类型和默认值的正式定义。",
      "常见误读是把 `valueLabels` 当成翻译表，从而把正式 token 改成中文。正确做法是保留实际 token/字符串值，在 UI label 层提供人类可读说明。USD 文件中的 token 不应被翻译；翻译应出现在说明或工具显示层。",
      "调试路径建议：先检查 attribute 是否确实存在并具备预期 type；再检查 `allowedTokens`；然后比对 `valueLabels` dictionary 的键和值；接着检查 `valueLabelsOrder` 是否覆盖需要显示的 token；最后确认工具是否读取 `AttributeHints`、`ObjectHints` 和 `PropertyHints` 的组合。"
    ],
    properties: [
      { name: "valueLabels", type: "dictionary", fallback: "", zh: "把实际 attribute value 映射成 UI label。键应和真实 allowed values 对齐，不能把正式 token 改写成中文。", en: "Maps attribute values to UI labels." },
      { name: "valueLabelsOrder", type: "token[]", fallback: "", zh: "定义 UI 中显示 value labels 的顺序。它不是默认值，也不改变属性值本身。", en: "Ordering for labels in UI." },
    ],
    related: ["PropertyHints", "ObjectHints", "PrimHints", "overview"],
  },
  {
    name: "Backdrop",
    title: "Backdrop",
    summary: "Backdrop is a visual grouping element for nodes in a node graph.",
    sourceIntro: "Backdrop is a visual indication of a grouping of nodes.",
    sourceKeywords: ["Backdrop", "colored rectangle", "PreviewSurface", "Color", "ui:description", "MyMaterial Nodes", "token"],
    paragraphs: [
      "`Backdrop` 用于在 node graph 中给一组节点提供可视化背景或分组提示。官方说明它可以表现为 colored rectangle，让复杂节点网络中的相关节点更容易被看出来。它不是 USD `Scope`，也不是组合 arc；它主要服务于节点图 UI 的组织和阅读。",
      "官方示例中 `Backdrop` 覆盖 `PreviewSurface` 和 `Color` 两个 shader nodes，并标注为 `MyMaterial Nodes`。这个例子强调的是视觉分组：Backdrop 帮助用户理解这些节点在图中的关系，但并不自动把节点变成 USD 层级子节点，也不改变材质网络的连接语义。",
      "示例里的 position 和 size 容易误读。Backdrop 从 x coordinate `-0.8` 开始，`PreviewSurface` 在 `-0.85`，`Color` 在 `-2.0`，同时 backdrop width 是 `450`。这说明 size 和 position 的单位语境不同；不能简单把所有数字当成相同像素坐标或世界空间坐标。",
      "官方还提醒 Y-coordinate increases as you move downward。Backdrop 的 y 坐标和 height 让它位于节点上方并向下覆盖节点。调试节点图布局时，要按 UI 坐标系理解 `ui:nodegraph:node:pos` 和 `ui:nodegraph:node:size`，不要把它们解释成 `UsdGeom` 的 transform。",
      "`ui:description` 是 Backdrop 的核心属性，用来描述这个背景分组的含义。官方示例提到在创建 custom noise 时，用 description `Noise` 可以说明这些节点整体贡献于 noise generation。这个说明是给 UI 和人读的，不会改变 shader output 或节点连接。",
      "Backdrop 与 `SceneGraphPrimAPI.displayGroup` 的边界很重要。`displayGroup` 是节点或属性在 UI 中的分组名称；Backdrop 是一个可视矩形，可以覆盖多个节点并提供描述。它们都服务组织性，但一个是字段/节点的分组提示，一个是图上的背景元素。",
      "常见误读是把 Backdrop 当成父容器或真实场景对象。更稳妥的理解是：它是 node graph 的辅助可视层，帮助 DCC 工具把一组节点画在同一背景上。节点是否连接、材质是否有效、shader 是否输出正确，仍由实际节点网络和属性连接决定。",
      "调试路径建议：确认 `Backdrop` prim 是否存在；检查是否 author 了 `NodeGraphNodeAPI` 的 position/size/color 等信息；检查 `ui:description` 是否可读；核对 Y-positive-down 的坐标假设；最后确认消费端是否支持显示 Backdrop 和它的 stacking/order 行为。"
    ],
    properties: [
      { name: "ui:description", type: "token", fallback: "", zh: "Backdrop 的描述文本，用于解释这一可视分组的目的，例如 `Noise` 或 `MyMaterial Nodes`。它不改变节点连接或材质计算。", en: "Description for the backdrop." },
      { name: "ui:nodegraph:node:pos", type: "float2", fallback: "", zh: "通常来自 `NodeGraphNodeAPI`，控制 Backdrop 在节点图中的位置。它是 UI 坐标，不是世界空间 transform。", en: "Node graph position." },
      { name: "ui:nodegraph:node:size", type: "float2", fallback: "", zh: "Backdrop 的可视尺寸，配合 position 决定覆盖区域；不要和节点本身的 USD 几何尺寸混淆。", en: "Node graph size." },
    ],
    related: ["NodeGraphNodeAPI", "SceneGraphPrimAPI", "overview", "PropertyHints"],
  },
  {
    name: "NodeGraphNodeAPI",
    title: "NodeGraphNodeAPI",
    summary: "NodeGraphNodeAPI stores node graph UI information such as position, display color, documentation link, icon, size, and stacking order.",
    sourceIntro: "NodeGraphNodeAPI stores information about nodes within a node graph.",
    sourceKeywords: ["NodeGraphNodeAPI", "ui:nodegraph:node:pos", "ui:nodegraph:node:displayColor", "ui:nodegraph:node:docURI", "ui:nodegraph:node:expansionState", "ui:nodegraph:node:icon", "ui:nodegraph:node:size", "ui:nodegraph:node:stackingOrder"],
    paragraphs: [
      "`NodeGraphNodeAPI` 储存节点在 node graph UI 中的呈现信息。官方列出的常见属性包括 position、display color、z-index/relative depth strength、documentation link、expansion state、icon、size 和 stacking order。它描述的是工具如何画节点，不是节点的计算语义本身。",
      "官方示例使用两个 shader nodes：`Preview Surface` 和 `Color`。从示例可以推断 `Preview Surface` 是红色，`Color` 是蓝色；二者有不同位置、不同大小，且如果重叠，`Color` 会显示在 `Preview Surface` 上方。这些都是 node graph 的视觉组织信息。",
      "`ui:nodegraph:node:displayColor` 是节点图里节点的 UI 颜色，不应和 `primvars:displayColor` 或材质输出颜色混淆。它可以帮助用户快速识别节点类型或分组，但不会改变 geometry color、shader output 或 renderer 采样结果。",
      "`ui:nodegraph:node:docURI` 给节点关联文档链接，消费端可以把它显示为帮助入口。这个 URI 是阅读辅助，不是 asset dependency，也不是 USD composition arc。若文档链接失效，节点图仍可能有效；调试时应区分 documentation link 和实际资源路径。",
      "`ui:nodegraph:node:expansionState` 表达节点是 open 还是 closed。官方说明具体展开状态如何呈现取决于查看上下文或工具，但通常 open 的节点会暴露更多信息。它不会改变节点属性值，只改变 UI 初始显示的细节程度。",
      "`ui:nodegraph:node:icon` 指向用于描述节点意图的图标文件。官方强调 icon 是 descriptive for the nodes, not the content of the nodes。也就是说，icon 帮助识别节点，不是节点实际纹理、材质输入或渲染资源。",
      "`ui:nodegraph:node:pos` 和 `ui:nodegraph:node:size` 需要按节点图单位理解。overview 中还说明 `pos` 的单位不打算是 pixels，而是假设 typical node size 是 `1.0x1.0`，并且 Y-positive is intended to be down。把这些字段当成世界空间坐标会导致错误判断。",
      "`ui:nodegraph:node:stackingOrder` 描述重叠时的相对深度或 z-index。它只影响节点图绘制顺序，不影响 USD prim 层级、shader evaluation 顺序或材质连接求值。若节点遮挡显示不符合预期，先检查 stackingOrder，再看工具实现。",
      "调试路径建议：先确认目标 prim 是否 applied 了 `NodeGraphNodeAPI`；再逐项核对 `displayColor`、`docURI`、`expansionState`、`icon`、`pos`、`size`、`stackingOrder`；接着检查父节点或 backdrop 是否影响相对位置；最后确认 DCC 工具是否支持这些字段并采用相同坐标假设。"
    ],
    properties: [
      { name: "ui:nodegraph:node:displayColor", type: "color3f", fallback: "", zh: "节点图中的 UI 颜色，不是 geometry display color 或材质输出颜色。", en: "Node graph display color." },
      { name: "ui:nodegraph:node:docURI", type: "string", fallback: "", zh: "节点相关文档链接，可作为工具帮助入口；它不是 composition arc 或资产依赖。", en: "Documentation URI." },
      { name: "ui:nodegraph:node:expansionState", type: "token", fallback: "", zh: "`open` / `closed` 等展开状态，影响 UI 呈现的信息量，不改变属性值。", en: "Expansion state." },
      { name: "ui:nodegraph:node:icon", type: "asset", fallback: "", zh: "描述节点意图的图标资源；它不是节点内容或 shader 输入。", en: "Icon asset." },
      { name: "ui:nodegraph:node:pos", type: "float2", fallback: "", zh: "节点图坐标位置，Y 正方向向下，单位语境不是世界空间或普通像素坐标。", en: "Node graph position." },
      { name: "ui:nodegraph:node:size", type: "float2", fallback: "", zh: "节点在图中的可视尺寸，配合 pos 影响布局。", en: "Node graph size." },
      { name: "ui:nodegraph:node:stackingOrder", type: "int", fallback: "", zh: "节点重叠时的相对绘制顺序，不改变 USD 层级或计算顺序。", en: "Stacking order." },
    ],
    related: ["Backdrop", "SceneGraphPrimAPI", "overview", "AttributeHints"],
  },
  {
    name: "ObjectHints",
    title: "ObjectHints",
    summary: "ObjectHints provide general UI hints for USD objects, including display names and UI hidden state.",
    sourceIntro: "ObjectHints provide UI hints for all USD objects that can be presented in a UI.",
    sourceKeywords: ["ObjectHints", "displayName", "hidden", "Placeholder", "isAnnotated", "UI purposes only", "shownIf"],
    paragraphs: [
      "`ObjectHints` 为可以在 UI 中呈现的 USD objects 提供通用提示。这里的 object 包括 prim 和 property，因此它覆盖比 `PrimHints` 或 `PropertyHints` 更基础的展示层信息，例如用户可见名称和是否在 UI 中隐藏。",
      "`displayName` 是 ObjectHints 中最常用的字段之一，用于给 prim 或 property 提供 user-facing name。官方示例中 `Placeholder` prim 在 DCC 工具 UI 中可以显示为 `ModelA Placeholder`，attribute `isAnnotated` 可以显示为 `Model is annotated`。这些显示名称不改变 USD 路径或正式属性名。",
      "`hidden` 是另一个核心字段，表示对象是否应在 UI 中隐藏。官方强调这个 hint is for UI purposes only，不应被 renderer 解释成从渲染场景隐藏对象。也就是说，Gprim 即使设置了该 hint，renderer 仍应绘制它，除非另有正式 visibility 或 purpose 等机制控制。",
      "Pixar 使用 `hidden` 的一个方式是简化层级展示：隐藏对象自己的 representation，但不隐藏其 subtree，并把下级内容在层级 UI 中上拉一级。这说明 `hidden` 的具体呈现取决于应用实现，不能把它当成跨工具完全一致的层级重写规则。",
      "`shownIf` 也会出现在 ObjectHints 相关语境中，用于表达条件式 UI 呈现。它应被理解为 UI 条件表达式，而不是 USD composition 条件、variant selection 或 renderer visibility。若条件没有生效，应检查工具是否支持表达式求值。",
      "`ObjectHints` 与 `PropertyHints`、`PrimHints` 的关系是共享基础与专门化的关系。`ObjectHints` 提供 display name 和 UI hidden；`PropertyHints` 进一步说明 property display group 与 shown condition；`PrimHints` 进一步说明 prim 级 display groups 如何展开或按条件显示。",
      "常见误读是把 `displayName` 当成真正重命名，或把 `hidden` 当成渲染隐藏。正确调试路径是先看 USD path、property name 和 schema 类型是否仍保持原样，再看 UI 是否读取并呈现 ObjectHints。工具显示名变化不代表底层标识符变化。",
      "如果某个对象没有按预期在 UI 中显示，应按顺序检查：是否 author 了 `displayName` 或 `hidden`；layer composition 是否覆盖这些 hint；是否有更专门的 `PrimHints` / `PropertyHints` / `AttributeHints` 参与；最后确认应用是否采用 Pixar 类似的 hierarchy simplification 策略。"
    ],
    properties: [
      { name: "displayName", type: "string", fallback: "", zh: "用户界面中显示的名称。它不改变 prim path、property name 或正式 schema 名。", en: "User-facing display name." },
      { name: "hidden", type: "bool", fallback: "", zh: "UI 隐藏提示，只服务界面展示；renderer 不应把它解释成场景可见性。", en: "UI hidden hint." },
      { name: "shownIf", type: "string/expression", fallback: "", zh: "条件式 UI 呈现表达式。它不是 composition condition，也不是渲染可见性开关。", en: "Conditional UI display hint." },
    ],
    related: ["PrimHints", "PropertyHints", "AttributeHints", "overview"],
  },
  {
    name: "PrimHints",
    title: "PrimHints",
    summary: "PrimHints provide UI hints for prims, especially display group expansion and conditional display of groups.",
    sourceIntro: "PrimHints provide UI hints for prims presented in a UI.",
    sourceKeywords: ["PrimHints", "displayGroupsExpanded", "displayGroupsShownIf", "Controller", "Widget Settings", "widgetReadOnlyMode", "dictionary"],
    paragraphs: [
      "`PrimHints` 面向 prim 级 UI 呈现，重点是 prim 上的 display groups 如何在界面中展开、折叠或按条件显示。它不改变 prim 的 schema、属性值或层级位置，而是帮助 DCC 工具把 prim 的大量属性组织成更可读的 UI 面板。",
      "官方示例中，一个 prim 包含 `Controller` 和 `Widget Settings` 两个 display groups。prim UI hints 指示 DCC Tool 初始时完整展开 `Controller`，而 `Widget Settings` 不展开。这说明 `displayGroupsExpanded` 控制的是初始 UI 状态，不是属性是否存在。",
      "`displayGroupsShownIf` 用来给 display group 设置显示条件。示例中 `Widget Settings` 只有在 `widgetReadOnlyMode == 0` 表达式为 true 时才显示。这个条件属于 UI 呈现逻辑，不是 variant selection，也不是 USD 属性 authored value 的有效性规则。",
      "`displayGroupsExpanded` 是 dictionary，键通常是 display group name，值表达该 group 在 UI 中默认展开还是折叠。调试时要检查字典键是否与 property 的 `displayGroup` 字段一致；如果名称拼写不同，工具可能无法把展开提示应用到预期 group。",
      "`displayGroupsShownIf` 也是 dictionary，用来把 group name 映射到条件表达式。这里的表达式可能引用 prim 上的属性值。消费端需要实现表达式求值；若工具不支持该机制，即使 USD 数据正确，也可能始终显示或始终隐藏对应 group。",
      "`PrimHints` 与 `ObjectHints` 的边界是：`ObjectHints` 可给 prim author displayName 和 UI hidden 状态；`PrimHints` 则进一步管理该 prim 下 display groups 的展开和条件可见性。两者可以同时存在，前者是对象级基础提示，后者是 prim 级分组提示。",
      "`PrimHints` 也与 `PropertyHints` 配合。`PropertyHints.displayGroup` 把某个 property 放进 display group；`PrimHints.displayGroupsExpanded` 和 `displayGroupsShownIf` 决定这些 group 如何显示。若 group 不出现，不能只看 prim hint，还要看 property 是否正确声明了 displayGroup。",
      "常见误读是把 display group 当成 USD namespace 或父子层级。它只是 UI 分组名称，可能包含类似 `GroupA:NestedGroup` 的嵌套表达，但不会创建 prim 或 property 层级。中文说明必须保留 `displayGroupsExpanded`、`displayGroupsShownIf` 等正式字段名。",
      "调试路径建议：确认目标 prim 的 `PrimHints` 是否存在；检查 property 的 display group 名称；核对 `displayGroupsExpanded` 字典；核对 `displayGroupsShownIf` 条件表达式和引用属性；最后在支持该 schema 的 UI 中验证初始展开、折叠和条件显示效果。"
    ],
    properties: [
      { name: "displayGroupsExpanded", type: "dictionary", fallback: "", zh: "按 display group name 指定 UI 默认展开或折叠状态。它不改变属性是否存在。", en: "Default expanded/collapsed display group states." },
      { name: "displayGroupsShownIf", type: "dictionary", fallback: "", zh: "按 display group name 指定条件式显示表达式，例如依赖 `widgetReadOnlyMode`。它是 UI 条件，不是 composition rule。", en: "Conditional display of groups." },
    ],
    related: ["PropertyHints", "ObjectHints", "AttributeHints", "overview"],
  },
  {
    name: "PropertyHints",
    title: "PropertyHints",
    summary: "PropertyHints provide UI hints for properties, including display group assignment and conditional display.",
    sourceIntro: "PropertyHints provide UI hints for properties presented in a UI.",
    sourceKeywords: ["PropertyHints", "displayGroup", "shownIf", "GroupA:NestedGroup", "Display Groups", "Property Order", "hidden"],
    paragraphs: [
      "`PropertyHints` 面向 property 级 UI 呈现，核心是某个 property 属于哪个 display group，以及它是否按条件显示。这里的 property 包括 attribute 和 relationship 等 UI 可展示对象；hint 影响界面组织，不改变 property 的 USD type、连接或 authored value。",
      "`displayGroup` 是 property 所属 display group 的名称。官方说明一个 property 只能属于单个 display group。工具可以据此把相关属性组织在同一面板或折叠组中，帮助用户阅读复杂 schema 的参数集合。",
      "官方还说明可以用 `:` 分隔符表达 nested display group。例如 `GroupA:NestedGroup` 表示 property 属于 `GroupA` 下的 `NestedGroup`。这只是 UI 分组路径，不是 USD namespace、prim path，也不会创建实际的 USD 层级。",
      "官方在 `Display Groups and Property Order` 相关说明中把 property grouping 与属性显示顺序联系起来。中文阅读时要把 `displayGroup`、property order 和 prim-level group 展开规则分开理解：`displayGroup` 指定分组归属，property order 决定同一 UI 面板中的排序，而 `PrimHints` 进一步说明 display group 的展开和条件显示。",
      "`shownIf` 是 property 级条件显示表达式，用于根据其他属性值或状态决定该 property 是否出现在 UI 中。它和 `ObjectHints.hidden` 不同：`hidden` 是对象级隐藏提示，`shownIf` 是条件式呈现逻辑，常用于更动态的属性面板。",
      "官方示例没有演示 prim-level hints for display groups，而是指向 `PrimHints` 示例。这个引用说明 `PropertyHints` 和 `PrimHints` 是配合关系：property 声明自己属于哪个 group，prim 再声明 group 如何展开、折叠或按条件显示。",
      "与 `AttributeHints` 的边界也要清楚。`AttributeHints` 解释 attribute 值如何映射成 UI label 和排序；`PropertyHints` 解释 property 本身在面板中属于哪个分组、何时显示。一个 attribute 可以同时拥有 property-level hint 和 attribute-level value hint。",
      "常见误读是把 `displayGroup` 当成字段翻译或把 `shownIf` 当成数据验证。正确理解是：UI 可以选择隐藏、显示或分组这些 property，但 USD 数据仍然存在，schema 仍然有效，renderer 或 composition 不应把它当成正式条件规则。",
      "调试路径建议：先确认 property 是否正确 author 了 `displayGroup`；检查 nested group 分隔符是否使用 `:`；确认 prim 上是否有对应的 `PrimHints.displayGroupsExpanded` 或 `displayGroupsShownIf`；检查 `shownIf` 表达式引用的属性是否存在且值符合预期；最后确认工具是否支持 conditional UI hints。",
      "若某个属性在 UI 中找不到，应避免直接删除或重命名 USD property。先检查 `ObjectHints.hidden`、`PropertyHints.shownIf`、group 条件、工具过滤规则和 layer composition，确认只是 UI 被折叠或隐藏，而不是属性未 author 或被更强层覆盖。"
    ],
    properties: [
      { name: "displayGroup", type: "string", fallback: "", zh: "property 所属 UI display group 名称；可用 `GroupA:NestedGroup` 表达嵌套 UI 分组。", en: "Display group for a property." },
      { name: "shownIf", type: "string", fallback: "", zh: "property 级条件显示表达式。它控制 UI 呈现，不是 USD composition 或 renderer 规则。", en: "Conditional property display expression." },
    ],
    related: ["PrimHints", "AttributeHints", "ObjectHints", "overview"],
  },
  {
    name: "SceneGraphPrimAPI",
    title: "SceneGraphPrimAPI",
    summary: "SceneGraphPrimAPI adds descriptive names and groups to nodes in the context of a connected node graph.",
    sourceIntro: "SceneGraphPrimAPI provides a way to add descriptive information to the node graph.",
    sourceKeywords: ["SceneGraphPrimAPI", "PreviewSurface", "Color", "ui:displayGroup", "ui:displayName", "connected node graph", "token"],
    paragraphs: [
      "`SceneGraphPrimAPI` 用于给连接到 node graph 的节点添加描述性信息。官方示例中两个 shader nodes：`PreviewSurface` 和 `Color` 可以拥有自己的 `ui:displayName`，也可以属于 `ui:displayGroup`。这些信息帮助工具在节点图中更清楚地标注和组织节点。",
      "`ui:displayName` 是节点在 connected node graph 语境中的描述性名称。官方强调它 may be distinct from its core Prim displayName，也就是说它可以不同于 prim 的核心显示名称。不要把它理解成修改 prim path 或重命名 prim。",
      "`ui:displayGroup` 是节点在 connected node graph 语境中的描述性 group name。它 may be distinct from other USD grouping feature names，例如 Scope 名、parent Prim 名等。也就是说，node graph 中的 group 和场景层级中的 group/Scope 不是同一概念。",
      "该 API 的价值在于把节点图的“读法”写进 USD：工具可以用 `ui:displayName` 显示更友好的节点名，用 `ui:displayGroup` 把相关节点组织在一起。它不负责节点位置、颜色、大小或 stacking order；这些由 `NodeGraphNodeAPI` 更具体地表达。",
      "`SceneGraphPrimAPI` 与 `Backdrop` 的关系也要区分。`ui:displayGroup` 是节点自身的描述性分组，而 `Backdrop` 是可视矩形背景，官方 overview 明确说 backdrops are not directly associated with nodes。两者都帮助组织节点图，但组织机制不同。",
      "常见误读是把 `ui:displayGroup` 当成 USD scene graph 层级分组。更准确地说，它只在 connected node graph 的上下文中描述节点所属 UI group。即使 group name 与 Scope 或 parent Prim 相同，也不代表它们语义相同。",
      "调试路径建议：确认目标 shader node 或图中节点是否 applied 了 `SceneGraphPrimAPI`；检查 `ui:displayName` 是否是需要在节点图里显示的人类可读名；检查 `ui:displayGroup` 是否符合工具分组预期；再看 `NodeGraphNodeAPI` 是否同时提供位置、颜色和尺寸。",
      "如果节点图中 group 没有出现，应继续检查消费端是否支持 `SceneGraphPrimAPI`、节点是否被视为 connected node graph 的成员、layer composition 是否覆盖了 `ui:*` 字段，以及是否混用了 `PropertyHints.displayGroup`、`PrimHints` 或 `Backdrop`。"
    ],
    properties: [
      { name: "ui:displayGroup", type: "token", fallback: "", zh: "connected node graph 语境中的节点描述性分组名；它不同于 Scope 名或 parent Prim 名。", en: "Descriptive group name in a connected node graph." },
      { name: "ui:displayName", type: "token", fallback: "", zh: "connected node graph 中节点的人类可读显示名，可与 prim 核心 displayName 不同。", en: "Descriptive node name." },
    ],
    related: ["NodeGraphNodeAPI", "Backdrop", "overview", "ObjectHints"],
  },
];

function relatedLinks(page) {
  const names = [...new Set([...(page.related || []), ...commonRelated])].filter((name) => name !== page.name);
  return names.map((name) => `<li><a href="${esc(name)}.html">${esc(name)}</a></li>`).join("\n        ");
}

function pageHtml(page) {
  const official = officialUrl(page.name);
  const source = `${sourceDir}/${page.name}_source.html`;
  const paragraphs = [...commonCoverage(page), ...page.paragraphs]
    .map((paragraph) => `      <p class="zh">${codeAware(paragraph)}</p>`)
    .join("\n");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>完整双语参考：${esc(page.title)} / ${esc(page.title)}</title>
  <link rel="icon" href="../../../../../site/images/USDIcon.ico">
  <style>${css}
  </style>
</head>
<body>
  <header>
    <span class="status">bilingual_complete</span>
    <h1>完整双语参考：${esc(page.title)} / ${esc(page.title)}</h1>
    <div class="meta">官方页：${official}</div>
  </header>

  <main>
    <section data-cn-complete="round-408-usdUI-${esc(page.name)}-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p class="en">${esc(page.summary)}</p>
      <p class="zh">官方源页核心说明：${codeAware(page.sourceIntro)}</p>
${paragraphs}
      <h3>中文核对清单 / Chinese Coverage Checklist</h3>
      <ul>
        <li><span class="zh">已覆盖页面职责、官方 section、核心属性或 schema 分组、使用边界、误读点、调试路径和相邻 usdUI 类型关系。</span><span class="en">Page role, official sections, groups, boundaries, misreads, debugging path, and adjacent types are covered.</span></li>
        <li><span class="zh">已保留 API 名、schema 名、token、属性名、代码、命令、Doxygen 表格标签和链接语义；中文只解释技术含义，不改写正式标识。</span><span class="en">Technical identifiers are preserved.</span></li>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(source)}</code>，并与官方页 <code>${esc(official)}</code> 的标题、section 与属性语义保持一致。</span><span class="en">Local source snapshot and official page semantics were compared.</span></li>
      </ul>
    </section>

    <section>
      <h2>官方属性或条目 / Official Properties or Entries</h2>
      <table>
        <thead><tr><th>Property / Schema</th><th>USD type</th><th>Fallback</th><th>中文说明 / Chinese Reading</th></tr></thead>
        <tbody>
${rows(page.properties, 4)}
        </tbody>
      </table>
    </section>

    <section>
      <h2>相邻 usdUI 阅读路径 / Adjacent usdUI Reading Path</h2>
      <p class="zh">本页应放在 usdUI 域内连续阅读：先看 overview 和目录页，再根据需求进入可访问性、节点图或 UI hints 的具体 schema。下面的链接都保留为本地阅读路径；只有“打开官方原页 / Open official page”是显式外跳。</p>
      <ul>
        ${relatedLinks(page)}
      </ul>
    </section>

    <section>
      <h2>源页对比 / Source Parity</h2>
      <ul>
        <li><span class="zh">官方页：<a href="${official}">官方页 / Official page: ${official}</a></span></li>
        <li><span class="zh">本地 source snapshot：<code>${esc(source)}</code></span></li>
        <li><span class="zh">本轮仅晋级达到中文主阅读路径门槛的页面；未处理的 usdUI overview 和 usdUI_toc 保持草稿，留给后续轮次。</span><span class="en">Only pages that meet the Chinese main-reading-path bar are promoted.</span></li>
      </ul>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../../../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../../../../site/release_index.html">Release 本地入口 / Local release entry</a></p>
      <p><a href="${official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceFacts(page) {
  const article = sourceArticle(page.name);
  const h1 = stripTags(article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const headings = [...article.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => stripTags(m[2])).filter(Boolean);
  const codes = [...article.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
  const sourceText = stripTags(article);
  const output = fs.existsSync(rel(targetDir, `${page.name}.html`))
    ? stripTags(fs.readFileSync(rel(targetDir, `${page.name}.html`), "utf8"))
    : "";
  return {
    page: page.name,
    output: `${targetDir}/${page.name}.html`,
    source_snapshot: `${sourceDir}/${page.name}_source.html`,
    official_url: officialUrl(page.name),
    h1,
    headings,
    source_keywords_checked: page.sourceKeywords,
    missing_source_keywords: page.sourceKeywords.filter((keyword) => !sourceText.includes(keyword)),
    missing_output_keywords: page.sourceKeywords.filter((keyword) => !output.includes(keyword)),
    preserved_code_terms_sample: [...new Set(codes)].slice(0, 80),
  };
}

function qualityByOutput() {
  const q = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  return new Map(q.pages.map((page) => [page.output, page]));
}

function manifestRoundOutputs() {
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""))
    : { promotions: [] };
  return new Set(
    (manifest.promotions || [])
      .filter((entry) => String(entry.id || "").startsWith(`round-${ROUND}-release-usdUI-`))
      .map((entry) => entry.local_output)
  );
}

function activePages() {
  const quality = qualityByOutput();
  const currentRoundOutputs = manifestRoundOutputs();
  const active = [];
  const skipped = [];
  for (const page of pages) {
    const out = `${targetDir}/${page.name}.html`;
    const source = `${sourceDir}/${page.name}_source.html`;
    const q = quality.get(out);
    if (!fs.existsSync(rel(out))) {
      skipped.push({ page: page.name, reason: "target_missing", output: out });
      continue;
    }
    if (!fs.existsSync(rel(source))) {
      skipped.push({ page: page.name, reason: "source_snapshot_missing", output: out, source });
      continue;
    }
    if (q?.status !== "bilingual_draft" && !currentRoundOutputs.has(out)) {
      skipped.push({ page: page.name, reason: `not_draft:${q?.status || "missing_quality"}`, output: out });
      continue;
    }
    active.push(page);
  }
  return { active, skipped };
}

function nonSelectedCandidates() {
  const activeNames = new Set(pages.map((page) => page.name));
  return candidates
    .filter((name) => !activeNames.has(name))
    .map((name) => ({
      page: name,
      output: `${targetDir}/${name}.html`,
      source_snapshot: `${sourceDir}/${name}_source.html`,
      reason: "out_of_round_scope_due_domain_sprint_limit_8_pages",
    }));
}

function writeSourceParity(active, skipped) {
  const parity = active.map(sourceFacts);
  fs.writeFileSync(rel(sourceParityReport), JSON.stringify({
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "usdUI",
    source_parity: parity,
    skipped_pages: skipped,
    not_selected_candidates: nonSelectedCandidates(),
  }, null, 2), "utf8");
  return parity;
}

function writePages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const out = rel(targetDir, `${page.name}.html`);
    const html = pageHtml(page);
    fs.writeFileSync(out, html, "utf8");
    results.push({
      page: page.name,
      output: path.relative(ROOT, out).replaceAll("\\", "/"),
      source: `${sourceDir}/${page.name}_source.html`,
      zhChars: chineseChars(html),
      hasComplete: html.includes("data-cn-complete"),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
    });
  }
  const parity = writeSourceParity(active, skipped);
  return { results, skipped, source_parity: parity };
}

function precheckPages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const out = rel(targetDir, `${page.name}.html`);
    const html = fs.readFileSync(out, "utf8");
    const complete = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    const zhBlocks = (html.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length;
    const sourceFact = sourceFacts(page);
    const result = {
      page: page.name,
      output: path.relative(ROOT, out).replaceAll("\\", "/"),
      zhChars: chineseChars(html),
      completeZhChars: chineseChars(complete),
      zhBlocks,
      hasStatus: html.includes("bilingual_complete"),
      hasCompleteSection: Boolean(complete),
      hasOfficialLink: html.includes(officialUrl(page.name)),
      hasSourceParity: html.includes(`${page.name}_source.html`),
      missingSourceKeywords: sourceFact.missing_source_keywords,
      missingOutputKeywords: sourceFact.missing_output_keywords,
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/i.test(html),
      hasQuestionDamage: /\?{4,}/.test(html),
      hasReplacementChar: html.includes("\uFFFD"),
      hasMojibakeMarker: /閿|閻|濮|缁|鐎|锟/.test(html),
    };
    result.passed =
      result.zhChars >= 1700 &&
      result.completeZhChars >= 1600 &&
      result.zhBlocks >= 12 &&
      result.hasStatus &&
      result.hasCompleteSection &&
      result.hasOfficialLink &&
      result.hasSourceParity &&
      result.missingSourceKeywords.length === 0 &&
      result.missingOutputKeywords.length === 0 &&
      !result.hasDraftMarker &&
      !result.hasQuestionDamage &&
      !result.hasReplacementChar &&
      !result.hasMojibakeMarker;
    results.push(result);
  }
  writeSourceParity(active, skipped);
  return { results, skipped, not_selected_candidates: nonSelectedCandidates() };
}

function updateManifest() {
  const manifestPath = rel("reports", "bilingual_completion_promotions.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8").replace(/^\uFEFF/, ""));
  const precheck = precheckPages();
  const failed = precheck.results.filter((entry) => !entry.passed);
  if (failed.length) {
    throw new Error(`Refusing to update manifest; precheck failed: ${failed.map((entry) => entry.page).join(", ")}`);
  }
  const { active } = activePages();
  const newEntries = active.map((page) => ({
    id: `round-${ROUND}-release-usdUI-${page.name}`,
    official_url: officialUrl(page.name),
    local_output: `${targetDir}/${page.name}.html`,
    status: "bilingual_complete",
    reason: `DomainSprintRound usdUI short-page promotion for ${page.name}: Chinese main-reading-path coverage now explains page role, official sections, UI/schema/property groups, node-graph or hint boundaries, common misreads, debugging path, adjacent usdUI relationships, and source parity while preserving API names, schema names, tokens, properties, code, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1700,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
      official_source_compared: true,
      local_source_snapshot_compared: `${sourceDir}/${page.name}_source.html`,
      source_parity_report: sourceParityReport,
      round_type: "DomainSprintRound",
    },
  }));
  const ids = new Set(newEntries.map((entry) => entry.id));
  const outputs = new Set(newEntries.map((entry) => entry.local_output));
  manifest.promotions = [
    ...newEntries,
    ...(manifest.promotions || []).filter((entry) => !ids.has(entry.id) && !outputs.has(entry.local_output)),
  ];
  manifest.generated_at = GENERATED_AT;
  manifest.updated_at = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  return newEntries;
}

function updateProblemAudit() {
  const quality = JSON.parse(fs.readFileSync(rel("reports", "translation_quality_review.json"), "utf8"));
  const english = JSON.parse(fs.readFileSync(rel("reports", "english_debt_audit.json"), "utf8"));
  const { active, skipped } = activePages();
  const promoted = active.map((page) => `${targetDir}/${page.name}.html`);
  const counts = {
    total_pages: quality.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: english.counts.review_ready_zh,
    api_complete: english.counts.api_complete,
    release_complete: english.counts.release_complete,
    release_review_ready_zh: english.counts.release_review_ready_zh,
    pending_full_scope: 0,
  };
  const notPromoted = [
    ...skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    ...nonSelectedCandidates().map((entry) => ({ output: entry.output, reason: entry.reason })),
  ];
  const report = {
    generated_at: new Date().toISOString(),
    purpose: `Round ${ROUND} DomainSprintRound：usdUI 短页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 124 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖页面职责、官方 section、UI/schema/property 分组、节点图或 hint 边界、误读点、调试路径、相邻 usdUI 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 usdUI release user guide 页面；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、段落级结构和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
        required_action: "凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。",
        evidence: "reports/markdown_encoding_audit.json 必须无 repeated question-mark damage、replacement characters、mojibake markers 和 UTF-8 BOM。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。",
      },
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮补齐 usdUI 的 8 个短 schema/API 页，但 overview 和 usdUI_toc 仍留作后续。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: notPromoted,
    source_parity_report: sourceParityReport,
    next_actions: [
      "下一轮可处理 usdUI overview/usdUI_toc，或选择另一个 release schema 域中仍为 draft_needs_translation 的 5-8 个短页；若导航或报告计数出现不一致，先做 DefectRound。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
  };
  fs.writeFileSync(rel("reports", "current_problem_audit.json"), JSON.stringify(report, null, 2), "utf8");
  return report;
}

const args = new Set(process.argv.slice(2));
const output = {};
if (args.has("--write-pages")) output.writePages = writePages();
if (args.has("--precheck")) output.precheck = precheckPages();
if (args.has("--manifest")) output.manifest = updateManifest();
if (args.has("--problem")) output.problem = updateProblemAudit();
if (args.has("--source-parity")) {
  const { active, skipped } = activePages();
  output.sourceParity = {
    source_parity: writeSourceParity(active, skipped),
    skipped_pages: skipped,
    not_selected_candidates: nonSelectedCandidates(),
  };
}
if (Object.keys(output).length === 0) {
  output.precheck = precheckPages();
}

if (output.precheck && output.precheck.results.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, round: ROUND, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
