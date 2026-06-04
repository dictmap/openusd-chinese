import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const pageContracts = [
  {
    key: "release_index",
    page: "release_index.html",
    family: "release",
    title_fragments: ["USD 首页", "USD Home"],
    scope_markers: ["cn-repro-scope", "本地双语复刻范围", "Local bilingual reproduction scope"],
    policy_markers: ["保留官方英文标题", "preserving official English titles"],
  },
  {
    key: "intro",
    page: "intro.html",
    family: "release",
    title_fragments: ["USD 介绍", "Introduction to USD"],
    scope_markers: ["cn-repro-scope", "release 首页的第一相邻入口"],
    policy_markers: ["官方英文正文与链接保留", "official English body and links are preserved"],
  },
  {
    key: "apiDocs",
    page: "apiDocs.html",
    family: "release",
    title_fragments: ["API 文档", "API Documentation"],
    scope_markers: ["cn-repro-scope", "release 文档到 Doxygen API 文档的桥接入口"],
    policy_markers: ["官方 API 名称与链接保留", "official API names and links are preserved"],
  },
  {
    key: "glossary",
    page: "glossary.html",
    family: "release",
    title_fragments: ["USD 术语和概念", "USD Terms and Concepts"],
    scope_markers: ["cn-repro-scope", "术语对照入口"],
    policy_markers: ["官方英文定义与链接保留", "official English definitions and links are preserved"],
  },
  {
    key: "toolset",
    page: "toolset.html",
    family: "release",
    title_fragments: ["USD 工具集", "USD Toolset"],
    scope_markers: ["cn-repro-scope", "命令行工具入口"],
    policy_markers: ["命令名与 CLI flag 不翻译", "official command usage, options, and links are preserved"],
  },
  {
    key: "api_index",
    page: "index.html",
    family: "api",
    title_fragments: ["通用场景描述 (USD)", "Universal Scene Description (USD)"],
    scope_markers: ["cn-repro-note", "OpenUSD API 首页"],
    policy_markers: ["API 名称、页面名和链接保持原样", "API names, page names, and links are preserved"],
  },
  {
    key: "api_overview",
    page: "_usd__overview_and_purpose.html",
    family: "api",
    title_fragments: ["概述与目的", "Overview and Purpose"],
    scope_markers: ["cn-repro-note", "API 首页的相邻概念入口"],
    policy_markers: ["API 名称和链接目标", "API names, and link targets"],
  },
  {
    key: "usd_page_front",
    page: "usd_page_front.html",
    family: "api",
    title_fragments: ["Usd 核心", "Usd : Universal Scene Description"],
    scope_markers: ["cn-repro-note", "Usd core front page"],
    policy_markers: ["类名和链接目标", "class names, and link targets"],
  },
  {
    key: "api_redirect",
    page: "api/index.html",
    family: "redirect",
    title_fragments: ["Usd API", "本地跳转"],
    scope_markers: ["../index.html", "本地双语复刻页"],
    policy_markers: ["The local bilingual Usd API reproduction", "../index.html"],
  },
];

function check(name, passed, details = {}) {
  return { check: name, passed: Boolean(passed), details };
}

function hasAll(text, markers) {
  return markers.every((marker) => text.includes(marker));
}

function titleOf(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
}

async function readSitePage(relativePath) {
  return readFile(path.join(root, "site", relativePath), "utf8");
}

const pageAudits = [];
for (const contract of pageContracts) {
  const html = await readSitePage(contract.page);
  const title = titleOf(html);
  const hasZhCnLang = /<html\b[^>]*\blang="zh-CN"/i.test(html);
  const hasViewport = /<meta\s+name="viewport"/i.test(html);
  const hasChinese = /[\u4e00-\u9fff]/u.test(title) || html.includes('class="zh"') || html.includes('class="cn-term"');
  const hasEnglish = /[A-Za-z]/.test(title) && (html.includes('class="en"') || html.includes('class="en-term"') || html.includes("The local bilingual"));
  const titleOk = hasAll(title, contract.title_fragments);
  const scopeOk = hasAll(html, contract.scope_markers);
  const policyOk = hasAll(html, contract.policy_markers);
  pageAudits.push({
    key: contract.key,
    page: contract.page,
    family: contract.family,
    title,
    has_zh_cn_lang: hasZhCnLang,
    has_viewport: hasViewport,
    title_ok: titleOk,
    has_chinese_layer: hasChinese,
    has_english_layer: hasEnglish,
    scope_note_ok: scopeOk,
    preservation_policy_ok: policyOk,
    missing_title_fragments: contract.title_fragments.filter((marker) => !title.includes(marker)),
    missing_scope_markers: contract.scope_markers.filter((marker) => !html.includes(marker)),
    missing_policy_markers: contract.policy_markers.filter((marker) => !html.includes(marker)),
  });
}

const releasePages = pageAudits.filter((page) => page.family === "release");
const apiPages = pageAudits.filter((page) => page.family === "api");
const redirectPages = pageAudits.filter((page) => page.family === "redirect");

const checks = [
  check("metadata:all_pages_have_zh_cn_lang", pageAudits.every((page) => page.has_zh_cn_lang), {
    missing_pages: pageAudits.filter((page) => !page.has_zh_cn_lang).map((page) => page.page),
  }),
  check("metadata:all_pages_have_viewport", pageAudits.every((page) => page.has_viewport), {
    missing_pages: pageAudits.filter((page) => !page.has_viewport).map((page) => page.page),
  }),
  check("metadata:all_titles_are_bilingual_or_redirect", pageAudits.every((page) => page.title_ok), {
    failed_titles: pageAudits.filter((page) => !page.title_ok).map((page) => ({
      page: page.page,
      title: page.title,
      missing: page.missing_title_fragments,
    })),
  }),
  check("metadata:release_scope_notes_ready", releasePages.every((page) => page.scope_note_ok && page.preservation_policy_ok), {
    failed_pages: releasePages.filter((page) => !(page.scope_note_ok && page.preservation_policy_ok)).map((page) => page.page),
  }),
  check("metadata:api_scope_notes_ready", apiPages.every((page) => page.scope_note_ok && page.preservation_policy_ok), {
    failed_pages: apiPages.filter((page) => !(page.scope_note_ok && page.preservation_policy_ok)).map((page) => page.page),
  }),
  check("metadata:redirect_scope_note_ready", redirectPages.every((page) => page.scope_note_ok && page.preservation_policy_ok), {
    failed_pages: redirectPages.filter((page) => !(page.scope_note_ok && page.preservation_policy_ok)).map((page) => page.page),
  }),
  check("metadata:all_pages_keep_chinese_and_english_layers", pageAudits.every((page) => page.has_chinese_layer && page.has_english_layer), {
    failed_pages: pageAudits.filter((page) => !(page.has_chinese_layer && page.has_english_layer)).map((page) => page.page),
  }),
];

const failedChecks = checks.filter((entry) => !entry.passed);
const report = {
  generated_at: new Date().toISOString(),
  root,
  scope_note: "Page metadata and Chinese-first contract audit for the bounded OpenUSD bilingual reproduction. It checks zh-CN language metadata, bilingual page titles, local scope notes, and preservation-policy notes without copying official body text or adding pages.",
  official_scope_urls: [
    "https://openusd.org/release/index.html",
    "https://openusd.org/release/api/index.html",
  ],
  pages: pageAudits,
  counts: {
    pages_checked: pageAudits.length,
    zh_cn_lang_pages: pageAudits.filter((page) => page.has_zh_cn_lang).length,
    viewport_pages: pageAudits.filter((page) => page.has_viewport).length,
    bilingual_or_redirect_titles: pageAudits.filter((page) => page.title_ok).length,
    release_scope_notes: releasePages.filter((page) => page.scope_note_ok && page.preservation_policy_ok).length,
    api_scope_notes: apiPages.filter((page) => page.scope_note_ok && page.preservation_policy_ok).length,
    redirect_scope_notes: redirectPages.filter((page) => page.scope_note_ok && page.preservation_policy_ok).length,
    chinese_english_layer_pages: pageAudits.filter((page) => page.has_chinese_layer && page.has_english_layer).length,
    checks: checks.length,
    failed_checks: failedChecks.length,
  },
  checks,
  failed_checks: failedChecks,
  passed: failedChecks.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "page_metadata_contract_audit.json"), JSON.stringify(report, null, 2), "utf8");

const rows = pageAudits.map((page) => {
  return `| ${page.page} | ${page.family} | ${page.has_zh_cn_lang} | ${page.title_ok} | ${page.scope_note_ok && page.preservation_policy_ok} |`;
}).join("\n");

const md = `# OpenUSD Page Metadata Contract Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Pages checked: ${report.counts.pages_checked}
- zh-CN language pages: ${report.counts.zh_cn_lang_pages}
- Viewport pages: ${report.counts.viewport_pages}
- Bilingual or redirect titles: ${report.counts.bilingual_or_redirect_titles}
- Release scope notes: ${report.counts.release_scope_notes}
- API scope notes: ${report.counts.api_scope_notes}
- Redirect scope notes: ${report.counts.redirect_scope_notes}
- Chinese/English layer pages: ${report.counts.chinese_english_layer_pages}
- Checks: ${report.counts.checks}
- Failed checks: ${report.counts.failed_checks}

| Page | Family | zh-CN | Title OK | Scope/Policy OK |
| --- | --- | --- | --- | --- |
${rows}

Policy:

- Keep every local HTML page declared as \`lang="zh-CN"\`.
- Keep page titles Chinese-first while preserving the official English page name.
- Keep a local scope note or redirect note that states the bounded reproduction intent.
- Preserve API names, page names, class names, command names, CLI flags, and links.
- This audit checks metadata and local policy markers; it is not a full-page translation diff.
`;

await writeFile(path.join(reportDir, "page_metadata_contract_audit.md"), md, "utf8");

if (failedChecks.length > 0) {
  console.error(JSON.stringify({ passed: false, failedChecks }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  counts: report.counts,
  reportJson: path.join(reportDir, "page_metadata_contract_audit.json"),
  reportMd: path.join(reportDir, "page_metadata_contract_audit.md"),
}, null, 2));
