# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：52
- 未完整翻译草稿 / bilingual_draft：354
- draft_needs_translation：343
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：44 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 347 轮继续按单页 PromotionRound 推进，并且让 `good_bilingual` 真实增加。

## 第 347 轮：PromotionRound

- 目标页面：`full_site/api/class_hgi_g_l_graphics_cmds.html`
- 官方页面：`https://openusd.org/release/api/class_hgi_g_l_graphics_cmds.html`
- 本轮动作：将 `HgiGLGraphicsCmds` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 51 -> 52
- 草稿数变化：bilingual_draft 355 -> 354

## 本轮覆盖重点

- `HgiGLGraphicsCmds` 作为 `HgiGraphicsCmds` 的 OpenGL backend implementation。
- Hgi 抽象、Hydra task scheduling、USD authoring、scene indexing 与 OpenGL command state 的分层边界。
- `BindPipeline()` 图形管线状态绑定。
- `BindResources()` 与 `BindVertexBuffers()` 的 resource binding 与 vertex input 语义。
- `SetViewport()` 和 `SetScissor()` 在 framebuffer 坐标中的 rasterization region。
- `Draw()`、`DrawIndexed()`、`DrawIndirect()`、`DrawIndexedIndirect()` 的 draw submission 形态。
- `SetConstantValues()`、`InsertMemoryBarrier()`、debug groups / markers 和 `_Submit()` 的后端提交边界。
- `HgiCmds`、`HgiGLDevice`、`HgiGraphicsCmdsDesc`、`GfVec4f`、`GfVec4i` 等相邻类型关系。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=52，draft=354，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=52，draft_needs_translation=343，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 52 complete / 354 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：354/354 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 354 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 343 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_usd_imaging_adapter_registry.html`。
