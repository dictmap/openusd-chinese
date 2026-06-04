# 工作记录

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
