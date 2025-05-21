"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import React from "react"

const images = [
  "/1_desktop.png",
  "/2_desktop.png",
  "/3_desktop.png",
  "/4_desktop.png",
  "/4_desktop.png",
]
const imagesMobile = [
  "/1_mobile.png",
  "/2_mobile.png",
  "/3_mobile.png",
  "/4_mobile.png",
  "/4_mobile.png",
]
const headlines = [
  "Cradled in coastal wonder",
  "Composed with graceful precision",
  "Rooted in place and purpose",
  "A sanctuary blossoms anew",
  "A new chapter begins",
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

  // Drag state
  const drag = React.useRef({ startX: 0, lastX: 0, dragging: false })

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Dynamic interval based on current frame
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const isLast = current === imagesToShow.length - 1
    const duration = isLast ? 30000 : 8000
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesToShow.length)
    }, duration)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [current, imagesToShow.length])

  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const isLast = current === imagesToShow.length - 1
    const duration = isLast ? 30000 : 8000
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesToShow.length)
    }, duration)
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    drag.current.dragging = true
    drag.current.startX = e.type.startsWith("touch")
      ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
      : (e as React.PointerEvent<HTMLDivElement>).clientX
    drag.current.lastX = drag.current.startX
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    if (!drag.current.dragging) return
    drag.current.lastX = e.type.startsWith("touch")
      ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
      : (e as React.PointerEvent<HTMLDivElement>).clientX
  }

  function onPointerUp() {
    if (!drag.current.dragging) return
    const dx = drag.current.lastX - drag.current.startX
    const threshold = 50 // px
    if (dx > threshold) {
      setCurrent((prev) => {
        const next = (prev - 1 + imagesToShow.length) % imagesToShow.length
        resetInterval()
        return next
      })
    } else if (dx < -threshold) {
      setCurrent((prev) => {
        const next = (prev + 1) % imagesToShow.length
        resetInterval()
        return next
      })
    }
    drag.current.dragging = false
  }

  return (
    <div
      className="relative w-screen h-svh overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* Carousel Images */}
      {imagesToShow.map((src, idx) => (
        <Image
          key={`${src}-${idx}`}
          src={src}
          alt={`Carousel image ${idx + 1}`}
          fill
          priority={idx === 0}
          className={`cursor-grab object-cover transition-opacity duration-1000 absolute inset-0 w-full h-full ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          draggable={false}
          unoptimized
        />
      ))}

      {/* Bottom Left Headline or BookNow Text */}
      {current < 4 && (
        <div className="absolute bottom-12 left-4 sm:left-12 z-20 select-none max-w-xl">
          <h4 className="text-white text-2xl sm:text-4xl font-semibold font-heldane drop-shadow-xl">
            {headlines[current]}
          </h4>
        </div>
      )}

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 select-none">
        <h4 className="text-white text-xs sm:text-xl font-semibold font-heldane drop-shadow-xl">
          &copy; SC Shekar 2020
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

      {current === 4 && (
        <div className="fixed inset-0 z-20 ">
          <div className="frosted">
            <div className="backdrop" />
          </div>
          <div className="absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 p-4 mt-24 sm:mt-0 sm:p-0 space-y-2">
            <h4 className="text-2xl sm:text-5xl">A timeless legacy welcomes a new beginning</h4>
            <p className="mt-2 sm:mt-12 text-md sm:text-2xl">
              The iconic beachfront hideaway — once home to One&Only — enters a new chapter.
            </p>
            <p className="text-md sm:text-2xl">
              Soon to be reimagined as a contemporary luxury wellness resort, this award-winning
              destination will pair world-class hospitality and the unmistakable touch of legendary
              architect Kerry Hill with a fresh perspective under a globally-renowned name.
            </p>
            <p className="text-md sm:text-2xl">
              As the transformation unfolds, the resort remains open and ready to welcome guests.
              From beachside lounging and enriching activities for little ones to curated dining and
              indulgent spa treatments, signature experiences continue, uninterrupted.
            </p>
            <p className="text-md sm:text-2xl">
              Reservation enquiries can be made by calling +607 878 3400 or via WhatsApp at +6019
              770 1359.
            </p>
          </div>
        </div>
      )}

      {/* Top Center Logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-30 select-none">
        <h1
          className={`${
            current === 4 ? "text-black/80" : "text-white"
          } text-5xl font-bold font-heldane tracking-wide drop-shadow-lg transition-colors duration-10()0`}
        >
          The Sirēya
        </h1>
      </div>
    </div>
  )
}
