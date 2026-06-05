import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-076";

const refinements = [
  {
    output: "full_site/release/wp_asset_previews.html",
    title: "Asset Previews in USD",
    notes: [
      "`Asset Previews in USD` 解决的是资产库浏览性能问题：不必实时打开并渲染完整 USD stage，也能读取预生成 thumbnail/preview。",
      "proposal 选择把 preview 数据挂在 prim 的 `assetInfo` 下，而不是挂在 layer 上；stage 级预览通常可通过 `defaultPrim` 的 `assetInfo` 找到。",
      "`previews`、`thumbnails`、`defaultImage` 的嵌套字典设计保持 forward-looking：今天可只有基本缩略图，未来可扩展更多 preview 类型。",
      "它和 `UsdGeomModel` texture cards 不同：texture cards 是可渲染替身/视图表现，asset preview 更像轻量索引元数据，服务浏览器、资产管理器和目录 UI。",
      "阅读示例时应保留 `assetInfo`、`previews`、`thumbnails`、`defaultImage` 原名，因为这些 key 是数据互操作约定。"
    ],
    terms: [
      ["Asset Previews", "资产预览"],
      ["assetInfo", "资产信息 metadata 字典"],
      ["previews / thumbnails", "预览 / 缩略图"],
      ["defaultImage", "默认缩略图资产"],
      ["defaultPrim", "stage 默认 prim"],
      ["texture cards", "纹理卡片/替身显示"]
    ]
  },
  {
    output: "full_site/release/wp_usdlux_for_renderers.html",
    title: "Adapting UsdLux to the Needs of Renderers",
    notes: [
      "本 proposal 面向渲染器集成：许多 renderer 把 light、light filter、integrator 视作 shader-like node，单纯 hard-coded schema 转换不够可扩展。",
      "核心方案是让 UsdLux lights/light filters 具备 connectable 能力，并通过 `Sdr` definitions 数据驱动地描述 renderer-facing light parameters。",
      "`UsdLuxPluginLight` 与 `UsdLuxPluginLightFilter` 为插件式 light 类型提供 schema 入口，减少每个 renderer delegate 手写专用桥接逻辑。",
      "`UsdImaging`、`Hydra`、`HdPrman` 和其他 render delegates 的变更说明了该 proposal 不只是 schema 变化，也影响成像管线如何发现和传递 light network。",
      "阅读时要区分 current `UsdLux overview` 的使用说明和本历史 proposal 的设计解释；本页主要回答为什么 UsdLux 需要更接近 shading/network 的模型。"
    ],
    terms: [
      ["UsdLux", "USD 灯光 schema 域"],
      ["Sdr definitions", "Sdr 着色节点定义"],
      ["Connectable", "可连接节点能力"],
      ["UsdLuxPluginLight", "插件式灯光 schema"],
      ["UsdLuxPluginLightFilter", "插件式灯光滤镜 schema"],
      ["render delegates", "渲染代理"]
    ]
  },
  {
    output: "full_site/release/wp_ar2.html",
    title: "Asset Resolution (Ar) 2.0",
    notes: [
      "`Asset Resolution (Ar) 2.0` 是 ArResolver 现代化设计记录，目标是让 USD 更好适配资产管理系统、云/数据库路径和非传统文件系统。",
      "旧接口中的 repository/search path 概念与 Pixar 早期实现绑定较深；proposal 通过 cleanup 和新概念降低 resolver 实现者的负担。",
      "`Identifier` 概念用于区分用户输入的资产路径、锚定后的标识符和最终 resolved asset；这有助于避免路径正规化、相对路径和上下文解析混在一起。",
      "公开 resolver API 标记为 `const` 并采用 non-virtual interface 风格，是为了让并发调用、缓存和线程安全语义更清楚。",
      "阅读本页时应把 `Resolve`、`AssetInfo`、asset writing 和 resolver context string 当成任务分组；当前细节仍需回到 `Ar overview` 与具体 resolver API。"
    ],
    terms: [
      ["ArResolver", "资产解析器"],
      ["Identifier", "资产标识符"],
      ["Resolve", "解析资产路径"],
      ["AssetInfo", "资产信息"],
      ["resolver context", "解析上下文"],
      ["non-virtual interface", "非虚接口模式"]
    ]
  },
  {
    output: "full_site/release/wp_schema_versioning.html",
    title: "Schema Versioning in USD",
    notes: [
      "本 proposal 处理 USD schema 演化问题：同一 stage 中可能组合来自不同版本 schema 的数据，且 prim 可叠加多个 API schemas。",
      "composition 让“prim 的版本”很难成为单一查询结果，因此 proposal 更偏向 per-schema versioning，而不是给整个 prim 贴一个全局版本。",
      "版本信息可体现在 versioned schema names、C++ schema class/codegen 策略和 `apiSchemas` 列表中，例如 `CollectionAPI_1:foo` 与 `CollectionAPI:bar`。",
      "built-in API schemas、auto-apply API schemas、multiple-apply API schemas 都会影响 version conflict 判断和 schema inheritance 解释。",
      "阅读时要把 scene description 中的 authored schema tokens、运行时 `UsdPrim` type info、以及生成的 C++ API 类分开理解，避免把它们当成同一层数据。"
    ],
    terms: [
      ["Schema Versioning", "Schema 版本化"],
      ["per-schema versioning", "按 schema 版本化"],
      ["apiSchemas", "API schema 列表 metadata"],
      ["multiple-apply API schema", "多实例应用 API schema"],
      ["auto-apply API schema", "自动应用 API schema"],
      ["version conflict", "版本冲突"]
    ]
  },
  {
    output: "full_site/release/wp_usdlux_for_geometry_lights.html",
    title: "Adapting UsdLux to Accommodate Geometry Lights",
    notes: [
      "本 proposal 聚焦 geometry/mesh lights：不同渲染器可能把发光几何建模为 light shape，也可能通过 material emission/glow 推导光源。",
      "文档比较 dual-prim 与 single-prim geometry light 的问题，核心是避免几何、材质发光和灯光对象模型之间出现重复或不一致。",
      "`LightAPI` 的对象模型调整让可发光的几何 prim 能以 API schema 形式获得 light 行为，同时保留既有 UsdLux concrete schemas。",
      "`GeometryLight` deprecation、convenience base classes 和 `light:shaderId` 说明 proposal 试图兼容旧 schema、renderer shader 识别和 DCC 工作流。",
      "阅读时应把 material emission/glow 同步问题和 light linking/illumination 语义分开：发光材质可产生视觉亮度，但 renderer 是否把它当作可采样光源还取决于 light API 与 delegate。"
    ],
    terms: [
      ["geometry lights", "几何灯光"],
      ["mesh lights", "网格灯光"],
      ["LightAPI", "灯光 API schema"],
      ["GeometryLight", "旧几何灯光 schema"],
      ["material emission / glow", "材质发光 / glow"],
      ["light:shaderId", "灯光 shader 标识属性"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 追加第二层中文精修说明，重点补足 proposal 的历史状态、对象模型、当前 API 入口和常见误读风险；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds a second Chinese-first refinement layer for ${escapeHtml(item.title)}, focusing on proposal history, object model, current API entry points, and common interpretation risks while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
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
