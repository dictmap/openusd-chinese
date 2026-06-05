import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-usd-schema-quality-pass-059";

const refinements = [
  {
    output: "full_site/api/usd_geom_page_front.html",
    title: "UsdGeom: USD Geometry Schema",
    notes: [
      "`UsdGeom: USD Geometry Schema` 是 USD 中 3D graphics-related prim 与 property schemas 的核心入口，用于在 DCC pipeline 中交换几何数据。",
      "页面结构覆盖 `UsdGeomImageable`、`UsdGeomXformable`、`UsdGeomGprim`、`UsdGeomPointInstancer`、`UsdGeomCamera`、`UsdGeomModelAPI`、Primvars、Imageable Purpose、线性代数、坐标系、速度采样和 Stage Metrics。",
      "`UsdGeomImageable` 表示可被渲染或可视化的 prim 基类，`UsdGeomXformable` 管 transform ops，`UsdGeomGprim` 统摄 `UsdGeomMesh`、`UsdGeomBasisCurves`、`UsdGeomPoints` 等几何 primitive。",
      "`UsdGeomPrimvar` 与 `UsdGeomPrimvarsAPI` 是 primvars 阅读主线；`UsdGeomBBoxCache`、`GfMatrix4d`、`UsdGeomMotionAPI`、up axis 和 linear units 相关链接用于理解包围盒、矩阵、motion blur 和 stage metrics。",
      "阅读时先把 schema 层次和 authored attributes 分清，再按需求跳到具体类页；API 名称、schema 名称、primvar 名称和 token 字面量应保持英文原样。"
    ],
    terms: [
      ["UsdGeom", "USD 几何 schema"],
      ["UsdGeomImageable", "可显示几何基类"],
      ["UsdGeomXformable", "可变换对象"],
      ["Primvars", "primitive variables"],
      ["Stage Metrics", "舞台度量"]
    ]
  },
  {
    output: "full_site/api/usd_hydra_page_front.html",
    title: "UsdHydra: USD Hydra Schemas",
    notes: [
      "`UsdHydra: USD Hydra Schemas` 当前主要提供 `UsdHydraGenerativeProceduralAPI`，用于扩展 `UsdProcGenerativeProcedural` prim，使其能描述 `HdGpGenerativeProcedural` 插件。",
      "本页有明显的历史迁移提示：旧的 Hydra shading network schema 与行为已经删除，仅保留过渡所需的 token 列表，帮助迁移到基于 shader registry 的新式 Hydra shader authoring。",
      "`UsdHydraGenerativeProceduralAPI`、`UsdProcGenerativeProcedural`、`HdGpGenerativeProcedural` 是本页的三条核心链接；它们分别对应 USD schema API、procedural prim 和 Hydra 生成式 procedural 插件层。",
      "阅读时不要把本页当作完整 Hydra 渲染框架文档；Hydra framework 入口应看 `hd_page_front.html`，shader registry 相关应看 `Sdr` / `UsdShade` 页面。",
      "本地导读重点是说明该页面的当前职责和 deprecated 边界，避免误用已删除的 shading-related schemas。"
    ],
    terms: [
      ["UsdHydra", "USD Hydra schema 模块"],
      ["Generative Procedural", "生成式 procedural"],
      ["UsdProcGenerativeProcedural", "USD procedural prim"],
      ["HdGpGenerativeProcedural", "Hydra procedural 插件"],
      ["deprecated", "已弃用"]
    ]
  },
  {
    output: "full_site/api/usd_lux_page_front.html",
    title: "UsdLux: USD Lighting Schema",
    notes: [
      "`UsdLux: USD Lighting Schema` 提供跨图形环境可交换的 lights 与相关组件表示，目标是传递 lighting setups 并在不同环境之间尽量保持可移植。",
      "核心光源类型包括 `UsdLuxCylinderLight`、`UsdLuxDiskLight`、`UsdLuxDistantLight`、`UsdLuxDomeLight`、`UsdLuxRectLight`、`UsdLuxSphereLight`，并可通过插件扩展更多 lights 与 filters。",
      "`UsdLuxLightAPI` 表示“being a light”的 API 层，`UsdLuxBoundableLightBase` / `UsdLuxNonboundableLightBase` 区分有界和非有界光源，`UsdLuxMeshLightAPI` 与 `UsdLuxVolumeLightAPI` 让 mesh 或 volume 参与发光表达。",
      "Design Notes and Usage Guide 重点包括 Encapsulation Rules、Geometry、Quantities and Units、Exposure、Properties & Behavior、Extensibility、Plugin Lights and Light Filters。",
      "阅读时要把灯光 schema、light linking、shadow/filter API、`UsdShade` 材质封装规则和 `SdrRegistry` shader 发现分开理解；token、类名和属性名保持英文原样。"
    ],
    terms: [
      ["UsdLux", "USD 灯光 schema"],
      ["LightAPI", "灯光 API"],
      ["Light Filter", "灯光过滤器"],
      ["Exposure", "曝光"],
      ["Encapsulation Rules", "封装规则"]
    ]
  },
  {
    output: "full_site/api/usd_media_page_front.html",
    title: "UsdMedia: USD Media Schema",
    notes: [
      "`UsdMedia: USD Media Schema` 用于在 stage 上下文中包含其他媒体，例如 asset preview 或 audio。",
      "`UsdMediaAssetPreviewsAPI` 用于在 scene 中的 prim 上编码预渲染 asset previews，例如 thumbnails；它更偏向资产浏览、内容管理和预览工作流。",
      "`UsdMediaSpatialAudio` 用于把 spatial 和 non-spatial audio 编码为派生自 `UsdGeomXformable` 的 prim；这允许音频和场景空间位置、变换一起被表达。",
      "当前模块范围很窄，主要是 asset preview 与 spatial audio 两类媒体 schema；不要把它误解为完整视频、音频解码或播放运行时。",
      "阅读时先确认媒体是否需要绑定到 prim、是否需要空间化、是否属于预览元数据，再跳到 `UsdMediaAssetPreviewsAPI` 或 `UsdMediaSpatialAudio` 类页。"
    ],
    terms: [
      ["UsdMedia", "USD 媒体 schema"],
      ["AssetPreviewsAPI", "资产预览 API"],
      ["SpatialAudio", "空间音频"],
      ["thumbnail", "缩略图"],
      ["UsdGeomXformable", "可变换 prim 基类"]
    ]
  },
  {
    output: "full_site/api/usd_mtlx_page_front.html",
    title: "UsdMtlx: MaterialX File Format and Shader Plugins",
    notes: [
      "`UsdMtlx: MaterialX File Format and Shader Plugins` 提供 MaterialX file format、shader discovery 与 parsing plugin，并提供读取和交互 MaterialX documents 的工具函数。",
      "Concept Mappings 小节把 MaterialX 概念映射到 USD / UsdShade / Sdr：`input` 对应 `UsdShadeInput`，`output` 对应 `UsdShadeOutput`，`node` 和 `nodedef` 对应 `UsdShadeShader`，`nodegraph` 对应 `UsdShadeNodeGraph`，`implementation` 对应 `SdrShaderNode`。",
      "`geom`、`collection` 与 `UsdCollectionAPI` 相关，`material` 与 `UsdShadeMaterial` / `UsdShadeMaterialBindingAPI` 相关；阅读时应把文件格式插件和 shading schema 表达分开理解。",
      "Unsupported MaterialX Features 小节提醒：file format plugin 使用 MaterialX XML reader，因此能读合法 MaterialX 文件，但未支持的特性会被忽略或不完整处理。",
      "本页适合从 MaterialX 资产进入 USD shading pipeline；后续细节应对照 `UsdShadeInput`、`UsdShadeOutput`、`UsdShadeShader`、`UsdShadeNodeGraph`、`SdrShaderNode` 和 material binding 相关类页。"
    ],
    terms: [
      ["UsdMtlx", "USD MaterialX 插件"],
      ["MaterialX", "MaterialX"],
      ["UsdShadeInput", "UsdShade 输入"],
      ["SdrShaderNode", "Sdr 着色器节点"],
      ["file format plugin", "文件格式插件"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的模块用途、schema/API 边界、阅读路径和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first module purpose, schema/API boundaries, reading paths, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and source excerpts for comparison with the official Doxygen page.</p>
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
