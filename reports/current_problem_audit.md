# Current OpenUSD Problem Audit

Generated: 2026-06-08T04:58:42.208Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：173
- good_bilingual：173
- review_ready_zh：110
- bilingual_draft：233
- draft_needs_translation：222
- draft_template_only：11
- promotion manifest：165
- api_complete：72
- release_complete：101

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | 完成度已推进到 173/406，但仍有 233 个可检查草稿不是完整翻译。 | 继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。 |
| `P1-left-navigation-reading-flow` | P1 | 第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。 | 凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。 | 如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并以 JSON 真实源重建 Markdown。 |
| `P1-release-coverage-lag` | P1 | release/spec/proposal 覆盖仍需继续推进；本轮补齐 spec/whitepaper 核心页。 | 继续优先 release/spec/proposal 中的高价值短页或针对 review_ready_zh 债务做 EnglishDebtRound；批量晋级时逐页确认 source parity 和 good_bilingual。 |

## 下一步

Continue release/spec/proposal promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.
