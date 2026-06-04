# OpenUSD Responsive Layout Contract Audit

Generated: 2026-06-03T18:54:18.550Z

Result:

- Passed: true
- Pages checked: 9
- Pages with viewport: 9
- Release pages with local CSS: 5
- API pages with local CSS: 3
- API route guide steps: 3
- Responsive CSS files: 2
- Checks: 9
- Failed checks: 0

Policy:

- Keep the current bounded page set: release/API primary entries, approved adjacent entries, and the local API redirect.
- Require viewport metadata so the Sphinx and Doxygen shells can scale on narrow screens.
- Keep local bilingual CSS attached to the release and API page families.
- Require mobile grid fallback and long-text wrapping for Chinese/English paired labels, API entry cards, glossary cards, and toolset guides.
- This is a layout-contract audit, not a screenshot or full-site crawl.
