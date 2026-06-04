import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_release_index_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "release_index.html");

const terms = new Map([
  ["Universal Scene Description", "通用场景描述"],
  ["USD Home", "USD 首页"],
  ["Learn", "学习"],
  ["User Guides", "用户指南"],
  ["Reference", "参考"],
  ["Introduction to USD", "USD 介绍"],
  ["Introduction to OpenExec", "OpenExec 介绍"],
  ["Terms and Concepts", "术语与概念"],
  ["Tutorials", "教程"],
  ["Hello World - Creating Your First USD Stage", "Hello World - 创建第一个 USD Stage"],
  ["Hello World Redux - Using Generic Prims", "Hello World Redux - 使用通用 Prims"],
  ["Inspecting and Authoring Properties", "检查与创作属性"],
  ["Referencing Layers", "引用 Layers"],
  ["Converting Between Layer Formats", "转换 Layer 格式"],
  ["Traversing a Stage", "遍历 Stage"],
  ["Authoring Variants", "创作 Variants"],
  ["Variants Example in Katana", "Katana 中的 Variants 示例"],
  ["Transformations, Animation, and Layer Offsets", "变换、动画与 Layer Offsets"],
  ["Simple Shading in USD", "USD 中的简单着色"],
  ["End to End Example", "端到端示例"],
  ["Houdini USD Example Workflow", "Houdini USD 示例工作流"],
  ["Generating New Schema Classes", "生成新的 Schema 类"],
  ["Creating a Usdview Plugin", "创建 Usdview 插件"],
  ["Downloads and Videos", "下载与视频"],
  ["Products Using USD", "使用 USD 的产品"],
  ["Collections and Patterns", "集合与模式"],
  ["Basic Usage", "基本用法"],
  ["Configuring Membership Mode", "配置成员模式"],
  ["Relationship-Mode Collections", "关系模式集合"],
  ["Configuring Relationship-Mode Collections", "配置关系模式集合"],
  ["Pattern-Based Collections", "基于模式的集合"],
  ["Path Expressions", "路径表达式"],
  ["Path Patterns", "路径模式"],
  ["Additional Expressions Considerations", "表达式的其他注意事项"],
  ["Configuring Pattern-Based Collections", "配置基于模式的集合"],
  ["Getting the Expression for a Relationship-Mode Collection", "获取关系模式集合的表达式"],
  ["Color", "颜色"],
  ["Working With Color in OpenUSD", "在 OpenUSD 中使用颜色"],
  ["Color Spaces Supported by OpenUSD", "OpenUSD 支持的色彩空间"],
  ["Working With Color Space Schemas", "使用色彩空间 Schema"],
  ["Color Space Inheritance and Resolution", "色彩空间继承与解析"],
  ["Default Color Space", "默认色彩空间"],
  ["What is a Color Space?", "什么是色彩空间？"],
  ["Gamut Limitations and Considerations", "色域限制与注意事项"],
  ["Common White Points", "常见白点"],
  ["Linear vs. Non-Linear Spaces", "线性与非线性空间"],
  ["Considerations in Content Creation", "内容创作注意事项"],
  ["Glossary of Color Terms", "颜色术语表"],
  ["Namespace Editing", "命名空间编辑"],
  ["Using UsdNamespaceEditor", "使用 UsdNamespaceEditor"],
  ["Setting Editor Options", "设置编辑器选项"],
  ["Working With Relocates", "使用 Relocates"],
  ["Fixing Paths For Moved Objects", "修复已移动对象的路径"],
  ["Applying Edits to Dependent Stages", "将编辑应用到依赖 Stage"],
  ["Batch Edits", "批量编辑"],
  ["Namespace Editing Best Practices", "命名空间编辑最佳实践"],
  ["Use CanApplyEdits() To Validate Edit Operations", "使用 CanApplyEdits() 验证编辑操作"],
  ["Built-In Properties From Schemas Are Not Editable", "来自 Schema 的内置属性不可编辑"],
  ["Be Aware of Relocates Performance Impact", "注意 Relocates 的性能影响"],
  ["Rendering with USD", "使用 USD 渲染"],
  ["Configuring Imageable Content", "配置 Imageable 内容"],
  ["Configuring the Stage Coordinate System", "配置 Stage 坐标系统"],
  ["Understanding Render Visibility", "理解渲染可见性"],
  ["Using the Visibility Attribute", "使用 Visibility 属性"],
  ["Using Imageable Purpose", "使用 Imageable Purpose"],
  ["Understanding Intrinsic and Explicit Normals", "理解内在法线与显式法线"],
  ["Working with Lights", "使用灯光"],
  ["Using Light-linking to Filter Objects Affected by Lights", "使用 Light-linking 筛选受灯光影响的对象"],
  ["Working with Materials", "使用材质"],
  ["Using the USD Preview Material", "使用 USD Preview Material"],
  ["Using GLSLFX Shaders", "使用 GLSLFX Shader"],
  ["Working with Primvars", "使用 Primvars"],
  ["Primvar Interpolation", "Primvar 插值"],
  ["Indexed Primvars", "索引 Primvars"],
  ["Consuming Primvars in Materials", "在材质中消费 Primvars"],
  ["Material Primvar Fallbacks", "材质 Primvar 回退值"],
  ["Using Material Binding Purpose", "使用 Material Binding Purpose"],
  ["Binding Materials to Collections", "将材质绑定到集合"],
  ["Setting Collection Binding Strength", "设置集合绑定强度"],
  ["Combining Collection Binding with Material Binding Purpose", "组合集合绑定与 Material Binding Purpose"],
  ["Using Material Render Contexts", "使用材质渲染上下文"],
  ["Working With Image File Formats", "使用图像文件格式"],
  ["Guidelines for All Supported Image Formats", "所有受支持图像格式的指南"],
  ["Defining the Render Camera", "定义渲染相机"],
  ["Configuring Motion Blur", "配置运动模糊"],
  ["Configuring Render Settings", "配置渲染设置"],
  ["Primvars", "Primvars"],
  ["Primvar Interpolation Modes", "Primvar 插值模式"],
  ["Constant Interpolation", "Constant 插值"],
  ["Uniform Interpolation", "Uniform 插值"],
  ["Vertex Interpolation", "Vertex 插值"],
  ["Varying Interpolation", "Varying 插值"],
  ["faceVarying Interpolation", "faceVarying 插值"],
  ["Primvars and the Scene Namespace", "Primvars 与场景命名空间"],
  ["Indexed Primvars and Attribute Blocks", "索引 Primvars 与属性阻断"],
  ["Primvar Element Size", "Primvar 元素大小"],
  ["Schema Domains", "Schema 领域"],
  ["Lights (usdLux)", "灯光 (usdLux)"],
  ["Overview", "概览"],
  ["Properties", "属性"],
  ["Inherited Properties ( Boundable )", "继承属性 ( Boundable )"],
  ["Inherited Properties ( Xformable )", "继承属性 ( Xformable )"],
  ["Inherited Properties ( Imageable )", "继承属性 ( Imageable )"],
  ["Inherited Properties ( LightFilter )", "继承属性 ( LightFilter )"],
  ["Inherited Properties ( RenderSettingsBase )", "继承属性 ( RenderSettingsBase )"],
  ["Inherited Properties ( VolumeFieldAsset )", "继承属性 ( VolumeFieldAsset )"],
  ["Inherited Properties ( Gprim )", "继承属性 ( Gprim )"],
  ["UsdLux Schemas and Concepts", "UsdLux Schema 与概念"],
  ["Light Units", "灯光单位"],
  ["Understanding Light Contributions", "理解灯光贡献"],
  ["Light Shaping", "灯光塑形"],
  ["Shadows", "阴影"],
  ["Mesh Lights", "网格灯光"],
  ["Light-linking and Shadow-linking", "Light-linking 与 Shadow-linking"],
  ["Media (usdMedia)", "媒体 (usdMedia)"],
  ["Working With Media", "使用媒体"],
  ["Render (usdRender)", "渲染 (usdRender)"],
  ["Best Practices", "最佳实践"],
  ["Using UsdRender to Control How Prims Are Rendered", "使用 UsdRender 控制 Prim 的渲染方式"],
  ["Working with RenderProduct", "使用 RenderProduct"],
  ["Configuring Multi-pass Renders with RenderPass", "使用 RenderPass 配置多遍渲染"],
  ["UI (usdUI)", "用户界面 (usdUI)"],
  ["Working With Node Graphs", "使用节点图"],
  ["Working With Accessibility Information", "使用无障碍信息"],
  ["Working With UI Hints", "使用 UI 提示"],
  ["Volumes (usdVol)", "体积 (usdVol)"],
  ["Working With Volumes", "使用体积"],
  ["Working With Fields", "使用场"],
  ["Working With Particle Fields", "使用粒子场"],
  ["Time and Animated Values", "时间与动画值"],
  ["Understanding TimeCodes", "理解 TimeCodes"],
  ["Working With TimeCodes Programmatically", "以编程方式使用 TimeCodes"],
  ["Mapping TimeCodes to Real Time", "将 TimeCodes 映射到真实时间"],
  ["Specifying Layer Start and End Times", "指定 Layer 开始和结束时间"],
  ["Using TimeCode Ranges", "使用 TimeCode 范围"],
  ["Working with Automatic and Explicit TimeCode Remapping Across Composition", "在 Composition 中使用自动和显式 TimeCode 重映射"],
  ["Automatic Scaling of timeCodesPerSecond", "自动缩放 timeCodesPerSecond"],
  ["Configuring TimeCode Scaling and Offsets Using LayerOffsets", "使用 LayerOffsets 配置 TimeCode 缩放和偏移"],
  ["Combining Automatic Scaling and Layer Offsets", "组合自动缩放与 Layer Offsets"],
  ["Variable Expressions", "变量表达式"],
  ["Defining Expression Variables in a Layer", "在 Layer 中定义表达式变量"],
  ["Expression Variables and Composition", "表达式变量与 Composition"],
  ["Authoring Variable Expressions", "创作变量表达式"],
  ["Expression Function Reference", "表达式函数参考"],
  ["Examples", "示例"],
  ["Flexible Variant Selections", "灵活的 Variant 选择"],
  ["Asset-valued Texture File Attribute", "Asset 类型纹理文件属性"],
  ["Conditionally Include Sublayers", "按条件包含 Sublayers"],
  ["API Documentation", "API 文档"],
  ["Toolset", "工具集"],
  ["Specifications", "规范"],
  ["USD Core Specification", "USD 核心规范"],
  ["UsdPreviewSurface Specification", "UsdPreviewSurface 规范"],
  ["Goal", "目标"],
  ["Core Nodes", "核心节点"],
  ["USD Sample", "USD 示例"],
  ["Other Notes", "其他说明"],
  ["Changes, by Version", "按版本列出的变更"],
  ["Usdz File Format Specification", "Usdz 文件格式规范"],
  ["Purpose", "目的"],
  ["Usdz Specification", "Usdz 规范"],
  ["Foundation", "基础"],
  ["Zip Constraints", "Zip 约束"],
  ["Layout", "布局"],
  ["File Types", "文件类型"],
  ["USD Constraints", "USD 约束"],
  ["Editability", "可编辑性"],
  ["Accessibility", "无障碍"],
  ["Packaging Considerations for Streaming and Encapsulation", "流式传输与封装的打包注意事项"],
  ["File Ordering Within Package for Streaming", "为流式传输安排包内文件顺序"],
  ["For Reproducible Results, Encapsulate Using Anchored Asset Paths", "为了可复现结果，使用锚定资产路径封装"],
  ["MIME Type", "MIME 类型"],
  ["Proposals", "提案"],
  ["Adapting UsdLux to Accommodate Geometry Lights", "调整 UsdLux 以适配几何灯光"],
  ["Introduction and Background", "介绍与背景"],
  ["Mesh Light Support in the Industry", "行业中的网格灯光支持"],
  ["Design Space and Issues", "设计空间与问题"],
  ["Proposal and Behaviors", "提案与行为"],
  ["Get Started", "开始使用"],
  ["Download", "下载"],
  ["FAQ", "常见问题"],
  ["Get and Build USD", "获取并构建 USD"],
  ["Release", "发布版"],
  ["Dev", "开发版"],
  ["Changes", "变更"],
  ["Demo Assets", "演示资产"],
  ["OpenUSD Forum", "OpenUSD 论坛"],
  ["Learning Content on the USD Working Group Wiki", "USD 工作组 Wiki 学习内容"],
  ["USD Basics in an Hour(ish) (PDF)", "约一小时掌握 USD 基础 (PDF)"],
  ["Next", "下一页"],
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function titlePair(en) {
  const zh = terms.get(en);
  return zh ? `${zh} / ${en}` : en;
}

function htmlPair(en) {
  const zh = terms.get(en);
  if (!zh) return en;
  return `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>`;
}

function applyTextPairs(html) {
  for (const en of terms.keys()) {
    const pattern = new RegExp(`>(\\s*)${escapeRegex(en)}(\\s*)<`, "g");
    html = html.replace(pattern, (_match, before, after) => `>${before}${htmlPair(en)}${after}<`);
  }

  html = html.replace(/title="([^"]+)"/g, (match, title) => {
    if (!terms.has(title)) return match;
    return `title="${titlePair(title)}"`;
  });

  return html;
}

function applyNestedPairs(html) {
  return html.replace(
    /Inherited Properties \(<span class="xref std std-ref">([^<]+)<\/span>\)/g,
    (_match, schemaName) => `<span class="cn-term">继承属性 (${schemaName})</span><span class="en-term">Inherited Properties (<span class="xref std std-ref">${schemaName}</span>)</span>`,
  );
}

function replaceIndexBrief(html) {
  const brief = `<div class="usd-index-brief docutils openusd-release-repro">
<div class="bilingual-brief">
<p class="zh"><span class="fa fa-caret-right"></span> USD 是一个高性能、可扩展的软件平台，用于协作构建动画 3D 场景，设计目标是满足大规模电影和视觉特效制作的需求。</p>
<p class="en"><span class="fa fa-caret-right"></span> USD is a high-performance extensible software platform for collaboratively constructing animated 3D scenes, designed to meet the needs of large-scale film and visual effects production.</p>
</div>
<div class="bilingual-brief">
<p class="zh"><span class="fa fa-caret-right"></span> USD 通过不断扩展的 schema 集合，在数字内容创作工具之间实现稳健互换，覆盖几何、着色、灯光和物理等领域。</p>
<p class="en"><span class="fa fa-caret-right"></span> USD enables robust interchange between digital content creation tools with its expanding set of schemas, covering domains like geometry, shading, lighting, and physics.</p>
</div>
<div class="bilingual-brief">
<p class="zh"><span class="fa fa-caret-right"></span> USD 独特的 composition 能力提供了丰富多样的方式来把资产组合成更大的装配体，并支持多个创作者轻松协同工作。</p>
<p class="en"><span class="fa fa-caret-right"></span> USD's unique composition ability provides rich and varied ways to combine assets into larger assemblies, enables collaborative workflows so that many creators can work together with ease, and more.</p>
</div>
</div>`;

  return html.replace(/<div class="usd-index-brief docutils">[\s\S]*?<\/div>/, brief);
}

function injectScopeNote(html) {
  const marker = `<div itemprop="articleBody">`;
  const note = `${marker}
<div class="cn-repro-scope admonition note">
<p class="admonition-title"><span class="cn-term">本地双语复刻范围</span><span class="en-term">Local bilingual reproduction scope</span></p>
<p class="zh">本页纳入 OpenUSD release 文档入口范围，保留官方英文标题、链接与 Sphinx 结构，并在关键入口处增加中文对应。</p>
<p class="en">This page is included in the OpenUSD release documentation entry scope, preserving official English titles, links, and Sphinx structure while adding Chinese counterparts for key entry points.</p>
<p class="zh">这个 release 首页是全站文档的目录入口。建议先从 Learn 区域理解 USD 的定位、术语和教程，再进入 User Guides 查看集合、颜色、命名空间编辑、渲染、schema、时间采样和变量表达式等专题。</p>
<p class="en">This release home page is the directory entry for the documentation site. Start with Learn for USD positioning, terminology, and tutorials, then use User Guides for collections, color, namespace editing, rendering, schemas, time samples, and variable expressions.</p>
<p class="zh">Reference 区域连接 API Documentation、Toolset、Specifications、Proposals、FAQ 和性能页面；这些页面用于从概念学习转入工程查表、命令行工具、规范细节和设计提案。</p>
<p class="en">The Reference area links API Documentation, Toolset, Specifications, Proposals, FAQ, and performance pages. These entries move readers from conceptual learning into engineering lookup, tools, specifications, and design proposals.</p>
<p class="zh">初学者的阅读顺序可以是 Introduction to USD、Terms and Concepts、Hello World tutorial、Overview and Purpose、Usd core API；这样先建立 scene description、Layer、Stage、Prim、composition arc 和 schema 的整体关系。</p>
<p class="en">A practical beginner order is Introduction to USD, Terms and Concepts, Hello World tutorial, Overview and Purpose, and the Usd core API. This builds the relationship between scene description, Layer, Stage, Prim, composition arcs, and schemas first.</p>
<p class="zh">本地页面会优先把已发现的 OpenUSD 内部 HTML 链接路由到本地双语页面。未纳入当前 406 页清单的内部链接会进入本地缺口提示页，避免用户无提示跳回官方英文站。</p>
<p class="en">The local page routes discovered OpenUSD internal HTML links to local bilingual pages first. Internal links outside the current 406-page inventory go to the local coverage-gap page instead of silently leaving for the official English site.</p>
<p class="zh">英文页面名和 API 名称会继续保留，因为它们需要和官方文档、代码符号、搜索结果、C++ 头文件和 Python 包保持一致；中文层负责解释用途、路径和阅读优先级。</p>
<p class="en">English page names and API names remain because they must align with official documentation, code symbols, search results, C++ headers, and Python packages. The Chinese layer explains purpose, routes, and reading priority.</p>
<p class="zh">本页不是单篇教程，而是全量文档的导航面板。看到不熟悉的栏目时，可以先读中文说明判断它属于学习、用户指南、参考资料、协作信息还是新闻发布，再决定是否进入子页面。</p>
<p class="en">This page is not a single tutorial; it is the navigation panel for the full documentation set. When a section is unfamiliar, use the Chinese explanation to decide whether it belongs to learning, user guides, reference material, collaboration information, or release news before entering child pages.</p>
<p class="zh">对工程使用者来说，release 首页的价值在于快速回到正确入口：概念不清回 Learn，API 不清回 Reference，工作流问题回 User Guides，版本和提案问题回 Specifications 或 Proposals。</p>
<p class="en">For engineering use, the release home page is valuable because it returns you to the right entry quickly: use Learn for concepts, Reference for APIs, User Guides for workflow questions, and Specifications or Proposals for version and design questions.</p>
<p class="zh">后续自动化会继续按页面质量分级推进，不再把目录链接已经本地化等同于正文翻译完成；本页本轮先补足入口说明，子页面会继续按五页一组精修。</p>
<p class="en">Later automation will continue by page-quality grade and will not treat localized navigation links as completed body translation. This round strengthens the entry explanation first, while child pages continue to be refined in groups of at most five.</p>
<p class="zh">因此，本页现在承担“中文总入口”和“英文原始目录”两种角色：中文帮助快速判断方向，英文继续作为官方名称和跨文档定位依据。</p>
<p class="en">This page therefore now serves both as a Chinese overview entry and as the retained English source directory: Chinese text helps choose a direction quickly, while English remains the official naming and cross-document reference layer.</p>
</div>`;
  return html.replace(marker, note);
}

function injectReleaseReadingGuide(html) {
  const marker = `</div>\n<section id="learn">`;
  const guide = `</div>
<div class="cn-entry-reading-guide admonition note">
<p class="admonition-title"><span class="cn-term">中文阅读导引</span><span class="en-term">Chinese reading guide</span></p>
<p class="zh">这个 release 首页是全站文档的目录入口：先从 Learn 区域理解 USD 的定位、术语和教程，再进入 User Guides 查看建模、集合、颜色、渲染、schema、时间采样和变量表达式等专题。</p>
<p class="en">This release home page is the directory entry for the documentation site: start with Learn for USD positioning, terms, and tutorials, then move to User Guides for modeling, collections, color, rendering, schemas, time samples, and variable expressions.</p>
<p class="zh">Reference 区域连接到 API Documentation、Toolset、Specifications、Proposals、FAQ 和性能相关页面；这些链接在本地复刻中会优先跳转到已发现的本地 HTML，未纳入清单的 OpenUSD 内部页会进入本地缺口提示页。</p>
<p class="en">The Reference area links to API Documentation, Toolset, Specifications, Proposals, FAQ, and performance pages; in this local reproduction, discovered OpenUSD HTML links route to local files, while out-of-inventory internal pages route to the local coverage-gap page.</p>
<p class="zh">如果你只是初学，推荐顺序是 Introduction to USD、Terms and Concepts、Hello World tutorial、Overview and Purpose、Usd core API；这样可以先建立 scene description、Layer、Stage、Prim、composition arc 和 schema 的整体关系。</p>
<p class="en">For first-time readers, a practical order is Introduction to USD, Terms and Concepts, Hello World tutorial, Overview and Purpose, and the Usd core API, so the relationship between scene description, Layer, Stage, Prim, composition arcs, and schemas becomes clear first.</p>
<p class="zh">本页保留英文页面名，是为了让你和官方文档、代码符号、搜索结果保持一致；中文层只解释用途和阅读路径，不替换 API 名称、文件名或命令。</p>
<p class="en">English page names are retained to stay aligned with the official documentation, code symbols, and search results; the Chinese layer explains purpose and reading order without replacing API names, file names, or commands.</p>
</div>
<section id="learn">`;
  return html.replace(marker, guide);
}

async function writeApiShim() {
  const apiDir = path.join(siteDir, "api");
  await mkdir(apiDir, { recursive: true });
  const shim = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=../index.html">
  <title>Usd API / 本地跳转</title>
</head>
<body>
  <p>本地双语复刻页已放在 <a href="../index.html">../index.html</a>。</p>
  <p>The local bilingual Usd API reproduction is available at <a href="../index.html">../index.html</a>.</p>
</body>
</html>
`;
  await writeFile(path.join(apiDir, "index.html"), shim, "utf8");
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated bilingual reproduction from source/openusd_release_index_source.html. Source URL: https://openusd.org/release/index.html -->\n${html}`;
html = html.replace('<html class="writer-html5" lang="en" data-content_root="./">', '<html class="writer-html5" lang="zh-CN" data-content_root="./">');
html = html.replace(
  "<title>USD Home &mdash; Universal Scene Description 26.05 documentation</title>",
  "<title>USD 首页 / USD Home &mdash; Universal Scene Description 26.05 documentation</title>",
);
html = html.replace(
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />',
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />\n      <link rel="stylesheet" type="text/css" href="openusd_release_cn.css" />',
);
html = html.replace('placeholder="Search docs" aria-label="Search docs"', 'placeholder="搜索文档 / Search docs" aria-label="Search docs"');
html = html.replaceAll("https://openusd.org/images/USDIcon.ico", "images/USDIcon.ico");
html = html.replaceAll("https://openusd.org/images/USDLogoUnsized.svg", "images/USDLogoUnsized.svg");
html = html.replaceAll("https://openusd.org/images/piper-banner.jpg", "images/piper-banner.jpg");
html = replaceIndexBrief(html);
html = injectScopeNote(html);
html = applyTextPairs(html);
html = applyNestedPairs(html);
html = html.replace(
  "</footer>",
  '<p class="cn-footer-note">中文双语复刻层：本地学习用途，官方英文链接保留。 / Bilingual layer for local study; official English links are preserved.</p>\n</footer>',
);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");
if (existsSync(path.join(siteDir, "index.html"))) {
  await writeApiShim();
}

console.log(JSON.stringify({
  output: outputPath,
  apiShim: path.join(siteDir, "api", "index.html"),
  translatedTermCount: terms.size,
}, null, 2));
