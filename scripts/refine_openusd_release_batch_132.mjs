import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-132";

const refinements = [
  {
    output: "full_site/api/class_usd_prim.html",
    title: "UsdPrim",
    summary:
      "`UsdPrim` 是 `UsdStage` 上唯一持久的 scenegraph object，也是运行时访问 prim、properties、metadata、composition arcs 和 applied schemas 的核心入口。阅读本页时要把 `UsdPrim` 理解为 composition 后的场景图句柄，而不是某个单一 layer 中的 `SdfPrimSpec`。",
    notes: [
      "`UsdPrim` 可以访问 `UsdVariantSets`、`UsdReferences`、`UsdInherits`、payloads、properties 和 metadata；这些 API 操作的是 composed prim 的可见接口，具体 authored opinions 仍来自 layer stack。",
      "`IsValid()`、`operator bool` 和 Lifetime Management 相关说明要优先阅读；prim 句柄可能因 stage mutation、payload loading 或重新组成而失效，不能把它当成永久裸指针。",
      "`GetChildren()`、`GetFilteredChildren()`、`SiblingIterator` 和 `SubtreeIterator` 体现遍历语义；遍历结果会受到 prim active/load/visibility/predicate 等条件影响。",
      "`ApplyAPI()`、`AddAppliedSchema()` 和 applied schema 列表决定 prim 上附加的 API schema 行为；中文说明要保留 `apiSchemas`、`ApplyAPI`、`UsdSchemaRegistry` 等名称以便和 schema 文档对照。",
      "`UsdPrim` 是很多 typed schema class 的基础载体；`UsdGeomMesh`、`UsdLux*`、`UsdShade*` 等对象通常包装或验证一个 `UsdPrim`，但不替代 `UsdPrim` 的通用 composition 语义。",
    ],
    terms: [
      ["UsdPrim", "USD prim 运行时句柄"],
      ["scenegraph object", "场景图对象"],
      ["composition arc", "组合弧"],
      ["authored opinion", "已创作意见"],
      ["applied schema", "已应用 schema"],
      ["prim traversal", "prim 遍历"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_mesh.html",
    title: "UsdGeomMesh",
    summary:
      "`UsdGeomMesh` 是 `UsdGeom` 中的 mesh typed schema，用 points 和 face-vertices 拓扑描述几何，并可附带 subdivision properties、holes、creases、corners 和 interpolation 控制。阅读时要区分点数据、面顶点索引和细分曲面规则。",
    notes: [
      "`faceVertexCounts` 与 `faceVertexIndices` 共同定义面拓扑；前者给出每个 face 的顶点数量，后者按顺序展开所有 face-vertices 的 point 索引。",
      "`points` 通常来自 `UsdGeomPointBased` 基类；mesh 几何本身依赖 points 与 topology 的一致性，索引越界或数量不匹配会导致消费端解释失败。",
      "`subdivisionScheme`、`interpolateBoundary`、`faceVaryingLinearInterpolation` 和 `triangleSubdivisionRule` 描述 subdivision 行为；它们不等同于直接改变 authored topology。",
      "`creaseIndices`、`creaseLengths`、`creaseSharpnesses`、`cornerIndices` 和 `cornerSharpnesses` 控制细分边界特征；读取时应按属性组理解，不能孤立解释单个数组。",
      "`UsdGeomMesh` 常与 `UsdGeomPrimvarsAPI` 和 material binding 一起使用；primvars 的 interpolation、normals、UV 等信息会影响渲染，但 mesh schema 的核心仍是拓扑和几何属性。",
    ],
    terms: [
      ["UsdGeomMesh", "USD 几何网格"],
      ["faceVertexCounts", "每面顶点数量"],
      ["faceVertexIndices", "面顶点索引"],
      ["subdivisionScheme", "细分方案"],
      ["crease sharpness", "折痕锐度"],
      ["topology", "拓扑"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_primvars_a_p_i.html",
    title: "UsdGeomPrimvarsAPI",
    summary:
      "`UsdGeomPrimvarsAPI` 用于创建、查询和继承 `UsdGeomPrimvar`，也就是沿几何 primitive topology 插值的 primitive variables。它是几何属性、shader inputs、UV、颜色和实例化数据之间的关键桥接 API。",
    notes: [
      "`CreatePrimvar()`、`CreateIndexedPrimvar()` 和 `CreateNonIndexedPrimvar()` 是创建入口；indexed primvar 通过 indices 复用值表，non-indexed primvar 直接按 interpolation 规则存值。",
      "`GetPrimvars()`、`GetAuthoredPrimvars()` 与 `FindPrimvarsWithInheritance()` 的语义不同：前者偏枚举，后者会考虑 namespace inheritance 和祖先 primvars。",
      "`interpolation` 决定 primvar 如何映射到 topology，例如 constant、uniform、vertex、varying、faceVarying；中文层应保留这些 token 字面量。",
      "`BlockPrimvar()` 用于阻断继承或 authored value；这不是删除所有上游数据，而是在 composition 结果中表达 block 意见。",
      "`CanContainPropertyName()` 和 `primvars:` namespace 规则决定属性名是否合法；不要把普通 attribute 和 primvar 混为一类，primvar 有额外插值和继承语义。",
    ],
    terms: [
      ["UsdGeomPrimvarsAPI", "USD 几何 primvars API"],
      ["UsdGeomPrimvar", "几何 primitive variable"],
      ["interpolation", "插值方式"],
      ["indexed primvar", "索引式 primvar"],
      ["primvars namespace", "primvars 命名空间"],
      ["inheritance", "继承"],
    ],
  },
  {
    output: "full_site/api/class_usd_schema_registry.html",
    title: "UsdSchemaRegistry",
    summary:
      "`UsdSchemaRegistry` 是访问 USD `IsA` schema、applied API schema、schema type information 和 prim definitions 的 singleton registry。它把 `schema.usda` / `generatedSchema.usda` 中的声明数据转换为运行时可查询的 schema 信息。",
    notes: [
      "`FindConcretePrimDefinition()`、`FindAbstractPrimDefinition()` 和 `FindAppliedAPIPrimDefinition()` 分别面向 concrete typed schema、abstract schema 和 applied API schema 的 prim definition 查询。",
      "`BuildComposedPrimDefinition()` 用于组合 prim type 和 applied API schemas 后的定义；这解释了为什么实际 prim 可用属性可能来自多个 schema 源。",
      "`FindSchemaInfo()` 与 `FindSchemaInfosInFamily()` 关注 schema identity、family 和 version；遇到 versioned schema 时要结合 `VersionPolicy` 读。",
      "`GetAPISchemaTypeName()`、`GetAPISchemaCanOnlyApplyToTypeNames()` 和 auto-apply API schema 相关接口用于判断 API schema 的应用规则和限制。",
      "`UsdSchemaRegistry` 服务于 schema 发现与定义查询，不直接修改 stage；它回答“某 schema 声明了什么”，而不是“某个 prim 当前 author 了什么值”。",
    ],
    terms: [
      ["UsdSchemaRegistry", "USD schema 注册表"],
      ["singleton registry", "单例注册表"],
      ["IsA schema", "IsA 类型 schema"],
      ["applied API schema", "已应用 API schema"],
      ["prim definition", "prim 定义"],
      ["VersionPolicy", "版本策略"],
    ],
  },
  {
    output: "full_site/api/class_tf_token.html",
    title: "TfToken",
    summary:
      "`TfToken` 是已注册字符串的 handle，用于对已知且数量有界的符号字符串进行常数时间比较、赋值和 hashing。它是 USD 中 tokenized names、属性名、schema token、locator 片段和大量标识符的底层基础类型。",
    notes: [
      "`TfToken` 适合固定符号集合，不适合无限增长的任意用户字符串；因为 token 注册后会进入全局表，滥用会造成长期内存压力。",
      "`GetString()` 返回 `std::string` 形式，`GetText()` / `data()` 更偏底层字符指针访问；性能敏感路径应避免反复把 token 转回字符串比较。",
      "`Hash()`、`HashSet` 和 `Set` 说明 token 适合作为 hash key；比较通常基于已注册字符串 identity，而不是逐字符线性比较。",
      "`Find()` 可在不强制创建新 token 的情况下查找已注册字符串；这对避免无意扩展 token table 很重要。",
      "`IsEmpty()` 与空 token 语义要和空字符串区别理解；在 API 约定中 empty token 常用于默认值、无命名实例或无效标识的轻量表达。",
    ],
    terms: [
      ["TfToken", "Tf 注册字符串 token"],
      ["registered string", "已注册字符串"],
      ["constant time comparison", "常数时间比较"],
      ["hashing", "哈希"],
      ["token table", "token 全局表"],
      ["empty token", "空 token"],
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
