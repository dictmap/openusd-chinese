import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MARKER = "api-class-quality-pass-131";

const refinements = [
  {
    output: "full_site/api/class_gf_vec2i.html",
    title: "GfVec2i",
    summary:
      "`GfVec2i` 是 Gf Linear Algebra 中的二维 `int` vector 值类型，适合表示离散索引、整数坐标、计数和小型二维整型量。阅读本页时要把它和 `GfVec2f` / `GfVec2d` 区分开：它强调整型分量与轻量值语义，不承担连续几何精度或 scene prim 职责。",
    notes: [
      "`ScalarType` 对应 `int`，因此加减、缩放和比较都应按整型语义理解；如果后续计算需要浮点归一化、插值或高精度距离，应显式转换到 `GfVec2f` 或 `GfVec2d`。",
      "`data()`、`GetArray()` 和 `operator[]` 暴露底层分量访问方式；中文说明要保留索引表达式和 API 名称，避免把它误译成 USD attribute 数组。",
      "`GetLengthSq()` 适合避免开方的长度比较；对于整型向量，平方长度通常比直接讨论 normalized vector 更稳妥，因为整数分量不自然表示单位向量。",
      "`GetProjection()`、`GetComplement()` 和 `GfDot()` 等操作说明该类仍处在向量代数体系中，但计算结果和截断/转换边界需要结合整型精度核对。",
      "`Axis()`、`XAxis()`、`YAxis()` 或类似静态常量通常用于构造标准基向量；这些值可以作为索引方向、网格方向或工具算法中的轻量常量，而不是场景空间里的 transform 节点。",
    ],
    terms: [
      ["GfVec2i", "Gf 二维 int 向量"],
      ["ScalarType", "分量标量类型"],
      ["integer component", "整型分量"],
      ["GetLengthSq", "平方长度查询"],
      ["basis vector", "基向量"],
      ["projection", "投影"],
    ],
  },
  {
    output: "full_site/api/class_glf_draw_target.html",
    title: "GlfDrawTarget",
    summary:
      "`GlfDrawTarget` 表示带有多个 image attachments 的 GL render target，可理解为离屏 render pass 的输出容器。它把 framebuffer、attachment texture、depth component、MSAA resolve 和 shader sampler 使用路径连接起来，是 OpenGL 渲染辅助层中的资源管理对象。",
    notes: [
      "`AddAttachment()`、`DeleteAttachment()`、`GetAttachment()` 和 `GetAttachments()` 围绕 named attachments 工作；这些 attachment 通常映射到 `GL_TEXTURE_2D` image，而不是 USD scene graph 中的 prim。",
      "`Bind()`、`Unbind()`、`IsBound()` 和 `IsValid()` 关注 framebuffer 绑定状态和 GL 资源有效性；阅读时应把它们和 Hydra render pass 的高层调度区分开。",
      "`GetFramebufferId()` 与 `GetFramebufferMSId()` 暴露 framebuffer object 标识；带 `MS` 的接口通常与 MSAA 目标相关，后续 `Resolve()` 负责把多重采样结果解析到可采样附件。",
      "`CloneAttachments()` 和 `ClearAttachments()` 说明附件集合可以复制或清理；这类操作影响离屏渲染输出资源，不能简单视为清空 USD 图层或材质绑定。",
      "本页英文原文提到输出 arbitrary variables 后供 GLSL shaders 作为 texture samplers 使用；中文层应保留 `GLSL shaders`、`texture samplers`、`render pass` 等术语，方便读者对照图形管线概念。",
    ],
    terms: [
      ["GlfDrawTarget", "GL 绘制目标"],
      ["image attachment", "图像附件"],
      ["framebuffer", "帧缓冲对象"],
      ["MSAA", "多重采样抗锯齿"],
      ["Resolve", "解析多重采样结果"],
      ["texture sampler", "纹理采样器"],
    ],
  },
  {
    output: "full_site/api/class_hd_data_source_locator.html",
    title: "HdDataSourceLocator",
    summary:
      "`HdDataSourceLocator` 是 Hydra data source 体系中的定位路径对象，由一组短 `TfToken` 序列标识某个 data source 的位置。它更像 tokenized path 或 locator key，而不是文件系统路径；核心语义集中在 prefix、intersection、append/prepend 和 hashable comparison。",
    notes: [
      "`Append()` 与 `Prepend()` 用于组合 locator 片段；它们表达的是 Hydra data source namespace 内部的 token 路径拼接，不应翻译成文件路径拼接。",
      "`GetElement()`、`GetFirstElement()`、`GetLastElement()` 和 `GetElementCount()` 说明 locator 是有序 token 列表；`TfToken` 的保留有助于理解比较和缓存性能。",
      "`HasPrefix()`、`GetCommonPrefix()` 与 `Intersects()` 是 dirty propagation、data source filtering 和 scene index 更新中常见的范围判断入口。",
      "`EmptyLocator()` 与 `IsEmpty()` 需要按 locator 语义理解：空 locator 可以表示根级位置或无具体子路径，具体含义要结合调用方的 dirty/invalidated 范围判断。",
      "`GetString()` 主要用于调试或展示；真实比较和哈希应优先依赖 token 序列本身，而不是把 locator 降级成普通字符串处理。",
    ],
    terms: [
      ["HdDataSourceLocator", "Hydra 数据源定位器"],
      ["TfToken", "Tf token 标识"],
      ["locator", "定位路径"],
      ["prefix", "前缀"],
      ["Intersects", "范围相交判断"],
      ["dirty propagation", "脏状态传播"],
    ],
  },
  {
    output: "full_site/api/class_hd_instance_registry.html",
    title: "HdInstanceRegistry< VALUE >",
    summary:
      "`HdInstanceRegistry< VALUE >` 是 Hydra 中围绕 `HdInstance` 的 dictionary container，模板参数 `VALUE` 表示具体缓存值或实例记录。它的重点不是几何 instancing 的最终绘制，而是按 key 查找、复用、失效和回收实例相关数据。",
    notes: [
      "`GetInstance()` 与 `FindInstance()` 的差别在于是否创建或只查找既有实例；阅读时应结合调用方缓存策略判断是否会产生新条目。",
      "`GarbageCollect()` 表明 registry 负责清理不再需要的实例记录；这通常与 render index、resource registry 或同步阶段的生命周期管理相关。",
      "`Invalidate()` 用于标记或清除已有实例状态；它不是删除 USD prim，而是影响 Hydra 内部实例缓存的有效性。",
      "`begin()`、`end()`、`size()` 和 `const_iterator` 说明该类可按容器方式遍历；中文说明要保留 iterator 和 template 术语，方便读者核对 C++ 用法。",
      "`InstanceType` 与 `VALUE` 的模板关系决定 registry 存储的具体数据形态；不要把 `VALUE` 翻译成固定类型，它是由使用场景提供的模板参数。",
    ],
    terms: [
      ["HdInstanceRegistry", "Hydra 实例注册表"],
      ["VALUE", "模板值类型"],
      ["HdInstance", "Hydra 实例对象"],
      ["dictionary container", "字典式容器"],
      ["GarbageCollect", "垃圾回收"],
      ["Invalidate", "失效标记"],
    ],
  },
  {
    output: "full_site/api/class_hd_st_render_pass_state.html",
    title: "HdStRenderPassState",
    summary:
      "`HdStRenderPassState` 是 Storm / HdSt render pass 之间共享的一组 rendering parameters，用 GL states、uniforms 或 shaders 表达渲染状态。它承接 camera matrices、viewport、clip planes、lighting shader、render pass shader 和 AOV resolve 等状态，不是单个 draw item。",
    notes: [
      "`Prepare()` 与 `Bind()` 通常分别对应准备 GPU/GL 状态和绑定执行状态；阅读时要结合 render pass 生命周期，而不是把它们理解为普通数据 setter。",
      "`GetWorldToViewMatrix()`、`GetProjectionMatrix()` 和 `GetCullMatrix()` 体现 camera 与裁剪相关矩阵；矩阵名和空间变换方向必须保留英文 API 名称以免误读。",
      "`SetLightingShader()`、`GetLightingShader()`、`SetRenderPassShader()` 和 `GetRenderPassShader()` 说明该状态对象会连接具体 shader 程序和 pass 执行。",
      "`ComputeViewport()`、`SetCameraFramingState()` 与 clip plane 相关接口决定最终 framebuffer 区域和相机 framing；这些状态会影响渲染结果而不是场景组成。",
      "`SetResolveAovMultiSample()` 与 `GetGraphicsPipelineHash()` 分别关联 AOV 多重采样解析和 graphics pipeline 缓存；读者应把它们放在 Storm 渲染性能和管线复用语境中理解。",
    ],
    terms: [
      ["HdStRenderPassState", "Storm 渲染 pass 状态"],
      ["rendering parameters", "渲染参数"],
      ["GL states", "GL 状态"],
      ["uniforms", "uniform 参数"],
      ["AOV resolve", "AOV 解析"],
      ["graphics pipeline hash", "图形管线哈希"],
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
      <h2>中文二次补强导读 / Chinese Second-Pass Notes</h2>
      <p class="zh">${escapeHtml(item.summary)}</p>
      <p class="en">This second-pass refinement adds page-specific Chinese guidance for ${escapeHtml(item.title)} while preserving English page names, API names, class names, method names, code, commands, property names, mathematical symbols, template parameters, macro names, enum names, enum values, function names, variable names, type names, header names, token literals, links, and official English excerpts for direct comparison.</p>
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
  results,
}, null, 2));
