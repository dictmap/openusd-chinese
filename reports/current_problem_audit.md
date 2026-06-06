# OpenUSD 当前问题盘点

生成日期：2026-06-07

这份盘点针对用户反馈：“3 天后仍只有 8 页完成、398 页还是草稿，问题很多但自动化还在继续跑轮次。”本文件已在第 304 轮更新：`full_site` 页面晋级链路已经连续跑通两次，`good_bilingual` 从 8 提升到 10，但整体仍远未完成。

## 当前真实状态

- 全量页面：406
- `bilingual_complete`：10
- `bilingual_draft`：396
- `good_bilingual`：10
- `draft_needs_translation`：385
- `draft_template_only`：11

结论：当前仍不是完成态。396 个 draft 只是可本地打开和检查，不是完整翻译。

## P0 问题

1. 完成数长期停滞，已跑通可复用晋级路径  
   `audit_openusd_translation_quality.mjs` 只有在 inventory 状态为 `bilingual_complete` 且中文密度达标时才会给 `good_bilingual`。过去大量 refinement 脚本只给 `bilingual_draft` 页面增加中文导读和术语对照，没有把页面晋级为 `bilingual_complete` 的机制，所以主指标长期不涨。第 303 轮新增 `reports/bilingual_completion_promotions.json`，第 304 轮继续将 `full_site/api/class_usd_prim.html` 晋级为 promoted complete，`good_bilingual` 已从 8 提升到 10。

2. 总入口展示容易误导，已做第一轮修正  
   总入口曾显示 8 complete、398 draft、0 pending。`pending=0` 容易让人以为“全都处理过了”。现在入口改为动态 complete 数，并把剩余页面标成“未完整翻译草稿 / Incomplete drafts”。后续必须保持 `bilingual_draft` 等于未完整翻译，不得再写成接近完成。

3. 自动化目标错误，已同步纠偏  
   旧自动化一直鼓励“最多 5 页补强、计数保持不变也预期、验证通过后同步”。这导致轮次很多，但完成度不变。自动化已经改为每次先读本问题清单；没有完成数增长、完成标准修正、入口诚实化、报告可解析性修复或关键浏览缺陷修复，就不要继续刷轮次。

## P1 问题

1. 链接占位页仍多  
   当前策略会把 406 清单外的官方 Doxygen 目标路由到 `site/uncovered_openusd_page.html`。这比外跳官方站更可控，但用户体验上仍然是“点了没有本地内容”。后续要优先处理高点击目录和 TOC 链接。

2. 大部分 draft 内容仍偏薄  
   过去补强主要是中文导读和术语对照，不是逐段翻译。要让页面真正晋级，需要按页面正文做密集双语覆盖，而不是继续只加摘要。

## P2 问题

1. `validation_report.json` 编码曾不干净，已修复  
   该文件曾带 UTF-8 BOM，标准 Node `JSON.parse` 会直接失败。现在 `validate_openusd_api_repro.ps1` 写 UTF-8 无 BOM JSON，后续必须保持。

## 下一步规则

- 不再把“可打开、可预览、验证通过、GitHub 已同步”描述为完整翻译完成。
- 后续自动化每轮必须先回答：本轮是否能让 `good_bilingual` 增加，或是否修复了用户明确指出的关键体验问题。
- 若不能增加完成数，必须说明阻塞原因，并优先修完成标准、入口展示或高点击缺页，而不是继续刷小批量补强。
- 进入下一批翻译前，必须沿用 `reports/bilingual_completion_promotions.json` 的晋级路径：只有完成 paragraph-level bilingual coverage、移除 draft 标记并通过审计的页面才可晋级。
- `scripts/discover_openusd_all_pages.mjs` 必须锚定本地 406 个 HTML 页面，不能再从已本地化的 `site/navtreedata.js` 反推范围，避免 406 漂移成 430。
