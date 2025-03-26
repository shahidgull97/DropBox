import React from "react";
import { useRef } from "react";
import gsap from "gsap";
interface ColorProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Color({ gridItemsRefs }: ColorProps) {
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const innediv1Ref = useRef<HTMLDivElement>(null);
  const innerdiv2Ref = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    gsap.to(div1Ref.current, {
      border: "2px white solid",
      backgroundColor: "black",
      ease: "power2,out",
      x: 60,
      // transform: "translate(10,0)",
    });
    // move div2
    gsap.to(div2Ref.current, {
      border: "2px white solid",
      backgroundColor: "black",
      x: -72,
      ease: "power2,out",
    });
    gsap.to(innediv1Ref.current, {
      border: "2px white solid",
      backgroundColor: "black",
    });
    gsap.to(innerdiv2Ref.current, {
      border: "2px white solid",
      backgroundColor: "black",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(div1Ref.current, {
      border: "none",
      backgroundColor: "rgb(180, 83, 9)",
      ease: "power2.out",
      x: 0,
    });
    gsap.to(div2Ref.current, {
      backgroundColor: "rgb(255, 160, 0)",
      border: "none",
      x: 0,
      ease: "power2,out",
    });
    gsap.to(innediv1Ref.current, {
      border: "none",
      backgroundColor: "rgb(255, 160, 0)",
    });
    gsap.to(innerdiv2Ref.current, {
      border: "none",
      backgroundColor: "rgb(180, 83, 9)",
    });
  };
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[2] = el;
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute sm:h-[20vh] sm:w-[53vw]  lg:h-[55.5vh] lg:w-[26.5vw] sm:left-[46.3vw] lg:left-[19.2vw] sm:bottom-[22.3vh] lg:bottom-2 bg-amber-600 p-4 hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Color</div>
      <div className="flex flex-col items-end justify-end w-full h-full mb-2 relative">
        <div
          ref={div1Ref}
          //  p-2 w-[5vw] h-[10vh] bg-amber-700  right-[6vw] bottom-[11vh] items-center justify-center
          className="absolute p-2 sm:w-[3vw] sm:h-[5vh] lg:w-[20%] lg:h-[20%] bg-amber-700 sm:right-[9%] lg:right-[22%] sm:bottom-[55%] lg:bottom-[30%] flex items-center justify-center "
        >
          <div
            ref={innediv1Ref}
            className=" relative w-[90%] bg-amber-900  h-[90%] rounded-2xl  "
          ></div>
        </div>
        <div
          ref={div2Ref}
          className=" absolute bg-amber-900 p-2 sm:w-[3vw] sm:h-[5vh] lg:w-[20%] lg:h-[20%] right-[2%] bottom-[5%] flex items-center justify-center mb-4"
        >
          <div
            ref={innerdiv2Ref}
            className="w-[90%] h-[90%] rounded-2xl  bg-amber-700 m "
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Color;
