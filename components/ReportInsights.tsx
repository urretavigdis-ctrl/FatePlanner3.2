import React, { useState } from 'react';
import { 
  ChevronDown, Lock, ShieldAlert, Flame, Briefcase, 
  TrendingUp, Users, Heart, Clock, Activity, 
  Compass, Calendar, ArrowRight, CheckCircle
} from 'lucide-react';

interface ReportInsightsProps {
  onUnlock?: () => void;
}

const INSIGHTS = [
  {
    id: 'TAISUI',
    title: 'Tai Sui Relationship Analysis',
    icon: <ShieldAlert className="w-5 h-5" />,
    hook: "In 2026 Bing Wu Year, the real risk comes from the 'Punishment, Clash, Break, and Harm' of the earthly branches. Your PDF will accurately calculate your real relationship with Tai Sui.",
    lockedText: "Based on the precise chart, your earthly branch forms a [Self-Punishment] pattern with the annual Wu Fire. This means more than just offending Tai Sui; it signifies internal friction. It is recommended to wear metal accessories after the Start of Spring to drain the Fire energy, and avoid developing towards the South..."
  },
  {
    id: 'YEAR_TUNE',
    title: 'Annual Theme Definition',
    icon: <Flame className="w-5 h-5" />,
    hook: "In a year of raging Fire, will this flame refine you into gold or burn up your resources? Understand your keyword first.",
    lockedText: "Core Annual Keyword: [Refinement]. The Bing Wu Fire acts as the 'Seven Killings' attacking your Day Master. This represents immense pressure, but also explosive opportunity. Only extreme self-discipline (Seal element transformation) can handle this energy..."
  },
  {
    id: 'CAREER',
    title: 'Career Promotion Timing',
    icon: <Briefcase className="w-5 h-5" />,
    hook: "Which month has the strongest Authority energy? Which month is prone to betrayal by peers? Don't guess, look at the data.",
    lockedText: "Strategic Window: Lunar April (Si) to June (Wei). During these three months, Fire and Earth generate each other, protecting you with Authority and Seal, favoring upward management and position striving. Beware of Lunar November (Zi), where Water clashes with Fire, causing potential disputes..."
  },
  {
    id: 'WEALTH_STRUC',
    title: 'Wealth Income Structure',
    icon: <TrendingUp className="w-5 h-5" />,
    hook: "Are you destined for a salary (Direct Wealth) or a side hustle (Indirect Wealth)? Clarify your wealth structure before investing.",
    lockedText: "Wealth Quadrant Analysis: Direct Wealth is stable but growth-limited. Indirect Wealth star is in the 'Growth' phase. 80% of your wealth increase in 2026 will come from side hustles or investment returns. It is recommended to keep your main job's cash flow while boldly trying asset-light side projects..."
  },
  {
    id: 'WEALTH_RISK',
    title: 'Wealth Risk Warning',
    icon: <Users className="w-5 h-5" />,
    hook: "Your biggest financial loophole in 2026 may come from 'acquaintances'. With Rob Wealth in the annual chart, lending is risky.",
    lockedText: "Red Alert: Rob Wealth snatching money. This year, partnerships or lending money to friends is strictly taboo. Without defense, you may encounter 'betrayal by familiarity' mid-year. Due to excessive Wu Fire, ensure all contracts are reviewed by professional lawyers..."
  },
  {
    id: 'LOVE_STRAT',
    title: 'Deep Love Strategy',
    icon: <Heart className="w-5 h-5" />,
    hook: "Is romance in a 'blind date' or at the 'workplace'? Whether single or protecting a relationship, you need a custom script.",
    lockedText: "Romance Radar: Your True Love star is hidden in the Seal storage. This means your partner is likely to be introduced by elders or met in learning environments (libraries, seminars). They will have a distinct 'mentor' quality..."
  },
  {
    id: 'PEACH_WINDOW',
    title: 'Romance Window Lock-in',
    icon: <Clock className="w-5 h-5" />,
    hook: "Don't waste time in bad romance months. The report locks in specific months for Red Matchmaker and Peach Blossom stars in 2026.",
    lockedText: "High Frequency Resonance: Lunar August (You). The Sky Happiness star enters your life. This is not just a season for love, but a golden period for establishing relationships. Avoid Lunar February, as the Peach Blossom carries a curse, easily leading to love triangles..."
  },
  {
    id: 'HEALTH',
    title: 'Elemental Health Signal',
    icon: <Activity className="w-5 h-5" />,
    hook: "Anxiety and insomnia are not accidental, but elemental imbalance. In a Fire year, which organ will strike first?",
    lockedText: "Health Scan: Blazing Fire and Dry Earth. Focus on the cardiovascular system and small intestine function. Mentally, you are prone to severe insomnia caused by 'Heart Fire'. It is recommended to consume more black foods (Water element) to regulate the climate..."
  },
  {
    id: 'FENGSHUI',
    title: 'Feng Shui Risk Layout',
    icon: <Compass className="w-5 h-5" />,
    hook: "Warning: The South is a forbidden zone. Learn to use simple items to neutralize negative energy and boost wealth.",
    lockedText: "Spatial Feng Shui: The Five Yellow Star (Disaster Star) flies to the South. Avoid construction, renovation, or placing red items in this sector. Remedy: Place a copper gourd or six Qianlong coins to drain the Earth energy..."
  },
  {
    id: 'MONTHLY',
    title: '12-Month Tactical Guide',
    icon: <Calendar className="w-5 h-5" />,
    hook: "Annual fortune is too general? This report breaks down 2026 into 12 specific action guides.",
    lockedText: "1st Month: Hidden Dragon, plan ahead; 2nd Month: Dragon in the field, good for visits; 3rd Month: Emotional volatility, avoid decisions... Every lunar month's energy fluctuation marks a clear action signal for you..."
  },
];

const ReportInsights: React.FC<ReportInsightsProps> = ({ onUnlock }) => {
  // Open the first one by default to show the UI pattern
  const [openSection, setOpenSection] = useState<string | null>('TAISUI');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full bg-zen-bg pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header / Divider */}
      <div className="relative z-10 bg-zen-bg border-y border-zen-accent/10 px-6 py-6 flex justify-between items-center mt-8">
        <div>
           <h2 className="font-serif text-xl font-bold text-zen-text">Report Insights</h2>
        </div>
        <div className="flex items-center gap-1 text-zen-risk">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold">10/10 LOCKED</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-8 space-y-4">
        {INSIGHTS.map((item) => (
            <div 
                key={item.id}
                className={`
                    group bg-white rounded-xl border transition-all duration-300 overflow-hidden
                    ${openSection === item.id ? 'border-zen-accent shadow-lg scale-[1.01]' : 'border-zen-accent/10 hover:border-zen-accent/30'}
                `}
            >
                {/* Header */}
                <button 
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg transition-colors ${openSection === item.id ? 'bg-zen-accent text-white' : 'bg-zen-text/5 text-zen-text/60 group-hover:text-zen-accent'}`}>
                            {item.icon}
                        </div>
                        <h3 className="font-serif font-bold text-zen-text text-base md:text-lg">{item.title}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zen-text/40 transition-transform duration-300 ${openSection === item.id ? 'rotate-180 text-zen-accent' : ''}`} />
                </button>

                {/* Body */}
                <div 
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${openSection === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                    <div className="overflow-hidden">
                        <div className="px-5 pb-6 pt-0 border-t border-zen-accent/5">
                            
                            {/* Hook Text */}
                            <div className="py-4">
                                <p className="text-zen-text/80 font-sans leading-relaxed text-sm md:text-base border-l-2 border-zen-accent/40 pl-4 italic">
                                    "{item.hook}"
                                </p>
                            </div>

                            {/* Locked Result Area (The Internal CTA) */}
                            <div className="relative mt-2 p-6 bg-zen-text/5 rounded-xl border-2 border-dashed border-zen-accent/30 overflow-hidden group/lock">
                                
                                {/* Top Lock Indicator */}
                                <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                                    <div className="bg-zen-bg px-2">
                                        <Lock className="w-5 h-5 text-zen-text/30" />
                                    </div>
                                </div>
                                
                                {/* Blurred Content */}
                                <div className="mt-2 text-sm font-serif text-zen-text/60 blur-[6px] select-none leading-loose text-justify">
                                    {item.lockedText}
                                    <span className="opacity-50"> This is because the annual stem reveals Bing Fire, causing a qualitative change in your chart structure. Without timely strategy adjustment, opportunities may be missed...</span>
                                </div>

                                {/* CTA Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-zen-bg/60 via-zen-bg/40 to-transparent">
                                    <button 
                                        onClick={onUnlock}
                                        className="flex items-center gap-3 bg-zen-accent hover:bg-[#D4AF80] text-white px-8 py-3 rounded-lg shadow-xl shadow-zen-accent/20 hover:shadow-zen-accent/40 hover:-translate-y-0.5 transition-all duration-300 group/btn border border-white/20"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span className="font-serif font-bold italic text-base md:text-lg tracking-wide">
                                            Unlock Full Report
                                        </span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Trust Signal */}
                            <div className="mt-3 flex justify-center items-center gap-2 text-[10px] text-zen-text/40 font-mono">
                                <CheckCircle className="w-3 h-3" />
                                <span>VERIFIED BAZI ALGORITHM</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        ))}

        <div className="text-center py-8">
            <p className="text-xs font-serif text-zen-text/40 italic">
                "Destiny is not a matter of chance; it is a matter of choice."
            </p>
        </div>
      </div>

    </div>
  );
};

export default ReportInsights;