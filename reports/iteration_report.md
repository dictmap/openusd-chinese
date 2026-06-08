# OpenUSD Iteration Report

## 第 410 轮摘要

- 轮次类型：DomainSprintRound
- 轮次目的：Round 410 DomainSprintRound：usdVol 粒子场属性/API 短页小批量冲刺。实际晋级 8 页：full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html、full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html。本轮从 140 个 good_bilingual 增至 148；中文主阅读路径覆盖页面职责、官方 section、ParticleField position/kernel/radiance/opacity/orientation/scale 分组、核函数和 AttributeAPI 边界、误读点、调试路径、相邻 usdVol 类型关系，并保留 API 名、schema 名、token、属性名、代码、Doxygen 表格标签、链接语义和显式官方外跳。
- 本轮目标：命名缺陷或一致性修复
- 结果：未晋级页面，修复命名缺陷或一致性问题。
- 核心说明：保持审计链和人类可读记录一致。

## 真实计数

- total_pages：406
- good_bilingual：148
- review_ready_zh：85
- bilingual_complete：148
- bilingual_draft：258
- draft_needs_translation：247
- draft_template_only：11
- pending_full_scope：0
- api_complete：72
- release_complete：76

## 验证

- validation_report：passed=true，failed_check_count=0，required_check_count=311
- translation_quality：good_bilingual=148
- english_debt：review_ready_zh=85，review_needs_zh_debt=63
- promotion manifest：140 entries

## 本轮改动文件

- `openusd_bilingual_final.html`
- `reports/all_pages_inventory.json/md`
- `reports/translation_quality_review.json/md`
- `reports/english_debt_audit.json/md`
- `reports/current_problem_audit.json/md`
- `reports/bilingual_completion_promotions.json/md`
- `reports/navigation_coverage_audit.json/md`
- `reports/reading_flow_navigation_audit.json/md`
- `reports/local_link_routing_report.json/md`
- `reports/full_draft_preview_audit.json/md`
- `reports/audit_index.json/md`
- `reports/validation_report.json`
- `work.md`
- `reports/iteration_report.md`

## 下一步

优先选择 release/tutorial/user guide 页面，以降低 release 覆盖滞后。建议目标：`Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.`。
