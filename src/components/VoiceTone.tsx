"use client";
import React from "react";
interface VoiceToneProps {
  gridItemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}
function VoiceTone({ gridItemsRefs }: VoiceToneProps) {
  return (
    <div
      ref={(el) => {
        gridItemsRefs.current[1] = el;
      }}
      className="h-[42vh] w-[35vw] absolute left-[19.2vw] bg-yellow-300 p-4 hover:bg-black transition-colors duration-500 text-white "
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
