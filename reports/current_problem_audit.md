# Current OpenUSD Problem Audit

Generated: 2026-06-08T20:45:54.794Z

当前状态：good_bilingual=230/406，review_ready_zh=167，api_complete=104，release_complete=126，bilingual_draft=176，draft_needs_translation=166，draft_template_only=10，pending_full_scope=0。


## 最近修复

- round：452
- round_type：DefectRound
- defect id：`P1-release-intro-openexec-source-parity`
- target：`full_site/release/intro_to_openexec.html`
- source parity：`reports/round_452_intro_openexec_source_parity.json`
- click-path report：`reports/round_452_intro_openexec_click_path.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P1-release-intro-openexec-source-parity` | P1 | full_site/release/intro_to_openexec.html 曾被标为完成页，但未按官方 Introduction to OpenExec 正文和代码示例做 section-level source parity。 | 本轮完成后运行 source parity、click-path、reading-flow、local link、markdown、validation 全链；good_bilingual/release_complete/api_complete 不得新增。 |
| `P1-click-order-reading-flow-consistency` | P1 | 用户反馈页面按点击顺序一会好一会坏，说明仅靠 good_bilingual/navigation 计数不足。 | 下一轮优先执行 ClickPathAuditRound 或 DefectRound，抽查并修复真实点击路径中的 nav/related/prev-next 混乱；click-path 审计绿了再恢复 PromotionRound。 |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=230/406，API complete=104，仍有 176 个可检查草稿，不是完整翻译。 | 在 P1 click-path 缺陷闭环前，不要恢复新 API 页 PromotionRound。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮优先执行 `ClickPathAuditRound` 或 `DefectRound`，缺陷 id=`P1-click-order-reading-flow-consistency`。在 click-path 审计通过前，不恢复新 API 页 PromotionRound。
