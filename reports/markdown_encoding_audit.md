# Markdown Encoding Audit

Generated: 2026-06-07T08:55:38.736Z

Result:

- Passed: true
- Files checked: 4
- Repeated question-mark runs: 0
- Unicode replacement characters: 0
- BOM files: 0

| File | Passed | Has BOM | Question Runs | Replacement Chars | Size |
| --- | --- | --- | --- | --- | --- |
| `work.md` | true | false | 0 | 0 | 2998 |
| `reports/iteration_report.md` | true | false | 0 | 0 | 1948 |
| `reports/current_problem_audit.md` | true | false | 0 | 0 | 2409 |
| `reports/bilingual_completion_promotions.md` | true | false | 0 | 0 | 33393 |

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
