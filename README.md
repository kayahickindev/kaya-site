# kayahickin.com

Kaya Hickin's personal website. Next.js 16, React, Tailwind CSS, and Framer Motion. Deployed through the existing Vercel integration for `kayahickindev/kaya-site`.

## Development

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
```

## Content ownership

- `src/data/profile.ts`: biography, dated GitHub and coding-usage figures, education, awards, scholarships, programs, and travel.
- `src/data/credentials.ts`: exact credential and training names, issuers, dates, and available public links. Private supporting records stay outside this repository.
- `src/data/content.ts`: project summaries, technical stack, timeline, social links, and default SEO copy.
- `src/app/work/_projectDetails.ts`: project ownership, implementation, and outcomes.
- `src/lib/profile-content.ts`: structured identity data and both LLM-readable routes, generated from the same public biography facts.

The Proof page provides metric definitions and dated evidence. GitHub contributions are broader than commits. Coding-tool token usage is self-reported and separate from model-training volume. Program participation, invitations, certifications, and completed courses retain their exact labels.

## Metrics and failure behavior

Live MyFutureSelf metrics are fetched server-side and revalidated hourly. Production requires `FOUNDER_METRICS_ACCESS_TOKEN`. Keep that secret in the existing Vercel project; never commit it.

When the token or upstream feed is unavailable, pages show the recorded public snapshot with its original date. `/api/profile-metrics` returns 503 on fallback. Exact private subscriber and sales values stay server-side; client components and the public endpoint receive only their rounded display strings. Annual run rate means the last completed calendar month's gross sales multiplied by 12.

The GitHub graph displays only actual dated entries from the public activity feed. During loading or failure, it shows the dated verified total and a link to GitHub. No synthetic activity, sparklines, or count-up zeros are generated.

## Publishing

Work in an isolated worktree. Review the diff, run lint, tests, and the production build, then verify responsive rendering and the metadata, JSON-LD, sitemap, Open Graph image, and LLM routes. Use the repository's existing Vercel integration and verify the deployed source commit and custom domain after an authorized publication.
