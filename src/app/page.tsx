// pages/index.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !blueLogoRef.current) return;

    const container = containerRef.current;
    const blueLogo = blueLogoRef.current;
    const gridItems = gridItemsRefs.current.filter(Boolean);

    // **Get Center Position**
    const blueRect = blueLogo?.getBoundingClientRect() || { left: 0, top: 0 };
    const centerX = blueRect.left + blueRect.width / 2;
    const centerY = blueRect.top + blueRect.height / 2;

    // ** Set Initial Positions (Blue div full-screen, others off-screen)**
    gsap.set(blueLogo, {
      width: "50vw",
      height: "90vh",
      x: 0,
      y: 0,
    });

    gridItems.forEach((item, index) => {
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const xDirection = rect.left > centerX ? 1 : -1;
      const yDirection = rect.top > centerY ? 1 : -1;

      gsap.set(item, {
        x: xDirection * (50 + index * 10) + "vw",
        y: yDirection * (50 + index * 5) + "vh",
        opacity: 0,
        scale: 0.8,
      });
    });

    // **2️⃣ Scroll Animation**
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${blueLogo.offsetWidth * 1.2}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      },
    });

    const initialWidth = blueLogo.offsetWidth;
    const textElement = blueLogo.querySelector("h2");

    scrollTl.to(blueLogo, {
      width: "7.2vw",
      height: "13vh",
      duration: 2,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: function () {
        if (textElement) {
          const currentWidth = blueLogo.offsetWidth;
          const shrinkPercentage = (currentWidth / initialWidth) * 100;

          if (shrinkPercentage > 90) {
            textElement.textContent =
              "At Dropbox, our Brand Guidelines help infuse everything we make with identity.";
            gsap.to(textElement, { opacity: 1, duration: 0.5, color: "blue" });
            gsap.to(blueLogo, { backgroundColor: "white", duration: 0.5 });
          } else if (shrinkPercentage <= 90 && shrinkPercentage > 60) {
            textElement.textContent =
              "Consistency brings clarity to our vision.";
            gsap.to(textElement, { opacity: 1, duration: 0.3, color: "white" });
            gsap.to(blueLogo, { backgroundColor: "blue", duration: 0.3 });
          } else {
            gsap.to(textElement, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                textElement.textContent = "";
              },
            });
            gsap.to(blueLogo, { backgroundColor: "blue", duration: 0.3 });
            gsap.to(svgRef.current, {
              x: "-50%",
              y: "-50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              duration: 0.5,
              ease: "power2.out",
            });
          }
        }
      },
    });

    // **Move all grid items radially inwards**
    gridItems.forEach((item) => {
      if (!item) return;

      scrollTl.to(
        item,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 2,
        },
        "<"
      );
    });

    // ** Handle Resize**
    const handleResize = () => {
      // Recalculate dimensions for the blue div
      if (blueLogo) {
        gsap.set(blueLogo, {
          width: "50vw",
          height: "90vh",
          x: 0,
          y: 0,
        });
      }
      ScrollTrigger.refresh(); // Refresh ScrollTrigger on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
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
            ref={blueLogoRef}
            className=" blueLogo h-[13vh] w-[7.2vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue border-2 border-blue-700 flex flex-col"
          >
            <h2 className="font-bold text-blue-700 text-5xl align-text-top duration-500 ease-in-out"></h2>

            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-35.3175 -50 306.085 300"
              className="w-[10vw] h-[10vh] relative left-0 bottom-0 text-blue-500 fill-current"
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
