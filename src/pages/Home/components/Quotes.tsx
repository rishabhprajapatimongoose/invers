"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AnimatedText from "../../../components/common/AnimatedText";

type Quote = {
  id: number;
  text: string;
  author: string;
};

const quotes: Quote[] = [
  {
    id: 1,
    text: "FWC’s partnership with Inversa has supercharged the removal of invasive Burmese Pythons from the Everglades. The new program accomplished more removals in July 2025 alone than in the entire year before.",
    author: "Governor Ron DeSantis, Florida",
  },
  {
    id: 2,
    text: "I want to thank the Inversa team for handling an age-old problem with engineering technology advancements and innovative methods. Since they've taken over, we have tripled the removal of invasive pythons.",
    author: "Roger Young, Executive Director, FWC",
  },
  {
    id: 3,
    text: "INVERSA’s techniques are effective and their delivery efficient. They have proven to me that economics are the most important factor in scaling invasive removals.",
    author: "Federal Contract Lead, NOAA",
  },
];

const Quotes = () => {
  const [index, setIndex] = useState(0);

  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const DURATION = 6;

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    const container = containerRef.current;
    const cursor = cursorRef.current;

    const show = () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
    };

    const hide = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.2 });
    };

    container.addEventListener("mouseenter", show);
    container.addEventListener("mouseleave", hide);

    return () => {
      container.removeEventListener("mouseenter", show);
      container.removeEventListener("mouseleave", hide);
    };
  }, []);
  /*fOOLW CUROSR */

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    const cursor = cursorRef.current;

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 40,
        y: e.clientY - 40,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    containerRef.current.addEventListener("mousemove", move);

    return () => {
      containerRef.current?.removeEventListener("mousemove", move);
    };
  }, []);

  /* ================= Slider Logic ================= */

  useEffect(() => {
    if (!progressRef.current) return;

    // Kill old timeline
    tlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setIndex((i) => (i + 1) % quotes.length);
      },
    });

    // Reset bar
    gsap.set(progressRef.current, { scaleX: 0 });

    // Progress animation
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: DURATION,
      ease: "linear",
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [index]);

  /* next quote click fn */

  const nextQuote = () => {
    tlRef.current?.kill();
    setIndex((i) => (i + 1) % quotes.length);
  };

  const current = quotes[index];

  return (
    <>
      <style>{`
        .split-line {
          overflow: hidden;
          display: block;
          padding-bottom: 0.15em;
        }

        .line-inner {
          display: inline-block;
          will-change: transform;
        }
      `}</style>

      <div
        ref={containerRef}
        onClick={nextQuote}
        className="relative bg-[#EBFC72] select-none text-black min-h-screen px-4 py-6 md:px-5 md:py-8 flex flex-col justify-between overflow-hidden cursor-none"
      >
        {/* CURSOR*/}
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-16 h-16  rounded-full border-2 border-black pointer-events-none z-99 flex items-center justify-center text-xs font-medium opacity-0"
        >
          NEXT
        </div>

        <div>
          {/* Pagination */}
          <div className="relative ml-auto md:w-1/4 m-10 flex font-light items-center">
            <span className="text-base tracking-wider bg-[#EBFC72] z-10 pr-5 font-jetbrains whitespace-nowrap">
              {String(index + 1).padStart(3, "0")} /{" "}
              {String(quotes.length).padStart(3, "0")}
            </span>

            {/* Track */}
            <div className="absolute w-full h-px bg-black/20 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-black origin-left scale-x-0"
              />
            </div>
          </div>

          {/* Quote */}
          <AnimatedText
            text={current.text}
            className="
              w-full lg:w-5/6
              text-[4vh] sm:text-[4.5vh] md:text-[5vh]
              lg:text-[4vh] xl:text-[4vw]
              font-medium tracking-tighter
              leading-[120%]
            "
          />
        </div>

        {/* Author */}
        <AnimatedText
          text={current.author}
          delay={0.25}
          className="w-5/6 md:w-2/3 ml-auto text-end text-[4vh] sm:text-[4.5vh] md:text-[5vh]
              lg:text-[4vh] xl:text-[4vw]
              font-medium tracking-tighter
              leading-[120%]"
        />
      </div>
    </>
  );
};

export default Quotes;
