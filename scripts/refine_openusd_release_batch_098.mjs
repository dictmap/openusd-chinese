import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-098";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/ObjectHints.html",
    title: "ObjectHints",
    summary:
      "`ObjectHints` 是 usdUI 中面向所有可在 UI 展示的 USD objects 的通用提示层。它处理 `displayName`、`hidden` 等用户界面信息，帮助 DCC tool 以更友好的名称和默认显示状态呈现 prim 或 property，但不改变 scene composition、属性值或渲染语义。",
    notes: [
      "本页的关键是区分 UI metadata 和核心场景数据。`uiHints` dictionary 中的 `displayName` 和 `hidden` 只影响工具界面如何呈现对象，不等同于 `visibility`、purpose、load state 或 composition arc。",
      "官方示例把 `Placeholder` prim 的 `displayName` 设为 `ModelA placeholder`，并把 `isAnnotated` attribute 的 `displayName` 设为 `Model is annotated`；这些字符串应原样保留，因为它们是用户界面可见文本。",
      "`hidden = 1` 表示该对象在 UI 中默认隐藏，不表示属性不存在，也不表示导出、求值或渲染阶段忽略该属性；工具仍可选择提供高级开关或过滤器来显示它。",
      "`ObjectHints` 作用范围比 `PrimHints` 和 `PropertyHints` 更基础：它跨 prim 和 property 提供通用对象级提示，后两者再针对 prim 内部布局或 property 级行为补充更具体信息。",
      "如果在 schema 文档或 USDA 示例中排查 UI 显示问题，先找 `uiHints` dictionary，再看具体 key 是否属于 `ObjectHints`、`PrimHints`、`PropertyHints` 或 `AttributeHints` 的语义范围。"
    ],
    terms: [
      ["ObjectHints", "对象级 UI 提示"],
      ["uiHints", "UI 提示字典"],
      ["displayName", "界面显示名"],
      ["hidden", "界面默认隐藏"],
      ["USD objects", "USD 对象"],
      ["DCC tool UI", "数字内容创作工具界面"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/PrimHints.html",
    title: "PrimHints",
    summary:
      "`PrimHints` 是 usdUI 中面向 prim 的 UI 提示 schema，重点描述 prim 内部 display groups 如何在工具界面中显示、展开和按条件出现。它通常与 `ObjectHints` 配合使用：`ObjectHints` 处理 prim 名称和隐藏状态，`PrimHints` 处理 prim 内属性组的界面布局。",
    notes: [
      "官方示例中的 `displayGroupsExpanded` 和 `displayGroupsShownIf` 是阅读重点：前者决定 `Controller`、`Widget Settings` 等组初始是否展开，后者通过表达式决定某个组是否显示。",
      "`widgetReadOnlyMode == 0` 是条件表达式，不应翻译或改写；它会被工具解释为 UI 显示规则，而不是 USD composition 或属性默认值规则。",
      "属性上的 `displayGroup = \"Controller\"` 或 `displayGroup = \"Widget Settings\"` 把 property 放入对应 UI group；prim 级 dictionary 再控制这些 group 的展开和可见性。",
      "`PrimHints` 不替代属性值、metadata authoring 或 schema validation。它的目标是让 DCC UI 更易扫读和编辑，而不是改变 prim 在 stage 中的计算结果。",
      "排查界面显示时建议按层级阅读：先看 prim 是否有 `ObjectHints` 的 `displayName`/`hidden`，再看 `PrimHints` 的 display group 字典，最后看每个 property 自己的 `uiHints`。"
    ],
    terms: [
      ["PrimHints", "prim 级 UI 提示"],
      ["displayGroupsExpanded", "显示组展开状态"],
      ["displayGroupsShownIf", "显示组条件可见性"],
      ["displayGroup", "属性所属显示组"],
      ["conditional UI hints", "条件界面提示"],
      ["DCC Tool", "数字内容创作工具"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/usdRender_toc.html",
    title: "Render (usdRender)",
    summary:
      "`usdRender_toc.html` 是 usdRender schema 领域的目录页，用来组织 Overview、Best Practices、RenderPass、RenderProduct、RenderSettings、RenderVar 等入口。它适合先建立渲染配置对象之间的分工，再进入单个 schema 属性页。",
    notes: [
      "阅读顺序建议从 `Overview` 和 `Best Practices` 开始，再进入 `Understand Which Schemas to Use`，最后按目标选择 `RenderSettings`、`RenderProduct`、`RenderVar` 或 `RenderPass`。",
      "`Group UsdRender Prims`、`Provide a Default RenderSettings`、`Designate a Render Camera` 等条目说明 usdRender 既关心输出变量，也关心渲染 prim 的组织、默认设置和相机入口。",
      "`RenderSettings` 通常聚合一次渲染作业的主要配置，`RenderProduct` 表示输出产品，`RenderVar` 表示输出变量或 AOV，`RenderPass` 表示渲染 pass；这些名称保留英文以便跨页搜索。",
      "本目录页不是 renderer plugin 文档，也不描述某个 render delegate 的私有选项；它定义的是 USD scene 中用于表达渲染意图的 schema 层结构。",
      "如果只想找 AOV 或 LPE，应直接跳 `RenderVar`；如果要设置分辨率、相机和输出产品，应从 `RenderSettings` 和 `RenderProduct` 相关页面开始。"
    ],
    terms: [
      ["usdRender", "USD 渲染 schema 领域"],
      ["RenderSettings", "渲染设置"],
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染输出变量"],
      ["RenderPass", "渲染 pass"],
      ["AOV", "任意输出变量"]
    ]
  },
  {
    output: "full_site/api/functions_vars_p.html",
    title: "Class Members - Variables - P",
    summary:
      "`functions_vars_p.html` 是 Doxygen 的 Class Members - Variables 字母 P 索引页。它不是教程页，而是帮助读者按变量名首字母定位 class member variables，例如 Pcp 组合索引相关输出、token structs、CameraUtilFraming、render product 和 physics/skel/imaging 数据入口。",
    notes: [
      "本页应按索引用途阅读：先确认变量名和所属类，再跳到具体 class 页面理解类型、生命周期和使用场景；不要把索引条目直接当作完整 API 说明。",
      "Pcp 相关条目如 `PcpLayerStackIdentifier`、`PcpLayerStackChanges`、`PcpPrimIndexOutputs` 指向 composition、layer stack 和 prim index 计算结果，是排查 composition 行为时的入口。",
      "`UsdGeomTokensType`、`UsdVolTokensType`、`UsdRenderTokensType`、`UsdPhysicsTokensType`、`UsdLuxTokensType`、`UsdSkelTokensType` 等 token struct 条目通常用于确认 token 名称和 schema 常量，不应翻译 token 字面量。",
      "`CameraUtilFraming` 和 render product 相关条目说明 P 段并不只属于一个模块；它横跨 Pcp、UsdGeom、UsdRender、UsdMedia、UsdLux、UsdPhysics、UsdSkel 和 Hydra scene index。",
      "如果变量名看起来相同或相近，应优先根据所属类和命名空间区分；本页保留英文符号正是为了避免 class member variable 在跨模块搜索中被误读。"
    ],
    terms: [
      ["Class Members - Variables", "类成员变量索引"],
      ["PcpPrimIndexOutputs", "Pcp prim index 输出"],
      ["PcpLayerStackIdentifier", "Pcp layer stack 标识"],
      ["TokensType", "token 结构类型"],
      ["member variable", "成员变量"],
      ["Doxygen index", "Doxygen 索引"]
    ]
  },
  {
    output: "full_site/api/page_ts_ts_test.html",
    title: "The TsTest Framework",
    summary:
      "`The TsTest Framework` 描述 Ts 库内部用于 validate、graph 和 compare spline evaluations 的测试框架。它可测试 Ts 自身，也可通过 other backends 调用外部引擎进行对比，因此阅读时要把 framework、backend、baseline 和 grapher 的职责分开。",
    notes: [
      "`TsTest` 文件命名通常以 `tsTest`、`wrapTsTest` 或 `TsTest` 为前缀；这些前缀是定位相关 header、cpp、Python wrapper 和测试辅助脚本的主要线索，应保持英文原样。",
      "`tsTest_Evaluator` 提供 generic evaluation interface，适合连接不同求值后端；这解释了为什么同一套 test data 可以被 Ts 或其他 evaluation engine 比较。",
      "`tsTest_SampleTimes` 和 `tsTest_Types` 偏向数据结构与采样时间选择；`TsTest_Grapher` 负责用 Python/matplotlib 生成图像；`tsTest_CompareBaseline` 负责 baseline 文件生成、结果比较和差异图。",
      "本页中的 `validate`、`graph`、`compare` 三个动作对应测试闭环：先定义 spline evaluation 输入和采样点，再运行 backend 求值，最后与 baseline 或图形结果比较。",
      "如果目标是排查 Ts 曲线行为，不应只看测试框架入口；还要沿链接进入具体 evaluator、sample times、types、grapher 和 compare baseline 条目，确认失败发生在数据准备、求值、图形输出还是基线比较阶段。"
    ],
    terms: [
      ["TsTest", "Ts 测试框架"],
      ["spline evaluations", "样条求值"],
      ["backend", "求值后端"],
      ["baseline", "基线结果"],
      ["grapher", "图形输出工具"],
      ["sample times", "采样时间集合"]
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>|    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
