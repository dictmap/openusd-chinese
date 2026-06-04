import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-034";

const refinements = [
  {
    output: "full_site/api/class_ef___lofted_output_set.html",
    title: "Ef_LoftedOutputSet Class",
    notes: [
      "`Ef_LoftedOutputSet` 是 Ef 执行系统内部的辅助类，用于代表 `EfPageCacheBasedExecutor` 跟踪 lofted outputs。",
      "页面英文摘录说明 lofted outputs 是求值期间从 page cache 取得值的 outputs；因此阅读本类时应把它放在 page cache based execution、output provenance 和重新求值缓存语境里。",
      "关联类型包括 `VdfNetwork`、`VdfOutput`、`VdfMask`、`VdfId`、`VdfNode`，说明该类需要在 Vdf 网络、输出遮罩和节点标识之间建立集合关系。",
      "本页不是用户层 USD authoring API，更偏执行器实现细节；中文导读保留 `lofted output`、`page cache`、`EfPageCacheBasedExecutor` 等英文术语，避免误译成场景层级概念。",
      "后续完整翻译应继续补齐 member list 中的构造、插入、查询、mask/node 相关方法；本轮只补类职责、模块边界和阅读路径。"
    ],
    terms: [
      ["lofted output", "lofted output"],
      ["page cache", "page cache"],
      ["executor", "执行器"],
      ["Vdf network", "Vdf 网络"],
      ["output mask", "输出遮罩"]
    ]
  },
  {
    output: "full_site/api/class_esf_property_interface.html",
    title: "EsfPropertyInterface Class Reference",
    notes: [
      "`EsfPropertyInterface` 是 scene adapter implementation 使用的 property abstraction，并且是 abstract class；它的接口接近 `UsdProperty` 的只读接口。",
      "英文摘录指出该类的 public methods 会被 exec network compiler 调用，因此它是 Esf 场景适配层与执行网络编译器之间的只读属性接口。",
      "每个方法都会接收 `EsfJournal*` 参数，用于记录触发重新编译的条件；阅读时应把 `EsfJournal` 看作 dependency tracking / recompilation condition 记录器。",
      "关联类型包括 `TfToken`、`SdfPath`、`EsfPrim`、`EsfStage`、`EsfAttribute`、`EsfRelationship`、`VtValue`、`TfType` 和 `UsdProperty`，说明该接口跨 schema、路径、值和类型系统。",
      "本页中文层按 property abstraction、read-only UsdProperty-like API、exec compiler 调用和 journaling 四条线整理；类名、方法名和指针类型保持英文原样。"
    ],
    terms: [
      ["property abstraction", "属性抽象"],
      ["scene adapter", "场景适配器"],
      ["read-only interface", "只读接口"],
      ["exec network compiler", "执行网络编译器"],
      ["recompilation condition", "重新编译条件"]
    ]
  },
  {
    output: "full_site/api/class_gf_dual_quatf.html",
    title: "GfDualQuatf Class Reference",
    notes: [
      "`GfDualQuatf` 是 Gf Linear Algebra 中的 float 精度 dual quaternion 类型，包含 real part quaternion 和 dual part quaternion。",
      "dual quaternion 用于表示 rotation 与 translation 的组合，常见于刚体变换、蒙皮或插值语境；本页引用的论文链接用于进一步理解 dual quaternion 数学背景。",
      "关联类型包括 `GfQuatf`、`GfVec3f`、`GfDualQuatd`、`GfDualQuath` 和 `GF_MIN_VECTOR_LENGTH`，说明本类与 float/double/half 精度变体及向量长度容差相关。",
      "阅读本类时应区分 quaternion 的 real part 与 dual part，并保留 dual、real、rotation、translation、normalize 等数学术语原样或中英对照。",
      "本轮不展开每个构造函数和运算符签名，只补类定位、数学用途、相关类型和术语；后续完整翻译应覆盖构造、归一化、变换提取和运算符。"
    ],
    terms: [
      ["dual quaternion", "对偶四元数"],
      ["real part", "实部"],
      ["dual part", "对偶部"],
      ["rotation and translation", "旋转和平移"],
      ["linear algebra", "线性代数"]
    ]
  },
  {
    output: "full_site/api/class_gf_matrix2f.html",
    title: "GfMatrix2f Class Reference",
    notes: [
      "`GfMatrix2f` 是 Gf Linear Algebra 中的 2x2 float matrix 基础类型，用于存储 2x2 浮点矩阵。",
      "英文摘录明确矩阵按 row-major order 定义，因此 `matrix[i][j]` 表示第 i 行第 j 列的元素；这个索引约定必须在中文中清楚保留。",
      "关联类型包括 `GfVec2f` 和 `GfMatrix2d`，说明它与二维向量和 double 精度 2x2 矩阵有对应关系。",
      "阅读本类时应重点关注构造、identity/zero、transpose、inverse、determinant、row/column 访问、乘法和比较等矩阵基础操作；具体方法名以后续 member list 为准。",
      "本页不是几何场景对象，而是低层数学值类型；中文导读保留 `GfMatrix2f`、`GfVec2f`、row-major、matrix[i][j] 等 API 和数学符号。"
    ],
    terms: [
      ["2x2 matrix", "2x2 矩阵"],
      ["float elements", "float 元素"],
      ["row-major order", "行主序"],
      ["matrix index", "矩阵索引"],
      ["linear algebra", "线性代数"]
    ]
  },
  {
    output: "full_site/api/class_gf_matrix4f.html",
    title: "GfMatrix4f Class Reference",
    notes: [
      "`GfMatrix4f` 是 Gf Linear Algebra 中的 4x4 float matrix 基础类型，也是 3D transformation 相关方法的核心入口之一。",
      "英文摘录说明矩阵按 row-major order 定义，`matrix[i][j]` 表示第 i 行第 j 列；同时约定向量主要按 row vectors 处理，这会影响变换矩阵乘法方向。",
      "3D 变换相关方法包括 `SetRotate()`、`SetScale()`、`SetTranslate()`、`SetLookAt()`、`Factor()`、`ExtractTranslation()`、`ExtractRotation()`、`Transform()`、`TransformDir()`，这些方法名必须保留原样。",
      "关联类型包括 `GfVec4f`、`GfRotation`、`GfVec3f`、`GfMatrix3f`、`GfMatrix4d`、`GfQuatf`、`GfVec3d`，说明它连接向量、旋转、四元数和不同精度矩阵。",
      "本页中文层按矩阵存储约定、3D transform 方法、row vector 约定和关联类型四组说明；后续完整翻译应补构造、乘法、逆矩阵、分解和 transform 方法细节。"
    ],
    terms: [
      ["4x4 matrix", "4x4 矩阵"],
      ["row-major order", "行主序"],
      ["row vectors", "行向量"],
      ["3D transformation", "3D 变换"],
      ["matrix factorization", "矩阵分解"]
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
