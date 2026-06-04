param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

$site = Join-Path $Root "site"
$apiSource = Join-Path $Root "source\openusd_api_index_source.html"
$releaseSource = Join-Path $Root "source\openusd_release_index_source.html"
$glossarySource = Join-Path $Root "source\openusd_release_glossary_source.html"
$toolsetSource = Join-Path $Root "source\openusd_release_toolset_source.html"
$overviewSource = Join-Path $Root "source\openusd_api_overview_and_purpose_source.html"
$usdPageSource = Join-Path $Root "source\openusd_api_usd_page_front_source.html"
$apiIndex = Join-Path $site "index.html"
$releaseIndex = Join-Path $site "release_index.html"
$glossaryPage = Join-Path $site "glossary.html"
$toolsetPage = Join-Path $site "toolset.html"
$apiOverview = Join-Path $site "_usd__overview_and_purpose.html"
$usdPageFront = Join-Path $site "usd_page_front.html"
$reportDir = Join-Path $Root "reports"
$reportPath = Join-Path $reportDir "validation_report.json"
$finalHtmlEntry = Join-Path $Root "openusd_bilingual_final.html"

New-Item -ItemType Directory -Force -Path $reportDir | Out-Null

$requiredFiles = @(
  "site\index.html",
  "site\openusd_cn.css",
  "source\openusd_api_index_source.html",
  "site\tabs.css",
  "site\jquery.js",
  "site\dynsections.js",
  "site\navtree.css",
  "site\resize.js",
  "site\navtreedata.js",
  "site\navtree.js",
  "site\search\search.css",
  "site\search\searchdata.js",
  "site\search\search.js",
  "site\doxygen.css",
  "site\doxygen-awesome.css",
  "site\usd_style.css",
  "site\menudata.js",
  "site\menu.js",
  "site\USDLogoDocs.png",
  "site\USDLogoLrgWithAlpha.png",
  "site\doxygen.svg",
  "site\tab_a.png",
  "site\tab_b.png",
  "site\tab_s.png",
  "site\nav_f.png",
  "site\nav_g.png",
  "site\nav_h.png",
  "site\bc_s.png",
  "site\bdwn.png",
  "site\folderopen.png",
  "site\folderclosed.png",
  "site\doc.png",
  "site\splitbar.png",
  "site\open.png",
  "site\closed.png",
  "site\search\mag.svg",
  "site\search\mag_sel.svg",
  "source\openusd_release_index_source.html",
  "source\openusd_release_intro_source.html",
  "source\openusd_release_apiDocs_source.html",
  "source\openusd_release_glossary_source.html",
  "source\openusd_release_toolset_source.html",
  "source\openusd_api_overview_and_purpose_source.html",
  "source\openusd_api_usd_page_front_source.html",
  "site\release_index.html",
  "site\intro.html",
  "site\apiDocs.html",
  "site\glossary.html",
  "site\toolset.html",
  "site\_usd__overview_and_purpose.html",
  "site\usd_page_front.html",
  "site\openusd_release_cn.css",
  "site\api\index.html",
  "scripts\audit_openusd_chinese_first_order_contract.mjs",
  "scripts\audit_openusd_entry_label_contract.mjs",
  "scripts\audit_openusd_entry_structure_parity.mjs",
  "scripts\audit_openusd_full_draft_preview.mjs",
  "scripts\audit_openusd_navigation_coverage.mjs",
  "scripts\audit_openusd_official_entry_freshness.mjs",
  "scripts\audit_openusd_page_metadata_contract.mjs",
  "scripts\audit_openusd_repro_links.mjs",
  "scripts\audit_openusd_primary_entry_coverage.mjs",
  "scripts\audit_openusd_report_index.mjs",
  "scripts\audit_openusd_responsive_layout_contract.mjs",
  "scripts\audit_openusd_scope_boundaries.mjs",
  "scripts\audit_openusd_source_provenance.mjs",
  "scripts\audit_openusd_style_asset_contract.mjs",
  "scripts\audit_openusd_term_consistency.mjs",
  "scripts\route_openusd_internal_links_local.mjs",
  "scripts\build_intro_bilingual.mjs",
  "scripts\build_apiDocs_bilingual.mjs",
  "scripts\build_glossary_bilingual.mjs",
  "scripts\build_toolset_bilingual.mjs",
  "scripts\build_api_overview_bilingual.mjs",
  "scripts\build_usd_page_front_bilingual.mjs",
  "scripts\build_local_preview_index.mjs",
  "scripts\build_final_html_entry.mjs",
  "scripts\discover_openusd_all_pages.mjs",
  "scripts\build_release_full_batch.mjs",
  "scripts\build_api_full_batch.mjs",
  "openusd_bilingual_final.html",
  "reports\link_audit.json",
  "reports\link_audit.md",
  "reports\local_link_routing_report.json",
  "reports\local_link_routing_report.md",
  "reports\audit_index.json",
  "reports\audit_index.md",
  "reports\chinese_first_order_contract_audit.json",
  "reports\chinese_first_order_contract_audit.md",
  "reports\entry_label_contract_audit.json",
  "reports\entry_label_contract_audit.md",
  "reports\entry_structure_parity_audit.json",
  "reports\entry_structure_parity_audit.md",
  "reports\full_draft_preview_audit.json",
  "reports\full_draft_preview_audit.md",
  "reports\navigation_coverage_audit.json",
  "reports\navigation_coverage_audit.md",
  "reports\official_entry_freshness_audit.json",
  "reports\official_entry_freshness_audit.md",
  "reports\page_metadata_contract_audit.json",
  "reports\page_metadata_contract_audit.md",
  "reports\primary_entry_coverage.json",
  "reports\primary_entry_coverage.md",
  "reports\responsive_layout_contract_audit.json",
  "reports\responsive_layout_contract_audit.md",
  "reports\scope_boundary_audit.json",
  "reports\scope_boundary_audit.md",
  "reports\source_provenance_audit.json",
  "reports\source_provenance_audit.md",
  "reports\style_asset_contract_audit.json",
  "reports\style_asset_contract_audit.md",
  "reports\term_consistency_audit.json",
  "reports\term_consistency_audit.md",
  "reports\api_route_guide_browser_audit.json",
  "reports\api_route_guide_browser_audit.md",
  "reports\api_route_guide_browser_view.png",
  "reports\api_route_guide_browser_wide_audit.json",
  "reports\api_route_guide_browser_wide_audit.md",
  "reports\api_route_guide_browser_wide_view.png",
  "reports\local_preview_index.json",
  "reports\local_preview_index.md",
  "reports\all_pages_inventory.json",
  "reports\all_pages_inventory.md",
  "reports\release_full_batch_report.json",
  "reports\release_full_batch_report.md",
  "reports\api_full_batch_report.json",
  "reports\api_full_batch_report.md",
  "reports\scope_manifest.json",
  "reports\scope_manifest.md",
  "site\_static\pygments.css",
  "site\_static\sphinx-design.min.css",
  "site\_static\css\theme.css",
  "site\_static\css\pxr_custom.css",
  "site\_static\jquery.js",
  "site\_static\_sphinx_javascript_frameworks_compat.js",
  "site\_static\documentation_options.js",
  "site\_static\doctools.js",
  "site\_static\sphinx_highlight.js",
  "site\_static\design-tabs.js",
  "site\_static\js\versions.js",
  "site\_static\js\theme.js",
  "site\_static\css\fonts\fontawesome-webfont.eot",
  "site\_static\css\fonts\fontawesome-webfont.woff2",
  "site\_static\css\fonts\fontawesome-webfont.woff",
  "site\_static\css\fonts\fontawesome-webfont.ttf",
  "site\_static\css\fonts\fontawesome-webfont.svg",
  "site\_static\css\fonts\lato-normal.woff2",
  "site\_static\css\fonts\lato-normal.woff",
  "site\_static\css\fonts\lato-bold.woff2",
  "site\_static\css\fonts\lato-bold.woff",
  "site\_static\css\fonts\lato-bold-italic.woff2",
  "site\_static\css\fonts\lato-bold-italic.woff",
  "site\_static\css\fonts\lato-normal-italic.woff2",
  "site\_static\css\fonts\lato-normal-italic.woff",
  "site\_static\css\fonts\Roboto-Slab-Regular.woff2",
  "site\_static\css\fonts\Roboto-Slab-Regular.woff",
  "site\_static\css\fonts\Roboto-Slab-Bold.woff2",
  "site\_static\css\fonts\Roboto-Slab-Bold.woff",
  "site\images\USDLogoUnsized.svg",
  "site\images\USDLogo24.svg",
  "site\images\USDIcon.ico",
  "site\images\piper-banner.jpg",
  "site\_images\glossary_radiusSpline.png",
  "site\_images\glossary_usdviewValidation.png"
)

$checks = New-Object System.Collections.Generic.List[object]

foreach ($relative in $requiredFiles) {
  $path = Join-Path $Root $relative
  $checks.Add([pscustomobject]@{
    check = "required_file:$relative"
    passed = (Test-Path -LiteralPath $path)
  })
}

$apiHtml = Get-Content -LiteralPath $apiIndex -Raw -Encoding UTF8
$apiSourceHtml = Get-Content -LiteralPath $apiSource -Raw -Encoding UTF8
$releaseHtml = Get-Content -LiteralPath $releaseIndex -Raw -Encoding UTF8
$glossaryHtml = Get-Content -LiteralPath $glossaryPage -Raw -Encoding UTF8
$toolsetHtml = Get-Content -LiteralPath $toolsetPage -Raw -Encoding UTF8
$overviewHtml = Get-Content -LiteralPath $apiOverview -Raw -Encoding UTF8
$usdPageHtml = Get-Content -LiteralPath $usdPageFront -Raw -Encoding UTF8
$introHtml = Get-Content -LiteralPath (Join-Path $site "intro.html") -Raw -Encoding UTF8
$apiDocsHtml = Get-Content -LiteralPath (Join-Path $site "apiDocs.html") -Raw -Encoding UTF8
$releaseSourceHtml = Get-Content -LiteralPath $releaseSource -Raw -Encoding UTF8
$glossarySourceHtml = Get-Content -LiteralPath $glossarySource -Raw -Encoding UTF8
$toolsetSourceHtml = Get-Content -LiteralPath $toolsetSource -Raw -Encoding UTF8
$overviewSourceHtml = Get-Content -LiteralPath $overviewSource -Raw -Encoding UTF8
$usdPageSourceHtml = Get-Content -LiteralPath $usdPageSource -Raw -Encoding UTF8

$apiContentChecks = @{
  "has_zh_cn_lang" = "lang=`"zh-CN`""
  "has_chinese_blocks" = "class=`"zh`""
  "has_english_blocks" = "class=`"en`""
  "has_english_title" = "Universal Scene Description \(USD\)"
  "has_english_summary" = "USD is a system for authoring, composing, and reading hierarchically organized scene description"
  "has_overview_link" = "_usd__overview_and_purpose.html"
  "has_usd_api_link" = "usd_page_front.html"
  "has_license_link" = "https://openusd.org/license"
  "has_original_generated_stamp" = "Generated on Wed Apr 22 2026 16:02:21"
  "has_local_bilingual_css" = "openusd_cn.css"
  "has_local_favicon" = "images/USDIcon\.ico"
}

foreach ($name in $apiContentChecks.Keys) {
  $checks.Add([pscustomobject]@{
    check = "api:$name"
    passed = ($apiHtml -match $apiContentChecks[$name])
  })
}

$apiCss = Get-Content -LiteralPath (Join-Path $site "openusd_cn.css") -Raw -Encoding UTF8
$checks.Add([pscustomobject]@{
  check = "api:has_scope_note"
  passed = ($apiHtml -match "cn-repro-note" -and $apiHtml -match "https://openusd\.org/release/api/index\.html" -and $apiHtml -match "API names, page names, and links are preserved")
})

$checks.Add([pscustomobject]@{
  check = "api:has_entry_map_cards"
  passed = ($apiHtml -match "cn-api-entry-map" -and [regex]::Matches($apiHtml, 'class="cn-api-entry-card"').Count -ge 3 -and $apiHtml -match "Overview and Purpose" -and $apiHtml -match "Usd API" -and $apiHtml -match "TOST license")
})

$checks.Add([pscustomobject]@{
  check = "api:has_route_guide"
  passed = ($apiHtml -match "cn-api-route-guide" -and [regex]::Matches($apiHtml, 'class="cn-api-route-step"').Count -ge 3 -and $apiHtml -match "API Route Guide" -and $apiHtml -match "_usd__overview_and_purpose\.html" -and $apiHtml -match "usd_page_front\.html" -and $apiHtml -match "https://openusd\.org/license")
})

$checks.Add([pscustomobject]@{
  check = "api:entry_map_styles_present"
  passed = ($apiCss -match "cn-api-entry-map" -and $apiCss -match "cn-api-entry-card" -and $apiCss -match "cn-api-route-guide" -and $apiCss -match "cn-api-route-step")
})

$releaseContentChecks = @{
  "has_zh_cn_lang" = "lang=`"zh-CN`""
  "has_release_title" = "Universal Scene Description 26\.05 documentation"
  "has_sphinx_theme_css" = "_static/css/theme\.css"
  "has_release_bilingual_css" = "openusd_release_cn\.css"
  "has_scope_marker" = "cn-repro-scope"
  "has_bilingual_marker" = "class=`"cn-term`""
  "has_english_marker" = "class=`"en-term`""
  "has_usd_home" = "USD Home"
  "has_api_doc_link" = "api/index\.html"
  "has_get_started_card" = "Get Started"
  "has_source_snapshot_comment" = "openusd_release_index_source\.html"
  "has_local_title_logo" = "images/USDLogoUnsized\.svg"
  "has_local_banner_image" = "images/piper-banner\.jpg"
  "has_local_favicon" = "images/USDIcon\.ico"
}

foreach ($name in $releaseContentChecks.Keys) {
  $checks.Add([pscustomobject]@{
    check = "release:$name"
    passed = ($releaseHtml -match $releaseContentChecks[$name])
  })
}

$checks.Add([pscustomobject]@{
  check = "api:source_snapshot_has_same_page_title"
  passed = ($apiSourceHtml -match "Universal Scene Description \(USD\)")
})

$checks.Add([pscustomobject]@{
  check = "release:source_snapshot_has_same_page_title"
  passed = ($releaseSourceHtml -match "USD Home")
})

$checks.Add([pscustomobject]@{
  check = "glossary:source_snapshot_has_same_page_title"
  passed = ($glossarySourceHtml -match "USD Terms and Concepts")
})

$checks.Add([pscustomobject]@{
  check = "toolset:source_snapshot_has_same_page_title"
  passed = ($toolsetSourceHtml -match "USD Toolset")
})

$checks.Add([pscustomobject]@{
  check = "overview:source_snapshot_has_same_page_title"
  passed = ($overviewSourceHtml -match "Overview and Purpose")
})

$checks.Add([pscustomobject]@{
  check = "usd_page_front:source_snapshot_has_same_page_title"
  passed = ($usdPageSourceHtml -match "Usd : Universal Scene Description")
})

$checks.Add([pscustomobject]@{
  check = "release:bilingual_term_count_at_least_300"
  passed = ([regex]::Matches($releaseHtml, 'class="cn-term"').Count -ge 300)
})

$checks.Add([pscustomobject]@{
  check = "intro:has_bilingual_title"
  passed = ($introHtml -match "Introduction to USD" -and $introHtml -match "cn-repro-scope")
})

$checks.Add([pscustomobject]@{
  check = "intro:home_link_points_to_release_index"
  passed = ($introHtml -match 'href="release_index\.html"')
})

$checks.Add([pscustomobject]@{
  check = "apiDocs:has_bilingual_bridge"
  passed = ($apiDocsHtml -match "API Documentation" -and $apiDocsHtml -match "cn-repro-scope" -and $apiDocsHtml -match "api/index\.html")
})

$checks.Add([pscustomobject]@{
  check = "apiDocs:home_link_points_to_release_index"
  passed = ($apiDocsHtml -match 'href="release_index\.html"')
})

$checks.Add([pscustomobject]@{
  check = "glossary:has_bilingual_term_layer"
  passed = ($glossaryHtml -match "USD Terms and Concepts" -and $glossaryHtml -match "cn-repro-scope" -and [regex]::Matches($glossaryHtml, 'class="cn-term"').Count -ge 300)
})

$checks.Add([pscustomobject]@{
  check = "glossary:has_summary_cards"
  passed = ($glossaryHtml -match "Core Term Quick Map" -and [regex]::Matches($glossaryHtml, 'cn-glossary-card').Count -ge 18)
})

$checks.Add([pscustomobject]@{
  check = "glossary:has_definition_briefs"
  passed = ([regex]::Matches($glossaryHtml, 'cn-definition-brief').Count -ge 92 -and $glossaryHtml -match "Value Resolution" -and $glossaryHtml -match "Composition Arcs" -and $glossaryHtml -match "VariantSet" -and $glossaryHtml -match "References" -and $glossaryHtml -match "Primvar" -and $glossaryHtml -match "TimeCode" -and $glossaryHtml -match "Clips" -and $glossaryHtml -match "Collection" -and $glossaryHtml -match "Instancing" -and $glossaryHtml -match "Interpolation" -and $glossaryHtml -match "Spline" -and $glossaryHtml -match "Value Clips" -and $glossaryHtml -match "Relocates" -and $glossaryHtml -match "SubLayers" -and $glossaryHtml -match "Session Layer" -and $glossaryHtml -match "Animation Block" -and $glossaryHtml -match "Change Processing" -and $glossaryHtml -match "Class" -and $glossaryHtml -match "Group" -and $glossaryHtml -match "Hydra" -and $glossaryHtml -match "LIVERPS Strength Ordering" -and $glossaryHtml -match "Over" -and $glossaryHtml -match "Path Translation" -and $glossaryHtml -match "PrimStack" -and $glossaryHtml -match "PseudoRoot" -and $glossaryHtml -match "Specifier" -and $glossaryHtml -match "EditTarget" -and $glossaryHtml -match "Animated Value" -and $glossaryHtml -match "AssetInfo" -and $glossaryHtml -match "Assembly" -and $glossaryHtml -match "Attribute Block" -and $glossaryHtml -match "Component" -and $glossaryHtml -match "Computation Input Parameters" -and $glossaryHtml -match "Computation" -and $glossaryHtml -match "Connection" -and $glossaryHtml -match "Crate File Format" -and $glossaryHtml -match "Gprim" -and $glossaryHtml -match "Index" -and $glossaryHtml -match "Instanceable" -and $glossaryHtml -match "IsA Schema" -and $glossaryHtml -match "Model Hierarchy" -and $glossaryHtml -match "OpenExec" -and $glossaryHtml -match "Path" -and $glossaryHtml -match "Prim Definition" -and $glossaryHtml -match "PrimSpec" -and $glossaryHtml -match "PropertySpec" -and $glossaryHtml -match "PropertyStack" -and $glossaryHtml -match "Proxy" -and $glossaryHtml -match "Stage Traversal" -and $glossaryHtml -match "Subcomponent" -and $glossaryHtml -match "TimeCodes Scaled to Real Time" -and $glossaryHtml -match "Typed Schema" -and $glossaryHtml -match "User Properties" -and $glossaryHtml -match "Validation" -and $glossaryHtml -match "Variability")
})

$checks.Add([pscustomobject]@{
  check = "glossary:has_local_assets"
  passed = ($glossaryHtml -match "_images/glossary_radiusSpline\.png" -and $glossaryHtml -match "_images/glossary_usdviewValidation\.png" -and $glossaryHtml -match "images/USDIcon\.ico")
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_bilingual_tool_layer"
  passed = ($toolsetHtml -match "USD Toolset" -and $toolsetHtml -match "cn-repro-scope" -and [regex]::Matches($toolsetHtml, 'cn-tool-card').Count -ge 19)
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_tool_briefs"
  passed = ([regex]::Matches($toolsetHtml, 'cn-tool-brief').Count -ge 19 -and $toolsetHtml -match "usdedit" -and $toolsetHtml -match "usdview" -and $toolsetHtml -match "usdGenSchema")
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_option_guides"
  passed = ([regex]::Matches($toolsetHtml, 'cn-tool-options').Count -ge 19 -and $toolsetHtml -match "--flatten" -and $toolsetHtml -match "--renderer" -and $toolsetHtml -match "--includeKeywords" -and $toolsetHtml -match "--createContextForAsset" -and $toolsetHtml -match "--backup" -and $toolsetHtml -match "--summary" -and $toolsetHtml -match "--noreadme" -and $toolsetHtml -match "--arraySizeLimit" -and $toolsetHtml -match "High-frequency option guide")
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_deep_option_notes"
  passed = ([regex]::Matches($toolsetHtml, 'cn-tool-deep-note').Count -ge 6 -and $toolsetHtml -match "Long-option reading notes" -and $toolsetHtml -match "--includeKeywords" -and $toolsetHtml -match "--excludeKeywords" -and $toolsetHtml -match "--clipPath" -and $toolsetHtml -match "--arraySizeLimit" -and $toolsetHtml -match "--noreadme" -and $toolsetHtml -match "--genModuleDeps")
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_workflow_scenarios"
  passed = ([regex]::Matches($toolsetHtml, 'class="cn-tool-scenario"').Count -ge 6 -and $toolsetHtml -match "Workflow Scenario Guide" -and $toolsetHtml -match "usdchecker" -and $toolsetHtml -match "usdzip" -and $toolsetHtml -match "usdstitchclips" -and $toolsetHtml -match "usdGenSchema" -and $toolsetHtml -match "usdmeasureperformance")
})

$checks.Add([pscustomobject]@{
  check = "toolset:has_local_favicon"
  passed = ($toolsetHtml -match "images/USDIcon\.ico")
})

$checks.Add([pscustomobject]@{
  check = "overview:has_bilingual_title"
  passed = ($overviewHtml -match "Overview and Purpose" -and $overviewHtml -match "cn-repro-note" -and $overviewHtml -match 'class="zh"')
})

$checks.Add([pscustomobject]@{
  check = "overview:has_core_api_links"
  passed = ($overviewHtml -match "usd_page_front\.html" -and $overviewHtml -match "class_usd_stage\.html" -and $overviewHtml -match "class_vt_array\.html")
})

$checks.Add([pscustomobject]@{
  check = "overview:bilingual_block_count_at_least_50"
  passed = ([regex]::Matches($overviewHtml, 'class="zh"').Count -ge 50 -and [regex]::Matches($overviewHtml, 'class="en"').Count -ge 50)
})

$checks.Add([pscustomobject]@{
  check = "overview:has_local_favicon"
  passed = ($overviewHtml -match "images/USDIcon\.ico")
})

$checks.Add([pscustomobject]@{
  check = "usd_page_front:has_bilingual_title"
  passed = ($usdPageHtml -match "Usd : Universal Scene Description" -and $usdPageHtml -match "cn-repro-note" -and $usdPageHtml -match 'class="zh"')
})

$checks.Add([pscustomobject]@{
  check = "usd_page_front:has_api_manual_terms"
  passed = ($usdPageHtml -match "API Manual" -and $usdPageHtml -match "Key Classes" -and [regex]::Matches($usdPageHtml, 'class="cn-term"').Count -ge 50)
})

$checks.Add([pscustomobject]@{
  check = "usd_page_front:has_key_class_links"
  passed = ($usdPageHtml -match "class_usd_stage\.html" -and $usdPageHtml -match "class_usd_prim\.html" -and $usdPageHtml -match "class_usd_time_code\.html")
})

$checks.Add([pscustomobject]@{
  check = "usd_page_front:has_local_favicon"
  passed = ($usdPageHtml -match "images/USDIcon\.ico")
})

$pxrCustomCss = Get-Content -LiteralPath (Join-Path $site "_static\css\pxr_custom.css") -Raw -Encoding UTF8
$checks.Add([pscustomobject]@{
  check = "site:no_remote_openusd_image_refs_in_outputs"
  passed = -not (($apiHtml + $releaseHtml + $introHtml + $apiDocsHtml + $glossaryHtml + $toolsetHtml + $overviewHtml + $usdPageHtml + $pxrCustomCss) -match "https://openusd\.org/images")
})

$linkAudit = Get-Content -LiteralPath (Join-Path $reportDir "link_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "link_audit:passed"
  passed = ($linkAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "link_audit:no_missing_local_assets"
  passed = ($linkAudit.missing_local_assets.Count -eq 0)
})

$localLinkRouting = Get-Content -LiteralPath (Join-Path $reportDir "local_link_routing_report.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "local_link_routing:passed"
  passed = ($localLinkRouting.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "local_link_routing:inventory_outputs_exist"
  passed = ($localLinkRouting.counts.inventory_pages -eq 406 -and $localLinkRouting.counts.local_inventory_outputs_existing -eq 406)
})

$checks.Add([pscustomobject]@{
  check = "local_link_routing:routes_internal_links_locally"
  passed = ($localLinkRouting.counts.mapped_links -ge 4000 -and $localLinkRouting.counts.uncovered_links -ge 100 -and $localLinkRouting.counts.explicit_official_links -ge 9)
})

$httpPreviewAudit = Get-Content -LiteralPath (Join-Path $reportDir "http_preview_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "http_preview_audit:passed"
  passed = ($httpPreviewAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "http_preview_audit:all_pages_and_assets_ok"
  passed = ($httpPreviewAudit.counts.pages -ge 9 -and $httpPreviewAudit.counts.failed_pages -eq 0 -and $httpPreviewAudit.counts.local_assets_checked -ge 100 -and $httpPreviewAudit.counts.failed_local_assets -eq 0)
})

$apiPreviewPage = @($httpPreviewAudit.pages | Where-Object { $_.page -eq "index.html" })[0]
$checks.Add([pscustomobject]@{
  check = "http_preview_audit:api_route_guide_visible"
  passed = ($null -ne $apiPreviewPage -and $apiPreviewPage.required_marker_count -ge 8 -and @($apiPreviewPage.missing_required_markers).Count -eq 0)
})

$apiRouteGuideBrowserAudit = Get-Content -LiteralPath (Join-Path $reportDir "api_route_guide_browser_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "api_route_guide_browser_audit:passed"
  passed = ($apiRouteGuideBrowserAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "api_route_guide_browser_audit:route_guide_visible_and_linked"
  passed = ($apiRouteGuideBrowserAudit.counts.checks -ge 6 -and $apiRouteGuideBrowserAudit.counts.failed_checks -eq 0 -and $apiRouteGuideBrowserAudit.counts.route_steps -eq 3 -and $apiRouteGuideBrowserAudit.counts.route_links -eq 3 -and $apiRouteGuideBrowserAudit.screenshot -eq "reports/api_route_guide_browser_view.png")
})

$apiRouteGuideBrowserWideAudit = Get-Content -LiteralPath (Join-Path $reportDir "api_route_guide_browser_wide_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "api_route_guide_browser_wide_audit:passed"
  passed = ($apiRouteGuideBrowserWideAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "api_route_guide_browser_wide_audit:route_guide_visible_and_linked"
  passed = ($apiRouteGuideBrowserWideAudit.counts.checks -ge 8 -and $apiRouteGuideBrowserWideAudit.counts.failed_checks -eq 0 -and $apiRouteGuideBrowserWideAudit.counts.route_steps -eq 3 -and $apiRouteGuideBrowserWideAudit.counts.route_links -eq 3 -and $apiRouteGuideBrowserWideAudit.counts.viewport_width -ge 1200 -and $apiRouteGuideBrowserWideAudit.screenshot -eq "reports/api_route_guide_browser_wide_view.png")
})

$localPreviewIndex = Get-Content -LiteralPath (Join-Path $reportDir "local_preview_index.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "local_preview_index:passed"
  passed = ($localPreviewIndex.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "local_preview_index:current_scope_links_ready"
  passed = ($localPreviewIndex.counts.pages -eq 9 -and $localPreviewIndex.counts.primary_pages -eq 2 -and $localPreviewIndex.counts.active_adjacent_pages -eq 6 -and $localPreviewIndex.counts.local_redirect_pages -eq 1 -and $localPreviewIndex.counts.existing_pages -eq 9 -and $localPreviewIndex.counts.site_html_pages -eq 9 -and $localPreviewIndex.preview_base_url -eq "http://127.0.0.1:8067/")
})

$allPagesInventory = Get-Content -LiteralPath (Join-Path $reportDir "all_pages_inventory.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$coveredOfficialPages = [int]$allPagesInventory.counts.bilingual_complete_pages + [int]$allPagesInventory.counts.bilingual_draft_pages + [int]$allPagesInventory.counts.pending_full_scope_pages
$checks.Add([pscustomobject]@{
  check = "all_pages_inventory:passed"
  passed = ($allPagesInventory.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "all_pages_inventory:all_scope_not_adjacent_filter"
  passed = ($allPagesInventory.scope_mode -eq "all_discovered_release_and_api_html_pages" -and $allPagesInventory.counts.total_pages -gt 9 -and $allPagesInventory.counts.release_pages -gt 20 -and $allPagesInventory.counts.api_pages -gt 20 -and $coveredOfficialPages -eq $allPagesInventory.counts.total_pages)
})

$checks.Add([pscustomobject]@{
  check = "all_pages_inventory:draft_queue_counted"
  passed = ($allPagesInventory.counts.bilingual_draft_pages -ge 5 -and $allPagesInventory.counts.pending_full_scope_pages -ge 0 -and $coveredOfficialPages -eq $allPagesInventory.counts.total_pages)
})

$fullSiteDraftFiles = @()
$fullSiteReleaseDir = Join-Path $Root "full_site\release"
$fullSiteApiDir = Join-Path $Root "full_site\api"
if (Test-Path -LiteralPath $fullSiteReleaseDir) {
  $fullSiteDraftFiles += @(Get-ChildItem -LiteralPath $fullSiteReleaseDir -Recurse -Filter "*.html" -File)
}
if (Test-Path -LiteralPath $fullSiteApiDir) {
  $fullSiteDraftFiles += @(Get-ChildItem -LiteralPath $fullSiteApiDir -Recurse -Filter "*.html" -File)
}
$inventoryDraftPages = @($allPagesInventory.pages | Where-Object { $_.status -eq "bilingual_draft" })
$inventoryDraftOutputsExist = @($inventoryDraftPages | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_.local_output)) }).Count -eq 0
$checks.Add([pscustomobject]@{
  check = "all_pages_inventory:draft_files_match_inventory"
  passed = ($inventoryDraftPages.Count -eq $allPagesInventory.counts.bilingual_draft_pages -and $fullSiteDraftFiles.Count -eq $allPagesInventory.counts.bilingual_draft_pages -and $inventoryDraftOutputsExist)
})

$releaseFullBatchReport = Get-Content -LiteralPath (Join-Path $reportDir "release_full_batch_report.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$releaseFullBatchPages = @($releaseFullBatchReport.pages)
$releaseFullBatchExpectedSize = [int]$releaseFullBatchReport.batch_size
$releaseFullBatchOutputsExist = @($releaseFullBatchPages | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_.local_output)) }).Count -eq 0
$releaseFullBatchSourcesExist = @($releaseFullBatchPages | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_.source_snapshot)) }).Count -eq 0
$checks.Add([pscustomobject]@{
  check = "release_full_batch:passed"
  passed = ($releaseFullBatchReport.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "release_full_batch:draft_pages_ready"
  passed = ($releaseFullBatchExpectedSize -gt 0 -and $releaseFullBatchPages.Count -eq $releaseFullBatchExpectedSize -and @($releaseFullBatchPages | Where-Object { $_.status -ne "bilingual_draft" }).Count -eq 0 -and $releaseFullBatchOutputsExist -and $releaseFullBatchSourcesExist)
})

$apiFullBatchReport = Get-Content -LiteralPath (Join-Path $reportDir "api_full_batch_report.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$apiFullBatchPages = @($apiFullBatchReport.pages)
$apiFullBatchExpectedSize = [int]$apiFullBatchReport.batch_size
$apiFullBatchOutputsExist = @($apiFullBatchPages | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_.local_output)) }).Count -eq 0
$apiFullBatchSourcesExist = @($apiFullBatchPages | Where-Object { -not (Test-Path -LiteralPath (Join-Path $Root $_.source_snapshot)) }).Count -eq 0
$apiFullBatchOutputsUnderApi = @($apiFullBatchPages | Where-Object { $_.local_output -notmatch '^full_site/api/' }).Count -eq 0
$checks.Add([pscustomobject]@{
  check = "api_full_batch:passed"
  passed = ($apiFullBatchReport.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "api_full_batch:draft_pages_ready"
  passed = ($apiFullBatchExpectedSize -gt 0 -and $apiFullBatchPages.Count -eq $apiFullBatchExpectedSize -and @($apiFullBatchPages | Where-Object { $_.status -ne "bilingual_draft" }).Count -eq 0 -and $apiFullBatchOutputsExist -and $apiFullBatchSourcesExist -and $apiFullBatchOutputsUnderApi)
})

$fullDraftPreviewAudit = Get-Content -LiteralPath (Join-Path $reportDir "full_draft_preview_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "full_draft_preview_audit:passed"
  passed = ($fullDraftPreviewAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "full_draft_preview_audit:draft_pages_http_ready"
  passed = ($fullDraftPreviewAudit.counts.draft_pages -eq $allPagesInventory.counts.bilingual_draft_pages -and $fullDraftPreviewAudit.counts.pages_checked -eq $allPagesInventory.counts.bilingual_draft_pages -and $fullDraftPreviewAudit.counts.passed_pages -eq $allPagesInventory.counts.bilingual_draft_pages -and $fullDraftPreviewAudit.counts.failed_pages -eq 0 -and $fullDraftPreviewAudit.counts.final_entry_links -eq $allPagesInventory.counts.bilingual_draft_pages -and $fullDraftPreviewAudit.counts.failed_local_assets -eq 0)
})

$finalHtml = Get-Content -LiteralPath $finalHtmlEntry -Raw -Encoding UTF8
$checks.Add([pscustomobject]@{
  check = "final_html_entry:has_final_output_marker"
  passed = ($finalHtml -match 'id="final-html-entry"' -and $finalHtml -match 'data-final-output="html"' -and $finalHtml -match 'data-scope-mode="all"' -and $finalHtml -match 'Final HTML Entry' -and $finalHtml -match 'English retained')
})

$checks.Add([pscustomobject]@{
  check = "final_html_entry:links_current_scope_pages"
  passed = ($finalHtml -match 'href="site/release_index\.html"' -and $finalHtml -match 'href="site/index\.html"' -and $finalHtml -match 'href="site/_usd__overview_and_purpose\.html"' -and $finalHtml -match 'href="site/usd_page_front\.html"' -and $finalHtml -match 'href="site/api/index\.html"' -and $finalHtml -match 'http://127\.0\.0\.1:8067/release_index\.html' -and $finalHtml -match 'https://openusd\.org/release/api/index\.html')
})

$checks.Add([pscustomobject]@{
  check = "final_html_entry:shows_all_pages_inventory"
  passed = ($finalHtml -match 'All Pages Inventory' -and $finalHtml -match 'bilingual_draft' -and $finalHtml -match 'pending_full_scope' -and $finalHtml -match 'reports/all_pages_inventory\.json' -and $finalHtml -match ('data-page-count="' + [regex]::Escape([string]$allPagesInventory.counts.total_pages) + '"'))
})

$auditIndex = Get-Content -LiteralPath (Join-Path $reportDir "audit_index.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$auditIndexFailures = @($auditIndex.failed_checks)
$auditIndexOnlyStaleValidationFailure = ($auditIndexFailures.Count -le 1 -and @($auditIndexFailures | Where-Object { $_.check -eq "report_index:validation_report_ready" }).Count -eq $auditIndexFailures.Count)
$checks.Add([pscustomobject]@{
  check = "audit_index:passed"
  passed = ($auditIndex.passed -eq $true -or $auditIndexOnlyStaleValidationFailure)
})

$checks.Add([pscustomobject]@{
  check = "audit_index:fixed_chain_ready"
  passed = ($auditIndex.counts.audit_entries -ge 14 -and $auditIndex.counts.total_entries -ge 15 -and $auditIndex.counts.audit_scripts_present -ge 14 -and $auditIndex.counts.audit_json_reports_present -ge 14 -and $auditIndex.counts.audit_markdown_reports_present -ge 14 -and $auditIndex.counts.audit_reports_passed -ge 14 -and (($auditIndex.counts.validation_failed_checks -eq 0 -and $auditIndex.counts.failed_checks -eq 0) -or $auditIndexOnlyStaleValidationFailure))
})

$primaryEntryCoverage = Get-Content -LiteralPath (Join-Path $reportDir "primary_entry_coverage.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "primary_entry_coverage:passed"
  passed = ($primaryEntryCoverage.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "primary_entry_coverage:release_and_api_ready"
  passed = ($primaryEntryCoverage.counts.pages -ge 3 -and $primaryEntryCoverage.counts.failed_checks -eq 0 -and $primaryEntryCoverage.counts.release_cn_terms -ge 300 -and $primaryEntryCoverage.counts.release_cn_terms -eq $primaryEntryCoverage.counts.release_en_terms -and $primaryEntryCoverage.counts.api_bilingual_blocks -ge 4 -and $primaryEntryCoverage.counts.api_entry_cards -ge 3 -and $primaryEntryCoverage.counts.api_route_steps -ge 3 -and $primaryEntryCoverage.counts.api_scope_notes -ge 1)
})

$entryLabelContractAudit = Get-Content -LiteralPath (Join-Path $reportDir "entry_label_contract_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "entry_label_contract_audit:passed"
  passed = ($entryLabelContractAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "entry_label_contract_audit:release_api_and_adjacent_labels_ready"
  passed = ($entryLabelContractAudit.counts.release_entry_links_bilingual -ge 8 -and $entryLabelContractAudit.counts.release_navigation_groups_bilingual -ge 4 -and $entryLabelContractAudit.counts.api_entry_cards_bilingual -ge 3 -and $entryLabelContractAudit.counts.bridge_and_redirect_links_bilingual -eq 2 -and $entryLabelContractAudit.counts.adjacent_title_pairs_bilingual -ge 6 -and $entryLabelContractAudit.counts.failed_checks -eq 0)
})

$entryStructureParityAudit = Get-Content -LiteralPath (Join-Path $reportDir "entry_structure_parity_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "entry_structure_parity_audit:passed"
  passed = ($entryStructureParityAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "entry_structure_parity_audit:sphinx_doxygen_shells_ready"
  passed = ($entryStructureParityAudit.counts.release_official_markers -ge 12 -and $entryStructureParityAudit.counts.release_local_markers -ge 11 -and $entryStructureParityAudit.counts.release_navigation_groups_source -eq 4 -and $entryStructureParityAudit.counts.release_navigation_groups_local -eq 4 -and $entryStructureParityAudit.counts.api_official_markers -ge 14 -and $entryStructureParityAudit.counts.api_local_markers -ge 16 -and $entryStructureParityAudit.counts.api_entry_links_source -eq 3 -and $entryStructureParityAudit.counts.api_entry_links_local -eq 3 -and $entryStructureParityAudit.counts.adjacent_pages_checked -eq 6 -and $entryStructureParityAudit.counts.adjacent_pages_passed -eq 6 -and $entryStructureParityAudit.counts.failed_checks -eq 0)
})

$chineseFirstOrderContractAudit = Get-Content -LiteralPath (Join-Path $reportDir "chinese_first_order_contract_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "chinese_first_order_contract_audit:passed"
  passed = ($chineseFirstOrderContractAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "chinese_first_order_contract_audit:terms_blocks_and_redirect_ready"
  passed = ($chineseFirstOrderContractAudit.counts.pages_checked -eq 9 -and $chineseFirstOrderContractAudit.counts.cn_term_count -eq $chineseFirstOrderContractAudit.counts.en_term_count -and $chineseFirstOrderContractAudit.counts.ordered_cn_en_term_pairs -eq $chineseFirstOrderContractAudit.counts.cn_term_count -and $chineseFirstOrderContractAudit.counts.cn_term_count -ge 850 -and $chineseFirstOrderContractAudit.counts.zh_block_count -eq $chineseFirstOrderContractAudit.counts.en_block_count -and $chineseFirstOrderContractAudit.counts.ordered_zh_en_pairs -eq $chineseFirstOrderContractAudit.counts.zh_block_count -and $chineseFirstOrderContractAudit.counts.zh_block_count -ge 300 -and $chineseFirstOrderContractAudit.counts.redirect_chinese_first_pages -eq 1 -and $chineseFirstOrderContractAudit.counts.pages_with_chinese_first_layer -eq 9 -and $chineseFirstOrderContractAudit.counts.failed_checks -eq 0)
})

$officialEntryFreshnessAudit = Get-Content -LiteralPath (Join-Path $reportDir "official_entry_freshness_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "official_entry_freshness_audit:passed"
  passed = ($officialEntryFreshnessAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "official_entry_freshness_audit:release_and_api_live_markers_ready"
  passed = ($officialEntryFreshnessAudit.counts.official_urls -eq 2 -and $officialEntryFreshnessAudit.counts.live_pages_ok -eq 2 -and $officialEntryFreshnessAudit.counts.failed_checks -eq 0 -and $officialEntryFreshnessAudit.counts.release_live_markers_present -ge 8 -and $officialEntryFreshnessAudit.counts.api_live_markers_present -ge 7 -and $officialEntryFreshnessAudit.counts.source_snapshots_checked -eq 2 -and $officialEntryFreshnessAudit.counts.local_outputs_checked -ge 3)
})

$pageMetadataContractAudit = Get-Content -LiteralPath (Join-Path $reportDir "page_metadata_contract_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "page_metadata_contract_audit:passed"
  passed = ($pageMetadataContractAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "page_metadata_contract_audit:zh_cn_titles_scope_ready"
  passed = ($pageMetadataContractAudit.counts.pages_checked -eq 9 -and $pageMetadataContractAudit.counts.zh_cn_lang_pages -eq 9 -and $pageMetadataContractAudit.counts.viewport_pages -eq 9 -and $pageMetadataContractAudit.counts.bilingual_or_redirect_titles -eq 9 -and $pageMetadataContractAudit.counts.release_scope_notes -eq 5 -and $pageMetadataContractAudit.counts.api_scope_notes -eq 3 -and $pageMetadataContractAudit.counts.redirect_scope_notes -eq 1 -and $pageMetadataContractAudit.counts.chinese_english_layer_pages -eq 9 -and $pageMetadataContractAudit.counts.failed_checks -eq 0)
})

$scopeBoundaryAudit = Get-Content -LiteralPath (Join-Path $reportDir "scope_boundary_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "scope_boundary_audit:passed"
  passed = ($scopeBoundaryAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "scope_boundary_audit:limited_to_current_scope"
  passed = ($scopeBoundaryAudit.counts.html_pages -eq 10 -and $scopeBoundaryAudit.counts.source_snapshots -eq 8 -and $scopeBoundaryAudit.counts.primary_scope_entries -eq 2 -and $scopeBoundaryAudit.counts.active_adjacent_scope_entries -eq 6 -and $scopeBoundaryAudit.counts.failed_checks -eq 0)
})

$responsiveLayoutContractAudit = Get-Content -LiteralPath (Join-Path $reportDir "responsive_layout_contract_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "responsive_layout_contract_audit:passed"
  passed = ($responsiveLayoutContractAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "responsive_layout_contract_audit:viewport_and_css_contract_ready"
  passed = ($responsiveLayoutContractAudit.counts.pages_checked -eq 9 -and $responsiveLayoutContractAudit.counts.pages_with_viewport -eq 9 -and $responsiveLayoutContractAudit.counts.release_css_pages -ge 5 -and $responsiveLayoutContractAudit.counts.api_css_pages -ge 3 -and $responsiveLayoutContractAudit.counts.api_route_guide_steps -ge 3 -and $responsiveLayoutContractAudit.counts.responsive_css_files -eq 2 -and $responsiveLayoutContractAudit.counts.failed_checks -eq 0)
})

$termConsistencyAudit = Get-Content -LiteralPath (Join-Path $reportDir "term_consistency_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "term_consistency_audit:passed"
  passed = ($termConsistencyAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "term_consistency_audit:core_terms_and_names_ready"
  passed = ($termConsistencyAudit.counts.pages -eq 9 -and $termConsistencyAudit.counts.term_pairs -ge 14 -and $termConsistencyAudit.counts.preserved_names -ge 13 -and $termConsistencyAudit.counts.forbidden_translations -ge 7 -and $termConsistencyAudit.counts.cn_term -ge 800 -and $termConsistencyAudit.counts.cn_term -eq $termConsistencyAudit.counts.en_term -and $termConsistencyAudit.counts.cn_definition_briefs -ge 92 -and $termConsistencyAudit.counts.cn_tool_options -ge 19 -and $termConsistencyAudit.counts.cn_tool_deep_notes -ge 6 -and $termConsistencyAudit.counts.failed_checks -eq 0)
})

$navigationCoverageAudit = Get-Content -LiteralPath (Join-Path $reportDir "navigation_coverage_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "navigation_coverage_audit:passed"
  passed = ($navigationCoverageAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "navigation_coverage_audit:release_and_api_navigation_ready"
  passed = ($navigationCoverageAudit.counts.release_adjacent_links_present -ge 5 -and $navigationCoverageAudit.counts.api_navigation_assets_present -ge 6 -and $navigationCoverageAudit.counts.api_entry_links_present -ge 3 -and $navigationCoverageAudit.counts.api_entry_cards -ge 3 -and $navigationCoverageAudit.counts.api_route_steps -ge 3 -and $navigationCoverageAudit.counts.api_route_step_links_present -ge 3 -and $navigationCoverageAudit.counts.failed_checks -eq 0)
})

$checks.Add([pscustomobject]@{
  check = "navigation_coverage_audit:api_route_guide_links_ready"
  passed = ($navigationCoverageAudit.counts.api_route_steps -ge 3 -and $navigationCoverageAudit.counts.api_route_step_links_present -ge 3)
})

$sourceProvenanceAudit = Get-Content -LiteralPath (Join-Path $reportDir "source_provenance_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "source_provenance_audit:passed"
  passed = ($sourceProvenanceAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "source_provenance_audit:manifest_entries_ready"
  passed = ($sourceProvenanceAudit.counts.entries -eq 8 -and $sourceProvenanceAudit.counts.primary_scope_entries -eq 2 -and $sourceProvenanceAudit.counts.active_adjacent_scope_entries -eq 6 -and $sourceProvenanceAudit.counts.sphinx_entries -eq 5 -and $sourceProvenanceAudit.counts.doxygen_entries -eq 3 -and $sourceProvenanceAudit.counts.failed_checks -eq 0)
})

$styleAssetContractAudit = Get-Content -LiteralPath (Join-Path $reportDir "style_asset_contract_audit.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "style_asset_contract_audit:passed"
  passed = ($styleAssetContractAudit.passed -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "style_asset_contract_audit:assets_and_styles_ready"
  passed = ($styleAssetContractAudit.counts.doxygen_assets -ge 19 -and $styleAssetContractAudit.counts.sphinx_assets -ge 17 -and $styleAssetContractAudit.counts.release_assets -ge 8 -and $styleAssetContractAudit.counts.release_css_selectors -ge 7 -and $styleAssetContractAudit.counts.api_css_selectors -ge 7 -and $styleAssetContractAudit.counts.pages_checked -ge 6 -and $styleAssetContractAudit.counts.failed_checks -eq 0)
})

$scopeManifest = Get-Content -LiteralPath (Join-Path $reportDir "scope_manifest.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$checks.Add([pscustomobject]@{
  check = "scope_manifest:has_release_index_url"
  passed = (($scopeManifest.primary_scope.official_url -contains "https://openusd.org/release/index.html") -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "scope_manifest:has_api_index_url"
  passed = (($scopeManifest.primary_scope.official_url -contains "https://openusd.org/release/api/index.html") -eq $true)
})

$checks.Add([pscustomobject]@{
  check = "scope_manifest:has_active_adjacent_scope"
  passed = ($scopeManifest.active_adjacent_scope.Count -ge 6)
})

$checks.Add([pscustomobject]@{
  check = "all:no_todo_markers"
  passed = -not (($apiHtml + $releaseHtml + $introHtml + $apiDocsHtml + $glossaryHtml + $toolsetHtml + $overviewHtml + $usdPageHtml) -match "TODO|FIXME")
})

$failed = @($checks | Where-Object { -not $_.passed })
$report = [pscustomobject]@{
  generated_at = (Get-Date).ToString("s")
  root = $Root
  source_urls = @(
    "https://openusd.org/release/index.html",
    "https://openusd.org/release/api/index.html",
    "https://openusd.org/release/glossary.html",
    "https://openusd.org/release/toolset.html",
    "https://openusd.org/release/api/_usd__overview_and_purpose.html",
    "https://openusd.org/release/api/usd_page_front.html"
  )
  output_html = @{
    release_index = $releaseIndex
    glossary = $glossaryPage
    toolset = $toolsetPage
    api_index = $apiIndex
    api_overview = $apiOverview
    usd_page_front = $usdPageFront
    final_html_entry = $finalHtmlEntry
  }
  required_check_count = $checks.Count
  failed_check_count = $failed.Count
  passed = ($failed.Count -eq 0)
  checks = $checks
}

$report | ConvertTo-Json -Depth 4 | Out-File -LiteralPath $reportPath -Encoding UTF8

if ($failed.Count -gt 0) {
  Write-Output "FAILED"
  $failed | Format-Table -AutoSize | Out-String | Write-Output
  exit 1
}

Write-Output "PASSED"
Write-Output $reportPath
