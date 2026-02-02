import React, { useState } from 'react';
import { ArrowRight, Database, Activity, Lock } from 'lucide-react';

interface CTAProps {
  onStart?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onStart }) => {
  return (
    <section className="w-full py-16 px-4 text-center bg-[#F0EDE6] dark:bg-[#0F1219] transition-colors duration-500">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <button 
          onClick={onStart}
          id="primary-cta"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-zen-text text-white rounded-lg hover:bg-zen-accent transition-all duration-300 shadow-lg hover:shadow-zen-accent/30 hover:-translate-y-1"
        >
          <span className="font-sans font-medium text-lg tracking-wide">
            [ Unlock Your Exclusive 2026 Strategy ]
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="mt-6 text-sm font-serif italic text-zen-text/60 mb-12">
          "Knowing destiny is to better rewrite it."
        </p>

        {/* Trust / Credibility Bar - Moved from Hero */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-8 py-4 border-t border-zen-text/5 bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-full">
             <div className="flex items-center gap-2 text-zen-text/40 dark:text-zen-subtle/40 group hover:text-zen-text/80 dark:hover:text-white/80 transition-colors cursor-default">
                <Database className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase">5,000YRS Algorithm</span>
             </div>
             <div className="flex items-center gap-2 text-zen-text/40 dark:text-zen-subtle/40 group hover:text-zen-text/80 dark:hover:text-white/80 transition-colors cursor-default">
                <Activity className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase">Scientific Mysticism</span>
             </div>
             <div className="flex items-center gap-2 text-zen-text/40 dark:text-zen-subtle/40 group hover:text-zen-text/80 dark:hover:text-white/80 transition-colors cursor-default">
                <Lock className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase">Zero-Knowledge Privacy</span>
             </div>
        </div>

      </div>
    </section>
  );
};

export default CTA;