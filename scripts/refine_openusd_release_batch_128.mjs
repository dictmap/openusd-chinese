import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-entry-quality-pass-128";

const refinements = [
  {
    output: "full_site/api/_developer__guides.html",
    title: "Developer Guides",
    summary:
      "`Developer Guides` 是面向贡献者、集成开发者和渲染/材质扩展作者的指南目录页。它的作用是把 coding、testing、color、Hydra、MaterialX 等专题串成路线图；读者应把它当作导航入口，而不是单个 API 类参考。",
    notes: [
      "`General Guidelines`、`Coding Guidelines for OpenUSD` 和 `Testing Guidelines for OpenUSD` 应一起阅读：前者给出贡献方向，后两者分别约束代码风格、测试边界和提交前验证方式。",
      "`Programmer's Guide to Color in OpenUSD` 关注颜色空间、color management 和渲染一致性；如果改动 shader、display color 或 imaging 代码，应把它和 Hydra/MaterialX 指南交叉核对。",
      "`Hydra 2.0 Getting Started Guide`、`Hydra Scene Debugger` 与 `Hydra Prim Schemas` 指向渲染索引和场景调试路径，适合 render delegate、scene index、prim schema 开发者优先阅读。",
      "`MaterialX In Hydra and USD Architecture Guide` 说明 MaterialX 材质网络如何在 USD 与 Hydra 之间传递；阅读时保留 `MaterialX`、`Hydra`、`USD` 等英文技术名，避免翻译后影响搜索。",
      "本页链接若指向清单外专题，会按本地策略进入 `site/uncovered_openusd_page.html`；这代表当前 406 页复刻范围未覆盖该专题，不代表本页导航失败。",
    ],
    terms: [
      ["Developer Guides", "开发者指南"],
      ["Coding Guidelines", "编码规范"],
      ["Testing Guidelines", "测试规范"],
      ["Hydra Scene Debugger", "Hydra 场景调试器"],
      ["Hydra Prim Schemas", "Hydra prim schema"],
      ["MaterialX Architecture Guide", "MaterialX 架构指南"],
    ],
  },
  {
    output: "full_site/api/_usd_skel__intro.html",
    title: "UsdSkel Introduction",
    summary:
      "`UsdSkel Introduction` 解释 USD 中骨架、关节、蒙皮、blend shapes 和 skel binding 的基础模型。它不是完整角色动画系统手册，而是说明 OpenUSD 如何表示可交换、可组合、可实例化的骨架动画数据。",
    notes: [
      "`Overview and Purpose` 与 `Motivation & Trade-Offs` 说明 UsdSkel 的目标：在少量高质量角色和大规模 crowd 场景之间取得可扩展折中，而不是保存 DCC 中所有 rig 控制细节。",
      "`What UsdSkel Is Not` 是边界段落，提醒读者不要把 solver、constraint、muscle system 或完整 control rig 期望直接塞进 USD schema。",
      "`Terminology`、`What Can Be Skinned?`、`Transforms and Transform Spaces` 是后续 API 的关键前置概念；`Skeleton`、`Joint`、`SkelRoot`、`SkinningQuery` 等 API 名称应保持英文原样。",
      "`Skinning a Point (Linear Blend Skinning)` 里的公式和权重语义应和 `jointIndices`、`jointWeights`、bind pose、rest transform 一起理解；中文说明只解释关系，不改写数学符号。",
      "继续深入时可转向 `UsdSkelSkeleton`、`UsdSkelBindingAPI`、`UsdSkelAnimation` 和 `UsdSkelCache` 等 class 页面，分别核对数据模式、绑定关系和查询缓存。",
    ],
    terms: [
      ["UsdSkel", "UsdSkel 骨架模块"],
      ["Skeleton", "骨架"],
      ["Joint", "关节"],
      ["SkelRoot", "骨架根 prim"],
      ["linear blend skinning", "线性混合蒙皮"],
      ["bind pose", "绑定姿态"],
    ],
  },
  {
    output: "full_site/api/annotated.html",
    title: "Class List",
    summary:
      "`annotated.html` 是 Doxygen 生成的 Class List，列出类、结构体、union 和 interface 的简短描述。它和 `classes.html` 类索引相近，但更强调 brief description；适合按类型名或模块前缀定位目标文档。",
    notes: [
      "本页混合 OpenUSD 核心类型、测试 helper、CLI11 wrapper、type traits 和第三方工具类型；阅读时应先按 `Ar`、`Sdf`、`Usd`、`Hd`、`Tf`、`Vt`、`Gf` 等前缀筛选。",
      "摘录中的 `Attribute accessor`、`Computation value specifier`、`Metadata value specifier`、`Prim accessor`、`Relationship accessor` 属于 Exec/computation 语境，应和普通 USD attribute 概念区分。",
      "`App`、`AppFriend`、`ArgumentMismatch` 一类条目可能来自测试或 CLI 工具层；不要因为它们在 Class List 中出现就把它们误认为 OpenUSD 核心 scene API。",
      "Class List 的中文层只负责解释导航策略和模块辨识方式，不批量翻译类名；保留英文类型名更利于搜索、编译错误对照和官方文档交叉引用。",
      "后续精修如果继续处理 class 页面，应优先选择高频核心类，如 `SdfLayer`、`SdfPath`、`UsdStage`、`UsdPrim`、`HdSceneDelegate`，而不是低价值测试 helper。",
    ],
    terms: [
      ["Class List", "类列表"],
      ["brief description", "简短描述"],
      ["interface", "接口"],
      ["type traits", "类型 traits"],
      ["module prefix", "模块前缀"],
      ["target documentation", "目标文档页"],
    ],
  },
  {
    output: "full_site/api/ar_page_front.html",
    title: "Ar: Asset Resolution",
    summary:
      "`Ar: Asset Resolution` 是 OpenUSD 资产解析层入口，说明 `ArResolver` 如何把 authored asset path、URI/IRI、resolver context 和 scoped cache 组合成可访问的 resolved asset。它是理解 package、resolver plugin 和资产定位策略的核心页面。",
    notes: [
      "`ArResolver` 是核心抽象：Primary Resolver 处理默认路径和项目规则，URI/IRI Resolver 处理带 scheme 的资源标识；自定义 resolver 通常通过插件系统注册并由 `ArGetResolver()` 访问。",
      "`Asset Path Resolution` 区分 authored asset path、resolved path 和资产系统中的实际存储位置；字符串路径本身不是最终结果，必须经过 resolver 和 context 求值。",
      "`Resolver Contexts` 表示项目、版本、搜索路径或资产数据库状态等解析条件；同一 asset path 在不同 context 下可能解析到不同 resolved path。",
      "`Resolver Scoped Caches` 用于在作用域内复用解析结果，减少重复查询和 I/O；使用时要理解缓存生命周期，避免把临时上下文结果误当作全局事实。",
      "`Asset Paths and Resolved Paths` 是调试资产加载问题的关键边界：日志中看到的 authored path、identifier 和 resolved path 应分别记录，不能混用。",
    ],
    terms: [
      ["asset resolution", "资产解析"],
      ["ArResolver", "ArResolver 资产解析器"],
      ["authored asset path", "作者写入的资产路径"],
      ["resolved path", "已解析路径"],
      ["resolver context", "解析器上下文"],
      ["scoped cache", "作用域缓存"],
    ],
  },
  {
    output: "full_site/api/arch_page_front.html",
    title: "Arch: Architecture Dependent",
    summary:
      "`Arch: Architecture Dependent` 是 OpenUSD 的平台差异隔离层，把操作系统、CPU、线程、内存、诊断、系统函数和符号可见性封装到小型基础库中。它的价值是减少核心代码里分散的 `#ifdef`，并让跨平台行为集中可审计。",
    notes: [
      "`Bits`、`Math` 和 `Strings` 分组偏基础工具，处理位模式、数值转换和字符串/编码问题；阅读时应保留底层函数名和宏名，便于与 C++ 代码对应。",
      "`Multithreading`、`System Functions` 与 `Memory Management` 涉及线程、进程、文件描述符、虚拟内存和 allocator 行为；这些条目常用于定位跨平台构建或运行时差异。",
      "`Diagnostics` 覆盖 debugger attach、trap、abort 和错误诊断路径；当 OpenUSD 在不同平台崩溃方式不同，Arch 层通常是第一批检查对象。",
      "`Symbol Visibility` 说明动态库导出、宏和可见性策略；`ARCH_OS_LINUX`、`ARCH_OS_DARWIN`、`ARCH_OS_WINDOWS`、`ARCH_CPU_INTEL` 等 token 必须保持原样。",
      "本页不是用户场景描述 API，而是工程基础设施入口；如果问题来自 schema、composition 或 rendering，只有涉及平台差异时才需要回到 Arch 层核对。",
    ],
    terms: [
      ["architecture-dependent code", "架构相关代码"],
      ["platform dependencies", "平台依赖"],
      ["multithreading", "多线程"],
      ["memory management", "内存管理"],
      ["diagnostics", "诊断"],
      ["symbol visibility", "符号可见性"],
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
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
  results,
}, null, 2));
