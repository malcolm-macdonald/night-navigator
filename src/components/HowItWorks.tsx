
import React, { useEffect, useRef } from 'react';
import { Calendar, Settings, Compass, Check } from 'lucide-react';

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    itemRefs.current.forEach((ref) => {
      if (ref) {
        const itemObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              itemObserver.unobserve(entry.target);
            }
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
          }
        );
        
        itemObserver.observe(ref);
        
        return () => {
          itemObserver.unobserve(ref);
        };
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-300/20 via-transparent to-transparent"></div>
      
      <div 
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-4">
            Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Perfect Plan Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planning your perfect night out is simple and intuitive with our streamlined process.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gold-400 to-gold-500/30 hidden md:block"></div>

          <div className="space-y-32 md:space-y-32">
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div 
                ref={(el) => (itemRefs.current[0] = el)}
                className="transition-all duration-700 ease-out opacity-0 translate-y-8 md:text-right"
              >
                <div className="md:pr-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 mb-4">
                    <Calendar className="h-8 w-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Share Your Preferences</h3>
                  <p className="text-muted-foreground">
                    Tell us what you enjoy: cuisine types, atmosphere preferences, budget constraints, and any special requirements.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex justify-center relative">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-600 bg-background shadow-md">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-background">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 items-center mt-24">
              <div className="hidden md:flex justify-center relative">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-600 bg-background shadow-md">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-background">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => (itemRefs.current[1] = el)}
                className="transition-all duration-700 ease-out opacity-0 translate-y-8 md:delay-300"
              >
                <div className="md:pl-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 mb-4">
                    <Settings className="h-8 w-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">We Create Your Plan</h3>
                  <p className="text-muted-foreground">
                    Our system analyzes your preferences, checks availability, and crafts a perfectly timed evening itinerary.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 items-center mt-24">
              <div 
                ref={(el) => (itemRefs.current[2] = el)}
                className="transition-all duration-700 ease-out opacity-0 translate-y-8 md:text-right md:delay-600"
              >
                <div className="md:pr-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 mb-4">
                    <Compass className="h-8 w-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Review and Customize</h3>
                  <p className="text-muted-foreground">
                    Fine-tune your itinerary with our intuitive interface, making adjustments until it's exactly what you want.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex justify-center relative">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-600 bg-background shadow-md">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-background">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 items-center mt-24">
              <div className="hidden md:flex justify-center relative">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-600 bg-background shadow-md">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-background">
                      <span className="text-sm font-bold">4</span>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => (itemRefs.current[3] = el)}
                className="transition-all duration-700 ease-out opacity-0 translate-y-8 md:delay-900"
              >
                <div className="md:pl-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 dark:bg-gold-900/30 mb-4">
                    <Check className="h-8 w-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Confirm and Enjoy</h3>
                  <p className="text-muted-foreground">
                    With one click, confirm all reservations and transportation. Then simply follow the plan for a perfectly executed evening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
