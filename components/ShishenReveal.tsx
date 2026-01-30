import React, { useState, useEffect } from 'react';
import { Landmark, Shield, Brain, Zap, ChevronDown, Lock } from 'lucide-react';

interface ShishenRevealProps {
  onComplete?: () => void;
}

type RevealPhase = 'PULSE' | 'IMPACT' | 'REVEAL' | 'STABLE';

const ShishenReveal: React.FC<ShishenRevealProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<RevealPhase>('PULSE');

  useEffect(() => {
    // 1. The Pulse (0-1s)
    const t1 = setTimeout(() => setPhase('IMPACT'), 1000);
    // 2. The Reveal (1.5s)
    const t2 = setTimeout(() => setPhase('REVEAL'), 1500);
    // 3. Interaction Ready (2.5s)
    const t3 = setTimeout(() => setPhase('STABLE'), 2500);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
  }, []);

  // Handle progression logic
  const handleProceed = () => {
    if (phase === 'STABLE' && onComplete) {
        onComplete();
    }
  };

  // Add Scroll Listener for natural progression
  useEffect(() => {
    const handleScroll = (e: Event) => {
        if (phase === 'STABLE') {
            // Debounce slightly or just trigger
            handleProceed();
        }
    };

    if (phase === 'STABLE') {
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchmove', handleScroll);
        window.addEventListener('keydown', handleScroll); // Allow any key
    }

    return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
        window.removeEventListener('keydown', handleScroll);
    };
  }, [phase, onComplete]);

  return (
    <div 
        onClick={handleProceed}
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-zen-bg transition-colors duration-100 
        ${phase === 'IMPACT' ? 'bg-white' : ''}
        ${phase === 'STABLE' ? 'cursor-pointer' : ''}
        `}
    >
      
      {/* 0. Background Elements (Visible only after Impact) */}
      {(phase === 'REVEAL' || phase === 'STABLE') && (
         <>
            {/* God Rays */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] god-rays animate-rays pointer-events-none" />
            
            {/* Ambient Particles */}
            <div className="absolute inset-0 bg-dot-grid opacity-30 animate-pulse-slow pointer-events-none" />
         </>
      )}

      {/* 1. The Pulse: Energy Gathering */}
      {phase === 'PULSE' && (
        <div className="relative flex items-center justify-center pointer-events-none">
            <div className="absolute w-96 h-96 rounded-full border border-zen-accent opacity-0 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="w-4 h-4 bg-zen-accent rounded-full animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite_reverse]" />
            <span className="absolute mt-24 font-mono text-xs text-zen-text/40 tracking-[0.3em]">SYNCHRONIZING DESTINY...</span>
        </div>
      )}

      {/* 2. The Impact: Screen Shake Container */}
      <div className={`relative z-10 w-full max-w-md px-6 ${phase === 'IMPACT' ? 'animate-shake' : ''}`}>
        
        {/* 3. The Card Reveal */}
        {(phase === 'REVEAL' || phase === 'STABLE') && (
            <div className="animate-slam perspective-[1000px]">
                
                {/* CARD BODY */}
                <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl border border-zen-accent/40 rounded-[2rem] shadow-[0_0_50px_rgba(193,154,107,0.2)] hover:bg-white/50 transition-colors duration-500">
                    
                    {/* Inner Glow Border */}
                    <div className="absolute inset-0 rounded-[2rem] border border-white/50 pointer-events-none z-20" />
                    
                    {/* Card Content Container */}
                    <div className="relative z-10 flex flex-col items-center pt-16 pb-12 px-8 text-center">
                        
                        {/* ILLUSTRATION */}
                        <div className="mb-8 relative group">
                            <div className="absolute inset-0 bg-zen-accent/20 blur-3xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-1000" />
                            <Landmark 
                                className="w-32 h-32 text-zen-text drop-shadow-2xl relative z-10" 
                                strokeWidth={1}
                            />
                            {/* Decorative Halo */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-spin-slow opacity-30 pointer-events-none" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeDasharray="4 4" />
                            </svg>
                        </div>

                        {/* TITLES */}
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zen-text mb-2 animate-text-explode">
                            THE ARCHITECT
                        </h1>
                        <h2 className="text-xl font-serif text-zen-accent mb-8 italic tracking-widest border-b border-zen-accent/30 pb-2 inline-block">
                            正印格
                        </h2>

                        {/* TRAITS & FORECAST */}
                        <div className="w-full space-y-6">
                            <p className="font-serif text-zen-text/80 text-lg leading-relaxed italic">
                                "作为‘正印’格的化身，你天生携带保护能量。在 2026 年，你不是士兵，而是构建秩序的建筑师。"
                            </p>

                            {/* ATTRIBUTES BARS */}
                            <div className="space-y-3 pt-4 w-full">
                                <AttributeRow label="RESILIENCE" value={92} delay={500} phase={phase} />
                                <AttributeRow label="LOGIC" value={88} delay={700} phase={phase} />
                                <AttributeRow label="STABILITY" value={95} delay={900} phase={phase} />
                            </div>

                            {/* CRITICAL INSIGHT BOX */}
                            <div className="mt-8 bg-zen-text text-zen-bg p-6 rounded-xl border border-zen-accent/30 text-left relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Lock className="w-12 h-12" />
                                </div>
                                <span className="block text-xs font-mono text-zen-accent tracking-widest mb-2">CRITICAL FORECAST 2026</span>
                                <p className="font-serif text-sm leading-relaxed opacity-90">
                                    明年通过建立系统而非个人努力来获取财富。警惕过度思考导致的行动瘫痪。
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* DECORATIVE CORNERS */}
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-zen-text/30" />
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-zen-text/30" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-zen-text/30" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zen-text/30" />
                </div>

                {/* SCROLLING HINT (Appears last) */}
                <div 
                    className={`mt-12 flex flex-col items-center gap-2 transition-all duration-1000 w-full group ${phase === 'STABLE' ? 'opacity-100' : 'opacity-0'}`}
                >
                    <span className="text-[10px] font-mono tracking-[0.2em] text-zen-text/60 animate-pulse group-hover:text-zen-accent transition-colors">
                        SCROLL OR CLICK TO DECODE FOUNDATION
                    </span>
                    <ChevronDown className="w-4 h-4 text-zen-accent animate-bounce group-hover:translate-y-1 transition-transform" />
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

// Sub-component for progress bars
const AttributeRow = ({ label, value, delay, phase }: { label: string, value: number, delay: number, phase: RevealPhase }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (phase === 'STABLE') {
            setTimeout(() => setWidth(value), delay);
        }
    }, [phase, value, delay]);

    return (
        <div className="flex items-center gap-4 text-xs font-mono">
            <span className="w-20 text-right text-zen-text/60 tracking-wider">{label}</span>
            <div className="flex-1 h-1 bg-zen-text/5 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-zen-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                />
            </div>
            <span className="w-8 text-zen-accent">{width}%</span>
        </div>
    );
};

export default ShishenReveal;