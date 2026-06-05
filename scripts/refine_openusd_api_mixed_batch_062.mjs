import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-mixed-quality-pass-062";

const refinements = [
  {
    output: "full_site/api/usd_vol_page_front.html",
    title: "UsdVol: USD Volume Schema",
    notes: [
      "`UsdVol: USD Volume Schema` 用于在 USD 中表示 volumetric geometry；它覆盖连续体积、体积场资源和粒子场族，而不是具体体积渲染器或模拟器实现。",
      "`UsdVolVolume` 可表示 smoke、fire 等 continuous volumes，并可直接引用 OpenVDB 与 Field3D 资产中的 spatial field definitions；如果未来支持更多体积格式，也应通过扩展场资源 schema 表达。",
      "组成 volume prim 的字段被建模为独立 prim，schema 类型派生自 `UsdVolVolumeFieldBase`，这样可把 volume fields 与 particle fields 明确区分开。",
      "`UsdVolParticleField` 面向通过 3D particles 定义空间存在的 lightfield 技术族；它最初支持 3D Gaussian splats，但设计上也为 NeRFs 和后续技术演进保留扩展空间。",
      "阅读 `Usage Notes` 时重点关注 namespace organization、transformation、field relationships 如何建立 consumer field names，以及为什么 `OpenVDBAsset` 不是 FileFormat plugin；这些内容决定资产如何被组织、引用和解释。"
    ],
    terms: [
      ["UsdVol", "USD 体积 schema"],
      ["UsdVolVolume", "连续体积 prim"],
      ["Volume Field", "体积场"],
      ["OpenVDBAsset", "OpenVDB 场资源"],
      ["Particle Field", "粒子场"],
      ["3D Gaussian Splat", "三维高斯 splat"]
    ]
  },
  {
    output: "full_site/api/usdabc_page_front.html",
    title: "UsdAbc: Alembic File Format Plugin",
    notes: [
      "`UsdAbc: Alembic File Format Plugin` 当前主要提供 USD 的 Alembic file format plugin，官方页明确说明它没有 user-level API；因此本页重点是文件格式插件行为，而不是通用 Alembic SDK 手册。",
      "`SDF_FORMAT_ARGS` 是阅读重点：`abcReRoot=STRING` 可把 `IArchive` 的直接子节点重根到指定名称的 Xform 下，适合把 Alembic 内容挂到统一根节点。",
      "`abcLayers=LAYER_1,LAYER_2,LAYER_N` 用于给 `IFactory::getArchive` 提供额外 layered Alembic files，这些路径应已经解析为可访问路径；典型用途是从分层 Alembic 中补充 UV 或属性。",
      "`TfEnvSettings` 小节涉及通过环境设置控制插件行为；这类开关属于 pipeline 配置层，不应被误解为 USD scene schema。",
      "示例 `testUsdAbcSDFArguments.usda` 展示如何把 `testUsdAbcSDFArgumentsMesh.abc` 的子节点载入 `AlembicRoot` Xform，并用 `testUsdAbcSDFArgumentsUV.abc` 作为 layered Alembic 加载 UV。"
    ],
    terms: [
      ["UsdAbc", "Alembic 文件格式插件"],
      ["SDF_FORMAT_ARGS", "Sdf 格式参数"],
      ["abcReRoot", "Alembic 重根参数"],
      ["abcLayers", "Alembic 分层参数"],
      ["IArchive", "Alembic archive 入口"],
      ["TfEnvSettings", "Tf 环境设置"]
    ]
  },
  {
    output: "full_site/api/usddraco_page_front.html",
    title: "UsdDraco: Draco File Format Plugin",
    notes: [
      "`UsdDraco: Draco File Format Plugin` 提供 USD 的 Draco file format plugin；Draco 通常用于压缩几何网格或点云数据，本页则只说明 USD 侧插件入口。",
      "该页内容很短，重点是确认这是 file format plugin，而不是新的 USD scene schema，也不是完整 Draco 编码算法文档。",
      "在本地复刻中保留 `UsdDraco`、`Draco`、file format plugin 和官方链接原样，避免把压缩格式名称翻译成会影响检索的中文别名。",
      "使用该插件时，关注点通常是资产 I/O、文件扩展名、依赖构建和插件是否可发现；具体几何语义仍由 USD 几何 schema 或被解码后的数据表达。",
      "因为官方页未列出用户级 API，本页中文导读只补足定位、边界和阅读建议，不伪造不存在的类、函数或参数。"
    ],
    terms: [
      ["UsdDraco", "Draco 文件格式插件"],
      ["Draco", "几何压缩格式"],
      ["File Format Plugin", "文件格式插件"],
      ["geometry compression", "几何压缩"],
      ["asset I/O", "资产读写"]
    ]
  },
  {
    output: "full_site/api/vt_page_front.html",
    title: "Vt: Value Types",
    notes: [
      "`Vt: Value Types` 定义用于 type abstraction 的 `VtValue` 和增强数组类型 `VtArray`，并提供操纵 value types 的辅助函数；它位于语言数据类型层，而不是 scene schema 层。",
      "`VtValue` 是 type-erased container，可把 `float`、`int`、`bool`、`GfVec3d` 等对象包进类型无关容器，并提供查询容器中实际内容类型的能力。",
      "`VtArray` 表示任意长度的 homogeneous container；C++ API 可按指定大小构造数组，Python 侧则表现为 typed array classes，例如 `BoolArray`、`StringArray`、`Vec4dArray`。",
      "阅读时要注意 C++ 和 Python interface 差异：同一个 value concept 在绑定层可能有不同类型名、构造方式或数组表现形式。",
      "`Vt` 常出现在 USD attribute value、metadata、array-valued data 和泛型 API 之间，是把强类型 C++ 值、Python 值和 USD 值系统连接起来的基础库。"
    ],
    terms: [
      ["Vt", "值类型库"],
      ["VtValue", "类型擦除值容器"],
      ["VtArray", "同质数组容器"],
      ["type erasure", "类型擦除"],
      ["homogeneous container", "同质容器"],
      ["GfVec3d", "Gf 三维向量类型"]
    ]
  },
  {
    output: "full_site/api/work_page_front.html",
    title: "Work: Multi-threaded Dispatch",
    notes: [
      "`Work: Multi-threaded Dispatch` 是 OpenUSD 生态中的多线程调度薄抽象层，用来简化常见并行构造，并集中管理对底层 multithreading subsystem 的依赖。",
      "本库的两个核心目的分别是简化 `Parallel For` 等常见构造，以及避免每个客户端各自选择 TBB、OpenMP 等不同 threading system 后产生资源管理冲突。",
      "`Initializing and Limiting Multithreading` 与 `Concurrency Limiting API` 涉及线程数和并发限制；`WorkSetConcurrencyLimitArgument` 是命令行或工具侧限制并发的重要入口。",
      "`Parallel Algorithms API` 包括 `WorkParallelForN` 等并行循环工具；`Dispatching Tasks API` 和 `WorkDispatcher` 面向任务派发与等待。",
      "如果提供 alternate Work implementation，需要阅读 `Caveats of an Alternate Work Backend`：替换后端不仅是 API 适配问题，还要处理全局资源管理、调度语义和其他库的互操作。"
    ],
    terms: [
      ["Work", "多线程调度库"],
      ["Parallel For", "并行 for 循环"],
      ["WorkParallelForN", "并行循环 API"],
      ["WorkDispatcher", "任务派发器"],
      ["Concurrency Limit", "并发限制"],
      ["TBB", "Threading Building Blocks"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块用途、插件或 schema/API 边界、阅读路径和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module purpose, plugin or schema/API boundaries, reading paths, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
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
