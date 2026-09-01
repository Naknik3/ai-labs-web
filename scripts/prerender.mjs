/* Post-build step: turns the SPA into a set of real HTML pages.
 *
 * Vite ships a single index.html with an empty <div id="root">. Google will
 * render that, but the crawlers behind AI answers - GPTBot, ClaudeBot,
 * PerplexityBot and friends - mostly don't execute JavaScript, so to them
 * the whole site reads as a blank page. This walks every route in
 * src/seo/site.js, renders it through react-dom/server, and writes the
 * finished markup (plus that route's own title, description, canonical, OG
 * tags and JSON-LD) to dist/<route>/index.html.
 *
 * The browser still boots the SPA normally and createRoot discards this
 * markup on hydrationless mount - see the note in main.jsx. The prerendered
 * DOM is for machines; the head tags it writes are what survive.
 *
 * Also emits robots.txt, sitemap.xml and llms.txt, which all need the
 * absolute origin that only exists at build time. */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer } from "vite";

import { SITE, ROUTES, routeFor, isIndexable, absolute } from "../src/seo/site.js";
import { headFor } from "../src/seo/meta.js";
import { schemaFor } from "../src/seo/schema.js";
import { FAQ } from "../src/seo/faq.js";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const dist = path.join(root, "dist");

/* Origin resolution, most explicit first:
   1. SITE_URL            - set this once the real domain is live.
   2. Vercel's stable production host. Deliberately NOT VERCEL_URL, which is
      unique per deployment and would emit a different canonical every build.
   3. A placeholder, so a local `npm run build` still produces valid files. */
const PLACEHOLDER = "https://ai-labz.com";
const origin = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  PLACEHOLDER
).replace(/\/+$/, "");

/* Preview and branch deploys must not compete with production for the same
   content. Off-Vercel builds (local, CI) are treated as production. */
const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function headHtml(routePath) {
  const lines = [];
  for (const tag of headFor(routePath, origin)) {
    if (tag.tag === "title") {
      lines.push(`<title>${esc(tag.text)}</title>`);
      continue;
    }
    if (tag.tag === "link") {
      lines.push(`<link data-seo rel="${esc(tag.rel)}" href="${esc(tag.href)}" />`);
      continue;
    }
    const attr = tag.name ? `name="${esc(tag.name)}"` : `property="${esc(tag.property)}"`;
    const content =
      tag.name === "robots" && !isProduction ? "noindex, nofollow" : tag.content;
    lines.push(`<meta data-seo ${attr} content="${esc(content)}" />`);
  }
  const ld = JSON.stringify(schemaFor(routePath, origin)).replace(/</g, "\\u003c");
  lines.push(`<script data-seo type="application/ld+json">${ld}</script>`);
  return lines.map((l) => `    ${l}`).join("\n");
}

async function emit(relPath, contents) {
  const file = path.join(dist, relPath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
  return relPath;
}

function sitemap() {
  const urls = ROUTES.filter(isIndexable)
    .map((r) => {
      const loc = `    <loc>${esc(absolute(origin, r.path))}</loc>`;
      /* lastmod only where a real edit date exists - the legal pages carry
         one in their own copy. A build timestamp on every URL every deploy
         is noise and gets discounted. */
      const mod = r.updated ? `\n    <lastmod>${r.updated}</lastmod>` : "";
      return `  <url>\n${loc}${mod}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/* Explicitly named rather than relying on the wildcard: absent a rule these
   are allowed anyway, but naming them documents the decision - in particular
   that Google-Extended and Applebot-Extended (the AI-training/grounding
   opt-outs) are intentionally left open, because being quotable in AI
   answers is the point. */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
];

function robots() {
  if (!isProduction) {
    return `# Preview deployment - not the canonical site.\nUser-agent: *\nDisallow: /\n`;
  }
  const ai = AI_AGENTS.map((a) => `User-agent: ${a}\nAllow: /\n`).join("\n");
  return [
    `# ${SITE.name} - ${origin}`,
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Answer engines and AI crawlers are welcome.",
    "",
    ai.trim(),
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");
}

/* llms.txt - a plain-language brief for language models, so an assistant
   asked "what is AI-LABZ?" can get the facts in one fetch instead of
   inferring them from marketing copy. No search engine consumes it and it
   ranks nothing; it is cheap and occasionally read. */
function llms() {
  const pages = ROUTES.filter(isIndexable)
    .map((r) => `- [${r.title.split(" - ")[0]}](${absolute(origin, r.path)}): ${r.description}`)
    .join("\n");
  const faq = FAQ.map(({ q, a }) => `### ${q}\n\n${a}`).join("\n\n");
  return `# ${SITE.name}

> ${routeFor("/").description}

${SITE.name} is an idle AI research management game. It is out now on the App Store for
iPhone; the Android build is still in development. You build an island laboratory from
compute, power and cooling structures, convert compute into research, and convert research
into AI models - each with its own behaviour, rarity and power draw. Ten building types, ten
upgrade tiers each. The smarter a model becomes, the higher the containment threat, and a
breached vault takes the sector with it. The game runs without an account or login: a random
device token identifies your lab.

- Platforms: iPhone (released), Android (in development). Mobile only.
- Status: live on the App Store, free to download with optional in-app purchases
- Download: ${SITE.appStoreUrl}
- Contact: ${SITE.email}

## Pages

${pages}

## Frequently asked questions

${faq}
`;
}

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--seo-->")) {
  throw new Error("dist/index.html is missing the <!--seo--> block - did index.html change?");
}

const vite = await createServer({
  root,
  logLevel: "warn",
  appType: "custom",
  server: { middlewareMode: true, open: false, hmr: false },
});

const written = [];
try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

  for (const route of ROUTES) {
    const body = render(route.path);
    const html = template
      /* Function replacers: `$&`-style sequences can occur inside rendered
         copy and would otherwise be interpreted by String.replace. */
      .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, () => `<!--seo-->\n${headHtml(route.path)}\n    <!--/seo-->`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

    /* Vercel serves dist/404.html for unmatched paths with a real 404
       status, which beats a catch-all rewrite that answers 200 for
       everything. Other routes become <route>/index.html. */
    const target = route.path === "/404" ? "404.html" : route.path === "/" ? "index.html" : `${route.path.slice(1)}/index.html`;
    written.push(await emit(target, html));
  }

  written.push(await emit("robots.txt", robots()));
  written.push(await emit("sitemap.xml", sitemap()));
  written.push(await emit("llms.txt", llms()));
} finally {
  await vite.close();
}

console.log(
  `prerendered ${written.length} files for ${origin}` +
    (isProduction ? "" : ` (VERCEL_ENV=${process.env.VERCEL_ENV} → noindex)`) +
    (origin === PLACEHOLDER ? `\n  ⚠ using placeholder origin - set SITE_URL to the real domain` : ""),
);
