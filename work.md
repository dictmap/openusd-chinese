# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：148
- 严格中文可读 / review_ready_zh：85
- API complete：72
- Release complete：76
- 未完整翻译草稿 / bilingual_draft：258
- draft_needs_translation：247
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：140 项
- 总验证：passed=true，failed_check_count=0，required_check_count=311

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。API 名、类名、函数名、token、代码、属性名和链接会保留英文；真正需要治理的是草稿页和完成页里仍主要依赖英文的中文主阅读路径。

## 第 410 轮：DomainSprintRound

- 轮次性质：流程或一致性修复，不晋级新页面。
- 轮次目的：Round 410 DomainSprintRound：usdVol 粒子场属性/API 短页小批量冲刺。实际晋级 8 页：full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html。本轮从 140 个 good_bilingual 增至 148；中文主阅读路径覆盖页面职责、官方 section、ParticleField position/kernel/radiance/opacity/orientation/scale 分组、核函数和 AttributeAPI 边界、误读点、调试路径、相邻 usdVol 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。
- 本轮目标：Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.
- 官方页面：不适用
- 完成数状态：good_bilingual=148；review_ready_zh=85。
- 固定审计：`translation_quality_review.json`、`english_debt_audit.json`、`all_pages_inventory.json`、`validation_report.json` 已重建。

## English Debt 审计结果

- good_bilingual：148
- review_ready_zh：85
- review_needs_zh_debt：63
- API complete / review_ready_zh：72 / 12
- Release complete / review_ready_zh：76 / 73

## 验证结果

- `audit_openusd_english_debt.mjs`：passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：passed
- `validate_openusd_api_repro.ps1`：passed，311/311 checks

## 下一轮目标

建议目标：`Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.`。如果该页无法达到 `good_bilingual`，停止并报告阻塞；不要回到只刷 API 模块页的节奏。
