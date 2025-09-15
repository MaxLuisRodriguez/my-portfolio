import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | {
  isDark: true;
  toggleTheme: () => {};
}>({
  isDark: true,
  toggleTheme: () => {}
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleTheme = () => {
    console.log('ThemeContext: Toggling theme from', isDark ? 'dark' : 'light');
    setIsDark(prev => !prev);
  };

  console.log('ThemeProvider rendering with isDark:', isDark);

  // Sync with localStorage on first mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('waw-theme') : null;
    if (saved) {
      const dark = saved === 'dark';
      setIsDark(dark);
      const root = document.documentElement;
      dark ? root.classList.add('dark') : root.classList.remove('dark');
    } else {
      const root = document.documentElement;
      root.classList.add('dark');
    }
  }, []);

  // Apply/remove the `dark` class on <html> so Tailwind dark styles work everywhere
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('waw-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('waw-theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 