import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const NAV_START = "<!-- openusd-reading-flow-nav:start -->";
const NAV_END = "<!-- openusd-reading-flow-nav:end -->";
const STYLE_ID = "openusd-reading-flow-nav-style";

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(relativePath) {
  return JSON.parse(stripBom(await readFile(path.join(root, relativePath), "utf8")));
}

function toPosix(value) {
  return value.replaceAll(path.sep, "/");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function relativeHref(fromLocalOutput, toLocalOutput) {
  const fromDir = path.posix.dirname(fromLocalOutput);
  const relative = path.posix.relative(fromDir, toLocalOutput);
  return relative || path.posix.basename(toLocalOutput);
}

function titleOf(page) {
  const title = page.title || page.title_hints?.[0] || path.posix.basename(page.local_output, ".html");
  const clean = String(title).replace(/\s+/g, " ").trim();
  if (!/^https:\/\/openusd\.org\/release\//i.test(clean)) return clean;
  return titleFromLocalOutput(page.local_output);
}

function titleFromLocalOutput(localOutput) {
  const base = path.posix.basename(localOutput, ".html");
  const known = {
    "ar_page_front": "Ar asset resolution module",
    "arch_page_front": "Arch system utilities module",
    "glf_page_front": "Glf OpenGL utilities module",
    "hd_page_front": "Hd Hydra core module",
    "hd_st_page_front": "HdSt Storm implementation module",
    "hdx_page_front": "Hdx Hydra task utilities module",
    "hio_page_front": "Hio image I/O module",
    "plug_page_front": "Plug plugin system module",
    "tf_page_front": "Tf foundation utilities module",
    "usd_geom_page_front": "UsdGeom geometry schema module",
    "usd_lux_page_front": "UsdLux lighting schema module",
    "usd_shade_page_front": "UsdShade shading schema module",
    "usd_skel_page_front": "UsdSkel skeletal animation module",
    "usd_utils_page_front": "UsdUtils utility module",
    "usd_app_utils_page_front": "UsdAppUtils application utility module",
    "index": "API Doxygen local index",
  };
  if (known[base]) return known[base];
  return base
    .replace(/^class_/, "Class ")
    .replace(/^struct_/, "Struct ")
    .replace(/^md_pxr_/, "Doc ")
    .replace(/_page_front$/, " module")
    .replace(/_1_1/g, "::")
    .replace(/_a_p_i/g, "API")
    .replace(/_g_l/g, "GL")
    .replace(/_u_i/g, "UI")
    .replace(/_r_e_a_d_m_e/g, "README")
    .replace(/_+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();
}

function pageDepthLabel(localOutput) {
  const parts = localOutput.split("/");
  const scopeIndex = parts.indexOf("full_site");
  const scoped = scopeIndex >= 0 ? parts.slice(scopeIndex + 1) : parts;
  return scoped.join(" / ");
}

function apiContextKey(page) {
  const base = path.posix.basename(page.local_output, ".html");
  if (base.endsWith("_page_front")) return base.replace(/_page_front$/, "");
  const parts = base.split("_");
  if (parts.length >= 3 && (parts[0] === "class" || parts[0] === "struct")) {
    return `${parts[0]}_${parts[1]}`;
  }
  return parts.slice(0, 2).join("_") || base;
}

function uniquePages(pages) {
  const seen = new Set();
  const out = [];
  for (const page of pages) {
    if (!page?.local_output || seen.has(page.local_output)) continue;
    seen.add(page.local_output);
    out.push(page);
  }
  return out;
}

function linkList(current, pages, flowName, limit = 8) {
  const selected = uniquePages(pages.filter((page) => page.local_output !== current.local_output)).slice(0, limit);
  return selected.map((page) => {
    const href = relativeHref(current.local_output, page.local_output);
    const status = page.status === "bilingual_complete" ? "complete" : "draft";
    return `<li><a data-reading-flow="${flowName}" href="${escapeHtml(href)}">${escapeHtml(titleOf(page))}</a><span class="openusd-reading-flow-status">${escapeHtml(status)}</span></li>`;
  }).join("\n");
}

function neighborLinks(current, allAreaPages) {
  if (current.local_output === "full_site/release/intro_to_openexec.html") {
    return [
      `<li><a data-reading-flow="prev" href="${escapeHtml(relativeHref(current.local_output, "site/release_index.html"))}">上一层：Release 本地入口</a></li>`,
      `<li><a data-reading-flow="next" href="#background">1. Background</a></li>`,
      `<li><a data-reading-flow="next" href="#introducing-openexec">2. Introducing OpenExec</a></li>`,
      `<li><a data-reading-flow="next" href="#illustrative-example">3. Illustrative Example</a></li>`,
      `<li><a data-reading-flow="next" href="#new-concepts">4. New concepts</a></li>`,
      `<li><a data-reading-flow="next" href="#client-api">5. Client API</a></li>`,
    ].join("\n");
  }
  const index = allAreaPages.findIndex((page) => page.local_output === current.local_output);
  const previous = index > 0 ? allAreaPages[index - 1] : null;
  const next = index >= 0 && index < allAreaPages.length - 1 ? allAreaPages[index + 1] : null;
  const items = [];
  if (previous) {
    items.push(`<li><a data-reading-flow="prev" href="${escapeHtml(relativeHref(current.local_output, previous.local_output))}">上一页 / Previous: ${escapeHtml(titleOf(previous))}</a></li>`);
  }
  if (next) {
    items.push(`<li><a data-reading-flow="next" href="${escapeHtml(relativeHref(current.local_output, next.local_output))}">下一页 / Next: ${escapeHtml(titleOf(next))}</a></li>`);
  }
  return items.join("\n");
}

function releaseCategory(page) {
  const local = page.local_output;
  const base = path.posix.basename(local);
  if (local === "full_site/release/intro_to_openexec.html") return "openexec";
  const schemaMatch = local.match(/\/user_guides\/schemas\/([^/]+)\//);
  if (schemaMatch) return `schema:${schemaMatch[1]}`;
  if (local.includes("/user_guides/schemas/")) return "schema:index";
  if (local.includes("/user_guides/")) return "user-guide";
  if (base.startsWith("tut_")) return "tutorial";
  if (base.startsWith("spec")) return "spec";
  if (base.startsWith("wp")) return "proposal";
  if (base.startsWith("plugins")) return "plugins";
  if (["contributing_to_usd.html", "contributors.html", "dl_downloads.html", "genindex.html", "maxperf.html", "press_opensource_announce.html", "press_opensource_release.html", "ref_performance_metrics.html", "release_schedule.html", "search.html", "usd_products.html", "usdfaq.html"].includes(base)) {
    return "support";
  }
  return "release";
}

function pagesByOutputs(pages, outputs) {
  const byOutput = new Map(pages.map((page) => [page.local_output, page]));
  return outputs.map((output) => byOutput.get(output)).filter(Boolean);
}

function nearestPages(current, pages, radius = 5) {
  const index = pages.findIndex((page) => page.local_output === current.local_output);
  if (index < 0) return [];
  return pages.slice(Math.max(0, index - radius), index).concat(pages.slice(index + 1, index + 1 + radius));
}

function buildReleaseRelatedPages(current, pages, areaPages) {
  const category = releaseCategory(current);
  if (category === "openexec") {
    return pagesByOutputs(pages, [
      "full_site/api/md_pxr_exec_exec_usd_docs_overview.html",
      "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
      "full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
      "full_site/api/page__execution__system__design.html",
      "full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html",
      "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
    ]);
  }
  if (category === "schema:index") {
    return pagesByOutputs(pages, [
      "full_site/release/user_guides/schemas/usdLux/overview.html",
      "full_site/release/user_guides/schemas/usdLux/usdLux_toc.html",
      "full_site/release/user_guides/schemas/usdRender/overview.html",
      "full_site/release/user_guides/schemas/usdRender/usdRender_toc.html",
      "full_site/release/user_guides/schemas/usdMedia/overview.html",
      "full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html",
      "full_site/release/user_guides/schemas/usdUI/overview.html",
      "full_site/release/user_guides/schemas/usdUI/usdUI_toc.html",
      "full_site/release/user_guides/schemas/usdVol/overview.html",
      "full_site/release/user_guides/schemas/usdVol/usdVol_toc.html",
    ]);
  }
  const currentDir = path.posix.dirname(current.local_output);
  const sameDir = pages.filter((page) => page.area === "release" && path.posix.dirname(page.local_output) === currentDir);
  if (category.startsWith("schema:")) {
    const schemaPriority = [
      "overview.html",
      "usdLux_toc.html",
      "usdRender_toc.html",
      "usdMedia_toc.html",
      "usdUI_toc.html",
      "usdVol_toc.html",
      "LightAPI.html",
      "LightFilter.html",
      "PortalLight.html",
      "RectLight.html",
      "Volume.html",
      "VolumeFieldBase.html",
      "RenderSettings.html",
      "AssetPreviewsAPI.html",
      "AccessibilityAPI.html",
    ];
    const priority = schemaPriority.map((name) => sameDir.find((page) => path.posix.basename(page.local_output) === name)).filter(Boolean);
    return uniquePages([...priority, ...sameDir]);
  }
  if (category === "user-guide") {
    return uniquePages([
      ...sameDir,
      ...pagesByOutputs(pages, [
        "full_site/release/user_guides/schemas/index.html",
        "full_site/release/tut_usd_tutorials.html",
        "full_site/release/usdfaq.html",
      ]),
    ]);
  }
  if (category === "tutorial") {
    return uniquePages([
      ...pagesByOutputs(pages, ["full_site/release/tut_usd_tutorials.html"]),
      ...areaPages.filter((page) => path.posix.basename(page.local_output).startsWith("tut_")),
      ...pagesByOutputs(pages, ["full_site/release/usdfaq.html"]),
    ]);
  }
  if (category === "spec" || category === "proposal") {
    return uniquePages(areaPages.filter((page) => {
      const base = path.posix.basename(page.local_output);
      return base.startsWith("spec") || base.startsWith("wp");
    }));
  }
  if (category === "plugins") {
    return pagesByOutputs(pages, [
      "full_site/release/plugins.html",
      "full_site/release/plugins_alembic.html",
      "full_site/release/plugins_renderman.html",
      "full_site/release/dl_downloads.html",
      "full_site/release/contributing_to_usd.html",
    ]);
  }
  if (category === "support") {
    return pagesByOutputs(pages, [
      "full_site/release/usdfaq.html",
      "full_site/release/usd_products.html",
      "full_site/release/dl_downloads.html",
      "full_site/release/release_schedule.html",
      "full_site/release/ref_performance_metrics.html",
      "full_site/release/maxperf.html",
      "full_site/release/contributing_to_usd.html",
      "full_site/release/contributors.html",
      "full_site/release/genindex.html",
      "full_site/release/search.html",
    ]);
  }
  return nearestPages(current, areaPages, 5);
}

function buildApiRelatedPages(current, pages, areaPages) {
  const openExecDocs = [
    "full_site/api/md_pxr_exec_exec_usd_docs_overview.html",
    "full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
    "full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
    "full_site/api/page__execution__system__design.html",
    "full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html",
    "full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html",
  ];
  if (openExecDocs.includes(current.local_output)) return pagesByOutputs(pages, openExecDocs);

  const moduleMap = {
    "usd_render_page_front": ["site/usd_page_front.html", "full_site/api/usd_geom_page_front.html", "full_site/api/hd_page_front.html", "full_site/api/hdx_page_front.html", "full_site/api/usd_vol_page_front.html", "full_site/release/user_guides/schemas/usdRender/overview.html"],
    "usd_vol_page_front": ["full_site/api/usd_geom_page_front.html", "full_site/api/usd_render_page_front.html", "full_site/api/hd_page_front.html", "full_site/release/user_guides/schemas/usdVol/overview.html", "full_site/release/user_guides/schemas/usdVol/Volume.html"],
    "usd_ri_page_front": ["full_site/api/usd_render_page_front.html", "full_site/api/usd_shade_page_front.html", "full_site/api/usd_lux_page_front.html", "full_site/api/hd_page_front.html"],
    "usd_media_page_front": ["site/usd_page_front.html", "full_site/api/usd_geom_page_front.html", "full_site/api/usd_render_page_front.html", "full_site/api/usd_u_i_page_front.html", "full_site/release/user_guides/schemas/usdMedia/overview.html"],
    "usd_u_i_page_front": ["site/usd_page_front.html", "full_site/api/usd_geom_page_front.html", "full_site/api/usd_media_page_front.html", "full_site/api/usd_utils_page_front.html", "full_site/release/user_guides/schemas/usdUI/overview.html"],
    "usd_shaders_page_front": ["full_site/api/usd_shade_page_front.html", "full_site/api/sdr_page_front.html", "full_site/api/usd_mtlx_page_front.html", "full_site/api/usd_render_page_front.html", "full_site/release/spec_usdpreviewsurface.html"],
    "gf_page_front": ["full_site/api/vt_page_front.html", "full_site/api/sdf_page_front.html", "full_site/api/usd_geom_page_front.html", "full_site/api/hd_page_front.html"],
    "vt_page_front": ["full_site/api/gf_page_front.html", "full_site/api/sdf_page_front.html", "site/usd_page_front.html", "full_site/api/usd_geom_page_front.html"],
    "work_page_front": ["full_site/api/trace_page_front.html", "full_site/api/tf_page_front.html", "full_site/api/hd_page_front.html"],
    "trace_page_front": ["full_site/api/work_page_front.html", "full_site/api/tf_page_front.html", "full_site/api/hd_page_front.html", "full_site/api/hdx_page_front.html"],
  };
  const base = path.posix.basename(current.local_output, ".html");
  if (moduleMap[base]) return pagesByOutputs(pages, moduleMap[base]);

  const context = apiContextKey(current);
  const sameContext = pages.filter((page) => page.area === "api" && apiContextKey(page) === context);
  const frontPages = pages.filter((page) => page.area === "api" && path.posix.basename(page.local_output, ".html").endsWith("_page_front"));
  return uniquePages([
    ...sameContext.filter((page) => page.status === "bilingual_complete"),
    ...sameContext.filter((page) => page.status !== "bilingual_complete"),
    ...nearestPages(current, areaPages, 4),
    ...frontPages,
  ]);
}

function buildRelatedPages(current, pages, areaPages) {
  if (current.area === "release") {
    return buildReleaseRelatedPages(current, pages, areaPages);
  }
  return buildApiRelatedPages(current, pages, areaPages);
}

function navCss() {
  return `<style id="${STYLE_ID}">
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
    .openusd-reading-flow-breadcrumb{max-width:1100px;margin:14px auto 0;padding:0 20px;color:#d7e3f4;font-size:14px;overflow-wrap:anywhere}
    .openusd-reading-flow-breadcrumb a{color:#ffffff}
    @media (max-width: 920px){
      body.openusd-has-reading-flow{padding-left:0}
      .openusd-reading-flow-nav{position:static;width:auto;max-height:none;border-right:0;border-bottom:1px solid #d8dee8;box-shadow:none}
      .openusd-reading-flow-nav .openusd-reading-flow-columns{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px 18px}
    }
  </style>`;
}

function buildNav(current, pages, areaPages) {
  const finalHref = relativeHref(current.local_output, "openusd_bilingual_final.html");
  const releaseHref = relativeHref(current.local_output, "site/release_index.html");
  const apiHref = relativeHref(current.local_output, "site/index.html");
  const apiRedirectHref = relativeHref(current.local_output, "site/api/index.html");
  const related = buildRelatedPages(current, pages, areaPages);
  const relatedLinks = linkList(current, related, "related", 10);
  const neighbor = neighborLinks(current, areaPages);
  const official = current.official_url || "";
  const breadcrumb = `${NAV_START}
<nav class="openusd-reading-flow-breadcrumb" aria-label="Breadcrumb" data-reading-flow="breadcrumb">
  <a data-reading-flow="final" href="${escapeHtml(finalHref)}">总入口</a>
  <span> / </span>
  <a data-reading-flow="${current.area === "api" ? "api-entry" : "release-entry"}" href="${escapeHtml(current.area === "api" ? apiHref : releaseHref)}">${current.area === "api" ? "API 本地入口" : "Release 本地入口"}</a>
  <span> / ${escapeHtml(pageDepthLabel(current.local_output))}</span>
</nav>
<aside class="openusd-reading-flow-nav" aria-label="本地阅读导航 / Local reading navigation">
  <h2>本地阅读导航</h2>
  <div class="openusd-reading-flow-columns">
    <section>
      <h3>入口 / Entrances</h3>
      <ul>
        <li><a data-reading-flow="final" href="${escapeHtml(finalHref)}">总入口 / Final entry</a></li>
        <li><a data-reading-flow="release-entry" href="${escapeHtml(releaseHref)}">Release 本地入口</a></li>
        <li><a data-reading-flow="api-entry" href="${escapeHtml(apiHref)}">API Doxygen 本地入口</a></li>
        <li><a data-reading-flow="api-redirect" href="${escapeHtml(apiRedirectHref)}">API redirect / site/api/index.html</a></li>
      </ul>
    </section>
    <section>
      <h3>当前位置 / Current Layer</h3>
      <ol>
        ${pageDepthLabel(current.local_output).split(" / ").map((part) => `<li>${escapeHtml(part)}</li>`).join("\n        ")}
      </ol>
    </section>
    <section>
      <h3>${current.area === "api" ? "当前 API 上下文 / API Context" : "同目录/同域 / Same Directory"}</h3>
      <ul>
        ${relatedLinks || "<li>暂无相邻本地页 / No adjacent local pages</li>"}
      </ul>
    </section>
    <section>
      <h3>上一页/下一页 / Previous/Next</h3>
      <ul>
        ${neighbor || "<li>暂无相邻顺序页 / No sequential neighbor</li>"}
      </ul>
    </section>
    <section>
      <h3>官方外跳 / Official</h3>
      <ul>
        ${official ? `<li><a class="official-link" data-reading-flow="official" href="${escapeHtml(official)}">打开官方原页 / Open official page</a></li>` : "<li>无官方 URL</li>"}
      </ul>
    </section>
  </div>
</aside>
${NAV_END}`;
  return breadcrumb;
}

function removeExistingInjection(html) {
  const navPattern = new RegExp(`${NAV_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${NAV_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
  let next = html.replace(navPattern, "");
  const stylePattern = new RegExp(`<style\\s+id=["']${STYLE_ID}["'][\\s\\S]*?<\\/style>\\s*`, "g");
  next = next.replace(stylePattern, "");
  next = next.replace(/\s*openusd-has-reading-flow/g, "");
  return next;
}

function addBodyClass(html) {
  return html.replace(/<body\b([^>]*)>/i, (match, attrs) => {
    if (/\bclass\s*=/.test(attrs)) {
      return match.replace(/\bclass\s*=\s*(["'])(.*?)\1/i, (classMatch, quote, classes) => {
        const merged = `${classes} openusd-has-reading-flow`.trim().replace(/\s+/g, " ");
        return `class=${quote}${merged}${quote}`;
      });
    }
    return `<body${attrs} class="openusd-has-reading-flow">`;
  });
}

function inject(html, navHtml) {
  let next = removeExistingInjection(html);
  next = next.replace(/<\/head>/i, `${navCss()}\n</head>`);
  next = addBodyClass(next);
  if (/<header[\s>]/i.test(next)) {
    next = next.replace(/<\/header>/i, `</header>\n${navHtml}`);
  } else {
    next = next.replace(/<body[^>]*>/i, (match) => `${match}\n${navHtml}`);
  }
  return next;
}

const inventory = await readJson("reports/all_pages_inventory.json");
const linkPages = inventory.pages
  .filter((page) => page.local_output && page.local_exists !== false)
  .map((page, index) => ({ ...page, index }));
const pages = linkPages.filter((page) => page.local_output.startsWith("full_site/"));
const releasePages = linkPages.filter((page) => page.area === "release");
const apiPages = linkPages.filter((page) => page.area === "api");
const processedReleasePages = pages.filter((page) => page.area === "release");
const processedApiPages = pages.filter((page) => page.area === "api");
const areaMap = { release: releasePages, api: apiPages };

let filesChanged = 0;
let pagesProcessed = 0;
const failures = [];

for (const page of pages) {
  const fullPath = path.join(root, ...page.local_output.split("/"));
  try {
    const original = await readFile(fullPath, "utf8");
    const navHtml = buildNav(page, linkPages, areaMap[page.area] || linkPages);
    const next = inject(original, navHtml);
    pagesProcessed += 1;
    if (next !== original) {
      await writeFile(fullPath, next, "utf8");
      filesChanged += 1;
    }
  } catch (error) {
    failures.push({ local_output: page.local_output, error: error.message });
  }
}

const report = {
  generated_at: new Date().toISOString(),
  root,
  purpose: "Inject reusable local reading-flow navigation into full_site release/API pages, including final entry, release/API local entrances, breadcrumb, related local pages, previous/next, and an explicit official-source jump.",
  counts: {
    pages_processed: pagesProcessed,
    files_changed: filesChanged,
    release_pages_processed: processedReleasePages.length,
    api_pages_processed: processedApiPages.length,
    failures: failures.length,
  },
  failures,
  passed: failures.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "reading_flow_navigation_injection.json"), JSON.stringify(report, null, 2), "utf8");
await writeFile(path.join(reportDir, "reading_flow_navigation_injection.md"), `# OpenUSD Reading Flow Navigation Injection

Generated: ${report.generated_at}

- Passed: ${report.passed}
- Pages processed: ${report.counts.pages_processed}
- Files changed: ${report.counts.files_changed}
- Release pages processed: ${report.counts.release_pages_processed}
- API pages processed: ${report.counts.api_pages_processed}
- Failures: ${report.counts.failures}

Policy: every local full_site page receives a reusable left-side reading navigation with local release/API entrances, breadcrumb, same-directory or API-context links, previous/next links, and a clearly labeled official-source jump.
`, "utf8");

if (!report.passed) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "reading_flow_navigation_injection.json"),
  reportMd: path.join(reportDir, "reading_flow_navigation_injection.md"),
}, null, 2));
