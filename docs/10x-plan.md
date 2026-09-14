# kayahickin.com: the 10x plan

Written 2026-09-14 after seven rounds on PR #7 (`kaya/visual-redesign-v2-20260913`).
Kaya's verdicts so far, in order: the serif and old imagery were wrong; too much
text; navigation confusing; the page felt "all over the place"; the hero photos
were not the point; the canvas diagram was clever but not impressive; the first
generated clip (etched lattice) was "unimpressive and low quality"; the simulator
screenshots look "blank" and "horrible". He wants: the best quality video possible,
showing the development of a technology and AI utopia on Earth; the real App Store
images; and a site that gets a visitor to value in seconds.

This document is the brief for the next session. Execute top to bottom.

## 1. Hero: a cinematic clip of a technology and AI utopia on Earth

The opening frame has to look like a $30k film still, then move. What "best
possible" means with the tools we have:

- Two-stage generation. First a still: `gpt-image-1`, 1536x1024, quality high,
  three to four takes from a detailed brief (golden hour, terraced green towers in a
  river valley, thin transit lines, quiet construction drones raising a new tower,
  solar canopies, people on promenades, 65mm, volumetric light, hopeful, no text).
  Pick the best still by eye. Then animate it with `sora-2-pro` using that still as
  `input_reference` (multipart upload), 12 seconds, 1792x1024 landscape plus a
  1024x1792 portrait take for phones. Motion brief: slow aerial push-in, drones
  drift, leaves and water move, light shifts, nothing else changes. Anchoring to a
  reference is what keeps Sora from drifting into mush; the lattice clip drifted
  because it had no anchor.
- Three video takes per orientation, keep the best. Reject anything with blown
  highlights, morphing geometry, or a camera that stops.
- Loop as a forward-and-reverse palindrome (never cuts), `libx264` CRF 18, preset
  slow, `+faststart`. Target under 9 MB for the landscape loop. Two `<video>`
  elements, landscape and portrait, toggled by a media query, with poster frames.
- Make it read as intentional film, not AI: a fine grain overlay (CSS
  `mix-blend-mode` noise at 4 to 6 percent), a gentle vignette, the existing bottom
  scrim, and a poster-to-video crossfade so the first paint is sharp.
- The type stays HTML: two-line name, one sentence, three proof numbers, one
  button. Nothing else on the frame.
- Pipeline lives in `scratchpad/video/` this session (`oa.py`, `img.py`,
  `finish.sh`); move the scripts into `tools/hero-video/` in the repo so the next
  session can rerun them. The key comes from Secret Manager through the
  `codex-mfs-automation` service account (the `operations@` login is stale); it
  never prints.
- Cost: roughly $0.25 per still and $6 per 12 s pro clip. Budget $40 for the round.

## 2. Product imagery: the App Store composites, at size

- MyFutureSelf: the listing for 2.30 (released 2026-09-11) has six composites with
  headlines: Become Your Best Self, Design Who You'll Become, Goals That Fit You,
  Talk to Your Future Self, Track Progress & Grow, Neuroscience & Psychology. They
  are downloaded at 1242x2688 and staged at `public/products/myfutureself/store/`.
  Use them as the product chapter: a wide, edge-to-edge horizontal gallery of all
  six at large size (about 360 px wide each on desktop, snap-scrolling on phones),
  with the metrics beneath. Retire `public/products/myfutureself/*.webp` simulator
  captures and the VoiceCall trio.
- Dog AI: the four 1.9.3 composites are staged at `public/products/dog-ai/store/`.
  Keep the model schematic as the chapter visual (his ask: show the model, not the
  app) but lay the four composites into the project page, and consider one
  composite beside the schematic on the home chapter.
- Record provenance in `src/data/assets.ts` (listing version, date, URL pattern).

## 3. Composition of the home page

Six chapters, each one visual and one line, in this order: Hero (video), Product
(App Store gallery + metrics), Builder (isometric stack), Model (Dog AI schematic),
World (map with pins), Backing (logo wall), Contact (email + logo tiles). Keep the
floating pill nav. Every chapter starts its heading on the same left edge and the
same vertical rhythm (`.scene` padding), and each has exactly one call to action.
Kill anything that is a list of small things.

## 4. Craft pass

- Motion: reveal blocks already gate on scripting with a 2.4 s fallback. Add a
  single easing curve everywhere and make every duration a multiple of 150 ms.
- Type: `h-scene` at one size per breakpoint, proof numbers in tabular figures,
  no orphans (`text-wrap: balance` is on headings; check leads).
- Dark and light: the hero is always dark; below it both schemes must be checked at
  360, 390, 430, 834, 1024 and 1440 with intentional screenshots (same-origin
  harness at `public/__harness.html`, git-excluded).
- Performance: video `preload="metadata"`, posters, `sizes` on every image,
  Lighthouse on the Vercel preview above 90 for performance and 100 for
  accessibility and SEO.

## 5. Facts, SEO, AEO (unchanged, keep intact)

Contributions are not commits; 100B+ tokens are coding-tool usage; the Dog AI model
is a separate achievement; YC Startup School is an invitation; Cleveland is home;
no visible timestamps or "company-reported" captions. JSON-LD, sitemap, llms.txt
and Open Graph stay aligned with the page; the OG image keeps the lake portrait.

## 6. Open items for Kaya

- Series Build: no public logo exists; send the program URL or a logo file.
- The lake portrait's camera original is with the friend who shot it (the
  iMessage copy is 1153x2048); it only matters for the social preview now.
- Confirm the six App Store composites are the set you want on the site (they show
  the Future Giancarlo avatar and Day 61 fixtures from the listing).

## 7. Attack order for the next session

1. Reconnect the Chrome extension (sign in, then `/chrome` Reconnect) so every
   change is screenshotted.
2. Generate stills, pick, animate, pick, loop, encode, install (section 1).
3. Swap the product chapter to the App Store gallery (section 2).
4. Craft pass with the harness at every width in both schemes (section 4).
5. Lint, tests, build, commit in slices (assets, code, docs), push, preview link.
