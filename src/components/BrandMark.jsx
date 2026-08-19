/* The AI-LABZ mark (D1, "the caged mascot"), defined once as SVG <symbol>s and
   referenced with <use>. `LabzMarkDefs` is mounted a single time by Layout;
   `LabzMark` is the sprite.

   Geometry is a hand-port of the master in the app repo -
   `frontend/assets/icon/svg/ai-labz-mark.svg`, itself generated from
   `frontend/tool/build_icons.py`. Same viewBox and same numbers, so the two
   stay comparable; change the master first, then mirror it here.

   The cage bars deliberately overflow the 512 viewBox (rails at x=-8 w=528,
   verticals at y=-4 h=520) so their round caps fall outside the card. That
   makes the clip path load-bearing, not decorative: without it the bars run
   flush to a square edge instead of following the 112 corner radius. One
   clipPath serves both symbols. */

const RAYS = [
  "M256,256 L836,101 L856,256 Z",
  "M256,256 L836,411 L776,556 Z",
  "M256,256 L680,680 L556,776 Z",
  "M256,256 L411,836 L256,856 Z",
  "M256,256 L101,836 L-44,776 Z",
  "M256,256 L-168,680 L-264,556 Z",
  "M256,256 L-324,411 L-344,256 Z",
  "M256,256 L-324,101 L-264,-44 Z",
  "M256,256 L-168,-168 L-44,-264 Z",
  "M256,256 L101,-324 L256,-344 Z",
  "M256,256 L411,-324 L556,-264 Z",
  "M256,256 L680,-168 L776,-44 Z",
];

/* A cage bar: cyan body, light left highlight, deep right shadow. */
function Bar({ x }) {
  return (
    <>
      <rect x={x} y="-4" width="30" height="520" rx="15" fill="#17BFE0" />
      <rect x={x} y="-4" width="10" height="520" rx="5" fill="#8FE7F7" />
      <rect x={x + 20} y="-4" width="10" height="520" rx="5" fill="#0F9DBB" />
    </>
  );
}

/* A hand gripping a bar: knuckle circle plus three finger slats. */
function Grip({ cx }) {
  return (
    <>
      <circle cx={cx} cy="368" r="34" fill="#2B2352" stroke="#17122A" strokeWidth="12" />
      {[342, 362, 382].map((y) => (
        <rect
          key={y}
          x={cx - 26}
          y={y}
          width="52"
          height="15"
          rx="7.5"
          fill="#3A2F6C"
          stroke="#17122A"
          strokeWidth="7"
        />
      ))}
    </>
  );
}

function MarkArt({ ground, ray, sky, sparkle }) {
  return (
    <g clipPath="url(#labz-round)">
      <rect width="512" height="512" fill={ground} />
      {RAYS.map((d) => (
        <path key={d} d={d} fill={ray} />
      ))}
      <circle cx="256" cy="266" r="205" fill={sky} />

      {/* outer bars, behind the head */}
      <Bar x={45} />
      <Bar x={437} />

      {/* the mascot, tilted 3 degrees counterclockwise */}
      <g transform="rotate(-3 256 300)">
        {/* antenna + beacon */}
        <rect x="242" y="70" width="24" height="70" rx="12" fill="#17122A" />
        <circle cx="254" cy="60" r="40" fill="#FF5C6E" stroke="#17122A" strokeWidth="10" />
        <path
          d="M254,20 A40,40 0 0 1 294,60"
          fill="none"
          stroke="#FFD1D7"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* head shell, with lit and shaded flanks */}
        <rect x="92" y="130" width="328" height="308" rx="98" fill="#2B2352" stroke="#17122A" strokeWidth="16" />
        <path d="M110,240 Q104,152 190,142 L300,138 Q200,150 168,190 Q136,230 134,300 Z" fill="#3A2F6C" />
        <path d="M404,260 Q412,380 320,424 L250,430 Q356,404 380,330 Q396,290 396,260 Z" fill="#1F1840" />
        {/* face screen: bezel, glass, sheen */}
        <rect x="146" y="196" width="220" height="152" rx="52" fill="#1A1433" />
        <rect x="156" y="206" width="200" height="132" rx="44" fill="#071D2B" />
        <path d="M170,212 Q250,204 342,216 L342,232 Q250,220 170,228 Z" fill="#1A3446" />
        {/* eyes + smile */}
        <rect x="196" y="236" width="38" height="72" rx="19" fill="#4FE0FF" />
        <rect x="278" y="236" width="38" height="72" rx="19" fill="#4FE0FF" />
        <rect x="202" y="242" width="16" height="26" rx="8" fill="#D6F8FF" />
        <rect x="284" y="242" width="16" height="26" rx="8" fill="#D6F8FF" />
        <path
          d="M226,318 q30,20 60,0"
          fill="none"
          stroke="#4FE0FF"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="176" cy="330" r="13" fill="#217199" />
        <circle cx="336" cy="330" r="13" fill="#217199" />
        {/* chin vent + status light */}
        <rect x="150" y="386" width="90" height="20" rx="10" fill="#3A2F6C" />
        <circle cx="352" cy="396" r="12" fill="#FFB020" />
      </g>

      {/* inner bars and the hands gripping them, in front of the head */}
      <Bar x={151} />
      <Bar x={331} />
      <Grip cx={166} />
      <Grip cx={346} />

      {/* top and bottom rails, with rivets */}
      <rect x="-8" y="30" width="528" height="30" rx="15" fill="#0F9DBB" />
      <rect x="-8" y="452" width="528" height="30" rx="15" fill="#0F9DBB" />
      <rect x="-8" y="30" width="528" height="10" rx="5" fill="#17BFE0" />
      {[60, 166, 346, 452].map((cx) => (
        <circle key={cx} cx={cx} cy="45" r="7" fill="#8FE7F7" />
      ))}

      <path d="M70,104 l6,12 12,6 -12,6 -6,12 -6,-12 -12,-6 12,-6 Z" fill={sparkle} />
    </g>
  );
}

export function LabzMarkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="labz-round">
          <rect width="512" height="512" rx="112" />
        </clipPath>
        <symbol id="labz-mark" viewBox="0 0 512 512">
          <MarkArt ground="#F6F1E4" ray="#F1E9D2" sky="#E4F3FA" sparkle="#D9CBA6" />
        </symbol>
        <symbol id="labz-mark-dark" viewBox="0 0 512 512">
          <MarkArt ground="#17122A" ray="#1C1633" sky="#241D3E" sparkle="#4A3F7A" />
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
