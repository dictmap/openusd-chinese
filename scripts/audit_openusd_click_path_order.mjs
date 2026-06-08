import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readJson(relativePath) {
  return JSON.parse(stripBom(await readFile(path.join(root, relativePath), "utf8")));
}

async function existsLocal(localOutput) {
  try {
    await access(path.join(root, ...localOutput.split("/")));
    return true;
  } catch {
    return false;
  }
}

function escapeMd(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function anchors(html) {
  const out = [];
  const pattern = /<a\b([^>]*?)\bhref\s*=\s*(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = match[0];
    const flow = raw.match(/\bdata-reading-flow\s*=\s*["']([^"']+)["']/i)?.[1] ?? null;
    out.push({
      flow,
      href: match[3],
      text: cleanText(match[5]),
      raw,
    });
  }
  return out;
}

function relativeTarget(currentLocalOutput, href) {
  if (!href || href.startsWith("#")) return href || null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return null;
  const pathname = href.split("#", 1)[0].split("?", 1)[0];
  const currentDir = path.posix.dirname(currentLocalOutput);
  const normalized = path.posix.normalize(path.posix.join(currentDir, pathname));
  if (normalized.startsWith("../") || path.posix.isAbsolute(normalized)) return null;
  return normalized;
}

function releaseCategory(localOutput) {
  const base = path.posix.basename(localOutput);
  if (localOutput === "full_site/release/intro_to_openexec.html") return "openexec";
  const schemaMatch = localOutput.match(/\/user_guides\/schemas\/([^/]+)\//);
  if (schemaMatch) return `schema:${schemaMatch[1]}`;
  if (localOutput.includes("/user_guides/schemas/")) return "schema:index";
  if (localOutput.includes("/user_guides/")) return "user-guide";
  if (base.startsWith("tut_")) return "tutorial";
  if (base.startsWith("spec")) return "spec";
  if (base.startsWith("wp")) return "proposal";
  if (base.startsWith("plugins")) return "plugins";
  if (["contributing_to_usd.html", "contributors.html", "dl_downloads.html", "genindex.html", "maxperf.html", "press_opensource_announce.html", "press_opensource_release.html", "ref_performance_metrics.html", "release_schedule.html", "search.html", "usd_products.html", "usdfaq.html"].includes(base)) {
    return "support";
  }
  return "release";
}

function releaseRelatedAllowed(currentCategory, targetCategory) {
  if (targetCategory === "openexec") return currentCategory === "openexec";
  if (currentCategory === "openexec") return targetCategory === "api-openexec";
  if (currentCategory === "schema:index") return targetCategory.startsWith("schema:");
  if (currentCategory.startsWith("schema:")) {
    return targetCategory === currentCategory || targetCategory === "schema:index";
  }
  if (currentCategory === "user-guide") return ["user-guide", "schema:index", "tutorial", "support"].includes(targetCategory) || targetCategory.startsWith("schema:");
  if (currentCategory === "tutorial") return ["tutorial", "user-guide", "support"].includes(targetCategory);
  if (currentCategory === "spec" || currentCategory === "proposal") return targetCategory === "spec" || targetCategory === "proposal" || targetCategory.startsWith("schema:");
  if (currentCategory === "plugins") return targetCategory === "plugins" || targetCategory === "support";
  if (currentCategory === "support") return targetCategory === "support" || targetCategory === "plugins" || targetCategory === "tutorial";
  return targetCategory === currentCategory;
}

function targetCategoryFor(localOutput) {
  if (!localOutput || localOutput.startsWith("#")) return "anchor";
  if (localOutput.startsWith("full_site/api/")) {
    if (/\/(md_pxr_exec_|page__execution__system__design)/.test(localOutput)) return "api-openexec";
    return "api";
  }
  if (localOutput.startsWith("site/")) return "site-entry";
  if (localOutput.startsWith("full_site/release/")) return releaseCategory(localOutput);
  return "other";
}

function flowLinks(list) {
  return list.filter((entry) => ["related", "prev", "next"].includes(entry.flow));
}

const inventory = await readJson("reports/all_pages_inventory.json");
const pagesByOutput = new Map(inventory.pages.map((page) => [page.local_output, page]));
const completeFullSite = inventory.pages.filter((page) =>
  page.status === "bilingual_complete"
  && page.local_output?.startsWith("full_site/")
  && page.local_exists !== false
);

const pageResults = [];
for (const page of completeFullSite) {
  const html = await readFile(path.join(root, ...page.local_output.split("/")), "utf8");
  const list = anchors(html);
  const problems = [];
  const flows = flowLinks(list);
  const related = flows.filter((entry) => entry.flow === "related");
  const prevNext = flows.filter((entry) => entry.flow === "prev" || entry.flow === "next");

  for (const entry of flows) {
    if (/^https:\/\/openusd\.org\/release\//i.test(entry.href)) {
      problems.push({ type: "flow_href_official_leak", flow: entry.flow, href: entry.href, text: entry.text });
    }
    if (/https:\/\/openusd\.org\/release\//i.test(entry.text)) {
      problems.push({ type: "flow_text_official_url", flow: entry.flow, href: entry.href, text: entry.text });
    }
    const target = relativeTarget(page.local_output, entry.href);
    if (!target) {
      problems.push({ type: "flow_target_not_local", flow: entry.flow, href: entry.href, text: entry.text });
      continue;
    }
    if (!target.startsWith("#") && !(await existsLocal(target))) {
      problems.push({ type: "flow_target_missing", flow: entry.flow, href: entry.href, target, text: entry.text });
    }
  }

  if (page.area === "release") {
    const currentCategory = releaseCategory(page.local_output);
    for (const entry of related) {
      const target = relativeTarget(page.local_output, entry.href);
      if (!target || target.startsWith("#")) continue;
      const targetCategory = targetCategoryFor(target);
      if (!releaseRelatedAllowed(currentCategory, targetCategory)) {
        problems.push({
          type: "release_related_category_mismatch",
          href: entry.href,
          text: entry.text,
          current_category: currentCategory,
          target_category: targetCategory,
          target,
        });
      }
    }
  }

  if (page.local_output === "full_site/release/intro_to_openexec.html") {
    const required = [
      "#background",
      "#introducing-openexec",
      "#illustrative-example",
      "#new-concepts",
      "#client-api",
      "../api/md_pxr_exec_exec_usd_docs_overview.html",
      "../api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html",
      "../api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html",
      "../api/page__execution__system__design.html",
    ];
    for (const needle of required) {
      if (!html.includes(needle)) problems.push({ type: "intro_openexec_missing_click_step", href: needle });
    }
    const forbidden = ["maxperf.html", "plugins.html", "contributors.html", "dl_downloads.html", "press_opensource_announce.html", "press_opensource_release.html"];
    for (const needle of forbidden) {
      if (html.includes(`href="${needle}"`) || html.includes(`href="../${needle}"`)) {
        problems.push({ type: "intro_openexec_unrelated_support_link", href: needle });
      }
    }
  }

  pageResults.push({
    local_output: page.local_output,
    title: page.title,
    area: page.area,
    related_count: related.length,
    prev_next_count: prevNext.length,
    problems,
    passed: problems.length === 0 && related.length >= 1 && prevNext.length >= 1,
  });
}

const failedPages = pageResults.filter((entry) => !entry.passed);
const problemCounts = {};
for (const page of failedPages) {
  for (const problem of page.problems) {
    problemCounts[problem.type] = (problemCounts[problem.type] ?? 0) + 1;
  }
}

const samples = [
  "full_site/release/intro_to_openexec.html",
  "full_site/release/wp_usdlux_for_geometry_lights.html",
  "full_site/release/usdfaq.html",
  "full_site/api/usd_render_page_front.html",
  "full_site/api/usd_vol_page_front.html",
  "full_site/api/class_usd_attribute_limits.html",
  "full_site/api/struct_usd_physics_tokens_type.html",
].map((localOutput) => {
  const result = pageResults.find((entry) => entry.local_output === localOutput);
  return {
    local_output: localOutput,
    title: pagesByOutput.get(localOutput)?.title,
    passed: Boolean(result?.passed),
    problems: result?.problems ?? [{ type: "sample_missing_from_completed_pages" }],
  };
});

const report = {
  generated_at: new Date().toISOString(),
  root,
  round_type: "DefectRound",
  defect_id: "P1-click-order-reading-flow-consistency",
  purpose: "Audit semantic click order for completed OpenUSD bilingual pages. This checks that prev/next/related links are local, do not expose official URLs as reading-path text, and stay within the relevant release/API reading domain instead of random same-directory support pages.",
  counts: {
    completed_full_site_pages: completeFullSite.length,
    pages_checked: pageResults.length,
    passed_pages: pageResults.filter((entry) => entry.passed).length,
    failed_pages: failedPages.length,
    samples: samples.length,
    samples_passed: samples.filter((entry) => entry.passed).length,
    problem_counts: problemCounts,
  },
  checks: [
    { check: "click_path:all_completed_pages_pass", passed: failedPages.length === 0 },
    { check: "click_path:samples_pass", passed: samples.every((entry) => entry.passed) },
    { check: "click_path:no_official_url_in_flow_text", passed: !problemCounts.flow_text_official_url },
    { check: "click_path:no_official_href_in_related_prev_next", passed: !problemCounts.flow_href_official_leak },
    { check: "click_path:release_related_links_match_document_domain", passed: !problemCounts.release_related_category_mismatch },
  ],
  failed_pages: failedPages.slice(0, 120),
  sample_paths: samples,
};
report.passed = report.checks.every((entry) => entry.passed);

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "click_path_order_audit.json"), JSON.stringify(report, null, 2), "utf8");

const rows = failedPages.slice(0, 40).map((page) => {
  const first = page.problems[0] ?? {};
  return `| \`${escapeMd(page.local_output)}\` | ${escapeMd(page.area)} | ${escapeMd(first.type)} | ${escapeMd(first.href ?? first.target ?? "")} | ${escapeMd(first.text ?? "")} |`;
}).join("\n");

await writeFile(path.join(reportDir, "click_path_order_audit.md"), `# OpenUSD Click-Path Order Audit

Generated: ${report.generated_at}

- Passed: ${report.passed}
- Completed full_site pages checked: ${report.counts.completed_full_site_pages}
- Passed pages: ${report.counts.passed_pages}
- Failed pages: ${report.counts.failed_pages}
- Samples passed: ${report.counts.samples_passed}/${report.counts.samples}

## Problem Counts

\`\`\`json
${JSON.stringify(problemCounts, null, 2)}
\`\`\`

## Failed Page Samples

| Page | Area | First Problem | Href/Target | Text |
| --- | --- | --- | --- | --- |
${rows || "| none | none | none | none | none |"}

Policy: local prev/next/related links must support the user's real click order. They must remain local, avoid official URL text in the reading path, and stay in the same document domain or a clearly adjacent API/release domain.
`, "utf8");

if (!report.passed) {
  console.error(JSON.stringify({
    passed: false,
    counts: report.counts,
    failed_pages: report.failed_pages.slice(0, 12),
    reportJson: path.join(reportDir, "click_path_order_audit.json"),
    reportMd: path.join(reportDir, "click_path_order_audit.md"),
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "click_path_order_audit.json"),
  reportMd: path.join(reportDir, "click_path_order_audit.md"),
}, null, 2));
