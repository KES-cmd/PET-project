//Описывает форму и состояние мышки
import { useMousePosition } from '../../hooks/useMousePosition';
import { useCursor } from '../../context/CursorContext';
import styles from '../../styles/cursor.module.css';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const { cursorStyle } = useCursor();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'button:not([data-cursor-hidden]), a:not([data-cursor-hidden]), [role="button"]:not([data-cursor-hidden])'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  // Выбор стиля курсора
  const getCursorStyles = () => {
    const base = {
      transform: `translate(${x - 16}px, ${y - 16}px)`,
      transition: 'transform 0.15s ease-out',
    };

    switch (cursorStyle) {
      case 'neon':
        return {
          ...base,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          borderRadius: '50%',
          background: 'rgba(236, 72, 153, 0.3)',
          border: '2px solid #ec4899',
          boxShadow: '0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.4)',
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
      case 'minimal':
        return {
          ...base,
          width: isHovering ? '16px' : '8px',
          height: isHovering ? '16px' : '8px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
      case 'classic':
      default:
        return {
          ...base,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          borderRadius: '50%',
          background: isHovering 
            ? 'rgba(139, 92, 246, 0.7)' 
            : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${isHovering ? 'white' : '#8b5cf6'}`,
          boxShadow: isHovering 
            ? '0 0 30px rgba(139, 92, 246, 0.5)' 
            : '0 0 10px rgba(139, 92, 246, 0.5)',
          transition: 'all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1)',
        };
    }
  };

  return (
    <div
      className={styles.cursor}
      style={getCursorStyles()}
    />
  );
}