// Site imagery with its provenance. Provenance lives here and in DESIGN.md,
// never in the visible interface.

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// The lake portrait stays as the social-preview and structured-data image.
// Kaya's own library, Lake Tekapo, New Zealand, 2025-12-15; 1153x2048 is the
// best copy anywhere (it arrived over iMessage).
export const heroPortrait = {
  src: "/hero/tekapo-lake.jpg",
  alt: "Kaya Hickin in a black jacket beside a turquoise glacial lake with mountains behind",
};

// Hero still: one frame rendered from the site's own WebGL scene in capture
// mode (?poster=1), 2026-09-14, at 1920x1080. It is what no-JS,
// reduced-motion and still-loading visitors see, so it has to be the settled
// state of the valley.
export const heroPoster = {
  src: "/hero/scene-poster.webp",
};

export const studioPortrait = {
  src: "/portraits/kaya.jpg",
  alt: "Studio portrait of Kaya Hickin",
  width: 2048,
  height: 2048,
};

// MyFutureSelf on the App Store: the six iPhone composites from the listing
// for 2.30 (Success AI LLC, app id 6745573360, released 2026-09-11), pulled
// 2026-09-14 from the listing's screenshot URLs at 1242x2688 and encoded at
// 900px wide. They carry the listing's own headlines and fixtures (Future
// Giancarlo, Day 61). The icon is the listing's 1024px artwork.
const mfsStore = (n: number, alt: string): Screen => ({
  src: `/products/myfutureself/store/${n}.webp`,
  alt,
  width: 900,
  height: 1948,
});

export const myFutureSelf = {
  icon: "/products/myfutureself/icon.png",
  store: [
    mfsStore(
      1,
      "Become Your Best Self: the MyFutureSelf welcome screen, a clear system to become a better version of yourself in as little as 90 days, rated 4.7 on the App Store",
    ),
    mfsStore(
      2,
      "Design Who You'll Become: your Future Self as an avatar, with an alignment score and your story",
    ),
    mfsStore(
      3,
      "Goals That Fit You: Day 61 with today's actions, from making your bed to deep work and eight hours of sleep",
    ),
    mfsStore(
      4,
      "Talk to Your Future Self: a chat with Future Giancarlo, ask me anything about today",
    ),
    mfsStore(
      5,
      "Track Progress & Grow: how was today, a mood check, the prompt of the day and one thing you're grateful for",
    ),
    mfsStore(
      6,
      "Neuroscience & Psychology: the For You screen with a message from your Future Self and a meditation, a video and an article",
    ),
  ],
};

// Dog AI 1.9.3 (Generation Aaya LLC, App Store id 6746574124), released
// 2026-09-12. There is no local source checkout; these are the listing's four
// iPhone composites, pulled 2026-09-13 at their native 1284x2778 and encoded at
// 900px wide. The sample scan photo is cropped from the first of them and the
// six scores are the ones the app shows on the second. The icon is the
// listing's 1024px artwork.
const dogStore = (n: number, alt: string): Screen => ({
  src: `/products/dog-ai/store/${n}.webp`,
  alt,
  width: 900,
  height: 1948,
});

export const dogAi = {
  icon: "/products/dog-ai/icon.png",
  // The sample scan and the six scores, shown as the model's input and output.
  sample: {
    src: "/products/dog-ai/sample-dog.webp",
    alt: "A golden retriever puppy standing on grass, the photo Dog AI scored",
    width: 720,
    height: 1264,
    scores: [
      { mood: "relaxed", score: 80 },
      { mood: "happy", score: 70 },
      { mood: "curious", score: 70 },
      { mood: "playful", score: 20 },
      { mood: "tired", score: 10 },
      { mood: "anxious", score: 0 },
    ],
  },
  store: [
    dogStore(
      1,
      "See their mood instantly: a new scan of a golden retriever puppy on grass",
    ),
    dogStore(
      2,
      "Happy? Curious? Anxious?: Snowy's mood scored happy 70, playful 20, tired 10, curious 70, relaxed 80, anxious 0, with a tip",
    ),
    dogStore(
      3,
      "Feel closer in seconds: a three day streak of scans, each with its mood chips",
    ),
    dogStore(
      4,
      "Understand them better: the coach tab with how Snowy has been feeling across the last three scans",
    ),
  ],
};
