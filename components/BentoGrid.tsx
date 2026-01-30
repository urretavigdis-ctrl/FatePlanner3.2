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
  { id: 'w1', category: 'WEALTH', tag: '副业方向?', question: '我该老实拿死工资，还是大胆搞副业赚钱？哪条路才是我的“正财”？', icon: <Coins className="w-4 h-4" /> },
  { id: 'w2', category: 'WEALTH', tag: '2026会破财吗?', question: '明年是否会发生意外的大额支出？哪几个月最容易被人借钱不还？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w3', category: 'WEALTH', tag: '投资被套?', question: '目前持有的资产在2026年是应该继续持有还是尽快止损？', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'w4', category: 'WEALTH', tag: '何时加薪?', question: '目前的职场运势是否有加薪的可能，还是应该通过跳槽来实现？', icon: <Coins className="w-4 h-4" /> },
  { id: 'w5', category: 'WEALTH', tag: '正财还是偏财?', question: '我的命盘显示我适合稳健的工作收入，还是风险较高的投资收入？', icon: <Coins className="w-4 h-4" /> },
  { id: 'w6', category: 'WEALTH', tag: '现金流危机?', question: '下半年是否会遇到现金流断裂的风险？如何提前储备？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w7', category: 'WEALTH', tag: '买房时机?', question: '2026年是买房抄底的好时机，还是会站在高岗上？', icon: <Home className="w-4 h-4" /> },
  { id: 'w8', category: 'WEALTH', tag: '股票解套?', question: '手里的股票还有回本的希望吗？', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'w9', category: 'WEALTH', tag: '合伙人风险?', question: '想和朋友合伙做生意，但他会不会坑我？', icon: <Users className="w-4 h-4" /> },
  { id: 'w10', category: 'WEALTH', tag: '税务问题?', question: '今年是否有因财务合规问题导致的破财风险？', icon: <FileText className="w-4 h-4" /> },
  { id: 'w11', category: 'WEALTH', tag: '隐形债务?', question: '是否会因为担保或人情背上不该背的债？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w12', category: 'WEALTH', tag: '薪资谈判?', question: '下个月谈薪资，底气在哪里？', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'w13', category: 'WEALTH', tag: '行业红利?', question: '我所在的行业未来三年是上升期还是衰退期？', icon: <Zap className="w-4 h-4" /> },
  { id: 'w14', category: 'WEALTH', tag: '资产配置?', question: '应该持有现金，还是换成黄金或外汇？', icon: <PieChart className="w-4 h-4" /> },
  { id: 'w15', category: 'WEALTH', tag: '储蓄目标?', question: '为什么我存不下钱？哪里漏财？', icon: <Coins className="w-4 h-4" /> },
  { id: 'w16', category: 'WEALTH', tag: '消费陷阱?', question: '最近是否有冲动消费的破财星入命？', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'w17', category: 'WEALTH', tag: '被动收入?', question: '如何建立睡后收入？', icon: <Zap className="w-4 h-4" /> },
  { id: 'w18', category: 'WEALTH', tag: '搞钱野路子?', question: '有没有适合我的冷门赚钱门路？', icon: <Compass className="w-4 h-4" /> },
  { id: 'w19', category: 'WEALTH', tag: '失业救济?', question: '如果失业，我的积蓄能撑多久？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'w20', category: 'WEALTH', tag: '暴富机会?', question: '这辈子有没有一夜暴富的命格？', icon: <Sparkles className="w-4 h-4" /> },
];

const loveItems: FeedItem[] = [
  { id: 'l1', category: 'LOVE', tag: '正缘在哪里?', question: '2026年到底有没有脱单机会？另一半会在什么场合出现？', icon: <Heart className="w-4 h-4" /> },
  { id: 'l2', category: 'LOVE', tag: '分手还是结婚?', question: '和伴侣关系紧张，2026年的能量是有利于结婚稳定，还是面临分手危机？', icon: <Users className="w-4 h-4" /> },
  { id: 'l3', category: 'LOVE', tag: '烂桃花?', question: '如何辨别遇到的对象是正缘还是来消耗我的“烂桃花”？', icon: <HeartOff className="w-4 h-4" /> },
  { id: 'l4', category: 'LOVE', tag: '前任回头?', question: '前任最近联系我，是旧情复燃还是重蹈覆辙？', icon: <History className="w-4 h-4" /> },
  { id: 'l5', category: 'LOVE', tag: '相亲靠谱吗?', question: '家里介绍的对象值得见吗？', icon: <Users className="w-4 h-4" /> },
  { id: 'l6', category: 'LOVE', tag: '对方忠诚吗?', question: '总感觉另一半有事瞒着我，是有第三者吗？', icon: <Eye className="w-4 h-4" /> },
  { id: 'l7', category: 'LOVE', tag: '何时脱单?', question: '还要单身多久？确切的脱单月份是几月？', icon: <Calendar className="w-4 h-4" /> },
  { id: 'l8', category: 'LOVE', tag: '婚姻危机?', question: '七年之痒，这段婚姻还能走下去吗？', icon: <HeartCrack className="w-4 h-4" /> },
  { id: 'l9', category: 'LOVE', tag: '灵魂伴侣?', question: '这世界上真的有懂我的灵魂伴侣吗？', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'l10', category: 'LOVE', tag: '异地恋?', question: '异地恋太辛苦，今年有机会结束异地吗？', icon: <MapPin className="w-4 h-4" /> },
  { id: 'l11', category: 'LOVE', tag: '父母反对?', question: '父母看不上我的对象，该坚持还是妥协？', icon: <Users className="w-4 h-4" /> },
  { id: 'l12', category: 'LOVE', tag: '三角关系?', question: '陷入了复杂的感情纠葛，怎么全身而退？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'l13', category: 'LOVE', tag: '备胎转正?', question: '我对他这么好，他会看到我吗？', icon: <Clock className="w-4 h-4" /> },
  { id: 'l14', category: 'LOVE', tag: '闪婚风险?', question: '认识不久就想结婚，是冲动还是缘分？', icon: <Zap className="w-4 h-4" /> },
  { id: 'l15', category: 'LOVE', tag: '冷战怎么破?', question: '谁都不肯低头，这段关系要凉了吗？', icon: <ThermometerSnowflake className="w-4 h-4" /> },
  { id: 'l16', category: 'LOVE', tag: '是否独身?', question: '我是不是注定孤独终老的命？', icon: <User className="w-4 h-4" /> },
  { id: 'l17', category: 'LOVE', tag: '同性缘分?', question: '我的取向不被理解，哪里能遇到同类？', icon: <Rainbow className="w-4 h-4" /> },
  { id: 'l18', category: 'LOVE', tag: '桃花劫?', question: '最近异性缘太好，是福还是祸？', icon: <AlertCircle className="w-4 h-4" /> },
  { id: 'l19', category: 'LOVE', tag: '办公室恋情?', question: '喜欢上了同事，该表白还是隐藏？', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'l20', category: 'LOVE', tag: '复合概率?', question: '分手半年了，还有机会复合吗？', icon: <RefreshCcw className="w-4 h-4" /> },
];

const healthItems: FeedItem[] = [
  { id: 'h1', category: 'HEALTH', tag: '心火过旺?', question: '火气这么旺的年份，我身体哪个部位最容易出健康问题？如何提前预防？', icon: <Activity className="w-4 h-4" /> },
  { id: 'h2', category: 'HEALTH', tag: '失眠多梦?', question: '最近总是凌晨醒来，是压力太大还是身体警报？', icon: <Moon className="w-4 h-4" /> },
  { id: 'h3', category: 'HEALTH', tag: '脱发焦虑?', question: '头发掉得厉害，是肾虚还是熬夜？', icon: <UserMinus className="w-4 h-4" /> },
  { id: 'h4', category: 'HEALTH', tag: '突发疾病?', question: '明年有没有需要动手术的风险？', icon: <Cross className="w-4 h-4" /> },
  { id: 'h5', category: 'HEALTH', tag: '心理内耗?', question: '总是胡思乱想，我是不是抑郁了？', icon: <Brain className="w-4 h-4" /> },
  { id: 'h6', category: 'HEALTH', tag: '甲状腺?', question: '体检甲状腺有结节，会恶化吗？', icon: <Activity className="w-4 h-4" /> },
  { id: 'h7', category: 'HEALTH', tag: '肠胃隐患?', question: '吃什么都不消化，肠胃是不是出问题了？', icon: <Coffee className="w-4 h-4" /> },
  { id: 'h8', category: 'HEALTH', tag: '手术风险?', question: '医生建议手术，今年适合动刀吗？', icon: <Scissors className="w-4 h-4" /> },
  { id: 'h9', category: 'HEALTH', tag: '亚健康?', question: '总感觉累，去医院查不出毛病，怎么调理？', icon: <BatteryWarning className="w-4 h-4" /> },
  { id: 'h10', category: 'HEALTH', tag: '过劳肥?', question: '越忙越胖，怎么打破这个循环？', icon: <Scale className="w-4 h-4" /> },
  { id: 'h11', category: 'HEALTH', tag: '抑郁倾向?', question: '对什么都提不起兴趣，需要看心理医生吗？', icon: <CloudRain className="w-4 h-4" /> },
  { id: 'h12', category: 'HEALTH', tag: '意外受伤?', question: '今年开车要不要特别小心？', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'h13', category: 'HEALTH', tag: '家中风水?', question: '家里的布局是不是影响了我的健康？', icon: <Compass className="w-4 h-4" /> },
  { id: 'h14', category: 'HEALTH', tag: '五行缺水?', question: '我是不是五行缺水导致皮肤干？', icon: <Droplets className="w-4 h-4" /> },
  { id: 'h15', category: 'HEALTH', tag: '精力管理?', question: '每天下午就犯困，怎么保持精力？', icon: <Zap className="w-4 h-4" /> },
  { id: 'h16', category: 'HEALTH', tag: '旧疾复发?', question: '老毛病会不会在今年复发？', icon: <RotateCcw className="w-4 h-4" /> },
  { id: 'h17', category: 'HEALTH', tag: '整容风险?', question: '想去整容，会不会毁容？', icon: <Smile className="w-4 h-4" /> },
  { id: 'h18', category: 'HEALTH', tag: '身材焦虑?', question: '为什么怎么减肥都瘦不下来？', icon: <User className="w-4 h-4" /> },
  { id: 'h19', category: 'HEALTH', tag: '免疫力?', question: '总是感冒，免疫力太差怎么办？', icon: <Shield className="w-4 h-4" /> },
  { id: 'h20', category: 'HEALTH', tag: '职业病?', question: '腰椎颈椎受不了了，需要换工作养病吗？', icon: <Armchair className="w-4 h-4" /> },
];

const decisionItems: FeedItem[] = [
  { id: 'd1', category: 'DECISION', tag: '跳槽还是苟住?', question: '2026年适合跳槽、谈加薪或启动新项目吗？还是应该“苟”在现在的岗位上？', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'd2', category: 'DECISION', tag: '买房时机?', question: '下个月我能不能做重大决定，比如买房、投资或裸辞？', icon: <Home className="w-4 h-4" /> },
  { id: 'd3', category: 'DECISION', tag: '出国留学?', question: '现在出国是镀金还是浪费钱？', icon: <Plane className="w-4 h-4" /> },
  { id: 'd4', category: 'DECISION', tag: '移民签证?', question: '我的移民申请今年能批下来吗？', icon: <Globe className="w-4 h-4" /> },
  { id: 'd5', category: 'DECISION', tag: '裸辞创业?', question: '受够了打工，今年适合裸辞创业吗？', icon: <Rocket className="w-4 h-4" /> },
  { id: 'd6', category: 'DECISION', tag: '回老家发展?', question: '大城市太卷，回老家是不是躺平？', icon: <MapPin className="w-4 h-4" /> },
  { id: 'd7', category: 'DECISION', tag: '考公上岸?', question: '我有考公务员的命吗？', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'd8', category: 'DECISION', tag: '读博还是工作?', question: '继续深造还是早点赚钱？', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'd9', category: 'DECISION', tag: '买车?', question: '今年适合买车吗？还是留着现金？', icon: <Car className="w-4 h-4" /> },
  { id: 'd10', category: 'DECISION', tag: '生孩子?', question: '今年适合备孕生孩子吗？', icon: <Baby className="w-4 h-4" /> },
  { id: 'd11', category: 'DECISION', tag: '离婚?', question: '这段婚姻太痛苦，今年离婚顺利吗？', icon: <FileMinus className="w-4 h-4" /> },
  { id: 'd12', category: 'DECISION', tag: '退休计划?', question: '能不能提前退休，环游世界？', icon: <Palmtree className="w-4 h-4" /> },
  { id: 'd13', category: 'DECISION', tag: '转行?', question: '现在的行业没前途，转行穷三年？', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'd14', category: 'DECISION', tag: '借钱给朋友?', question: '朋友借钱救急，该不该借？', icon: <HelpingHand className="w-4 h-4" /> },
  { id: 'd15', category: 'DECISION', tag: '投资自己?', question: '花大钱报课提升自己，值得吗？', icon: <ArrowUpCircle className="w-4 h-4" /> },
  { id: 'd16', category: 'DECISION', tag: '签署合同?', question: '这份合同有没有法律陷阱？', icon: <FileSignature className="w-4 h-4" /> },
  { id: 'd17', category: 'DECISION', tag: '法律诉讼?', question: '官司能不能打赢？', icon: <Gavel className="w-4 h-4" /> },
  { id: 'd18', category: 'DECISION', tag: '搬家方位?', question: '往哪个方向搬家运势最好？', icon: <Compass className="w-4 h-4" /> },
  { id: 'd19', category: 'DECISION', tag: '该不该躺平?', question: '努力没结果，是不是该认命躺平？', icon: <BedDouble className="w-4 h-4" /> },
  { id: 'd20', category: 'DECISION', tag: '人生重启?', question: '感觉人生失败，还有翻盘的机会吗？', icon: <RefreshCcw className="w-4 h-4" /> },
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
            这是否是你正经历的困扰？
          </h2>
          
          <p className="font-sans text-lg text-zen-text/80 dark:text-zen-subtle/80 max-w-2xl mx-auto leading-relaxed">
            这不是巧合。数万个体的共同焦虑，实际上是 2026 丙午流年火燥能量对现代社会结构的系统性冲击。
          </p>
      </div>

      {/* Main Grid Container with fixed height for scrolling context */}
      <div className="w-full h-[500px] relative overflow-hidden border-y border-zen-text/5 bg-zen-text/[0.02]">
          
          <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-4 gap-px bg-zen-text/5 px-0 md:px-4 relative z-0">
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="WEALTH / 财富" items={wealthItems} onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="LOVE / 感情" items={loveItems} reverse onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="HEALTH / 健康" items={healthItems} onSelect={setSelectedItem} />
              </div>
              <div className="bg-[#F0EDE6] dark:bg-[#0F1219] h-full px-2">
                <VerticalColumn title="DECISION / 决定" items={decisionItems} reverse onSelect={setSelectedItem} />
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