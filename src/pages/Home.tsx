import { useState, useMemo } from 'react';
import { QUOTES_DATA, DEVELOPER_NAME, APP_NAME } from '../constants';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { RefreshCw, Sparkles } from 'lucide-react';

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
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold gold-text-gradient mb-2 tracking-wider">
          {APP_NAME}
        </h1>
        <p className="text-black/60 dark:text-white/40 text-xs tracking-[0.2em] font-medium uppercase">
          د {DEVELOPER_NAME} لخوا جوړ شوی
        </p>
      </header>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6 text-gold-dark dark:text-gold/80">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold">د نن ورځې وینا</h2>
        </div>
        <AdvancedQuoteCard quote={dailyQuote} />
      </section>

      <div className="h-px bg-black/5 dark:bg-white/5 w-full my-12" />

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black/80 dark:text-white/80">نورې ویناوې</h2>
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
