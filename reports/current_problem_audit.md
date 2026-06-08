# Current OpenUSD Problem Audit

Generated: 2026-06-08T00:08:03.881Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：104
- good_bilingual：104
- review_ready_zh：41
- bilingual_draft：302
- draft_needs_translation：291
- draft_template_only：11
- promotion manifest：96
- api_complete：72
- release_complete：32

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P0-completion-stalled` | P0 | 完成度已推进到 104/406，但仍有 302 个可检查草稿不是完整翻译。 | 继续只把具备中文主阅读路径、段落级结构和无草稿标记的页面写入 promotion manifest；不得把导读型草稿描述为完整翻译。 |
| `P0-final-entry-misleading` | P0 | 总入口必须与 inventory、quality、English debt 和 problem audit 的完成数保持一致。 | 保持总入口完成数和 completed-page 表格由真实报告生成；继续明确 bilingual_draft 是可检查草稿，不是完整翻译。 |
| `P0-automation-wrong-objective` | P0 | 自动化不得退回计数不变的 refinement 轮次。 | 下一轮继续要求 good_bilingual 增长、EnglishDebtRound 的 review_ready_zh 改善，或命名 P0/P1 缺陷修复；否则停止。 |
| `P1-left-navigation-reading-flow` | P1 | 第 396 轮修复的本地连续阅读路径在本轮继续保留，并覆盖新晋级的 DomeLight 页面。 | 凡是晋级页面或导航状态变化，继续运行 inject_openusd_reading_flow_navigation.mjs 和 audit_openusd_reading_flow_navigation.mjs。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫仍是硬门槛，避免中文进度记录再次退化成问号或乱码。 | 如果 audit_openusd_markdown_encoding.mjs 失败，立即停止晋级并用 JSON 真实源重建 Markdown。 |
| `P1-link-placeholders` | P1 | 仍有大量未纳入 406 页 inventory 的官方链接会走本地 placeholder，但完成页主阅读路径保持本地闭环。 | 优先按用户高频路径修复本地入口、TOC 和完成页关联链接；不要把 placeholder 路由当成完整阅读体验。 |
| `P1-draft-content-thin` | P1 | 剩余多数 draft 仍只是可检查草稿，不具备段落级中文主阅读路径。 | 继续选择高价值 release/user guide/API 页面，将导读型草稿重写为中文主阅读路径；只有质量和 English debt 审计通过后才晋级。 |
| `P1-english-residual-debt` | P1 | good_bilingual 只能证明自动化门槛通过，review_ready_zh 仍需同步报告以避免英文主导阅读路径。 | 继续把英文/中文比例作为诊断项而非硬失败；对缺少 section coverage 或中文主阅读路径的完成页安排 EnglishDebtRound。 |
| `P1-release-coverage-lag` | P1 | release/tutorial/user-guide 覆盖仍落后于 API，但 usdLux S2 页面正在持续补齐。 | 除非出现命名 P0/P1 缺陷，下一轮继续优先 release/user-guide 页面，建议目标 full_site/release/user_guides/schemas/usdLux/DomeLight_1.html。 |

## 下一步

PromotionRound target full_site/release/user_guides/schemas/usdLux/DomeLight_1.html, if it can become good_bilingual; otherwise stop and report the concrete blocker.
