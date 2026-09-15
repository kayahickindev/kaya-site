"use client";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { type BufferGeometry, DoubleSide, ShaderMaterial } from "three";
import { PREFIX } from "./glsl";
import { hero } from "./state";
import type { CommonUniforms } from "./uniforms";
import { PALETTE } from "./world";

const vert = /* glsl */ `
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  // The ribbon's own u runs bank to bank whatever the valley does, so the
  // shader can ask how close it is to a shore without knowing the centreline.
  vUv = uv;
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
uniform vec3 uWindow;
varying vec3 vWorld;
varying vec2 vUv;

vec3 waveNormal(vec2 p, float t, float amp) {
  vec3 n = vec3(0.0, 1.0, 0.0);
  // Wavelengths of two to six units. Longer than that and the near reach reads
  // as corrugated iron rather than water; the slopes stay under about six
  // degrees, which is what real water does and what keeps the specular a
  // streak rather than a field of hard chips.
  vec2 d1 = vec2(1.35, 0.86);
  vec2 d2 = vec2(-0.72, 1.74);
  vec2 d3 = vec2(2.61, -1.73);
  // Most of the slope comes from the noise, not the sines: three coherent
  // trains interfere into a regular weave that reads as corrugated iron, and
  // the eye catches that pattern long before it catches the water.
  n.xz += d1 * cos(dot(p, d1) + t * 1.6) * 0.012 * amp;
  n.xz += d2 * cos(dot(p, d2) - t * 1.1) * 0.009 * amp;
  n.xz += d3 * cos(dot(p, d3) + t * 2.4) * 0.006 * amp;
  n.xz += (vec2(fbm2(p * 0.62 + vec2(t * 0.11, -t * 0.06)),
                fbm2(p * 0.58 - vec2(t * 0.09, t * 0.13))) - 0.5) * 0.105 * amp;
  return normalize(n);
}

void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / dist;
  // Ripples flatten with distance, which is what keeps the far water calm
  // instead of boiling into noise.
  float calm = 1.0 - smoothstep(220.0, 1100.0, dist);
  // Facets steep enough to mirror a sun this low are the whole trick. The old
  // amplitude was a twentieth of the tilt the geometry needs, so the specular
  // never found the sun and the river read as a hole in the ground.
  vec3 n = waveNormal(vWorld.xz, uTime, 0.35 + 0.65 * calm);

  vec3 r = reflect(-v, n);
  r.y = abs(r.y);
  vec3 refl = skyColor(r);

  // Schlick, left honest. Water returns about a tenth of the sky at the angle
  // the near reach is seen from and almost all of it at the far grazing end,
  // which is exactly the gradient the shot wants: dark water under the name,
  // a lit ribbon running out toward the horizon. Forcing a floor on this is
  // what turned the foreground into wet tarmac.
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 col = mix(uDeep, refl, fres);

  // The sun path. A camera this high sees the water at too steep an angle for
  // a mirror image of a sun this low, so the streak is carried by the middle
  // lobe, which is broad enough to survive the twelve degrees between the
  // valley's bearing and the sun's, and cut into glitter by the ripple field.
  float sd = max(dot(r, uSunDir), 0.0);
  col += uSunColor * pow(sd, 260.0) * 3.0 * uIgnition;
  col += uSunColor * pow(sd, 40.0) * 1.15 * uIgnition;
  col += uSunColor * pow(sd, 9.0) * 0.07 * uIgnition;
  // The city on the water. A true planar reflection would mean rendering the
  // skyline a second time, and what actually reads at this scale is not the
  // buildings but the smear: warm light pulled into long streaks down the
  // current, strongest against the banks the towers stand on. It is the single
  // cue that tells a viewer this ribbon is wet.
  float bank = pow(abs(vUv.x * 2.0 - 1.0), 1.5);
  float smear = fbm2(vec2(vWorld.x * 0.40 + n.x * 6.0, vWorld.z * 0.011));
  col += uWindow * smoothstep(0.50, 0.92, smear) * bank * 0.42 * uIgnition *
         (1.0 - smoothstep(500.0, 1300.0, dist));
  // A touch of cool bounce off the banks, so the water is not one hue.
  col += uTeal * pow(max(1.0 - abs(r.y - 0.30) * 3.0, 0.0), 3.0) * 0.012;

  col = applyFog(col, dist, -v);
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), smoothstep(0.25, 0.75, uAmp));
}
`;

export function River({ common, geometry }: { common: CommonUniforms; geometry: BufferGeometry }) {
  const uAmp = useMemo(() => ({ value: 0 }), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          ...common,
          uAmp,
          uDeep: { value: PALETTE.ground.clone().multiplyScalar(0.42) },
          uTeal: { value: PALETTE.teal.clone() },
          uWindow: { value: PALETTE.window.clone() },
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
