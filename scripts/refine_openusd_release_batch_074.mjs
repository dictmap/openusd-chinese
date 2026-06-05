import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-074";

const refinements = [
  {
    output: "full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html",
    title: "VolumeFieldBase",
    notes: [
      "`VolumeFieldBase` 是所有 UsdVol field schema 的抽象基础类；它本身不是具体体积文件、grid 或 renderer 数据格式。",
      "`Volume` 通过 `field:*` relationships 连接到 `VolumeFieldBase` 派生 prim，因此本页的关键作用是给体积字段 prim 提供共同类型边界。",
      "自定义 UsdVol field schema 应直接或间接继承 `VolumeFieldBase`，这样 `Volume`、shader 输入和工具链才能把它识别为合法 field provider。",
      "继承自 `Xformable` 与 `Imageable` 的 `xformOpOrder`、`purpose`、`visibility`、`proxyPrim` 仍是场景组织属性，不等同于 field payload 本身。",
      "阅读本页时应和 `Volume`、`VolumeFieldAsset`、`OpenVDBAsset`、`Field3DAsset` 一起核对：容器 prim、字段 prim 和外部体积资产各自承担不同职责。"
    ],
    terms: [
      ["VolumeFieldBase", "体积字段抽象基础类"],
      ["UsdVol field schema", "UsdVol 体积字段 schema"],
      ["field:* relationships", "体积字段关系"],
      ["Volume", "体积容器 prim"],
      ["Xformable / Imageable", "可变换 / 可成像基础能力"],
      ["field payload", "体积字段实际数据载荷"]
    ]
  },
  {
    output: "full_site/release/user_guides/time_and_animated_values.html",
    title: "Time and Animated Values",
    notes: [
      "本页解释 USD 如何表达 animated values：属性可以在多个 `TimeCode` 上 author `timeSamples`，查询时再按时间插值或取样。",
      "`TimeCode` 是无单位 double 坐标，不直接等同于 FPS、帧号或 SMPTE；实际播放和换算需要结合 `timeCodesPerSecond`、`framesPerSecond` 等 metadata。",
      "`timeSamples` 示例中的 `1`、`25`、`99` 是时间坐标键，不是数组下标；同一属性在不同 time sample 上可以有不同值。",
      "composition 过程可能发生 automatic 或 explicit timeCode remapping；`LayerOffset`、reference/payload offset 和 clips 会影响子层动画映射到主 stage 的方式。",
      "阅读时应把 layer start/end time、stage 时间单位、attribute value resolution 和 value clips 分开理解，避免把所有时间设置都误读为播放帧率。"
    ],
    terms: [
      ["TimeCode", "时间码坐标"],
      ["TimeSamples", "时间采样"],
      ["timeSamples", "按时间创作的属性值"],
      ["timeCodesPerSecond", "每秒时间码数"],
      ["framesPerSecond", "每秒帧数元数据"],
      ["timeCode remapping", "时间码重映射"]
    ]
  },
  {
    output: "full_site/release/user_guides/variable_expressions.html",
    title: "USD Variable Expressions",
    notes: [
      "Variable expressions 是运行时求值的字符串机制，用于用 layer metadata 中的 `expressionVariables` 动态配置 USD 场景。",
      "表达式变量可用于 asset paths、subLayers、references、payloads、asset-valued attributes、metadata 和 variant selections 等位置。",
      "`expressionVariables` 支持 string、bool、int64、数组和 `None` 等类型；在 USDA 中常通过反引号表达式把变量嵌入路径或选择值。",
      "官方示例中的 `ASSET_PATH` 与 `VARIANT_CHOICE` 分别控制 reference asset path 与 variant selection，适合做多资产、多版本或多环境切换。",
      "本页应和 stage/session layer 组合一起理解：变量表达式改变的是解析出的值，不要求复制大量 scene description 数据。"
    ],
    terms: [
      ["Variable expressions", "变量表达式"],
      ["expressionVariables", "表达式变量 metadata 字典"],
      ["asset paths", "资产路径"],
      ["references / payloads", "引用 / 负载"],
      ["variant selections", "变体选择"],
      ["runtime evaluation", "运行时求值"]
    ]
  },
  {
    output: "full_site/release/wp_render_settings.html",
    title: "Render Settings in USD Proposal",
    notes: [
      "这是一篇已实现 proposal 的历史参考页；当前用法应优先参考 `UsdRender overview`，但本页仍能说明设计动机和 schema 拆分方式。",
      "proposal 目标是在 USD scene configuration 中表达启动渲染所需的 camera、outputs 和 renderer configuration，而不是完整 VFX final-frame 作业系统。",
      "`RenderSettings` 描述全局渲染配置，`RenderProduct` 描述输出 artifact，`RenderVar` 描述 AOV/渲染变量；三者共同组成 UsdRender 的主要配置模型。",
      "`RenderSettingsBase` 中的 `camera`、`resolution`、`pixelAspectRatio` 等属性展示了设置如何在 schema 层被声明和继承。",
      "阅读时应注意 historical/outdated 提示：它解释为什么这样设计，不代表所有细节都是最新 API 文档的权威入口。"
    ],
    terms: [
      ["RenderSettings", "渲染设置 prim"],
      ["RenderProduct", "渲染输出产品 prim"],
      ["RenderVar", "渲染变量 / AOV prim"],
      ["RenderSettingsBase", "渲染设置基础 schema"],
      ["camera / resolution", "相机 / 分辨率"],
      ["historical reference", "历史参考"]
    ]
  },
  {
    output: "full_site/release/wp_stage_variables.html",
    title: "Stage Variable Expressions",
    notes: [
      "本页当前是 proposal 迁移提示页，正文只说明 `Stage Variable Expressions` 已迁移到 `OpenUSD-proposals`。",
      "它不应被伪装成完整白皮书复刻；本地页保留迁移状态、官方链接和清单覆盖状态，避免制造不存在于当前 release 页面的旧正文。",
      "它和 `USD Variable Expressions` 用户指南不是同一类页面：前者是 proposal 指针，后者是面向使用者的功能说明。",
      "如果后续要补齐完整 proposal 内容，应以迁移后的 OpenUSD-proposals 页面为来源，再明确标注来源差异。",
      "本轮中文精修的价值是把页面状态说清楚：该页在 406 清单内已覆盖，但可读正文依赖迁移后的官方 proposal。"
    ],
    terms: [
      ["Stage Variable Expressions", "Stage 变量表达式 proposal"],
      ["OpenUSD-proposals", "OpenUSD proposals 仓库/页面"],
      ["migration notice", "迁移提示"],
      ["proposal pointer", "提案指针页"],
      ["USD Variable Expressions", "USD 变量表达式用户指南"],
      ["current release page", "当前 release 页面"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的概念边界、阅读顺序、语义风险和术语对照；英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录继续保留，便于和官方原页逐项核对。</p>
      <p class="en">This section adds Chinese-first conceptual boundaries, reading order, semantic cautions, and terminology for ${escapeHtml(item.title)} while retaining English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for comparison.</p>
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
