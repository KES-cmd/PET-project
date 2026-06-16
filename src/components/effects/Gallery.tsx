import { useRef, useState, useEffect, useCallback } from 'react';
import { galleryItems } from '../../data/galleryData';
import styles from '../../styles/gallery.module.css';

export function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Дублируем элементы для бесконечной прокрутки (3 копии)
  const totalItems = galleryItems.length;
  const duplicatedItems = [...galleryItems, ...galleryItems, ...galleryItems];

  // Функция обновления активного индекса
  const updateActiveIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll(`.${styles.slide}`);
    if (slides.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - window.innerWidth / 2);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Нормализуем индекс в пределах оригинального массива
    const normalizedIndex = closestIndex % totalItems;
    setActiveIndex(normalizedIndex);
  }, [totalItems]);

  // Обработчик скролла
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateActiveIndex();

    // Бесконечная прокрутка: если дошли до края, перескакиваем в середину
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    if (container.scrollLeft < 100) {
      // Дошли до начала — перескакиваем в середину
      container.scrollLeft = scrollWidth / 3 - 100;
    } else if (container.scrollLeft > maxScroll - 100) {
      // Дошли до конца — перескакиваем в середину
      container.scrollLeft = (scrollWidth / 3) * 2 - 100;
    }
  }, [updateActiveIndex]);

  // Инициализация: устанавливаем скролл в середину
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isInitialized) return;

    // Устанавливаем скролл на середину (второй набор дублированных слайдов)
    const middleIndex = totalItems;
    const slides = container.querySelectorAll(`.${styles.slide}`);
    if (slides[middleIndex]) {
      const slide = slides[middleIndex];
      const containerRect = container.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const offset = slideRect.left - containerRect.left - (containerRect.width - slideRect.width) / 2;
      container.scrollLeft = container.scrollLeft + offset;
    }

    setIsInitialized(true);
    
    // Запускаем обновление индекса
    setTimeout(updateActiveIndex, 150);
  }, [totalItems, updateActiveIndex, isInitialized]);

  // Подписка на события
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [handleScroll, updateActiveIndex]);

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = scrollContainerRef.current;
    if (!container) return;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const container = scrollContainerRef.current;
    if (!container) return;
    container.style.cursor = 'grab';
  };

  // Scroll to specific slide
  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Находим нужный слайд во втором наборе (средняя часть)
    const targetIndex = index + totalItems;
    const slides = container.querySelectorAll(`.${styles.slide}`);
    if (slides[targetIndex]) {
      const slide = slides[targetIndex];
      const containerRect = container.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const offset = slideRect.left - containerRect.left - (containerRect.width - slideRect.width) / 2;
      container.scrollTo({ left: container.scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 px-4 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-center mb-2">Мои работы</h2>
        <p className="text-center text-gray-300 mb-6 max-w-2xl mx-auto">
          Тяни мышкой влево-вправо, центральный проект всегда в фокусе
        </p>

        <div
          ref={scrollContainerRef}
          className={styles.galleryContainer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles.galleryTrack}>
            {duplicatedItems.map((item, index) => {
              // Находим оригинальный индекс для стилизации
              const originalIndex = index % totalItems;
              const isCentered = originalIndex === activeIndex;
              
              // Вычисляем расстояние до центра (для плавности)
              const container = scrollContainerRef.current;
              let scale = isCentered ? 1 : 0.85;
              let opacity = isCentered ? 1 : 0.5;
              let zIndex = isCentered ? 10 : 1;

              if (container && isInitialized) {
                const slides = container.querySelectorAll(`.${styles.slide}`);
                const slide = slides[index];
                if (slide) {
                  const rect = slide.getBoundingClientRect();
                  const slideCenter = rect.left + rect.width / 2;
                  const windowCenter = window.innerWidth / 2;
                  const distance = Math.abs(slideCenter - windowCenter);
                  const maxDistance = 300;
                  
                  scale = Math.max(0.7, 1 - distance / maxDistance * 0.35);
                  opacity = Math.max(0.3, 1 - distance / maxDistance * 0.7);
                  zIndex = isCentered ? 10 : 1;
                }
              }

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`${styles.slide} ${isCentered ? styles.activeSlide : ''}`}
                  style={{
                    transform: `scale(${scale}) translateZ(0)`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1)',
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden group h-[400px] shadow-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className={`
                      absolute inset-0 
                      bg-gradient-to-t 
                      ${item.gradient} 
                      transition-opacity duration-500
                      ${isCentered ? 'opacity-60' : 'opacity-80'}
                    `} />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center gap-3 mt-6">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${activeIndex === index 
                  ? 'bg-purple-500 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
                }
              `}
              onClick={() => scrollToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}