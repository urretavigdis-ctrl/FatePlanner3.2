import React, { useEffect, useState, useRef } from 'react';
import { Activity, Zap, CheckCircle, Disc, Crosshair, Hexagon } from 'lucide-react';

interface CalculationTheaterProps {
  onComplete: () => void;
  onHome?: () => void;
}

const CalculationTheater: React.FC<CalculationTheaterProps> = ({ onComplete, onHome }) => {
  const [currentLog, setCurrentLog] = useState<string>("INITIALIZING...");
  const [progress, setProgress] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuration
  const THEME = {
    bg: '#F9F7F2',
    accent: '#C19A6B', // Gold
    accentGlow: 'rgba(193, 154, 107, 0.4)',
    secondary: '#2D2D2D', // Ink
    secondaryLight: 'rgba(45, 45, 45, 0.1)',
    risk: '#C56E61'
  };

  // --- 1. SEQUENCE CONTROLLER ---
  useEffect(() => {
    let mounted = true;
    const timeline = [
      { t: 0, p: 0, log: "CONNECTING TO CELESTIAL SERVER..." },
      { t: 1000, p: 15, log: "TRIANGULATING BIRTH COORDINATES..." },
      { t: 2500, p: 35, log: "ALIGNING SOLAR PILLARS..." },
      { t: 4000, p: 55, log: "DECODING FIVE ELEMENTS MATRIX..." },
      { t: 5500, p: 75, log: "CALCULATING 2026 INTERACTION..." },
      { t: 7000, p: 90, log: "OPTIMIZING STRATEGY PATHS..." },
      { t: 8500, p: 100, log: "PATTERN RECOGNITION COMPLETE." },
    ];

    timeline.forEach(step => {
      setTimeout(() => {
        if (mounted) {
          setCurrentLog(step.log);
          setProgress(step.p);
        }
      }, step.t);
    });

    // Complete Trigger
    setTimeout(() => {
        if (mounted) setResultVisible(true);
    }, 9000);

    return () => { mounted = false; };
  }, []);

  // --- 2. RENDER ENGINE (Sacred Astrolabe) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let particles: {r: number, theta: number, speed: number, size: number}[] = [];
    
    // Init Particles
    for(let i=0; i<60; i++) {
        particles.push({
            r: Math.random() * 300 + 50,
            theta: Math.random() * Math.PI * 2,
            speed: (Math.random() - 0.5) * 0.02,
            size: Math.random() * 2
        });
    }

    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', resize);
    resize();

    const drawRing = (cx: number, cy: number, r: number, width: number, start: number, end: number, color: string, alpha: number = 1) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, start, end);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
    };

    const drawTextRing = (cx: number, cy: number, r: number, text: string[], angleOffset: number, active: boolean) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angleOffset);
        ctx.font = active ? 'bold 14px "Noto Serif SC"' : '12px "Noto Serif SC"';
        ctx.fillStyle = active ? THEME.secondary : 'rgba(45,45,45,0.3)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const step = (Math.PI * 2) / text.length;
        text.forEach((char, i) => {
            const theta = i * step;
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * r;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(theta + Math.PI / 2);
            ctx.fillText(char, 0, 0);
            ctx.restore();
        });
        ctx.restore();
    };

    const render = () => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        frame++;

        // Clear
        ctx.fillStyle = THEME.bg;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // --- LAYER 1: Background Particles (The "Chi") ---
        particles.forEach(p => {
            p.theta += p.speed;
            const px = cx + Math.cos(p.theta) * p.r;
            const py = cy + Math.sin(p.theta) * p.r;
            
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = THEME.accent;
            ctx.globalAlpha = 0.3;
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        // --- LAYER 2: The Core Pulse ---
        const pulse = Math.sin(frame * 0.05);
        ctx.beginPath();
        ctx.arc(cx, cy, 10 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = THEME.secondary;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = THEME.accent;
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.strokeStyle = THEME.accent;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // --- LAYER 3: The Astrolabe Rings ---
        
        // Ring 1: Seconds / Rapid Spinner
        drawRing(cx, cy, 60, 1, frame * 0.1, frame * 0.1 + Math.PI * 1.5, THEME.secondaryLight);
        
        // Ring 2: The Hexagram Data
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-frame * 0.005);
        ctx.strokeStyle = THEME.secondaryLight;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, 100, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Ring 3: Year Pillar (Outer Slow)
        const years = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥'];
        drawTextRing(cx, cy, 140, years, frame * 0.002, true);
        
        // Ring 4: Month Pillar (Counter Rotate)
        const months = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
        drawTextRing(cx, cy, 180, months, -frame * 0.003, false);

        // --- LAYER 4: The Scanning Cursor ---
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(frame * 0.02);
        
        // Radar Scan Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 220);
        gradient.addColorStop(0, "rgba(193, 154, 107, 0)");
        gradient.addColorStop(1, "rgba(193, 154, 107, 0.2)");
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 220, -0.2, 0.2); // Wedge
        ctx.fillStyle = gradient;
        // ctx.fill(); // Optional wedge fill

        // Scan Line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 220);
        ctx.strokeStyle = THEME.accent;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // --- LAYER 5: Decor ---
        // Crosshairs
        ctx.strokeStyle = THEME.secondaryLight;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 250, cy); ctx.lineTo(cx - 230, cy);
        ctx.moveTo(cx + 230, cy); ctx.lineTo(cx + 250, cy);
        ctx.moveTo(cx, cy - 250); ctx.lineTo(cx, cy - 230);
        ctx.moveTo(cx, cy + 230); ctx.lineTo(cx, cy + 250);
        ctx.stroke();

        requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
    };
  }, []);


  return (
    <div className="fixed inset-0 z-[100] bg-[#F9F7F2] overflow-hidden flex flex-col items-center justify-center font-mono text-[#2D2D2D]">
      
      {/* 1. TOP UI */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30">
        <div className="flex items-center gap-2 opacity-60">
             <Hexagon className="w-4 h-4 text-[#C19A6B] animate-spin-slow" />
             <span className="text-[10px] tracking-[0.3em]">QUANTUM BAZI ENGINE</span>
        </div>
        {onHome && (
            <button 
                onClick={onHome}
                className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
                <div className="w-2 h-2 bg-[#2D2D2D] rounded-full" />
                <span className="text-[10px] font-bold tracking-widest">ABORT</span>
            </button>
        )}
      </div>

      {/* 2. CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* 3. CENTER HUD (Overlay on Canvas) */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none mt-[320px] md:mt-[400px]">
         
         {/* LOG DISPLAY */}
         <div className="h-8 flex items-center justify-center overflow-hidden">
             <span className="text-xs md:text-sm font-bold tracking-widest text-[#2D2D2D] animate-pulse">
                {currentLog}
             </span>
         </div>

         {/* PROGRESS BAR */}
         <div className="w-64 h-1 bg-[#2D2D2D]/10 mt-4 rounded-full overflow-hidden">
             <div 
                className="h-full bg-[#C19A6B] transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
             />
         </div>
         
         <div className="flex justify-between w-64 mt-2 text-[10px] text-[#2D2D2D]/40 font-mono">
            <span>SYS.OP.2026</span>
            <span>{Math.round(progress)}%</span>
         </div>
      </div>

      {/* 4. RESULT MODAL (High End) */}
      {resultVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F7F2]/60 backdrop-blur-sm animate-in fade-in duration-700">
             <div className="relative bg-white/90 backdrop-blur-xl p-10 md:p-14 shadow-2xl border border-[#C19A6B]/20 max-w-sm w-full text-center group">
                 
                 {/* Border Decor */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent" />
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent" />
                 
                 <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-[#C19A6B]/20 blur-xl rounded-full animate-pulse-slow" />
                    <CheckCircle className="w-16 h-16 text-[#C19A6B] relative z-10" strokeWidth={1.5} />
                 </div>

                 <h3 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2 tracking-wide">
                    Calculation Complete
                 </h3>
                 <p className="text-xs text-[#2D2D2D]/50 font-mono mb-10 tracking-[0.2em] uppercase">
                    Destiny Matrix Encoded
                 </p>
                 
                 <button 
                    onClick={onComplete}
                    className="w-full relative overflow-hidden bg-[#2D2D2D] text-[#F9F7F2] py-4 font-mono text-sm tracking-widest hover:bg-[#C19A6B] transition-all duration-500 group-hover:shadow-lg"
                 >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        ACCESS REPORT <Zap className="w-3 h-3" />
                    </span>
                 </button>
             </div>
        </div>
      )}
      
    </div>
  );
};

export default CalculationTheater;