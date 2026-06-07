# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：58
- 未完整翻译草稿 / bilingual_draft：348
- draft_needs_translation：337
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：50 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 353 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 353 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_schema_registry.html`
- 官方页面：`https://openusd.org/release/api/class_usd_schema_registry.html`
- 本轮动作：将 `UsdSchemaRegistry Class` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 57 -> 58
- 草稿数变化：bilingual_draft 349 -> 348

## 本轮覆盖重点

- `UsdSchemaRegistry` 作为 registered USD `IsA` schema 与 applied API schema 的 singleton registry。
- `schema.usda` 经 `usdGenSchema` 生成 `generatedSchema.usda` 后进入 registry 的数据来源。
- `SchemaInfo`、`VersionPolicy`、schema family/version 与 exact type name 的区别。
- `FindConcretePrimDefinition()`、`FindAbstractPrimDefinition()`、`FindAppliedAPIPrimDefinition()` 的不同查询语义。
- `BuildComposedPrimDefinition()` 如何组合 primary schema 与 applied API schemas。
- `GetAPISchemaTypeName()`、`GetAPISchemaCanOnlyApplyToTypeNames()`、`CollectAddtionalAutoApplyAPISchemasFromPlugins()` 的 API schema 应用规则。
- 与 `UsdPrimDefinition`、`UsdPrim`、`UsdAttribute`、`UsdSchemaBase`、`UsdTyped`、`UsdAPISchemaBase` 的边界。
- 区分 registry metadata、prim definition、authored opinions、stage composition 和 runtime consumer behavior 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=58，draft=348，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=58，draft_needs_translation=337，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 58 complete / 348 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：348/348 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 348 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 337 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_gf_dual_quatf.html`。
