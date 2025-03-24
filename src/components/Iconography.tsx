import React from "react";
import { useRef } from "react";
import gsap from "gsap";
interface IconographyProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Iconography({ gridItemsRefs }: IconographyProps) {
  const lockRef = useRef(null);
  const shackleRef = useRef(null);

  const lockMouseEnter = () => {
    gsap.to(shackleRef.current, {
      y: -10, // Move up to simulate unlocking
      rotate: 15, // Slight rotation for effect
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const lockMouseLeave = () => {
    gsap.to(shackleRef.current, {
      y: 0, // Move back to locked position
      rotate: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[6] = el;
      }}
      onMouseEnter={lockMouseEnter}
      onMouseLeave={lockMouseLeave}
      className="h-[41.5vh] w-[18vw] absolute bottom-2 left-2 bg-lime-500 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold">Iconography</div>
      <div className="flex items-center justify-center flex-1">
        <svg
          ref={lockRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-24 h-24 text-yellow-400"
        >
          {/* Lock Shackle */}
          <path
            ref={shackleRef}
            d="M12 2C9.24 2 7 4.24 7 7V10H9V7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V10H17V7C17 4.24 14.76 2 12 2Z"
          />

          {/* Lock Body */}
          <path d="M6 10V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V10H6ZM12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18Z" />
        </svg>
      </div>
    </div>
  );
}

export default Iconography;
