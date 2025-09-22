import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import VisualizationSection from '@/components/VisualizationSection';
import AlertsSection from '@/components/AlertsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <VisualizationSection />
      <AlertsSection />
      <Footer />
    </div>
  );
};

export default Index;
