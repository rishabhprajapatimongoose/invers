import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MaskedImage = ({ imgUrl }: { imgUrl: string }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const imageRef = useRef<SVGImageElement | null>(null);

  useEffect(() => {
    // Ensure we have refs
    if (!svgRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          // Start the image pulled up by 20% of its own height
          attr: { y: -150 },
        },
        {
          // Move the image down as we scroll
          attr: { y: 50 },
          ease: "none",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top bottom", // Animation starts when SVG enters viewport
            end: "bottom top", // Animation ends when SVG leaves viewport
            scrub: true, // Links animation to scroll position
          },
        },
      );
    }, svgRef);

    return () => ctx.revert();
  }, [imgUrl]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 776 830"
      className="w-full h-auto overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="shapeClip">
          <path d="M74.205 10c0-5.523 4.477-10 10-10H766c5.523 0 10 4.477 10 10v732.301c0 5.523-4.477-10-10 10H583.928c-1.274 0-2.536.244-3.718.717l-190.42 76.265a10 10 0 0 1-3.718.717H10c-5.523 0-10-4.477-10-10V351.276a10 10 0 0 1 2.862-7.004l68.48-69.787a10 10 0 0 0 2.863-7.004z" />
        </clipPath>
      </defs>

      <g clipPath="url(#shapeClip)">
        <image
          ref={imageRef}
          href={imgUrl}
          x="0"
          y="-150"
          width="100%"
          height="110%"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
};

export default MaskedImage;
