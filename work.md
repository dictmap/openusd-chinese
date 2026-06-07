# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：50
- 未完整翻译草稿 / bilingual_draft：356
- draft_needs_translation：345
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：42 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 345 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 345 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_proc_generative_procedural.html`
- 官方页面：`https://openusd.org/release/api/class_usd_proc_generative_procedural.html`
- 本轮动作：将 `UsdProcGenerativeProcedural` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 49 -> 50
- 草稿数变化：bilingual_draft 357 -> 356

## 本轮覆盖重点

- `UsdProcGenerativeProcedural` 作为 abstract typed schema 和 scene-description contract。
- generative procedural prim 的官方定义：交付 procedural definition 和 input parameters。
- `primvars:` namespace 下 properties 与 relationships 作为 procedural inputs。
- `proceduralSystem` authored value 与 API schema fallback 的语义。
- `Define()` / `Get()` 只创建或取得 typed-schema wrapper，不触发 procedural execution。
- `CreateProceduralSystemAttr()` / `GetProceduralSystemAttr()` 的 authoring 与读取职责。
- 与 `UsdPrim`、`SdfPath`、`UsdAttribute`、`UsdRelationship`、`SdfValueTypeName`、`UsdProcTokens` 的关系。
- path validity、schema type、authored inputs、composition、consumer support 和 runtime diagnostics 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=50，draft=356，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=50，draft_needs_translation=345，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 50 complete / 356 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：356/356 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 356 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 345 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_sdf_usdz_file_format.html`。
