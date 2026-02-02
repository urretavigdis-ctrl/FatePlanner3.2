import React, { useEffect, useState, useRef } from 'react';
import { User, Globe, Moon, Sun, Menu, X, ArrowRight, LogIn } from 'lucide-react';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zen-text dark:text-zen-subtle transition-colors group-hover:text-zen-accent">
    <path 
      d="M8 26V8C8 6.89543 8.89543 6 10 6H16C20.4183 6 24 9.58172 24 14C24 18.4183 20.4183 22 16 22H8" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Initialize from system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Scroll Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show if near top (e.g., within 10px)
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Scrolling Down -> Hide
      else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu on scroll down
      } 
      // Scrolling Up -> Show
      else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Click Outside to Hide (Immersive Mode)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const header = document.querySelector('header');
      // Only hide if click is outside header
      if (header && !header.contains(e.target as Node)) {
          setIsVisible(false);
          setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
        className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-card border-b border-zen-accent/20 dark:border-white/10 transition-transform duration-500 ease-in-out ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={scrollToTop}
        role="button"
        aria-label="Return to top"
      >
        {/* Logo Icon */}
        <Logo />
        {/* Logo Text */}
        <span className="font-sans text-2xl font-bold tracking-tight text-zen-text dark:text-zen-subtle transition-colors group-hover:text-zen-accent">
            FatePlanner
        </span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6 relative">
        {/* Login - Visible on Desktop */}
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-zen-text dark:text-zen-subtle hover:text-zen-accent transition-colors">
            <span>Login</span>
        </button>

        {/* Get Started CTA - Visible on Desktop */}
        <button 
             onClick={() => document.getElementById('bento-grid')?.scrollIntoView({ behavior: 'smooth' })}
             className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-zen-text dark:bg-zen-subtle text-zen-bg dark:text-zen-text rounded-full text-sm font-bold tracking-wide hover:bg-zen-accent transition-colors shadow-sm hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
        >
            <span>Get Started</span>
            <ArrowRight className="w-3 h-3" />
        </button>

        {/* Menu Toggle */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-zen-text dark:text-zen-subtle hover:text-zen-accent transition-colors relative z-50 rounded-full hover:bg-zen-text/5"
        >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
            <>
                {/* Backdrop to close */}
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsMenuOpen(false)} />
                
                {/* Dropdown Content */}
                <div className="absolute top-full right-0 mt-4 w-64 bg-white/95 dark:bg-[#1A1F2E]/95 backdrop-blur-xl border border-zen-accent/20 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 animate-in slide-in-from-top-2 fade-in duration-200 z-50 overflow-hidden">
                    
                    {/* Mobile only buttons */}
                    <div className="md:hidden flex flex-col gap-1 mb-2 border-b border-zen-text/5 pb-2">
                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-zen-text/5 text-zen-text dark:text-zen-subtle text-sm font-medium transition-colors">
                           <span>Login</span>
                           <LogIn className="w-4 h-4 opacity-50" />
                        </button>
                         <button 
                            onClick={() => {
                                document.getElementById('bento-grid')?.scrollIntoView({ behavior: 'smooth' });
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zen-text text-white text-sm font-bold mt-1"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Language Switch */}
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-zen-text/5 text-zen-text dark:text-zen-subtle text-sm font-medium transition-colors group">
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-zen-text/60 group-hover:text-zen-accent transition-colors" />
                            <span>Language</span>
                        </div>
                        <span className="text-xs font-mono text-zen-text/40 bg-zen-text/5 px-1.5 py-0.5 rounded">EN</span>
                    </button>

                    {/* Theme Switch */}
                    <button 
                        onClick={() => setIsDark(!isDark)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-zen-text/5 text-zen-text dark:text-zen-subtle text-sm font-medium transition-colors group">
                        <div className="flex items-center gap-3">
                            {isDark ? 
                                <Sun className="w-4 h-4 text-zen-text/60 group-hover:text-zen-accent transition-colors" /> : 
                                <Moon className="w-4 h-4 text-zen-text/60 group-hover:text-zen-accent transition-colors" />
                            }
                            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                        </div>
                    </button>

                    {/* Profile */}
                    <div className="border-t border-zen-text/5 mt-1 pt-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zen-text/5 text-zen-text dark:text-zen-subtle text-sm font-medium transition-colors group">
                             <div className="w-8 h-8 rounded-full bg-zen-text/10 flex items-center justify-center text-zen-text/60 group-hover:text-zen-accent group-hover:bg-zen-accent/10 transition-colors">
                                <User className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col items-start">
                                <span>Profile</span>
                                <span className="text-[10px] text-zen-text/40">Personal Dashboard</span>
                             </div>
                        </button>
                    </div>

                </div>
            </>
        )}
      </div>
    </header>
  );
};

export default Header;