import React from "react";

function Typography() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[5] = el;
      }}
      className="col-span-4 row-span-3 bg-red-500 p-4 flex flex-col justify-between"
    >
      <div className="text-2xl font-bold">Typography</div>
      <div className="flex items-center justify-center flex-1">
        <span className="text-8xl font-bold text-gray-800">Aa</span>
      </div>
    </div>
  );
}

export default Typography;
