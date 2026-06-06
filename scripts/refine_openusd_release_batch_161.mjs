import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-161";

const refinements = [
  {
    output: "full_site/api/usdabc_page_front.html",
    title: "UsdAbc: Alembic File Format Plugin",
    summary:
      "`usdabc_page_front.html` 是 `UsdAbc` Alembic file format plugin 的模块入口，重点在 USD 与 Alembic 之间的文件格式桥接、插件发现和数据读取/写入边界。它不是 Alembic 规范全文，也不是把 Alembic 场景结构直接等同为 USD composition 的说明。",
    notes: [
      "`UsdAbc` 应先按 file format plugin 阅读：它让 USD 能把 Alembic 资源作为 layer 或外部资产参与管线，而具体 schema 语义仍需要进入 `UsdGeom`、`Sdf` 和目标 prim 页面确认。",
      "Alembic 更偏 baked geometry cache，USD 更强调 composition、layering、variants 和 schema authoring；本页价值在于说明二者如何接入，而不是抹平两种数据模型差异。",
      "调试 Alembic 互操作时，先确认 plugin 是否被 `Plug` 发现、文件扩展名是否触发正确 file format、路径解析是否通过 `Ar`，再看几何数据如何映射到 USD prim。",
      "如果问题涉及 topology、primvars、transform samples 或 time samples，应跳转到 `UsdGeom` 相关类和 Alembic 源文件检查采样语义。",
      "中文补强只补充读取顺序和边界；`UsdAbc`、Alembic、file format、layer、primvars、time samples 等 API/术语保持英文原样，便于和官方文档对照。",
    ],
    terms: [
      ["Alembic 文件格式插件", "Alembic file format plugin"],
      ["文件格式桥接", "file format bridge"],
      ["几何缓存", "geometry cache"],
      ["时间采样", "time samples"],
      ["插件发现", "plugin discovery"],
      ["数据模型边界", "data model boundary"],
    ],
  },
  {
    output: "full_site/api/sdr_glslfx_page_front.html",
    title: "SdrGlslfx: Glslfx parser for Sdr",
    summary:
      "`sdr_glslfx_page_front.html` 是 `SdrGlslfx` 模块入口，描述 Glslfx parser 如何把 Pixar `glslfx` shader container 解析成 `Sdr` 可消费的 shader definition。它位于 shader definition discovery 层，不是材质网络 authoring 页面，也不是 GPU shader runtime 手册。",
    notes: [
      "`SdrGlslfx` 应与 `SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty` 和 parser plugin 机制一起阅读；它的职责是解析 definition metadata，而不是建立 `UsdShade` connection。",
      "`glslfx` 文件通常包含 shader snippets、properties、metadata 和 generation 信息；SdrGlslfx 关注如何把这些信息暴露给 `Sdr` 查询。",
      "如果目标是材质网络，应回到 `UsdShade`；如果目标是具体 shader node 定义，应继续看 `UsdShaders` 或目标 renderer 的 shader discovery 文档。",
      "调试 shader discovery 时，先确认 shader asset path、parser plugin、metadata 字段和 node identifier，再检查下游 renderer 是否支持对应 implementation。",
      "本页的中文层强调 `SdrGlslfx`、`Sdr`、`UsdShade`、`HioGlslfx` 的职责区分，避免把 parser、resource I/O 和 material authoring 混在一起。",
    ],
    terms: [
      ["Glslfx 解析器", "Glslfx parser"],
      ["shader definition", "shader definition"],
      ["解析器插件", "parser plugin"],
      ["节点标识符", "node identifier"],
      ["shader metadata", "shader metadata"],
      ["发现层", "discovery layer"],
    ],
  },
  {
    output: "full_site/api/usd_ri_page_front.html",
    title: "UsdRi: USD RenderMan Utilities",
    summary:
      "`usd_ri_page_front.html` 是 `UsdRi` RenderMan utilities 的模块入口，主要服务 RenderMan 相关的 schema、adapter 或转换辅助场景。阅读时要把它和通用 `UsdRender`、`UsdShade`、`UsdLux` 区分开：本页偏 RenderMan 生态集成，不代表所有 renderer 都会消费同一组约定。",
    notes: [
      "`UsdRi` 名称中的 `Ri` 指向 RenderMan/Renderman Interface 语境；它适合放在 renderer-specific utility 层理解，而不是当作核心 USD 渲染 schema。",
      "若页面条目涉及 light、material、display filter 或 rendering setting，应先判断这是 `UsdRi` 的 RenderMan 扩展语义，还是通用 `UsdRender` / `UsdShade` schema。",
      "在跨 renderer 管线中，`UsdRi` 数据可能需要 adapter 或转换逻辑；是否被非 RenderMan renderer 消费取决于具体插件和约定。",
      "调试 RenderMan 输出时，先检查 USD authored data、RenderMan plugin availability、shader identifiers 和 renderer-specific tokens，再进入 RenderMan 文档确认支持。",
      "中文复刻保留 `UsdRi`、RenderMan、Ri、display filter、integrator、shader id、tokens 等英文标识，避免把专用 renderer 扩展翻译成通用 schema 行为。",
    ],
    terms: [
      ["RenderMan 工具", "RenderMan utilities"],
      ["渲染器专用扩展", "renderer-specific extension"],
      ["RenderMan 接口", "RenderMan Interface"],
      ["显示过滤器", "display filter"],
      ["着色器标识符", "shader identifier"],
      ["适配器边界", "adapter boundary"],
    ],
  },
  {
    output: "full_site/api/usd_utils_page_front.html",
    title: "UsdUtils: USD Utilities",
    summary:
      "`usd_utils_page_front.html` 是 `UsdUtils` 工具模块入口，聚合依赖分析、资产路径处理、layer/stage 工具、flatten/resolve/packaging 辅助、pipeline 便利函数和诊断 helper。它不是单一 schema 模块，而是围绕 USD 工作流的实用函数集合。",
    notes: [
      "`UsdUtils` 常用于命令行工具、asset processing、dependency extraction、package creation 和 pipeline glue code；阅读时应先按任务目标筛选函数族。",
      "如果函数涉及 asset path、dependency 或 package，应结合 `Ar` 资产解析和 `SdfLayer` layer 语义理解，不要只从文件系统路径角度解释。",
      "如果函数涉及 flatten、stage population 或 composition 辅助，应回到 `UsdStage`、`Pcp`、`Sdf` 页面确认语义和副作用。",
      "`UsdUtils` 的便利函数可能封装多个底层模块，因此调试时要把 utility failure 拆成 asset resolver、layer I/O、composition、schema validation 或 file format plugin 问题。",
      "本页适合作为工具箱导航：中文层提供入口分类和风险边界，具体 signature、参数和返回值仍需要进入目标函数或类页面确认。",
    ],
    terms: [
      ["工具模块", "utility module"],
      ["依赖分析", "dependency analysis"],
      ["资产路径处理", "asset path handling"],
      ["打包辅助", "packaging helper"],
      ["管线便利函数", "pipeline convenience function"],
      ["组合副作用", "composition side effect"],
    ],
  },
  {
    output: "full_site/api/usd_u_i_page_front.html",
    title: "UsdUI: USD UI Schemas",
    summary:
      "`usd_u_i_page_front.html` 是 `UsdUI` UI schema 入口，覆盖 `UsdUIBackdrop`、`UsdUINodeGraphNodeAPI`、`UsdUISceneGraphPrimAPI`、`UsdUIPrimHints`、`UsdUIPropertyHints` 等面向工具界面的 hints 和展示辅助信息。它描述 UI metadata/schema，不改变 USD scene 的核心几何、材质或物理语义。",
    notes: [
      "`UsdUI` 主要帮助 DCC、node editor、scene graph browser 或 review tool 更好地展示 prim、property、node graph 和 backdrop 信息。",
      "`UsdUIPrimHints`、`UsdUIPropertyHints`、`UsdUISceneGraphPrimAPI` 等 API 是工具提示层，不能被误读为渲染、物理或 composition 的权威语义。",
      "`UsdUIBackdrop` 和 `UsdUINodeGraphNodeAPI` 常与 node graph 布局、分组和可视化有关，应和 `UsdShadeNodeGraph` 的数据流语义分开阅读。",
      "UI hints 可被不同工具以不同方式消费；如果某个 viewer 没显示 hint，不一定表示 USD 数据无效，可能只是工具未实现该 hint。",
      "中文复刻保留 schema/API 名称，并把它定位为 tool-facing annotation 层，帮助用户判断哪些内容影响界面，哪些内容影响 scene description 本体。",
    ],
    terms: [
      ["UI schema", "UI schema"],
      ["工具提示层", "tool-facing hint layer"],
      ["属性提示", "property hints"],
      ["prim 提示", "prim hints"],
      ["节点图布局", "node graph layout"],
      ["界面注解", "UI annotation"],
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
