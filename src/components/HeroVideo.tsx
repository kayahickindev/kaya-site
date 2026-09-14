"use client";
import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/data/assets";

// The opening visual: a generated cinematic clip of a technology and AI utopia
// on Earth, looping seamlessly under the type. Muted, inline, autoplaying. The
// poster frame is painted underneath and the video fades in once it is really
// playing, so the first paint is sharp and a blocked autoplay still shows the
// still. Reduced motion and no-JS visitors keep the poster. A faint grain layer
// sits on top so the clip reads as film rather than render.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const on = () => setPlaying(true);
    if (!v.paused && v.readyState >= 3) on();
    v.addEventListener("playing", on);
    return () => v.removeEventListener("playing", on);
  }, []);
  return (
    <div className="hero-video" aria-hidden>
      <video
        ref={ref}
        className={playing ? "hero-video-el playing" : "hero-video-el"}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroVideo.poster}
        disablePictureInPicture
      >
        <source src={heroVideo.mp4} type="video/mp4" />
      </video>
      <span className="hero-grain" />
    </div>
  );
}
