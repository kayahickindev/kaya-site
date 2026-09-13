import Image from "next/image";
import { myFutureSelf } from "@/data/assets";

// The voice mentor, shown as the real incoming-call screen with a live pulse:
// rings breathing out from the phone and a small waveform underneath.
export function VoiceCall() {
  const [call, home, streak] = myFutureSelf.home;
  return (
    <div className="voice" aria-label="MyFutureSelf screens">
      <span className="voice-rings" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      <figure className="screen voice-side voice-left">
        <Image src={home.src} alt={home.alt} width={home.width} height={home.height} sizes="(max-width: 760px) 40vw, 220px" />
      </figure>
      <figure className="screen voice-phone">
        <Image src={call.src} alt={call.alt} width={call.width} height={call.height} sizes="(max-width: 760px) 62vw, 300px" preload />
      </figure>
      <figure className="screen voice-side voice-right">
        <Image src={streak.src} alt={streak.alt} width={streak.width} height={streak.height} sizes="(max-width: 760px) 40vw, 220px" />
      </figure>
      <span className="voice-bars" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <i key={i} style={{ animationDelay: `${(i % 5) * 0.12}s` }} />
        ))}
      </span>
    </div>
  );
}
