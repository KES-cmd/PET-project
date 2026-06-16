import { CustomCursor } from './components/effects/CustomCursor';
import { MovingGradient } from './components/effects/MovingGradient';
import { PageProvider } from './context/PageContext';
import { AnimatedSection } from './components/effects/AnimatedSection';
import { Hero } from './components/effects/Hero';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { Gallery } from './components/effects/Gallery';
import morphingStyles from './styles/morphing.module.css';
import noiseStyles  from './styles/noise.module.css';

function App() {
  return (
    <PageProvider>
      <CustomCursor />
      <MovingGradient />
      <ScrollProgress />
      <div className={morphingStyles.morphingShape}></div>
      <div className={noiseStyles.noise}></div>

      <AnimatedSection section="hero">
        <Hero />
      </AnimatedSection>

      <AnimatedSection section="gallery">
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4">
            <Gallery />
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection section="about">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Обо мне</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Здесь будет информация о тебе
            </p>
          </div>
        </div>
      </AnimatedSection>
    </PageProvider>
  );
}

export default App;