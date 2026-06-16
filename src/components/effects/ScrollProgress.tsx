import { usePage } from '../../context/PageContext';
import styles from '../../styles/scrollProgress.module.css';

export function ScrollProgress() {
  const { activeSection, setActiveSection, isTransitioning } = usePage();

  // Определяем порядок секций
  const sections = ['hero', 'gallery', 'about'];
  const currentIndex = sections.indexOf(activeSection);
  
  // Прогресс: 0% -> 33% -> 66% -> 100%
  // Если секция hero — 33%, gallery — 66%, about — 100%
  const progress = ((currentIndex + 1) / sections.length) * 100;

  const handleClick = () => {
    if (isTransitioning) return;
    
    // Переключаем на следующую секцию по кругу
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex] as 'hero' | 'gallery' | 'about');
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container} onClick={handleClick} title="Переключить секцию">
      <svg className={styles.svg} viewBox="0 0 120 120">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Фоновый круг */}
        <circle
          className={styles.backgroundCircle}
          cx="60"
          cy="60"
          r="45"
        />
        
        {/* Прогресс-круг */}
        <circle
          className={styles.progressCircle}
          cx="60"
          cy="60"
          r="45"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        
        {/* Текст с номером страницы */}
        <text
          x="60"
          y="60"
          className={styles.progressText}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {currentIndex + 1}/{sections.length}
        </text>
      </svg>
    </div>
  );
}