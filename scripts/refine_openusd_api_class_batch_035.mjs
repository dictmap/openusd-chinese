import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-035";

const refinements = [
  {
    output: "full_site/api/class_gf_range1d.html",
    title: "GfRange1d Class Reference",
    notes: [
      "`GfRange1d` 是 Gf Basic Geometry 中的一维 double 精度 floating point range，也可理解为 interval。",
      "英文摘录说明该类所有操作都是 component-wise，并符合 interval mathematics；空范围的条件是 `max < min`。",
      "默认 empty range 为 `[FLT_MAX,-FLT_MAX]`，这个约定便于从默认构造开始逐步通过 union / extend 类操作形成有效区间。",
      "关联类型包括 `GfRange1f`，说明存在 float 精度对应类型；阅读时应保留 `min`、`max`、empty range、interval 等术语。",
      "本页应重点核对构造、取 min/max、包含测试、并集/交集、扩展范围和 deprecated 成员；本轮只补类职责、数学语义和阅读边界。"
    ],
    terms: [
      ["1-dimensional range", "一维范围"],
      ["interval mathematics", "区间数学"],
      ["empty range", "空范围"],
      ["component-wise", "分量级"],
      ["min / max", "最小值 / 最大值"]
    ]
  },
  {
    output: "full_site/api/class_gf_ray.html",
    title: "GfRay Class Reference",
    notes: [
      "`GfRay` 是 Gf Basic Geometry 中用于 intersection testing 的三维射线类型，由 origin 和 direction 组成。",
      "英文摘录特别说明默认情况下 `GfRay` 不会把 direction vector 归一化为 unit length；如果算法假定单位方向，调用方需要自己确认或归一化。",
      "射线相交计算包含 start point，也就是 distance 为 0 时也被定义为 intersecting；这会影响拾取、裁剪和最近交点判断。",
      "关联类型包括 `GfVec3d`、`GfMatrix4d`、`GfPlane`、`GfRange3d`、`GfBBox3d`、`GfLine` 和 `GfLineSeg`，说明它常与平面、包围盒、线和线段相交查询配合使用。",
      "本轮中文层按 origin/direction、非归一化约定、intersection distance 和相关几何类型分组；方法名和数学符号保留原样。"
    ],
    terms: [
      ["ray", "射线"],
      ["origin", "原点"],
      ["direction vector", "方向向量"],
      ["unit length", "单位长度"],
      ["intersection testing", "相交测试"]
    ]
  },
  {
    output: "full_site/api/class_gf_vec2i.html",
    title: "GfVec2i Class Reference",
    notes: [
      "`GfVec2i` 是 Gf Linear Algebra 中的二维 int vector 基础类型，用于存储 2 个 `int` 分量。",
      "英文摘录说明该类设计目标是 fast and simple；因此它是轻量数学值类型，不是场景 prim 或属性容器。",
      "关联类型包括 `GfVec2d`、`GfVec2f`、`GfVec2h` 和 `GfDot()`，说明同一二维向量族有 double/float/half/int 等精度或类型变体，并支持点积等基础运算。",
      "阅读本页时应重点保留 component、index、dot product、arithmetic operator 等术语；具体构造函数、访问器和运算符以后续 member list 为准。",
      "本轮中文导读只补二维整型向量定位、数值类型边界和相关类型，不把所有成员函数误写成已完整翻译。"
    ],
    terms: [
      ["2 int components", "2 个 int 分量"],
      ["vector", "向量"],
      ["component", "分量"],
      ["dot product", "点积"],
      ["linear algebra", "线性代数"]
    ]
  },
  {
    output: "full_site/api/class_glf_draw_target.html",
    title: "GlfDrawTarget Class",
    notes: [
      "`GlfDrawTarget` 表示带有 multiple image attachments 的 GL render target，可理解为自定义 render pass 的输出目标。",
      "英文摘录说明 DrawTarget 可以输出多个 arbitrary variables，之后可被 GLSL shaders 作为 texture samplers 使用；这说明它连接离屏渲染、附件纹理和 shader 采样。",
      "该类维护 named attachments 到 `GL_TEXTURE_2D` images 的映射；默认还会创建 depth component，同时作为 draw pass 的 depth buffer，并可作为普通 `GL_TEXTURE_2D` 数据访问。",
      "关联类型包括 `AttachmentsContainer`、`AttachmentRefPtr`、`TfRefBase`、`GfMatrix4d`、`GfVec2i`、`TfWeakBase`，说明它同时涉及引用计数、矩阵状态、尺寸和 GL 资源管理。",
      "本页存在官方摘录里的拼写 `mutliple` / `mages`，中文层按原意解释为 multiple image attachments / images，但不修改英文原文；后续完整翻译应补 attachment 创建、绑定、读取和生命周期方法。"
    ],
    terms: [
      ["GL render target", "GL 渲染目标"],
      ["image attachment", "图像附件"],
      ["custom render pass", "自定义渲染 pass"],
      ["texture sampler", "纹理采样器"],
      ["depth buffer", "深度缓冲"]
    ]
  },
  {
    output: "full_site/api/class_hd_data_source_locator.html",
    title: "HdDataSourceLocator Class",
    notes: [
      "`HdDataSourceLocator` 表示一个可以识别 data source 位置的对象，是 Hydra 数据源定位语义的一部分。",
      "英文摘录说明 Data Source Locators 是 short lists of tokens；这些 tokens 组合起来表示某个给定 data source 的位置。",
      "关联类型主要是 `TfToken`，说明 locator 的路径片段不是普通字符串列表，而是 tokenized、可比较和可复用的标识序列。",
      "阅读本页时应重点关注 locator 构造、token path 组合、前缀/后缀匹配、比较、hash 和与 data source container 的协作方式；具体方法以后续 member list 为准。",
      "本页中文层保留 `HdDataSourceLocator`、`data source`、`TfToken` 等核心 API 术语，避免把 Hydra data source 与 USD layer/path 概念混同。"
    ],
    terms: [
      ["data source locator", "数据源定位器"],
      ["short list of tokens", "短 token 列表"],
      ["TfToken", "TfToken"],
      ["Hydra data source", "Hydra 数据源"],
      ["token path", "token 路径"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、相关类型、关键语义和术语对照；英文页面名、类名、方法名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, related types, key semantics, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
