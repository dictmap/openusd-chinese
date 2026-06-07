# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：46
- 未完整翻译草稿 / bilingual_draft：360
- draft_needs_translation：349
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：38 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 340 轮已修复 Markdown 问号化记录；第 341 轮恢复真实页面晋级。

## 第 341 轮：PromotionRound

- 目标页面：`full_site/api/class_usd_geom_primvars_a_p_i.html`
- 官方页面：`https://openusd.org/release/api/class_usd_geom_primvars_a_p_i.html`
- 本轮动作：将 `UsdGeomPrimvarsAPI` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 45 -> 46
- 草稿数变化：bilingual_draft 361 -> 360

## 本轮覆盖重点

- `UsdGeomPrimvarsAPI` 作为在 `UsdPrim` 上创建、查询和继承 `UsdGeomPrimvar` 的 API schema wrapper。
- `CreatePrimvar()`、`CreateIndexedPrimvar()`、`CreateNonIndexedPrimvar()` 的 authoring 差异。
- `GetPrimvars()`、`GetAuthoredPrimvars()`、`FindPrimvarsWithInheritance()`、`FindPrimvarWithInheritance()` 的 retrieval 场景。
- namespace inheritance、indexed/non-indexed primvars、`interpolation` tokens、`BlockPrimvar()` blocking opinion。
- `CanContainPropertyName()` 与 `primvars:` namespace 规则。
- 与 `UsdGeomPrimvar`、`SdfValueTypeName`、`TfToken`、`UsdGeomMesh`、topology schemas、shader inputs、Hydra 和 renderer consumers 的边界。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=46，draft=360，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=46，draft_needs_translation=349，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 46 complete / 360 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：360/360 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 360 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 349 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_usd_shade_output.html`。
