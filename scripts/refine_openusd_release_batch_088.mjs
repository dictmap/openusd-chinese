import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-088";

const refinements = [
  {
    output: "full_site/api/functions_func_g.html",
    title: "Class Members - Functions - G",
    notes: [
      "`functions_func_g.html` 是 G 段函数成员索引，常见语义围绕 get/generate/grow/gather 展开；本页条目集中在 Hydra resource registry、Storm buffer array、Hgi graphics interface、Gf matrix 和 Hd data source 几条主线。",
      "`HdBufferArray`、`HdInstanceRegistry<VALUE>`、`HdResourceRegistry`、`HdStBufferArrayRegistry`、`HdStResourceRegistry`、`HdStDispatchBuffer` 和 Storm VBO memory manager 条目应放在 Hydra/Storm 资源生命周期中阅读，重点是 GPU/CPU buffer 的分配、查找、复用和失效。",
      "`Hgi`、`HgiGL`、`HgiGLDevice`、`HgiBlitCmds` 和 `HgiGLBlitCmds` 属于 graphics interface/backend 线索；它们不是 USD scene description 层，而是 Hydra 渲染后端提交命令和设备资源的入口。",
      "`GfMatrix2d`、`GfMatrix2f`、`GfMatrix3d`、`GfMatrix3f`、`GfMatrix4d`、`GfMatrix4f` 代表 Gf math 类型；遇到同一字母索引中的矩阵条目时，应跳到具体 class 页查看维度、精度和变换语义。",
      "`ArResolverContext`、`Ef_PageCache`、`Exec_CacheView`、`ExecUsdCacheView`、`UsdClipsAPI`、`HdDataSourceLegacyPrim`、`HdMapContainerDataSource`、`HdOverlayContainerDataSource` 和 render delegate handle 条目显示 G 段索引还横跨 asset resolution、execution cache、value clips、scene index/data source 与 plugin handle；索引页只负责导航，不替代目标类说明。"
    ],
    terms: [
      ["resource registry", "资源注册表"],
      ["buffer array lifecycle", "buffer array 生命周期"],
      ["graphics interface backend", "图形接口后端"],
      ["matrix precision", "矩阵精度"],
      ["execution cache view", "执行缓存视图"],
      ["data source container", "数据源容器"]
    ]
  },
  {
    output: "full_site/api/functions_func_f.html",
    title: "Class Members - Functions - F",
    notes: [
      "`functions_func_f.html` 是 F 段函数成员索引，条目横跨 Gf 矩阵、Tf runtime type、Sdf schema field、Pcp prim index inputs、Hgi blit commands、Vdf execution registry、Hydra prim 和基础容器。",
      "`SdfSchemaBase::FieldDefinition` 与 `SdfSchemaBase::_SpecDefiner` 应按 schema 字段定义和 spec definition helper 阅读；它们与 `SdfLayer`、`SdfListProxy<_TypePolicy>`、`SdfPathTable<MappedType>`、`SdfZipFile` 同属 Sdf 数据模型和 layer/file 支撑线索。",
      "`PcpPrimIndexInputs` 指向 composition 输入；`VdfIndexedWeightsOperand` 与 `VdfExecutionTypeRegistry` 指向 Vdf evaluation/execution；这两类条目虽然同在 F 段，但分别服务 composition 和 execution graph，不应混成一个概念。",
      "`HgiBlitCmds`、`HgiGLBlitCmds`、`HdBprim`、`HdRprim`、`HdSprim`、`HdRenderBuffer`、`HdStBasisCurves`、`HdStMesh`、`HdStPoints`、`HdStVolume` 和 RenderMan/Embree adapter 条目属于 Hydra 渲染对象与后端适配层。",
      "`TfDenseHashMap`、`TfDenseHashSet`、`TfToken`、`TfType`、`TfTypeInfoMap<VALUE>`、`VtArrayEditBuilder<ELEM>`、`robin_map` 和 `robin_set` 是基础容器、token 和类型系统支撑；阅读索引时可先把这些和 Hydra/Sdf/Pcp/Vdf 条目分层。"
    ],
    terms: [
      ["field definition", "字段定义"],
      ["spec definer", "spec 定义辅助器"],
      ["prim index inputs", "prim index 输入"],
      ["blit commands", "blit 命令对象"],
      ["execution type registry", "执行类型注册表"],
      ["dense hash container", "dense hash 容器"]
    ]
  },
  {
    output: "full_site/api/functions_func_l.html",
    title: "Class Members - Functions - L",
    notes: [
      "`functions_func_l.html` 是 L 段函数成员索引，常见语义包括 load、list、link、lookup、lock、log 和 lifetime；本页实际覆盖 CLI formatter、Tf/Vdf 基础类型、UsdLux light base、Sdf data/layer、UsdStage load rules、Hydra scene index plugin、Trace 和 Vdf execution stats。",
      "`UsdLuxBoundableLightBase` 与 `UsdLuxNonboundableLightBase` 是阅读本页时最明显的 schema 边界：前者与有几何边界的灯光相关，后者面向不具备 boundable 几何范围的灯光基类，二者都应保留英文类名并跳转到 class 页查看属性。",
      "`SdfAbstractData`、`SdfData`、`SdfLayer`、`SdfSpec`、`UsdPrimDefinition` 和 `UsdPrimDefinition::Property` 属于数据层、layer/spec 与 prim definition；它们说明 L 段并不只是 load API，还包含 schema definition lookup 相关成员。",
      "`PlugPlugin`、`TfScriptModuleLoader`、`HdSceneIndexPluginRegistry`、`UsdStage`、`UsdStageLoadRules` 和 `UsdPrim` 将插件加载、Python script module、scene index plugin、stage payload/load rule 连接在一起；阅读时要区分 plugin discovery 与 stage composition/load policy。",
      "`TraceReporter`、`TfMallocTag::CallTree`、`HdRenderThread`、`ExecutionStats`、`VdfExecutionStats`、`VdfEvaluationState`、`VdfExecutorErrorLogger`、`VdfLRUCache<Key, Value, Hash>`、`GfMultiInterval` 和 `TsKnotMap` 是性能诊断、执行统计、缓存和时间采样工具线索。"
    ],
    terms: [
      ["load rules", "加载规则"],
      ["boundable light base", "有边界灯光基类"],
      ["prim definition", "prim 定义"],
      ["script module loader", "脚本模块加载器"],
      ["scene index plugin registry", "scene index 插件注册表"],
      ["execution statistics", "执行统计"]
    ]
  },
  {
    output: "full_site/api/functions_q.html",
    title: "Class Members - Q",
    notes: [
      "`functions_q.html` 是 Class Members 总索引的 Q 段，条目数量很少；这种短索引页的价值在于快速暴露有哪些模块真的拥有 Q 开头成员，而不是提供完整 API 解释。",
      "`UsdVolTokensType` 是 usdVol schema token 入口，通常用于定位 volume、field、OpenVDB/Field3D 或 particle field 相关 token；token 字面量必须保持英文，不要翻译成中文属性名。",
      "`SdfAbstractData` 和 `SdfLayer` 属于 scene description 数据层，Q 段中的成员应进入对应 class 页查看查询语义、返回类型和 const/mutable 行为，不能只凭索引条目推断用途。",
      "`ConfigBase` 位于 `pxr_CLI::CLI` 命名空间，和 Sdf/UsdVol 数据模型无直接层级关系；中文导读将它单独列出，是为了避免把 CLI configuration helper 误读为 USD schema 配置。",
      "本页只有少量链接，因此二次精修重点放在模块边界、token 保留和跳转策略：从 Q 段确认候选条目，再跳到 `UsdVolTokensType`、`SdfAbstractData`、`SdfLayer` 或 `ConfigBase` 目标页核对签名。"
    ],
    terms: [
      ["short letter bucket", "短字母索引桶"],
      ["volume token", "体积 token"],
      ["scene description data", "场景描述数据"],
      ["query semantics", "查询语义"],
      ["CLI configuration helper", "CLI 配置辅助器"],
      ["target class lookup", "目标类查阅"]
    ]
  },
  {
    output: "full_site/api/globals_func_h.html",
    title: "File Members - Functions - H",
    notes: [
      "`globals_func_h.html` 是 File Members 函数索引 H 段，当前条目很少，主要用于定位 `hash_value()` 以及 Hio OpenVDB asset helper；这类页面应按头文件来源而不是按函数名前缀机械阅读。",
      "`hash_value()` 同时出现在 `token.h` 和 `stageLoadRules.h`，通常用于让 `TfToken`、stage load rules 或相关轻量值对象进入哈希容器；具体 overload、参数类型和 namespace 需要进入头文件页核对。",
      "`HioOpenVDBGridFromAsset()` 与 `HioOpenVDBGridsFromAsset()` 来自 `imaging/hioOpenVDB/utils.h`，应理解为从 asset 读取一个或多个 OpenVDB grid 的 Hio utility，而不是 usdVol schema 本身。",
      "本页把 `token.h`、`stageLoadRules.h` 和 `utils.h` 放在同一个 H 段，是 Doxygen File Members 索引的结果；中文层要明确它们分别属于 Tf token/hash、Usd stage load policy 和 Hio OpenVDB imaging utility。",
      "继续遵守本地链接策略：清单内 `token_8h.html`、`stage_load_rules_8h.html` 和 `imaging_2hio_open_v_d_b_2utils_8h.html` 应路由到本地页面；只有“打开官方原页 / Open official page”保留外跳。"
    ],
    terms: [
      ["file member function", "文件级函数成员"],
      ["hash overload", "哈希重载"],
      ["stage load rules", "stage 加载规则"],
      ["OpenVDB grid asset", "OpenVDB 网格资产"],
      ["Hio utility", "Hio 工具函数"],
      ["header origin", "头文件来源"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引或 File Members 页面二次精修说明，重点解释 Doxygen 字母桶、函数成员索引、文件级函数索引和跨模块条目的归类边界，以及何时应跳转到目标 class、schema、header、group 或用户指南。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index or File Members page. It explains how to read Doxygen letter buckets, function-member indexes, file-level function indexes, and cross-module entry boundaries, and when to jump to target class, schema, header, group, or user-guide documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
