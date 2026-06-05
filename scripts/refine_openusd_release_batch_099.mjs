import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-099";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdUI/PropertyHints.html",
    title: "PropertyHints",
    summary:
      "`PropertyHints` 是 `usdUI` 中面向 property 的 UI 提示 schema。它补充的是 property-level hints，例如 `displayGroup` 和 `shownIf`，帮助工具决定属性在界面中的分组与条件显示；它不改变属性值、composition、schema fallback 或渲染语义。",
    notes: [
      "本页应和 `ObjectHints`、`PrimHints` 一起读：`ObjectHints` 处理通用对象级 `displayName` 和 `hidden`，`PrimHints` 处理 prim 内部 display group 的展开与条件可见性，`PropertyHints` 则落在每个 property 自身的分组与显示条件上。",
      "官方示例中的 `displayGroup = \"Display Group 1\"` 和 `shownIf = \"showProperties == 1\"` 都是 UI 规则，不应翻译或改写表达式；工具会据此判断 `exampleAttribute`、`exampleRelationship` 是否显示在对应分组中。",
      "`shownIf` 表达式依赖同一 prim 或上下文中的其他属性值时，读者应把它理解为界面可见性条件，而不是 USD composition arc、`visibility` 属性或渲染过滤规则。",
      "空字符串 `displayGroup = \"\"` 表示没有放入命名 display group，和隐藏属性不同；是否隐藏仍由 `hidden` 或 `shownIf` 等 UI hint 决定。",
      "排查 DCC UI 中属性排列或可见性问题时，建议先看 property 的 `uiHints` dictionary，再回看 prim 级和 object 级 hints，避免把界面展示问题误判为 schema 数据错误。"
    ],
    terms: [
      ["PropertyHints", "属性级 UI 提示"],
      ["property-level hints", "属性级提示"],
      ["displayGroup", "显示分组"],
      ["shownIf", "条件显示表达式"],
      ["exampleAttribute", "示例属性"],
      ["uiHints", "UI 提示字典"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html",
    title: "ParticleFieldRadianceBaseAPI",
    summary:
      "`ParticleFieldRadianceBaseAPI` 定义 `ParticleField` radiance definition data 的基础 applied schema。它的重点是为粒子场辐射度数据建立可验证的 schema 契约，让声明 radiance 的特征 schema 不会缺失必要的应用 schema 层。",
    notes: [
      "本页的核心句是 base applied schema：它不是单独的几何类型，也不是粒子位置、半径或 opacity 描述，而是给 `ParticleField` 的 radiance 定义提供共享基础。",
      "官方说明中的 `ParticleField characteristics schemas` 通常会内建该 applied schema，这意味着具体特征 schema 可以继承同一套 radiance 语义入口，便于验证器和渲染管线识别。",
      "`validation` 是阅读关键：如果某个 applied schema 声称提供 radiance definitions，验证逻辑应能确认相应 schema 层确实存在于 `ParticleField` 上。",
      "radiance 相关数据常与颜色、能量、球谐或体积粒子渲染解释有关，但本页本身只建立基础 schema 关系，不应把它等同于某个具体 renderer 的采样实现。",
      "继续翻译这类页面时应保留 `ParticleField`、`radiance definition data`、`applied schema`、`validation` 等英文术语，因为它们同时是 schema 文档、验证输出和工具搜索关键字。"
    ],
    terms: [
      ["ParticleFieldRadianceBaseAPI", "粒子场辐射度基础 API"],
      ["radiance definition data", "辐射度定义数据"],
      ["applied schema", "应用 schema"],
      ["ParticleField characteristics schemas", "粒子场特征 schema"],
      ["validation", "验证"],
      ["ParticleField", "粒子场"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/Field3DAsset.html",
    title: "Field3DAsset",
    summary:
      "`Field3DAsset` 是 `usdVol` 中用于引用外部 Field3D volume field 的 `Field` schema。它把 `.f3d` 文件、字段名、数据类型和用途接入 USD 场景，但不会把外部体素数据直接嵌入当前 USDA 文本。",
    notes: [
      "官方示例 `densityField3D` 表示一个从 `.f3d` 文件中读取单个 `density` field 的 Field3D 体积场；`Field3DAsset` 是 USD 场景和外部 Field3D 数据之间的引用层。",
      "`fieldDataType = \"float\"` 描述字段数据类型，`fieldName = \"density\"` 选择外部文件中的命名字段，`fieldPurpose = \"cluster_0\"` 描述该 field 的用途或分组语义。",
      "`filePath` 是 asset 路径，并且示例把它放在 `timeSamples` 中，说明不同时间样本可以指向不同 `.f3d` 文件；这对缓存序列和动画体积数据很重要。",
      "页面中的 Field3D GitHub 链接是外部项目来源，不属于 OpenUSD 内部 406 页清单；它应保留为普通外部链接，用于了解 Field3D 文件格式和库背景。",
      "排查 `Field3DAsset` 时应先确认路径解析、字段名、数据类型和时间样本是否对应外部文件，再检查 USD schema 本身，避免把外部资源缺失误判为页面或 schema 错误。"
    ],
    terms: [
      ["Field3DAsset", "Field3D 体积场资产"],
      ["Field3D volume field", "Field3D 体积场"],
      [".f3d file", ".f3d 文件"],
      ["fieldDataType", "字段数据类型"],
      ["fieldName", "字段名"],
      ["timeSamples", "时间样本"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/usdLux_toc.html",
    title: "Lights (usdLux)",
    summary:
      "`usdLux_toc.html` 是 `usdLux` 灯光 schema 的目录入口。它帮助读者从 Overview 和 Concepts 进入 `LightAPI`、boundable/non-boundable lights、light shaping、shadow、filter、plugin light 与 Light Units，而不是描述某个单独灯光类的完整属性。",
    notes: [
      "建议阅读顺序是先看 `Overview` 与 `UsdLux Schemas and Concepts`，理解 `LightAPI` 如何赋予 prim 灯光能力，再进入 `BoundableLightBase` 与 `NonboundableLightBase` 的分类。",
      "`CylinderLight`、`DiskLight`、`DomeLight`、`RectLight`、`SphereLight` 等具体 schema 表达不同光源形状或投射方式，名称应保持英文原样，因为它们也是页面名和 API 标识。",
      "`ShapingAPI`、`ShadowAPI`、`LightFilter`、`PluginLight`、`PluginLightFilter` 展示 usdLux 对光形控制、阴影控制、过滤器和渲染器扩展点的覆盖范围。",
      "`Light Units` 入口用于理解灯光强度单位和物理解释；这类概念会影响 renderer 和 DCC 工具中的参数展示，但目录页本身不绑定具体 render delegate。",
      "目录页的主要价值是导航与术语定位；精读具体属性时应跳转到 schema 页面，再对照本目录确认当前 schema 在 usdLux 层级中的位置。"
    ],
    terms: [
      ["usdLux", "USD 灯光 schema 领域"],
      ["LightAPI", "灯光能力 API"],
      ["BoundableLightBase", "有边界灯光基类"],
      ["NonboundableLightBase", "无边界灯光基类"],
      ["LightFilter", "灯光过滤器"],
      ["Light Units", "灯光单位"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderPass.html",
    title: "RenderPass",
    summary:
      "`RenderPass` 表示 multi-pass rendering workflow 中一次独立 render pass 的 renderer configuration 与 scene configuration。它用于组织前景、背景、合成等 pass 级配置，不等同于 `RenderProduct` 输出产品或 `RenderVar` AOV 变量。",
    notes: [
      "官方示例中的 foreground、background、composite 三个 pass 说明 `RenderPass` 可以把同一场景拆成多个渲染阶段，再由后续 pass 组合输出结果。",
      "`renderSource` 可以指向 `RenderSettings` prim，也可以指向外部渲染配置文件；Houdini Rop 和 Nuke write node 示例说明它可对接 DCC 或合成工具中的 pass 配置。",
      "`collection:renderVisibility:*` 相关属性把 scene configuration 交给 USD collection，决定哪些 prim 对当前 render pass 可见；这和输出文件路径、AOV 声明是不同层级。",
      "`passType = \"prman\"` 和 `command = [ \"prman\" ]` 属于示例中的 renderer/command 配置，应保持英文和代码字面量原样，避免破坏可复制的 USDA 片段。",
      "阅读 usdRender 时可把职责分开：`RenderSettings` 聚合渲染设置，`RenderProduct` 描述输出产品，`RenderVar` 描述输出变量，`RenderPass` 描述一次 pass 的渲染器与场景选择。"
    ],
    terms: [
      ["RenderPass", "渲染 pass"],
      ["multi-pass rendering workflow", "多 pass 渲染工作流"],
      ["renderSource", "渲染来源关系"],
      ["RenderSettings", "渲染设置"],
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染输出变量"]
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
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
