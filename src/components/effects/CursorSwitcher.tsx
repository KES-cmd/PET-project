import { useState, useRef, useEffect } from 'react';
import { useCursor, type CursorStyle } from '../../context/CursorContext';
import { useTheme } from '../../context/ThemeContext';
import { getHeaderGradient } from '../../utils/themeColors';
import styles from '../../styles/cursorSwitcher.module.css';

const cursorOptions: { id: CursorStyle; label: string; emoji: string }[] = [
  { id: 'classic', label: 'Классический', emoji: '⚪' },
  { id: 'neon', label: 'Неоновый', emoji: '💡' },
  { id: 'minimal', label: 'Минималистичный', emoji: '•' },
];

export function CursorSwitcher() {
  const { cursorStyle, setCursorStyle } = useCursor();
  const { themeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = cursorOptions.find(c => c.id === cursorStyle) || cursorOptions[0];

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Сменить курсор"
        title="Сменить курсор"
      >
        <span className={styles.icon}>🖱️</span>
        <span className={styles.currentEmoji}>{currentOption.emoji}</span>
      </button>

      <div 
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        style={{
          background: getHeaderGradient(themeColor),
        }}
      >
        {cursorOptions.map((option) => (
          <button
            key={option.id}
            className={`${styles.option} ${cursorStyle === option.id ? styles.active : ''}`}
            onClick={() => {
              setCursorStyle(option.id);
              setIsOpen(false);
            }}
          >
            <span className={styles.optionEmoji}>{option.emoji}</span>
            <span className={styles.optionLabel}>{option.label}</span>
            {cursorStyle === option.id && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}