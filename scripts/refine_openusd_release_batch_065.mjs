import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-065";

const refinements = [
  {
    output: "full_site/release/usd_products.html",
    title: "Products Using USD",
    notes: [
      "`Products Using USD` 是 OpenUSD 生态采用情况入口页，按厂商、产品和工具链列出支持 USD 的 3D 内容创作应用、渲染器、平台和相关生态组件。",
      "官方原文明确说明该列表由社区维护，不是完整资源清单，也不代表 Pixar 或 OpenUSD 对外部材料背书；因此阅读时应把它当作生态导航，而不是兼容性认证表。",
      "页面中的 `3Delight`、`Adobe`、`Autodesk`、`Blender` 等厂商名，以及 `Substance 3D Painter`、`Maya`、`Cycles` 等产品名都应保持英文原样，便于和官方页面、外部产品文档及搜索结果对应。",
      "本页适合用来判断 USD 在 DCC、渲染、AR、建模、地理空间和实时工作流中的覆盖面；具体安装步骤、版本限制和导入导出细节仍应跳转到各产品自己的文档核对。",
      "本地复刻会把 406 清单内的 OpenUSD 内部 HTML 链接路由到本地页面；列表里的第三方外部链接属于清单外资源，只保留为外部参考，不做未经选择的镜像。"
    ],
    terms: [
      ["Products Using USD", "使用 USD 的产品"],
      ["3D Content Creation Applications", "3D 内容创作应用"],
      ["Ecosystems", "生态系统"],
      ["community maintained", "由社区维护"],
      ["not exhaustive", "并非详尽清单"],
      ["endorsement", "背书或认可"]
    ]
  },
  {
    output: "full_site/release/usdfaq.html",
    title: "USD Frequently Asked Questions",
    notes: [
      "`USD Frequently Asked Questions` 是常见问题快速入口，用问答形式解释 USD 的定位、语言支持、文件格式、字符编码、格式转换和常见使用疑问。",
      "`What is USD and why should I use it?` 应与 `Overview and Purpose` 一起读：FAQ 给出短答案，概念页和教程页负责展开 USD 如何组织 scene description、layers、composition arcs 和 stage。",
      "`Isn't USD just another file format?` 的重点是澄清 USD 不只是 `.usd/.usda/.usdc` 文件格式，而是一套场景描述、组合、访问 API 和工具生态；不要把 FAQ 中的短句当成完整架构说明。",
      "涉及命令的条目，例如 `usdcat file.usd --out file.usd --usdFormat usda`，命令、参数、扩展名和大小写必须保持原样；中文说明只解释用途和适用边界。",
      "本页适合初学者先定位问题，再跳到教程、API 文档或规范页；如果问题涉及版本行为、插件支持或构建选项，应继续核对对应 release/API 页面。"
    ],
    terms: [
      ["Frequently Asked Questions", "常见问题"],
      ["file format", "文件格式"],
      ["scene description", "场景描述"],
      ["composition arcs", "组合弧"],
      ["usdcat", "USD 文件转换/查看命令"],
      ["character encoding", "字符编码"]
    ]
  },
  {
    output: "full_site/release/release_schedule.html",
    title: "Release Schedule",
    notes: [
      "`Release Schedule` 说明 Pixar 发布 OpenUSD 的节奏，包括 dev releases、full releases 和 release candidates 各自面向的测试、发布和文档渠道。",
      "官方摘录中的 `approximately weekly`、`approximately quarterly` 和 `approximately a week prior` 表示发布节奏而不是强制日历承诺；实际版本仍应以 GitHub 分支、release 页面和对应文档版本为准。",
      "`dev branch` 与 `release branch` 是阅读本页的关键边界：dev release 面向持续开发和更快反馈，full release 面向更稳定的季度发布，二者对应的文档 URL 也不同。",
      "`release candidate` 用于正式 full release 前的早期测试；如果发现 show-stopping bugs，可能出现额外候选版本，因此不要把第一个 candidate 当成最终发布。",
      "本页是发布流程说明，不是 changelog 或安装指南；需要查具体版本变更时，应继续查看 release notes、GitHub release、源码分支或对应 API 文档。"
    ],
    terms: [
      ["Release Schedule", "发布时间表"],
      ["dev releases", "开发版发布"],
      ["full releases", "正式完整发布"],
      ["release candidates", "候选发布版"],
      ["dev branch", "开发分支"],
      ["release branch", "发布分支"]
    ]
  },
  {
    output: "full_site/release/ref_performance_metrics.html",
    title: "Performance Metrics",
    notes: [
      "`Performance Metrics` 记录 USD release 生成性能指标的基准资产、硬件/软件环境、采集指标和本地复现实验方式，应与 `Maximizing USD Performance` 分开阅读。",
      "`What We Measure` 说明性能脚本采集的项目，例如加载和配置 `usdview` 插件、打开 stage、遍历 prim、渲染或查看相关指标；中文层只解释指标含义，不改写原始 metric 名称。",
      "`What Environment Is Used` 对 Linux、macOS、Windows 和 USD Build 做环境说明；这些配置会影响数值，因此比较性能结果时必须同时比较平台、构建选项和资产集合。",
      "`Metrics` 下的 `Standard Shader Ball`、`Kitchen Set`、`ALab`、`Moore Lane` 是被测资产或图表入口，资产名和平台图表标签必须原样保留，避免破坏可核对性。",
      "`Running Performance Metrics Locally` 与 `Adding Custom Metrics` 面向需要复现或扩展指标的人；本页不是性能优化建议列表，而是衡量和复现实验结果的说明。"
    ],
    terms: [
      ["Performance Metrics", "性能指标"],
      ["metrics", "指标"],
      ["hardware and software configurations", "硬件与软件配置"],
      ["USD Build", "USD 构建配置"],
      ["Standard Shader Ball", "标准 Shader Ball 资产"],
      ["custom metrics", "自定义指标"]
    ]
  },
  {
    output: "full_site/release/plugins_alembic.html",
    title: "Alembic USD Plugin",
    notes: [
      "`Alembic USD Plugin` 说明 `usdAbc` 如何把 Alembic 数据接入 USD 文件格式插件体系；它的重点是互操作和文件格式映射，不是 Alembic 或 USD 的完整入门教程。",
      "官方原文强调该插件默认不构建，必须在 CMake 中指定 `PXR_BUILD_ALEMBIC_PLUGIN`；中文说明保留该选项原样，并提醒用户结合自己的 USD 构建配置确认插件是否存在。",
      "`Known Limitations` 用来界定 Alembic 与 USD 表达能力之间的差异，例如有些 USD 特性无法无损映射到 Alembic；阅读时要把限制视为数据互换边界，而不是普通错误。",
      "`Advanced Build Configuration` 与插件构建、依赖路径和版本组合有关；命令、CMake 变量、文件扩展名 `.abc/.usda/.usdc` 和插件名必须保持英文原样。",
      "本页和 `USD Third-Party Plugins` 的关系是：后者解释第三方插件生态，本页给出一个具体 file format plugin 示例；如果目标是渲染插件，应转到 `hdPrman` 或 Hydra 相关页面。"
    ],
    terms: [
      ["Alembic USD Plugin", "Alembic USD 插件"],
      ["usdAbc", "Alembic 文件格式插件"],
      ["file format plugin", "文件格式插件"],
      ["PXR_BUILD_ALEMBIC_PLUGIN", "Alembic 插件构建开关"],
      ["Known Limitations", "已知限制"],
      ["Advanced Build Configuration", "高级构建配置"]
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
