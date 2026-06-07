# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：76
- 未完整翻译草稿 / bilingual_draft：330
- draft_needs_translation：319
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：68 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 371 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 371 轮：PromotionRound

- 目标页面：`full_site/api/usd_geom_page_front.html`
- 官方页面：`https://openusd.org/release/api/usd_geom_page_front.html`
- 本轮动作：将 `UsdGeom: USD Geometry Schema` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 75 -> 76
- 草稿数变化：bilingual_draft 331 -> 330

## 本轮覆盖重点

- `UsdGeom` 作为 3D graphics-related prim / property schemas 总入口，用于 DCC geometry interchange。
- `UsdGeomImageable`、visibility、purpose、primvars 公共属性。
- `UsdGeomXformable`、ordered xform ops、`UsdGeomXform`、composed scene description override 语义。
- `UsdGeomGprim` 与 `UsdGeomMesh`、curves、points、intrinsic shapes 等 primitive 家族。
- `UsdGeomPointInstancer`、`UsdGeomCamera`、`UsdGeomModelAPI`。
- `UsdGeomPrimvar`、`UsdGeomPrimvarsAPI`、primvar interpolation、inheritance 与 shader consumption。
- Imageable Purpose、`default` / `render` / `proxy` / `guide`、遍历包含语义。
- row-major matrix、row vectors、degrees、right-hand rule、coordinate system、winding order、orientation 和 normals。
- timesampled velocities / accelerations、`UsdGeomMotionAPI`、`motion:blurScale` 和 motion blur sampling。
- stage-wide up axis 与 linear units 等 Stage Metrics。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=76，draft=330，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=76，draft_needs_translation=319，draft_template_only=11
- `openusd_bilingual_final.html`：显示 76 complete / 330 incomplete drafts
- `audit_openusd_full_draft_preview.mjs`：330/330 draft pages passed
- `audit_openusd_report_index.mjs`：passed
- `audit_openusd_markdown_encoding.mjs`：待本轮最终复跑，必须 passed
- `validate_openusd_api_repro.ps1`：passed，295 checks，0 failed

## GitHub 同步

本轮验证通过后同步到 GitHub。提交信息：`OpenUSD bilingual round 371: promote UsdGeom complete`。

## 下一轮目标

建议继续 PromotionRound，目标：`full_site/api/usd_shade_page_front.html`。该页仍是用户会实际查阅的高价值 USD shading schema/module 入口。
