# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：61
- 未完整翻译草稿 / bilingual_draft：345
- draft_needs_translation：334
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：53 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 356 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 356 轮：PromotionRound

- 目标页面：`full_site/api/class_gf_ray.html`
- 官方页面：`https://openusd.org/release/api/class_gf_ray.html`
- 本轮动作：将 `GfRay Class Reference Basic Geometry` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 60 -> 61
- 草稿数变化：bilingual_draft 346 -> 345

## 本轮覆盖重点

- `GfRay` 作为 Gf Basic Geometry 中用于 intersection testing 的三维 ray 值类型。
- origin/start point 与 direction vector 的存储语义。
- 默认不把 direction vector 归一化为 unit length，以及这对 distance 参数解释的影响。
- ray intersection 包含 start point，distance 0 也视为 intersecting。
- `GfRay()`、`SetPointAndDirection()`、`SetEnds()`、`GetStartPoint()`、`GetDirection()`、`GetPoint()` 的使用边界。
- 多组 `Intersect()` overload 与 `GfPlane`、`GfRange3d`、`GfBBox3d` 等目标几何的关系。
- `FindClosestPoint()` 和 `GfFindClosestPoints` 是最近点查询，不等同于相交判断。
- `Transform()` 与 `GfMatrix4d` 配合时 point 与 vector 的变换差异。
- `GfVec3d`、`GfLine`、`GfLineSeg` 等相关类型边界，以及 coordinate space、unit direction、ray vs line segment、distance clipping、non-uniform transform 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=61，draft=345，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=61，draft_needs_translation=334，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 61 complete / 345 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：345/345 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 345 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 334 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/class_tf_dense_hash_map.html`。
