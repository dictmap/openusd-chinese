import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "schema-media-quality-pass-005";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/RectLight.html",
    title: "RectLight",
    notes: [
      "RectLight 是从矩形一侧发光的 intrinsic light，默认矩形位于 XY 平面中心并沿 -Z 轴发光；它适合表达摄影 soft box、灯板、线性灯和荧光灯等面光源。",
      "官方摘录提到矩形默认在 X/Y 轴方向各为 1 unit；示例把 width/height 设为 5x5，并使用 colored checkerboard texture 作为 color map。",
      "阅读时应把 width、height、color map、cone angle 和 focus 放在一起理解：前两者定义发光面积，color map 定义表面颜色变化，light shaping 参数控制照射扩散。",
      "RectLight 与 DiskLight、CylinderLight、SphereLight 的主要区别是发光几何形状；中文说明只解释选择场景，不改动 schema 名称和属性名。"
    ],
    terms: [
      ["RectLight", "矩形灯"],
      ["rectangle", "矩形发光面"],
      ["width/height", "宽度/高度"],
      ["color map", "颜色贴图"],
      ["light shaping cone angle", "光形控制锥角"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/SphereLight.html",
    title: "SphereLight",
    notes: [
      "SphereLight 从球体表面向外发光，官方说明它是 one-sided，因此球体内部不发光；这点对封闭灯罩或内部采样的理解很重要。",
      "当 treatAsPoint 为 true 且渲染器支持 zero-area lights 时，SphereLight 可以作为零半径 point light 使用；否则它更像一个具有半径的球形面积光。",
      "示例中 SphereLight 放在 Sphere 与 Cube 附近，radius 为 0.8；radius 会影响可见光源大小和阴影柔和程度，最终效果仍取决于渲染器实现。",
      "常见用途包括灯泡、头灯、球形发光体和需要柔和点状照明的场景；属性名 treatAsPoint 和 radius 保持英文原样，便于和 USD 示例对照。"
    ],
    terms: [
      ["SphereLight", "球形灯"],
      ["one-sided", "单面发光"],
      ["treatAsPoint", "按点光处理开关"],
      ["zero-area lights", "零面积光源"],
      ["radius", "半径属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/usdLux_toc.html",
    title: "Lights (usdLux)",
    notes: [
      "本页是 usdLux 灯光 schema 的目录入口，不是单个 API 正文；它把 Overview、UsdLux Schemas and Concepts、Light Units 和各类具体灯光 schema 串成阅读路线。",
      "建议先读 Overview 与 Concepts，理解 LightAPI、BoundableLightBase、NonboundableLightBase 的分层，再进入 CylinderLight、DomeLight、RectLight、SphereLight 等具体类型。",
      "目录中的 ShapingAPI、ShadowAPI、LightFilter、PluginLight 等入口说明 usdLux 不只描述光源形状，还描述光形、阴影、过滤器和渲染器插件扩展点。",
      "本页链接应继续保持本地跳转；schema 名称不翻译，因为它们同时是页面名、API 标识和搜索关键字。"
    ],
    terms: [
      ["usdLux", "USD 灯光 schema 领域"],
      ["LightAPI", "灯光通用 API schema"],
      ["BoundableLightBase", "有边界灯光基类"],
      ["NonboundableLightBase", "无边界灯光基类"],
      ["Light Units", "灯光单位"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html",
    title: "AssetPreviewsAPI",
    notes: [
      "AssetPreviewsAPI 用于给资产提供 thumbnail previews，常见场景是为某个 asset 绑定 preview render 缩略图，供 DCC asset browser 或系统资产浏览器显示。",
      "阅读本页时应把它理解为资产元数据和用户界面之间的桥梁：USD 资产本身保留结构数据，AssetPreviewsAPI 则提供可视化预览入口。",
      "官方示例展示如何把 thumbnails 链接到 asset；中文层解释用途和数据关系，API 名称、thumbnail 路径和示例代码保持英文原样。",
      "后续段落级翻译可继续补齐默认预览、不同分辨率缩略图、资产浏览器如何选择图像以及与 assetInfo 元数据的关系。"
    ],
    terms: [
      ["AssetPreviewsAPI", "资产预览 API schema"],
      ["thumbnail previews", "缩略图预览"],
      ["preview render", "预览渲染图"],
      ["asset browser", "资产浏览器"],
      ["DCC tool", "数字内容创作工具"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html",
    title: "SpatialAudio",
    notes: [
      "SpatialAudio 定义在场景中播放音频所需的属性，重点包括播放哪个音频 filePath、以什么 auralMode 播放，以及 startTime、endTime、playbackMode、mediaOffset 等播放控制。",
      "官方摘录提到 Speech 和 Ambient prims 的典型用例；阅读时可把 Speech 理解为定位明确的语音源，把 Ambient 理解为环境声或背景声。",
      "filePath 指向音频资源，auralMode 描述听觉模式，playbackMode 和时间属性控制何时开始、何时结束、是否循环或偏移媒体时间。",
      "SpatialAudio 属于 usdMedia 领域，和几何、灯光不同，它把时间、媒体文件和场景 prim 结合起来；属性名和示例路径必须保留原样。"
    ],
    terms: [
      ["SpatialAudio", "空间音频"],
      ["filePath", "音频文件路径"],
      ["auralMode", "听觉模式"],
      ["playbackMode", "播放模式"],
      ["mediaOffset", "媒体时间偏移"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令、属性名和原文摘录继续保留，便于和官方 schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, property names, and source excerpts for comparison with the official schema documentation.</p>
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
