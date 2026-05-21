import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function ExitPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleCustomTrigger = () => setShowPrompt(true);
    window.addEventListener('trigger-exit', handleCustomTrigger);

    let handlePopState: ((e: PopStateEvent) => void) | null = null;

    // We only intercept back button on the Home screen ("/")
    if (location.pathname === '/') {
      // Push a dummy state so the next back button triggers popstate instead of actually going back
      window.history.pushState(null, '', window.location.pathname);

      handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        setShowPrompt(true);
        // Push state again so we stay in the app if they say "No"
        window.history.pushState(null, '', window.location.pathname);
      };

      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('trigger-exit', handleCustomTrigger);
      if (handlePopState) {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, [location.pathname]);

  const handleConfirmExit = () => {
    setShowPrompt(false);
    
    // Try to close the window
    window.close();
    
    // Backwards navigation escape hatch
    setTimeout(() => {
      window.history.go(-100);
    }, 100);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCancel}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            dir="rtl"
            className="relative bg-white dark:bg-primary rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl border border-black/10 dark:border-white/10"
          >
            <h2 className="text-xl font-bold mb-6 text-black dark:text-white font-serif">له اپلیکشن نه وتل غواړئ؟</h2>
            <div className="flex gap-4 w-full">
              <button 
                onClick={handleConfirmExit}
                className="flex-1 py-3 rounded-xl bg-gold-dark dark:bg-gold text-white dark:text-black font-bold hover:bg-gold transition-all text-lg"
              >
                هو
              </button>
              <button 
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 transition-all font-bold text-lg"
              >
                نا
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
