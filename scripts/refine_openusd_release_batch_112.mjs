import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-112";

const refinements = [
  {
    output: "full_site/release/spec.html",
    title: "Specifications",
    summary:
      "`Specifications` 是 OpenUSD 规范入口页，用来把读者导向 `USD Core Specification`、`UsdPreviewSurface Specification`、`Usdz File Format Specification` 等标准文本。它不是 API 教程，而是判断格式、语义边界、互操作约束和发行规范时的总索引。",
    notes: [
      "`USD Core Specification` 适合查 scene description、layer、composition、value resolution、namespace 和 data model 等核心规则；这些内容决定实现和工具应如何解释 USD 文件。",
      "`UsdPreviewSurface Specification` 面向材质互操作，回答预览材质的输入、shader 语义和跨 DCC/renderer 的最小共同表达，不等同于某个渲染器的完整材质系统。",
      "`Usdz File Format Specification` 关注打包格式、文件布局和分发限制，常用于移动端预览、资产交换、发布检查和 pipeline 打包验证。",
      "本页作为规范索引，中文补强应强调“查标准”的阅读路径，而不是扩写某个单独 schema 的使用教程；具体示例应跳到教程或 API 页面。",
      "维护链接时要保留规范名称英文原文，因为这些名称既是官方标题，也是跨团队沟通和 issue 追踪时使用的稳定引用。",
    ],
    terms: [
      ["Specifications", "规范索引入口"],
      ["USD Core Specification", "USD 核心规范"],
      ["UsdPreviewSurface Specification", "USD 预览表面规范"],
      ["Usdz File Format Specification", "usdz 文件格式规范"],
      ["value resolution", "值解析"],
      ["interoperability", "跨工具互操作性"],
    ],
  },
  {
    output: "full_site/release/tut_converting_between_layer_formats.html",
    title: "Converting Between Layer Formats",
    summary:
      "`Converting Between Layer Formats` 说明如何在 `.usda`、`.usdc` 和 `.usd` 等原生 USD layer 格式之间转换。核心工具是 `usdcat`：它既能查看 layer 内容，也能通过 `-o` 输出参数把同一 layer 写成目标格式。",
    notes: [
      "`.usda` 是可读的文本 layer 格式，适合 diff、教学和人工检查；`.usdc` 是 crate 二进制格式，通常更适合大规模资产的读取效率和发布体积。",
      "`.usd` 是通用扩展名，底层可以是文本或二进制；USD 打开文件时会检测实际格式，因此不要把 `.usd` 简化理解成某一种固定编码。",
      "`usdcat Sphere.usda` 用于查看 layer 内容；`usdcat input.usda -o output.usdc` 这类命令用于转换输出。命令、flag、扩展名和文件名都应保留英文原样。",
      "格式转换不应该改变 USD scene 的语义；如果转换后内容表现不同，应优先检查 layer 内容、资产路径、插件可用性或外部依赖，而不是只看扩展名。",
      "本页适合和 toolset、usdchecker、usddiff 等工具页一起读：一个解释格式转换，一个解释验证和差异检查，共同支撑发布流程。",
    ],
    terms: [
      [".usda", "USD 文本 layer 格式"],
      [".usdc", "USD crate 二进制 layer 格式"],
      [".usd", "可自动检测底层格式的 USD 扩展名"],
      ["usdcat", "查看和转换 USD layer 的命令行工具"],
      ["-o", "输出目标参数"],
      ["layer format", "层文件格式"],
    ],
  },
  {
    output: "full_site/release/tut_variants_example_in_katana.html",
    title: "Variants Example in Katana",
    summary:
      "`Variants Example in Katana` 是历史教程，展示如何把 USD variant switching 暴露到 Katana 管线中。阅读时应把它看作 DCC 集成设计样例，而不是当前 Katana USD 插件安装指南；官方已说明旧插件在 USD 20.05 之后从发行包移除。",
    notes: [
      "本页的价值在于说明 variant set 和 variant selection 如何进入艺术家工具界面：USD 负责表达可切换变体，Katana 节点或 UI 负责选择目标 variant。",
      "官方说明 `Katana USD plugin` 已从 USD distribution 移除，并转向 Foundry-supported plugin；中文层必须保留这个历史背景，避免误导读者按旧路径部署。",
      "variant switching 常用于模型、材质、LOD 或资产配置选择。它应与 `Authoring Variants` 教程一起读：一个讲 USD 侧创作，一个讲 DCC 集成暴露方式。",
      "如果读者关心当前生产环境，应查 Foundry 维护的插件和对应版本文档；本地复刻仅保留历史参考和概念路径。",
      "维护本页时不要把 Katana 节点名、plugin 名称、variant set 名称翻译成中文，因为这些名称通常要和 DCC UI 或脚本参数一一对应。",
    ],
    terms: [
      ["variant switching", "变体切换"],
      ["Katana USD plugin", "Katana USD 插件"],
      ["Foundry-supported plugin", "Foundry 维护插件"],
      ["variant set", "变体集"],
      ["variant selection", "变体选择"],
      ["historical tutorial", "历史教程"],
    ],
  },
  {
    output: "full_site/release/user_guides/namespace_editing.html",
    title: "Namespace Editing",
    summary:
      "`Namespace Editing` 讨论在 composed stage 上删除、移动、重命名或 reparent prim/property。它处理的是组合后的命名空间路径和跨层 path fixups，不是简单地在单个 `.usda` 文本里改字符串。",
    notes: [
      "namespace edit 的对象是 composed prim 或 property；操作包括 delete、move、rename 和 reparenting。读者应先确认当前 edit target 和 layer stack，避免把意见写到错误层。",
      "直接使用 `SdfLayer` 或局部 `UsdStage` API 只能编辑单层中的对象，难以自动修复所有跨层 path target；namespace editing 关注的是组合语义下的安全路径更新。",
      "`relocates` composition arc 可表达非破坏性重定位：源资产保持原始结构，上层通过 relocates 改变组合后的命名空间布局。",
      "path fixups 很重要：移动或删除对象后，relationships、connections、inherits、specializes、variant 里的路径引用都可能需要同步更新。",
      "维护中文层时保留 `LayerStack`、`EditTarget`、`relocates`、`reparenting` 等术语原样，帮助读者和 API/规范文本对照。",
    ],
    terms: [
      ["namespace edit", "命名空间编辑"],
      ["LayerStack", "层栈"],
      ["EditTarget", "当前编辑目标"],
      ["path fixups", "路径引用修复"],
      ["relocates", "重定位组合弧"],
      ["reparenting", "重设父级"],
    ],
  },
  {
    output: "full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html",
    title: "AccessibilityAPI",
    summary:
      "`AccessibilityAPI` 是 usdUI 领域的 applied API schema，用于在 prim 上提供可被 runtime accessibility frameworks 使用的信息。它表达 label、description、priority 这类无障碍元数据，不改变几何、材质或渲染结果。",
    notes: [
      "`AccessibilityAPI:default` 出现在 `prepend apiSchemas` 中，表示把命名实例的 applied API 附加到目标 prim；示例中的 `default` 是实例名，应保留英文原样。",
      "`accessibility:default:label` 是给辅助工具和 UI 展示的短名称；它通常应简洁、可读，并能帮助语音控制或屏幕阅读器识别对象。",
      "`accessibility:default:description` 提供更长描述，适合解释对象外观、用途或交互线索；它是用户体验元数据，不应被当作渲染说明。",
      "`accessibility:default:priority` 可帮助 runtime 或 assistive tooling 决定提示顺序或重要性。token 值如 `standard` 必须保留原样。",
      "该 schema 适合和 `ObjectHints`、`PrimHints`、`PropertyHints` 等 usdUI 页面一起读：它们共同把资产语义和运行时 UI/交互提示连接起来。",
    ],
    terms: [
      ["AccessibilityAPI", "无障碍信息 API schema"],
      ["accessibility frameworks", "无障碍框架"],
      ["assistive tooling", "辅助工具"],
      ["label", "短标签"],
      ["description", "详细描述"],
      ["priority", "呈现优先级"],
    ],
  },
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
      <h2>中文二次精修导读 / Second-pass Chinese Reading Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English API names, schema names, function names, property names, mathematical notation, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>|    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
  results,
}, null, 2));
