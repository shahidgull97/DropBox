import React from "react";

function Color() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[2] = el;
      }}
      className="col-span-7 row-span-3 bg-amber-700 p-4"
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
