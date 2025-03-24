import React from "react";
interface ImageryProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function Imagery({ gridItemsRefs }: ImageryProps) {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[7] = el;
      }}
      className="h-[39.3vh] w-[33.2vw] absolute bottom-2 right-[19.9vw] bg-purple-800 p-4 flex flex-col justify-center hover:bg-black transition-colors duration-500 text-white "
    >
      <div className="text-2xl font-bold text-white">Imagery</div>
      <div className="flex items-center justify-end flex-1">
        <div className="bg-pink-300 w-32 h-32 rounded">
          <div className="bg-pink-600 w-5 h-5 rounded-full m-2"></div>
          <div className="bg-pink-600 h-12 w-full mt-10 rounded-tl-3xl rounded-tr-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Imagery;
