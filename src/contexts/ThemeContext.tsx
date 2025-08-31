import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 