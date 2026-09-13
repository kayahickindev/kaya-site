# Recognition logo sources

Marks for the "backed, awarded, invited" row. Every file below was downloaded from the
organisation's own domain (or, for Y Combinator, extracted verbatim from the mark that
ycombinator.com serves in its own site header). Nothing here was redrawn, recoloured or
traced. No third-party logo aggregator was used as a source.

Collected 2026-09-13.

---

## cintrifuse.svg

- **Source:** https://cintrifusecapital.com/wp-content/uploads/2024/03/logo-cintrifusecapital.svg
- **Date retrieved:** 2026-09-13
- **Format:** SVG, `viewBox="0 0 150 38"`
- **Colour:** full colour. Green square brandmark (`#0E9B6D`), navy wordmark (`#00293B`)
- **Background:** transparent
- **Content:** the "c" brandmark tile plus the `cintrifuse CAPITAL` wordmark (the full
  horizontal lockup used in the cintrifusecapital.com site header).
- **Notes:** taken as-is, no conversion. The wordmark is navy, so it needs a light
  background. A symbol-only variant (green tile alone, `viewBox="0 0 137 137"`) is at
  https://cintrifusecapital.com/wp-content/uploads/2024/04/logo-cintrifusecapital-symbol.svg
  if a square tile suits the row better. Cintrifuse's parent org (cintrifuse.com) publishes
  a separate mark at https://cintrifuse.com/wp-content/uploads/2022/01/Cintrifuse-logo.svg -
  that is the *Cintrifuse* mark, not *Cintrifuse Capital*, so it was not used.

---

## miami-university.png  (use this one)

- **Source:** https://miamioh.edu/miami-brand/_files/images/system/identity/logo-horizontal.png
- **Date retrieved:** 2026-09-13
- **Format:** PNG, original 1314 x 134, downscaled with `sips --resampleWidth 512` to
  **512 x 52** (the original exceeded the 1024px threshold)
- **Colour:** full colour. Miami red beveled M (`#C41230`) with black outline, black
  `MIAMI UNIVERSITY` wordmark
- **Background:** transparent (alpha channel present)
- **Content:** the official primary *horizontal* logo (beveled M + single-line wordmark),
  the variant Miami's own Identity System page uses to illustrate the horizontal lockup.
- **Notes:** this is the black-text version, so it reads correctly on a light background.

## miami-university.svg  (knockout variant, dark backgrounds only)

- **Source:** https://miamioh.edu/_hannonhill/_files/svgs/logo-2021.svg
- **Date retrieved:** 2026-09-13
- **Format:** SVG, `viewBox="0 0 241.2 57"`, id `Horizontal_Stacked`
- **Colour:** red beveled M (`#C41230`) with near-black bevel (`#231F20`) and a
  **white** (`#FFFFFF`) `MIAMI UNIVERSITY` wordmark
- **Background:** transparent
- **Notes:** this is the official vector logo Miami serves in the miamioh.edu site header,
  but it is the *knockout* lockup: the wordmark is white, so on a light background only
  the red M is visible. Kept because it is the only official SVG Miami publishes openly,
  but **prefer `miami-university.png` for a light-mode row.** Miami does not offer an
  open-download SVG of the black-text lockup; its brand pages
  (https://miamioh.edu/miami-brand/system/identity-system.html) show the logos as images
  and route file requests to trademarks@miamioh.edu.
- **Other official raster variants seen on miamioh.edu, if a larger PNG is wanted:**
  - https://miamioh.edu/_files/images/logos/miami-university-logo-black-text.png (1618 x 615, stacked lockup, black text, transparent)
  - https://miamioh.edu/_hannonhill/_files/images/logos/primary-alternate-logos/alt-logo-oxford-black-long.png (2984 x 398, transparent)

### Local fallback file (inspected, not used)

`/Users/kayahickin/Pictures/MiamiLogo.jpg` is **252 x 197**, JPEG, no alpha, opaque white
background. It is a crop of a larger lockup: the beveled M sits left of a stray vertical
divider rule that was cut off mid-lockup. Lower resolution, no transparency, and not a
clean standalone mark, so the official downloads above were used instead.

---

## founders-inc.png

- **Source:** https://framerusercontent.com/images/UqgL7Ag5wy70fUCCDcQROc3K3Q.png
  (the `apple-touch-icon` declared in the `<head>` of https://f.inc/)
- **Date retrieved:** 2026-09-13
- **Format:** PNG, 180 x 180 (native size; no downscale needed)
- **Colour:** two-tone. White geometric mark on a near-black (`#161616`) field
- **Background:** **opaque** (no alpha), so it renders as a dark square tile
- **Content:** the Founders Inc angular "F" brandmark. Corroborated against f.inc's own
  Open Graph image (https://framerusercontent.com/assets/JDg9ISAgUDaKUhbcZFlNIdpGbs.png),
  which shows the identical mark painted on the wall of their campus.
- **Notes / limitation:** f.inc is a Framer site whose header logo is **plain text**
  ("Founders, Inc."), not an image, and the site publishes no press or brand-kit page. The
  favicon set is therefore the only graphic mark Founders Inc serves, which is why the
  last-resort favicon route was taken. 180 x 180 is the native resolution. Framer's CDN
  returns the same 180px file for every `?width=` / `?scale-down-to=` rendition, so no
  larger official version exists at this URL.
- **Transparent alternative (smaller):** https://framerusercontent.com/images/SbwCYoeW0eaAS7EpbEw2IbMZbM8.png
  is 64 x 64, black mark on a **transparent** background (the light-scheme favicon), and
  https://framerusercontent.com/images/SiOafzekZKbdmj1XMqtqhvvV8E.png is the 64 x 64
  white-on-transparent dark-scheme twin. Use one of these if the row needs a transparent
  mark and 64px is enough; use the shipped 180px tile if resolution matters more.

---

## y-combinator.svg

- **Source:** https://www.ycombinator.com/ ; the mark is served inline in the site header
  as a `data:image/svg+xml` URI on the `<a title="Y Combinator">` logo link. The SVG was
  URL-decoded out of that data URI byte-for-byte; no redraw, no recolour.
- **Date retrieved:** 2026-09-13
- **Format:** SVG, `viewBox="0 0 48 48"`
- **Colour:** full colour. The YC orange square (`#FF6600`) with a white `Y`
- **Background:** the orange square is the mark itself and fills the whole viewBox; there
  is no transparent padding (same as YC's own rendering).
- **Notes:** https://www.ycombinator.com/press carries no downloadable brand assets. It
  renders the logo inline and directs asset requests to press@ycombinator.com, so the
  header mark is the canonical file YC actually serves. An official raster equivalent is
  https://www.ycombinator.com/apple-touch-icon.png (60 x 60, PNG, with alpha), but the SVG
  is preferred.

---

## series-build (NOT OBTAINED)

**No official Series Build mark could be obtained.** Nothing was substituted.

What was checked on 2026-09-13:

- **https://www.seriesbuild.com/** resolves and is titled "SERIES BUILD", but it is a
  **different organisation**: an Australian recruitment and talent-strategy firm founded by
  Tova Angsuwat (ex-Google), whose site references Startmate, AirTree Ventures and
  "Australia's most trusted brands". It runs no NYC cohort or founders programme. Its own
  header image is literally a Squarespace-hosted screenshot file
  (`Screenshot+2023-05-16+at+3.48.56+pm.png`), not a logo asset. Not used.
- `series.build`, `seriesbuild.co`, `series-build.com`, `theseriesbuild.com` all fail to
  resolve. `buildseries.com` redirects to Yahoo's "BUILD Series" entertainment interview
  show (unrelated). `joinseries.com` resolves but is unrelated.
- Web searches for a Series Build NYC inaugural cohort returned only unrelated NYC
  programmes (NYCEDC Founder Fellowship, Techstars NYC, The Builder Series networking
  community at thebuilderseries.co).

To fill this slot, the exact URL of the Series Build programme page (or an emailed brand
asset from the organisers) is needed.
