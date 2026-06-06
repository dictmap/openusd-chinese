import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-163";

const refinements = [
  {
    output: "full_site/api/pcp_page_front.html",
    title: "Pcp: PrimCache Population (Composition)",
    summary:
      "`pcp_page_front.html` 是 `Pcp` composition 引擎入口，围绕 prim index、composition arcs、layer stack、payload/reference/variant/inherit/specialize 和 change processing 解释 USD 如何把多层意见组合成可消费结果。它是底层 composition cache 层，不是普通场景编辑教程。",
    notes: [
      "`PcpPrimIndex` 和 `PcpPropertyIndex` 是理解 composition 结果的关键对象；它们描述哪些 arc 和 layer opinions 参与了某个 prim 或 property 的最终解析。",
      "`PcpCache` 缓存 composition 计算结果，并与 change processing 关联；性能问题和脏化范围通常需要结合 cache、layer changes 和 dependency 关系阅读。",
      "Composition arcs 包括 references、payloads、inherits、specializes、variants 和 relocates；同一个页面中的 arc 名称必须按 USD composition 语义保留英文原样。",
      "`Pcp` 与 `Sdf`、`UsdStage` 的分层要区分：`Sdf` 表示低层 layer/spec，`Pcp` 计算 composition，`UsdStage` 提供面向用户的场景访问 API。",
      "调试 composition 时，先定位 prim path 和 layer stack，再查看 prim index、arc source、namespace edits 和 errors；不要只从最终 `UsdPrim` 表象判断根因。",
    ],
    terms: [
      ["组合引擎", "composition engine"],
      ["prim 索引", "prim index"],
      ["组合弧", "composition arc"],
      ["层栈", "layer stack"],
      ["变更处理", "change processing"],
      ["命名空间编辑", "namespace edits"],
    ],
  },
  {
    output: "full_site/api/sdr_page_front.html",
    title: "Sdr: Shader Definition Registry",
    summary:
      "`sdr_page_front.html` 是 `Sdr` shader definition registry 入口，负责发现、解析、缓存和查询 shader definitions。它服务 `UsdShade`、`UsdShaders`、renderer plugins 和 shader discovery 工作流，但不直接 author 材质网络连接。",
    notes: [
      "`SdrRegistry` 是查询入口，`SdrShaderNode` 描述 shader node，`SdrShaderProperty` 描述 input/output/property；三者应和 discovery/parser plugin 一起阅读。",
      "`Sdr` 处理 definition metadata 和 node identity，不负责在 stage 上创建 `UsdShadeShader` prim，也不负责 renderer runtime 执行 shader code。",
      "Shader definitions 可能来自 `glslfx`、MaterialX、renderer-specific discovery plugin 或其他资源；不同来源的 parser 会影响可见属性和实现信息。",
      "若材质网络显示异常，排查顺序通常是 authored `UsdShade` network、shader identifier、`Sdr` discovery result、asset path、renderer support，而不是只看一个 node 名称。",
      "中文层强调 registry/discovery 与 authored material network 的分界，避免把 `Sdr` 当成材质绑定、渲染输出或 shader compiler 的完整替代品。",
    ],
    terms: [
      ["着色器定义注册表", "shader definition registry"],
      ["发现插件", "discovery plugin"],
      ["解析插件", "parser plugin"],
      ["着色器节点", "shader node"],
      ["着色器属性", "shader property"],
      ["节点标识", "node identity"],
    ],
  },
  {
    output: "full_site/api/kind_page_front.html",
    title: "Kind: Extensible Categorization",
    summary:
      "`kind_page_front.html` 是 `Kind` 可扩展分类模块入口，用于表达 model hierarchy 中的 kind taxonomy，例如 component、group、assembly、subcomponent 等。它提供分类约定和查询工具，不直接定义几何、材质或 composition arc。",
    notes: [
      "`KindRegistry` 和 kind tokens 用来注册、查询和验证 kind 层级关系；具体 token 名称和分类关系应保持英文原样，以便和 pipeline 约定对照。",
      "Kind 常与 `UsdModelAPI`、model hierarchy、asset organization 和 pipeline validation 相邻出现；它描述“对象是什么类别”，不是“对象如何组成”。",
      "component/group/assembly 等 kind 会影响浏览、资产打包、验证或工具策略，但不会自动创建 prim、reference、payload 或 variant。",
      "如果某个 model kind 不符合预期，先检查 authored metadata、kind inheritance、registry 是否包含该 kind，再看上层工具如何消费分类。",
      "中文补强主要帮助读者区分 kind taxonomy 与 schema type、prim type、asset role 和 collection membership 等相邻概念。",
    ],
    terms: [
      ["可扩展分类", "extensible categorization"],
      ["kind 层级", "kind hierarchy"],
      ["模型层级", "model hierarchy"],
      ["分类 token", "kind token"],
      ["注册表查询", "registry query"],
      ["资产组织", "asset organization"],
    ],
  },
  {
    output: "full_site/api/vt_page_front.html",
    title: "Vt: Value Types",
    summary:
      "`vt_page_front.html` 是 `Vt` value types 模块入口，覆盖 `VtValue`、`VtArray`、类型擦除、数组容器、值持有和 C++/Python 绑定中的通用值传递机制。它是值容器基础设施，不是具体 schema 属性列表。",
    notes: [
      "`VtValue` 是 type-erased value container，适合表达运行时才确定类型的 USD 值；使用时要注意类型查询、转换和生命周期。",
      "`VtArray<T>` 是 USD 常用同质数组容器，常承载 points、normals、indices、primvars 和 time sampled attribute values。",
      "`Vt` 与 `Gf`、`Sdf`、`Usd` 经常一起出现：`Gf` 提供数学类型，`Vt` 提供值/数组容器，`Sdf/Usd` 使用它们表达属性值。",
      "调试 value mismatch 时，先确认 held type、array element type、role name、tuple size 和 Python binding 转换，而不是只看显示字符串。",
      "中文层保留 `VtValue`、`VtArray`、type erasure、homogeneous array 等英文术语，避免和普通 JavaScript/Python value 概念混淆。",
    ],
    terms: [
      ["值类型", "value types"],
      ["类型擦除", "type erasure"],
      ["同质数组", "homogeneous array"],
      ["值容器", "value container"],
      ["元素类型", "element type"],
      ["绑定转换", "binding conversion"],
    ],
  },
  {
    output: "full_site/api/gf_page_front.html",
    title: "Gf: Graphics Foundations",
    summary:
      "`gf_page_front.html` 是 `Gf` graphics foundations 模块入口，提供向量、矩阵、四元数、范围、射线、包围盒、变换和基础几何/数学工具。它支撑 `UsdGeom`、Hydra、rendering 和 simulation 等上层模块，但本身不 author scene description。",
    notes: [
      "`GfVec*`、`GfMatrix*`、`GfQuat*`、`GfRange*`、`GfRay`、`GfBBox3d` 等类型应按数学对象阅读，重点是坐标系、精度、维度和运算约定。",
      "`Gf` 类型常被 `VtValue` 或 `VtArray` 承载，并最终作为 USD attribute value 使用；容器和值语义需要结合 `Vt` 与 `Usd` 页面确认。",
      "矩阵、变换和包围盒相关 API 容易受行列约定、左/右乘、单位、up axis 和 handedness 影响，中文导读只提示风险，不改写数学符号。",
      "如果问题来自 `UsdGeomXformOp`、camera、bounds 或 ray intersection，应先确定是 `Gf` 数学类型使用问题，还是上层 schema/renderer 解释问题。",
      "本页适合作为基础类型导航，API 名称、类型名、operator、数学符号和模板参数保持原样，方便用户直接跳到具体 class 页面。",
    ],
    terms: [
      ["图形基础", "graphics foundations"],
      ["向量类型", "vector type"],
      ["矩阵类型", "matrix type"],
      ["四元数", "quaternion"],
      ["包围盒", "bounding box"],
      ["坐标系约定", "coordinate system convention"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSection(item) {
  const notes = item.notes
    .map((note) => `        <li><span class="zh">${escapeHtml(note)}</span></li>`)
    .join("\n");
  const terms = item.terms
    .map(
      ([zh, en]) =>
        `        <li><span class="zh">${escapeHtml(zh)}：</span><span class="en">${escapeHtml(en)}</span></li>`,
    )
    .join("\n");

  return `    <section data-cn-refinement="${MARKER}">
      <h2>中文二次索引补强 / Chinese Second-Pass Index Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
      <ul>
${notes}
      </ul>
      <h3>术语对照 / Terms</h3>
      <ul>
${terms}
      </ul>
    </section>
`;
}

function refreshPage(item) {
  const filePath = path.join(ROOT, item.output);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing target page: ${item.output}`);
  }
  const section = buildSection(item);
  let html = fs.readFileSync(filePath, "utf8");
  const existing = new RegExp(
    `    <section data-cn-refinement="${MARKER}">[\\s\\S]*?\\n    </section>\\n`,
  );
  if (existing.test(html)) {
    html = html.replace(existing, section);
  } else {
    const pageStructure = /    <section>\s*<h2>页面结构 \/ Page Structure<\/h2>/;
    if (!pageStructure.test(html)) {
      throw new Error(`Cannot find Page Structure insertion point: ${item.output}`);
    }
    html = html.replace(
      pageStructure,
      `${section}    <section>\n      <h2>页面结构 / Page Structure</h2>`,
    );
  }
  fs.writeFileSync(filePath, html, "utf8");
  return item.output;
}

const updated = refinements.map(refreshPage);
console.log(
  JSON.stringify(
    {
      marker: MARKER,
      updated,
    },
    null,
    2,
  ),
);
