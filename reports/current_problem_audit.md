# Current OpenUSD Problem Audit

Generated: 2026-06-08T23:21:35.933Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：232
- good_bilingual：232
- review_ready_zh：169
- bilingual_draft：174
- draft_needs_translation：164
- draft_template_only：10
- promotion manifest：224
- api_complete：106
- api_review_ready_zh：46
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：457
- round_type：PromotionRound
- target：`full_site/api/md_pxr_exec_exec_usd_docs_overview.html`
- commit SHA：`final-receipt-sha-after-push`
- source parity：`reports/round_457_openexec_overview_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=232/406，API complete=106，仍有 174 个可检查草稿，不是完整翻译。 | 继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-openexec-source-parity` | P1 | OpenExec 文档页必须按官方 section 顺序覆盖 concepts、computations、tutorials、advanced topics 和调试边界，不能只保留摘要表。 | 后续 OpenExec 教程或系统设计页继续按 source snapshot 做 section-level 中文主阅读路径和点击顺序覆盖。 |
| `P1-click-order-reading-flow-consistency` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。 | 若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
