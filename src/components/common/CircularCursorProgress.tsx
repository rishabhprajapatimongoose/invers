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
>(({ circleRef, percent = "0%" }, cursorRef) => {
  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-20 h-20 pointer-events-none 
                 z-[99] opacity-0 flex items-center justify-center"
    >
      <svg className="absolute inset-0 -rotate-90" width="80" height="80">
        {/* Background */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          fill="none"
        />

        {/* Progress */}
        <circle
          ref={circleRef}
          cx="40"
          cy="40"
          r="36"
          stroke="#EBFC72"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-xs font-medium">{percent}</span>
    </div>
  );
});

CircularCursorProgress.displayName = "CircularCursorProgress";

export default CircularCursorProgress;
