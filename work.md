# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：45
- 未完整翻译草稿 / bilingual_draft：361
- draft_needs_translation：350
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：37 页
- 总验证：passed=true，failed_check_count=0

说明：旧的追加式中文记录曾出现大量连续问号，这些内容已经无法可靠恢复。本文件已在第 340 轮从 JSON 真值源重新生成，历史细节以 Git 历史和 `reports/bilingual_completion_promotions.json` 为准。

## 第 340 轮：ConsistencyRound

本轮不做页面晋级，目标是修复用户指出的人类可读记录损坏问题，并把该问题纳入固定审计链。

- 修复：重新生成 `work.md`、`reports/iteration_report.md`、`reports/current_problem_audit.md`
- 新增脚本：`scripts/regenerate_openusd_progress_markdown.mjs`
- 新增审计：`scripts/audit_openusd_markdown_encoding.mjs`
- 新增报告：`reports/markdown_encoding_audit.json`、`reports/markdown_encoding_audit.md`
- 完成数变化：good_bilingual 45 -> 45
- 命名缺陷：P1-markdown-record-encoding

## 最近晋级记录

| Promotion ID | Page | Local Output |
| --- | --- | --- |
| `round-339-sdf-prim-spec` | `class_sdf_prim_spec` | `full_site/api/class_sdf_prim_spec.html` |
| `round-338-gf-matrix2f` | `class_gf_matrix2f` | `full_site/api/class_gf_matrix2f.html` |
| `round-337-gf-matrix4f` | `class_gf_matrix4f` | `full_site/api/class_gf_matrix4f.html` |
| `round-336-gf-vec2i` | `class_gf_vec2i` | `full_site/api/class_gf_vec2i.html` |
| `round-335-glf-draw-target` | `class_glf_draw_target` | `full_site/api/class_glf_draw_target.html` |
| `round-334-hdx-pick-from-render-buffer-task` | `class_hdx_pick_from_render_buffer_task` | `full_site/api/class_hdx_pick_from_render_buffer_task.html` |
| `round-303-sdf-layer` | `class_sdf_layer` | `full_site/api/class_sdf_layer.html` |
| `round-304-usd-prim` | `class_usd_prim` | `full_site/api/class_usd_prim.html` |
| `round-305-sdf-path` | `class_sdf_path` | `full_site/api/class_sdf_path.html` |
| `round-306-usd-geom-mesh` | `class_usd_geom_mesh` | `full_site/api/class_usd_geom_mesh.html` |
| `round-307-tf-token` | `class_tf_token` | `full_site/api/class_tf_token.html` |
| `round-308-usd-stage-cache` | `class_usd_stage_cache` | `full_site/api/class_usd_stage_cache.html` |

## 质量计数

- good_bilingual：45
- partial_bilingual：
- draft_needs_translation：350
- draft_template_only：11

## 下一步

恢复 PromotionRound，但每轮仍只能晋级 1 个页面。建议下一页：`full_site/api/class_usd_geom_primvars_a_p_i.html`。如果它不能达到 `good_bilingual`，自动化必须停止并报告阻塞。
