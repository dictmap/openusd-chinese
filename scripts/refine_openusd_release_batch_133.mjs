import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-133";

const refinements = [
  {
    output: "full_site/api/class_usd_stage_cache.html",
    title: "UsdStageCache",
    summary:
      "`UsdStageCache` 是强并发安全的 `UsdStageRefPtr` 集合，用于让多个 clients 和 threads 共享已打开的 `UsdStage`。阅读本页时要把它理解为 stage 复用和发布机制，而不是 layer cache 或 asset resolver cache。",
    notes: [
      "`UsdStageCacheContext` 是典型使用入口：绑定上下文后，`UsdStage::Open()` 可以在缓存中查找匹配 stage，或把新打开的 stage 发布到缓存。",
      "`Find()`、`FindOneMatching()` 和 `FindAllMatching()` 负责按 root layer、session layer、resolver context 或 predicate 等条件定位缓存项；多个匹配时要明确选择策略。",
      "`Contains()`、`GetAllStages()` 和 `GetId()` 帮助调试和枚举缓存内容；这些接口反映缓存持有的 stage 引用，不表示 stage 内容一定未变化。",
      "`Erase()`、`EraseAll()` 与 `Clear()` 会移除缓存记录，但不会自动撤销所有外部 `UsdStageRefPtr`；只要其他引用仍存在，stage 对象仍可能存活。",
      "并发安全不等于业务逻辑自动同步；多个线程共享同一 stage 时，仍需理解 stage mutation、notice、payload loading 和应用侧读写策略。",
    ],
    terms: [
      ["UsdStageCache", "USD stage 缓存"],
      ["UsdStageRefPtr", "stage 引用指针"],
      ["UsdStageCacheContext", "stage 缓存上下文"],
      ["thread safe", "线程安全"],
      ["cache lookup", "缓存查找"],
      ["stage lifetime", "stage 生命周期"],
    ],
  },
  {
    output: "full_site/api/class_usd_attribute_limits.html",
    title: "UsdAttributeLimits",
    summary:
      "`UsdAttributeLimits` 为 `UsdAttribute` 上的 limits dictionary metadata 提供读写接口，用于表达某个 sub-dictionary 中的 minimum 和 maximum。它适合描述 soft limits、hard limits 或工具约定的数值边界，而不是属性当前值本身。",
    notes: [
      "`GetMinimum()`、`GetMaximum()`、`SetMinimum()` 和 `SetMaximum()` 读写的是 limits metadata 中的边界值，不会直接 clamp 或修改 attribute value。",
      "`UsdLimitsKeys->Minimum` 与 `UsdLimitsKeys->Maximum` 是底层 key；中文说明要保留这些 token / key 名称，便于和 metadata dictionary 对照。",
      "`GetMinimumOr()`、`GetMaximumOr()` 和 `GetOr()` 提供默认值路径；这类接口适合消费端在未 authored limit 时提供 fallback。",
      "`HasAuthoredMinimum()`、`HasAuthoredMaximum()` 与 `HasAuthored()` 用于区分是否真的写过 limit opinion；不要把不存在的 limit 和默认值混淆。",
      "`ClearMinimum()`、`ClearMaximum()` 与 `Clear()` 清理 authored metadata；它们改变的是边界元数据，不是删除 attribute 或清空 time samples。",
    ],
    terms: [
      ["UsdAttributeLimits", "USD 属性限制元数据"],
      ["limits dictionary", "limits 字典"],
      ["minimum", "最小值"],
      ["maximum", "最大值"],
      ["soft limits", "软限制"],
      ["hard limits", "硬限制"],
    ],
  },
  {
    output: "full_site/api/class_usd_geom_basis_curves.html",
    title: "UsdGeomBasisCurves",
    summary:
      "`UsdGeomBasisCurves` 是用于 hair、grass 等高密度曲线的 batched curve representation，概念上接近 RIB 的 `Basis` 和 `Curves`。重点在于 curve vertex counts、basis、type、wrap、segment indexing、vertex interpolation 和 primvar interpolation 的配合。",
    notes: [
      "`curveVertexCounts` 的长度决定一个 prim 中曲线数量，每个元素决定对应曲线占用的连续 points 数量；这也是 segment indexing 的基础。",
      "`basis` 只对 cubic BasisCurves 有意义，linear BasisCurves 不使用 basis attribute；阅读时应先确认 `type` 再解释 basis。",
      "`ComputeSegmentCounts()`、`ComputeUniformDataSize()`、`ComputeVaryingDataSize()` 和 `ComputeVertexDataSize()` 是理解不同 interpolation 数据规模的实用入口。",
      "`Tubes and Ribbons` 相关段落说明 curves 可以按 tubes 或 ribbons 渲染；宽度、法线、orientation 和 primvars 会影响最终外观。",
      "`UsdGeomBasisCurves` 常用于批量表达大量曲线，不适合逐条曲线建成独立 prim；这正是它作为 aggregate geometry 的性能动机。",
    ],
    terms: [
      ["UsdGeomBasisCurves", "USD 基函数曲线"],
      ["curveVertexCounts", "每条曲线顶点数"],
      ["basis", "基函数"],
      ["cubic curves", "三次曲线"],
      ["segment indexing", "线段索引"],
      ["primvar interpolation", "primvar 插值"],
    ],
  },
  {
    output: "full_site/api/class_usd_shade_output.html",
    title: "UsdShadeOutput",
    summary:
      "`UsdShadeOutput` 封装 shader 或 node-graph output，是带类型的 connectable attribute，用来表示外部计算出的输出值。它处在 `UsdShadeConnectableAPI` 连接语义和底层 `UsdAttribute` 访问语义之间。",
    notes: [
      "`ConnectToSource()` 的多个 overload 支持连接到 shader、node graph 或具体 output source；阅读时要保留 source path、source name 和 source type 的区别。",
      "`CanConnect()` 用于判断连接合法性，但合法连接仍需结合 shader definition、Sdr metadata 和渲染端支持来解释。",
      "`DisconnectSource()`、`ClearSource()` 与 `ClearSources()` 都与连接清理有关；区别在于清理单个 source、指定 source 还是全部 source。",
      "`GetConnectedSource()`、`GetRawConnectedSourcePaths()` 和 `SourceInfoVector` 帮助从 authored connections 解析来源；不要把它们误认为直接求值 shader graph。",
      "`GetAttr()` 暴露底层 `UsdAttribute`；这允许读取类型、metadata 和 authored value，但 `UsdShadeOutput` 的核心仍是 output 连接语义。",
    ],
    terms: [
      ["UsdShadeOutput", "UsdShade 输出端口"],
      ["connectable attribute", "可连接属性"],
      ["ConnectToSource", "连接到源"],
      ["source type", "源类型"],
      ["Sdr metadata", "Sdr 元数据"],
      ["shader graph", "着色器图"],
    ],
  },
  {
    output: "full_site/api/class_usd_physics_joint.html",
    title: "UsdPhysicsJoint",
    summary:
      "`UsdPhysicsJoint` 用于约束 rigid bodies 的运动，可连接两个 rigid bodies，也可连接一个 rigid body 与 world。默认 joint primitive 表达 D6 joint，三个 linear 和三个 angular degrees of freedom 默认都是 free。",
    notes: [
      "`CreateBody0Rel()` 与 `CreateBody1Rel()` 指定 joint 连接两端；当只指定一个 body 时，另一端通常按 world 参照理解。",
      "`CreateLocalPos0Attr()`、`CreateLocalRot0Attr()`、`CreateLocalPos1Attr()` 和 `CreateLocalRot1Attr()` 定义 joint frame 在两端 body 局部空间中的位置和旋转。",
      "`CreateJointEnabledAttr()` 控制 joint 是否启用；`CreateCollisionEnabledAttr()` 控制被连接 bodies 之间是否允许 collision，二者职责不同。",
      "`CreateBreakForceAttr()` 与 `CreateBreakTorqueAttr()` 用于表达断裂阈值；它们是 physics schema 属性，具体运行时行为仍依赖物理求解器实现。",
      "`CreateExcludeFromArticulationAttr()` 表达是否从 articulation 中排除；阅读时应把 schema 声明、仿真求解器支持和运行时导入策略分开理解。",
    ],
    terms: [
      ["UsdPhysicsJoint", "USD 物理关节"],
      ["rigid body", "刚体"],
      ["D6 joint", "六自由度关节"],
      ["local frame", "局部坐标系"],
      ["break force", "断裂力阈值"],
      ["articulation", "关节系统"],
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
