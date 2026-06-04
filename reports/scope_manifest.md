# OpenUSD Scope Manifest

## Scope Mode

Current scope is **all discovered release/API HTML pages**, not high-value adjacent filtering. The all-pages inventory is generated at `reports/all_pages_inventory.json` and currently contains 406 official HTML pages: 126 release pages and 280 API pages. Eight official pages are `bilingual_complete`; 398 pages now have checkable `bilingual_draft` HTML, including 121 release drafts under `full_site/release/` and 277 API drafts under `full_site/api/`; 0 pages remain `pending_full_scope`. These 398 pages are draft coverage pages with Chinese guidance and retained English excerpts, not paragraph-complete final translations. The later 18-page draft batch was rolled back because quality was not acceptable; the full discovered queue is now covered without reusing that rejected bulk batch.

## Primary Scope

- `https://openusd.org/release/index.html` -> `site/release_index.html`
- `https://openusd.org/release/api/index.html` -> `site/index.html`

Both pages keep the official page structure and links, add Chinese labels beside the English originals, and preserve API/schema names. The local API index also includes a scope note that points back to the official API index, plus a three-card API entry map and a three-step API route guide for the same in-scope API entry links.

## Active Adjacent Scope

- `https://openusd.org/release/intro.html` -> `site/intro.html`
- `https://openusd.org/release/apiDocs.html` -> `site/apiDocs.html`
- `https://openusd.org/release/glossary.html` -> `site/glossary.html`
- `https://openusd.org/release/toolset.html` -> `site/toolset.html`
- `https://openusd.org/release/api/_usd__overview_and_purpose.html` -> `site/_usd__overview_and_purpose.html`
- `https://openusd.org/release/api/usd_page_front.html` -> `site/usd_page_front.html`

`intro.html` is the first adjacent entry from the release home page. It preserves the official English body and Sphinx structure, adds Chinese labels to headings, local contents, navigation, and a scope note, and rewrites the previous-home link to `release_index.html`.

`apiDocs.html` is the release reference bridge into the Doxygen API documentation. It preserves the official bridge button text and `api/index.html` link while adding Chinese labels and scope notes.

`glossary.html` is the release terminology entry. It preserves the official English definitions and Sphinx structure, adds Chinese labels to contents and headings, adds a core terminology quick map, and now includes ninety-two definition briefs covering all independent glossary sections found in the source page.

`toolset.html` is the release command-line tool entry. It preserves official command usage blocks, option names, command names, and links, while adding Chinese command summaries, six workflow scenario guides, per-tool bilingual briefs, nineteen command option guides, and six focused long-option reading-note blocks.

`_usd__overview_and_purpose.html` is the first API-adjacent conceptual entry. It preserves the Doxygen layout, API names, and link targets, while presenting major headings, paragraphs, and module list entries as Chinese first with the English original retained.

`usd_page_front.html` is the Usd core API front page linked directly from the API index. It preserves the manual hierarchy, class names, and links, while adding Chinese labels to the API Manual entries and Key Classes summaries.

## Adjacent Entry Priority

No page is prioritized by "high value" anymore. The active adjacent scope above is only the currently completed bilingual subset; the full scope is the 406-page inventory.

## Link Policy

- Local assets must exist.
- Explicit "official/original page" links stay official.
- Internal OpenUSD release/API HTML links that exist in the 406-page local inventory route to local HTML.
- Internal OpenUSD release/API HTML links not present in the current inventory route to `site/uncovered_openusd_page.html`, which marks the coverage gap and offers an explicit official-page button.
- API names, schema names, class names, function names, namespaces, and command names stay in English.
- Page titles and explanatory navigation labels can add Chinese while keeping the English original.

Current validation: 275 checks passed, 0 failed; audit index covers 15 audit scripts, 15 JSON reports, 15 Markdown reports, and the final validation status. The all-pages inventory covers 406 official HTML pages, split into 126 release pages and 280 API pages, with 8 bilingual-complete official pages, 398 bilingual-draft pages, and 0 pending full-scope pages. The latest accepted release draft batch is recorded in `reports/release_full_batch_report.json`; the latest API draft batch is recorded in `reports/api_full_batch_report.json` and writes source snapshots under `source/full_api/` plus HTML under `full_site/api/`. Validation checks that draft inventory count matches actual `full_site/` HTML files and that the accepted batch outputs/sources exist. `reports/full_draft_preview_audit.json` serves the project root over transient HTTP and confirms all 398 draft pages return 200, keep Chinese/English layers, link back to the final HTML, and are linked from the final HTML entry. Chinese-first order contract audit checks 881/881 `cn-term`/`en-term` pairs, 354/354 `zh`/`en` blocks, 1 Chinese-first redirect page, and all 9 current local pages with Chinese before retained English. Entry structure parity audit checks the release Sphinx shell, 4 release navigation groups, API Doxygen shell, 3 API entry links, and 6 completed adjacent page shells against source/local structural markers. Page metadata contract audit checks 9 local HTML pages with `zh-CN` language metadata, viewport metadata, bilingual or redirect titles, local scope notes, preservation-policy markers, and Chinese/English layers. Scope boundary audit still confirms the completed local HTML subset is 9 pages; this is now the completed subset, not the full requested scope. Local preview index lists the currently completed local pages at `http://127.0.0.1:8067/`. Final HTML entry is `openusd_bilingual_final.html`, generated from `reports/all_pages_inventory.json`, `reports/local_preview_index.json`, and the validation report; it is available at `http://127.0.0.1:8068/openusd_bilingual_final.html` and displays the full 406-page inventory with complete/draft/pending status.
