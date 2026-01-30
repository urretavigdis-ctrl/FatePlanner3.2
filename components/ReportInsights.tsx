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
    title: '太岁关系分析 (Tai Sui)',
    icon: <ShieldAlert className="w-5 h-5" />,
    hook: "2026 丙午年，真正的风险来自地支与流年的‘刑、冲、破、害’。你的 PDF 将精准计算你与太岁的真实关系。",
    lockedText: "根据精密排盘，本命地支与流年午火形成【自刑】格局。这不仅仅是犯太岁，更意味着自我内耗。建议立春后佩戴金属饰品以泄火气，同时避免向南发展..."
  },
  {
    id: 'YEAR_TUNE',
    title: '流年定调 (Year Theme)',
    icon: <Flame className="w-5 h-5" />,
    hook: "2026 火旺之年，这把火是炼出真金还是烧干资源？先看懂你的年度关键词。",
    lockedText: "年度核心关键词：【淬炼】。丙午大火对于你的日柱而言是七杀攻身。这代表巨大的压力，也代表爆发性的机会。唯有极强的自律（印星化杀）才能接住这波能量..."
  },
  {
    id: 'CAREER',
    title: '事业晋升时机 (Career Timing)',
    icon: <Briefcase className="w-5 h-5" />,
    hook: "哪个月份官印能量最强？哪个月份比劫重重容易背锅？不要猜，看数据。",
    lockedText: "战略窗口期：农历四月（巳月）至六月（未月）。这三个月火土相生，官印护身，利于向上管理和职位争取。警惕农历十一月（子月），水火相冲，易有口舌..."
  },
  {
    id: 'WEALTH_STRUC',
    title: '正偏财收益结构 (Wealth Structure)',
    icon: <TrendingUp className="w-5 h-5" />,
    hook: "你命里适合赚工资（正财）还是搞副业（偏财）？搞清楚财富结构，再决定钱往哪里投。",
    lockedText: "财富象限分析：正财稳健但增长受限，偏财星在长生位。2026年你的财富增量80%将来自副业或投资收益。建议保留主业现金流，大胆尝试轻资产副业..."
  },
  {
    id: 'WEALTH_RISK',
    title: '财富风险预警 (Wealth Risk)',
    icon: <Users className="w-5 h-5" />,
    hook: "2026 最大财务漏洞可能来自‘熟人’。流年遇劫财，借贷担保可能是有去无回。",
    lockedText: "红色警报：比劫夺财。今年最忌讳合伙做生意或借钱给朋友。如果不设防，可能会在年中遭遇‘杀熟’。由于午火过旺，合同文书务必经过专业律师审核..."
  },
  {
    id: 'LOVE_STRAT',
    title: '感情状态深度策略 (Love Strategy)',
    icon: <Heart className="w-5 h-5" />,
    hook: "桃花是在‘相亲局’还是‘职场’？不管脱单还是防渣，你需要定制剧本。",
    lockedText: "缘分雷达：你的正缘星藏于印库之中。这意味着另一半极可能通过长辈介绍或在学习场所（图书馆、研讨会）相遇。对方带有明显的‘师长’气质..."
  },
  {
    id: 'PEACH_WINDOW',
    title: '桃花窗口期锁定 (Romance Window)',
    icon: <Clock className="w-5 h-5" />,
    hook: "不要在烂桃花月份浪费时间。报告锁定了 2026 红鸾与桃花星动的具体月份。",
    lockedText: "高频共振月：农历八月（酉月）。天喜星入命，这不仅是恋爱的季节，更是确立关系的黄金期。避开农历二月，该月桃花带煞，容易陷入三角关系..."
  },
  {
    id: 'HEALTH',
    title: '五行健康求救信号 (Health Signal)',
    icon: <Activity className="w-5 h-5" />,
    hook: "焦虑失眠不是偶然，是五行失衡。火旺之年，哪个器官会先罢工？",
    lockedText: "健康扫描：火炎土燥。重点关注心脑血管系统和小肠功能。精神层面容易出现‘心火’导致的严重失眠。建议多摄入黑色食物（属水）进行调候..."
  },
  {
    id: 'FENGSHUI',
    title: '九宫风水避险布局 (Feng Shui)',
    icon: <Compass className="w-5 h-5" />,
    hook: "警告：正南方是绝对禁区。教你用简单物品化解煞气，催旺财位。",
    lockedText: "空间风水：正南方飞入五黄廉贞星（大煞）。该方位切忌动土、装修或摆放红色物品。化解方案：放置一尊铜葫芦或六枚乾隆铜钱以泄土气..."
  },
  {
    id: 'MONTHLY',
    title: '12个月战术指南 (Monthly Guide)',
    icon: <Calendar className="w-5 h-5" />,
    hook: "年度运势太笼统？这份报告将 2026 拆解为 12 个具体的行动指南。",
    lockedText: "正月：潜龙勿用，宜规划；二月：见龙在田，利拜访；三月：情绪波动，忌决策... 每一个流月的能量起伏都为你标注了明确的行动信号..."
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
                                    <span className="opacity-50"> 这是由于流年天干透出丙火，导致你的命盘结构发生质变。如果不及时调整策略，可能会错失良机...</span>
                                </div>

                                {/* CTA Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-zen-bg/60 via-zen-bg/40 to-transparent">
                                    <button 
                                        onClick={onUnlock}
                                        className="flex items-center gap-3 bg-zen-accent hover:bg-[#D4AF80] text-white px-8 py-3 rounded-lg shadow-xl shadow-zen-accent/20 hover:shadow-zen-accent/40 hover:-translate-y-0.5 transition-all duration-300 group/btn border border-white/20"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span className="font-serif font-bold italic text-base md:text-lg tracking-wide">
                                            解锁完整报告
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