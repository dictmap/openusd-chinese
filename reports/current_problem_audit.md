# Current OpenUSD Problem Audit

Generated: 2026-06-07T22:38:56.926Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：99
- good_bilingual：99
- review_ready_zh：36
- bilingual_draft：307
- draft_needs_translation：296
- draft_template_only：11
- promotion manifest：91
- api_complete：72
- release_complete：27

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | The promotion path now raises completion to 99/406, but the remaining 307 draft pages still need real upgrades. | Continue using the promotion manifest only for pages with Chinese main-reading-path coverage, paragraph-level structure, and draft-marker removal; do not mark guide-only drafts as complete. |
| `P0-final-entry-misleading` | P0 | The final entry must keep completed and draft counts aligned with inventory, quality, English debt, and problem audit. | Keep final-entry counts and completed-page tables dynamic; keep bilingual_draft clearly described as incomplete translation. |
| `P0-automation-wrong-objective` | P0 | The old heartbeat automation optimized for repeated 5-page refinement and GitHub sync rather than real completion progress. | Keep the automation prompt aligned with current counts and the promotion mechanism; do not let it regress to count-neutral round churn. |
| `P1-left-navigation-reading-flow` | P1 | Fixed in round 396 and preserved in round 398: completed full_site pages expose a real local reading path with side navigation, breadcrumb, local release/API entrances, related pages, previous/next links, and explicit official-source jumps. | Keep inject_openusd_reading_flow_navigation.mjs and audit_openusd_reading_flow_navigation.mjs in the validation chain whenever promoted pages or navigation status changes. |
| `P1-markdown-record-encoding` | P1 | Human-facing progress Markdown had previously been damaged by Windows encoding handoffs; the encoding guard remains required. | If audit_openusd_markdown_encoding.mjs fails, stop promotion and regenerate the Markdown from JSON truth sources before continuing. |
| `P1-link-placeholders` | P1 | Many clicks still route to the local uncovered placeholder because the 406-page inventory does not contain every official Doxygen target. | Prioritize high-click navigation and TOC links for local anchors or inventory expansion; do not present placeholder routing as a finished reading experience. |
| `P1-draft-content-thin` | P1 | Most remaining draft pages contain Chinese guidance and term notes, not paragraph-level bilingual translation. 296 pages remain draft_needs_translation and 11 remain draft_template_only. | For selected high-value pages, replace or supplement guide-only blocks with dense Chinese main-reading-path coverage and then promote status only if the page passes quality and English debt audits. |
| `P1-english-residual-debt` | P1 | The good_bilingual count is useful but still too broad to prove human-review-ready Chinese reading quality; English/Chinese ratio remains diagnostic only, not a hard failure. | Report review_ready_zh alongside good_bilingual; schedule EnglishDebtRound for pages missing section coverage or Chinese main reading path, not merely because English remains abundant. |
| `P1-release-coverage-lag` | P1 | Completion remains API-skewed while release/tutorial/user-guide pages still lag, although recent S2 rounds moved usdLux and tutorial pages forward. | Continue release/tutorial/user-guide PromotionRounds unless a named P0/P1 defect blocks the run. |

## 下一步

PromotionRound target full_site/release/user_guides/schemas/usdLux/SphereLight.html, if it can become good_bilingual; otherwise stop and report the concrete blocker.
