import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-105";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/DomeLight.html",
    title: "DomeLight",
    summary:
      "`DomeLight` 是从极远外部环境向内发光的 intrinsic light，常用于 sky、HDR environment map 和 Image Based Lighting (IBL)。本页重点是环境照明语义、`inputs:texture:file` 贴图入口、OpenEXR latitude-longitude map 方向约定，以及它和局部面积光之间的分工。",
    notes: [
      "`DomeLight` 的光不是从某个局部面积或点发出，而是从 very distant external environment 向场景内部照明；中文说明应把它定位为环境光入口，而不是普通几何灯。",
      "`inputs:texture:file = @orientationLatLong.tex@` 示例说明环境贴图以 asset path 形式进入灯光 schema。路径字面量、asset 引用语法和 texture 属性名必须保留英文原样。",
      "官方说明强调 dome top pole 默认对齐 world +Y axis，并遵循 OpenEXR latitude-longitude maps 约定。排查环境贴图方向时，应同时检查贴图极点、stage up axis 和 prim transform。",
      "`DomeLight` 适合提供全局 sky/HDR/IBL 光照；如果需要窗口采样引导，应结合 `PortalLight` 和 dome 的 portals relationship，而不是把 portal 当成另一个普通面积灯。",
      "本页还链接 `DomeLight_1`，后续阅读应区分无后缀 `DomeLight` 页面与带 `_1` 后缀页面的版本/生成上下文，不要把两个页面的链接目标混写。"
    ],
    terms: [
      ["DomeLight", "穹顶环境光"],
      ["intrinsic light", "内建灯光 schema"],
      ["Image Based Lighting", "基于图像的照明"],
      ["inputs:texture:file", "环境贴图文件输入属性"],
      ["latitude-longitude maps", "经纬度环境贴图"],
      ["world +Y axis", "世界坐标 +Y 轴"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightListAPI.html",
    title: "LightListAPI",
    summary:
      "`LightListAPI` 不定义新的灯光类型，而是在 traversal 期间发现和收集场景中的灯光。它的核心阅读线索是 `ComputeLightList()`、`ComputeModeIgnoreCache`、descendant lights、cache 行为以及返回的 light path 列表。",
    notes: [
      "`LightListAPI` 的用途是 discover lights in a scene during traversal；它回答“这个子树下有哪些灯”，而 `LightAPI` 回答“这个 prim 是否具备灯光能力”。",
      "`ComputeLightList()` 会遍历并 gather lights，例如 applied `LightAPI` 的 prim。中文导读应保留函数名和 API 名，避免翻译成无法搜索的中文函数描述。",
      "`ComputeModeIgnoreCache` 表示这次计算忽略已有缓存，直接遍历收集。大型场景中 cache 是否可用会影响性能和结果新鲜度，因此它不是普通布尔选项。",
      "官方 Python 示例从 `stage.GetPrimAtPath(\"/World\")` 构造 `UsdLux.LightListAPI`，再遍历 `computedLights`。阅读时应把返回值理解为 light paths，而不是直接的灯光对象列表。",
      "后续逐段翻译应补齐 gather、cache、invalidate、traversal scope 的关系，尤其是当灯光增删或 `LightAPI` 应用状态改变时，缓存列表可能需要重新计算。"
    ],
    terms: [
      ["LightListAPI", "灯光列表 API schema"],
      ["traversal", "场景遍历"],
      ["ComputeLightList()", "计算灯光列表函数"],
      ["ComputeModeIgnoreCache", "忽略缓存计算模式"],
      ["LightAPI", "通用灯光 API schema"],
      ["light paths", "灯光路径列表"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/PortalLight.html",
    title: "PortalLight",
    summary:
      "`PortalLight` 是位于 local XY plane 的 rectangular portal，用来引导 `DomeLight` 采样。它的重点不是直接照亮场景的面积灯语义，而是通过 `inputs:height`、`inputs:width`、`-Z direction` 和 dome 的 portals relationship 表达环境光采样窗口。",
    notes: [
      "官方摘录中的 `guides sampling of a dome light` 是核心语义：`PortalLight` 帮助环境光在窗口、门洞、开口等区域更有效采样，不等同于 `RectLight` 这类直接发光面积灯。",
      "`PortalLight` 在 local XY plane 中定义矩形，并向 local `-Z` direction 传递采样方向；实际场景中的朝向取决于 prim transform 和 `xformOpOrder`。",
      "`inputs:height` 控制 local Y axis 尺寸，`inputs:width` 控制 local X axis 尺寸。默认 rectangle 为 1 unit 只是局部基础尺寸，不代表最终世界空间大小。",
      "本页应和 `DomeLight` 一起读：`DomeLight` 的 `portals` relationship 指向 portal，portal 提供采样引导窗口，两者共同构成环境光采样加速/定向表达。",
      "`light:shaderId` 保留 portal light shader 标识入口；不同 render delegate 对 portal sampling 的支持可能不同，中文层应解释结构语义，不承诺所有渲染器效果一致。"
    ],
    terms: [
      ["PortalLight", "传送门灯光/采样入口灯"],
      ["rectangular portal", "矩形采样入口"],
      ["local XY plane", "本地 XY 平面"],
      ["-Z direction", "本地 -Z 方向"],
      ["inputs:height", "portal 高度输入属性"],
      ["portals relationship", "DomeLight 的 portal 关系"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html",
    title: "MeshLightAPI",
    summary:
      "`MeshLightAPI` 是 applied API，用来把 light behavior 应用到 `Mesh` prim。它比直接把 `LightAPI` 应用到 Mesh 更合适，因为它内置了 mesh light 常用默认行为，包括 `light:materialSyncMode = materialGlowTintsLight` 和 `light:shaderId = MeshLight`。",
    notes: [
      "`MeshLightAPI` 改变的是现有 `Mesh prim` 的灯光语义和渲染解释，不是创建一个新的几何 prim 类型。中文说明应明确 applied API 和 concrete prim 的区别。",
      "`materialGlowTintsLight` 让 Mesh 的 bound material 参与灯光色调，是 mesh emission 与 UsdShade material binding 之间的关键桥梁；token 字面量必须保留英文。",
      "`light:shaderId` 默认指向 `MeshLight`，方便插件或 renderer 挂接额外 mesh light properties。这里的 shaderId 是渲染解释入口，不是用户可随意翻译的显示名。",
      "本页适合回答“发光网格应该如何表达”：新资产优先使用 `MeshLightAPI`，而不是旧式 `GeometryLight` 或直接应用通用 `LightAPI` 的裸做法。",
      "后续逐段翻译应把 mesh 几何、材质绑定、发光强度、renderer 支持和 `Mesh Lights` 示例串起来，避免只翻译属性表而丢失建模工作流。"
    ],
    terms: [
      ["MeshLightAPI", "网格灯光 API schema"],
      ["applied API", "应用型 API schema"],
      ["Mesh prim", "网格 prim"],
      ["light:materialSyncMode", "灯光材质同步模式"],
      ["materialGlowTintsLight", "材质 glow 参与灯光着色的 token"],
      ["light:shaderId", "灯光 shader 标识"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/ShadowAPI.html",
    title: "ShadowAPI",
    summary:
      "`ShadowAPI` 提供 shadow color、shadow distance、shadow falloff 等阴影外观控制。官方明确这些是 non-physical controls，适合艺术控制，而不是物理精确照明模拟；阅读时应把它和 `LightAPI` 的 shadow-linking 区分开。",
    notes: [
      "`inputs:shadow:color` 调整灯光投射阴影的颜色，适合风格化或美术调色；它不是能量守恒或真实光传输参数。",
      "`inputs:shadow:distance`、`inputs:shadow:falloff` 和 `inputs:shadow:falloffGamma` 共同影响阴影随距离变化的衰减曲线，常用于限制阴影影响范围或调整过渡软硬。",
      "`inputs:shadow:enable` 是是否让该灯参与阴影渲染的开关；它不删除灯光、不移除 link collection，只影响阴影行为是否启用。",
      "`LightAPI` 的 shadow-linking 选择哪些对象进入阴影关系，`ShadowAPI` 则控制阴影如何显示。两个概念应分开翻译，不能合并成一个“阴影设置”。",
      "这些属性的实际视觉效果依赖 renderer 支持。中文层应记录 schema 意图和属性边界，同时保留 `non-physical controls` 这个英文术语提醒读者不要做物理含义过度推断。"
    ],
    terms: [
      ["ShadowAPI", "阴影控制 API schema"],
      ["non-physical controls", "非物理艺术控制"],
      ["inputs:shadow:color", "阴影颜色输入属性"],
      ["inputs:shadow:distance", "阴影距离输入属性"],
      ["inputs:shadow:falloffGamma", "阴影衰减 gamma 输入属性"],
      ["shadow-linking", "阴影链接"]
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
