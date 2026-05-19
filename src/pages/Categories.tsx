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
          const count = QUOTES_DATA.filter(q => q.category === cat.id).length;

          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="glass-card dark:glass-card-dark rounded-3xl p-6 flex flex-col items-center gap-4 text-center aspect-square justify-center group border border-black/10 dark:border-white/10"
            >
              <div className="w-14 h-14 bg-gold/20 dark:bg-gold/10 rounded-2xl flex items-center justify-center text-gold-dark dark:text-gold group-hover:bg-gold group-hover:text-primary transition-all duration-300">
                <IconComponent size={32} />
              </div>
              <div>
                <h3 className="font-bold text-black dark:text-white group-hover:text-gold-dark dark:group-hover:text-gold transition-colors">{cat.name}</h3>
                <span className="text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest">{count} ویناوې</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
