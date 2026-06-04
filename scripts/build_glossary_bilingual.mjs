import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const sourcePath = path.join(root, "source", "openusd_release_glossary_source.html");
const siteDir = path.join(root, "site");
const outputPath = path.join(siteDir, "glossary.html");

const terms = new Map([
  ["USD Terms and Concepts", "USD 术语和概念"],
  ["Terms and Concepts", "术语和概念"],
  ["Active / Inactive", "激活 / 非激活"],
  ["Animated Value", "动画值"],
  ["Animation Block", "动画阻断"],
  ["API Schema", "API Schema"],
  ["Assembly", "装配"],
  ["Asset", "资产"],
  ["AssetInfo", "资产信息"],
  ["Asset Resolution", "资产解析"],
  ["Attribute", "属性"],
  ["Attribute Block", "属性阻断"],
  ["Attribute Connection", "属性连接"],
  ["Attribute Variability", "属性可变性"],
  ["Change Processing", "变更处理"],
  ["Class", "Class"],
  ["Clips", "片段"],
  ["Collection", "集合"],
  ["Component", "组件"],
  ["Composition", "组合"],
  ["Composition Arcs", "组合弧"],
  ["Computation Input Parameters", "计算输入参数"],
  ["Computation", "计算"],
  ["Connection", "连接"],
  ["Crate File Format", "Crate 文件格式"],
  ["Def", "Def"],
  ["Default Value", "默认值"],
  ["Direct Opinion", "直接意见"],
  ["EditTarget", "编辑目标"],
  ["Fallback", "回退值"],
  ["Flatten", "扁平化"],
  ["Gprim", "几何 Prim"],
  ["Group", "组"],
  ["Hydra", "Hydra"],
  ["Index", "索引"],
  ["Inherits", "继承"],
  ["Instanceable", "可实例化"],
  ["Instancing", "实例化"],
  ["Interpolation", "插值"],
  ["IsA Schema", "IsA Schema"],
  ["Kind", "Kind"],
  ["Layer", "层"],
  ["Layer Offset", "层偏移"],
  ["LayerStack", "层栈"],
  ["List Editing", "列表编辑"],
  ["LIVERPS Strength Ordering", "LIVERPS 强度排序"],
  ["Load / Unload", "加载 / 卸载"],
  ["Localize", "本地化"],
  ["Metadata", "元数据"],
  ["Model", "模型"],
  ["Model Hierarchy", "模型层级"],
  ["Namespace", "命名空间"],
  ["OpenExec", "OpenExec"],
  ["Opinions", "意见"],
  ["Over", "Over"],
  ["Path", "路径"],
  ["Path Translation", "路径转换"],
  ["Payload", "Payload"],
  ["Prim", "Prim"],
  ["Prim Definition", "Prim 定义"],
  ["PrimSpec", "PrimSpec"],
  ["PrimStack", "PrimStack"],
  ["Primvar", "Primvar"],
  ["Property", "Property"],
  ["PropertySpec", "PropertySpec"],
  ["PropertyStack", "PropertyStack"],
  ["Proxy", "代理"],
  ["PseudoRoot", "伪根"],
  ["Purpose", "用途"],
  ["References", "引用"],
  ["Relationship", "关系"],
  ["Relocates", "重定位"],
  ["Root LayerStack", "根层栈"],
  ["Schema", "Schema"],
  ["Session Layer", "会话层"],
  ["Specializes", "特化"],
  ["Specifier", "Specifier"],
  ["Spline", "样条"],
  ["Stage", "Stage"],
  ["Stage Traversal", "Stage 遍历"],
  ["Subcomponent", "子组件"],
  ["SubLayers", "子层"],
  ["TimeCode", "时间码"],
  ["TimeCodes Scaled to Real Time", "映射到真实时间的时间码"],
  ["TimeSample", "时间采样"],
  ["Typed Schema", "Typed Schema"],
  ["User Properties", "用户属性"],
  ["Validation", "验证"],
  ["Value Clips", "值片段"],
  ["Value Resolution", "值解析"],
  ["Variability", "可变性"],
  ["Variant", "变体"],
  ["VariantSet", "变体集"],
  ["Visibility", "可见性"],
  ["Previous", "上一页"],
  ["Next", "下一页"],
  ["Introduction to OpenExec", "OpenExec 介绍"],
  ["USD Tutorials", "USD 教程"],
  ["Learn", "学习"],
  ["User Guides", "用户指南"],
  ["Reference", "参考"],
  ["API Documentation", "API 文档"],
  ["Toolset", "工具集"],
  ["Specifications", "规范"],
  ["Proposals", "提案"],
]);

const summaryCards = [
  ["Stage", "由一个或多个 Layer 组合出的场景访问入口，通常是读取、遍历和编辑 USD 的主要对象。", "Scene access object composed from one or more layers."],
  ["Prim", "场景命名空间中的层级节点，是组织对象、属性和关系的基本单位。", "Hierarchical scene namespace object."],
  ["Layer", "保存场景描述意见的文件或数据容器，可参与组合形成最终场景。", "Container of authored scene description opinions."],
  ["Composition", "把多个 Layer、引用、Payload、Variant 等意见解析成最终场景的过程。", "Process that resolves authored opinions into the final scene."],
  ["Composition Arcs", "连接不同场景描述位置的组合关系，如 References、Payload、Inherits、Specializes 和 Variants。", "Relationships such as references, payloads, inherits, specializes, and variants."],
  ["References", "把外部或同文件中的资产内容引入当前 prim 的组合弧。", "Composition arc that brings referenced scene description into a prim."],
  ["Payload", "可按需加载的引用式组合弧，用于大场景的延迟加载和规模控制。", "Loadable composition arc for scalable deferred loading."],
  ["Variant", "Variant 是一个命名变体，通常由 VariantSet 承载和选择。", "A single named variation selected through a VariantSet."],
  ["VariantSet", "承载一组变体并决定选中变体的组合机制。", "Composition mechanism that holds and selects variants."],
  ["Attribute", "Prim 上承载有类型数据的 Property，可包含默认值或 timeSamples。", "Typed data-bearing property on a prim."],
  ["Relationship", "Prim 上指向其他对象或属性的 Property，用于表达连接和依赖。", "Property that targets other objects or properties."],
  ["Metadata", "描述对象行为或附加信息的键值数据，参与组合和值解析。", "Key-value data describing behavior or extra information."],
  ["Value Resolution", "在组合结果中为属性或元数据求得最终值的规则和过程。", "Rules used to compute final property or metadata values."],
  ["Schema", "定义某类 prim、属性、API 或行为的类型系统约定。", "Type-system contract for prims, properties, APIs, or behavior."],
  ["Primvar", "几何 prim 上用于携带可插值、可索引用户数据的属性族。", "Interpolated or indexed user data on geometric prims."],
  ["TimeCode", "USD 的时间坐标单位，用于访问随时间变化的值。", "USD time coordinate for time-varying values."],
  ["TimeSample", "属性在某个时间坐标上直接编写的取值。", "Authored value for an attribute at a time coordinate."],
  ["Visibility", "UsdGeomImageable 的内建属性，用于控制对象是否可见或可渲染。", "Builtin imageable attribute controlling visibility."],
];

const definitionBriefs = [
  {
    id: "active-inactive",
    term: "Active / Inactive",
    zh: "Active 表示 prim 会参与 Stage 组合、遍历和常规使用；Inactive 表示该 prim 及其命名空间子树在组合结果中被停用，常用于临时裁剪场景内容。",
    en: "Active prims participate in the composed stage. Inactive prims and their namespace descendants are excluded from normal composition and traversal.",
  },
  {
    id: "api-schema",
    term: "API Schema",
    zh: "API Schema 是可应用到 prim 上的行为或属性集合，用来给已有 typed schema 增加能力，而不改变该 prim 的基础类型名称。",
    en: "An API Schema adds behavior or properties to a prim without replacing the prim's underlying typed schema.",
  },
  {
    id: "asset",
    term: "Asset",
    zh: "Asset 通常指可以被引用、解析、打包或发布的一组 USD 场景描述及其依赖资源；在工作流中它更像可复用交付单元，而不只是单个文件。",
    en: "An Asset is a reusable unit of USD scene description and dependencies that can be resolved, referenced, packaged, or published.",
  },
  {
    id: "usdglossary-assetresolution",
    term: "Asset Resolution",
    zh: "Asset Resolution 是把资产路径解析为可读取资源的机制，通常由 Ar resolver 结合当前上下文、搜索规则或自定义解析器完成。",
    en: "Asset Resolution maps asset paths to readable resources, usually through Ar resolver behavior and the active resolution context.",
  },
  {
    id: "attribute",
    term: "Attribute",
    zh: "Attribute 是 prim 上保存有类型值的 Property，可有默认值、timeSamples、连接或值阻断；多数几何、材质和动画数据都通过 Attribute 表达。",
    en: "An Attribute is a typed value-bearing property on a prim. It may hold defaults, time samples, connections, or value blocks.",
  },
  {
    id: "composition",
    term: "Composition",
    zh: "Composition 是把 Layer、Reference、Payload、Variant、Inherits 等多处意见按强度规则合成为最终 Stage 的过程。",
    en: "Composition combines opinions from layers and arcs such as references, payloads, variants, and inherits into the final stage.",
  },
  {
    id: "usdglossary-compositionarcs",
    term: "Composition Arcs",
    zh: "Composition Arcs 是跨位置引入或组织场景描述的关系类型，例如 References、Payloads、Inherits、Specializes 和 Variant selections。",
    en: "Composition Arcs are relationships that bring scene description from other locations, including references, payloads, inherits, specializes, and variants.",
  },
  {
    id: "usdglossary-layer",
    term: "Layer",
    zh: "Layer 是 USD 意见的承载容器，可以来自文件或内存数据；多个 Layer 通过 LayerStack 和组合规则形成 Stage 的最终内容。",
    en: "A Layer stores authored USD opinions. Layers can come from files or memory and are composed through layer stacks into a stage.",
  },
  {
    id: "usdglossary-payload",
    term: "Payload",
    zh: "Payload 是可加载或卸载的组合弧，适合把大型资产内容延迟载入，在保持场景结构可见的同时控制内存和处理成本。",
    en: "A Payload is a loadable composition arc used to defer heavy asset contents while keeping the larger scene structure manageable.",
  },
  {
    id: "usdglossary-prim",
    term: "Prim",
    zh: "Prim 是 Stage 命名空间中的基本对象节点，可拥有类型、metadata、属性、关系和子 prim，是 USD 场景结构的核心单位。",
    en: "A Prim is the core object node in a stage namespace. It can have type, metadata, properties, relationships, and child prims.",
  },
  {
    id: "usdglossary-stage",
    term: "Stage",
    zh: "Stage 是已组合场景的访问入口，提供打开、遍历、编辑和查询 prim 的上下文；它不是单个 Layer，而是组合后的场景视图。",
    en: "A Stage is the access object for a composed scene. It provides context for opening, traversing, editing, and querying prims.",
  },
  {
    id: "usdglossary-valueresolution",
    term: "Value Resolution",
    zh: "Value Resolution 是在组合后的意见中决定属性或 metadata 最终值的过程，会考虑强度顺序、默认值、timeSamples、block 和 interpolation 等规则。",
    en: "Value Resolution determines the final value for attributes or metadata from composed opinions, strength ordering, defaults, time samples, blocks, and interpolation.",
  },
  {
    id: "usdglossary-variant",
    term: "Variant",
    zh: "Variant 是 VariantSet 中的一个命名选择分支，用来表达同一资产或 prim 的不同建模、材质、LOD 或配置状态。",
    en: "A Variant is one named branch inside a VariantSet, often used for modeling, material, LOD, or configuration choices.",
  },
  {
    id: "usdglossary-variantset",
    term: "VariantSet",
    zh: "VariantSet 是管理一组 Variant 的组合机制；选中的 Variant 会向目标 prim 注入对应意见，未选中的分支不参与最终结果。",
    en: "A VariantSet manages a collection of variants. The selected variant contributes opinions to the target prim while unselected branches stay inactive.",
  },
  {
    id: "usdglossary-kind",
    term: "Kind",
    zh: "Kind 是描述模型语义层级的 metadata，常用于区分 component、group、assembly 等资产组织角色，帮助工具理解模型边界和层级意图。",
    en: "Kind is metadata that describes model hierarchy semantics, such as component, group, or assembly roles.",
  },
  {
    id: "list-editing",
    term: "List Editing",
    zh: "List Editing 是 USD 对列表型意见的组合机制，可通过 prepend、append、delete、reorder 等操作在多层意见之间稳定合成最终列表。",
    en: "List Editing composes list-valued opinions through operations such as prepend, append, delete, and reorder.",
  },
  {
    id: "load-unload",
    term: "Load / Unload",
    zh: "Load / Unload 控制 Payload 是否被纳入 Stage，常用于大场景的交互式裁剪、性能控制和按需展开资产内容。",
    en: "Load and unload control whether payload contents are included in a stage, which is useful for scale and performance.",
  },
  {
    id: "usdglossary-metadata",
    term: "Metadata",
    zh: "Metadata 是附加在 prim、property 或 layer 上的键值信息，用来表达类型、kind、active、documentation 等不会作为普通属性值处理的描述数据。",
    en: "Metadata is key-value information on prims, properties, or layers that describes behavior or descriptive state outside ordinary attribute values.",
  },
  {
    id: "usdglossary-model",
    term: "Model",
    zh: "Model 是具备资产组织意义的 prim 子树，通常通过 Kind 和模型层级约定表达可复用、可发布或可引用的场景单元。",
    en: "A Model is a prim subtree with asset-organization meaning, often identified through kind and model hierarchy conventions.",
  },
  {
    id: "usdglossary-namespace",
    term: "Namespace",
    zh: "Namespace 是 Stage 中 prim 和 property 路径构成的层级命名空间，决定对象如何被定位、遍历、引用和重命名。",
    en: "Namespace is the hierarchical path space for prims and properties in a stage, used for addressing and organization.",
  },
  {
    id: "usdglossary-primvar",
    term: "Primvar",
    zh: "Primvar 是几何 prim 上承载可插值、可索引用户数据的属性族，常用于 UV、颜色、材质选择和逐元素渲染数据。",
    en: "A Primvar is interpolated or indexed user data on geometric prims, commonly used for UVs, colors, and render data.",
  },
  {
    id: "usdglossary-property",
    term: "Property",
    zh: "Property 是 prim 上的命名成员，主要分为 Attribute 和 Relationship；它把数据值、连接、目标关系等内容挂接到场景对象上。",
    en: "A Property is a named member of a prim, mainly either an Attribute or a Relationship.",
  },
  {
    id: "usdglossary-references",
    term: "References",
    zh: "References 是把其他 layer 或同一 layer 中的场景描述引入当前 prim 的组合弧，常用于资产复用、装配和分层发布。",
    en: "References bring scene description from another layer or location into a prim, enabling asset reuse and assembly.",
  },
  {
    id: "usdglossary-relationship",
    term: "Relationship",
    zh: "Relationship 是指向其他 prim 或 property 路径的 Property，用于表达绑定、目标、依赖、集合成员或连接关系。",
    en: "A Relationship is a property that targets other prims or properties, expressing bindings, targets, dependencies, or membership.",
  },
  {
    id: "usdglossary-schema",
    term: "Schema",
    zh: "Schema 是 USD 类型系统约定，用来定义 prim 类型、内建属性、API 能力和行为规则；它让工具能按统一接口理解场景数据。",
    en: "A Schema is a USD type-system contract that defines prim types, built-in properties, API capabilities, and behavior.",
  },
  {
    id: "usdglossary-timecode",
    term: "TimeCode",
    zh: "TimeCode 是 USD 用来索引随时间变化值的时间坐标，和真实秒数之间的映射由 Stage 或 Layer 的时间配置决定。",
    en: "A TimeCode is the USD time coordinate used to address time-varying values.",
  },
  {
    id: "usdglossary-timesample",
    term: "TimeSample",
    zh: "TimeSample 是属性在某个 TimeCode 上直接写入的采样值；Value Resolution 会结合采样、默认值和插值规则决定查询结果。",
    en: "A TimeSample is an authored attribute value at a particular TimeCode.",
  },
  {
    id: "usdglossary-visibility",
    term: "Visibility",
    zh: "Visibility 是 UsdGeomImageable 上控制可见性的属性，常用于在继承语义下隐藏或显示场景对象。",
    en: "Visibility is an imageable property used to control whether scene objects are visible under inherited visibility semantics.",
  },
  {
    id: "attribute-connection",
    term: "Attribute Connection",
    zh: "Attribute Connection 是让一个 attribute 指向另一个属性或数据源的连接关系，常用于材质网络、计算图或需要延迟求值的数据流。",
    en: "An Attribute Connection lets an attribute point to another property or data source, often for shading networks, computation graphs, or deferred data flow.",
  },
  {
    id: "attribute-variability",
    term: "Attribute Variability",
    zh: "Attribute Variability 描述属性值是否随时间变化，帮助工具理解该属性更像 uniform 静态数据还是 varying 动态数据。",
    en: "Attribute Variability describes whether an attribute value can vary over time, helping tools distinguish static uniform data from varying data.",
  },
  {
    id: "clips",
    term: "Clips",
    zh: "Clips 是把时间采样数据拆分到外部文件序列并在 Stage 中按元数据聚合的机制，适合大规模动画或仿真缓存。",
    en: "Clips store time-sampled data across external file sequences and aggregate them through metadata, which is useful for large animation or simulation caches.",
  },
  {
    id: "collection",
    term: "Collection",
    zh: "Collection 是表达一组 prim 或路径成员的机制，可用于材质绑定、灯光链接、渲染过滤和批量操作。",
    en: "A Collection represents a set of prims or path members and is used for material binding, light linking, render filtering, and batch operations.",
  },
  {
    id: "flatten",
    term: "Flatten",
    zh: "Flatten 是把组合后的结果写成更直接的场景描述，通常会烘焙组合弧效果，便于交换、调试或生成独立交付文件。",
    en: "Flatten writes composed results into more direct scene description, usually baking composition effects for interchange, debugging, or standalone delivery.",
  },
  {
    id: "usdglossary-inherits",
    term: "Inherits",
    zh: "Inherits 是一种组合弧，用于让 prim 继承 class 或其他源位置的意见，适合共享默认属性和批量覆盖。",
    en: "Inherits is a composition arc that lets a prim inherit opinions from a class or source location, useful for shared defaults and broad overrides.",
  },
  {
    id: "usdglossary-instancing",
    term: "Instancing",
    zh: "Instancing 让多个 prim 共享同一原型场景描述，从而减少内存和处理开销；差异化编辑通常需要理解 instanceable 与 prototype 的边界。",
    en: "Instancing lets multiple prims share prototype scene description to reduce memory and processing cost.",
  },
  {
    id: "interpolation",
    term: "Interpolation",
    zh: "Interpolation 描述 primvar 或属性值如何映射到几何元素，例如 constant、uniform、vertex、varying 和 faceVarying 等模式。",
    en: "Interpolation describes how primvar or attribute values map to geometric elements, such as constant, uniform, vertex, varying, and faceVarying.",
  },
  {
    id: "layer-offset",
    term: "Layer Offset",
    zh: "Layer Offset 在组合引用或子层时调整时间坐标，可用来移动或缩放动画时间范围。",
    en: "Layer Offset adjusts time coordinates across references or sublayers, allowing animation timing to be shifted or scaled.",
  },
  {
    id: "localize",
    term: "Localize",
    zh: "Localize 是把资产及其依赖收集到本地可携带结构中的工作流步骤，便于离线查看、归档或跨机器交付。",
    en: "Localize collects an asset and its dependencies into a local portable structure for offline viewing, archiving, or transfer.",
  },
  {
    id: "usdglossary-purpose",
    term: "Purpose",
    zh: "Purpose 是 UsdGeomImageable 的分类属性，用于区分 default、render、proxy、guide 等成像或交互用途。",
    en: "Purpose is an imageable classification used to distinguish default, render, proxy, guide, and related imaging roles.",
  },
  {
    id: "usdglossary-specializes",
    term: "Specializes",
    zh: "Specializes 是一种组合弧，用于表达更专门化的 prim 对基础定义的弱继承式覆盖，常用于 schema 或资产变体化设计。",
    en: "Specializes is a composition arc for specialized prims to inherit and override weaker base definitions.",
  },
  {
    id: "def",
    term: "Def",
    zh: "Def 是一种 specifier，表示该 prim 在当前层中被定义为实际场景对象，通常会参与 Stage 的默认遍历和组合结果。",
    en: "Def is a specifier that defines a prim as an actual scene object in the current layer.",
  },
  {
    id: "usdglossary-defaultvalue",
    term: "Default Value",
    zh: "Default Value 是属性在没有查询到对应 timeSample 时使用的基础值，也是非动画属性最常见的取值位置。",
    en: "A Default Value is the base attribute value used when no matching time sample is queried.",
  },
  {
    id: "direct-opinion",
    term: "Direct Opinion",
    zh: "Direct Opinion 是直接写在某个 spec 或 property 上的意见，与通过继承、引用或其他组合弧间接带来的意见相对。",
    en: "A Direct Opinion is authored directly on a spec or property, rather than arriving through another composition arc.",
  },
  {
    id: "fallback",
    term: "Fallback",
    zh: "Fallback 是 schema 或 API 在没有作者意见时提供的默认行为或默认值，用于保证对象有可预测的基础语义。",
    en: "A Fallback is schema- or API-provided behavior or value used when no authored opinion is present.",
  },
  {
    id: "usdglossary-layerstack",
    term: "LayerStack",
    zh: "LayerStack 是由 root layer、subLayers 和 session layer 等组成的有序层集合，决定一组局部意见的强度关系。",
    en: "A LayerStack is an ordered set of layers, including root, sublayers, and session layers, that determines local opinion strength.",
  },
  {
    id: "opinions",
    term: "Opinions",
    zh: "Opinions 是 USD 中被编写出来的场景描述断言，例如属性值、metadata、关系目标或组合弧；Composition 和 Value Resolution 会解析这些意见。",
    en: "Opinions are authored scene description assertions such as values, metadata, targets, or composition arcs.",
  },
  {
    id: "relocates",
    term: "Relocates",
    zh: "Relocates 是用于表达命名空间路径重定位的组合机制，常见于资产重组、路径迁移和保持外部引用稳定的工作流。",
    en: "Relocates express namespace path remapping for asset restructuring, path migration, and reference stability workflows.",
  },
  {
    id: "usdglossary-sessionlayer",
    term: "Session Layer",
    zh: "Session Layer 是附加在 Stage 顶部的临时层，常用于交互式选择、临时 variant、可见性或调试意见，而不修改资产源文件。",
    en: "A Session Layer is a temporary top layer on a stage, often used for interactive selections, variants, visibility, or debugging opinions.",
  },
  {
    id: "spline",
    term: "Spline",
    zh: "Spline 是表达随时间连续变化值的一种曲线表示，可用于比离散 timeSamples 更紧凑地描述动画或变化趋势。",
    en: "A Spline is a curve representation for time-varying values, useful for compactly describing animation or changing trends.",
  },
  {
    id: "usdglossary-sublayers",
    term: "SubLayers",
    zh: "SubLayers 是把多个 layer 按顺序叠加到一个 LayerStack 中的机制，常用于分层发布、强弱覆盖和工作流拆分。",
    en: "SubLayers stack multiple layers into a layer stack for layered publishing, overrides, and workflow separation.",
  },
  {
    id: "usdglossary-valueclips",
    term: "Value Clips",
    zh: "Value Clips 是通过 clip metadata 把属性时间采样映射到外部文件序列的机制，适合大型动画、仿真或缓存数据。",
    en: "Value Clips map attribute time samples to external file sequences through clip metadata, suitable for large animation, simulation, or cache data.",
  },
  {
    id: "usdglossary-rootlayerstack",
    term: "Root LayerStack",
    zh: "Root LayerStack 是 Stage 的主层栈，通常从 root layer 开始，并汇集其 subLayers 与 session layer 形成主要组合上下文。",
    en: "The Root LayerStack is the primary layer stack of a stage, starting from the root layer and including its sublayers and session layer.",
  },
  {
    id: "animation-block",
    term: "Animation Block",
    zh: "Animation Block 是在某个较强意见中阻断较弱 timeSamples 的机制，用来明确表示这里不继承下层动画采样。",
    en: "An Animation Block blocks weaker time samples from contributing at that site, explicitly stopping inherited animation samples.",
  },
  {
    id: "change-processing",
    term: "Change Processing",
    zh: "Change Processing 是 USD 或 Hydra 对场景输入变化作出增量响应的机制，避免每次编辑都重新构建完整场景状态。",
    en: "Change Processing incrementally responds to authored or time-varying scene changes instead of rebuilding the full scene state.",
  },
  {
    id: "class",
    term: "Class",
    zh: "Class 是一种 specifier，常用于保存可被 inherit 或 specialize 的共享意见；它表达编辑模板意图，而不是普通可遍历实例对象。",
    en: "Class is a specifier often used to hold shared opinions for inherits or specializes, expressing template intent rather than a normal traversable object.",
  },
  {
    id: "usdglossary-group",
    term: "Group",
    zh: "Group 是一种 model kind，用来把多个模型组织成有语义的集合，常作为 assembly 内部的结构胶合层。",
    en: "A Group is a model kind used to organize multiple models into a meaningful collection, often as structural grouping inside an assembly.",
  },
  {
    id: "hydra",
    term: "Hydra",
    zh: "Hydra 是 USD 的渲染架构，面向大规模场景的数据同步、change processing 和多种渲染后端接入。",
    en: "Hydra is USD's rendering architecture for large-scene data synchronization, change processing, and multiple render backends.",
  },
  {
    id: "liverps-strength-ordering",
    term: "LIVERPS Strength Ordering",
    zh: "LIVERPS Strength Ordering 是描述 USD 组合弧强度顺序的助记规则，用来判断 local、inherits、variants、references、payloads、specializes 等意见谁更强。",
    en: "LIVERPS Strength Ordering is a mnemonic for the relative strength of local, inherits, variants, references, payloads, and specializes opinions.",
  },
  {
    id: "usdglossary-over",
    term: "Over",
    zh: "Over 是一种 specifier，表示当前层只对已有 prim 编写覆盖意见，本身不负责定义一个新的完整场景对象。",
    en: "Over is a specifier that authors override opinions for an existing prim without defining a complete new scene object by itself.",
  },
  {
    id: "usdglossary-pathtranslation",
    term: "Path Translation",
    zh: "Path Translation 是在 EditTarget 或组合上下文之间转换路径的过程，确保作者看到的组合路径能写回正确的目标层位置。",
    en: "Path Translation converts paths across edit targets or composition contexts so composed-stage edits author to the intended target site.",
  },
  {
    id: "primstack",
    term: "PrimStack",
    zh: "PrimStack 是构成某个 prim 结果的一组 prim specs，按强度排序后可用于调试该 prim 的意见来源和覆盖关系。",
    en: "A PrimStack is the ordered set of prim specs contributing to a prim, useful for debugging opinion sources and overrides.",
  },
  {
    id: "usdglossary-pseudoroot",
    term: "PseudoRoot",
    zh: "PseudoRoot 是 Stage 命名空间的虚拟根节点，用来承载顶层 prim 的共同父级，但它不是由普通 layer spec 定义的资产对象。",
    en: "PseudoRoot is the virtual root of a stage namespace and parent of top-level prims, not an ordinary asset object defined by a layer spec.",
  },
  {
    id: "usdglossary-specifier",
    term: "Specifier",
    zh: "Specifier 描述 prim spec 的声明意图，例如 def、over 或 class，影响该意见是定义对象、覆盖对象还是作为可继承模板。",
    en: "Specifier describes a prim spec's declaration intent, such as def, over, or class.",
  },
  {
    id: "edittarget",
    term: "EditTarget",
    zh: "EditTarget 指定对组合 Stage 进行 authoring 时意见应写入哪一个实际层或组合节点，是把编辑意图落到正确源位置的关键上下文。",
    en: "An EditTarget specifies where authored opinions should be written when editing a composed stage.",
  },
  {
    id: "animated-value",
    term: "Animated Value",
    zh: "Animated Value 是通过 timeSamples 或 spline 等时间相关意见表达的属性值；查询时会结合 TimeCode、默认值和插值规则求得结果。",
    en: "An Animated Value is expressed through time-related opinions such as time samples or splines and is resolved for a requested TimeCode.",
  },
  {
    id: "usdglossary-assetinfo",
    term: "AssetInfo",
    zh: "AssetInfo 是一组资产相关 metadata，用来记录 identifier、name、version 等可被工具用于资产识别和发布追踪的信息。",
    en: "AssetInfo is asset-related metadata used by tools to identify, publish, and track assets.",
  },
  {
    id: "assembly",
    term: "Assembly",
    zh: "Assembly 是一种较高层级的 model kind，通常表示由多个 component 或 group 组成的可发布资产集合。",
    en: "An Assembly is a higher-level model kind, commonly representing a publishable collection made from components or groups.",
  },
  {
    id: "attribute-block",
    term: "Attribute Block",
    zh: "Attribute Block 是在较强意见中阻断较弱属性值的 authoring 方式，可用于明确清除默认值、动画值或连接带来的贡献。",
    en: "An Attribute Block authors a stronger opinion that blocks weaker attribute values, defaults, animation, or connections.",
  },
  {
    id: "component",
    term: "Component",
    zh: "Component 是 model kind 中常见的叶级资产单元，通常表示可独立发布、引用和实例化的具体对象。",
    en: "A Component is a common leaf-level model kind for an independently publishable, referenceable, or instanceable asset unit.",
  },
  {
    id: "computation-input-parameters",
    term: "Computation Input Parameters",
    zh: "Computation Input Parameters 是驱动计算或生成结果的输入数据；在 USD 语境中常用于说明计算属性依赖哪些 authored values 或上下文。",
    en: "Computation Input Parameters are inputs that drive computed results, often describing which authored values or context a computation depends on.",
  },
  {
    id: "computation",
    term: "Computation",
    zh: "Computation 指由输入参数和上下文推导结果的过程；USD 文档中常用它区分直接 authored value 与运行时或工具侧求得的值。",
    en: "Computation is the process of deriving a result from input parameters and context, distinct from a directly authored value.",
  },
  {
    id: "usdglossary-connection",
    term: "Connection",
    zh: "Connection 是属性之间的数据依赖或目标关系，常见于 shading network 和计算图，用来表达一个属性从另一个属性取值。",
    en: "A Connection represents a data dependency or target relationship between properties, common in shading networks and computation graphs.",
  },
  {
    id: "crate-file-format",
    term: "Crate File Format",
    zh: "Crate File Format 是二进制 USD 文件格式，通常使用 `.usd` 扩展名，面向快速读取、紧凑存储和大规模场景交换。",
    en: "Crate File Format is the binary USD file format, commonly stored as `.usd`, designed for compact storage and efficient reading.",
  },
  {
    id: "usdglossary-gprim",
    term: "Gprim",
    zh: "Gprim 是几何 prim 的基础类别，承载可渲染几何常用属性，并与 UsdGeomImageable、Boundable 等 schema 语义相关。",
    en: "A Gprim is a geometric prim category that carries common renderable geometry properties and related schema semantics.",
  },
  {
    id: "usdglossary-index",
    term: "Index",
    zh: "Index 是 USD/Pcp 用来描述 prim 组合来源和依赖结构的数据表示，支持 value resolution、primStack 调试和 EditTarget 构建。",
    en: "An Index describes a prim's composition sources and dependency structure, supporting value resolution, primStack debugging, and edit targets.",
  },
  {
    id: "instanceable",
    term: "Instanceable",
    zh: "Instanceable 是 prim 上的 metadata，用来声明该 prim 可参与实例化共享；它帮助 USD 决定是否构建共享 prototype。",
    en: "Instanceable is prim metadata that declares whether a prim can participate in shared instancing and prototype construction.",
  },
  {
    id: "isa-schema",
    term: "IsA Schema",
    zh: "IsA Schema 是为 prim 指定基础类型的 schema；它决定该 prim 的类型名、内建属性和工具可按类型理解的行为。",
    en: "An IsA Schema assigns a prim's base type, built-in properties, and type-driven behavior.",
  },
  {
    id: "usdglossary-modelhierarchy",
    term: "Model Hierarchy",
    zh: "Model Hierarchy 是由 model kind 组织出的资产语义层级，用来表达 component、group、assembly 等模型之间的包含关系。",
    en: "Model Hierarchy is the semantic asset hierarchy formed by model kinds such as component, group, and assembly.",
  },
  {
    id: "openexec",
    term: "OpenExec",
    zh: "OpenExec 是 OpenUSD 中面向执行与计算图的体系，文档中通常用于说明数据流、计算和场景求值相关概念。",
    en: "OpenExec is the OpenUSD execution and computation-graph system used to describe data flow, computation, and scene evaluation concepts.",
  },
  {
    id: "usdglossary-path",
    term: "Path",
    zh: "Path 是 USD 中定位 prim 或 property 的命名空间地址；SdfPath 形式的路径是引用、关系目标和编辑定位的基础。",
    en: "A Path is the namespace address for a prim or property. SdfPath values are the basis for references, relationship targets, and edits.",
  },
  {
    id: "usdglossary-primdefinition",
    term: "Prim Definition",
    zh: "Prim Definition 是由 schema 注册信息给出的 prim 类型定义，描述该类型应具备的内建属性、metadata 和 API 能力。",
    en: "A Prim Definition is the registered schema definition for a prim type, including built-in properties, metadata, and API capabilities.",
  },
  {
    id: "usdglossary-primspec",
    term: "PrimSpec",
    zh: "PrimSpec 是某个 layer 中未组合的 prim 描述单元；多个 PrimSpec 会经 composition 合成为 Stage 上的最终 Prim。",
    en: "A PrimSpec is an uncomposed prim description in a layer. Multiple prim specs compose into the final prim on a stage.",
  },
  {
    id: "propertyspec",
    term: "PropertySpec",
    zh: "PropertySpec 是某个 layer 中未组合的 property 描述，承载 attribute 默认值、timeSamples、relationship targets 或其他属性意见。",
    en: "A PropertySpec is an uncomposed property description in a layer, holding attribute values, time samples, relationship targets, or other opinions.",
  },
  {
    id: "propertystack",
    term: "PropertyStack",
    zh: "PropertyStack 是参与某个 property 最终结果的一组 PropertySpec，按强度排序后可用于调试值解析和覆盖来源。",
    en: "A PropertyStack is the ordered set of PropertySpecs contributing to a property, useful for debugging value resolution and overrides.",
  },
  {
    id: "proxy",
    term: "Proxy",
    zh: "Proxy 是 purpose 的一种用途分类，通常表示用于交互、预览或简化显示的代理几何，而不是最终渲染表示。",
    en: "Proxy is a purpose classification for interactive, preview, or simplified geometry rather than final render representation.",
  },
  {
    id: "stage-traversal",
    term: "Stage Traversal",
    zh: "Stage Traversal 是按规则遍历 Stage 命名空间中 prim 的过程；active、loaded、defined 和 predicate 会影响遍历结果。",
    en: "Stage Traversal walks prims in a stage namespace according to rules and predicates such as active, loaded, and defined state.",
  },
  {
    id: "usdglossary-subcomponent",
    term: "Subcomponent",
    zh: "Subcomponent 是 component 内部的模型组织单元，通常帮助描述资产内部结构，但不作为独立发布的顶层资产边界。",
    en: "A Subcomponent is an internal model organization unit inside a component, usually not a separately published asset boundary.",
  },
  {
    id: "timecodes-scaled-to-real-time",
    term: "TimeCodes Scaled to Real Time",
    zh: "TimeCodes Scaled to Real Time 描述 USD timeCodes 如何通过 timeCodesPerSecond 等设置映射到真实秒数，影响播放和数据交换时的时间理解。",
    en: "TimeCodes Scaled to Real Time describes how USD timeCodes map to seconds through settings such as timeCodesPerSecond.",
  },
  {
    id: "typed-schema",
    term: "Typed Schema",
    zh: "Typed Schema 是通过 prim 的 typeName 绑定到对象上的 schema 类型，提供明确的内建属性、类型接口和工具识别语义。",
    en: "A Typed Schema is bound through a prim's typeName and provides built-in properties, typed interfaces, and tool-recognizable semantics.",
  },
  {
    id: "user-properties",
    term: "User Properties",
    zh: "User Properties 是作者或工具自定义在 prim 上的属性，通常不属于内建 schema 字段，用于携带工作流或应用特定数据。",
    en: "User Properties are custom authored properties on prims, usually outside built-in schema fields and used for workflow- or application-specific data.",
  },
  {
    id: "validation",
    term: "Validation",
    zh: "Validation 是检查 USD 场景描述是否满足 schema、资产约定或管线规则的过程，可用于发布前质量控制和错误定位。",
    en: "Validation checks USD scene description against schemas, asset conventions, or pipeline rules for quality control and diagnostics.",
  },
  {
    id: "usdglossary-variability",
    term: "Variability",
    zh: "Variability 描述属性或数据是否允许随时间变化，帮助工具理解某个值应被视为静态、均一还是时间采样数据。",
    en: "Variability describes whether a property or datum may vary over time, helping tools treat values as static, uniform, or time-sampled.",
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function htmlPair(en) {
  const zh = terms.get(en);
  if (!zh) return en;
  return `<span class="cn-term">${zh}</span><span class="en-term">${en}</span>`;
}

function titlePair(en) {
  const zh = terms.get(en);
  return zh ? `${zh} / ${en}` : en;
}

function applyTextPairs(html) {
  const sortedTerms = [...terms.keys()].sort((a, b) => b.length - a.length);
  for (const en of sortedTerms) {
    const pattern = new RegExp(`>(\\s*)${escapeRegex(en)}(\\s*)<`, "g");
    html = html.replace(pattern, (_match, before, after) => `>${before}${htmlPair(en)}${after}<`);
  }

  html = html.replace(/title="([^"]+)"/g, (match, title) => {
    if (!terms.has(title)) return match;
    return `title="${titlePair(title)}"`;
  });

  return html;
}

function glossarySummaryBlock() {
  const cards = summaryCards.map(([term, zh, en]) => {
    return `<div class="cn-glossary-card"><div class="term">${htmlPair(term)}</div><p class="zh">${zh}</p><p class="en">${en}</p></div>`;
  }).join("\n");

  return `<div class="cn-glossary-summary">
<h2><span class="cn-term">核心术语速览</span><span class="en-term">Core Term Quick Map</span></h2>
<p class="zh">本页把 glossary 做成术语对照入口：保留官方英文定义全文，并为目录、标题、高频核心概念和 ${definitionBriefs.length} 个高频定义小节增加中文解释层。完整定义逐条翻译将在后续小批量迭代中继续补齐。</p>
<p class="en">This page turns the glossary into a bilingual terminology entry point: official English definitions are retained, and Chinese labels or briefs are added to the contents, headings, high-frequency concepts, and ${definitionBriefs.length} selected high-frequency definition sections. Full definition-by-definition translation will continue in later focused passes.</p>
<div class="cn-glossary-grid">
${cards}
</div>
</div>`;
}

function definitionBriefBlock(term, zh, en) {
  return `<div class="cn-definition-brief" data-term="${term}">
<p class="zh"><strong>中文解释：</strong>${zh}</p>
<p class="en"><strong>English guide:</strong> ${en}</p>
</div>`;
}

function addDefinitionBriefs(html) {
  let inserted = 0;
  for (const { id, term, zh, en } of definitionBriefs) {
    const pattern = new RegExp(`(<section id="${escapeRegex(id)}">[\\s\\S]*?</h2>)`);
    if (!pattern.test(html)) {
      console.warn(`Skipped missing glossary section: ${id}`);
      continue;
    }
    html = html.replace(pattern, `$1\n${definitionBriefBlock(term, zh, en)}`);
    inserted += 1;
  }
  return { html, inserted };
}

let html = await readFile(sourcePath, "utf8");
html = `<!-- Generated adjacent bilingual terminology entry from source/openusd_release_glossary_source.html. Source URL: https://openusd.org/release/glossary.html -->\n${html}`;
html = html.replace('<html class="writer-html5" lang="en" data-content_root="./">', '<html class="writer-html5" lang="zh-CN" data-content_root="./">');
html = html.replace(
  "<title>USD Terms and Concepts &mdash; Universal Scene Description 26.05 documentation</title>",
  "<title>USD 术语和概念 / USD Terms and Concepts &mdash; Universal Scene Description 26.05 documentation</title>",
);
html = html.replace(
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />',
  '<link rel="stylesheet" type="text/css" href="_static/css/pxr_custom.css?v=f3eac5de" />\n      <link rel="stylesheet" type="text/css" href="openusd_release_cn.css" />',
);
html = html.replace('placeholder="Search docs" aria-label="Search docs"', 'placeholder="搜索文档 / Search docs" aria-label="Search docs"');
html = html.replaceAll("https://openusd.org/images/USDIcon.ico", "images/USDIcon.ico");
html = html.replaceAll("https://openusd.org/images/USDLogoUnsized.svg", "images/USDLogoUnsized.svg");
html = html.replaceAll("https://openusd.org/images/piper-banner.jpg", "images/piper-banner.jpg");
html = html.replaceAll('href="index.html"', 'href="release_index.html"');
html = applyTextPairs(html);
const definitionBriefResult = addDefinitionBriefs(html);
html = definitionBriefResult.html;
html = html.replace(
  '<div itemprop="articleBody">',
  `<div itemprop="articleBody">
<div class="cn-repro-scope admonition note">
<p class="admonition-title"><span class="cn-term">术语相邻入口双语覆盖</span><span class="en-term">Terminology adjacent-entry bilingual overlay</span></p>
<p class="zh">本页是 release 首页的术语入口。当前优先建立中英术语对照、目录导航和核心概念速览，官方英文定义与链接结构保持原样。</p>
<p class="en">This page is the terminology entry from the release home page. It prioritizes Chinese-English term mapping, contents navigation, and a core concept quick map while preserving the official English definitions and link structure.</p>
</div>
${glossarySummaryBlock()}`,
);
html = html.replace(
  "</footer>",
  '<p class="cn-footer-note">中文双语复刻层：术语入口页，本地学习用途，官方英文定义与链接保留。 / Bilingual terminology-entry layer for local study; official English definitions and links are preserved.</p>\n</footer>',
);

await mkdir(siteDir, { recursive: true });
await writeFile(outputPath, html, "utf8");

console.log(JSON.stringify({
  output: outputPath,
  translatedTerms: terms.size,
  summaryCards: summaryCards.length,
  definitionBriefs: definitionBriefResult.inserted,
}, null, 2));
