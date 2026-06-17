//Скролл
import { useState } from 'react';
import styles from '../../styles/navigationButton.module.css';

interface NavigationButtonProps {
  onClick: () => void;
  label: string;
  direction?: 'next' | 'prev';
  className?: string;
}

export function NavigationButton({ onClick, label, direction = 'next' }: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`
        relative px-8 py-3 rounded-full font-semibold text-white
        bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
        bg-[length:200%_200%] transition-all duration-300
        hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
        ${styles.navButton}
        ${direction === 'prev' ? styles.prevButton : ''}
      `}
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