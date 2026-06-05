import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-063";

const refinements = [
  {
    output: "full_site/release/contributing_to_usd.html",
    title: "Contributing to USD",
    notes: [
      "`Contributing to USD` 是面向贡献者的流程入口，不是 API 参考页；阅读重点是先理解法律与流程要求，再进入代码、测试和 pull request 审查。",
      "`Contributor License Agreement` 说明贡献前需要处理的授权前置条件；这类内容关系到代码能否被项目接收，应优先于具体改动实现阅读。",
      "`Coding Conventions` 和 `Pull Request Guidelines` 用来约束提交质量、代码风格、审查可读性和变更粒度；本地复刻保留这些英文小节名，方便与官方贡献流程核对。",
      "`Git Workflow`、`GitHub Issues` 和 `Making Major Changes` 描述从问题讨论、达成共识、修改代码、测试代码、提交 review 到 Pixar 测试并合入的完整路径。",
      "如果计划做大规模变更，应特别关注 `Step 1. Get consensus for major changes`，先讨论设计和影响范围，再写代码；这能降低返工和不被接收的风险。"
    ],
    terms: [
      ["Contributor License Agreement", "贡献者许可协议"],
      ["Coding Conventions", "编码约定"],
      ["Pull Request Guidelines", "Pull Request 指南"],
      ["Git Workflow", "Git 工作流"],
      ["GitHub Issues", "GitHub 问题讨论入口"],
      ["Making Major Changes", "进行重大变更"]
    ]
  },
  {
    output: "full_site/release/contributors.html",
    title: "USD Contributors (Historical)",
    notes: [
      "`USD Contributors (Historical)` 是历史贡献者致谢页，主要记录对 USD 以及其前身 scene description 软件演进作出贡献的人，并不是当前 GitHub 贡献者的完整实时清单。",
      "官方摘录明确说明该页 `not current nor complete`；如果需要最新贡献者统计，应转到 OpenUSD GitHub 仓库的 contributors 列表，而不是只依赖本页。",
      "该页强调 1995 到 2019 年间 Pixar 内部和相关人员对 ideas、code、scene description 设计演进的贡献，因此它更接近项目历史脉络和致谢记录。",
      "阅读时应区分 `historical list`、`up-to-date list` 和 `OpenUSD GitHub repo contributors`：前者是背景资料，后者才是当前仓库贡献状态。",
      "本地复刻保留人名、组织名和官方链接原样；这些专有名词不做中文化改写，以免影响检索和来源核对。"
    ],
    terms: [
      ["Historical Contributors", "历史贡献者"],
      ["not current nor complete", "并非当前且并不完整"],
      ["OpenUSD GitHub repo", "OpenUSD GitHub 仓库"],
      ["ideas and code", "理念和代码贡献"],
      ["scene description", "场景描述"],
      ["Pixarians", "Pixar 相关贡献者"]
    ]
  },
  {
    output: "full_site/release/dl_downloads.html",
    title: "Downloads and Videos",
    notes: [
      "`Downloads and Videos` 是学习资源和素材入口页，不是 release binary 镜像页；它把 intro、presentation、SIGGRAPH notes、videos 和 assets 汇总到一个导航界面。",
      "`Intro to USD`、`Presentations`、`SIGGRAPH Birds of a Feather Notes` 和 `SIGGRAPH 2019 Course Notes` 更适合作为概念学习和课程材料入口。",
      "`Videos` 小节面向演示和讲解材料；阅读时可把视频与 `Tutorials`、`Terms and Concepts`、`Products Using USD` 等页面交叉使用。",
      "`Assets` 与 `Additional Assets` 小节用于定位官方示例资产或演示素材；下载前应保留官方链接和文件名原样，便于核对版本和许可证要求。",
      "本页链接很多，复刻时重点是保持清单内 OpenUSD HTML 链接走本地页面，清单外资源或外部下载仍按路由策略处理，不把所有外部资源无选择镜像进仓库。"
    ],
    terms: [
      ["Downloads and Videos", "下载和视频"],
      ["Presentations", "演示文稿"],
      ["SIGGRAPH Course Notes", "SIGGRAPH 课程笔记"],
      ["Videos", "视频资源"],
      ["Assets", "示例资产"],
      ["Additional Assets", "补充资产"]
    ]
  },
  {
    output: "full_site/release/genindex.html",
    title: "Index",
    notes: [
      "`Index` 是 Sphinx/Doxygen 生成的全站索引页，不是叙事型文档；它按字母分组列出条目，帮助从关键词跳转到对应页面。",
      "当前页面结构中可见 `E`、`L`、`P`、`R`、`U` 等字母分组；这些分组本身应保持英文索引形式，不需要翻译为中文标题。",
      "使用本页时，可以把它看作本地复刻站点的检索辅助：先定位条目，再进入对应的 tutorial、reference、user guide 或 API 页面。",
      "因为索引条目高度依赖英文 API 名称、页面名、术语和锚点，本地复刻必须保留条目文字与链接原样，中文只补充阅读说明，不改写索引键。",
      "如果某个索引链接属于 406 清单内页面，应跳转到本地 HTML；如果官方页在清单外，则按既定策略跳到 `site/uncovered_openusd_page.html`。"
    ],
    terms: [
      ["Index", "索引"],
      ["Sphinx", "Sphinx 文档生成器"],
      ["Doxygen", "Doxygen 文档生成器"],
      ["alphabetical grouping", "按字母分组"],
      ["index entry", "索引条目"],
      ["anchor", "页面锚点"]
    ]
  },
  {
    output: "full_site/release/intro_to_openexec.html",
    title: "Introduction to OpenExec",
    notes: [
      "`Introduction to OpenExec` 是 OpenExec 的概念入门页，建议按 `Background`、`Introducing OpenExec`、`Illustrative Example`、`What OpenExec Is Not`、`New concepts` 的顺序阅读。",
      "`Computations` 是核心概念：页面区分 `Built-in Computations` 和 `Plugin Computations`，说明哪些计算由系统内置提供，哪些可以通过插件扩展。",
      "`Computation Input Parameters`、`Computation Callbacks` 和 `Computation Registration` 描述计算如何声明输入、如何回调执行、如何注册到系统；这些词保持英文原名便于和 API 文档对应。",
      "`Client API` 小节包含 `Requesting Values` 与 `Receiving Notification About Invalidation`，对应客户端请求计算结果以及接收失效通知的使用方式。",
      "`What OpenExec Is Not` 用来划清边界：OpenExec 不是一般脚本语言或任意任务系统，而是与 USD 场景数据、计算注册、值请求和失效传播相关的执行框架。"
    ],
    terms: [
      ["OpenExec", "OpenExec 执行框架"],
      ["Computations", "计算"],
      ["Built-in Computations", "内置计算"],
      ["Plugin Computations", "插件计算"],
      ["Computation Registration", "计算注册"],
      ["Invalidation", "失效通知"]
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
