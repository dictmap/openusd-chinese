import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-quality-pass-012";

const refinements = [
  {
    output: "full_site/api/functions_~.html",
    title: "Class Members - Symbols and Destructor-like Entries",
    notes: [
      "functions_~.html 是 class members 索引中的符号段，主要覆盖以下划线、波浪号或实现细节前缀开头的成员与类型条目；它更像反向查找表，不是连续阅读正文。",
      "本页摘录里出现 _SdrFilesystemDiscoveryPlugin、HdStVBO* memory manager、ArResolverScopedCache、TfMallocTag::Auto 等条目，读者应按模块前缀判断所属子系统。",
      "以 Ar 开头的条目通常关联 asset resolution 与解析上下文；以 HdSt、Hgi、Vdf、Ef 开头的条目更偏 Hydra、执行图、缓存或底层运行时结构。",
      "这些条目里包含大量内部类、嵌套类型和模板实例；中文层只解释索引用法与模块辨识方式，不翻译符号名，也不改动双冒号、下划线或模板参数。"
    ],
    terms: [
      ["Class Members", "类成员索引"],
      ["symbol section", "符号段索引"],
      ["nested type", "嵌套类型"],
      ["scoped cache", "作用域缓存"],
      ["memory manager", "内存管理器"]
    ]
  },
  {
    output: "full_site/api/functions_c.html",
    title: "Class Members - C",
    notes: [
      "functions_c.html 汇总 class members 中 C 段附近的条目，用于从成员名、嵌套类型或数据结构名跳回具体类文档。",
      "本页包含 PcpNamespaceEdits、TraceEventList、HdBasisCurvesTopology、ExecIrControllerBuilder、UsdCollectionAPI、UsdColorSpaceAPI 等跨模块入口。",
      "Pcp 条目偏 composition 与 namespace edits；Trace 条目用于性能跟踪事件；Hd/Hydra 条目多与渲染索引和拓扑数据有关。",
      "如果目标条目在 406 清单内，链接会跳本地复刻页；清单外条目会跳本地 uncovered 提示页，而不是直接离开到官方英文站。"
    ],
    terms: [
      ["composition", "组合"],
      ["namespace edits", "命名空间编辑"],
      ["trace event", "跟踪事件"],
      ["topology", "拓扑"],
      ["collection API", "集合 API"]
    ]
  },
  {
    output: "full_site/api/functions_d.html",
    title: "Class Members - D",
    notes: [
      "functions_d.html 的摘录集中出现 GfMatrix*、GfVec*、TfSmallVector、TfSpan、TfToken、VtArray 等数学与容器类型，是查找基础数据结构的入口。",
      "Gf 前缀通常代表 graphics foundation 数学类型，例如矩阵、向量、区间和四元数；数字与后缀 d/f/h/i 表示维度或数值精度。",
      "Tf 与 Vt 条目多是 USD runtime 的基础设施：token、span、小型向量、数组和类型擦除容器等都通过这些索引定位到具体说明。",
      "阅读本页时应保留英文符号完整性，例如 GfMatrix4f、VtArray&lt;ELEM&gt; 和 TfSpan&lt;T&gt;；中文只补充用途和查找策略。"
    ],
    terms: [
      ["graphics foundation", "图形基础库"],
      ["matrix", "矩阵"],
      ["vector", "向量"],
      ["runtime container", "运行时容器"],
      ["numeric precision", "数值精度"]
    ]
  },
  {
    output: "full_site/api/functions_e.html",
    title: "Class Members - E",
    notes: [
      "functions_e.html 覆盖 E 段附近的 class members，摘录中同时出现 UsdTimeCode、SdfNamespaceEditDetail、VdfIsolatedSubnetwork、Ef* executor/cache 条目。",
      "UsdTimeCode 指向时间采样与动画值的核心类型；Sdf/Pcp namespace edit 相关条目用于理解路径重命名、移动和层级编辑的底层结果。",
      "Ef 与 Vdf 条目偏执行求值系统，涉及 output value cache、page cache、masked sub-executor、time input node 等运行时结构。",
      "这类索引页适合在已知符号片段时快速定位，不适合作为概念教程；真正的语义解释应继续进入对应 class 或 module front page。"
    ],
    terms: [
      ["time code", "时间码"],
      ["namespace edit detail", "命名空间编辑细节"],
      ["isolated subnetwork", "隔离子网络"],
      ["output value cache", "输出值缓存"],
      ["executor", "执行器"]
    ]
  },
  {
    output: "full_site/api/functions_f.html",
    title: "Class Members - F",
    notes: [
      "functions_f.html 的条目横跨 token tables、matrix 类型、schema registry、Sdf file format、Sdr shader discovery 和 Hydra imaging data source 映射。",
      "UsdGeomTokensType、UsdShadeTokensType、UsdVolTokensType 等 token table 通常代表 schema 生成代码中的稳定 token 集合，名称不应翻译或改写。",
      "SdfFileFormat、SdfLayer、SdfUsdzFileFormat 等条目帮助定位 layer/file format 相关 API；SdrShaderNodeDiscoveryResult 则偏 shader registry 与插件发现流程。",
      "本页的中文层重点提示模块归属和高频用途；链接文本、模板形参、双冒号命名和官方英文摘录保持原样，便于继续搜索。"
    ],
    terms: [
      ["token table", "token 表"],
      ["schema registry", "schema 注册表"],
      ["file format", "文件格式"],
      ["shader discovery", "shader 发现"],
      ["data source mapping", "数据源映射"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、模块辨识和术语对照；英文页面名、API 符号、模板参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index usage notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
