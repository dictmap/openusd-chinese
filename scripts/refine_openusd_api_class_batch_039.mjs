import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-039";

const refinements = [
  {
    output: "full_site/api/class_usd_attribute_limits.html",
    title: "UsdAttributeLimits Class Reference",
    notes: [
      "`UsdAttributeLimits` 为 `UsdAttribute` 上的 limits dictionary metadata 提供读写 API，重点是某个 sub-dictionary 内的 minimum 与 maximum 值。",
      "英文摘录说明 minimum 和 maximum 分别编码在 `UsdLimitsKeys->Minimum` 与 `UsdLimitsKeys->Maximum`；因此该类适合表达 soft limits、hard limits 或其他语义分组下的数值边界。",
      "页面中的 `GetMinimum()`、`GetMaximum()`、`GetMinimumOr()`、`GetMaximumOr()` 用于读取上下限；`HasAuthoredMinimum()`、`HasAuthoredMaximum()` 用于判断是否有已编写值。",
      "`ClearMinimum()`、`ClearMaximum()` 和 `Clear()` 负责清除 authored limit；`GetSubDictKey()` 可帮助理解当前实例绑定的是 limits metadata 下的哪个子字典。",
      "阅读本页时应把 limits 看作属性 metadata，而不是属性本身的 timeSample 或默认值；它描述 UI、验证或工具链可参考的值域约束。"
    ],
    terms: [
      ["limits dictionary", "limits 字典"],
      ["sub-dictionary", "子字典"],
      ["minimum", "最小值"],
      ["maximum", "最大值"],
      ["authored limit", "已编写的 limit"]
    ]
  },
  {
    output: "full_site/api/class_usd_geom_basis_curves.html",
    title: "UsdGeomBasisCurves Class Reference",
    notes: [
      "`UsdGeomBasisCurves` 是批量曲线表示，适合 hair、grass 等高密度 aggregate geometry，概念上接近 RIB 的 Basis 和 Curves 语句。",
      "英文摘录说明 cubic BasisCurves 使用 basis 关联的 matrix 与 vstep 插值 vertices；linear BasisCurves 不使用 basis attribute。",
      "`curveVertexCounts` 的长度隐式决定一个 prim 内有多少条曲线；各条曲线由连续的 point 数据段组成，因此 segment indexing 和 interpolation rules 是阅读本页的重点。",
      "页面中的 `ComputeSegmentCounts()`、`ComputeUniformDataSize()`、`ComputeVaryingDataSize()`、`ComputeVertexDataSize()` 帮助把曲线拓扑映射到不同 interpolation 的数据尺寸。",
      "`CreateBasisAttr()`、`CreateTypeAttr()` 等 schema 属性 API 用于 authoring 曲线类型与 basis；后续完整翻译应继续补充 wrap、basis、type、curveVertexCounts 和 interpolation 细节。"
    ],
    terms: [
      ["BasisCurves", "基函数曲线"],
      ["batched curve representation", "批量曲线表示"],
      ["cubic", "三次曲线"],
      ["linear", "线性曲线"],
      ["curveVertexCounts", "curveVertexCounts"]
    ]
  },
  {
    output: "full_site/api/class_usd_geom_mesh.html",
    title: "UsdGeomMesh Class Reference",
    notes: [
      "`UsdGeomMesh` 编码带有可选 subdivision properties 和 features 的 mesh；作为 point-based primitive，它通过 points 以及连接成 edges/faces 的拓扑来定义几何。",
      "英文摘录强调 OpenUSD 为避免歧义，倾向使用 points 与 face-vertices，而不是把 vertex 同时指代点或面顶点。",
      "`faceVertexCounts` 与 `faceVertexIndices` 编码面连接关系；`cornerIndices`、`cornerSharpnesses`、`creaseIndices`、`creaseLengths`、`creaseSharpnesses` 描述 subdivision 相关的尖角和折痕。",
      "`subdivisionScheme`、`interpolateBoundary`、`faceVaryingLinearInterpolation`、`triangleSubdivisionRule` 控制 subdivision 与插值行为，是渲染和建模工具读取 mesh 时的重点。",
      "阅读本页时应把拓扑、点数据和 subdivision 属性分开理解；后续完整翻译应补充属性默认值、合法长度关系和 face-varying 数据绑定规则。"
    ],
    terms: [
      ["point-based primitive", "基于点的 primitive"],
      ["points", "点"],
      ["face-vertices", "面顶点"],
      ["subdivisionScheme", "细分方案"],
      ["crease", "折痕"]
    ]
  },
  {
    output: "full_site/api/class_usd_geom_primvars_a_p_i.html",
    title: "UsdGeomPrimvarsAPI Class Reference",
    notes: [
      "`UsdGeomPrimvarsAPI` 用于编码几何 primitive variables，也就是 `UsdGeomPrimvar`；这些 primvars 可沿 primitive topology 插值、覆盖 shader inputs，并沿 namespace 继承。",
      "创建 primvar 相对明确，主要通过 `CreatePrimvar()`、`CreateIndexedPrimvar()`、`CreateNonIndexedPrimvar()`；读取 primvars 时方法较多，因此页面专门列出 retrieval 指南。",
      "`GetAuthoredPrimvars()` 适合获取当前 prim 上已编写的 primvars；`FindPrimvarsWithInheritance()` 与 `FindPrimvarWithInheritance()` 会考虑 namespace inheritance。",
      "`FindInheritablePrimvars()`、`FindIncrementallyInheritablePrimvars()` 面向可继承 primvars 的增量搜索；`BlockPrimvar()` 用于阻断某个 primvar 的继承或贡献。",
      "本页应与 `UsdGeomPrimvar`、mesh/curves 的 interpolation 规则一起阅读；primvar 的名称、类型、interpolation、indices 和 elementSize 会共同影响 renderer 与 shader 的解释。"
    ],
    terms: [
      ["primvar", "primvar / primitive variable"],
      ["interpolation", "插值方式"],
      ["indexed primvar", "带索引 primvar"],
      ["namespace inheritance", "命名空间继承"],
      ["shader inputs", "shader 输入"]
    ]
  },
  {
    output: "full_site/api/class_usd_imaging_adapter_registry.html",
    title: "UsdImagingAdapterRegistry Class Reference",
    notes: [
      "`UsdImagingAdapterRegistry` 是 PrimAdapter plug-ins 的 registry，用来查找并构造 USD Imaging 适配器。",
      "英文摘录强调它保存的是 adapter factories，而不是 adapter instances；实际 adapter instances 通常通过 `ConstructAdapter()` 创建，并随 per-stage data 存放。",
      "`ConstructAdapter()` 用于按 prim/type 构造 prim adapter；`ConstructAPISchemaAdapter()` 和 `ConstructKeylessAPISchemaAdapters()` 面向 API schema adapters。",
      "`GetAdapterKeys()`、`GetAPISchemaAdapterKeys()`、`HasAdapter()`、`HasAPISchemaAdapter()` 用于查询 registry 中可用的 adapter key；`AreExternalPluginsEnabled()` 反映外部插件是否参与。",
      "本页属于 USD Imaging 与 Hydra 交界处：它不直接渲染 prim，而是把 USD schema/type 映射到能向 imaging delegate/Hydra 提供数据的 adapter。"
    ],
    terms: [
      ["PrimAdapter", "PrimAdapter"],
      ["adapter factory", "adapter 工厂"],
      ["adapter instance", "adapter 实例"],
      ["API schema adapter", "API schema adapter"],
      ["per-stage data", "按 stage 保存的数据"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、关键属性/方法分组和术语对照；英文页面名、类名、方法名、属性名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, key attribute/method groups, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
