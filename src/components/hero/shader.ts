// The hero is one fullscreen fragment shader. Everything below draws in a
// single pass over the frame: the graded ground, the temperature and glows
// laid over it, the field of lines, its sun, the grain and the vignette.

/** A fullscreen triangle straight out of the vertex id, so the scene needs no
 *  buffers, no attributes and no geometry upload at all. */
export const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 uRes;      // drawing buffer size, device pixels
uniform float uDpr;
uniform float uTime;    // scene clock in seconds
uniform float uIntro;   // 0 to 1, already eased on the site curve in JS
uniform float uScroll;  // 0 to 1 across the hero's exit
uniform vec3 uPtr;      // pointer x, y in uv, z = strength
// Grain amplitude. Phones pass zero: at 390 across there are too few pixels per
// stroke for it to read as film, and it lands as noise on the lines instead.
uniform float uGrain;

// Where the lines run out. The frame above this is haze and glow only.
const float HORIZON = 0.855;
// Lines between the horizon and the bottom edge.
const float LINES = 94.0;
// Below one, the spacing shrinks toward the horizon. This is the whole
// perspective: there is no camera and no projection anywhere in the scene.
const float SQUASH = 0.55;
// Height of the line the intro opens from, in uv from the bottom.
const float SEED_Y = 0.455;

const vec3 GROUND_TOP = vec3(0.0235, 0.0314, 0.0471);    // #06080c
const vec3 GROUND_BOTTOM = vec3(0.0431, 0.0627, 0.0863); // #0b1016
const vec3 WARM = vec3(0.941, 0.659, 0.376);             // #f0a860
// The site's accent, --accent in dark mode, at a fuller chroma so it survives
// being laid on at a fortieth of its value. Same hue as #0b7580 and #74d0d8,
// and blue stays above green in it, which is what keeps the cool side reading
// as the site's teal rather than drifting green where it meets the warm side.
const vec3 COOL = vec3(0.267, 0.749, 0.800);             // #44bfcc
// A low sun off the right, near the horizon. Normalised, in the field's own
// coordinates: x across the frame, and the line count, which runs away from
// the viewer. Raking, so the lit faces are the ones falling toward it.
const vec2 SUN = vec2(0.882, -0.471);
// One line-count unit against one unit of x. Their screen sizes are two orders
// apart, so the two halves of the slope need this to be comparable at all.
const float SLOPE_B = 46.0;

vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }

/** Gaussian, because it is the only common falloff with no inflection: a
 *  smoothstep disc of this size draws a visible ring at its edge. */
float bloom(vec2 p, vec2 c, vec2 r) {
  vec2 d = (p - c) / r;
  return exp(-dot(d, d));
}

/** Interleaved gradient noise. Used for the grain and, at a 255th of its
 *  amplitude, to break up the eight bit quantisation of the gradient. */
float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.3711, 289.1733))) * 43758.5453);
}

void main() {
  vec2 p = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;

  // The intro opens from the middle of the frame outwards. Multiplying past
  // one and subtracting the distance is a wavefront: every column runs the
  // same curve, the outer ones start later. The site's easing is steep, most
  // of it spent in its first third, so the spread has to be wide or the whole
  // intro is over in a quarter of a second.
  float fromMid = abs(p.x - 0.5) * 2.0;
  float open = clamp(uIntro * 2.15 - fromMid * 1.15, 0.0, 1.0);
  // Smoothed, or the wavefront has a straight vertical leading edge and the
  // field arrives as a rectangle sliding open.
  open = open * open * (3.0 - 2.0 * open);

  // Pointer swell, measured in height units so it stays round on any aspect.
  vec2 pd = (p - uPtr.xy) * vec2(aspect, 1.0);
  float swell = exp(-dot(pd, pd) / 0.105) * uPtr.z;

  // ---- the field -------------------------------------------------------
  float q = clamp((HORIZON - p.y) / HORIZON, 0.0, 1.0);
  float base = LINES * pow(q, SQUASH);

  // One horizontal unit is a little under the frame height, so the wave keeps
  // roughly the same shape when the frame goes from a desktop to a phone.
  float x = (p.x - 0.5) * mix(1.0, aspect, 0.55);
  // Three octaves whose periods are 23, 29 and 19 seconds. No common multiple
  // inside a sitting, so the drift never returns to a frame already seen.
  float a1 = x * 2.30 + base * 0.055 + uTime * 0.2731;
  float a2 = x * 3.70 - base * 0.088 - uTime * 0.2164;
  float a3 = x * 6.10 + base * 0.140 + uTime * 0.3307;
  float w = sin(a1) + sin(a2) * 0.55 + sin(a3) * 0.26;
  // The same three octaves differentiated, which is the surface's slope and
  // the only thing in the frame that knows which way a ridge faces. Analytic
  // rather than dFdx of the line count: that gradient is dominated by the
  // perspective ramp, which points the same way at every pixel and so carries
  // no tilt at all.
  float wx = 2.30 * cos(a1) + 2.035 * cos(a2) + 1.586 * cos(a3);
  float wb = 0.055 * cos(a1) - 0.0484 * cos(a2) + 0.0364 * cos(a3);

  float gw = sin(x * 1.15 - uTime * 0.1974 + base * 0.030) * 0.62
           + sin(x * 0.70 + uTime * 0.1571 - base * 0.018) * 0.38;

  float calm = smoothstep(0.0, 0.62, uScroll);
  float amp = 3.30 * open * (1.0 - calm);

  // Displacing the line index rather than the pixel is what makes the
  // amplitude shrink with distance for free: a fixed number of line widths is
  // fewer pixels where the lines are close together.
  float s = base + w * amp - swell * 3.4;

  // Screen space gradient of the line index. It carries both the stroke width
  // and the spacing, so one stroke is one width at every device pixel ratio
  // and at every point of the perspective.
  float g = max(length(vec2(dFdx(s), dFdy(s))), 1e-6);
  float spacing = 1.0 / g;
  float d = abs(fract(s + 0.5) - 0.5) / g;

  float halfStroke = 0.55;
  float core = 1.0 - smoothstep(halfStroke - 0.5, halfStroke + 0.5, d);
  // A wide, weak skirt around every stroke. Bunched lines pool into light
  // instead of turning into a grey block.
  float skirt = exp(-d * 0.40) * 0.045;

  // Two fades, both of them physical rather than decorative. The first drops
  // the lines before their spacing reaches the sampling limit, which is the
  // only honest way to avoid moire. The second is the haze.
  float resolved = smoothstep(2.6, 14.0, spacing);
  // Above the horizon the line index is constant in y, so its level sets are
  // vertical. Without this gate the frame grows a picket fence.
  float below = smoothstep(0.0, 0.012, q);
  float haze = mix(1.0, 0.62, smoothstep(0.40, HORIZON, p.y));
  // Asymmetric on purpose: the name owns the left, so the field gives up far
  // more there than it does on the right, where it is free to be the subject.
  float fx = p.x * 2.0 - 1.0;
  float sides = 1.0 - mix(0.86, 0.44, smoothstep(-0.30, 0.30, fx)) * pow(abs(fx), 1.5);
  float floorFade = mix(0.34, 1.0, smoothstep(0.0, 0.55, p.y));

  // Ridges catch the light and troughs fall away, so a line is a run of
  // brightness rather than a wire of constant weight.
  float crest = smoothstep(-1.10, 0.95, w);
  float pool = smoothstep(-0.30, 0.80, gw);
  // What the sun makes of that slope. Normalising the slope keeps the light
  // even across the perspective, and the softener in the divisor means a flat
  // patch lands at no answer rather than at a random direction amplified.
  // The slope follows the amplitude, so the intro opens on a flat, evenly lit
  // field and the scroll flattens the light with the water.
  vec2 slope = vec2(wx, wb * SLOPE_B) * (open * (1.0 - calm));
  float rake = -dot(slope, SUN) / (length(slope) + 1.05);
  float sun = smoothstep(0.10, 0.90, 0.5 + 0.5 * rake);
  // The lit end stays where the unlit field already was, so the direction is
  // bought out of the shadows rather than off the top of the frame: with the
  // pointer swell on it the brightest pixel was already at 0.84 and there is
  // no headroom above it to spend.
  float lum = crest * (0.28 + 0.72 * pool) * mix(0.16, 1.04, sun);
  float lit = mix(0.04, 1.0, lum * open + (1.0 - open));

  float mask = resolved * below * haze * sides * floorFade * open * open;
  float ink = (core + skirt) * lit * mask;

  // The line the field grows out of. It burns exactly where the wavefront has
  // not yet arrived, so it is gone the moment the field is there.
  float seed = 1.0 - open;
  if (seed > 0.001) {
    float sy = abs(p.y - SEED_Y) * uRes.y;
    float sl = 1.0 - smoothstep(0.55, 1.55, sy);
    sl += exp(-sy * 0.045) * 0.22;
    ink += sl * seed * sides * (0.45 + 0.55 * (1.0 - fromMid));
  }

  // ---- the ground ------------------------------------------------------
  vec3 col = toLinear(mix(GROUND_BOTTOM, GROUND_TOP, p.y));

  // A temperature laid across the whole frame, not a second glow: the left
  // third of the air is the site's accent and the right is the warm side. The
  // two ramps cross the middle at nothing each, so the centre stays the
  // neutral it already is instead of going muddy where they meet.
  float coolSide = 1.0 - smoothstep(0.02, 0.62, p.x);
  float warmSide = smoothstep(0.44, 0.98, p.x);
  // The cool half of it carries a height as well, or the ramp is a panel of
  // colour with a seam down it. Lowest at the water line, where the frame has
  // to go dark, and falling off again into the top corner, which takes its
  // own much fainter wash below.
  float coolBand = coolSide * smoothstep(0.02, 0.34, p.y) * (1.0 - 0.62 * smoothstep(0.50, 0.94, p.y));

  float warmG = bloom(p, vec2(0.690, 0.450), vec2(0.50, 0.36));
  float coolG = bloom(p, vec2(0.180, 0.580), vec2(0.46, 0.36));
  // The top left is the one quadrant the field never reaches. Left alone it
  // is not dark, it is empty, so it gets the faintest wash of the same accent:
  // enough that the corner is air the frame is lit through rather than an edge
  // the picture was cut at.
  float sky = bloom(p, vec2(0.02, 1.02), vec2(0.44, 0.32));
  float dim = 1.0 - uScroll * 0.55;
  col += toLinear(WARM) * (warmG * 0.042 + warmSide * 0.011) * dim;
  col += toLinear(COOL) * (coolG * 0.054 + coolBand * 0.031 + sky * 0.013) * dim;

  // The lines take the colour of the air they cross, and only the crests come
  // near white. Nothing in the frame is allowed to reach it, and on the cool
  // side they stop short of it: a highlight that goes white takes the hue out
  // of exactly the pixels that carry it, which is why the left third used to
  // read grey however much teal sat behind it.
  vec3 tint = vec3(0.46, 0.58, 0.70);
  tint = mix(tint, WARM, clamp(warmG * 1.15 + warmSide * 0.26 * sun, 0.0, 0.90));
  tint = mix(tint, COOL, clamp(coolG * 0.82 + coolSide * 0.74, 0.0, 0.90));
  tint = mix(tint, mix(vec3(1.0), vec3(0.80, 0.97, 1.0), coolSide * 0.85), crest * 0.72);
  col += toLinear(tint) * ink * 1.85 * dim * (1.0 + swell * 0.55);

  // ---- grade -----------------------------------------------------------
  float r = length((p - vec2(0.5, 0.52)) * vec2(aspect, 1.0)) / (0.52 * aspect);
  col *= 1.0 - 0.42 * smoothstep(0.35, 1.25, r);
  // The bottom corners take a second fall of their own, both of them. A radial
  // vignette leaves them at the value of the sides, and the field then reads as
  // a texture the frame happens to cut rather than a pool of light lying inside
  // it.
  float floorCorner = (1.0 - smoothstep(0.0, 0.50, p.y)) * smoothstep(0.16, 0.84, abs(fx));
  col *= 1.0 - 0.46 * floorCorner;
  // And the far edge on the cool side, which is the point of the frame
  // furthest from the light. The teal belongs to the left third, not to the
  // last sixteenth of it: without this the wash carries the frame's own margin
  // brighter than its middle and the light stops having a direction at all.
  col *= 1.0 - 0.26 * (1.0 - smoothstep(0.0, 0.16, p.x));

  col = 1.0 - exp(-col * 1.18);
  col = toSrgb(col) * 0.86;

  // Grain steps at twelve a second: at sixty it reads as a haze, not as film.
  float grain = hash(floor(gl_FragCoord.xy / max(uDpr, 1.0)) + floor(uTime * 12.0) * 17.31);
  col += (grain - 0.5) * 0.030 * uGrain;

  // Eight bits cannot hold this gradient. A sub step of noise turns the
  // contour bands into dust.
  col += (ign(gl_FragCoord.xy) - 0.5) / 255.0;

  fragColor = vec4(col, 1.0);
}`;
