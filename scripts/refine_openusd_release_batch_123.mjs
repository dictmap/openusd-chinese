import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-123";

const refinements = [
  {
    output: "full_site/release/wp_usdshade.html",
    title: "UsdShade Material Assignment",
    summary:
      "`UsdShade Material Assignment` 是历史设计提案，解释 material binding、collection-based assignment、binding strength、material purpose 和 material resolve 如何共同决定最终渲染材质。它应与 `UsdShade overview page` 对照阅读，而不是当作最新 API 参考的替代品。",
    notes: [
      "direct material binding 会被 descendant 上更强或更近的绑定覆盖；读者需要同时看绑定位置、collection membership 和 binding strength，而不是只看第一个 `material:binding` relationship。",
      "`material purpose` 用来区分 preview、full、allPurpose 等不同消费场景；渲染器是否能使用某个 material output，仍取决于 renderer-specific outputs 和节点网络兼容性。",
      "collection-based binding 适合批量分配材质，但会引入集合定义、包含/排除规则和命名强度的解析顺序；中文导读保留这些英文术语以便对照 usda 示例。",
      "页面中提到的 `PreviewMaterial`、`Skin`、`renderer-specific outputs` 和 `collection-based binding` 都是理解材质解析的关键词，不应被翻译成无法检索的中文专名。",
      "本地补强只解释 proposal 的阅读边界和语义关系；实际实现细节、类接口和 schema 字段仍应以当前 `UsdShade` API 文档为准。",
    ],
    terms: [
      ["material binding", "材质绑定"],
      ["collection-based assignment", "基于集合的材质分配"],
      ["binding strength", "绑定强度"],
      ["material purpose", "材质用途"],
      ["material resolve", "材质解析"],
      ["renderer-specific outputs", "渲染器专用输出"],
    ],
  },
  {
    output: "full_site/release/contributing_to_usd.html",
    title: "Contributing to USD",
    summary:
      "`Contributing to USD` 是贡献流程入口，重点是 Contributor License Agreement、Coding Conventions、Pull Request Guidelines、Git Workflow、GitHub Issues 和 Making Major Changes。阅读时应先确认法律与流程前置条件，再进入代码实现和 review。",
    notes: [
      "`Contributor License Agreement` 是贡献能否被接受的前置条件；它不属于代码风格问题，应该在准备提交前就完成确认。",
      "`Coding Conventions` 和 `Pull Request Guidelines` 用于控制提交质量、变更粒度、命名、测试和审查可读性；不要把它们当成可选建议。",
      "`Git Workflow` 描述 fork、branch、commit、pull request 和 review 的协作路径；命令和 GitHub 术语应保留英文原样，避免误导实际操作。",
      "`Making Major Changes` 强调先通过 issue 或讨论达成共识，再投入大规模实现；这能减少重构、架构变更或行为变更被退回的风险。",
      "本页不是 API 参考，也不是构建手册；它服务于贡献准备、流程合规和沟通边界，具体实现仍需查源码、测试和相关模块文档。",
    ],
    terms: [
      ["Contributor License Agreement", "贡献者许可协议"],
      ["Coding Conventions", "编码规范"],
      ["Pull Request Guidelines", "拉取请求指南"],
      ["Git Workflow", "Git 工作流"],
      ["GitHub Issues", "GitHub 问题跟踪"],
      ["Making Major Changes", "发起重大变更"],
    ],
  },
  {
    output: "full_site/release/spec_usdz.html",
    title: "Usdz File Format Specification",
    summary:
      "`Usdz File Format Specification` 定义 `.usdz` 包装格式的约束：它基于 zip archive，但为了 streaming、alignment、first file、allowed file types 和 USD asset resolution 施加额外规则。不能把 `.usdz` 简单理解为任意 zip 包。",
    notes: [
      "`Zip Constraints` 是本页的关键：`.usdz` 通常要求未压缩存储、特定对齐和可随机访问布局，以便运行时直接读取包内 USD 与资源。",
      "`Layout` 与 `File Types` 决定哪些文件可以进入包、文件顺序如何影响默认层、以及纹理、材质和 USD 层如何被 asset paths 引用。",
      "`Packaging Considerations for Streaming and Random Access` 说明 `.usdz` 的设计目标不仅是打包，还包括在移动端、AR 或预览场景中的高效访问。",
      "`usdzip`、`MIME type`、`FileFormat plugin`、`.usdz`、`.usd`、`.usda`、`.usdc` 等字面量必须保留，中文只解释用途和边界。",
      "可编辑性、可访问性和安全限制属于格式契约的一部分；如果要生成 `.usdz`，应同时核对工具链、资源路径和包内文件类型约束。",
    ],
    terms: [
      ["usdz", "usdz 包装格式"],
      ["zip archive", "zip 归档"],
      ["Zip Constraints", "zip 约束"],
      ["random access", "随机访问"],
      ["usdzip", "USD 打包工具"],
      ["MIME type", "媒体类型"],
    ],
  },
  {
    output: "full_site/release/ref_performance_metrics.html",
    title: "Performance Metrics",
    summary:
      "`Performance Metrics` 记录 USD release 的性能基准资产、环境、采集指标和复现实验方式。它应与 `Maximizing USD Performance` 配合阅读：前者给出可比较的测量方法，后者给出优化思路。",
    notes: [
      "`What We Measure` 说明脚本观察的操作边界，例如加载 `usdview` 插件、打开 stage、遍历 prim、渲染或交互响应；不要把单项指标泛化为整体性能结论。",
      "`What Environment Is Used` 对 Linux、macOS、Windows 和 USD Build 做约束说明；比较结果时必须同时比较硬件、平台、构建选项和资产版本。",
      "`Standard Shader Ball`、`Kitchen Set`、`ALab`、`Moore Lane` 是基准资产或图表入口，名称和图表标签保留英文便于追踪官方数据。",
      "`Running Performance Metrics` 是本地复现入口；如果复现结果不同，应先检查环境差异、缓存状态、构建类型和测试资产，而不是直接判定回归。",
      "本页只记录性能测量和参考数据，不替代 profiler、trace 或生产场景诊断；实际优化仍需结合 scene composition、payload、layers 和 renderer 行为。",
    ],
    terms: [
      ["Performance Metrics", "性能指标"],
      ["What We Measure", "测量内容"],
      ["USD Build", "USD 构建配置"],
      ["Standard Shader Ball", "标准 Shader Ball 资产"],
      ["Kitchen Set", "Kitchen Set 资产"],
      ["Running Performance Metrics", "运行性能指标测试"],
    ],
  },
  {
    output: "full_site/release/spec_usdpreviewsurface.html",
    title: "UsdPreviewSurface Specification",
    summary:
      "`UsdPreviewSurface Specification` 定义跨 film 与 game pipelines 可互换的基础预览材质节点集合。阅读主线是 Goal、Core Nodes、Preview Surface、Texture Reader、Primvar Reader 和 Transform2d，而不是某个单一渲染器的私有 shading 文档。",
    notes: [
      "`Preview Surface` 的输入如 metallic、roughness、opacity、normal 等属于规范字段，应保留英文；中文说明只解释视觉语义和互换边界。",
      "`Texture Reader`、`Primvar Reader` 与 `Transform2d` 共同描述纹理采样、primvar 输入和 UV 变换如何进入 preview material network。",
      "该规范目标是提供基础互换材质，不覆盖所有 renderer-specific shading 能力；复杂材质仍可能需要 renderer-specific outputs 或完整 UsdShade 网络。",
      "film pipeline 与 game pipeline 对实时预览、离线渲染和资产交换的需求不同；`UsdPreviewSurface` 作为共同子集，帮助工具在不同环境中保持可见结果接近。",
      "本地中文补强保留 `UsdPreviewSurface`、节点名、输入名、token literal 和公式/参数名称，避免破坏材质网络和 API 文档之间的对应关系。",
    ],
    terms: [
      ["UsdPreviewSurface", "USD 预览表面材质"],
      ["Core Nodes", "核心节点"],
      ["Preview Surface", "预览表面节点"],
      ["Texture Reader", "纹理读取节点"],
      ["Primvar Reader", "primvar 读取节点"],
      ["Transform2d", "二维变换节点"],
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
      <h2>中文补强导读 / Chinese Refinement Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This refinement section adds page-specific Chinese reading notes for ${escapeHtml(item.title)} while preserving English page names, API names, schema names, property names, commands, code snippets, token literals, links, and official excerpts for direct comparison.</p>
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
