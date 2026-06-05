import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-104";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/CylinderLight.html",
    title: "CylinderLight",
    summary:
      "`CylinderLight` 是从 cylinder 侧面向外发光的 intrinsic light，默认圆柱中心在原点、major axis 位于 X axis。阅读时要特别注意：它不从 flat end-caps 发光，示例通过 `inputs:length`、`inputs:radius` 和 `inputs:shaping:cone:angle` 控制光带形状。",
    notes: [
      "官方摘要里的 `does not emit light from the flat end-caps` 是核心约束。翻译时应明确只有圆柱侧面发光，不能把它解释成两端也发光的封闭体积光源。",
      "`inputs:length = 3` 和 `inputs:radius = 0.25` 分别决定圆柱发光体长度和半径；它们与 transform 一起决定灯光在场景中的可见形状和照明范围。",
      "`inputs:shaping:cone:angle = 45` 与 `xformOp:rotateXYZ` 共同让示例光带变窄。中文说明应保留 shaping 属性名，因为它属于 `usdLux` 灯光 shaping 语义的一部分。",
      "`CylinderLight` 可模拟 tube-shaped fluorescent lights、linear lights、light panels 和 building interiors 中的 commercial lighting。保留这些英文用途词有助于和 DCC/renderer UI 对齐。",
      "在与 `DiskLight`、`RectLight` 对比时，本页重点是线性/管状面积光；如果需要表达点光或球形光，应转向 `SphereLight`，不要滥用 `CylinderLight`。"
    ],
    terms: [
      ["CylinderLight", "圆柱光源"],
      ["major axis", "主轴"],
      ["flat end-caps", "圆柱端盖"],
      ["inputs:length", "长度输入属性"],
      ["inputs:shaping:cone:angle", "光锥角输入属性"],
      ["tube-shaped fluorescent lights", "管状荧光灯"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DomeLight_1.html",
    title: "DomeLight_1",
    summary:
      "`DomeLight_1` 表达从远处外部环境向内发光的 dome light，常用于 sky、HDR environment 和 Image Based Lighting (IBL)。它带有版本后缀，应与无后缀 `DomeLight` 区分阅读。",
    notes: [
      "`inputs:texture:file` 指向环境贴图资源，`inputs:texture:format` 描述贴图格式。路径、格式 token 和 `OpenEXR` 等术语应保持英文原样，方便工具链解析。",
      "`poleAxis` 决定 dome 的默认朝向；fallback 值 `scene` 表示 dome 顶极对齐 stage up axis。环境贴图方向错误时，通常应检查 `poleAxis`、stage up axis 和 transform。",
      "`portals` relationship 用于把 DomeLight 与 PortalLight 等采样引导对象关联。阅读时应理解它影响 light sampling/visibility 引导，而不是普通几何父子关系。",
      "`DomeLight_1` 与 `DistantLight` 的角色不同：DomeLight 面向环境光/IBL，DistantLight 面向方向性远光。两者可以配合，但不能互相替代。",
      "页面名称中的 `_1` 是 schema/version 语境的一部分。本地复刻和中文说明都应保留 `DomeLight_1` 字面量，避免误导读者跳到另一个 schema 页面。"
    ],
    terms: [
      ["DomeLight_1", "DomeLight 版本化 schema"],
      ["Image Based Lighting", "基于图像的光照"],
      ["inputs:texture:file", "环境贴图文件输入属性"],
      ["inputs:texture:format", "环境贴图格式输入属性"],
      ["poleAxis", "穹顶极轴"],
      ["portals", "PortalLight 关系"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/GeometryLight.html",
    title: "GeometryLight",
    summary:
      "`GeometryLight` 表示由 geometric prim 向外发光的历史 schema，通常关联 `Mesh`。官方页面明确标注该 schema 已 deprecated，应优先使用 applied to a Mesh 的 `MeshLight` 或现代 `MeshLightAPI` 路径。",
    notes: [
      "本页最重要的信息是 deprecated/migration 边界：它仍需要保留以解释旧资产和历史 Doxygen 链接，但新资产创作不应优先选择 `GeometryLight`。",
      "`geometry` relationship 指向作为 light source 的几何体。它不是普通 material binding，也不是渲染可见性关系，而是把几何 prim 与发光语义连接起来。",
      "`light:shaderId` 是 GeometryLight 的 shader identifier；页面同时提到 USD 会注册 source type 为 `USD` 的 `Sdr shader node`，帮助渲染器识别灯光输入。",
      "中文导读应把 `GeometryLight` 与 `MeshLight`、`MeshLightAPI` 的迁移关系讲清楚，并保留 `deprecated` 英文词，方便读者在旧文档和新 schema 间定位。",
      "如果后续补全逐段翻译，应强调旧文件兼容和迁移阅读，而不是把本页包装成推荐的新灯光建模方式。"
    ],
    terms: [
      ["GeometryLight", "几何体光源"],
      ["deprecated", "已弃用"],
      ["MeshLight", "Mesh 光源"],
      ["MeshLightAPI", "Mesh 光源 API"],
      ["geometry relationship", "几何光源关系"],
      ["Sdr shader node", "Sdr 着色节点"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightAPI.html",
    title: "LightAPI",
    summary:
      "`LightAPI` 是让一个 prim 获得 light capabilities 的 API schema。它定义通用灯光输入、light-linking/shadow-linking collection、`light:filters`、`light:shaderId` 以及 UsdShade connectable prim 规则，是理解具体 `usdLux` 灯光 schema 的基础页。",
    notes: [
      "`inputs:color`、`inputs:intensity`、`inputs:exposure`、`inputs:diffuse`、`inputs:specular` 等属性是多个灯光 schema 共享的核心输入。中文说明应保留属性名并解释其作用层级。",
      "`collection:lightLink:includeRoot` 与 `collection:shadowLink:includeRoot` 支持 light-linking 和 shadow-linking，用 collection 决定哪些 geometry 受光照或阴影影响。",
      "`light:filters` relationship 连接 `LightFilter` prim；`light:materialSyncMode` 和 `light:shaderId` 则与材质同步、shader 标识和渲染器解释有关。",
      "官方说明指出带 `LightAPI` 的 prim 是 UsdShade networks 中的 connectable prim，并应遵守 UsdShade node encapsulation。普通 connectable container 下不能随意嵌套灯光。",
      "`LightAPI` 是读 `DiskLight`、`CylinderLight`、`DomeLight_1`、`LightFilter` 等页面的公共背景。后续逐段翻译应优先补齐 collection/linking/filter/connectability 四条线索。"
    ],
    terms: [
      ["LightAPI", "灯光 API schema"],
      ["light capabilities", "灯光能力"],
      ["light-linking", "灯光链接"],
      ["shadow-linking", "阴影链接"],
      ["light:filters", "灯光过滤器关系"],
      ["connectable prim", "可连接 prim"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightFilter.html",
    title: "LightFilter",
    summary:
      "`LightFilter` 用于调制 light 的效果，通常通过 `LightAPI` 的 `light:filters` relationship 与灯光关联。它自身也是 UsdShade connectable prim/container，可以拥有实现 filter 逻辑的 connectable children。",
    notes: [
      "`collection:filterLink:includeRoot` 控制 filterLink collection 的默认包含行为；通过 collection 可以决定哪些 geometry prims 会被该 filter 影响。",
      "`lightFilter:shaderId` 指定 light filter shader identifier。若 filter 依赖 shader 子网络，相关 shader nodes 可以作为 connectable children 嵌套在 `LightFilter` 下。",
      "官方说明强调 `LightFilter` 可以嵌套在 light prim 下，也可以包含 connectable children；但不能随意放入无关的 connectable container，例如 `UsdShade Material`。",
      "`Representing Filters on Lights`、`UsdShade node encapsulation` 和 `Collections and Patterns` 是理解本页的三条关键背景路径：分别解释 filter 语义、封装规则和 collection 选择机制。",
      "Light filters 的应用顺序和具体效果往往依赖 renderer 支持。中文层应解释结构和关系，不应承诺所有 renderer 都有同样的 filter 视觉结果。"
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, function names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
