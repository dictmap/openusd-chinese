import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-066";

const refinements = [
  {
    output: "full_site/release/spec_usdpreviewsurface.html",
    title: "UsdPreviewSurface Specification",
    notes: [
      "`UsdPreviewSurface Specification` 是预览材质规范页，目标是在 film 与 game pipelines 之间提供一个可互换、可由 USD/Hydra 随附生产渲染器原生支持的基础材质节点集合。",
      "`Goal` 与 `Core Nodes` 是阅读主线：先理解 preview material 的互换定位，再看 `Preview Surface`、`Texture Reader`、`Primvar Reader` 和 `Transform2d` 如何组成可移植材质网络。",
      "`Preview Surface` 关注 metallic/specular workflow、roughness、opacity、normal 等通用材质输入；这些输入名属于规范字段，应保留英文原样，中文只解释视觉语义和互换边界。",
      "`Texture Coordinate Orientation in USD` 与 `Roughness vs Glossiness` 是跨工具差异的关键说明；阅读时要把坐标方向、粗糙度/光泽度转换视为资产交换规则，而不是单个渲染器实现细节。",
      "`Changes, by Version` 记录规范演进，尤其 `Version 2.6 - Current Head`；如果实现或工具链依赖特定输入类型，应同时核对当前版本与历史版本差异。"
    ],
    terms: [
      ["UsdPreviewSurface Specification", "UsdPreviewSurface 规范"],
      ["preview material", "预览材质"],
      ["Core Nodes", "核心节点"],
      ["Preview Surface", "预览表面节点"],
      ["Texture Reader", "纹理读取节点"],
      ["Primvar Reader", "primvar 读取节点"]
    ]
  },
  {
    output: "full_site/release/spec_usdz.html",
    title: "Usdz File Format Specification",
    notes: [
      "`Usdz File Format Specification` 定义 `.usdz` 包装格式的目的、zip 约束、布局、允许文件类型、USD 约束、可编辑性、可访问性、MIME type 和工具链入口。",
      "`Foundation` 与 `Zip Constraints` 是本页的技术底座：`.usdz` 依托 zip archive，但对压缩、对齐、文件顺序和可流式读取提出额外约束，不能等同于普通 zip 包。",
      "`Layout` 和 `File Types` 说明包内资源组织和允许封装的文件类别；文件扩展名、MIME type、`FileFormat plugin`、`usdzip` 等名称应保持英文原样。",
      "`Packaging Considerations for Streaming and Encapsulation` 强调为了 streaming 与 reproducible results，需要考虑包内文件排序和 anchored asset paths；这影响移动端、AR 和封装分发场景。",
      "`Toolset` 说明可使用的工具入口，适合与 `usdzip`、`SdfLayer::SetDocumentation` 和图像文件格式说明一起读；本页是格式规范，不是一般资产打包教程。"
    ],
    terms: [
      ["Usdz File Format Specification", "Usdz 文件格式规范"],
      ["zip archive", "zip 归档包"],
      ["Zip Constraints", "zip 约束"],
      ["anchored asset paths", "锚定资产路径"],
      ["MIME Type", "MIME 类型"],
      ["usdzip", "usdz 打包工具"]
    ]
  },
  {
    output: "full_site/release/tut_end_to_end.html",
    title: "End to End Example",
    notes: [
      "`End to End Example` 用一个极简 pipeline 展示从资产创建到场景组合的端到端 USD 工作流，适合在完成 Hello World、layer 和 variant 基础教程后阅读。",
      "教程文件位于 `USD/extras/usd/tutorials/endToEnd`；`assets`、`models`、`scripts` 等目录名应保持原样，因为它们对应示例工程的真实文件结构。",
      "`Create Assets` 与 `Bootstrap` 展示如何从脚本创建 asset，并逐步组织 geometry、shading variant layer 和输出模型；命令如 `python scripts/create_asset.py Ball --shadingVariantLayer -o models/Ball` 必须原样保留。",
      "本页重点不是解释每个 Python API 的完整签名，而是展示 USD 在一个简化制作流程中如何串起资产、脚本、layer、variant 和最终 stage。",
      "阅读时建议同时打开 `Configure your Environment`，确认命令运行目录、Python 环境和 USD 安装路径；否则示例脚本可能因路径或模块加载失败而无法复现。"
    ],
    terms: [
      ["End to End Example", "端到端示例"],
      ["pipeline", "制作管线"],
      ["assets", "资产目录"],
      ["scripts", "脚本目录"],
      ["shadingVariantLayer", "着色变体图层"],
      ["stage", "USD 场景舞台"]
    ]
  },
  {
    output: "full_site/release/tut_generating_new_schema.html",
    title: "Generating New Schema Classes",
    notes: [
      "`Generating New Schema Classes` 讲解如何从 `schema.usda` 生成新的 USD schema C++ 类，是 schema 开发者和插件作者需要重点阅读的教程页。",
      "`What is a Schema Class?` 与 `Types of Schema Classes` 先解释 schema class 的角色和类型；阅读时应区分 concrete typed schema、API schema、single-apply 与 multiple-apply 的使用边界。",
      "`Schema Generation Prerequisites` 说明 `usdGenSchema` 依赖 `jinja2` 和 `argparse`，并依赖正确的 Python syspath；如果构建时依赖缺失，`usdGenSchema` 不会被安装。",
      "`USD_INSTALL_ROOT`、`-DCMAKE_INSTALL_PREFIX`、`schema.usda`、`libraryName`、`subLayers` 等命令、变量和字段必须保持原样，因为它们直接对应构建和生成流程。",
      "本页中的 usda 片段是 schema authoring contract，不应只当作普通示例文本；中文层解释结构意图，但代码块、注释、类型名和命名空间保持英文原样以便复制核对。"
    ],
    terms: [
      ["Schema Class", "Schema 类"],
      ["usdGenSchema", "schema 代码生成工具"],
      ["schema.usda", "schema 定义文件"],
      ["concrete typed schema", "具名 concrete schema"],
      ["API schema", "API schema"],
      ["USD_INSTALL_ROOT", "USD 安装根目录变量"]
    ]
  },
  {
    output: "full_site/release/tut_houdini_example.html",
    title: "Houdini USD Example Workflow",
    notes: [
      "`Houdini USD Example Workflow` 是历史教程页，官方明确说明该教程不再定期测试，且 Houdini USD plugin 已在 USD 20.05 中移除，现由 Houdini Solaris 的原生 USD 支持取代。",
      "本页仍有价值，因为它展示了在 USD-centric pipeline 中使用 Houdini author overrides、查看 USD scene 和运行 `usdview` 的历史工作流。",
      "命令 `$ usdview USD/extras/usd/tutorials/Houdini/shot.usda` 应保持原样；中文说明只解释它用于打开示例 shot，而不暗示旧 Houdini plugin 仍随当前 USD 发布。",
      "`Authoring USD Overrides in Houdini` 与 `View the USD Scene` 的边界是历史参考：如果用户使用现代 Houdini，应优先查 Houdini Solaris 与 SideFX 官方 USD 文档。",
      "本地复刻保留该页是为了完整覆盖 release 文档和历史教程索引；状态仍标为 draft，避免用户误以为它是当前推荐的 Houdini 集成方式。"
    ],
    terms: [
      ["Houdini USD Example Workflow", "Houdini USD 示例工作流"],
      ["historical tutorial", "历史教程"],
      ["Houdini USD plugin", "Houdini USD 插件"],
      ["Houdini Solaris", "Houdini Solaris"],
      ["USD-centric pipeline", "以 USD 为中心的管线"],
      ["usdview", "USD 场景查看器"]
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
