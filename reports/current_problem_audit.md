# Current OpenUSD Problem Audit

Generated: 2026-06-08T17:18:23.352Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：223
- good_bilingual：223
- review_ready_zh：160
- bilingual_draft：183
- draft_needs_translation：173
- draft_template_only：10
- promotion manifest：215
- api_complete：97
- api_review_ready_zh：37
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：444
- round_type：PromotionRound
- target：`full_site/api/_developer__guides.html`
- commit SHA：`本轮提交后以最终回执为准`
- source parity：`reports/round_444_developer_guides_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=223/406，API complete=97，仍有 183 个可检查草稿。 | 继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-local-snapshot-boundary` | P1 | 入口/索引页必须诚实说明未纳入本地 inventory 的官方子页，不得伪装成本地完成页面。 | 后续处理索引页时继续区分本地已完成页、可检查草稿、未纳入本地快照的官方条目。 |
| `P1-left-navigation-reading-flow` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。 | 若 reading-flow 审计失败，先修导航，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
