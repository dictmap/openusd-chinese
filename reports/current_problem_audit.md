# Current OpenUSD Problem Audit

Generated: 2026-06-08T17:59:28.663Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：224
- good_bilingual：224
- review_ready_zh：161
- bilingual_draft：182
- draft_needs_translation：172
- draft_template_only：10
- promotion manifest：216
- api_complete：98
- api_review_ready_zh：38
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：445
- round_type：PromotionRound
- target：`full_site/api/_usd_skel__intro.html`
- commit SHA：`本轮提交后以最终回执为准`
- source parity：`reports/round_445_usd_skel_intro_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=224/406，API complete=98，仍有 182 个可检查草稿。 | 继续推进 API 草稿；只把真实达到中文主阅读路径和 source parity 的页面写入 promotion manifest。 |
| `P1-inventory-title-source-parity` | P1 | 部分 API 页面 inventory title 可能来自旧导航文本，晋级时必须以 source snapshot 的真实标题做 source parity。 | 后续遇到 title_hints 或标题错位时，先读 source snapshot，不得按旧 inventory title 翻译。 |
| `P1-left-navigation-reading-flow` | P1 | 完成页必须保留本地 reading-flow 导航、breadcrumb、API/Release/总入口和显式官方外跳。 | 若 reading-flow 审计失败，先修导航，不得推送。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`下一轮建议 PromotionRound：重新读取 inventory 后选择一个仍为 bilingual_draft 且有 source snapshot 的高价值 API 页面。`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
