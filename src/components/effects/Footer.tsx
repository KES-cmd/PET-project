//Подвал сайта
import { useTheme } from '../../context/ThemeContext';
import { getCursorColor } from '../../utils/themeColors';
import styles from '../../styles/footer.module.css';

export function Footer() {
  const { themeColor } = useTheme();
  const cursorColor = getCursorColor(themeColor);

  // Получаем градиент для подвала в зависимости от темы
  const getFooterGradient = (color: string): string => {
    const gradients: Record<string, string> = {
      '#6c33ce': 'linear-gradient(135deg, #4c1d95, #7c3aed, #db2777)',
      '#ce4388': 'linear-gradient(135deg, #be185d, #ec4899, #f97316)',
      '#06b6d4': 'linear-gradient(135deg, #0e7490, #06b6d4, #10b981)',
      '#84cc16': 'linear-gradient(135deg, #4d7c0f, #84cc16, #22d3ee)',
    };
    return gradients[color] || gradients['#6c33ce'];
  };

  return (
    <footer 
      className={styles.footer}
      style={{
        background: getFooterGradient(themeColor),
      }}
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.logo}>✦</span>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Все права защищены
          </span>
        </div>

        <div className={styles.center}>
          <span className={styles.madeWith}>
            Сделано с ❤️ и 🧠
          </span>
        </div>

        <div className={styles.right}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
            style={{ '--hover-color': cursorColor } as React.CSSProperties}
          >
            GitHub
          </a>
          <a 
            href="https://t.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
            style={{ '--hover-color': cursorColor } as React.CSSProperties}
          >
            Telegram
          </a>
          <a 
            href="mailto:example@email.com" 
            className={styles.link}
            style={{ '--hover-color': cursorColor } as React.CSSProperties}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}