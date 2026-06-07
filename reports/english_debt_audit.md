# OpenUSD English Debt Audit

Generated: 2026-06-07T20:41:23.596Z

Purpose:

- Report retained-English pressure as a diagnostic signal and a stricter `review_ready_zh` count.
- This audit does not replace `good_bilingual`; it exposes pages that are complete by the current gate but still need a stronger Chinese main reading path.
- English/Chinese ratio is not a failure gate. It only helps rank suspicious pages because API names, Doxygen lists, code, links, tokens, and official titles intentionally remain English.
- API names, class names, method names, tokens, code, links, and official English titles are intentionally preserved.

## Counts

- Total pages: 406
- good_bilingual: 96
- review_ready_zh: 33
- review_needs_zh_debt: 63
- API complete: 72
- API review_ready_zh: 12
- Release complete: 24
- Release review_ready_zh: 21
- Complete pages with high/very high ratio diagnostic: 10
- bilingual_draft: 310
- draft_needs_translation: 299
- draft_template_only: 11

## Complete Pages Still Carrying English Debt

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 18 | `full_site/api/class_hd_data_source_locator.html` | api | class_or_struct | 617 | 5/3 | 2.52 | medium | zh_main_path_too_thin |
| 3 | `site/_usd__overview_and_purpose.html` | api | general | 769 | 5/3 | 4.46 | high | zh_main_path_too_thin |
| 286 | `site/glossary.html` | release | release_or_tutorial | 862 | 5/4 | 7.28 | very_high | zh_main_path_too_thin |
| 31 | `full_site/api/class_sdf_layer.html` | api | class_or_struct | 355 | 6/3 | 3.5 | medium | zh_main_path_too_thin |
| 39 | `full_site/api/class_trace_event_data.html` | api | class_or_struct | 473 | 6/3 | 2.43 | medium | zh_main_path_too_thin |
| 287 | `site/release_index.html` | release | release_or_tutorial | 509 | 6/4 | 17.12 | very_high | zh_main_path_too_thin |
| 210 | `site/index.html` | api | general | 515 | 6/3 | 3.86 | medium | zh_main_path_too_thin |
| 33 | `full_site/api/class_sdf_prim_spec.html` | api | class_or_struct | 516 | 6/3 | 3.23 | medium | zh_main_path_too_thin |
| 10 | `full_site/api/class_esf_property_interface.html` | api | class_or_struct | 601 | 6/3 | 2.66 | medium | zh_main_path_too_thin |
| 34 | `full_site/api/class_sdf_usdz_file_format.html` | api | class_or_struct | 618 | 6/3 | 2.02 | medium | zh_main_path_too_thin |
| 264 | `site/usd_page_front.html` | api | module_front | 644 | 6/4 | 7 | very_high | zh_main_path_too_thin |
| 61 | `full_site/api/class_vdf_read_write_accessor.html` | api | class_or_struct | 661 | 6/3 | 1.98 | normal | zh_main_path_too_thin |
| 42 | `full_site/api/class_usd_geom_mesh.html` | api | class_or_struct | 673 | 6/3 | 5.86 | high | zh_main_path_too_thin |
| 9 | `full_site/api/class_ef___lofted_output_set.html` | api | class_or_struct | 681 | 6/3 | 2.24 | medium | zh_main_path_too_thin |
| 32 | `full_site/api/class_sdf_path.html` | api | class_or_struct | 698 | 6/3 | 5.46 | high | zh_main_path_too_thin |
| 50 | `full_site/api/class_usd_prim.html` | api | class_or_struct | 707 | 6/3 | 5.76 | high | zh_main_path_too_thin |
| 48 | `full_site/api/class_usd_lux_shaping_a_p_i.html` | api | class_or_struct | 721 | 6/3 | 2.18 | medium | zh_main_path_too_thin |
| 59 | `full_site/api/class_vdf_grapher_options.html` | api | class_or_struct | 726 | 6/3 | 2.43 | medium | zh_main_path_too_thin |
| 47 | `full_site/api/class_usd_lux_disk_light.html` | api | class_or_struct | 731 | 6/3 | 1.98 | normal | zh_main_path_too_thin |
| 55 | `full_site/api/class_usd_stage_cache.html` | api | class_or_struct | 732 | 6/3 | 5.16 | high | zh_main_path_too_thin |

## Draft Pages Most Dominated By English

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 240 | `full_site/api/parallel_speculation_executor_engine_8h_source.html` | api | general | 62 | 1/3 | 15.03 | very_high | draft |
| 243 | `full_site/api/pxr_display_filter_adapter_8h_source.html` | api | general | 62 | 1/3 | 14.63 | very_high | draft |
| 164 | `full_site/api/geom_model_a_p_i_adapter_8h_source.html` | api | general | 62 | 1/3 | 13.18 | very_high | draft |
| 207 | `full_site/api/hgi_2shader_program_8h_source.html` | api | general | 62 | 1/3 | 12.06 | very_high | draft |
| 244 | `full_site/api/riley_param_schema_8h_source.html` | api | general | 62 | 1/3 | 10.47 | very_high | draft |
| 254 | `full_site/api/system_diagnostics_8h_source.html` | api | general | 62 | 2/3 | 9.87 | very_high | draft |
| 278 | `full_site/api/var_8h_source.html` | api | general | 62 | 1/3 | 9.74 | very_high | draft |
| 1 | `full_site/api/_c_l_i11_8h_source.html` | api | general | 62 | 1/3 | 9.63 | very_high | draft |
| 8 | `full_site/api/binding_map_8h_source.html` | api | general | 62 | 1/3 | 6.97 | very_high | draft |
| 251 | `full_site/api/struct_usd_lux_tokens_type.html` | api | class_or_struct | 381 | 5/3 | 4.84 | high | draft |
| 252 | `full_site/api/struct_usd_physics_tokens_type.html` | api | class_or_struct | 411 | 5/3 | 4.68 | high | draft |
| 294 | `full_site/release/press_opensource_announce.html` | release | release_or_tutorial | 585 | 7/4 | 4.55 | high | draft |
| 253 | `full_site/api/struct_usd_skel_tokens_type.html` | api | class_or_struct | 397 | 6/3 | 4.37 | high | draft |
| 298 | `full_site/release/search.html` | release | release_or_tutorial | 64 | 1/4 | 4.3 | high | draft |
| 69 | `full_site/api/dir_aa3bf17f9d6f68169ce0fa9df97655e9.html` | api | general | 66 | 1/3 | 4.12 | high | draft |
| 257 | `full_site/api/usd_2usd_2object_8h.html` | api | general | 332 | 6/3 | 3.82 | medium | draft |
| 263 | `full_site/api/usd_mtlx_page_front.html` | api | module_front | 470 | 6/4 | 3.74 | medium | draft |
| 66 | `full_site/api/classpxr__tsl_1_1robin__map.html` | api | general | 353 | 4/3 | 3.71 | medium | draft |
| 260 | `full_site/api/usd_hydra_page_front.html` | api | module_front | 475 | 6/4 | 3.67 | medium | draft |
| 229 | `full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html` | api | general | 555 | 5/3 | 3.63 | medium | draft |

## Release Pages To Pull Forward

| # | Page | Scope | Type | Complete Zh Chars | Coverage Signals | En/Zh Ratio | Ratio Diagnostic | Debt |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 298 | `full_site/release/search.html` | release | release_or_tutorial | 64 | 1/4 | 4.3 | high | draft |
| 294 | `full_site/release/press_opensource_announce.html` | release | release_or_tutorial | 585 | 7/4 | 4.55 | high | draft |
| 353 | `full_site/release/user_guides/schemas/usdRender/overview.html` | release | release_or_tutorial | 577 | 7/4 | 3.48 | medium | draft |
| 288 | `full_site/release/intro_to_openexec.html` | release | release_or_tutorial | 608 | 7/4 | 3.36 | medium | draft |
| 299 | `full_site/release/spec_usdpreviewsurface.html` | release | release_or_tutorial | 693 | 7/4 | 3.23 | medium | draft |
| 322 | `full_site/release/user_guides/namespace_editing.html` | release | release_or_tutorial | 541 | 7/4 | 3.21 | medium | draft |
| 295 | `full_site/release/press_opensource_release.html` | release | release_or_tutorial | 625 | 7/4 | 3.07 | medium | draft |
| 399 | `full_site/release/wp_rigid_body_physics.html` | release | release_or_tutorial | 783 | 7/4 | 3.06 | medium | draft |
| 402 | `full_site/release/wp_usdaudio.html` | release | release_or_tutorial | 722 | 7/4 | 2.95 | medium | draft |
| 365 | `full_site/release/user_guides/schemas/usdUI/overview.html` | release | release_or_tutorial | 591 | 7/4 | 2.83 | medium | draft |
| 283 | `full_site/release/contributors.html` | release | release_or_tutorial | 678 | 6/4 | 2.69 | medium | draft |
| 387 | `full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html` | release | release_or_tutorial | 586 | 7/4 | 2.64 | medium | draft |
| 384 | `full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html` | release | release_or_tutorial | 704 | 7/4 | 2.6 | medium | draft |
| 323 | `full_site/release/user_guides/primvars.html` | release | release_or_tutorial | 580 | 7/4 | 2.59 | medium | draft |
| 374 | `full_site/release/user_guides/schemas/usdVol/overview.html` | release | release_or_tutorial | 592 | 7/4 | 2.58 | medium | draft |
| 314 | `full_site/release/tut_usd_tutorials.html` | release | release_or_tutorial | 623 | 6/4 | 2.57 | medium | draft |
| 376 | `full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html` | release | release_or_tutorial | 631 | 7/4 | 2.57 | medium | draft |
| 382 | `full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html` | release | release_or_tutorial | 582 | 7/4 | 2.55 | medium | draft |
| 321 | `full_site/release/user_guides/color_user_guide.html` | release | release_or_tutorial | 657 | 7/4 | 2.52 | medium | draft |
| 290 | `full_site/release/maxperf.html` | release | release_or_tutorial | 625 | 7/4 | 2.49 | medium | draft |

Policy:

- Future status reports should include both `good_bilingual` and `review_ready_zh`.
- English/Chinese ratio is a diagnostic sorter only, not a completion failure gate.
- A module front page should not be considered review-ready just because it passes the current 500-character quality floor.
- After several API-focused PromotionRounds, the automation should select a release/tutorial/user guide page unless a named P0/P1 defect blocks the run.
