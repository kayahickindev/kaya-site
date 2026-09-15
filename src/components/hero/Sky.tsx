"use client";
import { useMemo } from "react";
import { BackSide, ShaderMaterial, SphereGeometry } from "three";
import { PREFIX } from "./glsl";
import type { CommonUniforms } from "./uniforms";

const vert = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

const frag =
  PREFIX +
  /* glsl */ `
varying vec3 vDir;
void main() {
  vec3 dir = normalize(vDir);
  vec3 col = skyColor(dir);
  // The disc itself, sized in radians so it stays stable at any precision.
  float ang = acos(clamp(dot(dir, uSunDir), -1.0, 1.0));
  float disc = 1.0 - smoothstep(0.0125, 0.0175, ang);
  col += uSunColor * disc * 5.2 * uIgnition;
  gl_FragColor = vec4(dither(col, gl_FragCoord.xy), 1.0);
}
`;

/** The dome carries the gradient, the haze colour every other surface fades
 *  into, and the sun itself, so there is one source of truth for the light. */
export function Sky({ common }: { common: CommonUniforms }) {
  const geometry = useMemo(() => new SphereGeometry(2400, 48, 32), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { ...common },
        vertexShader: vert,
        fragmentShader: frag,
        side: BackSide,
        depthWrite: false,
        fog: false,
      }),
    [common],
  );
  return (
    <mesh geometry={geometry} material={material} frustumCulled={false} renderOrder={-10} />
  );
}
