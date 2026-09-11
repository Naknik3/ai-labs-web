const DEFAULT_TIER_BREAKPOINTS = [
  [1, 2],
  [3, 5],
  [6, 8],
  [9, 10],
];

/* The website mirrors the game's shared building registry. PNG previews are
   generated from the same map assets; `assetStem` maps the game key to the
   public preview filename (power_plant is exported as power_system). */
export const BUILDINGS = [
  {
    key: "training_cluster",
    name: "Training Cluster",
    cls: "INTELLIGENCE",
    description: "Dedicated training halo. Every level trains your models faster.",
    accent: "violet",
    maxLevel: 10,
    assetStem: "training_cluster",
  },
  {
    key: "power_plant",
    name: "Power Plant",
    cls: "POWER",
    description: "Feeds the lab. Let draw outstrip supply and the whole lab goes dark.",
    accent: "amber",
    maxLevel: 58,
    assetStem: "power_system",
    tierBreakpoints: [
      [1, 7],
      [8, 17],
      [18, 27],
      [28, 40],
      [41, 58],
    ],
  },
  {
    key: "gpu_rack",
    name: "Server Farm",
    cls: "MINING",
    description: "Tensor-core racks. The starter mine, and the only source of 1-star chips.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "gpu_rack",
  },
  {
    key: "database",
    name: "Memory Silo",
    cls: "MINING",
    description: "Vaulted shards of training data. Corruption starts here.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "database",
  },
  {
    key: "fusing_bench",
    name: "Fusing Bench",
    cls: "INTELLIGENCE",
    description: "Where duplicates become one stronger model, and five chips become one of the grade above.",
    accent: "violet",
    maxLevel: 10,
    assetStem: "fusing_bench",
    tierBreakpoints: [
      [1, 3],
      [4, 6],
      [7, 10],
    ],
  },
  {
    key: "research_lab",
    name: "Research Lab",
    cls: "SCIENCE",
    description: "Unlocks the research tree. Each level opens one more of its six branches.",
    accent: "green",
    maxLevel: 6,
    assetStem: "research_lab",
    tierBreakpoints: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 6],
    ],
  },
  {
    key: "cryo_cooler",
    name: "Cryo Cooler",
    cls: "MINING",
    description: "Sub-zero coolant loop. Mines the rarer chip grades, and opens 4-star at max level.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "cryo_cooler",
  },
  {
    key: "security_system",
    name: "Signal Array",
    cls: "CONTAINMENT",
    description: "Scans for breaches and tightens your grip when you go to recapture a model.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "security_system",
  },
  {
    key: "drone_bay",
    name: "Drone Bay",
    cls: "LOGISTICS",
    description: "Autonomous couriers running the ridge route. Boosts revenue from every active model.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "drone_bay",
  },
  {
    key: "quantum_annealer",
    name: "Quantum Annealer",
    cls: "MINING",
    description: "Cryogenic qubit stack. The only mine that yields 5-star chips.",
    accent: "violet",
    maxLevel: 10,
    assetStem: "quantum_annealer",
  },
  {
    key: "sandbox",
    name: "Containment Vault",
    cls: "CONTAINMENT",
    description: "Every model you train is held here. The stronger they get, the harder they push against the walls.",
    accent: "amber",
    maxLevel: 10,
    assetStem: "sandbox",
  },
  {
    key: "legacy_hall",
    name: "Legacy Hall",
    cls: "LEGACY",
    description: "Retire a level 7 model onto its own plinth. It never comes back, and the hall pays the lab forever.",
    accent: "violet",
    maxLevel: 3,
    assetStem: "legacy_hall",
    tierBreakpoints: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
  },
  {
    key: "oversight_array",
    name: "Oversight Array",
    cls: "CONTAINMENT",
    description: "Watches the fleet instead of the fence. Fewer incidents means fewer chips and less research.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "oversight_array",
  },
  {
    key: "orbital_uplink",
    name: "Orbital Uplink",
    cls: "LOGISTICS",
    description: "Keeps the lab reporting while you are away and closes the gap on idle earnings.",
    accent: "cyan",
    maxLevel: 10,
    assetStem: "orbital_uplink",
  },
  {
    key: "simulation_deck",
    name: "Simulation Deck",
    cls: "SCIENCE",
    description: "Runs the incident before you do. Every level pays more research for a solved board and a won trial.",
    accent: "violet",
    maxLevel: 10,
    assetStem: "simulation_deck",
  },
  {
    key: "recapture_range",
    name: "Recapture Range",
    cls: "CONTAINMENT",
    description: "Where the clamp gets practised. Every level makes a broken-out model less likely to bolt.",
    accent: "amber",
    maxLevel: 10,
    assetStem: "recapture_range",
  },
];

export function tierForLevel(building, level) {
  const safeLevel = Math.max(1, Math.min(building.maxLevel, Number(level) || 1));
  const breakpoints = building.tierBreakpoints ?? DEFAULT_TIER_BREAKPOINTS;
  return breakpoints.findIndex(([, max]) => safeLevel <= max) + 1;
}

export function buildingImageFor(building, level) {
  return `/assets/buildings/${building.assetStem}_t${tierForLevel(building, level)}.png`;
}
