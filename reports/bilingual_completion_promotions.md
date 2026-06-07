# OpenUSD 完整双语晋级清单

Generated: 2026-06-07T20:43:23.508Z

这份清单只记录已经从 `bilingual_draft` 晋级为 `bilingual_complete` 的页面。它是 `scripts/discover_openusd_all_pages.mjs` 识别 promoted complete 页面的审计来源，不等同于把草稿页改个状态。

## 晋级规则

- 页面必须移除通用 draft 文案。
- 页面必须显示 `bilingual_complete`。
- 页面必须提供面向正文的 paragraph-level bilingual coverage。
- API 名、类名、方法名、代码、命令、属性名、模板参数、宏名、枚举名、枚举值、变量名、类型名、头文件名、token 字面量和链接保持原样。
- `audit_openusd_translation_quality.mjs` 必须能将页面评为 `good_bilingual`。

## 当前晋级页面

| ID | 本地输出 | 官方页面 | 状态 |
| --- | --- | --- | --- |
| `round-394-release-usdLux-PortalLight` | `full_site/release/user_guides/schemas/usdLux/PortalLight.html` | `https://openusd.org/release/user_guides/schemas/usdLux/PortalLight.html` | bilingual_complete |
| `round-393-release-usdLux-PluginLightFilter` | `full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html` | `https://openusd.org/release/user_guides/schemas/usdLux/PluginLightFilter.html` | bilingual_complete |
| `round-392-release-usdLux-LightFilter` | `full_site/release/user_guides/schemas/usdLux/LightFilter.html` | `https://openusd.org/release/user_guides/schemas/usdLux/LightFilter.html` | bilingual_complete |
| `round-390-release-usdLux-LightAPI` | `full_site/release/user_guides/schemas/usdLux/LightAPI.html` | `https://openusd.org/release/user_guides/schemas/usdLux/LightAPI.html` | bilingual_complete |
| `round-389-release-collections-and-patterns` | `full_site/release/user_guides/collections_and_patterns.html` | `https://openusd.org/release/user_guides/collections_and_patterns.html` | bilingual_complete |
| `round-388-release-hello-world-redux` | `full_site/release/tut_helloworld_redux.html` | `https://openusd.org/release/tut_helloworld_redux.html` | bilingual_complete |
| `round-387-release-layer-format-conversion` | `full_site/release/tut_converting_between_layer_formats.html` | `https://openusd.org/release/tut_converting_between_layer_formats.html` | bilingual_complete |
| `round-386-release-usdview-plugin` | `full_site/release/tut_usdview_plugin.html` | `https://openusd.org/release/tut_usdview_plugin.html` | bilingual_complete |
| `round-385-release-generating-new-schema` | `full_site/release/tut_generating_new_schema.html` | `https://openusd.org/release/tut_generating_new_schema.html` | bilingual_complete |
| `round-384-release-houdini-example` | `full_site/release/tut_houdini_example.html` | `https://openusd.org/release/tut_houdini_example.html` | bilingual_complete |
| `round-383-release-end-to-end-example` | `full_site/release/tut_end_to_end.html` | `https://openusd.org/release/tut_end_to_end.html` | bilingual_complete |
| `round-382-release-simple-shading` | `full_site/release/tut_simple_shading.html` | `https://openusd.org/release/tut_simple_shading.html` | bilingual_complete |
| `round-381-release-xforms-animation-layer-offsets` | `full_site/release/tut_xforms.html` | `https://openusd.org/release/tut_xforms.html` | bilingual_complete |
| `round-380-release-variants-example-katana` | `full_site/release/tut_variants_example_in_katana.html` | `https://openusd.org/release/tut_variants_example_in_katana.html` | bilingual_complete |
| `round-379-release-authoring-variants` | `full_site/release/tut_authoring_variants.html` | `https://openusd.org/release/tut_authoring_variants.html` | bilingual_complete |
| `round-378-release-traversing-stage` | `full_site/release/tut_traversing_stage.html` | `https://openusd.org/release/tut_traversing_stage.html` | bilingual_complete |
| `round-377-release-referencing-layers` | `full_site/release/tut_referencing_layers.html` | `https://openusd.org/release/tut_referencing_layers.html` | bilingual_complete |
| `round-376-release-inspect-author-properties` | `full_site/release/tut_inspect_and_author_props.html` | `https://openusd.org/release/tut_inspect_and_author_props.html` | bilingual_complete |
| `round-375-release-hello-world-tutorial` | `full_site/release/tut_helloworld.html` | `https://openusd.org/release/tut_helloworld.html` | bilingual_complete |
| `round-372-usd-shade-shading-schema` | `full_site/api/usd_shade_page_front.html` | `https://openusd.org/release/api/usd_shade_page_front.html` | bilingual_complete |
| `round-371-usd-geom-geometry-schema` | `full_site/api/usd_geom_page_front.html` | `https://openusd.org/release/api/usd_geom_page_front.html` | bilingual_complete |
| `round-370-usd-lux-lighting-schema` | `full_site/api/usd_lux_page_front.html` | `https://openusd.org/release/api/usd_lux_page_front.html` | bilingual_complete |
| `round-369-usd-skel-skeleton-schema` | `full_site/api/usd_skel_page_front.html` | `https://openusd.org/release/api/usd_skel_page_front.html` | bilingual_complete |
| `round-368-usd-utils-usd-utilities` | `full_site/api/usd_utils_page_front.html` | `https://openusd.org/release/api/usd_utils_page_front.html` | bilingual_complete |
| `round-367-tf-tools-foundations` | `full_site/api/tf_page_front.html` | `https://openusd.org/release/api/tf_page_front.html` | bilingual_complete |
| `round-366-plug-plugin-framework` | `full_site/api/plug_page_front.html` | `https://openusd.org/release/api/plug_page_front.html` | bilingual_complete |
| `round-365-usd-app-utils-application-utilities` | `full_site/api/usd_app_utils_page_front.html` | `https://openusd.org/release/api/usd_app_utils_page_front.html` | bilingual_complete |
| `round-364-hio-hydra-resource-io` | `full_site/api/hio_page_front.html` | `https://openusd.org/release/api/hio_page_front.html` | bilingual_complete |
| `round-363-hdst-hdstorm-rendering` | `full_site/api/hd_st_page_front.html` | `https://openusd.org/release/api/hd_st_page_front.html` | bilingual_complete |
| `round-362-glf-opengl-utilities` | `full_site/api/glf_page_front.html` | `https://openusd.org/release/api/glf_page_front.html` | bilingual_complete |
| `round-361-hdx-hydra-extensions` | `full_site/api/hdx_page_front.html` | `https://openusd.org/release/api/hdx_page_front.html` | bilingual_complete |
| `round-360-hd-hydra-framework` | `full_site/api/hd_page_front.html` | `https://openusd.org/release/api/hd_page_front.html` | bilingual_complete |
| `round-359-arch-architecture-dependent` | `full_site/api/arch_page_front.html` | `https://openusd.org/release/api/arch_page_front.html` | bilingual_complete |
| `round-358-ar-asset-resolution` | `full_site/api/ar_page_front.html` | `https://openusd.org/release/api/ar_page_front.html` | bilingual_complete |
| `round-357-tf-dense-hash-map` | `full_site/api/class_tf_dense_hash_map.html` | `https://openusd.org/release/api/class_tf_dense_hash_map.html` | bilingual_complete |
| `round-356-gf-ray` | `full_site/api/class_gf_ray.html` | `https://openusd.org/release/api/class_gf_ray.html` | bilingual_complete |
| `round-355-gf-range1d` | `full_site/api/class_gf_range1d.html` | `https://openusd.org/release/api/class_gf_range1d.html` | bilingual_complete |
| `round-354-gf-dual-quatf` | `full_site/api/class_gf_dual_quatf.html` | `https://openusd.org/release/api/class_gf_dual_quatf.html` | bilingual_complete |
| `round-353-usd-schema-registry` | `full_site/api/class_usd_schema_registry.html` | `https://openusd.org/release/api/class_usd_schema_registry.html` | bilingual_complete |
| `round-352-usd-vol-particle-field-spherical-harmonics-attribute-api` | `full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html` | `https://openusd.org/release/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html` | bilingual_complete |
| `round-351-sdf-children-view` | `full_site/api/class_sdf_children_view.html` | `https://openusd.org/release/api/class_sdf_children_view.html` | bilingual_complete |
| `round-350-usd-imaging-nurbs-patch-adapter` | `full_site/api/class_usd_imaging_nurbs_patch_adapter.html` | `https://openusd.org/release/api/class_usd_imaging_nurbs_patch_adapter.html` | bilingual_complete |
| `round-349-usd-skel-imaging-data-source-skeleton-prim` | `full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html` | `https://openusd.org/release/api/class_usd_skel_imaging_data_source_skeleton_prim.html` | bilingual_complete |
| `round-348-usd-imaging-adapter-registry` | `full_site/api/class_usd_imaging_adapter_registry.html` | `https://openusd.org/release/api/class_usd_imaging_adapter_registry.html` | bilingual_complete |
| `round-347-hgi-gl-graphics-cmds` | `full_site/api/class_hgi_g_l_graphics_cmds.html` | `https://openusd.org/release/api/class_hgi_g_l_graphics_cmds.html` | bilingual_complete |
| `round-346-sdf-usdz-file-format` | `full_site/api/class_sdf_usdz_file_format.html` | `https://openusd.org/release/api/class_sdf_usdz_file_format.html` | bilingual_complete |
| `round-345-usd-proc-generative-procedural` | `full_site/api/class_usd_proc_generative_procedural.html` | `https://openusd.org/release/api/class_usd_proc_generative_procedural.html` | bilingual_complete |
| `round-344-usd-lux-shaping-api` | `full_site/api/class_usd_lux_shaping_a_p_i.html` | `https://openusd.org/release/api/class_usd_lux_shaping_a_p_i.html` | bilingual_complete |
| `round-343-usd-lux-disk-light` | `full_site/api/class_usd_lux_disk_light.html` | `https://openusd.org/release/api/class_usd_lux_disk_light.html` | bilingual_complete |
| `round-342-usd-shade-output` | `full_site/api/class_usd_shade_output.html` | `https://openusd.org/release/api/class_usd_shade_output.html` | bilingual_complete |
| `round-341-usd-geom-primvars-api` | `full_site/api/class_usd_geom_primvars_a_p_i.html` | `https://openusd.org/release/api/class_usd_geom_primvars_a_p_i.html` | bilingual_complete |
| `round-339-sdf-prim-spec` | `full_site/api/class_sdf_prim_spec.html` | `https://openusd.org/release/api/class_sdf_prim_spec.html` | bilingual_complete |
| `round-338-gf-matrix2f` | `full_site/api/class_gf_matrix2f.html` | `https://openusd.org/release/api/class_gf_matrix2f.html` | bilingual_complete |
| `round-337-gf-matrix4f` | `full_site/api/class_gf_matrix4f.html` | `https://openusd.org/release/api/class_gf_matrix4f.html` | bilingual_complete |
| `round-336-gf-vec2i` | `full_site/api/class_gf_vec2i.html` | `https://openusd.org/release/api/class_gf_vec2i.html` | bilingual_complete |
| `round-335-glf-draw-target` | `full_site/api/class_glf_draw_target.html` | `https://openusd.org/release/api/class_glf_draw_target.html` | bilingual_complete |
| `round-334-hdx-pick-from-render-buffer-task` | `full_site/api/class_hdx_pick_from_render_buffer_task.html` | `https://openusd.org/release/api/class_hdx_pick_from_render_buffer_task.html` | bilingual_complete |
| `round-303-sdf-layer` | `full_site/api/class_sdf_layer.html` | `https://openusd.org/release/api/class_sdf_layer.html` | bilingual_complete |
| `round-304-usd-prim` | `full_site/api/class_usd_prim.html` | `https://openusd.org/release/api/class_usd_prim.html` | bilingual_complete |
| `round-305-sdf-path` | `full_site/api/class_sdf_path.html` | `https://openusd.org/release/api/class_sdf_path.html` | bilingual_complete |
| `round-306-usd-geom-mesh` | `full_site/api/class_usd_geom_mesh.html` | `https://openusd.org/release/api/class_usd_geom_mesh.html` | bilingual_complete |
| `round-307-tf-token` | `full_site/api/class_tf_token.html` | `https://openusd.org/release/api/class_tf_token.html` | bilingual_complete |
| `round-308-usd-stage-cache` | `full_site/api/class_usd_stage_cache.html` | `https://openusd.org/release/api/class_usd_stage_cache.html` | bilingual_complete |
| `round-309-usd-attribute-limits` | `full_site/api/class_usd_attribute_limits.html` | `https://openusd.org/release/api/class_usd_attribute_limits.html` | bilingual_complete |
| `round-310-usd-validation-error` | `full_site/api/class_usd_validation_error.html` | `https://openusd.org/release/api/class_usd_validation_error.html` | bilingual_complete |
| `round-311-usd-geom-basis-curves` | `full_site/api/class_usd_geom_basis_curves.html` | `https://openusd.org/release/api/class_usd_geom_basis_curves.html` | bilingual_complete |
| `round-312-usd-physics-joint` | `full_site/api/class_usd_physics_joint.html` | `https://openusd.org/release/api/class_usd_physics_joint.html` | bilingual_complete |
| `round-313-usd-imaging-delegate` | `full_site/api/class_usd_imaging_delegate.html` | `https://openusd.org/release/api/class_usd_imaging_delegate.html` | bilingual_complete |
| `round-314-sdr-shader-property` | `full_site/api/class_sdr_shader_property.html` | `https://openusd.org/release/api/class_sdr_shader_property.html` | bilingual_complete |
| `round-315-vt-value-ref` | `full_site/api/class_vt_value_ref.html` | `https://openusd.org/release/api/class_vt_value_ref.html` | bilingual_complete |
| `round-316-vdf-node` | `full_site/api/class_vdf_node.html` | `https://openusd.org/release/api/class_vdf_node.html` | bilingual_complete |
| `round-317-vdf-context` | `full_site/api/class_vdf_context.html` | `https://openusd.org/release/api/class_vdf_context.html` | bilingual_complete |
| `round-318-vdf-read-write-accessor` | `full_site/api/class_vdf_read_write_accessor.html` | `https://openusd.org/release/api/class_vdf_read_write_accessor.html` | bilingual_complete |
| `round-319-vdf-grapher-options` | `full_site/api/class_vdf_grapher_options.html` | `https://openusd.org/release/api/class_vdf_grapher_options.html` | bilingual_complete |
| `round-320-esf-property-interface` | `full_site/api/class_esf_property_interface.html` | `https://openusd.org/release/api/class_esf_property_interface.html` | bilingual_complete |
| `round-321-trace-event-data` | `full_site/api/class_trace_event_data.html` | `https://openusd.org/release/api/class_trace_event_data.html` | bilingual_complete |
| `round-322-ef-lofted-output-set` | `full_site/api/class_ef___lofted_output_set.html` | `https://openusd.org/release/api/class_ef___lofted_output_set.html` | bilingual_complete |
| `round-323-tf-py-lock` | `full_site/api/class_tf_py_lock.html` | `https://openusd.org/release/api/class_tf_py_lock.html` | bilingual_complete |
| `round-324-hd-data-source-locator` | `full_site/api/class_hd_data_source_locator.html` | `https://openusd.org/release/api/class_hd_data_source_locator.html` | bilingual_complete |
| `round-325-pcp-property-index` | `full_site/api/class_pcp_property_index.html` | `https://openusd.org/release/api/class_pcp_property_index.html` | bilingual_complete |
| `round-326-pcp-arc` | `full_site/api/class_pcp_arc.html` | `https://openusd.org/release/api/class_pcp_arc.html` | bilingual_complete |
| `round-327-pcp-error-unresolved-prim-path` | `full_site/api/class_pcp_error_unresolved_prim_path.html` | `https://openusd.org/release/api/class_pcp_error_unresolved_prim_path.html` | bilingual_complete |
| `round-328-hd-scene-delegate` | `full_site/api/class_hd_scene_delegate.html` | `https://openusd.org/release/api/class_hd_scene_delegate.html` | bilingual_complete |
| `round-329-hd-render-buffer` | `full_site/api/class_hd_render_buffer.html` | `https://openusd.org/release/api/class_hd_render_buffer.html` | bilingual_complete |
| `round-330-hd-task` | `full_site/api/class_hd_task.html` | `https://openusd.org/release/api/class_hd_task.html` | bilingual_complete |
| `round-331-hd-st-render-pass-state` | `full_site/api/class_hd_st_render_pass_state.html` | `https://openusd.org/release/api/class_hd_st_render_pass_state.html` | bilingual_complete |
| `round-332-hd-st-dispatch-buffer` | `full_site/api/class_hd_st_dispatch_buffer.html` | `https://openusd.org/release/api/class_hd_st_dispatch_buffer.html` | bilingual_complete |
| `round-333-hd-instance-registry` | `full_site/api/class_hd_instance_registry.html` | `https://openusd.org/release/api/class_hd_instance_registry.html` | bilingual_complete |
