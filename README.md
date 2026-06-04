# OpenUSD API 中英双语复刻

目标：对照官方 OpenUSD release 文档入口 `https://openusd.org/release/index.html` 和 API 首页 `https://openusd.org/release/api/index.html`，在本地生成中英双语版本，并保留 Sphinx/Doxygen 页面骨架、图标、样式和生成信息；站内 OpenUSD HTML 链接优先路由到本地复刻页，只有明确标注“官方原页”的链接保留外跳。

当前范围已改为所有可发现页面：从官方 release toctree 与 API Doxygen navtree/menu 发现 406 个 HTML 页面，其中 126 个 release 页面、280 个 API 页面；当前 8 个官方页面已完成双语本地 HTML，121 个 release 页面和 277 个 API 页面已生成可检查的 `bilingual_draft` HTML，`pending_full_scope` 队列已归零。398 个 `bilingual_draft` 是中文导读与英文摘录保留的草稿覆盖页，不是逐段完整翻译版，后续应进入分批精修阶段。

当前产物：

- `openusd_bilingual_final.html`：最终 HTML 总入口，显示 406 页全量清单、complete/draft/pending 状态、官方原页链接和当前可检查的本地 HTML。
- `site/release_index.html`：OpenUSD release 文档首页的中英双语入口页。
- `site/intro.html`：release 首页第一相邻入口页的中英双语覆盖页。
- `site/apiDocs.html`：release 文档到 Doxygen API 文档的中英双语桥接页。
- `site/glossary.html`：release 术语与概念页的中英术语对照入口，包含 92 条定义级中文解释。
- `site/toolset.html`：release 命令行工具集入口页的中英双语速览、高频选项导读和 6 个长选项说明导读。
- `site/index.html`：OpenUSD API 首页的中英双语复刻页，包含范围说明、3 个 API 入口速览卡片和 3 条 API 阅读路线。
- `site/_usd__overview_and_purpose.html`：API 首页相邻概念入口页的中英双语复刻页。
- `site/usd_page_front.html`：Usd core API front page 的中英双语复刻页。
- `site/api/index.html`：保持 `release_index.html` 中 `api/index.html` 相对链接可用的本地跳转页。
- `site/uncovered_openusd_page.html`：当前 406 页清单外的 OpenUSD 内部 HTML 链接缺口提示页，避免静默跳到官方英文站。
- `site/openusd_cn.css`：本地双语排版补丁。
- `site/openusd_release_cn.css`：release 文档首页的本地双语排版补丁。
- `source/openusd_api_index_source.html`：官方 API 首页源页面快照。
- `source/openusd_release_index_source.html`：官方 release 文档首页源页面快照。
- `source/openusd_release_intro_source.html`：官方 Introduction to USD 源页面快照。
- `source/openusd_release_apiDocs_source.html`：官方 API Documentation 桥接页源页面快照。
- `source/openusd_release_glossary_source.html`：官方 USD Terms and Concepts 源页面快照。
- `source/openusd_release_toolset_source.html`：官方 USD Toolset 源页面快照。
- `source/openusd_api_overview_and_purpose_source.html`：官方 API Overview and Purpose 源页面快照。
- `source/openusd_api_usd_page_front_source.html`：官方 Usd core API front page 源页面快照。
- `source/full_release/`：全量 release 批次 draft 页面对应的官方源快照。
- `source/full_api/`：全量 API 批次 draft 页面对应的官方源快照。
- `full_site/release/`：全量 release 队列中已生成的可检查 bilingual draft HTML。
- `full_site/api/`：全量 API 队列中已生成的可检查 bilingual draft HTML。
- `site/`：首页用到的 Doxygen 样式、脚本、Logo、导航图标和搜索图标。
- `site/_static/`：release 文档首页用到的 Sphinx 样式、脚本和字体。
- `site/images/`：release 文档首页用到的本地 Logo 与 banner 图。
- `site/_images/`：glossary 页实际引用的本地图片。
- `scripts/build_release_index_bilingual.mjs`：从 release 源快照生成双语入口页。
- `scripts/build_intro_bilingual.mjs`：从 Introduction to USD 源快照生成相邻入口双语页。
- `scripts/build_apiDocs_bilingual.mjs`：从 API Documentation 源快照生成桥接入口双语页。
- `scripts/build_glossary_bilingual.mjs`：从 USD Terms and Concepts 源快照生成术语对照入口页。
- `scripts/build_toolset_bilingual.mjs`：从 USD Toolset 源快照生成命令行工具入口双语页。
- `scripts/build_api_overview_bilingual.mjs`：从 API Overview and Purpose 源快照生成相邻概念入口双语页。
- `scripts/build_usd_page_front_bilingual.mjs`：从 Usd core API front page 源快照生成 API 手册入口双语页。
- `scripts/build_local_preview_index.mjs`：生成当前有界范围的本地预览链接索引。
- `scripts/build_final_html_entry.mjs`：从本地预览索引和验证报告生成最终 HTML 总入口。
- `scripts/discover_openusd_all_pages.mjs`：发现所有 release/API HTML 页面并生成全量覆盖清单。
- `scripts/build_release_full_batch.mjs`：按全量 pending 队列批量生成 release bilingual draft HTML、源快照和批次报告。
- `scripts/build_api_full_batch.mjs`：按全量 pending 队列批量生成 API bilingual draft HTML、源快照和批次报告。
- `scripts/route_openusd_internal_links_local.mjs`：后处理所有本地 HTML，把 406 清单内的 OpenUSD 内部 HTML 链接改成本地相对路径；清单外内部链接进入 `site/uncovered_openusd_page.html`。
- `scripts/audit_openusd_chinese_first_order_contract.mjs`：检查所有本地页面的中文标签/解释是否位于保留英文原文之前。
- `scripts/audit_openusd_entry_label_contract.mjs`：检查 release/API 关键入口链接的 href、中文标签和英文原名是否同时保留。
- `scripts/audit_openusd_entry_structure_parity.mjs`：检查 release/API 入口页的 Sphinx/Doxygen 外壳、导航分组、API 入口链接和相邻页外壳是否保真。
- `scripts/audit_openusd_full_draft_preview.mjs`：用项目根目录临时 HTTP 服务检查所有 `bilingual_draft` 页面、最终 HTML 入口链接和本地资源响应。
- `scripts/audit_openusd_repro_links.mjs`：检查本地资源链接和范围外文档链接分类。
- `scripts/audit_openusd_primary_entry_coverage.mjs`：检查两个主入口页和本地 API 跳转页的结构、链接、图片与双语覆盖。
- `scripts/audit_openusd_official_entry_freshness.mjs`：只拉取两个官方入口 URL，检查 live 标题、入口标记、源快照和本地输出是否仍对齐。
- `scripts/audit_openusd_page_metadata_contract.mjs`：检查 9 个本地 HTML 的 `zh-CN` 语言声明、双语标题、范围说明和名称保留策略。
- `scripts/audit_openusd_report_index.mjs`：汇总固定审计链脚本、JSON/Markdown 报告、通过状态和总验证计数。
- `scripts/audit_openusd_responsive_layout_contract.mjs`：检查 9 个本地页面的 viewport、本地双语 CSS、移动端网格降级和长文本换行契约。
- `scripts/audit_openusd_scope_boundaries.mjs`：检查本地 HTML、源快照和报告是否仍限定在当前范围内。
- `scripts/audit_openusd_navigation_coverage.mjs`：检查 release/API 主入口导航、相邻入口链接和本地 API 跳转。
- `scripts/audit_openusd_source_provenance.mjs`：检查 scope manifest 中每个页面的官方 URL、源快照、输出页和生成脚本是否可追溯。
- `scripts/audit_openusd_http_preview.mjs`：用本地临时 HTTP 服务检查 9 个页面和本地资源响应。
- `scripts/validate_openusd_api_repro.ps1`：本地结构与内容验证脚本。
- `reports/validation_report.json`：验证结果。
- `reports/link_audit.json` / `reports/link_audit.md`：链接审计结果。
- `reports/local_link_routing_report.json` / `reports/local_link_routing_report.md`：站内链接本地路由报告。
- `reports/chinese_first_order_contract_audit.json` / `reports/chinese_first_order_contract_audit.md`：中文优先顺序契约审计结果。
- `reports/entry_label_contract_audit.json` / `reports/entry_label_contract_audit.md`：入口链接双语标签契约审计结果。
- `reports/entry_structure_parity_audit.json` / `reports/entry_structure_parity_audit.md`：入口结构保真审计结果。
- `reports/full_draft_preview_audit.json` / `reports/full_draft_preview_audit.md`：全量 draft 页面 HTTP 预览和最终 HTML 入口链接审计结果。
- `reports/audit_index.json` / `reports/audit_index.md`：固定审计链报告索引。
- `reports/primary_entry_coverage.json` / `reports/primary_entry_coverage.md`：主入口覆盖审计结果。
- `reports/official_entry_freshness_audit.json` / `reports/official_entry_freshness_audit.md`：官方入口实时新鲜度审计结果。
- `reports/page_metadata_contract_audit.json` / `reports/page_metadata_contract_audit.md`：页面元数据与中文主导契约审计结果。
- `reports/responsive_layout_contract_audit.json` / `reports/responsive_layout_contract_audit.md`：响应式布局契约审计结果。
- `reports/navigation_coverage_audit.json` / `reports/navigation_coverage_audit.md`：导航覆盖审计结果。
- `reports/source_provenance_audit.json` / `reports/source_provenance_audit.md`：源快照溯源审计结果。
- `reports/style_asset_contract_audit.json` / `reports/style_asset_contract_audit.md`：样式与资产契约审计结果。
- `reports/term_consistency_audit.json` / `reports/term_consistency_audit.md`：术语一致性审计结果。
- `reports/scope_boundary_audit.json` / `reports/scope_boundary_audit.md`：范围边界审计结果。
- `reports/http_preview_audit.json` / `reports/http_preview_audit.md`：HTTP 预览审计结果。
- `reports/api_route_guide_browser_audit.json` / `reports/api_route_guide_browser_audit.md` / `reports/api_route_guide_browser_view.png`：API route guide 浏览器抽查结果和截图。
- `reports/api_route_guide_browser_wide_audit.json` / `reports/api_route_guide_browser_wide_audit.md` / `reports/api_route_guide_browser_wide_view.png`：API route guide 宽屏浏览器抽查结果和截图。
- `reports/local_preview_index.json` / `reports/local_preview_index.md`：当前 9 个本地页面的预览链接索引。
- `reports/all_pages_inventory.json` / `reports/all_pages_inventory.md`：所有 release/API HTML 页面的发现清单、完成状态和待处理队列。
- `reports/release_full_batch_report.json` / `reports/release_full_batch_report.md`：最新 release 全量队列批次 draft 输出报告。
- `reports/api_full_batch_report.json` / `reports/api_full_batch_report.md`：最新 API 全量队列批次 draft 输出报告。
- `reports/scope_manifest.json` / `reports/scope_manifest.md`：当前范围与相邻入口优先级。
- `reports/iteration_report.md`：迭代记录。

本地打开：

最终产出 HTML：

- `http://127.0.0.1:8068/openusd_bilingual_final.html`
- `openusd_bilingual_final.html`

如果 `8067` 端口的本地预览服务正在运行，可以直接从 `reports/local_preview_index.md` 选择页面，或先打开：

- `http://127.0.0.1:8067/release_index.html`
- `http://127.0.0.1:8067/index.html`

```powershell
Start-Process .\openusd_api_cn_repro\site\release_index.html
Start-Process .\openusd_api_cn_repro\site\apiDocs.html
Start-Process .\openusd_api_cn_repro\site\glossary.html
Start-Process .\openusd_api_cn_repro\site\toolset.html
Start-Process .\openusd_api_cn_repro\site\index.html
Start-Process .\openusd_api_cn_repro\site\_usd__overview_and_purpose.html
Start-Process .\openusd_api_cn_repro\site\usd_page_front.html
```

重新生成 release 双语入口页和相邻入口页：

```powershell
node .\openusd_api_cn_repro\scripts\build_release_index_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_intro_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_apiDocs_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_glossary_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_toolset_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_api_overview_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_usd_page_front_bilingual.mjs
node .\openusd_api_cn_repro\scripts\build_release_full_batch.mjs
node .\openusd_api_cn_repro\scripts\build_api_full_batch.mjs
node .\openusd_api_cn_repro\scripts\discover_openusd_all_pages.mjs
node .\openusd_api_cn_repro\scripts\build_local_preview_index.mjs
node .\openusd_api_cn_repro\scripts\build_final_html_entry.mjs
```

验证：

```powershell
node .\openusd_api_cn_repro\scripts\audit_openusd_chinese_first_order_contract.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_entry_label_contract.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_entry_structure_parity.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_full_draft_preview.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_primary_entry_coverage.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_official_entry_freshness.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_page_metadata_contract.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_responsive_layout_contract.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_term_consistency.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_navigation_coverage.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_source_provenance.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_style_asset_contract.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_scope_boundaries.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_repro_links.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_http_preview.mjs
node .\openusd_api_cn_repro\scripts\discover_openusd_all_pages.mjs
node .\openusd_api_cn_repro\scripts\build_local_preview_index.mjs
node .\openusd_api_cn_repro\scripts\build_final_html_entry.mjs
node .\openusd_api_cn_repro\scripts\audit_openusd_report_index.mjs
powershell -ExecutionPolicy Bypass -File .\openusd_api_cn_repro\scripts\validate_openusd_api_repro.ps1
```

## 2026-06-04 API draft batch updates

- 新增 `scripts/build_api_full_batch.mjs`，按 `reports/all_pages_inventory.json` 的 API `pending_full_scope` 队列生成批次 draft。
- 第 52 轮新增 5 个 API draft HTML：`_c_l_i11_8h_source.html`、`_developer__guides.html`、`_usd_skel__intro.html`、`annotated.html`、`ar_page_front.html`。
- 第 53 轮增强 Doxygen 摘要提取规则，刷新首批 5 个 API draft，并继续新增 5 个 API draft HTML：`class_gf_matrix2f.html`、`class_gf_matrix4f.html`、`class_gf_range1d.html`、`class_gf_ray.html`、`class_gf_vec2i.html`。
- 第 54 轮继续新增 5 个 API draft HTML：`class_glf_draw_target.html`、`class_hd_data_source_locator.html`、`class_hd_instance_registry.html`、`class_hd_render_buffer.html`、`class_hd_scene_delegate.html`。
- 第 55 轮继续新增 5 个 API draft HTML：`class_hd_st_dispatch_buffer.html`、`class_hd_st_render_pass_state.html`、`class_hd_task.html`、`class_hdx_pick_from_render_buffer_task.html`、`class_hgi_g_l_graphics_cmds.html`。
- 第 56 轮继续新增 5 个 API draft HTML：`class_pcp_arc.html`、`class_pcp_error_unresolved_prim_path.html`、`class_pcp_property_index.html`、`class_sdf_children_view.html`、`class_sdf_layer.html`。
- 第 57 轮继续新增 5 个 API draft HTML：`class_sdf_path.html`、`class_sdf_prim_spec.html`、`class_sdf_usdz_file_format.html`、`class_sdr_shader_property.html`、`class_tf_dense_hash_map.html`。
- 第 58 轮继续新增 5 个 API draft HTML：`class_tf_py_lock.html`、`class_tf_token.html`、`class_trace_event_data.html`、`class_usd_attribute_limits.html`、`class_usd_geom_basis_curves.html`。
- 第 59 轮继续新增 5 个 API draft HTML：`class_usd_geom_mesh.html`、`class_usd_geom_primvars_a_p_i.html`、`class_usd_imaging_adapter_registry.html`、`class_usd_imaging_delegate.html`、`class_usd_imaging_nurbs_patch_adapter.html`。
- 第 60 轮继续新增 5 个 API draft HTML：`class_usd_lux_disk_light.html`、`class_usd_lux_shaping_a_p_i.html`、`class_usd_physics_joint.html`、`class_usd_prim.html`、`class_usd_proc_generative_procedural.html`。
- 第 61 轮继续新增 5 个 API draft HTML：`class_usd_schema_registry.html`、`class_usd_shade_output.html`、`class_usd_skel_imaging_data_source_skeleton_prim.html`、`class_usd_stage_cache.html`、`class_usd_validation_error.html`。
- 第 62 轮继续新增 5 个 API draft HTML：`class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`、`class_vdf_context.html`、`class_vdf_grapher_options.html`、`class_vdf_node.html`、`class_vdf_read_write_accessor.html`。
- 第 63 轮增强 API 目录页摘录规则，并继续新增 5 个 API draft HTML：`class_vdf_test_utils_1_1_node.html`、`class_vt_value_ref.html`、`classes.html`、`classpxr___c_l_i_1_1_c_l_i_1_1_app.html`、`classpxr__tsl_1_1robin__map.html`。
- 第 64 轮继续新增 5 个 API draft HTML：`copy_utils_8h.html`、`deprecated.html`、`dir_aa3bf17f9d6f68169ce0fa9df97655e9.html`、`executor_invalidation_data_8h.html`、`files.html`，并补强 `dir_*.html` 目录页的文件列表摘录。
- 第 65 轮继续新增 5 个 API draft HTML：`functions_~.html`、`functions_a.html`、`functions_b.html`、`functions_c.html`、`functions_d.html`，覆盖 Class Members 索引页首批分段。
- 第 66 轮继续新增 5 个 API draft HTML：`functions_e.html`、`functions_enum.html`、`functions_eval.html`、`functions_f.html`、`functions_func_~.html`，继续覆盖 Class Members、Enumerations、Enumerator 和 Functions 分段索引。
- 第 67 轮继续新增 5 个 API draft HTML：`functions_func_a.html`、`functions_func_b.html`、`functions_func_c.html`、`functions_func_d.html`、`functions_func_e.html`，继续覆盖 Functions 成员索引分段。
- 第 68 轮继续新增 5 个 API draft HTML：`functions_func_f.html`、`functions_func_g.html`、`functions_func_h.html`、`functions_func_i.html`、`functions_func_j.html`，继续覆盖 Functions 成员索引分段。
- 第 69 轮继续新增 5 个 API draft HTML：`functions_func_k.html`、`functions_func_l.html`、`functions_func_m.html`、`functions_func_n.html`、`functions_func_o.html`，继续覆盖 Functions 成员索引分段。
- 第 70 轮继续新增 5 个 API draft HTML：`functions_func_p.html`、`functions_func_q.html`、`functions_func_r.html`、`functions_func_s.html`、`functions_func_t.html`，继续覆盖 Functions 成员索引分段。
- 第 71 轮继续新增 5 个 API draft HTML：`functions_func_u.html`、`functions_func_v.html`、`functions_func_w.html`、`functions_func_x.html`、`functions_func_y.html`，继续覆盖 Functions 成员索引分段。
- 第 72 轮新增 5 个 API draft HTML：`functions_func_z.html`、`functions_func.html`、`functions_g.html`、`functions_h.html`、`functions_i.html`，收尾 Functions 成员索引分段并转入 Class Members g-i 分段。
- 第 73 轮新增 5 个 API draft HTML：`functions_j.html`、`functions_k.html`、`functions_l.html`、`functions_m.html`、`functions_n.html`，继续覆盖 Class Members j-n 分段。
- 第 74 轮新增 5 个 API draft HTML：`functions_o.html`、`functions_p.html`、`functions_q.html`、`functions_r.html`、`functions_rela_g.html`，继续覆盖 Class Members o-r 分段并开始 Related Functions 分段。
- 第 75 轮新增 5 个 API draft HTML：`functions_rela_h.html`、`functions_rela_o.html`、`functions_rela_s.html`、`functions_rela_t.html`、`functions_rela.html`，覆盖 Related Functions 分段和汇总页。
- 第 76 轮新增 5 个 API draft HTML：`functions_s.html`、`functions_t.html`、`functions_type.html`、`functions_u.html`、`functions_v.html`，继续覆盖 Class Members s-v 分段并开始 type 索引页。
- 第 77 轮新增 5 个 API draft HTML：`functions_vars_a.html`、`functions_vars_b.html`、`functions_vars_c.html`、`functions_vars_d.html`、`functions_vars_e.html`，开始覆盖变量索引页。
- 第 78 轮新增 5 个 API draft HTML：`functions_vars_f.html`、`functions_vars_g.html`、`functions_vars_h.html`、`functions_vars_i.html`、`functions_vars_j.html`，继续覆盖变量索引页。
- 第 79 轮新增 5 个 API draft HTML：`functions_vars_k.html`、`functions_vars_l.html`、`functions_vars_m.html`、`functions_vars_n.html`、`functions_vars_o.html`，继续覆盖变量索引页。
- 第 80 轮新增 5 个 API draft HTML：`functions_vars_p.html`、`functions_vars_q.html`、`functions_vars_r.html`、`functions_vars_s.html`、`functions_vars_t.html`，继续覆盖变量索引页。
- 第 81 轮新增 5 个 API draft HTML：`functions_vars_u.html`、`functions_vars_v.html`、`functions_vars_w.html`、`functions_vars_x.html`、`functions_vars_y.html`，继续覆盖变量索引页。
- 第 82 轮新增 5 个 API draft HTML：`functions_vars_z.html`、`functions_vars.html`、`functions_w.html`、`functions_x.html`、`functions_y.html`，收尾 Variables 索引页并回到 Class Members w-y 分段。
- 第 83 轮新增 5 个 API draft HTML：`functions_z.html`、`functions.html`、`geom_model_a_p_i_adapter_8h_source.html`、`gf_page_front.html`、`glf_page_front.html`，收尾 Class Members z/汇总页并进入 Gf/Glf 与源代码页。
- 第 84 轮增强 `scripts/build_api_full_batch.mjs` 的 Doxygen contents 列表摘录规则，并新增 5 个 API draft HTML：`globals_c.html`、`globals_defs.html`、`globals_e.html`、`globals_enum.html`、`globals_eval.html`，覆盖 File Members、Macros、Enumerations 和 Enumerator 索引页。
- 第 85 轮新增 5 个 API draft HTML：`globals_func_c.html`、`globals_func_e.html`、`globals_func_g.html`、`globals_func_h.html`、`globals_func_j.html`，继续覆盖 File Members functions 索引页。
- 第 86 轮新增 5 个 API draft HTML：`globals_func_l.html`、`globals_func_o.html`、`globals_func_p.html`、`globals_func_s.html`、`globals_func_t.html`，继续覆盖 File Members functions 索引页。
- 第 87 轮新增 5 个 API draft HTML：`globals_func_u.html`、`globals_func_v.html`、`globals_func_w.html`、`globals_func.html`、`globals_g.html`，收尾 File Members functions 分段并转入 File Members g 索引页。
- 第 88 轮新增 5 个 API draft HTML：`globals_h.html`、`globals_j.html`、`globals_l.html`、`globals_o.html`、`globals_p.html`，继续覆盖 File Members h/j/l/o/p 索引页。
- 第 89 轮新增 5 个 API draft HTML：`globals_s.html`、`globals_t.html`、`globals_type.html`、`globals_u.html`、`globals_v.html`，继续覆盖 File Members s/t/type/u/v 索引页。
- 第 90 轮增强 `scripts/build_api_full_batch.mjs` 的 Doxygen `memberdecls` 摘录规则，并新增 5 个 API draft HTML：`globals_vars.html`、`globals_w.html`、`globals.html`、`group__group___exec___attribute___comptuations.html`、`group__group__hd__collection_predicates.html`，开始覆盖 API group 分组页。
- 第 91 轮新增 5 个 API draft HTML：`hd_embree_page_front.html`、`hd_page_front.html`、`hd_st_page_front.html`、`hd_storm_page_front.html`、`hdx_page_front.html`，覆盖 Hydra/HdStorm/Hdx module front pages。
- 第 92 轮增强 `scripts/build_api_full_batch.mjs` 的 hierarchy/source 摘录规则，并新增 5 个 API draft HTML：`hgi_2shader_program_8h_source.html`、`hierarchy.html`、`hio_page_front.html`、`inherits.html`、`journal_8h.html`，覆盖源码、层级、module 和文件页。
- 第 93 轮增强 `scripts/build_api_full_batch.mjs` 的 Markdown/README 摘录清理规则，并新增 5 个 API draft HTML：`js_page_front.html`、`kind_page_front.html`、`md_pxr_exec_ef__r_e_a_d_m_e.html`、`md_pxr_exec_esf__r_e_a_d_m_e.html`、`md_pxr_exec_esf_usd__r_e_a_d_m_e.html`，覆盖 Js、Kind 与 Exec README 页面。
- 第 94 轮新增 5 个 API draft HTML：`md_pxr_exec_exec__r_e_a_d_m_e.html`、`md_pxr_exec_exec_geom__r_e_a_d_m_e.html`、`md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd_docs_overview.html`，覆盖 Exec/ExecUsd README 与 OpenExec overview 页面。
- 第 95 轮增强 `scripts/build_api_full_batch.mjs` 的教程页重复摘录过滤规则，并新增 5 个 API draft HTML：`md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`、`md_pxr_exec_vdf__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq_black_box_testing.html`，覆盖 OpenExec 教程、Vdf README 和 usdviewq 测试说明页面。
- 第 96 轮增强 `scripts/build_api_full_batch.mjs` 的 namespace 成员页标题回退和长摘录重叠过滤规则，并新增 5 个 API draft HTML：`md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`、`modules.html`、`namespacemembers_func.html`、`namespacemembers_type.html`，覆盖 Boolean Expressions、Validation、Modules 和 Namespace Members 索引页面。
- 第 97 轮新增 5 个 API draft HTML：`namespacemembers.html`、`namespaces.html`、`page__execution__system__design.html`、`page_ts_regression.html`、`page_ts_status.html`，覆盖 Namespace Members、Namespace List、OpenExec System Design 和 Ts 文档页面。
- 第 98 轮增强 `scripts/build_api_full_batch.mjs` 的 source 页链接文本过滤，避免纯数字行号进入链接列表，并新增 5 个 API draft HTML：`page_ts_ts_test.html`、`pages.html`、`parallel_speculation_executor_engine_8h_source.html`、`pcp_page_front.html`、`plug_page_front.html`，覆盖 TsTest、Related Pages、source 和 Pcp/Plug 模块页面。
- 第 99 轮增强 `scripts/build_api_full_batch.mjs` 的零宽实体清理，避免 `&zwnj;` 残留进入链接列表，并新增 5 个 API draft HTML：`pxr_display_filter_adapter_8h_source.html`、`riley_param_schema_8h_source.html`、`sdf_page_front.html`、`sdr_glslfx_page_front.html`、`sdr_page_front.html`，覆盖 source、Sdf 和 Sdr/SdrGlslfx 模块页面。
- 第 100 轮增强 `scripts/build_api_full_batch.mjs` 的段尾 `More...` 摘录清理，避免 Doxygen brief 链接文本进入英文摘录，并新增 5 个 API draft HTML：`sparse_vectorized_input_traverser_8h.html`、`struct_hgi_sampler_desc.html`、`struct_usd_geom_tokens_type.html`、`struct_usd_lux_tokens_type.html`、`struct_usd_physics_tokens_type.html`，覆盖 source 和 struct token 页面。
- 第 101 轮增强 `scripts/build_api_full_batch.mjs` 的 include graph、source-code 链接和 `Definition at line ...` 过滤，并新增 5 个 API draft HTML：`struct_usd_skel_tokens_type.html`、`system_diagnostics_8h_source.html`、`tf_page_front.html`、`trace_page_front.html`、`usd_2usd_2object_8h.html`，覆盖 struct、source、Tf/Trace module 和 Usd object file 页面。
- 第 102 轮新增 5 个 API draft HTML：`usd_app_utils_page_front.html`、`usd_geom_page_front.html`、`usd_hydra_page_front.html`、`usd_lux_page_front.html`、`usd_media_page_front.html`，覆盖 UsdAppUtils、UsdGeom、UsdHydra、UsdLux 和 UsdMedia module front pages，并抽查保留 overview 摘录和关键入口链接。
- 第 103 轮新增 5 个 API draft HTML：`usd_mtlx_page_front.html`、`usd_physics_page_front.html`、`usd_proc_page_front.html`、`usd_render_page_front.html`、`usd_ri_page_front.html`，覆盖 MaterialX、Physics、Procedurals、Render 和 RenderMan utility module front pages，并抽查保留 overview 摘录、schema/utility 入口链接和本地预览可用性。
- 第 104 轮新增 5 个 API draft HTML：`usd_semantics_overview.html`、`usd_shade_page_front.html`、`usd_shaders_page_front.html`、`usd_skel_page_front.html`、`usd_u_i_page_front.html`，覆盖 semantics、shading、shader definitions、skeleton schema/API 和 UI schema 页面，并抽查保留 overview/API manual 摘录与关键 schema 入口链接。
- 第 105 轮新增 5 个 API draft HTML：`usd_utils_page_front.html`、`usd_vol_page_front.html`、`usdabc_page_front.html`、`usddraco_page_front.html`、`var_8h_source.html`，覆盖 USD utilities、volume schema、Alembic/Draco file format plugins 和 Var source 页面，并抽查保留 utility/schema/plugin/source 入口摘录与本地预览可用性。
- 第 106 轮按全量 pending 前段新增 2 个 API draft 和 3 个 release draft：`vt_page_front.html`、`work_page_front.html`、`spec_usdz.html`、`spec.html`、`tut_authoring_variants.html`；同时增强 release 批量脚本，使其优先从 Sphinx `articleBody` 抽取标题、正文链接和目录页摘录，并在 release 批次报告中记录 `excerpt_count`。
- 第 107 轮新增 5 个 release tutorial draft HTML：`tut_converting_between_layer_formats.html`、`tut_end_to_end.html`、`tut_generating_new_schema.html`、`tut_helloworld_redux.html`、`tut_helloworld.html`；同时增强 release 批量脚本，为教程页加入受限长度的代码与命令摘录区块，并在批次报告中记录 `code_snippet_count`。
- 第 108 轮新增 5 个 release tutorial draft HTML：`tut_houdini_example.html`、`tut_inspect_and_author_props.html`、`tut_referencing_layers.html`、`tut_simple_shading.html`、`tut_traversing_stage.html`，覆盖 Houdini 历史工作流、属性检查/创作、引用层、简单材质和 Stage 遍历教程，并抽查保留正文摘录、正文链接和代码/命令摘录。
- 第 109 轮新增 5 个 release draft HTML：`tut_usd_tutorials.html`、`tut_usdview_plugin.html`、`tut_variants_example_in_katana.html`、`tut_xforms.html`、`usd_products.html`，覆盖教程目录、usdview 插件、Katana 变体示例、xform/动画/layer offset 教程和 USD 产品清单页，并抽查保留教程入口链接、产品外链和代码/命令摘录。
- 第 110 轮修复 release 批量脚本的子目录输出规则，并新增 5 个 release/user guide draft HTML：`usdfaq.html`、`user_guides/collections_and_patterns.html`、`user_guides/color_user_guide.html`、`user_guides/namespace_editing.html`、`user_guides/primvars.html`，覆盖 FAQ、Collections、Color、Namespace Editing 和 Primvars 用户指南页面。
- 第 111 轮新增 5 个 release/user guide/schema draft HTML：`user_guides/render_user_guide.html`、`user_guides/schemas/index.html`、`user_guides/schemas/usdLux/BoundableLightBase.html`、`user_guides/schemas/usdLux/CylinderLight.html`、`user_guides/schemas/usdLux/DiskLight.html`，覆盖渲染用户指南、Schema Domains 和 usdLux 基础/圆柱/圆盘灯 schema 页面。
- 第 112 轮新增 5 个 release/usdLux schema draft HTML：`user_guides/schemas/usdLux/DistantLight.html`、`user_guides/schemas/usdLux/DomeLight_1.html`、`user_guides/schemas/usdLux/DomeLight.html`、`user_guides/schemas/usdLux/GeometryLight.html`、`user_guides/schemas/usdLux/LightAPI.html`，覆盖方向光、穹顶光、几何光和 LightAPI schema 页面。
- 第 113 轮新增 5 个 release/usdLux schema draft HTML：`user_guides/schemas/usdLux/LightFilter.html`、`user_guides/schemas/usdLux/LightListAPI.html`、`user_guides/schemas/usdLux/ListAPI.html`、`user_guides/schemas/usdLux/MeshLightAPI.html`、`user_guides/schemas/usdLux/NonboundableLightBase.html`，覆盖光过滤器、light list API、mesh light API 和非 Boundable light base schema 页面。
- 第 114 轮新增 5 个 release/usdLux schema draft HTML：`user_guides/schemas/usdLux/overview.html`、`user_guides/schemas/usdLux/PluginLight.html`、`user_guides/schemas/usdLux/PluginLightFilter.html`、`user_guides/schemas/usdLux/PortalLight.html`、`user_guides/schemas/usdLux/RectLight.html`，覆盖 UsdLux 概览、插件光、插件光过滤器、门户光和矩形光 schema 页面。
- 第 115 轮新增 5 个 release/usdLux schema draft HTML：`user_guides/schemas/usdLux/ShadowAPI.html`、`user_guides/schemas/usdLux/ShapingAPI.html`、`user_guides/schemas/usdLux/SphereLight.html`、`user_guides/schemas/usdLux/usdLux_toc.html`、`user_guides/schemas/usdLux/VolumeLightAPI.html`，覆盖阴影控制、光束塑形、球形光、usdLux 目录和体积光 schema 页面。
- 第 116 轮新增 5 个 release schema draft HTML：`user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`user_guides/schemas/usdMedia/overview.html`、`user_guides/schemas/usdMedia/SpatialAudio.html`、`user_guides/schemas/usdMedia/usdMedia_toc.html`、`user_guides/schemas/usdRender/overview.html`，覆盖媒体缩略图、空间音频、usdMedia 目录和 usdRender 概览页面。
- 第 117 轮新增 5 个 release/usdRender schema draft HTML：`user_guides/schemas/usdRender/RenderPass.html`、`user_guides/schemas/usdRender/RenderProduct.html`、`user_guides/schemas/usdRender/RenderSettings.html`、`user_guides/schemas/usdRender/RenderSettingsBase.html`、`user_guides/schemas/usdRender/RenderVar.html`，覆盖渲染通道、渲染产物、渲染设置、渲染设置基类和渲染变量 schema 页面。
- 第 118 轮新增 5 个 release schema draft HTML：`user_guides/schemas/usdRender/usdRender_toc.html`、`user_guides/schemas/usdUI/AccessibilityAPI.html`、`user_guides/schemas/usdUI/AttributeHints.html`、`user_guides/schemas/usdUI/Backdrop.html`、`user_guides/schemas/usdUI/NodeGraphNodeAPI.html`，覆盖 usdRender 目录和 usdUI 辅助访问、属性提示、Backdrop、节点图节点 schema 页面。
- 第 119 轮新增 5 个 release/usdUI schema draft HTML：`user_guides/schemas/usdUI/ObjectHints.html`、`user_guides/schemas/usdUI/overview.html`、`user_guides/schemas/usdUI/PrimHints.html`、`user_guides/schemas/usdUI/PropertyHints.html`、`user_guides/schemas/usdUI/SceneGraphPrimAPI.html`，覆盖对象提示、usdUI 概览、Prim 提示、Property 提示和场景图 Prim API 页面。
- 第 120 轮新增 5 个 release schema draft HTML：`user_guides/schemas/usdUI/usdUI_toc.html`、`user_guides/schemas/usdVol/Field3DAsset.html`、`user_guides/schemas/usdVol/FieldAsset.html`、`user_guides/schemas/usdVol/FieldBase.html`、`user_guides/schemas/usdVol/OpenVDBAsset.html`，覆盖 usdUI 目录和 usdVol 的 Field3D、FieldAsset、FieldBase、OpenVDB volume field 页面。
- 第 121 轮新增 5 个 release/usdVol schema draft HTML：`user_guides/schemas/usdVol/overview.html`、`user_guides/schemas/usdVol/ParticleField.html`、`user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`，覆盖 usdVol 概览、粒子场、3D Gaussian Splat 粒子场和粒子场 kernel API 页面。
- 第 122 轮新增 5 个 release/usdVol schema draft HTML：`user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`，覆盖 Gaussian ellipsoid/surflet kernel 与粒子场 opacity、orientation、position 数据 API 页面。
- 第 123 轮新增 5 个 release/usdVol schema draft HTML：`user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`user_guides/schemas/usdVol/usdVol_toc.html`，覆盖粒子场 position/radiance/scale/spherical harmonics 基础属性 API 与 usdVol 目录页。
- 第 124 轮按回退后的 5 页节奏新增 5 个 release draft HTML：`user_guides/schemas/usdVol/Volume.html`、`user_guides/schemas/usdVol/VolumeFieldAsset.html`、`user_guides/schemas/usdVol/VolumeFieldBase.html`、`user_guides/time_and_animated_values.html`、`user_guides/variable_expressions.html`，并增强 release 批处理脚本，为本批页面加入页面级中文导读。
- 第 125 轮继续按 5 页节奏新增 5 个 release proposal draft HTML：`wp_ar2.html`、`wp_asset_previews.html`、`wp_connectable_nodes.html`、`wp_coordsys.html`、`wp_render_settings.html`，覆盖 Ar 2.0、资产预览、Connectable Nodes 泛化、坐标系和渲染设置 proposal 页面，并为每页补专门中文导读。
- 第 126 轮继续按 5 页节奏新增 5 个 release proposal draft HTML：`wp_rigid_body_physics.html`、`wp_schema_versioning.html`、`wp_stage_variables.html`、`wp_usdaudio.html`、`wp_usdlux_for_geometry_lights.html`，覆盖刚体物理、Schema 版本化、Stage 变量表达式迁移页、UsdAudio 和几何灯光 UsdLux proposal 页面，并为每页补专门中文导读。
- 第 127 轮按实际剩余 3 页完成最后一批 release proposal draft HTML：`wp_usdlux_for_renderers.html`、`wp_usdshade.html`、`wp.html`，覆盖面向渲染器需求的 UsdLux、UsdShade 材质分配和 proposal 汇总页；全量 406 页已无 `pending_full_scope`。
- 源快照写入 `source/full_release/` 与 `source/full_api/`，本地 HTML 写入 `full_site/release/` 与 `full_site/api/`，批次报告写入 `reports/release_full_batch_report.json`、`reports/release_full_batch_report.md`、`reports/api_full_batch_report.json` 和 `reports/api_full_batch_report.md`。
- 当前全量清单为 406 页：8 complete、398 draft、0 pending。
- `reports/full_draft_preview_audit.json` 已确认 398 个 draft 页面均可通过本地 HTTP 打开，且都被 `openusd_bilingual_final.html` 链接。
- 第 128 轮链接本地化修复：新增 `scripts/route_openusd_internal_links_local.mjs`、`site/uncovered_openusd_page.html` 和 `reports/local_link_routing_report.*`；当前 406 清单内 OpenUSD 内部 HTML 链接会跳本地复刻页，清单外内部链接会跳本地缺口提示页，只有明确标注“官方原页”的链接保留外跳。
- 第 128 轮路由报告：409 个 HTML 文件检查，4975 个链接路由到已有本地页，4914 个清单外内部链接路由到本地缺口页，408 个显式官方原页链接保留。
- 最新总验证：281 checks passed, 0 failed。

全量范围目标是覆盖 release 文档与 release/api API 文档下发现的所有 HTML 页面，不再按“高价值相邻页面”筛选。全量发现清单当前包含 406 个官方页面：126 个 release 页面、280 个 API 页面；8 个官方页面已完成双语本地 HTML，121 个 release 页面和 277 个 API 页面已生成 `bilingual_draft`，0 个页面为 `pending_full_scope`。这些 draft 仍需后续段落级精修。当前 release 首页生成脚本覆盖 190 个中英术语映射，生成页包含 321 组中英双语标记；glossary 术语页包含 397 组中英术语标记、18 个核心术语速览卡片和 92 条定义级中文解释；toolset 页包含 19 个工具卡片、6 个工作流场景导读、19 条双语工具说明、19 个命令选项导读和 6 个长选项说明导读；API 首页包含 1 个范围说明、4 个双语介绍块、3 个 API 入口速览卡片和 3 条 API 阅读路线；API Overview 相邻页包含 63 组中文/英文块和 40 个双语列表项；Usd API front page 包含 54 组中英目录术语和 8 个关键类双语摘要。最终 HTML 总入口为 `openusd_bilingual_final.html`，可通过 `http://127.0.0.1:8068/openusd_bilingual_final.html` 打开；页面内显示 406 页全量清单、complete/draft/pending 状态、本地路径和官方来源。`full_draft_preview_audit` 已确认 398 个 draft 页面均可通过本地 HTTP 打开，且均被最终 HTML 链接；`local_link_routing_report` 已确认站内 OpenUSD HTML 链接按本地优先路由。最新验证 281 项检查通过，0 项失败。
