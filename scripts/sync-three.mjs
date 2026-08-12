/* Copies the three.js ES module build into public/vendor/three/.
   public/lab/lab-assets.js (the extracted design-handoff scene bundle) loads
   three at runtime with a plain `import('/vendor/three/three.module.js')`, so
   it needs the files served as static assets rather than bundled by Vite.
   Runs automatically before `npm run dev` and `npm run build`. */
import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dest = resolve(root, "public/vendor/three");
const files = ["three.module.js", "three.core.js"];

mkdirSync(dest, { recursive: true });
for (const file of files) {
  copyFileSync(resolve(root, "node_modules/three/build", file), resolve(dest, file));
}
console.log(`three.js synced to public/vendor/three (${files.join(", ")})`);
