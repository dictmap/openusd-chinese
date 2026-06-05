import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-070";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html",
    title: "PluginLightFilter",
    notes: [
      "`PluginLightFilter` 是 light filter 的插件扩展入口，用属性标识外部 `SdrShadingNode` definition，并通过 `UsdShadeNodeDefAPI` 暴露给 render delegates。",
      "它继承 `LightFilter` 的过滤器语义，因此仍要阅读 `collection:filterLink:includeRoot` 和 `lightFilter:shaderId`；这些属性决定过滤器影响哪些 geometry Prims 以及如何找到 shader 实现。",
      "`filterLink` collection 控制 include/exclude 目标；fallback 为 true 时，关联灯光照亮的对象默认都会受该 filter 影响，除非集合规则明确排除。",
      "本页适合理解“自定义 light filter 如何进入渲染系统”：OpenUSD 负责声明 schema 与关系，具体过滤效果通常由 Sdr 节点、插件和 render delegate 实现。",
      "中文层只说明插件边界和阅读路径，不把 renderer-specific 参数伪装成核心属性；`PluginLightFilter`、`SdrShadingNode`、`UsdShadeNodeDefAPI`、`filterLink` 等英文名保持原样。"
    ],
    terms: [
      ["PluginLightFilter", "插件灯光过滤器"],
      ["SdrShadingNode", "Sdr 着色节点定义"],
      ["UsdShadeNodeDefAPI", "UsdShade 节点定义 API"],
      ["render delegate", "Hydra 渲染代理"],
      ["filterLink collection", "过滤器链接集合"],
      ["renderer-specific", "渲染器特定的"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/PortalLight.html",
    title: "PortalLight",
    notes: [
      "`PortalLight` 表示位于本地 XY 平面的矩形 portal，用来引导 `DomeLight` 的采样；它本身不是普通照明面，而是帮助环境光在入口、窗口等区域更有效采样。",
      "官方摘录说明它向 `-Z` 方向传递光照；因此阅读时要同时关注 prim 的 transform、局部坐标和 `xformOpOrder`，否则 portal 朝向容易被误读。",
      "`inputs:height` 和 `inputs:width` 分别控制本地 Y/X 方向上的矩形尺寸，默认描述中的 1 unit 只是基础形状，不代表最终放置后的世界空间大小。",
      "`light:shaderId` 表示该 portal light 的 shader 标识；渲染器是否以及如何利用 portal 进行 dome light 采样，还取决于 render delegate 支持。",
      "本页应和 `DomeLight` 的 `portals` relationship 一起看：`DomeLight` 指向 portal，portal 提供采样窗口，两者共同表达环境光采样引导关系。"
    ],
    terms: [
      ["PortalLight", "传送门灯光/采样入口灯"],
      ["DomeLight", "穹顶环境光"],
      ["local XY plane", "本地 XY 平面"],
      ["-Z direction", "本地 -Z 方向"],
      ["inputs:height", "portal 高度输入"],
      ["inputs:width", "portal 宽度输入"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/ShadowAPI.html",
    title: "ShadowAPI",
    notes: [
      "`ShadowAPI` 用于控制 shadow color、distance、falloff 等阴影外观；官方说明明确这些是 non-physical controls，目标是艺术控制而不是物理精确模拟。",
      "`inputs:shadow:color` 设置灯光投射阴影的颜色，适合做美术调色或风格化表现；它不应被理解为真实光传输中的能量守恒参数。",
      "`inputs:shadow:distance`、`inputs:shadow:falloff` 和 `inputs:shadow:falloffGamma` 一起影响阴影随距离变化的衰减效果，常用于限制阴影范围或调整过渡。",
      "`inputs:shadow:enable` 是开关语义入口，便于在不删除灯光和链接关系的情况下控制阴影参与渲染；实际支持程度取决于 renderer。",
      "阅读本页时应把它和 `LightAPI` 的 shadow-linking 区分开：shadow-linking 选择谁参与阴影关系，`ShadowAPI` 调整阴影如何被渲染。"
    ],
    terms: [
      ["ShadowAPI", "阴影控制 API"],
      ["non-physical controls", "非物理艺术控制"],
      ["inputs:shadow:color", "阴影颜色输入"],
      ["inputs:shadow:distance", "阴影距离输入"],
      ["inputs:shadow:falloff", "阴影衰减输入"],
      ["shadow-linking", "阴影链接"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/ShapingAPI.html",
    title: "ShapingAPI",
    notes: [
      "`ShapingAPI` 用来控制灯光发射形状，包括 light spread、light cone、focus 和 IES profile；它适合 spotlight、舞台灯、摄影灯等需要方向和轮廓控制的场景。",
      "`inputs:shaping:cone:angle` 是离主轴的角度限制，单位为 degrees；较小角度会形成更明显的光锥，使灯表现得更像 spot light。",
      "`inputs:shaping:cone:softness` 用于控制光锥边缘过渡，`inputs:shaping:focus` 与 `inputs:shaping:focusTint` 用于调整中心聚焦和色调。",
      "`inputs:shaping:ies:file`、`inputs:shaping:ies:angleScale` 和 `inputs:shaping:ies:normalize` 与 IES 光度数据相关；`ANSI/IES LM-63-19` 链接提供标准背景。",
      "本页是通用 shaping 能力说明，不是某个具体灯光类型；应用时要确认目标 light schema 和 renderer 是否支持这些 shaping 输入。"
    ],
    terms: [
      ["ShapingAPI", "灯光形状控制 API"],
      ["light spread", "光束扩散"],
      ["light cone", "光锥"],
      ["spot light", "聚光灯"],
      ["IES profile", "IES 光度曲线"],
      ["ANSI/IES LM-63-19", "IES 文件标准"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html",
    title: "VolumeLightAPI",
    notes: [
      "`VolumeLightAPI` 用于把 light behavior 应用到 `Volume` prim；它比直接把 `LightAPI` 应用到 Volume 更合适，因为它提供 volume light 常用默认行为。",
      "`light:materialSyncMode` 默认可覆盖为 `materialGlowTintsLight`，让 Volume 的绑定材质参与灯光色调；这和 `MeshLightAPI` 的设计意图相似，但目标 prim 是体积数据。",
      "`light:shaderId` 默认值为 `VolumeLight`，给插件和渲染器挂接额外 volume light 属性留下入口；token 值和属性名必须保留英文原样。",
      "本页回答“发光体积如何表达”的 schema 入口问题；具体体积场、密度、材质和采样行为还需要结合 `UsdVol`、UsdShade material 和 renderer 文档理解。",
      "`VolumeLightAPI` 是 applied API，不是新的体积 prim 类型；它改变的是 Volume prim 的灯光解释和渲染行为，不替代体积数据本身的 schema。"
    ],
    terms: [
      ["VolumeLightAPI", "体积灯光 API schema"],
      ["Volume prim", "体积 prim"],
      ["LightAPI", "通用灯光 API"],
      ["light:materialSyncMode", "灯光与材质同步模式"],
      ["materialGlowTintsLight", "材质 glow 参与灯光着色的 token"],
      ["VolumeLight", "体积灯光 shader 标识"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、属性/关系阅读路径、艺术控制或插件扩展边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, property and relationship reading paths, artistic-control or plugin-extension boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
