import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div className="relative w-screen h-svh overflow-hidden" style={{ touchAction: "pan-y" }}>
      {/* Carousel Images */}
      <Image
        src="/4_desktop.png"
        alt={"Carousel image"}
        fill
        priority
        className="object-cover absolute inset-0 w-full h-full"
        draggable={false}
        unoptimized
      />

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 select-none">
        <h4 className="text-white/40 text-[0.6rem] sm:text-sm font-semibold font-heldane drop-shadow-xl">
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

      {/* backdrop text */}
      <div className="fixed inset-0 z-20 font-heldane">
        <div className="frosted">
          <div className="backdrop" />
        </div>
        <div className="text-black/80 absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 p-4 mt-24 sm:mt-0 sm:p-0 space-y-2 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          <h4 className="text-lg sm:text-3xl xl:text-5xl font-medium">
            A timeless legacy welcomes a new beginning
          </h4>
          <p className="mt-2 sm:mt-4 text-sm sm:text-lg xl:text-2xl">
            The iconic beachfront hideaway — once home to One&Only — enters a new chapter.
          </p>
          <p className="text-sm sm:text-lg xl:text-2xl">
            Soon to be reimagined as a contemporary luxury wellness resort, this award-winning
            destination will pair world-class hospitality and the unmistakable touch of legendary
            architect Kerry Hill with a fresh perspective under a globally-renowned name.
          </p>
          <p className="text-sm sm:text-lg xl:text-2xl">
            As the transformation unfolds, the resort remains open and ready to welcome guests. From
            beachside lounging and enriching activities for little ones to curated dining and
            indulgent spa treatments, signature experiences continue, uninterrupted.
          </p>
          <p className="text-sm sm:text-lg xl:text-2xl">
            Reservation enquiries can be made by calling{" "}
            <a className="underline" href="tel:+6078783400">
              +607 878 3400
            </a>{" "}
            or via WhatsApp at{" "}
            <a className="underline" href="https://wa.me/60197701359">
              +6019 770 1359
            </a>
            .
          </p>
        </div>
      </div>

      <div className="absolute top-8 left-4 right-4 sm:left-12 sm:right-12 z-30 select-none">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-black text-5xl font-bold font-heldane tracking-wide drop-shadow-lg">
            The Sirēya
          </h1>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-none px-3")}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}
