/* The AI-LABZ mark (ARC-7, the contained specimen) and the wordmark.
 *
 * This used to be an inline <symbol> - a hand-port of a mark drawn from
 * geometry constants, so the site could re-draw it as vector at any size.
 * ARC-7 is a render out of the game's own 3D source, not a shape anyone can
 * re-draw, so the mark is now a raster served from /brand/. Its master and
 * the recipe that produced every derived size live in the app repo's icon
 * handoff; see README.md.
 *
 * One tile serves both grounds. The art is a self-contained dark card that
 * reads on the cream page and on the dark CTA block alike, so there is no
 * light/dark pair to keep in sync any more. Corner rounding stays in CSS
 * (`.site-header__mark`, `.site-footer__mark`, `.cta__mark`) where it always
 * was - the file itself is a full-bleed square. */

const MARK_SRC = "/brand/mark-256.png";

export function LabzMark({ size = 38, className = "" }) {
  return (
    <img
      src={MARK_SRC}
      width={size}
      height={size}
      className={className}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

export function Wordmark({ dark = false }) {
  return (
    <span className={dark ? "wordmark wordmark--dark" : "wordmark"}>
      AI-<span>LABZ</span>
    </span>
  );
}
