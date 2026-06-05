import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-124";

const refinements = [
  {
    output: "full_site/release/wp.html",
    title: "Proposals",
    summary:
      "`Proposals` 是 release 文档中的历史提案目录页，集中列出旧版 white papers / proposals，并提示新的 proposal 已迁移到 `OpenUSD-proposals`。它的主要价值是导航和历史索引，不是规范正文或当前变更日志。",
    notes: [
      "本页列出的 proposal 横跨 UsdLux、Asset Resolution (Ar) 2.0、Asset Previews、Coordinate Systems、Render Settings、Rigid Body Physics、Schema Versioning、Stage Variable Expressions 和 UsdShade 等主题。",
      "目录页中的每个链接应被当作设计背景入口；是否已经实现、是否被更新或迁移，需要进入对应页面或当前 API 文档继续核对。",
      "`OpenUSD-proposals` 是后续新提案的主要位置；本地复刻保留旧目录，是为了保证 release 文档历史链接和 406 页清单完整。",
      "不要把 proposal 目录等同于正式规范目录：proposal 可能包含历史方案、已实现设计、被替代机制或仍需结合当前 schema/API 检查的内容。",
      "中文导读应帮助读者从目录跳到具体页面，并保留 proposal 标题、英文链接和原文摘录，方便逐项追溯设计语境。",
    ],
    terms: [
      ["Proposals", "提案目录"],
      ["white papers", "白皮书"],
      ["OpenUSD-proposals", "新的 OpenUSD 提案仓库"],
      ["design background", "设计背景"],
      ["implemented proposal", "已实现提案"],
      ["historical index", "历史索引"],
    ],
  },
  {
    output: "full_site/release/wp_schema_versioning.html",
    title: "Schema Versioning in USD",
    summary:
      "`Schema Versioning in USD` 讨论 schema 演化、per-schema versioning、API schema stacking、auto-apply API schemas、multiple-apply API schemas 和 version conflicts。它的核心不是单个版本号格式，而是 composition 与 schema 注册如何共同处理版本化类型。",
    notes: [
      "`per-schema versioning` 让同一 schema family 中的不同版本显式表达，而不是依赖全局 USD 版本号推断所有类型行为。",
      "版本化 schema 名称、C++ schema class、codegen 策略和 `UsdSchemaRegistry` 之间需要保持一致，否则会影响类型发现、API 访问和文档对应关系。",
      "`built-in API schemas`、`auto-apply API schemas` 与 `multiple-apply API schemas` 在版本解析时风险不同，尤其要关注组合后 `apiSchemas` 列表中的冲突。",
      "本页的示例强调 schema inheritance 和 composition 对最终 prim 类型的影响；阅读时不能只看局部 layer 中写入的一个 schema token。",
      "当前实现或 API 入口可能已随版本演进调整，proposal 用于理解历史设计动机；具体行为仍应查当前 `UsdPrim`、`UsdSchemaRegistry` 和相关 schema 文档。",
    ],
    terms: [
      ["per-schema versioning", "按 schema 单独版本化"],
      ["schema family", "schema 家族"],
      ["UsdSchemaRegistry", "USD schema 注册表"],
      ["apiSchemas", "API schema 列表"],
      ["auto-apply API schemas", "自动应用 API schemas"],
      ["version conflicts", "版本冲突"],
    ],
  },
  {
    output: "full_site/release/wp_usdaudio.html",
    title: "UsdAudio Proposal",
    summary:
      "`UsdAudio Proposal` 是音频 schema 的历史设计页，当前阅读应优先关联 `UsdMediaSpatialAudio`。proposal 的边界是为 USD stage 中的音频元素提供 interchange schema，而不是把 USD 变成音频编辑格式或把音频数据嵌入场景文件。",
    notes: [
      "`filePath` 使用 assetPath 指向外部音频文件或流；USD 负责场景引用和播放语义，音频采样数据仍由外部媒体资产承载。",
      "`auralMode`、`playbackMode`、`startTime`、`mediaOffset`、`level` 等属性描述音频播放方式、时序偏移和音量语义，应保留英文属性名。",
      "`timeCodesPerSecond` 影响时间轴解释；将媒体 offset 与 stage timeCode 对齐时，需要区分音频文件时间、USD 时间和播放起点。",
      "proposal 支持 spatial audio 和 ambient sound 两类常见需求：前者依赖位置/方向，后者更接近场景全局或非空间化声音。",
      "本页适合理解 UsdMedia 音频设计动机；实际 schema 字段、默认值和插件支持仍应回到当前 `UsdMediaSpatialAudio` 文档核对。",
    ],
    terms: [
      ["UsdMediaSpatialAudio", "UsdMedia 空间音频 schema"],
      ["filePath", "音频文件路径属性"],
      ["auralMode", "听觉模式"],
      ["playbackMode", "播放模式"],
      ["mediaOffset", "媒体偏移"],
      ["timeCodesPerSecond", "每秒时间码数量"],
    ],
  },
  {
    output: "full_site/release/wp_usdlux_for_renderers.html",
    title: "Adapting UsdLux to the Needs of Renderers",
    summary:
      "`Adapting UsdLux to the Needs of Renderers` 解释为什么 UsdLux 需要更好适配高质量渲染器：许多 renderer 把 lights、light filters 和 integrators 表达为 shader-like networks，因此 proposal 引入 Sdr definitions、connectable lights 和 plugin light 类型来减少硬编码转换。",
    notes: [
      "proposal 的核心是让 lights / light filters 具备 Connectable 能力，使 renderer delegate 可以通过连接网络和 Sdr metadata 数据驱动地解释灯光参数。",
      "`UsdLuxPluginLight` 与 `UsdLuxPluginLightFilter` 用于扩展 renderer-specific light/filter，而不要求核心 UsdLux 为每个渲染器硬编码一个 schema。",
      "`Sdr`、`UsdSchemaRegistry` 和 Hydra/render delegate 的关系是阅读重点：schema 描述场景数据，Sdr 描述节点定义，render delegate 决定如何消费。",
      "`PortalLight`、light filters 和 integrator-like controls 的语义可能随 renderer 实现不同而变化，中文说明不应把它们改写成统一物理模型。",
      "当前 API 入口应结合 `UsdLux overview`、schema 页面和具体 renderer 文档核对；本页主要保留历史设计背景和问题拆解。",
    ],
    terms: [
      ["Sdr definitions", "Sdr 节点定义"],
      ["connectable lights", "可连接灯光"],
      ["UsdLuxPluginLight", "UsdLux 插件灯光"],
      ["UsdLuxPluginLightFilter", "UsdLux 插件灯光过滤器"],
      ["render delegate", "渲染代理"],
      ["light filters", "灯光过滤器"],
    ],
  },
  {
    output: "full_site/release/wp_asset_previews.html",
    title: "Asset Previews in USD",
    summary:
      "`Asset Previews in USD` 解决资产库快速浏览问题：通过在 prim 的 `assetInfo` 中编码 preview / thumbnail 信息，应用可以读取预生成预览，而不必打开并渲染完整 stage。stage 级默认预览通常通过 defaultPrim 关联。",
    notes: [
      "proposal 选择把 preview 关联到 prim 而不是 layer，这让同一个 layer 中的不同 asset prim 可以拥有不同预览信息。",
      "`assetInfo` 字典用于保存 `previews`、`thumbnails`、`defaultImage` 等信息，旧版 USD 应用也能通过通用 metadata API 读取部分内容。",
      "预览资产是轻量索引信息，不等同于完整几何、材质或 render product；它服务于 asset browser、catalog 和 thumbnail workflow。",
      "本页与 `UsdGeomModel` texture cards 的区别在于：preview metadata 面向资产发现和浏览，texture cards 面向可渲染场景表达。",
      "使用预览时仍需管理 asset paths、默认 prim、分层引用和资源有效性；本地导读保留 usda 示例中的 token 与字段名，方便和工具输出对照。",
    ],
    terms: [
      ["assetInfo", "资产信息字典"],
      ["previews", "预览信息"],
      ["thumbnails", "缩略图"],
      ["defaultImage", "默认预览图"],
      ["defaultPrim", "默认 prim"],
      ["asset browser", "资产浏览器"],
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English page names, API names, schema names, property names, commands, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
  results,
}, null, 2));
