
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Users, Utensils, Music } from 'lucide-react';

export const BookingInterface = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
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

  const tabs = [
    { icon: <Calendar className="h-5 w-5" />, label: "When" },
    { icon: <Users className="h-5 w-5" />, label: "Who" },
    { icon: <Utensils className="h-5 w-5" />, label: "Dining" },
    { icon: <Music className="h-5 w-5" />, label: "Activities" },
    { icon: <MapPin className="h-5 w-5" />, label: "Location" },
  ];

  const getTabContent = (tab: number) => {
    switch (tab) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Starting Time
                </label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  2-3 hours
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  4-5 hours
                </Button>
                <Button variant="outline" size="sm">
                  6+ hours
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="people" className="text-sm font-medium">
                Number of People
              </label>
              <Input id="people" type="number" min="1" placeholder="2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="occasion" className="text-sm font-medium">
                Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Date Night
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Friends Gathering
                </Button>
                <Button variant="outline" size="sm">
                  Birthday
                </Button>
                <Button variant="outline" size="sm">
                  Business
                </Button>
                <Button variant="outline" size="sm">
                  Other
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cuisine" className="text-sm font-medium">
                Preferred Cuisine
              </label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Italian
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Japanese
                </Button>
                <Button variant="outline" size="sm">
                  French
                </Button>
                <Button variant="outline" size="sm">
                  American
                </Button>
                <Button variant="outline" size="sm">
                  Any
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Budget
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  $
                </Button>
                <Button variant="outline" size="sm">
                  $$
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  $$$
                </Button>
                <Button variant="outline" size="sm">
                  $$$$
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="dietary" className="text-sm font-medium">
                Dietary Restrictions
              </label>
              <Input id="dietary" placeholder="Vegetarian, gluten-free, etc." />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Activities Interest
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Live Music
                </Button>
                <Button variant="outline" size="sm">
                  Dancing
                </Button>
                <Button variant="outline" size="sm">
                  Cocktail Bars
                </Button>
                <Button variant="outline" size="sm">
                  Wine Tasting
                </Button>
                <Button variant="outline" size="sm">
                  Comedy Show
                </Button>
                <Button variant="outline" size="sm">
                  Rooftop Bars
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="preferences" className="text-sm font-medium">
                Ambiance Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Quiet
                </Button>
                <Button variant="outline" size="sm">
                  Trendy
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Elegant
                </Button>
                <Button variant="outline" size="sm">
                  Casual
                </Button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Starting Location
              </label>
              <Input id="location" placeholder="Enter address or location" />
            </div>
            <div className="space-y-2">
              <label htmlFor="radius" className="text-sm font-medium">
                Distance Willing to Travel
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Nearby (&lt;1 mi)
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Local (&lt;5 mi)
                </Button>
                <Button variant="outline" size="sm">
                  Any Distance
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="transport" className="text-sm font-medium">
                Transportation Preferences
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gold-50 text-gold-900 border-gold-300">
                  Uber
                </Button>
                <Button variant="outline" size="sm">
                  Public Transit
                </Button>
                <Button variant="outline" size="sm">
                  Walking
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-24 relative overflow-hidden">
      <div 
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-4 sm:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gold-50 dark:bg-gold-900/20 px-3 py-1 text-sm font-medium text-gold-900 dark:text-gold-300 mb-4">
            Try It Now
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your Perfect Evening
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our intuitive booking interface and create your perfect night out in minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-5 border-b border-border">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center justify-center p-4 text-sm transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-background text-gold-500 border-b-2 border-gold-500'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="mb-1">{tab.icon}</div>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            {getTabContent(activeTab)}
            
            <div className="mt-8 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                disabled={activeTab === 0}
              >
                Previous
              </Button>
              
              {activeTab < tabs.length - 1 ? (
                <Button 
                  className="bg-gold-500 hover:bg-gold-600 text-black"
                  onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button className="bg-gold-500 hover:bg-gold-600 text-black">
                  Create Plan
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
