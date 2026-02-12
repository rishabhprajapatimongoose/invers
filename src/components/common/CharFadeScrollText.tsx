import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CharFadeScrollTextProps = {
  text: string;
  className?: string;
};

const CharFadeScrollText = ({
  text,
  className = "",
}: CharFadeScrollTextProps) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  charsRef.current = [];

  useEffect(() => {
    if (!containerRef.current || !charsRef.current.length) return;

    const chars = charsRef.current;

    gsap.set(chars, { opacity: 0 });

    const animation = gsap.to(chars, {
      opacity: 1,
      stagger: 0.008,
      duration: 0.01,
      ease: "none",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => animation.play(),
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);

  const cleanText = text.replace(/\s+/g, " ").trim();
  return (
    <p ref={containerRef} className={`${className} leading-relaxed`}>
      {cleanText.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              ref={(el) => {
                if (el) charsRef.current.push(el);
              }}
              className="inline-block"
            >
              {char}
            </span>
          ))}

          {/* Normal space (not &nbsp;) */}
          <span className="inline-block w-[0.25em]" />
        </span>
      ))}
    </p>
  );
};

export default CharFadeScrollText;
