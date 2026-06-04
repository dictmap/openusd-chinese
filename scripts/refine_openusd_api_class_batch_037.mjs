import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-037";

const refinements = [
  {
    output: "full_site/api/class_hd_task.html",
    title: "HdTask Class Reference",
    notes: [
      "`HdTask` 是 Hydra render 期间执行的一项 work unit，属于 abstract task 基类。",
      "开发者可继承 `HdTask` 来准备 resources、运行 3D render passes、运行 compositing 或 color correction 等 2D render passes，或协调应用程序和其他 renderer 的集成。",
      "关联类型包括 `SdfPath`、`HdSceneDelegate`、`HdRenderIndex`、`TfTokenVector`、`HdDriver` 等，说明 task 会在 render index、scene delegate 和驱动上下文之间同步数据。",
      "派生任务包括 `HdxRenderTask`、`HdxPickTask`、`HdxSelectionTask`、`HdxShadowTask`、`HdxPresentTask`、`HdxVisualizeAovTask` 等；阅读时应把 task 看作 `HdEngine::Execute()` 调度的工作节点。",
      "后续完整翻译应补 `Sync`、prepare、execute、dirty bits 和 task 参数语义；本轮只补任务定位、常见派生类和 Hydra 调度语境。"
    ],
    terms: [
      ["unit of work", "工作单元"],
      ["Hydra render", "Hydra 渲染"],
      ["render pass", "render pass"],
      ["scene delegate", "场景委托"],
      ["HdEngine::Execute()", "HdEngine::Execute()"]
    ]
  },
  {
    output: "full_site/api/class_hdx_pick_from_render_buffer_task.html",
    title: "HdxPickFromRenderBufferTask Class",
    notes: [
      "`HdxPickFromRenderBufferTask` 是 Hdx 中用于对已有 ID buffers 执行 picking queries 的任务类。",
      "英文摘录说明该任务会把 `HdxPickTaskContextParams` 提供的 pick frustum 重映射到生成 ID buffers 时使用的 camera frustum。",
      "随后它只针对 pick frustum 覆盖到的 ID buffer 子集运行 pick query；这使它适合从已有 render buffer 中做对象/元素拾取，而不是重新渲染完整场景。",
      "关联类型包括 `HdxPickFromRenderBufferTaskParams`、`HdSceneDelegate`、`HdRenderIndex`、`HdxTask`、`Hgi`、`HdDriver` 等，说明它横跨 Hdx task、GPU 接口和 scene delegate。",
      "本页中文层保留 pick frustum、camera frustum、ID buffer、pick query 等术语；后续完整翻译应补参数结构、Sync、执行流程和结果读取。"
    ],
    terms: [
      ["picking query", "拾取查询"],
      ["ID buffer", "ID buffer"],
      ["pick frustum", "拾取视锥"],
      ["camera frustum", "相机视锥"],
      ["render buffer", "渲染缓冲"]
    ]
  },
  {
    output: "full_site/api/class_hgi_g_l_graphics_cmds.html",
    title: "HgiGLGraphicsCmds Class Reference",
    notes: [
      "`HgiGLGraphicsCmds` 是 `HgiGraphicsCmds` 的 OpenGL implementation，属于 HgiGL 后端中的 graphics command encoder。",
      "该类连接 `Hgi` 抽象图形接口与 OpenGL device/commands；阅读时应把它看作具体 backend 实现，而不是跨后端通用接口本身。",
      "关联类型包括 `GfVec4f`、`GfVec4i`、`HgiGraphicsPipelineHandle`、`HgiCmds`、`HgiGLDevice`、`HgiGraphicsCmdsDesc`、`HgiGL`，说明它涉及 pipeline handle、command descriptor 和 GL device 状态。",
      "本页通常应关注 begin/end command、绑定 pipeline、viewport/scissor、draw、resource barrier 或 push debug group 等图形命令语义；具体成员以后续 member list 为准。",
      "中文导读保留 OpenGL、HgiGraphicsCmds、HgiGLDevice、pipeline handle 等 API 术语，避免把 HgiGL 后端实现与 Hydra task 层混在一起。"
    ],
    terms: [
      ["OpenGL implementation", "OpenGL 实现"],
      ["graphics commands", "图形命令"],
      ["pipeline handle", "管线句柄"],
      ["command descriptor", "命令描述符"],
      ["backend implementation", "后端实现"]
    ]
  },
  {
    output: "full_site/api/class_pcp_arc.html",
    title: "PcpArc Class",
    notes: [
      "`PcpArc` 表示 prim index 中连接两个 nodes 的 arc，是 Pcp composition graph 的基础结构之一。",
      "英文摘录说明 arc 由 source node 拥有，并指向 index 中的 parent node 作为 target；因此它表达的是 composition index 中节点间的关系，而不是 USD stage 中的几何边。",
      "关联类型包括 `PcpArcType`、`PcpNodeRef`、`PcpMapExpression`，说明 arc 需要描述 arc 类型、节点引用和路径/namespace 映射表达式。",
      "阅读本类时应结合 inherits、references、payloads、specializes、variants 等 composition arc 类型理解；具体 arc type 以后续枚举和成员说明为准。",
      "本轮中文层保留 prim index、source、target、parent node、PcpMapExpression 等术语，帮助区分 Pcp 组合图和场景层级图。"
    ],
    terms: [
      ["prim index", "prim index"],
      ["composition arc", "组合 arc"],
      ["source node", "源节点"],
      ["target node", "目标节点"],
      ["map expression", "映射表达式"]
    ]
  },
  {
    output: "full_site/api/class_pcp_error_unresolved_prim_path.html",
    title: "PcpErrorUnresolvedPrimPath Class",
    notes: [
      "`PcpErrorUnresolvedPrimPath` 表示 asset paths 无法同时 resolved 和 loaded 的 Pcp 错误类型。",
      "它来自 `errors.h`，关联基类为 `PcpErrorBase`，说明它属于 composition / asset resolution 期间的错误报告对象。",
      "关联类型还包括 `PcpSite`、`SdfPath`、`PcpArcType`，提示错误通常需要说明发生位置、相关路径和触发该错误的 composition arc 类型。",
      "阅读本页时应把 resolved 与 loaded 分开理解：resolved 是资产路径解析成功，loaded 是解析后的资源可实际载入；本错误强调两者不能同时满足。",
      "本轮中文层不改写类名和错误类型，只补错误语义、上下文类型和排查方向；后续完整翻译应补错误字段、格式化输出和诊断信息。"
    ],
    terms: [
      ["unresolved prim path", "未解析的 prim 路径"],
      ["asset path", "资产路径"],
      ["resolved", "已解析"],
      ["loaded", "已加载"],
      ["composition error", "组合错误"]
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
      <p class="zh">本区块针对 ${escapeHtml(item.title)} 补充中文优先的类职责、相关类型、关键语义和术语对照；英文页面名、类名、方法名、template 参数、代码、链接和原文摘录继续保留，便于与官方 Doxygen 页面核对。</p>
      <p class="en">This section adds Chinese-first class responsibilities, related types, key semantics, and terminology for ${escapeHtml(item.title)} while retaining English page names, class names, method names, template parameters, code, links, and source excerpts for comparison with the official Doxygen page.</p>
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
    const pageStructure = /    <section>\s*<h2>[^<]*Page Structure<\/h2>/;
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
