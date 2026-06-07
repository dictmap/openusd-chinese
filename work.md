# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：77
- 未完整翻译草稿 / bilingual_draft：329
- draft_needs_translation：318
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：69 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 372 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 372 轮：PromotionRound

- 目标页面：`full_site/api/usd_shade_page_front.html`
- 官方页面：`https://openusd.org/release/api/usd_shade_page_front.html`
- 本轮动作：将 `UsdShade: USD Shading Schema` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 76 -> 77
- 草稿数变化：bilingual_draft 330 -> 329

## 本轮覆盖重点

- `UsdShade` 用于创建和绑定 materials，并用 materials 封装 shading networks。
- `UsdShadeNodeGraph` 可复用子网络、`UsdShadeMaterial` material container、`UsdShadeShader` primitive shading node。
- `UsdShadeConnectableAPI`、`UsdShadeInput`、`UsdShadeOutput` 和 `UsdAttribute` connections。
- consumer-side authored connections 与 dataflow：connection target 产生数据，anchor 消费数据。
- Encapsulation and Sharing：containers vs primitive shading nodes，container public parameters 和 terminal outputs。
- Shader / NodeGraph / Material / custom connectable schema 的 connectability rules。
- `UsdShadeConnectableAPIBehavior`、plug metadata、behavior resolution 顺序。
- valid shader connection 优先于 authored input values。
- nested Material / NodeGraph interface resolution、NodeGraph output forwarding 和 pass-through。
- `UsdShadeUtils::GetValueProducingAttributes` 等 connection resolution utilities。
- UsdShade-based shader definitions、`UsdShadeShaderDefParserPlugin`、`SdrRegistry`、shader identifier discovery。
- `UsdShadeMaterialBindingAPI` 将 material network 绑定到 geometry，与内部 shader-node connection 分层调试。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=77，draft=329，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=77，draft_needs_translation=318，draft_template_only=11
- `openusd_bilingual_final.html`：显示 77 complete / 329 incomplete drafts
- `audit_openusd_full_draft_preview.mjs`：329/329 draft pages passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：待本轮最终复跑，必须 passed
- `validate_openusd_api_repro.ps1`：passed，295 checks，0 failed

## GitHub 同步

本轮验证通过后同步到 GitHub。提交信息：`OpenUSD bilingual round 372: promote UsdShade complete`。

## 下一轮目标

建议继续 PromotionRound，目标：`full_site/api/sdf_page_front.html`。该页仍是用户会实际查阅的高价值 Sdf scene description foundation 入口。
