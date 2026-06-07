# OpenUSD Iteration Report

## 第 395 轮摘要

- 轮次类型：PromotionRound
- 轮次目的：Round 395 PromotionRound promoted full_site/release/user_guides/schemas/usdLux/RectLight.html after official live-page and local source-snapshot parity checks. The page now has Chinese main-reading-path coverage for RectLight one-sided rectangular emission, local XY plane and -Z direction, width/height sizing, texture color-map coordinates, light:shaderId, inherited extent/xformOpOrder/proxyPrim/purpose/visibility, related PortalLight/ShadowAPI distinctions, and renderer debugging boundaries.
- 本轮目标：`full_site/release/user_guides/schemas/usdLux/RectLight.html`
- 结果：完成 1 个页面晋级，并让 good_bilingual 增加。
- 核心说明：目标页已移除草稿状态，补齐中文主阅读路径，并进入 promotion manifest。

## 真实计数

- total_pages：406
- good_bilingual：97
- review_ready_zh：34
- bilingual_complete：97
- bilingual_draft：309
- draft_needs_translation：298
- draft_template_only：11
- pending_full_scope：0
- api_complete：72
- release_complete：25

## 验证

- validation_report：passed=true，failed_check_count=0，required_check_count=302
- translation_quality：good_bilingual=97
- english_debt：review_ready_zh=34，review_needs_zh_debt=63
- promotion manifest：89 entries

## 本轮改动文件

- `scripts/audit_openusd_english_debt.mjs`
- `scripts/audit_openusd_report_index.mjs`
- `scripts/validate_openusd_api_repro.ps1`
- `scripts/build_final_html_entry.mjs`
- `scripts/regenerate_openusd_progress_markdown.mjs`
- `openusd_bilingual_final.html`
- `reports/english_debt_audit.json`
- `reports/english_debt_audit.md`
- `reports/current_problem_audit.json`
- `reports/current_problem_audit.md`
- `work.md`
- `reports/iteration_report.md`
- `reports/bilingual_completion_promotions.md`
- `C:\Users\robot\.codex\skills\openusd-bilingual-automation\SKILL.md`
- `C:\Users\robot\.codex\skills\openusd-bilingual-automation\agents\openai.yaml`

## 下一步

优先选择 release/tutorial/user guide 页面，以降低 release 覆盖滞后。建议目标：`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`。
