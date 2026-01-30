import React, { useState, useEffect } from 'react';
import ScrollWheel from './ScrollWheel';
import { User, Mail, MapPin, Activity, Briefcase, Heart, Coins, Check, X, ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';

// Ranges for wheels
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const YEARS = Array.from({ length: 61 }, (_, i) => String(1970 + i)); // 1970 - 2030

// 12 Shichen (Chinese Hours)
const SHICHEN_OPTIONS = [
  "子时 (23:00-01:00)",
  "丑时 (01:00-03:00)",
  "寅时 (03:00-05:00)",
  "卯时 (05:00-07:00)",
  "辰时 (07:00-09:00)",
  "巳时 (09:00-11:00)",
  "午时 (11:00-13:00)",
  "未时 (13:00-15:00)",
  "申时 (15:00-17:00)",
  "酉时 (17:00-19:00)",
  "戌时 (19:00-21:00)",
  "亥时 (21:00-23:00)"
];

type Sector = 'CAREER' | 'WEALTH' | 'LOVE' | 'HEALTH';

const SECTOR_QUESTIONS: Record<Sector, string[]> = {
  CAREER: [
    "我常感觉自己的职业命运并不掌握在自己手中，而是受制于某种外部的、不可控的‘系统规则’（如签证、大环境）。",
    "与同级别的白人或他族裔同事相比，我感到自己付出了更多努力，却更难获得核心权力和晋升。",
    "在目前的职场环境中，我缺乏一位能够真正提携我、为我背书的‘关键贵人’（Sponsor）。",
    "对于 2026 年，我处于一种‘不知道该苟住还是该跳槽’的战略迷茫中。",
    "即便在休息日，我也很难真正关掉大脑。‘停下来’会让我感到内疚或恐慌。"
  ],
  WEALTH: [
    "我的‘正财’（工资收入）是目前唯一的安全网。如果失去这份工作，我的生活质量将在 3 个月内崩塌。",
    "我感觉自己命中注定的‘财富容量’尚未被填满，目前的收入远低于我的真实潜能。",
    "面对 2026 年的市场，我最恐惧的不是‘赚不到钱’，而是‘因一次错误决策而导致资产缩水’。",
    "我很难留住现金。每当有一笔额外收入，总会发生意想不到的事情（人情、意外）迫使我花掉它。",
    "我极度渴望开启副业（偏财），但始终无法确定具体的方向或切入时机。"
  ],
  LOVE: [
    "我对 Dating Apps 感到厌倦。我认为基于照片和兴趣标签的算法，无法帮我筛选出灵魂契合的伴侣。",
    "我的婚恋决策在很大程度上受到原生家庭（父母）期望的干扰或压力。",
    "我担心自己正在错过‘最佳择偶窗口期’，这种时间焦虑影响了我的判断。",
    "我感觉自己的感情剧本里，总是缺乏‘确定性’和‘安全感’。",
    "我需要一个理性的、非情感化的工具，来评估我与潜在伴侣的底层兼容性（风险风控）。"
  ],
  HEALTH: [
    "我经常感到不明原因的身体疲劳、燥热或沉重，即便体检指标显示‘正常’。",
    "我经常在深夜（尤其是凌晨 1-3 点）醒来或难以入睡，思绪处于失控的焦虑循环中。",
    "我发现最近自己的情绪爆发点变低了（易怒、易哭或冷漠），这开始影响我的人际关系。",
    "我怀疑我目前的居住环境（光线、布局、气场）正在消耗我的能量，而不是滋养我。",
    "我潜意识里恐惧 2026 年会发生一场突如其来的健康危机，打断我的人生计划。"
  ]
};

interface RiskLog {
  visible: boolean;
  message: string;
  level: string;
}

interface CalibrationProps {
  onBack: () => void;
  onComplete: () => void;
}

const Calibration: React.FC<CalibrationProps> = ({ onBack, onComplete }) => {
  // Step 0 is Email (Pre-Calibration). Steps 1-10 are the main sequence.
  const [step, setStep] = useState(0); 
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birthMonth: 'JAN',
    birthDay: '01',
    birthYear: '1990',
    birthTime: '午时 (11:00-13:00)', // Changed from Hour/Minute
    gender: '', // 'YANG' | 'YIN'
    location: '',
    focus: '' as Sector | '',
    risks: [] as boolean[] // Stores true/false for the 5 questions
  });
  
  const [riskLog, setRiskLog] = useState<RiskLog>({ visible: false, message: '', level: '' });

  // Calculate progress: Steps 1-10 map to 10%-100%. Step 0 is 0%.
  const progress = step === 0 ? 0 : Math.round((step / 10) * 100);

  const triggerRiskLog = () => {
    setRiskLog({ visible: true, message: 'DATA POINT LOGGED', level: 'ELEVATED' });
    setTimeout(() => setRiskLog(prev => ({ ...prev, visible: false })), 2000);
  };

  const handleNext = () => {
    if (step < 10) {
      setStep(prev => prev + 1);
    } else {
      console.log('Calibration Complete', formData);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
        setStep(prev => prev - 1);
        // If we go back from step 6 (first question) to step 5 (focus selection), 
        // we might want to clear risks, but keeping them is fine for UX.
    } else {
        onBack();
    }
  };

  const handleRiskResponse = (agree: boolean) => {
    if (agree) {
        triggerRiskLog();
    }
    // Store response logic could go here
    handleNext();
  };

  // Helper to get current question text for steps 6-10
  const getCurrentQuestion = () => {
    if (step < 6 || step > 10 || !formData.focus) return "";
    const questionIndex = step - 6;
    return SECTOR_QUESTIONS[formData.focus][questionIndex];
  };

  // Helper to get Sector ID for header
  const getCurrentSectorID = () => {
    if (step === 0) return "COMM_LINK";
    if (step === 1) return "IDENTITY";
    if (step === 2) return "TIME_SPACE";
    if (step === 3) return "YIN_YANG";
    if (step === 4) return "GPS_DATA";
    if (step === 5) return "PRIORITY";
    if (step >= 6) return `${formData.focus}_RISK_Q${step - 5}`;
    return "UNKNOWN";
  };

  // Render Functions
  const renderInput = (
    value: string, 
    onChange: (val: string) => void, 
    placeholder: string, 
    type: string = 'text',
    icon?: React.ReactNode,
    buttonText: string = "CONFIRM_SIGNAL"
  ) => (
    <div className="w-full max-w-md flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Input Container */}
        <div className="relative group w-full mb-10">
            {/* Animated Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zen-accent/10 via-zen-accent/40 to-zen-accent/10 opacity-0 group-focus-within:opacity-100 transition-all duration-700 rounded-xl blur-sm" />
            
            <div className="relative flex items-center bg-white/40 backdrop-blur-md border border-zen-text/10 rounded-xl overflow-hidden transition-all duration-300 group-focus-within:bg-white group-focus-within:border-zen-accent group-focus-within:shadow-xl group-focus-within:shadow-zen-accent/10">
                <div className="pl-6 text-zen-text/40 group-focus-within:text-zen-accent transition-colors duration-300">
                    {icon}
                </div>
                <input 
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-transparent py-6 pl-4 pr-6 text-xl font-serif text-zen-text placeholder:text-zen-text/20 placeholder:font-sans outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && value) handleNext();
                    }}
                />
            </div>
        </div>

        {/* Action Button */}
        <button 
            onClick={handleNext} 
            disabled={!value}
            className="group relative px-10 py-4 bg-zen-text text-zen-bg rounded-full font-mono text-sm tracking-widest hover:bg-zen-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-zen-accent/30 hover:-translate-y-1"
        >
            <span className="flex items-center gap-3">
                {buttonText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Inner shimmer */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:animate-[scan_1s_ease-in-out_infinite]" />
            </div>
        </button>
        
        {/* Keyboard Hint */}
        <div className="mt-6 text-[10px] font-mono text-zen-text/30 opacity-0 animate-in fade-in delay-700 duration-1000">
            PRESS [ENTER] TO CONTINUE
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-zen-bg text-zen-text flex flex-col overflow-hidden">
      {/* Background with dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      
      {/* Top Progress Bar (Only visible for Steps 1-10) */}
      <div className="relative z-50 w-full h-1 bg-zen-text/5">
        <div 
            className="h-full bg-zen-accent transition-all duration-500 ease-out" 
            style={{ width: `${progress}%`, opacity: step === 0 ? 0 : 1 }} 
        />
      </div>
      
      {/* Header Status */}
      <div className="relative z-50 px-6 py-4 border-b border-zen-text/5 flex justify-between items-center bg-zen-bg/80 backdrop-blur-sm">
         <div className="flex items-center gap-3">
             <button 
                onClick={handleBack}
                className="text-zen-text/40 hover:text-zen-accent transition-colors p-1 -ml-1 rounded-full hover:bg-zen-text/5"
                title="Go Back"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             {step > 0 && (
                 <div className="font-mono text-xs text-zen-text/60">
                    <span className="text-zen-accent animate-pulse mr-2">●</span>
                    CALIBRATING SECTOR: {getCurrentSectorID()}
                 </div>
             )}
         </div>
         {step > 0 && (
             <div className="font-mono text-xs text-zen-text/60">
                {progress}% COMPLETE
             </div>
         )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-40 flex flex-col items-center justify-center p-6 pb-24 overflow-y-auto no-scrollbar">
        
        {/* Step Title Block */}
        <div className="text-center mb-12 max-w-2xl px-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
            {step === 0 && (
                <>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-zen-text mb-6">Electronic Signal</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed max-w-lg mx-auto">
                        Establishing a secure digital link for your encrypted strategy report delivery.
                    </p>
                </>
            )}
            {step === 1 && (
                <>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-zen-text mb-6">The Semantic Key</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed max-w-lg mx-auto">
                        Your name is a vibrational tether binding you to this reality. Enter it precisely.
                    </p>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text mb-4">Temporal Coordinates</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed">The precise cosmic angle at the moment of your arrival.</p>
                </>
            )}
            {step === 3 && (
                <>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text mb-4">Polarity Calibration</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed">Yin or Yang. This parameter determines the direction of your energy flow.</p>
                </>
            )}
            {step === 4 && (
                <>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text mb-4">Terrestrial Triangulation</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed">Adjusting for True Solar Time based on longitude.</p>
                </>
            )}
            {step === 5 && (
                <>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text mb-4">Sector Prioritization</h2>
                    <p className="font-sans text-zen-text/60 text-lg leading-relaxed">Which life sector requires the most computational depth?</p>
                </>
            )}
            {step >= 6 && (
                <>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-zen-text mb-6 leading-tight animate-in fade-in slide-in-from-bottom-2">
                        "{getCurrentQuestion()}"
                    </h2>
                    <p className="font-mono text-zen-text/40 text-xs tracking-widest uppercase">
                        RISK ASSESSMENT PROTOCOL {step - 5}/5
                    </p>
                </>
            )}
        </div>

        {/* Dynamic Inputs based on Step */}
        <div className="w-full flex justify-center">
            
            {step === 0 && renderInput(
                formData.email, 
                (v) => setFormData({...formData, email: v}), 
                'operator@fateplanner.com', 
                'email',
                <Mail className="w-6 h-6" />,
                "INITIATE SEQUENCE"
            )}

            {step === 1 && renderInput(
                formData.name, 
                (v) => setFormData({...formData, name: v}), 
                'Full Name / 姓名', 
                'text',
                <User className="w-6 h-6" />
            )}

            {step === 2 && (
                <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500 w-full max-w-5xl">
                    
                    {/* Unified Date & Time Block */}
                    <div className="flex flex-col items-center p-6 glass-card rounded-2xl border border-zen-accent/20 shadow-lg bg-white/20 w-full max-w-4xl">
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6 w-full">
                            {/* Date Group */}
                            <div className="flex gap-2 md:gap-4 items-center justify-center">
                                <ScrollWheel items={YEARS} value={formData.birthYear} onChange={(v) => setFormData({...formData, birthYear: v})} label="YEAR" width="w-20 md:w-24" />
                                <div className="hidden md:block h-16 w-px bg-zen-text/10" />
                                <ScrollWheel items={MONTHS} value={formData.birthMonth} onChange={(v) => setFormData({...formData, birthMonth: v})} label="MONTH" width="w-16 md:w-20" />
                                <div className="hidden md:block h-16 w-px bg-zen-text/10" />
                                <ScrollWheel items={DAYS} value={formData.birthDay} onChange={(v) => setFormData({...formData, birthDay: v})} label="DAY" width="w-16 md:w-20" />
                            </div>

                            {/* Divider between Date and Time (Desktop) */}
                            <div className="hidden md:block h-16 w-px bg-zen-accent/30" />
                            {/* Divider (Mobile) */}
                            <div className="md:hidden w-full h-px bg-zen-text/10 my-4" />

                            {/* Time Group */}
                            <div className="flex items-center justify-center">
                                <ScrollWheel 
                                    items={SHICHEN_OPTIONS} 
                                    value={formData.birthTime} 
                                    onChange={(v) => setFormData({...formData, birthTime: v})} 
                                    label="TIME / 时辰" 
                                    width="w-56 md:w-64" 
                                />
                            </div>
                        </div>

                        {/* Disclaimer inside the card */}
                        <p className="text-xs font-sans text-zen-text/40 text-center mt-6 pt-4 border-t border-zen-text/5 w-full">
                            If you can't determine the specific birth time, please set the time to 12:00.
                        </p>
                    </div>

                    <button 
                        onClick={handleNext} 
                        className="px-12 py-4 bg-zen-text text-zen-bg hover:bg-zen-accent transition-all duration-300 font-mono text-sm tracking-widest rounded-full shadow-lg hover:shadow-zen-accent/30 hover:-translate-y-1"
                    >
                        LOCK TEMPORAL DATA
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="flex gap-6 animate-in zoom-in-95 duration-500">
                    <button 
                        onClick={() => { setFormData({...formData, gender: 'YANG'}); handleNext(); }}
                        className="group flex flex-col items-center p-8 glass-card border border-zen-text/10 hover:border-zen-accent hover:bg-zen-accent/5 transition-all w-40 rounded-2xl"
                    >
                        <div className="mb-6 p-4 rounded-full bg-zen-text/5 group-hover:bg-zen-accent/10 transition-colors">
                            <Sun className="w-12 h-12 text-zen-text group-hover:text-zen-accent group-hover:rotate-180 transition-all duration-700" />
                        </div>
                        <span className="font-serif text-xl font-bold">YANG</span>
                        <span className="text-xs text-zen-text/40 font-mono mt-2 tracking-widest">MALE / 男</span>
                    </button>
                    <button 
                        onClick={() => { setFormData({...formData, gender: 'YIN'}); handleNext(); }}
                        className="group flex flex-col items-center p-8 glass-card border border-zen-text/10 hover:border-zen-accent hover:bg-zen-accent/5 transition-all w-40 rounded-2xl"
                    >
                         <div className="mb-6 p-4 rounded-full bg-zen-text/5 group-hover:bg-zen-accent/10 transition-colors">
                            <Moon className="w-12 h-12 text-zen-text group-hover:text-zen-accent group-hover:-rotate-12 transition-all duration-700" />
                        </div>
                        <span className="font-serif text-xl font-bold">YIN</span>
                        <span className="text-xs text-zen-text/40 font-mono mt-2 tracking-widest">FEMALE / 女</span>
                    </button>
                </div>
            )}

            {step === 4 && renderInput(
                formData.location, 
                (v) => setFormData({...formData, location: v}), 
                'City of Birth / 出生城市', 
                'text',
                <MapPin className="w-6 h-6" />,
                "CONFIRM COORDINATES"
            )}

            {step === 5 && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl animate-in zoom-in-95 duration-500">
                    {[
                        { id: 'CAREER', label: '事业 / CAREER', icon: <Briefcase className="w-6 h-6" /> },
                        { id: 'WEALTH', label: '财富 / WEALTH', icon: <Coins className="w-6 h-6" /> },
                        { id: 'LOVE', label: '感情 / LOVE', icon: <Heart className="w-6 h-6" /> },
                        { id: 'HEALTH', label: '健康 / HEALTH', icon: <Activity className="w-6 h-6" /> }
                    ].map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => { setFormData({...formData, focus: opt.id as Sector}); handleNext(); }}
                            className="flex flex-col items-center p-8 glass-card border border-zen-text/10 hover:border-zen-accent hover:bg-white/60 transition-all group rounded-2xl shadow-sm hover:shadow-lg"
                        >
                            <div className="text-zen-text/60 mb-4 group-hover:text-zen-accent transition-colors scale-110">{opt.icon}</div>
                            <span className="font-serif text-zen-text text-lg font-medium tracking-wide">{opt.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {step >= 6 && (
                <div className="flex gap-8 animate-in zoom-in-95 duration-300">
                    <button 
                        onClick={() => handleRiskResponse(false)}
                        className="flex flex-col items-center gap-3 px-10 py-5 border border-zen-text/20 rounded-2xl hover:bg-zen-text/5 transition-colors group bg-white/30 backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 rounded-full border border-zen-text/20 flex items-center justify-center group-hover:border-zen-text/40 transition-colors">
                            <X className="w-6 h-6 text-zen-text/60 group-hover:text-zen-text" />
                        </div>
                        <span className="font-mono text-sm tracking-widest text-zen-text/60 group-hover:text-zen-text">DISAGREE</span>
                    </button>
                    
                    <button 
                        onClick={() => handleRiskResponse(true)}
                        className="flex flex-col items-center gap-3 px-10 py-5 border border-zen-risk/30 rounded-2xl bg-zen-risk/5 hover:bg-zen-risk/10 transition-colors group backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 rounded-full border border-zen-risk/50 text-zen-risk flex items-center justify-center group-hover:bg-zen-risk group-hover:text-white transition-all shadow-[0_0_15px_rgba(197,110,97,0.2)]">
                            <Check className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-sm tracking-widest text-zen-risk group-hover:text-zen-risk/80">AGREE</span>
                    </button>
                </div>
            )}

        </div>
      </div>

      {/* System Logs Area */}
      <div className="relative z-50 h-16 bg-zen-text/5 border-t border-zen-text/10 flex items-center px-6">
        <div className="flex items-center gap-4 font-mono text-xs w-full">
            <span className="text-zen-text/30">SYSTEM_LOG :: </span>
            {riskLog.visible ? (
                <span className="text-zen-risk font-bold animate-shake flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    {riskLog.message} [ RISK_LEVEL: {riskLog.level} ]
                </span>
            ) : (
                <span className="text-zen-text/40 animate-pulse">
                    AWAITING_INPUT_SIGNAL...
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calibration;