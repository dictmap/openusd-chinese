import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-130";

const refinements = [
  {
    output: "full_site/api/class_gf_matrix4f.html",
    title: "GfMatrix4f",
    summary:
      "`GfMatrix4f` 是 float 精度 4x4 矩阵，常用于 3D transform、投影视图变换、点/方向变换和矩阵分解。阅读本页时最重要的是确认 row-major storage、row vector 约定和方法乘法顺序，避免和其他数学库的 column-major/column vector 约定混用。",
    notes: [
      "`matrix[i][j]` 表示第 i 行第 j 列；这个索引语义和内存排列、构造函数参数顺序、调试打印结果都有关，中文说明必须保留原英文索引表达。",
      "`SetRotate()`、`SetScale()`、`SetTranslate()`、`SetLookAt()` 分别设置旋转、缩放、平移和视图相关矩阵；调用时要确认是否覆盖已有矩阵，而不是默认做增量组合。",
      "`Transform()` 与 `TransformDir()` 的语义不同：前者用于点/齐次坐标变换，后者通常忽略平移分量处理方向向量；渲染和相机代码中这一区别很常见。",
      "`Factor()`、`ExtractTranslation()`、`ExtractRotation()` 等方法用于从矩阵中分解或提取变换成分；含 shear、非均匀 scale 或奇异矩阵时应核对返回值和容差。",
      "`GfMatrix4f` 与 `GfMatrix4d`、`GfMatrix3f`、`GfQuatf`、`GfRotation`、`GfVec3f` / `GfVec4f` 频繁互操作；精度转换和旋转表达转换都应显式确认。",
    ],
    terms: [
      ["GfMatrix4f", "Gf 4x4 float 矩阵"],
      ["row-major storage", "行主序存储"],
      ["row vector convention", "行向量约定"],
      ["homogeneous coordinate", "齐次坐标"],
      ["matrix factorization", "矩阵分解"],
      ["singular matrix", "奇异矩阵"],
    ],
  },
  {
    output: "full_site/api/class_gf_matrix2f.html",
    title: "GfMatrix2f",
    summary:
      "`GfMatrix2f` 是 float 精度 2x2 矩阵，适合表达二维线性变换、局部坐标变化和小型矩阵计算。它同样遵循 row-major order，因此和 `GfMatrix4f` 一样要注意索引、乘法和构造参数顺序。",
    notes: [
      "`ScalarType` 表明元素类型为 float；如果需要 double 精度，应转向 `GfMatrix2d`，不要在中文说明中弱化精度差异。",
      "`GetDeterminant()`、`GetInverse()`、`GetTranspose()`、`SetIdentity()` 等基础操作决定矩阵是否可逆、是否保持坐标基和如何处理数值误差。",
      "二维矩阵通常不包含平移项；若要表达 2D affine transform，需要额外向量或更高维齐次矩阵，不能直接把 `GfMatrix2f` 当作完整 2D transform container。",
      "`GfVec2f` 相关运算应与 row vector 约定一起核对；向量在左乘还是右乘会影响组合顺序和结果方向。",
      "本页作为低层数学值类型，不拥有 USD scene 状态；它可以出现在几何、渲染、材质或工具代码中，但本身不表示 prim 或属性。",
    ],
    terms: [
      ["GfMatrix2f", "Gf 2x2 float 矩阵"],
      ["ScalarType", "标量类型"],
      ["determinant", "行列式"],
      ["inverse matrix", "逆矩阵"],
      ["transpose", "转置"],
      ["affine transform", "仿射变换"],
    ],
  },
  {
    output: "full_site/api/class_gf_dual_quatf.html",
    title: "GfDualQuatf",
    summary:
      "`GfDualQuatf` 是 float 精度 dual quaternion，用 real quaternion 和 dual quaternion 两部分表示旋转和平移的组合。它常用于刚体变换、骨架/蒙皮插值或保持旋转平移耦合的变换表示。",
    notes: [
      "`real part` 通常承载 rotation，`dual part` 编码 translation 相关信息；阅读构造函数和访问器时必须保持 real/dual 两部分的语义区分。",
      "`Normalize()` 或归一化语义对 dual quaternion 很关键；未归一化的 dual quaternion 可能不能表示有效 rigid transform。",
      "`GetTranslation()`、`GetReal()`、`GetDual()`、`Transform()` 等方法应和 `GfQuatf`、`GfVec3f`、`GfMatrix4f` 的转换关系一起理解。",
      "`GfDualQuatd` 与 `GfDualQuath` 是不同精度变体；跨精度转换时要考虑误差、插值稳定性和 `GF_MIN_VECTOR_LENGTH` 这样的容差常量。",
      "dual quaternion 数学不等同于普通 quaternion；中文层保留 `dual quaternion`、`real part`、`dual part`、`rigid transform` 等英文术语以便读者对照论文和代码。",
    ],
    terms: [
      ["dual quaternion", "对偶四元数"],
      ["real part", "实部"],
      ["dual part", "对偶部"],
      ["rigid transform", "刚体变换"],
      ["Normalize", "归一化"],
      ["precision variant", "精度变体"],
    ],
  },
  {
    output: "full_site/api/class_gf_range1d.html",
    title: "GfRange1d",
    summary:
      "`GfRange1d` 是 double 精度一维 interval/range，使用 `min` 和 `max` 表示区间。它遵循 interval mathematics；空范围的 `max < min` 约定、默认构造值和 extend/union/intersection 行为是阅读重点。",
    notes: [
      "默认 empty range 通常便于逐步 `ExtendBy()`；这不是有效几何范围，而是等待被数据扩展的初始状态。",
      "`GetMin()`、`GetMax()`、`IsEmpty()`、`Contains()`、`UnionWith()`、`IntersectWith()` 等方法应按区间数学理解，而不是按单点数值容器理解。",
      "`component-wise` 在一维中看似简单，但它和二维/三维 `GfRange2*`、`GfRange3*` 的行为一致；统一理解有助于阅读 bounding box 和 extent 代码。",
      "`GfRange1f` 是 float 精度对应类型；切换精度时应关注比较容差和序列化/计算误差。",
      "旧的 `ExtendBy` 等 deprecated 条目若出现，应结合 Deprecated List 和替代 API 判断迁移路径，不要在新代码中继续引入旧接口。",
    ],
    terms: [
      ["GfRange1d", "Gf 一维 double 范围"],
      ["interval mathematics", "区间数学"],
      ["empty range", "空范围"],
      ["ExtendBy", "扩展范围"],
      ["UnionWith", "并集"],
      ["IntersectWith", "交集"],
    ],
  },
  {
    output: "full_site/api/class_gf_ray.html",
    title: "GfRay",
    summary:
      "`GfRay` 是 Basic Geometry 中的三维射线类型，由 start point/origin 和 direction vector 组成，用于平面、包围盒、线、线段和距离查询等 intersection testing。默认不保证 direction 是 unit length，这是最容易误读的约定。",
    notes: [
      "`SetPointAndDirection()`、`GetStartPoint()`、`GetDirection()`、`GetPoint()` 是基础读写入口；调用者要自己确认 direction vector 是否需要归一化。",
      "`Intersect()` 的多个 overload 分别处理 `GfPlane`、`GfRange3d`、`GfBBox3d` 等对象；阅读时要保留 overload 编号和参数类型，避免混淆相交对象。",
      "英文说明中 distance 为 0 的 start point 也算 intersecting；这会影响拾取、裁剪和最近交点判断。",
      "`FindClosestPoint()` 更偏距离/最近点查询，不等同于所有几何对象上的相交判定；结果应结合参数范围和 direction length 理解。",
      "`GfRay` 常与 `GfMatrix4d` 组合进行世界/局部空间变换；变换射线时需分别处理 start point 和 direction，避免把平移错误地作用到 direction。",
    ],
    terms: [
      ["GfRay", "Gf 射线"],
      ["start point", "起点"],
      ["direction vector", "方向向量"],
      ["unit length", "单位长度"],
      ["intersection testing", "相交测试"],
      ["closest point", "最近点"],
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
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
  results,
}, null, 2));
