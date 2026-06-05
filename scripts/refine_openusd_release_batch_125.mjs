import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-125";

const refinements = [
  {
    output: "full_site/release/wp_usdlux_for_geometry_lights.html",
    title: "Adapting UsdLux to Accommodate Geometry Lights",
    summary:
      "`Adapting UsdLux to Accommodate Geometry Lights` 是 UsdLux 几何灯光设计的历史 proposal。阅读时应把它理解为 schema 和渲染系统协作的设计说明：场景中的几何体通过 `GeometryLight`、`MeshLightAPI`、`UsdGeomGprim` 和 `UsdLuxLightAPI` 表达发光语义，而最终采样、能量归一化和渲染器近似仍由 renderer delegate 或具体 renderer 决定。",
    notes: [
      "proposal 的核心目标是让几何对象可以稳定参与照明表达，而不是要求 USD 在核心层实现一个统一的光传输模型；USD 负责可组合的场景描述，渲染器负责解释和求值。",
      "`GeometryLight` 和 `MeshLightAPI` 关注把发光能力附着到已有 geometry 上，因此它们和普通 `UsdLuxLight` 的建模方式不同：一个强调形状即光源，一个强调专用 light prim。",
      "当页面提到 emission、area light 或 mesh light 时，应保留这些英文术语，并区分 material emission、light schema 和 renderer-specific sampling 三个层次。",
      "几何灯光通常需要考虑 visibility、purpose、instancing、material binding 和 transform 组合；这些信息来自 USD 场景图，而不是单个 light schema 独立决定。",
      "当前读者应把本页作为历史背景和迁移线索，再回到 `UsdLux` schema 页面核对实际 API、属性名和 renderer 支持范围。",
    ],
    terms: [
      ["GeometryLight", "几何灯光 schema"],
      ["MeshLightAPI", "网格灯光 API schema"],
      ["UsdGeomGprim", "USD 几何基元"],
      ["UsdLuxLightAPI", "UsdLux 灯光 API schema"],
      ["material emission", "材质发光"],
      ["renderer delegate", "渲染代理"],
    ],
  },
  {
    output: "full_site/release/wp_coordsys.html",
    title: "Coordinate Systems in USD Proposal",
    summary:
      "`Coordinate Systems in USD Proposal` 解释 USD 如何在场景中声明、绑定和消费命名坐标系。它的重点不是简单的矩阵换算，而是通过 `CoordSysAPI`、`coordSys` 关系和 binding 语义，让 shading、lookdev、procedural 节点或 renderer 能够引用模型、组件或局部空间。",
    notes: [
      "`CoordSysAPI` 用于在 prim 上声明可命名的 coordinate system；这些命名空间可以被下游节点引用，从而避免把空间含义硬编码到 shader 参数或工具约定中。",
      "坐标系 binding 的强弱、继承和覆盖要结合 USD composition 读取；同名 binding 在不同层或不同 prim 层级上出现时，最终结果取决于组合后的 scenegraph。",
      "proposal 中的坐标系主要服务于 shading 和资产互换场景，不能误读为替代 `xformOp`、`UsdGeomXformable` 或物理模拟坐标系的通用机制。",
      "命名坐标系常出现在模型根、材质网络或 procedural 生成流程中；阅读链接和示例时应同时关注 prim path、relationship target 和 consumer 端的解析规则。",
      "本地复刻保留 `coordSys`、`binding rels`、`UsdShade` 等英文术语，便于和 API 文档、USDA 示例及 renderer 实现逐项对照。",
    ],
    terms: [
      ["CoordSysAPI", "坐标系 API schema"],
      ["coordSys", "坐标系命名空间"],
      ["binding rels", "绑定关系"],
      ["consumer", "消费端节点或系统"],
      ["model root", "模型根 prim"],
      ["UsdGeomXformable", "可变换几何 schema"],
    ],
  },
  {
    output: "full_site/release/wp_ar2.html",
    title: "Asset Resolution (Ar) 2.0",
    summary:
      "`Asset Resolution (Ar) 2.0` 讨论 USD 资产路径解析体系的第二代设计。它的核心是 `ArResolver`、resolver context、asset identifier 和 repository path 之间的边界，而不是把所有 asset path 直接展开为本地文件系统路径。",
    notes: [
      "`ArResolver` 是 USD 解析 asset path 的抽象入口；不同项目可以用自定义 resolver 把标识符映射到版本库、包、远程服务或普通文件。",
      "resolver context 影响同一个 asset identifier 的解析结果，因此 layer 打开、reference 解析和包内资源定位都必须在正确上下文中完成。",
      "proposal 区分 authored asset path、resolved path、repository path 和 normalized identifier；这些概念混在一起会导致缓存、去重和版本选择错误。",
      "`ArDefaultResolver` 只是默认实现，不代表 Ar 体系只能服务文件系统；大型资产库通常会在 resolver 中编码项目、镜头、版本和权限策略。",
      "阅读本页时应保留 `ArResolver`、`ArResolverContext`、`asset identifier` 等英文 API 词，避免把 proposal 简化成路径拼接教程。",
    ],
    terms: [
      ["ArResolver", "资产解析器"],
      ["resolver context", "解析上下文"],
      ["asset identifier", "资产标识符"],
      ["repository path", "仓库路径"],
      ["resolved path", "解析后路径"],
      ["ArDefaultResolver", "默认资产解析器"],
    ],
  },
  {
    output: "full_site/release/wp_connectable_nodes.html",
    title: "Generalizing Connectable Nodes Beyond UsdShade",
    summary:
      "`Generalizing Connectable Nodes Beyond UsdShade` 说明如何把可连接节点模型从材质 shading 网络推广到更广泛的 USD schema。它关注 `UsdShadeConnectableAPI`、input/output、source resolution、NodeGraph 和连接验证，让 lights、procedural nodes 或其他域可以共享一致的连接语义。",
    notes: [
      "本 proposal 的关键不是新增某一种节点类型，而是把 connectable 的共同规则抽象出来，使不同 schema 可以复用连接发现、连接创建和 source 查询逻辑。",
      "`UsdShadeConnectableAPI` 保留在名称中，是因为历史上连接模型来自 UsdShade；但 proposal 讨论的是跨域复用，不应把它局限为材质专用能力。",
      "连接关系需要区分 input、output、interface input、NodeGraph 内部连接和外部暴露接口；这些层次决定了 authoring 工具如何建立和验证网络。",
      "source resolution 既要处理直接连接，也要处理穿过 NodeGraph 的接口转发；如果只看关系 target，容易漏掉最终 producer 或类型兼容性检查。",
      "本页适合和 `UsdLux` 插件灯光、procedural schema、material network 页面一起阅读，以理解为什么连接语义需要稳定的 API 边界。",
    ],
    terms: [
      ["UsdShadeConnectableAPI", "可连接节点 API"],
      ["input", "输入端口"],
      ["output", "输出端口"],
      ["NodeGraph", "节点图"],
      ["source resolution", "连接源解析"],
      ["interface input", "接口输入"],
    ],
  },
  {
    output: "full_site/release/wp_rigid_body_physics.html",
    title: "Rigid Body Physics in USD Proposal",
    summary:
      "`Rigid Body Physics in USD Proposal` 描述 USD 中刚体物理 schema 的设计边界。它关注 `UsdPhysics` 如何表达 rigid body、collision、joint、mass 和 physics scene 等可交换数据，而不是把某个求解器、积分器或实时仿真运行时固化进 USD 核心。",
    notes: [
      "USD physics schema 的目标是把物理意图写入 scene description：哪些 prim 是刚体、哪些 shape 参与碰撞、质量属性如何声明、关节如何连接对象。",
      "`RigidBodyAPI`、`CollisionAPI`、`MassAPI`、`PhysicsScene` 和 joint schema 通常以 API schema 或专用 prim 的形式组合使用；最终行为仍取决于 simulator 或 plugin。",
      "proposal 中的 collision geometry 不等同于 render geometry；工具可选择简化形状、近似网格或单独 collision representation 来满足性能和稳定性要求。",
      "关节、驱动、limit 和 collision filtering 需要结合 scene graph 层级和 composition 解析；单看某个属性不能判断仿真是否会稳定运行。",
      "本页应作为 schema 设计背景阅读；实际项目还需要检查当前 `UsdPhysics` API、目标 simulator 的支持矩阵和验证报告。",
    ],
    terms: [
      ["UsdPhysics", "USD 物理 schema 集"],
      ["RigidBodyAPI", "刚体 API schema"],
      ["CollisionAPI", "碰撞 API schema"],
      ["MassAPI", "质量 API schema"],
      ["PhysicsScene", "物理场景"],
      ["collision filtering", "碰撞过滤"],
    ],
  },
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English page names, API names, schema names, property names, commands, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
  results,
}, null, 2));
