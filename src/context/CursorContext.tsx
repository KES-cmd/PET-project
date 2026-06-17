import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CursorStyle = 'classic' | 'neon' | 'minimal';

interface CursorContextType {
  cursorStyle: CursorStyle;
  setCursorStyle: (style: CursorStyle) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(() => {
    return (localStorage.getItem('cursor-style') as CursorStyle) || 'classic';
  });

  useEffect(() => {
    localStorage.setItem('cursor-style', cursorStyle);
  }, [cursorStyle]);

  return (
    <CursorContext.Provider value={{ cursorStyle, setCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}