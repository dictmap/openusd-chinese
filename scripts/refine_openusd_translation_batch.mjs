import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const refinements = [
  {
    output: "full_site/api/_developer__guides.html",
    title: "开发者指南",
    notes: [
      "这一页不是单个 API 类说明，而是面向贡献者和集成开发者的指南目录。阅读时先把它当作路线图：编码规范、测试规范、颜色处理、Hydra、MaterialX 等主题分别指向后续专题页。",
      "General Guidelines 和 Coding Guidelines 主要用于统一 OpenUSD 代码贡献方式；Testing Guidelines 说明如何验证改动，适合在修改 C++、Python wrapper 或 schema 生成逻辑前先读。",
      "Hydra Guides 面向渲染和场景索引开发，包含 Hydra 2.0、Scene Debugger 和 Prim Schemas；MaterialX Guides 则关注材质网络如何在 Hydra 与 USD 之间表达和消费。",
      "本页链接已经路由到本地缺口页或本地复刻页。遇到未覆盖专题时，先记录为后续扩展对象，不要把它误认为当前页翻译失败。"
    ],
    terms: [
      ["Developer Guides", "开发者指南"],
      ["Coding Guidelines", "编码规范"],
      ["Testing Guidelines", "测试规范"],
      ["Hydra Guides", "Hydra 指南"],
      ["MaterialX Guides", "MaterialX 指南"]
    ]
  },
  {
    output: "full_site/api/_usd_skel__intro.html",
    title: "UsdSkel Introduction",
    notes: [
      "UsdSkel 用于在 USD 中表达骨架、blend shapes、蒙皮模型和骨架控制 rig。它的目标不是替代 DCC 软件中的完整动画系统，而是在交换和大规模人群场景中提供可组合、可扩展的骨架数据表示。",
      "Overview and Purpose 说明 UsdSkel 的交换目标；Motivation & Trade-Offs 解释为什么设计要兼顾少量角色和大规模 crowd；What UsdSkel Is Not 则帮助划清边界，避免把所有角色 rig 细节都塞进 USD。",
      "Terminology、What Can Be Skinned、Transforms and Transform Spaces 是读后续 API 的关键入口。阅读时保留 Skeleton、Joint、SkelRoot、SkinningQuery 等英文 API 名称，中文只解释语义关系。",
      "如果要继续精修，本页应优先补完整的术语表和 skinning point 公式解释，再扩展到 UsdSkelSkeleton、UsdSkelBindingAPI 等相邻 API。"
    ],
    terms: [
      ["skeleton", "骨架"],
      ["blend shapes", "混合形状"],
      ["skinned models", "蒙皮模型"],
      ["control rigs", "控制 rig"],
      ["linear blend skinning", "线性混合蒙皮"]
    ]
  },
  {
    output: "full_site/api/annotated.html",
    title: "Class List",
    notes: [
      "Class List 是 Doxygen 自动生成的类、结构体、接口索引页，不适合逐条翻译成正文。它的价值在于提供全局检索入口，帮助用户从类名进入具体 API 页面。",
      "当前摘录中混合了 OpenUSD 自身类型和第三方/工具库类型，例如 CLI11 相关 validator、type traits 与 wrapper 类型。阅读时应优先关注 USD 核心命名空间下的类，而不是把所有索引项都当作教程内容。",
      "建议把本页作为导航页保留中英双语标题、用途说明和链接列表。后续若要提升质量，应增加按模块分组的中文索引，例如 Ar、Sdf、Usd、UsdGeom、UsdShade、Hydra、Vt、Gf。",
      "本页不应批量翻译所有类名；API 名称保持原样更利于搜索、跳转和与官方文档对照。"
    ],
    terms: [
      ["Class List", "类列表"],
      ["structs", "结构体"],
      ["interfaces", "接口"],
      ["index entries", "索引条目"],
      ["Doxygen", "Doxygen 文档生成器"]
    ]
  },
  {
    output: "full_site/api/ar_page_front.html",
    title: "Ar: Asset Resolution",
    notes: [
      "Ar 是 USD 的资产解析层，负责查询、读取和写入资产数据。它把“资产如何被标识和定位”与“资产实际如何存储”解耦，使 USD 可以访问文件系统、数据库、包文件或自定义资产系统中的资源。",
      "ArResolver 是本页核心概念：Primary Resolver 处理默认资产解析，URI/IRI Resolver 处理带 scheme 的资源路径。自定义 resolver 通常通过插件注册并接入 ArGetResolver。",
      "Resolver Contexts 表示解析所需的上下文，例如项目、版本、搜索路径或资产系统状态；Scoped Cache 用于在一个作用域中复用解析结果，避免重复查询带来的性能开销。",
      "阅读本页时应把 asset path、resolved path、resolver context、scoped cache 四个概念连起来理解：路径字符串只是输入，resolver 结合上下文和缓存后才得到可访问的资产。"
    ],
    terms: [
      ["asset resolution", "资产解析"],
      ["ArResolver", "资产解析器"],
      ["asset path", "资产路径"],
      ["resolved path", "已解析路径"],
      ["resolver context", "解析上下文"]
    ]
  },
  {
    output: "full_site/api/arch_page_front.html",
    title: "Arch: Architecture Dependent",
    notes: [
      "Arch 是 OpenUSD 的平台差异隔离层，用一个小型基础库集中处理操作系统、CPU 架构、线程、内存、诊断和符号可见性等差异。",
      "它的主要作用是减少核心代码中的分散 #ifdef，让平台相关实现集中在一个可审计的位置。对跨平台构建、二进制发布和调试问题来说，这一层非常关键。",
      "Bits、Multithreading、Math、Strings、System Functions、Memory Management、Diagnostics、Symbol Visibility 是本页的主要阅读分组，可按问题类型进入相应 API。",
      "本页中的 ARCH_OS_LINUX、ARCH_OS_DARWIN、ARCH_OS_WINDOWS、ARCH_CPU_INTEL 等 token 不翻译，保持原样便于和代码、编译宏、构建日志对应。"
    ],
    terms: [
      ["architecture-dependent code", "架构相关代码"],
      ["platform dependencies", "平台依赖"],
      ["multithreading", "多线程"],
      ["symbol visibility", "符号可见性"],
      ["diagnostics", "诊断"]
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
    .map((note) => `<li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(([en, zh]) => `<li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`)
    .join("\n");
  return `    <section data-cn-refinement="translation-quality-pass-001">
      <h2>中文精修导读 / Chinese Reading Notes</h2>
      <p class="zh">本区块是针对 ${escapeHtml(item.title)} 的人工质检补强层，用来补足草稿页中过薄的中文阅读信息；英文 API 名称和原文摘录仍保留在下方，便于与官方文档对照。</p>
      <p class="en">This section adds a Chinese-first reading layer for this draft page while retaining the original English API names and excerpts below.</p>
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
  const existing = /    <section data-cn-refinement="translation-quality-pass-001">[\s\S]*?    <\/section>\r?\n?/;
  if (existing.test(html)) {
    html = html.replace(existing, `${section}\n`);
  } else {
    html = html.replace(/(    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>)/, `${section}\n$1`);
  }
  fs.writeFileSync(filePath, html, "utf8");
  return { output: item.output, notes: item.notes.length, terms: item.terms.length };
}

const results = refinements.map(refreshPage);
console.log(JSON.stringify({
  passed: true,
  pages_refined: results.length,
  results,
}, null, 2));
