
import React from 'react';
import { Home, Zap, HelpCircle, CreditCard } from 'lucide-react';
import { NavBar } from '@/components/ui/nav-bar';

export const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Features', url: '#features', icon: Zap },
    { name: 'How It Works', url: '#how-it-works', icon: HelpCircle },
    { name: 'Pricing', url: '#pricing', icon: CreditCard }
  ];

  return (
    <div className="relative w-full">
      <div className="absolute top-6 left-8 z-50">
        <a href="/" className="text-xl font-bold tracking-tight text-gold-gradient font-playfair italic">
          Perfect Plan
        </a>
      </div>
      <NavBar items={navItems} className="sm:pt-6" />
    </div>
  );
};
