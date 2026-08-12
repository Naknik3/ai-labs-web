// AI-LABZ procedural 3D lab assets - extracted from the design handoff bundle.
// Defines two custom elements: <lab-scene> and <lab-building>.
// three.js is loaded as an ES module from /vendor/three/ (see scripts/sync-three.sh).
(async function () {
  async function waitResources(ms) {
    const t0 = Date.now();
    while (!window.__resources && Date.now() - t0 < ms) await new Promise(r => setTimeout(r, 30));
    return window.__resources;
  }
  const res = await waitResources(0);
  const CDN = '/vendor/three/';
  let url = CDN + 'three.module.js';
  if (res && res.three && res.threeCore) {
    // three.module.js re-exports './three.core.js'; blob URLs can't resolve that,
    // so patch the specifier to the inlined core blob before importing.
    const txt = await (await fetch(res.three)).text();
    const patched = txt.split('./three.core.js').join(res.threeCore);
    url = URL.createObjectURL(new Blob([patched], { type: 'text/javascript' }));
  }
  const THREE = await import(url);

// Fill rate, not geometry, is what costs on these panels: the hero is a
// full-width 16:9 canvas, so at devicePixelRatio 2 it renders ~2.8M pixels a
// frame with MSAA and a shadow pass. Capping the ratio quarters that on a
// Retina display; the art is flat-shaded low-poly, so it survives the crop.
// Raise to 2 if you ever want the extra sharpness back.
const MAX_PIXEL_RATIO = 1.5;

// AI LAB - procedural 3D building assets.
// 10 upgrade levels map to 4 visual milestones; each milestone is a distinctly
// different structure, not a scaled copy. Named meshes/materials for OBJ/GLB export.

const ACCENTS = {
  cyan: 0x17bfe0, violet: 0x8b5cf6, amber: 0xff9a3c,
  green: 0x35c77a, red: 0xf2544b
};

// Three-band ramp - gives the flat, banded cartoon shading instead of a
// smooth photoreal falloff. Built once and shared by every material.
function toonRamp(THREE) {
  const data = new Uint8Array([124, 176, 214, 255]);
  const tex = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  tex.needsUpdate = true;
  return tex;
}

function makeMaterials(THREE) {
  const ramp = toonRamp(THREE);
  const toon = (name, color) => {
    const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp });
    m.name = name; return m;
  };
  const em = (name, tint, intensity) => {
    const m = new THREE.MeshToonMaterial({
      color: tint, emissive: tint, emissiveIntensity: intensity, gradientMap: ramp
    });
    m.name = name; return m;
  };
  const two = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap: ramp, side: THREE.DoubleSide });
  two.name = 'shell_light_2s';
  return {
    deck: toon('deck', 0xd8e0e6),
    shell: toon('shell', 0xeef1ec),
    shellLight: toon('shell_light', 0xffffff),
    shellTwoSided: two,
    trim: toon('trim', 0x9fb3c6),
    glass: toon('glass_tinted', 0x9fdcec),
    rubber: toon('rubber', 0x5f6f7d),
    cyan: em('emissive_cyan', ACCENTS.cyan, 1.1),
    violet: em('emissive_violet', ACCENTS.violet, 1.15),
    amber: em('emissive_amber', ACCENTS.amber, 1.15),
    green: em('emissive_green', ACCENTS.green, 1.1),
    red: em('emissive_red', ACCENTS.red, 1.3)
  };
}

const box = (T, w, h, d) => new T.BoxGeometry(w, h, d);
const cyl = (T, rt, rb, h, seg = 24) => new T.CylinderGeometry(rt, rb, h, seg);

function mesh(T, geo, mat, name, x = 0, y = 0, z = 0) {
  const m = new T.Mesh(geo, mat);
  m.name = name; m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function glow(T, geo, mat, name, x = 0, y = 0, z = 0) {
  const m = mesh(T, geo, mat, name, x, y, z);
  m.castShadow = false;
  return m;
}
// Pad footprint grows with the milestone - the ground presence changes, not just height.
const PAD = [1.5, 1.9, 2.25, 2.6];
function pad(T, M, g, ms, name = 'pad') {
  const w = PAD[ms - 1];
  g.add(mesh(T, box(T, w, 0.22, w), M.deck, name, 0, 0.11, 0));
  // Skirt band around the middle of the slab - must NOT sit above the top face,
  // or it occludes the deck when seen from an isometric camera.
  const edge = mesh(T, box(T, w + 0.08, 0.07, w + 0.08), M.trim, name + '_edge', 0, 0.075, 0);
  g.add(edge);
  if (ms >= 3) for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4, r = w * 0.46;
    g.add(mesh(T, box(T, 0.1, 0.3, 0.1), M.trim, name + '_bollard_' + i, Math.cos(a) * r, 0.4, Math.sin(a) * r));
  }
  return w;
}
const A = (g) => (g.userData.anim = g.userData.anim || []);

const BUILDERS = {

  // M1 one rack · M2 rack rows · M3 rows + raised gantry deck · M4 two storeys
  server_farm(T, M, ms) {
    const g = new T.Group(); g.name = 'server_farm';
    pad(T, M, g, ms);
    const rows = [1, 3, 5, 5][ms - 1];
    const rowW = [0.9, 1.5, 1.8, 1.9][ms - 1];
    const h = [0.55, 0.72, 0.8, 0.8][ms - 1];
    const span = rowW * 1.05;
    const build = (yBase, tag) => {
      for (let i = 0; i < rows; i++) {
        const z = rows === 1 ? 0 : -span / 2 + (span / rows) * (i + 0.5);
        g.add(mesh(T, box(T, rowW, h, (span / rows) * 0.6), M.shell, tag + '_rack_' + i, 0, yBase + h / 2, z));
        for (let j = 0; j < 3; j++) {
          const s = glow(T, box(T, rowW * 0.97, 0.03, 0.02), M.cyan, tag + '_led_' + i + '_' + j,
            0, yBase + h * (0.24 + j * 0.28), z + (span / rows) * 0.3);
          g.add(s);
          A(g).push({ obj: s, type: 'blink', phase: (i * 3 + j) * 0.6 });
        }
      }
    };
    build(0.22, 'lower');
    if (ms >= 3) {
      const deckY = 0.22 + h + 0.1;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        g.add(mesh(T, box(T, 0.09, h + 0.1, 0.09), M.trim, 'gantry_leg_' + i, Math.cos(a) * span * 0.55, 0.22 + (h + 0.1) / 2, Math.sin(a) * span * 0.55));
      }
      g.add(mesh(T, box(T, span * 1.25, 0.09, span * 1.25), M.shellLight, 'gantry_deck', 0, deckY, 0));
      g.add(mesh(T, box(T, 0.42, 0.5, 0.42), M.shellLight, 'transformer', span * 0.72, 0.47, -span * 0.6));
      if (ms === 4) {
        const y2 = deckY + 0.045;
        for (let i = 0; i < 3; i++) {
          const z = -span * 0.36 + (span * 0.72 / 3) * (i + 0.5);
          g.add(mesh(T, box(T, span * 0.95, 0.6, span * 0.2), M.shell, 'upper_rack_' + i, 0, y2 + 0.3, z));
          const s = glow(T, box(T, span * 0.92, 0.03, 0.02), M.cyan, 'upper_led_' + i, 0, y2 + 0.42, z + span * 0.1);
          g.add(s);
          A(g).push({ obj: s, type: 'blink', phase: i * 0.9 + 0.3 });
        }
        for (const sx of [-1, 1]) g.add(mesh(T, cyl(T, 0.11, 0.14, 0.9, 14), M.trim, 'exhaust_' + (sx > 0 ? 'r' : 'l'), sx * span * 0.62, y2 + 0.45, span * 0.6));
        const half = span * 0.625;
        for (let i = 0; i < 4; i++) {
          const along = i % 2 === 0;
          const off = i < 2 ? half : -half;
          const rr = glow(T, box(T, along ? span * 1.25 : 0.02, 0.02, along ? 0.02 : span * 1.25), M.cyan, 'deck_rail_' + i,
            along ? 0 : off, deckY + 0.1, along ? off : 0);
          g.add(rr);
        }
      }
    }
    return g;
  },

  // M1 bare dome · M2 dome + halo · M3 dome on drum + spikes · M4 raised dome, buttresses, spire
  training_cluster(T, M, ms) {
    const g = new T.Group(); g.name = 'training_cluster';
    const w = pad(T, M, g, ms);
    const drum = [0, 0, 0.34, 0.62][ms - 1];
    const r = [0.42, 0.56, 0.66, 0.78][ms - 1];
    if (drum) g.add(mesh(T, cyl(T, r * 1.02, r * 1.14, drum, 28), M.shell, 'drum', 0, 0.22 + drum / 2, 0));
    const domeY = 0.22 + drum + r * 0.5;
    const dome = mesh(T, new T.IcosahedronGeometry(r, 1), M.shell, 'dome', 0, domeY, 0);
    dome.scale.set(1, 0.8, 1);
    g.add(dome);
    const core = glow(T, new T.SphereGeometry(r * 0.4, 24, 16), M.violet, 'core', 0, domeY, 0);
    g.add(core);
    A(g).push({ obj: core, type: 'pulse', base: 1.5, phase: 0 });
    const halos = [0, 1, 2, 3][ms - 1];
    for (let i = 0; i < halos; i++) {
      const ring = glow(T, new T.TorusGeometry(r * (1.1 + i * 0.2), 0.02, 8, 56), M.violet, 'halo_' + i, 0, domeY, 0);
      ring.rotation.x = Math.PI / 2 + (i - 1) * 0.34;
      g.add(ring);
      A(g).push({ obj: ring, type: 'spin', speed: 0.45 + i * 0.3 * (i % 2 ? -1 : 1) });
    }
    if (ms >= 3) for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      g.add(mesh(T, cyl(T, 0.012, 0.05, 0.72, 8), M.trim, 'spike_' + i, Math.cos(a) * r * 1.15, domeY + r * 0.62, Math.sin(a) * r * 1.15));
    }
    if (ms === 4) {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const bt = mesh(T, box(T, 0.11, 1.0, 0.34), M.shellLight, 'buttress_' + i, Math.cos(a) * w * 0.42, 0.6, Math.sin(a) * w * 0.42);
        bt.rotation.y = -a; bt.rotation.x = 0.28;
        g.add(bt);
      }
      g.add(mesh(T, cyl(T, 0.03, 0.1, 0.7, 12), M.trim, 'spire', 0, domeY + r * 0.9, 0));
      const beacon = glow(T, new T.SphereGeometry(0.09, 14, 12), M.violet, 'beacon', 0, domeY + r * 0.9 + 0.4, 0);
      g.add(beacon);
      A(g).push({ obj: beacon, type: 'blink', phase: 0 });
    }
    return g;
  },

  // M1 low bunker · M2 chamber + cap · M3 pylon ring + glass band · M4 full containment complex
  containment_vault(T, M, ms) {
    const g = new T.Group(); g.name = 'containment_vault';
    const br = [1.15, 1.4, 1.62, 1.86][ms - 1];
    g.add(mesh(T, cyl(T, br, br * 1.1, 0.3, 6), M.deck, 'hex_base', 0, 0.15, 0));
    g.add(mesh(T, cyl(T, br * 0.9, br * 0.96, 0.14, 6), M.shell, 'hex_collar', 0, 0.37, 0));
    const h = [0.42, 0.78, 1.12, 1.5][ms - 1];
    const cr = [0.6, 0.76, 0.88, 1.0][ms - 1];
    g.add(mesh(T, cyl(T, cr * 0.86, cr, h, 6), M.shell, 'chamber', 0, 0.44 + h / 2, 0));
    if (ms >= 3) g.add(mesh(T, cyl(T, cr * 0.9, cr * 0.9, h * 0.34, 6), M.glass, 'chamber_glass', 0, 0.44 + h * 0.6, 0));
    const core = glow(T, new T.SphereGeometry(cr * 0.34, 28, 20), M.amber, 'containment_core', 0, 0.44 + h * 0.62, 0);
    g.add(core);
    A(g).push({ obj: core, type: 'pulse', base: 1.6, phase: 0.4 });
    if (ms >= 2) g.add(mesh(T, cyl(T, cr * 0.5, cr * 0.94, 0.26, 6), M.shellLight, 'cap', 0, 0.44 + h + 0.13, 0));
    const rings = [1, 1, 2, 3][ms - 1];
    for (let i = 0; i < rings; i++) {
      const ring = glow(T, new T.TorusGeometry(cr * (1.22 + i * 0.26), 0.03, 10, 60), M.amber, 'energy_ring_' + i, 0, 0.5 + h * (0.35 + i * 0.28), 0);
      ring.rotation.x = Math.PI / 2 + (i - 1) * 0.26;
      g.add(ring);
      A(g).push({ obj: ring, type: 'spin', speed: [0.85, -0.55, 0.4][i] });
    }
    const pylons = [0, 3, 6, 6][ms - 1];
    const ph = [0, 0.6, 0.95, 1.5][ms - 1];
    for (let i = 0; i < pylons; i++) {
      const a = (i / pylons) * Math.PI * 2 + 0.5;
      const px = Math.cos(a) * br * 0.82, pz = Math.sin(a) * br * 0.82;
      g.add(mesh(T, box(T, 0.15, ph, 0.15), M.trim, 'pylon_' + i, px, 0.3 + ph / 2, pz));
      const tip = glow(T, new T.SphereGeometry(0.075, 12, 10), M.amber, 'pylon_tip_' + i, px, 0.3 + ph, pz);
      g.add(tip);
      A(g).push({ obj: tip, type: 'blink', phase: i * 0.5 });
      if (ms === 4) {
        const arm = mesh(T, box(T, 0.07, 0.07, br * 0.7), M.trim, 'buttress_' + i, px * 0.6, 0.3 + ph * 0.86, pz * 0.6);
        arm.rotation.y = -a; arm.rotation.x = 0.42;
        g.add(arm);
      }
    }
    if (ms === 4) {
      const disc = glow(T, cyl(T, br * 1.12, br * 1.12, 0.02, 6), M.amber, 'floor_field', 0, 0.31, 0);
      g.add(disc);
      A(g).push({ obj: disc, type: 'pulse', base: 0.7, phase: 1.1 });
      g.add(mesh(T, cyl(T, cr * 0.3, cr * 0.4, 0.5, 6), M.shellLight, 'crown', 0, 0.44 + h + 0.5, 0));
    }
    g.userData.isVault = true;
    return g;
  },

  // M1 one glass box · M2 + roof and vials · M3 + second wing · M4 three storeys + rooftop dome
  research_lab(T, M, ms) {
    const g = new T.Group(); g.name = 'research_lab';
    pad(T, M, g, ms);
    const s = [0.85, 1.15, 1.35, 1.45][ms - 1];
    const h = [0.42, 0.6, 0.66, 0.7][ms - 1];
    g.add(mesh(T, box(T, s, h, s), M.glass, 'glass_block', 0, 0.22 + h / 2, 0));
    if (ms >= 2) {
      g.add(mesh(T, box(T, s * 1.08, 0.07, s * 1.08), M.shellLight, 'roof', 0, 0.22 + h + 0.035, 0));
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        g.add(mesh(T, box(T, 0.08, h, 0.08), M.trim, 'mullion_' + i, Math.cos(a) * s * 0.5, 0.22 + h / 2, Math.sin(a) * s * 0.5));
      }
      const vials = [0, 2, 3, 5][ms - 1];
      for (let i = 0; i < vials; i++) {
        const v = glow(T, cyl(T, 0.1, 0.1, 0.38, 16), M.green, 'culture_vial_' + i, -0.3 + i * 0.16, 0.22 + h + 0.26, s * 0.24);
        g.add(v);
        A(g).push({ obj: v, type: 'pulse', base: 1.3, phase: i * 0.8 });
      }
    }
    if (ms >= 3) {
      const wy = 0.22, wh = h * 0.8;
      g.add(mesh(T, box(T, s * 0.62, wh, s * 0.62), M.glass, 'wing_block', s * 0.78, wy + wh / 2, -s * 0.3));
      g.add(mesh(T, box(T, s * 0.68, 0.06, s * 0.68), M.shellLight, 'wing_roof', s * 0.78, wy + wh + 0.03, -s * 0.3));
      g.add(mesh(T, box(T, s * 0.6, 0.06, 0.16), M.trim, 'skybridge', s * 0.42, 0.22 + h * 0.66, -s * 0.16));
      g.add(mesh(T, cyl(T, 0.11, 0.14, 0.66, 12), M.shell, 'vent_stack', -s * 0.42, 0.22 + h + 0.33, -s * 0.36));
    }
    if (ms === 4) {
      const y2 = 0.22 + h + 0.07;
      g.add(mesh(T, box(T, s * 0.78, h * 0.8, s * 0.78), M.glass, 'upper_storey', -s * 0.1, y2 + h * 0.4, 0));
      g.add(mesh(T, box(T, s * 0.86, 0.06, s * 0.86), M.shellLight, 'upper_roof', -s * 0.1, y2 + h * 0.8 + 0.03, 0));
      const domeY = y2 + h * 0.8 + 0.06;
      const gh = mesh(T, new T.SphereGeometry(0.3, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), M.shellTwoSided, 'greenhouse', -s * 0.1, domeY, 0);
      g.add(gh);
      const gl = glow(T, new T.SphereGeometry(0.16, 18, 12), M.green, 'greenhouse_core', -s * 0.1, domeY + 0.1, 0);
      g.add(gl);
      A(g).push({ obj: gl, type: 'pulse', base: 1.5, phase: 0.3 });
      for (let i = 0; i < 4; i++) g.add(mesh(T, box(T, 0.3, 0.05, 0.12), M.trim, 'stair_' + i, s * 0.6, 0.3 + i * 0.2, s * 0.5));
    }
    return g;
  },

  // M1 reactor hall · M2 + one tower · M3 + two towers, pipes · M4 tower row + sphere + gantry
  fusion_plant(T, M, ms) {
    const g = new T.Group(); g.name = 'fusion_plant';
    const w = pad(T, M, g, ms);
    const hallS = [0.62, 0.7, 0.78, 0.86][ms - 1];
    g.add(mesh(T, box(T, hallS, hallS * 0.7, hallS), M.shellLight, 'reactor_hall', w * 0.26, 0.22 + hallS * 0.35, w * 0.26));
    const coil = glow(T, new T.TorusGeometry(hallS * 0.32, 0.06, 12, 32), M.amber, 'plasma_coil', w * 0.26, 0.24 + hallS * 0.7, w * 0.26);
    coil.rotation.x = Math.PI / 2;
    g.add(coil);
    A(g).push({ obj: coil, type: 'spin', speed: 1.2 });
    const towers = [0, 1, 2, 3][ms - 1];
    for (let i = 0; i < towers; i++) {
      const H = 0.85 + i * 0.28;
      const pts = [];
      for (let k = 0; k <= 12; k++) {
        const t = k / 12;
        pts.push(new T.Vector2(0.4 - 0.19 * Math.sin(t * Math.PI * 0.86) + 0.1 * t, t * H));
      }
      const a = (i / Math.max(1, towers)) * Math.PI * 1.1 + Math.PI * 0.62;
      const tx = Math.cos(a) * w * 0.3, tz = Math.sin(a) * w * 0.3;
      g.add(mesh(T, new T.LatheGeometry(pts, 30), M.shellTwoSided, 'cooling_tower_' + i, tx, 0.22, tz));
      const rim = glow(T, new T.TorusGeometry(0.31, 0.024, 8, 36), M.amber, 'tower_rim_' + i, tx, 0.22 + H, tz);
      rim.rotation.x = Math.PI / 2;
      g.add(rim);
      A(g).push({ obj: rim, type: 'pulse', base: 1.4, phase: i * 0.7 });
    }
    if (ms >= 3) for (let i = 0; i < 3; i++) {
      const p = mesh(T, cyl(T, 0.055, 0.055, w * 0.72, 12), M.trim, 'pipe_' + i, -0.1 + i * 0.2, 0.42 + i * 0.05, w * 0.3);
      p.rotation.z = Math.PI / 2;
      g.add(p);
    }
    if (ms === 4) {
      const sph = mesh(T, new T.SphereGeometry(0.42, 26, 18), M.shell, 'containment_sphere', -w * 0.3, 0.22 + 0.5, -w * 0.24);
      g.add(sph);
      const band = glow(T, new T.TorusGeometry(0.44, 0.026, 8, 44), M.amber, 'sphere_band', -w * 0.3, 0.72, -w * 0.24);
      band.rotation.x = Math.PI / 2 - 0.3;
      g.add(band);
      A(g).push({ obj: band, type: 'spin', speed: -0.7 });
      g.add(mesh(T, box(T, w * 0.9, 0.07, 0.14), M.trim, 'gantry', 0, 1.05, 0));
      for (const sx of [-1, 1]) g.add(mesh(T, cyl(T, 0.09, 0.12, 1.0, 12), M.trim, 'stack_' + (sx > 0 ? 'r' : 'l'), sx * w * 0.4, 0.72, -w * 0.4));
    }
    return g;
  },

  // M1 stub mast · M2 mast + dish · M3 lattice mast + 3 dishes · M4 mega array + radar bar
  signal_array(T, M, ms) {
    const g = new T.Group(); g.name = 'signal_array';
    pad(T, M, g, ms);
    const H = [0.7, 1.25, 1.85, 2.5][ms - 1];
    const legR = [0.1, 0.16, 0.22, 0.28][ms - 1];
    const legs = ms === 1 ? 1 : 4;
    for (let i = 0; i < legs; i++) {
      const a = (i / legs) * Math.PI * 2 + Math.PI / 4;
      g.add(mesh(T, box(T, 0.07, H, 0.07), M.trim, 'mast_leg_' + i, legs === 1 ? 0 : Math.cos(a) * legR, 0.22 + H / 2, legs === 1 ? 0 : Math.sin(a) * legR));
    }
    if (ms >= 2) for (let i = 1; i <= ms + 1; i++) {
      const y = 0.22 + (H * i) / (ms + 2);
      const br = mesh(T, box(T, legR * 2.1, 0.045, legR * 2.1), M.trim, 'mast_brace_' + i, 0, y, 0);
      br.rotation.y = i * 0.45;
      g.add(br);
    }
    const dishPts = [];
    for (let i = 0; i <= 10; i++) { const t = i / 10, r = t * 0.55; dishPts.push(new T.Vector2(r, r * r * 0.6)); }
    const dishes = [0, 1, 3, 4][ms - 1];
    for (let i = 0; i < dishes; i++) {
      const main = i === 0;
      const scale = main ? 1 : 0.52;
      const a = (i / Math.max(1, dishes - 1)) * Math.PI * 1.4 + 0.4;
      const dx = main ? 0 : Math.cos(a) * (legR + 0.42);
      const dz = main ? 0 : Math.sin(a) * (legR + 0.42);
      const dy = main ? 0.22 + H + 0.2 : 0.22 + H * (0.5 + 0.12 * i);
      const d = mesh(T, new T.LatheGeometry(dishPts.map(p => new T.Vector2(p.x * scale, p.y * scale)), 30), M.shellTwoSided, main ? 'dish_main' : 'dish_' + i, dx, dy, dz);
      d.rotation.z = 0.75; d.rotation.x = 0.2 + i * 0.3;
      g.add(d);
      if (!main) g.add(mesh(T, box(T, 0.05, 0.05, 0.42), M.trim, 'outrigger_' + i, dx * 0.5, dy, dz * 0.5));
      const feed = glow(T, new T.SphereGeometry(main ? 0.08 : 0.05, 12, 10), M.cyan, 'feed_' + i, dx + 0.14 * scale, dy + 0.22 * scale, dz);
      g.add(feed);
      if (main) A(g).push({ obj: d, type: 'sweep', speed: 0.35 });
    }
    const beacon = glow(T, new T.SphereGeometry(0.06, 12, 10), M.cyan, 'beacon', 0, 0.22 + H + 0.04, 0);
    g.add(beacon);
    A(g).push({ obj: beacon, type: 'blink', phase: 0 });
    if (ms === 4) {
      const bar = glow(T, box(T, 1.5, 0.05, 0.11), M.cyan, 'radar_bar', 0, 0.22 + H * 0.72, 0);
      g.add(bar);
      A(g).push({ obj: bar, type: 'spinY', speed: 0.9 });
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const guy = mesh(T, cyl(T, 0.012, 0.012, H * 1.05, 6), M.trim, 'guy_wire_' + i, Math.cos(a) * 0.5, 0.22 + H * 0.5, Math.sin(a) * 0.5);
        guy.rotation.z = Math.cos(a) * 0.4; guy.rotation.x = -Math.sin(a) * 0.4;
        g.add(guy);
      }
    }
    return g;
  },

  // M1 single silo · M2 two + catwalk · M3 four + control shed · M4 six + elevator + conveyor
  memory_silo(T, M, ms) {
    const g = new T.Group(); g.name = 'memory_silo';
    const w = pad(T, M, g, ms);
    const n = [1, 2, 4, 6][ms - 1];
    const H = [0.7, 0.9, 1.05, 1.2][ms - 1];
    const r = [0.32, 0.3, 0.28, 0.26][ms - 1];
    const ring = n === 1 ? 0 : w * 0.26;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = Math.cos(a) * ring, z = Math.sin(a) * ring;
      g.add(mesh(T, cyl(T, r, r * 1.06, H, 22), M.shell, 'silo_' + i, x, 0.22 + H / 2, z));
      g.add(mesh(T, cyl(T, r * 0.58, r * 1.06, 0.18, 22), M.shellLight, 'silo_cap_' + i, x, 0.22 + H + 0.09, z));
      const band = glow(T, new T.TorusGeometry(r * 1.08, 0.02, 8, 28), M.cyan, 'silo_band_' + i, x, 0.22 + H * 0.6, z);
      band.rotation.x = Math.PI / 2;
      g.add(band);
      A(g).push({ obj: band, type: 'pulse', base: 1.2, phase: i * 0.7 });
    }
    if (ms >= 2) g.add(mesh(T, box(T, ring * 2.1, 0.08, 0.14), M.trim, 'catwalk', 0, 0.22 + H * 0.82, 0));
    if (ms >= 3) g.add(mesh(T, box(T, 0.42, 0.34, 0.42), M.shellLight, 'control_shed', 0, 0.39, 0));
    if (ms === 4) {
      g.add(mesh(T, box(T, 0.26, H + 0.6, 0.26), M.shell, 'elevator_tower', 0, 0.22 + (H + 0.6) / 2, 0));
      const conv = mesh(T, box(T, ring * 2.3, 0.09, 0.18), M.trim, 'conveyor', 0, 0.22 + H + 0.5, 0);
      conv.rotation.y = 0.6;
      g.add(conv);
      const light = glow(T, new T.SphereGeometry(0.07, 12, 10), M.cyan, 'tower_light', 0, 0.22 + H + 0.68, 0);
      g.add(light);
      A(g).push({ obj: light, type: 'blink', phase: 0.2 });
    }
    return g;
  },

  // M1 bare chip · M2 short cryostat · M3 tall staged cryostat · M4 twin cryostat + helium farm
  quantum_annealer(T, M, ms) {
    const g = new T.Group(); g.name = 'quantum_annealer';
    const w = pad(T, M, g, ms);
    const H = [0.36, 0.72, 1.1, 1.45][ms - 1];
    const rad = [0.34, 0.5, 0.62, 0.72][ms - 1];
    const chip = glow(T, box(T, 0.2, 0.07, 0.2), M.violet, 'qpu', 0, 0.28, 0);
    g.add(chip);
    A(g).push({ obj: chip, type: 'pulse', base: 1.6, phase: 0 });
    const stages = [1, 3, 5, 6][ms - 1];
    for (let i = 0; i < stages; i++) {
      const t = i / stages, rr = rad * (1 - t * 0.62);
      g.add(mesh(T, cyl(T, rr, rr, 0.055, 28), M.trim, 'stage_' + i, 0, 0.3 + H - t * (H - 0.06), 0));
    }
    if (ms >= 2) {
      g.add(mesh(T, cyl(T, rad * 1.16, rad * 1.16, 0.09, 28), M.shellLight, 'gantry', 0, 0.24 + H, 0));
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        g.add(mesh(T, cyl(T, 0.016, 0.016, H - 0.1, 8), M.trim, 'wire_' + i, Math.cos(a) * rad * 0.66, 0.24 + H / 2, Math.sin(a) * rad * 0.66));
      }
      g.add(mesh(T, cyl(T, rad * 1.2, rad * 1.2, H, 28, 1, true), M.shellTwoSided, 'cryo_shroud', 0, 0.24 + H / 2, 0));
    }
    if (ms >= 3) {
      const halo = glow(T, new T.TorusGeometry(rad * 1.24, 0.02, 8, 44), M.violet, 'field_ring', 0, 0.28, 0);
      halo.rotation.x = Math.PI / 2;
      g.add(halo);
      A(g).push({ obj: halo, type: 'pulse', base: 1.1, phase: 0.5 });
    }
    if (ms === 4) {
      g.add(mesh(T, cyl(T, rad * 0.62, rad * 0.62, H * 0.7, 24, 1, true), M.shellTwoSided, 'second_cryostat', w * 0.3, 0.24 + H * 0.35, -w * 0.28));
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + 0.8;
        g.add(mesh(T, cyl(T, 0.14, 0.14, 0.5, 18), M.shell, 'helium_tank_' + i, Math.cos(a) * w * 0.4, 0.47, Math.sin(a) * w * 0.4));
      }
      g.add(mesh(T, box(T, w * 0.9, 0.07, 0.13), M.trim, 'crane', 0, 0.3 + H + 0.24, 0));
    }
    return g;
  },

  // M1 pad · M2 hangar + drone · M3 + control tower, 2 drones · M4 full bay, 4 drones, radar
  drone_bay(T, M, ms) {
    const g = new T.Group(); g.name = 'drone_bay';
    const w = pad(T, M, g, ms);
    const padR = [0.44, 0.5, 0.56, 0.62][ms - 1];
    g.add(mesh(T, cyl(T, padR, padR, 0.05, 32), M.deck, 'landing_pad', 0, 0.25, w * 0.2));
    const pr = glow(T, new T.TorusGeometry(padR * 0.92, 0.024, 8, 44), M.cyan, 'pad_ring', 0, 0.28, w * 0.2);
    pr.rotation.x = Math.PI / 2;
    g.add(pr);
    A(g).push({ obj: pr, type: 'pulse', base: 1.2, phase: 0.3 });
    if (ms >= 2) {
      const hw = w * 0.86, hh = [0, 0.34, 0.42, 0.55][ms - 1];
      g.add(mesh(T, box(T, hw, hh, w * 0.42), M.shell, 'hangar', 0, 0.22 + hh / 2, -w * 0.26));
      g.add(mesh(T, box(T, hw * 1.04, 0.08, w * 0.46), M.shellLight, 'hangar_roof', 0, 0.22 + hh + 0.04, -w * 0.26));
      if (ms >= 3) g.add(mesh(T, box(T, hw * 0.6, hh * 0.8, 0.03), M.glass, 'hangar_door', 0, 0.22 + hh * 0.4, -w * 0.05));
    }
    if (ms >= 3) {
      g.add(mesh(T, box(T, 0.28, 0.9, 0.28), M.shell, 'control_tower', -w * 0.4, 0.67, -w * 0.34));
      g.add(mesh(T, box(T, 0.38, 0.24, 0.38), M.glass, 'tower_cab', -w * 0.4, 1.2, -w * 0.34));
    }
    const drones = [0, 1, 2, 4][ms - 1];
    for (let i = 0; i < drones; i++) {
      const d = new T.Group(); d.name = 'drone_' + i;
      d.add(mesh(T, box(T, 0.2, 0.07, 0.2), M.shellLight, 'drone_body_' + i));
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
        d.add(mesh(T, cyl(T, 0.08, 0.08, 0.014, 14), M.trim, 'rotor_' + i + '_' + k, Math.cos(a) * 0.18, 0.045, Math.sin(a) * 0.18));
      }
      const eye = glow(T, new T.SphereGeometry(0.03, 10, 8), M.cyan, 'drone_eye_' + i, 0, 0, 0.11);
      d.add(eye);
      if (i === 0) { d.position.set(0, 0.62, w * 0.2); A(g).push({ obj: d, type: 'hover', base: 0.62 }); }
      else { const a = (i / 4) * Math.PI * 2; d.position.set(Math.cos(a) * w * 0.34, 0.36, Math.sin(a) * w * 0.34 - w * 0.05); }
      g.add(d);
    }
    if (ms === 4) {
      const radar = glow(T, box(T, 0.7, 0.04, 0.09), M.cyan, 'tower_radar', -w * 0.4, 1.38, -w * 0.34);
      g.add(radar);
      A(g).push({ obj: radar, type: 'spinY', speed: 1.1 });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const l = glow(T, new T.SphereGeometry(0.035, 8, 6), M.cyan, 'approach_light_' + i, Math.cos(a) * padR * 1.35, 0.28, Math.sin(a) * padR * 1.35 + w * 0.2);
        g.add(l);
        A(g).push({ obj: l, type: 'blink', phase: i * 0.4 });
      }
    }
    return g;
  },

  // M1 tank · M2 finned tank · M3 twin tanks + manifold · M4 tank farm + condenser gantry
  cryo_cooler(T, M, ms) {
    const g = new T.Group(); g.name = 'cryo_cooler';
    const w = pad(T, M, g, ms);
    const n = [1, 1, 2, 3][ms - 1];
    const H = [0.6, 0.85, 1.0, 1.15][ms - 1];
    const r = [0.4, 0.46, 0.4, 0.36][ms - 1];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + 0.6;
      const x = n === 1 ? 0 : Math.cos(a) * w * 0.24, z = n === 1 ? 0 : Math.sin(a) * w * 0.24;
      g.add(mesh(T, cyl(T, r, r * 1.1, H, 26), M.shell, 'cryo_tank_' + i, x, 0.22 + H / 2, z));
      if (ms >= 2) {
        const fins = 2 + ms;
        for (let k = 0; k < fins; k++) g.add(mesh(T, cyl(T, r * 1.34, r * 1.34, 0.03, 26), M.trim, 'fin_' + i + '_' + k, x, 0.3 + (H - 0.16) * (k / fins), z));
      }
      g.add(mesh(T, cyl(T, r * 0.6, r * 1.06, 0.2, 26), M.shellLight, 'cryo_cap_' + i, x, 0.22 + H + 0.1, z));
      const frost = glow(T, new T.TorusGeometry(r * 1.42, 0.026, 8, 40), M.cyan, 'frost_ring_' + i, x, 0.28, z);
      frost.rotation.x = Math.PI / 2;
      g.add(frost);
      A(g).push({ obj: frost, type: 'pulse', base: 1.0, phase: i * 0.8 });
    }
    if (ms >= 3) for (let i = 0; i < 2; i++) {
      const p = mesh(T, cyl(T, 0.05, 0.05, w * 0.66, 12), M.trim, 'manifold_' + i, 0, 0.5 + i * 0.22, 0);
      p.rotation.z = Math.PI / 2; p.rotation.y = i * 0.9;
      g.add(p);
    }
    if (ms === 4) {
      g.add(mesh(T, box(T, w * 0.92, 0.08, 0.15), M.trim, 'condenser_gantry', 0, 0.22 + H + 0.34, 0));
      for (const sx of [-1, 1]) {
        g.add(mesh(T, cyl(T, 0.08, 0.1, 0.7, 12), M.shell, 'vapor_stack_' + (sx > 0 ? 'r' : 'l'), sx * w * 0.36, 0.22 + H + 0.2, -w * 0.3));
        const v = glow(T, new T.SphereGeometry(0.05, 10, 8), M.cyan, 'stack_tip_' + (sx > 0 ? 'r' : 'l'), sx * w * 0.36, 0.22 + H + 0.56, -w * 0.3);
        g.add(v);
        A(g).push({ obj: v, type: 'blink', phase: sx > 0 ? 0 : 0.6 });
      }
    }
    return g;
  }
};

const ASSETS = [
  { key: 'server_farm', name: 'SERVER FARM', cls: 'COMPUTE', accent: 'cyan' },
  { key: 'training_cluster', name: 'TRAINING CLUSTER', cls: 'INTELLIGENCE', accent: 'violet' },
  { key: 'containment_vault', name: 'CONTAINMENT VAULT', cls: 'CONTAINMENT', accent: 'amber' },
  { key: 'research_lab', name: 'RESEARCH LAB', cls: 'SCIENCE', accent: 'green' },
  { key: 'quantum_annealer', name: 'QUANTUM ANNEALER', cls: 'COMPUTE', accent: 'violet' },
  { key: 'fusion_plant', name: 'FUSION PLANT', cls: 'POWER', accent: 'amber' },
  { key: 'signal_array', name: 'SIGNAL ARRAY', cls: 'COMPUTE', accent: 'cyan' },
  { key: 'drone_bay', name: 'DRONE BAY', cls: 'LOGISTICS', accent: 'cyan' },
  { key: 'cryo_cooler', name: 'CRYO COOLER', cls: 'POWER', accent: 'cyan' },
  { key: 'memory_silo', name: 'MEMORY SILO', cls: 'COMPUTE', accent: 'cyan' }
];

// 10 upgrade levels, 4 visual milestones.
function levelToMilestone(level) {
  const l = Math.max(1, Math.min(10, level));
  return l <= 2 ? 1 : l <= 5 ? 2 : l <= 8 ? 3 : 4;
}
const MILESTONE_LEVELS = [[1, 2], [3, 5], [6, 8], [9, 10]];

function buildAsset(THREE, M, key, tier = 4) {
  const b = BUILDERS[key];
  if (!b) throw new Error('unknown asset ' + key);
  const g = b(THREE, M, Math.max(1, Math.min(4, tier)));
  g.userData.anim = g.userData.anim || [];
  for (const a of g.userData.anim) {
    if (a.type === 'pulse' || a.type === 'blink') a.obj.material = a.obj.material.clone();
  }
  return g;
}

function stepAnim(anim, t) {
  for (const a of anim) {
    if (a.type === 'spin') a.obj.rotation.z = t * a.speed;
    else if (a.type === 'sweep') a.obj.rotation.y = Math.sin(t * a.speed) * 0.9;
    else if (a.type === 'pulse') a.obj.material.emissiveIntensity = a.base * (0.6 + 0.4 * Math.sin(t * 2 + (a.phase || 0)));
    else if (a.type === 'blink') a.obj.material.emissiveIntensity = 0.35 + 1.3 * Math.pow(0.5 + 0.5 * Math.sin(t * 1.6 + (a.phase || 0)), 6);
    else if (a.type === 'hover') a.obj.position.y = a.base + Math.sin(t * 1.4) * 0.06;
    else if (a.type === 'spinY') a.obj.rotation.y = t * a.speed;
    else if (a.type === 'tumble') { a.obj.rotation.y = t * a.speed; a.obj.rotation.x = Math.sin(t * a.speed * 0.8) * 0.22; }
    else if (a.type === 'sway') a.obj.rotation.y = a.base + Math.sin(t * a.speed + (a.phase || 0)) * 0.16;
    else if (a.type === 'drift') { a.obj.position.y = a.base + Math.sin(t * a.speed + (a.phase || 0)) * 0.11; a.obj.rotation.y = t * 0.4 + (a.phase || 0); }
  }
}


{

const LAYOUT = [
  { key: 'containment_vault', tier: 3, x: 0, z: 0 },
  { key: 'server_farm', tier: 3, x: -3.86, z: -0.92 },
  { key: 'training_cluster', tier: 3, x: -1.74, z: -4.88 },
  { key: 'signal_array', tier: 2, x: -5.8, z: -5.24 },
  { key: 'memory_silo', tier: 2, x: 2.94, z: -0.36 },
  { key: 'research_lab', tier: 2, x: -1.01, z: 2.85 },
  { key: 'cryo_cooler', tier: 2, x: 4.69, z: 1.94 },
  { key: 'fusion_plant', tier: 2, x: 2.94, z: 5.53 }
];

// Sector islands sit on a cream void - a cartoon board, not a dark world.
const GRASS = 0xa9d98c;
const GRASS_DEEP = 0x86bd6c;
const SOIL = 0xc9ab7e;
const PATH = 0xe4e6da;

function glowSprite(color, size) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  const hex = '#' + color.toString(16).padStart(6, '0');
  g.addColorStop(0, hex + 'cc');
  g.addColorStop(0.4, hex + '55');
  g.addColorStop(1, hex + '00');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  sp.scale.set(size, size, 1);
  return sp;
}

// Pastel version of a class accent, for the skirt band around each pad.
const SKIRT = { cyan: 0x8fd8e8, violet: 0xb8a4f5, amber: 0xf5c98a, green: 0x92e0b4 };
function tintSkirt(THREE, group, accent) {
  const hex = SKIRT[accent] || SKIRT.cyan;
  group.traverse((o) => {
    if (!o.isMesh || !/_edge$/.test(o.name || '')) return;
    o.material = o.material.clone();
    o.material.name = 'skirt_' + accent;
    o.material.color.setHex(hex);
  });
}

// A slab with grass on top, soil on the sides - the classic cartoon island.
const ISLAND_CAP = 0.28;

// An island is a soil block with a grass cap on top. The handoff gave both
// boxes the same w x d footprint AND ran the soil all the way up to y=0, the
// cap's own top - so the two top faces were exactly coplanar and their side
// walls overlapped. Coplanar faces have no depth ordering, so the GPU picked a
// winner per pixel and the ground tore into a flickering brown/green
// checkerboard that shifted as the camera orbited. Stopping the soil where the
// cap begins leaves them stacked and adjacent instead of overlapping, with the
// silhouette (y = -h at the base, grass at y = 0) unchanged.
function island(w, d, h, top, side) {
  const g = new THREE.Group();
  const bodyH = Math.max(h - ISLAND_CAP, 0.01);
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, bodyH, d), new THREE.MeshToonMaterial({ color: side }));
  body.position.y = -ISLAND_CAP - bodyH / 2;
  body.receiveShadow = true; body.castShadow = true;
  g.add(body);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(w, ISLAND_CAP, d), new THREE.MeshToonMaterial({ color: top }));
  cap.position.y = -ISLAND_CAP / 2;
  cap.receiveShadow = true;
  g.add(cap);
  return g;
}

class LabScene extends HTMLElement {
  static get observedAttributes() { return ['mode', 'threat', 'select', 'orbit']; }

  connectedCallback() {
    if (this._booted) return;
    this._booted = true;
    this.style.display = 'block';
    this.style.position = 'absolute';
    this.style.inset = '0';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    this.appendChild(canvas);

    // preserveDrawingBuffer forces the browser to keep a copy of the frame
    // instead of handing the buffer straight to the compositor - it is the
    // usual cause of stutter when a big canvas scrolls past. Nothing here
    // reads pixels back, so it is off.
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // The sun never moves and only small props cast moving shadows, so the
    // shadow pass runs every other frame instead of every frame.
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;
    const M = makeMaterials(THREE);
    this._M = M;

    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 140);
    cam.position.set(13, 13.6, 13);
    cam.lookAt(-0.6, 0.95, -0.4);
    this._cam = cam;

    // Bright sky-dome bounce + one soft sun. No moody rim lighting.
    scene.add(new THREE.HemisphereLight(0xdff0ff, 0xa8c0ac, 0.4));
    scene.add(new THREE.AmbientLight(0xfff6e8, 0.1));
    const sun = new THREE.DirectionalLight(0xfff3dc, 2.6);
    // Cross-light: the camera sits at +x/+z, so the sun goes to +x/-z and
    // shadows fall toward the viewer's left-front where they actually read.
    sun.position.set(11, 14, -7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    const d = 9;
    sun.shadow.camera.left = -d; sun.shadow.camera.right = d;
    sun.shadow.camera.top = d; sun.shadow.camera.bottom = -d;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 46;
    sun.shadow.normalBias = 0.035;
    scene.add(sun);

    const core = island(13.4, 13.4, 1.5, GRASS, SOIL);
    core.name = 'sector_core';
    scene.add(core);

    // Paved plaza around the vault, so the centre reads as built-up.
    const plaza = new THREE.Mesh(new THREE.CylinderGeometry(3.9, 3.9, 0.1, 6), new THREE.MeshToonMaterial({ color: PATH }));
    plaza.name = 'plaza';
    plaza.position.y = 0.02;
    plaza.rotation.y = 0.26;
    plaza.receiveShadow = true;
    scene.add(plaza);

    // Locked sectors: pale, desaturated islands floating just below.
    const lockedTop = 0xb9c8bb, lockedSide = 0xb3ab9c;
    for (const [sx, sz, w, h] of [[0, -12.6, 16, 6], [14.2, 0, 8, 16], [0, 12.6, 16, 6]]) {
      const s = island(w, h, 0.7, lockedTop, lockedSide);
      s.name = 'sector_locked';
      s.position.set(sx, -0.7, sz);
      scene.add(s);
    }

    // Scattered props so the ground isn't empty.
    const rock = new THREE.MeshToonMaterial({ color: 0xb9bfae });
    const bush = new THREE.MeshToonMaterial({ color: GRASS_DEEP });
    const props = new THREE.Group(); props.name = 'props';
    const spots = [[-5.4, 2.2], [-4.6, 4.6], [5.2, -3.4], [5.6, 4.2], [-2.0, 5.6], [3.4, -5.0], [-5.8, -1.6], [1.2, -5.8], [4.9, 5.4], [-3.2, -5.9], [6.0, 0.8], [-1.4, -6.4]];
    spots.forEach(([x, z], i) => {
      if (i % 2) {
        const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + (i % 3) * 0.08), rock);
        r.position.set(x, 0.14, z);
        r.rotation.set(i, i * 0.7, 0);
        r.castShadow = true; r.receiveShadow = true;
        props.add(r);
      } else {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 9), bush);
        b.position.set(x, 0.18, z);
        b.scale.set(1, 0.74, 1);
        b.castShadow = true; b.receiveShadow = true;
        props.add(b);
        const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 9), bush);
        b2.position.set(x + 0.38, 0.12, z + 0.18);
        b2.scale.set(1, 0.7, 1);
        b2.castShadow = true;
        props.add(b2);
      }
    });
    scene.add(props);

    this._anim = [];
    this._buildings = [];
    for (const spec of LAYOUT) {
      const g = buildAsset(THREE, M, spec.key, spec.tier);
      const meta = ASSETS.find(a => a.key === spec.key);
      if (meta) tintSkirt(THREE, g, meta.accent);
      g.position.set(spec.x, 0, spec.z);
      g.rotation.y = spec.key === 'containment_vault' ? 0.26 : 0;
      scene.add(g);
      this._anim.push(...g.userData.anim);
      this._buildings.push({ spec, group: g });
      if (spec.key === 'server_farm') this._serverPos = new THREE.Vector3(spec.x, 0, spec.z);
    }

    this._vaultGlow = glowSprite(ACCENTS.amber, 6);
    this._vaultGlow.position.set(0, 1.6, 0);
    scene.add(this._vaultGlow);

    this._conduits = [];
    const conduitMat = new THREE.MeshToonMaterial({ color: ACCENTS.cyan, transparent: true, opacity: 0.85 });
    conduitMat.name = 'conduit';
    this._conduitMat = conduitMat;
    const trackMat = new THREE.MeshToonMaterial({ color: PATH });
    const packetMat = new THREE.MeshToonMaterial({ color: 0xffffff, emissive: ACCENTS.cyan, emissiveIntensity: 0.8 });
    this._packetMat = packetMat;
    for (const spec of LAYOUT) {
      if (spec.key === 'containment_vault') continue;
      const a = new THREE.Vector3(spec.x, 0.05, spec.z);
      const b = new THREE.Vector3(0, 0.05, 0);
      const len = a.distanceTo(b);
      // Pale paved track with a coloured pipe laid on it - reads at a glance.
      const track = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, len), trackMat);
      track.position.copy(a.clone().lerp(b, 0.5));
      track.position.y = 0.05;
      track.lookAt(b.x, 0.05, b.z);
      track.receiveShadow = true;
      scene.add(track);
      const pipe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.05, len), conduitMat);
      pipe.position.copy(track.position);
      pipe.position.y = 0.1;
      pipe.rotation.copy(track.rotation);
      scene.add(pipe);
      const packets = [];
      for (let i = 0; i < 2; i++) {
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 9), packetMat);
        p.castShadow = true;
        scene.add(p);
        packets.push({ mesh: p, offset: i * 0.5 });
      }
      this._conduits.push({ a, b, packets });
    }

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.05, 8, 48), new THREE.MeshToonMaterial({ color: 0xffffff, emissive: ACCENTS.cyan, emissiveIntensity: 1 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.12;
    ring.visible = false;
    scene.add(ring);
    this._selectRing = ring;

    // The handoff hard-coded an 8.7-unit orthographic width, framed for the
    // 390x844 phone mockup this scene was originally built inside (note the
    // fallback dimensions below). The lab itself spans ~40x25 units at this
    // camera angle, so in a wide desktop panel that constant showed roughly 5%
    // of it - a cropped close-up of two rooftops with everything sliding off
    // the edges. Frame to fit instead: guarantee at least FIT_W across and
    // FIT_H down, whichever the panel's aspect makes binding.
    const FIT_W = 16, FIT_H = 9;
    this._resize = () => {
      const w = this.clientWidth || 390, h = this.clientHeight || 844;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      const width = Math.max(FIT_W, FIT_H * aspect);
      cam.left = -width / 2; cam.right = width / 2;
      cam.top = (width / aspect) / 2; cam.bottom = -(width / aspect) / 2;
      cam.updateProjectionMatrix();
    };
    this._resize();
    this._ro = new ResizeObserver(this._resize);
    this._ro.observe(this);

    this._visible = true;
    this._io = new IntersectionObserver(([e]) => {
      this._visible = e.isIntersecting;
      // Paint one frame straight away rather than waiting on the loop - an
      // animation frame is not guaranteed to be pending (background tab,
      // throttled rAF), and an empty panel reads as a broken render.
      if (this._visible) { renderer.shadowMap.needsUpdate = true; renderer.render(scene, cam); }
    }, { rootMargin: '200px' });
    this._io.observe(this);

    this._apply();
    this._t0 = performance.now();
    let frame = 0;
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      if (!this._visible) return;
      this._tick((performance.now() - this._t0) / 1000);
      renderer.shadowMap.needsUpdate = (frame++ & 1) === 0;
      renderer.render(scene, cam);
    };
    loop();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._ro && this._ro.disconnect();
    this._io && this._io.disconnect();
    this._renderer && this._renderer.dispose();
    this._booted = false;
  }

  attributeChangedCallback() { if (this._booted) this._apply(); }

  _apply() {
    const mode = this.getAttribute('mode') || 'calm';
    const threat = Number(this.getAttribute('threat') || 12);
    const breach = mode === 'breach', rising = mode === 'rising';
    const accent = breach ? ACCENTS.red : rising ? ACCENTS.amber : ACCENTS.cyan;
    this._conduitMat.color.setHex(accent);
    this._packetMat.emissive.setHex(accent);
    this._flow = breach ? 1.9 : rising ? 1.1 : 0.55;
    this._scene.traverse((o) => {
      if (o.material && o.material.emissive && /amber/.test(o.material.name || '')) {
        o.material.emissive.setHex(breach ? ACCENTS.red : ACCENTS.amber);
        if (o.material.color) o.material.color.setHex(breach ? ACCENTS.red : ACCENTS.amber);
      }
    });
    this._vaultGlow.material.map = glowSprite(breach ? ACCENTS.red : ACCENTS.amber, 1).material.map;
    this._vaultGlow.material.opacity = breach ? 0.95 : rising ? 0.7 : 0.42;
    this._vaultGlow.scale.setScalar(breach ? 8 : 5.6 + threat / 50);
    this._selectRing.visible = this.getAttribute('select') === 'server';
    if (this._selectRing.visible && this._serverPos) this._selectRing.position.set(this._serverPos.x, 0.12, this._serverPos.z);
    this._breach = breach;
  }

  _tick(t) {
    stepAnim(this._anim, t);
    const flow = this._flow || 0.55;
    for (const c of this._conduits) {
      for (const p of c.packets) {
        const u = ((t * flow + p.offset) % 1);
        p.mesh.position.lerpVectors(c.a, c.b, u);
        p.mesh.position.y = 0.24 + Math.sin(u * Math.PI) * 0.1;
        p.mesh.scale.setScalar(0.7 + 0.5 * Math.sin(u * Math.PI));
      }
    }
    const orbit = this.hasAttribute('orbit') ? (Number(this.getAttribute('orbit')) || 0.045) : 0;
    if (orbit) {
      const r = 18.38, a = Math.PI / 4 + t * orbit;
      this._cam.position.set(Math.cos(a) * r, 13.6, Math.sin(a) * r);
      this._cam.lookAt(-0.6, 0.95, -0.4);
    } else if (this._breach) {
      const j = Math.sin(t * 34) * 0.05 + Math.sin(t * 11) * 0.03;
      this._cam.position.set(13 + j, 13.6, 13 - j);
      this._cam.lookAt(-0.6, 0.95, -0.4);
    }
  }
}

customElements.define('lab-scene', LabScene);

}

{
// <lab-building asset="server_farm" level="9"> - one toon-shaded building on a
// pastel pad, slow turntable. Single WebGL context per element; pauses offscreen.

class LabBuilding extends HTMLElement {
  static get observedAttributes() { return ['asset', 'level']; }

  connectedCallback() {
    if (this._booted) return;
    this._booted = true;
    this.style.display = 'block';
    this.style.position = 'absolute';
    this.style.inset = '0';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    this.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;
    this._M = makeMaterials(THREE);

    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 90);
    this._cam = cam;

    scene.add(new THREE.HemisphereLight(0xdff0ff, 0xbcd0c0, 0.5));
    scene.add(new THREE.AmbientLight(0xfff6e8, 0.14));
    const sun = new THREE.DirectionalLight(0xfff3dc, 2.5);
    sun.position.set(6, 9, -4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    const d = 4.2;
    sun.shadow.camera.left = -d; sun.shadow.camera.right = d;
    sun.shadow.camera.top = d; sun.shadow.camera.bottom = -d;
    sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 26;
    sun.shadow.normalBias = 0.035;
    scene.add(sun);

    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.5, 0.34, 48),
      new THREE.MeshToonMaterial({ color: 0xdcecd6 })
    );
    pad.position.y = -0.17;
    pad.receiveShadow = true;
    scene.add(pad);
    const skirt = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.09, 8, 56),
      new THREE.MeshToonMaterial({ color: 0x8fd8e8 })
    );
    skirt.rotation.x = Math.PI / 2;
    skirt.position.y = -0.02;
    this._skirt = skirt;
    scene.add(skirt);

    this._turn = new THREE.Group();
    scene.add(this._turn);

    this._resize();
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);

    // Same offscreen gate <lab-scene> already had: without it this panel keeps
    // rendering a full frame while the visitor is up at the hero, and the two
    // canvases compete for the GPU.
    this._visible = true;
    this._io = new IntersectionObserver(([e]) => {
      this._visible = e.isIntersecting;
      if (this._visible) renderer.render(scene, cam);   // see note in <lab-scene>
    }, { rootMargin: '200px' });
    this._io.observe(this);

    this._build();
    renderer.render(scene, cam);
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      if (document.hidden || !this._visible) return;
      stepAnim(this._anim || [], t);
      this._turn.rotation.y = t * 0.28;
      renderer.render(scene, cam);
    });
  }

  disconnectedCallback() {
    if (this._ro) this._ro.disconnect();
    if (this._io) this._io.disconnect();
    if (this._renderer) { this._renderer.setAnimationLoop(null); this._renderer.dispose(); }
    this._booted = false;
  }

  attributeChangedCallback() { if (this._booted) this._build(); }

  _resize() {
    const w = this.clientWidth || 300, h = this.clientHeight || 300;
    this._renderer.setSize(w, h, false);
    const view = 3.5, a = w / h;
    const cam = this._cam;
    cam.left = -view * a; cam.right = view * a; cam.top = view; cam.bottom = -view;
    cam.updateProjectionMatrix();
    const r = 12;
    cam.position.set(r * 0.62, r * 0.58, r * 0.62);
    cam.lookAt(0, 1.05, 0);
  }

  // Group.clear() only detaches children - the GPU buffers behind them stay
  // allocated. _build() runs on every asset/level change, so without this a
  // drag across the slider strands a full building each step.
  _release() {
    const shared = new Set(Object.values(this._M || {}));
    this._turn.traverse((o) => {
      // Only meshes own their geometry - Sprite.geometry is a three.js
      // singleton and disposing it would break every other sprite.
      if (o.isMesh && o.geometry) o.geometry.dispose();
      if (!o.material) return;
      for (const m of (Array.isArray(o.material) ? o.material : [o.material])) {
        if (!m || shared.has(m)) continue;   // shared toon materials outlive the build
        if (m.map && m.map.isCanvasTexture) m.map.dispose();
        m.dispose();
      }
    });
    this._turn.clear();
  }

  _build() {
    const key = this.getAttribute('asset') || 'server_farm';
    const level = Number(this.getAttribute('level') || 9);
    this._release();
    let g;
    try { g = buildAsset(THREE, this._M, key, levelToMilestone(level)); }
    catch (e) { return; }
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this._turn.add(g);
    this._anim = g.userData.anim || [];
    const accent = this.getAttribute('accent');
    const SKIRT = { cyan: 0x8fd8e8, violet: 0xb8a4f5, amber: 0xf5c98a, green: 0x92e0b4 };
    if (accent && SKIRT[accent]) this._skirt.material.color.setHex(SKIRT[accent]);
  }
}

customElements.define('lab-building', LabBuilding);

}
})();
