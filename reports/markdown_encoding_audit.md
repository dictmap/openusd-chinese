# Markdown Encoding Audit

Generated: 2026-06-07T09:30:17.984Z

Result:

- Passed: true
- Files checked: 4
- Repeated question-mark runs: 0
- Unicode replacement characters: 0
- BOM files: 0

| File | Passed | Has BOM | Question Runs | Replacement Chars | Size |
| --- | --- | --- | --- | --- | --- |
| `work.md` | true | false | 0 | 0 | 2702 |
| `reports/iteration_report.md` | true | false | 0 | 0 | 1813 |
| `reports/current_problem_audit.md` | true | false | 0 | 0 | 2400 |
| `reports/bilingual_completion_promotions.md` | true | false | 0 | 0 | 35068 |

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
