import { useCallback, useEffect, useRef, useState } from "react";

import { buildingImageForTier, tierForLevel } from "../data/buildings.js";
import "./BuildingViewer.css";

export default function BuildingViewer({ building, level, tier: selectedTier }) {
  const frameRef = useRef(null);
  const requestRef = useRef(0);
  const hasRenderedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const tier = selectedTier ?? tierForLevel(building, level);
  const live = building.live !== false;

  const applyBuilding = useCallback(() => {
    const request = ++requestRef.current;
    if (!live) {
      setReady(false);
      return;
    }
    const viewer = frameRef.current?.contentWindow?.buildingViewer;
    if (!viewer?.setBuilding) return;
    Promise.resolve()
      .then(() => viewer.setBuilding(building.key, level, building.accent, tier))
      .then((ok) => {
        if (request === requestRef.current && ok !== false) {
          hasRenderedRef.current = true;
          setReady(true);
        }
      })
      .catch(() => {
        if (request === requestRef.current) setReady(false);
      });
  }, [building, level, tier, live]);

  useEffect(() => {
    if (!hasRenderedRef.current) setReady(false);
    applyBuilding();
    return () => {
      requestRef.current += 1;
    };
  }, [applyBuilding]);

  return (
    <div className="building-viewer">
      <img
        className={ready ? "building-viewer__fallback is-hidden" : "building-viewer__fallback"}
        src={buildingImageForTier(building, tier)}
        alt=""
        aria-hidden="true"
      />
      <iframe
        ref={frameRef}
        className={live ? "building-viewer__frame" : "building-viewer__frame is-parked"}
        src="/building-viewer/index.html"
        title={`${building.name} live 3D building`}
        onLoad={applyBuilding}
      />
    </div>
  );
}
