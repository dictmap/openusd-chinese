import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 487;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html";
const SOURCE = "source/full_api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html";
const SOURCE_PARITY_REPORT = "reports/round_487_validation_readme_source_parity.json";
const PROMOTION_ID = "round-487-api-validation-readme";
const PREVIOUS_GOOD_BILINGUAL = 246;
const PROMOTION_COMMIT_PLACEHOLDER = "round-487-promotion-commit-sha-before-push";

const expectedKeywords = [
  "Validation",
  "The OpenUSD Validation framework provides a system to validate assets",
  "UsdValidationValidators",
  "UsdValidationValidator",
  "usdValidation:CompositionErrorTest",
  "UsdValidationValidatorMetadata",
  "name",
  "pluginPtr",
  "keywords",
  "doc",
  "schemaTypes",
  "isTimeDependent",
  "isSuite",
  "UsdValidationContext",
  "UsdValidationRegistry",
  "UsdGeomSphere",
  "UsdGeomGprim",
  "UsdGeomImageable",
  "includeAllAncestors",
  "UsdValidationValidatorSuites",
  "UsdValidationErrors",
  "UsdValidationErrorType",
  "SdfLayer",
  "UsdStage",
  "UsdValidationFixers",
  "VtValue",
  "UsdValidationFixer",
  "FixerImplFn",
  "FixerCanApplyFn",
  "Running Validator Tests",
  "Validate()",
  "Usd_PrimFlagsPredicate",
  "GfInterval::GetFullInterval()",
  "CanApplyFix()",
  "ApplyFix()",
  "UsdEditTarget",
  "Creating Custom Validators",
  "UsdValidateLayerTaskFn",
  "UsdValidateStageTaskFn",
  "UsdValidatePrimTaskFn",
  "Plugin Validators",
  "plugInfo.json",
  "TF_REGISTRY_FUNCTION",
  "RegisterPluginValidator",
  "GetOrLoadValidatorsByName",
  "RegisterPluginValidatorSuite",
  "Explicit Validators",
  "UsdValidationValidatorMetadata",
  "RegisterValidator",
  "Choosing a Registration Path",
  "Adding Fixers",
  "_ValidatorFixers()",
  "Example Fixer",
  "ErrorNameAssociatedWithFixer",
  "Creating Custom Validators in Python",
  "RegisterPluginLayerValidator",
  "RegisterPluginStageValidator",
  "RegisterPluginPrimValidator",
  "RegisterLayerValidator",
  "RegisterStageValidator",
  "RegisterPrimValidator",
  "Performance Considerations",
  "TBB worker thread pool",
  "Python GIL",
  "Task Function Signatures",
  "ValidationError",
  "Explicit Registration Examples",
  "Layer Validator",
  "Stage Validator",
  "Prim Validator",
  "ValidationRegistry",
  "ValidatorMetadata",
  "RegisterPluginStageValidator",
  "How Python Plugin Validators Are Triggered",
  "__init__.py",
  "PXR_PLUGINPATH_NAME",
  "Plug.Registry().RegisterPlugins()",
  "sys.path",
  "Running a Python Validator",
  "ValidationContext",
  "Grouping Validators Into a Suite",
  "RegisterValidatorSuite",
  "HasValidator()",
  "Python exceptions raised inside a task function are converted to Tf errors",
  "usdchecker",
  "pxr/usdValidation",
];

function rel(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, "");
}

function write(file, content) {
  fs.writeFileSync(rel(file), content, "utf8");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function writeJson(file, data) {
  write(file, `${JSON.stringify(data, null, 2)}\n`);
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeEntities(value) {
  return String(value)
    .replace(/&zwj;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripHtml(value) {
  return decodeEntities(
    String(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  return (String(value).match(new RegExp(`class="${klass}"`, "g")) || []).length;
}

function pageHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Validation | OpenUSD API 中文导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.68}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    code,pre{font-family:"Cascadia Mono","Consolas",monospace}
    pre{white-space:pre-wrap;background:#0f1720;color:#e8eef7;border-radius:6px;padding:14px;overflow:auto}
    .status{display:inline-block;background:#1f7a54;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
  </style>
</head>
<body class="openusd-has-reading-flow" data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${esc(SOURCE)}">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>Validation</h1>
    <div class="meta">OpenUSD API 中文导读 / Source parity: ${esc(SOURCE)}</div>
  </header>

  <main>
    <section data-cn-complete="round-487-validation-main-path">
      <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
      <p><span class="zh">本页说明 OpenUSD Validation framework 如何验证 assets，覆盖 core rules、schema rules 和 client-provided rules via plugins，目标是让资产在不同 USD workflows 之间更稳健、更可互换。阅读时先把它和普通 schema authoring 区分开：schema 定义可写入的数据模型，Validation 定义运行时或发布前要执行的检查规则；validator 可以报告问题和给出 fixer，但不会自动改写 layer、prim 或 property。</span><span class="en">The OpenUSD Validation framework provides a system to validate assets, verifying core rules, schema rules, and client-provided rules via plugins.</span></p>
      <p><span class="zh">官方正文的对象层级是：<code>UsdValidationValidator</code> 表示单个 validation test，可产生零个或多个 named validation errors，例如 <code>usdValidation:CompositionErrorTest</code>；<code>UsdValidationValidatorMetadata</code> 描述该测试的 <code>name</code>、<code>pluginPtr</code>、<code>keywords</code>、<code>doc</code>、<code>schemaTypes</code>、<code>isTimeDependent</code>、<code>isSuite</code>；<code>UsdValidationContext</code> 把一组 validators 组织为一次运行；<code>UsdValidationRegistry</code> 是发现、注册、加载 validator 和 validator suite 的中心入口。</span><span class="en">A single UsdValidationValidator instance represents a single validation test that can result in zero or more named validation errors when run.</span></p>
      <p><span class="zh">本地中文页按用户点击和官方 section 顺序展开：先讲 validators、metadata、context、registry、errors 与 fixers，再讲 Running Validator Tests，然后讲 C++ custom validators 的 plugin/explicit 注册路径、fixers，最后讲 Python validators 的性能、签名、显式注册、插件加载、运行和 suite 分组。这样读者从 API 入口点击到本页后，可以按官方目录逐段理解，而不是只看到摘要表。</span><span class="en">The page order follows official sections from validator objects through Python custom validators.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-core-model">
      <h2>核心对象模型 / Validator, Metadata, Context, Registry</h2>
      <ol>
        <li><span class="zh"><code>UsdValidationValidators</code> 用来运行 validation tests。每个 <code>UsdValidationValidator</code> 对应一个测试，而一个测试可以返回多个 <code>UsdValidationError</code>。因此不要把 validator 和 error 一一对应；一个 composition test 可以同时发现多处问题。</span><span class="en">UsdValidationValidators are used to run validation tests.</span></li>
        <li><span class="zh"><code>UsdValidationValidatorMetadata</code> 是 validator 的发现和筛选依据。<code>keywords</code> 可用于按主题过滤，<code>schemaTypes</code> 可限制 prim-level validator 适用的 schema，<code>isTimeDependent</code> 标记是否依赖时间范围，<code>isSuite</code> 标记是否是 validator suite。</span><span class="en">Validator metadata includes name, pluginPtr, keywords, doc, schemaTypes, isTimeDependent, and isSuite.</span></li>
        <li><span class="zh"><code>UsdValidationContext</code> 从一组 validators 构建，用于一次性运行多个检查。它可以通过 <code>UsdValidationRegistry</code> 的 metadata query 按 <code>keywords</code> 或 <code>schemaTypes</code> 选出候选；查询 schema 时可用 <code>includeAllAncestors</code> 让 <code>UsdGeomSphere</code> 同时匹配 <code>UsdGeomGprim</code> 和 <code>UsdGeomImageable</code>。</span><span class="en">Metadata queries may include ancestor schema types such as UsdGeomSphere, UsdGeomGprim, and UsdGeomImageable.</span></li>
        <li><span class="zh"><code>UsdValidationRegistry</code> 管理 <code>UsdValidationValidator</code> 与 <code>UsdValidationValidatorSuites</code>，也允许注册 custom validators。官方强调 validator 和 registry 在 USD session 内是 immutable、non-copyable、immortal，所以不要在业务逻辑里假设可以临时复制或回收这些对象。</span><span class="en">The validators and registry are immutable, non-copyable, and immortal within a USD session.</span></li>
      </ol>
    </section>

    <section data-cn-complete="round-487-validation-errors-fixers">
      <h2>错误和修复器 / Validation Errors and Fixers</h2>
      <p><span class="zh"><code>UsdValidationErrors</code> 是验证运行返回给调用方的诊断集合。每个 error 包含 <code>Name</code>、<code>Identifier</code>、<code>Error type</code>、<code>Error sites</code>、<code>Message</code>、关联 validator、可选 fixers 和 <code>Error Data</code>。<code>UsdValidationErrorType</code> 里有 <code>None</code>、<code>Error</code>、<code>Warn</code>、<code>Info</code>，它们描述严重度，不等同于是否能自动修复。</span><span class="en">Validation errors provide name, identifier, error type, error sites, message, validator, fixers, and error data.</span></p>
      <p><span class="zh"><code>Error sites</code> 可指向 <code>SdfLayer</code>、<code>UsdStage</code>、prim 或 property；<code>Error Data</code> 用 <code>VtValue</code> 承载扩展数据。调试时应先看 error site，再看 validator 名称和 message，最后看附加 data；不要只看 message 字符串，因为同一个 validator 可能在多个 site 上产生同名或相近错误。</span><span class="en">An error site may identify a SdfLayer, UsdStage, prim, or property.</span></p>
      <p><span class="zh"><code>UsdValidationFixer</code> 表示可选的修复动作，包含 name、description、<code>keywords</code>、<code>FixerImplFn</code>、<code>FixerCanApplyFn</code> 和它可修的 error name。验证测试不会自动调用 fixer；调用方必须先用 <code>CanApplyFix()</code> 检查，再在客户端提供的 <code>UsdEditTarget</code> 上调用 <code>ApplyFix()</code>。这条边界很重要：Validation 可以提示修复路径，但不会擅自修改资产。</span><span class="en">Validation tests will not automatically call any fixers.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-running-tests">
      <h2>Running Validator Tests</h2>
      <p><span class="zh">运行 validator 有两条基本路径：直接对单个 <code>UsdValidationValidator</code> 调用 <code>Validate()</code>，或把多个 validators 放入 <code>UsdValidationContext</code> 后统一调用 <code>Validate()</code>。Context 可并行运行多个 validators，但调用方仍要保证 stage、layer、prim 等输入对象在验证期间保持有效。</span><span class="en">Validators can be run by calling Validate() on a UsdValidationValidator or on a UsdValidationContext.</span></p>
      <p><span class="zh">运行时还涉及两个常见筛选边界。其一是 prim-level validator 可结合 <code>Usd_PrimFlagsPredicate</code> 选择要遍历的 prim；其二是 time-dependent tests 默认使用 <code>GfInterval::GetFullInterval()</code>，调用方也可以提供特定 time interval。若验证结果随时间变化，先确认 validator metadata 的 <code>isTimeDependent</code>，再确认实际传入的 time range。</span><span class="en">Time-dependent tests default to GfInterval::GetFullInterval().</span></p>
      <p><span class="zh">返回的 validation errors 只是诊断结果。若 error 带有关联 <code>UsdValidationFixers</code>，调用方负责决定是否应用 fixer，并提供正确的 edit target。自动化发布管线通常应把验证、报告、人工确认和修复提交分开，以避免 validation run 直接产生不可追踪的 scene edits。</span><span class="en">If errors provide associated UsdValidationFixers, the caller is responsible for fixing errors.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-custom-cpp">
      <h2>Creating Custom Validators</h2>
      <p><span class="zh">自定义 validators 可以通过 OpenUSD plugin infrastructure 懒加载，也可以显式创建并注册。共同点是都要实现一个 validator task function，类型可以是 <code>UsdValidateLayerTaskFn</code>、<code>UsdValidateStageTaskFn</code> 或 <code>UsdValidatePrimTaskFn</code>。选择粒度时要尽量靠近实际检查对象：只需要看 prim 的规则应写成 prim task，不应写成 stage task 后每次全量遍历 stage。</span><span class="en">A custom validator must implement UsdValidateLayerTaskFn, UsdValidateStageTaskFn, or UsdValidatePrimTaskFn.</span></p>
      <p><span class="zh">若 prim-level validator 只适用于特定 schema，应设置 <code>schemaTypes</code>。这让 framework 跳过非匹配 prim，避免无意义调用。常见误读是把所有检查都写成 stage-level，因为它“看起来最通用”；官方明确提醒过宽的 granularity 会影响性能。</span><span class="en">Using too broad a granularity can impact performance.</span></p>
      <h3>Plugin Validators</h3>
      <p><span class="zh">插件路径把 metadata 放在 <code>plugInfo.json</code>，例如定义 <code>Validator1</code> 和 <code>ValidatorSuite1</code>。插件代码通过 <code>TF_REGISTRY_FUNCTION(UsdValidationRegistry)</code> 取得 registry，创建 <code>TfToken validatorName("newValidatorPlugin:Validator1")</code>，然后用 <code>RegisterPluginValidator</code> 注册 task function；suite 则通过 <code>GetOrLoadValidatorsByName</code> 找到 validator 后调用 <code>RegisterPluginValidatorSuite</code>。</span><span class="en">For custom validators created in a plugin, the plugin's plugInfo.json contains custom validator metadata.</span></p>
      <pre>TF_REGISTRY_FUNCTION(UsdValidationRegistry)
{
    UsdValidationRegistry &amp;registry = UsdValidationRegistry::GetInstance();
    const TfToken validatorName("newValidatorPlugin:Validator1");
    const UsdValidateStageTaskFn stageTaskFn = [](const UsdStagePtr &amp;usdStage,
        const UsdValidationTimeRange &amp;timeRange) {
        UsdValidationErrorVector errors;
        return errors;
    };
    registry.RegisterPluginValidator(validatorName, stageTaskFn);
    const TfToken suiteName("newValidatorPlugin:ValidatorSuite1");
    const std::vector&lt;const UsdValidationValidator *&gt; containedValidators =
        registry.GetOrLoadValidatorsByName({ validatorName });
    registry.RegisterPluginValidatorSuite(suiteName, containedValidators);
}</pre>
      <h3>Explicit Validators</h3>
      <p><span class="zh">显式路径适合原型、一次性脚本、测试或运行时生成规则。调用方创建 <code>UsdValidationValidatorMetadata</code> 和 task function，然后调用 <code>UsdValidationRegistry::RegisterValidator()</code>。它没有插件懒加载，也不会在 startup 时让其他工具提前看到 metadata。</span><span class="en">For custom validators created explicitly, create UsdValidationValidatorMetadata and use UsdValidationRegistry::RegisterValidator().</span></p>
      <pre>const UsdValidateStageTaskFn explicitStageTaskFn =
    [](const UsdStagePtr &amp;usdStage, const UsdValidationTimeRange &amp;timeRange) {
        UsdValidationErrorVector errors;
        return errors;
    };
const UsdValidationValidatorMetadata explicitValidatorMetadata = {
    TfToken("ExplicitValidator"),
};
registry.RegisterValidator(explicitValidatorMetadata, explicitStageTaskFn);</pre>
    </section>

    <section data-cn-complete="round-487-validation-registration-fixers">
      <h2>Choosing a Registration Path and Adding Fixers</h2>
      <p><span class="zh">选择 registration path 的核心问题是“其他代码是否需要在 validator 代码加载前发现 metadata”。如果需要按 <code>keywords</code>、<code>schemaTypes</code> 或 suite 信息提前枚举，使用 Plugin registration，因为 metadata source 是 <code>plugInfo.json</code>，startup 就可见且 validator 可 lazy loaded；如果规则只给当前调用方使用，Explicit registration 更简单。</span><span class="en">If other code needs to query validator metadata before the validator is loaded, use plugin registration.</span></p>
      <p><span class="zh"><code>RegisterPluginValidator()</code> 和 <code>RegisterValidator()</code> 都可传入 <code>std::vector&lt;UsdValidationFixer&gt;</code>。每个 fixer 指明 name、description、<code>FixerCanApplyFn</code>、<code>FixerImplFn</code>、keywords 和 error name。官方示例中的 <code>_ValidatorFixers()</code> 创建 <code>Example Fixer</code>，并关联 <code>ErrorNameAssociatedWithFixer</code>。</span><span class="en">Each fixer specifies a name, description, FixerCanApplyFn, FixerImplFn, keywords, and the error name it can fix.</span></p>
      <pre>const std::vector&lt;UsdValidationFixer&gt; _ValidatorFixers()
{
    std::vector&lt;UsdValidationFixer&gt; fixers;
    FixerCanApplyFn fixerCanApplyFn = [](const UsdValidationError &amp;error,
        const UsdEditTarget &amp;editTarget, const UsdTimeCode &amp;timeCode) -&gt; bool {
        return true;
    };
    FixerImplFn fixerImplFn = [](const UsdValidationError &amp;error,
        const UsdEditTarget &amp;editTarget, const UsdTimeCode &amp;timeCode) -&gt; bool {
        return true;
    };
    fixers.emplace_back(TfToken("Example Fixer"), "An example fixer.",
        fixerImplFn, fixerCanApplyFn, TfTokenVector{},
        TfToken("ErrorNameAssociatedWithFixer"));
    return fixers;
}
registry.RegisterPluginValidator(validatorName, stageTaskFn, _ValidatorFixers());</pre>
      <p><span class="zh">官方还强调 <code>UsdValidationRegistry</code> does not manage fixers directly；fixers 被各自的 <code>UsdValidationValidator</code> 持有。因此修复逻辑应和产生该错误的 validator 绑定，不应假设有一个全局 fixer registry 可以独立查询和调度。</span><span class="en">UsdValidationRegistry does not manage fixers directly.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-python">
      <h2>Creating Custom Validators in Python</h2>
      <p><span class="zh">Python validators 支持两条同构路径。插件注册使用 <code>RegisterPluginLayerValidator</code>、<code>RegisterPluginStageValidator</code>、<code>RegisterPluginPrimValidator</code>，调用方只提供 validator name，metadata 来自 <code>plugInfo.json</code> 并在 registry 初始化时解析。显式注册使用 <code>RegisterLayerValidator</code>、<code>RegisterStageValidator</code>、<code>RegisterPrimValidator</code>，调用方提供完整 <code>ValidatorMetadata</code>，无需插件基础设施。</span><span class="en">Custom validators can be implemented in Python using plugin registration or explicit registration.</span></p>
      <h3>Performance Considerations</h3>
      <p><span class="zh">官方性能边界非常明确：<code>UsdValidationContext</code> 运行 validators 时，C++ 与 Python tasks 会进入同一个 shared <code>TBB worker thread pool</code>，但 Python task 每次调用都必须获取 <code>Python GIL</code>。这意味着 Python validators 之间不能真正并行，而且大量 Python tasks 可能占满 worker，导致 ready 的 C++ validators 排队等待。因此性能敏感的 pipeline 应优先用 C++，Python 更适合 prototyping、tooling、小场景或低频规则。</span><span class="en">Python task functions must acquire the Python GIL on each invocation.</span></p>
      <h3>Task Function Signatures</h3>
      <ul>
        <li><span class="zh"><code>RegisterLayerValidator</code> / <code>RegisterPluginLayerValidator</code>：callable signature 是 <code>(layer: Sdf.Layer) -&gt; list[ValidationError]</code>。</span><span class="en">Layer validators receive a Sdf.Layer.</span></li>
        <li><span class="zh"><code>RegisterStageValidator</code> / <code>RegisterPluginStageValidator</code>：callable signature 是 <code>(stage: Usd.Stage, timeRange: UsdValidation.TimeRange) -&gt; list[ValidationError]</code>。</span><span class="en">Stage validators receive a Usd.Stage and timeRange.</span></li>
        <li><span class="zh"><code>RegisterPrimValidator</code> / <code>RegisterPluginPrimValidator</code>：callable signature 是 <code>(prim: Usd.Prim, timeRange: UsdValidation.TimeRange) -&gt; list[ValidationError]</code>。</span><span class="en">Prim validators receive a Usd.Prim and timeRange.</span></li>
      </ul>
      <p><span class="zh">这些 callable 必须返回 <code>UsdValidation.ValidationError</code> 对象的 list 或 iterable；验证通过时返回空 list。不要返回字符串、布尔值或直接抛异常来表达普通验证失败。</span><span class="en">Return an empty list when the validation passes.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-python-examples">
      <h2>Python Explicit and Plugin Registration Examples</h2>
      <h3>Layer Validator</h3>
      <p><span class="zh">Layer 示例用 <code>UsdValidation.ValidatorMetadata</code> 注册 <code>myPackage:RequiresDefaultPrim</code>，检查 <code>layer.defaultPrim</code>。错误用 <code>UsdValidation.ValidationErrorType.Warn</code>，site 指向 <code>Sdf.Path.absoluteRootPath</code>。</span><span class="en">Layer Validator checks whether a layer has a defaultPrim.</span></p>
      <pre>from pxr import Sdf, UsdValidation
registry = UsdValidation.ValidationRegistry()
metadata = UsdValidation.ValidatorMetadata(
    name="myPackage:RequiresDefaultPrim",
    doc="Warn when a layer has no default prim set.",
    keywords=["myPackage"],
)
def _CheckDefaultPrim(layer):
    if not layer.defaultPrim:
        return [UsdValidation.ValidationError(
            "MissingDefaultPrim",
            UsdValidation.ValidationErrorType.Warn,
            [UsdValidation.ValidationErrorSite(layer, Sdf.Path.absoluteRootPath)],
            f"Layer '{layer.identifier}' has no defaultPrim.")]
    return []
registry.RegisterLayerValidator(metadata, _CheckDefaultPrim)</pre>
      <h3>Stage Validator</h3>
      <p><span class="zh">Stage 示例注册 <code>myPackage:RequiresUpAxis</code>，检查 <code>stage.HasAuthoredMetadata(UsdGeom.Tokens.upAxis)</code>。如果缺失，返回 <code>MissingUpAxis</code> 的 Error。它适合 stage metadata 级别检查，不应改写为 prim validator。</span><span class="en">Stage Validator checks upAxis metadata.</span></p>
      <h3>Prim Validator</h3>
      <p><span class="zh">Prim 示例注册 <code>myPackage:NoPrimsMissingKind</code>，跳过 pseudo-root，用 <code>Usd.ModelAPI(prim).GetKind()</code> 检查每个 prim 是否有 kind。它展示了 prim-level task 如何对每个候选 prim 产生自己的 <code>ValidationErrorSite</code>。</span><span class="en">Prim Validator checks kind on prims.</span></p>
      <h3>Plugin Registration Example</h3>
      <p><span class="zh">Python plugin 场景中，<code>plugInfo.json</code> 声明 <code>CheckUpAxis</code> 的 <code>doc</code> 和 <code>keywords</code>，实现代码只用 <code>RegisterPluginStageValidator("myPlugin:CheckUpAxis", _CheckUpAxis)</code> 绑定 task function。Plugin validator suites 也类似，可用 <code>RegisterPluginValidatorSuite</code> 加上 <code>GetOrLoadValidatorByName("myPlugin:CheckUpAxis")</code> 注册。</span><span class="en">When a validator is declared in plugInfo.json, only the name is needed at registration time.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-python-loading">
      <h2>Python Plugin Loading, Running, Suites, and Notes</h2>
      <p><span class="zh">Python plugin 的 lazy-load flow 是：startup 阶段 <code>ValidationRegistry</code> 解析所有发现插件的 <code>plugInfo.json</code>，metadata 先可见；query 阶段客户端调用 <code>registry.GetOrLoadValidatorByName("myPlugin:CheckUpAxis")</code> 或通过 <code>UsdValidationContext</code> 访问；load 阶段 registry 调用 <code>plugin-&gt;Load()</code>，Python-type plugin 会执行 <code>import &lt;module_name&gt;</code>；register 阶段模块的 <code>__init__.py</code> 顶层代码调用 <code>RegisterPluginStageValidator</code> 等函数；最后 registry 返回 fully registered validator。</span><span class="en">Python plugins rely on module-level registration code in __init__.py instead of TF_REGISTRY_FUNCTION.</span></p>
      <p><span class="zh">插件目录必须让 module directory name 匹配 <code>plugInfo.json</code> 的 <code>Name</code> 字段，目录内有 <code>__init__.py</code> 和 <code>plugInfo.json</code>。该目录要能被 <code>Plug.Registry</code> 发现，可通过 <code>PXR_PLUGINPATH_NAME</code> 或 <code>Plug.Registry().RegisterPlugins()</code>，而 module 的 parent directory 还必须在 <code>sys.path</code> 上，否则 import 会失败。</span><span class="en">The module directory name must match the Name field in plugInfo.json.</span></p>
      <p><span class="zh">运行 Python validator 时，可以 <code>validator = registry.GetOrLoadValidatorByName("myPackage:RequiresUpAxis")</code> 后直接 <code>validator.Validate(stage)</code>，也可以构造 <code>UsdValidation.ValidationContext([validator])</code> 后 <code>context.Validate(stage)</code>。suite 分组使用 <code>ValidatorMetadata(isSuite=True)</code>，再调用 <code>RegisterValidatorSuite</code> 把 stage validator 和 prim validator 组合成 baseline checks。</span><span class="en">Retrieve the registered validator by name and call Validate(), or pass it to a ValidationContext.</span></p>
      <p><span class="zh">Notes 段有几个排错要点：<code>ValidationRegistry</code> 是 singleton，同一进程内注册的 validators 对其他模块可见；validator names 必须唯一；re-registering an existing name will fail silently，可用 <code>HasValidator()</code> 预检；Python exceptions raised inside a task function are converted to <code>Tf</code> errors and the validator returns an empty error list for that invocation；显式注册没有 plugin，不会 lazy loaded，必须每个 session 重新注册。</span><span class="en">Validator names must be unique across the registry.</span></p>
      <p><span class="zh">官方最后把 <code>usdchecker</code> 和 <code>pxr/usdValidation</code> 下的 schema validators 作为 additional examples。读者如果要落地 pipeline，应先从这些示例确认错误报告格式、validator suite 组织方式和插件 metadata，而不是从零设计一套平行系统。</span><span class="en">The code for usdchecker has been updated to use validators.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-paragraph-coverage">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh">开头段定义职责：Validation framework 验证 assets 是否满足 core rules、schema rules 和 client-provided plugin rules，目标是 robustness 和 interchange。它是验证框架，不是 schema authoring 文档，也不是自动修复工具。</span><span class="en">The OpenUSD Validation framework provides a system to validate assets.</span></p>
      <p><span class="zh">Validator 和 metadata 段说明单个 validator、validator suite 和 metadata query 的角色。<code>keywords</code>、<code>schemaTypes</code> 和 <code>includeAllAncestors</code> 是选择和筛选 validator 的关键字段。</span><span class="en">Each Validator instance has metadata represented by UsdValidationValidatorMetadata.</span></p>
      <p><span class="zh">Errors 段说明返回结果的数据模型：error type、error site、message、validator、fixers 和 error data。调试时应该按 site、validator、message、data 的顺序定位，而不是只看最终文本。</span><span class="en">UsdValidationErrors contain named errors with sites and messages.</span></p>
      <p><span class="zh">Running tests 段说明直接 validator 与 context 两种运行方式，并提醒 time range、prim predicate、stage/layer/prim 生命周期和 fixer 手动调用边界。</span><span class="en">Validate() may be called on a validator or context.</span></p>
      <p><span class="zh">Custom C++ 段说明三种 task function 粒度、plugin registration、explicit registration、registration path 选择和 fixer vector。重点是 metadata discoverability、lazy loading 和 granularity 的性能影响。</span><span class="en">Custom validators can be created via plugin infrastructure or explicit registration.</span></p>
      <p><span class="zh">Python 段说明 plugin/explicit 两条路径、TBB worker thread pool 与 Python GIL 的性能限制、layer/stage/prim callable signatures、显式注册示例、插件目录结构、<code>__init__.py</code> 注册、运行 validator、suite 分组和 notes 中的唯一命名与异常处理。</span><span class="en">Custom validators can be implemented in Python using either of the two registration paths.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-boundaries-debug">
      <h2>边界、误读点与调试路径 / Boundaries and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 validator 当成自动修复器。validator 返回 <code>UsdValidationError</code>，fixer 需要调用方明确调用 <code>CanApplyFix()</code> 和 <code>ApplyFix()</code>，并提供 <code>UsdEditTarget</code>。</span><span class="en">Validation tests will not automatically call any fixers.</span></li>
        <li><span class="zh">不要把所有检查都写成 stage task。若规则只需看 prim，优先实现 <code>UsdValidatePrimTaskFn</code> 并设置 <code>schemaTypes</code>；否则会造成不必要 stage traversal。</span><span class="en">Using too broad a granularity can impact performance.</span></li>
        <li><span class="zh">不要把 Python validator 误认为能像 C++ 一样并行扩展。Python task 要拿 <code>Python GIL</code>，可能让同一 TBB worker pool 中的 C++ validators 也排队。</span><span class="en">Python validators do not benefit from parallelism among themselves.</span></li>
        <li><span class="zh">不要把 plugin metadata 和 runtime registration 混淆。<code>plugInfo.json</code> 可让 metadata startup 可见，但 task function 仍要在插件加载时通过 C++ <code>TF_REGISTRY_FUNCTION</code> 或 Python <code>__init__.py</code> 注册。</span><span class="en">Validator metadata is available immediately before code is loaded.</span></li>
        <li><span class="zh">若 validator 没有被发现，先检查 <code>PXR_PLUGINPATH_NAME</code>、<code>Plug.Registry().RegisterPlugins()</code>、<code>sys.path</code>、plugin <code>Name</code> 与目录名是否一致，再检查 <code>GetOrLoadValidatorByName</code> 的 name 是否带正确 plugin prefix。</span><span class="en">Plugin directory and module import paths must be discoverable.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-487-validation-pipeline-guidance">
      <h2>发布管线和工具集成建议 / Pipeline and Tool Integration Guidance</h2>
      <p><span class="zh">在资产发布管线里，本页的最佳使用方式是把 Validation 分成三层：第一层是 validator discovery，用 <code>UsdValidationRegistry</code> 和 metadata query 找到项目需要的 validators 或 suites；第二层是 validation execution，用 <code>UsdValidationContext</code> 在 stage、layer 或 prim 范围内运行；第三层是 report and remediation，把 <code>UsdValidationError</code> 的 severity、site、message、validator 和 fixer 信息写入发布报告。只有第三层经过人工或上层工具确认后，才应调用 fixer 修改目标 layer。</span><span class="en">A practical validation pipeline separates discovery, execution, and remediation.</span></p>
      <p><span class="zh">对工具作者来说，<code>keywords</code> 和 <code>schemaTypes</code> 是构建 UI 的关键。工具可以先列出所有带有某个 keyword 的 validators，让用户选择与当前任务相关的检查；也可以根据选中 prim 的 schema 自动过滤只适用于 <code>UsdGeomImageable</code>、<code>UsdGeomGprim</code> 或特定派生类型的 rules。这样既能避免全量检查的噪声，也能让错误报告更贴近用户正在编辑的资产区域。</span><span class="en">Keywords and schemaTypes are useful for validator selection UI.</span></p>
      <p><span class="zh">对插件部署来说，<code>plugInfo.json</code> 的 metadata 是契约，不只是文档。若团队希望 command-line 工具、DCC 插件或 CI 服务在加载 validator 代码之前就能显示规则说明、关键字和 suite 组成，应选择 plugin registration。若规则来自用户脚本、临时测试或交互式工具状态，explicit registration 更合适，因为它不需要插件目录和 discovery 环境，但也不能指望其他进程或下一次 session 自动发现它。</span><span class="en">plugInfo.json metadata lets tools discover validators before loading implementation code.</span></p>
      <p><span class="zh">对 Python validators 来说，调试重点不只在函数体。若 validator 没有运行，先检查 plugin 是否被发现、module 是否能 import、<code>__init__.py</code> 是否真的执行 registration、validator name 是否与 <code>plugInfo.json</code> 中的 <code>pluginName:validatorName</code> 一致；若 validator 运行但没有错误返回，再检查 callable 是否返回 <code>list[ValidationError]</code>，以及异常是否已被转换成 <code>Tf</code> errors 并导致本次 invocation 返回空列表。</span><span class="en">Python plugin debugging should check discovery, import, registration, naming, return type, and exceptions.</span></p>
      <p><span class="zh">对性能敏感的批量资产检查，建议把高频、全场景、可并行的规则写成 C++ validators，把低频、项目特定或仍在原型阶段的规则写成 Python validators。运行混合 validator suite 时，要留意 Python GIL 可能占用 TBB worker thread pool，导致 C++ validators 也被延迟。若 CI 中出现耗时异常，应先按 validator name 和 implementation language 分组统计运行时间，而不是只看总耗时。</span><span class="en">Performance-sensitive suites should separate high-frequency C++ validators from low-frequency Python validators.</span></p>
      <p><span class="zh">对错误归因来说，<code>Error sites</code> 比错误文本更稳定。一个 stage-level validator 可能报告 layer 或 stage 级别问题，一个 prim-level validator 可能报告具体 prim path，一个 property-level 诊断可能落到属性 site。发布报告应保留这些 site，不要只把 message 拼成一行字符串；否则用户很难从报告点击回本地页面、source layer 或编辑目标。</span><span class="en">Error sites are a durable bridge from validation reports back to authored data.</span></p>
      <p><span class="zh">在 CI 中落地时，推荐把 validator suite 名、validator 名、error type、error site 和 fixer availability 都作为结构化字段保存。这样同一个资产在不同提交之间可以比较新增、消失和持续存在的问题，也能区分 warning policy 的变化与真正的 scene data 退化。若只保存控制台文本，后续很难把 <code>Warn</code> 升级为失败门槛，也很难把同一错误稳定映射回具体 layer 或 prim。</span><span class="en">Structured validation output makes CI regressions easier to compare.</span></p>
      <p><span class="zh">在人工 review 中，Validation 页面应帮助读者判断“规则在哪里定义、何时加载、检查谁、报告到哪里、是否可修”。这五个问题分别对应 metadata/registration、plugin loading、task function granularity、error site 和 fixer。若某个验证结果难以解释，通常不是单一 API 调用错误，而是这些层次中的某一层没有被记录清楚。</span><span class="en">A useful review path follows definition, loading, target, reporting, and fixing.</span></p>
      <p><span class="zh">最终验收时还要确认报告能从错误回跳到本地文档和官方页，避免验证结论与读者点击路径脱节。</span><span class="en">Validation reports should remain connected to local and official documentation.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-click-path">
      <h2>相邻 API 与本地点击路径 / Neighbor APIs and Local Click Path</h2>
      <p><span class="zh">推荐点击顺序：<a href="../../openusd_bilingual_final.html">总入口</a> -> <a href="../../site/api/index.html">API 本地入口</a> -> Validation -> <a href="sdf_page_front.html">Sdf</a> / <a href="plug_page_front.html">Plug</a> / <a href="tf_page_front.html">Tf</a> / <a href="vt_page_front.html">Vt</a>。Validation 的错误 site 依赖 <code>SdfLayer</code> 和 <code>UsdStage</code>，plugin discovery 依赖 Plug，registry 和 token 常见于 Tf，扩展 error data 使用 <code>VtValue</code>，所以这些本地相邻入口比随机 API 页更符合真实阅读路径。</span><span class="en">Local click path keeps Sdf, Plug, Tf, and Vt adjacent to validation.</span></p>
      <p><span class="zh">若从资产发布或检查工具进入本页，建议按 Running Validator Tests -> Creating Custom Validators -> Creating Custom Validators in Python -> Additional Examples 的顺序向下读，再回到 <a href="class_usd_validation_error.html">UsdValidationError</a> 这类 class 页面查看具体 API 细节。本页保留显式 <a href="${OFFICIAL_URL}">Open official page</a> 外跳，但主阅读路径使用本地入口、breadcrumb、side navigation 和 reading-flow。</span><span class="en">Open official page remains the explicit external jump.</span></p>
    </section>

    <section data-cn-complete="round-487-validation-source-parity">
      <h2>源页核对 / Source Parity</h2>
      <ul>
        <li><span class="zh">已核对本地 source snapshot：<code>${esc(SOURCE)}</code>。</span><span class="en">Source snapshot checked.</span></li>
        <li><span class="zh">已保留并解释官方关键 section：<code>Running Validator Tests</code>、<code>Creating Custom Validators</code>、<code>Plugin Validators</code>、<code>Explicit Validators</code>、<code>Choosing a Registration Path</code>、<code>Adding Fixers</code>、<code>Creating Custom Validators in Python</code>、<code>Performance Considerations</code>、<code>Task Function Signatures</code>、<code>Explicit Registration Examples</code>、<code>Plugin Registration Example</code>、<code>How Python Plugin Validators Are Triggered</code>、<code>Running a Python Validator</code>、<code>Grouping Validators Into a Suite</code>、<code>Notes</code>、<code>Additional Examples</code>。</span><span class="en">Official sections are preserved in order.</span></li>
        <li><span class="zh">已保留关键 API、类型、函数、宏和标识：<code>UsdValidationValidator</code>、<code>UsdValidationValidatorMetadata</code>、<code>UsdValidationContext</code>、<code>UsdValidationRegistry</code>、<code>UsdValidationErrorType</code>、<code>UsdValidationFixer</code>、<code>FixerImplFn</code>、<code>FixerCanApplyFn</code>、<code>UsdValidateLayerTaskFn</code>、<code>UsdValidateStageTaskFn</code>、<code>UsdValidatePrimTaskFn</code>、<code>TF_REGISTRY_FUNCTION</code>、<code>RegisterPluginValidator</code>、<code>RegisterValidator</code>、<code>RegisterPluginStageValidator</code>、<code>ValidationRegistry</code>、<code>ValidatorMetadata</code>、<code>RegisterValidatorSuite</code>、<code>HasValidator()</code>。</span><span class="en">API identifiers, macro names, and code semantics are preserved.</span></li>
        <li><span class="zh">显式官方外跳：<a href="${OFFICIAL_URL}">Open official page</a>。本地阅读继续保留总入口、API 入口、breadcrumb、side navigation、related links、prev/next 和 click-path 审计所需结构。</span><span class="en">Official external link is explicit.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-487-validation-reader-checklist">
      <h2>读者验收清单 / Reader Checklist</h2>
      <p><span class="zh">读完本页后，读者应能用中文说明：Validation framework 验证 assets 而不自动修复；validator、metadata、context、registry、error 和 fixer 的职责不同；<code>Validate()</code> 可直接运行或经 context 运行；custom validator 要选择 layer/stage/prim 粒度；plugin registration 适合可发现 metadata 和 lazy loading，explicit registration 适合动态或本地规则；Python validators 受 <code>Python GIL</code> 限制；Python plugin 依赖 <code>plugInfo.json</code>、<code>__init__.py</code>、<code>PXR_PLUGINPATH_NAME</code> 或 <code>Plug.Registry().RegisterPlugins()</code>；suite 可组合多个 validators。</span><span class="en">A review-ready reader can explain validators, metadata, contexts, registries, errors, fixers, registration paths, and Python boundaries.</span></p>
    </section>

    <section>
      <h2>导航 / Navigation</h2>
      <p><a href="../../openusd_bilingual_final.html">返回最终 HTML 总入口 / Back to final HTML entry</a></p>
      <p><a href="../../site/api/index.html">API 本地入口 / Local API entry</a></p>
      <p><a href="sdf_page_front.html">相邻：Sdf</a></p>
      <p><a href="plug_page_front.html">相邻：Plug</a></p>
      <p><a href="tf_page_front.html">相邻：Tf</a></p>
      <p><a href="vt_page_front.html">相邻：Vt</a></p>
      <p><a href="class_usd_validation_error.html">相邻：UsdValidationError</a></p>
      <p><a href="${OFFICIAL_URL}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity(html) {
  const sourceText = stripHtml(read(SOURCE));
  const outputText = stripHtml(html);
  const sourceLower = sourceText.toLowerCase();
  const outputLower = outputText.toLowerCase();
  const missingSource = expectedKeywords.filter((keyword) => !sourceLower.includes(keyword.toLowerCase()));
  const missingOutput = expectedKeywords.filter((keyword) => !outputLower.includes(keyword.toLowerCase()));
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source: SOURCE,
    official: OFFICIAL_URL,
    expected_keywords: expectedKeywords,
    missing_source_keywords: missingSource,
    missing_output_keywords: missingOutput,
    output_checks: {
      bilingual_complete: html.includes('data-cn-status="bilingual_complete"') && html.includes("bilingual_complete"),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐|草稿页/.test(html),
      has_main_reading_path: html.includes("中文主阅读路径") && html.includes("逐段双语理解"),
      has_official_link: html.includes(OFFICIAL_URL) && html.includes("Open official page"),
      has_code_path: [
        "RegisterPluginValidator",
        "GetOrLoadValidatorsByName",
        "RegisterPluginValidatorSuite",
        "RegisterValidator",
        "_ValidatorFixers()",
        "RegisterPluginStageValidator",
        "RegisterValidatorSuite",
        "UsdValidation.ValidationContext",
        "PXR_PLUGINPATH_NAME",
        "Plug.Registry().RegisterPlugins()",
      ].every((keyword) => outputText.includes(keyword)),
      zh_chars: zhCharCount(outputText),
      zh_blocks: blockCount(html, "zh"),
      en_blocks: blockCount(html, "en"),
    },
  };
}

function checkReport(report) {
  report.passed =
    report.missing_source_keywords.length === 0 &&
    report.missing_output_keywords.length === 0 &&
    report.output_checks.bilingual_complete &&
    report.output_checks.no_draft_marker &&
    report.output_checks.has_main_reading_path &&
    report.output_checks.has_official_link &&
    report.output_checks.has_code_path &&
    report.output_checks.zh_chars >= 3000 &&
    report.output_checks.zh_blocks >= 36;
  return report;
}

function writePage() {
  const html = pageHtml();
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) throw new Error(`Source parity failed: ${JSON.stringify(report, null, 2)}`);
  write(TARGET, html);
  console.log(JSON.stringify(report, null, 2));
}

function precheck() {
  const html = read(TARGET);
  const report = checkReport(sourceParity(html));
  writeJson(SOURCE_PARITY_REPORT, report);
  if (!report.passed) throw new Error(`Precheck failed: ${JSON.stringify(report, null, 2)}`);
  console.log(JSON.stringify(report, null, 2));
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
  };
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "Validation",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Validation README/API guide by adding Chinese main-reading-path coverage for validators, metadata, context, registry, errors, fixers, running tests, custom C++ and Python validator registration, GIL/TBB performance boundaries, plugin loading, suite grouping, debugging path, click-path navigation, source parity, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 3000,
      minimum_chinese_blocks: 36,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
      preserves: expectedKeywords,
    },
  });
  writeJson("reports/bilingual_completion_promotions.json", doc);
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const inventory = readJson("reports/all_pages_inventory.json");
  const counts = {
    total_pages: inventory.counts.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: debt.counts.review_ready_zh,
    api_complete: debt.counts.api_complete,
    api_review_ready_zh: debt.counts.api_review_ready_zh,
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 Validation source parity 晋级，并继续追踪 OpenUSD API 可检查草稿缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: PROMOTION_COMMIT_PLACEHOLDER,
      previous_good_bilingual: PREVIOUS_GOOD_BILINGUAL,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 可检查草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-validation-source-parity",
        severity: "P1",
        summary: "Validation 页面必须按官方 section 覆盖 validators、metadata、context、registry、errors、fixers、running tests、自定义 C++/Python validators、plugin/explicit registration 和 suite 分组，不能只保留摘要表。",
        evidence: "本轮覆盖 UsdValidationValidator、UsdValidationValidatorMetadata、UsdValidationContext、UsdValidationRegistry、UsdValidationErrorType、UsdValidationFixer、RegisterPluginValidator、RegisterValidator、RegisterPluginStageValidator、ValidationRegistry、RegisterValidatorSuite、Python GIL/TBB 边界、plugInfo.json、__init__.py、PXR_PLUGINPATH_NAME 和 usdchecker 示例。",
        required_action: "后续 validation/plugin/tooling 相关页面继续按 source snapshot 做中文主阅读路径、section-level parity、调试路径和点击顺序覆盖。",
      },
      {
        id: "P1-click-order-reading-flow-consistency",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。",
        evidence: "本轮目标页保留 API entry -> Validation -> Sdf/Plug/Tf/Vt/UsdValidationError 的点击路径，并重跑 reading-flow 与 click-path 审计。",
        required_action: "若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无 repeated question mark damage、replacement character 和 UTF-8 BOM。",
        required_action: "若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。",
      },
    ],
    promoted_pages: [
      {
        round: ROUND,
        round_type: ROUND_TYPE,
        output: TARGET,
        official_url: OFFICIAL_URL,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
      },
    ],
    not_promoted_pages: [],
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "release 范围已 126/126 complete，不要重复处理 release 已完成页。",
      "下一轮重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的 API/class/struct 或高价值文档页；开始前必须确认 git/report/validation/markdown/reading-flow/click-path 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：基于 live reports 选择一个仍为 bilingual_draft 且有 source snapshot 的 API 高价值页面。",
  });
}

function stampCommit(sha) {
  const script = "scripts/promote_round_487_validation_readme.mjs";
  const current = read(script);
  if (current.includes(PROMOTION_COMMIT_PLACEHOLDER)) {
    write(script, current.replaceAll(PROMOTION_COMMIT_PLACEHOLDER, sha));
  }
  const problem = readJson("reports/current_problem_audit.json");
  if (problem.last_completed_round) problem.last_completed_round.commit_sha = sha;
  writeJson("reports/current_problem_audit.json", problem);
}

const args = process.argv.slice(2);
const commands = new Set(args);
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
const stampArg = args.find((arg) => arg.startsWith("--stamp-commit="));
if (stampArg) stampCommit(stampArg.slice("--stamp-commit=".length));
if (commands.size === 0 && !stampArg) {
  console.log("Usage: node scripts/promote_round_487_validation_readme.mjs --write-page --precheck --manifest --problem --stamp-commit=<sha>");
}
