import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-tutorial-quality-pass-002";

const refinements = [
  {
    output: "full_site/release/tut_helloworld.html",
    title: "Hello World - Creating Your First USD Stage",
    notes: [
      "本教程是 USD 入门的最小闭环：创建一个新的 Usd.Stage，在 /hello 下定义 Xform，再在 /hello/world 下定义 Sphere，最后保存为 HelloWorld.usda。",
      "阅读时重点看 Usd.Stage.CreateNew 与 UsdGeom.Xform.Define / UsdGeom.Sphere.Define 的关系：Stage 是承载 layer 的编辑入口，Define 会在指定路径创建 typed prim。",
      "该页的英文代码和命令保持原样；中文层只解释对象关系、路径层级和 .usda 输出含义，避免改写 API 调用。",
      "后续 Inspecting、Referencing、Traversing 等教程都会复用这个简单场景，所以它相当于后续教程的公共起点。"
    ],
    terms: [
      ["Usd.Stage", "USD 舞台对象"],
      ["Xform", "变换 prim"],
      ["Sphere", "球体 prim"],
      ["prim path", "prim 路径"],
      [".usda", "USD 文本层格式"]
    ]
  },
  {
    output: "full_site/release/tut_inspect_and_author_props.html",
    title: "Inspecting and Authoring Properties",
    notes: [
      "本教程接在 Hello World 之后，目标是读取已有 prim，并检查或写入它们的 properties。这里的 property 同时覆盖 attribute 与 relationship 两类可编辑信息。",
      "重点 API 是 stage.GetPrimAtPath、prim.GetAttribute、attribute.Get 和 attribute.Set：它们展示了从 Stage 到 Prim，再到属性值的访问路径。",
      "示例中的几何属性不是独立文件片段，而是写入当前 layer 的 authored opinions。理解这一点有助于后面学习 composition、override 和 value resolution。",
      "中文导读保留 Vt、Usd、UsdGeom 等 API 名称，避免把代码里的 token、路径、属性名翻译掉；这些名称必须与官方英文保持一一对应。"
    ],
    terms: [
      ["property", "属性总称"],
      ["attribute", "数据属性"],
      ["relationship", "关系属性"],
      ["authored opinion", "已创作意见"],
      ["value resolution", "值解析"]
    ]
  },
  {
    output: "full_site/release/tut_converting_between_layer_formats.html",
    title: "Converting Between Layer Formats",
    notes: [
      "本教程说明 USD 原生 layer 文件格式之间如何互转，重点是 .usda、.usdc 与 .usd 三种扩展名的语义差异。",
      "usdcat 不只是查看 layer 内容的命令，也可以通过 -o 输出参数把同一份 layer 写成目标格式；命令、flag 和文件名必须保持英文原样。",
      ".usd 扩展名本身可以承载文本或二进制格式，USD 打开文件时会检测底层格式；因此不要简单把 .usd 理解为单一编码方式。",
      "这页适合和 toolset.html 一起读：前者解释格式转换场景，后者列出 usdcat 及相关命令选项的完整工具入口。"
    ],
    terms: [
      ["layer format", "层文件格式"],
      [".usda", "USD 文本格式"],
      [".usdc", "USD crate 二进制格式"],
      [".usd", "自动检测的 USD 文件扩展名"],
      ["usdcat -o", "usdcat 输出转换参数"]
    ]
  },
  {
    output: "full_site/release/tut_simple_shading.html",
    title: "Simple Shading in USD",
    notes: [
      "本教程演示在 USD 中创建一个带纹理的材质网络，并把 Material 绑定到几何体。阅读重点是 UsdShade 如何表达 shader、input、output 与 material binding。",
      "示例先建立模型根节点和几何，再定义 Material 与 shading network，最后把几何体绑定到该 Material；这条顺序对应实际资产打包时的常见组织方式。",
      "UsdPreviewSurface、UsdUVTexture、UsdPrimvarReader_float2 等名称应保持英文原样，因为它们既是 schema / shader 标识，也是跨 DCC 与渲染器互操作的关键 token。",
      "中文层解释模型、材质、纹理坐标和绑定关系；英文原文与 Python / usda 摘录保留在下方用于核对官方示例。"
    ],
    terms: [
      ["UsdShade", "USD 着色框架"],
      ["Material", "材质"],
      ["shading network", "着色网络"],
      ["UsdPreviewSurface", "USD 预览表面 shader"],
      ["material binding", "材质绑定"]
    ]
  },
  {
    output: "full_site/release/tut_xforms.html",
    title: "Transformations, Animation, and Layer Offsets",
    notes: [
      "本教程把变换、动画和 layer offset 放在同一个 spinning top 示例中讲解，适合用来理解 USD 如何在多层文件之间重定时动画。",
      "第一阶段建立静态几何，第二阶段通过 xformOp 和 time samples 添加动画，第三阶段通过 reference 与 layer offset 复用并调整动画时间。",
      "阅读代码时应保留 UsdGeom.Xform、xformOp、Sdf.LayerOffset、TimeCode 等英文 API 名称；中文解释只补充这些概念在时间域和层组合中的作用。",
      "这页与 Time and Animated Values、Referencing Layers 有强关联：一个解释时间采样，一个解释组合弧，本页把二者合在可运行示例里。"
    ],
    terms: [
      ["xformOp", "变换操作"],
      ["time samples", "时间采样"],
      ["LayerOffset", "层时间偏移"],
      ["reference", "引用组合弧"],
      ["TimeCode", "时间码"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的阅读路径和术语说明；英文页面名、链接、代码、命令和原文摘录继续保留，用于和官方文档逐项对照。</p>
      <p class="en">This section adds Chinese-first reading guidance for ${escapeHtml(item.title)} while retaining the English page name, links, code, commands, and source excerpts for comparison with the official documentation.</p>
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
    const pageStructure = /(    <section>\s*<h2>(?:页面结构|椤甸潰缁撴瀯) \/ Page Structure<\/h2>)/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot locate Page Structure insertion point in ${item.output}`);
    }
    html = html.replace(pageStructure, `${section}\n$1`);
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
