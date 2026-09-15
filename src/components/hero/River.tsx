"use client";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, ShaderMaterial } from "three";
import { PREFIX } from "./glsl";
import { hero } from "./state";
import type { CommonUniforms } from "./uniforms";
import { PALETTE, buildRiverGeometry } from "./world";

const vert = /* glsl */ `
varying vec3 vWorld;
void main() {
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
}
`;

// Water is cheap to fake and expensive to get wrong: what sells it is a
// grazing-angle reflection of the same sky the dome paints, plus a tight
// specular lobe for the sun path. Ripples arrive as normals only, so the
// surface stays a flat ribbon and costs nothing in vertices.
const frag =
  PREFIX +
  /* glsl */ `
uniform float uAmp;
uniform vec3 uDeep;
uniform vec3 uTeal;
varying vec3 vWorld;

vec3 waveNormal(vec2 p, float t) {
  vec3 n = vec3(0.0, 1.0, 0.0);
  // Short wavelengths: anything over about ten units reads as stripes at this
  // distance instead of as water.
  vec2 d1 = vec2(0.38, 0.24);
  vec2 d2 = vec2(-0.19, 0.47);
  vec2 d3 = vec2(0.83, -0.55);
  n.xz += d1 * cos(dot(p, d1) + t * 1.6) * 0.022;
  n.xz += d2 * cos(dot(p, d2) - t * 1.1) * 0.019;
  n.xz += d3 * cos(dot(p, d3) + t * 2.4) * 0.008;
  n.xz += (vec2(fbm2(p * 0.14 + vec2(t * 0.09, -t * 0.05))) - 0.5) * 0.05;
  return normalize(n);
}

void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / dist;
  // Ripples flatten with distance, which is what keeps the far water calm
  // instead of boiling into noise.
  float calm = 1.0 - smoothstep(180.0, 900.0, dist);
  vec3 n = normalize(mix(vec3(0.0, 1.0, 0.0), waveNormal(vWorld.xz, uTime), 0.35 + 0.65 * calm));

  vec3 r = reflect(-v, n);
  r.y = abs(r.y);
  vec3 refl = skyColor(r);

  float fres = 0.05 + 0.95 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 col = mix(uDeep, refl, clamp(0.04 + fres * 1.15, 0.0, 1.0));

  // The sun path, and only the sun path: a broad warm term over the whole
  // surface is what turns water into wet tarmac.
  float sd = max(dot(r, uSunDir), 0.0);
  col += uSunColor * pow(sd, 1200.0) * 6.0 * uIgnition;
  col += uSunColor * pow(sd, 300.0) * 0.9 * uIgnition;
  col += uSunColor * pow(sd, 40.0) * 0.04 * uIgnition;

  col = applyFog(col, dist, -v);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), smoothstep(0.25, 0.75, uAmp));
}
`;

export function River({ common }: { common: CommonUniforms }) {
  const geometry = useMemo(() => buildRiverGeometry(), []);
  const uAmp = useMemo(() => ({ value: 0 }), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          ...common,
          uAmp,
          uDeep: { value: PALETTE.ground.clone().multiplyScalar(0.3) },
          uTeal: { value: PALETTE.teal.clone() },
        },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        side: DoubleSide,
      }),
    [common, uAmp],
  );
  useFrame(() => {
    uAmp.value = hero.amp;
  });
  return <mesh geometry={geometry} material={material} frustumCulled={false} renderOrder={1} />;
}
