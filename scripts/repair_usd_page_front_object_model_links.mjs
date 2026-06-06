import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const root = path.resolve(scriptDir, "..");
const outputPath = path.join(root, "site", "usd_page_front.html");

const objectModelTargets = new Map([
  ["https://openusd.org/release/api/_usd__page__object_model.html", "#Usd_OM_ObjectModel"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_SdfLayer", "#Usd_OM_SdfLayer"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_UsdStage", "#Usd_OM_UsdStage"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_UsdPrim", "#Usd_OM_UsdPrim"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_UsdProperty", "#Usd_OM_UsdProperty"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_UsdAttribute", "#Usd_OM_UsdAttribute"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_UsdRelationship", "#Usd_OM_UsdRelationship"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_Metadata", "#Usd_OM_Metadata"],
  ["https://openusd.org/release/api/_usd__page__object_model.html#Usd_OM_OtherObjects", "#Usd_OM_OtherObjects"],
]);

const localObjectModelSection = `<!-- local object model fallback for core manual links -->
<div class="cn-repro-note object-model-local" id="Usd_OM_ObjectModel">
<h2><span class="zh">对象模型本地导读</span><span class="en">Local Object Model Guide</span></h2>
<p class="zh">这个区块用于承接上方 Core API Manual 中的对象模型目录链接。官方的 <code>_usd__page__object_model.html</code> 不在当前 406 页本地清单内，所以这些高频入口在本页提供本地锚点导读，避免普通阅读时跳到未覆盖占位页。</p>
<p class="en">This section catches the object-model links in the Core API Manual above. The official <code>_usd__page__object_model.html</code> page is outside the current 406-page local inventory, so these high-frequency entries resolve to local anchors here instead of the uncovered-page placeholder.</p>
<p><a class="el" href="https://openusd.org/release/api/_usd__page__object_model.html">打开官方原页 / Open official page</a></p>

<h3><a class="anchor" id="Usd_OM_SdfLayer"></a><span class="zh">SdfLayer：共享数据文件</span><span class="en">SdfLayer: Shared Data Files</span></h3>
<p class="zh"><code>SdfLayer</code> 是实际持有 scene description 数据的层级文件容器，负责保存 prim specs、属性、关系、metadata 和子层引用。需要完整 API 时进入本地 <a class="el" href="../full_site/api/class_sdf_layer.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/class_sdf_layer.html">SdfLayer class reference</a>。</p>
<p class="en"><code>SdfLayer</code> is the layer/file container that actually owns scene description data: prim specs, attributes, relationships, metadata, and sublayer references. For full API details, use the local <a class="el" href="../full_site/api/class_sdf_layer.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/class_sdf_layer.html">SdfLayer class reference</a>.</p>

<h3><a class="anchor" id="Usd_OM_UsdStage"></a><span class="zh">UsdStage：SdfLayer 的组合视图</span><span class="en">UsdStage: Composed View of an SdfLayer</span></h3>
<p class="zh"><code>UsdStage</code> 表示合成后的场景视图，负责把 layer stack、composition arcs、session layer 和 edit target 共同呈现为可遍历的 scenegraph。本地当前没有独立 <code>class_usd_stage.html</code>，因此先在此保留概念导读。</p>
<p class="en"><code>UsdStage</code> is the composed scene view, presenting layer stacks, composition arcs, session layers, and edit targets as a traversable scenegraph. The current local scope does not include a standalone <code>class_usd_stage.html</code>, so this page keeps the concept guide locally.</p>

<h3><a class="anchor" id="Usd_OM_UsdPrim"></a><span class="zh">UsdPrim：可嵌套命名空间容器</span><span class="en">UsdPrim: Nestable Namespace Containers</span></h3>
<p class="zh"><code>UsdPrim</code> 是 stage 中按路径组织的对象节点，承载类型名、metadata、属性、关系、schema API 和子 prim。需要完整 API 时进入本地 <a class="el" href="../full_site/api/class_usd_prim.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/class_usd_prim.html">UsdPrim class reference</a>。</p>
<p class="en"><code>UsdPrim</code> is the path-addressed object node on a stage, carrying type name, metadata, attributes, relationships, schema APIs, and child prims. For full API details, use the local <a class="el" href="../full_site/api/class_usd_prim.html" data-local-route="mapped" data-official-href="https://openusd.org/release/api/class_usd_prim.html">UsdPrim class reference</a>.</p>

<h3><a class="anchor" id="Usd_OM_UsdProperty"></a><span class="zh">UsdProperty：Attributes 与 Relationships 的通用接口</span><span class="en">UsdProperty: Common Interface for Attributes and Relationships</span></h3>
<p class="zh"><code>UsdProperty</code> 是 <code>UsdAttribute</code> 与 <code>UsdRelationship</code> 的共享抽象，提供名称、路径、metadata 和所属 prim 等通用读取入口。当前本地清单未收录独立 <code>UsdProperty</code> class 页，因此这里作为目录兜底。</p>
<p class="en"><code>UsdProperty</code> is the shared abstraction for <code>UsdAttribute</code> and <code>UsdRelationship</code>, exposing common access to names, paths, metadata, and owning prims. The current local inventory does not include the standalone <code>UsdProperty</code> class page, so this anchor acts as the local fallback.</p>

<h3><a class="anchor" id="Usd_OM_UsdAttribute"></a><span class="zh">UsdAttribute：有类型、可采样的数据</span><span class="en">UsdAttribute: Typed, Sampled, Data</span></h3>
<p class="zh"><code>UsdAttribute</code> 表示 prim 上有类型的值，可以有 default value、time samples、value resolution 和 interpolation 相关行为。当前本地清单未收录独立 <code>UsdAttribute</code> class 页，因此这里作为目录兜底。</p>
<p class="en"><code>UsdAttribute</code> represents typed values on a prim, including default values, time samples, value resolution, and interpolation-related behavior. The current local inventory does not include the standalone <code>UsdAttribute</code> class page, so this anchor acts as the local fallback.</p>

<h3><a class="anchor" id="Usd_OM_UsdRelationship"></a><span class="zh">UsdRelationship：指向命名空间对象</span><span class="en">UsdRelationship: Targeting Namespace Objects</span></h3>
<p class="zh"><code>UsdRelationship</code> 表示从一个 prim/property 指向其他 prim/property 的目标路径列表，常用于绑定、连接和引用式关系。当前本地清单未收录独立 <code>UsdRelationship</code> class 页，因此这里作为目录兜底。</p>
<p class="en"><code>UsdRelationship</code> stores target paths from one prim or property to other prims or properties, commonly used for bindings, connections, and reference-like relationships. The current local inventory does not include the standalone <code>UsdRelationship</code> class page, so this anchor acts as the local fallback.</p>

<h3><a class="anchor" id="Usd_OM_Metadata"></a><span class="zh">USD 中的通用 Metadata</span><span class="en">General Metadata in USD</span></h3>
<p class="zh">Metadata 是附着在 layer、prim、property 或 schema 对象上的辅助描述，常用于模型分类、文档字符串、加载行为、asset info 和工具约定；它不同于 attribute value，不参与同一类 time-sampled 数据读取。</p>
<p class="en">Metadata is auxiliary description attached to layers, prims, properties, or schema objects. It is often used for model classification, documentation strings, loading behavior, asset info, and tool conventions; it is different from attribute values and is not read as the same kind of time-sampled data.</p>

<h3><a class="anchor" id="Usd_OM_OtherObjects"></a><span class="zh">Composition Operator 接口：UsdReferences、UsdInherits、UsdVariantSets</span><span class="en">Composition Operator Interfaces: UsdReferences, UsdInherits, UsdVariantSets</span></h3>
<p class="zh"><code>UsdReferences</code>、<code>UsdInherits</code>、<code>UsdVariantSets</code> 等对象是 composition operators 的 authoring 接口，用来编辑引用、继承和变体集合；它们影响最终 composed scenegraph，但不是普通属性值。</p>
<p class="en"><code>UsdReferences</code>, <code>UsdInherits</code>, and <code>UsdVariantSets</code> are authoring interfaces for composition operators. They edit references, inherits, and variant sets; they affect the final composed scenegraph but are not ordinary attribute values.</p>
</div>
<!-- end local object model fallback -->`;

function setAttr(tag, name, value) {
  const pattern = new RegExp(`\\s${name}=([\"'])[^\"']*\\1`, "i");
  if (pattern.test(tag)) {
    return tag.replace(pattern, ` ${name}="${value}"`);
  }
  return tag.replace(/>$/, ` ${name}="${value}">`);
}

export function repairUsdPageFrontObjectModelLinks(html) {
  let next = html.replace(
    /\n?<!-- local object model fallback for core manual links -->[\s\S]*?<!-- end local object model fallback -->\n?/g,
    "\n",
  );

  next = next.replace(/<a\b[^>]*>/gi, (tag) => {
    const official = tag.match(/\sdata-official-href=(["'])([^"']+)\1/i)?.[2];
    const localTarget = official ? objectModelTargets.get(official) : null;
    if (!localTarget) return tag;
    let repaired = setAttr(tag, "href", localTarget);
    repaired = setAttr(repaired, "data-local-route", "mapped");
    return repaired;
  });

  const insertion = "</table>\n</div></div><!-- contents -->";
  if (!next.includes(insertion)) {
    throw new Error("Cannot find usd_page_front object-model insertion point.");
  }
  return next.replace(insertion, `</table>\n${localObjectModelSection}\n</div></div><!-- contents -->`);
}

async function main() {
  const html = await readFile(outputPath, "utf8");
  const next = repairUsdPageFrontObjectModelLinks(html);
  await writeFile(outputPath, next, "utf8");
  console.log(JSON.stringify({
    output: outputPath,
    local_object_model_links: objectModelTargets.size,
  }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  await main();
}
