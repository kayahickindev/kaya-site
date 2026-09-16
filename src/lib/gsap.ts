"use client";
// One GSAP registration for the whole site. GSAP 3.13+ ships every plugin free
// (Webflow, 2025), so SplitText and ScrollTrigger cost nothing to use.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
