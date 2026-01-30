import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, ChevronDown, ShieldCheck, 
  Zap, Clock, FileCheck, Lock, ArrowRight 
} from 'lucide-react';

interface FinalPushProps {
  onStart: () => void;
}

const FAQS = [
  {
    q: "这套算法真的科学吗？",
    a: "八字并非玄学，而是运行了 5000 年的复杂模式识别系统。FatePlanner 将古老的五行干支逻辑转化为现代数据模型，所有预测均基于能量密度的数学推导，而非随机预言。",
    icon: <Zap className="w-5 h-5" />
  },
  {
    q: "我的个人隐私如何保障？",
    a: "我们采用银行级 AES-256 加密技术。您的生辰信息仅用于生成瞬时的算法模型，报告生成后，核心数据将被脱敏处理。",
    icon: <Lock className="w-5 h-5" />
  },
  {
    q: "如果我不记得准确的出生分钟怎么办？",
    a: "系统拥有“真太阳时”校准功能。如果您不确定具体时间，建议选择时辰范围，算法会自动根据当天的经纬度磁场进行权重平摊，依然具有极高的参考价值。",
    icon: <Clock className="w-5 h-5" />
  },
  {
    q: "PDF 报告如何交付？",
    a: "支付成功后，系统将在 30 秒内完成 37 页数据的云端演算。您可以直接在网页下载 PDF，同时我们会向您的注册邮箱发送备份链接。",
    icon: <FileCheck className="w-5 h-5" />
  }
];

const FinalPush: React.FC<FinalPushProps> = ({ onStart }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className="w-full bg-zen-bg pt-20 pb-0 flex flex-col items-center">
      
      {/* 1. FAQ Section */}
      <div className="max-w-3xl w-full px-6 mb-24">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zen-text/5 text-zen-text/60 mb-4">
                <HelpCircle className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">Transparency Protocol</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-zen-text">Algorithm Transparency</h2>
        </div>

        <div className="space-y-4">
            {FAQS.map((item, idx) => (
                <div 
                    key={idx}
                    className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                        openIndex === idx 
                        ? 'bg-white border-zen-accent shadow-md' 
                        : 'bg-white/50 border-zen-text/10 hover:bg-white hover:border-zen-accent/30'
                    }`}
                >
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`text-zen-accent ${openIndex === idx ? 'opacity-100' : 'opacity-60'}`}>
                                {item.icon}
                            </div>
                            <span className="font-serif font-bold text-zen-text text-lg">{item.q}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-zen-text/40 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                            openIndex === idx ? 'max-h-40' : 'max-h-0'
                        }`}
                    >
                        <p className="p-5 pt-0 text-sm md:text-base text-zen-text/70 leading-relaxed font-sans pl-14">
                            {item.a}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 2. Final CTA Block */}
      <div className="w-full bg-zen-bg relative overflow-hidden py-24 px-6">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-zen-accent/20 to-transparent rounded-full blur-3xl pointer-events-none" />
         
         <div className="max-w-4xl mx-auto relative z-10 text-center">
            
            {/* Urgency Timer */}
            <div className="inline-flex items-center gap-2 bg-[#C56E61]/10 text-[#C56E61] px-4 py-1.5 rounded-full border border-[#C56E61]/20 mb-8 animate-pulse">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs font-bold tracking-widest">
                    OFFER EXPIRES IN: {formatTime(timeLeft)}
                </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-zen-text mb-6 leading-tight">
                别让 2026 年成为<br/>你生命中的黑盒。
            </h2>
            
            <p className="text-lg text-zen-text/70 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
                已经有超过 <span className="font-bold text-zen-text border-b border-zen-accent/50">12,000 位理性决策者</span> 通过 FatePlanner 锁定了他们的年度战略。<br/>
                现在，该轮到你了。
            </p>

            {/* Main Action Area */}
            <div className="flex flex-col items-center gap-4">
                <button 
                    onClick={onStart}
                    className="group relative px-10 py-5 bg-gradient-to-r from-[#C19A6B] to-[#9F7D56] text-white rounded-full shadow-[0_10px_30px_rgba(193,154,107,0.4)] hover:shadow-[0_15px_40px_rgba(193,154,107,0.6)] hover:-translate-y-1 transition-all duration-300 w-full max-w-md"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="font-serif font-bold text-xl tracking-wider">
                            [ 立即开启 2026 战略解密 ]
                        </span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[scan_1s_ease-in-out_infinite]" />
                    </div>
                </button>
                
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-mono text-zen-text/40 line-through">$99.99</span>
                    <span className="text-xl font-serif font-bold text-zen-accent">$39.99</span>
                    <span className="px-2 py-0.5 bg-zen-text text-white text-[10px] font-bold tracking-wider rounded">LAUNCH OFFER</span>
                </div>
                
                <div className="mt-4 flex items-center gap-6 text-xs text-zen-text/40 font-mono">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Data</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant Access</span>
                </div>
            </div>

         </div>
      </div>

    </section>
  );
};

export default FinalPush;