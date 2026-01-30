import React, { useState, useEffect } from 'react';
import { 
  Globe, Sun, Zap, TrendingUp, AlertTriangle, 
  FileText, BookOpen, Landmark, Activity, Lock, 
  ArrowUpRight, BarChart3, Database, ChevronDown, Radio
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

const MODULES: ForecastModule[] = [
  {
    id: 'ARCHIVE_01',
    category: 'SOCIOLOGY / HISTORY',
    title: '1966：消失的四十六万个生命',
    subtext: '信仰如何改写生物学统计数据？一场关于“火马”的集体潜意识实验。',
    themeColor: 'text-red-600',
    dataMetric: { label: 'Birth Rate Drop', value: '-26.3%', trend: 'down' },
    brief: {
      source: 'Demographic History Review',
      icon: <BookOpen className="w-4 h-4" />,
      title: '1966年‘火马’人口大减速的社会学复盘',
      content: [
        "1966年（丙午年），日本出生率突然暴跌 26%。这不是因为战争或饥荒，而是源于一个古老的迷信：‘火马年出生的女性克夫’。",
        "这一现象证明了‘文化模因’（Meme）可以像病毒一样改写现实世界的统计数据。2026 年同样是丙午年，在社交媒体的放大下，这种‘集体情绪共振’将比 1966 年更加剧烈。",
        "我们预测 2026 年全球出生率将因经济焦虑与文化暗示迎来新的结构性拐点，而这种恐惧本身，就是一种巨大的做空能量。"
      ]
    }
  },
  {
    id: 'ARCHIVE_02',
    category: 'MACRO ECONOMICS',
    title: '债务长城：三万亿的清算',
    subtext: '低利率时代的账单终于到期。谁在裸泳，谁在岸上？',
    themeColor: 'text-stone-600',
    dataMetric: { label: 'Maturity Wall', value: '$3.2T', trend: 'up' },
    brief: {
      source: 'IMF Global Financial Stability Report',
      icon: <Landmark className="w-4 h-4" />,
      title: '为何 3 万亿债务到期是 2026 的必经火场',
      content: [
        "根据 IMF 数据，全球约有 3.2 万亿美元的企业债务将在 2025-2026 年集中到期。这些债务大多是在低利率时期借入的。",
        "面对 2026 年的高利率环境（High-for-Longer），大量僵尸企业将面临‘再融资’失败的风险。这就是五行中‘火克金’的经济学映射——火（通胀/利率）熔断了金（资金链）。",
        "对于个人而言，2026 年的现金流比资产负债表更重要。流动性将是唯一的救生圈。"
      ]
    }
  },
  {
    id: 'ARCHIVE_03',
    category: 'SOLAR PHYSICS',
    title: '太阳周期 25：来自恒星的愤怒',
    subtext: '天上的火与地上的躁动。NASA 确认太阳活动处于极大期。',
    themeColor: 'text-orange-500',
    dataMetric: { label: 'Sunspot Count', value: '185', trend: 'up' },
    brief: {
      source: 'NASA Solar Cycle Progression',
      icon: <Sun className="w-4 h-4" />,
      title: '地磁风暴与人类情绪的统计学关联',
      content: [
        "第 25 太阳周期将在 2025-2026 年达到峰值。科学研究表明，强烈的地磁活动不仅干扰电网，还与人类的心理健康波动（焦虑、攻击性行为）呈正相关。",
        "在中医与易学视角下，这是‘外火引动内火’。2026 年将是心脑血管疾病与精神类疾病的高发期。",
        "社会层面，这种‘燥热’能量往往对应着群体性冲突的增加。保持冷静（水能量）将成为极稀缺的战略资源。"
      ]
    }
  },
  {
    id: 'ARCHIVE_04',
    category: 'TECHNOLOGY / ENERGY',
    title: '算力与电力的博弈',
    subtext: 'AI 的尽头是光伏与核聚变。硅基生命正在吞噬碳基世界的能源。',
    themeColor: 'text-blue-600',
    dataMetric: { label: 'Grid Load', value: '98%', trend: 'up' },
    brief: {
      source: 'IEA Electricity Market Report',
      icon: <Zap className="w-4 h-4" />,
      title: '当数据中心成为新的‘吸能黑洞’',
      content: [
        "AI 模型的训练与推理正在指数级增加电力消耗。2026 年，数据中心的能耗瓶颈将通过电价飙升传导至普通消费者。",
        "这是一场关于‘火’（电力/算力）的争夺战。如果你所在的行业极度依赖廉价能源，2026 年将面临成本重估。",
        "投资逻辑上，能源基础设施将成为比 AI 应用层更确定的‘铲子’。"
      ]
    }
  },
  {
    id: 'ARCHIVE_05',
    category: 'GEOPOLITICS',
    title: 'K型分化的终局',
    subtext: '世界不再平坦，而是撕裂。你是向上跃迁，还是向下沉沦？',
    themeColor: 'text-purple-600',
    dataMetric: { label: 'Gini Coeff', value: '0.48', trend: 'neutral' },
    brief: {
      source: 'World Inequality Lab',
      icon: <Globe className="w-4 h-4" />,
      title: '中产阶级的防御性生存指南',
      content: [
        "K 型复苏意味着平均数失去了意义。2026 年，拥有核心资产（技术、品牌、稀缺资源）的群体将继续向上，而依赖出卖劳动力的群体将被通胀和 AI 替代双重挤压。",
        "这种分化对应着八字中的‘比劫夺财’。你的财富不仅取决于你的努力，更取决于你处于 K 线的哪一端。",
        "策略：剥离无效资产，通过‘印星’（教育/技能升级）完成阶层卡位。"
      ]
    }
  }
];

// --- SUB-COMPONENTS ---

const DashboardMetric = ({ label, value, unit = '', active = false }: { label: string, value: string, unit?: string, active?: boolean }) => (
    <div className={`flex flex-col p-4 rounded-lg border transition-all duration-500 ${active ? 'bg-zen-risk/10 border-zen-risk/30' : 'bg-[#111] border-[#333]'}`}>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">{label}</span>
        <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold ${active ? 'text-zen-risk' : 'text-gray-200'}`}>{value}</span>
            {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
        {active && <div className="w-full h-0.5 bg-zen-risk/30 mt-2 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-zen-risk w-1/2 animate-[progress_2s_ease-in-out_infinite]" />
        </div>}
    </div>
);

const ArchiveCard: React.FC<{ module: ForecastModule, isOpen: boolean, onToggle: () => void }> = ({ module, isOpen, onToggle }) => {
    return (
        <div className={`group border-b border-zen-text/10 bg-[#F9F7F2] transition-all duration-500 ${isOpen ? 'bg-white shadow-lg z-10' : 'hover:bg-white/60'}`}>
            
            {/* Header / Tab */}
            <button 
                onClick={onToggle}
                className="w-full flex items-stretch text-left focus:outline-none min-h-[100px]"
            >
                {/* ID Column */}
                <div className="w-16 flex-shrink-0 border-r border-zen-text/5 flex flex-col items-center justify-center bg-zen-text/5 group-hover:bg-zen-text/10 transition-colors">
                    <span className="text-[10px] font-mono -rotate-90 whitespace-nowrap text-zen-text/40 tracking-widest">{module.id}</span>
                </div>

                {/* Main Content */}
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

                {/* Metric Column (Visible on Desktop) */}
                <div className="hidden md:flex w-32 flex-shrink-0 flex-col items-center justify-center border-l border-zen-text/5 pr-4">
                    <span className="text-[10px] text-zen-text/30 font-mono uppercase mb-1">{module.dataMetric.label}</span>
                    <span className={`text-lg font-mono font-bold ${module.themeColor}`}>{module.dataMetric.value}</span>
                    {module.dataMetric.trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-zen-text/30" /> : <div className="w-3 h-1 bg-zen-text/20" />}
                </div>

                {/* Toggle Icon */}
                <div className="w-12 flex items-center justify-center">
                     <ChevronDown className={`w-5 h-5 text-zen-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zen-accent' : ''}`} />
                </div>
            </button>

            {/* Expandable Brief Content */}
            <div className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
                <div className="p-6 md:p-8 pl-20 md:pl-24 bg-white relative">
                    
                    {/* Decoration Line */}
                    <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-zen-accent/20" />

                    <div className="max-w-3xl">
                        {/* Brief Header */}
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

                        {/* Article Title */}
                        <h4 className="font-serif text-lg font-bold text-zen-text mb-4">
                            {module.brief.title}
                        </h4>

                        {/* Article Body */}
                        <div className="space-y-4 font-sans text-zen-text/70 text-sm leading-relaxed text-justify">
                            {module.brief.content.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                        {/* Footer Action */}
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
  const [entropy, setEntropy] = useState(98.2);
  const [openModuleId, setOpenModuleId] = useState<string | null>('ARCHIVE_01');

  // Simulate dashboard live data
  useEffect(() => {
    const interval = setInterval(() => {
      setEntropy(prev => {
        const noise = (Math.random() - 0.5) * 0.1;
        return Math.min(99.9, Math.max(90, prev + noise));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

      {/* MAIN LAYOUT: DASHBOARD (LEFT) + ARCHIVE (RIGHT) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-0 lg:border lg:border-zen-text/10 lg:rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
        
        {/* LEFT: ENERGY DASHBOARD (Dark Mode Tech) */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] text-gray-300 p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
             
             {/* Background Grid & Decor */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-zen-risk/10 blur-[100px] rounded-full pointer-events-none" />

             {/* Header */}
             <div className="relative z-10 flex justify-between items-start mb-8">
                 <div className="flex items-center gap-2">
                     <Activity className="w-4 h-4 text-zen-risk animate-pulse" />
                     <span className="font-mono text-xs font-bold tracking-widest text-white">LIVE MONITOR</span>
                 </div>
                 <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-zen-risk" />
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                 </div>
             </div>

             {/* Main Metrics */}
             <div className="relative z-10 space-y-4">
                 <DashboardMetric 
                    label="SYSTEM ENTROPY" 
                    value={`${entropy.toFixed(2)}%`} 
                    active 
                 />
                 <div className="grid grid-cols-2 gap-4">
                     <DashboardMetric label="SOLAR CYCLE" value="25" unit="MAX" />
                     <DashboardMetric label="GLOBAL DEBT" value="$305T" />
                 </div>
             </div>

             {/* Footer Visual */}
             <div className="relative z-10 mt-8 pt-8 border-t border-gray-800">
                 <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 mb-4">
                     <Globe className="w-3 h-3" />
                     <span>GLOBAL RISK HEATMAP LOADING...</span>
                 </div>
                 
                 {/* Abstract Heatmap Strip */}
                 <div className="flex h-12 w-full gap-0.5 opacity-80">
                    {Array.from({length: 40}).map((_, i) => (
                        <div 
                            key={i} 
                            className="flex-1 rounded-sm transition-all duration-1000"
                            style={{ 
                                backgroundColor: i > 25 ? '#C56E61' : i > 15 ? '#C19A6B' : '#333',
                                opacity: Math.random() * 0.5 + 0.5,
                                height: `${Math.random() * 60 + 40}%`
                            }}
                        />
                    ))}
                 </div>
                 
                 <div className="mt-4 p-3 bg-zen-risk/10 border border-zen-risk/20 rounded text-xs text-zen-risk font-mono">
                    WARNING: 2026 VARIANCE DETECTED
                 </div>
             </div>
        </div>

        {/* RIGHT: ARCHIVE SHELF (Light Mode Paper) */}
        <div className="w-full lg:w-2/3 bg-[#F9F7F2] lg:overflow-y-auto lg:h-[800px] scrollbar-thin scrollbar-thumb-zen-text/10 scrollbar-track-transparent">
             {/* Sticky Header inside Scroll Area */}
             <div className="sticky top-0 z-20 bg-[#F9F7F2]/95 backdrop-blur border-b border-zen-text/10 p-4 flex items-center justify-between">
                 <span className="text-[10px] font-mono tracking-widest text-zen-text/40 uppercase">
                     Decoded Archives: 5/10
                 </span>
                 <BarChart3 className="w-4 h-4 text-zen-text/20" />
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
    </section>
  );
};

export default EnergyForecast;