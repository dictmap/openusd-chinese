import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-036";

const refinements = [
  {
    output: "full_site/api/class_hd_instance_registry.html",
    title: "HdInstanceRegistry< VALUE > Class Template",
    notes: [
      "`HdInstanceRegistry< VALUE >` 是 Hydra 中用于管理 `HdInstance` 的 dictionary container，模板参数 `VALUE` 表示实例记录或缓存值的具体类型。",
      "英文摘录只给出核心定位：它是 `HdInstance` 的字典容器；因此本页应按 registry / lookup / value lifetime 的容器语义阅读，而不是渲染任务本身。",
      "关联文件为 `instanceRegistry.h`，关联类型为 `HdInstance`；这说明该类处在 instancing 管理层，通常服务于共享实例、资源复用或按 key 查找实例状态。",
      "阅读本类时应重点保留 template、dictionary container、registry、VALUE 和 HdInstance 等术语，避免把实例注册表误解为 USD prim 列表。",
      "后续完整翻译应补成员函数如何插入、查找、复用和释放实例；本轮只补类职责、模板边界和阅读路径。"
    ],
    terms: [
      ["class template", "类模板"],
      ["dictionary container", "字典容器"],
      ["instance registry", "实例注册表"],
      ["VALUE", "VALUE"],
      ["HdInstance", "HdInstance"]
    ]
  },
  {
    output: "full_site/api/class_hd_render_buffer.html",
    title: "HdRenderBuffer Class Reference",
    notes: [
      "`HdRenderBuffer` 是 abstract render buffer，表示可以被渲染写入的数据资源句柄，例如 draw target 的 2D image 或 auxiliary rendering output。",
      "英文摘录说明 render buffer 可以作为 indexed prim 使用，通过 `HdSceneDelegate` 获取 buffer properties；也可以 out of band 创建并直接提供 allocation parameters。",
      "Render buffer 可以被 render passes 作为目标，并提供 mapping functionality 用于读取和写入 buffer data；阅读时应把 allocation、render target、map/unmap 三类职责分开。",
      "关联类型包括 `SdfPath`、`HdSceneDelegate`、`HdRenderParam`、`HdBprim`、`GfVec3i`、`VtValue`、`HdTask`，说明它连接 scene delegate、buffer prim 和任务/渲染参数。",
      "本页中文层保留 `HdRenderBuffer`、indexed prim、out of band、render pass、mapping 等术语；后续完整翻译应补分配、格式、维度、映射和脏状态方法。"
    ],
    terms: [
      ["render buffer", "渲染缓冲"],
      ["data resource", "数据资源"],
      ["indexed prim", "索引 prim"],
      ["allocation parameters", "分配参数"],
      ["mapping functionality", "映射功能"]
    ]
  },
  {
    output: "full_site/api/class_hd_scene_delegate.html",
    title: "HdSceneDelegate Class",
    notes: [
      "`HdSceneDelegate` 是 Hydra render index 与 client scene graph 之间的数据交换适配器，是传统 Hydra delegate API 的核心入口之一。",
      "英文摘录称它是 adapter class providing data exchange with the client scene graph；因此它负责让 Hydra 从宿主场景中查询 topology、transform、primvar、material、buffer 和时间采样等数据。",
      "关联类型非常多，包括 `HdRenderIndex`、`SdfPath`、`HdMeshTopology`、`HdBasisCurvesTopology`、`GfMatrix4d`、`VtValue`、`HdTimeSampleArray`、`HdRenderBufferDescriptor`、`HdPrimvarDescriptor` 等，说明它跨越几何、显示样式、primvar、buffer 和采样。",
      "本页还列出 `UsdImagingDelegate`、`HdSceneIndexAdapterSceneDelegate`、`HdUnitTestDelegate`、`HdxFreeCameraSceneDelegate` 等派生或相关 delegate，读者可用它们区分 USD imaging、scene index adapter、测试和相机 delegate 语境。",
      "后续完整翻译应逐项补 Get/Sync/dirty bits/primvar/topology/time sample 等接口；本轮只补类定位、数据交换边界和关键关联类型。"
    ],
    terms: [
      ["scene delegate", "场景委托"],
      ["client scene graph", "客户端场景图"],
      ["render index", "渲染索引"],
      ["primvar descriptor", "primvar 描述符"],
      ["time sample", "时间采样"]
    ]
  },
  {
    output: "full_site/api/class_hd_st_dispatch_buffer.html",
    title: "HdStDispatchBuffer Class",
    notes: [
      "`HdStDispatchBuffer` 是 Storm/HdSt 中的 GPU dispatch buffer，英文摘录称其为 simple array of unsigned integers 的 VBO。",
      "该 buffer 用于在 GPU 上准备 indirect dispatch 数据，可被 `MultiDrawIndirect` 或 `DispatchComputeIndirect` 消费；这说明它服务于 draw/compute 的间接调度路径。",
      "同一 uint array 的 interleaved subsets 会以不同方式绑定，为 shaders 提供额外数据接口；每个绑定会在 uint array 之上定义 `BufferResourceView`。",
      "`HdBufferArray` 聚合这些 views，`HdResourceBinder` 按指定 binding method 和 interleaved offset 绑定资源；关联类型包括 `HdStResourceRegistry`、`TfToken`、`HdTupleType`、`HdStBufferResource` 和 `HdBufferArray`。",
      "本页中文层保留 VBO、indirect dispatch、MultiDrawIndirect、DispatchComputeIndirect、BufferResourceView 等 GPU/API 术语；后续完整翻译应补资源创建、绑定和同步方法。"
    ],
    terms: [
      ["VBO", "VBO"],
      ["indirect dispatch", "间接调度"],
      ["unsigned integer array", "无符号整数数组"],
      ["BufferResourceView", "BufferResourceView"],
      ["interleaved offset", "交错偏移"]
    ]
  },
  {
    output: "full_site/api/class_hd_st_render_pass_state.html",
    title: "HdStRenderPassState Class",
    notes: [
      "`HdStRenderPassState` 是 Storm/HdSt render pass 之间共享的 rendering parameters 集合，用来表达 GL states、uniforms 或 shaders。",
      "英文摘录说明这些参数 used among render passes；因此它不是单个 draw item，而是 render pass 执行时需要的状态包。",
      "关联类型包括 `GfVec4f`、`GfVec4d`、`GfVec4i`、`GfMatrix4d`、`HdCamera`、`CameraUtilFraming`、`HgiGraphicsCmdsDesc`、`HgiGraphicsPipelineDesc`、`HgiCapabilities`、`Hgi` 等，说明它连接相机、framing、pipeline desc 和 Hgi 图形命令。",
      "阅读本页时应把 viewport/framing、camera matrices、render pass GL/Hgi state、shader/uniform 配置分开；具体方法以后续 member list 为准。",
      "本页中文层保留 `HdStRenderPassState`、GL states、uniforms、shaders、HgiGraphicsPipelineDesc 等术语，避免把状态对象误解为渲染缓冲或 scene delegate。"
    ],
    terms: [
      ["render pass state", "render pass 状态"],
      ["GL states", "GL 状态"],
      ["uniforms", "uniforms"],
      ["graphics pipeline", "图形管线"],
      ["camera framing", "相机 framing"]
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
