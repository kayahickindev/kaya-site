"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Euler,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Quaternion,
  ShaderMaterial,
  Vector3,
} from "three";
import { PREFIX } from "./glsl";
import { hero } from "./state";
import type { CommonUniforms } from "./uniforms";
import { FILL_DIR, PALETTE, type Tower } from "./world";

/* Seven silhouettes, described as rings of scale up the height. A setback is a
   pair of rings a hair apart so the shelf closes instead of leaving a hole, and
   an antenna is just a ring narrow enough to read as a mast: both come free
   with the profile, where a separate mesh would cost a draw call each.
   Variants are assigned by height in buildTowers, so the spires are tall, the
   shelves are mid-rise and the blocks stay low, which is what stops a skyline
   made of one shape at seven sizes. */
const PROFILES: { y: number; s: number }[][] = [
  // 0 slab, a whisper of taper
  [
    { y: 0, s: 1 },
    { y: 1, s: 0.9 },
  ],
  // 1 setback, spire and antenna
  [
    { y: 0, s: 1 },
    { y: 0.62, s: 0.86 },
    { y: 0.63, s: 0.62 },
    { y: 0.88, s: 0.56 },
    { y: 0.89, s: 0.22 },
    { y: 0.965, s: 0.18 },
    { y: 0.97, s: 0.05 },
    { y: 1, s: 0.03 },
  ],
  // 2 ziggurat, three shelves
  [
    { y: 0, s: 1 },
    { y: 0.34, s: 0.97 },
    { y: 0.35, s: 0.82 },
    { y: 0.62, s: 0.79 },
    { y: 0.63, s: 0.62 },
    { y: 0.85, s: 0.59 },
    { y: 0.86, s: 0.42 },
    { y: 1, s: 0.4 },
  ],
  // 3 wide low block with a plant room on the roof
  [
    { y: 0, s: 1 },
    { y: 0.86, s: 0.98 },
    { y: 0.87, s: 0.55 },
    { y: 1, s: 0.52 },
  ],
  // 4 slender spire on a long needle
  [
    { y: 0, s: 1 },
    { y: 0.1, s: 0.95 },
    { y: 0.78, s: 0.6 },
    { y: 0.8, s: 0.3 },
    { y: 0.93, s: 0.24 },
    { y: 0.935, s: 0.04 },
    { y: 1, s: 0.025 },
  ],
  // 5 shoulder and a tapered crown
  [
    { y: 0, s: 1 },
    { y: 0.72, s: 0.93 },
    { y: 0.73, s: 0.74 },
    { y: 0.94, s: 0.7 },
    { y: 0.95, s: 0.5 },
    { y: 1, s: 0.16 },
  ],
  // 6 wide low block, flat
  [
    { y: 0, s: 1 },
    { y: 0.97, s: 0.99 },
    { y: 1, s: 0.95 },
  ],
];

/** A tapered prism one unit tall and one unit wide, carrying for every vertex
 *  the coordinate of its face, so the windows and the edge lines can be drawn
 *  procedurally instead of costing geometry. */
function buildTowerGeometry(profile: { y: number; s: number }[]) {
  const pos: number[] = [];
  const nrm: number[] = [];
  const face: number[] = [];
  const a = new Vector3();
  const b = new Vector3();
  const n = new Vector3();

  // Clockwise seen from above, so a quad taken in order faces outward.
  const corner = (k: number, s: number): [number, number] => {
    const sx = k === 0 || k === 1 ? 0.5 : -0.5;
    const sz = k === 0 || k === 3 ? 0.5 : -0.5;
    return [sx * s, sz * s];
  };

  const push = (p: number[][], f: number[][], nx: number, ny: number, nz: number) => {
    for (let i = 0; i < p.length; i++) {
      pos.push(p[i][0], p[i][1], p[i][2]);
      nrm.push(nx, ny, nz);
      face.push(f[i][0], f[i][1], f[i][2]);
    }
  };

  for (let r = 0; r < profile.length - 1; r++) {
    const lo = profile[r];
    const hi = profile[r + 1];
    if (hi.y <= lo.y) continue;
    for (let k = 0; k < 4; k++) {
      const c0lo = corner(k, lo.s);
      const c1lo = corner((k + 1) % 4, lo.s);
      const c0hi = corner(k, hi.s);
      const c1hi = corner((k + 1) % 4, hi.s);
      const bl = [c0lo[0], lo.y, c0lo[1]];
      const br = [c1lo[0], lo.y, c1lo[1]];
      const tr = [c1hi[0], hi.y, c1hi[1]];
      const tl = [c0hi[0], hi.y, c0hi[1]];
      a.set(br[0] - bl[0], br[1] - bl[1], br[2] - bl[2]);
      b.set(tl[0] - bl[0], tl[1] - bl[1], tl[2] - bl[2]);
      n.crossVectors(a, b).normalize();
      const outward = n.x * (bl[0] + br[0] + tr[0] + tl[0]) + n.z * (bl[2] + br[2] + tr[2] + tl[2]);
      const flip = outward < 0;
      if (flip) n.negate();
      // Faces that span z take their window columns from the depth scale.
      const axis = k === 0 || k === 2 ? 1 : 0;
      const quad = flip ? [bl, tl, tr, bl, tr, br] : [bl, br, tr, bl, tr, tl];
      const uv = (p: number[]) => [
        p === bl || p === tl ? 0 : 1,
        p === bl || p === br ? lo.y : hi.y,
        axis,
      ];
      push(quad, quad.map(uv), n.x, n.y, n.z);
    }
  }

  // Roof.
  const top = profile[profile.length - 1];
  const c = [0, 1, 2, 3].map((k) => corner(k, top.s));
  const roof = [
    [c[0][0], top.y, c[0][1]],
    [c[3][0], top.y, c[3][1]],
    [c[2][0], top.y, c[2][1]],
    [c[0][0], top.y, c[0][1]],
    [c[2][0], top.y, c[2][1]],
    [c[1][0], top.y, c[1][1]],
  ];
  push(
    roof,
    roof.map(() => [0.5, top.y, 2]),
    0,
    1,
    0,
  );

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
  geo.setAttribute("aNormal", new BufferAttribute(new Float32Array(nrm), 3));
  geo.setAttribute("aFace", new BufferAttribute(new Float32Array(face), 3));
  geo.computeBoundingSphere();
  return geo;
}

const vert = /* glsl */ `
attribute vec3 aNormal;
attribute vec3 aFace;
attribute float aDelay;
attribute float aBuild;
attribute float aSeed;
attribute float aLit;
attribute float aPulse;
uniform float uGrow;
uniform float uSpread;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vFace;
varying vec2 vGrid;
varying vec4 vMeta;
void main() {
  float t = clamp(uGrow * (1.0 + uSpread) - aDelay * uSpread, 0.0, 1.0);
  float e = 1.0 - pow(2.0, -10.0 * t);
  float g = e * aBuild;

  vec3 p = vec3(position.x, position.y * g, position.z);
  vec4 world = modelMatrix * instanceMatrix * vec4(p, 1.0);
  vWorld = world.xyz;

  float sx = length(instanceMatrix[0].xyz);
  float sy = length(instanceMatrix[1].xyz);
  float sz = length(instanceMatrix[2].xyz);
  // Towers are scaled hard in y, so a normal has to be divided by the scale
  // before it is rotated or every tapered facade would point at the sky.
  vec3 nLocal = aNormal / vec3(sx, sy, sz);
  vNormal = normalize((modelMatrix * instanceMatrix * vec4(nLocal, 0.0)).xyz);

  float faceW = mix(sx, sz, step(0.5, aFace.z));
  // Window rows keep their real spacing, so a tower that is still growing shows
  // the floors it already has rather than a squashed facade. The spacing is a
  // storey, not a room: at 1440 the old three-metre cells drew squares eight
  // pixels across and the skyline read as a voxel game.
  vGrid = vec2(max(3.0, floor(faceW / 1.7)), max(8.0, floor(sy / 1.55)));
  vFace = vec3(aFace.x, aFace.y * g, aFace.z);
  vMeta = vec4(aSeed, aLit, g, aPulse);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const frag =
  PREFIX +
  /* glsl */ `
uniform vec3 uBody;
uniform vec3 uWindow;
uniform vec3 uTeal;
uniform vec3 uFill;
uniform vec3 uFillDir;
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vFace;
varying vec2 vGrid;
varying vec4 vMeta;

void main() {
  vec3 n = normalize(vNormal);
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / dist;
  float roof = step(1.5, vFace.z);

  float key = max(dot(n, uSunDir), 0.0);
  float fill = max(dot(n, uFillDir), 0.0);

  // Dark glass, a shade lighter toward the top where it holds more sky.
  vec3 albedo = uBody * (0.7 + 0.7 * clamp(vFace.y, 0.0, 1.0));
  vec3 irr =
    uSunColor * (3.4 * key + 1.6 * pow(key, 8.0)) * uIgnition +
    warmWrap(n) * 1.1 * uIgnition +
    uFill * (0.9 * fill + 0.3) +
    mix(uHaze, uZenith, 0.35) * 0.9;
  vec3 col = albedo * irr;
  float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0);
  col += skyColor(reflect(-v, n)) * fres * (0.55 - 0.35 * roof);
  // Glass takes the low sun as a hard highlight, which is most of what tells a
  // tower from a box.
  vec3 hv = normalize(uSunDir + v);
  col += uSunColor * pow(max(dot(n, hv), 0.0), 64.0) * 1.1 * uIgnition * (1.0 - 0.6 * roof);

  float near = 1.0 - smoothstep(700.0, 1500.0, dist);
  float age = uTime - vMeta.w;
  float completing = (age > 0.0 && age < 2.6) ? 1.0 - age / 2.6 : 0.0;

  // Lit windows, drawn procedurally and faded to their own average once the
  // cells approach a pixel, which is what keeps the far skyline from crawling.
  vec2 cell = vec2(vFace.x * vGrid.x, vFace.y * vGrid.y);
  vec2 f = fract(cell);
  vec2 id = floor(cell);
  float r = hash21(id + vec2(vMeta.x * 61.0, vMeta.x * 23.0));

  // Every tower keeps its own occupancy and its own colour temperature, so a
  // block of them never reads as one texture repeated. The seed is the only
  // per-instance input: a uniform per tower would cost a draw call each.
  float lived = 0.16 + 0.68 * hash21(vec2(vMeta.x * 71.0, 5.1));
  float density = mix(vMeta.y, lived, 0.7) + completing * 0.32;
  // Floors, not windows, are the unit that goes dark: a whole storey empty
  // reads as a building, a scatter of missing windows reads as noise.
  float floorLit = step(0.20, hash21(vec2(7.3, id.y + vMeta.x * 37.0)));
  // And every twentieth floor or so is a plant room or a lobby, lit right up.
  float bright = step(0.955, hash21(vec2(11.9, id.y + vMeta.x * 53.0)));
  float lit = max(step(1.0 - density, r) * floorLit, bright * step(0.25, r));

  // Narrow and tall: the facade reads as strips of light, not as polka dots.
  vec2 wq =
    smoothstep(0.0, 0.22, f - vec2(0.22, 0.15)) *
    smoothstep(0.0, 0.22, vec2(0.78, 0.85) - f);
  float aa = max(fwidth(cell.x), fwidth(cell.y));
  float win = wq.x * wq.y * lit * (1.0 + 1.6 * bright);
  float avg = density * 0.30 * (1.0 + 0.5 * bright);
  win = mix(avg, win, 1.0 - smoothstep(0.42, 1.15, aa));
  // A handful of windows flicker: one tube on its way out per tower, not the
  // whole facade blinking.
  float isFlick = step(0.987, hash21(id * 2.3 + vMeta.x * 17.0));
  win *= (1.0 - roof) *
         (1.0 - isFlick * 0.8 * step(0.45, hash21(id * 1.7 + floor(uTime * 4.0) * 3.13)));
  // Warmer and brighter where the sun is on the glass, because that is the
  // face whose panes are throwing the low light back out at the camera.
  vec3 pane = mix(uWindow, uSunColor, 0.35 * hash21(vec2(vMeta.x * 29.0, 1.7)));
  pane = mix(pane, uSunColor, 0.45 * smoothstep(0.0, 0.45, key));
  col += pane * win * (0.78 + 0.85 * smoothstep(0.0, 0.45, key)) * uIgnition;

  // Blueprint edges: vertical corners, plus the bright working floor on
  // anything still going up.
  float ew = fwidth(vFace.x) * 1.4;
  float edge = max(
    1.0 - smoothstep(0.0, ew, vFace.x),
    1.0 - smoothstep(0.0, ew, 1.0 - vFace.x)
  ) * (1.0 - roof);
  float eh = fwidth(vFace.y) * 2.2;
  float crown = (1.0 - smoothstep(0.0, eh, vMeta.z - vFace.y)) * (1.0 - roof);
  float unfinished = step(vMeta.z, 0.995);
  col += uTeal * (edge * 0.62 + crown * (0.32 + 1.2 * unfinished)) * near;

  // The completion sweep runs up the tower as the ripple leaves the ground.
  if (completing > 0.0) {
    float band = exp(-pow((vFace.y - (1.0 - completing) * 1.12) / 0.075, 2.0));
    col += mix(uTeal, uSunColor, 0.5) * band * 2.4 * completing;
  }

  col = applyFog(col, dist, -v);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), 1.0);
}
`;

/** The open frame of a tower still going up: four corner columns, a floor
 *  plate every few storeys, cross bracing on the faces and a brighter deck at
 *  the working level. It is line work with the sky showing through, which is
 *  the whole point: a solid stub at 60 percent height reads as a finished
 *  short building, and a wireframe reads as a site. */
function buildScaffoldGeometry(rising: Tower[], rank: (t: Tower) => number) {
  const pts: number[] = [];
  const alpha: number[] = [];
  const base: number[] = [];
  const delay: number[] = [];
  const seg = (
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    a0: number,
    a1: number,
    b: number,
    d: number,
  ) => {
    pts.push(x0, y0, z0, x1, y1, z1);
    alpha.push(a0, a1);
    base.push(b, b);
    delay.push(d, d);
  };

  for (const t of rising) {
    const d = rank(t);
    const top = t.y + t.h * t.build;
    const cos = Math.cos(t.rot);
    const sin = Math.sin(t.rot);
    // Corners in the tower's own frame, rotated once here so the shader stays
    // a plain pass-through.
    const corner = (k: number): [number, number] => {
      const lx = (k === 0 || k === 1 ? 0.5 : -0.5) * t.w;
      const lz = (k === 0 || k === 3 ? 0.5 : -0.5) * t.d;
      return [t.x + lx * cos + lz * sin, t.z - lx * sin + lz * cos];
    };
    const c = [0, 1, 2, 3].map(corner);

    for (const [cx, cz] of c) seg(cx, t.y, cz, cx, top, cz, 0.75, 0.95, t.y, d);

    // A plate roughly every four storeys, and X bracing between the plates.
    const storeys = Math.max(3, Math.round((top - t.y) / 13));
    for (let i = 0; i <= storeys; i++) {
      const y = t.y + ((top - t.y) * i) / storeys;
      const deck = i === storeys ? 1 : 0;
      for (let k = 0; k < 4; k++) {
        const [x0, z0] = c[k];
        const [x1, z1] = c[(k + 1) % 4];
        seg(x0, y, z0, x1, y, z1, 0.45 + 0.5 * deck, 0.45 + 0.5 * deck, t.y, d);
        if (i < storeys && k < 2) {
          const yn = t.y + ((top - t.y) * (i + 1)) / storeys;
          seg(x0, y, z0, x1, yn, z1, 0.2, 0.2, t.y, d);
        }
      }
    }
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
  geo.setAttribute("aAlpha", new BufferAttribute(new Float32Array(alpha), 1));
  geo.setAttribute("aBase", new BufferAttribute(new Float32Array(base), 1));
  geo.setAttribute("aDelay", new BufferAttribute(new Float32Array(delay), 1));
  geo.boundingSphere = null;
  return geo;
}

const scaffoldVert = /* glsl */ `
attribute float aAlpha;
attribute float aBase;
attribute float aDelay;
uniform float uGrow;
uniform float uSpread;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  // The same expo stagger the instanced towers use, applied about each frame's
  // own base so the scaffold climbs out of the ground with its neighbours.
  float t = clamp(uGrow * (1.0 + uSpread) - aDelay * uSpread, 0.0, 1.0);
  float e = 1.0 - pow(2.0, -10.0 * t);
  vec3 p = vec3(position.x, aBase + (position.y - aBase) * e, position.z);
  vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
}
`;

const scaffoldFrag =
  PREFIX +
  /* glsl */ `
uniform vec3 uTeal;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  float dist = length(cameraPosition - vWorld);
  float fog = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
  gl_FragColor = vec4(uTeal, vAlpha * (1.0 - fog) * 0.85 * uIgnition);
}
`;

export type TowerHandle = {
  /** Light one tower's completion at a given scene time: returns its base so
   *  the ground ripple can start from the same place. */
  complete: (index: number, at: number) => { x: number; z: number } | null;
  towers: Tower[];
};

export function Towers({
  common,
  towers,
  handleRef,
}: {
  common: CommonUniforms;
  towers: Tower[];
  handleRef: { current: TowerHandle | null };
}) {
  const uGrow = useMemo(() => ({ value: 0 }), []);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          ...common,
          uGrow,
          uSpread: { value: 1.05 },
          uBody: { value: PALETTE.body.clone() },
          uWindow: { value: PALETTE.window.clone() },
          uTeal: { value: PALETTE.teal.clone() },
          uFill: { value: PALETTE.fill.clone() },
          uFillDir: { value: FILL_DIR.clone() },
        },
        vertexShader: vert,
        fragmentShader: frag,
      }),
    [common, uGrow],
  );

  // Rank rather than raw distance: the towers cluster in the middle of the
  // range, so a normalised distance would fire almost all of them at once.
  // The scaffold frames share it, so they rise on the same stagger.
  const rank = useMemo(() => {
    const order = towers
      .map((t) => Math.hypot(t.x - 40, (t.z + 260) * 0.7))
      .slice()
      .sort((a, b) => a - b);
    return (t: Tower) => {
      const d = Math.hypot(t.x - 40, (t.z + 260) * 0.7);
      let lo = 0;
      let hi = order.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (order[mid] < d) lo = mid + 1;
        else hi = mid;
      }
      return lo / Math.max(1, order.length - 1);
    };
  }, [towers]);

  const groups = useMemo(() => {
    const byVariant: Tower[][] = PROFILES.map(() => []);
    // The towers still going up leave the instanced mesh entirely: they are
    // drawn as open frames instead, and a solid stub standing beside its own
    // wireframe would read as two buildings.
    towers.filter((t) => t.build >= 1).forEach((t) => byVariant[t.variant].push(t));
    const m = new Matrix4();
    const q = new Quaternion();
    const e = new Euler();
    const pos = new Vector3();
    const scale = new Vector3();
    return byVariant.map((list, variant) => {
      const geometry = buildTowerGeometry(PROFILES[variant]);
      const count = Math.max(1, list.length);
      const build = new Float32Array(count).fill(1);
      const pulse = new Float32Array(count).fill(-999);
      const delay = new Float32Array(count);
      const seed = new Float32Array(count);
      const litness = new Float32Array(count);
      const matrices = new Float32Array(count * 16);
      list.forEach((t, i) => {
        pos.set(t.x, t.y, t.z);
        scale.set(t.w, t.h, t.d);
        e.set(0, t.rot, 0);
        q.setFromEuler(e);
        m.compose(pos, q, scale);
        m.toArray(matrices, i * 16);
        build[i] = t.build;
        seed[i] = t.seed;
        litness[i] = t.lit;
        delay[i] = rank(t);
      });
      geometry.setAttribute("aBuild", new InstancedBufferAttribute(build, 1));
      geometry.setAttribute("aPulse", new InstancedBufferAttribute(pulse, 1));
      geometry.setAttribute("aDelay", new InstancedBufferAttribute(delay, 1));
      geometry.setAttribute("aSeed", new InstancedBufferAttribute(seed, 1));
      geometry.setAttribute("aLit", new InstancedBufferAttribute(litness, 1));
      return { geometry, list, count, matrices, build, pulse };
    });
  }, [towers, rank]);

  const meshes = useRef<(InstancedMesh | null)[]>([]);

  // The slots a completion can be addressed to. Only the towers standing in
  // the middle distance qualify: a sweep on something behind the camera or
  // lost in the haze is an event nobody sees, and the point of the event is
  // that a still taken at any moment has one in it.
  const slots = useMemo(() => {
    const map: { group: number; index: number; tower: Tower }[] = [];
    groups.forEach((g, gi) =>
      g.list.forEach((t, i) => {
        // Held to the part of the valley the camera actually frames, in x as
        // well as in z: a ring expanding around a tower off the left edge is
        // an event that happens outside the picture.
        if (t.z < -140 && t.z > -640 && t.x > 10 && t.x < 360 && t.h > 40) {
          map.push({ group: gi, index: i, tower: t });
        }
      }),
    );
    return map;
  }, [groups]);

  const scaffold = useMemo(
    () => buildScaffoldGeometry(towers.filter((t) => t.build < 1), rank),
    [towers, rank],
  );
  const scaffoldMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { ...common, uGrow, uSpread: { value: 1.05 }, uTeal: { value: PALETTE.teal.clone() } },
        vertexShader: scaffoldVert,
        fragmentShader: scaffoldFrag,
        transparent: true,
        depthWrite: false,
      }),
    [common, uGrow],
  );

  handleRef.current = {
    towers,
    complete(i: number, at: number) {
      const slot = slots[i % slots.length];
      if (!slot) return null;
      const g = groups[slot.group];
      // The event's own timestamp, not the wall clock: a frozen capture has to
      // be able to replay the last few completions at the right ages.
      g.pulse[slot.index] = at;
      (g.geometry.getAttribute("aPulse") as InstancedBufferAttribute).needsUpdate = true;
      return { x: slot.tower.x, z: slot.tower.z };
    },
  };

  useFrame(() => {
    uGrow.value = hero.grow;
  });

  return (
    <>
      {groups.map((g, i) => (
        <instancedMesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
            if (el) {
              el.instanceMatrix.array.set(g.matrices);
              el.instanceMatrix.needsUpdate = true;
              el.count = g.list.length;
              el.frustumCulled = false;
            }
          }}
          args={[g.geometry, material, g.count]}
        />
      ))}
      <lineSegments geometry={scaffold} material={scaffoldMaterial} frustumCulled={false} />
    </>
  );
}
