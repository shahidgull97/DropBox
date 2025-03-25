// pages/index.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Framework from "@/components/Framework";
import VoiceTone from "@/components/VoiceTone";
import Logo from "@/components/Logo";
import Typography from "@/components/Typography";
import Iconography from "@/components/Iconography";
import Color from "@/components/Color";
import Imagery from "@/components/Imagery";
import Motion from "@/components/Motion";
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blueLogoRef = useRef<HTMLDivElement>(null);
  const gridItemsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const blueLogo = blueLogoRef.current;
    const gridItems = gridItemsRefs.current.filter(Boolean);
    const textElement = blueLogo ? blueLogo.querySelector("h2") : null;
    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Zoom effect for the blue logo section
    tl.to(
      blueLogo,
      {
        scale: 2.5,
        zIndex: 50,
        duration: 1,
      },
      0
    );

    // Move other grid items away from center and fade them out
    gridItems.forEach((item, index) => {
      if (item === blueLogo) return;

      // Calculate direction based on position relative to blue logo
      const rect = item?.getBoundingClientRect();
      const blueRect = blueLogo?.getBoundingClientRect() || { left: 0, top: 0 };

      const xDirection =
        rect?.left && blueRect.left && rect.left > blueRect.left ? 1 : -1;
      const yDirection =
        rect?.top && blueRect.top && rect.top > blueRect.top ? 1 : -1;
      console.log(xDirection);
      console.log(yDirection);

      // Move elements away from center with increasing gap
      tl.to(
        item,
        {
          x: `${xDirection * (30 + index * 10)}vw`,
          y: `${yDirection * (30 + index * 5)}vh`,
          opacity: 1,
          scale: 0.8,
          duration: 2,
        },
        0
      );
      // Scale blue div while elements are moving
      tl.to(
        blueLogo,
        {
          width: "15vw",
          height: "30vh",
          duration: 2,
          x: "-50%",
          y: "-50%",
          ease: "power2.out",
          scrollTrigger: {
            trigger: blueLogo,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
            onUpdate: (self) => {
              // This gives more precise control over the text visibility
              // based on the scroll progress
              if (textElement) {
                if (self.progress > 0.5 && textElement.textContent === "") {
                  // When we're halfway through the animation, show the text
                  textElement.textContent = "New Text";
                  gsap.to(textElement, { opacity: 1, duration: 0.5 });
                } else if (
                  self.progress < 0.5 &&
                  textElement.textContent !== ""
                ) {
                  // When we're less than halfway, hide the text
                  gsap.to(textElement, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                      textElement.textContent = "";
                    },
                  });
                }
              }
            },
          },
        },
        0
      ); // Start at the same time as elements moving
    });

    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="flex justify-center item-centere bg-white  p-2  h-full ">
          {/* Framework */}
          <Framework gridItemsRefs={gridItemsRefs} />

          {/*Voice and Tones*/}
          <VoiceTone gridItemsRefs={gridItemsRefs} />

          {/* Logo */}
          <Logo gridItemsRefs={gridItemsRefs} />

          {/* Typography */}
          <Typography gridItemsRefs={gridItemsRefs} />

          {/* Iconography */}
          <Iconography gridItemsRefs={gridItemsRefs} />
          {/* Color */}
          <Color gridItemsRefs={gridItemsRefs} />
          {/* Dropbox logo (Blue section) */}
          <div
            ref={(el) => {
              gridItemsRefs.current[3] = el;
              blueLogoRef.current = el;
            }}
            className=" blueLogo h-24 w-[8.3vw] top-[44vh] left-[45.8vw] absolute bg-blue-600 flex  justify-center items-center "
          >
            <h2 className="opacity-0 transition-opacity duration-500 ease-in-out"></h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-35.3175 -50 306.085 300"
              className="w-40 h-40 text-blue-500 fill-current"
            >
              <path d="M58.86 75l58.87-37.5L58.86 0 0 37.5z" />
              <path d="M176.59 75l58.86-37.5L176.59 0l-58.86 37.5z" />
              <path d="M117.73 112.5L58.86 75 0 112.5 58.86 150z" />
              <path d="M176.59 150l58.86-37.5L176.59 75l-58.86 37.5z" />
              <path d="M176.59 162.5L117.73 125l-58.87 37.5 58.87 37.5z" />
            </svg>
          </div>

          {/* Imagery */}

          <Imagery gridItemsRefs={gridItemsRefs} />
          {/* Motion */}
          <Motion gridItemsRefs={gridItemsRefs} />
        </div>
      </div>
    </>
  );
}
