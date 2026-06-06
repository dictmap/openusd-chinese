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
