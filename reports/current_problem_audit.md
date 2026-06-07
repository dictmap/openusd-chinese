# Current OpenUSD Problem Audit

Generated: 2026-06-07T18:19:24.673Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：91
- good_bilingual：91
- review_ready_zh：28
- bilingual_draft：315
- draft_needs_translation：304
- draft_template_only：11
- promotion manifest：83
- api_complete：72
- release_complete：19

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | The main completion number was structurally stalled at 8; the promotion path now raises it to 91, but the remaining 315 draft pages still need real upgrades. | Continue using the promotion manifest only for pages with paragraph-level bilingual coverage and draft-marker removal; do not mark guide-only drafts as complete. |
| `P0-final-entry-misleading` | P0 | The final entry previously misled users by showing pending=0 while most pages were incomplete drafts. | Keep final-entry counts dynamic and keep bilingual_draft clearly described as incomplete translation. |
| `P0-automation-wrong-objective` | P0 | The old heartbeat automation optimized for repeated 5-page refinement and GitHub sync rather than real completion progress. | Keep the automation prompt aligned with current counts and the promotion mechanism; do not let it regress to count-neutral round-churn. |
| `P1-markdown-record-encoding` | P1 | Human-facing progress Markdown had been damaged by Windows encoding handoffs and contained many repeated question marks. | Keep audit_openusd_markdown_encoding.mjs in the validation chain; if it fails, stop promotion and regenerate the Markdown before continuing. |
| `P1-link-placeholders` | P1 | Many clicks still route to the local uncovered placeholder because the 406-page inventory does not contain every official Doxygen target. | Prioritize high-click navigation and TOC links for local anchors or inventory expansion; do not present placeholder routing as a finished reading experience. |
| `P1-draft-content-thin` | P1 | Most draft pages contain Chinese guidance and term notes, not paragraph-level bilingual translation. | For selected high-value pages, replace or supplement guide-only blocks with dense paragraph-level bilingual coverage and then promote status only if the page passes the stricter rule. |
| `P1-english-residual-debt` | P1 | The good_bilingual count is useful but still too broad to prove human-review-ready Chinese reading quality; English/Chinese ratio alone must not be treated as failure. | Report review_ready_zh alongside good_bilingual; schedule EnglishDebtRound for pages missing section coverage or Chinese main reading path, not merely because English remains abundant. |
| `P1-release-coverage-lag` | P1 | Completion remains API-skewed while release/tutorial/user-guide pages lag, although rounds 375 through 388 moved fourteen release tutorials forward. | After several API PromotionRounds, choose a release/tutorial/user-guide page unless a named P0/P1 defect blocks the run. |
| `P2-validation-json-bom` | P2 | validation_report.json previously used UTF-8 BOM, which broke standard Node JSON.parse. | Keep validation_report.json BOM-free in every future validation run. |

## 下一步

Prefer full_site/release/user_guides/collections_and_patterns.html for the next release/user-guide PromotionRound; otherwise stop and report the blocker.
