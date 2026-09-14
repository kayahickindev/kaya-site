import { heroVideo } from "@/data/assets";

// The opening visual: a generated cinematic clip of the system as glass and
// light, looping seamlessly under the type. Muted, inline, autoplaying, with a
// still poster for reduced motion and for visitors without JavaScript. The
// `video` element carries no controls; the page copy is HTML on top.
export function HeroVideo() {
  return (
    <div className="hero-video" aria-hidden>
      <video
        className="hero-video-el"
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
    </div>
  );
}
