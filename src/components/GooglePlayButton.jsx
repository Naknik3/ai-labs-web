import { SITE } from "../seo/site.js";

/* Every Google-Play link on the site lives in SITE so the visible buttons and
   the structured data always point at the same live listing. */
export default function GooglePlayButton({ className, children = "Get it on Google Play" }) {
  return (
    <a
      href={SITE.googlePlayUrl}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GooglePlayMark />
      {children}
    </a>
  );
}

function GooglePlayMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.2 2.6 14.1 13 3.2 23.4c-.7-.4-1.2-1.1-1.2-2V4.6c0-.9.5-1.6 1.2-2Z" fill="currentColor" />
      <path d="m15.1 14 3.5 3.3-12.7 6.2c-.6.3-1.2.2-1.7-.1L15.1 14Z" fill="currentColor" opacity=".72" />
      <path d="m15.1 10 3.5-3.3L5.3.5c-.6-.3-1.2-.2-1.7.1L15.1 10Z" fill="currentColor" opacity=".86" />
      <path d="m19.5 7.3 2.2 1.1c1.3.7 1.3 1.8 0 2.5l-2.2 1.1-3.5-3.3 3.5-1.4Z" fill="currentColor" opacity=".58" />
    </svg>
  );
}
