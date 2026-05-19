import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, Quote } from './types';
import { QUOTES_DATA } from './constants';

interface AppContextType {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  favoriteQuotes: Quote[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('tahqeeq_settings');
    return saved ? JSON.parse(saved) : { theme: 'dark', colorTheme: 'green', fontSize: 18 };
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tahqeeq_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tahqeeq_settings', JSON.stringify(settings));
    const root = document.documentElement;
    
    // Light/Dark
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Color theme
    root.classList.remove('theme-green', 'theme-blue', 'theme-purple', 'theme-crimson');
    if (settings.colorTheme !== 'green') {
      root.classList.add(`theme-${settings.colorTheme}`);
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tahqeeq_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const favoriteQuotes = QUOTES_DATA.filter(q => favorites.includes(q.id));

  return (
    <AppContext.Provider value={{ settings, setSettings, favorites, toggleFavorite, favoriteQuotes }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
