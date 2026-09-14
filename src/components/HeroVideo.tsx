"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/data/assets";

// The opening visual: a generated cinematic clip of a technology and AI utopia
// on Earth, looping seamlessly under the type. The poster is a responsive,
// preloaded image painted first; the clip only starts loading once the page
// has loaded, so it never competes with the type and the fonts, and it fades in
// once it is really playing. Reduced motion, no-JS and a blocked autoplay all
// keep the poster. A faint grain layer sits on top so the clip reads as film.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const start = () => setSrc(heroVideo.mp4);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const on = () => setPlaying(true);
    if (!v.paused && v.readyState >= 3) on();
    v.addEventListener("playing", on);
    return () => v.removeEventListener("playing", on);
  }, [src]);
  return (
    <div className="hero-video" aria-hidden>
      <Image
        className="hero-poster"
        src={heroVideo.poster}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={75}
      />
      <video
        ref={ref}
        className={playing ? "hero-video-el playing" : "hero-video-el"}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      />
      <span className="hero-grain" />
    </div>
  );
}
