import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { Quote } from '../types';
import { CATEGORIES } from '../constants';
import { Heart, Share2, Copy, ChevronRight, ChevronLeft, Quote as QuoteIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function AdvancedQuoteCard({ quote, onNext, onPrev }: QuoteCardProps) {
  const { toggleFavorite, favorites, settings } = useApp();
  const isFav = favorites.includes(quote.id);

  // Dynamic category matching to avoid English defaults or messy text
  const getCategoryPashto = (catIdArg: string) => {
    const rawId = catIdArg.trim().toLowerCase();
    const found = CATEGORIES.find(c => c.id.trim().toLowerCase() === rawId);
    if (found) return found;
    
    // Fallback translation mapping for any potential differences/mismatches
    const translationMap: { [key: string]: { name: string; icon: string } } = {
      'islamic': { name: 'اسلامي ویناوې', icon: 'moon-star' },
      'philosophers': { name: 'د فیلسوفانو ویناوې', icon: 'brain' },
      'success': { name: 'د بریا رازونه', icon: 'trending-up' },
      'life advice': { name: 'د ژوند لارښوونې', icon: 'compass' },
      'love': { name: 'د مینې ویناوې', icon: 'heart' },
      'patience': { name: 'د صبر فضیلت', icon: 'timer' },
      'knowledge': { name: 'د علم رڼا', icon: 'book-open' },
      'happiness': { name: 'د خوښۍ لاره', icon: 'smile' },
      'poets': { name: 'د شاعرانو وینا', icon: 'pen-tool' },
      'leaders': { name: 'د مشرانو خبرې', icon: 'users' }
    };
    return translationMap[rawId] || { name: catIdArg, icon: 'book-open' };
  };

  const categoryInfo = getCategoryPashto(quote.category);
  const categoryName = categoryInfo.name;
  const categoryIconName = categoryInfo.icon;

  // Dynamic icon resolution
  const IconComponent = (LucideIcons as any)[
    categoryIconName
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
  ] || LucideIcons.BookOpen;

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
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card dark:glass-card-dark rounded-3xl p-5 md:p-6 flex flex-col items-center text-center relative max-w-sm w-full mx-auto shadow-xl border border-black/5 dark:border-white/10"
    >
      {/* Embedded dynamic category badge inside the card to prevent overflow cropping */}
      <div className="mb-4">
        <span className="bg-gold/15 text-gold-dark dark:text-gold border border-gold/30 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          <IconComponent size={13} className="stroke-[2.5]" />
          {categoryName}
        </span>
      </div>

      <div className="my-4 w-full flex items-center justify-between gap-2">
        {onPrev && (
          <motion.button 
            whileTap={{ scale: 0.85 }}
            onClick={onPrev} 
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black hover:bg-gold/15 hover:text-gold-dark dark:hover:text-gold dark:text-white/70 transition-all duration-300 shadow-sm flex-shrink-0"
          >
            <ChevronRight size={16} />
          </motion.button>
        )}
        
        <div className="flex-1 px-1 relative min-h-[100px] flex items-center justify-center">
          {/* Subtle watermarked quote mark */}
          <div className="absolute top-0 right-0 text-gold/10 dark:text-gold/[0.04] pointer-events-none -mt-4 mr-1 select-none">
            <QuoteIcon size={48} className="rotate-180" />
          </div>
          
          <p 
            className="font-serif leading-relaxed dark:text-white text-black font-medium relative z-10"
            style={{ fontSize: `${settings.fontSize}px`, lineHeight: 1.7 }}
          >
            {quote.text}
          </p>
        </div>

        {onNext && (
          <motion.button 
            whileTap={{ scale: 0.85 }}
            onClick={onNext} 
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black hover:bg-gold/15 hover:text-gold-dark dark:hover:text-gold dark:text-white/70 transition-all duration-300 shadow-sm flex-shrink-0"
          >
            <ChevronLeft size={16} />
          </motion.button>
        )}
      </div>

      {/* Modern thin border separator */}
      <div className="w-12 h-[2px] bg-gold/20 rounded-full mb-3" />
      
      {/* Elegantly styled Author Section */}
      <div className="flex items-center gap-2 mb-5 justify-center">
        <span className="h-[1px] w-3 bg-gold/20" />
        <p className="text-gold-dark dark:text-gold font-serif font-bold text-[15px] leading-none">
          {quote.author}
        </p>
        <span className="h-[1px] w-3 bg-gold/20" />
      </div>

      {/* Styled Physical Action Buttons */}
      <div className="flex items-center gap-3 w-full justify-center pt-4 border-t border-black/10 dark:border-white/10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(quote.id)}
          className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
            isFav 
              ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-md shadow-red-500/5 ring-1 ring-red-500/25" 
              : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
          }`}
        >
          <Heart size={16} className={isFav ? "fill-red-500" : ""} />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
        >
          <Copy size={16} />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
        >
          <Share2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
