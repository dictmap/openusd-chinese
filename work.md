# OpenUSD Bilingual Work Log

## 当前真实状态

- 全量页面：406
- 完整双语 / good_bilingual：64
- 未完整翻译草稿 / bilingual_draft：342
- draft_needs_translation：331
- draft_template_only：11
- pending_full_scope：0
- promotion manifest：56 页
- 总验证：passed=true，failed_check_count=0

说明：剩余 `bilingual_draft` 是可检查草稿，不是完整翻译。第 359 轮继续按单页 PromotionRound 推进，并让 `good_bilingual` 真实增加。

## 第 359 轮：PromotionRound

- 目标页面：`full_site/api/arch_page_front.html`
- 官方页面：`https://openusd.org/release/api/arch_page_front.html`
- 本轮动作：将 `Arch: Architecture Dependent` 从 `bilingual_draft` 晋级为 `bilingual_complete`，补入逐段双语理解。
- 完成数变化：good_bilingual 63 -> 64
- 草稿数变化：bilingual_draft 343 -> 342

## 本轮覆盖重点

- Arch 作为 OpenUSD architecture-dependent code 集中层。
- platform dependency isolation 与 confusing `#ifdefs` 收敛。
- Bits、Multithreading、Math、Strings、System Functions、Memory Management、Diagnostics、Symbol Visibility 分组边界。
- `ARCH_OS_LINUX`、`ARCH_OS_DARWIN`、`ARCH_OS_WINDOWS`、`ARCH_CPU_INTEL` 等 OS/CPU token 保持原样。
- 与 `Tf`、`Plug`、构建系统、shared-library loading 的分层关系。
- 区分 platform-specific failure 与上层 `Sdf`、`Pcp`、`Usd`、Hydra、renderer、schema semantics 的调试路径。

## 验证结果

- `discover_openusd_all_pages.mjs`：complete=64，draft=342，pending=0
- `audit_openusd_translation_quality.mjs`：good_bilingual=64，draft_needs_translation=331，draft_template_only=11
- `build_final_html_entry.mjs`：最终入口已更新为 64 complete / 342 incomplete drafts
- `route_openusd_internal_links_local.mjs`：passed
- `audit_openusd_full_draft_preview.mjs`：342/342 draft pages 可预览
- `audit_openusd_markdown_encoding.mjs`：passed，连续问号 0，BOM 0
- `validate_openusd_api_repro.ps1`：295 checks，0 failed

## 剩余缺口

- 342 页仍是 `bilingual_draft`，可检查但不是完整翻译。
- 331 页仍是 `draft_needs_translation`。
- 11 页仍是 `draft_template_only`，主要是源码、搜索或目录类页面。
- P1 link placeholders 仍存在，属于 406 页清单外官方目标的本地占位出口。

## 下一步

继续 PromotionRound，每轮只晋级 1 个页面。建议下一页：`full_site/api/hd_page_front.html`。
