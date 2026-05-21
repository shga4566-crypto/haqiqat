import { motion } from 'motion/react';
import { APP_NAME } from '../constants';
import { BookOpen } from 'lucide-react';

export default function SplashScreen() {
  return (
    <motion.div 
       initial={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-[100] islamic-gradient-bg flex flex-col items-center justify-center p-6 text-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-32 bg-gold/10 rounded-[3rem] flex items-center justify-center border-2 border-gold/30 mb-8 relative z-10"
      >
        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
      </motion.div>
      
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-serif font-bold gold-text-gradient mb-4 tracking-wider"
        >
          {APP_NAME}
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-1 w-24 bg-gold/50 mx-auto rounded-full"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-gold/60 text-xs tracking-[0.3em] font-medium uppercase"
        >
          د پوهې او معرفت رڼا
        </motion.p>
      </div>
    </motion.div>
  );
}
