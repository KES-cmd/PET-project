import { useState, useEffect } from 'react';
import styles from '../../styles/scrollProgress.module.css';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Высота всей страницы
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Сколько пикселей уже проскроллено
      const scrolled = window.scrollY;
      // Процент от 0 до 100
      const newProgress = Math.min((scrolled / scrollHeight) * 100, 100);
      setProgress(newProgress);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 120 120">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Фоновый круг (полупрозрачный белый) */}
        <circle
          className={styles.backgroundCircle}
          cx="60"
          cy="60"
          r="45"
        />
        
        {/* Прогресс-круг (закрашивается от 0 до 100%) */}
        <circle
          className={styles.progressCircle}
          cx="60"
          cy="60"
          r="45"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        
        {/* Процент внутри */}
        <text
          x="60"
          y="60"
          className={styles.progressText}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
}