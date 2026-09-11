import { useCallback, useEffect, useRef, useState } from "react";

import {
  isViewerReadyMessage,
  MODEL_VIEWER_MESSAGE_SOURCE,
} from "../lib/viewerHandshake.js";
import "./ModelViewer.css";

const VIEWER_LEVEL_MAX = 7;

export default function ModelViewer({ model }) {
  const frameRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function handleMessage(event) {
      const frame = frameRef.current;
      if (
        isViewerReadyMessage(
          event,
          frame?.contentWindow,
          MODEL_VIEWER_MESSAGE_SOURCE,
        )
      ) {
        setReady(true);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const applyModel = useCallback(() => {
    const viewer = frameRef.current?.contentWindow?.modelViewer;
    if (!viewer?.setModel) return;

    try {
      viewer.setModel(model.key, Math.min(VIEWER_LEVEL_MAX, model.gen));
    } catch {
      setReady(false);
    }
  }, [model]);

  useEffect(() => {
    setReady(false);
    applyModel();
  }, [applyModel]);

  return (
    <div className="model-viewer">
      <img
        className={ready ? "model-viewer__fallback is-hidden" : "model-viewer__fallback"}
        src={`/assets/models/${model.key}.png`}
        alt=""
        aria-hidden="true"
      />
      <iframe
        ref={frameRef}
        className="model-viewer__frame"
        src="/model-viewer/index.html"
        title={`${model.name} live 3D specimen`}
        onLoad={applyModel}
      />
    </div>
  );
}
