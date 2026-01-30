import React from 'react';
import { Quote, Star, Lock, Database, CheckCircle, Globe } from 'lucide-react';

// --- DATA ---

const CASES = [
  {
    id: 'A',
    score: '94.2%',
    sector: 'CAREER / VISA',
    quote: "我原本对 H-1B 续签极度恐慌。报告标注了‘官印相生’月份的贵人运，让我推迟了跳槽。结果那个月现任公司启动了绿卡并成功避开裁员。这不是算命，是系统避险。",
    author: "Alex Z.",
    role: "Senior Engineer",
    location: "Bay Area",
    flag: "🇺🇸",
    verified: true
  },
  {
    id: 'B',
    score: '98.5%',
    sector: 'WEALTH / RISK',
    quote: "作为理性投资人，我从不相信空泛预言。但 FatePlanner 对‘比劫夺财’月份的预警精准得令人发指。当时重仓标的风险极大，我选择了‘捂紧钱包’，结果市场崩盘我死里逃生。",
    author: "Sarah L.",
    role: "VC Partner",
    location: "NYC",
    flag: "🇺🇸",
    verified: true
  },
  {
    id: 'C',
    score: '96.8%',
    sector: 'DECISION LOGIC',
    quote: "‘解锁以上所有内容’物超所值。PDF 报告将 5000 年逻辑拆解成了我能听懂的执行步骤。它解释了为什么我焦虑源于‘身旺无依’，帮我调整了合伙结构，比心理咨询更有用。",
    author: "David W.",
    role: "Startup Founder",
    location: "Singapore",
    flag: "🇸🇬",
    verified: true
  }
];

const SocialProof: React.FC = () => {
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
            理智者的全球共识
          </h2>
          <p className="text-sm font-sans text-zen-text/60 max-w-xl mx-auto">
            当迷信被剥离，剩下的就是纯粹的数据匹配率。
          </p>
        </div>

        {/* --- REVIEW CARDS (SOCIAL UI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CASES.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-[#F9F7F2] border border-zen-accent/10 rounded-xl p-6 hover:shadow-xl hover:border-zen-accent/30 transition-all duration-300 flex flex-col justify-between"
            >
               {/* User Profile Header */}
               <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zen-text/5">
                   <div className="w-10 h-10 rounded-full bg-white border border-zen-text/10 flex items-center justify-center text-zen-text font-serif font-bold text-sm shadow-sm">
                       {item.author.charAt(0)}
                   </div>
                   <div>
                       <div className="flex items-center gap-1.5">
                           <h4 className="text-sm font-bold text-zen-text">{item.author}</h4>
                           {item.verified && (
                               <span className="px-1 py-0.5 bg-[#C19A6B]/10 text-[#C19A6B] text-[8px] font-bold border border-[#C19A6B]/20 rounded flex items-center gap-0.5" title="Verified Purchaser">
                                   VP <CheckCircle className="w-2 h-2" />
                               </span>
                           )}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] text-zen-text/50 font-mono">
                           <span>{item.role}</span>
                           <span>•</span>
                           <span className="flex items-center gap-1">@{item.location} {item.flag}</span>
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
                 <div className="px-2 py-1 bg-white border border-zen-text/5 rounded text-[10px] font-bold text-zen-text/60 font-sans uppercase tracking-wide group-hover:bg-zen-accent group-hover:text-white transition-colors">
                    {item.sector}
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-zen-text/40 tracking-wider uppercase">
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