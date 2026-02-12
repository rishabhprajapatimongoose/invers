"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HarvestHeader from "./HarvestHeader";
import HarvestorSlideOne from "./HarvestorSlideOne";
import HarvestorSlideThree from "./HarvestorSlideThree";
import HarvestorSlideTwo from "./HarvestorSlideTwo";

gsap.registerPlugin(ScrollTrigger);

const Harvestor = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const managerRef = useRef<HTMLImageElement>(null);
  const bg1Ref = useRef<HTMLImageElement>(null);
  const bg2Ref = useRef<HTMLImageElement>(null);

  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // 1. Add a ref for the container so we can fade the whole thing in/out
  const barContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !pinRef.current ||
      !managerRef.current ||
      !bg1Ref.current ||
      !bg2Ref.current ||
      !slide1Ref.current ||
      !slide2Ref.current ||
      !slide3Ref.current ||
      !cursorRef.current ||
      !barRef.current ||
      !barContainerRef.current
    )
      return;

    const cursor = cursorRef.current;
    const bar = barRef.current;
    const barContainer = barContainerRef.current;

    // Mouse follow
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 32,
        y: e.clientY - 32,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const ctx = gsap.context(() => {
      // Hide all slides first
      gsap.set([slide1Ref.current, slide2Ref.current, slide3Ref.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: pinRef.current,

          // Progress handling
          onUpdate: (self) => {
            const progress = self.progress; // 0 → 1
            const percent = Math.round(progress * 100);

            // Progress bar height
            gsap.to(bar, {
              height: `${progress * 100}%`,
              duration: 0.1,
              overwrite: true,
            });

            // Cursor text
            const span = cursor.querySelector("span");
            if (span) span.innerText = `${percent}%`;
          },

          // --- VISIBILITY LOGIC ADDED HERE ---

          // Show cursor AND bar
          onEnter: () => {
            gsap.to([cursor, barContainer], { opacity: 1, duration: 0.2 });
            gsap.to(cursor, { scale: 1, duration: 0.2 });
          },

          // Hide cursor AND bar
          onLeave: () => {
            gsap.to([cursor, barContainer], { opacity: 0, duration: 0.2 });
            gsap.to(cursor, { scale: 0.6, duration: 0.2 });
          },

          // Show when scrolling back up
          onEnterBack: () => {
            gsap.to([cursor, barContainer], { opacity: 1, duration: 0.2 });
            gsap.to(cursor, { scale: 1, duration: 0.2 });
          },

          // Hide when scrolling back past the top
          onLeaveBack: () => {
            gsap.to([cursor, barContainer], { opacity: 0, duration: 0.2 });
            gsap.to(cursor, { scale: 0.6, duration: 0.2 });
          },
        },
      });

      const FAST = 0.01;
      /* Fade background */
      tl.to(bg1Ref.current, { opacity: 0 , duration: FAST}, 0);
      tl.to(bg2Ref.current, { opacity: 0 , duration: FAST}, 0);


      /* Manager → Slide 1 */
      tl.to(managerRef.current, { opacity: 0, duration: FAST }, 0.2);
      tl.to(slide1Ref.current, { opacity: 1, duration: FAST }, 0.2);

      /* Slide 1 → Slide 2 */
      tl.to(slide1Ref.current, { opacity: 0, duration: FAST }, 0.33);
      tl.to(slide2Ref.current, { opacity: 1, duration: FAST }, 0.33);

      /* Slide 2 → Slide 3 */
      tl.to(slide2Ref.current, { opacity: 0, duration: FAST }, 0.66);
      tl.to(slide3Ref.current, { opacity: 1, duration: FAST }, 0.66);

      //   holding the slide3
      tl.to(slide3Ref.current, { opacity: 1, duration: 0.001 }, 1);
    }, sectionRef);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <section className="pt-20 bg-[#13140E] text-white">
      <HarvestHeader />

      <div ref={sectionRef} className="relative mt-20 ">
        {/* PINNED VIEWPORT */}
        <div
          ref={pinRef}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
          {/* Backgrounds */}
          <img
            ref={bg1Ref}
            src="/managers-1.svg"
            className="absolute w-full h-[80%] object-contain opacity-40"
          />

          <img
            ref={bg2Ref}
            src="/managers-2.svg"
            className="absolute w-full h-[80%] object-contain opacity-40"
          />

          {/* Manager */}
          <img
            ref={managerRef}
            src="/manager.svg"
            className="absolute w-full h-[80%] object-contain z-10"
          />

          {/* Slides */}
          <div className="absolute inset-0 flex flex-col items-center justify-start z-20">
            {/* Slide 1 */}
            <div
              ref={slide1Ref}
              className="flex items-center justify-center h-full w-full"
            >
              <HarvestorSlideOne />
            </div>

            {/* Slide 2 */}
            <div
              ref={slide2Ref}
              className="absolute top-0 flex items-center justify-center h-full w-full"
            >
              <HarvestorSlideTwo />
            </div>

            {/* Slide 3 */}
            <div
              ref={slide3Ref}
              className="absolute top-0 flex items-center justify-center h-full w-full"
            >
              <HarvestorSlideThree />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-[#ebfc72] pointer-events-none z-[99] opacity-0 flex items-center justify-center"
      >
        <span className="text-xs">0%</span>
      </div>

      {/* Progress Bar Container */}
      {/* ADDED: ref={barContainerRef} and opacity-0 */}
      <div
        ref={barContainerRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 h-64 w-0.5 bg-white/20 z-[99] opacity-0 pointer-events-none"
      >
        <div ref={barRef} className="w-full bg-[#EBFC72] h-0 origin-top" />
      </div>
    </section>
  );
};

export default Harvestor;
