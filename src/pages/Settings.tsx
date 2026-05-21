import { useApp } from '../AppContext';
import { Sun, Moon, Type, Info, Mail, User, Palette, LogOut, Send } from 'lucide-react';
import { DEVELOPER_NAME, APP_NAME } from '../constants';

export default function Settings() {
  const { settings, setSettings } = useApp();

  const handleExit = () => {
    window.dispatchEvent(new Event('trigger-exit'));
  };

  const themes = [
    { id: 'green', name: 'شین', color: 'bg-[#052e16]' },
    { id: 'blue', name: 'آبي', color: 'bg-blue-900' },
    { id: 'purple', name: 'بنفش', color: 'bg-purple-900' },
    { id: 'crimson', name: 'سور', color: 'bg-rose-900' },
  ] as const;

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-serif font-bold gold-text-gradient mb-2">تنظیمات</h1>
        <p className="text-black/40 dark:text-white/40 text-sm">انشاالله اپلیکشن به موخوښ شي.</p>
      </header>

      <div className="space-y-6">
        {/* Colors Theme */}
        <div className="glass-card dark:glass-card-dark rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-gold">
            <Palette size={20} />
            رنګونه
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setSettings(s => ({ ...s, colorTheme: t.id }))}
                className={`flex flex-col items-center gap-2 p-2 rounded-2xl border transition-all ${
                  settings.colorTheme === t.id ? 'border-gold bg-gold/10 scale-105' : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100 text-black dark:text-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${t.color} border-2 ${settings.colorTheme === t.id ? 'border-gold' : 'border-transparent'}`} />
                <span className="text-xs">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="glass-card dark:glass-card-dark rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-gold">
            <Sun size={20} />
            بڼه
          </h3>
          <div className="flex gap-4">
            <button 
              onClick={() => setSettings(s => ({ ...s, theme: 'light' }))}
              className={`flex-1 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${settings.theme === 'light' ? 'border-gold bg-gold/10 text-gold-dark dark:text-gold' : 'border-black/10 dark:border-white/10 text-black/40 dark:text-white/40'}`}
            >
              <Sun size={24} />
              <span>روښانه</span>
            </button>
            <button 
              onClick={() => setSettings(s => ({ ...s, theme: 'dark' }))}
              className={`flex-1 py-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${settings.theme === 'dark' ? 'border-gold bg-gold/10 text-gold-dark dark:text-gold' : 'border-black/10 dark:border-white/10 text-black/40 dark:text-white/40'}`}
            >
              <Moon size={24} />
              <span>تیاره</span>
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card dark:glass-card-dark rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-gold">
            <Type size={20} />
            د لیک کچه
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-xs">کوچنی</span>
            <input 
              type="range" 
              min="14" 
              max="32" 
              value={settings.fontSize}
              onChange={(e) => setSettings(s => ({ ...s, fontSize: parseInt(e.target.value) }))}
              className="flex-1 accent-gold"
            />
            <span className="text-lg">لوی</span>
          </div>
          <p className="text-center mt-4 text-black dark:text-white font-serif" style={{ fontSize: `${settings.fontSize}px` }}>
            بیلګه: پوهه رڼا ده.
          </p>
        </div>

        {/* About Info */}
        <div className="glass-card dark:glass-card-dark rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold mb-6 text-gold">
            <Info size={20} />
            د اپلیکشن په اړه
          </h3>
          <div className="space-y-5">
            <div className="flex justify-between items-center text-base">
              <span className="text-black/40 dark:text-white/40 font-medium">نوم</span>
              <span className="font-bold">{APP_NAME}</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-black/40 dark:text-white/40 font-medium">جوړونکی</span>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-bold">{DEVELOPER_NAME}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-black/40 dark:text-white/40 font-medium">ایمیل</span>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="font-bold">shga@gmail.com</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="text-black/40 dark:text-white/40 font-medium">ټلیګرام</span>
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span className="font-bold">shga_af</span>
              </div>
            </div>
            <div className="pt-5 mt-5 border-t border-black/10 dark:border-white/10 text-center text-sm text-black/60 dark:text-white/60 leading-relaxed font-serif">
              موږترخپله وسه کوشش کړی خوبیاهم انسان عاجزده که کومه خطاپه اپلیکشن کي وي موږسره اړیکه ونسي
            </div>
          </div>
        </div>

        {/* Exit & Share */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: APP_NAME,
                  text: 'د پښتو الهامي ویناوو غوره اپلیکیشن ډاونلوډ کړئ.',
                  url: window.location.href
                });
              }
            }}
            className="flex items-center justify-center gap-2 py-4 rounded-3xl bg-gold/10 text-gold-dark dark:text-gold font-bold hover:bg-gold/20 transition-all border border-gold/20"
          >
            <Send size={20} />
            شریکول
          </button>
          <button 
            onClick={handleExit}
            className="flex items-center justify-center gap-2 py-4 rounded-3xl bg-red-500/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-500/20 transition-all border border-red-500/20"
          >
            <LogOut size={20} />
            وتل
          </button>
        </div>
      </div>
    </div>
  );
}
