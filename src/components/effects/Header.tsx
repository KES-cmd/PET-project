//Шапка страницы
import { ScrollProgress } from './ScrollProgress';
import { ColorPicker } from './ColorPicker';
import { CursorSwitcher } from './CursorSwitcher';
import { useTheme } from '../../context/ThemeContext';
import { getHeaderGradient } from '../../utils/themeColors';
import styles from '../../styles/header.module.css';

export function Header() {
  const { themeColor } = useTheme();

  return (
    <header 
      className={styles.header}
      style={{
        background: getHeaderGradient(themeColor),
      }}
    >
      <div className={styles.left}>
        <ScrollProgress />
      </div>
      <div className={styles.center}>
        <span className={styles.logo}>✦</span>
      </div>
      <div className={styles.right}>
        <ColorPicker />
        <CursorSwitcher />
      </div>
    </header>
  );
}