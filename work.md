# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：48
- 未完整翻译草稿 / bilingual_draft：358
- draft_needs_translation：347
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：40 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 343 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 343 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_lux_disk_light.html`
- 官方页面：`https://openusd.org/release/api/class_usd_lux_disk_light.html`
- 本轮动作：将 `UsdLuxDiskLight` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 47 -> 48
- 草稿数变化：bilingual_draft 359 -> 358

## 本轮覆盖重点

- `UsdLuxDiskLight` 作为 UsdLux 圆盘面积光的 concrete typed schema。
- circular disk 位于局部 XY plane，并沿 -Z axis 单面发光的官方语义。
- `radius` 作为 authored geometry attribute 的边界，不等同于 `intensity`、`exposure` 或影响范围。
- `Define()` / `Get()` 的 typed-schema 入口差异。
- `CreateRadiusAttr()` / `GetRadiusAttr()` 的 authoring 与读取职责。
- 继承的 `UsdLuxBoundableLightBase`、`UsdLuxLightAPI` 与 `UsdLuxShapingAPI` 的分层关系。
- extent / bounds / transform / renderer sampling 调试路径。
- 常见误读：把圆盘光当成双面光、mesh light、运行时 renderer object 或普通衰减半径控制。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=48，draft=358，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=48，draft_needs_translation=347，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 48 complete / 358 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：358/358 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 358 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 347 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_usd_lux_shaping_a_p_i.html`。
