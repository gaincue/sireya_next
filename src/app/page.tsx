"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import React from "react"

const images = ["/1_desktop.png", "/2_desktop.png", "/3_desktop.png", "/4_desktop.png"]
const imagesMobile = ["/1_mobile.png", "/2_mobile.png", "/3_mobile.png", "/4_mobile.png"]

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

  useEffect(() => {
    function startInterval() {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % imagesToShow.length)
      }, 8000)
    }
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [imagesToShow.length])

  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesToShow.length)
    }, 8000)
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
          key={src}
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

      {/* Top Center Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 select-none">
        <h1 className="text-white text-4xl font-bold font-heldane tracking-wide drop-shadow-lg">
          The Sirēya
        </h1>
      </div>

      {/* Bottom Left Headline */}
      <div className="absolute bottom-8 left-8 z-20 select-none">
        <h4 className="text-white text-2xl sm:text-4xl font-semibold font-heldane drop-shadow-xl">
          Descriptions
        </h4>
      </div>

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-8 right-8 z-20 select-none">
        <h4 className="text-white text-sm sm:text-xl font-semibold font-heldane drop-shadow-xl">
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
    </div>
  )
}
