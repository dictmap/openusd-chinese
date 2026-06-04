import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_release_intro_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "intro.html");

const terms = new Map([
  ["Universal Scene Description", "通用场景描述"],
  ["USD Home", "USD 首页"],
  ["Introduction to USD", "USD 介绍"],
  ["Introduction to OpenExec", "OpenExec 介绍"],
  ["What is USD?", "什么是 USD？"],
  ["Why use USD?", "为什么使用 USD？"],
  ["What can USD do?", "USD 能做什么？"],
  ["USD can represent:", "USD 可以表示："],
  ["USD can compose and override:", "USD 可以组合与覆盖："],
  ["USD/Hydra can image:", "USD/Hydra 可以成像："],
  ["USD can be extended/customized:", "USD 可以扩展/定制："],
  ["What can’t USD do?", "USD 不能做什么？"],
  ["What can鈥檛 USD do?", "USD 不能做什么？"],
  ["No GUIDS", "没有 GUIDS"],
  ["Not a rigging system", "不是绑定系统"],
  ["Heritage of USD at Pixar", "USD 在 Pixar 的传承"],
  ["See also", "另请参阅"],
  ["Previous", "上一页"],
  ["Next", "下一页"],
  ["Learn", "学习"],
  ["User Guides", "用户指南"],
  ["Reference", "参考"],
  ["Terms and Concepts", "术语与概念"],
  ["Tutorials", "教程"],
  ["Downloads and Videos", "下载与视频"],
  ["Products Using USD", "使用 USD 的产品"],
  ["API Documentation", "API 文档"],
  ["Toolset", "工具集"],
  ["Specifications", "规范"],
  ["Proposals", "提案"],
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function htmlPair(en) {
  const zh = terms.get(en);
  if (!zh) return en;
  return `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>`;
}

function titlePair(en) {
  const zh = terms.get(en);
  return zh ? `${zh} / ${en}` : en;
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

function injectIntroScopeNote(html) {
  const marker = `<div itemprop="articleBody">`;
  const note = `${marker}
<div class="cn-repro-scope admonition note">
<p class="admonition-title"><span class="cn-term">相邻入口页双语覆盖</span><span class="en-term">Adjacent entry bilingual overlay</span></p>
<p class="zh">本页是 release 首页的第一相邻入口。当前保留官方英文正文和链接结构，并为主要章节、核心段落和关键列表项补充中文在前的阅读层。</p>
<p class="en">This page is the first adjacent entry from the release home page. It preserves the official English body and link structure while adding a Chinese-first reading layer for major sections, core paragraphs, and key list items.</p>
</div>`;
  return html.replace(marker, note);
}

function zhParagraph(text) {
  return `<p class="zh cn-body-translation">${text}</p>`;
}

function zhListParagraph(text) {
  return `<p class="zh cn-body-translation">${text}</p>`;
}

function insertBeforeParagraph(html, needle, zhHtml) {
  const escaped = escapeRegex(needle);
  const pattern = new RegExp(`(<p>(?:(?!<\\/p>)[\\s\\S])*?${escaped}(?:(?!<\\/p>)[\\s\\S])*?<\\/p>)`);
  return html.replace(pattern, `${zhHtml}\n$1`);
}

function insertAfterHeading(html, sectionId, zhText) {
  const pattern = new RegExp(`(<section id="${escapeRegex(sectionId)}">\\s*<h[23][\\s\\S]*?<\\/h[23]>)`);
  return html.replace(pattern, `$1\n${zhParagraph(zhText)}`);
}

function injectIntroBodyTranslations(html) {
  const paragraphTranslations = [
    [
      "Pipelines capable of producing computer graphics films and games typically",
      "能够制作计算机图形电影和游戏的生产管线，通常会生成、存储并传递大量 3D 数据，OpenUSD 把这类数据称为“场景描述”。不同应用往往有各自封闭的数据形式，而 USD 的目标就是让这些由许多基础资产组合而成的 3D 场景，能够稳定、可扩展地交换、增强和继续组合。"
    ],
    [
      "USD provides for interchange of elemental assets",
      "USD 不只交换单个模型或动画，还能把许多资产组织成虚拟布景、场景、镜头和世界，并允许不同应用通过同一套 API 在同一 scenegraph 上进行非破坏性覆盖。由于核心 scenegraph 与 composition engine 不绑定某个具体领域，USD 也可以扩展到几何、材质、灯光、物理之外的更多数据域。"
    ],
    [
      "Concretely, USD is an",
      "更具体地说，USD 是一个开源项目，官方源码托管在 PixarAnimationStudios/OpenUSD，并按 TOST license 发布。"
    ],
    [
      "USD is the core of Pixar’s 3D graphics pipeline",
      "USD 是 Pixar 3D 图形管线的核心，贯穿建模、动画、渲染等创作与渲染应用，也服务于 Pixar 自有的 Presto 动画系统。下面这些要点说明 Pixar 持续推进 USD 的主要生产动机。"
    ],
    [
      "Like many other interchange packages",
      "和其他交换格式一样，USD 定义了低层数据模型，说明数据在文件格式层面如何编码和组织；但它还通过可扩展的高层 schemas，把 mesh、transform 等概念组织成有意义的 API。更重要的是，USD 的 Composition Arcs 可以自由组合，用于打包、聚合、变体化和覆盖资产，并由 Stage 中的运行时组合引擎解析最终场景描述。"
    ],
    [
      "USD’s most basic composition arc",
      "USD 最基础的组合弧 subLayers 允许多个艺术家在各自 Layer 文件中并行工作，再按 USD 文件中明确记录的强弱顺序合成为同一个资产或场景。它不能自动解决所有拓扑变化带来的问题，但能避免互相覆盖工作，并留下清晰的修改审计线索。"
    ],
    [
      "As in many media",
      "高质量数字艺术依赖快速、频繁的迭代。USD 重点降低等待反馈、跨应用迁移数据和恢复工作会话的延迟；Pixar 持续通过算法优化、多核/GPU 利用和压缩技术来降低远程访问数据的成本。"
    ],
    [
      "If your needs are similar",
      "如果你的生产需求与这些问题相似，或者只是它们的子集，USD 通常就是值得考虑的基础选择。"
    ],
    [
      "USD organizes data into hierarchical namespaces",
      "USD 使用层级命名空间组织 Prims。每个 prim 可以包含子 prim、Attributes 和 Relationships；Attributes 保存带类型且可随时间变化的值，Relationships 指向层级中的其他对象。prim 与 property 还可以带非时间变化的 metadata，并被组织到 Layer 这一文件抽象中。"
    ],
    [
      "Built on top of this low-level",
      "在这个通用场景描述模型之上，USD 提供一组 schemas，为常见 3D 图形概念建立标准编码和客户端 API。下面的 Geometry、Shading、Model and Asset 是最重要的阅读入口。"
    ],
    [
      "The UsdGeom schemas define",
      "UsdGeom schemas 描述几何数据，包括兼容 OpenSubdiv 的 mesh、transform、curve、points、nurbs patches 和若干基础实体；它还定义 primvars、几何范围、包围盒、可见性剪裁以及 Purpose 等几何相关概念。"
    ],
    [
      "The UsdShade schemas define",
      "UsdShade schemas 描述着色网络：shader 节点可以连接成网络并封装成可复用材质，同时通过公开属性接口驱动内部 shader 参数。UsdShade 还定义几何如何绑定到材质，以表达光照响应和部分物理特性。"
    ],
    [
      "USD’s composition operators allow you to construct",
      "USD 的 composition operators 可以构造任意规模和复杂度的场景。Model 与 Asset 概念用于帮助遍历、分析、分解和缓存大型 scenegraph：Model 帮助把场景划分为可管理块，Asset 则在文件引用和可复用资产组织两个层面发挥作用。"
    ],
    [
      "The following is a very compact description",
      "下面是 USD 组合语义的极简说明；每个术语都保留官方英文，便于继续跳转到更详细的概念页。"
    ],
    [
      "You can “stack” USD layers",
      "可以通过 subLayers composition arc 把多个 USD layers 叠放在一起，composition engine 会按有序、可嵌套的 LayerStacks 解析其中的数据，类似图像软件中的图层合成。"
    ],
    [
      "Any prim in a layer can also contain one or more",
      "任意 prim 可以通过 references composition arcs 引用另一个 layer 中的 prim，把目标 prim 下面的树组合进当前 prim，这是把基础资产装配成聚合资产和完整场景的主要方式。payload arc 则是可延迟加载的 reference，便于按任务需要控制工作集和内存占用。"
    ],
    [
      "VariantSets allow an asset",
      "VariantSets 允许资产创建者把多个变体打包在同一资产中，下游使用者可以在更强的 layer 中非破坏性切换 variant selector。一个 prim 可以定义多个 VariantSets，从不同轴向表达变化。"
    ],
    [
      "The last two composition arcs",
      "inherits 和 specializes 都在 base prim 与 derived prim 之间建立持久关系，使派生 prim 接收 base prim 上的覆盖。实践上，inherits 常用于批量编辑某类 prim 或资产，specializes 常用于表达始终基于 base 的专门化 refinement。"
    ],
    [
      "The most powerful and unifying aspect",
      "USD 组合语义最强大的地方在于：这些 operators 可以以任意组合应用到任意 prim，组合引擎会以可预测方式解析结果。更强 layer 也能统一覆盖更弱 layer 中的 scene description，而不必关心弱层是通过 subLayer、reference 还是其他方式进入组合的。"
    ],
    [
      "Finally, USD provides a handful",
      "此外，USD 还提供 scenegraph 级能力来扩大可编码数据的类型和规模，其中最突出的是原生 prim Instancing 和 Value Clips：前者紧凑表达大量实例，后者把 timeSamples 分散到多个文件并支持非破坏性重排和重定时。"
    ],
    [
      "Hydra is the imaging framework",
      "Hydra 是随 USD 一起发布的成像框架，用来连接消费场景数据的 scene delegates 与面向具体渲染器的 render delegates。Storm 是主要的光栅化 render delegate，后续支持 Vulkan、Metal 等图形接口；仓库中也包含 Embree 示例路径追踪器和面向 RenderMan 的 HdPrman。"
    ],
    [
      "The USD scene delegate to Hydra",
      "USD 到 Hydra 的 scene delegate 被 usdview 和多数第三方 USD 插件使用，目标是为符合 UsdGeom、UsdShade、UsdVol、UsdSkel、UsdLux 等 schema 的场景提供基准预览、快速成像和动画流式播放。"
    ],
    [
      "Even though USD is primarily used",
      "虽然 USD 经常作为嵌入式子系统使用，但它覆盖的问题空间很大，因此必须能沿多个方向扩展。USD 自带插件发现机制，并通过 Asset Resolution、File Formats、Schemas 等插件点接入定制能力。"
    ],
    [
      "In a highly-referenced scene",
      "在大量引用的场景中，把 USD 文件记录的 asset path 与最终加载用的 resolved locator/identifier 分离很有价值。ArResolver 可以按安装或插件包定制，用于解析站点命名规范、动态版本控制或传统文件系统搜索路径。"
    ],
    [
      "However, the Ar system allows",
      "Ar 系统也允许多个按 URI 协议分派的 resolver 共存，把资产路径解析为 ArAsset；这些 ArAsset 可以直接从云端或数据库流式读取，甚至在内存中程序化构造资产。"
    ],
    [
      "A USD Layer can be taught",
      "通过实现 SdfFileFormat 插件，USD Layer 可以由任意兼容文件格式的数据填充。USD 原生 usda、usdc、usdz，以及 Alembic 和 MaterialX 支持，都通过这种机制接入。"
    ],
    [
      "File formats can also be “dynamic”",
      "文件格式也可以是动态的：当它通过 payload arc 被引用进场景时，payload prim 上可修改的 metadata 会传给文件格式插件，插件再重新求值，从而支持一定程度的用户驱动程序化生成。"
    ],
    [
      "USD includes",
      "USD 包含 schema 生成工具，可以从简单的 usda schema 描述生成 C++ 类、Python 绑定和样板代码，用于向管线或包中添加新的 USD prim schema 类型和 API。对于概念上可成像的 typed schemas，还可以教 Hydra 如何显示它们，并通过 OpenExec 注册更好的 schema 计算。"
    ],
    [
      "USD uses a textual",
      "USD 使用文本形式的层级 namespace path 标识数据，因此覆盖关系绑定到定义它们的 prim/property 路径。当被引用资产内部命名空间变化时，上层资产中已有的 overrides 可能失效。GUID 能解决一部分命名空间编辑问题，但也会带来管线复杂度和组合灵活性限制；Pixar 选择接受偶尔的 namespace fix-up，以换取可读、易构建、易聚合的路径标识。"
    ],
    [
      "USD provides a lightweight",
      "USD 提供轻量、优化的 scenegraph，用于创作和高效提取组合后的场景描述；但它倾向于低内存占用、较高延迟的数据访问模式，而高性能 rigging 系统通常需要高内存占用、低延迟访问。"
    ],
    [
      "The OpenExec",
      "OpenExec 计算引擎提供通用计算框架，可用于开发 rigging 系统，但 OpenExec 本身不是 rigging 系统。相关边界应参考 OpenExec 的 “What OpenExec Is Not”。"
    ],
    [
      "Further, the more rigging behaviors",
      "如果把更多 rigging 行为和执行语义加入 USD，跨 DCC 成功交换数据会更难，因为目前不同厂商对这些行为应如何定义并没有广泛一致意见。"
    ],
    [
      "USD and its schema generation tools",
      "USD 与 schema 生成工具适合编码特定应用或定制管线中的 rigging 数据往返，也提供可在 UsdStage 之上构建低延迟缓存的基础设施。但 USD 当前的主目标仍是让几何、着色和灯光数据在 3D 内容创作管线中的 DCC 之间可扩展交换。"
    ],
    [
      "USD is roughly the fourth generation",
      "USD 大致是 Pixar 第四代“组合式场景描述”系统。Toy Story 之后，Pixar R&D 在 Marionette/Menv 动画系统中逐步发展了引用、分层、编辑和变体等概念，这些经验从 A Bug’s Life 开始贯穿后续多部长片。"
    ],
    [
      "By 2004 it was clear",
      "到 2004 年，Marionette 虽然强大，但自然演化形成的来源开始阻碍稳定发展和多核等重要工具利用。Pixar 转向重新设计第二代动画系统 Presto，并把引用、覆盖、变体等操作统一到单一文本格式和单一组合引擎中。"
    ],
    [
      "However, at the same time",
      "与此同时，Pixar 和电影特效行业逐渐从动画/rigging 一直保持 live 到渲染的管线，转向把动画和 rigs 烘焙为高效 pose caches，使灯光、特效和渲染能以更低延迟和内存成本访问点位与 transform 数据。2008-2009 年间，团队开始构建 TidScene。"
    ],
    [
      "The speed, scalability",
      "TidScene pose-cache 的速度、可扩展性和全管线访问很成功，但也让 Pixar 再次面对多个语义、API 和使用位置不同的组合式场景描述系统。2012 年启动的 USD 项目，就是要把 Presto 重新设计后的组合引擎和低层数据模型，与 TidScene 的惰性访问、时间采样数据模型结合起来。"
    ],
    [
      "A key component of the USD project",
      "USD 项目的关键组成部分之一是开发现代、可扩展的渲染架构 Hydra，并最初配套后来称为 Storm 的高性能光栅化渲染器。Hydra 随 USD 发布，因为它显著提升了管线采用 USD 的价值，也为快速场景加载、成像和高效更新提供了参考实现。"
    ]
  ];

  for (const [needle, zh] of paragraphTranslations) {
    html = insertBeforeParagraph(html, needle, zhParagraph(zh));
  }

  const listTranslations = [
    [
      "Provide a rich, common language for defining",
      "提供一种丰富、通用的语言，用于定义、打包、装配和编辑 3D 数据，使多个数字内容创作应用能够共同使用这些数据。"
    ],
    [
      "Allow multiple artists to collaborate",
      "允许多个艺术家在同一资产和场景上协作，同时保留各自工作的独立性和可追踪性。"
    ],
    [
      "Maximize artistic iteration",
      "通过降低延迟来最大化艺术迭代速度，让创作者更快看到足够好的反馈并继续调整。"
    ],
    [
      "Add new prims including entire subtrees",
      "添加新的 prim，包括以该 prim 为根的整个子树。"
    ],
    [
      "Deactivate prims",
      "停用 prim，这是 USD 中非破坏性、可逆的 prim 或子树删除方式。"
    ],
    [
      "Reorder prims",
      "重新排序 prim；在某些上下文中，namespace 顺序本身具有意义。"
    ],
    [
      "Add or remove Variants",
      "向已有 VariantSet 添加或移除 Variants。"
    ],
    [
      "Add or remove entire VariantSets",
      "添加或移除整个 VariantSets，或调整 inherit/specialize 的目标。"
    ],
    [
      "Override the value of schema",
      "覆盖 prim 或 property 上 schema metadata 与用户级 metadata 的值。"
    ],
    [
      "Add new properties",
      "向 prim 添加新的 properties。"
    ],
    [
      "Reorder properties",
      "重新排序 prim 上的 properties；若没有显式排序，properties 会按字典序枚举。"
    ],
    [
      "Override the value of any attribute",
      "覆盖任意 attribute 的值；override 值会阻断所有更弱的 timeSamples 或 splines。"
    ],
    [
      "Block the value of an attribute",
      "阻断 attribute 的值，使其表现为没有 authored value，或在动画阻断时表现为没有 authored animated value。"
    ],
    [
      "Add, remove, and reorder targets",
      "添加、移除和重新排序 relationship 或 attribute connection 的 targets。"
    ],
    [
      "Asset Resolution",
      "资产解析：定制 USD 如何把文件中记录的资产路径解析为最终可加载的数据位置或对象。"
    ],
    [
      "File Formats",
      "文件格式：通过插件让 USD Layer 从兼容的外部格式或动态格式中读取数据。"
    ],
    [
      "Schemas",
      "Schemas：为管线添加新的 prim 类型、API 和可选的 Hydra 成像能力。"
    ]
  ];

  for (const [needle, zh] of listTranslations) {
    html = insertBeforeParagraph(html, needle, zhListParagraph(zh));
  }

  const sectionSummaries = [
    ["what-can-usd-do", "这一节按能力拆解 USD：它能表示哪些数据、如何组合和覆盖、如何通过 Hydra 成像，以及如何通过插件和 schema 扩展。"],
    ["usd-can-represent", "本小节说明 USD 的基础数据模型：Prim 形成层级 namespace，Attributes、Relationships 和 metadata 构成 prim 的可描述内容；在此基础上，UsdGeom、UsdShade、Model/Asset 等 schema 提供常用 3D 图形概念的标准表达。"],
    ["usd-can-compose-and-override", "本小节说明 USD 的组合与覆盖能力：subLayers、references、payloads、VariantSets、inherits 和 specializes 可以统一作用在 prim 上，让强层以可预测方式覆盖弱层。"],
    ["usd-hydra-can-image", "本小节说明 USD 与 Hydra 的成像关系：Hydra 连接 scene delegates 和 render delegates，Storm、Embree 示例后端和 HdPrman 等渲染后端通过它消费 USD 场景数据。"],
    ["usd-can-be-extended-customized", "本小节说明 USD 的扩展点：资产解析、文件格式和 schemas 都可以通过插件或生成工具扩展，以适应站点资产系统、外部文件格式和自定义数据域。"],
    ["what-can-t-usd-do", "这一节说明 USD 的边界：它不是 GUID 驱动的数据库，也不是完整 rigging 执行系统；理解这些边界有助于避免把 USD 用错位置。"]
  ];
  for (const [sectionId, zh] of sectionSummaries) {
    html = insertAfterHeading(html, sectionId, zh);
  }

  return html;
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated adjacent bilingual entry from source/openusd_release_intro_source.html. Source URL: https://openusd.org/release/intro.html -->\n${html}`;
html = html.replace('<html class="writer-html5" lang="en" data-content_root="./">', '<html class="writer-html5" lang="zh-CN" data-content_root="./">');
html = html.replace(
  "<title>Introduction to USD &mdash; Universal Scene Description 26.05 documentation</title>",
  "<title>USD 介绍 / Introduction to USD &mdash; Universal Scene Description 26.05 documentation</title>",
);
html = html.replace(
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />',
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />\n      <link rel="stylesheet" type="text/css" href="openusd_release_cn.css" />',
);
html = html.replace('placeholder="Search docs" aria-label="Search docs"', 'placeholder="搜索文档 / Search docs" aria-label="Search docs"');
html = html.replaceAll("https://openusd.org/images/USDIcon.ico", "images/USDIcon.ico");
html = html.replaceAll("https://openusd.org/images/USDLogoUnsized.svg", "images/USDLogoUnsized.svg");
html = html.replaceAll("https://openusd.org/images/piper-banner.jpg", "images/piper-banner.jpg");
html = html.replaceAll('href="index.html"', 'href="release_index.html"');
html = injectIntroScopeNote(html);
html = applyTextPairs(html);
html = injectIntroBodyTranslations(html);
html = html.replace(
  "</footer>",
  '<p class="cn-footer-note">中文双语复刻层：相邻入口页，本地学习用途，官方英文正文与链接保留。 / Bilingual adjacent-entry layer for local study; official English body and links are preserved.</p>\n</footer>',
);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  output: outputPath,
  translatedTermCount: terms.size,
}, null, 2));
