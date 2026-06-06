# OpenUSD 当前问题盘点

生成日期：2026-06-07

这份盘点针对用户反馈：“3 天后仍只有 8 页完成、398 页还是草稿，问题很多但自动化还在继续跑轮次。”

## 当前真实状态

- 全量页面：406
- `bilingual_complete`：8
- `bilingual_draft`：398
- `good_bilingual`：8
- `draft_needs_translation`：387
- `draft_template_only`：11

结论：当前不是完成态。398 个 draft 只是可本地打开和检查，不是完整翻译。

## P0 问题

1. 完成数结构性停滞  
   `audit_openusd_translation_quality.mjs` 只有在 inventory 状态为 `bilingual_complete` 且中文密度达标时才会给 `good_bilingual`。过去大量 refinement 脚本只给 `bilingual_draft` 页面增加中文导读和术语对照，没有把页面晋级为 `bilingual_complete` 的机制，所以主指标天然不会上涨。

2. 总入口展示容易误导  
   总入口显示 8 complete、398 draft、0 pending。`pending=0` 容易让人以为“全都处理过了”，但真实含义是 398 页仍未完整翻译。入口必须明确：`bilingual_draft` 是未完整翻译草稿。

3. 自动化目标错误  
   旧自动化一直鼓励“最多 5 页补强、计数保持不变也预期、验证通过后同步”。这导致轮次很多，但完成度不变。自动化必须改成：没有完成数增长、完成标准修正、入口诚实化或关键浏览缺陷修复，就不要继续刷轮次。

## P1 问题

1. 链接占位页仍多  
   当前策略会把 406 清单外的官方 Doxygen 目标路由到 `site/uncovered_openusd_page.html`。这比外跳官方站更可控，但用户体验上仍然是“点了没有本地内容”。后续要优先处理高点击目录和 TOC 链接。

2. 大部分 draft 内容仍偏薄  
   过去补强主要是中文导读和术语对照，不是逐段翻译。要让页面真正晋级，需要按页面正文做密集双语覆盖，而不是继续只加摘要。

## P2 问题

1. `validation_report.json` 编码不干净  
   该文件曾带 UTF-8 BOM，标准 Node `JSON.parse` 会直接失败。验证脚本需要写无 BOM JSON，保证报告可被所有脚本读取。

## 下一步规则

- 不再把“可打开、可预览、验证通过、GitHub 已同步”描述为完整翻译完成。
- 后续自动化每轮必须先回答：本轮是否能让 `good_bilingual` 增加，或是否修复了用户明确指出的关键体验问题。
- 若不能增加完成数，必须说明阻塞原因，并优先修完成标准、入口展示或高点击缺页，而不是继续刷小批量补强。
- 进入下一批翻译前，必须先定义或实现 `draft_needs_translation -> bilingual_complete -> good_bilingual` 的晋级路径。
