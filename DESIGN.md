# Kaya Hickin personal website

## Direction

One scrolling story, six chapters, one purpose-built visual per point. The hero
is a field of light: one hand-written WebGL2 shader drawing about ninety fine
lines into a slowly breathing topography, dark, calm and razor sharp, running
under his name, one line, and three technical proof
numbers. Travel is a chapter, not the
opening. Then: MyFutureSelf as its six App Store composites drifting edge to edge
above metrics that count up; "One person, every layer" as the architecture in
beams, four platform nodes wired to one backend hub with light travelling the
wires; Dog AI as a schematic of
the model (sample photo in, six real scores out); a globe carrying the fifteen
visited countries and the photo pins; a marquee of official logos for backing
and recognition; and contact as a big email with brand-logo tiles. A floating pill
nav tracks the chapter. Copy is one or two lines per chapter; the visuals do the
explaining. Subpages (Work, About, Stack, Credentials, Contact) keep every accepted
fact reachable and share the same header and pill nav.

## Typography

- Geist Sans only, loaded through `next/font/google`. No serif, no italic display,
  no mono face (nothing used it, and it was preloaded on every page).
- Headings are striking through scale, weight 600, and tight tracking: the hero
  name (`.display`), page titles (`.h-page`), section titles (`.h-section`).
- Body is 17px (16px on phones) with muted ink for secondary copy. Labels
  (`.label`) are 13px uppercase, never smaller.
- Line lengths stay under roughly 64 characters; leads under about 58.

## Color

- Paper and ink neutrals with one accent: the glacial teal of the hero lake. Dark
  mode mirrors the same tokens. All text pairs meet WCAG AA.
- Product bands keep fixed identities in both schemes: MyFutureSelf on its deep navy
  ground with action blue (the app's own palette since 2026-08-31); Dog AI on warm
  cream with a deep orange accent and dark brown ink.

## Layout and motion

- `.wrap` is the 1480px container with a fluid gutter. `.band` sections span the
  viewport; product bands are full-bleed.
- Hero: full-bleed, 100svh, dark, and rendered live. `HeroStage` paints the still
  first and then hands over to one hand-written WebGL2 fragment shader in
  `src/components/hero/`: about ninety fine lines spanning the frame, displaced by
  three slow sine octaves into a single breathing topography, over a graded ground
  carrying a temperature: the site's accent across the left third and the warm
  glow on the right, two ramps that each cross the middle at nothing so the
  centre stays neutral instead of going muddy where they meet. No library, no
  geometry and no buffers: a fullscreen triangle is issued straight out of
  `gl_VertexID` and one function decides every pixel of the frame.
- Hero field: the lines are the level sets of a single value, not a loop over
  ninety strokes. That value counts lines down from the horizon on a power curve,
  so the spacing compresses toward it, and the displacement is added to the count
  rather than to the pixel, which shrinks the amplitude with distance for free.
  The screen-space gradient of the count then carries both the stroke width and
  the spacing, so a stroke is about 1.1 device pixels at every device pixel ratio
  and everywhere in the perspective, and the field dissolves by itself once the
  spacing approaches the sampling limit instead of breaking into moire. Above the
  horizon the count stops varying in y, so its level sets turn vertical; the gate
  on that is the difference between a haze and a picket fence.
- Hero light: a second, slower field decides where the light pools, and the two
  are multiplied. Lighting a field by its own height is what makes procedural work
  look procedural, because then every ridge lights identically. On top of that the
  frame has a source: a low sun off the right, raking. The three octaves are
  differentiated analytically, which gives the surface's slope, and a face falling
  toward the sun is lit while a face climbing away from it is not. The screen
  gradient of the line count cannot do this job: it is dominated by the
  perspective ramp, which points the same way at every pixel and carries no tilt
  at all. The slope is scaled by the amplitude, so the intro opens on a flat,
  evenly lit field and the scroll flattens the light with the water. The lit end
  of the range sits where the unlit field already was and the direction is bought
  out of the shadows, because with the pointer swell on it the brightest pixel is
  already at 0.84 of full luminance and there is no headroom above it to spend;
  the field alone is 0.71. The frame then falls away on its own terms: a second
  fall in both bottom corners, and one more at the far left edge, which is the
  point furthest from the light. Lines take the colour of the air they cross,
  warm on the right, the accent at the left, and only the crests come near white,
  never on the cool side: a highlight that goes white takes the hue out of exactly
  the pixels carrying it, which is why the left third read grey however much teal
  sat behind it. A travelling highlight along the contours was built and cut: at
  an amplitude you could see it was the skeleton-shimmer wipe, and at one that
  suited the frame it moved column luminance by two percent. Everything
  accumulates in linear light under a soft exponential shoulder, and the result is
  dithered by a sub-step of interleaved gradient noise, because eight bits cannot
  hold this gradient without banding. Grain steps twelve times a second; at sixty
  it reads as a haze rather than as film. The CSS scrim was cut back to protecting
  the type, since the vignette and the side falloff now follow the field instead
  of sitting flat on top of it, and doing both was grading the frame twice.
- Hero motion: a drift built from 23, 29 and 19 second periods, which share no
  common multiple inside a sitting, so it never lands back on a frame already
  seen. The intro runs once over 1.6 s on the site easing: a single flat line of
  light that the field grows out of, opening from the middle of the frame outward.
  The seed line burns exactly where the wavefront has not arrived yet, so it is
  gone the moment the field is there rather than cross fading with it, and the
  lines fade in on the square of the wavefront while the amplitude follows it
  directly, so a line already carries its share of the topography by the time it
  is visible. Equal ramps arrive instead as a rectangle of flat, packed lines.
  Pointer devices get a Gaussian swell that lifts and brightens the field, chased
  at 0.05 a frame so it glides and never snaps. On scroll the field flattens and
  dims, the canvas fades over the last 40 percent, and the type leaves at
  different depths, spread so no line ever runs into the one beneath it. The type
  keeps its own timeline so it never waits for the renderer: SplitText brings the
  name up 0.6 s in, then the line, the proof row and the button. That intro is a
  desktop treatment and the width query is deliberate. The h1 is the page's
  largest contentful paint, so holding it transparent is charged straight to LCP,
  and on a phone the hold bought nothing because hydration there never lands
  inside a workable one: phones paint the type at first paint, desktops hold it
  0.6 s and `HeroStage` skips the intro once that has elapsed, measured against
  the first-contentful-paint entry rather than a raw `performance.now()`.
- Hero engineering: one `next/dynamic` chunk with `ssr: false`, requested only
  after the load event and an idle slot, 6.6 KB gzipped against about 250 KB for
  the React Three Fiber city it replaces. `three`, `@react-three/fiber`,
  `@react-three/drei` and `@react-three/postprocessing` went with it, and so did
  the `react-hooks/immutability` exemption they needed. One draw call of three
  vertices a frame, device pixel ratio capped at 2 and at 1.75 on phones, 60 fps
  with a worst frame of 16.8 ms across 800 frames at both 1440 and 390. The loop
  stops when the tab is hidden or the hero has scrolled away and restarts with its
  clock reference cleared, so the scene never advances by the whole gap. Cleanup
  returns the program but never calls `loseContext`: `getContext` on a canvas
  whose context was deliberately lost hands back the same dead context, so forcing
  the loss blanks the canvas on every remount, which in development is every
  mount. Reduced motion, no WebGL2 and no JavaScript all keep the still, which is
  a frame of the same shader. `?poster=1` renders that frame, `?t=<seconds>` holds
  any moment for a deterministic capture, which is exact here because every input
  is a function of the clock, and `?perf=1` publishes frame times on
  `window.__heroPerf`. `tools/hero-video/` is the retired clip pipeline.
- Chapter visuals reveal on scroll with a tiny IntersectionObserver; the pre-reveal
  state only exists when scripting is enabled and a 2.1s CSS fallback shows the block
  regardless, so nothing depends on hydration. Text never fades: the beam nodes and
  the counted numbers are at full ink from the first frame, so an accessibility audit
  mid-reveal still reads AA.
- Lighthouse on the production build (2026-09-15, request-level throttling):
  mobile performance 99, desktop 97, both with no layout shift and 10 ms and 0 ms
  of total blocking time. The home document is 19 KB gzipped and the name is the
  mobile largest paint (Chrome excludes a full-viewport image as a background).
  Desktop's largest paint is the hero line at 1.3 s and all of it is render delay,
  which is the desktop intro holding the type transparent on purpose. What remains
  is the framework's own JavaScript sharing the throttled connection with the
  stylesheet and font on a local HTTP/1.1 server, which HTTP/2 on Vercel
  prioritises away, so PageSpeed Insights on the deployed URL is the number to
  trust.
- The world map is generated by `tools/build-world-map.py` from Natural Earth 110m
  data into `src/generated/`, then `tools/bake-world-map.py` writes it as two themed
  SVG files in `public/world/` that load lazily as images, so its paths never sit in
  the page HTML (inline SVG costs twice: markup plus the hydration payload). Pins
  use the same projection.
- The World chapter is that map on a sphere. `Globe` reads `public/world/map-light.svg`
  once into an offscreen canvas and asks a Fibonacci lattice of 14,000 points what is
  under each of them, projecting with the same Natural Earth formula, so land, the
  fifteen visited countries and the home country keep the map's own colours. It draws
  on a 2D canvas at device pixel ratio 2, turns once every 40 seconds, follows a drag
  with damping, and stops when it is off screen or the tab is hidden; reduced motion
  keeps it still, and without scripting the map images stand in. cobe drew it first
  and was dropped: its sphere shader samples no land in current Chrome, on the GPU and
  in software, in 2.0.1 and in 0.6.5, while the same texture upload in a hand-written
  shader is fine. The four photographs sit under the globe as a captioned row and the
  countries stay listed as text.
- The Builder chapter is the architecture as beams (`ArchitectureBeams`): iOS, Android,
  Web and Voice AI around a Backend hub, each node a real logo with its label and tech
  line. The paths are measured from the node elements with a ResizeObserver, so they
  stay attached at every width and re-aim when the phone layout puts the hub in the
  middle row. A gradient slides along each beam, the voice lane in both directions,
  started once by ScrollTrigger and looping; reduced motion shows the beams lit and
  still. The diagram is decorative markup with an `sr-only` list carrying the facts.
- Backing is a marquee (`LogoMarquee`) of the official marks: one endless track that
  pauses under the cursor and fades at both edges, its second set hidden from
  assistive technology and carrying no links. Touch and reduced motion keep the static
  logo wall, which is also the no-CSS state.
- Numbers count inside their own unit (`NumberTicker`): "66K+" counts 0 to 66 and
  keeps the suffix, "4.7" keeps its decimal, 0.9s on the site easing, started once by
  ScrollTrigger. The server renders the finished value, so no-JS and reduced-motion
  visitors read the real number immediately and the digits stay tabular.
- Product imagery is the App Store listing's own composites, never simulator
  captures. `StoreGallery` shows them as one wide strip: it drifts slowly under a
  pointer that can hover and pauses under the cursor, is a native snap scroller on
  touch, and stands still with reduced motion. The work index keeps three of them
  in the older three-up grid. No fabricated device frames or UI.
- Dog AI is shown as its model, not its app: a schematic with the real sample photo
  going in, a custom multimodal model block, and the six real mood scores coming out.
  The app screens sit lower on the project page.
- Copy stays short everywhere. The hero is two sentences; section leads are one line;
  numbers, logos, and photos carry the rest.
- Social links are logos with labels: four brand tiles on Contact and the home page,
  an icon row in the footer. Backing and recognition use official marks fetched from
  each organisation's own site (`public/logos/recognition/SOURCES.md`); an org
  without an obtainable mark gets a set wordmark, never a redrawn logo.
- Disclosures are native `details` elements. Everything important renders on the
  server and reads without JavaScript; only the theme toggle and copy button need it.

## Content and search

- No visible update timestamps, "company-reported" captions, or metric-definition
  links. Provenance lives in `src/data/assets.ts` and `src/lib/marketing-metrics.ts`.
- GitHub contributions are never called commits. The 100B+ tokens are coding-tool
  usage across Codex and Claude, separate from Dog AI model training. A Y Combinator
  Startup School invitation is an invitation, not accelerator participation.
- Credentials, awards, and scholarships all stay reachable on `/proof`; the strongest
  are surfaced on the home page and the rest sit behind disclosures.
- Travel captions name a place only when the photo's own metadata confirms it.
- Structured data (Person, ProfilePage, credentials) and the Open Graph image describe
  the same facts and use the same portrait as the page.

## Assets and provenance

- `public/hero/scene-poster.webp` is one frame of the site's own hero shader in
  capture mode, rendered at 1920x1080 off the production build (2026-09-15) at the
  twenty fourth second, which is the settled field rather than its intro. It is
  not a photograph and not a generated frame: re-render it from `/?poster=1`
  whenever the shader changes, and take it from `next start`, because `next dev`
  bakes its own overlay into the capture. Next 16 caches the optimised copies
  under `.next/dev/cache/images` in development and `.next/cache/images` in
  production, so clear whichever one is being served or the no-JS path shows the
  retired still. That cache is keyed partly on the request's `Accept` header,
  which means a `curl` without one can come back correct while the browser is
  still handed the old image.
- The still is cover cropped, so on a frame taller than its own 16:9 it is scaled
  to the height and ends up far wider than the viewport, and its `sizes` has to
  say so (`(min-aspect-ratio: 16/9) 100vw, 178vh`). Plain `100vw` picks a variant
  a third of the width the browser then stretches, and the field came back as a
  moire of bands on a phone.
- `public/hero/tekapo-lake.jpg` (Kaya's library, Lake Tekapo, 2025-12-15, 1153x2048
  because it arrived over iMessage) is the social-preview and structured-data
  portrait. World-map pin thumbnails in `public/pins/` come from the same library.
- Studio portrait `public/portraits/kaya.jpg` stays on About.
- MyFutureSelf imagery in `public/products/myfutureself/store/` is the six App Store
  composites from the 2.30 listing (released 2026-09-11), pulled 2026-09-14 at
  1242x2688 and encoded at 900px wide; the icon is the listing's 1024px artwork.
- Dog AI assets in `public/products/dog-ai/`: the four App Store composites for
  1.9.3 in `store/`, the sample scan photo cropped from the first of them, and the
  six scores the app shows on the second.
- Company logos live in `public/logos/`. Kaya is from Cleveland, Ohio; the site says
  so wherever a place is named.
- Never reuse the retired composite `mfs-hero.webp`, the tiny App Store crop of
  Dog AI, or simulator captures of either app; all were rejected.
