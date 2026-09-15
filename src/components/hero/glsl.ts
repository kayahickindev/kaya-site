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
  float sd = max(dot(n, uSunDir), 0.0);
  // How far round the sky bowl the warmth reaches. A low exponent on purpose:
  // at golden hour a good third of the sky is warm, and a tight falloff is
  // what makes a scene read as a halo pasted onto night.
  float toward = pow(dot(n, uSunDir) * 0.5 + 0.5, 2.1);

  // Two curves rather than one. The vertical ramp carries navy overhead into
  // cool slate at eye level; the amber lives in a separate wedge that decays
  // over about eight degrees of elevation, so it sits in the lower fifth of
  // the sky whatever the framing does to the horizon line.
  float up = smoothstep(-0.02, 0.34, n.y);
  vec3 col = mix(uHorizonCool, uZenith, up);
  float wedge = exp(-max(n.y, 0.0) / 0.075);
  col = mix(col, uHorizon, wedge * (0.12 + 0.88 * toward));

  // Three lobes for the sun. The widest is the air between here and the sun
  // lighting up, which is what a tight disc halo cannot fake, but it is kept
  // off the far half of the sky: carry it any wider and the navy overhead goes
  // grey and the whole frame reads as smog.
  col += uSunColor * pow(sd, 5.0) * 0.13 * uIgnition;
  col += uSunColor * pow(sd, 22.0) * 0.22 * uIgnition;
  col += uSunColor * pow(sd, 170.0) * 0.70 * uIgnition;

  // Thin warm cloud streaks sit in the band just above the horizon.
  float band = smoothstep(0.012, 0.09, n.y) * (1.0 - smoothstep(0.10, 0.44, n.y));
  float streak = fbm2(vec2(atan(n.x, -n.z) * 2.6, n.y * 22.0));
  col += uSunColor * band * smoothstep(0.58, 0.96, streak) * (0.05 + 0.22 * toward) * uIgnition;

  // Below the horizon the dome is haze, and the handover is quick: a view ray
  // that dips even a degree under the skyline is looking through air, not at
  // the amber band, and letting the band leak downward is what washes every
  // fogged surface in the scene to the same pale brown.
  col = mix(uHaze, col, smoothstep(-0.055, 0.018, n.y));
  return col;
}
/* A sun this low lights far more than the faces that strictly point at it:
   most of the light arriving at golden hour is the warm half of the sky rather
   than the disc. One wrapped term buys that without a second light or a shadow
   map, and it is what puts warm light on the terrain and on the sun-facing
   tower faces while the faces turned away keep their navy. */
vec3 warmWrap(vec3 n) {
  float w = max(dot(n, uSunDir) * 0.5 + 0.5, 0.0);
  return uHorizon * pow(w, 2.2);
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
