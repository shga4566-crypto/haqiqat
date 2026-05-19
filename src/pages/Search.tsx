import { useState, useMemo } from 'react';
import { QUOTES_DATA } from '../constants';
import AdvancedQuoteCard from '../components/AdvancedQuoteCard';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Search() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return QUOTES_DATA.filter(q => 
      q.text.toLowerCase().includes(query.toLowerCase()) || 
      q.author.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <div className="relative mb-8">
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold/40">
          <SearchIcon size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="لټون وکړئ (وینا یا لیکوال)..."
          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pr-12 pl-4 text-black dark:text-white focus:outline-none focus:border-gold/50 transition-all font-sans"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 left-4 flex items-center text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-8">
        {!query && (
          <div className="text-center mt-20 opacity-20 flex flex-col items-center gap-4">
            <SearchIcon size={64} strokeWidth={1} />
            <p className="text-lg italic font-serif">د پوهې لټون وکړه...</p>
          </div>
        )}

        <AnimatePresence>
          {results.map((quote) => (
            <div key={quote.id} className="mb-8">
              <AdvancedQuoteCard quote={quote} />
            </div>
          ))}
        </AnimatePresence>

        {query && results.length === 0 && (
          <p className="text-center text-black/40 dark:text-white/40 mt-20">هیڅ پایله ونه موندل شوه.</p>
        )}
      </div>
    </div>
  );
}
