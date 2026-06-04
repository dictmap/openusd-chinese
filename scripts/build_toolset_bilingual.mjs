import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_release_toolset_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "toolset.html");

const pageTerms = new Map([
  ["USD Toolset", "USD 工具集"],
  ["API Documentation", "API 文档"],
  ["Specifications", "规范"],
  ["Terms and Concepts", "术语和概念"],
  ["Toolset", "工具集"],
  ["Previous", "上一页"],
  ["Next", "下一页"],
  ["Learn", "学习"],
  ["Reference", "参考"],
  ["User Guides", "用户指南"],
  ["Proposals", "提案"],
]);

const tools = [
  ["usdedit", "把单个 USD 可读文件临时转成 .usda 文本并用编辑器打开，保存后再写回原格式。", "Converts one USD-readable file to temporary .usda text, opens an editor, then writes changes back."],
  ["usdcat", "把 USD 文件输出为文本或指定输出文件，也可 flatten stage 或 layer stack。", "Writes USD files as text or to output files, with options for flattening stages or layer stacks."],
  ["usddiff", "把两个 USD 可读文件经 usdcat 展开后交给 diff 程序比较。", "Runs a selected diff program on usdcat output for two USD-readable inputs."],
  ["usdview", "交互式查看、诊断和调试 USD stage 的主要图形工具。", "Interactive viewer for inspecting, imaging, diagnosing, and debugging USD stages."],
  ["usdrecord", "从 USD stage 命令行生成单张或序列渲染图像。", "Command-line utility for generating images or image sequences from a USD stage."],
  ["usdresolve", "通过配置好的 USD Asset Resolver 解析资产路径。", "Resolves asset paths through a configured USD Asset Resolver."],
  ["usdtree", "在终端打印 USD layer 或组合后 stage 的树状摘要。", "Prints a terminal tree summary of a USD layer or composed stage."],
  ["usdzip", "创建、检查、列出或导出 USDZ package 内容。", "Creates and inspects USDZ packages and can list or dump package contents."],
  ["usdchecker", "按验证规则检查 USD 或 USDZ 资产的合规性和可交换性。", "Checks USD or USDZ assets against validation rules for compliance and interchange."],
  ["usdfixbrokenpixarschemas", "尝试修复旧 Pixar schema 命名造成的 USD layer 问题。", "Attempts to fix USD layers affected by older Pixar schema naming issues."],
  ["usdstitch", "把多个 USD 文件按时间样本聚合到一个输出文件中。", "Aggregates multiple USD files into one output, commonly by merging time samples."],
  ["usdstitchclips", "为文件序列生成 Value Clips 聚合表示和相关拓扑/clip 元数据。", "Builds a Value Clips aggregate representation for file sequences."],
  ["usddumpcrate", "检查 Crate/usdc 编码文件并输出底层结构信息。", "Reports low-level information for USD files encoded with Crate/usdc."],
  ["sdfdump", "输出 Sdf Layer 的调试或结构信息。", "Provides diagnostic and structural information about Sdf layers."],
  ["sdffilter", "以多种格式过滤并展示 Sdf Layer 内容。", "Filters and presents Sdf layer information in several formats."],
  ["usdmeasureperformance", "批量运行 usdview/testusdview 以测量资产加载、渲染或交互性能。", "Measures asset performance by repeatedly invoking usdview/testusdview workflows."],
  ["usdGenSchema", "根据 schema.usda 生成 USD schema 类代码。", "Generates USD schema class code from schema.usda."],
  ["usdgenschemafromsdr", "从 SDR 节点描述生成 codeless schema 或 schema.usda 相关文件。", "Generates codeless schemas or schema.usda-related files from SDR node descriptions."],
  ["usdInitSchema", "初始化新的 schema 模块目录和模板文件。", "Initializes a new schema module directory and template files."],
];

const toolOptionGuides = [
  {
    name: "usdedit",
    items: [
      ["-n / --noeffect", "只生成临时文本文件而不回写，适合先检查转换结果。", "Creates the temporary text file without writing edits back."],
      ["-f / --forcewrite", "在输出文件看起来没有变化时仍强制写回。", "Forces a write even when the output appears unchanged."],
      ["-p / --prefix", "指定临时文件名前缀，便于在临时目录中识别本次编辑产物。", "Sets the temporary filename prefix for easier identification."],
    ],
  },
  {
    name: "usdcat",
    items: [
      ["-o / --out", "把单个输入写到指定输出文件，而不是输出到 stdout。", "Writes a single input to the specified output file instead of stdout."],
      ["--flatten", "输出组合后的 Stage，适合查看最终意见解析结果。", "Writes the composed stage, useful for inspecting final resolved opinions."],
      ["--flattenLayerStack", "只扁平化 LayerStack，不等同于完整 Stage flatten。", "Flattens the layer stack without performing a full stage flatten."],
      ["--mask", "只打开指定 prim path 子树，便于裁剪大型 Stage。", "Opens only the selected prim path subtree for focused inspection."],
      ["--usdFormat", "选择输出 USD 文本格式变体，flag 名和取值保持官方原样。", "Selects the USD output format variant while preserving official values."],
    ],
  },
  {
    name: "usdview",
    items: [
      ["--renderer / -r", "选择 Hydra renderer 后端，如 Storm、Embree、RenderMan RIS、RenderMan XPU 或 GL。", "Selects the Hydra renderer backend."],
      ["--select", "启动后选中指定 prim path，适合直达诊断目标。", "Selects the requested prim path on launch."],
      ["--camera", "指定用于初始视图或渲染上下文的相机。", "Sets the camera used for the initial view or imaging context."],
      ["--mask", "只打开指定 prim path 集合，减少加载与浏览范围。", "Limits the opened stage to selected prim paths."],
      ["--unloaded", "打开 Stage 时不加载 payload，适合先查看结构。", "Opens the stage without loading payloads."],
      ["--norender", "只显示层级浏览，不启动渲染视图。", "Shows only the hierarchy browser without rendering."],
      ["--noplugins", "不加载插件，便于排查插件造成的问题。", "Disables plugins for plugin-related troubleshooting."],
    ],
  },
  {
    name: "usdrecord",
    items: [
      ["--mask", "限定渲染或加载的 prim path 范围。", "Restricts imaging or loading to selected prim paths."],
      ["--purposes", "选择参与成像的 purpose，例如 default、render、proxy 或 guide。", "Chooses which purposes participate in imaging."],
      ["--sessionLayer", "叠加 session layer，用于临时 variant、visibility 或调试意见。", "Adds a session layer for temporary variants, visibility, or debug opinions."],
      ["--disableGpu", "禁用 GPU 渲染路径，适合排查硬件或驱动差异。", "Disables the GPU path for hardware or driver comparison."],
      ["--frames", "指定输出单帧或帧序列的时间采样。", "Selects the frame or frame sequence to output."],
      ["--imageWidth", "指定输出图像宽度，高度按相机或设置推导。", "Sets output image width; height follows camera or render settings."],
    ],
  },
  {
    name: "usdresolve",
    items: [
      ["--createContextForAsset", "基于某个资产创建 resolver context。", "Creates a resolver context for an asset."],
      ["--createContextFromString", "从字符串创建 resolver context，可重复指定。", "Creates resolver contexts from strings and may be repeated."],
      ["--anchorPath", "按锚定资产路径解析相对路径。", "Resolves a relative path against an anchor asset path."],
    ],
  },
  {
    name: "usdtree",
    items: [
      ["--unloaded", "不加载 payload，只查看未加载结构。", "Avoids loading payloads while printing structure."],
      ["--flatten", "显示组合后的 Stage 树，而不是单个 Layer 结构。", "Shows the composed stage tree instead of a single layer view."],
      ["--attributes", "在树中显示属性信息。", "Includes attributes in the printed tree."],
      ["--metadata", "在树中显示 metadata。", "Includes metadata in the printed tree."],
      ["--simple", "输出更紧凑的树状摘要。", "Prints a more compact tree summary."],
    ],
  },
  {
    name: "usdzip",
    items: [
      ["-r / --recurse", "递归加入子目录文件。", "Recursively adds files from subdirectories."],
      ["-a / --asset", "指定要作为 package 中资产入口的文件。", "Selects the asset entry file for the package."],
      ["--arkitAsset", "按 ARKit 资产需求构建 package。", "Builds the package for ARKit asset requirements."],
      ["-c / --checkCompliance", "创建或检查 package 时运行合规检查。", "Runs compliance checks while creating or inspecting a package."],
      ["-d / --dump", "导出或列出 package 内容用于检查。", "Dumps or lists package contents for inspection."],
    ],
  },
  {
    name: "usdchecker",
    items: [
      ["--includeKeywords", "只运行指定 keyword 对应的 validators。", "Runs only validators matching the included keywords."],
      ["--excludeKeywords", "排除指定 keyword 对应的 validators。", "Skips validators matching the excluded keywords."],
      ["--rootPackageOnly", "只检查 root package，不递归检查所有依赖 package。", "Checks only the root package rather than all dependent packages."],
      ["--arkit", "按 ARKit 相关规则检查资产。", "Applies ARKit-related validation rules."],
      ["--skipVariants", "跳过 variant 组合展开检查以节省时间。", "Skips variant traversal to reduce validation cost."],
      ["-t / --strict", "把 warning 也作为失败返回码处理。", "Treats warnings as failing exit status."],
    ],
  },
  {
    name: "usddiff",
    items: [
      ["-n / --noeffect", "只生成用于比较的中间内容，不实际编辑输入文件。", "Creates intermediate comparison output without editing either input file."],
      ["-f / --flatten", "把两个输入都完整组合为 Usd Stage 后再 flatten 成单层参与比较。", "Fully composes both inputs as Usd stages and flattens them before diffing."],
      ["-q / --brief", "只返回简短 diff 结果，并把 --brief 传给底层 diff 命令。", "Returns a brief diff result and passes --brief to the diff command."],
    ],
  },
  {
    name: "usdfixbrokenpixarschemas",
    items: [
      ["--backup", "指定备份文件路径；未指定时会按输入文件位置创建默认备份。", "Sets the backup file path; otherwise a default backup is created beside the input."],
      ["-v / --verbose", "输出更详细的修复过程信息。", "Enables verbose output for the fixing process."],
    ],
  },
  {
    name: "usdstitch",
    items: [
      ["-o / --out", "指定聚合后的输出文件路径。", "Sets the output file for the stitched result."],
      ["usdFiles", "输入文件顺序决定意见强度；越靠后的文件意见越强。", "Input file order controls opinion strength, with later files being stronger."],
    ],
  },
  {
    name: "usdstitchclips",
    items: [
      ["-o / --out", "指定顶层结果文件。", "Sets the top-level result file."],
      ["-c / --clipPath", "指定 clips 作用的 prim path。", "Sets the prim path targeted by the clips."],
      ["-s / --startTimeCode", "指定聚合起始 TimeCode。", "Sets the starting TimeCode for aggregation."],
      ["-r / --stride", "指定帧步长，用于稀疏采样文件序列。", "Sets the stride for sampling the file sequence."],
      ["-t", "生成 template clip metadata。", "Generates template clip metadata."],
      ["--clipSet", "指定 clip set 名称。", "Sets the clip set name."],
    ],
  },
  {
    name: "usddumpcrate",
    items: [
      ["-s / --summary", "只输出简短摘要，适合快速确认 Crate/usdc 文件结构。", "Reports only a short summary for quick Crate/usdc inspection."],
      ["inputFiles", "可一次传入多个 Crate/usdc 文件进行底层结构检查。", "Accepts multiple Crate/usdc input files for low-level inspection."],
    ],
  },
  {
    name: "sdfdump",
    items: [
      ["-s / --summary", "输出高层摘要，不展开所有字段值。", "Reports a high-level summary without expanding all field values."],
      ["--validate", "尝试读取所有数据值以检查 layer 数据有效性。", "Checks validity by trying to read all data values."],
      ["-p / --path", "只报告匹配 regex 的路径。", "Reports only paths matching the regex."],
      ["-f / --field", "只报告匹配 regex 的字段。", "Reports only fields matching the regex."],
      ["-t / --time", "只报告指定 time 或 time range 的 timeSamples 字段。", "Reports only requested times or time ranges for timeSamples fields."],
      ["--sortBy", "按 path 或 field 对输出分组。", "Groups output by path or field."],
      ["--noValues", "不输出字段值，只查看结构。", "Suppresses field values for structural inspection."],
    ],
  },
  {
    name: "sdffilter",
    items: [
      ["-p / --path", "只保留匹配 regex 的路径。", "Keeps only paths matching the regex."],
      ["-f / --field", "只保留匹配 regex 的字段。", "Keeps only fields matching the regex."],
      ["-t / --time", "只保留指定 time 或 time range 的 timeSamples。", "Keeps only requested times or time ranges for timeSamples."],
      ["--timeTolerance", "按相对容差匹配接近请求时间的采样。", "Matches time samples close to requested times within a relative tolerance."],
      ["--arraySizeLimit", "截断超过指定元素数的数组输出。", "Truncates arrays above the selected element count."],
      ["--timeSamplesSizeLimit", "截断超过指定数量的 timeSamples 输出。", "Truncates timeSamples above the selected value count."],
      ["--sortBy", "按 path 或 field 对 outline 输出分组。", "Groups outline output by path or field."],
      ["--noValues", "不输出字段值，适合只看筛选后的结构。", "Suppresses field values for structure-only filtered output."],
    ],
  },
  {
    name: "usdmeasureperformance",
    items: [
      ["-o / --output", "指定 metrics 输出文件。", "Sets the metrics output file."],
      ["-i / --iterations", "指定重复测量次数。", "Sets the number of measurement iterations."],
      ["-a / --aggregation", "选择 min、mean、max 等聚合方式。", "Selects aggregations such as min, mean, or max."],
      ["-c / --custom-metrics", "追加自定义 testusdview timing metrics。", "Adds custom testusdview timing metrics."],
      ["--traceDir", "输出 trace 文件目录，便于后续性能分析。", "Writes trace files to a directory for later performance analysis."],
    ],
  },
  {
    name: "usdGenSchema",
    items: [
      ["-v / --validate", "只验证生成文件是否与源 schema 保持一致。", "Validates that generated files remain consistent with the source schema."],
      ["-q / --quiet", "减少命令输出。", "Reduces command output."],
      ["-n / --namespace", "指定生成代码使用的 namespace。", "Sets namespaces used by generated code."],
      ["-t / --templates", "指定自定义模板路径。", "Selects a custom templates path."],
    ],
  },
  {
    name: "usdgenschemafromsdr",
    items: [
      ["--noreadme", "不在 schemaGenerationPath 中生成说明来源的 README.md。", "Skips README.md generation in the schemaGenerationPath."],
      ["-v / --validate", "把验证请求传给 usdGenSchema，确认生成源文件未变化。", "Passes validation through to usdGenSchema to verify generated sources."],
      ["schemaConfig", "指定 SDR 节点配置文件；未指定时按官方默认查找。", "Sets the SDR node config file; official defaults apply when omitted."],
      ["schemaGenerationPath", "指定生成 schema.usda、generatedSchema.usda 和 plugInfo.json 的目录。", "Sets the directory for generated schema.usda, generatedSchema.usda, and plugInfo.json."],
    ],
  },
  {
    name: "usdInitSchema",
    items: [
      ["-v / --validate", "验证初始化或生成结果。", "Validates initialized or generated outputs."],
      ["-q / --quiet", "减少初始化过程输出。", "Reduces initialization output."],
      ["--genModuleDeps", "生成模块依赖相关文件。", "Generates module dependency files."],
      ["-t / --templates", "指定初始化模板路径。", "Selects the template path for initialization."],
    ],
  },
];

const toolScenarioGuides = [
  {
    key: "inspect",
    zhTitle: "资产检查与快速诊断",
    enTitle: "Asset inspection and quick diagnosis",
    commands: ["usdtree", "usdview", "usdchecker"],
    zh: "先用 usdtree 快速查看层级和属性，再用 usdview 交互式定位问题，最后用 usdchecker 做合规与可交换性检查。",
    en: "Use usdtree for a quick hierarchy and attribute pass, usdview for interactive diagnosis, and usdchecker for compliance and interchange checks.",
  },
  {
    key: "export",
    zhTitle: "文本查看、对比与扁平化导出",
    enTitle: "Text inspection, diffing, and flattened export",
    commands: ["usdcat", "usddiff", "usdedit"],
    zh: "用 usdcat 输出文本或 flatten 结果，用 usddiff 比较两个 USD 输入，需要临时修订时再用 usdedit 打开可编辑文本。",
    en: "Use usdcat for text or flattened output, usddiff to compare two USD inputs, and usdedit for temporary text-based editing.",
  },
  {
    key: "package",
    zhTitle: "USDZ 打包与交付前检查",
    enTitle: "USDZ packaging and pre-delivery checks",
    commands: ["usdzip", "usdchecker", "usdresolve"],
    zh: "打包前可用 usdresolve 确认资产路径解析，usdzip 生成或检查 USDZ，usdchecker 验证交付资产是否满足目标规则。",
    en: "Before packaging, use usdresolve to confirm asset resolution, usdzip to create or inspect USDZ packages, and usdchecker for delivery validation.",
  },
  {
    key: "clips",
    zhTitle: "时间采样聚合与 Value Clips",
    enTitle: "Time-sample aggregation and Value Clips",
    commands: ["usdstitch", "usdstitchclips", "usdcat"],
    zh: "usdstitch 适合把多个文件中的 timeSamples 合并到一个结果；usdstitchclips 适合把文件序列组织成 Value Clips，再用 usdcat 检查生成的 layer。",
    en: "Use usdstitch to merge time samples into one result, usdstitchclips to organize file sequences as Value Clips, and usdcat to inspect the generated layer.",
  },
  {
    key: "schema",
    zhTitle: "Schema 模块初始化与生成",
    enTitle: "Schema module initialization and generation",
    commands: ["usdInitSchema", "usdGenSchema", "usdgenschemafromsdr"],
    zh: "用 usdInitSchema 初始化 schema 模块结构，usdGenSchema 从 schema.usda 生成代码，usdgenschemafromsdr 从 SDR 节点描述生成 codeless schema 相关文件。",
    en: "Use usdInitSchema to initialize a schema module, usdGenSchema to generate code from schema.usda, and usdgenschemafromsdr for codeless schema files from SDR nodes.",
  },
  {
    key: "performance",
    zhTitle: "性能测量与底层结构排查",
    enTitle: "Performance measurement and low-level inspection",
    commands: ["usdmeasureperformance", "usddumpcrate", "sdfdump", "sdffilter"],
    zh: "用 usdmeasureperformance 做加载或交互性能测量；遇到底层 layer 或 Crate 结构问题时，用 usddumpcrate、sdfdump 和 sdffilter 逐层缩小范围。",
    en: "Use usdmeasureperformance for loading or interaction metrics, then usddumpcrate, sdfdump, and sdffilter to narrow low-level layer or Crate issues.",
  },
];

const toolDeepOptionNotes = [
  {
    name: "usdchecker",
    items: [
      ["--includeKeywords / --excludeKeywords", "先用 keyword 缩小 validator 集合，适合在大型资产上定位某一类合规问题；不要改写 validator 名称或 keyword。", "Use keywords to narrow the validator set when diagnosing one class of compliance issues on large assets; keep validator names and keywords unchanged."],
      ["--rootPackageOnly / --arkit", "做 USDZ 交付检查时先确认是否只看 root package，再决定是否叠加 ARKit 规则，避免把依赖包递归成本误认为资产本体问题。", "For USDZ delivery checks, decide whether to inspect only the root package before adding ARKit rules, so dependency-package cost is not confused with the root asset issue."],
      ["--skipVariants / --strict", "variant 组合很多时可先跳过 variants 取得快速结果；最终交付前再取消跳过，并用 --strict 把 warning 纳入失败判断。", "When variants are numerous, skip variants for an early pass; before delivery, run without skipping and use --strict so warnings affect failure status."],
    ],
  },
  {
    name: "usdstitchclips",
    items: [
      ["-c / --clipPath", "clipPath 应指向要用 Value Clips 聚合的稳定 prim；如果每个输入文件层级不一致，先用 usdtree 或 usdcat 对齐结构。", "clipPath should target the stable prim aggregated by Value Clips; if input hierarchies differ, first align structure with usdtree or usdcat."],
      ["-s / --startTimeCode / -e / --endTimeCode", "时间窗口决定生成 clip metadata 的覆盖范围，适合先用小窗口验证，再扩大到完整序列。", "The time window controls the clip metadata coverage; validate with a small window first, then expand to the full sequence."],
      ["-r / --stride / -t", "stride 用于稀疏采样输入序列；需要 template clip metadata 时保留 -t，并检查生成层是否仍能被 usdcat 正常展开。", "Use stride for sparse sampling of the input sequence; keep -t when template clip metadata is needed, then verify the generated layer with usdcat."],
    ],
  },
  {
    name: "sdfdump",
    items: [
      ["-s / --summary / --noValues", "先用 summary 或 noValues 查看结构轮廓，避免大型数组、timeSamples 或 metadata 值把诊断输出淹没。", "Start with summary or noValues for structural shape, avoiding large arrays, timeSamples, or metadata values overwhelming diagnostic output."],
      ["-p / --path / -f / --field", "path 与 field regex 可以组合使用，用来只看某个 prim 子树或某一类字段，适合排查 layer 级 opinion 来源。", "Path and field regex filters can be combined to inspect a prim subtree or a class of fields while tracing layer-level opinions."],
      ["-t / --time / --sortBy", "排查 timeSamples 时先限定时间点或时间段，再按 path 或 field 分组，输出会更容易和原始层结构对应。", "When inspecting timeSamples, limit the time point or range first, then group by path or field so output maps back to the source layer more clearly."],
    ],
  },
  {
    name: "sdffilter",
    items: [
      ["-p / --path / -f / --field", "过滤条件应尽量从 path 开始再加 field，便于保留上下文，不把同名字段从无关 prim 中混进结果。", "Prefer path filters before field filters to preserve context and avoid mixing same-named fields from unrelated prims."],
      ["-t / --time / --timeTolerance", "时间过滤适合抽查动画采样；timeTolerance 用于处理接近但不完全相等的采样时间。", "Time filters are useful for animation-sample spot checks; timeTolerance handles samples that are close but not exactly equal to requested times."],
      ["--arraySizeLimit / --timeSamplesSizeLimit", "限制大型数组和 timeSamples 输出，能让本地复刻页保留官方长说明，同时给中文层提供可读的诊断入口。", "Limit large arrays and timeSamples output so the local page can preserve official long descriptions while the Chinese layer remains readable."],
    ],
  },
  {
    name: "usdgenschemafromsdr",
    items: [
      ["schemaConfig", "schemaConfig 控制从哪些 SDR 节点生成 schema；未指定时沿用官方默认查找路径，文件名和字段名保持英文。", "schemaConfig controls which SDR nodes generate schemas; when omitted, official default lookup applies, with file and field names kept in English."],
      ["schemaGenerationPath / --noreadme", "schemaGenerationPath 是生成 schema.usda、generatedSchema.usda 和 plugInfo.json 的落点；--noreadme 只影响说明文件生成。", "schemaGenerationPath is the output location for schema.usda, generatedSchema.usda, and plugInfo.json; --noreadme only affects README generation."],
      ["-v / --validate", "validate 适合放进自动化链路，用来确认由 SDR 派生的 schema 产物没有意外漂移。", "validate belongs in automation chains to confirm SDR-derived schema outputs have not drifted unexpectedly."],
    ],
  },
  {
    name: "usdInitSchema",
    items: [
      ["--genModuleDeps", "初始化 schema 模块时如需模块依赖文件，启用 --genModuleDeps；模块名、namespace 和生成文件名保持官方约定。", "Enable --genModuleDeps when module dependency files are needed during schema module initialization; keep module names, namespaces, and generated filenames in official form."],
      ["-t / --templates", "指定 templates 时应和项目现有 schema 生成模板保持一致，避免本地复刻层引入新的命名风格。", "When specifying templates, align with the project's existing schema-generation templates so the local overlay does not introduce a new naming style."],
      ["-v / --validate / -q / --quiet", "validate 用于自动化验收，quiet 用于减少日志噪声；两者不改变初始化产物的英文 API 名称。", "Use validate for automated acceptance and quiet to reduce log noise; neither changes English API names in initialized outputs."],
    ],
  },
];

const toolDeepOptionNoteMap = new Map(toolDeepOptionNotes.map((entry) => [entry.name, entry.items]));

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function htmlPair(en) {
  const zh = pageTerms.get(en);
  if (!zh) return en;
  return `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>`;
}

function titlePair(en) {
  const zh = pageTerms.get(en);
  return zh ? `${zh} / ${en}` : en;
}

function applyPageTerms(html) {
  const sortedTerms = [...pageTerms.keys()].sort((a, b) => b.length - a.length);
  for (const en of sortedTerms) {
    const pattern = new RegExp(`>(\\s*)${escapeRegex(en)}(\\s*)<`, "g");
    html = html.replace(pattern, (_match, before, after) => `>${before}${htmlPair(en)}${after}<`);
  }

  html = html.replace(/title="([^"]+)"/g, (match, title) => {
    if (!pageTerms.has(title)) return match;
    return `title="${titlePair(title)}"`;
  });

  return html;
}

function toolsetSummaryBlock() {
  const scenarios = toolScenarioGuides.map((scenario) => {
    const commands = scenario.commands.map((command) => `<code>${command}</code>`).join(" ");
    return `<div class="cn-tool-scenario" data-scenario="${scenario.key}">
<div class="title"><span class="zh">${scenario.zhTitle}</span><span class="en">${scenario.enTitle}</span></div>
<div class="commands">${commands}</div>
<p class="zh">${scenario.zh}</p>
<p class="en">${scenario.en}</p>
</div>`;
  }).join("\n");

  const cards = tools.map(([name, zh, en]) => {
    return `<div class="cn-tool-card"><div class="command">${name}</div><p class="zh">${zh}</p><p class="en">${en}</p></div>`;
  }).join("\n");

  return `<div class="cn-toolset-summary">
<h2><span class="cn-term">命令速览</span><span class="en-term">Command Quick Map</span></h2>
<p class="zh">本页保留官方命令用法、选项和示例文本，命令名与 CLI flag 不翻译；中文层用于快速理解每个工具的用途，并为 ${toolOptionGuides.length} 个高频命令补充选项导读。</p>
<p class="en">This page preserves the official command usage, options, and examples. Command names and CLI flags remain untranslated; the Chinese layer gives quick intent for each tool, option guides for ${toolOptionGuides.length} high-frequency commands, and focused long-option reading notes for ${toolDeepOptionNotes.length} dense tools.</p>
<div class="cn-tool-scenarios">
<h3><span class="cn-term">工作流场景导读</span><span class="en-term">Workflow Scenario Guide</span></h3>
${scenarios}
</div>
<div class="cn-tool-grid">
${cards}
</div>
</div>`;
}

function toolDeepOptionNoteBlock(name, items) {
  const rows = items.map(([focus, zh, en]) => {
    return `<li><code>${focus}</code><span class="zh">${zh}</span><span class="en">${en}</span></li>`;
  }).join("\n");

  return `<div class="cn-tool-deep-note" data-command="${name}">
<p class="label"><span class="cn-term">长选项说明导读</span><span class="en-term">Long-option reading notes</span></p>
<ul>
${rows}
</ul>
</div>`;
}

function toolOptionGuideBlock(name, items) {
  const rows = items.map(([flag, zh, en]) => {
    return `<li><code>${flag}</code><span class="zh">${zh}</span><span class="en">${en}</span></li>`;
  }).join("\n");

  return `<div class="cn-tool-options" data-command="${name}">
<p class="label"><span class="cn-term">高频选项导读</span><span class="en-term">High-frequency option guide</span></p>
<ul>
${rows}
</ul>
</div>`;
}

function addToolOptionGuides(html) {
  let inserted = 0;
  for (const { name, items } of toolOptionGuides) {
    const pattern = new RegExp(`(<div class="cn-tool-brief"><p class="zh">[\\s\\S]*?<\\/div>\\n<p>|<div class="cn-tool-brief"><p class="zh">[\\s\\S]*?<\\/div>\\n<div class="highlight-none notranslate">)`);
    const sectionPattern = new RegExp(`(<section id="${escapeRegex(name.toLowerCase())}">[\\s\\S]*?)${pattern.source}`);
    if (!sectionPattern.test(html)) {
      console.warn(`Skipped missing tool option guide target: ${name}`);
      continue;
    }
    html = html.replace(sectionPattern, (_match, sectionStart, briefAndNext) => {
      inserted += 1;
      const deepNoteItems = toolDeepOptionNoteMap.get(name);
      const deepNoteBlock = deepNoteItems ? `${toolDeepOptionNoteBlock(name, deepNoteItems)}\n` : "";
      return `${sectionStart}${briefAndNext.replace("</div>\n", `</div>\n${toolOptionGuideBlock(name, items)}\n${deepNoteBlock}`)}`;
    });
  }
  return { html, inserted };
}

function addToolBriefs(html) {
  for (const [name, zh, en] of tools) {
    const heading = new RegExp(`(<h2>${escapeRegex(name)}<a class="headerlink" href="#${escapeRegex(name.toLowerCase())}" title="Link to this heading">.*?</a></h2>)`, "s");
    const brief = `$1\n<div class="cn-tool-brief"><p class="zh">${zh}</p><p class="en">${en}</p></div>`;
    html = html.replace(heading, brief);
  }
  return html;
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated adjacent bilingual toolset entry from source/openusd_release_toolset_source.html. Source URL: https://openusd.org/release/toolset.html -->\n${html}`;
html = html.replace('<html class="writer-html5" lang="en" data-content_root="./">', '<html class="writer-html5" lang="zh-CN" data-content_root="./">');
html = html.replace(
  "<title>USD Toolset &mdash; Universal Scene Description 26.05 documentation</title>",
  "<title>USD 工具集 / USD Toolset &mdash; Universal Scene Description 26.05 documentation</title>",
);
html = html.replace(
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />',
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />\n      <link rel="stylesheet" type="text/css" href="openusd_release_cn.css" />',
);
html = html.replace('placeholder="Search docs" aria-label="Search docs"', 'placeholder="搜索文档 / Search docs" aria-label="Search docs"');
html = html.replaceAll("https://openusd.org/images/USDIcon.ico", "images/USDIcon.ico");
html = html.replaceAll("https://openusd.org/images/USDLogoUnsized.svg", "images/USDLogoUnsized.svg");
html = html.replaceAll("https://openusd.org/images/piper-banner.jpg", "images/piper-banner.jpg");
html = html.replaceAll('href="index.html"', 'href="release_index.html"');
html = applyPageTerms(html);
html = html.replace(
  '<div itemprop="articleBody">',
  `<div itemprop="articleBody">
<div class="cn-repro-scope admonition note">
<p class="admonition-title"><span class="cn-term">工具集相邻入口双语覆盖</span><span class="en-term">Toolset adjacent-entry bilingual overlay</span></p>
<p class="zh">本页是 release Reference 的命令行工具入口。当前保留官方用法块、选项名、命令名和链接结构，补中文命令速览与每个工具小节的中文说明。</p>
<p class="en">This page is the command-line tool entry in the release Reference section. It preserves official usage blocks, option names, command names, and links while adding a Chinese command map and per-tool briefs.</p>
</div>
${toolsetSummaryBlock()}`,
);
html = addToolBriefs(html);
const optionGuideResult = addToolOptionGuides(html);
html = optionGuideResult.html;
html = html.replace(
  "</footer>",
  '<p class="cn-footer-note">中文双语复刻层：工具集入口页，本地学习用途，官方命令用法、选项和链接保留。 / Bilingual toolset-entry layer for local study; official command usage, options, and links are preserved.</p>\n</footer>',
);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  output: outputPath,
  toolCount: tools.length,
  scenarioGuides: toolScenarioGuides.length,
  deepOptionNotes: toolDeepOptionNotes.length,
  pageTermCount: pageTerms.size,
  optionGuides: optionGuideResult.inserted,
}, null, 2));
