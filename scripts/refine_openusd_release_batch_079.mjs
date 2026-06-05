import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-079";

const refinements = [
  {
    output: "full_site/api/functions_t.html",
    title: "Class Members - T",
    notes: [
      "这是 Doxygen Class Members 的 T 字母索引页，重点是按成员名快速定位条目；它不是单一模块教程，阅读时要先看所属 class，再跳到目标文档页。",
      "本页密集出现 Vdf executor 与 data manager 条目，例如 `VdfDatalessExecutor`、`VdfDataManagerBasedExecutor`、`VdfExecutorInterface` 和 `VdfExecutorBufferData`，适合按执行调度和数据流缓存两条线索归类。",
      "`PcpError*`、`PcpMapExpression`、`LayerStack` 相关条目属于 composition 诊断和路径映射线索；它们与 Tf 基础设施、UsdVol/UsdGeom token 条目只是共享 T 字母桶。",
      "`UsdPhysics*`、`UsdGeom*TokensType`、`UsdVol*TokensType` 等条目应保留英文 API 名和 token 字面量，中文只说明所属 domain 和用途，避免改写可搜索符号。",
      "如果用户在本页看到相似名称，应优先比较所属命名空间与 class 页面；本索引页的价值是导航和查找，不承担完整 API 语义解释。"
    ],
    terms: [
      ["Class Members", "类成员索引"],
      ["letter bucket", "字母分组"],
      ["Vdf executor", "Vdf 执行器"],
      ["Pcp error", "Pcp 组合错误"],
      ["TokensType", "token 常量类型"],
      ["composition mapping", "组合映射"]
    ]
  },
  {
    output: "full_site/api/functions_vars_i.html",
    title: "Class Members - Variables - I",
    notes: [
      "这是成员变量索引的 I 字母页，条目来自多个模块；中文阅读应把变量名、所属类和模块语境分开，不把相邻条目误读成连续教程。",
      "Hydra 与 imaging 相关变量覆盖 instancer、geom subset、primvar 和渲染上下文，可作为定位 `Hd*`、`UsdImaging*` 数据源映射问题的入口。",
      "`SdrShaderNodeDiscoveryResult`、schema registry、render spec 和 validation metadata 条目指向发现、注册和校验元数据，适合按“资源发现到运行时解释”的链路阅读。",
      "Vdf schedule、data vector 和执行器相关变量说明 I 页也包含执行系统状态；遇到这些条目应跳到 Vdf class 页面核对成员含义。",
      "Pcp/Sdf、UsdPhysics 和 validation 条目只因变量名首字母相同聚合在这里；保留英文变量名有助于和 C++/Python API、官方搜索结果一一对应。"
    ],
    terms: [
      ["member variables", "成员变量"],
      ["instancer", "实例化器"],
      ["primvar", "primvar 原始变量"],
      ["shader discovery", "着色器发现"],
      ["schema registry", "schema 注册表"],
      ["validation metadata", "校验元数据"]
    ]
  },
  {
    output: "full_site/api/functions_v.html",
    title: "Class Members - V",
    notes: [
      "`functions_v.html` 汇总 V 字母类成员，既有函数也有类型和数据成员；它适合做符号导航，不适合作为模块概念的线性讲解。",
      "USD validation 相关条目应按 validator、validation context、validation error 与 error sites 的职责区分，避免把校验框架看成单个函数调用。",
      "Vdf iterator、Exec value override 和执行数据条目属于执行系统线索；这些条目需要结合 class 页面理解生命周期、缓存和求值阶段。",
      "`UsdGeom`、`UsdSkel`、`UsdRi`、`UsdVol` 等 schema 条目说明本页跨越几何、骨骼、RenderMan 兼容和体积域；中文说明只给出导航边界。",
      "遇到 `value`、`valid`、`visit` 等通用词开头成员时，应依赖所属 class 和命名空间判断意义，而不是只看成员名本身。"
    ],
    terms: [
      ["validation context", "校验上下文"],
      ["validator", "校验器"],
      ["value override", "值覆盖"],
      ["iterator", "迭代器"],
      ["schema entry", "schema 条目"],
      ["namespace", "命名空间"]
    ]
  },
  {
    output: "full_site/api/functions_o.html",
    title: "Class Members - O",
    notes: [
      "这是 O 字母类成员索引页，常见前缀包括 open、output、object、option 和 overlay；阅读时需要先确认条目所属模块。",
      "Ar resolver、package、layer 和 asset 相关条目可归入资产解析与文件包入口，适合追踪路径解析、包内资源和打开策略。",
      "Pcp/Sdf namespace 与 composition 条目说明 O 页也包含命名空间编辑、prim index 和层级路径诊断线索，应跳到对应类页面核对细节。",
      "Hydra handle、schema、pick hit、display style 和 trace visitor 条目属于渲染、拾取和调试链路；这些名称在索引页中只给出定位，不给完整行为契约。",
      "中文补强的目标是帮助用户把 O 字母桶拆成资产解析、组合命名空间、Hydra 渲染和调试几类，而不是替代官方 API 明细。"
    ],
    terms: [
      ["asset resolver", "资产解析器"],
      ["package", "文件包"],
      ["namespace edit", "命名空间编辑"],
      ["pick hit", "拾取命中"],
      ["display style", "显示样式"],
      ["trace visitor", "追踪访问器"]
    ]
  },
  {
    output: "full_site/api/functions_vars_d.html",
    title: "Class Members - Variables - D",
    notes: [
      "这是成员变量索引的 D 字母页，覆盖渲染、物理、缓存、相机、着色器发现和校验等多个主题，需按所属类重建上下文。",
      "`UsdRenderVar`、render buffer、AOV、CameraUtil/GfCamera 和 HdSt volume 相关变量可归为渲染输出与相机配置线索。",
      "`TfSpinMutex`、data source、Pcp cache changes 与 error 变量用于理解运行时同步、缓存失效和组合诊断，不能只按变量名直译。",
      "`UsdPhysicsJointDrive`、physics material 和 shape descriptor 条目属于物理 schema 描述；API 名称与 token 字面量必须保持原样以便查证。",
      "本页适合在已知变量名首字母为 D 时查找入口；深入语义时应跳转到 class 页面，查看字段类型、注释和方法关联。"
    ],
    terms: [
      ["RenderVar", "渲染变量"],
      ["AOV", "任意输出变量"],
      ["render buffer", "渲染缓冲"],
      ["spin mutex", "自旋互斥锁"],
      ["cache changes", "缓存变更"],
      ["joint drive", "关节驱动"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引页二次精修说明，重点解释 Doxygen 字母桶的阅读方式、跨模块条目的归类边界，以及何时应跳转到目标 class 或 schema 文档。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index page. It explains how to read Doxygen letter buckets, how to group cross-module entries, and when to jump to the target class or schema documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
