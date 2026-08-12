import { useEffect } from "react";
import { headFor, keyOf } from "../seo/meta.js";
import { schemaFor } from "../seo/schema.js";

/* Keeps the document head matching the current route.
 *
 * The head that ships with a page is written at build time by
 * scripts/prerender.mjs - that's the copy crawlers and link unfurlers read,
 * and it's already correct on first paint. This component exists for the
 * *second* page a visitor sees: client-side routing changes the URL without
 * reloading the document, so the title, description and canonical have to be
 * rewritten in place.
 *
 * "In place" is the whole trick. Every tag is looked up by the attribute that
 * identifies it and mutated if found; only a genuinely missing tag is
 * created. Appending instead would leave a trail of duplicate descriptions
 * and canonicals behind each navigation. */
export default function Seo({ path }) {
  useEffect(() => {
    const head = document.head;
    /* Prefer the origin baked into the prerendered canonical over the host we
       happen to be loaded from. A page reached on a preview URL, or on the
       .vercel.app while the apex domain is canonical, must keep pointing at
       the canonical origin - otherwise a JS-executing crawler would see the
       client rewrite the canonical to self and undo the build-time answer. */
    const baked = head.querySelector('link[rel="canonical"]')?.href;
    const origin = baked ? new URL(baked).origin : window.location.origin;

    for (const tag of headFor(path, origin)) {
      if (tag.tag === "title") {
        document.title = tag.text;
        continue;
      }
      let el = head.querySelector(keyOf(tag));
      if (!el) {
        el = document.createElement(tag.tag);
        el.setAttribute("data-seo", "");
        if (tag.name) el.setAttribute("name", tag.name);
        if (tag.property) el.setAttribute("property", tag.property);
        if (tag.rel) el.setAttribute("rel", tag.rel);
        head.appendChild(el);
      }
      if (tag.tag === "link") el.setAttribute("href", tag.href);
      else el.setAttribute("content", tag.content);
    }

    let ld = head.querySelector('script[type="application/ld+json"][data-seo]');
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-seo", "");
      head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(schemaFor(path, origin));
  }, [path]);

  return null;
}
