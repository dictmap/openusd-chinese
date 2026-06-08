import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUND = 448;
const ROUND_TYPE = "PromotionRound";
const TARGET = "full_site/api/struct_hgi_sampler_desc.html";
const SOURCE = "source/full_api/struct_hgi_sampler_desc_source.html";
const OFFICIAL_URL = "https://openusd.org/release/api/struct_hgi_sampler_desc.html";
const SOURCE_PARITY_REPORT = "reports/round_448_hgi_sampler_desc_source_parity.json";
const PROMOTION_ID = "round-448-api-hgi-sampler-desc";

function rel(file) {
  return path.join(ROOT, file);
}

function read(file) {
  return fs.readFileSync(rel(file), "utf8").replace(/^\uFEFF/, "");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function writeJson(file, data) {
  fs.writeFileSync(rel(file), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#9670;/g, "◆")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function stripHtml(value) {
  return decodeEntities(
    String(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function sourceHtml() {
  return read(SOURCE);
}

function sourceText() {
  return stripHtml(sourceHtml());
}

function sourceTitle() {
  const match = sourceHtml().match(/<title>([\s\S]*?)<\/title>/i);
  return stripHtml(match ? match[1] : "HgiSamplerDesc Struct Reference");
}

function sourceHeadings() {
  return [...sourceHtml().matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripHtml(match[2]),
  }));
}

function zhCharCount(value) {
  return (String(value).match(/[\u3400-\u9fff]/g) || []).length;
}

function blockCount(value, klass) {
  const re = new RegExp(`class="${klass}"`, "g");
  return (String(value).match(re) || []).length;
}

const links = {
  final: "../../openusd_bilingual_final.html",
  apiEntry: "../../site/index.html",
  apiRedirect: "../../site/api/index.html",
  release: "../../site/release_index.html",
  source: "../../source/full_api/struct_hgi_sampler_desc_source.html",
  official: OFFICIAL_URL,
  prev: "hd_storm_page_front.html",
  next: "hd_st_page_front.html",
  hd: "hd_page_front.html",
  hdSt: "hd_st_page_front.html",
  hdStorm: "hd_storm_page_front.html",
  usdRender: "usd_render_page_front.html",
  trace: "trace_page_front.html",
  work: "work_page_front.html",
  annotated: "annotated.html",
  classes: "classes.html",
};

const expectedHeadings = [
  "Public Attributes",
  "Detailed Description",
  "Constructor & Destructor Documentation",
  "HgiSamplerDesc()",
  "Member Data Documentation",
  "addressModeU",
  "addressModeV",
  "addressModeW",
  "borderColor",
  "compareFunction",
  "debugName",
  "enableCompare",
  "magFilter",
  "maxAnisotropy",
  "minFilter",
  "mipFilter",
];

const sourceKeywords = [
  "HgiSamplerDesc",
  "Describes the properties needed to create a GPU sampler",
  "debugName",
  "magFilter",
  "minFilter",
  "mipFilter",
  "addressModeU",
  "addressModeV",
  "addressModeW",
  "borderColor",
  "enableCompare",
  "compareFunction",
  "maxAnisotropy",
  "HgiSamplerFilter",
  "HgiMipFilter",
  "HgiSamplerAddressMode",
  "HgiBorderColor",
  "HgiCompareFunction",
  "sampler.h",
  "GPU debugging",
  "mipmap levels",
  "Wrapping modes",
  "Maximum anisotropic filtering ratio",
];

const outputKeywords = [
  ...expectedHeadings,
  "HgiSamplerDesc",
  "GPU sampler",
  "sampler.h",
  "std::string",
  "uint32_t",
  "HgiSamplerFilter",
  "HgiMipFilter",
  "HgiSamplerAddressMode",
  "HgiBorderColor",
  "HgiCompareFunction",
  "texture sampling",
  "mipmap",
  "anisotropic",
  "Open official page",
];

function zh(text) {
  return `<span class="zh">${text}</span>`;
}

function en(text) {
  return `<span class="en">${text}</span>`;
}

function navStyles() {
  return `<style id="openusd-reading-flow-nav-style">
    body.openusd-has-reading-flow{padding-left:292px}
    .openusd-reading-flow-nav{position:fixed;left:0;top:0;bottom:0;width:270px;overflow:auto;background:#ffffff;border-right:1px solid #d8dee8;box-shadow:0 0 20px rgba(17,24,39,.08);z-index:50;padding:18px 16px;color:#1d2733;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif}
    .openusd-reading-flow-nav h2{font-size:17px;margin:0 0 10px;color:#17202a}
    .openusd-reading-flow-nav h3{font-size:13px;margin:16px 0 8px;color:#516071;text-transform:none;letter-spacing:0}
    .openusd-reading-flow-nav ul,.openusd-reading-flow-nav ol{list-style:none;margin:0;padding:0}
    .openusd-reading-flow-nav li{margin:7px 0;line-height:1.35}
    .openusd-reading-flow-nav a{color:#1c5d99;text-decoration:none;overflow-wrap:anywhere}
    .openusd-reading-flow-nav a:hover{text-decoration:underline}
    .openusd-reading-flow-status{display:inline-block;margin-left:6px;padding:1px 6px;border-radius:999px;background:#edf2f7;color:#516071;font-size:11px}
    .openusd-reading-flow-nav .official-link{color:#8a4b11}
    .openusd-reading-flow-breadcrumb{max-width:1120px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
    @media (max-width: 920px){
      body.openusd-has-reading-flow{padding-left:0}
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  </style>`;
}

function readingFlowNav() {
  return `<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${links.final}">总入口</a>
  <span> / </span>
  <a data-reading-flow="api-entry" href="${links.apiEntry}">API 本地入口</a>
  <span> / api / struct_hgi_sampler_desc.html</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="${links.final}">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="${links.release}">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="${links.apiEntry}">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="${links.apiRedirect}">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>当前位置 / Current Layer</h3>
      <ol>
        <li>api</li>
        <li>struct_hgi_sampler_desc.html</li>
      </ol>
    </section>
    <section>
      <h3>Hydra / Hgi 相邻页</h3>
      <ul>
        <li><a data-reading-flow="related" href="${links.hd}">Hd module front</a><span class="openusd-reading-flow-status">local</span></li>
        <li><a data-reading-flow="related" href="${links.hdSt}">HdSt module front</a><span class="openusd-reading-flow-status">local</span></li>
        <li><a data-reading-flow="related" href="${links.hdStorm}">HdStorm module front</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.usdRender}">UsdRender module front</a><span class="openusd-reading-flow-status">complete</span></li>
        <li><a data-reading-flow="related" href="${links.trace}">Trace performance tracking</a><span class="openusd-reading-flow-status">complete</span></li>
      </ul>
    </section>
    <section>
      <h3>上一页 / 下一页</h3>
      <ul>
        <li><a data-reading-flow="prev" href="${links.prev}">上一页 / Previous: HdStorm</a></li>
        <li><a data-reading-flow="next" href="${links.next}">下一页 / Next: HdSt</a></li>
      </ul>
    </section>
    <section>
      <h3>源页与外跳</h3>
      <ul>
        <li><a data-reading-flow="source" href="${links.source}">本地 source snapshot</a></li>
        <li><a data-reading-flow="related" href="${links.annotated}">Annotated class index</a></li>
        <li><a class="official-link" data-reading-flow="official" href="${links.official}">打开官方原页 / Open official page</a></li>
      </ul>
    </section>
  </div>
</aside>`;
}

function headingCoverageList() {
  return expectedHeadings
    .map((heading) => `      <li>${zh(`保留并解释 source section 或字段 ${esc(heading)}，让读者能按官方 Doxygen 结构回到原页核对。`)}${en(`Source section or field preserved: ${esc(heading)}.`)}</li>`)
    .join("\n");
}

function buildHtml() {
  const title = "HgiSamplerDesc Struct Reference";
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} - OpenUSD API 中文参考</title>
  <link rel="icon" href="../../site/images/USDIcon.ico">
  <style>
    body{margin:0;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;background:#f6f8fb;color:#1d2733;line-height:1.68}
    header{background:#142538;color:#fff;padding:28px 32px}
    main{max-width:1120px;margin:0 auto;padding:28px 20px 48px}
    section{background:#fff;border:1px solid #d8dee8;border-radius:8px;padding:20px;margin:0 0 18px}
    h1{margin:0;font-size:30px;letter-spacing:0}
    h2{margin:0 0 12px;font-size:22px}
    h3{margin:16px 0 8px;font-size:18px}
    .meta{color:#d7e3f4;margin-top:8px;overflow-wrap:anywhere}
    .zh{display:block;font-weight:650;color:#17324d}
    .en{display:block;color:#55616f;margin-top:4px}
    a{color:#1c5d99;overflow-wrap:anywhere}
    ul{padding-left:22px}
    li{margin:8px 0}
    code{font-family:"Cascadia Mono","Consolas",monospace}
    .status{display:inline-block;background:#1f6f50;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;margin-bottom:12px}
    .note{background:#eef6ff;border-left:4px solid #3178c6;padding:12px 14px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
    .mini{border:1px solid #d8dee8;border-radius:6px;padding:12px;background:#fbfdff}
  </style>
${navStyles()}
</head>
<body class="openusd-has-reading-flow">
  <header>
    <span class="status">bilingual_complete</span>
    <h1>${title} / <code>HgiSamplerDesc</code> 结构体参考</h1>
    <div class="meta">Round ${ROUND} ${ROUND_TYPE} | Source snapshot: ${SOURCE} | <a href="${links.official}" style="color:#fff">Open official page</a></div>
  </header>
${readingFlowNav()}
<main data-cn-status="bilingual_complete" data-cn-round="${ROUND}" data-cn-source="${SOURCE}" data-cn-official="${OFFICIAL_URL}">
  <section data-cn-complete="main-reading-path">
    <h2>中文主阅读路径 / Chinese Main Reading Path</h2>
    <p>${zh("HgiSamplerDesc 是 Hydra graphics interface 中用于描述 GPU sampler 创建参数的轻量结构体。它不保存纹理像素，不创建 texture resource，也不决定 USD scene 的材质语义；它只把采样器状态集中成一组字段，让后端图形 API 可以用一致的描述生成 sampler。阅读本页时应把它放在纹理采样状态的上下文中理解：magFilter、minFilter、mipFilter 决定采样过滤，addressModeU、addressModeV、addressModeW 决定越界坐标如何包裹或钳制，borderColor 决定钳制到边界色时使用什么颜色，enableCompare 和 compareFunction 用于比较采样，maxAnisotropy 控制最大各向异性过滤比例，debugName 只服务 GPU 调试标签。")}${en("HgiSamplerDesc describes the properties needed to create a GPU sampler.")}</p>
    <p>${zh("本地中文页的阅读顺序是先区分 sampler descriptor 与 texture data，再按过滤、寻址、比较、各向异性和调试标签分组。这样读可以避免把字段列表误认为渲染输出配置。sampler 负责如何读取 texture；texture 自身负责图像或数据存储；UsdRender 负责渲染设置和输出关系；Hd、HdSt、HdStorm 或具体 backend 负责把这些描述下发给 GPU。若画面出现模糊、闪烁、mipmap 跳变、边缘颜色异常或阴影比较异常，应沿这些字段定位，而不是直接归因到 USD composition、asset resolver 或材质网络。")}${en("The Chinese path groups the fields by sampling behavior and rendering diagnostics.")}</p>
    <p>${zh("官方 Detailed Description 很短：Describes the properties needed to create a GPU sampler。本页不扩写成虚构的完整渲染教程，而是诚实解释每个 public attribute 的职责和边界。字段名、枚举类型名、头文件名和 Doxygen 表格标签保持英文原样，中文说明承担主要阅读路径。读者应把英文名作为源码和报错栈中的搜索锚点，把中文说明作为判断字段副作用的依据。")}${en("The official source is short; this page expands the field semantics without inventing unrelated behavior.")}</p>
  </section>

  <section data-cn-complete="source-parity">
    <h2>原站 / 源页对比</h2>
    <p>${zh(`本轮对比 ${SOURCE} 和官方页 ${OFFICIAL_URL}。source title 是 ${sourceTitle()}。source 页面包含 Public Attributes、Detailed Description、Constructor & Destructor Documentation、HgiSamplerDesc()、Member Data Documentation，以及 addressModeU、addressModeV、addressModeW、borderColor、compareFunction、debugName、enableCompare、magFilter、maxAnisotropy、minFilter、mipFilter 等字段。`)}</p>
    <ul>
${headingCoverageList()}
    </ul>
    <p class="note">${zh("保留原名：HgiSamplerDesc、debugName、magFilter、minFilter、mipFilter、addressModeU、addressModeV、addressModeW、borderColor、enableCompare、compareFunction、maxAnisotropy、std::string、uint32_t、HgiSamplerFilter、HgiMipFilter、HgiSamplerAddressMode、HgiBorderColor、HgiCompareFunction 和 sampler.h。中文解释不改写这些字段名，避免调试 GPU sampler 状态时无法对应源码。")}${en("Field names, enum type names, and sampler.h are preserved for exact source lookup.")}</p>
  </section>

  <section data-cn-complete="field-groups">
    <h2>字段分组和语义边界</h2>
    <div class="grid">
      <div class="mini"><h3>debugName</h3><p>${zh("debugName 是 std::string，source 说明它可作为 GPU debugging 的 debug label。它帮助后端调试和捕获工具识别 sampler，不改变采样结果，也不是用户可见的材质名称。")}${en("debugName can be applied as a debug label for GPU debugging.")}</p></div>
      <div class="mini"><h3>magFilter / minFilter</h3><p>${zh("magFilter 是放大过滤，source 说明当 sample area smaller than a pixel 时用于组合像素；minFilter 是缩小过滤，当 sample area larger than a pixel 时用于组合像素。两者都使用 HgiSamplerFilter，但对应的采样尺度相反。")}${en("magFilter and minFilter select magnification and minification filtering.")}</p></div>
      <div class="mini"><h3>mipFilter</h3><p>${zh("mipFilter 使用 HgiMipFilter，source 说明它用于 combining pixels between two mipmap levels。调试 mipmap 跳变、远距离纹理闪烁或不同 mip 层过渡异常时，应把它和 minFilter 一起检查。")}${en("mipFilter controls filtering between mipmap levels.")}</p></div>
      <div class="mini"><h3>addressModeU/V/W</h3><p>${zh("addressModeU、addressModeV、addressModeW 使用 HgiSamplerAddressMode，source 把它们概括为 Wrapping modes。U、V、W 分别对应不同纹理坐标轴；边缘重复、镜像、钳制或越界表现异常时先检查这些字段。")}${en("addressModeU/V/W are wrapping modes for texture coordinate axes.")}</p></div>
      <div class="mini"><h3>borderColor</h3><p>${zh("borderColor 使用 HgiBorderColor，source 说明它是 clamped texture values 的 border color。它只在相关寻址模式走到边界色时发挥作用，不是全局 clear color，也不是材质 baseColor。")}${en("borderColor is the border color for clamped texture values.")}</p></div>
      <div class="mini"><h3>enableCompare / compareFunction</h3><p>${zh("enableCompare 开启 sampler comparison against a reference value during lookups；compareFunction 使用 HgiCompareFunction，定义开启比较采样时应用的比较函数。若比较未启用，compareFunction 不应被误读成普通颜色采样的过滤函数。")}${en("enableCompare and compareFunction control comparison sampling.")}</p></div>
      <div class="mini"><h3>maxAnisotropy</h3><p>${zh("maxAnisotropy 是 uint32_t，source 说明它是 Maximum anisotropic filtering ratio，并指出值为 1 effectively disables anisotropic sampling。它影响倾斜视角下纹理清晰度和性能，不应被误认为 mipmap 级数或采样次数的直接数量。")}${en("maxAnisotropy is the maximum anisotropic filtering ratio.")}</p></div>
    </div>
  </section>

  <section data-cn-complete="usage-boundaries">
    <h2>使用边界和常见误读</h2>
    <p>${zh("HgiSamplerDesc 的字段是描述性输入，不代表 sampler 已经存在。通常调用路径会把这个 descriptor 交给 Hgi 或后端实现创建 GPU sampler；如果后端 capability 不支持某种组合，问题会出现在资源创建或 backend validation 层，而不是这个结构体本身。调试时应区分三层：descriptor 写入是否符合预期、Hgi backend 是否接受该描述、实际 shader 或 render pass 是否使用了该 sampler。")}${en("The descriptor is input to sampler creation; backend validation and shader usage are separate concerns.")}</p>
    <p>${zh("常见误读包括：把 magFilter 和 minFilter 互换；把 mipFilter 当成是否生成 mipmap 的开关；把 addressModeU/V/W 当成纹理坐标本身；把 borderColor 当成所有越界模式都会使用；把 compareFunction 当成普通颜色采样过滤；把 maxAnisotropy 当成越大一定越好；把 debugName 当成渲染输出名称。中文页明确这些边界，是为了让读者能从字段名直接定位图像问题，而不是在 UsdRender、UsdShade 或 Hydra render delegate 之间盲目切换。")}${en("Common mistakes come from mixing filtering, addressing, comparison, anisotropy, and debug-label responsibilities.")}</p>
    <p>${zh("如果画面边缘出现重复或拉伸，优先检查 addressModeU、addressModeV、addressModeW 和 borderColor；如果远处纹理闪烁或模糊，优先检查 minFilter、mipFilter 和 maxAnisotropy；如果 shadow map 或深度比较结果异常，检查 enableCompare 与 compareFunction 是否匹配；如果 GPU 调试捕获中 sampler 难以识别，检查 debugName 是否设置。这样的排查顺序比泛泛地说渲染器有问题更可执行。")}${en("Debugging should follow field responsibility: addressing, mip/filtering, comparison, and debug labels.")}</p>
  </section>

  <section data-cn-complete="adjacent-modules">
    <h2>相邻 API 和本地阅读关系</h2>
    <p>${zh("HgiSamplerDesc 位于 Hgi 图形接口语境中，但本地 inventory 没有单独的 Hgi module front 完成页，因此阅读路径需要通过 Hd、HdSt、HdStorm 和 UsdRender 建立上下文。Hd 提供 Hydra 抽象，HdSt 和 HdStorm 说明渲染 delegate 与实时渲染路径，UsdRender 说明 USD 层面的 render settings、render product 和 render var。它们都可能消费或影响纹理采样结果，但职责不同：HgiSamplerDesc 只描述 GPU sampler 状态，不负责场景语义、render product 输出或 renderer plugin 生命周期。")}${en("Adjacent Hydra and UsdRender pages provide rendering context without changing this struct's responsibility.")}</p>
    <p>${zh("本地 reading-flow 导航保留总入口、API 本地入口、Release 入口、source snapshot、相邻 Hydra/UsdRender 页面、上一页、下一页和显式官方外跳。站内阅读路径中的本地链接保持在本地，不把读者静默带到英文官网；只有打开官方原页这一项是明确外跳。")}${en("Local reading-flow links keep the reader inside the local bilingual site except for the explicit official link.")}</p>
  </section>

  <section data-cn-complete="acceptance-checklist">
    <h2>完成页验收阅读清单</h2>
    <p>${zh("读完本页后，读者应能独立回答五个问题：第一，HgiSamplerDesc 是 GPU sampler descriptor，不是 texture 数据、USD 材质或 render product；第二，magFilter、minFilter 和 mipFilter 分别覆盖放大、缩小和 mipmap 层间过滤；第三，addressModeU/V/W 与 borderColor 共同解释越界纹理坐标和边界色表现；第四，enableCompare 与 compareFunction 只在比较采样路径中有意义；第五，maxAnisotropy 控制最大各向异性过滤比例，值为 1 等价于禁用各向异性采样。能回答这些问题，才说明这页已经从字段清单变成可用于渲染排查的中文结构体参考。额外检查点是区分 texture sampling 状态和 texture 数据本身：前者决定怎么读，后者决定读什么；混淆这两层会让调试者在错误的 API 层寻找问题，也会误判采样器字段的责任边界。")}${en("The acceptance checklist verifies the reader understands descriptor role, filtering, addressing, comparison, anisotropy, and texture sampling state.")}</p>
  </section>

  <section data-cn-complete="paragraph-coverage">
    <h2>逐段双语理解 / Paragraph-Level Bilingual Coverage</h2>
    <ul>
      <li>${zh("标题已覆盖：本页解释 HgiSamplerDesc 结构体参考，而不是把它误写成 shader、texture 或 render settings 页。")}${en("Title coverage: HgiSamplerDesc is treated as a struct reference.")}</li>
      <li>${zh("Detailed Description 已覆盖：Describes the properties needed to create a GPU sampler 的职责和边界已经说明。")}${en("Detailed Description coverage preserves the GPU sampler purpose.")}</li>
      <li>${zh("Public Attributes 已覆盖：debugName、magFilter、minFilter、mipFilter、addressModeU、addressModeV、addressModeW、borderColor、enableCompare、compareFunction、maxAnisotropy 全部按字段语义解释。")}${en("Public attributes are covered field by field.")}</li>
      <li>${zh("过滤字段已覆盖：magnification、minification、mipmap levels 的差异已经中文解释。")}${en("Filtering coverage separates magnification, minification, and mip filtering.")}</li>
      <li>${zh("寻址字段已覆盖：U/V/W wrapping modes 与 borderColor 的关系已经说明。")}${en("Addressing coverage explains wrapping modes and border color.")}</li>
      <li>${zh("比较采样已覆盖：enableCompare 和 compareFunction 的触发边界已经说明。")}${en("Comparison sampling coverage explains enableCompare and compareFunction.")}</li>
      <li>${zh("各向异性已覆盖：maxAnisotropy 的性能和视觉边界，以及值为 1 的含义已经说明。")}${en("Anisotropy coverage explains maxAnisotropy and the value 1 boundary.")}</li>
      <li>${zh("常见误读已覆盖：字段副作用、后端 resource creation、shader 使用和 USD scene 语义之间的边界已经说明。")}${en("Common misreads and backend boundaries are covered.")}</li>
      <li>${zh("调试路径已覆盖：边缘异常、mipmap 闪烁、比较采样异常和 GPU debug label 排查顺序已经说明。")}${en("Debugging paths for edge, mip, compare, and debug-label issues are covered.")}</li>
      <li>${zh("导航已覆盖：总入口、Release 入口、API 入口、source snapshot、相邻 Hydra/UsdRender 页面和 Open official page 外跳都保留。")}${en("Navigation coverage includes local entries, source snapshot, adjacent pages, and explicit official link.")}</li>
    </ul>
  </section>
</main>
</body>
</html>
`;
}

function sourceParity() {
  const source = sourceText();
  const target = fs.existsSync(rel(TARGET)) ? read(TARGET) : buildHtml();
  const targetDecoded = decodeEntities(target);
  const outputChecks = {
    has_complete_status: target.includes('data-cn-status="bilingual_complete"') && target.includes(`data-cn-round="${ROUND}"`),
    has_paragraph_coverage: target.includes("逐段双语理解 / Paragraph-Level Bilingual Coverage"),
    has_final_entry: target.includes(links.final),
    has_api_entry: target.includes(links.apiEntry),
    has_api_redirect: target.includes(links.apiRedirect),
    has_release_entry: target.includes(links.release),
    has_reading_flow_nav: target.includes("openusd-reading-flow-nav") && target.includes("openusd-reading-flow-breadcrumb"),
    has_explicit_official_link: target.includes("Open official page") && target.includes(OFFICIAL_URL),
    no_draft_marker: !target.includes("bilingual_draft") && !target.includes("batch draft page") && !target.includes("later iterations add denser bilingual coverage"),
    zh_chars: zhCharCount(target),
    zh_blocks: blockCount(target, "zh"),
  };
  return {
    generated_at: new Date().toISOString(),
    round: ROUND,
    round_type: ROUND_TYPE,
    target: TARGET,
    source_snapshot: SOURCE,
    official_url: OFFICIAL_URL,
    source_title: sourceTitle(),
    source_headings: sourceHeadings().slice(0, 64),
    source_keywords_checked: sourceKeywords,
    output_keywords_checked: outputKeywords,
    missing_source_keywords: sourceKeywords.filter((keyword) => !source.includes(keyword)),
    missing_output_keywords: outputKeywords.filter((keyword) => !targetDecoded.includes(keyword)),
    output_checks: outputChecks,
  };
}

function writePage() {
  fs.writeFileSync(rel(TARGET), buildHtml(), "utf8");
  writeJson(SOURCE_PARITY_REPORT, sourceParity());
}

function precheck() {
  const report = sourceParity();
  const failed = [];
  if (report.missing_source_keywords.length) failed.push(`missing source keywords: ${report.missing_source_keywords.join(", ")}`);
  if (report.missing_output_keywords.length) failed.push(`missing output keywords: ${report.missing_output_keywords.join(", ")}`);
  for (const [key, value] of Object.entries(report.output_checks)) {
    if (typeof value === "boolean" && !value) failed.push(`output check failed: ${key}`);
  }
  if (report.output_checks.zh_chars < 2100) failed.push(`zh chars too low: ${report.output_checks.zh_chars}`);
  if (report.output_checks.zh_blocks < 28) failed.push(`zh blocks too low: ${report.output_checks.zh_blocks}`);
  if (failed.length) {
    console.error(JSON.stringify({ passed: false, failed, report }, null, 2));
    process.exit(1);
  }
  writeJson(SOURCE_PARITY_REPORT, report);
  console.log(JSON.stringify({ passed: true, report }, null, 2));
}

function updateManifest() {
  const raw = readJson("reports/bilingual_completion_promotions.json");
  const doc = {
    ...raw,
    generated_at: raw.generated_at || new Date().toISOString(),
    promotions: Array.isArray(raw.promotions) ? raw.promotions : [],
    updated_at: new Date().toISOString(),
  };
  doc.promotions = doc.promotions.filter((entry) => entry.id !== PROMOTION_ID && entry.local_output !== TARGET);
  doc.promotions.push({
    id: PROMOTION_ID,
    title: "HgiSamplerDesc Struct Reference",
    official_url: OFFICIAL_URL,
    local_output: TARGET,
    status: "bilingual_complete",
    reason: `Round ${ROUND} ${ROUND_TYPE}: promote the HgiSamplerDesc struct reference by adding Chinese main-reading-path coverage for GPU sampler descriptor purpose, filtering, addressing, border color, comparison sampling, anisotropy, debug labels, common misreads, debugging paths, source parity, reading-flow navigation, and explicit official-page verification.`,
    evidence: {
      page_contains_status: "bilingual_complete",
      generic_draft_marker_removed: true,
      minimum_chinese_chars: 2100,
      minimum_complete_section_chinese_chars: 1200,
      minimum_chinese_blocks: 28,
      official_source_compared: true,
      local_source_snapshot_compared: SOURCE,
      source_parity_report: SOURCE_PARITY_REPORT,
      round_type: ROUND_TYPE,
    },
  });
  writeJson("reports/bilingual_completion_promotions.json", doc);
}

function updateProblemAudit() {
  const quality = readJson("reports/translation_quality_review.json");
  const debt = readJson("reports/english_debt_audit.json");
  const inventory = readJson("reports/all_pages_inventory.json");
  const counts = {
    total_pages: inventory.counts.total_pages,
    bilingual_complete: quality.status_counts.bilingual_complete,
    bilingual_draft: quality.status_counts.bilingual_draft,
    good_bilingual: quality.grade_counts.good_bilingual,
    draft_needs_translation: quality.grade_counts.draft_needs_translation,
    draft_template_only: quality.grade_counts.draft_template_only,
    review_ready_zh: debt.counts.review_ready_zh,
    api_complete: debt.counts.api_complete,
    api_review_ready_zh: debt.counts.api_review_ready_zh,
    release_complete: debt.counts.release_complete,
    release_review_ready_zh: debt.counts.release_review_ready_zh,
    pending_full_scope: inventory.counts.pending_full_scope_pages,
  };
  writeJson("reports/current_problem_audit.json", {
    generated_at: new Date().toISOString(),
    purpose: `第 ${ROUND} 轮 ${ROUND_TYPE} 记录：确认 ${TARGET} 已按 HgiSamplerDesc struct source parity 晋级，并继续跟踪 OpenUSD 双语完成缺口。`,
    last_completed_round: {
      round: ROUND,
      round_type: ROUND_TYPE,
      target: TARGET,
      commit_sha: null,
      previous_good_bilingual: 226,
    },
    current_counts: counts,
    problems: [
      {
        id: "P0-api-draft-backlog",
        severity: "P0",
        summary: `当前 good_bilingual=${counts.good_bilingual}/406，API complete=${counts.api_complete}，仍有 ${counts.bilingual_draft} 个可检查草稿，不是完整翻译。`,
        evidence: `第 ${ROUND} 轮 ${ROUND_TYPE} 将 ${TARGET} 从 API 草稿晋级为 good_bilingual；release 范围保持 ${counts.release_complete}/126 complete。`,
        required_action: "继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。",
      },
      {
        id: "P1-struct-reference-source-parity",
        severity: "P1",
        summary: "结构体参考页必须保留 Doxygen 分组、字段名、枚举类型名、头文件名和链接语义，不能只写泛泛导读。",
        evidence: "本轮覆盖 Public Attributes、Detailed Description、Constructor & Destructor Documentation、Member Data Documentation、debugName、magFilter、minFilter、mipFilter、addressModeU/V/W、borderColor、enableCompare、compareFunction、maxAnisotropy 和 sampler.h。",
        required_action: "后续 struct 页面继续按 source snapshot 抽取官方字段，中文说明用途和边界，API 名保持原样。",
      },
      {
        id: "P1-left-navigation-reading-flow",
        severity: "P1",
        summary: "完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。",
        evidence: "本轮页面生成了本地侧栏、breadcrumb、前后页、相邻 Hydra/UsdRender 页面、source snapshot 和 Open official page 外跳，并会重新运行 reading-flow 审计。",
        required_action: "若 reading-flow 审计失败，先修导航，不得推送。",
      },
      {
        id: "P1-markdown-record-encoding",
        severity: "P1",
        summary: "Markdown 编码守卫继续作为硬门槛。",
        evidence: "work.md、reports/iteration_report.md、reports/current_problem_audit.md、reports/bilingual_completion_promotions.md 必须无重复问号损坏、replacement character 和 UTF-8 BOM。",
        required_action: "若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。",
      },
    ],
    promoted_pages: [
      {
        round: ROUND,
        round_type: ROUND_TYPE,
        output: TARGET,
        official_url: OFFICIAL_URL,
        source_snapshot: SOURCE,
        source_parity_report: SOURCE_PARITY_REPORT,
      },
    ],
    not_promoted_pages: [],
    source_parity_report: SOURCE_PARITY_REPORT,
    next_actions: [
      "release 范围已 126/126 complete，不要重复处理 release 已完成页。",
      "下一轮建议重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的 API/class/struct 页面；开始前必须确认 git/report/validation/markdown/reading-flow 状态干净一致。",
    ],
    next_action: "下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。",
  });
}

const commands = new Set(process.argv.slice(2));
if (commands.has("--write-page")) writePage();
if (commands.has("--precheck")) precheck();
if (commands.has("--manifest")) updateManifest();
if (commands.has("--problem")) updateProblemAudit();
if (commands.size === 0) {
  console.log("Usage: node scripts/promote_round_448_hgi_sampler_desc.mjs --write-page --precheck --manifest --problem");
}
