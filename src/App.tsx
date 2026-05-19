/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './AppContext';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import ExitPrompt from './components/ExitPrompt';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { settings } = useApp();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-[100dvh] ${settings.theme === 'dark' ? 'bg-primary text-white dark' : 'bg-white text-black'}`}>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <div className="w-full sm:max-w-md sm:mx-auto sm:border-x sm:border-black/5 dark:sm:border-white/10 relative min-h-[100dvh] shadow-2xl bg-white dark:bg-primary/50 overflow-x-hidden pt-safe pb-safe pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:catId" element={<CategoryDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        
        <BottomNav />
        <ExitPrompt />
      </div>

      {/* Decorative Background Elements Desktop view */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-light rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

