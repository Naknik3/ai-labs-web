// A scripted "time-lapse" of a lab growing from a single training cluster
// into a fully annexed, fully built territory - then it loops. Every
// building/sector/model key is real, taken from the shipped game
// (buildings.dart, sectors.dart, map_src/lab-models.js). Credits/research
// progress toward the exact values shown in the team's own design
// reference screenshot (docs/design_handoff_ai_lab_light) so the loop's
// final frame lines up with it.

export const SECTOR_META = [
  { key: "north_ridge", name: "NORTH RIDGE", cost: "240K" },
  { key: "east_field", name: "EAST FIELD", cost: "1.1M" },
  { key: "south_basin", name: "SOUTH BASIN", cost: "4.6M" },
  { key: "deep_core", name: "DEEP CORE", cost: "8.2M" },
  { key: "west_crater", name: "WEST CRATER", cost: "14M" },
];

export const KEYFRAMES = [
  {
    hold: 4200,
    mode: "calm",
    threat: 3,
    credits: "0",
    research: "0",
    toast: { tone: "ok", text: "Lab online - Training Cluster built" },
    sectors: [],
    buildings: { training_cluster: 1 },
    models: [],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 6,
    credits: "1.2K",
    research: "180",
    toast: { tone: "ok", text: "Training Cluster reached Level 3" },
    sectors: [],
    buildings: { training_cluster: 3 },
    models: ["seed_01"],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 10,
    credits: "4.8K",
    research: "620",
    toast: { tone: "ok", text: "North Ridge annexed" },
    sectors: ["north_ridge"],
    buildings: { training_cluster: 4, memory_silo: 1, cryo_cooler: 1 },
    models: ["seed_01"],
  },
  {
    hold: 4200,
    mode: "calm",
    threat: 15,
    credits: "18.4K",
    research: "2.1K",
    toast: { tone: "ok", text: "Research Lab online" },
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
    credits: "64.0K",
    research: "6.4K",
    toast: { tone: "ok", text: "Signal Array reached Level 2" },
    sectors: ["north_ridge", "east_field", "south_basin"],
    buildings: {
      training_cluster: 6,
      memory_silo: 3,
      cryo_cooler: 3,
      research_lab: 1,
      quantum_annealer: 2,
      drone_bay: 1,
      signal_array: 2,
    },
    models: ["seed_01", "loom_04", "halo_12"],
  },
  {
    hold: 4200,
    mode: "rising",
    threat: 36,
    credits: "184.0K",
    research: "12.8K",
    toast: { tone: "warn", text: "Containment drifting - vault load rising" },
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
    credits: "312.0K",
    research: "16.2K",
    toast: { tone: "warn", text: "Server Farm reached Level 7" },
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
    threat: 12,
    credits: "482.6K",
    research: "19.4K",
    toast: { tone: "ok", text: "Threat contained - lab stable" },
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
      server_farm: 7,
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

export function threatMeta(threat) {
  if (threat >= 80) return { label: "CRITICAL", color: "#F2544B" };
  if (threat >= 50) return { label: "ELEVATED", color: "#FF7A3C" };
  return { label: "STABLE", color: "#F5A623" };
}
