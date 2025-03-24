
import React, { useEffect, useRef } from 'react';
import { CalendarCheck, Clock, Star, MapPin, Utensils, Music, Car, Wine } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
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
      className="bg-card rounded-xl p-6 transition-all duration-700 ease-out opacity-0 translate-y-8 hover:shadow-lg hover:-translate-y-1 border border-border"
    >
      <div className="bg-gold-600 dark:bg-gold-600 p-3 rounded-lg inline-block mb-4">
        <div className="text-black">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
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
    <div id="features" className="py-24 bg-muted/50">
      <div 
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for the Perfect Night
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform handles all aspects of your evening, from dining reservations to transportation and entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Utensils className="h-6 w-6" />}
            title="Restaurant Bookings"
            description="Instantly book tables at exclusive restaurants based on your preferences and dietary requirements."
            delay={100}
          />
          <FeatureCard 
            icon={<Car className="h-6 w-6" />}
            title="Ride Scheduling"
            description="Schedule Uber rides in advance for seamless transportation throughout your evening."
            delay={200}
          />
          <FeatureCard 
            icon={<Music className="h-6 w-6" />}
            title="Event Tickets"
            description="Secure tickets to shows, concerts, and exclusive events happening in your area."
            delay={300}
          />
          <FeatureCard 
            icon={<Wine className="h-6 w-6" />}
            title="Bar Reservations"
            description="Skip the line with VIP table reservations at trendy bars and nightclubs."
            delay={400}
          />
          <FeatureCard 
            icon={<CalendarCheck className="h-6 w-6" />}
            title="Smart Scheduling"
            description="Optimized evening timeline to ensure seamless transitions between venues."
            delay={500}
          />
          <FeatureCard 
            icon={<Star className="h-6 w-6" />}
            title="Curated Recommendations"
            description="Personalized suggestions based on your preferences, past activities, and trending venues."
            delay={600}
          />
          <FeatureCard 
            icon={<Clock className="h-6 w-6" />}
            title="Real-time Updates"
            description="Get notifications about reservations, transportation, and any schedule changes."
            delay={700}
          />
          <FeatureCard 
            icon={<MapPin className="h-6 w-6" />}
            title="Location Optimization"
            description="Plan your evening around convenient locations to minimize travel time and maximize enjoyment."
            delay={800}
          />
        </div>
      </div>
    </div>
  );
};
