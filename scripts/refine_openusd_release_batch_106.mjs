import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-106";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html",
    title: "NonboundableLightBase",
    summary:
      "`NonboundableLightBase` 是 `DistantLight`、`DomeLight` 等非 boundable intrinsic light 的基类。阅读本页时要抓住两个边界：这类灯没有 scene bounds，通常不依赖位置做照明计算；但它仍然通过 `LightAPI` 继承通用灯光能力，并作为具体非包围灯 schema 的共享基础。",
    notes: [
      "`NonboundableLightBase` 与 `BoundableLightBase` 的关键区别在于是否具有可用于场景包围盒的几何范围。非 boundable 灯没有 `extent` 语义，不应被解释为有面积或体积的局部发光体。",
      "官方示例把 `DistantLight`、`DomeLight` 归入此类，是因为它们表达方向性或环境性照明，而不是位于某个有限包围盒内的发光几何。",
      "页面说明中的 `typically do not use positional information` 是建模和渲染解释的要点：移动 prim 的 transform 可能仍影响方向或组织关系，但不应像点光、面光那样用位置衰减来理解。",
      "`NonboundableLightBase` 提供 `LightAPI` 的直接功能入口，因此强度、曝光、颜色、linking 等通用灯光概念仍应沿用 `LightAPI` 语义，而不是在本页重新发明一套属性解释。",
      "继承自 `Imageable` 的 `proxyPrim`、`purpose`、`visibility` 只说明 prim 仍处于 USD 图元体系中；这些 inherited properties 不会让非 boundable 灯获得几何 bounds。",
    ],
    terms: [
      ["NonboundableLightBase", "非包围灯基类"],
      ["intrinsic light", "内建灯光 schema"],
      ["scene bounds", "场景包围范围"],
      ["positional information", "位置信息"],
      ["BoundableLightBase", "可包围灯基类"],
      ["LightAPI", "通用灯光 API schema"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/PluginLight.html",
    title: "PluginLight",
    summary:
      "`PluginLight` 用来把 USD 灯光 prim 和外部 `Sdr shader node` 关联起来，使 render delegate 可以识别插件提供的灯光类型，而不必为每一种灯都新增核心 schema 定义。本页的重点是扩展边界：schema 提供识别入口，具体灯光参数和渲染行为由 Sdr 节点、插件和 renderer 共同解释。",
    notes: [
      "`PluginLight` 不是某个固定物理灯型，而是外部插件灯光的承载 schema。中文说明应保留 `PluginLight`、`Sdr shader node`、`render delegate`，方便读者回到源码和渲染器文档查找。",
      "官方短句 `without the need to provide a schema definition for the light's type` 说明它适合 renderer-specific light 扩展：灯型可以通过 Sdr 注册和插件元数据暴露，而不是进入 OpenUSD 核心 schema 列表。",
      "本页仍继承 `Xformable` 与 `Imageable`，意味着插件灯可以在场景层级中定位、组织和可见性控制；但真正的光照模型来自外部 shader node，不应只按内建 usdLux 灯型推断。",
      "如果页面后续出现插件专用输入属性，应把它们理解为 Sdr/renderer 约定的一部分；不要把所有属性都误读为跨 renderer 的标准 USD 属性。",
      "`PluginLight` 适合解释资产或管线中出现的自定义灯光：先看 prim 是否指向 Sdr 节点，再检查对应 render delegate 是否支持该 shader，而不是只检查是否有某个固定 Light schema。",
    ],
    terms: [
      ["PluginLight", "插件灯光 schema"],
      ["Sdr shader node", "Sdr 着色器节点"],
      ["render delegate", "渲染代理"],
      ["schema definition", "schema 定义"],
      ["Sdr registry", "Sdr 注册表"],
      ["renderer-specific light", "渲染器专用灯型"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html",
    title: "VolumeLightAPI",
    summary:
      "`VolumeLightAPI` 是应用到 `Volume` prim 的 applied API，用来给体积数据赋予灯光行为。它优于直接把 `LightAPI` 应用于 Volume，因为它预设了体积发光常用的内建行为，例如 `light:materialSyncMode = materialGlowTintsLight` 和 `light:shaderId = VolumeLight`。",
    notes: [
      "`VolumeLightAPI` 不创建新的体积 prim 类型，而是在已有 `Volume` prim 上叠加 light behavior。翻译时要保留 applied API 的概念，避免让读者以为这是一个独立几何 light prim。",
      "`light:materialSyncMode` 默认可改写为 `materialGlowTintsLight`，这表示 Volume 绑定的材质会参与灯光着色，是体积材质和灯光发射之间的关键桥接。",
      "`light:shaderId` 默认值 `VolumeLight` 给 renderer 或插件提供识别入口。该 token 应保持英文原样，因为它可能直接对应渲染端的 shader 或实现分支。",
      "相比 `MeshLightAPI`，本页目标对象是 volume data；相同点是二者都把已有场景对象转为发光体，不同点是材质采样、体积密度和 renderer 支持会影响最终结果。",
      "实际排查时要同时看 `UsdVol` 场定义、材质绑定、`VolumeLightAPI` 是否应用，以及目标 renderer 是否支持体积发光；schema 存在本身不等于所有 renderer 都能产生同等视觉效果。",
    ],
    terms: [
      ["VolumeLightAPI", "体积灯光 API schema"],
      ["Volume prim", "体积 prim"],
      ["applied API", "应用型 API schema"],
      ["light:materialSyncMode", "灯光材质同步模式"],
      ["materialGlowTintsLight", "材质 glow 参与灯光着色的 token"],
      ["light:shaderId", "灯光 shader 标识"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/overview.html",
    title: "UsdLux overview",
    summary:
      "`usdLux` overview 是灯光 schema 域的导航页，说明 OpenUSD 如何表达常见 3D 图形照明、阴影、light filters 和相关行为。阅读时应把它当作概念地图：先理解 `LightAPI` 提供的灯光能力，再分辨 boundable、non-boundable、mesh、volume、plugin、shaping、shadow 和 linking 等专门主题。",
    notes: [
      "`UsdLux` 的设计目标是 portable and efficient lighting representation。中文层应强调它服务于跨工具、跨 renderer 的场景描述，而不是某一个渲染器的私有灯光格式。",
      "`Endowing Light Capabilities` 小节解释 `LightAPI` 如何把灯光能力赋给 prim；这条线索适合和 `MeshLightAPI`、`VolumeLightAPI` 等 applied API 页面一起阅读。",
      "`Representing Boundable Lights` 小节中的 `RectLight` 示例展示了 transform、尺寸和 schema 属性如何共同定义局部面积灯。代码块里的 `xformOpOrder`、`xformOp:translate`、`xformOp:rotateXYZ` 必须保留原样。",
      "overview 中列出的 shadows、light filters、linking、portals 等不是独立孤岛；它们共同决定灯光如何作用于对象、如何产生阴影、如何被过滤或限制影响范围。",
      "本页也是本地复刻站点的阅读枢纽：后续内部链接应优先跳到 406 清单内的本地页面，只有明确官方原页入口才应保留外跳。",
    ],
    terms: [
      ["UsdLux", "OpenUSD 灯光 schema 域"],
      ["LightAPI", "通用灯光能力 API"],
      ["boundable lights", "可包围灯"],
      ["non-boundable lights", "非包围灯"],
      ["light filters", "灯光过滤器"],
      ["xformOpOrder", "变换操作顺序属性"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/ShapingAPI.html",
    title: "ShapingAPI",
    summary:
      "`ShapingAPI` 控制灯光发射的形状和分布，包括 cone angle、cone softness、focus、focus tint 以及 IES profile。它常用于聚光灯、舞台灯、摄影灯等需要控制光束形态的场景；这些属性是灯光外观控制，不应和灯光强度、shadow linking 或过滤器混为一谈。",
    notes: [
      "`inputs:shaping:cone:angle` 以 degrees 表示相对主轴的角度限制。较小角度会形成更窄的光 cone，可用于 spot light 风格的照明。",
      "`inputs:shaping:cone:softness` 控制光 cone 边缘过渡，和 angle 一起决定光束硬边或软边；翻译时应把 softness 解释为边缘柔化，而不是简单的亮度降低。",
      "`inputs:shaping:focus` 与 `inputs:shaping:focusTint` 影响光束集中程度和焦点着色，可用于艺术控制。它们不替代材质颜色或灯光基础 color，而是在 shaping 层参与外观调节。",
      "`inputs:shaping:ies:file`、`inputs:shaping:ies:angleScale`、`inputs:shaping:ies:normalize` 涉及 IES profile；`ANSI/IES LM-63-19`、文件路径和 token 字面量都应保持英文原样。",
      "`ShapingAPI` 是否产生预期视觉效果依赖目标 renderer 支持。中文导读应说明 schema 意图和属性边界，同时避免承诺所有渲染器都会完全一致地实现 IES 或 focus 行为。",
    ],
    terms: [
      ["ShapingAPI", "灯光塑形 API schema"],
      ["inputs:shaping:cone:angle", "光锥角度输入属性"],
      ["inputs:shaping:cone:softness", "光锥边缘柔化输入属性"],
      ["inputs:shaping:focus", "聚焦输入属性"],
      ["IES profile", "IES 配光曲线"],
      ["ANSI/IES LM-63-19", "IES 文件格式标准"],
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
  results,
}, null, 2));
