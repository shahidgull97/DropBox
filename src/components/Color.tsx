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
      className="h-[54.5vh] w-[26vw] absolute left-[19.2vw] bottom-2 bg-amber-600 p-4 hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Color</div>
      <div className="flex flex-col items-end justify-end h-full mb-2">
        <div
          ref={div1Ref}
          className="  p-2 w-17 h-17 bg-amber-700 absolute right-[6vw] bottom-[11vh] items-center justify-center"
        >
          <div
            ref={innediv1Ref}
            className=" relative w-[90%] bg-amber-900  h-[90%] rounded-2xl  "
          ></div>
        </div>
        <div
          ref={div2Ref}
          className=" bg-amber-900 p-2 w-17 h-17 mb-6 items-center justify-center"
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
