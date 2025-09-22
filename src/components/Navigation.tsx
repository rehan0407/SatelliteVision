import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Satellite, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#visualization', label: 'Visualization' },
    { href: '#alerts', label: 'Alerts' },
    { href: '#team', label: 'Team' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-card backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Satellite className="w-8 h-8 text-primary glow-primary" />
              <div className="absolute inset-0 animate-pulse">
                <Satellite className="w-8 h-8 text-primary opacity-50" />
              </div>
            </div>
            <div>
              <h1 className="font-orbitron font-bold text-xl text-foreground">
                SatelliteVision
              </h1>
              <p className="font-montserrat text-xs text-muted-foreground">
                ISRO Advanced Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="font-montserrat text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cosmic group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <Button variant="default" size="sm" className="bg-gradient-cosmic hover:shadow-glow-primary font-montserrat font-medium">
              Launch Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="font-montserrat text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="default" size="sm" className="bg-gradient-cosmic hover:shadow-glow-primary font-montserrat font-medium mt-4">
                Launch Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;