# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：105
- 严格中文可读 / review_ready_zh：42
- API complete：72
- Release complete：33
- 未完整翻译草稿 / bilingual_draft：301
- draft_needs_translation：290
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：97 项
- 总验证：passed=true，failed_check_count=0，required_check_count=311

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码、属性名和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的中文主阅读路径。

## 第 404 轮：PromotionRound

- 轮次性质：页面晋级，exactly 1 个目标页。
- 轮次目的：Round 404 PromotionRound：只晋级一个 release user guide 页面 full_site/release/user_guides/schemas/usdLux/DomeLight_1.html。已对比官方页 https://openusd.org/release/user_guides/schemas/usdLux/DomeLight_1.html 与本地 source snapshot source/full_release/user_guides/schemas/usdLux/DomeLight_1_source.html，将该页从 bilingual_draft 升级为 bilingual_complete；中文主阅读路径覆盖环境照明语义、HDR 与 Image Based Lighting、poleAxis 朝向控制、fallback scene 对齐 stage up axis、Y/Z pole-axis token、renderer 只对 dome 本身应用对齐旋转且不继承到 namespace children、OpenEXR latitude-longitude map、guideRadius、inputs:texture:file、inputs:texture:format、light:shaderId、portals、继承 Xformable/Imageable 属性、texture/orientation/composition/renderer 调试路径和相邻 usdLux schema 边界。本轮让 good_bilingual 从 104 增至 105，并让 review_ready_zh 从 41 增至 42。
- 本轮目标：`full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`
- 官方页面：`https://openusd.org/release/user_guides/schemas/usdLux/DomeLight_1.html`
- 完成数状态：good_bilingual=105；review_ready_zh=42。
- 固定审计：`translation_quality_review.json`、`english_debt_audit.json`、`all_pages_inventory.json`、`validation_report.json` 已重建。

## English Debt 审计结果

- good_bilingual：105
- review_ready_zh：42
- review_needs_zh_debt：63
- API complete / review_ready_zh：72 / 12
- Release complete / review_ready_zh：33 / 30

## 验证结果

- `audit_openusd_english_debt.mjs`：passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：passed
- `validate_openusd_api_repro.ps1`：passed，311/311 checks

## 下一轮目标

建议目标：`full_site/release/user_guides/schemas/usdLux/GeometryLight.html`。如果该页无法达到 `good_bilingual`，停止并报告阻塞；不要回到只刷 API 模块页的节奏。
