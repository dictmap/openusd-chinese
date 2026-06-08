# Current OpenUSD Problem Audit

Generated: 2026-06-08T05:43:05.655Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：189
- good_bilingual：189
- review_ready_zh：126
- bilingual_draft：217
- draft_needs_translation：206
- draft_template_only：11
- promotion manifest：181
- api_complete：72
- release_complete：117

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | 完成度已推进到 189/406，但仍有 217 个可检查草稿，不是完整翻译。 | 继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 bilingual_draft 并列明原因。 |
| `P1-left-navigation-reading-flow` | P1 | 本地连续阅读路径必须覆盖本轮新晋级页面。 | 每次页面晋级后继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫仍是硬门槛，避免中文进度记录退化为问号、replacement character 或 BOM。 | 如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。 |
| `P1-release-coverage-lag` | P1 | release 支撑/导航页面已经补齐一批，但 release 与剩余 API 草稿仍需要继续推进。 | 继续优先处理 release 中仍为 draft_needs_translation 的支撑/参考页，或针对已完成但未 review_ready_zh 的页面执行 EnglishDebtRound。 |

## 下一步

Continue promotion only if target pages can become good_bilingual; otherwise stop and report the blocker.
