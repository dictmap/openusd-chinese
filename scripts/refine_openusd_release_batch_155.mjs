import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-155";

const refinements = [
  {
    output: "full_site/api/functions_vars_z.html",
    title: "Class Members - Variables - Z",
    summary:
      "`functions_vars_z.html` 是 Class Members 变量索引的 Z 段，当前聚合 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType` 和 `UsdVolTokensType`。它用于定位 Z 字母 token 所属 domain，而不是解释完整坐标、灯光、物理或体积 schema 行为。",
    notes: [
      "`UsdGeomTokensType` 的 Z 条目通常关联坐标轴、几何属性或 transform token；具体是否表示 Z 轴、属性名或 schema field 仍要进入 token type 页面确认。",
      "`UsdLuxTokensType` 的 Z 条目属于 lighting domain，可能服务灯光方向、shape、shaping 或参数命名；不能按几何坐标的 Z 轴统一解释。",
      "`UsdPhysicsTokensType` 的 Z 条目属于 physics schema 命名入口，可能涉及 axis、drive、limit 或 constraint 相关 token；本页不说明 solver 行为。",
      "`UsdVolTokensType` 的 Z 条目属于 volume schema token，和几何/灯光/物理 domain 同页出现只是字母索引混排结果。",
      "Z 段变量索引应与上一轮 X 段、Y 段一起阅读：三页共同帮助定位 token，但完整语义仍在对应 token class、schema 或 user guide 页面。",
    ],
    terms: [
      ["Z 段变量索引", "Z variable index"],
      ["token 所属领域", "token domain"],
      ["体积 schema", "volume schema"],
      ["物理约束 token", "physics constraint token"],
      ["灯光参数 token", "lighting parameter token"],
      ["字母索引混排", "alphabetical index mixing"],
    ],
  },
  {
    output: "full_site/api/functions_eval.html",
    title: "Class Members - Enumerator",
    summary:
      "`functions_eval.html` 是 Class Members 的 enumerator 索引页，列出具体枚举值，而不是 enum 类型本身。它横跨 `TfType`、`UsdStageLoadRules`、`UsdGeomPointInstancer`、`PcpNamespaceEdits`、`UsdStage`、`UsdSkelBakeSkinningParms`、`UsdGeomXformOp` 等多个语义域。",
    notes: [
      "`TfType` 和 `TfMallocTag::CallTree` 相关枚举值偏 runtime type system 与 memory tracing；它们不属于 USD scene authoring 语义。",
      "`UsdStageLoadRules`、`UsdStage`、`UsdGeomPointInstancer` 和 `UsdGeomXformOp` 条目分别关联 stage loading、stage state、point instancing 与 transform operation。",
      "`SdfPredicateExpression::FnCall`、`PcpNamespaceEdits`、`SdfNamespaceEditDetail` 等条目属于 predicate、composition 或 namespace editing 语境，应按所属 class 阅读。",
      "`UsdSkelBakeSkinningParms` 枚举值与 skinning bake 参数有关，和 `UsdSkel` schema 页面互补；它不等同于 DCC rig 控制器设置。",
      "本页与 `functions_enum.html` 互补：`functions_enum.html` 更适合找 enum 类型，本页适合找具体 enumerator value。",
    ],
    terms: [
      ["类成员枚举值", "class member enumerator"],
      ["枚举类型页", "enum type page"],
      ["stage 加载规则", "stage load rules"],
      ["命名空间编辑细节", "namespace edit detail"],
      ["蒙皮烘焙参数", "skinning bake parameter"],
      ["变换操作枚举值", "xform operation enumerator"],
    ],
  },
  {
    output: "full_site/api/usd_skel_page_front.html",
    title: "UsdSkel: USD Skeleton Schema and API",
    summary:
      "`usd_skel_page_front.html` 是 `UsdSkel` 模块入口，面向骨骼蒙皮网格、关节动画、binding 和查询 API 的 USD 数据表达。它强调可交换 schema 和 runtime query，不是完整角色 rig、IK solver 或 DCC 动画控制器系统。",
    notes: [
      "`SkelRoot` 表示骨骼系统根，通常用于组织参与 skeleton binding 的 prim；它不是普通 `UsdGeomXform` 层级的同义词。",
      "`Skeleton`、`SkelAnimation`、joint hierarchy、joint paths/names 与 joint transforms 是阅读核心；这些名称应保留英文以便和 schema 属性对照。",
      "`Linear Blend Skinning`、`joint influences`、`geom bind transform` 和 `skinning weights` 说明 mesh 如何绑定到骨骼；它们和普通 xform stack 是不同层级的概念。",
      "`API Introduction` 更适合开发者查 skeleton query、animation samples 和 binding resolution；`Schema Intro By Example` 更适合理解 authored scene structure。",
      "如果要讨论 blend shapes、instancing 或 best practices，应沿页面中的 API Manual 子链接继续阅读，而不是只依赖入口页摘要。",
    ],
    terms: [
      ["骨骼系统根", "SkelRoot"],
      ["骨架拓扑", "skeleton topology"],
      ["关节层级", "joint hierarchy"],
      ["蒙皮权重", "skinning weights"],
      ["绑定解析", "binding resolution"],
      ["可交换骨骼数据", "interchangeable skeleton data"],
    ],
  },
  {
    output: "full_site/api/usd_lux_page_front.html",
    title: "UsdLux: USD Lighting Schema",
    summary:
      "`usd_lux_page_front.html` 是 `UsdLux` 模块入口，说明 USD 如何表达可交换 lighting setup、light API、内置 light schema、plugin lights、light filters、linking 和 exposure 等语义。它不是 renderer-specific shading 文档，也不替代 `UsdShade` 或 `Sdr` 页面。",
    notes: [
      "`UsdLuxLightAPI` 表示 being a light 的 API 层；`UsdLuxBoundableLightBase` 与 `UsdLuxNonboundableLightBase` 区分有界和非有界光源。",
      "`UsdLuxCylinderLight`、`UsdLuxDiskLight`、`UsdLuxDistantLight`、`UsdLuxDomeLight`、`UsdLuxRectLight`、`UsdLuxSphereLight` 是内置 light schema；具体属性仍需进入各 class 页。",
      "`UsdLuxMeshLightAPI` 与 `UsdLuxVolumeLightAPI` 让 mesh 或 volume 参与发光表达，应与 `UsdGeomMesh`、`UsdVolVolume` 语义一起阅读。",
      "`LightListAPI`、`ShadowAPI`、`ShapingAPI`、`LightFilter`、`PortalLight` 和 plugin light/filter 说明本页覆盖的不只是 light prim 类型，还包括链接、阴影、整形和扩展机制。",
      "`UsdShade` encapsulation rules、`SdrRegistry` 和 shader discovery 是跨模块阅读点；不要把 lighting schema token 当成完整 shader implementation。",
    ],
    terms: [
      ["可交换灯光布置", "interchangeable lighting setup"],
      ["有界光源", "boundable light"],
      ["非有界光源", "nonboundable light"],
      ["灯光链接", "light linking"],
      ["灯光整形", "light shaping"],
      ["插件灯光过滤器", "plugin light filter"],
    ],
  },
  {
    output: "full_site/api/functions_vars_y.html",
    title: "Class Members - Variables - Y",
    summary:
      "`functions_vars_y.html` 是 Class Members 变量索引的 Y 段，当前包含 `UsdGeomTokensType`、`UsdLuxTokensType` 和 `UsdPhysicsTokensType`。它和 X/Z 段一样，是 token 变量导航页，帮助定位 Y 字母下的 domain token。",
    notes: [
      "`UsdGeomTokensType` 的 Y 条目可能与坐标轴、几何属性、尺寸或 schema attribute token 命名有关；具体含义应回到 token class 页面。",
      "`UsdLuxTokensType` 的 Y 条目属于 lighting domain，可能涉及灯光方向、shape、filter 或参数命名，不能直接等同于几何 Y 坐标。",
      "`UsdPhysicsTokensType` 的 Y 条目属于 physics schema 命名入口；它只帮助定位符号，不解释物理约束或 solver 行为。",
      "Y 段变量索引应和 `functions_y.html`、`functions_func_y.html` 区分：前者是变量/token，后者更偏 class member 或函数 accessor。",
      "本地中文层保留 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType` 原样，保证 Doxygen 搜索、源码和官方页面可直接对照。",
    ],
    terms: [
      ["Y 段变量索引", "Y variable index"],
      ["Y 字母 token", "Y-letter token"],
      ["schema attribute 命名", "schema attribute naming"],
      ["灯光 domain", "lighting domain"],
      ["函数 accessor", "function accessor"],
      ["源码对照", "source-code comparison"],
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
