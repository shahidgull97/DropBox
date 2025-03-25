"use client";
import React from "react";
import { RefObject } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
interface FrameworkProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Framework({ gridItemsRefs }: FrameworkProps) {
  const straightLinesRef = useRef<SVGPathElement[]>([]);
  const curvedLinesRef = useRef<SVGPathElement[]>([]);

  const handleHover = () => {
    // Hide straight lines
    straightLinesRef.current.forEach((line) => {
      gsap.to(line, {
        opacity: 0, // Hide the straight lines
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Draw curved lines & fade them in
    curvedLinesRef.current.forEach((path) => {
      gsap.to(path, {
        strokeDashoffset: 0, // Reveal the curve
        opacity: 1, // Make the curve fully visible
        duration: 1.2,
        ease: "power2.out",
      });
    });
  };

  const handleLeave = () => {
    // Show straight lines again
    straightLinesRef.current.forEach((line) => {
      gsap.to(line, {
        opacity: 1, // Show the straight lines
        duration: 0.3,
        ease: "power2.in",
      });
    });

    // Retract curved lines & fade them out

    curvedLinesRef.current.forEach((path) => {
      gsap.to(path, {
        strokeDashoffset: 100, // Retract the curve smoothly
        duration: 0.8, // Optimal speed to avoid flickering
        ease: "power2.in",
        onComplete: () => {
          gsap.set(path, { opacity: 0, strokeDasharray: "none" }); // Instantly hide after animation
        },
      });
    });
  };

  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[0] = el;
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="h-[55vh] w-[18vw] absolute left-2 bg-gray-800 text-white p-1 flex flex-col justify-between hover:bg-black transition-colors duration-500"
    >
      <div className="text-2xl font-bold">Framework</div>
      <div className="flex items-center justify-center flex-1 w-full">
        <svg viewBox="0 0 100 120" className="w-64 h-64">
          {/* Straight Lines (Initially Visible) */}
          <path
            ref={(el) => {
              el && (straightLinesRef.current[0] = el);
            }}
            d="M10 20 L90 60"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            ref={(el) => {
              el && (straightLinesRef.current[1] = el);
            }}
            d="M10 110 L90 60"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Curved Paths (Initially Hidden, Appear on Hover) */}
          <path
            ref={(el) => {
              el && (curvedLinesRef.current[0] = el);
            }}
            d="M10 20 Q50 5, 90 60"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" // Start fully hidden
          />

          <path
            ref={(el) => {
              el && (curvedLinesRef.current[1] = el);
            }}
            d="M10 110 Q50 120, 90 60"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" // Start fully hidden
          />

          {/* Dots at Start & End */}
          <circle cx="10" cy="20" r="3" fill="white" />
          <circle cx="90" cy="60" r="3" fill="white" />
          <circle cx="10" cy="110" r="3" fill="white" />
        </svg>

        {/* <svg viewBox="0 0 100 100" className="w-full h-80">
          <line
            x1="10"
            y1="20"
            x2="90"
            y2="60"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="110"
            x2="90"
            y2="60"
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="10" cy="20" r="3" fill="white" />
          <circle cx="90" cy="60" r="3" fill="white" />
          <circle cx="10" cy="110" r="3" fill="white" />
        </svg> */}
      </div>
    </div>
  );
}

export default Framework;
