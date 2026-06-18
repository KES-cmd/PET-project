//Страница обо мне
import { usePage } from '../../context/PageContext';
import { useTheme } from '../../context/ThemeContext';
import { NavigationButton } from './NavigationButton';
import { Footer } from './Footer';
import { getCursorColor } from '../../utils/themeColors';
import styles from '../../styles/about.module.css';

export function About() {
  const { setIsRevealed, setIsTransitioning} = usePage();
  const { themeColor } = useTheme();

  const handleBackToHero = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 300);
  };

  // Получаем градиент для аватара в зависимости от темы
  const getAvatarGradient = (color: string): string => {
    const gradients: Record<string, string> = {
      '#6c33ce': 'from-purple-500 to-pink-500',
      '#ce4388': 'from-pink-500 to-rose-500',
      '#06b6d4': 'from-cyan-500 to-blue-500',
      '#84cc16': 'from-lime-500 to-emerald-500',
    };
    return gradients[color] || gradients['#6c33ce'];
  };

  const avatarGradient = getAvatarGradient(themeColor);
  const cursorColor = getCursorColor(themeColor);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className={styles.avatar}>
          {/* Аватар с динамическим градиентом */}
          <div 
            className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl bg-gradient-to-br ${avatarGradient}`}
            style={{
              boxShadow: `0 0 40px ${cursorColor}33, 0 0 80px ${cursorColor}22`,
            }}
          >
            👩‍💻
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Обо мне
        </h2>
        
        <p className="text-xl text-gray-200 mb-6 leading-relaxed">
          Люблю анимации, микро-интеракции и всё, что делает интерфейс живым.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="px-4 py-2 bg-white/85 rounded-full text-sm">React</span>
          <span className="px-4 py-2 bg-white/85 rounded-full text-sm">TypeScript</span>
          <span className="px-4 py-2 bg-white/85 rounded-full text-sm">TailwindCSS</span>
          <span className="px-4 py-2 bg-white/85 rounded-full text-sm">Framer Motion</span>
          <span className="px-4 py-2 bg-white/85 rounded-full text-sm">GSAP</span>
        </div>
        
        <div className="flex justify-center">
          <NavigationButton 
            onClick={handleBackToHero} 
            label="Показать всё" 
            direction="prev" 
          />
        </div>
      </div>
    </section>
  );
}