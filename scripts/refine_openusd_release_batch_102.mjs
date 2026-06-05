import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-102";

const refinements = [
  {
    output: "full_site/release/tut_traversing_stage.html",
    title: "Traversing a Stage",
    summary:
      "`Traversing a Stage` 说明如何遍历 `UsdStage` 上已经组合完成的 prim。阅读时要把它看作 imaging clients、USD importers 和 DCC 桥接工具的基础模式：脚本看到的是组合后的 stage 视图，而不是单个 layer 文件的原始片段。",
    notes: [
      "本教程使用 `Referencing Layers` 产生的 `HelloWorld.usda` 和 `RefExample.usda`。`HelloWorld.usda` 是被引用层，`RefExample.usda` 是引用层；遍历 `UsdStage` 时看到的是两者组合后的 prim namespace。",
      "`usdview` 的 interpreter 可以通过键盘 `i` 或 `Window > Interpreter` 打开。教程中的命令通常依赖当前打开的 stage，因此复制示例文件、保持可写和确认工作目录是复现实验的前置条件。",
      "`usdviewApi` 是 interpreter 内置对象，提供访问当前 `UsdStage`、选择项和便利函数的入口。翻译时应保留 `usdviewApi`、`UsdStage`、`prim`、`stage` 等 API/术语字面量。",
      "遍历 composed prims 的价值在于消费者无需手动追踪每条 reference、sublayer 或 composition arc；导入器和渲染前端通常只关心最终可见的 prim tree 和属性解析结果。",
      "如果后续补全逐段翻译，应区分 layer traversal 与 stage traversal：前者检查文件内容，后者检查组合结果。本页标题中的 `Stage` 指 USD 的组合场景对象，不应翻译成普通舞台。"
    ],
    terms: [
      ["Traversing a Stage", "遍历 Stage"],
      ["UsdStage", "USD 组合场景对象"],
      ["composed prims", "组合后的 prim"],
      ["usdview", "USD 查看器"],
      ["usdviewApi", "usdview 内置 API 对象"],
      ["interpreter", "交互式解释器"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html",
    title: "AssetPreviewsAPI",
    summary:
      "`AssetPreviewsAPI` 用于把资产和预览缩略图关联起来，典型用途是为 DCC asset browser、系统资产浏览器或管线工具提供 preview render 图像。它描述的是资产预览元数据，不等同于渲染任务输出。",
    notes: [
      "页面中的 thumbnail previews 应理解为资产层面的 UX 辅助信息：浏览资产库时先显示缩略图，用户再决定是否加载完整 USD 资产或打开更重的预览。",
      "`preview render` thumbnails 通常来自离线渲染、资产发布流程或管线缓存；`AssetPreviewsAPI` 负责把这些图像路径挂到资产上，而不是定义如何渲染这些图像。",
      "示例重点是“如何 link thumbnails to an asset”。翻译时应保留 asset、thumbnail、default image、file path 等术语，并避免把 schema 属性名改写成中文。",
      "在 DCC 工具中，缩略图可能被用于 asset icons、搜索结果、拖拽面板或系统级 asset browser。中文导读应突出它面向浏览体验，而不是几何、材质或音频行为。",
      "如果一个资产没有预览图，工具仍然可以加载 USD；`AssetPreviewsAPI` 只是补充可视索引。维护页面时应保留官方示例和链接，方便读者对照具体 usda 写法。"
    ],
    terms: [
      ["AssetPreviewsAPI", "资产预览 API"],
      ["thumbnail previews", "缩略图预览"],
      ["preview render", "预览渲染图"],
      ["DCC asset browser", "DCC 资产浏览器"],
      ["default image", "默认图像"],
      ["asset metadata", "资产元数据"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderProduct.html",
    title: "RenderProduct",
    summary:
      "`RenderProduct` 表示一个具体的 render output artifact，例如渲染图像、depth buffer 或其他 file-like artifact。它把一个或多个 `RenderVar` 组合成一个输出目标，是 `RenderSettings` 描述渲染交付物时的重要节点。",
    notes: [
      "`RenderProduct` 不直接等同于 `RenderVar`。`RenderVar` 描述要写出的变量或 AOV，`RenderProduct` 描述这些变量被写入哪个输出 artifact 以及如何作为产品组织。",
      "`RenderSettings` 通常汇总渲染配置并引用 products；`RenderPass` 更偏向一次渲染过程或通道组织。读本页时应把 `RenderProduct` 放在 settings、vars、pass 的关系网中理解。",
      "官方摘要中的 rendered image file、output depth buffer、file-like artifact 都是输出物示例。中文说明应保留这些英文词，方便与 renderer UI、Hydra delegate 和管线脚本对应。",
      "一个 product 可以组合 one or more `RenderVars`，因此它常被看作最终文件或缓冲区的容器。维护页面时不应把每个 `RenderVar` 误写成独立文件，除非具体配置如此指定。",
      "如果后续扩展逐段翻译，优先解释 product 与 camera、resolution、vars、file path/output target 的关系，但属性名和示例代码必须保持官方原样。"
    ],
    terms: [
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染变量"],
      ["RenderSettings", "渲染设置"],
      ["RenderPass", "渲染通道"],
      ["output artifact", "输出产物"],
      ["depth buffer", "深度缓冲"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html",
    title: "SpatialAudio",
    summary:
      "`SpatialAudio` 定义场景中音频播放所需的属性，包括播放哪个音频文件、以什么 `auralMode` 播放，以及由 `startTime`、`endTime`、`playbackMode` 和 `mediaOffset` 组合出的播放时序。",
    notes: [
      "`filePath` 指向要播放的媒体资源，`auralMode` 描述声音在场景中的听觉模式。翻译时应保留这些 schema property names，中文只解释用途。",
      "`startTime`、`endTime`、`playbackMode` 和 `mediaOffset` 共同决定音频何时开始、何时停止、是否循环或如何偏移。检查动画 stage 时，音频 timing 应和 timeCodes 一起看。",
      "官方示例提到 Speech 和 Ambient prims，暗示同一场景可以同时拥有对白类声音和环境类声音。中文导读应帮助读者区分声音内容、空间位置和播放策略。",
      "`SpatialAudio` 属于 `usdMedia`，它并不替代外部音频引擎；它在 USD scene description 中表达音频意图，让工具和播放端能发现、调度和同步媒体。",
      "若 stage 或引用 layer 存在 layer offset，音频的 `mediaOffset` 与 USD time remapping 可能一起影响实际听到的时间点。后续补全应保留官方属性名和数值示例。"
    ],
    terms: [
      ["SpatialAudio", "空间音频"],
      ["filePath", "音频文件路径属性"],
      ["auralMode", "听觉模式属性"],
      ["playbackMode", "播放模式属性"],
      ["mediaOffset", "媒体偏移属性"],
      ["Ambient", "环境声音 prim"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/SphereLight.html",
    title: "SphereLight",
    summary:
      "`SphereLight` 是从球体向外发光的 intrinsic light。它是 one-sided light，球体内部不发光；当 `treatAsPoint` 为 true 且 renderer 支持 zero-area lights 时，也可作为零半径 point light 使用。",
    notes: [
      "官方说明中的 `emits light outwards from a sphere` 和 `no light is emitted inside the sphere` 是阅读本页的核心。中文应明确这是向外发射的球形光源，而不是内外双面发光体。",
      "`treatAsPoint` 控制是否把该光源当作 point light 使用；但官方同时限定 renderer must support zero-area lights，因此这是 renderer 能力相关行为，不应写成所有渲染器必然支持。",
      "`SphereLights` 常用于模拟 light bulbs、headlamps 等点状或球状光源。翻译时保留这些英文用途词，方便美术、灯光和渲染人员与工具界面对照。",
      "示例中半径为 `0.8` 的 `SphereLight` 放在 Sphere 和 Cube 附近，说明 radius 会影响光源几何大小和可视/照明语义。不要把示例数值替换为泛化描述。",
      "本页属于 `usdLux` schema；后续逐段补全时应保留 `SphereLight`、`radius`、`treatAsPoint`、`zero-area lights`、`point light` 等字面量，避免破坏搜索和脚本引用。"
    ],
    terms: [
      ["SphereLight", "球形光源"],
      ["intrinsic light", "内建光源"],
      ["one-sided light", "单面光源"],
      ["treatAsPoint", "按点光源处理属性"],
      ["zero-area lights", "零面积光源"],
      ["point light", "点光源"]
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
  results
}, null, 2));
