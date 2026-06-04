import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-042";

const refinements = [
  {
    output: "full_site/api/class_sdf_usdz_file_format.html",
    title: "SdfUsdzFileFormat Class Reference",
    notes: [
      "`SdfUsdzFileFormat` 是处理 package `.usdz` 文件的 Sdf file format 类，核心职责是把 USDZ package 当作可读写的 layer/file format 入口。",
      "英文摘录将它概括为 package `.usdz` files 的 file format；页面结构中的 `CanRead()`、`Read()`、`ReadFromString()` 与 `WriteToFile()` 等方法说明它覆盖读取、字符串输入和写出路径。",
      "`GetPackageRootLayerPath()` 用于从 package 中定位 root layer；`IsPackage()` 用来判断该 file format 是否代表 package 语义，这两点是区别普通 `.usd/.usda/.usdc` 文件格式的关键。",
      "`_ReadDetached()`、`InitData()` 和 protected attributes 反映该类仍遵循 `SdfFileFormat` 插件接口，只是额外承担 USDZ package 的初始化、路径解析和离线读取逻辑。",
      "阅读本页时应把 `SdfUsdzFileFormat` 放在 asset/package I/O 语境下理解：它不是 stage API，而是 `SdfLayer` 底层文件格式插件的一部分。"
    ],
    terms: [
      ["SdfUsdzFileFormat", "SdfUsdzFileFormat"],
      ["file format", "文件格式"],
      ["package .usdz", "package .usdz"],
      ["root layer", "根 layer"],
      ["SdfLayer I/O", "SdfLayer 输入输出"]
    ]
  },
  {
    output: "full_site/api/class_sdr_shader_property.html",
    title: "SdrShaderProperty Class Reference",
    notes: [
      "`SdrShaderProperty` 表示 `SdrShaderNode` 上的一个 property，可以是 input 或 output，用来描述 shader 节点接口中的类型、默认值、metadata 和连接能力。",
      "英文摘录强调 property 必须有 name 与 type，也可以携带更多 metadata；`CanConnectTo()` 则用于判断另一个 `SdrShaderProperty` 是否可以连接到当前 property。",
      "`GetDefaultValue()`、`GetDefaultValueAsSdfType()`、`GetArraySize()` 和 `GetTypeAsSdfType()` 是读取值类型与默认值转换的重点方法，适合与 USD/Sdf 类型系统对照阅读。",
      "`GetHelp()`、`GetHints()`、`GetLabel()`、`GetMetadata()` 和 `GetInfoString()` 面向 UI、文档和 renderer/plugin 集成；它们不是计算 shader 输出，而是描述接口元数据。",
      "页面提到 `SdrTokenMap` metadata 已弃用并推荐 `SdrShaderPropertyMetadata`；后续维护材质节点描述时应优先使用新的 metadata 枚举/键。"
    ],
    terms: [
      ["SdrShaderProperty", "SdrShaderProperty"],
      ["SdrShaderNode", "SdrShaderNode"],
      ["input or output", "输入或输出"],
      ["metadata", "元数据"],
      ["connectability", "可连接性"]
    ]
  },
  {
    output: "full_site/api/class_usd_validation_error.html",
    title: "UsdValidationError Class Reference",
    notes: [
      "`UsdValidationError` 是 validation task 返回的错误实体，通常与某个 `UsdValidationValidator` 关联，用于把校验发现结构化返回给调用方。",
      "英文摘录列出 error name、`UsdValidationErrorType` severity、`UsdValidationErrorSites`、message 等信息；这些字段共同构成错误定位、严重程度和可读说明。",
      "`GetIdentifier()`、`GetName()`、`GetType()`、`GetSites()`、`GetMessage()` 和 `GetErrorAsString()` 是消费校验结果时最常用的读取入口。",
      "页面还包含 fixer 查询方法，例如 `GetFixerByName()`、`GetFixersByKeywords()`、`GetFixersByErrorName()`；这说明 error 不只是报告，也可能连接到自动修复策略。",
      "阅读本页时应把 validation error 看作可传递、可格式化、可查询 fixer 的结果对象，而不是 validator 本身；真正执行校验逻辑的是关联的 validator。"
    ],
    terms: [
      ["UsdValidationError", "UsdValidationError"],
      ["validation task", "校验任务"],
      ["severity", "严重程度"],
      ["error sites", "错误位置"],
      ["fixer", "修复器"]
    ]
  },
  {
    output: "full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html",
    title: "UsdVolParticleFieldSphericalHarmonicsAttributeAPI Class Reference",
    notes: [
      "`UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 是与 `ParticleField` 相关的 applied schema，用球谐系数属性描述粒子的 radiance。",
      "英文摘录说明 spherical harmonics degree 在整个 `ParticleField` 中保持常量；系数属性同时提供 float 与 half 版本，数据消费者应在可用时优先使用 float 版本。",
      "`CreateRadianceSphericalHarmonicsDegreeAttr()` 与 `GetRadianceSphericalHarmonicsDegreeAttr()` 管理 SH degree；degree 会决定每个粒子的系数元素数。",
      "`CreateRadianceSphericalHarmonicsCoefficientsAttr()`、`CreateRadianceSphericalHarmonicsCoefficientshAttr()` 及对应 getter 管理 float/half 系数数组，长度应与 position 数据长度乘以每粒子元素数匹配。",
      "`Apply()`、`CanApply()` 和 `schemaType` 说明这是可应用到 prim 上的 API schema；阅读时应把属性名、数学符号和数组长度约束与 volume/particle 数据布局一起核对。"
    ],
    terms: [
      ["applied schema", "可应用 schema"],
      ["ParticleField", "ParticleField"],
      ["spherical harmonics", "球谐"],
      ["radiance", "辐射亮度"],
      ["half coefficients", "half 系数"]
    ]
  },
  {
    output: "full_site/api/class_vdf_context.html",
    title: "VdfContext Class Reference",
    notes: [
      "`VdfContext` 是传给 computation callbacks 的 parameter bundle，也是计算函数访问输入值的唯一 API。",
      "英文摘录强调函数只能通过 context 访问 inputs；因此 `GetInputValue()`、`GetInputValuePtr()` 和 `HasInputValue()` 是读取输入的核心入口。",
      "`IsOutputRequested()` 用来判断某个输出是否被请求；`SetOutput()` 和 `SetEmptyOutput()` 用来把计算结果写回 Vdf 执行网络，避免为未请求输出做多余工作。",
      "`CodingError()` 和 `GetNodeDebugName()` 提供错误报告与调试上下文；在复杂 Vdf graph 中，这些方法有助于定位具体 node 和 callback。 ",
      "阅读本页时应把 `VdfContext` 理解为执行期上下文，而不是持久数据容器；它服务于一次 computation 调用的输入读取、输出设置和调试。"
    ],
    terms: [
      ["VdfContext", "VdfContext"],
      ["computation callback", "计算回调"],
      ["input value", "输入值"],
      ["requested output", "被请求的输出"],
      ["Vdf graph", "Vdf 图"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、读取重点、关键属性/方法分组和术语对照；英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, reading guidance, key attribute/method groups, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, attribute names, template parameters, math symbols, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
