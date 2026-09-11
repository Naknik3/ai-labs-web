import { useCallback, useEffect, useRef, useState } from "react";

import { buildingImageFor, tierForLevel } from "../data/buildings.js";
import "./BuildingViewer.css";

export default function BuildingViewer({ building, level }) {
  const frameRef = useRef(null);
  const [ready, setReady] = useState(false);
  const tier = tierForLevel(building, level);

  const applyBuilding = useCallback(() => {
    const viewer = frameRef.current?.contentWindow?.buildingViewer;
    if (!viewer?.setBuilding) return;
    Promise.resolve(viewer.setBuilding(building.key, level, building.accent, tier)).then((ok) => {
      if (ok !== false) setReady(true);
    });
  }, [building, level, tier]);

  useEffect(() => {
    setReady(false);
    applyBuilding();
  }, [applyBuilding]);

  return (
    <div className="building-viewer">
      <img
        className={ready ? "building-viewer__fallback is-hidden" : "building-viewer__fallback"}
        src={buildingImageFor(building, level)}
        alt=""
        aria-hidden="true"
      />
      <iframe
        ref={frameRef}
        className="building-viewer__frame"
        src="/building-viewer/index.html"
        title={`${building.name} live 3D building`}
        onLoad={applyBuilding}
      />
    </div>
  );
}
