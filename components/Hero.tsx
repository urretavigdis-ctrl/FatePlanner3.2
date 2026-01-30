import React from 'react';
import { Lock, Activity, Database } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center px-4 md:px-0 overflow-hidden bg-[#F9F7F2] dark:bg-[#050B14] transition-colors duration-500">
      
      {/* 0. Background Particles */}
      <ParticleBackground className="absolute inset-0 z-0 opacity-80" />

      {/* 1. Main Headline with Explode Effect */}
      <div className="relative z-10 text-center max-w-5xl mx-auto mb-8">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2D2D] dark:text-[#E5E5E5] leading-[1.1] tracking-tight animate-text-explode opacity-0 [animation-fill-mode:forwards]">
            Master 2026 <br className="md:hidden" />
            <span className="italic text-[#C19A6B] relative inline-block">
                Uncertainty
                {/* Subtle underline decoration */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#C19A6B]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </span>
        </h1>
      </div>

      {/* 2. Sub-headline / Mission Statement */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
        <p className="font-sans text-lg md:text-xl text-[#2D2D2D]/70 dark:text-[#E5E5E5]/70 leading-relaxed font-light">
            In an <span className="font-medium text-[#2D2D2D] dark:text-white">AI-driven</span> era where uncertainty is the only constant, is your intuition enough? 
            <span className="font-medium text-[#2D2D2D] dark:text-white">FatePlanner</span> decodes the hidden <span className="font-medium text-[#2D2D2D] dark:text-white">2026 energetic architecture</span> to build your strategic armor.
        </p>
      </div>

    </section>
  );
};

export default Hero;