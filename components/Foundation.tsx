import React, { useState } from 'react';
import { 
  ChevronDown, Sparkles, Grid3X3, Activity, Moon, Layout, 
  Zap, User, Star, Binary, ArrowLeft, CheckCircle, Home,
  Fingerprint, Scale, ShieldAlert, Crown, Heart, Flame, Droplets
} from 'lucide-react';
import ReportInsights from './ReportInsights';

interface FoundationProps {
  onUnlock?: () => void;
  onBack?: () => void;
  onHome?: () => void;
}

const ELEMENT_COLORS: Record<string, string> = {
  Fire: '#C56E61',
  Wood: '#76A07B',
  Gold: '#C19A6B', 
  Water: '#6B8BA4',
  Earth: '#B59B6D',
};

// Mock Data Structure
const PILLAR_DATA = {
  headers: ['YEAR', 'MONTH', 'DAY', 'HOUR'],
  stems: [
    { char: '辛', element: 'Gold' },
    { char: '丙', element: 'Fire' },
    { char: '戊', element: 'Earth' },
    { char: '壬', element: 'Water' }
  ],
  branches: [
    { char: '未', element: 'Earth' },
    { char: '申', element: 'Gold' },
    { char: '戌', element: 'Earth' },
    { char: '子', element: 'Water' }
  ],
  hidden: ['乙丁己', '戊庚壬', '辛丁戊', '癸'],
  nanyin: ['Earth', 'Fire', 'Wood', 'Wood'],
  phase: ['Decline', 'Sick', 'Grave', 'Extinct'], // Star Luck
  kongwang: ['', '', 'Chen Si', ''],
  shensha: ['Taiji', 'Horse', 'Art', 'Peach']
};

const Foundation: React.FC<FoundationProps> = ({ onUnlock, onBack, onHome }) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-zen-bg animate-in fade-in duration-700">
      
      {/* 1. Sticky User Header with Back Button */}
      <div className="sticky top-0 z-40 bg-zen-bg/95 backdrop-blur-md border-b border-zen-accent/10 px-4 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Back Button */}
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full text-zen-text/40 hover:text-zen-text hover:bg-zen-text/5 transition-colors group"
                        title="Return to Reveal Animation"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}

                {/* Zodiac Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zen-text text-zen-bg flex items-center justify-center text-xl md:text-2xl border-2 border-zen-accent">
                    🐍
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-serif font-bold text-zen-text">Carl</h2>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zen-text/5 text-zen-text/60">YANG MALE</span>
                    </div>
                    <div className="flex flex-col text-[10px] font-mono text-zen-text/60 leading-tight mt-1">
                        <span>SOLAR: 1991.07.15</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zen-text/5 text-zen-text/40 rounded-lg">
                    <Zap className="w-4 h-4" />
                    <span className="hidden sm:inline font-sans text-xs font-medium tracking-wide">AI STRATEGY</span>
                </div>

                {onHome && (
                    <button 
                        onClick={onHome}
                        className="p-2 rounded-full text-zen-text/40 hover:text-zen-text hover:bg-zen-text/5 transition-colors group ml-1"
                        title="Return to Home"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-4 pb-12">
        
        {/* MODULE 1: THE PILLAR MATRIX */}
        <AccordionItem 
            isOpen={openSection === 0} 
            onToggle={() => toggleSection(0)}
            icon={<Grid3X3 className="w-5 h-5" />}
            title="THE PILLAR MATRIX"
            subtitle="BAZI CHART"
        >
            <div className="overflow-x-auto pb-2">
                <div className="min-w-[300px] grid grid-cols-5 text-center font-serif text-sm border border-zen-accent/10 rounded-lg overflow-hidden bg-white/50">
                    
                    {/* Headers Row */}
                    <div className="col-span-1 bg-zen-text/5 p-2 flex items-center justify-center font-mono text-[10px] text-zen-text/40 border-b border-r border-zen-accent/10">DATA</div>
                    {PILLAR_DATA.headers.map((h, i) => (
                        <div key={h} className="col-span-1 bg-zen-text/5 p-2 font-mono text-[10px] text-zen-text/60 border-b border-zen-accent/10">{h}</div>
                    ))}

                    {/* Celestial Stems */}
                    <div className="p-3 text-[10px] font-mono text-zen-text/40 border-r border-zen-accent/10 flex items-center justify-center">STEM</div>
                    {PILLAR_DATA.stems.map((s, i) => (
                        <div key={i} className="p-2 text-xl font-bold" style={{ color: ELEMENT_COLORS[s.element] }}>{s.char}</div>
                    ))}

                    {/* Terrestrial Branches */}
                    <div className="p-3 text-[10px] font-mono text-zen-text/40 border-r border-zen-accent/10 flex items-center justify-center bg-zen-text/[0.02]">BRANCH</div>
                    {PILLAR_DATA.branches.map((b, i) => (
                        <div key={i} className="p-2 text-xl font-bold bg-zen-text/[0.02]" style={{ color: ELEMENT_COLORS[b.element] }}>{b.char}</div>
                    ))}

                    {/* Hidden Stems */}
                    <div className="p-2 text-[10px] font-mono text-zen-text/40 border-r border-zen-accent/10 flex items-center justify-center">HIDDEN</div>
                    {PILLAR_DATA.hidden.map((val, i) => (
                        <div key={i} className="p-2 text-xs text-zen-text/60 font-mono tracking-widest">{val}</div>
                    ))}
                </div>
                
                {/* Cantian AI Insight */}
                <div className="mt-4 p-4 bg-zen-text/5 rounded-lg border-l-2 border-zen-accent flex gap-3">
                    <Activity className="w-5 h-5 text-zen-accent shrink-0 mt-0.5" />
                    <div>
                        <span className="text-[10px] font-mono text-zen-accent font-bold uppercase tracking-wider block mb-1">Cantian AI Analysis</span>
                        <p className="text-sm font-serif italic text-zen-text/70 leading-relaxed">
                            "This is your source code. You are a <span className="font-bold text-zen-text">Yang Earth (Wu)</span> Day Master born in the season of Fire. Think of a mineral-rich mountain scorching under the summer sun—immense potential, but currently overheating."
                        </p>
                    </div>
                </div>
            </div>
        </AccordionItem>

        {/* MODULE 2: SOUL ARCHETYPE */}
        <AccordionItem 
            isOpen={openSection === 1} 
            onToggle={() => toggleSection(1)}
            icon={<Fingerprint className="w-5 h-5" />}
            title="SOUL ARCHETYPE"
            subtitle="DAY MASTER ANALYSIS"
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-white border border-zen-accent/20 p-5 rounded-xl shadow-sm">
                    <div>
                        <span className="text-xs font-mono text-zen-text/40 uppercase block mb-1">Archetype</span>
                        <h3 className="text-2xl font-serif font-bold text-zen-text">The Sentient Mountain</h3>
                        <span className="text-xs font-mono text-zen-accent mt-1 block">Yang Earth (Wu) · Stability</span>
                    </div>
                    <div className="w-12 h-12 bg-zen-text rounded-full flex items-center justify-center text-white">
                        <User className="w-6 h-6" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    {['Trust Capital', 'Shock Absorber', 'Blind Spot: Inertia', 'Hidden Metal'].map(tag => (
                        <div key={tag} className="px-3 py-2 bg-zen-text/5 text-center text-zen-text/70 rounded text-xs font-serif font-medium">
                            {tag}
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-lg bg-white/50 border border-zen-text/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-zen-accent/30" />
                    <p className="text-sm text-zen-text/80 leading-relaxed font-sans text-justify pl-2">
                        "Your core essence is <span className="font-bold">Stability amidst Chaos</span>. While others panic in 2026's volatility, you naturally absorb shockwaves, providing a grounding force. Your major strength is <span className="font-bold">Trust Capital</span>—people instinctively rely on your immovability. However, your psychological blind spot is <span className="font-bold text-zen-risk">Sedimentary Stagnation</span>. Like a mountain refusing to shift, you often mistake 'endurance' for 'inaction', holding onto expiring contexts simply because they are familiar. To unlock your hidden treasures, you must allow internal pressure to crack your surface."
                    </p>
                </div>
            </div>
        </AccordionItem>

        {/* MODULE 3: HIDDEN POTENTIAL */}
        <AccordionItem 
            isOpen={openSection === 2} 
            onToggle={() => toggleSection(2)}
            icon={<Sparkles className="w-5 h-5" />}
            title="HIDDEN POTENTIAL"
            subtitle="SHEN SHA & GIFTS"
        >
            <div className="space-y-3 pt-2">
                <p className="text-xs text-zen-text/40 font-mono uppercase tracking-widest mb-2 text-center">
                    Active Symbolic Weaponry
                </p>

                {/* Star 1 */}
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white border border-zen-text/5 shadow-sm hover:border-zen-accent/20 transition-colors">
                    <div className="p-2 bg-[#C19A6B]/10 text-[#C19A6B] rounded-full shrink-0">
                        <Crown className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-zen-text text-sm">The Executive Protocol <span className="text-[10px] font-mono text-zen-text/40 font-normal ml-1">(General Star)</span></h4>
                        <p className="text-xs text-zen-text/70 leading-relaxed mt-1">
                            Not just authority, but the ability to enforce order. In daily life, this manifests as a natural talent for crisis containment. When chaos erupts, you hold the remote control.
                        </p>
                    </div>
                </div>

                {/* Star 2 */}
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white border border-zen-text/5 shadow-sm hover:border-zen-accent/20 transition-colors">
                    <div className="p-2 bg-[#C56E61]/10 text-[#C56E61] rounded-full shrink-0">
                        <Heart className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-zen-text text-sm">The Magnetic Field <span className="text-[10px] font-mono text-zen-text/40 font-normal ml-1">(Red Chamber)</span></h4>
                        <p className="text-xs text-zen-text/70 leading-relaxed mt-1">
                            A specific charisma that disarms defenses. It gives you an unfair advantage in negotiations—people subconsciously want to agree with you before you present the data.
                        </p>
                    </div>
                </div>

                {/* Star 3 */}
                <div className="flex items-start gap-4 p-3 rounded-lg bg-white border border-zen-text/5 shadow-sm hover:border-zen-accent/20 transition-colors">
                    <div className="p-2 bg-[#6B8BA4]/10 text-[#6B8BA4] rounded-full shrink-0">
                        <Binary className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-zen-text text-sm">The Pattern Decoder <span className="text-[10px] font-mono text-zen-text/40 font-normal ml-1">(Taiji Noble)</span></h4>
                        <p className="text-xs text-zen-text/70 leading-relaxed mt-1">
                            A high-frequency antenna for metaphysical trends. You often 'know' the market direction before the charts confirm it. This is your intuition operating faster than logic.
                        </p>
                    </div>
                </div>
            </div>
        </AccordionItem>

        {/* MODULE 4: ENERGY EQUILIBRIUM */}
        <AccordionItem 
            isOpen={openSection === 3} 
            onToggle={() => toggleSection(3)}
            icon={<Scale className="w-5 h-5" />}
            title="ENERGY EQUILIBRIUM"
            subtitle="ELEMENTAL BALANCE"
        >
             <div className="space-y-6 pt-2">
                {/* Yin Yang */}
                <div className="flex items-center gap-4 bg-white/50 p-3 rounded-xl border border-zen-text/5">
                    <div className="relative w-12 h-12 flex-shrink-0 opacity-80">
                        <div className="w-full h-full rounded-full border border-zen-text/10 bg-white relative overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-zen-text" />
                            <div className="absolute top-0 left-1/2 w-6 h-6 bg-zen-text rounded-full flex items-center justify-center -translate-x-1/2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                            <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center -translate-x-1/2">
                                <div className="w-1.5 h-1.5 bg-zen-text rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-zen-text uppercase tracking-wide">Yin-Yang State</h4>
                        <p className="text-xs text-zen-text/70 mt-1">
                            Balanced, leaning Yang. Active in public, but you crave solitude to recharge.
                        </p>
                    </div>
                </div>

                {/* Elemental Bars */}
                <div className="space-y-3">
                     {[
                        { label: 'Fire (Passion)', pct: 45, color: ELEMENT_COLORS.Fire },
                        { label: 'Wood (Growth)', pct: 20, color: ELEMENT_COLORS.Wood },
                        { label: 'Earth (Self)', pct: 15, color: ELEMENT_COLORS.Earth },
                        { label: 'Water (Wisdom)', pct: 10, color: ELEMENT_COLORS.Water },
                        { label: 'Metal (Output)', pct: 10, color: ELEMENT_COLORS.Gold },
                    ].map((el) => (
                        <div key={el.label} className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-zen-text/50 w-24 text-right uppercase">{el.label}</span>
                            <div className="flex-1 h-2 bg-zen-text/5 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full"
                                    style={{ width: `${el.pct}%`, backgroundColor: el.color }} 
                                />
                            </div>
                            <span className="text-[10px] font-mono text-zen-text/60 w-8">{el.pct}%</span>
                        </div>
                    ))}
                </div>
                
                {/* Environmental Affinity Summary */}
                <div className="bg-zen-text/5 p-3 rounded-lg border border-zen-text/10 flex items-start gap-3">
                    <div className="p-1 bg-[#6B8BA4]/20 rounded-full text-[#6B8BA4] mt-0.5">
                        <Droplets className="w-3 h-3" />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono font-bold text-zen-text/40 uppercase tracking-widest block mb-1">Environmental Affinity</span>
                        <p className="text-xs text-zen-text/80 italic font-serif leading-relaxed">
                            "Your chart is scorching (45% Fire) and dry; you urgently seek the <span className="font-bold text-[#6B8BA4]">Hydration of Deep Water</span> (North, Sleep, Wisdom) to prevent your mental engine from seizing up."
                        </p>
                    </div>
                </div>
            </div>
        </AccordionItem>

        {/* 2026 RISK SIGNAL HOOK */}
        <div className="mt-8 relative overflow-hidden rounded-xl border border-zen-risk/30 bg-zen-risk/5 p-6 animate-pulse-slow">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-zen-risk/10 text-zen-risk shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-serif font-bold text-zen-risk mb-2">2026 RISK SIGNAL DETECTED</h3>
                    <p className="text-sm text-zen-text/80 leading-relaxed font-sans mb-4">
                        <span className="font-bold">System Warning:</span> Your chart's Fire element (45%) is already critical. 
                        The incoming 2026 "Fire Horse" energy will trigger a massive <span className="font-bold text-zen-risk">Super-Saturation Event</span>.
                        The volcano is active. Risk of inflammatory health issues and impulsive financial decisions is high.
                    </p>
                    <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-zen-risk fill-zen-risk" />
                        <span className="text-xs text-zen-text/60 font-mono uppercase tracking-wider">
                            Risk Probability: <span className="text-zen-risk font-bold">94.2% [High Volatility]</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- PAID SECTION: REPORT INSIGHTS --- */}
      <ReportInsights onUnlock={onUnlock} />

    </div>
  );
};

// Reusable Atomic Accordion Component
interface AccordionItemProps {
    isOpen: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ isOpen, onToggle, icon, title, subtitle, children }) => {
    return (
        <div className={`
            group bg-white rounded-xl border transition-all duration-300 overflow-hidden
            ${isOpen ? 'border-zen-accent shadow-md' : 'border-zen-accent/10 hover:border-zen-accent/30'}
        `}>
            <button 
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-zen-accent text-white' : 'bg-zen-text/5 text-zen-text/60 group-hover:text-zen-accent'}`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-zen-text text-lg">{title}</h3>
                        <p className="font-mono text-[10px] tracking-widest text-zen-text/40 uppercase">{subtitle}</p>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-zen-text/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zen-accent' : ''}`} />
            </button>
            
            <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-4 pt-0 border-t border-zen-accent/5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Foundation;