import React, { useRef, useEffect, useState } from 'react';

interface ScrollWheelProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  width?: string;
}

const ITEM_HEIGHT = 40;

const ScrollWheel: React.FC<ScrollWheelProps> = ({ items, value, onChange, label, width = "w-20" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Initialize scroll position based on value
  useEffect(() => {
    const index = items.indexOf(value);
    if (containerRef.current && index !== -1) {
      containerRef.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, []); // Only run once on mount or we might fight with user scrolling if we dep on 'value'

  const handleScroll = () => {
    if (containerRef.current) {
      setIsScrolling(true);
      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        // Snap to nearest
        if (containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const index = Math.round(scrollTop / ITEM_HEIGHT);
            const safeIndex = Math.max(0, Math.min(index, items.length - 1));
            
            // Only update if changed
            if (items[safeIndex] !== value) {
                onChange(items[safeIndex]);
            }
        }
      }, 100);
    }
  };

  return (
    <div className={`flex flex-col items-center ${width}`}>
      {label && <span className="text-[10px] font-mono tracking-widest text-zen-accent mb-2 uppercase">{label}</span>}
      <div className="relative h-[120px] w-full overflow-hidden">
        {/* Selection Box */}
        <div className="absolute top-[40px] left-0 w-full h-[40px] border-y border-zen-accent z-10 pointer-events-none bg-zen-accent/5" />
        
        {/* Fading Masks */}
        <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-zen-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-zen-bg to-transparent z-20 pointer-events-none" />

        {/* Scroll Container */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar relative z-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Padding to center first item */}
          <div style={{ height: '40px' }} />
          
          {items.map((item, idx) => (
            <div 
              key={`${item}-${idx}`} 
              className={`h-[40px] flex items-center justify-center snap-center transition-all duration-200 ${
                item === value ? 'text-zen-text font-bold scale-110' : 'text-zen-text/40 scale-90'
              }`}
            >
              <span className="font-mono text-sm">{item}</span>
            </div>
          ))}

          {/* Padding to center last item */}
          <div style={{ height: '40px' }} />
        </div>
      </div>
    </div>
  );
};

export default ScrollWheel;