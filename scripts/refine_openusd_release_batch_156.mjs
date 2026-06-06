import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-156";

const refinements = [
  {
    output: "full_site/api/usd_media_page_front.html",
    title: "UsdMedia: USD Media Schema",
    summary:
      "`usd_media_page_front.html` 是 `UsdMedia` 模块入口，当前范围集中在 asset previews 与 spatial audio。它说明 USD 如何把预渲染资产预览和音频作为 scene context 中的媒体信息表达出来，而不是提供完整播放器、编解码器或实时音频引擎。",
    notes: [
      "`UsdMediaAssetPreviewsAPI` 用于把 thumbnails 等预渲染 asset previews 关联到 scene 中的 prim，适合资产浏览、内容库检索和 DCC/工具侧预览工作流。",
      "`UsdMediaSpatialAudio` 表达 spatial 与 non-spatial audio，并派生自 `UsdGeomXformable`，因此音频 prim 可以和场景变换、位置及层级关系一起被组织。",
      "本页的 media 语义依赖 stage 与 prim context：先判断媒体是否描述资产预览、是否绑定到 prim、是否需要空间化，再进入具体 class 页查属性。",
      "不要把 `UsdMedia` 与 `UsdVol`、`UsdRender` 或 renderer media pipeline 混为一谈；这里关注 schema 数据表达，不定义渲染器或播放器运行时行为。",
      "英文类名 `UsdMediaAssetPreviewsAPI`、`UsdMediaSpatialAudio` 和页面名保持原样，便于与 Doxygen 链接、schema registry 和源码路径直接对照。",
    ],
    terms: [
      ["媒体 schema", "media schema"],
      ["资产预览", "asset preview"],
      ["预渲染缩略图", "pre-rendered thumbnail"],
      ["空间音频", "spatial audio"],
      ["非空间音频", "non-spatial audio"],
      ["场景上下文", "stage context"],
    ],
  },
  {
    output: "full_site/api/tf_page_front.html",
    title: "Tf: Tools Foundations",
    summary:
      "`tf_page_front.html` 是 `Tf` 基础工具层入口，覆盖 memory management、runtime typing、path utilities、diagnostics、debug output、string utilities、containers、object creation、math、performance、file 与 system extensions。它是许多 OpenUSD 模块共同依赖的底层 C++ 工具集合。",
    notes: [
      "阅读 `Tf` 时应先按功能分组定位：对象生命周期通常走 `TfRefPtr`、`TfWeakPtr`、`TfRefBase`、`TfWeakBase`，内存追踪则进入 `TfMallocTag`。",
      "`TfType`、`TfEnum` 和 `TfTypeInfoMap` 连接 runtime type system、Plug 插件注册和 schema 类型查询；这些名称不应翻译成普通中文类名。",
      "`TF_AXIOM()`、`TF_VERIFY()`、`TF_FATAL_ERROR()`、`TF_CODING_ERROR()`、`TF_RUNTIME_ERROR()`、`TF_WARN()` 等诊断宏有不同严重级别和使用语境，中文只解释用途，宏名保留原样。",
      "`TfNotice`、`TfError`、`TfRegistryManager` 与 `TfMallocTag` 的专题页是入口页之后的主要阅读路径，适合进一步理解通知、错误发布、注册初始化和内存标记。",
      "`Tf` 是 foundation layer，不等同于 USD scene schema；它提供容器、字符串、文件、调试和系统工具，供 `Sdf`、`Usd`、`Hd` 等上层模块复用。",
    ],
    terms: [
      ["基础工具层", "foundation tools layer"],
      ["引用计数指针", "reference-counted pointer"],
      ["弱引用指针", "weak pointer"],
      ["运行时类型", "runtime typing"],
      ["诊断宏", "diagnostic macro"],
      ["注册初始化系统", "registry initialization system"],
    ],
  },
  {
    output: "full_site/api/glf_page_front.html",
    title: "Glf: Utility classes for OpenGL",
    summary:
      "`glf_page_front.html` 是 `Glf` 模块入口，官方摘要很短：Utility classes for OpenGL output。本轮中文层把它定位为 OpenUSD/Imaging 相关 OpenGL 输出辅助类入口，用于进入 draw target、OpenGL helper 与渲染调试相关页面。",
    notes: [
      "`Glf` 面向 OpenGL output 的 utility classes，通常出现在成像、预览、draw target、framebuffer 或 GPU 资源辅助上下文中。",
      "本页不是 `UsdGeom` 几何 schema，也不是 `UsdShade` 材质网络说明；它更接近渲染基础设施和 OpenGL 平台辅助层。",
      "如果要查具体行为，应沿本地链接进入 `GlfDrawTarget` 等 class 页；入口页本身只提供模块定位和跳转，不承诺列出完整 API 细节。",
      "`Glf` 与 Hydra/Storm 相关渲染路径可能相邻出现，但模块边界不同：Hydra 关注 scene index、render delegate、task 等抽象，`Glf` 关注 OpenGL output helper。",
      "保留 `Glf`、`OpenGL`、`draw target`、`framebuffer` 等英文术语，有助于和源码 include、Doxygen class 名称及图形调试工具保持一致。",
    ],
    terms: [
      ["OpenGL 输出", "OpenGL output"],
      ["绘制目标", "draw target"],
      ["帧缓冲", "framebuffer"],
      ["渲染辅助类", "rendering utility class"],
      ["成像基础设施", "imaging infrastructure"],
      ["模块边界", "module boundary"],
    ],
  },
  {
    output: "full_site/api/globals_o.html",
    title: "File Members - o / operators",
    summary:
      "`globals_o.html` 是 File Members 的字母 `o` 索引页，主要聚合全局 documented operator 条目。它适合快速定位 `operator+()`、`operator==()`、`operator>>()`、`operator^()` 等声明来源，但具体语义必须结合头文件、参数类型和返回类型判断。",
    notes: [
      "`operator+()`、`operator==()`、`operator>>()`、`operator^()` 等符号本身不翻译；中文说明只解释它们在对应类型上的常见阅读方式。",
      "`indexedWeightsOperand.h` 中的 `operator+()` 更像 indexed weights operand 的组合入口，不能泛化为所有 USD 对象的加法语义。",
      "`dictionary.h` 中的 `operator==()` 通常表示 dictionary 比较；读者应继续查看 `VtDictionary` 或相关 typedef/class 以确认键值比较规则。",
      "`timeCodeRange.h` 中的 `operator>>()` 常用于输入流解析；`vec3d.h`、`vec3f.h`、`vec3h.h` 中的 `operator^()` 则应放在 `GfVec3*` 向量运算上下文理解。",
      "File Members operator 索引只负责按名称定位声明，不替代 class 文档、头文件注释或数学/语义说明；同一符号在不同类型上可有不同含义。",
    ],
    terms: [
      ["文件成员索引", "file members index"],
      ["运算符重载", "operator overload"],
      ["输入流解析", "input stream parsing"],
      ["向量运算", "vector operation"],
      ["相等比较", "equality comparison"],
      ["声明来源头文件", "declaring header"],
    ],
  },
  {
    output: "full_site/api/functions_enum.html",
    title: "Class Members - Enumerations",
    summary:
      "`functions_enum.html` 是 Class Members 的 enumerations 总索引，列出类成员 enum type 所在位置；它和 `functions_eval.html` 的 enumerator value 索引互补。阅读时先找 enum 类型，再进入对应 class 页确认每个枚举值含义。",
    notes: [
      "本页跨越 `VdfPullBasedExecutorEngine`、`VdfInputSpec`、`UsdPrimCompositionQuery`、`SdfBooleanExpression`、`TraceEvent` 等类型，反映 enum 用于执行模式、表达式、组合查询和 tracing 分类。",
      "`UsdLuxLightListAPI`、`UsdLuxListAPI`、`UsdShadeConnectableAPIBehavior`、`UsdSkelBakeSkinningParms`、`UsdGeomPointInstancer`、`UsdGeomXformOp` 是用户更常遇到的 schema/geometry 相关 enum 入口。",
      "`HdExtComputation`、`HdStDrawTarget`、`HdSelection`、`HdCollectionExpressionEvaluator`、`UsdImagingPrimAdapter` 等条目偏 Hydra/imaging，需要按渲染管线语境阅读。",
      "enum type 与 enumerator value 不同：本页适合确认枚举定义所在 class，`functions_eval.html` 适合查具体枚举值名称。",
      "中文层保留 `enum`、`enumerator`、class 名和 template 参数原样，避免破坏 Doxygen 字母索引、源码搜索和 API 对照。",
    ],
    terms: [
      ["枚举类型", "enum type"],
      ["枚举值", "enumerator value"],
      ["类成员枚举", "class member enumeration"],
      ["执行模式", "execution mode"],
      ["组合查询", "composition query"],
      ["渲染管线语境", "rendering pipeline context"],
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
      <h2>中文二次索引补强 / Chinese Second-Pass Index Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
