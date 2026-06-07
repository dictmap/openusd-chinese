# OpenUSD 完整双语晋级清单

生成日期：2026-06-07

这份清单只记录从 `full_site/` 草稿队列晋级为 `bilingual_complete` 的页面。它不是简单改统计数字，而是供 `scripts/discover_openusd_all_pages.mjs` 复跑时读取的晋级来源。

## 晋级规则

- 页面必须移除通用 draft 文案，例如 `batch draft page` 和 “后续迭代会继续补齐”。
- 页面必须显示 `bilingual_complete`。
- 页面必须提供面向正文的 paragraph-level bilingual coverage，而不只是中文导读和术语表。
- API 名称、类名、方法名、代码、命令、属性名、模板参数、宏名、枚举名、枚举值、变量名、类型名、头文件名、token 字面量和链接保持原样。
- `audit_openusd_translation_quality.mjs` 必须能将页面评为 `good_bilingual`。

## 当前晋级页面

| ID | 页面 | 本地输出 | 原因 |
| --- | --- | --- | --- |
| round-303-sdf-layer | `https://openusd.org/release/api/class_sdf_layer.html` | `full_site/api/class_sdf_layer.html` | 核心 Sdf class 页面，已增加逐段双语理解区，移除草稿标记，并保留 API/源码术语。 |
| round-304-usd-prim | `https://openusd.org/release/api/class_usd_prim.html` | `full_site/api/class_usd_prim.html` | 核心 Usd class 页面，已覆盖 composed prim、property/composition API、lifetime、traversal、applied API schema 与 instancing 语义。 |
| round-305-sdf-path | `https://openusd.org/release/api/class_sdf_path.html` | `full_site/api/class_sdf_path.html` | 核心 Sdf path value 页面，已覆盖 storage key、namespace identity、absolute/relative path、路径语法、构造 helper、thread-safety 与 composition 调试语义。 |
| round-306-usd-geom-mesh | `https://openusd.org/release/api/class_usd_geom_mesh.html` | `full_site/api/class_usd_geom_mesh.html` | 核心 UsdGeom mesh schema 页面，已覆盖 point-based primitive、拓扑数组、subdivision 属性、creases/corners/holes、interpolation、primvars 与 schema wrapper 语义。 |
| round-307-tf-token | `https://openusd.org/release/api/class_tf_token.html` | `full_site/api/class_tf_token.html` | 核心 Tf token 页面，已覆盖 registered string handle、有界固定符号集合、token registry、无创建查询、hash 容器、empty token 约定与 schema 名称使用语义。 |
| round-308-usd-stage-cache | `https://openusd.org/release/api/class_usd_stage_cache.html` | `full_site/api/class_usd_stage_cache.html` | 核心 Usd stage cache 页面，已覆盖强并发安全 stage 共享、`UsdStageCacheContext` / `UsdStage::Open` 用法、匹配查询 API、erase/clear 生命周期边界、resolver context 匹配和 cache 层级边界。 |
| round-309-usd-attribute-limits | `https://openusd.org/release/api/class_usd_attribute_limits.html` | `full_site/api/class_usd_attribute_limits.html` | 核心 Usd attribute limits 页面，已覆盖 limits dictionary metadata、sub-dictionary、minimum/maximum、soft/hard limits、authored/fallback 语义、清除操作与 UsdAttribute 元数据边界。 |
| round-310-usd-validation-error | `https://openusd.org/release/api/class_usd_validation_error.html` | `full_site/api/class_usd_validation_error.html` | 核心 Usd validation error 页面，已覆盖 structured validation result、validator provenance、identifier/name/type/sites/message/data 字段、fixer 查询、无错误状态、比较语义与常见报告误读。 |
| round-311-usd-geom-basis-curves | `https://openusd.org/release/api/class_usd_geom_basis_curves.html` | `full_site/api/class_usd_geom_basis_curves.html` | 核心 UsdGeom basis curves 页面，已覆盖 batched curve representation、`curveVertexCounts` 数据布局、type/basis/wrap、segment indexing、interpolation 数据尺寸、`Create*Attr()` authoring 边界与 tubes/ribbons 渲染解释。 |
| round-312-usd-physics-joint | `https://openusd.org/release/api/class_usd_physics_joint.html` | `full_site/api/class_usd_physics_joint.html` | 核心 UsdPhysics joint 页面，已覆盖 rigid-body 约束、body relationship targets、local joint frames、默认 D6 语义、enabled/collision/break 属性、articulation exclusion、Create-vs-Get authoring 边界与 runtime solver 职责。 |
| round-313-usd-imaging-delegate | `https://openusd.org/release/api/class_usd_imaging_delegate.html` | `full_site/api/class_usd_imaging_delegate.html` | 核心 UsdImaging delegate 页面，已覆盖 USD scene graph 到 Hydra 的翻译层、`HdSceneDelegate` / `HdRenderIndex` 查询边界、`ApplyPendingUpdates()` 同步、cache/index path conversion、topology/primvar 查询、purpose filtering、time sampling、adapter 边界与 imaging 调试误读。 |
| round-314-sdr-shader-property | `https://openusd.org/release/api/class_sdr_shader_property.html` | `full_site/api/class_sdr_shader_property.html` | 核心 Sdr shader property 页面，已覆盖 shader-node property 接口、input/output name/type、default value 与 Sdf type conversion、array/tuple shape、UI hints/options/page/shown-if、deprecated `SdrTokenMap` metadata 与 `SdrShaderPropertyMetadata`、`CanConnectTo()` 连接兼容性以及与 `SdrShaderNode` / `SdfValueTypeName` 的边界。 |
| round-315-vt-value-ref | `https://openusd.org/release/api/class_vt_value_ref.html` | `full_site/api/class_vt_value_ref.html` | 核心 Vt value-reference 页面，已覆盖 non-owning type-erased value view、`VtValue` 互操作、生命周期约束、typed access 与 runtime type diagnostics、array element/type shape、hash/compose/transform 能力检查、实现 helper，以及临时对象和长期保存的常见误用。 |
| round-316-vdf-node | `https://openusd.org/release/api/class_vdf_node.html` | `full_site/api/class_vdf_node.html` | 核心 Vdf graph-node 页面，已覆盖 `VdfNetwork` 节点拓扑、input/output specs、named ports、dependency masks 与 required input requests、`VdfNode` 和 `VdfContext` 边界、protected graph-maintenance hooks、连接变化诊断、network identity、OpenExec 分层，以及 value 与 graph structure 的常见误读。 |
| round-317-vdf-context | `https://openusd.org/release/api/class_vdf_context.html` | `full_site/api/class_vdf_context.html` | 核心 Vdf computation-context 页面，已覆盖 callback parameter bundle、`VdfContext` 与 `VdfNode` 边界、input value availability、demand-driven output requests、`SetOutput()` / `SetEmptyOutput()` / `SetOutputToReferenceInput()` 行为、带 node debug name 的诊断、`VdfEvaluationState` 与 accessor 分层，以及 persistent state 和 active callback context 的常见误读。 |
| round-318-vdf-read-write-accessor | `https://openusd.org/release/api/class_vdf_read_write_accessor.html` | `full_site/api/class_vdf_read_write_accessor.html` | 核心 Vdf read/write accessor 模板页，已覆盖 output data random access、non-owning accessor 边界、静态元素类型 `T`、`operator[]()` 访问、`GetSize()` 与 `IsEmpty()` 解释、request/mask/evaluation lifetime 约束、`VdfContext` / `VdfOutput` / executor 分层、iterator 与 accessor 访问模式差异，以及持久化和类型语义转换误用。 |
| round-319-vdf-grapher-options | `https://openusd.org/release/api/class_vdf_grapher_options.html` | `full_site/api/class_vdf_grapher_options.html` | 核心 Vdf grapher-options 页面，已覆盖 `VdfGrapher` output configuration、graph visualization 与 evaluation 边界、`NodeFilterCallback` / `NodeStyleCallback` / `NodeLimitVector` 职责、`DisplayStyle` 与 color/annotation 样式、node selection 与 `DebugNameFilter` 范围、mask / affects-mask 可视化、page layout 与 noise-control options、`VdfGrapher` / `VdfNode` / `VdfConnectionVector` / `TfToken` 相邻类型边界，以及把 graph dump 误当执行或 profiling 证据的常见误用。 |
| round-320-esf-property-interface | `https://openusd.org/release/api/class_esf_property_interface.html` | `full_site/api/class_esf_property_interface.html` | 核心 Esf property-interface 页面，已覆盖 scene adapter property abstraction、read-only `UsdProperty`-like 边界、exec network compiler 调用、`EsfJournal` recompilation-condition tracking、`GetBaseName()` 与 `GetNamespace()` 命名语义、abstract adapter query contract、`EsfObjectInterface` / `EsfPrim` / `EsfAttribute` / `EsfRelationship` / `SdfPath` / `TfToken` / `VtValue` / `TfType` / `UsdProperty` 分层，以及把它误当可写 property wrapper 或忽略 journaling 的常见误用。 |
