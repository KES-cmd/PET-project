//Приветственная страница
import { useState } from 'react';
import { usePage } from '../../context/PageContext';
import styles from '../../styles/hero.module.css';

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveSection, setIsTransitioning } = usePage();

  const handleOpenGallery = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection('gallery');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 300);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Основной заголовок */}
        <h1 className="mb-6">
          Создаю 
          <span className="
                text-transparent 
                bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
                bg-clip-text 
                [-webkit-text-stroke:_1px_rgba(255,255,255,0.5)]
                [text-shadow:_0_0_30px_rgba(139,92,246,0.6),_0_0_60px_rgba(236,72,153,0.3)]
                animate-in
          ">
            {' '}дизайнерские{' '}
          </span>
          эксперименты
        </h1>

        {/* Подзаголовок */}
        <p className="text-gray-200 max-w-2xl mx-auto mb-10">
          Frontend-разработчик с любовью к анимациям, микро-интеракциям и нестандартным решениям
        </p>

        {/* Кнопка с эффектом */}
        <div className="relative inline-block">
          <button
            className={`
              relative px-10 py-4 rounded-full font-semibold text-white
              bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
              bg-[length:200%_200%] transition-all duration-300
              hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
              ${styles.heroButton}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpenGallery}
          >
            <span className="relative z-10 flex items-center gap-2">
              Посмотреть работы
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}