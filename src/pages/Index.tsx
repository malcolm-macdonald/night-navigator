
import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorks } from '@/components/HowItWorks';
import { PricingSection } from '@/components/PricingSection';
import { BookingInterface } from '@/components/BookingInterface';
import { Footer } from '@/components/Footer';
import { SpotlightDemo } from '@/components/SpotlightDemo';

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SpotlightDemo />
      <FeaturesSection />
      <BookingInterface />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
