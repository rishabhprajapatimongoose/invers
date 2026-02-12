import gsap from "gsap";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { useInView } from "react-intersection-observer";

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const { ref: viewRef, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  // Merge refs
  const setRefs = (el: HTMLParagraphElement | null) => {
    textRef.current = el;
    viewRef(el);
  };

  useEffect(() => {
    if (!textRef.current || !inView) return;

    // Split
    const split = new SplitType(textRef.current, {
      types: "lines",
      lineClass: "split-line",
    });
    if (!split.lines) return;
    // Wrap
    split.lines.forEach((line) => {
      const html = line.innerHTML;
      line.innerHTML = `<span class="line-inner">${html}</span>`;
    });

    const targets = textRef.current.querySelectorAll(".line-inner");

    // Reset first (CRITICAL)
    gsap.set(targets, {
      yPercent: 100,
    });

    // Animate
    gsap.to(targets, {
      yPercent: 0,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.08,
      delay,
    });

    return () => {
      split.revert();
      gsap.killTweensOf(targets);
    };
  }, [text, inView, delay]);

  return (
    <p ref={setRefs} className={className}>
      {text}
    </p>
  );
};

export default AnimatedText;
