import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-122";

const refinements = [
  {
    output: "full_site/release/contributors.html",
    title: "USD Contributors (Historical)",
    summary:
      "`USD Contributors (Historical)` 是历史贡献者致谢页，用来记录 USD 以及更早 scene description 软件演进中长期积累的 ideas and code。阅读时应把它当作项目历史与致谢资料，而不是当前 GitHub 仓库贡献者的实时统计页。",
    notes: [
      "官方原文明确提示该名单 `not current nor complete`；因此中文导读需要保留这一限制，避免把历史名单误读为完整贡献者数据库。",
      "页面覆盖 Pixar 内外人员在 1995 到 2019 年之间对 scene description 软件、USD 设计和实现的贡献，重点是历史脉络，而不是按版本列出的 changelog。",
      "人名、组织名、Pixar、Pixarians、OpenUSD GitHub repo 等专有名词不做中文化改写，便于读者继续检索外部来源或核对官方页面。",
      "如果读者需要当前贡献者状态，应转到 GitHub contributors、commits 或 releases；本页只解释历史致谢，不判断当前维护权或活跃度。",
      "本地复刻保留英文摘录和链接，同时用中文说明页面用途、名单边界和术语含义，避免把简单名单页当作 API 或安装文档。",
    ],
    terms: [
      ["USD Contributors (Historical)", "USD 历史贡献者"],
      ["historical list", "历史名单"],
      ["not current nor complete", "并非当前且并不完整"],
      ["scene description", "场景描述"],
      ["ideas and code", "理念与代码贡献"],
      ["Pixarians", "Pixar 相关贡献者"],
    ],
  },
  {
    output: "full_site/release/press_opensource_release.html",
    title: "Open Source Release",
    summary:
      "`Open Source Release` 是 2016 年 7 月 26 日的正式开源发布新闻页，记录 Pixar open source release Universal Scene Description 的发布语境。它说明 USD 如何服务 DCC tools、3D graphics data 和 scalable production workflows，但不是安装指南或 API 手册。",
    notes: [
      "本页应和 `Open Source Announcement` 区分阅读：announcement 是 2015 年的开源计划说明，release 是 2016 年正式发布后的新闻与行业定位。",
      "`Universal Scene Description`、`DCC tools`、`3D graphics data`、Pixar、Ed Catmull、Guido Quaroni 等名称保留英文原样，方便与新闻稿引用逐项核对。",
      "新闻稿强调 USD 支撑 complex workflows 和 collaborative production workflows；这些表述是项目定位，不等同于某个单一 API 类或命令行工具。",
      "关于获取源码、构建或安装的实际步骤，应继续跳转 GitHub、Getting Started、Downloads 或 release 文档；不要从新闻稿推导当前版本行为。",
      "翻译时保留人物引用和公司信息的新闻边界，只补充中文背景和术语解释，不把历史新闻改写成当前承诺。",
    ],
    terms: [
      ["Open Source Release", "开源发布"],
      ["Universal Scene Description", "通用场景描述"],
      ["digital content creation (DCC) tools", "数字内容创作工具"],
      ["3D graphics data", "三维图形数据"],
      ["scalable solution", "可扩展解决方案"],
      ["collaborative production workflows", "协作式生产工作流"],
    ],
  },
  {
    output: "full_site/release/release_schedule.html",
    title: "Release Schedule",
    summary:
      "`Release Schedule` 说明 OpenUSD 的发布节奏和渠道边界，核心是区分 dev releases、full releases、release candidates、dev branch 与 release branch。它帮助读者判断何时看开发版、候选版或完整发布版，而不是列出每个版本的具体变更。",
    notes: [
      "`approximately weekly`、`approximately quarterly` 和 `approximately a week prior` 表示预期节奏，不是强制日历承诺；实际版本仍应以 GitHub release 和对应文档为准。",
      "dev release 面向更快的集成反馈，full release 面向更稳定的季度发布；两者文档 URL、分支和风险预期不同。",
      "release candidate 是 full release 前的测试候选；如果发现 show-stopping bugs，候选版本可能增加，因此第一个 candidate 不应被当作最终版。",
      "阅读本页时应把 release branch、dev branch、release notes 和 API 文档版本放在一起核对，避免混用不同发布线的说明。",
      "本页是流程说明，不是 changelog、安装指南或迁移指南；具体变更、构建选项和兼容性仍需查相应版本页面。",
    ],
    terms: [
      ["dev releases", "开发版发布"],
      ["full releases", "正式完整发布"],
      ["release candidates", "候选发布版"],
      ["dev branch", "开发分支"],
      ["release branch", "发布分支"],
      ["show-stopping bugs", "阻断发布的严重问题"],
    ],
  },
  {
    output: "full_site/release/intro_to_openexec.html",
    title: "Introduction to OpenExec",
    summary:
      "`Introduction to OpenExec` 是 OpenExec 概念入口，围绕 Computations、Plugin Computations、Computation Registration、Client API 和 Invalidation 建立阅读路径。它关注 USD 数据相关计算如何注册、请求、执行和失效传播，不是通用脚本语言说明。",
    notes: [
      "建议按 `Background`、`Introducing OpenExec`、`Illustrative Example`、`What OpenExec Is Not`、`New concepts` 的顺序读，先理解动机，再看术语和边界。",
      "`Computations` 是核心抽象；`Built-in Computations` 与 `Plugin Computations` 的区别在于计算来源和扩展方式，而不是用户界面层级。",
      "`Computation Input Parameters`、`Computation Callbacks` 和 `Computation Registration` 描述计算的输入、回调执行和注册流程，术语应保留英文以便对照 API 文档。",
      "`Client API` 的 `Requesting Values` 与 `Receiving Notification About Invalidation` 对应客户端请求值和响应失效通知，读者应关注数据依赖如何传播。",
      "`What OpenExec Is Not` 用来避免误解：OpenExec 不是任意任务调度器或脚本运行时，而是面向 USD 数据和计算关系的执行框架。",
    ],
    terms: [
      ["OpenExec", "OpenExec 执行框架"],
      ["Computations", "计算"],
      ["Built-in Computations", "内置计算"],
      ["Plugin Computations", "插件计算"],
      ["Computation Registration", "计算注册"],
      ["Invalidation", "失效通知"],
    ],
  },
  {
    output: "full_site/release/usdfaq.html",
    title: "USD Frequently Asked Questions",
    summary:
      "`USD Frequently Asked Questions` 是初学者定位问题的快速入口，用简短问答解释 USD 定位、file format、scene description、composition arcs、字符编码和常见命令。它适合先找方向，再跳转到 Overview、教程、API 文档或规范页深入阅读。",
    notes: [
      "`What is USD and why should I use it?` 应与 `Overview and Purpose` 一起读：FAQ 给短答案，概念页负责展开 stage、layers、composition arcs 和 schema 生态。",
      "`Isn't USD just another file format?` 的重点是澄清 USD 不只是 `.usd` / `.usda` / `.usdc` 文件，而是一套场景描述、组合、访问 API 和工具体系。",
      "命令示例必须逐字保留，例如 `usdcat file.usd --out file.usd --usdFormat usda`；中文只解释用途、输入输出和适用边界。",
      "涉及 character encoding、file conversion、Python/C++ API 或插件支持的问题，应继续核对具体版本文档，FAQ 不替代版本化参考。",
      "本页适合作为问答索引：先用问题定位主题，再进入 tutorial、glossary、schema docs 或 API reference，不要把短回答当完整架构规范。",
    ],
    terms: [
      ["Frequently Asked Questions", "常见问题"],
      ["file format", "文件格式"],
      ["scene description", "场景描述"],
      ["composition arcs", "组合弧"],
      ["usdcat", "USD 文件查看/转换命令"],
      ["character encoding", "字符编码"],
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
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English page names, API names, schema names, property names, commands, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
