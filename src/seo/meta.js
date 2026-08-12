/* Builds the per-route head as a list of tag *descriptors* rather than an
   HTML string, so the same list can be serialized by the prerenderer and
   applied to the live DOM by <Seo> - the crawler and the client can't
   disagree about what the head says. */

import { SITE, routeFor, isIndexable, absolute } from "./site.js";

const INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX = "noindex, follow";

export function headFor(path, origin) {
  const route = routeFor(path);
  const url = absolute(origin, route.path);
  const image = absolute(origin, SITE.image);
  const { title, description } = route;

  return [
    { tag: "title", text: title },
    { tag: "meta", name: "description", content: description },
    { tag: "link", rel: "canonical", href: url },
    { tag: "meta", name: "robots", content: isIndexable(route) ? INDEX : NOINDEX },

    { tag: "meta", property: "og:type", content: "website" },
    { tag: "meta", property: "og:site_name", content: SITE.name },
    { tag: "meta", property: "og:locale", content: SITE.locale },
    { tag: "meta", property: "og:title", content: title },
    { tag: "meta", property: "og:description", content: description },
    { tag: "meta", property: "og:url", content: url },
    { tag: "meta", property: "og:image", content: image },
    { tag: "meta", property: "og:image:width", content: String(SITE.imageWidth) },
    { tag: "meta", property: "og:image:height", content: String(SITE.imageHeight) },
    { tag: "meta", property: "og:image:alt", content: SITE.imageAlt },

    { tag: "meta", name: "twitter:card", content: "summary" },
    { tag: "meta", name: "twitter:title", content: title },
    { tag: "meta", name: "twitter:description", content: description },
    { tag: "meta", name: "twitter:image", content: image },
    { tag: "meta", name: "twitter:image:alt", content: SITE.imageAlt },
  ];
}

/* The attribute that identifies a tag, so an update can find and rewrite
   the existing node instead of appending a second one. */
export function keyOf(t) {
  if (t.tag === "title") return "title";
  if (t.tag === "link") return `link[rel="${t.rel}"]`;
  return t.name ? `meta[name="${t.name}"]` : `meta[property="${t.property}"]`;
}
