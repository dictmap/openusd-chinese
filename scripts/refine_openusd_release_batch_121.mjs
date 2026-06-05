import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-121";

const refinements = [
  {
    output: "full_site/release/plugins_renderman.html",
    title: "RenderMan USD Imaging Plugin",
    summary:
      "`RenderMan USD Imaging Plugin` 介绍 `hdPrman`，也就是让 USD Imaging / Hydra 能使用 RenderMan renderer 的 render delegate 插件。阅读本页时，应把它看作 RenderMan 与 Hydra 的集成入口，而不是 RenderMan 渲染器本体或完整 shading 手册。",
    notes: [
      "`hdPrman` 不随 USD 默认构建，官方摘录明确要求安装 RenderMan 25.0 或更新版本；这属于构建前提，不是运行时报错后才检查的事项。",
      "`build_usd.py` 的 build options、RenderMan 版本号和 `hdPrman` 名称必须保持英文原样，因为它们直接对应构建脚本参数和插件名称。",
      "本页的边界是 USD Imaging plugin：它负责把 Hydra 渲染架构连接到 RenderMan，不等同于 `UsdRender` schema、RenderMan RIS/XPU 文档或材质节点参考。",
      "调试时应分层确认 RenderMan 安装、USD 构建选项、插件发现、Hydra render delegate 选择和 usdview/宿主应用的渲染器切换。",
      "本地复刻保留官方链接和英文摘录，方便读者核对当前页面语义；不应把外部 RenderMan 文档镜像进 406 页清单。",
    ],
    terms: [
      ["hdPrman", "RenderMan 的 Hydra render delegate"],
      ["USD Imaging", "USD 成像框架"],
      ["Hydra", "Hydra 渲染架构"],
      ["render delegate", "渲染代理"],
      ["build_usd.py", "USD 构建脚本"],
      ["RenderMan renderer", "RenderMan 渲染器"],
    ],
  },
  {
    output: "full_site/release/press_opensource_announce.html",
    title: "Open Source Announcement",
    summary:
      "`Open Source Announcement` 是 Pixar 在 2015 年 8 月 10 日发布的开源意向公告，说明计划在 2016 年夏季把 USD 作为 open-source project 发布。它是历史背景页，不是当前 API 参考或安装说明。",
    notes: [
      "本页应按历史资料阅读：它解释 USD 开源的动机、计划和时间点，而不是描述当前版本的全部功能状态。",
      "公告中的日期、Pixar、USD 和 open-source project 等名称应保留英文或原始写法，便于和官方原页、新闻引用逐项核对。",
      "读者如果需要当前下载、构建或使用方式，应跳转到 release 文档、GitHub 仓库、Downloads and Videos 或 Getting Started 类页面，而不是只看这篇公告。",
      "本地复刻应明确它与 `press_opensource_release.html` 的关系：一个是开源计划公告，一个是后续开源发布信息。",
      "这类 press 页面可读价值在于项目背景和历史语境；翻译时应避免把计划时态误改成当前承诺。",
    ],
    terms: [
      ["Open Source Announcement", "开源公告"],
      ["Pixar", "Pixar"],
      ["open-source project", "开源项目"],
      ["August 10, 2015", "2015 年 8 月 10 日"],
      ["planned release", "计划发布"],
      ["historical context", "历史背景"],
    ],
  },
  {
    output: "full_site/release/plugins.html",
    title: "USD Third-Party Plugins",
    summary:
      "`USD Third-Party Plugins` 说明 USD 如何通过 plugin 机制把第三方库接入不同系统部分。页面中的 Hydra render delegate、file format plugin、schema plugin 和工具插件都叫 plugin，但接入点、生命周期和数据边界并不相同。",
    notes: [
      "Hydra render delegate plugin 负责让第三方 renderer 接入 USD Imaging；它影响成像和渲染，不负责定义新的 USD 文件格式。",
      "file format plugin 负责把外部文件格式映射为 USD representations，让相关文件可作为 layer 在 USD 中使用。",
      "schema plugin 负责引入新的 schema 类型、API schema 或领域扩展；它和渲染 delegate、文件格式插件的部署和验证路径不同。",
      "阅读插件清单时应区分官方内置模块、Pixar 维护插件和第三方或 studio 自行维护插件；链接有效性和版本兼容性需要按外部项目核对。",
      "本地路由策略只镜像 406 清单内页面，外部插件项目保持外跳或 uncovered 处理；不要为了补全插件生态而新建未在清单中的页面。",
    ],
    terms: [
      ["third-party plugins", "第三方插件"],
      ["Hydra render delegate", "Hydra 渲染代理"],
      ["file format plugin", "文件格式插件"],
      ["schema plugin", "schema 插件"],
      ["USD representations", "USD 表示"],
      ["layer", "层"],
    ],
  },
  {
    output: "full_site/release/dl_downloads.html",
    title: "Downloads and Videos",
    summary:
      "`Downloads and Videos` 是学习资料、演示视频、技术资料和示例资产的导航页。它不是二进制安装镜像页；读者应把它当作 release 文档中的资源索引，用来找到 intro、presentations、SIGGRAPH notes、videos 和 assets。",
    notes: [
      "页面标题里的 Downloads 更偏向资料和素材下载入口，不等同于包管理器、安装器或当前 release binary 下载说明。",
      "视频、slides、SIGGRAPH notes 和 assets 的外部链接可能随时间变化；本地复刻保留链接语义，但不把清单外内容强行镜像成本地页面。",
      "如果读者想学习 USD 概念，应优先从教程和 presentations 进入；如果想获取示例资产，则关注 assets 或 sample data 链接。",
      "本页和 `USD Tutorials` 互补：前者偏资源集合，后者偏循序学习路线；两者都应保留本地内部链接。",
      "记录资源页时要保留原始英文标题、会议名、视频名和资产名，因为这些名称通常用于搜索外部资料。",
    ],
    terms: [
      ["Downloads and Videos", "下载和视频资源"],
      ["presentations", "演示文稿"],
      ["SIGGRAPH notes", "SIGGRAPH 课程资料"],
      ["assets", "示例资产"],
      ["videos", "视频"],
      ["resource index", "资源索引"],
    ],
  },
  {
    output: "full_site/release/maxperf.html",
    title: "Maximizing USD Performance",
    summary:
      "`Maximizing USD Performance` 面向生产级 USD 场景的性能实践。它关注读取、组合、预览、introspection 和大型资产交互的成本，帮助读者理解什么会让 USD scene 变重，以及如何用 payload、composition、asset organization 和 metrics 定位问题。",
    notes: [
      "性能问题通常来自多个层级叠加：layer stack、composition arcs、payloads、geometry cache、shading cache 和过细或过深的场景组织都可能增加成本。",
      "从 release 24.11 起，Pixar 发布多种资产的 performance metrics；读者应把本页和 `Performance Metrics` 页面一起读，而不是只凭经验判断场景是否重。",
      "优化前要先量化：区分打开 stage、composition、遍历、渲染准备和交互式 viewport 响应时间，避免把所有延迟都归因于同一处。",
      "payload 和分层组织可以改善大场景加载，但如果依赖关系、变体或引用组织不当，也可能引入新的 composition 成本。",
      "中文导读应保留 `payload`、`composition`、`layer stack`、`performance metrics` 等术语原文，方便和工具日志、诊断输出对照。",
    ],
    terms: [
      ["performance metrics", "性能指标"],
      ["composition", "组合求值"],
      ["payload", "按需载入负载"],
      ["layer stack", "层栈"],
      ["introspection", "场景 introspection 检查"],
      ["viewport", "视口"],
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
