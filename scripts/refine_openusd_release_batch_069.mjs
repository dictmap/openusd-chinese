import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-069";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/ListAPI.html",
    title: "ListAPI",
    notes: [
      "`ListAPI` 是旧版 light list API schema，官方摘录明确说明它提供与 `LightListAPI` 相同的功能，但已经 deprecated；新资产和新工具应优先阅读并使用 `LightListAPI`。",
      "`lightList` 用来显式列出参与灯光列表的目标，常见场景是让渲染端或缓存系统快速获得 stage 中需要考虑的 lights；它不是替代 light-linking 的几何选择规则。",
      "`lightList:cacheBehavior` 描述 light list 缓存行为，阅读时应和 `LightListAPI` 的说明一起核对，因为本页主要保留兼容旧 schema 的属性入口和迁移提示。",
      "如果遇到旧 USD 文件仍 author 了 `ListAPI`，可把本页当作兼容层索引：先确认属性名是否还存在，再决定是否迁移到 `LightListAPI` 或由工具自动升级。",
      "本地双语页保留 `ListAPI`、`LightListAPI`、`lightList`、`lightList:cacheBehavior` 等英文名，中文只解释用途、迁移边界和阅读顺序，避免把 deprecated schema 误写成推荐入口。"
    ],
    terms: [
      ["ListAPI", "旧版灯光列表 API schema"],
      ["LightListAPI", "推荐使用的灯光列表 API"],
      ["deprecated", "已弃用"],
      ["lightList", "灯光列表关系或属性入口"],
      ["lightList:cacheBehavior", "灯光列表缓存行为"],
      ["compatibility layer", "兼容旧资产的阅读层"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html",
    title: "MeshLightAPI",
    notes: [
      "`MeshLightAPI` 用于把 light behavior 应用到 `Mesh` prim；官方说明也强调它比直接把 `LightAPI` 应用到 Mesh 更合适，因为它内置了 mesh light 常用默认行为。",
      "`light:materialSyncMode` 的默认值会偏向 `materialGlowTintsLight`，用于让 Mesh 的绑定材质参与发光色调；阅读时应把它和 UsdShade material binding 一起理解。",
      "`light:shaderId` 默认指向 `MeshLight`，这给渲染插件留下挂接额外 mesh light 属性的入口；属性名和 token 值必须保留英文原样，不能翻译成中文标识符。",
      "本页适合回答“一个发光 Mesh 应该怎么表达”的 schema 入口问题；完整建模示例仍应继续阅读 `Mesh Lights`，尤其是几何、材质、灯光强度和 renderer 支持之间的关系。",
      "`MeshLightAPI` 是 applied API，不是一个独立几何类型；它改变的是 Mesh prim 的灯光语义和渲染解释，而不是把 Mesh 替换成新的 prim 类型。"
    ],
    terms: [
      ["MeshLightAPI", "Mesh 灯光 API schema"],
      ["Mesh prim", "网格 prim"],
      ["LightAPI", "通用灯光 API"],
      ["light:materialSyncMode", "灯光与材质同步模式"],
      ["materialGlowTintsLight", "材质 glow 参与灯光着色的 token"],
      ["light:shaderId", "灯光 shader 标识"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html",
    title: "NonboundableLightBase",
    notes: [
      "`NonboundableLightBase` 是没有 scene bounds 的 intrinsic lights 基类，例如 `DistantLight`、`DomeLight` 等；这类灯通常不依赖局部位置来计算光照。",
      "它和上一轮的 `BoundableLightBase` 形成对照：boundable lights 需要关心 `extent` 和可包围范围，而 non-boundable lights 更强调方向、环境或全局照明语义。",
      "本页直接提供 concrete derived lights 所需的 `LightAPI` 能力，同时仍继承 `Xformable` 和 `Imageable` 的常见属性；阅读时要分清灯光语义和可见性/变换属性分别来自哪里。",
      "`proxyPrim`、`purpose`、`visibility` 等 inherited Imageable 属性影响场景组织、代理显示和可见性，但不等同于给 non-boundable light 添加几何边界。",
      "`Representing Non-boundable Lights` 是本页的主要延伸链接；如果要查示例，应沿该链接理解 `DistantLight`、`DomeLight` 等具体灯光，而不是只停留在基类属性表。"
    ],
    terms: [
      ["NonboundableLightBase", "非可包围灯光基类"],
      ["scene bounds", "场景包围范围"],
      ["DistantLight", "远距离方向光"],
      ["DomeLight", "穹顶环境光"],
      ["Xformable", "可变换 schema"],
      ["Imageable", "可成像 schema"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/overview.html",
    title: "Overview",
    notes: [
      "`Overview` 是 usdLux schema 域的概念入口，用来把 lights、shadows、light filters、light-linking 和 schema 组织方式串起来；它不是单一类页。",
      "`Endowing Light Capabilities` 说明 `LightAPI` 如何给 prim 赋予灯光能力；理解这一点后，再看 `BoundableLightBase`、`NonboundableLightBase`、`MeshLightAPI` 等具体 schema 会更清楚。",
      "`Representing Boundable Lights` 中的 `RectLight` 示例展示了 light prim、xformOps 和 `xformOpOrder` 的基本 authoring 方式；代码片段中的属性名、token 和数值结构应保持英文/代码原样。",
      "阅读 overview 时建议按路径推进：先看灯光能力和基础属性，再看 boundable/non-boundable 分类，随后看 mesh lights、filters、linking 和插件扩展点。",
      "本页中的链接是 usdLux 章节的本地导航枢纽；406 清单内链接应继续指向本地页面，只有“Open official page/官方原页”保留外跳。"
    ],
    terms: [
      ["UsdLux", "USD 灯光 schema 域"],
      ["LightAPI", "赋予灯光能力的 API schema"],
      ["light filters", "灯光过滤器"],
      ["light-linking", "灯光链接"],
      ["xformOpOrder", "变换操作顺序"],
      ["schema domain", "schema 领域"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/PluginLight.html",
    title: "PluginLight",
    notes: [
      "`PluginLight` 用于通过属性标识外部 `Sdr shader node`，让 render delegate 能识别某种插件灯光，而不必为该灯光类型提供完整 schema definition。",
      "本页适合理解 usdLux 的扩展边界：内置 schema 覆盖常见 lights，而 `PluginLight` 给 renderer 或插件生态保留自定义 light 的发现和解释入口。",
      "如果渲染器需要额外的 light 参数，通常会通过 Sdr 节点、插件元数据或 renderer-specific 约定解释；本地双语说明不应把这些外部参数伪装成 OpenUSD 核心 schema 属性。",
      "`Xformable` 和 `Imageable` 继承属性仍可用于放置、组织和显示该 prim，但真正的灯光模型来自外部 shader node 和 render delegate 的实现。",
      "阅读本页时要保留 `PluginLight`、`Sdr shader node`、`render delegate`、`schema definition` 等英文术语，以免破坏与 Doxygen、Sdr registry 和渲染插件文档之间的对照。"
    ],
    terms: [
      ["PluginLight", "插件灯光"],
      ["Sdr shader node", "Sdr 着色节点"],
      ["render delegate", "Hydra 渲染代理"],
      ["schema definition", "schema 定义"],
      ["renderer-specific", "渲染器特定的"],
      ["Sdr registry", "Sdr 注册表"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、属性/关系阅读路径、迁移或扩展边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, property and relationship reading paths, migration or extension boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
