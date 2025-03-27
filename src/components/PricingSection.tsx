import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

const PricingPlan = ({ name, price, description, features, popular = false, delay = 0 }: PricingPlanProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`rounded-xl p-8 transition-all duration-700 ease-out opacity-0 translate-y-8 border ${
        popular 
          ? 'border-gold-500 shadow-[0_0_30px_rgba(255,194,51,0.15)]' 
          : 'border-border shadow-lg'
      }`}
    >
      {popular && (
        <div className="py-1 px-3 bg-gold-500 text-black text-xs font-bold rounded-full inline-block mb-4">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground ml-2">/month</span>
      </div>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      <Button 
        className={`w-full mb-8 ${
          popular 
            ? 'bg-gold-500 hover:bg-gold-600 text-black' 
            : ''
        }`}
        variant={popular ? 'default' : 'outline'}
      >
        Get Started
      </Button>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-gold-500 mr-2 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div id="pricing" className="py-24 bg-muted/50">
      <div 
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-4">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that fits your lifestyle and frequency of going out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingPlan 
            name="Casual"
            price="$0.01"
            description="For those who want an absurdly priced basic experience."
            features={[
              "Access to placeholder features",
              "Occasional availability of the app",
              "Reservations at restaurants that may exist",
              "We might answer your emails",
              "The button might work"
            ]}
            delay={100}
          />
          <PricingPlan 
            name="VIP"
            price="$99,999"
            description="Ridiculously overpriced with imaginary premium benefits."
            features={[
              "All the placeholder features you can imagine",
              "Reservations at restaurants that don't exist yet",
              "Rides in vehicles that may be cars",
              "We'll pretend to know you when you call",
              "Access to 'exclusive' imaginary venues",
              "A digital badge that says you spent too much",
              "The satisfaction of seeing this placeholder text"
            ]}
            popular={true}
            delay={200}
          />
        </div>
      </div>
    </div>
  );
};
