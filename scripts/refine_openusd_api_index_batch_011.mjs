import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-011";

const refinements = [
  {
    output: "full_site/api/classes.html",
    title: "Class Index",
    notes: [
      "Class Index 是 Doxygen 生成的全局类/结构体索引页，适合用来从类型名快速跳转到具体 API 文档，而不是按正文段落连续阅读。",
      "本页混合了 Ar、Arch、Hd、Sdf、Tf、Usd、Vt、Vdf 等多个模块的类型；阅读时应优先按命名空间或模块前缀定位目标，而不是逐项翻译类名。",
      "索引中的 ArAsset、ArResolver、ArResolverContext 等条目指向 asset resolution 相关 API；HdSceneIndexObserver、HdSt 等条目偏 Hydra/渲染索引。",
      "中文层只说明索引用法和模块辨识方式，所有类名、模板名和嵌套类型名保持英文原样，便于搜索和与官方 API 对照。"
    ],
    terms: [
      ["Class Index", "类索引"],
      ["Doxygen", "Doxygen 文档生成器"],
      ["namespace", "命名空间"],
      ["class documentation", "类文档"],
      ["nested type", "嵌套类型"]
    ]
  },
  {
    output: "full_site/api/deprecated.html",
    title: "Deprecated List",
    notes: [
      "Deprecated List 汇总已弃用的成员、类型和函数，主要用于迁移旧代码和识别不应继续新增依赖的 API。",
      "本页应和具体类/成员页面一起读：索引告诉你哪些 API 已弃用，具体页面通常说明替代 API、兼容性原因或过渡路径。",
      "例如 ArAssetInfo::repoPath、ArResolver::IsRepositoryPath、CustomUsdPhysicsTokens 等条目代表不同模块的历史接口；中文说明保留完整符号名。",
      "使用该页时不要机械删除旧 API 调用，应先确认当前 OpenUSD 版本、替代方法和项目兼容性要求，再安排迁移。"
    ],
    terms: [
      ["Deprecated List", "弃用 API 列表"],
      ["backward compatibility", "向后兼容"],
      ["replacement API", "替代 API"],
      ["member", "成员"],
      ["migration", "迁移"]
    ]
  },
  {
    output: "full_site/api/files.html",
    title: "File List",
    notes: [
      "File List 是已记录头文件和源文件的索引页，适合从文件名进入模块级 API 文档，尤其适合查找基础库、插件接口和生成 schema 的入口。",
      "当前摘录从 pxr/base/arch 相关文件开始，涵盖 memory alignment、function attributes、daemon process、debugger、demangle、system errors、symbol visibility 等底层工具。",
      "本页链接中大量 `_source.html` 目标属于源码浏览页，当前策略是低优先处理源码页；普通头文件页面和模块入口页更适合作为中文导读对象。",
      "中文层解释文件索引的导航方式，不翻译 align.h、daemon.h、debugger.h、demangle.h 等文件名，也不改动官方链接文本。"
    ],
    terms: [
      ["File List", "文件索引"],
      ["documented files", "已记录文件"],
      ["header file", "头文件"],
      ["source page", "源码浏览页"],
      ["symbol visibility", "符号可见性"]
    ]
  },
  {
    output: "full_site/api/functions_a.html",
    title: "Class Members - A",
    notes: [
      "functions_a.html 是 class members 字母索引的一页，用于查找以 A 或本页区段覆盖字符开头的成员、类型别名和相关条目。",
      "该页包含 SdfPath、TfType、UsdPhysicsJointDrive、UsdGeomTokensType、TraceCollection::Visitor、VdfInputSpec、UsdUITokensType 等跨模块条目。",
      "这类 Doxygen 索引页的价值在于反向查找：当你只记得成员名或类型名片段时，可从字母索引跳到所属类文档。",
      "中文说明不翻译符号名，也不尝试解释每个成员的语义；后续若需要详细解释，应进入具体 class 或 member 页面。"
    ],
    terms: [
      ["Class Members", "类成员索引"],
      ["member index", "成员索引"],
      ["type alias", "类型别名"],
      ["cross-module entries", "跨模块条目"],
      ["symbol lookup", "符号查找"]
    ]
  },
  {
    output: "full_site/api/functions_b.html",
    title: "Class Members - B",
    notes: [
      "functions_b.html 同样是 class members 字母索引页，本页摘录集中在模板容器、范围视图、执行器数据管理器和并行执行相关类型。",
      "SdfChildrenView、SdfListProxy、TfSmallVector、TfSpan、VtArray 等条目通常用于理解 USD 容器、视图和列表代理结构。",
      "VdfDataManagerHashTable、VdfParallelExecutorEngine、VdfParallelSpeculationExecutorEngine 等条目偏 Vdf 执行/并行求值系统，适合从这里跳转到具体类。",
      "该页不适合逐项翻译；中文层只补充导航和模块识别方式，保留模板参数、尖括号和完整英文符号。"
    ],
    terms: [
      ["template container", "模板容器"],
      ["list proxy", "列表代理"],
      ["parallel executor", "并行执行器"],
      ["data manager", "数据管理器"],
      ["template parameter", "模板参数"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、导航策略和术语对照；英文页面名、链接、API 符号、模板参数、代码和原文摘录继续保留，便于和官方 API 文档核对。</p>
      <p class="en">This section adds Chinese-first index usage notes, navigation guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, API symbols, template parameters, code, and source excerpts for comparison with the official API documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
