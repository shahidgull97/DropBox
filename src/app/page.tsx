// pages/index.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import Framework from "@/components/Framework";
import VoiceTone from "@/components/VoiceTone";
import Logo from "@/components/Logo";
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blueLogoRef = useRef<HTMLDivElement>(null);
  const gridItemsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lockRef = useRef(null);
  const shackleRef = useRef(null);

  const lockMouseEnter = () => {
    gsap.to(shackleRef.current, {
      y: -10, // Move up to simulate unlocking
      rotate: 15, // Slight rotation for effect
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const lockMouseLeave = () => {
    gsap.to(shackleRef.current, {
      y: 0, // Move back to locked position
      rotate: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

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
          <div
            ref={(el) => {
              gridItemsRefs.current[5] = el;
            }}
            className="h-[40vh] w-[18.5vw] absolute right-2 top-2 bg-red-500 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
          >
            <div className="text-2xl font-bold">Typography</div>
            <div className="flex items-center justify-center flex-1">
              <span className="text-8xl font-bold text-gray-800">Aa</span>
            </div>
          </div>

          {/* Iconography */}
          <div
            ref={(el) => {
              gridItemsRefs.current[6] = el;
            }}
            onMouseEnter={lockMouseEnter}
            onMouseLeave={lockMouseLeave}
            className="h-[41.5vh] w-[18vw] absolute bottom-2 left-2 bg-lime-500 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
          >
            <div className="text-2xl font-bold">Iconography</div>
            <div className="flex items-center justify-center flex-1">
              {/* <svg viewBox="0 0 100 100" className="w-24 h-24">
                <rect
                  x="25"
                  y="30"
                  width="50"
                  height="45"
                  rx="5"
                  fill="#1E3A5F"
                />
                <rect
                  x="45"
                  y="25"
                  width="10"
                  height="10"
                  rx="2"
                  fill="#1E3A5F"
                />
                <circle
                  cx="50"
                  cy="55"
                  r="8"
                  fill="transparent"
                  stroke="#1E3A5F"
                  strokeWidth="4"
                />
                <rect
                  x="45"
                  y="50"
                  width="10"
                  height="15"
                  rx="2"
                  fill="#1E3A5F"
                />
              </svg> */}
              <svg
                ref={lockRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-24 h-24 text-yellow-400"
              >
                {/* Lock Shackle */}
                <path
                  ref={shackleRef}
                  d="M12 2C9.24 2 7 4.24 7 7V10H9V7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V10H17V7C17 4.24 14.76 2 12 2Z"
                />

                {/* Lock Body */}
                <path d="M6 10V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V10H6ZM12 18C10.9 18 10 17.1 10 16C10 14.9 10.9 14 12 14C13.1 14 14 14.9 14 16C14 17.1 13.1 18 12 18Z" />
              </svg>
            </div>
          </div>
          {/* Color */}
          <div
            ref={(el) => {
              gridItemsRefs.current[2] = el;
            }}
            className="h-[54.5vh] w-[26vw] absolute left-[19.2vw] bottom-2 bg-amber-700 p-4 hover:bg-black transition-colors duration-500 text-white "
          >
            <div className="text-2xl font-bold text-white">Color</div>
            <div className="flex items-center justify-center h-full">
              <div className="border-2 border-white p-5">
                <div className="w-16 h-16 rounded-full border-2 border-white"></div>
                <div className="w-16 h-16 rounded-full border-2 border-white mt-2"></div>
              </div>
            </div>
          </div>
          {/* Dropbox logo (Blue section) */}
          <div
            ref={(el) => {
              gridItemsRefs.current[3] = el;
              blueLogoRef.current = el;
            }}
            className=" blueLogo h-24 w-[8.3vw] top-[44vh] left-[45.8vw] absolute bg-blue-600 flex  justify-center items-center "
          >
            <h2 className="opacity-0 transition-opacity duration-500 ease-in-out"></h2>
            {/* <svg viewBox="0 0 100 100" className="w-16 h-16">
              <path d="M25 30 L50 50 L75 30 L50 10 Z" fill="white" />
              <path d="M25 70 L50 90 L75 70 L50 50 Z" fill="white" />
            </svg> */}

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
          <div
            ref={(el) => {
              gridItemsRefs.current[7] = el;
            }}
            className="h-[39.3vh] w-[33.2vw] absolute bottom-2 right-[19.9vw] bg-purple-800 p-4 flex flex-col justify-center hover:bg-black transition-colors duration-500 text-white "
          >
            <div className="text-2xl font-bold text-white">Imagery</div>
            <div className="flex items-center justify-end flex-1">
              <div className="bg-pink-300 w-32 h-32 rounded">
                <div className="bg-pink-600 w-5 h-5 rounded-full m-2"></div>
                <div className="bg-pink-600 h-12 w-full mt-10 rounded-tl-3xl rounded-tr-3xl"></div>
              </div>
            </div>
          </div>

          {/* Motion */}
          <div
            ref={(el) => {
              gridItemsRefs.current[8] = el;
            }}
            className="h-[56vh] w-[18.5vw] absolute bottom-2 right-2 bg-purple-300 p-4 flex flex-col justify-between hover:bg-black transition-colors duration-500 text-white "
          >
            <div className="text-2xl font-bold">Motion</div>
            <div className="flex items-center justify-center flex-1">
              <svg viewBox="0 0 100 100" className="w-full h-32">
                <path
                  d="M20 70 C40 20, 60 120, 80 30"
                  stroke="purple"
                  strokeWidth="2"
                  fill="transparent"
                />
                <circle cx="20" cy="70" r="5" fill="purple" />
                <circle cx="80" cy="30" r="5" fill="purple" />
                <circle cx="50" cy="50" r="5" fill="purple" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div ref={containerRef} className="h-screen overflow-hidden relative">
    //     <div className="w-full h-full bg-white p-2 relative">
    //       {/* Framework */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[0] = el;
    //         }}
    //         className="absolute top-2 left-2 w-[18%] h-[46%] bg-gray-800 text-white p-4 flex flex-col justify-between"
    //       >
    //         <div className="text-2xl font-bold">Framework</div>
    //         <div className="flex items-center justify-center flex-1">
    //           <svg viewBox="0 0 100 100" className="w-32 h-32">
    //             <line
    //               x1="25"
    //               y1="25"
    //               x2="50"
    //               y2="50"
    //               stroke="white"
    //               strokeWidth="1"
    //             />
    //             <line
    //               x1="25"
    //               y1="75"
    //               x2="50"
    //               y2="50"
    //               stroke="white"
    //               strokeWidth="1"
    //             />
    //             <circle cx="25" cy="25" r="5" fill="white" />
    //             <circle cx="50" cy="50" r="5" fill="white" />
    //             <circle cx="25" cy="75" r="5" fill="white" />
    //           </svg>
    //         </div>
    //       </div>

    //       {/* Voice & Tone */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[1] = el;
    //         }}
    //         className="absolute top-2 left-[20%] w-[35%] h-[35%] bg-yellow-300 p-4"
    //       >
    //         <div className="text-2xl font-bold text-gray-800">Voice & Tone</div>
    //         <div className="flex justify-between items-center h-full">
    //           <span className="text-8xl text-gray-700">"</span>
    //           <span className="text-8xl text-gray-700">"</span>
    //         </div>
    //       </div>

    //       {/* Logo */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[4] = el;
    //         }}
    //         className="absolute top-2 left-[55%] w-[25%] h-[48%] bg-cyan-400 p-4 flex flex-col justify-between"
    //       >
    //         <div className="text-2xl font-bold">Logo</div>
    //         <div className="flex items-center justify-center flex-1">
    //           <svg viewBox="0 0 100 100" className="w-32 h-32">
    //             <path d="M25 30 L50 50 L75 30 L50 10 Z" fill="#1E3A5F" />
    //             <path d="M25 70 L50 90 L75 70 L50 50 Z" fill="#1E3A5F" />
    //           </svg>
    //         </div>
    //       </div>

    //       {/* Typography */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[5] = el;
    //         }}
    //         className="absolute top-2 right-2 w-[18%] h-[35%] bg-red-500 p-4 flex flex-col justify-between"
    //       >
    //         <div className="text-2xl font-bold">Typography</div>
    //         <div className="flex items-center justify-center flex-1">
    //           <span className="text-8xl font-bold text-gray-800">Aa</span>
    //         </div>
    //       </div>

    //       {/* Iconography */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[6] = el;
    //         }}
    //         className="absolute bottom-2 left-2 w-[18%] h-[46%] bg-lime-500 p-4 flex flex-col justify-between"
    //       >
    //         <div className="text-2xl font-bold">Iconography</div>
    //         <div className="flex items-center justify-center flex-1">
    //           <svg viewBox="0 0 100 100" className="w-24 h-24">
    //             <rect
    //               x="25"
    //               y="30"
    //               width="50"
    //               height="45"
    //               rx="5"
    //               fill="#1E3A5F"
    //             />
    //             <rect
    //               x="45"
    //               y="25"
    //               width="10"
    //               height="10"
    //               rx="2"
    //               fill="#1E3A5F"
    //             />
    //             <circle
    //               cx="50"
    //               cy="55"
    //               r="8"
    //               fill="transparent"
    //               stroke="#1E3A5F"
    //               strokeWidth="4"
    //             />
    //             <rect
    //               x="45"
    //               y="50"
    //               width="10"
    //               height="15"
    //               rx="2"
    //               fill="#1E3A5F"
    //             />
    //           </svg>
    //         </div>
    //         <div className="text-xs text-gray-700">
    //           https://brand.dropbox.com/framework
    //         </div>
    //       </div>

    //       {/* Color */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[2] = el;
    //         }}
    //         className="absolute bottom-2 left-[20%] w-[26%] h-[46%] bg-orange-400 p-4"
    //       >
    //         <div className="text-2xl font-bold">Color</div>
    //         <div className="flex items-center justify-center h-full">
    //           <div className="border-2 border-white p-5">
    //             <div className="w-16 h-16 rounded-full border-2 border-white"></div>
    //             <div className="w-16 h-16 rounded-full border-2 border-white mt-2"></div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Dropbox logo (Blue section) */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[3] = el;
    //           blueLogoRef.current = el;
    //         }}
    //         className="blueLogo absolute top-[37%] left-[46%] w-[9%] h-[15%] bg-blue-600 flex justify-center items-center"
    //       >
    //         <h2 className="opacity-0 transition-opacity duration-500 ease-in-out"></h2>
    //         <svg viewBox="0 0 100 100" className="w-16 h-16">
    //           <path d="M25 30 L50 50 L75 30 L50 10 Z" fill="white" />
    //           <path d="M25 70 L50 90 L75 70 L50 50 Z" fill="white" />
    //         </svg>
    //       </div>

    //       {/* Imagery */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[7] = el;
    //         }}
    //         className="absolute bottom-2 left-[46%] w-[34%] h-[33%] bg-purple-800 p-4 flex flex-col justify-center"
    //       >
    //         <div className="text-2xl font-bold text-white">Imagery</div>
    //         <div className="flex items-center justify-end flex-1">
    //           <div className="bg-pink-300 w-32 h-32 rounded">
    //             <div className="bg-pink-600 w-5 h-5 rounded-full m-2"></div>
    //             <div className="bg-pink-600 h-12 w-full mt-10 rounded-tl-3xl rounded-tr-3xl"></div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Motion */}
    //       <div
    //         ref={(el) => {
    //           gridItemsRefs.current[8] = el;
    //         }}
    //         className="absolute bottom-2 right-2 w-[18%] h-[46%] bg-purple-300 p-4 flex flex-col justify-between"
    //       >
    //         <div className="text-2xl font-bold">Motion</div>
    //         <div className="flex items-center justify-center flex-1">
    //           <svg viewBox="0 0 100 100" className="w-full h-32">
    //             <path
    //               d="M20 70 C40 20, 60 120, 80 30"
    //               stroke="purple"
    //               strokeWidth="2"
    //               fill="transparent"
    //             />
    //             <circle cx="20" cy="70" r="5" fill="purple" />
    //             <circle cx="80" cy="30" r="5" fill="purple" />
    //             <circle cx="50" cy="50" r="5" fill="purple" />
    //           </svg>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
