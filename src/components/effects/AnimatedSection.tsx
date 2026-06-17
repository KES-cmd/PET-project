//Отвечает за сокрытие страниц при первом проходе и открытие всех после нажатия на кнопку на последней странице
import { ReactNode, useEffect, useState } from 'react';
import { usePage } from '../../context/PageContext';
import styles from '../../styles/animatedSection.module.css';

interface AnimatedSectionProps {
  section: 'hero' | 'gallery' | 'about';
  children: ReactNode;
}

export function AnimatedSection({ section, children }: AnimatedSectionProps) {
  const { activeSection, isTransitioning, isRevealed } = usePage();
  const [isVisible, setIsVisible] = useState(section === 'hero');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Если всё открыто — показываем все секции
    if (isRevealed) {
      setIsVisible(true);
      setIsAnimating(false);
      return;
    }
    // Иначе — обычная логика переключения
    if (activeSection === section) {
      setIsAnimating(true);
      setIsVisible(true);
      // После окончания анимации снимаем флаг
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Скрываем после анимации исчезновения
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [activeSection, section]);

  if (!isVisible) return null;

  const isActive = activeSection === section;

  return (
    <div className={`
      ${styles.section}
      ${isRevealed ? styles.revealed : ''}
      ${section === 'hero' && !isActive ? styles.heroExit : ''}
      ${section === 'gallery' && isActive ? styles.galleryEnter : ''}
      ${section === 'about' && isActive ? styles.aboutEnter : ''}
      ${isAnimating ? styles.animating : ''}
    `}>
      {children}
    </div>
  );
}