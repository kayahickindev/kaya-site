import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "./ProjectVisual";
export function SelectedWork() {
  return (
    <div className="selected-work">
      {[
        {
          slug: "myfutureself",
          name: "MyFutureSelf",
          role: "Co-founder & CTO",
          text: "A voice AI mentor for the person you’re becoming.",
        },
        {
          slug: "dog-ai",
          name: "Dog AI",
          role: "Model training · iOS",
          text: "From a custom multimodal model to the App Store.",
        },
      ].map((p) => (
        <Link className="project-link" href={`/work/${p.slug}`} key={p.slug}>
          <ProjectVisual slug={p.slug} />
          <div className="project-caption">
            <div>
              <p className="eyebrow">{p.role}</p>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </div>
            <span className="round-arrow">
              <ArrowUpRight aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
