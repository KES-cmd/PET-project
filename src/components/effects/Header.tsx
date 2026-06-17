//Шапка страницы
import { ScrollProgress } from './ScrollProgress';
import { ColorPicker } from './ColorPicker';
import { CursorSwitcher } from './CursorSwitcher';
import { useState, useEffect } from 'react';
import styles from '../../styles/header.module.css';

export function Header() {
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('theme-color') || '#7c3aed';
  });

  // Слушаем событие изменения темы
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setThemeColor(e.detail.color);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  // Получаем цвета для градиента хедера на основе выбранного цвета
  const getHeaderGradient = (color: string) => {
    const gradients: Record<string, string> = {
      '#6c33ce': 'linear-gradient(135deg, #4c1d95, #7c3aed, #db2777)',
      '#ce4388': 'linear-gradient(135deg, #be185d, #ec4899, #f97316)',
      '#06b6d4': 'linear-gradient(135deg, #0e7490, #06b6d4, #10b981)',
      '#84cc16': 'linear-gradient(135deg, #4d7c0f, #84cc16, #22d3ee)',
    };
    return gradients[color] || 'linear-gradient(135deg, #4c1d95, #7c3aed, #db2777)';
  };

  return (
    <header 
      className={styles.header}
      style={{
        background: getHeaderGradient(themeColor),
      }}
    >
      <div className={styles.left}>
        <ScrollProgress />
      </div>
      <div className={styles.center}>
        <span className={styles.logo}>✦</span>
      </div>
      <div className={styles.right}>
        <ColorPicker />
        <CursorSwitcher />
      </div>
    </header>
  );
}