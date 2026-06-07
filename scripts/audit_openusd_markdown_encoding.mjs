import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const reportDir = path.join(root, "reports");

const filesToCheck = [
  "work.md",
  "reports/iteration_report.md",
  "reports/current_problem_audit.md",
  "reports/bilingual_completion_promotions.md",
];

function hasBom(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
}

function countMatches(text, regex) {
  return (text.match(regex) ?? []).length;
}

async function inspectFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const buffer = await readFile(absolutePath);
  const text = buffer.toString("utf8");
  const questionRuns = countMatches(text, /\?{3,}/g);
  const replacementChars = countMatches(text, /\uFFFD/g);
  const bom = hasBom(buffer);
  return {
    relative_path: relativePath,
    size_bytes: buffer.length,
    has_bom: bom,
    question_runs: questionRuns,
    replacement_chars: replacementChars,
    passed: !bom && questionRuns === 0 && replacementChars === 0,
  };
}

const files = [];
for (const relativePath of filesToCheck) {
  files.push(await inspectFile(relativePath));
}

const failedFiles = files.filter((file) => !file.passed);
const report = {
  generated_at: new Date().toISOString(),
  purpose: "Check human-facing OpenUSD progress Markdown for UTF-8 without BOM and for previous Windows encoding damage such as repeated question marks.",
  files_checked: files.length,
  question_runs: files.reduce((sum, file) => sum + file.question_runs, 0),
  replacement_chars: files.reduce((sum, file) => sum + file.replacement_chars, 0),
  bom_files: files.filter((file) => file.has_bom).length,
  files,
  failed_files: failedFiles,
  passed: failedFiles.length === 0,
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, "markdown_encoding_audit.json"), JSON.stringify(report, null, 2), "utf8");

const rows = files.map((file) => {
  return `| \`${file.relative_path}\` | ${file.passed} | ${file.has_bom} | ${file.question_runs} | ${file.replacement_chars} | ${file.size_bytes} |`;
}).join("\n");

const md = `# Markdown Encoding Audit

Generated: ${report.generated_at}

Result:

- Passed: ${report.passed}
- Files checked: ${report.files_checked}
- Repeated question-mark runs: ${report.question_runs}
- Unicode replacement characters: ${report.replacement_chars}
- BOM files: ${report.bom_files}

| File | Passed | Has BOM | Question Runs | Replacement Chars | Size |
| --- | --- | --- | --- | --- | --- |
${rows}

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
`;

await writeFile(path.join(reportDir, "markdown_encoding_audit.md"), md, "utf8");

if (!report.passed) {
  console.error(JSON.stringify({ passed: false, failed_files: failedFiles }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  passed: true,
  files_checked: report.files_checked,
  reportJson: path.join(reportDir, "markdown_encoding_audit.json"),
  reportMd: path.join(reportDir, "markdown_encoding_audit.md"),
}, null, 2));
