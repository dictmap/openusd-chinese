import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-068";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html",
    title: "BoundableLightBase",
    notes: [
      "`BoundableLightBase` 是 boundable intrinsic lights 的基类，面向 `RectLight`、`SphereLight` 等有空间边界和 extent 的具体灯光 schema。",
      "该页的核心是把 `LightAPI` 的灯光能力直接提供给 concrete derived lights；阅读时应把它理解为灯光 schema 继承结构的一层，而不是可直接实例化的终端灯光类型。",
      "`Inherited Properties (Boundable)` 中的 `extent` 决定可包围范围；`Inherited Properties (Xformable)` 与 `Imageable` 中的 `xformOpOrder`、`visibility`、`purpose` 等属性影响变换、可见性和渲染用途。",
      "`Representing Boundable Lights` 是重要延伸链接，用于理解有边界 intrinsic lights 的建模和示例；本页只给出 schema 属性入口和简短定义。",
      "API 名称、属性名和派生灯光名必须保持原样，中文层只说明继承关系、使用场景和属性阅读顺序。"
    ],
    terms: [
      ["BoundableLightBase", "有边界灯光基类"],
      ["intrinsic lights", "内建灯光"],
      ["LightAPI", "灯光能力 API"],
      ["extent", "包围范围属性"],
      ["Xformable", "可变换 schema"],
      ["Imageable", "可成像 schema"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DomeLight_1.html",
    title: "DomeLight_1",
    notes: [
      "`DomeLight_1` 描述从远处外部环境向内发光的 DomeLight 版本，用于 sky、HDR environment 和 Image Based Lighting (IBL) 等环境光照场景。",
      "`inputs:texture:file` 与 `inputs:texture:format` 是读取 HDR/IBL 贴图的关键入口；`OpenEXR specification` 链接说明格式侧背景，文件路径和格式 token 需要保持英文原样。",
      "`poleAxis` 决定 dome 的默认朝向；fallback 值 `scene` 表示 dome 顶极会对齐 stage 的 up axis，这一点会影响环境贴图方向和视觉结果。",
      "`portals` 关系用于与 PortalLight 等光照采样/引导概念配合；阅读时应和 `DomeLight`、`PortalLight` 以及现代 usdLux 文档一起核对版本差异。",
      "`DomeLight_1` 带版本后缀，不能和无后缀 `DomeLight` 混同；中文说明保留该页面名，避免用户误以为它就是当前唯一 DomeLight 定义。"
    ],
    terms: [
      ["DomeLight_1", "DomeLight 版本化 schema"],
      ["HDR", "高动态范围图像"],
      ["Image Based Lighting", "基于图像的光照"],
      ["poleAxis", "穹顶极轴方向"],
      ["portals", "PortalLight 关系"],
      ["up axis", "stage 上轴"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/GeometryLight.html",
    title: "GeometryLight",
    notes: [
      "`GeometryLight` 表示从 geometric prim 向外发光的灯光，通常关联到 `Mesh`；官方摘录明确说明该 schema 已 deprecated，应改用 applied 到 Mesh 的 `MeshLight`。",
      "`geometry` relationship 指定作为光源的几何体；它不是普通材质绑定，而是把几何 prim 与灯光发射语义连接起来。",
      "`light:shaderId` 对应 GeometryLight 的 shader identifier；USD 也会注册 source type 为 `USD` 的 Sdr shader node，使灯光输入可以被渲染器/着色系统识别。",
      "本页适合用来理解历史 GeometryLight 设计和迁移边界；新内容应优先查 `MeshLightAPI` 或相关现代 usdLux schema。",
      "虽然该 schema deprecated，本地复刻仍保留中文导读和术语，以便用户理解旧资产、历史文件或 Doxygen 链接中的 GeometryLight。"
    ],
    terms: [
      ["GeometryLight", "几何体灯光"],
      ["deprecated", "已弃用"],
      ["MeshLight", "Mesh 灯光"],
      ["geometry relationship", "几何光源关系"],
      ["light:shaderId", "灯光 shader 标识"],
      ["Sdr shader node", "Sdr 着色节点"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightAPI.html",
    title: "LightAPI",
    notes: [
      "`LightAPI` 是给 prim 赋予灯光能力的 API schema；应用后 prim 会获得 `inputs:color`、`inputs:intensity`、`inputs:exposure`、`inputs:diffuse`、`inputs:specular` 等灯光属性。",
      "`collection:lightLink:includeRoot` 与 `collection:shadowLink:includeRoot` 支持 light-linking 和 shadow-linking，用 collection 控制哪些 geometry 被照亮或投影影响。",
      "`light:filters` 用于关联 `LightFilter`；`light:materialSyncMode` 和 `light:shaderId` 则和材质同步、shader 标识及渲染器解释有关，属性名必须保持英文原样。",
      "官方摘录强调带 `LightAPI` 的 prim 是 UsdShade networks 中的 connectable prim，并必须遵守 UsdShade node encapsulation；它不能位于普通 connectable container 内，除非是灯光之间的特殊父子关系，例如 PortalLight under DomeLight。",
      "阅读本页时应先掌握通用灯光输入，再读 collection/linking、filters 和 connectable containment 规则；这比只看某一个具体灯光 schema 更基础。"
    ],
    terms: [
      ["LightAPI", "灯光 API schema"],
      ["light-linking", "灯光链接"],
      ["shadow-linking", "阴影链接"],
      ["light:filters", "灯光过滤器关系"],
      ["connectable prim", "可连接 prim"],
      ["UsdShade node encapsulation", "UsdShade 节点封装规则"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightFilter.html",
    title: "LightFilter",
    notes: [
      "`LightFilter` 用于调制灯光效果，通常通过 `LightAPI` 的 `light:filters` relationship 与灯光关联。",
      "`collection:filterLink:includeRoot` 控制 filterLink collection 的默认包含行为；通过该 collection 可以指定哪些 geometry Prims 被包含或排除，从而决定是否受该 light filter 影响。",
      "`lightFilter:shaderId` 指定 light filter 的 shader 标识；如果 filter 需要实现着色逻辑，相关 shader 子节点可作为 connectable children 嵌套在 LightFilter 下。",
      "官方摘录说明 `LightFilter` 本身是 connectable prim/container，可以嵌套其他可连接子节点，也可以嵌套在 light prim 下；但不能放在无关的 connectable container 里，例如 `UsdShade Material`。",
      "`Representing Filters on Lights`、`UsdShade node encapsulation` 和 `Collections and Patterns` 是理解本页的三条延伸路径：分别解释过滤器语义、可连接容器规则和 collection 选择机制。"
    ],
    terms: [
      ["LightFilter", "灯光过滤器"],
      ["filterLink collection", "过滤器链接集合"],
      ["collection:filterLink:includeRoot", "filterLink 根包含属性"],
      ["lightFilter:shaderId", "过滤器 shader 标识"],
      ["connectable container", "可连接容器"],
      ["UsdShade Material", "UsdShade 材质容器"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、属性/关系阅读路径、继承或连接边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, property and relationship reading paths, inheritance or connection boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
