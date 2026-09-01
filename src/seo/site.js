/* Single source of truth for every SEO surface on the site.
 *
 * Deliberately plain JS with no React, JSX or CSS imports: the build-time
 * prerenderer (`scripts/prerender.mjs`) imports this straight from Node to
 * write the static HTML, the sitemap and robots.txt, while the runtime
 * <Seo> component imports the same data to keep the head in sync during
 * client-side navigation. One definition, two consumers, no drift. */

export const SITE = {
  name: "AI-LABZ",
  tagline: "Build Intelligence. Contain What You Create.",
  locale: "en_US",
  lang: "en",
  email: "ailabzsupport@gmail.com",
  /* Square mark. Kept as `twitter:card = summary` (not summary_large_image)
     because a 1024² logo letterboxes badly in the wide card. */
  image: "/brand/mark-1024.png",
  imageAlt: "The AI-LABZ mark: the ARC-7 specimen inside its orbital containment rings",
  imageWidth: 1024,
  imageHeight: 1024,
  /* Only what you can actually install today. The VideoGame node now carries
     an `offers` with `availability: InStock`, so listing Android here would
     assert an obtainable Android build that does not exist. Add it back the
     day the Play listing goes live. */
  platforms: "iOS",
  /* The live App Store listing. Every link and every `installUrl` on the
     site resolves to this one string. */
  appStoreUrl: "https://apps.apple.com/us/app/ai-labz-build-your-tech-empire/id6800757844",
};

/* Every route the site serves. `indexable: false` keeps a page out of the
   sitemap and gives it a noindex robots tag. Paths are the store-submitted
   URLs - keep them stable. */
export const ROUTES = [
  {
    path: "/",
    title: "AI-LABZ - Build Intelligence. Contain What You Create.",
    description:
      "AI-LABZ is an idle AI research management game, out now on iPhone with Android coming soon. Build the lab, train the models, and contain what you create.",
  },
  {
    path: "/privacy",
    updated: "2026-08-12",
    title: "Privacy Policy - AI-LABZ",
    description:
      "How AI-LABZ handles your data: no account, no login, just a random device token. What the game collects, why, and the choices you have.",
  },
  {
    path: "/terms",
    updated: "2026-08-12",
    title: "Terms of Service - AI-LABZ",
    description:
      "The terms you agree to when you play AI-LABZ - your lab and its data, purchases, acceptable use, and how the game may change over time.",
  },
  {
    path: "/children-safety",
    updated: "2026-08-12",
    title: "Children's Safety Standards - AI-LABZ",
    description:
      "AI-LABZ's Children's Safety Standards (CSAE): our zero-tolerance stance on child sexual abuse and exploitation, and how to report a concern.",
  },
  {
    path: "/restore-purchases",
    updated: "2026-08-12",
    title: "Restore Purchases - AI-LABZ",
    description:
      "How to restore AI-LABZ in-app purchases on iPhone and Android, and what to do if a purchase you made is missing from your lab.",
  },
  {
    path: "/404",
    title: "Page not found - AI-LABZ",
    description: "That page isn't part of the lab.",
    indexable: false,
  },
];

const FALLBACK = ROUTES[ROUTES.length - 1];

export function routeFor(path) {
  const clean = path === "/" ? "/" : `/${String(path ?? "").replace(/^\/+|\/+$/g, "")}`;
  return ROUTES.find((r) => r.path === clean) ?? FALLBACK;
}

export function isIndexable(route) {
  return route.indexable !== false;
}

export function absolute(origin, path) {
  return `${String(origin).replace(/\/+$/, "")}${path === "/" ? "/" : path}`;
}
