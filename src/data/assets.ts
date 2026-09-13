// Site imagery with its provenance. Provenance lives here and in DESIGN.md,
// never in the visible interface.

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Hero slideshow: Kaya's own travel photos, exported as originals from his
// library. Tekapo (2025-12-15) and the sailboat (2026-01-31) arrived over
// iMessage at 1153x2048; the rest are camera originals encoded at 1600px.
// `position` is the object-position focal point and `zoom` widens the frame so
// the subject sits centred when it stands off to one side of the original.
export type HeroSlide = {
  src: string;
  alt: string;
  position: string;
  zoom?: number;
};
export const heroSlides: HeroSlide[] = [
  {
    src: "/hero/tekapo.jpg",
    alt: "Kaya Hickin in a black jacket beside a turquoise glacial lake with mountains behind",
    position: "50% 40%",
    zoom: 1.56,
  },
  {
    src: "/hero/pololu.webp",
    alt: "Kaya with arms out on a green cliff above the surf at Pololū Valley",
    position: "50% 46%",
    zoom: 1.4,
  },
  {
    src: "/hero/merzouga.webp",
    alt: "Kaya riding a camel across orange sand dunes near Merzouga",
    position: "50% 40%",
  },
  {
    src: "/hero/sailboat.jpg",
    alt: "Kaya standing on the bow of a sailboat at sunset holding a rope",
    position: "50% 45%",
  },
  {
    src: "/hero/kilauea.webp",
    alt: "Two silhouettes watching the red glow of Kīlauea erupting at night",
    position: "50% 55%",
  },
];
export const heroPortrait = heroSlides[0];

export const studioPortrait = {
  src: "/portraits/kaya.jpg",
  alt: "Studio portrait of Kaya Hickin",
  width: 2048,
  height: 2048,
};

// MyFutureSelf iOS, captured 2026-09-13 from the app's main branch tip
// (commit 4adb2f594, the 2.30 release line, iPhone 17 Pro simulator, iOS 26.5;
// the chat capture is from commit 92566ef9d, 2026-09-12). Encoded from the
// 1206x2622 originals at 900px wide.
const mfsScreen = (name: string, alt: string): Screen => ({
  src: `/products/myfutureself/${name}.webp`,
  alt,
  width: 900,
  height: 1957,
});

export const myFutureSelf = {
  icon: "/products/myfutureself/icon.png",
  home: [
    mfsScreen(
      "call",
      "MyFutureSelf incoming call screen: Future You is calling, with a slide to answer control",
    ),
    mfsScreen(
      "home",
      "MyFutureSelf Home screen with a Work with your future self button, three actions to take today, and a Today's pick video",
    ),
    mfsScreen(
      "streak",
      "MyFutureSelf 63 day streak celebration with the week's completed days checked off",
    ),
  ],
  detail: [
    mfsScreen(
      "chat",
      "MyFutureSelf chat with Future User answering a question about starting a portfolio with concrete first steps",
    ),
    mfsScreen(
      "picks",
      "MyFutureSelf Today's picks feed for Sunday, September 13 with videos, an article, and a meditation",
    ),
    mfsScreen(
      "milestones",
      "MyFutureSelf Milestones grid showing 8 of 34 unlocked",
    ),
    mfsScreen(
      "day-done",
      "MyFutureSelf Home after a completed day: Day 1 done, 4 actions, all yours",
    ),
  ],
};

// Dog AI 1.9.3 (Generation Aaya LLC, App Store id 6746574124), released
// 2026-09-12. There is no local source checkout; these are the four App Store
// screenshots pulled 2026-09-13 at their native 1284x2778, with the real app
// screen cropped out of Apple's device composite (in-app dates read August 2026,
// matching the release). The icon is the listing's 1024px artwork.
const dogScreen = (name: string, alt: string): Screen => ({
  src: `/products/dog-ai/${name}.webp`,
  alt,
  width: 1000,
  height: 2084,
});

export const dogAi = {
  icon: "/products/dog-ai/icon.png",
  // The sample scan from the listing's first screenshot and the six scores the
  // app returned for it on the second, shown as the model's input and output.
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
  home: [
    dogScreen(
      "scan",
      "Dog AI new scan screen with a photo of a golden retriever puppy on grass and a continue button",
    ),
    dogScreen(
      "mood",
      "Dog AI result for Snowy's mood: happy 70, playful 20, tired 10, curious 70, relaxed 80, anxious 0, with a tip for Snowy",
    ),
  ],
  detail: [
    dogScreen(
      "scan",
      "Dog AI new scan screen with a photo of a golden retriever puppy on grass and a continue button",
    ),
    dogScreen(
      "mood",
      "Dog AI result for Snowy's mood with six scored moods and a tip",
    ),
    dogScreen(
      "history",
      "Dog AI history of scans over a three day streak with mood chips per day",
    ),
    dogScreen(
      "coach",
      "Dog AI coach tab with a three day streak and how Snowy has been feeling across the last three scans",
    ),
  ],
};
