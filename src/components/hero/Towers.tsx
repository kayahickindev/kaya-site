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

/* Four silhouettes, described as rings of scale up the height. A setback is a
   pair of rings a hair apart so the shelf closes instead of leaving a hole. */
const PROFILES: { y: number; s: number }[][] = [
  [
    { y: 0, s: 1 },
    { y: 1, s: 0.9 },
  ],
  [
    { y: 0, s: 1 },
    { y: 0.86, s: 0.74 },
    { y: 0.87, s: 0.26 },
    { y: 1, s: 0.2 },
  ],
  [
    { y: 0, s: 1 },
    { y: 0.48, s: 0.97 },
    { y: 0.49, s: 0.78 },
    { y: 0.84, s: 0.75 },
    { y: 0.85, s: 0.56 },
    { y: 1, s: 0.53 },
  ],
  [
    { y: 0, s: 1 },
    { y: 0.95, s: 0.98 },
    { y: 1, s: 0.92 },
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
  // the floors it already has rather than a squashed facade.
  vGrid = vec2(max(2.0, floor(faceW / 3.4)), max(4.0, floor(sy / 3.1)));
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
    uFill * (1.2 * fill + 0.35) +
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
  float completing = (age > 0.0 && age < 2.2) ? 1.0 - age / 2.2 : 0.0;

  // Lit windows, drawn procedurally and faded to their own average once the
  // cells approach a pixel, which is what keeps the far skyline from crawling.
  vec2 cell = vec2(vFace.x * vGrid.x, vFace.y * vGrid.y);
  vec2 f = fract(cell);
  vec2 id = floor(cell);
  float r = hash21(id + vec2(vMeta.x * 61.0, vMeta.x * 23.0));
  float density = vMeta.y + completing * 0.35;
  float lit = step(1.0 - density, r);
  // Narrow and tall: the facade reads as strips of light, not as polka dots.
  vec2 wq =
    smoothstep(0.0, 0.16, f - vec2(0.27, 0.11)) *
    smoothstep(0.0, 0.16, vec2(0.73, 0.89) - f);
  float aa = max(fwidth(cell.x), fwidth(cell.y));
  float win = wq.x * wq.y * lit;
  win = mix(density * 0.36, win, 1.0 - smoothstep(0.28, 0.9, aa));
  // A window goes out or comes back now and then.
  float flick = step(0.992, hash21(id * 1.7 + floor(uTime * 1.6) * 3.13 + vMeta.x));
  win *= (1.0 - roof) * (1.0 - 0.7 * flick);
  col += uWindow * win * 0.95 * uIgnition;

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
    float band = exp(-pow((vFace.y - (1.0 - completing) * 1.1) / 0.07, 2.0));
    col += mix(uTeal, uWindow, 0.45) * band * 1.5 * completing;
  }

  col = applyFog(col, dist, -v);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), 1.0);
}
`;

export type TowerHandle = {
  /** Light one tower's completion: returns its base for the ground ripple. */
  complete: (index: number) => { x: number; z: number } | null;
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

  const groups = useMemo(() => {
    const byVariant: Tower[][] = [[], [], [], []];
    towers.forEach((t) => byVariant[t.variant].push(t));
    // Rank rather than raw distance: the towers cluster in the middle of the
    // range, so a normalised distance would fire almost all of them at once.
    const order = towers
      .map((t) => Math.hypot(t.x - 40, (t.z + 260) * 0.7))
      .slice()
      .sort((a, b) => a - b);
    const rank = (d: number) => {
      let lo = 0;
      let hi = order.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (order[mid] < d) lo = mid + 1;
        else hi = mid;
      }
      return lo / Math.max(1, order.length - 1);
    };
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
        delay[i] = rank(Math.hypot(t.x - 40, (t.z + 260) * 0.7));
      });
      geometry.setAttribute("aBuild", new InstancedBufferAttribute(build, 1));
      geometry.setAttribute("aPulse", new InstancedBufferAttribute(pulse, 1));
      geometry.setAttribute("aDelay", new InstancedBufferAttribute(delay, 1));
      geometry.setAttribute("aSeed", new InstancedBufferAttribute(seed, 1));
      geometry.setAttribute("aLit", new InstancedBufferAttribute(litness, 1));
      return { geometry, list, count, matrices, build, pulse };
    });
  }, [towers]);

  const meshes = useRef<(InstancedMesh | null)[]>([]);

  // Every tower's slot, so a completion can be addressed by index.
  const slots = useMemo(() => {
    const map: { group: number; index: number; tower: Tower }[] = [];
    groups.forEach((g, gi) => g.list.forEach((t, i) => map.push({ group: gi, index: i, tower: t })));
    return map;
  }, [groups]);

  handleRef.current = {
    towers,
    complete(i: number) {
      const slot = slots[i % slots.length];
      if (!slot) return null;
      const g = groups[slot.group];
      g.pulse[slot.index] = hero.time;
      (g.geometry.getAttribute("aPulse") as InstancedBufferAttribute).needsUpdate = true;
      if (g.build[slot.index] < 1) {
        g.build[slot.index] = 1;
        (g.geometry.getAttribute("aBuild") as InstancedBufferAttribute).needsUpdate = true;
      }
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
    </>
  );
}
