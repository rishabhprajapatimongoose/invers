"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HarvestHeader from "./HarvestHeader";
import HarvestorSlideOne from "./HarvestorSlideOne";
import HarvestorSlideTwo from "./HarvestorSlideTwo";
import HarvestorSlideThree from "./HarvestorSlideThree";

import CircularCursorProgress from "../../../components/common/CircularCursorProgress";

gsap.registerPlugin(ScrollTrigger);

const Harvestor = () => {
  /* Section / Pin */
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  /* Images */
  const managerRef = useRef<HTMLImageElement>(null);
  const bg1Ref = useRef<HTMLImageElement>(null);
  const bg2Ref = useRef<HTMLImageElement>(null);

  /* Slides */
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  /* Cursor + Circle */
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  /* Vertical Bar */
  const barRef = useRef<HTMLDivElement>(null);
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
      !circleRef.current ||
      !barRef.current ||
      !barContainerRef.current
    )
      return;

    const cursor = cursorRef.current;
    const circle = circleRef.current;
    const bar = barRef.current;
    const barContainer = barContainerRef.current;

    /* Setup Circle Progress*/

    const radius = 36;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    /* Mouse Follow */

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 40,
        y: e.clientY - 40,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    /* GSAP Context */

    const ctx = gsap.context(() => {
      /* Hide slides */
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

          /* Progress Sync */

          onUpdate: (self) => {
            const progress = self.progress;

            /* Vertical bar */
            gsap.to(bar, {
              height: `${progress * 100}%`,
              duration: 0.1,
              overwrite: true,
            });

            /* Circle */
            const offset = circumference * (1 - progress);

            gsap.to(circle, {
              strokeDashoffset: offset,
              duration: 0.1,
              overwrite: true,
            });
          },

          /* Visibility */

          onEnter: () => {
            gsap.to([cursor, barContainer], {
              opacity: 1,
              scale: 1,
              duration: 0.2,
            });
          },

          onLeave: () => {
            gsap.to([cursor, barContainer], {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
            });
          },

          onEnterBack: () => {
            gsap.to([cursor, barContainer], {
              opacity: 1,
              scale: 1,
              duration: 0.2,
            });
          },

          onLeaveBack: () => {
            gsap.to([cursor, barContainer], {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
            });
          },
        },
      });

      /* Slides TimeLine */

      const FAST = 0.01;

      /* Fade BG */
      tl.to(bg1Ref.current, { opacity: 0, duration: FAST }, 0);
      tl.to(bg2Ref.current, { opacity: 0, duration: FAST }, 0);

      /* Manager → Slide 1 */
      tl.to(managerRef.current, { opacity: 0, duration: FAST }, 0);
      tl.to(slide1Ref.current, { opacity: 1, duration: FAST }, 0);

      /* Slide 1 → Slide 2 */
      tl.to(slide1Ref.current, { opacity: 0, duration: FAST }, 0.33);
      tl.to(slide2Ref.current, { opacity: 1, duration: FAST }, 0.33);

      /* Slide 2 → Slide 3 */
      tl.to(slide2Ref.current, { opacity: 0, duration: FAST }, 0.66);
      tl.to(slide3Ref.current, { opacity: 1, duration: FAST }, 0.66);

      /* Hold */
      tl.to(slide3Ref.current, { opacity: 1, duration: FAST }, 1);
    }, sectionRef);

    /* -----------------------------
       Cleanup
    ----------------------------- */

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <section className="pt-20 bg-[#13140E] text-white">
      <HarvestHeader />

      {/* Section */}
      <div ref={sectionRef} className="relative mt-20">
        {/* Pin */}
        <div
          ref={pinRef}
          className="relative h-screen w-full overflow-hidden 
                     flex items-center justify-center"
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
          <div className="absolute inset-0 z-20">
            <div
              ref={slide1Ref}
              className="flex items-center justify-center h-full"
            >
              <HarvestorSlideOne />
            </div>

            <div
              ref={slide2Ref}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HarvestorSlideTwo />
            </div>

            <div
              ref={slide3Ref}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HarvestorSlideThree />
            </div>
          </div>
        </div>
      </div>

      {/* Circular Cursor */}
      <CircularCursorProgress ref={cursorRef} circleRef={circleRef} />

      {/* Vertical Bar */}
      <div
        ref={barContainerRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 
                   h-64 w-0.5 bg-white/20 z-[99] 
                   opacity-0 pointer-events-none"
      >
        <div ref={barRef} className="w-full bg-[#EBFC72] h-0 origin-top" />
      </div>
    </section>
  );
};

export default Harvestor;
