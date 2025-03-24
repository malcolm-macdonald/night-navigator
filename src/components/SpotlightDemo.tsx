
"use client";
import React from "react";
import { Spotlight, GridBackground } from "@/components/ui/spotlight";

export function SpotlightDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <GridBackground />
      <Spotlight 
        // Reducing intensity by adjusting opacity values in gradients
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(40, 100%, 55%, .15) 0, hsla(40, 100%, 55%, .08) 50%, hsla(40, 100%, 45%, .03) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 55%, .10) 0, hsla(40, 100%, 55%, .05) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(40, 100%, 55%, .08) 0, hsla(40, 100%, 45%, .05) 80%, transparent 100%)"
        // Reducing overall size for less visual dominance
        width={600}
        smallWidth={250}
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center gold-gradient">
          Perfect Plan
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Your ultimate night planner - automatically booking restaurants, scheduling rides, and curating unforgettable experiences.
        </p>
      </div>
    </div>
  );
}
