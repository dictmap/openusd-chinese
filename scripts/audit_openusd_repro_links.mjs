import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const siteDir = path.join(root, "site");
const reportDir = path.join(root, "reports");

const pageFiles = [
  "release_index.html",
  "intro.html",
  "apiDocs.html",
  "glossary.html",
  "toolset.html",
  "index.html",
  "_usd__overview_and_purpose.html",
  "usd_page_front.html",
  "api/index.html",
];

function stripFragmentAndQuery(value) {
  return value.split("#")[0].split("?")[0];
}

function isExternal(value) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function classifyMissing(attr, target) {
  const clean = stripFragmentAndQuery(target);
  if (attr === "href" && clean.endsWith(".html")) {
    return "official_relative_out_of_scope";
  }
  if (attr === "href" && clean.includes(".html#")) {
    return "official_relative_out_of_scope";
  }
  return "missing_local_asset";
}

async function auditPage(relativePage) {
  const pagePath = path.join(siteDir, relativePage);
  const html = await readFile(pagePath, "utf8");
  const pageDir = path.dirname(pagePath);
  const refs = [];
  const regex = /<(?<tag>[a-zA-Z][^>\s]*)(?<attrs>[^>]*)\s(?<attr>href|src)=["'](?<value>[^"']+)["'][^>]*>/g;

  for (const match of html.matchAll(regex)) {
    const tag = match.groups.tag.toLowerCase();
    const attr = match.groups.attr.toLowerCase();
    const value = match.groups.value;
    let status = "unknown";
    let resolved = null;

    if (!value || value.startsWith("#")) {
      status = "anchor_or_empty";
    } else if (isExternal(value)) {
      status = "external";
    } else {
      const clean = stripFragmentAndQuery(value);
      resolved = path.resolve(pageDir, clean);
      const localExists = await exists(resolved);
      status = localExists ? "local_exists" : classifyMissing(attr, value);
    }

    refs.push({ page: relativePage, tag, attr, value, status, resolved });
  }

  return refs;
}

const allRefs = [];
for (const page of pageFiles) {
  allRefs.push(...await auditPage(page));
}

const counts = allRefs.reduce((acc, ref) => {
  acc[ref.status] = (acc[ref.status] || 0) + 1;
  return acc;
}, {});

const missingLocalAssets = allRefs.filter((ref) => ref.status === "missing_local_asset");
const outOfScopeDocs = allRefs.filter((ref) => ref.status === "official_relative_out_of_scope");
const localRefs = allRefs.filter((ref) => ref.status === "local_exists");

const report = {
  generated_at: new Date().toISOString(),
  root,
  pages: pageFiles,
  counts,
  passed: missingLocalAssets.length === 0,
  missing_local_assets: missingLocalAssets,
  official_relative_out_of_scope_count: outOfScopeDocs.length,
  official_relative_out_of_scope_sample: outOfScopeDocs.slice(0, 200),
  local_reference_count: localRefs.length,
  note: "HTML documentation links outside the current local bilingual scope are intentionally kept as official relative links until those pages are added.",
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "link_audit.json"), JSON.stringify(report, null, 2), "utf8");

const md = `# OpenUSD Link Audit

Generated: ${report.generated_at}

Pages audited:

${pageFiles.map((page) => `- \`${page}\``).join("\n")}

Status:

- Passed: ${report.passed}
- Local references found: ${report.local_reference_count}
- Missing local asset references: ${missingLocalAssets.length}
- External references: ${counts.external || 0}
- Official relative out-of-scope document links: ${outOfScopeDocs.length}

Policy:

- Local assets referenced by the generated pages must exist.
- Documentation links to pages not yet in local bilingual scope remain as official relative links.
- API names, schema names, and page names are preserved in English unless a Chinese label is added alongside the original.
`;

await writeFile(path.join(reportDir, "link_audit.md"), md, "utf8");

if (missingLocalAssets.length > 0) {
  console.error(JSON.stringify({ passed: false, missingLocalAssets }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts,
  linkAuditJson: path.join(reportDir, "link_audit.json"),
  linkAuditMd: path.join(reportDir, "link_audit.md"),
}, null, 2));
