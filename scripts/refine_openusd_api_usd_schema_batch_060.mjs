import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-usd-schema-quality-pass-060";

const refinements = [
  {
    output: "full_site/api/usd_physics_page_front.html",
    title: "UsdPhysics: USD Physics Schema",
    notes: [
      "`UsdPhysics: USD Physics Schema` 是 USD 中描述刚体物理、碰撞、质量、材质、关节和场景级物理参数的 schema 入口；它负责编码可交换的物理场景描述，而不是实现具体求解器。",
      "本页的阅读主线是先看 `Purpose and Scope` 与 `Overall Design Concerns`，理解它只覆盖最小公共刚体物理概念；再看 `USD Implementation`，确认哪些内容通过 prim schema、API schema 和 attributes authoring 表达。",
      "`UsdPhysicsScene` 用于场景级物理设置；单位相关内容需要和 `UsdGeomTokensType::metersPerUnit`、`UsdStage::SetTimeCodesPerSecond()`、`UsdPhysicsTokensType::kilogramsPerUnit`、`UsdPhysicsGetStageKilogramsPerUnit()` 一起读。",
      "刚体部分重点区分 `UsdPhysicsRigidBodyAPI`、`UsdPhysicsMassAPI`、`UsdPhysicsCollisionAPI`、`UsdPhysicsMeshCollisionAPI`、`UsdPhysicsMaterialAPI`、`UsdPhysicsArticulationRootAPI` 的职责边界：运动主体、质量属性、碰撞形状、网格近似、物理材质和关节系统根分别由不同 API 承担。",
      "关节章节覆盖 `UsdPhysicsJoint`、`UsdPhysicsSphericalJoint`、`UsdPhysicsRevoluteJoint`、`UsdPhysicsPrismaticJoint`、`UsdPhysicsDistanceJoint`、`UsdPhysicsFixedJoint`，并解释 joint reference frames、jointed bodies、collision filtering 等 authoring 语义；这些 API 名称和 token 字面量应保持英文原样。"
    ],
    terms: [
      ["UsdPhysics", "USD 物理 schema 模块"],
      ["Rigid Body", "刚体"],
      ["Physics Scene", "物理场景"],
      ["Collision Shape", "碰撞形状"],
      ["Joint", "关节"],
      ["Articulation Root", "关节系统根"]
    ]
  },
  {
    output: "full_site/api/usd_proc_page_front.html",
    title: "UsdProc: USD Schemas for Procedurals",
    notes: [
      "`UsdProc: USD Schemas for Procedurals` 用来描述 procedural data，让下游系统能够识别某个 prim 代表由程序生成或扩展的数据，而不必把生成结果全部提前烘焙进 stage。",
      "当前模块范围很窄，官方页明确指出初始形式只有一个 schema：`UsdProcGenerativeProcedural`；因此本页应被理解为 procedural schema 的入口，而不是完整 procedural runtime 文档。",
      "`UsdProcGenerativeProcedural` 关注 scene description 层的声明：它说明这个 prim 是一个 generative procedural 以及下游系统应如何发现或调用相关能力；实际生成逻辑仍由具体插件、Hydra 或应用侧系统实现。",
      "与 Hydra 相关的阅读应跳到 `UsdHydraGenerativeProceduralAPI`、`HdGpGenerativeProcedural` 或对应模块页；不要把 `UsdProc` 本身误解为渲染器、求值器或几何生成器实现。",
      "本地精修保留 `UsdProcGenerativeProcedural`、schema 名称和官方链接，并补充中文说明，帮助用户把 procedural prim 的 authoring 语义与运行时插件边界分开。"
    ],
    terms: [
      ["UsdProc", "USD procedural schema 模块"],
      ["Procedural", "程序化对象"],
      ["Generative Procedural", "生成式程序化对象"],
      ["scene description", "场景描述"],
      ["runtime plugin", "运行时插件"]
    ]
  },
  {
    output: "full_site/api/usd_render_page_front.html",
    title: "UsdRender: USD Render Schema",
    notes: [
      "`UsdRender: USD Render Schema` 提供描述 render settings、render products、render variables 和 render passes 的 schema 与行为约定，用于把渲染任务、输出目标和 AOV/变量组织进 USD stage。",
      "阅读时先看 `Structure and Organization`：`UsdRenderSettings` 描述渲染配置入口，`UsdRenderProduct` 描述输出 artifact，`UsdRenderVar` 描述单个渲染变量，`UsdRenderPass` 表示一次渲染过程或可组合的渲染步骤。",
      "`renderSettingsPrimPath` stage metadata 和 `UsdRenderSettings::GetStageRenderSettings()` 是默认渲染设置解析的关键入口；这类名称是 API/metadata 名称，需保持英文原样。",
      "概念章节覆盖 camera、pixels、aspect ratio policy、cropping、tiling、overscan 和 rasterization rule，说明渲染区域、像素解释和输出构成如何被 author 到 USD，而不是规定某个渲染器的内部算法。",
      "本页也提醒 `render byproducts` 不只限于 beauty image，还可能包括 depth maps、light probes、point clouds 等输出；实际渲染器可通过 extensions 扩展 schema 行为。"
    ],
    terms: [
      ["UsdRenderSettings", "渲染设置 prim"],
      ["UsdRenderProduct", "渲染输出产品"],
      ["UsdRenderVar", "渲染变量"],
      ["UsdRenderPass", "渲染过程"],
      ["renderSettingsPrimPath", "默认渲染设置元数据"],
      ["AOV", "任意输出变量"]
    ]
  },
  {
    output: "full_site/api/usd_ri_page_front.html",
    title: "UsdRi: USD RenderMan Utilities",
    notes: [
      "`UsdRi: USD RenderMan Utilities` 是面向 RenderMan 互操作的工具层；它帮助 author 带有 RenderMan-specific information 的 USD，并提供 USD 值与 Ri 值/数据类型之间的转换工具。",
      "官方说明中 RenderMan schemas、concepts 和 plugins 位于 `usdRiPxr`；本模块本身更偏向公用工具和转换函数，而不是完整 RenderMan schema 手册。",
      "本页强调这些工具不依赖 RenderMan headers，因此即使当前环境没有安装 RenderMan，也可以使用相关 API 来处理 RenderMan 特定的 USD authoring 信息。",
      "阅读重点包括 `UsdRiStatements` 这类用于表达 RenderMan statements 的类，以及 `usdRi/rmanUtilities.h` 中提供的转换工具函数；头文件名、类名和函数名保持英文原样。",
      "本地中文导读的目标是说明 `UsdRi`、`usdRiPxr`、RenderMan runtime 三者边界：一个是工具模块，一个是 schema/plugin 集合，一个是外部渲染器生态。"
    ],
    terms: [
      ["UsdRi", "USD RenderMan 工具模块"],
      ["usdRiPxr", "RenderMan schema/plugin 区域"],
      ["RenderMan-specific information", "RenderMan 专用信息"],
      ["UsdRiStatements", "RenderMan statements 表达类"],
      ["rmanUtilities.h", "RenderMan 转换工具头文件"]
    ]
  },
  {
    output: "full_site/api/usd_semantics_overview.html",
    title: "UsdSemantics: Semantic Labeling of Scenes",
    notes: [
      "`UsdSemantics: Semantic Labeling of Scenes` 讨论如何给 scene 中的 prim 添加语义标签；这些标签补充 prim 名称和层级路径，适合表达类别、用途、任务语义或资产分类信息。",
      "本页核心区别是 semantic labels 具有类似 primvars 的继承语义，但标签可能是 accumulated，而不一定像普通属性那样简单 override；因此阅读时要特别关注 inheritance 与 accumulation 的关系。",
      "`Taxonomy and Comparison to Model Hierarchy` 说明标签分类体系不等于 USD model hierarchy：一个 prim 的层级位置描述结构组织，而 semantic taxonomy 描述语义分类，两者可以相互独立。",
      "时间相关章节讨论 time varying labels、intervals 和 state transitions，适用于对象状态、动作阶段或可随时间变化的语义标注；这类 authoring 不应和几何变换动画混淆。",
      "与其他 domain 的关系包括 `UsdGeomSubset`、`UsdShade`、nested materials/shaders、node graphs 和 `UsdRender`；filtering and selection by label 可用于基于标签选择、查询和下游处理。"
    ],
    terms: [
      ["semantic labels", "语义标签"],
      ["taxonomy", "分类体系"],
      ["inheritance", "继承"],
      ["accumulation", "累积"],
      ["UsdGeomSubset", "几何子集"],
      ["filtering", "按标签过滤"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块用途、schema/API 边界、阅读路径和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module purpose, schema/API boundaries, reading paths, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
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
