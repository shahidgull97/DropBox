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
  const arrowRef = useRef<SVGPolygonElement[]>([]);
  const circleRef = useRef<SVGCircleElement[]>([]);

  const handleHover = () => {
    // Hide straight lines
    straightLinesRef.current.forEach((line) => {
      gsap.to(line, {
        opacity: 0, // Hide the straight lines
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Reset curved lines before animating
    curvedLinesRef.current.forEach((path) => {
      gsap.set(path, {
        strokeDasharray: path.getTotalLength(),
        strokeDashoffset: path.getTotalLength(),
        opacity: 0,
      });

      gsap.to(path, {
        strokeDashoffset: 0, // Reveal the curve
        opacity: 1, // Make the curve fully visible
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // Reset and animate arrows
    arrowRef.current.forEach((path) => {
      gsap.set(path, {
        strokeDasharray: path.getTotalLength(),
        strokeDashoffset: path.getTotalLength(),
        opacity: 0,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
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
        strokeDashoffset: path.getTotalLength(), // Retract the curve smoothly
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(path, { opacity: 0 }); // Fully hide after animation
        },
      });
    });

    // Retract arrows
    arrowRef.current.forEach((path) => {
      gsap.to(path, {
        strokeDashoffset: path.getTotalLength(),
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
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
      className="absolute sm:h-[20vh] sm:w-[40vw] lg:h-[55vh] lg:w-[18vw]   left-2 bg-gray-800 text-white p-1 flex flex-col justify-between hover:bg-black transition-colors duration-500 "
    >
      <div className="text-2xl font-bold">Framework</div>
      <div className="flex items-center justify-center flex-1 w-full h-full overflow-hidden">
        <svg viewBox="0 0 100 120" className="w-full h-full">
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
            d="M10 20 Q50 5, 80 50"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" // Start fully hidden
          />
          <polygon
            ref={(el) => {
              el && (arrowRef.current[0] = el);
            }}
            points="85,48 85,55 77,54"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0"
          />

          <path
            ref={(el) => {
              el && (curvedLinesRef.current[1] = el);
            }}
            d="M90 60 Q50 120, 23 110"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0" // Start fully hidden
          />
          <polygon
            ref={(el) => {
              el && (arrowRef.current[1] = el);
            }}
            points="23,105 15,110 23,115"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0"
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
