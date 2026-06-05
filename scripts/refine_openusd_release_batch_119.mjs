import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-119";

const refinements = [
  {
    output: "full_site/release/tut_end_to_end.html",
    title: "End to End Example",
    summary:
      "`End to End Example` 用一个极简 USD pipeline 串起资产、模型、脚本和场景组合。阅读本页时，应把它当作学习目录和执行路线：先确认 `USD/extras/usd/tutorials/endToEnd` 的文件结构，再按教程逐步运行脚本、检查生成的 layer 和最终 stage。",
    notes: [
      "本页的价值是展示端到端组织方式，而不是替代前面的 Hello World、layer、reference、variant 或 shading 教程；它更像把前置概念放进一个小型生产流程。",
      "`assets`、`models`、`scripts` 等目录名应保持原样，因为它们对应示例工程结构；中文层只说明每个目录的角色，不改写路径。",
      "`scripts` 目录中的工具可以用 `-h` 查看参数，说明教程鼓励读者检查脚本行为，而不是盲目复制命令。",
      "排查端到端示例时，应按顺序看输入资产、脚本输出、layer 组合和最终 composed stage，避免只盯着最后一个 USD 文件。",
      "本地复刻保留官方英文摘录是为了让读者能和原教程逐项核对；命令、目录、文件名和示例结构必须保持英文原样。",
    ],
    terms: [
      ["End to End Example", "端到端示例"],
      ["pipeline", "流程或制作管线"],
      ["assets", "资产目录"],
      ["models", "模型目录"],
      ["scripts", "脚本目录"],
      ["composed stage", "组合后的场景"],
    ],
  },
  {
    output: "full_site/release/tut_generating_new_schema.html",
    title: "Generating New Schema Classes",
    summary:
      "`Generating New Schema Classes` 面向需要扩展 USD schema 的开发者。它围绕 `schema.usda`、`usdGenSchema`、CMake 安装前缀和生成出的 C++/Python 绑定展开；中文导读应强调这是 schema authoring contract，而不是普通用户编辑场景文件的教程。",
    notes: [
      "`usdGenSchema` 依赖 `jinja2` 和 `argparse`，如果构建 USD 时依赖不可用，该工具不会安装；环境前提是本页最先要确认的内容。",
      "`schema.usda` 中的 `GLOBAL`、`libraryName`、`subLayers` 和 schema prim 定义会直接影响生成的类型名、命名空间和插件库结构。",
      "教程里的 `.usda` 片段必须保持原样，因为它是 schema 生成输入；中文层可以解释字段意图，但不能改动代码、注释、token 或命名空间。",
      "阅读 `Types of Schema Classes` 时要区分 concrete typed schema、single-apply API schema 和 multiple-apply API schema，否则会误选扩展模型。",
      "生成 schema 后还要考虑构建、安装、插件发现和 API 文档；本页不是只生成代码文件，更是把 schema 类型纳入 USD 插件系统。",
    ],
    terms: [
      ["usdGenSchema", "USD schema 代码生成工具"],
      ["schema.usda", "schema 定义文件"],
      ["libraryName", "schema 库名字段"],
      ["subLayers", "子层声明"],
      ["concrete typed schema", "具名 concrete schema"],
      ["API schema", "API schema"],
    ],
  },
  {
    output: "full_site/release/tut_houdini_example.html",
    title: "Houdini USD Example Workflow",
    summary:
      "`Houdini USD Example Workflow` 是历史教程页：官方明确说明旧 Houdini USD plugin 已在 USD 20.05 移除，现代 Houdini 用户应优先参考 Houdini Solaris。本地复刻保留它，是为了覆盖历史 release 文档和说明旧 USD-centric Houdini 流程的边界。",
    notes: [
      "本页不应被理解为当前推荐的 Houdini 集成路线；它的首要信息是 historical tutorial 和 plugin removal。",
      "命令 `$ usdview USD/extras/usd/tutorials/Houdini/shot.usda` 展示如何查看示例 shot，应保持原样；中文层只解释该命令的目的。",
      "`Authoring USD Overrides in Houdini` 说明历史工作流中如何在 Houdini 中写入 overrides；现代项目应结合 Solaris 的 LOP/USD 工作流重新判断。",
      "如果用户排查旧资产或旧教程，本页仍有参考价值：它展示了 USD scene、Houdini-authored overrides 和 `usdview` 检查之间的关系。",
      "文档状态应明确为历史参考，避免读者误以为旧 Houdini USD plugin 仍随当前 OpenUSD 发布或仍被定期测试。",
    ],
    terms: [
      ["Houdini USD Example Workflow", "Houdini USD 示例工作流"],
      ["historical tutorial", "历史教程"],
      ["Houdini USD plugin", "Houdini USD 插件"],
      ["Houdini Solaris", "Houdini Solaris"],
      ["overrides", "覆盖意见"],
      ["usdview", "USD 场景查看器"],
    ],
  },
  {
    output: "full_site/release/tut_usd_tutorials.html",
    title: "USD Tutorials",
    summary:
      "`USD Tutorials` 是 release 教程总入口，用来组织环境配置、基础概念、layer/reference/variant/xform/shading、端到端示例、schema 生成和 `usdview` 插件等学习路线。中文层应帮助读者按依赖顺序阅读，而不是把它当成普通链接页。",
    notes: [
      "教程入口首先强调环境配置：Python 解释器、USD Toolset 和相关环境变量必须与构建 USD 的版本匹配。",
      "每个教程标注测试过的 USD 版本，这些版本对应 GitHub releases；旧教程不应直接推断为当前版本行为。",
      "建议阅读顺序是先 Hello World 和属性/引用/layer，再进入 variants、xforms、shading，最后看 end-to-end、schema generation 和 plugin 扩展。",
      "Houdini 示例和 usdview plugin 教程属于更具上下文的页面；读者应先理解核心 USD composition 和工具链环境再进入。",
      "本页中的内部链接必须保持本地路由，因为它是复刻站点的学习导航；外部 GitHub release 语义只作为版本背景理解。",
    ],
    terms: [
      ["USD Tutorials", "USD 教程总入口"],
      ["Configure your Environment", "配置教程环境"],
      ["USD Toolset", "USD 工具集"],
      ["GitHub releases", "GitHub 发布版本"],
      ["composition", "组合机制"],
      ["learning path", "学习路线"],
    ],
  },
  {
    output: "full_site/release/tut_usdview_plugin.html",
    title: "Creating a Usdview Plugin",
    summary:
      "`Creating a Usdview Plugin` 演示如何为 `usdview` 编写 Python plugin，并通过 usdview API 扩展查看器行为。阅读本页时，应区分 plugin discovery、Python package layout、`PluginContainer`、UI action 注册和运行时 API 调用。",
    notes: [
      "本教程面向想扩展 `usdview` 的开发者；如果只是查看 USD 文件，应先掌握基础 `usdview` 命令和环境配置。",
      "`mkdir -p <some path>/usdviewPlugins/tutorialPlugin/` 是目录结构示例，`<some path>` 是占位符，命令文本本身应保持原样。",
      "`PluginContainer` 负责把插件代码组织成 usdview 可发现、可加载的容器；它不是普通 Python 脚本入口。",
      "插件能否工作取决于多层条件：目录是否在搜索路径、Python 包是否可导入、usdview API 是否调用正确、UI action 是否注册到界面。",
      "调试插件时应分层确认 discovery、import、container 初始化、menu/action 注册和回调执行，而不是只看 UI 是否出现按钮。",
    ],
    terms: [
      ["usdview plugin", "usdview 插件"],
      ["usdview API", "usdview API"],
      ["PluginContainer", "插件容器"],
      ["tutorialPlugin", "教程插件目录"],
      ["plugin discovery", "插件发现"],
      ["UI action", "界面动作"],
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
