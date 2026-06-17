//Файл для смены цвета фона
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/colorPicker.module.css';

// Доступные цвета
const colors = [
  { name: 'Фиолетовый', value: '#7c3aed', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Розовый неон', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Океан', value: '#06b6d4', gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Лайм', value: '#84cc16', gradient: 'from-lime-500 to-emerald-500' },
];

export function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(() => {
    // Загружаем сохранённый цвет из localStorage
    const saved = localStorage.getItem('theme-color');
    return saved || '#7c3aed';
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // Применяем цвет к фону
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', selectedColor);
    // Сохраняем в localStorage
    localStorage.setItem('theme-color', selectedColor);
  }, [selectedColor]);

  // Закрываем меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Обновляем цвет в MovingGradient
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsOpen(false);
    // Отправляем событие для обновления градиента
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { color } }));
  };

  const currentColor = colors.find(c => c.value === selectedColor) || colors[0];

  return (
    <div className={styles.container} ref={menuRef}>
      {/* Кнопка-палитра */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать тему"
        title="Сменить тему"
        data-interactive
      >
        <span className={styles.icon}>🎨</span>
        <span 
          className={styles.colorDot}
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {/* Выпадающее меню */}
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        {colors.map((color) => (
          <button
            key={color.value}
            className={`${styles.colorOption} ${selectedColor === color.value ? styles.active : ''}`}
            onClick={() => handleColorSelect(color.value)}
            title={color.name}
          >
            <span 
              className={styles.colorCircle}
              style={{ backgroundColor: color.value }}
            />
            <span className={styles.colorName}>{color.name}</span>
            {selectedColor === color.value && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}