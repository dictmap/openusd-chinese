import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-mixed-quality-pass-045";

const refinements = [
  {
    output: "full_site/api/classpxr___c_l_i_1_1_c_l_i_1_1_app.html",
    title: "CLI::App Class Reference",
    notes: [
      "`CLI::App` 用于创建 command line program，默认行为很少，调用方需要显式添加 options、subcommands、help 和 parsing 规则。",
      "英文摘录提示典型使用方式是用 `argc`、`argv` 和 help description 创建 `Program()`/app 实例，再通过 templated `add_option` methods 准备选项。",
      "页面结构中的 `Subcommands`、`Parsing`、`Help`、`Adding options` 是阅读主线；`_parse()`、`_find_subcommand()`、`_move_option()` 等 protected 方法说明内部解析流程。",
      "`startup_mode` 与 `.start` 调用相关：英文摘录提醒在 program 启动前调用 `.start`，避免 help option 或参数评估意外运行主程序。",
      "本页来自 `CLI11.h`，属于 vendored/utility CLI API；阅读时保留 `CLI::App`、`FormatterBase`、`OptionDefaults`、`Config`、`Error` 等类型原名。"
    ],
    terms: [
      ["CLI::App", "CLI::App"],
      ["subcommands", "子命令"],
      ["add_option", "add_option"],
      ["startup_mode", "startup_mode"],
      ["CLI11.h", "CLI11.h"]
    ]
  },
  {
    output: "full_site/api/classpxr__tsl_1_1robin__map.html",
    title: "pxr_tsl::robin_map< Key, T, Hash, KeyEqual, Allocator, StoreHash, GrowthPolicy > Class Template Reference",
    notes: [
      "`pxr_tsl::robin_map` 是基于 open-addressing 与 robin hood hashing algorithm 的 hash map 实现，并使用 backward shift deletion 处理删除后的探测序列。",
      "template 参数 `Key`、`T`、`Hash`、`KeyEqual`、`Allocator`、`StoreHash` 和 `GrowthPolicy` 决定 key/value 类型、散列策略、比较规则、内存分配和增长策略。",
      "页面结构中的 typedefs 如 `key_type`、`mapped_type`、`value_type`、`iterator`、`const_iterator`、`hasher`、`key_equal` 对应标准关联容器接口。",
      "多个 constructor overload 说明该容器支持不同初始 bucket count、allocator、hash/equal/growth policy 或 initializer 输入方式。",
      "`pxr_tsl::rh::power_of_two_growth_policy<2>` 和 `bucket_entry` 是底层实现细节；阅读时应把它看作高性能 utility container，而不是 USD scene description API。"
    ],
    terms: [
      ["robin_map", "robin_map"],
      ["open-addressing", "开放寻址"],
      ["robin hood hashing", "robin hood hashing"],
      ["GrowthPolicy", "GrowthPolicy"],
      ["backward shift deletion", "后移删除"]
    ]
  },
  {
    output: "full_site/api/gf_page_front.html",
    title: "Gf : Graphics Foundations",
    notes: [
      "`Gf` 是 Graphics Foundations 模块，提供图形数学相关的 foundation classes 与 functions，是很多 USD 几何、成像和渲染代码的基础依赖。",
      "英文 Overview 将内容分为 Linear Algebra、Basic Mathematical Operations、Basic Geometry 和 Output For Debugging 四类；阅读模块入口时应先按这四类建立索引。",
      "Linear Algebra 覆盖 vectors、matrices、sizes、ranges、quaternions、dual quaternions 和 transforms 等基本类型，前面已精修过部分 `GfMatrix`、`GfVec`、`GfRange` 页面。",
      "Basic Mathematical Operations 与 Basic Geometry 包含数值函数、插值、包围盒、射线、平面、旋转和投影等工具，常被 higher-level schema 或 imaging code 调用。",
      "本页是模块入口，不是单个 class；后续进入具体 `Gf*` class 页面时，应继续保留数学符号、template 参数和 API 名称原样。"
    ],
    terms: [
      ["Gf", "Gf"],
      ["Graphics Foundations", "Graphics Foundations"],
      ["Linear Algebra", "线性代数"],
      ["Basic Geometry", "基础几何"],
      ["Debugging output", "调试输出"]
    ]
  },
  {
    output: "full_site/api/hd_page_front.html",
    title: "Hd : The Hydra Framework",
    notes: [
      "`Hd` 是 Hydra Framework 的核心模块，用于在 multiple scene graphs 与 multiple renderers 之间建立通信框架。",
      "英文摘录非常短，但关键点是 scene graph 与 renderer 的解耦：`Hd` 定义 render index、scene delegate、data source、task、render buffer 等基础接口。",
      "阅读本页时应把它视为 Hydra API 的模块入口，而不是某个 renderer 实现；具体 Storm/OpenGL 实现会落到 `HdSt`、`Hdx`、`Hgi` 等相关模块。",
      "已经精修过的 `HdTask`、`HdRenderBuffer`、`HdSceneDelegate`、`HdDataSourceLocator` 等页面都属于这一框架的具体组成部分。",
      "本页的 `Developer Guides` 链接应作为补充路线：先理解 Hd 的抽象边界，再跳转到 delegate、render index、task execution 和 data source 细节。"
    ],
    terms: [
      ["Hd", "Hd"],
      ["Hydra Framework", "Hydra Framework"],
      ["scene graph", "场景图"],
      ["renderer", "渲染器"],
      ["scene delegate", "scene delegate"]
    ]
  },
  {
    output: "full_site/api/hd_st_page_front.html",
    title: "HdSt : Rendering functionality for HdStorm",
    notes: [
      "`HdSt` 负责 `HdStorm` Hydra renderer 的 core rendering functionality，是 Hydra 抽象接口之上的 Storm 渲染实现层。",
      "英文 Overview 说明 `HdSt` 可从 Hydra `renderIndex` 拉取数据，数据可能来自多个 scenegraph inputs，并创建一个或多个 command buffers。",
      "`primvar data`、GPU resources、command buffers 和 cached playback 是理解本页的关键词：`HdSt` 既要适应动态变化场景，也要支持缓存播放优化。",
      "阅读本页时应把 `HdSt` 与 `Hd` 区分：`Hd` 是框架抽象，`HdSt` 是 Storm renderer 的实现模块，依赖 Hgi/Hd/Hdx 等底层或邻近组件。",
      "后续具体 class 页面如 `HdStRenderPassState`、`HdStDispatchBuffer` 等会展开 GL/Hgi pipeline、buffer resource 和 render pass 状态。"
    ],
    terms: [
      ["HdSt", "HdSt"],
      ["HdStorm", "HdStorm"],
      ["renderIndex", "renderIndex"],
      ["command buffers", "command buffers"],
      ["primvar data", "primvar data"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、读取重点、关键类型/模块边界和术语对照；英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, reading guidance, key type/module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, math symbols, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
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
