import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-160";

const refinements = [
  {
    output: "full_site/api/usd_vol_page_front.html",
    title: "UsdVol: USD Volume Schema",
    summary:
      "`usd_vol_page_front.html` 是 `UsdVol` 体积数据 schema 入口，覆盖 `UsdVolVolume`、`UsdVolFieldBase`、`UsdVolField3DAsset`、`UsdVolOpenVDBAsset`、`UsdVolVolumeFieldBase` 以及 particle field 相关 API。阅读时应把它理解为 volume/field 的 authored schema 导航，而不是某个 renderer 的 volume sampling 实现说明。",
    notes: [
      "`UsdVolVolume` 表示承载体积字段关系的 prim，核心是把 volume 容器与 field prim 通过 relationship 组织起来，而不是直接在 volume prim 上保存所有 voxel 数据。",
      "`UsdVolFieldBase`、`UsdVolField3DAsset`、`UsdVolOpenVDBAsset` 和 `UsdVolVolumeFieldBase` 分别用于抽象 field、Field3D 资产、OpenVDB 资产和体积字段基类；具体数据格式仍由外部 asset 和下游 reader 解释。",
      "Particle field API 如 `UsdVolParticleField3DGaussianSplat`、`UsdVolParticleFieldKernelBaseAPI`、`UsdVolParticleFieldPositionBaseAPI` 更偏向粒子场描述，不能和 regular grid volume 直接混读。",
      "体积 schema 常与 `UsdGeomBoundable`、`UsdShadeMaterialBindingAPI`、`UsdRender` 和 renderer delegate 相邻出现；本页只定义 USD 层的对象模型和属性/relationship 语义。",
      "调试 volume 资产时，先确认 field prim 类型、asset path、field name、transform 和 binding 关系，再进入具体 OpenVDB/Field3D reader 或 renderer 文档排查采样问题。",
    ],
    terms: [
      ["体积 schema", "volume schema"],
      ["体积 prim", "volume prim"],
      ["字段 prim", "field prim"],
      ["外部体积资产", "external volume asset"],
      ["粒子场", "particle field"],
      ["体积采样边界", "volume sampling boundary"],
    ],
  },
  {
    output: "full_site/api/usd_render_page_front.html",
    title: "UsdRender: USD Render Schema",
    summary:
      "`usd_render_page_front.html` 是 `UsdRender` 渲染配置 schema 入口，围绕 `UsdRenderSettings`、`UsdRenderProduct`、`UsdRenderVar`、`UsdRenderPass` 和 render collection 组织 scene-level render description。它描述可交换的渲染意图，不等同于某个 renderer 的命令行参数全集。",
    notes: [
      "`UsdRenderSettings` 表达一次渲染配置的顶层入口，通常会引用 camera、products、rendering purpose、resolution 和 renderer settings 等信息。",
      "`UsdRenderProduct` 描述输出 artifact，例如图像文件、分辨率、产品类型和关联 `UsdRenderVar`；它不是实际写文件的 I/O 实现。",
      "`UsdRenderVar` 描述 AOV/render variable，包括 source name、source type、data type 和过滤规则；是否可被具体 renderer 支持仍取决于 render delegate 或渲染器插件。",
      "`UsdRenderPass` 和 render collection 用来表达分层渲染、可见集合或 pass 级配置，应结合 collection、camera 和 product 关系阅读。",
      "本页适合作为 `wp_render_settings.html`、usdRender schema reference 和 renderer adapter 文档之间的导航页：先读 USD 对象模型，再查具体 renderer 如何消费这些 schema。",
    ],
    terms: [
      ["渲染设置", "render settings"],
      ["渲染产品", "render product"],
      ["渲染变量", "render variable"],
      ["AOV 输出", "AOV output"],
      ["渲染通道", "render pass"],
      ["渲染集合", "render collection"],
    ],
  },
  {
    output: "full_site/api/functions_q.html",
    title: "Class Members - Q",
    summary:
      "`functions_q.html` 是 Class Members 综合索引的 Q 字母段，混合列出函数、变量、枚举值或其他 member 名称。它适合做快速定位，不适合作为 API 语义终点；同名或近名前缀在 `UsdVol`、`UsdRender`、`UsdGeom`、`Tf` 等模块中可能代表完全不同的职责。",
    notes: [
      "Q 段条目数量通常较少，更容易误把索引页当成完整说明；实际行为仍需要进入对应 class 页面查看 signature、return type、constness、overload 和所属 namespace。",
      "如果条目来自 token table，例如 `UsdVolTokensType` 或其他 `*TokensType`，应保留 token 字面量原样，并回到 schema 页面理解 token 用于属性名、relationship 名还是 enum 值。",
      "如果条目来自 query、queue、qualified name 等函数前缀，先按所属模块判断语境，再看是否涉及 composition query、render query、diagnostic query 或容器访问。",
      "本页和 `functions_func_q.html`、`functions_vars_q.html` 的区别在于当前页是综合成员索引；函数专页和变量专页会按 member kind 拆分。",
      "在中文复刻中，本页的价值是补充导航方法和误读边界，不逐条改写 API 名称；所有 member 名称、类名和链接保持原样。",
    ],
    terms: [
      ["综合成员索引", "all members index"],
      ["Q 字母段", "Q-section"],
      ["所属类语境", "owning class context"],
      ["成员种类", "member kind"],
      ["token 表", "token table"],
      ["重载签名", "overload signature"],
    ],
  },
  {
    output: "full_site/api/functions_vars_v.html",
    title: "Class Members - Variables - V",
    summary:
      "`functions_vars_v.html` 是 Class Members - Variables 的 V 字母段，主要用于定位以 V 开头的 class member variables、token constants 或 generated token table 条目。它不是函数索引，也不应把变量名翻译成中文；变量名和 token literal 必须保持原样。",
    notes: [
      "V 段变量常见来源包括 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`UsdVolTokensType`、`UsdRenderTokensType` 等 generated schema token table。",
      "阅读 token variable 时要区分 C++ 成员名、token 字面量、USD 属性名和 schema fallback value；它们可能相近但不总是同一层概念。",
      "如果变量来自 Hydra、Vdf、Tf 或 Sdf 类，应先跳转到 owning class 判断它是配置字段、缓存字段、debug flag、token 常量还是测试辅助变量。",
      "本页和 `functions_func_v.html` 互补：函数页关注可调用 member，变量页关注可引用的 member variable 或 token constant。",
      "中文补强只说明检索路径和语义边界，避免给 sparse index 添加不存在的变量解释；具体默认值和生命周期仍以目标 class 页面为准。",
    ],
    terms: [
      ["变量索引", "variables index"],
      ["V 字母段", "V-section"],
      ["token 常量", "token constant"],
      ["生成式 token 表", "generated token table"],
      ["所属类", "owning class"],
      ["默认值边界", "fallback value boundary"],
    ],
  },
  {
    output: "full_site/api/usd_shaders_page_front.html",
    title: "UsdShaders: Definitions and Implementations of Usd* Shader Nodes",
    summary:
      "`usd_shaders_page_front.html` 是 `UsdShaders` 模块入口，聚焦 USD 内建 shader node 的定义和实现，例如 preview surface、PBR 输入、纹理节点和 shader definition metadata。它与 `UsdShade` 的 authored material network 关系紧密，但职责更偏 shader definitions，而不是任意材质绑定规则。",
    notes: [
      "`UsdShade` 描述 material、shader、node graph、input/output 和 connection；`UsdShaders` 更关注一组 USD 约定 shader node 的 definition、参数和实现边界。",
      "如果阅读目标是 `UsdPreviewSurface` 或纹理节点，应确认 input 名称、类型、默认值、色彩空间和 renderer 支持范围，而不是只看节点名。",
      "`UsdShaders` 常和 `SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty`、shader discovery/parser plugin 共同出现；Sdr 负责发现和描述 shader definition。",
      "本页不保证每个 renderer 都以同样方式实现所有 shader node。可交换 schema 和 renderer-specific implementation 需要分开验证。",
      "调试材质显示时，先检查 authored `UsdShade` network，再检查 `UsdShaders` definition、Sdr metadata、texture asset path 和目标 renderer 的支持矩阵。",
    ],
    terms: [
      ["着色器定义", "shader definition"],
      ["内建 shader node", "built-in shader node"],
      ["预览表面", "preview surface"],
      ["节点参数", "node parameter"],
      ["shader discovery", "shader discovery"],
      ["渲染器支持矩阵", "renderer support matrix"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次索引补强 / Chinese Second-Pass Index Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
