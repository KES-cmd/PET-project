//Навигационная кнопка
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getButtonGradient, getButtonGlow, getCursorColor } from '../../utils/themeColors';
import styles from '../../styles/navigationButton.module.css';

interface NavigationButtonProps {
  onClick: () => void;
  label: string;
  direction?: 'next' | 'prev';
}

export function NavigationButton({ onClick, label, direction = 'next' }: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { themeColor } = useTheme();

  const buttonGradient = getButtonGradient(themeColor);
  const buttonGlow = getButtonGlow(themeColor);
  const cursorColor = getCursorColor(themeColor);

  // 👇 Формируем градиент для обводки (::before) в цветах темы
  const getBorderGradient = (color: string): string => {
    const gradients: Record<string, string> = {
      '#6c33ce': '#4c1d95, #7c3aed, #db2777, #4c1d95',
      '#ce4388': '#be185d, #ec4899, #f97316, #be185d',
      '#06b6d4': '#0e7490, #06b6d4, #10b981, #0e7490',
      '#84cc16': '#4d7c0f, #84cc16, #22d3ee, #4d7c0f',
    };
    return gradients[color] || gradients['#6c33ce'];
  };

  const borderGradient = getBorderGradient(themeColor);

  return (
    <button
      className={`
        relative px-8 py-3 rounded-full font-semibold text-white
        bg-gradient-to-r ${buttonGradient}
        bg-[length:200%_200%] transition-all duration-300
        hover:shadow-[0_0_30px_${buttonGlow}]
        ${styles.navButton}
        ${direction === 'prev' ? styles.prevButton : ''}
      `}
      style={
        {
          '--glow-color': buttonGlow,
          '--border-gradient': borderGradient,
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {direction === 'prev' && (
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isHovered ? '-translate-x-2' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        )}
        {label}
        {direction === 'next' && (
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </span>
    </button>
  );
}