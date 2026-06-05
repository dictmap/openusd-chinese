import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-077";

const refinements = [
  {
    output: "full_site/release/wp_connectable_nodes.html",
    title: "Generalizing Connectable Nodes Beyond UsdShade",
    notes: [
      "本 proposal 的核心是把 `connectable node` 从材质网络推广到更广的 shader-like computation 网络，包括灯光、滤镜、相机、几何处理和 RenderMan USD schema。",
      "`UsdShadeNodeDefAPI` 承担 node definition 能力，`UsdShadeConnectableAPI` 保留连接语义；这种拆分让非材质 schema 能复用节点定义和连接检查，而不必伪装成 Material/Shader。",
      "plugin-defined connectability callbacks 允许 schema 插件自定义连接规则，避免把所有节点连接规则硬编码进 UsdShade 基类。",
      "对 `UsdLux` 和 `UsdRi` 的意义在于：灯光、light filters 或 renderer-specific 节点可以拥有 Sdr/Ndr 节点定义与网络连接能力，Hydra/render delegates 也能更数据驱动地消费这些网络。",
      "阅读时应区分 node definition、connectability metadata、actual relationship connections 三层：定义说明节点是什么，metadata/回调说明能否连接，relationship 才是 authored connection。"
    ],
    terms: [
      ["connectable node", "可连接节点"],
      ["UsdShadeNodeDefAPI", "节点定义 API schema"],
      ["UsdShadeConnectableAPI", "可连接 API schema"],
      ["connectability callbacks", "连接性回调"],
      ["Sdr / Ndr", "着色节点发现与注册体系"],
      ["non-shading networks", "非材质着色网络"]
    ]
  },
  {
    output: "full_site/release/wp_coordsys.html",
    title: "Coordinate Systems in USD Proposal",
    notes: [
      "本 proposal 解决 shader 如何用稳定短名称访问 frame of reference，而不是直接依赖可能随引用、实例化或资产封装变化的长 prim path。",
      "`coordSys:*` relationship 把一个名字绑定到某个 prim 的坐标空间；shader 通过字符串名消费该坐标系，绑定关系则按 namespace subtree 作用域继承和覆盖。",
      "同一个 prim 可以绑定多个 coordinate systems，例如 `modelSpace`、`instanceSpace`、`paintSpace`；这让 procedural texture、projection painting 和稳定 reference frame 可以并存。",
      "与 primvars 不同，coordSys 不是每点数据，而是命名坐标框架；与 collections 不同，它强调 shader 消费的坐标空间解析，而不是 prim 集合选择。",
      "阅读 USDA 示例时应关注 `rel coordSys:modelSpace`、`rel coordSys:instanceSpace` 与 shader `inputs:coordsys` 的配合：前者 author 绑定，后者按名称请求。"
    ],
    terms: [
      ["Coordinate Systems", "坐标系"],
      ["UsdShadeCoordSysAPI", "UsdShade 坐标系 API"],
      ["coordSys:* relationship", "坐标系绑定关系"],
      ["frame of reference", "参考坐标框架"],
      ["projection painting", "投影绘制"],
      ["procedural texture", "程序化纹理"]
    ]
  },
  {
    output: "full_site/release/wp_rigid_body_physics.html",
    title: "Rigid Body Physics in USD Proposal",
    notes: [
      "本 proposal 是 USD 刚体物理 schema 的第一阶段设计，范围明确聚焦 rigid body simulation，不覆盖流体、软体、破碎等更广泛仿真问题。",
      "设计倾向用 API schemas 附加物理行为到现有 prim，例如 rigid body、collision、mass properties、joint 或 material，而不是要求重建一套平行的物理对象树。",
      "`PhysicsScene` 表达全局仿真设置，例如 gravity、units 和 scene-level 参数；它不是几何对象，而是仿真上下文入口。",
      "collision shapes、physics materials、pairwise filtering 和 joints 分别解决形状近似、接触材质、碰撞过滤和约束连接；这些概念应和渲染 mesh/display purpose 分开理解。",
      "阅读时要注意 historical/outdated 提示：当前使用应回到 `UsdPhysics overview`，本页主要解释为什么 USD Physics 采用 API schema、层级交互和最小公共刚体概念。"
    ],
    terms: [
      ["Rigid Body Physics", "刚体物理"],
      ["PhysicsScene", "物理场景设置 prim"],
      ["Rigid Bodies", "刚体"],
      ["Collision Shapes", "碰撞形状"],
      ["Physics Materials", "物理材质"],
      ["Joints", "关节/约束"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充 proposal 二次精修说明，重点解释设计目标、对象模型、authoring/consumption 边界和常见误读；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds a second-pass Chinese refinement for ${escapeHtml(item.title)}, focusing on design goals, object model, authoring and consumption boundaries, and common interpretation risks while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
