# AI-LABZ - marketing & legal site

Static React (Vite) site for AI-LABZ: landing page plus the legal documents
the App Store and Play Console link to. Meant to be hosted as a static site
(Vercel, Netlify, GitHub Pages, S3+CloudFront, etc.).

## What's here

- `/` - landing page, ported 1:1 from the **"AI-Labz Site" design handoff**
  (`AI-Labz Site.html`, kept at the repo root as the visual reference):
  hero, live 3D lab scene, "how it plays", the building browser with its
  upgrade-level slider, and the waitlist CTA.
- `/privacy` - Privacy Policy.
- `/terms` - Terms of Service.
- `/children-safety` - Children's Safety Standards (CSAE).
- `/restore-purchases` - Restore Purchases.

The four legal routes are the URLs submitted to the stores - keep the paths
stable.

## Brand assets

`logo-2a/` is the master kit for the app mark ("2a - The Island") - SVG
sources plus rendered PNGs, with the colour, geometry and usage rules in
`logo-2a/README.md`. Everything the site serves is derived from it; regenerate
from the masters rather than editing the copies in `public/`.

| Served | Source | Use |
|---|---|---|
| `public/favicon.svg`, `public/favicon.ico` (16/32/48) | `svg/ai-labz-mark.svg` | browser tab |
| `public/apple-touch-icon.png` (180) | `png/ios-appicon-1024.png` | iOS home screen - must stay **opaque and full-bleed**, iOS applies its own mask and composites transparent corners over black |
| `public/brand/icon-192.png`, `icon-512.png` | rounded mark | `site.webmanifest`, `purpose: "any"` |
| `public/brand/icon-maskable-512.png` | square mark | `site.webmanifest`, `purpose: "maskable"` |
| `public/brand/mark-1024.png` | square mark | `og:image` / `twitter:image` |
| `public/brand/mark{,-dark,-mono,-square}.svg` | as named | the kit, for reuse |

The in-page mark (header, footer, dark CTA) is **not** one of these files - it's
inline SVG in `src/components/BrandMark.jsx`, mounted once as `<symbol>`s by
`Layout` and referenced with `<use>`. Its geometry is the same master, so a
change to the logo means editing that file too. The mark's own ground is
`#F6F1E4`, identical to the `--cream` page surface - the tile edge you see in
the header and footer is the inset ring in their CSS, not the icon.

## The 3D lab

`public/lab/lab-assets.js` is the procedural asset/scene bundle extracted from
the design handoff. It defines two custom elements, used directly from JSX:

- `<lab-scene mode threat orbit>` - the island in the hero panel.
- `<lab-building asset level accent>` - one building at one upgrade level.

It's loaded on demand by `src/lib/labAssets.js` (only the home page pays for
it) and pulls three.js as an ES module from `/vendor/three/`.
`scripts/sync-three.mjs` copies that out of `node_modules/three` on every
`npm run dev` / `npm run build`, so `public/vendor/three` is generated, not
committed. If you bump the `three` dependency, keep it on the version the
bundle was authored against (0.184.0) unless you re-test the scene.

The bundle is vendored, not pristine - it carries local fixes, each commented
at the change site. The one that matters if you ever re-export from the design
tool: **`<lab-scene>` is re-framed.** The handoff hard-codes an 8.7-unit
orthographic width, framed for the 390×844 phone mockup the scene was built
inside. The lab spans ~40×25 units at that camera angle, so in a wide desktop
panel the original constant shows roughly 5% of it - a cropped close-up of two
rooftops. `_resize()` now fits to `FIT_W`/`FIT_H` instead. The other local
changes are performance (pixel-ratio cap, half-rate shadow pass, offscreen
gating, no `preserveDrawingBuffer`) and a geometry-disposal fix in
`<lab-building>`'s rebuild path.

## Waitlist form

The handoff's signup was a visual mock - it flipped to a success state without
sending anything. Here it POSTs `{"email": "...", "source": "ai-labz-web"}` to
**Web3Forms**, which relays each signup to the inbox that owns the access key.
No backend, no database, no dashboard - the address arrives as an email.

Setup is one step: get a free key at <https://web3forms.com> for
`ailabzsupport@gmail.com`, then set `VITE_WAITLIST_KEY` (see `.env.example`)
locally and in the host's environment variables. The key is public by design -
it only authorises posting to that one form - so it ships in the bundle like
any other `VITE_` var.

**The key decides where signups land.** Web3Forms delivers to whichever inbox
the key was generated for; `email` in the payload is a reserved field that only
sets reply-to, and the contact address shown on the site is unrelated. Redirect
signups by generating a new key, not by editing code. If mail never arrives,
check the key was issued to the inbox you're watching - the key itself is
delivered there by email, so a missing key email means a wrong or blocked
address.

**With the key unset the form tells visitors to email us instead** - it never
silently drops an address, but it isn't collecting any either. Free tier is
250 submissions/month.

The form carries a `botcheck` honeypot, hidden off-screen rather than with
`display: none` (which bots test for); Web3Forms discards any submission that
arrives with it filled. Provider errors - a wrong or missing key - are logged
to the console, while visitors get one plain "try again, or email us" line.

## SEO, AEO and GEO

Everything a crawler reads is generated from one place: **`src/seo/`**.

| File | What it holds |
|---|---|
| `site.js` | brand constants and the route table - path, title, description, last-updated, indexability |
| `meta.js` | the per-route head as tag *descriptors* (title, description, canonical, robots, OG, Twitter) |
| `schema.js` | JSON-LD `@graph` - Organization, WebSite, WebPage, VideoGame, plus FAQPage on `/` and BreadcrumbList elsewhere |
| `faq.js` | the home-page FAQ, rendered visibly *and* emitted as structured data |

Two consumers share that data and therefore can't disagree:

- **`scripts/prerender.mjs`** (runs after `vite build`) renders every route
  through `react-dom/server` and writes real HTML - `dist/privacy/index.html`
  and so on - with that route's own head baked in. This is the part that
  matters for answer engines: GPTBot, ClaudeBot, PerplexityBot and friends
  mostly don't execute JavaScript, so before this the entire site read to them
  as an empty `<div id="root">`. It also emits `robots.txt`, `sitemap.xml` and
  `llms.txt`.
- **`src/components/Seo.jsx`** keeps the head correct after client-side
  navigation, updating each tag *in place* - appending would leave duplicate
  descriptions and canonicals behind every route change.

The browser still uses `createRoot`, not `hydrateRoot`: the prerendered markup
is thrown away and re-rendered fresh, which avoids every hydration-mismatch
failure mode at no SEO cost, since crawlers read the served HTML either way.
The head tags do survive that swap.

**`SITE_URL` sets the canonical origin** (canonicals, `og:url`, absolute
`og:image`, sitemap, robots). On Vercel it falls back to
`VERCEL_PROJECT_PRODUCTION_URL` - the stable production host, deliberately not
the per-deployment `VERCEL_URL`, which would emit a different canonical on
every build. Off Vercel with nothing set it uses a placeholder and warns.
Preview deploys (`VERCEL_ENV != production`) get `noindex` and a
`Disallow: /` robots.txt so they can't compete with production.

`robots.txt` names the AI crawlers explicitly and allows them - including
`Google-Extended` and `Applebot-Extended`, the AI-training/grounding opt-outs.
That's a decision, not an oversight: being quotable in AI answers is the point.
Flip them to `Disallow: /` in `AI_AGENTS` handling if that ever changes.

Deliberately **not** in the schema: `offers`, `price`, `aggregateRating`. The
app hasn't shipped, nothing is for sale and nobody has rated it - inventing
those risks a manual action. Add them at launch from the real store listing.

## Before this goes live

- Set `VITE_WAITLIST_KEY` (or the waitlist collects nothing).
- Set `SITE_URL` once the domain is attached, or confirm Vercel's
  `VERCEL_PROJECT_PRODUCTION_URL` is the host you want canonical. The build
  prints the origin it used and warns when it falls back to the placeholder.
- Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Make a real 1200×630 `og:image`. The current one is the 1024² square mark,
  which is why `twitter:card` is `summary` rather than `summary_large_image` -
  a square logo letterboxes badly in the wide card.
- The legal pages are working drafts written to match how the app behaves
  today (device-token-only, no login, analytics/ads/subscriptions stubbed but
  not active) - not legal advice. Have a lawyer review them, especially:
  - Governing-law jurisdiction in Terms of Service §13 (currently a
    placeholder - fill in the actual entity/jurisdiction).
  - Children's privacy / COPPA language if the game's audience shifts.
  - Any regional consumer-rights language (GDPR, CCPA, etc.) for your launch
    markets.
- Update the pages again once analytics, ads, or the AI-LABZ PRO subscription
  actually go live.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
npm run lint
```

Hosting notes:

- Every route is prerendered to its own file, so a filesystem-first host serves
  `/privacy` from `dist/privacy/index.html` with no SPA rewrite rule needed -
  and unknown paths hit `dist/404.html`, which returns a real 404 instead of
  the soft-404 a catch-all rewrite would produce. `vercel.json` only sets
  `cleanUrls` and `trailingSlash: false`. **Don't add a catch-all rewrite to
  `/index.html`** - it would shadow every prerendered page.
- **`npm run preview` cannot verify that.** Vite's preview server has its own
  SPA fallback that answers `/privacy` with the home-page shell, masking the
  exact failure you'd want to catch. Use `npm run preview:static` (a plain
  filesystem server, no fallback) when checking the prerendered output, and
  confirm on the real host after the first deploy:

  ```sh
  curl -s  https://<host>/privacy | grep -o '<title>[^<]*'   # "Privacy Policy - AI-LABZ", not the home title
  curl -sI https://<host>/nope | head -1                     # expect 404
  curl -s  https://<host>/robots.txt | head -3
  ```

  If `/privacy` returns the home page, the fix is removing whatever catch-all
  is shadowing the filesystem - not adding one.
- The site must be served from the domain root. `src/lib/labAssets.js` and the
  lab bundle's three.js import are root-absolute (`/lab/…`, `/vendor/three/…`),
  so a subpath deploy (e.g. a GitHub Pages *project* site at
  `user.github.io/repo/`) breaks the 3D scene. Use a root/apex domain, or set
  Vite's `base` and update those two paths together.
