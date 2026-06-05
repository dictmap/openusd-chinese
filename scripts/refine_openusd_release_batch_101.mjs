import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-101";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html",
    title: "ParticleFieldKernelGaussianSurfletAPI",
    summary:
      "`ParticleFieldKernelGaussianSurfletAPI` 定义 `ParticleField` 的 Gaussian surflet kernel。阅读时要把它看作位于局部 XY plane 上的二维高斯 surflet：identity transform 下离开 XY plane 的 opacity 为 0，平面内的 opacity 按 Gaussian falloff 衰减，并可被 per-splat opacity、rotation、scale 和 position 继续变换。",
    notes: [
      "本页的 `surflet` 不是完整三维体积核，而是局部平面上的 splat kernel；官方说明中 `off the XY-plane defined as 0` 是关键约束，表示未变换核只在 XY plane 上有贡献。",
      "`g(u=0;o=1;x=p.length())` 描述 identity transform 下的高斯衰减读取方式：`p.length()` 给出平面内到原点的距离，`standard deviation is 1` 使 3-sigma 点落在半径 3.0 的圆盘上。",
      "`99.7% of the splat support` 说明绝大多数权重位于 XY plane 半径 3 的 disk 内；这是阅读 kernel 支持范围和 renderer 采样裁剪半径时最有用的数字。",
      "per-splat opacity 会与 Gaussian falloff 相乘，rotation 和 scale 会把圆盘 kernel 变换成平面椭圆，position 会移动峰值位置；这些变换共同决定每个粒子 splat 对最终场的局部贡献。",
      "翻译本页时应保留 `ParticleFieldKernelGaussianSurfletAPI`、`ParticleField`、`opacity`、`Gaussian falloff`、`rotation`、`scale`、`position`、`3-sigma` 等术语，避免把数学关系改写成不可复现的自然语言描述。"
    ],
    terms: [
      ["ParticleFieldKernelGaussianSurfletAPI", "粒子场 Gaussian surflet 核 API"],
      ["Gaussian surflet kernel", "Gaussian surflet 核"],
      ["XY plane", "XY 平面"],
      ["opacity", "不透明度"],
      ["Gaussian falloff", "高斯衰减"],
      ["3-sigma", "三倍标准差范围"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html",
    title: "Media (usdMedia)",
    summary:
      "`usdMedia_toc.html` 是 `usdMedia` schema 域的目录页。它把 Overview、Working With Media、AssetPreviewsAPI、SpatialAudio、SpatialAudio and Layer Offsets 以及 `auralMode`、`endTime` 等属性入口集中在一起，主要价值是导航和术语定位。",
    notes: [
      "本页应按目录页来读：先看 `Overview` 和 `Working With Media` 建立 media schema 的用途，再进入 `AssetPreviewsAPI` 或 `SpatialAudio` 等具体页面查看属性和示例。",
      "`AssetPreviewsAPI` 面向资产预览缩略图、默认图像或预览元数据；`SpatialAudio` 则面向场景中的空间音频，两者同属 `usdMedia`，但服务的使用场景不同。",
      "`SpatialAudio and Layer Offsets` 提醒读者音频播放和 USD layer time offset 可能相关；当 stage 有 layer offset 或时间重映射时，音频起止时间和播放位置需要一起检查。",
      "`auralMode`、`endTime` 等属性名应保持英文原样，因为它们是 schema property names；中文只说明用途，不替换属性字面量。",
      "这类 TOC 页面不应伪装成完整 schema 说明。它的中文层重点是告诉读者如何从目录进入具体 schema 页，并保留官方条目名以便搜索、跳转和脚本引用。"
    ],
    terms: [
      ["usdMedia", "USD 媒体 schema 域"],
      ["AssetPreviewsAPI", "资产预览 API"],
      ["SpatialAudio", "空间音频"],
      ["Layer Offsets", "层时间偏移"],
      ["auralMode", "听觉模式属性"],
      ["endTime", "结束时间属性"]
    ]
  },
  {
    output: "full_site/release/user_guides/schemas/usdLux/RectLight.html",
    title: "RectLight",
    summary:
      "`RectLight` 是 `usdLux` 中从矩形一侧发光的 intrinsic light。默认矩形位于 XY plane，中心在原点，并沿 `-Z` 方向发光；它常用于模拟摄影 soft box、线性灯、荧光灯和 light panel。",
    notes: [
      "官方说明中 `centered in the XY plane` 和 `emits light along the -Z axis` 决定了默认方向；如果场景中 RectLight 朝向不对，通常应检查 prim transform，而不是改写 light schema 本身。",
      "默认矩形在 X 和 Y 轴方向各 1 unit，示例把 width/height 设置为 `5x5`，说明面积大小会影响灯光覆盖范围、柔和阴影和能量分布的直观效果。",
      "`Use RectLights to illuminate objects` 后列出的 soft boxes、linear lights、fluorescent lights、light panels 是典型艺术与摄影用途；中文说明应保留这些英文场景词，方便和 DCC/renderer UI 对照。",
      "示例中 colored checkerboard texture 作为 color map 使用，同时配合 light shaping cone angle 和 focus 限制光照扩散；这说明 `RectLight` 可以和贴图、shaping API 一起构成更复杂的光源控制。",
      "阅读本页时要区分 light geometry、transform、texture/color map 和 shaping 属性：矩形发光面定义光源形状，transform 放置光源，color map 改变颜色分布，shaping 控制扩散范围。"
    ],
    terms: [
      ["RectLight", "矩形灯"],
      ["intrinsic light", "内建光源"],
      ["XY plane", "XY 平面"],
      ["-Z axis", "-Z 轴"],
      ["soft box", "柔光箱"],
      ["color map", "颜色贴图"]
    ]
  },
  {
    output: "full_site/api/functions_rela_t.html",
    title: "Class Members - Related Functions - T",
    summary:
      "`functions_rela_t.html` 是 Doxygen 的 Class Members - Related Functions 字母索引页，当前段落汇总与 `T` 字母段相关的 related functions 或相关类型入口。它不是单个 API 的完整说明，而是帮助读者从 `TfRefPtr`、`TfRefBase`、`TfToken`、`TfPyMethodResult` 等符号跳到具体上下文。",
    notes: [
      "Doxygen 的 `Related Functions` 常包含友元函数、非成员辅助函数、操作符或与类紧密关联的函数入口；阅读时应点击具体符号进入目标 class 或 namespace，而不是只看索引页。",
      "本页条目横跨 `Tf`、`Ef`、`Pcp`、`Sdf` 等模块，例如 `TfRefPtr`、`TfRefBase`、`EfTime`、`PcpInstanceKey`、`SdfSpec`、`TfToken`；中文不应改写这些符号。",
      "`TfRefPtr` 和 `TfRefBase` 通常与引用计数对象生命周期有关，`TfToken` 通常与 interned token 字符串有关；本页只提供索引入口，具体语义要回到各自页面确认。",
      "`Ef_VectorKey`、`EfTime`、`PcpInstanceKey`、`SdfSpec` 等条目说明 related functions 索引可能跨执行、缓存、场景描述等多个子系统；不要把它误读为单一模块页。",
      "后续维护这类索引页时，中文层应解释索引用途、模块边界和跳转方式；相关函数名、模板名、类名和链接目标必须保持 Doxygen 原样。"
    ],
    terms: [
      ["Related Functions", "相关函数"],
      ["TfRefPtr", "Tf 引用指针"],
      ["TfRefBase", "Tf 引用基类"],
      ["TfToken", "Tf token"],
      ["PcpInstanceKey", "Pcp 实例键"],
      ["SdfSpec", "Sdf 规格对象"]
    ]
  },
  {
    output: "full_site/api/globals_func_s.html",
    title: "File Members - Functions - S",
    summary:
      "`globals_func_s.html` 是 Doxygen 的 File Members - Functions 字母索引页，本页主要集中在 `Sdf*` 函数和少量其他 S 字母段函数。它用于从函数名快速定位到头文件和定义上下文，尤其适合查找 Sdf layer、spec、asset path、time sample 与 unit 转换相关入口。",
    notes: [
      "`SdfAnchorAssetPaths()`、`SdfComputeAssetPathRelativeToLayer()` 等条目和 asset path 解析、layer 相对路径计算有关；阅读时要同时关注函数名后面的 header，例如 `assetPath.h` 或 `layerUtils.h`。",
      "`SdfComposeTimeSampleMaps()` 面向 time sample map 的组合，`SdfConvertUnit()` 与 `SdfDefaultUnit()` 面向单位转换和默认单位；这些函数名应保持英文，中文只补充用途说明。",
      "`SdfCopySpec()`、`SdfCreatePrimInLayer()`、`SdfCreatePrimAttributeInLayer()`、`SdfCreateRelationshipInLayer()`、`SdfCreateVariantInLayer()` 都指向对 layer/spec 内容的创建或复制操作，和 USD 的 authored scene description 直接相关。",
      "`SdfConvertToValidMetadataDictionary()` 提醒读者 metadata 需要满足 Sdf 可接受的数据结构；如果 metadata 写入失败，通常需要检查 value 类型和 dictionary 结构。",
      "这类 File Members 索引页的关键是函数名加头文件映射。后续如果补全逐段翻译，应优先保留 `Sdf*` 函数字面量、括号、header 名和链接目标，避免破坏可搜索性。"
    ],
    terms: [
      ["File Members - Functions", "文件成员函数索引"],
      ["SdfAnchorAssetPaths", "Sdf 资产路径锚定函数"],
      ["SdfCopySpec", "Sdf spec 复制函数"],
      ["SdfCreatePrimInLayer", "在 layer 中创建 prim 的函数"],
      ["time sample", "时间样本"],
      ["metadata dictionary", "元数据字典"]
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
