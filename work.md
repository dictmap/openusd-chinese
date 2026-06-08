# OpenUSD Bilingual Work Log

当前状态：good_bilingual=230/406，review_ready_zh=167，api_complete=104，release_complete=126，bilingual_draft=176，draft_needs_translation=166，draft_template_only=10，pending_full_scope=0。


## 第 452 轮：DefectRound

- 缺陷 id：`P1-release-intro-openexec-source-parity`
- 阶段：S3 格式与链接 / source parity / click-path
- 目标：`full_site/release/intro_to_openexec.html`
- 本轮性质：P1 用户可见缺陷修复，不新增完成页，不处理 `full_site/api/struct_usd_skel_tokens_type.html`。
- 修复重点：页面正文按官方点击/阅读顺序展开，覆盖 Background、Introducing OpenExec、Illustrative Example、What OpenExec Is Not、New concepts、Computations、Built-in Computations、Plugin Computations、Computation Input Parameters、Computation Callbacks、Computation Registration、Client API、Requesting Values、Receiving Notification About Invalidation、Conclusion。
- 关键代码/API 标识：`CarDoorFrame`、`CarDoorRotator`、`ComputeTransformFromOpenness`、`MyCallback`、`VdfContext`、`EXEC_REGISTER_COMPUTATIONS_FOR_SCHEMA`、`ExecUsdSystem`、`ExecUsdRequest`、`ExecUsdCacheView`、`computeLocalToWorldTransform`。
- source parity：`reports/round_452_intro_openexec_source_parity.json`
- click-path report：`reports/round_452_intro_openexec_click_path.json`
- 计数约束：good_bilingual 保持 230，release_complete 保持 126，api_complete 保持 104。

## 点击路径修正

- 本地入口：`openusd_bilingual_final.html` -> `site/release_index.html` -> `full_site/release/intro_to_openexec.html`
- 本页顺读：`#background` -> `#introducing-openexec` -> `#illustrative-example` -> `#what-openexec-is-not` -> `#new-concepts` -> `#client-api` -> `#conclusion`
- 本地相关 API/教程：OpenExec Overview、Tutorial 1、Tutorial 2、OpenExec System Design、ExecUsd、Vdf。
- 官方上一页 `intro.html` 和下一页 `glossary.html` 不在当前 406 页 inventory 中，本页不伪造本地链接；只保留显式 `Open official page` 外跳。

## 下一步

下一轮优先执行 `ClickPathAuditRound` 或 `DefectRound`，缺陷 id=`P1-click-order-reading-flow-consistency`。在 click-path 审计通过前，不恢复新 API 页 PromotionRound。
