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
