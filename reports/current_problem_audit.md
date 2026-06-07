# OpenUSD 当前问题审计

生成日期：2026-06-07

本审计用于约束自动化不要回到“可打开草稿 + 反复提交”的旧节奏。第 339 轮继续采用 PromotionRound，只晋级 `full_site/api/class_sdf_prim_spec.html`，把真实 `good_bilingual` 从 44 提升到 45。

## 当前计数

- 总页面：406
- `bilingual_complete`：45
- `bilingual_draft`：361
- `good_bilingual`：45
- `draft_needs_translation`：350
- `draft_template_only`：11

说明：361 个 `bilingual_draft` 仍是可检查草稿，不是完整翻译。

## P0 问题

1. 完成度停滞问题仍未根治。
   过去长期只有 8 页 `good_bilingual`。第 303 到 339 轮已用 promotion manifest 建立并连续执行真实晋级链路，当前 `good_bilingual` 已到 45；但仍有 361 页处于 draft，其中 350 页仍为 `draft_needs_translation`。

2. 总入口误导问题已纠偏但必须保持。
   `openusd_bilingual_final.html` 现在明确显示 45 complete 和 361 incomplete drafts，不能把 `pending=0` 解读成全部完成。

3. 自动化目标已纠偏但必须持续执行。
   当前只允许 PromotionRound / DefectRound / ConsistencyRound。没有 `good_bilingual` 增长或明确 P0/P1 修复时，不应提交和推送。

## P1 问题

1. 链接占位仍存在。
   406 页范围外的 Doxygen 目标仍会进入 `site/uncovered_openusd_page.html`，这是当前策略下的显式缺口，不是完成态体验。

2. 大多数 draft 内容仍较薄。
   350 页仍需 paragraph-level bilingual coverage，11 页仍是 template-only。后续每轮应只选择 1 个高价值页面完成晋级。

## P2 问题

1. `validation_report.json` 必须保持无 BOM。
   当前验证脚本输出可被 Node `JSON.parse` 直接读取，后续不能回退。

## 本轮证据

- 目标页：`full_site/api/class_sdf_prim_spec.html`
- 晋级记录：`round-339-sdf-prim-spec`
- 质量结果：目标页为 `good_bilingual`，正文中文字符数 1296
- 当前 manifest promoted pages：37
- 验证状态：`validate_openusd_api_repro.ps1` 通过，288 项检查失败 0 项

## 下一步

继续 PromotionRound，建议目标：`full_site/api/class_usd_geom_primvars_a_p_i.html`。如果该页无法达到 `good_bilingual`，必须停止并报告阻塞。