# 工作记录

## 第 230 轮：PropertyHints、RadianceBase、Field3DAsset、usdLux 与 RenderPass 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `8f5ca14`，当前分级仍为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdLux/usdLux_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_099.mjs`，每页插入 `release-quality-pass-099` 二次精修导读区块，补充 property UI hints、ParticleField radiance applied schema、Field3D 外部 `.f3d` 资源、usdLux 灯光 schema 导航和 RenderPass 多 pass 渲染配置的中文阅读说明与术语对照。
- 本轮审计指标：目标页分别达到 `PropertyHints.html` 532 字 24/18、`ParticleFieldRadianceBaseAPI.html` 535 字 24/17、`Field3DAsset.html` 537 字 24/17、`usdLux_toc.html` 510 字 24/16、`RenderPass.html` 502 字 24/18；5 页均保持 `draft_needs_translation`，`badEncodingCount=0`，`unexpectedOfficialLinks=0`。
- 重新运行 `audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1`：质量分级保持不变是预期结果，链接路由 `files_changed=0`，draft 预览 398/398 通过，总体验证 `PASSED`，281 checks passed / 0 failed。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 230: property radiance field lux renderpass pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：最多处理 `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/tut_inspect_and_author_props.html`、`full_site/api/functions_vars_q.html`、`full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 229 轮：usdUI hints、usdRender 目录、变量索引 P 与 TsTest 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `e22ba44`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/api/functions_vars_p.html`、`full_site/api/page_ts_ts_test.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强较薄的 usdUI hints、usdRender 目录、API 变量索引 P 段和 TsTest 框架页，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_098.mjs`，每页插入 `release-quality-pass-098` 二次精修导读区块，覆盖 `ObjectHints` 的 `uiHints`、`displayName`、`hidden` 和 UI metadata 边界，`PrimHints` 的 `displayGroupsExpanded`、`displayGroupsShownIf`、`displayGroup` 与条件显示规则，`usdRender_toc.html` 的 `RenderSettings`/`RenderProduct`/`RenderVar`/`RenderPass` 阅读路线，`functions_vars_p.html` 的 Pcp/token struct/class member variable 索引用法，以及 `page_ts_ts_test.html` 的 TsTest framework/backend/baseline/grapher 分工；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`ObjectHints.html` 的 UI metadata 与核心场景数据区分、`uiHints` dictionary、`displayName`、`hidden` 和 DCC tool UI；`PrimHints.html` 的 display groups 展开/条件显示、`widgetReadOnlyMode == 0` 表达式和 property `displayGroup`；`usdRender_toc.html` 的 Overview、Best Practices、RenderSettings、RenderProduct、RenderVar、RenderPass 和默认渲染入口；`functions_vars_p.html` 的 `PcpLayerStackIdentifier`、`PcpPrimIndexOutputs`、`UsdRenderTokensType`、`CameraUtilFraming` 和跨模块变量索引；`page_ts_ts_test.html` 的 `tsTest_Evaluator`、`tsTest_SampleTimes`、`TsTest_Grapher`、`tsTest_CompareBaseline`、backend 和 baseline。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。按质量审计口径，目标页中文正文量提升到 `482-536` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 229: ui render index tstest pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdLux/usdLux_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 228 轮：ParticleField kernel、PositionBase 与 RenderVar 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `7c989a4`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强较薄的 ParticleField kernel、position base schema 和 usdRender 输出变量页，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_097.mjs`，每页插入 `release-quality-pass-097` 二次精修导读区块，覆盖 `GaussianSurflet` 的 XY plane / Gaussian falloff / off-plane opacity，`ConstantSurflet` 的 step-function falloff 和 bounded circular disk，`PositionBaseAPI` 的 particle count / per-particle data 对齐规则，`RenderVar` 的 AOV / `sourceName` / `sourceType` / LPE 语义，以及 `ParticleFieldKernelBaseAPI` 的 spatial basis function 和 validation contract；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`ParticleFieldKernelGaussianSurfletAPI.html` 的 `XY plane`、`Gaussian falloff`、`3-sigma point`、`splat support` 和 `per-splat opacity`；`ParticleFieldKernelConstantSurfletAPI.html` 的 `step-function falloff`、`radius 1 disk`、`planar ellipse` 和硬边界支持；`ParticleFieldPositionBaseAPI.html` 的 positions 数量决定粒子数量、数组截断/丢弃/default value 回退；`RenderVar.html` 的 AOV、`sourceName`、`sourceType`、`dataType`、`C<RD>[<L.>O]` LPE 示例和 `RenderSettings`/`RenderProduct`/`RenderVar` 分工；`ParticleFieldKernelBaseAPI.html` 的 kernel data、applied schema、characteristics schemas 和具体 kernel 页面阅读顺序。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。按质量审计口径，目标页中文正文量提升到 `461-513` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 228: particle kernels render var pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/api/functions_vars_p.html`、`full_site/api/page_ts_ts_test.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 227 轮：usdVol/usdUI 目录、VolumeFieldAsset、Namespace List 与 GaussianEllipsoid 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `8588cf1`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/usdVol_toc.html`、`full_site/release/user_guides/schemas/usdUI/usdUI_toc.html`、`full_site/api/namespaces.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是转向较薄的 release schema 目录、具体 schema 属性页、Doxygen namespace 列表和 ParticleField kernel API，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_096.mjs`，每页插入 `release-quality-pass-096` 二次精修导读区块，覆盖 `VolumeFieldAsset` 属性语义、`usdVol` 目录阅读路线、`usdUI` UI hints/accessibility/node graph 入口、Doxygen `Namespace List` 导航边界和 `ParticleFieldKernelGaussianEllipsoidAPI` 的 Gaussian ellipsoid kernel；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`VolumeFieldAsset.html` 的 `filePath`、`fieldName`、`fieldIndex`、`fieldDataType`、`vectorDataRoleHint` 和 `field:*` relationship 区分；`usdVol_toc.html` 的 `Volume`、`FieldBase`、`OpenVDBAsset`、`Field3DAsset`、`ParticleField` 阅读顺序；`usdUI_toc.html` 的 `ObjectHints`、`PrimHints`、`PropertyHints`、`AttributeHints`、`AccessibilityAPI`、`Backdrop` 和 node graph UI；`namespaces.html` 的 `pxr_tsl`、`ShaderMetadataHelpers`、`VdfTestUtils` 和 namespace/class/file/module 索引区别；`ParticleFieldKernelGaussianEllipsoidAPI.html` 的 `standard deviation`、`3-sigma point`、`Gaussian falloff`、`splat support` 和 soft boundary。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `538-561` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 227: schema toc namespaces gaussian pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：继续处理较薄且用户可读价值较高的 release/schema/API 页面，最多处理 `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 226 轮：File Members C/E/J/G 与宏定义索引二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `6685010`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_func_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_defs.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 函数页、宽索引和宏定义索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_095.mjs`，每页插入 `release-quality-pass-095` 二次精修导读区块，覆盖 namespace edit 合并、Ef/Exec 执行系统、Js JSON 工具、Gf 数学/几何函数和跨模块宏定义索引；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_func_c.html` 的 `CombineError()`、`CombineResult()`、`CombineUnbatched()`、`namespaceEdit.h` 和 batched namespace edits；`globals_e.html` 的 `EfGetFirstValidInputValue()`、`EfInputValueBlockVector`、`Exec_ComputationBuilderProviderTypes`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、callback 和 validation error；`globals_func_j.html` 的 `JsConvertToContainerType()`、`JsFindValue()`、JSON parse/write 和 serialization；`globals_func_g.html` 的 `GfAbs()`、`GfClamp()`、`GfCompMult()`、gamma/display-linear conversion、closest point query 和 overload；`globals_defs.html` 的 `AR_*` resolver macros、`ARCH_*` platform macros、`EXEC_*`、`TF_*`、`GF_*`、`NDR_*`、`SDF_*`、`USD_*` macro prefix 分流。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `610-716` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 226: file members c e j g defs pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：转向仍较薄且用户可读价值较高的 release/schema/API 入口页，最多处理 `full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/usdVol_toc.html`、`full_site/release/user_guides/schemas/usdUI/usdUI_toc.html`、`full_site/api/namespaces.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 225 轮：File Members E/O/L 函数页与根/T 索引二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `2c48082`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_func_e.html`、`full_site/api/globals_func_o.html`、`full_site/api/globals_func_l.html`、`full_site/api/globals.html`、`full_site/api/globals_t.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 根索引、宽索引、短函数页和运算符重载页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_094.mjs`，每页插入 `release-quality-pass-094` 二次精修导读区块，覆盖 Ef 输入值选择、UsdSkel/Gf/Sdf/Usd 运算符重载、UsdPhysics range parse utilities、File Members 根索引、Tf 宏和基础设施入口、头文件来源、函数族归属、宏/运算符语义和跨页跳转顺序；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_func_e.html` 的 `EfGetFirstValidInputValue()`、`firstValidInputValue.h`、execution input selection 和 evaluation cache；`globals_func_o.html` 的 `operator+()`、`operator==()`、stream operator、indexed weights、header ownership 和 symbol semantics；`globals_func_l.html` 的 `LoadUsdPhysicsFromRange()`、`parseUtils.h`、UsdPhysics parse utilities、range input 和错误处理；`globals.html` 的 File Members root、`AR_*` resolver registration macros、`ARCH_*` platform abstraction 和按前缀分流；`globals_t.html` 的 `TF_*` macros、static tokens、registry macro、debug code、weak pointer macro 和 Python bridge。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `600-744` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 225: file members e o l root t pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：优先最多处理 `full_site/api/globals_func_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_defs.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 224 轮：File Members U/W/G/P 与 Authoring Variants 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `1f87d76`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/globals_u.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_g.html`、`full_site/api/globals_p.html`、`full_site/release/tut_authoring_variants.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 File Members 宽索引、Work 函数索引和 Authoring Variants 教程页的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_093.mjs`，每页插入 `release-quality-pass-093` 二次精修导读区块，覆盖 File Members 宽索引与函数索引的区别、模块归属、头文件来源、Work 并行工具、Gf 数学符号、Pcp 组合系统、variant authoring 步骤、跨页跳转顺序和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`globals_u.html` 的 `USD_*` token、validator tokens、schema tokens、header provenance 和跨模块符号；`globals_func_w.html` 的 Work concurrency limit、parallel loop、parallel reduce、parallel sort、detached task 和 scoped parallelism；`globals_g.html` 的 Gf tolerance、vector/matrix/quaternion/dual quaternion、ray/plane 和 gamma/color 入口；`globals_p.html` 的 Pcp composition、layer stack identifier、path translation、prim index 和宽符号索引；`tut_authoring_variants.html` 的 `variant set`、`variant selection`、`GetVariantEditContext()`、LIVERPS strength ordering 和非破坏性资产变体。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `606-642` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 224: globals u w g p variants pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：优先最多处理 `full_site/api/globals_func_e.html`、`full_site/api/globals_func_o.html`、`full_site/api/globals_func_l.html`、`full_site/api/globals.html`、`full_site/api/globals_t.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 223 轮：Hydra/Hdx 入口、File Members P/T 与 Class Members-A 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `be0350d`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/hdx_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/globals_func_p.html`、`full_site/api/functions_a.html`、`full_site/api/globals_func_t.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Hydra/Hdx 模块入口、File Members 函数索引 P/T 和 Class Members A 索引的中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_092.mjs`，每页插入 `release-quality-pass-092` 二次精修导读区块，覆盖 Doxygen 字母桶、Hydra 模块边界、Hdx 任务层、Pcp/Tf 函数族归属、Class Members A 段导航、跨页跳转顺序和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`hdx_page_front.html` 的 Hdx task/controller、selection/picking、viewport workflow 和 Hdx/HdSt/Hgi/UsdImaging 边界；`hd_page_front.html` 的 render index、scene delegate、scene index、task、buffer source 和 data source；`globals_func_p.html` 的 Pcp composition site、prim/property index、path translation 和 layer stack；`functions_a.html` 的 Class Members A 段按 Ar/Sdf/Usd/Hd/Tf 模块筛选方法；`globals_func_t.html` 的 Tf infrastructure、Trace、TfToken、TfType、TfNotice、TfPy 和线程/Python bridge 辅助入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `628-663` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个 `bilingual_draft` 页面全部具备本地可检查 HTML 和最终入口链接，`failed_pages` 为 0。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总体验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步结果：验证通过后使用提交信息 `OpenUSD bilingual round 223: hydra hdx file members a pass` 同步本轮 HTML、脚本、报告和 `work.md`，并通过 `git log` 与远端 main 校验推送结果。
- 下一轮目标：优先最多处理 `full_site/api/globals_u.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_g.html`、`full_site/api/globals_p.html`、`full_site/release/tut_authoring_variants.html`；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 222 轮：API S/B 函数索引、B 总索引与 namespace typedefs 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `9d91bb0`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_s.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/functions_b.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen 函数索引、类成员总索引和 namespace typedefs 页中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_091.mjs`，每页插入 `release-quality-pass-091` 二次精修导读区块，覆盖 Doxygen 字母桶、函数/类型别名索引、模块归属、容器与执行系统条目边界、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_s.html` 的 Embree sampler、Hydra scene delegate、UsdImaging adapter、Sdf file format、Vdf scheduler 和 scoped lock；`namespacemembers_type.html` 的 `pxr_tsl`、`robin_pg_map`、`robin_pg_set`、typedef index 与 robin hood hashing；`functions_b.html` 的 Sdf/Tf/Vt 容器视图、Vdf parallel evaluation、Ef page cache、prim traversal 和 diagnostics；`functions_func_b.html` 的容器、Ef/Vdf execution graph、Glf/Hd/HdSt 渲染支撑、Ar resolver、Trace 和 UsdShade binding；`functions_func.html` 的 function index root、execution network、Trace reporter、Storm buffer/texture、scene index plugins、resource registry 和 connectable API behavior。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `577-690` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步：验证通过后以 `OpenUSD bilingual round 222: api index s b typedef root pass` 同步本轮 HTML、脚本、报告和 `work.md`；下一轮优先最多处理 `full_site/api/hdx_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/globals_func_p.html`、`full_site/api/functions_a.html`、`full_site/api/globals_func_t.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 221 轮：API V/T、HdStorm、HelloWorld 与 File Members-H 二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `45d5c96`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_v.html`、`full_site/api/functions_vars_t.html`、`full_site/api/hd_storm_page_front.html`、`full_site/release/tut_helloworld.html`、`full_site/api/globals_h.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen 函数/变量索引、模块入口、教程页和 File Members 索引中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_090.mjs`，每页插入 `release-quality-pass-090` 二次精修导读区块，覆盖 Doxygen 字母桶、函数/变量成员索引、模块 front page、教程路径、File Members 字母桶、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_v.html` 的 validation context、attribute limits、schema 跳转、attribute query 和 Vdf vector/data manager；`functions_vars_t.html` 的 token tables、Pcp relocation diagnostics、physics descriptor、named texture handle、schema info 和 connection source info；`hd_storm_page_front.html` 的 real-time Hydra renderer plugin、Hydra render delegate、Hgi backend abstraction 和 HdSt/HdStorm 边界；`tut_helloworld.html` 的 `Usd.Stage.CreateNew`、typed prim、prim path 层级和 `HelloWorld.usda`；`globals_h.html` 的 `hash_value()`、`token.h`、`stageLoadRules.h`、Hio OpenVDB helper 和头文件来源。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `586-674` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步：验证通过后以 `OpenUSD bilingual round 221: api index v t storm hello globals h pass` 同步本轮 HTML、脚本、报告和 `work.md`；下一轮优先最多处理 `full_site/api/functions_func_s.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/functions_b.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 220 轮：API E/related/namespace/A/I 索引页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `b4b1df0`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_e.html`、`full_site/api/functions_rela.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/functions_func_a.html`、`full_site/api/functions_func_i.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引、related functions 和 namespace functions 索引中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_089.mjs`，每页插入 `release-quality-pass-089` 二次精修导读区块，覆盖 Doxygen 字母桶、函数成员索引、namespace ownership、related function 边界、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_e.html` 的 time code、namespace edits、Ef/Vdf execution cache 和 prim range；`functions_rela.html` 的 `UsdShadeMaterialBindingAPI`、material binding、collection-based binding 和 binding strength；`namespacemembers_func.html` 的 `ShaderMetadataHelpers`、`VdfTestUtils`、`operator<<()` 和 debugging output group；`functions_func_a.html` 的 scoped locks、Trace visitor、Sdf namespace edit、population mask、Hydra/Storm shader 和 change tracker；`functions_func_i.html` 的 stage cache id、Pcp map expression/function、Sdf file format、Hydra buffer range、memory diagnostics 和 Vdf scheduling。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `590-711` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步：验证通过后以 `OpenUSD bilingual round 220: api index e related namespace a i pass` 同步本轮 HTML、脚本、报告和 `work.md`；下一轮优先最多处理 `full_site/api/functions_func_v.html`、`full_site/api/functions_vars_t.html`、`full_site/api/hd_storm_page_front.html`、`full_site/release/tut_helloworld.html`、`full_site/api/globals_h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 219 轮：API G/F/L/Q 与 File Members-H 索引页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `b878abd`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_g.html`、`full_site/api/functions_func_f.html`、`full_site/api/functions_func_l.html`、`full_site/api/functions_q.html`、`full_site/api/globals_func_h.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引和 File Members 函数索引中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_088.mjs`，每页插入 `release-quality-pass-088` 二次精修导读区块，覆盖 Doxygen 字母桶、函数成员索引、文件级函数索引、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_g.html` 的 Hydra/Storm resource registry、buffer array、Hgi backend、Gf matrix、Exec cache view 与 data source container；`functions_func_f.html` 的 Sdf field/spec、Pcp inputs、Vdf registry、Hgi blit、Hydra prim 和 dense hash containers；`functions_func_l.html` 的 UsdLux light base、Sdf layer/spec、UsdStage load rules、Plug/Tf module、Hd scene index plugin、Trace/Vdf stats；`functions_q.html` 的短 Q 段索引、volume token、Sdf query 与 CLI `ConfigBase`；`globals_func_h.html` 的 `hash_value()`、`token.h`、`stageLoadRules.h`、Hio OpenVDB helper 和头文件来源。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `598-694` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步：验证通过后以 `OpenUSD bilingual round 219: api index g f l q h pass` 同步本轮 HTML、脚本、报告和 `work.md`；下一轮优先最多处理 `full_site/api/functions_e.html`、`full_site/api/functions_rela.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/functions_func_a.html`、`full_site/api/functions_func_i.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 218 轮：API J/U/P/R 与 HdSt 入口页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `e2512e4`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_j.html`、`full_site/api/globals_func_u.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_r.html`、`full_site/api/hd_st_page_front.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引、File Members 函数索引和 HdSt 模块入口页中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_087.mjs`，每页插入 `release-quality-pass-087` API 索引或模块入口页二次精修导读区块，覆盖 Doxygen 字母索引阅读方式、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_j.html` 的 J 段短索引、physics joint descriptor、skeleton animation query、path object、CRTP option base 与 JSON writer；`globals_func_u.html` 的 collection membership、flatten layer stack、stage metrics、connectable behavior 与 asset localization；`functions_func_p.html` 的 predicate parameters、parser plugin、particle field kernel、Pcp composition 与 render delegate；`functions_func_r.html` 的 resource read path、file format reader、list proxy、read-write accessor、Hydra buffer range 与 frame recorder；`hd_st_page_front.html` 的 Storm implementation layer、`renderIndex`、command buffer、GPU resource sharing、cached playback 与 dirty bits。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `568-642` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- GitHub 同步：验证通过后以 `OpenUSD bilingual round 218: api index j u p r hdst pass` 同步本轮 HTML、脚本、报告和 `work.md`；下一轮优先最多处理 `full_site/api/functions_func_g.html`、`full_site/api/functions_func_f.html`、`full_site/api/functions_func_l.html`、`full_site/api/functions_q.html`、`full_site/api/globals_func_h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 217 轮：API C/D/J/V/Hio 索引与模块入口页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `8e5acca`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_c.html`、`full_site/api/globals_func_v.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_d.html`、`full_site/api/hio_page_front.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页、File Members 函数索引和模块入口页中文阅读方法，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_086.mjs`，每页插入 `release-quality-pass-086` API 索引或模块入口页二次精修导读区块，覆盖 Doxygen 字母桶、File Members 与模块 front page 的阅读方式、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_c.html` 的 Pcp prim index/namespace edits、Ef page cache、ExecIr/Vdf type dispatch、Trace/TfMallocTag、HdBasisCurvesTopology、CameraUtil 和 applied API schema；`globals_func_v.html` 的 Vdf file-level functions、data manager vector、network traversal、masked output vector、parallel evaluation、schedule task 和 `VtDictionaryGet()`；`functions_vars_j.html` 的 `UsdPhysicsD6JointDesc`、`UsdPhysicsJointDesc`、`UsdPhysicsCustomTokens`、`UsdSkelTokensType` 和 `HdEmbreeConfig`；`functions_d.html` 的 Gf math、Tf/Vt runtime containers、Vdf executor data manager、physics joint drive、SdfZipFile、UsdImaging、TraceEvent 和 RenderVar/token；`hio_page_front.html` 的 Hydra Resource I/O、`HioGlslfx`、`HioImage`、`HioStb_Image`、`HioOIIO_Image`、`HioFieldTextureData` 和 image file format 指南入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `575-620` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 217: api index c d j v hio pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_j.html`、`full_site/api/globals_func_u.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_r.html`、`full_site/api/hd_st_page_front.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 216 轮：API U/G/M related-S 索引页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `836972a`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_u.html`、`full_site/api/functions_vars_g.html`、`full_site/api/functions_g.html`、`full_site/api/functions_func_m.html`、`full_site/api/functions_rela_s.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_085.mjs`，每页插入 `release-quality-pass-085` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方式、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_u.html` 的 UsdStage/UsdPrim/material binding、population mask、Hydra/Storm shader/time sample/render buffer、Vt/Gf 值类型、Vdf executor data vector、Trace/Tf 工具；`functions_vars_g.html` 的 token table、HdMeshReprDesc、UsdImagingGLEngine 参数、UsdPhysicsSceneDesc、CLI App 和 `OptionBase<CRTP>`；`functions_g.html` 的 Hydra/Storm buffer registry、Hgi/HgiGL、schema token、ArResolverContext、Exec cache、Gf matrix 和 Hd data source；`functions_func_m.html` 的 Sdf expression、UsdGeom、schema registry、composition map、UsdEditTarget、Hydra render tracking、Trace、Vdf 和 Tf 工具；`functions_rela_s.html` 的 Sdf predicate/path expression、JsValue、Vdf connector/mask/node set 和 Vt value container。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `537-604` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 216: api index u g m related s pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_c.html`、`full_site/api/globals_func_v.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_d.html`、`full_site/api/hio_page_front.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 215 轮：API W/F/K related-H 索引页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `e75e5c8`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_w.html`、`full_site/api/functions_f.html`、`full_site/api/functions_k.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_w.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_084.mjs`，每页插入 `release-quality-pass-084` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方式、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_w.html` 的 Work/Vdf/Ef task/wait/write、Sdf expression、Ar/Hio/Sdf writable asset 与 Trace/JsWriter/Hgi；`functions_f.html` 的 token table、field definition、schema registry、file format、Sdr discovery、Hgi blit、Hydra/RenderMan adapter 和 physics descriptor；`functions_k.html` 的 SdfChildrenView、notice、validation metadata、UsdPhysics token、HioGlslfxResourceLayout、predicate function call 和 model/schema API；`functions_rela_h.html` 的 Gf 数学 related functions、ArResolverContext、PcpInstanceKey、Sdf/Tf/UsdStage 基础设施；`functions_w.html` 的 Work/Vdf/Ef、Sdf/Pcp/Tf、Gf Vec4、UsdShade/UsdSkel/UsdGeom/UsdHydra token、Ar/Hio/Trace/JsWriter/Glf/SdfFileFormat 条目。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。目标页中文正文量提升到 `532-604` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 215: api index w f k related h pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_func_u.html`、`full_site/api/functions_vars_g.html`、`full_site/api/functions_g.html`、`full_site/api/functions_func_m.html`、`full_site/api/functions_rela_s.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 214 轮：API functions/variables 总索引 C/H/R/root 页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `4847415`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_func_c.html`、`full_site/api/functions_vars_h.html`、`full_site/api/functions_func_h.html`、`full_site/api/functions_vars_r.html`、`full_site/api/functions.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_083.mjs`，每页插入 `release-quality-pass-083` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_func_c.html` 的 create/compute/compose/connect 语义、Pcp/Sdf/UsdCollection、Trace/Vdf、CameraUtil、Hydra topology 和 applied API schema；`functions_vars_h.html` 的 UsdPhysics shape descriptor、HdSt named texture handle、UsdPrimCompositionQuery filter、TsRegressionPreventer result 和 imaging property mapping；`functions_func_h.html` 的 Sdf 数据结构、Pcp cache/prim index、Usd object model、UsdShade connectable、UsdSkel query、Hydra render param 和 Vdf executor；`functions_vars_r.html` 的 schema token table、UsdPhysics descriptor、Hydra/Embree/AOV/render product、Pcp diagnostics、Ar asset metadata 和 Sdr discovery；`functions.html` 的 Class Members root、Vdf computation graph/execution、Hydra/Storm buffer/VBO/texture/ext computation、scene index plugin registry、Trace/Tf/Ar/UsdShade/Sdf/Exec/Ef/Hf/Gf 跨模块入口。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。5 页中文正文量提升到 `492-566` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 214: api index function variable root pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_func_w.html`、`full_site/api/functions_f.html`、`full_site/api/functions_k.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_w.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 213 轮：API related/function/variable 索引 O/I/N/K/B 页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `ad68a0d`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_rela_o.html`、`full_site/api/functions_i.html`、`full_site/api/functions_n.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_b.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_082.mjs`，每页插入 `release-quality-pass-082` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_rela_o.html` 的 related functions/member functions 边界、UsdGeom/UsdShade/UsdSkel 查询类型、Tf/Sdf/Vt 基础设施和 Gf 数学类型；`functions_i.html` 的 stage cache id、schema info、Sdr discovery、Pcp map/prim index inputs、population mask、Hydra buffer 和 image IO；`functions_n.html` 的 Hydra scene index pipeline、Pcp composition error diagnostics、CLI/config、validation、render product、shader discovery、TfMallocTag 和 GL/Hydra 支撑；`functions_vars_k.html` 的 validation metadata、schema registry、UsdPhysics rigid body/tokens 和 UsdGeom tokens；`functions_vars_b.html` 的 UsdSkel skin baking/imaging/blend shape/guide data、UsdPhysics joint/shape descriptor、Hydra mesh representation、Hgi mip info、Sdr shader discovery 和多 domain token table。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。5 页中文正文量提升到 `490-579` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 213: api index related o i n k b pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_func_c.html`、`full_site/api/functions_vars_h.html`、`full_site/api/functions_func_h.html`、`full_site/api/functions_vars_r.html`、`full_site/api/functions.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 212 轮：API 成员索引 M/O/S/N/E 页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `6300890`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_m.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_s.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_e.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_081.mjs`，每页插入 `release-quality-pass-081` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_m.html` 的 Sdf path/predicate/variable expression、Usd core/geometry/schema/edit target、Pcp map/composition、Hydra render tracking 和 Trace/Vdf 性能线索；`functions_vars_o.html` 的 Tf ref pointer trace、Hydra picking/Embree context、Pcp reference offset/relocation error、Exec value override 和 schema tokens；`functions_s.html` 的 UsdTimeCode/UsdStage/SdfLayer/Sdf file formats、Hydra/Imaging/Embree scene delegate 与 sampler、Gf vectors、physics descriptor 和 schema token；`functions_vars_n.html` 的 TfMallocTag call tree/call stack、Hydra primvar/named texture handle、Sdr discovery、UsdUtils variant set、validation metadata、Pcp changes 和 Vdf schedule；`functions_vars_e.html` 的 Sdf namespace edit detail、Pcp layer stack、UsdPhysics joint drive/limit、Hydra mesh repr、Vt array edit builder、Pcp variable expression error 和 asset path context。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。5 页中文正文量提升到 `519-544` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 212: api index m o s n e pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_rela_o.html`、`full_site/api/functions_i.html`、`full_site/api/functions_n.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_b.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 211 轮：API 成员索引 U/A/H/R/L 页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `da5d023`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_u.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_h.html`、`full_site/api/functions_r.html`、`full_site/api/functions_l.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_080.mjs`，每页插入 `release-quality-pass-080` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_u.html` 的 Usd stage/prim/material、Hydra time sample/render buffer、Vt/Gf value math、Pcp unresolved path 和 Vdf execution；`functions_vars_a.html` 的 `Usd*TokensType`、Hydra AOV/render/imaging 配置、Pcp composition arc、namespace edit 和 validation 变量线索；`functions_h.html` 的 physics shape descriptor、Sdf/Pcp 数据层、Usd object model、Hydra/Hgi render param 和 Vdf executor；`functions_r.html` 的 Ar/Sdf/Hio 文件读取、Vdf read accessor、Hydra buffer range/ext computation 和 UsdPhysics shape descriptor；`functions_l.html` 的 Pcp relocation/layer stack、UsdLux/linear units、UsdPhysics joint/rigid body、Sdf layer/spec、Vdf operand、Hydra GLSL 和 PlugPlugin。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。5 页中文正文量提升到 `508-569` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 211: api index u a h r l pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_m.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_s.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_e.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 210 轮：API 成员索引 T/I/V/O/D 页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `817fdd9`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_t.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_v.html`、`full_site/api/functions_o.html`、`full_site/api/functions_vars_d.html`；这些页面本轮开始时均已是 `draft_needs_translation`，目标是补强 Doxygen API 索引页中文阅读方法和跨模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_079.mjs`，每页插入 `release-quality-pass-079` API 索引页二次精修导读区块，覆盖 Doxygen 字母桶阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文覆盖：`functions_t.html` 的 Vdf executor/Tf/Pcp error/UsdPhysics/TokensType 索引归类；`functions_vars_i.html` 的 imaging/instancer/primvar、Sdr/schema registry、Vdf scheduling/data vectors、Sdf/Pcp/physics/validation 变量线索；`functions_v.html` 的 validation context/validator、Vdf iterators、Exec value overrides、geometry/skeleton/schema 条目；`functions_o.html` 的 Ar resolver/package/layer、Pcp/Sdf namespace、Hydra handles/schema、pick/display/trace 条目；`functions_vars_d.html` 的 RenderVar/render buffer/camera、Tf spin mutex、Pcp cache/errors、physics material/joint drive、validation metadata。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮对象原本已是 `draft_needs_translation`，所以分级计数保持不变是预期结果。5 页中文正文量提升到 `573-593` 字区间，但仍是 `bilingual_draft`，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 210: api index t i v o d pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_u.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_h.html`、`full_site/api/functions_r.html`、`full_site/api/functions_l.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 209 轮：API 成员索引页二次精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `15f0df9`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/api/functions_vars_l.html`、`full_site/api/functions_p.html`、`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_f.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强 Doxygen API 索引页的中文阅读方法和模块归类，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_078.mjs`，每页插入 `release-quality-pass-078` API 索引页二次精修导读区块，覆盖 Doxygen 字母索引阅读方法、跨模块条目归类、跳转边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`functions_vars_l.html` 的 Pcp relocation/layer stack、Physics joint desc 和 schema token 索引读法；`functions_p.html` 的 Class Members P 段、Sdf/Pcp、Sdr/UsdShade、UsdVol particle field 和 Pcp composition 入口；`functions_vars_m.html` 的 Pcp composition、Hydra repr/AOV、UsdPhysics shape/joint/collision group；`functions_vars_c.html` 的 Pcp namespace edit diagnostics、TfMallocTag call tree、Hydra/AOV 和 `TokensType`；`functions_vars_f.html` 的 UsdImaging data source mapping、schema registry、Pcp composition edit、physics descriptors 和 Hydra render state。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页中文正文量已提升到约 470-543 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 209: api index functions vars pass` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_t.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_v.html`、`full_site/api/functions_o.html`、`full_site/api/functions_vars_d.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 208 轮：剩余 release proposal 页第二层精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `ac5a238`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 3 个未达标页面：`full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_rigid_body_physics.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮按“最多 5 页”节奏处理剩余高价值 proposal 页，没有为了凑数额外处理低价值源码页、搜索页或目录页。
- 新增 `scripts/refine_openusd_release_batch_077.mjs`，为 3 页插入 `release-quality-pass-077` 二次精修导读区块，覆盖设计目标、对象模型、authoring/consumption 边界和常见误读；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Generalizing Connectable Nodes Beyond UsdShade` 的 `UsdShadeNodeDefAPI`、`UsdShadeConnectableAPI`、plugin-defined connectability callbacks、Sdr/Ndr 和 non-shading networks；`Coordinate Systems in USD Proposal` 的 `coordSys:* relationship`、frame of reference、shader 短名称消费、projection painting 和 procedural texture；`Rigid Body Physics in USD Proposal` 的 `PhysicsScene`、Rigid Bodies、Collision Shapes、Physics Materials、Joints、API schemas 与 scene hierarchy 交互边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 3 页中文正文量分别提升到约 571-618 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 208: proposal second pass connect coords physics` 同步 GitHub；下一轮优先最多处理 `full_site/api/functions_vars_l.html`、`full_site/api/functions_p.html`、`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_f.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 207 轮：高价值 release proposal 页第二层精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `66034c5`，当前分级为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/wp_asset_previews.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdlux_for_geometry_lights.html`；这些页面本轮开始时均已是 `draft_needs_translation`，本轮目标是补强中文解释质量，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_076.mjs`，每页插入 `release-quality-pass-076` 第二层中文精修导读区块，覆盖 proposal 历史状态、对象模型、当前 API 入口和常见误读风险；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Asset Previews in USD` 的 `assetInfo`、`previews`、`thumbnails`、`defaultImage` 与 texture cards 边界；`Adapting UsdLux to the Needs of Renderers` 的 Sdr definitions、Connectable lights、`UsdLuxPluginLight`、render delegates；`Asset Resolution (Ar) 2.0` 的 `Identifier`、`Resolve`、`AssetInfo`、resolver context 和 non-virtual interface；`Schema Versioning in USD` 的 per-schema versioning、`apiSchemas`、multiple-apply/auto-apply API schemas 和 version conflict；`Adapting UsdLux to Accommodate Geometry Lights` 的 mesh lights、`LightAPI`、`GeometryLight` deprecation、material emission/glow 和 `light:shaderId`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级保持 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页中文正文量已提升到约 515-574 字区间，但仍保持 `bilingual_draft` 状态，未误标为完成。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 207: proposal second pass asset lux ar schema` 同步 GitHub；下一轮优先最多处理 `full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_rigid_body_physics.html`，如需满 5 页再从 `translation_quality_review` 中选择用户可读价值较高的 API 索引或指南页，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 206 轮：proposal 汇总/音频/材质与 API File 页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `4db11d7`，当前分级为 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdshade.html`、`full_site/release/wp.html`、`full_site/api/copy_utils_8h.html`、`full_site/api/journal_8h.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_075.mjs`，每页插入 `release-quality-pass-075` 中文精修导读区块，覆盖页面定位、关键机制、阅读边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`UsdAudio Proposal` 的 historical reference 状态、`UsdMediaSpatialAudio` 当前入口、timed-start playback 与外部媒体资产边界；`UsdShade Material Assignment` 的 collection-based assignment、binding strength、material purpose、material resolve 和 `material:binding`；`Proposals` 目录页的 OpenUSD-proposals 迁移说明；`copyUtils.h File` 的 `SdfCopySpec()`、`SdfShouldCopyChildrenFn`、`SdfShouldCopyValueFn`；`journal.h File` 的 `EsfJournal`、edit reasons、scene objects 与 ESF journal 角色。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8 变为 `draft_template_only` 11 / `draft_needs_translation` 387 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 206: proposals audio shade file pages` 同步 GitHub；下一轮优先最多处理 `full_site/release/wp_asset_previews.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdlux_for_geometry_lights.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 205 轮：VolumeFieldBase、时间/变量表达式与 proposal 页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `5b327a3`，当前分级为 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`、`full_site/release/user_guides/time_and_animated_values.html`、`full_site/release/user_guides/variable_expressions.html`、`full_site/release/wp_render_settings.html`、`full_site/release/wp_stage_variables.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_074.mjs`，每页插入 `release-quality-pass-074` 中文精修导读区块，覆盖概念边界、阅读顺序、语义风险和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`VolumeFieldBase` 的 UsdVol field schema 抽象基础、`field:*` relationships 和字段 prim 边界；`Time and Animated Values` 的 `TimeCode`、`timeSamples`、`timeCodesPerSecond`、`framesPerSecond`、`LayerOffset` 与 remapping；`USD Variable Expressions` 的 `expressionVariables`、asset paths、references/payloads、metadata、variant selections 和运行时求值；`Render Settings in USD Proposal` 的 historical reference 状态与 `RenderSettings` / `RenderProduct` / `RenderVar` 分工；`Stage Variable Expressions` 的 OpenUSD-proposals 迁移状态。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8 变为 `draft_template_only` 16 / `draft_needs_translation` 382 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398 个草稿页全部通过本地预览检查。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引通过，总验证 `PASSED`，`validation_required_checks` 281 / `validation_failed_checks` 0。
- 验证通过后准备以 `OpenUSD bilingual round 205: volume field time variables proposals` 同步 GitHub；下一轮优先最多处理 `full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdshade.html`、`full_site/release/wp.html`、`full_site/api/copy_utils_8h.html`、`full_site/api/journal_8h.html`，继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 204 轮：usdVol particle attribute 与 Volume 页面精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `ef1d011`，当前分级为 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_073.mjs`，每页插入 `release-quality-pass-073` 中文精修导读区块，覆盖 schema 用途、数据范围/类型阅读路径、schema 边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`ParticleFieldOrientationAttributeAPI` 的 `orientations`/`orientationsh`、float/half 取舍、position 长度对齐和 truncate/ignored 规则；`ParticleFieldPositionAttributeAPI` 的 `positions`/`positionsh`、粒子数量定义和空数组语义；`ParticleFieldScaleAttributeAPI` 的 linear scales、PLY `log-format` transformed data、`scales`/`scalesh`；`ParticleFieldSphericalHarmonicsAttributeAPI` 的 `radiance:sphericalHarmonicsDegree`、coefficients、float/half 系数和 view-dependent radiance；`Volume` 的 `field:*` relationship、`VolumeFieldBase` 派生 prim、`field:extinction`、`OpenVDBAsset`、`filePath`、`fieldName` 和 volume shader 输入映射。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8 变为 `draft_template_only` 21 / `draft_needs_translation` 377 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 204: usdVol particle attributes volume`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 particle attribute 或 Volume 页面的全部属性、示例、数组布局、数学定义和渲染器实现细节。
- 全量仍有 21 个 `draft_template_only` 和 377 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`，并从 `translation_quality_review` 中再选择 4 个未达标但用户可读价值高的 API/release/class/group 页面；若剩余模板草稿主要是低价值 `search.html`、目录页或 `_source.html`，可少于 5 页处理。
2. 对 `VolumeFieldBase` 补中文用途说明、抽象基类边界、field/resource 关系和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 203 轮：usdVol field/particle schema 页面精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `95af2a8`，当前分级为 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_072.mjs`，每页插入 `release-quality-pass-072` 中文精修导读区块，覆盖 schema 用途、属性/数学阅读路径、迁移或渲染边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`FieldBase` 的 deprecated 状态和 `VolumeFieldBase` 迁移；`usdVol overview` 的 `Volume`、`field:*` relationship、`OpenVDBAsset`、`filePath`、`fieldName` 和 3D Gaussian splats；`ParticleField` 的 concrete base schema、派生类型和继承属性；`ParticleField3DGaussianSplat` 的 original 3DGS、built-in schema、`projectionModeHint`、`sortingModeHint`；`ParticleFieldOpacityAttributeAPI` 的 `[0, 1]` linear opacity、PLY transformed data、`sigmoid activation function`、`opacities` 和 `opacitiesh`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8 变为 `draft_template_only` 26 / `draft_needs_translation` 372 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 203: usdVol fields particle schemas`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdVol field/particle schema 的全部属性、示例、继承关系、数学定义和渲染器采用细节。
- 全量仍有 26 个 `draft_template_only` 和 372 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`。
2. 对 usdVol particle attribute 和 Volume 页面补中文用途说明、数据范围/类型阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 202 轮：usdMedia/usdRender/usdUI/usdVol schema 页面精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `61488a9`，当前分级为 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_071.mjs`，每页插入 `release-quality-pass-071` 中文精修导读区块，覆盖 schema 用途、属性/关系阅读路径、领域边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`usdMedia overview` 的 `AssetPreviewsAPI`、`SpatialAudio`、thumbnail、`auralMode` 和 ambient/spatial audio；`usdRender overview` 的 final quality render、`RenderSettings`、`RenderProduct`、`RenderVar`、`RenderPass` 和 `/Render` 组织方式；`RenderSettingsBase` 的 aspect ratio、camera、resolution、blur 和 crop 控制；`usdUI overview` 的 node graph、Backdrop、UI hints 和 AccessibilityAPI；`FieldAsset` 的 deprecated 状态、`VolumeFieldAsset` 迁移和 field/file 属性阅读路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8 变为 `draft_template_only` 31 / `draft_needs_translation` 367 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 202: media render UI volume schema pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译所有属性、继承字段、示例和工具实现细节。
- 全量仍有 31 个 `draft_template_only` 和 367 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`。
2. 对 usdVol field/particle field 页面补中文用途说明、属性/数学阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 201 轮：usdLux schema 页面精修（三）
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `bb29ea0`，当前分级为 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`full_site/release/user_guides/schemas/usdLux/PortalLight.html`、`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`、`full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`、`full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_070.mjs`，每页插入 `release-quality-pass-070` 中文精修导读区块，覆盖 schema 用途、属性/关系阅读路径、艺术控制或插件扩展边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`PluginLightFilter` 的外部 `SdrShadingNode`、`UsdShadeNodeDefAPI`、`filterLink` collection 和 render delegate 扩展边界；`PortalLight` 的 local XY plane、`-Z direction`、`inputs:height`、`inputs:width` 和 `DomeLight` 采样引导关系；`ShadowAPI` 的 non-physical controls、`inputs:shadow:color`、`inputs:shadow:distance`、`inputs:shadow:falloff`、`inputs:shadow:falloffGamma` 与 shadow-linking 区分；`ShapingAPI` 的 light spread、light cone、focus、IES profile 和 `ANSI/IES LM-63-19`；`VolumeLightAPI` 的 Volume prim 发光语义、`light:materialSyncMode`、`materialGlowTintsLight`、`light:shaderId` 和 applied API 边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8 变为 `draft_template_only` 36 / `draft_needs_translation` 362 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 201: usdLux filters portals shaping volume`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdLux schema 的全部属性、关系、示例、物理/非物理控制说明和渲染器实现细节。
- 全量仍有 36 个 `draft_template_only` 和 362 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldAsset.html`。
2. 对 usdMedia/usdRender/usdUI/usdVol 概览和基础 schema 页面补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 200 轮：usdLux schema 页面精修（二）
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `d5723b4`，当前分级为 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/overview.html`、`full_site/release/user_guides/schemas/usdLux/PluginLight.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_069.mjs`，每页插入 `release-quality-pass-069` 中文精修导读区块，覆盖 schema 用途、属性/关系阅读路径、迁移或扩展边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`ListAPI` 的 deprecated 状态、`LightListAPI` 迁移、`lightList` 和 `lightList:cacheBehavior`；`MeshLightAPI` 的 Mesh prim 发光语义、`light:materialSyncMode`、`materialGlowTintsLight`、`light:shaderId` 和 applied API 边界；`NonboundableLightBase` 的 non-boundable intrinsic lights、`DistantLight`、`DomeLight`、`Xformable` 与 `Imageable` 继承；`overview.html` 的 UsdLux 概念入口、`LightAPI`、boundable/non-boundable 分类、light filters 和 local navigation；`PluginLight` 的外部 `Sdr shader node`、`render delegate`、插件扩展边界和 renderer-specific 语义。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8 变为 `draft_template_only` 41 / `draft_needs_translation` 357 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 200: usdLux list mesh plugin schema pages`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdLux schema 的全部属性、关系、继承字段、示例和渲染器实现细节。
- 全量仍有 41 个 `draft_template_only` 和 357 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`full_site/release/user_guides/schemas/usdLux/PortalLight.html`、`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`、`full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`、`full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`。
2. 对 usdLux filter/portal/shadow/shaping/volume 页面补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 199 轮：usdLux schema 页面精修（一）
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、git 状态和远端 main，确认上一轮远端提交为 `3f7087c`，当前分级为 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`、`full_site/release/user_guides/schemas/usdLux/GeometryLight.html`、`full_site/release/user_guides/schemas/usdLux/LightAPI.html`、`full_site/release/user_guides/schemas/usdLux/LightFilter.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_068.mjs`，每页插入 `release-quality-pass-068` 中文精修导读区块，覆盖 schema 用途、属性/关系阅读路径、继承或连接边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`BoundableLightBase` 的 boundable intrinsic lights、`LightAPI` 继承能力、`extent`、`Xformable` 和 `Imageable`；`DomeLight_1` 的 HDR/IBL、`inputs:texture:file`、`inputs:texture:format`、`poleAxis`、`portals` 和版本后缀边界；`GeometryLight` 的 deprecated 状态、`MeshLight` 迁移、`geometry` relationship、`light:shaderId` 和 Sdr shader node；`LightAPI` 的 light color/intensity/exposure、light-linking、shadow-linking、`light:filters` 和 UsdShade connectable 规则；`LightFilter` 的 `filterLink` collection、`lightFilter:shaderId`、connectable container 规则和过滤器嵌套边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8 变为 `draft_template_only` 46 / `draft_needs_translation` 352 / `good_bilingual` 8；本轮 5 页均从模板草稿转入 `draft_needs_translation`。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；本轮 5 页均可通过本地最终入口访问。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：本轮验证通过后使用 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 199: usdLux schema lights and filters`。

差距：
- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是完整翻译每一个 usdLux schema 的所有属性、关系、继承字段和示例。
- 全量仍有 46 个 `draft_template_only` 和 352 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/overview.html`、`full_site/release/user_guides/schemas/usdLux/PluginLight.html`。
2. 对 usdLux schema 页面补中文用途说明、属性/关系阅读路径、schema 边界和术语对照；继续低优先处理 `search.html` 和 `_source.html` 源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 198 轮：release 教程/用户指南页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6d56cf8`，当前分级为 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_067.mjs`，每页新增 `release-quality-pass-067` 中文精修导读区块，包含页面用途、阅读边界、关键概念和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`USD Tutorials` 的教程索引、环境设置、Python bindings 和 USD Toolset；`Creating a Usdview Plugin` 的 Python plugin、`PluginContainer`、目录结构和 plugin discovery；`Color User's Guide` 的 color spaces、`renderingColorSpace`、MaterialX 和 OCIO；`Primvars` 的 interpolation modes、`primvars:displayColor` 和 Hydra/Storm 可视化；`Rendering with USD` 的 Imageable、`upAxis`、interactive/final frame renders、normals 和 Light-linking。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8 变为 `draft_template_only` 51 / `draft_needs_translation` 347 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 198: tutorials color primvars rendering`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译教程总入口、usdview 插件教程、Color 指南、Primvars 指南或 Rendering with USD 全文。
- 全量仍有 51 个 `draft_template_only` 和 347 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`DomeLight_1.html`、`GeometryLight.html`、`LightAPI.html`、`LightFilter.html`。
2. 对 usdLux schema 页补中文用途说明、属性/关系阅读路径、schema 边界和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 197 轮：release 规格/教程页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮本地提交为 `3ca738e`，当前分级为 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8。
- 本轮严格只处理 5 个未达标页面：`full_site/release/spec_usdpreviewsurface.html`、`full_site/release/spec_usdz.html`、`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_066.mjs`，每页新增 `release-quality-pass-066` 中文精修导读区块，包含页面用途、阅读边界、关键概念和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`UsdPreviewSurface Specification` 的 preview material、Core Nodes 和材质互换边界；`Usdz File Format Specification` 的 zip archive、Zip Constraints、anchored asset paths 和 `usdzip`；`End to End Example` 的极简 pipeline、assets/scripts/models 和 `shadingVariantLayer`；`Generating New Schema Classes` 的 `schema.usda`、`usdGenSchema`、`jinja2`、`argparse` 和 `USD_INSTALL_ROOT`；`Houdini USD Example Workflow` 的历史教程边界、Houdini USD plugin 移除、Houdini Solaris 和 `usdview`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8 变为 `draft_template_only` 56 / `draft_needs_translation` 342 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 197: specs and tutorial pages`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译 UsdPreviewSurface 全规范、usdz 全格式规范、端到端教程、schema 生成教程或 Houdini 历史教程全文。
- 全量仍有 56 个 `draft_template_only` 和 342 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`。
2. 对教程目录、usdview 插件教程、Color 用户指南、Primvars 和 Rendering with USD 补中文用途说明、页面边界、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 196 轮：release 产品/FAQ/发布节奏/性能指标/Alembic 页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `617025a`，当前分级为 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8。
- 纠偏上一轮自动化目标中的过期页面名：`products.html` 实际对应 `full_site/release/usd_products.html`，`usd_faq.html` 实际对应 `full_site/release/usdfaq.html`；`release_notes.html`、`release_toc.html` 不在 406 清单内；`toolset.html` 已是完成页，所以本轮没有新建不存在页面，也没有重复处理完成页。
- 本轮严格只处理 5 个未达标页面：`full_site/release/usd_products.html`、`full_site/release/usdfaq.html`、`full_site/release/release_schedule.html`、`full_site/release/ref_performance_metrics.html`、`full_site/release/plugins_alembic.html`。
- 新增 `scripts/refine_openusd_release_batch_065.mjs`，每页新增 `release-quality-pass-065` 中文精修导读区块，包含页面用途、阅读边界、关键概念和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：产品生态清单的社区维护/非背书边界、FAQ 的 file format/scene description/`usdcat` 问答、发布节奏的 dev/full/release candidate 区分、性能指标的资产/平台/metrics/本地复现，以及 Alembic 插件的 `usdAbc`、`PXR_BUILD_ALEMBIC_PLUGIN`、Known Limitations 和 Advanced Build Configuration。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8 变为 `draft_template_only` 61 / `draft_needs_translation` 337 / `good_bilingual` 8；4 个模板草稿转出，`plugins_alembic.html` 被补强但仍是未完成草稿。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 196: products FAQ schedule metrics Alembic`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译产品生态清单、FAQ 全部问答、发布流程全文、性能指标表格或 Alembic 插件构建细节。
- 全量仍有 61 个 `draft_template_only` 和 337 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/spec_usdpreviewsurface.html`、`full_site/release/spec_usdz.html`、`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`。
2. 对规格和教程页补中文用途说明、页面边界、阅读路径和术语对照，跳过低价值搜索页和纯源码页。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 195 轮：release 性能/插件/开源新闻页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `42ea166`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/release/maxperf.html`、`full_site/release/plugins_renderman.html`、`full_site/release/plugins.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/press_opensource_release.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_064.mjs`，每页新增 `release-quality-pass-064` 中文精修导读区块，包含页面用途、阅读路径、结构边界和术语对照；保留英文页面名、API 名称、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Maximizing USD Performance` 的 allocator、binary `.usd`、payloads、performance metrics 和 heavy/expensive scene；`RenderMan USD Imaging Plugin` 的 `hdPrman`、Hydra、RenderMan 25.0+、`build_usd.py`、build/run 配置和 AOV；`USD Third-Party Plugins` 的 Hydra render delegate、file format plugin、USD representations 和 layers；两篇 press 页的开源意向、正式发布、DCC tools、collaborative production workflows 和历史新闻边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 70 / `draft_needs_translation` 328 / `good_bilingual` 8 变为 `draft_template_only` 65 / `draft_needs_translation` 333 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 195: performance plugins press pages`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译性能建议全文、RenderMan 插件构建细节、第三方插件清单或两篇新闻稿全文。
- 全量仍有 65 个 `draft_template_only` 和 333 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/products.html`、`full_site/release/release_notes.html`、`full_site/release/release_toc.html`、`full_site/release/toolset.html`、`full_site/release/usd_faq.html`。
2. 对 products、release notes、release TOC、toolset 和 FAQ 页面补中文用途说明、页面边界、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 194 轮：release 贡献/下载/索引/OpenExec 入门页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `d8f5b44`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/release/contributing_to_usd.html`、`full_site/release/contributors.html`、`full_site/release/dl_downloads.html`、`full_site/release/genindex.html`、`full_site/release/intro_to_openexec.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_release_batch_063.mjs`，每页新增 `release-quality-pass-063` 中文精修导读区块，包含页面用途、阅读路径、结构边界和术语对照；保留英文页面名、API 名称、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、函数名、变量名、类型名、头文件名、token 字面量、链接和官方英文摘录。
- 本轮中文层覆盖：`Contributing to USD` 的 CLA、coding conventions、PR guidelines、Git workflow 和 major changes；`USD Contributors (Historical)` 的历史贡献者边界和 GitHub contributors 区分；`Downloads and Videos` 的 presentations、SIGGRAPH notes、videos、assets；`Index` 的 Sphinx/Doxygen 字母索引和锚点保留策略；`Introduction to OpenExec` 的 computations、plugin computations、callbacks、registration、client API 和 invalidation。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 75 / `draft_needs_translation` 323 / `good_bilingual` 8 变为 `draft_template_only` 70 / `draft_needs_translation` 328 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 194: release contributing downloads index OpenExec`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译贡献流程每一条规则、贡献者全名单、下载资源说明、索引全部条目或 OpenExec 全文。
- 全量仍有 70 个 `draft_template_only` 和 328 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/maxperf.html`、`full_site/release/plugins_renderman.html`、`full_site/release/plugins.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/press_opensource_release.html`。
2. 对 performance、RenderMan plugin、plugins、press announcement 和 press release 页面补中文用途说明、页面边界、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 193 轮：UsdVol/UsdAbc/UsdDraco/Vt/Work 模块与插件入口页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `774a316`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_vol_page_front.html`、`full_site/api/usdabc_page_front.html`、`full_site/api/usddraco_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/work_page_front.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_062.mjs`，每页新增 `api-mixed-quality-pass-062` 中文精修导读区块，包含模块用途、schema/API 或插件边界、阅读路径和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdVol` 的体积几何、continuous volumes、OpenVDB/Field3D、field prim 与 particle field；`UsdAbc` 的 Alembic file format plugin、`SDF_FORMAT_ARGS`、`abcReRoot`、`abcLayers` 和 `TfEnvSettings`；`UsdDraco` 的 Draco compression 插件边界；`Vt` 的 `VtValue`、`VtArray`、type erasure 和 C++/Python interface 差异；`Work` 的 multithreading thin abstraction、`Parallel For`、TBB/OpenMP 边界、concurrency limit、`WorkParallelForN` 与 `WorkDispatcher`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 80 / `draft_needs_translation` 318 / `good_bilingual` 8 变为 `draft_template_only` 75 / `draft_needs_translation` 323 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 193: UsdVol UsdAbc UsdDraco Vt Work entries`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每一个 volume schema、file format plugin、Vt 类型容器或 Work 调度 API 成员。
- 全量仍有 75 个 `draft_template_only` 和 323 个 `draft_needs_translation`，后续需要继续按每轮最大 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/release/contributing_to_usd.html`、`full_site/release/contributors.html`、`full_site/release/dl_downloads.html`、`full_site/release/genindex.html`、`full_site/release/intro_to_openexec.html`。
2. 对 release 贡献、贡献者、下载、索引和 OpenExec 入门入口补中文用途说明、页面边界、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 192 轮：UsdShade/UsdShaders/UsdSkel/UsdUI/UsdUtils 模块入口页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `3062e73`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_shade_page_front.html`、`full_site/api/usd_shaders_page_front.html`、`full_site/api/usd_skel_page_front.html`、`full_site/api/usd_u_i_page_front.html`、`full_site/api/usd_utils_page_front.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_061.mjs`，每页新增 `api-usd-schema-quality-pass-061` 中文精修导读区块，包含模块用途、schema/API 边界、阅读路径和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdShade` 的材料、着色网络、connectable API、inputs/outputs、interface connections 和 material binding；`UsdShaders` 的 `Usd*` shader definitions、`UsdPreviewSurface`、`UsdUVTexture`、`glslfx`、`oso` 和 OSL 边界；`UsdSkel` 的骨骼蒙皮、joint animations、`SkelRoot`、`Skeleton`、`SkelAnimation`、joint influences 和 Linear Blend Skinning；`UsdUI` 的 UI hints、accessibility information、node graph layout 和对象/prim/property/attribute hints；`UsdUtils` 的资产管理、诊断代理、stitching/value clips、依赖分析、资产打包、localization、user processing functions 和 stage cache。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 85 / `draft_needs_translation` 313 / `good_bilingual` 8 变为 `draft_template_only` 80 / `draft_needs_translation` 318 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 192: Shade Shaders Skel UI Utils entries`。
差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个网络规则、shader 定义、手册章节、UI hints schema 或工具函数。
- 全量仍有 80 个 `draft_template_only` 和 318 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。
下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_vol_page_front.html`、`full_site/api/usdabc_page_front.html`、`full_site/api/usddraco_page_front.html`、`full_site/api/vt_page_front.html`、`full_site/api/work_page_front.html`。
2. 对 Vol/USD file format plugins/Vt/Work 模块入口补中文用途说明、schema/API 边界、核心类或工具入口、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 191 轮：UsdPhysics/UsdProc/UsdRender/UsdRi/UsdSemantics 模块入口页精修
- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `fefa0fc`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_physics_page_front.html`、`full_site/api/usd_proc_page_front.html`、`full_site/api/usd_render_page_front.html`、`full_site/api/usd_ri_page_front.html`、`full_site/api/usd_semantics_overview.html`，没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_060.mjs`，每页新增 `api-usd-schema-quality-pass-060` 中文精修导读区块，包含模块用途、schema/API 边界、阅读路径和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdPhysics` 的 physics scene、units、rigid bodies、collision、materials、articulation 和 joints；`UsdProc` 的 `UsdProcGenerativeProcedural` 与 runtime/plugin 边界；`UsdRender` 的 settings/products/vars/passes、`renderSettingsPrimPath` 和 camera/pixel/rasterization 语义；`UsdRi` 的 RenderMan utilities、`UsdRiStatements` 和 `rmanUtilities.h`；`UsdSemantics` 的 semantic labels、taxonomy、inheritance、accumulation、time varying labels 与 filtering。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 90 / `draft_needs_translation` 308 / `good_bilingual` 8 变为 `draft_template_only` 85 / `draft_needs_translation` 313 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`，报告索引审计通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 191: Physics Proc Render Ri Semantics entries`。
差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个小节、API 成员、示例或相关类页。
- 全量仍有 85 个 `draft_template_only` 和 313 个 `draft_needs_translation`，后续需要继续按每轮最多 5 页推进。
下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_shade_page_front.html`、`full_site/api/usd_shaders_page_front.html`、`full_site/api/usd_skel_page_front.html`、`full_site/api/usd_u_i_page_front.html`、`full_site/api/usd_utils_page_front.html`。
2. 对 Shade/Shaders/Skel/UI/Utils 模块入口补中文用途说明、schema/API 边界、核心类或 token 入口、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 190 轮：UsdGeom/UsdHydra/UsdLux/UsdMedia/UsdMtlx 模块入口页精修

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `a2e11b4`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/usd_geom_page_front.html`、`full_site/api/usd_hydra_page_front.html`、`full_site/api/usd_lux_page_front.html`、`full_site/api/usd_media_page_front.html`、`full_site/api/usd_mtlx_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_usd_schema_batch_059.mjs`，每页新增 `api-usd-schema-quality-pass-059` 中文精修导读区块，包含模块用途、schema/API 边界、阅读路径和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdGeom` 的 geometry schema 层级、primvars、motion blur 和 stage metrics；`UsdHydra` 的 generative procedural API 与 deprecated shading schema 边界；`UsdLux` 的 core light types、LightAPI、filters、linking、exposure 和插件扩展；`UsdMedia` 的 asset previews 与 spatial audio；`UsdMtlx` 的 MaterialX file format、shader discovery、Concept Mappings 和 unsupported feature 边界。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 95 / `draft_needs_translation` 303 / `good_bilingual` 8 变为 `draft_template_only` 90 / `draft_needs_translation` 308 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 190: Usd schema module front entries`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个 UsdGeom 小节、Hydra procedural 细节、UsdLux 设计说明、UsdMedia schema 类或 MaterialX 映射表。
- 全量仍有 90 个 `draft_template_only` 和 308 个 `draft_needs_translation`，后续需继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_physics_page_front.html`、`full_site/api/usd_proc_page_front.html`、`full_site/api/usd_render_page_front.html`、`full_site/api/usd_ri_page_front.html`、`full_site/api/usd_semantics_overview.html`。
2. 对 Physics/Procedurals/Render/RenderMan/Semantics 页面补中文用途说明、模块边界、核心 schema/API、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 189 轮：UsdSkelTokens / Tf / Trace / UsdObject / UsdAppUtils 页面精修

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `b44c4b6`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/struct_usd_skel_tokens_type.html`、`full_site/api/tf_page_front.html`、`full_site/api/trace_page_front.html`、`full_site/api/usd_2usd_2object_8h.html`、`full_site/api/usd_app_utils_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_058.mjs`，每页新增 `api-mixed-quality-pass-058` 中文精修导读区块，包含页面定位、阅读路径、概念边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`UsdSkelTokensType` 的 skeleton/blend shape/skinning token 读法；`Tf` 的 memory management、runtime typing、diagnostic utilities 和 C++ 相关专题页；`Trace` 的 performance tracking、`TRACE` macros、recording/reporting 和 overhead；`object.h` 的 `UsdObject`、`UsdObjType` 与类型判断函数；`UsdAppUtils` 的应用层命令行 helper 和 `Frame Format Strings`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 100 / `draft_needs_translation` 298 / `good_bilingual` 8 变为 `draft_template_only` 95 / `draft_needs_translation` 303 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 189: UsdSkel Tf Trace UsdObject AppUtils entries`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个 token、Tf 分组、Trace 宏示例、UsdObject include 链或 UsdAppUtils 参数 helper。
- 全量仍有 95 个 `draft_template_only` 和 303 个 `draft_needs_translation`，后续需继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/usd_geom_page_front.html`、`full_site/api/usd_hydra_page_front.html`、`full_site/api/usd_lux_page_front.html`、`full_site/api/usd_media_page_front.html`、`full_site/api/usd_mtlx_page_front.html`。
2. 对 USD schema/module 入口补中文用途说明、模块边界、核心 schema/API、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 188 轮：Vdf header / Hgi sampler / Usd token 页面精修

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e20a66b`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/sparse_vectorized_input_traverser_8h.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_geom_tokens_type.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_usd_physics_tokens_type.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_struct_token_batch_057.mjs`，每页新增 `api-struct-token-quality-pass-057` 中文精修导读区块，包含页面定位、字段或 token 集合阅读方式、常见使用边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、枚举值、函数名、变量名、类型名、头文件名、token 字面量、链接和原文摘录。
- 本轮中文层覆盖：`VdfSparseVectorizedInputTraverser` 的 output-to-input sparse traversal 和 Vdf node/input/output/mask 关联；`HgiSamplerDesc` 的 GPU sampler 过滤、寻址、比较和调试字段；`UsdGeomTokensType` 的 `UsdGeomTokens`、property names、allowedTokens 和几何 schema token 分组；`UsdLuxTokensType` 的 light/shadow/filter linking、光源 schema token 和 `inputs*` 属性 token；`UsdPhysicsTokensType` 的物理属性、collision approximation、joint/rigid body token 与 multiple-apply API 模板派生名。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 105 / `draft_needs_translation` 293 / `good_bilingual` 8 变为 `draft_template_only` 100 / `draft_needs_translation` 298 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 188: Vdf sampler Usd token entries`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个 header include、struct 字段、token 条目、allowed value 或相关类页说明。
- 全量仍有 100 个 `draft_template_only` 和 298 个 `draft_needs_translation`，后续需继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/struct_usd_skel_tokens_type.html`、`full_site/api/tf_page_front.html`、`full_site/api/trace_page_front.html`、`full_site/api/usd_2usd_2object_8h.html`、`full_site/api/usd_app_utils_page_front.html`。
2. 对 token/module/header 页面补中文用途说明、阅读路径、常见字段或 token 集合边界和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 187 轮：Pcp/Plug/Sdf/Sdr 模块入口页精修

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `0b38aa3`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/pcp_page_front.html`、`full_site/api/plug_page_front.html`、`full_site/api/sdf_page_front.html`、`full_site/api/sdr_glslfx_page_front.html`、`full_site/api/sdr_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_module_front_batch_056.mjs`，每页新增 `api-module-front-quality-pass-056` 中文精修导读区块，包含模块定位、阅读路径、概念边界和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、变量名、类型名、头文件名、链接和原文摘录。
- 本轮中文层覆盖：Pcp 的 composition / Layering & Referencing、`PcpCache`、`PcpPrimIndex`、path translation 和 diagnostics；Plug 的插件发现、注册、metadata、`TfType`、`PlugRegistry::RegisterPlugins` 和 `PlugNotice::DidRegisterPlugins`；Sdf 的 `SdfLayer`、`SdfPrimSpec`、`SdfPath`、file format plugins 和 authored opinions；SdrGlslfx 的 `glslfx parser` 定位；Sdr 的 shader definition discovery、lazy parsing、`SdrRegistry`、`SdrShaderNode` 和 `SdrShaderProperty`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 110 / `draft_needs_translation` 288 / `good_bilingual` 8 变为 `draft_template_only` 105 / `draft_needs_translation` 293 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 187: Pcp Plug Sdf Sdr module fronts`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个 Pcp、Plug、Sdf、SdrGlslfx、Sdr 小节、字段、参数、返回值或链接目标说明。
- 全量仍有 105 个 `draft_template_only` 和 293 个 `draft_needs_translation`，后续需继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/sparse_vectorized_input_traverser_8h.html`、`full_site/api/struct_hgi_sampler_desc.html`、`full_site/api/struct_usd_geom_tokens_type.html`、`full_site/api/struct_usd_lux_tokens_type.html`、`full_site/api/struct_usd_physics_tokens_type.html`。
2. 对 header/struct/token 页面补中文用途说明、字段或 token 集合阅读方式、常见使用边界和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 186 轮：OpenExec/Ts/Related Pages 文档页精修

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `1a0cc1f`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/page__execution__system__design.html`、`full_site/api/page_ts_regression.html`、`full_site/api/page_ts_status.html`、`full_site/api/page_ts_ts_test.html`、`full_site/api/pages.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_pages_batch_055.mjs`，每页新增 `api-pages-quality-pass-055` 中文精修导读区块，包含页面用途、阅读重点、结构说明和术语对照；保留英文页面名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、链接和原英文摘录。
- 本轮中文层覆盖：OpenExec System Design 的 compilation/scheduling/evaluation 与 Engine Architecture；Regressive Splines 的 Bezier parametric 表示、regressive segments、anti-regression 和 authoring mode；USD Anim Project Status 的 IN DEVELOPMENT 状态、Mostly Complete/Still to Come 与 USD integration；TsTest Framework 的 spline evaluation 验证、绘图、比较、backend、`matplotlib` 和 baseline helper；Related Pages 的相关页面导航和本地路由说明。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 115 / `draft_needs_translation` 283 / `good_bilingual` 8 变为 `draft_template_only` 110 / `draft_needs_translation` 288 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过。
- 重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
- GitHub 同步：验证通过后运行 `scripts/sync_openusd_to_github.ps1`，提交信息为 `OpenUSD bilingual round 186: OpenExec Ts related pages`。

差距：
- 本轮 5 页仍是 `draft_needs_translation`，不是完整翻译每个设计段落、状态项、测试框架细节或 Related Pages 的所有链接说明。
- 全量仍有 110 个 `draft_template_only` 和 288 个 `draft_needs_translation`，后续需继续按每轮最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先处理 `full_site/api/pcp_page_front.html`、`full_site/api/plug_page_front.html`、`full_site/api/sdf_page_front.html`、`full_site/api/sdr_glslfx_page_front.html`、`full_site/api/sdr_page_front.html`。
2. 对 Pcp、Plug、Sdf、SdrGlslfx、Sdr 模块入口补中文用途说明、模块边界、核心概念、阅读路径和术语对照。
3. 保持本地链接策略，验证通过后同步 GitHub，并记录质量分级变化、验证结果和提交结果。

## 第 185 轮：Modules/Namespace 索引入口页精修
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `01e7cca`，本轮 5 个 API 索引目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/modules.html`、`full_site/api/namespacemembers_func.html`、`full_site/api/namespacemembers_type.html`、`full_site/api/namespacemembers.html`、`full_site/api/namespaces.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_index_batch_054.mjs`，每页新增 `api-index-quality-pass-054` 中文精修导读区块，包含索引用途、条目类型、阅读路径和术语对照；保留英文 namespace、function、typedef、module、class、operator、macro、enum、type、header、链接和原文摘录。
- 本轮中文层覆盖：`modules.html` 的 Arch/Gf/Tf module group 导航和 Bits、Multithreading、Linear Algebra、Diagnostic Facilities 等分组读法；`namespacemembers_func.html` 的 `ShaderMetadataHelpers`、`VdfTestUtils`、`pxr_CLI::CLI::enums`、`std` 函数索引读法；`namespacemembers_type.html` 的 `pxr_tsl`、`robin_pg_map`、`robin_pg_set` typedef 索引；`namespacemembers.html` 的 function/operator/typedef 混合成员总索引；`namespaces.html` 的 `pxr_tsl`、`ShaderMetadataHelpers`、`std`、`VdfTestUtils` namespace 列表和测试辅助类阅读路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 120 / `draft_needs_translation` 278 / `good_bilingual` 8 变为 `draft_template_only` 115 / `draft_needs_translation` 283 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `10b1b12`，本轮 5 个文档目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_vdf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html`、`full_site/api/md_pxr_usd_imaging_usdviewq_black_box_testing.html`、`full_site/api/md_pxr_usd_sdf_doxygen_boolean_expressions.html`、`full_site/api/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_docs_batch_053.mjs`，每页新增 `api-docs-quality-pass-053` 中文精修导读区块，包含用途说明、流程/概念边界、阅读顺序和术语对照；保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`Vdf` 的 vectorized dataflow networks、`VdfNetwork`、`VdfNode`、`VdfConnection` 和 node output/input 流向；usdview development practices 的 `.ui` files、`qdesigner5`、`testusdview` 和 `blackBoxTesting.md` 流程；usdview black box testing 的 viewport prim vising/invising、Make Invisible、Make Visible、Vis Only、Session Visibility、Prim View Framing 测试边界；Sdf Boolean Expressions 的 constants、variables、binary/unary operators、parenthesized expressions、implicit casting 和 `VtValue::Cast`；Validation framework 的 validators、metadata、registry、validator suites、errors、fixers、Layer/Stage/Prim validator 和 Python plugin validator 路径。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 125 / `draft_needs_translation` 273 / `good_bilingual` 8 变为 `draft_template_only` 120 / `draft_needs_translation` 278 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `f4001a0`，本轮 5 个 OpenExec 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_exec_ir__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_usd_docs_overview.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html`、`full_site/api/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_openexec_batch_052.mjs`，每页新增 `api-openexec-quality-pass-052` 中文精修导读区块，包含模块定位、流程说明、阅读顺序和术语对照；保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`ExecIr` 作为 built on `execUsd` 的 invertible rigs/controllers 实验性实现层；`ExecUsd` 作为 OpenExec 主入口，覆盖 schema computational behaviors 注册、`UsdStage` 摄取、data flow network 编译和 vectorized/multithreaded evaluation；`OpenExec Overview` 的 computations、registered computations、computed outputs、plugin/builtin computations 和 tutorials/advanced topics 入口；Tutorial 1 的 `ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdValueKey`、`ExecUsdCacheView`、`VtValue` 低层 value request 流程；Tutorial 2 的 `EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、Computation Registration、Input Registrations、`VdfContext` 和 callback function 流程。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 130 / `draft_needs_translation` 268 / `good_bilingual` 8 变为 `draft_template_only` 125 / `draft_needs_translation` 273 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `49a279e`，本轮 5 个 OpenExec 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/md_pxr_exec_ef__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_esf_usd__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec__r_e_a_d_m_e.html`、`full_site/api/md_pxr_exec_exec_geom__r_e_a_d_m_e.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_openexec_batch_051.mjs`，每页新增 `api-openexec-quality-pass-051` 中文精修导读区块，包含模块定位、依赖关系、阅读顺序和术语对照；保留英文模块名、API 名称、类名、方法名、代码、命令、属性名、数学符号、模板参数、宏名、枚举名、类型名、头文件名、链接和原英文摘录。
- 本轮中文层覆盖：`Ef` 作为 `vdf` 之上的 execution foundation、`VdfNode`、`VdfExecutorInterface`、value cache 和 network traversal；`Esf` 作为非公开 scene description object access interface；`EsfUsd` 作为 `Esf` 到 `UsdStage` scene objects 的 USD 适配层；`Exec` 作为 built on `vdf`/`ef`/`esf` 的 execution system core，覆盖 defining computations、ingesting scenes、compiling/evaluating data flow networks；`ExecGeom` 作为 built on `execUsd` 的 `UsdGeom` computation registration 层。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 135 / `draft_needs_translation` 263 / `good_bilingual` 8 变为 `draft_template_only` 130 / `draft_needs_translation` 268 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ab15e51`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_w.html`、`full_site/api/globals.html`、`full_site/api/inherits.html`、`full_site/api/js_page_front.html`、`full_site/api/kind_page_front.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_mixed_batch_050.mjs`，每页新增 `api-mixed-quality-pass-050` 中文精修导读区块，包含用途说明、索引/层级/模块阅读方法、术语对照和结构提示；保留英文页面名、API 名称、函数名、变量名、类型名、头文件名、模板参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_w.html` 的 Work 并发限制、parallel loop/reduce/sort、detached task、threadLimits 与 Work helper；`globals.html` 的 File Members 根索引、`AR_`/`ARCH_` 前缀、Resolver/Arch 宏和头文件链接读法；`inherits.html` 的 graphical class hierarchy、`hierarchy.html` textual hierarchy、本地继承链接和 Ar/CLI/Vdf/Arch 条目读法；`js_page_front.html` 的 C++ JSON I/O、recursive container、parse/write entrypoint、`js/json.h` 和 Python 标准库边界；`kind_page_front.html` 的 runtime-extensible taxonomy、`TfToken`、`KindRegistry::GetBaseKind()`、`KindRegistry::IsA()`、model root 分类和 `PlugRegistry` 扩展方式。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 140 / `draft_needs_translation` 258 / `good_bilingual` 8 变为 `draft_template_only` 135 / `draft_needs_translation` 263 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过，本轮 5 页均可通过本地最终入口访问。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `d8bf199`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_t.html`、`full_site/api/globals_type.html`、`full_site/api/globals_u.html`、`full_site/api/globals_v.html`、`full_site/api/globals_vars.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_file_members_batch_049.mjs`，每页新增 `api-file-members-quality-pass-049` 中文精修导读区块，包含用途说明、索引读法、条目类型区别和术语对照；保留英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_t.html` 的 `TF_ADD_ENUM_NAME`、`TF_AXIOM`、`TF_CODING_ERROR`、`TF_DEBUG`、`TF_DECLARE_PUBLIC_TOKENS()` 与 Tf diagnostic/debug/token/ref pointer 宏；`globals_type.html` 的 `Arch*` callback/type aliases、`Ef*`/`Exec*` 类型、`GfHalf`、`Pcp*` 类型、`SdfNamespaceEdit*` 与 `SdfRelocate*`；`globals_u.html` 的 `USD_*_VALIDATION_*_TOKENS` 与 `USD_LINEAR_INTERPOLATION_TYPES`；`globals_v.html` 的 Vdf data manager、connection/mask、network utility 和 masked output vector 条目；`globals_vars.html` 的 `Usd*Tokens`、`UsdPrim*Predicate`、`TfUtf8InvalidCodePoint`、`usdPhysicsSentinelLimit` 与全局 token/predicate 变量。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 145 / `draft_needs_translation` 253 / `good_bilingual` 8 变为 `draft_template_only` 140 / `draft_needs_translation` 258 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `62ebddf`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_j.html`、`full_site/api/globals_l.html`、`full_site/api/globals_o.html`、`full_site/api/globals_p.html`、`full_site/api/globals_s.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_file_members_batch_048.mjs`，每页新增 `api-file-members-quality-pass-048` 中文精修导读区块，包含用途说明、字母索引读法、常见条目分类和术语对照；保留英文页面名、API 名称、函数名、变量名、宏名、类型名、头文件名、operator 符号、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_j.html` 的 `JsConvertToContainerType()`、`JsFindValue()`、`JsParseStream()`、`JsParseString()`、`JsWriteToStream()`、`JsWriteToString()`、`JsWriteValue()`；`globals_l.html` 的 `LoadUsdPhysicsFromRange()` 和 `parseUtils.h`；`globals_o.html` 的 `operator+()`、`operator==()`、`operator>>()`、`operator^()`；`globals_p.html` 的 `PCP_INVALID_INDEX`、`PcpArcType` 与 `PcpComposeSite*` composition 查询 helper；`globals_s.html` 的 `SDF_DEFINE_*` file format 宏、asset path / layer helper、`SdfCopySpec()` 和 `SdfCreate*InLayer()` authoring helper。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 150 / `draft_needs_translation` 248 / `good_bilingual` 8 变为 `draft_template_only` 145 / `draft_needs_translation` 253 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `ef1fd2e`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_defs.html`、`full_site/api/globals_enum.html`、`full_site/api/globals_eval.html`、`full_site/api/group__group___exec___attribute___comptuations.html`、`full_site/api/group__group__hd__collection_predicates.html`；没有新增或处理第 6 页。
- 新增 `scripts/refine_openusd_api_index_group_batch_047.mjs`，每页新增 `api-index-group-quality-pass-047` 中文精修导读区块，包含用途说明、索引读法、API 分组边界和术语对照；保留英文页面名、API 名称、类名、函数名、宏名、枚举名、枚举值、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖：`globals_defs.html` 的 File Members macro definitions、`AR_DECLARE_RESOLVER_CONTEXT`、`AR_DEFINE_PACKAGE_RESOLVER`、`AR_DEFINE_RESOLVER` 和 `ARCH_*` 宏读法；`globals_enum.html` 的 `Arch`、`Exec`、`Pcp`、`Sdf`、`Sdr`、`Tf`、`Usd` 枚举类型分组；`globals_eval.html` 的 `UsdInterpolationType*`、`UsdListPosition*`、`UsdLoad*`、`UsdResolveInfoSource*` 枚举值语义；`Attribute Computations Builtin Exec Computations` 的 `computeValue`、`computeResolvedValue`、`computePath`；`Hydra Collection Predicate API` 的 `SdfPathExpression`、scene index predicate 和 `HdGetCollectionPredicateLibrary()`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 155 / `draft_needs_translation` 243 / `good_bilingual` 8 变为 `draft_template_only` 150 / `draft_needs_translation` 248 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `e5efec5`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/hd_embree_page_front.html`、`full_site/api/hd_storm_page_front.html`、`full_site/api/hdx_page_front.html`、`full_site/api/hierarchy.html`、`full_site/api/hio_page_front.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_mixed_batch_046.mjs`，每页新增 `api-mixed-quality-pass-046` 中文精修导读区块，包含用途说明、阅读重点、关键类型/模块边界和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖：`HdEmbree` 的 Intel Embree raytracing kernels、Hydra renderer plugin living documentation、`Sync`、`Commit Resources`、`Executing tasks`、`Renderer Plugin`、`Embree Scene Ownership`、`Configuration` 和 `Unit Test`；`HdStorm` 作为 Storm render delegate 插件层、Hgi 后端与 `HdSt` core rendering functionality 的关系；`Hdx` 的 Hydra extensions、常用 task 和 `HdxTaskController`；`hierarchy.html` 的 Doxygen inheritance list / graphical hierarchy 读法；`Hio` 的 Hydra Resource I/O、`HioGlslfx`、`glslfx`、`HioImage`、`HioStb_Image`、`HioOIIO_Image` 和 `HioFieldTextureData`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 160 / `draft_needs_translation` 238 / `good_bilingual` 8 变为 `draft_template_only` 155 / `draft_needs_translation` 243 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `6db3753`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/classpxr___c_l_i_1_1_c_l_i_1_1_app.html`、`full_site/api/classpxr__tsl_1_1robin__map.html`、`full_site/api/gf_page_front.html`、`full_site/api/hd_page_front.html`、`full_site/api/hd_st_page_front.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_mixed_batch_045.mjs`，每页新增 `api-mixed-quality-pass-045` 中文精修导读区块，包含用途说明、读取重点、关键类型/模块边界和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `CLI::App` 的 command line program、subcommands、parsing/help、`add_option` 和 `.start` 调用语义；`pxr_tsl::robin_map` 的 open-addressing、robin hood hashing、template 参数和 growth policy；`Gf` 模块的 Graphics Foundations、Linear Algebra、Basic Mathematical Operations、Basic Geometry 与 Debugging output；`Hd` 模块作为 multiple scene graphs 与 multiple renderers 之间通信的 Hydra Framework；`HdSt` 模块作为 HdStorm core rendering functionality、renderIndex 数据拉取、command buffers、GPU resources 和 cached playback。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 165 / `draft_needs_translation` 233 / `good_bilingual` 8 变为 `draft_template_only` 160 / `draft_needs_translation` 238 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `4976af0`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_vdf_grapher_options.html`、`full_site/api/class_vdf_node.html`、`full_site/api/class_vdf_read_write_accessor.html`、`full_site/api/class_vdf_test_utils_1_1_node.html`、`full_site/api/class_vt_value_ref.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_044.mjs`，每页新增 `api-class-quality-pass-044` 中文精修导读区块，包含类职责、读取重点、关键类型/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `VdfGrapherOptions` 的 `VdfGrapher` 输出配置、node filter/style callback、display style、mask 绘制和页面布局选项；`VdfNode` 作为 `VdfNetwork` abstract node 基类的 input/output specs、dependency masks、连接变更和 identity 管理；`VdfReadWriteAccessor<T>` 的 output data random access、`operator[]()`、`GetSize()` 与 `IsEmpty()`；`VdfTestUtils::Node` 的测试 wrapper、`GetVdfNode()`、`Output()`、`SetValue()` 和测试网络构造语义；`VtValueRef` 的 non-owning type-erased view、`VtValue` 互操作、生命周期约束和 hash/compose/transform 能力。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 170 / `draft_needs_translation` 228 / `good_bilingual` 8 变为 `draft_template_only` 165 / `draft_needs_translation` 233 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `36910fd`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_tf_dense_hash_map.html`、`full_site/api/class_tf_py_lock.html`、`full_site/api/class_tf_token.html`、`full_site/api/class_trace_event_data.html`、`full_site/api/class_usd_skel_imaging_data_source_skeleton_prim.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_043.mjs`，每页新增 `api-class-quality-pass-043` 中文精修导读区块，包含类职责、读取重点、关键类型/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `TfDenseHashMap` 的小规模 vector storage、`TfHashMap` API 兼容、`HashFn`/`EqualKey`/`Threshold` template 参数；`TfPyLock` 的 Python GIL、thread state、`Acquire()`/`Release()` 与 allow-threads 状态转换；`TfToken` 的 registered string handle、常数时间比较/hash、`HashSet` 与 interned string 语义；`TraceEventData` 的 TraceEvent payload、多类型 getter、`TraceEvent::DataType` 和 `WriteJson()`；`UsdSkelImagingDataSourceSkeletonPrim` 的 UsdSkel Skeleton prim data source、Hydra data source 适配和 `GetNames()`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 175 / `draft_needs_translation` 223 / `good_bilingual` 8 变为 `draft_template_only` 170 / `draft_needs_translation` 228 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `0639660`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_sdf_usdz_file_format.html`、`full_site/api/class_sdr_shader_property.html`、`full_site/api/class_usd_validation_error.html`、`full_site/api/class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html`、`full_site/api/class_vdf_context.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_042.mjs`，每页新增 `api-class-quality-pass-042` 中文精修导读区块，包含类职责、读取重点、关键属性/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、数学符号、代码、链接和原英文摘录。
- 本轮中文层覆盖 `SdfUsdzFileFormat` 作为 package `.usdz` file format、root layer 定位和 `SdfLayer` I/O 插件语义；`SdrShaderProperty` 的 shader node input/output、metadata、默认值和连接能力；`UsdValidationError` 的 validation result、severity、sites、message 与 fixer 查询；`UsdVolParticleFieldSphericalHarmonicsAttributeAPI` 的 ParticleField radiance 球谐属性、degree、float/half 系数数组和 applied schema 语义；`VdfContext` 的 computation callback 输入访问、requested output 判断、`SetOutput()` 和调试上下文。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 180 / `draft_needs_translation` 218 / `good_bilingual` 8 变为 `draft_template_only` 175 / `draft_needs_translation` 223 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和远端 main，确认上一轮远端提交为 `dfbd903`，本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_prim.html`、`full_site/api/class_usd_proc_generative_procedural.html`、`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_stage_cache.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_041.mjs`，每页新增 `api-class-quality-pass-041` 中文精修导读区块，包含类职责、读取重点、关键属性/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdPrim` 的 stage runtime prim view、scenegraph object、variant/reference/API schema/lifetime/instancing；`UsdProcGenerativeProcedural` 的 generative procedural scene description contract、`primvars:` 输入和 `proceduralSystem`；`UsdSchemaRegistry` 的 schema info、generated schema data、prim definition 和 family/version；`UsdShadeOutput` 的 connectable output、source connection 和 Sdr metadata；`UsdStageCache` 的 concurrency-safe stage sharing、context、find/erase/clear。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 185 / `draft_needs_translation` 213 / `good_bilingual` 8 变为 `draft_template_only` 180 / `draft_needs_translation` 218 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 UsdImaging/UsdLux/UsdPhysics class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_usd_imaging_nurbs_patch_adapter.html`、`full_site/api/class_usd_lux_disk_light.html`、`full_site/api/class_usd_lux_shaping_a_p_i.html`、`full_site/api/class_usd_physics_joint.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_040.mjs`，每页新增 `api-class-quality-pass-040` 中文精修导读区块，包含类职责、读取重点、关键属性/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdImagingDelegate` 作为 Hydra `Hd` core 与 USD scene graph 的主要转换层、path conversion 和数据查询职责；`UsdImagingNurbsPatchAdapter` 对 `UsdGeomNurbsPatch` 的 delegate support、subprim 数据和 topology/points 访问；`UsdLuxDiskLight` 的 XY plane 圆盘光、-Z 轴发光和 `radius` 属性；`UsdLuxShapingAPI` 的 light emission shaping、cone/focus/IES 属性和可应用 API schema 语义；`UsdPhysicsJoint` 的 rigid body joint、D6 joint 默认自由度、body relationships、local frames、break/collision/articulation 属性。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 190 / `draft_needs_translation` 208 / `good_bilingual` 8 变为 `draft_template_only` 185 / `draft_needs_translation` 213 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 Usd/UsdGeom/UsdImaging class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_usd_imaging_adapter_registry.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_039.mjs`，每页新增 `api-class-quality-pass-039` 中文精修导读区块，包含类职责、读取重点、关键属性/方法分组和术语对照；保留英文页面名、类名、方法名、属性名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `UsdAttributeLimits` 的 limits dictionary metadata、minimum/maximum 与 soft/hard limits；`UsdGeomBasisCurves` 的 batched curve representation、cubic/linear 插值、`curveVertexCounts` 与数据尺寸计算；`UsdGeomMesh` 的 points、face-vertices、face topology、subdivisionScheme 和 crease/corner 属性；`UsdGeomPrimvarsAPI` 的 primvar 创建、indexed/non-indexed primvars、namespace inheritance 与 retrieval 方法选择；`UsdImagingAdapterRegistry` 的 PrimAdapter plug-in registry、adapter factory、per-stage adapter instance 和 API schema adapter 构造语义。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 195 / `draft_needs_translation` 203 / `good_bilingual` 8 变为 `draft_template_only` 190 / `draft_needs_translation` 208 / `good_bilingual` 8。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；重新运行 `scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：报告索引 16/16 通过，总验证 281 checks passed / 0 failed。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 Pcp/Sdf class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_pcp_property_index.html`、`full_site/api/class_sdf_children_view.html`、`full_site/api/class_sdf_layer.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_sdf_prim_spec.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_038.mjs`，每页新增 `api-class-quality-pass-038` 中文精修导读区块，包含类职责、读取重点、相关 API 关系、关键方法/成员分组和术语对照；保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `PcpPropertyIndex` 的 property composition index、opinion 来源和 `PcpPropertyIterator` 访问语义；`SdfChildrenView` 的 template view 参数角色；`SdfLayer` 的 scene description container、File I/O、metadata 和 muting 职责；`SdfPath` 的 storage key、namespace identity、absolute/relative path 和 relationship target 语义；`SdfPrimSpec` 的 layer 内 prim description、root-level prim、child hierarchy 和 `UsdPrim` 区分。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 200 / `draft_needs_translation` 198 / `good_bilingual` 8 变为 `draft_template_only` 195 / `draft_needs_translation` 203 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 Hd/Hdx/Hgi/Pcp class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_hd_task.html`、`full_site/api/class_hdx_pick_from_render_buffer_task.html`、`full_site/api/class_hgi_g_l_graphics_cmds.html`、`full_site/api/class_pcp_arc.html`、`full_site/api/class_pcp_error_unresolved_prim_path.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_037.mjs`，每页新增 `api-class-quality-pass-037` 中文精修导读区块，包含类职责、相关类型、关键语义、术语对照和结构提醒；保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `HdTask` 的 Hydra render 工作单元、资源准备、3D/2D render pass 与 `HdEngine::Execute()` 调度语境；`HdxPickFromRenderBufferTask` 的 ID buffer、pick frustum 到 camera frustum 重映射和 picking query；`HgiGLGraphicsCmds` 的 OpenGL backend graphics commands、pipeline handle 和 HgiGL device 语境；`PcpArc` 的 prim index source/target node、composition arc 与 `PcpMapExpression`；`PcpErrorUnresolvedPrimPath` 的 asset path resolved/loaded 失败错误语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 205 / `draft_needs_translation` 193 / `good_bilingual` 8 变为 `draft_template_only` 200 / `draft_needs_translation` 198 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 Hd/HdSt class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_hd_instance_registry.html`、`full_site/api/class_hd_render_buffer.html`、`full_site/api/class_hd_scene_delegate.html`、`full_site/api/class_hd_st_dispatch_buffer.html`、`full_site/api/class_hd_st_render_pass_state.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_036.mjs`，每页新增 `api-class-quality-pass-036` 中文精修导读区块，包含类职责、相关类型、关键语义、术语对照和结构提醒；保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `HdInstanceRegistry<VALUE>` 的 dictionary container 与 `HdInstance` registry 语义；`HdRenderBuffer` 的 renderable data resource、indexed prim、allocation parameters 和 mapping functionality；`HdSceneDelegate` 的 client scene graph 数据交换、render index、topology、primvar、time sample 和派生 delegate 语境；`HdStDispatchBuffer` 的 VBO、indirect dispatch、`BufferResourceView` 与 `HdBufferArray` 关系；`HdStRenderPassState` 的 GL states、uniforms、shaders、Hgi pipeline 和 camera framing 状态包语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 210 / `draft_needs_translation` 188 / `good_bilingual` 8 变为 `draft_template_only` 205 / `draft_needs_translation` 193 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口、Git 状态和进度记录，确认本轮 5 个 class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_gf_range1d.html`、`full_site/api/class_gf_ray.html`、`full_site/api/class_gf_vec2i.html`、`full_site/api/class_glf_draw_target.html`、`full_site/api/class_hd_data_source_locator.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_035.mjs`，每页新增 `api-class-quality-pass-035` 中文精修导读区块，包含类职责、相关类型、关键语义、术语对照和结构提醒；保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `GfRange1d` 的一维 interval、empty range、`max < min` 与 `[FLT_MAX,-FLT_MAX]` 约定；`GfRay` 的 origin/direction、非归一化 direction vector 和 intersection distance 语义；`GfVec2i` 的二维 int vector、component 和 dot product 语境；`GlfDrawTarget` 的 GL render target、multiple image attachments、depth buffer 与 texture sampler；`HdDataSourceLocator` 的 Hydra data source token path 定位语义。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 215 / `draft_needs_translation` 183 / `good_bilingual` 8 变为 `draft_template_only` 210 / `draft_needs_translation` 188 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮 5 个 class 目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/class_ef___lofted_output_set.html`、`full_site/api/class_esf_property_interface.html`、`full_site/api/class_gf_dual_quatf.html`、`full_site/api/class_gf_matrix2f.html`、`full_site/api/class_gf_matrix4f.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_class_batch_034.mjs`，每页新增 `api-class-quality-pass-034` 中文精修导读区块，包含类职责、相关类型、关键语义、术语对照和结构提醒；保留英文页面名、类名、方法名、template 参数、代码、链接和原英文摘录。
- 本轮中文层覆盖 `Ef_LoftedOutputSet` 的 lofted outputs、page cache、`EfPageCacheBasedExecutor` 和 Vdf output/mask/node 关系；`EsfPropertyInterface` 的 scene adapter property abstraction、`UsdProperty` 只读接口和 `EsfJournal` 重新编译条件记录；`GfDualQuatf` 的 real/dual quaternion 与 rotation/translation 表示；`GfMatrix2f` 的 2x2 float matrix 和 row-major `matrix[i][j]` 约定；`GfMatrix4f` 的 4x4 matrix、row vectors 约定和 3D transform 方法。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 220 / `draft_needs_translation` 178 / `good_bilingual` 8 变为 `draft_template_only` 215 / `draft_needs_translation` 183 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮 5 个目标页均存在且均为 `draft_template_only`。
- 本轮严格只处理 5 页：`full_site/api/globals_func_v.html`、`full_site/api/globals_func_w.html`、`full_site/api/globals_func.html`、`full_site/api/globals_g.html`、`full_site/api/globals_h.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_mixed_batch_033.mjs`，每页新增 `api-file-members-mixed-quality-pass-033` 中文精修导读区块，包含索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 V 段 Vdf execution network、masked output vector、VtDictionary；W 段 Work 并发限制、parallel loop、reduce、sort、detached task；总函数索引页中的 Arch debugger、file system、virtual memory、memory alignment 和 resolver context；G 字母索引中的 Gf constants/math/gamma/vector/geometry；H 字母索引中的 `hash_value()` 与 Hio OpenVDB grid asset utilities。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 225 / `draft_needs_translation` 173 / `good_bilingual` 8 变为 `draft_template_only` 220 / `draft_needs_translation` 178 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 复查上一轮建议队列时确认 `full_site/api/globals_func_q.html` 与 `full_site/api/globals_func_r.html` 不存在，也不在当前 406 页清单内；本轮没有新建这两个页面，而是按当前可发现的非源码索引顺序处理 `O/P/S/T/U` 五页。
- 本轮严格只处理 5 个 File Members 函数索引页：`full_site/api/globals_func_o.html`、`full_site/api/globals_func_p.html`、`full_site/api/globals_func_s.html`、`full_site/api/globals_func_t.html`、`full_site/api/globals_func_u.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_func_batch_032.mjs`，每页新增 `api-file-members-func-quality-pass-032` 中文精修导读区块，包含函数索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 O 段 operator overload 与 Gf/vector/timeCode 相关入口；P 段 Pcp composition site 工具；S 段 Sdf asset path、spec 创建、value type/unit 查询；T 段 Tf debug/token/path/string/dlopen/Python interop 工具；U 段 Usd/UsdGeom/UsdShade/UsdUtils/UsdPhysics 入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 230 / `draft_needs_translation` 168 / `good_bilingual` 8 变为 `draft_template_only` 225 / `draft_needs_translation` 173 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮严格只处理 5 个 File Members 函数索引页：`full_site/api/globals_func_e.html`、`full_site/api/globals_func_g.html`、`full_site/api/globals_func_h.html`、`full_site/api/globals_func_j.html`、`full_site/api/globals_func_l.html`；继续低优先处理 `_source.html` 源码页。
- 新增 `scripts/refine_openusd_api_file_members_func_batch_031.mjs`，每页新增 `api-file-members-func-quality-pass-031` 中文精修导读区块，包含函数索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 E 段 `EfGetFirstValidInputValue()` 与 `firstValidInputValue.h`；G 段 Gf 数学、gamma、component-wise vector、cross product、closest-points 等函数；H 段 `hash_value()` 与 Hio OpenVDB grid asset utilities；J 段 Js JSON convert/find/parse/write 工具；L 段 `LoadUsdPhysicsFromRange()` 与 UsdPhysics parse utilities。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 235 / `draft_needs_translation` 163 / `good_bilingual` 8 变为 `draft_template_only` 230 / `draft_needs_translation` 168 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮严格只处理 5 个页面，并按用户要求跳过低优先级 `_source.html` 源码页：`full_site/api/executor_invalidation_data_8h.html`、`full_site/api/glf_page_front.html`、`full_site/api/globals_c.html`、`full_site/api/globals_e.html`、`full_site/api/globals_func_c.html`。
- 新增 `scripts/refine_openusd_api_file_members_batch_030.mjs`，每页新增 `api-file-members-quality-pass-030` 中文精修导读区块，包含 API/file-member 索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、函数名、头文件名、代码、链接和原英文摘录。
- 本轮中文层覆盖 `executorInvalidationData.h` 文件引用页的 include dependency graph、反向 include 关系和 Exec/Vdf 文件定位；Glf 模块入口的 OpenGL output utility classes 定位；`globals_c.html` 中 `CombineError()`、`CombineResult()`、`CombineUnbatched()` 与 `CustomUsdPhysicsTokens`；`globals_e.html` 中 Ef/Exec 执行系统条目；`globals_func_c.html` 中 namespaceEdit.h 的函数子索引。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 240 / `draft_needs_translation` 158 / `good_bilingual` 8 变为 `draft_template_only` 235 / `draft_needs_translation` 163 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API Class Members 索引页：`full_site/api/functions_w.html`、`full_site/api/functions_x.html`、`full_site/api/functions_y.html`、`full_site/api/functions_z.html`、`full_site/api/functions.html`。
- 新增 `scripts/refine_openusd_api_functions_members_tail_batch_029.mjs`，每页新增 `api-functions-members-tail-quality-pass-029` 中文精修导读区块，包含类成员索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 W 段的 Work/Vdf/Ef 执行与缓存、Sdf/Pcp 路径表达式和 namespace edit、GfVec4、UsdShade/UsdSkel/UsdGeom/UsdHydra tokens、Ar/Hio/Trace/Glf/SdfFileFormat 等；X/Y/Z 段的 GfVec2/3/4、UsdGeom/UsdLux/UsdPhysics/UsdVol tokens、UsdGeomXformable::XformQuery 与 VdfExecutorBufferData；总索引页的 Vdf execution、Hydra/Storm buffer、scene index plugins、Trace/Tf/Ar/UsdShade/Sdf/Exec/Ef/plugin registry/GfColor 等入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 245 / `draft_needs_translation` 153 / `good_bilingual` 8 变为 `draft_template_only` 240 / `draft_needs_translation` 158 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 变量索引页：`full_site/api/functions_vars_w.html`、`full_site/api/functions_vars_x.html`、`full_site/api/functions_vars_y.html`、`full_site/api/functions_vars_z.html`、`full_site/api/functions_vars.html`。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_028.mjs`，每页新增 `api-functions-vars-quality-pass-028` 中文精修导读区块，包含变量索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 W 段的 PcpDependentNamespaceEdits、UsdShade/UsdSkel/UsdGeom/UsdHydra tokens、UsdSkelImagingWeightAndSubShapeIndex 和 Vdf_WeightSlot；X 段的 UsdGeom/UsdPhysics token；Y 段的 UsdGeom/UsdLux/UsdPhysics token；Z 段的 UsdGeom/UsdLux/UsdPhysics/UsdVol token；总索引页的 GfColor、HdBufferArray、字母分段导航和清单外链接本地缺口策略。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 250 / `draft_needs_translation` 148 / `good_bilingual` 8 变为 `draft_template_only` 245 / `draft_needs_translation` 153 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 变量索引页：`full_site/api/functions_vars_r.html`、`full_site/api/functions_vars_s.html`、`full_site/api/functions_vars_t.html`、`full_site/api/functions_vars_u.html`、`full_site/api/functions_vars_v.html`。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_027.mjs`，每页新增 `api-functions-vars-quality-pass-027` 中文精修导读区块，包含变量索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 R 段的 schema tokens、UsdPhysics shape/material/articulation、Hydra/Embree/AOV、Pcp error、ArAssetInfo 与 Sdr discovery；S 段的大量 UsdGeom schema class、API schema、Sdf namespace edit、scene index、skel bake 和 rigid body；T 段的 Pcp error/relocation、joint drive、trace、named texture handle、schema info 和 connection source info；U 段的 SdfZipFile、GfRange、Pcp dependency、imaging property mapping、HdMeshReprDesc 和 Embree；V 段的 Exec value override、MaterialX USD type info、schema registry、shader discovery、asset info 和 domain tokens。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 255 / `draft_needs_translation` 143 / `good_bilingual` 8 变为 `draft_template_only` 250 / `draft_needs_translation` 148 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 变量索引页：`full_site/api/functions_vars_m.html`、`full_site/api/functions_vars_n.html`、`full_site/api/functions_vars_o.html`、`full_site/api/functions_vars_p.html`、`full_site/api/functions_vars_q.html`。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_026.mjs`，每页新增 `api-functions-vars-quality-pass-026` 中文精修导读区块，包含变量索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 M 段的 Pcp dependency/arc、Vdf schedule input、Hydra display/repr/AOV、render spec、physics shape/joint/collision group；N 段的 TfMallocTag call tree/call stack、primvar、named texture handle、registered variant set、validation metadata、Pcp changes；O 段的 TfRefPtrTracker trace、Hydra picking/instance context、Pcp reference/relocation errors、Exec value override；P 段的 Pcp layer stack/prim index outputs、Hydra scene index/Embree prototype、UsdSkel imaging、physics object/rigid body；Q 段的 UsdVolTokensType 短页定位。
- 初次质量审计发现 `functions_vars_p.html` 中文量仍偏薄，本轮只在该页补充更明确的中文分组说明，未新增第 6 页。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 260 / `draft_needs_translation` 138 / `good_bilingual` 8 变为 `draft_template_only` 255 / `draft_needs_translation` 143 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 变量索引页：`full_site/api/functions_vars_h.html`、`full_site/api/functions_vars_i.html`、`full_site/api/functions_vars_j.html`、`full_site/api/functions_vars_k.html`、`full_site/api/functions_vars_l.html`。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_025.mjs`，每页新增 `api-functions-vars-quality-pass-025` 中文精修导读区块，包含变量索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 H 段的 physics shape desc、HdStShaderCode texture handle、property mapping；I 段的 imaging/instancer、Vdf schedule/data vector、Sdf/Pcp namespace edit、physics/validation；J 段的 D6 joint、HdEmbreeConfig、UsdSkel/physics tokens；K 段的 validator metadata、schema registry、rigid body desc；L 段的 Pcp relocation/layer stack、UsdSkel bake skinning、linear units、physics joint desc、Exec provider resolution 和多 domain tokens。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 265 / `draft_needs_translation` 133 / `good_bilingual` 8 变为 `draft_template_only` 260 / `draft_needs_translation` 138 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 变量索引页：`full_site/api/functions_vars_c.html`、`full_site/api/functions_vars_d.html`、`full_site/api/functions_vars_e.html`、`full_site/api/functions_vars_f.html`、`full_site/api/functions_vars_g.html`。
- 新增 `scripts/refine_openusd_api_functions_vars_batch_024.mjs`，每页新增 `api-functions-vars-quality-pass-024` 中文精修导读区块，包含变量索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 C 段的 token table、Hydra/AOV、Pcp error、physics desc；D 段的 RenderVar、CameraUtil/GfCamera、Tf spin mutex、Pcp cache/layer stack changes、validation metadata；E 段的 namespace edit、joint limit、VtArrayEditBuilder、asset path context；F 段的 UsdImaging data source mapping、schema registry、physics articulation/collision group、composition field edit；G 段的 schema token、UsdPhysicsSceneDesc、HdMeshReprDesc 和 GL engine parameters。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；本轮未破坏清单内本地链接和清单外 placeholder 路由。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 270 / `draft_needs_translation` 128 / `good_bilingual` 8 变为 `draft_template_only` 265 / `draft_needs_translation` 133 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 索引页：`full_site/api/functions_type.html`、`full_site/api/functions_u.html`、`full_site/api/functions_v.html`、`full_site/api/functions_vars_a.html`、`full_site/api/functions_vars_b.html`。
- 新增 `scripts/refine_openusd_api_functions_type_vars_batch_023.mjs`，每页新增 `api-functions-type-vars-quality-pass-023` 中文精修导读区块，包含索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 typedef/alias 索引里的 Vdf executor、Sdf/Usd range、Tf/Vt 容器；Class Members U/V 的 USD stage/prim/material、Hydra shader/time sample/render buffer、validation、Vdf iterator、Exec value override；Variables A/B 的 token table、AOV、scene index、UsdSkel imaging、physics shape desc、Sdr shader discovery 与 Hgi mip info。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；清单外 class/API 链接继续经 `site/uncovered_openusd_page.html` 承接并保留 `data-official-href` 供追溯。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 275 / `draft_needs_translation` 123 / `good_bilingual` 8 变为 `draft_template_only` 270 / `draft_needs_translation` 128 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 索引页：`full_site/api/functions_rela_s.html`、`full_site/api/functions_rela_t.html`、`full_site/api/functions_rela.html`、`full_site/api/functions_s.html`、`full_site/api/functions_t.html`。
- 新增 `scripts/refine_openusd_api_functions_related_batch_022.mjs`，每页新增 `api-functions-related-quality-pass-022` 中文精修导读区块，包含索引用法、模块边界、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 related S/T 的 Sdf predicate/path expression、Vdf/Vt value 容器、TfRefPtr/TfRefBase、PcpInstanceKey、SdfSpec、TfToken、TfPyMethodResult；同时覆盖 Class Members S/T 的 Sdf/UsdStage/UsdTimeCode、Hydra/Embree sampler、scene delegate、Vdf executor、Pcp error、Tf 基础设施和 UsdPhysicsJointDrive。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页官方 URL 仅保留在“打开官方原页 / Open official page”导航链接中。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 280 / `draft_needs_translation` 118 / `good_bilingual` 8 变为 `draft_template_only` 275 / `draft_needs_translation` 123 / `good_bilingual` 8。
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

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 索引页：`full_site/api/functions_q.html`、`full_site/api/functions_r.html`、`full_site/api/functions_rela_g.html`、`full_site/api/functions_rela_h.html`、`full_site/api/functions_rela_o.html`。
- 新增 `scripts/refine_openusd_api_functions_related_batch_021.mjs`，每页新增 `api-functions-related-quality-pass-021` 中文精修导读区块，包含索引用法、模块辨识、术语对照和结构提醒；保留英文页面名、API 符号、template 参数、数学符号、链接、代码和原英文摘录。
- 本轮中文层覆盖 Q 段 UsdVol/Sdf layer/CLI ConfigBase，R 段 physics shape desc、Sdf/Ar/Hio file access、Vdf accessor、Hydra buffer，以及 related G/H/O 的 Gf math、Ar/Sdf/Tf/Usd 相关函数入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 285 / `draft_needs_translation` 113 / `good_bilingual` 8 变为 `draft_template_only` 280 / `draft_needs_translation` 118 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 class member、related function、签名和成员文档的完整翻译。
- 全量仍有 280 个 `draft_template_only` 和 118 个 `draft_needs_translation`；后续 related/type/vars 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_rela_s.html`、`functions_rela_t.html`、`functions_rela.html`、`functions_s.html`、`functions_t.html`。
2. 对 functions/related 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 151 轮：API Class Members L-P 索引页 draft 精修
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API Class Members 索引页：`full_site/api/functions_l.html`、`full_site/api/functions_m.html`、`full_site/api/functions_n.html`、`full_site/api/functions_o.html`、`full_site/api/functions_p.html`。
- 新增 `scripts/refine_openusd_api_functions_members_batch_020.mjs`，每页新增 `api-functions-members-quality-pass-020` 中文精修导读区块，包含 4 条类成员索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、template 参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 L 段 Pcp relocation/UsdPhysics joint/Sdf 数据层、M 段 Sdf expression/UsdGeom/Pcp map/Hydra/Trace、N 段 Hydra scene index/PcpError 诊断、O 段 Ar/Sdf package/Hydra schema、P 段 Sdr shader parser/usdVol particle field/Pcp layer stack。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 290 / `draft_needs_translation` 108 / `good_bilingual` 8 变为 `draft_template_only` 285 / `draft_needs_translation` 113 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项类成员、枚举值、函数签名和成员文档的完整翻译。
- 全量仍有 285 个 `draft_template_only` 和 113 个 `draft_needs_translation`；后续 Class Members Q/R、related/type/vars 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_q.html`、`functions_r.html`、`functions_rela_g.html`、`functions_rela_h.html`、`functions_rela_o.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 150 轮：API Class Members G-K 索引页 draft 精修
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API Class Members 索引页：`full_site/api/functions_g.html`、`full_site/api/functions_h.html`、`full_site/api/functions_i.html`、`full_site/api/functions_j.html`、`full_site/api/functions_k.html`。
- 新增 `scripts/refine_openusd_api_functions_members_batch_019.mjs`，每页新增 `api-functions-members-quality-pass-019` 中文精修导读区块，包含 4 条类成员索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、template 参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 G 段 Hydra/Hgi/GfMatrix/resource registry，H 段 UsdPhysics shape desc/Sdf/Pcp/Usd 对象，I 段 schema token/Pcp map/Hydra buffer/Sdf namespace edit，J 段 physics joint/UsdSkel/JSON，K 段 Sdf notice/TfNotice/validator metadata/resource layout。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 295 / `draft_needs_translation` 103 / `good_bilingual` 8 变为 `draft_template_only` 290 / `draft_needs_translation` 108 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项类成员、枚举值、函数签名和成员文档的完整翻译。
- 全量仍有 290 个 `draft_template_only` 和 108 个 `draft_needs_translation`；后续 Class Members L-R/S-V/type/rela 等索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_l.html`、`functions_m.html`、`functions_n.html`、`functions_o.html`、`functions_p.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 149 轮：API functions_func 尾页与相邻索引页 draft 精修
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API 索引页：`full_site/api/functions_func_y.html`、`full_site/api/functions_func_z.html`、`full_site/api/functions_enum.html`、`full_site/api/functions_eval.html`、`full_site/api/functions_func.html`。
- 新增 `scripts/refine_openusd_api_functions_index_batch_018.mjs`，每页新增 `api-functions-index-quality-pass-018` 中文精修导读区块，包含 4 条索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、template 参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 Y/Z 段 GfVec 分量与 VdfExecutorBufferData、`functions_enum` 的枚举类型索引、`functions_eval` 的枚举值索引、`functions_func` 的函数成员总索引和 Hydra/Vdf/Trace 模块导航。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 300 / `draft_needs_translation` 98 / `good_bilingual` 8 变为 `draft_template_only` 295 / `draft_needs_translation` 103 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项枚举值、函数签名和成员文档的完整翻译。
- 全量仍有 295 个 `draft_template_only` 和 103 个 `draft_needs_translation`；functions_func 系列模板草稿已清完，但其他 functions_* 索引页和大量 class/API 页面仍未达标。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_g.html`、`functions_h.html`、`functions_i.html`、`functions_j.html`、`functions_k.html`。
2. 对 functions_* 索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 148 轮：API functions_func 索引页 draft 精修（五）
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API functions_func 函数成员索引页：`full_site/api/functions_func_t.html`、`full_site/api/functions_func_u.html`、`full_site/api/functions_func_v.html`、`full_site/api/functions_func_w.html`、`full_site/api/functions_func_x.html`。
- 新增 `scripts/refine_openusd_api_functions_func_batch_017.mjs`，每页新增 `api-functions-func-quality-pass-017` 中文精修导读区块，包含 4 条函数索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、template 参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 T 段 Tf/Vdf executor/diagnostic/Python binding、U 段 UsdStage/VtValue/GfRange/HdSt/Vdf update、V 段 validation/UsdSkel/Vdf vector、W 段 Work task/write/wait/Trace/JsWriter、X 段 GfVec 与 XformQuery。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 305 / `draft_needs_translation` 93 / `good_bilingual` 8 变为 `draft_template_only` 300 / `draft_needs_translation` 98 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名和成员文档的完整翻译。
- 全量仍有 300 个 `draft_template_only` 和 98 个 `draft_needs_translation`；functions_func 剩余模板草稿只剩 `functions_func_y.html` 和 `functions_func_z.html`。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_func_y.html`、`functions_func_z.html`，再选择 `functions_enum.html`、`functions_eval.html`、`functions_func.html`。
2. 对剩余 functions_func 与相邻索引页继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 147 轮：API functions_func 索引页 draft 精修（四）
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认本轮继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API functions_func 函数成员索引页：`full_site/api/functions_func_o.html`、`full_site/api/functions_func_p.html`、`full_site/api/functions_func_q.html`、`full_site/api/functions_func_r.html`、`full_site/api/functions_func_s.html`。
- 新增 `scripts/refine_openusd_api_functions_func_batch_016.mjs`，每页新增 `api-functions-func-quality-pass-016` 中文精修导读区块，包含 4 条函数索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、template 参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 O 段 Ar/Sdf/Hd/Trace 入口、P 段 Sdf predicate/Sdr/UsdVol/Pcp 入口、Q 段 Sdf query 与 CLI ConfigBase、R 段 resource/file format/Hd buffer/Trace 入口、S 段 sampler/scene delegate/scoped lock/Sdf namespace edit 入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0；目标页实际 `href` 抽查确认非预期官方外跳为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 310 / `draft_needs_translation` 88 / `good_bilingual` 8 变为 `draft_template_only` 305 / `draft_needs_translation` 93 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名和成员文档的完整翻译。
- 全量仍有 305 个 `draft_template_only` 和 93 个 `draft_needs_translation`；下一轮继续 functions_func 后续字母页时仍要控制每轮最多 5 页。

下一轮目标：

1. 继续最多 5 页，优先处理 `functions_func_t.html`、`functions_func_u.html`、`functions_func_v.html`、`functions_func_w.html`、`functions_func_x.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总体验证，并记录分级变化。

## 第 146 轮：API functions_func 索引页 draft 精修（三）
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API functions_func 函数成员索引页：`full_site/api/functions_func_j.html`、`full_site/api/functions_func_k.html`、`full_site/api/functions_func_l.html`、`full_site/api/functions_func_m.html`、`full_site/api/functions_func_n.html`。
- 新增 `scripts/refine_openusd_api_functions_func_batch_015.mjs`，每页新增 `api-functions-func-quality-pass-015` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、模板参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 J 段 JSON/UsdSkel/SdfPath 少量索引、K 段 SdfChildrenView 与 SdfNotice、L 段 UsdLux/Sdf/Plug/Trace/Vdf 交叉入口、M 段 expression/UsdGeom/EditTarget/Hd/Trace 条目、N 段 Hydra scene index 与 PcpError 诊断入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 315 / `draft_needs_translation` 83 / `good_bilingual` 8 变为 `draft_template_only` 310 / `draft_needs_translation` 88 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名和成员说明的完整翻译。
- 全量仍有 310 个 `draft_template_only` 和 88 个 `draft_needs_translation`；下一轮继续 functions_func 后续字母页时仍要控制每轮最多 5 页。

下一轮目标：

1. 继续最多 5 页，从 API 队列中按顺序优先选择 `functions_func_o.html`、`functions_func_p.html`、`functions_func_q.html`、`functions_func_r.html`、`functions_func_s.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 145 轮：API functions_func 索引页 draft 精修（二）
已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页，处理 5 个用户可读价值更高的 API functions_func 函数成员索引页：`full_site/api/functions_func_e.html`、`full_site/api/functions_func_f.html`、`full_site/api/functions_func_g.html`、`full_site/api/functions_func_h.html`、`full_site/api/functions_func_i.html`。
- 新增 `scripts/refine_openusd_api_functions_func_batch_014.mjs`，每页新增 `api-functions-func-quality-pass-014` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、模板参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 E 段 Ef 执行框架和缓存、F 段 Gf/Sdf/Pcp/Hgi/Hd/Vdf 分布、G 段 Hydra 资源与 Hgi 设备、H 段 USD core/Shade/Skel 入口、I 段 StageCache/FileFormat/PopulationMask/MemoryTag 等索引入口。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，`files_changed` 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 320 / `draft_needs_translation` 78 / `good_bilingual` 8 变为 `draft_template_only` 315 / `draft_needs_translation` 83 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`，398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名和成员说明的完整翻译。
- 全量仍有 315 个 `draft_template_only` 和 83 个 `draft_needs_translation`；下一轮继续 functions_func 后续字母页时仍要控制每轮最多 5 页。

下一轮目标：

1. 继续最多 5 页，从 API 队列中按顺序优先选择 `functions_func_j.html`、`functions_func_k.html`、`functions_func_l.html`、`functions_func_m.html`、`functions_func_n.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 144 轮：API functions_func 索引页 draft 精修（一）

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页和单个头文件页，筛选 5 个用户可读价值更高的 API functions_func 函数成员索引页：`full_site/api/functions_func_~.html`、`full_site/api/functions_func_a.html`、`full_site/api/functions_func_b.html`、`full_site/api/functions_func_c.html`、`full_site/api/functions_func_d.html`。
- 新增 `scripts/refine_openusd_api_functions_func_batch_013.mjs`，每页新增 `api-functions-func-quality-pass-013` 中文精修导读区块，包含 4 条中文函数索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、模板参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 symbol/destructor-like 函数索引、Tf scoped lock/mutex、SdfChildrenView/SdfListProxy/TfSpan/VtArray 容器视图、Pcp/Trace/CameraUtil/UsdCollectionAPI 交叉条目，以及 GfMatrix/GfVec 数学类型函数索引。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 325 / `draft_needs_translation` 73 / `good_bilingual` 8 变为 `draft_template_only` 320 / `draft_needs_translation` 78 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项函数签名和成员说明的完整翻译。
- 全量仍有 320 个 `draft_template_only` 和 78 个 `draft_needs_translation`；下一轮继续 functions_func 后续字母页时仍要控制每轮最多 5 页。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择 `functions_func_e.html`、`functions_func_f.html`、`functions_func_g.html`、`functions_func_h.html`、`functions_func_i.html`。
2. 对 functions_func 系列继续补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 143 轮：API functions 索引页 draft 精修（二）

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 本轮跳过 `_source.html` 源码页和单个头文件页，筛选 5 个用户可读价值更高的 API functions 索引页：`full_site/api/functions_~.html`、`full_site/api/functions_c.html`、`full_site/api/functions_d.html`、`full_site/api/functions_e.html`、`full_site/api/functions_f.html`。
- 新增 `scripts/refine_openusd_api_functions_batch_012.mjs`，每页新增 `api-functions-quality-pass-012` 中文精修导读区块，包含 4 条中文索引用法/模块辨识说明和 5 条术语对照；保留英文页面名、API 符号、模板参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 symbol/destructor-like 索引段、Pcp/Trace/Hd/UsdCollectionAPI 交叉条目、GfMatrix/GfVec/Tf/Vt 基础类型、UsdTimeCode/Sdf namespace edit/Ef executor 条目，以及 token table/schema registry/file format/Sdr discovery 等阅读策略。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 330 / `draft_needs_translation` 68 / `good_bilingual` 8 变为 `draft_template_only` 325 / `draft_needs_translation` 73 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`：398/398 draft 预览通过；5 个目标页均带有本轮 marker，坏编码风险 0，非预期官方外跳 0。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 API 成员完整翻译。
- 全量仍有 325 个 `draft_template_only` 和 73 个 `draft_needs_translation`；下一轮继续 API functions_func 系列时仍要控制每轮最多 5 页。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择 `functions_func_~.html`、`functions_func_a.html`、`functions_func_b.html`、`functions_func_c.html`、`functions_func_d.html` 等索引页。
2. 对 functions_func 系列补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 142 轮：API 索引页 draft 精修（一）

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认队列已进入 API 源码/索引页阶段。
- 本轮跳过 `_source.html` 源码页和单个头文件页，筛选 5 个用户可读价值更高的 API 索引/入口页：`full_site/api/classes.html`、`full_site/api/deprecated.html`、`full_site/api/files.html`、`full_site/api/functions_a.html`、`full_site/api/functions_b.html`。
- 新增 `scripts/refine_openusd_api_index_batch_011.mjs`，每页新增 `api-index-quality-pass-011` 中文精修导读区块，包含 4 条中文索引用法/导航说明和 5 条术语对照；保留英文页面名、API 符号、模板参数、链接、代码和原英文摘录。
- 本轮中文层覆盖 Class Index 的模块前缀导航、Deprecated List 的迁移用途、File List 的头文件/源码页边界、functions_a/functions_b 的 class members 字母索引查找策略。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 335 / `draft_needs_translation` 63 / `good_bilingual` 8 变为 `draft_template_only` 330 / `draft_needs_translation` 68 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，不是逐项 API 成员完整翻译。
- 全量仍有 330 个 `draft_template_only` 和 68 个 `draft_needs_translation`；API 队列里还有大量源码页和字母索引页，需要继续筛选，低优先处理 `_source.html`。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先选择 `functions_~.html`、`functions_c.html`、`functions_d.html`、`functions_e.html`、`functions_f.html` 等索引页。
2. 对 API 索引页补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 141 轮：usdVol 剩余高价值 schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 本轮不为凑满 5 页去处理紧随其后的 API 源码页，实际只处理 4 个剩余高价值 usdVol 页面：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/usdVol_toc.html`。
- 新增 `scripts/refine_openusd_usdVol_remaining_batch_010.mjs`，每页新增 `usdVol-remaining-quality-pass-010` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、数学符号、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 GaussianSurflet 的 XY plane/off-plane opacity、PositionBaseAPI 的 positions 决定 particle count、RadianceBaseAPI 的 radiance definition validation、usdVol_toc 的 Volumes/Fields/Particle Fields 阅读路线。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 339 / `draft_needs_translation` 59 / `good_bilingual` 8 变为 `draft_template_only` 335 / `draft_needs_translation` 63 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 4 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 335 个 `draft_template_only` 和 63 个 `draft_needs_translation`；下一轮队列进入 API 源码/索引页，需要筛选用户可读价值高的页面，低优先处理 `_source.html`。

下一轮目标：

1. 继续最多 5 页，从 API 队列中优先筛选 `classes.html`、`deprecated.html`、`files.html` 等索引/入口页，避免机械处理低价值源码页。
2. 对 API 索引页补中文用途说明、导航方式、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 140 轮：usdVol volume/particle kernel schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_usdVol_schema_batch_009.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`。
- 每页新增 `usdVol-schema-quality-pass-009` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、数学符号、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 Field3DAsset 的 `.f3d` density field、OpenVDBAsset 的 `.vdb` volume grid、ParticleFieldKernelBaseAPI 的 spatial basis function、ConstantSurflet 的 step-function falloff、GaussianEllipsoid 的 3-sigma 和 Gaussian falloff。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 344 / `draft_needs_translation` 54 / `good_bilingual` 8 变为 `draft_template_only` 339 / `draft_needs_translation` 59 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 339 个 `draft_template_only` 和 59 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`ParticleFieldPositionBaseAPI.html`、`ParticleFieldRadianceBaseAPI.html`、`usdVol_toc.html`，再选择一个高价值 API 入口或继续保持 4 页实际目标。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 139 轮：usdUI hints schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_usdUI_hints_batch_008.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`、`full_site/release/user_guides/schemas/usdUI/usdUI_toc.html`。
- 每页新增 `usdUI-hints-quality-pass-008` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 ObjectHints 的 displayName/hidden、PrimHints 的 display groups 与 conditional UI hints、PropertyHints 的 property-level hints、SceneGraphPrimAPI 的场景图描述信息、usdUI_toc 的目录阅读路线。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 349 / `draft_needs_translation` 49 / `good_bilingual` 8 变为 `draft_template_only` 344 / `draft_needs_translation` 54 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 344 个 `draft_template_only` 和 54 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdVol/Field3DAsset.html`、`OpenVDBAsset.html`、`ParticleFieldKernelBaseAPI.html`、`ParticleFieldKernelConstantSurfletAPI.html`、`ParticleFieldKernelGaussianEllipsoidAPI.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 138 轮：usdRender/usdUI schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_usdUI_schema_batch_007.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`、`full_site/release/user_guides/schemas/usdUI/AttributeHints.html`、`full_site/release/user_guides/schemas/usdUI/Backdrop.html`、`full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`。
- 每页新增 `usdUI-schema-quality-pass-007` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 usdRender 目录入口、AccessibilityAPI 的无障碍信息三元组、AttributeHints 的 UI labels/ordering、Backdrop 的节点图分组、NodeGraphNodeAPI 的位置/颜色/堆叠顺序属性。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 354 / `draft_needs_translation` 44 / `good_bilingual` 8 变为 `draft_template_only` 349 / `draft_needs_translation` 49 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 349 个 `draft_template_only` 和 49 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdUI/ObjectHints.html`、`PrimHints.html`、`PropertyHints.html`、`SceneGraphPrimAPI.html`、`usdUI_toc.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 137 轮：usdMedia/usdRender schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_usdRender_schema_batch_006.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdRender/RenderPass.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettings.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`。
- 每页新增 `usdRender-schema-quality-pass-006` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 usdMedia 目录入口、RenderPass 的多 pass 工作流、RenderProduct 的输出 artifact、RenderSettings 的全局配置和 renderer-specific API schema、RenderVar 的 AOV/channel/source 信息。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 359 / `draft_needs_translation` 39 / `good_bilingual` 8 变为 `draft_template_only` 354 / `draft_needs_translation` 44 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 354 个 `draft_template_only` 和 44 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdRender/usdRender_toc.html`、`user_guides/schemas/usdUI/AccessibilityAPI.html`、`AttributeHints.html`、`Backdrop.html`、`NodeGraphNodeAPI.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 136 轮：usdLux/usdMedia schema draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_schema_media_batch_005.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`full_site/release/user_guides/schemas/usdLux/SphereLight.html`、`full_site/release/user_guides/schemas/usdLux/usdLux_toc.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`。
- 每页新增 `schema-media-quality-pass-005` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 RectLight 的 width/height/color map、SphereLight 的 one-sided 与 treatAsPoint、usdLux 目录页的 LightAPI/Boundable/Nonboundable 阅读路线、AssetPreviewsAPI 的 thumbnail previews、SpatialAudio 的 filePath/auralMode/playbackMode/mediaOffset。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 364 / `draft_needs_translation` 34 / `good_bilingual` 8 变为 `draft_template_only` 359 / `draft_needs_translation` 39 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 359 个 `draft_template_only` 和 39 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdMedia/usdMedia_toc.html`、`user_guides/schemas/usdRender/RenderPass.html`、`RenderProduct.html`、`RenderSettings.html`、`RenderVar.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 135 轮：usdLux schema 属性页 draft 精修（一）

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和进度记录，确认当前仍有 398 个 `bilingual_draft`，本轮继续按最多 5 页推进。
- 新增 `scripts/refine_openusd_usdLux_schema_batch_004.mjs`，本轮严格只处理 5 页：`full_site/release/user_guides/schemas/usdLux/CylinderLight.html`、`full_site/release/user_guides/schemas/usdLux/DiskLight.html`、`full_site/release/user_guides/schemas/usdLux/DistantLight.html`、`full_site/release/user_guides/schemas/usdLux/DomeLight.html`、`full_site/release/user_guides/schemas/usdLux/LightListAPI.html`。
- 每页新增 `usdLux-schema-quality-pass-004` 中文精修导读区块，包含 4 条中文用途/属性阅读说明和 5 条术语对照；保留英文页面名、API 名称、属性名、链接、代码、命令和原英文摘录。
- 本轮中文层覆盖 CylinderLight 的 tube/linear light 用途、DiskLight 的圆盘与 -Z 发光方向、DistantLight 的 directional light 与 `inputs:angle`、DomeLight 的 HDR/IBL 环境光、LightListAPI 的 `ComputeLightList()` 和 traversal 用途。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 369 / `draft_needs_translation` 29 / `good_bilingual` 8 变为 `draft_template_only` 364 / `draft_needs_translation` 34 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页仍只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 364 个 `draft_template_only` 和 34 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdLux/RectLight.html`、`SphereLight.html`、`usdLux_toc.html`、`user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`SpatialAudio.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 134 轮：release 用户指南与插件入口 draft 精修

已完成：

- 先复核全量清单、翻译质量报告、draft 预览报告、本地链接路由报告、报告索引、总验证报告、最终入口和当前进度记录，确认继续按质量精修阶段推进，而不是重跑 pending 队列。
- 新增 `scripts/refine_openusd_release_guides_batch_003.mjs`，本轮严格只处理 5 页：`full_site/release/tut_variants_example_in_katana.html`、`full_site/release/user_guides/collections_and_patterns.html`、`full_site/release/user_guides/namespace_editing.html`、`full_site/release/user_guides/schemas/index.html`、`full_site/release/plugins_alembic.html`。
- 每页新增 `release-guide-quality-pass-003` 中文精修导读区块，包含 4 条中文阅读说明和 5 条术语对照；保留英文页面名、API 名称、链接、代码、命令、文件扩展名和原英文摘录。
- 本轮中文层覆盖 Katana variant 历史教程定位、Collections relationship-mode/expression-mode、Namespace Editing 的 LayerStack/EditTarget/relocates、Schema Domains 领域索引读法、Alembic 插件构建开关和 usdAbc 互操作。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，files_changed 为 0，链接路由策略未被本轮编辑破坏。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 374 / `draft_needs_translation` 24 / `good_bilingual` 8 变为 `draft_template_only` 369 / `draft_needs_translation` 29 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 369 个 `draft_template_only` 和 29 个 `draft_needs_translation`，下一轮继续按最多 5 页推进。

下一轮目标：

1. 继续最多 5 页，优先质量报告队列中的 `user_guides/schemas/usdLux/CylinderLight.html`、`DiskLight.html`、`DistantLight.html`、`DomeLight.html`、`LightListAPI.html`。
2. 对 schema 属性页补中文用途说明、关键属性读法、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 133 轮：release 入门教程 draft 精修（二）

已完成：

- 先复核 `reports/translation_quality_review.*`、`reports/local_link_routing_report.json`、`work.md` 和 `reports/iteration_report.md`，确认当前不是完成态：406 页中 8 页 `good_bilingual`，398 页仍为 `bilingual_draft`。
- 新增 `scripts/refine_openusd_release_tutorial_batch_002.mjs`，本轮严格只处理 5 页，并为插入锚点增加失败保护；首次发现旧锚点未命中后已修正为匹配 `页面结构 / Page Structure`，再重新执行。
- 本轮精修页面：`full_site/release/tut_helloworld.html`、`full_site/release/tut_inspect_and_author_props.html`、`full_site/release/tut_converting_between_layer_formats.html`、`full_site/release/tut_simple_shading.html`、`full_site/release/tut_xforms.html`。
- 每页新增 `release-tutorial-quality-pass-002` 中文精修导读区块，包含 4 条中文阅读说明和 5 条术语对照；API 名称、页面名、代码、命令、文件扩展名和官方原页链接保持原样。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，清单内 OpenUSD 链接继续路由到本地页面，清单外内部链接继续路由到 `site/uncovered_openusd_page.html`。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 379 / `draft_needs_translation` 19 / `good_bilingual` 8 变为 `draft_template_only` 374 / `draft_needs_translation` 24 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页只是从模板草稿推进到带页面专属中文导读的 `draft_needs_translation`，还不是逐段完整翻译。
- 全量仍有 374 个 `draft_template_only` 和 24 个 `draft_needs_translation`，后续继续按每轮最多 5 页精修。

下一轮目标：

1. 继续最多 5 页，优先当前质量报告队列中的 `tut_variants_example_in_katana.html`、`user_guides/collections_and_patterns.html`、`user_guides/namespace_editing.html`、`user_guides/schemas/index.html` 和 `plugins_alembic.html`。
2. 对 schema 指南和用户指南页补中文阅读路径、术语对照和局部结构说明，仍不把导读层误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并记录分级变化。

## 第 132 轮：release 规范与教程 draft 精修

已完成：

- 按当前 `reports/translation_quality_review.*` 继续质量提升阶段，不再处理 `pending_full_scope` 队列；本轮严格只选 5 个用户可读价值较高的 release/tutorial 页面。
- 新增可重复运行脚本 `scripts/refine_openusd_release_tutorial_batch.mjs`，为 5 个页面插入 `release-tutorial-quality-pass-001` 中文精修导读区块，保留英文页面名、链接、代码和原文摘录。
- 本轮精修页面：`full_site/release/spec.html`、`full_site/release/tut_authoring_variants.html`、`full_site/release/tut_helloworld_redux.html`、`full_site/release/tut_referencing_layers.html`、`full_site/release/tut_traversing_stage.html`。
- 每页补充 4 条中文阅读导引和 5 条术语对照，覆盖 Specifications、variant set、Generic Prims、reference composition arc、UsdStage traversal 等阅读重点。
- 重新运行 `scripts/route_openusd_internal_links_local.mjs`，409 个 HTML 文件检查通过，非显式 OpenUSD release/API 官方外跳仍为 0。
- 重新运行 `scripts/audit_openusd_translation_quality.mjs`，质量分级从 `draft_template_only` 384 / `draft_needs_translation` 14 / `good_bilingual` 8 变为 `draft_template_only` 379 / `draft_needs_translation` 19 / `good_bilingual` 8。
- 重新运行 `scripts/audit_openusd_full_draft_preview.mjs`、`scripts/audit_openusd_report_index.mjs` 和 `scripts/validate_openusd_api_repro.ps1`：398/398 draft 预览通过，报告索引 16/16 通过，总验证 281 checks passed, 0 failed。

差距：

- 本轮 5 页从模板级 draft 提升到带页面专属中文导读的 `draft_needs_translation`，但仍不是逐段完整翻译。
- 全量仍有 379 个 `draft_template_only` 和 19 个 `draft_needs_translation`，后续继续按 5 页一组推进。

下一轮目标：

1. 继续从 release 教程、schema 指南、概念页和核心 API 入口中选最多 5 页，低优先处理纯源码页。
2. 对本轮已经提升到 `draft_needs_translation` 的页面，后续再进入更细的段落级翻译阶段；不要把第一层导读误标为最终完成。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证。

## 2026-06-03

- 创建 `openusd_api_cn_repro` 工作目录。
- 抓取官方源页面快照：`source/openusd_api_index_source.html`。
- 下载 API 首页依赖的 Doxygen CSS、JS、搜索资源和图片到 `site/`。
- 补齐 Doxygen CSS 引用的导航背景、折叠图标、搜索图标和分隔条图片。
- 根据用户补充要求，将复刻目标从“中文版”调整为“中英双语”。
- 创建本地页面：`site/index.html`。
- 创建本地验证脚本：`scripts/validate_openusd_api_repro.ps1`。
- 创建 5 分钟 heartbeat 自动化：`OpenUSD API 中英双语复刻迭代`。
- 用户补充 `https://openusd.org/release/index.html` 也属于范围后，更新自动化为 `OpenUSD 文档中英双语复刻迭代`。
- 抓取 release 文档首页源快照：`source/openusd_release_index_source.html`。
- 下载 release 首页需要的 Sphinx `_static` CSS、JS 和字体资源。
- 创建生成脚本：`scripts/build_release_index_bilingual.mjs`。
- 生成 release 双语入口页：`site/release_index.html`。
- 生成本地 API 跳转页：`site/api/index.html`，保持 release 页中的 `api/index.html` 链接可用。
- 扩展验证脚本，当前覆盖 API 首页和 release 文档首页。
- 最新验证：95 项检查通过，0 项失败。
- 第 3 轮补齐 release 首页图片本地化：`site/images/USDLogoUnsized.svg`、`site/images/USDLogo24.svg`、`site/images/piper-banner.jpg`。
- 扩展 `build_release_index_bilingual.mjs` 术语表，从 35 项增加到 168 项，覆盖 User Guides、Schema Domains、Reference 和关键二级入口。
- 重新生成 `site/release_index.html`，当前中英术语标记数量为 196 组。
- 最新验证：100 项检查通过，0 项失败。
- 第 4 轮本地化 favicon：`site/images/USDIcon.ico`，并将 API 页与 release 页的 favicon 指向本地文件。
- 修补 `site/_static/css/pxr_custom.css`，使 Sphinx 侧栏小 Logo 使用本地 `../../images/USDLogo24.svg`。
- 扩展生成脚本术语表到 190 项，新增教程标题与通用属性标题。
- 增加嵌套 `Inherited Properties (<span>...</span>)` 的双语生成规则。
- 重新生成 `site/release_index.html`，当前 `cn-term`/`en-term` 各 321 处。
- 最新验证：104 项检查通过，0 项失败。
- 第 5 轮新增链接审计脚本：`scripts/audit_openusd_repro_links.mjs`。
- 生成链接审计报告：`reports/link_audit.json` 和 `reports/link_audit.md`。
- 审计结果：本地资源缺失 0 个，外部链接 17 个，范围外官方相对文档链接 638 个。
- 主验证脚本已纳入链接审计结果。
- `link_audit.json` 使用总数加样本结构记录范围外链接，避免把 200 条样本误读为完整数量。
- 最新验证：109 项检查通过，0 项失败。
- 第 6 轮新增范围清单：`reports/scope_manifest.json` 和 `reports/scope_manifest.md`。
- 固定下一批相邻入口优先级：`intro.html`、`apiDocs.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html`、`glossary.html`、`toolset.html`。
- 主验证脚本已检查 scope manifest 覆盖两个官方入口 URL，并包含至少 4 个相邻入口候选。
- 第 7 轮抓取并生成第一相邻入口页 `intro.html`。
- 新增源快照：`source/openusd_release_intro_source.html`。
- 新增生成脚本：`scripts/build_intro_bilingual.mjs`。
- 新增本地页面：`site/intro.html`，保留官方英文正文和 Sphinx 结构，补中文标题/目录/导航/范围说明。
- 将 `intro.html` 纳入链接审计页面列表。
- 最新审计：4 个页面，本地资源缺失 0 个，外部链接 31 个，范围外官方相对文档链接 1314 个。
- 最新验证：119 项检查通过，0 项失败。
- 第 8 轮抓取并生成 release 参考桥接页 `apiDocs.html`。
- 新增源快照：`source/openusd_release_apiDocs_source.html`。
- 新增生成脚本：`scripts/build_apiDocs_bilingual.mjs`。
- 新增本地页面：`site/apiDocs.html`，保留官方英文正文、Sphinx 结构和 `USD C++ API Documentation` 按钮，补中文标题/面包屑/导航/范围说明。
- 将 `apiDocs.html` 纳入链接审计页面列表。
- 更新 `scope_manifest`，把 `apiDocs.html` 从候选入口升级为 active adjacent scope。
- 最新审计：5 个页面，本地资源缺失 0 个，外部链接 35 个，范围外官方相对文档链接 1938 个。
- 最新验证：124 项检查通过，0 项失败。
- 第 9 轮抓取并生成 API 首页相邻概念入口页 `_usd__overview_and_purpose.html`。
- 新增源快照：`source/openusd_api_overview_and_purpose_source.html`。
- 新增生成脚本：`scripts/build_api_overview_bilingual.mjs`。
- 新增本地页面：`site/_usd__overview_and_purpose.html`，保留 Doxygen 结构、API 名称、模块名和链接目标，主要标题/段落/模块列表按中文在上、英文原文在下呈现。
- 扩展 `site/openusd_cn.css`，补充双语列表项和双语标题样式。
- 将 `_usd__overview_and_purpose.html` 纳入链接审计页面列表。
- 更新 `scope_manifest`，把 `_usd__overview_and_purpose.html` 从候选入口升级为 active adjacent scope。
- 最新审计：6 个页面，本地资源缺失 0 个，外部链接 43 个，范围外官方相对文档链接 2010 个。
- 最新验证：132 项检查通过，0 项失败。
- 第 10 轮抓取并生成 API 首页直达的 Usd core API front page：`usd_page_front.html`。
- 新增源快照：`source/openusd_api_usd_page_front_source.html`。
- 新增生成脚本：`scripts/build_usd_page_front_bilingual.mjs`。
- 新增本地页面：`site/usd_page_front.html`，保留 Doxygen 布局、API Manual 目录层级、类名和链接目标，补 54 组中英目录术语与 8 个关键类双语摘要。
- 扩展 `site/openusd_cn.css`，补充 `cn-term`、`en-term`、`zh-inline`、`en-inline` 和 `key-class-line` 样式。
- 将 `usd_page_front.html` 纳入链接审计页面列表。
- 更新 `scope_manifest`，把 `usd_page_front.html` 从候选入口升级为 active adjacent scope。
- 最新审计：7 个页面，本地资源缺失 0 个，外部链接 45 个，范围外官方相对文档链接 2065 个。
- 最新验证：140 项检查通过，0 项失败。
- 第 11 轮抓取并生成 release 术语入口页 `glossary.html`。
- 新增源快照：`source/openusd_release_glossary_source.html`。
- 新增生成脚本：`scripts/build_glossary_bilingual.mjs`。
- 新增本地页面：`site/glossary.html`，保留 Sphinx 结构、官方英文定义和链接，补中文术语标签、目录/标题双语层和 18 个核心术语速览卡片。
- 新增页内实际图片依赖：`site/_images/glossary_radiusSpline.png`、`site/_images/glossary_usdviewValidation.png`。
- 扩展 `site/openusd_release_cn.css`，补充 glossary 速览卡片样式。
- 将 `glossary.html` 纳入链接审计页面列表。
- 更新 `scope_manifest`，把 `glossary.html` 从候选入口升级为 active adjacent scope。
- 最新审计：8 个页面，本地资源缺失 0 个，外部链接 51 个，范围外官方相对文档链接 2829 个。
- 最新验证：149 项检查通过，0 项失败。
- 第 12 轮抓取并生成 release 命令行工具入口页 `toolset.html`。
- 新增源快照：`source/openusd_release_toolset_source.html`。
- 新增生成脚本：`scripts/build_toolset_bilingual.mjs`。
- 新增本地页面：`site/toolset.html`，保留 Sphinx 结构、官方命令用法块、选项名、命令名和链接，补 19 个工具速览卡片与 19 条小节双语说明。
- 扩展 `site/openusd_release_cn.css`，补充 toolset 速览卡片和工具说明样式。
- 将 `toolset.html` 纳入链接审计页面列表。
- 更新 `scope_manifest`，把 `toolset.html` 从候选入口升级为 active adjacent scope；原计划相邻入口优先级已清空。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：156 项检查通过，0 项失败。
- 第 13 轮不扩展页面范围，转为精修 `glossary.html` 的定义级双语层。
- 更新 `scripts/build_glossary_bilingual.mjs`，为 `Active / Inactive`、`API Schema`、`Asset`、`Asset Resolution`、`Attribute`、`Composition`、`Composition Arcs`、`Layer`、`Payload`、`Prim`、`Stage`、`Value Resolution`、`Variant`、`VariantSet` 增加 14 条中文解释和英文导读。
- 扩展 `site/openusd_release_cn.css`，新增 `cn-definition-brief` 样式。
- 重新生成 `site/glossary.html`；局部自检结果：14 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 扩展主验证脚本，新增 `glossary:has_definition_briefs` 检查。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：157 项检查通过，0 项失败。
- 第 14 轮继续精修 `glossary.html`，不扩大页面范围。
- 更新 `scripts/build_glossary_bilingual.mjs`，第二批新增 `Kind`、`List Editing`、`Load / Unload`、`Metadata`、`Model`、`Namespace`、`Primvar`、`Property`、`References`、`Relationship`、`Schema`、`TimeCode`、`TimeSample`、`Visibility` 的定义级中文解释。
- 将 glossary 顶部说明从“首批定义小节”改为动态显示 28 个高频定义小节，避免说明与实际覆盖量脱节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 14 条改为至少 28 条，并增加 `References`、`Primvar`、`TimeCode` 存在检查。
- 重新生成 `site/glossary.html`；局部自检结果：28 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：157 项检查通过，0 项失败。
- 第 15 轮按第 14 轮下一目标推进 `toolset.html` 高频选项解释，不扩大页面范围。
- 更新 `scripts/build_toolset_bilingual.mjs`，新增 12 个命令的 `cn-tool-options`：`usdedit`、`usdcat`、`usdview`、`usdrecord`、`usdresolve`、`usdtree`、`usdzip`、`usdchecker`、`usdstitchclips`、`usdmeasureperformance`、`usdGenSchema`、`usdInitSchema`。
- 每个选项导读保留 CLI flag、参数名和官方 usage 块原样，只补中文解释与对应英文 guide。
- 扩展 `site/openusd_release_cn.css`，新增 `cn-tool-options` 选项导读样式。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_option_guides` 检查，要求至少 12 个选项导读并包含关键 flag：`--flatten`、`--renderer`、`--includeKeywords`、`--createContextForAsset`。
- 重新生成 `site/toolset.html`；局部自检结果：19 个工具卡片、19 条工具说明、12 个选项导读、59 个选项条目、19 个 usage 块、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 16 轮继续补齐 `toolset.html` 余下命令选项导读，不扩大页面范围。
- 更新 `scripts/build_toolset_bilingual.mjs`，新增 `usddiff`、`usdfixbrokenpixarschemas`、`usdstitch`、`usddumpcrate`、`sdfdump`、`sdffilter`、`usdgenschemafromsdr` 7 个命令的 `cn-tool-options`。
- toolset 选项导读达到 19/19 命令覆盖；CLI flag、参数名、命令名和官方 usage 块保持原样。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `toolset:has_option_guides` 门槛，从至少 12 个选项导读提高到至少 19 个，并增加 `--backup`、`--summary`、`--noreadme`、`--arraySizeLimit` 等低频命令关键 flag 检查。
- 重新生成 `site/toolset.html`；局部自检结果：19 个工具卡片、19 条工具说明、19 个选项导读、87 个选项条目、19 个 usage 块、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 17 轮回到 `glossary.html` 高频术语定义说明，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `Attribute Connection`、`Attribute Variability`、`Clips`、`Collection`、`Flatten`、`Inherits`、`Instancing`、`Interpolation`、`Layer Offset`、`Localize`、`Purpose`、`Specializes` 12 条定义级中文解释。
- glossary 顶部说明自动更新为 40 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 28 条提高到至少 40 条，并增加 `Clips`、`Collection`、`Instancing`、`Interpolation` 检查。
- 重新生成 `site/glossary.html`；局部自检结果：40 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 18 轮继续精修 `glossary.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `Def`、`Default Value`、`Direct Opinion`、`Fallback`、`LayerStack`、`Opinions`、`Relocates`、`Session Layer`、`Spline`、`SubLayers`、`Value Clips`、`Root LayerStack` 12 条定义级中文解释。
- glossary 顶部说明自动更新为 52 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 40 条提高到至少 52 条，并增加 `Spline`、`Value Clips`、`Relocates`、`SubLayers`、`Session Layer` 等关键词检查。
- 重新生成 `site/glossary.html`；局部自检结果：52 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 19 轮继续精修 `glossary.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `Animation Block`、`Change Processing`、`Class`、`Group`、`Hydra`、`LIVERPS Strength Ordering`、`Over`、`Path Translation`、`PrimStack`、`PseudoRoot`、`Specifier`、`EditTarget` 12 条定义级中文解释。
- 修正 `EditTarget` 的插入锚点，使用源页实际的 `<section id="edittarget">`，避免误用 span id 导致本轮定义说明跳过。
- glossary 顶部说明自动更新为 64 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 52 条提高到至少 64 条，并增加 `Animation Block`、`Change Processing`、`LIVERPS Strength Ordering`、`Path Translation`、`PrimStack`、`PseudoRoot`、`Specifier`、`EditTarget` 等关键词检查。
- 重新生成 `site/glossary.html`；局部自检结果：64 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 20 轮继续精修 `glossary.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `Animated Value`、`AssetInfo`、`Assembly`、`Attribute Block`、`Component`、`Computation Input Parameters`、`Computation`、`Connection`、`Crate File Format`、`Gprim`、`Index`、`Instanceable` 12 条定义级中文解释。
- glossary 顶部说明自动更新为 76 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 64 条提高到至少 76 条，并增加 `Animated Value`、`AssetInfo`、`Assembly`、`Attribute Block`、`Computation Input Parameters`、`Crate File Format`、`Gprim`、`Index`、`Instanceable` 等关键词检查。
- 重新生成 `site/glossary.html`；局部自检结果：76 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 21 轮继续精修 `glossary.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 对照 `source/openusd_release_glossary_source.html` 只选择已有独立 `<section id>` 且尚未覆盖的术语，避免使用不存在的 `Population Mask` 小节。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `IsA Schema`、`Model Hierarchy`、`OpenExec`、`Path`、`Prim Definition`、`PrimSpec`、`PropertySpec`、`PropertyStack`、`Proxy`、`Stage Traversal`、`Subcomponent`、`TimeCodes Scaled to Real Time` 12 条定义级中文解释。
- glossary 顶部说明自动更新为 88 个高频定义小节。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 76 条提高到至少 88 条，并增加 `IsA Schema`、`Model Hierarchy`、`OpenExec`、`Prim Definition`、`PropertySpec`、`Stage Traversal`、`TimeCodes Scaled to Real Time` 等关键词检查。
- 重新生成 `site/glossary.html`；局部自检结果：88 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 22 轮继续精修 `glossary.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 对照 `source/openusd_release_glossary_source.html` 和生成脚本中的 `definitionBriefs`，确认第 21 轮后仅剩 4 个未覆盖的独立 glossary 小节。
- 更新 `scripts/build_glossary_bilingual.mjs`，新增 `Typed Schema`、`User Properties`、`Validation`、`Variability` 4 条定义级中文解释。
- glossary 顶部说明自动更新为 92 个定义级小节；局部扫描结果显示源页独立 glossary 小节剩余未覆盖项为 0。
- 调高 `scripts/validate_openusd_api_repro.ps1` 的 `glossary:has_definition_briefs` 门槛，从至少 88 条提高到至少 92 条，并增加 `Typed Schema`、`User Properties`、`Validation`、`Variability` 关键词检查。
- 重新生成 `site/glossary.html`；局部自检结果：92 条定义说明、397 个 `cn-term`、嵌套 `cn-term` 为 0、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新验证：158 项检查通过，0 项失败。
- 第 23 轮转向本地 HTTP 预览审计，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 新增 `scripts/audit_openusd_http_preview.mjs`，用 Node 临时静态服务器从 HTTP 访问当前 9 个本地页面。
- HTTP 预览审计检查每页 HTTP 200、Sphinx 页面核心布局标记、Doxygen 页面 top/sidebar/content/search 标记、跳转页标记，以及本地 CSS/JS/图片/字体资源响应。
- 生成 `reports/http_preview_audit.json` 和 `reports/http_preview_audit.md`；本轮结果：9 个页面全部通过，141 个本地资源全部通过，失败资源 0 个。
- 将 HTTP 预览审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增 `http_preview_audit:passed` 和 `http_preview_audit:all_pages_and_assets_ok` 两项检查。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：160 项检查通过，0 项失败。
- 第 24 轮继续精修 `toolset.html`，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本地源快照目标未偏离。
- 更新 `scripts/build_toolset_bilingual.mjs`，新增 6 个 `cn-tool-scenario` 工作流场景导读：资产检查与快速诊断、文本查看/对比/扁平化导出、USDZ 打包与交付前检查、时间采样聚合与 Value Clips、Schema 模块初始化与生成、性能测量与底层结构排查。
- 场景导读只组合已在本页范围内的命令名，保留 `usdchecker`、`usdzip`、`usdstitchclips`、`usdGenSchema`、`usdmeasureperformance` 等命令原样，不改写官方 usage 和 option 文本。
- 更新 `site/openusd_release_cn.css`，新增 `cn-tool-scenarios` 和 `cn-tool-scenario` 样式。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_workflow_scenarios` 检查；同时更新 HTTP 预览审计，让 `toolset.html` 必须包含 `cn-tool-scenarios` 标记。
- 重新生成 `site/toolset.html`；局部自检结果：19 个工具卡片、6 个工作流场景导读、19 条工具说明、19 个 option guide、远程 OpenUSD 图片引用为 0。
- 最新审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：161 项检查通过，0 项失败。

下一轮优先级：

1. 抽查 release/API 入口页正文结构，检查是否还有中英标签覆盖不足的一级入口标题。
2. 或继续检查 `toolset.html` 官方 option 长说明是否需要小批量中文导读，但不逐行翻译整页。
3. 继续每轮重新生成、审计、HTTP 预览、验证并更新报告；仍不扩大到整站。

- 第 25 轮转向两个主入口页的可重复覆盖审计，不扩大页面范围。
- 对照官方入口确认当前仍为 OpenUSD 26.05 release/API 文档；本轮只检查 `release/index.html`、`api/index.html` 和本地 `api/index.html` 跳转页。
- 新增 `scripts/audit_openusd_primary_entry_coverage.mjs`，检查 release 入口页的 Sphinx 布局标记、321/321 组中英术语标记、关键本地链接、主图本地化和远程 OpenUSD 图片引用。
- 同一审计检查 API 首页的 Doxygen `top`、`side-nav`、`doc-content`、`searchBox` 标记，4 个双语介绍块，`_usd__overview_and_purpose.html`、`usd_page_front.html` 和 license 链接，以及 `USDLogoDocs.png`、`USDLogoLrgWithAlpha.png` 本地图。
- 审计同时覆盖 `site/api/index.html` 本地跳转页，确认 `api/index.html` 相对入口仍能落到本地双语 API 首页。
- 生成 `reports/primary_entry_coverage.json` 和 `reports/primary_entry_coverage.md`；本轮结果：3 个入口相关页面、16 项检查全部通过，失败 0 项。
- 将主入口覆盖审计纳入 `scripts/validate_openusd_api_repro.ps1`，新增报告文件存在性检查和 `primary_entry_coverage:passed`、`primary_entry_coverage:release_and_api_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json` 和 `reports/scope_manifest.md`，补齐主入口覆盖审计与 HTTP 预览审计的报告说明。
- 最新主入口覆盖审计：3 个入口相关页面通过，16 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，外部链接 58 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：166 项检查通过，0 项失败。

下一轮优先级：

1. 继续抽查 `toolset.html` 官方 option 长说明，判断是否需要只加小批量中文导读，不逐行翻译整页。
2. 或回看 API 首页 `site/index.html` 是否需要更细的中英术语标签，但 API 名称和页面名必须保持原样。
3. 继续每轮重新审计、HTTP 预览、验证并更新报告；仍不扩大到整站。

- 第 26 轮继续围绕两个主入口页做结构与可读性补强，不扩大到新页面。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮只修改本地 API 首页和审计脚本。
- 更新 `site/index.html`，在现有 Doxygen 正文内新增 `cn-api-entry-map` API 入口速览区，包含 3 个卡片：`Overview and Purpose`、`Usd API`、`TOST license`。
- 入口速览保留 `_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license` 原链接；API 页面名、API 名称和 license 名称保持英文原样，中文只作为并列导读。
- 更新 `site/openusd_cn.css`，新增 `cn-api-entry-map`、`cn-api-entry-grid`、`cn-api-entry-card` 样式，保持 Doxygen 页面内的紧凑卡片布局。
- 扩展 `scripts/audit_openusd_primary_entry_coverage.mjs`，新增 `api:has_entry_map_cards` 检查，并把 `api_entry_cards` 写入主入口覆盖报告。
- 扩展 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-api-entry-map` 标记。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_entry_map_cards` 和 `api:entry_map_styles_present` 检查，并要求主入口覆盖报告包含至少 3 个 API 入口卡片。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新主入口覆盖审计：3 个入口相关页面通过，17 项检查通过，API 入口卡片 3 个，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 337 个，外部链接 59 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：168 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览在移动宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 27 轮继续围绕 API 主入口页补齐结构说明，不扩大页面范围。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮只修改 `site/index.html` 和相关审计脚本。
- 更新 `site/index.html`，在 Doxygen 正文 logo 前新增 `cn-repro-note` 范围说明，中文优先并保留英文对应说明。
- 范围说明明确本页对照官方 `https://openusd.org/release/api/index.html`，本地相邻 API 范围限定为 `Overview and Purpose` 与 `Usd API`，并强调 API names、page names、links 保持原样。
- 扩展 `scripts/audit_openusd_primary_entry_coverage.mjs`，新增 `api:has_scope_note` 检查，并把 `api_scope_notes` 写入主入口覆盖报告。
- 扩展 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-repro-note` 和 `cn-api-entry-map`。
- 扩展 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_scope_note` 检查，并要求主入口覆盖报告包含至少 1 个 API scope note。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：169 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 28 轮新增范围边界审计，专门约束“不无选择地镜像整站”。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不改页面正文，只增加审计脚本和报告。
- 新增 `scripts/audit_openusd_scope_boundaries.mjs`，检查本地 HTML 页面白名单、源快照白名单、主范围数量、相邻范围数量、必需报告和范围外链接策略。
- 生成 `reports/scope_boundary_audit.json` 与 `reports/scope_boundary_audit.md`。
- 范围边界审计结果：本地 HTML 页面 9 个，源快照 8 个，主入口 2 个，相邻入口 6 个，审计检查 6 项，失败 0 项。
- 将范围边界审计接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `scope_boundary_audit:passed`、`scope_boundary_audit:limited_to_current_scope` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录，把范围边界审计纳入固定验证链。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：174 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 29 轮新增术语一致性审计，专门约束中文术语与英文原名并列保留。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不改页面正文，只增加术语审计脚本和报告。
- 新增 `scripts/audit_openusd_term_consistency.mjs`，扫描当前 9 个本地 HTML 页面，检查 14 组关键中英术语对、13 个必须保留的 API/class/tool 英文名称，以及 7 个常见错误中文替换不得出现。
- 术语审计同时统计全站双语标记量：`cn-term` 874、`en-term` 874、`zh` blocks 333、`en` blocks 333、glossary 定义说明 92、tool option guide 19。
- 生成 `reports/term_consistency_audit.json` 与 `reports/term_consistency_audit.md`。
- 修正术语审计预设项：`_usd__overview_and_purpose.html` 的中文标题按当前页面实际用词设为 `概述与目的 / Overview and Purpose`。
- 将术语一致性审计接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `term_consistency_audit:passed`、`term_consistency_audit:core_terms_and_names_ready` 两项内容检查。
- 将术语一致性报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：179 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 30 轮新增导航覆盖审计，专门约束 release/API 主入口导航结构。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不改页面正文，只增加导航审计脚本和报告。
- 新增 `scripts/audit_openusd_navigation_coverage.mjs`，检查 release 源页和生成页的 `Learn`、`User Guides`、`Reference`、`Specifications` 导航分组，确认中文标签与英文原名并列保留。
- 导航审计检查 release 主入口中的 5 个相邻入口链接：`intro.html`、`glossary.html`、`apiDocs.html`、`toolset.html`、`api/index.html`。
- 导航审计检查 out-of-scope 但应保留的官方相对链接示例：`spec.html`、`tutorials.html`、`user_guides/variable_expressions.html`。
- 导航审计检查 API 首页 Doxygen 导航壳：`main-nav`、`side-nav`、`initNavTree`、`searchBox`，以及 6 个 API 导航资源。
- 导航审计检查 API 入口链接 `_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license` 和本地 `api/index.html` 跳转。
- 生成 `reports/navigation_coverage_audit.json` 与 `reports/navigation_coverage_audit.md`。
- 将导航覆盖报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将导航覆盖审计接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `navigation_coverage_audit:passed`、`navigation_coverage_audit:release_and_api_navigation_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：184 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 31 轮新增源快照溯源审计，专门确认本地页面与官方 URL、源快照、输出页和生成脚本的绑定关系。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不改页面正文，只增加溯源审计脚本和报告。
- 新增 `scripts/audit_openusd_source_provenance.mjs`，读取 `reports/scope_manifest.json` 的 2 个 primary scope 和 6 个 active adjacent scope。
- 溯源审计逐项检查 official URL、source snapshot、local output、generator 是否存在；Sphinx/Doxygen 源类型是否匹配；源页标题和本地双语标记是否保留。
- 溯源审计单独检查 `site/api/index.html` 仍是指向 `../index.html` 的本地 API 跳转辅助页。
- 生成 `reports/source_provenance_audit.json` 与 `reports/source_provenance_audit.md`。
- 将源快照溯源报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将源快照溯源审计接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `source_provenance_audit:passed`、`source_provenance_audit:manifest_entries_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：189 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、源快照溯源审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 32 轮新增样式与资产契约审计，专门约束 Sphinx/Doxygen 原样式、本地双语 CSS 和页面资产引用。
- 对照两个官方入口页确认当前仍为 OpenUSD 26.05 release/API 文档；本轮不改页面正文，只增加样式/资产审计脚本和报告。
- 新增 `scripts/audit_openusd_style_asset_contract.mjs`，检查 Doxygen 核心样式/脚本/Logo 资源、Sphinx `_static` 样式/脚本/字体资源、release 图片、glossary 图片和本地双语 CSS。
- 样式审计检查 `site/openusd_release_cn.css` 的 7 个 release 双语选择器，以及 `site/openusd_cn.css` 的 7 个 API 双语选择器。
- 样式审计检查 6 个关键页面的资产标记：`release_index.html`、`glossary.html`、`toolset.html`、`index.html`、`_usd__overview_and_purpose.html`、`usd_page_front.html`。
- 样式审计继续约束生成页和本地 CSS 不依赖远程 `https://openusd.org/images` 图片。
- 生成 `reports/style_asset_contract_audit.json` 与 `reports/style_asset_contract_audit.md`。
- 将样式与资产契约报告加入 `scripts/audit_openusd_scope_boundaries.mjs` 的必需报告列表。
- 将样式与资产契约审计接入 `scripts/validate_openusd_api_repro.ps1`，新增脚本/报告必需文件检查，以及 `style_asset_contract_audit:passed`、`style_asset_contract_audit:assets_and_styles_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
- 最新样式与资产契约审计：19 个 Doxygen 资产、17 个 Sphinx 资产、8 个 release/本地双语资产、14 个双语 CSS 选择器、6 个页面资产标记检查全部通过。
- 最新主入口覆盖审计：3 个入口相关页面通过，18 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，失败 0 项。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查全部通过。
- 最新导航覆盖审计：8 项检查通过，release 相邻入口链接 5 个、API 导航资源 6 个、API 入口链接 3 个、API 入口卡片 3 个。
- 最新源快照溯源审计：8 个 manifest 条目、5 个 Sphinx 源、3 个 Doxygen 源，5 项检查通过，失败 0 项。
- 最新范围边界审计：9 个本地 HTML、8 个源快照、2 个主入口、6 个相邻入口，6 项检查通过，失败 0 项。
- 最新链接审计：9 个页面，本地资源缺失 0 个，本地引用 341 个，外部链接 61 个，范围外官方相对文档链接 3340 个。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，失败页面 0 个，失败资源 0 个。
- 最新验证：194 项检查通过，0 项失败。

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 33 轮新增官方入口实时新鲜度审计，专门对照两个用户指定的官方入口 URL，不扩大到整站镜像。
- 新增 `scripts/audit_openusd_official_entry_freshness.mjs`，只拉取 `https://openusd.org/release/index.html` 和 `https://openusd.org/release/api/index.html`。
- 审计报告只记录 live 状态、标题、关键入口标记、源快照标记和本地输出标记，不保存官方正文，也不做整站 body diff。
- release live 标记覆盖 `USD Home`、`Universal Scene Description 26.05 documentation`、`Introduction to USD`、`Terms and Concepts`、`API Documentation`、`Toolset`、`api/index.html` 和 `piper-banner.jpg`。
- API live 标记覆盖 `Universal Scene Description (USD)`、生成时间戳、官方简介句、`_usd__overview_and_purpose.html`、`usd_page_front.html`、`USDLogoLrgWithAlpha.png` 和官方 license 链接。
- 生成 `reports/official_entry_freshness_audit.json` 与 `reports/official_entry_freshness_audit.md`。
- 将官方入口实时新鲜度报告加入范围边界审计的必需报告列表。
- 将官方入口实时新鲜度审计接入总验证，新增脚本/报告必需文件检查，以及 `official_entry_freshness_audit:passed`、`official_entry_freshness_audit:release_and_api_live_markers_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
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

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或检查 API 首页入口速览和范围说明在窄宽度下是否需要更细的布局约束；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、官方入口实时新鲜度审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 34 轮补齐窄宽度布局约束，仍只维护既有 9 个本地 HTML 和 8 个源快照。
- 为 `site/openusd_cn.css` 增加 API 双语层的图片最大宽度、长文本换行和 700px 以下 API 入口卡片单列布局。
- 为 `site/openusd_release_cn.css` 增加 release 双语层的术语/说明长文本换行、640px 以下 glossary/toolset 网格单列布局和命令 option 代码片段窄屏处理。
- 为 `site/api/index.html` 本地跳转页补充 viewport meta，保持 `../index.html` 目标不变。
- 新增 `scripts/audit_openusd_responsive_layout_contract.mjs`，检查 viewport、本地 CSS 挂载、移动端网格降级和长文本换行契约。
- 生成 `reports/responsive_layout_contract_audit.json` 与 `reports/responsive_layout_contract_audit.md`。
- 将响应式布局契约报告加入范围边界审计的必需报告列表。
- 将响应式布局契约审计接入总验证，新增脚本/报告必需文件检查，以及 `responsive_layout_contract_audit:passed`、`responsive_layout_contract_audit:viewport_and_css_contract_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
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

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或对 release/API 主入口做更细的入口链接文案覆盖审计；仍不新增页面范围。
3. 继续每轮运行主入口覆盖审计、官方入口实时新鲜度审计、响应式布局契约审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。

- 第 35 轮新增入口标签契约审计，仍只维护既有 9 个本地 HTML 和 8 个源快照。
- 新增 `scripts/audit_openusd_entry_label_contract.mjs`，检查关键入口链接的 href、中文标签和英文原名是否同时保留。
- 审计 release 首页 8 个关键入口链接：`intro.html`、`glossary.html`、`apiDocs.html`、`toolset.html`、`api/index.html`、`tut_usd_tutorials.html`、`spec.html`、`usdfaq.html`。
- 审计 release 首页 4 个导航分组中英标签：Learn、User Guides、Reference、Specifications。
- 审计 API 首页 3 个入口卡片：`_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license`。
- 审计 `apiDocs.html` 的 `api/index.html` bridge 按钮和 `site/api/index.html` 的 `../index.html` 本地跳转说明。
- 审计 6 个相邻页标题是否保留中文标签和英文原名。
- 生成 `reports/entry_label_contract_audit.json` 与 `reports/entry_label_contract_audit.md`。
- 将入口标签契约报告加入范围边界审计的必需报告列表。
- 将入口标签契约审计接入总验证，新增脚本/报告必需文件检查，以及 `entry_label_contract_audit:passed`、`entry_label_contract_audit:release_api_and_adjacent_labels_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和本进度记录。
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

下一轮优先级：

1. 继续检查 `toolset.html` 的 option 长说明是否需要小批量中文导读。
2. 或为固定验证链补一个报告索引/审计索引总表，方便快速定位各轮产物；仍不新增页面范围。
3. 继续每轮运行入口标签契约审计、主入口覆盖审计、官方入口实时新鲜度审计、响应式布局契约审计、术语一致性审计、导航覆盖审计、源快照溯源审计、样式与资产契约审计、范围边界审计、链接审计、HTTP 预览审计和总验证，并更新报告。
- 第 36 轮新增固定审计链报告索引，继续保持 9 个本地 HTML 和 8 个源快照的有界范围，不新增页面、不镜像整站。
- 新增 `scripts/audit_openusd_report_index.mjs`，生成 `reports/audit_index.json` 和 `reports/audit_index.md`，索引 11 个审计脚本、11 份 JSON 报告、11 份 Markdown 报告和最终验证报告。
- 报告索引只记录产物路径、计数和通过状态，不保存官方正文；已处理 PowerShell 生成 `validation_report.json` 可能带 UTF-8 BOM 的解析问题。
- 将 `audit_index.json` 加入范围边界审计必需报告列表，并把 `audit_index:passed`、`audit_index:fixed_chain_ready` 接入总验证。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，固定验证链现在包含报告索引。
- 最新报告索引审计：11 个审计条目、12 个总条目、11 个审计脚本、11 份 JSON 报告、11 份 Markdown 报告、11 个审计报告通过，最终验证失败数 0。
- 最新固定审计链全部通过：入口标签、主入口覆盖、官方新鲜度、响应式、术语一致性、导航、溯源、样式资产、范围边界、链接、HTTP 预览和报告索引均为 passed。
- 最新总验证：214 项检查通过，0 项失败。
- 下一轮优先级：继续用报告索引定位固定审计链状态；如不新增页面范围，优先小批量检查 `toolset.html` 的 option 长说明中文导读。
- 第 37 轮新增页面元数据与中文主导契约审计，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 新增 `scripts/audit_openusd_page_metadata_contract.mjs`，生成 `reports/page_metadata_contract_audit.json` 和 `reports/page_metadata_contract_audit.md`。
- 新审计检查 9 个本地 HTML 的 `lang="zh-CN"`、viewport、中文优先且保留英文原页面名的标题、范围说明、名称/链接/CLI flag 保留策略，以及中文层和英文层是否同时存在。
- 将 `page_metadata_contract_audit.json` 加入范围边界审计必需报告列表，并把 `page_metadata_contract_audit:passed`、`page_metadata_contract_audit:zh_cn_titles_scope_ready` 接入总验证。
- 更新报告索引脚本，固定审计链从 11 个审计条目提升到 12 个审计条目；报告索引现在覆盖 12 个审计脚本、12 份 JSON 报告、12 份 Markdown 报告和最终验证报告。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，固定验证链现在包含页面元数据契约审计。
- 最新页面元数据契约审计：9 个页面、9 个 `zh-CN`、9 个 viewport、9 个双语/跳转标题、5 个 release 范围说明、3 个 API 范围说明、1 个 redirect 范围说明、9 个中文/英文层页面，7 项检查失败 0。
- 最新总验证：219 项检查通过，0 项失败。
- 下一轮优先级：继续用报告索引和页面元数据契约定位固定链状态；如不新增页面范围，优先小批量检查 `toolset.html` 的 option 长说明中文导读。
- 第 38 轮新增入口结构保真审计，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release 入口仍是 Sphinx 文档首页结构，API 入口仍是 Doxygen API 首页结构；本轮不复制官方正文，只固化结构标记审计。
- 新增 `scripts/audit_openusd_entry_structure_parity.mjs`，生成 `reports/entry_structure_parity_audit.json` 和 `reports/entry_structure_parity_audit.md`。
- 新审计检查 release 官方/本地 Sphinx 外壳、4 个 release 导航分组、API 官方/本地 Doxygen 外壳、3 个 API 入口链接和 6 个相邻页外壳。
- 将 `entry_structure_parity_audit.json` 加入范围边界审计必需报告列表，并把 `entry_structure_parity_audit:passed`、`entry_structure_parity_audit:sphinx_doxygen_shells_ready` 接入总验证。
- 更新报告索引脚本，固定审计链从 12 个审计条目提升到 13 个审计条目；报告索引现在覆盖 13 个审计脚本、13 份 JSON 报告、13 份 Markdown 报告和最终验证报告。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，固定验证链现在包含入口结构保真审计。
- 最新入口结构保真审计：release 官方结构标记 12/12，本地 release 结构标记 11/11，release 导航分组源/本地 4/4，API 官方结构标记 14/14，本地 API 结构标记 16/16，API 入口链接源/本地 3/3，6 个相邻页外壳全部通过，7 项检查失败 0。
- 最新总验证：224 项检查通过，0 项失败。
- 下一轮优先级：继续用入口结构保真、页面元数据契约和报告索引定位固定链状态；如不新增页面范围，优先小批量检查 `toolset.html` 的 option 长说明中文导读。
- 第 39 轮新增中文优先顺序契约审计，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认入口结构未变化，本轮不新增官方正文，只把“中文为主并保留英文原文”的顺序要求固化为机器审计。
- 新增 `scripts/audit_openusd_chinese_first_order_contract.mjs`，生成 `reports/chinese_first_order_contract_audit.json` 和 `reports/chinese_first_order_contract_audit.md`。
- 新审计检查 9 个本地 HTML 的 `cn-term/en-term`、`zh/en` 和 `api/index.html` 跳转句子是否均为中文在前、英文在后。
- 将 `chinese_first_order_contract_audit.json` 加入范围边界审计必需报告列表，并把 `chinese_first_order_contract_audit:passed`、`chinese_first_order_contract_audit:terms_blocks_and_redirect_ready` 接入总验证。
- 更新报告索引脚本，固定审计链从 13 个审计条目提升到 14 个审计条目；报告索引现在覆盖 14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告和最终验证报告。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，固定验证链现在包含中文优先顺序审计。
- 最新中文优先顺序审计：874/874 组 `cn-term/en-term` 为中文在前，333/333 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新总验证：229 项检查通过，0 项失败。
- 下一轮优先级：继续用中文优先顺序、入口结构保真、页面元数据契约和报告索引定位固定链状态；如不新增页面范围，优先小批量检查 `toolset.html` 的 option 长说明中文导读。
- 第 40 轮按第 39 轮下一目标补 `toolset.html` 的小批量 option 长说明导读，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站、不逐行复制官方长正文。
- 更新 `scripts/build_toolset_bilingual.mjs`，新增 6 个 `cn-tool-deep-note` 长选项说明导读：`usdchecker`、`usdstitchclips`、`sdfdump`、`sdffilter`、`usdgenschemafromsdr`、`usdInitSchema`。
- 扩展 `site/openusd_release_cn.css`，新增 `cn-tool-deep-note` 样式和移动端 code 换行约束。
- 更新 `scripts/audit_openusd_term_consistency.mjs`，新增 `cn_tool_deep_notes` 计数和 `terms:toolset_deep_option_notes_present` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `toolset:has_deep_option_notes` 检查，并把术语一致性总检查扩展到至少 6 个 tool deep option notes。
- 重新生成 `site/toolset.html`；局部自检结果：6 个长选项导读、19 个 option guide、157/157 个 `zh/en` 块，`Long-option reading notes` 标记存在。
- 完整固定审计链重新运行通过；报告索引和总验证各运行两次以对齐最终验证计数。
- 最新中文优先顺序审计：880/880 组 `cn-term/en-term` 为中文在前，351/351 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查、92 条 glossary 定义说明、19 个 tool option guide、6 个 tool deep option notes，6 项检查失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 230，失败数 0。
- 最新总验证：230 项检查通过，0 项失败。
- 下一轮优先级：继续用中文优先顺序、入口结构保真、页面元数据契约和报告索引定位固定链状态；如继续补内容，优先评估是否需要第二批少量 toolset 长选项导读，或检查 API 首页入口卡片窄宽度文本密度。
- 第 41 轮按第 40 轮下一目标检查 API 首页入口卡片下方的阅读路径密度，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站，只补 API 首页的入口路线导读。
- 更新 `site/index.html`，新增 `cn-api-route-guide`，为官方 API 首页已有的 3 个入口链接增加中文优先阅读路线：`Overview and Purpose`、`Usd API`、`TOST license`。
- 更新 `site/openusd_cn.css`，新增 route guide 网格、步骤样式和移动端单列约束。
- 更新 `scripts/audit_openusd_primary_entry_coverage.mjs`，新增 `api_route_steps` 计数和 `api:has_route_guide` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `api:has_route_guide` 检查，并要求主入口覆盖报告包含至少 3 条 API route guide steps。
- 最新主入口覆盖审计：3 个入口相关页面通过，19 项检查通过，API 范围说明 1 个，API 入口卡片 3 个，API route guide steps 3 个，失败 0 项。
- 最新中文优先顺序审计：881/881 组 `cn-term/en-term` 为中文在前，354/354 组 `zh/en` 为中文在前，1 个本地 API 跳转页中文句子在前，9 个页面均有中文优先层，7 项检查失败 0。
- 最新术语一致性审计：9 个页面、14 组关键中英术语、13 个保留英文名称、7 个禁用误译检查、92 条 glossary 定义说明、19 个 tool option guide、6 个 tool deep option notes，6 项检查失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 231，失败数 0。
- 最新总验证：231 项检查通过，0 项失败。
- 下一轮优先级：继续用中文优先顺序、主入口覆盖、入口结构保真、页面元数据契约和报告索引定位固定链状态；如继续补内容，优先检查 API route guide 的 HTTP/窄屏预览，或评估是否需要第二批少量 toolset 长选项导读。
- 第 42 轮按第 41 轮下一目标补强 API route guide 的 HTTP/窄屏预览护栏，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站，只把已有 API route guide 纳入固定审计链。
- 更新 `scripts/audit_openusd_http_preview.mjs`，让 API 首页 HTTP 预览必须包含 `cn-api-route-guide`。
- 更新 `scripts/audit_openusd_responsive_layout_contract.mjs`，新增 `.cn-api-route-list`、`.cn-api-route-step` 移动端 CSS 标记和 `responsive:api_route_guide_mobile_contract` 检查。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `http_preview_audit:api_route_guide_visible` 检查，并要求响应式报告包含至少 3 条 API route guide steps。
- 最新 HTTP 预览审计：9 个页面通过，141 个本地资源通过，API 首页 required marker 数 8，缺失标记 0。
- 最新响应式布局契约审计：9 个页面检查，9 个 viewport，5 个 release CSS 页面，3 个 API CSS 页面，3 条 API route guide steps，9 项检查失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 232，失败数 0。
- 最新总验证：232 项检查通过，0 项失败。
- 下一轮优先级：继续用 HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态；如继续补内容，优先评估是否需要第二批少量 toolset 长选项导读，或为 API route guide 做一次浏览器截图级抽查。
- 第 43 轮补强 API route guide 的导航链接护栏，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站，只把已有 API route guide 的 3 个链接纳入导航审计。
- 更新 `scripts/audit_openusd_navigation_coverage.mjs`，提取 `cn-api-route-step` 块并检查 `_usd__overview_and_purpose.html`、`usd_page_front.html`、`https://openusd.org/license` 均在 route step 中。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 `navigation_coverage_audit:api_route_guide_links_ready` 检查，并要求导航覆盖报告包含至少 3 个 API route steps 和 3 个 route step links。
- 最新导航覆盖审计：9 项检查通过，release 相邻链接 5 个，API 导航资源 6 个，API 入口链接 3 个，API 入口卡片 3 个，API route steps 3 个，API route step links 3 个，失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 233，失败数 0。
- 最新总验证：233 项检查通过，0 项失败。
- 下一轮优先级：继续用导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态；如继续补内容，优先评估是否需要第二批少量 toolset 长选项导读，或为 API route guide 做一次浏览器截图级抽查。
- 第 44 轮按第 43 轮下一目标做 API route guide 浏览器截图级抽查，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站，只抽查已有 API route guide。
- 使用临时 `127.0.0.1` 静态预览打开 `site/index.html`，保存截图 `reports/api_route_guide_browser_view.png`。
- 新增 `reports/api_route_guide_browser_audit.json` 和 `reports/api_route_guide_browser_audit.md`，记录浏览器读取到的 route guide DOM、布局、链接和溢出状态。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把浏览器抽查 JSON/Markdown/PNG 纳入必需文件，并新增 `api_route_guide_browser_audit:passed`、`api_route_guide_browser_audit:route_guide_visible_and_linked` 两项内容检查。
- 最新浏览器抽查：6 项检查通过，route steps 3，route links 3，视口 661 x 731，无水平溢出，滚动后 route guide 可见。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 238，失败数 0。
- 最新总验证：238 项检查通过，0 项失败。
- 下一轮优先级：继续用浏览器抽查、导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态；如继续补内容，优先评估是否需要第二批少量 toolset 长选项导读，或补一张宽屏 API route guide 浏览器截图。
- 第 45 轮补一张 API route guide 宽屏浏览器截图，继续保持 9 个本地 HTML 和 8 个源快照的有界范围。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮不新增页面、不镜像整站，只抽查已有 API route guide 的宽屏状态。
- 首次在当前标签做 1280x720 截图时浏览器截图捕获超时；已恢复临时服务和 viewport，并改用新标签按 viewport 能力文档重试。
- 使用新标签 1280x720 视口打开临时 `127.0.0.1` 预览，保存截图 `reports/api_route_guide_browser_wide_view.png`。
- 新增 `reports/api_route_guide_browser_wide_audit.json` 和 `reports/api_route_guide_browser_wide_audit.md`，记录宽屏 DOM、链接、布局列数、水平溢出和截图状态。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把宽屏浏览器抽查 JSON/Markdown/PNG 纳入必需文件，并新增 `api_route_guide_browser_wide_audit:passed`、`api_route_guide_browser_wide_audit:route_guide_visible_and_linked` 两项内容检查。
- 最新宽屏浏览器抽查：8 项检查通过，route steps 3，route links 3，视口 1280 x 720，route list columns 4，截图已保存，失败 0。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 243，失败数 0。
- 最新总验证：243 项检查通过，0 项失败。
- 下一轮优先级：继续用浏览器抽查、导航覆盖、HTTP 预览、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态；如继续补内容，优先回到 `toolset.html` 评估是否需要第二批少量长选项导读，或补一个轻量报告串联两张 API route guide 截图和 JSON 审计。
- 第 46 轮按用户“其他页面和子页面都兼顾一下，给我个链接试试”的要求，把自动化提示更新为主入口优先、有界兼顾高价值相邻页面和子页面。
- 继续保持 9 个本地 HTML 和 8 个源快照范围；本轮不新增官方正文页面、不扩大到整站镜像。
- 对照当前两个官方入口页确认 release/API 入口仍为 OpenUSD 26.05 文档入口；本轮补本地预览索引和验证护栏。
- 新增 `scripts/build_local_preview_index.mjs`，从 `reports/scope_manifest.json` 生成本地预览索引。
- 新增 `reports/local_preview_index.json` 和 `reports/local_preview_index.md`，列出 `http://127.0.0.1:8067/` 下 9 个本地页面：2 个主入口、6 个 active adjacent 页面和 1 个本地 API redirect。
- 当前 `http://127.0.0.1:8067/index.html` 静态预览探测可用，API 首页包含 `cn-api-route-guide`。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把本地预览索引脚本、JSON 和 Markdown 纳入必需文件，并新增 `local_preview_index:passed`、`local_preview_index:current_scope_links_ready` 两项内容检查。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，记录本地可点链接索引。
- 完整固定审计链重新运行通过；报告索引和总验证各运行两次以对齐最终验证计数。
- 最新本地预览索引：9 个页面、9 个存在、9 个唯一预览 URL、预览服务探测 ok。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 248，失败数 0。
- 最新总验证：248 项检查通过，0 项失败。
- 下一轮优先级：继续用本地预览索引、HTTP 预览、导航覆盖、响应式布局、主入口覆盖和中文优先顺序审计定位固定链状态；如继续扩展子页面，先小范围选取高价值相邻入口并同步更新 scope manifest、源快照、生成脚本和范围边界审计。
- 第 47 轮按用户“最后产出是个html”的要求，新增最终 HTML 总入口 `openusd_bilingual_final.html`。
- 新增 `scripts/build_final_html_entry.mjs`，从 `reports/local_preview_index.json` 和 `reports/validation_report.json` 生成最终 HTML。
- 最终 HTML 集中链接当前 9 个本地页面、对应 `http://127.0.0.1:8067/` 预览 URL 和官方原页 URL，保留中文为主、English retained 的交付口径。
- 最终 HTML 使用本地 OpenUSD logo 和 banner 资产，不新增外部图片依赖；`site/` 官方复刻范围仍保持 9 个 HTML。
- 修复生成脚本模板反引号问题，并处理 PowerShell JSON BOM 解析问题。
- 更新 `scripts/validate_openusd_api_repro.ps1`，把最终 HTML 和生成脚本纳入必需文件，并新增 `final_html_entry:has_final_output_marker`、`final_html_entry:links_current_scope_pages` 两项检查。
- 启动项目根目录 HTTP 预览服务，`http://127.0.0.1:8068/openusd_bilingual_final.html` 返回 200，包含 `final-html-entry` 和 `data-page-count="9"`。
- 更新 `README.md`、`reports/scope_manifest.json`、`reports/scope_manifest.md` 和迭代报告，明确最终交付是 HTML。
- 最终 HTML 生成、总验证、报告索引和第二次总验证已重新运行通过。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 252，失败数 0。
- 最新总验证：252 项检查通过，0 项失败。
- 下一轮优先级：以 `openusd_bilingual_final.html` 作为用户试用入口，继续检查链接、布局和移动端显示；如继续补子页面，仍按 scope manifest 小范围纳入。
- 第 48 轮按用户纠正“不是高价值相邻页面和子页面，是所有”，把自动化更新为全量 release/API HTML 页面范围。
- 新增 `scripts/discover_openusd_all_pages.mjs`，从官方 release toctree、API Doxygen navtree/menu 和现有完成页生成全量页面清单。
- 先尝试 live recursive crawl；API 侧页面量较大，3 分钟未完成后停止该进程，改为当前轮可稳定复现的导航全量清单。
- 新增 `reports/all_pages_inventory.json` 和 `reports/all_pages_inventory.md`，当前发现 406 个官方 HTML 页面：126 个 release 页面、280 个 API 页面。
- 当前 8 个官方页面为 `bilingual_complete`，398 个页面为 `pending_full_scope`，不再按高价值相邻页筛选。
- 更新 `scripts/build_final_html_entry.mjs`，最终 HTML 显示 406 页全量清单、完成状态、待处理状态、本地计划路径和官方原页链接。
- 更新 `scripts/validate_openusd_api_repro.ps1`，新增 all-pages inventory 必需文件与内容检查，并要求最终 HTML 带 `data-scope-mode="all"`。
- 修复报告索引/验证报告在失败后互相引用的自举问题；重建后报告索引和验证均恢复 0 失败。
- 更新 `reports/scope_manifest.json`、`reports/scope_manifest.md`、`README.md` 和迭代报告，明确 scope mode 为 all discovered release/API HTML pages。
- 最新报告索引审计：14 个审计条目、15 个总条目、14 个审计脚本、14 份 JSON 报告、14 份 Markdown 报告、14 个审计报告通过，最终验证计数 258，失败数 0。
- 最新总验证：258 项检查通过，0 项失败。
- 下一轮优先级：从 `reports/all_pages_inventory.json` 读取 `pending_full_scope` 队列，按批次生成下一组页面，并继续以 `openusd_bilingual_final.html` 展示所有页面状态。

- 第 49 轮推进全量 release 队列：新增 scripts/build_release_full_batch.mjs，生成 10 个可检查 bilingual_draft HTML 到 full_site/release/，源快照保存到 source/full_release/；all_pages_inventory 更新为 406 total / 8 complete / 10 draft / 388 pending；release_full_batch_report.*、scope_manifest、README 和最终 openusd_bilingual_final.html 已同步；最新总验证 264 项通过、0 项失败。
- 下一轮优先级：继续从 pending_full_scope 队列批量生成，补充 full_site/release/ 的本地预览抽查；release 批次稳定后建立 full_site/api/ 的 API draft 生成链。

- 第 50 轮继续推进全量 release 队列：刷新已有 10 个 bilingual_draft，新增 5 个 release draft（press_opensource_release/ref_performance_metrics/release_schedule/search/spec_usdpreviewsurface），all_pages_inventory 更新为 406 total / 8 complete / 15 draft / 383 pending；新增 draft 文件数与清单数一致性验证；最终 openusd_bilingual_final.html 已重建；最新总验证 265 项通过、0 项失败。
- 下一轮优先级：为 full_site/release/ 增加 HTTP/link smoke audit，或开始 build_api_full_batch.mjs 覆盖 full_site/api/。

- 第 51 轮补齐 draft HTTP 可用性护栏：新增 scripts/audit_openusd_full_draft_preview.mjs 和 reports/full_draft_preview_audit.*；当前 15 个 bilingual_draft 均通过临时 HTTP 访问、最终 HTML 链接、本地资源检查；固定审计链扩展为 15 项，最终验证 270 项通过、0 项失败。
- 下一轮优先级：继续 release pending 批量生成，或创建 build_api_full_batch.mjs 开始 full_site/api/ 队列。
- 第 52 轮开始推进 API 全量队列：新增 scripts/build_api_full_batch.mjs，生成 5 个 API bilingual_draft HTML 到 full_site/api/，源快照保存到 source/full_api/；新增 reports/api_full_batch_report.* 并接入验证；all_pages_inventory 更新为 406 total / 8 complete / 20 draft / 378 pending。
- 第 52 轮验证补齐：full_draft_preview_audit 已确认 20 个 draft 均可通过临时 HTTP 打开、均被 openusd_bilingual_final.html 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，或根据 API/source 页类型增强 build_api_full_batch.mjs 的标题和摘要提取规则。
- 第 53 轮增强 API 批处理：改进 scripts/build_api_full_batch.mjs 的 Doxygen 摘要提取和源码页过滤，刷新首批 API draft，并新增 5 个 Gf 类 API bilingual_draft HTML（class_gf_matrix2f/class_gf_matrix4f/class_gf_range1d/class_gf_ray/class_gf_vec2i）到 full_site/api/；all_pages_inventory 更新为 406 total / 8 complete / 30 draft / 368 pending。
- 第 53 轮验证补齐：openusd_bilingual_final.html 已重建并链接 30 个 draft；full_draft_preview_audit 已确认 30 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，并把 API 类页、源码页、目录索引页的摘要提取规则拆得更细。
- 第 54 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_glf_draw_target/class_hd_data_source_locator/class_hd_instance_registry/class_hd_render_buffer/class_hd_scene_delegate）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 35 draft / 363 pending。
- 第 54 轮验证补齐：openusd_bilingual_final.html 已重建并链接 35 个 draft；full_draft_preview_audit 已确认 35 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，重点检查 Hydra/Hd 类页的摘录质量和成员链接保留情况。
- 第 55 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_hd_st_dispatch_buffer/class_hd_st_render_pass_state/class_hd_task/class_hdx_pick_from_render_buffer_task/class_hgi_g_l_graphics_cmds）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 40 draft / 358 pending。
- 第 55 轮验证补齐：openusd_bilingual_final.html 已重建并链接 40 个 draft；full_draft_preview_audit 已确认 40 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，优先保持每页摘录、链接和最终 HTML 状态表一致。
- 第 56 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_pcp_arc/class_pcp_error_unresolved_prim_path/class_pcp_property_index/class_sdf_children_view/class_sdf_layer）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 45 draft / 353 pending。
- 第 56 轮验证补齐：openusd_bilingual_final.html 已重建并链接 45 个 draft；full_draft_preview_audit 已确认 45 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 Pcp/Sdf 类页术语说明和成员链接摘要质量。
- 第 57 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_sdf_path/class_sdf_prim_spec/class_sdf_usdz_file_format/class_sdr_shader_property/class_tf_dense_hash_map）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 50 draft / 348 pending。
- 第 57 轮验证补齐：openusd_bilingual_final.html 已重建并链接 50 个 draft；full_draft_preview_audit 已确认 50 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 Sdf/Sdr/Tf 类页的术语说明和成员链接摘要质量。
- 第 58 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_tf_py_lock/class_tf_token/class_trace_event_data/class_usd_attribute_limits/class_usd_geom_basis_curves）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 55 draft / 343 pending。
- 第 58 轮验证补齐：openusd_bilingual_final.html 已重建并链接 55 个 draft；full_draft_preview_audit 已确认 55 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 UsdGeom 类页的长成员列表摘要质量。
- 第 59 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_usd_geom_mesh/class_usd_geom_primvars_a_p_i/class_usd_imaging_adapter_registry/class_usd_imaging_delegate/class_usd_imaging_nurbs_patch_adapter）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 60 draft / 338 pending。
- 第 59 轮验证补齐：openusd_bilingual_final.html 已重建并链接 60 个 draft；full_draft_preview_audit 已确认 60 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 UsdGeom/UsdImaging 类页的长成员列表摘要质量。
- 第 60 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_usd_lux_disk_light/class_usd_lux_shaping_a_p_i/class_usd_physics_joint/class_usd_prim/class_usd_proc_generative_procedural）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 65 draft / 333 pending。
- 第 60 轮验证补齐：openusd_bilingual_final.html 已重建并链接 65 个 draft；full_draft_preview_audit 已确认 65 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 UsdPrim、UsdPhysics 与 UsdLux 类页的成员摘要质量。
- 第 61 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_usd_schema_registry/class_usd_shade_output/class_usd_skel_imaging_data_source_skeleton_prim/class_usd_stage_cache/class_usd_validation_error）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 70 draft / 328 pending。
- 第 61 轮验证补齐：openusd_bilingual_final.html 已重建并链接 70 个 draft；full_draft_preview_audit 已确认 70 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 UsdSchema/UsdShade/UsdStage 类页的成员摘要质量。
- 第 62 轮继续推进 API 类页队列：新增 5 个 API bilingual_draft HTML（class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i/class_vdf_context/class_vdf_grapher_options/class_vdf_node/class_vdf_read_write_accessor）到 full_site/api/，源快照保存到 source/full_api/；all_pages_inventory 更新为 406 total / 8 complete / 75 draft / 323 pending。
- 第 62 轮验证补齐：openusd_bilingual_final.html 已重建并链接 75 个 draft；full_draft_preview_audit 已确认 75 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，同时关注 Vdf 类页的成员摘要质量。
- 第 63 轮继续推进 API 队列并补强目录页摘录：新增 5 个 API bilingual_draft HTML（class_vdf_test_utils_1_1_node/class_vt_value_ref/classes/classpxr___c_l_i_1_1_c_l_i_1_1_app/classpxr__tsl_1_1robin__map）到 full_site/api/，源快照保存到 source/full_api/；同时增强 scripts/build_api_full_batch.mjs，为 classes.html 这类目录索引页生成 Index entries 摘录；all_pages_inventory 更新为 406 total / 8 complete / 80 draft / 318 pending。
- 第 63 轮验证补齐：openusd_bilingual_final.html 已重建并链接 80 个 draft；full_draft_preview_audit 已确认 80 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，并继续检查目录页、类页和源码页的摘录质量。
- 第 64 轮继续推进 API 队列：新增 5 个 API bilingual_draft HTML（copy_utils_8h/deprecated/dir_aa3bf17f9d6f68169ce0fa9df97655e9/executor_invalidation_data_8h/files）到 full_site/api/，源快照保存到 source/full_api/；发现 dir_*.html 目录页初次摘录为 0 后，增强 scripts/build_api_full_batch.mjs，从 Doxygen memberdecls 文件表生成 Directory entries 摘录；all_pages_inventory 更新为 406 total / 8 complete / 85 draft / 313 pending。
- 第 64 轮验证补齐：openusd_bilingual_final.html 已重建并链接 85 个 draft；full_draft_preview_audit 已确认 85 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，并重点检查 directory/file/index 页摘录质量，避免空摘录 draft 进入最终入口。
- 第 65 轮继续推进 API Class Members 索引队列：新增 5 个 API bilingual_draft HTML（functions_~/functions_a/functions_b/functions_c/functions_d）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 2 条索引摘录和 40 个链接，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 90 draft / 308 pending。
- 第 65 轮验证补齐：openusd_bilingual_final.html 已重建并链接 90 个 draft；full_draft_preview_audit 已确认 90 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，优先保持 functions 分段索引页的摘录、链接和最终 HTML 状态表一致。
- 第 66 轮继续推进 API Class Members 索引队列：新增 5 个 API bilingual_draft HTML（functions_e/functions_enum/functions_eval/functions_f/functions_func_~）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，索引摘录数为 1-2 条，链接数为 18-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 95 draft / 303 pending。
- 第 66 轮验证补齐：openusd_bilingual_final.html 已重建并链接 95 个 draft；full_draft_preview_audit 已确认 95 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，关注 functions_func 分段索引页和 enum/eval 页的摘录质量。
- 第 67 轮继续推进 API Functions 成员索引队列：新增 5 个 API bilingual_draft HTML（functions_func_a/functions_func_b/functions_func_c/functions_func_d/functions_func_e）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 1 条索引摘录和 40 个链接，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 100 draft / 298 pending。
- 第 67 轮验证补齐：openusd_bilingual_final.html 已重建并链接 100 个 draft；full_draft_preview_audit 已确认 100 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，保持 functions_func 分段索引页摘录、链接和最终 HTML 状态表一致。
- 第 68 轮继续推进 API Functions 成员索引队列：新增 5 个 API bilingual_draft HTML（functions_func_f/functions_func_g/functions_func_h/functions_func_i/functions_func_j）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 1 条索引摘录，链接数为 5-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 105 draft / 293 pending。
- 第 68 轮验证补齐：openusd_bilingual_final.html 已重建并链接 105 个 draft；full_draft_preview_audit 已确认 105 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，关注链接较少的 functions_func_j 后续分段是否需要专门摘要规则。
- 第 69 轮继续推进 API Functions 成员索引队列：新增 5 个 API bilingual_draft HTML（functions_func_k/functions_func_l/functions_func_m/functions_func_n/functions_func_o）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 1 条索引摘录，链接数为 2-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 110 draft / 288 pending。
- 第 69 轮验证补齐：openusd_bilingual_final.html 已重建并链接 110 个 draft；full_draft_preview_audit 已确认 110 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；最新总验证 275 项通过、0 项失败。
- 下一轮优先级：继续 API pending 队列批量生成，关注链接较少的 functions_func_k 等短索引页是否需要更细的摘要规则。
- 第 70 轮继续推进 API Functions 成员索引队列：新增 5 个 API bilingual_draft HTML（functions_func_p/functions_func_q/functions_func_r/functions_func_s/functions_func_t）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 1 条索引摘录，链接数为 3-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 115 draft / 283 pending。
- 第 70 轮验证补齐：openusd_bilingual_final.html 已重建并链接 115 个 draft；full_draft_preview_audit 已确认 115 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；短索引页 functions_func_q 摘录有效，包含 SdfAbstractData、SdfLayer、ConfigBase。
- 下一轮优先级：继续 API pending 队列批量生成，关注链接较少的 functions_func_q 等短索引页，并开始准备 functions_func 后续分段之外的 API 索引页质量检查。
- 第 71 轮继续推进 API Functions 成员索引队列：新增 5 个 API bilingual_draft HTML（functions_func_u/functions_func_v/functions_func_w/functions_func_x/functions_func_y）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200、各 1 条索引摘录，链接数为 13-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 120 draft / 278 pending。
- 第 71 轮验证补齐：openusd_bilingual_final.html 已重建并链接 120 个 draft；full_draft_preview_audit 已确认 120 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；短索引页 functions_func_x/y 摘录有效，保留 GfVec 系列、UsdGeomXformable::XformQuery 与 VdfExecutorBufferData。
- 下一轮优先级：继续 API pending 队列批量生成，预计收尾 functions_func 分段并转入 functions_rela、functions_type 等后续 API 索引页。
- 第 72 轮继续推进 API Class Members 索引队列：新增 5 个 API bilingual_draft HTML（functions_func_z/functions_func/functions_g/functions_h/functions_i）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 8-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 125 draft / 273 pending。
- 第 72 轮验证补齐：openusd_bilingual_final.html 已重建并链接 125 个 draft；full_draft_preview_audit 已确认 125 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_func_z 和 functions_g，确认 GfVec、UsdMediaTokensType、Hd/Hgi 等索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_j/l/m 等后续 Class Members 分段，并持续检查低链接数索引页摘录质量。
- 第 73 轮继续推进 API Class Members 索引队列：新增 5 个 API bilingual_draft HTML（functions_j/functions_k/functions_l/functions_m/functions_n）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 2 条索引摘录，链接数为 10-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 130 draft / 268 pending。
- 第 73 轮验证补齐：openusd_bilingual_final.html 已重建并链接 130 个 draft；full_draft_preview_audit 已确认 130 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_j/k，确认 HdEmbreeConfig、UsdPhysics、Sdf/Tf/UsdSchema 等索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_o/p/q/r 与 functions_rela_g 等后续索引页，并关注 relation/type 页摘录规则。
- 第 74 轮继续推进 API Class Members 与 Related Functions 索引队列：新增 5 个 API bilingual_draft HTML（functions_o/functions_p/functions_q/functions_r/functions_rela_g）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 4-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 135 draft / 263 pending。
- 第 74 轮验证补齐：openusd_bilingual_final.html 已重建并链接 135 个 draft；full_draft_preview_audit 已确认 135 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_q 与 functions_rela_g，确认 SdfAbstractData/SdfLayer/ConfigBase 与 GfLine/GfRay/GfQuaternion 等索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_rela_h/o/s/t 与 functions_rela 汇总页，并继续检查 relation 页低链接摘录质量。
- 第 75 轮继续推进 API Related Functions 索引队列：新增 5 个 API bilingual_draft HTML（functions_rela_h/functions_rela_o/functions_rela_s/functions_rela_t/functions_rela）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 1-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 140 draft / 258 pending。
- 第 75 轮验证补齐：openusd_bilingual_final.html 已重建并链接 140 个 draft；full_draft_preview_audit 已确认 140 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_rela 与 functions_rela_t，确认 UsdShadeMaterialBindingAPI、TfRefPtr/TfRefBase、SdfSpec、TfToken 等索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，转入 functions_s/t/type/u/v 等后续 Class Members 与 type 索引页，并检查 type 页摘录质量。
- 第 76 轮继续推进 API Class Members 与 type 索引队列：新增 5 个 API bilingual_draft HTML（functions_s/functions_t/functions_type/functions_u/functions_v）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数均为 40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 145 draft / 253 pending。
- 第 76 轮验证补齐：openusd_bilingual_final.html 已重建并链接 145 个 draft；full_draft_preview_audit 已确认 145 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_type 与 functions_s，确认 Vdf/Sdf/Hd/Vt 类型索引和 UsdTimeCode/HdEmbree/UsdImaging 等成员索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，转入 functions_vars_a-e 变量索引页，并检查 vars 页摘录规则。
- 第 77 轮继续推进 API Variables 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_a/functions_vars_b/functions_vars_c/functions_vars_d/functions_vars_e）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 19-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 150 draft / 248 pending。
- 第 77 轮验证补齐：openusd_bilingual_final.html 已重建并链接 150 个 draft；full_draft_preview_audit 已确认 150 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars_b/e，确认 UsdUITokensType、UsdGeomTokensType、UsdPhysicsJointDrive、VtArrayEditBuilder 等变量索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_vars_f-j 后续变量索引页，并持续检查低链接 vars 页摘录质量。
- 第 78 轮继续推进 API Variables 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_f/functions_vars_g/functions_vars_h/functions_vars_i/functions_vars_j）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 5-34，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 155 draft / 243 pending。
- 第 78 轮验证补齐：openusd_bilingual_final.html 已重建并链接 155 个 draft；full_draft_preview_audit 已确认 155 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars_g/j，确认 UsdMedia/UsdProc/UsdLux tokens、UsdPhysicsSceneDesc、HdEmbreeConfig、UsdPhysicsJointDesc 等变量索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_vars_k-o 后续变量索引页，并持续检查低链接 vars 页摘录质量。
- 第 79 轮继续推进 API Variables 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_k/functions_vars_l/functions_vars_m/functions_vars_n/functions_vars_o）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 5-35，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 160 draft / 238 pending。
- 第 79 轮验证补齐：openusd_bilingual_final.html 已重建并链接 160 个 draft；full_draft_preview_audit 已确认 160 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars_k/l，确认 UsdPhysicsTokensType、UsdSchemaRegistry::SchemaInfo、UsdPhysicsRigidBodyDesc、PcpNamespaceEdits 与 UsdGeomLinearUnits 等变量索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_vars_p-t 后续变量索引页，并持续检查低链接 vars 页摘录质量。
- 第 80 轮继续推进 API Variables 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_p/functions_vars_q/functions_vars_r/functions_vars_s/functions_vars_t）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 1-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 165 draft / 233 pending。
- 第 80 轮验证补齐：openusd_bilingual_final.html 已重建并链接 165 个 draft；full_draft_preview_audit 已确认 165 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars_q/t，确认极短页 UsdVolTokensType 摘录有效，functions_vars_t 保留 PcpError、UsdPhysicsJointDrive、UsdHydra/UsdMedia tokens 等变量索引摘录。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_vars_u-y 后续变量索引页，并持续检查极短 vars 页摘录质量。
- 第 81 轮继续推进 API Variables 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_u/functions_vars_v/functions_vars_w/functions_vars_x/functions_vars_y）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，各 1 条索引摘录，链接数为 2-17，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 170 draft / 228 pending。
- 第 81 轮验证补齐：openusd_bilingual_final.html 已重建并链接 170 个 draft；full_draft_preview_audit 已确认 170 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars_x/y，确认极短页保留 UsdGeomTokensType、UsdPhysicsTokensType、UsdLuxTokensType 等变量索引摘录。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_vars_z、functions_vars 和 functions_w/x/y 等变量汇总与成员索引页，并持续检查极短索引页摘录质量。
- 第 82 轮继续推进 API Variables 收尾与 Class Members 索引队列：新增 5 个 API bilingual_draft HTML（functions_vars_z/functions_vars/functions_w/functions_x/functions_y）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 2-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 175 draft / 223 pending。
- 第 82 轮验证补齐：openusd_bilingual_final.html 已重建并链接 175 个 draft；full_draft_preview_audit 已确认 175 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 functions_vars/functions_vars_z，确认 GfColor/HdBufferArray 与 UsdGeom/UsdLux/UsdPhysics/UsdVol tokens 等索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 functions_z、functions 汇总页和 geom/gf/glf 等后续 API 页面，并持续检查极短索引页摘录质量。
- 第 83 轮继续推进 API Class Members 收尾、Gf/Glf 模块页与源码页队列：新增 5 个 API bilingual_draft HTML（functions_z/functions/geom_model_a_p_i_adapter_8h_source/gf_page_front/glf_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 0-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 180 draft / 218 pending。
- 第 83 轮验证补齐：openusd_bilingual_final.html 已重建并链接 180 个 draft；full_draft_preview_audit 已确认 180 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查 glf_page_front/gf_page_front/functions_z/functions，确认 Glf 官方短句、Gf Graphics Foundations 概览和 Class Members z/汇总索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖后续 group 页面、header source 页面或以最新 pending 队列为准，并继续检查 0 链接/低链接短模块页是否保留有效原文摘录。
- 第 84 轮继续推进 API File Members 索引队列：新增 5 个 API bilingual_draft HTML（globals_c/globals_defs/globals_e/globals_enum/globals_eval）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数最终为 1-2 条，链接数为 2-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 185 draft / 213 pending。
- 第 84 轮修复补齐：初次抽查发现 globals_enum/globals_eval 只有占位摘录，随后增强 scripts/build_api_full_batch.mjs，新增 Doxygen contents 列表项摘录规则，并重建同批页面；抽查确认 globals_enum 保留 ArchMemoryProtection、PcpArcType、SdfSpecifier、UsdInterpolationType 等枚举条目，globals_eval 保留 UsdInterpolationTypeHeld、UsdListPosition*、UsdResolveInfoSource* 等 enumerator 条目。
- 第 84 轮验证补齐：openusd_bilingual_final.html 已重建并链接 185 个 draft；full_draft_preview_audit 已确认 185 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先级转入 globals_func_c/e/g/h/j 等 File Members functions 索引页，并持续检查低 heading/低链接索引页摘录质量。
- 第 85 轮继续推进 API File Members functions 索引队列：新增 5 个 API bilingual_draft HTML（globals_func_c/globals_func_e/globals_func_g/globals_func_h/globals_func_j）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 1-39，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 190 draft / 208 pending。
- 第 85 轮验证补齐：openusd_bilingual_final.html 已重建并链接 190 个 draft；full_draft_preview_audit 已确认 190 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 CombineError/CombineResult、EfGetFirstValidInputValue、GfAbs/GfClamp/GfCross、HioOpenVDBGridFromAsset、JsParseString/JsWriteValue 等函数索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 globals_func_l/o/p/s/t 等后续 File Members functions 索引页，并持续检查低链接页摘录质量。
- 第 86 轮继续推进 API File Members functions 索引队列：新增 5 个 API bilingual_draft HTML（globals_func_l/globals_func_o/globals_func_p/globals_func_s/globals_func_t）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 1-31，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 195 draft / 203 pending。
- 第 86 轮验证补齐：openusd_bilingual_final.html 已重建并链接 195 个 draft；full_draft_preview_audit 已确认 195 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 LoadUsdPhysicsFromRange、operator+ / operator==、PcpComposeSite*、Sdf*、TF_DEBUG_CODES / Tf* 等函数索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 globals_func_u/v/w、globals_func 汇总页和 globals_g 等后续 File Members 索引页，并持续检查低链接页摘录质量。
- 第 87 轮继续推进 API File Members 索引队列：新增 5 个 API bilingual_draft HTML（globals_func_u/globals_func_v/globals_func_w/globals_func/globals_g）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 7-40，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 200 draft / 198 pending。
- 第 87 轮验证补齐：openusd_bilingual_final.html 已重建并链接 200 个 draft；full_draft_preview_audit 已确认 200 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 Usd*、Vdf*/Vt*、Work*、Arch*、Gf* 等 File Members 索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 globals_h/j/l/o/p 等后续 File Members 索引页，并持续检查低链接页和汇总页摘录质量。
- 第 88 轮继续推进 API File Members 索引队列：新增 5 个 API bilingual_draft HTML（globals_h/globals_j/globals_l/globals_o/globals_p）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 1-17，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 205 draft / 193 pending。
- 第 88 轮验证补齐：openusd_bilingual_final.html 已重建并链接 205 个 draft；full_draft_preview_audit 已确认 205 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 hash_value/HioOpenVDB、Js*、LoadUsdPhysicsFromRange、operator*、Pcp* 等 File Members 索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 globals_s/t/type/u/v 等后续 File Members 索引页，并持续检查低链接页和类型索引页摘录质量。
- 第 89 轮继续推进 API File Members 索引队列：新增 5 个 API bilingual_draft HTML（globals_s/globals_t/globals_type/globals_u/globals_v）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 15-40，globals_type 提取到 9 个标题，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 210 draft / 188 pending。
- 第 89 轮验证补齐：openusd_bilingual_final.html 已重建并链接 210 个 draft；full_draft_preview_audit 已确认 210 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 Sdf*、TF_*、Arch*/Sdf*/Pcp* 类型别名、USD_* validation tokens、Vdf*/Vt* 等 File Members 索引摘录有效。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 globals_vars、globals_w、globals 汇总页和后续 group_* API 分组页，并重点检查 group 页摘要规则。
- 第 90 轮继续推进 API File Members 与 group 分组页队列：新增 5 个 API bilingual_draft HTML（globals_vars/globals_w/globals/group__group___exec___attribute___comptuations/group__group__hd__collection_predicates）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 5-21；all_pages_inventory 更新为 406 total / 8 complete / 215 draft / 183 pending。
- 第 90 轮脚本修复：增强 scripts/build_api_full_batch.mjs，新增 Doxygen memberdecls 摘录规则，让 group 页优先保留成员/函数/变量条目；重建同批页面后，group__group___exec___attribute___comptuations 保留 computeValue/computeResolvedValue/computePath，group__group__hd__collection_predicates 保留 HdGetCollectionPredicateLibrary。
- 第 90 轮验证补齐：openusd_bilingual_final.html 已重建并链接 215 个 draft；full_draft_preview_audit 已确认 215 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 hd_embree/hd/hdSt/hdStorm/hdx 等 API module front pages，并持续检查 group/module 页摘要质量。
- 第 91 轮继续推进 API module front pages 队列：新增 5 个 API bilingual_draft HTML（hd_embree_page_front/hd_page_front/hd_st_page_front/hd_storm_page_front/hdx_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 0-14，未出现空摘录；all_pages_inventory 更新为 406 total / 8 complete / 220 draft / 178 pending。
- 第 91 轮验证补齐：openusd_bilingual_final.html 已重建并链接 220 个 draft；full_draft_preview_audit 已确认 220 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；抽查确认 HdEmbree、Hd、HdSt、HdStorm、Hdx 页面均保留官方 module overview/简介原文摘录。
- 下一轮优先级：继续 API pending 队列批量生成，覆盖 hgi_2shader_program_8h_source、hierarchy、hio_page_front、inherits、journal_8h 等后续源码/层级/module 页面，并重点检查 source/hierarchy 页摘要质量。
- 第 92 轮继续推进 API source/hierarchy/module/file 队列：新增 5 个 API bilingual_draft HTML（hgi_2shader_program_8h_source/hierarchy/hio_page_front/inherits/journal_8h）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 4-40；all_pages_inventory 更新为 406 total / 8 complete / 225 draft / 173 pending。
- 第 92 轮脚本修复：增强 scripts/build_api_full_batch.mjs，新增 hierarchy directory 摘录、inherits image-map 摘录、area link 保留、source/index 数字链接过滤和 More... 噪声清理；抽查确认 hierarchy 保留 ExecSystem::_ChangeProcessor/SdfSchemaBase 条目，inherits 保留 graphical hierarchy 条目，hgi source 保留 HgiShaderProgram 与源码摘录，journal_8h 保留 EsfJournal 成员摘录。
- 第 92 轮验证补齐：openusd_bilingual_final.html 已重建并链接 225 个 draft；full_draft_preview_audit 已确认 225 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 js_page_front、kind_page_front、md_pxr_exec_ef__r_e_a_d_m_e、md_pxr_exec_esf__r_e_a_d_m_e、md_pxr_exec_esf_usd__r_e_a_d_m_e 等 module/README 页面，并检查 Markdown/README 页摘要质量。
- 第 93 轮继续推进 API module/README 队列：新增 5 个 API bilingual_draft HTML（js_page_front/kind_page_front/md_pxr_exec_ef__r_e_a_d_m_e/md_pxr_exec_esf__r_e_a_d_m_e/md_pxr_exec_esf_usd__r_e_a_d_m_e）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 0-3；all_pages_inventory 更新为 406 total / 8 complete / 230 draft / 168 pending。
- 第 93 轮脚本修复：增强 scripts/build_api_full_batch.mjs，清理 Markdown README 的 `&zwj;` 与 `[!note]` 噪声，修复链接文本拆分造成的标点前空格，并避免“完整段落 + 首句”重复摘录；抽查确认 Js 页面保留 JSON I/O 与 Python json 提示，Kind 页面保留 runtime-extensible taxonomy 与 builtin kind hierarchy，Exec README 页面保留 Ef/Esf/EsfUsd 执行系统说明。
- 第 93 轮验证补齐：openusd_bilingual_final.html 已重建并链接 230 个 draft；full_draft_preview_audit 已确认 230 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 md_pxr_exec_exec__r_e_a_d_m_e、md_pxr_exec_exec_geom__r_e_a_d_m_e、md_pxr_exec_exec_ir__r_e_a_d_m_e、md_pxr_exec_vdf__r_e_a_d_m_e、md_pxr_exec_vdf_test_utils__r_e_a_d_m_e 等后续 Exec/Vdf README 页面，并持续检查短链接 README 页摘要质量。
- 第 94 轮继续推进 API Exec/ExecUsd README 队列：新增 5 个 API bilingual_draft HTML（md_pxr_exec_exec__r_e_a_d_m_e/md_pxr_exec_exec_geom__r_e_a_d_m_e/md_pxr_exec_exec_ir__r_e_a_d_m_e/md_pxr_exec_exec_usd__r_e_a_d_m_e/md_pxr_exec_exec_usd_docs_overview）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 1-8；all_pages_inventory 更新为 406 total / 8 complete / 235 draft / 163 pending。
- 第 94 轮质量抽查：确认 exec README 保留 exec/vdf/ef/esf 关系与 data flow network 摘录，execGeom 保留 execUsd 与 UsdGeom schema computation 关系，execIr 保留 invertible controllers 说明，execUsd 保留 primary entry point 与 registration/UsdStage/evaluation 条目，OpenExec overview 保留 computations、UsdStage ingest 与教程概览。
- 第 94 轮验证补齐：openusd_bilingual_final.html 已重建并链接 235 个 draft；full_draft_preview_audit 已确认 235 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 md_pxr_exec_exec_usd_docs_tutorial1_computing_values、tutorial2_defining_computations、md_pxr_exec_vdf__r_e_a_d_m_e、md_pxr_exec_vdf_test_utils__r_e_a_d_m_e、namespacemembers 等后续教程/README/索引页面。
- 第 95 轮继续推进 API 教程/README/测试说明队列：新增 5 个 API bilingual_draft HTML（md_pxr_exec_exec_usd_docs_tutorial1_computing_values/md_pxr_exec_exec_usd_docs_tutorial2_defining_computations/md_pxr_exec_vdf__r_e_a_d_m_e/md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e/md_pxr_usd_imaging_usdviewq_black_box_testing）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 2 条，链接数为 0-31；all_pages_inventory 更新为 406 total / 8 complete / 240 draft / 158 pending。
- 第 95 轮脚本修复：增强 scripts/build_api_full_batch.mjs，新增教程 code-path-only 过滤和截断省略号归一化，避免 tutorial 页“代码路径/总览段”重复摘录；抽查确认 tutorial1 保留 Computing Values 和 low-level API note，tutorial2 保留 defining computations 与 Computing Values 承接说明，Vdf 保留 VdfNetwork/VdfNode/VdfConnection，usdviewq 保留 GUI/测试实践，blackBoxTesting 保留 testusdview harness 与 viewport visibility 测试目标。
- 第 95 轮验证补齐：openusd_bilingual_final.html 已重建并链接 240 个 draft；full_draft_preview_audit 已确认 240 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 md_pxr_usd_sdf_doxygen_boolean_expressions、md_pxr_usd_validation_usd_validation__r_e_a_d_m_e、modules、namespacemembers、namespacemembers_func 等后续 validation/module/namespace 索引页面。
- 第 96 轮继续推进 API validation/module/namespace 队列：新增 5 个 API bilingual_draft HTML（md_pxr_usd_sdf_doxygen_boolean_expressions/md_pxr_usd_validation_usd_validation__r_e_a_d_m_e/modules/namespacemembers_func/namespacemembers_type）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 2 条，链接数为 1-40；all_pages_inventory 更新为 406 total / 8 complete / 245 draft / 153 pending。
- 第 96 轮脚本修复：增强 scripts/build_api_full_batch.mjs，在 Doxygen namespace 成员页标题泛化为 “Universal Scene Description: Namespace Members” 时回退到全量清单的具体标题，并增强长摘录重叠过滤；重建后 namespacemembers_func/type 分别显示 Functions/Typedefs，Validation 页摘录从重复 Validator 段落改为框架概览与 metadata 说明。
- 第 96 轮验证补齐：openusd_bilingual_final.html 已重建并链接 245 个 draft；full_draft_preview_audit 已确认 245 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 namespacemembers、namespaces、page__execution__system__design、page_ts_regression、page_ts_status 等后续 namespace/design/Ts 文档页面。
- 第 97 轮继续推进 API namespace/design/Ts 文档队列：新增 5 个 API bilingual_draft HTML（namespacemembers/namespaces/page__execution__system__design/page_ts_regression/page_ts_status）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 2 条，链接数为 1-19；all_pages_inventory 更新为 406 total / 8 complete / 250 draft / 148 pending。
- 第 97 轮质量抽查：确认 namespacemembers 保留 documented namespace members 与 ShaderMetadataHelpers/VdfTestUtils/pxr_tsl 条目，namespaces 保留 pxr_tsl/ShaderMetadataHelpers/VdfTestUtils 命名空间列表，OpenExec System Design 保留 general-purpose computation engine 与 guiding principles，Ts regression 保留 Bezier/regressive segment 说明，Ts status 保留 USD Anim in-development 状态与 loop/evaluation 说明。
- 第 97 轮验证补齐：openusd_bilingual_final.html 已重建并链接 250 个 draft；full_draft_preview_audit 已确认 250 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 page_ts_ts_test、pages、parallel_speculation_executor_engine_8h_source、pcp_page_front、plug_page_front 等 TsTest/Related Pages/source/module 页面。
- 第 98 轮继续推进 API TsTest/Related/source/module 队列：新增 5 个 API bilingual_draft HTML（page_ts_ts_test/pages/parallel_speculation_executor_engine_8h_source/pcp_page_front/plug_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 2 条，链接数为 0-40；all_pages_inventory 更新为 406 total / 8 complete / 255 draft / 143 pending。
- 第 98 轮脚本修复：增强 scripts/build_api_full_batch.mjs 的 source 页链接文本过滤，跳过纯数字和 More... 锚文本；重建后 parallelSpeculationExecutorEngine source 页链接显示为 VdfParallelSpeculationExecutorEngine、VdfParallelExecutorEngineBase、VdfEvaluationState 等可读 API 名称。
- 第 98 轮验证补齐：openusd_bilingual_final.html 已重建并链接 255 个 draft；full_draft_preview_audit 已确认 255 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 pxr_display_filter_adapter_8h_source、riley_param_schema_8h_source、sdf_page_front、sdr_glslfx_page_front、sdr_page_front 等 source/module 页面。
- 第 99 轮继续推进 API source/Sdf/Sdr 模块队列：新增 5 个 API bilingual_draft HTML（pxr_display_filter_adapter_8h_source/riley_param_schema_8h_source/sdf_page_front/sdr_glslfx_page_front/sdr_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 0-37；all_pages_inventory 更新为 406 total / 8 complete / 260 draft / 138 pending。
- 第 99 轮脚本修复：增强 scripts/build_api_full_batch.mjs 的 cleanText 实体清理，补充 `&zwnj;` 过滤；重建后 sdf_page_front 链接列表不再包含零宽字符残留，保留 SdfPath、SdfLayer、SdfPrimSpec、UsdPrim、SdfLayerStateDelegateBase 等可读链接。
- 第 99 轮验证补齐：openusd_bilingual_final.html 已重建并链接 260 个 draft；full_draft_preview_audit 已确认 260 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 sparse_vectorized_input_traverser_8h、struct_hgi_sampler_desc、struct_usd_geom_tokens_type、struct_usd_lux_tokens_type、struct_usd_physics_tokens_type 等 source/struct 页面。
- 第 100 轮继续推进 API source/struct token 队列：新增 5 个 API bilingual_draft HTML（sparse_vectorized_input_traverser_8h/struct_hgi_sampler_desc/struct_usd_geom_tokens_type/struct_usd_lux_tokens_type/struct_usd_physics_tokens_type）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 3-40；all_pages_inventory 更新为 406 total / 8 complete / 265 draft / 133 pending。
- 第 100 轮脚本修复：增强 scripts/build_api_full_batch.mjs 的 compactExcerpt 摘录清理，统一移除段尾 `More...`；重建后 struct_hgi_sampler_desc 不再出现 Doxygen brief 噪声，保留 GPU sampler 描述、debugName、magFilter、minFilter、mipFilter、addressMode/borderColor 等摘录，UsdGeom/UsdLux/UsdPhysics token struct 保留有效 Member entries。
- 第 100 轮验证补齐：openusd_bilingual_final.html 已重建并链接 265 个 draft；full_draft_preview_audit 已确认 265 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 struct_usd_skel_tokens_type、system_diagnostics_8h_source、tf_page_front、trace_page_front、usd_2usd_2object_8h 等 struct/source/module 页面。
- 第 101 轮继续推进 API struct/source/module/file 队列：新增 5 个 API bilingual_draft HTML（struct_usd_skel_tokens_type/system_diagnostics_8h_source/tf_page_front/trace_page_front/usd_2usd_2object_8h）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 7-40；all_pages_inventory 更新为 406 total / 8 complete / 270 draft / 128 pending。
- 第 101 轮脚本修复：增强 scripts/build_api_full_batch.mjs 的导航噪声过滤，跳过 `Go to the source code of this file.` 链接、include graph 段落和 `Definition at line ...` 位置说明；重建后 usd_2usd_2object_8h 保留 UsdObject、UsdObjType、UsdIsConvertible、UsdIsConcrete 等有效 member 摘录，不再把 include graph/source-location 当正文摘录。
- 第 101 轮验证补齐：openusd_bilingual_final.html 已重建并链接 270 个 draft；full_draft_preview_audit 已确认 270 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 usd_app_utils_page_front、usd_geom_page_front、usd_hydra_page_front、usd_lux_page_front、usd_media_page_front 等 Usd module front pages。
- 第 102 轮继续推进 API Usd module front pages 队列：新增 5 个 API bilingual_draft HTML（usd_app_utils_page_front/usd_geom_page_front/usd_hydra_page_front/usd_lux_page_front/usd_media_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 2 条，链接数为 1-37；all_pages_inventory 更新为 406 total / 8 complete / 275 draft / 123 pending。
- 第 102 轮质量抽查：确认 UsdAppUtils 保留 utility overview 和 Frame Format Strings 入口，UsdGeom 保留 geometry schema overview 和 Imageable/Xformable/Gprim/Mesh 等入口，UsdHydra 保留 Hydra schemas 与 deprecated shading-token 说明，UsdLux 保留 lighting schema/module overview 和 light/filter/API 入口，UsdMedia 保留 media schema overview 与 AssetPreviewsAPI/SpatialAudio 入口；本批未发现 `More...`、include graph、source-code 或 Definition at line 噪声残留。
- 第 102 轮验证补齐：openusd_bilingual_final.html 已重建并链接 275 个 draft；full_draft_preview_audit 已确认 275 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 usd_mtlx_page_front、usd_physics_page_front、usd_proc_page_front、usd_render_page_front、usd_ri_page_front 等 module 页面。
- 第 103 轮继续推进 API module front pages 队列：新增 5 个 API bilingual_draft HTML（usd_mtlx_page_front/usd_physics_page_front/usd_proc_page_front/usd_render_page_front/usd_ri_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 1-37；all_pages_inventory 更新为 406 total / 8 complete / 280 draft / 118 pending。
- 第 103 轮质量抽查：确认 UsdMtlx 保留 MaterialX file format、shader discovery/parsing 和 UsdShade/Sdr concept mappings，UsdPhysics 保留 rigid body physics overview、stage units 与 schema/API 入口，UsdProc 保留 GenerativeProcedural schema 入口，UsdRender 保留 render settings/product/var/pass 概览，UsdRi 保留 RenderMan utility 和 usdRi/rmanUtilities.h 入口；本批未发现 `More...`、include graph、source-code、Definition at line 或零宽实体噪声残留。
- 第 103 轮验证补齐：openusd_bilingual_final.html 已重建并链接 280 个 draft；full_draft_preview_audit 已确认 280 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 usd_semantics_overview、usd_shade_page_front、usd_shaders_page_front、usd_skel_page_front、usd_u_i_page_front 等 module/overview 页面。
- 第 104 轮继续推进 API module/overview 队列：新增 5 个 API bilingual_draft HTML（usd_semantics_overview/usd_shade_page_front/usd_shaders_page_front/usd_skel_page_front/usd_u_i_page_front）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数均为 2 条，链接数为 1-19；all_pages_inventory 更新为 406 total / 8 complete / 285 draft / 113 pending。
- 第 104 轮质量抽查：确认 UsdSemantics 保留 semantic labeling 和 hierarchical inheritance 说明，UsdShade 保留 material/shading network 与 ConnectableAPI/Sdr 入口，UsdShaders 保留 UsdPreviewSurface/UsdUVTexture shader definitions 说明，UsdSkel 保留 skeleton schema/API manual 与 introduction/schema/API 入口，UsdUI 保留 UI layout/accessibility hints 与 NodeGraph/Object/Prim/Property hints 入口；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 104 轮验证补齐：openusd_bilingual_final.html 已重建并链接 285 个 draft；full_draft_preview_audit 已确认 285 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 usd_utils_page_front、usd_vol_page_front、usdabc_page_front、usddraco_page_front、var_8h_source 等 utility/plugin/source 页面。
- 第 105 轮继续推进 API utility/plugin/source 队列：新增 5 个 API bilingual_draft HTML（usd_utils_page_front/usd_vol_page_front/usdabc_page_front/usddraco_page_front/var_8h_source）到 full_site/api/，源快照保存到 source/full_api/；本批 5 页均为 HTTP 200，摘录数为 1-2 条，链接数为 0-36；all_pages_inventory 更新为 406 total / 8 complete / 290 draft / 108 pending。
- 第 105 轮质量抽查：确认 UsdUtils 保留 utility overview 和关键工具/API 入口，UsdVol 保留 volume schema overview，UsdAbc/UsdDraco 保留 file format plugin overview，var_8h_source 保留 SdfAssetPath、UsdRenderVar、UsdTyped 等索引入口和短源码片段；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 105 轮验证补齐：openusd_bilingual_final.html 已重建并链接 290 个 draft；full_draft_preview_audit 已确认 290 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 vt_page_front、work_page_front、spec_usdz、spec、tut_authoring_variants 等后续 API/release 页面。
- 第 106 轮按全量 pending 前段混合推进 API/release 队列：新增 2 个 API bilingual_draft HTML（vt_page_front/work_page_front）到 full_site/api/，新增 3 个 release bilingual_draft HTML（spec_usdz/spec/tut_authoring_variants）到 full_site/release/；源快照保存到 source/full_api/ 与 source/full_release/；本批 5 页均为 HTTP 200，API 摘录数均为 2 条、链接数为 3-5，release 摘录数为 1-3 条、链接数为 3-7；all_pages_inventory 更新为 406 total / 8 complete / 295 draft / 103 pending。
- 第 106 轮脚本与质量抽查：增强 scripts/build_release_full_batch.mjs，使 release draft 优先从 Sphinx articleBody 抽取 h1-h4、正文链接和目录页摘录，并在 release_full_batch_report.json 中记录 excerpt_count；确认 Vt 保留 VtValue/VtArray type abstraction 摘录，Work 保留 multithreaded dispatch 摘录，spec_usdz 保留 packaging/file-ordering/asset-path 摘录，spec 保留三个 specification 入口，Authoring Variants 保留 tutorial 步骤摘录；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 106 轮验证补齐：openusd_bilingual_final.html 已重建并链接 295 个 draft；full_draft_preview_audit 已确认 295 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 tut_converting_between_layer_formats、tut_end_to_end、tut_generating_new_schema、tut_helloworld_redux、tut_helloworld 等 release tutorial 页面。
- 第 107 轮继续推进 release tutorial 队列：新增 5 个 release bilingual_draft HTML（tut_converting_between_layer_formats/tut_end_to_end/tut_generating_new_schema/tut_helloworld_redux/tut_helloworld）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 2-3 条、链接数为 2-7、代码/命令摘录数均为 1；all_pages_inventory 更新为 406 total / 8 complete / 300 draft / 98 pending。
- 第 107 轮脚本与质量抽查：增强 scripts/build_release_full_batch.mjs，为 release tutorial draft 增加“代码与命令摘录 / Code and Command Excerpts”区块，并在 release_full_batch_report.json 中记录 code_snippet_count；确认 layer format tutorial 保留 usdcat 命令，end-to-end 保留 create_asset.py 命令，schema generation 保留 schema.usda 片段，HelloWorld/Redux 保留 CreateNew/DefinePrim/UsdGeom 代码片段；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 107 轮验证补齐：openusd_bilingual_final.html 已重建并链接 300 个 draft；full_draft_preview_audit 已确认 300 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 tut_houdini_example、tut_inspect_and_author_props、tut_referencing_layers、tut_simple_shading、tut_traversing_stage 等后续 release tutorial 页面。
- 第 108 轮继续推进 release tutorial 队列：新增 5 个 release bilingual_draft HTML（tut_houdini_example/tut_inspect_and_author_props/tut_referencing_layers/tut_simple_shading/tut_traversing_stage）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数均为 3 条、链接数为 0-4、代码/命令摘录数均为 1；all_pages_inventory 更新为 406 total / 8 complete / 305 draft / 93 pending。
- 第 108 轮质量抽查：确认 Houdini 历史工作流保留 Solaris 替代说明和 usdview 命令，Inspecting/Authoring Properties 保留 Stage.Open/GetPrimAtPath 代码，Referencing Layers 保留 SetDefaultPrim/XformCommonAPI 代码，Simple Shading 保留 UsdShade/UsdGeom 建模与材质代码，Traversing Stage 保留 usdviewApi.stage.Traverse 交互示例；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 108 轮验证补齐：openusd_bilingual_final.html 已重建并链接 305 个 draft；full_draft_preview_audit 已确认 305 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 tut_usd_tutorials、tut_usdview_plugin、tut_variants_example_in_katana、tut_xforms、usd_products 等后续 release 页面。
- 第 109 轮继续推进 release 后续队列：新增 5 个 release bilingual_draft HTML（tut_usd_tutorials/tut_usdview_plugin/tut_variants_example_in_katana/tut_xforms/usd_products）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 2-3 条、链接数为 1-36、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 310 draft / 88 pending。
- 第 109 轮质量抽查：确认 USD Tutorials 目录页保留 Github、Toolset、Hello World、Referencing Layers、Traversing Stage、Authoring Variants 等教程入口链接，Usdview Plugin 保留 PluginContainer 设置和 mkdir 命令，Katana variants 保留历史说明和 Foundry plugin 链接，Xforms 保留 usdview/UpAxis/timeCodes 链接和脚本摘录，Products Using USD 保留产品分组标题和 3Delight/Adobe/AMD/Apple 等外链；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 109 轮验证补齐：openusd_bilingual_final.html 已重建并链接 310 个 draft；full_draft_preview_audit 已确认 310 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 usdfaq、user_guides/collections_and_patterns、user_guides/color_user_guide、user_guides/namespace_editing、user_guides/primvars 等后续 release user guide 页面。
- 第 110 轮脚本修复：修复 scripts/build_release_full_batch.mjs 的 release 子目录输出规则，使 `user_guides/...` 和后续更深层 schema 页面按官方相对路径写入 `full_site/release/...` 与 `source/full_release/...`，并按页面深度生成正确的 favicon 与返回最终入口相对链接；已删除本轮初次生成的 4 个扁平化临时文件。
- 第 110 轮继续推进 release/user guide 队列：新增 5 个 release bilingual_draft HTML（usdfaq/user_guides/collections_and_patterns/user_guides/color_user_guide/user_guides/namespace_editing/user_guides/primvars）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数均为 3 条、链接数为 0-11、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 315 draft / 83 pending。
- 第 110 轮质量抽查：确认 FAQ 保留 Overview and Purpose、glossary、Alembic、MaterialX、FileFormatArguments 和 Unicode 链接以及 usdcat 命令；Collections 保留 collection membership 与 `CollectionAPI` 示例；Color guide 保留 Color Programmer’s Guide、UsdRender、MaterialX、OCIO 链接；Namespace Editing 保留 LayerStack 链接和 usda 示例；Primvars 保留 interpolation modes 与 mesh primvar 示例；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 110 轮验证补齐：openusd_bilingual_final.html 已重建并链接 315 个 draft；full_draft_preview_audit 已确认 315 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/render_user_guide、user_guides/schemas/index、user_guides/schemas/usdLux/BoundableLightBase、CylinderLight、DiskLight 等后续 release user guide/schema 页面。
- 第 111 轮继续推进 release user guide/schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/render_user_guide/user_guides/schemas/index/user_guides/schemas/usdLux/BoundableLightBase/user_guides/schemas/usdLux/CylinderLight/user_guides/schemas/usdLux/DiskLight）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-36、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 320 draft / 78 pending。
- 第 111 轮质量抽查：确认 Rendering with USD 保留 UsdGeom 链接和 upAxis usda 示例，Schema Domains 保留 Lights/usdLux、BoundableLightBase、CylinderLight、DiskLight、DistantLight、DomeLight、LightAPI 等 schema 入口，BoundableLightBase 保留 Properties、Inherited Properties、extent、xformOpOrder、proxyPrim 等结构，CylinderLight/DiskLight 保留 intrinsic light 说明和 USDA light 示例；本批深层页面 favicon 与返回最终入口相对路径正确，未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 111 轮验证补齐：openusd_bilingual_final.html 已重建并链接 320 个 draft；full_draft_preview_audit 已确认 320 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdLux/DistantLight、DomeLight_1、DomeLight、GeometryLight、LightAPI 等后续 usdLux schema 页面。
- 第 112 轮继续推进 release usdLux schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdLux/DistantLight/user_guides/schemas/usdLux/DomeLight_1/user_guides/schemas/usdLux/DomeLight/user_guides/schemas/usdLux/GeometryLight/user_guides/schemas/usdLux/LightAPI）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 2-3 条、链接数为 0-3、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 325 draft / 73 pending。
- 第 112 轮质量抽查：确认 DistantLight 保留 directional light 说明和 USDA 示例，DomeLight_1 保留 guideRadius、inputs:texture:file、inputs:texture:format、light:shaderId、poleAxis、portals 等属性结构和 OpenEXR/DomeLight 链接，DomeLight 保留 environment lighting、HDR/IBL 说明、OpenEXR/DomeLight_1 链接和 USDA 示例，GeometryLight 保留 geometry/light:shaderId 及继承属性结构，LightAPI 保留 light-linking、UsdShade、Collections 链接和 collection/lightLink、inputs:color、inputs:intensity 等属性结构；本批深层页面返回入口相对路径正确，未发现常见噪声。
- 第 112 轮验证补齐：openusd_bilingual_final.html 已重建并链接 325 个 draft；full_draft_preview_audit 已确认 325 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdLux/LightFilter、LightListAPI、ListAPI、MeshLightAPI、NonboundableLightBase 等后续 usdLux schema 页面。
- 第 113 轮继续推进 release usdLux schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdLux/LightFilter/user_guides/schemas/usdLux/LightListAPI/user_guides/schemas/usdLux/ListAPI/user_guides/schemas/usdLux/MeshLightAPI/user_guides/schemas/usdLux/NonboundableLightBase）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-3、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 330 draft / 68 pending。
- 第 113 轮质量抽查：确认 LightFilter 保留 Representing Filters on Lights、UsdShade node encapsulation、Collections and Patterns 链接以及 collection:filterLink:includeRoot/lightFilter:shaderId 属性结构；LightListAPI 保留 ComputeLightList Python 示例；ListAPI 保留 deprecated 说明和 LightListAPI 链接；MeshLightAPI 保留 Mesh Lights 链接和 light:materialSyncMode/light:shaderId 属性结构；NonboundableLightBase 保留 Representing Non-boundable Lights 链接与继承属性结构；本批深层页面返回入口相对路径正确，未发现常见噪声。
- 第 113 轮验证补齐：openusd_bilingual_final.html 已重建并链接 330 个 draft；full_draft_preview_audit 已确认 330 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdLux/overview、PluginLight、PluginLightFilter、PortalLight、RectLight 等后续 usdLux schema 页面。
- 第 114 轮继续推进 release usdLux schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdLux/overview/user_guides/schemas/usdLux/PluginLight/user_guides/schemas/usdLux/PluginLightFilter/user_guides/schemas/usdLux/PortalLight/user_guides/schemas/usdLux/RectLight）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-2、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 335 draft / 63 pending。
- 第 114 轮质量抽查：确认 overview 保留 UsdLux schema domain 概览、feature 列表和 RectLight USDA 示例；PluginLight 保留外部 Sdr shader node 识别说明和 Xformable/Imageable 继承属性结构；PluginLightFilter 保留 UsdShadeNodeDefAPI、filterLink collection、collection:filterLink:includeRoot 和 lightFilter:shaderId 结构；PortalLight 保留 dome light sampling portal、inputs:height、inputs:width 和 light:shaderId 结构；RectLight 保留 soft box/linear light 说明、inputs:width/inputs:height/inputs:texture:file 示例。
- 第 114 轮验证补齐：openusd_bilingual_final.html 已重建并链接 335 个 draft；full_draft_preview_audit 已确认 335 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdLux/ShadowAPI、ShapingAPI、SphereLight、usdLux_toc、VolumeLightAPI 等后续 usdLux schema 页面。
- 第 115 轮继续推进 release usdLux schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdLux/ShadowAPI、user_guides/schemas/usdLux/ShapingAPI、user_guides/schemas/usdLux/SphereLight、user_guides/schemas/usdLux/usdLux_toc、user_guides/schemas/usdLux/VolumeLightAPI）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-22、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 340 draft / 58 pending。
- 第 115 轮质量抽查：确认 ShadowAPI 保留 shadow color/distance/falloff 控制说明和 Shadows 链接；ShapingAPI 保留 light spread、cone angle、focus/softness 等塑形属性说明；SphereLight 保留 point/spherical light 说明和 Sphere/Cube 示例摘录；usdLux_toc 保留 Overview、UsdLux Schemas and Concepts、Light Units 等目录入口；VolumeLightAPI 保留 Volume prim light behavior、materialSyncMode 和 VolumeLight shaderId 说明。
- 第 115 轮验证补齐：openusd_bilingual_final.html 已重建并链接 340 个 draft；full_draft_preview_audit 已确认 340 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdMedia/AssetPreviewsAPI、overview、SpatialAudio、usdMedia_toc 以及 user_guides/schemas/usdRender/overview 等后续 release schema 页面。
- 第 116 轮继续推进 release schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdMedia/AssetPreviewsAPI、user_guides/schemas/usdMedia/overview、user_guides/schemas/usdMedia/SpatialAudio、user_guides/schemas/usdMedia/usdMedia_toc、user_guides/schemas/usdRender/overview）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-3、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 345 draft / 53 pending。
- 第 116 轮质量抽查：确认 AssetPreviewsAPI 保留 thumbnail/preview render 用途说明和链接缩略图示例；usdMedia overview 保留 audio、SpatialAudio、AssetPreviewsAPI 关联说明；SpatialAudio 保留 filePath、auralMode、playback settings 和 Speech/Ambient 示例摘录；usdMedia_toc 保留 Overview、Working With Media、AssetPreviewsAPI、SpatialAudio 等目录入口；usdRender overview 保留 final-quality render、render pass、render product/var/settings 等渲染配置概览。
- 第 116 轮验证补齐：openusd_bilingual_final.html 已重建并链接 345 个 draft；full_draft_preview_audit 已确认 345 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdRender/RenderPass、RenderProduct、RenderSettings、RenderSettingsBase、RenderVar 等后续 usdRender schema 页面。
- 第 117 轮继续推进 release usdRender schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdRender/RenderPass、user_guides/schemas/usdRender/RenderProduct、user_guides/schemas/usdRender/RenderSettings、user_guides/schemas/usdRender/RenderSettingsBase、user_guides/schemas/usdRender/RenderVar）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-5、代码/命令摘录数均为 1；all_pages_inventory 更新为 406 total / 8 complete / 350 draft / 48 pending。
- 第 117 轮质量抽查：确认 RenderPass 保留 renderer/scene configuration 与多 pass 渲染说明；RenderProduct 保留单个输出 artifact、RenderVars 组合和 PrimaryProduct 示例；RenderSettings 保留全局渲染设置、输出配置和 renderer-specific API schemas 说明；RenderSettingsBase 保留 camera aperture 与 image aspect ratio mismatch 策略说明；RenderVar 保留 AOV/channel、变量命名、source information 和 LPE 等摘录；本批深层页面返回入口相对路径正确，未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 117 轮验证补齐：openusd_bilingual_final.html 已重建并链接 350 个 draft；full_draft_preview_audit 已确认 350 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdRender/usdRender_toc 以及 user_guides/schemas/usdUI/AccessibilityAPI、AttributeHints、Backdrop、NodeGraphNodeAPI 等后续 release schema 页面。
- 第 118 轮继续推进 release usdRender/usdUI schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdRender/usdRender_toc、user_guides/schemas/usdUI/AccessibilityAPI、user_guides/schemas/usdUI/AttributeHints、user_guides/schemas/usdUI/Backdrop、user_guides/schemas/usdUI/NodeGraphNodeAPI）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-6、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 355 draft / 43 pending。
- 第 118 轮质量抽查：确认 usdRender_toc 保留 Overview、Best Practices、RenderSettings、RenderProduct、RenderVar 等目录入口；AccessibilityAPI 保留 label/description/priority 辅助访问信息说明和示例；AttributeHints 保留 valueLabels、valueLabelsOrder、ObjectHints、PropertyHints 关联；Backdrop 保留 node graph grouping、colored rectangle 和材质节点示例摘录；NodeGraphNodeAPI 保留 node position、displayColor、stackingOrder、docURI 等节点图 UI 信息；本批深层页面返回入口相对路径正确，未发现 `More...`、include graph、source-code、Definition at line、`[!note]` 或零宽字符噪声残留。
- 第 118 轮验证补齐：openusd_bilingual_final.html 已重建并链接 355 个 draft；full_draft_preview_audit 已确认 355 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdUI/ObjectHints、overview、PrimHints、PropertyHints、SceneGraphPrimAPI 等后续 usdUI schema 页面。
- 第 119 轮继续推进 release usdUI schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdUI/ObjectHints、user_guides/schemas/usdUI/overview、user_guides/schemas/usdUI/PrimHints、user_guides/schemas/usdUI/PropertyHints、user_guides/schemas/usdUI/SceneGraphPrimAPI）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-2、代码/命令摘录数均为 1；all_pages_inventory 更新为 406 total / 8 complete / 360 draft / 38 pending。
- 第 119 轮质量抽查：确认 ObjectHints 保留 displayName/hidden UI hints 和 Placeholder 示例；usdUI overview 保留 node graph、NodeGraphNodeAPI、SceneGraphPrimAPI、Backdrops、assistive UI 与 UI hints 概览；PrimHints 保留 displayGroupsExpanded、displayGroupsShownIf 和 ObjectHints 关联；PropertyHints 保留 displayGroup、shownIf、ObjectHints 与 PrimHints 关联；SceneGraphPrimAPI 保留 ui:displayGroup、ui:displayName 和 shader node 示例摘录；本批深层页面返回入口相对路径正确，未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 第 119 轮验证补齐：openusd_bilingual_final.html 已重建并链接 360 个 draft；full_draft_preview_audit 已确认 360 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdUI/usdUI_toc 以及 user_guides/schemas/usdVol/Field3DAsset、FieldAsset、FieldBase、OpenVDBAsset 等后续 release schema 页面。
- 第 120 轮继续推进 release usdUI/usdVol schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdUI/usdUI_toc、user_guides/schemas/usdVol/Field3DAsset、user_guides/schemas/usdVol/FieldAsset、user_guides/schemas/usdVol/FieldBase、user_guides/schemas/usdVol/OpenVDBAsset）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 1-9、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 365 draft / 33 pending。
- 第 120 轮质量抽查：确认 usdUI_toc 保留 Overview、Working With Node Graphs、Working With Accessibility Information、UI Hints、Display Groups 等目录入口；Field3DAsset 保留 Field3D volume field、filePath timeSamples 和 density field 示例；FieldAsset 与 FieldBase 保留 deprecated/VolumeFieldAsset/VolumeFieldBase 迁移说明；OpenVDBAsset 保留 OpenVDB volume grid、fieldIndex、fieldName、filePath timeSamples 和 densityVDB 示例；本批深层页面返回入口相对路径正确，未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 第 120 轮验证补齐：openusd_bilingual_final.html 已重建并链接 365 个 draft；full_draft_preview_audit 已确认 365 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdVol/overview、ParticleField、ParticleField3DGaussianSplat、ParticleFieldKernelBaseAPI、ParticleFieldKernelConstantSurfletAPI 等后续 usdVol schema 页面。
- 第 121 轮继续推进 release usdVol schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdVol/overview、user_guides/schemas/usdVol/ParticleField、user_guides/schemas/usdVol/ParticleField3DGaussianSplat、user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI、user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 2-3 条、链接数为 0-1、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 370 draft / 28 pending。
- 第 121 轮质量抽查：确认 usdVol overview 保留 volumes/volumetric data、OpenVDB/Field3D、particle fields 和 3D Gaussian splats 说明；ParticleField 保留 base schema、derived types 与自定义 schema 继承方向；ParticleField3DGaussianSplat 保留 original 3D Gaussian Splats technique、built-in schema 和 rendering hints；ParticleFieldKernelBaseAPI 保留 spatial basis function 与 validation 语义；ParticleFieldKernelConstantSurfletAPI 保留 step-function falloff、bounded disk、ellipse transform 和 splat center 说明；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 第 121 轮验证补齐：openusd_bilingual_final.html 已重建并链接 370 个 draft；full_draft_preview_audit 已确认 370 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI、ParticleFieldKernelGaussianSurfletAPI、ParticleFieldOpacityAttributeAPI、ParticleFieldOrientationAttributeAPI、ParticleFieldPositionAttributeAPI 等后续 usdVol schema 页面。
- 第 122 轮继续推进 release usdVol schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI、user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI、user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI、user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI、user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI）到 full_site/release/，源快照保存到 source/full_release/；首次请求 openusd.org 时出现 TLS `ECONNRESET`，立即重试成功；本批 5 页均为 HTTP 200，摘录数均为 3 条、链接数为 0-1、代码/命令摘录数为 0；all_pages_inventory 更新为 406 total / 8 complete / 375 draft / 23 pending。
- 第 122 轮质量抽查：确认 GaussianEllipsoid kernel 保留 Gaussian ellipsoid、identity transform、standard deviation、3-sigma/99.7% 说明；GaussianSurflet kernel 保留 XY plane、off-plane opacity 0 和 3-sigma 说明；OpacityAttribute 保留 [0, 1] 线性 computer graphics opacity 以及 PLY/Gaussian splats transformed data 区分；OrientationAttribute 与 PositionAttribute 保留 float/half 类型和 consumer prefer float 说明；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 第 122 轮验证补齐：openusd_bilingual_final.html 已重建并链接 375 个 draft；full_draft_preview_audit 已确认 375 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI、ParticleFieldRadianceBaseAPI、ParticleFieldScaleAttributeAPI、ParticleFieldSphericalHarmonicsAttributeAPI、usdVol_toc 等后续 release 页面。
- 第 123 轮继续推进 release usdVol schema 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI、user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI、user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI、user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI、user_guides/schemas/usdVol/usdVol_toc）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，摘录数为 1-3 条、链接数为 0-21、代码/命令摘录数为 0；all_pages_inventory 更新为 406 total / 8 complete / 380 draft / 18 pending。
- 第 123 轮质量抽查：确认 PositionBaseAPI 保留 position data、particle count 与 per-particle data 关系说明；RadianceBaseAPI 保留 radiance definition 与 validation presence 说明；ScaleAttributeAPI 保留 linear scales 和 PLY/Gaussian splats log-format 区分；SphericalHarmonicsAttributeAPI 保留 spherical harmonics degree/coefficient 与 degree constant across particles 说明；usdVol_toc 保留 Overview、Working With Volumes、Working With Fields、Working With Particle Fields、Field3DAsset 等目录入口；本批未发现 `More...`、include graph、source-code、Definition at line、`[!note]`、`&zwnj;` 或零宽字符噪声残留。
- 第 123 轮验证补齐：openusd_bilingual_final.html 已重建并链接 380 个 draft；full_draft_preview_audit 已确认 380 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮优先覆盖 user_guides/schemas/usdVol/Volume、VolumeFieldAsset、VolumeFieldBase，以及 user_guides/time_and_animated_values、user_guides/variable_expressions 等剩余 release 页面。
- 回退记录：用户指出一次性生成剩余 18 页质量不合适，已删除这 18 个本地 draft HTML 和对应 `source/full_release/` 快照，恢复到第 123 轮后的接受状态：406 total / 8 complete / 380 draft / 18 pending。
- 回退后策略：后续继续按原节奏 5 个页面一轮推进，不再用大 batch 把 pending 一次性清空；`reports/release_full_batch_report.*` 已恢复为第 123 轮 5 页批次。
- 第 124 轮按回退后的 5 页节奏继续推进 release 队列：新增 5 个 release bilingual_draft HTML（user_guides/schemas/usdVol/Volume、user_guides/schemas/usdVol/VolumeFieldAsset、user_guides/schemas/usdVol/VolumeFieldBase、user_guides/time_and_animated_values、user_guides/variable_expressions）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，中文导读每页 4 条，摘录数为 1-3 条、链接数为 0-2、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 385 draft / 13 pending。
- 第 124 轮脚本增强：`scripts/build_release_full_batch.mjs` 新增标题归一化和页面级中文导读映射，覆盖 Volume、VolumeFieldAsset、VolumeFieldBase、Time and Animated Values、USD Variable Expressions 以及后续剩余提案页标题，避免只生成泛化的中文说明。
- 第 124 轮质量抽查：确认 Volume 保留体积效果、Gprim/Imageable 继承、field:* relationships 和 OpenVDBAsset 示例；VolumeFieldAsset 保留外部文件型体积场、filePath、fieldName、fieldIndex、fieldDataType、vectorDataRoleHint 说明；VolumeFieldBase 保留所有 UsdVol field schema 基类语义；Time and Animated Values 保留 TimeCode、TimeSamples、timeCodesPerSecond、LayerOffsets 与 timeSamples 示例；USD Variable Expressions 保留 expressionVariables、asset path/reference/variant selection 和 ASSET_PATH/VARIANT_CHOICE 示例；本批未发现坏编码标记。
- 第 124 轮验证补齐：openusd_bilingual_final.html 已重建并链接 385 个 draft；full_draft_preview_audit 已确认 385 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮继续 5 页节奏，优先覆盖 Asset Resolution (Ar) 2.0、Asset Previews in USD、Generalizing Connectable Nodes Beyond UsdShade、Coordinate Systems in USD Proposal、Render Settings in USD Proposal 等剩余 release 提案页。
- 第 125 轮继续按 5 页节奏推进 release proposal 队列：新增 5 个 release bilingual_draft HTML（wp_ar2、wp_asset_previews、wp_connectable_nodes、wp_coordsys、wp_render_settings）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，每页 4 条中文导读，摘录数均为 3 条、链接数为 1-9、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 390 draft / 8 pending。
- 第 125 轮质量抽查：确认 Ar 2.0 保留 ArResolver、NVI、Identifier、Resolve/AssetInfo 等设计入口；Asset Previews 保留 prim/defaultPrim 预览关联、assetInfo 字典和 thumbnails/defaultImage 示例；Connectable Nodes 保留 UsdShadeNodeDefAPI、UsdShadeConnectableAPI、schema plugin callback 和 UsdLux/UsdRi 动机；Coordinate Systems 保留 UsdShadeCoordSysAPI、coordSys:* relationship、scoped inheritance 和 usda 示例；Render Settings 保留 RenderSettings、RenderVar、RenderProduct、RenderSettingsBase 与 camera/resolution 示例；本批未发现坏编码标记。
- 第 125 轮验证补齐：openusd_bilingual_final.html 已重建并链接 390 个 draft；full_draft_preview_audit 已确认 390 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮继续 5 页节奏，优先覆盖 Rigid Body Physics、Schema Versioning、Stage Variable Expressions、UsdAudio、UsdLux Geometry Lights 等剩余 release 提案页。
- 第 126 轮继续按 5 页节奏推进 release proposal 队列：新增 5 个 release bilingual_draft HTML（wp_rigid_body_physics、wp_schema_versioning、wp_stage_variables、wp_usdaudio、wp_usdlux_for_geometry_lights）到 full_site/release/，源快照保存到 source/full_release/；本批 5 页均为 HTTP 200，每页 4 条中文导读，摘录数为 1-3 条、链接数为 1-8、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 395 draft / 3 pending。
- 第 126 轮质量抽查：确认 Rigid Body Physics 保留 PhysicsScene、刚体、约束、碰撞、质量属性和单位等入口；Schema Versioning 保留 per-schema versioning、API schema conflicts、multiple-apply API schemas 和 apiSchemas 示例；Stage Variable Expressions 正确保留迁移提示，不伪造旧正文；UsdAudio 保留 SpatialAudio、filePath、auralMode、playbackMode 和时间码示例；UsdLux Geometry Lights 保留 LightAPI、GeometryLight、light:shaderId 和 material emission 同步设计入口；本批未发现坏编码标记。
- 第 126 轮验证补齐：openusd_bilingual_final.html 已重建并链接 395 个 draft；full_draft_preview_audit 已确认 395 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；下一轮最多 3 页，覆盖剩余 wp_usdlux_for_renderers、wp_usdshade 和 wp 提案汇总页。
- 第 127 轮按实际剩余 3 页完成 release proposal 队列：新增 3 个 release bilingual_draft HTML（wp_usdlux_for_renderers、wp_usdshade、wp）到 full_site/release/，源快照保存到 source/full_release/；本批 3 页均为 HTTP 200，每页 4 条中文导读，摘录数为 1-3 条、链接数为 1-13、代码/命令摘录数为 0-1；all_pages_inventory 更新为 406 total / 8 complete / 398 draft / 0 pending。
- 第 127 轮质量抽查：确认 UsdLux for Renderers 保留 Sdr、UsdSchemaRegistry、UsdLuxPluginLight、UsdLuxPluginLightFilter 和 render delegate 设计入口；UsdShade Material Assignment 保留 material:binding、PreviewMaterial/Skin 和 renderer-specific material outputs 示例；Proposals 保留 OpenUSD-proposals 迁移说明和 13 个 proposal 列表入口；本批未发现坏编码标记。
- 第 127 轮验证补齐：openusd_bilingual_final.html 已重建并链接 398 个 draft；full_draft_preview_audit 已确认 398 个 draft 均可通过临时 HTTP 打开、均被最终 HTML 链接、本地资源失败 0；全量发现清单 406 页已无 `pending_full_scope`。
- 第 127 轮最终验证口径修正：`scripts/validate_openusd_api_repro.ps1` 已不再要求 pending 必须大于 0，改为校验 complete + draft + pending 正好覆盖 total；最新总验证 275 checks passed, 0 failed，报告索引审计 15/15 通过，最终入口 HTTP 200。
- 第 128 轮链接本地化修复：针对“很多链接跳原始英文站”的问题，新增 `scripts/route_openusd_internal_links_local.mjs` 和 `site/uncovered_openusd_page.html`，并生成 `reports/local_link_routing_report.json/.md`；409 个 HTML 文件检查后，4975 个内部链接路由到已有本地复刻页，4914 个未纳入当前 406 清单的 OpenUSD 内部链接路由到本地缺口提示页，408 个明确“官方原页”链接保留外跳。
- 第 128 轮验证补齐：`validate_openusd_api_repro.ps1` 已加入本地路由报告检查，最新总验证 281 checks passed, 0 failed；`full_draft_preview_audit` 继续确认 398/398 draft 可本地 HTTP 打开且被最终入口链接；`audit_openusd_report_index` 通过。当前翻译质量状态仍需如实标注：398 个 `bilingual_draft` 不是逐段完整翻译，应进入后续分批精修阶段。
- 第 129 轮逐页翻译质检：新增 `scripts/audit_openusd_translation_quality.mjs`，生成 `reports/translation_quality_review.json/.md`，逐页检查 406 个本地 HTML 的中英层厚度、draft 模板痕迹、坏编码风险和非预期官方外跳；当前分级为 3 个 `good_bilingual`、389 个 `draft_template_only`、5 个 `thin_chinese`、9 个 `draft_needs_translation`。
- 第 129 轮浏览器抽查：当前页 `site/_usd__overview_and_purpose.html` 渲染中文正常、英文保留正常、非预期官方外跳 0；清单前 5 个 draft（CLI11 source、Developer Guides、UsdSkel Introduction、Class List、Ar: Asset Resolution）均可打开且无坏编码/外跳问题，但翻译层基本只有范围说明和结构标签，应作为后续 5 页一组精修对象。
- 第 129 轮验证补齐：翻译质检报告已纳入 `audit_openusd_report_index`，当前索引为 16 个审计报告 / 17 个总条目，失败 0；`full_draft_preview_audit` 继续确认 398/398 draft 通过，`validate_openusd_api_repro.ps1` 最新 281 checks passed, 0 failed。
- 第 130 轮自动化修复：应用显示旧 `openusd-api` 自动化已不存在，已重新创建当前线程 heartbeat 自动化 `OpenUSD 双语复刻精修`，id 为 `openusd`，5 分钟一轮；新提示词明确 pending 已为 0，后续基于 `translation_quality_review` 每轮最多精修 5 个未达标页面，不再一次性清空或把 draft 壳当完成页。
- 第 130 轮 5 页精修：新增 `scripts/refine_openusd_translation_batch.mjs`，并给 `_developer__guides.html`、`_usd_skel__intro.html`、`annotated.html`、`ar_page_front.html`、`arch_page_front.html` 插入 `中文精修导读 / Chinese Reading Notes` 区块；每页 4 条页面级中文导读 + 5 条术语对照，保留英文/API 名称和原英文摘录。
- 第 130 轮质量变化：`audit_openusd_translation_quality` 显示 `draft_template_only` 从 389 降至 384，本轮 5 页均提升为 `draft_needs_translation`；浏览器抽查 Ar 页面中文渲染正常、坏编码 0、非预期官方外跳 0；`route_openusd_internal_links_local`、`full_draft_preview_audit`、`audit_openusd_report_index` 和 `validate_openusd_api_repro.ps1` 均通过，最新总验证 281 checks passed, 0 failed。
## 第 131 轮：用户截图页正文级双语修正

已完成：

- 针对用户在 `http://127.0.0.1:8068/site/intro.html` 截图中指出的“很多还没翻译”问题，重新检查 `site/intro.html`、`scripts/build_intro_bilingual.mjs`、`reports/translation_quality_review.*` 和本地链接路由结果。
- 确认根因不是页面打不开，而是此前 `intro.html` 虽被标为 `bilingual_complete`，但主体段落仍大量保留英文裸露，中文主要停留在标题、导航和范围说明层。
- 修改 `scripts/build_intro_bilingual.mjs`，新增正文级中文注入逻辑，覆盖 `What is USD?`、`Why use USD?`、`What can USD do?`、composition、Hydra、扩展机制、限制和 Pixar 传承等主要章节；中文在前，英文原文保留在后，API 名称和英文页面名不改。
- 重新生成 `site/intro.html`，并重新运行本地链接路由，保证站内 OpenUSD HTML 链接继续指向本地页面或本地缺口页，而不是直接跳回官方英文站。
- 重新运行翻译质量审计，`site/intro.html` 当前为 `good_bilingual`；浏览器/脚本抽查显示正文中文约 2951 字、坏编码 0、非预期官方外跳 0，关键中文句子均已渲染到页面中。
- 质量审计同时暴露仍有 4 个 `bilingual_complete` 页面属于 `thin_chinese`：`site/index.html`、`site/release_index.html`、`site/apiDocs.html`、`site/usd_page_front.html`。这些应优先于普通 draft 页进入下一批正文级修正。
- 本轮继续在 5 页节奏内补齐这 4 个薄弱完成页：增强 `scripts/build_release_index_bilingual.mjs`、`scripts/build_apiDocs_bilingual.mjs`、`scripts/build_usd_page_front_bilingual.mjs`，并直接补强 `site/index.html` 的 API 首页阅读导引。
- 重新生成 `site/release_index.html`、`site/apiDocs.html`、`site/usd_page_front.html`，再运行本地链接路由；8 个 `bilingual_complete` 页面当前全部达到 `good_bilingual`，`thin_chinese` 和 `partial_bilingual` 均为 0。
- 最新翻译质量分级：`good_bilingual` 8、`draft_needs_translation` 14、`draft_template_only` 384；说明完成页质量已补齐，后续重点是 398 个 draft 页继续五页一组精修。
- 最新验证链：`route_openusd_internal_links_local` 通过，`full_draft_preview_audit` 398/398 draft 通过，`audit_openusd_report_index` 16/16 通过，`validate_openusd_api_repro.ps1` 281 checks passed, 0 failed。

差距：

- 当前 406 页虽然都已覆盖到本地 HTML，但 398 页仍是 `bilingual_draft`，其中多数不是完整逐段翻译。
- `thin_chinese` 的完成页不能再被当作真正完成；后续应以 `translation_quality_review` 为准，而不是只看 `all_pages_inventory` 的状态字段。

下一轮目标：

1. 继续保持每轮最多 5 页，不做大批量清空。
2. 下一轮从 `reports/translation_quality_review.md` 的 draft 队列中选择 5 个用户可读价值高的页面，优先教程、schema 指南、概念页和核心 API 入口，低优先处理纯源码页。
3. 每轮继续运行链接路由、翻译质量审计、draft 预览审计、报告索引和总验证，并在报告中记录质量分级变化。

## 第 231 轮：NodeGraph、OpenVDB、属性教程、Q 变量索引与 SceneGraphPrim 二次精修

已完成：

- 复核当前 git 状态和远端：上一轮同步提交为 `088bf34`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_100.mjs`，本轮标记 `release-quality-pass-100`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`
  - `full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`
  - `full_site/release/tut_inspect_and_author_props.html`
  - `full_site/api/functions_vars_q.html`
  - `full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 621、569、521、627、559。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为二次精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`。

当前差距：

- 全量仍为 8 个 `good_bilingual`、398 个 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余未完成质量队列中，11 页仍是 `draft_template_only`，其余 387 页仍需逐轮补强。

下一轮目标：

1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`、`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`full_site/api/functions_rela_t.html`、`full_site/api/globals_func_s.html`。
3. 后续可继续 `full_site/release/tut_traversing_stage.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`，仍低优先处理 `_source.html` 和 `search.html`。

## 第 232 轮：Gaussian Surflet、usdMedia 目录、RectLight、Related T 与 Sdf 函数索引补强

已完成：

- 复核当前 git 状态和远端：上一轮同步提交为 `0447497`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_101.mjs`，本轮标记 `release-quality-pass-101`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html`
  - `full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`
  - `full_site/release/user_guides/schemas/usdLux/RectLight.html`
  - `full_site/api/functions_rela_t.html`
  - `full_site/api/globals_func_s.html`
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 741、540、526、557、548。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`。
- GitHub 同步结果：本轮通过 `sync_openusd_to_github.ps1` 以 `OpenUSD bilingual round 232: surflet media rect related sdf pass` 提交并推送。

当前差距：

- 全量仍为 8 个 `good_bilingual`、398 个 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余未完成质量队列中，11 页仍是 `draft_template_only`，其余 387 页仍需逐轮补强。

下一轮目标：

1. 继续最多 5 页。
2. 建议处理：`full_site/release/tut_traversing_stage.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`、`full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`、`full_site/release/user_guides/schemas/usdLux/SphereLight.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdRender/RenderSettings.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。

## 第 233 轮：Stage 遍历、AssetPreviews、RenderProduct、SpatialAudio 与 SphereLight 补强

已完成：

- 复核当前 git 状态和远端：上一轮同步提交为 `e36183b`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_102.mjs`，本轮标记 `release-quality-pass-102`。
- 严格只精修 5 页：
  - `full_site/release/tut_traversing_stage.html`
  - `full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderProduct.html`
  - `full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`
  - `full_site/release/user_guides/schemas/usdLux/SphereLight.html`
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 576、617、555、578、559。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为第二层补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`。
- GitHub 同步结果：本轮通过 `sync_openusd_to_github.ps1` 以 `OpenUSD bilingual round 233: traversal previews renderproduct audio sphere pass` 提交并推送。

当前差距：

- 全量仍为 8 个 `good_bilingual`、398 个 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余未完成质量队列中，11 页仍是 `draft_template_only`，其余 387 页仍需逐轮补强。

下一轮目标：

1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdRender/RenderSettings.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdLux/DiskLight.html`、`full_site/release/user_guides/schemas/usdLux/DistantLight.html`。
3. 不处理不存在的 `full_site/release/user_guides/schemas/usdMedia/SpatialAudioAndLayerOffsets.html`；继续低优先处理 `_source.html`、`search.html` 和目录页。

## 第 234 轮：RenderSettings/RenderVar/RenderSettingsBase 与 Disk/Distant Light 补强

已完成：

- 复核当前 git 状态和远端：上一轮同步提交为 `1ff962a`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_103.mjs`，本轮标记 `release-quality-pass-103`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdRender/RenderSettings.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderVar.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`
  - `full_site/release/user_guides/schemas/usdLux/DiskLight.html`
  - `full_site/release/user_guides/schemas/usdLux/DistantLight.html`
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 544、792、659、531、545。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为第二层补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`。
- GitHub 同步结果：本轮通过 `sync_openusd_to_github.ps1` 以 `OpenUSD bilingual round 234: render settings vars disk distant pass` 提交并推送。

当前差距：

- 全量仍为 8 个 `good_bilingual`、398 个 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余未完成质量队列中，11 页仍是 `draft_template_only`，其余 387 页仍需逐轮补强。

下一轮目标：

1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/CylinderLight.html`、`full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`、`full_site/release/user_guides/schemas/usdLux/GeometryLight.html`、`full_site/release/user_guides/schemas/usdLux/LightAPI.html`、`full_site/release/user_guides/schemas/usdLux/LightFilter.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdRender/RenderPass.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 235 轮：Cylinder/Dome/Geometry Light 与 LightAPI/LightFilter 补强

- 复核当前 git 状态和远端：上一轮同步提交为 `6b2f014`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_104.mjs`，本轮标记 `release-quality-pass-104`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/CylinderLight.html`
  - `full_site/release/user_guides/schemas/usdLux/DomeLight_1.html`
  - `full_site/release/user_guides/schemas/usdLux/GeometryLight.html`
  - `full_site/release/user_guides/schemas/usdLux/LightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/LightFilter.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：`CylinderLight` 覆盖圆柱侧面发光、端盖不发光和 tube light 场景；`DomeLight_1` 覆盖 HDR/IBL、`poleAxis`、portals 与 guide radius；`GeometryLight` 覆盖 deprecated 状态、`MeshLightAPI` 迁移和 `geometry` relationship；`LightAPI` 覆盖 common light inputs、light/shadow linking、filters、`materialSyncMode` 与 UsdShade connectable prim 规则；`LightFilter` 覆盖 filter linking、`lightFilter:shaderId`、connectable container 和嵌套边界。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 546、657、616、567、589；中英块分别为 24/18、39/32、35/28、40/33、35/28。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮是补强精修，不会改变当前审计分级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮准备通过 `sync_openusd_to_github.ps1` 以 `OpenUSD bilingual round 235: usdLux cylinder dome geometry filter pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/DomeLight.html`、`full_site/release/user_guides/schemas/usdLux/LightListAPI.html`、`full_site/release/user_guides/schemas/usdLux/PortalLight.html`、`full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`。
3. 后续可继续 `NonboundableLightBase.html`、`PluginLight.html`、`VolumeLightAPI.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 236 轮：DomeLight、LightListAPI、PortalLight、MeshLightAPI 与 ShadowAPI 补强

- 复核当前 git 状态和远端：上一轮同步提交为 `a414328`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_105.mjs`，本轮标记 `release-quality-pass-105`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/DomeLight.html`
  - `full_site/release/user_guides/schemas/usdLux/LightListAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/PortalLight.html`
  - `full_site/release/user_guides/schemas/usdLux/MeshLightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/ShadowAPI.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：`DomeLight` 覆盖 HDR/IBL、OpenEXR 经纬度环境贴图和 `inputs:texture:file`；`LightListAPI` 覆盖 traversal、`ComputeLightList()`、`ComputeModeIgnoreCache` 和 light paths；`PortalLight` 覆盖 local XY plane、`-Z direction`、portal width/height 与 dome sampling；`MeshLightAPI` 覆盖 applied API、`materialGlowTintsLight`、`MeshLight` shaderId 和发光 Mesh 工作流；`ShadowAPI` 覆盖 non-physical controls、阴影颜色/距离/衰减/gamma/开关和 shadow-linking 区分。
- 质量回读显示 5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 580、547、686、655、693；中英块分别为 24/18、24/17、38/31、29/20、32/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象开始前已是 `draft_needs_translation`，本轮是补强精修，不会改变当前审计分级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 236: usdLux dome list portal mesh shadow pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/PluginLight.html`、`full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`、`full_site/release/user_guides/schemas/usdLux/overview.html`、`full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`。
3. 后续可继续 `full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`PluginLightFilter.html`、`BoundableLightBase.html`，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 237 轮：NonboundableLightBase、PluginLight、VolumeLightAPI、Overview 与 ShapingAPI 补强

- 复核当前 git 状态和远端：上一轮同步提交为 `fa5afbb`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_106.mjs`，本轮标记 `release-quality-pass-106`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/NonboundableLightBase.html`
  - `full_site/release/user_guides/schemas/usdLux/PluginLight.html`
  - `full_site/release/user_guides/schemas/usdLux/VolumeLightAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/overview.html`
  - `full_site/release/user_guides/schemas/usdLux/ShapingAPI.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 non-boundable light 的 scene bounds/positional information 边界、`PluginLight` 的 `Sdr shader node` 与 `render delegate` 扩展关系、`VolumeLightAPI` 的 applied API/material sync/shaderId 语义、`usdLux` overview 的 schema 域导航路径，以及 `ShapingAPI` 的 cone/focus/IES profile 控制。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 709、732、685、653、660，中文/英文块分别为 33/24、33/24、29/20、29/22、34/27。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为二次补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 237: usdLux nonbound plugin volume shaping pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdLux/ListAPI.html`、`full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`、`full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`、`full_site/release/user_guides/schemas/usdLux/RectLight.html`、`full_site/release/user_guides/schemas/usdLux/SphereLight.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 238 轮：ListAPI、PluginLightFilter、BoundableLightBase、RectLight 与 SphereLight 补强

- 复核当前 git 状态和远端：上一轮同步提交为 `eaf0cd6`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_107.mjs`，本轮标记 `release-quality-pass-107`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdLux/ListAPI.html`
  - `full_site/release/user_guides/schemas/usdLux/PluginLightFilter.html`
  - `full_site/release/user_guides/schemas/usdLux/BoundableLightBase.html`
  - `full_site/release/user_guides/schemas/usdLux/RectLight.html`
  - `full_site/release/user_guides/schemas/usdLux/SphereLight.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `ListAPI` 的 deprecated 兼容层与 `LightListAPI` 迁移边界、`PluginLightFilter` 的 Sdr/UsdShade 插件过滤器入口、`BoundableLightBase` 的 scene bounds/extent 基类语义、`RectLight` 的 width/height/texture/transform 组合阅读，以及 `SphereLight` 的 radius/treatAsPoint/zero-area renderer 支持边界。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 755、697、670、820、841，中文/英文块分别为 29/21、36/29、35/26、36/25、36/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为二次补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 238: usdLux list filter bound rect sphere pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdRender/RenderPass.html`、`full_site/release/user_guides/schemas/usdRender/RenderProduct.html`、`full_site/release/tut_inspect_and_author_props.html`、`full_site/release/tut_traversing_stage.html`、`full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 239 轮：RenderPass、RenderProduct、属性教程、Stage 遍历与 SpatialAudio 补强

- 复核当前 git 状态和远端：上一轮同步提交为 `a86ede1`，`origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_108.mjs`，本轮标记 `release-quality-pass-108`。
- 严格只精修 5 页：
  - `full_site/release/user_guides/schemas/usdRender/RenderPass.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderProduct.html`
  - `full_site/release/tut_inspect_and_author_props.html`
  - `full_site/release/tut_traversing_stage.html`
  - `full_site/release/user_guides/schemas/usdMedia/SpatialAudio.html`
- 每页补入 5 条中文二次精修导读和 6 条术语对照：覆盖 `RenderPass` 的 `renderSource`、`passType`、`command` 与 collection-based visibility，`RenderProduct` 的 `productName` 与 `orderedVars` 输出组织，属性教程中的 `Usd.Stage.Open`、`GetPrimAtPath`、`GetAttribute/Get/Set` 访问链，Stage 遍历教程中的 `usdviewApi.stage.Traverse()` 与 composed stage view，以及 `SpatialAudio` 的 `filePath`、`auralMode`、`playbackMode`、`mediaOffset` 与 timeCode 播放时序。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 762、809、764、795、855，中文/英文块分别为 36/25、36/23、37/26、36/25、36/25。
- 本轮分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因：处理对象已经是 `draft_needs_translation`，本轮为二次补强精修，不是从模板草稿晋级。
- 已运行并通过：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1`；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步结果：本轮验证通过后使用 `OpenUSD bilingual round 239: render product tutorials spatial audio pass` 提交并推送。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；`bilingual_draft` 仍不是完整翻译。
- 剩余质量队列中 11 页仍为 `draft_template_only`，基本是 `_source.html`、`search.html` 或目录页；其余 387 页仍需继续逐轮补强。

下一轮目标：
1. 继续最多 5 页。
2. 建议处理：`full_site/release/user_guides/schemas/usdMedia/overview.html`、`full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`、`full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`、`full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`、`full_site/release/wp_render_settings.html`。
3. 后续继续按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `_source.html`、`search.html` 和目录页。
## 第 240 轮：usdMedia Overview/TOC、AssetPreviewsAPI、usdRender TOC 与 Render Settings 提案补强

- 复核当前仓库与远端：上一轮同步提交为 `c030beb`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_109.mjs`，标记 `release-quality-pass-109`。
- 本轮严格只处理 5 页：
  - `full_site/release/user_guides/schemas/usdMedia/overview.html`
  - `full_site/release/user_guides/schemas/usdMedia/usdMedia_toc.html`
  - `full_site/release/user_guides/schemas/usdMedia/AssetPreviewsAPI.html`
  - `full_site/release/user_guides/schemas/usdRender/usdRender_toc.html`
  - `full_site/release/wp_render_settings.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、属性名、代码片段、schema 名称与链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 661、804、845、704、661；中文/英文块分别为 27/20、36/23、36/25、36/23、33/22。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 240: media render toc previews proposal pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdRender/RenderSettings.html`、`full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`、`full_site/release/user_guides/schemas/usdRender/RenderVar.html`、`full_site/release/tut_helloworld.html`、`full_site/release/tut_authoring_variants.html`。
## 第 241 轮：RenderSettings/RenderSettingsBase/RenderVar 与 HelloWorld/Variants 教程补强

- 复核当前仓库与远端：上一轮同步提交为 `ee426b0`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_110.mjs`，标记 `release-quality-pass-110`。
- 本轮严格只处理 5 页：
  - `full_site/release/user_guides/schemas/usdRender/RenderSettings.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderSettingsBase.html`
  - `full_site/release/user_guides/schemas/usdRender/RenderVar.html`
  - `full_site/release/tut_helloworld.html`
  - `full_site/release/tut_authoring_variants.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、属性名、代码片段、schema 名称、教程文件名、token 字面量与链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 846、956、1070、860、940；中文/英文块分别为 36/25、44/32、48/32、37/25、36/25。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 241: render settings hello variants pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/tut_helloworld_redux.html`、`full_site/release/tut_referencing_layers.html`、`full_site/release/tut_simple_shading.html`、`full_site/release/tut_xforms.html`、`full_site/release/user_guides/collections_and_patterns.html`。
## 第 242 轮：HelloWorld Redux、Referencing、Simple Shading、Xforms 与 Collections 补强

- 复核当前仓库与远端：上一轮同步提交为 `44d70a8`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_111.mjs`，标记 `release-quality-pass-111`。
- 本轮严格只处理 5 页：
  - `full_site/release/tut_helloworld_redux.html`
  - `full_site/release/tut_referencing_layers.html`
  - `full_site/release/tut_simple_shading.html`
  - `full_site/release/tut_xforms.html`
  - `full_site/release/user_guides/collections_and_patterns.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、属性名、代码片段、教程文件名、token 字面量、路径表达式与链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 566、541、520、526、549；中文/英文块分别为 24/18、24/18、25/19、26/20、24/18。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 242: redux references shading xforms collections pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/spec.html`、`full_site/release/tut_converting_between_layer_formats.html`、`full_site/release/tut_variants_example_in_katana.html`、`full_site/release/user_guides/namespace_editing.html`、`full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`。
## 第 243 轮：Specifications、Layer Format、Katana Variants、Namespace Editing 与 AccessibilityAPI 补强

- 复核当前仓库与远端：上一轮同步提交为 `8cb9b82`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_112.mjs`，标记 `release-quality-pass-112`。
- 本轮严格只处理 5 页：
  - `full_site/release/spec.html`
  - `full_site/release/tut_converting_between_layer_formats.html`
  - `full_site/release/tut_variants_example_in_katana.html`
  - `full_site/release/user_guides/namespace_editing.html`
  - `full_site/release/user_guides/schemas/usdUI/AccessibilityAPI.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、属性名、代码片段、规范名称、命令参数、token 字面量与链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 567、604、576、541、518；中文/英文块分别为 24/16、26/20、24/18、24/18、24/17。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 243: specs formats katana namespace accessibility pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdUI/Backdrop.html`、`full_site/release/user_guides/schemas/usdUI/AttributeHints.html`、`full_site/release/user_guides/schemas/index.html`、`full_site/release/user_guides/variable_expressions.html`、`full_site/release/user_guides/time_and_animated_values.html`。
## 第 244 轮：usdUI Backdrop/AttributeHints、Schema Domains、Variable Expressions 与 Time Values 补强

- 复核当前仓库与远端：上一轮同步提交为 `16ddbe0`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_113.mjs`，标记 `release-quality-pass-113`。
- 本轮严格只处理 5 页：
  - `full_site/release/user_guides/schemas/usdUI/Backdrop.html`
  - `full_site/release/user_guides/schemas/usdUI/AttributeHints.html`
  - `full_site/release/user_guides/schemas/index.html`
  - `full_site/release/user_guides/variable_expressions.html`
  - `full_site/release/user_guides/time_and_animated_values.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、schema 名称、属性名、代码片段、token 字面量、表达式语法与链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 552、545、582、687、653；中文/英文块分别为 24/17、24/18、24/16、30/19、31/20。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 244: usdUI schema time variables pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdUI/ObjectHints.html`、`full_site/release/user_guides/schemas/usdUI/PrimHints.html`、`full_site/release/user_guides/schemas/usdUI/PropertyHints.html`、`full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`、`full_site/release/wp_stage_variables.html`。
## 第 245 轮：usdUI Object/Prim/Property/SceneGraph hints 与 Stage Variables 补强

- 复核当前仓库与远端：上一轮同步提交为 `7c24d63`，本地 `main` 与 `origin/main` 一致。
- 新增并执行 `scripts/refine_openusd_release_batch_114.mjs`，标记 `release-quality-pass-114`。
- 本轮严格只处理 5 页：
  - `full_site/release/user_guides/schemas/usdUI/ObjectHints.html`
  - `full_site/release/user_guides/schemas/usdUI/PrimHints.html`
  - `full_site/release/user_guides/schemas/usdUI/PropertyHints.html`
  - `full_site/release/user_guides/schemas/usdUI/SceneGraphPrimAPI.html`
  - `full_site/release/wp_stage_variables.html`
- 每页新增 5 条中文导读和 6 条术语对照；API 名称、schema 名称、属性名、代码片段、token 字面量、metadata 字典和链接保持原样。
- 质量回读：5 页均为 `draft_needs_translation`，坏编码 0，非预期官方外跳 0；中文字符分别为 747、744、735、758、736；中文/英文块分别为 36/24、36/25、36/25、36/23、30/17。
- 分级计数保持不变：`draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮页面原本已经属于 `draft_needs_translation`，本轮为二次补强，不是模板草稿晋级。
- 验证：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs`、`validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，总验证 `PASSED`。
- GitHub 同步：使用 `OpenUSD bilingual round 245: usdUI hints stage variables pass` 提交并推送。
- 当前差距：全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`。

## 第 246 轮：NodeGraphNodeAPI 与 usdVol ParticleField 基础 schema 补强

- 基线：本地 `main` 基于上一轮同步提交 `f0792f8`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_115.mjs`，标记 `release-quality-pass-115`；严格只精修 5 页：`full_site/release/user_guides/schemas/usdUI/NodeGraphNodeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 `ui:nodegraph:node:*`、spherical harmonics radiance、position data、kernel basis function、radiance definition data 等边界；API 名、schema 名、属性名、代码片段、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`release-quality-pass-115` 均只出现 1 次；中文字符分别为 987、645、775、766、826；中文/英文块分别为 36/25、30/23、36/25、36/24、36/24。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后准备以 `OpenUSD bilingual round 246: nodegraph particlefield base pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`；之后可继续 `Field3DAsset.html`、`OpenVDBAsset.html`、`VolumeFieldAsset.html` 或转向仍较薄的 API/guide 页面。

## 第 247 轮：usdVol kernel、VolumeFieldBase 与 orientation/scale schema 补强

- 基线：本地 `main` 基于上一轮同步提交 `21b93a2`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_116.mjs`，标记 `release-quality-pass-116`；严格只精修 5 页：`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 constant surflet、Gaussian ellipsoid、`VolumeFieldBase` abstract schema、orientation/scale per-particle attribute 与 prim 级 transform 的边界；API 名、schema 名、属性名、代码片段、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`release-quality-pass-116` 均只出现 1 次；中文字符分别为 767、878、747、641、621；中文/英文块分别为 36/25、36/25、37/24、29/22、29/22。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后准备以 `OpenUSD bilingual round 247: usdvol kernel field scale pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`；之后可继续 `ParticleField3DGaussianSplat.html`、`ParticleField.html`、`Volume.html` 或转向仍较薄的 API/guide 页面。
## 第 248 轮：usdVol Field3D/OpenVDB/VolumeFieldAsset 与 ParticleField position/opacity 补强

- 基线：本地 `main` 基于上一轮同步提交 `d49eb6f`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_117.mjs`，标记 `release-quality-pass-117`；严格只精修 5 页：`full_site/release/user_guides/schemas/usdVol/Field3DAsset.html`、`full_site/release/user_guides/schemas/usdVol/OpenVDBAsset.html`、`full_site/release/user_guides/schemas/usdVol/VolumeFieldAsset.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html`、`full_site/release/user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 Field3D/OpenVDB 外部体积文件定位、`VolumeFieldAsset` file-backed field 边界、`field:*` relationship、per-particle position/opacity 数组对齐、kernel/radiance/visibility 区分；API 名称、schema 名称、属性名、代码片段、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`release-quality-pass-117` 均只出现 1 次；中文字符分别为 903、895、886、680、650，中文/英文块分别为 36/24、36/24、42/31、29/22、29/22。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 248: volume field particle attrs pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 249 轮：usdVol overview、FieldBase、ParticleField 与 Volume 补强

- 基线：本地 `main` 基于上一轮同步提交 `b8a9655`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_118.mjs`，标记 `release-quality-pass-118`；严格只精修 5 页：`full_site/release/user_guides/schemas/usdVol/overview.html`、`full_site/release/user_guides/schemas/usdVol/FieldBase.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html`、`full_site/release/user_guides/schemas/usdVol/ParticleField.html`、`full_site/release/user_guides/schemas/usdVol/Volume.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 usdVol 阅读路线、`Volume` 容器与 `field:*` relationships、`FieldBase` deprecated 迁移边界、`ParticleField3DGaussianSplat` 的 3DGS 数据组合，以及 `ParticleField` concrete base schema 与 `Volume` / `PointInstancer` 的语义区分；API 名称、schema 名称、属性名、代码片段、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`release-quality-pass-118` 均只出现 1 次；中文字符分别为 658、729、690、718、756，中文/英文块分别为 27/20、33/24、42/35、40/33、30/19。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 249: usdvol overview field particle volume pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`、`full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 250 轮：End-to-End、Schema Generation、Houdini、Tutorials 与 usdview Plugin 补强

- 基线：本地 `main` 基于上一轮同步提交 `8dd6170`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_119.mjs`，标记 `release-quality-pass-119`；严格只精修 5 页：`full_site/release/tut_end_to_end.html`、`full_site/release/tut_generating_new_schema.html`、`full_site/release/tut_houdini_example.html`、`full_site/release/tut_usd_tutorials.html`、`full_site/release/tut_usdview_plugin.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖端到端 pipeline 目录和 composed stage 检查、`schema.usda` / `usdGenSchema` 生成契约、Houdini 历史教程和 USD 20.05 plugin removal 边界、教程总入口学习路线，以及 `usdview` plugin discovery、`PluginContainer`、UI action 注册和 API 调用层次。
- 质量回读：5 页均无占位坏词，`release-quality-pass-119` 均只出现 1 次；中文字符分别为 744、651、645、682、623，中文/英文块分别为 28/21、29/22、28/21、27/20、27/19。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 250: release tutorials workflow pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面。
## 第 251 轮：Primvars、Rendering、Color、usdRender Overview 与 usdUI Overview 补强

- 基线：本地 `main` 基于上一轮同步提交 `088a5dd`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_120.mjs`，标记 `release-quality-pass-120`；严格只精修 5 页：`full_site/release/user_guides/primvars.html`、`full_site/release/user_guides/render_user_guide.html`、`full_site/release/user_guides/color_user_guide.html`、`full_site/release/user_guides/schemas/usdRender/overview.html`、`full_site/release/user_guides/schemas/usdUI/overview.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 primvar 插值模式与拓扑映射、可复现渲染配置、颜色空间与 `renderingColorSpace`、`usdRender` 的 `RenderSettings` / `RenderProduct` / `RenderVar` / `RenderPass` 路线，以及 `usdUI` 的 `NodeGraphNodeAPI`、`SceneGraphPrimAPI`、Backdrop 和 UI metadata 边界。
- 质量回读：5 页均无占位坏词，`release-quality-pass-120` 均只出现 1 次；中文字符分别为 646、691、716、643、657，中文/英文块分别为 28/21、28/21、28/21、29/22、27/20。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 251: primvars render color overview pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/plugins_renderman.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/plugins.html`、`full_site/release/dl_downloads.html`、`full_site/release/maxperf.html`；之后可继续 `contributors.html`、`press_opensource_release.html`、`release_schedule.html` 或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面。

## 第 252 轮：RenderMan 插件、开源公告、插件索引、下载资源与性能实践补强

- 基线：本地 `main` 基于上一轮同步提交 `a15ea21`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_121.mjs`，标记 `release-quality-pass-121`；严格只精修 5 页：`full_site/release/plugins_renderman.html`、`full_site/release/press_opensource_announce.html`、`full_site/release/plugins.html`、`full_site/release/dl_downloads.html`、`full_site/release/maxperf.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 `hdPrman` / USD Imaging / Hydra / RenderMan render delegate 构建边界、2015-08-10 开源公告历史语境、第三方插件索引中的 render delegate / file format plugin / schema plugin 区分、下载资源页与二进制分发的边界，以及 `maxperf` 页面中的 layer stack、composition、payload、metrics 与先度量后优化路径。
- 质量回读：5 页均无占位坏词，`release-quality-pass-121` 均只出现 1 次；中文字符分别为 630、644、683、701、686，中文/英文块分别为 30/22、28/21、26/19、32/23、29/22。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 252: renderman plugins downloads performance pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/contributors.html`、`full_site/release/press_opensource_release.html`、`full_site/release/release_schedule.html`、`full_site/release/intro_to_openexec.html`、`full_site/release/usdfaq.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 253 轮：Contributors、Open Source Release、Release Schedule、OpenExec 与 FAQ 补强

- 基线：本地 `main` 基于上一轮同步提交 `0ba67f8`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_122.mjs`，标记 `release-quality-pass-122`；严格只精修 5 页：`full_site/release/contributors.html`、`full_site/release/press_opensource_release.html`、`full_site/release/release_schedule.html`、`full_site/release/intro_to_openexec.html`、`full_site/release/usdfaq.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖历史贡献者名单的 `not current nor complete` 边界、2016-07-26 正式开源发布新闻与 DCC/scalable workflow 语境、dev/full/release candidate 发布线区分、OpenExec 的 Computations / Computation Registration / Invalidation 阅读路径，以及 FAQ 中 file format、scene description、composition arcs、`usdcat` 和 character encoding 的定位。
- 质量回读：5 页均无占位坏词，`release-quality-pass-122` 均只出现 1 次；中文字符分别为 739、684、693、663、711，中文/英文块分别为 26/19、28/21、26/19、40/33、34/27。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 253: contributors release schedule openexec faq pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/wp_usdshade.html`、`full_site/release/contributing_to_usd.html`、`full_site/release/spec_usdz.html`、`full_site/release/ref_performance_metrics.html`、`full_site/release/spec_usdpreviewsurface.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 254 轮：UsdShade、Contributing、USDZ、Performance Metrics 与 UsdPreviewSurface 补强

- 基线：本地 `main` 基于上一轮同步提交 `1142aaa`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_123.mjs`，标记 `release-quality-pass-123`；严格只精修 5 页：`full_site/release/wp_usdshade.html`、`full_site/release/contributing_to_usd.html`、`full_site/release/spec_usdz.html`、`full_site/release/ref_performance_metrics.html`、`full_site/release/spec_usdpreviewsurface.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 `UsdShade` material binding / collection-based assignment / material purpose / material resolve，贡献流程中的 Contributor License Agreement / Pull Request Guidelines / Git Workflow，`.usdz` 的 zip archive / random access / `usdzip` 约束，Performance Metrics 的基准资产与环境边界，以及 `UsdPreviewSurface` 的 Core Nodes、Preview Surface、Texture Reader、Primvar Reader 和 Transform2d。
- 质量回读：5 页均无占位坏词，`release-quality-pass-123` 均只出现 1 次；中文字符分别为 741、740、716、764、748，中文/英文块分别为 31/20、36/29、42/35、39/32、42/35。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 254: usdshade contributing usdz metrics previewsurface pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/wp.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_asset_previews.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 255 轮：Proposals、Schema Versioning、UsdAudio、UsdLux Renderers 与 Asset Previews 补强

- 基线：本地 `main` 基于上一轮同步提交 `c380e8a`，`origin/main` 一致；起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_124.mjs`，标记 `release-quality-pass-124`；严格只精修 5 页：`full_site/release/wp.html`、`full_site/release/wp_schema_versioning.html`、`full_site/release/wp_usdaudio.html`、`full_site/release/wp_usdlux_for_renderers.html`、`full_site/release/wp_asset_previews.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 proposal 目录页的 `OpenUSD-proposals` 迁移边界、Schema Versioning 的 per-schema versioning / `UsdSchemaRegistry` / `apiSchemas` 冲突、UsdAudio 的 `UsdMediaSpatialAudio` / `filePath` / `mediaOffset` / `timeCodesPerSecond`、UsdLux renderers proposal 中的 Sdr definitions / connectable lights / plugin light，以及 Asset Previews 中的 `assetInfo` / `previews` / `thumbnails` / `defaultPrim`。
- 质量回读：5 页均无占位坏词，`release-quality-pass-124` 均只出现 1 次；中文字符分别为 779、742、788、756、781，中文/英文块分别为 30/17、44/33、35/24、44/33、35/24。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：验证通过后使用 `OpenUSD bilingual round 255: proposals schema audio lux previews pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/release/wp_usdlux_for_geometry_lights.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_rigid_body_physics.html`；之后按 `translation_quality_review` 继续选择用户可读价值高的 API/guide/class/group/release 页面，低优先处理 `search.html`、目录页和 `_source.html` 源码页。
## 第 256 轮：Geometry Lights、CoordSys、Ar 2.0、Connectable Nodes 与 Rigid Body Physics

- 基线：本地 `main` 基于上一轮同步提交 `a78908d`，`origin/main` 一致，起始工作区干净。全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_125.mjs`，标记 `release-quality-pass-125`；严格只精修 5 页：`full_site/release/wp_usdlux_for_geometry_lights.html`、`full_site/release/wp_coordsys.html`、`full_site/release/wp_ar2.html`、`full_site/release/wp_connectable_nodes.html`、`full_site/release/wp_rigid_body_physics.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖几何灯光、命名坐标系、资产解析、可连接节点和刚体物理 proposal 的历史背景、schema/API 边界与常见误读风险；API 名称、schema 名称、属性名、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`release-quality-pass-125` 均只出现 1 次；中文字符分别为 849、862、825、856、857，中文/英文块分别为 45/34、40/29、35/24、40/29、53/42。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 256: geometry coords ar connectable physics pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/namespacemembers.html`、`full_site/api/globals_s.html`、`full_site/api/globals_func.html`、`full_site/api/functions_vars_w.html`、`full_site/api/functions_func_n.html`；之后可继续 `functions_func_t.html`、`deprecated.html`、`hd_embree_page_front.html`、`globals_vars.html`、`classes.html`，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 257 轮：Namespace Members、File Members S/Functions 与 Class Members W/N 补强

- 基线：本地 `main` 基于上一轮同步提交 `87cd44e`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_126.mjs`，标记 `api-index-quality-pass-126`；严格只精修 5 页：`full_site/api/namespacemembers.html`、`full_site/api/globals_s.html`、`full_site/api/globals_func.html`、`full_site/api/functions_vars_w.html`、`full_site/api/functions_func_n.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 namespace 成员总索引、File Members S、File Members Functions 根索引、Class Members Variables W 与 Class Members Functions N 的导航语义；API 名称、宏名、函数名、变量名、namespace、class、token 字面量和链接保持原样。
- 质量回读：5 页均无占位坏词，`api-index-quality-pass-126` 均只出现 1 次；中文字符分别为 610、541、571、552、544，中文/英文块分别为 25/17、25/17、25/17、25/16、24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 257: namespace file class index pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/functions_func_t.html`、`full_site/api/deprecated.html`、`full_site/api/hd_embree_page_front.html`、`full_site/api/globals_vars.html`、`full_site/api/classes.html`；之后可继续 `full_site/api/functions_func_t.html` 后续相邻 API 索引/入口页，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 258 轮：Class Members T、Deprecated、HdEmbree、File Variables 与 Class Index 补强

- 基线：本地 `main` 基于上一轮同步提交 `3309057`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_127.mjs`，标记 `api-index-quality-pass-127`；严格只精修 5 页：`full_site/api/functions_func_t.html`、`full_site/api/deprecated.html`、`full_site/api/hd_embree_page_front.html`、`full_site/api/globals_vars.html`、`full_site/api/classes.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 Class Members Functions T 的 Tf/Vdf/UsdUtils/Hydra 索引读法、Deprecated List 的迁移风险边界、HdEmbree 渲染插件链路、File Members Variables 的 token/predicate/sentinel 区分，以及 Class Index 的跨模块类型导航策略；API 名称、类名、函数名、变量名、template 参数、宏名、token 字面量、头文件名和链接保持原样。
- 质量回读：5 页均无占位坏词，`api-index-quality-pass-127` 均只出现 1 次；中文字符分别为 597、602、565、568、562，中文/英文块分别为 24/16、24/17、34/26、29/20、24/16。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 258: class deprecated hdembree variables index pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/_developer__guides.html`、`full_site/api/_usd_skel__intro.html`、`full_site/api/annotated.html`、`full_site/api/ar_page_front.html`、`full_site/api/arch_page_front.html`；之后可继续高价值模块入口或 class 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 259 轮：Developer Guides、UsdSkel Intro、Class List、Ar 与 Arch 补强

- 基线：本地 `main` 基于上一轮同步提交 `f551a29`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_128.mjs`，标记 `api-entry-quality-pass-128`；严格只精修 5 页：`full_site/api/_developer__guides.html`、`full_site/api/_usd_skel__intro.html`、`full_site/api/annotated.html`、`full_site/api/ar_page_front.html`、`full_site/api/arch_page_front.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 Developer Guides 的贡献/测试/Hydra/MaterialX 导航，UsdSkel 的 skeleton、joint、SkelRoot、linear blend skinning 与边界说明，Class List 的 Doxygen 类型导航策略，Ar 的 asset path、resolver context、scoped cache、resolved path，以及 Arch 的平台差异、线程、内存、诊断和符号可见性；API 名称、类名、函数名、宏名、token 字面量、数学符号、template 参数、头文件名和链接保持原样。
- 质量回读：5 页均无占位坏词，`api-entry-quality-pass-128` 均只出现 1 次；中文字符分别为 632、607、616、700、622，中文/英文块分别为 24/16、31/24、24/17、32/25、25/18。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 259: developer skel annotated ar arch pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_sdf_layer.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_sdf_prim_spec.html`、`full_site/api/class_hd_scene_delegate.html`、`full_site/api/class_hd_render_buffer.html`；之后可继续 `UsdStage`、`UsdPrim`、`SdfSpec`、Hydra 或 Gf/Vt 等高价值 class 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 260 轮：SdfLayer、SdfPath、SdfPrimSpec、HdSceneDelegate 与 HdRenderBuffer 补强

- 基线：本地 `main` 基于上一轮同步提交 `9b311a2`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_129.mjs`，标记 `api-class-quality-pass-129`；严格只精修 5 页：`full_site/api/class_sdf_layer.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_sdf_prim_spec.html`、`full_site/api/class_hd_scene_delegate.html`、`full_site/api/class_hd_render_buffer.html`。
- 补强内容：每页新增 5 条中文导读和 6 条术语对照，覆盖 `SdfLayer` 的 authored specs、subLayer stack、metadata 与 muting，`SdfPath` 的路径语法、absolute/relative/property path 与 variant selection，`SdfPrimSpec` 的 authored prim spec、children views 和 `UsdPrim` 边界，`HdSceneDelegate` 的 Hydra 数据交换、dirty bits 与 scene index 关系，以及 `HdRenderBuffer` 的 allocation、DirtyBits、Map/Unmap 和 AOV 缓冲职责；API 名称、类名、函数名、属性名、宏名、token 字面量、数学符号、template 参数和链接保持原样。
- 质量回读：5 页均无占位坏词，`api-class-quality-pass-129` 均只出现 1 次；中文字符分别为 647、657、588、637、634，中文/英文块分别为 52/44、52/44、52/44、52/44、48/40。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象已是 `draft_needs_translation`，属于二次补强，不是模板草稿晋级。
- 验证结果：翻译质量审计、链接路由、full draft preview、报告索引和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 260: sdf hydra core class pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_gf_matrix4f.html`、`full_site/api/class_gf_matrix2f.html`、`full_site/api/class_gf_dual_quatf.html`、`full_site/api/class_gf_range1d.html`、`full_site/api/class_gf_ray.html`；之后可继续 Gf/Vt/Sdf/Hd 的高价值 class 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 261 轮：GfMatrix、GfDualQuat、GfRange 与 GfRay 补强

- 基线：本地 `main` 基于上一轮同步提交 `9376519`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_130.mjs`，本轮标记为 `api-class-quality-pass-130`。
- 严格只精修 5 页：
  - `full_site/api/class_gf_matrix4f.html`
  - `full_site/api/class_gf_matrix2f.html`
  - `full_site/api/class_gf_dual_quatf.html`
  - `full_site/api/class_gf_range1d.html`
  - `full_site/api/class_gf_ray.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `GfMatrix4f` 的 row-major storage、row-vector convention、3D transform、factorization 与 `Transform()` 语义，`GfMatrix2f` 的 determinant、inverse、2D linear transform 与 float precision 边界，`GfDualQuatf` 的 real part / dual part、rigid transform、skinning 与 interpolation 用法，`GfRange1d` 的 interval math、empty range、union/intersection 与 containment 判断，以及 `GfRay` 的 start point、direction、intersection testing 与 transform 语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-130` 均只出现 1 次；中文字符分别为 740、699、669、646、674，中文/英文块分别为 52/44、52/44、52/44、52/44、51/43。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 261: gf matrix range ray pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_gf_vec2i.html`、`full_site/api/class_glf_draw_target.html`、`full_site/api/class_hd_data_source_locator.html`、`full_site/api/class_hd_instance_registry.html`、`full_site/api/class_hd_st_render_pass_state.html`；之后可继续 Gf/Vt/Sdf/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 262 轮：GfVec2i、GlfDrawTarget、HdDataSourceLocator、HdInstanceRegistry 与 HdStRenderPassState 补强

- 基线：本地 `main` 基于上一轮同步提交 `2916b84`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_131.mjs`，本轮标记为 `api-class-quality-pass-131`。
- 严格只精修 5 页：
  - `full_site/api/class_gf_vec2i.html`
  - `full_site/api/class_glf_draw_target.html`
  - `full_site/api/class_hd_data_source_locator.html`
  - `full_site/api/class_hd_instance_registry.html`
  - `full_site/api/class_hd_st_render_pass_state.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `GfVec2i` 的 `int` component、`ScalarType`、分量访问和平方长度语义，`GlfDrawTarget` 的 GL framebuffer、image attachment、MSAA resolve 和 shader sampler 边界，`HdDataSourceLocator` 的 `TfToken` locator、prefix/intersection 和 dirty propagation 用法，`HdInstanceRegistry< VALUE >` 的实例字典、`GetInstance()` / `FindInstance()`、`GarbageCollect()` 与 `Invalidate()` 生命周期，以及 `HdStRenderPassState` 的 GL states、uniforms、shader、camera matrices、AOV resolve 和 graphics pipeline hash；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-131` 均只出现 1 次；中文字符分别为 782、715、668、699、596，中文/英文块分别为 52/44、52/44、52/44、42/34、47/39。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 262: gf glf hd class pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_usd_prim.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_tf_token.html`；之后可继续核心 Usd/UsdGeom/Tf/Hd/Vt class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 263 轮：UsdPrim、UsdGeomMesh、UsdGeomPrimvarsAPI、UsdSchemaRegistry 与 TfToken 补强

- 基线：本地 `main` 基于上一轮同步提交 `8ae9cc7`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_132.mjs`，本轮标记为 `api-class-quality-pass-132`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_prim.html`
  - `full_site/api/class_usd_geom_mesh.html`
  - `full_site/api/class_usd_geom_primvars_a_p_i.html`
  - `full_site/api/class_usd_schema_registry.html`
  - `full_site/api/class_tf_token.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdPrim` 的 composed prim 句柄、properties、metadata、composition arcs、applied schemas 与 traversal，`UsdGeomMesh` 的 points、face-vertices、`faceVertexCounts` / `faceVertexIndices`、subdivision properties 和 crease/corner 语义，`UsdGeomPrimvarsAPI` 的 `CreatePrimvar()`、indexed/non-indexed primvars、interpolation、inheritance 与 `primvars:` namespace，`UsdSchemaRegistry` 的 singleton registry、`schema.usda` / `generatedSchema.usda`、prim definitions、schema family/version 和 auto-apply API schema，以及 `TfToken` 的 registered string、constant-time comparison、hashing、`Find()` 与 empty token；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-132` 均只出现 1 次；中文字符分别为 647、661、602、552、737，中文/英文块均为 52/44。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 263: usd geom schema token class pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_usd_stage_cache.html`、`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_physics_joint.html`；之后可继续 Usd/UsdGeom/UsdShade/UsdPhysics/Vt/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。

## 第 264 轮：UsdStageCache、UsdAttributeLimits、UsdGeomBasisCurves、UsdShadeOutput 与 UsdPhysicsJoint 补强

- 基线：本地 `main` 基于上一轮同步提交 `3bb1b23`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 新增并执行 `scripts/refine_openusd_release_batch_133.mjs`，本轮标记为 `api-class-quality-pass-133`。
- 严格只精修 5 页：
  - `full_site/api/class_usd_stage_cache.html`
  - `full_site/api/class_usd_attribute_limits.html`
  - `full_site/api/class_usd_geom_basis_curves.html`
  - `full_site/api/class_usd_shade_output.html`
  - `full_site/api/class_usd_physics_joint.html`
- 每页新增 5 条中文补强导读和 6 条术语对照；重点覆盖 `UsdStageCache` 的 `UsdStageRefPtr`、`UsdStageCacheContext`、缓存查找、并发安全与 stage lifetime，`UsdAttributeLimits` 的 limits dictionary metadata、minimum/maximum、soft limits/hard limits 与 authored limit 判断，`UsdGeomBasisCurves` 的 batched curves、`curveVertexCounts`、basis、segment indexing、vertex/primvar interpolation 与 tubes/ribbons，`UsdShadeOutput` 的 connectable attribute、`ConnectToSource()`、source 清理、`SourceInfoVector` 与底层 `UsdAttribute` 边界，以及 `UsdPhysicsJoint` 的 rigid body 连接、D6 joint、local frames、break force/torque、collision 和 articulation 排除语义；API 名称、类名、方法名、属性名、数学符号、template 参数、token 字面量和链接保持原样。
- 质量回读：5 页均无 `TODO` / `待翻译` / `机器翻译占位`，`api-class-quality-pass-133` 均只出现 1 次；中文字符分别为 693、622、620、601、612，中文/英文块均为 52/44。
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步：本轮复验通过后使用 `OpenUSD bilingual round 264: stage limits curves shade physics pass` 同步本轮 HTML、脚本、报告和 `work.md`。
- 下一轮最多 5 页目标：`full_site/api/class_usd_validation_error.html`、`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_sdr_shader_property.html`、`full_site/api/class_vt_value_ref.html`、`full_site/api/class_vdf_node.html`；之后可继续 Usd/Imaging/Sdr/Vt/Vdf/Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面，继续低优先处理 `search.html`、目录页和 `_source.html`。
## 第 265 轮：UsdValidationError、UsdImagingDelegate、SdrShaderProperty、VtValueRef 与 VdfNode 补强

- 基线：本地 `main` 基于上一轮同步提交 `de38574`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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

- 基线：本地 `main` 基于上一轮同步提交 `b0949c0`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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

- 基线：本地 `main` 基于上一轮同步提交 `96e0c82`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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

- 基线：本地 `main` 基于上一轮同步提交 `7502d11`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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

- 基线：本地 `main` 基于上一轮同步提交 `23feb19`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 270: esf trace ef tf vdf class pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Sdf/Hd/UsdGeom/UsdShade 核心 class 页面。
2. 建议下一组：`full_site/api/class_sdf_prim_spec.html`、`full_site/api/class_hd_st_render_pass_state.html`、`full_site/api/class_usd_shade_output.html`、`full_site/api/class_usd_geom_primvars_a_p_i.html`、`full_site/api/class_hd_task.html`。
3. 之后可继续 Sdf、Hd、UsdGeom、UsdShade、Usd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 271 轮：SdfPrimSpec、HdStRenderPassState、UsdShadeOutput、UsdGeomPrimvarsAPI 与 HdTask 补强

- 基线：本地 `main` 基于上一轮同步提交 `3c83cd9`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 271: sdf hd usdgeom shade task pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 UsdSchema/Pcp/Hd class 页面。
2. 建议下一组：`full_site/api/class_usd_schema_registry.html`、`full_site/api/class_pcp_arc.html`、`full_site/api/class_hd_st_dispatch_buffer.html`、`full_site/api/class_hd_render_buffer.html`、`full_site/api/class_hd_scene_delegate.html`。
3. 之后可继续 Usd、Sdf、Pcp、Hd、HdSt 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 272 轮：UsdSchemaRegistry、PcpArc、HdStDispatchBuffer、HdRenderBuffer 与 HdSceneDelegate 补强

- 基线：本地 `main` 基于上一轮同步提交 `a33f200`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
- GitHub 同步记录：本轮复验通过后使用 `OpenUSD bilingual round 272: schema pcp hd buffer delegate pass` 同步本轮 HTML、脚本、报告和 `work.md`；如果同步脚本失败，本轮不推送并先修复。

当前差距：
- 全量仍为 8 页 `good_bilingual`、398 页 `bilingual_draft`；其中 387 页为 `draft_needs_translation`、11 页为 `draft_template_only`，`bilingual_draft` 仍不是完整翻译。
- 剩余 `draft_template_only` 11 页基本是 `_source.html` 源码页、`search.html` 或目录页，继续低优先处理。

下一轮目标：

1. 继续最多 5 页，优先处理仍较薄且用户会实际查阅的 Usd/UsdGeom/UsdPhysics/UsdImaging/Sdr class 页面。
2. 建议下一组：`full_site/api/class_usd_attribute_limits.html`、`full_site/api/class_usd_geom_basis_curves.html`、`full_site/api/class_usd_imaging_delegate.html`、`full_site/api/class_usd_physics_joint.html`、`full_site/api/class_sdr_shader_property.html`。
3. 之后可继续 Usd、UsdGeom、UsdPhysics、UsdImaging、Sdr、Hd 的高价值 class 页面，或按 `translation_quality_review` 选择用户可读价值高的 API/guide/class/group/release 页面；继续低优先处理 `search.html`、目录页和 `_source.html` 源码页。

## 第 269 轮：VdfReadWriteAccessor、VdfGrapherOptions、VdfContext、SdfChildrenView 与 TfDenseHashMap 补强

- 基线：本地 `main` 基于上一轮同步提交 `8d35c67`，`origin/main` 一致，起始工作区干净；全量仍为 406 个 HTML 页面，质量计数为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
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
- 分级变化：计数保持不变，仍为 `draft_template_only` 11、`draft_needs_translation` 387、`good_bilingual` 8。原因是本轮对象开始前已属 `draft_needs_translation`，本轮是二次补强精修，不是从模板草稿晋级。
- 验证结果：`audit_openusd_translation_quality.mjs`、`route_openusd_internal_links_local.mjs`、`audit_openusd_full_draft_preview.mjs`、`audit_openusd_report_index.mjs` 和 `validate_openusd_api_repro.ps1` 均已通过；链接路由 `files_changed=0`，398/398 draft 页面可预览，总验证 `PASSED`。
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

- 针对用户反馈“3 天后仍只有 8 页完成、398 页还是草稿”做专项问题盘点，新增：
  - `reports/current_problem_audit.md`
  - `reports/current_problem_audit.json`
- 当前真实状态复核：
  - 全量页面：406
  - `bilingual_complete`：8
  - `bilingual_draft`：398
  - `good_bilingual`：8
  - `draft_needs_translation`：387
  - `draft_template_only`：11
- 明确 P0 根因：过去大量 refinement 只给 `bilingual_draft` 页面增加中文导读和术语对照，没有把页面晋级为 `bilingual_complete` 的机制；而 `audit_openusd_translation_quality.mjs` 只有在页面状态为 `bilingual_complete` 且中文密度达标时才会给 `good_bilingual`。
- 已更新 `openusd` 心跳自动化：每 5 分钟运行，但新目标改为完成度纠偏；自动化必须先读取 `reports/current_problem_audit.md/json`，优先处理 `P0-completion-stalled`、`P0-final-entry-misleading`、`P0-automation-wrong-objective`、`P1-link-placeholders`、`P1-draft-content-thin` 和 `P2-validation-json-bom`，不能再继续旧的 5 页小修刷轮次。
- 更新 `scripts/build_final_html_entry.mjs` 并重建 `openusd_bilingual_final.html`：
  - 首页文案明确说明当前只有 8 页达到完整双语标准。
  - 将 398 页显示为“未完整翻译草稿 / Incomplete drafts”，不再用容易误导的“可检查草稿 / Draft”作为主表达。
  - 将 pending 说明改成“未生成页面 / Not generated”，并在页面清单说明 `bilingual_draft` 只是可本地打开但仍未完整翻译。
- 修复 `scripts/validate_openusd_api_repro.ps1`：
  - `validation_report.json` 现在使用 UTF-8 无 BOM 写出，Node `JSON.parse` 可直接解析。
  - `final_html_entry:shows_all_pages_inventory` 检查改为验证新的诚实入口标准，包括 `Incomplete drafts` 和 `bilingual_draft`。

分级变化：

- 本轮没有让 `good_bilingual` 增加，计数仍为 `good_bilingual` 8、`draft_needs_translation` 387、`draft_template_only` 11。
- 原因：本轮是流程纠偏、入口展示修正、报告编码修复和自动化目标更新；尚未实现 `draft_needs_translation -> bilingual_complete -> good_bilingual` 的晋级机制。

验证结果：

- `audit_openusd_translation_quality.mjs` 通过，确认当前完成度仍为 8/398/11。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，398/398 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过。
- `audit_openusd_report_index.mjs` 通过。
- `reports/validation_report.json` 经 Node 检查：`bom=false`，`parse_ok=true`。

当前差距：

- 398 个 `bilingual_draft` 仍不是完整翻译。
- 多数 draft 页面仍是中文导读和术语对照，不是逐段双语覆盖。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前路由策略，但对用户体验仍是缺口。

下一步目标：

1. 先实现或明确页面晋级规则：什么条件下一个 `draft_needs_translation` 页面可以变成 `bilingual_complete`，并确保审计能让 `good_bilingual` 增加。
2. 选择少量高价值页面做真正 paragraph-level bilingual 完整升级，而不是继续只加导读块。
3. 入口页继续保持诚实显示：`bilingual_draft` 不得被描述成完成翻译。
## 第 303 轮：建立晋级机制并将 SdfLayer 提升为完整双语

已完成：

- 建立 `full_site` 页面从 draft 晋级到 complete 的可复跑机制：
  - 新增 `reports/bilingual_completion_promotions.json`
  - 新增 `reports/bilingual_completion_promotions.md`
  - 更新 `scripts/discover_openusd_all_pages.mjs`，读取 promotion manifest，并将 manifest 中通过检查的页面计为 `bilingual_complete`。
- 修复一个新发现的范围漂移问题：上一轮左侧导航修复后，`site/navtreedata.js` 已被本地化，如果继续用它反推官方全量清单，会把 406 范围错误扩展到 430。现在 `discover_openusd_all_pages.mjs` 改为锚定本地 406 个 HTML 文件：`site/` 的 8 个完成官方页 + `full_site/` 的 398 个页面；官方 toctree/navtree 只作为标题和来源提示。
- 将 `full_site/api/class_sdf_layer.html` 作为第一条晋级样例：
  - 顶部状态从 `bilingual_draft` 改为 `bilingual_complete`。
  - 标题从“类参考草稿”改为“完整双语参考”。
  - 移除 `batch draft page` 和“后续迭代会继续补齐”的通用草稿说明。
  - 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖 `SdfLayer` 作为 scene description container、`SdfData` data model、ephemeral/anonymous layer、`ArAsset`/`ArResolver`、主要 API 分组、authored opinion 与 `UsdStage` composed value 的差异，以及相邻类型关系。
- 更新 `scripts/validate_openusd_api_repro.ps1`：
  - 将 `reports/bilingual_completion_promotions.json/md` 和 `reports/current_problem_audit.json/md` 纳入必需文件。
  - 增加 `completion_promotions:manifest_valid` 检查。
  - `full_site` 文件数验证从“全部都是 draft”改为“draft + promoted complete 均可被 inventory 跟踪”。
  - `all_pages_inventory` 范围检查改为固定 `local_406_release_and_api_html_pages`，防止再次漂移。
- 更新 `reports/current_problem_audit.md/json`：
  - 当前状态改为 `good_bilingual` 9、`bilingual_complete` 9、`bilingual_draft` 397、`draft_needs_translation` 386、`draft_template_only` 11。
  - 记录第一条晋级路径已经成立，但整体仍远未完成。
- 重建 `openusd_bilingual_final.html`：
  - 总入口动态显示“当前有 9 页达到完整双语标准”。
  - 398 改为 397 incomplete drafts。

分级变化：

- `good_bilingual`：8 -> 9
- `bilingual_complete`：8 -> 9
- `bilingual_draft`：398 -> 397
- `draft_needs_translation`：387 -> 386
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=1`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=9`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，397/397 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，验证检查数更新为 288。
- `audit_openusd_report_index.mjs` 通过。

当前差距：

- 仍有 397 个 `bilingual_draft` 页面不是完整翻译。
- 晋级机制已经跑通，但后续每个页面都必须先补足 paragraph-level bilingual coverage，不能直接批量标 complete。
- 大量 406 清单外的 Doxygen 链接仍会进入本地未覆盖占位页，后续还需按高点击路径处理。

下一步目标：

1. 继续选择高价值核心页面做真实晋级，优先考虑 `full_site/api/class_usd_prim.html`、`full_site/api/class_sdf_path.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
2. 每次晋级都必须更新 `reports/bilingual_completion_promotions.json/md`，并证明 `good_bilingual` 增加。
3. 不再接受仅增加导读块但主指标不动的轮次作为完成度进展。

## 第 304 轮：将 UsdPrim 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_prim.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdPrim Class”，并移除通用 draft 说明。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖 `UsdPrim` 的 composed prim 语义、`SdfPrimSpec` 分界、property API、composition arcs、lifetime、traversal、applied API schema、instancing 和 typed schema class 关系。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-304-usd-prim` 晋级记录。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态更新为 10 complete / 396 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在动态显示“当前有 10 页达到完整双语标准”，并显示 396 个 incomplete drafts。

分级变化：

- `good_bilingual`：9 -> 10
- `bilingual_complete`：9 -> 10
- `bilingual_draft`：397 -> 396
- `draft_needs_translation`：386 -> 385
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=2`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=10`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，396/396 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs` 通过。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：

- 仍有 396 个 `bilingual_draft` 页面不是完整翻译，其中 385 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_sdf_path.html`、`full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
2. 每个晋级页面必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。
3. 同步修复用户实际点击中暴露出的高价值占位链接，但不得把占位页策略描述为完成体验。

## 第 305 轮：将 SdfPath 提升为完整双语

已完成：

- 将 `full_site/api/class_sdf_path.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：SdfPath Class”，并移除通用 draft 说明。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖 `SdfPath` 的 path value 语义、`SdfLayer` storage key、scenegraph namespace identity、relative relationship target、absolute/relative path、prim/property/target/variant path syntax、路径构造 helper、thread-safety，以及 `UsdPrim`/`SdfLayer`/`Pcp` composition 调试关系。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-305-sdf-path` 晋级记录。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态更新为 11 complete / 395 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在动态显示 11 complete / 395 incomplete drafts。

分级变化：

- `good_bilingual`：10 -> 11
- `bilingual_complete`：10 -> 11
- `bilingual_draft`：396 -> 395
- `draft_needs_translation`：385 -> 384
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=3`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=11`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，395/395 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs` 通过。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：

- 仍有 395 个 `bilingual_draft` 页面不是完整翻译，其中 384 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_usd_geom_mesh.html`、`full_site/api/class_tf_token.html`。
2. 每个晋级页面必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。
3. 如用户实际点击到高价值占位链接，优先修复该浏览缺口。

## 第 306 轮：将 UsdGeomMesh 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_geom_mesh.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdGeomMesh Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdGeomMesh` 作为 typed schema wrapper 与 `UsdPrim` 的关系。
  - `Define()`、`Get()` 与 stage 上 prim authoring/view 的边界。
  - point-based primitive 语义、`points` 与 face-vertices 的区别。
  - `faceVertexCounts` / `faceVertexIndices` 拓扑编码和常见索引错误。
  - `subdivisionScheme`、`interpolateBoundary`、`faceVaryingLinearInterpolation`、`triangleSubdivisionRule` 等 subdivision 控制属性。
  - `creases`、`corners`、`holes` 与 topology/subdivision 的关系。
  - `UsdGeomPrimvarsAPI`、primvar interpolation 与 face-varying 数据的阅读边界。
  - `Create*Attr()` 方法只负责 author 属性，不自动验证 mesh consistency 的调试含义。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-306-usd-geom-mesh` 晋级记录。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 12 complete / 394 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 12 complete / 394 incomplete drafts。

分级变化：

- `good_bilingual`：11 -> 12
- `bilingual_complete`：11 -> 12
- `bilingual_draft`：395 -> 394
- `draft_needs_translation`：384 -> 383
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=4`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=12`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，394/394 draft 页面可预览。
- `audit_openusd_navigation_coverage.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `audit_openusd_report_index.mjs` 通过。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：

- 仍有 394 个 `bilingual_draft` 页面不是完整翻译，其中 383 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_tf_token.html`。
2. 每个晋级页面必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。
3. 如用户实际点击到高价值占位链接，优先修复该浏览缺口。

## 第 307 轮：将 TfToken 提升为完整双语

已完成：

- 将 `full_site/api/class_tf_token.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：TfToken Class Reference String Utilities”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `TfToken` 作为 registered string handle 的语义。
  - constant-time comparison、assignment、hashing 的适用边界。
  - bounded fixed symbols 的使用前提，以及不应把无限用户输入注册为 token 的原因。
  - token registry / token table 与长期内存压力。
  - `GetString()`、`GetText()`、`data()` 的读取差异。
  - `Find()` 用于查询已存在 token、避免无意创建新注册项的含义。
  - `Hash()`、`HashSet`、`Set` 作为 token key / collection 的用途。
  - empty token 与空字符串、missing attribute、fallback value 的边界。
  - `TfToken` 在 schema token、attribute name、metadata key、primvar name 和 renderer setting name 中的基础作用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-307-tf-token` 晋级记录。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 13 complete / 393 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 13 complete / 393 incomplete drafts。

分级变化：

- `good_bilingual`：12 -> 13
- `bilingual_complete`：12 -> 13
- `bilingual_draft`：394 -> 393
- `draft_needs_translation`：383 -> 382
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=5`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=13`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，393/393 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：

- 仍有 393 个 `bilingual_draft` 页面不是完整翻译，其中 382 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_usd_stage_cache.html` 或 `full_site/api/class_usd_attribute_limits.html` 等仍在 406 清单内的核心 API 页。
2. 每个晋级页面必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。
3. 如用户实际点击到高价值占位链接，优先修复该浏览缺口。

## 第 308 轮：将 UsdStageCache 提升为完整双语

已完成：

- 将 `full_site/api/class_usd_stage_cache.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdStageCache Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdStageCache` 作为 strongly concurrency safe `UsdStageRefPtr` collection 的角色。
  - 与 `UsdStageCacheContext` 和 `UsdStage::Open()` 的典型配合方式。
  - stage cache 与 `SdfLayer` cache、asset resolver cache、composition cache 的边界。
  - construction / destruction 之外操作可并发执行的真实含义，以及 shared stage mutation 仍需应用层管理。
  - `Find()`、`FindOneMatching()`、`FindAllMatching()` 的查找范围和选择策略。
  - `Contains()`、`GetAllStages()`、`GetId()` 的诊断和管理用途。
  - `Erase()`、`EraseAll()`、`Clear()` 与外部 `UsdStageRefPtr` 生命周期的关系。
  - root layer、session layer、`ArResolverContext`、load state 等匹配语义。
  - 与此前晋级页 `UsdPrim`、`SdfLayer`、`SdfPath` 的层级关系。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-308-usd-stage-cache` 晋级记录。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 14 complete / 392 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 14 complete / 392 incomplete drafts。

分级变化：

- `good_bilingual`：13 -> 14
- `bilingual_complete`：13 -> 14
- `bilingual_draft`：393 -> 392
- `draft_needs_translation`：382 -> 381
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406；`promoted_complete_pages=6`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=14`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，392/392 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：

- 仍有 392 个 `bilingual_draft` 页面不是完整翻译，其中 381 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_usd_attribute_limits.html` 或其他 406 清单内核心 API 页。
2. 每个晋级页面必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。
3. 如用户实际点击到高价值占位链接，优先修复该浏览缺口。

## 第 309 轮：将 UsdAttributeLimits 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_attribute_limits.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdAttributeLimits Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdAttributeLimits` 操作的是 `UsdAttribute` 上的 `limits` dictionary metadata，而不是属性当前值本身。
  - sub-dictionary、`UsdLimitsKeys->Minimum`、`UsdLimitsKeys->Maximum` 的存储语义。
  - soft limits / hard limits 的工具约定边界，以及不会自动 clamp USD 值的限制。
  - `GetMinimum()`、`GetMaximum()`、`GetMinimumOr()`、`GetMaximumOr()`、`GetOr()` 的读取与 fallback 语义。
  - `SetMinimum()`、`SetMaximum()` 的 authored metadata 边界。
  - `HasAuthoredMinimum()`、`HasAuthoredMaximum()`、`HasAuthored()` 对 authored opinion 的判断。
  - `ClearMinimum()`、`ClearMaximum()`、`Clear()` 只清除 limit metadata，不删除 attribute 或 time samples。
  - `GetSubDictKey()`、`GetAttribute()`、`IsValid()` 的调试和诊断用途。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-309-usd-attribute-limits`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 15 complete / 391 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 15 complete / 391 incomplete drafts。

分级变化：
- `good_bilingual`：14 -> 15
- `bilingual_complete`：14 -> 15
- `bilingual_draft`：392 -> 391
- `draft_needs_translation`：381 -> 380
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=7`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=15`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，391/391 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 391 个 `bilingual_draft` 页面不是完整翻译，其中 380 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_usd_validation_error.html` 或其他 406 清单内的高价值核心 API 页。
2. 每次只晋级 1 页，必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。

## 第 310 轮：将 UsdValidationError 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_validation_error.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdValidationError Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdValidationError` 作为 validation task 返回的 structured validation result，而不是 `UsdValidationValidator` 本身。
  - validator provenance、`GetValidator()` 与规则来源追溯。
  - `GetName()`、`GetIdentifier()`、`GetType()`、`GetSites()`、`GetMessage()`、`GetData()` 的结构化字段边界。
  - `UsdValidationErrorType` 与 `UsdValidationErrorSites` 对严重性、定位、UI 高亮和批处理过滤的作用。
  - `GetErrorAsString()` 与结构化消费之间的区别。
  - `GetFixers()`、`GetFixerByName()`、`GetFixerByNameAndErrorName()`、`GetFixersByErrorName()`、`GetFixersByKeywords()` 的 fixer 查询语义。
  - `HasNoError()` 的无错误状态边界，以及 `operator==()` / `operator!=()` 的比较、去重和测试用途。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-310-usd-validation-error`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 16 complete / 390 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 16 complete / 390 incomplete drafts。

分级变化：
- `good_bilingual`：15 -> 16
- `bilingual_complete`：15 -> 16
- `bilingual_draft`：391 -> 390
- `draft_needs_translation`：380 -> 379
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=8`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=16`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，390/390 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 390 个 `bilingual_draft` 页面不是完整翻译，其中 379 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，优先考虑 `full_site/api/class_usd_geom_basis_curves.html` 或其他 406 清单内高价值核心 API 页。
2. 每次只晋级 1 页，必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 增加。

## 第 311 轮：将 UsdGeomBasisCurves 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_geom_basis_curves.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdGeomBasisCurves Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdGeomBasisCurves` 是 batched curve representation，不是每条曲线一个 prim。
  - `curveVertexCounts` 描述每条 curve 消耗的点数，以及 points 数组中的连续切片。
  - `type`、`basis`、`wrap` 的关系：linear/cubic、basis 只影响 cubic、wrap 决定端点连接和段数。
  - `ComputeSegmentCounts()`、`ComputeUniformDataSize()`、`ComputeVaryingDataSize()`、`ComputeVertexDataSize()` 的数据尺寸推导用途。
  - segment indexing、vertex interpolation 和 primvar interpolation 是不同索引空间。
  - `CreateBasisAttr()`、`CreateTypeAttr()`、`CreateWrapAttr()`、`CreateCurveVertexCountsAttr()` 只 author 属性，不替代拓扑一致性检查。
  - tubes/ribbons 是渲染解释和材质法线问题，不改变曲线拓扑本身。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-311-usd-geom-basis-curves`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 17 complete / 389 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 17 complete / 389 incomplete drafts。

分级变化：
- `good_bilingual`：16 -> 17
- `bilingual_complete`：16 -> 17
- `bilingual_draft`：390 -> 389
- `draft_needs_translation`：379 -> 378
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=9`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=17`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，389/389 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 389 个 `bilingual_draft` 页面不是完整翻译，其中 378 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_physics_joint.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 312 轮：将 UsdPhysicsJoint 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_physics_joint.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdPhysicsJoint Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdPhysicsJoint` 作为 USD physics schema prim，用于描述 rigid-body joint constraints，而不是直接保证 runtime 求解行为。
  - `CreateBody0Rel()` / `CreateBody1Rel()` author body relationship targets，且 one body + world 的解释依赖物理后端。
  - 默认 D6 joint 的三轴 linear 和三轴 angular degrees of freedom 语义，以及它与派生 joint schema 的边界。
  - `CreateLocalPos0Attr()`、`CreateLocalRot0Attr()`、`CreateLocalPos1Attr()`、`CreateLocalRot1Attr()` 表示两端 body 局部空间中的 joint frame，不是 world transform。
  - `CreateJointEnabledAttr()`、`CreateCollisionEnabledAttr()`、`CreateBreakForceAttr()`、`CreateBreakTorqueAttr()` 的启用、碰撞和断裂阈值边界。
  - `CreateExcludeFromArticulationAttr()` 对 articulation 构建的语义提示，以及 schema 数据与 runtime importer/solver 的职责分层。
  - `Define()`、`Get()` 和 `Create*Attr()` / `Create*Rel()` 的 OpenUSD authoring 边界。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-312-usd-physics-joint`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 18 complete / 388 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 18 complete / 388 incomplete drafts。

分级变化：
- `good_bilingual`：17 -> 18
- `bilingual_complete`：17 -> 18
- `bilingual_draft`：389 -> 388
- `draft_needs_translation`：378 -> 377
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=10`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=18`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，388/388 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 388 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 377 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_usd_imaging_delegate.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 313 轮：将 UsdImagingDelegate 提升为完整双语
已完成：

- 将 `full_site/api/class_usd_imaging_delegate.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：UsdImagingDelegate Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `UsdImagingDelegate` 作为 Hydra (`Hd`) core 与 USD scene graph 之间的 primary translation layer。
  - USD stage/prim/schema/notice 到 Hydra `HdSceneDelegate` / `HdRenderIndex` 的同步和查询边界。
  - `ApplyPendingUpdates()`、dirty bits、population、resync 和 render index 同步流程。
  - `ConvertCachePathToIndexPath()` / `ConvertIndexPathToCachePath()` 对 cache path 与 render index path 的映射。
  - `Get()`、`GetBasisCurvesTopology()`、`GetMeshTopology()`、`GetIndexedPrimvar()` 等 scene delegate 查询不是直接读取原始 `UsdPrim` 字段。
  - purpose/display filtering、visibility、draw mode 与 renderer backend draw state 的边界。
  - time sampling、`UsdTimeCode`、animated values 与同步频率的调试关系。
  - `UsdImagingAdapterRegistry`、`UsdImagingPrimAdapter`、`HdSceneDelegate`、`HdRenderDelegate` 之间的职责分层。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-313-usd-imaging-delegate`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 19 complete / 387 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 19 complete / 387 incomplete drafts。

分级变化：
- `good_bilingual`：18 -> 19
- `bilingual_complete`：18 -> 19
- `bilingual_draft`：388 -> 387
- `draft_needs_translation`：377 -> 376
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=11`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=19`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，387/387 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 387 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 376 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_sdr_shader_property.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 314 轮：将 SdrShaderProperty 提升为完整双语
已完成：

- 将 `full_site/api/class_sdr_shader_property.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：SdrShaderProperty Class”，并移除通用 draft 说明和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `SdrShaderProperty` 作为 `SdrShaderNode` 上 input/output property 的接口描述对象，而不是 shading computation 执行对象。
  - `GetName()`、`GetLabel()`、`GetImplementationName()` 和 `GetInfoString()` 之间的稳定标识、UI 显示和实现侧诊断边界。
  - `GetType()`、`GetTypeAsSdfType()`、`SdrSdfTypeIndicator` 与 `SdfValueTypeName` 的类型转换语义。
  - `GetDefaultValue()` 与 `GetDefaultValueAsSdfType()` 的默认值读取和 USD authored value 边界。
  - `GetArraySize()`、`GetTupleSize()` 对 scalar/tuple/array UI 和 authoring 形状的补充。
  - `GetMetadata()` 的 deprecated `SdrTokenMap` 路径，以及 `GetMetadataObject()` / `SdrShaderPropertyMetadata` 的新路径。
  - `GetHelp()`、`GetHints()`、`GetOptions()`、`GetPage()`、`GetShownIf()` 的 UI/authoring 用途。
  - `CanConnectTo()` 的 input/output、type compatibility、shape、source type、render context 与 renderer 支持边界。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-314-sdr-shader-property`。
- 更新 `reports/current_problem_audit.md/json`，将真实状态同步为 20 complete / 386 draft。
- 重建 `openusd_bilingual_final.html`，总入口现在显示 20 complete / 386 incomplete drafts。

分级变化：
- `good_bilingual`：19 -> 20
- `bilingual_complete`：19 -> 20
- `bilingual_draft`：387 -> 386
- `draft_needs_translation`：376 -> 375
- `draft_template_only`：11 保持不变

验证结果：
- `discover_openusd_all_pages.mjs` 通过，范围稳定为 406，`promoted_complete_pages=12`。
- `audit_openusd_translation_quality.mjs` 通过，确认 `good_bilingual=20`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过，386/386 draft 页面可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过，`required_check_count=288`，`failed_check_count=0`。
- `reports/validation_report.json` 经 Node 解析确认 `bom=false`。

当前差距：
- 仍有 386 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 375 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

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

当前差距：

- 仍有 385 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 374 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

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

当前差距：

- 仍有 384 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 373 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

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

当前差距：

- 仍有 383 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 372 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_read_write_accessor.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 318 轮：将 VdfReadWriteAccessor 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_vdf_read_write_accessor.html`。

已完成：

- 将 `full_site/api/class_vdf_read_write_accessor.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：VdfReadWriteAccessor< T > Class Template / VdfReadWriteAccessor< T > Class Template”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `VdfReadWriteAccessor<T>` 作为对 Vdf output data 的 typed random-access view，而不是拥有数据的容器。
  - 官方 “allows for random access to output data” 的边界：output data 来自 Vdf evaluation/storage，不等同于 authored USD 数据。
  - non-owning accessor 与 `VdfVector`、`VdfOutput`、executor、`VdfContext` 的职责分层。
  - 模板参数 `T` 的静态元素类型含义，以及它不负责语义类型转换的限制。
  - `operator[]()`、`GetSize()`、`IsEmpty()` 在 request mask、evaluation lifetime 和 active output data 范围内的解释。
  - `VdfReadWriteIterator` 与 random-index accessor 的差异。
  - 持久化 accessor、假设边界检查、把 `GetSize()` 当成 authored array size、把 empty accessor 当成固定错误等常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-318-vdf-read-write-accessor`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 24 complete / 382 draft。
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

当前差距：

- 仍有 382 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 371 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_vdf_grapher_options.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 319 轮：将 VdfGrapherOptions 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_vdf_grapher_options.html`。

已完成：

- 将 `full_site/api/class_vdf_grapher_options.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：VdfGrapherOptions Class / VdfGrapherOptions Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `VdfGrapherOptions` 作为 `VdfGrapher` output configuration 对象，而不是 Vdf evaluation 或 graph owner。
  - graph visualization / graph dump 与 runtime computation、evaluation state、profiling evidence 的边界。
  - `NodeFilterCallback`、`NodeStyleCallback`、`NodeLimitVector` 对 node filtering、styling 和 graph scope 的作用。
  - `DisplayStyle`、`GetColor()`、`GetAnnotation()`、`GetDisplayStyle()` 对节点呈现和注释的意义。
  - `AddNodeToGraph()`、`GetNodesToGraph()`、`DebugNameFilter()` 对 visualization scope selection 的解释。
  - `GetDrawMasks()`、`GetDrawAffectsMasks()`、`GetDrawColorizedConnectionsOnly()` 对 dependency mask / affects mask 可视化的解释。
  - `GetPageWidth()`、`GetPageHeight()`、`GetPrintSingleOutputs()`、`GetOmitUnconnectedSpecs()` 对版面与降噪的作用。
  - `VdfGrapher`、`VdfNode`、`VdfConnectionVector`、`VdfObjectPtr`、`TfToken` 等相邻类型边界，以及把 graph dump 误当执行证据的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-319-vdf-grapher-options`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 25 complete / 381 draft。
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

当前差距：

- 仍有 381 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 370 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_esf_property_interface.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 320 轮：将 EsfPropertyInterface 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_esf_property_interface.html`。

已完成：

- 将 `full_site/api/class_esf_property_interface.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：EsfPropertyInterface Class Reference abstract / EsfPropertyInterface Class Reference abstract”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `EsfPropertyInterface` 作为 scene adapter implementation 的 property abstraction，而不是可写 `UsdProperty` wrapper。
  - read-only `UsdProperty`-like interface 与 USD authoring API 的边界。
  - exec network compiler 通过 public methods 读取 property 信息的调用语义。
  - `EsfJournal*` 作为 recompilation condition / dependency tracking 记录器，而不是普通调试日志。
  - `GetBaseName()` 与 `GetNamespace()` 对 USD property name 的拆分语义，以及 property namespace 与 C++ namespace / prim path namespace 的区别。
  - abstract adapter query contract 如何让 compiler 与具体 scene representation 解耦。
  - `EsfObjectInterface`、`EsfPrim`、`EsfAttribute`、`EsfRelationship`、`SdfPath`、`TfToken`、`VtValue`、`TfType`、`UsdProperty` 等相邻类型分层。
  - 把接口误当可写属性包装器、忽略 journaling 或长期保存接口对象的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-320-esf-property-interface`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 26 complete / 380 draft。
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

当前差距：

- 仍有 380 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 369 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_trace_event_data.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 321 轮：将 TraceEventData 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_trace_event_data.html`。

已完成：

- 将 `full_site/api/class_trace_event_data.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：TraceEventData Class / TraceEventData Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `TraceEventData` 作为 `TraceEvent` payload 值容器，而不是完整 trace event、时间戳、线程、调用栈或 scope。
  - 多个 `TraceEventData()` 构造函数重载对应 bool、int、uint、float、string 等 typed payload 来源。
  - `TraceEvent::DataType` 作为类型标签，与 `TraceEventData` 具体值之间的关系。
  - `GetType()` 分派以及 `GetBool()`、`GetInt()`、`GetUInt()`、`GetFloat()`、`GetString()` 的 typed getter 读取规则。
  - `WriteJson()` 与 `JsWriter` 的 trace report 序列化边界。
  - 把 payload data 误当完整 event、把 string 当统一存储格式、未检查类型就调用 getter、把 `WriteJson()` 当 trace 采集 API 等常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-321-trace-event-data`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 27 complete / 379 draft。
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

当前差距：

- 仍有 379 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 368 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_ef___lofted_output_set.html` 或其他 406 清单内高价值核心 API 页。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 322 轮：将 Ef_LoftedOutputSet 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_ef___lofted_output_set.html`。

已完成：

- 将 `full_site/api/class_ef___lofted_output_set.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：Ef_LoftedOutputSet Class / Ef_LoftedOutputSet Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `Ef_LoftedOutputSet` 代表 `EfPageCacheBasedExecutor` 跟踪 lofted outputs 的执行器内部职责。
  - lofted output 是 evaluation 期间从 page cache 取得值的 `VdfOutput`，不是 USD layer output、authored property 或 Hydra render output。
  - `VdfMask` scoped membership 对 `Add()` / `Remove()` 成员维护的影响。
  - `CollectLoftedDependencies()` 如何把 page-cache sourced values 纳入当前 evaluation dependency analysis。
  - `RemoveAllOutputsForNode()` 在节点失效、网络重建和 executor cache refresh 中的清理含义。
  - `Resize()`、`Clear()`、`GetSize()` 暴露的集合生命周期。
  - `VdfNetwork`、`VdfNode`、`VdfOutput`、`VdfMask`、`VdfId` 的相邻类型边界。
  - 把 lofted output 误当场景层输出、忽略 mask 或把本页当 authoring API 的常见误读。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-322-ef-lofted-output-set`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 28 complete / 378 draft。
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

当前差距：

- 仍有 378 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 367 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_tf_py_lock.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 323 轮：将 TfPyLock 提升为完整双语

轮次类型：PromotionRound。目标页固定为 1 个：`full_site/api/class_tf_py_lock.html`。

已完成：

- 将 `full_site/api/class_tf_py_lock.html` 从 `bilingual_draft` 晋级为 `bilingual_complete`。
- 页面标题改为“完整双语参考：TfPyLock Class / TfPyLock Class”，并移除通用 draft 文案和“后续迭代会继续补齐”等草稿标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage` 区块，覆盖：
  - `TfPyLock` 在 Tf Python/C++ 边界管理 Python Global Interpreter Lock 的职责。
  - Python API 不是 thread-safe；从 Python execution context 外访问 Python API 时需要显式管理 GIL 和 Python thread state。
  - `TfPyLock` 不是 USD scene graph、`UsdStage`、`SdfLayer` 或 Hydra 数据结构的通用 mutex。
  - `Acquire()` / `Release()` 的直接 GIL 获取与释放语义，以及必须遵守 `State Valid Transitions`。
  - `BeginAllowThreads()` / `EndAllowThreads()` 对长时间 C++ 工作期间释放并恢复 GIL 的配对模式。
  - `TfPyLock()` / `~TfPyLock()` 的 RAII 生命周期、异常路径和作用域恢复含义。
  - `TfPyEnsureGILUnlockedObj` 作为相关 RAII 协议对象的边界。
  - 把 GIL 误当 USD object lock、跳过配对状态恢复或绕开 RAII 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-323-tf-py-lock`。
- 更新 `reports/current_problem_audit.md/json`，将当前真实状态同步为 29 complete / 377 draft。
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

当前差距：

- 仍有 377 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 366 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一步目标：

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

## 第 332 轮：将 HdStDispatchBuffer 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_st_dispatch_buffer.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdStDispatchBuffer` 作为 indirect dispatch 使用的 unsigned-integer VBO 的职责、`MultiDrawIndirect` / `DispatchComputeIndirect` command layout、在 interleaved uint-array subsets 上创建 `BufferResourceView`、`HdBufferArray` 聚合、`HdResourceBinder` binding method 和 offset、`HdStResourceRegistry` ownership、command stride/count 诊断、`Reallocate()` / `CopyData()` / `GarbageCollect()` 生命周期、resource accessors、`DebugDump()` 用法，以及把 backend dispatch resource 误当 USD authored data 或普通 primvar buffer 的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-332-hd-st-dispatch-buffer`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 38 complete / 368 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 38 complete / 368 incomplete drafts。

分级变化：

- `good_bilingual`：37 -> 38
- `bilingual_complete`：37 -> 38
- `bilingual_draft`：369 -> 368
- `draft_needs_translation`：358 -> 357
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=30`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=38`，目标页 `grade=good_bilingual`，中文正文量 1005。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，368/368 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 332: promote HdStDispatchBuffer complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 368 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 357 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hd_instance_registry.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## 第 333 轮：将 HdInstanceRegistry 提升为完整双语

已完成：

- 轮次类型：PromotionRound；本轮只晋级 1 个页面：`full_site/api/class_hd_instance_registry.html`。
- 将目标页从 `bilingual_draft` 提升为 `bilingual_complete`，标题改为完整双语参考页，并移除通用 draft 标记。
- 新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`，覆盖 `HdInstanceRegistry<VALUE>` 作为 `HdInstance` dictionary container 的职责、`VALUE` 模板参数语义、`InstanceType` 和 `const_iterator` 容器接口、`GetInstance()` 与 `FindInstance()` 查找边界、`Invalidate()` 缓存失效语义、`GarbageCollect()` 生命周期维护、调用方定义 key 的语义、Hydra sync/lifetime 边界，以及把 registry entries 误当 USD prim traversal 或 authoring 操作的常见误用。
- 更新 `reports/bilingual_completion_promotions.json/md`，新增 `round-333-hd-instance-registry`。
- 更新 `reports/current_problem_audit.md/json`，当前真实状态同步为 39 complete / 367 draft。
- 重建 `openusd_bilingual_final.html`，总入口显示 39 complete / 367 incomplete drafts。

分级变化：

- `good_bilingual`：38 -> 39
- `bilingual_complete`：38 -> 39
- `bilingual_draft`：368 -> 367
- `draft_needs_translation`：357 -> 356
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs`：通过，`total_pages=406`，`promoted_complete_pages=31`。
- `audit_openusd_translation_quality.mjs`：通过，`good_bilingual=39`，目标页 `grade=good_bilingual`，中文正文量 1053。
- `route_openusd_internal_links_local.mjs`：通过，`files_changed=1`，同步本轮目标页的本地链接路由。
- `audit_openusd_full_draft_preview.mjs`：通过，367/367 draft 页面可预览。
- `audit_openusd_report_index.mjs`：通过。
- `validate_openusd_api_repro.ps1`：通过，`required_check_count=288`，`failed_check_count=0`。
- Node 直接解析 `reports/validation_report.json`：`bom=false`。

GitHub 同步：

- 本轮验证通过后将使用 `OpenUSD bilingual round 333: promote HdInstanceRegistry complete` 同步本轮 HTML、报告和 `work.md`。

当前差距：

- 仍有 367 个 `bilingual_draft` 页面只是可检查草稿，不是完整翻译，其中 356 个仍为 `draft_needs_translation`。
- 406 清单外的 Doxygen 目标仍会进入本地未覆盖占位页；这是当前 P1 浏览缺口。

下一轮目标：

1. 继续真实晋级，不再刷 count-neutral 导读补强。
2. 下一批优先核心页面：`full_site/api/class_hdx_pick_from_render_buffer_task.html`。
3. 每个晋级页面都必须新增 paragraph-level bilingual coverage，移除 draft 标记，更新 promotion manifest，并证明 `good_bilingual` 再次增加。

## ? 334 ??? HdxPickFromRenderBufferTask ???????

????

- ?????PromotionRound?????? 1 ????`full_site/api/class_hdx_pick_from_render_buffer_task.html`?
- ????? `bilingual_draft` ??? `bilingual_complete`?????????????????? draft ???
- ?? `?????? / Paragraph-Level Bilingual Coverage`??? `HdxPickFromRenderBufferTask` ??? pre-existing ID buffers ?? picking queries ? task?`HdxPickTaskContextParams` ? pick frustum ??? ID buffers ? camera frustum ?????`TaskParams` / `HdxPickFromRenderBufferTaskParams` ???`_Sync()` / `Prepare()` / `Execute()` / `IsConverged()` ?????? `HdSceneDelegate` / `HdRenderIndex` / `HdxTask` / `Hgi` / `HdDriver` ????ID buffer ????viewport/resolution/remap ????ID-buffer generation / frustum remap / query execution / result parsing ?????????????? selection renderer ? USD authoring API ??????
- ?? `reports/bilingual_completion_promotions.json/md`??? `round-334-hdx-pick-from-render-buffer-task`?
- ?? `reports/current_problem_audit.md/json`?????????? 40 complete / 366 draft?
- ?? `openusd_bilingual_final.html`?????? 40 complete / 366 incomplete drafts?

?????

- `good_bilingual`?39 -> 40
- `bilingual_complete`?39 -> 40
- `bilingual_draft`?367 -> 366
- `draft_needs_translation`?356 -> 355
- `draft_template_only`?11 ????

?????

- `discover_openusd_all_pages.mjs`????`total_pages=406`?`promoted_complete_pages=32`?
- `audit_openusd_translation_quality.mjs`????`good_bilingual=40`???? `grade=good_bilingual`?????? 1023?
- `route_openusd_internal_links_local.mjs`????`files_changed=1`????????????????
- `audit_openusd_full_draft_preview.mjs`????366/366 draft ??????
- `audit_openusd_report_index.mjs`????
- `validate_openusd_api_repro.ps1`????`required_check_count=288`?`failed_check_count=0`?
- Node ???? `reports/validation_report.json`?`bom=false`?

GitHub ???

- ?????????? `OpenUSD bilingual round 334: promote HdxPickFromRenderBufferTask complete` ???? HTML???? `work.md`?

?????

- ?? 366 ? `bilingual_draft` ??????????????????? 355 ??? `draft_needs_translation`?
- 406 ???? Doxygen ??????????????????? P1 ?????

??????

1. ?????????? count-neutral ?????
2. ??????????`full_site/api/class_glf_draw_target.html`?
3. ??????????? paragraph-level bilingual coverage??? draft ????? promotion manifest???? `good_bilingual` ?????

## ? 335 ??? GlfDrawTarget ???????

????

- ?????PromotionRound?????? 1 ????`full_site/api/class_glf_draw_target.html`?
- ????? `bilingual_draft` ??? `bilingual_complete`?????????????????? draft ???
- ?? `?????? / Paragraph-Level Bilingual Coverage`??? `GlfDrawTarget` ??? multiple image attachments ? GL render target?custom render pass ?????named `AttachmentsMap` / `AttachmentsContainer` ? `GL_TEXTURE_2D` images ???????? depth component ???`Bind()` / `Unbind()` / `IsBound()` / `IsValid()` framebuffer ?????`GetFramebufferId()` / `GetFramebufferMSId()` / `HasMSAA()` / `Resolve()` ? MSAA ?????size ? matrix ????`CloneAttachments()` / `ClearAttachments()` ?????GL context ? framebuffer-completeness ?????? USD scene graph / Hydra task / `HdRenderBuffer` ?????? stale framebuffer id??? `Resolve()`?? attachment name ?? USD attribute ??????
- ?? `reports/bilingual_completion_promotions.json/md`??? `round-335-glf-draw-target`?
- ?? `reports/current_problem_audit.md/json`?????????? 41 complete / 365 draft?
- ?? `openusd_bilingual_final.html`?????? 41 complete / 365 incomplete drafts?

?????

- `good_bilingual`?40 -> 41
- `bilingual_complete`?40 -> 41
- `bilingual_draft`?366 -> 365
- `draft_needs_translation`?355 -> 354
- `draft_template_only`?11 ????

?????

- `discover_openusd_all_pages.mjs`????`total_pages=406`?`promoted_complete_pages=33`?
- `audit_openusd_translation_quality.mjs`????`good_bilingual=41`???? `grade=good_bilingual`?????? 1125?
- `route_openusd_internal_links_local.mjs`????`files_changed=1`????????????????
- `audit_openusd_full_draft_preview.mjs`????365/365 draft ??????
- `audit_openusd_report_index.mjs`????
- `validate_openusd_api_repro.ps1`????`required_check_count=288`?`failed_check_count=0`?
- Node ???? `reports/validation_report.json`?`bom=false`?

GitHub ???

- ?????????? `OpenUSD bilingual round 335: promote GlfDrawTarget complete` ???? HTML???? `work.md`?

?????

- ?? 365 ? `bilingual_draft` ??????????????????? 354 ??? `draft_needs_translation`?
- 406 ???? Doxygen ??????????????????? P1 ?????

??????

1. ?????????? count-neutral ?????
2. ??????????`full_site/api/class_gf_vec2i.html`?
3. ??????????? paragraph-level bilingual coverage??? draft ????? promotion manifest???? `good_bilingual` ?????

## ? 336 ??? GfVec2i ???????

????

- ?????PromotionRound?????? 1 ????`full_site/api/class_gf_vec2i.html`?
- ????? `bilingual_draft` ??? `bilingual_complete`?????????????????? draft ???
- ?? `?????? / Paragraph-Level Bilingual Coverage`??? `GfVec2i` ?? two-component `int` vector?fast-and-simple value semantics?`ScalarType=int`??? arithmetic operator ???constructor overload ? conversion ???`data()` / `GetArray()` / `operator[]` ?????`GetLengthSq()` ???????`GfDot()` / `GetProjection()` / `GetComplement()` ?????????`Axis()` / `XAxis()` / `YAxis()` ??? helper????????? `GfVec2f` / `GfVec2d` ?????? component meaning?indexing order?squared-length overflow ??????? USD attribute / scene prim ????????
- ?? `reports/bilingual_completion_promotions.json/md`??? `round-336-gf-vec2i`?
- ?? `reports/current_problem_audit.md/json`?????????? 42 complete / 364 draft?
- ?? `openusd_bilingual_final.html`?????? 42 complete / 364 incomplete drafts?

?????

- `good_bilingual`?41 -> 42
- `bilingual_complete`?41 -> 42
- `bilingual_draft`?365 -> 364
- `draft_needs_translation`?354 -> 353
- `draft_template_only`?11 ????

?????

- `discover_openusd_all_pages.mjs`????`total_pages=406`?`promoted_complete_pages=34`?
- `audit_openusd_translation_quality.mjs`????`good_bilingual=42`???? `grade=good_bilingual`?????? 1137?
- `route_openusd_internal_links_local.mjs`????`files_changed=1`????????????????
- `audit_openusd_full_draft_preview.mjs`????364/364 draft ??????
- `audit_openusd_report_index.mjs`????
- `validate_openusd_api_repro.ps1`????`required_check_count=288`?`failed_check_count=0`?
- Node ???? `reports/validation_report.json`?`bom=false`?

GitHub ???

- ?????????? `OpenUSD bilingual round 336: promote GfVec2i complete` ???? HTML???? `work.md`?

?????

- ?? 364 ? `bilingual_draft` ??????????????????? 353 ??? `draft_needs_translation`?
- 406 ???? Doxygen ??????????????????? P1 ?????

??????

1. ?????????? count-neutral ?????
2. ??????????`full_site/api/class_gf_matrix4f.html`?
3. ??????????? paragraph-level bilingual coverage??? draft ????? promotion manifest???? `good_bilingual` ?????

## ? 337 ??? GfMatrix4f ???????

?????PromotionRound???? 1 ???????`full_site/api/class_gf_matrix4f.html`?

????????? `bilingual_draft` ?? `bilingual_complete`?????????? `data-cn-refinement`??? `?????? / Paragraph-Level Bilingual Coverage`?????? `GfMatrix4f` ?? 4x4 `float` matrix ????homogeneous / affine transform ???`ScalarType=float` ?????constructor/layout ? `operator[]` ?????`Transform()` / `TransformDir()` / `TransformAffine()` ? point-versus-direction ???`GetInverse()` / `GetDeterminant()` ? singularity ? tolerance ???matrix multiplication order ? row/column convention?decomposition/factorization ?????? Gf ??????????

?????`reports/bilingual_completion_promotions.json` ?? `round-337-gf-matrix4f`?`audit_openusd_translation_quality.mjs` ?????? `good_bilingual`?

?????

- `good_bilingual`?42 -> 43
- `bilingual_complete`?42 -> 43
- `bilingual_draft`?364 -> 363
- `draft_needs_translation`?353 -> 352
- `draft_template_only`?11 ????

?????

- `discover_openusd_all_pages.mjs` ???`total_pages=406`?`promoted_complete_pages=35`?
- `audit_openusd_translation_quality.mjs` ???`good_bilingual=43`????? `grade=good_bilingual`?
- `route_openusd_internal_links_local.mjs` ???
- `audit_openusd_full_draft_preview.mjs` ???363/363 draft ????
- `audit_openusd_report_index.mjs` ???
- `validate_openusd_api_repro.ps1` ???288 ?????? 0 ??`validation_report.json` ? BOM?

??????? 363 ? `bilingual_draft`??? 352 ??? `draft_needs_translation`?406 ?????????? uncovered ????

?????? PromotionRound????? `full_site/api/class_gf_matrix2f.html`?

## ? 338 ??? GfMatrix2f ???????

?????PromotionRound???? 1 ???????`full_site/api/class_gf_matrix2f.html`?

????????? `bilingual_draft` ?? `bilingual_complete`?????????? `data-cn-refinement`??? `?????? / Paragraph-Level Bilingual Coverage`?????? `GfMatrix2f` ?? 2x2 `float` matrix ????row-major `matrix[i][j]` ???`ScalarType=float` ?????2D linear transform ?????? affine ???constructor/setup ???`GetDeterminant()` / `GetInverse()` ? singularity ? tolerance ???`GetTranspose()` / `GetRow()` / `GetColumn()` / `data()` / `Get()` / `operator[]` ???????? `GfVec2f` ???? matrix multiplication order ? vector convention ???? `GfMatrix2d` / `GfMatrix4f` ?????????

?????`reports/bilingual_completion_promotions.json` ?? `round-338-gf-matrix2f`?`audit_openusd_translation_quality.mjs` ?????? `good_bilingual`?

?????

- `good_bilingual`?43 -> 44
- `bilingual_complete`?43 -> 44
- `bilingual_draft`?363 -> 362
- `draft_needs_translation`?352 -> 351
- `draft_template_only`?11 ????

?????

- `discover_openusd_all_pages.mjs` ???`total_pages=406`?`promoted_complete_pages=36`?
- `audit_openusd_translation_quality.mjs` ???`good_bilingual=44`????? `grade=good_bilingual`?
- `route_openusd_internal_links_local.mjs` ???
- `audit_openusd_full_draft_preview.mjs` ???362/362 draft ????
- `audit_openusd_report_index.mjs` ???
- `validate_openusd_api_repro.ps1` ???288 ?????? 0 ??`validation_report.json` ? BOM?

??????? 362 ? `bilingual_draft`??? 351 ??? `draft_needs_translation`?406 ?????????? uncovered ????

?????? PromotionRound????? `full_site/api/class_sdf_prim_spec.html`?

## 第 339 轮：将 SdfPrimSpec 提升为完整双语

本轮类型：PromotionRound。仅处理 1 个高价值页面：`full_site/api/class_sdf_prim_spec.html`。

本轮动作：将页面从 `bilingual_draft` 改为 `bilingual_complete`，移除通用草稿标记和 `data-cn-refinement`，新增 `逐段双语理解 / Paragraph-Level Bilingual Coverage`。中文层覆盖 `SdfPrimSpec` 作为 `SdfLayer` 中 layer-level authored prim description 的职责、与 composed `UsdPrim` / `UsdStage` 视图的边界、`SdfPath` namespace identity、`New()` 与 `SdfCreatePrimInLayer()` authoring 语义、`specifier` / `typeName` metadata opinions、child/property views、reference / payload / inherit / specialize / variant / list-op 与 ordering metadata 行为，以及区分 authoring、layer strength、composition arcs、variant selection、payload loading 和 stage view 问题的调试路径。

晋级证据：`reports/bilingual_completion_promotions.json` 新增 `round-339-sdf-prim-spec`，`audit_openusd_translation_quality.mjs` 将目标页评为 `good_bilingual`。

分级变化：

- `good_bilingual`：44 -> 45
- `bilingual_complete`：44 -> 45
- `bilingual_draft`：362 -> 361
- `draft_needs_translation`：351 -> 350
- `draft_template_only`：11 保持不变

验证结果：

- `discover_openusd_all_pages.mjs` 通过：`total_pages=406`，`promoted_complete_pages=37`。
- `audit_openusd_translation_quality.mjs` 通过：`good_bilingual=45`，目标页为 `grade=good_bilingual`。
- `route_openusd_internal_links_local.mjs` 通过。
- `audit_openusd_full_draft_preview.mjs` 通过：361/361 draft 可预览。
- `audit_openusd_report_index.mjs` 通过。
- `validate_openusd_api_repro.ps1` 通过：288 项检查，失败 0 项，`validation_report.json` 无 BOM。

剩余缺口：还有 361 页 `bilingual_draft`，其中 350 页仍是 `draft_needs_translation`；406 页范围外链接仍会进入 uncovered 占位页。

下一步：继续 PromotionRound，优先目标 `full_site/api/class_usd_geom_primvars_a_p_i.html`。