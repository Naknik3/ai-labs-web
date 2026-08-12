# AI LAB — marketing & legal site

Static React (Vite) site for AI LAB: landing page, Privacy Policy, and
Terms of Service. Meant to be hosted as a static site (Vercel, Netlify,
GitHub Pages, S3+CloudFront, etc.) and linked from the App Store / Play
Store listings.

## What's here

- `/` — landing page: pitch, the core loop, model/territory teasers.
- `/privacy` — Privacy Policy (working draft — see the in-page notice).
- `/terms` — Terms of Service (working draft — see the in-page notice).
- Full-page background — the **real** AI LAB map scene (the same
  `lab-map.bundle.js` the Flutter app loads in its WebView, copied from
  `frontend/assets/map/` in the game repo), driven by a scripted loop in
  `src/components/LabMapBackground.jsx` that grows the lab from a single
  training cluster into a fully annexed territory, then resets.

## Before this goes live

Both legal pages are **working drafts**, not legal advice — they're
written to match how the app behaves today (device-token-only, no login,
analytics/ads/subscriptions stubbed but not active). Have a lawyer review
them, especially:

- Governing-law jurisdiction in Terms of Service §13 (currently a
  placeholder).
- Children's privacy / COPPA language if the game's audience shifts.
- Any regional consumer-rights language (GDPR, CCPA, etc.) you need for
  your actual launch markets.

Update both pages again once analytics, ads, or the AI LAB PRO
subscription actually go live — the drafts call this out explicitly.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Updating the background map

If the game's map scene changes, rebuild `frontend/assets/map/lab-map.bundle.js`
in the main `AI-labz` repo (`tool/build_map.sh`) and copy it over
`public/map/lab-map.bundle.js` here. The growth-loop keyframes in
`LabMapBackground.jsx` use real building/sector/model keys from the game
(`buildings.dart`, `sectors.dart`, `map_src/lab-models.js`) — update them
there too if those change.
