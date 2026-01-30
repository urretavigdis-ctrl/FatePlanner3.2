import React, { useState } from 'react';
import { ChevronDown, Sparkles, Grid3X3, Activity, Moon, Layout, Zap, User, Star, Binary, ArrowLeft, CheckCircle, Home } from 'lucide-react';
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
  nanyin: ['路旁土', '山下火', '平地木', '桑柘木'],
  phase: ['衰', '病', '墓', '绝'], // Star Luck
  kongwang: ['', '', '辰巳', ''],
  shensha: ['太极', '驿马', '华盖', '桃花']
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
        
        {/* 2. Accordion 1: The Pillar Matrix */}
        <AccordionItem 
            isOpen={openSection === 0} 
            onToggle={() => toggleSection(0)}
            icon={<Grid3X3 className="w-5 h-5" />}
            title="基础八字排盘"
            subtitle="THE PILLAR MATRIX"
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
                    
                    {/* Nanyin */}
                    <div className="p-2 text-[10px] font-mono text-zen-text/40 border-r border-zen-accent/10 flex items-center justify-center bg-zen-text/[0.02]">SOUND</div>
                    {PILLAR_DATA.nanyin.map((val, i) => (
                        <div key={i} className="p-2 text-xs text-zen-text/60 bg-zen-text/[0.02]">{val}</div>
                    ))}

                    {/* Shensha */}
                    <div className="p-2 text-[10px] font-mono text-zen-text/40 border-r border-zen-accent/10 flex items-center justify-center">STAR</div>
                    {PILLAR_DATA.shensha.map((val, i) => (
                        <div key={i} className="p-2 text-xs text-zen-accent">{val}</div>
                    ))}
                </div>
            </div>
        </AccordionItem>

        {/* 3. Accordion 2: Structure & Talent */}
        <AccordionItem 
            isOpen={openSection === 1} 
            onToggle={() => toggleSection(1)}
            icon={<Layout className="w-5 h-5" />}
            title="格局与隐藏潜力"
            subtitle="STRUCTURE & TALENT"
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center bg-white border border-zen-accent/20 p-4 rounded-xl shadow-sm">
                    <div>
                        <span className="text-xs font-mono text-zen-text/40 uppercase block mb-1">Primary Structure</span>
                        <h3 className="text-2xl font-serif font-bold text-zen-text">建禄格</h3>
                    </div>
                    <button className="p-2 rounded-full bg-zen-accent/10 text-zen-accent hover:bg-zen-accent hover:text-white transition-colors">
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {['炎上格', '木火通明', '伤官生财', '正官佩印'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zen-text/5 text-zen-text/70 rounded-full text-xs font-serif border border-transparent hover:border-zen-accent/30 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="bg-zen-text/5 p-4 rounded-lg border-l-2 border-zen-accent">
                    <p className="text-sm text-zen-text/80 leading-relaxed font-sans">
                        <span className="font-bold">AI Insight:</span> 你的命盘显示出极强的资源整合能力。建禄格意味着你适合在成熟的体系中掌权，而非从零创业。2026年你的核心课题是将“名声”转化为“实利”。
                    </p>
                </div>
            </div>
        </AccordionItem>

        {/* 4. Accordion 3: Elemental Audit */}
        <AccordionItem 
            isOpen={openSection === 2} 
            onToggle={() => toggleSection(2)}
            icon={<Activity className="w-5 h-5" />}
            title="五行分布与流通"
            subtitle="ELEMENTAL AUDIT"
        >
            <div className="space-y-6 pt-2">
                <div className="flex items-end justify-between h-32 px-2 gap-2">
                    {[
                        { label: 'Wood', pct: 20, color: ELEMENT_COLORS.Wood },
                        { label: 'Fire', pct: 45, color: ELEMENT_COLORS.Fire },
                        { label: 'Earth', pct: 15, color: ELEMENT_COLORS.Earth },
                        { label: 'Metal', pct: 10, color: ELEMENT_COLORS.Gold },
                        { label: 'Water', pct: 10, color: ELEMENT_COLORS.Water },
                    ].map((el) => (
                        <div key={el.label} className="flex flex-col items-center justify-end h-full w-full group">
                            <span className="text-[10px] font-mono text-zen-text/40 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{el.pct}%</span>
                            <div className="w-full bg-zen-text/5 rounded-t-sm relative overflow-hidden h-full">
                                <div 
                                    className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
                                    style={{ 
                                        height: `${openSection === 2 ? el.pct : 0}%`, 
                                        backgroundColor: el.color 
                                    }} 
                                />
                            </div>
                            <span className="text-[10px] font-mono text-zen-text/60 mt-2">{el.label}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-zen-text/60 text-center italic">
                    "Fire is dominant (45%). This indicates a passionate, reactive, and highly expressive personality type."
                </p>
            </div>
        </AccordionItem>

        {/* 5. Accordion 4: Yin-Yang Balance */}
        <AccordionItem 
            isOpen={openSection === 3} 
            onToggle={() => toggleSection(3)}
            icon={<Binary className="w-5 h-5" />}
            title="命盘的核心：阴阳"
            subtitle="YIN-YANG BALANCE"
        >
            <div className="flex items-center gap-6 py-2">
                <div className="relative w-24 h-24 flex-shrink-0">
                   {/* CSS Yin Yang */}
                   <div className="w-full h-full rounded-full border border-zen-text/10 bg-white relative overflow-hidden flex items-center justify-center">
                        <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-zen-text" />
                        <div className="absolute top-0 left-1/2 w-12 h-12 bg-zen-text rounded-full flex items-center justify-center -translate-x-1/2">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center -translate-x-1/2">
                            <div className="w-3 h-3 bg-zen-text rounded-full" />
                        </div>
                   </div>
                </div>
                <div className="space-y-2">
                    <h4 className="font-serif font-bold text-zen-text">Balanced, leaning Yang.</h4>
                    <p className="text-xs text-zen-text/70 leading-relaxed">
                        你的性格呈现出“外热内冷”的特质。在公共场合（Yang）表现积极主动，但回归私人空间（Yin）时极度需要独处来恢复能量。
                    </p>
                </div>
            </div>
        </AccordionItem>

        {/* 6. Accordion 5: Zodiac Archetype */}
        <AccordionItem 
            isOpen={openSection === 4} 
            onToggle={() => toggleSection(4)}
            icon={<Star className="w-5 h-5" />}
            title="深层自我：生肖原型"
            subtitle="ZODIAC ARCHETYPE"
        >
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'Archetype', val: 'Rational Strategist' },
                    { label: 'Key Trait', val: 'Mysterious Elegance' },
                    { label: 'Shadow', val: 'Possessive Control' },
                    { label: '2026 Theme', val: 'Shedding Skin' },
                ].map((item) => (
                    <div key={item.label} className="bg-white/50 border border-zen-accent/10 p-3 rounded">
                        <span className="text-[10px] font-mono text-zen-text/40 uppercase block mb-1">{item.label}</span>
                        <span className="text-sm font-serif text-zen-text font-medium">{item.val}</span>
                    </div>
                ))}
            </div>
        </AccordionItem>
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