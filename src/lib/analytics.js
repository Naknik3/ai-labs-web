/* Loads GA4 on demand and tracks SPA route changes as page_view events.
   Unset VITE_GA_MEASUREMENT_ID (e.g. local dev, preview deploys) and this is
   a no-op - nothing is injected and nothing is queued. */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "";

let initialized = false;

export function initAnalytics() {
  if (initialized || !GA_ID || !import.meta.env.PROD) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // We send page_view ourselves per route change - the default on the
  // initial "config" call would double-count the first pageview.
  window.gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export function trackPageview(path) {
  if (!GA_ID || !import.meta.env.PROD || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}
