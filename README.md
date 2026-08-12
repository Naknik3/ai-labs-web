# AI LAB — marketing & legal site

Static React (Vite) site for AI LAB: landing page, Privacy Policy, and
Terms of Service. Meant to be hosted as a static site (Vercel, Netlify,
GitHub Pages, S3+CloudFront, etc.) and linked from the App Store / Play
Store listings.

## What's here

- `/` — landing page: pitch, the core loop, model/territory teasers, and
  a hero phone mockup running the live game scene.
- `/privacy` — Privacy Policy.
- `/terms` — Terms of Service.
- Hero device — a phone-frame mockup styled from the team's own design
  handoff (`docs/design_handoff_ai_lab_light` in the game repo, see
  `LabHUD.dc.html` / `LabMap.dc.html`), showing the status bar, HUD cards,
  a status toast, and build dock exactly as spec'd. Inside it runs the
  **real** AI LAB map scene (`lab-map.bundle.js`, the same bundle the
  Flutter app loads in its WebView, copied from `frontend/assets/map/` in
  the game repo), driven by a scripted loop
  (`src/data/mapTimeline.js`) that grows the lab from a single training
  cluster into a fully annexed territory, ending on the exact numbers
  shown in the design reference screenshot, then resets.

## Before this goes live

Both legal pages are working drafts written to match how the app behaves
today (device-token-only, no login, analytics/ads/subscriptions stubbed
but not active) — not legal advice. Have a lawyer review them, especially:

- Governing-law jurisdiction in Terms of Service §13 (currently a
  placeholder — fill in the actual entity/jurisdiction).
- Children's privacy / COPPA language if the game's audience shifts.
- Any regional consumer-rights language (GDPR, CCPA, etc.) you need for
  your actual launch markets.

Update both pages again once analytics, ads, or the AI LAB PRO
subscription actually go live.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Updating the hero

- **Map scene**: if the game's map changes, rebuild
  `frontend/assets/map/lab-map.bundle.js` in the main `AI-labz` repo
  (`tool/build_map.sh`) and copy it over `public/map/lab-map.bundle.js`
  here.
- **Growth loop**: `src/data/mapTimeline.js` holds the keyframes (real
  building/sector/model keys, credits/research/threat, toast copy) that
  drive both the 3D scene and the HUD overlay in lockstep. Update it if
  those keys or the game's balance change.
- **HUD chrome**: `src/components/HeroDevice.jsx` / `.css` reproduce the
  design handoff's `LabHUD.dc.html` and the 3A/3B frame markup in
  `LabMap.dc.html` at a fixed 390×844 design size, scaled responsively via
  the `--scale` custom property.
