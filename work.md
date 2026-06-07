# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：53
- 未完整翻译草稿 / bilingual_draft：353
- draft_needs_translation：342
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：45 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 348 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 348 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_imaging_adapter_registry.html`
- 官方页面：`https://openusd.org/release/api/class_usd_imaging_adapter_registry.html`
- 本轮动作：将 `UsdImagingAdapterRegistry` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 52 -> 53
- 草稿数变化：bilingual_draft 354 -> 353

## 本轮覆盖重点

- `UsdImagingAdapterRegistry` 作为 USD Imaging adapter factory registry。
- factory registration、adapter instances、per-stage data、`UsdImagingDelegate` synchronization、Hydra consumption 与 USD stage composition 的边界。
- `GetInstance()` 与 `TfSingleton` 管理的 singleton 生命周期。
- `ConstructAdapter()` 的 prim adapter 构造路径。
- `ConstructAPISchemaAdapter()` 和 `ConstructKeylessAPISchemaAdapters()` 的 API schema adapter 构造路径。
- `ApiSchemaAdapters` 集合与 prim adapter / API schema adapter 的区别。
- `GetAdapterKeys()` / `GetAPISchemaAdapterKeys()`、`HasAdapter()` / `HasAPISchemaAdapter()` 的 registry 查询语义。
- `AreExternalPluginsEnabled()`、plugin metadata、adapter key、factory availability 和 delegate 使用之间的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=53，draft=353，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=53，draft_needs_translation=342，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 53 complete / 353 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：353/353 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 353 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 342 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`。
