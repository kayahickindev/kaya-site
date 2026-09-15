# Kaya Hickin personal website

## Direction

One scrolling story, six chapters, one purpose-built visual per point. The hero
is a live WebGL scene of a technology and AI utopia on Earth, a river-valley city
at golden hour that builds itself out of a survey grid while cranes and drones
raise the towers, running under his name, one line, and three technical proof
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
  first and then hands over to a React Three Fiber scene in `src/components/hero/`:
  a river valley at golden hour, built as light and data rather than as a model.
  A procedural terrain carries a teal survey grid, elevation contours and a street
  plan under the city; the river fills the carved valley floor exactly to its two
  banks and reflects the same sky the dome paints; about 180 instanced towers on
  four silhouettes stand in dark glass with procedural window strips, teal corner
  lines and a low sun caught as a hard highlight; three towers are still going up
  under a crane, drones fly circuits with trails, a monorail runs the bank, and
  every few seconds a tower completes and sends a ring of light across the ground.
  Every surface asks one shader function for the sky, so the haze is the sky seen
  through the air in front of it and the distance melts into the horizon.
- Hero motion: one GSAP timeline, about 3.6 s. The terrain rises out of a flat
  blueprint grid, the survey points gather in from a shell, the towers grow from
  the ground staggered by rank of distance from the centre, and the sun brightens.
  The type has its own timeline so it never waits for the renderer: SplitText
  brings the name up 0.6 s in, then the line, the proof row and the button, and a
  CSS fallback shows all of it at 2.1 s if hydration never happens. Idle is a slow
  orbit with a breathing dolly; the pointer adds a damped few degrees of yaw and
  pitch on pointer devices only. On scroll the camera cranes up and back, the haze
  thickens, the canvas fades over the last 40 percent and the type leaves at
  different depths, spread so no line ever runs into the one beneath it.
- Hero engineering: the scene is one `next/dynamic` chunk with `ssr: false`, only
  requested after the load event and an idle slot, so nothing about it is on the
  critical path (about 246 KB gzipped, plus 23 KB for the desktop composer).
  Instanced geometry throughout, DPR capped at 2 on desktop and 1.5 on phones,
  60 percent of the instances and no postprocessing on phones, and the render loop
  stops when the tab is hidden or the hero has scrolled away. Bloom, a vignette and
  the film grain are postprocessing passes on desktop, so there is no CSS grain
  layer. Reduced motion, no WebGL and no JavaScript all keep the still, which is a
  frame of the same scene. `?poster=1` renders that frame, `?t=<seconds>` holds any
  moment for a deterministic capture and `?perf=1` publishes frame times on
  `window.__heroPerf`. `tools/hero-video/` is the retired clip pipeline.
- Chapter visuals reveal on scroll with a tiny IntersectionObserver; the pre-reveal
  state only exists when scripting is enabled and a 2.1s CSS fallback shows the block
  regardless, so nothing depends on hydration. Text never fades: the beam nodes and
  the counted numbers are at full ink from the first frame, so an accessibility audit
  mid-reveal still reads AA.
- Lighthouse on the production build (2026-09-14): desktop 100 / 100 / 100 for
  performance, accessibility and SEO; mobile 100 for accessibility and SEO with
  performance 95 under the default simulation and 99 under request-level
  throttling. The home document is 21 KB gzipped and the name is the largest paint
  (Chrome excludes a full-viewport image as a background). What remains is the
  framework's own JavaScript sharing the throttled connection with the stylesheet
  and font on a local HTTP/1.1 server, which HTTP/2 on Vercel prioritises away, so
  PageSpeed Insights on the deployed URL is the number to trust.
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

- `public/hero/scene-poster.webp` is rendered from the site's own hero scene in
  capture mode at 1920x1080 (2026-09-14). It is not a photograph and not a
  generated frame: re-render it from `/?poster=1` whenever the scene changes.
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
