# Markdown Encoding Audit

Generated: 2026-06-08T11:18:09.759Z

Result:

- Passed: true
- Files checked: 4
- Repeated question-mark runs: 0
- Unicode replacement characters: 0
- Mojibake markers: 0
- BOM files: 0

| File | Passed | Has BOM | Question Runs | Replacement Chars | Mojibake Markers | Size |
| --- | --- | --- | --- | --- | --- | --- |
| `work.md` | true | false | 0 | 0 | 0 | 2087 |
| `reports/iteration_report.md` | true | false | 0 | 0 | 0 | 1984 |
| `reports/current_problem_audit.md` | true | false | 0 | 0 | 0 | 1798 |
| `reports/bilingual_completion_promotions.md` | true | false | 0 | 0 | 0 | 38018 |

Policy:

- Human-facing progress Markdown must remain UTF-8 without BOM.
- Runs of three or more question marks are treated as likely encoding damage and fail the audit.
- Common UTF-8/GBK mojibake markers such as 锛, 銆, and 鐨 fail the audit because they indicate unreadable Chinese progress records.
- If this audit fails, stop the round and regenerate the Markdown from JSON state before promoting another page.
