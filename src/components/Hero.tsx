
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/95">
      <div 
        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-300 to-transparent"
      ></div>
      
      <div 
        ref={heroRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 flex flex-col items-center text-center opacity-0 transition-opacity duration-1000"
      >
        <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-6 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-gold-500 mr-2"></span>
          Introducing Perfect Plan
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          Your Night, <span className="text-gold-gradient">Perfected</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 animate-fade-up" style={{ animationDelay: '400ms' }}>
          Effortlessly plan your perfect night out with AI-powered recommendations,
          automated reservations, and seamless transportation — all in one elegant platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black">
            Start Planning <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-950">
            View Demo
          </Button>
        </div>
        
        <div className="relative w-full max-w-4xl h-[420px] rounded-2xl overflow-hidden shadow-2xl animate-fade-up glass-card" style={{ animationDelay: '800ms' }}>
          <div className="absolute inset-0 bg-black/80">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center">
                  <Calendar className="h-5 w-5 text-gold-500 mr-3" />
                  <div>
                    <p className="text-xs text-white/70">Reservation</p>
                    <p className="text-sm font-medium text-white">8:30 PM · Bella Italia</p>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center">
                  <MapPin className="h-5 w-5 text-gold-500 mr-3" />
                  <div>
                    <p className="text-xs text-white/70">Transportation</p>
                    <p className="text-sm font-medium text-white">Premium Uber at 8:00 PM</p>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center">
                  <Clock className="h-5 w-5 text-gold-500 mr-3" />
                  <div>
                    <p className="text-xs text-white/70">After Dinner</p>
                    <p className="text-sm font-medium text-white">Jazz Club · 10:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
