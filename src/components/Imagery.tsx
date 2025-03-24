import React from "react";

function Imagery() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[7] = el;
      }}
      className="col-span-5 row-span-3 bg-purple-800 p-4 flex flex-col justify-between"
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
