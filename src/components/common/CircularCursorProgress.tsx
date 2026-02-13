"use client";

import { forwardRef } from "react";

type Props = {
  percent?: string;
};

const CircularCursorProgress = forwardRef<
  HTMLDivElement,
  {
    circleRef: React.RefObject<SVGCircleElement>;
  } & Props
>(({ circleRef }, cursorRef) => {
  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-20 h-20 pointer-events-none 
                 z-[999] opacity-0 flex items-center justify-center"
      style={{
        /* The parent moves INSTANTLY to follow the mouse */
        transition: "transform 0.05s linear",
      }}
    >
      {/* WRAPPER FOR THE CIRCLE (SLOW) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          /* This adds a "weighted" lag to the SVG itself */
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <svg className="-rotate-90" width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            ref={circleRef}
            cx="40"
            cy="40"
            r="36"
            stroke="#EBFC72"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            style={{
              /* The filling of the line is also slow */
              transition:
                "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>
      </div>

      {/* TEXT SPAN (FAST) */}
      <span
        className="text-[10px] tracking-widest font-bold uppercase text-white"
        style={{
          /* The text has almost zero lag, making it feel "Fast" */
          transition: "transform 0.1s ease-out",
        }}
      >
        Scroll
      </span>
    </div>
  );
});

CircularCursorProgress.displayName = "CircularCursorProgress";

export default CircularCursorProgress;
