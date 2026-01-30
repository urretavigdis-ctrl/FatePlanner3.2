import React, { useEffect, useRef } from 'react';

// Theme Definitions - Strictly matched to the provided color system
const THEMES = [
  { 
    color: '#1D4ED8', // Electric Blue (Career)
    label: 'Career', 
    words: [
      'AI Layoffs', 'Bamboo Ceiling', 'Job Squeeze', 'Skill Void', 'Task Deletion', 
      '996 Burnout', 'Status Risk', 'Resume Void', 'Algo Bias', 'White-collar Compression', 
      'RTO Mandate', 'Career Bottleneck', 'Talent War', 'Agency Loss', 'Elite Competition', 
      'Ghost Jobs', 'Promotability Crisis', 'Automation Anxiety', 'Tech Volatility', 'Visibility Deficit'
    ] 
  },
  { 
    color: '#C2410C', // Sunset Orange / Bronze (Wealth)
    label: 'Wealth', 
    words: [
      'Debt Wall', 'Liquidity Trap', 'Cash Drain', 'Inflation Spike', 'Rob Wealth', 
      'Asset Meltdown', 'Refinancing Cliff', 'Default Risk', 'Phantom Profits', 'Wealth Ceiling', 
      'Market Panic', 'Savings Erosion', 'Credit Squeeze', 'High Leverage', 'Capital Flight', 
      'Fee Explosion', 'Money Fog', 'Financial Trauma', 'Margin Call', 'Bankruptcy Wave'
    ] 
  },
  { 
    color: '#047857', // Emerald Green (Health)
    label: 'Health', 
    words: [
      'Soul Burnout', 'System Overheat', 'Cardiac Strain', 'Eye Fatigue', 'Sleep Debt', 
      'Sensory Overload', 'Neural Crash', 'Mental Fog', 'Cortisol Spike', 'Digital Poison', 
      'Chronic Fatigue', 'Adrenal Exhaust', 'Solar Storm', 'Radiation S4', 'Biological Limit', 
      'Healing Crisis', 'Health Void', 'Stress Loop', 'Inflammation', 'Nervous Meltdown'
    ] 
  },
  { 
    color: '#BE185D', // Orchid Pink / Violet (Relationships)
    label: 'Relationships', 
    words: [
      'Ghosting', 'Situationship', 'Soul Void', 'Loneliness Epidemic', 'Trust Crisis', 
      'Fake Profile', 'Love Bombing', 'Transactional Bond', 'Gray Divorce', 'Family Shame', 
      'Digital Distance', 'Orbiting', 'Breadcrumbing', 'Gaslighting', 'Connection Fatigue', 
      'Cold Intimacy', 'Value Clash', 'Relationship Decay', 'Attachment Panic', 'Emotional Debt'
    ] 
  },
  { 
    color: '#581C87', // Midnight Purple (Decisions)
    label: 'Decisions', 
    words: [
      'Entropy Peak', 'Decision Fatigue', 'Deepfake Doubt', 'Truth Decay', 'Choice Paralysis', 
      'Chaos Factor', 'Information Fog', 'Strategy Void', 'Regret Risk', 'Pattern Blindness', 
      'Signal Noise', 'Timing Error', 'Logic Failure', 'Intuition Loss', 'System Glitch', 
      'Blind Luck', 'Crisis Mode', 'Pivot Panic', 'Outcome Void', 'Uncertainty Overload'
    ] 
  }
];

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Config
    const PARTICLE_COUNT = 45; 
    const HOVER_RADIUS = 200;
    const BASE_OPACITY = 0.4; 
    const HOVER_OPACITY = 1.0;
    
    let mouse = { x: -1000, y: -1000 };
    const dpr = window.devicePixelRatio || 1;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      theme: typeof THEMES[0];
      word: string;
      alpha: number;
      targetAlpha: number;
      scale: number;
      targetScale: number;
      isHeavy: boolean;

      constructor(w: number, h: number, forceWord?: {word: string, themeIndex: number}) {
        this.x = 0;
        this.y = 0;
        
        // Try to find a valid spawn position outside the center title area
        let attempts = 0;
        do {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            attempts++;
        } while (this.isInExclusionZone(w, h) && attempts < 100);

        // Assign Word
        if (forceWord) {
            this.theme = THEMES[forceWord.themeIndex];
            this.word = forceWord.word;
        } else {
            this.theme = THEMES[Math.floor(Math.random() * THEMES.length)];
            this.word = this.theme.words[Math.floor(Math.random() * this.theme.words.length)];
        }
        
        // Heavy/Weight Logic
        const HEAVY_WORDS = ['Debt Wall', 'AI Layoffs', 'Soul Burnout'];
        this.isHeavy = HEAVY_WORDS.includes(this.word);

        if (this.isHeavy) {
            // Heavy particles: Larger, slower
            this.size = Math.floor(Math.random() * 6) + 24; // 24px - 30px
            this.vx = (Math.random() - 0.5) * 0.2; 
            this.vy = (Math.random() - 0.5) * 0.2;
        } else {
            // Normal particles
            this.size = Math.floor(Math.random() * 6) + 14; // 14px - 20px
            this.vx = (Math.random() - 0.5) * 0.5; 
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        this.scale = 1;
        this.targetScale = 1;
        this.alpha = 0; 
        this.targetAlpha = BASE_OPACITY + Math.random() * 0.2;
      }

      // Helper to check if particle is in the center title area
      isInExclusionZone(w: number, h: number) {
        const cx = w / 2;
        const cy = h / 2;
        const halfW = w * 0.32; 
        const halfH = h * 0.22;
        return (Math.abs(this.x - cx) < halfW && Math.abs(this.y - cy) < halfH);
      }

      update(w: number, h: number, allParticles: Particle[]) {
        this.x += this.vx;
        this.y += this.vy;

        // --- SPECIFIC INTERACTION: Cash Drain -> Debt Wall ---
        // "When mouse approaches Debt Wall, surrounding Cash Drain particles should be attracted"
        if (this.word === 'Cash Drain') {
            const debtWall = allParticles.find(p => p.word === 'Debt Wall');
            if (debtWall) {
                const dx = debtWall.x - this.x;
                const dy = debtWall.y - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                // If Debt Wall is being hovered (active), attract surrounding 'Cash Drain' particles
                if (debtWall.targetScale > 1.1 && dist < 400) {
                     this.x += dx * 0.03; // Magnetic pull
                     this.y += dy * 0.03;
                }
            }
        }

        // --- EXCLUSION ZONE LOGIC (Invisible Box in Center) ---
        const cx = w / 2;
        const cy = h / 2;
        const halfW = w * 0.32; 
        const halfH = h * 0.22;
        
        const dist_x = Math.abs(this.x - cx);
        const dist_y = Math.abs(this.y - cy);

        // Bounce off exclusion zone
        if (dist_x < halfW && dist_y < halfH) {
             const penetrationX = halfW - dist_x;
             const penetrationY = halfH - dist_y;

             if (penetrationX < penetrationY) {
                 this.x = this.x < cx ? cx - halfW : cx + halfW;
                 this.vx *= -1; 
             } else {
                 this.y = this.y < cy ? cy - halfH : cy + halfH;
                 this.vy *= -1; 
             }
        }

        // --- WRAP AROUND EDGES ---
        const pad = 100;
        if (this.x < -pad) this.x = w + pad;
        if (this.x > w + pad) this.x = -pad;
        if (this.y < -pad) this.y = h + pad;
        if (this.y > h + pad) this.y = -pad;

        // Interaction (Hover)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < HOVER_RADIUS) {
          this.targetScale = 1.2;
          this.targetAlpha = HOVER_OPACITY; // 1.0 on hover
        } else {
          this.targetScale = 1;
          this.targetAlpha = BASE_OPACITY + (Math.sin(Date.now() * 0.001 + this.x) * 0.1); // Breathing effect
        }

        // Smooth transition
        this.alpha += (this.targetAlpha - this.alpha) * 0.05;
        this.scale += (this.targetScale - this.scale) * 0.1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.scale(this.scale, this.scale);
        
        context.globalAlpha = this.alpha;
        context.fillStyle = this.theme.color;
        
        // Use a bold weight for visibility
        context.font = `600 ${this.size}px "Inter", sans-serif`; 
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        context.fillText(this.word, 0, 0);
        
        context.restore();
      }
    }

    const initParticles = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      
      particles = [];

      // 1. Force Essential "Heavy" Words (Weighted Particles)
      const heavyWords = [
        { word: 'AI Layoffs', themeIndex: 0 },
        { word: 'Debt Wall', themeIndex: 1 },
        { word: 'Soul Burnout', themeIndex: 2 }
      ];
      // 2. Force Interaction Partners
      const interactWords = [
        { word: 'Cash Drain', themeIndex: 1 },
        { word: 'Cash Drain', themeIndex: 1 }
      ];

      heavyWords.forEach(cfg => particles.push(new Particle(rect.width, rect.height, cfg)));
      interactWords.forEach(cfg => particles.push(new Particle(rect.width, rect.height, cfg)));

      // 3. Fill the rest with random selections
      const remainingCount = Math.max(0, PARTICLE_COUNT - particles.length);
      for (let i = 0; i < remainingCount; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      
      particles.forEach(p => {
        p.update(w, h, particles);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => initParticles();
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    setTimeout(initParticles, 100);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto ${className}`}
    />
  );
};

export default ParticleBackground;