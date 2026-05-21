import { motion } from 'motion/react';
import { CATEGORIES, QUOTES_DATA } from '../constants';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="pb-24 pt-8 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold gold-text-gradient mb-2">وېشنیزې</h1>
        <p className="text-black/60 dark:text-white/40 text-sm">غوره وینا دلته ومومئ</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat, idx) => {
          // Dynamic icon resolution
          const IconComponent = (LucideIcons as any)[cat.icon.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')] || LucideIcons.Book;
          const count = QUOTES_DATA.filter(q => q.category.trim().toLowerCase() === cat.id.trim().toLowerCase()).length;

          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="glass-card dark:glass-card-dark rounded-[2rem] p-5 flex flex-col items-center gap-4 text-center aspect-square justify-center group border border-black/5 dark:border-white/5 shadow-lg relative overflow-hidden"
            >
              {/* Soft decorative spot in background */}
              <div className="absolute inset-0 bg-gold/5 dark:bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-16 h-16 bg-gold/15 dark:bg-gold/10 rounded-[1.25rem] flex items-center justify-center text-gold-dark dark:text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-inner">
                <IconComponent size={28} className="stroke-[2]" />
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="font-bold text-base text-black/90 dark:text-white/90 group-hover:text-gold-dark dark:group-hover:text-gold transition-colors leading-tight">{cat.name}</h3>
                <p className="text-xs text-black/40 dark:text-white/30 font-semibold">{count} ویناوې</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
