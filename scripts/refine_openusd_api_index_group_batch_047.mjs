import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-group-quality-pass-047";

const refinements = [
  {
    output: "full_site/api/globals_defs.html",
    title: "File Members : Macro Definitions",
    notes: [
      "`globals_defs.html` 是 Doxygen 的 File Members 宏定义索引页，不是单个模块说明。阅读时应把它当作跨文件宏入口，用来从宏名跳到声明它的头文件或后续 API 页面。",
      "本页英文摘录列出 `AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 等 Asset Resolution 插件宏；这些宏与 resolver context、package resolver 和 resolver 类型注册相关，宏名必须保持原样。",
      "`ARCH_AXIOM`、`ARCH_CACHE_LINE_SIZE`、`ARCH_CONSTRUCTOR`、`ARCH_DEBUGGER_TRAP`、`ARCH_ERROR`、`ARCH_NOINLINE`、`ARCH_PRINTF_FUNCTION` 等 `ARCH_` 宏来自 `arch` 基础层，主要覆盖平台属性、断言、调试、对齐、编译器提示和诊断辅助。",
      "索引中出现的 `TF_`、`PXR_`、`USD_` 相关宏通常承担声明、注册、导出、测试或诊断功能；翻译时解释用途即可，不翻译宏名，也不改动头文件名。",
      "本页价值在于快速定位 C/C++ preprocessor macro 的来源文件，例如 `defineResolverContext.h`、`definePackageResolver.h`、`error.h`、`align.h`、`math.h`、`registerSchema.h`、`diagnostic.h` 等。"
    ],
    terms: [
      ["File Members", "文件级成员索引"],
      ["Macro Definition", "宏定义"],
      ["preprocessor macro", "预处理器宏"],
      ["resolver context", "解析器上下文"],
      ["header file", "头文件"]
    ]
  },
  {
    output: "full_site/api/globals_enum.html",
    title: "File Members : Enumeration Types",
    notes: [
      "`globals_enum.html` 是 File Members 的枚举类型索引页，用于按名称查找 enum 类型本身；它与 `globals_eval.html` 不同，后者列出的是具体枚举值。",
      "英文摘录中的 `ArchMemoryProtection` 对应虚拟内存保护状态；`Exec_ComputationBuilderProviderTypes` 和 `ExecValidationErrorType` 属于 Exec 执行/验证相关类型；这些名称是 API 标识符，保持英文原样。",
      "`PcpArcType` 描述 composition arc 类型；`SdfAuthoringError`、`SdfPermission`、`SdfSpecifier`、`SdfSpecType`、`SdfVariability` 属于 Sdf scene description 层，用于表达 authoring、权限、specifier、spec 类型和 variability。",
      "`SdrVersionFilter`、`TfDiagnosticType`、`UsdInterpolationType`、`UsdListPosition`、`UsdLoadPolicy`、`UsdObjType`、`UsdResolveInfoSource` 分别落在 shader registry、diagnostics、USD interpolation/list editing/load/对象类型/值解析来源等语义域。",
      "阅读本页时先按模块前缀分组：`Arch` 是平台基础，`Exec` 是执行系统，`Pcp` 是 composition，`Sdf` 是 scene description，`Sdr` 是 shader registry，`Tf` 是基础设施，`Usd` 是运行时 API。"
    ],
    terms: [
      ["Enumeration", "枚举类型"],
      ["Enumerator", "枚举值"],
      ["File Members", "文件级成员"],
      ["composition arc", "组合弧"],
      ["scene description", "场景描述"]
    ]
  },
  {
    output: "full_site/api/globals_eval.html",
    title: "File Members : Enumerator Values",
    notes: [
      "`globals_eval.html` 是 File Members 的枚举值索引页，关注 enum 里的具体取值，例如 `UsdInterpolationTypeHeld`、`UsdLoadWithDescendants` 或 `UsdResolveInfoSourceFallback`。",
      "英文摘录列出的 `UsdInterpolationTypeHeld` 与 `UsdInterpolationTypeLinear` 用于解释时间采样值如何插值；`Held` 表示保持上一采样值，`Linear` 表示线性插值语义。",
      "`UsdListPositionBackOfAppendList`、`UsdListPositionFrontOfPrependList` 等值对应 USD list-editing 的位置策略，描述新增条目进入 prepend/append list 的前端还是后端。",
      "`UsdLoadWithDescendants` 与 `UsdLoadWithoutDescendants` 控制 payload/load 操作是否影响 descendant；这类枚举值常用于 stage load policy 和按需加载场景。",
      "`UsdResolveInfoSourceDefault`、`Fallback`、`None`、`Spline`、`TimeSamples`、`Value` 等值说明属性值解析结果来自默认值、fallback、spline、time samples 或 authored value；这些名称可帮助调试属性取值来源。"
    ],
    terms: [
      ["Enumerator Value", "枚举值"],
      ["interpolation", "插值"],
      ["list editing", "列表编辑"],
      ["load policy", "加载策略"],
      ["resolve info source", "解析信息来源"]
    ]
  },
  {
    output: "full_site/api/group__group___exec___attribute___comptuations.html",
    title: "Attribute Computations Builtin Exec Computations",
    notes: [
      "本页是 Exec 系统的 group 页面，标题中的 `Attribute Computations Builtin Exec Computations` 指内置属性计算函数集合；文件名里的 `comptuations` 是上游生成路径拼写，应保留不改。",
      "页面结构列出 `Variables`、`Detailed Description` 和 `Variable Documentation`，说明本页重点不是类继承，而是几个内置 computation 变量/函数条目的用途。",
      "`computeValue` 用来计算 provider attribute 的值；`computeResolvedValue` 用来计算 scene description 中 authored/resolved 后的值；`computePath` 用来得到 provider 的 scene path。",
      "这些条目应放在 Exec runtime 的依赖计算语境中理解：它们为 attribute provider 暴露常用信息，使执行网络中的计算节点可以读取属性值、已解析值或路径，而不直接重新实现 USD 解析逻辑。",
      "阅读本页时保留 `computeValue`、`computeResolvedValue`、`computePath` 名称原样；中文说明只解释它们在 attribute computation 中分别代表 value、resolved authored value 和 scene path。"
    ],
    terms: [
      ["Exec", "Exec 执行系统"],
      ["attribute computation", "属性计算"],
      ["provider attribute", "提供方属性"],
      ["resolved value", "已解析值"],
      ["scene path", "场景路径"]
    ]
  },
  {
    output: "full_site/api/group__group__hd__collection_predicates.html",
    title: "Hydra Collection Predicate API",
    notes: [
      "`Hydra Collection Predicate API` 是 Hydra group 页面，描述用于 scene index prim 的 path expression predicate 函数集合；它面向集合筛选和路径表达式求值，而不是单个渲染任务。",
      "英文摘录说明这些函数用于在 scene index 的 prim 上求值的 path expressions；因此阅读时应把 `SdfPathExpression`、scene index、prim predicate 和 collection membership 联系起来。",
      "`HdGetCollectionPredicateLibrary()` 返回一组基础 predicate function library，用于让 `SdfPathExpression` 在 Hydra scene index 上判断某个 prim 是否满足集合条件。",
      "本页的 `Usage Examples` 和 `Function Documentation` 应优先用来理解 predicate 函数如何被表达式调用；函数名、`Hd` 前缀和 `SdfPathExpression` 名称都保持原样。",
      "在本地复刻中，该页应作为 Hydra collections 的索引入口：后续阅读可继续跳到 `HdCollectionExpressionEvaluator`、scene index、collection predicate 或相关 path expression 页面。"
    ],
    terms: [
      ["Hydra Collection Predicate API", "Hydra 集合谓词 API"],
      ["predicate function", "谓词函数"],
      ["SdfPathExpression", "SdfPathExpression"],
      ["scene index", "scene index"],
      ["collection membership", "集合成员关系"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的用途说明、索引读法、API 分组边界和术语对照；英文页面名、API 名称、类名、函数名、宏名、枚举名、枚举值、template 参数、数学符号、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first purpose notes, index-reading guidance, API grouping boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, function names, macro names, enum names, enumerator values, template parameters, math symbols, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
