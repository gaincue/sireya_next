"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { useState, useEffect } from "react"
import React from "react"

const images = [
  "/1_desktop.png",
  "/2_desktop.png",
  "/3_desktop.png",
  "/4_desktop.png",
  "/4_desktop.png",
  // "/mandarin_oriental.png",
  "/4_desktop.png",
]
const imagesMobile = [
  "/1_mobile.png",
  "/2_mobile.png",
  "/3_mobile.png",
  "/4_mobile.png",
  "/4_mobile.png",
  // "/mandarin_oriental.png",
  "/4_mobile.png",
]
const headlines = [
  "Cradled in coastal wonder",
  "Composed with graceful precision",
  "Rooted in place and purpose",
  "A sanctuary blossoms anew",
]
const headlinesMobile = [
  "Cradled in coastal\nwonder",
  "Composed with graceful\nprecision",
  "Rooted in place and\npurpose",
  "A sanctuary blossoms\nanew",
]

// Responsive hook to detect mobile screen
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])
  return isMobile
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const isMobile = useIsMobile()
  const imagesToShow = isMobile ? imagesMobile : images

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Dynamic interval based on current frame
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    const isLast = current === imagesToShow.length - 1
    const duration = isLast ? 30000 : 30000
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesToShow.length)
    }, duration)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [current, imagesToShow.length])

  function resetInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    const isLast = current === imagesToShow.length - 1
    const duration = isLast ? 30000 : 30000
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesToShow.length)
    }, duration)
  }

  // handle keyboard arrow keys handler for carousel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + imagesToShow.length) % imagesToShow.length)
        resetInterval()
      } else if (event.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % imagesToShow.length)
        resetInterval()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [current, imagesToShow.length])

  return (
    <div className="relative w-screen h-svh overflow-hidden" style={{ touchAction: "pan-y" }}>
      {/* Carousel Images */}
      {imagesToShow.map((src, idx) => (
        <Image
          key={src + idx}
          src={src}
          alt={`Carousel image ${idx + 1}`}
          fill
          priority={idx === 0}
          className={`transition-opacity duration-1000 absolute inset-0 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }${
            // idx === 4
            //   ? "object-contain !w-1/2 !h-1/2 !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2"
            //   : "object-cover  w-full h-full"
            ""
          }`}
          draggable={false}
          unoptimized
        />
      ))}

      {/* Carousel Navigation Buttons */}
      <button
        type="button"
        aria-label="Previous slide"
        className="cursor-pointer absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
        onClick={() => {
          setCurrent((prev) => (prev - 1 + imagesToShow.length) % imagesToShow.length)
          resetInterval()
        }}
      >
        <span className="sr-only">Previous</span>
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden={true}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="cursor-pointer absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
        onClick={() => {
          setCurrent((prev) => (prev + 1) % imagesToShow.length)
          resetInterval()
        }}
      >
        <span className="sr-only">Next</span>
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom Left Headline or BookNow Text */}
      {current < imagesToShow.length - 1 && (
        <div className="absolute bottom-12 left-4 sm:left-12 z-20 select-none">
          <h4 className="text-white text-2xl sm:text-5xl font-semibold font-heldane drop-shadow-xl w-full whitespace-pre-line">
            {(isMobile ? headlinesMobile : headlines)[current]}
          </h4>
        </div>
      )}

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 select-none">
        <h4 className="text-gray-400/80 text-[0.6rem] sm:text-sm font-semibold font-heldane drop-shadow-xl">
          &copy; SC Shekar
        </h4>
      </div>

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* backdrop text */}
      {current >= imagesToShow.length - 2 && (
        <div className="absolute inset-0 z-20 font-heldane flex flex-col justify-center items-center">
          <div className="frosted">
            <div className="backdrop" />
          </div>
          {current == imagesToShow.length - 2 && (
            <Image
              src="/mandarin_oriental.png"
              alt="Mandarin Oriental"
              fill
              className={`transition-opacity duration-1000 absolute inset-0 opacity-100 z-10 object-contain !w-1/2 !h-1/2 !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2`}
              draggable={false}
              unoptimized
              priority
            />
          )}
          {current == imagesToShow.length - 1 && (
            <ScrollArea
              className={
                "flex flex-col justify-center items-center text-black/80 pt-16 space-y-2 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-18 relative h-[calc(100svh-4rem)] sm:h-auto height-mobile:h-[calc(100svh-4rem)]"
              }
            >
              <h4 className="text-lg sm:text-3xl xl:text-5xl font-semibold">
                A timeless legacy welcomes a new beginning
              </h4>
              <p className="mt-2 sm:mt-4 text-sm sm:text-lg xl:text-2xl">
                From June 2025, our iconic beachfront hideaway embarks on its next chapter as a
                Mandarin Oriental property. Currently known as The Sirēya Desaru Coast, the resort will be
                renamed Mandarin Oriental, Desaru Coast from January 2026, after a graceful and
                meticulous rebrand.
              </p>
              <p className="text-sm sm:text-lg xl:text-2xl">
                This award-winning property will be reimagined as a contemporary luxury wellness
                resort, pairing the exceptional hospitality of Mandarin Oriental with the
                unmistakable touch of legendary architect Kerry Hill, ushering in an era of
                unparalleled experiences.
              </p>
              <p className="text-sm sm:text-lg xl:text-2xl">
                As this brief transformation unfolds, the resort remains open and ready to welcome
                guests.
              </p>
              <p className="text-sm sm:text-lg xl:text-2xl">
                Reservation enquiries can be made by e-mailing{" "}
                <a className="underline" href="mailto:reservations@desarucoast.com">
                  reservations@desarucoast.com
                </a>
                {", calling "}
                <a className="underline" href="tel:+6078783400">
                  +607 878 3400
                </a>{" "}
                or via WhatsApp at{" "}
                <a className="underline" href="https://wa.me/60197701359">
                  +6019 770 1359
                </a>
                .
              </p>
            </ScrollArea>
          )}
        </div>
      )}

      <div className="absolute top-8 left-4 right-4 sm:left-12 sm:right-12 z-30 select-none">
        <div className="flex flex-row justify-between items-center">
          <h1
            className={`${
              current >= imagesToShow.length - 2 ? "text-black" : "text-white"
            } text-5xl font-bold font-heldane tracking-wide drop-shadow-lg transition-colors duration-200`}
          >
            The Sirēya Desaru Coast
          </h1>
          {current < imagesToShow.length - 1 && (
            <Button
              onClick={() => setCurrent(imagesToShow.length - 1)}
              className="cursor-pointer rounded-none px-3"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
