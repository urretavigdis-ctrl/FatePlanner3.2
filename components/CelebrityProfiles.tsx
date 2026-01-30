import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Fingerprint, Hexagon, Lock } from 'lucide-react';

// --- DATA ---
const CELEBRITIES = [
  {
    id: 'elon',
    name: 'Elon Musk',
    role: 'Technoking',
    initials: 'EM',
    bazi: 'Metal Pig (辛亥)',
    structure: 'Seven Killings (七杀格)', 
    structureEn: 'The Disruptor',
    analysis: '辛金 (Yin Metal) 坐亥水 (Water). In Bazi logic, this is "Jewelry washed by clear water" (金白水清). However, his chart is dominated by the "Seven Killings" star (七杀), which represents extreme pressure, risk-taking, and the ability to thrive in chaos. This structure explains his relentless drive to overturn established industries regardless of conventional stability.',
    element: 'Metal (金)',
    strength: '98%',
    color: '#6B8BA4' 
  },
  {
    id: 'taylor',
    name: 'Taylor Swift',
    role: 'Cultural Icon',
    initials: 'TS',
    bazi: 'Earth Snake (己巳)',
    structure: 'Hurting Officer (伤官配印)', 
    structureEn: 'The Creator',
    analysis: '己土 (Yin Earth) born in winter but sitting on Fire (Snake). The "Hurting Officer" (伤官) star is the source of artistic rebellion and expression, allowing her to transmute personal emotion into public art. The "Seal" (印) ensures this expression builds a lasting legacy rather than fleeting fame.',
    element: 'Earth (土)',
    strength: '96%',
    color: '#C19A6B' 
  },
  {
    id: 'zuck',
    name: 'Mark Zuckerberg',
    role: 'Meta Architect',
    initials: 'MZ',
    bazi: 'Water Rat (壬子)',
    structure: 'Yang Ren (羊刃格)', 
    structureEn: 'The Conqueror',
    analysis: '壬水 (Yang Water) sitting on its own peak (Rat/Empirical Star). This constitutes the "Yang Ren" (Goat Blade) structure. It represents unyielding competitiveness and a "winner-takes-all" mentality. Like a tsunami, Yang Water energy is expansive, pervasive, and difficult to contain once momentum is built.',
    element: 'Water (水)',
    strength: '95%',
    color: '#1D4ED8' 
  },
   {
    id: 'jensen',
    name: 'Jensen Huang',
    role: 'Chip Titan',
    initials: 'JH',
    bazi: 'Water Rabbit (癸卯)',
    structure: 'Food God (食神生财)', 
    structureEn: 'The Strategist',
    analysis: '癸水 (Yin Water) nurturing the Rabbit (Wood). Wood represents the "Food God" (食神)—the star of intellect, strategy, and long-term output. Unlike the aggressive Seven Killings, this structure generates wealth through superior product logic and relentless technical precision over decades.',
    element: 'Water (水)',
    strength: '92%',
    color: '#76A07B' 
  },
   {
    id: 'sam',
    name: 'Sam Altman',
    role: 'AI Pioneer',
    initials: 'SA',
    bazi: 'Wood Ox (乙丑)',
    structure: 'Indirect Wealth (偏财格)', 
    structureEn: 'The Weaver',
    analysis: '乙木 (Yin Wood) rooted in the Ox (Wet Earth). Yin Wood is vine-like, capable of navigating complex structures to reach the sunlight. The "Indirect Wealth" pattern indicates a unique ability to leverage external resources (capital, talent, computing power) rather than producing solely through manual labor.',
    element: 'Wood (木)',
    strength: '90%',
    color: '#EAB308' 
  },
  {
    id: 'vitalik',
    name: 'Vitalik Buterin',
    role: 'Crypto Founder',
    initials: 'VB',
    bazi: 'Fire Dog (丙戌)',
    structure: 'Indirect Resource (偏印格)', 
    structureEn: 'The Visionary',
    analysis: '丙火 (Yang Fire) sits on the Dog (Fire storage). The "Indirect Resource" (偏印) star is the signature of the eccentric genius—obsession with abstract concepts, non-traditional structures, and philosophical depth. It explains his capability to envision decentralized protocols that defy conventional logic.',
    element: 'Fire (火)',
    strength: '94%',
    color: '#9333EA' 
  }
];

// Duplicate data 4 times to ensure smooth infinite looping on large screens
const SCROLL_ITEMS = [...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES];

const CelebrityProfiles: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<typeof CELEBRITIES[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // --- INFINITE AUTO SCROLL LOGIC ---
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (scrollRef.current && !isPaused && !isDragging) {
        // 1. Move scroll position
        scrollRef.current.scrollLeft += 0.8; 

        // 2. Check for Loop
        // The list is duplicated 4 times. One "set" is scrollWidth / 4.
        // We scroll until the first set is completely gone, then snap back to 0.
        const oneSetWidth = scrollRef.current.scrollWidth / 4;
        
        if (scrollRef.current.scrollLeft >= oneSetWidth) {
           // Seamlessly snap back to start (minus the small overshoot)
           scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - oneSetWidth;
        }

        // 3. Update Progress Bar (0-100% of ONE set)
        const progress = (scrollRef.current.scrollLeft / oneSetWidth) * 100;
        setScrollProgress(progress);
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  // --- DRAG INTERACTION ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    if(scrollRef.current) {
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeftStart.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Drag multiplier
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // --- SLIDER INTERACTION ---
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      setScrollProgress(val);
      
      if (scrollRef.current) {
          const oneSetWidth = scrollRef.current.scrollWidth / 4;
          scrollRef.current.scrollLeft = (val / 100) * oneSetWidth;
      }
  };

  return (
    <section className="py-24 w-full bg-[#F0EDE6] dark:bg-[#050B14] border-t border-zen-text/5 transition-colors duration-500 overflow-hidden relative select-none">
      
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-zen-text dark:text-zen-subtle mb-4">
            Decrypted Cases
        </h2>
        <p className="font-sans text-zen-text/60 dark:text-zen-subtle/60">
            View the algorithmic decoding of global figures.
        </p>
      </div>

      {/* --- CAROUSEL TRACK --- */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden pb-12 pt-4 px-4 items-start"
            style={{ 
                // Hide scrollbar but keep functionality
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none' 
            }}
        >
            {SCROLL_ITEMS.map((item, idx) => (
                <button 
                    key={`${item.id}-${idx}`}
                    onClick={() => setSelectedProfile(item)}
                    className="flex-shrink-0 group flex flex-col items-center gap-4 w-32 md:w-40 focus:outline-none transition-transform duration-300 hover:-translate-y-2"
                >
                    {/* Avatar */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-zen-text/5 dark:bg-white/5 border border-zen-text/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-zen-accent group-hover:shadow-lg overflow-hidden">
                        <span className="font-serif text-xl md:text-2xl font-bold text-zen-text dark:text-zen-subtle group-hover:text-zen-accent transition-colors">
                            {item.initials}
                        </span>
                        
                        {/* Hover Overlay Icon */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                <Fingerprint className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    
                    {/* Text Info */}
                    <div className="text-center">
                        <h3 className="font-serif font-bold text-zen-text dark:text-zen-subtle text-base group-hover:text-zen-accent transition-colors whitespace-nowrap">
                            {item.name}
                        </h3>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zen-text/40 dark:text-zen-subtle/40 mt-1">
                            {item.role}
                        </p>
                    </div>
                </button>
            ))}
        </div>
      </div>

      {/* --- DRAG BAR --- */}
      <div className="max-w-xs mx-auto px-6 relative z-10 -mt-2">
          <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-zen-text/30 dark:text-white/30">SCROLL</span>
              <input 
                type="range" 
                min="0" 
                max="100"
                step="0.1"
                value={scrollProgress} 
                onChange={handleSliderChange}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                className="w-full h-1 bg-zen-text/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:bg-zen-accent [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:h-2 hover:[&::-webkit-slider-thumb]:bg-zen-text dark:hover:[&::-webkit-slider-thumb]:bg-white transition-all"
              />
              <span className="text-[10px] font-mono text-zen-text/30 dark:text-white/30">DRAG</span>
          </div>
      </div>

      {/* Modal - Simplified */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4">
             <div 
                className="absolute inset-0 bg-zen-bg/80 dark:bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" 
                onClick={() => setSelectedProfile(null)}
             />
             
             <div className="relative w-full max-w-lg bg-white dark:bg-[#1A1F2E] border border-zen-text/10 rounded-2xl shadow-2xl animate-slam overflow-hidden">
                
                <button 
                    onClick={() => setSelectedProfile(null)}
                    className="absolute top-4 right-4 p-2 text-zen-text/30 hover:text-zen-text transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-full bg-zen-text/5 flex items-center justify-center text-2xl font-serif font-bold text-zen-text dark:text-white border border-zen-text/10">
                            {selectedProfile.initials}
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-zen-text dark:text-white">
                                {selectedProfile.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-mono text-zen-accent uppercase px-2 py-0.5 bg-zen-accent/10 rounded">
                                    {selectedProfile.bazi}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div className="p-4 bg-zen-text/5 dark:bg-white/5 rounded-lg border-l-2 border-zen-accent">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono text-zen-text/50 dark:text-white/50 uppercase">Archetype</span>
                                <span className="text-sm font-bold text-zen-text dark:text-white">{selectedProfile.structureEn}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-xs font-mono text-zen-text/50 dark:text-white/50 uppercase">Structure</span>
                                <span className="text-sm font-serif text-zen-text/80 dark:text-white/80">{selectedProfile.structure}</span>
                             </div>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-zen-text dark:text-white mb-3">
                                <Hexagon className="w-4 h-4 text-zen-accent" />
                                Pattern Logic
                            </h4>
                            <p className="text-sm font-sans text-zen-text/70 dark:text-white/70 leading-relaxed text-justify">
                                {selectedProfile.analysis}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-zen-text/5 flex justify-center">
                            <button className="text-xs font-bold text-zen-accent hover:text-zen-text dark:hover:text-white transition-colors flex items-center gap-2 group">
                                <Lock className="w-3 h-3" />
                                <span>VIEW FULL 2026 PROJECTION</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      )}

    </section>
  );
};

export default CelebrityProfiles;