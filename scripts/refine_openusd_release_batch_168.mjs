import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-168";

const refinements = [
  {
    output: "full_site/api/hierarchy.html",
    title: "Class Hierarchy",
    summary:
      "`hierarchy.html` 是 Doxygen 生成的 Class Hierarchy 总览页，适合用来从继承树角度定位 OpenUSD API 类型。阅读时应把它当作导航索引：先找到基类、派生类和模板族，再跳到具体 class reference 页面看构造、成员函数与语义说明。",
    notes: [
      "Class Hierarchy 主要回答“某个类型继承自哪里、有哪些派生类型”这类结构问题，不负责解释每个 API 的完整行为；行为细节仍应进入具体 class 页面。",
      "面对 `UsdPrim`、`SdfSpec`、`HdSceneDelegate`、`GfMatrix4f` 等核心类型时，可先通过 hierarchy 确认它们在命名空间和继承树中的位置，再回到模块入口页理解用途边界。",
      "模板类、抽象基类和 adapter 类在层级页中很容易混在一起；阅读时应区分 interface inheritance、implementation inheritance、type trait 和 helper utility。",
      "如果用户从错误的父类进入 API，常会误判生命周期、ownership、virtual method override 或 plugin extension point；层级页适合用来提前校正这种路径。",
      "中文导读保留 `Class Hierarchy`、`base class`、`derived class`、`abstract class`、`template class` 等英文术语，便于和 Doxygen 侧栏、链接文本和源码注释对应。",
    ],
    terms: [
      ["类层级", "Class Hierarchy"],
      ["基类", "base class"],
      ["派生类", "derived class"],
      ["抽象类", "abstract class"],
      ["模板类", "template class"],
      ["接口继承", "interface inheritance"],
    ],
  },
  {
    output: "full_site/api/inherits.html",
    title: "Class Hierarchy Graph",
    summary:
      "`inherits.html` 是继承关系图索引页，偏向展示类型之间的 inheritance graph。它适合辅助查找“谁继承谁”和“哪些类共享同一抽象基类”，不应被当作 API 语义或调用顺序的唯一依据。",
    notes: [
      "Inheritance graph 强调结构关系：节点表示 class 或 struct，边表示继承；它不直接表达 composition、runtime dispatch、plugin registration 或 scene graph 关系。",
      "阅读图时应先识别抽象基类和叶子实现类，再决定是否进入具体类型页面查看 virtual method、override、constructor、destructor 与 factory pattern。",
      "`inherits.html` 与 `hierarchy.html` 可互补使用：前者更像图形化关系浏览，后者更像层级目录；两者都需要和 class reference 页面串读。",
      "遇到 Hydra、UsdImaging、UsdLux 或 Sdf 相关类型时，继承图只能说明 C++ 类型关系，不能替代 USD composition、schema application 或 render index 数据流说明。",
      "中文补强保留 `inheritance graph`、`virtual method`、`override`、`factory pattern` 等英文名，避免破坏读者在源码和 Doxygen 链接中的精确检索。",
    ],
    terms: [
      ["继承关系图", "inheritance graph"],
      ["图节点", "graph node"],
      ["继承边", "inheritance edge"],
      ["叶子实现类", "leaf implementation class"],
      ["虚方法", "virtual method"],
      ["工厂模式", "factory pattern"],
    ],
  },
  {
    output: "full_site/api/pages.html",
    title: "Related Pages",
    summary:
      "`pages.html` 是 Related Pages 总索引，用来集中跳转到 OpenUSD API 文档中的专题页、README、设计说明和指南型页面。它不是单个模块的说明，而是帮助读者从 class reference 跳到 broader topic documentation 的导航层。",
    notes: [
      "Related Pages 适合在不知道专题页文件名时使用：例如 OpenExec、Vdf、usdview、validation、Hydra group 或 schema guide 都可能通过此处进入。",
      "阅读时应把此页当作索引而非正文；进入某个专题页后，还要根据页面中的 API names、source excerpts 和 local links 回到具体 class 或 module entry。",
      "此页可帮助发现 Doxygen class 列表之外的背景说明，例如 design notes、README、tutorial、status page、proposal 或 test documentation。",
      "如果某个链接指向清单外内部页面，本项目按本地链接策略会路由到 `site/uncovered_openusd_page.html`；406 清单内页面则应保持本地跳转。",
      "中文导读保留 `Related Pages`、`README`、`design notes`、`tutorial`、`status page`、`proposal` 等英文分类，方便和原始 OpenUSD 文档命名一致。",
    ],
    terms: [
      ["相关页面", "Related Pages"],
      ["专题页", "topic page"],
      ["设计说明", "design notes"],
      ["教程", "tutorial"],
      ["状态页", "status page"],
      ["提案", "proposal"],
    ],
  },
  {
    output: "full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html",
    title: "Usdview Black Box Testing",
    summary:
      "`md_pxr_usd_imaging_usdviewq_black_box_testing.html` 说明 usdview 的 black-box testing 工作流。阅读时应关注测试如何从用户可见行为、命令行入口、UI 状态、stage loading 和渲染结果侧验证 usdview，而不是只看内部 Python 或 Qt 实现细节。",
    notes: [
      "Black-box testing 的边界是外部可观察行为：启动参数、加载文件、UI 响应、viewport 状态、输出日志和失败码，比内部函数调用更接近用户实际体验。",
      "调试 usdview 测试失败时，应先确认 fixture、sample USD、plugin availability、environment variables、baseline image 或 expected text 是否稳定，再深入实现代码。",
      "此页适合和 `usdviewq` README、UsdImaging adapter 页面、Hydra render delegate 页面串读，形成从 UI 到 imaging pipeline 的验证路径。",
      "如果测试依赖截图或渲染输出，应把 visual diff、GPU/driver 差异、font/layout 差异和 timing flakiness 分开记录，避免把环境差异误判为功能回归。",
      "中文层保留 `usdview`、`black-box testing`、`fixture`、`baseline image`、`visual diff`、`flakiness` 等英文术语，便于和测试脚本、CI 日志和文档标题对应。",
    ],
    terms: [
      ["黑盒测试", "black-box testing"],
      ["测试夹具", "fixture"],
      ["基准图像", "baseline image"],
      ["视觉差异", "visual diff"],
      ["不稳定性", "flakiness"],
      ["外部可观察行为", "externally observable behavior"],
    ],
  },
  {
    output: "full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html",
    title: "Development Practices For usdview",
    summary:
      "`md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html` 是 usdview / `usdviewq` 开发实践入口页，适合理解 UI 代码、Qt 层、stage inspection、plugin hooks 和测试约定。它偏向 contributor workflow，不是普通用户的 usdview 操作手册。",
    notes: [
      "`usdviewq` 是 usdview 的 UI 和工具实现区域，阅读时要区分 end-user command behavior、Qt widget code、viewer state、stage data access 和 imaging delegate interaction。",
      "开发实践页通常会说明代码组织、测试方式、review 注意事项或运行约定；这些内容应和实际 class/module API 页面一起看，不能替代 API reference。",
      "修改 usdview 行为时，常见风险包括 UI state 与 stage state 不一致、plugin menu hook 破坏、selection/model update 不同步、以及测试 fixture 没覆盖交互路径。",
      "如果页面提到 black-box 或 UI testing，应与 `Usdview Black Box Testing` 页合并理解：一个偏开发规范，一个偏外部行为验证。",
      "中文补强保留 `usdviewq`、`Qt`、`viewer state`、`plugin hook`、`stage inspection`、`selection` 等英文名称，确保可直接回到源码目录和测试输出。",
    ],
    terms: [
      ["开发实践", "development practices"],
      ["查看器状态", "viewer state"],
      ["插件钩子", "plugin hook"],
      ["场景检查", "stage inspection"],
      ["选择状态", "selection state"],
      ["贡献者工作流", "contributor workflow"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次导读补强 / Chinese Second-Pass Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function insertSection(html, section, output) {
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    return html.replace(existing, section);
  }

  const pageStructure = html.match(/    <section>\s*<h2>[\s\S]*?Page Structure<\/h2>/);
  if (pageStructure?.index !== undefined) {
    return `${html.slice(0, pageStructure.index)}${section}${html.slice(pageStructure.index)}`;
  }

  const afterScopeBeforeRefinement =
    /(\s*<main>\s*<section>[\s\S]*?<\/section>\s*)(<section data-cn-refinement=)/;
  if (afterScopeBeforeRefinement.test(html)) {
    return html.replace(afterScopeBeforeRefinement, `$1${section}    $2`);
  }

  const main = /(\s*<main>\s*)/;
  if (main.test(html)) {
    return html.replace(main, `$1${section}`);
  }

  throw new Error(`Cannot find insertion point: ${output}`);
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  const html = fs.readFileSync(filePath, "utf8");
  fs.writeFileSync(filePath, insertSection(html, section, item.output), "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
