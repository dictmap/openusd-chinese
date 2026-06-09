# Current OpenUSD Problem Audit

Generated: 2026-06-09T03:10:53.491Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：242
- good_bilingual：242
- review_ready_zh：179
- bilingual_draft：164
- draft_needs_translation：154
- draft_template_only：10
- promotion manifest：234
- api_complete：116
- api_review_ready_zh：56
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：477
- round_type：PromotionRound
- target：`full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`
- commit SHA：`81b22b41d653bd9bfa7987e0f79466762927f9da`
- source parity：`reports/round_477_exec_geom_readme_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=242/406，API complete=116，仍有 164 个可检查草稿，不是完整翻译。 | 继续推进 API 可检查草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-openexec-click-path-quality` | P1 | OpenExec/ExecGeom 文档页必须按官方职责和真实点击顺序覆盖，不能退化成摘要表或随机相关链接。 | 后续 ExecIr 或具体 geometry/token 页面继续按 source snapshot 做中文主阅读路径和点击顺序覆盖。 |
| `P1-click-order-reading-flow-consistency` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口、related links、prev/next 和显式官方外跳。 | 若 reading-flow 或 click-path 审计失败，先修导航和点击顺序，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`下一轮建议 PromotionRound：沿 OpenExec 点击路径继续检查 ExecIr 或具体 geometry/token 页面中仍为 bilingual_draft 且有 source snapshot 的页面。`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
