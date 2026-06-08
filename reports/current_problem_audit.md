# Current OpenUSD Problem Audit

Generated: 2026-06-08T06:15:29.014Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：197
- good_bilingual：197
- review_ready_zh：134
- bilingual_draft：209
- draft_needs_translation：198
- draft_template_only：11
- promotion manifest：189
- api_complete：72
- release_complete：125

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | 完成度已推进到 197/406，但仍有 209 个可检查草稿，不是完整翻译。 | 继续只把具备中文主阅读路径、官方 section 覆盖和无草稿标记的页面写入 promotion manifest；未达标页保留 draft 并列明原因。 |
| `P1-release-search-template-only` | P1 | release 范围只剩 search.html 属于 template-only/功能页，不能和普通翻译页混在同一轮硬塞晋级。 | 下一轮若继续 release，应针对 search.html 做 SearchTemplateRound/DefectRound，说明搜索页用途、功能限制、本地入口和不逐行翻译脚本的策略。 |
| `P1-left-navigation-reading-flow` | P1 | 本地连续阅读路径必须覆盖本轮新晋级页面。 | 每次页面晋级后继续运行 inject_openusd_reading_flow_navigation.mjs、route_openusd_internal_links_local.mjs 和 audit_openusd_reading_flow_navigation.mjs。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫仍是硬门槛，避免中文进度记录退化为问号、replacement character 或 BOM。 | 如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并从 JSON 真实源重建 Markdown。 |

## 下一步

Continue only if the next target can satisfy its named round gate; otherwise stop and report the blocker.
