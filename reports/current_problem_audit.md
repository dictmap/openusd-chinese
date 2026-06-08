# Current OpenUSD Problem Audit

Generated: 2026-06-08T14:07:45.952Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：214
- good_bilingual：214
- review_ready_zh：151
- bilingual_draft：192
- draft_needs_translation：182
- draft_template_only：10
- promotion manifest：206
- api_complete：88
- api_review_ready_zh：28
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：435
- round_type：PromotionRound
- target：`full_site/api/trace_page_front.html`
- commit SHA：`本轮提交后以最终回执为准`
- source parity：`reports/round_435_trace_module_front_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=214/406，API complete=88，仍有 192 个可检查草稿。 | 继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-left-navigation-reading-flow` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。 | 若 reading-flow 审计失败，先修导航，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`full_site/api/hd_storm_page_front.html`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
