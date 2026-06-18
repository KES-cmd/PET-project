//import { MovingGradient } from './components/effects/MovingGradient';
import { PageProvider, usePage } from './context/PageContext';
import { AnimatedSection } from './components/effects/AnimatedSection';
import { Header } from './components/effects/Header';
import { Background } from './components/effects/Background';
import { Hero } from './components/effects/Hero';
import { ThemeProvider } from './context/ThemeContext';
import { Footer } from './components/effects/Footer';
//import { ScrollProgress } from './components/effects/ScrollProgress';
import { Gallery } from './components/effects/Gallery';
import { About } from './components/effects/About';
//import { ColorPicker } from './components/effects/ColorPicker';
//import { CursorSwitcher } from './components/effects/CursorSwitcher';
import { CustomCursor } from './components/effects/CustomCursor';
import { CursorProvider } from './context/CursorContext';
//import morphingStyles from './styles/morphing.module.css';
//import noiseStyles  from './styles/noise.module.css';

function AppContent() {
  const { isRevealed } = usePage();

  return (
    <CursorProvider>
      <CustomCursor />
      <Background />
      <Header />

      {isRevealed ? (
        <div className="relative pt-20">
          <Hero />
          <Gallery />
          <About />
          <Footer />
        </div>
      ) : (
        <>
          <AnimatedSection section="hero">
            <Hero />
          </AnimatedSection>

          <AnimatedSection section="gallery">
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="w-full max-w-7xl mx-auto px-4">
                <Gallery />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection section="about">
            <About />
          </AnimatedSection>
        </>
      )}
    </CursorProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PageProvider>
        <AppContent />
      </PageProvider>
    </ThemeProvider>
  );
}

export default App;
