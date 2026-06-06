import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-members-index-quality-pass-151";

const refinements = [
  {
    output: "full_site/api/functions_z.html",
    title: "Class Members - Z",
    summary:
      "`functions_z.html` 是 Class Members 的 Z 段索引，当前连接 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`UsdVolTokensType` 和 `GfVec3*` / `GfVec4*`。它用于定位 z 分量、z 轴 token 或 volume/geometry/lighting/physics 中以 z 开头的成员。",
    notes: [
      "`GfVec3*` 与 `GfVec4*` 出现在 Z 段通常意味着 z component 或 z accessor；`GfVec2*` 没有 z 分量，因此不会进入这个短索引。",
      "`UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`UsdVolTokensType` 分别属于 geometry、lighting、physics、volume domain。",
      "同一字母页混排多种模块是 Doxygen 索引特性，不代表 token、math vector 和 schema domain 共享语义。",
      "需要确认 z 分量函数、返回值引用语义或 const 行为时，应跳到具体 `GfVec3*` / `GfVec4*` class 页面。",
      "中文层只补充分组和阅读边界，保留 `z`、`GfVec*` 和 token type 原名，便于本地搜索和官方原文对照。",
    ],
    terms: [
      ["Z 段类成员索引", "Z class member index"],
      ["Z 分量", "Z component"],
      ["Z 轴 token", "Z-axis token"],
      ["体积领域", "volume domain"],
      ["三维/四维向量", "3D/4D vector"],
      ["字母索引混排", "alphabetical index mixing"],
    ],
  },
  {
    output: "full_site/api/functions_func_j.html",
    title: "Class Members - Functions - J",
    summary:
      "`functions_func_j.html` 是函数成员索引的 J 段，条目较少但横跨 CLI option、`SdfPath`、`UsdSkelAnimQuery`、`JsValue` 和 `JsWriter`。它适合作为 JSON、path、skel animation query 和 command-line option 相关成员的快速入口。",
    notes: [
      "`JsValue` 与 `JsWriter` 属于 JSON I/O 辅助类型，常用于结构化数据读取、写出或调试输出场景。",
      "`SdfPath` 是 USD 路径语义的基础类型；J 段命中只说明存在以 j 开头的成员，不代表路径语义只和 JSON 相关。",
      "`UsdSkelAnimQuery` 指向骨骼动画查询，通常和 joint transforms、blend shapes 或 time-sampled animation 数据一起阅读。",
      "`OptionBase<CRTP>` 来自 CLI option 体系，应和 OpenUSD 命令行工具配置或 validator 选项相关页面对照。",
      "页面很短时，中文导读的重点是模块辨识；具体函数名、参数和返回值仍要进入链接目标查看。",
    ],
    terms: [
      ["J 段函数索引", "J function index"],
      ["JSON 值", "JSON value"],
      ["JSON 写入器", "JSON writer"],
      ["路径语义", "path semantics"],
      ["骨骼动画查询", "skeleton animation query"],
      ["命令行选项", "command-line option"],
    ],
  },
  {
    output: "full_site/api/functions_func_e.html",
    title: "Class Members - Functions - E",
    summary:
      "`functions_func_e.html` 是函数成员索引的 E 段，包含 execution framework、cache、time、container/view、range iteration、asset path 和 tracing 相关条目。它是一个跨模块入口，尤其适合反查 `Ef*`、`UsdTimeCode`、`SdfChildrenView`、`VtArray`、`UsdPrimRange` 等成员。",
    notes: [
      "`Ef_OutputValueCache`、`EfDependencyCache`、`EfPageCacheExecutor` 等 `Ef*` 条目指向执行/缓存框架，应和普通容器方法分开阅读。",
      "`UsdTimeCode`、`EfTime`、`EfTimeInterval` 与时间值、时间输入和时间区间有关，常用于 evaluation 或 animation 相关逻辑。",
      "`SdfChildrenView`、`SdfListProxy`、`TfSpan`、`VtArray`、`robin_map` / `robin_set` 更偏容器、视图或高性能哈希容器入口。",
      "`UsdPrimRange` 与 `UsdUtilsTimeCodeRange` 是遍历范围或时间范围辅助，进入目标页后应重点检查 iterator 边界和过滤策略。",
      "E 段只按函数首字母列出命中；不应从这个页面推断 execution order、thread safety 或 cache lifetime。",
    ],
    terms: [
      ["E 段函数索引", "E function index"],
      ["执行缓存", "execution cache"],
      ["时间区间", "time interval"],
      ["容器视图", "container view"],
      ["遍历范围", "iteration range"],
      ["缓存生命周期", "cache lifetime"],
    ],
  },
  {
    output: "full_site/api/functions_func_z.html",
    title: "Class Members - Functions - Z",
    summary:
      "`functions_func_z.html` 是函数成员索引的 Z 段，当前集中在 `GfVec3*` 和 `GfVec4*` 的 z 相关访问器或函数。它比 `functions_z.html` 更窄，只关注函数成员，不包含 token tables。",
    notes: [
      "`GfVec3d`、`GfVec3f`、`GfVec3h`、`GfVec3i` 和 `GfVec4d`、`GfVec4f`、`GfVec4h`、`GfVec4i` 覆盖 double、float、half、int 等数值表示。",
      "Z 段从 `GfVec3*` 开始是因为二维向量没有 z component；这能帮助读者判断索引缺失是否合理。",
      "如果需要 x/y/z/w 分量完整行为，应结合 X/Y/Z 函数索引和具体 `GfVec*` class 页面一起阅读。",
      "z 访问器可能返回值、引用或 const 结果，具体 ABI 和 overload 需要进入目标页面确认。",
      "本页中文补强说明索引边界，不把它扩展成完整 vector math 教程。",
    ],
    terms: [
      ["Z 段函数索引", "Z function index"],
      ["Z 访问器", "z accessor"],
      ["二维向量", "2D vector"],
      ["三维向量", "3D vector"],
      ["四维向量", "4D vector"],
      ["重载语义", "overload semantics"],
    ],
  },
  {
    output: "full_site/api/functions_func_x.html",
    title: "Class Members - Functions - X",
    summary:
      "`functions_func_x.html` 是函数成员索引的 X 段，当前连接 `GfVec2*`、`GfVec3*`、`GfVec4*` 的 x 相关函数以及 `UsdGeomXformable::XformQuery`。它同时覆盖数学向量分量访问和 scene prim 变换查询。",
    notes: [
      "`GfVec2*` 到 `GfVec4*` 的 x 函数通常用于第一个坐标分量访问；数值类型后缀仍需保留英文原样。",
      "`UsdGeomXformable::XformQuery` 与 xform stack 组合、缓存和读取有关，不是普通 Gf vector 成员。",
      "同页出现 Gf 与 UsdGeom 条目是字母索引结果；调试时应先确认目标链接属于 math foundation 还是 scene graph transform。",
      "若要确认 xform op 顺序、resetXformStack 或 time-varying transform 行为，必须进入 `UsdGeomXformable` / `XformQuery` 页面。",
      "若要确认 x() 返回值和 const/引用行为，应进入具体 `GfVec*` 页面，而不是只依赖短索引摘录。",
    ],
    terms: [
      ["X 段函数索引", "X function index"],
      ["X 访问器", "x accessor"],
      ["第一坐标分量", "first coordinate component"],
      ["场景图变换", "scene graph transform"],
      ["xform op 顺序", "xform op order"],
      ["time-varying transform", "time-varying transform"],
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
