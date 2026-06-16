import { CustomCursor } from './components/effects/CustomCursor';
import { MovingGradient } from './components/effects/MovingGradient';
import { Hero } from './components/effects/Hero';
import { ScrollProgress } from './components/effects/ScrollProgress'; 
import morphingStyles from './styles/morphing.module.css';
import noiseStyles  from './styles/noise.module.css';

function App() {
  return (
    <>
      <CustomCursor />
      <MovingGradient />
      <Hero />
      <ScrollProgress />
      <div className={morphingStyles.morphingShape}></div>
      <div className={noiseStyles.noise}></div>
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-white text-center p-8 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Дизайнерские приколюхи
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Двигай мышкой — фон меняется
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white/20 backdrop-blur-md rounded-full font-semibold text-lg hover:scale-105 transition-all hover:bg-white/30">
              Кнопка 1
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-md rounded-full font-semibold text-lg hover:scale-105 transition-all hover:bg-white/30">
              Кнопка 2
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;