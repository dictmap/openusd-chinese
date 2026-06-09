# Current OpenUSD Problem Audit

Generated: 2026-06-09T06:29:01.748Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：246
- good_bilingual：246
- review_ready_zh：183
- bilingual_draft：160
- draft_needs_translation：150
- draft_template_only：10
- promotion manifest：238
- api_complete：120
- api_review_ready_zh：60
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：485
- round_type：PromotionRound
- target：`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`
- commit SHA：`round-485-promotion-commit-sha-before-push`
- source parity：`reports/round_485_boolean_expressions_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=246/406，API complete=120，仍有 160 个可检查草稿，不是完整翻译。 | 继续推进 API 可检查草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-boolean-expressions-source-parity` | P1 | Boolean Expressions 页面必须按官方 section 覆盖表达式语言、常量、字符串、变量、运算符、括号、隐式转换和 shownIf 示例，不能只保留摘要表。 | 后续 Sdf/Vt/property expression 相关页面继续按 source snapshot 做中文主阅读路径、调试路径和点击顺序覆盖。 |
| `P1-click-order-reading-flow-consistency` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。 | 若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`下一轮建议 PromotionRound：基于 live reports 选择一个仍为 bilingual_draft 且有 source snapshot 的 API 高价值页面。`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
