import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-146";

const refinements = [
  {
    output: "full_site/api/class_pcp_property_index.html",
    title: "PcpPropertyIndex",
    summary:
      "`PcpPropertyIndex` 是某个 property 在 composition semantics 下所有 contributing opinion sites 的索引。它面向属性级 composition 调试：帮助定位哪些 scene description sites 为同一个 property 提供了 specs、local specs 或错误信息。",
    notes: [
      "`GetPropertyRange()` 返回可遍历的 property specs 范围，通常配合 `PcpPropertyIterator` 查看按 composition strength 排列的 opinions。",
      "`GetNumLocalSpecs()` 只统计 local specs 数量；local 与 weaker/stronger composed opinions 不应混为同一个概念。",
      "`GetLocalErrors()` 用于读取 property index 计算中局部发现的错误；当属性意见缺失或解析异常时，应和 prim index / layer stack 错误一起排查。",
      "`IsEmpty()` 表明当前 property index 是否没有贡献 specs；这可能是属性确实不存在，也可能是 composition path 或 arc 选择不正确。",
      "`Swap()` 是容器式操作，常用于高效交换索引内容；它不重新计算 composition，只交换已构造的 index 状态。",
    ],
    terms: [
      ["属性索引", "PcpPropertyIndex"],
      ["属性意见站点", "property opinion sites"],
      ["组合语义", "composition semantics"],
      ["本地 specs", "local specs"],
      ["属性迭代器", "PcpPropertyIterator"],
      ["本地错误", "local errors"],
    ],
  },
  {
    output: "full_site/api/class_hd_data_source_locator.html",
    title: "HdDataSourceLocator",
    summary:
      "`HdDataSourceLocator` 用一小段 `TfToken` 列表标识 Hydra data source 中某个数据位置。它常用于 scene index invalidation、data source 查询和变化通知，用 token path 描述 nested container 下的具体字段。",
    notes: [
      "`Append()` 与 `Prepend()` 构造更深或更外层的 locator，适合从局部字段扩展到完整 data source path。",
      "`GetElementCount()`、`GetElement()`、`GetFirstElement()` 与 `GetLastElement()` 提供 token path 级别的访问，避免把 locator 当普通字符串拆分。",
      "`HasPrefix()`、`GetCommonPrefix()` 与 `Intersects()` 是 invalidation 判断的关键：它们帮助决定某个变化是否影响另一个 locator 范围。",
      "`EmptyLocator()` 与 `IsEmpty()` 表示空定位器；在通知系统中空 locator 往往代表根或 broad invalidation，不能简单忽略。",
      "`GetString()` 与 `Hash()` 适合调试输出和哈希容器使用；业务逻辑仍应优先保持 tokenized locator 结构。",
    ],
    terms: [
      ["数据源定位器", "HdDataSourceLocator"],
      ["令牌路径", "token path"],
      ["数据源位置", "data source location"],
      ["前缀判断", "HasPrefix()"],
      ["相交判断", "Intersects()"],
      ["空定位器", "EmptyLocator()"],
    ],
  },
  {
    output: "full_site/api/class_pcp_error_unresolved_prim_path.html",
    title: "PcpErrorUnresolvedPrimPath",
    summary:
      "`PcpErrorUnresolvedPrimPath` 表示 asset paths could not be both resolved and loaded 的 composition error。它记录 unresolved path、发生错误的 `PcpSite`、source/target layer 以及相关 `PcpArcType`，用于定位路径解析与加载边界。",
    notes: [
      "`unresolvedPath` 是未能解析或加载的 `SdfPath`，应与 asset resolver 日志、layer identifier 和 referenced/payload target 一起检查。",
      "`site` 表示错误发生的 composition site，帮助判断问题来自哪个 prim index 位置，而不是只看最终 stage path。",
      "`sourceLayer` 与 `targetLayer` 有助于区分 arc 源头和目标层；路径存在于源层并不意味着目标层可以成功加载。",
      "`arcType` 指明错误关联的 composition arc 类型，如 reference、payload、inherit 或 specialize 路径，排查策略会因此不同。",
      "`New()` 创建具体错误对象，`ToString()` 输出人类可读诊断；自动化审计时应保留这些字段而不只保存字符串。",
    ],
    terms: [
      ["未解析 prim 路径错误", "PcpErrorUnresolvedPrimPath"],
      ["未解析路径", "unresolvedPath"],
      ["组合站点", "PcpSite"],
      ["源层", "sourceLayer"],
      ["目标层", "targetLayer"],
      ["组合弧类型", "PcpArcType"],
    ],
  },
  {
    output: "full_site/api/class_sdf_children_view.html",
    title: "SdfChildrenView",
    summary:
      "`SdfChildrenView< _ChildPolicy, _Predicate, _Adapter >` 是面向 Sdf 对象 children 的 view template。它通过 child policy、predicate 和 adapter 把底层 child storage 暴露为只读/可遍历视图，常用于 specs、properties 或 name-ordered children 的访问。",
    notes: [
      "`ChildPolicy` 定义如何从 owner 中取得 children，`Predicate` 负责过滤，`Adapter` 负责把底层值转换为 view 的 `value_type`。",
      "`begin()` / `end()`、`rbegin()` / `rend()`、`front()` / `back()` 和 `size()` 提供类 STL 访问；调用者不应假设 view 拥有 children。",
      "`key_type`、`value_type`、`ChildrenType` 与 iterator typedef 说明该 view 同时服务 key/value 访问和顺序遍历。",
      "`SdfChildrenViewTrivialPredicate` 与 `SdfChildrenViewTrivialAdapter` 是默认策略，适合不需要过滤或转换的普通 child view。",
      "由于它是 view，底层 Sdf 对象变化可能影响迭代结果；长时间保存 iterator 或引用时要确认 owner 生命周期和修改边界。",
    ],
    terms: [
      ["子对象视图", "SdfChildrenView"],
      ["子对象策略", "ChildPolicy"],
      ["谓词过滤", "Predicate"],
      ["适配器", "Adapter"],
      ["只读视图", "view"],
      ["迭代器", "iterator"],
    ],
  },
  {
    output: "full_site/api/class_tf_dense_hash_map.html",
    title: "TfDenseHashMap",
    summary:
      "`TfDenseHashMap< Key, Data, HashFn, EqualKey, Threshold >` 是空间效率较高的 map 容器，模仿 `TfHashMap` API，并在 map 较小时使用 vector storage。`Threshold` 控制小规模存储策略，适合小 map 常见而又需要 map-like API 的场景。",
    notes: [
      "`Key`、`Data`、`HashFn`、`EqualKey` 与 `Threshold` 决定 key/value 类型、哈希策略、相等比较和 vector/dense hash 切换阈值。",
      "`insert_result`、`iterator`、`const_iterator`、`key_type`、`mapped_type` 与 `value_type` 基本对齐 STL map/unordered map 使用习惯。",
      "`find()`、`count()`、`insert()`、`erase()`、`operator[]` 与 `clear()` 提供常见 map 操作；性能特征会随元素数量跨过 `Threshold` 而变化。",
      "小 map 走 vector storage 可降低内存开销，但大量元素或频繁随机查找时仍需要关注哈希策略和扩容成本。",
      "该类不是并发容器；如果多个线程共享，需要在外层同步，不能因为 dense/hash 名称就假设线程安全。",
    ],
    terms: [
      ["密集哈希映射", "TfDenseHashMap"],
      ["小规模向量存储", "vector storage"],
      ["切换阈值", "Threshold"],
      ["哈希函数", "HashFn"],
      ["相等比较器", "EqualKey"],
      ["插入结果", "insert_result"],
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
