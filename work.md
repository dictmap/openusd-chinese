# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：97
- 严格中文可读 / review_ready_zh：34
- API complete：72
- Release complete：25
- 未完整翻译草稿 / bilingual_draft：309
- draft_needs_translation：298
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：89 页
- 总验证：passed=true，failed_check_count=0，required_check_count=302

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的主阅读路径。

## 第 395 轮：PromotionRound

- 轮次性质：页面晋级，exactly 1 个目标页。
- 轮次目的：Round 395 PromotionRound promoted full_site/release/user_guides/schemas/usdLux/RectLight.html after official live-page and local source-snapshot parity checks. The page now has Chinese main-reading-path coverage for RectLight one-sided rectangular emission, local XY plane and -Z direction, width/height sizing, texture color-map coordinates, light:shaderId, inherited extent/xformOpOrder/proxyPrim/purpose/visibility, related PortalLight/ShadowAPI distinctions, and renderer debugging boundaries.
- 本轮目标：`full_site/release/user_guides/schemas/usdLux/RectLight.html`
- 官方页面：`https://openusd.org/release/user_guides/schemas/usdLux/RectLight.html`
- 完成数状态：good_bilingual=97；review_ready_zh=34。
- 固定审计：`translation_quality_review.json`、`english_debt_audit.json`、`all_pages_inventory.json`、`validation_report.json` 已重建。

## 英文残留审计结果

- good_bilingual：97
- review_ready_zh：34
- review_needs_zh_debt：63
- API complete / review_ready_zh：72 / 12
- Release complete / review_ready_zh：25 / 22

## 验证结果

- `audit_openusd_english_debt.mjs`：passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：passed
- `validate_openusd_api_repro.ps1`：passed，302/302 checks

## 下一轮目标

建议目标：`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`。如果该页无法达到 `good_bilingual`，停止并报告阻塞；不要回到只刷 API 模块页的节奏。
