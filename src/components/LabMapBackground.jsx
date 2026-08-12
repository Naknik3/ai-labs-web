import { useEffect, useRef } from "react";
import { SECTOR_META, KEYFRAMES } from "../data/mapTimeline.js";
import "./LabMapBackground.css";

function loadScriptOnce(src) {
  if (window.__labMapScriptPromise) return window.__labMapScriptPromise;
  window.__labMapScriptPromise = new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.onload = resolve;
    el.onerror = reject;
    document.body.appendChild(el);
  });
  return window.__labMapScriptPromise;
}

/**
 * Renders the real AI LAB Three.js map scene (the same bundle the Flutter
 * app loads in a WebView) as an ambient, non-interactive scene: a scripted
 * loop of the lab growing from one building into a full territory.
 *
 * Only one of these can be mounted at a time — the bundle boots a single
 * global `window.labMap` bound to whichever `#stage` element existed when
 * it first loaded.
 */
export default function LabMapBackground({ onFrame }) {
  const stageRef = useRef(null);
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  useEffect(() => {
    let cancelled = false;
    let timer = null;
    let frameIndex = 0;

    loadScriptOnce("/map/lab-map.bundle.js").then(() => {
      if (cancelled || !window.labMap) return;
      const step = () => {
        if (cancelled || !window.labMap) return;
        const frame = KEYFRAMES[frameIndex % KEYFRAMES.length];
        window.labMap.setState({ ...frame, sectorMeta: SECTOR_META });
        onFrameRef.current?.(frame, frameIndex % KEYFRAMES.length);
        frameIndex += 1;
        timer = setTimeout(step, frame.hold ?? 4200);
      };
      step();
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <div id="stage" ref={stageRef} className="lab-map-stage" aria-hidden="true" />;
}
