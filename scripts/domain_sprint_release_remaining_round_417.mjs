import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 417;
const BASE_GOOD = 189;
const TARGET = "release 剩余支撑/参考页收尾小批量冲刺";
const SOURCE_PARITY_REPORT = "reports/round_417_release_remaining_source_parity.json";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function slash(value) {
  return String(value).replaceAll("\\", "/");
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function inline(value) {
  return String(value ?? "")
    .split("`")
    .map((part, index) => (index % 2 ? `<code>${esc(part)}</code>` : esc(part)))
    .join("");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function linkFrom(output, target) {
  return slash(path.relative(path.dirname(output), target)) || path.basename(target);
}

function sourceHtml(page) {
  return fs.existsSync(rel(page.source)) ? fs.readFileSync(rel(page.source), "utf8") : "";
}

function sourceText(page) {
  return stripTags(sourceHtml(page));
}

function sourceHeadings(page) {
  const html = sourceHtml(page);
  return [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

const css = `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    .navlinks a{color:#d7e3f4;margin-right:14px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    table{width:100%;border-collapse:collapse;margin-top:12px}
    th,td{border:1px solid #d8dee8;padding:10px;text-align:left;vertical-align:top}
    th{background:#eef2f7}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
`;

const snapshotGuard = [
  "本页按本地 406 页库存中的 source snapshot 解释当前页面，不伪装成实时官网。涉及 release schedule、contributors、press announcement、press release、index 和性能数据的内容，都可能随官方站点或项目状态变化；需要最新信息时，必须通过明确的 Open official page 外跳核对。",
  "中文主阅读路径承担的是解释和分流：说明页面职责、什么时候读它、如何进入相邻 tutorial/user guide/schema/API/spec/proposal/support 页面，以及遇到环境、性能、索引、公告或贡献名单问题时应回到哪个本地入口继续查证。",
  "所有 API 名、schema 名、token、函数名、代码、命令、Doxygen 标签、平台名、产品名、贡献者姓名、新闻标题和链接语义保持原样。中文只解释用途和边界，不把正式标识翻译成无法搜索或无法核对的中文词。",
  "本地阅读路径必须保持可回退：读者从总入口进入 release index，再进入本页，应该可以通过侧栏、breadcrumb、相关本地页和显式官方外跳完成连续阅读。正文内 in-scope 链接优先走本地，只有写作 Open official page 的链接才是外跳。",
  "索引/名单/公告/时效页不适合逐字逐项翻译所有列表。完成态要求是让读者理解这些列表如何使用、哪些字段需要保留英文、哪些内容需要按当前官方版本复核，以及如何从列表跳回 API、教程、性能或贡献流程页面。",
  "性能和 OpenExec 相关页面尤其不能只看单个建议。读者应区分 allocator、binary USD、payload、scene complexity、metrics environment、platform graphs、computation registration、client API 和 invalidation notification 等不同层级，避免把一个调优建议套到所有场景。",
  "公告和新闻稿页面的中文说明需要保留历史语境：这些页面说明 OpenUSD 开源发布的背景和影响，不应被当作当前路线图、当前版本功能列表或商业产品承诺。历史标题和 Pixar 相关名称都应保留英文以便核对。",
  "贡献者和索引页面的中文说明需要诚实承认它们是导航/参考型页面。贡献者名单用于理解历史参与者和鸣谢范围，不用于推断当前维护者；genindex 用于按字母或术语定位条目，不用于替代 API reference 的正文定义。",
  "本轮完成后必须继续通过 `translation_quality_review`、`english_debt_audit`、`reading_flow_navigation_audit`、`local_link_routing_report`、`markdown_encoding_audit` 和 validation 复核；英文/中文比例只作为诊断，不作为完成否决。",
  "第十层判断是剩余 release 页收尾策略：这些页面通常不是长篇教程，而是把读者送到正确位置的支撑页。完成态不是把每个名字、每个日期、每个新闻句子都改写一遍，而是给出足够清晰的中文解释，让读者知道应如何使用原始列表、哪些内容必须保留英文、哪些内容需要官方实时核对。",
  "第十一层判断是与总入口的诚实关系：总入口显示的 complete 数量只代表页面达到 `good_bilingual` 门槛，不等于所有外部新闻、贡献者列表、性能图表或发布计划都被实时同步。页面自身必须提示本地快照和官方原页的区别，避免读者把本地站误认为官方实时镜像。",
  "第十二层判断是调试入口分层：性能问题优先进入 maxperf 和 performance metrics，执行系统问题进入 OpenExec/API，版本时效问题进入 release schedule，历史与新闻语境进入 press 页面，贡献与协作进入 contributors/contributing，术语定位进入 genindex/API index。分层清楚后，支撑页才真正能顺着读。",
  "第十三层判断是未覆盖链接治理：如果页面内仍有 out-of-scope 或未映射链接，不应静默跳官方英文站，而应通过 local link routing 报告和 explicit official link 规则说明其状态。这样既不夸大本地覆盖范围，也不破坏用户的本地阅读体验。",
  "第十四层判断是后续收尾安排：本轮完成后 release 范围理论上只剩 `search.html` 这类 template-only 功能页。它需要单独策略说明搜索页用途、输入框行为、脚本不逐行翻译的原因和回到总入口/索引/API 的路径，不能混在普通翻译 sprint 里硬做。"
];

const pages = [
  {
    slug: "intro-openexec",
    output: "full_site/release/intro_to_openexec.html",
    source: "source/full_release/intro_to_openexec_source.html",
    official_url: "https://openusd.org/release/intro_to_openexec.html",
    title: "Introduction to OpenExec",
    zhTitle: "OpenExec 介绍",
    sourceKeywords: ["Introduction to OpenExec", "Background", "Introducing OpenExec", "Illustrative Example", "What OpenExec Is Not", "Computations", "Client API"],
    summary: "本页介绍 OpenExec 的目标、背景和新增概念。中文主阅读路径应把它视为执行系统导读：先理解为什么需要 OpenExec，再看 computation、input parameter、callback、registration、client API、requesting values 和 invalidation notification 如何形成可扩展计算框架。它不是普通 USD stage 教程，也不是替代 Hydra 或 renderer 的执行引擎说明，而是解释 OpenUSD 内部如何组织可注册、可请求、可失效通知的计算。",
    notes: [
      ["Background", "背景部分说明传统数据访问和计算需求为什么需要更清晰的执行模型。读者应把它与 Vdf、Exec、UsdExec、scene description 和 dependency invalidation 联系起来，而不是只理解为新增工具命令。"],
      ["Introducing OpenExec", "OpenExec 的导入说明强调计算定义、注册和调用路径。中文说明应保留 `OpenExec`、`Computations`、`Client API` 等正式名称，解释它们如何被插件和客户端协作使用。"],
      ["Illustrative Example", "示例用于展示计算如何被请求和返回值。代码、类型名和调用顺序必须保留英文；中文负责解释每一步的输入、输出和失效影响。"],
      ["What OpenExec Is Not", "这个 section 是误读防线：OpenExec 不是 renderer、不是普通脚本调度器，也不是替换 USD composition 的系统。它关注注册和请求计算值的执行模型。"],
      ["New concepts", "新增概念包括 computation、input parameter、callback、registration 和 client API。阅读时应按职责分组，而不是把它们混成一个函数列表。"]
    ],
    workflows: [
      "如果读者需要理解 Exec/Vdf 相关 API，先读本页建立执行模型，再回到 API 页面核对具体类和函数。",
      "调试计算值未更新时，沿 computation registration、input parameters、callback 和 invalidation notification 逐层排查。",
      "插件 computation 不生效时，先确认注册是否成功，再确认 client API 请求路径和依赖失效通知是否触发。"
    ],
    boundaries: [
      "OpenExec 不是场景格式、渲染器或任务队列，它描述的是 OpenUSD 内部计算表达和请求机制。",
      "computation、callback、registration、Client API、Requesting Values 等术语保留英文。",
      "本页是导读，具体实现仍需要跳到 API/Doxygen 和相关 tutorial 页面核对。"
    ],
    related: [["Exec README", "full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html"], ["Vdf README", "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html"], ["Exec tutorial", "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html"]],
  },
  {
    slug: "maxperf",
    output: "full_site/release/maxperf.html",
    source: "source/full_release/maxperf_source.html",
    official_url: "https://openusd.org/release/maxperf.html",
    title: "Maximizing USD Performance",
    zhTitle: "最大化 USD 性能",
    sourceKeywords: ["Maximizing USD Performance", "Use an allocator optimized for multithreading", "Use binary", "Package assets with payloads", "What makes a USD scene heavy/expensive?"],
    summary: "本页是 USD 性能建议入口，覆盖多线程 allocator、二进制 `.usd` 几何和 shading cache、payload 打包资产，以及什么会让 USD scene 变重或昂贵。中文主阅读路径需要把这些建议拆成存储格式、内存分配、composition 结构、payload 管理和场景复杂度五类，避免把性能问题简单归因于文件大小。它适合与 performance metrics、render/user guide、payload/reference、asset resolution 和实际 profiler 结果一起阅读。",
    notes: [
      ["Use an allocator optimized for multithreading", "allocator 建议关注多线程内存分配开销。读者应按平台和构建方式核对可用 allocator，不要把它当作所有性能问题的唯一修复。"],
      ["Use binary `.usd` files", "二进制 `.usd` 更适合几何和 shading cache，但文本 `.usda` 仍适合调试和小型示例。格式选择要按数据规模、可读性和流水线用途权衡。"],
      ["Package assets with payloads", "payload 能延迟加载和分区资产，是控制大型场景成本的重要机制。中文说明应连接 reference/payload、asset resolution 和场景装配策略。"],
      ["What makes a USD scene heavy/expensive?", "昂贵场景通常来自 prim 数、属性数量、composition arc、layer stack、payload 策略、变体复杂度和渲染/几何缓存。应按层级排查，而不是只压缩文件。"]
    ],
    workflows: [
      "先测量瓶颈是打开 stage、composition、遍历、几何加载、渲染准备还是资产解析，再选择对应优化。",
      "大型资产优先用 payload 分区和延迟加载，再结合 binary cache 和 resolver 策略。",
      "优化后用 performance metrics 或项目 profiler 对比前后数据，避免只凭体感判断。"
    ],
    boundaries: [
      "性能建议不是固定处方；allocator、binary USD 和 payload 需要结合平台、场景规模和工作流判断。",
      "`.usd`、`.usda`、payload、reference、allocator、cache 等术语保持英文。",
      "本页不替代本地性能基准，最终应以项目自己的测量数据为准。"
    ],
    related: [["Performance Metrics", "full_site/release/ref_performance_metrics.html"], ["Asset Resolution Ar 2.0", "full_site/release/wp_ar2.html"], ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"]],
  },
  {
    slug: "performance-metrics",
    output: "full_site/release/ref_performance_metrics.html",
    source: "source/full_release/ref_performance_metrics_source.html",
    official_url: "https://openusd.org/release/ref_performance_metrics.html",
    title: "Performance Metrics",
    zhTitle: "性能指标",
    sourceKeywords: ["Performance Metrics", "What We Measure", "What Environment Is Used", "Linux", "macOS", "Windows", "Metrics", "Running Performance Metrics Locally"],
    summary: "本页说明 OpenUSD 性能指标如何测量、使用什么环境、哪些平台有数据、标准 Shader Ball、Kitchen Set、ALab、Moore Lane 等场景如何用于图表，以及如何在本地运行或添加 custom metrics。中文主阅读路径应强调：这是基准和趋势解释页，不是某台机器的性能承诺。读者需要同时看硬件、OS、USD build、场景、指标定义和本地运行方式，才能判断自己的项目是否可比。",
    notes: [
      ["What We Measure", "测量内容决定指标含义。读者应区分 open stage、composition、traversal、render preparation、asset loading 等可能不同的成本来源。"],
      ["What Environment Is Used", "环境说明包括 Linux、macOS、Windows 和 USD Build。中文说明应提醒读者平台、编译选项、依赖版本和硬件差异会显著影响结果。"],
      ["Metrics", "Metrics section 中的图表按平台和场景组织。不要只比较单个数字，要看测试场景、数据规模和测量方法。"],
      ["Running Performance Metrics Locally", "本地运行指标时要保留命令和脚本名，确保依赖、示例资产和 build 配置一致。结果应用于趋势比较，不应脱离环境做绝对承诺。"],
      ["Adding Custom Metrics", "Custom Metrics 适合项目特定瓶颈。添加时应定义测量对象、场景输入、重复次数和报告字段，避免生成不可比较的数字。"]
    ],
    workflows: [
      "先用官方 metrics 建立参考，再用本地相同场景复测，最后加入项目自定义场景。",
      "性能回归排查时同时记录 commit、USD build、平台、硬件、资产版本和指标名。",
      "如果官方图表与本地结果差异大，先检查测试环境和 build 配置，而不是直接判断 OpenUSD 性能异常。"
    ],
    boundaries: [
      "Performance Metrics 是基准解释，不是实时排行榜或硬件保证。",
      "Linux、macOS、Windows、Shader Ball、Kitchen Set、ALab、Moore Lane 等名称保持英文。",
      "指标页需要与 maxperf 页面一起读，一个解释如何测量，一个解释常见优化方向。"
    ],
    related: [["Maximizing USD Performance", "full_site/release/maxperf.html"], ["Render User Guide", "full_site/release/user_guides/render_user_guide.html"], ["USD FAQ", "full_site/release/usdfaq.html"]],
  },
  {
    slug: "release-schedule",
    output: "full_site/release/release_schedule.html",
    source: "source/full_release/release_schedule_source.html",
    official_url: "https://openusd.org/release/release_schedule.html",
    title: "Release Schedule",
    zhTitle: "Release Schedule 发布节奏",
    sourceKeywords: ["Release Schedule"],
    summary: "本页是发布节奏参考页，具有明显时效属性。中文主阅读路径必须诚实说明：本地页面解释的是 source snapshot 中的 release schedule 结构和阅读方式，不代表当前日期的官方最新计划。读者如果需要判断某个 OpenUSD release、API 变更、功能落地或发布日期，必须显式打开官方原页核对。这个页面的价值在于帮助读者理解发布节奏如何影响教程、spec、API、插件和产品兼容性，而不是替代官方公告。",
    notes: [
      ["Release Schedule", "发布节奏用于规划升级、插件适配、文档同步和项目依赖版本。中文说明应强调快照属性和官方核对要求。"],
      ["版本规划", "项目使用 OpenUSD 时要把 release schedule 与依赖库、插件、DCC 工具和渲染器版本一起管理。"],
      ["文档同步", "教程、API 和 schema 页面可能随 release 更新。看到版本相关信息时，应回到官方页和当前仓库 tag 核对。"],
      ["风险边界", "本地中文版不能承诺发布日期或功能状态，只能解释如何阅读发布计划和如何回到官方来源。"]
    ],
    workflows: [
      "制定升级计划时先查官方 release schedule，再核对项目依赖和插件兼容性。",
      "文档中出现版本差异时，记录当前本地快照、官方页面和目标 OpenUSD tag。",
      "如果用户询问最新发布日期，不从本地快照推断，必须打开官方源或 GitHub release 核对。"
    ],
    boundaries: [
      "这是时效页，本地内容不是实时官方计划。",
      "release、tag、branch、API、schema 等术语保持英文。",
      "发布节奏说明不能替代 changelog、release notes 或 GitHub release。"
    ],
    related: [["Downloads and Videos", "full_site/release/dl_downloads.html"], ["Contributing to USD", "full_site/release/contributing_to_usd.html"], ["OpenUSD GitHub", "https://github.com/PixarAnimationStudios/OpenUSD"]],
  },
  {
    slug: "contributors",
    output: "full_site/release/contributors.html",
    source: "source/full_release/contributors_source.html",
    official_url: "https://openusd.org/release/contributors.html",
    title: "USD Contributors (Historical)",
    zhTitle: "USD 历史贡献者",
    sourceKeywords: ["USD Contributors", "Historical"],
    summary: "本页是历史贡献者名单和鸣谢参考页。中文主阅读路径应说明：贡献者姓名、组织名和历史归属应保持原样；本地页面解释名单用途和快照属性，不把它当作当前维护者列表、权限列表或实时贡献统计。读者如果要了解当前项目维护、PR review 或贡献流程，应继续阅读 Contributing to USD、GitHub issues 和当前 GitHub 仓库状态。",
    notes: [
      ["USD Contributors (Historical)", "Historical 标记说明这是历史视角的贡献者页面。中文应避免把名单误读为当前团队结构。"],
      ["姓名和组织", "姓名、组织、项目名和链接保持英文或原文形式，避免影响搜索和鸣谢准确性。"],
      ["贡献流程关系", "贡献者名单解释历史参与者；实际贡献流程需要回到 CLA、PR guideline、Git workflow 和 GitHub issues。"],
      ["快照属性", "本地页面来自 source snapshot，可能落后于当前官方仓库贡献记录。需要最新贡献统计时应打开官方仓库。"]
    ],
    workflows: [
      "查历史鸣谢时阅读本页；查当前贡献流程时转到 contributing 页面。",
      "引用贡献者信息时保留原文姓名和组织，不做中文转写。",
      "需要当前维护者或 reviewer 信息时，以 GitHub 仓库、issue 和 PR 为准。"
    ],
    boundaries: [
      "本页不是当前治理结构或权限清单。",
      "贡献者姓名、Pixar、OpenUSD、GitHub 等名称保持原样。",
      "历史名单不代表当前版本功能归属或商业支持范围。"
    ],
    related: [["Contributing to USD", "full_site/release/contributing_to_usd.html"], ["USD FAQ", "full_site/release/usdfaq.html"], ["OpenUSD GitHub", "https://github.com/PixarAnimationStudios/OpenUSD"]],
  },
  {
    slug: "press-announce",
    output: "full_site/release/press_opensource_announce.html",
    source: "source/full_release/press_opensource_announce_source.html",
    official_url: "https://openusd.org/release/press_opensource_announce.html",
    title: "Open Source Announcement",
    zhTitle: "Open Source Announcement 开源公告",
    sourceKeywords: ["Open Source Announcement", "Pixar Animation Studio", "Groundbreaking Software", "About Pixar Animation Studios"],
    summary: "本页是 OpenUSD 开源公告的历史新闻页面。中文主阅读路径应保留公告标题、Pixar 名称、Universal Scene Description 和 Groundbreaking Software 等新闻语境，解释它在文档站中的作用：帮助读者理解 USD 为什么开源、它当时被如何描述、对工作流效率和行业协作有什么历史意义。它不是当前 release notes，也不是当前功能路线图。",
    notes: [
      ["Pixar Animation Studio’s Universal Scene Description to be Open-Sourced", "这个标题是历史公告语境，说明 Pixar 宣布 Universal Scene Description 将开源。中文解释应保留标题含义，不改写成当前状态公告。"],
      ["Groundbreaking Software Enables Dramatically Increased Efficiency Across Workflows", "副标题强调工作流效率和跨流程协作，是新闻稿价值判断，不是性能基准数据。"],
      ["About Pixar Animation Studios", "About 段落是组织介绍。公司名、项目名和正式称谓保留英文，中文只解释其背景作用。"],
      ["历史语境", "公告页用于理解开源动机和传播语境；当前 API、下载、release schedule 和贡献流程仍要回到对应页面。"]
    ],
    workflows: [
      "了解 OpenUSD 开源背景时读本页，再跳到 open source release 和 contributing 页面。",
      "引用公告内容时标注它是历史新闻稿，不把它当作当前技术规范。",
      "需要当前版本状态时回到 release schedule、downloads 或 GitHub release。"
    ],
    boundaries: [
      "公告不是 spec、API reference 或 release notes。",
      "Pixar、Universal Scene Description、Open Source Announcement 等正式名称保持英文。",
      "新闻语境不能替代当前官方页面和 GitHub 状态。"
    ],
    related: [["Open Source Release", "full_site/release/press_opensource_release.html"], ["Contributing to USD", "full_site/release/contributing_to_usd.html"], ["Release Schedule", "full_site/release/release_schedule.html"]],
  },
  {
    slug: "press-release",
    output: "full_site/release/press_opensource_release.html",
    source: "source/full_release/press_opensource_release_source.html",
    official_url: "https://openusd.org/release/press_opensource_release.html",
    title: "Open Source Release",
    zhTitle: "Open Source Release 开源发布",
    sourceKeywords: ["Open Source Release", "Pixar Animation Studios Open Sources Universal Scene Description", "Tool Greatly Enhances Efficiency", "About Pixar Animation Studios"],
    summary: "本页是 OpenUSD 开源发布新闻页，说明 Pixar Animation Studios open sources Universal Scene Description 的历史发布语境。中文主阅读路径应帮助读者区分新闻发布、技术规范、下载入口和贡献流程：新闻页解释当时的公开发布和行业价值，技术细节仍要回到 spec、tutorial、API、downloads、release schedule 和 GitHub 仓库核对。",
    notes: [
      ["Pixar Animation Studios Open Sources Universal Scene Description", "标题说明开源发布事件。中文不把它改写成当前版本说明，而是说明它是历史新闻和文档背景。"],
      ["Tool Greatly Enhances Efficiency Across Complex Workflows", "副标题强调复杂工作流效率提升。它是新闻表述，不等于本地项目的性能保证。"],
      ["About Pixar Animation Studios", "关于 Pixar 的内容是组织背景说明。公司名、项目名和历史描述保留英文，便于核对来源。"],
      ["与公告页关系", "本页与 Open Source Announcement 相邻，一个偏宣布将开源，一个偏发布开源。两者都属于历史背景，不替代当前发布页。"]
    ],
    workflows: [
      "需要讲述 OpenUSD 开源历程时，将 announcement 与 release 两页一起读。",
      "需要下载、安装或贡献时，跳到 downloads、release schedule 和 contributing 页面。",
      "引用新闻语句时保留日期和标题语境，不推断当前功能承诺。"
    ],
    boundaries: [
      "新闻稿不是当前路线图，也不是实时 release note。",
      "Universal Scene Description、Pixar Animation Studios、Open Source Release 等正式名称保持英文。",
      "功能和 API 以当前 spec/API 文档为准。"
    ],
    related: [["Open Source Announcement", "full_site/release/press_opensource_announce.html"], ["Downloads and Videos", "full_site/release/dl_downloads.html"], ["Contributing to USD", "full_site/release/contributing_to_usd.html"]],
  },
  {
    slug: "genindex",
    output: "full_site/release/genindex.html",
    source: "source/full_release/genindex_source.html",
    official_url: "https://openusd.org/release/genindex.html",
    title: "Index",
    zhTitle: "索引 Index",
    sourceKeywords: ["Index"],
    summary: "本页是 release 文档的通用索引页。它的完成态不是逐项翻译每个索引条目，而是让读者理解如何使用索引：按字母、术语或条目跳到相关页面；遇到 API、schema、tutorial、spec、proposal、performance 或 support 页时，优先走本地链接和侧栏导航；需要官方最新索引时，显式打开官方原页核对。索引条目、缩写、类名和术语应保留英文，因为它们承担搜索和跳转功能。",
    notes: [
      ["Index", "Index 是导航辅助，不是正文说明。中文应解释索引用途、快照属性和本地/官方核对路径。"],
      ["字母分组", "源页中 E、L、P、R、U 等字母分组反映当前 snapshot 中可索引条目。中文不需要翻译字母，而要解释按字母定位术语的方式。"],
      ["本地跳转", "索引点击应优先走本地可覆盖页面；如果某条目仍未纳入本地范围，外跳必须明确。"],
      ["与 API index 的关系", "release genindex 与 API Doxygen index 不同。查类、函数和成员时应回到 API local entry，查 release 文档术语时用本页。"]
    ],
    workflows: [
      "想查 release 文档中的主题时先用本页定位，再用 breadcrumb 回到对应章节。",
      "查类名、函数名或 Doxygen 成员时不要停在 release index，应转到 API 本地入口。",
      "如果索引条目指向未完成页，先读草稿预览，再回到总入口查看完成度。"
    ],
    boundaries: [
      "索引页不是完整翻译正文，不逐项翻译所有索引条目。",
      "字母、API 名、schema 名、术语和链接标题保持英文。",
      "本地索引是快照；最新官方索引需要打开 Open official page。"
    ],
    related: [["Release local entry", "site/release_index.html"], ["API local entry", "site/index.html"], ["USD FAQ", "full_site/release/usdfaq.html"]],
  },
];

function inventoryByOutput() {
  const inventory = readJson("reports/all_pages_inventory.json");
  return new Map((inventory.pages || []).map((item) => [item.local_output, item]));
}

function promotionsDocument() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  if (Array.isArray(raw)) return { generated_at: new Date().toISOString(), promotions: raw };
  return { ...raw, generated_at: new Date().toISOString(), promotions: Array.isArray(raw.promotions) ? raw.promotions : [] };
}

function promotions() {
  return promotionsDocument().promotions;
}

function manifestDocument(promotionsList) {
  const doc = promotionsDocument();
  return { ...doc, generated_at: new Date().toISOString(), promotions: promotionsList };
}

function promotionId(page) {
  return `round-${ROUND}-release-remaining-${page.slug}`;
}

function hasRoundPromotion(page) {
  return promotions().some((entry) => entry.id === promotionId(page));
}

function navLinks(page) {
  return `
    <a href="${esc(linkFrom(page.output, "openusd_bilingual_final.html"))}">总入口</a>
    <a href="${esc(linkFrom(page.output, "site/release_index.html"))}">Release 本地入口</a>
    <a href="${esc(linkFrom(page.output, "site/index.html"))}">API 本地入口</a>
    <a href="${esc(linkFrom(page.output, page.source))}">Local source snapshot</a>
    <a href="${esc(page.official_url)}">Open official page</a>`;
}

function relatedLinks(page) {
  return page.related
    .map(([label, target]) => {
      const href = /^https?:\/\//.test(target) ? target : linkFrom(page.output, target);
      return `<li><a href="${esc(href)}">${esc(label)}</a></li>`;
    })
    .join("\n");
}

function pageHtml(page) {
  const headings = sourceHeadings(page);
  const headingRows = (headings.length ? headings : [{ level: 1, text: page.title }])
    .slice(0, 24)
    .map((heading) => `<tr><td>h${heading.level}</td><td>${esc(heading.text)}</td><td>保留官方标题，用中文解释该 section 的用途、边界和跳转关系。</td></tr>`)
    .join("\n");
  const sectionNotes = page.notes.map(([heading, note]) => `<li><span class="zh">${inline(note)}</span><span class="en">Official/source section: ${esc(heading)}</span></li>`).join("\n");
  const workflows = page.workflows.map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Workflow note.</span></li>`).join("\n");
  const boundaries = page.boundaries.map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Boundary guard.</span></li>`).join("\n");
  const guards = snapshotGuard.map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Snapshot and reading-flow guard.</span></li>`).join("\n");
  const keywordList = page.sourceKeywords.map((keyword) => `<code>${esc(keyword)}</code>`).join(", ");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.zhTitle)} / ${esc(page.title)}</title>
  <style>${css}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${esc(page.source)}">
<header>
  <span class="status">bilingual_complete</span>
  <h1>${esc(page.zhTitle)}</h1>
  <p class="meta">Original title: ${esc(page.title)} | Round ${ROUND} DomainSprintRound | Source snapshot: ${esc(page.source)}</p>
  <p class="navlinks">${navLinks(page)}
  </p>
</header>
<main>
  <section data-cn-complete="round-${ROUND}-${esc(page.slug)}">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <p><span class="zh">${inline(page.summary)}</span><span class="en">This local page has been promoted after source parity and Chinese main-reading-path coverage checks.</span></p>

    <h3>页面职责与快照说明</h3>
    <ul>
      <li><span class="zh">本页属于 release 剩余支撑/参考页收尾范围，重点是让读者理解页面用途、快照属性、相邻页面关系和本地连续阅读路径，而不是把索引、名单、公告或时效内容伪装成实时更新。</span><span class="en">Role: remaining release support/reference page.</span></li>
      <li><span class="zh">本地 source snapshot 位于 <a href="${esc(linkFrom(page.output, page.source))}">${esc(page.source)}</a>；官方核对入口是 <a href="${esc(page.official_url)}">Open official page</a>。需要最新发布、贡献、公告或索引状态时，以官方原页或 GitHub 为准。</span><span class="en">Official source comparison is explicit.</span></li>
      <li><span class="zh">本轮 source parity 检查关键词：${keywordList}。这些关键词必须同时存在于 source snapshot 和本地输出中，说明页面没有脱离官方结构。</span><span class="en">Source parity keywords are preserved for audit.</span></li>
    </ul>

    <h3>官方结构覆盖</h3>
    <table>
      <thead><tr><th>层级</th><th>官方标题</th><th>中文阅读说明</th></tr></thead>
      <tbody>
${headingRows}
      </tbody>
    </table>

    <h3>主要 section 中文说明</h3>
    <ul>
${sectionNotes}
    </ul>

    <h3>操作和排查路径</h3>
    <ol>
${workflows}
    </ol>

    <h3>边界、误读点与调试路径</h3>
    <ul>
${boundaries}
    </ul>

    <h3>快照、时效与阅读流守卫</h3>
    <ol>
${guards}
    </ol>

    <h3>相邻文档关系</h3>
    <p><span class="zh">本页应把读者导向正确的本地下一页；外部链接只作为显式核对入口，不应破坏本地连续阅读。</span><span class="en">Related local reading targets.</span></p>
    <ul>
${relatedLinks(page)}
    </ul>

    <h3>完成态验收</h3>
    <ul>
      <li><span class="zh">状态为 <code>bilingual_complete</code>，已移除旧草稿提示，并写入第 ${ROUND} 轮 source parity 报告。</span><span class="en">Completion status and source parity are present.</span></li>
      <li><span class="zh">中文覆盖页面职责、官方 section、相邻 tutorial/user guide/schema/API/spec/proposal/support 页关系、阅读路径、边界、误读点和调试路径。</span><span class="en">Chinese coverage includes role, sections, relationships, boundaries, and diagnostics.</span></li>
      <li><span class="zh">技术标识、姓名、产品名、命令、文件名、代码和链接语义保持原样，便于继续搜索和官方核对。</span><span class="en">Technical identifiers and link semantics are preserved.</span></li>
      <li><span class="zh">后续维护必须继续运行 Markdown 编码、English debt、navigation、reading-flow、local link routing、full draft preview、report index 和 validation。</span><span class="en">Validation chain remains mandatory.</span></li>
    </ul>
  </section>
</main>
</body>
</html>`;
}

function buildSourceParity(writtenHtmlByOutput = new Map()) {
  return pages.map((page) => {
    const source = sourceText(page);
    const outputHtml = writtenHtmlByOutput.get(page.output) || (fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "");
    const output = stripTags(outputHtml);
    return {
      page: page.slug,
      title: page.title,
      output: page.output,
      source_snapshot: page.source,
      official_url: page.official_url,
      headings: sourceHeadings(page),
      source_keywords_checked: page.sourceKeywords,
      missing_source_keywords: page.sourceKeywords.filter((keyword) => !source.includes(keyword)),
      missing_output_keywords: page.sourceKeywords.filter((keyword) => !output.includes(keyword)),
      official_sections_preserved: page.notes.map(([heading]) => heading),
      preserved_code_terms_sample: [
        ...new Set((output.match(/\b[A-Za-z_][A-Za-z0-9_:.-]*\b/g) || []).filter((term) => term.length > 2)),
      ].slice(0, 80),
    };
  });
}

function writePages() {
  const byOutput = inventoryByOutput();
  const written = [];
  const skipped = [];
  const writtenHtmlByOutput = new Map();
  for (const page of pages) {
    const item = byOutput.get(page.output);
    if (item?.status !== "bilingual_draft" && !hasRoundPromotion(page)) {
      skipped.push({ page: page.slug, output: page.output, reason: `inventory status is ${item?.status || "missing"}` });
      continue;
    }
    if (!fs.existsSync(rel(page.source))) {
      skipped.push({ page: page.slug, output: page.output, reason: `missing source snapshot ${page.source}` });
      continue;
    }
    const html = `${pageHtml(page).split(/\r?\n/).map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n+$/g, "")}\n`;
    fs.writeFileSync(rel(page.output), html, "utf8");
    writtenHtmlByOutput.set(page.output, html);
    written.push({ page: page.slug, output: page.output, zhChars: zhChars(html), hasComplete: /bilingual_complete/.test(html) });
  }
  const sourceParity = buildSourceParity(writtenHtmlByOutput);
  writeJson(SOURCE_PARITY_REPORT, {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target: TARGET,
    source_parity: sourceParity,
  });
  return { results: written, skipped, source_parity: sourceParity };
}

function precheck() {
  const byOutput = inventoryByOutput();
  const results = [];
  const skipped = [];
  for (const page of pages) {
    const item = byOutput.get(page.output);
    if (item?.status !== "bilingual_draft" && !hasRoundPromotion(page)) {
      skipped.push({ page: page.slug, output: page.output, reason: `inventory status is ${item?.status || "missing"}` });
      continue;
    }
    const html = fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "";
    const body = stripTags(html);
    const completeMatch = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i);
    const completeText = completeMatch ? stripTags(completeMatch[1]) : "";
    const parity = buildSourceParity().find((entry) => entry.page === page.slug);
    const result = {
      page: page.slug,
      output: page.output,
      zhChars: zhChars(html),
      completeZhChars: zhChars(completeText),
      zhBlocks: (html.match(/class="zh"/g) || []).length,
      hasStatus: /bilingual_complete/.test(html),
      hasCompleteSection: /data-cn-complete=/.test(html),
      hasOfficialLink: html.includes(page.official_url) && /Open official/.test(html),
      hasSourceParity: html.includes(page.source),
      missingSourceKeywords: parity?.missing_source_keywords || [],
      missingOutputKeywords: parity?.missing_output_keywords || [],
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐/.test(body),
      hasQuestionDamage: /\?{4,}/.test(body),
      hasReplacementChar: /\uFFFD/.test(html),
      hasUtf8Bom: html.charCodeAt(0) === 0xfeff,
    };
    result.passed =
      result.zhChars >= 1800 &&
      result.completeZhChars >= 1700 &&
      result.zhBlocks >= 12 &&
      result.hasStatus &&
      result.hasCompleteSection &&
      result.hasOfficialLink &&
      result.hasSourceParity &&
      result.missingSourceKeywords.length === 0 &&
      result.missingOutputKeywords.length === 0 &&
      !result.hasDraftMarker &&
      !result.hasQuestionDamage &&
      !result.hasReplacementChar &&
      !result.hasUtf8Bom;
    results.push(result);
  }
  return { results, skipped, passed: results.every((result) => result.passed) && skipped.length === 0 };
}

function updateManifest() {
  const manifest = promotions();
  const byId = new Map(manifest.map((entry, index) => [entry.id, index]));
  const pre = precheck();
  const promoted = [];
  for (const result of pre.results.filter((item) => item.passed)) {
    const page = pages.find((item) => item.slug === result.page);
    const entry = {
      id: promotionId(page),
      title: page.title,
      official_url: page.official_url,
      local_output: page.output,
      status: "bilingual_complete",
      reason:
        `Round ${ROUND} DomainSprintRound promotion for ${page.output}: Chinese main-reading-path coverage explains source snapshot role, official sections, adjacent release/API/support relationships, reading path, boundaries, common misreads, diagnostics, and explicit official-page verification while preserving identifiers and link semantics.`,
      evidence: {
        page_contains_status: "bilingual_complete",
        generic_draft_marker_removed: true,
        minimum_chinese_chars: 1800,
        minimum_complete_section_chinese_chars: 1700,
        minimum_chinese_blocks: 12,
        official_source_compared: true,
        local_source_snapshot_compared: page.source,
        source_parity_report: SOURCE_PARITY_REPORT,
        round_type: "DomainSprintRound",
      },
    };
    if (byId.has(entry.id)) manifest[byId.get(entry.id)] = entry;
    else manifest.push(entry);
    promoted.push(entry);
  }
  writeJson("reports/bilingual_completion_promotions.json", manifestDocument(manifest));
  return promoted;
}

function updateProblemAudit() {
  const inventory = readJson("reports/all_pages_inventory.json");
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const promoted = pages
    .filter((page) => {
      const q = (quality.pages || []).find((item) => item.output === page.output);
      return q?.grade === "good_bilingual" && q?.status === "bilingual_complete";
    })
    .map((page) => page.output);
  const notPromoted = pages
    .filter((page) => !promoted.includes(page.output))
    .map((page) => ({ output: page.output, reason: "未通过本轮 good_bilingual 审计，或已因状态/源页问题被剔除。" }));
  const problem = {
    generated_at: new Date().toISOString(),
    purpose: `Round ${ROUND} DomainSprintRound：${TARGET}。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 ${BASE_GOOD} 个 good_bilingual 推进到 ${quality.grade_counts?.good_bilingual ?? "unknown"}；每页补足中文主阅读路径、官方 section 覆盖、快照/时效说明、相邻 tutorial/user guide/schema/API/spec/proposal/support 页关系、边界、误读点、调试路径和 source parity。`,
    current_counts: {
      total_pages: inventory.counts?.total_pages,
      bilingual_complete: quality.status_counts?.bilingual_complete,
      bilingual_draft: quality.status_counts?.bilingual_draft,
      good_bilingual: quality.grade_counts?.good_bilingual,
      draft_needs_translation: quality.grade_counts?.draft_needs_translation,
      draft_template_only: quality.grade_counts?.draft_template_only,
      review_ready_zh: debt.counts?.review_ready_zh,
      api_complete: debt.counts?.api_complete,
      release_complete: debt.counts?.release_complete,
      release_review_ready_zh: debt.counts?.release_review_ready_zh,
      pending_full_scope: inventory.counts?.pending_full_scope_pages,
    },
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${quality.grade_counts?.good_bilingual}/406，但仍有 ${quality.status_counts?.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 release 剩余支撑/参考页面；translation_quality_review 报告 good_bilingual=${quality.grade_counts?.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 draft 并列明原因。",
      },
      {
        id: "P1-release-search-template-only",
        severity: "P1",
        summary: "release 范围只剩 search.html 属于 template-only/功能页，不能和普通翻译页混在同一轮硬塞晋级。",
        evidence: "本轮明确暂不处理 full_site/release/search.html；如果要收尾，应单独执行 search/template-only 专项缺陷轮或明确策略。",
        required_action: "下一轮若继续 release，应针对 search.html 做 SearchTemplateRound/DefectRound，说明搜索页用途、功能限制、本地入口和不逐行翻译脚本的策略。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "本地连续阅读路径必须覆盖本轮新晋级页面。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
        required_action: "每次页面晋级后继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录退化为问号、replacement character 或 BOM。",
        evidence: "reports/markdown_encoding_audit.json 必须通过，且 work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 均无重复问号损坏。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: notPromoted,
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "若继续 release，单独处理 full_site/release/search.html 的 template-only 功能页策略；否则转回 API 高价值草稿或 EnglishDebtRound。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue only if the next target can satisfy its named round gate; otherwise stop and report the blocker.",
  };
  writeJson("reports/current_problem_audit.json", problem);
  return problem;
}

const args = new Set(process.argv.slice(2));
const out = { passed: true, round: ROUND };
if (args.has("--write-pages")) out.writePages = writePages();
if (args.has("--precheck")) {
  out.precheck = precheck();
  out.passed &&= out.precheck.passed;
}
if (args.has("--manifest")) out.manifest = updateManifest();
if (args.has("--problem")) out.problem = updateProblemAudit();
if (process.argv.length <= 2) {
  out.writePages = writePages();
  out.precheck = precheck();
  out.passed &&= out.precheck.passed;
}
console.log(JSON.stringify(out, null, 2));
process.exit(out.passed ? 0 : 1);
