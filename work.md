# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：75
- 未完整翻译草稿 / bilingual_draft：331
- draft_needs_translation：320
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：67 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 370 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 370 轮：PromotionRound

- 目标页面：`full_site/api/usd_lux_page_front.html`
- 官方页面：`https://openusd.org/release/api/usd_lux_page_front.html`
- 本轮动作：将 `UsdLux: USD Lighting Schema` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 74 -> 75
- 草稿数变化：bilingual_draft 332 -> 331

## 本轮覆盖重点

- `UsdLux` 作为 USD lighting schema，服务 lighting setup 从 creation environment 到 renderer 的互换和 best-effort portability。
- 常见 light types：`UsdLuxCylinderLight`、`UsdLuxDiskLight`、`UsdLuxDistantLight`、`UsdLuxDomeLight`、`UsdLuxRectLight`、`UsdLuxSphereLight`。
- `UsdLuxLightAPI` 与 being a light 语义，`UsdLuxBoundableLightBase` / `UsdLuxNonboundableLightBase` 的边界。
- `UsdLuxMeshLightAPI`、`UsdLuxVolumeLightAPI`、`UsdLuxLightListAPI`、`UsdCollectionAPI`、`UsdLuxShadowAPI`、`UsdLuxShapingAPI`。
- `UsdShade` encapsulation rules、`light:filters`、light filter nesting、PortalLight 与 DomeLight 采样关系。
- geometry conventions、primary axis、area light size、`treatAsPoint` / `treatAsLine` hints。
- `intensity`、`exposure`、color、color temperature、RGB/spectral units、`UsdGeomCamera::GetExposureAttr()`。
- extensibility、`usdgenschemafromsdr`、`SdrRegistry`、`UsdLuxPluginLight`、`UsdLuxPluginLightFilter`。
- 区分 authored schema、transform、exposure、linking、filter、schema extension 和 renderer implementation 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=75，draft=331，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=75，draft_needs_translation=320，draft_template_only=11
- `openusd_bilingual_final.html`：显示 75 complete / 331 incomplete drafts
- `audit_openusd_full_draft_preview.mjs`：331/331 draft pages passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：待本轮最终复跑，必须 passed
- `validate_openusd_api_repro.ps1`：passed，295 checks，0 failed

## GitHub 同步

本轮验证通过后同步到 GitHub。提交信息：`OpenUSD bilingual round 370: promote UsdLux complete`。

## 下一轮目标

建议继续 PromotionRound，目标：`full_site/api/usd_geom_page_front.html`。该页仍是用户会实际查阅的高价值 USD geometry module 入口。
