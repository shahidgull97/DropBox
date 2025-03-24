import React from "react";
interface ColorProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Color({ gridItemsRefs }: ColorProps) {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[2] = el;
      }}
      className="h-[54.5vh] w-[26vw] absolute left-[19.2vw] bottom-2 bg-amber-700 p-4 hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Color</div>
      <div className="flex items-center justify-center h-full">
        <div className="border-2 border-white p-5">
          <div className="w-16 h-16 rounded-full border-2 border-white"></div>
          <div className="w-16 h-16 rounded-full border-2 border-white mt-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Color;
