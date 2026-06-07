# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：51
- 未完整翻译草稿 / bilingual_draft：355
- draft_needs_translation：344
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：43 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 346 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 346 轮：PromotionRound

- 目标页面：`full_site/api/class_sdf_usdz_file_format.html`
- 官方页面：`https://openusd.org/release/api/class_sdf_usdz_file_format.html`
- 本轮动作：将 `SdfUsdzFileFormat` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 50 -> 51
- 草稿数变化：bilingual_draft 356 -> 355

## 本轮覆盖重点

- `SdfUsdzFileFormat` 作为 package `.usdz` files 的 `SdfFileFormat` 实现。
- 与 `SdfLayer`、`UsdStage`、stage-level composition 和渲染层的职责边界。
- `CanRead()` 的 format-readability 含义，不等同于资产完整性或 stage 可组合性。
- `Read()` 与 `_ReadDetached()` 的 layer-data loading 语义。
- `GetPackageRootLayerPath()` 的 package root layer discovery。
- `IsPackage()` 的 package semantics，而不是普通文件可写性判断。
- `ReadFromString()` 的 in-memory layer input 边界。
- `WriteToFile()` / `WriteToStream()` / `WriteToString()` 的输出语义和 package-aware 限制。
- `FileFormatArguments`、factory initialization、asset resolver、package-relative paths 和调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=51，draft=355，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=51，draft_needs_translation=344，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 51 complete / 355 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：355/355 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 355 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 344 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_hgi_g_l_graphics_cmds.html`。
