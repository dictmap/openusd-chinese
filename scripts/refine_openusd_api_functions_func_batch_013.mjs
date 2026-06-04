import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-func-quality-pass-013";

const refinements = [
  {
    output: "full_site/api/functions_func_~.html",
    title: "Class Members - Functions - Symbols",
    notes: [
      "functions_func_~.html 是 Doxygen 的函数成员索引符号段，收录以下划线、波浪号或实现细节符号开头的函数、构造/析构相关入口和嵌套 helper 类型。",
      "本页出现 _SdrFilesystemDiscoveryPlugin、HdStVBO* memory manager、ArFilesystemAsset、ArInMemoryAsset、ArResolverContextBinder、ArResolverScopedCache 等条目，横跨 shader discovery、Hydra 内存管理和 asset resolution。",
      "带下划线的类名或成员通常更接近实现细节；阅读时应先确认它是否属于公开 API、插件扩展点，还是 Doxygen 从内部类型生成的索引入口。",
      "中文层不改写 `_`、`::`、模板参数或析构符号；清单内链接继续跳本地页，清单外链接进入本地 uncovered 提示页。"
    ],
    terms: [
      ["function member index", "函数成员索引"],
      ["destructor-like entry", "析构相关入口"],
      ["implementation detail", "实现细节"],
      ["asset resolution", "资产解析"],
      ["shader discovery", "shader 发现"]
    ]
  },
  {
    output: "full_site/api/functions_func_a.html",
    title: "Class Members - Functions - A",
    notes: [
      "functions_func_a.html 是函数成员索引的 A 段，用于按函数名或方法名前缀查找具体类中的成员函数。",
      "本页摘录包含 SdfPath、TraceCollection::Visitor、VdfIndexedWeightsOperand、TfBigRWMutex::ScopedLock、TfPyLock、TfSpinMutex、HgiGLDevice、UsdGeomPointInstancer 等条目。",
      "Tf* scoped lock 与 mutex 条目用于定位线程同步和 Python lock 相关 API；HgiGLDevice 偏图形设备抽象；UsdGeomPointInstancer 属于几何实例化工作流。",
      "如果只记得函数首字母或所属类的局部名称，本页可作为反查入口；真正的参数含义和调用约束仍需要进入对应 class 页面。"
    ],
    terms: [
      ["scoped lock", "作用域锁"],
      ["mutex", "互斥锁"],
      ["point instancer", "点实例化器"],
      ["visitor", "访问器"],
      ["validator", "验证器"]
    ]
  },
  {
    output: "full_site/api/functions_func_b.html",
    title: "Class Members - Functions - B",
    notes: [
      "functions_func_b.html 收录 B 段附近的函数成员入口，摘录集中在容器、视图、数组、样条曲线、缓存和 hash 结构。",
      "SdfChildrenView、SdfListProxy、TfSmallVector、TfSpan、VtArray、TfIterator 等条目通常用于理解 USD 对列表编辑、视图访问和数组数据的封装方式。",
      "Ef_PageCache 与 EfInputValueBlock 偏执行/缓存系统；GlfGLQueryObject、HdDataSourceLocatorSet、PxOsdMeshTopologyValidation 分别关联 GL 查询、Hydra 数据源和拓扑验证。",
      "本页适合做 API 定位，不适合机械逐项翻译；中文说明帮助读者按容器、缓存、渲染和拓扑四类线索继续跳转。"
    ],
    terms: [
      ["children view", "子对象视图"],
      ["list proxy", "列表代理"],
      ["span", "连续视图"],
      ["page cache", "页缓存"],
      ["topology validation", "拓扑验证"]
    ]
  },
  {
    output: "full_site/api/functions_func_c.html",
    title: "Class Members - Functions - C",
    notes: [
      "functions_func_c.html 是 C 段函数成员索引，条目横跨 Pcp、Trace、Hd、Vdf、CameraUtil、Sdf、UsdCollectionAPI 和 UsdColorSpaceAPI。",
      "PcpPrimIndexInputs 指向 prim index 输入与 composition 相关路径；TraceEventList 和 TraceAggregateNode 用于性能追踪数据聚合。",
      "CameraUtilFraming、CameraUtilScreenWindowParameters 面向相机取景和屏幕窗口参数；UsdCollectionAPI、UsdColorSpaceAPI、UsdGeomMotionAPI 等属于可直接阅读的 schema/API 入口。",
      "本地链接中少量条目已映射到 406 清单内页面，其余跳转到本地 uncovered 页；这符合当前全量范围边界。"
    ],
    terms: [
      ["prim index", "prim 索引"],
      ["performance tracing", "性能追踪"],
      ["camera framing", "相机取景"],
      ["color space API", "颜色空间 API"],
      ["schema API", "schema API"]
    ]
  },
  {
    output: "full_site/api/functions_func_d.html",
    title: "Class Members - Functions - D",
    notes: [
      "functions_func_d.html 的摘录几乎集中在 GfMatrix* 与 GfVec*，是查找图形数学类型函数成员的短索引页。",
      "GfMatrix2d/2f/3d/3f/4d/4f 表示不同维度和浮点精度的矩阵类型；GfVec2*/3*/4* 表示不同维度与精度的向量类型。",
      "后缀 d、f、h、i 分别对应 double、float、half 或 integer 风格的数值表示；阅读时应保留英文类型名，避免把类型名翻译成不可搜索的中文。",
      "本页中文层重点说明命名规律和数学类型定位方式；具体构造函数、运算符和转换规则应进入对应 Gf class 页面核对。"
    ],
    terms: [
      ["matrix type", "矩阵类型"],
      ["vector type", "向量类型"],
      ["double precision", "双精度"],
      ["float precision", "单精度"],
      ["numeric suffix", "数值后缀"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块辨识和术语对照；英文页面名、API 符号、模板参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first function-index usage notes, module-reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
