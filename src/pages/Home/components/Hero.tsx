"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedText from "../../../components/common/AnimatedText";
import DecryptedText from "../../../components/common/DecryptedText";
import HeroSlideText from "../../../components/common/HeroSlideText";
import MaskedBackgroundImage from "../../../components/common/MaskedBackgroundImage";
import NotchedButton from "../../../components/ui/NotchButton";
import HeroHotspots from "../../../components/common/HeroHotspots";

import CircularCursorProgress from "../../../components/common/CircularCursorProgress";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const maskWrapperRef = useRef<HTMLDivElement>(null);
  const imageOneRef = useRef<HTMLDivElement>(null);
  const imageTwoRef = useRef<HTMLDivElement>(null);

  const innerImgOneRef = useRef<HTMLImageElement>(null);
  const innerImgTwoRef = useRef<HTMLImageElement>(null);

  const slide3TextRef = useRef<HTMLDivElement>(null);
  const demoTextRef = useRef<HTMLDivElement>(null);

  /* Cursor */
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  /* Vertical Bar */
  const barRef = useRef<HTMLDivElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !maskWrapperRef.current ||
      !imageOneRef.current ||
      !imageTwoRef.current ||
      !innerImgOneRef.current ||
      !innerImgTwoRef.current ||
      !slide3TextRef.current ||
      !demoTextRef.current ||
      !cursorRef.current ||
      !circleRef.current ||
      !barRef.current ||
      !barContainerRef.current
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const circle = circleRef.current;
    const bar = barRef.current;
    const barContainer = barContainerRef.current;

    /* -----------------------------
       Circle Setup
    ----------------------------- */

    const radius = 36;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    /* -----------------------------
       Mouse Follow
    ----------------------------- */

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 40,
        y: e.clientY - 40,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    /* -----------------------------
       GSAP
    ----------------------------- */

    const ctx = gsap.context(() => {
      gsap.set(demoTextRef.current, {
        opacity: 0,
        filter: "blur(12px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,

          /* Progress Sync */
          onUpdate: (self) => {
            const progress = self.progress;
            const percent = Math.round(progress * 100);

            /* Bar */
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

            /* Text */
            const span = cursor.querySelector("span");
            if (span) span.innerText = `${percent}%`;
          },

          /* Visibility */
          onEnter: () => {
            gsap.to([cursor, barContainer], {
              opacity: 1,
              scale: 1,
              duration: 0.3,
            });
          },

          onLeave: () => {
            gsap.to([cursor, barContainer], {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
            });
          },

          onEnterBack: () => {
            gsap.to([cursor, barContainer], {
              opacity: 1,
              scale: 1,
              duration: 0.3,
            });
          },

          onLeaveBack: () => {
            gsap.to([cursor, barContainer], {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
            });
          },
        },
      });

      /* Image Scroll */
      tl.to(innerImgOneRef.current, { y: "-25%", ease: "none" }, 0);

      /* Mask */
      tl.to(
        maskWrapperRef.current,
        {
          y: "-10%",
          scale: 1.1,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );

      /* Slide 2 → 3 */
      tl.to(maskWrapperRef.current, {
        width: "60vw",
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      })
        .to(
          slide3TextRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.3",
        )
        .to(
          demoTextRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          "<",
        );

      /* Slide 3 → 4 */
      tl.to(
        slide3TextRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
        },
        "<",
      )
        .to(demoTextRef.current, {
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          maskWrapperRef.current,
          {
            width: "120vw",
            scale: 1.2,
            y: "-10%",
            duration: 1,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(imageOneRef.current, { opacity: 0, duration: 0.5 }, "<")
        .to(imageTwoRef.current, { opacity: 1, duration: 0.5 }, "<");

      /* Final Scroll */
      tl.to(innerImgTwoRef.current, { y: "-20%", ease: "none" }, ">-0.5");
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#13140E] text-white">
      {/* Cursor */}
      <CircularCursorProgress ref={cursorRef} circleRef={circleRef} />

      {/* Bar */}
      <div
        ref={barContainerRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 
                   h-64 w-0.5 bg-white/20 z-50 
                   opacity-0 pointer-events-none"
      >
        <div ref={barRef} className="w-full bg-[#EBFC72] h-0 origin-top" />
      </div>

      {/* Background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <div
          ref={maskWrapperRef}
          className="relative w-full scale-[120%] aspect-1030/701"
        >
          <div ref={imageOneRef} className="absolute inset-0 z-10">
            <MaskedBackgroundImage
              ref={innerImgOneRef}
              imgUrl="/HeroImageOne.png"
            />
          </div>

          <div ref={imageTwoRef} className="absolute inset-0 z-20 opacity-0">
            <MaskedBackgroundImage
              ref={innerImgTwoRef}
              imgUrl="/HeroImageTwo.png"
            />
          </div>

          <div
            ref={demoTextRef}
            className="absolute inset-0 z-30 flex items-center justify-center
                       bg-black/10 pointer-events-none"
          >
            <HeroHotspots />
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="relative z-10 -mt-[100vh]">
        <div className="min-h-screen flex items-end p-5 pb-20">
          <div className="max-w-4xl">
            <AnimatedText
              text="Invasions move fast."
              className="text-4xl lg:text-[4.5vw] font-medium"
            />
            <NotchedButton className="bg-[#EBFC72] text-black mt-4">
              <DecryptedText text="EXPLORE ORIGIN" useOriginalCharsOnly />
            </NotchedButton>
          </div>
        </div>

        <div className="min-h-screen flex items-center justify-end p-5">
          <HeroSlideText
            heading="Damaged Ecosystems"
            description="Invasive species degrade ecosystems..."
          />
        </div>

        <div
          ref={slide3TextRef}
          className="min-h-screen flex items-center p-5 opacity-0"
        >
          <HeroSlideText
            heading="One Click Invasive Management"
            description="Origin, Inversa's digital command center..."
          />
        </div>

        <div className="min-h-screen flex items-center justify-end p-5">
          <HeroSlideText
            heading="Restoration"
            description="With invasives controlled..."
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
