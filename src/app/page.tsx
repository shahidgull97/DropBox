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
import { relative } from "path";
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blueLogoRef = useRef<HTMLDivElement>(null);
  const gridItemsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   const container = containerRef.current;
  //   const blueLogo = blueLogoRef.current;
  //   const gridItems = gridItemsRefs.current.filter(Boolean);
  //   const textElement = blueLogo ? blueLogo.querySelector("h2") : null;
  //   // Create a timeline for the animation
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: container,
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: true,
  //       pin: true,
  //       anticipatePin: 1,
  //     },
  //   });

  //   // Zoom effect for the blue logo section
  //   tl.to(
  //     blueLogo,
  //     {
  //       scale: 1.5,
  //       zIndex: 50,
  //       duration: 1,
  //     },
  //     0
  //   );

  //   // Move other grid items away from center and fade them out
  //   gridItems.forEach((item, index) => {
  //     if (item === blueLogo) return;

  //     // Calculate direction based on position relative to blue logo
  //     const rect = item?.getBoundingClientRect();
  //     const blueRect = blueLogo?.getBoundingClientRect() || { left: 0, top: 0 };

  //     const xDirection =
  //       rect?.left && blueRect.left && rect.left > blueRect.left ? 1 : -1;
  //     const yDirection =
  //       rect?.top && blueRect.top && rect.top > blueRect.top ? 1 : -1;
  //     console.log(xDirection);
  //     console.log(yDirection);

  //     // Move elements away from center with increasing gap
  //     tl.to(
  //       item,
  //       {
  //         x: `${xDirection * (50 + index * 10)}vw`,
  //         y: `${yDirection * (50 + index * 5)}vh`,
  //         opacity: 1,
  //         scale: 0.8,
  //         duration: 2,
  //       },
  //       0
  //     );
  //     // Scale blue div while elements are moving
  //     tl.to(
  //       blueLogo,
  //       {
  //         width: "15vw",
  //         height: "30vh",
  //         duration: 2,
  //         x: "-50%",
  //         y: "-50%",
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: blueLogo,
  //           start: "top center",
  //           end: "bottom center",
  //           toggleActions: "play none none reverse",
  //           onUpdate: (self) => {
  //             // This gives more precise control over the text visibility
  //             // based on the scroll progress
  //             if (textElement) {
  //               if (self.progress > 0.5 && textElement.textContent === "") {
  //                 // When we're halfway through the animation, show the text
  //                 textElement.textContent = "New Text";
  //                 gsap.to(textElement, { opacity: 1, duration: 0.5 });
  //               } else if (
  //                 self.progress < 0.5 &&
  //                 textElement.textContent !== ""
  //               ) {
  //                 // When we're less than halfway, hide the text
  //                 gsap.to(textElement, {
  //                   opacity: 0,
  //                   duration: 0.5,
  //                   onComplete: () => {
  //                     textElement.textContent = "";
  //                   },
  //                 });
  //               }
  //             }
  //           },
  //         },
  //       },
  //       0
  //     ); // Start at the same time as elements moving
  //   });

  //   return () => {
  //     // Clean up
  //     if (tl.scrollTrigger) {
  //       tl.scrollTrigger.kill();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!containerRef.current || !blueLogoRef.current) return;

    const container = containerRef.current;
    const blueLogo = blueLogoRef.current;
    const gridItems = gridItemsRefs.current.filter(Boolean);

    // **Get Center Position**
    const blueRect = blueLogo?.getBoundingClientRect() || { left: 0, top: 0 };
    const centerX = blueRect.left + blueRect.width / 2;
    const centerY = blueRect.top + blueRect.height / 2;

    // **1️⃣ Set Initial Positions (Blue div full-screen, others off-screen)**
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
        end: "bottom top",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      },
    });
    const initialWidth = blueLogo.offsetWidth;
    const initialHeight = window.innerHeight;
    const textElement = blueLogo.querySelector("h2");
    // **Blue div shrinks**

    scrollTl.to(blueLogo, {
      width: "8.3vw",
      height: "13vh",
      duration: 2,
      ease: "power2.out",
      onUpdate: function () {
        if (textElement) {
          const currentWidth = blueLogo.offsetWidth;
          const shrinkPercentage = (currentWidth / initialWidth) * 100; // Calculate shrink percentage
          if (shrinkPercentage <= 80 && !scrollTl.paused()) {
            scrollTl.pause(); // Pause scroll when reaching 80%
            setTimeout(() => {
              scrollTl.resume(); // Resume scroll after a short delay
            }, 4000); // 2-second delay
          }
          if (shrinkPercentage > 80) {
            // Show first text when size is above 60%
            textElement.textContent =
              "At Dropbox, our Brand Guidelines help infuse everything we make with identity.";
            gsap.to(textElement, { opacity: 1, duration: 0.5, color: "blue" });
            gsap.to(blueLogo, {
              backgroundColor: "white",

              duration: 0.5,
            });
            gsap.to(svgRef.current, {
              x: "0%", // Align to the left
              y: "0%", // Align to the bottom
              left: 0,
              bottom: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          } else if (shrinkPercentage <= 80 && shrinkPercentage > 60) {
            // Change to new text when size shrinks below 60% but is above 30%
            textElement.textContent =
              "Consistency brings clarity to our vision.";
            gsap.to(textElement, { opacity: 1, duration: 0.5, color: "white" });
            gsap.to(blueLogo, {
              backgroundColor: "blue",
              // text: "white",
              duration: 0.5,
            });
            gsap.to(svgRef.current, {
              x: "0%", // Align to the left
              y: "0%", // Align to the bottom
              left: 0,
              bottom: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            // When size is below 30%, fade text out
            gsap.to(textElement, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                textElement.textContent = "";
              },
            });
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
    gridItems.forEach((item, index) => {
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
      ); // Start at the same time
    });

    // **3️⃣ Reverse Animation when scrolling back up**
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Increase blue div size when scrolling up
        gsap.to(blueLogo, {
          width: `${100 - progress * 85}vw`,
          height: `${100 - progress * 70}vh`,
          duration: 0.5,
          ease: "power2.out",
        });

        // Move elements outward radially when scrolling up
        gridItems.forEach((item, index) => {
          if (!item) return;

          const rect = item.getBoundingClientRect();
          const xDirection = rect.left > centerX ? 1 : -1;
          const yDirection = rect.top > centerY ? 1 : -1;

          gsap.to(item, {
            x: xDirection * (50 + index * 10) * (1 - progress) + "vw",
            y: yDirection * (50 + index * 5) * (1 - progress) + "vh",
            opacity: progress > 0.1 ? 1 : 0, // Hide when scrolling back to top
            scale: 1 - progress * 0.2, // Scale down when scrolling up
            duration: 0.5,
            ease: "power2.out",
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
            // ref={(el) => {
            //   gridItemsRefs.current[3] = el;
            //   blueLogoRef.current = el;
            // }}
            ref={blueLogoRef}
            className=" blueLogo h-24 w-[8.3vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-blue-700 flex flex-col"
          >
            <h2 className="font-bold text-blue-700 text-5xl align-text-top duration-500 ease-in-out"></h2>

            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-35.3175 -50 306.085 300"
              // fixed left-0 bottom-0
              className="w-[15vw] h-[15vh] relative left-0 bottom-0 text-blue-500 fill-current"
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
