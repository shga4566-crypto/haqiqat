import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { Quote } from '../types';
import { Heart, Share2, Copy, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function AdvancedQuoteCard({ quote, onNext, onPrev }: QuoteCardProps) {
  const { toggleFavorite, favorites, settings } = useApp();
  const isFav = favorites.includes(quote.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote.text}\n— ${quote.author}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ښکلې وینا وي',
          text: `${quote.text}\n— ${quote.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card dark:glass-card-dark rounded-3xl p-6 md:p-8 flex flex-col items-center text-center relative max-w-sm w-full mx-auto shadow-2xl"
    >
      <div className="absolute -top-4 bg-gold rounded-full px-4 py-1 text-black text-xs font-bold shadow-lg">
        {quote.category}
      </div>

      <div className="my-8 w-full flex items-center justify-between">
        {onPrev && (
          <button onClick={onPrev} className="p-2 -mx-4 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white/70 transition-all">
            <ChevronRight size={28} />
          </button>
        )}
        
        <div className="flex-1 px-4">
          <p 
            className="font-serif leading-relaxed dark:text-white text-black"
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            {quote.text}
          </p>
        </div>

        {onNext && (
          <button onClick={onNext} className="p-2 -mx-4 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white/70 transition-all">
            <ChevronLeft size={28} />
          </button>
        )}
      </div>

      <div className="w-12 h-1 bg-gold/30 rounded-full mb-4" />
      
      <p className="text-gold-dark dark:text-gold font-bold italic text-sm mb-8">
        — {quote.author}
      </p>

      <div className="flex items-center gap-4 w-full justify-around pt-4 border-t border-black/10 dark:border-white/10">
        <button 
          onClick={() => toggleFavorite(quote.id)}
          className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-black/60 dark:text-white/40"} />
        </button>
        <button 
          onClick={handleCopy}
          className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Copy size={20} className="text-black/60 dark:text-white/40" />
        </button>
        <button 
          onClick={handleShare}
          className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <Share2 size={20} className="text-black/60 dark:text-white/40" />
        </button>
      </div>
    </motion.div>
  );
}
