import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
interface ImageryProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Imagery({ gridItemsRefs }: ImageryProps) {
  const sunRef = useRef<SVGCircleElement>(null);
  const moonRef = useRef<SVGCircleElement>(null);
  const bgRef = useRef<SVGSVGElement>(null);
  const mountainRef = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const handleMouseEnter = () => {
    if (!sunRef.current || !moonRef.current) return;
    if (tl.current) tl.current.kill(); // Stop any previous animations

    tl.current = gsap.timeline();
    gsap.to(mountainRef.current, {
      fill: "black",
    });

    // change background
    gsap.to(bgRef.current, {
      background: "black",
      stroke: "white", // Add white border
      strokeWidth: 2, // Set border thickness
      duration: 0.3,
      // fill: "black",
    });
    // Sun and Moon animations in sync
    tl.current.to(sunRef.current, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 60, y: 80 },
          { x: -40, y: 60 },
        ],
        curviness: 1.5,
      },
      duration: 1,
      ease: "power1.inOut",
    });

    tl.current.to(
      moonRef.current,
      {
        motionPath: {
          path: [
            { x: 30, y: 110 },
            { x: 60, y: 60 },
            { x: 90, y: 70 },
          ],
          curviness: 1.5,
        },
        duration: 1,
        ease: "power1.inOut",
      },
      0 // Starts both animations at the same time
    );
  };

  const handleMouseLeave = () => {
    if (!sunRef.current || !moonRef.current) return;
    // mountain background
    gsap.to(mountainRef.current, {
      fill: "#C42E6E",
    });
    // change background
    gsap.to(bgRef.current, {
      background: "white",
    });
    // Reverse sun animation
    gsap.to(sunRef.current, {
      motionPath: {
        path: [
          { x: -40, y: 60 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ],
        curviness: 1.5,
      },
      duration: 1,
      ease: "power1.inOut",
    });

    // Reverse moon animation
    gsap.to(moonRef.current, {
      motionPath: {
        path: [
          { x: 90, y: 70 },
          { x: 150, y: 140 },
          { x: 30, y: 110 },
        ],
        curviness: 1.5,
      },
      duration: 1,
      ease: "power1.inOut",
    });
  };

  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[7] = el;
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute sm:h-[20vh] sm:w-[50vw]  xl:h-[40.5vh] xl:w-[33.7vw]  bottom-2 sm:right-[49vw] xl:right-[19.9vw] bg-purple-800 p-4 flex flex-col justify-center hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Imagery</div>
      <div
        ref={divRef}
        className="flex items-center justify-end flex-1 border-r-gray-200 w-full h-full overflow-hidden"
      >
        {/* Sun */}
        <svg
          ref={bgRef}
          viewBox="0 0 220 180"
          className="sm:w-[16 %] xl:w-[50%] h-[85%] sm:mr-3 lg:mr-0 bg-amber-50"
        >
          {/* Background Rectangle */}
          <rect
            width="220"
            height="180"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          {/* Sun */}
          <circle
            ref={sunRef}
            cx="105"
            cy="80"
            r="15"
            fill="#C42E6E"
            style={{ opacity: 1 }}
          />
          {/* Moon */}
          <path
            ref={moonRef}
            style={{ fill: "#010002" }}
            transform="translate(20, 110) scale(0.8)"
            d="M24.997,47.511C11.214,47.511,0,36.298,0,22.515C0,12.969,5.314,4.392,13.869,0.132 c0.385-0.191,0.848-0.117,1.151,0.186s0.381,0.766,0.192,1.15C13.651,4.64,12.86,8.05,12.86,11.601 c0,12.681,10.316,22.997,22.997,22.997c3.59,0,7.033-0.809,10.236-2.403c0.386-0.191,0.848-0.117,1.151,0.186 c0.304,0.303,0.381,0.766,0.192,1.15C43.196,42.153,34.597,47.511,24.997,47.511z M12.248,3.372C5.862,7.608,2,14.709,2,22.515 c0,12.68,10.316,22.996,22.997,22.996c7.854,0,14.981-3.898,19.207-10.343c-2.668,0.95-5.464,1.43-8.346,1.43 c-13.783,0-24.997-11.214-24.997-24.997C10.861,8.761,11.327,6.005,12.248,3.372z"
          ></path>{" "}
          {/* Mountain Path */}
          <path
            ref={mountainRef}
            d="M0 100 Q 40 50, 80 100 T 140 80 Q 180 40, 200 50 L200 150 L0 150 Z"
            fill="#C42E6E"
            transform="translate(0, 30) scale(1.1,1)"
          />
        </svg>
      </div>
    </div>
  );
}

export default Imagery;
