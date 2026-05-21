import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, Search, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'کور' },
    { to: '/categories', icon: Grid, label: 'وېشنیزې' },
    { to: '/search', icon: Search, label: 'لټون' },
    { to: '/favorites', icon: Heart, label: 'خوښې' },
    { to: '/settings', icon: Settings, label: 'تنظیمات' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-primary-light/95 backdrop-blur-md border-t border-black/5 dark:border-white/10 px-5 py-2.5 pb-6 z-50 bottom-nav-shadow">
      <div className="max-w-md mx-auto flex justify-between items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1.5 py-2 px-3 rounded-[1.25rem] transition-all duration-300 flex-1 text-center",
              isActive 
                ? "text-gold-dark dark:text-gold bg-gold/15 dark:bg-gold/10 font-bold scale-[1.03]" 
                : "text-black/50 dark:text-white/45 hover:text-black/80 dark:hover:text-white/80"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-transform duration-300 transform group-hover:scale-110" />
                <span className="text-[11px] leading-none transition-all duration-300">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
