import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "usdLux-schema-quality-pass-004";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/CylinderLight.html",
    title: "CylinderLight",
    notes: [
      "CylinderLight 是从圆柱侧面向外发光的 intrinsic light，圆柱默认以原点为中心、主轴沿 X 轴；注意它不从两端 flat end-caps 发光。",
      "该 schema 适合表达管状荧光灯、线性灯、灯板以及建筑室内常见的商业照明；阅读时应把 length、radius、旋转和 light cone angle 一起理解为控制光源形状与照射范围的参数组。",
      "示例中 CylinderLight 靠近 Sphere 与 Cube，长度为 3、半径为 0.25，并通过旋转和收窄 light cone angle 得到较窄的光带；中文层只解释效果，不改动属性名。",
      "后续段落级翻译应继续补齐继承关系、UsdLux LightAPI 通用属性和渲染器如何解释面积光采样之间的关系。"
    ],
    terms: [
      ["CylinderLight", "圆柱灯"],
      ["intrinsic light", "内建光源 schema"],
      ["flat end-caps", "圆柱端盖"],
      ["light cone angle", "光锥角"],
      ["tube-shaped fluorescent lights", "管状荧光灯"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DiskLight.html",
    title: "DiskLight",
    notes: [
      "DiskLight 从位于 XY 平面的圆盘一侧发光，默认发光方向沿 -Z 轴；它适合表达摄影 soft box、圆形灯板或较柔和的面光源。",
      "阅读本页时重点看 radius 与 intensity 如何一起决定可见光源尺寸和照明强度；圆盘面积越大，阴影通常越柔和，但最终效果仍取决于渲染器采样与单位约定。",
      "官方示例把 DiskLight 放在 Sphere 与 Cube 附近，并设置 radius 0.8、intensity 20；这些数值和属性名保持英文原样，便于和 USD scene 示例对应。",
      "DiskLight 与 RectLight、SphereLight、CylinderLight 都属于常用 intrinsic light，后续精修可以把它们并排比较，帮助读者选择合适的面积光类型。"
    ],
    terms: [
      ["DiskLight", "圆盘灯"],
      ["circular disk", "圆形发光盘"],
      ["-Z axis", "-Z 轴方向"],
      ["soft box", "柔光箱"],
      ["intensity", "光强属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DistantLight.html",
    title: "DistantLight",
    notes: [
      "DistantLight 表达来自远处、方向近似一致的光源，默认沿 -Z 轴照射；它也常被称为 directional light。",
      "典型用途是太阳光等距离很远、覆盖全场景且光线近似平行的 broad source；因此它通常不依赖场景中的灯位置，而更依赖方向、angle 和 intensity。",
      "官方示例把 inputs:angle 增大到 1.0，使光线 spread 更宽并让阴影更软，同时把 intensity 从默认 50000 降到 10000；中文说明保留 inputs:angle 等属性名。",
      "后续段落级翻译应重点解释 DistantLight 与 DomeLight 的区别：前者是方向光，后者是环境光/IBL，两者常在同一场景中承担不同照明角色。"
    ],
    terms: [
      ["DistantLight", "远距光"],
      ["directional light", "方向光"],
      ["broad sources of light", "大范围远距光源"],
      ["inputs:angle", "角度输入属性"],
      ["parallel rays", "近似平行光线"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DomeLight.html",
    title: "DomeLight",
    notes: [
      "DomeLight 从非常远的外部环境向内发光，常用于天空、环境贴图或 HDR image 驱动的 Image Based Lighting (IBL)。",
      "默认朝向让 dome 顶极与世界 +Y 轴对齐，并遵循 OpenEXR latitude-longitude map 约定；阅读时应保留 OpenEXR、HDR、IBL 等英文术语，避免和普通贴图方向混淆。",
      "DomeLight 适合给整个场景提供环境照明，不等同于局部点光或面积光；它通常和具体区域灯共同使用，一个负责整体环境，一个负责重点照明。",
      "本页链接到 OpenEXR specification 和 DomeLight_1，后续精修应继续补充 texture、orientation 与渲染器环境采样之间的对应关系。"
    ],
    terms: [
      ["DomeLight", "穹顶环境光"],
      ["High Dynamic Range (HDR)", "高动态范围图像"],
      ["Image Based Lighting (IBL)", "基于图像的照明"],
      ["latitude-longitude maps", "经纬度环境贴图"],
      ["OpenEXR specification", "OpenEXR 规范"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/LightListAPI.html",
    title: "LightListAPI",
    notes: [
      "LightListAPI 用于在 traversal 过程中发现场景中的灯光，重点不是定义某一种灯，而是提供收集和缓存灯光列表的 API schema。",
      "ComputeLightList() 可以遍历并收集后代中的灯光，例如带有 LightAPI schema 的 prim；ComputeModeIgnoreCache 表示这次计算不依赖已有缓存。",
      "官方 Python 示例从 </World> 之下取得全部灯光；阅读时保留 ComputeLightList()、ComputeModeIgnoreCache、LightAPI 和路径写法，中文层只解释调用目的。",
      "对大型场景而言，灯光列表的缓存和失效策略会影响遍历成本；后续段落级翻译应补充 gather、cache、invalidate 与 scene traversal 的关系。"
    ],
    terms: [
      ["LightListAPI", "灯光列表 API schema"],
      ["traversal", "场景遍历"],
      ["ComputeLightList()", "计算灯光列表函数"],
      ["ComputeModeIgnoreCache", "忽略缓存计算模式"],
      ["LightAPI", "灯光通用 API schema"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、属性阅读重点和术语对照；英文页面名、链接、代码、命令和原文摘录继续保留，便于和官方 usdLux schema 文档核对。</p>
      <p class="en">This section adds Chinese-first usage notes, property reading guidance, and terminology for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, and source excerpts for comparison with the official usdLux schema documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
