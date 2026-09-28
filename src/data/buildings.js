const DEFAULT_TIER_BREAKPOINTS = [
  [1, 4],
  [5, 10],
  [11, 16],
  [17, 20],
];

// Mirrors the game's buildings.dart; `live: false` = the vendored 3D viewer predates it, so PNGs only.
export const BUILDINGS = [
  {
    key: "training_cluster",
    name: "Training Cluster",
    cls: "INTELLIGENCE",
    description: "Trains your models. Every level shortens the wait between trials.",
    accent: "violet",
    maxLevel: 20,
    assetStem: "training_cluster",
  },
  {
    key: "power_plant",
    name: "Power Plant",
    cls: "POWER",
    description: "Powers the lab. Let the draw outrun supply and the whole lab goes dark.",
    accent: "amber",
    maxLevel: 100,
    assetStem: "power_system",
    tierBreakpoints: [
      [1, 12],
      [13, 29],
      [30, 47],
      [48, 69],
      [70, 100],
    ],
  },
  {
    key: "gpu_rack",
    name: "Server Farm",
    cls: "MINING",
    description: "Your first mine, and the only source of 1-star chips.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "gpu_rack",
  },
  {
    key: "database",
    name: "Memory Silo",
    cls: "MINING",
    description: "The second mine. Vaulted training data, up to 3-star chips.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "database",
  },
  {
    key: "fusing_bench",
    name: "Fusing Bench",
    cls: "INTELLIGENCE",
    description: "Fuses two matching models into one stronger one, and merges chips up a grade.",
    accent: "violet",
    maxLevel: 20,
    assetStem: "fusing_bench",
    tierBreakpoints: [
      [1, 6],
      [7, 12],
      [13, 20],
    ],
  },
  {
    key: "research_lab",
    name: "Research Lab",
    cls: "SCIENCE",
    description: "Opens the research tree. Each level unlocks one more of its six branches.",
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
    description: "The third mine. A sub-zero coolant loop that yields up to 4-star chips.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "cryo_cooler",
  },
  {
    key: "security_system",
    name: "Signal Array",
    cls: "CONTAINMENT",
    description: "Fewer escapes, and a firmer grip when you go to recapture a model.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "security_system",
  },
  {
    key: "drone_bay",
    name: "Drone Bay",
    cls: "LOGISTICS",
    description: "Couriers on the ridge route. Every running model earns more credits.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "drone_bay",
  },
  {
    key: "quantum_annealer",
    name: "Quantum Annealer",
    cls: "MINING",
    description: "The last mine. A cryogenic qubit stack, and the only source of 5-star chips.",
    accent: "violet",
    maxLevel: 20,
    assetStem: "quantum_annealer",
  },
  {
    key: "sandbox",
    name: "Containment Vault",
    cls: "CONTAINMENT",
    description: "Holds every model you train, and cools the threat meter faster.",
    accent: "amber",
    maxLevel: 20,
    assetStem: "sandbox",
  },
  {
    key: "legacy_hall",
    name: "Legacy Hall",
    cls: "LEGACY",
    description: "Retire a level 7 model onto its own plinth for a permanent lab bonus.",
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
    description: "Watches the fleet. Bigger rewards from every incident you solve.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "oversight_array",
  },
  {
    key: "orbital_uplink",
    name: "Orbital Uplink",
    cls: "LOGISTICS",
    description: "Keeps the lab reporting while you're away. Earn more offline.",
    accent: "cyan",
    maxLevel: 20,
    assetStem: "orbital_uplink",
  },
  {
    key: "simulation_deck",
    name: "Simulation Deck",
    cls: "SCIENCE",
    description: "Runs the incident before you do. Solved boards pay more research.",
    accent: "violet",
    maxLevel: 20,
    assetStem: "simulation_deck",
  },
  {
    key: "recapture_range",
    name: "Recapture Range",
    cls: "CONTAINMENT",
    description: "Where the clamp gets practised. Easier recaptures, more charges.",
    accent: "amber",
    maxLevel: 20,
    assetStem: "recapture_range",
  },
  {
    key: "arcade",
    name: "Arcade",
    cls: "ARCADE",
    description: "Opens Runaway, the weekly arcade contest. Each level adds a cabinet.",
    accent: "amber",
    maxLevel: 5,
    assetStem: "arcade",
    live: false,
    tierBreakpoints: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 5],
    ],
  },
  {
    // Never levelled; its three "tiers" are the three looks it takes across prestiges.
    key: "epoch_gate",
    name: "Epoch Gate",
    cls: "PRESTIGE",
    description: "Sells the prestige models, and at lab level 100 wipes the lab into a stronger new run.",
    accent: "lime",
    maxLevel: 3,
    assetStem: "epoch_gate",
    live: false,
    tierBreakpoints: [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
  },
];

export const VISUAL_TIER_COUNT = BUILDINGS.reduce((sum, b) => sum + tierCountFor(b), 0);

export function tierForLevel(building, level) {
  const safeLevel = Math.max(1, Math.min(building.maxLevel, Number(level) || 1));
  const breakpoints = building.tierBreakpoints ?? DEFAULT_TIER_BREAKPOINTS;
  return breakpoints.findIndex(([, max]) => safeLevel <= max) + 1;
}

export function tierCountFor(building) {
  return (building.tierBreakpoints ?? DEFAULT_TIER_BREAKPOINTS).length;
}

export function levelForTier(building, tier) {
  const breakpoints = building.tierBreakpoints ?? DEFAULT_TIER_BREAKPOINTS;
  const safeTier = Math.max(1, Math.min(breakpoints.length, Number(tier) || 1));
  return breakpoints[safeTier - 1][0];
}

export function buildingImageForTier(building, tier) {
  const safeTier = Math.max(1, Math.min(tierCountFor(building), Number(tier) || 1));
  return `/assets/buildings/${building.assetStem}_t${safeTier}.png`;
}

export function buildingImageFor(building, level) {
  return buildingImageForTier(building, tierForLevel(building, level));
}
