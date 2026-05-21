import { useState, useMemo } from 'react';
import { QUOTES_DATA, DEVELOPER_NAME, APP_NAME } from '../constants';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES_DATA.length));
  
  const dailyQuote = useMemo(() => {
    // Deterministic daily quote based on date
    const day = new Date().getDate();
    return QUOTES_DATA[day % QUOTES_DATA.length];
  }, []);

  const getRandomQuote = () => {
    setQuoteIndex(Math.floor(Math.random() * QUOTES_DATA.length));
  };
  
  const handleNext = () => {
    setQuoteIndex(prev => (prev + 1) % QUOTES_DATA.length);
  };
  
  const handlePrev = () => {
    setQuoteIndex(prev => (prev - 1 + QUOTES_DATA.length) % QUOTES_DATA.length);
  };

  return (
    <div className="pb-24 pt-8 px-5 min-h-screen">
      <header className="text-center mb-9 relative">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 bg-gradient-to-tr from-gold/15 to-gold/5 rounded-2xl border border-gold/25 mx-auto mb-4 flex items-center justify-center text-gold-dark dark:text-gold shadow-md shadow-gold/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gold/5 blur-sm" />
          <Sparkles size={26} className="animate-pulse relative z-10 text-gold-dark dark:text-gold" />
        </motion.div>
        
        <h1 className="text-3xl font-serif font-black gold-text-gradient mb-2 tracking-wide drop-shadow-sm">
          {APP_NAME}
        </h1>
        
        <div className="max-w-xs mx-auto px-2">
          <p className="text-black/70 dark:text-white/80 text-[11px] font-semibold leading-relaxed font-sans mb-2">
            د هوښیارۍ، معرفت او بریا د غوره ویناګانو او لارښوونو تر ټولو ښکلې او آرامه ټولګه
          </p>
          <div className="inline-flex items-center gap-1 px-3 py-0.5 bg-gold/15 dark:bg-gold/10 rounded-full border border-gold/15 text-[9px] font-bold text-gold-dark dark:text-gold shadow-xs">
            <span>ترتیب کوونکی:</span>
            <span>{DEVELOPER_NAME}</span>
          </div>
        </div>

        {/* Beautiful luxury line ornament */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
          <div className="text-gold-dark/30 dark:text-gold/40 text-[9px] tracking-widest leading-none">♦ ❖ ♦</div>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
      </header>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3.5 text-gold-dark dark:text-gold/90 justify-center">
          <Sparkles size={16} className="stroke-[2.5]" />
          <h2 className="text-sm font-bold tracking-wide uppercase">د نن ورځې غوره وینا</h2>
        </div>
        <AdvancedQuoteCard quote={dailyQuote} />
      </section>

      {/* Modern dotted divider */}
      <div className="flex items-center justify-center my-8 opacity-20">
        <span className="w-16 h-[1px] bg-gold" />
        <span className="w-1 h-1 rounded-full bg-gold mx-2" />
        <span className="w-16 h-[1px] bg-gold" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-black/80 dark:text-white/80">نورې په زړه پورې ویناوې</h2>
          <button 
            onClick={getRandomQuote}
            className="px-3.5 py-1.5 bg-gold/15 text-gold-dark dark:text-gold rounded-full flex items-center gap-1.5 hover:bg-gold/25 transition-all font-bold text-[10px] shadow-sm border border-gold/15"
          >
            <RefreshCw size={12} className="stroke-[2.5]" />
            بله وینا
          </button>
        </div>
        <AdvancedQuoteCard 
          quote={QUOTES_DATA[quoteIndex]} 
          onNext={handleNext} 
          onPrev={handlePrev} 
        />
      </section>
    </div>
  );
}
