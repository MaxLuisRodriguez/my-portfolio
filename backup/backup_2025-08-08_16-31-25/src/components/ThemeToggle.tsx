import React, { useEffect, useState } from 'react';

const THEME_KEY = 'theme-preference';

function applyTheme(isDark: boolean): void {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
    localStorage.setItem(THEME_KEY, 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, 'light');
  }
}

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored ? stored === 'dark' : prefersDark || true;
    setDark(initialDark);
    applyTheme(initialDark);
  }, []);

  const handleToggle = (): void => {
    setDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 shadow hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand.primary/30"
      aria-label="Toggle dark mode"
    >
      <span className="h-3 w-3 rounded-full bg-brand.primary shadow-card" />
      {dark ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;


