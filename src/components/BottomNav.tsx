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
    <nav className="fixed bottom-0 left-0 right-0 bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-white/10 px-4 py-2 pb-6 z-50 bottom-nav-shadow">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
              isActive ? "text-gold -translate-y-1" : "text-black/50 dark:text-white/50"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
