import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-index-quality-pass-158";

const refinements = [
  {
    output: "full_site/api/usd_proc_page_front.html",
    title: "UsdProc: USD Schemas for Procedurals",
    summary:
      "`usd_proc_page_front.html` 是 `UsdProc` 模块入口，当前核心是 `UsdProcGenerativeProcedural`。它描述 scene description 中 procedural prim 的 authored schema 语义，帮助下游系统发现和解释程序化数据，但不直接实现几何生成、求值调度或 renderer runtime。",
    notes: [
      "`UsdProcGenerativeProcedural` 表示由程序生成或扩展的数据入口；它更像 USD schema 声明，而不是 generator 的 C++/Python 执行代码。",
      "本页官方范围很窄，初始形式只有单个 schema，因此中文导读应强调边界，避免把它扩写成完整 procedural framework 手册。",
      "如果 procedural 需要被 Hydra 消费，应继续阅读 `UsdHydraGenerativeProceduralAPI`、`HdGpGenerativeProcedural` 或具体 render delegate 文档。",
      "`UsdProc` 与 `Plug`、`Sdr`、`UsdHydra` 可能在插件发现、shader/procedural registry、Hydra 执行路径上相邻出现，但职责并不相同。",
      "阅读本页时先确认 prim 是否需要 authored procedural schema，再判断运行时系统如何发现、实例化或执行对应 procedural provider。",
    ],
    terms: [
      ["程序化 schema", "procedural schema"],
      ["生成式程序化对象", "generative procedural"],
      ["程序化 prim", "procedural prim"],
      ["下游系统", "downstream system"],
      ["运行时 provider", "runtime provider"],
      ["渲染代理边界", "render delegate boundary"],
    ],
  },
  {
    output: "full_site/api/plug_page_front.html",
    title: "Plug: Plugin Framework",
    summary:
      "`plug_page_front.html` 是 `Plug` 插件框架入口，负责 plugin discovery、registration、metadata 读取、plugin loading 以及和 `TfType` 类型系统的衔接。它是 OpenUSD 可扩展架构的底层机制，不是某一个 schema 或 renderer 插件的具体实现文档。",
    notes: [
      "`PlugPlugin` 定义插件模块接口，`PlugRegistry` 负责发现、注册和查找插件；客户端可以依赖首次使用时自动注册，也可以手动调用 `PlugRegistry::RegisterPlugins`。",
      "`PlugNotice::DidRegisterPlugins` 是插件注册事件通知，适合理解系统如何在新插件可用时通知依赖方刷新 registry 或 metadata。",
      "Metadata 部分说明 Plug 能查找插件中定义的 `TfType`，反查提供某个 type 的 plugin，并读取 plugin 或 type 相关 metadata。",
      "Plug 和 `TfType` 应一起读：Plug 解决插件发现与加载，`TfType` 解决运行时类型查询和类型注册；两者共同支撑 schema、file format、shader discovery 等扩展点。",
      "调试插件问题时，本页可作为入口：先确认插件是否被 discovery 找到，再确认 registration、metadata 和 type 是否进入 registry。",
    ],
    terms: [
      ["插件发现", "plugin discovery"],
      ["插件注册", "plugin registration"],
      ["插件元数据", "plugin metadata"],
      ["运行时加载", "runtime loading"],
      ["类型提供方", "type provider"],
      ["注册通知", "registration notice"],
    ],
  },
  {
    output: "full_site/api/hio_page_front.html",
    title: "Hio: Hydra Resource I/O",
    summary:
      "`hio_page_front.html` 是 `Hio` Hydra Resource I/O 入口，关注 shader container、image/texture I/O 和 field texture data 等渲染资源加载能力。它服务于 Hydra/Storm 等成像路径的资源层，而不是 scene graph、composition 或 render task 调度层。",
    notes: [
      "`HioGlslfx` 负责解释 Pixar `glslfx` GPU shader container format，可用于 shader snippets composition 和 code generation metadata。",
      "`HioImage` 提供 plugin-based image/texture reading abstraction，`hdStorm` 使用它处理 image I/O；实现路径可能包括 `HioStb_Image` 和 `HioOIIO_Image`。",
      "`HioFieldTextureData` 面向 volume/field texture 资源，和 `UsdVol` 或 renderer 侧 volume sampling 可能相邻，但 Hio 只处理资源 I/O 层。",
      "`Working With Image File Formats` 是图像格式插件和部署问题的延伸阅读入口，适合排查 texture format 支持或 image plugin 配置。",
      "读者应把 `Hio` 与 `Hd`、`Hdx`、`HdSt` 区分：`Hio` 读取资源，Hydra task/render pass/scene index 负责组织和消费这些资源。",
    ],
    terms: [
      ["Hydra 资源 I/O", "Hydra Resource I/O"],
      ["着色器容器", "shader container"],
      ["图像读取抽象", "image reading abstraction"],
      ["纹理 I/O", "texture I/O"],
      ["field texture 数据", "field texture data"],
      ["资源加载层", "resource loading layer"],
    ],
  },
  {
    output: "full_site/api/functions_vars_q.html",
    title: "Class Members - Variables - Q",
    summary:
      "`functions_vars_q.html` 是 Class Members - Variables 的 Q 字母段索引，当前主要指向 `UsdVolTokensType`。本页的作用是定位 q 开头的 class member variables 或 token 常量，不能替代 `UsdVolTokensType` 或具体 volume schema 页面。",
    notes: [
      "`UsdVolTokensType` 表示 usdVol schema token 结构，变量名和 token 字面量必须保持英文原样，以便与 generated schema、C++ 常量和 Python 绑定对照。",
      "Q 段变量索引只说明字母导航位置；如果要理解 token 用途，应进入 `UsdVolTokensType` 或相关 `usdVol` schema 页面查默认值、属性名和使用场景。",
      "当前条目很少，中文层不应伪造额外变量列表；准确做法是解释索引用途、token domain 和跳转路径。",
      "如果未来上游在 Q 段加入更多变量，应按所属模块归类，例如 volume schema token、render token、physics token 或其他 generated token table。",
      "本页应和 `functions_func_q.html` 区分：前者是变量/token，后者是函数成员；同一字母段不代表相同 API 类型。",
    ],
    terms: [
      ["变量字母段", "variable letter section"],
      ["schema token 表", "schema token table"],
      ["volume schema token", "volume schema token"],
      ["生成式 token 常量", "generated token constant"],
      ["跳转索引", "navigation index"],
      ["API 类型区分", "API-kind distinction"],
    ],
  },
  {
    output: "full_site/api/functions_rela_t.html",
    title: "Class Members - Related Functions - T",
    summary:
      "`functions_rela_t.html` 是 Class Members - Related Functions 的 T 字母段索引，聚合 `TfRefPtr<T>`、`TfRefBase`、`EfTime`、`PcpInstanceKey`、`SdfSpec`、`TfToken`、`TfPyMethodResult` 等相关函数入口。它用于跳转，不是任一类的完整说明。",
    notes: [
      "`Related Functions` 往往包含友元函数、非成员辅助函数、比较/输出操作符或和 class 紧密绑定的 helper；具体含义要进入目标 class 或 namespace 页面确认。",
      "`TfRefPtr<T>` 与 `TfRefBase` 关联引用计数对象生命周期，常见 related functions 可能涉及比较、swap、输出或辅助构造。",
      "`TfToken` 相关 related functions 通常服务 interned token 字符串比较、输出或转换；不要把它和 schema token table 的变量索引混为一谈。",
      "`PcpInstanceKey`、`SdfSpec`、`EfTime` 等条目说明本页跨 composition、scene description 和 execution/time 语境，必须按所属模块阅读。",
      "`TfPyMethodResult` 指向 Python binding 返回值包装相关语境，读者在绑定层排查问题时应把它和普通 C++ value 或 token 类型区分开。",
    ],
    terms: [
      ["相关函数", "related function"],
      ["友元函数", "friend function"],
      ["非成员辅助函数", "non-member helper"],
      ["引用计数生命周期", "reference-counted lifetime"],
      ["interned token 字符串", "interned token string"],
      ["Python 返回值包装", "Python result wrapper"],
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
