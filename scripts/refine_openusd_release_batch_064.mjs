import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-064";

const refinements = [
  {
    output: "full_site/release/maxperf.html",
    title: "Maximizing USD Performance",
    notes: [
      "`Maximizing USD Performance` 是面向生产级 USD 数据集的性能实践页，核心目标是降低读取、预览和 introspection 的延迟，而不是讲解单个 API 的语义。",
      "官方摘录强调 Pixar 在电影制作管线中依赖 USD 访问 production-scale 3D datasets；因此本页建议多围绕 asset structure、file format 和 payload 组织方式来理解。",
      "`Use an allocator optimized for multithreading` 是构建层面的建议，说明内存分配器可能造成显著性能差异；这类优化不改变 USD 文件语义，但会影响运行时吞吐。",
      "`Use binary \".usd\" files for geometry and shading caches` 和 `Package assets with payloads` 分别强调二进制缓存与 payload 组织，对大几何、材质缓存和可延迟加载资产尤其重要。",
      "`What makes a USD scene heavy/expensive?` 用来定位重场景来源，例如层结构、composition、payload、geometry cache 和 shading cache；阅读时应结合 `Performance Metrics` 页面核对具体资产指标。"
    ],
    terms: [
      ["Performance Considerations", "性能注意事项"],
      ["low-latency access", "低延迟访问"],
      ["production-scale 3D datasets", "生产级 3D 数据集"],
      ["allocator", "内存分配器"],
      ["binary .usd files", "二进制 .usd 文件"],
      ["payloads", "payload 资产组织"]
    ]
  },
  {
    output: "full_site/release/plugins_renderman.html",
    title: "RenderMan USD Imaging Plugin",
    notes: [
      "`RenderMan USD Imaging Plugin` 介绍 `hdPrman`，它是 USD Imaging/Hydra 侧使用 RenderMan renderer 的插件入口，不是 RenderMan 本身的完整用户手册。",
      "官方摘录说明 `hdPrman` 不会随 USD 默认构建；构建它需要安装 RenderMan 25.0 或更新版本，并通常通过 `build_usd.py` 配置相关 build options。",
      "`Configuration`、`Building hdPrman` 和 `Running hdPrman` 分别对应环境配置、构建过程和运行方式；阅读时应保留 `hdPrman`、`build_usd.py`、RenderMan 版本号和命令原样。",
      "`Developer` 与 `Supported Render Pass AOVs` 面向开发者和渲染通道输出支持情况，适合需要调试 Hydra render delegate 或 AOV 管线的人继续深入。",
      "本页的边界是 RenderMan USD Imaging plugin：它连接 USD Imaging 与 RenderMan，不应混同于通用 Hydra 文档、RenderMan shading 文档或 `UsdRender` schema 参考。"
    ],
    terms: [
      ["hdPrman", "RenderMan 的 Hydra/USD Imaging 插件"],
      ["USD Imaging", "USD 成像层"],
      ["Hydra", "Hydra 渲染架构"],
      ["RenderMan renderer", "RenderMan 渲染器"],
      ["build_usd.py", "USD 构建脚本"],
      ["AOVs", "任意输出变量"]
    ]
  },
  {
    output: "full_site/release/plugins.html",
    title: "USD Third-Party Plugins",
    notes: [
      "`USD Third-Party Plugins` 是第三方插件入口页，说明 USD 允许开发者把外部库接入系统的不同部分，而不是列出全部官方内置模块。",
      "官方摘录提到 Hydra rendering architecture 可让 custom 和 third-party renderers 通过 render delegate 插入，从而让使用 USD Imaging 的应用选择对应渲染器。",
      "第三方 file format plugin 可以把外部文件格式映射成 USD representations，使这些文件能像 layer 一样被 USD 使用；这类插件重点在 I/O 与 layer 表达。",
      "阅读时应区分 Hydra render delegate、file format plugin、schema plugin 和一般工具插件；它们都叫 plugin，但接入点、生命周期和数据边界不同。",
      "本页复刻保留供应商、studio、plugin 名称和外部链接原样；这些链接可能指向清单外资源，应按既定本地路由策略处理，不做无选择镜像。"
    ],
    terms: [
      ["Third-Party Plugins", "第三方插件"],
      ["Hydra render delegate", "Hydra 渲染委托"],
      ["USD Imaging", "USD 成像层"],
      ["file format plugin", "文件格式插件"],
      ["USD representations", "USD 表达"],
      ["layers", "图层"]
    ]
  },
  {
    output: "full_site/release/press_opensource_announce.html",
    title: "Open Source Announcement",
    notes: [
      "`Open Source Announcement` 是 2015 年 8 月 10 日的开源意向公告页，记录 Pixar 宣布计划在 2016 年夏季把 USD 作为 open-source project 发布。",
      "官方摘录强调 USD 解决 CG film 与 game industries 中描述、组装、交换和修改 high-complexity virtual scenes 的需求；这是理解 USD 开源动机的关键上下文。",
      "公告将 USD 的技术源流追溯到 Pixar 近 20 年的 scene graph composition、non-destructive editing、file-referencing、layered overrides、variation 和 inheritance 实践。",
      "`Groundbreaking Software Enables Dramatically Increased Efficiency Across Workflows` 是新闻副标题，强调跨工作流效率，而不是某个单一 API 功能。",
      "本页属于 press 文档，阅读时应把日期、地点 `EMERYVILLE, California`、公司名、新闻标题和引用文字作为历史材料保留，不把新闻稿改写成当前技术规范。"
    ],
    terms: [
      ["Open Source Announcement", "开源公告"],
      ["open-source project", "开源项目"],
      ["scene graph", "场景图"],
      ["non-destructive editing", "非破坏性编辑"],
      ["layered overrides", "分层覆盖"],
      ["variation and inheritance", "变体与继承"]
    ]
  },
  {
    output: "full_site/release/press_opensource_release.html",
    title: "Open Source Release",
    notes: [
      "`Open Source Release` 是 2016 年 7 月 26 日的正式开源发布新闻页，记录 Pixar open source release Universal Scene Description 的时间点和行业定位。",
      "官方摘录说明 USD 用于通过 various digital content creation (DCC) tools 交换 3D graphics data，并为 CG film 和 game industry studios 的复杂工作流提供 scalable solution。",
      "新闻中引用 Ed Catmull 和 Guido Quaroni 的表述，强调开放技术、共享行业基础设施，以及把多年工程投入用于 collaborative production workflows。",
      "本页和 `Open Source Announcement` 的区别是：announcement 说明计划和意向，release 说明正式发布和初始开放开发流程；两页都应保留日期和新闻文本边界。",
      "作为新闻稿页面，它不是安装指南或 API 手册；本地中文导读只补充背景、术语和阅读路径，官方标题、引用、公司名、人物名和外部链接保持原样。"
    ],
    terms: [
      ["Open Source Release", "开源发布"],
      ["Universal Scene Description", "通用场景描述"],
      ["DCC tools", "数字内容创作工具"],
      ["scalable solution", "可扩展解决方案"],
      ["collaborative production workflows", "协作式生产工作流"],
      ["development process", "开发流程"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的页面用途、阅读路径、结构边界和术语对照；英文页面名、API 名称、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于逐项核对官方原页。</p>
      <p class="en">This section adds Chinese-first page purpose, reading path, structure boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
