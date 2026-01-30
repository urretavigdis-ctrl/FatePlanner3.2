import React, { useState, useEffect } from 'react';
import { 
  Zap, FileText, Sparkles, Check, Lock, 
  ShieldCheck, ArrowLeft, MonitorCheck, CreditCard,
  Globe, CheckCircle2, Clock, Flame
} from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

// Simulated Sales Data
const RECENT_SALES = [
  { loc: 'Beijing, CN', time: '2 minutes ago' },
  { loc: 'New York, USA', time: 'Just now' },
  { loc: 'Singapore, SG', time: '4 minutes ago' },
  { loc: 'London, UK', time: '1 minute ago' },
  { loc: 'Shanghai, CN', time: '3 minutes ago' },
  { loc: 'Sydney, AU', time: 'Just now' },
  { loc: 'Vancouver, CA', time: '5 minutes ago' },
  { loc: 'Tokyo, JP', time: '2 minutes ago' },
  { loc: 'Shenzhen, CN', time: 'Just now' },
  { loc: 'San Francisco, USA', time: '6 minutes ago' },
];

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [saleIndex, setSaleIndex] = useState(0);
  const [isNotifyVisible, setIsNotifyVisible] = useState(true);
  
  // Urgency State
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [spotsLeft, setSpotsLeft] = useState(9);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Spots Decrement Logic
  useEffect(() => {
      const interval = setInterval(() => {
          // Randomly decrease spots, stop at 2 to maintain anxiety without hitting 0
          if (Math.random() > 0.4) {
               setSpotsLeft(prev => prev > 2 ? prev - 1 : prev);
          }
      }, 12000); // Check every 12 seconds
      return () => clearInterval(interval);
  }, []);

  // Sales Notification Logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsNotifyVisible(false);
      
      // Wait for fade out, then switch data and fade in
      setTimeout(() => {
        setSaleIndex((prev) => (prev + 1) % RECENT_SALES.length);
        setIsNotifyVisible(true);
      }, 500); 

    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const currentSale = RECENT_SALES[saleIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-zen-bg text-zen-text flex flex-col overflow-y-auto animate-in fade-in zoom-in-95 duration-500 font-sans selection:bg-zen-accent/30">
        
        {/* HEADER GROUP - STICKY */}
        <div className="sticky top-0 z-50 flex flex-col bg-zen-bg shadow-md shadow-zen-accent/5">
            
            {/* Top Navigation Bar */}
            <div className="w-full bg-zen-bg/95 backdrop-blur border-b border-zen-accent/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button 
                        onClick={onBack} 
                        className="text-zen-text/60 hover:text-zen-accent transition-colors flex items-center gap-2 text-sm font-mono tracking-widest group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                        <span className="hidden sm:inline">RETURN TO ANALYSIS</span>
                        <span className="sm:hidden">BACK</span>
                    </button>
                    
                    <div className="flex items-center gap-2 text-zen-text/60 bg-zen-text/5 px-3 py-1 rounded-full border border-zen-text/10">
                        <Lock className="w-3 h-3" />
                        <span className="text-[10px] font-mono tracking-wider font-bold">SECURE 256-BIT ENCRYPTED</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* LEFT COLUMN: Value Proposition (Benefits) */}
                <div className="lg:col-span-7 space-y-10">
                    
                    {/* Headline Group */}
                    <div className="space-y-6 border-b border-zen-text/10 pb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zen-accent/30 bg-zen-accent/10 text-zen-accent text-[10px] font-mono tracking-widest uppercase">
                            <MonitorCheck className="w-3 h-3" />
                            System Ready
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-zen-text tracking-wide leading-tight">
                            Strategy Archive <br />
                            <span className="text-zen-accent italic">Ready for Deployment</span>
                        </h1>
                        <p className="text-zen-text/60 font-sans text-lg leading-relaxed max-w-xl">
                            We have successfully decoded your 2026 patterns. Your strategic advantage is now encrypted and prepared for secure transfer.
                        </p>
                    </div>

                    {/* The "Contract" Benefits */}
                    <div className="space-y-6">
                        {/* Premium Item */}
                        <div className="relative overflow-hidden bg-white border border-zen-accent/20 rounded-xl p-8 group transition-all hover:border-zen-accent/40 shadow-sm hover:shadow-md">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Sparkles className="w-20 h-20 text-zen-accent" />
                            </div>
                            <div className="relative z-10 flex gap-5">
                                <div className="mt-1 p-1.5 h-fit rounded-full bg-zen-accent text-white shadow-lg shadow-zen-accent/20">
                                    <Check className="w-5 h-5" strokeWidth={4} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zen-text text-2xl mb-2">Unlock Complete Archive</h3>
                                    <p className="text-zen-text/70 text-base leading-relaxed max-w-md">
                                        Immediate access to all locked insights including Tai Sui relations, Wealth Risk Audit, and the 12-Month Tactical Guide.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* PDF Item */}
                        <div className="flex items-center gap-6 p-6 bg-white/50 rounded-xl border border-zen-text/5 hover:border-zen-accent/30 transition-colors">
                            <FileText className="w-10 h-10 text-zen-text/60 shrink-0" />
                            <div>
                                <h3 className="font-bold text-zen-text text-lg">Includes: 2026 Strategic PDF (37 Pages)</h3>
                                <p className="text-sm text-zen-text/50 mt-1">
                                    A comprehensive survival manual generated from your specific Bazi structure.
                                </p>
                            </div>
                        </div>

                        {/* Feature List Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                             {[
                                "12-Month Tactical Execution Plan",
                                "Personal Wealth Risk Audit",
                                "Five Elements Wellness Guide",
                                "Critical Decision Making Model",
                                "Lifetime Access to Updates",
                                "Priority Email Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zen-text/5 transition-colors border border-transparent hover:border-zen-text/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zen-accent" />
                                    <span className="text-sm text-zen-text/70 font-sans tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Payment Card (Sticky) */}
                <div className="lg:col-span-5 relative lg:sticky lg:top-32">
                    {/* Decorative Backdrop */}
                    <div className="absolute -inset-1 bg-gradient-to-b from-zen-accent/20 to-transparent blur-xl rounded-3xl opacity-50 pointer-events-none" />
                    
                    <div className="relative bg-white rounded-2xl border border-zen-accent/20 shadow-xl overflow-hidden flex flex-col">
                        
                        {/* Launch Badge */}
                        <div className="bg-zen-risk text-white text-xs font-bold py-3 text-center font-mono tracking-[0.2em] shadow-sm relative z-20">
                            LAUNCH OFFER: 60% OFF ACTIVATED
                        </div>

                        {/* Urgency Counter Strip */}
                        <div className="bg-[#FFF5F5] border-b border-zen-risk/10 py-2.5 px-6 flex items-center justify-center gap-2 relative z-20">
                            <Clock className="w-3 h-3 text-zen-risk animate-pulse" />
                            <span className="text-[10px] font-mono font-bold text-zen-risk tracking-widest">
                                PRICE RESERVED: <span className="tabular-nums text-sm">{formatTime(timeLeft)}</span>
                            </span>
                        </div>

                        <div className="p-8 space-y-8 relative z-10 bg-white">
                            {/* Price Display */}
                            <div className="text-center space-y-2 border-b border-zen-text/10 pb-8">
                                <span className="block text-zen-text/40 text-lg line-through font-mono mb-2 decoration-2 decoration-zen-text/20">$99.99</span>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-3xl text-zen-text font-serif self-start mt-2">$</span>
                                    <span className="text-7xl text-zen-accent font-serif font-bold italic drop-shadow-sm">
                                        39.99
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-center gap-2">
                                    <span className="px-2 py-1 bg-zen-text/5 text-zen-text/60 text-[10px] font-mono tracking-widest rounded border border-zen-text/10">ONE-TIME PAYMENT</span>
                                    <span className="px-2 py-1 bg-zen-text/5 text-zen-text/60 text-[10px] font-mono tracking-widest rounded border border-zen-text/10">INSTANT ACCESS</span>
                                </div>
                            </div>

                            {/* Payment Method Placeholders */}
                            <div className="space-y-4">
                                <label className="text-xs font-mono text-zen-text/40 uppercase tracking-wider block">Secure Payment Method</label>
                                <div className="grid grid-cols-4 gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                    <div className="h-10 bg-zen-text/5 border border-zen-text/10 rounded flex items-center justify-center text-zen-text"><CreditCard className="w-5 h-5" /></div>
                                    <div className="h-10 bg-zen-text/5 border border-zen-text/10 rounded flex items-center justify-center font-bold text-xs text-zen-text">PAY</div>
                                    <div className="h-10 bg-zen-text/5 border border-zen-text/10 rounded flex items-center justify-center font-serif italic text-xs text-zen-text">Visa</div>
                                    <div className="h-10 bg-zen-text/5 border border-zen-text/10 rounded flex items-center justify-center font-bold text-xs text-zen-text">MC</div>
                                </div>
                            </div>

                            {/* Main CTA */}
                            <div className="space-y-3 pt-2">
                                {/* Scarcity Indicator */}
                                <div className="flex items-center justify-between text-[10px] font-mono text-zen-text/60 px-1">
                                    <span className="flex items-center gap-1">
                                        <Flame className="w-3 h-3 text-zen-risk fill-zen-risk animate-pulse" />
                                        High Demand
                                    </span>
                                    <span className="font-bold text-zen-risk">Only {spotsLeft} spots left at this price</span>
                                </div>

                                {/* Progress Bar for Scarcity */}
                                <div className="w-full h-1.5 bg-zen-text/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-zen-risk to-zen-accent transition-all duration-1000 ease-out" 
                                        style={{ width: `${(10 - spotsLeft) * 10}%` }} // Approx percentage based on spots
                                    />
                                </div>

                                <button className="w-full group relative overflow-hidden bg-zen-text text-white py-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-zen-accent/20 transition-all active:scale-[0.98] transform hover:-translate-y-1 mt-2">
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <div className="relative flex items-center justify-center gap-3">
                                        <Lock className="w-5 h-5 opacity-50" />
                                        <span className="font-bold tracking-widest text-lg font-sans">COMPLETE ORDER</span>
                                        <Zap className="w-5 h-5 fill-current group-hover:animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]" />
                                    </div>
                                </button>
                                <p className="text-center text-[10px] text-zen-text/40 leading-relaxed px-4 pt-2">
                                    Secure 256-bit SSL encrypted payment. <br/>
                                    100% Satisfaction Guarantee.
                                </p>
                            </div>

                            {/* Trust Footer - Replaced with Live Notification */}
                            <div className="pt-6 border-t border-zen-text/10">
                                <div className={`flex items-center gap-3 transition-all duration-500 ${isNotifyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {/* Icon */}
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 bg-zen-risk/20 rounded-full animate-ping" />
                                        <div className="relative w-8 h-8 bg-zen-risk/10 rounded-full flex items-center justify-center text-zen-risk border border-zen-risk/20">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                            <CheckCircle2 className="w-2 h-2 text-zen-accent fill-zen-accent" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold text-zen-text font-serif leading-tight truncate">
                                            Customer from {currentSale.loc}
                                        </span>
                                        <span className="text-[10px] text-zen-text/60 mt-0.5 truncate">
                                            Purchased 2026 Strategy Archive
                                        </span>
                                    </div>
                                    
                                    {/* Time */}
                                    <div className="ml-auto text-[10px] font-mono text-zen-text/40 flex items-center gap-1 whitespace-nowrap">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zen-risk animate-pulse" />
                                        {currentSale.time}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  );
};

export default Checkout;