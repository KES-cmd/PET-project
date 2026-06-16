import { ReactNode, useEffect, useState } from 'react';
import { usePage } from '../../context/PageContext';
import styles from '../../styles/animatedSection.module.css';

interface AnimatedSectionProps {
  section: 'hero' | 'gallery' | 'about';
  children: ReactNode;
}

export function AnimatedSection({ section, children }: AnimatedSectionProps) {
  const { activeSection, isTransitioning } = usePage();
  const [isVisible, setIsVisible] = useState(section === 'hero');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
      ${section === 'hero' && !isActive ? styles.heroExit : ''}
      ${section === 'gallery' && isActive ? styles.galleryEnter : ''}
      ${section === 'about' && isActive ? styles.aboutEnter : ''}
      ${isAnimating ? styles.animating : ''}
    `}>
      {children}
    </div>
  );
}