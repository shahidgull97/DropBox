// ScrollParallax.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ScrollParallaxProps {
  children: React.ReactNode[];
}

const ScrollParallax: React.FC<ScrollParallaxProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const isAnimating = useRef(false);

  // Initialize section refs
  if (sectionRefs.current.length !== children.length) {
    sectionRefs.current = Array(children.length)
      .fill(0)
      .map((_, i) => sectionRefs.current[i] || null);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    // Function to handle wheel events
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      if (direction > 0 && currentIndex < children.length - 1) {
        isAnimating.current = true;
        setCurrentIndex((prev) => prev + 1);
      } else if (direction < 0 && currentIndex > 0) {
        isAnimating.current = true;
        setCurrentIndex((prev) => prev - 1);
      }
    };

    // Add event listener
    containerRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex, children.length]);

  // Handle animation when current index changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Hide all sections initially
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;

      if (i === currentIndex) {
        gsap.set(ref, { display: "flex" });
      } else {
        gsap.set(ref, { display: "none" });
      }
    });

    // Animate current section
    const currentRef = sectionRefs.current[currentIndex];
    if (currentRef) {
      // Initial state
      gsap.set(currentRef, {
        opacity: 0,
        scale: 0.8,
      });

      // Animate to final state
      gsap.to(currentRef, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el as HTMLDivElement;
          }}
          className="absolute inset-0 items-center justify-center"
          style={{
            opacity: index === 0 ? 1 : 0,
            display: index === 0 ? "flex" : "none",
            width: "100%",
            height: "100%",
          }}
        >
          {child}
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-8 flex justify-center space-x-2 z-10">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating.current) {
                isAnimating.current = true;
                setCurrentIndex(index);
              }
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollParallax;
