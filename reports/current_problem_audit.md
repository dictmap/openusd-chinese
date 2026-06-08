# Current OpenUSD Problem Audit

Generated: 2026-06-08T01:10:05.371Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：113
- good_bilingual：113
- review_ready_zh：50
- bilingual_draft：293
- draft_needs_translation：282
- draft_template_only：11
- promotion manifest：105
- api_complete：72
- release_complete：41

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | 完成度已推进到 113/406，但仍有 293 个可检查草稿不是完整翻译。 | 继续只把具备中文主阅读路径、段落级结构和无草稿标记的页面写入 promotion manifest；不得把导读型草稿描述为完整翻译。 |
| `P1-left-navigation-reading-flow` | P1 | 第 396 轮修复的本地连续阅读路径必须覆盖本轮新晋级页。 | 凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs 和 audit_openusd_reading_flow_navigation.mjs。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。 | 如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并用 JSON 真实源重建 Markdown。 |
| `P1-release-coverage-lag` | P1 | release/tutorial/user-guide 覆盖仍需继续推进。 | 继续优先 release/user-guide 中的高价值短页或教程页；批量晋级时逐页确认 source parity 和 good_bilingual。 |

## 下一步

Continue release/user-guide promotion only if the target pages can become good_bilingual; otherwise stop and report the blocker.
