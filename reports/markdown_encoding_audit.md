# Markdown Encoding Audit

Generated: 2026-06-07T11:12:18.684Z

Result:

- Passed: true
- Files checked: 4
- Repeated question-mark runs: 0
- Unicode replacement characters: 0
- BOM files: 0

| File | Passed | Has BOM | Question Runs | Replacement Chars | Size |
| --- | --- | --- | --- | --- | --- |
| `work.md` | true | false | 0 | 0 | 2327 |
| `reports/iteration_report.md` | true | false | 0 | 0 | 1836 |
| `reports/current_problem_audit.md` | true | false | 0 | 0 | 2587 |
| `reports/bilingual_completion_promotions.md` | true | false | 0 | 0 | 41335 |

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
