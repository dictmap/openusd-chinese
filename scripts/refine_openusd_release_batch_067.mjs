import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-067";

const refinements = [
  {
    output: "full_site/release/tut_usd_tutorials.html",
    title: "USD Tutorials",
    notes: [
      "`USD Tutorials` 是 release 教程总入口，用来把 Hello World、layers、variants、xforms、shading、end-to-end、Houdini、schema generation 和 usdview plugin 等教程组织成学习路线。",
      "`Environment Setup` 是本页最重要的准备章节：教程大量使用 USD 的 Python bindings 和 USD Toolset 中相互依赖的程序，因此必须先配置正确的环境变量。",
      "官方原文提醒使用与构建 USD 时相匹配的 Python interpreter，并指出 Python 2.x 不受支持；`python`、`PYTHONPATH`、`PATH`、`USD Toolset` 等命令和环境变量名必须保持英文原样。",
      "每个教程都标明测试过的 USD 版本，这些版本对应 GitHub releases；阅读时不要把旧教程结果直接等同于当前版本行为，尤其是 Houdini 历史教程和插件类教程。",
      "本页适合当作学习索引：先完成 Hello World 与属性/引用/layer 教程，再进入 variants、xforms、shading、schema 生成和 usdview 插件等进阶主题。"
    ],
    terms: [
      ["USD Tutorials", "USD 教程"],
      ["Environment Setup", "环境设置"],
      ["Python bindings", "Python 绑定"],
      ["USD Toolset", "USD 工具集"],
      ["Github releases", "GitHub 发布版本"],
      ["Advanced Build Configuration", "高级构建配置"]
    ]
  },
  {
    output: "full_site/release/tut_usdview_plugin.html",
    title: "Creating a Usdview Plugin",
    notes: [
      "`Creating a Usdview Plugin` 教程演示如何为 `usdview` 创建新的 Python plugin，并通过 usdview API 扩展查看器行为。",
      "`Setting Up a PluginContainer` 是起点：需要创建一个插件目录，并把它放在 USD 构建会搜索插件的位置；目录名、`PluginContainer` 和 `tutorialPlugin` 等标识保持英文原样。",
      "命令 `mkdir -p <some path>/usdviewPlugins/tutorialPlugin/` 说明的是示例目录结构；中文层只解释占位符和目的，不改写 shell 命令。",
      "本教程面向想扩展 `usdview` 的开发者，而不是普通查看 USD 文件的用户；如果只是查看 stage，应先使用 `usdview` 基础命令和 `Configure your Environment`。",
      "阅读时要区分 plugin discovery、Python package layout、usdview API 和 UI action 注册；这些层次分别影响插件能否被发现、导入、调用和显示在界面中。"
    ],
    terms: [
      ["Usdview Plugin", "Usdview 插件"],
      ["usdview API", "usdview API"],
      ["PluginContainer", "插件容器"],
      ["tutorialPlugin", "教程插件目录"],
      ["plugin discovery", "插件发现"],
      ["Python plugin", "Python 插件"]
    ]
  },
  {
    output: "full_site/release/user_guides/color_user_guide.html",
    title: "Color User's Guide",
    notes: [
      "`Color User's Guide` 说明 OpenUSD 中 color 与 color spaces 的使用方式，覆盖场景数据里的颜色空间信息、互操作颜色空间集合、自定义颜色空间和工具/渲染器接口。",
      "`Working With Color in OpenUSD` 是阅读主线：先理解 OpenUSD 如何指定 color space information，再看 canonical interoperable color spaces 与 custom color spaces 的关系。",
      "本页同时面向内容作者、工具配置者和渲染器开发者；开发者还应结合 `Color Programmer's Guide`，理解如何把 OpenUSD color features 集成到 renderer 或 tool。",
      "`renderingColorSpace`、`UsdRender schemas`、`MaterialX`、`OCIO` 等名称应保持英文原样，因为它们对应 USD schema、外部标准或配置系统。",
      "阅读时要区分色彩科学概念和 OpenUSD 实现细节：前者解释颜色空间、变换和显示语义，后者决定属性、schema、接口和渲染配置如何表达这些语义。"
    ],
    terms: [
      ["Color User's Guide", "Color 用户指南"],
      ["color spaces", "颜色空间"],
      ["canonical interoperable color spaces", "规范互操作颜色空间"],
      ["custom color spaces", "自定义颜色空间"],
      ["renderingColorSpace", "渲染颜色空间属性"],
      ["OCIO", "OpenColorIO"]
    ]
  },
  {
    output: "full_site/release/user_guides/primvars.html",
    title: "Primvars",
    notes: [
      "`Primvars` 说明 primvar 这种特殊 attribute 如何在 geometric prim 的 surface/volume 上插值，用于向 shader/material 传递 per-primitive overrides 或任意随表面/体变化的信号。",
      "`Primvar Interpolation Modes` 是本页核心：USD 支持五种 primvar interpolation modes，后续各节通过 Mesh Gprim、两个 quads 和 `primvars:displayColor` 示例帮助可视化差异。",
      "`constant`、`uniform`、`vertex`、`varying`、`faceVarying` 等插值模式名必须保留英文原样；中文解释应关注它们分别在 prim、face、point、surface sample 或 face-vertex 层级上的取值语义。",
      "代码摘录里的 `primvars:displayColor`、`interpolation = \"constant\"`、`xformOp:translate` 和 `xformOpOrder` 是可核对的 USD 语法，不能改写为中文。",
      "本页适合与 rendering、shading、texture coordinates 和 Hydra/Storm 可视化一起读；primvar 不是普通 metadata，它直接影响材质、渲染和几何信号解释。"
    ],
    terms: [
      ["Primvar", "Primvar 变量"],
      ["attribute", "属性"],
      ["interpolation", "插值"],
      ["per-primitive overrides", "逐 primitive 覆盖"],
      ["displayColor", "显示颜色 primvar"],
      ["faceVarying", "逐 face-vertex 插值模式"]
    ]
  },
  {
    output: "full_site/release/user_guides/render_user_guide.html",
    title: "Rendering with USD",
    notes: [
      "`Rendering with USD` 汇总 USD 为生成正确且可复现 render 提供的约定和规则，适合用来配置资产、stage、坐标系、法线、灯光过滤和最终帧/交互式渲染工作流。",
      "`Configuring Imageable Content` 是阅读入口，说明如何把可渲染内容配置为符合 USD 渲染约定；`Configuring the Stage Coordinate System` 通过 `upAxis = \"Z\"` 展示 stage 坐标系设置。",
      "本页区分 interactive renders 与 final frame renders：有些规则只对某一类用例更重要，但坐标系、法线、visibility、purpose 和 material/shader 相关约定通常影响所有渲染路径。",
      "`Understanding Intrinsic and Explicit Normals` 与 `Using Light-linking to Filter Objects Affected by Lights` 是重要延伸主题；英文小节名保留原样，便于和官方链接和渲染器文档对应。",
      "`UsdGeom`、`upAxis`、`Light-linking`、`Imageable` 等术语与 schema/API 直接相关，中文层解释用途和边界，但不替换属性名或 schema 名称。"
    ],
    terms: [
      ["Rendering with USD", "使用 USD 渲染"],
      ["Imageable", "可成像对象"],
      ["upAxis", "上轴设置"],
      ["interactive renders", "交互式渲染"],
      ["final frame renders", "最终帧渲染"],
      ["Light-linking", "灯光链接过滤"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的页面用途、阅读边界、关键概念和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first page purpose, reading boundaries, key concepts, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
