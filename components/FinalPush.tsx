import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, ChevronDown, ShieldCheck, 
  Zap, Clock, FileCheck, Lock, ArrowRight, Calendar
} from 'lucide-react';

interface FinalPushProps {
  onStart: () => void;
}

const FAQS = [
  {
    q: "Why does the energy cycle start in February, not Jan 1st?",
    a: "Unlike the Gregorian calendar, our algorithm tracks the 'Solar Energy Year' (Ganzhi). The true atmospheric and magnetic shift of 2026 officially begins at the 'Start of Spring' (Li Chun), usually around February 4th. January is considered a transitional tail of the previous year's energy.",
    icon: <Calendar className="w-5 h-5" />
  },
  {
    q: "Is this algorithm scientifically valid?",
    a: "BaZi is not metaphysics, but a complex pattern recognition system operating for 5,000 years. FatePlanner translates ancient Five Elements and Ganzhi logic into modern data models. All predictions are based on mathematical derivation of energy density, not random prophecy.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    q: "How is my privacy protected?",
    a: "We use bank-grade AES-256 encryption. Your birth information is only used to generate the instantaneous algorithmic model. Core data is desensitized immediately after the report is generated.",
    icon: <Lock className="w-5 h-5" />
  },
  {
    q: "What if I don't know my exact birth minute?",
    a: "The system features 'True Solar Time' calibration. If you are unsure of the specific time, we recommend selecting a time range. The algorithm will automatically weigh the magnetic field based on the longitude of the day, still providing high reference value.",
    icon: <Clock className="w-5 h-5" />
  },
  {
    q: "How is the PDF report delivered?",
    a: "After successful payment, the system completes the 37-page data calculation in the cloud within 30 seconds. You can download the PDF directly on the webpage, and we will also send a backup link to your registered email.",
    icon: <FileCheck className="w-5 h-5" />
  }
];

const FinalPush: React.FC<FinalPushProps> = ({ onStart }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-zen-bg pt-20 pb-0 flex flex-col items-center">
      
      {/* 1. FAQ Section */}
      <div className="max-w-3xl w-full px-6 mb-24">
        <div className="text-center mb-12">
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
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-zen-text mb-6 leading-tight">
                Don't let 2026 become a<br/>black box in your life
            </h2>
            
            <p className="text-lg text-zen-text/70 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
                Over <span className="font-bold text-zen-text border-b border-zen-accent/50">12,000 rational decision-makers</span> have locked their annual strategy with FatePlanner.<br/>
                Now, it's your turn.
            </p>

            {/* Main Action Area */}
            <div className="flex flex-col items-center gap-4">
                <button 
                    onClick={onStart}
                    className="group relative px-10 py-5 bg-gradient-to-r from-[#C19A6B] to-[#9F7D56] text-white rounded-full shadow-[0_10px_30px_rgba(193,154,107,0.4)] hover:shadow-[0_15px_40px_rgba(193,154,107,0.6)] hover:-translate-y-1 transition-all duration-300 w-full max-w-md"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="font-serif font-bold text-xl tracking-wider">
                            [ Start 2026 Strategy Decryption ]
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