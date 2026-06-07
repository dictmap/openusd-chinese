# OpenUSD 当前问题审计

## 当前真实计数

- 全量页面：406
- 完整双语 / good_bilingual：74
- bilingual_complete：74
- 未完整翻译草稿 / bilingual_draft：332
- draft_needs_translation：321
- draft_template_only：11
- promotion manifest：66 页

## P0-completion-stalled

完成数曾长期停在 8 页。当前 promotion path 已经把真实完成数提升到 74 页，但剩余 332 页仍是草稿，不能描述成完整翻译。

证据：`reports/bilingual_completion_promotions.json` 记录 66 个晋级页面；`reports/translation_quality_review.json` 报告 `good_bilingual=74`。

要求：后续只允许把完成逐段双语覆盖、移除草稿标记并通过质量审计的页面加入 promotion manifest。

## P0-final-entry-misleading

总入口曾用 `pending=0` 掩盖大部分页面仍未完整翻译。现在入口必须继续诚实显示 complete 与 incomplete drafts。

证据：`openusd_bilingual_final.html` 当前显示 74 complete / 332 incomplete drafts。

## P0-automation-wrong-objective

旧自动化倾向于每轮补 5 页导读并推送，不能代表完成度。当前自动化已改为 PromotionRound / DefectRound / ConsistencyRound，并要求 `good_bilingual` 增长或命名 P0/P1 修复。

证据：本轮为单页 PromotionRound，只晋级 `full_site/api/usd_skel_page_front.html`，完成数 73 -> 74。

## P1-markdown-record-encoding

人类可读 Markdown 曾出现问号化编码损坏。当前轮继续保留 Markdown 编码审计。

证据：`reports/markdown_encoding_audit.json` 必须 passed，且 question_runs=0、bom_files=0。

## P1-link-placeholders

很多点击仍会路由到本地 uncovered placeholder，因为 406 页 inventory 没有覆盖全部官方 Doxygen 子目标。

证据：`reports/local_link_routing_report.json` 继续记录 uncovered links；这是当前范围策略下的可见缺口。

要求：后续优先处理高点击导航、目录和核心 API 子页，不把 placeholder 路由描述成完成体验。

## P1-draft-content-thin

大多数草稿页仍是中文导读和术语说明，不是逐段完整双语翻译。

证据：321 页仍是 `draft_needs_translation`，11 页仍是 `draft_template_only`。

## P2-validation-json-bom

`validation_report.json` 必须保持无 BOM，并可被 Node `JSON.parse` 解析。

证据：最新总验证 passed=true，failed_check_count=0。

## 第 369 轮处理结果

- 轮次类型：PromotionRound
- 晋级页面：`full_site/api/usd_skel_page_front.html`
- 完成数变化：good_bilingual 73 -> 74
- 剩余草稿：332 页仍是可检查草稿，不是完整翻译
- 下一轮建议目标：`full_site/api/usd_lux_page_front.html`
