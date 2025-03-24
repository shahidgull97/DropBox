import React from "react";
interface TypographyProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Typography({ gridItemsRefs }: TypographyProps) {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[5] = el;
      }}
      className="h-[40vh] w-[18.5vw] absolute right-2 top-2 bg-red-500 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold">Typography</div>
      <div className="flex items-center justify-center flex-1">
        <span className="text-8xl font-bold text-gray-800">Aa</span>
      </div>
    </div>
  );
}

export default Typography;
