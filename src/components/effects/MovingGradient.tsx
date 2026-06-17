//Фон
import { useMousePosition } from '../../hooks/useMousePosition';
import { useState, useEffect } from 'react';

export function MovingGradient() {
  const { x, y } = useMousePosition();
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
  
  // Нормализуем координаты в проценты относительно окна
  const xPercent = (x / window.innerWidth) * 100;
  const yPercent = (y / window.innerHeight) * 100;

  // Парсим цвет для создания градиента
  const getGradientColors = (color: string) => {
    // Для каждого цвета своя палитра
    const palettes: Record<string, string[]> = {
      '#6c33ce': ['#7539ce', '#a577f3', '#db2777'],
      '#ce4388': ['#be185d', '#ec4899', '#f72552'],
      '#06b6d4': ['#2a75a0', '#0891b2', '#10b981'],
      '#84cc16': ['#84cc16', '#22d3ee', '#10b981'],
    };
    return palettes[color] || ['#7c3aed', '#ec4899', '#8b5cf6'];
  };

  const colors = getGradientColors(themeColor);

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-700 ease-out"
      style={{
        background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          ${colors[0]} 0%, 
          ${colors[1]} 50%, 
          ${colors[2]} 100%)`,
        transition: 'background 0.7s cubic-bezier(0.2, 0.9, 0.4, 1)',
      }}
    />
  );
}