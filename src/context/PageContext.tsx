import { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
  activeSection: 'hero' | 'gallery' | 'about';
  setActiveSection: (section: 'hero' | 'gallery' | 'about') => void;
  isTransitioning: boolean;
  setIsTransitioning: (state: boolean) => void;
  isRevealed: boolean;
  setIsRevealed: (state: boolean) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<'hero' | 'gallery' | 'about'>('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <PageContext.Provider value={{activeSection, setActiveSection, isTransitioning, setIsTransitioning, isRevealed, setIsRevealed }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}