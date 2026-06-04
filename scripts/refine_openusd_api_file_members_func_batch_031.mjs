import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-func-quality-pass-031";

const refinements = [
  {
    output: "full_site/api/globals_func_e.html",
    title: "File Members - Functions - E",
    notes: [
      "globals_func_e.html 是 File Members 函数子索引 E 段，当前只有 `EfGetFirstValidInputValue()` 一个主要函数条目，来源头文件为 `firstValidInputValue.h`。",
      "`EfGetFirstValidInputValue()` 属于 Ef 执行框架中的输入值选择工具；从名称看，它用于在一组候选输入值中找到第一个有效值，具体参数和返回值仍需进入头文件页面核对。",
      "该页不同于 `globals_e.html`：`globals_e.html` 会混合 Ef/Exec 的类型、宏、typedef 和错误枚举，而本页只呈现函数级条目。",
      "中文导读保留函数名和头文件名，避免破坏 C++ API 检索；读者可先确认它属于 Ef input value 工具，再从链接进入 `firstValidInputValue.h`。",
      "由于本页内容很短，本轮不虚构额外函数说明，只补充函数索引定位、模块归属、阅读顺序和中英术语对照。"
    ],
    terms: [
      ["function sub-index", "函数子索引"],
      ["first valid input value", "第一个有效输入值"],
      ["Ef execution framework", "Ef 执行框架"],
      ["header file", "头文件"],
      ["function lookup", "函数检索"]
    ]
  },
  {
    output: "full_site/api/globals_func_g.html",
    title: "File Members - Functions - G",
    notes: [
      "globals_func_g.html 是 File Members 函数子索引 G 段，条目最密集，主要覆盖 Gf 数学函数、gamma 转换、向量/矩阵/四元数/对偶四元数工具、几何求交与诊断辅助函数。",
      "`GfAbs()`、`GfCeil()`、`GfClamp()`、`GfCos()`、`GfDegreesToRadians()`、`GfExp()` 等来自 `math.h`，是 Gf 基础数学函数入口；它们应和向量 component-wise 操作分开阅读。",
      "`GfCompDiv()` 与 `GfCompMult()` 分布在 `vec2*`、`vec3*`、`vec4*` 和 `math.h` 等头文件中，表示向量分量级除法/乘法；后缀 d/f/h/i 保留精度或类型含义。",
      "`GfApplyGamma()`、`GfConvertDisplayToLinear()`、`GfConvertLinearToDisplay()` 来自 `gamma.h`，属于颜色/显示空间转换语境；`GfCross()` 来自三维向量头文件，是向量叉积入口。",
      "`GfFindClosestPoints()` 等几何查询来自 `ray.h`、`lineSeg2d.h`、`line.h`、`plane.h` 等；页面还链接 homogeneous、matrix、color、utils、diagnostic、info 等头文件，说明本页是 Gf file-level function 的导航页，不是完整数学库手册。"
    ],
    terms: [
      ["component-wise division", "分量级除法"],
      ["component-wise multiplication", "分量级乘法"],
      ["gamma conversion", "gamma 转换"],
      ["cross product", "叉积"],
      ["closest-points query", "最近点查询"]
    ]
  },
  {
    output: "full_site/api/globals_func_h.html",
    title: "File Members - Functions - H",
    notes: [
      "globals_func_h.html 是 File Members 函数子索引 H 段，当前条目包括 `hash_value()`、`HioOpenVDBGridFromAsset()` 和 `HioOpenVDBGridsFromAsset()`。",
      "`hash_value()` 出现在 `token.h` 与 `stageLoadRules.h`，通常用于让 TfToken、stage load rules 等类型参与哈希容器或哈希计算；实际 overload 需进入链接页查看。",
      "`HioOpenVDBGridFromAsset()` 与 `HioOpenVDBGridsFromAsset()` 来自 `utils.h`，属于 Hio/OpenVDB 资产读取工具，一个偏单个 grid，一个偏多个 grids。",
      "本页跨越 Tf/Sdf/Usd stage loading 和 Hio volume asset utility 两类上下文；中文层按 hash 与 OpenVDB asset utilities 两组整理。",
      "函数名、OpenVDB、Hio、TfToken、StageLoadRules 等 API 标识保持英文原样，中文只补充用途边界和导航说明。"
    ],
    terms: [
      ["hash_value()", "hash_value()"],
      ["hash container", "哈希容器"],
      ["OpenVDB grid", "OpenVDB grid"],
      ["asset utility", "资产工具"],
      ["stage load rules", "Stage 加载规则"]
    ]
  },
  {
    output: "full_site/api/globals_func_j.html",
    title: "File Members - Functions - J",
    notes: [
      "globals_func_j.html 是 File Members 函数子索引 J 段，集中在 Js JSON 工具函数：`JsConvertToContainerType()`、`JsFindValue()`、`JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()` 和 `JsWriteValue()`。",
      "`JsConvertToContainerType()` 来自 `converter.h`，用于把 JSON 值或结构转换到容器类型；具体模板或类型约束需进入头文件页确认。",
      "`JsFindValue()` 来自 `utils.h`，用于在 JSON-like 数据结构中查找值；它与 parse/write 函数属于同一 Js 工具域，但职责不同。",
      "`JsParseStream()` 与 `JsParseString()` 来自 `json.h`，分别处理流和字符串输入；`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()` 则处理输出和序列化。",
      "本页可按转换、查找、解析、写出四类阅读；中文层保留 Js 函数名，帮助用户从本地索引跳到对应 converter/utils/json 头文件。"
    ],
    terms: [
      ["JSON utility", "JSON 工具"],
      ["parse stream", "解析流"],
      ["parse string", "解析字符串"],
      ["write to stream", "写入流"],
      ["container conversion", "容器转换"]
    ]
  },
  {
    output: "full_site/api/globals_func_l.html",
    title: "File Members - Functions - L",
    notes: [
      "globals_func_l.html 是 File Members 函数子索引 L 段，当前只有 `LoadUsdPhysicsFromRange()` 一个主要函数条目，来源头文件为 `parseUtils.h`。",
      "`LoadUsdPhysicsFromRange()` 从命名看与从范围数据加载或解析 UsdPhysics 信息有关；它属于 UsdPhysics parse utilities，而不是通用文件加载 API。",
      "该页与上一轮的 `CustomUsdPhysicsTokens` 同样指向 `parseUtils.h`，说明这个头文件承担部分 UsdPhysics 文本/范围解析和 token 工具角色。",
      "阅读本页时应先确认函数所属 module：UsdPhysics parsing；再进入链接页查看 range 类型、输入格式、错误处理和返回数据结构。",
      "中文层不改写函数名、UsdPhysics 或 `parseUtils.h`，只补充本地索引页的用途、模块边界和后续核对路径。"
    ],
    terms: [
      ["LoadUsdPhysicsFromRange()", "LoadUsdPhysicsFromRange()"],
      ["UsdPhysics parsing", "UsdPhysics 解析"],
      ["range input", "范围输入"],
      ["parse utilities", "解析工具"],
      ["file-level function", "文件级函数"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的函数索引用法、模块边界和术语对照；英文页面名、API 符号、函数名、头文件名、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first function-index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, function names, header names, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
