"use client";
import React from "react";
import { RefObject } from "react";

type MotionProps = {
  gridItemsRefs: RefObject<HTMLDivElement>[]; // Assuming an array of div refs
};

function Motion({ gridItemsRefs }: MotionProps) {
  return (
    <div
      ref={(el) => {
        if (gridItemsRefs.current[8]) {
          gridItemsRefs.current[8] = el as HTMLDivElement | null;
        }
      }}
      className="col-span-4 row-span-3 bg-purple-300 p-4 flex flex-col justify-between"
    >
      <div className="text-2xl font-bold">Motion</div>
      <div className="flex items-center justify-center flex-1">
        <svg viewBox="0 0 100 100" className="w-full h-32">
          <path
            d="M20 70 C40 20, 60 120, 80 30"
            stroke="purple"
            strokeWidth="2"
            fill="transparent"
          />
          <circle cx="20" cy="70" r="5" fill="purple" />
          <circle cx="80" cy="30" r="5" fill="purple" />
          <circle cx="50" cy="50" r="5" fill="purple" />
        </svg>
      </div>
    </div>
  );
}

export default Motion;
