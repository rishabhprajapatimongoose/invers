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

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskWrapperRef = useRef<HTMLDivElement>(null);
  const imageOneRef = useRef<HTMLDivElement>(null);
  const imageTwoRef = useRef<HTMLDivElement>(null);
  const innerImgOneRef = useRef<HTMLImageElement>(null); // Ref for scrolling image 1
  const innerImgTwoRef = useRef<HTMLImageElement>(null); // Ref for scrolling image 2
  const slide3TextRef = useRef<HTMLDivElement>(null);
  const demoTextRef = useRef<HTMLDivElement>(null);

  // Added Refs for UI Elements
  const barRef = useRef<HTMLDivElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Validation check including the new UI refs
    if (
      !containerRef.current ||
      !maskWrapperRef.current ||
      !imageOneRef.current ||
      !imageTwoRef.current ||
      !innerImgOneRef.current ||
      !innerImgTwoRef.current ||
      !slide3TextRef.current ||
      !demoTextRef.current ||
      !barRef.current ||
      !barContainerRef.current ||
      !cursorRef.current
    ) {
      return;
    }

    const bar = barRef.current;
    const barContainer = barContainerRef.current;
    const cursor = cursorRef.current;

    // Mouse follow for the custom cursor
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
      // Initial state for overlay text
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
          // Progress handling
          onUpdate: (self) => {
            gsap.to(bar, {
              height: `${self.progress * 100}%`,
              duration: 0.1,
              overwrite: true,
            });
          },
          // Sync visibility of both UI elements
          onEnter: () => {
            gsap.to([barContainer, cursor], { opacity: 1, duration: 0.3 });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
          },
          onLeave: () => {
            gsap.to([barContainer, cursor], { opacity: 0, duration: 0.3 });
            gsap.to(cursor, { scale: 0.6, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to([barContainer, cursor], { opacity: 1, duration: 0.3 });
            gsap.to(cursor, { scale: 1, duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to([barContainer, cursor], { opacity: 0, duration: 0.3 });
            gsap.to(cursor, { scale: 0.6, duration: 0.3 });
          },
        },
      });

      // 1. Full-span internal image scroll (Img 1)
      tl.to(innerImgOneRef.current, { y: "-25%", ease: "none" }, 0);

      // 2. Slide 1 -> 2: Mask scales up and shifts
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

      // 3. Slide 2 -> 3: Shrink Mask
      tl.to(maskWrapperRef.current, {
        width: "60vw",
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      })
        // Overlay Paragraph: Blur → Clear + Fade In
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

      // 4. Slide 3 -> 4: Blur + Fade Out + Image Swap
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

      // Scroll the second image internal view during final stage
      tl.to(
        innerImgTwoRef.current,
        {
          y: "-20%",
          ease: "none",
        },
        ">-0.5",
      );
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#13140E] text-white">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-white pointer-events-none z-100 opacity-0 flex items-center justify-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-whitefont-bold">
          Scroll
        </span>
      </div>

      {/* Progress Bar Container */}
      <div
        ref={barContainerRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 h-64 w-0.5 bg-white/20 z-50 opacity-0 pointer-events-none"
      >
        <div ref={barRef} className="w-full bg-[#EBFC72] h-0 origin-top" />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0 pointer-events-none">
        <div
          ref={maskWrapperRef}
          className="relative w-full h-auto scale-[120%] aspect-1030/701"
        >
          <div
            ref={imageOneRef}
            className="absolute inset-0 w-full h-full z-10"
          >
            <MaskedBackgroundImage
              ref={innerImgOneRef} // Passing ref to internal <img>
              imgUrl="/HeroImageOne.png"
              className="w-full h-full"
            />
          </div>

          <div
            ref={imageTwoRef}
            className="absolute inset-0 w-full h-full z-20 opacity-0"
          >
            <MaskedBackgroundImage
              ref={innerImgTwoRef} // Passing ref to internal <img>
              imgUrl="/HeroImageTwo.png"
              className="w-full h-full"
            />
          </div>
          <div
            ref={demoTextRef}
            className="absolute inset-0 z-30 flex items-center justify-center
              text-center
              px-10
              opacity-0
              backdrop-blur-0
              pointer-events-none
              bg-black/10
            "
          >
            <HeroHotspots />
          </div>
        </div>
      </div>

      {/* FOREGROUND (The Slides) */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Slide 1 */}
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

        {/* Slide 2 */}
        <div className="min-h-screen flex items-center justify-end p-5">
          <HeroSlideText
            heading="Damaged Ecosystems"
            description="Invasive species degrade ecosystems by overwhelming native wildlife and systems that drive costly ecological and economic decline."
          />
        </div>

        {/* Slide 3 - Text starts hidden */}
        <div
          ref={slide3TextRef}
          className="min-h-screen flex items-center p-5 opacity-0"
        >
          <HeroSlideText
            heading="One Click Invasive Management"
            description="Origin, Inversa's digital command center, deploys field specialists and management tools, targeting priority zones with precision to restore balance and deliver measurable ecological and economic impact."
          />
        </div>

        {/* Slide 4 */}
        <div className="min-h-screen flex items-center justify-end p-5">
          <HeroSlideText
            heading="Restoration"
            description="With invasives controlled, habitats rebound. Wildlife thrives, lands regenerate, and communities gain lasting ecological resialience and measurable economic development returns."
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
