import React from "react";

function Iconography() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[6] = el;
      }}
      className="col-span-3 row-span-3 bg-lime-500 p-4 flex flex-col justify-between"
    >
      <div className="text-2xl font-bold">Iconography</div>
      <div className="flex items-center justify-center flex-1">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <rect x="25" y="30" width="50" height="45" rx="5" fill="#1E3A5F" />
          <rect x="45" y="25" width="10" height="10" rx="2" fill="#1E3A5F" />
          <circle
            cx="50"
            cy="55"
            r="8"
            fill="transparent"
            stroke="#1E3A5F"
            strokeWidth="4"
          />
          <rect x="45" y="50" width="10" height="15" rx="2" fill="#1E3A5F" />
        </svg>
      </div>
      <div className="text-xs text-gray-700">
        https://brand.dropbox.com/framework
      </div>
    </div>
  );
}

export default Iconography;
