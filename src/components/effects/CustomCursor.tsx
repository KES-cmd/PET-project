//Описывает форму и состояние мышки
import { useMousePosition } from '../../hooks/useMousePosition';
import { useCursor } from '../../context/CursorContext';
import { usePage } from '../../context/PageContext';
import { useTheme } from '../../context/ThemeContext';
import { getCursorColor, getCursorGlow } from '../../utils/themeColors';
import styles from '../../styles/cursor.module.css';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const { cursorStyle } = useCursor();
  const { isRevealed } = usePage();
  const { themeColor } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const cursorColor = getCursorColor(themeColor);
  const cursorGlow = getCursorGlow(themeColor);

  useEffect(() => {
    if (isRevealed) {
      setIsHovering(false);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.slide') !== null ||
        target.closest('.cursor-interactive') !== null
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;

      const isLeavingInteractive =
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.slide') !== null ||
        target.closest('.cursor-interactive') !== null;

      const isEnteringInteractive =
        relatedTarget?.closest('button') !== null ||
        relatedTarget?.closest('a') !== null ||
        relatedTarget?.closest('[role="button"]') !== null ||
        relatedTarget?.closest('.slide') !== null ||
        relatedTarget?.closest('.cursor-interactive') !== null;

      if (isLeavingInteractive && !isEnteringInteractive) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isRevealed]);

  // Выбор стиля курсора
  const getCursorStyles = () => {
    const base = {
      transform: `translate(${x - 16}px, ${y - 16}px)`,
      transition: 'transform 0.15s ease-out',
    };

    const isActive = isRevealed ? false : isHovering;

    switch (cursorStyle) {
      case 'neon':
        return {
          ...base,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isActive
            ? `${cursorColor}99`  // 60% прозрачности
            : `${cursorColor}4D`,  // 30% прозрачности
          border: `2px solid ${cursorColor}`,
          boxShadow: isActive
            ? `0 0 40px ${cursorGlow}, 0 0 80px ${cursorColor}66`
            : `0 0 30px ${cursorGlow}, 0 0 60px ${cursorColor}4D`,
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
      case 'minimal':
        return {
          ...base,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isActive
            ? '#ffffff'
            : 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
      case 'classic':
      default:
        return {
          ...base,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isActive
            ? cursorColor
            : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${isActive ? '#ffffff' : cursorColor}`,
          boxShadow: isActive
            ? `0 0 30px ${cursorGlow}, 0 0 60px ${cursorColor}4D`
            : `0 0 10px ${cursorGlow}`,
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
    }
  };

  return (
    <div
      className={styles.cursor}
      style={{
        ...getCursorStyles(),
        willChange: 'transform, background',
      }}
    />
  );
}