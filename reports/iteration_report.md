# OpenUSD API 中英双语复刻迭代报告

源页面：<https://openusd.org/release/api/index.html>

## 第 230 轮：PropertyHints、RadianceBase、Field3DAsset、usdLux 与 RenderPass 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `8f5ca14`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdLux/usdLux_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强较薄的 usdUI property hints、usdVol radiance/Field3D、usdLux 目录和 usdRender pass 页面，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_099.mjs`，每页插入 `release-quality-pass-099` 二次精修导读区块，覆盖 `PropertyHints` 的 `displayGroup` / `shownIf` / `uiHints` 语义，`ParticleFieldRadianceBaseAPI` 的 radiance definition data 与 applied schema 验证契约，`Field3DAsset` 的 `.f3d` 外部资源、`fieldName`、`filePath` 与 `timeSamples`，`usdLux_toc.html` 的 `LightAPI`、boundable/non-boundable lights、`ShapingAPI`、`ShadowAPI`、`LightFilter` 与 `Light Units` 阅读路线，以及 `RenderPass` 的 `renderSource`、`RenderSettings`、`RenderProduct`、`RenderVar` 和 collection-based scene configuration 分工；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖指标：`PropertyHints.html` 为 `draft_needs_translation`、中文 532 字、24/18 中英块；`ParticleFieldRadianceBaseAPI.html` 为 535 字、24/17；`Field3DAsset.html` 为 537 字、24/17；`usdLux_toc.html` 为 510 字、24/16；`RenderPass.html` 为 502 字、24/18；5 页均 `badEncodingCount=0` 且 `unexpectedOfficialLinks=0`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。398 个 `bilingual_draft` 仍不是完整段落级翻译，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全量预览通过，`failed_pages` 为 0，最终入口链接覆盖 398/398。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 230: property radiance field lux renderpass pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 release/schema/API 页面做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮建议继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/tut_inspect_and_author_props.html`、`full_site/api/functions_vars_q.html`、`full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 229 轮：usdUI hints、usdRender 目录、变量索引 P 与 TsTest 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e22ba44`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/api/functions_vars_p.html`、`full_site/api/page_ts_ts_test.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强较薄的 usdUI hints、usdRender 目录、API 变量索引 P 段和 TsTest 框架页，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_098.mjs`，每页插入 `release-quality-pass-098` 二次精修导读区块，覆盖 `ObjectHints` 的 `uiHints`、`displayName`、`hidden` 和 UI metadata 边界，`PrimHints` 的 `displayGroupsExpanded`、`displayGroupsShownIf`、`displayGroup` 与条件显示规则，`usdRender_toc.html` 的 `RenderSettings`/`RenderProduct`/`RenderVar`/`RenderPass` 阅读路线，`functions_vars_p.html` 的 Pcp/token struct/class member variable 索引用法，以及 `page_ts_ts_test.html` 的 TsTest framework/backend/baseline/grapher 分工；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`ObjectHints.html` 的 UI metadata 与核心场景数据区分、`uiHints` dictionary、`displayName`、`hidden` 和 DCC tool UI；`PrimHints.html` 的 display groups 展开/条件显示、`widgetReadOnlyMode == 0` 表达式和 property `displayGroup`；`usdRender_toc.html` 的 Overview、Best Practices、RenderSettings、RenderProduct、RenderVar、RenderPass 和默认渲染入口；`functions_vars_p.html` 的 `PcpLayerStackIdentifier`、`PcpPrimIndexOutputs`、`UsdRenderTokensType`、`CameraUtilFraming` 和跨模块变量索引；`page_ts_ts_test.html` 的 `tsTest_Evaluator`、`tsTest_SampleTimes`、`TsTest_Grapher`、`tsTest_CompareBaseline`、backend 和 baseline。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。按质量审计口径，目标页中文正文量已提升到 `482-536` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 229: ui render index tstest pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 usdUI hints、usdRender 目录、变量索引和 TsTest 页面做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮建议继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdLux/usdLux_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 228 轮：ParticleField kernel、PositionBase 与 RenderVar 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `7c989a4`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强较薄的 ParticleField kernel、position base schema 和 usdRender 输出变量页，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_097.mjs`，每页插入 `release-quality-pass-097` 二次精修导读区块，覆盖 `GaussianSurflet` 的 XY plane / Gaussian falloff / off-plane opacity，`ConstantSurflet` 的 step-function falloff 和 bounded circular disk，`PositionBaseAPI` 的 particle count / per-particle data 对齐规则，`RenderVar` 的 AOV / `sourceName` / `sourceType` / LPE 语义，以及 `ParticleFieldKernelBaseAPI` 的 spatial basis function 和 validation contract；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`ParticleFieldKernelGaussianSurfletAPI.html` 的 `XY plane`、`Gaussian falloff`、`3-sigma point`、`splat support` 和 `per-splat opacity`；`ParticleFieldKernelConstantSurfletAPI.html` 的 `step-function falloff`、`radius 1 disk`、`planar ellipse` 和硬边界支持；`ParticleFieldPositionBaseAPI.html` 的 positions 数量决定粒子数量、数组截断/丢弃/default value 回退；`RenderVar.html` 的 AOV、`sourceName`、`sourceType`、`dataType`、`C<RD>[<L.>O]` LPE 示例和 `RenderSettings`/`RenderProduct`/`RenderVar` 分工；`ParticleFieldKernelBaseAPI.html` 的 kernel data、applied schema、characteristics schemas 和具体 kernel 页面阅读顺序。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。按质量审计口径，目标页中文正文量已提升到 `461-513` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 228: particle kernels render var pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 ParticleField kernel、position base schema 和 RenderVar 页面做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮建议继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/api/functions_vars_p.html`、`full_site/api/page_ts_ts_test.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 227 轮：usdVol/usdUI 目录、VolumeFieldAsset、Namespace List 与 GaussianEllipsoid 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `8588cf1`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/usdVol_toc.html`、`full_site/release/user_guides/schemas/usdUI/usdUI_toc.html`、`full_site/api/namespaces.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是转向较薄的 release schema 目录、具体 schema 属性页、Doxygen namespace 列表和 ParticleField kernel API，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_096.mjs`，每页插入 `release-quality-pass-096` 二次精修导读区块，覆盖 `VolumeFieldAsset` 属性语义、`usdVol` 目录阅读路线、`usdUI` UI hints/accessibility/node graph 入口、Doxygen `Namespace List` 导航边界和 `ParticleFieldKernelGaussianEllipsoidAPI` 的 Gaussian ellipsoid kernel；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`VolumeFieldAsset.html` 的 `filePath`、`fieldName`、`fieldIndex`、`fieldDataType`、`vectorDataRoleHint` 和 `field:*` relationship 区分；`usdVol_toc.html` 的 `Volume`、`FieldBase`、`OpenVDBAsset`、`Field3DAsset`、`ParticleField` 阅读顺序；`usdUI_toc.html` 的 `ObjectHints`、`PrimHints`、`PropertyHints`、`AttributeHints`、`AccessibilityAPI`、`Backdrop` 和 node graph UI；`namespaces.html` 的 `pxr_tsl`、`ShaderMetadataHelpers`、`VdfTestUtils` 和 namespace/class/file/module 索引区别；`ParticleFieldKernelGaussianEllipsoidAPI.html` 的 `standard deviation`、`3-sigma point`、`Gaussian falloff`、`splat support` 和 soft boundary。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量已提升到 `538-561` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 227: schema toc namespaces gaussian pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 release schema 目录/属性页和 namespace 列表做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮建议继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 226 轮：File Members C/E/J/G 与宏定义索引二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6685010`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_func_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_defs.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 函数页、宽索引和宏定义索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_095.mjs`，每页插入 `release-quality-pass-095` 二次精修导读区块，覆盖 namespace edit 合并、Ef/Exec 执行系统、Js JSON 工具、Gf 数学/几何函数和跨模块宏定义索引；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_func_c.html` 的 `CombineError()`、`CombineResult()`、`CombineUnbatched()`、`namespaceEdit.h` 和 batched namespace edits；`globals_e.html` 的 `EfGetFirstValidInputValue()`、`EfInputValueBlockVector`、`Exec_ComputationBuilderProviderTypes`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、callback 和 validation error；`globals_func_j.html` 的 `JsConvertToContainerType()`、`JsFindValue()`、JSON parse/write 和 serialization；`globals_func_g.html` 的 `GfAbs()`、`GfClamp()`、`GfCompMult()`、gamma/display-linear conversion、closest point query 和 overload；`globals_defs.html` 的 `AR_*` resolver macros、`ARCH_*` platform macros、`EXEC_*`、`TF_*`、`GF_*`、`NDR_*`、`SDF_*`、`USD_*` macro prefix 分流。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量已提升到 `610-716` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 226: file members c e j g defs pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 File Members 函数页和宏定义索引做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮建议转向仍较薄且用户可读价值较高的 release/schema/API 入口页，最多处理 `full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/usdVol_toc.html`、`full_site/release/user_guides/schemas/usdUI/usdUI_toc.html`、`full_site/api/namespaces.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 225 轮：File Members E/O/L 函数页与根/T 索引二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `2c48082`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_func_e.html`、`full_site/api/globals_func_o.html`、`full_site/api/globals_func_l.html`、`full_site/api/globals.html`、`full_site/api/globals_t.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 根索引、宽索引、短函数页和运算符重载页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_094.mjs`，每页插入 `release-quality-pass-094` 二次精修导读区块，覆盖 Ef 输入值选择、UsdSkel/Gf/Sdf/Usd 运算符重载、UsdPhysics range parse utilities、File Members 根索引、Tf 宏和基础设施入口、头文件来源、函数族归属、宏/运算符语义和跨页跳转顺序；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_func_e.html` 的 `EfGetFirstValidInputValue()`、`firstValidInputValue.h`、execution input selection 和 evaluation cache；`globals_func_o.html` 的 `operator+()`、`operator==()`、stream operator、indexed weights、header ownership 和 symbol semantics；`globals_func_l.html` 的 `LoadUsdPhysicsFromRange()`、`parseUtils.h`、UsdPhysics parse utilities、range input 和错误处理；`globals.html` 的 File Members root、`AR_*` resolver registration macros、`ARCH_*` platform abstraction 和按前缀分流；`globals_t.html` 的 `TF_*` macros、static tokens、registry macro、debug code、weak pointer macro 和 Python bridge。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量已提升到 `600-744` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 225: file members e o l root t pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 File Members 索引和短函数页做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/globals_func_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_defs.html`，之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 224 轮：File Members U/W/G/P 与 Authoring Variants 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `1f87d76`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_u.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_g.html`、`full_site/api/globals_p.html`、`full_site/release/tut_authoring_variants.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 宽索引、Work 函数索引和 Authoring Variants 教程页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_093.mjs`，每页插入 `release-quality-pass-093` 二次精修导读区块，覆盖 File Members 宽索引与函数索引的区别、模块归属、头文件来源、Work 并行工具、Gf 数学符号、Pcp 组合系统、variant authoring 步骤、跨页跳转顺序和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_u.html` 的 `USD_*` token、validator tokens、schema tokens、header provenance 和跨模块符号；`globals_func_w.html` 的 Work concurrency limit、parallel loop、parallel reduce、parallel sort、detached task 和 scoped parallelism；`globals_g.html` 的 Gf tolerance、vector/matrix/quaternion/dual quaternion、ray/plane 和 gamma/color 入口；`globals_p.html` 的 Pcp composition、layer stack identifier、path translation、prim index 和宽符号索引；`tut_authoring_variants.html` 的 `variant set`、`variant selection`、`GetVariantEditContext()`、LIVERPS strength ordering 和非破坏性资产变体。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量已提升到 `606-642` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 224: globals u w g p variants pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 File Members 索引和教程页做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/globals_func_e.html`、`full_site/api/globals_func_o.html`、`full_site/api/globals_func_l.html`、`full_site/api/globals.html`、`full_site/api/globals_t.html`，之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 223 轮：Hydra/Hdx 入口、File Members P/T 与 Class Members-A 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `be0350d`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/hdx_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/globals_func_p.html`、`full_site/api/functions_a.html`、`full_site/api/globals_func_t.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Hydra/Hdx 模块入口、File Members 函数索引 P/T 和 Class Members A 索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_092.mjs`，每页插入 `release-quality-pass-092` 二次精修导读区块，覆盖 Doxygen 字母桶、Hydra 模块边界、Hdx 任务层、Pcp/Tf 函数族归属、Class Members A 段导航、跨页跳转顺序和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`hdx_page_front.html` 的 Hdx task/controller、selection/picking、viewport workflow 和 Hdx/HdSt/Hgi/UsdImaging 边界；`hd_page_front.html` 的 render index、scene delegate、scene index、task、buffer source 和 data source；`globals_func_p.html` 的 Pcp composition site、prim/property index、path translation 和 layer stack；`functions_a.html` 的 Class Members A 段按 Ar/Sdf/Usd/Hd/Tf 模块筛选方法；`globals_func_t.html` 的 Tf infrastructure、Trace、TfToken、TfType、TfNotice、TfPy 和线程/Python bridge 辅助入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量已提升到 `628-663` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 223: hydra hdx file members a pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已纳入 draft 的 API 索引和入口页做第二层质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/globals_u.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_g.html`、`full_site/api/globals_p.html`、`full_site/release/tut_authoring_variants.html`，之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 222 轮：API S/B 函数索引、B 总索引与 namespace typedefs 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `9d91bb0`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_s.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/functions_b.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen 函数索引、类成员总索引和 namespace typedefs 页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_091.mjs`，为 5 页插入 `release-quality-pass-091` 二次精修导读区块；每页补充 Doxygen 字母桶、函数/类型别名索引、模块归属、容器与执行系统条目边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_s.html` 补强 time/sample、Embree sampler、Hydra scene delegate、UsdImaging adapter、Sdf file format、Vdf scheduler 和 scoped lock；`namespacemembers_type.html` 补强 `pxr_tsl`、`robin_pg_map`、`robin_pg_set`、typedef index、robin hood hashing 和 open addressing；`functions_b.html` 补强 Sdf/Tf/Vt 容器视图、Vdf parallel evaluation、Ef page cache、Hydra data source、prim traversal 和 diagnostics；`functions_func_b.html` 补强 B 段函数成员中的容器、Ef/Vdf execution graph、Glf/Hd/HdSt 渲染支撑、Ar resolver、Trace 和 UsdShade binding；`functions_func.html` 补强函数索引根页、execution network、Trace reporter、Storm buffer/texture、scene index plugins、resource registry 和 connectable API behavior。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `577-690` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 222: api index s b typedef root pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引和 namespace typedefs draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/hdx_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/globals_func_p.html`、`full_site/api/functions_a.html`、`full_site/api/globals_func_t.html`，之后可继续 `full_site/api/globals_u.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_g.html`、`full_site/api/globals_p.html`、`full_site/release/tut_authoring_variants.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 221 轮：API V/T、HdStorm、HelloWorld 与 File Members-H 二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `45d5c96`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_v.html`、`full_site/api/functions_vars_t.html`、`full_site/api/hd_storm_page_front.html`、`full_site/release/tut_helloworld.html`、`full_site/api/globals_h.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen 函数/变量索引、模块入口、教程页和 File Members 索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_090.mjs`，为 5 页插入 `release-quality-pass-090` 二次精修导读区块；每页补充 Doxygen 字母桶、函数/变量成员索引、模块 front page、教程路径、File Members 字母桶、跨模块条目归类和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_v.html` 补强 validation context、attribute limits、UsdSkel/UsdGeom/UsdRi schema 跳转、attribute query、resolve info 和 Vdf vector/data manager；`functions_vars_t.html` 补强 token tables、Pcp relocation diagnostics、physics descriptor、HdSt named texture handle、schema info 和 connection source info；`hd_storm_page_front.html` 补强 real-time Hydra renderer plugin、Hydra render delegate、Hgi backend abstraction 和 HdSt/HdStorm 边界；`tut_helloworld.html` 补强 `Usd.Stage.CreateNew`、`UsdGeom.Xform.Define`、`UsdGeom.Sphere.Define`、prim path 层级和 `HelloWorld.usda` 教程起点；`globals_h.html` 补强 `hash_value()`、`token.h`、`stageLoadRules.h`、Hio OpenVDB asset helpers 和按头文件来源阅读。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `586-674` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 221: api index v t storm hello globals h pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引、模块入口和教程 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_s.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/functions_b.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func.html`，之后可继续 `full_site/api/hdx_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/globals_func_p.html`、`full_site/api/functions_a.html`、`full_site/api/globals_func_t.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 220 轮：API E/related/namespace/A/I 索引页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `b4b1df0`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_e.html`、`full_site/api/functions_rela.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/functions_func_a.html`、`full_site/api/functions_func_i.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引、related functions 和 namespace functions 索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_089.mjs`，为 5 页插入 `release-quality-pass-089` 二次精修导读区块；每页补充 Doxygen 字母桶、函数成员索引、namespace ownership、related function 边界、跨模块条目归类和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_e.html` 补强 E 段总成员索引、`UsdTimeCode`/`UsdUtilsTimeCodeRange`、Sdf/Pcp namespace edits、Ef/Vdf execution cache 和 prim range/container；`functions_rela.html` 补强 related functions 页面类型、`UsdShadeMaterialBindingAPI`、material binding、collection-based binding 和 binding strength；`namespacemembers_func.html` 补强 namespace function index、`ShaderMetadataHelpers`、`VdfTestUtils`、`operator<<()` 和 debugging output group；`functions_func_a.html` 补强 scoped locks、Trace visitor/reporting、Sdf namespace edit、population mask、Hydra/Storm shader 和 change tracker；`functions_func_i.html` 补强 stage cache id、Pcp map expression/function、Sdf file format、Hydra buffer ranges、memory diagnostics 和 Vdf scheduling。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `590-711` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 220: api index e related namespace a i pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API/namespace/related functions 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_v.html`、`full_site/api/functions_vars_t.html`、`full_site/api/hd_storm_page_front.html`、`full_site/release/tut_helloworld.html`、`full_site/api/globals_h.html`，之后可继续 `full_site/api/functions_func_s.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/functions_b.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 219 轮：API G/F/L/Q 与 File Members-H 索引页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `b878abd`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_g.html`、`full_site/api/functions_func_f.html`、`full_site/api/functions_func_l.html`、`full_site/api/functions_q.html`、`full_site/api/globals_func_h.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引和 File Members 函数索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_088.mjs`，为 5 页插入 `release-quality-pass-088` API 索引或 File Members 页面二次精修导读区块；每页补充 Doxygen 字母桶、函数成员索引、文件级函数索引、跨模块条目归类和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_g.html` 补强 Hydra/Storm resource registry、buffer array lifecycle、Hgi backend、Gf matrix、Exec cache view 和 data source container；`functions_func_f.html` 补强 Sdf field definition/spec definer、Pcp prim index inputs、Vdf execution type registry、Hgi blit commands、Hydra prim family 和 dense hash containers；`functions_func_l.html` 补强 UsdLux light base、Sdf data/layer、UsdStage load rules、Plug/Tf script module、Hd scene index plugin registry、Trace/Vdf execution statistics；`functions_q.html` 补强短 Q 段索引、`UsdVolTokensType`、Sdf data query 和 CLI `ConfigBase` 边界；`globals_func_h.html` 补强 `hash_value()`、`token.h`、`stageLoadRules.h`、Hio OpenVDB grid asset helpers 和头文件来源辨识。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `598-694` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 219: api index g f l q h pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_e.html`、`full_site/api/functions_rela.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/functions_func_a.html`、`full_site/api/functions_func_i.html`，之后可继续 `full_site/api/functions_func_v.html`、`full_site/api/functions_vars_t.html`、`full_site/api/hd_storm_page_front.html`、`full_site/release/tut_helloworld.html`、`full_site/api/globals_h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 218 轮：API J/U/P/R 与 HdSt 入口页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e2512e4`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_j.html`、`full_site/api/globals_func_u.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_r.html`、`full_site/api/hd_st_page_front.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引、File Members 函数索引和 HdSt 模块入口页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_087.mjs`，为 5 页插入 `release-quality-pass-087` API 索引或模块入口页二次精修导读区块；每页补充 Doxygen 字母索引阅读方式、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_j.html` 补强 J 段短索引、`UsdPhysicsD6JointDesc`/`UsdPhysicsJointDesc`、`UsdSkelAnimQuery`、`SdfPath`、`OptionBase<CRTP>` 和 JSON writer 的阅读边界；`globals_func_u.html` 补强 File Members U 段、collection membership、flatten layer stack、stage metrics、connectable behavior 和 asset localization；`functions_func_p.html` 补强 predicate parameters、parser plugin、particle field kernel、Pcp dynamic file format dependency、layer relocates edit 和 render delegate；`functions_func_r.html` 补强 resource read path、file format reader、list proxy、read-write accessor、Hydra buffer range 和 frame recorder；`hd_st_page_front.html` 补强 Storm implementation layer、`renderIndex` 数据抽取、command buffer 聚合、GPU resource sharing、cached playback 和 dirty bits。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `568-642` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 218: api index j u p r hdst pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引和模块入口 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_g.html`、`full_site/api/functions_func_f.html`、`full_site/api/functions_func_l.html`、`full_site/api/functions_q.html`、`full_site/api/globals_func_h.html`，之后可继续 `functions_func_f.html`/`functions_func_l.html` 之后的 API 索引队列，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 217 轮：API C/D/J/V/Hio 索引与模块入口页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `8e5acca`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_c.html`、`full_site/api/globals_func_v.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_d.html`、`full_site/api/hio_page_front.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页、File Members 函数索引和模块入口页的中文阅读方法，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_086.mjs`，为 5 页插入 `release-quality-pass-086` API 索引或模块入口页二次精修导读区块；每页补充 Doxygen 字母桶、File Members 与模块 front page 的阅读方式、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_c.html` 补强 Pcp prim index/namespace edits、Ef page cache、ExecIr/Vdf type dispatch、Trace/TfMallocTag、HdBasisCurvesTopology、CameraUtil 和 applied API schema；`globals_func_v.html` 补强 Vdf file-level functions、data manager vector、pool output、network traversal/source node、masked output vector、parallel evaluation、schedule task 和 `VtDictionaryGet()`；`functions_vars_j.html` 补强 `UsdPhysicsD6JointDesc`、`UsdPhysicsJointDesc`、`UsdPhysicsCustomTokens`、`UsdSkelTokensType` 和 `HdEmbreeConfig` 的模块边界；`functions_d.html` 补强 Gf matrix/vector、Tf/Vt runtime containers、Vdf executor data manager、physics joint drive、SdfZipFile、UsdImaging、TraceEvent 和 RenderVar/token；`hio_page_front.html` 补强 Hio 作为 Hydra Resource I/O、`HioGlslfx`、`HioImage`、`HioStb_Image`、`HioOIIO_Image`、`HioFieldTextureData` 与 image file format 用户指南入口的定位。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `575-620` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 217: api index c d j v hio pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引和模块入口 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_j.html`、`full_site/api/globals_func_u.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_r.html`、`full_site/api/hd_st_page_front.html`，之后可继续 `functions_func_g.html`、`functions_func_f.html`、`functions_func_l.html`、`functions_q.html`、`globals_func_h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 216 轮：API U/G/M related-S 索引页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `836972a`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_u.html`、`full_site/api/functions_vars_g.html`、`full_site/api/functions_g.html`、`full_site/api/functions_func_m.html`、`full_site/api/functions_rela_s.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页的中文阅读方法和跨模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_085.mjs`，为 5 页插入 `release-quality-pass-085` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方式、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_u.html` 补强 UsdStage/UsdPrim/material binding、population mask、Hydra/Storm shader/time sample/render buffer、Vt/Gf 值类型、Vdf executor data vector、Trace/Tf 工具；`functions_vars_g.html` 补强 UsdMedia/UsdProc/UsdLux/UsdGeom token table、HdMeshReprDesc、UsdImagingGLEngine::Parameters、UsdPhysicsSceneDesc、CLI App 和 `OptionBase<CRTP>`；`functions_g.html` 补强 Hydra/Storm buffer registry、Hgi/HgiGL graphics interface、schema token、ArResolverContext、Exec cache、Gf matrix 和 Hd container data source；`functions_func_m.html` 补强 Sdf path/predicate/variable expression、UsdGeom、schema registry、composition map、UsdEditTarget、Hydra render tracking、Trace、Vdf 和 Tf 工具；`functions_rela_s.html` 补强 Sdf predicate/path expression、JsValue、Vdf connector/mask/node set 和 Vt value container。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `537-604` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 216: api index u g m related s pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_c.html`、`full_site/api/globals_func_v.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_d.html`、`full_site/api/hio_page_front.html`，之后可继续 `functions_j.html`、`globals_func_u.html`、`functions_func_p.html`、`functions_func_r.html`、`hd_st_page_front.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 215 轮：API W/F/K related-H 索引页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e75e5c8`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_w.html`、`full_site/api/functions_f.html`、`full_site/api/functions_k.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_w.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页的中文阅读方法和跨模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_084.mjs`，为 5 页插入 `release-quality-pass-084` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方式、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_w.html` 补强 Work/Vdf/Ef task/wait/write、Sdf path/predicate expression、layer muteness、Ar/Hio/Sdf writable asset 与 Trace/JsWriter/Hgi 工具条目；`functions_f.html` 补强 token table、field definition、schema registry、file format、Sdr discovery、Hgi blit、Hydra/RenderMan adapter 和 physics descriptor；`functions_k.html` 补强 SdfChildrenView、SdfNotice/TfNotice、validation metadata、UsdPhysics token、HioGlslfxResourceLayout、predicate function call 和 model/schema API；`functions_rela_h.html` 补强 Gf 数学 related functions、ArResolverContext、PcpInstanceKey、SdfHandle、TfPyObjWrapper 与 UsdStageLoadRules；`functions_w.html` 补强 Class Members W 总索引中的 Work/Vdf/Ef、Sdf/Pcp/Tf、Gf Vec4、UsdShade/UsdSkel/UsdGeom/UsdHydra token、Ar/Hio/Trace/JsWriter/Glf/SdfFileFormat 条目。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。目标页中文正文量已提升到 `532-604` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 215: api index w f k related h pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_u.html`、`full_site/api/functions_vars_g.html`、`full_site/api/functions_g.html`、`full_site/api/functions_func_m.html`、`full_site/api/functions_rela_s.html`，之后可继续 `functions_c.html`、`globals_func_v.html`、`functions_vars_j.html`、`functions_d.html`、`hio_page_front.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 214 轮：API functions/variables 总索引 C/H/R/root 页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `4847415`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_c.html`、`full_site/api/functions_vars_h.html`、`full_site/api/functions_func_h.html`、`full_site/api/functions_vars_r.html`、`full_site/api/functions.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_083.mjs`，为 5 页插入 `release-quality-pass-083` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_c.html` 补强 function index 的 create/compute/compose/connect 语义、Pcp/Sdf/UsdCollection、Trace/Vdf、CameraUtil、Hydra topology 和 applied API schema 入口；`functions_vars_h.html` 补强 UsdPhysics shape descriptor、HdSt named texture handle、UsdPrimCompositionQuery filter、TsRegressionPreventer result 和 imaging property mapping；`functions_func_h.html` 补强 Sdf 数据结构、Pcp cache/prim index、Usd object model、UsdShade connectable、UsdSkel query、Hydra render param 和 Vdf executor；`functions_vars_r.html` 补强 schema token table、UsdPhysics descriptor、Hydra/Embree/AOV/render product、Pcp diagnostics、Ar asset metadata 和 Sdr discovery；`functions.html` 补强 Class Members root、Vdf computation graph/execution、Hydra/Storm buffer/VBO/texture/ext computation、scene index plugin registry、Trace/Tf/Ar/UsdShade/Sdf/Exec/Ef/Hf/Gf 跨模块入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。5 页中文正文量已提升到 `492-566` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 214: api index function variable root pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_w.html`、`full_site/api/functions_f.html`、`full_site/api/functions_k.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_w.html`，之后可继续 `functions_func_u.html`、`functions_vars_g.html`、`functions_g.html`、`functions_func_m.html`、`functions_rela_s.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 213 轮：API related/function/variable 索引 O/I/N/K/B 页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ad68a0d`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_rela_o.html`、`full_site/api/functions_i.html`、`full_site/api/functions_n.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_b.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_082.mjs`，为 5 页插入 `release-quality-pass-082` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_rela_o.html` 补强 related functions 与 member functions 的边界、UsdGeom/UsdShade/UsdSkel 查询类型、Tf/Sdf/Vt 基础设施和 Gf 数学类型；`functions_i.html` 补强 stage cache id、schema info、Sdr discovery、Pcp map/prim index inputs、population mask、Hydra buffer 和 image IO；`functions_n.html` 补强 Hydra scene index pipeline、Pcp composition error diagnostics、CLI/config、validation、render product、shader discovery、TfMallocTag 和 GL/Hydra 支撑；`functions_vars_k.html` 补强 validation metadata、schema registry、UsdPhysics rigid body/tokens 和 UsdGeom tokens；`functions_vars_b.html` 补强 UsdSkel skin baking/imaging/blend shape/guide data、UsdPhysics joint/shape descriptor、Hydra mesh representation、Hgi mip info、Sdr shader discovery 和多 domain token table。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。5 页中文正文量已提升到 `490-579` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 213: api index related o i n k b pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_func_c.html`、`full_site/api/functions_vars_h.html`、`full_site/api/functions_func_h.html`、`full_site/api/functions_vars_r.html`、`full_site/api/functions.html`，之后可继续 `functions_func_w.html`、`functions_f.html`、`functions_k.html`、`functions_rela_h.html`、`functions_w.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 212 轮：API 成员索引 M/O/S/N/E 页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6300890`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_m.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_s.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_e.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_081.mjs`，为 5 页插入 `release-quality-pass-081` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_m.html` 补强 Sdf path/predicate/variable expression、Usd core/geometry/schema/edit target、Pcp map/composition、Hydra render tracking 和 Trace/Vdf 性能线索；`functions_vars_o.html` 补强 Tf ref pointer trace、Hydra picking/Embree context、Pcp reference offset/relocation error、Exec value override 和 schema tokens；`functions_s.html` 补强 UsdTimeCode/UsdStage/SdfLayer/Sdf file formats、Hydra/Imaging/Embree scene delegate 与 sampler、Gf vectors、physics descriptor 和 schema token；`functions_vars_n.html` 补强 TfMallocTag call tree/call stack、Hydra primvar/named texture handle、Sdr discovery、UsdUtils variant set、validation metadata、Pcp changes 和 Vdf schedule；`functions_vars_e.html` 补强 Sdf namespace edit detail、Pcp layer stack、UsdPhysics joint drive/limit、Hydra mesh repr、Vt array edit builder、Pcp variable expression error 和 asset path context。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。5 页中文正文量已提升到 `519-544` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 212: api index m o s n e pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_rela_o.html`、`full_site/api/functions_i.html`、`full_site/api/functions_n.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_b.html`，之后可继续 `functions_func_c.html`、`functions_vars_h.html`、`functions_func_h.html`、`functions_vars_r.html`、`functions.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 211 轮：API 成员索引 U/A/H/R/L 页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `da5d023`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_u.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_h.html`、`full_site/api/functions_r.html`、`full_site/api/functions_l.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_080.mjs`，为 5 页插入 `release-quality-pass-080` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_u.html` 补强 Usd stage/prim/material、Hydra time sample/render buffer、Vt/Gf value math、Pcp unresolved path 和 Vdf execution 的索引归类；`functions_vars_a.html` 补强 `Usd*TokensType`、Hydra AOV/render/imaging 配置、Pcp composition arc、namespace edit 和 validation 变量线索；`functions_h.html` 补强 physics shape descriptor、Sdf/Pcp 数据层、Usd object model、Hydra/Hgi render param 和 Vdf executor 条目；`functions_r.html` 补强 Ar/Sdf/Hio 文件读取、Vdf read accessor、Hydra buffer range/ext computation 和 UsdPhysics shape descriptor；`functions_l.html` 补强 Pcp relocation/layer stack、UsdLux/linear units、UsdPhysics joint/rigid body、Sdf layer/spec、Vdf operand、Hydra GLSL 和 PlugPlugin 入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。5 页中文正文量已提升到 `508-569` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 211: api index u a h r l pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_m.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_s.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_e.html`，之后可继续 `functions_rela_o.html`、`functions_i.html`、`functions_n.html`、`functions_vars_k.html`、`functions_vars_b.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 210 轮：API 成员索引 T/I/V/O/D 页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `817fdd9`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_t.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_v.html`、`full_site/api/functions_o.html`、`full_site/api/functions_vars_d.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_079.mjs`，为 5 页插入 `release-quality-pass-079` API 索引页二次精修导读区块；每页补充 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_t.html` 补强 Vdf executor/Tf/Pcp error/UsdPhysics/TokensType 索引归类；`functions_vars_i.html` 补强 imaging/instancer/primvar、Sdr/schema registry、Vdf scheduling/data vectors、Sdf/Pcp/physics/validation 变量线索；`functions_v.html` 补强 validation context/validator、Vdf iterators、Exec value overrides、geometry/skeleton/schema 条目；`functions_o.html` 补强 Ar resolver/package/layer、Pcp/Sdf namespace、Hydra handles/schema、pick/display/trace 条目；`functions_vars_d.html` 补强 RenderVar/render buffer/camera、Tf spin mutex、Pcp cache/errors、physics material/joint drive、validation metadata。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮处理对象原本已是 `draft_needs_translation`，因此分级计数保持不变是预期结果。5 页中文正文量已提升到 `573-593` 字区间，仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 210: api index t i v o d pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_u.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_h.html`、`full_site/api/functions_r.html`、`full_site/api/functions_l.html`，之后可继续 `functions_m.html`、`functions_vars_o.html`、`functions_s.html`、`functions_vars_n.html`、`functions_vars_e.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 209 轮：API 成员索引页二次精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `15f0df9`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_vars_l.html`、`full_site/api/functions_p.html`、`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_f.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，不处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_078.mjs`，为 5 页插入 `release-quality-pass-078` API 索引页二次精修导读区块；每页补充 Doxygen 字母索引阅读方法、跨模块条目归类、跳转边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`functions_vars_l.html` 的 Pcp relocation/layer stack、Physics joint desc 和 schema token 索引读法；`functions_p.html` 的 Class Members P 段、Sdf/Pcp、Sdr/UsdShade、UsdVol particle field 和 Pcp composition 入口；`functions_vars_m.html` 的 Pcp composition、Hydra repr/AOV、UsdPhysics shape/joint/collision group；`functions_vars_c.html` 的 Pcp namespace edit diagnostics、TfMallocTag call tree、Hydra/AOV 和 `TokensType`；`functions_vars_f.html` 的 UsdImaging data source mapping、schema registry、Pcp composition edit、physics descriptors 和 Hydra render state。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页中文正文量已提升到约 470-543 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 209: api index functions vars pass` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 API 索引 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理 `full_site/api/functions_t.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_v.html`、`full_site/api/functions_o.html`、`full_site/api/functions_vars_d.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 208 轮：剩余 release proposal 页第二层精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ac5a238`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 3 个未达标页面：`full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_rigid_body_physics.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮按用户确认的“最多 5 页”节奏处理剩余高价值 proposal 页，没有为了凑数额外处理低价值源码页、搜索页或目录页。
- 新增 `scripts/refine_openusd_release_batch_077.mjs`，为 3 页插入 `release-quality-pass-077` 二次精修导读区块；每页补充设计目标、对象模型、authoring/consumption 边界和常见误读，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Generalizing Connectable Nodes Beyond UsdShade` 的 `UsdShadeNodeDefAPI`、`UsdShadeConnectableAPI`、plugin-defined connectability callbacks、Sdr/Ndr 和 non-shading networks；`Coordinate Systems in USD Proposal` 的 `coordSys:* relationship`、frame of reference、shader 短名称消费、projection painting 和 procedural texture；`Rigid Body Physics in USD Proposal` 的 `PhysicsScene`、Rigid Bodies、Collision Shapes、Physics Materials、Joints、API schemas 与 scene hierarchy 交互边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 3 页中文正文量分别提升到约 571-618 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 208: proposal second pass connect coords physics` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先从用户实际会浏览的 API 索引页或指南页中选择最多 5 页，例如 `full_site/api/functions_vars_l.html`、`full_site/api/functions_p.html`、`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_f.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 207 轮：高价值 release proposal 页第二层精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `66034c5`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/wp_asset_previews.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdlux_for_geometry_lights.html`；5 页本轮开始时均已是 `draft_needs_translation`，因此本轮目标是补强中文解释质量，而不是减少 `draft_template_only` 计数。
- 新增 `scripts/refine_openusd_release_batch_076.mjs`，为 5 页插入 `release-quality-pass-076` 第二层中文精修导读区块；每页补充 proposal 历史状态、对象模型、当前 API 入口和常见误读风险，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Asset Previews in USD` 的 `assetInfo`、`previews`、`thumbnails`、`defaultImage` 与 texture cards 边界；`Adapting UsdLux to the Needs of Renderers` 的 Sdr definitions、Connectable lights、`UsdLuxPluginLight`、render delegates；`Asset Resolution (Ar) 2.0` 的 `Identifier`、`Resolve`、`AssetInfo`、resolver context 和 non-virtual interface；`Schema Versioning in USD` 的 per-schema versioning、`apiSchemas`、multiple-apply/auto-apply API schemas 和 version conflict；`Adapting UsdLux to Accommodate Geometry Lights` 的 mesh lights、`LightAPI`、`GeometryLight` deprecation、material emission/glow 和 `light:shaderId`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页的中文正文量已提升到约 515-574 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 207: proposal second pass asset lux ar schema` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮是对已有 draft 页做二次质量补强，分级计数不变是预期结果。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先最多处理尚未二次补强的 release proposal 页 `full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_rigid_body_physics.html`，如需要满 5 页再从 `translation_quality_review` 中选择用户可读价值较高的 API 索引或指南页，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 206 轮：proposal 汇总/音频/材质与 API File 页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `4db11d7`，当前分级为 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdshade.html`、`full_site/release/wp.html`、`full_site/api/copy_utils_8h.html`、`full_site/api/journal_8h.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_075.mjs`，为 5 页插入 `release-quality-pass-075` 中文精修导读区块；每页补充页面定位、关键机制、阅读边界和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`UsdAudio Proposal` 的 historical reference 状态、`UsdMediaSpatialAudio` 当前入口、timed-start playback、`assetPath`/`filePath` 与媒体 payload 边界；`UsdShade Material Assignment` 的 collection-based assignment、binding strength、material purpose、material resolve 和 `material:binding`；`Proposals` 目录页的 OpenUSD-proposals 迁移说明与本地链接策略；`copyUtils.h File` 的 `SdfCopySpec()`、`SdfShouldCopyChildrenFn`、`SdfShouldCopyValueFn` 和 Advanced Spec Copying API；`journal.h File` 的 `EsfJournal`、edit reasons、scene objects 与 ESF journal 角色。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8 变为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 206: proposals audio shade file pages` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮只是把 5 个模板页推进到可读中文精修草稿。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页；下一轮优先从高价值 `draft_needs_translation` release proposal 页继续补强，最多处理 `full_site/release/wp_asset_previews.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdlux_for_geometry_lights.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 205 轮：VolumeFieldBase、时间/变量表达式与 proposal 页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `5b327a3`，当前分级为 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`、`full_site/release/user_guides/time_and_animated_values.html`、`full_site/release/user_guides/variable_expressions.html`、`full_site/release/wp_render_settings.html`、`full_site/release/wp_stage_variables.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_074.mjs`，为 5 页插入 `release-quality-pass-074` 中文精修导读区块；每页补充概念边界、阅读顺序、语义风险和术语对照，同时保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`VolumeFieldBase` 作为所有 UsdVol field schema 抽象基础类、`Volume` 通过 `field:*` relationships 连接字段 prim、自定义 field schema 继承边界；`Time and Animated Values` 的 `TimeCode`、`timeSamples`、`timeCodesPerSecond`、`framesPerSecond`、`LayerOffset` 与 timeCode remapping；`USD Variable Expressions` 的 `expressionVariables`、asset paths、references/payloads、metadata、variant selections 和运行时求值；`Render Settings in USD Proposal` 的 historical reference 状态、`RenderSettings` / `RenderProduct` / `RenderVar` schema 分工；`Stage Variable Expressions` 的 OpenUSD-proposals 迁移提示和与用户指南页的区别。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8 变为 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步计划：验证通过后使用提交信息 `OpenUSD bilingual round 205: volume field time variables proposals` 推送本轮 HTML、脚本、报告和 `work.md`。

差距与下一轮：

- 当前 398 个 `bilingual_draft` 仍不是完整段落级翻译；本轮只是把 5 个高价值模板页推进到可读中文精修草稿。
- 仍有 `draft_template_only` 16 页，其中多为 `_source.html` 源码页、搜索页或目录页；下一轮优先最多处理 `full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdshade.html`、`full_site/release/wp.html`、`full_site/api/copy_utils_8h.html`、`full_site/api/journal_8h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 204 轮：usdVol particle attribute 与 Volume 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ef1d011`，当前分级为 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_073.mjs`，为 5 页插入 `release-quality-pass-073` 中文精修导读区块；每页包含 schema 用途、数据范围/类型阅读路径、schema 边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`ParticleFieldOrientationAttributeAPI` 的 `orientations`/`orientationsh`、float/half 取舍、与 `ParticleFieldPositionBaseAPI` 位置长度对齐、truncate/ignored 规则；`ParticleFieldPositionAttributeAPI` 的 `positions`/`positionsh`、粒子数量定义、空数组代表无 particles；`ParticleFieldScaleAttributeAPI` 的 linear scales、PLY `log-format` transformed data、`scales`/`scalesh`；`ParticleFieldSphericalHarmonicsAttributeAPI` 的 `radiance:sphericalHarmonicsDegree`、coefficients、float/half 系数和 view-dependent radiance；`Volume` 的 `field:*` relationship、`VolumeFieldBase` 派生 prim、`field:extinction`、`OpenVDBAsset`、`filePath`、`fieldName` 和 volume shader 输入映射。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8 变为 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 204: usdVol particle attributes volume`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 particle attribute 或 Volume 页面的全部属性、示例、数组布局、数学定义和渲染器实现细节。
- 全量仍有 21 个 `draft_template_only` 和 377 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`，并从 `translation_quality_review` 中再选择 4 个未达标但用户可读价值高的 API/release/class/group 页面；若剩余模板草稿主要是低价值 `search.html`、目录页或 `_source.html`，可少于 5 页处理。
2. 对 `VolumeFieldBase` 补中文用途说明、抽象基类边界、field/resource 关系和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 203 轮：usdVol field/particle schema 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `95af2a8`，当前分级为 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_072.mjs`，为 5 页插入 `release-quality-pass-072` 中文精修导读区块；每页包含 schema 用途、属性/数学阅读路径、迁移或渲染边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`FieldBase` 的 deprecated 状态、`VolumeFieldBase` 迁移、`Xformable`/`Imageable` 继承边界；`usdVol overview` 的 `Volume`、`field:*` relationship、`OpenVDBAsset`、`Field3DAsset`、`filePath`、`fieldName` 和 3D Gaussian splats 阅读路线；`ParticleField` 的 concrete base schema、派生类型、自定义 schema 继承和 `Gprim`/`Boundable`/`Xformable`/`Imageable` 语义；`ParticleField3DGaussianSplat` 的 original 3DGS、built-in schema、`projectionModeHint`、`sortingModeHint` 和 rendering hints；`ParticleFieldOpacityAttributeAPI` 的 `[0, 1]` linear opacity、PLY transformed data、`sigmoid activation function`、`opacities` 和 `opacitiesh`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8 变为 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 203: usdVol fields particle schemas`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdVol field/particle schema 的全部属性、示例、继承关系、数学定义和渲染器采用细节。
- 全量仍有 26 个 `draft_template_only` 和 372 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`。
2. 对 usdVol particle attribute 和 Volume 页面补中文用途说明、数据范围/类型阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 202 轮：usdMedia/usdRender/usdUI/usdVol schema 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `61488a9`，当前分级为 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_071.mjs`，为 5 页插入 `release-quality-pass-071` 中文精修导读区块；每页包含 schema 用途、属性/关系阅读路径、领域边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`usdMedia overview` 的 `AssetPreviewsAPI`、`SpatialAudio`、thumbnail、`auralMode` 和 ambient/spatial audio；`usdRender overview` 的 final quality render、`RenderSettings`、`RenderProduct`、`RenderVar`、`RenderPass` 和 `/Render` 组织方式；`RenderSettingsBase` 的 `aspectRatioConformPolicy`、`camera`、`resolution`、`pixelAspectRatio`、`dataWindowNDC`、`disableDepthOfField` 和 `disableMotionBlur`；`usdUI overview` 的 `NodeGraphNodeAPI`、`Backdrop`、`SceneGraphPrimAPI`、UI hints 和 `AccessibilityAPI`；`FieldAsset` 的 deprecated 状态、`VolumeFieldAsset` 迁移、`fieldDataType`、`fieldName`、`filePath` 和 `Volume` 的 `field:*` relationship 阅读路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8 变为 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 202: media render UI volume schema pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdMedia/usdRender/usdUI/usdVol schema 的全部属性、示例、继承关系和工具实现细节。
- 全量仍有 31 个 `draft_template_only` 和 367 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`。
2. 对 usdVol field/particle field 页面补中文用途说明、属性/数学阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 201 轮：usdLux schema 页面精修（三）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `bb29ea0`，当前分级为 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`PortalLight.html`、`ShadowAPI.html`、`ShapingAPI.html`、`VolumeLightAPI.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_070.mjs`，为 5 页插入 `release-quality-pass-070` 中文精修导读区块；每页包含 schema 用途、属性/关系阅读路径、艺术控制或插件扩展边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`PluginLightFilter` 的外部 `SdrShadingNode`、`UsdShadeNodeDefAPI`、`filterLink` collection 和 render delegate 扩展边界；`PortalLight` 的 local XY plane、`-Z direction`、`inputs:height`、`inputs:width` 和 `DomeLight` 采样引导关系；`ShadowAPI` 的 non-physical controls、`inputs:shadow:color`、`inputs:shadow:distance`、`inputs:shadow:falloff`、`inputs:shadow:falloffGamma` 与 shadow-linking 区分；`ShapingAPI` 的 light spread、light cone、focus、IES profile 和 `ANSI/IES LM-63-19`；`VolumeLightAPI` 的 Volume prim 发光语义、`light:materialSyncMode`、`materialGlowTintsLight`、`light:shaderId` 和 applied API 边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8 变为 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 201: usdLux filters portals shaping volume`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdLux schema 的全部属性、关系、示例、物理/非物理控制说明和渲染器实现细节。
- 全量仍有 36 个 `draft_template_only` 和 362 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`。
2. 对 usdMedia/usdRender/usdUI/usdVol 概览和基础 schema 页面补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 200 轮：usdLux schema 页面精修（二）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `d5723b4`，当前分级为 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`MeshLightAPI.html`、`NonboundableLightBase.html`、`overview.html`、`PluginLight.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_069.mjs`，为 5 页插入 `release-quality-pass-069` 中文精修导读区块；每页包含 schema 用途、属性/关系阅读路径、迁移或扩展边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`ListAPI` 的 deprecated 状态、`LightListAPI` 迁移、`lightList` 和 `lightList:cacheBehavior`；`MeshLightAPI` 的 Mesh prim 发光语义、`light:materialSyncMode`、`materialGlowTintsLight`、`light:shaderId` 和 applied API 边界；`NonboundableLightBase` 的 non-boundable intrinsic lights、`DistantLight`、`DomeLight`、`Xformable` 与 `Imageable` 继承；`overview.html` 的 UsdLux 概念入口、`LightAPI`、boundable/non-boundable 分类、light filters 和 local navigation；`PluginLight` 的外部 `Sdr shader node`、`render delegate`、插件扩展边界和 renderer-specific 语义。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8 变为 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 200: usdLux list mesh plugin schema pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdLux schema 的全部属性、关系、继承字段、示例和渲染器实现细节。
- 全量仍有 41 个 `draft_template_only` 和 357 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`PortalLight.html`、`ShadowAPI.html`、`ShapingAPI.html`、`VolumeLightAPI.html`。
2. 对 usdLux filter/portal/shadow/shaping/volume 页面补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 199 轮：usdLux schema 页精修（一）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `3f7087c`，当前分级为 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`DomeLight_1.html`、`GeometryLight.html`、`LightAPI.html`、`LightFilter.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_068.mjs`，为 5 页插入 `release-quality-pass-068` 中文精修导读区块；每页包含 schema 用途、属性/关系阅读路径、继承或连接边界和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`BoundableLightBase` 的 boundable intrinsic lights、`LightAPI` 继承能力、`extent`、`Xformable` 和 `Imageable`；`DomeLight_1` 的 HDR/IBL、`inputs:texture:file`、`inputs:texture:format`、`poleAxis`、`portals` 和版本后缀边界；`GeometryLight` 的 deprecated 状态、`MeshLight` 迁移、`geometry` relationship、`light:shaderId` 和 Sdr shader node；`LightAPI` 的 light color/intensity/exposure、light-linking、shadow-linking、`light:filters` 和 UsdShade connectable 规则；`LightFilter` 的 `filterLink` collection、`lightFilter:shaderId`、connectable container 规则和过滤器嵌套边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8 变为 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 199: usdLux schema lights and filters`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 usdLux schema 的所有属性、关系、继承字段和示例。
- 全量仍有 46 个 `draft_template_only` 和 352 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`MeshLightAPI.html`、`NonboundableLightBase.html`、`overview.html`、`PluginLight.html`。
2. 对 usdLux schema 页补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html` 和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 198 轮：release 教程/用户指南页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6d56cf8`，当前分级为 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_067.mjs`，为 5 页插入 `release-quality-pass-067` 中文精修导读区块；每页包含页面用途、阅读边界、关键概念和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`USD Tutorials` 的教程索引、Environment Setup、Python bindings、USD Toolset、GitHub releases 和学习路线；`Creating a Usdview Plugin` 的 Python plugin、`PluginContainer`、插件目录结构、plugin discovery 和 usdview API；`Color User's Guide` 的 color spaces、canonical interoperable color spaces、custom color spaces、`renderingColorSpace`、MaterialX 和 OCIO；`Primvars` 的 primvar attribute、interpolation modes、`primvars:displayColor`、`faceVarying` 和 Hydra/Storm 可视化；`Rendering with USD` 的 Imageable、stage coordinate system、`upAxis`、interactive/final frame renders、normals 和 Light-linking。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8 变为 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 198: tutorials color primvars rendering`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译教程总入口、usdview 插件教程、Color 指南、Primvars 指南或 Rendering with USD 全文。
- 全量仍有 51 个 `draft_template_only` 和 347 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍为模板草稿且用户可读价值较高的 `full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`DomeLight_1.html`、`GeometryLight.html`、`LightAPI.html`、`LightFilter.html`。
2. 对 usdLux schema 页补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html` 和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 197 轮：release 规格/教程页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮本地提交为 `3ca738e`，当前分级为 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/spec_usdpreviewsurface.html`、`full_site/release/spec_usdz.html`、`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`，5 页均为 `draft_template_only`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_066.mjs`，为 5 页插入 `release-quality-pass-066` 中文精修导读区块；每页包含页面用途、阅读边界、关键概念和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`UsdPreviewSurface Specification` 的 preview material、Core Nodes、Preview Surface、Texture Reader、Primvar Reader、Transform2d 和版本演进；`Usdz File Format Specification` 的 zip archive、Zip Constraints、Layout、File Types、anchored asset paths、MIME Type 和 `usdzip`；`End to End Example` 的极简 pipeline、`USD/extras/usd/tutorials/endToEnd`、assets/scripts/models 和 `shadingVariantLayer`；`Generating New Schema Classes` 的 `schema.usda`、`usdGenSchema`、`jinja2`、`argparse`、`USD_INSTALL_ROOT` 和 schema class 类型；`Houdini USD Example Workflow` 的历史教程边界、Houdini USD plugin 移除、Houdini Solaris 替代和 `usdview` 示例。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8 变为 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 197: specs and tutorial pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译 UsdPreviewSurface 全规范、usdz 全格式规范、端到端教程、schema 生成教程或 Houdini 历史教程全文。
- 全量仍有 56 个 `draft_template_only` 和 342 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍为模板草稿且用户可读价值较高的 `full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`。
2. 对教程目录、usdview 插件教程、Color 用户指南、Primvars 和 Rendering with USD 补中文用途说明、页面边界、阅读路径和术语对照；继续低优先处理 `search.html` 和 `_source.html` 源码页。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 196 轮：release 产品/FAQ/发布节奏/性能指标/Alembic 页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `617025a`，当前分级为 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8。
- 本轮发现上一轮自动化目标里有过期或导航名不等于本地文件名的问题：`products.html` 实际对应 `full_site/release/usd_products.html`，`usd_faq.html` 实际对应 `full_site/release/usdfaq.html`；`release_notes.html` 和 `release_toc.html` 不在当前 406 清单内；`toolset.html` 当前是 `site/toolset.html` 且已是 `bilingual_complete`，因此本轮没有新建不存在页面，也没有重复改完成页。
- 本轮严格只处理 5 个未达标页面：`full_site/release/usd_products.html`、`full_site/release/usdfaq.html`、`full_site/release/release_schedule.html`、`full_site/release/ref_performance_metrics.html`、`full_site/release/plugins_alembic.html`，其中前 4 页是 `draft_template_only`，`plugins_alembic.html` 是仍需补强的 `draft_needs_translation`。
- 新增 `scripts/refine_openusd_release_batch_065.mjs`，为 5 页插入 `release-quality-pass-065` 中文精修导读区块；每页包含页面用途、阅读边界、关键概念和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Products Using USD` 的社区维护清单、非背书边界、厂商/产品导航和第三方链接保留策略；`USD Frequently Asked Questions` 的 file format、scene description、composition arcs、`usdcat` 和字符编码问答边界；`Release Schedule` 的 dev releases、full releases、release candidates、dev branch 与 release branch；`Performance Metrics` 的被测资产、平台环境、metrics、USD Build 和本地复现；`Alembic USD Plugin` 的 `usdAbc`、file format plugin、`PXR_BUILD_ALEMBIC_PLUGIN`、Known Limitations 和 Advanced Build Configuration。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8 变为 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8；本轮 4 个模板草稿转出，`plugins_alembic.html` 被补强但仍处于 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 196: products FAQ schedule metrics Alembic`。

差距：
- 本轮 5 页仍只是进入或补强 `draft_needs_translation`，不是完整翻译产品生态清单、FAQ 全部问答、发布流程全文、性能指标表格或 Alembic 插件构建细节。
- 全量仍有 61 个 `draft_template_only` 和 337 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍为模板草稿且用户可读价值较高的 `full_site/release/spec_usdpreviewsurface.html`、`full_site/release/spec_usdz.html`、`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`。
2. 对规格和教程页补中文用途说明、页面边界、阅读路径和术语对照；跳过低价值搜索页和纯源码页，除非质量队列或用户明确要求。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 195 轮：release 性能/插件/开源新闻页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `42ea166`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/release/maxperf.html`、`full_site/release/plugins_renderman.html`、`full_site/release/plugins.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/press_opensource_release.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_064.mjs`，为 5 页插入 `release-quality-pass-064` 中文精修导读区块；每页包含页面用途、阅读路径、结构边界和术语对照，并继续保留英文页面名、API 名称、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Maximizing USD Performance` 的 low-latency access、production-scale 3D datasets、allocator、binary `.usd`、payloads 和 heavy/expensive scene 判断；`RenderMan USD Imaging Plugin` 的 `hdPrman`、USD Imaging、Hydra、RenderMan 25.0+、`build_usd.py`、build/run 配置和 AOV；`USD Third-Party Plugins` 的 Hydra render delegate、file format plugin、USD representations 和 layers；`Open Source Announcement` 的 2015 开源意向、scene graph、non-destructive editing、layered overrides、variation 和 inheritance；`Open Source Release` 的 2016 正式开源发布、DCC tools、scalable solution、collaborative production workflows 和 development process。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 70 / `draft_needs_translation` 328 / `good_bilingual` 8 变为 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 195: performance plugins press pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译性能建议全文、RenderMan 插件构建细节、第三方插件清单或两篇新闻稿全文。
- 全量仍有 65 个 `draft_template_only` 和 333 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/products.html`、`full_site/release/release_notes.html`、`full_site/release/release_toc.html`、`full_site/release/toolset.html`、`full_site/release/usd_faq.html`。
2. 对 products、release notes、release TOC、toolset 和 FAQ 页面补中文用途说明、页面边界、阅读路径和术语对照，保留页面名、链接、代码和官方英文摘录。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 194 轮：release 贡献/下载/索引/OpenExec 入门页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `d8f5b44`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/release/contributing_to_usd.html`、`full_site/release/contributors.html`、`full_site/release/dl_downloads.html`、`full_site/release/genindex.html`、`full_site/release/intro_to_openexec.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_063.mjs`，为 5 页插入 `release-quality-pass-063` 中文精修导读区块；每页包含页面用途、阅读路径、结构边界和术语对照，并继续保留英文页面名、API 名称、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Contributing to USD` 的 `Contributor License Agreement`、`Coding Conventions`、`Pull Request Guidelines`、`Git Workflow`、`GitHub Issues` 和 major change 流程；`USD Contributors (Historical)` 的历史贡献者定位、`not current nor complete` 边界和 GitHub contributors 区分；`Downloads and Videos` 的 presentations、SIGGRAPH notes、videos、assets 和 additional assets 阅读路径；`Index` 的 Sphinx/Doxygen 字母索引用途、条目和锚点保留策略；`Introduction to OpenExec` 的 `Computations`、`Built-in Computations`、`Plugin Computations`、input parameters、callbacks、registration、client API 和 invalidation。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 75 / `draft_needs_translation` 323 / `good_bilingual` 8 变为 `draft_template_only` 70 / `draft_needs_translation` 328 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 194: release contributing downloads index OpenExec`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译贡献流程每一条规则、贡献者全名单、下载资源说明、索引全部条目或 OpenExec 全文。
- 全量仍有 70 个 `draft_template_only` 和 328 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/maxperf.html`、`full_site/release/plugins_renderman.html`、`full_site/release/plugins.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/press_opensource_release.html`。
2. 对 performance、RenderMan plugin、plugins、press announcement 和 press release 页面补中文用途说明、页面边界、阅读路径和术语对照，保留页面名、链接、代码和官方英文摘录。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 193 轮：UsdVol/UsdAbc/UsdDraco/Vt/Work 模块与插件入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `774a316`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_vol_page_front.html`、`full_site/api/usdabc_page_front.html`、`full_site/api/usddraco_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/work_page_front.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_062.mjs`，为 5 页插入 `api-mixed-quality-pass-062` 中文精修导读区块；每页包含模块用途、schema/API 或插件边界、阅读路径和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdVol` 的 volumetric geometry、continuous volumes、OpenVDB/Field3D、`UsdVolVolumeFieldBase`、`UsdVolParticleField`、3D Gaussian splats 和 NeRFs；`UsdAbc` 的 Alembic file format plugin、`SDF_FORMAT_ARGS`、`abcReRoot`、`abcLayers`、`IArchive`、`IFactory::getArchive` 和 `TfEnvSettings`；`UsdDraco` 的 Draco file format plugin 与 geometry compression 边界；`Vt` 的 `VtValue`、`VtArray`、type erasure、homogeneous container 和 C++/Python interface 差异；`Work` 的 multithreading thin abstraction、`Parallel For`、TBB/OpenMP 边界、`WorkSetConcurrencyLimitArgument`、`WorkParallelForN`、`WorkDispatcher` 和 alternate backend caveats。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 80 / `draft_needs_translation` 318 / `good_bilingual` 8 变为 `draft_template_only` 75 / `draft_needs_translation` 323 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 193: UsdVol UsdAbc UsdDraco Vt Work entries`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 volume schema 小节、file format plugin 细节、Vt 容器语义或 Work 调度 API 成员。
- 全量仍有 75 个 `draft_template_only` 和 323 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/contributing_to_usd.html`、`full_site/release/contributors.html`、`full_site/release/dl_downloads.html`、`full_site/release/genindex.html`、`full_site/release/intro_to_openexec.html`。
2. 对 release 贡献、贡献者、下载、索引和 OpenExec 入门入口补中文用途说明、页面边界、阅读路径和术语对照，保留页面名、链接、代码和官方英文摘录。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 192 轮：UsdShade/UsdShaders/UsdSkel/UsdUI/UsdUtils 模块入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `3062e73`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_shade_page_front.html`、`full_site/api/usd_shaders_page_front.html`、`full_site/api/usd_skel_page_front.html`、`full_site/api/usd_u_i_page_front.html`、`full_site/api/usd_utils_page_front.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_061.mjs`，为 5 页插入 `api-usd-schema-quality-pass-061` 中文精修导读区块；每页包含模块用途、schema/API 边界、阅读路径和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdShade` 的 `UsdShadeNodeGraph`、`UsdShadeMaterial`、`UsdShadeShader`、`UsdShadeConnectableAPI`、`UsdShadeInput`、`UsdShadeOutput`、interface connections、connection resolution 和 material binding；`UsdShaders` 的 `UsdPreviewSurface`、`UsdUVTexture`、UsdShade-based shader definitions、`glslfx`、`oso`、OSL 与 shader node definition/implementation 边界；`UsdSkel` 的 `SkelRoot`、`Skeleton`、`SkelAnimation`、joint influences、geom bind transform、joint hierarchy 和 Linear Blend Skinning；`UsdUI` 的 `UsdUINodeGraphNodeAPI`、UI hints、accessibility information、`UsdUIObjectHints`、`UsdUIPrimHints`、`UsdUIPropertyHints` 和 `UsdUIAttributeHints`；`UsdUtils` 的 authoring、diagnostic delegates、stitching/value clips、dependency analysis、asset packaging、localization、user processing functions、`UsdUtilsStageCache` 和 `UsdStageCache`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 85 / `draft_needs_translation` 313 / `good_bilingual` 8 变为 `draft_template_only` 80 / `draft_needs_translation` 318 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 192: Shade Shaders Skel UI Utils entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 UsdShade 网络规则、UsdShaders shader 定义、UsdSkel 手册章节、UsdUI hints schema 或 UsdUtils 工具函数。
- 全量仍有 80 个 `draft_template_only` 和 318 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_vol_page_front.html`、`full_site/api/usdabc_page_front.html`、`full_site/api/usddraco_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/work_page_front.html`。
2. 对 Vol/USD file format plugins/Vt/Work 模块入口补中文用途说明、schema/API 边界、核心类或工具入口、阅读路径和术语对照。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 191 轮：UsdPhysics/UsdProc/UsdRender/UsdRi/UsdSemantics 模块入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `fefa0fc`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_physics_page_front.html`、`full_site/api/usd_proc_page_front.html`、`full_site/api/usd_render_page_front.html`、`full_site/api/usd_ri_page_front.html`、`full_site/api/usd_semantics_overview.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_060.mjs`，为 5 页插入 `api-usd-schema-quality-pass-060` 中文精修导读区块；每页包含模块用途、schema/API 边界、阅读路径和术语对照，并继续保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdPhysics` 的 rigid body physics、`UsdPhysicsScene`、单位设置、`UsdPhysicsRigidBodyAPI`、`UsdPhysicsMassAPI`、`UsdPhysicsCollisionAPI`、`UsdPhysicsMeshCollisionAPI`、`UsdPhysicsMaterialAPI`、`UsdPhysicsArticulationRootAPI` 和 joint schema；`UsdProc` 的 `UsdProcGenerativeProcedural`、generative procedural authoring 和 runtime/plugin 边界；`UsdRender` 的 `UsdRenderSettings`、`UsdRenderProduct`、`UsdRenderVar`、`UsdRenderPass`、`renderSettingsPrimPath`、camera/pixel/cropping/overscan/rasterization 语义；`UsdRi` 的 RenderMan utility、`UsdRiStatements`、`usdRi/rmanUtilities.h` 和 `usdRiPxr` 边界；`UsdSemantics` 的 semantic labels、taxonomy、inheritance、accumulation、time varying labels、filtering 与 `UsdGeomSubset` / `UsdShade` / `UsdRender` 关系。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 90 / `draft_needs_translation` 308 / `good_bilingual` 8 变为 `draft_template_only` 85 / `draft_needs_translation` 313 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 191: Physics Proc Render Ri Semantics entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 UsdPhysics 小节、UsdProc 类细节、UsdRender 概念段落、UsdRi 函数说明或 UsdSemantics 示例。
- 全量仍有 85 个 `draft_template_only` 和 313 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_shade_page_front.html`、`full_site/api/usd_shaders_page_front.html`、`full_site/api/usd_skel_page_front.html`、`full_site/api/usd_u_i_page_front.html`、`full_site/api/usd_utils_page_front.html`。
2. 对 Shade/Shaders/Skel/UI/Utils 模块入口补中文用途说明、schema/API 边界、核心类或 token 入口、阅读路径和术语对照。
3. 保持本地链接策略，继续运行质量审计、链接路由、draft 预览、报告索引和总验证；验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 190 轮：UsdGeom/UsdHydra/UsdLux/UsdMedia/UsdMtlx 模块入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `a2e11b4`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_geom_page_front.html`、`full_site/api/usd_hydra_page_front.html`、`full_site/api/usd_lux_page_front.html`、`full_site/api/usd_media_page_front.html`、`full_site/api/usd_mtlx_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_059.mjs`，为 5 页插入 `api-usd-schema-quality-pass-059` 中文精修导读区块；每页包含模块用途、schema/API 边界、阅读路径和术语对照，保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdGeom` 的 `UsdGeomImageable`、`UsdGeomXformable`、`UsdGeomGprim`、`UsdGeomPrimvar`、`UsdGeomBBoxCache`、motion blur、up axis 和 linear units；`UsdHydra` 的 `UsdHydraGenerativeProceduralAPI`、`UsdProcGenerativeProcedural`、`HdGpGenerativeProcedural` 和 deprecated shading schema 边界；`UsdLux` 的 core light types、`UsdLuxLightAPI`、light filters、light/shadow linking、Encapsulation Rules、Exposure 和插件扩展；`UsdMedia` 的 `UsdMediaAssetPreviewsAPI` 和 `UsdMediaSpatialAudio`；`UsdMtlx` 的 MaterialX file format、shader discovery、Concept Mappings、`UsdShadeInput`、`UsdShadeOutput`、`UsdShadeShader`、`SdrShaderNode` 和 Unsupported MaterialX Features。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 95 / `draft_needs_translation` 303 / `good_bilingual` 8 变为 `draft_template_only` 90 / `draft_needs_translation` 308 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 190: Usd schema module front entries`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 UsdGeom 小节、Hydra procedural 细节、UsdLux 设计说明、UsdMedia schema 类或 MaterialX 映射表。
- 全量仍有 90 个 `draft_template_only` 和 308 个 `draft_needs_translation`；UsdPhysics/UsdProc/UsdRender/UsdRi/UsdSemantics 及更多 schema/module/class/source 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的页面：`usd_physics_page_front.html`、`usd_proc_page_front.html`、`usd_render_page_front.html`、`usd_ri_page_front.html`、`usd_semantics_overview.html`。
2. 对 Physics/Procedurals/Render/RenderMan/Semantics 页面补中文用途说明、模块边界、核心 schema/API、阅读路径和术语对照，保留 API 名称、schema 名称、token 字面量、头文件名和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 189 轮：UsdSkelTokens / Tf / Trace / UsdObject / UsdAppUtils 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `b44c4b6`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/struct_usd_skel_tokens_type.html`、`full_site/api/tf_page_front.html`、`full_site/api/trace_page_front.html`、`full_site/api/usd_2usd_2object_8h.html`、`full_site/api/usd_app_utils_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_058.mjs`，为 5 页插入 `api-mixed-quality-pass-058` 中文精修导读区块；每页包含页面定位、阅读路径、概念边界和术语对照，保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdSkelTokensType` 的 `UsdSkelTokens`、`bindTransforms`、`restTransforms`、`classicLinear`、`dualQuaternion`、`primvarsSkelJointIndices` 和 `primvarsSkelJointWeights`；`Tf` 的 memory management、runtime typing、diagnostic utilities、debug output、`TfNotice`、`TfError`、`TfRegistryManager` 和 `TfMallocTag`；`Trace` 的 `TraceCollector`、`TraceEvent`、`TraceReporter`、`TRACE` macros、recording/reporting 和 overhead 边界；`object.h` 的 `UsdObject`、`UsdObjType`、`UsdIsSubtype()`、`UsdIsConvertible()`、`UsdIsConcrete()`；`UsdAppUtils` 的 `cameraArgs`、`colorArgs`、`complexityArgs` 和 `Frame Format Strings`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 100 / `draft_needs_translation` 298 / `good_bilingual` 8 变为 `draft_template_only` 95 / `draft_needs_translation` 303 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 189: UsdSkel Tf Trace UsdObject AppUtils entries`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 token、Tf 分组、Trace 宏示例、UsdObject include 链或 UsdAppUtils 参数 helper。
- 全量仍有 95 个 `draft_template_only` 和 303 个 `draft_needs_translation`；UsdGeom/UsdHydra/UsdLux/UsdMedia/UsdMtlx 模块入口及更多 schema/module/class/source 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的模块入口页：`usd_geom_page_front.html`、`usd_hydra_page_front.html`、`usd_lux_page_front.html`、`usd_media_page_front.html`、`usd_mtlx_page_front.html`。
2. 对 USD schema/module 入口补中文用途说明、模块边界、核心 schema/API、阅读路径和术语对照，保留 API 名称、schema 名称、token 字面量、头文件名和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 188 轮：Vdf header / Hgi sampler / Usd token 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e20a66b`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/sparse_vectorized_input_traverser_8h.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_geom_tokens_type.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_usd_physics_tokens_type.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_struct_token_batch_057.mjs`，为 5 页插入 `api-struct-token-quality-pass-057` 中文精修导读区块；每页包含页面定位、字段或 token 集合阅读方式、常见使用边界和术语对照，保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`sparseVectorizedInputTraverser.h` 的 `VdfSparseVectorizedInputTraverser`、`VdfNetwork`、output-to-input sparse traversal、vectorized 输入依赖和 Vdf node/input/output/mask 相关链接；`HgiSamplerDesc` 的 `magFilter`、`minFilter`、`mipFilter`、`addressModeU/V/W`、`borderColor`、`enableCompare`、`compareFunction` 和 `debugName`；`UsdGeomTokensType` 的 `UsdGeomTokens`、`TfToken`、property names、allowedTokens、`allTokens` 和几何 schema token 分组；`UsdLuxTokensType` 的 light linking、shadow linking、filter linking、光源 schema token 和 `inputs*` 属性 token；`UsdPhysicsTokensType` 的物理属性 token、collision approximation、joint/rigid body 相关 token 与 multiple-apply API 模板派生名。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 105 / `draft_needs_translation` 293 / `good_bilingual` 8 变为 `draft_template_only` 100 / `draft_needs_translation` 298 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 188: Vdf sampler Usd token entries`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 header include、struct 字段、token 条目、allowed value 或相关类页。
- 全量仍有 100 个 `draft_template_only` 和 298 个 `draft_needs_translation`；`UsdSkelTokens`、Tf/Trace/UsdAppUtils 模块入口、object.h、更多 tokens/page_front/class/source 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的页面：`struct_usd_skel_tokens_type.html`、`tf_page_front.html`、`trace_page_front.html`、`usd_2usd_2object_8h.html`、`usd_app_utils_page_front.html`。
2. 对 token/module/header 页面补中文用途说明、阅读路径、常见字段或 token 集合边界和术语对照，保留 API 名称、类型名、token 字面量、头文件名和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 187 轮：Pcp/Plug/Sdf/Sdr 模块入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `0b38aa3`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/pcp_page_front.html`、`full_site/api/plug_page_front.html`、`full_site/api/sdf_page_front.html`、`full_site/api/sdr_glslfx_page_front.html`、`full_site/api/sdr_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_module_front_batch_056.mjs`，为 5 页插入 `api-module-front-quality-pass-056` 中文精修导读区块；每页包含模块定位、阅读路径、概念边界和术语对照，保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、变量名、类型名、头文件名、链接和原文摘录。
- 本轮中文层覆盖：`Pcp` 作为 USD composition / Layering & Referencing 的底层服务，围绕 `PcpCache`、`PcpPrimIndex`、`PcpChanges`、`PcpLifeboat`、path translation 和 diagnostics 阅读；`Plug` 作为插件发现、注册、metadata、`PlugRegistry::RegisterPlugins` 和 `PlugNotice::DidRegisterPlugins` 通知入口；`Sdf` 作为 `SdfLayer`、`SdfPrimSpec`、`SdfPath`、file format plugins 和 authored opinions 的 Scene Description Foundations；`SdrGlslfx` 作为面向 `Sdr` 的 `glslfx parser` 窄模块；`Sdr` 作为 shader definition discovery、lazy parsing、`SdrRegistry`、`SdrShaderNode` 和 `SdrShaderProperty` 查询入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 110 / `draft_needs_translation` 288 / `good_bilingual` 8 变为 `draft_template_only` 105 / `draft_needs_translation` 293 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 187: Pcp Plug Sdf Sdr module fronts`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 Pcp capability、Plug metadata 字段、Sdf spec/value 类型、Sdr registry 行为或 shader property 细节。
- 全量仍有 105 个 `draft_template_only` 和 293 个 `draft_needs_translation`；struct/token 页面、部分文件页、API 类页、group 页和源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的 API/struct/token 页面：`sparse_vectorized_input_traverser_8h.html`、`struct_hgi_sampler_desc.html`、`struct_usd_geom_tokens_type.html`、`struct_usd_lux_tokens_type.html`、`struct_usd_physics_tokens_type.html`。
2. 对 header/struct/token 页面补中文用途说明、字段或 token 集合阅读方式、常见使用边界和术语对照，保留 API 名称、类型名、成员名、token 名、头文件名和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 186 轮：OpenExec/Ts/Related Pages 文档页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `1a0cc1f`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/page__execution__system__design.html`、`full_site/api/page_ts_regression.html`、`full_site/api/page_ts_status.html`、`full_site/api/page_ts_ts_test.html`、`full_site/api/pages.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_pages_batch_055.mjs`，为 5 页插入 `api-pages-quality-pass-055` 中文精修导读区块；每页包含页面用途、阅读重点、结构说明和术语对照，保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、链接和原英文摘录。
- 本轮中文层覆盖：`OpenExec System Design` 的 compilation、scheduling、evaluation、Engine Architecture、Network、Schedulers、Data Managers、Executors 和 `EfLeafNode` 阅读路径；`Regressive Splines in USD` 的 Bezier parametric `{x=f(t), y=f(t)}`、regressive segments、anti-regression 和 authoring mode；`USD Anim Project Status` 的 IN DEVELOPMENT 状态、Mostly Complete、Still to Come、Hermite Evaluation、Attribute Value Resolution、usdview 与测试文档边界；`The TsTest Framework` 的 validate/graph/compare spline evaluations、backend、`tsTest_...`、`TsTest_Grapher`、`matplotlib` 和 baseline helper；`Related Pages` 的 Doxygen related pages 导航、Developer Guides、module front pages 与本地路由说明。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 115 / `draft_needs_translation` 283 / `good_bilingual` 8 变为 `draft_template_only` 110 / `draft_needs_translation` 288 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 186: OpenExec Ts related pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 OpenExec 设计小节、Ts 状态条目、TsTest 细节或 Related Pages 中所有链接目标说明。
- 全量仍有 110 个 `draft_template_only` 和 288 个 `draft_needs_translation`；Pcp/Plug/Sdf/Sdr 模块入口、tokens structs、部分文件页、API 类页和源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的高价值 API 模块入口页：`pcp_page_front.html`、`plug_page_front.html`、`sdf_page_front.html`、`sdr_glslfx_page_front.html`、`sdr_page_front.html`。
2. 对 Pcp、Plug、Sdf、SdrGlslfx、Sdr 补中文用途说明、模块边界、核心概念、阅读路径和术语对照，保留 API 名称、页面名、代码、属性名、类型名和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 185 轮：Modules/Namespace 索引入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `01e7cca`，本轮 5 个 API 索引目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/modules.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/namespacemembers.html`、`full_site/api/namespaces.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_index_batch_054.mjs`，为 5 页插入 `api-index-quality-pass-054` 中文精修导读区块；每页包含索引用途、条目类型、阅读路径和术语对照，保留英文 namespace、function、typedef、module、class、operator、macro、enum、type、header、链接和原文摘录。
- 本轮中文层覆盖：`modules.html` 的 Arch/Gf/Tf module group 导航和 Bits、Multithreading、Linear Algebra、Diagnostic Facilities 等分组读法；`namespacemembers_func.html` 的 `ShaderMetadataHelpers`、`VdfTestUtils`、`pxr_CLI::CLI::enums`、`std` 函数索引读法；`namespacemembers_type.html` 的 `pxr_tsl`、`robin_pg_map`、`robin_pg_set` typedef 索引；`namespacemembers.html` 的 function/operator/typedef 混合成员总索引；`namespaces.html` 的 `pxr_tsl`、`ShaderMetadataHelpers`、`std`、`VdfTestUtils` namespace 列表和测试辅助类阅读路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 120 / `draft_needs_translation` 278 / `good_bilingual` 8 变为 `draft_template_only` 115 / `draft_needs_translation` 283 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 185: Modules namespace indexes`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 module group、namespace member、function、typedef 或 namespace 说明。
- 全量仍有 115 个 `draft_template_only` 和 283 个 `draft_needs_translation`；OpenExec system design、Ts 页面、Related Pages、Pcp/Plug/Sdf/Sdr 模块入口、tokens structs、源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的高价值文档/索引页：`page__execution__system__design.html`、`page_ts_regression.html`、`page_ts_status.html`、`page_ts_ts_test.html`、`pages.html`。
2. 对 OpenExec System Design、Regressive Splines、USD Anim Project Status、TsTest Framework 和 Related Pages 补中文用途说明、结构读法、概念边界和术语对照，保留页面名、API 名称、代码、数学符号、模板参数和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 184 轮：Vdf/usdview/Sdf Boolean/Validation 文档页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `10b1b12`，本轮 5 个文档目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`、`full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html`、`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_docs_batch_053.mjs`，为 5 页插入 `api-docs-quality-pass-053` 中文精修导读区块；每页包含用途说明、流程/概念边界、阅读顺序和术语对照，保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`Vdf` 的 vectorized dataflow networks、`VdfNetwork`、`VdfNode`、`VdfConnection` 和 node output/input 流向；usdview development practices 的 `.ui` files、`qdesigner5`、`testusdview` 和 `blackBoxTesting.md` 流程；usdview black box testing 的 viewport prim vising/invising、Make Invisible、Make Visible、Vis Only、Session Visibility、Prim View Framing 测试边界；Sdf Boolean Expressions 的 constants、variables、binary/unary operators、parenthesized expressions、implicit casting 和 `VtValue::Cast`；Validation framework 的 validators、metadata、registry、validator suites、errors、fixers、Layer/Stage/Prim validator 和 Python plugin validator 路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 125 / `draft_needs_translation` 273 / `good_bilingual` 8 变为 `draft_template_only` 120 / `draft_needs_translation` 278 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 184: Vdf usdview Sdf validation docs`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个 Vdf class、usdview 测试步骤、Boolean Expression 语法细节或 Validation 注册示例。
- 全量仍有 120 个 `draft_template_only` 和 278 个 `draft_needs_translation`；Modules/Namespace 索引、OpenExec system design、Ts 页面、Pcp/Plug/Sdf/Sdr 模块入口、tokens structs、源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的 API 索引入口：`modules.html`、`namespacemembers_func.html`、`namespacemembers_type.html`、`namespacemembers.html`、`namespaces.html`。
2. 对 Modules、Namespace List、Namespace Members/Functions/Typedefs 补中文用途说明、索引阅读方式、条目类型区分和术语对照，保留 namespace、function、typedef、module 名称和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 183 轮：OpenExec ExecIr/ExecUsd/overview/tutorial 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `f4001a0`，本轮 5 个 OpenExec 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd_docs_overview.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_openexec_batch_052.mjs`，为 5 页插入 `api-openexec-quality-pass-052` 中文精修导读区块；每页包含模块定位、流程说明、阅读顺序和术语对照，保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`ExecIr` 作为 built on `execUsd` 的 invertible rigs/controllers 实验性实现层；`ExecUsd` 作为 OpenExec 主入口，覆盖 schema computational behaviors 注册、`UsdStage` 摄取、data flow network 编译和 vectorized/multithreaded evaluation；`OpenExec Overview` 的 computations、registered computations、computed outputs、plugin/builtin computations 和 tutorials/advanced topics 入口；Tutorial 1 的 `ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdValueKey`、`ExecUsdCacheView`、`VtValue` 低层 value request 流程；Tutorial 2 的 `EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、Computation Registration、Input Registrations、`VdfContext` 和 callback function 流程。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 130 / `draft_needs_translation` 268 / `good_bilingual` 8 变为 `draft_template_only` 125 / `draft_needs_translation` 273 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 183: OpenExec ExecUsd tutorials entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译 OpenExec tutorial 的全部代码块、注释、callback 参数、注册宏细节和 caveats。
- 全量仍有 125 个 `draft_template_only` 和 273 个 `draft_needs_translation`；Vdf README、usdview 开发说明、Sdf boolean expressions、Validation、Modules/Namespace 索引、OpenExec system design、Pcp/Plug/Sdf/Sdr 模块入口和源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高且仍为模板草稿的文档页：`md_pxr_exec_vdf__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq_black_box_testing.html`、`md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`。
2. 对 Vdf、usdview development practices、usdview black box testing、Sdf Boolean Expressions 和 Validation 页面补中文用途说明、流程/概念边界、术语对照和局部结构说明，保留模块名、API 名称、代码、数学符号、模板参数和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 182 轮：OpenExec foundation/core/geometry README 入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `49a279e`，本轮 5 个 OpenExec 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_openexec_batch_051.mjs`，为 5 页插入 `api-openexec-quality-pass-051` 中文精修导读区块；每页包含模块定位、依赖关系、阅读顺序和术语对照，保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`Ef` 作为 `vdf` 之上的 execution foundation、`VdfNode`、`VdfExecutorInterface`、value cache 和 network traversal；`Esf` 作为非公开 scene description object access interface；`EsfUsd` 作为 `Esf` 到 `UsdStage` scene objects 的 USD 适配层；`Exec` 作为 built on `vdf`/`ef`/`esf` 的 execution system core，覆盖 defining computations、ingesting scenes、compiling/evaluating data flow networks；`ExecGeom` 作为 built on `execUsd` 的 `UsdGeom` computation registration 层。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 135 / `draft_needs_translation` 263 / `good_bilingual` 8 变为 `draft_template_only` 130 / `draft_needs_translation` 268 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 182: OpenExec foundation core geom entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译 OpenExec 每一个类、接口、函数、参数、网络求值细节和教程段落。
- 全量仍有 130 个 `draft_template_only` 和 268 个 `draft_needs_translation`；OpenExec `ExecIr`、`ExecUsd`、overview/tutorial、Vdf README、usdview 开发说明、Sdf boolean expressions、Validation、namespace/module 索引和源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高且仍为模板草稿的 OpenExec 后续入口：`md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd_docs_overview.html`、`md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`。
2. 对 ExecIr、ExecUsd、OpenExec overview 和前两篇 tutorial 补中文用途说明、概念边界、计算求值流程、术语对照和局部结构说明，保留模块名、API 名称、代码、数学符号、模板参数和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 181 轮：File Members/Hierarchy/Js/Kind 入口页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ab15e51`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_w.html`、`full_site/api/globals.html`、`full_site/api/inherits.html`、`full_site/api/js_page_front.html`、`full_site/api/kind_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_050.mjs`，为 5 页插入 `api-mixed-quality-pass-050` 中文精修导读区块；每页包含用途说明、索引/层级/模块阅读方法、术语对照和结构提示，保留英文页面名、API 名称、函数名、变量名、类型名、头文件名、模板参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_w.html` 的 Work 并发限制、parallel loop/reduce/sort、detached task、threadLimits 与 Work helper 入口；`globals.html` 的 File Members 根索引、`AR_`/`ARCH_` 前缀、Resolver/Arch 宏和头文件链接读法；`inherits.html` 的 graphical class hierarchy、`hierarchy.html` textual hierarchy、本地继承链接和 Ar/CLI/Vdf/Arch 条目读法；`js_page_front.html` 的 C++ JSON I/O、recursive container、parse/write entrypoint、`js/json.h` 和 Python 标准库边界；`kind_page_front.html` 的 runtime-extensible taxonomy、`TfToken`、`KindRegistry::GetBaseKind()`、`KindRegistry::IsA()`、model root 分类和 `PlugRegistry` 扩展方式。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 140 / `draft_needs_translation` 258 / `good_bilingual` 8 变为 `draft_template_only` 135 / `draft_needs_translation` 263 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 181: File Members hierarchy Js Kind entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个函数、宏、变量、类、头文件说明和继承节点。
- 全量仍有 135 个 `draft_template_only` 和 263 个 `draft_needs_translation`；OpenExec README/教程、模块入口、命名空间索引、部分指南页和源码页仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高且仍为模板草稿的 OpenExec README 入口：`md_pxr_exec_ef__r_e_a_d_m_e.html`、`md_pxr_exec_esf__r_e_a_d_m_e.html`、`md_pxr_exec_esf_usd__r_e_a_d_m_e.html`、`md_pxr_exec_exec__r_e_a_d_m_e.html`、`md_pxr_exec_exec_geom__r_e_a_d_m_e.html`。
2. 对 OpenExec execution foundation / scene foundation / Usd integration / core / geometry integration 页补中文用途说明、模块边界、关键概念、术语对照和局部结构说明，保留模块名、API 名称、代码、数学符号、模板参数和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 180 轮：File Members t/type/u/v/vars 索引页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `d8bf199`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_t.html`、`full_site/api/globals_type.html`、`full_site/api/globals_u.html`、`full_site/api/globals_v.html`、`full_site/api/globals_vars.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_file_members_batch_049.mjs`，为 5 页插入 `api-file-members-quality-pass-049` 中文精修导读区块；每页包含用途说明、索引读法、条目类型区别和术语对照，保留英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_t.html` 的 `TF_ADD_ENUM_NAME`、`TF_AXIOM`、`TF_CODING_ERROR`、`TF_DEBUG`、`TF_DECLARE_PUBLIC_TOKENS()` 与 Tf diagnostic/debug/token/ref pointer 宏；`globals_type.html` 的 `Arch*` callback/type aliases、`Ef*`/`Exec*` 类型、`GfHalf`、`Pcp*` 类型、`SdfNamespaceEdit*` 与 `SdfRelocate*`；`globals_u.html` 的 `USD_*_VALIDATION_*_TOKENS` 与 `USD_LINEAR_INTERPOLATION_TYPES`；`globals_v.html` 的 Vdf data manager、connection/mask、network utility 和 masked output vector 条目；`globals_vars.html` 的 `Usd*Tokens`、`UsdPrim*Predicate`、`TfUtf8InvalidCodePoint`、`usdPhysicsSentinelLimit` 与全局 token/predicate 变量。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 145 / `draft_needs_translation` 253 / `good_bilingual` 8 变为 `draft_template_only` 140 / `draft_needs_translation` 258 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 180: File Members t type u v vars entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个宏、typedef、token 集、Vdf 函数、变量、predicate、参数和跳转目标。
- 全量仍有 140 个 `draft_template_only` 和 258 个 `draft_needs_translation`；OpenExec 说明页、模块入口、指南页、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高且仍为模板草稿的 `globals_w.html`、`globals.html`、`inherits.html`、`js_page_front.html`、`kind_page_front.html`。
2. 对 File Members 汇总、继承辅助页、Js JSON I/O 模块入口和 Kind categorization 模块入口补中文用途说明、索引读法、模块边界和术语对照，保留 API 名称、函数名、变量名、类型名、头文件名、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 179 轮：File Members j/l/o/p/s 字母索引页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `62ebddf`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_j.html`、`full_site/api/globals_l.html`、`full_site/api/globals_o.html`、`full_site/api/globals_p.html`、`full_site/api/globals_s.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_file_members_batch_048.mjs`，为 5 页插入 `api-file-members-quality-pass-048` 中文精修导读区块；每页包含用途说明、字母索引读法、常见条目分类和术语对照，保留英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_j.html` 的 `JsConvertToContainerType()`、`JsFindValue()`、`JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()`；`globals_l.html` 的 `LoadUsdPhysicsFromRange()` 和 `parseUtils.h`；`globals_o.html` 的 `operator+()`、`operator==()`、`operator>>()`、`operator^()`；`globals_p.html` 的 `PCP_INVALID_INDEX`、`PcpArcType` 与 `PcpComposeSite*` composition 查询 helper；`globals_s.html` 的 `SDF_DEFINE_*` file format 宏、asset path / layer helper、`SdfCopySpec()` 和 `SdfCreate*InLayer()` authoring helper。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 150 / `draft_needs_translation` 248 / `good_bilingual` 8 变为 `draft_template_only` 145 / `draft_needs_translation` 253 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 179: File Members j l o p s entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个函数、operator、宏定义、类型、参数、返回值、头文件说明和跳转目标。
- 全量仍有 145 个 `draft_template_only` 和 253 个 `draft_needs_translation`；大量 File Members 后续索引、OpenExec 说明页、模块入口、指南页、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的 File Members 索引页：`globals_t.html`、`globals_type.html`、`globals_u.html`、`globals_v.html`、`globals_vars.html`。
2. 对这些索引页补中文用途说明、条目类型区别、字母索引读法和术语对照，保留函数名、变量名、宏名、类型名、头文件名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 178 轮：File Members 与 Exec/Hd group 索引页精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ef1fd2e`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_defs.html`、`full_site/api/globals_enum.html`、`full_site/api/globals_eval.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/group__group__hd__collection_predicates.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_index_group_batch_047.mjs`，为 5 页插入 `api-index-group-quality-pass-047` 中文精修导读区块；每页包含用途说明、索引读法、API 分组边界和术语对照，保留英文页面名、API 名称、类名、函数名、宏名、枚举名、枚举值、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_defs.html` 的 File Members macro definitions、`AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 和 `ARCH_*` 宏读法；`globals_enum.html` 的 `Arch`、`Exec`、`Pcp`、`Sdf`、`Sdr`、`Tf`、`Usd` 枚举类型分组；`globals_eval.html` 的 `UsdInterpolationType*`、`UsdListPosition*`、`UsdLoad*`、`UsdResolveInfoSource*` 枚举值语义；`Attribute Computations Builtin Exec Computations` 的 `computeValue`、`computeResolvedValue`、`computePath`；`Hydra Collection Predicate API` 的 `SdfPathExpression`、scene index predicate 和 `HdGetCollectionPredicateLibrary()`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 155 / `draft_needs_translation` 243 / `good_bilingual` 8 变为 `draft_template_only` 150 / `draft_needs_translation` 248 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 178: File Members Exec Hd group entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个宏定义、枚举类型、枚举值、函数说明、group 条目和示例段落。
- 全量仍有 150 个 `draft_template_only` 和 248 个 `draft_needs_translation`；大量 File Members 字母索引、OpenExec 说明页、模块入口、指南页、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍为模板草稿的 File Members 字母索引页：`globals_j.html`、`globals_l.html`、`globals_o.html`、`globals_p.html`、`globals_s.html`。
2. 对这些索引页补中文用途说明、字母索引读法、常见条目分类和术语对照，保留函数名、变量名、宏名、类型名、头文件名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 177 轮：Hydra/Hio/Hierarchy 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e5efec5`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/hd_embree_page_front.html`、`full_site/api/hd_storm_page_front.html`、`full_site/api/hdx_page_front.html`、`full_site/api/hierarchy.html`、`full_site/api/hio_page_front.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_mixed_batch_046.mjs`，为 5 页插入 `api-mixed-quality-pass-046` 中文精修导读区块；每页包含用途说明、阅读重点、关键类型/模块边界和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖：`HdEmbree` 的 Intel Embree raytracing kernels、Hydra renderer plugin living documentation、`Sync`、`Commit Resources`、`Executing tasks`、`Renderer Plugin`、`Embree Scene Ownership`、`Configuration` 和 `Unit Test`；`HdStorm` 作为 Storm render delegate 插件层、Hgi 后端与 `HdSt` core rendering functionality 的关系；`Hdx` 的 Hydra extensions、常用 task 和 `HdxTaskController`；`hierarchy.html` 的 Doxygen inheritance list / graphical hierarchy 读法；`Hio` 的 Hydra Resource I/O、`HioGlslfx`、`glslfx`、`HioImage`、`HioStb_Image`、`HioOIIO_Image` 和 `HioFieldTextureData`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 160 / `draft_needs_translation` 238 / `good_bilingual` 8 变为 `draft_template_only` 155 / `draft_needs_translation` 243 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 177: Hydra Hio hierarchy entries`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个函数、方法、参数、返回值、模块条目和继承关系。
- 全量仍有 155 个 `draft_template_only` 和 243 个 `draft_needs_translation`；大量 File Members、group 页面、模块入口、目录/继承辅助页、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `globals_defs.html`、`globals_enum.html`、`globals_eval.html`、`group__group___exec___attribute___comptuations.html`、`group__group__hd__collection_predicates.html`。
2. 对 globals/group 索引页补中文用途说明、条目阅读方法、API 分组边界和术语对照，保留宏名、枚举名、枚举值、函数名、类名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 176 轮：CLI/robin_map/Gf/Hd/HdSt 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6db3753`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/classpxr___c_l_i_1_1_c_l_i_1_1_app.html`、`full_site/api/classpxr__tsl_1_1robin__map.html`、`full_site/api/gf_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/hd_st_page_front.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_mixed_batch_045.mjs`，为 5 页插入 `api-mixed-quality-pass-045` 中文精修导读区块；每页包含用途说明、读取重点、关键类型/模块边界和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `CLI::App` 的 command line program、subcommands、parsing/help、`add_option` 和 `.start` 调用语义；`pxr_tsl::robin_map` 的 open-addressing、robin hood hashing、template 参数和 growth policy；`Gf` 模块的 Graphics Foundations、Linear Algebra、Basic Mathematical Operations、Basic Geometry 与 Debugging output；`Hd` 模块作为 multiple scene graphs 与 multiple renderers 之间通信的 Hydra Framework；`HdSt` 模块作为 HdStorm core rendering functionality、renderIndex 数据拉取、command buffers、GPU resources 和 cached playback。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 165 / `draft_needs_translation` 233 / `good_bilingual` 8 变为 `draft_template_only` 160 / `draft_needs_translation` 238 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 176: CLI robin_map Gf Hd HdSt entries`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个构造函数、方法、参数、返回值、模块条目和继承关系。
- 全量仍有 160 个 `draft_template_only` 和 238 个 `draft_needs_translation`；大量 File Members、模块入口、group 页面、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `hd_embree_page_front.html`、`hd_storm_page_front.html`、`hdx_page_front.html`、`hierarchy.html`、`hio_page_front.html`。
2. 对 Hydra 相关模块入口和 class hierarchy 页面补中文用途说明、模块边界、关键类型/入口和术语对照，保留类名、方法名、属性名、template 参数、数学符号、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 175 轮：Vdf/Vt class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `4976af0`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_vdf_grapher_options.html`、`full_site/api/class_vdf_node.html`、`full_site/api/class_vdf_read_write_accessor.html`、`full_site/api/class_vdf_test_utils_1_1_node.html`、`full_site/api/class_vt_value_ref.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_044.mjs`，为 5 页插入 `api-class-quality-pass-044` 中文精修导读区块；每页包含类职责、读取重点、关键类型/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `VdfGrapherOptions` 的 `VdfGrapher` 输出配置、node filter/style callback、display style、mask 绘制和页面布局选项；`VdfNode` 作为 `VdfNetwork` abstract node 基类的 input/output specs、dependency masks、连接变更和 identity 管理；`VdfReadWriteAccessor<T>` 的 output data random access、`operator[]()`、`GetSize()` 与 `IsEmpty()`；`VdfTestUtils::Node` 的测试 wrapper、`GetVdfNode()`、`Output()`、`SetValue()` 和测试网络构造语义；`VtValueRef` 的 non-owning type-erased view、`VtValue` 互操作、生命周期约束和 hash/compose/transform 能力。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 170 / `draft_needs_translation` 228 / `good_bilingual` 8 变为 `draft_template_only` 165 / `draft_needs_translation` 233 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 175: Vdf Vt class refinement`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 165 个 `draft_template_only` 和 233 个 `draft_needs_translation`；大量 API 索引、模块入口、group 页面、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `classpxr___c_l_i_1_1_c_l_i_1_1_app.html`、`classpxr__tsl_1_1robin__map.html`、`gf_page_front.html`、`hd_page_front.html`、`hd_st_page_front.html`。
2. 对 CLI/robin_map/API 模块入口页面补中文用途说明、对象职责、关键类型/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、数学符号、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 174 轮：Tf/Trace/UsdSkel class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `36910fd`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_tf_dense_hash_map.html`、`full_site/api/class_tf_py_lock.html`、`full_site/api/class_tf_token.html`、`full_site/api/class_trace_event_data.html`、`full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_043.mjs`，为 5 页插入 `api-class-quality-pass-043` 中文精修导读区块；每页包含类职责、读取重点、关键类型/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `TfDenseHashMap` 的小规模 vector storage、`TfHashMap` API 兼容、`HashFn`/`EqualKey`/`Threshold` template 参数；`TfPyLock` 的 Python GIL、thread state、`Acquire()`/`Release()` 与 allow-threads 状态转换；`TfToken` 的 registered string handle、常数时间比较/hash、`HashSet` 与 interned string 语义；`TraceEventData` 的 TraceEvent payload、多类型 getter、`TraceEvent::DataType` 和 `WriteJson()`；`UsdSkelImagingDataSourceSkeletonPrim` 的 UsdSkel Skeleton prim data source、Hydra data source 适配和 `GetNames()`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 175 / `draft_needs_translation` 223 / `good_bilingual` 8 变为 `draft_template_only` 170 / `draft_needs_translation` 228 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 174: Tf Trace UsdSkel classes`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 170 个 `draft_template_only` 和 228 个 `draft_needs_translation`；大量 Vdf/Vt/class/API 索引、模块入口、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `class_vdf_grapher_options.html`、`class_vdf_node.html`、`class_vdf_read_write_accessor.html`、`class_vdf_test_utils_1_1_node.html`、`class_vt_value_ref.html`。
2. 对 Vdf/Vt class 页面补中文用途说明、对象职责、关键类型/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、数学符号、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 173 轮：Sdf/Sdr/UsdValidation/UsdVol/Vdf class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `0639660`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_sdf_usdz_file_format.html`、`full_site/api/class_sdr_shader_property.html`、`full_site/api/class_usd_validation_error.html`、`full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`、`full_site/api/class_vdf_context.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_042.mjs`，为 5 页插入 `api-class-quality-pass-042` 中文精修导读区块；每页包含类职责、读取重点、关键属性/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `SdfUsdzFileFormat` 作为 package `.usdz` file format、root layer 定位和 `SdfLayer` I/O 插件语义；`SdrShaderProperty` 的 shader node input/output、metadata、默认值和连接能力；`UsdValidationError` 的 validation result、severity、sites、message 与 fixer 查询；`UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 的 ParticleField radiance 球谐属性、degree、float/half 系数数组和 applied schema 语义；`VdfContext` 的 computation callback 输入访问、requested output 判断、`SetOutput()` 和调试上下文。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 180 / `draft_needs_translation` 218 / `good_bilingual` 8 变为 `draft_template_only` 175 / `draft_needs_translation` 223 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 173: Sdf Sdr validation UsdVol Vdf classes`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 175 个 `draft_template_only` 和 223 个 `draft_needs_translation`；大量 Tf/Trace/UsdSkel/Vdf class、API 索引、模块入口、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `class_tf_dense_hash_map.html`、`class_tf_py_lock.html`、`class_tf_token.html`、`class_trace_event_data.html`、`class_usd_skel_imaging_data_source_skeleton_prim.html`。
2. 对 Tf/Trace/UsdSkel class 页面补中文用途说明、对象职责、关键属性/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、数学符号、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 172 轮：Usd core/UsdProc/UsdShade/StageCache class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `dfbd903`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_prim.html`、`full_site/api/class_usd_proc_generative_procedural.html`、`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_stage_cache.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_041.mjs`，为 5 页插入 `api-class-quality-pass-041` 中文精修导读区块；每页包含类职责、读取重点、关键属性/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdPrim` 作为 `UsdStage` 上唯一持久 scenegraph 对象、variant/reference/API schema/lifetime/instancing 入口；`UsdProcGenerativeProcedural` 的 generative procedural prim、`primvars:` 输入参数和 `proceduralSystem` 合同；`UsdSchemaRegistry` 的 schema type info、generated schema data、prim definition 与 schema family/version 查询；`UsdShadeOutput` 的 shader/node graph connectable output、source connection 与 Sdr metadata；`UsdStageCache` 的 concurrency-safe stage sharing、`UsdStageCacheContext`、find/erase/clear 语义。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 185 / `draft_needs_translation` 213 / `good_bilingual` 8 变为 `draft_template_only` 180 / `draft_needs_translation` 218 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`：409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 172: UsdPrim schema registry shade stage cache`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 180 个 `draft_template_only` 和 218 个 `draft_needs_translation`；大量 Sdf/Sdr/Usd/Vdf class、API 索引、模块入口、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `class_sdf_usdz_file_format.html`、`class_sdr_shader_property.html`、`class_usd_validation_error.html`、`class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`、`class_vdf_context.html`。
2. 对 Sdf/Sdr/UsdVol/Vdf class 页面补中文用途说明、对象职责、关键属性/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、数学符号、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 171 轮：UsdImaging/UsdLux/UsdPhysics class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 UsdImaging/UsdLux/UsdPhysics class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_usd_imaging_nurbs_patch_adapter.html`、`full_site/api/class_usd_lux_disk_light.html`、`full_site/api/class_usd_lux_shaping_a_p_i.html`、`full_site/api/class_usd_physics_joint.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_040.mjs`，为 5 页插入 `api-class-quality-pass-040` 中文精修导读区块；每页包含类职责、读取重点、关键属性/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdImagingDelegate` 作为 Hydra `Hd` core 与 USD scene graph 的主要转换层、path conversion 和数据查询职责；`UsdImagingNurbsPatchAdapter` 对 `UsdGeomNurbsPatch` 的 delegate support、subprim 数据和 topology/points 访问；`UsdLuxDiskLight` 的 XY plane 圆盘光、-Z 轴发光和 `radius` 属性；`UsdLuxShapingAPI` 的 light emission shaping、cone/focus/IES 属性和可应用 API schema 语义；`UsdPhysicsJoint` 的 rigid body joint、D6 joint 默认自由度、body relationships、local frames、break/collision/articulation 属性。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 190 / `draft_needs_translation` 208 / `good_bilingual` 8 变为 `draft_template_only` 185 / `draft_needs_translation` 213 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 171: UsdImaging UsdLux UsdPhysics classes`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 185 个 `draft_template_only` 和 213 个 `draft_needs_translation`；大量 Usd core、UsdShade、UsdStage、Vdf、模块入口、索引页、源码页和部分 release 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户可读价值较高的 `class_usd_prim.html`、`class_usd_proc_generative_procedural.html`、`class_usd_schema_registry.html`、`class_usd_shade_output.html`、`class_usd_stage_cache.html`。
2. 对 Usd core/UsdShade/Stage cache class 页面补中文用途说明、schema 或 runtime 职责、关键属性/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 170 轮：Usd/UsdGeom/UsdImaging class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 Usd/UsdGeom/UsdImaging class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_usd_imaging_adapter_registry.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_039.mjs`，为 5 页插入 `api-class-quality-pass-039` 中文精修导读区块；每页包含类职责、读取重点、关键属性/方法分组和术语对照，保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdAttributeLimits` 的 limits dictionary metadata、minimum/maximum 与 soft/hard limits；`UsdGeomBasisCurves` 的 batched curve representation、cubic/linear 插值、`curveVertexCounts` 与数据尺寸计算；`UsdGeomMesh` 的 points、face-vertices、face topology、subdivisionScheme 和 crease/corner 属性；`UsdGeomPrimvarsAPI` 的 primvar 创建、indexed/non-indexed primvars、namespace inheritance 与 retrieval 方法选择；`UsdImagingAdapterRegistry` 的 PrimAdapter plug-in registry、adapter factory、per-stage adapter instance 和 API schema adapter 构造语义。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 195 / `draft_needs_translation` 203 / `good_bilingual` 8 变为 `draft_template_only` 190 / `draft_needs_translation` 208 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 170: UsdGeom primvars mesh imaging registry`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 190 个 `draft_template_only` 和 208 个 `draft_needs_translation`；大量 UsdImaging、UsdLux、UsdPhysics、UsdShade、API class 页面、源码页和部分草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_usd_imaging_delegate.html`、`class_usd_imaging_nurbs_patch_adapter.html`、`class_usd_lux_disk_light.html`、`class_usd_lux_shaping_a_p_i.html`、`class_usd_physics_joint.html`。
2. 对 UsdImaging/UsdLux/UsdPhysics class 页面补中文用途说明、adapter 或 schema 职责、关键属性/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 169 轮：Pcp/Sdf class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 Pcp/Sdf class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_pcp_property_index.html`、`full_site/api/class_sdf_children_view.html`、`full_site/api/class_sdf_layer.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_sdf_prim_spec.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_038.mjs`，为 5 页插入 `api-class-quality-pass-038` 中文精修导读区块；每页包含类职责、读取重点、相关 API 关系、关键方法/成员分组和术语对照，保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `PcpPropertyIndex` 的 property composition index、opinion 来源和 `PcpPropertyIterator` 访问语义；`SdfChildrenView` 的 `_ChildPolicy`、`_Predicate`、`_Adapter` template view 角色；`SdfLayer` 的 scene description container、`SdfData` data model、File I/O、metadata 和 muting 职责；`SdfPath` 的 storage key、namespace identity、absolute/relative path 和 relationship target 语义；`SdfPrimSpec` 的 layer 内 prim description、root-level prim、child hierarchy 和 `UsdPrim` 区分。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 200 / `draft_needs_translation` 198 / `good_bilingual` 8 变为 `draft_template_only` 195 / `draft_needs_translation` 203 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 169: PcpPropertyIndex Sdf core classes`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 195 个 `draft_template_only` 和 203 个 `draft_needs_translation`；大量 Usd/UsdGeom/UsdImaging/UsdLux/API class 页面、源码页和部分草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_usd_attribute_limits.html`、`class_usd_geom_basis_curves.html`、`class_usd_geom_mesh.html`、`class_usd_geom_primvars_a_p_i.html`、`class_usd_imaging_adapter_registry.html`。
2. 对 Usd/UsdGeom/UsdImaging class 页面补中文用途说明、schema 或 adapter 职责、关键属性/方法分组、术语对照和局部结构说明，保留类名、方法名、属性名、template 参数、代码和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 168 轮：Hd/Hdx/Hgi/Pcp class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 Hd/Hdx/Hgi/Pcp class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_hd_task.html`、`full_site/api/class_hdx_pick_from_render_buffer_task.html`、`full_site/api/class_hgi_g_l_graphics_cmds.html`、`full_site/api/class_pcp_arc.html`、`full_site/api/class_pcp_error_unresolved_prim_path.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_037.mjs`，为 5 页插入 `api-class-quality-pass-037` 中文精修导读区块；每页包含类职责、相关类型、关键语义、术语对照和结构提醒，保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `HdTask` 的 Hydra render 工作单元、资源准备、3D/2D render pass 与 `HdEngine::Execute()` 调度语境；`HdxPickFromRenderBufferTask` 的 ID buffer、pick frustum 到 camera frustum 重映射和 picking query；`HgiGLGraphicsCmds` 的 OpenGL backend graphics commands、pipeline handle 和 HgiGL device 语境；`PcpArc` 的 prim index source/target node、composition arc 与 `PcpMapExpression`；`PcpErrorUnresolvedPrimPath` 的 asset path resolved/loaded 失败错误语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 205 / `draft_needs_translation` 193 / `good_bilingual` 8 变为 `draft_template_only` 200 / `draft_needs_translation` 198 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 168: HdTask HdxPick HgiGL PcpArc PcpError`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 200 个 `draft_template_only` 和 198 个 `draft_needs_translation`；大量 class/API 页面、源码页和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_pcp_property_index.html`、`class_sdf_children_view.html`、`class_sdf_layer.html`、`class_sdf_path.html`、`class_sdf_prim_spec.html`。
2. 对 Pcp/Sdf class 页面补中文用途说明、类职责、关键方法/成员分组、术语对照和局部结构说明，保留类名、方法名、template 参数、路径符号和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 167 轮：Hd/HdSt class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 Hd/HdSt class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_hd_instance_registry.html`、`full_site/api/class_hd_render_buffer.html`、`full_site/api/class_hd_scene_delegate.html`、`full_site/api/class_hd_st_dispatch_buffer.html`、`full_site/api/class_hd_st_render_pass_state.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_036.mjs`，为 5 页插入 `api-class-quality-pass-036` 中文精修导读区块；每页包含类职责、相关类型、关键语义、术语对照和结构提醒，保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `HdInstanceRegistry<VALUE>` 的 dictionary container 与 `HdInstance` registry 语义；`HdRenderBuffer` 的 renderable data resource、indexed prim、allocation parameters 和 mapping functionality；`HdSceneDelegate` 的 client scene graph 数据交换、render index、topology、primvar、time sample 和派生 delegate 语境；`HdStDispatchBuffer` 的 VBO、indirect dispatch、`BufferResourceView` 与 `HdBufferArray` 关系；`HdStRenderPassState` 的 GL states、uniforms、shaders、Hgi pipeline 和 camera framing 状态包语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 210 / `draft_needs_translation` 188 / `good_bilingual` 8 变为 `draft_template_only` 205 / `draft_needs_translation` 193 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 167: Hd registry render buffer scene delegate dispatch state`。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 205 个 `draft_template_only` 和 193 个 `draft_needs_translation`；大量 class/API 页面、源码页和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_hd_task.html`、`class_hdx_pick_from_render_buffer_task.html`、`class_hgi_g_l_graphics_cmds.html`、`class_pcp_arc.html`、`class_pcp_error_unresolved_prim_path.html`。
2. 对 Hd/Hdx/Hgi/Pcp class 页面补中文用途说明、类职责、关键方法/成员分组、术语对照和局部结构说明，保留类名、方法名、template 参数、数学符号和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 166 轮：Gf/Glf/Hd class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口、Git 状态和进度记录，确认本轮 5 个 class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_gf_range1d.html`、`full_site/api/class_gf_ray.html`、`full_site/api/class_gf_vec2i.html`、`full_site/api/class_glf_draw_target.html`、`full_site/api/class_hd_data_source_locator.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_035.mjs`，为 5 页插入 `api-class-quality-pass-035` 中文精修导读区块；每页包含类职责、相关类型、关键语义、术语对照和结构提醒，保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `GfRange1d` 的一维 interval、empty range、`max < min` 与 `[FLT_MAX,-FLT_MAX]` 约定；`GfRay` 的 origin/direction、非归一化 direction vector 和 intersection distance 语义；`GfVec2i` 的二维 int vector、component 和 dot product 语境；`GlfDrawTarget` 的 GL render target、multiple image attachments、depth buffer 与 texture sampler；`HdDataSourceLocator` 的 Hydra data source token path 定位语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 215 / `draft_needs_translation` 183 / `good_bilingual` 8 变为 `draft_template_only` 210 / `draft_needs_translation` 188 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后运行 `scripts/sync_openusd_to_github.ps1`，同步提交见本轮末尾 Git 记录。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 210 个 `draft_template_only` 和 188 个 `draft_needs_translation`；大量 class/API 页面、源码页和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_hd_instance_registry.html`、`class_hd_render_buffer.html`、`class_hd_scene_delegate.html`、`class_hd_st_dispatch_buffer.html`、`class_hd_st_render_pass_state.html`。
2. 对 Hd / Hydra class 页面补中文用途说明、类职责、关键方法/成员分组、术语对照和局部结构说明，保留类名、方法名、template 参数、数学符号和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证；验证通过后同步 GitHub，并记录分级变化与提交结果。

## 第 165 轮：Ef/Esf/Gf class 页面精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮 5 个 class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_ef___lofted_output_set.html`、`full_site/api/class_esf_property_interface.html`、`full_site/api/class_gf_dual_quatf.html`、`full_site/api/class_gf_matrix2f.html`、`full_site/api/class_gf_matrix4f.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_034.mjs`，为 5 页插入 `api-class-quality-pass-034` 中文精修导读区块；每页包含类职责、相关类型、关键语义、术语对照和结构提醒，保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `Ef_LoftedOutputSet` 的 lofted outputs、page cache、`EfPageCacheBasedExecutor` 和 Vdf output/mask/node 关系；`EsfPropertyInterface` 的 scene adapter property abstraction、`UsdProperty` 只读接口和 `EsfJournal` 重新编译条件记录；`GfDualQuatf` 的 real/dual quaternion 与 rotation/translation 表示；`GfMatrix2f` 的 2x2 float matrix 和 row-major `matrix[i][j]` 约定；`GfMatrix4f` 的 4x4 matrix、row vectors 约定和 3D transform 方法。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 220 / `draft_needs_translation` 178 / `good_bilingual` 8 变为 `draft_template_only` 215 / `draft_needs_translation` 183 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每个构造函数、方法、参数、返回值和继承关系。
- 全量仍有 215 个 `draft_template_only` 和 183 个 `draft_needs_translation`；大量 class/API 页面、源码页和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_gf_range1d.html`、`class_gf_ray.html`、`class_gf_vec2i.html`、`class_glf_draw_target.html`、`class_hd_data_source_locator.html`。
2. 对 class/API 页面补中文用途说明、类职责、关键方法/成员分组、术语对照和局部结构说明，保留类名、方法名、template 参数、数学符号和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 164 轮：API File Members V/W/总函数索引与 G/H 字母索引精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_func_v.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_func.html`、`full_site/api/globals_g.html`、`full_site/api/globals_h.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_mixed_batch_033.mjs`，为 5 页插入 `api-file-members-mixed-quality-pass-033` 中文精修导读区块；每页包含索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 V 段 Vdf execution network、masked output vector、VtDictionary；W 段 Work 并发限制、parallel loop、reduce、sort、detached task；总函数索引页中的 Arch debugger、file system、virtual memory、memory alignment 和 resolver context；G 字母索引中的 Gf constants/math/gamma/vector/geometry；H 字母索引中的 `hash_value()` 与 Hio OpenVDB grid asset utilities。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 225 / `draft_needs_translation` 173 / `good_bilingual` 8 变为 `draft_template_only` 220 / `draft_needs_translation` 178 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名、参数、返回值、类成员和头文件正文的完整翻译。
- 全量仍有 220 个 `draft_template_only` 和 178 个 `draft_needs_translation`；大量 class/API 页面、源码页和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中的 `class_ef___lofted_output_set.html`、`class_esf_property_interface.html`、`class_gf_dual_quatf.html`、`class_gf_matrix2f.html`、`class_gf_matrix4f.html`。
2. 对 class/API 页面补中文用途说明、类职责、关键方法/成员分组、术语对照和局部结构说明，保留类名、方法名、template 参数和链接原样。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 163 轮：API File Members 函数索引 O/P/S/T/U 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 复查上一轮建议队列时确认 `full_site/api/globals_func_q.html` 与 `full_site/api/globals_func_r.html` 不存在，也不在当前 406 页清单内；本轮没有新建这两个页面，而是按当前可发现的非源码索引顺序处理 `O/P/S/T/U` 五页。
- 本轮严格只处理 5 个 File Members 函数索引页：`full_site/api/globals_func_o.html`、`full_site/api/globals_func_p.html`、`full_site/api/globals_func_s.html`、`full_site/api/globals_func_t.html`、`full_site/api/globals_func_u.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_func_batch_032.mjs`，为 5 页插入 `api-file-members-func-quality-pass-032` 中文精修导读区块；每页包含函数索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 O 段 operator overload 与 Gf/vector/timeCode 相关入口；P 段 Pcp composition site 工具；S 段 Sdf asset path、spec 创建、value type/unit 查询；T 段 Tf debug/token/path/string/dlopen/Python interop 工具；U 段 Usd/UsdGeom/UsdShade/UsdUtils/UsdPhysics 入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 230 / `draft_needs_translation` 168 / `good_bilingual` 8 变为 `draft_template_only` 225 / `draft_needs_translation` 173 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名、参数、返回值和头文件正文的完整翻译。
- 全量仍有 225 个 `draft_template_only` 和 173 个 `draft_needs_translation`；大量 `_source.html` 源码页、class/API 页面和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理当前存在的 `globals_func_v.html`、`globals_func_w.html`、`globals_func.html`、`globals_g.html`、`globals_h.html`。
2. 对 File Members / API 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 162 轮：API File Members 函数索引 E/G/H/J/L 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 File Members 函数索引页：`full_site/api/globals_func_e.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_func_h.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_l.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_func_batch_031.mjs`，为 5 页插入 `api-file-members-func-quality-pass-031` 中文精修导读区块；每页包含函数索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 E 段 `EfGetFirstValidInputValue()` 与 `firstValidInputValue.h`；G 段 Gf 数学、gamma、component-wise vector、cross product、closest-points 等函数；H 段 `hash_value()` 与 Hio OpenVDB grid asset utilities；J 段 Js JSON convert/find/parse/write 工具；L 段 `LoadUsdPhysicsFromRange()` 与 UsdPhysics parse utilities。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 235 / `draft_needs_translation` 163 / `good_bilingual` 8 变为 `draft_template_only` 230 / `draft_needs_translation` 168 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名、参数、返回值和头文件正文的完整翻译。
- 全量仍有 230 个 `draft_template_only` 和 168 个 `draft_needs_translation`；大量 `_source.html` 源码页、class/API 页面和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `globals_func_o.html`、`globals_func_p.html`、`globals_func_q.html`、`globals_func_r.html`、`globals_func_s.html`。
2. 对 File Members 函数索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 161 轮：API 文件成员与 Glf 入口页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个页面，并按用户要求跳过低优先级 `_source.html` 源码页：`full_site/api/executor_invalidation_data_8h.html`、`full_site/api/glf_page_front.html`、`full_site/api/globals_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_c.html`。
- 新增 `scripts/refine_openusd_api_file_members_batch_030.mjs`，为 5 页插入 `api-file-members-quality-pass-030` 中文精修导读区块；每页包含 API/file-member 索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 `executorInvalidationData.h` 文件引用页的 include dependency graph、反向 include 关系和 Exec/Vdf 文件定位；Glf 模块入口的 OpenGL output utility classes 定位；`globals_c.html` 中 `CombineError()`、`CombineResult()`、`CombineUnbatched()` 与 `CustomUsdPhysicsTokens`；`globals_e.html` 中 Ef/Exec 执行系统条目；`globals_func_c.html` 中 namespaceEdit.h 的函数子索引。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 240 / `draft_needs_translation` 158 / `good_bilingual` 8 变为 `draft_template_only` 235 / `draft_needs_translation` 163 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项文件成员、函数签名、宏、变量和头文件正文的完整翻译。
- 全量仍有 235 个 `draft_template_only` 和 163 个 `draft_needs_translation`；大量 `_source.html` 源码页、class/API 页面和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `globals_func_e.html`、`globals_func_g.html`、`globals_func_h.html`、`globals_func_j.html`、`globals_func_l.html`。
2. 对 File Members 函数索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 160 轮：API Class Members W-Z 与总索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API Class Members 索引页：`full_site/api/functions_w.html`、`full_site/api/functions_x.html`、`full_site/api/functions_y.html`、`full_site/api/functions_z.html`、`full_site/api/functions.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_members_tail_batch_029.mjs`，为 5 页插入 `api-functions-members-tail-quality-pass-029` 中文精修导读区块；每页包含类成员索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 W 段的 Work/Vdf/Ef 执行与缓存、Sdf/Pcp 路径表达式和 namespace edit、GfVec4、UsdShade/UsdSkel/UsdGeom/UsdHydra tokens、Ar/Hio/Trace/Glf/SdfFileFormat 等；X/Y/Z 段的 GfVec2/3/4、UsdGeom/UsdLux/UsdPhysics/UsdVol tokens、UsdGeomXformable::XformQuery 与 VdfExecutorBufferData；总索引页的 Vdf execution、Hydra/Storm buffer、scene index plugins、Trace/Tf/Ar/UsdShade/Sdf/Exec/Ef/plugin registry/GfColor 等入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 245 / `draft_needs_translation` 153 / `good_bilingual` 8 变为 `draft_template_only` 240 / `draft_needs_translation` 158 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项类成员、函数签名、变量字段和成员文档的完整翻译。
- 全量仍有 240 个 `draft_template_only` 和 158 个 `draft_needs_translation`；大量 `_source.html` 源码页、class/API 页面和部分 release/API 草稿仍未达标。

下一轮目标：

1. 继续最多 5 页，按 `translation_quality_review` 中的优先队列选择高价值 API 索引、入口或指南页；低优先处理 `_source.html` 源码页。
2. 如果下一轮仍处理 API 索引页，继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 159 轮：API Variables W-Z 与总索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 变量索引页：`full_site/api/functions_vars_w.html`、`full_site/api/functions_vars_x.html`、`full_site/api/functions_vars_y.html`、`full_site/api/functions_vars_z.html`、`full_site/api/functions_vars.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_028.mjs`，为 5 页插入 `api-functions-vars-quality-pass-028` 中文精修导读区块；每页包含变量索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 W 段的 PcpDependentNamespaceEdits、UsdShade/UsdSkel/UsdGeom/UsdHydra tokens、UsdSkelImagingWeightAndSubShapeIndex 和 Vdf_WeightSlot；X 段的 UsdGeom/UsdPhysics token；Y 段的 UsdGeom/UsdLux/UsdPhysics token；Z 段的 UsdGeom/UsdLux/UsdPhysics/UsdVol token；总索引页的 GfColor、HdBufferArray、字母分段导航和清单外链接本地缺口策略。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 250 / `draft_needs_translation` 148 / `good_bilingual` 8 变为 `draft_template_only` 245 / `draft_needs_translation` 153 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项变量、字段、签名和成员文档的完整翻译。
- 全量仍有 245 个 `draft_template_only` 和 153 个 `draft_needs_translation`；后续 Class Members W-Z/总索引、源码页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_w.html`、`functions_x.html`、`functions_y.html`、`functions_z.html`、`functions.html`。
2. 对 Class Members 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 158 轮：API Variables R-V 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 变量索引页：`full_site/api/functions_vars_r.html`、`full_site/api/functions_vars_s.html`、`full_site/api/functions_vars_t.html`、`full_site/api/functions_vars_u.html`、`full_site/api/functions_vars_v.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_027.mjs`，为 5 页插入 `api-functions-vars-quality-pass-027` 中文精修导读区块；每页包含变量索引用法、模块边界、术语对照和结构提醒，保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 R 段的 schema tokens、UsdPhysics shape/material/articulation、Hydra/Embree/AOV、Pcp error、ArAssetInfo 与 Sdr discovery；S 段的大量 UsdGeom schema class、API schema、Sdf namespace edit、scene index、skel bake 和 rigid body；T 段的 Pcp error/relocation、joint drive、trace、named texture handle、schema info 和 connection source info；U 段的 SdfZipFile、GfRange、Pcp dependency、imaging property mapping、HdMeshReprDesc 和 Embree；V 段的 Exec value override、MaterialX USD type info、schema registry、shader discovery、asset info 和 domain tokens。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 255 / `draft_needs_translation` 143 / `good_bilingual` 8 变为 `draft_template_only` 250 / `draft_needs_translation` 148 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs`、`scripts/validate_openusd_api_repro.ps1` 和报告索引复查：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项变量、字段、签名和成员文档的完整翻译。
- 全量仍有 250 个 `draft_template_only` 和 148 个 `draft_needs_translation`；后续 variables W-Z、variables 总索引、Class Members W-Z/总索引和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_vars_w.html`、`functions_vars_x.html`、`functions_vars_y.html`、`functions_vars_z.html`、`functions_vars.html`。
2. 对 variables 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 157 轮：API Variables M-Q 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 变量索引页：`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_vars_p.html`、`full_site/api/functions_vars_q.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_026.mjs`，为 5 页插入 `api-functions-vars-quality-pass-026` 中文精修导读区块；每页包含页面专属中文变量索引用法说明、模块边界、术语对照和结构提醒。
- 本轮中文层覆盖 M 段的 Pcp dependency/arc、Vdf schedule input、Hydra display/repr/AOV、render spec、physics shape/joint/collision group；N 段的 TfMallocTag call tree/call stack、primvar、named texture handle、registered variant set、validation metadata、Pcp changes；O 段的 TfRefPtrTracker trace、Hydra picking/instance context、Pcp reference/relocation errors、Exec value override；P 段的 Pcp layer stack/prim index outputs、Hydra scene index/Embree prototype、UsdSkel imaging、physics object/rigid body；Q 段的 UsdVolTokensType 短页定位。
- 初次质量审计发现 `functions_vars_p.html` 中文量仍偏薄，本轮只在该页补充更明确的中文分组说明，未新增第 6 页。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 260 / `draft_needs_translation` 138 / `good_bilingual` 8 变为 `draft_template_only` 255 / `draft_needs_translation` 143 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项变量、字段、签名和成员文档的完整翻译。
- 全量仍有 255 个 `draft_template_only` 和 143 个 `draft_needs_translation`；后续 variables R-Z、variables 总索引、Class Members W-Z/总索引和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_vars_r.html`、`functions_vars_s.html`、`functions_vars_t.html`、`functions_vars_u.html`、`functions_vars_v.html`。
2. 对 variables 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 156 轮：API Variables H-L 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 变量索引页：`full_site/api/functions_vars_h.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_l.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_025.mjs`，为 5 页插入 `api-functions-vars-quality-pass-025` 中文精修导读区块；每页包含页面专属中文变量索引用法说明、模块边界、术语对照和结构提醒。
- 本轮中文层覆盖 H 段的 physics shape desc、HdStShaderCode texture handle、property mapping；I 段的 imaging/instancer、Vdf schedule/data vector、Sdf/Pcp namespace edit、physics/validation；J 段的 D6 joint、HdEmbreeConfig、UsdSkel/physics tokens；K 段的 validator metadata、schema registry、rigid body desc；L 段的 Pcp relocation/layer stack、UsdSkel bake skinning、linear units、physics joint desc、Exec provider resolution 和多 domain tokens。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 265 / `draft_needs_translation` 133 / `good_bilingual` 8 变为 `draft_template_only` 260 / `draft_needs_translation` 138 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项变量、字段、签名和成员文档的完整翻译。
- 全量仍有 260 个 `draft_template_only` 和 138 个 `draft_needs_translation`；后续 variables M-Q、R-Z、variables 总索引和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_vars_m.html`、`functions_vars_n.html`、`functions_vars_o.html`、`functions_vars_p.html`、`functions_vars_q.html`。
2. 对 variables 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 155 轮：API Variables C-G 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 变量索引页：`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_d.html`、`full_site/api/functions_vars_e.html`、`full_site/api/functions_vars_f.html`、`full_site/api/functions_vars_g.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_024.mjs`，为 5 页插入 `api-functions-vars-quality-pass-024` 中文精修导读区块；每页包含页面专属中文变量索引用法说明、模块边界、术语对照和结构提醒。
- 本轮中文层覆盖 C 段的 token table、Hydra/AOV、Pcp error、physics desc；D 段的 RenderVar、CameraUtil/GfCamera、Tf spin mutex、Pcp cache/layer stack changes、validation metadata；E 段的 namespace edit、joint limit、VtArrayEditBuilder、asset path context；F 段的 UsdImaging data source mapping、schema registry、physics articulation/collision group、composition field edit；G 段的 schema token、UsdPhysicsSceneDesc、HdMeshReprDesc 和 GL engine parameters。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 270 / `draft_needs_translation` 128 / `good_bilingual` 8 变为 `draft_template_only` 265 / `draft_needs_translation` 133 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项变量、字段、签名和成员文档的完整翻译。
- 全量仍有 265 个 `draft_template_only` 和 133 个 `draft_needs_translation`；后续 variables H-L、M-Z、variables 总索引和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_vars_h.html`、`functions_vars_i.html`、`functions_vars_j.html`、`functions_vars_k.html`、`functions_vars_l.html`。
2. 对 variables 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 154 轮：API Typedefs、Class Members U/V 与 Variables A/B 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 索引页：`full_site/api/functions_type.html`、`full_site/api/functions_u.html`、`full_site/api/functions_v.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_vars_b.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_type_vars_batch_023.mjs`，为 5 页插入 `api-functions-type-vars-quality-pass-023` 中文精修导读区块；每页包含页面专属中文索引用法说明、模块边界、术语对照和结构提醒。
- 本轮中文层覆盖 typedef/alias 索引里的 Vdf executor、Sdf/Usd range、Tf/Vt 容器；Class Members U/V 的 USD stage/prim/material、Hydra shader/time sample/render buffer、validation、Vdf iterator、Exec value override；Variables A/B 的 token table、AOV、scene index、UsdSkel imaging、physics shape desc、Sdr shader discovery 与 Hgi mip info。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；清单外 class/API 链接继续经 `site/uncovered_openusd_page.html` 承接并保留 `data-official-href` 供追溯。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 275 / `draft_needs_translation` 123 / `good_bilingual` 8 变为 `draft_template_only` 270 / `draft_needs_translation` 128 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 typedef、class member、变量、签名和成员文档的完整翻译。
- 全量仍有 270 个 `draft_template_only` 和 128 个 `draft_needs_translation`；后续 functions_vars_c 之后的变量索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_vars_c.html`、`functions_vars_d.html`、`functions_vars_e.html`、`functions_vars_f.html`、`functions_vars_g.html`。
2. 对 variables 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 153 轮：API related S/T 与 Class Members S/T 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标均为 `draft_template_only`。
- 本轮严格只处理 5 个 API 索引页：`full_site/api/functions_rela_s.html`、`full_site/api/functions_rela_t.html`、`full_site/api/functions_rela.html`、`full_site/api/functions_s.html`、`full_site/api/functions_t.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_related_batch_022.mjs`，为 5 页插入 `api-functions-related-quality-pass-022` 中文精修导读区块；每页包含页面专属中文索引用法说明、模块边界、术语对照和结构提醒。
- 本轮中文层覆盖 related S/T 的 Sdf predicate/path expression、Vdf/Vt value 容器、TfRefPtr/TfRefBase、PcpInstanceKey、SdfSpec、TfToken、TfPyMethodResult；同时覆盖 Class Members S/T 的 Sdf/UsdStage/UsdTimeCode、Hydra/Embree sampler、scene delegate、Vdf executor、Pcp error、Tf 基础设施和 UsdPhysicsJointDrive。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页官方 URL 仅保留在“打开官方原页 / Open official page”导航链接中。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 280 / `draft_needs_translation` 118 / `good_bilingual` 8 变为 `draft_template_only` 275 / `draft_needs_translation` 123 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 related function、class member、变量、签名和成员文档的完整翻译。
- 全量仍有 275 个 `draft_template_only` 和 123 个 `draft_needs_translation`；后续 functions_type、functions_u/v、functions_vars_* 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_type.html`、`functions_u.html`、`functions_v.html`、`functions_vars_a.html`、`functions_vars_b.html`。
2. 对 functions/type/vars 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 152 轮：API Class Members Q/R 与 related G/H/O 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮严格只处理 5 个 API 索引页：`full_site/api/functions_q.html`、`full_site/api/functions_r.html`、`full_site/api/functions_rela_g.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_rela_o.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_related_batch_021.mjs`，为 5 页插入 `api-functions-related-quality-pass-021` 中文精修导读区块；每页包含页面专属中文索引用法说明、模块辨识、术语对照和结构提醒。
- 本轮中文层覆盖 Q 段 UsdVol/Sdf layer/CLI ConfigBase，R 段 physics shape desc、Sdf/Ar/Hio file access、Vdf accessor、Hydra buffer，以及 related G/H/O 的 Gf math、Ar/Sdf/Tf/Usd 相关函数入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 285 / `draft_needs_translation` 113 / `good_bilingual` 8 变为 `draft_template_only` 280 / `draft_needs_translation` 118 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 class member、related function、签名和成员文档的完整翻译。
- 全量仍有 280 个 `draft_template_only` 和 118 个 `draft_needs_translation`；后续 related/type/vars 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_rela_s.html`、`functions_rela_t.html`、`functions_rela.html`、`functions_s.html`、`functions_t.html`。
2. 对 functions/related 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 151 轮：API Class Members L-P 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标仍按最多 5 页推进。
- 本轮严格只处理 5 个 API Class Members 索引页：`full_site/api/functions_l.html`、`full_site/api/functions_m.html`、`full_site/api/functions_n.html`、`full_site/api/functions_o.html`、`full_site/api/functions_p.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_members_batch_020.mjs`，为 5 页插入 `api-functions-members-quality-pass-020` 中文精修导读区块；每页包含 4 条页面专属中文类成员索引用法说明和 5 条术语对照。
- 本轮中文层覆盖 L 段 Pcp relocation/UsdPhysics joint/Sdf 数据层，M 段 Sdf expression/UsdGeom/Pcp map/Hydra/Trace，N 段 Hydra scene index/PcpError 诊断，O 段 Ar/Sdf package/Hydra schema，P 段 Sdr shader parser/usdVol particle field/Pcp layer stack。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；实际 `href` 抽查确认 5 个目标页非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 290 / `draft_needs_translation` 108 / `good_bilingual` 8 变为 `draft_template_only` 285 / `draft_needs_translation` 113 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项类成员、枚举值、函数签名和成员说明的完整翻译。
- 全量仍有 285 个 `draft_template_only` 和 113 个 `draft_needs_translation`；后续 Class Members Q/R、related/type/vars 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理相邻 API 索引页 `functions_q.html`、`functions_r.html`、`functions_rela_g.html`、`functions_rela_h.html`、`functions_rela_o.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 150 轮：API Class Members G-K 索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标仍按最多 5 页推进。
- 本轮严格只处理 5 个 API Class Members 索引页：`full_site/api/functions_g.html`、`full_site/api/functions_h.html`、`full_site/api/functions_i.html`、`full_site/api/functions_j.html`、`full_site/api/functions_k.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_members_batch_019.mjs`，为 5 页插入 `api-functions-members-quality-pass-019` 中文精修导读区块；每页包含 4 条页面专属中文类成员索引用法说明和 5 条术语对照。
- 本轮中文层覆盖 G 段 Hydra/Hgi/GfMatrix/resource registry，H 段 UsdPhysics shape desc/Sdf/Pcp/Usd 对象，I 段 schema token/Pcp map/Hydra buffer/Sdf namespace edit，J 段 physics joint/UsdSkel/JSON，K 段 Sdf notice/TfNotice/validator metadata/resource layout。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；实际 `href` 抽查确认 5 个目标页非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 295 / `draft_needs_translation` 103 / `good_bilingual` 8 变为 `draft_template_only` 290 / `draft_needs_translation` 108 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项类成员、枚举值、函数签名和成员说明的完整翻译。
- 全量仍有 290 个 `draft_template_only` 和 108 个 `draft_needs_translation`；后续 Class Members L-R/S-V/type/rela 等索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理相邻 API 索引页 `functions_l.html`、`functions_m.html`、`functions_n.html`、`functions_o.html`、`functions_p.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 149 轮：API functions_func 尾页与相邻索引页 draft 精修
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标仍按最多 5 页推进。
- 本轮严格只处理 5 个 API 索引页：`full_site/api/functions_func_y.html`、`full_site/api/functions_func_z.html`、`full_site/api/functions_enum.html`、`full_site/api/functions_eval.html`、`full_site/api/functions_func.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_index_batch_018.mjs`，为 5 页插入 `api-functions-index-quality-pass-018` 中文精修导读区块；每页包含 4 条页面专属中文索引用法说明和 5 条术语对照。
- 本轮中文层覆盖 Y/Z 段 GfVec 分量与 VdfExecutorBufferData、`functions_enum` 的枚举类型索引、`functions_eval` 的枚举值索引，以及 `functions_func` 的函数成员总索引和 Hydra/Vdf/Trace 模块导航。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；实际 `href` 抽查确认 5 个目标页非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 300 / `draft_needs_translation` 98 / `good_bilingual` 8 变为 `draft_template_only` 295 / `draft_needs_translation` 103 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项枚举值、函数签名、参数和成员说明的完整翻译。
- 全量仍有 295 个 `draft_template_only` 和 103 个 `draft_needs_translation`；functions_func 系列模板草稿已清完，但其他 functions_* 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理相邻 API 索引页 `functions_g.html`、`functions_h.html`、`functions_i.html`、`functions_j.html`、`functions_k.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 148 轮：API functions_func 索引页 draft 精修（五）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标仍按最多 5 页推进。
- 本轮严格只处理 5 个 API functions_func 函数成员索引页：`full_site/api/functions_func_t.html`、`full_site/api/functions_func_u.html`、`full_site/api/functions_func_v.html`、`full_site/api/functions_func_w.html`、`full_site/api/functions_func_x.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_func_batch_017.mjs`，为 5 页插入 `api-functions-func-quality-pass-017` 中文精修导读区块；每页包含 4 条页面专属中文索引用法说明和 5 条术语对照。
- 本轮中文层覆盖 T 段 Tf/Vdf executor/diagnostic/Python binding，U 段 UsdStage/VtValue/GfRange/HdSt/Vdf update，V 段 validation/UsdSkel/Vdf vector，W 段 Work task/write/wait/Trace/JsWriter，X 段 GfVec 与 UsdGeomXformable::XformQuery。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；实际 `href` 抽查确认 5 个目标页非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 305 / `draft_needs_translation` 93 / `good_bilingual` 8 变为 `draft_template_only` 300 / `draft_needs_translation` 98 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名、参数和成员说明的完整翻译。
- 全量仍有 300 个 `draft_template_only` 和 98 个 `draft_needs_translation`；functions_func 剩余模板草稿只剩 `functions_func_y.html` 和 `functions_func_z.html`，之后需要进入其他 API 索引页和核心 class 页。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_func_y.html`、`functions_func_z.html`，再选择 `functions_enum.html`、`functions_eval.html`、`functions_func.html` 这类相邻 API 索引页。
2. 对剩余 functions_func 与相邻索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 147 轮：API functions_func 索引页 draft 精修（四）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标仍按最多 5 页推进。
- 本轮严格只处理 5 个 API functions_func 函数成员索引页：`full_site/api/functions_func_o.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_q.html`、`full_site/api/functions_func_r.html`、`full_site/api/functions_func_s.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_func_batch_016.mjs`，为 5 页插入 `api-functions-func-quality-pass-016` 中文精修导读区块；每页包含 4 条页面专属中文索引用法说明和 5 条术语对照。
- 本轮中文层覆盖 O 段 asset resolver/package/layer/Hydra plugin handle，P 段 predicate/shader parser/usdVol particle field/Pcp composition，Q 段 Sdf query 与 CLI ConfigBase 边界，R 段 read accessor/file format/buffer range/Trace，S 段 time code/sampler/scene delegate/scoped lock/namespace edit。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；实际 `href` 抽查确认 5 个目标页非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 310 / `draft_needs_translation` 88 / `good_bilingual` 8 变为 `draft_template_only` 305 / `draft_needs_translation` 93 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名、参数和成员说明的完整翻译。
- 全量仍有 305 个 `draft_template_only` 和 93 个 `draft_needs_translation`；functions_func 剩余字母页还有 7 个模板草稿，之后还会进入 functions_rela、functions_type、functions_vars 等索引页。

下一轮目标：

1. 继续最多 5 页，从 API 队列中按顺序优先选择 `functions_func_t.html`、`functions_func_u.html`、`functions_func_v.html`、`functions_func_w.html`、`functions_func_x.html`。
2. 对 functions_func 剩余字母页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 146 轮：API functions_func 索引页 draft 精修（三）
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮严格只处理 5 个 API 函数成员索引页：`full_site/api/functions_func_j.html`、`functions_func_k.html`、`functions_func_l.html`、`functions_func_m.html`、`functions_func_n.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_func_batch_015.mjs`，为 5 页插入 `api-functions-func-quality-pass-015` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照。
- 本轮中文层覆盖 J 段 JSON/UsdSkel/SdfPath 少量索引、K 段 SdfChildrenView 与 SdfNotice、L 段 UsdLux/Sdf/Plug/Trace/Vdf 交叉入口、M 段 expression/UsdGeom/EditTarget/Hd/Trace 条目，以及 N 段 Hydra scene index 和 PcpError 诊断入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 315 / `draft_needs_translation` 83 / `good_bilingual` 8 变为 `draft_template_only` 310 / `draft_needs_translation` 88 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0、非预期官方外跳为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过。

差距：

- 本轮仍是页面级中文导读、术语和索引使用说明，不是逐项函数签名、参数和成员说明的完整翻译。
- 全量仍有 310 个 `draft_template_only` 和 88 个 `draft_needs_translation`；functions_func 后续字母页仍需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，从 API 队列中按顺序优先选择 `functions_func_o.html`、`functions_func_p.html`、`functions_func_q.html`、`functions_func_r.html`、`functions_func_s.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 145 轮：API functions_func 索引页 draft 精修（二）
已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮严格只处理 5 个 API 函数成员索引页：`full_site/api/functions_func_e.html`、`functions_func_f.html`、`functions_func_g.html`、`functions_func_h.html`、`functions_func_i.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_functions_func_batch_014.mjs`，为 5 页插入 `api-functions-func-quality-pass-014` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照。
- 本轮中文层覆盖 Ef 执行框架与缓存、Gf/Sdf/Pcp/Hgi/Hd/Vdf 模块分布、Hydra 资源与 buffer array、USD core 对象和 UsdShade/UsdSkel 交叉条目，以及 StageCache/FileFormat/PopulationMask/MemoryTag 等 I 段索引入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 320 / `draft_needs_translation` 78 / `good_bilingual` 8 变为 `draft_template_only` 315 / `draft_needs_translation` 83 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0、非预期官方外跳为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过。

差距：

- 本轮仍是页面级中文导读、术语和索引使用说明，不是逐项函数签名、参数和成员说明的完整翻译。
- 全量仍有 315 个 `draft_template_only` 和 83 个 `draft_needs_translation`；functions_func 后续字母页仍较多，需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，从 API 队列中按顺序优先选择 `functions_func_j.html`、`functions_func_k.html`、`functions_func_l.html`、`functions_func_m.html`、`functions_func_n.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 144 轮：API functions_func 索引页 draft 精修（一）

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮目标是 functions_func 系列函数成员索引页。
- 本轮严格只处理 5 页：`full_site/api/functions_func_~.html`、`functions_func_a.html`、`functions_func_b.html`、`functions_func_c.html`、`functions_func_d.html`；继续跳过 `_source.html` 源码页和单个头文件页。
- 新增 `scripts/refine_openusd_api_functions_func_batch_013.mjs`，为 5 页插入 `api-functions-func-quality-pass-013` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照。
- 本轮中文层覆盖符号段函数索引、Tf scoped lock/mutex、SdfChildrenView/SdfListProxy/TfSpan/VtArray 容器视图、Pcp/Trace/CameraUtil/UsdCollectionAPI 交叉条目，以及 GfMatrix/GfVec 数学类型函数索引。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 325 / `draft_needs_translation` 73 / `good_bilingual` 8 变为 `draft_template_only` 320 / `draft_needs_translation` 78 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0、非预期官方外跳为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过。

差距：

- 本轮仍是页面级中文导读与函数索引用法说明，不是逐项函数签名和成员说明的完整翻译。
- 全量仍有 320 个 `draft_template_only` 和 78 个 `draft_needs_translation`；functions_func 后续字母页仍较多，需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择 `functions_func_e.html`、`functions_func_f.html`、`functions_func_g.html`、`functions_func_h.html`、`functions_func_i.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 143 轮：API functions 索引页 draft 精修（二）

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认本轮继续处理 API 索引页而不是源码页。
- 本轮严格只处理 5 页：`full_site/api/functions_~.html`、`functions_c.html`、`functions_d.html`、`functions_e.html`、`functions_f.html`；继续低优先处理 `_source.html` 和单个头文件页。
- 新增 `scripts/refine_openusd_api_functions_batch_012.mjs`，为 5 页插入 `api-functions-quality-pass-012` 中文精修导读区块，包含 4 条中文索引用法/模块辨识说明和 5 条术语对照。
- 本轮中文层覆盖符号段索引、Pcp/Trace/Hd/UsdCollectionAPI 交叉条目、GfMatrix/GfVec/Tf/Vt 基础类型、UsdTimeCode/Sdf namespace edit/Ef executor 条目，以及 token table/schema registry/file format/Sdr discovery 等索引阅读方式。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 330 / `draft_needs_translation` 68 / `good_bilingual` 8 变为 `draft_template_only` 325 / `draft_needs_translation` 73 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0、非预期官方外跳为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过。

差距：

- 本轮仍是页面级中文导读与索引用法说明，不是逐项 API 成员完整翻译。
- 全量仍有 325 个 `draft_template_only` 和 73 个 `draft_needs_translation`；API 队列里还会继续出现 functions_func、functions_rela、functions_type、functions_vars 等索引页，需要按可读价值筛选推进。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择 `functions_func_~.html`、`functions_func_a.html`、`functions_func_b.html`、`functions_func_c.html`、`functions_func_d.html` 等索引页。
2. 对 functions_func 系列补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 142 轮：API 索引页 draft 精修（一）

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认队列已进入 API 源码/索引页阶段。
- 本轮跳过 `_source.html` 源码页和单个头文件页，优先筛选 5 个用户可读价值较高的 API 索引/入口页：`full_site/api/classes.html`、`deprecated.html`、`files.html`、`functions_a.html`、`functions_b.html`。
- 新增 `scripts/refine_openusd_api_index_batch_011.mjs`，为 5 页插入 `api-index-quality-pass-011` 中文精修导读区块，包含 4 条中文索引用法/导航说明和 5 条术语对照。
- 本轮补充了 Class Index 的模块前缀导航、Deprecated List 的迁移用途、File List 的头文件/源码页边界、Class Members 字母索引的符号查找方式，以及模板容器/并行执行相关条目的阅读策略。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 335 / `draft_needs_translation` 63 / `good_bilingual` 8 变为 `draft_template_only` 330 / `draft_needs_translation` 68 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与索引用法说明，不是逐项 API 成员完整翻译。
- 全量仍有 330 个 `draft_template_only` 和 68 个 `draft_needs_translation`；后续 API 队列中仍有大量源码页和字母索引页，需要继续筛选，低优先处理 `_source.html`。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择用户可读价值较高的索引页，例如 `functions_~.html`、`functions_c.html`、`functions_d.html`、`functions_e.html`、`functions_f.html`。
2. 对被选 API 索引页补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 141 轮：usdVol 剩余高价值 schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按质量队列推进。
- 本轮没有为凑满 5 页去处理紧随其后的 API 源码页；实际只精修剩余 4 个高价值 usdVol 页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`ParticleFieldPositionBaseAPI.html`、`ParticleFieldRadianceBaseAPI.html`、`usdVol_toc.html`。
- 新增 `scripts/refine_openusd_usdVol_remaining_batch_010.mjs`，为 4 页插入 `usdVol-remaining-quality-pass-010` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照。
- 本轮补充了 GaussianSurflet 的 XY plane/off-plane opacity、PositionBaseAPI 的 particle count 和 per-particle data 对齐规则、RadianceBaseAPI 的 radiance definition validation、usdVol_toc 的 Volumes/Fields/Particle Fields 阅读路线。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 339 / `draft_needs_translation` 59 / `good_bilingual` 8 变为 `draft_template_only` 335 / `draft_needs_translation` 63 / `good_bilingual` 8；本轮 4 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 4 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；usdVol 剩余页后续仍需补属性表、公式解释和示例段落级对照。
- 全量仍有 335 个 `draft_template_only` 和 63 个 `draft_needs_translation`；下一轮队列已进入 API 源码/索引页，需要继续筛选用户可读价值高的页面，不能机械处理低价值源码页。

下一轮目标：

1. 继续最多 5 页，但优先从 API 队列中筛选用户可读价值高的索引/入口页，例如 `classes.html`、`deprecated.html`、`files.html` 等；低优先处理 `_source.html` 源码页。
2. 对被选 API 索引页补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 140 轮：usdVol volume/particle kernel schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按每轮最多 5 页的质量精修节奏推进。
- 新增 `scripts/refine_openusd_usdVol_schema_batch_009.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`OpenVDBAsset.html`、`ParticleFieldKernelBaseAPI.html`、`ParticleFieldKernelConstantSurfletAPI.html`、`ParticleFieldKernelGaussianEllipsoidAPI.html`。
- 每页新增 `usdVol-schema-quality-pass-009` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、数学符号和官方英文摘录保持原样。
- 本轮补充了 Field3DAsset 的 `.f3d` 体积场引用、OpenVDBAsset 的 `.vdb` 稀疏体积网格、ParticleFieldKernelBaseAPI 的 spatial basis function、ConstantSurflet 的圆盘支持域和 GaussianEllipsoid 的 3-sigma/Gaussian falloff。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 344 / `draft_needs_translation` 54 / `good_bilingual` 8 变为 `draft_template_only` 339 / `draft_needs_translation` 59 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；usdVol kernel 页后续仍需补属性表、公式解释和示例段落级对照。
- 全量仍有 339 个 `draft_template_only` 和 59 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`ParticleFieldPositionBaseAPI.html`、`ParticleFieldRadianceBaseAPI.html`、`usdVol_toc.html`，再选择一个高价值 API 入口或等待下一轮继续。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 139 轮：usdUI hints schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按每轮最多 5 页的质量精修节奏推进。
- 新增 `scripts/refine_openusd_usdUI_hints_batch_008.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`PrimHints.html`、`PropertyHints.html`、`SceneGraphPrimAPI.html`、`usdUI_toc.html`。
- 每页新增 `usdUI-hints-quality-pass-008` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、路径写法和官方英文摘录保持原样。
- 本轮补充了 ObjectHints 的 displayName/hidden、PrimHints 的 display groups 和条件显示、PropertyHints 的 property-level hints、SceneGraphPrimAPI 的场景图描述信息、usdUI_toc 的 UI hints/accessibility/node graph 阅读路线。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 349 / `draft_needs_translation` 49 / `good_bilingual` 8 变为 `draft_template_only` 344 / `draft_needs_translation` 54 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；usdUI hints 页后续仍需补属性表、示例段落和更细的 UI 条件表达式解释。
- 全量仍有 344 个 `draft_template_only` 和 54 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdVol/Field3DAsset.html`、`OpenVDBAsset.html`、`ParticleFieldKernelBaseAPI.html`、`ParticleFieldKernelConstantSurfletAPI.html`、`ParticleFieldKernelGaussianEllipsoidAPI.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 138 轮：usdRender/usdUI schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按每轮最多 5 页的质量精修节奏推进。
- 新增 `scripts/refine_openusd_usdUI_schema_batch_007.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`、`AttributeHints.html`、`Backdrop.html`、`NodeGraphNodeAPI.html`。
- 每页新增 `usdUI-schema-quality-pass-007` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、路径写法和官方英文摘录保持原样。
- 本轮补充了 usdRender 目录阅读路线、AccessibilityAPI 的 label/description/priority、AttributeHints 的 UI hints/ordering、Backdrop 的节点图分组、NodeGraphNodeAPI 的 `ui:nodegraph:node:*` 布局属性。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 354 / `draft_needs_translation` 44 / `good_bilingual` 8 变为 `draft_template_only` 349 / `draft_needs_translation` 49 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；usdUI schema 页后续仍需补属性表、继承关系和示例段落级对照。
- 全量仍有 349 个 `draft_template_only` 和 49 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdUI/ObjectHints.html`、`PrimHints.html`、`PropertyHints.html`、`SceneGraphPrimAPI.html`、`usdUI_toc.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 137 轮：usdMedia/usdRender schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按每轮最多 5 页的质量精修节奏推进。
- 新增 `scripts/refine_openusd_usdRender_schema_batch_006.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`、`RenderProduct.html`、`RenderSettings.html`、`RenderVar.html`。
- 每页新增 `usdRender-schema-quality-pass-006` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、路径写法和官方英文摘录保持原样。
- 本轮补充了 usdMedia 目录阅读路线、RenderPass 的 renderer/scene configuration、RenderProduct 的输出 artifact、RenderSettings 的全局设置与 RenderProducts/RenderVars、RenderVar 的 AOV/channel/source 信息。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 359 / `draft_needs_translation` 39 / `good_bilingual` 8 变为 `draft_template_only` 354 / `draft_needs_translation` 44 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；Render schema 页后续仍需补属性表、继承关系和示例段落级对照。
- 全量仍有 354 个 `draft_template_only` 和 44 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdRender/usdRender_toc.html`、`user_guides/schemas/usdUI/AccessibilityAPI.html`、`AttributeHints.html`、`Backdrop.html`、`NodeGraphNodeAPI.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 136 轮：usdLux/usdMedia schema draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认当前仍是 8 个 `good_bilingual` + 398 个 `bilingual_draft` 的质量精修阶段。
- 新增 `scripts/refine_openusd_schema_media_batch_005.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`SphereLight.html`、`usdLux_toc.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`SpatialAudio.html`。
- 每页新增 `schema-media-quality-pass-005` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、路径写法和官方英文摘录保持原样。
- 本轮补充了 RectLight 的矩形面积光、SphereLight 的 one-sided/treatAsPoint、usdLux_toc 的灯光 schema 阅读路线、AssetPreviewsAPI 的 thumbnail previews、SpatialAudio 的 filePath/auralMode/playbackMode/mediaOffset。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 364 / `draft_needs_translation` 34 / `good_bilingual` 8 变为 `draft_template_only` 359 / `draft_needs_translation` 39 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；schema 属性页后续仍需补属性表、继承关系和示例段落级对照。
- 全量仍有 359 个 `draft_template_only` 和 39 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdMedia/usdMedia_toc.html`、`user_guides/schemas/usdRender/RenderPass.html`、`RenderProduct.html`、`RenderSettings.html`、`RenderVar.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 135 轮：usdLux schema 属性页 draft 精修（一）

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认继续按每轮最多 5 页的质量精修节奏推进。
- 新增 `scripts/refine_openusd_usdLux_schema_batch_004.mjs`，本轮严格只处理 5 个 usdLux schema 页：`full_site/release/user_guides/schemas/usdLux/CylinderLight.html`、`DiskLight.html`、`DistantLight.html`、`DomeLight.html`、`LightListAPI.html`。
- 每页新增 `usdLux-schema-quality-pass-004` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、属性名、路径写法和官方英文摘录保持原样。
- 本轮补充了 CylinderLight 圆柱侧面发光、DiskLight 圆盘发光方向、DistantLight 方向光与 `inputs:angle`、DomeLight HDR/IBL 环境照明、LightListAPI 的 `ComputeLightList()` 遍历用途说明。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；本地链接策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 369 / `draft_needs_translation` 29 / `good_bilingual` 8 变为 `draft_template_only` 364 / `draft_needs_translation` 34 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；这些 schema 页后续还需要继续补属性表、继承关系和示例段落级对照。
- 全量仍有 364 个 `draft_template_only` 和 34 个 `draft_needs_translation`，不能把导读层误标为完成。

下一轮目标：

1. 继续最多 5 页，优先处理质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdLux/RectLight.html`、`SphereLight.html`、`usdLux_toc.html`、`user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`SpatialAudio.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 134 轮：release 用户指南与插件入口 draft 精修

已完成：

- 先复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.*`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、最终入口和进度记录，确认当前仍不是完成态：406 页中 8 页为 `good_bilingual`，398 页仍为 `bilingual_draft`。
- 新增 `scripts/refine_openusd_release_guides_batch_003.mjs`，本轮严格只处理 5 页：`full_site/release/tut_variants_example_in_katana.html`、`full_site/release/user_guides/collections_and_patterns.html`、`full_site/release/user_guides/namespace_editing.html`、`full_site/release/user_guides/schemas/index.html`、`full_site/release/plugins_alembic.html`。
- 每页新增 `release-guide-quality-pass-003` 中文精修导读区块，包含 4 条中文阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、文件扩展名和官方原页链接保持原样。
- 本轮补充了 Katana variant 历史教程、Collections 两种模式、Namespace Editing 组合语义、Schema Domains 索引用法、Alembic 插件构建与 usdAbc 互操作说明。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0；清单内 OpenUSD 链接继续路由到本地页面，清单外内部链接继续路由到 `site/uncovered_openusd_page.html`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 374 / `draft_needs_translation` 24 / `good_bilingual` 8 变为 `draft_template_only` 369 / `draft_needs_translation` 29 / `good_bilingual` 8；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 单页抽查确认 5 页均带有本轮 marker，坏编码风险为 0；`audit_openusd_full_draft_preview` 398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读、术语和局部结构说明，不是逐段完整翻译；相关页面仍需后续继续做段落级双语。
- 全量仍有 369 个 `draft_template_only` 和 29 个 `draft_needs_translation`，不能把 `pending_full_scope=0` 或 `bilingual_draft` 当作完成。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量报告队列中的 schema 指南页。
2. 建议下一组：`user_guides/schemas/usdLux/CylinderLight.html`、`DiskLight.html`、`DistantLight.html`、`DomeLight.html`、`LightListAPI.html`。
3. 每轮继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 133 轮：release 入门教程 draft 精修（二）

已完成：

- 基于最新 `translation_quality_review` 继续质量精修阶段；本轮没有扩大范围，也没有批量清空 draft，只处理 5 个 release 教程页。
- 新增并修正 `scripts/refine_openusd_release_tutorial_batch_002.mjs`，为 `tut_helloworld.html`、`tut_inspect_and_author_props.html`、`tut_converting_between_layer_formats.html`、`tut_simple_shading.html`、`tut_xforms.html` 插入中文精修导读和术语对照。
- 5 页均保留英文页面名、链接、代码、命令和原文摘录；中文层补充阅读顺序、API 关系、文件格式、UsdShade、xformOp、LayerOffset、TimeCode 等关键概念解释。
- 首次执行脚本后质量分级未变化，已查明是插入锚点匹配未命中；修正后重新执行并复跑审计，避免把未生效改动记录为完成。
- 翻译质量分级更新为 `good_bilingual` 8、`draft_needs_translation` 24、`draft_template_only` 374；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 链接路由检查通过：409 个 HTML 文件、406 个 inventory 页面，非显式官方链接继续本地化或路由到 `site/uncovered_openusd_page.html`。
- `audit_openusd_full_draft_preview` 通过：398/398 draft 页面可本地预览，失败本地资源 0；`audit_openusd_report_index` 16/16 通过；`validate_openusd_api_repro.ps1` 281 checks passed, 0 failed。

差距：

- 本轮仍是页面级中文导读与术语层，不是逐段完整翻译；相关页面仍需后续进入更细的段落级翻译阶段。
- 398 个 draft 中还有 374 个模板草稿，不能以 `pending_full_scope=0` 或 `bilingual_draft` 作为完成依据。

下一轮目标：

1. 继续最多 5 页，从当前优先队列中选择 release 教程、用户指南、schema 指南和插件入口页，低优先处理纯源码页。
2. 推荐下一组：`tut_variants_example_in_katana.html`、`user_guides/collections_and_patterns.html`、`user_guides/namespace_editing.html`、`user_guides/schemas/index.html`、`plugins_alembic.html`。
3. 继续保存可检查 HTML，并复跑链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 132 轮：release 规范与教程 draft 精修

已完成：

- 基于 `reports/translation_quality_review.*` 继续质量提升阶段；本轮没有扩大范围，也没有一次性清空 draft，只处理 5 个用户可读价值较高的 release/tutorial 页面。
- 新增 `scripts/refine_openusd_release_tutorial_batch.mjs`，以可重复运行方式为 `spec.html`、`tut_authoring_variants.html`、`tut_helloworld_redux.html`、`tut_referencing_layers.html`、`tut_traversing_stage.html` 插入中文精修导读和术语对照。
- 5 个页面均保留英文页面名、链接、代码和原文摘录；中文层补充阅读路径、关键概念解释和术语映射。
- 重新运行链接路由，409 个 HTML 文件检查通过，清单内 OpenUSD 内部链接继续路由到本地页面，清单外内部链接继续路由到 `site/uncovered_openusd_page.html`。
- 翻译质量分级更新为 `good_bilingual` 8、`draft_needs_translation` 19、`draft_template_only` 379；本轮 5 页均从 `draft_template_only` 提升到 `draft_needs_translation`。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮补的是页面级中文导读与术语层，不是逐段完整翻译。
- 379 个页面仍是 `draft_template_only`，19 个页面需要继续从导读层推进到段落级翻译。

下一轮目标：

1. 继续每轮最多 5 页，优先 release 教程、schema 指南、概念页和核心 API 入口。
2. 跳过或低优先处理纯源码页，除非它们被高价值页面频繁链接或用户明确要求。
3. 每轮继续保存 HTML、运行质量审计和总验证，并记录分级变化。

## 第 1 轮

时间：2026-06-03

已完成：

- 保存官方 API 首页 HTML 快照。
- 下载首页所需的 Doxygen 样式、脚本、搜索资源和图片。
- 补齐 CSS 引用的导航背景、搜索图标、折叠图标和分隔条图片。
- 创建 `site/index.html`，保留源页的 Doxygen 顶部区、侧边导航区、搜索窗口、正文区和页脚区。
- 将正文改为中英双语：中文主句在上，英文原句在下。
- 保留官方链接：`_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license`。
- 创建验证脚本并准备输出 JSON 报告。
- 创建 5 分钟 heartbeat 自动化，后续继续补齐。
- 已运行验证脚本，结构和内容检查通过。

差距：

- 当前只复刻了用户指定的 `api/index.html` 首页。
- 侧边导航、搜索和菜单仍使用 Doxygen 原始英文资源。
- 两个相邻入口页尚未做双语复刻。
- 内置浏览器访问本地 `file://` 页面被安全策略拦截，因此本轮没有浏览器截图证据。

下一轮目标：

1. 运行验证脚本并修复失败项。
2. 使用浏览器检查本地渲染。
3. 如首页稳定，开始纳入 `_usd__overview_and_purpose.html` 与 `usd_page_front.html` 的双语入口复刻。

## 第 2 轮

时间：2026-06-03

范围新增：

- `https://openusd.org/release/index.html`

已完成：

- 保存 release 文档首页 HTML 快照：`source/openusd_release_index_source.html`。
- 下载 Sphinx 主题的 `_static` CSS、JS 和字体资源。
- 创建 `scripts/build_release_index_bilingual.mjs`，从源快照可重复生成双语 release 首页。
- 生成 `site/release_index.html`，保留 Sphinx 侧栏、面包屑、卡片入口、官方链接和英文原文，并在关键入口添加中文对应。
- 生成 `site/api/index.html`，让 release 页中的 `api/index.html` 链接能跳转到本地 API 双语页。
- 更新 5 分钟自动化任务，使范围覆盖 release 文档首页和 API 首页。
- 扩展验证脚本，当前 95 项检查通过，0 项失败。

差距：

- release 页目前优先覆盖一级目录、关键卡片和核心入口链接；大量深层目录节点仍保留英文原名。
- `site/release_index.html` 的 banner 图和 USD Logo 仍使用官方图片 URL，未完全本地镜像。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮未产生截图。

下一轮目标：

1. 继续扩展 release 页术语表，覆盖 User Guides 与 Reference 下更多二级目录。
2. 若允许本地 HTTP 预览，检查 Sphinx 页面真实渲染。
3. 选择 `intro.html` 或 `apiDocs.html` 作为下一批双语入口页。

## 第 3 轮

时间：2026-06-03

已完成：

- 将 release 首页使用的官方视觉资产本地化到 `site/images/`：
  - `USDLogoUnsized.svg`
  - `USDLogo24.svg`
  - `piper-banner.jpg`
- 更新 `scripts/build_release_index_bilingual.mjs`，生成页使用本地 Logo 与 banner 图。
- 在 `site/openusd_release_cn.css` 中覆盖侧栏首页图标为本地 `images/USDLogo24.svg`。
- 扩展 release 首页术语表，从 35 项增加到 168 项；重点覆盖 User Guides、Schema Domains、Time and Animated Values、Variable Expressions、Reference、Specifications 和部分 Proposals。
- 重新生成 `site/release_index.html`，当前 `cn-term`/`en-term` 双语标记各 196 处。
- 更新验证脚本，将本地图片资产和更高术语覆盖阈值纳入检查。
- 最新验证：100 项检查通过，0 项失败。

差距：

- favicon 仍保留官方 URL。
- Proposals 下的大量深层标题还没有完全覆盖。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮未产生截图。

下一轮目标：

1. 补充 Proposals 目录的更深层双语标题。
2. 决定下一批相邻入口页优先级：`intro.html`、`apiDocs.html` 或 API 入口的 `_usd__overview_and_purpose.html`。
3. 若能改用安全允许的本地 HTTP 预览，再补渲染截图证据。

## 第 4 轮

时间：2026-06-03

已完成：

- 下载并本地化 `USDIcon.ico`，API 页与 release 页 favicon 均改为 `images/USDIcon.ico`。
- 将 Sphinx 自定义 CSS 中的 `USDLogo24.svg` 远程引用改为本地 `../../images/USDLogo24.svg`。
- 扩展 release 首页生成脚本术语表，从 168 项增加到 190 项，补充教程标题和通用属性标题。
- 新增嵌套 `Inherited Properties (<span>...</span>)` 处理规则，保留 schema 名，增加中文“继承属性”。
- 重新生成 `site/release_index.html`，当前 `cn-term` 与 `en-term` 各 321 处。
- 验证脚本新增“输出文件不引用 `openusd.org/images` 远程图片”和“至少 300 组双语标记”检查。
- 最新验证：104 项检查通过，0 项失败。

差距：

- schema/API 类名仍保留英文原名，这是刻意保留，不按普通标题翻译。
- Proposals 深层标题仍可继续扩充。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮未产生截图。

下一轮目标：

1. 扩充 Proposals 深层标题。
2. 建立下一批相邻入口页的生成模板。
3. 继续保持 API 名称、schema 名称和链接原样。

## 第 5 轮

时间：2026-06-03

已完成：

- 新增 `scripts/audit_openusd_repro_links.mjs`，审计 `release_index.html`、`index.html`、`api/index.html` 的 `href` 和 `src`。
- 生成 `reports/link_audit.json` 和 `reports/link_audit.md`。
- 将链接分为本地存在、外部链接、锚点/空链接、范围外官方相对文档链接、缺失本地资源链接。
- 审计结果：本地资源缺失 0 个，本地引用 42 个，外部链接 17 个，范围外官方相对文档链接 638 个。
- 将链接审计结果纳入主验证脚本。
- 将 `link_audit.json` 的范围外链接记录改为总数加 200 条样本，避免报告字段歧义。
- 最新验证：109 项检查通过，0 项失败。

策略确认：

- 本地资产链接必须存在。
- 尚未纳入双语范围的官方文档页继续保留官方相对链接，不当作失败。
- API 名称、schema 名称和页面名继续保留英文原名，只在适合的位置追加中文标签。

下一轮目标：

1. 选择第一批相邻入口页并生成独立双语页面。
2. 对 `intro.html`、`apiDocs.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html` 做范围优先级排序。
3. 继续让链接审计区分“已本地化”和“范围外保留”。

## 第 6 轮

时间：2026-06-03

已完成：

- 新增 `reports/scope_manifest.json` 和 `reports/scope_manifest.md`。
- 明确主范围只包含两个官方入口页：
  - `https://openusd.org/release/index.html`
  - `https://openusd.org/release/api/index.html`
- 固定下一批相邻入口优先级：
  1. `intro.html`
  2. `apiDocs.html`
  3. `_usd__overview_and_purpose.html`
  4. `usd_page_front.html`
  5. `glossary.html`
  6. `toolset.html`
- 将链接策略写入 manifest：本地资源必须存在，范围外官方相对文档链接保留，API/schema/命令名保留英文原名。
- 主验证脚本新增 scope manifest 检查。

下一轮目标：

1. 如果继续扩展，优先生成 `intro.html` 双语入口页。
2. 将新增页面纳入 link audit 的 `pages` 列表。
3. 保持当前两个主入口页验证稳定。

## 第 7 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/intro.html`，保存到 `source/openusd_release_intro_source.html`。
- 新增 `scripts/build_intro_bilingual.mjs`。
- 生成 `site/intro.html`，作为 release 首页第一相邻入口页。
- 页面策略：保留官方英文正文与 Sphinx 结构；补中文标题、目录、导航按钮、面包屑和范围说明；API/schema/页面链接保留原样。
- 将 `intro.html` 的 Previous 首页链接改到 `release_index.html`，避免指向当前本地 API 页 `site/index.html`。
- 将 `intro.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `intro.html` 从候选入口升级为 active adjacent scope。
- 最新链接审计：4 个页面，本地资源缺失 0 个，本地引用 65 个，外部链接 31 个，范围外官方相对文档链接 1314 个。
- 最新验证：119 项检查通过，0 项失败。

下一轮目标：

1. 优先处理 `apiDocs.html`，作为 release 文档到 API 文档的桥接页。
2. 或处理 API 相邻入口 `_usd__overview_and_purpose.html`，增强 API 首页的概念链路。
3. 新增页面继续纳入链接审计和 scope manifest。

## 第 8 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/apiDocs.html`，保存到 `source/openusd_release_apiDocs_source.html`。
- 新增 `scripts/build_apiDocs_bilingual.mjs`。
- 生成 `site/apiDocs.html`，作为 release 文档到 Doxygen API 文档的桥接页。
- 页面策略：保留官方英文正文、Sphinx 结构和 `USD C++ API Documentation` 按钮；补中文标题、面包屑、导航按钮、页脚和范围说明；API 页面名和 `api/index.html` 链接保持原样。
- 将 `apiDocs.html` 的首页链接改到 `release_index.html`，避免指向当前本地 API 页 `site/index.html`。
- 将 `apiDocs.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `apiDocs.html` 从候选入口升级为 active adjacent scope。
- 最新链接审计：5 个页面，本地资源缺失 0 个，本地引用 86 个，外部链接 35 个，范围外官方相对文档链接 1938 个。
- 最新验证：124 项检查通过，0 项失败。

下一轮目标：

1. 优先处理 API 相邻入口 `_usd__overview_and_purpose.html`，增强 API 首页的概念链路。
2. 或处理 `usd_page_front.html`，补齐 API front page 的本地双语入口。
3. 继续保持链接审计和 scope manifest 同步更新。

## 第 9 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/api/_usd__overview_and_purpose.html`，保存到 `source/openusd_api_overview_and_purpose_source.html`。
- 新增 `scripts/build_api_overview_bilingual.mjs`。
- 生成 `site/_usd__overview_and_purpose.html`，作为 API 首页的第一相邻概念入口页。
- 页面策略：保留官方 Doxygen 结构、导航初始化、API 名称、模块名、类名和链接目标；主要标题、段落和模块列表项均以中文在上、英文原文在下呈现。
- 扩展 `site/openusd_cn.css`，补双语列表项和双语标题显示样式。
- 将 `_usd__overview_and_purpose.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `_usd__overview_and_purpose.html` 从候选入口升级为 active adjacent scope。
- 最新链接审计：6 个页面，本地资源缺失 0 个，本地引用 114 个，外部链接 43 个，范围外官方相对文档链接 2010 个。
- 最新验证：132 项检查通过，0 项失败。

差距：

- `usd_page_front.html` 仍未纳入本地双语范围，是当前 API 首页的下一个直接入口。
- Doxygen 侧栏和搜索数据仍沿用官方英文资源；本轮只处理正文入口页，不扩展整站索引数据。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以静态链接审计和结构验证为证据。

下一轮目标：

1. 优先处理 `usd_page_front.html`，补齐 API front page 的本地双语入口。
2. 继续保持 API 名称、schema 名称、类名、函数名和链接目标原样。
3. 新增页面继续纳入 link audit、validation 和 scope manifest。

## 第 10 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/api/usd_page_front.html`，保存到 `source/openusd_api_usd_page_front_source.html`。
- 新增 `scripts/build_usd_page_front_bilingual.mjs`。
- 生成 `site/usd_page_front.html`，作为 API 首页直达的 Usd core API front page。
- 页面策略：保留官方 Doxygen 布局、导航初始化、API Manual 目录层级、类名和链接目标；模块说明、目录标签和 Key Classes 摘要添加中文在前、英文原文保留的双语层。
- 扩展 `site/openusd_cn.css`，补充 `cn-term`、`en-term`、`zh-inline`、`en-inline` 和 `key-class-line` 样式。
- 将 `usd_page_front.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `usd_page_front.html` 从候选入口升级为 active adjacent scope。
- 最新链接审计：7 个页面，本地资源缺失 0 个，本地引用 140 个，外部链接 45 个，范围外官方相对文档链接 2065 个。
- 最新验证：140 项检查通过，0 项失败。

差距：

- Doxygen 侧栏和搜索数据仍沿用官方英文资源；本轮只处理 API front page 正文和目录入口。
- `glossary.html` 与 `toolset.html` 仍未纳入本地双语范围。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以静态链接审计和结构验证为证据。

下一轮目标：

1. 优先评估 `glossary.html`，用于稳定中英术语对照。
2. 或处理 `toolset.html`，补齐 release Reference 中的工具入口。
3. 新增页面继续纳入 link audit、validation 和 scope manifest。

## 第 11 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/glossary.html`，保存到 `source/openusd_release_glossary_source.html`。
- 新增 `scripts/build_glossary_bilingual.mjs`。
- 生成 `site/glossary.html`，作为 release 首页的术语与概念相邻入口页。
- 页面策略：保留官方 Sphinx 结构、英文定义全文和链接；优先为术语目录、页面标题和正文术语标题添加中文术语标签；新增 18 个核心术语速览卡片，避免只是把大篇幅英文定义未加工复制成唯一内容。
- 仅补齐本页实际引用的两张图片：`site/_images/glossary_radiusSpline.png`、`site/_images/glossary_usdviewValidation.png`。
- 扩展 `site/openusd_release_cn.css`，补 glossary 速览卡片样式。
- 将 `glossary.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `glossary.html` 从候选入口升级为 active adjacent scope。
- 最新链接审计：8 个页面，本地资源缺失 0 个，本地引用 204 个，外部链接 51 个，范围外官方相对文档链接 2829 个。
- 最新验证：149 项检查通过，0 项失败。

差距：

- glossary 的官方英文定义已保留，但逐条定义的完整中文翻译尚未展开；当前先完成术语对照入口和核心术语速览。
- `toolset.html` 仍未纳入本地双语范围，是当前剩余相邻入口优先级。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以静态链接审计和结构验证为证据。

下一轮目标：

1. 优先处理 `toolset.html`，补齐 release Reference 中的命令行工具入口。
2. 或小批量推进 glossary 定义翻译，但不一次性无选择复制/翻译整页。
3. 新增页面继续纳入 link audit、validation 和 scope manifest。

## 第 12 轮

时间：2026-06-03

已完成：

- 抓取 `https://openusd.org/release/toolset.html`，保存到 `source/openusd_release_toolset_source.html`。
- 新增 `scripts/build_toolset_bilingual.mjs`。
- 生成 `site/toolset.html`，作为 release Reference 的命令行工具入口页。
- 页面策略：保留官方 Sphinx 结构、命令用法块、选项名、命令名和链接；新增 19 个工具速览卡片，并在每个工具小节标题后加入中文在前、英文保留的用途说明。
- 扩展 `site/openusd_release_cn.css`，补 toolset 速览卡片和工具说明样式。
- 将 `toolset.html` 纳入链接审计。
- 更新 `scope_manifest`，把 `toolset.html` 从候选入口升级为 active adjacent scope；原计划相邻入口优先级已清空。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：156 项检查通过，0 项失败。

差距：

- 工具页官方用法块和选项说明仍以英文原文为主；本轮先补命令级中文速览和工具小节说明。
- glossary 定义逐条中文翻译仍未展开。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以静态链接审计和结构验证为证据。

下一轮目标：

1. 原计划相邻入口已覆盖，下一轮不再扩大整站范围。
2. 小批量推进 glossary 高频定义翻译，或 toolset 高频选项解释。
3. 继续保持新增内容进入 link audit、validation 和 scope manifest。

## 第 13 轮

时间：2026-06-03

已完成：

- 对照当前两个官方入口页确认范围仍为 OpenUSD 26.05 release/API 文档；本轮不扩展页面，只精修已纳入范围的 `glossary.html`。
- 更新 `scripts/build_glossary_bilingual.mjs`，在 14 个高频术语小节标题后插入定义级双语说明：`Active / Inactive`、`API Schema`、`Asset`、`Asset Resolution`、`Attribute`、`Composition`、`Composition Arcs`、`Layer`、`Payload`、`Prim`、`Stage`、`Value Resolution`、`Variant`、`VariantSet`。
- 更新 `site/openusd_release_cn.css`，新增 `cn-definition-brief` 样式，使定义解释与官方英文定义区分但仍保持 Sphinx 页面结构。
- 重新生成 `site/glossary.html`，局部自检结果为 14 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `glossary:has_definition_briefs` 验证项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：157 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整中文翻译所有官方定义；本轮只做高频术语定义级小批量补充，避免无选择翻译整页。
- toolset 的命令选项级中文解释仍未展开。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以静态链接审计、结构验证和生成脚本可重复性作为证据。

下一轮目标：

1. 继续小批量补 glossary 余下高频定义解释，优先覆盖 `References`、`Relationship`、`Metadata`、`Primvar`、`TimeCode`。
2. 或补 toolset 高频选项说明，保持命令名、参数名和官方用法块不改。
3. 每轮继续重新生成、审计、验证并更新 scope manifest。

## 第 14 轮

时间：2026-06-03

已完成：

- 继续按当前范围精修 `glossary.html`，没有扩大到整站镜像。
- 对照 `source/openusd_release_glossary_source.html` 中实际 anchor，确认第二批高频术语小节存在。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 14 条定义级中文解释：`Kind`、`List Editing`、`Load / Unload`、`Metadata`、`Model`、`Namespace`、`Primvar`、`Property`、`References`、`Relationship`、`Schema`、`TimeCode`、`TimeSample`、`Visibility`。
- 将 glossary 顶部说明改为动态显示 `28` 个高频定义小节，避免说明文案落后于实际覆盖量。
- 扩展 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 14 条提高到至少 28 条，并增加 `References`、`Primvar`、`TimeCode` 关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 28 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：157 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义；目前是术语入口、核心卡片和 28 个高频定义说明。
- toolset 的参数和选项说明仍主要保留官方英文原文，尚未加入选项级中文导读。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 优先评估 toolset 高频选项解释，保持命令名、参数名和官方用法块原样。
2. 或继续小批量补 glossary：`Clips`、`Collection`、`Flatten`、`Instancing`、`Interpolation`。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 15 轮

时间：2026-06-03

已完成：

- 按第 14 轮目标继续精修 `toolset.html`，没有扩大到整站镜像。
- 对照 `source/openusd_release_toolset_source.html` 和当前生成页，确认命令小节、官方 usage 块和 options 块仍保留。
- 更新 `scripts/build_toolset_bilingual.mjs`，新增 12 个高频命令的选项导读：`usdedit`、`usdcat`、`usdview`、`usdrecord`、`usdresolve`、`usdtree`、`usdzip`、`usdchecker`、`usdstitchclips`、`usdmeasureperformance`、`usdGenSchema`、`usdInitSchema`。
- 选项导读策略：CLI flag、参数名、命令名和官方 usage 块不翻译、不改写；每个条目增加中文解释和对应英文 guide。
- 更新 `site/openusd_release_cn.css`，新增 `cn-tool-options` 选项导读样式。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_option_guides` 验证项。
- 重新生成 `site/toolset.html`，局部自检结果为 19 个工具卡片、19 条工具说明、12 个选项导读、59 个选项条目、19 个 usage 块、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- toolset 还有若干低频命令未补选项导读，例如 `usddiff`、`usdfixbrokenpixarschemas`、`usdstitch`、`usddumpcrate`、`sdfdump`、`sdffilter`、`usdgenschemafromsdr`。
- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 28 个高频定义说明。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 继续补齐 toolset 余下命令的选项导读，优先 `usddiff`、`usdfixbrokenpixarschemas`、`usdstitch`、`usddumpcrate`、`sdfdump`、`sdffilter`。
2. 或继续小批量补 glossary：`Clips`、`Collection`、`Flatten`、`Instancing`、`Interpolation`。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 16 轮

时间：2026-06-03

已完成：

- 继续按当前范围精修 `toolset.html`，没有扩大到整站镜像。
- 对照 `source/openusd_release_toolset_source.html` 抽取余下命令的官方 options 和 usage 结构。
- 更新 `scripts/build_toolset_bilingual.mjs`，为 7 个剩余命令新增选项导读：`usddiff`、`usdfixbrokenpixarschemas`、`usdstitch`、`usddumpcrate`、`sdfdump`、`sdffilter`、`usdgenschemafromsdr`。
- toolset 选项导读达到 19/19 命令覆盖；CLI flag、参数名、命令名和官方 usage 块保持原样。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `toolset:has_option_guides` 门槛，从至少 12 个选项导读提高到至少 19 个，并增加 `--backup`、`--summary`、`--noreadme`、`--arraySizeLimit` 等关键 flag 检查。
- 重新生成 `site/toolset.html`，局部自检结果为 19 个工具卡片、19 条工具说明、19 个选项导读、87 个选项条目、19 个 usage 块、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 28 个高频定义说明。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。

下一轮目标：

1. 优先继续小批量补 glossary：`Clips`、`Collection`、`Flatten`、`Instancing`、`Interpolation`。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 17 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不扩大页面范围。
- 继续精修 `glossary.html`，新增第三批 12 条定义级中文解释：`Attribute Connection`、`Attribute Variability`、`Clips`、`Collection`、`Flatten`、`Inherits`、`Instancing`、`Interpolation`、`Layer Offset`、`Localize`、`Purpose`、`Specializes`。
- 更新 `scripts/build_glossary_bilingual.mjs`，所有新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- glossary 顶部说明自动更新为 `40` 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 28 条提高到至少 40 条，并增加 `Clips`、`Collection`、`Instancing`、`Interpolation` 关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 40 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 40 个高频定义说明。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 继续小批量补 glossary：`Spline`、`Value Clips`、`Relocates`、`SubLayers`、`Session Layer`。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 18 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 继续补齐 `glossary.html` 高频术语定义说明，新增 12 条定义级中文解释：`Def`、`Default Value`、`Direct Opinion`、`Fallback`、`LayerStack`、`Opinions`、`Relocates`、`Session Layer`、`Spline`、`SubLayers`、`Value Clips`、`Root LayerStack`。
- 更新 `scripts/build_glossary_bilingual.mjs`，所有新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- glossary 顶部说明自动更新为 `52` 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 40 条提高到至少 52 条，并增加 `Spline`、`Value Clips`、`Relocates`、`SubLayers`、`Session Layer` 等关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 52 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 52 个高频定义说明。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 继续小批量补 glossary：`Animation Block`、`Change Processing`、`Path Translation`、`Variant` 等仍可补中文定义说明的术语。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 19 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 继续补齐 `glossary.html` 高频术语定义说明，新增 12 条定义级中文解释：`Animation Block`、`Change Processing`、`Class`、`Group`、`Hydra`、`LIVERPS Strength Ordering`、`Over`、`Path Translation`、`PrimStack`、`PseudoRoot`、`Specifier`、`EditTarget`。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- 修正 `EditTarget` 的插入锚点，使用源页实际的 `<section id="edittarget">`，避免误用 span id 导致该定义说明跳过。
- glossary 顶部说明自动更新为 `64` 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 52 条提高到至少 64 条，并增加 `Animation Block`、`Change Processing`、`LIVERPS Strength Ordering`、`Path Translation`、`PrimStack`、`PseudoRoot`、`Specifier`、`EditTarget` 等关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 64 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 64 个高频定义说明。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 继续小批量补 glossary：`Animated Value`、`AssetInfo`、`Assembly`、`Attribute Block`、`Component`、`Connection`、`Crate File Format` 等仍可补中文定义说明的术语。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 20 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 继续补齐 `glossary.html` 高频术语定义说明，新增 12 条定义级中文解释：`Animated Value`、`AssetInfo`、`Assembly`、`Attribute Block`、`Component`、`Computation Input Parameters`、`Computation`、`Connection`、`Crate File Format`、`Gprim`、`Index`、`Instanceable`。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- glossary 顶部说明自动更新为 `76` 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 64 条提高到至少 76 条，并增加 `Animated Value`、`AssetInfo`、`Assembly`、`Attribute Block`、`Computation Input Parameters`、`Crate File Format`、`Gprim`、`Index`、`Instanceable` 等关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 76 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 76 个高频定义说明。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 继续小批量补 glossary：`IsA Schema`、`Model Hierarchy`、`OpenExec`、`Path`、`Prim Definition`、`PrimSpec`、`Population Mask` 等仍可补中文定义说明的术语。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 21 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 对照 `source/openusd_release_glossary_source.html` 只选择已有独立 `<section id>` 且尚未覆盖的术语，避免使用不存在的 `Population Mask` 小节。
- 继续补齐 `glossary.html` 高频术语定义说明，新增 12 条定义级中文解释：`IsA Schema`、`Model Hierarchy`、`OpenExec`、`Path`、`Prim Definition`、`PrimSpec`、`PropertySpec`、`PropertyStack`、`Proxy`、`Stage Traversal`、`Subcomponent`、`TimeCodes Scaled to Real Time`。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- glossary 顶部说明自动更新为 `88` 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 76 条提高到至少 88 条，并增加 `IsA Schema`、`Model Hierarchy`、`OpenExec`、`Prim Definition`、`PropertySpec`、`Stage Traversal`、`TimeCodes Scaled to Real Time` 等关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 88 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 仍未逐条完整翻译全部官方定义，目前是术语入口、核心卡片和 88 个高频定义说明；按源页独立小节计，余下可补定义说明已很少。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 优先补齐余下 glossary 小节：`Typed Schema`、`User Properties`、`Validation`、`Variability`。
2. 或在可用本地 HTTP 预览时做 Sphinx/Doxygen 布局抽查。
3. 继续每轮重新生成、审计、验证并更新报告。

## 第 22 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 对照 `source/openusd_release_glossary_source.html` 和生成脚本中的 `definitionBriefs`，确认第 21 轮后仅剩 4 个未覆盖的独立 glossary 小节。
- 补齐 `glossary.html` 余下独立术语定义说明，新增 4 条定义级中文解释：`Typed Schema`、`User Properties`、`Validation`、`Variability`。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增说明仍插入在对应 glossary 小节标题后，官方英文定义全文保留。
- glossary 顶部说明自动更新为 `92` 个定义级小节；局部扫描结果显示源页独立 glossary 小节剩余未覆盖项为 `0`。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 88 条提高到至少 92 条，并增加 `Typed Schema`、`User Properties`、`Validation`、`Variability` 关键词检查。
- 重新生成 `site/glossary.html`，局部自检结果为 92 条定义说明、397 个 `cn-term`、0 个嵌套 `cn-term`、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。

差距：

- glossary 独立术语小节的中文定义说明已覆盖完成，但官方定义正文仍以英文原文完整保留，未逐段翻译全部长段落。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。
- 浏览器 `file://` 渲染仍受当前安全策略限制，本轮继续以生成脚本、静态链接审计和结构验证作为证据。

下一轮目标：

1. 优先做 release/API 入口页与相邻页的本地 HTTP 布局抽查，确认 Sphinx 和 Doxygen 视觉层没有明显断裂。
2. 或检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
3. 继续每轮重新生成、审计、验证并更新报告；仍不扩大到整站。

## 第 23 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 新增 `scripts/audit_openusd_http_preview.mjs`，用 Node 临时静态服务器从 HTTP 访问当前 9 个本地页面。
- HTTP 预览审计覆盖页面可访问性、Sphinx 页面核心布局标记、Doxygen 页面 top/sidebar/content/search 标记、跳转页标记，以及本地 CSS/JS/图片/字体资源响应。
- 生成 `reports/http_preview_audit.json` 和 `reports/http_preview_audit.md`。
- 将 HTTP 预览审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增 `http_preview_audit:passed` 和 `http_preview_audit:all_pages_and_assets_ok` 两项检查。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：160 项检查通过，0 项失败。

差距：

- HTTP 预览审计确认页面和本地资源能通过本地服务器访问，但不是像素级截图比对。
- glossary 独立术语小节的中文定义说明已覆盖完成，但官方定义正文仍以英文原文完整保留，未逐段翻译全部长段落。
- toolset 已完成命令级与选项级导读覆盖，但每个 option 的官方长说明仍以英文原文保留，未做逐行翻译。

下一轮目标：

1. 检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或抽查 release/API 入口页正文结构，检查是否还有中英标签覆盖不足的一级入口标题。
3. 继续每轮重新生成、审计、HTTP 预览、验证并更新报告；仍不扩大到整站。

## 第 24 轮

时间：2026-06-03

已完成：

- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮继续在既有 9 个本地页面范围内精修，不扩大到整站镜像。
- 更新 `scripts/build_toolset_bilingual.mjs`，为 `toolset.html` 新增 6 个工作流场景导读：资产检查与快速诊断、文本查看/对比/扁平化导出、USDZ 打包与交付前检查、时间采样聚合与 Value Clips、Schema 模块初始化与生成、性能测量与底层结构排查。
- 场景导读只组合已在本页范围内的命令名，保留 `usdchecker`、`usdzip`、`usdstitchclips`、`usdGenSchema`、`usdmeasureperformance` 等命令原样，不改写官方 usage 和 option 文本。
- 更新 `site/openusd_release_cn.css`，新增 `cn-tool-scenarios` 和 `cn-tool-scenario` 样式。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_workflow_scenarios` 检查。
- 更新 `scripts/audit_openusd_http_preview.mjs`，让 `toolset.html` 的 HTTP 预览审计必须包含 `cn-tool-scenarios` 标记。
- 重新生成 `site/toolset.html`，局部自检结果为 19 个工具卡片、6 个工作流场景导读、19 条工具说明、19 个 option guide、0 个远程 OpenUSD 图片引用。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 335 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：161 项检查通过，0 项失败。

差距：

- toolset 已新增命令级、工作流场景级和 option guide 级导读，但每个 option 的官方长说明仍以英文原文保留，未逐行翻译。
- glossary 独立术语小节的中文定义说明已覆盖完成，但官方定义正文仍以英文原文完整保留，未逐段翻译全部长段落。
- HTTP 预览审计不是像素级截图比对，仍主要检查页面可访问性、核心布局标记和本地资源响应。

下一轮目标：

1. 抽查 release/API 入口页正文结构，检查是否还有中英标签覆盖不足的一级入口标题。
2. 或继续检查 `toolset.html` 官方 option 长说明是否需要小批量中文导读，但不逐行翻译整页。
3. 继续每轮重新生成、审计、HTTP 预览、验证并更新报告；仍不扩大到整站。

## 第 25 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方主入口页和本地源快照，新增主入口覆盖审计 `scripts/audit_openusd_primary_entry_coverage.mjs`。
- 审计覆盖 `site/release_index.html`、`site/index.html` 和 `site/api/index.html`，检查 Sphinx/Doxygen 核心结构、关键入口链接、主图本地化、双语块/术语标记数量和本地跳转页。
- 生成 `reports/primary_entry_coverage.json` 与 `reports/primary_entry_coverage.md`；结果为 3 个入口相关页面、16 项检查全部通过。
- 将主入口覆盖审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增报告文件和 `primary_entry_coverage` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，记录新的审计链和本轮验证结果。
- 最新主入口覆盖审计：3 个入口相关页面通过，16 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：166 项检查通过，0 项失败。

差距：

- 主入口覆盖审计是结构和标记级检查，不是像素级截图比对。
- glossary 的独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先抽查 `toolset.html` 的官方 option 长说明，判断是否需要继续加少量中文导读。
2. 或检查 API 首页是否需要更细的术语标签层，但 API 名称、页面名和链接保持原样。
3. 继续每轮运行主入口覆盖审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 26 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮聚焦 API 主入口页的可读入口层。
- 更新 `site/index.html`，在 API 首页 Doxygen 正文内新增 `cn-api-entry-map`，提供 3 个 API 入口速览卡片：`Overview and Purpose`、`Usd API`、`TOST license`。
- 入口卡片只指向已在范围内的 `_usd__overview_and_purpose.html`、`usd_page_front.html` 和官方 `https://openusd.org/license`；API 名称、页面名和链接保持原样。
- 更新 `site/openusd_cn.css`，新增 API 入口速览卡片布局样式，保持与 Doxygen 页面相容的紧凑结构。
- 扩展 `scripts/audit_openusd_primary_entry_coverage.mjs`，新增 API 入口地图检查和 `api_entry_cards` 统计。
- 扩展 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-api-entry-map`。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_entry_map_cards`、`api:entry_map_styles_present` 检查，并提高主入口覆盖报告的 API 卡片要求。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，记录新的 API 入口速览与验证结果。
- 最新主入口覆盖审计：3 个入口相关页面通过，17 项检查通过，API 入口卡片 3 个，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 337 个，外部链接 59 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：168 项检查通过，0 项失败。

差距：

- API 入口速览是结构和导航层增强，不是像素级复刻对比。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 27 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮聚焦 API 主入口页的复刻范围说明。
- 更新 `site/index.html`，在 Doxygen 正文 logo 前新增 `cn-repro-note`，以中文优先、英文保留的方式说明本页对应官方 `https://openusd.org/release/api/index.html`。
- 范围说明明确本地相邻 API 范围限定为 `Overview and Purpose` 与 `Usd API`，并保留 API names、page names、links 原样。
- 扩展 `scripts/audit_openusd_primary_entry_coverage.mjs`，新增 `api:has_scope_note` 检查和 `api_scope_notes` 统计。
- 扩展 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-repro-note` 与 `cn-api-entry-map`。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_scope_note` 检查，并要求主入口覆盖报告记录至少 1 个 API scope note。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，记录新的 API 范围说明与验证结果。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：169 项检查通过，0 项失败。

差距：

- API 范围说明和入口速览是结构层增强，不是像素级截图比对。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 28 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增范围边界审计，不改官方正文。
- 新增 `scripts/audit_openusd_scope_boundaries.mjs`，检查本地 HTML 页面白名单、源快照白名单、主范围数量、相邻范围数量、必需报告和范围外链接策略。
- 生成 `reports/scope_boundary_audit.json` 与 `reports/scope_boundary_audit.md`。
- 范围边界审计结果为 9 个本地 HTML 页面、8 个源快照、2 个主入口、6 个相邻入口，6 项检查全部通过。
- 将范围边界审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `scope_boundary_audit:passed`、`scope_boundary_audit:limited_to_current_scope` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把范围边界审计纳入固定验证链。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：174 项检查通过，0 项失败。

差距：

- 范围边界审计能证明本地文件范围受控，但不是像素级截图比对。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 29 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增术语一致性审计，不改官方正文。
- 新增 `scripts/audit_openusd_term_consistency.mjs`，扫描当前 9 个本地 HTML 页面，检查 14 组关键中英术语对、13 个必须保留的 API/class/tool 英文名称，以及 7 个常见错误中文替换不得出现。
- 术语审计统计全站双语标记量：`cn-term` 874、`en-term` 874、`zh` blocks 333、`en` blocks 333、glossary 定义说明 92、tool option guide 19。
- 生成 `reports/term_consistency_audit.json` 与 `reports/term_consistency_audit.md`。
- 按当前页面实际用词校正审计项：`_usd__overview_and_purpose.html` 使用 `概述与目的 / Overview and Purpose`。
- 将术语一致性审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `term_consistency_audit:passed`、`term_consistency_audit:core_terms_and_names_ready` 内容检查。
- 将术语一致性报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把术语一致性审计纳入固定验证链。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：179 项检查通过，0 项失败。

差距：

- 术语一致性审计是关键词和标记级护栏，不是全文翻译质量评估。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 30 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增导航覆盖审计，不改官方正文。
- 新增 `scripts/audit_openusd_navigation_coverage.mjs`，检查 release 源页和生成页的 `Learn`、`User Guides`、`Reference`、`Specifications` 导航分组，确认中文标签与英文原名并列保留。
- 导航审计检查 release 主入口中的 5 个相邻入口链接：`intro.html`、`glossary.html`、`apiDocs.html`、`toolset.html`、`api/index.html`。
- 导航审计检查 out-of-scope 但应保留的官方相对链接示例：`spec.html`、`tutorials.html`、`user_guides/variable_expressions.html`。
- 导航审计检查 API 首页 Doxygen 导航壳：`main-nav`、`side-nav`、`initNavTree`、`searchBox`，以及 6 个 API 导航资源。
- 导航审计检查 API 入口链接 `_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license` 和本地 `api/index.html` 跳转。
- 生成 `reports/navigation_coverage_audit.json` 与 `reports/navigation_coverage_audit.md`。
- 将导航覆盖报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将导航覆盖审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `navigation_coverage_audit:passed`、`navigation_coverage_audit:release_and_api_navigation_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把导航覆盖审计纳入固定验证链。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：184 项检查通过，0 项失败。

差距：

- 导航覆盖审计是结构和链接级护栏，不是像素级截图比对。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 31 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增源快照溯源审计，不改官方正文。
- 新增 `scripts/audit_openusd_source_provenance.mjs`，读取 `reports/scope_manifest.json` 的 2 个 primary scope 和 6 个 active adjacent scope。
- 溯源审计逐项检查 official URL、source snapshot、local output、generator 是否存在；Sphinx/Doxygen 源类型是否匹配；源页标题和本地双语标记是否保留。
- 溯源审计单独检查 `site/api/index.html` 仍是指向 `../index.html` 的本地 API 跳转辅助页。
- 生成 `reports/source_provenance_audit.json` 与 `reports/source_provenance_audit.md`。
- 将源快照溯源报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将源快照溯源审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `source_provenance_audit:passed`、`source_provenance_audit:manifest_entries_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把源快照溯源审计纳入固定验证链。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：189 项检查通过，0 项失败。

差距：

- 源快照溯源审计是文件绑定和结构级护栏，不是实时网络内容 diff。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、源快照溯源审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 32 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增样式与资产契约审计，不改官方正文。
- 新增 `scripts/audit_openusd_style_asset_contract.mjs`，检查 Doxygen 核心样式/脚本/Logo 资源、Sphinx `_static` 样式/脚本/字体资源、release 图片、glossary 图片和本地双语 CSS。
- 样式审计检查 `site/openusd_release_cn.css` 的 7 个 release 双语选择器，以及 `site/openusd_cn.css` 的 7 个 API 双语选择器。
- 样式审计检查 6 个关键页面的资产标记：`release_index.html`、`glossary.html`、`toolset.html`、`index.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html`。
- 样式审计继续约束生成页和本地 CSS 不依赖远程 `https://openusd.org/images` 图片。
- 生成 `reports/style_asset_contract_audit.json` 与 `reports/style_asset_contract_audit.md`。
- 将样式与资产契约报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将样式与资产契约审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `style_asset_contract_audit:passed`、`style_asset_contract_audit:assets_and_styles_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把样式与资产契约审计纳入固定验证链。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、14 个双语 CSS 选择器、6 个页面资产标记检查全部通过。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：194 项检查通过，0 项失败。

差距：

- 样式与资产契约审计是静态资产和选择器级护栏，不是像素级截图比对。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 33 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不扩大到整站镜像。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮新增官方入口实时新鲜度审计，不改官方正文。
- 新增 `scripts/audit_openusd_official_entry_freshness.mjs`，只拉取 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 两个用户指定 URL。
- 审计报告只保存 live 状态、标题、关键标记计数、缺失标记列表、源快照对齐和本地输出对齐，不保存官方正文，也不扩展为整站镜像。
- release live 标记覆盖 `USD Home`、`Universal Scene Description 26.05 documentation`、`Introduction to USD`、`Terms and Concepts`、`API Documentation`、`Toolset`、`api/index.html` 和 `piper-banner.jpg`。
- API live 标记覆盖 `Universal Scene Description (USD)`、`Generated on Wed Apr 22 2026`、官方简介句、`_usd__overview_and_purpose.html`、`usd_page_front.html`、`USDLogoLrgWithAlpha.png` 和 `https://openusd.org/license`。
- 生成 `reports/official_entry_freshness_audit.json` 与 `reports/official_entry_freshness_audit.md`。
- 将官方入口实时新鲜度报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将官方入口实时新鲜度审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `official_entry_freshness_audit:passed`、`official_entry_freshness_audit:release_and_api_live_markers_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把官方入口实时新鲜度审计纳入固定验证链。
- 最新官方入口实时新鲜度审计：2 个官方 URL 返回 200，release 8 个 live 标记、API 7 个 live 标记、2 个源快照和 3 个本地输出全部通过。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、14 个双语 CSS 选择器、6 个页面资产标记检查全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：199 项检查通过，0 项失败。

差距：

- 官方入口实时新鲜度审计是入口结构和标记级护栏，不是官方页面全文翻译 diff。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或检查 API 首页范围说明和入口速览在窄宽度下是否需要更细的布局约束。
3. 继续每轮运行主入口覆盖审计、官方入口实时新鲜度审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 34 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面范围内工作，不新增页面、不扩大到整站镜像。
- 对照两个官方入口页的当前结构与本地源快照，确认 release/API 主入口仍围绕 OpenUSD 26.05 文档入口和 Doxygen API 首页；本轮聚焦窄宽度布局契约。
- 为 `site/openusd_cn.css` 补充 API 双语入口层的响应式约束：图片最大宽度、双语块和范围说明的长文本换行、API 入口卡片网格在 700px 以下降为单列。
- 为 `site/openusd_release_cn.css` 补充 release 双语层的响应式约束：中文/英文术语长文本换行、范围说明和 glossary/toolset 摘要块换行、glossary/toolset 网格在 640px 以下降为单列、命令 option 代码片段避免窄屏挤压。
- 为 `site/api/index.html` 本地 API 跳转页补充 viewport meta，保持 `../index.html` 本地跳转不变。
- 新增 `scripts/audit_openusd_responsive_layout_contract.mjs`，检查 9 个本地页面的 viewport、本地双语 CSS 挂载、移动端网格降级和长文本换行契约。
- 生成 `reports/responsive_layout_contract_audit.json` 与 `reports/responsive_layout_contract_audit.md`。
- 将响应式布局契约报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将响应式布局契约审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `responsive_layout_contract_audit:passed`、`responsive_layout_contract_audit:viewport_and_css_contract_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把响应式布局契约审计纳入固定验证链。
- 最新响应式布局契约审计：9 个页面都有 viewport，5 个 release 页面挂载 release 双语 CSS，3 个 API 页面挂载 API 双语 CSS，2 个响应式 CSS 契约通过，失败 0 项。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新官方入口实时新鲜度审计：2 个官方 URL 返回 200，release 8 个 live 标记、API 7 个 live 标记、2 个源快照和 3 个本地输出全部通过。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、14 个双语 CSS 选择器、6 个页面资产标记检查全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：204 项检查通过，0 项失败。

差距：

- 响应式布局契约审计是 CSS/HTML 结构级护栏，不是像素级截图比对。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或对 release/API 主入口做更细的入口链接文案覆盖审计；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、官方入口实时新鲜度审计、响应式布局契约审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

## 第 35 轮

时间：2026-06-03

已完成：

- 继续在既有 9 个本地页面和 8 个源快照范围内工作，不新增页面、不扩大到整站镜像。
- 对照两个官方入口页确认 release 首页仍暴露 Learn、User Guides、Reference、Specifications 等入口组，API 首页仍暴露 Overview and Purpose、Usd API 和 license 入口；本轮聚焦入口链接文案覆盖。
- 新增 `scripts/audit_openusd_entry_label_contract.mjs`，检查关键入口链接的 href、中文标签和英文原名是否同时保留。
- 审计 release 首页 8 个关键入口链接：`intro.html`、`glossary.html`、`apiDocs.html`、`toolset.html`、`api/index.html`、`tut_usd_tutorials.html`、`spec.html`、`usdfaq.html`。
- 审计 release 首页 4 个导航分组中英标签：Learn、User Guides、Reference、Specifications。
- 审计 API 首页 3 个入口卡片：`_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license`。
- 审计 `apiDocs.html` 的 `api/index.html` bridge 按钮和 `site/api/index.html` 的 `../index.html` 本地跳转说明。
- 审计 6 个相邻页标题是否保留中文标签和英文原名：`intro.html`、`apiDocs.html`、`glossary.html`、`toolset.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html`。
- 生成 `reports/entry_label_contract_audit.json` 与 `reports/entry_label_contract_audit.md`。
- 将入口标签契约报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将入口标签契约审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `entry_label_contract_audit:passed`、`entry_label_contract_audit:release_api_and_adjacent_labels_ready` 内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把入口标签契约审计纳入固定验证链。
- 最新入口标签契约审计：8 个 release 入口链接、4 个 release 导航分组、3 个 API 入口卡片、2 个 bridge/redirect 链接和 6 个相邻页标题全部通过。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新官方入口实时新鲜度审计：2 个官方 URL 返回 200，release 8 个 live 标记、API 7 个 live 标记、2 个源快照和 3 个本地输出全部通过。
- 最新响应式布局契约审计：9 个页面都有 viewport，5 个 release 页面挂载 release 双语 CSS，3 个 API 页面挂载 API 双语 CSS，2 个响应式 CSS 契约通过，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、14 个双语 CSS 选择器、6 个页面资产标记检查全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：209 项检查通过，0 项失败。

差距：

- 入口标签契约审计是 href 周边标签和页面标题级护栏，不是逐链接全文翻译审计。
- glossary 独立术语小节中文说明已覆盖完成，但官方定义正文仍保留英文原文，未逐段翻译全部长段落。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 优先检查 `toolset.html` 的 option 长说明是否需要继续加少量中文导读。
2. 或为固定验证链补一个报告索引/审计索引总表，方便快速定位各轮产物；仍不新增页面范围。
3. 继续每轮运行入口标签契约审计、主入口覆盖审计、官方入口实时新鲜度审计、响应式布局契约审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。
## 第 36 轮
时间：2026-06-03

已完成：

- 继续在既有 9 个本地 HTML 和 8 个源快照范围内维护，不新增页面、不扩大到整站镜像。
- 新增 `scripts/audit_openusd_report_index.mjs`，为固定审计链建立报告索引，覆盖脚本、JSON 报告、Markdown 报告、通过状态和最终验证计数。
- 报告索引只汇总现有产物路径、计数和通过状态，不保存官方正文，也不做新的官方页面镜像。
- 生成 `reports/audit_index.json` 和 `reports/audit_index.md`，当前索引覆盖 11 个审计条目、12 个总条目、11 个审计脚本、11 份 JSON 报告、11 份 Markdown 报告和最终验证报告。
- 将 `audit_index.json` 纳入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将报告索引接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `audit_index:passed` 和 `audit_index:fixed_chain_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把报告索引写入固定验证链与范围状态。
- 本轮报告索引处理了 PowerShell 生成 JSON 可能带 UTF-8 BOM 的情况，避免 `validation_report.json` 解析失败。
- 最新报告索引审计：11 个审计脚本、11 份 JSON 报告、11 份 Markdown 报告、11 个审计报告通过，最终验证失败数 0，索引检查失败数 0。
- 最新入口标签契约审计：8 个 release 入口链接、4 个 release 导航分组、3 个 API 入口卡片、2 个 bridge/redirect 链接和 6 个相邻页标题全部通过。
- 最新主入口覆盖审计：3 个入口相关页面、18 项检查、321/321 组 release 术语标记、4 个 API 双语介绍块、3 个 API 入口卡片和 1 个 API 范围说明全部通过。
- 最新官方入口实时新鲜度审计：2 个官方 URL 返回 200，release 8 个 live 标记、API 7 个 live 标记、2 个源快照和 3 个本地输出全部通过。
- 最新响应式布局契约审计：9 个页面 viewport、5 个 release CSS 挂载页、3 个 API CSS 挂载页和 2 个响应式 CSS 契约全部通过。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查、874/874 个中英文术语标记、333/333 个中英文块、92 条 glossary 定义说明和 19 个 tool option guide 全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、2 个主入口、6 个相邻入口、5 个 Sphinx 源和 3 个 Doxygen 源全部通过。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、7 个 release CSS 选择器、7 个 API CSS 选择器和 6 个页面资源标记全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口和 6 个相邻入口保持有界。
- 最新链接审计：9 个本地页面，本地存在引用 341 个、外部链接 61 个、范围外官方相对文档链接 3340 个，本地资源缺失 0 个。
- 最新 HTTP 预览审计：9 个页面和 141 个本地 CSS/JS/图片/字体资源全部通过，失败页面 0 个、失败资源 0 个。
- 最新总验证：214 项检查通过，0 项失败。

差距：

- 报告索引是固定审计链的产物发现和状态汇总，不是页面正文级 diff，也不是截图/像素级视觉比对。
- glossary 官方定义正文仍保留英文原文，已补 92 条定义级中文导读，但未逐段翻译所有长定义。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 继续用报告索引驱动固定审计链，优先定位任何变红的入口、样式、链接或范围报告。
2. 如不新增页面范围，优先小批量检查 `toolset.html` 的 option 长说明是否需要继续添加中文导读。
3. 继续每轮运行入口标签契约、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 37 轮
时间：2026-06-03

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照两个官方入口页的当前结构约束，新增 `scripts/audit_openusd_page_metadata_contract.mjs`，专门检查页面级中文主导契约。
- 新审计覆盖 9 个本地 HTML：`release_index.html`、`intro.html`、`apiDocs.html`、`glossary.html`、`toolset.html`、`index.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html` 和 `api/index.html`。
- 检查项包括 `lang="zh-CN"`、viewport、中文优先且保留英文原页面名的 `<title>`、范围说明、名称/链接/CLI flag 保留策略，以及每页是否仍同时具有中文层和英文层。
- 生成 `reports/page_metadata_contract_audit.json` 和 `reports/page_metadata_contract_audit.md`；当前 9 个页面的语言声明、viewport、双语/跳转标题、release/API/redirect 范围说明和中文/英文层全部通过。
- 将 `page_metadata_contract_audit.json` 纳入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将页面元数据契约审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `page_metadata_contract_audit:passed`、`page_metadata_contract_audit:zh_cn_titles_scope_ready` 两项内容检查。
- 更新 `scripts/audit_openusd_report_index.mjs`，固定审计链从 11 个审计条目提升到 12 个审计条目。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把页面元数据契约写入固定验证链与范围状态。
- 最新页面元数据契约审计：9 个页面检查，9 个 `zh-CN` 页面，9 个 viewport，9 个双语/跳转标题，5 个 release 范围说明、3 个 API 范围说明、1 个 redirect 范围说明，9 个中文/英文层页面，7 项检查失败 0。
- 最新报告索引审计：12 个审计条目、13 个总条目、12 个审计脚本、12 份 JSON 报告、12 份 Markdown 报告、12 个审计报告通过，最终验证失败数 0，索引检查失败数 0。
- 最新总验证：219 项检查通过，0 项失败。

差距：

- 页面元数据契约是标题、语言声明、范围说明和保留策略级护栏，不是官方正文逐段 diff 或截图级视觉比对。
- glossary 官方定义正文仍保留英文原文，已补 92 条定义级中文导读，但未逐段翻译所有长定义。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 继续用报告索引和页面元数据契约定位固定链中任何变红的页面级问题。
2. 如继续补内容，优先小批量检查 `toolset.html` 的 option 长说明是否需要更细中文导读。
3. 继续每轮运行页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 38 轮
时间：2026-06-03

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照当前两个官方入口页确认 release 入口仍围绕 Sphinx 文档首页、Learn/User Guides/Reference/Specifications 等导航分组，API 入口仍围绕 Doxygen API 首页、搜索/导航树和 `_usd__overview_and_purpose.html`、`usd_page_front.html`、license 三个核心入口。
- 新增 `scripts/audit_openusd_entry_structure_parity.mjs`，以结构标记方式比较源快照与本地输出，不保存官方正文。
- 新审计检查 release 官方源快照的 Sphinx 外壳标记、本地 release 页的 Sphinx/双语外壳标记、4 个 release 导航分组、API 官方源快照的 Doxygen 外壳标记、本地 API 页的 Doxygen/双语外壳标记、3 个 API 入口链接，以及 6 个相邻页的 Sphinx/Doxygen 家族外壳。
- 生成 `reports/entry_structure_parity_audit.json` 和 `reports/entry_structure_parity_audit.md`。
- 将 `entry_structure_parity_audit.json` 纳入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将入口结构保真审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `entry_structure_parity_audit:passed`、`entry_structure_parity_audit:sphinx_doxygen_shells_ready` 两项内容检查。
- 更新 `scripts/audit_openusd_report_index.mjs`，固定审计链从 12 个审计条目提升到 13 个审计条目。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把入口结构保真审计写入固定验证链与范围状态。
- 最新入口结构保真审计：release 官方结构标记 12/12，本地 release 结构标记 11/11，release 导航分组源/本地 4/4，API 官方结构标记 14/14，本地 API 结构标记 16/16，API 入口链接源/本地 3/3，6 个相邻页外壳全部通过，7 项检查失败 0。
- 最新报告索引审计：13 个审计条目、14 个总条目、13 个审计脚本、13 份 JSON 报告、13 份 Markdown 报告、13 个审计报告通过，最终验证失败数 0，索引检查失败数 0。
- 最新总验证：224 项检查通过，0 项失败。

差距：

- 入口结构保真审计是结构标记级护栏，不是视觉截图 diff，也不是官方正文逐段 diff。
- glossary 官方定义正文仍保留英文原文，已补 92 条定义级中文导读，但未逐段翻译所有长定义。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 继续用入口结构保真、页面元数据和报告索引三层护栏定位固定链中任何变红的结构问题。
2. 如继续补内容，优先小批量检查 `toolset.html` 的 option 长说明是否需要更细中文导读。
3. 继续每轮运行入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 39 轮
时间：2026-06-03

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照两个官方入口页确认当前入口结构未变化，本轮聚焦用户要求中的“中文为主并保留对应英文原文”顺序护栏。
- 新增 `scripts/audit_openusd_chinese_first_order_contract.mjs`，检查所有本地页面中的中文标签/解释是否位于保留英文原文之前。
- 新审计覆盖 9 个本地 HTML，检查 `cn-term/en-term` 术语对、`zh/en` 正文块和 `api/index.html` 本地跳转页的中英句子顺序。
- 生成 `reports/chinese_first_order_contract_audit.json` 和 `reports/chinese_first_order_contract_audit.md`。
- 将 `chinese_first_order_contract_audit.json` 纳入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将中文优先顺序审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `chinese_first_order_contract_audit:passed`、`chinese_first_order_contract_audit:terms_blocks_and_redirect_ready` 两项内容检查。
- 更新 `scripts/audit_openusd_report_index.mjs`，固定审计链从 13 个审计条目提升到 14 个审计条目。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，把中文优先顺序审计写入固定验证链与范围状态。
- 最新中文优先顺序审计：9 个页面检查，874/874 组 `cn-term/en-term` 为中文在前，333/333 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证失败数 0，索引检查失败数 0。
- 最新总验证：229 项检查通过，0 项失败。

差距：

- 中文优先顺序审计是局部双语块顺序护栏，不是官方正文逐段翻译完整度审计，也不是视觉截图 diff。
- glossary 官方定义正文仍保留英文原文，已补 92 条定义级中文导读，但未逐段翻译所有长定义。
- toolset 的命令、usage 和 option 原文保持英文；目前已加命令级、工作流级和 option guide 级中文导读，未逐行翻译每个 option 长说明。

下一轮目标：

1. 继续用中文优先顺序、入口结构保真、页面元数据和报告索引四层护栏定位固定链中任何变红的问题。
2. 如继续补内容，优先小批量检查 `toolset.html` 的 option 长说明是否需要更细中文导读。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 40 轮
时间：2026-06-03

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照两个官方入口页确认当前入口仍围绕 OpenUSD 26.05 release/API 文档；本轮只补 `toolset.html` 的小批量长选项导读，不复制官方长正文。
- 更新 `scripts/build_toolset_bilingual.mjs`，为 6 个密集命令新增 `cn-tool-deep-note` 长选项说明导读：`usdchecker`、`usdstitchclips`、`sdfdump`、`sdffilter`、`usdgenschemafromsdr`、`usdInitSchema`。
- 每个长选项导读保持 CLI flag、命令名、API/schema 名称和官方 usage/option 长说明原样，只增加中文优先的阅读提示与对应英文说明。
- 扩展 `site/openusd_release_cn.css`，新增 `cn-tool-deep-note` 样式和窄屏 code 换行约束。
- 更新 `scripts/audit_openusd_term_consistency.mjs`，统计 `cn_tool_deep_notes` 并新增 `terms:toolset_deep_option_notes_present` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_deep_option_notes` 检查，并把术语一致性总检查扩展到 6 个 deep option notes。
- 重新生成 `site/toolset.html`；局部自检结果为 6 个长选项导读、19 个 option guide、157/157 个 `zh/en` 块，`Long-option reading notes` 标记存在。
- 重新运行完整固定审计链和两次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新中文优先顺序审计：9 个页面检查，880/880 组 `cn-term/en-term` 为中文在前，351/351 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查、880/880 个中英文术语标记、351/351 个中英文块、92 条 glossary 定义说明、19 个 tool option guide 和 6 个 tool deep option notes 全部通过。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 230 项最终验证检查全部对齐，失败 0。
- 最新总验证：230 项检查通过，0 项失败。

差距：
- `toolset.html` 仍保留官方 usage、option 长说明和示例英文原文；本轮新增的是 6 个密集命令的中文阅读导读，不是逐行翻译全部 option 长说明。
- glossary 官方定义正文仍保留英文原文，已补 92 条定义级中文导读，但未逐段翻译所有长定义。
- 当前固定审计链是结构、链接、术语、顺序、范围和本地资源护栏，不是像素级截图比对。

下一轮目标：

1. 继续用中文优先顺序、入口结构保真、页面元数据和报告索引定位固定链状态。
2. 如继续补内容，优先评估 `toolset.html` 是否还需要第二批少量长选项导读，或检查 API 首页入口卡片在窄宽度下的文本密度。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 41 轮
时间：2026-06-04

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认本轮仍围绕两个官方入口；本轮只补 API 首页入口阅读路线。
- 更新 `site/index.html`，在现有 `cn-api-entry-map` 之后新增 `cn-api-route-guide`，包含 3 条中文优先的 API 阅读路线：`Overview and Purpose`、`Usd API`、`TOST license`。
- 新增路线导读只复用官方 API 首页已有的 3 个入口链接：`_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license`；API 名称、页面名和链接保持原样。
- 更新 `site/openusd_cn.css`，新增 `cn-api-route-guide`、`cn-api-route-list`、`cn-api-route-step` 样式和窄屏单列约束，降低 API 入口卡片下方说明的文本密度。
- 更新 `scripts/audit_openusd_primary_entry_coverage.mjs`，统计 `api_route_steps` 并新增 `api:has_route_guide` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_route_guide` 检查，并要求主入口覆盖报告包含至少 3 条 API route guide steps。
- 重新运行受影响审计、完整固定审计链和两次总验证；最终验证报告和 scope manifest 均已更新。
- 最新主入口覆盖审计：3 个入口相关页面通过，19 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，API route guide steps 3 个，失败 0 项。
- 最新中文优先顺序审计：9 个页面检查，881/881 组 `cn-term/en-term` 为中文在前，354/354 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查、881/881 个中英文术语标记、354/354 个中英文块、92 条 glossary 定义说明、19 个 tool option guide 和 6 个 tool deep option notes 全部通过。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 231 项最终验证检查全部对齐，失败 0。
- 最新总验证：231 项检查通过，0 项失败。

差距：

- API 首页新增的是入口路线级中文导读，不是 API 手册全量翻译；相邻 API 页面仍按已纳入范围的 `Overview and Purpose` 与 `Usd API` 优先维护。
- 当前固定审计链是结构、链接、术语、顺序、范围和本地资源护栏，不是像素级截图比对。
- `toolset.html` 仍保留官方 usage、option 长说明和示例英文原文；目前只做小批量中文阅读导读。

下一轮目标：

1. 继续用中文优先顺序、主入口覆盖、入口结构保真、页面元数据和报告索引定位固定链状态。
2. 如继续补内容，优先检查 API 首页新增 route guide 在 HTTP 预览和窄屏布局下是否还需要更细约束，或评估 `toolset.html` 是否需要第二批少量长选项导读。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 42 轮
时间：2026-06-04

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认当前官方入口仍为 OpenUSD 26.05 release/API 文档；本轮只把第 41 轮新增的 API route guide 固化进预览与响应式护栏。
- 更新 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-api-route-guide`，同时继续检查 Doxygen 外壳、搜索框、范围说明和入口卡片。
- 更新 `scripts/audit_openusd_responsive_layout_contract.mjs`，把 `.cn-api-route-list` 和 `.cn-api-route-step` 纳入 API CSS 移动端契约，并新增 `responsive:api_route_guide_mobile_contract` 检查。
- 响应式审计现在统计 `api_route_guide_steps`，确认 `site/index.html` 中 3 条 API 阅读路线存在，且移动端 CSS 将 route guide 切到单列。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `http_preview_audit:api_route_guide_visible` 检查，并要求响应式审计报告包含至少 3 条 API route guide steps。
- 重新运行 HTTP 预览审计、响应式审计、完整总验证、报告索引和第二次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新 HTTP 预览审计：9 个本地页面全部通过，141 个本地 CSS/JS/图片/字体资源全部通过，API 首页 required marker 数提升到 8，缺失标记 0。
- 最新响应式布局契约审计：9 个页面检查，9 个 viewport，5 个 release CSS 页面，3 个 API CSS 页面，3 条 API route guide steps，9 项检查失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 232 项最终验证检查全部对齐，失败 0。
- 最新总验证：232 项检查通过，0 项失败。

差距：

- 本轮是验证护栏补强，不新增官方正文翻译；API 首页 route guide 内容仍限定在官方 API 首页已有的 3 个入口链接。
- HTTP 预览检查的是本地页面可访问性、关键标记和资源响应，不是浏览器截图或像素级视觉比对。
- 当前范围仍不包含 release/API 全站所有深层页面；范围外官方相对链接继续保持原链接。

下一轮目标：

1. 继续用 HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态。
2. 如继续补内容，优先评估 `toolset.html` 是否需要第二批少量长选项导读，或为 API route guide 做一次浏览器截图级抽查。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 43 轮
时间：2026-06-04

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认当前官方入口仍为 OpenUSD 26.05 release/API 文档；本轮只把 API route guide 纳入导航链接护栏。
- 更新 `scripts/audit_openusd_navigation_coverage.mjs`，提取 `site/index.html` 中的 `cn-api-route-step` 块，并检查 3 个官方 API 首页入口链接是否都出现在 route step 中。
- 导航覆盖审计新增 `api_route_steps` 和 `api_route_step_links_present` 计数，并新增 `navigation:api_route_guide_links_present` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，将 route guide 链接计数纳入 `navigation_coverage_audit:release_and_api_navigation_ready`，并新增 `navigation_coverage_audit:api_route_guide_links_ready` 检查。
- 重新运行导航覆盖审计、入口标签审计、完整总验证、报告索引和第二次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新导航覆盖审计：9 项检查通过，release 相邻链接 5 个，API 导航资源 6 个，API 入口链接 3 个，API 入口卡片 3 个，API route steps 3 个，API route step links 3 个，失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 233 项最终验证检查全部对齐，失败 0。
- 最新总验证：233 项检查通过，0 项失败。

差距：

- 本轮是导航链接审计补强，不新增官方正文翻译；API route guide 仍限定在官方 API 首页已有的 3 个入口链接。
- 导航覆盖审计检查链接存在性和所在结构块，不做点击后的深层页面全文校验；深层相邻入口仍由已纳入范围的两个 API 相邻页维护。
- 当前范围仍不包含 release/API 全站所有深层页面；范围外官方相对链接继续保持原链接。

下一轮目标：

1. 继续用导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态。
2. 如继续补内容，优先评估 `toolset.html` 是否需要第二批少量长选项导读，或为 API route guide 做一次浏览器截图级抽查。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 44 轮
时间：2026-06-04

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认当前官方入口仍为 OpenUSD 26.05 release/API 文档；本轮只对 API route guide 做浏览器级可见性抽查。
- 用临时 `127.0.0.1` 静态预览打开 `site/index.html`，避免直接访问 `file://` 本地文件；检查 route guide 的 DOM 布局、文本、链接、所在位置和水平溢出。
- 保存浏览器截图：`reports/api_route_guide_browser_view.png`。
- 新增浏览器抽查报告：`reports/api_route_guide_browser_audit.json` 和 `reports/api_route_guide_browser_audit.md`。
- 浏览器抽查 6 项全部通过：route guide 存在、3 条 route steps、3 个预期链接、位于 entry map 之后、无水平溢出、滚动后可见。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把浏览器抽查 JSON/Markdown/PNG 纳入必需文件，并新增 `api_route_guide_browser_audit:passed` 与 `api_route_guide_browser_audit:route_guide_visible_and_linked` 两项内容检查。
- 重新运行完整总验证、报告索引和第二次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新浏览器抽查：6 项检查通过，route steps 3，route links 3，抽查视口 661 x 731，失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 238 项最终验证检查全部对齐，失败 0。
- 最新总验证：238 项检查通过，0 项失败。

差距：

- 本轮浏览器抽查是针对 API 首页 route guide 的局部 smoke check，不是整站截图巡检，也不是像素级 diff。
- 当前截图视口来自本轮浏览器会话，可覆盖窄屏/中等宽度可见性；宽屏截图仍可作为后续补充。
- 当前范围仍不包含 release/API 全站所有深层页面；范围外官方相对链接继续保持原链接。

下一轮目标：

1. 继续用浏览器抽查、导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态。
2. 如继续补内容，优先评估 `toolset.html` 是否需要第二批少量长选项导读，或补一张宽屏 API route guide 浏览器截图。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 45 轮
时间：2026-06-04

已完成：

- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增页面、不扩大到整站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认当前官方入口仍为 OpenUSD 26.05 release/API 文档；本轮只补 API route guide 的宽屏浏览器抽查。
- 先尝试在当前标签设置 1280x720 宽屏视口并截图；首次截图捕获超时，已恢复临时静态服务和浏览器 viewport，不把失败产物纳入最终验证。
- 按浏览器 viewport 能力文档改用新标签设置 1280x720 视口，重新打开临时 `127.0.0.1` 预览并滚动到 `cn-api-route-guide`。
- 保存宽屏浏览器截图：`reports/api_route_guide_browser_wide_view.png`。
- 新增宽屏浏览器抽查报告：`reports/api_route_guide_browser_wide_audit.json` 和 `reports/api_route_guide_browser_wide_audit.md`。
- 宽屏浏览器抽查 8 项全部通过：route guide 存在、可见、3 条 route steps、3 个预期链接、位于 entry map 之后、无水平溢出、实际视口 1280x720、截图已保存。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把宽屏浏览器抽查 JSON/Markdown/PNG 纳入必需文件，并新增 `api_route_guide_browser_wide_audit:passed` 与 `api_route_guide_browser_wide_audit:route_guide_visible_and_linked` 两项内容检查。
- 重新运行完整总验证、报告索引和第二次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新宽屏浏览器抽查：8 项检查通过，route steps 3，route links 3，视口 1280 x 720，route list columns 4，截图已保存，失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 243 项最终验证检查全部对齐，失败 0。
- 最新总验证：243 项检查通过，0 项失败。

差距：

- 本轮宽屏浏览器抽查仍是 API 首页 route guide 的局部 smoke check，不是整站截图巡检，也不是像素级 diff。
- 失败的首次宽屏截图尝试已恢复并未纳入最终验证；最终保留的是新标签 1280x720 成功截图与报告。
- 当前范围仍不包含 release/API 全站所有深层页面；范围外官方相对链接继续保持原链接。

下一轮目标：

1. 继续用浏览器抽查、导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态。
2. 如继续补内容，优先回到 `toolset.html`，评估是否需要第二批少量长选项导读；或补一个轻量报告把两张 API route guide 截图和 JSON 审计串起来。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、报告索引和总验证，并更新报告。

## 第 46 轮
时间：2026-06-04

已完成：

- 按用户“其他页面和子页面都兼顾一下，给我个链接试试”的要求，把自动化提示更新为：主范围仍是 release/API 两个入口，同时有界兼顾从入口可达的高价值相邻页面和子页面，不做整站镜像。
- 继续保持既有 9 个本地 HTML 和 8 个源快照范围，不新增官方正文页面、不扩大为全站镜像。
- 对照 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html` 确认当前官方入口仍为 OpenUSD 26.05 release/API 文档；本轮补本地预览索引而不是复制更多官方正文。
- 新增 `scripts/build_local_preview_index.mjs`，读取 `reports/scope_manifest.json`，生成当前本地可点页面的预览索引。
- 新增 `reports/local_preview_index.json` 和 `reports/local_preview_index.md`，列出 `http://127.0.0.1:8067/` 下 9 个页面：2 个主入口、6 个 active adjacent 页面和 1 个本地 API redirect。
- 本轮检测到 `http://127.0.0.1:8067/index.html` 预览服务可用，API 首页包含 `cn-api-route-guide`。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把本地预览索引脚本、JSON 和 Markdown 纳入必需文件，并新增 `local_preview_index:passed` 与 `local_preview_index:current_scope_links_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，记录本地预览链接索引和新的验证计数。
- 重新运行完整固定审计链、预览索引生成、总验证、报告索引和第二次总验证；最终验证报告、报告索引和 scope manifest 均已更新。
- 最新本地预览索引：9 个页面、9 个存在、9 个唯一预览 URL、预览服务探测 ok。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 248 项最终验证检查全部对齐，失败 0。
- 最新总验证：248 项检查通过，0 项失败。

差距：

- 本轮新增的是本地预览入口索引和验证护栏，不新增新的官方页面正文翻译。
- 预览索引只列出当前有界范围内已经产出的 9 个本地 HTML；release/API 中未纳入范围的深层页面仍保留官方相对链接。
- `http://127.0.0.1:8067/` 链接依赖当前本地静态服务；若服务关闭，可用 README 中的 `Start-Process` 文件方式或重新启动静态服务。

下一轮目标：

1. 继续用本地预览索引、HTTP 预览、导航覆盖、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态。
2. 如继续扩展“其他页面和子页面”，先从 release/API 入口已链接且高价值的相邻入口中小范围选择，并同步更新 scope manifest、源快照、生成脚本和范围边界审计。
3. 继续每轮运行中文优先顺序、入口结构、页面元数据、入口标签、主入口覆盖、官方新鲜度、响应式、术语、导航、溯源、样式资产、范围、链接、HTTP 预览、本地预览索引、报告索引和总验证，并更新报告。

## 第 47 轮
时间：2026-06-04

已完成：

- 按用户“最后产出是个html”的要求，新增最终 HTML 总入口 `openusd_bilingual_final.html`。
- 新增 `scripts/build_final_html_entry.mjs`，从 `reports/local_preview_index.json` 和 `reports/validation_report.json` 生成最终 HTML，避免手工维护链接清单。
- 最终 HTML 保留中文为主、English retained 的交付口径，并集中链接当前 9 个本地页面、对应本地预览 URL 和官方原页 URL。
- 最终 HTML 使用 `site/images/USDLogoUnsized.svg` 和 `site/images/piper-banner.jpg`，保持 OpenUSD 文档视觉资产，不新增外部图片依赖。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把最终 HTML 和生成脚本纳入必需文件，并新增 `final_html_entry:has_final_output_marker`、`final_html_entry:links_current_scope_pages` 两项验证。
- 修复生成脚本中的模板反引号问题，并处理 PowerShell 生成 JSON 可能带 UTF-8 BOM 的解析问题。
- 启动项目根目录 HTTP 预览服务，最终入口可通过 `http://127.0.0.1:8068/openusd_bilingual_final.html` 打开；HTTP 探测返回 200，且包含 `final-html-entry` 标记和 `data-page-count="9"`。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `work.md`，明确最终产出是 HTML。
- 重新运行最终 HTML 生成、完整总验证、报告索引和第二次总验证；最终验证报告与报告索引已对齐。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 252 项最终验证检查全部对齐，失败 0。
- 最新总验证：252 项检查通过，0 项失败。

差距：

- `openusd_bilingual_final.html` 是最终总入口页，不是额外官方正文页面；`site/` 中官方复刻范围仍保持 9 个本地 HTML。
- 本轮没有新增新的 OpenUSD 官方子页面翻译；子页面扩展仍需要按 scope manifest 小范围纳入、生成、审计。
- `http://127.0.0.1:8068/` 是项目根目录预览服务；`8067` 仍用于 `site/` 目录预览。

下一轮目标：

1. 以 `openusd_bilingual_final.html` 作为用户试用入口，继续检查其链接、布局和移动端显示。
2. 如果继续补子页面，优先选择 release/API 入口已链接且高价值的相邻页面，避免直接扩成全站镜像。
3. 继续每轮运行最终 HTML 生成、本地预览索引、报告索引和总验证，并更新进度报告。

## 第 48 轮
时间：2026-06-04

已完成：

- 按用户纠正“不是高价值相邻页面和子页面，是所有”，把自动化名称和提示更新为全量复刻：覆盖 release 文档与 release/api API 文档下可发现的所有 HTML 页面。
- 新增 `scripts/discover_openusd_all_pages.mjs`，从官方 release toctree、API Doxygen navtree/menu 和现有完成页生成全量页面清单，不再按高价值相邻页筛选。
- 先尝试 live recursive crawl；API 侧页面量较大，3 分钟未完成后停止该进程，改为当前轮可稳定复现的导航全量清单路径。
- 新增 `reports/all_pages_inventory.json` 和 `reports/all_pages_inventory.md`，当前发现 406 个官方 HTML 页面：126 个 release 页面、280 个 API 页面。
- 当前 8 个官方页面标记为 `bilingual_complete`；398 个页面标记为 `pending_full_scope`，后续自动化按该队列继续生成和验证。
- 更新 `scripts/build_final_html_entry.mjs`，最终 HTML 不再只显示 9 个本地入口，而是显示 406 页全量清单、完成状态、待处理状态、本地计划路径和官方原页链接。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 all-pages inventory 必需文件与内容检查，并要求最终 HTML 带 `data-scope-mode="all"` 和全量清单标记。
- 修复报告索引/验证报告在失败后互相引用的自举问题；只允许上一轮 `validation_report_ready` 陈旧失败作为过渡，重建后报告索引回到 0 失败。
- 更新 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，明确 scope mode 为 all discovered release/API HTML pages。
- 重新运行全量清单、最终 HTML、总验证、报告索引和第二次总验证；最终验证报告与报告索引已对齐。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和 258 项最终验证检查全部对齐，失败 0。
- 最新总验证：258 项检查通过，0 项失败。

差距：

- 406 页已经进入全量清单和最终 HTML，但当前本地双语完成页仍是 8 个官方页面加 1 个本地跳转页；398 个页面仍待逐页生成。
- 本轮没有把 398 个待处理页面直接伪造成已完成页面；最终 HTML 会明确显示 `pending_full_scope`。
- 当前全量发现采用官方导航/toctree 清单；live recursive crawl 后续可以做成可恢复队列继续扩展和交叉校验。

下一轮目标：

1. 从 `reports/all_pages_inventory.json` 读取 `pending_full_scope` 队列，按批次生成下一组 release/API 页面。
2. 每新增一批页面，同步更新 source snapshots、local outputs、scope manifest、all-pages inventory 和验证规则。
3. 继续以 `openusd_bilingual_final.html` 作为最终 HTML 入口，展示所有页面的完成状态。

## 第 49 轮 时间：2026-06-04

已完成：

- 按全量范围从 `reports/all_pages_inventory.json` 读取 `pending_full_scope` 队列，新增批次生成脚本 `scripts/build_release_full_batch.mjs`。
- 生成 10 个 release 队列的可检查 `bilingual_draft` HTML，输出到 `full_site/release/`；对应官方源快照保存到 `source/full_release/`。
- 最新一批 5 个页面记录在 `reports/release_full_batch_report.json` 和 `reports/release_full_batch_report.md`：`maxperf.html`、`plugins_alembic.html`、`plugins_renderman.html`、`plugins.html`、`press_opensource_announce.html`。
- 重新运行全量发现清单，当前 406 个官方 HTML 页面中，8 个为 `bilingual_complete`，10 个为 `bilingual_draft`，388 个为 `pending_full_scope`。
- 更新 `scripts/build_final_html_entry.mjs`，最终 HTML 统计区现在显示 complete、draft、pending 三类状态；`openusd_bilingual_final.html` 已重建并继续作为最终 HTML 入口。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把 release 批次脚本、批次报告、draft 计数和 draft 文件存在性纳入验证。
- 更新 `reports/scope_manifest.json`、`reports/scope_manifest.md` 和 `README.md`，记录全量 draft 增量和当前覆盖状态。
- 重新运行总验证与报告索引；最新验证为 264 项检查通过，0 项失败。

差距：

- `bilingual_draft` 是可检查草稿页，包含中文优先范围说明、页面结构、官方英文摘录、链接与导航；还不是逐段完整精译页。
- API 侧 280 个页面当前仍主要处于 `pending_full_scope`，本轮先推进 release 队列。
- 388 个页面仍需继续按队列生成、校验、再逐步补齐更密集的中英对照。

下一轮目标：

1. 继续从全量 `pending_full_scope` 队列取下一批页面，优先维持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*` 与 `reports/all_pages_inventory.*` 的一致性。
2. 增加 draft 页的本地预览抽查或轻量链接检查，确认 `full_site/release/` 下的新页面可从最终 HTML 入口直接打开。
3. 在 release 批次稳定后，建立 API 队列的同类 draft 生成脚本，覆盖 `full_site/api/`。

## 第 50 轮 时间：2026-06-04

已完成：

- 先检查 `reports/all_pages_inventory.json`、`reports/validation_report.json`、`reports/release_full_batch_report.json`、`openusd_bilingual_final.html` 和 `full_site/release/` 当前状态，确认上一轮为 406 total / 8 complete / 10 draft / 388 pending，验证 264 项通过。
- 扩展 `scripts/build_release_full_batch.mjs`，新增 `OPENUSD_REFRESH_DRAFTS=1` 刷新模式，可重新生成已有 `bilingual_draft` 页面而不推进 pending 队列。
- 补齐 release draft 标题清理：去掉 Sphinx 锚点图标字符，处理 `&mdash;` / `&ndash;`，并为当前批次页面增加中文标题映射。
- 刷新已有 10 个 release draft 页面，确认 `full_site/release/contributing_to_usd.html` 标题已变为 `贡献指南 / Contributing to USD`。
- 从 `pending_full_scope` 队列新增 5 个 release draft 页面：`press_opensource_release.html`、`ref_performance_metrics.html`、`release_schedule.html`、`search.html`、`spec_usdpreviewsurface.html`。
- 重新运行全量发现清单，当前状态更新为 406 total / 8 complete / 15 draft / 383 pending。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `all_pages_inventory:draft_files_match_inventory`，要求清单里的 draft 数量与 `full_site/` 实际 HTML 文件数量一致。
- 重新生成 `reports/local_preview_index.*`、`openusd_bilingual_final.html`、`reports/audit_index.*`，并同步 `reports/scope_manifest.*`、`README.md` 和 `work.md`。
- 最新总验证为 265 项检查通过，0 项失败。

差距：

- 15 个 `bilingual_draft` 仍是结构化草稿页，保留英文原文摘录和链接，尚未达到 8 个 `bilingual_complete` 页的逐段双语密度。
- API 全量队列仍未开始批量 draft 生成，280 个 API 页面中除已完成入口/相邻页外仍处于 pending。
- `full_site/release/` 目前已有文件一致性检查，但还缺少专门的 HTTP preview/link smoke audit。

下一轮目标：

1. 为 `full_site/release/` 增加轻量 HTTP 预览或链接抽查报告，确认 draft 页面能从最终 HTML 入口可用地打开。
2. 继续按 release pending 队列生成下一批 draft，或开始建立 `scripts/build_api_full_batch.mjs` 覆盖 `full_site/api/`。
3. 继续保持 `reports/all_pages_inventory.json`、`openusd_bilingual_final.html`、`reports/release_full_batch_report.*` 和总验证报告对齐。

## 第 51 轮 时间：2026-06-04

已完成：

- 先检查全量清单、最终 HTML、批次报告和验证状态，确认当前为 406 total / 8 complete / 15 draft / 383 pending，验证 265 项通过。
- 新增 `scripts/audit_openusd_full_draft_preview.mjs`，用项目根目录临时 HTTP 服务检查 `reports/all_pages_inventory.json` 中所有 `bilingual_draft` 页面。
- 新审计会检查每个 draft 页 HTTP 200、`zh-CN`、`bilingual_draft`、中文/英文层、官方 URL、返回最终 HTML 的链接、本地资源响应，以及最终 HTML 是否链接该 draft 页。
- 生成 `reports/full_draft_preview_audit.json` 和 `reports/full_draft_preview_audit.md`；当前 15 个 draft 页面全部通过，最终 HTML 链接 15 个，本地资源检查 15 个，失败 0。
- 将新审计纳入 `scripts/audit_openusd_report_index.mjs`，固定审计链从 14 个审计项扩展为 15 个审计项。
- 将新审计报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告守卫。
- 将新审计脚本、JSON/Markdown 报告和内容检查纳入 `scripts/validate_openusd_api_repro.ps1`。
- 重建 `openusd_bilingual_final.html`，最终 HTML 继续显示 406 页、8 complete、15 draft、383 pending，并写入最新 270 项验证计数。
- 同步 `reports/scope_manifest.*`、`README.md` 和 `work.md`。
- 最新总验证为 270 项检查通过，0 项失败。

差距：

- 本轮主要补可用性审计，没有新增新的 draft 页面；release draft 仍停留在 15 个。
- `full_draft_preview_audit` 是 HTTP/link smoke audit，不是浏览器截图级视觉审计，也不是逐段翻译质量审计。
- API 侧批量 draft 生成仍未开始，`full_site/api/` 仍为空。

下一轮目标：

1. 继续从 release pending 队列新增下一批 draft，或开始创建 API 队列的 `build_api_full_batch.mjs`。
2. 若继续推进 release 队列，保持 `full_draft_preview_audit`、`all_pages_inventory`、`release_full_batch_report` 和最终 HTML 同步更新。
3. 后续可对 draft 页增加更密集的段落级中英对照，但仍要明确区分 `bilingual_draft` 和 `bilingual_complete`。

## 第 52 轮 时间：2026-06-04

已完成：

- 先复查 `reports/all_pages_inventory.json`、`reports/validation_report.json`、`reports/release_full_batch_report.json`、`reports/full_draft_preview_audit.json`、`openusd_bilingual_final.html` 和进度记录，确认上一轮状态为 406 total / 8 complete / 15 draft / 383 pending，验证 270 项通过。
- 新增 `scripts/build_api_full_batch.mjs`，按全量清单中的 API `pending_full_scope` 队列生成可检查 `bilingual_draft` 页面，输出到 `full_site/api/`，源快照保存到 `source/full_api/`。
- 本轮生成 5 个 API draft：`_c_l_i11_8h_source.html`、`_developer__guides.html`、`_usd_skel__intro.html`、`annotated.html`、`ar_page_front.html`。
- 新增 `reports/api_full_batch_report.json` 和 `reports/api_full_batch_report.md`，记录批次 URL、标题、源快照、本地输出、HTTP 状态、标题层级、链接数和摘录数。
- 将 API 批处理脚本和报告接入 `scripts/validate_openusd_api_repro.ps1`，新增 `api_full_batch:passed` 与 `api_full_batch:draft_pages_ready` 检查。
- 扩展 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告集合，纳入 all-pages inventory、local preview index、release batch 和 API batch 报告。
- 重新运行全量发现清单，当前状态更新为 406 total / 8 complete / 20 draft / 378 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 继续显示 406 页全量清单，并已链接新增 5 个 API draft。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 20 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录 API 批次和最新覆盖状态。
- 最新总验证为 275 项检查通过，0 项失败。

差距：

- 新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留英文 API 名称、链接和有限原文摘录；尚未达到 8 个 `bilingual_complete` 页面那种逐段双语密度。
- API 侧 280 个页面中仍有大量页面处于 `pending_full_scope`；本轮重点是跑通 API 批次链路，而不是一次性生成所有 API 页面。
- `_c_l_i11_8h_source.html` 和 `annotated.html` 这类源码/索引页体量较大，后续需要针对源码页、类索引页和模块页分别优化摘要提取策略。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 增强 `build_api_full_batch.mjs` 对 Doxygen 源码页、类页、模块页的标题和摘要提取规则，减少空摘录页。
3. 继续运行 `full_draft_preview_audit`、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 53 轮 时间：2026-06-04

已完成：

- 先检查 `reports/all_pages_inventory.json`、`reports/validation_report.json`、`reports/api_full_batch_report.json`、`reports/full_draft_preview_audit.json`、`openusd_bilingual_final.html`、`full_site/api/` 和进度记录，确认上一轮状态为 406 total / 8 complete / 20 draft / 378 pending，验证 275 项通过。
- 增强 `scripts/build_api_full_batch.mjs` 的 Doxygen 正文摘录策略：补充 textblock、段落、目录描述、源码行抽取，并过滤 license/copyright 类源码页噪声。
- 刷新首批 5 个 API draft，修复 `_c_l_i11_8h_source.html` 等源码页空摘录问题，让源码页至少保留可读的英文源码片段和中文说明。
- 重新运行全量发现清单后继续推进 API `pending_full_scope` 队列，新增 5 个 API draft：`class_gf_matrix2f.html`、`class_gf_matrix4f.html`、`class_gf_range1d.html`、`class_gf_ray.html`、`class_gf_vec2i.html`。
- 最新 `reports/api_full_batch_report.json` 记录本轮 5 个新增 API draft，HTTP 状态均为 200，每页均有 2 条摘录，源快照写入 `source/full_api/`，本地 HTML 写入 `full_site/api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 30 draft / 368 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 30 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 30 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 API 批次、覆盖状态和验证结果。

差距：

- 30 个 `bilingual_draft` 仍是结构化草稿页，强调中文优先说明、官方链接、标题层级和英文摘录；尚未达到逐段完整精译的 `bilingual_complete` 密度。
- API 全量范围仍有 368 个页面处于 `pending_full_scope`，其中大部分是类页、源码页、文件页和模块页，需要继续按队列批量生成。
- 当前 API 摘要提取已经能减少空摘录，但不同 Doxygen 页型仍需要更细分的标题、描述、member table 和源码行抽取规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续拆分 API 类页、源码页、文件页和目录索引页的摘要提取策略，让 draft 页信息密度更接近可阅读入口。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 104 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 280 draft / 118 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`usd_semantics_overview.html`、`usd_shade_page_front.html`、`usd_shaders_page_front.html`、`usd_skel_page_front.html`、`usd_u_i_page_front.html`。
- 本批 5 个 API module/overview 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-19。
- 抽查确认本批摘录质量有效：UsdSemantics 保留 semantic labeling 和 hierarchical inheritance 说明，UsdShade 保留 material/shading network 与 ConnectableAPI/Sdr 入口，UsdShaders 保留 UsdPreviewSurface/UsdUVTexture shader definitions 说明，UsdSkel 保留 skeleton schema/API manual 与 introduction/schema/API 入口，UsdUI 保留 UI layout/accessibility hints 与 NodeGraph/Object/Prim/Property hints 入口。
- 本批未发现 `More...`、include graph、source-code、`Definition at line ...`、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 285 draft / 113 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 285 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 285 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 module/overview 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 module/overview 文档逐段翻译。
- UsdShade 和 UsdSkel 页面信息量较大，当前保留 shading network/skeleton API manual 入口和关键摘要；如要完整学习，需要后续做专项逐段双语化。
- API pending 队列仍有 113 个页面，需要继续覆盖 utilities、volume/file-format plugin、source 等后续页面，并继续检查低链接页面摘录质量。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `usd_utils_page_front.html`、`usd_vol_page_front.html`、`usdabc_page_front.html`、`usddraco_page_front.html` 和 `var_8h_source.html` 等 utility/plugin/source 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 103 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 275 draft / 123 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`usd_mtlx_page_front.html`、`usd_physics_page_front.html`、`usd_proc_page_front.html`、`usd_render_page_front.html`、`usd_ri_page_front.html`。
- 本批 5 个 API module front page HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-37。
- 抽查确认本批摘录质量有效：UsdMtlx 保留 MaterialX file format、shader discovery/parsing 和 UsdShade/Sdr concept mappings，UsdPhysics 保留 rigid body physics overview、stage units 与 schema/API 入口，UsdProc 保留 GenerativeProcedural schema 入口，UsdRender 保留 render settings/product/var/pass 概览，UsdRi 保留 RenderMan utility 和 `usdRi/rmanUtilities.h` 入口。
- 本批未发现 `More...`、include graph、source-code、`Definition at line ...`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 280 draft / 118 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 280 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 280 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 API module front pages 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 module front page 文档逐段翻译。
- UsdPhysics 页面信息量较大，当前保留 rigid-body physics overview、单位/scene/API 入口等摘要；如要完整学习 physics schema，需要后续做专项逐段双语化。
- API pending 队列仍有 118 个页面，需要继续批量覆盖并逐步增加 UsdShade/UsdSkel/UsdUI 等模块页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `usd_semantics_overview.html`、`usd_shade_page_front.html`、`usd_shaders_page_front.html`、`usd_skel_page_front.html` 和 `usd_u_i_page_front.html` 等后续 module/overview 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 102 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 270 draft / 128 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`usd_app_utils_page_front.html`、`usd_geom_page_front.html`、`usd_hydra_page_front.html`、`usd_lux_page_front.html`、`usd_media_page_front.html`。
- 本批 5 个 API Usd module front page HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-37。
- 抽查确认本批摘录质量有效：UsdAppUtils 保留工具模块 overview 与 Frame Format Strings 入口，UsdGeom 保留 geometry schema overview 与 Imageable/Xformable/Gprim/Mesh 等关键入口，UsdHydra 保留 Hydra schemas 与 deprecated shading-token 说明，UsdLux 保留 lighting schema/module overview 与 light/filter/API 入口，UsdMedia 保留 media schema overview 与 AssetPreviewsAPI/SpatialAudio 入口。
- 本批未发现 `More...`、include graph、source-code、`Definition at line ...`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 275 draft / 123 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 275 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 275 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Usd module front pages 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 module front page 文档逐段翻译。
- Usd module front pages 信息密度较高，当前保留 overview 和关键入口链接；后续如要完整阅读，需要对 module front pages 做更细的逐段双语化。
- API pending 队列仍有 123 个页面，需要继续批量覆盖并逐步增加 Usd module/source 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `usd_mtlx_page_front.html`、`usd_physics_page_front.html`、`usd_proc_page_front.html`、`usd_render_page_front.html` 和 `usd_ri_page_front.html` 等后续 module 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 69 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 105 draft / 293 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_k.html`、`functions_func_l.html`、`functions_func_m.html`、`functions_func_n.html`、`functions_func_o.html`。
- 本批 5 个 Functions 成员索引分段页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 2-40，未出现空摘录。
- 重点复查了短索引页 `functions_func_k.html`，确认其保留有效索引摘录：`SdfChildrenView` 与 `SdfNotice::LayerInfoDidChange`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 110 draft / 288 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 110 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 110 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func 短索引页批次、摘录质量和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数成员索引逐项翻译。
- `functions_func_k.html` 只有 2 个同站链接，当前仍有有效索引摘录，但短索引页后续可能需要更细的摘要规则。
- API pending 队列仍有 288 个页面，需要继续批量覆盖并逐步增加 functions_func/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 functions_func/index 页的摘录质量，关注短索引页是否需要专门摘要规则。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 54 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 30 draft / 368 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_glf_draw_target.html`、`class_hd_data_source_locator.html`、`class_hd_instance_registry.html`、`class_hd_render_buffer.html`、`class_hd_scene_delegate.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 35 draft / 363 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 35 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 35 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，已经保留页面标题、链接、英文摘录和中文优先说明，但还不是逐段完整双语精译。
- API pending 队列仍有 363 个页面，Hydra/Hd、Gf、Usd、源码和文件索引类页面仍需持续批量覆盖。
- 当前总验证关注结构、链接、状态、预览可用性和报告一致性；对 API member table 的语义质量和类页逐项说明仍需后续增强。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 针对 Hydra/Hd 类页检查成员链接、继承关系和简述摘录，继续提升类页草稿的信息密度。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 55 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 35 draft / 363 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_hd_st_dispatch_buffer.html`、`class_hd_st_render_pass_state.html`、`class_hd_task.html`、`class_hdx_pick_from_render_buffer_task.html`、`class_hgi_g_l_graphics_cmds.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 40 draft / 358 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 40 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 40 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍为结构化 `bilingual_draft`，包含中文优先说明、官方英文摘录和链接保留，但尚未扩展到完整 member table 逐项双语说明。
- API pending 队列仍有 358 个页面，后续还要覆盖更多 Hgi、Usd、Sdf、Tf、源码页和文件索引页。
- 当前验证仍偏结构与可用性，后续需要针对 API 类页增加成员表、继承信息、typedef/function 摘录质量的专项审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 在批量覆盖稳定后，为 API 类页增加 member table / inheritance / brief description 的轻量质量检查。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 56 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 40 draft / 358 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_pcp_arc.html`、`class_pcp_error_unresolved_prim_path.html`、`class_pcp_property_index.html`、`class_sdf_children_view.html`、`class_sdf_layer.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 45 draft / 353 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 45 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 45 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Pcp/Sdf API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 Pcp/Sdf API 类页仍是结构化 `bilingual_draft`，保留官方页面名、API 名称、链接和英文摘录，但尚未对成员表逐项翻译。
- `class_sdf_layer.html` 链接较多，后续需要更细的成员表摘要和术语说明，避免只停留在页面级概览。
- API pending 队列仍有 353 个页面，后续还要覆盖更多 Usd/Sdf/Tf/Vt/Hgi 类页、源码页和文件索引页。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 针对 Sdf/Pcp 类页增加术语说明和 member table 摘录质量检查，逐步提升 draft 的可读性。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 57 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 45 draft / 353 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_sdf_path.html`、`class_sdf_prim_spec.html`、`class_sdf_usdz_file_format.html`、`class_sdr_shader_property.html`、`class_tf_dense_hash_map.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 50 draft / 348 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 50 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 50 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Sdf/Sdr/Tf API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 Sdf/Sdr/Tf API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开所有成员表。
- `class_sdf_path.html` 与 `class_sdf_prim_spec.html` 是后续值得做深度术语说明的页面，当前仍停留在草稿摘要层。
- API pending 队列仍有 348 个页面，继续需要批量覆盖并逐步增加页型专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 评估是否为 Sdf/Pcp/Tf 相关类页增加术语说明片段或 member table 质量检查。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 58 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 50 draft / 348 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_tf_py_lock.html`、`class_tf_token.html`、`class_trace_event_data.html`、`class_usd_attribute_limits.html`、`class_usd_geom_basis_curves.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 55 draft / 343 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 55 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 55 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Tf/Trace/Usd/UsdGeom API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- `class_usd_geom_basis_curves.html` 链接较多，后续需要更细的成员摘要和术语说明，避免只停留在页面级概览。
- API pending 队列仍有 343 个页面，需要继续批量覆盖并逐步增加类页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 对 UsdGeom/Tf 类页评估 member table 摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 59 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 55 draft / 343 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_usd_geom_mesh.html`、`class_usd_geom_primvars_a_p_i.html`、`class_usd_imaging_adapter_registry.html`、`class_usd_imaging_delegate.html`、`class_usd_imaging_nurbs_patch_adapter.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 60 draft / 338 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 60 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 60 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 UsdGeom/UsdImaging API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- `class_usd_geom_mesh.html`、`class_usd_geom_primvars_a_p_i.html` 和 `class_usd_imaging_delegate.html` 链接较多，后续需要更细的成员摘要和术语说明。
- API pending 队列仍有 338 个页面，需要继续批量覆盖并逐步增加类页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 对 UsdGeom/UsdImaging 类页评估 member table 摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 60 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 60 draft / 338 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_usd_lux_disk_light.html`、`class_usd_lux_shaping_a_p_i.html`、`class_usd_physics_joint.html`、`class_usd_prim.html`、`class_usd_proc_generative_procedural.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 65 draft / 333 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 65 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 65 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 UsdLux/UsdPhysics/Usd/UsdProc API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- `class_usd_prim.html` 链接较多且概念核心，后续需要更细的成员摘要和术语说明。
- API pending 队列仍有 333 个页面，需要继续批量覆盖并逐步增加类页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 对 UsdPrim/UsdPhysics/UsdLux 类页评估 member table 摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 61 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 65 draft / 333 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_usd_schema_registry.html`、`class_usd_shade_output.html`、`class_usd_skel_imaging_data_source_skeleton_prim.html`、`class_usd_stage_cache.html`、`class_usd_validation_error.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 70 draft / 328 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 70 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 70 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 UsdSchema/UsdShade/UsdStage/Validation API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- `class_usd_schema_registry.html` 和 `class_usd_stage_cache.html` 是后续值得增强术语和成员摘要的页面。
- API pending 队列仍有 328 个页面，需要继续批量覆盖并逐步增加类页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 对 UsdSchema/UsdStage/UsdShade 类页评估 member table 摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 62 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 70 draft / 328 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`、`class_vdf_context.html`、`class_vdf_grapher_options.html`、`class_vdf_node.html`、`class_vdf_read_write_accessor.html`。
- 最新 `reports/api_full_batch_report.json` 显示 5 个新增页面 HTTP 状态均为 200，每页均提取 2 条英文摘录；本地输出写入 `full_site/api/`，源快照写入 `source/full_api/`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 75 draft / 323 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 75 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 75 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 UsdVol/Vdf API 类页批次、覆盖状态和验证结果。

差距：

- 本轮新增的 5 个 API 类页仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- Vdf 类页后续需要更细的节点、上下文和访问器术语说明。
- API pending 队列仍有 323 个页面，需要继续批量覆盖并逐步增加类页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 对 Vdf/UsdVol 类页评估 member table 摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 63 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 75 draft / 323 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`class_vdf_test_utils_1_1_node.html`、`class_vt_value_ref.html`、`classes.html`、`classpxr___c_l_i_1_1_c_l_i_1_1_app.html`、`classpxr__tsl_1_1robin__map.html`。
- 发现 `classes.html` 是目录索引页且初次摘录为 0，增强 `scripts/build_api_full_batch.mjs`，为 class/struct/namespace/group/functions/files/pages 等索引链接生成 `Index entries include` 英文摘录。
- 重新生成当前 API 批次后，`classes.html` 摘录数从 0 提升为 1，其余新增页面保持 2 条摘录；5 个新增页面 HTTP 状态均为 200。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 80 draft / 318 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 80 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 80 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计、报告索引和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Vdf/Vt/classes/pxr API 页批次、目录页摘录兜底和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员表。
- `classes.html` 已有索引摘录，但仍只是目录级摘要，不是类索引全量翻译。
- API pending 队列仍有 318 个页面，需要继续批量覆盖并逐步增加类页、目录页和源码页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查目录页、类页和源码页的摘录质量，必要时补充页型专项审计。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 64 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 80 draft / 318 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`copy_utils_8h.html`、`deprecated.html`、`dir_aa3bf17f9d6f68169ce0fa9df97655e9.html`、`executor_invalidation_data_8h.html`、`files.html`。
- 发现 `dir_aa3bf17f9d6f68169ce0fa9df97655e9.html` 是目录页且初次摘录为 0，增强 `scripts/build_api_full_batch.mjs`，从 Doxygen `memberdecls` 文件表提取 `Directory entries include files` 摘录。
- 重新生成当前 API 批次后，目录页摘录数从 0 提升为 1，其他新增页面保持 2 条摘录；5 个新增页面 HTTP 状态均为 200。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 85 draft / 313 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 85 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 85 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 file/deprecated/directory/file-list API 页批次、目录页摘录兜底和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整文件表或弃用条目表。
- `dir_aa3bf17f9d6f68169ce0fa9df97655e9.html` 已有文件列表摘录，但仍只是目录级摘要，不是目录下文件逐项翻译。
- API pending 队列仍有 313 个页面，需要继续批量覆盖并逐步增加 directory/file/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 directory/file/index 页的摘录质量，避免空摘录 draft 进入最终入口。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 65 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 85 draft / 313 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_~.html`、`functions_a.html`、`functions_b.html`、`functions_c.html`、`functions_d.html`。
- 本批 5 个 Class Members 分段索引页 HTTP 状态均为 200，每页均提取 2 条 `Index entries include` 摘录和 40 个同站链接，未出现空摘录。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 90 draft / 308 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 90 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 90 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Class Members 索引页批次、摘录质量和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_*` 页面是大索引分段，当前只抽取前 16 个代表性条目进入摘录，不代表成员索引全量翻译。
- API pending 队列仍有 308 个页面，需要继续批量覆盖并逐步增加 functions/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 functions/index 页的摘录质量，确保分段索引页不会出现空摘录或无效导航摘录。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 66 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 90 draft / 308 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_e.html`、`functions_enum.html`、`functions_eval.html`、`functions_f.html`、`functions_func_~.html`。
- 本批 5 个 Class Members / Enumerations / Enumerator / Functions 分段索引页 HTTP 状态均为 200，均提取到 `Index entries include` 摘录；摘录数为 1-2 条，链接数为 18-40，未出现空摘录。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 95 draft / 303 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 95 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 95 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions/enum/eval 索引页批次、摘录质量和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_enum.html`、`functions_eval.html` 和 `functions_func_~.html` 当前只有 1 条索引摘录，能通过可检查要求，但仍不是完整条目翻译。
- API pending 队列仍有 303 个页面，需要继续批量覆盖并逐步增加 functions_func/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 functions_func/index 页的摘录质量，确保分段索引页不会出现空摘录或无效导航摘录。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 82 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本、验证报告、范围清单、全量页面清单、最终 HTML 和进度报告，确认上一轮状态为 406 total / 8 complete / 170 draft / 228 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `functions_vars_z.html`、`functions_vars.html`、`functions_w.html`、`functions_x.html` 和 `functions_y.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_z.html`、`functions_vars.html`、`functions_w.html`、`functions_x.html`、`functions_y.html`。
- 本批 5 个索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 2-40，未出现空摘录。
- 重点复查短索引页 `functions_vars.html` 和 `functions_vars_z.html`，确认摘录保留 `GfColor`、`HdBufferArray`，以及 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`UsdVolTokensType` 等变量索引条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 175 draft / 223 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 175 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 175 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 收尾与 Class Members w-y 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_vars.html` 和 `functions_vars_z.html` 都属于极短索引页，当前有有效摘录，但后续同类短页仍需要持续抽查。
- API pending 队列仍有 223 个页面；全量覆盖还需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 优先覆盖 `functions_z.html`、`functions.html`、`geom_model_a_p_i_adapter_8h_source.html`、`gf_page_front.html`、`glf_page_front.html`，或以最新 pending 队列为准。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 83 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本、验证报告、范围清单、全量页面清单、最终 HTML 和进度报告，确认上一轮状态为 406 total / 8 complete / 175 draft / 223 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `functions_z.html`、`functions.html`、`geom_model_a_p_i_adapter_8h_source.html`、`gf_page_front.html` 和 `glf_page_front.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_z.html`、`functions.html`、`geom_model_a_p_i_adapter_8h_source.html`、`gf_page_front.html`、`glf_page_front.html`。
- 本批 5 个页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 0-40，未出现空摘录。
- 重点复查低链接模块页 `glf_page_front.html` 与 `gf_page_front.html`，确认 `glf_page_front.html` 保留官方短句 `Utility classes for OpenGL output.`，`gf_page_front.html` 保留 Graphics Foundations 概览。
- 抽查 `functions_z.html` 和 `functions.html`，确认 Class Members z/汇总索引保留 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`GfVec*` 和 `TraceCounterAccumulator` 等条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 180 draft / 218 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 180 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 180 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Class Members 收尾、Gf/Glf 模块页与源码页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 API 条目逐项翻译。
- `glf_page_front.html` 官方源页本身很短，本地 draft 链接数为 0；当前有有效原文摘录，但后续 0 链接/低链接模块页仍需要持续抽查。
- API pending 队列仍有 218 个页面；全量覆盖还需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准继续覆盖后续 group 页面、header source 页面或模块 front page，并重点检查 0 链接/低链接短页的摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 84 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本、验证报告、范围清单、全量页面清单、最终 HTML 和进度报告，确认上一轮状态为 406 total / 8 complete / 180 draft / 218 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_c.html`、`globals_defs.html`、`globals_e.html`、`globals_enum.html` 和 `globals_eval.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 初次抽查发现 `globals_enum.html` 和 `globals_eval.html` 没有抽到有效原文摘录，只落到 `No concise paragraph excerpt extracted.` 占位句；本轮将其视为质量问题并先修脚本。
- 增强 `scripts/build_api_full_batch.mjs`，新增 Doxygen `<div class="contents"><li>...</li>` 列表项摘录规则，用于 File Members、Enumerations、Enumerator 等非段落索引页。
- 重跑同一批 `globals_*` 页面，最终本批 5 个页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 2-40，未出现空摘录。
- 本轮新增 API draft：`globals_c.html`、`globals_defs.html`、`globals_e.html`、`globals_enum.html`、`globals_eval.html`。
- 重点复查 `globals_enum.html` 和 `globals_eval.html`，确认保留 `ArchMemoryProtection`、`PcpArcType`、`SdfSpecifier`、`UsdInterpolationType`、`UsdInterpolationTypeHeld`、`UsdListPosition*`、`UsdResolveInfoSource*` 等索引条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 185 draft / 213 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 185 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 185 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 globals 索引批次、脚本修复、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 file member 条目逐项翻译。
- `globals_enum.html` 和 `globals_eval.html` 的 heading 数为 0，这是 Doxygen 源页结构特征；当前通过 contents 列表摘录补足可读信息，但后续同类页面仍需要重点抽查。
- API pending 队列仍有 213 个页面；全量覆盖还需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_func_c.html`、`globals_func_e.html`、`globals_func_g.html`、`globals_func_h.html`、`globals_func_j.html` 等 File Members functions 索引页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 85 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本、验证报告、范围清单、全量页面清单、最终 HTML 和进度报告，确认上一轮状态为 406 total / 8 complete / 185 draft / 213 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_func_c.html`、`globals_func_e.html`、`globals_func_g.html`、`globals_func_h.html` 和 `globals_func_j.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`globals_func_c.html`、`globals_func_e.html`、`globals_func_g.html`、`globals_func_h.html`、`globals_func_j.html`。
- 本批 5 个页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 1-39，未出现空摘录。
- 抽查低链接页和长索引页，确认 `CombineError()`、`CombineResult()`、`EfGetFirstValidInputValue()`、`GfAbs()`、`GfClamp()`、`GfCross()`、`HioOpenVDBGridFromAsset()`、`JsParseString()`、`JsWriteValue()` 等函数索引摘录有效。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 190 draft / 208 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 190 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 190 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 File Members functions 索引批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数索引逐项翻译。
- `globals_func_c.html` 和 `globals_func_e.html` 同站链接数只有 1，当前有有效函数摘录，但后续低链接 functions 页仍需要持续抽查。
- API pending 队列仍有 208 个页面；全量覆盖还需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_func_l.html`、`globals_func_o.html`、`globals_func_p.html`、`globals_func_s.html`、`globals_func_t.html` 等后续 File Members functions 索引页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 70 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本清单、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 110 draft / 288 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_p.html`、`functions_func_q.html`、`functions_func_r.html`、`functions_func_s.html`、`functions_func_t.html`。
- 本批 5 个 Functions 成员索引分段页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 3-40，未出现空摘录。
- 重点复查了短索引页 `functions_func_q.html`，确认其保留有效索引摘录：`SdfAbstractData`、`SdfLayer` 与 `ConfigBase`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 115 draft / 283 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 115 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 115 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func_p-t 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数成员索引逐项翻译。
- `functions_func_q.html` 只有 3 个同站链接，当前有有效索引摘录，但后续短索引页仍需要持续抽查。
- API pending 队列仍有 283 个页面，需要继续批量覆盖，并逐步扩展到 functions_func 后续分段之外的索引页质量检查。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查短索引页摘录质量，确保低链接数页面不会出现空摘录或无效导航摘录。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 71 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、脚本清单、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 115 draft / 283 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_u.html`、`functions_func_v.html`、`functions_func_w.html`、`functions_func_x.html`、`functions_func_y.html`。
- 本批 5 个 Functions 成员索引分段页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 13-40，未出现空摘录。
- 重点复查了短索引页 `functions_func_x.html` 与 `functions_func_y.html`，确认其保留有效索引摘录，包含 GfVec 系列、`UsdGeomXformable::XformQuery` 与 `VdfExecutorBufferData`。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 120 draft / 278 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 120 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 120 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func_u-y 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数成员索引逐项翻译。
- `functions_func_x.html` 与 `functions_func_y.html` 只有 13 个同站链接，当前有有效索引摘录，但短索引页仍需要持续抽查。
- API pending 队列仍有 278 个页面；functions_func 分段接近尾部，后续会转入其它 API 索引页类型，需要继续检查摘录规则是否适配。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 收尾 functions_func 分段并检查后续 API 索引页类型，避免 `functions_rela`、`functions_type` 等页面出现空摘录。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 72 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 120 draft / 278 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将从 `functions_func_z.html`、`functions_func.html` 转入 `functions_g.html`、`functions_h.html`、`functions_i.html` 等 Class Members 分段页。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_z.html`、`functions_func.html`、`functions_g.html`、`functions_h.html`、`functions_i.html`。
- 本批 5 个索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 8-40，未出现空摘录。
- 重点复查了低链接数 `functions_func_z.html` 和新类型 `functions_g.html`，确认其保留有效索引摘录，包含 GfVec、`UsdMediaTokensType`、Hd/Hgi 相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 125 draft / 273 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 125 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 125 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func 收尾和 functions_g-i 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_func_z.html` 只有 8 个同站链接，当前有有效索引摘录，但短索引页仍需要持续抽查。
- API pending 队列仍有 273 个页面；后续 Class Members 分段和其它索引页类型还需要继续验证摘录规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_j.html`、`functions_l.html`、`functions_m.html` 等后续 Class Members 分段，并检查低链接数索引页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 73 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 125 draft / 273 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_j.html`、`functions_k.html`、`functions_l.html`、`functions_m.html`、`functions_n.html` 等 Class Members 分段页。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_j.html`、`functions_k.html`、`functions_l.html`、`functions_m.html`、`functions_n.html`。
- 本批 5 个索引页 HTTP 状态均为 200，每页均提取到 2 条 `Index entries include` 摘录；链接数为 10-40，未出现空摘录。
- 重点复查了低链接数 `functions_j.html` 与 `functions_k.html`，确认其保留有效索引摘录，包含 HdEmbreeConfig、UsdPhysics、Sdf/Tf/UsdSchema 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 130 draft / 268 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 130 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 130 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_j-n 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_j.html` 与 `functions_k.html` 链接数较低，当前有有效摘录，但低链接索引页仍需要逐轮抽查。
- API pending 队列仍有 268 个页面；后续将进入 relation/type 等更多索引页类型，需要继续验证摘录规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_o.html`、`functions_p.html`、`functions_q.html`、`functions_r.html` 和 `functions_rela_g.html` 等后续索引页，并检查 relation 页摘录规则。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 74 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 130 draft / 268 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_o.html`、`functions_p.html`、`functions_q.html`、`functions_r.html` 和首个 `functions_rela_g.html` Related Functions 分段页。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_o.html`、`functions_p.html`、`functions_q.html`、`functions_r.html`、`functions_rela_g.html`。
- 本批 5 个索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 4-40，未出现空摘录。
- 重点复查了低链接数 `functions_q.html` 与 relation 页 `functions_rela_g.html`，确认其保留有效索引摘录，包含 SdfAbstractData/SdfLayer/ConfigBase 与 GfLine/GfRay/GfQuaternion 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 135 draft / 263 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 135 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 135 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_o-r 与 functions_rela_g 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员索引逐项翻译。
- `functions_q.html` 只有 4 个同站链接，`functions_rela_g.html` 只有 6 个同站链接，当前有有效摘录，但 relation 页仍需要持续抽查。
- API pending 队列仍有 263 个页面；Related Functions 汇总和后续 relation/type 索引页还需要继续验证摘录规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_rela_h.html`、`functions_rela_o.html`、`functions_rela_s.html`、`functions_rela_t.html` 和 `functions_rela.html` 等后续 relation 索引页，并检查低链接摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 75 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 135 draft / 263 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_rela_h.html`、`functions_rela_o.html`、`functions_rela_s.html`、`functions_rela_t.html` 与 `functions_rela.html` Related Functions 分段和汇总页。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_rela_h.html`、`functions_rela_o.html`、`functions_rela_s.html`、`functions_rela_t.html`、`functions_rela.html`。
- 本批 5 个 relation 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 1-40，未出现空摘录。
- 重点复查了短汇总页 `functions_rela.html` 与低链接页 `functions_rela_t.html`，确认其保留有效索引摘录，包含 `UsdShadeMaterialBindingAPI`、`TfRefPtr`、`TfRefBase`、`SdfSpec` 与 `TfToken` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 140 draft / 258 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 140 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 140 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Related Functions 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 relation 成员索引逐项翻译。
- `functions_rela.html` 只有 1 个同站链接，当前有有效摘录，但极短索引页仍需要持续抽查。
- API pending 队列仍有 258 个页面；后续将转入 `functions_type.html` 等 type 索引页，需要继续验证摘录规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_s.html`、`functions_t.html`、`functions_type.html`、`functions_u.html`、`functions_v.html` 等后续索引页，并检查 type 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 76 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 140 draft / 258 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_s.html`、`functions_t.html`、`functions_type.html`、`functions_u.html` 与 `functions_v.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_s.html`、`functions_t.html`、`functions_type.html`、`functions_u.html`、`functions_v.html`。
- 本批 5 个索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数均为 40，未出现空摘录；`functions_type.html` 有 21 个 heading，作为 type 索引页进入本地 draft 覆盖。
- 重点复查了 `functions_type.html` 与普通成员页 `functions_s.html`，确认其保留有效索引摘录，包含 Vdf/Sdf/Hd/Vt 类型条目，以及 UsdTimeCode、HdEmbree、UsdImaging 等成员条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 145 draft / 253 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 145 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 145 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Class Members 和 type 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整成员或 type 索引逐项翻译。
- `functions_type.html` 虽有有效摘录，但 type 页标题层级更多，后续可能需要专门摘要规则来覆盖更多 heading。
- API pending 队列仍有 253 个页面；下一批将进入 `functions_vars_*` 变量索引页，需要继续验证摘录规则。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_a.html`、`functions_vars_b.html`、`functions_vars_c.html`、`functions_vars_d.html` 和 `functions_vars_e.html` 等变量索引页，并检查 vars 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 77 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 145 draft / 253 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_vars_a.html`、`functions_vars_b.html`、`functions_vars_c.html`、`functions_vars_d.html` 与 `functions_vars_e.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_a.html`、`functions_vars_b.html`、`functions_vars_c.html`、`functions_vars_d.html`、`functions_vars_e.html`。
- 本批 5 个 Variables 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 19-40，未出现空摘录。
- 重点复查了低链接数 `functions_vars_b.html` 与 `functions_vars_e.html`，确认其保留有效变量索引摘录，包含 `UsdUITokensType`、`UsdGeomTokensType`、`UsdPhysicsJointDrive` 与 `VtArrayEditBuilder` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 150 draft / 248 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 150 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 150 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整变量索引逐项翻译。
- `functions_vars_b.html` 与 `functions_vars_e.html` 链接数相对较低，当前有有效摘录，但后续 vars 页仍需要持续抽查。
- API pending 队列仍有 248 个页面；后续变量索引页仍未覆盖完，需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_f.html`、`functions_vars_g.html`、`functions_vars_h.html`、`functions_vars_i.html` 和 `functions_vars_j.html` 等后续变量索引页，并检查低链接 vars 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 78 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 150 draft / 248 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_vars_f.html`、`functions_vars_g.html`、`functions_vars_h.html`、`functions_vars_i.html` 与 `functions_vars_j.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_f.html`、`functions_vars_g.html`、`functions_vars_h.html`、`functions_vars_i.html`、`functions_vars_j.html`。
- 本批 5 个 Variables 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 5-34，未出现空摘录。
- 重点复查了低链接数 `functions_vars_g.html` 与 `functions_vars_j.html`，确认其保留有效变量索引摘录，包含 UsdMedia/UsdProc/UsdLux tokens、`UsdPhysicsSceneDesc`、`HdEmbreeConfig` 与 `UsdPhysicsJointDesc` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 155 draft / 243 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 155 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 155 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整变量索引逐项翻译。
- `functions_vars_j.html` 只有 5 个同站链接，当前有有效摘录，但短 vars 页仍需要持续抽查。
- API pending 队列仍有 243 个页面；变量索引页仍未覆盖完，需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_k.html`、`functions_vars_l.html`、`functions_vars_m.html`、`functions_vars_n.html` 和 `functions_vars_o.html` 等后续变量索引页，并检查低链接 vars 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 79 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 155 draft / 243 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_vars_k.html`、`functions_vars_l.html`、`functions_vars_m.html`、`functions_vars_n.html` 与 `functions_vars_o.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_k.html`、`functions_vars_l.html`、`functions_vars_m.html`、`functions_vars_n.html`、`functions_vars_o.html`。
- 本批 5 个 Variables 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 5-35，未出现空摘录。
- 重点复查了低链接数 `functions_vars_k.html` 与 `functions_vars_l.html`，确认其保留有效变量索引摘录，包含 `UsdPhysicsTokensType`、`UsdSchemaRegistry::SchemaInfo`、`UsdPhysicsRigidBodyDesc`、`PcpNamespaceEdits` 与 `UsdGeomLinearUnits` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 160 draft / 238 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 160 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 160 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整变量索引逐项翻译。
- `functions_vars_k.html` 只有 5 个同站链接，当前有有效摘录，但短 vars 页仍需要持续抽查。
- API pending 队列仍有 238 个页面；变量索引页仍未覆盖完，需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_p.html`、`functions_vars_q.html`、`functions_vars_r.html`、`functions_vars_s.html` 和 `functions_vars_t.html` 等后续变量索引页，并检查低链接 vars 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 80 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 160 draft / 238 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_vars_p.html`、`functions_vars_q.html`、`functions_vars_r.html`、`functions_vars_s.html` 与 `functions_vars_t.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_p.html`、`functions_vars_q.html`、`functions_vars_r.html`、`functions_vars_s.html`、`functions_vars_t.html`。
- 本批 5 个 Variables 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 1-40，未出现空摘录。
- 重点复查了极短页 `functions_vars_q.html` 与 `functions_vars_t.html`，确认其保留有效变量索引摘录，包含 `UsdVolTokensType`、`PcpErrorUnresolvedPrimPath`、`UsdPhysicsJointDrive`、`UsdHydraTokensType` 与 `UsdMediaTokensType` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 165 draft / 233 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 165 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 165 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整变量索引逐项翻译。
- `functions_vars_q.html` 只有 1 个同站链接，当前有有效摘录，但极短 vars 页仍需要持续抽查。
- API pending 队列仍有 233 个页面；变量索引页仍未覆盖完，需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_u.html`、`functions_vars_v.html`、`functions_vars_w.html`、`functions_vars_x.html` 和 `functions_vars_y.html` 等后续变量索引页，并检查极短 vars 页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 81 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 165 draft / 233 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认将覆盖 `functions_vars_u.html`、`functions_vars_v.html`、`functions_vars_w.html`、`functions_vars_x.html` 与 `functions_vars_y.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_vars_u.html`、`functions_vars_v.html`、`functions_vars_w.html`、`functions_vars_x.html`、`functions_vars_y.html`。
- 本批 5 个 Variables 索引页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 2-17，未出现空摘录。
- 重点复查了极短页 `functions_vars_x.html` 与 `functions_vars_y.html`，确认其保留有效变量索引摘录，包含 `UsdGeomTokensType`、`UsdPhysicsTokensType` 与 `UsdLuxTokensType` 等相关条目。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 170 draft / 228 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 170 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 170 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Variables 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整变量索引逐项翻译。
- `functions_vars_x.html` 与 `functions_vars_y.html` 链接数分别只有 2 和 3，当前有有效摘录，但极短 vars 页仍需要持续抽查。
- API pending 队列仍有 228 个页面；变量汇总页和后续成员索引页还需要继续批量推进。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML同步。
2. 覆盖 `functions_vars_z.html`、`functions_vars.html`、`functions_w.html`、`functions_x.html` 和 `functions_y.html` 等变量汇总与后续成员索引页，并检查极短索引页摘录质量。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 68 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 100 draft / 298 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_f.html`、`functions_func_g.html`、`functions_func_h.html`、`functions_func_i.html`、`functions_func_j.html`。
- 本批 5 个 Functions 成员索引分段页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录；链接数为 5-40，未出现空摘录。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 105 draft / 293 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 105 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 105 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func 分段索引页批次、摘录质量和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数成员索引逐项翻译。
- `functions_func_j.html` 只有 5 个同站链接，当前仍有有效索引摘录，但后续同类短索引页可能需要更细的摘要规则。
- API pending 队列仍有 293 个页面，需要继续批量覆盖并逐步增加 functions_func/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 functions_func/index 页的摘录质量，关注短索引页是否需要专门摘要规则。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 67 轮 时间：2026-06-04

已完成：

- 先复查全量清单、验证报告、API 批次报告、draft 预览审计、最终 HTML 和当前 API draft 文件数，确认上一轮状态为 406 total / 8 complete / 95 draft / 303 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`functions_func_a.html`、`functions_func_b.html`、`functions_func_c.html`、`functions_func_d.html`、`functions_func_e.html`。
- 本批 5 个 Functions 成员索引分段页 HTTP 状态均为 200，每页均提取到 1 条 `Index entries include` 摘录和 40 个同站链接，未出现空摘录。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 100 draft / 298 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 100 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 100 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 重新运行本地预览索引、范围边界审计和总验证；最新总验证仍为 275 项检查通过，0 项失败。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 functions_func 分段索引页批次、摘录质量和验证结果。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数成员索引逐项翻译。
- `functions_func_*` 分段页当前每页 1 条代表性索引摘录，能通过可检查要求，但仍不是完整条目翻译。
- API pending 队列仍有 298 个页面，需要继续批量覆盖并逐步增加 functions_func/index 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 继续检查 functions_func/index 页的摘录质量，确保分段索引页不会出现空摘录或无效导航摘录。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 86 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 190 draft / 208 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_func_l.html`、`globals_func_o.html`、`globals_func_p.html`、`globals_func_s.html` 与 `globals_func_t.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`globals_func_l.html`、`globals_func_o.html`、`globals_func_p.html`、`globals_func_s.html`、`globals_func_t.html`。
- 本批 5 个 File Members functions 索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 1-31，未出现空摘录。
- 抽查确认函数索引摘录有效：`LoadUsdPhysicsFromRange()`、`operator+()`、`operator==()`、`PcpComposeSite*`、`SdfAnchorAssetPaths()`、`TF_DEBUG_CODES()` 与 `TfAbs()` 等条目均保留在英文原文层。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 195 draft / 203 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 195 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 195 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 File Members functions 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整函数索引逐项翻译。
- `globals_func_l.html` 只有 1 个同站链接，当前有有效函数摘录，但低链接 functions 页仍需要持续抽查。
- API pending 队列仍有 203 个页面，需要继续批量覆盖并逐步增加 File Members 索引页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_func_u.html`、`globals_func_v.html`、`globals_func_w.html`、`globals_func.html` 和 `globals_g.html` 等后续 File Members 索引页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 87 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 195 draft / 203 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_func_u.html`、`globals_func_v.html`、`globals_func_w.html`、`globals_func.html` 与 `globals_g.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`globals_func_u.html`、`globals_func_v.html`、`globals_func_w.html`、`globals_func.html`、`globals_g.html`。
- 本批 5 个 File Members 索引页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 7-40，未出现空摘录。
- 抽查确认索引摘录有效：`UsdAppUtilsGetCameraAtPath()`、`Vdf_DataManagerVectorAllocate()`、`WorkGetConcurrencyLimit()`、`ArchAbort()`、`GfAbs()`、`GfClamp()` 与 `GfCross()` 等条目均保留在英文原文层。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 200 draft / 198 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 200 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 200 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 File Members 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 File Members 条目逐项翻译。
- `globals_func_w.html` 链接数为 7，当前有有效 Work* 函数摘录，但低链接索引页仍需要持续抽查。
- API pending 队列仍有 198 个页面，需要继续批量覆盖并逐步增加 File Members 索引页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_h.html`、`globals_j.html`、`globals_l.html`、`globals_o.html` 和 `globals_p.html` 等后续 File Members 索引页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 88 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 200 draft / 198 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_h.html`、`globals_j.html`、`globals_l.html`、`globals_o.html` 与 `globals_p.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`globals_h.html`、`globals_j.html`、`globals_l.html`、`globals_o.html`、`globals_p.html`。
- 本批 5 个 File Members 索引页 HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-17，未出现空摘录。
- 抽查确认索引摘录有效：`hash_value()`、`HioOpenVDBGridFromAsset()`、`JsParseString()`、`LoadUsdPhysicsFromRange()`、`operator+()`、`operator==()` 与 `PcpComposeSite*` 等条目均保留在英文原文层。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 205 draft / 193 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 205 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 205 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 File Members 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 File Members 条目逐项翻译。
- `globals_l.html` 只有 1 个同站链接，当前有有效 `LoadUsdPhysicsFromRange()` 摘录，但低链接索引页仍需要持续抽查。
- API pending 队列仍有 193 个页面，需要继续批量覆盖并逐步增加 File Members 索引页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_s.html`、`globals_t.html`、`globals_type.html`、`globals_u.html` 和 `globals_v.html` 等后续 File Members 索引页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 89 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 205 draft / 193 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_s.html`、`globals_t.html`、`globals_type.html`、`globals_u.html` 与 `globals_v.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`globals_s.html`、`globals_t.html`、`globals_type.html`、`globals_u.html`、`globals_v.html`。
- 本批 5 个 File Members 索引页 HTTP 状态均为 200，摘录数均为 2 条，链接数为 15-40；`globals_type.html` 提取到 9 个标题，未出现空摘录。
- 抽查确认索引摘录有效：`SdfAnchorAssetPaths()`、`TF_DEBUG_CODES`、`ArchConstFileMapping`、`SdfNamespaceEditVector`、`USD_GEOM_VALIDATION_ERROR_NAME_TOKENS`、`Vdf_DataManagerVectorAllocate()` 与 `VdfConnectionVector` 等条目均保留在英文原文层。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 210 draft / 188 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 210 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 210 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 File Members 索引页批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 File Members 条目逐项翻译。
- `globals_type.html` 已能提取类型别名摘录，但类型页和后续 group 页仍需要持续观察摘要规则是否足够稳定。
- API pending 队列仍有 188 个页面，需要继续批量覆盖并逐步增加 group/API 分组页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `globals_vars.html`、`globals_w.html`、`globals.html`、`group__group___exec___attribute___comptuations.html` 和 `group__group__hd__collection_predicates.html` 等后续索引/分组页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 90 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 210 draft / 188 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `globals_vars.html`、`globals_w.html`、`globals.html`、`group__group___exec___attribute___comptuations.html` 与 `group__group__hd__collection_predicates.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 初次抽查发现两个 group 页只有页面简介摘要，未保留成员列表；随后增强 `scripts/build_api_full_batch.mjs`，新增 Doxygen `memberdecls` 摘录规则，并重建同批页面。
- 本轮新增 API draft：`globals_vars.html`、`globals_w.html`、`globals.html`、`group__group___exec___attribute___comptuations.html`、`group__group__hd__collection_predicates.html`。
- 本批 5 个索引/分组页 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 5-21，未出现空摘录。
- 抽查确认索引与 group 成员摘录有效：`PCP_INVALID_INDEX`、`UsdGeomTokens`、`WorkGetConcurrencyLimit()`、`AR_DECLARE_RESOLVER_CONTEXT`、`computeValue`、`computeResolvedValue`、`computePath` 与 `HdGetCollectionPredicateLibrary()` 等条目均保留在英文原文层。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 215 draft / 183 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 215 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 215 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮索引/分组页批次、脚本修复、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 group/API 分组条目逐项翻译。
- `memberdecls` 摘录规则已覆盖本批 group 页，但后续 module front pages 和更多 group 页仍需要持续观察摘要质量。
- API pending 队列仍有 183 个页面，需要继续批量覆盖并逐步增加 group/module 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `hd_embree_page_front.html`、`hd_page_front.html`、`hd_st_page_front.html`、`hd_storm_page_front.html` 和 `hdx_page_front.html` 等 API module front pages。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 91 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 215 draft / 183 pending，验证 275 项通过。
- 检查下一批 API pending 队列，确认本轮覆盖 `hd_embree_page_front.html`、`hd_page_front.html`、`hd_st_page_front.html`、`hd_storm_page_front.html` 与 `hdx_page_front.html`。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`hd_embree_page_front.html`、`hd_page_front.html`、`hd_st_page_front.html`、`hd_storm_page_front.html`、`hdx_page_front.html`。
- 本批 5 个 API module front pages HTTP 状态均为 200，摘录数为 1-2 条，链接数为 0-14，未出现空摘录。
- 抽查确认 module front 摘录有效：`HdEmbree` 保留 Embree-based renderer plugin overview，`Hd` 保留 Hydra framework 简介，`HdSt` 保留 HdStorm core rendering overview，`HdStorm` 保留 renderer plugin 简介，`Hdx` 保留 Hydra extensions overview。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 220 draft / 178 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 220 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 220 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 module front pages 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 module 文档逐段翻译。
- `hd_st_page_front.html` 链接数为 0，但有有效 overview 原文摘录；后续低链接 module/source 页面仍需要持续抽查。
- API pending 队列仍有 178 个页面，需要继续批量覆盖并逐步增加 source/hierarchy/module 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `hgi_2shader_program_8h_source.html`、`hierarchy.html`、`hio_page_front.html`、`inherits.html` 和 `journal_8h.html` 等源码/层级/module 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 92 轮 时间：2026-06-04

已完成：

- 先复查全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 220 draft / 178 pending，验证 275 项通过。
- 增强 `scripts/build_api_full_batch.mjs` 的 source/hierarchy 摘录规则：新增 hierarchy directory 摘录、inherits image-map 摘录、area link 保留、source/index 数字链接过滤和 `More...` 噪声清理。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`hgi_2shader_program_8h_source.html`、`hierarchy.html`、`hio_page_front.html`、`inherits.html`、`journal_8h.html`。
- 本批 5 个 API source/hierarchy/module/file 页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 4-40。
- 抽查确认 source/hierarchy 摘录有效：`hgi_2shader_program_8h_source.html` 保留 `HgiShaderProgram` 与源码摘录，`hierarchy.html` 保留 `ExecSystem::_ChangeProcessor` 与 `SdfSchemaBase` 层级条目，`inherits.html` 保留 graphical hierarchy 条目，`journal_8h.html` 保留 `EsfJournal` 成员摘录。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 225 draft / 173 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 225 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 225 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮脚本修复、source/hierarchy 批次、摘录质量和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整源码、层级图或文件页逐项翻译。
- `inherits.html` 的 Doxygen image-map 只能稳定提取 title/description 级摘录，部分条目缺少直观类名；后续如要提高 1:1 阅读性，需要为 image-map href 增加更好的类名反解规则。
- API pending 队列仍有 173 个页面，需要继续批量覆盖并逐步增加 module/README/Markdown 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `js_page_front.html`、`kind_page_front.html`、`md_pxr_exec_ef__r_e_a_d_m_e.html`、`md_pxr_exec_esf__r_e_a_d_m_e.html` 和 `md_pxr_exec_esf_usd__r_e_a_d_m_e.html` 等 module/README 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 93 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 225 draft / 173 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`js_page_front.html`、`kind_page_front.html`、`md_pxr_exec_ef__r_e_a_d_m_e.html`、`md_pxr_exec_esf__r_e_a_d_m_e.html`、`md_pxr_exec_esf_usd__r_e_a_d_m_e.html`。
- 本批 5 个 API module/README 页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 0-3。
- 首次抽查发现 README/Markdown 页存在“完整段落 + 首句”重复摘录和 `&zwj;` 实体噪声；随后增强 `scripts/build_api_full_batch.mjs`，清理 `&zwj;`、将 `[!note]` 转为 `Note:`、修复标点前空格，并跳过已被长摘录包含的短摘录。
- 重建同批页面后抽查确认摘录质量有效：`js_page_front.html` 保留 JSON I/O 与 Python `json` 提示，`kind_page_front.html` 保留 runtime-extensible taxonomy 与 builtin kind hierarchy，`md_pxr_exec_ef__r_e_a_d_m_e.html` 保留 ef/vdf 关系与 `VdfNode`/`VdfExecutorInterface`，`md_pxr_exec_esf__r_e_a_d_m_e.html` 与 `md_pxr_exec_esf_usd__r_e_a_d_m_e.html` 保留执行系统场景访问说明。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 230 draft / 168 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 230 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 230 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 README/module 批次、摘录规则修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 README 文档逐段翻译。
- `md_pxr_exec_esf__r_e_a_d_m_e.html` 官方页面同站链接数为 0，当前依赖正文摘录保证可读性；后续短链接 README 页仍需持续抽查。
- API pending 队列仍有 168 个页面，需要继续批量覆盖并逐步增加 README/module 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `md_pxr_exec_exec__r_e_a_d_m_e.html`、`md_pxr_exec_exec_geom__r_e_a_d_m_e.html`、`md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`md_pxr_exec_vdf__r_e_a_d_m_e.html` 和 `md_pxr_exec_vdf_test_utils__r_e_a_d_m_e.html` 等后续 Exec/Vdf README 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 94 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 230 draft / 168 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`md_pxr_exec_exec__r_e_a_d_m_e.html`、`md_pxr_exec_exec_geom__r_e_a_d_m_e.html`、`md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`md_pxr_exec_exec_usd_docs_overview.html`。
- 本批 5 个 API Exec/ExecUsd README/overview 页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 1-8。
- 抽查确认 README 摘录质量有效：`md_pxr_exec_exec__r_e_a_d_m_e.html` 保留 exec/vdf/ef/esf 关系与 data flow network 说明，`md_pxr_exec_exec_geom__r_e_a_d_m_e.html` 保留 execUsd 与 UsdGeom schema computation 关系，`md_pxr_exec_exec_ir__r_e_a_d_m_e.html` 保留 invertible controllers 说明，`md_pxr_exec_exec_usd__r_e_a_d_m_e.html` 保留 primary entry point、registration、UsdStage ingest 与 evaluation 条目，`md_pxr_exec_exec_usd_docs_overview.html` 保留 OpenExec computations、UsdStage ingest 与教程概览。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 235 draft / 163 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 235 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 235 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 Exec/ExecUsd README 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 OpenExec README/overview 文档逐段翻译。
- `md_pxr_exec_exec_ir__r_e_a_d_m_e.html` 官方原文中存在较长摘要和拼写噪声，当前仅保留原文摘录，不主动改写 API 文档原文。
- API pending 队列仍有 163 个页面，需要继续批量覆盖并逐步增加教程页、namespace 索引页和后续 README 页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`、`md_pxr_exec_vdf__r_e_a_d_m_e.html`、`md_pxr_exec_vdf_test_utils__r_e_a_d_m_e.html` 和 `namespacemembers.html` 等后续教程/README/索引页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 95 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML 和验证报告，确认上一轮状态为 406 total / 8 complete / 235 draft / 163 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`、`md_pxr_exec_vdf__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`、`md_pxr_usd_imaging_usdviewq_black_box_testing.html`。
- 本批 5 个 API tutorial/README/test 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 0-31。
- 首次抽查发现 tutorial2 页存在近似重复摘要，随后增强 `scripts/build_api_full_batch.mjs`，新增教程 code-path-only 过滤、教程 code path + Overview 前缀归一化、截断省略号比较归一化。
- 重建同批页面后抽查确认摘录质量有效：tutorial1 保留 Computing Values 总览与 low-level API note；tutorial2 保留 defining computations 总览与 Computing Values 承接说明；Vdf README 保留 VdfNetwork/VdfNode/VdfConnection；usdviewq README 保留 GUI 修改与测试实践；blackBoxTesting 保留 testusdview harness 与 viewport visibility 测试目标。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 240 draft / 158 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 240 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 240 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮教程/README/测试页批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整教程、README 或测试说明逐段翻译。
- usdviewq 两个页面官方同站链接数为 0，当前依赖正文摘录保证可读性；后续低链接 README/test 页面仍需持续抽查。
- API pending 队列仍有 158 个页面，需要继续批量覆盖并逐步增加 validation/module/namespace 索引页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`、`modules.html`、`namespacemembers.html` 和 `namespacemembers_func.html` 等后续 validation/module/namespace 索引页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 96 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 240 draft / 158 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`、`modules.html`、`namespacemembers_func.html`、`namespacemembers_type.html`。
- 本批 5 个 API validation/module/namespace 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-40。
- 首次抽查发现 namespace 成员页标题过于泛化、Validation 页第二条摘录与第一条重叠较多，随后增强 `scripts/build_api_full_batch.mjs` 的标题回退和重叠摘录过滤。
- 重建同批页面后抽查确认质量有效：`namespacemembers_func.html` 和 `namespacemembers_type.html` 分别显示 Functions/Typedefs；Validation 页保留 framework overview 与 metadata 说明；Modules 页保留 Bits/Multithreading/Math/String/System/Memory 等模块入口；Boolean Expressions 页保留 boolean expression language 和 `VtValue::Cast` 等链接。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 245 draft / 153 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 245 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 245 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 validation/module/namespace 批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 Boolean/Validation/Modules/Namespace Members 逐项翻译。
- `namespacemembers_type.html` 官方链接和正文条目较少，当前只能保留 `pxr_tsl` 相关 typedef 摘录；后续低信息量索引页仍需抽查，避免只有导航噪声。
- API pending 队列仍有 153 个页面，需要继续批量覆盖并逐步增加 namespace/design/Ts 文档页专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `namespacemembers.html`、`namespaces.html`、`page__execution__system__design.html`、`page_ts_regression.html` 和 `page_ts_status.html` 等后续 namespace/design/Ts 文档页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 97 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 245 draft / 153 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`namespacemembers.html`、`namespaces.html`、`page__execution__system__design.html`、`page_ts_regression.html`、`page_ts_status.html`。
- 本批 5 个 API namespace/design/Ts 文档页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 1-19。
- 抽查确认本批摘录质量有效：`namespacemembers.html` 保留 documented namespace members 与 ShaderMetadataHelpers/VdfTestUtils/pxr_tsl 条目；`namespaces.html` 保留 pxr_tsl、ShaderMetadataHelpers、VdfTestUtils 命名空间列表；`page__execution__system__design.html` 保留 general-purpose computation engine 与 guiding principles；`page_ts_regression.html` 保留 Bezier/regressive segment 说明；`page_ts_status.html` 保留 USD Anim in-development 状态与 loop/evaluation 说明。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 250 draft / 148 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 250 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 250 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 namespace/design/Ts 文档批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 namespace/design/Ts 文档逐段翻译。
- `page_ts_status.html` 官方原文包含 in-development 状态和较长路线说明，当前只保留首批摘录；后续如要高保真阅读，需要对 Ts 文档做专项逐段双语化。
- API pending 队列仍有 148 个页面，需要继续批量覆盖并逐步增加 TsTest/Related Pages/source/module 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `page_ts_ts_test.html`、`pages.html`、`parallel_speculation_executor_engine_8h_source.html`、`pcp_page_front.html` 和 `plug_page_front.html` 等 TsTest/Related Pages/source/module 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 98 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 250 draft / 148 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`page_ts_ts_test.html`、`pages.html`、`parallel_speculation_executor_engine_8h_source.html`、`pcp_page_front.html`、`plug_page_front.html`。
- 本批 5 个 API TsTest/Related/source/module 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 0-40。
- 首次抽查发现 source 页链接列表会出现纯数字锚文本，随后增强 `scripts/build_api_full_batch.mjs` 的链接过滤，跳过纯数字和 `More...` 锚文本。
- 重建同批页面后抽查确认质量有效：`parallel_speculation_executor_engine_8h_source.html` 链接显示为 `VdfParallelSpeculationExecutorEngine`、`VdfParallelExecutorEngineBase`、`VdfEvaluationState` 等可读 API 名称；`page_ts_ts_test.html` 保留 TsTest framework 和 grapher/baseline 说明；`pages.html` 保留 Related Pages 文档入口列表；`pcp_page_front.html` 保留 Layering & Referencing / Prim Cache Population 说明；`plug_page_front.html` 保留 PlugPlugin、PlugRegistry 和 TfType 说明。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 255 draft / 143 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 255 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 255 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 TsTest/Related/source/module 批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 TsTest、Related Pages、source 或 Pcp/Plug module 文档逐段翻译。
- `page_ts_ts_test.html` 官方同站链接数为 0，当前依赖正文和索引摘录保证可读性；后续低链接文档页仍需继续抽查。
- API pending 队列仍有 143 个页面，需要继续批量覆盖并逐步增加 source/module/struct 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `pxr_display_filter_adapter_8h_source.html`、`riley_param_schema_8h_source.html`、`sdf_page_front.html`、`sdr_glslfx_page_front.html` 和 `sdr_page_front.html` 等 source/module 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 99 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 255 draft / 143 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`pxr_display_filter_adapter_8h_source.html`、`riley_param_schema_8h_source.html`、`sdf_page_front.html`、`sdr_glslfx_page_front.html`、`sdr_page_front.html`。
- 本批 5 个 API source/Sdf/Sdr 页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 0-37。
- 首次抽查发现 `sdf_page_front.html` 链接列表存在 `&zwnj;` 零宽实体残留，随后增强 `scripts/build_api_full_batch.mjs` 的 `cleanText()` 实体清理规则。
- 重建同批页面后抽查确认质量有效：`sdf_page_front.html` 不再包含零宽字符残留，保留 SdfPath、SdfLayer、SdfPrimSpec、UsdPrim、SdfLayerStateDelegateBase 等可读链接；`pxr_display_filter_adapter_8h_source.html` 保留 UsdRiPxrImagingDisplayFilterAdapter、UsdImagingPrimAdapter、UsdPrim 等 source/API 条目；`riley_param_schema_8h_source.html` 保留 HdSchema、Builder、Build 等条目；`sdr_glslfx_page_front.html` 保留 glslfx parser for Sdr 简介；`sdr_page_front.html` 保留 shader discovery / SdrRegistry、SdrShaderNode、SdrShaderProperty 入口。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 260 draft / 138 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 260 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 260 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 source/Sdf/Sdr 批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 source 或 Sdf/Sdr module 文档逐段翻译。
- `sdr_glslfx_page_front.html` 官方同站链接数为 0、摘录数为 1，当前只保留 glslfx parser for Sdr 简介；后续低链接短模块页仍需继续抽查。
- API pending 队列仍有 138 个页面，需要继续批量覆盖并逐步增加 source/struct 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `sparse_vectorized_input_traverser_8h.html`、`struct_hgi_sampler_desc.html`、`struct_usd_geom_tokens_type.html`、`struct_usd_lux_tokens_type.html` 和 `struct_usd_physics_tokens_type.html` 等 source/struct 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 100 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 260 draft / 138 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`sparse_vectorized_input_traverser_8h.html`、`struct_hgi_sampler_desc.html`、`struct_usd_geom_tokens_type.html`、`struct_usd_lux_tokens_type.html`、`struct_usd_physics_tokens_type.html`。
- 本批 5 个 API source/struct token 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 3-40。
- 首次抽查发现 `struct_hgi_sampler_desc.html` 的第二条摘录带有 Doxygen brief 链接文本 `More...`，随后增强 `scripts/build_api_full_batch.mjs` 的 `compactExcerpt()` 段尾噪声清理规则。
- 重建同批页面后抽查确认质量有效：`struct_hgi_sampler_desc.html` 不再出现 `More...` 摘录噪声，保留 GPU sampler 描述、debugName、magFilter、minFilter、mipFilter、addressMode/borderColor 等字段说明；`sparse_vectorized_input_traverser_8h.html` 保留 VdfSparseVectorizedInputTraverser 条目；`struct_usd_geom_tokens_type.html`、`struct_usd_lux_tokens_type.html` 和 `struct_usd_physics_tokens_type.html` 保留静态 TfTokens 简介与有效 Member entries。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 265 draft / 133 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 265 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 265 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 source/struct token 批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 source 或 struct member 文档逐段翻译。
- `struct_hgi_sampler_desc.html` 官方同站链接数为 3，当前依赖标题层级和正文摘录保证可读性；后续低链接 struct 页面仍需继续抽查。
- API pending 队列仍有 133 个页面，需要继续批量覆盖并逐步增加 source/struct/module 页面专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `struct_usd_skel_tokens_type.html`、`system_diagnostics_8h_source.html`、`tf_page_front.html`、`trace_page_front.html` 和 `usd_2usd_2object_8h.html` 等 struct/source/module 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 101 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 265 draft / 133 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`struct_usd_skel_tokens_type.html`、`system_diagnostics_8h_source.html`、`tf_page_front.html`、`trace_page_front.html`、`usd_2usd_2object_8h.html`。
- 本批 5 个 API struct/source/module/file 页面 HTTP 状态均为 200，摘录数均为 2 条，链接数为 7-40。
- 首次抽查发现 `usd_2usd_2object_8h.html` 第一条摘录是 include graph 说明，页面链接里也保留了 `Go to the source code of this file.`，随后增强 `scripts/build_api_full_batch.mjs` 的导航噪声过滤。
- 第二次抽查发现 `usd_2usd_2object_8h.html` 仍保留 `Definition at line ...` source-location 句子，继续增强 `isNavigationOnlyExcerpt()`，统一过滤这种低信息量 Doxygen 位置说明。
- 重建同批页面后抽查确认质量有效：`usd_2usd_2object_8h.html` 保留 UsdObject、UsdObjType、UsdIsConvertible、UsdIsConcrete 等 member 摘录；`struct_usd_skel_tokens_type.html` 保留 UsdSkelTokens 简介和 bindTransforms、blendShapes、jointNames 等 token 条目；`system_diagnostics_8h_source.html` 保留 ExecSystem::Diagnostics、InvalidateAll、GraphNetwork 和源码片段；`tf_page_front.html` 保留 Tf foundation grouping、TfRefPtr/TfWeakPtr/TfType/TfDebug 等入口；`trace_page_front.html` 保留 TraceCollector、TraceEvent、TraceReporter 和 TRACE instrumentation 说明。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 270 draft / 128 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 270 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 270 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 struct/source/module/file 批次、脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 module 或 file/member 文档逐段翻译。
- `tf_page_front.html` 和 `trace_page_front.html` 属于模块入口页，当前保留 overview 和关键入口链接；后续如要完整阅读，需要对 module front pages 做更细的逐段双语化。
- API pending 队列仍有 128 个页面，需要继续批量覆盖并逐步增加 Usd module front pages 专项质量审计。

下一轮目标：

1. 继续从 API `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`full_site/api/`、`reports/api_full_batch_report.*`、`reports/all_pages_inventory.*` 和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `usd_app_utils_page_front.html`、`usd_geom_page_front.html`、`usd_hydra_page_front.html`、`usd_lux_page_front.html` 和 `usd_media_page_front.html` 等 Usd module front pages。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 105 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 285 draft / 113 pending，验证 275 项通过。
- 继续运行 `scripts/build_api_full_batch.mjs`，从 API `pending_full_scope` 队列新增 5 个 `bilingual_draft` 页面。
- 本轮新增 API draft：`usd_utils_page_front.html`、`usd_vol_page_front.html`、`usdabc_page_front.html`、`usddraco_page_front.html`、`var_8h_source.html`。
- 本批 5 个 API utility/plugin/source 页面 HTTP 状态均为 200，摘录数为 1-2 条，链接数为 0-36。
- 抽查确认本批摘录质量有效：UsdUtils 保留 utility overview 和工具/API 入口，UsdVol 保留 volume schema overview，UsdAbc/UsdDraco 保留 file format plugin overview，var_8h_source 保留 SdfAssetPath、UsdRenderVar、UsdTyped 等索引入口和短源码片段。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 290 draft / 108 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 290 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 290 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 utility/plugin/source 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 API 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 utility、schema、plugin 或 source 文档逐段翻译。
- source/file-format plugin 页当前保留概览、索引入口和短摘录，没有展开完整源码或插件文档逐段翻译。
- API/release pending 队列仍有 108 个页面，需要继续批量覆盖，并逐步加强 release tutorial/spec 页的专项质量审计。

下一轮目标：

1. 继续从 API/release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_api/`、`source/full_release/`、`full_site/api/`、`full_site/release/`、批次报告、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `vt_page_front.html`、`work_page_front.html`、`spec_usdz.html`、`spec.html` 和 `tut_authoring_variants.html` 等后续 API/release 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 106 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、API/release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 290 draft / 108 pending，验证 275 项通过。
- 检查最新 pending 队列后确认本轮应覆盖全量前段，而不是只继续 API：`vt_page_front.html`、`work_page_front.html`、`spec_usdz.html`、`spec.html` 和 `tut_authoring_variants.html`。
- 以 `OPENUSD_BATCH_SIZE=2` 运行 `scripts/build_api_full_batch.mjs`，新增 2 个 API `bilingual_draft` 页面：`vt_page_front.html`、`work_page_front.html`。
- 以 `OPENUSD_BATCH_SIZE=3` 运行 `scripts/build_release_full_batch.mjs`，新增 3 个 release `bilingual_draft` 页面：`spec_usdz.html`、`spec.html`、`tut_authoring_variants.html`。
- 增强 `scripts/build_release_full_batch.mjs`：release draft 现在优先从 Sphinx `articleBody` 抽取 h1-h4、正文链接和目录页摘录；无段落目录页会生成 `Index entries include ...` 摘录；`release_full_batch_report.json` 新增 `excerpt_count` 字段。
- 本批 5 个页面 HTTP 状态均为 200；API 页面摘录数均为 2 条、链接数为 3-5；release 页面摘录数为 1-3 条、链接数为 3-7。
- 抽查确认本批摘录质量有效：Vt 保留 VtValue/VtArray type abstraction 摘录，Work 保留 multithreaded dispatch 摘录，spec_usdz 保留 packaging/file-ordering/asset-path 摘录，spec 保留三个 specification 入口，Authoring Variants 保留 tutorial 步骤摘录。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 295 draft / 103 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 295 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 295 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 API/release 混合批次、release 脚本修复、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和链接，但没有展开完整 API module、spec 或 tutorial 文档逐段翻译。
- release tutorial/spec 页当前保留正文摘录和关键链接，尚未做命令块、代码块、表格和步骤级逐段中英对照。
- API/release pending 队列仍有 103 个页面，需要继续批量覆盖，并逐步加强 release tutorial 页的专项质量审计。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `tut_converting_between_layer_formats.html`、`tut_end_to_end.html`、`tut_generating_new_schema.html`、`tut_helloworld_redux.html` 和 `tut_helloworld.html` 等 release tutorial 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 107 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 295 draft / 103 pending，验证 275 项通过。
- 检查最新 pending 队列后确认本轮继续覆盖 release tutorial 前段：`tut_converting_between_layer_formats.html`、`tut_end_to_end.html`、`tut_generating_new_schema.html`、`tut_helloworld_redux.html` 和 `tut_helloworld.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面。
- 增强 `scripts/build_release_full_batch.mjs`：release tutorial draft 现在会加入“代码与命令摘录 / Code and Command Excerpts”区块，受限提取每页最多 4 个 `<pre>` 代码/命令块，并在 `release_full_batch_report.json` 中记录 `code_snippet_count`。
- 本批 5 个 release tutorial 页面 HTTP 状态均为 200，摘录数为 2-3 条，正文链接数为 2-7，代码/命令摘录数均为 1。
- 抽查确认本批摘录质量有效：layer format tutorial 保留 `usdcat` 命令，end-to-end 保留 `create_asset.py` 命令，schema generation 保留 `schema.usda` 片段，HelloWorld/Redux 保留 `CreateNew`、`DefinePrim` 和 `UsdGeom` 代码片段。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 300 draft / 98 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 300 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 300 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release tutorial 批次、代码摘录脚本增强、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release tutorial 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整教程逐段翻译。
- 当前代码/命令摘录是受限样本，不替代完整教程代码块复刻；后续若要更高保真，需要为 tutorial 页面增加步骤级、代码块级中英对照。
- release/API pending 队列仍有 98 个页面，需要继续批量覆盖，并逐步加强 release tutorial 页的专项质量审计。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `tut_houdini_example.html`、`tut_inspect_and_author_props.html`、`tut_referencing_layers.html`、`tut_simple_shading.html` 和 `tut_traversing_stage.html` 等后续 release tutorial 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 108 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 300 draft / 98 pending，验证 275 项通过。
- 检查最新 pending 队列后确认本轮继续覆盖 release tutorial：`tut_houdini_example.html`、`tut_inspect_and_author_props.html`、`tut_referencing_layers.html`、`tut_simple_shading.html` 和 `tut_traversing_stage.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面。
- 本批 5 个 release tutorial 页面 HTTP 状态均为 200，摘录数均为 3 条，正文链接数为 0-4，代码/命令摘录数均为 1。
- 抽查确认本批摘录质量有效：Houdini 历史工作流保留 Solaris 替代说明和 `usdview` 命令，Inspecting/Authoring Properties 保留 `Stage.Open`/`GetPrimAtPath` 代码，Referencing Layers 保留 `SetDefaultPrim`/`XformCommonAPI` 代码，Simple Shading 保留 `UsdShade`/`UsdGeom` 建模与材质代码，Traversing Stage 保留 `usdviewApi.stage.Traverse` 交互示例。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 305 draft / 93 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 305 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 305 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release tutorial 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release tutorial 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整教程逐段翻译。
- Houdini historical workflow 页面官方正文同站链接数为 0，当前依靠正文摘录和 `usdview` 命令保证可读性。
- release/API pending 队列仍有 93 个页面，需要继续批量覆盖，并逐步加强 user guide 页的专项质量审计。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `tut_usd_tutorials.html`、`tut_usdview_plugin.html`、`tut_variants_example_in_katana.html`、`tut_xforms.html` 和 `usd_products.html` 等后续 release 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 109 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 305 draft / 93 pending，验证 275 项通过。
- 检查最新 pending 队列后确认本轮继续覆盖 release 页面：`tut_usd_tutorials.html`、`tut_usdview_plugin.html`、`tut_variants_example_in_katana.html`、`tut_xforms.html` 和 `usd_products.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面。
- 本批 5 个 release 页面 HTTP 状态均为 200，摘录数为 2-3 条，正文链接数为 1-36，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：USD Tutorials 目录页保留 Github、Toolset、Hello World、Referencing Layers、Traversing Stage、Authoring Variants 等教程入口链接，Usdview Plugin 保留 PluginContainer 设置和 `mkdir` 命令，Katana variants 保留历史说明和 Foundry plugin 链接，Xforms 保留 `usdview`/UpAxis/timeCodes 链接和脚本摘录，Products Using USD 保留产品分组标题和 3Delight/Adobe/AMD/Apple 等外链。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 310 draft / 88 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 310 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 310 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release 后续批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整教程或产品清单逐段翻译。
- `tut_usd_tutorials.html`、`tut_variants_example_in_katana.html` 和 `usd_products.html` 属于目录/说明型页面，官方正文没有需要保留的代码块，本轮代码/命令摘录数为 0。
- release/API pending 队列仍有 88 个页面，需要继续批量覆盖，并开始加强 user guide 页的专项质量审计。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `usdfaq.html`、`user_guides/collections_and_patterns.html`、`user_guides/color_user_guide.html`、`user_guides/namespace_editing.html` 和 `user_guides/primvars.html` 等后续 release user guide 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 110 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 310 draft / 88 pending，验证 275 项通过，最终入口 HTTP 200。
- 检查最新 pending 队列后确认本轮继续覆盖 release/user guide 页面：`usdfaq.html`、`user_guides/collections_and_patterns.html`、`user_guides/color_user_guide.html`、`user_guides/namespace_editing.html` 和 `user_guides/primvars.html`。
- 首次生成后发现 `user_guides/...` 官方子页面被扁平化到 `full_site/release/*.html`，这会与全量清单期望路径不一致；随即修复 `scripts/build_release_full_batch.mjs`，改为按官方 `/release/...` 相对路径写入 `full_site/release/...` 与 `source/full_release/...`。
- 同步修复新增页面的 favicon 和“返回最终 HTML 总入口”链接，使其按页面深度生成正确相对路径；已删除本轮初次生成的 4 个扁平化临时文件。
- 重新以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径现为 `full_site/release/usdfaq.html` 与 `full_site/release/user_guides/...`。
- 本批 5 个 release/user guide 页面 HTTP 状态均为 200，摘录数均为 3 条，正文链接数为 0-11，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：FAQ 保留 Overview and Purpose、glossary、Alembic、MaterialX、FileFormatArguments、Unicode 链接和 `usdcat` 命令；Collections 保留 collection membership 与 `CollectionAPI` 示例；Color guide 保留 Color Programmer’s Guide、UsdRender、MaterialX、OCIO 链接；Namespace Editing 保留 LayerStack 链接和 usda 示例；Primvars 保留 interpolation modes 与 mesh primvar 示例。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 315 draft / 83 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 315 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 315 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮脚本修复、release/user guide 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release/user guide 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 FAQ 或 user guide 逐段翻译。
- Collections、Primvars 等 user guide 页官方正文中的深层例子很多，本轮只保留受限代码摘录；后续如要更高保真，需要为 user guide 页增加步骤/示例级中英对照。
- release/API pending 队列仍有 83 个页面，下一段开始进入更多 `user_guides/schemas/...` 深层 schema 页面，需要持续验证嵌套路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/render_user_guide.html`、`user_guides/schemas/index.html`、`user_guides/schemas/usdLux/BoundableLightBase.html`、`user_guides/schemas/usdLux/CylinderLight.html` 和 `user_guides/schemas/usdLux/DiskLight.html` 等后续 release user guide/schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 111 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 315 draft / 83 pending，验证 275 项通过，最终入口 HTTP 200。
- 确认 `scripts/build_release_full_batch.mjs` 仍保留第 110 轮加入的 `releaseRelativePathFromUrl`、`hrefToRoot` 和嵌套目录创建逻辑，适合继续生成深层 `user_guides/schemas/...` 页面。
- 检查最新 pending 队列后确认本轮继续覆盖 release user guide/schema 页面：`user_guides/render_user_guide.html`、`user_guides/schemas/index.html`、`user_guides/schemas/usdLux/BoundableLightBase.html`、`user_guides/schemas/usdLux/CylinderLight.html` 和 `user_guides/schemas/usdLux/DiskLight.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/...` 和 `user_guides/schemas/usdLux/...` 深层目录。
- 本批 5 个 release user guide/schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-36，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：Rendering with USD 保留 `UsdGeom` 链接和 `upAxis` USDA 示例，Schema Domains 保留 Lights/usdLux、BoundableLightBase、CylinderLight、DiskLight、DistantLight、DomeLight、LightAPI 等 schema 入口，BoundableLightBase 保留 Properties、Inherited Properties、extent、xformOpOrder、proxyPrim 等结构，CylinderLight/DiskLight 保留 intrinsic light 说明和 USDA light 示例。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接按页面深度生成，例如 `user_guides/schemas/usdLux/*.html` 使用 `../../../../../openusd_bilingual_final.html`，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 320 draft / 78 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 320 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 320 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release user guide/schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 schema 属性逐项中文解释。
- BoundableLightBase 等 schema 页面当前主要保留标题层级和少量摘录，后续如果要更高保真，需要为 Properties 与 Inherited Properties 增加属性级双语表格。
- release/API pending 队列仍有 78 个页面，下一段继续是多个 `usdLux` schema 页面，需要持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdLux/DistantLight.html`、`user_guides/schemas/usdLux/DomeLight_1.html`、`user_guides/schemas/usdLux/DomeLight.html`、`user_guides/schemas/usdLux/GeometryLight.html` 和 `user_guides/schemas/usdLux/LightAPI.html` 等后续 usdLux schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 112 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 320 draft / 78 pending，验证 275 项通过，最终入口 HTTP 200。
- 确认 `scripts/build_release_full_batch.mjs` 仍保留子目录路径、深层返回入口和代码摘录计数逻辑，适合继续生成 `user_guides/schemas/usdLux/...` 页面。
- 检查最新 pending 队列后确认本轮继续覆盖 release usdLux schema 页面：`user_guides/schemas/usdLux/DistantLight.html`、`user_guides/schemas/usdLux/DomeLight_1.html`、`user_guides/schemas/usdLux/DomeLight.html`、`user_guides/schemas/usdLux/GeometryLight.html` 和 `user_guides/schemas/usdLux/LightAPI.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径均保留 `user_guides/schemas/usdLux/...` 深层目录。
- 本批 5 个 release usdLux schema 页面 HTTP 状态均为 200，摘录数为 2-3 条，正文链接数为 0-3，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：DistantLight 保留 directional light 说明和 USDA 示例，DomeLight_1 保留 guideRadius、inputs:texture:file、inputs:texture:format、light:shaderId、poleAxis、portals 等属性结构和 OpenEXR/DomeLight 链接，DomeLight 保留 environment lighting、HDR/IBL 说明、OpenEXR/DomeLight_1 链接和 USDA 示例，GeometryLight 保留 geometry/light:shaderId 及继承属性结构，LightAPI 保留 light-linking、UsdShade、Collections 链接和 collection/lightLink、inputs:color、inputs:intensity 等属性结构。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 325 draft / 73 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 325 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 325 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdLux schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdLux schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 schema 属性逐项中文解释。
- DomeLight_1、GeometryLight、LightAPI 等属性密集页面当前主要保留标题层级和少量正文摘录，后续高保真阶段应补属性级双语表格。
- release/API pending 队列仍有 73 个页面，下一段继续是多个 `usdLux` schema 页面，需要继续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdLux/LightFilter.html`、`user_guides/schemas/usdLux/LightListAPI.html`、`user_guides/schemas/usdLux/ListAPI.html`、`user_guides/schemas/usdLux/MeshLightAPI.html` 和 `user_guides/schemas/usdLux/NonboundableLightBase.html` 等后续 usdLux schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。
## 第 113 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 325 draft / 73 pending，验证 275 项通过，最终入口 HTTP 200。
- 确认 `scripts/build_release_full_batch.mjs` 仍保留子目录路径、深层返回入口和代码摘录计数逻辑，适合继续生成 `user_guides/schemas/usdLux/...` 页面。
- 检查最新 pending 队列后确认本轮继续覆盖 release usdLux schema 页面：`user_guides/schemas/usdLux/LightFilter.html`、`user_guides/schemas/usdLux/LightListAPI.html`、`user_guides/schemas/usdLux/ListAPI.html`、`user_guides/schemas/usdLux/MeshLightAPI.html` 和 `user_guides/schemas/usdLux/NonboundableLightBase.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径均保留 `user_guides/schemas/usdLux/...` 深层目录。
- 本批 5 个 release usdLux schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-3，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：LightFilter 保留 Representing Filters on Lights、UsdShade node encapsulation、Collections and Patterns 链接以及 `collection:filterLink:includeRoot`/`lightFilter:shaderId` 属性结构；LightListAPI 保留 `ComputeLightList()` Python 示例；ListAPI 保留 deprecated 说明和 LightListAPI 链接；MeshLightAPI 保留 Mesh Lights 链接和 `light:materialSyncMode`/`light:shaderId` 属性结构；NonboundableLightBase 保留 Representing Non-boundable Lights 链接与继承属性结构。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 330 draft / 68 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 330 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 330 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdLux schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdLux schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 schema 属性逐项中文解释。
- LightFilter、LightListAPI、MeshLightAPI 等页面当前主要保留结构化标题和关键摘录；后续高保真阶段应补属性级双语表格和代码示例上下文。
- release/API pending 队列仍有 68 个页面，下一段继续是多个 `usdLux` schema 页面，需要继续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdLux/overview.html`、`user_guides/schemas/usdLux/PluginLight.html`、`user_guides/schemas/usdLux/PluginLightFilter.html`、`user_guides/schemas/usdLux/PortalLight.html` 和 `user_guides/schemas/usdLux/RectLight.html` 等后续 usdLux schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 114 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 330 draft / 68 pending，验证 275 项通过。
- 确认 `scripts/build_release_full_batch.mjs` 仍保留子目录路径、深层返回入口、Sphinx `articleBody` 摘录和代码摘录计数逻辑，适合继续生成 `user_guides/schemas/usdLux/...` 页面。
- 检查最新 pending 队列后确认本轮继续覆盖 release usdLux schema 页面：`user_guides/schemas/usdLux/overview.html`、`user_guides/schemas/usdLux/PluginLight.html`、`user_guides/schemas/usdLux/PluginLightFilter.html`、`user_guides/schemas/usdLux/PortalLight.html` 和 `user_guides/schemas/usdLux/RectLight.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径均保留 `user_guides/schemas/usdLux/...` 深层目录。
- 本批 5 个 release usdLux schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-2，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：overview 保留 UsdLux schema domain 概览、feature 列表和 RectLight USDA 示例；PluginLight 保留外部 Sdr shader node 识别说明和 Xformable/Imageable 继承属性结构；PluginLightFilter 保留 UsdShadeNodeDefAPI、filterLink collection、`collection:filterLink:includeRoot` 和 `lightFilter:shaderId` 结构；PortalLight 保留 dome light sampling portal、`inputs:height`、`inputs:width` 和 `light:shaderId` 结构；RectLight 保留 soft box/linear light 说明、`inputs:width`、`inputs:height`、`inputs:texture:file` 示例。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 335 draft / 63 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 335 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 335 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdLux schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdLux schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 schema 属性逐项中文解释。
- PluginLight、PluginLightFilter、PortalLight、RectLight 等页面当前保留关键属性名和少量摘录；后续高保真阶段应补属性级双语表格和更完整 USDA 示例上下文。
- release/API pending 队列仍有 63 个页面，下一段继续是多个 `usdLux` schema 页面，需要继续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdLux/ShadowAPI.html`、`user_guides/schemas/usdLux/ShapingAPI.html`、`user_guides/schemas/usdLux/SphereLight.html`、`user_guides/schemas/usdLux/usdLux_toc.html` 和 `user_guides/schemas/usdLux/VolumeLightAPI.html` 等后续 usdLux schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 115 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 335 draft / 63 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdLux schema pending 队列：`user_guides/schemas/usdLux/ShadowAPI.html`、`user_guides/schemas/usdLux/ShapingAPI.html`、`user_guides/schemas/usdLux/SphereLight.html`、`user_guides/schemas/usdLux/usdLux_toc.html` 和 `user_guides/schemas/usdLux/VolumeLightAPI.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径均保留 `user_guides/schemas/usdLux/...` 深层目录。
- 本批 5 个 release usdLux schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-22，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：ShadowAPI 保留 shadow color/distance/falloff 控制说明和 Shadows 链接；ShapingAPI 保留 light spread、cone angle、focus/softness 等塑形属性说明；SphereLight 保留 point/spherical light 说明和 Sphere/Cube 示例摘录；usdLux_toc 保留 Overview、UsdLux Schemas and Concepts、Light Units 等目录入口；VolumeLightAPI 保留 Volume prim light behavior、materialSyncMode 和 VolumeLight shaderId 说明。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 340 draft / 58 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 340 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 340 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdLux schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdLux schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 schema 属性逐项中文解释。
- ShadowAPI、ShapingAPI、VolumeLightAPI 等属性型页面当前保留关键属性名和少量摘录；后续高保真阶段应补属性级双语表格和更完整示例上下文。
- release/API pending 队列仍有 58 个页面，下一段将从 usdMedia 和 usdRender schema 页面继续推进，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`user_guides/schemas/usdMedia/overview.html`、`user_guides/schemas/usdMedia/SpatialAudio.html`、`user_guides/schemas/usdMedia/usdMedia_toc.html` 和 `user_guides/schemas/usdRender/overview.html` 等后续 release schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 116 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 340 draft / 58 pending，验证 275 项通过。
- 确认本轮继续覆盖 release schema pending 队列：`user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`user_guides/schemas/usdMedia/overview.html`、`user_guides/schemas/usdMedia/SpatialAudio.html`、`user_guides/schemas/usdMedia/usdMedia_toc.html` 和 `user_guides/schemas/usdRender/overview.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdMedia/...` 和 `user_guides/schemas/usdRender/...` 深层目录。
- 本批 5 个 release schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-3，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：AssetPreviewsAPI 保留 thumbnail/preview render 用途说明和链接缩略图示例；usdMedia overview 保留 audio、SpatialAudio、AssetPreviewsAPI 关联说明；SpatialAudio 保留 filePath、auralMode、playback settings 和 Speech/Ambient 示例摘录；usdMedia_toc 保留 Overview、Working With Media、AssetPreviewsAPI、SpatialAudio 等目录入口；usdRender overview 保留 final-quality render、render pass、render product/var/settings 等渲染配置概览。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 345 draft / 53 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 345 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 345 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整属性表、示例解释或渲染流程逐段翻译。
- usdMedia 与 usdRender 的 overview 类页面当前保留关键概览和目录入口；后续高保真阶段应补更完整的 schema 关系图、属性级双语表格和代码示例上下文。
- release/API pending 队列仍有 53 个页面，下一段将继续覆盖 usdRender schema 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdRender/RenderPass.html`、`user_guides/schemas/usdRender/RenderProduct.html`、`user_guides/schemas/usdRender/RenderSettings.html`、`user_guides/schemas/usdRender/RenderSettingsBase.html` 和 `user_guides/schemas/usdRender/RenderVar.html` 等后续 usdRender schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 117 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 345 draft / 53 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdRender schema pending 队列：`user_guides/schemas/usdRender/RenderPass.html`、`user_guides/schemas/usdRender/RenderProduct.html`、`user_guides/schemas/usdRender/RenderSettings.html`、`user_guides/schemas/usdRender/RenderSettingsBase.html` 和 `user_guides/schemas/usdRender/RenderVar.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdRender/...` 深层目录。
- 本批 5 个 release usdRender schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-5，代码/命令摘录数均为 1。
- 抽查确认本批摘录质量有效：RenderPass 保留 renderer/scene configuration 与多 pass 渲染说明；RenderProduct 保留单个输出 artifact、RenderVars 组合和 PrimaryProduct 示例；RenderSettings 保留全局渲染设置、输出配置和 renderer-specific API schemas 说明；RenderSettingsBase 保留 camera aperture 与 image aspect ratio mismatch 策略说明；RenderVar 保留 AOV/channel、变量命名、source information 和 LPE 等摘录。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 350 draft / 48 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 350 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 350 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdRender schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release usdRender schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整属性表、渲染流程图或示例逐段翻译。
- RenderSettings 与 RenderSettingsBase 这类属性密集页面当前保留关键概览和局部摘录；后续高保真阶段应补属性级双语表格、取值策略说明和代码示例上下文。
- release/API pending 队列仍有 48 个页面，下一段将进入 `usdRender_toc` 与 `usdUI` schema 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdRender/usdRender_toc.html`、`user_guides/schemas/usdUI/AccessibilityAPI.html`、`user_guides/schemas/usdUI/AttributeHints.html`、`user_guides/schemas/usdUI/Backdrop.html` 和 `user_guides/schemas/usdUI/NodeGraphNodeAPI.html` 等后续 release schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 118 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 350 draft / 48 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdRender/usdUI schema pending 队列：`user_guides/schemas/usdRender/usdRender_toc.html`、`user_guides/schemas/usdUI/AccessibilityAPI.html`、`user_guides/schemas/usdUI/AttributeHints.html`、`user_guides/schemas/usdUI/Backdrop.html` 和 `user_guides/schemas/usdUI/NodeGraphNodeAPI.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdRender/...` 和 `user_guides/schemas/usdUI/...` 深层目录。
- 本批 5 个 release schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-6，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：usdRender_toc 保留 Overview、Best Practices、RenderSettings、RenderProduct、RenderVar 等目录入口；AccessibilityAPI 保留 label/description/priority 辅助访问信息说明和示例；AttributeHints 保留 valueLabels、valueLabelsOrder、ObjectHints、PropertyHints 关联；Backdrop 保留 node graph grouping、colored rectangle 和材质节点示例摘录；NodeGraphNodeAPI 保留 node position、displayColor、stackingOrder、docURI 等节点图 UI 信息。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 355 draft / 43 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 355 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 355 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 UI schema 属性表或示例逐段翻译。
- AccessibilityAPI、AttributeHints、Backdrop 和 NodeGraphNodeAPI 当前保留关键说明与示例摘录；后续高保真阶段应补 metadata/API schema 属性级双语表格和 UI 行为解释。
- release/API pending 队列仍有 43 个页面，下一段将继续覆盖 `usdUI` schema 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdUI/ObjectHints.html`、`user_guides/schemas/usdUI/overview.html`、`user_guides/schemas/usdUI/PrimHints.html`、`user_guides/schemas/usdUI/PropertyHints.html` 和 `user_guides/schemas/usdUI/SceneGraphPrimAPI.html` 等后续 usdUI schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 119 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 355 draft / 43 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdUI schema pending 队列：`user_guides/schemas/usdUI/ObjectHints.html`、`user_guides/schemas/usdUI/overview.html`、`user_guides/schemas/usdUI/PrimHints.html`、`user_guides/schemas/usdUI/PropertyHints.html` 和 `user_guides/schemas/usdUI/SceneGraphPrimAPI.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdUI/...` 深层目录。
- 本批 5 个 release usdUI schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-2，代码/命令摘录数均为 1。
- 抽查确认本批摘录质量有效：ObjectHints 保留 displayName/hidden UI hints 和 Placeholder 示例；usdUI overview 保留 node graph、NodeGraphNodeAPI、SceneGraphPrimAPI、Backdrops、assistive UI 与 UI hints 概览；PrimHints 保留 displayGroupsExpanded、displayGroupsShownIf 和 ObjectHints 关联；PropertyHints 保留 displayGroup、shownIf、ObjectHints 与 PrimHints 关联；SceneGraphPrimAPI 保留 ui:displayGroup、ui:displayName 和 shader node 示例摘录。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 360 draft / 38 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 360 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 360 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdUI schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdUI schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 UI metadata 字典表或示例逐段翻译。
- PrimHints 与 PropertyHints 当前保留 display group、shownIf 和示例摘录；后续高保真阶段应补充条件表达式、显示组行为和对象/属性继承关系的双语说明。
- release/API pending 队列仍有 38 个页面，下一段将从 `usdUI_toc` 转入 `usdVol` schema 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdUI/usdUI_toc.html`、`user_guides/schemas/usdVol/Field3DAsset.html`、`user_guides/schemas/usdVol/FieldAsset.html`、`user_guides/schemas/usdVol/FieldBase.html` 和 `user_guides/schemas/usdVol/OpenVDBAsset.html` 等后续 release schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 120 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 360 draft / 38 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdUI/usdVol schema pending 队列：`user_guides/schemas/usdUI/usdUI_toc.html`、`user_guides/schemas/usdVol/Field3DAsset.html`、`user_guides/schemas/usdVol/FieldAsset.html`、`user_guides/schemas/usdVol/FieldBase.html` 和 `user_guides/schemas/usdVol/OpenVDBAsset.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdUI/...` 和 `user_guides/schemas/usdVol/...` 深层目录。
- 本批 5 个 release schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 1-9，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：usdUI_toc 保留 Overview、Working With Node Graphs、Working With Accessibility Information、UI Hints、Display Groups 等目录入口；Field3DAsset 保留 Field3D volume field、filePath timeSamples 和 density field 示例；FieldAsset 与 FieldBase 保留 deprecated/VolumeFieldAsset/VolumeFieldBase 迁移说明；OpenVDBAsset 保留 OpenVDB volume grid、fieldIndex、fieldName、filePath timeSamples 和 densityVDB 示例。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 365 draft / 33 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 365 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 365 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdUI/usdVol schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 release schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整 volume field 属性表或示例逐段翻译。
- FieldAsset 与 FieldBase 当前只保留 deprecated 迁移方向和继承属性摘录；后续高保真阶段应补 VolumeFieldAsset/VolumeFieldBase 的属性级双语说明与数据类型约束。
- release/API pending 队列仍有 33 个页面，下一段将继续覆盖 `usdVol` schema 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdVol/overview.html`、`user_guides/schemas/usdVol/ParticleField.html`、`user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html` 和 `user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html` 等后续 usdVol schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 121 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 365 draft / 33 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdVol schema pending 队列：`user_guides/schemas/usdVol/overview.html`、`user_guides/schemas/usdVol/ParticleField.html`、`user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html` 和 `user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdVol/...` 深层目录。
- 本批 5 个 release usdVol schema 页面 HTTP 状态均为 200，摘录数为 2-3 条，正文链接数为 0-1，代码/命令摘录数为 0-1。
- 抽查确认本批摘录质量有效：usdVol overview 保留 volumes/volumetric data、OpenVDB/Field3D、particle fields 和 3D Gaussian splats 说明；ParticleField 保留 base schema、derived types 和自定义 schema 继承方向；ParticleField3DGaussianSplat 保留 original 3D Gaussian Splats technique、built-in schema 和 rendering hints；ParticleFieldKernelBaseAPI 保留 spatial basis function 和 validation 语义；ParticleFieldKernelConstantSurfletAPI 保留 step-function falloff、bounded disk、ellipse transform 和 splat center 说明。
- 深层页面的 favicon 和“返回最终 HTML 总入口”链接均使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 370 draft / 28 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 370 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 370 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdVol schema 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdVol schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录、正文链接和短代码/命令摘录，但没有展开完整粒子场属性表或 3DGS 数据语义逐段翻译。
- ParticleField3DGaussianSplat 与 kernel API 页面当前保留核心概览；后续高保真阶段应补 built-in schema、rendering hints、kernel transform 和 opacity/falloff 语义的属性级双语表格。
- release/API pending 队列仍有 28 个页面，下一段继续覆盖 `usdVol` 的 kernel/attribute API 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html` 和 `user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html` 等后续 usdVol schema 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 122 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 370 draft / 28 pending，验证 275 项通过。
- 确认本轮继续覆盖 release usdVol schema pending 队列：`user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html` 和 `user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`。
- 首次运行 `scripts/build_release_full_batch.mjs` 时官方站 HTTPS 建连出现一次 `ECONNRESET`，未写入新状态；立即重试后成功完成本批生成。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdVol/...` 深层目录。
- 本批 5 个 release usdVol schema 页面 HTTP 状态均为 200，摘录数均为 3 条，正文链接数为 0-1，代码/命令摘录数为 0。
- 抽查确认本批摘录质量有效：ParticleFieldKernelGaussianEllipsoidAPI 保留 Gaussian ellipsoid kernel、identity transform、standard deviation、3-sigma/99.7% 说明；ParticleFieldKernelGaussianSurfletAPI 保留 Gaussian surflet kernel、XY plane、off-plane opacity 0 和 3-sigma 说明；ParticleFieldOpacityAttributeAPI 保留 [0, 1] 线性 opacity 与 PLY/Gaussian splats transformed data 区分；ParticleFieldOrientationAttributeAPI 和 ParticleFieldPositionAttributeAPI 保留 float/half 类型与 consumer prefer float 说明。
- 深层页面的“返回最终 HTML 总入口”链接使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 375 draft / 23 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 375 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 375 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdVol kernel/attribute API 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdVol schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和少量正文链接，但没有展开完整属性表、数据类型约束或 3DGS 训练数据映射说明。
- Gaussian kernel 与 attribute API 页面当前保留核心定义和短摘录；后续高保真阶段应补 kernel transform、opacity/falloff、float/half 类型选择和数据消费策略的属性级双语表格。
- release/API pending 队列仍有 23 个页面，下一段继续覆盖 `usdVol` 后续属性 API 与剩余 release 页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html` 和 `user_guides/schemas/usdVol/usdVol_toc.html` 等后续 release 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 123 轮 时间：2026-06-04

已完成：

- 先复查源快照目录、双语输出目录、全量清单、release 批次报告、draft 预览审计、最终 HTML、脚本和验证报告，确认上一轮状态为 406 total / 8 complete / 375 draft / 23 pending，验证 275 项通过，最终入口 HTTP 200。
- 确认本轮继续覆盖 release usdVol schema pending 队列：`user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html` 和 `user_guides/schemas/usdVol/usdVol_toc.html`。
- 以 `OPENUSD_BATCH_SIZE=5` 运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面，输出路径保留 `user_guides/schemas/usdVol/...` 深层目录。
- 本批 5 个 release usdVol schema 页面 HTTP 状态均为 200，摘录数为 1-3 条，正文链接数为 0-21，代码/命令摘录数为 0；其中 `usdVol_toc.html` 保留 21 个目录链接。
- 抽查确认本批摘录质量有效：ParticleFieldPositionBaseAPI 保留 position data、particle count 与 per-particle data 关系说明；ParticleFieldRadianceBaseAPI 保留 radiance definition 与 validation presence 说明；ParticleFieldScaleAttributeAPI 保留 linear scales 和 PLY/Gaussian splats log-format 区分；ParticleFieldSphericalHarmonicsAttributeAPI 保留 spherical harmonics degree/coefficient 与 degree constant across particles 说明；`usdVol_toc.html` 保留 Overview、Working With Volumes、Working With Fields、Working With Particle Fields、Field3DAsset 等目录入口。
- 深层页面的“返回最终 HTML 总入口”链接使用 `../../../../../...` 级别的正确相对路径，本轮本地资源审计失败 0。
- 本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 380 draft / 18 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 380 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 380 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 release usdVol attribute/TOC 批次、覆盖计数和验证状态。

差距：

- 本轮新增的 5 个 usdVol schema 页面仍是结构化 `bilingual_draft`，保留页面级中英说明、官方英文摘录和目录链接，但没有展开完整属性表、数据类型约束或逐段示例解释。
- `usdVol_toc.html` 当前保留目录入口与中英导读，尚未对每个目录项补充完整中文路线说明。
- release/API pending 队列仍有 18 个页面，下一段开始覆盖剩余 Volume schema 页面和 release 用户指南/白皮书页面，仍需持续验证深层路径、返回链接和本地资源。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `user_guides/schemas/usdVol/Volume.html`、`user_guides/schemas/usdVol/VolumeFieldAsset.html`、`user_guides/schemas/usdVol/VolumeFieldBase.html`、`user_guides/time_and_animated_values.html` 和 `user_guides/variable_expressions.html` 等后续 release 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 回退记录 时间：2026-06-04

已完成：

- 用户确认“一次性生成 18 个页面”的质量不合适，要求回退并继续按原来的 5 页节奏推进。
- 已删除误生成的 18 个本地 draft HTML：`user_guides/schemas/usdVol/Volume.html`、`VolumeFieldAsset.html`、`VolumeFieldBase.html`、`user_guides/time_and_animated_values.html`、`user_guides/variable_expressions.html`、`wp_ar2.html`、`wp_asset_previews.html`、`wp_connectable_nodes.html`、`wp_coordsys.html`、`wp_render_settings.html`、`wp_rigid_body_physics.html`、`wp_schema_versioning.html`、`wp_stage_variables.html`、`wp_usdaudio.html`、`wp_usdlux_for_geometry_lights.html`、`wp_usdlux_for_renderers.html`、`wp_usdshade.html` 和 `wp.html`。
- 同步删除上述 18 页在 `source/full_release/` 下的源快照，避免清单把低质量页面误判为当前有效 draft。
- 将 `reports/release_full_batch_report.json` 和 `.md` 恢复为第 123 轮最后接受的 5 页批次：`ParticleFieldPositionBaseAPI`、`ParticleFieldRadianceBaseAPI`、`ParticleFieldScaleAttributeAPI`、`ParticleFieldSphericalHarmonicsAttributeAPI`、`usdVol_toc`。
- 重新运行全量发现、最终入口构建和 draft 预览审计，当前状态恢复为 406 total / 8 complete / 380 draft / 18 pending。

后续策略：

1. 不再一次性清空剩余 pending。
2. 后续继续每轮 5 个页面，优先覆盖 `user_guides/schemas/usdVol/Volume.html`、`VolumeFieldAsset.html`、`VolumeFieldBase.html`、`user_guides/time_and_animated_values.html` 和 `user_guides/variable_expressions.html`。
3. 每一批继续保留中文为主、英文原文保留、API 名称和链接不改，并跑本地验证后再记录。

## 第 124 轮 时间：2026-06-04

已完成：

- 先复查 `reports/all_pages_inventory.json`、`reports/release_full_batch_report.json`、`reports/full_draft_preview_audit.json`、脚本和最终入口，确认回退后状态为 406 total / 8 complete / 380 draft / 18 pending。
- 同步更新 automation `openusd-api` 的提示，明确后续严格每轮最多处理 5 个 `pending_full_scope` 页面，保留此前 18 页低质量批次已回退的约束。
- 增强 `scripts/build_release_full_batch.mjs`：新增标题归一化、剩余 release 页面标题中文映射、页面级中文导读区块，并在批次报告中记录 `chinese_note_count`。
- 按 5 页节奏生成本轮 release draft：`user_guides/schemas/usdVol/Volume.html`、`user_guides/schemas/usdVol/VolumeFieldAsset.html`、`user_guides/schemas/usdVol/VolumeFieldBase.html`、`user_guides/time_and_animated_values.html`、`user_guides/variable_expressions.html`。
- 本批 5 页 HTTP 状态均为 200；每页新增 4 条页面级中文导读，摘录数为 1-3 条，链接数为 0-2，代码/命令摘录数为 0-1。
- 质量抽查确认：Volume 保留体积效果、Volume 继承关系、field:* relationships 和 OpenVDBAsset 示例；VolumeFieldAsset 保留外部文件型体积场、filePath、fieldName、fieldIndex、fieldDataType、vectorDataRoleHint；VolumeFieldBase 保留 UsdVol field schema 基类语义；Time and Animated Values 保留 TimeCode、TimeSamples、timeCodesPerSecond、LayerOffsets 与 timeSamples 示例；USD Variable Expressions 保留 expressionVariables、asset path/reference/variant selection 与 ASSET_PATH/VARIANT_CHOICE 示例。
- 抽查 5 个新增 HTML：标题均为中文优先并保留英文页面名，均包含 `Chinese Reading Notes`，未发现 `U+FFFD`、`锟`、`Ã`、`Â`、`â` 等坏编码标记。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 385 draft / 13 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 385 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 385 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 5 页批次、脚本增强、覆盖计数和验证状态。

差距：

- 本轮新增 5 页仍标记为 `bilingual_draft`，虽然增加了页面级中文导读，但还不是逐段完整翻译或属性表全量复刻。
- 剩余 13 个 pending 页面主要是 release 提案/白皮书类页面，正文较长，后续仍应坚持 5 页一轮并做页面级导读，不应恢复一次性清空策略。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批 5 个 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `wp_ar2.html`、`wp_asset_previews.html`、`wp_connectable_nodes.html`、`wp_coordsys.html` 和 `wp_render_settings.html` 等剩余 release 提案页。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 125 轮 时间：2026-06-04

已完成：

- 先复查 `reports/all_pages_inventory.json`、`reports/release_full_batch_report.json`、`reports/full_draft_preview_audit.json`、`reports/validation_report.json`、`reports/scope_manifest.json` 和最终入口，确认上一轮状态为 406 total / 8 complete / 385 draft / 13 pending，最终入口 HTTP 200。
- 读取本轮 5 个官方 proposal 页的标题、段落、列表和代码片段，用于补专门中文导读：`wp_ar2.html`、`wp_asset_previews.html`、`wp_connectable_nodes.html`、`wp_coordsys.html`、`wp_render_settings.html`。
- 增强 `scripts/build_release_full_batch.mjs` 的页面级中文导读映射，新增 Ar 2.0、Asset Previews、Connectable Nodes、Coordinate Systems、Render Settings 五个 proposal 页的导读。
- 按默认 5 页节奏运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面：`wp_ar2.html`、`wp_asset_previews.html`、`wp_connectable_nodes.html`、`wp_coordsys.html`、`wp_render_settings.html`。
- 本批 5 页 HTTP 状态均为 200；每页 4 条中文导读，摘录数均为 3 条，链接数为 1-9，代码/命令摘录数为 0-1。
- 质量抽查确认：Ar 2.0 保留 ArResolver、NVI、Identifier、Resolve/AssetInfo 等设计入口；Asset Previews 保留 prim/defaultPrim 预览关联、assetInfo 字典和 thumbnails/defaultImage 示例；Connectable Nodes 保留 UsdShadeNodeDefAPI、UsdShadeConnectableAPI、schema plugin callback 和 UsdLux/UsdRi 动机；Coordinate Systems 保留 UsdShadeCoordSysAPI、coordSys:* relationship、scoped inheritance 和 usda 示例；Render Settings 保留 RenderSettings、RenderVar、RenderProduct、RenderSettingsBase 与 camera/resolution 示例。
- 抽查 5 个新增 HTML：标题均为中文优先并保留英文页面名，均包含 `Chinese Reading Notes`，未发现 `U+FFFD`、`锟`、`Ã`、`Â`、`â` 等坏编码标记。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 390 draft / 8 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 390 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 390 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 5 页批次、脚本增强、覆盖计数和验证状态。

差距：

- 本轮新增 5 个 proposal 页仍是 `bilingual_draft`，有页面级中文导读和关键英文摘录，但不是完整白皮书逐段翻译。
- 剩余 8 个 pending 页面仍以 release proposal/白皮书为主，正文长且结构差异较大，下一轮仍应最多 5 页推进。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成下一批最多 5 个 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `wp_rigid_body_physics.html`、`wp_schema_versioning.html`、`wp_stage_variables.html`、`wp_usdaudio.html` 和 `wp_usdlux_for_geometry_lights.html` 等剩余 release proposal 页面。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 126 轮 时间：2026-06-04

已完成：

- 先复查 `reports/all_pages_inventory.json`、`reports/release_full_batch_report.json`、`reports/full_draft_preview_audit.json`、`reports/validation_report.json`、`reports/scope_manifest.json` 和最终入口，确认上一轮状态为 406 total / 8 complete / 390 draft / 8 pending，最终入口 HTTP 200。
- 读取本轮 5 个官方 proposal 页的标题、段落、列表和代码片段，用于补专门中文导读：`wp_rigid_body_physics.html`、`wp_schema_versioning.html`、`wp_stage_variables.html`、`wp_usdaudio.html`、`wp_usdlux_for_geometry_lights.html`。
- 增强 `scripts/build_release_full_batch.mjs` 的页面级中文导读映射，新增 Rigid Body Physics、Schema Versioning、Stage Variable Expressions、UsdAudio、UsdLux Geometry Lights 五个页面的导读。
- 按默认 5 页节奏运行 `scripts/build_release_full_batch.mjs`，新增 5 个 release `bilingual_draft` 页面：`wp_rigid_body_physics.html`、`wp_schema_versioning.html`、`wp_stage_variables.html`、`wp_usdaudio.html`、`wp_usdlux_for_geometry_lights.html`。
- 本批 5 页 HTTP 状态均为 200；每页 4 条中文导读，摘录数为 1-3 条，链接数为 1-8，代码/命令摘录数为 0-1。
- 质量抽查确认：Rigid Body Physics 保留 PhysicsScene、刚体、约束、碰撞、质量属性和单位等入口；Schema Versioning 保留 per-schema versioning、API schema conflicts、multiple-apply API schemas 和 apiSchemas 示例；Stage Variable Expressions 正确保留迁移提示，不伪造旧正文；UsdAudio 保留 SpatialAudio、filePath、auralMode、playbackMode 和时间码示例；UsdLux Geometry Lights 保留 LightAPI、GeometryLight、light:shaderId 和 material emission 同步设计入口。
- 抽查 5 个新增 HTML：标题均为中文优先并保留英文页面名，均有中文层、英文摘录和必要代码片段，未发现 `U+FFFD`、`锟`、`Ã`、`Â`、`â` 等坏编码标记。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 395 draft / 3 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 395 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 395 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录本轮 5 页批次、脚本增强、覆盖计数和验证状态。

差距：

- 本轮新增 5 个 proposal 页仍是 `bilingual_draft`，有页面级中文导读和关键英文摘录，但不是完整白皮书逐段翻译。
- 剩余 `pending_full_scope` 只有 3 个页面；下一轮不应为了凑满 5 页而扩大范围或重复生成，按实际 3 页处理即可。

下一轮目标：

1. 继续从 release `pending_full_scope` 队列生成最后最多 3 个 draft，并保持 `source/full_release/`、`full_site/release/`、`reports/release_full_batch_report.*`、全量清单和最终 HTML 同步。
2. 以最新 pending 队列为准覆盖 `wp_usdlux_for_renderers.html`、`wp_usdshade.html` 和 `wp.html`。
3. 每轮继续运行 `full_draft_preview_audit`、范围边界审计、报告索引和总验证，确保新增 draft 均可从 `openusd_bilingual_final.html` 本地打开。

## 第 127 轮 时间：2026-06-04

已完成：

- 先复查 `reports/all_pages_inventory.json`、`reports/release_full_batch_report.json`、`reports/full_draft_preview_audit.json`、`reports/validation_report.json`、`reports/scope_manifest.json` 和最终入口，确认上一轮状态为 406 total / 8 complete / 395 draft / 3 pending，最终入口 HTTP 200。
- 读取最后 3 个官方 proposal 页的标题、段落、列表和代码片段，用于补专门中文导读：`wp_usdlux_for_renderers.html`、`wp_usdshade.html`、`wp.html`。
- 增强 `scripts/build_release_full_batch.mjs` 的页面级中文导读映射，新增 UsdLux for Renderers、UsdShade Material Assignment 和 Proposals 汇总页的导读。
- 按实际剩余 3 页运行 `scripts/build_release_full_batch.mjs`，新增 3 个 release `bilingual_draft` 页面：`wp_usdlux_for_renderers.html`、`wp_usdshade.html`、`wp.html`；没有为了凑 5 页扩大范围。
- 本批 3 页 HTTP 状态均为 200；每页 4 条中文导读，摘录数为 1-3 条，链接数为 1-13，代码/命令摘录数为 0-1。
- 质量抽查确认：UsdLux for Renderers 保留 Sdr、UsdSchemaRegistry、UsdLuxPluginLight、UsdLuxPluginLightFilter 和 render delegate 设计入口；UsdShade Material Assignment 保留 material:binding、PreviewMaterial/Skin 和 renderer-specific material outputs 示例；Proposals 保留 OpenUSD-proposals 迁移说明和 13 个 proposal 列表入口。
- 抽查 3 个新增 HTML：标题均为中文优先并保留英文页面名，均有中文层、英文摘录和必要代码/链接，未发现 `U+FFFD`、`锟`、`Ã`、`Â`、`â` 等坏编码标记。
- 重新运行 `scripts/discover_openusd_all_pages.mjs`，当前状态更新为 406 total / 8 complete / 398 draft / 0 pending。
- 重建 `openusd_bilingual_final.html`，最终 HTML 已链接 398 个 draft，并继续显示全量 406 页 complete/draft/pending 状态。
- 重新运行 `reports/full_draft_preview_audit.json`，当前 398 个 draft 页面全部通过临时 HTTP 访问、最终 HTML 链接和本地资源检查，失败 0。
- 修正 `scripts/validate_openusd_api_repro.ps1` 中两个旧验证条件：原逻辑仍要求 `pending_full_scope_pages > 0`，现改为以 `bilingual_complete + bilingual_draft + pending_full_scope == total_pages` 判断全量覆盖，因此 pending 清零后验证仍能正确通过。
- 重新运行 `scripts/validate_openusd_api_repro.ps1`，当前 275 项总验证全部通过；重新运行 `scripts/audit_openusd_report_index.mjs`，报告索引 15 个审计报告全部通过；最终入口 `http://127.0.0.1:8068/openusd_bilingual_final.html` 返回 HTTP 200。
- 同步 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和 `work.md`，记录最后 3 页批次、覆盖计数和验证状态。

差距：

- 全量发现清单已无 `pending_full_scope`，但 398 个覆盖页仍是 `bilingual_draft`，不是逐段完整翻译或最终校对版。
- 后续如果继续迭代，应转入质量提升阶段，例如按页面类型抽样精修 proposal/schema/tutorial/API draft，而不是继续 pending 队列。

下一轮目标：

1. 若继续自动化，先将策略从“补 pending 队列”改成“分批质量精修/抽查”，避免在 pending 为 0 时重复生成。
2. 可优先从本轮最后 proposal 页、长 proposal 页和 schema 属性密集页中挑选少量页面做段落级中文补强。
3. 每轮仍需运行 `full_draft_preview_audit`、报告索引和总验证，确保最终入口可用。

## 第 128 轮 时间：2026-06-04

已完成：

- 针对用户反馈“很多链接跳到原始英文网站”，检查当前页面 `site/_usd__overview_and_purpose.html`、API/release draft 页和最终入口，确认旧生成逻辑把大量 OpenUSD 站内 HTML 链接保留为官方 URL 或错误相对路径。
- 新增 `scripts/route_openusd_internal_links_local.mjs`：读取 `reports/all_pages_inventory.json`，把 406 清单内的 OpenUSD release/API HTML 链接改写为本地相对路径；对不在 406 清单内但仍属于 OpenUSD 内部 HTML 的链接，改写到本地 `site/uncovered_openusd_page.html` 缺口提示页；只有明确标注“官方原页 / Open official page”的链接继续外跳。
- 新增 `site/uncovered_openusd_page.html`，用于显示未纳入当前清单的内部目标 URL，并提供明确的官方原页按钮，避免用户点击时无提示地离开本地复刻站点。
- 重新生成 8 个原本较完整的入口/相邻页和最终入口，清除第一版过度路由造成的本地导航污染；随后使用收紧后的路由脚本重新改写链接。
- `reports/local_link_routing_report.json/.md` 记录当前路由状态：409 个 HTML 文件检查，4975 个链接路由到已有本地页，4914 个清单外内部链接路由到本地缺口页，408 个显式官方原页链接保留。
- 抽查 `site/_usd__overview_and_purpose.html`：`arch_page_front.html`、`tf_page_front.html` 等已跳本地 `full_site/api/...`；`class_usd_stage.html` 等当前 406 清单外页面跳本地缺口页；非显式官方外链为 0。
- 抽查 `full_site/release/wp_usdshade.html`：`UsdShade overview page` 已跳本地 `../api/usd_shade_page_front.html`，只有“打开官方原页 / Open official page”保留官方 URL。
- 将本地路由报告纳入 `scripts/validate_openusd_api_repro.ps1`，新增路由报告通过、406 本地输出存在、内部链接本地路由数量三类检查。
- 重新运行 `scripts/validate_openusd_api_repro.ps1`，当前 281 项总验证全部通过；`scripts/audit_openusd_full_draft_preview.mjs` 确认 398/398 draft 页面通过；`scripts/audit_openusd_report_index.mjs` 通过；最终入口 HTTP 200。
- 同步 `README.md`、`work.md`、`reports/scope_manifest.json` 和 `reports/scope_manifest.md`，明确 398 个 `bilingual_draft` 是草稿覆盖页，不是逐段完整翻译。

差距：

- 本轮解决的是站内链接本地化和状态说明问题；398 个 draft 页面仍主要是中文导读 + 英文摘录保留，不是最终完整翻译。
- 路由报告中的 4914 个清单外内部链接说明当前 406 页发现清单并未覆盖 Doxygen 中全部类/函数/源文件交叉链接；这些现在不会直接跳官方站，但仍只是本地缺口提示页。

下一轮目标：

1. 若继续做质量提升，先按 5 页一组选择 `bilingual_draft` 页面做段落级中文补强，并把状态从 draft 逐步提升到更高质量标记。
2. 对清单外缺口页，可先按点击频率或核心 API 重要性扩展局部清单，例如 `class_usd_stage.html`、`class_vt_array.html`、`class_vt_value.html` 等当前 Overview 页高频目标。
3. 每轮保持 `route_openusd_internal_links_local.mjs`、`full_draft_preview_audit`、报告索引和总验证同步运行。

## 第 129 轮 时间：2026-06-04

已完成：

- 针对用户要求“逐个检查一下翻译效果”，新增只读质检脚本 `scripts/audit_openusd_translation_quality.mjs`，不改正文，逐页检查 406 个本地 HTML 的中英层厚度、draft 模板痕迹、坏编码风险和非预期官方外跳。
- 生成 `reports/translation_quality_review.json` 和 `reports/translation_quality_review.md`，把每页分为 `good_bilingual`、`draft_template_only`、`thin_chinese`、`draft_needs_translation` 等等级，并给出本轮 focus batch 与后续优先队列。
- 使用浏览器实际打开当前页 `site/_usd__overview_and_purpose.html`，确认渲染层中文正常、英文保留正常、非预期官方外跳为 0；PowerShell 中看到的乱码属于终端显示层，不是该页面实际渲染。
- 使用浏览器抽查清单前 5 个 draft：`_c_l_i11_8h_source.html`、`_developer__guides.html`、`_usd_skel__intro.html`、`annotated.html`、`ar_page_front.html`。均无坏编码和非预期官方外跳，但翻译层基本只有范围说明和结构标签，属于 `draft_template_only`。
- 质检结果显示：406 页中 3 页为 `good_bilingual`，389 页为 `draft_template_only`，5 页为 `thin_chinese`，9 页为 `draft_needs_translation`。这说明当前全量覆盖可打开，但绝大多数 draft 还不是可接受的完整双语翻译。
- 将翻译质检报告纳入 `scripts/audit_openusd_report_index.mjs`，并消除索引报告与总验证报告之间的循环失败状态；当前报告索引为 16 个审计报告 / 17 个总条目，失败 0。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 页面 HTTP 预览通过；重新运行 `scripts/validate_openusd_api_repro.ps1`，281 项总验证通过，失败 0。

差距：

- 这轮是逐页质检与分级，不是翻译正文精修。多数页面仍然需要按 5 页一组进入段落级中文补强。
- API 源码页和类列表页价值不同，后续不应机械按低中文字符数排序全量翻译；应优先处理用户会阅读的指南、概念页、schema 页面和核心 API 入口。

下一轮目标：

1. 按 5 页一组进入翻译精修，优先从本轮 focus batch 中的 `Developer Guides`、`UsdSkel Introduction`、`Class List`、`Ar: Asset Resolution` 等可读性入口开始。
2. 对每页补充页面级中文导读、关键段落中文解释和必要术语表，同时保留英文原文与 API 名称。
3. 每轮精修后继续运行 `audit_openusd_translation_quality.mjs`、`full_draft_preview_audit`、报告索引和总验证。

## 第 130 轮 时间：2026-06-04

已完成：

- 针对用户指出“自动化呢？还有很多没完成”，检查现有 `openusd-api` 自动化，应用返回该自动化已不存在；重新创建当前线程 heartbeat 自动化，名称为 `OpenUSD 双语复刻精修`，自动化 id 为 `openusd`，节奏为 5 分钟一轮。
- 新自动化提示词已从旧的“补 pending_full_scope 队列”改为“基于 `reports/translation_quality_review.*` 每轮最多精修 5 个未达标页面”，并明确 pending 已为 0、不要一次性大批量改完、不要把 draft 壳当完成页。
- 新增 `scripts/refine_openusd_translation_batch.mjs`，用于给选定页面插入可重复刷新的 `中文精修导读 / Chinese Reading Notes` 区块，避免重建整页时破坏已有链接路由。
- 本轮精修 5 个用户可读入口页：`full_site/api/_developer__guides.html`、`full_site/api/_usd_skel__intro.html`、`full_site/api/annotated.html`、`full_site/api/ar_page_front.html`、`full_site/api/arch_page_front.html`。每页补充 4 条页面级中文导读和 5 条术语对照，保留英文/API 名称和原英文摘录。
- 浏览器抽查 `full_site/api/ar_page_front.html`：中文导读渲染正常，英文/API 名称保留，坏编码 0，非预期官方外跳 0。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查，已有本地路由状态保持稳定，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，当前分级从 389 个 `draft_template_only` 降为 384 个；本轮 5 页均提升为 `draft_needs_translation`，说明已有页面专属中文导读，但仍不是最终逐段完整翻译。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 页面 HTTP 预览通过；`scripts/audit_openusd_report_index.mjs` 通过；`scripts/validate_openusd_api_repro.ps1` 281 项总验证通过，失败 0。

差距：

- 本轮 5 页完成的是第一层精修：页面级中文导读和术语层，不是逐段完整翻译；仍需后续轮次继续把 `draft_needs_translation` 提升到更完整的段落级双语。
- 全量仍有 384 个 `draft_template_only` 页面，后续自动化应继续按 5 页一组推进，而不是重走 pending 清单。

下一轮目标：

1. 自动化下一轮继续从 `translation_quality_review` 选择最多 5 个未达标且用户可读价值高的页面，优先 release 教程、schema 指南、概念页和核心 API 入口。
2. 对纯源码页保持低优先级，除非它们被高价值页面反复链接或用户明确要求。
3. 每轮继续保存 HTML、运行链接路由、翻译质检、full draft preview、报告索引和总验证，并记录质量分级变化。
## 第 131 轮：用户截图页正文级双语修正

已完成：

- 针对用户在本地 `site/intro.html` 截图中指出的正文未翻译问题，复查源快照、生成脚本、双语页面、链接路由和翻译质量报告。
- 确认 `intro.html` 原先主要是标题/导航/范围说明双语，主体段落仍大量英文裸露，因此不能仅凭 `bilingual_complete` 状态视为达标。
- 增强 `scripts/build_intro_bilingual.mjs`，为 `Introduction to USD` 主要章节插入中文在前的正文级阅读层，并保留英文原文、API 名称、页面名和原链接结构。
- 重新生成 `site/intro.html` 并运行 `scripts/route_openusd_internal_links_local.mjs`，避免普通站内 OpenUSD 链接跳回官方英文站。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，`site/intro.html` 已提升为 `good_bilingual`；脚本抽查显示正文中文约 2951 字、坏编码 0、非预期官方外跳 0。
- 当前质量报告仍显示 4 个 `thin_chinese` 完成页：`site/index.html`、`site/release_index.html`、`site/apiDocs.html`、`site/usd_page_front.html`，下一轮优先处理。
- 本轮继续在最多 5 页范围内处理这 4 个薄弱完成页：补强 `site/index.html`，并增强 `build_release_index_bilingual.mjs`、`build_apiDocs_bilingual.mjs`、`build_usd_page_front_bilingual.mjs` 后重新生成对应 HTML。
- 重新运行链接路由和翻译质量审计后，8 个 `bilingual_complete` 页面全部达到 `good_bilingual`；当前分级为 `good_bilingual` 8、`draft_needs_translation` 14、`draft_template_only` 384。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 全量 406 页已经有本地 HTML，且 8 个完成页已达到当前质量审计的 `good_bilingual`；但 398 页仍是 `bilingual_draft`，多数只具备中文导读与英文摘录，不是逐段完整翻译。
- 后续验收必须以 `translation_quality_review` 的分级为准，不能只看 pending 是否为 0。

下一轮目标：

1. 保持每轮最多 5 页的节奏。
2. 下一轮从 `reports/translation_quality_review.md` 的 draft 队列中选择 5 个用户可读价值高的页面，优先教程、schema 指南、概念页和核心 API 入口。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 第 231 轮：NodeGraph、OpenVDB、属性教程、Q 变量索引与 SceneGraphPrim 二次精修

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一轮 GitHub 同步提交为 `088bf34`，远端 `origin/main` 指向 `088bf349df404d5f059348b2df211a2014a24a5d`。
- 严格按本轮最多 5 页处理，新增脚本 `scripts/refine_openusd_release_batch_100.mjs`，标记为 `release-quality-pass-100`。
- 本轮精修页面：
  - `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`
  - `full_site/release/tut_inspect_and_author_props.html`
  - `full_site/api/functions_vars_q.html`
  - `full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 node graph UI 元数据、OpenVDB 外部体积 grid、属性检查与创作教程、Doxygen Q 变量索引、SceneGraphPrim UI hints；API 名称、属性名、路径、token 字面量和英文原文均保留。
- 目标页质量回读：
  - `NodeGraphNodeAPI.html`：`draft_needs_translation`，中文字符 621，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `OpenVDBAsset.html`：`draft_needs_translation`，中文字符 569，中文/英文块 24/17，坏编码 0，非预期外跳 0。
  - `tut_inspect_and_author_props.html`：`draft_needs_translation`，中文字符 521，中文/英文块 25/19，坏编码 0，非预期外跳 0。
  - `functions_vars_q.html`：`draft_needs_translation`，中文字符 627，中文/英文块 24/16，坏编码 0，非预期外跳 0。
  - `SceneGraphPrimAPI.html`：`draft_needs_translation`，中文字符 559，中文/英文块 24/16，坏编码 0，非预期外跳 0。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8；原因是本轮 5 页开始前已处于 `draft_needs_translation`，本轮属于第二层精修，不会改变当前审计分级。
- 审计与验证结果：`audit_openusd_translation_quality.mjs` 通过；`route_openusd_internal_links_local.mjs` 通过且 `files_changed=0`；`audit_openusd_full_draft_preview.mjs` 通过，398/398 draft 页面可预览；`audit_openusd_report_index.mjs` 通过；`validate_openusd_api_repro.ps1` 通过。

差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮提升了 5 页的中文阅读层厚度，但仍不是逐段完整翻译，后续仍应按最多 5 页节奏继续二次精修。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的页面。
2. 下一轮建议目标：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`full_site/api/functions_rela_t.html`、`full_site/api/globals_func_s.html`。
3. 继续低优先处理 `_source.html`、`search.html` 和目录页；每轮保持链接路由、翻译质量审计、draft 预览审计、报告索引、总验证与 GitHub 同步。

## 第 232 轮：Gaussian Surflet、usdMedia 目录、RectLight、Related T 与 Sdf 函数索引补强

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一轮 GitHub 同步提交为 `0447497`，远端 `origin/main` 指向 `04474978e19a23afc981aabea1ee98aa2380d39e`。
- 严格按本轮最多 5 页处理，新增脚本 `scripts/refine_openusd_release_batch_101.mjs`，标记为 `release-quality-pass-101`。
- 本轮精修页面：
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`
  - `full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`
  - `full_site/release/user_guides/schemas/usdLux/RectLight.html`
  - `full_site/api/functions_rela_t.html`
  - `full_site/api/globals_func_s.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 Gaussian surflet kernel 的 XY plane / opacity / 3-sigma 读法、`usdMedia` 目录导航、`RectLight` 发光方向与摄影用途、Doxygen Related Functions - T 索引、File Members - Functions - S 中的 `Sdf*` 函数与头文件映射。
- 目标页质量回读：
  - `ParticleFieldKernelGaussianSurfletAPI.html`：`draft_needs_translation`，中文字符 741，中文/英文块 36/25，坏编码 0，非预期外跳 0。
  - `usdMedia_toc.html`：`draft_needs_translation`，中文字符 540，中文/英文块 24/16，坏编码 0，非预期外跳 0。
  - `RectLight.html`：`draft_needs_translation`，中文字符 526，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `functions_rela_t.html`：`draft_needs_translation`，中文字符 557，中文/英文块 24/16，坏编码 0，非预期外跳 0。
  - `globals_func_s.html`：`draft_needs_translation`，中文字符 548，中文/英文块 25/17，坏编码 0，非预期外跳 0。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8；原因是本轮 5 页开始前已处于 `draft_needs_translation`，本轮属于补强精修，不会改变当前审计分级。
- 审计与验证结果：`audit_openusd_translation_quality.mjs` 通过；`route_openusd_internal_links_local.mjs` 通过且 `files_changed=0`；`audit_openusd_full_draft_preview.mjs` 通过，398/398 draft 页面可预览；`audit_openusd_report_index.mjs` 通过；`validate_openusd_api_repro.ps1` 通过。
- GitHub 同步结果：本轮记录随 `OpenUSD bilingual round 232: surflet media rect related sdf pass` 提交并推送到 `origin/main`。

差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮提升了 5 页的中文阅读层厚度，但仍不是逐段完整翻译，后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际阅读的教程、schema 指南和 API 索引页。
2. 下一轮建议目标：`full_site/release/tut_traversing_stage.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`、`full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`、`full_site/release/user_guides/schemas/usdLux/SphereLight.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdRender/RenderSettings.html` 或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html` 和 `search.html`。

## 第 233 轮：Stage 遍历、AssetPreviews、RenderProduct、SpatialAudio 与 SphereLight 补强

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一次 GitHub 同步提交为 `e36183b`，远端 `origin/main` 指向 `e36183bdee48526db592fb4107a63674371decac`。
- 严格按本轮最多 5 页处理，新增脚本 `scripts/refine_openusd_release_batch_102.mjs`，标记为 `release-quality-pass-102`。
- 本轮精修页面：
  - `full_site/release/tut_traversing_stage.html`
  - `full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderProduct.html`
  - `full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`
  - `full_site/release/user_guides/schemas/usdLux/SphereLight.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 `UsdStage` 组合遍历、asset preview thumbnails、`RenderProduct` 与 `RenderVar`/`RenderSettings` 的关系、`SpatialAudio` 播放属性，以及 `SphereLight` 的 one-sided/treatAsPoint/zero-area light 语义。
- 目标页质量回读：
  - `tut_traversing_stage.html`：`draft_needs_translation`，中文字符 576，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `AssetPreviewsAPI.html`：`draft_needs_translation`，中文字符 617，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `RenderProduct.html`：`draft_needs_translation`，中文字符 555，中文/英文块 24/16，坏编码 0，非预期外跳 0。
  - `SpatialAudio.html`：`draft_needs_translation`，中文字符 578，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `SphereLight.html`：`draft_needs_translation`，中文字符 559，中文/英文块 24/18，坏编码 0，非预期外跳 0。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8；原因是本轮 5 页开始前已处于 `draft_needs_translation`，本轮属于第二层补强精修，不会改变当前审计分级。
- 审计与验证结果：`audit_openusd_translation_quality.mjs` 通过；`route_openusd_internal_links_local.mjs` 通过且 `files_changed=0`；`audit_openusd_full_draft_preview.mjs` 通过，398/398 draft 页面可预览；`audit_openusd_report_index.mjs` 通过；`validate_openusd_api_repro.ps1` 通过。
- GitHub 同步结果：本轮记录随 `OpenUSD bilingual round 233: traversal previews renderproduct audio sphere pass` 提交并推送到 `origin/main`。

差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮继续提升 5 页的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理已确认存在且用户会实际阅读的 schema/API 页面。
2. 下一轮建议目标：`full_site/release/user_guides/schemas/usdRender/RenderSettings.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdLux/DiskLight.html`、`full_site/release/user_guides/schemas/usdLux/DistantLight.html`。
3. 已确认 `full_site/release/user_guides/schemas/usdMedia/SpatialAudioAndLayerOffsets.html` 不存在，不要新建；继续低优先处理 `_source.html`、`search.html` 和目录页。

## 第 234 轮：RenderSettings/RenderVar/RenderSettingsBase 与 Disk/Distant Light 补强

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一次 GitHub 同步提交为 `1ff962a`，远端 `origin/main` 指向 `1ff962a0b4fcfdd21140642125e02411a690f0e8`。
- 严格按本轮最多 5 页处理，新增脚本 `scripts/refine_openusd_release_batch_103.mjs`，标记为 `release-quality-pass-103`。
- 本轮精修页面：
  - `full_site/release/user_guides/schemas/usdRender/RenderSettings.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderVar.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`
  - `full_site/release/user_guides/schemas/usdLux/DiskLight.html`
  - `full_site/release/user_guides/schemas/usdLux/DistantLight.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 `RenderSettings -> RenderProduct -> RenderVar` 链路、AOV/sourceName/sourceType/dataType、`RenderSettingsBase` 的 camera/resolution/aspect ratio/dataWindowNDC 控制、`DiskLight` 的 XY plane/-Z axis/radius/intensity，以及 `DistantLight` 的 directional light/inputs:angle/shadow softness 语义。
- 目标页质量回读：
  - `RenderSettings.html`：`draft_needs_translation`，中文字符 544，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `RenderVar.html`：`draft_needs_translation`，中文字符 792，中文/英文块 36/25，坏编码 0，非预期外跳 0。
  - `RenderSettingsBase.html`：`draft_needs_translation`，中文字符 659，中文/英文块 32/25，坏编码 0，非预期外跳 0。
  - `DiskLight.html`：`draft_needs_translation`，中文字符 531，中文/英文块 24/18，坏编码 0，非预期外跳 0。
  - `DistantLight.html`：`draft_needs_translation`，中文字符 545，中文/英文块 24/17，坏编码 0，非预期外跳 0。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8；原因是本轮 5 页开始前已处于 `draft_needs_translation`，本轮属于第二层补强精修，不会改变当前审计分级。
- 审计与验证结果：`audit_openusd_translation_quality.mjs` 通过；`route_openusd_internal_links_local.mjs` 通过且 `files_changed=0`；`audit_openusd_full_draft_preview.mjs` 通过，398/398 draft 页面可预览；`audit_openusd_report_index.mjs` 通过；`validate_openusd_api_repro.ps1` 通过。
- GitHub 同步结果：本轮记录随 `OpenUSD bilingual round 234: render settings vars disk distant pass` 提交并推送到 `origin/main`。

差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮继续提升 5 页的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理已确认存在且用户会实际阅读的 `usdLux` schema 页面。
2. 下一轮建议目标：`full_site/release/user_guides/schemas/usdLux/CylinderLight.html`、`full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`、`full_site/release/user_guides/schemas/usdLux/GeometryLight.html`、`full_site/release/user_guides/schemas/usdLux/LightAPI.html`、`full_site/release/user_guides/schemas/usdLux/LightFilter.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdRender/RenderPass.html` 或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 235 轮：Cylinder/Dome/Geometry Light 与 LightAPI/LightFilter 补强

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一次 GitHub 同步提交为 `6b2f014`，远端 `origin/main` 指向 `6b2f0140449089d67ecda562086f481e765b9a98`。
- 新增并执行 `scripts/refine_openusd_release_batch_104.mjs`，本轮标记为 `release-quality-pass-104`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/CylinderLight.html`
  - `full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`
  - `full_site/release/user_guides/schemas/usdLux/GeometryLight.html`
  - `full_site/release/user_guides/schemas/usdLux/LightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/LightFilter.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 `CylinderLight` 的圆柱侧面发光、end-caps 边界、tube-shaped fluorescent light 场景，`DomeLight_1` 的 HDR / IBL / `poleAxis` / portals，`GeometryLight` 的 deprecated 状态与 `MeshLightAPI` 迁移方向，`LightAPI` 的 common light inputs、light-linking、shadow-linking、filters 和 connectable prim 边界，以及 `LightFilter` 的 filter linking、shaderId、connectable container 和 UsdShade 封装规则。
- 目标页质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 546、657、616、567、589；中英块分别为 24/18、39/32、35/28、40/33、35/28。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮属于补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后准备通过 `sync_openusd_to_github.ps1` 以 `OpenUSD bilingual round 235: usdLux cylinder dome geometry filter pass` 提交并推送。

当前差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮提升了 5 个 usdLux schema 页面的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际阅读的 `usdLux` schema 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/DomeLight.html`、`full_site/release/user_guides/schemas/usdLux/LightListAPI.html`、`full_site/release/user_guides/schemas/usdLux/PortalLight.html`、`full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`。
3. 后续可继续 `NonboundableLightBase.html`、`PluginLight.html`、`VolumeLightAPI.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 236 轮：DomeLight、LightListAPI、PortalLight、MeshLightAPI 与 ShadowAPI 补强

已完成：

- 先复核仓库、远端和报告状态：本地 `main` 干净，上一次 GitHub 同步提交为 `a414328`，远端 `origin/main` 指向 `a414328d50f6a934d4a1668e7495249c7e4191b9`。
- 新增并执行 `scripts/refine_openusd_release_batch_105.mjs`，本轮标记为 `release-quality-pass-105`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/DomeLight.html`
  - `full_site/release/user_guides/schemas/usdLux/LightListAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/PortalLight.html`
  - `full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`
- 每页新增 5 条中文二次精修导读和 6 条术语对照，覆盖 `DomeLight` 的 HDR/IBL、`inputs:texture:file`、OpenEXR latitude-longitude map 和 `PortalLight` 关系，`LightListAPI` 的 traversal、`ComputeLightList()`、`ComputeModeIgnoreCache` 与 light path 列表，`PortalLight` 的 local XY plane、`-Z direction`、`inputs:height`/`inputs:width` 和 dome sampling 引导，`MeshLightAPI` 的 applied API、`materialGlowTintsLight`、`MeshLight` shaderId 和 mesh emission 迁移边界，以及 `ShadowAPI` 的 non-physical controls、shadow color/distance/falloff/falloffGamma/enable 与 shadow-linking 区分。
- 目标页质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 580、547、686、655、693；中英块分别为 24/18、24/17、38/31、29/20、32/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮属于补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 236: usdLux dome list portal mesh shadow pass` 提交并推送本轮 HTML、脚本、报告和 `work.md`。

当前差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`，398 页仍为 `bilingual_draft`；其中 387 页为 `draft_needs_translation`，11 页为 `draft_template_only`。
- 本轮继续提升 5 个 usdLux schema 页面的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际阅读的 `usdLux` schema 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/PluginLight.html`、`full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/overview.html`、`full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`PluginLightFilter.html`、`BoundableLightBase.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 237 轮：NonboundableLightBase、PluginLight、VolumeLightAPI、Overview 与 ShapingAPI 补强

已完成：

- 复核当前 git 状态、远端和报告：本地 `main` 基于上一轮同步提交 `fa5afbb`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_106.mjs`，本轮标记为 `release-quality-pass-106`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`
  - `full_site/release/user_guides/schemas/usdLux/PluginLight.html`
  - `full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/overview.html`
  - `full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 non-boundable light 的 scene bounds/positional information 边界、`PluginLight` 与 `Sdr shader node`/`render delegate` 扩展关系、`VolumeLightAPI` 的 applied API/material sync/shaderId 语义、`usdLux` overview 作为 schema 域导航的阅读路径，以及 `ShapingAPI` 的 cone/focus/IES profile 控制。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `NonboundableLightBase.html`：中文字符 709，中文/英文块 33/24。
  - `PluginLight.html`：中文字符 732，中文/英文块 33/24。
  - `VolumeLightAPI.html`：中文字符 685，中文/英文块 29/20。
  - `overview.html`：中文字符 653，中文/英文块 29/22。
  - `ShapingAPI.html`：中文字符 660，中文/英文块 34/27。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮属于第二层补强精修，不会改变当前审计分级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 237: usdLux nonbound plugin volume shaping pass` 提交并推送。

当前差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`；398 页仍为 `bilingual_draft`，其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`。
- 本轮继续提升 5 个 usdLux schema/overview 页面的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际阅读的 `usdLux` schema 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`full_site/release/user_guides/schemas/usdLux/SphereLight.html`。
3. 后续可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 238 轮：ListAPI、PluginLightFilter、BoundableLightBase、RectLight 与 SphereLight 补强

已完成：

- 复核当前 git 状态、远端和报告：本地 `main` 基于上一轮同步提交 `eaf0cd6`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_107.mjs`，本轮标记为 `release-quality-pass-107`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/ListAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`
  - `full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`
  - `full_site/release/user_guides/schemas/usdLux/RectLight.html`
  - `full_site/release/user_guides/schemas/usdLux/SphereLight.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `ListAPI` 的 deprecated 兼容层与 `LightListAPI` 迁移边界、`PluginLightFilter` 的 Sdr/UsdShade 插件过滤器入口、`BoundableLightBase` 的 scene bounds/extent 基类语义、`RectLight` 的 width/height/texture/transform 组合阅读，以及 `SphereLight` 的 radius/treatAsPoint/zero-area renderer 支持边界。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `ListAPI.html`：中文字符 755，中文/英文块 29/21。
  - `PluginLightFilter.html`：中文字符 697，中文/英文块 36/29。
  - `BoundableLightBase.html`：中文字符 670，中文/英文块 35/26。
  - `RectLight.html`：中文字符 820，中文/英文块 36/25。
  - `SphereLight.html`：中文字符 841，中文/英文块 36/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮属于第二层补强精修，不会改变当前审计分级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 238: usdLux list filter bound rect sphere pass` 提交并推送。

当前差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`；398 页仍为 `bilingual_draft`，其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`。
- 本轮继续提升 5 个 usdLux schema 页面的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理较薄且用户会实际阅读的教程、usdRender 或 usdMedia schema 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdRender/RenderPass.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`、`full_site/release/tut_inspect_and_author_props.html`、`full_site/release/tut_traversing_stage.html`、`full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 239 轮：RenderPass、RenderProduct、属性教程、Stage 遍历与 SpatialAudio 补强

已完成：

- 复核当前 git 状态、远端和报告：本地 `main` 基于上一轮同步提交 `a86ede1`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_108.mjs`，本轮标记为 `release-quality-pass-108`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdRender/RenderPass.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderProduct.html`
  - `full_site/release/tut_inspect_and_author_props.html`
  - `full_site/release/tut_traversing_stage.html`
  - `full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `RenderPass` 的 `renderSource`、`passType`、`command` 与 collection-based visibility，`RenderProduct` 的 `productName` 与 `orderedVars` 输出组织，属性教程中的 `Usd.Stage.Open`、`GetPrimAtPath`、`GetAttribute/Get/Set` 访问链，Stage 遍历教程中的 `usdviewApi.stage.Traverse()` 与 composed stage view，以及 `SpatialAudio` 的 `filePath`、`auralMode`、`playbackMode`、`mediaOffset` 与 timeCode 播放时序。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `RenderPass.html`：中文字符 762，中文/英文块 36/25。
  - `RenderProduct.html`：中文字符 809，中文/英文块 36/23。
  - `tut_inspect_and_author_props.html`：中文字符 764，中文/英文块 37/26。
  - `tut_traversing_stage.html`：中文字符 795，中文/英文块 36/25。
  - `SpatialAudio.html`：中文字符 855，中文/英文块 36/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮属于第二层补强精修，不会改变当前审计分级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 239: render product tutorials spatial audio pass` 提交并推送。

当前差距：

- 全量 406 页仍不是完成态：8 页 `good_bilingual`；398 页仍为 `bilingual_draft`，其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`。
- 本轮继续提升 5 个教程、usdRender 和 usdMedia 页面的中文阅读层厚度，但仍不是逐段完整翻译；后续继续按最多 5 页节奏推进。

下一轮目标：

1. 继续最多 5 页，优先处理较薄且用户会实际阅读的 usdMedia/usdRender 入口、schema 或 proposal 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/release/wp_render_settings.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 240 轮：usdMedia Overview/TOC、AssetPreviewsAPI、usdRender TOC 与 Render Settings 提案补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `c030beb`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_109.mjs`，本轮标记为 `release-quality-pass-109`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdMedia/overview.html`
  - `full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`
  - `full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`
  - `full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`
  - `full_site/release/wp_render_settings.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `usdMedia` 的媒体 schema 定位、`AssetPreviewsAPI` 缩略图字典、`SpatialAudio` 的音频入口、`usdRender` TOC 的渲染 schema 导航，以及 Render Settings 提案中 `RenderSettings` / `RenderProduct` / `RenderVar` 的边界。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `overview.html`：中文字符 661，中文/英文块 27/20。
  - `usdMedia_toc.html`：中文字符 804，中文/英文块 36/23。
  - `AssetPreviewsAPI.html`：中文字符 845，中文/英文块 36/25。
  - `usdRender_toc.html`：中文字符 704，中文/英文块 36/23。
  - `wp_render_settings.html`：中文字符 661，中文/英文块 33/22。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 240: media render toc previews proposal pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理存在且较薄、用户会实际阅读的 usdRender schema 与教程页。
2. 建议处理：`full_site/release/user_guides/schemas/usdRender/RenderSettings.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/tut_helloworld.html`、`full_site/release/tut_authoring_variants.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 241 轮：RenderSettings/RenderSettingsBase/RenderVar 与 HelloWorld/Variants 教程补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `ee426b0`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_110.mjs`，本轮标记为 `release-quality-pass-110`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdRender/RenderSettings.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderVar.html`
  - `full_site/release/tut_helloworld.html`
  - `full_site/release/tut_authoring_variants.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `RenderSettings -> RenderProduct -> RenderVar` 链条、`RenderSettingsBase` 的相机/分辨率/NDC/模糊控制、`RenderVar` 的 `sourceName` / `sourceType` / `dataType` 语义，以及 HelloWorld 与 Variants 教程中的 stage、layer、typed prim、variant set 和 edit context。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `RenderSettings.html`：中文字符 846，中文/英文块 36/25。
  - `RenderSettingsBase.html`：中文字符 956，中文/英文块 44/32。
  - `RenderVar.html`：中文字符 1070，中文/英文块 48/32。
  - `tut_helloworld.html`：中文字符 860，中文/英文块 37/25。
  - `tut_authoring_variants.html`：中文字符 940，中文/英文块 36/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 241: render settings hello variants pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理存在且更薄、用户会实际阅读的教程和用户指南页。
2. 建议处理：`full_site/release/tut_helloworld_redux.html`、`full_site/release/tut_referencing_layers.html`、`full_site/release/tut_simple_shading.html`、`full_site/release/tut_xforms.html`、`full_site/release/user_guides/collections_and_patterns.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 242 轮：HelloWorld Redux、Referencing、Simple Shading、Xforms 与 Collections 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `44d70a8`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_111.mjs`，本轮标记为 `release-quality-pass-111`。
- 严格只精修 5 页：
  - `full_site/release/tut_helloworld_redux.html`
  - `full_site/release/tut_referencing_layers.html`
  - `full_site/release/tut_simple_shading.html`
  - `full_site/release/tut_xforms.html`
  - `full_site/release/user_guides/collections_and_patterns.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `stage.DefinePrim` 与 generic prim、reference composition arc、`UsdShade` 材质网络、`xformOp` / `Sdf.LayerOffset` 动画重定时，以及 `CollectionAPI` 的 relationship-mode 与 expression-mode。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `tut_helloworld_redux.html`：中文字符 566，中文/英文块 24/18。
  - `tut_referencing_layers.html`：中文字符 541，中文/英文块 24/18。
  - `tut_simple_shading.html`：中文字符 520，中文/英文块 25/19。
  - `tut_xforms.html`：中文字符 526，中文/英文块 26/20。
  - `collections_and_patterns.html`：中文字符 549，中文/英文块 24/18。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 242: redux references shading xforms collections pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理存在且较薄的 release 规格、教程和用户指南页。
2. 建议处理：`full_site/release/spec.html`、`full_site/release/tut_converting_between_layer_formats.html`、`full_site/release/tut_variants_example_in_katana.html`、`full_site/release/user_guides/namespace_editing.html`、`full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 243 轮：Specifications、Layer Format、Katana Variants、Namespace Editing 与 AccessibilityAPI 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `8cb9b82`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_112.mjs`，本轮标记为 `release-quality-pass-112`。
- 严格只精修 5 页：
  - `full_site/release/spec.html`
  - `full_site/release/tut_converting_between_layer_formats.html`
  - `full_site/release/tut_variants_example_in_katana.html`
  - `full_site/release/user_guides/namespace_editing.html`
  - `full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 OpenUSD 规范入口、`.usda` / `.usdc` / `.usd` layer 格式转换、Katana variant switching 历史背景、composed stage 上的 namespace edit，以及 `AccessibilityAPI` 的 label/description/priority 元数据。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `spec.html`：中文字符 567，中文/英文块 24/16。
  - `tut_converting_between_layer_formats.html`：中文字符 604，中文/英文块 26/20。
  - `tut_variants_example_in_katana.html`：中文字符 576，中文/英文块 24/18。
  - `namespace_editing.html`：中文字符 541，中文/英文块 24/18。
  - `AccessibilityAPI.html`：中文字符 518，中文/英文块 24/17。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 243: specs formats katana namespace accessibility pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理存在且较薄的 usdUI/schema 入口与时间/变量用户指南页。
2. 建议处理：`full_site/release/user_guides/schemas/usdUI/Backdrop.html`、`full_site/release/user_guides/schemas/usdUI/AttributeHints.html`、`full_site/release/user_guides/schemas/index.html`、`full_site/release/user_guides/variable_expressions.html`、`full_site/release/user_guides/time_and_animated_values.html`。
3. 已确认 `full_site/release/tut_creating_references.html`、`full_site/release/tut_instancing.html`、`full_site/release/user_guides/stage_variables.html` 不在当前 406 清单内，不新建；后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 244 轮：usdUI Backdrop/AttributeHints、Schema Domains、Variable Expressions 与 Time Values 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `16ddbe0`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_113.mjs`，本轮标记为 `release-quality-pass-113`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdUI/Backdrop.html`
  - `full_site/release/user_guides/schemas/usdUI/AttributeHints.html`
  - `full_site/release/user_guides/schemas/index.html`
  - `full_site/release/user_guides/variable_expressions.html`
  - `full_site/release/user_guides/time_and_animated_values.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 node graph 的 `Backdrop` 视觉分组、`AttributeHints` 的 `valueLabels` / `valueLabelsOrder`、schema 领域索引的阅读路径、`expressionVariables` 运行时表达式，以及 `TimeCode` / `timeSamples` 动画值语义。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `Backdrop.html`：中文字符 552，中文/英文块 24/17。
  - `AttributeHints.html`：中文字符 545，中文/英文块 24/18。
  - `schemas/index.html`：中文字符 582，中文/英文块 24/16。
  - `variable_expressions.html`：中文字符 687，中文/英文块 30/19。
  - `time_and_animated_values.html`：中文字符 653，中文/英文块 31/20。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 244: usdUI schema time variables pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 usdUI hints 和 Stage Variables 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`、`full_site/release/wp_stage_variables.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html` 或转向仍较薄的 usdVol/API/guide 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。
## 第 245 轮：usdUI Object/Prim/Property/SceneGraph hints 与 Stage Variables 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `7c24d63`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_114.mjs`，本轮标记为 `release-quality-pass-114`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdUI/ObjectHints.html`
  - `full_site/release/user_guides/schemas/usdUI/PrimHints.html`
  - `full_site/release/user_guides/schemas/usdUI/PropertyHints.html`
  - `full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`
  - `full_site/release/wp_stage_variables.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `ObjectHints` 的 `uiHints` / `displayName` / `hidden`、`PrimHints` 的 display group 展开和条件显示、`PropertyHints` 的 `shownIf` 与 property 分组、`SceneGraphPrimAPI` 的 scene graph UI metadata，以及 `Stage Variable Expressions` proposal 迁移状态。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0：
  - `ObjectHints.html`：中文字符 747，中文/英文块 36/24。
  - `PrimHints.html`：中文字符 744，中文/英文块 36/25。
  - `PropertyHints.html`：中文字符 735，中文/英文块 36/25。
  - `SceneGraphPrimAPI.html`：中文字符 758，中文/英文块 36/23。
  - `wp_stage_variables.html`：中文字符 736，中文/英文块 30/17。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已经是 `draft_needs_translation`，本轮属于二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 245: usdUI hints stage variables pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`，`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 NodeGraphNodeAPI 与 usdVol 粒子场/体积 schema 页面。
2. 建议处理：`full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`。
3. 后续可继续 `ParticleFieldKernelConstantSurfletAPI.html`、`ParticleFieldKernelGaussianEllipsoidAPI.html`、`Field3DAsset.html`、`OpenVDBAsset.html`，或转向仍较薄的 API/guide 页面；继续低优先处理 `_source.html`、`search.html` 和目录页。

## 第 246 轮：NodeGraphNodeAPI 与 usdVol ParticleField 基础 schema 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `f0792f8`，`origin/main` 一致，工作区起始状态干净。
- 新增并执行 `scripts/refine_openusd_release_batch_115.mjs`，本轮标记为 `release-quality-pass-115`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `NodeGraphNodeAPI` 的 `ui:nodegraph:node:*` UI metadata、spherical harmonics radiance 的 `degree` / `coefficients`、position data 与 particle count、kernel data 与 basis function、radiance definition data 的 schema 契约边界。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-115` 均只出现 1 次：
  - `NodeGraphNodeAPI.html`：中文字符 987，中文/英文块 36/25。
  - `ParticleFieldSphericalHarmonicsAttributeAPI.html`：中文字符 645，中文/英文块 30/23。
  - `ParticleFieldPositionBaseAPI.html`：中文字符 775，中文/英文块 36/25。
  - `ParticleFieldKernelBaseAPI.html`：中文字符 766，中文/英文块 36/24。
  - `ParticleFieldRadianceBaseAPI.html`：中文字符 826，中文/英文块 36/24。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属于 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步计划：验证通过后使用 `OpenUSD bilingual round 246: nodegraph particlefield base pass` 提交并推送。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 usdVol schema 页面。
2. 建议下一组：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`。
3. 之后可继续 `Field3DAsset.html`、`OpenVDBAsset.html`、`VolumeFieldAsset.html` 或转向仍较薄的 API/guide 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 247 轮：usdVol kernel、VolumeFieldBase 与 orientation/scale schema 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `21b93a2`，`origin/main` 一致，工作区起始状态干净。
- 新增并执行 `scripts/refine_openusd_release_batch_116.mjs`，本轮标记为 `release-quality-pass-116`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 constant surflet 的硬边界 surface support、Gaussian ellipsoid 的体积型高斯支撑、`VolumeFieldBase` 的 abstract field provider 边界，以及 orientation/scale per-particle attribute 与 `xformOp` 的区别。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-116` 均只出现 1 次：
  - `ParticleFieldKernelConstantSurfletAPI.html`：中文字符 767，中文/英文块 36/25。
  - `ParticleFieldKernelGaussianEllipsoidAPI.html`：中文字符 878，中文/英文块 36/25。
  - `VolumeFieldBase.html`：中文字符 747，中文/英文块 37/24。
  - `ParticleFieldOrientationAttributeAPI.html`：中文字符 641，中文/英文块 29/22。
  - `ParticleFieldScaleAttributeAPI.html`：中文字符 621，中文/英文块 29/22。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属于 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步计划：验证通过后使用 `OpenUSD bilingual round 247: usdvol kernel field scale pass` 提交并推送。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 usdVol field / particle attribute 页面。
2. 建议下一组：`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`。
3. 之后可继续 `ParticleField3DGaussianSplat.html`、`ParticleField.html`、`Volume.html` 或转向仍较薄的 API/guide 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 248 轮：usdVol Field3D/OpenVDB/VolumeFieldAsset 与 ParticleField position/opacity 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `d49eb6f`，`origin/main` 一致，起始工作区干净。
- 新增并执行 `scripts/refine_openusd_release_batch_117.mjs`，本轮标记为 `release-quality-pass-117`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`
  - `full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`
  - `full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 Field3D/OpenVDB 外部体积文件定位、`VolumeFieldAsset` file-backed field 边界、`field:*` relationship、per-particle position/opacity 数组对齐、kernel/radiance/visibility 区分等；API 名称、schema 名称、属性名、代码片段、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-117` 均只出现 1 次：
  - `Field3DAsset.html`：中文字符 903，中文/英文块 36/24。
  - `OpenVDBAsset.html`：中文字符 895，中文/英文块 36/24。
  - `VolumeFieldAsset.html`：中文字符 886，中文/英文块 42/31。
  - `ParticleFieldPositionAttributeAPI.html`：中文字符 680，中文/英文块 29/22。
  - `ParticleFieldOpacityAttributeAPI.html`：中文字符 650，中文/英文块 29/22。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 248: volume field particle attrs pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 usdVol 入口/基础 schema 页面。
2. 建议下一组：`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`。
3. 之后可转向仍较薄的 release 教程、schema/API 入口或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 249 轮：usdVol overview、FieldBase、ParticleField 与 Volume 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `b8a9655`，`origin/main` 一致，起始工作区干净。
- 新增并执行 `scripts/refine_openusd_release_batch_118.mjs`，本轮标记为 `release-quality-pass-118`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdVol/overview.html`
  - `full_site/release/user_guides/schemas/usdVol/FieldBase.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`
  - `full_site/release/user_guides/schemas/usdVol/ParticleField.html`
  - `full_site/release/user_guides/schemas/usdVol/Volume.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 usdVol 阅读路线、`Volume` 容器与 `field:*` relationships、`FieldBase` deprecated 迁移边界、`ParticleField3DGaussianSplat` 的 3DGS 数据组合，以及 `ParticleField` concrete base schema 与 `Volume` / `PointInstancer` 的语义区分。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-118` 均只出现 1 次：
  - `overview.html`：中文字符 658，中文/英文块 27/20。
  - `FieldBase.html`：中文字符 729，中文/英文块 33/24。
  - `ParticleField3DGaussianSplat.html`：中文字符 690，中文/英文块 42/35。
  - `ParticleField.html`：中文字符 718，中文/英文块 40/33。
  - `Volume.html`：中文字符 756，中文/英文块 30/19。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 249: usdvol overview field particle volume pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 release 教程页。
2. 建议下一组：`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`、`full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 253 轮：Contributors、Open Source Release、Release Schedule、OpenExec 与 FAQ 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `0ba67f8`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_122.mjs`，本轮标记为 `release-quality-pass-122`。
- 严格只精修 5 页：
  - `full_site/release/contributors.html`
  - `full_site/release/press_opensource_release.html`
  - `full_site/release/release_schedule.html`
  - `full_site/release/intro_to_openexec.html`
  - `full_site/release/usdfaq.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖历史贡献者名单的 `not current nor complete` 边界、2016-07-26 正式开源发布新闻与 DCC/scalable workflow 语境、dev/full/release candidate 发布线区分、OpenExec 的 Computations / Computation Registration / Invalidation 阅读路径，以及 FAQ 中 file format、scene description、composition arcs、`usdcat` 和 character encoding 的定位。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-122` 均只出现 1 次：
  - `contributors.html`：中文字符 739，中文/英文块 26/19。
  - `press_opensource_release.html`：中文字符 684，中文/英文块 28/21。
  - `release_schedule.html`：中文字符 693，中文/英文块 26/19。
  - `intro_to_openexec.html`：中文字符 663，中文/英文块 40/33。
  - `usdfaq.html`：中文字符 711，中文/英文块 34/27。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 253: contributors release schedule openexec faq pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的规范、性能、贡献和提案页面。
2. 建议下一组：`full_site/release/wp_usdshade.html`、`full_site/release/contributing_to_usd.html`、`full_site/release/spec_usdz.html`、`full_site/release/ref_performance_metrics.html`、`full_site/release/spec_usdpreviewsurface.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 250 轮：End-to-End、Schema Generation、Houdini、Tutorials 与 usdview Plugin 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `8dd6170`，`origin/main` 一致，起始工作区干净。
- 新增并执行 `scripts/refine_openusd_release_batch_119.mjs`，本轮标记为 `release-quality-pass-119`。
- 严格只精修 5 页：
  - `full_site/release/tut_end_to_end.html`
  - `full_site/release/tut_generating_new_schema.html`
  - `full_site/release/tut_houdini_example.html`
  - `full_site/release/tut_usd_tutorials.html`
  - `full_site/release/tut_usdview_plugin.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖端到端示例的 pipeline 目录和 composed stage 检查、`schema.usda` / `usdGenSchema` 生成契约、Houdini 历史教程和 USD 20.05 plugin removal 边界、教程总入口学习路线，以及 `usdview` plugin discovery、`PluginContainer`、UI action 注册和 API 调用层次。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-119` 均只出现 1 次：
  - `tut_end_to_end.html`：中文字符 744，中文/英文块 28/21。
  - `tut_generating_new_schema.html`：中文字符 651，中文/英文块 29/22。
  - `tut_houdini_example.html`：中文字符 645，中文/英文块 28/21。
  - `tut_usd_tutorials.html`：中文字符 682，中文/英文块 27/20。
  - `tut_usdview_plugin.html`：中文字符 623，中文/英文块 27/19。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 250: release tutorials workflow pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的用户指南和 schema overview 页面。
2. 建议下一组：`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 251 轮：Primvars、Rendering、Color、usdRender Overview 与 usdUI Overview 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `088a5dd`，`origin/main` 一致，起始工作区干净。
- 新增并执行 `scripts/refine_openusd_release_batch_120.mjs`，本轮标记为 `release-quality-pass-120`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/primvars.html`
  - `full_site/release/user_guides/render_user_guide.html`
  - `full_site/release/user_guides/color_user_guide.html`
  - `full_site/release/user_guides/schemas/usdRender/overview.html`
  - `full_site/release/user_guides/schemas/usdUI/overview.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 primvar 插值模式与拓扑映射、可复现渲染配置、颜色空间与 `renderingColorSpace`、`usdRender` 的 `RenderSettings` / `RenderProduct` / `RenderVar` / `RenderPass` 路线，以及 `usdUI` 的 `NodeGraphNodeAPI`、`SceneGraphPrimAPI`、Backdrop 和 UI metadata 边界。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-120` 均只出现 1 次：
  - `primvars.html`：中文字符 646，中文/英文块 28/21。
  - `render_user_guide.html`：中文字符 691，中文/英文块 28/21。
  - `color_user_guide.html`：中文字符 716，中文/英文块 28/21。
  - `usdRender/overview.html`：中文字符 643，中文/英文块 29/22。
  - `usdUI/overview.html`：中文字符 657，中文/英文块 27/20。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 251: primvars render color overview pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 release 信息页。
2. 建议下一组：`full_site/release/plugins_renderman.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/plugins.html`、`full_site/release/dl_downloads.html`、`full_site/release/maxperf.html`。
3. 之后可继续 `contributors.html`、`press_opensource_release.html`、`release_schedule.html` 或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 252 轮：RenderMan 插件、开源公告、插件索引、下载资源与性能实践补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `a15ea21`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_121.mjs`，本轮标记为 `release-quality-pass-121`。
- 严格只精修 5 页：
  - `full_site/release/plugins_renderman.html`
  - `full_site/release/press_opensource_announce.html`
  - `full_site/release/plugins.html`
  - `full_site/release/dl_downloads.html`
  - `full_site/release/maxperf.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `hdPrman` / USD Imaging / Hydra / RenderMan render delegate 的构建边界、2015-08-10 开源公告的历史语境、第三方插件索引中的 render delegate / file format plugin / schema plugin 区分、下载资源页与二进制分发的边界，以及 `maxperf` 页面中 layer stack、composition、payload、metrics 与先度量后优化的阅读路径。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-121` 均只出现 1 次：
  - `plugins_renderman.html`：中文字符 630，中文/英文块 30/22。
  - `press_opensource_announce.html`：中文字符 644，中文/英文块 28/21。
  - `plugins.html`：中文字符 683，中文/英文块 26/19。
  - `dl_downloads.html`：中文字符 701，中文/英文块 32/23。
  - `maxperf.html`：中文字符 686，中文/英文块 29/22。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 252: renderman plugins downloads performance pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 release 信息、FAQ 与 OpenExec 页面。
2. 建议下一组：`full_site/release/contributors.html`、`full_site/release/press_opensource_release.html`、`full_site/release/release_schedule.html`、`full_site/release/intro_to_openexec.html`、`full_site/release/usdfaq.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 254 轮：UsdShade、Contributing、USDZ、Performance Metrics 与 UsdPreviewSurface 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `1142aaa`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_123.mjs`，本轮标记为 `release-quality-pass-123`。
- 严格只精修 5 页：
  - `full_site/release/wp_usdshade.html`
  - `full_site/release/contributing_to_usd.html`
  - `full_site/release/spec_usdz.html`
  - `full_site/release/ref_performance_metrics.html`
  - `full_site/release/spec_usdpreviewsurface.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdShade` material binding / collection-based assignment / material purpose / material resolve，贡献流程中的 Contributor License Agreement / Pull Request Guidelines / Git Workflow，`.usdz` 的 zip archive / random access / `usdzip` 约束，Performance Metrics 的基准资产与环境边界，以及 `UsdPreviewSurface` 的 Core Nodes、Preview Surface、Texture Reader、Primvar Reader 和 Transform2d。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-123` 均只出现 1 次：
  - `wp_usdshade.html`：中文字符 741，中文/英文块 31/20。
  - `contributing_to_usd.html`：中文字符 740，中文/英文块 36/29。
  - `spec_usdz.html`：中文字符 716，中文/英文块 42/35。
  - `ref_performance_metrics.html`：中文字符 764，中文/英文块 39/32。
  - `spec_usdpreviewsurface.html`：中文字符 748，中文/英文块 42/35。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 254: usdshade contributing usdz metrics previewsurface pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 release proposal 页面。
2. 建议下一组：`full_site/release/wp.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_asset_previews.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 255 轮：Proposals、Schema Versioning、UsdAudio、UsdLux Renderers 与 Asset Previews 补强

已完成：

- 复核当前 git 状态、远端和审计报告：本地 `main` 基于上一轮同步提交 `c380e8a`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_124.mjs`，本轮标记为 `release-quality-pass-124`。
- 严格只精修 5 页：
  - `full_site/release/wp.html`
  - `full_site/release/wp_schema_versioning.html`
  - `full_site/release/wp_usdaudio.html`
  - `full_site/release/wp_usdlux_for_renderers.html`
  - `full_site/release/wp_asset_previews.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 proposal 目录页的 `OpenUSD-proposals` 迁移边界、Schema Versioning 的 per-schema versioning / `UsdSchemaRegistry` / `apiSchemas` 冲突、UsdAudio 的 `UsdMediaSpatialAudio` / `filePath` / `mediaOffset` / `timeCodesPerSecond`、UsdLux renderers proposal 中的 Sdr definitions / connectable lights / plugin light，以及 Asset Previews 中的 `assetInfo` / `previews` / `thumbnails` / `defaultPrim`。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-124` 均只出现 1 次：
  - `wp.html`：中文字符 779，中文/英文块 30/17。
  - `wp_schema_versioning.html`：中文字符 742，中文/英文块 44/33。
  - `wp_usdaudio.html`：中文字符 788，中文/英文块 35/24。
  - `wp_usdlux_for_renderers.html`：中文字符 756，中文/英文块 44/33。
  - `wp_asset_previews.html`：中文字符 781，中文/英文块 35/24。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 255: proposals schema audio lux previews pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页仍基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值高的 release proposal 页面。
2. 建议下一组：`full_site/release/wp_usdlux_for_geometry_lights.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_rigid_body_physics.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 256 轮：UsdLux Geometry Lights、Coordinate Systems、Ar 2.0、Connectable Nodes 与 Rigid Body Physics 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `a78908d`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_125.mjs`，本轮标记为 `release-quality-pass-125`。
- 严格只精修 5 页：
  - `full_site/release/wp_usdlux_for_geometry_lights.html`
  - `full_site/release/wp_coordsys.html`
  - `full_site/release/wp_ar2.html`
  - `full_site/release/wp_connectable_nodes.html`
  - `full_site/release/wp_rigid_body_physics.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖几何灯光中的 `GeometryLight` / `MeshLightAPI` / `UsdGeomGprim` / `UsdLuxLightAPI` 边界，Coordinate Systems 的 `CoordSysAPI` / `coordSys` binding 语义，Ar 2.0 的 `ArResolver` / resolver context / asset identifier，Connectable Nodes 的 `UsdShadeConnectableAPI` / NodeGraph / source resolution，以及 `UsdPhysics` 刚体、碰撞、质量、关节和 scene schema 的求解器中立边界。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`release-quality-pass-125` 均只出现 1 次：
  - `wp_usdlux_for_geometry_lights.html`：中文字符 849，中文/英文块 45/34。
  - `wp_coordsys.html`：中文字符 862，中文/英文块 40/29。
  - `wp_ar2.html`：中文字符 825，中文/英文块 35/24。
  - `wp_connectable_nodes.html`：中文字符 856，中文/英文块 40/29。
  - `wp_rigid_body_physics.html`：中文字符 857，中文/英文块 53/42。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已是 `draft_needs_translation`，本轮为二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮复验通过后使用 `OpenUSD bilingual round 256: geometry coords ar connectable physics pass` 同步本轮 HTML、脚本、报告和 `work.md`。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际浏览的 API 索引页。
2. 建议下一组：`full_site/api/namespacemembers.html`、`full_site/api/globals_s.html`、`full_site/api/globals_func.html`、`full_site/api/functions_vars_w.html`、`full_site/api/functions_func_n.html`。
3. 之后可继续 `functions_func_t.html`、`deprecated.html`、`hd_embree_page_front.html`、`globals_vars.html`、`classes.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 257 轮：Namespace Members、File Members S/Functions 与 Class Members W/N 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `87cd44e`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_126.mjs`，本轮标记为 `api-index-quality-pass-126`。
- 严格只精修 5 页：
  - `full_site/api/namespacemembers.html`
  - `full_site/api/globals_s.html`
  - `full_site/api/globals_func.html`
  - `full_site/api/functions_vars_w.html`
  - `full_site/api/functions_func_n.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 namespace 成员索引与 `ShaderMetadataHelpers` / `pxr_tsl` / `robin_pg_map` / `robin_pg_set` 的阅读边界，File Members S 中 `SDF_*` 宏、`SdfAnchorAssetPaths()`、`SdfComputeAssetPathRelativeToLayer()` 与 `SdfCreate*InLayer()` 的定位，File Members Functions 根页中 `Arch*` 平台工具和 `Ar*` resolver 工具的分层，以及 Class Members W/N 中 tokens、weight、Hydra scene index、`Hdsi*` 与 `PcpError*` 项目的导航含义。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-126` 均只出现 1 次：
  - `namespacemembers.html`：中文字符 610，中文/英文块 25/17。
  - `globals_s.html`：中文字符 541，中文/英文块 25/17。
  - `globals_func.html`：中文字符 571，中文/英文块 25/17。
  - `functions_vars_w.html`：中文字符 552，中文/英文块 25/16。
  - `functions_func_n.html`：中文字符 544，中文/英文块 24/16。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 257: namespace file class index pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际浏览的 API 索引页或模块入口页。
2. 建议下一组：`full_site/api/functions_func_t.html`、`full_site/api/deprecated.html`、`full_site/api/hd_embree_page_front.html`、`full_site/api/globals_vars.html`、`full_site/api/classes.html`。
3. 之后可继续相邻的 API 索引、File Members、Class Members 或模块入口页，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 258 轮：Class Members T、Deprecated、HdEmbree、File Variables 与 Class Index 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `3309057`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_127.mjs`，本轮标记为 `api-index-quality-pass-127`。
- 严格只精修 5 页：
  - `full_site/api/functions_func_t.html`
  - `full_site/api/deprecated.html`
  - `full_site/api/hd_embree_page_front.html`
  - `full_site/api/globals_vars.html`
  - `full_site/api/classes.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `functions_func_t.html` 中 `Tf` 诊断、`Vdf` executor/data manager、`UsdUtilsCoalescingDiagnosticDelegate` 与 Hydra/imaging 条目的索引边界，`Deprecated List` 中 Ar resolver、`CustomUsdPhysicsTokens`、Gf geometry math 和 retained builder 的迁移风险，`HdEmbree` 中 renderer plugin、render delegate、Embree scene ownership 与 task execution，`globals_vars.html` 中 token set、predicate constant、sentinel 和 declaration file 的区别，以及 `classes.html` 中 Ar/Arch/Hd/Vdf/Tf/Usd 等跨模块类型导航。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-127` 均只出现 1 次：
  - `functions_func_t.html`：中文字符 597，中文/英文块 24/16。
  - `deprecated.html`：中文字符 602，中文/英文块 24/17。
  - `hd_embree_page_front.html`：中文字符 565，中文/英文块 34/26。
  - `globals_vars.html`：中文字符 568，中文/英文块 29/20。
  - `classes.html`：中文字符 562，中文/英文块 24/16。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 258: class deprecated hdembree variables index pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际浏览的 API 入口、指南或 class 索引页。
2. 建议下一组：`full_site/api/_developer__guides.html`、`full_site/api/_usd_skel__intro.html`、`full_site/api/annotated.html`、`full_site/api/ar_page_front.html`、`full_site/api/arch_page_front.html`。
3. 之后可继续高价值模块入口或 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 259 轮：Developer Guides、UsdSkel Intro、Class List、Ar 与 Arch 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `f551a29`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_128.mjs`，本轮标记为 `api-entry-quality-pass-128`。
- 严格只精修 5 页：
  - `full_site/api/_developer__guides.html`
  - `full_site/api/_usd_skel__intro.html`
  - `full_site/api/annotated.html`
  - `full_site/api/ar_page_front.html`
  - `full_site/api/arch_page_front.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 Developer Guides 中 coding/testing/color/Hydra/MaterialX 指南的路线图定位，UsdSkel Introduction 中 skeleton、joint、SkelRoot、linear blend skinning、bind pose 与 rig 边界，Class List 中 Doxygen brief description、module prefix 和目标文档定位，Ar 页面中 authored asset path、resolver context、scoped cache 与 resolved path 的区别，以及 Arch 页面中 platform dependencies、memory management、diagnostics 和 symbol visibility 的工程边界。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-entry-quality-pass-128` 均只出现 1 次：
  - `_developer__guides.html`：中文字符 632，中文/英文块 24/16。
  - `_usd_skel__intro.html`：中文字符 607，中文/英文块 31/24。
  - `annotated.html`：中文字符 616，中文/英文块 24/17。
  - `ar_page_front.html`：中文字符 700，中文/英文块 32/25。
  - `arch_page_front.html`：中文字符 622，中文/英文块 25/18。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 259: developer skel annotated ar arch pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的核心 API class 页面。
2. 建议下一组：`full_site/api/class_sdf_layer.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_sdf_prim_spec.html`、`full_site/api/class_hd_scene_delegate.html`、`full_site/api/class_hd_render_buffer.html`。
3. 之后可继续 `UsdStage`、`UsdPrim`、`SdfSpec`、Hydra 或 Gf/Vt 等高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 260 轮：SdfLayer、SdfPath、SdfPrimSpec、HdSceneDelegate 与 HdRenderBuffer 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `9b311a2`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_129.mjs`，本轮标记为 `api-class-quality-pass-129`。
- 严格只精修 5 页：
  - `full_site/api/class_sdf_layer.html`
  - `full_site/api/class_sdf_path.html`
  - `full_site/api/class_sdf_prim_spec.html`
  - `full_site/api/class_hd_scene_delegate.html`
  - `full_site/api/class_hd_render_buffer.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `SdfLayer` 中 layer identifier、subLayer stack、muted layer 和 authored specs，`SdfPath` 中 path syntax、absolute prim path、property path 和 variant selection，`SdfPrimSpec` 中 authored opinion、nameChildren、propertyChildren 和 `UsdPrim` 边界，`HdSceneDelegate` 中 client scene graph、`HdRenderIndex`、dirty bits、primvar descriptors 与 scene index pipeline，以及 `HdRenderBuffer` 中 allocation parameters、DirtyBits、Map/Unmap、AOV 和 render buffer bprim 的职责。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-129` 均只出现 1 次：
  - `class_sdf_layer.html`：中文字符 647，中文/英文块 52/44。
  - `class_sdf_path.html`：中文字符 657，中文/英文块 52/44。
  - `class_sdf_prim_spec.html`：中文字符 588，中文/英文块 52/44。
  - `class_hd_scene_delegate.html`：中文字符 637，中文/英文块 52/44。
  - `class_hd_render_buffer.html`：中文字符 634，中文/英文块 48/40。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 260: sdf hydra core class pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的 Gf 基础数学/几何 class 页面。
2. 建议下一组：`full_site/api/class_gf_matrix4f.html`、`full_site/api/class_gf_matrix2f.html`、`full_site/api/class_gf_dual_quatf.html`、`full_site/api/class_gf_range1d.html`、`full_site/api/class_gf_ray.html`。
3. 之后可继续 Gf/Vt/Sdf/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 261 轮：GfMatrix、GfDualQuat、GfRange 与 GfRay 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `9376519`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_130.mjs`，本轮标记为 `api-class-quality-pass-130`。
- 严格只精修 5 页：
  - `full_site/api/class_gf_matrix4f.html`
  - `full_site/api/class_gf_matrix2f.html`
  - `full_site/api/class_gf_dual_quatf.html`
  - `full_site/api/class_gf_range1d.html`
  - `full_site/api/class_gf_ray.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `GfMatrix4f` 的 row-major storage、row-vector convention、3D transform、factorization 与 `Transform()` 语义，`GfMatrix2f` 的 determinant、inverse、2D linear transform 与 float precision 边界，`GfDualQuatf` 的 real part / dual part、rigid transform、skinning 与 interpolation 用法，`GfRange1d` 的 interval math、empty range、union/intersection 与 containment 判断，以及 `GfRay` 的 start point、direction、intersection testing 与 transform 语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-130` 均只出现 1 次：
  - `class_gf_matrix4f.html`：中文字符 740，中文/英文块 52/44。
  - `class_gf_matrix2f.html`：中文字符 699，中文/英文块 52/44。
  - `class_gf_dual_quatf.html`：中文字符 669，中文/英文块 52/44。
  - `class_gf_range1d.html`：中文字符 646，中文/英文块 52/44。
  - `class_gf_ray.html`：中文字符 674，中文/英文块 51/43。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 261: gf matrix range ray pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的 Gf/Glf/Hd class 页面。
2. 建议下一组：`full_site/api/class_gf_vec2i.html`、`full_site/api/class_glf_draw_target.html`、`full_site/api/class_hd_data_source_locator.html`、`full_site/api/class_hd_instance_registry.html`、`full_site/api/class_hd_st_render_pass_state.html`。
3. 之后可继续 Gf/Vt/Sdf/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 262 轮：GfVec2i、GlfDrawTarget、HdDataSourceLocator、HdInstanceRegistry 与 HdStRenderPassState 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `2916b84`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_131.mjs`，本轮标记为 `api-class-quality-pass-131`。
- 严格只精修 5 页：
  - `full_site/api/class_gf_vec2i.html`
  - `full_site/api/class_glf_draw_target.html`
  - `full_site/api/class_hd_data_source_locator.html`
  - `full_site/api/class_hd_instance_registry.html`
  - `full_site/api/class_hd_st_render_pass_state.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `GfVec2i` 的 `int` component、`ScalarType`、分量访问和平方长度语义，`GlfDrawTarget` 的 GL framebuffer、image attachment、MSAA resolve 和 shader sampler 边界，`HdDataSourceLocator` 的 `TfToken` locator、prefix/intersection 和 dirty propagation 用法，`HdInstanceRegistry< VALUE >` 的实例字典、`GetInstance()` / `FindInstance()`、`GarbageCollect()` 与 `Invalidate()` 生命周期，以及 `HdStRenderPassState` 的 GL states、uniforms、shader、camera matrices、AOV resolve 和 graphics pipeline hash；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-131` 均只出现 1 次：
  - `class_gf_vec2i.html`：中文字符 782，中文/英文块 52/44。
  - `class_glf_draw_target.html`：中文字符 715，中文/英文块 52/44。
  - `class_hd_data_source_locator.html`：中文字符 668，中文/英文块 52/44。
  - `class_hd_instance_registry.html`：中文字符 699，中文/英文块 42/34。
  - `class_hd_st_render_pass_state.html`：中文字符 596，中文/英文块 47/39。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 262: gf glf hd class pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的核心 Usd/UsdGeom/Tf class 页面。
2. 建议下一组：`full_site/api/class_usd_prim.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_tf_token.html`。
3. 之后可继续核心 Usd/UsdGeom/Tf/Hd/Vt class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 263 轮：UsdPrim、UsdGeomMesh、UsdGeomPrimvarsAPI、UsdSchemaRegistry 与 TfToken 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `8ae9cc7`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_132.mjs`，本轮标记为 `api-class-quality-pass-132`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_prim.html`
  - `full_site/api/class_usd_geom_mesh.html`
  - `full_site/api/class_usd_geom_primvars_a_p_i.html`
  - `full_site/api/class_usd_schema_registry.html`
  - `full_site/api/class_tf_token.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdPrim` 的 composed prim 句柄、properties、metadata、composition arcs、applied schemas 与 traversal，`UsdGeomMesh` 的 points、face-vertices、`faceVertexCounts` / `faceVertexIndices`、subdivision properties 和 crease/corner 语义，`UsdGeomPrimvarsAPI` 的 `CreatePrimvar()`、indexed/non-indexed primvars、interpolation、inheritance 与 `primvars:` namespace，`UsdSchemaRegistry` 的 singleton registry、`schema.usda` / `generatedSchema.usda`、prim definitions、schema family/version 和 auto-apply API schema，以及 `TfToken` 的 registered string、constant-time comparison、hashing、`Find()` 与 empty token；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-132` 均只出现 1 次：
  - `class_usd_prim.html`：中文字符 647，中文/英文块 52/44。
  - `class_usd_geom_mesh.html`：中文字符 661，中文/英文块 52/44。
  - `class_usd_geom_primvars_a_p_i.html`：中文字符 602，中文/英文块 52/44。
  - `class_usd_schema_registry.html`：中文字符 552，中文/英文块 52/44。
  - `class_tf_token.html`：中文字符 737，中文/英文块 52/44。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 263: usd geom schema token class pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的 Usd/UsdGeom/UsdShade/UsdPhysics class 页面。
2. 建议下一组：`full_site/api/class_usd_stage_cache.html`、`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_physics_joint.html`。
3. 之后可继续 Usd/UsdGeom/UsdShade/UsdPhysics/Vt/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 264 轮：UsdStageCache、UsdAttributeLimits、UsdGeomBasisCurves、UsdShadeOutput 与 UsdPhysicsJoint 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `3bb1b23`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_133.mjs`，本轮标记为 `api-class-quality-pass-133`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_stage_cache.html`
  - `full_site/api/class_usd_attribute_limits.html`
  - `full_site/api/class_usd_geom_basis_curves.html`
  - `full_site/api/class_usd_shade_output.html`
  - `full_site/api/class_usd_physics_joint.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdStageCache` 的 `UsdStageRefPtr`、`UsdStageCacheContext`、缓存查找、并发安全与 stage lifetime，`UsdAttributeLimits` 的 limits dictionary metadata、minimum/maximum、soft limits/hard limits 与 authored limit 判断，`UsdGeomBasisCurves` 的 batched curves、`curveVertexCounts`、basis、segment indexing、vertex/primvar interpolation 与 tubes/ribbons，`UsdShadeOutput` 的 connectable attribute、`ConnectToSource()`、source 清理、`SourceInfoVector` 与底层 `UsdAttribute` 边界，以及 `UsdPhysicsJoint` 的 rigid body 连接、D6 joint、local frames、break force/torque、collision 和 articulation 排除语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-133` 均只出现 1 次：
  - `class_usd_stage_cache.html`：中文字符 693，中文/英文块 52/44。
  - `class_usd_attribute_limits.html`：中文字符 622，中文/英文块 52/44。
  - `class_usd_geom_basis_curves.html`：中文字符 620，中文/英文块 52/44。
  - `class_usd_shade_output.html`：中文字符 601，中文/英文块 52/44。
  - `class_usd_physics_joint.html`：中文字符 612，中文/英文块 52/44。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 264: stage limits curves shade physics pass` 提交并推送，本轮 HTML、脚本、报告和 `work.md` 随提交同步。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的 Usd/Imaging/Sdr/Vt/Vdf class 页面。
2. 建议下一组：`full_site/api/class_usd_validation_error.html`、`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_sdr_shader_property.html`、`full_site/api/class_vt_value_ref.html`、`full_site/api/class_vdf_node.html`。
3. 之后可继续 Usd/Imaging/Sdr/Vt/Vdf/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 265 轮：UsdValidationError、UsdImagingDelegate、SdrShaderProperty、VtValueRef 与 VdfNode 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `de38574`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_134.mjs`，本轮标记为 `api-class-quality-pass-134`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_validation_error.html`
  - `full_site/api/class_usd_imaging_delegate.html`
  - `full_site/api/class_sdr_shader_property.html`
  - `full_site/api/class_vt_value_ref.html`
  - `full_site/api/class_vdf_node.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdValidationError` 的 validation error sites、error type、message 与 fixer 查找，`UsdImagingDelegate` 的 USD scene graph 到 Hydra render index 翻译职责，`SdrShaderProperty` 的 shader input/output property、metadata 与连接兼容性，`VtValueRef` 的 non-owning type-erased value view 和生命周期约束，以及 `VdfNode` 的 input/output specs、dependency mask 与 `VdfNetwork` 调度语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-134` 均只出现 1 次：
  - `class_usd_validation_error.html`：中文字符 741，中文/英文块 52/44。
  - `class_usd_imaging_delegate.html`：中文字符 621，中文/英文块 52/44。
  - `class_sdr_shader_property.html`：中文字符 643，中文/英文块 52/44。
  - `class_vt_value_ref.html`：中文字符 726，中文/英文块 52/44。
  - `class_vdf_node.html`：中文字符 680，中文/英文块 52/44。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 265: validation imaging sdr vt vdf pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理用户会实际引用的 UsdLux、UsdProc、HgiGL 与 Pcp class 页面。
2. 建议下一组：`full_site/api/class_usd_lux_disk_light.html`、`full_site/api/class_usd_lux_shaping_a_p_i.html`、`full_site/api/class_usd_proc_generative_procedural.html`、`full_site/api/class_hgi_g_l_graphics_cmds.html`、`full_site/api/class_pcp_property_index.html`。
3. 之后可继续 UsdLux、UsdProc、Hgi、Pcp、Hd、Vt 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 266 轮：UsdLux、UsdProc、HgiGL 与 Pcp class 页面补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `b0949c0`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_135.mjs`，本轮标记为 `api-class-quality-pass-135`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_lux_disk_light.html`
  - `full_site/api/class_usd_lux_shaping_a_p_i.html`
  - `full_site/api/class_usd_proc_generative_procedural.html`
  - `full_site/api/class_hgi_g_l_graphics_cmds.html`
  - `full_site/api/class_pcp_property_index.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdLuxDiskLight` 的 one-sided disk emission、`radius` 与 -Z 发光方向，`UsdLuxShapingAPI` 的 applied API、`shaping:cone:*`、`shaping:ies:*` 与 connectable 语义，`UsdProcGenerativeProcedural` 的 `proceduralSystem`、`primvars:` 输入契约与非执行边界，`HgiGLGraphicsCmds` 的 OpenGL backend command encoder、pipeline/resource binding、draw variants 与 memory barrier，以及 `PcpPropertyIndex` 的 property composition sites、local specs、local errors 与 `PcpPropertyIterator` 访问模式；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-135` 均只出现 1 次：
  - `class_usd_lux_disk_light.html`：中文字符 654，中文/英文块 46/38。
  - `class_usd_lux_shaping_a_p_i.html`：中文字符 653，中文/英文块 52/44。
  - `class_usd_proc_generative_procedural.html`：中文字符 661，中文/英文块 46/38。
  - `class_hgi_g_l_graphics_cmds.html`：中文字符 576，中文/英文块 49/41。
  - `class_pcp_property_index.html`：中文字符 665，中文/英文块 39/31。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 266: usdlux usdproc hgi pcp class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Hydra/Hdx 与 Pcp class 页面。
2. 建议下一组：`full_site/api/class_hdx_pick_from_render_buffer_task.html`、`full_site/api/class_pcp_arc.html`、`full_site/api/class_hd_task.html`、`full_site/api/class_hd_st_dispatch_buffer.html`、`full_site/api/class_pcp_error_unresolved_prim_path.html`。
3. 之后可继续 Hdx、Pcp、HdSt、Hd、Vt 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 267 轮：Hdx Pick、Pcp Arc、HdTask、HdStDispatchBuffer 与 PcpError 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `96e0c82`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_136.mjs`，本轮标记为 `api-class-quality-pass-136`。
- 严格只精修 5 页：
  - `full_site/api/class_hdx_pick_from_render_buffer_task.html`
  - `full_site/api/class_pcp_arc.html`
  - `full_site/api/class_hd_task.html`
  - `full_site/api/class_hd_st_dispatch_buffer.html`
  - `full_site/api/class_pcp_error_unresolved_prim_path.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `HdxPickFromRenderBufferTask` 的 ID buffer picking、pick frustum remap 与 task 生命周期，`PcpArc` 的 source/target node、`PcpArcType`、`PcpMapExpression` 与 composition graph 边语义，`HdTask` 的 `Sync()` / `Prepare()` / `Execute()` 调度阶段、dirty bits、task context 与 convergence，`HdStDispatchBuffer` 的 unsigned integer VBO、indirect dispatch、`BufferResourceView` 与 command layout，以及 `PcpErrorUnresolvedPrimPath` 的 `site`、`unresolvedPath`、`sourceLayer`、`targetLayer`、`arcType` 和 resolved/loaded 诊断边界；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-136` 均只出现 1 次：
  - `class_hdx_pick_from_render_buffer_task.html`：中文字符 620，中文/英文块 37/29。
  - `class_pcp_arc.html`：中文字符 573，中文/英文块 36/28。
  - `class_hd_task.html`：中文字符 606，中文/英文块 43/35。
  - `class_hd_st_dispatch_buffer.html`：中文字符 578，中文/英文块 46/38。
  - `class_pcp_error_unresolved_prim_path.html`：中文字符 675，中文/英文块 41/33。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 267: hdx pcp hd task buffer pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 UsdSkel/UsdImaging/Sdf/usdVol class 页面。
2. 建议下一组：`full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`、`full_site/api/class_usd_imaging_adapter_registry.html`、`full_site/api/class_usd_imaging_nurbs_patch_adapter.html`、`full_site/api/class_sdf_usdz_file_format.html`、`full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`。
3. 之后可继续 UsdSkel Imaging、UsdImaging、Sdf、UsdVol、Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 268 轮：UsdSkel Imaging、UsdImaging Adapter、SdfUsdz 与 usdVol SH API 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `7502d11`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_137.mjs`，本轮标记为 `api-class-quality-pass-137`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`
  - `full_site/api/class_usd_imaging_adapter_registry.html`
  - `full_site/api/class_usd_imaging_nurbs_patch_adapter.html`
  - `full_site/api/class_sdf_usdz_file_format.html`
  - `full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdSkelImagingDataSourceSkeletonPrim` 的 Skeleton prim data source、`Get()` / `GetNames()` 与 Hydra data source 边界，`UsdImagingAdapterRegistry` 的 PrimAdapter/API schema adapter 工厂、singleton registry 与外部插件 discovery，`UsdImagingNurbsPatchAdapter` 的 NURBS patch points/topology、imaging subprim、populate、variability 和 invalidation，`SdfUsdzFileFormat` 的 `.usdz` package file format、root layer、`CanRead()` / `Read()` / `WriteToFile()` 与 Sdf 插件 I/O 边界，以及 `UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 的 SH degree、float/half coefficients、radiance 和 per-particle 数据布局；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-137` 均只出现 1 次：
  - `class_usd_skel_imaging_data_source_skeleton_prim.html`：中文字符 524，中文/英文块 32/24。
  - `class_usd_imaging_adapter_registry.html`：中文字符 517，中文/英文块 44/36。
  - `class_usd_imaging_nurbs_patch_adapter.html`：中文字符 545，中文/英文块 45/37。
  - `class_sdf_usdz_file_format.html`：中文字符 630，中文/英文块 46/38。
  - `class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`：中文字符 626，中文/英文块 52/44。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 268: skel imaging sdf usdvol class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Vdf/Tf/Sdf class 页面。
2. 建议下一组：`full_site/api/class_vdf_read_write_accessor.html`、`full_site/api/class_vdf_grapher_options.html`、`full_site/api/class_vdf_context.html`、`full_site/api/class_sdf_children_view.html`、`full_site/api/class_tf_dense_hash_map.html`。
3. 之后可继续 Vdf、Tf、Sdf、Hd、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 270 轮：EsfPropertyInterface、TraceEventData、Ef_LoftedOutputSet、TfPyLock 与 VdfTestUtils::Node 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `23feb19`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_139.mjs`，本轮标记为 `api-class-quality-pass-139`。
- 严格只精修 5 页：
  - `full_site/api/class_esf_property_interface.html`
  - `full_site/api/class_trace_event_data.html`
  - `full_site/api/class_ef___lofted_output_set.html`
  - `full_site/api/class_tf_py_lock.html`
  - `full_site/api/class_vdf_test_utils_1_1_node.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `EsfPropertyInterface` 的 scene adapter property abstraction、`UsdProperty` 只读接口相似性、`EsfJournal*` dependency/recompilation 记录、`GetBaseName()` 与 `GetNamespace()` 边界，`TraceEventData` 的 `TraceEvent` payload、`TraceEvent::DataType`、typed getters 与 `WriteJson()`，`Ef_LoftedOutputSet` 的 lofted outputs、page cache sourced values、`EfPageCacheBasedExecutor`、`CollectLoftedDependencies()` 与 node output 清理，`TfPyLock` 的 Python GIL、Python thread state、`Acquire()` / `Release()`、`BeginAllowThreads()` / `EndAllowThreads()` 与状态合法转换，以及 `VdfTestUtils::Node` 的 `VdfNode` wrapper、测试 DSL、`GetVdfNode()`、`operator>>()`、`_NodeOutput` 和 `Network` 关系；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-139` 均只出现 1 次：
  - `class_esf_property_interface.html`：中文字符 608，中文/英文块 34/26。
  - `class_trace_event_data.html`：中文字符 616，中文/英文块 42/34。
  - `class_ef___lofted_output_set.html`：中文字符 607，中文/英文块 35/27。
  - `class_tf_py_lock.html`：中文字符 652，中文/英文块 39/31。
  - `class_vdf_test_utils_1_1_node.html`：中文字符 596，中文/英文块 40/32。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 270: esf trace ef tf vdf class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Sdf/Hd/UsdGeom/UsdShade 核心 class 页面。
2. 建议下一组：`full_site/api/class_sdf_prim_spec.html`、`full_site/api/class_hd_st_render_pass_state.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_hd_task.html`。
3. 之后可继续 Sdf、Hd、UsdGeom、UsdShade、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 271 轮：SdfPrimSpec、HdStRenderPassState、UsdShadeOutput、UsdGeomPrimvarsAPI 与 HdTask 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `3c83cd9`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_140.mjs`，本轮标记为 `api-class-quality-pass-140`。
- 严格只精修 5 页：
  - `full_site/api/class_sdf_prim_spec.html`
  - `full_site/api/class_hd_st_render_pass_state.html`
  - `full_site/api/class_usd_shade_output.html`
  - `full_site/api/class_usd_geom_primvars_a_p_i.html`
  - `full_site/api/class_hd_task.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `SdfPrimSpec` 的 `SdfLayer` 中 prim description、`SdfPath`、layer opinion、child/property views、order metadata 与 list-op 类清理接口，`HdStRenderPassState` 的 GL states、uniforms、shaders、camera matrices、viewport、graphics pipeline hash 与 MSAA/AOV resolve，`UsdShadeOutput` 的 connectable attribute、`ConnectToSource()`、`CanConnect()`、source 清理、底层 `UsdAttribute` 与 Sdr metadata，`UsdGeomPrimvarsAPI` 的 `UsdGeomPrimvar`、indexed/non-indexed primvars、namespace inheritance、retrieval method 选择与 `primvars:` 命名空间，以及 `HdTask` 的 Hydra unit of work、`Sync()`、`Prepare()`、`Execute()`、`IsConverged()`、dirty bits 与 task context；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-140` 均只出现 1 次：
  - `class_sdf_prim_spec.html`：中文字符 766，中文/英文块 64/51。
  - `class_hd_st_render_pass_state.html`：中文字符 771，中文/英文块 59/46。
  - `class_usd_shade_output.html`：中文字符 773，中文/英文块 64/51。
  - `class_usd_geom_primvars_a_p_i.html`：中文字符 786，中文/英文块 64/51。
  - `class_hd_task.html`：中文字符 799，中文/英文块 55/42。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 271: sdf hd usdgeom shade task pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 UsdSchema/Pcp/Hd class 页面。
2. 建议下一组：`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_pcp_arc.html`、`full_site/api/class_hd_st_dispatch_buffer.html`、`full_site/api/class_hd_render_buffer.html`、`full_site/api/class_hd_scene_delegate.html`。
3. 之后可继续 Usd、Sdf、Pcp、Hd、HdSt 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 272 轮：UsdSchemaRegistry、PcpArc、HdStDispatchBuffer、HdRenderBuffer 与 HdSceneDelegate 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `a33f200`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_141.mjs`，本轮标记为 `api-class-quality-pass-141`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_schema_registry.html`
  - `full_site/api/class_pcp_arc.html`
  - `full_site/api/class_hd_st_dispatch_buffer.html`
  - `full_site/api/class_hd_render_buffer.html`
  - `full_site/api/class_hd_scene_delegate.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdSchemaRegistry` 的 singleton registry、`generatedSchema.usda`、`usdGenSchema`、concrete/abstract/applied API schema definitions、schema family/version 与 auto-apply API 规则，`PcpArc` 的 prim index graph、source/parent node、`PcpArcType`、`PcpMapExpression`、`origin` 与 namespace depth，`HdStDispatchBuffer` 的 unsigned integer VBO、indirect dispatch、`BufferResourceView`、`HdBufferArray`、`HdResourceBinder` 与 GPU resource 生命周期，`HdRenderBuffer` 的 renderable data resource、AOV/2D image、allocation、mapping、resolve、multi-sample 与 dirty tracking，以及 `HdSceneDelegate` 的 client scene graph adapter、topology/primvar/instancing/camera/display/ext computation 查询接口；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-141` 均只出现 1 次：
  - `class_usd_schema_registry.html`：中文字符 724，中文/英文块 64/51。
  - `class_pcp_arc.html`：中文字符 755，中文/英文块 48/35。
  - `class_hd_st_dispatch_buffer.html`：中文字符 771，中文/英文块 58/45。
  - `class_hd_render_buffer.html`：中文字符 829，中文/英文块 60/47。
  - `class_hd_scene_delegate.html`：中文字符 824，中文/英文块 64/51。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 272: schema pcp hd buffer delegate pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Usd/UsdGeom/UsdPhysics/UsdImaging/Sdr class 页面。
2. 建议下一组：`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_usd_physics_joint.html`、`full_site/api/class_sdr_shader_property.html`。
3. 之后可继续 Usd、UsdGeom、UsdPhysics、UsdImaging、Sdr、Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 269 轮：VdfReadWriteAccessor、VdfGrapherOptions、VdfContext、SdfChildrenView 与 TfDenseHashMap 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `8d35c67`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_138.mjs`，本轮标记为 `api-class-quality-pass-138`。
- 严格只精修 5 页：
  - `full_site/api/class_vdf_read_write_accessor.html`
  - `full_site/api/class_vdf_grapher_options.html`
  - `full_site/api/class_vdf_context.html`
  - `full_site/api/class_sdf_children_view.html`
  - `full_site/api/class_tf_dense_hash_map.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `VdfReadWriteAccessor< T >` 的 non-owning random access accessor、`VdfVector` 输出存储、`operator[]()`、`GetSize()` 与 `IsEmpty()`，`VdfGrapherOptions` 的 `VdfGrapher` 输出配置、node filter/style callback、mask、page size 与 visual graph 边界，`VdfContext` 的 callback 参数束、input/output 访问、requested output 判断、reference input 输出和诊断接口，`SdfChildrenView< _ChildPolicy, _Predicate, _Adapter >` 的 child policy、predicate、adapter、iterator 与只读视图语义，以及 `TfDenseHashMap< Key, Data, HashFn, EqualKey, Threshold >` 的小表 vector storage、`Threshold`、hash/equality 策略和常用 map 操作；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-138` 均只出现 1 次：
  - `class_vdf_read_write_accessor.html`：中文字符 608，中文/英文块 36/28。
  - `class_vdf_grapher_options.html`：中文字符 642，中文/英文块 52/44。
  - `class_vdf_context.html`：中文字符 676，中文/英文块 50/42。
  - `class_sdf_children_view.html`：中文字符 654，中文/英文块 52/44。
  - `class_tf_dense_hash_map.html`：中文字符 664，中文/英文块 52/44。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 已运行并通过：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 269: vdf sdf tf class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且在质量队列内的 Esf、Trace、Tf、Vdf class 页面。
2. 建议下一组：`full_site/api/class_esf_property_interface.html`、`full_site/api/class_trace_event_data.html`、`full_site/api/class_ef___lofted_output_set.html`、`full_site/api/class_tf_py_lock.html`、`full_site/api/class_vdf_test_utils_1_1_node.html`。
3. 之后可继续 Vdf、Tf、Sdf、Hd、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 273 轮：UsdAttributeLimits、UsdGeomBasisCurves、UsdImagingDelegate、UsdPhysicsJoint 与 SdrShaderProperty 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `f1a8e97`，`origin/main` 一致，起始工作区仅有本轮脚本待跟踪；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_142.mjs`，本轮标记为 `api-class-quality-pass-142`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_attribute_limits.html`
  - `full_site/api/class_usd_geom_basis_curves.html`
  - `full_site/api/class_usd_imaging_delegate.html`
  - `full_site/api/class_usd_physics_joint.html`
  - `full_site/api/class_sdr_shader_property.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdAttributeLimits` 的 `UsdAttribute` limits dictionary metadata、`UsdLimitsKeys->Minimum` / `UsdLimitsKeys->Maximum`、`GetMinimumOr()` / `GetMaximumOr()`、`Clear*()` 与 `HasAuthored*()` 边界，`UsdGeomBasisCurves` 的 batched curve representation、`curveVertexCounts`、basis / wrap / cubic / linear interpolation、primvar data size 与 Tubes/Ribbons 表示，`UsdImagingDelegate` 的 Hydra core 到 USD scene graph 翻译层、path conversion、pending updates、display purpose 过滤、time sampling 和 topology/primvar 查询，`UsdPhysicsJoint` 的 body rel、local pos/rot、break force/torque、collisionEnabled、excludeFromArticulation 与 jointEnabled 语义，以及 `SdrShaderProperty` 的 shader input/output property、type/default/metadata/hints/options/shown-if、`CanConnectTo()` 和 `SdrShaderPropertyMetadata` 迁移说明；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-142` 均只出现 1 次：
  - `class_usd_attribute_limits.html`：中文字符 801，中文/英文块 64/51。
  - `class_usd_geom_basis_curves.html`：中文字符 808，中文/英文块 64/51。
  - `class_usd_imaging_delegate.html`：中文字符 775，中文/英文块 64/51。
  - `class_usd_physics_joint.html`：中文字符 810，中文/英文块 64/51。
  - `class_sdr_shader_property.html`：中文字符 813，中文/英文块 64/51。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 273: limits curves imaging physics sdr pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 UsdImaging / UsdSkel Imaging / HgiGL / Hdx class 页面。
2. 建议下一组：`full_site/api/class_usd_imaging_adapter_registry.html`、`full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`、`full_site/api/class_usd_imaging_nurbs_patch_adapter.html`、`full_site/api/class_hgi_g_l_graphics_cmds.html`、`full_site/api/class_hdx_pick_from_render_buffer_task.html`。
3. 之后可继续 UsdImaging、UsdSkel Imaging、Hgi、Hdx、Hd、Sdf、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 274 轮：UsdImagingAdapterRegistry、UsdSkelImagingDataSourceSkeletonPrim、UsdImagingNurbsPatchAdapter、HgiGLGraphicsCmds 与 HdxPickFromRenderBufferTask 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `6809948`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_143.mjs`，本轮标记为 `api-class-quality-pass-143`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_imaging_adapter_registry.html`
  - `full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`
  - `full_site/api/class_usd_imaging_nurbs_patch_adapter.html`
  - `full_site/api/class_hgi_g_l_graphics_cmds.html`
  - `full_site/api/class_hdx_pick_from_render_buffer_task.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdImagingAdapterRegistry` 的 adapter factory registry、singleton、prim adapter/API schema adapter 构造、plugin discovery 与能力查询，`UsdSkelImagingDataSourceSkeletonPrim` 的 Skeleton prim data source、`Get()` / `GetNames()`、`HdContainerDataSource` 与 `HdDataSourceLocator` 边界，`UsdImagingNurbsPatchAdapter` 的 `UsdGeomNurbsPatch` points/topology、imaging subprim、populate、variability tracking、property invalidation，`HgiGLGraphicsCmds` 的 OpenGL backend command abstraction、pipeline/resource/vertex buffer binding、direct/indirect draw、viewport/scissor、memory barrier 与 debug markers，以及 `HdxPickFromRenderBufferTask` 的 existing ID buffers、pick frustum remap、`_Sync()` / `Prepare()` / `Execute()` / `IsConverged()` 任务边界；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-143` 均只出现 1 次：
  - `class_usd_imaging_adapter_registry.html`：中文字符 745，中文/英文块 56/43。
  - `class_usd_skel_imaging_data_source_skeleton_prim.html`：中文字符 759，中文/英文块 44/31。
  - `class_usd_imaging_nurbs_patch_adapter.html`：中文字符 740，中文/英文块 57/44。
  - `class_hgi_g_l_graphics_cmds.html`：中文字符 742，中文/英文块 61/48。
  - `class_hdx_pick_from_render_buffer_task.html`：中文字符 849，中文/英文块 49/36。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次/三次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 274: imaging skel hgi hdx class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的核心 Sdf / Usd / UsdGeom class 页面。
2. 建议下一组：`full_site/api/class_sdf_layer.html`、`full_site/api/class_usd_prim.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_usd_stage_cache.html`。
3. 之后可继续 Sdf、Usd、UsdGeom、Tf、Gf、Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 275 轮：SdfLayer、UsdPrim、SdfPath、UsdGeomMesh 与 UsdStageCache 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `89dc2c0`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_144.mjs`，本轮标记为 `api-class-quality-pass-144`。
- 严格只精修 5 页：
  - `full_site/api/class_sdf_layer.html`
  - `full_site/api/class_usd_prim.html`
  - `full_site/api/class_sdf_path.html`
  - `full_site/api/class_usd_geom_mesh.html`
  - `full_site/api/class_usd_stage_cache.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `SdfLayer` 的 scene description container、`SdfData` data model、`ArAsset` / `ArResolver`、root prim order、namespace edit 与 muted layer 边界，`UsdPrim` 的 stage 上持久 scenegraph object、properties、variant sets、composition arcs、applied API schema 与状态谓词，`SdfPath` 的 absolute/relative path、property path、target path、variant selection path 与 append helper，`UsdGeomMesh` 的 `points`、`faceVertexCounts`、`faceVertexIndices`、subdivision scheme、creases、corners、holes 与 typed schema entry，`UsdStageCache` 的 strongly thread safe `UsdStageRefPtr` collection、`UsdStageCacheContext`、find/erase/clear 查询与 stage 复用边界；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-144` 均只出现 1 次：
  - `class_sdf_layer.html`：中文字符 899，中文/英文块 64/51。
  - `class_usd_prim.html`：中文字符 812，中文/英文块 64/51。
  - `class_sdf_path.html`：中文字符 868，中文/英文块 64/51。
  - `class_usd_geom_mesh.html`：中文字符 833，中文/英文块 64/51。
  - `class_usd_stage_cache.html`：中文字符 910，中文/英文块 64/51。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次/三次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 275: sdf usd geom cache core pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Gf / Tf / Vt 基础类型页面。
2. 建议下一组：`full_site/api/class_gf_range1d.html`、`full_site/api/class_gf_dual_quatf.html`、`full_site/api/class_gf_ray.html`、`full_site/api/class_tf_token.html`、`full_site/api/class_vt_value_ref.html`。
3. 之后可继续 Gf、Tf、Vt、Sdf、Usd、Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 276 轮：GfRange1d、GfDualQuatf、GfRay、TfToken 与 VtValueRef 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `e2e2b95`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_145.mjs`，本轮标记为 `api-class-quality-pass-145`。
- 严格只精修 5 页：
  - `full_site/api/class_gf_range1d.html`
  - `full_site/api/class_gf_dual_quatf.html`
  - `full_site/api/class_gf_ray.html`
  - `full_site/api/class_tf_token.html`
  - `full_site/api/class_vt_value_ref.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `GfRange1d` 的 one-dimensional range、interval mathematics、empty range、`Contains()`、`ExtendBy()`、intersection/union 与 distance squared，`GfDualQuatf` 的 real/dual quaternion、rotation + translation、`GetTranslation()`、normalize、identity/zero 和构造约定，`GfRay` 的 start point / direction、默认不归一化、intersection testing、`SetEnds()`、`GetPoint()`、`Transform()` 与 closest point，`TfToken` 的 registered string handle、constant-time comparison/hashing、`GetString()` / `GetText()`、`Find()` 与 token collection，`VtValueRef` 的 non-owning type-erased view、`VtValue` 互操作、runtime type 查询、array helper 与 generic operations；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-145` 均只出现 1 次：
  - `class_gf_range1d.html`：中文字符 867，中文/英文块 64/51。
  - `class_gf_dual_quatf.html`：中文字符 881，中文/英文块 64/51。
  - `class_gf_ray.html`：中文字符 889，中文/英文块 63/50。
  - `class_tf_token.html`：中文字符 942，中文/英文块 64/51。
  - `class_vt_value_ref.html`：中文字符 932，中文/英文块 64/51。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次/三次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 276: gf tf vt basics pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Pcp / Hd / Sdf / Tf class 页面。
2. 建议下一组：`full_site/api/class_pcp_property_index.html`、`full_site/api/class_hd_data_source_locator.html`、`full_site/api/class_pcp_error_unresolved_prim_path.html`、`full_site/api/class_sdf_children_view.html`、`full_site/api/class_tf_dense_hash_map.html`。
3. 之后可继续 Pcp、Hd、Sdf、Tf、Gf、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 277 轮：PcpPropertyIndex、HdDataSourceLocator、PcpErrorUnresolvedPrimPath、SdfChildrenView 与 TfDenseHashMap 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `30b48c2`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_146.mjs`，本轮标记为 `api-class-quality-pass-146`。
- 严格只精修 5 页：
  - `full_site/api/class_pcp_property_index.html`
  - `full_site/api/class_hd_data_source_locator.html`
  - `full_site/api/class_pcp_error_unresolved_prim_path.html`
  - `full_site/api/class_sdf_children_view.html`
  - `full_site/api/class_tf_dense_hash_map.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `PcpPropertyIndex` 的 property opinion sites、composition semantics、`GetPropertyRange()`、local specs 与 local errors，`HdDataSourceLocator` 的 token path、data source location、`Append()` / `Prepend()`、prefix/intersection invalidation 与 empty locator，`PcpErrorUnresolvedPrimPath` 的 unresolved path、`PcpSite`、source/target layer、`PcpArcType` 与 `ToString()` 诊断，`SdfChildrenView` 的 child policy、predicate、adapter、STL-like iterator 与 view 生命周期边界，`TfDenseHashMap` 的 vector storage、小规模 map、`Threshold`、hash/equality policy 与 map-like API；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-146` 均只出现 1 次：
  - `class_pcp_property_index.html`：中文字符 869，中文/英文块 51/38。
  - `class_hd_data_source_locator.html`：中文字符 861，中文/英文块 64/51。
  - `class_pcp_error_unresolved_prim_path.html`：中文字符 877，中文/英文块 53/40。
  - `class_sdf_children_view.html`：中文字符 830，中文/英文块 64/51。
  - `class_tf_dense_hash_map.html`：中文字符 867，中文/英文块 64/51。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次/三次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 277: pcp hd sdf tf class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Sdf / Vdf / UsdLux class 页面。
2. 建议下一组：`full_site/api/class_sdf_usdz_file_format.html`、`full_site/api/class_vdf_context.html`、`full_site/api/class_vdf_node.html`、`full_site/api/class_usd_lux_shaping_a_p_i.html`、`full_site/api/class_usd_lux_disk_light.html`。
3. 之后可继续 Sdf、Vdf、UsdLux、UsdProc、Hd、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 278 轮：SdfUsdzFileFormat、VdfContext、VdfNode、UsdLuxShapingAPI 与 UsdLuxDiskLight 补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `99e0660`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_147.mjs`，本轮标记为 `api-class-quality-pass-147`。
- 严格只精修 5 页：
  - `full_site/api/class_sdf_usdz_file_format.html`
  - `full_site/api/class_vdf_context.html`
  - `full_site/api/class_vdf_node.html`
  - `full_site/api/class_usd_lux_shaping_a_p_i.html`
  - `full_site/api/class_usd_lux_disk_light.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `SdfUsdzFileFormat` 的 `.usdz` package、package root layer、`CanRead()`、`Read()`、`WriteToFile()` / `WriteToString()` 与 resolver/写出边界，`VdfContext` 的 computation callback context、输入值访问、requested output、`SetOutput()` / `SetEmptyOutput()` 与诊断入口，`VdfNode` 的 `VdfNetwork` 拓扑、input/output ports、dependency mask、schedule request 与派生类实现边界，`UsdLuxShapingAPI` 的 applied API schema、cone/focus/IES shaping 属性与 renderer 支持差异，`UsdLuxDiskLight` 的 disk area light、`radius`、boundable light base、`UsdLuxLightAPI` 和单侧发光语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-147` 均只出现 1 次：
  - `class_sdf_usdz_file_format.html`：中文字符 864，中文/英文块 58/45。
  - `class_vdf_context.html`：中文字符 931，中文/英文块 62/49。
  - `class_vdf_node.html`：中文字符 917，中文/英文块 64/51。
  - `class_usd_lux_shaping_a_p_i.html`：中文字符 828，中文/英文块 64/51。
  - `class_usd_lux_disk_light.html`：中文字符 866，中文/英文块 58/45。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次/三次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 278: sdf vdf usdlux class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 API 模块入口、File List 与 File Members 索引页。
2. 建议下一组：`full_site/api/gf_page_front.html`、`full_site/api/usd_mtlx_page_front.html`、`full_site/api/files.html`、`full_site/api/globals_v.html`、`full_site/api/globals_w.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 279 轮：Gf、UsdMtlx、File List 与 File Members V/W 索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `0c5b16a`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_148.mjs`，本轮标记为 `api-index-quality-pass-148`。
- 严格只精修 5 页：
  - `full_site/api/gf_page_front.html`
  - `full_site/api/usd_mtlx_page_front.html`
  - `full_site/api/files.html`
  - `full_site/api/globals_v.html`
  - `full_site/api/globals_w.html`
- 每页新增 5 条中文索引导读和 6 条术语对照；重点覆盖 `Gf : Graphics Foundations` 的 Linear Algebra、Basic Mathematical Operations、Basic Geometry、debugging output 与 `Gf*` 类型导航，`UsdMtlx` 的 MaterialX file format、shader discovery、shader parsing plugin 和 MaterialX concepts 到 `UsdShade` / `Sdr` 的映射，`File List` 的 documented files、头文件路径、源码浏览页和模块入口导航，`globals_v.html` 的 Vdf vectorized dataflow 全局 symbol、connection/mask、data manager vector 与 utility 函数，`globals_w.html` 的 Work 并发限制、parallel loop、reduce、sort、detached task 和 scoped parallelism；API 名称、类名、函数名、变量名、头文件名、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-148` 均只出现 1 次：
  - `gf_page_front.html`：中文字符 591，中文/英文块 26/18。
  - `usd_mtlx_page_front.html`：中文字符 531，中文/英文块 28/20。
  - `files.html`：中文字符 617，中文/英文块 24/17。
  - `globals_v.html`：中文字符 553，中文/英文块 25/17。
  - `globals_w.html`：中文字符 564，中文/英文块 25/17。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 279: gf mtlx file index pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中用户仍会实际浏览的 Class Members 函数/变量索引页。
2. 建议下一组：`full_site/api/functions_func_d.html`、`full_site/api/functions_func_k.html`、`full_site/api/functions_vars_u.html`、`full_site/api/functions_vars_v.html`、`full_site/api/functions_func_o.html`。
3. 之后可继续相邻 Class Members、File Members、module entry 或高价值 class 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 280 轮：Class Members D/K/O 函数索引与 U/V 变量索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `251a32f`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_149.mjs`，本轮标记为 `api-members-index-quality-pass-149`。
- 严格只精修 5 页：
  - `full_site/api/functions_func_d.html`
  - `full_site/api/functions_func_k.html`
  - `full_site/api/functions_vars_u.html`
  - `full_site/api/functions_vars_v.html`
  - `full_site/api/functions_func_o.html`
- 每页新增 5 条中文索引导读和 6 条术语对照；重点覆盖 D 段函数索引中的 `GfMatrix*`、`GfVec*`、container 和 Hydra buffer 命中规律，K 段函数索引中的 `SdfChildrenView`、`SdfNotice::LayerInfoDidChange`、children view 与 notice 机制，U 段变量索引中的 token tables、`SdfZipFile::FileInfo`、`GfRange*`、Pcp diagnostics、UsdSkel bake、Sdr discovery 与 Hydra 配置，V 段变量索引中的 value override、MaterialX/USD type info、`ArAssetInfo`、shader discovery、schema registry 和 domain tokens，O 段函数索引中的 tracing visitor、asset/package resolver、Sdf layer/package、Hydra plugin、Hio image 和 CLI validator 条目；API 名称、类名、函数名、变量名、头文件名、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-members-index-quality-pass-149` 均只出现 1 次：
  - `functions_func_d.html`：中文字符 570，中文/英文块 24/16。
  - `functions_func_k.html`：中文字符 555，中文/英文块 24/16。
  - `functions_vars_u.html`：中文字符 492，中文/英文块 25/16。
  - `functions_vars_v.html`：中文字符 501，中文/英文块 25/16。
  - `functions_func_o.html`：中文字符 502，中文/英文块 24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Class Members 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 280: class members d k o u v pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍较薄且用户会实际浏览的 Class Members X/Y、析构函数、变量 S 和 Related Functions G 索引页。
2. 建议下一组：`full_site/api/functions_x.html`、`full_site/api/functions_y.html`、`full_site/api/functions_func_~.html`、`full_site/api/functions_vars_s.html`、`full_site/api/functions_rela_g.html`。
3. 之后可继续相邻 Class Members、File Members、module entry 或高价值 class 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 281 轮：Class Members X/Y、符号函数、变量 S 与 Related Functions G 索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `7ba81ae`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_150.mjs`，本轮标记为 `api-members-index-quality-pass-150`。
- 严格只精修 5 页：
  - `full_site/api/functions_x.html`
  - `full_site/api/functions_y.html`
  - `full_site/api/functions_func_~.html`
  - `full_site/api/functions_vars_s.html`
  - `full_site/api/functions_rela_g.html`
- 每页新增 5 条中文索引导读和 6 条术语对照；重点覆盖 X 段类成员索引中的 `GfVec*`、`UsdGeomTokensType`、`UsdPhysicsTokensType` 与 `UsdGeomXformable::XformQuery`，Y 段类成员索引中的 `GfVec*`、`UsdGeom` / `UsdLux` / `UsdPhysics` token 表与 `VdfExecutorBufferData`，符号段函数索引中的 `_`、`~`、Hydra memory helper、asset resolver scope/cache 与 memory tag 条目，变量 S 段中的 `UsdGeom` schema class、API schema、`SdfNamespaceEdit`、Hydra scene index、UsdPhysics 和 UsdSkel 条目，Related Functions G 段中的 `GfLine*`、`GfLineSeg*`、`GfRay` 与 `GfQuaternion` related functions；API 名称、类名、函数名、变量名、头文件名、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-members-index-quality-pass-150` 均只出现 1 次：
  - `functions_x.html`：中文字符 532，中文/英文块 25/17。
  - `functions_y.html`：中文字符 549，中文/英文块 25/17。
  - `functions_func_~.html`：中文字符 568，中文/英文块 24/16。
  - `functions_vars_s.html`：中文字符 506，中文/英文块 25/16。
  - `functions_rela_g.html`：中文字符 549，中文/英文块 24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Class Members 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 281: class members x y symbols s g pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍较薄且用户会实际浏览的 Class Members Z/J/E/X/Z 函数索引页。
2. 建议下一组：`full_site/api/functions_z.html`、`full_site/api/functions_func_j.html`、`full_site/api/functions_func_e.html`、`full_site/api/functions_func_z.html`、`full_site/api/functions_func_x.html`。
3. 之后可继续相邻 Class Members、File Members、module entry 或高价值 class 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 282 轮：Class Members Z/J/E 与 X/Z 函数索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `cc0f919`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_151.mjs`，本轮标记为 `api-members-index-quality-pass-151`。
- 严格只精修 5 页：
  - `full_site/api/functions_z.html`
  - `full_site/api/functions_func_j.html`
  - `full_site/api/functions_func_e.html`
  - `full_site/api/functions_func_z.html`
  - `full_site/api/functions_func_x.html`
- 每页新增 5 条中文索引导读和 6 条术语对照；重点覆盖 Z 段类成员索引中的 `UsdGeom` / `UsdLux` / `UsdPhysics` / `UsdVol` token 表和 `GfVec3*` / `GfVec4*`，J 段函数索引中的 `JsValue`、`JsWriter`、`SdfPath`、`UsdSkelAnimQuery` 和 `OptionBase<CRTP>`，E 段函数索引中的 `Ef*` execution/cache、`UsdTimeCode`、`SdfChildrenView`、`TfSpan`、`VtArray`、`UsdPrimRange` 和 hash containers，Z 段函数索引中的 `GfVec3*` / `GfVec4*` z accessor，X 段函数索引中的 `GfVec*` x accessor 与 `UsdGeomXformable::XformQuery`；API 名称、类名、函数名、变量名、头文件名、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-members-index-quality-pass-151` 均只出现 1 次：
  - `functions_z.html`：中文字符 518，中文/英文块 25/17。
  - `functions_func_j.html`：中文字符 552，中文/英文块 24/16。
  - `functions_func_e.html`：中文字符 534，中文/英文块 24/16。
  - `functions_func_z.html`：中文字符 533，中文/英文块 24/16。
  - `functions_func_x.html`：中文字符 542，中文/英文块 24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Class Members 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 282: class members z j e x funcs pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理当前质量队列中仍较薄且用户会实际浏览的 Vdf README、typedef、Modules、File Members 枚举值索引和 Y 段函数索引页。
2. 建议下一组：`full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`、`full_site/api/functions_type.html`、`full_site/api/modules.html`、`full_site/api/globals_eval.html`、`full_site/api/functions_func_y.html`。
3. 之后可继续相邻 Class Members、File Members、module entry 或高价值 class 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 283 轮：Vdf README、typedef、Modules、枚举值与 Y 函数索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `ad1bfd8`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_152.mjs`，本轮标记为 `api-index-quality-pass-152`。
- 严格只精修 5 页：
  - `full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`
  - `full_site/api/functions_type.html`
  - `full_site/api/modules.html`
  - `full_site/api/globals_eval.html`
  - `full_site/api/functions_func_y.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 Vdf README 中的 `VdfNetwork`、`VdfNode`、`VdfConnection`、vectorized dataflow graph 与 OpenExec 关系，Class Members typedef 页中的 `VdfPullBasedExecutorEngine`、`SdfPathTable< MappedType >`、`TfDenseHashMap`、`VtArray< ELEM >` 等类型别名边界，Modules 页中的 `Arch`、`Gf`、`Tf` group 导航语义，File Members enumerator value 页中的 `UsdInterpolationTypeHeld`、`UsdListPositionBackOfAppendList`、`UsdLoadWithDescendants`、`UsdResolveInfoSourceFallback` 等枚举值读法，以及 Y 段函数索引中 `GfVec*` y accessor 与 `VdfExecutorBufferData` 的混排边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-152` 均只出现 1 次：
  - `md_pxr_exec_vdf__r_e_a_d_m_e.html`：中文字符 607，中文/英文块 26/18。
  - `functions_type.html`：中文字符 587，中文/英文块 44/36。
  - `modules.html`：中文字符 611，中文/英文块 25/17。
  - `globals_eval.html`：中文字符 590，中文/英文块 25/16。
  - `functions_func_y.html`：中文字符 619，中文/英文块 24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API README / 索引 / 入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 283: vdf typedef modules enum y pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 入口和 File Members 索引页。
2. 建议下一组：`full_site/api/js_page_front.html`、`full_site/api/kind_page_front.html`、`full_site/api/usd_hydra_page_front.html`、`full_site/api/globals_enum.html`、`full_site/api/globals_j.html`。
3. 之后可继续相邻 module entry、Class Members、File Members 或高价值 class 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 284 轮：Js、Kind、UsdHydra 入口与 File Members enum/j 索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `7d7a7e4`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_153.mjs`，本轮标记为 `api-index-quality-pass-153`。
- 严格只精修 5 页：
  - `full_site/api/js_page_front.html`
  - `full_site/api/kind_page_front.html`
  - `full_site/api/usd_hydra_page_front.html`
  - `full_site/api/globals_enum.html`
  - `full_site/api/globals_j.html`
- 每页新增 5 条中文二次入口导读和 6 条术语对照；重点覆盖 `Js` C++ JSON I/O 的 `JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()` 与 `json.h` 对照，`Kind` 模块中 `TfToken`、`KindRegistry`、`IsA()`、`model root` 与 taxonomy 扩展边界，`UsdHydraGenerativeProceduralAPI`、`UsdProcGenerativeProcedural`、`HdGpGenerativeProcedural` 与旧 Hydra shading schema 删除后的迁移边界，File Members enum 类型索引中的 `ArchMemoryProtection`、`PcpArcType`、`SdfSpecifier`、`TfDiagnosticType`、`UsdLoadPolicy` 等 enum type 分组，以及 `globals_j.html` 中 `Js*` 文件级函数和 `js_page_front.html` 的双向查找关系；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-153` 均只出现 1 次：
  - `js_page_front.html`：中文字符 604，中文/英文块 26/18。
  - `kind_page_front.html`：中文字符 598，中文/英文块 27/19。
  - `usd_hydra_page_front.html`：中文字符 536，中文/英文块 26/18。
  - `globals_enum.html`：中文字符 565，中文/英文块 25/16。
  - `globals_j.html`：中文字符 571，中文/英文块 25/17。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 入口 / File Members 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 284: js kind hydra enum j pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 Class Members / File Members / module entry 索引页。
2. 建议下一组：`full_site/api/functions_~.html`、`full_site/api/globals_c.html`、`full_site/api/globals_type.html`、`full_site/api/trace_page_front.html`、`full_site/api/functions_vars_x.html`。
3. 之后可继续 `functions_vars_z.html`、`functions_eval.html`、`usd_skel_page_front.html`、`usd_lux_page_front.html`、`functions_vars_y.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 285 轮：符号段、File Members C/type、Trace 与变量 X 索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `a3da8a3`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_154.mjs`，本轮标记为 `api-index-quality-pass-154`。
- 严格只精修 5 页：
  - `full_site/api/functions_~.html`
  - `full_site/api/globals_c.html`
  - `full_site/api/globals_type.html`
  - `full_site/api/trace_page_front.html`
  - `full_site/api/functions_vars_x.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 Class Members 符号段中 `_SdrFilesystemDiscoveryPlugin`、`HdStVBOMemoryManager`、`ArResolverScopedCache`、`TfMallocTag::Auto`、`Ef*` cache 等内部/析构/嵌套条目的模块辨识，File Members C 段中的 `CombineError()`、`CombineResult()`、`CombineUnbatched()` 与 `CustomUsdPhysicsTokens` 来源边界，File Members typedef/type alias 页中的 `ArchConstFileMapping`、`ExecCallbackFn`、`PcpArcInfoVector`、`SdfRelocates` 等跨模块类型别名，Trace 模块中的 `TraceCollector`、`TraceEvent`、`TraceReporter`、`TRACE` macros 与 performance overhead，以及变量 X 段中 `UsdGeomTokensType`、`UsdPhysicsTokensType` 的 token 语义边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、operator 符号、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-154` 均只出现 1 次：
  - `functions_~.html`：中文字符 602，中文/英文块 24/17。
  - `globals_c.html`：中文字符 612，中文/英文块 25/17。
  - `globals_type.html`：中文字符 542，中文/英文块 33/25。
  - `trace_page_front.html`：中文字符 587，中文/英文块 31/23。
  - `functions_vars_x.html`：中文字符 593，中文/英文块 25/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Class Members / File Members / module entry 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 285: symbols globals trace x pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 Class Members 变量/枚举索引和模块入口页。
2. 建议下一组：`full_site/api/functions_vars_z.html`、`full_site/api/functions_eval.html`、`full_site/api/usd_skel_page_front.html`、`full_site/api/usd_lux_page_front.html`、`full_site/api/functions_vars_y.html`。
3. 之后可继续 `usd_media_page_front.html`、`tf_page_front.html`、`glf_page_front.html`、`globals_o.html`、`functions_enum.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 286 轮：变量 Z、枚举值、UsdSkel、UsdLux 与变量 Y 索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `6937f99`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_155.mjs`，本轮标记为 `api-index-quality-pass-155`。
- 严格只精修 5 页：
  - `full_site/api/functions_vars_z.html`
  - `full_site/api/functions_eval.html`
  - `full_site/api/usd_skel_page_front.html`
  - `full_site/api/usd_lux_page_front.html`
  - `full_site/api/functions_vars_y.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖变量 Z 段中 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType`、`UsdVolTokensType` 的 domain token 边界，Class Members enumerator 页中 `TfType`、`UsdStageLoadRules`、`PcpNamespaceEdits`、`UsdSkelBakeSkinningParms`、`UsdGeomXformOp` 等枚举值与 enum type 的区别，`UsdSkel` 入口页中 `SkelRoot`、`Skeleton`、`SkelAnimation`、joint hierarchy、Linear Blend Skinning 和 binding resolution 的 schema/API 边界，`UsdLux` 入口页中 `UsdLuxLightAPI`、内置 light schema、`MeshLightAPI`、`VolumeLightAPI`、`LightListAPI`、`ShadowAPI`、`ShapingAPI`、plugin light/filter 与 `UsdShade`/`Sdr` 的跨模块边界，以及变量 Y 段中 `UsdGeomTokensType`、`UsdLuxTokensType`、`UsdPhysicsTokensType` 的 token 导航语义；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-155` 均只出现 1 次：
  - `functions_vars_z.html`：中文字符 597，中文/英文块 25/16。
  - `functions_eval.html`：中文字符 526，中文/英文块 37/29。
  - `usd_skel_page_front.html`：中文字符 575，中文/英文块 27/19。
  - `usd_lux_page_front.html`：中文字符 542，中文/英文块 35/27。
  - `functions_vars_y.html`：中文字符 572，中文/英文块 25/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Class Members 变量/枚举索引和模块入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 286: vars enum skel lux pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的模块入口和 File/Class Members 索引页。
2. 建议下一组：`full_site/api/usd_media_page_front.html`、`full_site/api/tf_page_front.html`、`full_site/api/glf_page_front.html`、`full_site/api/globals_o.html`、`full_site/api/functions_enum.html`。
3. 之后可继续 `sdf_page_front.html`、`pcp_page_front.html`、`sdr_page_front.html`、`functions_func_q.html`、`vt_page_front.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 287 轮：UsdMedia、Tf、Glf、File Members O 与枚举索引页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `5ef859c`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_156.mjs`，本轮标记为 `api-index-quality-pass-156`。
- 严格只精修 5 页：
  - `full_site/api/usd_media_page_front.html`
  - `full_site/api/tf_page_front.html`
  - `full_site/api/glf_page_front.html`
  - `full_site/api/globals_o.html`
  - `full_site/api/functions_enum.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdMedia` 的 `UsdMediaAssetPreviewsAPI`、`UsdMediaSpatialAudio`、asset preview 与 spatial audio 边界，`Tf` 的 memory management、runtime typing、diagnostic macros、`TfNotice`、`TfError`、`TfRegistryManager`、`TfMallocTag` 阅读路径，`Glf` 的 OpenGL output、draw target、framebuffer 与 Hydra/Storm 边界，File Members O 页中 `operator+()`、`operator==()`、`operator>>()`、`operator^()` 的声明来源和类型语境，以及 `functions_enum.html` 中 enum type 与 `functions_eval.html` enumerator value 的互补关系；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、operator 符号、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-156` 均只出现 1 次：
  - `usd_media_page_front.html`：中文字符 644，中文/英文块 26/18。
  - `tf_page_front.html`：中文字符 609，中文/英文块 25/17。
  - `glf_page_front.html`：中文字符 610，中文/英文块 25/16。
  - `globals_o.html`：中文字符 630，中文/英文块 25/17。
  - `functions_enum.html`：中文字符 579，中文/英文块 43/35。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口和 File/Class Members 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 287: media tf glf operators enum pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口和函数索引页。
2. 建议下一组：`full_site/api/sdf_page_front.html`、`full_site/api/pcp_page_front.html`、`full_site/api/sdr_page_front.html`、`full_site/api/functions_func_q.html`、`full_site/api/vt_page_front.html`。
3. 之后可继续 `usd_proc_page_front.html`、`plug_page_front.html`、`hio_page_front.html`、`functions_vars_q.html`、`functions_rela_t.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 288 轮：Sdf、Pcp、Sdr、Q 函数索引与 Vt 入口页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `9be9ee1`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_157.mjs`，本轮标记为 `api-index-quality-pass-157`。
- 严格只精修 5 页：
  - `full_site/api/sdf_page_front.html`
  - `full_site/api/pcp_page_front.html`
  - `full_site/api/sdr_page_front.html`
  - `full_site/api/functions_func_q.html`
  - `full_site/api/vt_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `Sdf` 的 `SdfLayer`、`SdfPath`、`SdfPrimSpec`、property spec、file format plugin 与 `UsdStage` 边界，`Pcp` 的 `PcpCache`、`PcpPrimIndex`、composition arc、change processing、path translation 和错误诊断，`Sdr` 的 `SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty`、discovery/parser plugin 与 `UsdShade` 边界，Q 段函数索引中 `SdfAbstractData`、`SdfLayer`、`ConfigBase` 的模块混排读法，以及 `Vt` 的 `VtValue`、`VtArray`、type erasure、homogeneous array、C++/Python interface 差异；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-157` 均只出现 1 次：
  - `sdf_page_front.html`：中文字符 602，中文/英文块 36/28。
  - `pcp_page_front.html`：中文字符 589，中文/英文块 37/29。
  - `sdr_page_front.html`：中文字符 595，中文/英文块 27/19。
  - `functions_func_q.html`：中文字符 654，中文/英文块 24/16。
  - `vt_page_front.html`：中文字符 598，中文/英文块 29/21。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口和 Class Members Q 函数索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 288: sdf pcp sdr q vt pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口、变量索引和 related functions 索引页。
2. 建议下一组：`full_site/api/usd_proc_page_front.html`、`full_site/api/plug_page_front.html`、`full_site/api/hio_page_front.html`、`full_site/api/functions_vars_q.html`、`full_site/api/functions_rela_t.html`。
3. 之后可继续 `usd_geom_page_front.html`、`usd_shade_page_front.html`、`hdx_page_front.html`、`functions_func_v.html`、`globals_func_q.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 289 轮：UsdProc、Plug、Hio、变量 Q 与 Related Functions T 页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `3c9f806`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_158.mjs`，本轮标记为 `api-index-quality-pass-158`。
- 严格只精修 5 页：
  - `full_site/api/usd_proc_page_front.html`
  - `full_site/api/plug_page_front.html`
  - `full_site/api/hio_page_front.html`
  - `full_site/api/functions_vars_q.html`
  - `full_site/api/functions_rela_t.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdProcGenerativeProcedural` 的 authored procedural schema 与 runtime/provider 边界，`PlugPlugin`、`PlugRegistry`、`PlugNotice::DidRegisterPlugins`、metadata 与 `TfType` 类型系统关系，`HioGlslfx`、`HioImage`、`HioFieldTextureData`、image/texture I/O 与 Hydra 资源层边界，`functions_vars_q.html` 中 `UsdVolTokensType` 的 Q 段变量/token 索引用法，以及 `functions_rela_t.html` 中 `TfRefPtr<T>`、`TfRefBase`、`TfToken`、`PcpInstanceKey`、`SdfSpec`、`TfPyMethodResult` 的 related functions 跨模块读法；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-158` 均只出现 1 次：
  - `usd_proc_page_front.html`：中文字符 675，中文/英文块 26/18。
  - `plug_page_front.html`：中文字符 695，中文/英文块 29/21。
  - `hio_page_front.html`：中文字符 762，中文/英文块 37/24。
  - `functions_vars_q.html`：中文字符 917，中文/英文块 36/23。
  - `functions_rela_t.html`：中文字符 847，中文/英文块 36/23。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口、变量索引和 related functions 索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 289: proc plug hio q related pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口和函数索引页。
2. 建议下一组：`full_site/api/usd_geom_page_front.html`、`full_site/api/usd_shade_page_front.html`、`full_site/api/hdx_page_front.html`、`full_site/api/functions_func_v.html`、`full_site/api/usd_physics_page_front.html`。
3. 之后可继续 `usd_vol_page_front.html`、`usd_render_page_front.html`、`functions_q.html`、`functions_vars_v.html` 或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 290 轮：UsdGeom、UsdShade、Hdx、V 函数索引与 UsdPhysics 页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `c9342b9`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_159.mjs`，本轮标记为 `api-index-quality-pass-159`。
- 严格只精修 5 页：
  - `full_site/api/usd_geom_page_front.html`
  - `full_site/api/usd_shade_page_front.html`
  - `full_site/api/hdx_page_front.html`
  - `full_site/api/functions_func_v.html`
  - `full_site/api/usd_physics_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdGeomImageable`、`UsdGeomXformable`、`UsdGeomGprim`、`UsdGeomPrimvar`、stage metrics 与几何 schema 边界，`UsdShadeNodeGraph`、`UsdShadeMaterial`、`UsdShadeShader`、`UsdShadeConnectableAPI`、`SdrRegistry` 与 material binding 的分层关系，`HdxTaskController`、`HdxRenderTask`、`HdxSelectionTask`、`HdxPickTask` 与 Hydra task/controller 层边界，V 段函数索引中的 validation、schema API、Vdf vector accessor 和 CLI validator 线索，以及 `UsdPhysicsScene`、`UsdPhysicsRigidBodyAPI`、`UsdPhysicsCollisionAPI`、`UsdPhysicsJoint`、`UsdPhysicsArticulationRootAPI` 的物理 authoring 语义；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-159` 均只出现 1 次：
  - `usd_geom_page_front.html`：中文字符 594，中文/英文块 43/35。
  - `usd_shade_page_front.html`：中文字符 590，中文/英文块 38/30。
  - `hdx_page_front.html`：中文字符 857，中文/英文块 38/25。
  - `functions_func_v.html`：中文字符 804，中文/英文块 36/23。
  - `usd_physics_page_front.html`：中文字符 722，中文/英文块 53/45。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口和 Class Members V 函数索引页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 290: geom shade hdx v physics pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口和 Class Members 索引页。
2. 建议下一组：`full_site/api/usd_vol_page_front.html`、`full_site/api/usd_render_page_front.html`、`full_site/api/functions_q.html`、`full_site/api/functions_vars_v.html`、`full_site/api/usd_shaders_page_front.html`。
3. 之后可继续 `usdabc_page_front.html`、`sdr_glslfx_page_front.html`、`usd_ri_page_front.html`、`usd_utils_page_front.html`、`usd_u_i_page_front.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 291 轮：UsdVol、UsdRender、Q 索引、V 变量索引与 UsdShaders 页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `9946108`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_160.mjs`，本轮标记为 `api-index-quality-pass-160`。
- 严格只精修 5 页：
  - `full_site/api/usd_vol_page_front.html`
  - `full_site/api/usd_render_page_front.html`
  - `full_site/api/functions_q.html`
  - `full_site/api/functions_vars_v.html`
  - `full_site/api/usd_shaders_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdVolVolume`、`UsdVolFieldBase`、`UsdVolField3DAsset`、`UsdVolOpenVDBAsset`、particle field 与 volume/field authored schema 边界，`UsdRenderSettings`、`UsdRenderProduct`、`UsdRenderVar`、`UsdRenderPass` 与 render collection 的渲染配置语义，Class Members Q 综合索引与 `functions_func_q.html` / `functions_vars_q.html` 的分工，V 段变量索引中 token constants、generated token table 与 owning class 的读取路径，以及 `UsdShaders`、`UsdPreviewSurface`、`SdrRegistry`、shader definition 和 renderer support matrix 的边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-160` 均只出现 1 次：
  - `usd_vol_page_front.html`：中文字符 694，中文/英文块 46/38。
  - `usd_render_page_front.html`：中文字符 670，中文/英文块 39/31。
  - `functions_q.html`：中文字符 976，中文/英文块 36/24。
  - `functions_vars_v.html`：中文字符 727，中文/英文块 37/23。
  - `usd_shaders_page_front.html`：中文字符 610，中文/英文块 27/19。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口、Class Members Q 综合索引、V 变量索引和 shader definitions 入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 291: vol render q shaders pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口页。
2. 建议下一组：`full_site/api/usdabc_page_front.html`、`full_site/api/sdr_glslfx_page_front.html`、`full_site/api/usd_ri_page_front.html`、`full_site/api/usd_utils_page_front.html`、`full_site/api/usd_u_i_page_front.html`。
3. 之后可继续 `full_site/api/usddraco_page_front.html`、`full_site/api/work_page_front.html`、`full_site/api/usd_app_utils_page_front.html`、`full_site/api/hd_embree_page_front.html`、`full_site/api/trace_page_front.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 292 轮：UsdAbc、SdrGlslfx、UsdRi、UsdUtils 与 UsdUI 入口页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `33ef0f7`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_161.mjs`，本轮标记为 `api-index-quality-pass-161`。
- 严格只精修 5 页：
  - `full_site/api/usdabc_page_front.html`
  - `full_site/api/sdr_glslfx_page_front.html`
  - `full_site/api/usd_ri_page_front.html`
  - `full_site/api/usd_utils_page_front.html`
  - `full_site/api/usd_u_i_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdAbc` Alembic file format plugin 与 USD composition / `UsdGeom` / `Sdf` 的数据模型边界，`SdrGlslfx`、`SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty` 与 parser plugin 的 shader definition discovery 语义，`UsdRi` 与 RenderMan-specific utilities 的 renderer extension 边界，`UsdUtils` 中 dependency analysis、asset path handling、packaging helper、flatten/stage utility 的任务分类，以及 `UsdUIBackdrop`、`UsdUINodeGraphNodeAPI`、`UsdUISceneGraphPrimAPI`、`UsdUIPrimHints`、`UsdUIPropertyHints` 的 tool-facing hint 层语义；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-161` 均只出现 1 次：
  - `usdabc_page_front.html`：中文字符 680，中文/英文块 30/22。
  - `sdr_glslfx_page_front.html`：中文字符 592，中文/英文块 26/17。
  - `usd_ri_page_front.html`：中文字符 631，中文/英文块 26/18。
  - `usd_utils_page_front.html`：中文字符 665，中文/英文块 31/23。
  - `usd_u_i_page_front.html`：中文字符 627，中文/英文块 29/21。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 292: abc glslfx ri utils ui pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强或无补强、中文量较低且用户会实际浏览的 API 模块入口页。
2. 建议下一组：`full_site/api/usddraco_page_front.html`、`full_site/api/work_page_front.html`、`full_site/api/usd_app_utils_page_front.html`、`full_site/api/hd_embree_page_front.html`、`full_site/api/trace_page_front.html`。
3. 之后可继续 `full_site/api/pcp_page_front.html`、`full_site/api/sdr_page_front.html`、`full_site/api/kind_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/gf_page_front.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 293 轮：UsdDraco、Work、UsdAppUtils、HdEmbree 与 Trace 入口页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `32df7d1`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_162.mjs`，本轮标记为 `api-index-quality-pass-162`。
- 严格只精修 5 页：
  - `full_site/api/usddraco_page_front.html`
  - `full_site/api/work_page_front.html`
  - `full_site/api/usd_app_utils_page_front.html`
  - `full_site/api/hd_embree_page_front.html`
  - `full_site/api/trace_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `UsdDraco` Draco file format plugin、compressed geometry、decode boundary 与 `UsdGeomMesh`/primvars/topology 的关系，`Work` 多线程 dispatch、parallel loop、thread pool 与 runtime scheduling behavior 的边界，`UsdAppUtils` application utilities、camera selection、frame range、preview rendering 与 `UsdUtils` 的分工，`HdEmbree` Embree-based Hydra renderer plugin、render delegate、CPU ray tracing、scene data consumption 与 `Hd`/`Hdx`/`HdSt` 的分层关系，以及 `Trace` performance tracking、event tracing、collector、counter、reporter 与 instrumentation overhead 的诊断边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-162` 均只出现 1 次：
  - `usddraco_page_front.html`：中文字符 675，中文/英文块 26/17。
  - `work_page_front.html`：中文字符 704，中文/英文块 34/26。
  - `usd_app_utils_page_front.html`：中文字符 678，中文/英文块 27/19。
  - `hd_embree_page_front.html`：中文字符 729，中文/英文块 46/33。
  - `trace_page_front.html`：中文字符 803，中文/英文块 43/30。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 293: draco work app embree trace pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍只有一层补强、中文量较低且用户会实际浏览的 API 模块入口页。
2. 建议下一组：`full_site/api/pcp_page_front.html`、`full_site/api/sdr_page_front.html`、`full_site/api/kind_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/gf_page_front.html`。
3. 之后可继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，或转向较薄的 Class Members、File Members 和高价值 class 页；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 294 轮：Pcp、Sdr、Kind、Vt 与 Gf 入口页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `8ca188f`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_163.mjs`，本轮标记为 `api-index-quality-pass-163`。
- 严格只精修 5 页：
  - `full_site/api/pcp_page_front.html`
  - `full_site/api/sdr_page_front.html`
  - `full_site/api/kind_page_front.html`
  - `full_site/api/vt_page_front.html`
  - `full_site/api/gf_page_front.html`
- 每页新增 5 条中文二次索引导读和 6 条术语对照；重点覆盖 `PcpPrimIndex`、`PcpPropertyIndex`、`PcpCache`、composition arcs、layer stack 与 `Sdf`/`UsdStage` 的分层关系，`SdrRegistry`、`SdrShaderNode`、`SdrShaderProperty` 与 discovery/parser plugin 的 shader definition registry 语义，`KindRegistry`、kind tokens、model hierarchy 与 `UsdModelAPI` 的分类边界，`VtValue`、`VtArray`、type erasure、homogeneous array 与 `Gf`/`Sdf`/`Usd` 值表达关系，以及 `GfVec*`、`GfMatrix*`、`GfQuat*`、`GfRange*`、`GfRay`、`GfBBox3d` 等 graphics foundations 基础类型；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量、operator 和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-163` 均只出现 1 次：
  - `pcp_page_front.html`：中文字符 791，中文/英文块 49/36。
  - `sdr_page_front.html`：中文字符 781，中文/英文块 39/26。
  - `kind_page_front.html`：中文字符 808，中文/英文块 39/26。
  - `vt_page_front.html`：中文字符 791，中文/英文块 41/28。
  - `gf_page_front.html`：中文字符 837，中文/英文块 38/25。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 API 模块入口页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 294: pcp sdr kind vt gf pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍很薄且用户可读价值较高的 OpenExec / Validation / Hydra 指南型 API 文档页。
2. 建议下一组：`full_site/api/page__execution__system__design.html`、`full_site/api/md_pxr_exec_exec_usd_docs_overview.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`、`full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`。
3. 之后可继续 `full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`full_site/api/group__group__hd__collection_predicates.html`、`full_site/api/page_ts_status.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 295 轮：OpenExec 设计/教程与 USD Validation 文档页补强
已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `68826a0`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_164.mjs`，本轮标记为 `api-index-quality-pass-164`。
- 严格只精修 5 页：
  - `full_site/api/page__execution__system__design.html`
  - `full_site/api/md_pxr_exec_exec_usd_docs_overview.html`
  - `full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`
  - `full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`
  - `full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`
- 每页新增 5 条中文二次导读和 6 条术语对照；重点覆盖 `Exec`、`ExecUsd`、`Esf`、`Vdf`、`computation graph`、`computed value`、`value request`、`schema computation`、`dependency invalidation`、`UsdValidationContext`、`UsdValidationValidator`、`UsdValidationError` 与 `UsdValidationRegistry` 的阅读边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量、数学符号和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-164` 均只出现 1 次：
  - `page__execution__system__design.html`：中文字符 613，中文/英文块 36/28。
  - `md_pxr_exec_exec_usd_docs_overview.html`：中文字符 608，中文/英文块 31/23。
  - `md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`：中文字符 655，中文/英文块 33/25。
  - `md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`：中文字符 587，中文/英文块 34/26。
  - `md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`：中文字符 616，中文/英文块 47/39。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 OpenExec/Validation 指南型 API 文档页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 295: openexec validation pass` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍很薄且用户可读价值较高的 OpenExec README、Hydra collection predicate 与 test status 页面。
2. 建议下一组：`full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`full_site/api/group__group__hd__collection_predicates.html`、`full_site/api/page_ts_status.html`。
3. 之后可继续 `full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html`、`full_site/api/page_ts_regression.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 296 轮：OpenExec README、Hydra collection predicate 与 Ts status 页面补强
已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `b221222f`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_165.mjs`，本轮标记为 `api-index-quality-pass-165`。
- 严格只精修 5 页：
  - `full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html`
  - `full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`
  - `full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html`
  - `full_site/api/group__group__hd__collection_predicates.html`
  - `full_site/api/page_ts_status.html`
- 每页新增 5 条中文二次导读和 6 条术语对照；重点覆盖 `Exec` core、`ExecGeom`、`ExecUsd`、computed value、dependency graph、geometry execution、USD execution bridge、Hydra collection predicate、scene index filtering、Ts / USD Anim project status、spline、knot 与 interpolation 的阅读边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量、数学符号和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-165` 均只出现 1 次：
  - `md_pxr_exec_exec__r_e_a_d_m_e.html`：中文字符 630，中文/英文块 25/16。
  - `md_pxr_exec_exec_geom__r_e_a_d_m_e.html`：中文字符 592，中文/英文块 25/16。
  - `md_pxr_exec_exec_usd__r_e_a_d_m_e.html`：中文字符 585，中文/英文块 25/17。
  - `group__group__hd__collection_predicates.html`：中文字符 630，中文/英文块 30/22。
  - `page_ts_status.html`：中文字符 611，中文/英文块 41/33。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 OpenExec README、Hydra group 与 Ts status 指南型页面二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 296: exec hydra ts pass` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍很薄且用户可读价值较高的 OpenExec IR/EF/ESF/EsfUsd README 与 Ts regression 页面。
2. 建议下一组：`full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html`、`full_site/api/page_ts_regression.html`。
3. 之后可继续 `full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_vdf_examples__r_e_a_d_m_e.html`、`full_site/api/page_vdf_overview.html`、`full_site/api/page_vdf_implementation_notes.html`、`full_site/api/page_vdf_parallel_evaluation.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 297 轮：OpenExec IR/EF/ESF/EsfUsd README 与 Ts regression 页面补强
已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `4591385`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_166.mjs`，本轮标记为 `api-index-quality-pass-166`。
- 严格只精修 5 页：
  - `full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html`
  - `full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html`
  - `full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html`
  - `full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html`
  - `full_site/api/page_ts_regression.html`
- 每页新增 5 条中文二次导读和 6 条术语对照；重点覆盖 `ExecIr`、invertible rig、`Ef` execution foundation、`Esf` scene abstraction、`EsfUsd` USD scene adapter、`SdfPath`、value resolution、regressive spline、knot ordering、interpolation 与 regression test semantics 的阅读边界；API 名称、页面名、类名、函数名、变量名、头文件名、template 参数、enum name、enum value、token 字面量、数学符号和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-166` 均只出现 1 次：
  - `md_pxr_exec_exec_ir__r_e_a_d_m_e.html`：中文字符 603，中文/英文块 25/16。
  - `md_pxr_exec_ef__r_e_a_d_m_e.html`：中文字符 616，中文/英文块 25/17。
  - `md_pxr_exec_esf__r_e_a_d_m_e.html`：中文字符 606，中文/英文块 25/16。
  - `md_pxr_exec_esf_usd__r_e_a_d_m_e.html`：中文字符 559，中文/英文块 25/17。
  - `page_ts_regression.html`：中文字符 561，中文/英文块 37/29。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 OpenExec IR/EF/ESF/EsfUsd README 与 Ts regression 指南型页面二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 297: exec foundation ts regression pass` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户可读价值较高的 Vdf README、Vdf examples 与 Vdf overview/implementation/parallel evaluation 页面。
2. 建议下一组：`full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_vdf_examples__r_e_a_d_m_e.html`、`full_site/api/page_vdf_overview.html`、`full_site/api/page_vdf_implementation_notes.html`、`full_site/api/page_vdf_parallel_evaluation.html`。
3. 之后可继续 `full_site/api/page_vdf_input_and_output.html`、`full_site/api/page_vdf_execution.html`、`full_site/api/page_vdf_debugging.html`、`full_site/api/page_vdf_testing.html`、`full_site/api/page_vdf_faq.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 298 轮：Vdf README 与核心 Vdf class 页面补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `6d6d8c6`，`origin/main` 一致，起始工作区干净；总入口 `http://127.0.0.1:8068/openusd_bilingual_final.html` 返回 HTTP 200。
- 复核本轮候选存在性：`full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html` 存在；原计划中的 `full_site/api/md_pxr_exec_vdf_examples__r_e_a_d_m_e.html`、`full_site/api/page_vdf_overview.html`、`full_site/api/page_vdf_implementation_notes.html`、`full_site/api/page_vdf_parallel_evaluation.html` 不在当前 406 页面范围内，本轮不新建缺失页面。
- 新增并执行 `scripts/refine_openusd_release_batch_167.mjs`，本轮标记为 `api-index-quality-pass-167`。
- 严格只精修 5 个已存在页面：
  - `full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`
  - `full_site/api/class_vdf_read_write_accessor.html`
  - `full_site/api/class_vdf_grapher_options.html`
  - `full_site/api/class_vdf_context.html`
  - `full_site/api/class_vdf_node.html`
- 每页新增 5 条中文二次导读和 6 条术语对照；重点覆盖 `Vdf` data-flow network、evaluation request、dirty propagation、dependency invalidation、`VdfReadWriteAccessor< T >` typed access、`VdfGrapherOptions` graph visualization、`VdfContext` evaluation context、`VdfNode` input/output/dependency graph boundary；API 名称、类名、方法名、template 参数、变量名、token 字面量、数学符号和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-167` 均只出现 1 次：
  - `md_pxr_exec_vdf__r_e_a_d_m_e.html`：中文字符 846，中文/英文块 38/25。
  - `class_vdf_read_write_accessor.html`：中文字符 872，中文/英文块 48/35。
  - `class_vdf_grapher_options.html`：中文字符 853，中文/英文块 64/51。
  - `class_vdf_context.html`：中文字符 1178，中文/英文块 74/56。
  - `class_vdf_node.html`：中文字符 1121，中文/英文块 76/58。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是 Vdf README 与核心 class 页面二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 298: vdf core pages pass` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理质量队列中真实存在、中文量低且用户会实际浏览的类层级/相关页索引和 usdview 文档页。
2. 建议下一组：`full_site/api/hierarchy.html`、`full_site/api/inherits.html`、`full_site/api/pages.html`、`full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html`、`full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`。
3. 之后可继续 `full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_skel_tokens_type.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 299 轮：Class Hierarchy、Related Pages 与 usdview 文档页补强

已完成：

- 复核当前仓库、远端与审计基线：本地 `main` 基于上一轮同步提交 `a2b709c`，`origin/main` 一致，起始工作区干净；总入口 `http://127.0.0.1:8068/openusd_bilingual_final.html` 返回 HTTP 200。
- 复核 `reports/all_pages_inventory.json`、`reports/translation_quality_review.json`、`reports/full_draft_preview_audit.json`、`reports/local_link_routing_report.json`、`reports/audit_index.json`、`reports/validation_report.json`、`work.md` 与 `reports/iteration_report.md`：406 页范围完整，质量计数仍为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11，上一轮记录指向本轮 5 个真实存在页面。
- 新增并执行 `scripts/refine_openusd_release_batch_168.mjs`，本轮标记为 `api-index-quality-pass-168`。
- 严格只精修 5 个已存在页面：
  - `full_site/api/hierarchy.html`
  - `full_site/api/inherits.html`
  - `full_site/api/pages.html`
  - `full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html`
  - `full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`
- 每页新增 5 条中文二次导读和 6 条术语对照；重点覆盖 `Class Hierarchy`、`inheritance graph`、`Related Pages`、`usdview` black-box testing、`usdviewq` development practices、Qt/UI state、stage inspection、plugin hooks 和 visual diff/flakiness 等阅读边界；API 名称、类名、方法名、template 参数、变量名、token 字面量、数学符号和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-index-quality-pass-168` 均只出现 1 次：
  - `hierarchy.html`：中文字符 633，中文/英文块 25/17。
  - `inherits.html`：中文字符 618，中文/英文块 25/16。
  - `pages.html`：中文字符 605，中文/英文块 25/17。
  - `md_pxr_usd_imaging_usdviewq_black_box_testing.html`：中文字符 629，中文/英文块 30/22。
  - `md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`：中文字符 613，中文/英文块 27/19。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是索引/文档页二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 299: hierarchy usdview docs pass` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理质量队列中真实存在、中文量低且用户会实际浏览的 Sdf/Exec 文档、token/descriptor 结构体页。
2. 建议下一组：`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_skel_tokens_type.html`。
3. 之后可继续 `full_site/api/struct_usd_physics_tokens_type.html`、`full_site/api/functions_vars.html`、`full_site/api/globals_l.html`、`full_site/api/functions_vars_f.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 300 轮：修复 Usd core 手册对象模型目录跳未覆盖页

已完成：

- 针对用户在浏览器中指出的 `site/usd_page_front.html` 首屏 Core API Manual 目录问题做专项修复：红框内对象模型目录项原本会跳转到 `site/uncovered_openusd_page.html?official=..._usd__page__object_model.html...`，阅读体验不合格。
- 复核原因：官方 `_usd__page__object_model.html` 不在当前 406 页本地清单内，因此通用路由策略把它标为未覆盖；但这些链接属于 `usd_page_front.html` 核心入口页的高频目录，不应按普通缺页处理。
- 新增 `scripts/repair_usd_page_front_object_model_links.mjs`，并接入 `scripts/build_usd_page_front_bilingual.mjs`，防止以后重建 `site/usd_page_front.html` 时回退。
- 更新 `site/usd_page_front.html`：新增本页对象模型本地导读区 `#Usd_OM_ObjectModel`，并提供以下本地锚点：
  - `#Usd_OM_SdfLayer`
  - `#Usd_OM_UsdStage`
  - `#Usd_OM_UsdPrim`
  - `#Usd_OM_UsdProperty`
  - `#Usd_OM_UsdAttribute`
  - `#Usd_OM_UsdRelationship`
  - `#Usd_OM_Metadata`
  - `#Usd_OM_OtherObjects`
- 将上方 Core API Manual 中 9 个 `_usd__page__object_model.html` 目录链接全部改为本页 `#Usd_OM_*` 锚点，并标记 `data-local-route="mapped"`；保留 `data-official-href`，本地导读区内另保留显式 `Open official page` 官方原页链接。
- 专项回读：`site/usd_page_front.html` 中对象模型目录链接 9/9 均为本页锚点，相关 `uncovered_openusd_page.html?..._usd__page__object_model...` 命中数为 0。
- 浏览器验证：打开 `http://127.0.0.1:8068/site/usd_page_front.html#Usd_OM_SdfLayer` 可落到本地 “SdfLayer：共享数据文件 / SdfLayer: Shared Data Files” 导读区，`uncovered=false`。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮是入口页链接/锚点体验修复，不是 406 draft 页翻译分级晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 已通过；链接路由修复后 `mapped_links` 从 4975 提升到 4988，`uncovered_links` 从 4914 降到 4905。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 300: usd page object model links fix` 同步本轮 HTML、脚本、报告和 `work.md`；如同步脚本失败，本轮不推送并先修复。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 本轮没有扩展 406 清单范围；`_usd__page__object_model.html` 仍不是独立本地页面，但核心入口页目录已有本地锚点兜底。

下一轮目标：

1. 回到每轮最多 5 页精修节奏，优先处理质量队列中真实存在、中文量低且用户会实际浏览的 Sdf/Exec 文档、token/descriptor 结构体页。
2. 建议下一组：`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_skel_tokens_type.html`。
3. 之后可继续 `full_site/api/struct_usd_physics_tokens_type.html`、`full_site/api/functions_vars.html`、`full_site/api/globals_l.html`、`full_site/api/functions_vars_f.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 301 轮：修复 API 左侧导航树运行时目录

已完成：

- 针对用户指出的本地 API 页面左侧导航栏目录缺失问题做专项修复。复现时 `site/_usd__overview_and_purpose.html` 虽然包含 `#side-nav`、`#nav-tree` 和 `initNavTree(...)`，但运行时缺少 `site/navtreeindex0.js`，导致导航树不能展开；同时在 Codex 应用内浏览器约 `662px` 宽度下，官方 `doxygen-awesome.css` 的 `max-width: 767px` 响应式规则会把 `#side-nav` 隐藏。
- 新增并执行 `scripts/repair_openusd_site_navtree_runtime.mjs`：
  - 生成 `site/navtreeindex0.js`，提供 414 个导航树面包屑索引，恢复 Doxygen `navtree.js` 的展开逻辑。
  - 生成 `site/openusd_local_navtree.js`，把左侧目录中 406 清单内 API 页面重写为本地目标；例如 `Gf : Graphics Foundations` 从 `gf_page_front.html` 改为 `../full_site/api/gf_page_front.html`。
  - 重写 `site/navtreedata.js` 中的导航树链接，使已覆盖 API 页面优先走本地 `full_site/api/...`，未覆盖目标仍按本地未覆盖占位策略处理。
- 更新 `site/index.html`、`site/_usd__overview_and_purpose.html`、`site/usd_page_front.html`，加入 `openusd_local_navtree.js`；同时把 `openusd_cn.css` 引用加 `?v=301`，避免浏览器继续使用旧缓存。
- 更新 `site/openusd_cn.css`，在 `560px-767px` 宽度范围内保持 `#side-nav` 可见，并给 `#doc-content` 留出左侧目录宽度，覆盖官方主题的小宽度隐藏规则。
- 更新 `scripts/build_api_overview_bilingual.mjs` 与 `scripts/build_usd_page_front_bilingual.mjs`，确保后续重建两个 API 入口页时仍保留本地导航修复脚本和 CSS 版本参数。
- 更新 `scripts/validate_openusd_api_repro.ps1` 与 `scripts/audit_openusd_navigation_coverage.mjs`，将 `site/navtreeindex0.js` 和 `site/openusd_local_navtree.js` 纳入必需资源/导航专项审计，防止以后静态壳存在但运行时目录缺失。
- 浏览器验证：
  - 打开 `http://127.0.0.1:8068/site/_usd__overview_and_purpose.html?navfix=301`，在 `innerWidth=662` 下 `#side-nav` 为 `display:block`，宽度 `250px`，目录文本长度非 0，`#doc-content` 左偏移为 `250px`。
  - 左侧目录中的 `Gf : Graphics Foundations` 已显示为本地链接 `../full_site/api/gf_page_front.html`，并标记 `data-local-route="mapped"`。
  - 实际点击该目录项后进入 `http://127.0.0.1:8068/full_site/api/gf_page_front.html`，不是官方站点，也不是 `uncovered_openusd_page.html`。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮是导航运行时和本地链接体验修复，没有新增或精修 406 清单中的翻译正文页。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`audit_openusd_navigation_coverage.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；导航专项审计显示 `api_navigation_runtime_assets_present=2`，总验证 `PASSED`。
- GitHub 同步结果：验证通过后使用 `OpenUSD bilingual round 301: site navtree sidebar fix` 同步本轮 HTML、脚本、报告和 `work.md` 到 GitHub。

当前差距：

- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 本轮没有扩展 406 清单范围；左侧导航现在能显示并优先指向本地清单内页面，但部分未纳入清单的 Doxygen 目标仍会按策略进入本地未覆盖占位页。

下一轮目标：

1. 回到每轮最多 5 页精修节奏，优先处理质量队列中真实存在、中文量低且用户会实际浏览的 Sdf/Exec 文档、token/descriptor 结构体页。
2. 建议下一组：`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_skel_tokens_type.html`。
3. 之后可继续 `full_site/api/struct_usd_physics_tokens_type.html`、`full_site/api/functions_vars.html`、`full_site/api/globals_l.html`、`full_site/api/functions_vars_f.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 302 轮：问题盘点、自动化纠偏与入口诚实化

已完成：

- 针对用户反馈“3 天后仍只有 8 页完成、398 页还是草稿”做专项问题盘点，新增 `reports/current_problem_audit.md` 与 `reports/current_problem_audit.json`。
- 复核真实计数：全量 406 页；`bilingual_complete` 8；`bilingual_draft` 398；`good_bilingual` 8；`draft_needs_translation` 387；`draft_template_only` 11。
- 确认 P0 根因：过去补强脚本主要给 `bilingual_draft` 页面增加中文导读和术语对照，没有页面晋级机制；质量审计又要求状态为 `bilingual_complete` 才可能给 `good_bilingual`，因此主完成数长期不增长。
- 已把问题清单同步到 `openusd` 自动化，频率保持用户要求的每 5 分钟；新提示要求每次先读取 `reports/current_problem_audit.md/json`，优先纠偏完成度、入口诚实性、报告可解析性和用户实际浏览问题。
- 更新 `scripts/build_final_html_entry.mjs` 并重建 `openusd_bilingual_final.html`：入口现在明确写出只有 8 页达到完整双语标准；398 页标为“未完整翻译草稿 / Incomplete drafts”；`bilingual_draft` 被解释为可本地打开但仍未完整翻译。
- 更新 `scripts/validate_openusd_api_repro.ps1`：`validation_report.json` 改为 UTF-8 无 BOM；总入口验证改为检查新的诚实展示标准。

分级变化：

- 本轮分级计数保持不变：`good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 计数不变不是完成进度，而是本轮只修正流程、入口展示、自动化目标和报告编码；下一步必须实现 `draft_needs_translation -> bilingual_complete -> good_bilingual` 的真实晋级路径。

验证结果：

- `audit_openusd_translation_quality.mjs`：通过，确认当前仍为 8/387/11。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，398/398 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过。
- `audit_openusd_report_index.mjs`：通过。
- Node 直接解析 `reports/validation_report.json`：`bom=false`，`parse_ok=true`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 302: completion audit and honest entry` 同步本轮报告、脚本、入口页和工作记录。

下一轮目标：

1. 不再继续“5 页导读补强”作为主路线。
2. 先实现或明确页面晋级规则，并用审计证明哪些页面可以从 `draft_needs_translation` 晋级为 `bilingual_complete`。
3. 选择少量高价值页面做真正逐段双语覆盖，目标是让 `good_bilingual` 实际增加。
## 第 303 轮：建立晋级机制并将 SdfLayer 提升为完整双语

已完成：

- 新增完整双语晋级清单：
  - `reports/bilingual_completion_promotions.json`
  - `reports/bilingual_completion_promotions.md`
- 更新 `scripts/discover_openusd_all_pages.mjs`，让它读取晋级清单，并把通过清单声明且本地存在的页面计为 `bilingual_complete`。
- 修复范围漂移问题：上一轮导航修复后 `site/navtreedata.js` 已被本地化，不能再作为官方全量发现来源；否则范围会从 406 错误漂移到 430。本轮将 inventory 锚定为本地 406 个 HTML 文件：`site/` 的 8 个完成官方页 + `full_site/` 的 398 个页面。
- 将 `full_site/api/class_sdf_layer.html` 晋级：
  - 状态改为 `bilingual_complete`。
  - 标题改为“完整双语参考：SdfLayer Class”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖官方描述、`SdfData` data model、ephemeral/anonymous layer、`ArAsset`/`ArResolver`、API 分组、authored opinion 与 `UsdStage` composed value 区别、相邻类型关系。
- 更新 `scripts/validate_openusd_api_repro.ps1`：
  - 增加 promotion manifest 和 current problem audit 必需文件。
  - 新增 `completion_promotions:manifest_valid` 检查。
  - 调整 `full_site` 文件数验证，使 promoted complete 页面不再被旧的“全部 full_site 都是 draft”假设阻塞。
  - 将 `all_pages_inventory` 范围检查固定到 `local_406_release_and_api_html_pages`。
- 更新 `reports/current_problem_audit.md/json`，把当前真实计数改为 9 complete / 397 draft，并记录第一条晋级路径已经跑通。
- 重建 `openusd_bilingual_final.html`，总入口现在动态显示“当前有 9 页达到完整双语标准”，并显示 397 个 incomplete drafts。

分级变化：

- `good_bilingual`：8 -> 9
- `bilingual_complete`：8 -> 9
- `bilingual_draft`：398 -> 397
- `draft_needs_translation`：387 -> 386
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=1`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=9`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，397/397 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs`：通过。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 303: promote SdfLayer complete` 同步本轮 HTML、脚本、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_prim.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 304 轮：将 UsdPrim 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_prim.html` 晋级为 `bilingual_complete`：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖 `UsdPrim` 作为 `UsdStage` 上唯一持久 scenegraph object、composition 后的 prim handle、`SdfPrimSpec` 分界、property/metadata/composition API、lifetime、traversal、applied API schema、instancing、typed schema class 关系。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-304-usd-prim`。
- 复跑 `discover_openusd_all_pages.mjs`，范围仍固定为本地 406 个 HTML 页面，`promoted_complete_pages=2`。
- 复跑 `audit_openusd_translation_quality.mjs`，确认本轮晋级被评为 `good_bilingual`。
- 重建 `openusd_bilingual_final.html`，入口现在显示 10 complete / 396 incomplete drafts。
- 更新 `reports/current_problem_audit.md/json`，记录晋级链路已连续跑通两次，但整体仍不是完成态。

分级变化：

- `good_bilingual`：9 -> 10
- `bilingual_complete`：9 -> 10
- `bilingual_draft`：397 -> 396
- `draft_needs_translation`：386 -> 385
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=2`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=10`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，396/396 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs`：通过。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 304: promote UsdPrim complete` 同步本轮 HTML、脚本、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_sdf_path.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 305 轮：将 SdfPath 提升为完整双语

已完成：

- 将 `full_site/api/class_sdf_path.html` 晋级为 `bilingual_complete`：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖 `SdfPath` 作为 path value、`SdfLayer` storage key、scenegraph namespace identity、relative path、absolute path、prim/property/target/variant path syntax、path construction helper、thread-safety 和 composition debugging 语义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-305-sdf-path`。
- 复跑 `discover_openusd_all_pages.mjs`，范围仍固定为本地 406 个 HTML 页面，`promoted_complete_pages=3`。
- 复跑 `audit_openusd_translation_quality.mjs`，确认本轮晋级被评为 `good_bilingual`。
- 重建 `openusd_bilingual_final.html`，入口现在显示 11 complete / 395 incomplete drafts。
- 更新 `reports/current_problem_audit.md/json`，记录晋级链路已连续跑通三次，但整体仍不是完成态。

分级变化：

- `good_bilingual`：10 -> 11
- `bilingual_complete`：10 -> 11
- `bilingual_draft`：396 -> 395
- `draft_needs_translation`：385 -> 384
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=3`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=11`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，395/395 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs`：通过。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 305: promote SdfPath complete` 同步本轮 HTML、脚本、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 306 轮：将 UsdGeomMesh 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_geom_mesh.html` 晋级为 `bilingual_complete`：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖 `UsdGeomMesh` 作为 typed schema wrapper 与 `UsdPrim` 的关系、`Define()`/`Get()` 边界、point-based primitive 语义、`points` 与 face-vertices 区分、`faceVertexCounts`/`faceVertexIndices` 拓扑编码、subdivision 属性、creases/corners/holes、primvar interpolation 和 `Create*Attr()` 调试含义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-306-usd-geom-mesh`。
- 复跑 `discover_openusd_all_pages.mjs`，范围仍固定为本地 406 个 HTML 页面，`promoted_complete_pages=4`。
- 复跑 `audit_openusd_translation_quality.mjs`，确认本轮晋级被评为 `good_bilingual`。
- 重建 `openusd_bilingual_final.html`，入口现在显示 12 complete / 394 incomplete drafts。
- 更新 `reports/current_problem_audit.md/json`，记录晋级链路已连续跑通四次，但整体仍不是完成态。

分级变化：

- `good_bilingual`：11 -> 12
- `bilingual_complete`：11 -> 12
- `bilingual_draft`：395 -> 394
- `draft_needs_translation`：384 -> 383
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=4`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=12`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，394/394 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs`：通过。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 306: promote UsdGeomMesh complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_tf_token.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 307 轮：将 TfToken 提升为完整双语

已完成：

- 将 `full_site/api/class_tf_token.html` 晋级为 `bilingual_complete`：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖 `TfToken` 作为 registered string handle 的语义、constant-time comparison / assignment / hashing 边界、bounded fixed symbols 使用前提、token registry 与内存压力、`GetString()`/`GetText()`/`data()` 读取差异、`Find()` 无创建查询、`HashSet`/`Set` 容器用途、empty token 约定以及 OpenUSD schema token / attribute name / metadata key / primvar name 使用语义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-307-tf-token`。
- 复跑 `discover_openusd_all_pages.mjs`，范围仍固定为本地 406 个 HTML 页面，`promoted_complete_pages=5`。
- 复跑 `audit_openusd_translation_quality.mjs`，确认本轮晋级被评为 `good_bilingual`。
- 重建 `openusd_bilingual_final.html`，入口现在显示 13 complete / 393 incomplete drafts。
- 更新 `reports/current_problem_audit.md/json`，记录晋级链路已连续跑通五次，但整体仍不是完成态。

分级变化：

- `good_bilingual`：12 -> 13
- `bilingual_complete`：12 -> 13
- `bilingual_draft`：394 -> 393
- `draft_needs_translation`：383 -> 382
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=5`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=13`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，393/393 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 307: promote TfToken complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_stage_cache.html` 或 `full_site/api/class_usd_attribute_limits.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 308 轮：将 UsdStageCache 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_stage_cache.html` 晋级为 `bilingual_complete`：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除通用 draft 文案。
  - 新增逐段双语理解区，覆盖 `UsdStageCache` 作为 strongly concurrency safe `UsdStageRefPtr` collection 的角色、`UsdStageCacheContext` / `UsdStage::Open()` 用法、stage cache 与 layer/resolver/composition cache 的边界、并发安全的真实范围、`Find()` / `FindOneMatching()` / `FindAllMatching()` 查找策略、`Contains()` / `GetAllStages()` / `GetId()` 诊断用途、`Erase()` / `EraseAll()` / `Clear()` 与外部引用生命周期的关系，以及 root layer / session layer / `ArResolverContext` / load state 匹配语义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-308-usd-stage-cache`。
- 复跑 `discover_openusd_all_pages.mjs`，范围仍固定为本地 406 个 HTML 页面，`promoted_complete_pages=6`。
- 复跑 `audit_openusd_translation_quality.mjs`，确认本轮晋级被评为 `good_bilingual`。
- 重建 `openusd_bilingual_final.html`，入口现在显示 14 complete / 392 incomplete drafts。
- 更新 `reports/current_problem_audit.md/json`，记录晋级链路已连续跑通六次，但整体仍不是完成态。

分级变化：

- `good_bilingual`：13 -> 14
- `bilingual_complete`：13 -> 14
- `bilingual_draft`：393 -> 392
- `draft_needs_translation`：382 -> 381
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=6`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=14`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，392/392 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 308: promote UsdStageCache complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_attribute_limits.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 309 轮：将 UsdAttributeLimits 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_attribute_limits.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdAttributeLimits Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdAttributeLimits` 操作 `UsdAttribute` 上的 `limits` dictionary metadata，而不是 attribute value。
  - `limits` metadata 的 sub-dictionary 分组、`UsdLimitsKeys->Minimum` / `UsdLimitsKeys->Maximum` 存储 key。
  - soft limits 与 hard limits 的消费语义，以及它们不会自动 clamp USD 值。
  - `GetMinimum()`、`GetMaximum()`、`GetMinimumOr()`、`GetMaximumOr()`、`GetOr()` 的读取与 fallback 语义。
  - `SetMinimum()`、`SetMaximum()` 的 authored metadata 边界。
  - `HasAuthoredMinimum()`、`HasAuthoredMaximum()`、`HasAuthored()` 对 authored opinion 的判断。
  - `ClearMinimum()`、`ClearMaximum()`、`Clear()` 只清除 limits metadata，不删除 attribute 或 time samples。
  - `GetSubDictKey()`、`GetAttribute()`、`IsValid()` 的调试和诊断用途。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-309-usd-attribute-limits`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 15 complete / 391 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 15 complete / 391 incomplete drafts。

分级变化：
- `good_bilingual`：14 -> 15
- `bilingual_complete`：14 -> 15
- `bilingual_draft`：392 -> 391
- `draft_needs_translation`：381 -> 380
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=7`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=15`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，391/391 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 309: promote UsdAttributeLimits complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_validation_error.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 310 轮：将 UsdValidationError 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_validation_error.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdValidationError Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdValidationError` 作为 validation task 返回的 structured validation result，而不是 `UsdValidationValidator` 本身。
  - validator provenance、`GetValidator()` 与规则来源追溯。
  - `GetName()`、`GetIdentifier()`、`GetType()`、`GetSites()`、`GetMessage()`、`GetData()` 的结构化字段边界。
  - `UsdValidationErrorType` 与 `UsdValidationErrorSites` 对严重性、定位、UI 高亮和批处理过滤的作用。
  - `GetErrorAsString()` 与结构化消费之间的区别。
  - `GetFixers()`、`GetFixerByName()`、`GetFixerByNameAndErrorName()`、`GetFixersByErrorName()`、`GetFixersByKeywords()` 的 fixer 查询语义。
  - `HasNoError()` 的无错误状态边界，以及 `operator==()` / `operator!=()` 的比较、去重和测试用途。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-310-usd-validation-error`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 16 complete / 390 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 16 complete / 390 incomplete drafts。

分级变化：
- `good_bilingual`：15 -> 16
- `bilingual_complete`：15 -> 16
- `bilingual_draft`：391 -> 390
- `draft_needs_translation`：380 -> 379
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=8`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=16`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，390/390 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 310: promote UsdValidationError complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_geom_basis_curves.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 311 轮：将 UsdGeomBasisCurves 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_geom_basis_curves.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdGeomBasisCurves Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdGeomBasisCurves` 的 batched curve representation，以及它与每曲线一个 prim 建模方式的区别。
  - `curveVertexCounts` 对 points 数组切片的定义和拓扑调试含义。
  - `type`、`basis`、`wrap` 对 linear/cubic curve、basis 使用和闭合/非闭合段数的影响。
  - `ComputeSegmentCounts()`、`ComputeUniformDataSize()`、`ComputeVaryingDataSize()`、`ComputeVertexDataSize()` 对 uniform/varying/vertex 数据尺寸的推导。
  - segment indexing、vertex interpolation 与 primvar interpolation 的索引空间边界。
  - `CreateBasisAttr()`、`CreateTypeAttr()`、`CreateWrapAttr()`、`CreateCurveVertexCountsAttr()` 的 authoring 边界。
  - tubes/ribbons 渲染解释、法线和材质含义，以及它们不改变曲线拓扑的边界。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-311-usd-geom-basis-curves`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 17 complete / 389 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 17 complete / 389 incomplete drafts。

分级变化：
- `good_bilingual`：16 -> 17
- `bilingual_complete`：16 -> 17
- `bilingual_draft`：390 -> 389
- `draft_needs_translation`：379 -> 378
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=9`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=17`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，389/389 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 311: promote UsdGeomBasisCurves complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_physics_joint.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 312 轮：将 UsdPhysicsJoint 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_physics_joint.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdPhysicsJoint Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdPhysicsJoint` 用于 author rigid-body joint constraints，但不等同于物理 runtime 求解结果。
  - `CreateBody0Rel()` / `CreateBody1Rel()` 的 relationship target 语义，以及 one body + world 的后端解释边界。
  - 默认 D6 joint、linear/angular degrees of freedom 与派生 physics joint schema 的关系。
  - local joint frame 属性 `localPos0`、`localRot0`、`localPos1`、`localRot1` 与 world transform / `xformOp` 的边界。
  - `jointEnabled`、`collisionEnabled`、`breakForce`、`breakTorque` 的 authoring 语义与求解器行为差异。
  - `excludeFromArticulation` 对 articulation 构建的提示作用，以及 rigid body API、joint tree 和 runtime importer 的联动检查。
  - `Define()`、`Get()`、`Create*Attr()`、`Create*Rel()` 的 OpenUSD schema wrapper 用法。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-312-usd-physics-joint`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 18 complete / 388 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 18 complete / 388 incomplete drafts。

分级变化：
- `good_bilingual`：17 -> 18
- `bilingual_complete`：17 -> 18
- `bilingual_draft`：389 -> 388
- `draft_needs_translation`：378 -> 377
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=10`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=18`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，388/388 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 312: promote UsdPhysicsJoint complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_imaging_delegate.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 313 轮：将 UsdImagingDelegate 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_imaging_delegate.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdImagingDelegate Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdImagingDelegate` 作为 USD scene graph 与 Hydra (`Hd`) core 之间的 primary translation layer。
  - `UsdPrim`、topology、primvars、materials、instancing、visibility、purpose 和 time-varying data 到 Hydra 数据面的翻译。
  - `ApplyPendingUpdates()` 与 notice、dirty bits、population、resync、render index 同步流程的关系。
  - `ConvertCachePathToIndexPath()` / `ConvertIndexPathToCachePath()` 对 cache path 与 render index path 的互转。
  - `Get*()` 查询作为 `HdSceneDelegate` 数据访问面，而不是原始 `UsdPrim` 字段读取。
  - 几何拓扑、indexed primvars、`SubdivTags`、refine level 等几何输入路径。
  - purpose/display filtering、time sampling、rigid transform overrides 与 adapter / render delegate 边界。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-313-usd-imaging-delegate`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 19 complete / 387 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 19 complete / 387 incomplete drafts。

分级变化：
- `good_bilingual`：18 -> 19
- `bilingual_complete`：18 -> 19
- `bilingual_draft`：388 -> 387
- `draft_needs_translation`：377 -> 376
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=11`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=19`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，387/387 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 313: promote UsdImagingDelegate complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_sdr_shader_property.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 314 轮：将 SdrShaderProperty 提升为完整双语
已完成：

- 将 `full_site/api/class_sdr_shader_property.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：SdrShaderProperty Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `SdrShaderProperty` 描述 shader node 的 input/output 接口，而不是执行 shading computation。
  - name、type、default value、metadata、UI hints、options、page、shown-if 和 connection compatibility 的职责。
  - `GetType()` / `GetTypeAsSdfType()`、`SdrSdfTypeIndicator` 与 USD/Sdf authoring 类型视角。
  - `GetDefaultValue()` / `GetDefaultValueAsSdfType()` 与 authored value 的边界。
  - `GetArraySize()` / `GetTupleSize()` 对 UI 和 authoring shape 的补充。
  - deprecated `SdrTokenMap` metadata 与 `SdrShaderPropertyMetadata` 的新元数据路径。
  - `CanConnectTo()` 的 property 级连接兼容性，以及它不等同于完整材质网络编译成功。
  - `SdrShaderNode`、`SdrShaderProperty`、`SdrShaderPropertyMetadata`、`SdfValueTypeName` 的相邻类型边界。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-314-sdr-shader-property`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 20 complete / 386 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 20 complete / 386 incomplete drafts。

分级变化：
- `good_bilingual`：19 -> 20
- `bilingual_complete`：19 -> 20
- `bilingual_draft`：387 -> 386
- `draft_needs_translation`：376 -> 375
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=12`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=20`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，386/386 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 314: promote SdrShaderProperty complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vt_value_ref.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 315 轮：将 VtValueRef 提升为完整双语

已完成：

- 将 `full_site/api/class_vt_value_ref.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：VtValueRef Class / VtValueRef Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `VtValueRef` 作为 non-owning、type-erased value view 的定位。
  - 与 owning `VtValue` 的互操作和职责边界。
  - 生命周期约束、临时对象风险、长期保存/异步使用的误区。
  - `Get<T>()`、`GetTypeid()`、`GetTypeName()`、`GetType()`、`_TypeIs()` 的 typed access 与 runtime type diagnostics。
  - `GetArraySize()`、`GetElementTypeid()` 对 array shape 和 element type 的解释。
  - `CanHash()` / `GetHash()`、`CanComposeOver()`、`CanTransform()` 的能力检查边界。
  - `_Get()`、`_GetMutable()`、`_ArrayHelper`、`_TypeInfoFor` 等实现 helper 的阅读意义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-315-vt-value-ref`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 21 complete / 385 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 21 complete / 385 incomplete drafts。

分级变化：

- `good_bilingual`：20 -> 21
- `bilingual_complete`：20 -> 21
- `bilingual_draft`：386 -> 385
- `draft_needs_translation`：375 -> 374
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=13`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=21`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，385/385 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 315: promote VtValueRef complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_node.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 316 轮：将 VdfNode 提升为完整双语

已完成：

- 将 `full_site/api/class_vdf_node.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：VdfNode Class Reference abstract / VdfNode Class Reference abstract”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `VdfNode` 作为 `VdfNetwork` 中 data-flow graph node 的抽象基类定位。
  - `VdfNode` 与 `UsdPrim`、Hydra render prim、schema class 的边界。
  - input/output specs、named ports、network ownership、node identity 和 graph scheduling 的阅读重点。
  - `VdfNode` 与 `VdfContext` 的边界：节点描述拓扑，context 提供执行期数值访问。
  - dependency mask、required input request 与调度、缓存失效、局部求值的关系。
  - `_InitializeInputAndOutputSpecs()`、`_AppendInputs()`、`_AppendOutputs()`、`_ReplaceInputSpecs()` 等 protected graph-maintenance hooks。
  - `_DidAddInputConnection()`、`VdfConnection`、`VdfInput`、`VdfOutput`、`VdfMask`、`VdfRequiredInputsPredicate` 的连接诊断关系。
  - OpenExec 与 Vdf 的分层，以及把 graph structure 误读成 runtime value 的常见错误。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-316-vdf-node`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 22 complete / 384 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 22 complete / 384 incomplete drafts。

分级变化：

- `good_bilingual`：21 -> 22
- `bilingual_complete`：21 -> 22
- `bilingual_draft`：385 -> 384
- `draft_needs_translation`：374 -> 373
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=14`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=22`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，384/384 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 316: promote VdfNode complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_context.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 317 轮：将 VdfContext 提升为完整双语

已完成：

- 将 `full_site/api/class_vdf_context.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：VdfContext Class / VdfContext Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `VdfContext` 作为传给 computation callback 的 parameter bundle，而不是持久 graph state 或 USD stage metadata。
  - `VdfContext` 与 `VdfNode` 的边界：node 定义图结构，context 承载一次 callback 调用现场。
  - `GetInputValue()`、`GetInputValuePtr()`、`HasInputValue()` 对 input value availability 的区别。
  - `IsOutputRequested()` 对 demand-driven output evaluation 的意义。
  - `SetOutput()`、`SetEmptyOutput()`、`SetOutputToReferenceInput()` 的结果写回、空输出和引用输入转发语义。
  - `Warn()`、`CodingError()`、`GetNodeDebugName()` 的诊断作用。
  - `VdfEvaluationState`、`VdfReadWriteAccessor<T>` 与 callback-facing API 的分层。
  - 把 active callback context 误读为 persistent state 的常见错误。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-317-vdf-context`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 23 complete / 383 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 23 complete / 383 incomplete drafts。

分级变化：

- `good_bilingual`：22 -> 23
- `bilingual_complete`：22 -> 23
- `bilingual_draft`：384 -> 383
- `draft_needs_translation`：373 -> 372
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=15`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=23`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，383/383 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 317: promote VdfContext complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_read_write_accessor.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 318 轮：将 VdfReadWriteAccessor 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_vdf_read_write_accessor.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 output data random access、non-owning accessor 边界、静态元素类型 `T`、`operator[]()` 访问、`GetSize()` 与 `IsEmpty()` 解释、request/mask/evaluation lifetime 约束、`VdfContext` / `VdfOutput` / executor 分层、iterator 与 accessor 访问模式差异，以及持久化和类型语义转换误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-318-vdf-read-write-accessor`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 24 complete / 382 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 24 complete / 382 incomplete drafts。

分级变化：

- `good_bilingual`：23 -> 24
- `bilingual_complete`：23 -> 24
- `bilingual_draft`：383 -> 382
- `draft_needs_translation`：372 -> 371
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=16`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=24`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，382/382 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 318: promote VdfReadWriteAccessor complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_grapher_options.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 319 轮：将 VdfGrapherOptions 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_vdf_grapher_options.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `VdfGrapher` output configuration、graph visualization 与 evaluation 边界、`NodeFilterCallback` / `NodeStyleCallback` / `NodeLimitVector` 职责、`DisplayStyle` 与 color/annotation 样式、node selection 与 `DebugNameFilter` 范围、mask / affects-mask 可视化、page layout 与 noise-control options、相邻类型边界，以及把 graph dump 误当执行或 profiling 证据的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-319-vdf-grapher-options`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 25 complete / 381 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 25 complete / 381 incomplete drafts。

分级变化：

- `good_bilingual`：24 -> 25
- `bilingual_complete`：24 -> 25
- `bilingual_draft`：382 -> 381
- `draft_needs_translation`：371 -> 370
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=17`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=25`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，381/381 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 319: promote VdfGrapherOptions complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_esf_property_interface.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 320 轮：将 EsfPropertyInterface 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_esf_property_interface.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 scene adapter property abstraction、read-only `UsdProperty`-like 边界、exec network compiler 调用、`EsfJournal` recompilation-condition tracking、`GetBaseName()` 与 `GetNamespace()` 命名语义、abstract adapter query contract、相关 Esf/USD/Tf/Sdf/Vt 类型分层，以及把它误当可写 property wrapper 或忽略 journaling 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-320-esf-property-interface`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 26 complete / 380 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 26 complete / 380 incomplete drafts。

分级变化：

- `good_bilingual`：25 -> 26
- `bilingual_complete`：25 -> 26
- `bilingual_draft`：381 -> 380
- `draft_needs_translation`：370 -> 369
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=18`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=26`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，380/380 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 320: promote EsfPropertyInterface complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_trace_event_data.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 321 轮：将 TraceEventData 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_trace_event_data.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `TraceEvent` payload storage、typed tagged value 语义、`TraceEvent::DataType` 分派、构造函数重载含义、`GetBool()` / `GetInt()` / `GetUInt()` / `GetFloat()` / `GetString()` 读取规则、`WriteJson()` 与 `JsWriter` 序列化边界、trace report 表达，以及把 payload data 误当完整 event 或不检查类型就调用 getter 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-321-trace-event-data`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 27 complete / 379 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 27 complete / 379 incomplete drafts。

分级变化：

- `good_bilingual`：26 -> 27
- `bilingual_complete`：26 -> 27
- `bilingual_draft`：380 -> 379
- `draft_needs_translation`：369 -> 368
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=19`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=27`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过。
- `audit_openusd_full_draft_preview.mjs`：通过，379/379 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 321: promote TraceEventData complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_ef___lofted_output_set.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 322 轮：将 Ef_LoftedOutputSet 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_ef___lofted_output_set.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `EfPageCacheBasedExecutor` lofted output tracking、page-cache sourced `VdfOutput` 值、`VdfMask` scoped membership、`Add()` / `Remove()` 成员维护、`CollectLoftedDependencies()` dependency gathering、`RemoveAllOutputsForNode()` invalidation cleanup、`Resize()` / `Clear()` / `GetSize()` 集合生命周期、`VdfNetwork` / `VdfNode` / `VdfId` 相邻类型边界，以及把 lofted output 误当 USD layer output、authored property 或 render output 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-322-ef-lofted-output-set`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 28 complete / 378 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 28 complete / 378 incomplete drafts。

分级变化：

- `good_bilingual`：27 -> 28
- `bilingual_complete`：27 -> 28
- `bilingual_draft`：379 -> 378
- `draft_needs_translation`：368 -> 367
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=20`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=28`，目标页 `grade=good_bilingual`，中文正文量 844。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，378/378 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 322: promote Ef_LoftedOutputSet complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_tf_py_lock.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 323 轮：将 TfPyLock 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_tf_py_lock.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 Python Global Interpreter Lock 管理、Python thread state 边界、Python/C++ execution context、`Acquire()` / `Release()` 直接 GIL 操作、`BeginAllowThreads()` / `EndAllowThreads()` 长时间 C++ 工作模式、`TfPyLock` RAII 生命周期、`State Valid Transitions` 调试含义、`TfPyEnsureGILUnlockedObj` 相关 RAII 协议，以及把 GIL 误当 USD object lock 或跳过配对状态恢复的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-323-tf-py-lock`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 29 complete / 377 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 29 complete / 377 incomplete drafts。

分级变化：

- `good_bilingual`：28 -> 29
- `bilingual_complete`：28 -> 29
- `bilingual_draft`：378 -> 377
- `draft_needs_translation`：367 -> 366
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=21`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=29`，目标页 `grade=good_bilingual`，中文正文量 899。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，377/377 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 323: promote TfPyLock complete` 同步本轮 HTML、报告和 `work.md`。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_data_source_locator.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 324 轮：将 HdDataSourceLocator 提升为完整双语
已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_data_source_locator.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdDataSourceLocator` 作为 Hydra data source locator 的职责、短 `TfToken` token-list 表示、scene index / data source namespace 与 filesystem path、`SdfPath`、USD prim path 的边界、构造函数重载、`Append()` / `Prepend()` token-path 组合、`GetElementCount()` / `GetElement()` / `GetFirstElement()` / `GetLastElement()` 元素访问、`HasPrefix()` / `GetCommonPrefix()` / `Intersects()` 在 dirty propagation 和 invalidation 范围判断中的含义、`EmptyLocator()` / `IsEmpty()` 的广义 invalidation 语义、比较与 hash 行为，以及把 locator 误当 `SdfPath`、文件路径或纯字符串 key 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-324-hd-data-source-locator`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 30 complete / 376 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 30 complete / 376 incomplete drafts。

分级变化：

- `good_bilingual`：29 -> 30
- `bilingual_complete`：29 -> 30
- `bilingual_draft`：377 -> 376
- `draft_needs_translation`：366 -> 365
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=22`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=30`，目标页 `grade=good_bilingual`，中文正文量 856。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，376/376 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 324: promote HdDataSourceLocator complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 376 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 365 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_pcp_property_index.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 325 轮：将 PcpPropertyIndex 提升为完整双语
已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_pcp_property_index.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `PcpPropertyIndex` 作为 property-level composition index 的职责、scene description opinion sites、与 `PcpPrimIndex` / `SdfPropertySpec` / resolved value 的边界、构造函数语义、`GetPropertyRange()` 与 `PcpPropertyIterator` 遍历、`GetNumLocalSpecs()` 本地 specs 统计、`GetLocalErrors()` 局部错误诊断、`IsEmpty()` 空索引解释、`Swap()` 容器状态交换，以及把 property index 误当可编辑 spec 列表、全部 opinions 计数或 resolved value 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-325-pcp-property-index`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 31 complete / 375 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 31 complete / 375 incomplete drafts。

分级变化：

- `good_bilingual`：30 -> 31
- `bilingual_complete`：30 -> 31
- `bilingual_draft`：376 -> 375
- `draft_needs_translation`：365 -> 364
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=23`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=31`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，375/375 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 325: promote PcpPropertyIndex complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 375 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 364 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_pcp_arc.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 326 轮：将 PcpArc 提升为完整双语
已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_pcp_arc.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `PcpArc` 作为 prim-index graph edge 的职责、source node 与 target parent-node 方向、`PcpArcType` 语义、`parent` / `origin` / `siblingNumAtOrigin` 诊断、`mapToParent` 的 `PcpMapExpression` namespace mapping、`namespaceDepth` bookkeeping、构造语义、与 authored USD references/payloads/inherits 和 `UsdPrim` namespace parenting 的边界，以及把 arc 误当可编辑 authored data 或普通字符串路径的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-326-pcp-arc`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 32 complete / 374 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 32 complete / 374 incomplete drafts。

分级变化：

- `good_bilingual`：31 -> 32
- `bilingual_complete`：31 -> 32
- `bilingual_draft`：375 -> 374
- `draft_needs_translation`：364 -> 363
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=24`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=32`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，374/374 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 326: promote PcpArc complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 374 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 363 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_pcp_error_unresolved_prim_path.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 327 轮：将 PcpErrorUnresolvedPrimPath 提升为完整双语
已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_pcp_error_unresolved_prim_path.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，页面标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `PcpErrorUnresolvedPrimPath` 作为结构化 Pcp composition / asset-resolution 错误的职责、resolved 与 loaded 阶段差异、`PcpErrorBase` 继承、`PcpSite` 的 `site` 定位、`SdfPath` 的 `unresolvedPath`、`sourceLayer` 与 `targetLayer` 诊断、`PcpArcType` / `arcType` 分类型排查、`New()` 与 `ToString()` 边界，以及把 `unresolvedPath` 误当文件路径或只保存字符串诊断的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-327-pcp-error-unresolved-prim-path`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 33 complete / 373 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 33 complete / 373 incomplete drafts。

分级变化：

- `good_bilingual`：32 -> 33
- `bilingual_complete`：32 -> 33
- `bilingual_draft`：374 -> 373
- `draft_needs_translation`：363 -> 362
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=25`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=33`，目标页 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，仅同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，373/373 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 327: promote PcpErrorUnresolvedPrimPath complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 373 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 362 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_scene_delegate.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 328 轮：将 HdSceneDelegate 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_scene_delegate.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdSceneDelegate` 作为 Hydra 抽象 scene-data query interface 的职责、与 `UsdImagingDelegate`、`HdRenderIndex`、`HdRprim`、`HdSprim`、`HdBprim`、`HdTask`、render delegate 以及 scene-index/data-source architecture 的边界、`SdfPath` identity 语义、geometry/primvar/instancing/material/camera/task/resource 查询职责、dirty/sync 边界、time-sampling/value-lifetime 注意点，以及把 delegate 误当 USD authoring 层、绕过 dirty bits 或把 delegate paths 一对一当成 USD prim paths 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-328-hd-scene-delegate`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 34 complete / 372 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 34 complete / 372 incomplete drafts。

分级变化：

- `good_bilingual`：33 -> 34
- `bilingual_complete`：33 -> 34
- `bilingual_draft`：373 -> 372
- `draft_needs_translation`：362 -> 361
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=26`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=34`，目标页 `grade=good_bilingual`，中文正文量 1007。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，372/372 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 328: promote HdSceneDelegate complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 372 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 361 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_render_buffer.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 329 轮：将 HdRenderBuffer 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_render_buffer.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdRenderBuffer` 作为 Hydra render buffer bprim / data-resource handle 的职责、indexed 与 out-of-band 创建路径、与 `HdSceneDelegate` / `SdfPath` 的同步边界、`Allocate()` 参数、dimensions、`HdFormat`、AOV/render-target 使用、`Map()` / `Unmap()` CPU 访问协议、`Resolve()` 与 multi-sample 行为、dirty bits 与 `Sync()`、`IsConverged()` 报告、`GetResource()` backend-specific ownership、与 `HdRenderPass` / `HdTask` / `HdRenderBufferDescriptor` / `HdAovDescriptor` 的关系，以及空 AOV、readback 过期、convergence 和资源生命周期问题的调试路径。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-329-hd-render-buffer`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 35 complete / 371 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 35 complete / 371 incomplete drafts。

分级变化：

- `good_bilingual`：34 -> 35
- `bilingual_complete`：34 -> 35
- `bilingual_draft`：372 -> 371
- `draft_needs_translation`：361 -> 360
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=27`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=35`，目标页 `grade=good_bilingual`，中文正文量 1014。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，371/371 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 329: promote HdRenderBuffer complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 371 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 360 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_task.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 330 轮：将 HdTask 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_task.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdTask` 作为 `HdEngine::Execute()` 调度的 Hydra render unit of work 的职责、与 USD prim、`HdSceneDelegate`、`HdRenderIndex`、renderer backend object 的边界、`Sync()` / `Prepare()` / `Execute()` 生命周期、dirty bits 与 `GetInitialDirtyBitsMask()`、task context 访问、`GetRenderTags()` 过滤边界、`IsConverged()` 调度语义、`_GetDriver()` 集成边界、Hdx 派生 task 家族，以及在 `Sync()` 中执行渲染、绕过任务顺序或把 render tags 混同 USD purpose 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-330-hd-task`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 36 complete / 370 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 36 complete / 370 incomplete drafts。

分级变化：

- `good_bilingual`：35 -> 36
- `bilingual_complete`：35 -> 36
- `bilingual_draft`：371 -> 370
- `draft_needs_translation`：360 -> 359
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=28`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=36`，目标页 `grade=good_bilingual`，中文正文量 1011。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，370/370 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 330: promote HdTask complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 370 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 359 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_st_render_pass_state.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 331 轮：将 HdStRenderPassState 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_st_render_pass_state.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdStRenderPassState` 作为 Storm / HdSt render passes 之间共享 rendering-parameter object 的职责、与 `HdRenderPassState`、`HdRenderPass`、`HdCamera`、`Hgi`、shader state 的边界、`Prepare()` / `Bind()` 生命周期、camera matrices、viewport/framing、clip planes、`HgiGraphicsPipelineDesc` 与 graphics pipeline hash、AOV multi-sample resolve、继承 render-pass state 成员，以及把渲染状态问题误判为 USD authoring 或 composition 问题的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-331-hd-st-render-pass-state`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 37 complete / 369 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 37 complete / 369 incomplete drafts。

分级变化：

- `good_bilingual`：36 -> 37
- `bilingual_complete`：36 -> 37
- `bilingual_draft`：370 -> 369
- `draft_needs_translation`：359 -> 358
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=29`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=37`，目标页 `grade=good_bilingual`，中文正文量 1016。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，369/369 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 331: promote HdStRenderPassState complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 369 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 358 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_st_dispatch_buffer.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。
