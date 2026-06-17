//Описывает форму и состояние мышки
import { useMousePosition } from '../../hooks/useMousePosition';
import { useCursor } from '../../context/CursorContext';
import { usePage } from '../../context/PageContext';
import styles from '../../styles/cursor.module.css';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const { cursorStyle } = useCursor();
  const { isRevealed } = usePage();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Если всё открыто — отключаем эффект наведения
    if (isRevealed) {
      setIsHovering(false);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Проверяем, что элемент интерактивный: кнопка, ссылка, .slide, или индикаторы галереи
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

      // Проверяем, что мы действительно покидаем интерактивный элемент
      const isLeavingInteractive =
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.slide') !== null ||
        target.closest('.cursor-interactive') !== null;

      // Проверяем, что не переходим на другой интерактивный элемент
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

    // Если всё открыто — никаких изменений при наведении
    const isActive = isRevealed ? false : isHovering;

    switch (cursorStyle) {
      case 'neon':
        return {
          ...base,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isActive
            ? 'rgba(236, 72, 153, 0.6)'
            : 'rgba(236, 72, 153, 0.3)',
          border: '2px solid #ec4899',
          boxShadow: isActive
            ? '0 0 40px rgba(236, 72, 153, 0.9), 0 0 80px rgba(236, 72, 153, 0.4)'
            : '0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.4)',
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
      case 'minimal':
        return {
          ...base,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isActive
            ? 'rgba(255, 255, 255, 1)'
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
            ? 'rgba(139, 92, 246, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${isActive ? '#ffffff' : '#8b5cf6'}`,
          boxShadow: isActive
            ? '0 0 20px rgba(139, 92, 246, 0.6)'
            : '0 0 10px rgba(139, 92, 246, 0.5)',
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