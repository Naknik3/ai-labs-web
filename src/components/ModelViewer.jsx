import { useEffect, useRef, useState } from "react";

import "./ModelViewer.css";

const VIEWER_LEVEL_MAX = 7;

export default function ModelViewer({ model }) {
  const frameRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const frame = frameRef.current;
    const viewer = frame?.contentWindow?.modelViewer;
    if (viewer?.setModel) {
      viewer.setModel(model.key, Math.min(VIEWER_LEVEL_MAX, model.gen));
      setReady(true);
    }
  }, [model]);

  function handleLoad() {
    const viewer = frameRef.current?.contentWindow?.modelViewer;
    if (!viewer?.setModel) return;
    viewer.setModel(model.key, Math.min(VIEWER_LEVEL_MAX, model.gen));
    setReady(true);
  }

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
        onLoad={handleLoad}
      />
    </div>
  );
}
