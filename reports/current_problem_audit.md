# Current OpenUSD Problem Audit

Generated: 2026-06-09T08:39:23.786Z

本报告是当前自动化的真实问题清单。它区分“可检查草稿”和“完整双语”，并额外记录 `review_ready_zh`，防止完成页仍主要依赖英文。

## 当前计数

- 全量页面：406
- bilingual_complete：248
- good_bilingual：248
- review_ready_zh：185
- bilingual_draft：158
- draft_needs_translation：148
- draft_template_only：10
- promotion manifest：240
- api_complete：122
- api_review_ready_zh：62
- release_complete：126
- release_review_ready_zh：123

## 最近晋级记录

- round：491
- round_type：DefectRound
- target：`full_site/release/intro_to_openexec.html`
- commit SHA：`85f2d897e9bd74b5ceab69cae308ed963bdeb1ce`
- source parity：`reports/round_491_intro_openexec_visible_click_order_source_parity.json`

## 问题清单

| ID | Severity | Summary | Required Action |
| --- | --- | --- | --- |
| `P1-release-intro-openexec-visible-click-order` | P1 | 用户打开 full_site/release/intro_to_openexec.html 时先看到重复本地导航和缺陷修复说明，而不是官方 Background 起始正文，浏览体验与官方点击顺序不一致。 | 本轮完成后运行 source parity、click-path、reading-flow、local link、markdown、validation 全链；good_bilingual/release_complete/api_complete 不得新增。 |
| `P1-release-intro-openexec-visible-click-order` | P1 | 该页曾同时包含手写 reading-flow 导航和全站注入导航，导致左侧导航、正文入口和样式行为不稳定。 | 后续若修改 reading-flow，应避免页面内手写 openusd-reading-flow-nav 结构，统一由注入脚本维护。 |
| `P0-api-draft-backlog` | P0 | 当前 good_bilingual=248/406，API complete=122，仍有 158 个可检查草稿，不是完整翻译。 | 本 P1 可见缺陷闭环后，再按 heartbeat 默认候选恢复 PromotionRound。 |
| `P1-markdown-record-encoding` | P1 | Markdown 编码守卫继续作为硬门槛。 | 若 audit_openusd_markdown_encoding.mjs 失败，先做 ConsistencyRound。 |

## 下一步

下一轮建议目标：`full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html`。开始前继续核对 git、报告、validation、Markdown 编码和 reading-flow；如果该页源页或验证阻塞，停止并报告具体原因。
