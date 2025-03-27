
"use client";
import React from "react";
import { Spotlight, GridBackground } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SpotlightDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <GridBackground />
      <Spotlight
        className="-top-40 right-10 md:right-80 md:-top-20"
        fill="#FFC233"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center">
        <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-6 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-gold-500 mr-2"></span>
          Introducing Perfect Plan
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up mx-auto">
          Your Night, <span className="font-playfair italic text-gold-gradient">Perfected</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up">
          Effortlessly plan your perfect night out with personalized recommendations,
          automated reservations, and seamless transportation — all in one elegant platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black">
            Start Planning <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950">
            View Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
