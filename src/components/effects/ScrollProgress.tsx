import { usePage } from '../../context/PageContext';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/scrollProgress.module.css';

export function ScrollProgress() {
  const { activeSection, setActiveSection, isTransitioning, isRevealed } = usePage();
  const { themeColor } = useTheme();

  const sections = ['hero', 'gallery', 'about'];
  const currentIndex = sections.indexOf(activeSection);
  
  const progress = isRevealed ? 100 : ((currentIndex + 1) / sections.length) * 100;

  const handleClick = () => {
    if (isTransitioning || isRevealed) return;
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex] as 'hero' | 'gallery' | 'about');
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  //  Получаем три цвета для градиента в зависимости от темы
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

  return (
    <div className={styles.container} onClick={handleClick} title={isRevealed ? "Все секции открыты" : "Переключить секцию"}>
      <svg className={styles.svg} viewBox="0 0 120 120">
        <defs>
          {/* Градиент из трёх цветов темы */}
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
            stroke: `url(#progressGradient)`,
          }}
        />
        
        <text
          x="60"
          y="60"
          className={styles.progressText}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: color2,
          }}
        >
          {isRevealed ? '✨' : `${Math.round(progress)}%`}
        </text>
      </svg>
    </div>
  );
}