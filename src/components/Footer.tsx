import { Button } from "@/components/ui/button";
import { 
  Satellite, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  MapPin,
  Phone,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#visualization', label: 'Visualization' },
    { href: '#alerts', label: 'Alerts' }
  ];

  const resources = [
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'API Reference' },
    { href: '#', label: 'Research Papers' },
    { href: '#', label: 'Case Studies' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 border-t border-border/30 space-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Satellite className="w-8 h-8 text-primary glow-primary" />
                <div className="absolute inset-0 animate-pulse">
                  <Satellite className="w-8 h-8 text-primary opacity-50" />
                </div>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-foreground">
                  SatelliteVision
                </h3>
                <p className="font-montserrat text-xs text-muted-foreground">
                  ISRO Advanced Platform
                </p>
              </div>
            </div>
            
            <p className="font-montserrat text-sm text-muted-foreground leading-relaxed mb-6">
              Advanced satellite imagery analysis platform for robust change detection, 
              monitoring, and alert systems on user-defined areas of interest.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="glass-card p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass-card p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass-card p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="glass-card p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-montserrat text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-montserrat text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-montserrat text-sm text-muted-foreground">
                    ISRO Headquarters<br />
                    Antariksh Bhavan, New BEL Road<br />
                    Bengaluru, Karnataka 560231
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <p className="font-montserrat text-sm text-muted-foreground">
                  +91 80 2341 7253
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <p className="font-montserrat text-sm text-muted-foreground">
                  satellitevision@isro.gov.in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ISRO Mission Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 glass-card px-6 py-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="font-montserrat text-sm font-medium text-muted-foreground">
              ISRO Advanced Earth Observation Solutions
            </span>
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-montserrat text-sm text-muted-foreground">
              © 2024 SatelliteVision. ISRO Earth Observation Division. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="font-montserrat text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-montserrat text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="font-montserrat text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;