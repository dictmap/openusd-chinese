# Current OpenUSD Problem Audit

Generated: 2026-06-07

本报告是当前自动化的真实问题清单。第 340 轮是 ConsistencyRound：修复进度 Markdown 的问号化编码问题，不晋级页面，也不声称完成数增长。

## 当前计数

- 全量页面：406
- 完整双语 / good_bilingual：45
- 未完整翻译草稿 / bilingual_draft：361
- draft_needs_translation：350
- draft_template_only：11
- promotion manifest：37 页

## 问题清单

| ID | Severity | Summary |
| --- | --- | --- |
| P0-completion-stalled | P0 | The main completion number was structurally stalled at 8; the promotion path now raises it to 45, but the remaining 361 draft pages still need real upgrades. |
| P0-final-entry-misleading | P0 | The final entry previously misled users by showing pending=0 while most pages were incomplete drafts. |
| P0-automation-wrong-objective | P0 | The old heartbeat automation optimized for repeated 5-page refinement and GitHub sync rather than real completion progress. |
| P1-markdown-record-encoding | P1 | Human-facing progress Markdown had been damaged by Windows encoding handoffs and contained many repeated question marks. |
| P1-link-placeholders | P1 | Many clicks still route to the local uncovered placeholder because the 406-page inventory does not contain every official Doxygen target. |
| P1-draft-content-thin | P1 | Most draft pages contain Chinese guidance and term notes, not paragraph-level bilingual translation. |
| P2-validation-json-bom | P2 | validation_report.json previously used UTF-8 BOM, which broke standard Node JSON.parse. |

## 第 340 轮处理结果

- 轮次类型：ConsistencyRound
- 修复对象：`work.md`、`reports/iteration_report.md`、`reports/current_problem_audit.md`
- 新增防线：`scripts/audit_openusd_markdown_encoding.mjs`、`reports/markdown_encoding_audit.json`
- 完成数变化：good_bilingual 保持 45，没有进行页面晋级
- 下一轮目标：`full_site/api/class_usd_geom_primvars_a_p_i.html`
