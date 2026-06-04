# OpenUSD Official Entry Freshness Audit

Generated: 2026-06-03T18:54:18.368Z

Scope:

- `https://openusd.org/release/index.html`
- `https://openusd.org/release/api/index.html`

Result:

- Passed: true
- Official URLs checked: 2
- Live pages OK: 2
- Source snapshots checked: 2
- Local outputs checked: 3
- Release live markers present: 8
- API live markers present: 7
- Checks: 11
- Failed checks: 0

Live titles:

- Release: USD Home &mdash; Universal Scene Description 26.05 documentation
- API: Universal Scene Description: Universal Scene Description (USD)

Policy:

- Fetch only the two official entry URLs requested by the user.
- Store only status, titles, marker counts, and missing-marker lists.
- Compare live entry markers with existing source snapshots and local bilingual outputs.
- Preserve API names, page names, and links exactly while keeping Chinese-first local guidance.
- Do not widen this audit into a full-site mirror or body-text diff.
