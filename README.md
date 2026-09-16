# kayahickin.com

Personal founder portfolio site for Kaya Hickin. Built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light toggle)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repository
4. Click **Deploy** — no configuration needed

Or use the Vercel CLI:

```bash
npx vercel
```

## Editing Content

All site copy, links, and metrics are centralized in a single file:

```
src/data/content.ts
```

Live MyFutureSelf traction is loaded server-side from the protected marketing
metrics snapshot and revalidated hourly. Production and preview deployments
require `FOUNDER_METRICS_ACCESS_TOKEN`; if the token is missing, rejected, or
the upstream payload is incomplete, the site marks the snapshot as fallback
and `/api/profile-metrics` fails with `503` instead of silently presenting a
fresh timestamp with stale numbers. The public profile endpoint exposes only
rounded display values for annual run rate and active paid subscribers.

Edit this file to update:
- Hero text and CTAs
- Metrics / proof points
- About section paragraphs
- Project cards (names, descriptions, links, tags)
- Timeline entries
- GitHub section copy
- Interests
- Co-founder section
- Contact links
- Navigation items
- SEO metadata

## Adding a Headshot

1. Add your image to `public/headshot.jpg` (or `.png`, `.webp`)
2. Open `src/components/Hero.tsx`
3. In the headshot placeholder area, replace the `<span>KH</span>` div with:

```tsx
import Image from 'next/image';

<Image
  src="/headshot.jpg"
  alt="Kaya Hickin"
  fill
  className="object-cover"
  priority
/>
```

## Updating Social Links

In `src/data/content.ts`, update the `social` object:

```ts
social: {
  github: "https://github.com/kayahickindev",
  twitter: "https://x.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "mailto:you@domain.com",
  myfutureself: "https://myfutureselfapp.com/",
},
```

Then update the display text in `src/components/Contact.tsx` if needed.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind config + custom styles
│   ├── layout.tsx       # Root layout with fonts, metadata, theme
│   ├── page.tsx         # Page assembly
│   └── providers.tsx    # Theme provider
├── components/
│   ├── Header.tsx       # Fixed nav with theme toggle
│   ├── Hero.tsx         # Hero section with headshot placeholder
│   ├── Metrics.tsx      # Animated proof point counters
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Project cards grid
│   ├── Timeline.tsx     # Experience timeline
│   ├── GitHub.tsx       # Live contribution graph + stats
│   ├── Interests.tsx    # Interest tags
│   ├── CoFounder.tsx    # Co-founder CTA section
│   ├── Contact.tsx      # Contact links
│   └── Footer.tsx       # Footer
├── data/
│   └── content.ts       # All site content (edit this)
└── lib/
    ├── animations.tsx   # Reusable animation components
    └── hooks.ts         # Custom hooks (counter, scroll)
```
