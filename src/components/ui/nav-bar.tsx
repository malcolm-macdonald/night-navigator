"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallScreen(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => {
        const id = item.url.replace("#", "");
        // Special case for 'home' route
        if (id === "" || id === "/") return { name: item.name, position: 0 };
        
        const element = document.getElementById(id);
        if (!element) return { name: item.name, position: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          name: item.name,
          position: rect.top
        };
      });

      // Find the section closest to the top of viewport
      const activeSection = sections.reduce((prev, curr) => {
        if (curr.position <= 100 && curr.position > -200) {
          return curr;
        }
        return prev;
      }, sections[0]);

      if (activeSection) {
        setActiveTab(activeSection.name);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleNavClick = (name: string, url: string) => {
    setActiveTab(name);
    
    // Special case for Home - scroll to top
    if (url === '/' || url === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Smooth scroll to section
    if (url.startsWith('#')) {
      const id = url.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 w-auto sm:w-auto max-w-[95vw]",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg overflow-x-auto no-scrollbar">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const isHovered = hoveredTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.name, item.url);
              }}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold transition-colors whitespace-nowrap",
                "text-foreground/80 hover:text-white rounded-full",
                isActive && "bg-muted text-white",
                // Adjust padding based on screen size
                isMobile ? "px-3 py-2" : isSmallScreen ? "px-4 py-2" : "px-6 py-2",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && !isHovered && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
              
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 w-full rounded-full -z-10"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold-500/70 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-gold-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-gold-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-gold-500/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
