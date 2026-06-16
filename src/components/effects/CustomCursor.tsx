import { useMousePosition } from '../../hooks/useMousePosition';
import styles from '../../styles/cursor.module.css';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
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

  return (
    <div
      className={`${styles.cursor} ${isHovering ? styles.cursorActive : ''}`}
      style={{ transform: `translate(${x - 16}px, ${y - 16}px)` }}
    />
  );
}