import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-members-index-quality-pass-150";

const refinements = [
  {
    output: "full_site/api/functions_x.html",
    title: "Class Members - X",
    summary:
      "`functions_x.html` 是 Class Members 的 X 段索引，当前主要连接 `UsdGeomTokensType`、`UsdPhysicsTokensType`、`GfVec*` 向量族和 `UsdGeomXformable::XformQuery`。它是按 x 分量、x 轴 token 或 xform 相关成员反查类页面的短入口。",
    notes: [
      "`GfVec2d`、`GfVec3f`、`GfVec4h` 等名称中数字表示维度，`d` / `f` / `h` / `i` 表示 double、float、half、int 等数值表示。",
      "`UsdGeomTokensType` 和 `UsdPhysicsTokensType` 是 domain token 表；它们出现在 X 段通常是因为 token 名称或成员名以 x 开头。",
      "`UsdGeomXformable::XformQuery` 属于几何 transform stack 查询入口，应和 `GfVec*` 数学向量类型分开理解。",
      "本页只提供字母索引；如果需要分量访问、构造函数、矩阵/向量乘法或 xform op 计算顺序，应进入目标 class 页面。",
      "中文补强只解释索引读法和模块归属，不改写 `x`、`XformQuery`、token type 或 `GfVec*` 可搜索 API 名称。",
    ],
    terms: [
      ["X 段类成员索引", "X class member index"],
      ["X 分量", "X component"],
      ["X 轴 token", "X-axis token"],
      ["向量族", "vector family"],
      ["变换栈查询", "transform stack query"],
      ["领域 token 表", "domain token table"],
    ],
  },
  {
    output: "full_site/api/functions_y.html",
    title: "Class Members - Y",
    summary:
      "`functions_y.html` 是 Class Members 的 Y 段索引，覆盖 geometry、lighting、physics token tables、`GfVec*` 向量族和 `VdfExecutorBufferData`。它把 y 分量、y 轴 token 和执行缓冲数据放在同一字母导航下，需要按模块拆读。",
    notes: [
      "`GfVec2*`、`GfVec3*`、`GfVec4*` 在 Y 段通常指向 y component 或相关成员；具体字段、operator 和存储布局仍以目标类型页面为准。",
      "`UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType` 分别服务 geometry、lighting、physics domain，不能因为都在 Y 段就合并语义。",
      "`VdfExecutorBufferData` 属于 Vdf 执行系统数据结构，和 Gf 数学类型、USD token 表不是同一层概念。",
      "排查属性名或 token 拼写时，本页可作为入口；排查数值行为时，应继续查 `GfVec*` 或 Vdf executor 相关页面。",
      "索引页中的英文 API 名称保留不翻译，中文层只补充分组、检索路径和避免误读的提示。",
    ],
    terms: [
      ["Y 段类成员索引", "Y class member index"],
      ["Y 分量", "Y component"],
      ["灯光 token", "lighting token"],
      ["物理 token", "physics token"],
      ["执行缓冲数据", "executor buffer data"],
      ["模块拆读", "module-based reading"],
    ],
  },
  {
    output: "full_site/api/functions_func_~.html",
    title: "Class Members - Functions - Symbols",
    summary:
      "`functions_func_~.html` 是函数成员索引的符号段，包含 `_`、`~` 或实现细节命名的条目，如 discovery plugin、Hydra memory manager helper、asset resolver scope/cache 和若干 helper cache。它常用于定位析构、内部 helper 或 Doxygen 暴露出的嵌套类型入口。",
    notes: [
      "带 `_` 前缀的 `_SdrFilesystemDiscoveryPlugin`、`_StripedBufferArray` 等名称通常更接近实现细节或嵌套 helper，调用前要确认公开 API 边界。",
      "`ArResolverContextBinder`、`ArResolverScopedCache`、`ArFilesystemAsset`、`ArInMemoryAsset` 属于 asset resolution 生命周期、上下文绑定和缓存相关线索。",
      "`TfMallocTag::Auto` 指向临时内存标记辅助对象，和 Hydra buffer helper、Ef cache helper 属于不同系统。",
      "符号段页面不是析构函数教程；它只是 Doxygen 把非字母开头或特殊符号开头的成员集中到一个入口。",
      "阅读时要保留 `_`、`~`、`::` 和模板参数原样，否则会影响本地搜索、链接锚点和官方 API 对照。",
    ],
    terms: [
      ["符号段函数索引", "symbol function index"],
      ["实现细节入口", "implementation-detail entry"],
      ["嵌套 helper", "nested helper"],
      ["解析器作用域", "resolver scope"],
      ["作用域缓存", "scoped cache"],
      ["内存标记", "memory tag"],
    ],
  },
  {
    output: "full_site/api/functions_vars_s.html",
    title: "Class Members - Variables - S",
    summary:
      "`functions_vars_s.html` 是变量索引的 S 段，当前密集覆盖 `UsdGeom` schema class、API schema、token tables、Hydra scene index input、physics rigid body descriptor 和 skel bake 参数。它是跨 domain 变量入口，需要先按 schema、scene index、physics、skel 分组。",
    notes: [
      "`UsdGeomBasisCurves`、`UsdGeomMesh`、`UsdGeomPointInstancer`、`UsdGeomSphere` 等属于具体 geometry schema，不应和 API schema 基类混读。",
      "`UsdAPISchemaBase`、`UsdCollectionAPI`、`UsdGeomPrimvarsAPI` 等是 API schema 或辅助 schema，通常通过 apply / authoring 方式影响 prim。",
      "`SdfNamespaceEdit` 指向命名空间编辑操作，和 geometry schema 变量同页出现只是因为字母索引，不代表同一模块。",
      "`HdMergingSceneIndex::InputScene` 属于 Hydra scene index 合并输入，`UsdPhysicsRigidBodyDesc` 和 `UsdSkelBakeSkinningParms` 分别属于 physics 与 skel 工作流。",
      "如果用户从本页进入具体 schema，应继续检查 schemaKind、attribute list、Create/Get 方法和 token 定义，而不是只看变量索引。",
    ],
    terms: [
      ["S 段变量索引", "S variable index"],
      ["几何 schema", "geometry schema"],
      ["辅助 API schema", "auxiliary API schema"],
      ["命名空间编辑", "namespace edit"],
      ["scene index 输入", "scene index input"],
      ["刚体描述", "rigid body descriptor"],
    ],
  },
  {
    output: "full_site/api/functions_rela_g.html",
    title: "Class Members - Related Functions - G",
    summary:
      "`functions_rela_g.html` 是 related functions 索引的 G 段，当前集中在 `GfLine2d`、`GfLine`、`GfLineSeg*`、`GfRay` 和 `GfQuaternion`。这些通常是与类相关的非成员或 friend-style 函数，用于基础几何和旋转数学。",
    notes: [
      "related function 不是普通成员函数；它可能以自由函数、operator 或 friend 形式和目标类协作。",
      "`GfLine`、`GfLineSeg`、`GfRay` 常用于几何构造、closest point、intersection testing 或 ray casting 相关计算。",
      "`GfQuaternion` 条目与旋转表示、插值和方向计算相关，需注意单位化、乘法顺序和坐标约定。",
      "G 段 related functions 页面很短，但能快速把用户导向具体 Gf 数学类型；具体参数和返回值必须查看目标页。",
      "中文层保留 `line`、`line segment`、`ray`、`quaternion` 的英文 API 名称，以便和代码、链接锚点和官方原文一致。",
    ],
    terms: [
      ["G 段相关函数索引", "G related-function index"],
      ["相关函数", "related function"],
      ["自由函数", "free function"],
      ["几何线", "geometric line"],
      ["射线投射", "ray casting"],
      ["旋转表示", "rotation representation"],
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
      <h2>中文二次索引补强 / Chinese Index-Focused Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This index-focused refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
