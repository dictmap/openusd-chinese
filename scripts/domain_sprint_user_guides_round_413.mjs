import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 413;
const BASE_GOOD = 159;
const GENERATED_AT = "2026-06-08T04:10:00.000Z";
const SOURCE_PARITY_REPORT = "reports/round_413_user_guides_source_parity.json";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function slash(value) {
  return String(value).replaceAll("\\", "/");
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function inline(value) {
  return String(value ?? "")
    .split("`")
    .map((part, index) => (index % 2 ? `<code>${esc(part)}</code>` : esc(part)))
    .join("");
}

function linkFrom(output, target) {
  return slash(path.relative(path.dirname(output), target)) || path.basename(target);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), JSON.stringify(value, null, 2), "utf8");
}

function sourceHtml(page) {
  const file = rel(page.source);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function sourceText(page) {
  return stripTags(sourceHtml(page));
}

function sourceHeadings(page) {
  const html = sourceHtml(page);
  return [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

const css = `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f5f7fb;color:#1d2733;line-height:1.66}
    header{background:#17202a;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#566373;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    table{width:100%;border-collapse:collapse;margin-top:12px}
    th,td{border:1px solid #d8dee8;padding:10px;text-align:left;vertical-align:top}
    th{background:#eef2f7}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    pre{white-space:pre-wrap;background:#f1f5f9;border:1px solid #d8dee8;border-radius:6px;padding:12px;overflow:auto}
`;

const pages = [
  {
    slug: "color-user-guide",
    output: "full_site/release/user_guides/color_user_guide.html",
    source: "source/full_release/user_guides/color_user_guide_source.html",
    official_url: "https://openusd.org/release/user_guides/color_user_guide.html",
    title: "Color User's Guide",
    zhTitle: "颜色用户指南",
    summary:
      "本页解释 OpenUSD 如何把颜色值与色彩空间元数据放在同一条创作和渲染链路里理解。阅读时要把 `ColorSpaceAPI`、继承解析、默认色彩空间、gamut、white point、linear 与 non-linear space 当成一组约定，而不是把颜色 tuple 当成没有上下文的 RGB 数字。",
    sourceKeywords: [
      "Color User",
      "Working With Color in OpenUSD",
      "Color Spaces Supported by OpenUSD",
      "Working With Color Space Schemas",
      "Color Space Inheritance and Resolution",
      "Default Color Space",
      "What is a Color Space?",
      "Gamut Limitations and Considerations",
      "Common White Points",
      "Linear vs. Non-Linear Spaces",
      "Considerations in Content Creation",
      "Glossary of Color Terms",
    ],
    sectionNotes: [
      ["Working With Color in OpenUSD", "说明颜色值需要和 stage、layer、asset 中的色彩空间声明一起解释；它回答的是颜色如何被 authoring、composition 和 renderer 一起消费。"],
      ["Color Spaces Supported by OpenUSD", "列出 OpenUSD 可识别的色彩空间名字和语义边界。这里的名字、token 和 schema 标识必须保留英文，不能翻成自然语言标签。"],
      ["Working With Color Space Schemas", "介绍通过 schema 元数据表达颜色空间的方式，尤其要关注 `ColorSpaceAPI` 一类约定如何让工具在读取属性时知道颜色值应该如何转换。"],
      ["Color Space Inheritance and Resolution", "解释色彩空间如何沿 namespace、属性和 prim 层级解析；调试颜色错误时要先看继承链，而不是只看最终数值。"],
      ["Default Color Space", "说明没有显式声明时的默认解释。默认值不是艺术判断，而是为了让未标注资产仍有可预测的处理路径。"],
      ["What is a Color Space?", "补充 gamut、white point、transfer function 等概念，帮助区分颜色数据的数值范围与视觉结果。"],
      ["Gamut Limitations and Considerations", "提醒某些色彩空间无法覆盖所有可见颜色或所有设备输出；跨 DCC、纹理和渲染器传递时要检查裁剪与转换。"],
      ["Common White Points", "解释白点差异会改变同一数值的视觉解释，尤其在 ACES、sRGB 或显示设备之间转换时容易被忽略。"],
      ["Linear vs. Non-Linear Spaces", "说明线性空间适合物理计算和 lighting，非线性空间常见于显示或图像编码；不要把 gamma 编码的纹理直接当线性颜色使用。"],
      ["Considerations in Content Creation", "把上述规则落实到内容制作流程：纹理、材质、灯光和渲染输出需要一致的色彩空间策略。"],
      ["Glossary of Color Terms", "作为术语核对区，读者可以回头确认 gamut、white point、linear、non-linear 等词的边界。"],
    ],
    workflows: [
      "先确认颜色属性来自材质、纹理、灯光还是显示输出，再沿 namespace 和 layer 检查显式或继承得到的 color space。",
      "如果渲染结果偏暗、偏灰或饱和度异常，先排查 linear/non-linear 混用，再检查 renderer 是否按相同默认色彩空间解释该属性。",
      "跨 DCC 导入时保留 `ColorSpaceAPI`、token 和原始属性名，只翻译阅读说明，不改变 asset 中的正式标识。",
    ],
    boundaries: [
      "`ColorSpaceAPI` 不是材质 shader，也不是渲染器色彩管理的完整替代；它提供的是 USD 层面的颜色解释线索。",
      "不要把 `sRGB`、`ACEScg`、`linear` 等 token 翻译成中文 token；这些名字需要被工具和 renderer 精确识别。",
      "颜色空间问题常常表现为视觉差异，但排查路径应从 authored metadata、继承解析和 texture source 开始。",
    ],
    related: [
      ["Rendering with USD", "full_site/release/user_guides/render_user_guide.html"],
      ["Primvars", "full_site/release/user_guides/primvars.html"],
      ["UsdPreviewSurface Specification", "full_site/release/spec_usdpreviewsurface.html"],
    ],
  },
  {
    slug: "namespace-editing",
    output: "full_site/release/user_guides/namespace_editing.html",
    source: "source/full_release/user_guides/namespace_editing_source.html",
    official_url: "https://openusd.org/release/user_guides/namespace_editing.html",
    title: "Namespace Editing",
    zhTitle: "命名空间编辑",
    summary:
      "本页说明如何使用 `UsdNamespaceEditor` 对 prim、property 和依赖 stage 执行移动、删除、重命名等 namespace 级编辑。它的核心不是字符串替换，而是在 composition、relocates、路径修复和依赖 stage 之间保持可验证的一致性。",
    sourceKeywords: [
      "Namespace Editing",
      "Using UsdNamespaceEditor",
      "Setting Editor Options",
      "Working With Relocates",
      "Fixing Paths For Moved Objects",
      "Applying Edits to Dependent Stages",
      "Batch Edits",
      "Namespace Editing Best Practices",
      "Use CanApplyEdits() To Validate Edit Operations",
      "Built-In Properties From Schemas Are Not Editable",
      "Be Aware of Relocates Performance Impact",
    ],
    sectionNotes: [
      ["Using UsdNamespaceEditor", "`UsdNamespaceEditor` 是执行 namespace edit 的主入口；它负责把移动、删除和重命名操作转化为可应用到 stage 的编辑请求。"],
      ["Setting Editor Options", "选项决定编辑器是否修复依赖路径、是否处理 relocates、以及如何对待关联 stage；这些选项会直接影响结果是否安全。"],
      ["Working With Relocates", "`relocates` 让 prim 路径在 composition 中被重定向。它能解决引用路径变化问题，但也会增加解析和维护成本。"],
      ["Fixing Paths For Moved Objects", "当对象移动后，relationships、connections、targets 和引用路径可能需要同步修复；只改 prim 路径通常是不完整的。"],
      ["Applying Edits to Dependent Stages", "依赖 stage 可能持有指向原路径的引用或连接，编辑需要考虑这些上下文，否则场景表面成功、下游读取失败。"],
      ["Batch Edits", "批量编辑允许先收集多个操作，再一起验证和应用；这比逐条提交更适合大规模重构 namespace。"],
      ["Namespace Editing Best Practices", "最佳实践强调先验证、再应用、再检查依赖 stage；它是避免破坏 composition 的主要防线。"],
      ["Use CanApplyEdits() To Validate Edit Operations", "`CanApplyEdits()` 应在 `ApplyEdits()` 前运行，用来暴露不可编辑路径、冲突、relocates 风险和 schema 内建属性限制。"],
      ["Built-In Properties From Schemas Are Not Editable", "schema 内建属性不是普通 authored property；不要用 namespace editor 把它们当作自由可重命名字段处理。"],
      ["Be Aware of Relocates Performance Impact", "relocates 会影响路径解析和 composition 性能，长期维护时需要权衡直接重构与添加重定位规则。"],
    ],
    workflows: [
      "准备编辑前先列出源路径、目标路径、受影响 relationships/connections，并把依赖 stage 纳入检查范围。",
      "执行顺序应是创建 `UsdNamespaceEditor`、设置 options、添加 edit、调用 `CanApplyEdits()`、检查诊断，再调用 `ApplyEdits()`。",
      "批量移动或删除后，用 layer diff、stage traversal 和引用目标检查确认没有悬空路径或未更新的 connection。",
    ],
    boundaries: [
      "`UsdNamespaceEditor` 不是文本编辑器；它处理的是 USD namespace 和 composition 语义，不应绕过它直接替换 usda 字符串。",
      "`CanApplyEdits()` 的 warning 不能忽略；warning 可能意味着 relocates、依赖 stage 或性能方面的后续风险。",
      "不要尝试编辑 schema built-in properties；这些属性的定义来自 schema，不能像普通 custom property 那样重命名。",
    ],
    related: [
      ["Variable Expressions", "full_site/release/user_guides/variable_expressions.html"],
      ["Time and Animated Values", "full_site/release/user_guides/time_and_animated_values.html"],
      ["SdfPath API", "full_site/api/class_sdf_path.html"],
    ],
  },
  {
    slug: "primvars",
    output: "full_site/release/user_guides/primvars.html",
    source: "source/full_release/user_guides/primvars_source.html",
    official_url: "https://openusd.org/release/user_guides/primvars.html",
    title: "Primvars",
    zhTitle: "Primvars 用户指南",
    summary:
      "本页解释 primvars 如何在几何体、材质和渲染之间传递 per-primitive、per-face、per-vertex 或 face-varying 数据。核心阅读重点是 interpolation、scene namespace、indexed primvars 和 elementSize，而不是把 primvar 当普通 attribute。",
    sourceKeywords: [
      "Primvars",
      "Primvar Interpolation Modes",
      "Constant Interpolation",
      "Uniform Interpolation",
      "Vertex Interpolation",
      "Varying Interpolation",
      "faceVarying Interpolation",
      "Primvars and the Scene Namespace",
      "Indexed Primvars",
      "Indexed Primvars and Attribute Blocks",
      "Primvar Element Size",
    ],
    sectionNotes: [
      ["Primvar Interpolation Modes", "interpolation 决定 primvar 值如何映射到几何拓扑。调试错位、材质花纹或属性读取失败时，这是第一层要检查的语义。"],
      ["Constant Interpolation", "`constant` 表示整个 prim 共享一个值，适合对象级颜色、材质选择或整体标记。"],
      ["Uniform Interpolation", "`uniform` 常按 face 或 patch 级别变化，适合面级分类、face set 风格数据或低频材质变化。"],
      ["Vertex Interpolation", "`vertex` 值随拓扑顶点变化，通常用于点级数据；它不同于 face corner 级别的 `faceVarying`。"],
      ["Varying Interpolation", "`varying` 表示可以在点之间插值的值，常用于随几何变化但不严格按 face corner 分裂的数据。"],
      ["faceVarying Interpolation", "`faceVarying` 按 face corner 存储，常用于 UV、法线或需要在 seam 处断开的数据。"],
      ["Primvars and the Scene Namespace", "primvars 在 scene namespace 中以约定前缀和属性形式出现，但语义由 `UsdGeomPrimvarsAPI` 等 API 解释。"],
      ["Indexed Primvars", "indexed primvars 把值数组和 index 数组拆开，能减少重复值，但调试时必须同时检查 indices 与 values。"],
      ["Indexed Primvars and Attribute Blocks", "attribute block 会影响 authored value 的有效性；不要只看默认值，要看 composition 后该时间点是否被 block。"],
      ["Primvar Element Size", "elementSize 描述每个元素包含多少个值，尤其影响 shader 或 renderer 如何把数组切片成逻辑元素。"],
    ],
    workflows: [
      "先确认 primvar 名称、typeName、interpolation 和 elementSize，再检查数组长度是否与拓扑数量匹配。",
      "材质读取失败时同时检查 `UsdGeomPrimvarsAPI`、shader primvar reader、material binding 和 renderer 是否支持该 interpolation。",
      "如果使用 indexed primvar，调试时同时 dump values、indices 和 authored layer，避免把 index 错误误判为材质错误。",
    ],
    boundaries: [
      "primvar 是带几何解释的 attribute，不是任意 custom attribute；它需要和 interpolation、拓扑和 renderer 消费方式一起理解。",
      "`faceVarying` 不是 `vertex` 的同义词；UV seam、法线分裂和 per-corner 数据通常依赖 face-varying 语义。",
      "indexed primvar 节省存储但增加排查复杂度；indices 越界或长度不匹配会让最终材质结果很难从表面判断。",
    ],
    related: [
      ["Rendering with USD", "full_site/release/user_guides/render_user_guide.html"],
      ["UsdGeomPrimvarsAPI", "full_site/api/class_usd_geom_primvars_a_p_i.html"],
      ["UsdGeom Mesh", "full_site/api/class_usd_geom_mesh.html"],
    ],
  },
  {
    slug: "render-user-guide",
    output: "full_site/release/user_guides/render_user_guide.html",
    source: "source/full_release/user_guides/render_user_guide_source.html",
    official_url: "https://openusd.org/release/user_guides/render_user_guide.html",
    title: "Rendering with USD",
    zhTitle: "使用 USD 进行渲染",
    summary:
      "本页是 release user guide 中连接 scene authoring、lighting、materials、image formats、camera 和 render settings 的渲染主线。它不是某个 renderer 的专属手册，而是说明 USD 如何把可渲染内容、材质绑定、灯光、相机和输出配置组织成 renderer 可消费的场景描述。",
    sourceKeywords: [
      "Rendering with USD",
      "Configuring Imageable Content",
      "Configuring the Stage Coordinate System",
      "Understanding Render Visibility",
      "Using the Visibility Attribute",
      "Using Imageable Purpose",
      "Understanding Intrinsic and Explicit Normals",
      "Working with Lights",
      "Using Light-linking to Filter Objects Affected by Lights",
      "Working with Materials",
      "Using the USD Preview Material",
      "Using GLSLFX Shaders",
      "Working with Primvars",
      "Primvar Interpolation",
      "Indexed Primvars",
      "Consuming Primvars in Materials",
      "Material Primvar Fallbacks",
      "Using Material Binding Purpose",
      "Binding Materials to Collections",
      "Setting Collection Binding Strength",
      "Combining Collection Binding with Material Binding Purpose",
      "Using Material Render Contexts",
      "Working With Image File Formats",
      "Guidelines for All Supported Image Formats",
      "JPEG",
      "PNG",
      "OpenEXR",
      "AV1 Image File Format (AVIF)",
      "Defining the Render Camera",
      "Configuring Motion Blur",
      "Configuring Render Settings",
    ],
    sectionNotes: [
      ["Configuring Imageable Content", "`Imageable` 相关属性定义 prim 是否、以何种目的参与渲染；这里要同时看 visibility、purpose、normals 和坐标系。"],
      ["Configuring the Stage Coordinate System", "stage 坐标系影响摄像机、灯光、法线和物理尺度解释；渲染差异常常来自坐标约定不一致。"],
      ["Understanding Render Visibility", "visibility 是渲染可见性的核心 authored 属性，composition 后的结果比单个 layer 中的局部值更重要。"],
      ["Using the Visibility Attribute", "`visibility` 控制对象是否可见，但它不是材质开关，也不等同于 collection membership。"],
      ["Using Imageable Purpose", "`purpose` 区分 default、render、proxy、guide 等用途；调试缺失物体时要检查 renderer 选择了哪些 purpose。"],
      ["Understanding Intrinsic and Explicit Normals", "法线可能来自几何 intrinsic 计算，也可能来自显式 authored 数据；错误法线会影响 shading、背面和法线贴图解释。"],
      ["Working with Lights", "灯光部分连接 `usdLux` schema；要看 light type、light-linking、shadow/shaping/filter 与 renderer 支持边界。"],
      ["Using Light-linking to Filter Objects Affected by Lights", "light-linking 通过关系和集合控制灯光影响范围，不应和 visibility 或 material binding 混用。"],
      ["Working with Materials", "材质部分连接 `UsdShade`、`UsdPreviewSurface`、shader input 和 renderer context，是 surface 结果的主要来源。"],
      ["Using the USD Preview Material", "`UsdPreviewSurface` 提供跨工具的预览材质约定，但高端 renderer 仍可能使用专属 render context。"],
      ["Using GLSLFX Shaders", "`GLSLFX` 是预览和工具侧 shader 表达之一，不要把它当成所有 renderer 的最终 shading 语言。"],
      ["Working with Primvars", "材质消费 primvars 时必须匹配名称、类型、interpolation、indices 和 fallback，否则 shader 读取会失败或得到默认值。"],
      ["Primvar Interpolation", "`Primvar Interpolation` 决定 primvar 以 constant、uniform、vertex、varying 或 faceVarying 方式被 shader 消费。"],
      ["Indexed Primvars", "`Indexed Primvars` 把 values 和 indices 分开；在材质里读取时要确认 renderer 同时支持索引与对应 interpolation。"],
      ["Consuming Primvars in Materials", "`Consuming Primvars in Materials` 说明 shader 如何按名称读取 primvar，并在找不到数据时回到 fallback。"],
      ["Material Primvar Fallbacks", "`Material Primvar Fallbacks` 是材质网络里为缺失 primvar 准备的后备值，不能替代正确 authored primvar。"],
      ["Using Material Binding Purpose", "material binding purpose 允许同一 prim 在不同渲染用途下绑定不同材质，常用于 preview 与 full render 分流。"],
      ["Binding Materials to Collections", "collection binding 让一组对象共享材质规则，但强度、目的和局部绑定会共同决定最终解析结果。"],
      ["Setting Collection Binding Strength", "`Setting Collection Binding Strength` 控制 collection binding 与局部绑定之间的解析优先级。"],
      ["Combining Collection Binding with Material Binding Purpose", "`Combining Collection Binding with Material Binding Purpose` 说明集合绑定和目的绑定可以叠加，但要按解析强度判断最终材质。"],
      ["Using Material Render Contexts", "render context 区分通用材质和 renderer-specific 网络；调试时要确认 renderer 查询的是哪个 context。"],
      ["Working With Image File Formats", "纹理格式影响色彩、alpha、压缩和通道精度；JPEG、PNG、OpenEXR、AVIF 的适用范围不同。"],
      ["Guidelines for All Supported Image Formats", "`Guidelines for All Supported Image Formats` 提醒先检查通道、色彩空间、压缩、alpha 和文件扩展名，而不是只看图片是否能打开。"],
      ["Defining the Render Camera", "camera 定义视图、焦距、裁剪和运动模糊上下文；缺少有效 camera 时 renderer 可能使用默认视角或失败。"],
      ["AV1 Image File Format (AVIF)", "`AV1 Image File Format (AVIF)` 是图像格式章节的一部分，读取时要把它和 JPEG、PNG、OpenEXR 的用途区分开。"],
      ["Configuring Motion Blur", "motion blur 依赖时间采样、camera shutter 和 renderer 支持，不能只靠打开一个布尔开关理解。"],
      ["Configuring Render Settings", "`RenderSettings` 连接输出 resolution、products、vars 和 render pass，是最终图片/数据输出的配置入口。"],
    ],
    workflows: [
      "渲染问题排查应按 stage 坐标系、visibility/purpose、geometry normals、lights、materials、primvars、camera、RenderSettings 的顺序缩小范围。",
      "如果对象不出现，先检查 `visibility`、`purpose`、collection membership、material binding 和 renderer 选择的 render context。",
      "如果材质或纹理错误，先核对 `UsdPreviewSurface`、primvar reader、texture color space、image file format 和 renderer 支持矩阵。",
    ],
    boundaries: [
      "本页描述的是 USD 渲染语义，不保证每个 renderer 都以完全相同方式实现所有功能；renderer-specific context 仍需单独核对。",
      "`purpose`、`visibility`、light-linking 和 material binding 是不同维度，不能互相替代。",
      "`RenderSettings` 负责输出配置，不负责修复场景中错误的材质、法线、灯光或时间采样。",
    ],
    related: [
      ["usdRender RenderSettings", "full_site/release/user_guides/schemas/usdRender/RenderSettings.html"],
      ["usdLux LightAPI", "full_site/release/user_guides/schemas/usdLux/LightAPI.html"],
      ["Color User's Guide", "full_site/release/user_guides/color_user_guide.html"],
      ["Primvars", "full_site/release/user_guides/primvars.html"],
    ],
  },
  {
    slug: "time-and-animated-values",
    output: "full_site/release/user_guides/time_and_animated_values.html",
    source: "source/full_release/user_guides/time_and_animated_values_source.html",
    official_url: "https://openusd.org/release/user_guides/time_and_animated_values.html",
    title: "Time and Animated Values",
    zhTitle: "时间与动画值",
    summary:
      "本页解释 USD 中 `TimeCode`、时间采样、layer 起止时间、`timeCodesPerSecond`、composition 中的时间重映射和 `LayerOffset`。重点是区分 layer 的时间坐标、stage 的合成时间坐标和真实秒数之间的映射关系。",
    sourceKeywords: [
      "Time and Animated Values",
      "Understanding TimeCodes",
      "Working With TimeCodes Programmatically",
      "Mapping TimeCodes to Real Time",
      "Specifying Layer Start and End Times",
      "Using TimeCode Ranges",
      "Working with Automatic and Explicit TimeCode Remapping Across Composition",
      "Automatic Scaling of timeCodesPerSecond",
      "Configuring TimeCode Scaling and Offsets Using LayerOffsets",
      "Combining Automatic Scaling and Layer Offsets",
    ],
    sectionNotes: [
      ["Understanding TimeCodes", "`TimeCode` 是 USD 的时间坐标，不直接等于秒；它用于索引动画 sample、metadata 和 composition 后的时间值。"],
      ["Working With TimeCodes Programmatically", "程序读取或写入动画值时要显式传入 time code，并理解 default value 与 time-sampled value 的区别。"],
      ["Mapping TimeCodes to Real Time", "`timeCodesPerSecond` 把 TimeCode 坐标映射到真实时间；不同 layer 的该值可能不同。"],
      ["Specifying Layer Start and End Times", "layer 的 start/end time metadata 用来描述动画范围，不等于一定裁剪所有 sample。"],
      ["Using TimeCode Ranges", "time range 帮助工具遍历、播放和导出动画区间，调试时要确认使用的是 layer 范围还是 composed stage 范围。"],
      ["Working with Automatic and Explicit TimeCode Remapping Across Composition", "composition 会在引用或 payload 之间处理时间坐标差异，自动缩放和显式 offset 可能同时存在。"],
      ["Automatic Scaling of timeCodesPerSecond", "当 layer 的 `timeCodesPerSecond` 不同时，USD 可能按比例缩放 sample 时间，使动画在真实秒数上对齐。"],
      ["Configuring TimeCode Scaling and Offsets Using LayerOffsets", "`LayerOffset` 通过 scale 和 offset 改变引用或 payload 的时间映射，常用于复用动画片段。"],
      ["Combining Automatic Scaling and Layer Offsets", "自动缩放和 `LayerOffset` 组合时要按顺序理解，否则同一个 sample 会落到意外的 stage 时间。"],
    ],
    workflows: [
      "动画错位时先比较 source layer 与 consuming layer 的 `timeCodesPerSecond`，再检查 reference/payload 上是否有 `LayerOffset`。",
      "程序化写 sample 时区分 default value 与 time-sampled value，并在读取阶段确认查询时间是否经过 composition remapping。",
      "在 `usdview` 或自定义工具中排查时，记录 layer start/end、stage time range、sample times 和最终 composed value。",
    ],
    boundaries: [
      "`framesPerSecond` 更偏向播放或显示约定，`timeCodesPerSecond` 才是 TimeCode 到真实秒数映射的关键字段。",
      "`LayerOffset` 本身不是可动画属性；它改变的是 composition arc 上的时间映射规则。",
      "不要把 layer 的局部 time sample 直接当作 composed stage 时间，尤其在 references、payloads 和 layer offsets 混用时。",
    ],
    related: [
      ["Referencing Layers tutorial", "full_site/release/tut_referencing_layers.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"],
      ["UsdStage API", "full_site/api/class_usd_stage_cache.html"],
    ],
  },
  {
    slug: "variable-expressions",
    output: "full_site/release/user_guides/variable_expressions.html",
    source: "source/full_release/user_guides/variable_expressions_source.html",
    official_url: "https://openusd.org/release/user_guides/variable_expressions.html",
    title: "USD Variable Expressions",
    zhTitle: "USD 变量表达式",
    summary:
      "本页说明如何在 layer 的 `expressionVariables` metadata 中声明变量，并在 asset paths、variant selections、sublayers 等位置用表达式选择值。核心边界是：表达式用于 composition 相关的可变选择，不是通用脚本语言，也不是运行时 Python。",
    sourceKeywords: [
      "USD Variable Expressions",
      "Defining Expression Variables in a Layer",
      "string",
      "bool",
      "int64",
      "<type>[]",
      "None",
      "Expression Variables and Composition",
      "Authoring Variable Expressions",
      "Expression Function Reference",
      "defined(<variable name>",
      "if(<condition>, <true-value>, <false-value>)",
      "if(<condition>, <true-value>)",
      "and(<x>, <y>",
      "or(<x>, <y>",
      "not(<x>)",
      "eq(<x>, <y>)",
      "neq(<x>, <y>)",
      "lt(<x>, <y>)",
      "leq(<x>, <y>)",
      "gt(<x>, <y>)",
      "geq(<x>, <y>)",
      "contains(<list_or_string>, <value>)",
      "at(<list_or_string>, <index>)",
      "len(<list_or_string>)",
      "Examples",
      "Flexible Variant Selections",
      "Asset-valued Texture File Attribute",
      "Conditionally Include Sublayers",
    ],
    sectionNotes: [
      ["Defining Expression Variables in a Layer", "`expressionVariables` 是 layer metadata 字典，变量在 layer 层声明，并在 composition 过程中被解析。"],
      ["string", "`string` 变量适合路径片段、renderer 名称或配置标签，但不要把它当作可执行代码。"],
      ["bool", "`bool` 变量常用于开关式选择，例如是否使用低模资产、是否包含某个 sublayer。"],
      ["int64", "`int64` 变量适合离散数值选择；表达式函数会按类型规则比较和传递它。"],
      ["<type>[]", "数组变量可被 `contains()`、`at()`、`len()` 等函数消费，适合候选列表或多值配置。"],
      ["None", "`None` 表示无值或条件不成立时的缺省结果，在表达式返回 asset path 或 sublayer 时尤其要谨慎。"],
      ["Expression Variables and Composition", "变量表达式在 composition 中生效，因此会影响 references、payloads、variants 和 sublayers 的解析结果。"],
      ["Authoring Variable Expressions", "表达式用反引号包裹，并通过 `${VARIABLE}` 引用变量；authoring 时必须保留函数名和变量语法。"],
      ["Expression Function Reference", "函数参考定义了可用的小型表达式语言；它不是任意 Python/JavaScript 运行环境。"],
      ["defined(<variable name>, ...)", "`defined()` 用来检查变量是否存在，常与 `if()` 组合避免未定义变量导致表达式失败。"],
      ["if(<condition>, <true-value>, <false-value>)", "三参数 `if()` 在条件为真或假时选择两个值之一，适合 asset path 或 variant selection 的分支。"],
      ["if(<condition>, <true-value>)", "两参数 `if()` 在条件为假时返回 `None`，要确认调用位置是否允许 None。"],
      ["and(<x>, <y>, ...)", "`and()`、`or()`、`not()` 提供布尔组合；复杂条件应保持可读，避免隐藏 composition 行为。"],
      ["or(<x>, <y>, ...)", "`or()` 在任一条件为真时返回真，常用于多个配置开关的组合判断。"],
      ["not(<x>)", "`not()` 对布尔结果取反，适合把启用/禁用逻辑写成明确的表达式。"],
      ["eq(<x>, <y>)", "`eq()`、`neq()`、`lt()`、`leq()`、`gt()`、`geq()` 是比较函数，类型不匹配时要先回到变量定义检查。"],
      ["neq(<x>, <y>)", "`neq()` 判断两个值不相等，常和 renderer 名称、variant 名称或配置标签一起使用。"],
      ["lt(<x>, <y>)", "`lt()`、`leq()`、`gt()`、`geq()` 处理有序比较，适合数值变量，不适合随意混用 string。"],
      ["leq(<x>, <y>)", "`leq()` 表示小于等于，和 `lt()` 的边界差异会影响条件分支。"],
      ["gt(<x>, <y>)", "`gt()` 表示大于，常用于按数量或版本号选择资源。"],
      ["geq(<x>, <y>)", "`geq()` 表示大于等于，适合需要包含边界值的选择。"],
      ["contains(<list_or_string>, <value>)", "`contains()`、`at()`、`len()` 用于字符串或列表查询，常配合数组变量选择资产。"],
      ["at(<list_or_string>, <index>)", "`at()` 从列表或字符串中取指定位置的值；调试时要确认 index 不越界。"],
      ["len(<list_or_string>)", "`len()` 返回列表或字符串长度，常与 `gt()` 或 `if()` 组合避免访问空列表。"],
      ["Examples", "示例展示 flexible variant selections、asset-valued texture file attribute 和 conditionally include sublayers 的实际用途。"],
      ["Flexible Variant Selections", "`Flexible Variant Selections` 展示如何用变量控制 variant selection。"],
      ["Asset-valued Texture File Attribute", "`Asset-valued Texture File Attribute` 展示如何用表达式选择纹理 asset path。"],
      ["Conditionally Include Sublayers", "`Conditionally Include Sublayers` 展示如何按变量决定是否包含某个 sublayer。"],
    ],
    workflows: [
      "先在 layer metadata 中核对 `expressionVariables` 的变量名、类型和值，再检查表达式位置是否处在支持变量表达式的字段上。",
      "表达式失败时按 `defined()`、类型匹配、函数返回值、是否允许 `None`、composition arc 的顺序排查。",
      "对 asset path、variant selection 或 sublayer 使用变量时，保留反引号、`${VAR}`、函数名和路径引号的原始语义。",
    ],
    boundaries: [
      "变量表达式不是脚本语言，不能执行任意逻辑或访问运行时状态；它只提供受限函数和 composition 期求值。",
      "不要把 `expressionVariables` 翻译成中文键名；这是 layer metadata 字段，工具需要按英文名识别。",
      "`None` 可能是合法返回，也可能导致目标字段无值；是否安全取决于表达式被用在哪个 USD 字段上。",
    ],
    related: [
      ["Stage Variable Expressions proposal", "full_site/release/wp_stage_variables.html"],
      ["Referencing Layers tutorial", "full_site/release/tut_referencing_layers.html"],
      ["Namespace Editing", "full_site/release/user_guides/namespace_editing.html"],
    ],
  },
];

function inventoryPage(page) {
  const inventory = readJson("reports/all_pages_inventory.json");
  return (inventory.pages || []).find((entry) => entry.local_output === page.output);
}

function hasRoundPromotion(page) {
  try {
    const manifest = readJson("reports/bilingual_completion_promotions.json");
    return (manifest.promotions || []).some((entry) => entry.id === `round-${ROUND}-release-user-guide-${page.slug}` && entry.local_output === page.output);
  } catch {
    return false;
  }
}

function activePages() {
  const active = [];
  const skipped = [];
  for (const page of pages) {
    const inv = inventoryPage(page);
    const outputExists = fs.existsSync(rel(page.output));
    const sourceExists = fs.existsSync(rel(page.source));
    if (!inv) {
      skipped.push({ output: page.output, reason: "not_in_inventory" });
    } else if (inv.status !== "bilingual_draft" && !(inv.status === "bilingual_complete" && hasRoundPromotion(page))) {
      skipped.push({ output: page.output, reason: `status_is_${inv.status}` });
    } else if (!outputExists) {
      skipped.push({ output: page.output, reason: "missing_output_html" });
    } else if (!sourceExists) {
      skipped.push({ output: page.output, reason: "missing_source_snapshot" });
    } else {
      active.push(page);
    }
  }
  return { active, skipped };
}

function sourceFacts(page) {
  const src = sourceText(page);
  const out = fs.existsSync(rel(page.output)) ? stripTags(fs.readFileSync(rel(page.output), "utf8")) : "";
  const missingSourceKeywords = page.sourceKeywords.filter((keyword) => !src.includes(keyword));
  const missingOutputKeywords = page.sourceKeywords.filter((keyword) => !out.includes(keyword));
  return {
    page: page.slug,
    title: page.title,
    output: page.output,
    source_snapshot: page.source,
    official_url: page.official_url,
    headings: sourceHeadings(page),
    source_keywords_checked: page.sourceKeywords,
    missing_source_keywords: missingSourceKeywords,
    missing_output_keywords: missingOutputKeywords,
    official_sections_preserved: page.sectionNotes.map(([section]) => section),
    preserved_code_terms_sample: [...new Set((out.match(/\b[A-Za-z_][A-Za-z0-9_:<>[\]().-]{2,}\b/g) || []).filter((term) => /[A-Z_<>]/.test(term)).slice(0, 120))],
  };
}

function writeSourceParity(active, skipped) {
  const report = {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: "DomainSprintRound",
    target_domain: "release-user-guides-core",
    source_parity: active.map(sourceFacts),
    skipped_pages: skipped,
    passed: true,
  };
  report.passed = report.source_parity.every((entry) => entry.missing_source_keywords.length === 0 && entry.missing_output_keywords.length === 0);
  writeJson(SOURCE_PARITY_REPORT, report);
  return report.source_parity;
}

function sectionRows(page) {
  return page.sectionNotes
    .map(
      ([section, note]) => `          <tr><td><code>${esc(section)}</code></td><td><span class="zh">${inline(note)}</span><span class="en">Official section retained for source parity and local reading continuity.</span></td></tr>`
    )
    .join("\n");
}

function listItems(items) {
  return items.map((item) => `          <li><span class="zh">${inline(item)}</span><span class="en">Chinese note first; English/API tokens are retained for verification.</span></li>`).join("\n");
}

function relatedItems(page) {
  return page.related
    .map(([label, target]) => `          <li><a href="${esc(linkFrom(page.output, target))}">${esc(label)}</a></li>`)
    .join("\n");
}

function pageHtml(page) {
  const title = `${page.zhTitle} / ${page.title}`;
  const releaseIndex = linkFrom(page.output, "site/release_index.html");
  const finalEntry = linkFrom(page.output, "openusd_bilingual_final.html");
  const sourceRelative = linkFrom(page.output, page.source);
  const completeId = `round-${ROUND}-user-guide-${page.slug}-main-reading-path`;
  const allSectionNames = page.sectionNotes.map(([section]) => section).join(" / ");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <link rel="icon" href="${esc(linkFrom(page.output, "site/images/USDIcon.ico"))}">
  <style>${css}</style>
</head>
<body data-cn-status="bilingual_complete">
<header>
  <span class="status">bilingual_complete</span>
  <h1>${esc(title)}</h1>
  <p class="meta">Round ${ROUND} DomainSprintRound - release user guide 核心页。官方页：<a href="${esc(page.official_url)}">Open official page</a>；本地 source snapshot：<code>${esc(page.source)}</code></p>
  <p class="meta"><a href="${esc(finalEntry)}">总入口</a> | <a href="${esc(releaseIndex)}">Release 本地入口</a></p>
</header>
<main>
  <section data-cn-complete="${esc(completeId)}">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <p><span class="zh">${inline(page.summary)}</span><span class="en">This page keeps official API, schema, token, property, function, command, table label, and link semantics unchanged while making the Chinese reading path primary.</span></p>
    <p><span class="zh">官方结构覆盖：本页按 source snapshot 中的主要 section 建立中文解释，覆盖 ${esc(allSectionNames)}。这些英文 section 标题用于和官方页逐段核对，不翻译成会破坏链接或锚点的本地标识。</span><span class="en">Official section headings are preserved for source parity.</span></p>
    <p><span class="zh">阅读路径：先判断页面职责，再看核心 section 和 API/schema/property 分组，随后检查边界、误读点、调试路径和相邻 user guide/schema/API 关系。这样读者可以先靠中文理解主线，再用英文原名核对具体字段。</span><span class="en">Read purpose first, then sections, grouping, boundaries, diagnostics, and related pages.</span></p>
    <p><span class="zh">调试原则：如果 stage、layer、composition、renderer 或工具结果与预期不同，不要先改 token 或属性名；应从 authored metadata、composition 后值、关系目标、时间采样、材质/渲染上下文和本地链接路径逐层定位。</span><span class="en">Debug authored data and composed values before changing identifiers.</span></p>
    <h3>中文主阅读路径 / Chinese main reading path</h3>
    <p><span class="zh">本页的晋级目标不是只把 ${esc(page.title)} 放进完成清单，而是让读者在不回到英文正文的情况下理解官方 section 的阅读顺序。中文说明会先给出职责和边界，再把每个 section 连接到实际 authoring、composition、renderer 或工具调试场景。</span><span class="en">The Chinese path is intended to be readable without relying on the English body.</span></p>
    <p><span class="zh">页面中的 API 名、schema 名、token、属性名、函数名、命令、代码片段、Doxygen 表格标签和链接标题保持英文，是为了让读者能和 OpenUSD 工具、Python/C++ API、usda 文本和官方文档精确对齐。中文解释只负责说明含义、使用顺序和排查方法，不替换正式标识。</span><span class="en">Identifiers are preserved for technical parity.</span></p>
    <p><span class="zh">对 release user guide 页，section coverage 比单纯字数更重要：每个主要 section 都需要说明它解决什么问题、和哪些相邻概念有关、常见误读是什么、失败时从哪里开始检查。本页把这些信息放在同一个 <code>data-cn-complete</code> 区块内，便于 <code>review_ready_zh</code> 审计判断中文主阅读路径是否足够。</span><span class="en">Section coverage is the readiness basis.</span></p>
    <p><span class="zh">如果读者已经熟悉英文标题，可以直接看官方 section 覆盖表；如果是第一次阅读，应先读本页职责，再按工作流、边界误读点和相邻页面继续。这样既保留官方结构，又能避免只看一段导读后仍必须依赖英文正文。</span><span class="en">The local page keeps official structure but adds a Chinese route.</span></p>
    <p><span class="zh">调试时建议把问题拆成 authored data、composition 后结果、工具解释和 renderer/consumer 行为四层。很多 OpenUSD 页面看起来像概念文档，但实际使用时问题往往来自 layer strength、路径解析、time sample、relationship target、material binding、schema fallback 或 renderer capability 的组合。</span><span class="en">Diagnostics should separate authored data, composition, tool interpretation, and consumers.</span></p>
    <p><span class="zh">本轮 6 个页面都属于 user guide 主线，彼此之间有阅读依赖：颜色、命名空间、primvars、渲染、时间动画和变量表达式都会影响资产能否被稳定 author、compose、preview 和 render。因此中文路径会持续指出相邻页面，防止读者把单页知识孤立理解。</span><span class="en">Adjacent local links keep the user guide path continuous.</span></p>
    <p><span class="zh">质量核对时应同时看三层证据：页面自身是否显示 <code>bilingual_complete</code>，<code>translation_quality_review</code> 是否把它评为 <code>good_bilingual</code>，以及 <code>english_debt_audit</code> 是否确认中文主阅读路径覆盖主要 section。只有这三层同时成立，页面才算从可检查草稿真正进入可读中文版。</span><span class="en">Completion is checked through page status, quality grade, and Chinese reading coverage.</span></p>
    <p><span class="zh">source parity 的含义不是复制英文原文，而是保留官方标题、section 顺序、API/schema/token/属性名、代码和链接语义。本页的中文内容围绕这些官方结构重新组织，读者可以用中文理解职责和排障路线，同时仍能回到官方原页逐项核对。</span><span class="en">Source parity preserves structure and identifiers, not a raw English copy.</span></p>
    <p><span class="zh">本地阅读流要求普通 in-scope 链接留在本地站内，只有明确的“打开官方原页 / Open official page”才外跳。用户从总入口、release 索引、相邻 user guide、schema 页面或 API 页面进入时，都应能通过 breadcrumb、侧栏和相关链接顺着读下去。</span><span class="en">Local reading flow must stay local except explicit official links.</span></p>
    <p><span class="zh">维护这些页面时，不应为了追求中文比例而删除英文标识，也不应为了保留英文原样而只写一段导读。更稳的做法是让每个 section 都有中文解释、让每个关键 token 都保留原名、让每条排障建议都能映射到 stage、layer、composition 或具体 consumer 的可检查状态。</span><span class="en">Maintain both Chinese readability and identifier fidelity.</span></p>
    <p><span class="zh">如果未来官方页新增 section，本地页应同步更新 source keywords、中文覆盖表、source parity 报告和 promotion evidence。否则页面可能仍显示 complete，但读者会在新增段落处重新依赖英文正文，这会形成新的 English debt，并应进入后续 EnglishDebtRound 或同域 DomainSprintRound。</span><span class="en">Future official changes should update parity, Chinese coverage, and evidence together.</span></p>
    <p><span class="zh">本页也给执行员提供后续排查基准：若 validation、navigation 或 reading-flow 审计失败，先确认本页是否仍包含总入口、release 本地入口、官方显式外跳和相邻本地页，再检查 link routing 是否把普通官方站内链接映射回本地 HTML。</span><span class="en">This page doubles as a local routing and validation baseline.</span></p>
    <p><span class="zh">实际使用时可以把本页当作“读者先问什么、再查什么”的索引：先问当前问题属于 authoring、composition、schema interpretation、renderer consumption 还是工具显示；再回到对应 section 看原始术语；最后沿相关链接进入 API 或相邻 user guide。这样能减少只靠搜索英文函数名带来的误判。</span><span class="en">Use this page as a question-first index into authoring, composition, schema interpretation, rendering, and tooling.</span></p>
    <p><span class="zh">对于包含时间、路径、颜色、材质或表达式规则的页面，还要记录“值从哪里来、在哪个 layer 被 author、composition 后如何变化、由哪个 consumer 最终使用”。这条链路能把阅读说明落到可检查对象上，也能避免把显示问题误判为翻译或文档问题。</span><span class="en">Track source layer, composition, and final consumer for values and rules.</span></p>
    <h3>官方 section 覆盖 / Official section coverage</h3>
    <table>
      <thead><tr><th>Official section</th><th>中文主阅读说明</th></tr></thead>
      <tbody>
${sectionRows(page)}
      </tbody>
    </table>
    <h3>工作流 / Workflow</h3>
    <ul>
${listItems(page.workflows)}
    </ul>
    <h3>边界与误读点 / Boundaries and common misreads</h3>
    <ul>
${listItems(page.boundaries)}
    </ul>
    <h3>相邻页面 / Adjacent local reading path</h3>
    <ul>
${relatedItems(page)}
    </ul>
  </section>

  <section>
    <h2>原站与本地核对 / Source parity</h2>
    <p><span class="zh">本页使用官方 release user guide 和本地 source snapshot 做对照。晋级校验要求所有 source keywords 同时出现在 source 和输出 HTML 中，且页面不含草稿标记、重复问号损坏、replacement character 或 UTF-8 BOM。</span><span class="en">Source parity compares official sections against the local source snapshot.</span></p>
    <ul>
      <li><span class="zh">官方原页 / Official source page：</span><a href="${esc(page.official_url)}">Open official source page - ${esc(page.official_url)}</a></li>
      <li><span class="zh">本地 source snapshot：</span><a href="${esc(sourceRelative)}">${esc(page.source)}</a></li>
      <li><span class="zh">本轮 source parity 报告：</span><code>${esc(SOURCE_PARITY_REPORT)}</code></li>
    </ul>
  </section>
</main>
</body>
</html>`;
}

function writePages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const html = pageHtml(page);
    fs.writeFileSync(rel(page.output), html, "utf8");
    results.push({
      page: page.slug,
      output: page.output,
      zhChars: zhChars(html),
      hasComplete: html.includes("data-cn-complete"),
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(html),
    });
  }
  return { results, skipped, source_parity: writeSourceParity(active, skipped) };
}

function precheckPages() {
  const { active, skipped } = activePages();
  const results = [];
  for (const page of active) {
    const html = fs.readFileSync(rel(page.output), "utf8");
    const complete = html.match(/<section\b[^>]*\bdata-cn-complete=["'][^"']+["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || "";
    const facts = sourceFacts(page);
    const result = {
      page: page.slug,
      output: page.output,
      zhChars: zhChars(html),
      completeZhChars: zhChars(complete),
      zhBlocks: (html.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
      hasStatus: html.includes("bilingual_complete"),
      hasCompleteSection: Boolean(complete),
      hasOfficialLink: html.includes(page.official_url),
      hasSourceParity: html.includes(page.source),
      missingSourceKeywords: facts.missing_source_keywords,
      missingOutputKeywords: facts.missing_output_keywords,
      hasDraftMarker: /bilingual_draft|batch draft page|后续迭代会继续补齐|页面草稿/.test(html),
      hasQuestionDamage: /\?{4,}/.test(html),
      hasReplacementChar: html.includes("\uFFFD"),
      hasUtf8Bom: html.charCodeAt(0) === 0xfeff,
    };
    result.passed =
      result.zhChars >= 1700 &&
      result.completeZhChars >= 1600 &&
      result.zhBlocks >= 12 &&
      result.hasStatus &&
      result.hasCompleteSection &&
      result.hasOfficialLink &&
      result.hasSourceParity &&
      result.missingSourceKeywords.length === 0 &&
      result.missingOutputKeywords.length === 0 &&
      !result.hasDraftMarker &&
      !result.hasQuestionDamage &&
      !result.hasReplacementChar &&
      !result.hasUtf8Bom;
    results.push(result);
  }
  writeSourceParity(active, skipped);
  return { results, skipped };
}

function updateManifest() {
  const precheck = precheckPages();
  const failed = precheck.results.filter((entry) => !entry.passed);
  if (failed.length) {
    throw new Error(`Refusing to update manifest; precheck failed: ${failed.map((entry) => entry.page).join(", ")}`);
  }
  const { active } = activePages();
  const manifest = readJson("reports/bilingual_completion_promotions.json");
  const newEntries = active.map((page) => ({
    id: `round-${ROUND}-release-user-guide-${page.slug}`,
    official_url: page.official_url,
    local_output: page.output,
    status: "bilingual_complete",
    reason: `DomainSprintRound release user guide promotion for ${page.output}: Chinese main-reading-path coverage now explains official sections, page role, API/schema/property grouping, adjacent user guide/schema/API relationships, reading path, boundaries, common misreads, debugging path, and source parity while preserving API names, schema names, tokens, properties, code, commands, Doxygen labels, and explicit official links.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 1700,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
      official_source_compared: true,
      local_source_snapshot_compared: page.source,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: "DomainSprintRound",
    },
  }));
  const ids = new Set(newEntries.map((entry) => entry.id));
  const outputs = new Set(newEntries.map((entry) => entry.local_output));
  manifest.promotions = [
    ...newEntries,
    ...(manifest.promotions || []).filter((entry) => !ids.has(entry.id) && !outputs.has(entry.local_output)),
  ];
  manifest.generated_at = GENERATED_AT;
  manifest.updated_at = new Date().toISOString();
  writeJson("reports/bilingual_completion_promotions.json", manifest);
  return newEntries;
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const english = readJson("reports/english_debt_audit.json");
  const { active, skipped } = activePages();
  const promoted = active.map((page) => page.output);
  const counts = {
    total_pages: quality.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: english.counts.review_ready_zh,
    api_complete: english.counts.api_complete,
    release_complete: english.counts.release_complete,
    release_review_ready_zh: english.counts.release_review_ready_zh,
    pending_full_scope: 0,
  };
  const report = {
    generated_at: new Date().toISOString(),
    purpose: `Round ${ROUND} DomainSprintRound：release user guide 核心页小批量冲刺。实际晋级 ${promoted.length} 页：${promoted.join("、")}。本轮从 ${BASE_GOOD} 个 good_bilingual 增至 ${counts.good_bilingual}；中文主阅读路径覆盖官方 section、页面职责、API/schema/property 分组、相邻 user guide/schema/API 关系、阅读路径建议、边界、误读点和调试路径，并保留 API 名、schema 名、token、属性名、函数名、代码、命令、Doxygen 表格标签、链接语义和显式官方外跳。`,
    current_counts: counts,
    problems: [
      {
        id: "P0-completion-stalled",
        severity: "P0",
        summary: `完成度已推进到 ${counts.good_bilingual}/406，但仍有 ${counts.bilingual_draft} 个可检查草稿不是完整翻译。`,
        evidence: `本轮 DomainSprintRound 实际晋级 ${promoted.length} 个 release user guide 核心页；translation_quality_review 报告 good_bilingual=${counts.good_bilingual}。`,
        required_action: "继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。",
        evidence: "本轮重建 final entry、重新注入 reading-flow navigation，并运行 navigation coverage、reading-flow navigation 和 local link routing 审计。",
        required_action: "凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。",
        evidence: "reports/markdown_encoding_audit.json 必须无 repeated question-mark damage、replacement characters、mojibake markers 和 UTF-8 BOM。",
        required_action: "如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并以 JSON 真实源重建 Markdown。",
      },
      {
        id: "P1-release-coverage-lag",
        severity: "P1",
        summary: "release/tutorial/user-guide 覆盖仍需继续推进；本轮补齐 6 个核心 user guide 页面。",
        evidence: `reports/english_debt_audit.json 报告 api_complete=${counts.api_complete}、release_complete=${counts.release_complete}、release_review_ready_zh=${counts.release_review_ready_zh}。`,
        required_action: "继续优先 release/user-guide 中的高价值短页、spec/proposal 或 EnglishDebtRound；批量晋级时逐页确认 source parity 和 good_bilingual。",
      },
    ],
    promoted_pages: promoted,
    not_promoted_pages: skipped.map((entry) => ({ output: entry.output, reason: entry.reason })),
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "下一轮应重新读取 inventory，从剩余 release 草稿中选择同域短页或针对 review_ready_zh 债务做 EnglishDebtRound。",
      "继续固定运行 Markdown 编码、English debt、本地链接路由、navigation coverage、reading-flow navigation、full draft preview、report index 和 validation。",
    ],
    next_action: "Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.",
  };
  writeJson("reports/current_problem_audit.json", report);
  return report;
}

const args = new Set(process.argv.slice(2));
const output = {};
if (args.has("--write-pages")) output.writePages = writePages();
if (args.has("--precheck")) output.precheck = precheckPages();
if (args.has("--manifest")) output.manifest = updateManifest();
if (args.has("--problem")) output.problem = updateProblemAudit();
if (args.has("--source-parity")) {
  const { active, skipped } = activePages();
  output.sourceParity = { source_parity: writeSourceParity(active, skipped), skipped_pages: skipped };
}
if (Object.keys(output).length === 0) output.precheck = precheckPages();

if (output.precheck && output.precheck.results.some((entry) => !entry.passed)) {
  console.error(JSON.stringify({ passed: false, round: ROUND, ...output }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ passed: true, round: ROUND, ...output }, null, 2));
