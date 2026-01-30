// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { Database, Cpu, Activity, Move3d, ScanLine, Binary, TrendingUp, ShieldCheck, Globe, Lock } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, Torus, Line } from '@react-three/drei';
import * as THREE from 'three';

// Add global declarations to fix JSX Intrinsic Elements errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      boxGeometry: any;
      sphereGeometry: any;
      ambientLight: any;
      pointLight: any;
      
      // HTML Elements
      div: any;
      span: any;
      p: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      a: any;
      button: any;
      img: any;
      input: any;
      label: any;
      canvas: any;
      form: any;
      br: any;
      ul: any;
      li: any;
      section: any;
      header: any;
      footer: any;
      main: any;
      nav: any;
      
      // SVG Elements
      svg: any;
      circle: any;
      path: any;
      line: any;
      defs: any;
      linearGradient: any;
      stop: any;
      rect: any;
      polyline: any;
    }
  }
}

// --- DATA ---
const BRANCHES_DATA = [
    { char: '子', en: 'RAT', deg: 0 },
    { char: '丑', en: 'OX', deg: 30 },
    { char: '寅', en: 'TIGER', deg: 60 },
    { char: '卯', en: 'RABBIT', deg: 90 },
    { char: '辰', en: 'DRAGON', deg: 120 },
    { char: '巳', en: 'SNAKE', deg: 150 },
    { char: '午', en: 'HORSE', deg: 180 },
    { char: '未', en: 'GOAT', deg: 210 },
    { char: '申', en: 'MONKEY', deg: 240 },
    { char: '酉', en: 'ROOSTER', deg: 270 },
    { char: '戌', en: 'DOG', deg: 300 },
    { char: '亥', en: 'PIG', deg: 330 },
];

const STEMS_DATA = [
    { char: '甲', en: 'JIA', element: 'Wood' },
    { char: '乙', en: 'YI', element: 'Wood' },
    { char: '丙', en: 'BING', element: 'Fire' },
    { char: '丁', en: 'DING', element: 'Fire' },
    { char: '戊', en: 'WU', element: 'Earth' },
    { char: '己', en: 'JI', element: 'Earth' },
    { char: '庚', en: 'GENG', element: 'Metal' },
    { char: '辛', en: 'XIN', element: 'Metal' },
    { char: '壬', en: 'REN', element: 'Water' },
    { char: '癸', en: 'GUI', element: 'Water' },
];

// --- 3D SUB-COMPONENTS ---

// 1. Text Label Component (HTML overlay for sharpness)
const Label = ({ position, text, sub, opacity = 1, scale = 1 }: any) => (
    <Html position={position} center distanceFactor={12} zIndexRange={[100, 0]}>
        <div 
            className="flex flex-col items-center pointer-events-none select-none transition-opacity duration-300"
            style={{ opacity }}
        >
            <span className="text-xl font-serif font-bold text-[#2D2D2D] leading-none drop-shadow-sm">{text}</span>
            <span className="text-[8px] font-mono tracking-widest text-[#C19A6B] bg-[#EAE6DD]/80 px-1 rounded mt-1 backdrop-blur-sm">
                {sub}
            </span>
        </div>
    </Html>
);

// 2. Rotating Ring (Branches/Stems)
const DataRing = ({ radius, data, speed = 0.1, tilt = [0, 0, 0], color = "#C19A6B", thickness = 0.02 }: any) => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += speed * delta;
        }
    });

    return (
        <group rotation={tilt as any} ref={groupRef}>
            {/* Physical Ring */}
            <Torus args={[radius, thickness, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} transparent opacity={0.8} />
            </Torus>
            
            {/* Ticks & Labels */}
            {data.map((item: any, i: number) => {
                const count = data.length;
                const angle = (i / count) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                
                return (
                    <group key={i} position={[x, 0, z]} rotation={[0, -angle + Math.PI/2, 0]}>
                        {/* Tick Mark */}
                        <mesh position={[0, 0, 0]}>
                             <boxGeometry args={[0.05, 0.1, 0.05]} />
                             <meshBasicMaterial color={color} />
                        </mesh>
                        {/* Label */}
                        <Label position={[0, 0.3, 0]} text={item.char} sub={item.en} />
                    </group>
                );
            })}
        </group>
    );
};

// 3. Central Core (Elements)
const Core = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    return (
        <group ref={ref}>
            {/* Glowing Nucleus */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial color="#C19A6B" emissive="#C19A6B" emissiveIntensity={0.5} roughness={0.4} />
            </Sphere>
            {/* Orbital Electrons / Elements */}
            {[
                { c: '#C56E61', pos: [0.8, 0, 0] }, // Fire
                { c: '#6B8BA4', pos: [-0.8, 0, 0] }, // Water
                { c: '#76A07B', pos: [0, 0.8, 0] }, // Wood
                { c: '#9AA0A6', pos: [0, -0.8, 0] }, // Metal
                { c: '#B59B6D', pos: [0, 0, 0.8] }, // Earth
            ].map((el, i) => (
                <group key={i} rotation={[i, i, i]}>
                    <mesh position={el.pos as any}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={el.c} />
                    </mesh>
                    <Torus args={[0.8, 0.005, 8, 32]} rotation={[Math.PI/2, 0, 0]}>
                         <meshBasicMaterial color={el.c} opacity={0.3} transparent />
                    </Torus>
                </group>
            ))}
        </group>
    );
};

// 4. The Armillary Sphere Container
const ArmillarySphere = () => {
    return (
        <group>
            {/* Outer Wireframe Sphere - The "Universe" */}
            <Sphere args={[3.8, 24, 24]}>
                <meshBasicMaterial color="#C19A6B" wireframe transparent opacity={0.08} />
            </Sphere>

            {/* Static Meridian Ring */}
            <Torus args={[3.8, 0.01, 16, 100]} rotation={[0, 0, 0]}>
                <meshBasicMaterial color="#2D2D2D" opacity={0.1} transparent />
            </Torus>
             <Torus args={[3.8, 0.01, 16, 100]} rotation={[0, Math.PI/2, 0]}>
                <meshBasicMaterial color="#2D2D2D" opacity={0.1} transparent />
            </Torus>

            {/* Earthly Branches (Equator) - Slow Clockwise */}
            <DataRing 
                radius={3.0} 
                data={BRANCHES_DATA} 
                speed={0.05} 
                color="#C19A6B"
            />

            {/* Heavenly Stems (Ecliptic) - Tilted, Counter-Clockwise */}
            <DataRing 
                radius={2.2} 
                data={STEMS_DATA} 
                speed={-0.08} 
                tilt={[0.41, 0, 0.41]} // ~23.5 degree tilt visual
                color="#8B7355"
                thickness={0.015}
            />

            {/* Inner Core */}
            <Core />
        </group>
    );
};

// --- TECHNICAL VISUALIZATIONS ---

const CoordinateVisual = () => (
    <div className="w-full h-full flex flex-col items-center justify-center opacity-70">
        <div className="font-mono text-[10px] text-zen-text/40 leading-tight">
            <div className="flex justify-between w-32 border-b border-zen-text/10 mb-1"><span>RA:</span><span>14h 23m 11s</span></div>
            <div className="flex justify-between w-32 border-b border-zen-text/10 mb-1"><span>DEC:</span><span>-12° 14' 05"</span></div>
            <div className="flex justify-between w-32 mb-1"><span>EPOCH:</span><span>J2000.0</span></div>
        </div>
        <div className="mt-2 w-32 h-8 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 20">
                <polyline points="0,10 10,5 20,15 30,8 40,12 50,5 60,15 70,8 80,12 90,5 100,10" fill="none" stroke="#C19A6B" strokeWidth="1" className="animate-pulse" />
            </svg>
        </div>
    </div>
);

const MatrixVisual = () => (
    <div className="w-full h-full flex items-center justify-center opacity-60">
        <div className="grid grid-cols-4 gap-1 p-2 border border-zen-text/10 rounded">
            {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-zen-text/20 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
        </div>
        <div className="ml-3 font-mono text-[8px] text-zen-text/40 space-y-0.5">
            <div>01001011</div>
            <div>11010010</div>
            <div>00110101</div>
        </div>
    </div>
);

const ProbabilityVisual = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-32 h-16 border-b border-l border-zen-text/20">
            {/* Bell Curve */}
            <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 50">
                <path d="M0,50 Q25,50 40,20 Q50,0 60,20 Q75,50 100,50" fill="none" stroke="#C19A6B" strokeWidth="1.5" />
                <line x1="50" y1="0" x2="50" y2="50" stroke="#2D2D2D" strokeWidth="0.5" strokeDasharray="2 2" />
                <rect x="45" y="45" width="10" height="10" fill="#C19A6B" fillOpacity="0.2" className="animate-pulse" />
            </svg>
            <div className="absolute top-0 right-0 font-mono text-[8px] text-zen-accent bg-zen-accent/10 px-1 rounded">
                P(x) &gt; 95%
            </div>
        </div>
    </div>
);


// --- MAIN COMPONENT ---

const LogicShift: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#F9F7F2] dark:bg-[#050B14] transition-colors duration-500"
    >
        {/* Background Texture - Global */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        {/* 1. Hero Statement */}
        <div className={`relative z-10 text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-serif font-black italic text-zen-text mb-4 tracking-tight">
                这不是魔法，这是 <span className="relative inline-block">
                    模式识别
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-zen-accent/20 -z-10" />
                </span>
            </h2>
            <span className="block text-xl md:text-2xl font-serif text-zen-accent tracking-[0.3em] font-bold uppercase mt-2">
                Pattern Recognition
            </span>
        </div>

        {/* 2. 3D INTERACTIVE SPHERE */}
        <div 
            className={`relative w-full max-w-4xl h-[550px] md:h-[650px] mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
            {/* Interaction Hint */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-zen-text/40 animate-pulse bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                <Move3d className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">Drag to Rotate</span>
            </div>

            <Canvas camera={{ position: [0, 1.5, 14], fov: 42 }} dpr={[1, 2]}>
                {/* Lighting to match Zen Theme (Warm/Gold) */}
                <ambientLight intensity={0.7} color="#EAE6DD" />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#C19A6B" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6B8BA4" />
                
                {/* The Model */}
                <ArmillarySphere />
                
                {/* Controls */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>

            {/* Version Label Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-[0.4em] text-zen-text/40 uppercase bg-[#F9F7F2]/80 px-3 py-1 backdrop-blur-md border border-zen-accent/20 rounded-sm">
                    Ganzhi Logic Engine v5.2 (3D)
                </span>
            </div>
        </div>

        {/* 3. SCIENTIFIC AUDIT TABLE (New Design) */}
        <div className={`
            relative z-10 w-full max-w-6xl 
            bg-[#F9F7F2] border border-[#2D2D2D]/20 shadow-2xl 
            transition-all duration-1000 delay-500 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
            
            {/* Table Header */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-[#2D2D2D]/10 bg-[#2D2D2D]/5">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-zen-text/60" />
                    <span className="text-xs font-mono font-bold text-zen-text/80 tracking-widest uppercase">
                        LOGIC_AUDIT_PROTOCOL_V5.2
                    </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-zen-text/40 uppercase">
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span>SYSTEM_READY</span>
                    </div>
                    <span>LAST_AUDIT: {new Date().toISOString().split('T')[0]}</span>
                </div>
            </div>

            {/* Content Rows */}
            <div className="divide-y divide-[#2D2D2D]/10">

                {/* ROW 1: CORE DATASET */}
                <div className="group grid grid-cols-1 md:grid-cols-12 hover:bg-white/60 transition-colors">
                    {/* ID Column */}
                    <div className="md:col-span-3 p-6 border-r border-[#2D2D2D]/10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                             <Database className="w-4 h-4 text-zen-accent" />
                             <span className="text-[10px] font-mono font-bold text-zen-accent tracking-widest">SOURCE_DATA</span>
                        </div>
                        <div className="font-mono text-sm font-bold text-zen-text">ASTRONOMICAL_EPHEMERIS</div>
                        <div className="mt-2 text-[10px] font-mono text-zen-text/40 leading-tight">
                            EPHEMERIS_TYPE: SWISS_V5<br/>
                            ACCURACY: ±0.001°
                        </div>
                    </div>
                    {/* Content Column */}
                    <div className="md:col-span-6 p-6 flex flex-col justify-center">
                         <h3 className="font-serif text-lg font-bold text-zen-text mb-2 flex items-center gap-2">
                            数据底座 (Core Dataset)
                         </h3>
                         <p className="font-sans text-sm text-zen-text/70 leading-relaxed text-justify">
                            并非迷信，而是基于 5,000 年连续天文观测。我们调取历经千年的行星轨迹偏差数据，确保每一组干支代码都有物理坐标支撑。
                         </p>
                    </div>
                    {/* Visual Column */}
                    <div className="md:col-span-3 p-4 border-l border-[#2D2D2D]/10 bg-white/30 flex items-center justify-center">
                        <CoordinateVisual />
                    </div>
                </div>

                {/* ROW 2: COMPUTATIONAL ENGINE */}
                <div className="group grid grid-cols-1 md:grid-cols-12 hover:bg-white/60 transition-colors">
                    <div className="md:col-span-3 p-6 border-r border-[#2D2D2D]/10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                             <Cpu className="w-4 h-4 text-zen-accent" />
                             <span className="text-[10px] font-mono font-bold text-zen-accent tracking-widest">PROC_LOGIC</span>
                        </div>
                        <div className="font-mono text-sm font-bold text-zen-text">TEMPORAL_DECOMPRESSION</div>
                        <div className="mt-2 text-[10px] font-mono text-zen-text/40 leading-tight">
                            ALGORITHM: 5-ELEMENT_INTERACTION<br/>
                            VECTORS: 120,000+
                        </div>
                    </div>
                    <div className="md:col-span-6 p-6 flex flex-col justify-center">
                         <h3 className="font-serif text-lg font-bold text-zen-text mb-2 flex items-center gap-2">
                            运算引擎 (Computational Engine)
                         </h3>
                         <p className="font-sans text-sm text-zen-text/70 leading-relaxed text-justify">
                            将你的出生时刻视为一个‘时间胶囊’。算法通过东方五行交互逻辑进行高维解压，提取出 120,000 组关于能量流转的底层代码。
                         </p>
                    </div>
                    <div className="md:col-span-3 p-4 border-l border-[#2D2D2D]/10 bg-white/30 flex items-center justify-center">
                        <MatrixVisual />
                    </div>
                </div>

                {/* ROW 3: STRATEGIC MODEL */}
                <div className="group grid grid-cols-1 md:grid-cols-12 hover:bg-white/60 transition-colors">
                    <div className="md:col-span-3 p-6 border-r border-[#2D2D2D]/10 flex flex-col justify-center">
                         <div className="flex items-center gap-2 mb-2">
                             <TrendingUp className="w-4 h-4 text-zen-accent" />
                             <span className="text-[10px] font-mono font-bold text-zen-accent tracking-widest">MODEL_OUT</span>
                        </div>
                        <div className="font-mono text-sm font-bold text-zen-text">RISK_MITIGATION</div>
                        <div className="mt-2 text-[10px] font-mono text-zen-text/40 leading-tight">
                            TARGET_YEAR: 2026 (丙午)<br/>
                            CONFIDENCE: 98.4%
                        </div>
                    </div>
                    <div className="md:col-span-6 p-6 flex flex-col justify-center">
                         <h3 className="font-serif text-lg font-bold text-zen-text mb-2 flex items-center gap-2">
                            战略建模 (Strategic Model)
                         </h3>
                         <p className="font-sans text-sm text-zen-text/70 leading-relaxed text-justify">
                            当你的原始代码与 2026 年的双火（丙午）能量场发生碰撞，不确定性被转化为确定性的风险概率。我们不预言，我们计算胜率。
                         </p>
                    </div>
                    <div className="md:col-span-3 p-4 border-l border-[#2D2D2D]/10 bg-white/30 flex items-center justify-center">
                        <ProbabilityVisual />
                    </div>
                </div>

            </div>
            
            {/* Footer Status Bar */}
            <div className="bg-[#2D2D2D] text-[#F9F7F2] px-6 py-2 flex justify-between items-center text-[10px] font-mono">
                <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    <span>ENCRYPTED_CHANNEL</span>
                </div>
                <div className="tracking-widest opacity-60">
                    AWAITING_INPUT...
                </div>
            </div>

        </div>

        {/* 4. Transition Guide */}
        <div 
            className={`mt-24 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <span className="text-[10px] font-mono tracking-[0.3em] text-zen-text/40 uppercase">
                SCROLL TO DECRYPT
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-zen-accent/0 via-zen-accent to-zen-accent/0 animate-pulse" />
        </div>
    </section>
  );
};

export default LogicShift;