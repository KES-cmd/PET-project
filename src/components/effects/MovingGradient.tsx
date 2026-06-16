import { useMousePosition } from '../../hooks/useMousePosition';

export function MovingGradient() {
  const { x, y } = useMousePosition();
  
  // Нормализуем координаты в проценты относительно окна
  const xPercent = (x / window.innerWidth) * 100;
  const yPercent = (y / window.innerHeight) * 100;

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-300 ease-out"
      style={{
        background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          #8b5cf6 0%, 
          #ec4899 50%, 
          #06b6d4 100%)`
      }}
    />
  );
}