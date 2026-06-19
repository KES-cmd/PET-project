//Плавающие кольца на фоне
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/floatingOrbs.module.css';

export function FloatingOrbs() {
  const { themeColor } = useTheme();

  // Функция получения цветов для колец
  const getOrbColors = (color: string): string[] => {
    const palettes: Record<string, string[]> = {
      '#6c33ce': [
        'rgba(139, 92, 246, 0.8)',
        'rgba(219, 39, 119, 0.6)',
        'rgba(139, 92, 246, 0.5)'
      ],
      '#ce4388': [
        'rgba(236, 72, 153, 0.8)',
        'rgba(251, 146, 60, 0.6)',
        'rgba(236, 72, 153, 0.5)'
      ],
      '#06b6d4': [
        'rgba(6, 182, 212, 0.8)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(6, 182, 212, 0.5)'
      ],
      '#84cc16': [
        'rgba(132, 204, 22, 0.8)',
        'rgba(34, 211, 238, 0.6)',
        'rgba(132, 204, 22, 0.5)'
      ],
    };
    return palettes[color] || palettes['#6c33ce'];
  };

  const [color1, color2, color3] = getOrbColors(themeColor);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.orb} ${styles.orb1}`}
        style={{
          borderColor: color1,
          boxShadow: `0 0 80px ${color1}`,
        }}
      />
      <div
        className={`${styles.orb} ${styles.orb2}`}
        style={{
          borderColor: color2,
          boxShadow: `0 0 60px ${color2}`,
        }}
      />
      <div
        className={`${styles.orb} ${styles.orb3}`}
        style={{
          borderColor: color3,
          boxShadow: `0 0 40px ${color3}`,
        }}
      />
    </div>
  );
}