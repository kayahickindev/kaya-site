import Image from "next/image";
import { CompanyMark } from "./CompanyMark";
import { ArrowUpRight } from "lucide-react";
export function ProjectVisual({
  slug,
  eager = false,
}: {
  slug: string;
  eager?: boolean;
}) {
  if (slug === "myfutureself")
    return (
      <div className="project-visual visual-mfs">
        <span className="visual-label">
          <CompanyMark company="MyFutureSelf" size={28} /> MyFutureSelf
        </span>
        <Image
          src="/mfs-hero.webp"
          width={781}
          height={1250}
          alt="MyFutureSelf app showing its future-self mentor and personalized roadmap"
          className="mfs-screens"
          sizes="(max-width: 700px) 90vw, (max-width: 1600px) 45vw, 650px"
          preload={eager}
        />
      </div>
    );
  if (slug === "dog-ai")
    return (
      <div className="project-visual visual-dog">
        <span className="visual-label">
          <Image
            src="/projects/dog-ai-icon.jpg"
            width={28}
            height={28}
            alt=""
          />{" "}
          Dog AI
        </span>
        <Image
          src="/projects/dog-ai-screen.jpg"
          width={320}
          height={480}
          alt="Dog AI app: a photo of a dog ready for mood analysis"
          className="dog-screen"
          sizes="(max-width: 700px) 240px, 280px"
          preload={eager}
        />
        <span className="visual-note">
          A custom multimodal model.
          <br />
          An App Store product.
        </span>
      </div>
    );
  const name =
    slug === "appointra"
      ? "Appointra"
      : slug === "leadboost-pro"
        ? "LeadBoost Pro"
        : "Viral Loop";
  return (
    <div className={`project-visual visual-brand visual-${slug}`}>
      <CompanyMark company={name} size={64} />
      <span>{name}</span>
      <ArrowUpRight size={44} aria-hidden />
    </div>
  );
}
