// Product imagery with its provenance. Provenance lives here, in source, and
// never in the visible interface.
//
// Every image below is a finished App Store composite taken from the live
// listing: the headline, the subtitle and the device frame are Apple's and the
// company's own artwork, not something assembled here. Nothing is stretched,
// recropped or re-framed, so each one is rendered at its true 900x1948 aspect.

export type StoreShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const STORE_WIDTH = 900;
const STORE_HEIGHT = 1948;

// MyFutureSelf on the App Store: the six iPhone composites from the listing for
// 2.30 (Success AI LLC, app id 6745573360, released 2026-09-11), pulled
// 2026-09-14 from the listing's screenshot URLs at 1242x2688 and encoded at
// 900px wide. They carry the listing's own headlines and fixtures (Future
// Giancarlo, Day 61). The icon is the listing's 1024px artwork at 256px.
//
// These replace public/mfs-hero.webp, a three-phone render of the app as it
// looked before 2.30. Kaya rejected those screens: the app no longer looks
// anything like them.
const mfsShot = (n: number, alt: string): StoreShot => ({
  src: `/products/myfutureself/store/${n}.webp`,
  alt,
  width: STORE_WIDTH,
  height: STORE_HEIGHT,
});

export const myFutureSelf = {
  icon: "/products/myfutureself/icon.png",
  iconAlt: "MyFutureSelf app icon",
  store: [
    mfsShot(
      1,
      "Become Your Best Self: the MyFutureSelf welcome screen, a clear system to become a better version of yourself in as little as 90 days, rated 4.7 on the App Store",
    ),
    mfsShot(
      2,
      "Design Who You'll Become: your Future Self as an avatar, with an alignment score and your story",
    ),
    mfsShot(
      3,
      "Goals That Fit You: Day 61 with today's actions, from making your bed to deep work and eight hours of sleep",
    ),
    mfsShot(
      4,
      "Talk to Your Future Self: a chat with Future Giancarlo, ask me anything about today",
    ),
    mfsShot(
      5,
      "Track Progress & Grow: how was today, a mood check, the prompt of the day and one thing you're grateful for",
    ),
    mfsShot(
      6,
      "Neuroscience & Psychology: the For You screen with a message from your Future Self and a meditation, a video and an article",
    ),
  ],
};

// Dog AI 1.9.3 (Generation Aaya LLC, App Store id 6746574124), released
// 2026-09-12. There is no local source checkout; these are the listing's four
// iPhone composites, pulled 2026-09-13 at their native 1284x2778 and encoded at
// 900px wide. The icon is the listing's 1024px artwork at 256px.
const dogShot = (n: number, alt: string): StoreShot => ({
  src: `/products/dog-ai/store/${n}.webp`,
  alt,
  width: STORE_WIDTH,
  height: STORE_HEIGHT,
});

export const dogAi = {
  icon: "/products/dog-ai/icon.png",
  iconAlt: "Dog AI app icon",
  store: [
    dogShot(
      1,
      "See their mood instantly: a new scan of a golden retriever puppy on grass",
    ),
    dogShot(
      2,
      "Happy? Curious? Anxious?: Snowy's mood scored happy 70, playful 20, tired 10, curious 70, relaxed 80, anxious 0, with a tip",
    ),
    dogShot(
      3,
      "Feel closer in seconds: a three day streak of scans, each with its mood chips",
    ),
    dogShot(
      4,
      "Understand them better: the coach tab with how Snowy has been feeling across the last three scans",
    ),
  ],
};
