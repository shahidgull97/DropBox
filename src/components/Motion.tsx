"use client";
import React from "react";
import { RefObject } from "react";
import { useRef } from "react";
import gsap from "gsap";
interface MotionProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function Motion({ gridItemsRefs }: MotionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const topLeftRectRef = useRef<SVGRectElement>(null);
  const topRighttRectRef = useRef<SVGRectElement>(null);
  const bottomRightRectRef = useRef<SVGRectElement>(null);
  const bottomLeftRectRef = useRef<SVGRectElement>(null);
  const topLineRef = useRef<SVGLineElement>(null);
  const bottomLineRef = useRef<SVGLineElement>(null);

  const handleMouseEnter = () => {
    gsap.to(topLeftRectRef.current, {
      x: -10,
      duration: 0.5,
      ease: "power2.out",
      stroke: "white",
      strokeWidth: 1,
      fill: "none",
    });
    gsap.to(topRighttRectRef.current, {
      stroke: "white",
      strokeWidth: 1,
      fill: "none",
    });
    gsap.to(bottomRightRectRef.current, {
      x: 15,
      duration: 0.5,
      ease: "power2.out",
      stroke: "white",
      strokeWidth: 1,
      fill: "none",
    });
    gsap.to(bottomLeftRectRef.current, {
      stroke: "white",
      strokeWidth: 1,
      fill: "none",
    });

    gsap.to(topLineRef.current, {
      attr: { x1: 58 },
      duration: 0.5,
      ease: "power2.out",
      stroke: "white",
    });
    gsap.to(bottomLineRef.current, {
      attr: { x2: 45 },
      duration: 0.5,
      ease: "power2.out",
      stroke: "white",
    });

    gsap.to(pathRef.current, {
      attr: { d: "M10 113 C60 100, 40 0, 90 -10" }, // More S-like curve
      duration: 0.5,
      ease: "power2.out",
      stroke: "white",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(topLeftRectRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.in",
      strokeWidth: 0,
      fill: "purple",
    });
    gsap.to(topRighttRectRef.current, {
      strokeWidth: 0,
      fill: "purple",
      ease: "power2.in",
      duration: 0.5,
    });
    gsap.to(bottomRightRectRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.in",
      fill: "purple",
      strokeWidth: 0,
    });
    gsap.to(bottomLeftRectRef.current, {
      strokeWidth: 0,
      fill: "purple",
      ease: "power2.in",
      duration: 0.5,
    });

    gsap.to(topLineRef.current, {
      attr: { x1: 60 },
      duration: 0.5,
      ease: "power2.in",
      stroke: "purple",
    });
    gsap.to(bottomLineRef.current, {
      attr: { x2: 30 },
      duration: 0.5,
      ease: "power2.in",
      stroke: "purple",
    });

    gsap.to(pathRef.current, {
      attr: { d: "M10 113 C40 100, 60 0, 90 -10" }, // Back to original
      duration: 0.5,
      ease: "power2.in",
      stroke: "purple",
    });
  };

  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[8] = el;
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute sm:h-[20vh] sm:w-[50vw] lg:h-[56vh] lg:w-[18.8vw]  bottom-2 right-2 bg-purple-300 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white w-[50%] h-[50%]"
    >
      <div className="text-2xl font-bold">Motion</div>
      <div className="flex items-center justify-center flex-1 w-full h-full overflow-visible ">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          // preserveAspectRatio="xMidYMid meet"
          // viewBox="0 0 200 100" // ✅ Wider viewBox
          // preserveAspectRatio="none" // ✅ Forces stretchi
          preserveAspectRatio="xMidYMid meet"
          className=" sm:h-1/2 lg:w-full lg:h-full overflow-visible "
        >
          <path
            ref={pathRef}
            d="M10 113 C40 100, 60 0, 90 -10"
            stroke="purple"
            strokeWidth="1"
            fill="transparent"
          />

          <line
            ref={topLineRef}
            x1="62"
            y1="-10"
            x2="90"
            y2="-10"
            style={{ stroke: "purple", strokeWidth: 1 }}
          />
          <line
            ref={bottomLineRef}
            x1="10"
            y1="114"
            x2="30"
            y2="114"
            style={{ stroke: "purple", strokeWidth: 1 }}
          />
          <rect
            ref={topRighttRectRef}
            width="8"
            height="8"
            x="90"
            y="-15"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={topLeftRectRef}
            width="8"
            height="8"
            x="60"
            y="-15"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={bottomLeftRectRef}
            width="8"
            height="8"
            x="2"
            y="110"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={bottomRightRectRef}
            width="8"
            height="8"
            x="30"
            y="110"
            rx="3"
            ry="3"
            fill="purple"
          />
        </svg>
        {/* <svg
          ref={svgRef}
          viewBox="0 0 100 100" // Increased height to accommodate all elements
          // preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            ref={pathRef}
            d="M10 150 C40 100, 60 50, 90 50" // Adjusted path
            stroke="purple"
            strokeWidth="1"
            fill="transparent"
          />

          <line
            ref={topLineRef}
            x1="62"
            y1="20"
            x2="90"
            y2="20"
            style={{ stroke: "purple", strokeWidth: 1 }}
          />
          <line
            ref={bottomLineRef}
            x1="10"
            y1="180"
            x2="30"
            y2="180"
            style={{ stroke: "purple", strokeWidth: 1 }}
          />
          <rect
            ref={topRighttRectRef}
            width="8"
            height="8"
            x="90"
            y="15"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={topLeftRectRef}
            width="8"
            height="8"
            x="60"
            y="15"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={bottomLeftRectRef}
            width="8"
            height="8"
            x="2"
            y="175"
            rx="3"
            ry="3"
            fill="purple"
          />
          <rect
            ref={bottomRightRectRef}
            width="8"
            height="8"
            x="30"
            y="175"
            rx="3"
            ry="3"
            fill="purple"
          />
        </svg> */}
      </div>
    </div>
  );
}

export default Motion;
