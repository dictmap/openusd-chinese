import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-108";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderPass.html",
    title: "RenderPass",
    summary:
      "`RenderPass` 描述 multi-pass rendering workflow 中一次 render pass 的 renderer configuration 与 scene configuration。它不等同于输出文件，也不等同于 AOV；它把 `renderSource`、`command`、`passType` 和 collection-based visibility 组合成一次可执行或可交给 DCC/renderer 的 pass 配置。",
    notes: [
      "`renderSource` 可以是指向 `RenderSettings` prim 的 relationship，也可以指向外部配置文件或 DCC 节点；官方举例中的 Houdini Rop、Nuke write node 说明它是 pass 配置入口，而不是渲染结果本身。",
      "`passType = \"prman\"` 与 `command = [\"prman\"]` 展示了 pass 可以携带 renderer 类型和启动命令。翻译时应保留 token 与命令字面量，避免破坏脚本和工具链对照。",
      "`collection:renderVisibility:includeRoot` 与 `collection:renderVisibility:includes` 把当前 pass 的可见对象交给 USD collection 表达；foreground/background pass 的差异通常来自 collection，而不是来自不同的输出产品。",
      "阅读 usdRender 时可按职责分层：`RenderSettings` 汇总设置，`RenderProduct` 描述输出 artifact，`RenderVar` 描述输出变量，`RenderPass` 描述单次 pass 的渲染器和场景选择。",
      "composite pass 示例提醒读者，`RenderPass` 也可表示合成阶段；这类 pass 可能引用外部配置或节点，而不一定直接渲染场景几何。",
    ],
    terms: [
      ["RenderPass", "渲染 pass schema"],
      ["renderSource", "渲染来源关系"],
      ["passType", "pass 类型 token"],
      ["command", "渲染命令数组"],
      ["collection:renderVisibility:includes", "渲染可见集合包含关系"],
      ["multi-pass rendering workflow", "多 pass 渲染工作流"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderProduct.html",
    title: "RenderProduct",
    summary:
      "`RenderProduct` 表示单个 render output artifact，例如图像文件、depth buffer 或其他 file-like artifact。它通过 `productName` 命名输出目标，并通过 `orderedVars` 把一个或多个 `RenderVar` 组织到同一个输出产品中。",
    notes: [
      "`RenderProduct` 的核心不是渲染算法，而是输出组织。`productName = \"/output/render000009.png\"` 给出输出 artifact 的目标名或路径，具体写文件行为仍由 renderer 或工具执行。",
      "`orderedVars` 是有序 relationship 列表，示例中把 `color`、`alpha`、`directDiffuse` 等 `RenderVar` 写入同一 product；有序性对多通道输出或文件格式映射很重要。",
      "本页应和 `RenderVar` 一起阅读：`RenderVar` 定义输出什么变量或 AOV，`RenderProduct` 定义这些变量进入哪个 artifact，`RenderSettings` 则引用 products 形成渲染配置。",
      "如果一个渲染任务需要多张图片、多个 buffer 或不同输出格式，通常会出现多个 `RenderProduct`；不要把所有输出都塞进一个 product 的中文描述里。",
      "术语 `render output artifact`、`file-like artifact`、`productName`、`orderedVars` 应保留英文，以便和 USD 文件、Doxygen 页面及 renderer UI 对齐。",
    ],
    terms: [
      ["RenderProduct", "渲染输出产品 schema"],
      ["render output artifact", "渲染输出产物"],
      ["productName", "输出产品名称属性"],
      ["orderedVars", "有序渲染变量关系"],
      ["RenderVar", "渲染变量 schema"],
      ["AOV", "任意输出变量"],
    ],
  },
  {
    output: "full_site/release/tut_inspect_and_author_props.html",
    title: "Inspecting and Authoring Properties",
    summary:
      "`Inspecting and Authoring Properties` 是 `Hello World` 之后的属性读写教程。它从 `Usd.Stage.Open('HelloWorld.usda')` 打开 stage，使用 `GetPrimAtPath('/hello')` 和 `GetPrimAtPath('/hello/world')` 取得 prim，再演示如何检查和 author properties。",
    notes: [
      "`Stage.Open -> GetPrimAtPath -> GetAttribute/Get/Set` 是本页最重要的 API 线索。中文说明应把它写成从 stage 到 prim 再到 property value 的访问链，而不是零散函数列表。",
      "`HelloWorld.usda`、`/hello`、`/hello/world` 是教程可复现实验的路径字面量，不能翻译或改写；读者需要用这些路径直接对照 Python 脚本。",
      "教程讨论的是 prim 上包含 geometric data 的 properties。读取 `attribute.Get()` 得到的是当前 composition 后的值，写入 `attribute.Set()` 则是在当前 edit target 中 author 新 opinion。",
      "`from pxr import Usd, Vt` 提醒读者 `Vt` 数组类型会出现在几何属性数据中；翻译时保留 `Vt`，并把它解释为 USD/Python 数据容器相关模块。",
      "本页的实用价值在于调试和小脚本 authoring：先确认 prim 是否存在，再检查 attribute 是否有效，最后区分读取当前值与写入新 opinion 的层级影响。",
    ],
    terms: [
      ["Usd.Stage.Open", "打开 USD stage 的 API"],
      ["GetPrimAtPath", "按路径取得 prim"],
      ["GetAttribute", "取得属性对象"],
      ["attribute.Get", "读取属性当前值"],
      ["attribute.Set", "写入 authored opinion"],
      ["Vt", "USD 值类型容器模块"],
    ],
  },
  {
    output: "full_site/release/tut_traversing_stage.html",
    title: "Traversing a Stage",
    summary:
      "`Traversing a Stage` 说明如何遍历 `UsdStage` 上已经 composition 完成的 prim。示例使用 `usdviewApi.stage.Traverse()`，返回的是 composed stage view 中可遍历的 `Usd.Prim`，这正是 imaging clients、USD importers 和 DCC 桥接工具常用的基础模式。",
    notes: [
      "`stage.Traverse()` 遍历的是组合后的 stage 视图，不是逐个 layer 文件的原始内容。读者应把 referenced layer 和 referencing layer 的差异交给 USD composition 处理。",
      "示例输出 `Usd.Prim(</refSphere>)`、`Usd.Prim(</refSphere/world>)`、`Usd.Prim(</refSphere2>)`、`Usd.Prim(</refSphere2/world>)` 展示 traversal 会按 stage 层级返回 prim 路径。",
      "`usdviewApi` 是 usdview interpreter 提供的便利对象。教程要求在 usdview 中打开 `RefExample.usda` 并通过 `i` 或 Window -> Interpreter 进入交互环境，这些操作步骤应保留英文名称。",
      "对 importer 或 imaging client 来说，traversal 的结果通常是后续判断 prim type、读取属性、构造渲染或导入对象的入口，而不是最终业务逻辑本身。",
      "如果后续补全 predicate、active/inactive、loaded/unloaded 等遍历条件，应明确这些是 traversal 过滤语义，不要和 layer composition 或 namespace editing 混淆。",
    ],
    terms: [
      ["Traversing a Stage", "遍历 Stage"],
      ["UsdStage", "USD 舞台"],
      ["stage.Traverse()", "遍历组合后 prim 的 API"],
      ["usdviewApi", "usdview 解释器辅助对象"],
      ["Usd.Prim", "USD 图元对象"],
      ["composition", "USD 组合结果"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html",
    title: "SpatialAudio",
    summary:
      "`SpatialAudio` 在 USD scene description 中表达音频播放意图：`filePath` 指向音频资源，`auralMode` 描述播放模式，`startTime`、`endTime`、`playbackMode` 和 `mediaOffset` 共同决定播放时序。它不是音频引擎本身，而是让工具和播放端能发现、同步和调度声音。",
    notes: [
      "示例中的 `Speech` prim 位于 `Cube` 内部，并设置 `auralMode = \"spatial\"`，说明声音可以与场景空间位置绑定；父 prim transform 会影响空间化解释。",
      "`Ambient` prim 使用非空间化的环境声音语义，适合背景或全局音轨。中文说明应保留 `spatial`、`nonSpatial` 等 token 字面量，便于和文件示例核对。",
      "`startTime = 240`、`endTime = 480` 与 stage 的 `timeCodesPerSecond = 24` 一起决定音频播放时间窗；读者应按 USD timeCode 而不是普通秒数直接理解这些值。",
      "`playbackMode = \"onceFromStartToEnd\"` 表示从开始到结束播放一次；如果后续页面列出 loop 或 offset 模式，应和 `mediaOffset` 一起解释媒体内部时间与 stage 时间的映射。",
      "`filePath = @mySpeech.mp3@` 是 asset path 引用，必须保留 `@...@` 语法；路径解析、打包和媒体可用性仍由资产解析器和播放端负责。",
    ],
    terms: [
      ["SpatialAudio", "空间音频 schema"],
      ["filePath", "音频资源路径属性"],
      ["auralMode", "听觉模式属性"],
      ["playbackMode", "播放模式属性"],
      ["mediaOffset", "媒体内部时间偏移"],
      ["timeCodesPerSecond", "每秒 timeCode 数"],
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, function names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
