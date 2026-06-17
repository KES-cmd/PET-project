import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCursorColor } from '../utils/themeColors';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('theme-color') || '#6c33ce';
  });

  useEffect(() => {
    localStorage.setItem('theme-color', themeColor);
    
    //  Обновляем цвета скроллбара
    const cursorColor = getCursorColor(themeColor);
    document.documentElement.style.setProperty('--scrollbar-color', cursorColor);
    document.documentElement.style.setProperty('--scrollbar-hover', cursorColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}