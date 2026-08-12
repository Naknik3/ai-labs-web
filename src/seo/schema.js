/* JSON-LD for each route, as one @graph per page so the nodes can reference
   each other by @id instead of repeating themselves.
 *
 * Deliberately absent: `offers`, `price` and `aggregateRating` on the game.
 * The app hasn't shipped, nothing is for sale and nobody has rated it -
 * inventing those is a manual-action risk, not just an inaccuracy. Add them
 * at launch, from the real store listing. */

import { SITE, routeFor, absolute } from "./site.js";
import { FAQ } from "./faq.js";

export function schemaFor(path, origin) {
  const route = routeFor(path);
  const home = absolute(origin, "/");
  const url = absolute(origin, route.path);
  const orgId = `${home}#organization`;
  const siteId = `${home}#website`;
  const gameId = `${home}#game`;
  const image = absolute(origin, SITE.image);

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: SITE.name,
      url: home,
      email: SITE.email,
      logo: { "@type": "ImageObject", url: image, width: SITE.imageWidth, height: SITE.imageHeight },
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: home,
      name: SITE.name,
      description: routeFor("/").description,
      inLanguage: SITE.lang,
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: SITE.lang,
      isPartOf: { "@id": siteId },
      about: { "@id": gameId },
      primaryImageOfPage: { "@type": "ImageObject", url: image },
      ...(route.updated ? { dateModified: route.updated } : {}),
      ...(route.path === "/" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    },
    {
      "@type": "VideoGame",
      "@id": gameId,
      name: SITE.name,
      alternateName: "AI Labz",
      url: home,
      description: routeFor("/").description,
      image,
      applicationCategory: "GameApplication",
      genre: ["Idle game", "Simulation", "Management"],
      operatingSystem: SITE.platforms,
      gamePlatform: ["iPhone", "Android"],
      playMode: "SinglePlayer",
      inLanguage: SITE.lang,
      publisher: { "@id": orgId },
      author: { "@id": orgId },
    },
  ];

  if (route.path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      isPartOf: { "@id": siteId },
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.name, item: home },
        { "@type": "ListItem", position: 2, name: route.title.split(" - ")[0], item: url },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
