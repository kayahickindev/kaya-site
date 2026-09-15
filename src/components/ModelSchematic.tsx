import Image from "next/image";
import { dogAi } from "@/data/assets";

// What having the model means: a photo goes in, six mood scores come out.
// The photo and the scores are the real sample from the product.
export function ModelSchematic() {
  const { sample } = dogAi;
  return (
    <figure className="model" aria-label="How the Dog AI model works">
      <div className="model-in">
        <Image
          src={sample.src}
          alt={sample.alt}
          width={sample.width}
          height={sample.height}
          sizes="(max-width: 760px) 60vw, 200px"
        />
        <span className="model-tag">Input</span>
      </div>
      <span className="model-arrow" aria-hidden />
      <div className="model-core">
        <span className="model-layers" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <strong>Custom multimodal model</strong>
        <span>Trained on a dog dataset I assembled</span>
      </div>
      <span className="model-arrow" aria-hidden />
      <ol className="model-out" aria-label="Mood scores">
        {sample.scores.map((s) => (
          <li key={s.mood}>
            <span>{s.mood}</span>
            <i style={{ width: `${Math.max(s.score, 2)}%` }} aria-hidden />
            <b>{s.score}</b>
          </li>
        ))}
      </ol>
      <figcaption>One photo in. Six mood scores out.</figcaption>
    </figure>
  );
}
