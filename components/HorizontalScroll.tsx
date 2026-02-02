import React, { useState, useEffect } from 'react';
import { 
  Globe, Sun, Zap, TrendingUp, AlertTriangle, 
  FileText, BookOpen, Landmark, Activity, Lock, 
  ArrowUpRight, BarChart3, Database, ChevronDown, Radio,
  X, Layers, Cpu, Flame, Droplets, Wind
} from 'lucide-react';

// --- TYPES & DATA ---

interface BriefArticle {
  title: string;
  source: string;
  icon: React.ReactNode;
  content: string[]; // Paragraphs
}

interface ForecastModule {
  id: string;
  category: string;
  title: string;
  subtext: string;
  dataMetric: { label: string; value: string; trend: 'up' | 'down' | 'neutral' };
  brief: BriefArticle;
  themeColor: string;
}

interface MonthData {
  month: string;
  fullDate: string;
  intensity: number;
  color: string;
  note: string;
  // Detail Card Data
  status: 'STABLE' | 'VOLATILE' | 'CRITICAL' | 'OPTIMAL';
  pillar: {
      stem: { char: string; en: string; god: string };
      branch: { char: string; en: string; god: string };
  };
  gauges: {
      wealth: number;
      career: number;
      emotion: number;
  };
  advisory: {
      summary: string;
      detail: string;
      logic: string;
  };
}

const MODULES: ForecastModule[] = [
  {
    id: 'ARCHIVE_01',
    category: 'SOCIOLOGY / HISTORY',
    title: '1966: The Vanishing 460,000 Lives',
    subtext: 'How faith rewrites biological statistics? A collective unconscious experiment on "Fire Horse".',
    themeColor: 'text-red-600',
    dataMetric: { label: 'Birth Rate Drop', value: '-26.3%', trend: 'down' },
    brief: {
      source: 'Demographic History Review',
      icon: <BookOpen className="w-4 h-4" />,
      title: 'Sociological Review of the 1966 "Fire Horse" Population Deceleration',
      content: [
        "In 1966 (Bing Wu Year), Japan's birth rate suddenly plummeted by 26%. This was not due to war or famine, but stemmed from an ancient superstition: 'Women born in the Fire Horse year are bad luck for their husbands'.",
        "This phenomenon proves that 'cultural memes' can rewrite real-world statistical data like a virus. 2026 is also a Bing Wu year. Amplified by social media, this 'collective emotional resonance' will be more intense than in 1966.",
        "We predict that in 2026, the global birth rate will face a new structural inflection point due to economic anxiety and cultural suggestion. This fear itself is a massive shorting energy."
      ]
    }
  },
  {
    id: 'ARCHIVE_02',
    category: 'MACRO ECONOMICS',
    title: 'The Debt Wall: $3 Trillion Liquidation',
    subtext: 'The bill for the low-interest era is finally due. Who is swimming naked, and who is safe?',
    themeColor: 'text-stone-600',
    dataMetric: { label: 'Maturity Wall', value: '$3.2T', trend: 'up' },
    brief: {
      source: 'IMF Global Financial Stability Report',
      icon: <Landmark className="w-4 h-4" />,
      title: 'Why the $3 Trillion Debt Maturity is the Inevitable Fire Field of 2026',
      content: [
        "According to IMF data, approximately $3.2 trillion in corporate debt will mature globally between 2025 and 2026. Most of this debt was borrowed during the low-interest period.",
        "Facing the 'High-for-Longer' interest rate environment in 2026, a large number of zombie companies will face the risk of 'refinancing' failure. This is the economic mapping of 'Fire melts Metal' in Five Elements—Fire (inflation/rates) melts Metal (capital chain).",
        "For individuals, cash flow in 2026 is more important than the balance sheet. Liquidity will be the only lifebuoy."
      ]
    }
  },
  {
    id: 'ARCHIVE_03',
    category: 'SOLAR PHYSICS',
    title: 'Solar Cycle 25: Stellar Rage',
    subtext: 'Fire in the sky and restlessness on Earth. NASA confirms solar activity is at a maximum.',
    themeColor: 'text-orange-500',
    dataMetric: { label: 'Sunspot Count', value: '185', trend: 'up' },
    brief: {
      source: 'NASA Solar Cycle Progression',
      icon: <Sun className="w-4 h-4" />,
      title: 'Statistical Correlation between Geomagnetic Storms and Human Emotion',
      content: [
        "Solar Cycle 25 will peak in 2025-2026. Scientific research shows that intense geomagnetic activity not only disrupts power grids but is also positively correlated with fluctuations in human mental health (anxiety, aggressive behavior).",
        "From the perspective of TCM and Yi Jing, this is 'External Fire triggering Internal Fire'. 2026 will be a peak period for cardiovascular and mental diseases.",
        "On a social level, this 'dry heat' energy often corresponds to an increase in group conflicts. Keeping calm (Water energy) will become an extremely scarce strategic resource."
      ]
    }
  },
  {
    id: 'ARCHIVE_04',
    category: 'TECHNOLOGY / ENERGY',
    title: 'Compute vs Power Game',
    subtext: 'The end of AI is photovoltaics and nuclear fusion. Silicon-based life is devouring carbon-based world energy.',
    themeColor: 'text-blue-600',
    dataMetric: { label: 'Grid Load', value: '98%', trend: 'up' },
    brief: {
      source: 'IEA Electricity Market Report',
      icon: <Zap className="w-4 h-4" />,
      title: 'When Data Centers Become the New "Energy Black Holes"',
      content: [
        "The training and inference of AI models are exponentially increasing power consumption. In 2026, data center energy consumption bottlenecks will be transmitted to ordinary consumers through soaring electricity prices.",
        "This is a battle for 'Fire' (Electricity/Compute). If your industry relies heavily on cheap energy, 2026 will face a cost re-evaluation.",
        "In investment logic, energy infrastructure will become a more certain 'shovel' than the AI application layer."
      ]
    }
  },
  {
    id: 'ARCHIVE_05',
    category: 'GEOPOLITICS',
    title: 'The Endgame of K-Shaped Divergence',
    subtext: 'The world is no longer flat, but torn. Are you leaping up or sinking down?',
    themeColor: 'text-purple-600',
    dataMetric: { label: 'Gini Coeff', value: '0.48', trend: 'neutral' },
    brief: {
      source: 'World Inequality Lab',
      icon: <Globe className="w-4 h-4" />,
      title: 'Defensive Survival Guide for the Middle Class',
      content: [
        "K-shaped recovery means averages have lost their meaning. In 2026, groups with core assets (technology, brand, scarce resources) will continue to rise, while those relying on selling labor will be squeezed by both inflation and AI replacement.",
        "This differentiation corresponds to 'Rob Wealth' in BaZi. Your wealth depends not only on your effort but also on which end of the K-line you are on.",
        "Strategy: Divest ineffective assets and complete class positioning through 'Seal Star' (education/skill upgrading)."
      ]
    }
  }
];

const MONTH_FLUX: MonthData[] = [
  { 
    month: 'FEB', fullDate: 'FEBRUARY 2026', intensity: 65, color: '#76A07B', note: 'IGNITION',
    status: 'OPTIMAL',
    pillar: { stem: { char: '庚', en: 'Yang Metal', god: 'Wealth' }, branch: { char: '寅', en: 'Tiger', god: 'Resource' } },
    gauges: { wealth: 85, career: 70, emotion: 40 },
    advisory: {
        summary: "Wood feeds the annual Fire. A spark of initiation.",
        detail: "The Tiger (Wood) forms a harmonious semi-combination with the Horse (Year), initiating the fire cycle. This is the best month for launching new projects, as the energy supports rapid expansion.",
        logic: "Tiger (Yin) + Horse (Wu) = Fire Frame Initiation."
    }
  },
  { 
    month: 'MAR', fullDate: 'MARCH 2026', intensity: 75, color: '#76A07B', note: '',
    status: 'STABLE',
    pillar: { stem: { char: '辛', en: 'Yin Metal', god: 'Wealth' }, branch: { char: '卯', en: 'Rabbit', god: 'Resource' } },
    gauges: { wealth: 60, career: 65, emotion: 55 },
    advisory: {
        summary: "Pure Wood energy peaks. Resource accumulation.",
        detail: "The Rabbit represents the peak of Wood. While supportive of the Fire year, the interaction is less explosive than February. Good for planning and internal restructuring.",
        logic: "Rabbit (Mao) + Horse (Wu) = Destruction (Secondary)."
    }
  },
  { 
    month: 'APR', fullDate: 'APRIL 2026', intensity: 50, color: '#B59B6D', note: 'TRANSITION',
    status: 'STABLE',
    pillar: { stem: { char: '壬', en: 'Yang Water', god: 'Power' }, branch: { char: '辰', en: 'Dragon', god: 'Output' } },
    gauges: { wealth: 50, career: 80, emotion: 60 },
    advisory: {
        summary: "Wet Earth dampens the Fire. A cooling period.",
        detail: "The Dragon is wet earth, providing a much-needed buffer against the incoming summer heat. Use this month to consolidate gains before the volatility of summer.",
        logic: "Dragon (Chen) regulates Fire excess."
    }
  },
  { 
    month: 'MAY', fullDate: 'MAY 2026', intensity: 85, color: '#C56E61', note: 'SURGE',
    status: 'VOLATILE',
    pillar: { stem: { char: '癸', en: 'Yin Water', god: 'Power' }, branch: { char: '巳', en: 'Snake', god: 'Rob Wealth' } },
    gauges: { wealth: 30, career: 90, emotion: 85 },
    advisory: {
        summary: "The Fire approaches its zenith. Acceleration.",
        detail: "The Snake is the 'Birth Place' of Metal but the station of Fire. The temperature rises sharply. Markets may show irrational exuberance.",
        logic: "Snake (Si) + Horse (Wu) = Fire Directional Force."
    }
  },
  { 
    month: 'JUN', fullDate: 'JUNE 2026', intensity: 100, color: '#C56E61', note: 'PEAK FIRE',
    status: 'CRITICAL',
    pillar: { stem: { char: '甲', en: 'Yang Wood', god: 'Resource' }, branch: { char: '午', en: 'Horse', god: 'Friend' } },
    gauges: { wealth: 20, career: 95, emotion: 100 },
    advisory: {
        summary: "Double Horse Self-Punishment. Maximum Volatility.",
        detail: "The month pillar duplicates the year pillar (Bing Wu). This 'Fu Yin' creates a massive surplus of Fire energy. Explosive emotions, market crashes, or sudden burnout are highly probable.",
        logic: "Wu-Wu Self-Punishment (刑)."
    }
  },
  { 
    month: 'JUL', fullDate: 'JULY 2026', intensity: 80, color: '#B59B6D', note: '',
    status: 'STABLE',
    pillar: { stem: { char: '乙', en: 'Yin Wood', god: 'Resource' }, branch: { char: '未', en: 'Goat', god: 'Output' } },
    gauges: { wealth: 65, career: 60, emotion: 50 },
    advisory: {
        summary: "Earth harmonizes the Fire. Stabilization.",
        detail: "The Goat forms a Hexagonal Harmony with the Horse. This Earth element absorbs the excess heat, turning chaos into productivity. Ideal for closing deals.",
        logic: "Horse (Wu) + Goat (Wei) = Fire/Earth Harmony."
    }
  },
  { 
    month: 'AUG', fullDate: 'AUGUST 2026', intensity: 60, color: '#9AA0A6', note: 'CLASH',
    status: 'VOLATILE',
    pillar: { stem: { char: '丙', en: 'Yang Fire', god: 'Self' }, branch: { char: '申', en: 'Monkey', god: 'Wealth' } },
    gauges: { wealth: 90, career: 40, emotion: 75 },
    advisory: {
        summary: "Fire attacks Metal. Financial conflict.",
        detail: "The Monkey contains Metal (Wealth) and Water. The annual Fire attacks this Metal strongly. Expect supply chain disruptions or sudden financial regulation changes.",
        logic: "Fire melts Metal (Wealth Element)."
    }
  },
  { 
    month: 'SEP', fullDate: 'SEPTEMBER 2026', intensity: 55, color: '#9AA0A6', note: '',
    status: 'OPTIMAL',
    pillar: { stem: { char: '丁', en: 'Yin Fire', god: 'Rob Wealth' }, branch: { char: '酉', en: 'Rooster', god: 'Wealth' } },
    gauges: { wealth: 95, career: 50, emotion: 40 },
    advisory: {
        summary: "Pure Metal resists the Fire. Definition.",
        detail: "The Rooster is pure Metal energy. It stands firm against the Fire. A time of clarity where true value is separated from the hype.",
        logic: "Rooster (You) = Peak Metal."
    }
  },
  { 
    month: 'OCT', fullDate: 'OCTOBER 2026', intensity: 45, color: '#B59B6D', note: 'GRAVE',
    status: 'STABLE',
    pillar: { stem: { char: '戊', en: 'Yang Earth', god: 'Output' }, branch: { char: '戌', en: 'Dog', god: 'Output' } },
    gauges: { wealth: 40, career: 45, emotion: 30 },
    advisory: {
        summary: "Fire enters the Tomb. Dormancy.",
        detail: "The Dog is the storage (tomb) of Fire. The year's intense energy finally begins to retreat into the ground. A time for introspection and storage.",
        logic: "Dog (Xu) = Fire Tomb."
    }
  },
  { 
    month: 'NOV', fullDate: 'NOVEMBER 2026', intensity: 75, color: '#6B8BA4', note: 'CONFLICT',
    status: 'VOLATILE',
    pillar: { stem: { char: '己', en: 'Yin Earth', god: 'Output' }, branch: { char: '亥', en: 'Pig', god: 'Power' } },
    gauges: { wealth: 55, career: 85, emotion: 70 },
    advisory: {
        summary: "Water clashes with the lingering heat.",
        detail: "The Pig brings the first strong Water of the winter, clashing with the dry energy of the year. Steam is generated - fog of war, confusion in decision making.",
        logic: "Pig (Hai) contains Ren Water."
    }
  },
  { 
    month: 'DEC', fullDate: 'DECEMBER 2026', intensity: 90, color: '#6B8BA4', note: 'TURBULENCE',
    status: 'CRITICAL',
    pillar: { stem: { char: '庚', en: 'Yang Metal', god: 'Wealth' }, branch: { char: '子', en: 'Rat', god: 'Power' } },
    gauges: { wealth: 10, career: 30, emotion: 95 },
    advisory: {
        summary: "Direct Clash with the Year Pillar. Collapse.",
        detail: "The Rat (Water) clashes directly with the Horse (Fire) of the year. This 'Zi-Wu Clash' is the most violent interaction. Systems break, hearts break, old structures fall.",
        logic: "Zi-Wu Clash (冲)."
    }
  },
  { 
    month: 'JAN', fullDate: 'JANUARY 2027', intensity: 40, color: '#B59B6D', note: 'RESET',
    status: 'STABLE',
    pillar: { stem: { char: '辛', en: 'Yin Metal', god: 'Wealth' }, branch: { char: '丑', en: 'Ox', god: 'Resource' } },
    gauges: { wealth: 70, career: 60, emotion: 20 },
    advisory: {
        summary: "Frozen Earth ends the cycle.",
        detail: "The Ox is wet, frozen earth. It extinguishes the remaining fire completely, paving the way for the next year. Total reset.",
        logic: "Ox (Chou) Harms Horse (Wu)."
    }
  },
];

// --- SUB-COMPONENTS ---

const ArchiveCard: React.FC<{ module: ForecastModule, isOpen: boolean, onToggle: () => void }> = ({ module, isOpen, onToggle }) => {
    return (
        <div className={`group border-b border-zen-text/10 bg-[#F9F7F2] transition-all duration-500 ${isOpen ? 'bg-white shadow-lg z-10' : 'hover:bg-white/60'}`}>
            {/* ... (Existing ArchiveCard content remains exactly the same, preserving layout) ... */}
            <button 
                onClick={onToggle}
                className="w-full flex items-stretch text-left focus:outline-none min-h-[100px]"
            >
                <div className="w-16 flex-shrink-0 border-r border-zen-text/5 flex flex-col items-center justify-center bg-zen-text/5 group-hover:bg-zen-text/10 transition-colors">
                    <span className="text-[10px] font-mono -rotate-90 whitespace-nowrap text-zen-text/40 tracking-widest">{module.id}</span>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded bg-zen-text/5 ${module.themeColor} uppercase`}>
                            {module.category}
                        </span>
                        {isOpen && <span className="text-[10px] text-zen-text/40 font-mono animate-pulse">READING MODE</span>}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-serif font-bold text-zen-text mb-1 transition-colors ${isOpen ? 'text-zen-accent' : ''}`}>
                        {module.title}
                    </h3>
                    <p className={`text-sm text-zen-text/60 font-sans line-clamp-1 transition-opacity ${isOpen ? 'opacity-0 h-0' : 'opacity-100'}`}>
                        {module.subtext}
                    </p>
                </div>
                <div className="hidden md:flex w-32 flex-shrink-0 flex-col items-center justify-center border-l border-zen-text/5 pr-4">
                    <span className="text-[10px] text-zen-text/30 font-mono uppercase mb-1">{module.dataMetric.label}</span>
                    <span className={`text-lg font-mono font-bold ${module.themeColor}`}>{module.dataMetric.value}</span>
                    {module.dataMetric.trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-zen-text/30" /> : <div className="w-3 h-1 bg-zen-text/20" />}
                </div>
                <div className="w-12 flex items-center justify-center">
                     <ChevronDown className={`w-5 h-5 text-zen-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zen-accent' : ''}`} />
                </div>
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
                <div className="p-6 md:p-8 pl-20 md:pl-24 bg-white relative">
                    <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-zen-accent/20" />
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6 text-zen-text/50 border-b border-zen-text/5 pb-4">
                             <div className="flex items-center gap-2 text-xs font-mono">
                                 {module.brief.icon}
                                 <span className="uppercase tracking-wider font-bold">{module.brief.source}</span>
                             </div>
                             <div className="ml-auto flex items-center gap-1 text-[10px] bg-zen-accent/10 text-zen-accent px-2 py-0.5 rounded">
                                 <Lock className="w-3 h-3" />
                                 BRIEF UNLOCKED
                             </div>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-zen-text mb-4">
                            {module.brief.title}
                        </h4>
                        <div className="space-y-4 font-sans text-zen-text/70 text-sm leading-relaxed text-justify">
                            {module.brief.content.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>
                        <div className="mt-8 pt-4 border-t border-zen-text/5 flex justify-end">
                            <button className="text-xs font-bold text-zen-accent flex items-center gap-1 hover:gap-2 transition-all">
                                FULL REPORT ANALYSIS <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const EnergyForecast: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<string | null>('ARCHIVE_01');
  const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);

  return (
    <section className="relative w-full py-16 px-4 bg-zen-bg dark:bg-[#050B14] transition-colors duration-500">
      
      {/* SECTION TITLE */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zen-text/10 bg-white/50 backdrop-blur mb-4">
                <Database className="w-3 h-3 text-zen-accent" />
                <span className="text-[10px] font-mono tracking-widest text-zen-text/60 uppercase">
                    2026 Macro Simulation
                </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-zen-text">
                The Archive Bureau
            </h2>
         </div>
         <div className="text-right hidden md:block">
            <p className="text-xs font-mono text-zen-text/40 max-w-xs ml-auto">
                ACCESSING GLOBAL DATABASE...<br/>
                CORRELATING HISTORICAL PATTERNS WITH 2026 PROJECTIONS.
            </p>
         </div>
      </div>

      {/* MAIN LAYOUT: FLUX MAP (LEFT) + ARCHIVE (RIGHT) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-0 lg:border lg:border-zen-text/10 lg:rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
        
        {/* LEFT: ENERGY TOPOGRAPHY (Redesigned) */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] text-gray-300 p-8 flex flex-col relative overflow-hidden h-auto lg:h-[800px]">
             
             {/* Background Grid & Decor */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-zen-risk/10 blur-[100px] rounded-full pointer-events-none" />

             {/* Header */}
             <div className="relative z-10 mb-8 flex-shrink-0">
                 <div className="flex items-center gap-2 mb-2">
                     <Activity className="w-4 h-4 text-zen-risk animate-pulse" />
                     <span className="font-mono text-xs font-bold tracking-widest text-white">2026 CHRONO-FLUX</span>
                 </div>
                 <h3 className="text-3xl font-serif text-white/90">Bing Wu Fire Year</h3>
                 <p className="text-xs font-mono text-white/40 mt-1">TEMPORAL ENERGY DENSITY MAP</p>
             </div>

             {/* Timeline Visualization - Flex Grow to fill space */}
             <div className="relative z-10 flex-1 flex flex-col justify-between gap-2 py-4">
                 {MONTH_FLUX.map((m, i) => (
                     <button 
                        key={i} 
                        onClick={() => setSelectedMonth(m)}
                        className="flex items-center gap-3 group h-full w-full text-left focus:outline-none"
                     >
                         <div className="w-8 text-[10px] font-mono text-white/30 group-hover:text-white transition-colors">{m.month}</div>
                         <div className="flex-1 h-full max-h-[24px] relative flex items-center">
                             {/* Background Track */}
                             <div className="absolute inset-0 bg-white/5 rounded-sm" />
                             {/* Active Bar */}
                             <div 
                                 className="h-1/3 rounded-sm transition-all duration-700 ease-out group-hover:h-full relative min-w-[2px]"
                                 style={{ 
                                     width: `${m.intensity}%`,
                                     backgroundColor: m.color,
                                     boxShadow: `0 0 10px ${m.color}20`
                                 }}
                             >
                                 {/* Tooltip-ish note */}
                                 {m.note && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black border border-white/10 text-white/80 uppercase tracking-wider shadow-lg">
                                            {m.note}
                                        </span>
                                    </div>
                                 )}
                             </div>
                         </div>
                     </button>
                 ))}
             </div>

             {/* Footer Legend */}
             <div className="relative z-10 mt-8 pt-6 border-t border-gray-800 flex justify-between items-end flex-shrink-0">
                 <div className="flex flex-col gap-2 w-full">
                     <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Element Composition</span>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#76A07B]" />
                            <span className="text-[9px] font-mono text-white/40">WOOD</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#C56E61]" />
                            <span className="text-[9px] font-mono text-white/40">FIRE</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#B59B6D]" />
                            <span className="text-[9px] font-mono text-white/40">EARTH</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#9AA0A6]" />
                            <span className="text-[9px] font-mono text-white/40">METAL</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#6B8BA4]" />
                            <span className="text-[9px] font-mono text-white/40">WATER</span>
                        </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* RIGHT: ARCHIVE SHELF (Light Mode Paper) */}
        <div className="w-full lg:w-2/3 bg-[#F9F7F2] lg:overflow-y-auto lg:h-[800px] scrollbar-thin scrollbar-thumb-zen-text/10 scrollbar-track-transparent">
             {/* Sticky Header inside Scroll Area - Content Removed but height preserved */}
             <div className="sticky top-0 z-20 bg-[#F9F7F2]/95 backdrop-blur border-b border-zen-text/10 p-4 min-h-[50px]">
             </div>

             {/* Archive List */}
             <div>
                 {MODULES.map((module) => (
                     <ArchiveCard 
                        key={module.id} 
                        module={module} 
                        isOpen={openModuleId === module.id}
                        onToggle={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
                     />
                 ))}
                 
                 {/* Load More Hint */}
                 <div className="p-8 text-center border-t border-zen-text/5">
                     <p className="text-xs font-mono text-zen-text/30 animate-pulse">
                         SCROLL TO REVEAL MORE DATA
                     </p>
                 </div>
             </div>
        </div>

      </div>

      {/* MONTHLY TEMPORAL ANALYSIS CARD MODAL */}
      {selectedMonth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setSelectedMonth(null)}
            />
            
            {/* Dark Tech Matrix Card */}
            <div 
                className="relative w-full max-w-lg bg-[#0B0B0B]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                style={{ boxShadow: `0 0 50px ${selectedMonth.color}20` }}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedMonth(null)}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Decorative Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* Header */}
                <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Layers className="w-4 h-4" style={{ color: selectedMonth.color }} />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">TEMPORAL_NODE_SCAN</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
                            {selectedMonth.fullDate}
                        </h2>
                        <div 
                            className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-2`}
                            style={{ 
                                borderColor: `${selectedMonth.color}40`, 
                                backgroundColor: `${selectedMonth.color}10`,
                                color: selectedMonth.color 
                            }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: selectedMonth.color }} />
                            {selectedMonth.status}
                        </div>
                    </div>
                </div>

                {/* Bazi Matrix */}
                <div className="relative z-10 grid grid-cols-2 gap-4 mb-8">
                    {/* Stem */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
                        <span className="text-[10px] font-mono text-white/30 uppercase mb-1 z-10">Heavenly Stem</span>
                        <span className="text-4xl font-serif font-bold text-white mb-1 z-10">{selectedMonth.pillar.stem.char}</span>
                        <span className="text-xs font-mono text-white/60 uppercase z-10">{selectedMonth.pillar.stem.en}</span>
                        <div className="mt-2 px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white/80 z-10 border border-white/5">
                            {selectedMonth.pillar.stem.god}
                        </div>
                    </div>
                    {/* Branch */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center relative group overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
                        <span className="text-[10px] font-mono text-white/30 uppercase mb-1 z-10">Earthly Branch</span>
                        <span className="text-4xl font-serif font-bold text-white mb-1 z-10">{selectedMonth.pillar.branch.char}</span>
                        <span className="text-xs font-mono text-white/60 uppercase z-10">{selectedMonth.pillar.branch.en}</span>
                         <div className="mt-2 px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white/80 z-10 border border-white/5">
                            {selectedMonth.pillar.branch.god}
                        </div>
                    </div>
                </div>

                {/* Density Gauges */}
                <div className="relative z-10 space-y-4 mb-8 bg-black/40 p-5 rounded-2xl border border-white/5">
                     <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-3 h-3 text-white/40" />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">ENERGY VECTORS</span>
                     </div>
                     {[
                        { label: 'WEALTH FLUX', val: selectedMonth.gauges.wealth, c: '#C19A6B' },
                        { label: 'CAREER MOMENTUM', val: selectedMonth.gauges.career, c: '#6B8BA4' },
                        { label: 'EMOTIONAL ENTROPY', val: selectedMonth.gauges.emotion, c: '#C56E61' }
                     ].map((g, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-white/60 w-28 text-right">{g.label}</span>
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${g.val}%`, backgroundColor: g.c, boxShadow: `0 0 10px ${g.c}` }} 
                                />
                            </div>
                            <span className="text-[9px] font-mono text-white/40 w-6 text-right">{g.val}%</span>
                        </div>
                     ))}
                </div>

                {/* Advisory Section */}
                <div className="relative z-10">
                    <h4 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span style={{ color: selectedMonth.color }}>///</span> {selectedMonth.advisory.summary}
                    </h4>
                    <p className="text-sm font-sans text-white/60 leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                        {selectedMonth.advisory.detail}
                    </p>

                    {/* Logic Footer */}
                    <div className="bg-white/5 rounded-xl p-3 flex items-start gap-3 border border-white/10">
                        <Cpu className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                        <div>
                            <span className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">ALGORITHMIC LOGIC MATCH</span>
                            <span className="text-xs font-mono text-white/80">
                                {selectedMonth.advisory.logic}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      )}

    </section>
  );
};

export default EnergyForecast;