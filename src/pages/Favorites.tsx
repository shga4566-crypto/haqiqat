import { useApp } from '../AppContext';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Favorites() {
  const { favoriteQuotes } = useApp();

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold gold-text-gradient mb-2">خوښې ویناوې</h1>
        <p className="text-black/40 dark:text-white/40 text-sm">ستاسو غوره انتخابونه</p>
      </header>

      {favoriteQuotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-black/20 dark:text-white/20 gap-4">
          <Heart size={64} strokeWidth={1} />
          <p className="font-serif">تراوسه مو هیڅ وینا نه ده خوښه کړې.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {favoriteQuotes.map((quote) => (
              <motion.div 
                key={quote.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <AdvancedQuoteCard quote={quote} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
