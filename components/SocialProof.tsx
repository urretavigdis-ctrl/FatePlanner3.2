import React, { useState } from 'react';
import { Quote, Star, Lock, Database, CheckCircle, Globe, Briefcase, Coins, Heart, Activity, Zap } from 'lucide-react';

// --- DATA ---

type Review = {
  id: string;
  score: string;
  sector: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  flag: string;
  verified: boolean;
};

const TOPICS = [
  { id: 'CAREER', label: 'Career & Global', icon: <Briefcase className="w-4 h-4"/> },
  { id: 'WEALTH', label: 'Wealth & Risk', icon: <Coins className="w-4 h-4"/> },
  { id: 'RELATIONSHIP', label: 'Love & Partners', icon: <Heart className="w-4 h-4"/> },
  { id: 'DECISION', label: 'Strategic Logic', icon: <Zap className="w-4 h-4"/> },
  { id: 'HEALTH', label: 'Health & Energy', icon: <Activity className="w-4 h-4"/> },
];

const REVIEWS: Record<string, Review[]> = {
  CAREER: [
    {
      id: 'c1',
      score: '94.2%',
      sector: 'CAREER / VISA',
      quote: "I was extremely panicked about my H-1B renewal. The report highlighted the 'Noble Man' luck in the months where Authority nurtures Seal, which made me delay job hopping. As a result, my current company started the Green Card process that month.",
      author: "Alex Z.",
      role: "Senior Engineer",
      location: "Bay Area",
      flag: "🇺🇸",
      verified: true
    },
    {
      id: 'c2',
      score: '91.5%',
      sector: 'RELOCATION',
      quote: "Relocation to Singapore was a gamble. The report identified the 'Traveling Horse' star activation in my chart, giving me the logical confidence to move. My income effectively doubled within 6 months.",
      author: "Michael T.",
      role: "Fintech Lead",
      location: "Singapore",
      flag: "🇸🇬",
      verified: true
    },
    {
      id: 'c3',
      score: '93.8%',
      sector: 'INTERNAL TRANSFER',
      quote: "Stuck in middle management. The analysis suggested a 'Breaker' year suitable for internal transfer rather than quitting. I pushed for the transfer and avoided a brutal job market.",
      author: "Jessica K.",
      role: "Product Manager",
      location: "London",
      flag: "🇬🇧",
      verified: true
    }
  ],
  WEALTH: [
    {
      id: 'w1',
      score: '98.5%',
      sector: 'RISK CONTROL',
      quote: "As a rational investor, I never believed in vague prophecies. But FatePlanner's warning about the 'Rob Wealth' months was terrifyingly accurate. I chose to 'hold tight'. The market crashed, and I survived.",
      author: "Sarah L.",
      role: "VC Partner",
      location: "NYC",
      flag: "🇺🇸",
      verified: true
    },
    {
      id: 'w2',
      score: '96.2%',
      sector: 'ASSET PROTECTION',
      quote: "I was about to buy a property in 2025. FatePlanner flagged a 'Clash' in my asset palace. I waited. Prices dropped 15% later that year. That single insight saved me over $200k in equity.",
      author: "Ryan D.",
      role: "Real Estate Investor",
      location: "Toronto",
      flag: "🇨🇦",
      verified: true
    },
    {
      id: 'w3',
      score: '95.0%',
      sector: 'TRADING STRATEGY',
      quote: "Crypto volatility kept me up at night. Understanding my 'Indirect Wealth' flow helped me set a stop-loss strategy aligned with my monthly luck cycles. I finally sleep well.",
      author: "Chris P.",
      role: "Crypto Trader",
      location: "Dubai",
      flag: "🇦🇪",
      verified: true
    }
  ],
  RELATIONSHIP: [
    {
      id: 'r1',
      score: '97.4%',
      sector: 'TIMING',
      quote: "Dating was exhausting. The report pinpointed my 'Peach Blossom' window. I focused my social efforts specifically during those two months and met my fiancé. Efficient and magical.",
      author: "Sophie M.",
      role: "Corporate Lawyer",
      location: "Sydney",
      flag: "🇦🇺",
      verified: true
    },
    {
      id: 'r2',
      score: '92.8%',
      sector: 'CONFLICT RESOLUTION',
      quote: "We were on the brink of divorce. Understanding the elemental clash in our charts helped us realize it wasn't personal, just energetic friction. We adjusted our communication style and saved the marriage.",
      author: "James T.",
      role: "Architect",
      location: "Chicago",
      flag: "🇺🇸",
      verified: true
    },
    {
      id: 'r3',
      score: '95.5%',
      sector: 'PARTNER SELECTION',
      quote: "I kept attracting toxic partners. The 'Seven Killings' analysis showed why I was subconsciously seeking conflict. I changed my selection criteria based on the report's logic.",
      author: "Emma W.",
      role: "Surgeon",
      location: "Seoul",
      flag: "🇰🇷",
      verified: true
    }
  ],
  DECISION: [
    {
      id: 'd1',
      score: '96.8%',
      sector: 'PARTNERSHIP',
      quote: "'Unlock All Content' was worth every penny. The PDF report broke down 5000-year-old logic into actionable steps. It explained why my anxiety stems from being 'weak but unsupported', helping me adjust my partnership structure.",
      author: "David W.",
      role: "Startup Founder",
      location: "Singapore",
      flag: "🇸🇬",
      verified: true
    },
    {
      id: 'd2',
      score: '94.5%',
      sector: 'CO-FOUNDER FIT',
      quote: "I was torn between two co-founders. The compatibility analysis showed a 'Harm' structure with one. I went with the other. Looking back, it was the best decision for our company culture.",
      author: "Elena R.",
      role: "Tech CEO",
      location: "Berlin",
      flag: "🇩🇪",
      verified: true
    },
    {
      id: 'd3',
      score: '91.2%',
      sector: 'LAUNCH TIMING',
      quote: "The 'Void' concept explained why my projects were stalling. I used that time for R&D instead of pushing a launch. When the void passed, we launched successfully with a better product.",
      author: "Marcus L.",
      role: "Creative Director",
      location: "Tokyo",
      flag: "🇯🇵",
      verified: true
    }
  ],
  HEALTH: [
    {
      id: 'h1',
      score: '93.5%',
      sector: 'BURNOUT PREVENTION',
      quote: "I'm a high-performer but suffered burnout. The report identified a 'Fire-Water Clash' affecting my sleep. Adjusting my meeting schedule to match solar time helped restore my energy.",
      author: "Daniel H.",
      role: "Fund Manager",
      location: "Hong Kong",
      flag: "🇭🇰",
      verified: true
    },
    {
      id: 'h2',
      score: '96.0%',
      sector: 'WELLNESS AUDIT',
      quote: "Unexplained fatigue was ruining my productivity. The elemental audit showed a severe lack of Wood. I started forest bathing and changed my diet. My creative energy returned within weeks.",
      author: "Olivia G.",
      role: "Author",
      location: "Paris",
      flag: "🇫🇷",
      verified: true
    },
    {
      id: 'h3',
      score: '98.1%',
      sector: 'RISK AVOIDANCE',
      quote: "2026 looked risky for health in my chart. I took the preventative advice seriously and did a comprehensive checkup. Caught a minor issue before it became major. Worth 100x the price.",
      author: "Thomas B.",
      role: "Consultant",
      location: "Zurich",
      flag: "🇨🇭",
      verified: true
    }
  ]
};

const SocialProof: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CAREER');

  return (
    <section className="py-24 px-4 w-full relative border-t border-zen-accent/10 bg-white/50">
      <div className="max-w-6xl mx-auto">
        
        {/* --- SOCIAL PROOF HEADER --- */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zen-accent/20 bg-zen-accent/5">
            <Globe className="w-3 h-3 text-zen-accent" />
            <span className="text-[10px] font-mono tracking-widest text-zen-accent uppercase">
                Global Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text">
            Global Consensus of Rationalists
          </h2>
          <p className="text-sm font-sans text-zen-text/60 max-w-xl mx-auto">
            When superstition is stripped away, what remains is pure data matching rates.
          </p>
        </div>

        {/* --- TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {TOPICS.map(topic => (
                <button 
                    key={topic.id}
                    onClick={() => setActiveTab(topic.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full border transition-all duration-300 font-sans text-xs md:text-sm font-bold tracking-wide
                        ${activeTab === topic.id 
                            ? 'bg-zen-accent text-white border-zen-accent shadow-lg scale-105' 
                            : 'bg-white border-zen-accent/20 text-zen-text/60 hover:border-zen-accent hover:text-zen-accent'}
                    `}
                >
                    {topic.icon}
                    {topic.label}
                </button>
            ))}
        </div>

        {/* --- REVIEW CARDS (SOCIAL UI) --- */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {REVIEWS[activeTab].map((item) => (
            <div 
              key={item.id}
              className="group relative bg-[#F9F7F2] border border-zen-accent/10 rounded-xl p-6 hover:shadow-xl hover:border-zen-accent/30 transition-all duration-300 flex flex-col justify-between"
            >
               {/* User Profile Header */}
               <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zen-text/5">
                   <div className="w-10 h-10 rounded-full bg-white border border-zen-text/10 flex items-center justify-center text-zen-text font-serif font-bold text-sm shadow-sm shrink-0">
                       {item.author.charAt(0)}
                   </div>
                   <div className="min-w-0">
                       <div className="flex items-center gap-1.5">
                           <h4 className="text-sm font-bold text-zen-text truncate">{item.author}</h4>
                           {item.verified && (
                               <span className="px-1 py-0.5 bg-[#C19A6B]/10 text-[#C19A6B] text-[8px] font-bold border border-[#C19A6B]/20 rounded flex items-center gap-0.5 shrink-0" title="Verified Purchaser">
                                   VP <CheckCircle className="w-2 h-2" />
                               </span>
                           )}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] text-zen-text/50 font-mono truncate">
                           <span className="truncate">{item.role}</span>
                           <span>•</span>
                           <span className="flex items-center gap-1 shrink-0">{item.location} {item.flag}</span>
                       </div>
                   </div>
               </div>

              {/* Card Middle: Content */}
              <div className="relative mb-6 flex-1">
                 <p className="relative z-10 text-sm font-sans text-zen-text/80 leading-relaxed text-justify">
                    {item.quote}
                 </p>
              </div>

              {/* Card Bottom: Metadata */}
              <div className="flex justify-between items-center pt-2">
                 <div className="px-2 py-1 bg-white border border-zen-text/5 rounded text-[10px] font-bold text-zen-text/60 font-sans uppercase tracking-wide group-hover:bg-zen-accent group-hover:text-white transition-colors truncate max-w-[120px]">
                    {item.sector}
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-zen-text/40 tracking-wider uppercase shrink-0">
                        ACCURACY
                    </span>
                    <span className="text-sm font-mono font-bold text-zen-accent">
                        {item.score}
                    </span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- TRUST BAR --- */}
        <div className="border-t border-zen-accent/10 pt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <TrustBadge icon={<Lock className="w-4 h-4" />} label="AES-256 ENCRYPTED" />
            <TrustBadge icon={<Database className="w-4 h-4" />} label="5000-YEAR LOGIC CORE" />
            <TrustBadge icon={<CheckCircle className="w-4 h-4" />} label="VERIFIED OUTCOMES" />
            <TrustBadge icon={<Star className="w-4 h-4" />} label="4.9/5 RATIONAL RATING" />
        </div>

      </div>
    </section>
  );
};

const TrustBadge = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex items-center gap-2 text-zen-text/60">
        {icon}
        <span className="text-[10px] font-mono tracking-widest font-bold">{label}</span>
    </div>
);

export default SocialProof;