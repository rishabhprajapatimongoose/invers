"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import MaskedBackgroundImage from "../../components/common/MaskedBackgroundImage";

type Props = {
  onComplete?: () => void;
};

const HomeEnterAnimation = ({ onComplete }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !windowRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
        },
        onComplete: () => {
          onComplete?.();
        },
      });

      // Initial state
      gsap.set(windowRef.current, {
        width: "40vw",
        height: "2px",
        opacity: 0,
        borderRadius: "2px",
        overflow: "hidden",
      });

      gsap.set(imageRef.current, {
        width: "100%",
        height: "100%",
        scale: 1.2,
        transformOrigin: "center center",
      });

      tl
        // Show line
        .to(windowRef.current, {
          opacity: 1,
          duration: 0.1,
        })

        // Open vertically
        .to(windowRef.current, {
          height: "50vh",
          width: "45vw",
          duration: 1.4,
        })

        // Fullscreen burst
        .to(windowRef.current, {
          width: "120vw",
          height: "110vh",
          borderRadius: "0px",
          duration: 1,
          ease: "power4.inOut",
        })

        // Normalize image scale
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 1,
            ease: "power4.inOut",
          },
          "<",
        )

        // Fade out overlay
        .to(wrapperRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Window */}
      <div
        ref={windowRef}
        className="relative bg-black flex items-center justify-center"
      >
        {/* Image Container (Controls Size) */}
        <div ref={imageRef} className="w-full h-full">
          <MaskedBackgroundImage
            imgUrl="/HeroImageOne.png"
            className="w-full h-full"
            imgClassName="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeEnterAnimation;
