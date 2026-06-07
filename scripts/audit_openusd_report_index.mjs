import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const auditChain = [
  {
    key: "chinese_first_order_contract",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_chinese_first_order_contract.mjs",
    script: "scripts/audit_openusd_chinese_first_order_contract.mjs",
    json: "reports/chinese_first_order_contract_audit.json",
    md: "reports/chinese_first_order_contract_audit.md",
    purpose: "Checks that Chinese labels/explanations precede the retained English originals across all local pages.",
    required_count_keys: ["pages_checked", "ordered_cn_en_term_pairs", "ordered_zh_en_pairs", "pages_with_chinese_first_layer"],
  },
  {
    key: "entry_label_contract",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_entry_label_contract.mjs",
    script: "scripts/audit_openusd_entry_label_contract.mjs",
    json: "reports/entry_label_contract_audit.json",
    md: "reports/entry_label_contract_audit.md",
    purpose: "Checks key release/API entry hrefs, Chinese labels, and original English names.",
    required_count_keys: ["release_entry_links_bilingual", "api_entry_cards_bilingual", "adjacent_title_pairs_bilingual"],
  },
  {
    key: "entry_structure_parity",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_entry_structure_parity.mjs",
    script: "scripts/audit_openusd_entry_structure_parity.mjs",
    json: "reports/entry_structure_parity_audit.json",
    md: "reports/entry_structure_parity_audit.md",
    purpose: "Checks Sphinx/Doxygen shell parity, release navigation groups, API entry links, and adjacent-page shells.",
    required_count_keys: ["release_local_markers", "api_local_markers", "api_entry_links_local", "adjacent_pages_passed"],
  },
  {
    key: "primary_entry_coverage",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_primary_entry_coverage.mjs",
    script: "scripts/audit_openusd_primary_entry_coverage.mjs",
    json: "reports/primary_entry_coverage.json",
    md: "reports/primary_entry_coverage.md",
    purpose: "Checks the two requested primary entry pages and the local API redirect.",
    required_count_keys: ["pages", "release_cn_terms", "api_entry_cards"],
  },
  {
    key: "official_entry_freshness",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_official_entry_freshness.mjs",
    script: "scripts/audit_openusd_official_entry_freshness.mjs",
    json: "reports/official_entry_freshness_audit.json",
    md: "reports/official_entry_freshness_audit.md",
    purpose: "Fetches only the two official entry URLs and checks live markers against local outputs.",
    required_count_keys: ["official_urls", "live_pages_ok", "failed_checks"],
  },
  {
    key: "responsive_layout_contract",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_responsive_layout_contract.mjs",
    script: "scripts/audit_openusd_responsive_layout_contract.mjs",
    json: "reports/responsive_layout_contract_audit.json",
    md: "reports/responsive_layout_contract_audit.md",
    purpose: "Checks viewport metadata, local bilingual CSS attachment, and mobile layout contracts.",
    required_count_keys: ["pages_checked", "pages_with_viewport", "responsive_css_files"],
  },
  {
    key: "page_metadata_contract",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_page_metadata_contract.mjs",
    script: "scripts/audit_openusd_page_metadata_contract.mjs",
    json: "reports/page_metadata_contract_audit.json",
    md: "reports/page_metadata_contract_audit.md",
    purpose: "Checks zh-CN metadata, bilingual titles, scope notes, and preservation-policy markers.",
    required_count_keys: ["pages_checked", "zh_cn_lang_pages", "bilingual_or_redirect_titles", "chinese_english_layer_pages"],
  },
  {
    key: "term_consistency",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_term_consistency.mjs",
    script: "scripts/audit_openusd_term_consistency.mjs",
    json: "reports/term_consistency_audit.json",
    md: "reports/term_consistency_audit.md",
    purpose: "Checks critical bilingual terms, preserved API/tool names, and forbidden translations.",
    required_count_keys: ["pages", "term_pairs", "preserved_names"],
  },
  {
    key: "navigation_coverage",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_navigation_coverage.mjs",
    script: "scripts/audit_openusd_navigation_coverage.mjs",
    json: "reports/navigation_coverage_audit.json",
    md: "reports/navigation_coverage_audit.md",
    purpose: "Checks release navigation groups, adjacent links, API navigation assets, and API entry links.",
    required_count_keys: ["release_adjacent_links_present", "api_navigation_assets_present", "api_entry_links_present"],
  },
  {
    key: "source_provenance",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_source_provenance.mjs",
    script: "scripts/audit_openusd_source_provenance.mjs",
    json: "reports/source_provenance_audit.json",
    md: "reports/source_provenance_audit.md",
    purpose: "Checks manifest entries, official URLs, source snapshots, local outputs, and generators.",
    required_count_keys: ["entries", "primary_scope_entries", "active_adjacent_scope_entries"],
  },
  {
    key: "style_asset_contract",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_style_asset_contract.mjs",
    script: "scripts/audit_openusd_style_asset_contract.mjs",
    json: "reports/style_asset_contract_audit.json",
    md: "reports/style_asset_contract_audit.md",
    purpose: "Checks Doxygen/Sphinx assets, local bilingual CSS, and page asset markers.",
    required_count_keys: ["doxygen_assets", "sphinx_assets", "release_css_selectors", "api_css_selectors"],
  },
  {
    key: "scope_boundary",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_scope_boundaries.mjs",
    script: "scripts/audit_openusd_scope_boundaries.mjs",
    json: "reports/scope_boundary_audit.json",
    md: "reports/scope_boundary_audit.md",
    purpose: "Checks the bounded local HTML, source snapshot, manifest, and report set.",
    required_count_keys: ["html_pages", "source_snapshots", "primary_scope_entries", "active_adjacent_scope_entries"],
  },
  {
    key: "link_audit",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_repro_links.mjs",
    script: "scripts/audit_openusd_repro_links.mjs",
    json: "reports/link_audit.json",
    md: "reports/link_audit.md",
    purpose: "Classifies local resources, external links, out-of-scope official relative links, and anchors.",
    required_count_keys: ["local_exists", "external", "official_relative_out_of_scope"],
  },
  {
    key: "http_preview",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_http_preview.mjs",
    script: "scripts/audit_openusd_http_preview.mjs",
    json: "reports/http_preview_audit.json",
    md: "reports/http_preview_audit.md",
    purpose: "Serves local output over HTTP and checks pages plus CSS/JS/image/font resources.",
    required_count_keys: ["pages", "local_assets_checked"],
  },
  {
    key: "full_draft_preview",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_full_draft_preview.mjs",
    script: "scripts/audit_openusd_full_draft_preview.mjs",
    json: "reports/full_draft_preview_audit.json",
    md: "reports/full_draft_preview_audit.md",
    purpose: "Serves the project root over HTTP and checks every bilingual_draft page plus final HTML entry links.",
    required_count_keys: ["draft_pages", "pages_checked", "final_entry_links", "failed_pages"],
  },
  {
    key: "markdown_encoding",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_markdown_encoding.mjs",
    script: "scripts/audit_openusd_markdown_encoding.mjs",
    json: "reports/markdown_encoding_audit.json",
    md: "reports/markdown_encoding_audit.md",
    purpose: "Checks human-facing progress Markdown for UTF-8 without BOM and repeated question-mark encoding damage.",
    required_count_keys: ["files_checked", "question_runs", "replacement_chars", "bom_files"],
  },
  {
    key: "translation_quality",
    command: "node .\\openusd_api_cn_repro\\scripts\\audit_openusd_translation_quality.mjs",
    script: "scripts/audit_openusd_translation_quality.mjs",
    json: "reports/translation_quality_review.json",
    md: "reports/translation_quality_review.md",
    purpose: "Classifies every local page by bilingual translation depth, template-only draft risk, bad-encoding risk, and unexpected official links.",
    required_count_keys: ["total_pages"],
  },
];

const validationEntry = {
  key: "validation",
  command: "powershell -ExecutionPolicy Bypass -File .\\openusd_api_cn_repro\\scripts\\validate_openusd_api_repro.ps1",
  script: "scripts/validate_openusd_api_repro.ps1",
  json: "reports/validation_report.json",
  md: null,
  purpose: "Final local structure, content, report, and fixed-chain validation.",
  required_count_keys: ["required_check_count", "failed_check_count"],
};

async function fileInfo(relativePath) {
  if (!relativePath) {
    return { exists: true, relative_path: null };
  }
  const fullPath = path.join(root, relativePath);
  try {
    const info = await stat(fullPath);
    return {
      exists: true,
      relative_path: relativePath,
      size_bytes: info.size,
      modified_at: info.mtime.toISOString(),
    };
  } catch {
    return {
      exists: false,
      relative_path: relativePath,
    };
  }
}

async function readJson(relativePath) {
  const text = await readFile(path.join(root, relativePath), "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

function pickCounts(report, keys) {
  const counts = report.counts ?? report;
  const selected = {};
  for (const key of keys) {
    selected[key] = counts?.[key] ?? report?.[key] ?? null;
  }
  return selected;
}

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

const entries = [];
for (const item of [...auditChain, validationEntry]) {
  const scriptInfo = await fileInfo(item.script);
  const jsonInfo = await fileInfo(item.json);
  const mdInfo = await fileInfo(item.md);
  let report = null;
  let parsed = false;
  let passed = false;
  let selectedCounts = {};
  if (jsonInfo.exists) {
    report = await readJson(item.json);
    parsed = true;
    passed = report.passed === true;
    selectedCounts = pickCounts(report, item.required_count_keys);
  }
  entries.push({
    key: item.key,
    purpose: item.purpose,
    command: item.command,
    script: scriptInfo,
    json_report: jsonInfo,
    md_report: mdInfo,
    parsed,
    passed,
    selected_counts: selectedCounts,
  });
}

const validation = entries.find((entry) => entry.key === "validation");
const auditEntries = entries.filter((entry) => entry.key !== "validation");
const checks = [
  check("report_index:all_audit_scripts_exist", auditEntries.every((entry) => entry.script.exists), {
    missing_scripts: auditEntries.filter((entry) => !entry.script.exists).map((entry) => entry.script.relative_path),
  }),
  check("report_index:all_audit_json_reports_exist", auditEntries.every((entry) => entry.json_report.exists), {
    missing_reports: auditEntries.filter((entry) => !entry.json_report.exists).map((entry) => entry.json_report.relative_path),
  }),
  check("report_index:all_audit_markdown_reports_exist", auditEntries.every((entry) => entry.md_report.exists), {
    missing_reports: auditEntries.filter((entry) => !entry.md_report.exists).map((entry) => entry.md_report.relative_path),
  }),
  check("report_index:all_audits_passed", auditEntries.every((entry) => entry.passed), {
    failed_audits: auditEntries.filter((entry) => !entry.passed).map((entry) => entry.key),
  }),
  check("report_index:validation_report_ready", validation?.script.exists && validation?.json_report.exists && validation?.parsed === true, {
    validation: validation?.selected_counts,
  }),
  check("report_index:fixed_chain_size_ready", auditEntries.length >= 16 && entries.length >= 17),
  check("report_index:scope_counts_still_bounded", entries.some((entry) => entry.key === "scope_boundary" && entry.selected_counts.html_pages === 10 && entry.selected_counts.source_snapshots === 8), {
    scope_boundary: entries.find((entry) => entry.key === "scope_boundary")?.selected_counts,
  }),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Report index for the bounded OpenUSD bilingual reproduction. It indexes the fixed audit chain and validation artifacts without adding pages, mirroring more official content, or storing official body text.",
  official_scope_urls: [
    "https://openusd.org/release/index.html",
    "https://openusd.org/release/api/index.html",
  ],
  entries,
  counts: {
    audit_entries: auditEntries.length,
    total_entries: entries.length,
    audit_scripts_present: auditEntries.filter((entry) => entry.script.exists).length,
    audit_json_reports_present: auditEntries.filter((entry) => entry.json_report.exists).length,
    audit_markdown_reports_present: auditEntries.filter((entry) => entry.md_report.exists).length,
    audit_reports_passed: auditEntries.filter((entry) => entry.passed).length,
    validation_required_checks: validation?.selected_counts.required_check_count ?? null,
    validation_failed_checks: validation?.selected_counts.failed_check_count ?? null,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "audit_index.json"), JSON.stringify(report, null, 2), "utf8");

const rows = entries.map((entry) => {
  const mdPath = entry.md_report.relative_path ?? "";
  return `| ${entry.key} | ${entry.passed} | \`${entry.json_report.relative_path}\` | ${mdPath ? `\`${mdPath}\`` : ""} |`;
}).join("\n");

const md = `# OpenUSD Audit Index

Generated: ${report.generated_at}

Scope:

- \`https://openusd.org/release/index.html\`
- \`https://openusd.org/release/api/index.html\`

Result:

- Passed: ${report.passed}
- Audit entries: ${report.counts.audit_entries}
- Audit scripts present: ${report.counts.audit_scripts_present}
- Audit JSON reports present: ${report.counts.audit_json_reports_present}
- Audit Markdown reports present: ${report.counts.audit_markdown_reports_present}
- Audit reports passed: ${report.counts.audit_reports_passed}
- Validation checks: ${report.counts.validation_required_checks}
- Validation failures: ${report.counts.validation_failed_checks}
- Index checks: ${report.counts.checks}
- Failed index checks: ${report.counts.failed_checks}

| Audit | Passed | JSON Report | Markdown Report |
| --- | --- | --- | --- |
${rows}

Policy:

- This index summarizes the existing fixed audit chain and final validation.
- It does not create new HTML pages, source snapshots, or official body-text mirrors.
- It keeps report discovery stable for future five-minute iterations.
`;

await writeFile(path.join(reportDir, "audit_index.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "audit_index.json"),
  reportMd: path.join(reportDir, "audit_index.md"),
}, null, 2));
