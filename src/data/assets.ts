// Site imagery with its provenance. Provenance lives here and in DESIGN.md,
// never in the visible interface.

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroPortrait = {
  src: "/portraits/kaya-lake.jpg",
  alt: "Kaya Hickin in a black jacket standing in tall grass and purple lupins beside a turquoise glacial lake with mountains behind",
  // Personal photo, Kaya's own library. Also the Instagram post in the top-right
  // of the profile grid. Location is captioned only where the photo's own
  // metadata confirms it.
  place: "",
};

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

// Travel photography from Kaya's own library, exported as unmodified originals
// from Photos (Lake Tekapo 2025-12-15, Merzouga 2024-11-29, Kīlauea 2025-02-27,
// Munich 2024-10-05) and encoded at 1400px wide. Every caption below is backed by
// the photo's own GPS.
export type TravelPhoto = Screen & { place?: string };
export const travel: TravelPhoto[] = [
  {
    src: "/travel/tekapo-lupins.webp",
    alt: "A field of purple and pink lupins under a cloudy sky at Lake Tekapo, New Zealand",
    width: 1400,
    height: 1867,
    place: "Lake Tekapo, New Zealand",
  },
  {
    src: "/travel/merzouga.webp",
    alt: "Kaya riding a camel across orange sand dunes near Merzouga, Morocco",
    width: 1400,
    height: 1867,
    place: "Merzouga, Morocco",
  },
  {
    src: "/travel/kilauea.webp",
    alt: "Two silhouettes watching the red glow of Kīlauea erupting at night",
    width: 1400,
    height: 1867,
    place: "Kīlauea, Hawaii",
  },
  {
    src: "/travel/munich.webp",
    alt: "A group of friends in lederhosen at a beer hall in Munich",
    width: 1400,
    height: 1867,
    place: "Munich, Germany",
  },
];
