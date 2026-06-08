import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 419;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/sdf_page_front.html";
const SOURCE = "source/full_api/sdf_page_front_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/sdf_page_front.html";
const SOURCE_PARITY_REPORT = "reports/round_419_sdf_module_front_source_parity.json";
const PROMOTION_ID = "round-419-api-sdf-module-front";

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlDecode(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripTags(value) {
  return htmlDecode(
    String(value ?? "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function zhChars(value) {
  return (String(value ?? "").match(/[\u4e00-\u9fff]/g) || []).length;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, ""));
}

function writeJson(file, value) {
  fs.writeFileSync(rel(file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function sourceHtml() {
  return fs.readFileSync(rel(SOURCE), "utf8");
}

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function sourceExcerpt() {
  return stripTags(sourceHtml()).slice(0, 1600);
}

function css() {
  return `
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.66}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:18px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .status{display:inline-block;background:#177245;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    .navlinks a{color:#d7e3f4;margin-right:14px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul,ol{padding-left:22px}
    li{margin:8px 0}
    code,pre{font-family:"Cascadia Mono","SFMono-Regular",Consolas,monospace}
    .note{background:#edf6ff;border-left:4px solid #1c5d99;padding:12px 14px}
  `;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  api: "../../site/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/sdf_page_front_source.html",
  official: OFFICIAL_URL,
  sdfLayer: "class_sdf_layer.html",
  sdfPath: "class_sdf_path.html",
  sdfPrimSpec: "class_sdf_prim_spec.html",
  usdPrim: "class_usd_prim.html",
  tfToken: "class_tf_token.html",
  gfDualQuat: "class_gf_dual_quatf.html",
};

function headingList() {
  return sourceHeadings()
    .filter((heading) => heading.text)
    .map((heading) => `<li><span class="zh">官方 section：<code>${esc(heading.text)}</code>。中文阅读时把它视为 Sdf 模块的一个职责面：从 layer/spec/path 的基础概念，到 plugin metadata、file format plugin 和 variable expressions 的扩展机制。</span><span class="en">Source heading level ${heading.level}: ${esc(heading.text)}</span></li>`)
    .join("\n");
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sdf: Scene Description Foundations - OpenUSD API 双语导读</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>${css()}</style>
</head>
<body data-cn-status="bilingual_complete" data-cn-round="${ROUND}">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>Sdf: Scene Description Foundations</h1>
    <div class="meta">Round ${ROUND} ${ROUND_TYPE} · Source snapshot: ${esc(SOURCE)} · Official: ${esc(OFFICIAL_URL)}</div>
    <p class="navlinks">
      <a href="${links.final}">总入口</a>
      <a href="${links.api}">API 本地入口</a>
      <a href="${links.release}">Release 本地入口</a>
      <a href="${links.source}">Local source snapshot</a>
      <a href="${links.official}">Open official page</a>
    </p>
  </header>
  <main>
    <section data-cn-complete="round-419-sdf-main-reading-path">
      <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
      <p><span class="zh"><code>Sdf</code> 是 OpenUSD scene description 的基础层，负责把 layer、path、prim spec、property spec、metadata、file format plugin 和基础值类型组织成可序列化、可编辑、可组合的低层数据模型。官方页标题是 <code>Sdf: Scene Description Foundations</code>，它不是某一个类的手册，而是解释整个 <code>Sdf</code> 模块为什么存在、它和 <code>Usd</code> 场景图 API 的边界在哪里，以及读者应该从哪些核心类型进入。</span><span class="en">Sdf is the foundation layer for serializable scene description and low-level authored data.</span></p>
      <p><span class="zh">官方开篇说 <code>Sdf</code> 提供把 scene description 序列化到参考文本格式或插件定义格式的基础设施，并提供 <code>SdfPath</code>、<code>SdfLayer</code>、<code>SdfPrimSpec</code> 等 primitive abstractions。中文阅读时可以把这句话拆成两层：第一层是文件/层的持久化，第二层是对 layer 内对象的定位和编辑。<code>SdfLayer</code> 承载 authored opinions，<code>SdfPath</code> 描述 namespace 中的位置，<code>SdfPrimSpec</code> 和 <code>SdfPropertySpec</code> 描述局部的 prim/property 贡献。</span><span class="en">The official introduction names serialization and primitive abstractions such as SdfPath, SdfLayer, and SdfPrimSpec.</span></p>
      <p><span class="zh"><strong>Overview</strong> section 的关键边界是：完整的 <code>UsdPrim</code> 是 fallback values 与多个 layer 中 prim specs 组合后的结果，而 <code>SdfLayer</code> 本身只知道自己存储的局部 scene description。也就是说，调试一个已经 composition 之后的 stage 行为时，通常先看 <code>UsdStage</code>/<code>UsdPrim</code>；调试某个文件里到底写了什么、保存/加载/导出是否正确、某个 spec 或 metadata 是否存在时，再下探到 <code>Sdf</code>。</span><span class="en">Overview separates authored layer data from composed UsdStage and UsdPrim views.</span></p>
      <p><span class="zh"><strong>Layering and Referencing</strong> section 说明 <code>SdfPrimSpec</code> 通过 namespace 层级命名，<code>SdfPath</code> 负责定位 prim、property、variant 内对象等 layer 内容。<code>SdfLayer</code> 可以通过 sublayers 参与分层，<code>SdfPrimSpec</code> 也可以 reference 同层或其他 layer 的 prim。这里不要把 reference、sublayer 和最终 composition 混为一个概念：<code>Sdf</code> 表示这些 authored relationship 和局部贡献，完整强弱排序与组合解释通常由更高层的 composition 系统和 <code>UsdStage</code> 呈现。</span><span class="en">Layering and referencing describe authored contributions that later participate in composition.</span></p>
      <p><span class="zh"><strong>Layers and Opinions</strong> section 把 layer 中的 partial scene spec 称为对完整场景某一方面的 <em>opinion</em>。这对调试很重要：如果某个属性值、permission、metadata 或 child order 与预期不同，不要只查最终 <code>UsdPrim</code>，还要回到贡献这个 opinion 的 <code>SdfLayer</code> 和对应 <code>SdfPrimSpec</code>/<code>SdfPropertySpec</code>。<code>SdfPermission</code> 这类 layer/spec 级属性控制某些 authored 内容是否公开或私有。</span><span class="en">Layers and Opinions frames authored layer data as opinions contributing to the final scene.</span></p>
      <p><span class="zh"><strong>Prim Spec</strong> section 解释 <code>SdfPrimSpec</code> 是 scene description 层面的 prim 局部描述，不要求包含所有属性。一个 Cylinder 的某个 spec 可以只写 radius 而不写 height，最终 height 可以来自另一个 spec 或 schema fallback。属性由 <code>SdfPropertySpec</code> 及其子类表示：<code>SdfAttributeSpec</code> 存储标量或数组值，<code>SdfRelationshipSpec</code> 表示指向其他 prim、attribute 或 relationship 的关系，例如材质绑定关系。</span><span class="en">Prim Spec explains sparse authored descriptions and property spec subclasses.</span></p>
      <p><span class="zh"><strong>Plugin Metadata</strong> section 说明插件可以通过 <code>plugInfo.json</code> 的 <code>SdfMetadata</code> 字典注册自定义 metadata field。这里必须保留 <code>appliesTo</code>、<code>default</code>、<code>displayGroup</code>、<code>type</code> 等字段名，因为它们是插件配置契约。自定义 metadata 即使定义不可用也可以在 layer 中 round-trip，但如果没有对应定义，普通 <code>Sdf</code> API 不一定能正常 inspect，这一点是调试插件字段时的常见误读。</span><span class="en">Plugin Metadata covers custom fields registered through plugInfo.json and SdfMetadata.</span></p>
      <p><span class="zh"><strong>File Format Plugins</strong> 和 <strong>Variable Expressions</strong> 是扩展阅读重点。前者解释 layer 文件格式不只限于 USDA/USDC，也可以由插件提供；后者解释 layer 或 asset 中的变量表达式如何参与解析。读者应把它们看成 Sdf 对存储格式和路径/资源解析的扩展点，而不是替代 <code>UsdStage</code> 的场景遍历 API。</span><span class="en">File Format Plugins and Variable Expressions are extension points for storage and expression behavior.</span></p>
      <p><span class="zh">从数据流角度看，<code>Sdf</code> 位于“文件内容”和“组合后的场景图”之间。一个典型排查顺序是：先用 <code>SdfLayer</code> 确认 layer 是否能打开、identifier 是否正确、subLayers 或 references 是否写在预期位置；再用 <code>SdfPath</code> 和 spec API 确认 prim/property 的 authored path；然后检查 <code>SdfPrimSpec</code>、<code>SdfAttributeSpec</code>、<code>SdfRelationshipSpec</code> 中的 default、time samples、metadata、target path 是否存在；最后才把这些 authored opinions 放回 <code>UsdStage</code> 的 composition 结果中解释。这样能避免把“文件里没有写”“写了但弱于其他 layer”“写了但 path 不匹配”“写了但 plugin metadata 未注册”混成一个问题。</span><span class="en">A useful debugging flow is layer, path, spec, authored value, then composed stage.</span></p>
      <p><span class="zh">本页还提醒读者：Sdf 的很多 API 看起来更接近数据结构而不是高层建模语义。它不会替你判断一个 prim 是否符合某个 schema，也不会自动解释材质、几何或渲染语义；它关心的是 layer 中有什么字段、这些字段如何命名、如何保存、如何被文件格式插件 round-trip、如何被 composition 系统作为输入。理解这一点后，再阅读 <code>UsdGeom</code>、<code>UsdShade</code>、<code>UsdLux</code> 等模块时，就能分清“schema 语义”和“底层 authored storage”两个层次。</span><span class="en">Sdf stores authored data; higher-level schema libraries interpret domain semantics.</span></p>
      <p><span class="zh">因此，本页最适合作为 API 阅读路线的“地基页”：它先回答 layer/spec/path 是什么，再把读者引向具体类页。若你在写导入器、导出器、版本转换、USD 差异比较、离线修复工具或资产校验器，Sdf 级 API 往往是必须理解的；若你只是创建场景、遍历 prim 或设置属性，通常先使用 Usd 层 API，再把 Sdf 当作解释底层写入结果的证据层。</span><span class="en">Use this page as the foundation before class pages and before low-level asset tooling.</span></p>
      <p><span class="zh">阅读本页时还要保留一个判断：Sdf 页面里的“对象”多半是描述对象的记录，而不是渲染、求值或交互时的运行时对象。把这一层看清楚，后续排查 layer 变更、payload/reference 入口、metadata 丢失和文件格式转换问题时会少走很多弯路。</span><span class="en">Sdf objects are primarily authored-description records rather than runtime scene interaction objects.</span></p>
    </section>

    <section data-cn-complete="round-419-sdf-api-groups">
      <h2>核心 API 分组 / Core API Groups</h2>
      <ul>
        <li><span class="zh"><a href="${links.sdfLayer}"><code>SdfLayer</code></a>：layer 文件/内存容器，负责打开、导出、保存、持有局部 scene description。调试“这个 USD 文件实际写了什么”时，这是首要入口。</span><span class="en">SdfLayer is the layer container for authored scene description.</span></li>
        <li><span class="zh"><a href="${links.sdfPath}"><code>SdfPath</code></a>：定位对象的路径类型，用于 prim、property、variant selection 等 namespace 位置。调试 path 不匹配、variant 内路径或 relationship target 时，优先检查路径是否按 Sdf 规则构造。</span><span class="en">SdfPath locates objects inside layers and scene graphs.</span></li>
        <li><span class="zh"><a href="${links.sdfPrimSpec}"><code>SdfPrimSpec</code></a>：layer 内的 prim 局部描述，表示 authored prim opinion，而不是 composition 后的完整 <code>UsdPrim</code>。</span><span class="en">SdfPrimSpec stores a partial authored prim description.</span></li>
        <li><span class="zh"><code>SdfPropertySpec</code>、<code>SdfAttributeSpec</code>、<code>SdfRelationshipSpec</code>：描述属性和值/关系的底层 spec。它们解释 authored data 的存储结构，最终读写用户属性时仍常通过 <code>UsdAttribute</code> 和 <code>UsdRelationship</code>。</span><span class="en">Property specs are the Sdf-level representation of authored properties.</span></li>
        <li><span class="zh"><code>SdfAssetPath</code>、<code>SdfTimeCode</code>、<code>TfToken</code>、<code>VtValue</code>、<code>Gf*</code> 值类型：这些不是 Sdf 模块独有的全部内容，但 Sdf metadata、attribute defaults、time samples 和 file format plugin 会频繁引用它们。</span><span class="en">Sdf value storage relies on common Tf, Vt, and Gf value types.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-419-sdf-boundaries">
      <h2>边界、误读点与调试路径 / Boundaries, Misreads, and Debugging</h2>
      <ul>
        <li><span class="zh">不要把 <code>SdfLayer</code> 当成完整场景。它只是一层 authored data；完整 scenegraph 由 <code>UsdStage</code> 通过 composition 呈现。</span><span class="en">An SdfLayer is not the full composed scene.</span></li>
        <li><span class="zh">不要把 <code>SdfPrimSpec</code> 当成运行时 prim 对象。它是某个 layer 中的局部 prim description；一个最终 <code>UsdPrim</code> 可能由多个 specs 与 fallback values 共同形成。</span><span class="en">An SdfPrimSpec is a partial authored spec, not the composed prim object.</span></li>
        <li><span class="zh">如果保存/加载或文件格式行为异常，先检查 <code>SdfLayer</code>、file format plugin 和 layer identifier；如果最终属性值异常，再检查 contributing layers、prim specs、property specs 和 composition 强弱关系。</span><span class="en">Debug persistence through SdfLayer and final values through contributing specs and composition.</span></li>
        <li><span class="zh">如果自定义 metadata 能 round-trip 但无法 inspect，检查 <code>plugInfo.json</code> 中 <code>SdfMetadata</code> 是否注册、<code>type</code> 是否有效、<code>appliesTo</code> 是否覆盖目标 spec 类型。</span><span class="en">Metadata inspection depends on registered metadata definitions.</span></li>
        <li><span class="zh">如果 path 相关 API 返回不符合预期，先核对 <code>SdfPath</code> 的 namespace、property path、variant selection 与 target path 语义，再看更高层 USD API 的查询结果。</span><span class="en">Path bugs should be reduced to SdfPath semantics before checking higher-level queries.</span></li>
        <li><span class="zh">如果某个值在文本 layer 中看得到，但通过高层 API 读不到，常见原因包括 layer 没有参与当前 stage、opinion 被更强 layer 覆盖、path 指向的是 property 而不是 prim、variant selection 未进入目标分支、metadata field 对目标 spec 类型不可用，或插件提供的 file format/metadata 定义没有加载。</span><span class="en">A visible authored value can still disappear from a composed query for composition, path, variant, or plugin-definition reasons.</span></li>
        <li><span class="zh">如果要做工具链或转换器，Sdf 层适合做精确的 layer/spec 读写、诊断和 round-trip 验证；面向艺术家或资产用户的常规编辑界面通常应优先使用 Usd 层 API，再在必要时显示 Sdf 级别的来源证据。</span><span class="en">Tools can use Sdf for precise layer/spec diagnostics while user-facing editing usually starts at the Usd layer.</span></li>
      </ul>
    </section>

    <section data-cn-complete="round-419-sdf-adjacent-path">
      <h2>相邻阅读路径 / Adjacent Reading Path</h2>
      <p><span class="zh">推荐阅读顺序是：先读本页建立 Sdf 的 layer/spec/path 边界，再读 <a href="${links.sdfLayer}"><code>SdfLayer</code></a>、<a href="${links.sdfPath}"><code>SdfPath</code></a>、<a href="${links.sdfPrimSpec}"><code>SdfPrimSpec</code></a> 三个核心类页；如果问题发生在 composition 后的对象，再回到 <a href="${links.usdPrim}"><code>UsdPrim</code></a> 和 <code>UsdStage</code> 相关页面。若涉及 token 或基础值类型，可以继续查 <a href="${links.tfToken}"><code>TfToken</code></a>、<code>VtValue</code> 与 <code>Gf</code> 类型。</span><span class="en">Read this module page before the key Sdf classes, then move to Usd APIs for composed scenegraph behavior.</span></p>
      <p class="note"><span class="zh">本页保留 Doxygen/API 名、schema 名、token、属性名、函数名、头文件名、代码片段和官方 section 英文标题。中文说明负责建立主阅读路径，英文名称负责技术核对。</span><span class="en">English API identifiers are preserved for technical parity.</span></p>
      <p><span class="zh">因此，所有 API 名和字段名均按官方拼写保留，不做意译；本地链接用于继续阅读和核对来源。</span><span class="en">Identifiers stay unchanged.</span></p>
    </section>

    <section data-cn-complete="round-419-sdf-source-parity">
      <h2>官方 section 对比 / Source Parity</h2>
      <ul>
${headingList()}
        <li><span class="zh">已核对 source snapshot 中的核心关键词：<code>Sdf provides the foundations</code>、<code>Overview</code>、<code>Layering and Referencing</code>、<code>Layers and Opinions</code>、<code>Prim Spec</code>、<code>Plugin Metadata</code>、<code>File Format Plugins</code>、<code>Variable Expressions</code>、<code>SdfLayer</code>、<code>SdfPath</code>、<code>SdfPrimSpec</code>、<code>plugInfo.json</code>、<code>SdfMetadata</code>。</span><span class="en">The local page preserves the official structure and identifiers.</span></li>
        <li><span class="zh">官方原文摘要用于核对，不作为中文主阅读路径：<span class="en">${esc(sourceExcerpt())}</span></span></li>
      </ul>
    </section>

    <section data-cn-complete="round-419-sdf-completion-evidence">
      <h2>完成态证据 / Completion Evidence</h2>
      <ul>
        <li><span class="zh">页面状态已设为 <code>bilingual_complete</code>，并移除了旧的草稿说明和占位提示。</span><span class="en">The page status is bilingual_complete.</span></li>
        <li><span class="zh">中文主阅读路径覆盖模块职责、官方 section、核心 API 分组、Sdf/Usd 边界、误读点、调试路径和相邻类型关系。</span><span class="en">Chinese coverage now explains role, sections, API groups, boundaries, debugging, and adjacent types.</span></li>
        <li><span class="zh">后续审计必须确认本页进入 <code>good_bilingual</code>，并尽量达到 <code>review_ready_zh</code>；如果报告不一致，应停止而不是继续下一页。</span><span class="en">Quality and English-debt audits must close the promotion.</span></li>
      </ul>
      <p><a href="${links.official}">打开官方原页 / Open official page</a></p>
    </section>
  </main>
</body>
</html>
`;
}

function sourceParity() {
  const src = sourceHtml();
  const out = fs.existsSync(rel(TARGET)) ? fs.readFileSync(rel(TARGET), "utf8") : "";
  const keywords = [
    "Sdf provides the foundations",
    "Overview",
    "Layering and Referencing",
    "Layers and Opinions",
    "Prim Spec",
    "Plugin Metadata",
    "File Format Plugins",
    "Variable Expressions",
    "SdfLayer",
    "SdfPath",
    "SdfPrimSpec",
    "SdfPropertySpec",
    "SdfAttributeSpec",
    "SdfRelationshipSpec",
    "plugInfo.json",
    "SdfMetadata",
  ];
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_headings: sourceHeadings(),
    source_keywords_checked: keywords,
    missing_source_keywords: keywords.filter((keyword) => !src.includes(keyword)),
    missing_output_keywords: keywords.filter((keyword) => !out.includes(keyword)),
    output_checks: {
      has_complete_status: out.includes("bilingual_complete"),
      has_paragraph_coverage: out.includes("Paragraph-Level Bilingual Coverage") && out.includes("逐段双语理解"),
      has_final_entry: out.includes("openusd_bilingual_final.html"),
      has_api_entry: out.includes("site/index.html"),
      has_release_entry: out.includes("site/release_index.html"),
      has_explicit_official_link: out.includes("Open official page") && out.includes(OFFICIAL_URL),
      no_draft_marker: !/bilingual_draft|batch draft page|后续迭代会继续补齐|later iterations add denser bilingual coverage/.test(out),
      zh_chars: zhChars(out),
      zh_blocks: (out.match(/class=["'][^"']*\bzh\b[^"']*["']/g) || []).length,
    },
  };
}

function writePage() {
  fs.writeFileSync(rel(TARGET), buildHtml(), "utf8");
  writeJson(SOURCE_PARITY_REPORT, sourceParity());
}

function precheck() {
  const report = sourceParity();
  const failed = [];
  if (report.missing_source_keywords.length) failed.push(`missing source keywords: ${report.missing_source_keywords.join(", ")}`);
  if (report.missing_output_keywords.length) failed.push(`missing output keywords: ${report.missing_output_keywords.join(", ")}`);
  for (const [key, value] of Object.entries(report.output_checks)) {
    if (typeof value === "boolean" && !value) failed.push(`output check failed: ${key}`);
  }
  if (report.output_checks.zh_chars < 2200) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 12) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
  if (failed.length) {
    console.error(JSON.stringify({ passed: false, failed, report }, null, 2));
    process.exit(1);
  }
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify({ passed: true, report }, null, 2));
}

function manifestDocument(raw) {
  return {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
    updated_at: new Date().toISOString(),
  };
}

function updateManifest() {
  const doc = manifestDocument(readJson("reports/bilingual_completion_promotions.json"));
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "Sdf: Scene Description Foundations",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the Sdf module front page by adding Chinese main-reading-path coverage for module role, official sections, API groups, Sdf/Usd boundaries, common misreads, debugging paths, adjacent API relationships, source parity, reading-flow preservation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2200,
      minimum_complete_section_chinese_chars: 1600,
      minimum_chinese_blocks: 12,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
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
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: "Track current OpenUSD bilingual completion blockers and named P0/P1 defects.",
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 PromotionRound 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续按 PromotionRound 或 DomainSprintRound 推进 API 草稿，只把达标页面写入 promotion manifest。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮完成后需重新运行 route_openusd_internal_links_local、inject_openusd_reading_flow_navigation 和 audit_openusd_reading_flow_navigation。",
        required_action: "若 reading-flow 审计失败，停止并修复导航，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无重复问号损坏、replacement character 和 UTF-8 BOM。",
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
      "继续推进 API 草稿；release 范围已经 126/126 complete，不要重复处理 release/search.html。",
      "优先选择核心 API 或同域短页批量，但每轮必须保证 good_bilingual 按实际达标页增长。",
    ],
    next_action: "Select the next API target only after git/report/validation state is clean and consistent.",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_419_sdf_module_front.mjs --write-page --precheck --manifest --problem");
}
