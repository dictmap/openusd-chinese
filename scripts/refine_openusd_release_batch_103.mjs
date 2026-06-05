import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-103";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettings.html",
    title: "RenderSettings",
    summary:
      "`RenderSettings` 封装一次 scene render invocation 的全局设置：渲染器使用哪些 settings、输出哪些 `RenderProduct`，以及哪些 `includedPurposes` 应参与渲染。它是 `RenderSettingsBase`、`RenderProduct` 和 `RenderVar` 之间的聚合入口。",
    notes: [
      "官方摘要强调 `single invocation of rendering the scene`。这表示一个 `RenderSettings` prim 通常描述一次渲染调用的配置集合，而不是某个材质、光源或单个输出通道。",
      "`products` relationship 指向一个或多个 `RenderProduct`，后者再组合具体 `RenderVar`。维护中文层时应把 `RenderSettings -> RenderProduct -> RenderVar` 的链条讲清楚，避免把全局设置、输出产品和变量通道混为一谈。",
      "`includedPurposes` 用来限制哪些 imageable purposes 被渲染，例如示例里的 `render` 和 `default`。这些 token 字面量必须保留原样，因为它们直接对应 USD purpose 语义。",
      "`RenderSettings` 继承 `RenderSettingsBase` 的 camera、resolution、pixelAspectRatio、aspectRatioConformPolicy、dataWindowNDC、disableMotionBlur 等属性；本页只列出 RenderSettings 自身属性时，也要提醒读者回看基类属性。",
      "官方说明提到 renderers may apply or auto-apply API schemas 来编码 renderer-specific global configuration，例如 RenderMan options。中文不应把这些扩展写死为某个渲染器的唯一行为。"
    ],
    terms: [
      ["RenderSettings", "渲染设置"],
      ["RenderSettingsBase", "渲染设置基类"],
      ["RenderProduct", "渲染输出产品"],
      ["includedPurposes", "纳入渲染的 purpose 列表"],
      ["renderer-specific global configuration", "渲染器特定全局配置"],
      ["single invocation", "单次调用"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderVar.html",
    title: "RenderVar",
    summary:
      "`RenderVar` 定义渲染器应计算并交给输出产品的一个变量或 channel，常见为 AOV。它关注变量的语义和来源，例如 `sourceName`、`sourceType`、`dataType`，而不直接决定最终文件名或产品组织。",
    notes: [
      "`RenderVar` prim 名称通常用于驱动输出变量名，例如 `alpha`、`depth` 或 renderer-specific AOV 名称；但 USD 没有强制统一所有 RenderVar 名称，所以读者必须结合 renderer 文档和 source 属性确认含义。",
      "`sourceName` 是变量来源的名称，可能是 shader output、built-in renderer output 或 LPE 字符串；`sourceType` 说明来源类别，例如 `lpe`；`dataType` 用来说明输出数据类型。",
      "Light path expression 例如 `C<RD>[<L.>O]` 这类字符串不能翻译或重新排版。任何空格、大小写、尖括号或 token 变化都可能让 renderer 解析成不同表达式。",
      "`RenderVar` 与 `RenderProduct` 的关系是“变量到产品”的组织关系：一个 product 可以收集多个 vars，而一个 var 的语义也可能被不同产品复用，具体取决于 scene description。",
      "后续逐段翻译时，应保留 AOV、channel、sourceName、sourceType、dataType、LPE、shader output 等英文术语，同时用中文说明它们在渲染管线中的角色。"
    ],
    terms: [
      ["RenderVar", "渲染变量"],
      ["AOV", "任意输出变量"],
      ["sourceName", "来源名称"],
      ["sourceType", "来源类型"],
      ["dataType", "数据类型"],
      ["light path expression", "光线路径表达式"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html",
    title: "RenderSettingsBase",
    summary:
      "`RenderSettingsBase` 是抽象基类，定义可放在 `RenderSettings` 或 `RenderProduct` 上的通用渲染控制属性。它把 camera、resolution、aspect ratio、data window、motion blur 和 depth of field 这类跨产品设置集中起来。",
    notes: [
      "`RenderSettingsBase` 的核心价值是复用：同一组基础渲染控制既可由全局 `RenderSettings` 提供，也可在具体 `RenderProduct` 层覆盖或指定，读者需要根据实际 authored opinion 判断最终来源。",
      "`aspectRatioConformPolicy` 处理 camera aperture 与 image aspect ratio 不一致时的适配策略；它必须和 `camera`、`resolution`、`pixelAspectRatio` 一起读，不能只看单个 token 值。",
      "`dataWindowNDC` 是 NDC 空间中的数据窗口，用于表达渲染输出的裁剪或有效数据范围。中文说明应保留 NDC 字面量，并避免把它误读成世界空间包围盒。",
      "`disableDepthOfField` 和 `disableMotionBlur` 是渲染采样控制开关，不会改变 USD 几何或动画本身；它们影响渲染器是否计算景深或运动模糊。",
      "示例 `NoBlurRenderSettings` 通过 `disableMotionBlur = 1` 表达关闭 motion blur。维护页面时应保留示例属性名、布尔值写法和 prim 路径，方便读者复制到 usda 场景中验证。"
    ],
    terms: [
      ["RenderSettingsBase", "渲染设置基类"],
      ["aspectRatioConformPolicy", "宽高比适配策略"],
      ["pixelAspectRatio", "像素宽高比"],
      ["dataWindowNDC", "NDC 数据窗口"],
      ["disableDepthOfField", "禁用景深"],
      ["disableMotionBlur", "禁用运动模糊"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DiskLight.html",
    title: "DiskLight",
    summary:
      "`DiskLight` 是位于 XY plane、沿 `-Z axis` 单侧发光的 circular disk intrinsic light。它适合表达摄影 soft box、圆形灯板、荧光灯或其他较柔和的面光源，示例中使用 `radius = 0.8` 和 `intensity = 20.0`。",
    notes: [
      "官方说明中的 `centered in the XY plane` 与 `along the -Z axis` 决定了默认局部方向。若灯光朝向不对，通常应检查 prim transform，而不是改写 schema 语义。",
      "`radius` 控制圆盘大小，`inputs:intensity` 控制光强。更大的圆盘通常更接近柔和面积光，但最终阴影质量仍取决于 renderer sampling、单位约定和光照模型。",
      "官方用途列表提到 soft boxes、linear lights、fluorescent lights 和 light panels。虽然 `DiskLight` 是圆盘，文档仍把它放在面光源模拟语境中，应保留这些英文应用词。",
      "示例中的 `def DiskLight \"Light1\"`、`inputs:radius`、`inputs:color`、`inputs:intensity`、`xformOp:translate` 都是可复制的 usda 语法，中文层只能解释，不能替换这些字面量。",
      "`DiskLight`、`RectLight`、`SphereLight` 和 `CylinderLight` 都是常用 `usdLux` intrinsic lights；本页重点是圆盘几何、单侧发光方向和半径属性。"
    ],
    terms: [
      ["DiskLight", "圆盘光源"],
      ["circular disk", "圆形发光盘"],
      ["XY plane", "XY 平面"],
      ["-Z axis", "-Z 轴"],
      ["inputs:radius", "半径输入属性"],
      ["inputs:intensity", "光强输入属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/DistantLight.html",
    title: "DistantLight",
    summary:
      "`DistantLight` 表达来自远处、近似平行的 directional light，默认沿 `-Z axis` 照射。它常用于 sunlight 这类 broad source；`inputs:angle` 控制光线 spread 和阴影柔和度，`inputs:intensity` 控制强度。",
    notes: [
      "与 point 或 area lights 不同，`DistantLight` 主要由方向、angle 和 intensity 决定效果；它模拟非常远的光源，因此位置通常没有局部近场光源那样直观的衰减含义。",
      "官方示例把 `inputs:angle` 设为 `1.0`，使光照 spread 更宽并软化阴影，同时把 `inputs:intensity` 从默认 `50000` 降到 `10000`。这些数值是理解示例效果的关键。",
      "`directional light`、`sunlight`、`parallel rays` 和 `broad sources of light` 都应保留英文对照，因为灯光艺术、渲染器 UI 和 DCC 文档中常直接使用这些词。",
      "`DistantLight` 不等同于 `DomeLight`：前者提供方向性远光，后者更常表达环境光或 IBL。两者可以在同一场景中配合，但阅读本页时不要混淆。",
      "后续补全逐段翻译时，应保留 `inputs:angle`、`inputs:intensity`、`-Z axis`、`DistantLight` 等字面量，并把 shadow softness 与 angle 的关系说明清楚。"
    ],
    terms: [
      ["DistantLight", "远距光源"],
      ["directional light", "方向光"],
      ["sunlight", "太阳光"],
      ["parallel rays", "近似平行光线"],
      ["inputs:angle", "角度输入属性"],
      ["shadow softness", "阴影柔和度"]
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
