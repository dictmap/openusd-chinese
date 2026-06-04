# OpenUSD Primary Entry Coverage Audit

Generated: 2026-06-03T18:54:16.999Z

Scope:

- `https://openusd.org/release/index.html` -> `site/release_index.html`
- `https://openusd.org/release/api/index.html` -> `site/index.html`
- Release page local API redirect -> `site/api/index.html`

Result:

- Passed: true
- Pages audited: 3
- Checks: 19
- Failed checks: 0
- Release bilingual term pairs: 321/321
- API bilingual blocks: 4
- API entry cards: 3
- API route guide steps: 3
- API scope notes: 1

Coverage policy:

- Keep Sphinx and Doxygen structural markers on the two primary entry pages.
- Keep page names, API names, command names, and official links unchanged.
- Add Chinese labels or summaries alongside the English originals.
- Keep primary images local and avoid remote OpenUSD image references in generated output.
- Do not widen this audit into an unbounded full-site mirror.
