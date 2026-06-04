import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-file-members-mixed-quality-pass-033";

const refinements = [
  {
    output: "full_site/api/globals_func_v.html",
    title: "File Members - Functions - V",
    notes: [
      "globals_func_v.html 是 File Members 函数子索引 V 段，主要集中在 Vdf 执行网络工具和 VtDictionary 查询工具。",
      "`Vdf_DataManagerVectorAllocate()` 来自 `dataManagerVector.h`，属于 Vdf data manager vector 的内存或向量分配入口；实际生命周期和 allocator 语义需进入头文件核对。",
      "`VdfEmptyNodeCallback()`、`VdfGetAssociatedSourceOutput()`、`VdfIsSpeculating()`、`VdfIsTopologicalSourceNode()`、`VdfTraverseTopologicalSourceNodes()` 来自 `networkUtil.h`，适合按 Vdf network traversal / source node 语境阅读。",
      "`VdfGetMaskedOutputVectorNetwork()` 与 `VdfSortAndUniqueMaskedOutputVector()` 来自 `maskedOutputVector.h`，指向 masked output vector 的网络提取、排序和去重工具。",
      "本页还包含 `VdfIsParallelEvaluationEnabled()`、`VdfScheduleTaskIsInvalid()`、`VtDictionaryGet()` 等条目，中文层按 Vdf execution、schedule、masked output 和 Vt dictionary 分组说明，保留函数名和头文件名。"
    ],
    terms: [
      ["Vdf execution network", "Vdf 执行网络"],
      ["masked output vector", "masked output vector"],
      ["topological source node", "拓扑源节点"],
      ["parallel evaluation", "并行求值"],
      ["VtDictionary", "VtDictionary"]
    ]
  },
  {
    output: "full_site/api/globals_func_w.html",
    title: "File Members - Functions - W",
    notes: [
      "globals_func_w.html 是 File Members 函数子索引 W 段，主要覆盖 Work 模块的并发限制、并行循环、并行归约、排序和 detached task 工具。",
      "`WorkGetConcurrencyLimit()`、`WorkSetConcurrencyLimit()`、`WorkSetMaximumConcurrencyLimit()` 等函数来自 `threadLimits.h`，用于查询和设置 Work 并发上限。",
      "`WorkParallelForEach()`、`WorkParallelForN()`、`WorkParallelForTBBRange()` 和 `WorkSerialForN()` 来自 `loops.h`，表示并行或串行循环调度入口。",
      "`WorkParallelReduceN()` 与 `WorkParallelSort()` 分别来自 `reduce.h` 和 `sort.h`，属于批量任务的并行归约和排序工具；`WorkRunDetachedTask()` 则指向后台 detached task。",
      "本页是 Work task utilities 的函数导航页；中文导读保留 Work 函数名、TBB、thread limits 等英文术语，帮助读者从索引跳入具体头文件。"
    ],
    terms: [
      ["concurrency limit", "并发上限"],
      ["parallel loop", "并行循环"],
      ["parallel reduce", "并行归约"],
      ["detached task", "分离任务"],
      ["scoped parallelism", "作用域化并行"]
    ]
  },
  {
    output: "full_site/api/globals_func.html",
    title: "File Members - Functions",
    notes: [
      "globals_func.html 是 File Members 函数总索引页，用于从所有字母段进入 OpenUSD 文件级函数；本页当前摘录从 Arch 基础设施条目开始。",
      "`ArchAbort()`、`ArchDebuggerAttach()`、`ArchDebuggerIsAttached()`、`ArchDebuggerTrap()`、`ArchDebuggerWait()` 来自 `debugger.h`，属于底层调试和崩溃处理入口。",
      "`ArchAbsPath()`、`ArchCloseAllFiles()`、`ArchCommitVirtualMemoryRange()`、`ArchAlignedAlloc()`、`ArchAlignedFree()` 等函数覆盖文件系统、daemon、virtual memory 和内存对齐工具。",
      "`ArchBitPatternToDouble()`、`ArchBitPatternToFloat()`、`ArchCountTrailingZeros()` 指向 `math.h` 中的低层数值/位模式工具；`stackTrace.h`、`demangle.h`、`symbols.h` 则用于符号和栈追踪。",
      "本页还链接 Ar resolver、resolver context、package utilities 和 Python resolver context 等入口；中文层强调这是总导航页，不逐项替代每个头文件的详细文档。"
    ],
    terms: [
      ["file member function index", "文件成员函数索引"],
      ["debugger utilities", "调试器工具"],
      ["virtual memory", "虚拟内存"],
      ["memory alignment", "内存对齐"],
      ["resolver context", "解析器上下文"]
    ]
  },
  {
    output: "full_site/api/globals_g.html",
    title: "File Members - G",
    notes: [
      "globals_g.html 是 File Members 字母索引 G 段，混合列出宏、常量和函数；它比 `globals_func_g.html` 更宽，不只包含函数。",
      "`GF_MIN_ORTHO_TOLERANCE` 与 `GF_MIN_VECTOR_LENGTH` 来自 `limits.h`，属于 Gf 数学/几何容差常量，读者应与向量长度、正交性和浮点精度语境一起理解。",
      "`GfAbs()`、`GfCeil()`、`GfClamp()`、`GfCos()`、`GfDegreesToRadians()` 等来自 `math.h`，是 Gf 基础数学函数入口；`GfApplyGamma()`、`GfConvertDisplayToLinear()`、`GfConvertLinearToDisplay()` 则来自 `gamma.h`。",
      "`GfCompDiv()`、`GfCompMult()`、`GfCross()` 等条目跨 vec2/vec3/vec4 多个头文件，适合按向量类型和精度后缀 d/f/h/i 分组阅读。",
      "本页还链接 dualQuat、quat、ray、line、plane、matrix、color、homogeneous、diagnostic 和 utils 等 Gf 头文件；中文导读按常量、数学、颜色/gamma、向量和几何查询分组。"
    ],
    terms: [
      ["letter index", "字母索引"],
      ["orthogonal tolerance", "正交容差"],
      ["vector length", "向量长度"],
      ["gamma conversion", "gamma 转换"],
      ["geometry query", "几何查询"]
    ]
  },
  {
    output: "full_site/api/globals_h.html",
    title: "File Members - H",
    notes: [
      "globals_h.html 是 File Members 字母索引 H 段，当前条目很短，包含 hash 与 Hio OpenVDB 资产工具。",
      "`hash_value()` 链到 `token.h` 和 `stageLoadRules.h`，说明它既用于 TfToken 等 token 类型，也可能用于 stage load rules 的哈希支持。",
      "`HioOpenVDBGridFromAsset()` 与 `HioOpenVDBGridsFromAsset()` 链到 `utils.h`，用于从 asset 中读取单个或多个 OpenVDB grid；具体参数和 asset resolver 行为需进入头文件确认。",
      "与 `globals_func_h.html` 相比，本页是字母 H 的所有 file members 入口；当前由于条目都恰好是函数，看起来与函数子索引接近，但分类层级不同。",
      "中文层保留 Hio、OpenVDB、grid、hash_value、StageLoadRules 等 API 术语，补充阅读顺序和用途边界。"
    ],
    terms: [
      ["hash support", "哈希支持"],
      ["TfToken", "TfToken"],
      ["StageLoadRules", "StageLoadRules"],
      ["OpenVDB grid", "OpenVDB grid"],
      ["asset utility", "资产工具"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的索引用法、模块边界和术语对照；英文页面名、API 符号、函数名、头文件名、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first index notes, module boundaries, and terminology for ${escapeHtml(item.title)} while retaining English page names, API symbols, function names, header names, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
