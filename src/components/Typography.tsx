import React from "react";
import { useRef } from "react";
import gsap from "gsap";
interface TypographyProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Typography({ gridItemsRefs }: TypographyProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    gsap.to(textRef.current, {
      scale: 1.2, // Slightly increase the size
      color: "transparent", // Hide the fill color
      webkitTextStroke: "2px white", // Apply outline effect
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      scale: 1,
      color: "#424242", // Restore the original fill color
      webkitTextStroke: "0px transparent",
      duration: 0.3,
      ease: "power2.out",
    });
  };
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[5] = el;
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-[40vh] w-[18.8vw] absolute right-2 top-2 bg-orange-600 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-4xl font-bold text-red-900">Typography</div>
      <div className="flex items-end justify-end flex-1">
        <span ref={textRef} className="text-8xl font-bold text-gray-800">
          Aa
        </span>
      </div>
    </div>
  );
}

export default Typography;
