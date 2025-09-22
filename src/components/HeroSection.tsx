import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Satellite, Globe, Zap } from 'lucide-react';
import satelliteImage from '@/assets/satellite-hero.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden space-bg">
      {/* Animated Background Satellite */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <img 
          src={satelliteImage} 
          alt="Satellite" 
          className="w-96 h-96 object-contain satellite-rotate"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* ISRO Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-8 text-sm font-montserrat">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">ISRO Advanced Earth Observation</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>

          {/* Main Title */}
          <h1 className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Robust Change
            </span>
            <br />
            <span className="text-foreground">Detection System</span>
          </h1>

          {/* Subtitle */}
          <p className="font-montserrat text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced monitoring and alert system using multi-temporal satellite imagery 
            for precise change detection on user-defined Areas of Interest
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 glass-card px-4 py-2">
              <Satellite className="w-5 h-5 text-primary" />
              <span className="font-montserrat text-sm font-medium">Multi-Temporal Analysis</span>
            </div>
            <div className="flex items-center space-x-2 glass-card px-4 py-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-montserrat text-sm font-medium">User-Defined AOI</span>
            </div>
            <div className="flex items-center space-x-2 glass-card px-4 py-2">
              <Zap className="w-5 h-5 text-warning" />
              <span className="font-montserrat text-sm font-medium">Real-Time Alerts</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-cosmic hover:shadow-glow-primary font-montserrat font-semibold px-8 py-6 text-lg group"
              onClick={scrollToFeatures}
            >
              Explore Platform
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-card border-primary/30 hover:border-primary hover:shadow-glow-soft font-montserrat font-semibold px-8 py-6 text-lg"
            >
              View Documentation
            </Button>
          </div>

          {/* Problem Statement Link */}
          <div className="mt-16">
            <p className="font-montserrat text-sm text-muted-foreground mb-4">
              Addressing Critical Earth Observation Challenges
            </p>
            <div className="flex justify-center">
              <div className="glass-card p-6 max-w-2xl text-left">
                <h3 className="font-orbitron font-semibold text-lg mb-3 text-primary">
                  Problem Statement
                </h3>
                <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">
                  Traditional change detection methods lack precision and real-time capabilities. 
                  Our solution leverages advanced multi-temporal satellite imagery analysis 
                  to provide accurate, automated monitoring of environmental and infrastructural changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;