/* Registers the <lab-scene> / <lab-building> custom elements on demand.
   The bundle pulls ~2 MB of three.js, so only pages that render the lab call
   this - legal pages never pay for it. */
const SRC = "/lab/lab-assets.js";
let pending = null;

export default function loadLabAssets() {
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load lab assets"));
    document.head.appendChild(script);
  });
  return pending;
}
