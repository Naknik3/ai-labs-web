import { useEffect, useRef } from "react";
import "./LabMapBackground.css";

// Sector name plates the scene draws over locked tiles. Costs are cosmetic
// here (the real game gets these server-side) — just enough to read right.
const SECTOR_META = [
  { key: "north_ridge", name: "NORTH RIDGE", cost: "1.2K" },
  { key: "east_field", name: "EAST FIELD", cost: "2.4K" },
  { key: "south_basin", name: "SOUTH BASIN", cost: "3.8K" },
  { key: "deep_core", name: "DEEP CORE", cost: "6.5K" },
  { key: "west_crater", name: "WEST CRATER", cost: "10K" },
];

// A scripted "time-lapse" of a lab growing from a single training cluster
// into a fully annexed, fully built territory — then it loops. Every key
// here is a real building/sector/model key from the shipped game.
const KEYFRAMES = [
  {
    hold: 4200,
    mode: "calm",
    threat: 3,
    sectors: [],
    buildings: { training_cluster: 1 },
    models: [],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 6,
    sectors: [],
    buildings: { training_cluster: 3 },
    models: ["seed_01"],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 10,
    sectors: ["north_ridge"],
    buildings: { training_cluster: 4, memory_silo: 1, cryo_cooler: 1 },
    models: ["seed_01"],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 15,
    sectors: ["north_ridge", "east_field"],
    buildings: {
      training_cluster: 5,
      memory_silo: 2,
      cryo_cooler: 2,
      research_lab: 1,
      quantum_annealer: 1,
    },
    models: ["seed_01", "loom_04"],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 22,
    sectors: ["north_ridge", "east_field", "south_basin"],
    buildings: {
      training_cluster: 6,
      memory_silo: 3,
      cryo_cooler: 3,
      research_lab: 1,
      quantum_annealer: 2,
      drone_bay: 1,
      signal_array: 1,
    },
    models: ["seed_01", "loom_04", "halo_12"],
  },
  {
    hold: 4200,
    mode: "rising",
    threat: 36,
    sectors: ["north_ridge", "east_field", "south_basin", "deep_core"],
    buildings: {
      training_cluster: 7,
      memory_silo: 4,
      cryo_cooler: 4,
      research_lab: 1,
      quantum_annealer: 3,
      drone_bay: 2,
      signal_array: 2,
      server_farm: 1,
      fusion_plant: 1,
    },
    models: ["seed_01", "loom_04", "halo_12", "spire_19"],
  },
  {
    hold: 4200,
    mode: "rising",
    threat: 45,
    sectors: [
      "north_ridge",
      "east_field",
      "south_basin",
      "deep_core",
      "west_crater",
    ],
    buildings: {
      training_cluster: 8,
      memory_silo: 5,
      cryo_cooler: 5,
      research_lab: 1,
      quantum_annealer: 4,
      drone_bay: 3,
      signal_array: 3,
      server_farm: 2,
      fusion_plant: 2,
      containment_vault: 1,
    },
    models: ["seed_01", "loom_04", "halo_12", "spire_19", "chorus_27"],
  },
  {
    hold: 6500,
    mode: "calm",
    threat: 17,
    sectors: [
      "north_ridge",
      "east_field",
      "south_basin",
      "deep_core",
      "west_crater",
    ],
    buildings: {
      training_cluster: 9,
      memory_silo: 7,
      cryo_cooler: 6,
      research_lab: 1,
      quantum_annealer: 6,
      drone_bay: 5,
      signal_array: 5,
      server_farm: 4,
      fusion_plant: 4,
      containment_vault: 3,
    },
    models: [
      "seed_01",
      "loom_04",
      "halo_12",
      "spire_19",
      "chorus_27",
      "veil_33",
    ],
  },
];

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
 * app loads in a WebView) as an ambient, non-interactive background: a
 * scripted loop of the lab growing from one building into a full territory.
 */
export default function LabMapBackground() {
  const stageRef = useRef(null);

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

  return (
    <div className="lab-map-bg" aria-hidden="true">
      <div id="stage" ref={stageRef} />
    </div>
  );
}
