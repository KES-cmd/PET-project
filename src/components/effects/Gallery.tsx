import { useRef, useState, useEffect } from 'react';
import { galleryItems } from '../../data/galleryData';
import styles from '../../styles/gallery.module.css';

export function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollPosition = container.scrollLeft;
    const newIndex = Math.round((scrollPosition / scrollWidth) * (galleryItems.length - 1));
    setActiveIndex(Math.min(Math.max(newIndex, 0), galleryItems.length - 1));
  };

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
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const targetScroll = (scrollWidth / (galleryItems.length - 1)) * index;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <section className="py-16 px-4 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-center mb-2">Мои работы</h2>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Тяни мышкой влево-вправо, чтобы увидеть все проекты
        </p>

        {/* Галерея с горизонтальным скроллом */}
        <div
          ref={scrollContainerRef}
          className={`${styles.galleryContainer} overflow-x-auto overflow-y-hidden`}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles.galleryTrack}>
            {galleryItems.map((item) => (
              <div key={item.id} className={styles.slide}>
                <div className="relative rounded-2xl overflow-hidden group h-[400px]">
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
                    opacity-60 
                    transition-opacity 
                    group-hover:opacity-80
                  `} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Индикаторы (кружочки) */}
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