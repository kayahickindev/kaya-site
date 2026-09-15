"use client";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  type BufferGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { PREFIX } from "./glsl";
import { hero } from "./state";
import type { CommonUniforms } from "./uniforms";
import { FILL_DIR, PALETTE } from "./world";

const terrainVert = /* glsl */ `
attribute vec3 aNormal;
uniform float uAmp;
varying vec3 vWorld;
varying vec3 vNormal;
void main() {
  vec3 p = vec3(position.x, position.y * uAmp, position.z);
  vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
  vNormal = normalize(mix(vec3(0.0, 1.0, 0.0), aNormal, uAmp));
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
}
`;

const terrainFrag =
  PREFIX +
  /* glsl */ `
uniform float uAmp;
uniform vec3 uGround;
uniform vec3 uTeal;
uniform vec3 uFill;
uniform vec3 uFillDir;
uniform vec3 uRipples[3];
varying vec3 vWorld;
varying vec3 vNormal;

// A line of constant screen width whatever the distance, faded out once the
// spacing approaches a pixel so the far field never moires.
float lineMask(float v, float width) {
  float w = fwidth(v);
  float d = abs(fract(v - 0.5) - 0.5) / max(w, 1e-5);
  return (1.0 - smoothstep(0.0, width, d)) * (1.0 - smoothstep(0.22, 0.62, w));
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / dist;

  float key = max(dot(n, uSunDir), 0.0);
  float fill = max(dot(n, uFillDir), 0.0);

  vec3 irradiance =
    uSunColor * (2.7 * key + 0.7 * pow(key, 5.0)) * uIgnition +
    warmWrap(n) * 0.75 * uIgnition +
    uFill * (1.0 * fill + 0.34) +
    mix(uHaze, uZenith, 0.4) * (0.5 + 0.6 * n.y);
  vec3 col = uGround * irradiance;

  // Grazing light picks out the ridges that face the sun.
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.5);
  col += uSunColor * rim * key * 0.055 * uIgnition;

  // Survey overlay: a plan grid that is there from the first frame, and
  // elevation contours that appear as the relief rises out of it.
  float far = 1.0 - smoothstep(820.0, 2000.0, dist);
  float grid = max(lineMask(vWorld.x / 64.0, 2.4), lineMask(vWorld.z / 64.0, 2.4));
  float contour = lineMask(vWorld.y / 9.0, 2.6) * uAmp;
  col += uTeal * (grid * 0.30 + contour * 0.42) * far;
  // Street grid: the plan the city was drawn on, only where the city is.
  float dx = (vWorld.x - 96.0) / 430.0;
  float dz = (vWorld.z + 300.0) / 540.0;
  float city = exp(-(dx * dx + dz * dz));
  float streets = max(lineMask(vWorld.x / 17.0, 1.6), lineMask(vWorld.z / 17.0, 1.6));
  col += uTeal * streets * city * far * 0.34;

  // The waterline reads as the drawn edge of the valley.
  float shore = exp(-vWorld.y * vWorld.y * 0.22) * uAmp * far;
  col += uTeal * shore * 0.32;

  // A tower completing sends a ring of light across the ground.
  for (int i = 0; i < 3; i++) {
    vec3 rp = uRipples[i];
    float age = uTime - rp.z;
    if (age > 0.0 && age < 3.8) {
      float r = length(vWorld.xz - rp.xy);
      float ring = exp(-pow((r - age * 122.0) / 26.0, 2.0)) * (1.0 - age / 3.8);
      col += mix(uTeal, uSunColor, 0.35) * ring * 1.15;
    }
  }

  col = applyFog(col, dist, -v);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), 1.0);
}
`;

const pointVert = /* glsl */ `
attribute vec3 aOrigin;
attribute vec2 aExtra;
uniform float uAmp;
uniform float uScatter;
uniform float uSize;
varying float vAlpha;
varying float vBright;
void main() {
  float s = clamp((uScatter - aExtra.x * 0.45) / 0.55, 0.0, 1.0);
  s = s * s * (3.0 - 2.0 * s);
  vec3 settled = vec3(position.x, position.y * uAmp, position.z);
  vec3 p = mix(settled, aOrigin, s);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = -mv.z;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * 360.0 / dist, 1.0, 3.6);
  vBright = aExtra.y;
  float fog = 1.0 - exp(-pow(dist * 0.0016, 2.0));
  vAlpha = (1.0 - fog) * smoothstep(0.0, 0.35, 1.0 - s * 0.6);
}
`;

const pointFrag = /* glsl */ `
uniform vec3 uTeal;
varying float vAlpha;
varying float vBright;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.25, 0.015, dot(c, c));
  gl_FragColor = vec4(uTeal * (0.22 + 0.4 * vBright), a * vAlpha * 0.45);
}
`;

export function Terrain({
  common,
  geometry,
  points,
  pixelRatio,
}: {
  common: CommonUniforms;
  geometry: BufferGeometry;
  points: BufferGeometry;
  pixelRatio: number;
}) {
  const uAmp = useMemo(() => ({ value: 0 }), []);
  const uScatter = useMemo(() => ({ value: 1 }), []);
  const uRipples = useMemo(
    () => ({ value: [new Vector3(0, 0, -999), new Vector3(0, 0, -999), new Vector3(0, 0, -999)] }),
    [],
  );

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          ...common,
          uAmp,
          uRipples,
          uGround: { value: PALETTE.ground.clone() },
          uTeal: { value: PALETTE.teal.clone() },
          uFill: { value: PALETTE.fill.clone() },
          uFillDir: { value: FILL_DIR.clone() },
        },
        vertexShader: terrainVert,
        fragmentShader: terrainFrag,
      }),
    [common, uAmp, uRipples],
  );

  const pointMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uAmp,
          uScatter,
          uSize: { value: pixelRatio },
          uTeal: { value: PALETTE.teal.clone() },
        },
        vertexShader: pointVert,
        fragmentShader: pointFrag,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [uAmp, uScatter, pixelRatio],
  );

  useFrame(() => {
    uAmp.value = hero.amp;
    uScatter.value = hero.scatter;
    for (let i = 0; i < 3; i++) {
      uRipples.value[i].set(hero.ripples[i * 3], hero.ripples[i * 3 + 1], hero.ripples[i * 3 + 2]);
    }
  });

  return (
    <>
      <mesh geometry={geometry} material={material} frustumCulled={false} />
      <points geometry={points} material={pointMaterial} frustumCulled={false} />
    </>
  );
}
