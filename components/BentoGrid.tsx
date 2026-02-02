import React, { useState } from 'react';
import { BentoItem } from '../types';
import { 
  Briefcase, Coins, AlertTriangle, Heart, Users, Compass, Activity, MapPin, CheckCircle, Radio, X, Brain, Zap, Scale,
  TrendingUp, Home, PieChart, ShoppingBag, Sparkles, 
  HeartOff, History, Eye, Calendar, HeartCrack, ThermometerSnowflake, User, Rainbow, AlertCircle, RefreshCcw,
  Moon, UserMinus, Cross, Coffee, Scissors, BatteryWarning, CloudRain, Droplets, Armchair, Smile, RotateCcw,
  Plane, Rocket, GraduationCap, Car, Baby, FileMinus, Palmtree, RefreshCw, HelpingHand, ArrowUpCircle, FileSignature, Gavel, BedDouble,
  FileText, Clock, Shield, BookOpen, Globe
} from 'lucide-react';

interface FeedItem extends BentoItem {
  tag: string;
}

// --- DATA SETS (20 items per category) ---

const wealthItems: FeedItem[] = [
  { id: 'w1', category: 'WEALTH', tag: 'Side Hustle?', question: 'Should I stick to my fixed salary or boldly start a side business? Which is my "True Wealth" path?', icon: <Coins className="w-4 h-4" /> },
  { id: 'w2', category: 'WEALTH', tag: 'Financial Loss?', question: 'Will there be unexpected large expenses in 2026? Which months are prone to bad debts?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w3', category: 'WEALTH', tag: 'Investment Trap?', question: 'Should I hold onto my current assets in 2026 or cut losses ASAP?', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'w4', category: 'WEALTH', tag: 'Raise Timing?', question: 'Does my career luck suggest a raise, or should I switch jobs to get it?', icon: <Coins className="w-4 h-4" /> },
  { id: 'w5', category: 'WEALTH', tag: 'Salary vs Invest?', question: 'Does my chart favor stable employment income or high-risk investment returns?', icon: <Coins className="w-4 h-4" /> },
  { id: 'w6', category: 'WEALTH', tag: 'Cash Flow Crisis?', question: 'Is there a risk of cash flow rupture in the second half of the year? How to prepare?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w7', category: 'WEALTH', tag: 'Buy Property?', question: 'Is 2026 a good time to buy at the bottom, or will I be buying at the peak?', icon: <Home className="w-4 h-4" /> },
  { id: 'w8', category: 'WEALTH', tag: 'Stock Recovery?', question: 'Is there any hope for my stocks to break even?', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'w9', category: 'WEALTH', tag: 'Partner Risk?', question: 'I want to partner with a friend, but will they betray me?', icon: <Users className="w-4 h-4" /> },
  { id: 'w10', category: 'WEALTH', tag: 'Tax Issues?', question: 'Is there a risk of financial loss due to tax compliance issues this year?', icon: <FileText className="w-4 h-4" /> },
  { id: 'w11', category: 'WEALTH', tag: 'Hidden Debt?', question: 'Will I take on debt I shouldn\'t because of guarantees or favors?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w12', category: 'WEALTH', tag: 'Salary Negotiation?', question: 'I\'m negotiating salary next month, what gives me leverage?', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'w13', category: 'WEALTH', tag: 'Industry Bonus?', question: 'Is my industry in an upward or downward cycle for the next three years?', icon: <Zap className="w-4 h-4" /> },
  { id: 'w14', category: 'WEALTH', tag: 'Asset Allocation?', question: 'Should I hold cash, or convert to gold or foreign currency?', icon: <PieChart className="w-4 h-4" /> },
  { id: 'w15', category: 'WEALTH', tag: 'Savings Goal?', question: 'Why can\'t I save money? Where is the leak?', icon: <Coins className="w-4 h-4" /> },
  { id: 'w16', category: 'WEALTH', tag: 'Spending Trap?', question: 'Is there a "Wealth Drain" star affecting me with impulsive spending?', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'w17', category: 'WEALTH', tag: 'Passive Income?', question: 'How can I build income that generates while I sleep?', icon: <Zap className="w-4 h-4" /> },
  { id: 'w18', category: 'WEALTH', tag: 'Niche Income?', question: 'Are there any niche money-making paths suitable for me?', icon: <Compass className="w-4 h-4" /> },
  { id: 'w19', category: 'WEALTH', tag: 'Unemployment?', question: 'If I lose my job, how long will my savings last?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w20', category: 'WEALTH', tag: 'Sudden Wealth?', question: 'Do I have the destiny for overnight riches in this lifetime?', icon: <Sparkles className="w-4 h-4" /> },
];

const loveItems: FeedItem[] = [
  { id: 'l1', category: 'LOVE', tag: 'Where is The One?', question: 'Is there any chance to meet someone in 2026? Where will they appear?', icon: <Heart className="w-4 h-4" /> },
  { id: 'l2', category: 'LOVE', tag: 'Breakup or Marry?', question: 'Relationship is tense. Does 2026 energy favor marriage or breakup?', icon: <Users className="w-4 h-4" /> },
  { id: 'l3', category: 'LOVE', tag: 'Toxic Romance?', question: 'How do I identify if someone is "The One" or just a toxic distraction?', icon: <HeartOff className="w-4 h-4" /> },
  { id: 'l4', category: 'LOVE', tag: 'Ex Returning?', question: 'My ex contacted me. Is it a reunion or a repeat of mistakes?', icon: <History className="w-4 h-4" /> },
  { id: 'l5', category: 'LOVE', tag: 'Matchmaking?', question: 'Is the person my family introduced worth meeting?', icon: <Users className="w-4 h-4" /> },
  { id: 'l6', category: 'LOVE', tag: 'Loyalty Check?', question: 'I feel my partner is hiding something. Is there a third party?', icon: <Eye className="w-4 h-4" /> },
  { id: 'l7', category: 'LOVE', tag: 'Single How Long?', question: 'How much longer will I be single? Which month is the breakthrough?', icon: <Calendar className="w-4 h-4" /> },
  { id: 'l8', category: 'LOVE', tag: 'Marriage Crisis?', question: 'The seven-year itch. Can this marriage survive?', icon: <HeartCrack className="w-4 h-4" /> },
  { id: 'l9', category: 'LOVE', tag: 'Soulmate?', question: 'Does a soulmate who truly understands me really exist?', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'l10', category: 'LOVE', tag: 'Long Distance?', question: 'LDR is hard. Is there a chance to close the distance this year?', icon: <MapPin className="w-4 h-4" /> },
  { id: 'l11', category: 'LOVE', tag: 'Parental Disapproval?', question: 'Parents dislike my partner. Should I persist or compromise?', icon: <Users className="w-4 h-4" /> },
  { id: 'l12', category: 'LOVE', tag: 'Love Triangle?', question: 'Caught in a complex situation. How do I exit safely?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'l13', category: 'LOVE', tag: 'From Friend to Lover?', question: 'I treat them so well, will they ever see me romantically?', icon: <Clock className="w-4 h-4" /> },
  { id: 'l14', category: 'LOVE', tag: 'Flash Marriage?', question: 'We just met and want to marry. Is it impulse or destiny?', icon: <Zap className="w-4 h-4" /> },
  { id: 'l15', category: 'LOVE', tag: 'Cold War?', question: 'Neither of us will bow down. Is this relationship cooling off?', icon: <ThermometerSnowflake className="w-4 h-4" /> },
  { id: 'l16', category: 'LOVE', tag: 'Destined Single?', question: 'Am I destined to be alone forever?', icon: <User className="w-4 h-4" /> },
  { id: 'l17', category: 'LOVE', tag: 'LGBTQ+ Fate?', question: 'My orientation isn\'t understood. Where can I find my tribe?', icon: <Rainbow className="w-4 h-4" /> },
  { id: 'l18', category: 'LOVE', tag: 'Peach Blossom Trap?', question: 'Too much attention from the opposite sex lately. Blessing or curse?', icon: <AlertCircle className="w-4 h-4" /> },
  { id: 'l19', category: 'LOVE', tag: 'Office Romance?', question: 'I like a colleague. Should I confess or hide it?', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'l20', category: 'LOVE', tag: 'Reunion Chance?', question: 'Broke up six months ago. Is there a chance to get back together?', icon: <RefreshCcw className="w-4 h-4" /> },
];

const healthItems: FeedItem[] = [
  { id: 'h1', category: 'HEALTH', tag: 'Excessive Fire?', question: 'With such strong Fire energy this year, which body part is most at risk? How to prevent it?', icon: <Activity className="w-4 h-4" /> },
  { id: 'h2', category: 'HEALTH', tag: 'Insomnia?', question: 'Waking up early recently. Is it stress or a body alarm?', icon: <Moon className="w-4 h-4" /> },
  { id: 'h3', category: 'HEALTH', tag: 'Hair Loss?', question: 'Losing hair fast. Is it kidney deficiency or staying up too late?', icon: <UserMinus className="w-4 h-4" /> },
  { id: 'h4', category: 'HEALTH', tag: 'Sudden Illness?', question: 'Is there a risk of needing surgery next year?', icon: <Cross className="w-4 h-4" /> },
  { id: 'h5', category: 'HEALTH', tag: 'Mental Burnout?', question: 'Always overthinking. Am I depressed?', icon: <Brain className="w-4 h-4" /> },
  { id: 'h6', category: 'HEALTH', tag: 'Thyroid?', question: 'Checkup found thyroid nodules. Will they worsen?', icon: <Activity className="w-4 h-4" /> },
  { id: 'h7', category: 'HEALTH', tag: 'Stomach Issues?', question: 'Indigestion whatever I eat. Is my stomach failing?', icon: <Coffee className="w-4 h-4" /> },
  { id: 'h8', category: 'HEALTH', tag: 'Surgery Risk?', question: 'Doctor suggests surgery. Is this year suitable for going under the knife?', icon: <Scissors className="w-4 h-4" /> },
  { id: 'h9', category: 'HEALTH', tag: 'Sub-health?', question: 'Always tired but checkups are fine. How to regulate?', icon: <BatteryWarning className="w-4 h-4" /> },
  { id: 'h10', category: 'HEALTH', tag: 'Overwork Obesity?', question: 'The busier I am, the fatter I get. How to break this cycle?', icon: <Scale className="w-4 h-4" /> },
  { id: 'h11', category: 'HEALTH', tag: 'Depression?', question: 'No interest in anything. Do I need a psychologist?', icon: <CloudRain className="w-4 h-4" /> },
  { id: 'h12', category: 'HEALTH', tag: 'Accidental Injury?', question: 'Should I be extra careful driving this year?', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'h13', category: 'HEALTH', tag: 'Home Feng Shui?', question: 'Is my home layout affecting my health?', icon: <Compass className="w-4 h-4" /> },
  { id: 'h14', category: 'HEALTH', tag: 'Lacking Water?', question: 'Is my dry skin due to a lack of Water element?', icon: <Droplets className="w-4 h-4" /> },
  { id: 'h15', category: 'HEALTH', tag: 'Energy Management?', question: 'Sleepy every afternoon. How to maintain energy?', icon: <Zap className="w-4 h-4" /> },
  { id: 'h16', category: 'HEALTH', tag: 'Old Illness?', question: 'Will my old condition recur this year?', icon: <RotateCcw className="w-4 h-4" /> },
  { id: 'h17', category: 'HEALTH', tag: 'Cosmetic Risk?', question: 'Thinking of plastic surgery. Will it be disfiguring?', icon: <Smile className="w-4 h-4" /> },
  { id: 'h18', category: 'HEALTH', tag: 'Body Anxiety?', question: 'Why can\'t I lose weight no matter what?', icon: <User className="w-4 h-4" /> },
  { id: 'h19', category: 'HEALTH', tag: 'Immunity?', question: 'Catching colds often. How to boost immunity?', icon: <Shield className="w-4 h-4" /> },
  { id: 'h20', category: 'HEALTH', tag: 'Occupational Disease?', question: 'Spine can\'t take it anymore. Should I switch jobs to recover?', icon: <Armchair className="w-4 h-4" /> },
];

const decisionItems: FeedItem[] = [
  { id: 'd1', category: 'DECISION', tag: 'Jump or Stay?', question: 'Is 2026 suitable for changing jobs, raises, or new projects? Or should I "hunker down"?', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'd2', category: 'DECISION', tag: 'Buy House?', question: 'Can I make a major decision next month, like buying a house or quitting?', icon: <Home className="w-4 h-4" /> },
  { id: 'd3', category: 'DECISION', tag: 'Study Abroad?', question: 'Is going abroad now gold-plating or wasting money?', icon: <Plane className="w-4 h-4" /> },
  { id: 'd4', category: 'DECISION', tag: 'Immigration?', question: 'Will my immigration application be approved this year?', icon: <Globe className="w-4 h-4" /> },
  { id: 'd5', category: 'DECISION', tag: 'Quit to Startup?', question: 'Fed up with working for others. Is this year right for a startup?', icon: <Rocket className="w-4 h-4" /> },
  { id: 'd6', category: 'DECISION', tag: 'Return Home?', question: 'Big city is too competitive. Is going back home "giving up"?', icon: <MapPin className="w-4 h-4" /> },
  { id: 'd7', category: 'DECISION', tag: 'Civil Service?', question: 'Do I have the destiny to be a civil servant?', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'd8', category: 'DECISION', tag: 'PhD or Work?', question: 'Continue studying or start earning early?', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'd9', category: 'DECISION', tag: 'Buy Car?', question: 'Is this year suitable for buying a car? Or keep the cash?', icon: <Car className="w-4 h-4" /> },
  { id: 'd10', category: 'DECISION', tag: 'Have Baby?', question: 'Is this year suitable for pregnancy?', icon: <Baby className="w-4 h-4" /> },
  { id: 'd11', category: 'DECISION', tag: 'Divorce?', question: 'This marriage is painful. Will divorce go smoothly this year?', icon: <FileMinus className="w-4 h-4" /> },
  { id: 'd12', category: 'DECISION', tag: 'Retire Early?', question: 'Can I retire early and travel the world?', icon: <Palmtree className="w-4 h-4" /> },
  { id: 'd13', category: 'DECISION', tag: 'Change Industry?', question: 'No future in current industry. Will switching make me poor for 3 years?', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'd14', category: 'DECISION', tag: 'Lend Money?', question: 'Friend needs emergency money. Should I lend it?', icon: <HelpingHand className="w-4 h-4" /> },
  { id: 'd15', category: 'DECISION', tag: 'Self Investment?', question: 'Spending big on courses to improve myself. Worth it?', icon: <ArrowUpCircle className="w-4 h-4" /> },
  { id: 'd16', category: 'DECISION', tag: 'Sign Contract?', question: 'Are there legal traps in this contract?', icon: <FileSignature className="w-4 h-4" /> },
  { id: 'd17', category: 'DECISION', tag: 'Legal Suit?', question: 'Can I win this lawsuit?', icon: <Gavel className="w-4 h-4" /> },
  { id: 'd18', category: 'DECISION', tag: 'Moving Direction?', question: 'Which direction is best for moving?', icon: <Compass className="w-4 h-4" /> },
  { id: 'd19', category: 'DECISION', tag: 'Lie Flat?', question: 'Effort yields no results. Should I just accept fate and lie flat?', icon: <BedDouble className="w-4 h-4" /> },
  { id: 'd20', category: 'DECISION', tag: 'Life Reset?', question: 'Feel like a failure. Is there a chance to turn it around?', icon: <RefreshCcw className="w-4 h-4" /> },
];

const TagBubble: React.FC<{ item: FeedItem; onClick: (item: FeedItem) => void }> = ({ item, onClick }) => (
  <button 
    onClick={() => onClick(item)}
    className="group relative flex items-center justify-center gap-3 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zen-text/10 hover:border-zen-accent/50 px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(193,154,107,0.2)] hover:bg-white dark:hover:bg-white/10 w-full max-w-[220px] mx-auto text-left shadow-sm"
  >
    <div className="text-zen-text/50 dark:text-zen-subtle/50 group-hover:text-zen-accent transition-colors shrink-0">
        {item.icon}
    </div>
    <span className="font-sans text-sm font-medium text-zen-text dark:text-zen-subtle/90 truncate tracking-wide">
      {item.tag}
    </span>
    {/* Tiny dot decoration */}
    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-zen-risk rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
  </button>
);

const VerticalColumn: React.FC<{ title: string; items: FeedItem[]; reverse?: boolean; onSelect: (i: FeedItem) => void }> = ({ title, items, reverse = false, onSelect }) => {
  // Triple the items to ensure smooth infinite scroll without gaps
  const loopItems = [...items, ...items, ...items];
  
  return (
    <div className="flex flex-col h-full w-full">
        {/* Column Header */}
        <div className="text-center pb-4 pt-2 border-b border-zen-text/5 mb-2 relative z-10">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zen-text/60 uppercase">
                {title}
            </span>
        </div>

        {/* Scroll Area */}
        <div className="flex-1 overflow-hidden relative w-full">
            <div className={`flex flex-col gap-3 py-4 animate-${reverse ? 'scroll-y-reverse' : 'scroll-y'} hover:[animation-play-state:paused]`}>
                {loopItems.map((item, idx) => (
                    <TagBubble key={`${item.id}-${idx}`} item={item} onClick={onSelect} />
                ))}
            </div>
            
            {/* Top/Bottom Fade Masks per column for depth */}
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#F0EDE6] dark:from-[#0F1219] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#F0EDE6] dark:from-[#0F1219] to-transparent pointer-events-none" />
        </div>
    </div>
  );
};

const AnxietyFeed: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);

  return (
    <section id="bento-grid" className="w-full relative bg-[#F0EDE6] dark:bg-[#0F1219] py-20 md:py-32 border-t border-zen-text/5">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
      
      {/* Section Header */}
      <div className="relative z-10 container mx-auto px-4 mb-16 text-center">
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-zen-text dark:text-zen-subtle mb-6 tracking-tight">
            Is This The Anxiety You Are Facing?
          </h2>
          
          <p className="font-sans text-lg text-zen-text/80 dark:text-zen-subtle/80 max-w-2xl mx-auto leading-relaxed">
            It's not a coincidence. The shared anxiety of thousands is actually a systemic impact of the 2026 Bing Wu Fire energy on modern social structures.
          </p>
      </div>

      {/* Main Grid Container with fixed height for scrolling context */}
      <div className="w-full h-[500px] relative overflow-hidden border-y border-zen-text/5 bg-zen-text/[0.02]">
          
          <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-4 gap-px bg-zen-text/5 px-0 md:px-4 relative z-0">
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="WEALTH" items={wealthItems} onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="LOVE" items={loveItems} reverse onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="HEALTH" items={healthItems} onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="DECISION" items={decisionItems} reverse onSelect={setSelectedItem} />
              </div>
          </div>
          
          {/* Global top/bottom masks for the grid area */}
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#F0EDE6] dark:from-[#0F1219] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#F0EDE6] dark:from-[#0F1219] to-transparent pointer-events-none z-10" />
      </div>

      {/* IMPACT MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-zen-bg/60 dark:bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" 
                onClick={() => setSelectedItem(null)}
            />
            
            {/* Dialog */}
            <div className="relative w-full max-w-lg bg-white/80 dark:bg-[#1A1F2E]/90 backdrop-blur-xl border border-zen-accent rounded-2xl p-8 shadow-2xl animate-slam overflow-hidden">
                
                {/* Decorative Flash */}
                <div className="absolute inset-0 bg-zen-accent/10 animate-flash pointer-events-none" />
                
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 text-zen-text/30 hover:text-zen-risk transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-zen-accent/10 flex items-center justify-center text-zen-accent mb-6 animate-float">
                        {selectedItem.icon}
                    </div>
                    
                    <span className="font-mono text-xs text-zen-text/40 tracking-[0.3em] uppercase mb-4">
                        QUERY DETECTED
                    </span>
                    
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-zen-text dark:text-zen-subtle mb-6 leading-snug">
                        "{selectedItem.question}"
                    </h3>

                    <p className="font-sans text-sm text-zen-text/60 max-w-sm mb-8">
                        The 2026 Fire Horse (丙午) energy pattern has a specific calculation for this variable.
                    </p>

                    <button 
                        onClick={() => {
                            setSelectedItem(null);
                            const cta = document.getElementById('primary-cta');
                            if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative px-8 py-3 bg-zen-text text-white rounded-lg overflow-hidden transition-transform hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-zen-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                            CALCULATE PROBABILITY <Radio className="w-4 h-4" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
      )}

    </section>
  );
};

export default AnxietyFeed;