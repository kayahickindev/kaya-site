// Shared shader source. Every surface asks the same sky function for its
// reflections and its haze, which is why the distance melts into the horizon
// instead of ending at a visible edge: aerial haze is just the sky seen
// through the air in front of it.

/** Uniform block every material in the scene declares. */
export const COMMON_UNIFORMS = /* glsl */ `
uniform float uTime;
uniform float uIgnition;
uniform float uFogDensity;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uHorizonCool;
uniform vec3 uHaze;
`;

export const NOISE = /* glsl */ `
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm2(vec2 p) {
  return vnoise(p) * 0.6 + vnoise(p * 2.13 + 7.1) * 0.3 + vnoise(p * 4.7 - 3.3) * 0.1;
}
`;

export const SKY = /* glsl */ `
vec3 skyColor(vec3 dir) {
  vec3 n = normalize(dir);
  float t = smoothstep(-0.015, 0.52, n.y);
  float sd = max(dot(n, uSunDir), 0.0);
  // The horizon is only warm where the sun is: opposite it, the band stays the
  // cool blue that makes golden hour read as golden hour.
  float toward = pow(dot(n, uSunDir) * 0.5 + 0.5, 5.5);
  vec3 col = mix(mix(uHorizonCool, uHorizon, toward), uZenith, pow(t, 0.62));
  col += uSunColor * pow(sd, 16.0) * 0.17 * uIgnition;
  col += uSunColor * pow(sd, 160.0) * 0.75 * uIgnition;
  // Thin warm cloud streaks sit in the band just above the horizon.
  float band = smoothstep(0.015, 0.11, n.y) * (1.0 - smoothstep(0.12, 0.40, n.y));
  float streak = fbm2(vec2(atan(n.x, -n.z) * 2.6, n.y * 22.0));
  col += uSunColor * band * smoothstep(0.66, 0.98, streak) * 0.022 * uIgnition;
  col = mix(uHaze, col, smoothstep(-0.14, 0.012, n.y));
  return col;
}
vec3 applyFog(vec3 col, float dist, vec3 viewDir) {
  float f = 1.0 - exp(-pow(max(dist, 0.0) * uFogDensity, 2.0));
  return mix(col, skyColor(viewDir), clamp(f, 0.0, 1.0));
}
/* Gradients this wide band on 8-bit output, so every shader dithers by less
   than one code value before it leaves. */
vec3 dither(vec3 col, vec2 fc) {
  return col + (hash21(fc) - 0.5) * 0.0028;
}
`;

export const PREFIX = COMMON_UNIFORMS + NOISE + SKY;
