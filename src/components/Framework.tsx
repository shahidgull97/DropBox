"use client";
import React from "react";
import { RefObject } from "react";
interface FrameworkProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Framework({ gridItemsRefs }: FrameworkProps) {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[0] = el;
      }}
      className="h-[55vh] w-[18vw] absolute left-2 bg-gray-800 text-white p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500"
    >
      <div className="text-2xl font-bold">Framework</div>
      <div className="flex items-center justify-center flex-1">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <line
            x1="25"
            y1="25"
            x2="50"
            y2="50"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="25"
            y1="75"
            x2="50"
            y2="50"
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="5" fill="white" />
          <circle cx="50" cy="50" r="5" fill="white" />
          <circle cx="25" cy="75" r="5" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default Framework;
