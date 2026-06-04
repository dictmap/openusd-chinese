# OpenUSD HTTP Preview Audit

Generated: 2026-06-03T18:54:20.445Z

Transient base URL: `http://127.0.0.1:65382/`

Status:

- Passed: true
- Pages checked: 9
- Passed pages: 9
- Failed pages: 0
- Local assets checked over HTTP: 141
- Failed local assets over HTTP: 0

Pages:

- `release_index.html`: passed; status 200; assets 16; missing markers 0
- `intro.html`: passed; status 200; assets 14; missing markers 0
- `apiDocs.html`: passed; status 200; assets 14; missing markers 0
- `glossary.html`: passed; status 200; assets 16; missing markers 0
- `toolset.html`: passed; status 200; assets 14; missing markers 0
- `index.html`: passed; status 200; assets 23; missing markers 0
- `_usd__overview_and_purpose.html`: passed; status 200; assets 22; missing markers 0
- `usd_page_front.html`: passed; status 200; assets 22; missing markers 0
- `api/index.html`: passed; status 200; assets 0; missing markers 0

Policy:

- Pages in the current bilingual scope must be reachable through a local HTTP server.
- Sphinx pages must keep their navigation/content layout markers.
- Doxygen pages must keep their top/sidebar/content/search layout markers.
- Local CSS, JavaScript, image, and font assets referenced by these pages must return HTTP 200.
