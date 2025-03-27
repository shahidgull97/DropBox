"use client";
import { useRef } from "react";
import React from "react";
import gsap from "gsap";
interface LogoProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Logo({ gridItemsRefs }: LogoProps) {
  const logoRef = useRef(null);
  const handleMouseEnter = () => {
    const boxes = gsap.utils.toArray("#dropboxLogo path");

    gsap.to(
      boxes,
      // scale: 1.2,
      // rotate: 15,
      // y: -10,
      // opacity: 1,
      // duration: 0.5,
      // stagger: 0.1,
      // ease: "power2.out",

      {
        y: -30, // Move up
        opacity: 1,
        duration: 0.2,
        stagger: 0.1,
        ease: "power2.out",
        yoyo: true, // ✅ Makes them return to original position
        repeat: 1, // ✅ Moves up, then back
      }
    );
  };

  // const handleMouseLeave = () => {
  //   const boxes = gsap.utils.toArray("#dropboxLogo path");

  //   gsap.to(boxes, {
  //     scale: 1,
  //     rotate: 0,
  //     y: 0,
  //     opacity: 1,
  //     duration: 0.5,
  //     stagger: 0.1,
  //     ease: "power2.inOut",
  //   });
  // };
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[4] = el;
      }}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className="absolute sm:h-[20vh] sm:w-[53vw] xl:h-[56vh] xl:w-[25.8vw]   sm:top-[22vh] xl:top-2 sm:right-[46.2vw]  xl:right-[20vw]   bg-cyan-400 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold">Logo</div>
      <div className="flex items-center justify-center flex-1 w-full h-full overflow:hidden">
        <svg
          ref={logoRef}
          id="dropboxLogo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-35.3175 -50 306.085 300"
          className="w-1/2 h-1/2 text-blue-500 fill-current"
        >
          <path d="M58.86 75l58.87-37.5L58.86 0 0 37.5z" />
          <path d="M176.59 75l58.86-37.5L176.59 0l-58.86 37.5z" />
          <path d="M117.73 112.5L58.86 75 0 112.5 58.86 150z" />
          <path d="M176.59 150l58.86-37.5L176.59 75l-58.86 37.5z" />
          <path d="M176.59 162.5L117.73 125l-58.87 37.5 58.87 37.5z" />
        </svg>
      </div>
    </div>
  );
}

export default Logo;
