import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./tokens.css";
import App from "./App.jsx";

/* createRoot, not hydrateRoot, on purpose. scripts/prerender.mjs bakes real
   markup into #root for crawlers that don't run JavaScript; React throws that
   away and renders fresh, which sidesteps every class of hydration mismatch
   for no SEO cost - the served HTML is what gets crawled either way. The head
   tags the prerenderer wrote do survive, and <Seo> updates them in place. */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
