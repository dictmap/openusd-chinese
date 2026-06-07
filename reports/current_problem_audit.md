# Current OpenUSD Problem Audit

Generated: 2026-06-07

本报告是当前自动化的真实问题清单。第 341 轮是 PromotionRound：`full_site/api/class_usd_geom_primvars_a_p_i.html` 已晋级，`good_bilingual` 从 45 增至 46。

## 当前计数

- 全量页面：406
- 完整双语 / good_bilingual：46
- 未完整翻译草稿 / bilingual_draft：360
- draft_needs_translation：349
- draft_template_only：11
- promotion manifest：38 页

## 问题清单

| ID | Severity | Summary |
| --- | --- | --- |
| P0-completion-stalled | P0 | 完成数曾长期停在 8；当前 promotion path 已提升到 46，但剩余 360 个 draft 仍需要真实晋级。 |
| P0-final-entry-misleading | P0 | 总入口必须继续明确区分 complete 与 incomplete drafts，不能把 draft 描述成完整翻译。 |
| P0-automation-wrong-objective | P0 | 自动化必须继续按 PromotionRound/DefectRound/ConsistencyRound 运行，禁止回到 5 页导读补强节奏。 |
| P1-markdown-record-encoding | P1 | Markdown 记录曾出现问号化损坏；当前已加入编码审计，后续失败时必须停止晋级。 |
| P1-link-placeholders | P1 | 406 页清单外的官方目标仍会进入 uncovered placeholder，这是用户可见的浏览缺口。 |
| P1-draft-content-thin | P1 | 多数 draft 仍只有导读和术语说明，不是逐段完整中文覆盖。 |
| P2-validation-json-bom | P2 | `validation_report.json` 必须保持 UTF-8 without BOM，并可被 Node `JSON.parse` 解析。 |

## 第 341 轮处理结果

- 轮次类型：PromotionRound
- 晋级页面：`full_site/api/class_usd_geom_primvars_a_p_i.html`
- promotion id：`round-341-usd-geom-primvars-api`
- 完成数变化：good_bilingual 45 -> 46
- 验证：`validate_openusd_api_repro.ps1` 通过，295 checks，0 failed
- Markdown 编码审计：通过，连续问号 0，BOM 0

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_usd_shade_output.html`。
