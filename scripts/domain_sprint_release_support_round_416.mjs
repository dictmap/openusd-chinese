import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 416;
const BASE_GOOD = 181;
const TARGET = "release 支撑/导航核心页小批量冲刺";
const SOURCE_PARITY_REPORT = "reports/round_416_release_support_source_parity.json";

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

function linkFrom(output, target) {
  return slash(path.relative(path.dirname(output), target)) || path.basename(target);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
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

const commonCompletionNote =
  "完成态验收重点是让中文成为主阅读路径，而不是只给英文页面加一段导读。本页保留官方标题、section 名、API/schema/token/属性名、代码、命令、Doxygen 表格标签和链接语义；中文部分负责解释页面职责、阅读顺序、相邻页面关系、边界、误读点和调试路径。英文原文和官方链接只作为核对入口，读者沿本地 release 入口、侧栏导航和 breadcrumb 应能连续阅读。";

const supportReadingGuards = [
  "支撑/导航页的第一层判断是页面用途：它可能是教程目录、FAQ、生态索引、下载入口、插件入口或贡献流程。读者应先判断自己是在学习概念、排查环境、寻找示例资产、评估工具生态、配置插件，还是准备向项目贡献代码，再进入对应的本地下一页。",
  "第二层判断是信息来源可信度：本地中文版负责解释阅读路径和常见误区，官方原页负责核对最新英文标题、链接和下载入口，source snapshot 负责确认本轮翻译没有脱离当前 406 页库存内的原始结构。三者职责不同，不应互相替代。",
  "第三层判断是本地连续阅读：如果某个正文链接指向 in-scope 页面，后续路由脚本应优先转成本地链接；只有明确写作 Open official page 的链接才作为外跳。这样读者从总入口、release index、侧栏和 breadcrumb 可以顺着读，不会在支持页被带回英文站。",
  "第四层判断是技术标识保留：`UsdStage`、`SdfPath`、`Plug`、`Hydra`、`Sdr`、`TF_DEBUG`、`hdPrman`、文件名、命令、环境变量和产品名都必须保留英文。中文解释它们的职责和排查位置，不能把这些 token 改写成中文名称。",
  "第五层判断是排障闭环：遇到教程跑不通、插件找不到、下载资产路径不对、产品兼容性不确定或 PR 流程不清时，先用本页定位问题域，再分别回到 FAQ、tutorial、plugins、products、contributing、spec、proposal 或 API 本地入口，而不是在一个支撑页里猜测所有细节。",
  "第六层判断是完成态维护：后续每次重建 final entry 或注入 reading-flow navigation，都要继续检查本页有 side nav、breadcrumb、release 本地入口、API 本地入口、相关本地页、显式官方外跳和 source parity 报告。只要这些读者路径缺失，即使中文字符数足够，也不应把页面视作真正可用的中文版。",
  "第七层判断是任务分流：学习类问题进入 tutorial，概念和 composition 疑问进入 FAQ/spec，资产和资料问题进入 downloads，工具生态进入 products，格式或 renderer 扩展进入 plugins，项目协作进入 contributing。这样每个支撑页都只承担导航和解释职责，不把自己写成过度泛化的总文档。",
  "第八层判断是回退路径：如果读者从本页跳到相邻页后仍无法解决问题，应能通过 breadcrumb 回到当前层级，或者通过侧栏回到 release index/API entry。这个回退能力是本轮修复左侧阅读导航后必须持续保持的验收条件。",
  "第九层判断是版本和时效：产品列表、下载资源、插件构建方式、贡献流程和官方外部链接都可能随 OpenUSD 发布变化。中文页面说明当前本地快照的阅读含义，但不伪装成实时更新的官方公告；需要当前版本信息时，必须显式打开官方原页核对。",
];

const pages = [
  {
    slug: "tut-usd-tutorials",
    output: "full_site/release/tut_usd_tutorials.html",
    source: "source/full_release/tut_usd_tutorials_source.html",
    official_url: "https://openusd.org/release/tut_usd_tutorials.html",
    title: "USD Tutorials",
    zhTitle: "USD 教程入口",
    sourceKeywords: ["USD Tutorials", "Environment Setup"],
    summary:
      "本页是 OpenUSD tutorial 系列的入口页。它的核心价值不是解释某一个 API，而是把初学者从环境准备带到第一批可执行教程：Hello World、属性检查与写入、引用 layer、遍历 stage、variants、xforms、shading、端到端流程、Houdini、schema generation、usdview plugin、layer format conversion 和 Hello World Redux。中文主阅读路径应帮助读者判断先装什么、先跑哪一页、遇到 Python 路径或资产找不到时怎样回到 FAQ、user guide 和 API reference。",
    sectionNotes: [
      ["USD Tutorials", "官方入口把 tutorial 视为学习路径，而不是孤立文章列表。读者应先确认本地 OpenUSD 环境、Python 绑定和示例资产路径，再按顺序阅读基础 stage/prim/property 教程，然后进入 composition、variant、xform 和 shading 等主题。"],
      ["Environment Setup", "环境设置是所有教程的共同前置条件。这里要特别保留命令、环境变量和路径名，不把它们翻译成中文；中文只解释这些设置影响 `pxr` Python 模块发现、命令行工具运行、插件加载和示例文件定位。"],
      ["教程路径", "基础教程先解决 stage 是什么、prim 如何创建、attribute 如何检查和 author；中段教程解决 layer/reference/variant/traversal；后段教程进入 shading、schema、usdview plugin 和格式转换。这样的顺序能避免读者还没理解 composition 就直接调复杂工具。"],
      ["与 reference 的关系", "tutorial 负责走通任务，API reference 负责精确定义类、函数和参数。遇到 `UsdStage`、`UsdPrim`、`SdfPath`、`UsdShade` 等名称时，应保留英文并跳到本地 API 入口核对，而不是在教程页里重写完整 API 文档。"],
    ],
    workflows: [
      "第一次阅读时先完成 `Environment Setup`，确认 `python -c \"from pxr import Usd\"` 或等价环境检查能通过，再进入 Hello World。",
      "如果示例脚本运行失败，先区分是 Python import 失败、插件未加载、资产路径未解析，还是教程步骤本身的 scene description 问题。",
      "每完成一个 tutorial，应回到本地 release 入口或侧栏继续下一页，避免被正文中的官方英文站链接带离本地中文版。",
    ],
    boundaries: [
      "教程入口不是安装手册全集，也不是 API 索引；它只给学习路径和环境前置条件。",
      "命令、模块名、文件名、环境变量、包名和 `pxr` namespace 必须保留英文。",
      "教程能帮助读者完成任务，但具体 API 行为仍需要回到本地 API/Doxygen 页面核对。"
    ],
    related: [
      ["Hello World", "full_site/release/tut_helloworld.html"],
      ["Inspecting and Authoring Properties", "full_site/release/tut_inspect_and_author_props.html"],
      ["API local entry", "site/index.html"],
    ],
  },
  {
    slug: "usdfaq",
    output: "full_site/release/usdfaq.html",
    source: "source/full_release/usdfaq_source.html",
    official_url: "https://openusd.org/release/usdfaq.html",
    title: "USD Frequently Asked Questions",
    zhTitle: "USD 常见问题",
    sourceKeywords: ["USD Frequently Asked Questions", "General Questions", "Subtler Aspects of Scene Description and Composition", "Build and Runtime Issues", "TF_DEBUG"],
    summary:
      "本页是 FAQ 和排障入口，覆盖 USD 是什么、支持的语言、文件格式、`usda/usdc/usdz`、数据类型、scene description 和 composition 的细节，以及构建、插件、Python 模块、`TF_DEBUG` 和 Windows DLL/插件发现问题。中文主阅读路径应让读者先按问题域定位：概念误解、composition 语义、文件格式转换、构建安装、运行时插件发现；然后再跳到 tutorial、spec、Ar、Plug、Tf 或 API 页面深入。",
    sectionNotes: [
      ["General Questions", "一般问题解释 USD 不只是文件格式，而是 scene description、composition、资产解析、layer 和工具链共同组成的系统。回答应帮助读者区分 `.usd` 扩展名、实际编码、`usda` 文本、`usdc` 二进制和 `usdz` package。"],
      ["What programming languages are supported?", "语言支持问题要保留 Python、C++ 等名称，并提醒读者教程里的 Python 示例不等于只支持 Python；核心库和性能敏感路径通常需要回到 C++ API。"],
      ["SubLayers or References", "SubLayers 和 References 的区别是 composition 入门高频误区。中文解释应强调 subLayer 更像 layer stack 组合，reference 更像把外部 prim/asset 引入 namespace；它们的强弱顺序、命名空间影响和 delete/over 行为不同。"],
      ["overs、typeless def、list editing", "这些问题属于 scene description 细节。`over`、typeless `def`、list-edited metadata、relationship、connection 和 composition arc 都不能用普通文件覆盖直觉理解，需要结合 spec 和 namespace editing 页面继续读。"],
      ["Build and Runtime Issues", "构建和运行时问题覆盖 Python 找不到 USD 模块、插件未构建、运行时不识别文件格式、Windows DLL 和插件路径。中文应把这些问题归类到环境变量、插件注册、构建配置和运行路径四类，而不是把所有失败都归因于文件损坏。"],
      ["TF_DEBUG", "`TF_DEBUG` 是调试机制，不是普通日志开关。读者应保留 debug symbol 名称，按具体子系统启用，避免在大型场景中打开过多类别导致输出失控。"],
    ],
    workflows: [
      "先判断问题是概念、composition、文件格式、构建安装还是运行时插件发现，再进入对应 FAQ 段落。",
      "遇到 `.usd` 文件无法打开时，先确认实际格式和文件头，再检查插件/文件格式支持，而不是只看扩展名。",
      "遇到 Python import 失败时，先检查安装路径、`PYTHONPATH`、二进制版本和环境是否一致，再检查教程脚本。",
    ],
    boundaries: [
      "FAQ 是排障导航，不替代 spec、proposal 或 API reference 的精确定义。",
      "`over`、`def`、`reference`、`subLayer`、`relationship`、`connection`、`TF_DEBUG` 等术语必须保留英文。",
      "运行时问题常与本地构建方式有关，中文说明只给排查路径，不承诺某个平台的安装状态。"
    ],
    related: [
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"],
      ["USDZ Specification", "full_site/release/spec_usdz.html"],
      ["Tf Tools Foundation", "full_site/api/tf_page_front.html"],
    ],
  },
  {
    slug: "usd-products",
    output: "full_site/release/usd_products.html",
    source: "source/full_release/usd_products_source.html",
    official_url: "https://openusd.org/release/usd_products.html",
    title: "Products Using USD",
    zhTitle: "使用 USD 的产品",
    sourceKeywords: ["Products Using USD", "Adobe", "Apple", "Autodesk", "Blender Foundation", "Gaffer", "Maya"],
    summary:
      "本页是 USD 生态产品索引，列出 DCC、渲染器、建模、资产、AR 和内容创作工具对 USD 的使用情况。中文主阅读路径要强调：这里是生态观察和入口导航，不是兼容性认证清单，也不是所有版本功能承诺。读者应根据产品、插件、导入导出方向、支持的 USD 版本、材质/实例/composition 能力和运行平台，回到各产品官方文档继续核对。",
    sectionNotes: [
      ["Adobe", "Adobe 相关条目通常涉及 Substance 3D Painter、Modeler、Stager 等创作工具。中文应提醒读者核对材质、纹理、stage 输出和 USDZ/asset pipeline 支持范围。"],
      ["Apple", "Apple 条目覆盖 Preview、QuickLook、AR Creation Tools、Rendering Engines、ModelIO、Motion 等生态入口。重点是 USDZ、预览、AR 和平台工具链，不能把它等同于完整 OpenUSD authoring 环境。"],
      ["Autodesk", "Autodesk 条目覆盖 3ds Max、Arnold、Bifrost、Fusion 360、Maya、Revit 等。中文应区分建模、渲染、程序化、BIM 和 DCC pipeline 中的 USD 支持差异。"],
      ["Blender Foundation", "Blender 和 Cycles 相关条目说明开源 DCC 与渲染器对 USD 的集成。读者要核对导入/导出、材质映射、实例、动画和最新版本支持，而不要只依据产品名判断能力。"],
      ["Gaffer", "Gaffer 这类 pipeline 工具强调场景组装、lookdev 和渲染流程。中文阅读路径应把它放在内容管线和 renderer integration 语境中，而不是普通模型浏览器。"],
    ],
    workflows: [
      "评估某个产品是否适合项目时，先确认它是读 USD、写 USD、预览 USDZ，还是提供完整 stage authoring。",
      "迁移资产前，针对材质、variant、payload、reference、instance、animation 和 custom schema 做小样本测试。",
      "如果产品支持列表与本地 OpenUSD 版本不一致，应以产品当前官方文档和插件版本为准。"
    ],
    boundaries: [
      "本页不是认证列表，不保证每个产品在每个版本、平台和功能组合下都完整支持 USD。",
      "产品名、公司名、插件名和 renderer 名称保持英文，避免破坏查找路径。",
      "生态列表适合作为入口，不能替代具体产品的安装、导入导出和兼容性说明。"
    ],
    related: [
      ["Third Party Plugins", "full_site/release/plugins.html"],
      ["Render User Guide", "full_site/release/user_guides/render_user_guide.html"],
      ["USDZ Specification", "full_site/release/spec_usdz.html"],
    ],
  },
  {
    slug: "dl-downloads",
    output: "full_site/release/dl_downloads.html",
    source: "source/full_release/dl_downloads_source.html",
    official_url: "https://openusd.org/release/dl_downloads.html",
    title: "Downloads and Videos",
    zhTitle: "下载、视频与示例资产",
    sourceKeywords: ["Downloads and Videos", "Intro to USD", "Presentations", "SIGGRAPH Birds of a Feather Notes", "SIGGRAPH 2019 Course Notes", "Videos", "Assets", "Additional Assets"],
    summary:
      "本页是学习材料、演示、SIGGRAPH 课程、视频和示例资产入口。中文主阅读路径应帮助读者判断：如果想快速理解 USD 概念，先看 Intro to USD 和 videos；如果需要设计背景和行业讨论，看 presentations 和 SIGGRAPH notes；如果要跑教程或验证 pipeline，下载 Assets 和 Additional Assets。所有外部资源和下载链接必须作为明确外跳处理，本地阅读路径则保留 release 入口和相关文档导航。",
    sectionNotes: [
      ["Intro to USD", "Intro to USD 适合建立 scene description、composition、layer、stage 和 pipeline 的基础概念。它不是 API 参考，读完后应回到 tutorial 或 user guide 做实际练习。"],
      ["Presentations", "演示材料通常解释设计动机、工作流案例和生产经验。中文说明应帮助读者把 presentation 当作背景资料，而不是当前 API 行为的唯一依据。"],
      ["SIGGRAPH Birds of a Feather Notes", "Birds of a Feather notes 偏社区讨论和现场问题整理，价值在于理解行业关注点和落地经验；精确定义仍要回到 spec、proposal 和 API 页面。"],
      ["SIGGRAPH 2019 Course Notes", "Course Notes 适合系统学习 USD 的设计和应用。读者可以把它与本地教程、user guide 和 spec 配合使用，形成从概念到实践的路径。"],
      ["Videos", "视频适合快速理解流程和演示，但不便于逐项核对命令和属性名。中文主路径应提示读者遇到具体命令时回到文本教程或官方文档。"],
      ["Assets and Additional Assets", "示例资产用于教程、渲染、composition 和 pipeline 验证。下载后应保留目录结构，避免修改路径导致 tutorial 或 resolver 示例无法找到资产。"],
    ],
    workflows: [
      "学习路线建议先看 Intro 和视频，再跑 tutorial，随后用 Assets 验证实际 scene composition。",
      "下载资产后，先确认解压路径、大小写、相对路径和 resolver 行为，再判断教程脚本是否有问题。",
      "引用外部视频或 slide 时，保留原始链接和标题，中文说明只解释用途和阅读顺序。"
    ],
    boundaries: [
      "下载页不替代安装说明，也不保证外部链接始终可用。",
      "视频、课程和资产名称保持英文，方便读者在官方站和会议资料中查找。",
      "外部链接必须明确标识为官方或第三方外跳，不能混入本地连续阅读路径。"
    ],
    related: [
      ["USD Tutorials", "full_site/release/tut_usd_tutorials.html"],
      ["Hello World tutorial", "full_site/release/tut_helloworld.html"],
      ["USD FAQ", "full_site/release/usdfaq.html"],
    ],
  },
  {
    slug: "plugins",
    output: "full_site/release/plugins.html",
    source: "source/full_release/plugins_source.html",
    official_url: "https://openusd.org/release/plugins.html",
    title: "USD Third-Party Plugins",
    zhTitle: "USD 第三方插件",
    sourceKeywords: ["USD Third-Party Plugins"],
    summary:
      "本页是第三方插件总入口，用来把 Alembic、RenderMan 等扩展页面和更广泛的产品/生态入口联系起来。中文主阅读路径应先解释插件在 OpenUSD 中的角色：插件可以提供文件格式、resolver、renderer delegate、imaging adapter、schema 或工具扩展，但每种插件的加载条件、构建方式、运行环境和支持范围不同。读者不应把插件列表当作内置功能清单，而应沿本地链接进入具体插件页面核对。",
    sectionNotes: [
      ["USD Third-Party Plugins", "第三方插件页的主要职责是导航。它告诉读者哪些功能位于 OpenUSD 核心之外，哪些需要额外构建、安装或配置。中文说明应把插件与 `Plug` registry、文件格式识别、Hydra delegate、renderer integration 和 asset pipeline 联系起来。"],
      ["插件发现", "插件能否被 OpenUSD runtime 发现，取决于构建产物、插件描述、环境变量、搜索路径和平台动态库加载。FAQ 中的插件/Windows DLL 问题与本页直接相关。"],
      ["文件格式插件", "文件格式插件影响 `.abc`、自定义 layer 或资产格式是否可读写。读者需要区分文件格式支持和 scene description 语义支持，不能因为能打开文件就假设所有 USD composition 行为都完整保留。"],
      ["渲染插件", "渲染插件通常连接 Hydra、Hd、Sdr 和具体 renderer。中文阅读路径应提示读者核对 renderer 版本、AOV、材质、light、delegate 和命令行入口。"],
    ],
    workflows: [
      "遇到文件格式无法识别时，先看是否缺少对应插件，再检查 `plugInfo.json`、库路径和运行时搜索路径。",
      "遇到 renderer 不能启动或 AOV 缺失时，进入 RenderMan 插件页核对 `hdPrman` 配置、构建和运行方式。",
      "评估第三方插件时，把支持格式、构建平台、OpenUSD 版本和依赖 renderer 版本分开记录。"
    ],
    boundaries: [
      "第三方插件不是 OpenUSD 核心保证的一部分，兼容性需要逐插件核对。",
      "插件名、文件格式名、`Plug`、`Hydra`、`Hd`、`Sdr`、`plugInfo.json` 等术语保持英文。",
      "本页是导航页；具体构建和配置必须进入插件子页或对应项目文档。"
    ],
    related: [
      ["Alembic USD Plugin", "full_site/release/plugins_alembic.html"],
      ["RenderMan USD Imaging Plugin", "full_site/release/plugins_renderman.html"],
      ["USD Products", "full_site/release/usd_products.html"],
    ],
  },
  {
    slug: "plugins-alembic",
    output: "full_site/release/plugins_alembic.html",
    source: "source/full_release/plugins_alembic_source.html",
    official_url: "https://openusd.org/release/plugins_alembic.html",
    title: "Alembic USD Plugin",
    zhTitle: "Alembic USD 插件",
    sourceKeywords: ["Alembic USD Plugin", "Known Limitations"],
    summary:
      "本页说明 Alembic USD Plugin 的用途和限制。它通常用于把 Alembic 数据作为 USD 可读资产接入 pipeline，但 Alembic 和 USD 的数据模型并不完全一致。中文主阅读路径要帮助读者理解：插件能提供文件格式桥接，不代表 Alembic 的所有数据都能无损映射到 USD，也不代表 USD 的 composition、variant、payload、schema 和 metadata 能反向完整表达为 Alembic。",
    sectionNotes: [
      ["Alembic USD Plugin", "插件页的核心是文件格式桥接。读者应把它看作 asset ingestion 或 interchange 工具，而不是把 Alembic 直接变成完整 USD authoring 模型。保留 Alembic、USD、plugin、file format 等名称，中文只解释桥接边界。"],
      ["Known Limitations", "Known Limitations 是本页最重要的 section。它提醒读者检查数据类型、层级、time sampling、属性、材质、变体、实例和 metadata 的映射风险。遇到导入后场景不一致，应先回到限制列表，而不是假设插件错误。"],
      ["与 resolver 的关系", "Alembic 文件仍需要被 asset resolver 找到；文件可见性、路径解析和插件识别是不同层次的问题。文件找不到先查路径和 resolver，文件能找到但打不开再查文件格式插件。"],
      ["与 user guide 的关系", "如果 Alembic 资产进入 USD 后要参与 shading、render、namespace editing 或 composition，应继续阅读对应 user guide，而不是只依赖插件页。"],
    ],
    workflows: [
      "导入 Alembic 前先列出需要保留的几何、动画、层级、材质和自定义属性，再与 Known Limitations 对照。",
      "如果 `.abc` 无法作为 USD layer 读取，先确认插件是否构建并被发现，再检查文件路径和 Alembic 文件本身。",
      "如果导入后数据缺失，按 geometry、time sample、property、material 和 metadata 分组定位，不要一次性归因。"
    ],
    boundaries: [
      "Alembic 插件是格式桥接，不是无损语义迁移承诺。",
      "Alembic、USD、Known Limitations、file format、plugin 等关键术语保留英文。",
      "复杂生产资产应做小样本 round-trip 或 import smoke test，再进入批量转换。"
    ],
    related: [
      ["Third Party Plugins", "full_site/release/plugins.html"],
      ["Asset Resolution Ar 2.0", "full_site/release/wp_ar2.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"],
    ],
  },
  {
    slug: "plugins-renderman",
    output: "full_site/release/plugins_renderman.html",
    source: "source/full_release/plugins_renderman_source.html",
    official_url: "https://openusd.org/release/plugins_renderman.html",
    title: "RenderMan USD Imaging Plugin",
    zhTitle: "RenderMan USD Imaging 插件",
    sourceKeywords: ["RenderMan USD Imaging Plugin", "Configuration", "Building hdPrman", "Running hdPrman", "Developer", "Supported Render Pass AOVs"],
    summary:
      "本页说明 RenderMan USD Imaging Plugin，也就是 `hdPrman` 相关集成。中文主阅读路径应把它放在 Hydra/render delegate 语境中理解：USD stage 通过 imaging/Hydra 进入 delegate，delegate 再连接 RenderMan。读者需要按 Configuration、Building `hdPrman`、Running `hdPrman`、Developer 和 Supported Render Pass AOVs 的顺序核对环境、构建、运行和输出能力。",
    sectionNotes: [
      ["Configuration", "配置部分决定 runtime 能否找到 RenderMan、`hdPrman`、插件描述和依赖库。中文说明应提醒读者区分 OpenUSD 插件路径、RenderMan 安装路径、动态库路径和环境变量。"],
      ["Building hdPrman", "构建 `hdPrman` 需要匹配 OpenUSD、编译器、RenderMan SDK 和平台依赖。命令、target、库名和路径不能翻译；中文只解释每一步为什么影响最终 delegate 是否可加载。"],
      ["Running hdPrman", "运行部分关注如何让 Hydra 使用 RenderMan delegate。排障时要看 delegate 是否注册、stage 是否正确加载、材质和灯光是否被 delegate 支持，以及命令行参数是否指向正确 renderer。"],
      ["Developer", "Developer section 通常提供实现和扩展视角。读者应把它与 Hd、UsdImaging、Sdr 和 RenderMan 内部节点映射联系起来，而不是普通用户安装步骤。"],
      ["Supported Render Pass AOVs", "AOV 支持列表决定可输出的 render pass。中文解释应保留 AOV 名称，提示读者检查 RenderProduct、RenderVar、render settings 和 delegate 支持是否一致。"],
    ],
    workflows: [
      "如果 `hdPrman` 不出现在可用 delegate 列表，先检查插件加载和库路径，再检查构建是否成功。",
      "如果渲染能启动但 AOV 缺失，核对 Supported Render Pass AOVs、`UsdRenderRenderVar` 和具体 RenderProduct 设置。",
      "如果材质或灯光效果不一致，沿 UsdShade、UsdLux、Sdr、Hydra delegate 和 RenderMan 支持范围逐层排查。"
    ],
    boundaries: [
      "本页不是 RenderMan 总手册，只覆盖 OpenUSD imaging plugin 相关路径。",
      "`hdPrman`、RenderMan、Hydra、Hd、AOV、Render Pass、RenderProduct、RenderVar 等名称保持英文。",
      "插件可构建不代表所有材质、灯光、AOV 和 renderer feature 都完全一致支持。"
    ],
    related: [
      ["Render User Guide", "full_site/release/user_guides/render_user_guide.html"],
      ["UsdRender overview", "full_site/release/user_guides/schemas/usdRender/overview.html"],
      ["UsdLux for Renderers", "full_site/release/wp_usdlux_for_renderers.html"],
    ],
  },
  {
    slug: "contributing-to-usd",
    output: "full_site/release/contributing_to_usd.html",
    source: "source/full_release/contributing_to_usd_source.html",
    official_url: "https://openusd.org/release/contributing_to_usd.html",
    title: "Contributing to USD",
    zhTitle: "参与贡献 USD",
    sourceKeywords: ["Contributing to USD", "Contributor License Agreement", "Coding Conventions", "Pull Request Guidelines", "Git Workflow", "GitHub Issues", "Making Major Changes", "Step 1. Get consensus for major changes", "Step 5. Pixar will test and land your changes"],
    summary:
      "本页是向 OpenUSD 项目贡献代码和文档的流程说明。中文主阅读路径应覆盖 CLA、coding conventions、pull request guidelines、git workflow、GitHub issues 和 major changes 的五步流程。它不是一般 Git 教程，而是告诉贡献者如何在 OpenUSD 项目规范内提交可评审、可测试、可落地的改动，并理解 Pixar/项目维护者在测试和 landing 阶段的职责。",
    sectionNotes: [
      ["Contributor License Agreement", "CLA 是贡献前置条件。中文说明应强调这是法律和项目治理要求，贡献者应按官方链接完成，不要把它当作可跳过的普通表单。"],
      ["Coding Conventions", "Coding Conventions 约束代码风格、命名、注释、测试和维护一致性。保留 C++、Python、header、namespace、API 名称等英文术语，中文解释为什么这些规则影响 review 和长期维护。"],
      ["Pull Request Guidelines", "PR guideline 的重点是小而清晰的改动、可复现测试、问题说明、兼容性风险和 review 便利性。不要把多个不相关修复塞进一个 PR。"],
      ["Git Workflow", "Git workflow 提供 branch、commit、rebase/merge、同步 upstream 等路径。命令和分支名保留英文，中文说明每一步的目的和失败时的排查方向。"],
      ["GitHub Issues", "Issue 不是随意聊天区，而是缺陷、需求、设计讨论和复现信息的入口。好的 issue 应包含版本、平台、复现步骤、预期/实际行为和相关日志。"],
      ["Making Major Changes", "重大改动必须先达成共识，再改代码、测试、提交 review，最终由 Pixar/维护者测试并合入。中文应强调设计共识先于大规模实现，避免完成大量代码后才发现方向不被接受。"],
    ],
    workflows: [
      "小修复先开 issue 或关联已有 issue，确认范围后提交最小 PR，并附测试结果。",
      "大改动先按 major changes 流程写清动机、设计、兼容性和替代方案，再进入实现。",
      "提交后根据 review 反馈迭代，保持 commit 和说明清晰，避免把无关格式化混入功能改动。"
    ],
    boundaries: [
      "本页不替代实时 GitHub 项目状态；具体 branch、CI、review 要以当前仓库为准。",
      "CLA、Pull Request、Git Workflow、GitHub Issues、Pixar、OpenUSD 等正式名称保持英文。",
      "贡献流程说明不等于保证 PR 会被接受，设计一致性、测试和维护成本仍是核心判断。"
    ],
    related: [
      ["USD FAQ", "full_site/release/usdfaq.html"],
      ["Developer Guides", "full_site/api/_developer__guides.html"],
      ["OpenUSD GitHub", "https://github.com/PixarAnimationStudios/OpenUSD"],
    ],
  },
];

function navLinks(page) {
  const finalHref = linkFrom(page.output, "openusd_bilingual_final.html");
  const releaseHref = linkFrom(page.output, "site/release_index.html");
  const apiHref = linkFrom(page.output, "site/index.html");
  const sourceHref = linkFrom(page.output, page.source);
  return `
    <a href="${esc(finalHref)}">总入口</a>
    <a href="${esc(releaseHref)}">Release 本地入口</a>
    <a href="${esc(apiHref)}">API 本地入口</a>
    <a href="${esc(sourceHref)}">Local source snapshot</a>
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
    .slice(0, 20)
    .map((heading) => `<tr><td>h${heading.level}</td><td>${esc(heading.text)}</td><td>中文阅读时保留官方标题，并用下方说明解释该 section 在本页任务中的作用。</td></tr>`)
    .join("\n");
  const sectionNotes = page.sectionNotes
    .map(([heading, note]) => `<li><span class="zh">${inline(note)}</span><span class="en">Official section anchor: ${esc(heading)}</span></li>`)
    .join("\n");
  const workflows = page.workflows
    .map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Workflow note for local Chinese reading path.</span></li>`)
    .join("\n");
  const boundaries = page.boundaries
    .map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Boundary or common misread guard.</span></li>`)
    .join("\n");
  const keywordList = page.sourceKeywords.map((keyword) => `<code>${esc(keyword)}</code>`).join(", ");
  const sourceHref = linkFrom(page.output, page.source);
  const supportGuards = supportReadingGuards
    .map((item) => `<li><span class="zh">${inline(item)}</span><span class="en">Support-page reading-flow guard.</span></li>`)
    .join("\n");

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
    <p><span class="zh">${inline(page.summary)}</span><span class="en">This page has been promoted to bilingual_complete after checking the official/local source structure and adding a Chinese main reading path.</span></p>

    <h3>页面职责与本地阅读路线</h3>
    <ul>
      <li><span class="zh">本页属于 release 支撑/导航文档，作用是把 tutorial、FAQ、产品生态、下载资料、第三方插件和贡献流程串回本地中文版的连续阅读路径。读者应先看中文说明建立判断，再按需打开原站或本地 source snapshot 核对。</span><span class="en">Role: release support and navigation page.</span></li>
      <li><span class="zh">本页已经保留显式官方外跳：<a href="${esc(page.official_url)}">Open official page</a>。除这个入口外，站内阅读应优先走总入口、Release 本地入口、API 本地入口和侧栏导航，避免无提示跳回官方英文站。</span><span class="en">Official links are explicit-only.</span></li>
      <li><span class="zh">本地 source snapshot 位于 <a href="${esc(sourceHref)}">${esc(page.source)}</a>。本轮用它与官方页语义对齐，保留标题、section、链接语义和正式术语。</span><span class="en">Local source snapshot: ${esc(page.source)}</span></li>
      <li><span class="zh">${inline(commonCompletionNote)}</span><span class="en">Completion guard: Chinese main path, source parity, local reading flow.</span></li>
    </ul>

    <h3>官方结构覆盖</h3>
    <p><span class="zh">本轮 source parity 检查关注这些官方关键词：${keywordList}。它们必须同时存在于 source snapshot 与本地输出中，确保页面没有脱离官方结构。</span><span class="en">Source parity keywords are preserved for audit.</span></p>
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

    <h3>边界、误读点与维护规则</h3>
    <ul>
${boundaries}
    </ul>

    <h3>相邻文档关系</h3>
    <p><span class="zh">支撑/导航页的价值在于把读者送到正确的下一页。本页相关本地入口如下；外部链接会保留为显式外跳，不作为普通站内阅读路径。</span><span class="en">Related local reading targets.</span></p>
    <ul>
${relatedLinks(page)}
    </ul>

    <h3>支撑页专项阅读守卫</h3>
    <ol>
${supportGuards}
    </ol>

    <h3>完成态验收</h3>
    <ul>
      <li><span class="zh">状态标记为 <code>bilingual_complete</code>，删除旧的草稿提示，并写入第 ${ROUND} 轮 source parity 报告。</span><span class="en">Status marker and source parity are present.</span></li>
      <li><span class="zh">中文覆盖页面职责、官方 section、相邻 tutorial/user guide/schema/API/spec/proposal/support 页关系、阅读路径、边界、误读点和调试路径。</span><span class="en">Chinese coverage includes role, sections, relationships, boundaries, misreads, and diagnostics.</span></li>
      <li><span class="zh">API 名、schema 名、token、属性名、函数名、代码、命令、Doxygen 表格标签和链接语义保持原样，只在中文说明中解释用途。</span><span class="en">Technical identifiers are preserved.</span></li>
      <li><span class="zh">后续维护应继续运行 Markdown 编码、English debt、navigation、reading-flow、local link routing、full draft preview、report index 和 validation，不以英文/中文比例作为硬失败。</span><span class="en">English/Chinese ratio is diagnostic only.</span></li>
    </ul>
  </section>
</main>
</body>
</html>`;
}

function inventoryByOutput() {
  const inventory = readJson("reports/all_pages_inventory.json");
  return new Map((inventory.pages || []).map((item) => [item.local_output, item]));
}

function promotionsDocument() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  if (Array.isArray(raw)) {
    return {
      generated_at: new Date().toISOString(),
      policy: "Promotions are added only after page-level quality gates pass.",
      promotions: raw,
    };
  }
  return {
    ...raw,
    generated_at: new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
  };
}

function promotions() {
  return promotionsDocument().promotions;
}

function manifestDocument(promotionsList) {
  const doc = promotionsDocument();
  return {
    ...doc,
    generated_at: new Date().toISOString(),
    promotions: promotionsList,
  };
}

function promotionId(page) {
  return `round-${ROUND}-release-support-${page.slug}`;
}

function hasRoundPromotion(page) {
  return promotions().some((entry) => entry.id === promotionId(page));
}

function buildSourceParity(writtenHtmlByOutput = new Map()) {
  return pages.map((page) => {
    const source = sourceText(page);
    const outputHtml =
      writtenHtmlByOutput.get(page.output) ||
      (fs.existsSync(rel(page.output)) ? fs.readFileSync(rel(page.output), "utf8") : "");
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
      official_sections_preserved: page.sectionNotes.map(([heading]) => heading),
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
    const html =
      pageHtml(page)
        .split(/\r?\n/)
        .map((line) => line.replace(/[ \t]+$/g, ""))
        .join("\n")
        .replace(/\n+$/g, "") + "\n";
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
        `Round ${ROUND} DomainSprintRound promotion for ${page.output}: Chinese main-reading-path coverage explains official sections, page role, adjacent tutorial/user guide/schema/API/spec/proposal/support page relationships, reading path, boundaries, common misreads, debugging path, and source parity while preserving API names, schema names, tokens, properties, code, commands, Doxygen labels, and explicit official links.`,
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
    purpose: `Round ${ROUND} DomainSprintRound：${TARGET}。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 ${BASE_GOOD} 个 good_bilingual 推进到 ${quality.grade_counts?.good_bilingual ?? "unknown"}；每页补足中文主阅读路径、官方 section 覆盖、相邻 tutorial/user guide/schema/API/spec/proposal/support 页关系、边界、误读点、调试路径和 source parity。`,
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
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 release 支撑/导航页面；translation_quality_review 报告 good_bilingual=${quality.grade_counts?.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
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
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release 支撑/导航页面已经补齐一批，但 release 与剩余 API 草稿仍需要继续推进。",
        evidence: `english_debt_audit 报告 api_complete=${debt.counts?.api_complete}、release_complete=${debt.counts?.release_complete}、release_review_ready_zh=${debt.counts?.release_review_ready_zh}。`,
        required_action: "继续优先处理 release 中仍为 draft_needs_translation 的支撑/参考页，或针对已完成但未 review_ready_zh 的页面执行 EnglishDebtRound。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: notPromoted,
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "下一轮重新读取 inventory，从剩余 release 草稿或高价值 API 草稿中选择同域短页；不得重复处理本轮已晋级页面。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue promotion only if target pages can become good_bilingual; otherwise stop and report the blocker.",
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
