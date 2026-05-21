import { useParams, useNavigate } from 'react-router-dom';
import { QUOTES_DATA, CATEGORIES } from '../constants';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CategoryDetail() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id.trim().toLowerCase() === catId?.trim().toLowerCase());
  const quotes = QUOTES_DATA.filter(q => q.category.trim().toLowerCase() === catId?.trim().toLowerCase());

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <header className="mb-10 bg-gradient-to-b from-gold/5 via-transparent to-transparent -mx-6 px-6 pt-2 pb-6 border-b border-black/5 dark:border-white/5 rounded-b-[2rem]">
        <button 
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 text-gold-dark dark:text-gold mb-4 hover:translate-x-1.5 transition-transform font-bold text-sm"
        >
          <ChevronRight size={18} className="stroke-[2.5]" />
          بېرته وېشنیزو ته
        </button>
        <h1 className="text-3xl font-serif font-bold text-black dark:text-white gold-text-gradient">{category?.name}</h1>
        <p className="text-black/50 dark:text-white/40 text-sm mt-1 font-medium">{quotes.length} ویناوې وموندل شوې</p>
      </header>

      <div className="space-y-8">
        <AnimatePresence>
          {quotes.map((quote) => (
            <motion.div key={quote.id}>
              <AdvancedQuoteCard quote={quote} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
