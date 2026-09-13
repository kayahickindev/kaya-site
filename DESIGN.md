# Kaya Hickin personal website

## Direction

A photographic, product-led editorial site. The opening screen is Kaya himself, a
travel portrait beside a glacial lake, next to his name and role set in large Geist
Sans. The page then moves through the products at real size, the engineering behind
them, recognition, travel, and contact. Full-bleed bands carry the rhythm; there are
no card grids, dashboards, or decorative effects. Photography and real product
screens do the storytelling.

## Typography

- Geist Sans only, loaded through `next/font/google`. No serif, no italic display.
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
- Hero: desktop is a split grid, name and intro left, the photo bleeding to the right
  edge. The photo slot is a slow crossfade through five travel photos (Lake Tekapo,
  Pololū, Merzouga, a sailboat at sunset, Kīlauea), seven seconds each with a gentle
  settle, pure CSS and off under `prefers-reduced-motion` (only the first photo
  shows). Each slide carries its own focal point and an optional zoom so the subject
  sits centred. Phones show the photos first at 4:5 with the name over the bottom
  edge, so the face stays clear; role and calls to action follow on paper.
- Product screens are real captures with rounded corners and a soft shadow, three up
  on desktop, a snap-scrolling strip on phones. No fabricated device frames or UI.
- Dog AI is shown as its model, not its app: a schematic with the real sample photo
  going in, a custom multimodal model block, and the six real mood scores coming out.
  The app screens sit lower on the project page.
- Copy stays short everywhere. The hero is two sentences; section leads are one line;
  numbers, logos, and photos carry the rest.
- Social links are logos with labels: four brand tiles on Contact and the home page,
  an icon row in the footer.
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

- Hero slides in `public/hero/`: Kaya's own library. Tekapo (2025-12-15) and the
  sailboat (2026-01-31) arrived over iMessage at 1153x2048; Pololū, Merzouga, and
  Kīlauea are camera originals exported from Photos and encoded at 1600px.
- Studio portrait `public/portraits/kaya.jpg` stays on About.
- MyFutureSelf screens in `public/products/myfutureself/` are simulator captures from
  the iOS main branch tip on 2026-09-13 (commit 4adb2f594, the 2.30 release line;
  chat from 92566ef9d, 2026-09-12), encoded from 1206x2622 at 900px wide. The icon is
  the app's 1024px AppIcon.
- Dog AI assets in `public/products/dog-ai/`: the four App Store screens for 1.9.3
  (real UI cropped from Apple's composite), the sample scan photo cropped from the
  first of them, and the six scores the app returned on the second.
- Company logos live in `public/logos/`. Kaya is from Cleveland, Ohio; the site says
  so wherever a place is named.
- Never reuse the retired composite `mfs-hero.webp` or the tiny App Store crop of
  Dog AI; both were rejected as outdated.
