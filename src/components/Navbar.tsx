
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'py-4 bg-background/80 backdrop-blur-xl shadow-sm'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-2xl font-bold tracking-tight text-gold-gradient"
          >
            Perfect Plan
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-gold-500 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-gold-500 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-gold-500 transition-colors">
            Pricing
          </a>
          <Button variant="link" className="text-sm font-medium hover:text-gold-500 transition-colors">
            Log In
          </Button>
          <Button className="bg-gold-500 hover:bg-gold-600 text-black">
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-gold-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-gold-500 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-gold-500 transition-colors"
            >
              Pricing
            </a>
            <Button variant="link" className="text-lg font-medium hover:text-gold-500 transition-colors">
              Log In
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gold-500 hover:bg-gold-600 text-black"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
