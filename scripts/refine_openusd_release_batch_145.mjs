import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-145";

const refinements = [
  {
    output: "full_site/api/class_gf_range1d.html",
    title: "GfRange1d",
    summary:
      "`GfRange1d` 是一维 double precision floating point range / interval。它的操作遵循 interval mathematics；空区间定义为 `max < min`，默认空值通常表现为 `[FLT_MAX, -FLT_MAX]` 这类 min/max 反转状态。",
    notes: [
      "`Contains()` 用于判断点或另一个 range 是否落在当前区间内；使用前应确认区间不是 empty range，否则结果容易和直觉不一致。",
      "`ExtendBy()` 会扩展 min/max 以包含点或区间，适合逐步累积 bounds；从默认空区间开始累积是常见用法。",
      "`GetIntersection()` / `Intersection()` 与 `GetUnion()` 分别表达区间交集和并集，调试时要关注空交集与端点相等的闭区间边界。",
      "`GetDistanceSquared()` 给出点到区间的平方距离；点在区间内部时距离为 0，适合避免不必要的 `sqrt`。",
      "`GetMin()`、`GetMax()`、`GetMidpoint()` 与 `GetSize()` 是读取端点和尺度的基础接口；对 empty range 调用时应明确调用方期望。",
    ],
    terms: [
      ["一维范围", "GfRange1d"],
      ["区间数学", "interval mathematics"],
      ["空范围", "empty range"],
      ["扩展范围", "ExtendBy()"],
      ["交集", "intersection"],
      ["平方距离", "distance squared"],
    ],
  },
  {
    output: "full_site/api/class_gf_dual_quatf.html",
    title: "GfDualQuatf",
    summary:
      "`GfDualQuatf` 表示由 real part quaternion 和 dual part quaternion 组成的 dual quaternion，常用于同时表示 rotation 与 translation。它属于 `float` 精度线性代数基础类型，和 matrix transform 相比更适合某些插值与 skinning 场景。",
    notes: [
      "`GetReal()` 与 `GetDual()` 分别返回 real quaternion 和 dual quaternion；不要把 dual part 当成普通平移向量直接读取。",
      "`GetTranslation()` 从 dual quaternion 中提取 translation，通常要求对象满足合理的 rigid transform / normalized 约束。",
      "`Normalize()` 与 `GetNormalized()` 分别原地归一化和返回归一化副本；进行 blend 或累积后应检查 length，避免非单位 dual quaternion 进入后续变换。",
      "`GetInverse()`、`GetConjugate()`、`GetIdentity()` 与 `GetZero()` 是常用代数构造；identity 与 zero 的语义不同，前者表示无变换，后者不是有效刚体变换。",
      "构造函数有多个 overload，可从 rotation、translation 或两个 quaternion 组合；调用时应确认输入约定和 handedness 与项目数学约定一致。",
    ],
    terms: [
      ["双四元数", "dual quaternion"],
      ["实部", "real part"],
      ["对偶部", "dual part"],
      ["平移提取", "GetTranslation()"],
      ["归一化", "Normalize()"],
      ["单位变换", "identity"],
    ],
  },
  {
    output: "full_site/api/class_gf_ray.html",
    title: "GfRay",
    summary:
      "`GfRay` 表示三维空间中用于 intersection testing 的 ray，由 start point / origin 和 direction 组成。文档特别指出默认不会把 direction vector 归一化，并且 ray intersection 计算包含 start point，距离 0 也视为相交。",
    notes: [
      "`SetPointAndDirection()` 直接设置起点和方向，`SetEnds()` 从两端点推导 ray；两者适用场景不同，后者更适合由 segment-like 输入构造射线。",
      "`GetPoint()` 根据参数距离返回 ray 上的点；由于 direction 不一定单位化，参数含义要和当前 direction length 一起理解。",
      "`Intersect()` 有多个 overload，覆盖 plane、sphere、box、triangle 等常见几何；调用前要确认输入几何和返回 distance 的约定。",
      "`FindClosestPoint()` 与相关 `GfFindClosestPoints` friend functions 适合最近点查询，不等同于发生相交。",
      "`Transform()` 会变换起点和方向；如果 transform 包含非均匀缩放，后续距离参数和 direction length 的解释需要重新核对。",
    ],
    terms: [
      ["射线", "GfRay"],
      ["起点", "start point"],
      ["方向向量", "direction vector"],
      ["相交测试", "intersection testing"],
      ["最近点", "closest point"],
      ["变换射线", "Transform()"],
    ],
  },
  {
    output: "full_site/api/class_tf_token.html",
    title: "TfToken",
    summary:
      "`TfToken` 是 registered string handle，用于对已知且固定的字符串进行 constant-time comparison、assignment 和 hashing。它适合 bounded set of fixed symbols，例如 schema token、attribute name、metadata key 或 renderer option name。",
    notes: [
      "`TfToken` 的优势来自字符串 intern/registration；创建 token 后比较和哈希是常数时间，但首次注册仍与输入字符串有关。",
      "`GetString()` 返回 `std::string` 视图语义的值，`GetText()` / `data()` 提供 C 字符串指针；不要长期持有超出 token 生命周期假设的裸指针。",
      "`IsEmpty()` 可区分 empty token；空 token 与普通字符串 token 的语义应由调用方 API 明确约定。",
      "`Hash()`、`HashSet` 与 `Set` 面向 token collection；在高频路径中比反复使用 `std::string` 更适合作为 key。",
      "`Find()` 可查询已存在 token 而不一定创建新注册项；当只是探测符号是否已注册时，比直接构造 token 更可控。",
    ],
    terms: [
      ["令牌", "TfToken"],
      ["已注册字符串", "registered string"],
      ["常数时间比较", "constant-time comparison"],
      ["哈希", "hashing"],
      ["空令牌", "empty token"],
      ["固定符号集合", "fixed symbols"],
    ],
  },
  {
    output: "full_site/api/class_vt_value_ref.html",
    title: "VtValueRef",
    summary:
      "`VtValueRef` 是 non-owning type-erased view of a value，可与 `VtValue` 互操作。它通常作为函数参数或自动变量使用，不能比被引用的 value 活得更久；普通 typed values 和 `VtValue` 都可隐式转换为 `VtValueRef`。",
    notes: [
      "`VtValueRef` 不拥有数据，因此不会像 `VtValue` 那样复制或延长对象生命周期；把它存入长期容器通常是错误用法。",
      "`Get()`、`GetType()`、`GetTypeid()`、`GetTypeName()` 和 `GetKnownValueTypeIndex()` 用于检查被引用值的运行时类型信息。",
      "`GetArraySize()` 与 `GetElementTypeid()` 帮助统一处理数组值；对非数组类型调用时要看对应 API 的约定。",
      "`CanHash()` / `GetHash()`、`CanTransform()`、`CanComposeOver()` 表示该引用值是否支持特定 generic operations。",
      "`_Get()`、`_GetMutable()` 与 `_TypeIs()` 是更低层的类型访问机制，普通使用者应优先通过公共 typed API 进行安全检查。",
    ],
    terms: [
      ["非拥有引用", "non-owning reference"],
      ["类型擦除视图", "type-erased view"],
      ["值容器", "VtValue"],
      ["运行时类型", "runtime type"],
      ["数组大小", "GetArraySize()"],
      ["可组合覆盖", "CanComposeOver()"],
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
      <h2>中文三次补强导读 / Chinese Third-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This third-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
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
