import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-mixed-quality-pass-046";

const refinements = [
  {
    output: "full_site/api/hd_embree_page_front.html",
    title: "HdEmbree : Embree-based Hydra renderer plugin",
    notes: [
      "`HdEmbree` 是基于 Intel Embree raytracing kernels 的 Hydra renderer plugin，主要定位是最小化示例和 renderer plugin API 的 living documentation。",
      "英文 Overview 列出 `HdEmbreeConfig`、`HdEmbreeInstancer`、`HdEmbreeMesh`、`HdEmbreeRendererPlugin`、`HdEmbreeRenderDelegate`、`HdEmbreeRenderParam`、`HdEmbreeRenderPass`、`HdEmbreeRenderer` 等核心类。",
      "页面结构中的 `Sync`、`Commit Resources`、`Executing tasks` 对应 Hydra 执行路径：从 `HdSceneDelegate` 同步数据，经资源提交后由 render task 驱动渲染。",
      "`Renderer Plugin`、`Embree Scene Ownership`、`Configuration` 和 `Unit Test` 说明本模块既展示插件注册，也展示 Embree scene 生命周期和测试配置边界。",
      "阅读本页时应把 `rtc` 前缀理解为 Embree raytracing core API，并把 `HdEngine::Execute`、`HdRenderIndex`、`HdxRenderTask`、`HdCamera`、`HdRenderBuffer` 放在 Hydra 运行链条中核对。"
    ],
    terms: [
      ["HdEmbree", "HdEmbree"],
      ["Embree", "Embree"],
      ["renderer plugin", "渲染器插件"],
      ["render delegate", "render delegate"],
      ["raytracing kernels", "光线追踪内核"]
    ]
  },
  {
    output: "full_site/api/hd_storm_page_front.html",
    title: "HdStorm : Real-time Hydra renderer plugin",
    notes: [
      "`HdStorm` 是包装 Storm Hydra render delegate 的 real-time Hydra renderer plugin，是面向实时渲染的插件入口。",
      "英文摘录说明 Storm 通过 Hydra graphics interface `Hgi` 支持 OpenGL、Metal 和 Vulkan graphics APIs；因此本页重点是插件层，而不是具体后端 API 实现细节。",
      "`HdStorm` 是 thin plugin layer；大部分 rendering functionality 位于 `HdSt` library，上一轮已对 `HdSt` 模块入口做过中文导读。",
      "阅读本页时应把 `HdStorm` 理解为对外 renderer plugin 名称/入口，把渲染状态、buffer、draw dispatch 和 render pass 细节留给 `HdSt` 页面。",
      "如果从应用集成角度阅读，本页用于判断何时选择 Storm renderer，以及它如何通过 `Hgi` 抽象跨图形 API。"
    ],
    terms: [
      ["HdStorm", "HdStorm"],
      ["Storm", "Storm"],
      ["Hgi", "Hgi"],
      ["OpenGL", "OpenGL"],
      ["Vulkan", "Vulkan"]
    ]
  },
  {
    output: "full_site/api/hdx_page_front.html",
    title: "Hdx : Hydra extensions",
    notes: [
      "`Hdx` 是 Hydra extensions 集合，面向希望使用 Hydra 做 imaging 的客户端，在 `Hd` 抽象之上提供常用 task 和 controller。",
      "英文 Overview 提到 `HdxColorizeTask`、`HdxFullscreenShader`、`HdxRenderSetupTask`、`HdxRenderTask`、`HdxSelectionTask`、`HdxShadowTask`、`HdxSimpleLightTask` 等通用任务。",
      "`HdxTaskController` 包装上述 tasks 并提供 task params 的 setters，目标是减少客户端直接管理多个 task 参数和顺序的负担。",
      "本页适合放在 `Hd` 和具体 renderer plugin 之间阅读：`Hd` 给出核心框架，`Hdx` 提供常用成像任务，`HdSt/HdStorm/HdEmbree` 提供具体渲染实现。",
      "阅读时保留 `HdxRenderTask`、`HdxSelectionTask`、`HdxShadowTask` 等类名原样；这些是后续任务级调试和渲染管线配置的入口。"
    ],
    terms: [
      ["Hdx", "Hdx"],
      ["Hydra extensions", "Hydra 扩展"],
      ["HdxTaskController", "HdxTaskController"],
      ["render task", "render task"],
      ["selection task", "selection task"]
    ]
  },
  {
    output: "full_site/api/hierarchy.html",
    title: "Class Hierarchy",
    notes: [
      "`Class Hierarchy` 是 Doxygen 生成的继承关系入口，用于按类继承和基类/派生类关系浏览 OpenUSD API，而不是某个单独模块的说明页。",
      "英文摘录说明该 inheritance list roughly alphabetically sorted；它包含 `ExecSystem::_ChangeProcessor`、`SdfSchemaBase::_SpecDefiner`、`HdSceneIndexObserver::AddedPrimEntry`、`ArAsset`、`ArResolver` 等跨模块条目。",
      "本页适合用来从抽象基类进入具体实现，例如从 `ArAsset` 到 `ArFilesystemAsset`、`ArInMemoryAsset`，或从 resolver/cache/context 类理解 Asset Resolution 继承结构。",
      "`Go to the graphical class hierarchy` 是图形化继承视图入口；本地复刻中仍应通过清单内链接跳转本地页面，清单外链接走 uncovered placeholder。",
      "阅读本页时不要按正文顺序逐项翻译所有类名，而应把它作为索引：保留类名原样，补充如何用继承关系定位 API 家族。"
    ],
    terms: [
      ["Class Hierarchy", "Class Hierarchy"],
      ["inheritance list", "继承列表"],
      ["base class", "基类"],
      ["derived class", "派生类"],
      ["graphical hierarchy", "图形化层级"]
    ]
  },
  {
    output: "full_site/api/hio_page_front.html",
    title: "Hio: Hydra Resource I/O",
    notes: [
      "`Hio` 是 Hydra Resource I/O 模块，提供 Hydra 使用的资源加载工具类，尤其面向 shader container、image/texture I/O 和 field texture data。",
      "英文摘录说明 `HioGlslfx` 解释 Pixar 的 `glslfx` GPU shader container format，支持 shader snippets composition 和用于 code generation 的 metadata。",
      "`HioImage` 提供 plugin-based image/texture-reading abstraction，并被 `hdStorm` 用于所有 image I/O；Hydra 提供 `HioStb_Image` 和 `HioOIIO_Image` 两类实现路径。",
      "`HioFieldTextureData` 与 volume/field texture 资源相关；`Working With Image File Formats` 则是处理图像格式插件和部署问题的阅读入口。",
      "阅读本页时应把 `Hio` 放在 Hydra renderer 的资源层：它不负责 scene graph 或 render task，而负责把外部资源读入渲染可消费的数据。"
    ],
    terms: [
      ["Hio", "Hio"],
      ["Hydra Resource I/O", "Hydra 资源输入输出"],
      ["HioGlslfx", "HioGlslfx"],
      ["HioImage", "HioImage"],
      ["glslfx", "glslfx"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、模块边界、关键入口和术语对照；英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, module boundaries, key entry points, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, math symbols, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
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
