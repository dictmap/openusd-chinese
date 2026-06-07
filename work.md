# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：55
- 未完整翻译草稿 / bilingual_draft：351
- draft_needs_translation：340
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：47 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 350 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 350 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_imaging_nurbs_patch_adapter.html`
- 官方页面：`https://openusd.org/release/api/class_usd_imaging_nurbs_patch_adapter.html`
- 本轮动作：将 `UsdImagingNurbsPatchAdapter` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 54 -> 55
- 草稿数变化：bilingual_draft 352 -> 351

## 本轮覆盖重点

- `UsdImagingNurbsPatchAdapter` 作为 `UsdGeomNurbsPatch` 到 USD Imaging / Hydra 的成像适配层。
- 与 `UsdGeomNurbsPatch` authoring schema、`UsdImagingPrimAdapter`、`UsdImagingGprimAdapter` 和 renderer tessellation 的边界。
- `GetPoints()` 与 `GetTopology()` 的 NURBS patch 数据读取职责。
- `GetImagingSubprims()`、`GetImagingSubprimType()`、`GetImagingSubprimData()` 的 subprim data-source 读取路径。
- `Populate()`、`IsSupported()`、`TrackVariability()`、`ProcessPropertyChange()`、`InvalidateImagingSubprim()` 从初始同步到变更传播的生命周期。
- 区分 authored patch 数据、adapter data access、variability tracking、property-change dirtying、subprim locator invalidation、Hydra consumption 和 final display behavior 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=55，draft=351，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=55，draft_needs_translation=340，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 55 complete / 351 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：351/351 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 351 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 340 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_sdf_children_view.html`。
