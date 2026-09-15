// The world is generated once from fixed seeds, so every visitor and every
// capture of the poster sees the same valley and the same skyline. Heights are
// baked into buffers on the CPU: the GPU then only has to light them, and the
// tower layout, the river ribbon and the flight paths can all ask the same
// height function instead of guessing.
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Vector3,
} from "three";

export const SUN_DIR = new Vector3(0.4, 0.105, -0.91).normalize();
export const FILL_DIR = new Vector3(-0.78, 0.44, 0.44).normalize();

export const PALETTE = {
  zenith: new Color("#06090f"),
  horizon: new Color("#2a1c10"),
  horizonCool: new Color("#0c1b26"),
  haze: new Color("#120e0c"),
  sun: new Color("#ffd08a"),
  ground: new Color("#0f1520"),
  teal: new Color("#74d0d8"),
  body: new Color("#151d2b"),
  window: new Color("#f2b76b"),
  fill: new Color("#2f7f8c"),
};

export const FOG_DENSITY = 0.00075;

// Camera framing: the valley opens from the bottom centre and runs to the
// horizon right of centre, the sun sits low on the right, and the lower left
// stays quiet so the name has clean air.
export const CAM_POS = new Vector3(0, 100, 240);
export const CAM_TARGET = new Vector3(30, 50, -470);

const NEAR_Z = 70;
const FAR_Z = -1500;

/* Deterministic hashing. Math.sin is stable enough at these magnitudes and
   costs nothing to carry. */
function hash2(x: number, y: number) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}

function smooth(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = smooth(x - xi);
  const v = smooth(y - yi);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, octaves: number) {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let fx = x;
  let fy = y;
  for (let i = 0; i < octaves; i++) {
    sum += amp * vnoise(fx, fy);
    norm += amp;
    amp *= 0.5;
    fx = fx * 2.03 + 11.3;
    fy = fy * 2.03 - 7.1;
  }
  return sum / norm;
}

function ridged(x: number, y: number, octaves: number) {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let fx = x;
  let fy = y;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(vnoise(fx, fy) * 2 - 1);
    sum += amp * n * n;
    norm += amp;
    amp *= 0.52;
    fx = fx * 2.11 + 3.7;
    fy = fy * 2.11 + 19.4;
  }
  return sum / norm;
}

/** Centreline of the valley: bottom centre in the near field, bending right as
 *  it runs to the horizon. */
export function valleyX(z: number) {
  const t = clamp01((NEAR_Z - z) / 700);
  return 12 * t + 78 * t * t + 26 * Math.sin(t * 3.4) * t;
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

const VALLEY_HALF = 96;

/** Ground elevation. The river surface is y = 0, so the valley floor is carved
 *  below it and the banks climb away on both sides. */
export function terrainHeight(x: number, z: number) {
  const d = (x - valleyX(z)) / VALLEY_HALF;
  const m = Math.exp(-d * d * 1.5);
  const hills = fbm(x * 0.0026, z * 0.0026, 5);
  const ridge = ridged(x * 0.0052 + 4.2, z * 0.0052 - 2.6, 4);
  // Flanks rise further from the water and the far field lifts into hills.
  const far = clamp01((NEAR_Z - z) / 820);
  const relief = (hills * 62 + ridge * 46 * (0.35 + far)) * (0.16 + 0.84 * (1 - m));
  const bed = 22 * m + 5 * m * m;
  // A shallow terrace on the near right bank gives the city something to sit on.
  const terrace = 5 * Math.exp(-Math.pow((Math.abs(d) - 1.35) * 1.7, 2));
  return relief - bed + terrace;
}

function terrainNormal(x: number, z: number, out: Vector3) {
  const e = 3;
  const hx = terrainHeight(x + e, z) - terrainHeight(x - e, z);
  const hz = terrainHeight(x, z + e) - terrainHeight(x, z - e);
  return out.set(-hx, 2 * e, -hz).normalize();
}

/** Half width of the visible ground at a given depth, plus margin for the
 *  pointer and the scroll crane, so no vertex is spent outside the frame. */
function spanAt(z: number) {
  return (78 + 0.62 * (CAM_POS.z - z)) * 1.18;
}

const TERRAIN_COLS = 196;
const TERRAIN_ROWS = 168;

export function buildTerrainGeometry() {
  const cols = TERRAIN_COLS;
  const rows = TERRAIN_ROWS;
  const count = (cols + 1) * (rows + 1);
  const position = new Float32Array(count * 3);
  const normal = new Float32Array(count * 3);
  const n = new Vector3();
  let p = 0;
  for (let j = 0; j <= rows; j++) {
    const v = j / rows;
    const z = NEAR_Z + (FAR_Z - NEAR_Z) * Math.pow(v, 2.15);
    const half = spanAt(z);
    for (let i = 0; i <= cols; i++) {
      const u = i / cols;
      const x = (u * 2 - 1) * half;
      const y = terrainHeight(x, z);
      terrainNormal(x, z, n);
      position[p] = x;
      position[p + 1] = y;
      position[p + 2] = z;
      normal[p] = n.x;
      normal[p + 1] = n.y;
      normal[p + 2] = n.z;
      p += 3;
    }
  }
  const index = new Uint32Array(cols * rows * 6);
  let k = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i;
      const b = a + 1;
      const c = a + cols + 1;
      const d = c + 1;
      index[k] = a;
      index[k + 1] = c;
      index[k + 2] = b;
      index[k + 3] = b;
      index[k + 4] = c;
      index[k + 5] = d;
      k += 6;
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(position, 3));
  geo.setAttribute("aNormal", new BufferAttribute(normal, 3));
  geo.setIndex(new BufferAttribute(index, 1));
  geo.boundingSphere = null;
  geo.computeBoundingSphere();
  return geo;
}

/* A seeded generator so the skyline, the flight paths and the window pattern
   are the same on every load and in every capture. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The survey points: a sparse scan of the ground, densest over the city, that
 *  reads the terrain as data without becoming a particle field. */
export function buildPointCloud(count: number) {
  const rnd = mulberry32(0x5eed01);
  const position = new Float32Array(count * 3);
  const origin = new Float32Array(count * 3);
  const extra = new Float32Array(count * 2); // delay, brightness
  let i = 0;
  let guard = 0;
  while (i < count && guard < count * 40) {
    guard++;
    const z = NEAR_Z + (FAR_Z - NEAR_Z) * Math.pow(rnd(), 1.5);
    const half = spanAt(z);
    const x = (rnd() * 2 - 1) * half;
    // Densest along the banks where the city stands, thin out in the far hills.
    const d = Math.abs(x - valleyX(z));
    const near = Math.exp(-Math.pow((d - 150) / 210, 2));
    if (rnd() > 0.1 + 0.9 * near) continue;
    const y = terrainHeight(x, z);
    const j = i * 3;
    position[j] = x;
    position[j + 1] = y + rnd() * 3.2;
    position[j + 2] = z;
    // Scattered start: a shell centred on the city, so the gather reads as one
    // cloud collapsing onto the valley rather than dust falling everywhere.
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(rnd() * 1.6 - 0.6);
    const r = 320 + rnd() * 260;
    origin[j] = 40 + r * Math.sin(ph) * Math.cos(th);
    origin[j + 1] = 90 + r * Math.cos(ph) * 0.55;
    origin[j + 2] = -260 + r * Math.sin(ph) * Math.sin(th);
    extra[i * 2] = rnd();
    extra[i * 2 + 1] = 0.45 + rnd() * 0.55;
    i++;
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(position.subarray(0, i * 3), 3));
  geo.setAttribute("aOrigin", new BufferAttribute(origin.subarray(0, i * 3), 3));
  geo.setAttribute("aExtra", new BufferAttribute(extra.subarray(0, i * 2), 2));
  geo.computeBoundingSphere();
  return geo;
}

/** Where the ground comes out of the water on one side of the centreline. */
function shoreline(z: number, dir: number) {
  const cx = valleyX(z);
  let lo = 0;
  let hi = 260;
  if (terrainHeight(cx + dir * hi, z) < 0) return hi;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (terrainHeight(cx + dir * mid, z) < 0) lo = mid;
    else hi = mid;
  }
  return hi;
}

/** The river: a ribbon that fills the valley floor exactly up to the two banks,
 *  so the waterline is the terrain's own contour and never a seam. */
export function buildRiverGeometry() {
  const rows = 170;
  const cols = 14;
  const count = (cols + 1) * (rows + 1);
  const position = new Float32Array(count * 3);
  const uv = new Float32Array(count * 2);
  let p = 0;
  let q = 0;
  for (let j = 0; j <= rows; j++) {
    const v = j / rows;
    const z = NEAR_Z + 40 + (FAR_Z - NEAR_Z - 40) * Math.pow(v, 2.15);
    const cx = valleyX(z);
    const left = shoreline(z, -1) + 2;
    const right = shoreline(z, 1) + 2;
    for (let i = 0; i <= cols; i++) {
      const u = i / cols;
      position[p] = cx + (u * 2 - 1 < 0 ? (u * 2 - 1) * left : (u * 2 - 1) * right);
      position[p + 1] = 0;
      position[p + 2] = z;
      uv[q] = u;
      uv[q + 1] = v;
      p += 3;
      q += 2;
    }
  }
  const index = new Uint32Array(cols * rows * 6);
  let k = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i;
      const b = a + 1;
      const c = a + cols + 1;
      const d = c + 1;
      index[k] = a;
      index[k + 1] = c;
      index[k + 2] = b;
      index[k + 3] = b;
      index[k + 4] = c;
      index[k + 5] = d;
      k += 6;
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(position, 3));
  geo.setAttribute("uv", new BufferAttribute(uv, 2));
  geo.setIndex(new BufferAttribute(index, 1));
  geo.computeBoundingSphere();
  return geo;
}

export type Tower = {
  x: number;
  z: number;
  y: number;
  w: number;
  d: number;
  h: number;
  rot: number;
  variant: number;
  seed: number;
  lit: number;
  /** Fraction of the final height already standing. */
  build: number;
};

const DOWNTOWN = { x: 96, z: -300 };

/** The skyline. Towers cluster centre to centre-right, one landmark stands a
 *  third in from the left, and nothing is placed in the near foreground where
 *  the name sits. */
export function buildTowers(count: number): Tower[] {
  const rnd = mulberry32(0xb00c17);
  const towers: Tower[] = [];
  const landmark: Tower = {
    x: -74,
    z: -288,
    y: 0,
    w: 21,
    d: 21,
    h: 154,
    rot: 0.22,
    variant: 1,
    seed: rnd(),
    lit: 0.46,
    build: 1,
  };
  landmark.y = terrainHeight(landmark.x, landmark.z) - 1;
  towers.push(landmark);

  let guard = 0;
  while (towers.length < count && guard < count * 60) {
    guard++;
    const z = -20 - Math.pow(rnd(), 0.8) * 1110;
    const half = spanAt(z) * 0.92;
    const x = (rnd() * 2 - 1) * half;
    const bank = Math.abs(x - valleyX(z));
    if (bank < 46 || bank > 340) continue;
    const y = terrainHeight(x, z);
    if (y < 1.5) continue;
    // Keep the ground clear where the type sits and where the water reflects.
    if (z > -170 && x < 70) continue;
    const dx = (x - DOWNTOWN.x) / 250;
    const dz = (z - DOWNTOWN.z) / 460;
    const core = Math.exp(-(dx * dx + dz * dz));
    if (rnd() > 0.2 + 0.85 * core) continue;
    // Keep a corridor open on the bearing of the sun: the disc setting behind
    // the skyline is the picture, and one tall tower in front of it is not.
    const bearing = Math.atan2(x, CAM_POS.z - z);
    const sunBearing = Math.atan2(SUN_DIR.x, -SUN_DIR.z);
    const inCorridor = Math.abs(bearing - sunBearing) < 0.075;
    let ok = true;
    for (const t of towers) {
      const sx = x - t.x;
      const sz = z - t.z;
      const min = (t.w + 24) * 1.1;
      if (sx * sx + sz * sz < min * min) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const variant = Math.floor(rnd() * 4);
    const wide = variant === 3;
    const tall = Math.pow(rnd(), 2.6);
    // Height buys slenderness: a 140 unit tower on a 30 unit footprint is a
    // block, on a 14 unit footprint it is a tower.
    const slim = 0.62 + 0.38 * (1 - tall);
    const w = ((wide ? 28 : 16) + rnd() * (wide ? 14 : 12)) * slim;
    const h = (16 + tall * 150) * (0.4 + 0.9 * core) + (variant === 1 ? 20 : 0);
    towers.push({
      x,
      z,
      y: y - 1,
      w,
      d: wide ? w * 0.45 : w * (0.8 + rnd() * 0.4),
      h: Math.max(14, inCorridor ? Math.min(h, 34) : h),
      rot: (rnd() - 0.5) * 0.5,
      variant,
      seed: rnd(),
      lit: 0.3 + rnd() * 0.3,
      build: 1,
    });
  }

  // Three towers are still going up, the tallest of them carries the crane.
  const candidates = towers
    .map((t, i) => ({ t, i }))
    .filter(({ t, i }) => i > 0 && t.h > 55 && t.z < -180 && t.z > -430)
    .sort((a, b) => b.t.h - a.t.h)
    .slice(0, 8);
  const picks = [candidates[0], candidates[3], candidates[6]].filter(Boolean);
  picks.forEach(({ t }, i) => {
    t.build = [0.62, 0.44, 0.78][i];
  });
  return towers;
}

export function craneAnchor(towers: Tower[]) {
  const t = towers.reduce(
    (best, cur) => (cur.build < 1 && cur.h > best.h ? cur : best),
    towers[0],
  );
  return t;
}

/** Drone loops: closed Catmull-Rom circuits threaded between the towers. */
export function buildDroneCurves(towers: Tower[], count: number) {
  const rnd = mulberry32(0xd4017e);
  const tall = towers.filter((t) => t.h > 40 && t.z < -120);
  const curves: CatmullRomCurve3[] = [];
  for (let i = 0; i < count; i++) {
    const pts: Vector3[] = [];
    const n = 4 + Math.floor(rnd() * 2);
    const anchor = tall[Math.floor(rnd() * tall.length)] ?? towers[0];
    for (let j = 0; j < n; j++) {
      const a = (j / n) * Math.PI * 2 + rnd() * 0.6;
      const r = 70 + rnd() * 160;
      pts.push(
        new Vector3(
          anchor.x + Math.cos(a) * r,
          anchor.y + 22 + rnd() * (anchor.h * 0.9 + 30),
          anchor.z + Math.sin(a) * r * 0.8,
        ),
      );
    }
    curves.push(new CatmullRomCurve3(pts, true, "catmullrom", 0.6));
  }
  return curves;
}

/** The monorail: one long curve that sweeps through the city on piers. */
export function buildRailCurve() {
  const pts: Vector3[] = [];
  const zs = [-20, -120, -230, -340, -450, -560, -680];
  for (const z of zs) {
    const cx = valleyX(z);
    const side = z > -300 ? 1 : 1;
    pts.push(
      new Vector3(
        cx + side * (108 + 46 * Math.sin((z + 120) * 0.0068)),
        terrainHeight(cx + side * 112, z) + 24,
        z,
      ),
    );
  }
  return new CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}
