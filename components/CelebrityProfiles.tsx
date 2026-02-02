import React, { useState, useRef, useEffect } from 'react';
import { 
  X, ArrowRight, Fingerprint, Hexagon, Lock, 
  Database, Activity, History, Info, ExternalLink, 
  Layers, Box, Calendar, BrainCircuit 
} from 'lucide-react';

// --- TYPES ---

interface Pillar {
  stem: { char: string; en: string; element: string; god: string };
  branch: { char: string; en: string; element: string; god: string };
}

interface Event {
  year: string;
  title: string;
  description: string;
  logic: string;
}

interface Celebrity {
  id: string;
  name: string;
  title: string; // "Role"
  initials: string;
  codeId: string;
  baziBrief: string; // For the preview card text
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
  };
  energy: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
    insight: string;
  };
  chronology: Event[];
}

// --- DATA ---

const CELEBRITIES: Celebrity[] = [
  {
    id: 'jobs',
    name: 'Steve Jobs',
    title: 'The Visionary',
    initials: 'SJ',
    codeId: 'CASE-LOG-1955-SJ',
    baziBrief: 'Fire Dragon (丙辰)',
    pillars: {
      year: { 
        stem: { char: '乙', en: 'Yi', element: 'Wood', god: 'Resource' }, 
        branch: { char: '未', en: 'Wei', element: 'Earth', god: 'Officer' } 
      },
      month: { 
        stem: { char: '戊', en: 'Wu', element: 'Earth', god: 'Output' }, 
        branch: { char: '寅', en: 'Yin', element: 'Wood', god: 'Resource' } 
      },
      day: { 
        stem: { char: '丙', en: 'Bing', element: 'Fire', god: 'Day Master' }, 
        branch: { char: '辰', en: 'Chen', element: 'Earth', god: 'Output' } 
      },
      hour: { 
        stem: { char: '丙', en: 'Bing', element: 'Fire', god: 'Friend' }, 
        branch: { char: '申', en: 'Shen', element: 'Metal', god: 'Wealth' } 
      }
    },
    energy: {
      wood: 25, fire: 35, earth: 25, metal: 10, water: 5,
      insight: "A chart dominated by Fire (Vision/Passion) and Wood (Innovation). The scarcity of Water (Diplomacy) explains his volatile leadership style. The 'Hurting Officer' structure drives his perfectionism and rebellion against the status quo."
    },
    chronology: [
      {
        year: '1976',
        title: 'Founding Apple',
        description: 'Jobs co-founded Apple in his parents\' garage.',
        logic: 'Dragon year combines with his Rat luck pillar to form a Water Bureau, activating supreme Output energy for creation.'
      },
      {
        year: '1985',
        title: 'Ousted from Apple',
        description: 'After a power struggle with John Sculley, Jobs was forced out of the company he founded.',
        logic: "This aligned with a 'Geng-Jia' clash in his pillars, where Metal (Authority) severely attacked his Root (Wood), signifying a sudden loss of authority and internal conflict."
      },
      {
        year: '1997',
        title: 'The Return',
        description: 'Jobs returned as interim CEO after Apple acquired NeXT.',
        logic: 'The Ox year combined with his chart to cool the excessive Fire, bringing structure (Earth) back to his visionary chaos.'
      },
      {
        year: '2007',
        title: 'iPhone Launch',
        description: 'Unveiling the device that redefined mobile computing.',
        logic: 'A pure Fire year amplified his Day Master, placing him at the zenith of his "King" energy cycle.'
      }
    ]
  },
  {
    id: 'elon',
    name: 'Elon Musk',
    title: 'Technoking',
    initials: 'EM',
    codeId: 'CASE-LOG-1971-EM',
    baziBrief: 'Metal Pig (辛亥)',
    pillars: {
      year: { stem: { char: '辛', en: 'Xin', element: 'Metal', god: 'Friend' }, branch: { char: '亥', en: 'Hai', element: 'Water', god: 'Output' } },
      month: { stem: { char: '甲', en: 'Jia', element: 'Wood', god: 'Wealth' }, branch: { char: '午', en: 'Wu', element: 'Fire', god: 'Power' } },
      day: { stem: { char: '甲', en: 'Jia', element: 'Wood', god: 'Day Master' }, branch: { char: '申', en: 'Shen', element: 'Metal', god: 'Power' } },
      hour: { stem: { char: '戊', en: 'Wu', element: 'Earth', god: 'Wealth' }, branch: { char: '辰', en: 'Chen', element: 'Earth', god: 'Wealth' } }
    },
    energy: {
      wood: 20, fire: 30, earth: 15, metal: 25, water: 10,
      insight: "Dominant 'Seven Killings' profile. The clash between Metal and Wood creates a high-pressure engine that thrives on risk. His chart lacks Earth (Stability), explaining the constant disruption and migration."
    },
    chronology: [
        { year: '2002', title: 'PayPal Sale', description: 'Sold PayPal to eBay, netting $165m.', logic: 'Wealth star activation in the luck cycle.' },
        { year: '2008', title: 'SpaceX & Tesla Crisis', description: 'Nearly went bankrupt before successful launch.', logic: 'Heavy Seven Killings pressure testing resilience.' },
        { year: '2022', title: 'Twitter Acquisition', description: 'Purchased Twitter for $44B.', logic: 'Rob Wealth year indicating massive capital outflow and controversy.' }
    ]
  },
  {
    id: 'taylor',
    name: 'Taylor Swift',
    title: 'Cultural Icon',
    initials: 'TS',
    codeId: 'CASE-LOG-1989-TS',
    baziBrief: 'Earth Snake (己巳)',
    pillars: {
      year: { stem: { char: '己', en: 'Ji', element: 'Earth', god: 'Self' }, branch: { char: '巳', en: 'Si', element: 'Fire', god: 'Resource' } },
      month: { stem: { char: '丙', en: 'Bing', element: 'Fire', god: 'Resource' }, branch: { char: '子', en: 'Zi', element: 'Water', god: 'Wealth' } },
      day: { stem: { char: '丁', en: 'Ding', element: 'Fire', god: 'Day Master' }, branch: { char: '酉', en: 'You', element: 'Metal', god: 'Wealth' } },
      hour: { stem: { char: '乙', en: 'Yi', element: 'Wood', god: 'Resource' }, branch: { char: '卯', en: 'Mao', element: 'Wood', god: 'Resource' } }
    },
    energy: {
      wood: 30, fire: 40, earth: 10, metal: 10, water: 10,
      insight: "A 'Hurting Officer' structure hidden within a Resource-heavy chart. This allows her to transmute personal emotion (Fire) into structured art (Metal/Wealth). The Fire dominance fuels her massive fame."
    },
    chronology: [
        { year: '2006', title: 'Debut Album', description: 'Released self-titled album.', logic: 'First major Output cycle begins.' },
        { year: '2009', title: 'VMA Incident', description: 'Interrupted by Kanye West.', logic: 'Clash with Authority star, gaining public sympathy.' },
        { year: '2023', title: 'Eras Tour', description: 'Billion-dollar tour phenomenon.', logic: 'Peak Wealth element realization.' }
    ]
  },
   {
    id: 'zuck',
    name: 'Mark Zuckerberg',
    title: 'Meta Architect',
    initials: 'MZ',
    codeId: 'CASE-LOG-1984-MZ',
    baziBrief: 'Water Rat (壬子)',
    pillars: {
      year: { stem: { char: '甲', en: 'Jia', element: 'Wood', god: 'Output' }, branch: { char: '子', en: 'Zi', element: 'Water', god: 'Friend' } },
      month: { stem: { char: '戊', en: 'Wu', element: 'Earth', god: 'Power' }, branch: { char: '辰', en: 'Chen', element: 'Earth', god: 'Power' } },
      day: { stem: { char: '戊', en: 'Wu', element: 'Earth', god: 'Day Master' }, branch: { char: '申', en: 'Shen', element: 'Metal', god: 'Output' } },
      hour: { stem: { char: '庚', en: 'Geng', element: 'Metal', god: 'Output' }, branch: { char: '申', en: 'Shen', element: 'Metal', god: 'Output' } }
    },
    energy: {
      wood: 15, fire: 5, earth: 35, metal: 25, water: 20,
      insight: "A 'Yang Ren' (Blade) structure. Extremely competitive and unyielding. The strong Earth control gives him the ability to build massive, structured platforms, while Metal output drives the code logic."
    },
    chronology: [
        { year: '2004', title: 'Facebook Launch', description: 'Launched TheFacebook at Harvard.', logic: 'Output star shines, breaking old systems.' },
        { year: '2012', title: 'IPO', description: 'Facebook goes public.', logic: 'Wealth star combines with Power.' },
        { year: '2021', title: 'Meta Pivot', description: 'Rebranding to Meta.', logic: 'Resource cycle shift, seeking new identity.' }
    ]
  }
];

// Duplicate data to ensure smooth infinite looping
const SCROLL_ITEMS = [...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES];

const CelebrityProfiles: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Celebrity | null>(null);
  const [activeTab, setActiveTab] = useState<'GRID' | 'METRICS' | 'TIMELINE'>('GRID');
  
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
        scrollRef.current.scrollLeft += 0.6; 
        const oneSetWidth = scrollRef.current.scrollWidth / 4;
        if (scrollRef.current.scrollLeft >= oneSetWidth) {
           scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - oneSetWidth;
        }
        setScrollProgress((scrollRef.current.scrollLeft / oneSetWidth) * 100);
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    if(scrollRef.current) {
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeftStart.current = scrollRef.current.scrollLeft;
    }
  };
  const handleMouseUp = () => { setIsDragging(false); setIsPaused(false); };
  const handleMouseLeave = () => { setIsDragging(false); setIsPaused(false); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

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

      {/* --- CAROUSEL TRACK (UNCHANGED ENTRY STYLE) --- */}
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
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {SCROLL_ITEMS.map((item, idx) => (
                <button 
                    key={`${item.id}-${idx}`}
                    onClick={() => {
                        setSelectedProfile(item);
                        setActiveTab('GRID');
                    }}
                    className="flex-shrink-0 group flex flex-col items-center gap-4 w-32 md:w-40 focus:outline-none transition-transform duration-300 hover:-translate-y-2"
                >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-zen-text/5 dark:bg-white/5 border border-zen-text/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-zen-accent group-hover:shadow-lg overflow-hidden">
                        <span className="font-serif text-xl md:text-2xl font-bold text-zen-text dark:text-zen-subtle group-hover:text-zen-accent transition-colors">
                            {item.initials}
                        </span>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                <Fingerprint className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="font-serif font-bold text-zen-text dark:text-zen-subtle text-base group-hover:text-zen-accent transition-colors whitespace-nowrap">
                            {item.name}
                        </h3>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zen-text/40 dark:text-zen-subtle/40 mt-1">
                            {item.title}
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
                type="range" min="0" max="100" step="0.1" value={scrollProgress} 
                onChange={handleSliderChange}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                className="w-full h-1 bg-zen-text/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:bg-zen-accent [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:h-2 transition-all"
              />
              <span className="text-[10px] font-mono text-zen-text/30 dark:text-white/30">DRAG</span>
          </div>
      </div>

      {/* --- NEW CASE DETAIL MODAL --- */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div 
                className="absolute inset-0 bg-zen-bg/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setSelectedProfile(null)}
             />
             
             {/* Card Container */}
             <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#FCFAF7] rounded-[30px] shadow-2xl overflow-hidden animate-in zoom-in-95 ease-out duration-300 border border-[#D4AF37]/20 ring-1 ring-[#D4AF37]/10">
                
                {/* 1. Header Section */}
                <div className="flex-shrink-0 px-8 py-6 border-b border-[#5D5D5D]/10 bg-white/50 backdrop-blur-md flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-2xl font-serif font-bold shadow-lg shadow-[#D4AF37]/20 border-2 border-white">
                            {selectedProfile.initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5D5D5D]">
                                    {selectedProfile.name}
                                </h2>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#5D5D5D]/5 text-[#5D5D5D]/60 uppercase tracking-widest border border-[#5D5D5D]/10">
                                    {selectedProfile.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5D5D5D]/40 font-mono text-xs">
                                <Fingerprint className="w-3 h-3" />
                                <span>ID: {selectedProfile.codeId}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedProfile(null)}
                        className="p-2 rounded-full text-[#5D5D5D]/30 hover:text-[#5D5D5D] hover:bg-[#5D5D5D]/5 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 2. Navigation Tabs */}
                <div className="flex-shrink-0 px-8 border-b border-[#5D5D5D]/5 bg-[#FCFAF7] sticky top-0 z-10">
                    <div className="flex gap-8">
                        {[
                            { id: 'GRID', label: 'DATA GRID', icon: <Database className="w-3 h-3" /> },
                            { id: 'METRICS', label: 'ENERGY METRICS', icon: <Activity className="w-3 h-3" /> },
                            { id: 'TIMELINE', label: 'CHRONOLOGY', icon: <History className="w-3 h-3" /> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-4 text-xs font-bold tracking-widest transition-all relative ${
                                    activeTab === tab.id 
                                    ? 'text-[#D4AF37]' 
                                    : 'text-[#5D5D5D]/40 hover:text-[#5D5D5D]/70'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Content Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#FCFAF7]">
                    
                    {/* VIEW: DATA GRID */}
                    {activeTab === 'GRID' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {[
                                    { label: 'YEAR', data: selectedProfile.pillars.year },
                                    { label: 'MONTH', data: selectedProfile.pillars.month },
                                    { label: 'DAY', data: selectedProfile.pillars.day },
                                    { label: 'HOUR', data: selectedProfile.pillars.hour },
                                ].map((col, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="text-center text-[10px] font-mono text-[#5D5D5D]/40 tracking-widest uppercase mb-1">{col.label}</div>
                                        {/* Stem Card */}
                                        <div className="bg-white border border-[#D4AF37]/10 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group hover:border-[#D4AF37]/40 transition-colors">
                                            <span className="text-[10px] text-[#5D5D5D]/30 absolute top-2 left-2">{col.data.stem.god}</span>
                                            <span className="text-3xl font-serif font-bold text-[#5D5D5D] mb-1">{col.data.stem.char}</span>
                                            <span className="text-xs font-mono text-[#D4AF37] uppercase">{col.data.stem.en}</span>
                                            <div className={`absolute bottom-0 left-0 w-full h-1 bg-${col.data.stem.element === 'Fire' ? 'red' : col.data.stem.element === 'Water' ? 'blue' : col.data.stem.element === 'Wood' ? 'green' : col.data.stem.element === 'Metal' ? 'gray' : 'yellow'}-500/50 opacity-20`} />
                                        </div>
                                        {/* Branch Card */}
                                        <div className="bg-white border border-[#D4AF37]/10 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group hover:border-[#D4AF37]/40 transition-colors">
                                            <span className="text-[10px] text-[#5D5D5D]/30 absolute top-2 left-2">{col.data.branch.god}</span>
                                            <span className="text-3xl font-serif font-bold text-[#5D5D5D] mb-1">{col.data.branch.char}</span>
                                            <span className="text-xs font-mono text-[#D4AF37] uppercase">{col.data.branch.en}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6 flex items-start gap-4">
                                <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-[#5D5D5D] mb-1">Structure Analysis</h4>
                                    <p className="text-sm text-[#5D5D5D]/80 leading-relaxed">
                                        {selectedProfile.energy.insight}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: ENERGY METRICS */}
                    {activeTab === 'METRICS' && (
                         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-mono font-bold text-[#5D5D5D]/40 uppercase tracking-widest mb-4">Elemental Distribution</h4>
                                    {[
                                        { l: 'WOOD (Growth)', v: selectedProfile.energy.wood, c: 'bg-green-500' },
                                        { l: 'FIRE (Passion)', v: selectedProfile.energy.fire, c: 'bg-red-500' },
                                        { l: 'EARTH (Stability)', v: selectedProfile.energy.earth, c: 'bg-yellow-600' },
                                        { l: 'METAL (Order)', v: selectedProfile.energy.metal, c: 'bg-gray-400' },
                                        { l: 'WATER (Wisdom)', v: selectedProfile.energy.water, c: 'bg-blue-500' },
                                    ].map((el, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="w-32 text-xs font-bold text-[#5D5D5D]/60 text-right">{el.l}</span>
                                            <div className="flex-1 h-2 bg-[#5D5D5D]/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${el.c} opacity-80 rounded-full`} style={{ width: `${el.v}%` }} />
                                            </div>
                                            <span className="w-8 text-xs font-mono text-[#5D5D5D]">{el.v}%</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white border border-[#D4AF37]/10 p-6 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
                                        <BrainCircuit className="w-5 h-5" />
                                        <span className="font-bold tracking-wide text-sm">AI TRAIT INSIGHT</span>
                                    </div>
                                    <p className="text-sm text-[#5D5D5D]/80 leading-relaxed font-sans italic">
                                        "{selectedProfile.energy.insight}"
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-[#5D5D5D]/5 flex justify-between items-center">
                                        <span className="text-[10px] font-mono text-[#5D5D5D]/40">ALGORITHM V3.2</span>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40" />
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    )}

                    {/* VIEW: CHRONOLOGY */}
                    {activeTab === 'TIMELINE' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="relative pl-8 border-l border-[#D4AF37]/20 space-y-10">
                                {selectedProfile.chronology.map((event, i) => (
                                    <div key={i} className="relative group">
                                        {/* Dot */}
                                        <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-[#FCFAF7] bg-[#D4AF37] shadow-md group-hover:scale-125 transition-transform" />
                                        
                                        {/* Content */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-mono font-bold text-[#D4AF37]">{event.year}</span>
                                                <span className="text-lg font-serif font-bold text-[#5D5D5D]">{event.title}</span>
                                            </div>
                                            <p className="text-sm text-[#5D5D5D]/70 font-sans max-w-xl leading-relaxed">
                                                {event.description}
                                            </p>
                                            
                                            {/* Logic Block */}
                                            <div className="mt-2 bg-[#5D5D5D]/5 rounded-lg p-4 border-l-2 border-[#5D5D5D]/30 max-w-2xl">
                                                <div className="flex items-center gap-2 mb-1 text-[#5D5D5D]/60 text-[10px] font-mono font-bold uppercase tracking-wider">
                                                    <Box className="w-3 h-3" />
                                                    Algorithmic Logic Match
                                                </div>
                                                <p className="text-xs text-[#5D5D5D] font-medium leading-relaxed">
                                                    {event.logic}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* 4. Footer CTA */}
                <div className="flex-shrink-0 p-6 border-t border-[#5D5D5D]/5 bg-[#FCFAF7] flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#5D5D5D]/40">
                        <Lock className="w-3 h-3" />
                        <span>VERIFIED_HASH_256</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B59230] transition-colors shadow-md hover:shadow-lg text-xs font-bold tracking-widest">
                        FULL REPORT ACCESS <ExternalLink className="w-3 h-3" />
                    </button>
                </div>

             </div>
        </div>
      )}

    </section>
  );
};

export default CelebrityProfiles;