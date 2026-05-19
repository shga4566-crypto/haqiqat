import { useParams, useNavigate } from 'react-router-dom';
import { QUOTES_DATA, CATEGORIES } from '../constants';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CategoryDetail() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === catId);
  const quotes = QUOTES_DATA.filter(q => q.category === catId);

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <header className="mb-10">
        <button 
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 text-gold mb-4 hover:-translate-x-2 transition-transform"
        >
          <ChevronRight size={20} />
          بېرته وېشنیزو ته
        </button>
        <h1 className="text-3xl font-serif font-bold text-black dark:text-white">{category?.name}</h1>
        <p className="text-black/40 dark:text-white/40 text-sm mt-1">{quotes.length} ویناوې وموندل شوې</p>
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
