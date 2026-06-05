import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-090";

const refinements = [
  {
    output: "full_site/api/functions_func_v.html",
    title: "Class Members - Functions - V",
    notes: [
      "`functions_func_v.html` 是 V 段函数成员索引，当前重点落在 validate/validation、value/vector、Vdf 数据访问和 USD 高层 schema 跳转；阅读时先区分验证类、USD schema 类和 Vdf execution 类。",
      "`UsdValidationContext`、`UsdValidationValidator`、`UsdAttributeLimits`、`UsdAttributeLimits::ValidationResult`、CLI `App` 与 `Validator` 组成验证入口线索，可用于追踪 attribute limit、schema validation 和命令行校验逻辑。",
      "`UsdSkelTopology`、`UsdSkelBindingAPI`、`UsdSkelBlendShape`、`UsdGeomMesh`、`UsdGeomSubset`、`UsdGeomPrimvar`、`UsdCollectionAPI` 和 `UsdRiSplineAPI` 是用户实际建模时更常进入的 schema/object model 页面；索引只定位，不替代成员语义说明。",
      "`UsdAttribute`、`UsdAttributeQuery`、`UsdResolveInfo` 与 `EsfAttributeQueryInterface` 指向 attribute value query、resolve info 和 execution scene framework 的属性查询；这些条目容易和 validation 混在一起，需要按模块分开读。",
      "`Vdf_BoxedContainer<T>`、`Vdf_BoxedRanges`、`Vdf_VectorAccessor<T>`、`Vdf_VectorImplCompressed<TYPE>`、`Vdf_VectorImplContiguous<TYPE>`、`Vdf_VectorSubrangeAccessor<T>`、`VdfDataManagerBasedExecutor` 和 parallel data manager 相关条目属于 Vdf vector/data manager/executor 主线。"
    ],
    terms: [
      ["validation context", "验证上下文"],
      ["attribute limits", "属性限制"],
      ["resolve info", "解析信息"],
      ["vector accessor", "向量访问器"],
      ["parallel data manager", "并行数据管理器"],
      ["schema jump target", "schema 跳转目标"]
    ]
  },
  {
    output: "full_site/api/functions_vars_t.html",
    title: "Class Members - Variables - T",
    notes: [
      "`functions_vars_t.html` 是变量成员索引 T 段，当前条目集中在 token tables、Pcp relocation/composition diagnostics、UsdPhysics 描述结构、Hydra subset/texture handle、schema info 和 connection source info。",
      "`UsdVolTokensType`、`UsdGeomTokensType`、`UsdHydraTokensType`、`UsdMediaTokensType`、`UsdSkelTokensType`、`UsdPhysicsTokensType`、`UsdLuxTokensType` 与 `UsdTokensType` 都是 token table 入口；token 字面量必须保持英文，中文层只解释所属 schema domain。",
      "`PcpErrorUnresolvedPrimPath`、`PcpErrorInvalidAuthoredRelocation`、`PcpErrorInvalidConflictingRelocation`、`PcpErrorInvalidReferenceOffset`、`PcpErrorInvalidSameTargetRelocations`、`PcpErrorTargetPathBase` 与 `PcpErrorArcToProhibitedChild` 应作为 Pcp composition/relocation 错误族阅读。",
      "`UsdPhysicsJointDrive`、`UsdPhysicsObjectDesc`、`UsdPhysicsCapsule1ShapeDesc`、`UsdPhysicsCylinder1ShapeDesc` 和 `HdEmbreeConfig` 混在 T 段变量索引中，但它们分别属于 physics descriptor 和 Hydra Embree render delegate 配置，不是同一语义层。",
      "`TfRefPtrTracker::Trace`、`HdGeomSubset`、`HdStShaderCode::NamedTextureHandle`、`PcpArc`、`PcpNamespaceEdits::LayerStackSite`、`UsdRenderSpec::Product`、`UsdSchemaRegistry::SchemaInfo` 与 `UsdShadeConnectionSourceInfo` 展示本页还覆盖引用追踪、几何子集、Storm texture handle、composition arc、render product、schema registry 和 shading connection。"
    ],
    terms: [
      ["token table", "token 表"],
      ["relocation diagnostic", "relocation 诊断"],
      ["physics descriptor", "物理描述结构"],
      ["named texture handle", "命名纹理句柄"],
      ["schema info", "schema 信息"],
      ["connection source info", "连接源信息"]
    ]
  },
  {
    output: "full_site/api/hd_storm_page_front.html",
    title: "HdStorm: Real-time Hydra renderer plugin",
    notes: [
      "`hd_storm_page_front.html` 是 `HdStorm` 模块 front page，定位是 real-time Hydra renderer plugin；它面向应用选择和注册 Storm renderer，而不是展开所有 `HdSt` 渲染实现类。",
      "官方摘录强调 Storm 通过 Hydra graphics interface `Hgi` 支持 OpenGL、Metal 和 Vulkan graphics APIs；因此本页要把 `HdStorm` 看作 renderer plugin 与 graphics backend abstraction 的连接点。",
      "`HdStorm` 是薄插件层，真正的 rendering functionality 多在 `HdSt` library；读者如果要查 command buffer、resource registry、shader code、render pass state 或 texture handle，应跳到 `HdSt` 相关类和 `hd_st_page_front.html`。",
      "应用集成角度下，本页用于判断何时选用 Storm：例如需要 USD/Hydra 的实时预览、跨 Hgi backend 的渲染入口、或者在工具中注册/选择 Hydra render delegate。",
      "本地复刻中本页可作为 `Hgi`、`HdSt`、Hydra render delegate 和 Storm renderer 之间的导航节点；中文层保留 `HdStorm`、`Storm`、`Hgi`、OpenGL、Metal、Vulkan 等英文名称，避免和普通“风暴”含义混淆。"
    ],
    terms: [
      ["real-time renderer plugin", "实时渲染器插件"],
      ["Hydra render delegate", "Hydra 渲染委托"],
      ["graphics backend abstraction", "图形后端抽象"],
      ["Storm renderer", "Storm 渲染器"],
      ["thin plugin layer", "薄插件层"],
      ["application integration", "应用集成"]
    ]
  },
  {
    output: "full_site/release/tut_helloworld.html",
    title: "Hello World - Creating Your First USD Stage",
    notes: [
      "`tut_helloworld.html` 是 USD 教程链的最小闭环：创建 `Usd.Stage`，在 `/hello` 定义 `UsdGeom.Xform`，在 `/hello/world` 定义 `UsdGeom.Sphere`，最后保存为 `HelloWorld.usda`。",
      "`Usd.Stage.CreateNew` 是创建新 stage/layer 的入口；`UsdGeom.Xform.Define` 与 `UsdGeom.Sphere.Define` 会在给定 prim path 上创建 typed prim。中文层解释对象关系，但保留 Python API 调用原文。",
      "`/hello` 与 `/hello/world` 是 prim path 层级示例，展示 USD namespace 如何表达父子关系；教程不是讲复杂 composition，而是让读者先理解 stage、layer、prim path 和 typed schema 的基本关系。",
      "`HelloWorld.usda` 是 ASCII USD layer 输出，适合初学者直接打开查看；后续 inspecting、referencing、traversing 等教程会复用这个简单场景，因此它也是后续教程的公共起点。",
      "阅读本页时应先确认环境配置链接 `Configure your Environment`，再运行代码；如果命令或 Python import 失败，优先检查 USD 版本、`PYTHONPATH`/环境变量和当前工作目录，而不是修改教程中的 API 名称。"
    ],
    terms: [
      ["stage creation", "stage 创建"],
      ["typed prim", "有类型 prim"],
      ["prim path hierarchy", "prim 路径层级"],
      ["ASCII USD layer", "ASCII USD layer"],
      ["tutorial starting point", "教程起点"],
      ["environment configuration", "环境配置"]
    ]
  },
  {
    output: "full_site/api/globals_h.html",
    title: "File Members - H",
    notes: [
      "`globals_h.html` 是 File Members 字母 H 总入口，当前条目短，包含 `hash_value()` 和 Hio OpenVDB asset helpers；它和 `globals_func_h.html` 内容接近，但分类层级是所有 H 段 file members。",
      "`hash_value()` 链到 `token.h` 与 `stageLoadRules.h`，说明它可服务于 `TfToken` 或 stage load rules 等轻量对象的哈希支持；具体 overload 和 namespace 需要进入头文件页核对。",
      "`HioOpenVDBGridFromAsset()` 与 `HioOpenVDBGridsFromAsset()` 链到 `imaging/hioOpenVDB/utils.h`，用于从 asset 中读取一个或多个 OpenVDB grid；它们是 Hio utility，不是 usdVol schema 类本身。",
      "从阅读顺序看，应先按头文件来源区分 `token.h`、`stageLoadRules.h` 与 `utils.h`，再分别进入 token hash、stage load policy 和 OpenVDB imaging utility 的目标页面。",
      "本页继续保留 `Hio`、`OpenVDB`、`grid`、`hash_value`、`StageLoadRules` 等英文 API 术语；中文导读只补充用途边界和本地链接策略，避免把函数名翻译后破坏可检索性。"
    ],
    terms: [
      ["file members bucket", "文件成员字母桶"],
      ["hash support", "哈希支持"],
      ["stage load policy", "stage 加载策略"],
      ["OpenVDB grid", "OpenVDB grid"],
      ["asset helper", "资产辅助函数"],
      ["header-based reading", "按头文件阅读"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 增补 API 索引、模块入口、File Members 或教程页面的二次精修说明，重点解释 Doxygen 字母桶、函数/变量成员索引、模块 front page、教程路径和跨模块条目的归类方式，以及何时应跳转到目标 class、schema、namespace、header、group、教程或用户指南。英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方页面逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for the ${escapeHtml(item.title)} API index, module front page, File Members page, or tutorial page. It explains how to read Doxygen letter buckets, function/variable-member indexes, module front pages, tutorial flows, and cross-module entry groupings, and when to jump to target class, schema, namespace, header, group, tutorial, or user-guide documentation while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
