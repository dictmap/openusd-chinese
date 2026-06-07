# OpenUSD 当前问题审计

## 当前真实计数

- 全量页面：406
- 完整双语 / good_bilingual：61
- bilingual_complete：61
- 未完整翻译草稿 / bilingual_draft：345
- draft_needs_translation：334
- draft_template_only：11
- promotion manifest：53 页

## P0-completion-stalled

完成数曾长期停在 8 页。当前 promotion path 已经把真实完成数提升到 61 页，但剩余 345 页仍是草稿，不能描述成完整翻译。

证据：`reports/bilingual_completion_promotions.json` 记录 53 个晋级页面；`reports/translation_quality_review.json` 报告 `good_bilingual=61`。

要求：后续只允许把完成逐段双语覆盖、移除草稿标记并通过质量审计的页面加入 promotion manifest。

## P0-final-entry-misleading

总入口曾用 `pending=0` 掩盖大部分页面仍未完整翻译。现在入口必须继续诚实显示 complete 与 incomplete drafts。

证据：`openusd_bilingual_final.html` 当前显示 61 complete / 345 incomplete drafts。

## P0-automation-wrong-objective

旧自动化倾向于每轮补 5 页导读并推送，不能代表完成度。当前自动化已改为 PromotionRound / DefectRound / ConsistencyRound，并要求 `good_bilingual` 增长或命名 P0/P1 修复。

## P1-markdown-record-encoding

Markdown 进度记录曾出现重复问号编码损坏。第 340 轮加入 `audit_openusd_markdown_encoding.mjs`，本轮继续必须通过该审计。

证据：`reports/markdown_encoding_audit.json` 应保持 passed，question_runs=0，bom_files=0。

## P1-link-placeholders

很多站内点击仍会进入 `site/uncovered_openusd_page.html`，因为当前 406 页清单没有覆盖所有官方 Doxygen 目标。这是按策略暴露缺口，但仍是用户可见的浏览体验问题。

要求：后续优先处理高点击导航或真实纳入 inventory 的页面，不要把 placeholder 说成完成体验。

## P1-draft-content-thin

多数草稿页仍只有中文导读和术语说明，不是逐段完整中文改写。

证据：334 页仍是 `draft_needs_translation`，11 页仍是 `draft_template_only`。

## P2-validation-json-bom

`validation_report.json` 曾带 BOM。当前验证脚本输出可被 Node `JSON.parse` 读取，仍需每轮保持。

## 下一步

继续 PromotionRound，每轮只晋级 1 个高价值页面。建议下一页：`full_site/api/class_tf_dense_hash_map.html`。
