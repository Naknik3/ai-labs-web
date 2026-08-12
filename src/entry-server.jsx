import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import "./tokens.css";
import App from "./App.jsx";

/* Build-time only. scripts/prerender.mjs loads this through Vite's SSR
   pipeline and calls render() once per route to bake the page's real text
   into dist/, so crawlers that don't execute JavaScript still get the
   content. Nothing here runs in the browser. */
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
