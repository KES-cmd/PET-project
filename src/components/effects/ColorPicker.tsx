//Файл для смены цвета фона
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { themeColors, getHeaderGradient } from '../../utils/themeColors';
import styles from '../../styles/colorPicker.module.css';

export function ColorPicker() {
  const { themeColor, setThemeColor } = useTheme();
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

  const handleColorSelect = (color: string) => {
    setThemeColor(color);
    setIsOpen(false);
  };

  const currentColor = themeColors.find(c => c.value === themeColor) || themeColors[0];

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать тему"
        title="Сменить тему"
      >
        <span className={styles.icon}>🎨</span>
        <span 
          className={styles.colorDot}
          style={{ backgroundColor: themeColor }}
        />
      </button>

      <div 
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        style={{
          background: getHeaderGradient(themeColor),
        }}
      >
        {themeColors.map((color) => (
          <button
            key={color.value}
            className={`${styles.colorOption} ${themeColor === color.value ? styles.active : ''}`}
            onClick={() => handleColorSelect(color.value)}
            title={color.name}
          >
            <span 
              className={styles.colorCircle}
              style={{ backgroundColor: color.value }}
            />
            <span className={styles.colorName}>{color.name}</span>
            {themeColor === color.value && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}