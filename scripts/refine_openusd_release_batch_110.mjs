import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-110";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettings.html",
    title: "RenderSettings",
    summary:
      "`RenderSettings` 是一次 render invocation 的聚合入口：它把 `RenderSettingsBase` 的相机和成像控制、`products` 关系指向的 `RenderProduct`、以及 `includedPurposes` 等场景过滤条件组织在一起。阅读本页时应先区分全局设置、输出产品和变量通道，再回看具体属性。",
    notes: [
      "`RenderSettings` 不直接表示图像文件或 AOV，它描述渲染调用使用的配置集合；最终文件或 buffer 由 `RenderProduct` 描述，具体通道由 `RenderVar` 描述。",
      "`products` relationship 是本页的关键关系：它把一个设置 prim 连接到一个或多个输出产品。中文说明应保留 `RenderSettings -> RenderProduct -> RenderVar` 的链条，避免把三个 schema 的职责合并。",
      "`includedPurposes` 控制哪些 imageable purpose 被纳入渲染，例如 `render`、`default` 这样的 token 字面量。它属于场景可见性和用途过滤语义，不是材质或灯光开关。",
      "`RenderSettings` 继承 `camera`、`resolution`、`pixelAspectRatio`、`dataWindowNDC`、`disableMotionBlur` 等基类属性；本页读到产品关系时，也要回到 `RenderSettingsBase` 理解成像窗口和采样控制。",
      "官方提到 renderer-specific global configuration 可以通过 renderer 自动或显式应用的 API schemas 表达。翻译时应保留 `API schemas`、`renderer-specific` 和渲染器名称，避免误写成 USD 核心统一属性。",
    ],
    terms: [
      ["RenderSettings", "渲染设置 prim"],
      ["render invocation", "一次渲染调用"],
      ["products", "渲染输出产品关系"],
      ["includedPurposes", "参与渲染的 imageable purpose 列表"],
      ["renderer-specific global configuration", "渲染器特定全局配置"],
      ["API schemas", "可应用的 API schema"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html",
    title: "RenderSettingsBase",
    summary:
      "`RenderSettingsBase` 是 `RenderSettings` 与 `RenderProduct` 可共享的抽象设置基础类。它把相机关系、分辨率、像素宽高比、NDC 数据窗口、景深和运动模糊开关等成像控制集中定义出来，便于具体 schema 复用。",
    notes: [
      "`camera` relationship 指定渲染相机；如果没有显式指定，工具或渲染器可能回退到 viewport 或默认相机。正式资产或批渲染流程中应优先 author 明确的相机关系。",
      "`resolution` 与 `pixelAspectRatio` 共同决定输出图像的像素尺寸和像素形状；它们和 `aspectRatioConformPolicy` 一起处理 camera aperture 与 image aspect ratio 的适配。",
      "`dataWindowNDC` 使用 normalized device coordinates 描述渲染数据窗口。它影响成像裁剪区域，不改变 scene geometry，也不应该被翻译成模型空间包围盒。",
      "`disableMotionBlur` 与 `disableDepthOfField` 是渲染采样效果控制项。示例 `NoBlurRenderSettings` 只演示关闭运动模糊，不表示 USD scene 中对象没有速度或相机没有焦距。",
      "本页是基类页，很多属性会在 `RenderSettings` 或 `RenderProduct` 页面再次出现。中文补强应说明继承关系和复用边界，而不是把每个派生 schema 都当成独立定义。",
    ],
    terms: [
      ["RenderSettingsBase", "渲染设置基础 schema"],
      ["aspectRatioConformPolicy", "宽高比适配策略"],
      ["camera", "渲染相机关系"],
      ["dataWindowNDC", "NDC 数据窗口"],
      ["disableDepthOfField", "禁用景深"],
      ["disableMotionBlur", "禁用运动模糊"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderVar.html",
    title: "RenderVar",
    summary:
      "`RenderVar` 定义渲染器要计算的一个输出变量或 channel，常见于 AOV、alpha、depth、ID、LPE 或 renderer-specific 输出。它描述变量语义与数据来源，通常由 `RenderProduct` 收集，再由 `RenderSettings` 纳入一次渲染配置。",
    notes: [
      "`RenderVar` prim 名称通常会成为输出变量名称，例如 `alpha` 表示 alpha channel；但 USD 不强制统一变量名和格式，因此同一概念在不同渲染器中可能有 renderer-specific 命名。",
      "`sourceName` 是读取本页最重要的属性之一：它可以指向 shader output、内置变量、renderer 输出，或像 `C<RD>[<L.>O]` 这样的 light path expression。",
      "`sourceType` 帮助解释 `sourceName` 的语义类别，例如 `lpe`。当 `sourceType` 为 LPE 时，表达式中的大小写、尖括号、方括号和空格都必须保留原样。",
      "`dataType` 用来声明输出变量的数据类型，例如 float、int、color 等。它和最终图像文件格式有关，但不是文件路径，也不是 `RenderProduct.productName`。",
      "阅读 usdRender 时可以按 `RenderSettings -> RenderProduct -> orderedVars -> RenderVar` 追踪：设置选择产品，产品排序变量，变量定义每个输出通道的来源和类型。",
    ],
    terms: [
      ["RenderVar", "渲染输出变量 prim"],
      ["AOV", "任意输出变量"],
      ["sourceName", "输出变量来源名称"],
      ["sourceType", "输出变量来源类型"],
      ["dataType", "输出数据类型"],
      ["light path expression", "光线路径表达式"],
    ],
  },
  {
    output: "full_site/release/tut_helloworld.html",
    title: "Hello World - Creating Your First USD Stage",
    summary:
      "`Hello World` 教程是 USD Python 入门的最小可运行闭环：创建 `Usd.Stage`，在 `/hello` 和 `/hello/world` 路径上定义 typed prim，最后把 root layer 保存为 `HelloWorld.usda`。本页价值在于建立 stage、layer、prim path 和 typed schema 的基础关系。",
    notes: [
      "`Usd.Stage.CreateNew('HelloWorld.usda')` 创建可编辑 stage，并把新的 root layer 绑定到目标 `.usda` 文件。中文解释应把 stage 和文件层区分开：stage 是编辑入口，layer 是持久化载体。",
      "`UsdGeom.Xform.Define(stage, '/hello')` 会在 `/hello` 定义一个 transform prim；`UsdGeom.Sphere.Define(stage, '/hello/world')` 会在其子路径定义球体 prim。路径层级体现 USD namespace。",
      "`Define` 在目标路径上创建或确保 typed prim 存在，和只查找 prim 的 `GetPrimAtPath` 不同。入门读者需要先理解 authoring API 与 query API 的区别。",
      "`stage.GetRootLayer().Save()` 是闭环的最后一步；如果没有保存，内存中的 stage 修改不会写入 `HelloWorld.usda`。保留这行代码对复现实验很重要。",
      "后续引用、属性创作、遍历和变体教程都会复用这个 stage 思路。维护本页时应优先保证代码顺序、路径字面量和 `.usda` 文件名不被翻译或改写。",
    ],
    terms: [
      ["Usd.Stage.CreateNew", "创建新 USD stage"],
      ["UsdGeom.Xform.Define", "定义 Xform typed prim"],
      ["UsdGeom.Sphere.Define", "定义 Sphere typed prim"],
      ["/hello/world", "prim 路径字面量"],
      ["root layer", "stage 的根层"],
      ["HelloWorld.usda", "教程输出的 USD 文本文件"],
    ],
  },
  {
    output: "full_site/release/tut_authoring_variants.html",
    title: "Authoring Variants",
    summary:
      "`Authoring Variants` 教程说明如何在同一个 prim 上创作 variant set，并通过 variant selection 切换模型、材质、LOD 或配置差异。它不是复制资产，而是在 USD composition 中把可选意见组织到同一资产结构下。",
    notes: [
      "`GetVariantSets()`、`AddVariantSet()`、`AddVariant()`、`SetVariantSelection()` 的顺序很重要：先取得变体集合容器，再声明变体集，再添加候选变体，最后选择当前编辑或查看的变体。",
      "`with variantSet.GetVariantEditContext()` 是把后续 authoring opinions 写入当前 variant 的关键上下文。没有进入该上下文，属性或 prim 编辑可能写到普通 layer opinion 中。",
      "variant selection 是 composition 输入之一；下游 layer 可以重新选择变体，也可以用更强 opinion 覆盖部分结果。中文说明应把 variant 与普通属性 override 的关系讲清楚。",
      "变体适合表达同一资产的可选形态，例如模型版本、材质方案、LOD、造型或配置。它不适合表达时间动画帧，也不应和 `timeSamples` 混为一谈。",
      "本教程应和引用、属性创作、stage variables 等页面一起读：引用决定资产如何组合进来，属性创作决定具体意见，variant set 提供同一 prim 下的可切换分支。",
    ],
    terms: [
      ["variant set", "变体集"],
      ["variant selection", "变体选择"],
      ["GetVariantEditContext", "变体编辑上下文"],
      ["composition opinion", "组合意见"],
      ["override", "覆盖意见"],
      ["timeSamples", "时间采样数据"],
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
