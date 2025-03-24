"use client";
import React from "react";

function Logo() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[4] = el;
      }}
      className="col-span-8 row-span-3 bg-cyan-400 p-4 flex flex-col justify-between"
    >
      <div className="text-2xl font-bold">Logo</div>
      <div className="flex items-center justify-center flex-1">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <path d="M25 30 L50 50 L75 30 L50 10 Z" fill="#1E3A5F" />
          <path d="M25 70 L50 90 L75 70 L50 50 Z" fill="#1E3A5F" />
        </svg>
      </div>
    </div>
  );
}

export default Logo;
