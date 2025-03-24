"use client";
import React from "react";

function VoiceTone() {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[1] = el;
      }}
      className="col-span-9 row-span-3 bg-yellow-300 p-4"
    >
      <div className="text-2xl font-bold text-gray-800">Voice & Tone</div>
      <div className="flex justify-between items-center h-full">
        <span className="text-8xl text-gray-700">"</span>
        <span className="text-8xl text-gray-700">"</span>
      </div>
    </div>
  );
}

export default VoiceTone;
