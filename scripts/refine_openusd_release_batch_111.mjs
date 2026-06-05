import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "release-quality-pass-111";

const refinements = [
  {
    output: "full_site/release/tut_helloworld_redux.html",
    title: "Hello World Redux - Using Generic Prims",
    summary:
      "`Hello World Redux` 回到入门示例，但把重点从 `UsdGeom.Xform.Define` / `UsdGeom.Sphere.Define` 转向 `stage.DefinePrim(path, typeName)`。这页适合用来理解 USD 文件中的类型名字符串如何映射到 typed prim，以及工具在缺少高级 schema 封装时如何保持通用 authoring 能力。",
    notes: [
      "`stage.DefinePrim('/hello', 'Xform')` 和 `stage.DefinePrim('/hello/world', 'Sphere')` 直接使用 typeName 字符串；中文说明应保留 `Xform`、`Sphere` 和路径字面量，避免把它们翻译成普通描述词。",
      "Generic Prims 的价值在工具链中尤其明显：导入器、转换器或检查器可能不知道某个扩展 schema 的专用 Python wrapper，但仍可通过 typeName 创建或保留对应 prim。",
      "与 `Hello World` 教程相比，本页不是改变 scene 结果，而是改变 authoring API 路径。两个教程生成的层级相近，差别在于强类型 schema API 与通用 `DefinePrim` 的取舍。",
      "`HelloWorldRedux.usda` 是教程输出文件名，不能翻译或改写；它用于和前一页 `HelloWorld.usda` 对比，展示同一基本结构可由不同 API 风格创作。",
      "读者应把本页看作兼容性教程：typed schema API 更易读、更安全，generic API 更适合未知类型、批处理和跨插件 schema 的工具场景。",
    ],
    terms: [
      ["stage.DefinePrim", "按路径和 typeName 定义 prim"],
      ["Generic Prims", "通用 prim 创作方式"],
      ["typeName", "USD prim 类型名字串"],
      ["Xform", "变换 prim 类型名"],
      ["Sphere", "球体 prim 类型名"],
      ["HelloWorldRedux.usda", "本教程输出层文件"],
    ],
  },
  {
    output: "full_site/release/tut_referencing_layers.html",
    title: "Referencing Layers",
    summary:
      "`Referencing Layers` 讲的是把已有 USD layer 或其中的 prim 作为 reference composition arc 组合进新的 stage。它强调资产复用和非破坏性覆盖：上层 stage 可以引用源资产，再添加更强 opinion，而不需要复制或修改源文件内容。",
    notes: [
      "`stage = Usd.Stage.Open('HelloWorld.usda')` 先打开源 stage，随后通过 `SetDefaultPrim` 给被引用层指定默认入口；默认 prim 是很多引用工作流能否顺利定位资产根 prim 的关键。",
      "reference 不是文件复制。它在 composition 阶段把目标 layer 或 prim 的意见组合进当前 prim，因此源资产可以独立发布、缓存和更新。",
      "`UsdGeom.XformCommonAPI(hello).SetTranslate((4, 5, 6))` 演示在源层上 author transform；后续引用它时，上层仍可追加或覆盖自己的 transform opinion。",
      "阅读本页要区分 reference、sublayer 和 payload：reference 通常把资产 prim 组合到某个命名空间位置，sublayer 合并整层意见，payload 则偏向可延迟加载的重资产内容。",
      "本教程是理解 variants、payloads、inherits 和 specializes 的基础。中文层应保留 `composition arc`、`defaultPrim`、`reference` 等英文术语，便于和 USD 组合强度规则对照。",
    ],
    terms: [
      ["reference", "引用组合弧"],
      ["defaultPrim", "默认 prim 入口"],
      ["composition arc", "组合弧"],
      ["Usd.Stage.Open", "打开已有 stage"],
      ["SetDefaultPrim", "设置默认 prim"],
      ["override opinion", "上层覆盖意见"],
    ],
  },
  {
    output: "full_site/release/tut_simple_shading.html",
    title: "Simple Shading in USD",
    summary:
      "`Simple Shading in USD` 演示如何用 `UsdShade` 建立材质网络并绑定到几何体。阅读重点是区分 `Material`、shader prim、input/output 连接、纹理坐标读取和 material binding，而不是把它当作单纯的贴图路径示例。",
    notes: [
      "`UsdPreviewSurface` 是跨工具预览材质的核心 shader 标识；`UsdUVTexture` 和 `UsdPrimvarReader_float2` 则分别承担纹理采样和 UV primvar 读取角色。",
      "示例通常先创建 model root 和 geometry，再创建 `Material` 与 shading network，最后把材质绑定到几何体。这个顺序对应资产发布时常见的组织结构。",
      "`inputs` 与 `outputs` 是理解 UsdShade graph 的关键：纹理节点输出连接到 surface shader 输入，material 的 surface output 再连接到最终 shader 输出。",
      "`UsdShade.MaterialBindingAPI` 表达材质绑定关系；绑定本身不修改 mesh 拓扑，也不等同于把材质数据复制到每个 face 上。",
      "保留 `UsdPreviewSurface`、`UsdUVTexture`、`UsdPrimvarReader_float2`、`st` 等 token 字面量非常重要，因为 DCC、Hydra 和渲染器会按这些名字解释网络语义。",
    ],
    terms: [
      ["UsdShade", "USD 着色和材质网络框架"],
      ["UsdPreviewSurface", "USD 预览表面 shader"],
      ["UsdUVTexture", "USD UV 纹理 shader"],
      ["UsdPrimvarReader_float2", "float2 primvar 读取 shader"],
      ["MaterialBindingAPI", "材质绑定 API"],
      ["st", "常用纹理坐标 primvar 名"],
    ],
  },
  {
    output: "full_site/release/tut_xforms.html",
    title: "Transformations, Animation, and Layer Offsets",
    summary:
      "`Transformations, Animation, and Layer Offsets` 把静态几何、`xformOp` 动画、time samples、reference 和 `Sdf.LayerOffset` 放在同一个 spinning top 示例中。它展示 USD 如何在层组合中复用动画，并通过 offset 和 scale 重定时。",
    notes: [
      "`UsdGeom.Xform` 与 `xformOp` 描述局部变换栈；阅读动画段落时要关注 op 顺序，因为 translate、rotate、scale 的组合顺序会影响最终变换矩阵。",
      "`stage.SetStartTimeCode(1)` 和 `stage.SetEndTimeCode(192)` 建立 stage 的时间范围；time samples 则给属性在不同 `TimeCode` 上 author 值。",
      "`Sdf.LayerOffset` 用于在引用或子层组合时改变时间映射。offset 平移时间，scale 缩放时间，二者可以让同一动画资产在不同 stage 中以不同节奏播放。",
      "本页不只是变换 API 教程，也是在解释 composition 与时间域的交互。reference 引入动画层后，layer offset 会影响被组合进来的时间采样如何落到当前 stage 时间线上。",
      "维护中文层时应保留 `UsdGeom.Xform`、`xformOp`、`Sdf.LayerOffset`、`TimeCode`、`time samples` 等术语原样，避免把 layer offset 误解为几何空间偏移。",
    ],
    terms: [
      ["xformOp", "变换操作"],
      ["time samples", "时间采样"],
      ["TimeCode", "USD 时间码"],
      ["Sdf.LayerOffset", "层时间偏移"],
      ["offset", "时间平移量"],
      ["scale", "时间缩放倍率"],
    ],
  },
  {
    output: "full_site/release/user_guides/collections_and_patterns.html",
    title: "Collections and Patterns",
    summary:
      "`Collections and Patterns` 说明如何用 `CollectionAPI` 描述场景中的成员集合。核心是区分 relationship-mode 与 expression-mode：前者通过显式 include/exclude 关系维护成员，后者通过 `membershipExpression` 和路径模式动态计算成员。",
    notes: [
      "collection 可以包含 prim、property，也可以包含其他 collection；它常被 light-linking、material binding、visibility 控制和批量工具用于表达一组异质对象。",
      "relationship-mode 使用 `collection:name:includes` 和 `collection:name:excludes` 关系来维护成员。它清晰、可审计，适合成员较稳定或需要明确列举的集合。",
      "expression-mode 使用 `pathExpression collection:name:membershipExpression` 按路径模式计算成员。它适合大规模命名空间匹配，但读者必须理解 pattern 语法和 expansion rule。",
      "同一个 collection 不应混用两种模式。`collection:name:mode` 的值决定消费端应按关系目标还是表达式计算成员，混淆会导致成员结果不可预测。",
      "示例里的 `CollectionAPI:relCollection`、`CollectionAPI:expCollection`、`/World/Clothing/Shirts/Red*//` 都应原样保留；中文解释只补充成员计算和下游消费语义。",
    ],
    terms: [
      ["CollectionAPI", "集合 API schema"],
      ["relationship-mode", "关系目标模式"],
      ["expression-mode", "表达式模式"],
      ["membershipExpression", "成员表达式"],
      ["includes", "包含关系目标"],
      ["excludes", "排除关系目标"],
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
