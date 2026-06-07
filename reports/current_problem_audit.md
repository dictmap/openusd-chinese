# Current OpenUSD Problem Audit

Generated: 2026-06-07T22:04:16.632Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：98
- good_bilingual：98
- review_ready_zh：35
- bilingual_draft：308
- draft_needs_translation：297
- draft_template_only：11
- promotion manifest：90
- api_complete：72
- release_complete：26

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | The promotion path now raises completion to 98/406, but the remaining 308 draft pages still need real upgrades. | Continue using the promotion manifest only for pages with paragraph-level bilingual coverage and draft-marker removal; do not mark guide-only drafts as complete. |
| `P0-final-entry-misleading` | P0 | The final entry must keep completed and draft counts aligned with inventory, quality, and problem audit. | Keep final-entry counts and completed-page tables dynamic; keep bilingual_draft clearly described as incomplete translation. |
| `P0-automation-wrong-objective` | P0 | The old heartbeat automation optimized for repeated 5-page refinement and GitHub sync rather than real completion progress. | Keep the automation prompt aligned with current counts and the promotion mechanism; do not let it regress to count-neutral round-churn. |
| `P1-left-navigation-reading-flow` | P1 | Fixed in round 396 and preserved in round 397: completed full_site pages expose a real local reading path with side navigation, breadcrumb, local release/API entrances, related pages, previous/next links, and explicit official-source jumps. | Keep inject_openusd_reading_flow_navigation.mjs and audit_openusd_reading_flow_navigation.mjs in the validation chain whenever promoted pages or navigation status changes. |
| `P1-markdown-record-encoding` | P1 | Human-facing progress Markdown had been damaged by Windows encoding handoffs and contained many repeated question marks. | Keep audit_openusd_markdown_encoding.mjs in the validation chain; if it fails, stop promotion and regenerate the Markdown before continuing. |
| `P1-link-placeholders` | P1 | Many clicks still route to the local uncovered placeholder because the 406-page inventory does not contain every official Doxygen target. | Prioritize high-click navigation and TOC links for local anchors or inventory expansion; do not present placeholder routing as a finished reading experience. |
| `P1-draft-content-thin` | P1 | Most remaining draft pages contain Chinese guidance and term notes, not paragraph-level bilingual translation. 297 pages remain draft_needs_translation and 11 remain draft_template_only. | For selected high-value pages, replace or supplement guide-only blocks with dense paragraph-level bilingual coverage and then promote status only if the page passes the stricter rule. |
| `P1-english-residual-debt` | P1 | The good_bilingual count is useful but still too broad to prove human-review-ready Chinese reading quality; English/Chinese ratio remains diagnostic only, not a hard failure. | Report review_ready_zh alongside good_bilingual; schedule EnglishDebtRound for pages missing section coverage or Chinese main reading path, not merely because English remains abundant. |
| `P1-release-coverage-lag` | P1 | Completion remains API-skewed while release/tutorial/user-guide pages still lag, although recent S2 rounds moved usdLux and tutorial pages forward. | Continue release/tutorial/user-guide PromotionRounds unless a named P0/P1 defect blocks the run. |
| `P2-validation-json-bom` | P2 | validation_report.json previously used UTF-8 BOM, which broke standard Node JSON.parse. | Keep validation_report.json BOM-free in every future validation run. |

## 下一步

Next normal run should be a single PromotionRound targeting full_site/release/user_guides/schemas/usdLux/ShapingAPI.html if it can become good_bilingual and preferably review_ready_zh; do not batch-translate or silently switch pages.
