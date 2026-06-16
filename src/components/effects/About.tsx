import { usePage } from '../../context/PageContext';
import { NavigationButton } from './NavigationButton';
import styles from '../../styles/about.module.css';

export function About() {
  const { setIsRevealed, setIsTransitioning} = usePage();

  const handleBackToHero = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 300);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className={styles.avatar}>
          {/* Здесь будет твоя фотография или иконка */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center text-5xl">
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
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">React</span>
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">TypeScript</span>
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">TailwindCSS</span>
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">Framer Motion</span>
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm">GSAP</span>
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