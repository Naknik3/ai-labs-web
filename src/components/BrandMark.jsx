/* The AI-LABZ mark ("2a - The Island"), defined once as SVG <symbol>s and
   referenced with <use>. `LabzMarkDefs` is mounted a single time by Layout;
   `LabzMark` is the sprite. Geometry is the master in `logo-2a/svg/` - the
   corner radius is a plain rounded rect here because no element reaches the
   corners, so the master's clip-path is redundant at this size. */

function MarkArt({ ground, sky }) {
  return (
    <>
      <rect width="512" height="512" rx="112" fill={ground} />
      <circle cx="256" cy="262" r="152" fill={sky} />
      {/* isometric pad: soil skirt, grass, cyan edge */}
      <path d="M120,372 L256,426 L392,372 L392,394 L256,452 L120,394 Z" fill="#C2996A" />
      <path d="M256,318 L392,372 L256,426 L120,372 Z" fill="#92E0B4" />
      <path
        d="M256,318 L392,372 L256,426 L120,372 Z"
        fill="none"
        stroke="#17BFE0"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      {/* side hut */}
      <rect x="310" y="286" width="66" height="52" rx="20" fill="#17122A" />
      <rect x="328" y="302" width="30" height="16" rx="8" fill="#8FD8E8" />
      {/* tower */}
      <rect x="196" y="150" width="120" height="40" rx="20" fill="#17122A" />
      <rect x="210" y="168" width="92" height="178" rx="30" fill="#17122A" />
      <rect x="232" y="204" width="48" height="20" rx="10" fill="#8FD8E8" />
      <rect x="232" y="242" width="48" height="20" rx="10" fill="#8FD8E8" />
      <rect x="232" y="280" width="48" height="20" rx="10" fill="#FFB020" />
      {/* antenna + beacon */}
      <rect x="248" y="104" width="16" height="50" rx="8" fill="#17122A" />
      <circle cx="256" cy="96" r="22" fill="#FF5C6E" />
    </>
  );
}

export function LabzMarkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="labz-mark" viewBox="0 0 512 512">
          <MarkArt ground="#F6F1E4" sky="#E4F3FA" />
        </symbol>
        <symbol id="labz-mark-dark" viewBox="0 0 512 512">
          <MarkArt ground="#17122A" sky="#241D3E" />
        </symbol>
      </defs>
    </svg>
  );
}

export function LabzMark({ size = 38, dark = false, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <use href={dark ? "#labz-mark-dark" : "#labz-mark"} />
    </svg>
  );
}

export function Wordmark({ dark = false }) {
  return (
    <span className={dark ? "wordmark wordmark--dark" : "wordmark"}>
      AI-<span>LABZ</span>
    </span>
  );
}
