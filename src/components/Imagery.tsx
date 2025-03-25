import React from "react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
interface ImageryProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Imagery({ gridItemsRefs }: ImageryProps) {
  const sunRef = useRef<SVGCircleElement>(null);
  const moonRef = useRef<SVGCircleElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<SVGPathElement>(null);
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
    });

    if (isDay) {
      tl.to(moonRef.current, { y: 50, opacity: 0 }) // Hide moon
        .to(sunRef.current, { y: -50, opacity: 1 }, "<") // Move sun up
        .to(bgRef.current, { backgroundColor: "#F8B9B5" }, "<") // Change to day
        .to(mountainRef.current, { fill: "#C42E6E" }, "<"); // Change mountain color
    } else {
      tl.to(sunRef.current, { y: 50, opacity: 0 }) // Hide sun
        .to(moonRef.current, { y: -50, opacity: 1 }, "<") // Move moon up
        .to(bgRef.current, { backgroundColor: "#6A1B4D" }, "<") // Change to night
        .to(mountainRef.current, { fill: "#9A1F5F" }, "<"); // Darken mountain
    }
  }, [isDay]);
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[7] = el;
      }}
      onMouseEnter={() => setIsDay(!isDay)}
      className="h-[39.3vh] w-[33.2vw] absolute bottom-2 right-[19.9vw] bg-purple-800 p-4 flex flex-col justify-center hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Imagery</div>
      <div className="flex items-center justify-end flex-1">
        {/* <div className="bg-pink-300 w-32 h-32 rounded"> */}
        {/* Sun */}
        <svg viewBox="0 0 220 180" className="w-[220px] h-auto">
          {/* Background Rectangle */}
          <rect
            width="220"
            height="180"
            fill="none"
            stroke="#9A1F5F"
            strokeWidth="10"
          />

          {/* Sun */}
          <circle
            ref={sunRef}
            cx="70"
            cy="60"
            r="15"
            fill="#C42E6E"
            style={{ opacity: 1 }}
          />

          {/* Moon */}
          <circle
            ref={moonRef}
            cx="70"
            cy="60"
            r="15"
            fill="#F8B9B5"
            style={{ opacity: 0 }}
          />

          {/* Mountain Path */}
          <path
            ref={mountainRef}
            d="M20 140 Q 50 110, 90 140 T 200 140 L 200 180 L 20 180 Z"
            fill="#C42E6E"
          />
        </svg>

        {/* Toggle Button */}
        {/* <button
          onClick={() => setIsDay(!isDay)}
          className="absolute bottom-10 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Toggle
        </button> */}
        {/* <div className="bg-pink-600 h-12 w-full mt-10 rounded-tl-3xl rounded-tr-3xl"></div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Imagery;
