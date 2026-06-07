# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：63
- 未完整翻译草稿 / bilingual_draft：343
- draft_needs_translation：332
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：55 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 358 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 358 轮：PromotionRound

- 目标页面：`full_site/api/ar_page_front.html`
- 官方页面：`https://openusd.org/release/api/ar_page_front.html`
- 本轮动作：将 `Ar: Asset Resolution` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 62 -> 63
- 草稿数变化：bilingual_draft 344 -> 343

## 本轮覆盖重点

- Ar 作为 OpenUSD Asset Resolution 库，负责 querying、reading、writing asset data。
- authored asset identifier 与 physical storage 的解耦。
- filesystem-based resolver 与 custom resolver implementations。
- `ArResolver`、`ArGetResolver()`、`AR_DEFINE_RESOLVER` 和 `PlugRegistry` 的角色。
- Primary Resolver 与 URI/IRI Resolver 的职责边界。
- asset path、authored asset path、resolved path 的区别。
- resolver context、`ArResolverContextBinder` 与 `UsdStage` / layer loading 的关系。
- `ArResolverScopedCache`、`ArThreadLocalScopedCache` 的作用域和缓存调试边界。
- `ArAsset` 与 `ArResolver` 的职责区分。
- package-relative paths、`SdfLayer` 读取和 composition behavior 的分层排查路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=63，draft=343，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=63，draft_needs_translation=332，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 63 complete / 343 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：343/343 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 343 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 332 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/arch_page_front.html`。
