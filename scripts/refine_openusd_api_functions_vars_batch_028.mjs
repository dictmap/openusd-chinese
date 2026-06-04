import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-functions-vars-quality-pass-028";

const refinements = [
  {
    output: "full_site/api/functions_vars_w.html",
    title: "Class Members - Variables - W",
    notes: [
      "functions_vars_w.html 是变量索引 W 段，条目包括 PcpDependentNamespaceEdits、UsdShadeTokensType、UsdSkelImagingWeightAndSubShapeIndex、UsdSkelTokensType、Vdf_WeightSlot、UsdGeomTokensType 与 UsdHydraTokensType。",
      "PcpDependentNamespaceEdits 属于 composition/namespace edit 相关的依赖编辑结构；它和 UsdShadeTokensType、UsdGeomTokensType 这类 token 表不在同一语义层级，阅读时应先区分模块。",
      "UsdSkelImagingWeightAndSubShapeIndex 与 UsdSkelTokensType 指向 skeleton imaging 和 skel schema token，上下文多用于骨骼权重、子形状索引和骨架数据在 imaging 管线中的表达。",
      "Vdf_WeightSlot 是 Vdf 计算图权重槽相关入口，和 USD schema token 不同；本地清单外的链接会跳到 `site/uncovered_openusd_page.html`，不会直接离开本地复刻站。",
      "UsdShadeTokensType、UsdGeomTokensType、UsdHydraTokensType 分别对应 shading、geometry 和 Hydra domain 的 token 常量表；API 名称保持英文原样，中文只补充用途和分组。"
    ],
    terms: [
      ["namespace edit dependency", "命名空间编辑依赖"],
      ["skeleton imaging weight", "骨骼成像权重"],
      ["weight slot", "权重槽"],
      ["schema token", "schema token"],
      ["Hydra token table", "Hydra token 表"]
    ]
  },
  {
    output: "full_site/api/functions_vars_x.html",
    title: "Class Members - Variables - X",
    notes: [
      "functions_vars_x.html 是变量索引 X 段，当前只包含 UsdGeomTokensType 与 UsdPhysicsTokensType 两个主要入口，属于短索引页而不是完整专题页。",
      "UsdGeomTokensType 中的 X 相关变量通常服务几何 schema、坐标轴、变换或几何属性命名；具体枚举/字段含义要进入 token class 页面核对。",
      "UsdPhysicsTokensType 中的 X 相关变量通常服务物理 schema 的轴向、驱动、限制或属性命名；本页只提供字母索引入口，不展开物理行为说明。",
      "短页也需要保留英文 API 名称，因为 Doxygen 搜索、链接目标和代码符号都依赖 UsdGeomTokensType、UsdPhysicsTokensType 的原始名称。",
      "阅读本页时可把它当作变量索引末段的补齐页：它告诉你 X 字母下有哪些 domain token，而不是替代 UsdGeom 或 UsdPhysics 的 schema 指南。"
    ],
    terms: [
      ["X-axis related token", "X 轴相关 token"],
      ["geometry token", "几何 token"],
      ["physics token", "物理 token"],
      ["letter index entry", "字母索引条目"],
      ["Doxygen lookup", "Doxygen 检索"]
    ]
  },
  {
    output: "full_site/api/functions_vars_y.html",
    title: "Class Members - Variables - Y",
    notes: [
      "functions_vars_y.html 是变量索引 Y 段，当前覆盖 UsdGeomTokensType、UsdLuxTokensType 与 UsdPhysicsTokensType，主要是三个 domain token 表的字母切片。",
      "UsdGeomTokensType 的 Y 条目通常与几何坐标轴、尺寸或属性命名有关；中文层不改写 token 名称，只提示读者进入对应 token class 查看精确定义。",
      "UsdLuxTokensType 的 Y 条目属于 lighting domain，可能涉及灯光 schema 中的参数命名或方向/形状相关 token；它应与 geometry/physics token 分组阅读。",
      "UsdPhysicsTokensType 的 Y 条目属于物理 schema 的参数命名入口；短索引页没有足够上下文解释仿真语义，因此保留英文原文和链接以便追溯。",
      "本页的价值是本地化变量索引导航：所有清单内链接应跳本地页面，清单外 OpenUSD 内部目标则通过本地缺口页提示，而不是无提示跳到官方英文站。"
    ],
    terms: [
      ["Y-axis token", "Y 轴 token"],
      ["lighting token", "灯光 token"],
      ["physics schema token", "物理 schema token"],
      ["token class", "token 类"],
      ["local routing", "本地链接路由"]
    ]
  },
  {
    output: "full_site/api/functions_vars_z.html",
    title: "Class Members - Variables - Z",
    notes: [
      "functions_vars_z.html 是变量索引 Z 段，包含 UsdGeomTokensType、UsdLuxTokensType、UsdPhysicsTokensType 与 UsdVolTokensType，覆盖 geometry、lighting、physics 和 volume 四个 domain。",
      "UsdGeomTokensType 的 Z 条目通常与 Z 轴、坐标或几何属性命名有关；UsdLuxTokensType 与灯光方向、形状或参数命名相关；具体含义仍以目标 token 页面为准。",
      "UsdPhysicsTokensType 的 Z 条目可用于物理 schema 的轴向或属性命名；UsdVolTokensType 则指向体积/volume schema 的 token 常量，二者不要混读。",
      "由于 Z 段是 variables 字母索引的末端，中文层强调它是导航页：它帮助定位 token 所属 domain，而不是完整解释每个 token 的生成、用途和约束。",
      "保留英文原文和 API 名称可以让读者在本地复刻页、官方 Doxygen 页面和代码中保持一致检索；中文说明只负责补足模块边界和阅读顺序。"
    ],
    terms: [
      ["Z-axis token", "Z 轴 token"],
      ["volume schema token", "体积 schema token"],
      ["domain boundary", "领域边界"],
      ["variable index tail", "变量索引末段"],
      ["symbol lookup", "符号检索"]
    ]
  },
  {
    output: "full_site/api/functions_vars.html",
    title: "Class Members - Variables",
    notes: [
      "functions_vars.html 是 Class Members - Variables 的总索引入口，当前页对应 `_` 分组，条目包括 GfColor 与 HdBufferArray；其它字母分段由 functions_vars_a.html 到 functions_vars_z.html 承接。",
      "GfColor 属于 Gf 基础数学/颜色类型入口，HdBufferArray 属于 Hydra 缓冲数组入口；二者都不是普通文档段落，而是 Doxygen 变量索引下的 class/member 导航项。",
      "总索引页的使用方式是先按字母找到变量名或成员名，再跳转到具体 class 页面；本地页保留英文原名和链接，便于与官方 API 页面和源码搜索结果互相核对。",
      "因为 406 页清单没有覆盖 Doxygen 的所有 class 页面，GfColor 和 HdBufferArray 这类清单外内部链接会进入本地缺口提示页；这符合当前路由策略，不应改成直接外跳。",
      "本页仍标为 `bilingual_draft`，中文层只补足索引用途、模块归属和链接策略说明；它不是对所有变量成员的逐项完整翻译。"
    ],
    terms: [
      ["class member variables", "类成员变量"],
      ["main variable index", "变量总索引"],
      ["Gf color type", "Gf 颜色类型"],
      ["Hydra buffer array", "Hydra 缓冲数组"],
      ["uncovered local placeholder", "本地缺口提示页"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的变量索引用法、模块边界和术语对照；英文页面名、API 符号、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first variable-index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
