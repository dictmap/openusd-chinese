import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-159";

const refinements = [
  {
    output: "full_site/api/usd_geom_page_front.html",
    title: "UsdGeom: USD Geometry Schema",
    summary:
      "`usd_geom_page_front.html` 是 `UsdGeom` 几何 schema 入口，覆盖 imageable prim、xform stack、gprim、point instancer、camera、model API、primvars、purpose、坐标系、线性代数、速度采样和 stage metrics。它用于交换几何 scene description，而不是某个 DCC 或 renderer 的专用几何实现。",
    notes: [
      "`UsdGeomImageable` 是可见/可渲染 prim 的基础入口，`purpose`、visibility 和 bounds 等概念通常从这里开始查。",
      "`UsdGeomXformable` 管 xform ops 与 transform stack，`UsdGeomXformOp` 和 `GfMatrix4d` 是阅读矩阵、顺序和局部/世界变换时的关键链接。",
      "`UsdGeomGprim` 统摄 `UsdGeomMesh`、`UsdGeomBasisCurves`、`UsdGeomPoints`、`UsdGeomCube`、`UsdGeomSphere` 等几何 primitive；具体 topology 和属性仍要进入对应 class。",
      "`UsdGeomPrimvar` 与 `UsdGeomPrimvarsAPI` 是 primvars 主线，适合理解 primitive variables 如何随 interpolation、element size 和 typed value 绑定到几何上。",
      "Stage up axis、linear units、orientation、winding order、normals 和 velocity samples 是跨工具交换几何时最容易出错的边界，中文导读只补充阅读顺序，API 名称保持原样。",
    ],
    terms: [
      ["几何 schema", "geometry schema"],
      ["可显示对象", "imageable prim"],
      ["变换栈", "transform stack"],
      ["几何 primitive", "geometric primitive"],
      ["primitive variables", "primvars"],
      ["舞台度量", "stage metrics"],
    ],
  },
  {
    output: "full_site/api/usd_shade_page_front.html",
    title: "UsdShade: USD Shading Schema",
    summary:
      "`usd_shade_page_front.html` 是 `UsdShade` 着色 schema 入口，描述 `UsdShadeNodeGraph`、`UsdShadeMaterial`、`UsdShadeShader`、connectability rules、input/output dataflow、shader definition discovery 和 material binding。它负责材质网络表达，不实现 renderer shader 执行。",
    notes: [
      "`UsdShadeNodeGraph` 组织可复用 shading network，`UsdShadeMaterial` 提供可绑定到几何的材质接口，`UsdShadeShader` 表示具体 shader prim。",
      "`UsdShadeConnectableAPI`、`UsdShadeInput`、`UsdShadeOutput` 和 `UsdAttribute` connections 是连接机制核心；input value 与 valid shader connection 的优先级需要按页面规则阅读。",
      "Encapsulation and Sharing 说明 container 如何暴露参数、内部 shader network 如何封装，以及哪些对象能作为 connectable endpoints。",
      "`SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty` 与 `UsdShadeShaderDefParserPlugin` 解释 shader definition discovery；这和 authored material network 是两个层次。",
      "`UsdShadeMaterialBindingAPI` 是几何材质绑定主线，应结合 `UsdGeom` 和 collection binding 阅读，而不是把 binding 当成 shader node 内部连接。",
    ],
    terms: [
      ["着色 schema", "shading schema"],
      ["材质网络", "material network"],
      ["节点图", "node graph"],
      ["可连接 API", "connectable API"],
      ["接口连接", "interface connection"],
      ["材质绑定", "material binding"],
    ],
  },
  {
    output: "full_site/api/hdx_page_front.html",
    title: "Hdx : Hydra extensions",
    summary:
      "`hdx_page_front.html` 是 `Hdx` Hydra extensions 入口，位于 `Hd` 核心抽象和具体 renderer implementation 之间。它提供常用 imaging tasks、selection/picking、render setup、shadow、simple light、present/color correction 以及 `HdxTaskController` 等应用层辅助。",
    notes: [
      "`HdxRenderTask`、`HdxSelectionTask`、`HdxShadowTask`、`HdxSimpleLightTask` 等 task 适合从 viewport 或 usdview 类工作流理解，而不是当成 schema class 阅读。",
      "`HdxTaskController` 用于组织 task params 和 task 顺序，减少客户端直接管理多个 Hydra task 的负担。",
      "如果要理解 scene data 如何进入 Hydra，应先读 `HdSceneDelegate`、`HdSceneIndex`、`HdRenderIndex`；`Hdx` 更偏 task/controller 层。",
      "`HdxPickTask`、selection 和 colorize 相关类型常用于交互式视口调试，和离线渲染输出或 asset authoring 不是同一层问题。",
      "`Hdx`、`HdSt`、`HdStorm`、`Hio` 需要分开：`Hdx` 组织扩展 task，`HdSt/HdStorm` 实现渲染后端，`Hio` 负责资源 I/O。",
    ],
    terms: [
      ["Hydra 扩展", "Hydra extensions"],
      ["成像任务", "imaging task"],
      ["任务控制器", "task controller"],
      ["选择任务", "selection task"],
      ["拾取任务", "picking task"],
      ["视口工作流", "viewport workflow"],
    ],
  },
  {
    output: "full_site/api/functions_func_v.html",
    title: "Class Members - Functions - V",
    summary:
      "`functions_func_v.html` 是 Class Members 函数索引的 V 字母段，聚合 validate/validation、value、vector、Vdf 执行数据访问、USD attribute validation 和 CLI validator 等入口。它是导航页，具体函数签名和行为仍要进入目标 class 页面确认。",
    notes: [
      "`UsdValidationContext`、`UsdValidationValidator`、`UsdAttributeLimits`、`UsdAttributeLimits::ValidationResult` 和 CLI `Validator` 形成 validation 相关阅读线索。",
      "`UsdGeomMesh`、`UsdGeomSubset`、`UsdGeomPrimvar`、`UsdCollectionAPI`、`UsdSkelBindingAPI`、`UsdSkelBlendShape` 等高层 API 条目应按 schema 语境继续跳转。",
      "`Vdf_VectorAccessor<T>`、`Vdf_VectorImplCompressed<TYPE>`、`Vdf_VectorImplContiguous<TYPE>`、`Vdf_VectorSubrangeAccessor<T>` 等条目偏 Vdf 底层向量存储和执行数据访问。",
      "`value` 或 `validate` 开头的函数名称不能脱离所属 class 解读；相同前缀在 Usd、Sdf、Vdf、CLI 中可能表示完全不同的职责。",
      "本页和 `functions_v.html`、`functions_vars_v.html` 需要区分：当前页只列 class member functions，变量或综合成员索引在其他页。",
    ],
    terms: [
      ["V 段函数索引", "V-section function index"],
      ["验证入口", "validation entry"],
      ["属性限制", "attribute limits"],
      ["向量访问器", "vector accessor"],
      ["执行数据管理", "execution data management"],
      ["CLI 校验器", "CLI validator"],
    ],
  },
  {
    output: "full_site/api/usd_physics_page_front.html",
    title: "UsdPhysics: USD Physics Schema",
    summary:
      "`usd_physics_page_front.html` 是 `UsdPhysics` 物理 schema 入口，描述刚体、碰撞、质量、材质、关节、articulation root、physics scene 和单位参数等可交换物理 scene description。它定义 authoring 语义，不等同于具体 physics solver 实现。",
    notes: [
      "`UsdPhysicsScene` 管场景级物理设置，单位相关内容需结合 `metersPerUnit`、`timeCodesPerSecond`、`kilogramsPerUnit` 与 `UsdPhysicsGetStageKilogramsPerUnit()` 阅读。",
      "`UsdPhysicsRigidBodyAPI`、`UsdPhysicsMassAPI`、`UsdPhysicsCollisionAPI`、`UsdPhysicsMeshCollisionAPI`、`UsdPhysicsMaterialAPI` 分别覆盖运动主体、质量、碰撞、网格碰撞近似和物理材质。",
      "`UsdPhysicsArticulationRootAPI` 与各类 `UsdPhysicsJoint` 共同描述关节系统；joint reference frames、jointed bodies 和 filtering 是 authoring 重点。",
      "碰撞几何常与 `UsdGeomGprim`、`UsdGeomMesh`、`UsdGeomSubset`、`UsdCollectionAPI` 和 `UsdShadeMaterialBindingAPI` 相邻阅读，因为物理材质和碰撞分组需要跨模块表达。",
      "本页强调最小公共刚体物理概念；高级 solver 参数、引擎特定约束或动态仿真行为需要查看具体 runtime/plugin 文档。",
    ],
    terms: [
      ["物理 schema", "physics schema"],
      ["刚体 API", "rigid body API"],
      ["碰撞 API", "collision API"],
      ["质量属性", "mass properties"],
      ["物理材质", "physics material"],
      ["关节参考系", "joint reference frame"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次索引补强 / Chinese Second-Pass Index Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
