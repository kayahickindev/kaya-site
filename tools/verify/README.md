# Viewport checks without the browser extension

Headless Chrome over the DevTools protocol, no dependencies (Node 22+).

```bash
node tools/verify/shot.mjs <url> <out.png> [width] [height] [light|dark] [full 0|1] [scrollTo selector] [wait ms] [reduced-motion 0|1]
node tools/verify/eval.mjs <url> <width> <height> "<expression>" [wait ms]
```

The theme is set through the `theme` key next-themes reads from localStorage,
because the site does not follow the media query. Every shot prints
`scrollWidth x clientWidth`; the two must match at every width. Wait 6 to 8 s
after navigation on a loaded Mac.
