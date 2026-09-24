import { Fragment, type CSSProperties } from "react";

// Word-by-word rise, driven by CSS (.reveal-word in globals.css). The markup is
// the same with and without reduced motion, so hydration never mismatches, and
// reduced-motion visitors get the finished headline at first paint.
export function RevealHeadline({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-mask">
            <span
              className="reveal-word"
              style={{ "--word-index": index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {/* The space sits between the masks: a trailing space inside an
              inline-block collapses. */}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
