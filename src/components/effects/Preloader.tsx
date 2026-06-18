//Прелоадер — анимация загрузки при входе на сайт
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getCursorColor } from '../../utils/themeColors';
import styles from '../../styles/preloader.module.css';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const { themeColor } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const cursorColor = getCursorColor(themeColor);

  // Получаем градиент для круга в цветах темы
  const getGradientColors = (color: string): string[] => {
    const palettes: Record<string, string[]> = {
      '#6c33ce': ['#4c1d95', '#7c3aed', '#db2777'],
      '#ce4388': ['#be185d', '#ec4899', '#f97316'],
      '#06b6d4': ['#0e7490', '#06b6d4', '#10b981'],
      '#84cc16': ['#4d7c0f', '#84cc16', '#22d3ee'],
    };
    return palettes[color] || palettes['#6c33ce'];
  };

  const [color1, color2, color3] = getGradientColors(themeColor);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.round(newProgress));

      if (newProgress >= 100) {
        clearInterval(timer);
        // Начинаем исчезновение
        setTimeout(() => {
          setIsFading(true);
          // После исчезновения — убираем прелоадер
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  const scale = 0.85 + (progress / 100) * 0.3;

  return (
    <div className={`${styles.overlay} ${isFading ? styles.fading : ''}`}>
      <div className={styles.container}>
        <div 
          className={styles.progressWrapper}
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.1s linear',
          }}
        >
          <svg className={styles.svg} viewBox="0 0 120 120">
            <defs>
              <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="50%" stopColor={color2} />
                <stop offset="100%" stopColor={color3} />
              </linearGradient>
            </defs>
            
            <circle
              className={styles.backgroundCircle}
              cx="60"
              cy="60"
              r="45"
            />
            
            <circle
              className={styles.progressCircle}
              cx="60"
              cy="60"
              r="45"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                stroke: `url(#preloaderGradient)`,
              }}
            />
            
            <text
              x="60"
              y="60"
              className={styles.progressText}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fill: `url(#preloaderGradient)`,
              }}
            >
              {progress}%
            </text>
          </svg>
        </div>

        <p className={styles.loadingText}>Загрузка...</p>
      </div>
    </div>
  );
}