import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdRender-schema-quality-pass-006";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html",
    title: "Media (usdMedia)",
    notes: [
      "本页是 usdMedia schema 领域的目录入口，主要把 Overview、Working With Media、AssetPreviewsAPI、SpatialAudio 和相关属性页串成阅读路线。",
      "建议先读 Overview 与 Working With Media，理解媒体资源如何作为 USD scene 的一部分被引用，再进入 AssetPreviewsAPI 和 SpatialAudio 两个具体 schema。",
      "目录中的 auralMode、endTime 等属性名应保持英文原样，因为它们直接对应 SpatialAudio 的属性；中文层只解释属性用途和阅读顺序。",
      "本页链接继续保持本地跳转；它的价值在于导航和术语定位，不适合把每个 schema 名称都翻译成中文替代名。"
    ],
    terms: [
      ["usdMedia", "USD 媒体 schema 领域"],
      ["Working With Media", "媒体使用指南"],
      ["AssetPreviewsAPI", "资产预览 API schema"],
      ["SpatialAudio", "空间音频 schema"],
      ["auralMode", "听觉模式属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderPass.html",
    title: "RenderPass",
    notes: [
      "RenderPass 表示多 pass 渲染工作流中一次单独渲染 pass 的 renderer 与 scene configuration，可用于前景、背景、合成等分阶段渲染。",
      "renderer configuration 可以通过指向 RenderSettings prim 的 relationship 指定，也可以指向外部渲染配置文件；例如 Houdini pass 可能指向 Rop，Nuke pass 可能指向 write node。",
      "scene configuration 通过 USD collection 描述哪些 prim 对渲染器可见；这意味着 RenderPass 与 Collections 概念直接相关，不能只把它理解成输出文件名。",
      "后续段落级翻译应继续补齐 RenderPass、RenderSettings、collection、外部 DCC 节点之间的职责边界和引用关系。"
    ],
    terms: [
      ["RenderPass", "渲染 pass schema"],
      ["multi-pass rendering workflow", "多 pass 渲染工作流"],
      ["renderer configuration", "渲染器配置"],
      ["scene configuration", "场景配置"],
      ["USD collection", "USD 集合"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderProduct.html",
    title: "RenderProduct",
    notes: [
      "RenderProduct 表示一次渲染产生的单个输出 artifact，例如渲染图像文件、depth buffer 或其他类似文件的结果。",
      "一个 RenderProduct 可以组合一个或多个 RenderVars，把多个渲染变量写入同一个输出产品；因此它位于 RenderSettings 与 RenderVar 之间的输出组织层。",
      "阅读时应把 RenderProduct 看成“输出容器”，而不是具体的颜色、深度或 alpha 通道本身；具体通道由 RenderVar 描述。",
      "后续精修可继续补齐文件路径、分辨率、产品名称和多个 RenderProduct 如何对应多路输出的场景。"
    ],
    terms: [
      ["RenderProduct", "渲染输出产品"],
      ["render output artifact", "渲染输出产物"],
      ["rendered image file", "渲染图像文件"],
      ["depth buffer", "深度缓冲"],
      ["RenderVars", "渲染变量集合"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettings.html",
    title: "RenderSettings",
    notes: [
      "RenderSettings 封装一次渲染调用所需的全局设置：渲染器应使用什么设置，以及应该产生哪些 render output。",
      "官方说明渲染器可以对 RenderSettings 应用或自动应用 API schemas，用来表达 renderer-specific global configuration，例如 RenderMan 的 renderer options。",
      "本页属性需要和 RenderProducts、RenderVars、imageable purposes 一起读：RenderSettings 指向输出产品，输出产品再组合具体变量，同时还可控制哪些 imageable purpose 被渲染。",
      "后续段落级翻译应重点补齐 RenderSettingsBase 继承属性、产品关系、camera/resolution 等全局控制项和渲染器扩展 API schema 的关系。"
    ],
    terms: [
      ["RenderSettings", "渲染设置 schema"],
      ["global settings", "全局渲染设置"],
      ["renderer-specific global configuration", "渲染器特定全局配置"],
      ["RenderProducts", "渲染输出产品关系"],
      ["imageable purposes", "可渲染用途分类"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderVar.html",
    title: "RenderVar",
    notes: [
      "RenderVar 表示渲染器计算出的某个数据量或 channel，常被称为 arbitrary output variable (AOV)。",
      "示例包括 camera-space depth、shader 输出的 color/alpha、light path expressions (LPEs)，以及渲染器自身的 per-pixel computation time 等。",
      "RenderVar prim 的名称会驱动渲染器输出的数据变量名称；例如名为 alpha 的 RenderVar 通常表示输出名为 alpha 的 alpha channel。",
      "USD 还没有强制统一 RenderVar 名称和格式，因此 renderer-specific RenderVars 是预期行为；阅读 source 信息时要区分 shader output、depth/normals 和 LPE。"
    ],
    terms: [
      ["RenderVar", "渲染变量"],
      ["arbitrary output variable (AOV)", "任意输出变量"],
      ["camera-space depth", "相机空间深度"],
      ["light path expressions (LPEs)", "光路表达式"],
      ["source information", "数据来源信息"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令、属性名和原文摘录继续保留，便于和官方 usdRender/usdMedia schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, property names, and source excerpts for comparison with the official usdRender/usdMedia schema documentation.</p>
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
