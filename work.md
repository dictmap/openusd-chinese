# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：98
- 严格中文可读 / review_ready_zh：35
- API complete：72
- Release complete：26
- 未完整翻译草稿 / bilingual_draft：308
- draft_needs_translation：297
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：90 页
- 总验证：passed=true，failed_check_count=0，required_check_count=311

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的主阅读路径。

## 第 397 轮：PromotionRound

- 轮次性质：页面晋级，exactly 1 个目标页。
- 轮次目的：Round 397 PromotionRound promoted exactly one release user-guide page: full_site/release/user_guides/schemas/usdLux/ShadowAPI.html. The page was compared against https://openusd.org/release/user_guides/schemas/usdLux/ShadowAPI.html and the local source snapshot source/full_release/user_guides/schemas/usdLux/ShadowAPI_source.html, then upgraded from bilingual_draft to bilingual_complete with Chinese main-reading-path coverage for all five official inputs:shadow:* properties, non-physical shadow-control boundaries, LightAPI shadow-linking distinction, renderer support caveats, and debugging flow. This round increased good_bilingual from 97 to 98 and review_ready_zh from 34 to 35.
- 本轮目标：`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`
- 官方页面：`https://openusd.org/release/user_guides/schemas/usdLux/ShadowAPI.html`
- 完成数状态：good_bilingual=98；review_ready_zh=35。
- 固定审计：`translation_quality_review.json`、`english_debt_audit.json`、`all_pages_inventory.json`、`validation_report.json` 已重建。

## 英文残留审计结果

- good_bilingual：98
- review_ready_zh：35
- review_needs_zh_debt：63
- API complete / review_ready_zh：72 / 12
- Release complete / review_ready_zh：26 / 23

## 验证结果

- `audit_openusd_english_debt.mjs`：passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：passed
- `validate_openusd_api_repro.ps1`：passed，311/311 checks

## 下一轮目标

建议目标：`full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`。如果该页无法达到 `good_bilingual`，停止并报告阻塞；不要回到只刷 API 模块页的节奏。
