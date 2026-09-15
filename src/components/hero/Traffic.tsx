"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  type CatmullRomCurve3,
  Color,
  Group,
  Points,
  ShaderMaterial,
  TubeGeometry,
  Vector3,
} from "three";
import { PREFIX } from "./glsl";
import { hero } from "./state";
import type { CommonUniforms } from "./uniforms";
import { PALETTE, type Tower, terrainHeight } from "./world";

/* Everything that moves shares two materials: additive glowing points and
   additive lines, both fogged by the same sky the rest of the scene uses. */

const glowVert = /* glsl */ `
attribute float aScale;
uniform float uSize;
varying float vFade;
void main() {
  vFade = 0.0;
  // A zero scale means "not on the track right now". The size clamp has a
  // floor, so shrinking such a point still leaves a dot on screen: it has to
  // be sent outside the clip volume instead.
  if (aScale <= 0.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    return;
  }
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = -mv.z;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * aScale * 6600.0 / dist, 5.0, 52.0);
  vFade = 1.0 - clamp(1.0 - exp(-pow(dist * 0.0016, 2.0)), 0.0, 1.0);
}
`;

const glowFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float core = smoothstep(0.5, 0.06, d);
  float halo = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor * (0.5 + core * 1.9), (core * 0.85 + halo * 0.25) * uOpacity * vFade);
}
`;

const lineVert = /* glsl */ `
attribute float aAlpha;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
}
`;

const lineFrag =
  PREFIX +
  /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  float dist = length(cameraPosition - vWorld);
  float fog = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
  gl_FragColor = vec4(uColor, vAlpha * uOpacity * (1.0 - fog) * uIgnition);
}
`;

function glowMaterial(color: Color, opacity: number, pixelRatio: number) {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: color },
      uOpacity: { value: opacity },
      uSize: { value: pixelRatio },
    },
    vertexShader: glowVert,
    fragmentShader: glowFrag,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

function lineMaterial(common: CommonUniforms, color: Color, opacity: number) {
  return new ShaderMaterial({
    uniforms: { ...common, uColor: { value: color }, uOpacity: { value: opacity } },
    vertexShader: lineVert,
    fragmentShader: lineFrag,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

const TRAIL = 20;

/** Drones on closed circuits between the towers, each dragging a short trail
 *  of its own recent path. */
export function Drones({
  common,
  curves,
  pixelRatio,
}: {
  common: CommonUniforms;
  curves: CatmullRomCurve3[];
  pixelRatio: number;
}) {
  const count = curves.length;
  const speeds = useMemo(
    () => curves.map((_, i) => 0.0125 + ((i * 37) % 11) * 0.0016),
    [curves],
  );
  const offsets = useMemo(() => curves.map((_, i) => ((i * 61) % 100) / 100), [curves]);

  const bodies = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
    const scale = new Float32Array(count).fill(1);
    geo.setAttribute("aScale", new BufferAttribute(scale, 1));
    geo.boundingSphere = null;
    return geo;
  }, [count]);

  const trails = useMemo(() => {
    const geo = new BufferGeometry();
    const verts = count * TRAIL * 2;
    geo.setAttribute("position", new BufferAttribute(new Float32Array(verts * 3), 3));
    const alpha = new Float32Array(verts);
    for (let d = 0; d < count; d++) {
      for (let i = 0; i < TRAIL; i++) {
        const a0 = 1 - i / TRAIL;
        const a1 = 1 - (i + 1) / TRAIL;
        alpha[(d * TRAIL + i) * 2] = a0 * a0;
        alpha[(d * TRAIL + i) * 2 + 1] = a1 * a1;
      }
    }
    geo.setAttribute("aAlpha", new BufferAttribute(alpha, 1));
    geo.boundingSphere = null;
    return geo;
  }, [count]);

  const bodyMat = useMemo(
    () => glowMaterial(PALETTE.window.clone().lerp(new Color(1, 1, 1), 0.35), 1, pixelRatio),
    [pixelRatio],
  );
  // Warm, not teal: the teal belongs to the survey linework, and a warm trail
  // is what reads as a light moving through air at golden hour.
  const trailMat = useMemo(
    () => lineMaterial(common, PALETTE.window.clone().lerp(new Color(1, 1, 1), 0.2), 1.5),
    [common],
  );

  const p = useMemo(() => new Vector3(), []);
  const pointsRef = useRef<Points>(null);

  useFrame(() => {
    const t = hero.time;
    const bp = bodies.getAttribute("position") as BufferAttribute;
    const tp = trails.getAttribute("position") as BufferAttribute;
    const scale = bodies.getAttribute("aScale") as BufferAttribute;
    for (let d = 0; d < count; d++) {
      const curve = curves[d];
      const head = (t * speeds[d] + offsets[d]) % 1;
      curve.getPoint(head < 0 ? head + 1 : head, p);
      bp.setXYZ(d, p.x, p.y, p.z);
      scale.setX(d, 0.8 + 0.25 * Math.sin(t * 3 + d));
      for (let i = 0; i < TRAIL; i++) {
        const t0 = (head - i * 0.0055 + 1) % 1;
        const t1 = (head - (i + 1) * 0.0055 + 1) % 1;
        curve.getPoint(t0, p);
        tp.setXYZ((d * TRAIL + i) * 2, p.x, p.y, p.z);
        curve.getPoint(t1, p);
        tp.setXYZ((d * TRAIL + i) * 2 + 1, p.x, p.y, p.z);
      }
    }
    bp.needsUpdate = true;
    scale.needsUpdate = true;
    tp.needsUpdate = true;
    bodyMat.uniforms.uOpacity.value = hero.ignition;
    if (pointsRef.current) pointsRef.current.visible = hero.ignition > 0.02;
  });

  return (
    <>
      <lineSegments geometry={trails} material={trailMat} frustumCulled={false} />
      <points ref={pointsRef} geometry={bodies} material={bodyMat} frustumCulled={false} />
    </>
  );
}

/** The monorail deck and its piers: dark structure with one teal line running
 *  along the top, so the route reads even where the deck is in shadow. */
export function Monorail({
  common,
  curve,
  pixelRatio,
}: {
  common: CommonUniforms;
  curve: CatmullRomCurve3;
  pixelRatio: number;
}) {
  const deck = useMemo(() => new TubeGeometry(curve, 200, 1.9, 5, false), [curve]);

  const deckMat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          ...common,
          uBody: { value: PALETTE.body.clone() },
          uTeal: { value: PALETTE.teal.clone() },
        },
        vertexShader: /* glsl */ `
varying vec3 vWorld;
varying vec3 vNormal;
void main() {
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
}
`,
        fragmentShader:
          PREFIX +
          /* glsl */ `
uniform vec3 uBody;
uniform vec3 uTeal;
varying vec3 vWorld;
varying vec3 vNormal;
void main() {
  vec3 n = normalize(vNormal);
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  float key = max(dot(n, uSunDir), 0.0);
  vec3 col = uBody * (0.45 + uSunColor * 2.2 * key * uIgnition + mix(uHaze, uZenith, 0.4) * 0.7);
  // The running line sits on the top of the tube.
  float top = smoothstep(0.55, 0.98, n.y);
  col += uTeal * top * 0.05;
  col = applyFog(col, dist, -toCam / dist);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), 1.0);
}
`,
      }),
    [common],
  );

  const piers = useMemo(() => {
    const pts: number[] = [];
    const alpha: number[] = [];
    const p = new Vector3();
    // A pier every forty units or so. Two dozen over a kilometre of deck read
    // as a stray wire; it is the rhythm of the legs that says viaduct.
    for (let i = 1; i < 52; i++) {
      curve.getPoint(i / 52, p);
      const ground = terrainHeight(p.x, p.z);
      pts.push(p.x, p.y, p.z, p.x, ground, p.z);
      alpha.push(0.8, 0.16);
      // A short cross head on each pier, so the leg has a top.
      pts.push(p.x - 3.2, p.y - 1.4, p.z, p.x + 3.2, p.y - 1.4, p.z);
      alpha.push(0.35, 0.35);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    geo.setAttribute("aAlpha", new BufferAttribute(new Float32Array(alpha), 1));
    return geo;
  }, [curve]);
  const pierMat = useMemo(() => lineMaterial(common, PALETTE.teal.clone(), 0.6), [common]);

  // Two trains, half a cycle apart, so the dash is on the track in nearly
  // every still. One car on a ten second loop is absent more often than not,
  // and a viaduct with nothing running on it is scenery.
  const CARS = 2;
  const BEADS = 9;
  const car = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(CARS * BEADS * 3), 3));
    const scale = new Float32Array(CARS * BEADS);
    for (let c = 0; c < CARS; c++) {
      for (let i = 0; i < BEADS; i++) scale[c * BEADS + i] = 1 - i * 0.095;
    }
    geo.setAttribute("aScale", new BufferAttribute(scale, 1));
    geo.boundingSphere = null;
    return geo;
  }, []);
  const carMat = useMemo(
    () => glowMaterial(PALETTE.window.clone().lerp(new Color(1, 1, 1), 0.5), 1, pixelRatio),
    [pixelRatio],
  );
  const p = useMemo(() => new Vector3(), []);
  const carRef = useRef<Points>(null);
  const rootRef = useRef<Group>(null);

  useFrame(() => {
    // The viaduct arrives with the city, not before it. Its deck is a fixed
    // tube that cannot rise out of the ground the way the towers do, so held
    // from the first frame it reads as a dark worm hanging over a flat plain.
    if (rootRef.current) rootRef.current.visible = hero.grow > 0.45;
    const cycle = 11.0;
    const pos = car.getAttribute("position") as BufferAttribute;
    const scale = car.getAttribute("aScale") as BufferAttribute;
    for (let c = 0; c < CARS; c++) {
      const phase = (((hero.time * 0.85) / cycle + c / CARS) % 1 + 1) % 1;
      // A car runs three quarters of the cycle and then the track is empty
      // behind it; with two cars offset, one is always mid run.
      const run = phase < 0.78 ? phase / 0.78 : -1;
      for (let i = 0; i < BEADS; i++) {
        const j = c * BEADS + i;
        if (run < 0) {
          scale.setX(j, 0);
          continue;
        }
        scale.setX(j, 1 - i * 0.095);
        const t = Math.max(0.001, Math.min(0.999, run - i * 0.006));
        curve.getPoint(t, p);
        pos.setXYZ(j, p.x, p.y + 2.6, p.z);
      }
    }
    pos.needsUpdate = true;
    scale.needsUpdate = true;
    if (carRef.current) carRef.current.visible = hero.ignition > 0.05;
    carMat.uniforms.uOpacity.value = hero.ignition;
  });

  return (
    <group ref={rootRef}>
      <mesh geometry={deck} material={deckMat} frustumCulled={false} />
      <lineSegments geometry={piers} material={pierMat} frustumCulled={false} />
      <points ref={carRef} geometry={car} material={carMat} frustumCulled={false} />
    </group>
  );
}

/** The crane on the tallest unfinished tower: a lattice mast, a jib that comes
 *  round slowly, a hook on a cable, and a warm light blinking at the top. */
export function Crane({ common, tower }: { common: CommonUniforms; tower: Tower }) {
  const mastH = 36;
  const mast = useMemo(() => {
    const pts: number[] = [];
    const a: number[] = [];
    const s = 1.7;
    const legs: [number, number][] = [
      [-s, -s],
      [s, -s],
      [s, s],
      [-s, s],
    ];
    for (const [x, z] of legs) {
      pts.push(x, 0, z, x, mastH, z);
      a.push(0.85, 0.85);
    }
    for (let i = 0; i <= 6; i++) {
      const y = (i / 6) * mastH;
      for (let k = 0; k < 4; k++) {
        const [x0, z0] = legs[k];
        const [x1, z1] = legs[(k + 1) % 4];
        pts.push(x0, y, z0, x1, y, z1);
        a.push(0.55, 0.55);
      }
    }
    for (let i = 0; i < 6; i++) {
      const y0 = (i / 6) * mastH;
      const y1 = ((i + 1) / 6) * mastH;
      for (let k = 0; k < 4; k++) {
        const [x0, z0] = legs[k];
        const [x1, z1] = legs[(k + 1) % 4];
        pts.push(x0, y0, z0, x1, y1, z1);
        a.push(0.3, 0.3);
      }
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    geo.setAttribute("aAlpha", new BufferAttribute(new Float32Array(a), 1));
    return geo;
  }, []);

  const jib = useMemo(() => {
    const pts: number[] = [];
    const a: number[] = [];
    const len = 62;
    const back = -21;
    const top = 11;
    // Bottom chord, counter jib, and the apex ties that hold them.
    pts.push(back, 0, 0, len, 0, 0);
    a.push(0.8, 0.5);
    pts.push(0, top, 0, len * 0.55, 0, 0);
    a.push(0.65, 0.5);
    pts.push(0, top, 0, len, 0, 0);
    a.push(0.65, 0.4);
    pts.push(0, top, 0, back, 0, 0);
    a.push(0.65, 0.6);
    pts.push(0, top, 0, 0, 0, 0);
    a.push(0.65, 0.8);
    for (let i = 0; i < 9; i++) {
      const x0 = (i / 9) * len;
      const x1 = ((i + 1) / 9) * len;
      pts.push(x0, 0, 0, x1, 0.9, 0);
      a.push(0.3, 0.25);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(pts), 3));
    geo.setAttribute("aAlpha", new BufferAttribute(new Float32Array(a), 1));
    return geo;
  }, []);

  const cable = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(6), 3));
    geo.setAttribute("aAlpha", new BufferAttribute(new Float32Array([0.5, 0.2]), 1));
    return geo;
  }, []);

  const mat = useMemo(() => lineMaterial(common, PALETTE.teal.clone(), 1.15), [common]);
  const beacon = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array([0, mastH + 1, 0]), 3));
    geo.setAttribute("aScale", new BufferAttribute(new Float32Array([0.8]), 1));
    return geo;
  }, []);
  const beaconMat = useMemo(() => glowMaterial(new Color("#ff9a5a"), 1, 1), []);

  const jibRef = useRef<Group>(null);
  const rootRef = useRef<Group>(null);

  useFrame(() => {
    const t = hero.time;
    if (jibRef.current) jibRef.current.rotation.y = t * 0.07 + 1.2;
    if (rootRef.current) rootRef.current.visible = hero.grow > 0.55;
    const cp = cable.getAttribute("position") as BufferAttribute;
    const reach = 36 + 12 * Math.sin(t * 0.21);
    const drop = -14 - 9 * Math.sin(t * 0.33 + 1);
    cp.setXYZ(0, reach, 0, 0);
    cp.setXYZ(1, reach, drop, 0);
    cp.needsUpdate = true;
    beaconMat.uniforms.uOpacity.value =
      hero.ignition * (0.25 + 0.75 * Math.pow(Math.max(0, Math.sin(t * 1.5)), 6));
  });

  const y = tower.y + tower.h * tower.build + 1;
  return (
    <group ref={rootRef} position={[tower.x, y, tower.z]} rotation={[0, tower.rot, 0]}>
      <lineSegments geometry={mast} material={mat} frustumCulled={false} />
      <points geometry={beacon} material={beaconMat} frustumCulled={false} />
      <group ref={jibRef} position={[0, mastH, 0]}>
        <lineSegments geometry={jib} material={mat} frustumCulled={false} />
        <lineSegments geometry={cable} material={mat} frustumCulled={false} />
      </group>
    </group>
  );
}
