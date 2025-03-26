"use client";
import React, { useRef } from "react";

import gsap from "gsap";
interface VoiceToneProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function VoiceTone({ gridItemsRefs }: VoiceToneProps) {
  const leftQuoteRef = useRef<SVGSVGElement>(null);
  const rightQuoteRef = useRef<SVGSVGElement>(null);
  const handleMouseEnter = () => {
    gsap.to(leftQuoteRef.current, {
      transform: "matrix(-1, 0, 0, -1, 40, 0)",
      fill: "none",
      stroke: "white",
      strokeWidth: 1,
    });
    gsap.to(rightQuoteRef.current, {
      transform: "matrix(1, 0, 0, 1, -40, 0)",
      fill: "none",
      stroke: "white",
      strokeWidth: 1,
    });
  };
  const handleMouseLeave = () => {
    gsap.to(leftQuoteRef.current, {
      transform: "matrix(-1, 0, 0, -1, 0, 0)",
    });
    gsap.to(rightQuoteRef.current, {
      transform: "matrix(1, 0, 0, 1, 0, 0)",
    });
  };
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[1] = el;
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute sm:h-[20vh] sm:w-[58vw] lg:h-[41vh] lg:w-[34.3vw]  sm:left-[41.3vw] lg:left-[19.2vw] bg-yellow-300 p-4 hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-gray-800">Voice & Tone</div>
      <div className="flex justify-between items-center h-full">
        <svg
          ref={leftQuoteRef}
          width="64px"
          height="64px"
          viewBox="0 -0.5 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="si-glyph si-glyph-quote-close"
          fill="#000000"
          transform="matrix(-1, 0, 0, -1, 0, 0)"
          stroke="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>1030</title> <defs> </defs>{" "}
            <g strokeWidth="0.00017" fill="none" fillRule="evenodd">
              {" "}
              <g transform="translate(1.000000, 1.000000)" fill="#434343">
                {" "}
                <path
                  d="M1,13.969 C0.447,13.969 0,13.534 0,13 C0,12.466 0.447,12.031 1,12.031 C3.757,12.031 5,10.83 5,8.124 L5,6.978 L1.559,6.978 C0.729,6.978 0.053,6.3 0.053,5.467 L0.053,1.511 C0.053,0.677 0.729,-0.001 1.559,-0.001 L5.494,-0.001 C6.324,-0.001 7,0.677 7,1.511 L7,8.123 C7,11.898 4.859,13.969 1,13.969 L1,13.969 Z"
                  className="si-glyph-fill"
                >
                  {" "}
                </path>{" "}
                <path
                  d="M10,13.969 C9.447,13.969 9,13.534 9,13 C9,12.466 9.447,12.031 10,12.031 C12.757,12.031 14,10.83 14,8.124 L14,6.947 L10.533,6.947 C9.699,6.947 9.021,6.271 9.021,5.441 L9.021,1.505 C9.021,0.675 9.699,-0.001 10.533,-0.001 L14.488,-0.001 C15.322,-0.001 16,0.675 16,1.505 L16,8.123 C16,11.898 13.859,13.969 10,13.969 L10,13.969 Z"
                  className="si-glyph-fill"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        <svg
          ref={rightQuoteRef}
          width="64px"
          height="64px"
          viewBox="0 -0.5 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="si-glyph si-glyph-quote-close"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>1030</title> <defs> </defs>{" "}
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              {" "}
              <g transform="translate(1.000000, 1.000000)" fill="#434343">
                {" "}
                <path
                  d="M1,13.969 C0.447,13.969 0,13.534 0,13 C0,12.466 0.447,12.031 1,12.031 C3.757,12.031 5,10.83 5,8.124 L5,6.978 L1.559,6.978 C0.729,6.978 0.053,6.3 0.053,5.467 L0.053,1.511 C0.053,0.677 0.729,-0.001 1.559,-0.001 L5.494,-0.001 C6.324,-0.001 7,0.677 7,1.511 L7,8.123 C7,11.898 4.859,13.969 1,13.969 L1,13.969 Z"
                  className="si-glyph-fill"
                >
                  {" "}
                </path>{" "}
                <path
                  d="M10,13.969 C9.447,13.969 9,13.534 9,13 C9,12.466 9.447,12.031 10,12.031 C12.757,12.031 14,10.83 14,8.124 L14,6.947 L10.533,6.947 C9.699,6.947 9.021,6.271 9.021,5.441 L9.021,1.505 C9.021,0.675 9.699,-0.001 10.533,-0.001 L14.488,-0.001 C15.322,-0.001 16,0.675 16,1.505 L16,8.123 C16,11.898 13.859,13.969 10,13.969 L10,13.969 Z"
                  className="si-glyph-fill"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default VoiceTone;
