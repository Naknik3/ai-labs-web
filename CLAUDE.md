# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install
npm run dev              # Vite dev server (opens a browser; port varies if 5173 is taken)
npm run build            # vite build + scripts/prerender.mjs
npm run lint             # oxlint
npm run preview          # vite preview - SPA fallback, hides prerender bugs
npm run preview:static   # python3 http.server on dist/ - serves the real files
```

There is no test suite and no test runner configured. Don't invent one or claim tests pass.

Two things about those commands:

- **`npm run lint` lints the vendored bundles too** (`public/map/lab-map.bundle.js`, `public/vendor/three/`) and buries real findings under thousands of warnings. Use `npx oxlint src/ scripts/` when you want signal.
- **`npm run preview` is the wrong tool for checking a build.** `vite preview` falls back to `index.html` for any unmatched path, so a broken or missing prerendered route still looks fine. Use `npm run preview:static`, which serves `dist/` as plain files the way a static host does.

`predev` and `prebuild` both run `scripts/sync-three.mjs`, which copies `three.module.js` / `three.core.js` out of `node_modules/three` into `public/vendor/three/`. That directory is gitignored and generated - if the 3D scene is blank, check it exists.

## Architecture

React 19 + Vite SPA, client-routed with react-router, prerendered to static HTML at build time. Five real routes plus a 404; four of them are the legal URLs submitted to the App Store and Play Console (`/privacy`, `/terms`, `/children-safety`, `/restore-purchases`) - **keep those paths stable.**

### The build produces static pages, not an SPA shell

`scripts/prerender.mjs` runs after `vite build`. It boots Vite in middleware mode, loads `src/entry-server.jsx` through the SSR pipeline, and renders every route in `src/seo/site.js` to `dist/<route>/index.html` with that route's own head baked in. It also emits `robots.txt`, `sitemap.xml` and `llms.txt`. This exists because the crawlers behind AI answers mostly don't execute JavaScript - without it the entire site reads to them as an empty `<div id="root">`.

Two details that will bite if you don't know them:

- **`index.html` has a `<!--seo-->…<!--/seo-->` block** that the prerenderer rewrites per route. The prerenderer throws if the markers are missing. What's in that block in the source file is only the dev-server fallback; editing it does nothing to the built output. Edit `src/seo/site.js` instead.
- **The browser uses `createRoot`, not `hydrateRoot`.** The prerendered DOM is deliberately thrown away and re-rendered - it's there for machines, not for hydration. This sidesteps every hydration-mismatch failure mode at no SEO cost. Don't "fix" it into `hydrateRoot`.

### SEO data has one source and two consumers

Everything a crawler reads comes from `src/seo/`:

| File | Holds |
|---|---|
| `site.js` | `SITE` constants and the `ROUTES` table (path, title, description, `updated`, `indexable`) |
| `meta.js` | `headFor(path, origin)` → head tags as *descriptors*; `keyOf(tag)` → the selector that identifies one |
| `schema.js` | `schemaFor(path, origin)` → JSON-LD `@graph` |
| `faq.js` | `FAQ`, rendered visibly on `/` *and* emitted as `FAQPage` structured data |

`scripts/prerender.mjs` (Node, build time) and `src/components/Seo.jsx` (browser, after client-side navigation) both consume that data, so they can't disagree. This is why `src/seo/*` is plain JS with no React, JSX or CSS imports - Node imports it directly.

`<Seo path="..." />` is mounted **per page component**, not in `Layout`. It mutates each head tag **in place**, looked up via `keyOf`; appending instead would leave duplicate descriptions and canonicals behind every navigation. It also reads the origin from the baked canonical rather than `window.location`, so a page served from a preview URL doesn't rewrite the canonical to itself.

Adding a route means: add it to `ROUTES`, add the `<Route>` in `App.jsx`, and render `<Seo path="...">` in the page. Miss the first and it won't prerender or appear in the sitemap.

`SITE_URL` sets the canonical origin, falling back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (the stable production host - deliberately *not* `VERCEL_URL`, which changes per deployment), then to a placeholder with a build warning. Non-production `VERCEL_ENV` gets `noindex` and a `Disallow: /` robots.txt.

### The 3D lab is a vendored bundle, not source you own

`public/lab/lab-assets.js` came out of the design handoff. It defines two custom elements used directly from JSX - `<lab-scene mode threat orbit>` and `<lab-building asset level accent>` - and loads three.js as an ES module from `/vendor/three/`. `src/lib/labAssets.js` injects it on demand so only the home page pays for ~2 MB of three.js.

**It carries local fixes, each commented at the change site.** Re-exporting from the design tool silently reverts all of them:

- `_resize()` frames to `FIT_W`/`FIT_H`. The handoff hard-codes an 8.7-unit orthographic width, framed for the 390×844 phone mockup the scene was built inside - in a wide desktop panel that shows ~5% of a ~40×25-unit lab.
- `island()` stops the soil block where the grass cap begins (`ISLAND_CAP`). The handoff gave both boxes the same footprint with both top faces at `y = 0` - coplanar surfaces with no depth ordering, so the ground tore into a flickering checkerboard as the camera orbited.
- Performance: `MAX_PIXEL_RATIO`, half-rate shadow pass, `IntersectionObserver` gating on both elements, `preserveDrawingBuffer: false`.
- `_release()` disposes geometries and non-shared materials on rebuild; `Group.clear()` alone stranded a whole building per slider step.

Keep `three` pinned at `0.184.0` (the version the bundle was authored against) unless you re-test the scene.

Two constraints the site inherits from this: paths are **root-absolute** (`/lab/…`, `/vendor/three/…`), so a subpath deploy breaks the scene; and the host must rewrite unknown paths to `index.html` (or serve `dist/404.html`) for client routing to work.

### Styling

Design tokens in `src/tokens.css`, one CSS file per component/page. The whole visual language is flat `box-shadow: 0 Npx 0 <edge>` plus large radii - there are no blurred shadows. The in-page brand mark is inline SVG in `src/components/BrandMark.jsx`, mounted once as `<symbol>`s by `Layout` and referenced with `<use>`; it is *not* one of the files in `public/brand/`, so a logo change means editing both.

## Known state

- **The waitlist form posts for real** to Web3Forms (`api.web3forms.com/submit`), which emails each signup to the inbox owning `VITE_WAITLIST_KEY`. That key is public by design and belongs in the bundle. Unset, the form tells visitors to email support rather than silently dropping addresses - so it collects nothing until the key is set in the host's env.
- **Orphaned from an earlier hero design, still on disk:** `src/components/HeroScene.{jsx,css}`, `src/components/LabMapBackground.{jsx,css}`, `src/data/mapTimeline.js`, `public/map/lab-map.bundle.js`. Nothing imports them.
- `README.md` references `AI-Labz Site.html` at the repo root; it is not present in the working tree.
- Most of the current work is uncommitted against `master` (the default branch for PRs is `main`).
