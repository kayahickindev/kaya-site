// One mutable record for the whole hero scene. The GSAP timelines, the pointer
// and the ScrollTrigger all write here and every frame reads it, so nothing in
// the scene re-renders React to move. A hero is a singleton on the page, so a
// module record costs less than a context that would rerender its subtree.
export type HeroState = {
  /** Scene clock in seconds. Held still by the capture modes. */
  time: number;
  /** Terrain rise, 0 flat to 1 full relief. */
  amp: number;
  /** Point gather, 1 scattered on a sphere to 0 settled on the ground. */
  scatter: number;
  /** Tower growth, staggered per instance by distance from the centre. */
  grow: number;
  /** Sun, window and drone brightness during the intro. */
  ignition: number;
  /** Hero scroll progress, 0 at the top to 1 once the hero has left. */
  scroll: number;
  /** Damped pointer in clip space, -1 to 1. Stays at zero on touch. */
  pointerX: number;
  pointerY: number;
  targetX: number;
  targetY: number;
  /** True while a capture mode holds one deterministic frame. */
  frozen: boolean;
  /** Completion ripples on the ground: x, z, start time, three slots. */
  ripples: Float32Array;
};

export const hero: HeroState = {
  time: 0,
  amp: 0,
  scatter: 1,
  grow: 0,
  ignition: 0,
  scroll: 0,
  pointerX: 0,
  pointerY: 0,
  targetX: 0,
  targetY: 0,
  frozen: false,
  ripples: new Float32Array(9).fill(-999),
};

export function resetHero() {
  hero.time = 0;
  hero.amp = 0;
  hero.scatter = 1;
  hero.grow = 0;
  hero.ignition = 0;
  hero.scroll = 0;
  hero.pointerX = 0;
  hero.pointerY = 0;
  hero.targetX = 0;
  hero.targetY = 0;
  hero.frozen = false;
  hero.ripples.fill(-999);
}
