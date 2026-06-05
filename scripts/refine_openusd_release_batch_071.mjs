import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-071";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdMedia/overview.html",
    title: "usdMedia Overview",
    notes: [
      "`usdMedia` 领域用于把 audio、thumbnails 和其他媒体信息关联到 USD assets；它不改变几何或材质，而是补充资产在浏览、播放和 DCC 工具中的媒体语义。",
      "本页的 `Working With Media` 示例同时展示 `AssetPreviewsAPI` 和 `SpatialAudio`：前者通过 `assetInfo.previews.thumbnails` 提供缩略图，后者通过 `filePath`、`auralMode`、`startTime` 和 `endTime` 描述音频播放。",
      "阅读时可先把 `AssetPreviewsAPI` 理解为资产浏览器入口，把 `SpatialAudio` 理解为场景时间线上的声音 prim；两者都保留外部资源路径，因此 asset path 和 token 字面量必须原样核对。",
      "示例中的 `Speech` 与 `Ambient` 代表两类常见音频：定位明确的 spatial audio 和不依赖位置的 ambient audio；实际播放、循环和偏移效果还取决于消费端工具。",
      "本页是 usdMedia 的概览入口，不是每个属性的完整规范；后续应结合 `AssetPreviewsAPI`、`SpatialAudio` 和 toc 页面继续补齐段落级双语。"
    ],
    terms: [
      ["usdMedia", "USD 媒体 schema 领域"],
      ["AssetPreviewsAPI", "资产预览 API schema"],
      ["SpatialAudio", "空间音频 schema"],
      ["thumbnail", "缩略图"],
      ["auralMode", "听觉模式"],
      ["ambient audio", "环境音频"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/overview.html",
    title: "usdRender Overview",
    notes: [
      "`usdRender` 提供标准 schema 来描述 final quality render 所需的配置，包括 `RenderSettings`、`RenderProduct`、`RenderVar` 和 `RenderPass` 等对象。",
      "概览页强调 OpenUSD 场景可以用较少配置获得 viewport 预览，但电影级或最终级渲染通常需要显式描述 render passes、outputs、compositing 和 renderer-specific 配置。",
      "`RenderSettings` 通常位于 `/Render` 这类 Scope 下，指向一个或多个 `RenderProduct`；`RenderProduct` 再组合 `RenderVar`，共同定义输出文件和 AOV。",
      "`Best Practices` 中的重点是选对 schema、集中组织 render prims，并让渲染器在可支持范围内应用这些配置；schema 名称和关系路径应保持英文原样。",
      "本页适合作为 usdRender 阅读路线入口，后续细节应转到 `RenderSettingsBase`、`RenderSettings`、`RenderProduct`、`RenderVar` 和 `RenderPass` 逐页核对。"
    ],
    terms: [
      ["usdRender", "USD 渲染 schema 领域"],
      ["RenderSettings", "渲染设置"],
      ["RenderProduct", "渲染输出产品"],
      ["RenderVar", "渲染变量/AOV"],
      ["RenderPass", "渲染 pass"],
      ["final frame", "最终帧"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html",
    title: "RenderSettingsBase",
    notes: [
      "`RenderSettingsBase` 是抽象基础类，用来定义可同时出现在 `RenderSettings` prim 或 `RenderProduct` prim 上的渲染设置。",
      "`aspectRatioConformPolicy` 处理 camera aperture 与 image aspect ratio 不一致时的适配策略；它需要和 `Camera` aperture、`resolution`、`pixelAspectRatio` 一起读。",
      "`camera` relationship 指定渲染相机；如果未显式指定，渲染器可能使用默认相机或 viewport 当前相机，因此正式输出流程应避免依赖不明确默认值。",
      "`dataWindowNDC`、`disableDepthOfField` 和 `disableMotionBlur` 这类属性属于渲染控制层，不改变 scene geometry；它们表达渲染调用如何采样和裁剪画面。",
      "示例 `NoBlurRenderSettings` 用 `disableMotionBlur = 1` 演示关闭运动模糊；中文层只解释属性语义，属性名、关系名和示例代码继续保留英文原样。"
    ],
    terms: [
      ["RenderSettingsBase", "渲染设置基础类"],
      ["aspectRatioConformPolicy", "宽高比适配策略"],
      ["camera", "渲染相机关系"],
      ["resolution", "输出分辨率"],
      ["dataWindowNDC", "NDC 数据窗口"],
      ["disableMotionBlur", "禁用运动模糊"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/overview.html",
    title: "usdUI Overview",
    notes: [
      "`usdUI` 领域面向通用 user interface metadata，重点是让 DCC Tools、编辑器和资产浏览界面能更好地展示 USD 对象，而不是改变场景求值或渲染结果。",
      "本页的 node graph 示例使用 `NodeGraphNodeAPI` 描述节点位置、颜色和展开状态，用 `Backdrop` 组织复杂节点网络，并保留 Material/Shader 关系路径。",
      "`SceneGraphPrimAPI`、`ObjectHints`、`PrimHints`、`PropertyHints` 和 `AttributeHints` 负责显示名、分组、隐藏状态、条件显示和其他 UI hints。",
      "无障碍信息由 `AccessibilityAPI` 覆盖；这类元数据面向 assistive UI，和几何、材质、灯光 schema 的职责不同。",
      "阅读本页应把 `usdUI` 看成工具界面的协作层：它帮助用户理解和操作复杂网络，但不会替代 `UsdShade`、`UsdLux` 或 `UsdRender` 的核心数据语义。"
    ],
    terms: [
      ["usdUI", "USD UI schema 领域"],
      ["NodeGraphNodeAPI", "节点图节点 API"],
      ["Backdrop", "节点图背景框"],
      ["SceneGraphPrimAPI", "场景图 prim API"],
      ["UI hints", "界面提示"],
      ["AccessibilityAPI", "无障碍信息 API"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdVol/FieldAsset.html",
    title: "FieldAsset",
    notes: [
      "`FieldAsset` 已 deprecated，官方建议使用 `VolumeFieldAsset`；因此本页首先应作为迁移提示来读，不应把旧 schema 当作新项目首选。",
      "它继承 `VolumeFieldAsset` 的 `fieldDataType`、`fieldIndex`、`fieldName`、`filePath` 和 `vectorDataRoleHint` 等属性，用于描述存储在外部文件资产中的体积场数据。",
      "`filePath` 指向外部体积数据资源，`fieldName` 对应文件内部字段名，`fieldIndex` 可在多个字段或数组场景中定位目标 field；这些属性需要和 Volume 的 `field:*` relationship 一起理解。",
      "继承自 `Xformable` 和 `Imageable` 的 `xformOpOrder`、`visibility`、`purpose` 等属性说明旧 FieldAsset 仍是场景中的可变换、可显示 prim，但核心语义是体积 field 资源引用。",
      "后续翻译应把本页与 `VolumeFieldAsset`、`FieldBase`、`Field3DAsset`、`OpenVDBAsset` 和 `Volume` 放在同一阅读链路中，明确旧 schema、抽象基类和具体文件格式 schema 的边界。"
    ],
    terms: [
      ["FieldAsset", "旧体积场资产 schema"],
      ["deprecated", "已弃用"],
      ["VolumeFieldAsset", "体积场资产抽象 schema"],
      ["fieldDataType", "场数据类型"],
      ["fieldName", "字段名"],
      ["filePath", "外部资源路径"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的 schema 用途、属性/关系阅读路径、领域边界和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first schema purpose, property and relationship reading paths, domain boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
