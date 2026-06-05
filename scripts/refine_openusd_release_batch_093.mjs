import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-093";

const refinements = [
  {
    output: "full_site/api/globals_u.html",
    title: "File Members - U",
    notes: [
      "`globals_u.html` 是 File Members 的 U 段宽索引，既可能包含宏、常量、类型、变量，也可能包含函数；它不同于 `globals_func_u.html` 这类函数专页，阅读时要先看条目右侧的 header 来源。",
      "本页当前摘录里 `USD_*`、`Usd*Tokens`、validator tokens、schema tokens 和 utility headers 较多，适合把它看作 USD schema、validation、metrics、collection、camera、prim flags 与 renderer utility 的入口集合。",
      "`validatorTokens.h`、`tokens.h`、`metrics.h`、`collectionMembershipQuery.h`、`primFlags.h`、`object.h`、`camera.h`、`rmanUtilities.h` 等链接说明 U 段并不属于单一模块，而是按字母把跨模块符号聚合到一起。",
      "读者如果要查某个 token 字面量，应继续进入对应 `TokensType` 或 header 页；如果要查工具函数，应进入函数锚点或具体模块入口，例如 `UsdGeom`、`UsdUtils`、`UsdShade`、`UsdRi` 或 validation 相关页面。",
      "中文层保留 `USD_*`、`UsdGeomTokens`、`UsdUtils`、`UsdRi`、`validatorTokens.h` 等英文符号，重点补充条目分类、header 来源和跨模块跳转策略，避免把 U 段误读成一篇连续教程。"
    ],
    terms: [
      ["wide File Members index", "宽 File Members 索引"],
      ["token literal", "token 字面量"],
      ["validator tokens", "验证器 token"],
      ["schema tokens", "schema token"],
      ["header provenance", "头文件来源"],
      ["cross-module symbol", "跨模块符号"]
    ]
  },
  {
    output: "full_site/api/globals_func_w.html",
    title: "File Members - Functions - W",
    notes: [
      "`globals_func_w.html` 是 File Members 函数索引 W 段，当前主要集中在 `Work` 并行工具层；它与 `globals_w.html` 的宽索引不同，只收集文件级函数入口。",
      "`WorkGetConcurrencyLimit()`、`WorkSetConcurrencyLimit()`、`WorkSetMaximumConcurrencyLimit()` 来自 `threadLimits.h`，用于控制 OpenUSD Work 模块并发上限，阅读时应注意进程级配置、调用时机和测试环境对并行度的影响。",
      "`WorkParallelForN()`、`WorkParallelForEach()`、`WorkParallelReduceN()`、`WorkParallelSort()` 等函数分别对应并行循环、遍历、归约和排序；它们不是 Hydra 专属工具，而是基础设施层的通用任务调度封装。",
      "`WorkDetachedTask` 与 `WorkWithScopedParallelism` 相关入口强调任务生命周期和作用域控制：前者关注后台任务，后者关注局部并行策略，不应与 `std::thread` 或普通同步 primitive 直接等同。",
      "如果正在调优性能，应把本页和 `Trace`、Vdf/Ef execution、Hydra render task 等页面一起看；如果只是查 API 签名，应从本索引继续跳到 `work` 模块头文件页核对参数和异常约定。"
    ],
    terms: [
      ["Work module", "Work 并行模块"],
      ["concurrency limit", "并发上限"],
      ["parallel loop", "并行循环"],
      ["parallel reduce", "并行归约"],
      ["detached task", "分离任务"],
      ["scoped parallelism", "作用域并行策略"]
    ]
  },
  {
    output: "full_site/api/globals_g.html",
    title: "File Members - G",
    notes: [
      "`globals_g.html` 是 File Members 的 G 段宽索引，当前内容主要覆盖 `Gf` 数学/几何基础设施，同时也可能混入 diagnostics 或 utility 条目；它比函数专页更宽，需要按符号类型阅读。",
      "`GF_MIN_ORTHO_TOLERANCE`、`GF_MIN_VECTOR_LENGTH` 等常量来自 `limits.h`，应与向量归一化、正交判断、矩阵稳定性和浮点误差一起理解，而不是把它们当作随意阈值。",
      "`GfAbs()`、`GfClamp()`、`GfDegreesToRadians()`、`GfGamma()` 等函数体现基础数学工具；`GfVec*`、`GfMatrix*`、`GfQuat*`、`GfDualQuat*`、`GfRay`、`GfPlane` 等 header 链接则指向向量、矩阵、四元数、双四元数、射线和平面类型。",
      "如果读者要理解空间变换或几何计算，应从本页跳到具体 `Gf` class 页面；如果目标是渲染色彩或 gamma，应继续进入 `gamma.h`、`color.h` 和渲染/成像相关页面。",
      "中文导读保留 `Gf`、`GF_*`、`GfVec3f`、`GfMatrix4d` 等符号原样，重点说明 G 段是数学符号入口，不要逐项意译 API 名称。"
    ],
    terms: [
      ["Gf module", "Gf 数学模块"],
      ["orthogonality tolerance", "正交容差"],
      ["vector length threshold", "向量长度阈值"],
      ["quaternion", "四元数"],
      ["dual quaternion", "双四元数"],
      ["geometry primitive", "几何基础类型"]
    ]
  },
  {
    output: "full_site/api/globals_p.html",
    title: "File Members - P",
    notes: [
      "`globals_p.html` 是 File Members 的 P 段宽索引，当前主要围绕 `Pcp` composition 相关符号，也包含 path translation、layer stack identifier、plugin interface 或 exception 支撑入口。",
      "`Pcp` 是 OpenUSD composition engine 的核心前缀；遇到 `PcpPrimIndex`、`PcpPropertyIndex`、`PcpNodeRef`、`PcpLayerStackIdentifier` 等符号时，应把它们放到引用、继承、变体、payload、specializes 和 layer stack 求值语境中理解。",
      "`composeSite.h`、`layerStackIdentifier.h`、`pathTranslation.h` 等链接提示本页条目往往服务于 composition site 查询、路径映射和层栈定位；这些内容比普通 `SdfPath` 字符串处理更接近组合算法内部。",
      "与 `globals_func_p.html` 相比，本页可能同时列出类型、宏、变量和函数；如果要查具体函数参数，应去函数专页或 header；如果要理解概念，应回到 Pcp 模块入口和相关 class 页面。",
      "中文层保留 `Pcp`、`SdfPath`、`layer stack`、`prim index` 等英文术语，重点解释宽索引和函数索引的区别，以及 Pcp 符号在组合系统中的定位。"
    ],
    terms: [
      ["Pcp composition", "Pcp 组合系统"],
      ["composition site", "组合站点"],
      ["layer stack identifier", "层栈标识"],
      ["path translation", "路径转换"],
      ["prim index", "prim 索引"],
      ["wide symbol index", "宽符号索引"]
    ]
  },
  {
    output: "full_site/release/tut_authoring_variants.html",
    title: "Authoring Variants",
    notes: [
      "`tut_authoring_variants.html` 是 release 教程页，重点是如何在已有 prim 上创作 `variant set` 和 `variant selection`；它比 API 索引更接近实际资产作者工作流，应按步骤理解 Python 代码和 USDA 结果。",
      "变体适合表达同一资产的模型、材质、LOD、配置或造型差异；关键不是复制整份资产，而是在 composition 中把可切换意见组织到同一个 prim 的 variant set 下。",
      "阅读示例时要关注 `GetVariantSets()`、`AddVariantSet()`、`AddVariant()`、`SetVariantSelection()` 和 `with variantSet.GetVariantEditContext()` 这类 API 的顺序：先声明变体集，再声明候选变体，再进入变体编辑上下文写入意见。",
      "Variant opinion 仍然参与 LIVERPS strength ordering；如果下游 layer 重新选择 variant 或提供更强 opinion，最终 stage 结果会随 composition 强度变化，这一点是理解非破坏性资产变体的核心。",
      "建议把本教程和 `tut_referencing_layers.html`、`tut_inspect_and_author_props.html`、`wp_stage_variables.html` 一起读：前者解释引用和属性创作，后者帮助区分 stage variables 与 variant selection 的职责边界。"
    ],
    terms: [
      ["variant set", "变体集"],
      ["variant selection", "变体选择"],
      ["variant edit context", "变体编辑上下文"],
      ["composition opinion", "组合意见"],
      ["LIVERPS strength ordering", "LIVERPS 强度顺序"],
      ["non-destructive variation", "非破坏性变体表达"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补二次精修说明，重点解释 File Members 宽索引与函数索引的区别、模块归属、头文件来源、教程步骤、跨页跳转顺序和术语对照。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于与官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}. It explains the difference between broad File Members indexes and function indexes, module ownership, header provenance, tutorial steps, cross-page navigation, and terminology while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
