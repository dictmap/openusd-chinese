import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-107";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdLux/ListAPI.html",
    title: "ListAPI",
    summary:
      "`ListAPI` 是旧版灯光列表 API schema，官方明确说明它提供与 `LightListAPI` 相同的功能，但已经 deprecated。阅读本页的重点不是把它当作新项目入口，而是识别旧资产中的 `lightList` 数据、理解缓存行为，并把迁移目标指向 `LightListAPI`。",
    notes: [
      "`ListAPI` 的存在主要服务于兼容旧 USD 文件和旧工具链。新资产、新 schema 文档和新代码注释应优先引用 `LightListAPI`，不要把本页作为推荐入口传播。",
      "`lightList:cacheBehavior` 是旧 schema 中最需要保留原名的属性之一；它描述 light list 结果是否以及如何被缓存，影响 traversal 期间发现灯光的性能和新鲜度。",
      "如果工具读取到 `ListAPI`，应先确认目标 prim 是否只是历史 authoring 结果，再决定保留、迁移或由导出器重写。中文导读不应暗示所有旧属性都可以无条件删除。",
      "本页应和 `LightListAPI` 一起阅读：`ListAPI` 解释 deprecated compatibility surface，`LightListAPI` 解释当前推荐的 traversal、`ComputeLightList()` 和 cache mode 行为。",
      "链接和属性名仍要保持英文原样，尤其是 `ListAPI`、`LightListAPI`、`lightList`、`lightList:cacheBehavior`，因为这些字面量直接用于搜索历史资产、脚本和 schema 文档。",
    ],
    terms: [
      ["ListAPI", "旧版灯光列表 API schema"],
      ["LightListAPI", "推荐使用的灯光列表 API schema"],
      ["deprecated", "已弃用"],
      ["lightList", "旧版灯光列表命名空间"],
      ["lightList:cacheBehavior", "灯光列表缓存行为属性"],
      ["compatibility surface", "兼容层接口"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html",
    title: "PluginLightFilter",
    summary:
      "`PluginLightFilter` 是 light filter 的插件扩展入口，用来通过外部 `SdrShadingNode` definition 和 `UsdShadeNodeDefAPI` 暴露 renderer-specific filter。它的核心价值在于连接 usdLux 的过滤器框架和渲染器插件，而不是把所有过滤器参数固化为 OpenUSD 核心 schema。",
    notes: [
      "`PluginLightFilter` 与 `LightFilter` 的关系类似 `PluginLight` 与具体内建灯型的关系：schema 提供可发现、可连接的入口，具体过滤算法和参数由 Sdr 节点及 render delegate 解释。",
      "`UsdShadeNodeDefAPI` 表示该 prim 可以携带或引用 node definition 信息。阅读时应把它看作 shader/filter 描述桥梁，而不是普通的用户可见 UI metadata。",
      "如果某个 renderer 提供自定义 barn door、gobo、projection 或衰减过滤器，`PluginLightFilter` 可作为承载入口；但具体属性是否可移植取决于对应 Sdr 节点和 renderer 支持。",
      "`filterLink` 或相关 linking 机制决定过滤器作用于哪些灯光或集合，插件 filter 的存在不自动意味着它会影响所有 lights；连接关系仍需逐项检查。",
      "中文层只解释插件边界、Sdr 发现路径和 renderer 依赖，不应把 renderer-specific 参数翻译成看似通用的标准属性。",
    ],
    terms: [
      ["PluginLightFilter", "插件灯光过滤器 schema"],
      ["LightFilter", "灯光过滤器基类"],
      ["SdrShadingNode", "Sdr 着色节点"],
      ["UsdShadeNodeDefAPI", "UsdShade 节点定义 API"],
      ["render delegate", "渲染代理"],
      ["filterLink", "过滤器链接关系"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html",
    title: "BoundableLightBase",
    summary:
      "`BoundableLightBase` 是 `RectLight`、`SphereLight` 等 boundable intrinsic lights 的基类。它的关键语义是这些灯有可用于场景范围、可视化、选择和某些渲染决策的空间边界，同时仍通过 `LightAPI` 继承通用灯光功能。",
    notes: [
      "`boundable` 不只是“可以看见”的意思，而是指灯光 prim 具备可用于 bounds 计算的空间范围。`RectLight`、`SphereLight`、`DiskLight`、`CylinderLight` 都应从这个角度理解。",
      "与 `NonboundableLightBase` 对比时，本页强调有限几何形状和局部空间范围；环境光、方向光这类没有有限 bounds 的灯不应套用这里的阅读方式。",
      "`BoundableLightBase` 提供的是基类语义，具体尺寸仍由派生灯型属性决定，例如 `RectLight` 的 width/height、`SphereLight` 的 radius、`DiskLight` 的 radius 或 `CylinderLight` 的 length/radius。",
      "继承 `LightAPI` 意味着 intensity、exposure、color、light-linking、shadow-linking 等通用概念仍从 `LightAPI` 阅读；本页只说明这些能力如何落在有边界的 intrinsic lights 上。",
      "排查视口选择、包围盒显示或灯光 gizmo 时，应先确认具体灯是否派生自 `BoundableLightBase`，再检查尺寸属性和 prim transform，而不是只看是否应用了 `LightAPI`。",
    ],
    terms: [
      ["BoundableLightBase", "可包围灯基类"],
      ["boundable intrinsic lights", "有边界内建灯光"],
      ["scene bounds", "场景包围范围"],
      ["extent", "几何范围属性"],
      ["RectLight", "矩形灯"],
      ["SphereLight", "球形灯"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/RectLight.html",
    title: "RectLight",
    summary:
      "`RectLight` 是从矩形一侧发光的 boundable intrinsic light。前几轮已补充 XY plane、`-Z` 方向、soft box 和 texture 示例；本轮进一步强调 authoring 时 width/height、transform、texture、shaping 与照明意图之间的组合关系。",
    notes: [
      "`inputs:width` 与 `inputs:height` 定义局部矩形尺寸，`xformOp:translate` 和 `xformOp:rotateXYZ` 决定它在世界中的位置与朝向。尺寸和 transform 应分开调试，不要把朝向问题误改成宽高问题。",
      "示例中的 `inputs:texture:file = @checkerboard.png@` 表示矩形灯可以使用 color map；贴图影响发光颜色分布，但并不改变矩形的几何边界或默认发光方向。",
      "`inputs:intensity`、`inputs:color`、texture 和 shaping 参数会共同影响外观。中文说明应保留这些属性字面量，方便读者将文档示例映射到 USD 编辑器或 DCC 面板。",
      "官方示例把 `RectLight` 放在 Sphere 和 Cube 附近，是为了展示局部面积光与被照物之间的空间关系；读者应同时看灯的 transform、被照物 transform 和 `upAxis`。",
      "`RectLight` 适合 soft boxes、linear lights、fluorescent lights、light panels，但如果资产需要圆盘、球形或圆柱发光体，应转向 `DiskLight`、`SphereLight` 或 `CylinderLight`，不要用矩形灯硬拟合所有形状。",
    ],
    terms: [
      ["RectLight", "矩形灯"],
      ["inputs:width", "矩形灯宽度输入属性"],
      ["inputs:height", "矩形灯高度输入属性"],
      ["inputs:texture:file", "灯光颜色贴图文件输入属性"],
      ["xformOp:rotateXYZ", "XYZ 欧拉旋转变换操作"],
      ["soft box", "摄影柔光箱"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/SphereLight.html",
    title: "SphereLight",
    summary:
      "`SphereLight` 用球体表面表达点状或球状光源。前几轮已覆盖 one-sided、`treatAsPoint` 和 zero-area lights；本轮进一步强调 `inputs:radius`、transform、示例数值和 renderer 支持如何共同决定最终照明和阴影软硬。",
    notes: [
      "`inputs:radius` 是 `SphereLight` 最核心的形状参数。半径越大，面积光特征越明显，阴影通常更柔；半径趋近于零时才接近 point light 阅读方式。",
      "`treatAsPoint` 需要 renderer 支持 zero-area lights 才有意义。中文导读应把它写成渲染器相关的行为开关，而不是保证所有实现都产生同样结果的标准视觉承诺。",
      "官方示例中 `inputs:radius = 0.8`、`inputs:intensity = 20.0`、`xformOp:translate = (4, 0, 1)` 共同说明示例灯的位置、大小和亮度；这些数值应保留以便复现实验。",
      "因为 `SphereLight` 是 one-sided，球体内部不发光；如果模型把灯放进封闭罩或几何内部，需要检查 renderer 如何处理内外表面、可见性和阴影。",
      "`SphereLight` 常用于 light bulbs、headlamps 等近似球形或点状光源；如果光源是面板、圆盘或管状，则应分别考虑 `RectLight`、`DiskLight` 或 `CylinderLight`。",
    ],
    terms: [
      ["SphereLight", "球形灯"],
      ["inputs:radius", "球形灯半径输入属性"],
      ["treatAsPoint", "按点光处理的开关"],
      ["zero-area lights", "零面积灯"],
      ["point light", "点光源"],
      ["one-sided light", "单面发光灯"],
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
