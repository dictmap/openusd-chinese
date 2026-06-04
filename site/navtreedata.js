/*
 @licstart  The following is the entire license notice for the JavaScript code in this file.

 The MIT License (MIT)

 Copyright (C) 1997-2020 by Dimitri van Heesch

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or
 substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @licend  The above is the entire license notice for the JavaScript code in this file
*/
var NAVTREE =
[
  [ "Universal Scene Description", "index.html", [
    [ "Universal Scene Description (USD)", "index.html", null ],
    [ "Overview and Purpose", "_usd__overview_and_purpose.html", [
      [ "Architectural Overview", "_usd__overview_and_purpose.html#Usd_ArchitecturalOverview", [
        [ "The \"base\" package", "_usd__overview_and_purpose.html#Usd_Package_Base", null ],
        [ "The \"usd\" package", "_usd__overview_and_purpose.html#Usd_Package_Usd", null ],
        [ "The \"imaging\" package", "_usd__overview_and_purpose.html#Usd_Package_Imaging", null ],
        [ "The \"usdImaging\" package", "_usd__overview_and_purpose.html#Usd_Package_UsdImaging", null ]
      ] ],
      [ "Python Support, numpy, etc.", "_usd__overview_and_purpose.html#Usd_PythonSupport", null ],
      [ "Quickstart!", "_usd__overview_and_purpose.html#Usd_Quickstart", null ],
      [ "USD: What's the Point, and Why Isn't it Alembic ?", "_usd__overview_and_purpose.html#Usd_Background", null ],
      [ "Related Pages", "_usd__overview_and_purpose.html#Usd_Related", null ]
    ] ],
    [ "Developer Guides", "_developer__guides.html", "_developer__guides" ],
    [ "Arch: Architecture Dependent", "arch_page_front.html", [
      [ "Overview", "arch_page_front.html#arch_overview", null ]
    ] ],
    [ "Gf : Graphics Foundations", "gf_page_front.html", [
      [ "Overview", "gf_page_front.html#gf_overview", null ]
    ] ],
    [ "Js: JSON I/O", "js_page_front.html", [
      [ "Overview", "js_page_front.html#js_overview", null ]
    ] ],
    [ "Plug: Plugin Framework", "plug_page_front.html", [
      [ "Overview", "plug_page_front.html#Overview", null ],
      [ "Plug-In Discovery & Registration", "plug_page_front.html#Plug_Discovery", null ],
      [ "Usage", "plug_page_front.html#Usage", null ],
      [ "Metadata", "plug_page_front.html#Plug-In", null ]
    ] ],
    [ "Tf: Tools Foundations", "tf_page_front.html", "tf_page_front" ],
    [ "Trace: Performance tracking", "trace_page_front.html", "trace_page_front" ],
    [ "Regressive Splines in USD", "page_ts_regression.html", [
      [ "When Regression Arises", "page_ts_regression.html#autotoc_md4", null ],
      [ "Interactive Anti-Regression Demo", "page_ts_regression.html#autotoc_md5", null ],
      [ "Anti-Regression Strategies", "page_ts_regression.html#autotoc_md6", null ],
      [ "Center and Fringe Behavior", "page_ts_regression.html#autotoc_md7", null ],
      [ "API", "page_ts_regression.html#autotoc_md8", [
        [ "Anti-Regression Contexts", "page_ts_regression.html#autotoc_md9", null ],
        [ "Current Authoring Mode", "page_ts_regression.html#autotoc_md10", null ],
        [ "Default Authoring Mode", "page_ts_regression.html#autotoc_md11", null ],
        [ "Authoring Mode Overrides", "page_ts_regression.html#autotoc_md12", null ],
        [ "Contain Mode", "page_ts_regression.html#autotoc_md13", null ],
        [ "Interactive Modes", "page_ts_regression.html#autotoc_md14", null ]
      ] ],
      [ "Load-Time Policies", "page_ts_regression.html#autotoc_md15", null ]
    ] ],
    [ "USD Anim Project Status", "page_ts_status.html", [
      [ "Mostly Complete", "page_ts_status.html#autotoc_md16", null ],
      [ "Still to Come", "page_ts_status.html#autotoc_md17", [
        [ "UNIMPLEMENTED API", "page_ts_status.html#autotoc_md18", [
          [ "Hermite Evaluation", "page_ts_status.html#autotoc_md19", null ],
          [ "Evaluation Variations", "page_ts_status.html#autotoc_md20", null ],
          [ "Spline Editing", "page_ts_status.html#autotoc_md21", null ],
          [ "Looping", "page_ts_status.html#autotoc_md22", null ],
          [ "Queries", "page_ts_status.html#autotoc_md23", null ]
        ] ],
        [ "ADDITIONAL FEATURES", "page_ts_status.html#autotoc_md24", [
          [ "Automatic Tangents", "page_ts_status.html#autotoc_md25", null ],
          [ "Reduction", "page_ts_status.html#autotoc_md26", null ]
        ] ],
        [ "USD INTEGRATION", "page_ts_status.html#autotoc_md27", [
          [ "Attribute Value Resolution", "page_ts_status.html#autotoc_md28", null ],
          [ "usdview", "page_ts_status.html#autotoc_md29", null ],
          [ "Scalar xformOps", "page_ts_status.html#autotoc_md30", null ]
        ] ],
        [ "TESTS AND DOCUMENTATION", "page_ts_status.html#autotoc_md31", null ]
      ] ]
    ] ],
    [ "The TsTest Framework", "page_ts_ts_test.html", null ],
    [ "Vt : Value Types", "vt_page_front.html", [
      [ "Overview", "vt_page_front.html#vt_overview", null ],
      [ "Type Erasure with VtValue", "vt_page_front.html#vt_value", null ],
      [ "Shared Arrays - VtArray", "vt_page_front.html#vt_array", null ]
    ] ],
    [ "Work : Multi-threaded Dispatch", "work_page_front.html", [
      [ "Summary", "work_page_front.html#work_Summary", null ],
      [ "Initializing and Limiting Multithreading", "work_page_front.html#work_Initialization", null ],
      [ "Simple \"Parallel For\" Example", "work_page_front.html#work_Example", null ],
      [ "Providing an Alternate Work Implementation", "work_page_front.html#work_Implementation", [
        [ "Parallel Algorithms API", "work_page_front.html#work_Impl_Algorithms", null ],
        [ "Concurrency Limiting API", "work_page_front.html#work_Impl_Limiting", null ],
        [ "Dispatching Tasks API", "work_page_front.html#work_Impl_Dispatch", null ],
        [ "Caveats of an Alternate Work Backend.", "work_page_front.html#work_Impl_Caveats", null ]
      ] ]
    ] ],
    [ "Ar: Asset Resolution", "ar_page_front.html", [
      [ "Overview", "ar_page_front.html#ar_overview", null ],
      [ "ArResolver", "ar_page_front.html#ar_resolver", [
        [ "Primary Resolver", "ar_page_front.html#ar_primary_resolver", null ],
        [ "URI/IRI Resolvers", "ar_page_front.html#ar_uri_resolvers", null ]
      ] ],
      [ "Asset Path Resolution", "ar_page_front.html#ar_resolution", null ],
      [ "Resolver Contexts", "ar_page_front.html#ar_resolver_contexts", null ],
      [ "Resolver Scoped Caches", "ar_page_front.html#ar_resolver_scoped_cache", null ],
      [ "Asset Paths and Resolved Paths", "ar_page_front.html#ar_paths", null ]
    ] ],
    [ "Kind : Extensible Categorization", "kind_page_front.html", [
      [ "The Core Kind Hierarchy", "kind_page_front.html#kind_coreKinds", null ],
      [ "Extending the KindRegistry", "kind_page_front.html#kind_extensions", null ]
    ] ],
    [ "Pcp : PrimCache Population (Composition)", "pcp_page_front.html", [
      [ "Introduction", "pcp_page_front.html#pcp_Intro", null ],
      [ "Motivation", "pcp_page_front.html#pcp_Motivation", null ],
      [ "Capabilities", "pcp_page_front.html#pcp_Capabilities", null ],
      [ "Usage", "pcp_page_front.html#pcp_Usage", [
        [ "The PcpCache", "pcp_page_front.html#pcp_PcpCache", null ],
        [ "Computation Queries", "pcp_page_front.html#pcp_Queries", null ],
        [ "Errors", "pcp_page_front.html#pcp_Errors", null ],
        [ "Dependencies", "pcp_page_front.html#pcp_Dependencies", null ],
        [ "Namespace Editing", "pcp_page_front.html#pcp_NamespaceEditing", null ],
        [ "Change Processing", "pcp_page_front.html#pcp_ChangeProcessing", null ],
        [ "Path Translation", "pcp_page_front.html#pcp_PathTranslation", null ],
        [ "Diagnostics", "pcp_page_front.html#pcp_Diagnostics", null ]
      ] ]
    ] ],
    [ "Boolean Expressions", "md_pxr_usd_sdf_doxygen_boolean_expressions.html", null ],
    [ "Sdf : Scene Description Foundations", "sdf_page_front.html", "sdf_page_front" ],
    [ "Sdr: Shader Definition Registry", "sdr_page_front.html", "sdr_page_front" ],
    [ "Usd : Universal Scene Description (Core)", "usd_page_front.html", "usd_page_front" ],
    [ "UsdAbc : Alembic File Format Plugin", "usdabc_page_front.html", [
      [ "Overview", "usdabc_page_front.html#usdAbc_overview", null ],
      [ "Behavior", "usdabc_page_front.html#usdAbc_behavior", [
        [ "SDF_FORMAT_ARGS", "usdabc_page_front.html#SDF_FORMAT_ARGS", null ],
        [ "TfEnvSettings", "usdabc_page_front.html#TfEnvSettings", null ]
      ] ]
    ] ],
    [ "UsdDraco : Draco File Format Plugin", "usddraco_page_front.html", [
      [ "Overview", "usddraco_page_front.html#usdDraco_overview", null ]
    ] ],
    [ "UsdGeom : USD Geometry Schema", "usd_geom_page_front.html", [
      [ "Geometric Primitive Schemas", "usd_geom_page_front.html#UsdGeom_Structure", [
        [ "UsdGeomImageable", "usd_geom_page_front.html#UsdGeom_Imageable", null ],
        [ "UsdGeomXformable", "usd_geom_page_front.html#UsdGeom_Xformable", null ],
        [ "UsdGeomGprim", "usd_geom_page_front.html#UsdGeom_Gprim", null ],
        [ "UsdGeomPointInstancer", "usd_geom_page_front.html#UsdGeom_PointInstancer", null ],
        [ "UsdGeomCamera", "usd_geom_page_front.html#UsdGeom_Camera", null ],
        [ "UsdGeomModelAPI", "usd_geom_page_front.html#UsdGeom_ModelAPI", null ]
      ] ],
      [ "Primvars (Primitive Variables)", "usd_geom_page_front.html#UsdGeom_PrimvarsOverview", null ],
      [ "Imageable Purpose", "usd_geom_page_front.html#UsdGeom_ImageablePurpose", null ],
      [ "Linear Algebra in UsdGeom", "usd_geom_page_front.html#UsdGeom_LinAlgBasics", null ],
      [ "Coordinate System, Winding Order, Orientation, and Surface Normals", "usd_geom_page_front.html#UsdGeom_WindingOrder", null ],
      [ "Applying Timesampled Velocities to Geometry", "usd_geom_page_front.html#UsdGeom_VelocityInterpolation", [
        [ "Computing a Single Requested Position", "usd_geom_page_front.html#UsdGeom_VelocityAtOneSample", null ],
        [ "Computing a Range of Requested Positions", "usd_geom_page_front.html#UsdGeom_VelocityAtMultipleSamples", null ]
      ] ],
      [ "MotionAPI: Modulating Motion and Motion Blur", "usd_geom_page_front.html#UsdGeom_MotionAPI", [
        [ "Effectively Applying motion:blurScale", "usd_geom_page_front.html#UsdGeomMotionAPI_blurScale", null ]
      ] ],
      [ "Stage Metrics", "usd_geom_page_front.html#UsdGeom_StageMetrics", null ]
    ] ],
    [ "UsdHydra : USD Hydra Schemas", "usd_hydra_page_front.html", [
      [ "Overview", "usd_hydra_page_front.html#usdHydra_overview", null ]
    ] ],
    [ "UsdLux : USD Lighting Schema", "usd_lux_page_front.html", [
      [ "Overview", "usd_lux_page_front.html#usdLux_overview", null ],
      [ "Design Notes and Usage Guide", "usd_lux_page_front.html#usdLux_Notes", [
        [ "LightAPI and \"Being a Light\"", "usd_lux_page_front.html#usdLux_LightAPIAndBeingALight", null ],
        [ "Encapsulation Rules", "usd_lux_page_front.html#usdLux_Encapsulation", null ],
        [ "Geometry", "usd_lux_page_front.html#usdLux_Geometry", null ],
        [ "Quantities and Units", "usd_lux_page_front.html#usdLux_quantities", [
          [ "Exposure", "usd_lux_page_front.html#usdLux_quantities_exposure", null ]
        ] ],
        [ "Properties & Behavior", "usd_lux_page_front.html#usdLux_Behavior", null ],
        [ "Extensibility", "usd_lux_page_front.html#Extensibility", null ],
        [ "Plugin Lights and Light Filters", "usd_lux_page_front.html#usdLux_PluginSchemas", null ]
      ] ]
    ] ],
    [ "UsdMedia : USD Media Schema", "usd_media_page_front.html", [
      [ "Overview", "usd_media_page_front.html#usdMedia_overview", null ]
    ] ],
    [ "UsdMtlx : MaterialX File Format and Shader Plugins", "usd_mtlx_page_front.html", [
      [ "Overview", "usd_mtlx_page_front.html#usdMtlx_overview", null ],
      [ "Concept Mappings", "usd_mtlx_page_front.html#usdMtlx_concepts", null ],
      [ "Unsupported MaterialX Features", "usd_mtlx_page_front.html#usdMtlx_unsupported", null ]
    ] ],
    [ "UsdPhysics : USD Physics Schema", "usd_physics_page_front.html", [
      [ "Purpose and Scope", "usd_physics_page_front.html#usdPhysics_purpose_and_scope", null ],
      [ "Overall Design Concerns", "usd_physics_page_front.html#usdPhysics_overall_design", [
        [ "Rigid Body Simulation Primer", "usd_physics_page_front.html#usdPhysics_rigid_body", null ],
        [ "USD Implementation", "usd_physics_page_front.html#usdPhysics_usd_implementation", [
          [ "Disambiguation", "usd_physics_page_front.html#usdPhysics_disambiguation", null ],
          [ "Fundamental Editing Capabilities", "usd_physics_page_front.html#usdPhysics_fundamental_editing", null ],
          [ "Physics Scenes", "usd_physics_page_front.html#usdPhysics_physics_scenes", null ],
          [ "Types", "usd_physics_page_front.html#usdPhysics_types", null ],
          [ "Units", "usd_physics_page_front.html#usdPhysics_units", null ],
          [ "Default Values", "usd_physics_page_front.html#usdPhysics_default_values", null ],
          [ "Rigid Bodies", "usd_physics_page_front.html#usdPhysics_rigid_bodies", null ],
          [ "Interaction with the USD hierarchy", "usd_physics_page_front.html#usdPhysics_interaction_with_usd", null ],
          [ "Sleep", "usd_physics_page_front.html#usdPhysics_rb_sleep", null ],
          [ "Kinematic Bodies", "usd_physics_page_front.html#usdPhysics_kinematic_bodies", null ],
          [ "Animation of Attributes", "usd_physics_page_front.html#usdPhysics_animation_of_attributes", null ],
          [ "Body Mass Properties", "usd_physics_page_front.html#usdPhysics_body_mass_properties", null ],
          [ "Collision Shapes", "usd_physics_page_front.html#usdPhysics_collision_shapes", null ],
          [ "Turning Meshes into Shapes", "usd_physics_page_front.html#usdPhysics_mesh_into_shapes", null ],
          [ "Physics Materials", "usd_physics_page_front.html#usdPhysics_physics_materials", null ],
          [ "Plane Shapes", "usd_physics_page_front.html#usdPhysics_plane_shapes", null ],
          [ "Collision Filtering", "usd_physics_page_front.html#usdPhysics_collision_filtering", null ],
          [ "Pairwise Filtering", "usd_physics_page_front.html#usdPhysics_pairwise_filtering", null ],
          [ "Joints", "usd_physics_page_front.html#usdPhysics_joints", null ],
          [ "Joint Reference Frames", "usd_physics_page_front.html#usdPhysics_joint_reference_frames", null ],
          [ "Jointed Bodies", "usd_physics_page_front.html#usdPhysics_jointed_bodies", null ],
          [ "Joint Collision Filtering", "usd_physics_page_front.html#usdPhysics_joint_collision_filtering", null ],
          [ "Breaking and Disabling Joints", "usd_physics_page_front.html#usdPhysics_breaking_disabling_joints", null ],
          [ "Joint Subtypes", "usd_physics_page_front.html#usdPhysics_joint_subtypes", null ],
          [ "Joint Limits and Drives", "usd_physics_page_front.html#usdPhysics_limits_drives", null ],
          [ "Articulations", "usd_physics_page_front.html#usdPhysics_articulations", null ]
        ] ],
        [ "Examples", "usd_physics_page_front.html#usdPhysics_examples", [
          [ "Box on Box", "usd_physics_page_front.html#usdPhysics_box_on_box", null ],
          [ "Box on Quad", "usd_physics_page_front.html#usdPhysics_box_on_quad", null ],
          [ "Spheres with Materials", "usd_physics_page_front.html#usdPhysics_spheres_with_material", null ],
          [ "Group Filtering", "usd_physics_page_front.html#usdPhysics_group_filtering", null ],
          [ "Pair Filtering", "usd_physics_page_front.html#usdPhysics_pair_filtering", null ],
          [ "Joint", "usd_physics_page_front.html#usdPhysics_joint_example", null ],
          [ "Distance Joint", "usd_physics_page_front.html#usdPhysics_distance_joint_example", null ],
          [ "Nested Articulation", "usd_physics_page_front.html#usdPhysics_nested_articulation_example", null ]
        ] ]
      ] ],
      [ "Physics Parsing Utils Overview.", "usd_physics_page_front.html#USD", [
        [ "Purpose and Scope", "usd_physics_page_front.html#usdPhysics_parsing_purpose_and_scope", null ],
        [ "Specification", "usd_physics_page_front.html#usdPhysics_parsing", null ],
        [ "Physics Parsing Parameters", "usd_physics_page_front.html#usdPhysics_utils_params", null ],
        [ "Physics Parsing Determinism", "usd_physics_page_front.html#usdPhysics_utils_determinism", null ],
        [ "Physics Object Descriptor", "usd_physics_page_front.html#usdPhysics_object_descriptor", null ],
        [ "Physics Scene Descriptor", "usd_physics_page_front.html#usdPhysics_scene_descriptor", [
          [ "Physics Scene Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_scene_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics RigidBody Material Descriptor", "usd_physics_page_front.html#usdPhysics_material_descriptor", [
          [ "Physics RigidBody Material Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_material_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics Collision Group Descriptor", "usd_physics_page_front.html#usdPhysics_collision_group_descriptor", [
          [ "Physics Collision Group Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_collision_group_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics RigidBody Descriptor", "usd_physics_page_front.html#usdPhysics_rigid_body_descriptor", [
          [ "Physics RigidBody Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_rigid_body_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics Shape Descriptor", "usd_physics_page_front.html#usdPhysics_collision_descriptor", null ],
        [ "Physics Sphere Shape Descriptor", "usd_physics_page_front.html#usdPhysics_sphere_collision_descriptor", null ],
        [ "Physics Capsule Shape Descriptor", "usd_physics_page_front.html#usdPhysics_capsule_collision_descriptor", null ],
        [ "Physics Cylinder Shape Descriptor", "usd_physics_page_front.html#usdPhysics_cylinder_collision_descriptor", null ],
        [ "Physics Cone Shape Descriptor", "usd_physics_page_front.html#usdPhysics_cone_collision_descriptor", null ],
        [ "Physics Cube Shape Descriptor", "usd_physics_page_front.html#usdPhysics_cube_collision_descriptor", null ],
        [ "Physics Plane Shape Descriptor", "usd_physics_page_front.html#usdPhysics_plane_collision_descriptor", null ],
        [ "Physics Mesh Shape Descriptor", "usd_physics_page_front.html#usdPhysics_mesh_collision_descriptor", null ],
        [ "Physics Sphere Points Shape Descriptor", "usd_physics_page_front.html#usdPhysics_sphere_points_collision_descriptor", null ],
        [ "Physics Custom Shape Descriptor", "usd_physics_page_front.html#usdPhysics_custom_collision_descriptor", [
          [ "Physics Collision Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_collision_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics Joint Descriptor", "usd_physics_page_front.html#usdPhysics_joint_descriptor", null ],
        [ "Physics Fixed Joint Descriptor", "usd_physics_page_front.html#usdPhysics_fixed_joint_descriptor", null ],
        [ "Physics Revolute Joint Descriptor", "usd_physics_page_front.html#usdPhysics_revolute_joint_descriptor", null ],
        [ "Physics Prismatic Joint Descriptor", "usd_physics_page_front.html#usdPhysics_prismatic_joint_descriptor", null ],
        [ "Physics Spherical Joint Descriptor", "usd_physics_page_front.html#usdPhysics_spherical_joint_descriptor", null ],
        [ "Physics Distance Joint Descriptor", "usd_physics_page_front.html#usdPhysics_distance_joint_descriptor", null ],
        [ "Physics D6 Joint Descriptor", "usd_physics_page_front.html#usdPhysics_d6_joint_descriptor", null ],
        [ "Physics Custom Joint Descriptor", "usd_physics_page_front.html#usdPhysics_custom_joint_descriptor", [
          [ "Physics Joint Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_joint_descriptor_simulation_owner", null ]
        ] ],
        [ "Physics Articulation Descriptor", "usd_physics_page_front.html#usdPhysics_articulation_descriptor", [
          [ "Physics Articulation Simulation Owner Behavior", "usd_physics_page_front.html#usdPhysics_articulation_descriptor_simulation_owner", null ]
        ] ]
      ] ]
    ] ],
    [ "UsdProc : USD Schemas for Procedurals", "usd_proc_page_front.html", [
      [ "Overview", "usd_proc_page_front.html#usdProc_overview", null ]
    ] ],
    [ "UsdRender : USD Render Schema", "usd_render_page_front.html", [
      [ "Structure and Organization", "usd_render_page_front.html#UsdRenderStructureAndOrganization", [
        [ "Concepts", "usd_render_page_front.html#UsdRenderConcepts", null ],
        [ "Reading settings", "usd_render_page_front.html#UsdRenderReadingSettings", null ],
        [ "Conventions", "usd_render_page_front.html#UsdRenderConventions", null ]
      ] ],
      [ "How settings affect rendering", "usd_render_page_front.html#UsdRenderHowSettingsAffectRendering", [
        [ "Camera", "usd_render_page_front.html#UsdRenderCamera", null ],
        [ "Pixels", "usd_render_page_front.html#UsdRenderPixels", [
          [ "Aspect Ratio Policy", "usd_render_page_front.html#UsdRenderAspectRatioPolicy", null ],
          [ "Cropping, Tiling, Overscan", "usd_render_page_front.html#UsdRenderCroppingTilingOverscan", null ],
          [ "Rasterization Rule", "usd_render_page_front.html#UsdRenderRasterizationRule", null ]
        ] ]
      ] ],
      [ "Extensions", "usd_render_page_front.html#UsdRenderExtensinos", null ],
      [ "Example Usage", "usd_render_page_front.html#UsdRenderExampleUsage", null ]
    ] ],
    [ "UsdRi: USD RenderMan Utilities", "usd_ri_page_front.html", [
      [ "Overview", "usd_ri_page_front.html#usdRi_overview", null ]
    ] ],
    [ "UsdSemantics : Semantic Labeling of Scenes", "usd_semantics_overview.html", [
      [ "Inheritance and Comparison to Primvars", "usd_semantics_overview.html#autotoc_md54", null ],
      [ "Taxonomy and Comparison to Model Hierarchy", "usd_semantics_overview.html#autotoc_md55", null ],
      [ "Time Varying Considerations", "usd_semantics_overview.html#autotoc_md56", [
        [ "Intervals and State Transitions", "usd_semantics_overview.html#autotoc_md57", null ]
      ] ],
      [ "Filtering and Selection by Label", "usd_semantics_overview.html#autotoc_md58", null ],
      [ "Relationship to Other Domains", "usd_semantics_overview.html#autotoc_md59", [
        [ "UsdGeom", "usd_semantics_overview.html#autotoc_md60", [
          [ "Subsets", "usd_semantics_overview.html#autotoc_md61", null ]
        ] ],
        [ "UsdShade", "usd_semantics_overview.html#autotoc_md62", [
          [ "Nested Materials", "usd_semantics_overview.html#autotoc_md63", null ],
          [ "Shaders and Node Graphs", "usd_semantics_overview.html#autotoc_md64", null ]
        ] ],
        [ "UsdRender (To be proposed and implemented)", "usd_semantics_overview.html#autotoc_md65", null ]
      ] ],
      [ "Examples", "usd_semantics_overview.html#autotoc_md66", null ]
    ] ],
    [ "UsdShade : USD Shading Schema", "usd_shade_page_front.html", [
      [ "UsdShade Networks", "usd_shade_page_front.html#UsdShadeNetworks", null ],
      [ "Encapsulation and Sharing", "usd_shade_page_front.html#UsdShadeEncapsulation", [
        [ "Containers vs Primitive Shading Nodes", "usd_shade_page_front.html#UsdShadeContainers", null ],
        [ "Exposing parameters on containers", "usd_shade_page_front.html#UsdShadePublicUI", null ]
      ] ],
      [ "Connectability Rules for UsdShade Types", "usd_shade_page_front.html#UsdShadeConnectability", null ],
      [ "Connections and Dataflow in UsdShade", "usd_shade_page_front.html#UsdShadeConnections", [
        [ "Valid Shader Connections Win Over Input Values", "usd_shade_page_front.html#UsdShadeConnectOverInput", null ],
        [ "Resolving Interface Connections", "usd_shade_page_front.html#UsdShadeResolvingInterface", null ],
        [ "Connection Resolution Utilities", "usd_shade_page_front.html#UsdShadeAttributeResolution", null ]
      ] ],
      [ "UsdShade Based Shader Definition", "usd_shade_page_front.html#UsdShadeShaderDefinition", null ],
      [ "Using Shader Networks with Geometry", "usd_shade_page_front.html#UsdShadeMaterialBinding", null ]
    ] ],
    [ "UsdShaders :  Definitions and Implementations of Usd* Shader Nodes", "usd_shaders_page_front.html", [
      [ "Overview", "usd_shaders_page_front.html#usdShaders_overview", null ]
    ] ],
    [ "UsdSkel : USD Skeleton Schema and API", "usd_skel_page_front.html", "usd_skel_page_front" ],
    [ "UsdUI: USD UI Schemas", "usd_u_i_page_front.html", [
      [ "Overview", "usd_u_i_page_front.html#usdUI_overview", null ],
      [ "Accessibility Information", "usd_u_i_page_front.html#usdUI_accessibility", null ],
      [ "UI Hints", "usd_u_i_page_front.html#usdUI_hintsOverview", null ]
    ] ],
    [ "UsdUtils: USD Utilities", "usd_utils_page_front.html", [
      [ "Overview", "usd_utils_page_front.html#usdUtils_overview", null ],
      [ "User Processing Functions", "usd_utils_page_front.html#usdUtils_userProcessingFunctions", [
        [ "Defining A Procession Function", "usd_utils_page_front.html#usdUtils_defineProcessingFunc", null ],
        [ "Modifying AssetPaths and Dependencies", "usd_utils_page_front.html#usdUtils_modifyAssetPathsAndDeps", null ],
        [ "Removing Asset paths", "usd_utils_page_front.html#usdUtils_removingAssetPaths", null ]
      ] ]
    ] ],
    [ "UsdVol : USD Volume Schema", "usd_vol_page_front.html", [
      [ "Overview", "usd_vol_page_front.html#usdVol_overview", null ],
      [ "Volume Schemas", "usd_vol_page_front.html#usdVol_schemas", [
        [ "Volume", "usd_vol_page_front.html#Volume", null ],
        [ "FieldBase", "usd_vol_page_front.html#FieldBase", null ],
        [ "FieldAsset", "usd_vol_page_front.html#FieldAsset", null ],
        [ "OpenVDBAsset", "usd_vol_page_front.html#OpenVDBAsset", null ],
        [ "Field3DAsset", "usd_vol_page_front.html#Field3DAsset", null ]
      ] ],
      [ "Example Usage", "usd_vol_page_front.html#usdVol_example", null ],
      [ "Usage Notes", "usd_vol_page_front.html#usdVol_usage", [
        [ "Namespace Organization and Transformation", "usd_vol_page_front.html#usdVol_namespace_org", null ],
        [ "Field Relationships Establish Consumer Field Names", "usd_vol_page_front.html#usdVol_fieldNaming", null ],
        [ "Why is OpenVDBAsset not a FileFormat plugin?", "usd_vol_page_front.html#usdVol_noFileFormat", null ]
      ] ],
      [ "Particle Field Schemas", "usd_vol_page_front.html#usdVol_particleFieldSchemas", [
        [ "Composable Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_composableSchema", null ],
        [ "ParticleField Base Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_particleFieldBaseSchema", null ],
        [ "Base Applied Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_baseAppliedSchema", null ],
        [ "Attribute Providing Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_attributeProvidingSchema", null ],
        [ "Kernel Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_KernelSchema", null ],
        [ "Radiance Schema", "usd_vol_page_front.html#usdVol_particleFieldSchemas_RadianceSchema", null ]
      ] ]
    ] ],
    [ "Glf: Utility classes for OpenGL", "glf_page_front.html", null ],
    [ "Hd : The Hydra Framework", "hd_page_front.html", null ],
    [ "HdEmbree : Embree-based hydra renderer plugin.", "hd_embree_page_front.html", null ],
    [ "HdSt : Rendering functionality for HdStorm", "hd_st_page_front.html", [
      [ "Overview", "hd_st_page_front.html#hdSt_overview", null ]
    ] ],
    [ "HdStorm : Real-time Hydra renderer plugin", "hd_storm_page_front.html", null ],
    [ "Hdx : Hydra extensions", "hdx_page_front.html", [
      [ "Overview", "hdx_page_front.html#hdx_overview", null ]
    ] ],
    [ "Hio: Hydra Resource I/O", "hio_page_front.html", null ],
    [ "SdrGlslfx : Glslfx parser for Sdr", "sdr_glslfx_page_front.html", [
      [ "Overview", "sdr_glslfx_page_front.html#sdrGlslfx_overview", null ]
    ] ],
    [ "UsdAppUtils: USD Application Utilities", "usd_app_utils_page_front.html", [
      [ "Overview", "usd_app_utils_page_front.html#usdAppUtils_overview", [
        [ "Frame Format Strings", "usd_app_utils_page_front.html#UsdAppUtils_frame_format_strings", null ]
      ] ]
    ] ],
    [ "Usdview Black Box Testing", "md_pxr_usd_imaging_usdviewq_black_box_testing.html", [
      [ "Viewport prim Vising and Invising", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md103", [
        [ "Goal", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md104", null ],
        [ "Method", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md105", null ]
      ] ],
      [ "Vis and Draw Mode Columns Do Not Affect Selection", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md106", [
        [ "Goal", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md107", null ]
      ] ],
      [ "Prim View Framing", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md108", [
        [ "Goal", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md109", null ],
        [ "Method", "md_pxr_usd_imaging_usdviewq_black_box_testing.html#autotoc_md110", null ]
      ] ]
    ] ],
    [ "Development Practices For usdview", "md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html", [
      [ "Modifying GUI", "md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html#autotoc_md112", null ],
      [ "Testing", "md_pxr_usd_imaging_usdviewq__r_e_a_d_m_e.html#autotoc_md113", null ]
    ] ],
    [ "Ef: Execution Foundation", "md_pxr_exec_ef__r_e_a_d_m_e.html", null ],
    [ "Esf: Execution Scene Foundation", "md_pxr_exec_esf__r_e_a_d_m_e.html", null ],
    [ "EsfUsd: Execution Scene Foundation for Usd", "md_pxr_exec_esf_usd__r_e_a_d_m_e.html", null ],
    [ "OpenExec System Design", "page__execution__system__design.html", [
      [ "Prelude: Object Model", "page__execution__system__design.html#autotoc_md148", null ],
      [ "Computations", "page__execution__system__design.html#Exec_System_Design_Computations", null ],
      [ "Phases of Execution", "page__execution__system__design.html#autotoc_md149", [
        [ "Compilation", "page__execution__system__design.html#Exec_System_Design_Compilation", null ],
        [ "Scheduling", "page__execution__system__design.html#Exec_System_Design_Scheduling", null ],
        [ "Evaluation", "page__execution__system__design.html#Exec_System_Design_Evaluation", null ]
      ] ],
      [ "Engine Architecture", "page__execution__system__design.html#autotoc_md150", [
        [ "Network", "page__execution__system__design.html#Exec_System_Design_Network", null ],
        [ "Schedulers", "page__execution__system__design.html#autotoc_md151", null ],
        [ "Data Managers", "page__execution__system__design.html#autotoc_md152", null ],
        [ "Executors", "page__execution__system__design.html#autotoc_md153", null ]
      ] ]
    ] ],
    [ "Exec: Execution sytem core", "md_pxr_exec_exec__r_e_a_d_m_e.html", null ],
    [ "ExecGeom: Execution for UsdGeom", "md_pxr_exec_exec_geom__r_e_a_d_m_e.html", null ],
    [ "ExecIr: OpenExec implementation of invertible rigs", "md_pxr_exec_exec_ir__r_e_a_d_m_e.html", null ],
    [ "OpenExec Overview", "md_pxr_exec_exec_usd_docs_overview.html", [
      [ "OpenExec Concepts", "md_pxr_exec_exec_usd_docs_overview.html#section_Concepts", [
        [ "Computations", "md_pxr_exec_exec_usd_docs_overview.html#autotoc_md160", [
          [ "Plugin Computations", "md_pxr_exec_exec_usd_docs_overview.html#autotoc_md161", null ],
          [ "Builtin Computations", "md_pxr_exec_exec_usd_docs_overview.html#autotoc_md162", null ]
        ] ]
      ] ],
      [ "Tutorials", "md_pxr_exec_exec_usd_docs_overview.html#section_Tutorials", null ],
      [ "Advanced Topics", "md_pxr_exec_exec_usd_docs_overview.html#section_AdvancedTopics", null ]
    ] ],
    [ "OpenExec Tutorial 1: Computing Values", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html", [
      [ "Overview", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md164", null ],
      [ "Create a UsdStage", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md165", null ],
      [ "Create an ExecUsdSystem", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md166", null ],
      [ "Build an ExecUsdRequest", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md167", null ],
      [ "Prepare the request", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md168", null ],
      [ "Compute values", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md169", null ],
      [ "Extract computed values", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md170", null ],
      [ "Putting it all together", "md_pxr_exec_exec_usd_docs_tutorial1_computing_values.html#autotoc_md171", null ]
    ] ],
    [ "OpenExec Tutorial 2: Defining Schema Computations", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html", [
      [ "Overview", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md173", null ],
      [ "Plugin Metadata", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md174", null ],
      [ "Computation Registration", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md175", [
        [ "Registration macro", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md176", null ],
        [ "Initiating a computation registration", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md177", null ],
        [ "Input parameters", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md178", null ],
        [ "Callback function", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md179", null ]
      ] ],
      [ "Putting it all together", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md180", null ],
      [ "Caveats", "md_pxr_exec_exec_usd_docs_tutorial2_defining_computations.html#autotoc_md181", null ]
    ] ],
    [ "ExecUsd: Execution system for Usd", "md_pxr_exec_exec_usd__r_e_a_d_m_e.html", null ],
    [ "Vdf: Vectorized Data Flow", "md_pxr_exec_vdf__r_e_a_d_m_e.html", [
      [ "Key Concepts", "md_pxr_exec_vdf__r_e_a_d_m_e.html#autotoc_md184", null ]
    ] ],
    [ "Validation", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html", [
      [ "Running Validator Tests", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#running_validator_tests", null ],
      [ "Creating Custom Validators", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#creating_custom_validators", [
        [ "Plugin Validators", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md186", null ],
        [ "Explicit Validators", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#explicit_validators", null ],
        [ "Choosing a Registration Path", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#choosing_registration_path", null ],
        [ "Adding Fixers", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md187", null ]
      ] ],
      [ "Creating Custom Validators in Python", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#python_validators", [
        [ "Performance Considerations", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#python_validator_performance", null ],
        [ "Task Function Signatures", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md188", null ],
        [ "Explicit Registration Examples", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md189", [
          [ "Layer Validator", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md190", null ],
          [ "Stage Validator", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md191", null ],
          [ "Prim Validator", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md192", null ]
        ] ],
        [ "Plugin Registration Example", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md193", null ],
        [ "How Python Plugin Validators Are Triggered", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#python_plugin_triggering", [
          [ "Python Plugin Directory Structure", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md194", null ],
          [ "Example plugInfo.json (Python scenario)", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md195", null ],
          [ "Example <strong>init</strong>.py", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md196", null ]
        ] ],
        [ "Running a Python Validator", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md197", null ],
        [ "Grouping Validators Into a Suite", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md198", null ],
        [ "Notes", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md199", null ]
      ] ],
      [ "Additional Examples", "md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md200", null ]
    ] ],
    [ "Deprecated List", "deprecated.html", null ],
    [ "Modules", "modules.html", "modules" ],
    [ "Namespaces", "namespaces.html", [
      [ "Namespace List", "namespaces.html", "namespaces_dup" ],
      [ "Namespace Members", "namespacemembers.html", [
        [ "All", "namespacemembers.html", null ],
        [ "Functions", "namespacemembers_func.html", null ],
        [ "Typedefs", "namespacemembers_type.html", null ]
      ] ]
    ] ],
    [ "Classes", "annotated.html", [
      [ "Class List", "annotated.html", "annotated_dup" ],
      [ "Class Index", "classes.html", null ],
      [ "Class Hierarchy", "hierarchy.html", "hierarchy" ],
      [ "Class Members", "functions.html", [
        [ "All", "functions.html", "functions_dup" ],
        [ "Functions", "functions_func.html", "functions_func" ],
        [ "Variables", "functions_vars.html", "functions_vars" ],
        [ "Typedefs", "functions_type.html", null ],
        [ "Enumerations", "functions_enum.html", null ],
        [ "Enumerator", "functions_eval.html", null ],
        [ "Related Functions", "functions_rela.html", "functions_rela" ]
      ] ]
    ] ],
    [ "Files", "files.html", [
      [ "File List", "files.html", "files_dup" ],
      [ "File Members", "globals.html", [
        [ "All", "globals.html", "globals_dup" ],
        [ "Functions", "globals_func.html", "globals_func" ],
        [ "Variables", "globals_vars.html", null ],
        [ "Typedefs", "globals_type.html", null ],
        [ "Enumerations", "globals_enum.html", null ],
        [ "Enumerator", "globals_eval.html", null ],
        [ "Macros", "globals_defs.html", null ]
      ] ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"_c_l_i11_8h_source.html",
"_usd_skel__intro.html#UsdSkel_PointSkinning",
"binding_map_8h_source.html",
"class_ef___lofted_output_set.html",
"class_esf_property_interface.html#aeff47d0135d6ac4f572793339c54f2d0",
"class_gf_dual_quatf.html#ac8b4a24a36d24e28a378f697be64952b",
"class_gf_matrix2f.html#a93d1201d019b85aa31f77408d58e8587",
"class_gf_matrix4f.html#a2fad5824f4f505d06c230327616c5840",
"class_gf_range1d.html#a4dfefdf26c2d2be047d695527ea114f3",
"class_gf_ray.html#af5c6c41c10c294e4e4323ece1f721351",
"class_gf_vec2i.html#ad79cf4c4486794ed5c5c6801eacaa5d9",
"class_glf_draw_target.html#af37e6065c1d84248ec000b12559e1430",
"class_hd_data_source_locator.html",
"class_hd_instance_registry.html#aab54cc46392d8c6d7141a68aa74b4d08",
"class_hd_render_buffer.html#a2a81e9cb5ace7c373a99a41b633f1018",
"class_hd_scene_delegate.html#a665d6d2b3b5c9ba97296a299f5b8ebf9",
"class_hd_st_dispatch_buffer.html#a6ac172093253452cff3424db3bb6d559",
"class_hd_st_render_pass_state.html#a8721c22d8b54f10d26b833815882f4ee",
"class_hd_task.html#a50bb64fcb3404805df436ad9e12ddd3c",
"class_hdx_pick_from_render_buffer_task.html#a8f1c4eb75d4bd31a20404459e5bac005",
"class_hgi_g_l_graphics_cmds.html#ab3795a224ca147ac268f77bfc5521aad",
"class_pcp_arc.html#a315e3bc1699c3263aa77043df8cc8075",
"class_pcp_error_unresolved_prim_path.html#a1d0ef60a288d0180869f8bb75be5811b",
"class_pcp_property_index.html#adf728ac6c35dd06467fe339940152e14",
"class_sdf_children_view.html#a1b61e6b4e91c6ddb89443451857ef6b5",
"class_sdf_layer.html#ae184606be96bf4b6ed13e90ebef8b691",
"class_sdf_path.html#aea81e3a0674c44ee439e8133e97827d8",
"class_sdf_prim_spec.html#ad66b5eac156110ca576d90e40a37d740",
"class_sdf_usdz_file_format.html#adb5975cea774014d1d47ef23e758a49a",
"class_sdr_shader_property.html#a57d24f16dc373ff7bf8e64efdab8b012",
"class_tf_dense_hash_map.html#a5121e1b2c923a24dbf4ee0fdaaa19396",
"class_tf_py_lock.html#a1733c7e9bdad231ce5fcab3118a9ebff",
"class_tf_token.html#aeaac1ee7ec4a3729babf752b30664120",
"class_trace_event_data.html#a8b5f46dc1459220ac50c18b49837351a",
"class_usd_attribute_limits.html#a050f5fcfd2e949d6f1f7b558a28fba8a",
"class_usd_geom_basis_curves.html#a805649ce1108b2a7ac5c12986edb78c9",
"class_usd_geom_mesh.html#ae7fdb51bc577ab6518785d379b524a3b",
"class_usd_geom_primvars_a_p_i.html#a56895335e37f04c41ef0e22eb4d198f9",
"class_usd_imaging_adapter_registry.html#aa890622125b991f781c992c58f1bb02f",
"class_usd_imaging_delegate.html#a9090c55efb232d48020ddc5b438129dc",
"class_usd_imaging_nurbs_patch_adapter.html#a51200fbc2c8ab1553bdfff84d5d16055",
"class_usd_lux_disk_light.html",
"class_usd_lux_shaping_a_p_i.html#aeba4c1e5eea85a6d4780cef9a9324f32",
"class_usd_physics_joint.html#a6d4e3a8626ff458271eba64f28bcaee7",
"class_usd_prim.html#aa0fccfa8055d7725bd0c1be63c02bbe4",
"class_usd_proc_generative_procedural.html#a675261ea158826cb87019d5344cd3c57",
"class_usd_schema_registry.html#a57d5500412f53145acd56ad3b1712685",
"class_usd_shade_output.html#a3ee9f0f80108fd87b45ed8d584b6b590",
"class_usd_skel_imaging_data_source_skeleton_prim.html#a948f99233dd2dd095db473e57c77e373",
"class_usd_stage_cache.html#aed7b5c548c3dd39e5b16dc1dcd196076",
"class_usd_validation_error.html#a67d8bc5b9e6cf51272034883baddb800",
"class_usd_vol_particle_field_spherical_harmonics_attribute_a_p_i.html#aa65f6be2b0083f3ce6a599a1e75de96e",
"class_vdf_context.html#a1fb789945327263c088d57a0ebf5acd7",
"class_vdf_grapher_options.html#a5e8a6dda71407a13e06a799ee64cbe9a",
"class_vdf_node.html#a5d19c197f63f149952e79967ca814c8b",
"class_vdf_read_write_accessor.html#afc161fde242b1ee2084b62d3d1dbcf91",
"class_vdf_test_utils_1_1_node.html#aa75310f7d93f9e4454cd09e95796a52c",
"class_vt_value_ref.html#ade7a7cadc20218f44f30375a2ea1507c",
"classpxr___c_l_i_1_1_c_l_i_1_1_app.html#af91b68390027e0f2bfcc15beba2204f5",
"classpxr__tsl_1_1robin__map.html#a6503fc644958f175089fa3e753941a14",
"copy_utils_8h.html#a888500e6263ed712b64a8f78797da2e8",
"dir_aa3bf17f9d6f68169ce0fa9df97655e9.html",
"executor_invalidation_data_8h.html",
"geom_model_a_p_i_adapter_8h_source.html",
"group__group___exec___attribute___comptuations.html#ga7288bc6bb966289de1f84f03367a8d9d",
"group__group__hd__collection_predicates.html#ga100c5cd00482dc6963269d8d1f0a363b",
"hgi_2shader_program_8h_source.html",
"journal_8h.html",
"md_pxr_usd_validation_usd_validation__r_e_a_d_m_e.html#autotoc_md199",
"parallel_speculation_executor_engine_8h_source.html",
"pxr_display_filter_adapter_8h_source.html",
"riley_param_schema_8h_source.html",
"sparse_vectorized_input_traverser_8h.html",
"struct_hgi_sampler_desc.html",
"struct_usd_geom_tokens_type.html#a1530b3c98415cf6c5a04cf3d6f668590",
"struct_usd_lux_tokens_type.html#a46b1c612a5f7096767831c10690b6a29",
"struct_usd_physics_tokens_type.html#a30b1c3e3b06b11c97d40bab23670f7be",
"struct_usd_skel_tokens_type.html#ab02d6bb01d0c9acbc41b880989d52cd9",
"system_diagnostics_8h_source.html",
"usd_2usd_2object_8h.html#ada9a9a926dbc7aa06b0449ed00d11097",
"usd_physics_page_front.html#usdPhysics_limits_drives",
"var_8h_source.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';