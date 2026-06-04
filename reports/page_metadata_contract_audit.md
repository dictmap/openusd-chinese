# OpenUSD Page Metadata Contract Audit

Generated: 2026-06-03T18:54:18.453Z

Result:

- Passed: true
- Pages checked: 9
- zh-CN language pages: 9
- Viewport pages: 9
- Bilingual or redirect titles: 9
- Release scope notes: 5
- API scope notes: 3
- Redirect scope notes: 1
- Chinese/English layer pages: 9
- Checks: 7
- Failed checks: 0

| Page | Family | zh-CN | Title OK | Scope/Policy OK |
| --- | --- | --- | --- | --- |
| release_index.html | release | true | true | true |
| intro.html | release | true | true | true |
| apiDocs.html | release | true | true | true |
| glossary.html | release | true | true | true |
| toolset.html | release | true | true | true |
| index.html | api | true | true | true |
| _usd__overview_and_purpose.html | api | true | true | true |
| usd_page_front.html | api | true | true | true |
| api/index.html | redirect | true | true | true |

Policy:

- Keep every local HTML page declared as `lang="zh-CN"`.
- Keep page titles Chinese-first while preserving the official English page name.
- Keep a local scope note or redirect note that states the bounded reproduction intent.
- Preserve API names, page names, class names, command names, CLI flags, and links.
- This audit checks metadata and local policy markers; it is not a full-page translation diff.
